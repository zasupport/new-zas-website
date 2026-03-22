#!/usr/bin/env python3
"""
ifixit-poster.py v1.0 — ZA Support iFixit Auto-Poster
Uses Playwright browser automation — posts answers to iFixit Q&A via web UI.
Reads drafts from ~/Desktop/Claude/iFixit/, posts, marks as posted.
Cost: $0.00 | Rate limit: max 5 posts/night | Delay: 30-60s between posts
"""

import os
import sys
import json
import time
import random
from pathlib import Path
from datetime import datetime, timezone, timedelta

HOME = Path.home()
DRAFT_DIR = HOME / "Desktop" / "Claude" / "iFixit"
LOG_FILE = HOME / ".za-ifixit-poster.log"
MAX_POSTS_PER_NIGHT = 5
MIN_DELAY = 30
MAX_DELAY = 60

IFIXIT_USERNAME = os.environ.get("IFIXIT_USERNAME", "")
IFIXIT_PASSWORD = os.environ.get("IFIXIT_PASSWORD", "")


def log(msg: str):
    ts = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    line = f"{ts} [ifixit-poster] {msg}"
    print(line)
    with open(LOG_FILE, "a") as f:
        f.write(line + "\n")


def load_drafts() -> list[Path]:
    if not DRAFT_DIR.exists():
        return []
    cutoff = datetime.now(timezone.utc) - timedelta(hours=72)
    drafts = []
    for f in sorted(DRAFT_DIR.glob("draft-ifixit-*.json")):
        try:
            d = json.loads(f.read_text())
            if d.get("status") != "draft":
                continue
            gen_time = datetime.fromisoformat(d.get("generated_at", "2000-01-01T00:00:00+00:00"))
            if gen_time < cutoff:
                continue
            drafts.append(f)
        except Exception:
            continue
    return drafts[:MAX_POSTS_PER_NIGHT]


def mark_posted(path: Path, url: str = ""):
    d = json.loads(path.read_text())
    d["status"] = "posted"
    d["posted_at"] = datetime.now(timezone.utc).isoformat()
    d["posted_url"] = url
    path.write_text(json.dumps(d, indent=2, ensure_ascii=False))


def mark_failed(path: Path, reason: str):
    d = json.loads(path.read_text())
    d["status"] = "failed"
    d["fail_reason"] = reason
    path.write_text(json.dumps(d, indent=2, ensure_ascii=False))


def ifixit_login(page) -> bool:
    if not IFIXIT_PASSWORD or not IFIXIT_USERNAME:
        log("SKIP: IFIXIT_USERNAME / IFIXIT_PASSWORD not set")
        return False

    log(f"Logging into iFixit as {IFIXIT_USERNAME}...")
    page.goto("https://www.ifixit.com/Login", wait_until="domcontentloaded", timeout=20000)
    time.sleep(2)

    try:
        page.fill("input[name='username']", IFIXIT_USERNAME)
        time.sleep(0.5)
        page.fill("input[name='password']", IFIXIT_PASSWORD)
        time.sleep(1)
        page.click("button[type='submit']")
        time.sleep(4)

        if "/Login" in page.url:
            log("iFixit login failed")
            return False
        log("iFixit login successful")
        return True
    except Exception as e:
        log(f"iFixit login error: {e}")
        return False


def post_ifixit_answer(page, question_url: str, answer: str) -> tuple[bool, str]:
    try:
        log(f"  Navigating to: {question_url[:80]}")
        page.goto(question_url, wait_until="domcontentloaded", timeout=30000)
        time.sleep(3)

        # iFixit answer textarea
        textarea = page.locator("textarea.answer-body, textarea[placeholder*='answer'], .answer-form textarea").first
        if not textarea.is_visible(timeout=8000):
            return False, "answer textarea not found"

        textarea.click()
        time.sleep(1)
        chunks = [answer[i:i+60] for i in range(0, len(answer), 60)]
        for chunk in chunks:
            textarea.type(chunk, delay=random.randint(25, 55))
            time.sleep(random.uniform(0.1, 0.2))

        time.sleep(2)

        # Submit button
        submit = page.locator("button[type='submit']:has-text('Post'), button:has-text('Add Answer'), input[type='submit']").first
        submit.click()
        time.sleep(5)

        return True, page.url
    except Exception as e:
        return False, str(e)


def main():
    log(f"iFixit Poster v1.0 — {datetime.now().strftime('%d/%m/%Y %H:%M')}")

    if not IFIXIT_PASSWORD:
        print("SKIP: IFIXIT_USERNAME / IFIXIT_PASSWORD not set in ~/.za-keys-pending.env")
        print("Add: IFIXIT_USERNAME=your_email")
        print("     IFIXIT_PASSWORD=your_password")
        print("Create account at: https://www.ifixit.com/Register")
        return 0

    drafts = load_drafts()
    if not drafts:
        log("No unposted iFixit drafts found")
        return 0

    log(f"Found {len(drafts)} drafts to post")

    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        log("ERROR: playwright not installed")
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
            viewport={"width": 1280, "height": 900},
        )
        page = context.new_page()
        page.add_init_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined});")

        if not ifixit_login(page):
            browser.close()
            return 1

        for draft_path in drafts:
            if posted >= MAX_POSTS_PER_NIGHT:
                break

            draft = json.loads(draft_path.read_text())
            q_url = draft.get("question_url", "")
            answer = draft.get("answer", "")

            if not q_url or not answer:
                mark_failed(draft_path, "missing question_url or answer")
                continue

            log(f"\nPosting to: {draft.get('question_title', '')[:60]}")
            success, result = post_ifixit_answer(page, q_url, answer)

            if success:
                mark_posted(draft_path, result)
                posted += 1
                log(f"  POSTED ({posted}/{MAX_POSTS_PER_NIGHT})")
                if posted < MAX_POSTS_PER_NIGHT:
                    delay = random.randint(MIN_DELAY, MAX_DELAY)
                    log(f"  Waiting {delay}s...")
                    time.sleep(delay)
            else:
                mark_failed(draft_path, result)
                failed += 1
                log(f"  FAILED: {result}")
                time.sleep(10)

        browser.close()

    log(f"Done — Posted: {posted} | Failed: {failed}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
