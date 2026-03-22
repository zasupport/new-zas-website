#!/usr/bin/env python3
"""
seeder-poster.py v1.0 — ZA Support Seeder Question Poster
Posts QUESTIONS (not answers) from seeder persona accounts via Playwright.
These questions are then answered by the authority account.

Reads question drafts from ~/Desktop/Claude/Reddit/ (role=question)
Credentials come from Personas/personas.json
Max: 2 questions/seeder/night | Delay: 5-10 min between posts
"""

import os
import sys
import json
import time
import random
from pathlib import Path
from datetime import datetime, timezone, timedelta

HOME = Path.home()
PERSONA_FILE = HOME / "Desktop" / "Claude" / "Personas" / "personas.json"
REDDIT_DRAFT_DIR = HOME / "Desktop" / "Claude" / "Reddit"
LOG_FILE = HOME / ".za-seeder-poster.log"
MAX_PER_SEEDER_PER_NIGHT = 2
MIN_DELAY = 300   # 5 min
MAX_DELAY = 600   # 10 min


def log(msg: str):
    ts = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    line = f"{ts} [seeder-poster] {msg}"
    print(line)
    with open(LOG_FILE, "a") as f:
        f.write(line + "\n")


def load_personas() -> list[dict]:
    if not PERSONA_FILE.exists():
        return []
    try:
        return json.loads(PERSONA_FILE.read_text()).get("personas", [])
    except Exception:
        return []


def load_question_drafts(persona_id: str) -> list[Path]:
    """Load unposted question drafts for a specific seeder persona."""
    if not REDDIT_DRAFT_DIR.exists():
        return []
    cutoff = datetime.now(timezone.utc) - timedelta(hours=48)
    drafts = []
    for f in sorted(REDDIT_DRAFT_DIR.glob("draft-reddit-question-*.json")):
        try:
            d = json.loads(f.read_text())
            if d.get("status") != "draft":
                continue
            if d.get("persona_id") != persona_id:
                continue
            gen_time = datetime.fromisoformat(d.get("generated_at", "2000-01-01T00:00:00+00:00"))
            if gen_time < cutoff:
                continue
            drafts.append(f)
        except Exception:
            continue
    return drafts[:MAX_PER_SEEDER_PER_NIGHT]


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


def post_reddit_question(page, subreddit: str, title: str, body: str) -> tuple[bool, str]:
    """Post a new thread to old.reddit.com/r/{subreddit}/submit"""
    try:
        submit_url = f"https://old.reddit.com/r/{subreddit}/submit"
        log(f"  Navigating to: {submit_url}")
        page.goto(submit_url, wait_until="domcontentloaded", timeout=30000)
        time.sleep(3)

        # Check if redirected to login (means we're not logged in)
        if "login" in page.url or "register" in page.url:
            return False, "not logged in — redirected to login page"

        # Select "Text" tab (self post)
        text_tab = page.locator("a[href*='submit?selftext=true'], li.selected-tab a:has-text('Text'), a:has-text('Text')").first
        try:
            if text_tab.is_visible(timeout=3000):
                text_tab.click()
                time.sleep(1)
        except Exception:
            pass  # Tab might already be on text

        # Fill title
        title_input = page.locator("input[name='title'], #title").first
        if not title_input.is_visible(timeout=5000):
            return False, "title input not found"
        title_input.click()
        time.sleep(0.5)
        title_input.fill(title)
        time.sleep(0.5)

        # Fill body text
        body_area = page.locator("textarea[name='text'], #text").first
        if body_area.is_visible(timeout=3000):
            body_area.click()
            time.sleep(1)
            chunks = [body[i:i+50] for i in range(0, len(body), 50)]
            for chunk in chunks:
                body_area.type(chunk, delay=random.randint(20, 60))
                time.sleep(random.uniform(0.1, 0.3))
            time.sleep(2)

        # Submit
        submit = page.locator("button[type='submit'].save, button:has-text('Submit'), input[type='submit'][value='submit']").first
        submit.click()
        time.sleep(6)

        current_url = page.url
        log(f"  Posted. URL: {current_url[:80]}")
        return True, current_url

    except Exception as e:
        return False, str(e)


def reddit_login(page, username: str, password: str) -> bool:
    if not password:
        log(f"ERROR: no password for {username}")
        return False
    log(f"Logging in as u/{username}...")
    page.goto("https://old.reddit.com/login", wait_until="domcontentloaded", timeout=20000)
    time.sleep(2)
    try:
        page.fill("#user_login", username)
        time.sleep(0.5)
        page.fill("#passwd_login", password)
        time.sleep(1)
        page.click("#login-form button[type='submit']")
        time.sleep(4)
        if "reddit.com/login" in page.url:
            log("Login failed")
            return False
        log("Login successful")
        return True
    except Exception as e:
        log(f"Login error: {e}")
        return False


def main():
    log(f"Seeder Poster v1.0 — {datetime.now().strftime('%d/%m/%Y %H:%M')}")

    personas = load_personas()
    if not personas:
        log("No personas configured — run: python3 scripts/persona-manager.py --init")
        return 0

    active_seeders = [p for p in personas if p.get("role") == "seeder" and p.get("active")
                      and p.get("reddit_username") and p.get("reddit_password")]

    if not active_seeders:
        log("No active seeder personas with Reddit credentials")
        log("Add Reddit username/password to Desktop/Claude/Personas/personas.json and set active=true")
        return 0

    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        log("ERROR: playwright not installed. Run: pip3 install playwright && python3 -m playwright install chromium")
        return 1

    total_posted = 0
    total_failed = 0

    with sync_playwright() as p:
        for persona in active_seeders:
            username = persona["reddit_username"]
            password = persona["reddit_password"]
            persona_id = persona["id"]

            drafts = load_question_drafts(persona_id)
            if not drafts:
                log(f"\n{persona['name']}: no question drafts to post")
                continue

            log(f"\n{persona['name']} ({username}): {len(drafts)} question(s) to post")

            browser = p.chromium.launch(
                headless=True,
                args=["--no-sandbox", "--disable-blink-features=AutomationControlled"],
            )
            context = browser.new_context(
                user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
                viewport={"width": 1280, "height": 800},
            )
            page = context.new_page()
            page.add_init_script("""
                Object.defineProperty(navigator, 'webdriver', {get: () => undefined});
                window.chrome = {runtime: {}};
            """)

            if not reddit_login(page, username, password):
                browser.close()
                log(f"Skipping {persona['name']} — login failed")
                continue

            posted_this_persona = 0
            for draft_path in drafts:
                if posted_this_persona >= MAX_PER_SEEDER_PER_NIGHT:
                    break

                draft = json.loads(draft_path.read_text())
                subreddit = draft.get("subreddit", "applehelp")
                title = draft.get("title", "")
                body = draft.get("body", "")

                if not title:
                    mark_failed(draft_path, "missing title")
                    continue

                log(f"\n  Posting to r/{subreddit}: {title[:60]}")
                success, result = post_reddit_question(page, subreddit, title, body)

                if success:
                    mark_posted(draft_path, result)
                    posted_this_persona += 1
                    total_posted += 1
                    log(f"  POSTED ({posted_this_persona}/{MAX_PER_SEEDER_PER_NIGHT})")

                    # Update linked answer draft with the question URL
                    pid = draft_path.name.split("-")[3] if "-" in draft_path.name else ""
                    if pid:
                        for af in REDDIT_DRAFT_DIR.glob(f"draft-reddit-answer-{pid}-*.json"):
                            try:
                                ad = json.loads(af.read_text())
                                ad["question_url"] = result
                                ad["post_url"] = result
                                af.write_text(json.dumps(ad, indent=2, ensure_ascii=False))
                                log(f"  Updated answer draft with question URL")
                            except Exception:
                                pass

                    if posted_this_persona < MAX_PER_SEEDER_PER_NIGHT:
                        delay = random.randint(MIN_DELAY, MAX_DELAY)
                        log(f"  Waiting {delay}s ({delay//60}m) before next post...")
                        time.sleep(delay)
                else:
                    mark_failed(draft_path, result)
                    total_failed += 1
                    log(f"  FAILED: {result}")
                    time.sleep(30)

            browser.close()

    log(f"\nDone — Posted: {total_posted} | Failed: {total_failed}")
    if total_posted > 0:
        log(f"Authority account should answer after ≥1h delay (reddit_poster.py will handle this)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
