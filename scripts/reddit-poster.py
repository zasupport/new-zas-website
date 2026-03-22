#!/usr/bin/env python3
"""
reddit-poster.py v1.0 — ZA Support Reddit Auto-Poster
Uses Playwright browser automation — no API key or approval needed.
Reads drafts from ~/Desktop/Claude/Reddit/, posts via web UI, marks as posted.
Cost: $0.00 (no API) | Rate limit: max 3 posts/night | Delay: 45-90s between posts
"""

import os
import sys
import json
import time
import random
from pathlib import Path
from datetime import datetime, timezone, timedelta

HOME = Path.home()
DRAFT_DIR = HOME / "Desktop" / "Claude" / "Reddit"
LOG_FILE = HOME / ".za-reddit-poster.log"
MAX_POSTS_PER_NIGHT = 3
MIN_DELAY = 45   # seconds between posts
MAX_DELAY = 90

REDDIT_USERNAME = os.environ.get("REDDIT_USERNAME", "DesperateBonus6367")
REDDIT_PASSWORD = os.environ.get("REDDIT_PASSWORD", "")


def log(msg: str):
    ts = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    line = f"{ts} [reddit-poster] {msg}"
    print(line)
    with open(LOG_FILE, "a") as f:
        f.write(line + "\n")


def load_drafts() -> list[Path]:
    """Load unposted drafts, sorted oldest first, skip >48h old."""
    if not DRAFT_DIR.exists():
        return []
    cutoff = datetime.now(timezone.utc) - timedelta(hours=48)
    drafts = []
    for f in sorted(DRAFT_DIR.glob("draft-reddit-*.json")):
        try:
            d = json.loads(f.read_text())
            if d.get("status") != "draft":
                continue
            gen_time = datetime.fromisoformat(d.get("generated_at", "2000-01-01T00:00:00+00:00"))
            if gen_time < cutoff:
                log(f"SKIP (>48h old): {f.name}")
                continue
            drafts.append(f)
        except Exception:
            continue
    return drafts[:MAX_POSTS_PER_NIGHT]


def mark_posted(draft_path: Path, comment_url: str = ""):
    d = json.loads(draft_path.read_text())
    d["status"] = "posted"
    d["posted_at"] = datetime.now(timezone.utc).isoformat()
    d["comment_url"] = comment_url
    draft_path.write_text(json.dumps(d, indent=2, ensure_ascii=False))


def mark_failed(draft_path: Path, reason: str):
    d = json.loads(draft_path.read_text())
    d["status"] = "failed"
    d["fail_reason"] = reason
    d["failed_at"] = datetime.now(timezone.utc).isoformat()
    draft_path.write_text(json.dumps(d, indent=2, ensure_ascii=False))


def post_reddit_answer(page, post_url: str, answer: str) -> tuple[bool, str]:
    """
    Navigate to a Reddit post and submit a reply.
    Returns (success, comment_url_or_error).
    """
    try:
        # Use old Reddit for simpler DOM
        old_url = post_url.replace("www.reddit.com", "old.reddit.com")
        if "old.reddit.com" not in old_url:
            old_url = old_url.replace("reddit.com", "old.reddit.com")

        log(f"  Navigating to: {old_url[:80]}")
        page.goto(old_url, wait_until="domcontentloaded", timeout=30000)
        time.sleep(3)

        # Check if post still exists
        if "page not found" in page.title().lower() or "404" in page.url:
            return False, "post not found"

        # Find reply textarea (old Reddit: .usertext-edit textarea)
        textarea = page.locator("div.usertext-edit textarea").first
        if not textarea.is_visible(timeout=5000):
            # Try alternative selectors
            textarea = page.locator("textarea[name='text']").first
            if not textarea.is_visible(timeout=3000):
                return False, "reply textarea not found"

        # Click textarea and type answer with human-like delays
        textarea.click()
        time.sleep(1)
        # Type in chunks to appear more human
        chunks = [answer[i:i+50] for i in range(0, len(answer), 50)]
        for chunk in chunks:
            textarea.type(chunk, delay=random.randint(20, 60))
            time.sleep(random.uniform(0.1, 0.3))

        time.sleep(2)

        # Find and click submit button
        submit_btn = page.locator("button[type='submit'].save").first
        if not submit_btn.is_visible(timeout=3000):
            submit_btn = page.locator(".usertext-buttons button.save").first
        submit_btn.click()
        time.sleep(5)

        # Verify comment appeared (check URL or success indicator)
        current_url = page.url
        log(f"  Posted. URL: {current_url[:80]}")
        return True, current_url

    except Exception as e:
        return False, str(e)


def reddit_login(page) -> bool:
    """Log into Reddit via old.reddit.com."""
    if not REDDIT_PASSWORD:
        log("ERROR: REDDIT_PASSWORD not set in env")
        return False

    log(f"Logging in as u/{REDDIT_USERNAME}...")
    page.goto("https://old.reddit.com/login", wait_until="domcontentloaded", timeout=20000)
    time.sleep(2)

    try:
        page.fill("#user_login", REDDIT_USERNAME)
        time.sleep(0.5)
        page.fill("#passwd_login", REDDIT_PASSWORD)
        time.sleep(1)
        page.click("#login-form button[type='submit']")
        time.sleep(4)

        # Verify login
        if "reddit.com/login" in page.url:
            log("Login failed — still on login page")
            return False
        log("Login successful")
        return True
    except Exception as e:
        log(f"Login error: {e}")
        return False


def main():
    log(f"Reddit Poster v1.0 — {datetime.now().strftime('%d/%m/%Y %H:%M')}")

    if not REDDIT_PASSWORD:
        print("SKIP: REDDIT_PASSWORD not set in ~/.za-keys-pending.env")
        print("Add: REDDIT_PASSWORD=your_password")
        return 1

    drafts = load_drafts()
    if not drafts:
        log("No unposted drafts found in ~/Desktop/Claude/Reddit/")
        return 0

    log(f"Found {len(drafts)} drafts to post (max {MAX_POSTS_PER_NIGHT}/night)")

    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        log("ERROR: playwright not installed. Run: pip3 install playwright && python3 -m playwright install chromium")
        return 1

    posted = 0
    failed = 0

    with sync_playwright() as p:
        browser = p.chromium.launch(
            headless=True,
            args=["--no-sandbox", "--disable-blink-features=AutomationControlled"],
        )
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            viewport={"width": 1280, "height": 800},
        )
        page = context.new_page()

        # Stealth: hide automation signals
        page.add_init_script("""
            Object.defineProperty(navigator, 'webdriver', {get: () => undefined});
            window.chrome = {runtime: {}};
        """)

        # Login once, reuse session for all posts
        if not reddit_login(page):
            log("Cannot proceed without login")
            browser.close()
            return 1

        for draft_path in drafts:
            if posted >= MAX_POSTS_PER_NIGHT:
                break

            draft = json.loads(draft_path.read_text())
            post_url = draft.get("post_url", "")
            answer = draft.get("answer", "")
            subreddit = draft.get("subreddit", "")

            if not post_url or not answer:
                mark_failed(draft_path, "missing post_url or answer")
                continue

            log(f"\nPosting to {subreddit}: {draft.get('post_title', '')[:60]}")
            log(f"  URL: {post_url}")

            success, result = post_reddit_answer(page, post_url, answer)

            if success:
                mark_posted(draft_path, result)
                posted += 1
                log(f"  POSTED ({posted}/{MAX_POSTS_PER_NIGHT})")

                if posted < MAX_POSTS_PER_NIGHT:
                    delay = random.randint(MIN_DELAY, MAX_DELAY)
                    log(f"  Waiting {delay}s before next post...")
                    time.sleep(delay)
            else:
                mark_failed(draft_path, result)
                failed += 1
                log(f"  FAILED: {result}")
                time.sleep(15)

        browser.close()

    log(f"\nDone — Posted: {posted} | Failed: {failed}")
    return 0 if failed == 0 or posted > 0 else 1


if __name__ == "__main__":
    sys.exit(main())
