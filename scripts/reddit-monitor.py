#!/usr/bin/env python3
"""
reddit-monitor.py — ZA Support Reddit Community Monitor
Searches relevant subreddits for Mac repair questions → generates genuine answers.
Saves drafts to ~/Desktop/Claude/Reddit/ for review.
Auto-posts if REDDIT_AUTO_POST=true in env (disabled by default — human review first).
Cost: ~$0.003/answer (Haiku API) | $0.00 for search (PRAW free)
Rate limit: max 5 answers per night, max 2 per subreddit.
"""

import os
import sys
import json
import time
import hashlib
from pathlib import Path
from datetime import datetime, timezone

try:
    import praw
    from prawcore.exceptions import PrawcoreException
except ImportError:
    print("SKIP: praw not installed. Run: pip install praw")
    sys.exit(0)

# Local import
SCRIPTS_DIR = Path(__file__).parent
sys.path.insert(0, str(SCRIPTS_DIR))
from community_answer_generator import generate_answer

# ── Config ──────────────────────────────────────────────────────────────────
HOME = Path.home()
DRAFT_DIR = HOME / "Desktop" / "Claude" / "Reddit"
SEEN_FILE = HOME / ".za-reddit-seen.json"
MAX_ANSWERS_PER_NIGHT = 5
MAX_PER_SUBREDDIT = 2
AUTO_POST = os.environ.get("REDDIT_AUTO_POST", "false").lower() == "true"
DATE_SLUG = datetime.now().strftime("%d%m%Y")

# Reddit credentials from env
CLIENT_ID = os.environ.get("REDDIT_CLIENT_ID", "")
CLIENT_SECRET = os.environ.get("REDDIT_CLIENT_SECRET", "")
REDDIT_USERNAME = os.environ.get("REDDIT_USERNAME", "")
REDDIT_PASSWORD = os.environ.get("REDDIT_PASSWORD", "")
USER_AGENT = "ZA-Support-Community-Helper/1.0 (by u/zasupport_jozi)"

# Subreddits to monitor (ordered by relevance)
SUBREDDITS = [
    "applehelp",
    "MacOS",
    "mac",
    "southafrica",
    "johannesburg",
    "techsupport",
    "apple",
]

# Search terms → each searched in each relevant subreddit
SEARCH_QUERIES = [
    "macbook won't turn on",
    "macbook logic board",
    "macbook liquid damage",
    "macbook not charging",
    "macbook black screen",
    "macbook repair johannesburg",
    "macbook repair south africa",
    "macbook after load shedding",
    "apple repair cost",
]

# Subreddits where SA mention is organic
SA_SUBREDDITS = {"southafrica", "johannesburg"}

# Keywords that make a post relevant
RELEVANCE_KEYWORDS = [
    "logic board", "motherboard", "won't turn on", "not turning on",
    "liquid damage", "water damage", "spill", "not charging", "won't charge",
    "black screen", "no display", "dead mac", "load shedding", "power surge",
    "eskom", "repair cost", "johannesburg", "south africa", "cape town",
    "apple store quoted", "apple quoted", "r15000", "r20000", "r35000",
]

# Skip posts with these in title (likely already solved, low value)
SKIP_KEYWORDS = [
    "solved", "[solved]", "fixed", "update:", "never mind",
]


def load_seen() -> set:
    if SEEN_FILE.exists():
        try:
            return set(json.loads(SEEN_FILE.read_text()))
        except Exception:
            return set()
    return set()


def save_seen(seen: set):
    SEEN_FILE.write_text(json.dumps(list(seen), indent=2))


def post_id(post) -> str:
    return post.id


def is_relevant(post) -> bool:
    title = post.title.lower()
    body = getattr(post, "selftext", "").lower()
    text = title + " " + body

    if any(k in title for k in SKIP_KEYWORDS):
        return False
    if len(text.strip()) < 50:
        return False
    if post.score < -5:  # Skip heavily downvoted posts
        return False

    # Must match at least one relevance keyword
    return any(k in text for k in RELEVANCE_KEYWORDS)


def already_answered_by_us(post, reddit) -> bool:
    """Check if we already replied to this post."""
    try:
        post.comments.replace_more(limit=0)
        for comment in post.comments.list():
            if comment.author and comment.author.name == REDDIT_USERNAME:
                return True
    except Exception:
        pass
    return False


def save_draft(post, answer_data: dict, subreddit: str):
    DRAFT_DIR.mkdir(parents=True, exist_ok=True)
    slug = hashlib.md5(post.id.encode()).hexdigest()[:8]
    fname = DRAFT_DIR / f"draft-reddit-{subreddit}-{slug}-{DATE_SLUG}.json"

    draft = {
        "platform": "Reddit",
        "subreddit": f"r/{subreddit}",
        "post_id": post.id,
        "post_url": f"https://reddit.com{post.permalink}",
        "post_title": post.title,
        "post_body": getattr(post, "selftext", "")[:500],
        "post_score": post.score,
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "q_type": answer_data.get("q_type"),
        "sa_relevant": answer_data.get("sa_relevant"),
        "answer": answer_data.get("answer"),
        "cost_usd": answer_data.get("cost_usd"),
        "status": "draft",  # "draft" | "posted" | "skipped"
    }
    fname.write_text(json.dumps(draft, indent=2, ensure_ascii=False))
    print(f"  Draft saved: {fname.name}")
    return fname


def post_to_reddit(reddit, post, answer: str) -> bool:
    try:
        post.reply(answer)
        print(f"  Posted reply to: {post.id}")
        time.sleep(10)  # Reddit rate limit buffer
        return True
    except Exception as e:
        print(f"  Post failed: {e}")
        return False


def main():
    print(f"Reddit Monitor — {datetime.now().strftime('%d/%m/%Y %H:%M')}")
    print(f"Auto-post: {'ON' if AUTO_POST else 'OFF (draft mode)'}")
    print("=" * 60)

    if not CLIENT_ID or not CLIENT_SECRET:
        print("SKIP: REDDIT_CLIENT_ID / REDDIT_CLIENT_SECRET not set in env")
        print("Add to ~/.za-keys-pending.env:")
        print("  REDDIT_CLIENT_ID=your_app_client_id")
        print("  REDDIT_CLIENT_SECRET=your_app_client_secret")
        print("  REDDIT_USERNAME=zasupport_jozi")
        print("  REDDIT_PASSWORD=your_reddit_password")
        print("Create app at: https://www.reddit.com/prefs/apps")
        return 0

    try:
        reddit = praw.Reddit(
            client_id=CLIENT_ID,
            client_secret=CLIENT_SECRET,
            username=REDDIT_USERNAME,
            password=REDDIT_PASSWORD,
            user_agent=USER_AGENT,
        )
        reddit.user.me()  # Verify auth
        print(f"Authenticated as: u/{REDDIT_USERNAME}")
    except Exception as e:
        print(f"Reddit auth failed: {e}")
        return 1

    seen = load_seen()
    answers_posted = 0
    per_subreddit_count: dict[str, int] = {}
    total_cost = 0.0
    drafts_created = 0

    for subreddit_name in SUBREDDITS:
        if answers_posted >= MAX_ANSWERS_PER_NIGHT:
            break

        subreddit_count = per_subreddit_count.get(subreddit_name, 0)
        if subreddit_count >= MAX_PER_SUBREDDIT:
            continue

        try:
            subreddit = reddit.subreddit(subreddit_name)
            # Search last 24h of new posts
            for post in subreddit.new(limit=50):
                if answers_posted >= MAX_ANSWERS_PER_NIGHT:
                    break
                if subreddit_count >= MAX_PER_SUBREDDIT:
                    break

                pid = post_id(post)
                if pid in seen:
                    continue
                if not is_relevant(post):
                    continue
                if already_answered_by_us(post, reddit):
                    seen.add(pid)
                    continue

                print(f"\n  [{subreddit_name}] {post.title[:80]}")
                print(f"  Score: {post.score} | URL: reddit.com{post.permalink}")

                # Generate answer
                result = generate_answer(
                    title=post.title,
                    body=getattr(post, "selftext", ""),
                    platform="Reddit",
                    subreddit=subreddit_name,
                )

                if result.get("error") or not result.get("answer"):
                    print(f"  Generation failed: {result.get('error')}")
                    seen.add(pid)
                    continue

                total_cost += result.get("cost_usd", 0)
                draft_file = save_draft(post, result, subreddit_name)

                if AUTO_POST:
                    success = post_to_reddit(reddit, post, result["answer"])
                    if success:
                        # Update draft status
                        draft = json.loads(draft_file.read_text())
                        draft["status"] = "posted"
                        draft_file.write_text(json.dumps(draft, indent=2))
                        answers_posted += 1
                        subreddit_count += 1
                        per_subreddit_count[subreddit_name] = subreddit_count
                else:
                    drafts_created += 1

                seen.add(pid)
                time.sleep(3)  # Polite delay between generations

        except PrawcoreException as e:
            print(f"  Subreddit error ({subreddit_name}): {e}")
            continue
        except Exception as e:
            print(f"  Unexpected error ({subreddit_name}): {e}")
            continue

    save_seen(seen)

    print("\n" + "=" * 60)
    print(f"Answers posted: {answers_posted}")
    print(f"Drafts created: {drafts_created}")
    print(f"Total API cost: ${total_cost:.4f}")
    print(f"Drafts location: {DRAFT_DIR}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
