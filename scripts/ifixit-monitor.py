#!/usr/bin/env python3
"""
ifixit-monitor.py — ZA Support iFixit Community Answer Monitor
Finds unanswered MacBook questions on iFixit → generates genuine answers → posts or saves drafts.
Uses iFixit public API (no auth required for reading, auth required for posting).
Cost: ~$0.003/answer (Haiku) | $0.00 for search (iFixit API free)
"""

import os
import sys
import json
import time
import hashlib
import urllib.request
import urllib.parse
import urllib.error
from pathlib import Path
from datetime import datetime, timezone

SCRIPTS_DIR = Path(__file__).parent
sys.path.insert(0, str(SCRIPTS_DIR))
from community_answer_generator import generate_answer

# ── Config ──────────────────────────────────────────────────────────────────
HOME = Path.home()
DRAFT_DIR = HOME / "Desktop" / "Claude" / "iFixit"
SEEN_FILE = HOME / ".za-ifixit-seen.json"
MAX_ANSWERS_PER_NIGHT = 8
DATE_SLUG = datetime.now().strftime("%d%m%Y")
AUTO_POST = os.environ.get("IFIXIT_AUTO_POST", "false").lower() == "true"

# iFixit OAuth (required for posting)
IFIXIT_APP_ID = os.environ.get("IFIXIT_APP_ID", "")
IFIXIT_APP_SECRET = os.environ.get("IFIXIT_APP_SECRET", "")
IFIXIT_TOKEN = os.environ.get("IFIXIT_TOKEN", "")  # User OAuth token

IFIXIT_API = "https://www.ifixit.com/api/2.0"

# MacBook-specific search terms on iFixit
SEARCH_QUERIES = [
    "MacBook won't turn on",
    "MacBook liquid damage",
    "MacBook logic board",
    "MacBook not charging",
    "MacBook black screen",
    "MacBook Pro M1 repair",
    "MacBook Air M2 repair",
    "MacBook battery swollen",
]

# Device categories to search
DEVICE_CATEGORIES = [
    "MacBook",
    "MacBook Pro",
    "MacBook Air",
    "MacBook Pro 13-Inch",
    "MacBook Pro 15-Inch",
    "MacBook Pro 16-Inch",
]

RELEVANCE_KEYWORDS = [
    "logic board", "won't turn on", "not turning on", "liquid", "water",
    "not charging", "won't charge", "black screen", "no power", "dead",
    "battery", "swollen", "backlight", "no display", "magsafe", "usb-c",
]

SKIP_IF_ANSWERED_OVER = 3  # Skip if already has >3 answers (well-covered)


def load_seen() -> set:
    if SEEN_FILE.exists():
        try:
            return set(json.loads(SEEN_FILE.read_text()))
        except Exception:
            return set()
    return set()


def save_seen(seen: set):
    SEEN_FILE.write_text(json.dumps(list(seen), indent=2))


def api_get(endpoint: str, params: dict = None) -> dict:
    url = f"{IFIXIT_API}/{endpoint}"
    if params:
        url += "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": "ZA-Support-iFixit-Bot/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            return json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        print(f"  API error {e.code}: {endpoint}")
        return {}
    except Exception as e:
        print(f"  API error: {e}")
        return {}


def search_questions(query: str, limit: int = 20) -> list:
    """Search iFixit Answers for questions matching query."""
    data = api_get("search/questions", {"query": query, "limit": limit})
    return data.get("results", [])


def get_question_detail(qid: int) -> dict:
    """Get full question with answers."""
    return api_get(f"answers/{qid}")


def is_relevant(question: dict) -> bool:
    title = question.get("title", "").lower()
    body = question.get("text", "").lower()
    text = title + " " + body

    answer_count = len(question.get("answers", []))
    if answer_count > SKIP_IF_ANSWERED_OVER:
        return False

    return any(k in text for k in RELEVANCE_KEYWORDS)


def post_answer_ifixit(qid: int, answer_text: str) -> bool:
    """Post answer to iFixit question via API."""
    if not IFIXIT_TOKEN:
        print("  SKIP: IFIXIT_TOKEN not set")
        return False

    url = f"{IFIXIT_API}/answers/{qid}/answers"
    data = json.dumps({"text": answer_text}).encode()
    req = urllib.request.Request(
        url,
        data=data,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"api {IFIXIT_APP_ID},{IFIXIT_TOKEN}",
            "User-Agent": "ZA-Support-iFixit-Bot/1.0",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            result = json.loads(resp.read().decode())
            return result.get("answerid") is not None
    except Exception as e:
        print(f"  Post failed: {e}")
        return False


def save_draft(question: dict, answer_data: dict) -> Path:
    DRAFT_DIR.mkdir(parents=True, exist_ok=True)
    qid = question.get("answerid", question.get("questionid", "unknown"))
    slug = hashlib.md5(str(qid).encode()).hexdigest()[:8]
    fname = DRAFT_DIR / f"draft-ifixit-{slug}-{DATE_SLUG}.json"

    title = question.get("title", "")
    url = f"https://www.ifixit.com/Answers/{qid}"

    draft = {
        "platform": "iFixit",
        "question_id": qid,
        "question_url": url,
        "question_title": title,
        "question_body": question.get("text", "")[:500],
        "existing_answer_count": len(question.get("answers", [])),
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "q_type": answer_data.get("q_type"),
        "sa_relevant": answer_data.get("sa_relevant"),
        "answer": answer_data.get("answer"),
        "cost_usd": answer_data.get("cost_usd"),
        "status": "draft",
    }
    fname.write_text(json.dumps(draft, indent=2, ensure_ascii=False))
    print(f"  Draft saved: {fname.name}")
    return fname


def main():
    print(f"iFixit Monitor — {datetime.now().strftime('%d/%m/%Y %H:%M')}")
    print(f"Auto-post: {'ON' if AUTO_POST else 'OFF (draft mode)'}")
    print("=" * 60)

    seen = load_seen()
    answers_posted = 0
    drafts_created = 0
    total_cost = 0.0
    processed_ids: set = set()

    for query in SEARCH_QUERIES:
        if answers_posted >= MAX_ANSWERS_PER_NIGHT:
            break

        print(f"\nSearching: '{query}'")
        questions = search_questions(query, limit=15)
        print(f"  Found {len(questions)} results")

        for q in questions:
            if answers_posted >= MAX_ANSWERS_PER_NIGHT:
                break

            qid = q.get("answerid") or q.get("questionid")
            if not qid:
                continue

            str_qid = str(qid)
            if str_qid in seen or str_qid in processed_ids:
                continue

            processed_ids.add(str_qid)

            # Get full question details
            detail = get_question_detail(qid)
            if not detail:
                continue

            # Merge for relevance check
            full_q = {**q, **detail}
            if not is_relevant(full_q):
                seen.add(str_qid)
                continue

            title = full_q.get("title", "")
            body = full_q.get("text", "")
            print(f"\n  Q: {title[:80]}")
            print(f"  Answers: {len(full_q.get('answers', []))} | URL: ifixit.com/Answers/{qid}")

            # Generate answer
            result = generate_answer(
                title=title,
                body=body,
                platform="iFixit",
                subreddit="",
            )

            if result.get("error") or not result.get("answer"):
                print(f"  Generation failed: {result.get('error')}")
                seen.add(str_qid)
                continue

            total_cost += result.get("cost_usd", 0)
            draft_file = save_draft(full_q, result)

            if AUTO_POST and IFIXIT_TOKEN:
                success = post_answer_ifixit(qid, result["answer"])
                if success:
                    draft = json.loads(draft_file.read_text())
                    draft["status"] = "posted"
                    draft_file.write_text(json.dumps(draft, indent=2))
                    answers_posted += 1
                    print(f"  Posted to iFixit #{qid}")
            else:
                drafts_created += 1

            seen.add(str_qid)
            time.sleep(2)

    save_seen(seen)

    print("\n" + "=" * 60)
    print(f"Answers posted: {answers_posted}")
    print(f"Drafts created: {drafts_created}")
    print(f"Total API cost: ${total_cost:.4f}")
    if not IFIXIT_TOKEN and AUTO_POST:
        print("\nTo enable iFixit posting:")
        print("  1. Register app at https://www.ifixit.com/api/2.0/doc")
        print("  2. OAuth flow to get user token")
        print("  3. Add IFIXIT_APP_ID + IFIXIT_TOKEN to ~/.za-keys-pending.env")
    return 0


if __name__ == "__main__":
    sys.exit(main())
