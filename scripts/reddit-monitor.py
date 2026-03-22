#!/usr/bin/env python3
"""
reddit-monitor.py v2.0 — ZA Support Reddit Community Monitor
Discovery: Reddit public JSON endpoints (no API key, no approval needed)
Posting: PRAW (requires API key + karma — disabled until account established)
Default: draft mode only. Answers saved to ~/Desktop/Claude/Reddit/ for manual posting.

Strategy:
- New account (DesperateBonus6367) needs ~30 days + 100 karma before posting freely
- Until then: generate quality answers in draft, post MANUALLY to build karma
- Once karma established + API approved: set REDDIT_AUTO_POST=true
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

try:
    from community_answer_generator import generate_answer
except ImportError:
    print("ERROR: community_answer_generator.py not found in scripts/")
    sys.exit(1)

# ── Config ──────────────────────────────────────────────────────────────────
HOME = Path.home()
DRAFT_DIR = HOME / "Desktop" / "Claude" / "Reddit"
SEEN_FILE = HOME / ".za-reddit-seen.json"
MAX_DRAFTS_PER_NIGHT = 8
DATE_SLUG = datetime.now().strftime("%d%m%Y")
AUTO_POST = os.environ.get("REDDIT_AUTO_POST", "false").lower() == "true"

# PRAW credentials (optional — only needed for posting)
CLIENT_ID = os.environ.get("REDDIT_CLIENT_ID", "")
CLIENT_SECRET = os.environ.get("REDDIT_CLIENT_SECRET", "")
REDDIT_USERNAME = os.environ.get("REDDIT_USERNAME", "DesperateBonus6367")
REDDIT_PASSWORD = os.environ.get("REDDIT_PASSWORD", "")

# Subreddits to monitor via public JSON
SUBREDDITS = [
    "applehelp",
    "MacOS",
    "mac",
    "southafrica",
    "johannesburg",
    "techsupport",
]

# Search terms via Reddit public search JSON
SEARCH_QUERIES = [
    "macbook won't turn on",
    "macbook logic board repair",
    "macbook liquid damage",
    "macbook not charging",
    "macbook black screen repair",
    "macbook repair johannesburg",
    "macbook load shedding",
]

RELEVANCE_KEYWORDS = [
    "logic board", "motherboard", "won't turn on", "not turning on",
    "liquid damage", "water damage", "spill", "not charging", "won't charge",
    "black screen", "no display", "dead mac", "load shedding", "power surge",
    "eskom", "repair cost", "johannesburg", "south africa",
    "apple store quoted", "apple quoted",
]

SKIP_KEYWORDS = ["[solved]", "solved:", "fixed:", "never mind", "update: fixed"]

HEADERS = {
    "User-Agent": "ZA-Support-Community-Research/2.0 (mac repair helper; contact courtney@zasupport.com)",
    "Accept": "application/json",
}


def load_seen() -> set:
    if SEEN_FILE.exists():
        try:
            return set(json.loads(SEEN_FILE.read_text()))
        except Exception:
            return set()
    return set()


def save_seen(seen: set):
    SEEN_FILE.write_text(json.dumps(list(seen), indent=2))


def reddit_get(url: str) -> dict:
    """Fetch Reddit public JSON endpoint."""
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            return json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        if e.code == 429:
            print(f"  Rate limited — sleeping 60s")
            time.sleep(60)
        else:
            print(f"  HTTP {e.code}: {url}")
        return {}
    except Exception as e:
        print(f"  Fetch error: {e}")
        return {}


def get_new_posts(subreddit: str, limit: int = 25) -> list:
    """Get new posts from subreddit via public JSON."""
    url = f"https://www.reddit.com/r/{subreddit}/new.json?limit={limit}"
    data = reddit_get(url)
    posts = data.get("data", {}).get("children", [])
    return [p["data"] for p in posts if p.get("kind") == "t3"]


def search_reddit(query: str, limit: int = 10) -> list:
    """Search Reddit via public JSON search."""
    encoded = urllib.parse.quote(query)
    url = f"https://www.reddit.com/search.json?q={encoded}&sort=new&limit={limit}&type=link"
    data = reddit_get(url)
    posts = data.get("data", {}).get("children", [])
    return [p["data"] for p in posts if p.get("kind") == "t3"]


def is_relevant(post: dict) -> bool:
    title = post.get("title", "").lower()
    body = post.get("selftext", "").lower()
    text = title + " " + body

    if any(k in title for k in SKIP_KEYWORDS):
        return False
    if post.get("score", 0) < -5:
        return False
    if len(text.strip()) < 40:
        return False
    if post.get("is_self") is False and not body:
        return False  # Link post with no text

    return any(k in text for k in RELEVANCE_KEYWORDS)


def save_draft(post: dict, answer_data: dict) -> Path:
    DRAFT_DIR.mkdir(parents=True, exist_ok=True)
    pid = post.get("id", "unknown")
    slug = hashlib.md5(pid.encode()).hexdigest()[:8]
    sub = post.get("subreddit", "unknown")
    fname = DRAFT_DIR / f"draft-reddit-{sub}-{slug}-{DATE_SLUG}.json"

    draft = {
        "platform": "Reddit",
        "subreddit": f"r/{sub}",
        "post_id": pid,
        "post_url": f"https://reddit.com{post.get('permalink', '')}",
        "post_title": post.get("title", ""),
        "post_body": post.get("selftext", "")[:500],
        "post_score": post.get("score", 0),
        "post_comments": post.get("num_comments", 0),
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "q_type": answer_data.get("q_type"),
        "sa_relevant": answer_data.get("sa_relevant"),
        "answer": answer_data.get("answer"),
        "cost_usd": answer_data.get("cost_usd"),
        "status": "draft",
        "manual_post_url": f"https://reddit.com{post.get('permalink', '')}",
        "note": "Post manually until REDDIT_AUTO_POST=true + API approved + karma >100",
    }

    fname.write_text(json.dumps(draft, indent=2, ensure_ascii=False))
    print(f"  Draft: {fname.name}")
    return fname


def post_via_praw(post_id: str, subreddit: str, answer: str) -> bool:
    """Post reply via PRAW — only when credentials + karma available."""
    if not CLIENT_ID or not CLIENT_SECRET or not REDDIT_PASSWORD:
        return False
    try:
        import praw
        reddit = praw.Reddit(
            client_id=CLIENT_ID,
            client_secret=CLIENT_SECRET,
            username=REDDIT_USERNAME,
            password=REDDIT_PASSWORD,
            user_agent=f"ZA-Support-Community-Helper/2.0 (by u/{REDDIT_USERNAME})",
        )
        submission = reddit.submission(id=post_id)
        submission.reply(answer)
        time.sleep(10)
        return True
    except Exception as e:
        print(f"  PRAW post failed: {e}")
        return False


def main():
    print(f"Reddit Monitor v2.0 — {datetime.now().strftime('%d/%m/%Y %H:%M')}")
    print(f"Mode: {'AUTO-POST' if AUTO_POST else 'DRAFT ONLY (manual posting required)'}")
    if not AUTO_POST:
        print(f"Note: Account DesperateBonus6367 needs karma before auto-posting.")
        print(f"      Drafts saved to {DRAFT_DIR} — post manually to build karma.")
    print("=" * 60)

    seen = load_seen()
    drafts_created = 0
    posted = 0
    total_cost = 0.0
    processed: set = set()

    # Phase 1: Monitor subreddit new posts
    for sub in SUBREDDITS:
        if drafts_created >= MAX_DRAFTS_PER_NIGHT:
            break
        print(f"\nMonitoring r/{sub}...")
        posts = get_new_posts(sub, limit=25)
        time.sleep(2)  # polite delay

        for post in posts:
            if drafts_created >= MAX_DRAFTS_PER_NIGHT:
                break
            pid = post.get("id", "")
            if not pid or pid in seen or pid in processed:
                continue
            processed.add(pid)
            if not is_relevant(post):
                continue

            print(f"\n  [{sub}] {post.get('title', '')[:75]}")
            result = generate_answer(
                title=post.get("title", ""),
                body=post.get("selftext", ""),
                platform="Reddit",
                subreddit=sub,
            )
            if result.get("error") or not result.get("answer"):
                seen.add(pid)
                continue

            total_cost += result.get("cost_usd", 0)
            draft_file = save_draft(post, result)

            if AUTO_POST and CLIENT_ID:
                success = post_via_praw(pid, sub, result["answer"])
                if success:
                    draft = json.loads(draft_file.read_text())
                    draft["status"] = "posted"
                    draft_file.write_text(json.dumps(draft, indent=2))
                    posted += 1
            else:
                drafts_created += 1

            seen.add(pid)
            time.sleep(3)

    # Phase 2: Keyword search for SA/JHB specific questions
    if drafts_created < MAX_DRAFTS_PER_NIGHT:
        print(f"\nSearching for SA-specific questions...")
        for query in SEARCH_QUERIES[-3:]:  # Last 3 are SA-specific
            if drafts_created >= MAX_DRAFTS_PER_NIGHT:
                break
            posts = search_reddit(query, limit=8)
            time.sleep(3)
            for post in posts:
                if drafts_created >= MAX_DRAFTS_PER_NIGHT:
                    break
                pid = post.get("id", "")
                if not pid or pid in seen or pid in processed:
                    continue
                processed.add(pid)
                if not is_relevant(post):
                    continue
                print(f"\n  [search] {post.get('title', '')[:75]}")
                result = generate_answer(
                    title=post.get("title", ""),
                    body=post.get("selftext", ""),
                    platform="Reddit",
                    subreddit=post.get("subreddit", ""),
                )
                if result.get("error") or not result.get("answer"):
                    seen.add(pid)
                    continue
                total_cost += result.get("cost_usd", 0)
                save_draft(post, result)
                drafts_created += 1
                seen.add(pid)
                time.sleep(3)

    save_seen(seen)

    print("\n" + "=" * 60)
    print(f"Drafts created: {drafts_created}")
    print(f"Answers posted: {posted}")
    print(f"Total API cost: ${total_cost:.4f}")
    print(f"Drafts: {DRAFT_DIR}")
    if not AUTO_POST:
        print(f"\nNext step: Review drafts and post manually at reddit.com")
        print(f"Auto-posting enabled when: karma >100 + REDDIT_AUTO_POST=true + API approved")
    return 0


if __name__ == "__main__":
    sys.exit(main())
