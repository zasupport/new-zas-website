#!/usr/bin/env python3
"""
Reddit Phase Notification System
Runs daily — checks if today matches any phase trigger date across all 4 seeder accounts.
Sends email to courtney@zasupport.com via Resend API.
State file: ~/.za-reddit-phase-notify-sent.json — prevents duplicate sends.
"""

import json
import os
import sys
import datetime
import urllib.request
import urllib.error

# ── CONFIG ────────────────────────────────────────────────────────────────────
TO_EMAIL    = "courtney@zasupport.com"
FROM_EMAIL  = "ZA Support <hello@zasupport.com>"
STATE_FILE  = os.path.expanduser("~/.za-reddit-phase-notify-sent.json")
ENV_FILE    = os.path.expanduser("~/.za-keys-pending.env")

# ── LOAD ENV ──────────────────────────────────────────────────────────────────
def load_env():
    if os.path.exists(ENV_FILE):
        with open(ENV_FILE) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    k, v = line.split("=", 1)
                    os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))

load_env()
RESEND_API_KEY = os.environ.get("RESEND_API_KEY", "")

# ── TRIGGER DEFINITIONS ───────────────────────────────────────────────────────
# Date format: DD/MM/YYYY
TRIGGERS = [

    # ── ACCOUNT CREATION REMINDERS ───────────────────────────────────────────
    {
        "id": "create_elise",
        "date": "25/03/2026",
        "account": "Elise Mills",
        "phase": "Account Creation — Day 2",
        "subject": "Reddit Day 2 — Create Elise Mills Account Today",
        "actions": [
            "Use: home LAPTOP on home Wi-Fi (different device from yesterday's iPhone)",
            "Open private/incognito browser window",
            "Go to reddit.com/register",
            "Email: elisemills007@gmail.com | Password: !Hydrogen234!",
            "Suggested username: EliseMills007 (or EliseMSA if taken)",
            "Verify email via Gmail (same password)",
            "Set display name: Elise Mills",
            "Bio: Cape Town born, Joburg living. Love design, Apple stuff, and finding good coffee. Here mainly to lurk and occasionally ask for help.",
            "Do NOT upload profile picture",
            "Go to r/southafrica — upvote 3 posts",
            "Go to r/apple — upvote 2 posts",
            "Close incognito window when done",
            "Report back: username chosen + confirm password !Hydrogen234!",
        ],
        "next": "Tomorrow (26 Mar): Create Adam Levitt on a different device + network",
    },
    {
        "id": "create_adam",
        "date": "26/03/2026",
        "account": "Adam Levitt",
        "phase": "Account Creation — Day 3",
        "subject": "Reddit Day 3 — Create Adam Levitt Account Today",
        "actions": [
            "Use: DIFFERENT device from previous two (tablet, friend's phone, or second computer)",
            "Use: DIFFERENT Wi-Fi network (coffee shop, office, or different mobile data SIM)",
            "Open private/incognito browser window",
            "Go to reddit.com/register",
            "Email: adamlevitt0091@gmail.com | Password: peqqo2-sypquc-rarDob",
            "Suggested username: AdamLevitt0091 (or ALevitt91 if taken)",
            "Verify email via Gmail",
            "Set display name: Adam Levitt",
            "Bio: Software developer in Sandton. On here for tech communities, SA news, and the odd MacBook issue. Long-time Apple user.",
            "Do NOT upload profile picture",
            "Go to r/southafrica — upvote 3 posts",
            "Go to r/apple — upvote 2 posts",
            "Close incognito window when done",
        ],
        "next": "Tomorrow (27 Mar): Create Dovi Schaffer — 4th device, 4th network",
    },
    {
        "id": "create_dovi",
        "date": "27/03/2026",
        "account": "Dovi Schaffer",
        "phase": "Account Creation — Day 4",
        "subject": "Reddit Day 4 — Create Dovi Schaffer Account Today (Final Account)",
        "actions": [
            "Use: 4th unique device — different from all three previous",
            "Use: 4th unique network — different mobile data or location",
            "Open private/incognito browser window",
            "Go to reddit.com/register",
            "Email: dovischaffer19@gmail.com | Password: jacpok-2dotmi-kIkvid",
            "Suggested username: DoviSchaffer19 (or DSchaffer19 if taken)",
            "Verify email via Gmail",
            "Set display name: Dovi Schaffer",
            "Bio: Based in Hyde Park, JHB. Into tech, startups, and fixing things myself when possible. Usually here to ask questions.",
            "Do NOT upload profile picture",
            "Go to r/southafrica — upvote 3 posts",
            "Go to r/apple — upvote 2 posts",
            "Close incognito window when done",
            "IMPORTANT: Once all 4 accounts created, send usernames + passwords to Courtney so personas.json can be updated",
        ],
        "next": "All 4 accounts created. Phase 1 (passive) runs until 7 April. No action required until then.",
    },

    # ── PHASE 2 — FIRST COMMENTS (Day 15) ────────────────────────────────────
    {
        "id": "p2_nico",
        "date": "07/04/2026",
        "account": "Nico Hammans (u/Slow_Cheetah9554)",
        "phase": "Phase 2 — First Comments Begin",
        "subject": "Reddit Phase 2 — Nico Hammans: Start Commenting Today",
        "actions": [
            "Log in as Nico Hammans (u/Slow_Cheetah9554) on iPhone mobile data",
            "Go to r/southafrica or r/techsupport",
            "Leave 1 genuine, helpful comment on any tech-related post",
            "Example comment tone: 'Same issue here, restarting SMC fixed it for me'",
            "Do NOT mention ZA Support",
            "Do NOT post any questions yet — comments only",
            "Do NOT comment two days in a row — skip at least one day between sessions",
            "Target: 1-2 comments per week until Day 31",
        ],
        "next": "Elise Mills Phase 2 starts 08 April",
    },
    {
        "id": "p2_elise",
        "date": "08/04/2026",
        "account": "Elise Mills",
        "phase": "Phase 2 — First Comments Begin",
        "subject": "Reddit Phase 2 — Elise Mills: Start Commenting Today",
        "actions": [
            "Log in as Elise Mills on home laptop",
            "Go to r/southafrica or r/apple",
            "Leave 1 genuine comment — design, Apple product, or lifestyle topic",
            "Example: 'I had the same problem with my MacBook — turning off Wi-Fi and back on fixed it'",
            "Do NOT mention ZA Support",
            "1-2 comments per week, not consecutive days",
        ],
        "next": "Adam Levitt Phase 2 starts 09 April",
    },
    {
        "id": "p2_adam",
        "date": "09/04/2026",
        "account": "Adam Levitt",
        "phase": "Phase 2 — First Comments Begin",
        "subject": "Reddit Phase 2 — Adam Levitt: Start Commenting Today",
        "actions": [
            "Log in as Adam Levitt on his assigned device",
            "Go to r/techsupport or r/MacOS",
            "Leave 1 technical comment answering someone else's question",
            "Example: 'Try running sudo periodic daily weekly monthly in Terminal — clears cache and often fixes this'",
            "Sounds experienced — developer persona",
            "1-2 comments per week, not consecutive days",
        ],
        "next": "Dovi Schaffer Phase 2 starts 10 April",
    },
    {
        "id": "p2_dovi",
        "date": "10/04/2026",
        "account": "Dovi Schaffer",
        "phase": "Phase 2 — First Comments Begin",
        "subject": "Reddit Phase 2 — Dovi Schaffer: Start Commenting Today",
        "actions": [
            "Log in as Dovi Schaffer on his assigned device",
            "Go to r/apple or r/johannesburg",
            "Leave 1 comment — can be on a startup, tech, or JHB topic",
            "Sounds direct and busy: 'Yep, same. Ended up just doing a clean install.'",
            "1-2 comments per week, not consecutive days",
        ],
        "next": "All 4 accounts in Phase 2. Next milestone: Phase 3 starts 23 April (Nico).",
    },

    # ── PHASE 3 — FIRST QUESTIONS (Day 31) ───────────────────────────────────
    {
        "id": "p3_nico",
        "date": "23/04/2026",
        "account": "Nico Hammans (u/Slow_Cheetah9554)",
        "phase": "Phase 3 — First Mac Questions Begin",
        "subject": "Reddit Phase 3 — Nico: Check Karma + Start Asking Mac Questions",
        "actions": [
            "CHECK KARMA FIRST: go to reddit.com/u/Slow_Cheetah9554 — karma must be 10+ to proceed",
            "If karma < 10: comment for another week before posting questions",
            "If karma >= 10: post first genuine Mac question in r/applehelp or r/MacOS",
            "Sample question: 'My MBP 2019 logic board is throwing kernel panics after the latest Sequoia update — anyone seen this?'",
            "Do NOT mention ZA Support — this is a real question phase",
            "1-2 questions per week maximum",
            "Continue commenting on other posts between questions",
        ],
        "next": "Elise Phase 3 on 24 April | Adam 25 April | Dovi 26 April",
    },
    {
        "id": "p3_elise",
        "date": "24/04/2026",
        "account": "Elise Mills",
        "phase": "Phase 3 — First Mac Questions Begin",
        "subject": "Reddit Phase 3 — Elise: Check Karma + Start Asking Mac Questions",
        "actions": [
            "CHECK KARMA FIRST: go to reddit.com/u/[EliseUsername] — need 10+ karma",
            "If ready: post first question in r/applehelp or r/southafrica",
            "Sample: 'My MacBook Pro screen started flickering — iStore quoted R12K. Is that normal for South Africa?'",
            "Frustrated but friendly tone — she relies on her Mac for design work",
            "1-2 questions per week, continue organic comments",
        ],
        "next": "Adam Phase 3 on 25 April | Dovi 26 April",
    },
    {
        "id": "p3_adam",
        "date": "25/04/2026",
        "account": "Adam Levitt",
        "phase": "Phase 3 — First Mac Questions Begin",
        "subject": "Reddit Phase 3 — Adam: Check Karma + Start Asking Mac Questions",
        "actions": [
            "CHECK KARMA FIRST: need 10+ karma",
            "If ready: post technical question in r/macbook or r/applehelp",
            "Sample: 'SSD read speeds dropping on MBP 16 after extended use — 1.2GB/s instead of 5.5. Anyone else?'",
            "Developer tone — include specs and version numbers",
            "1-2 questions per week",
        ],
        "next": "Dovi Phase 3 on 26 April | Phase 4 activations begin 23 May",
    },
    {
        "id": "p3_dovi",
        "date": "26/04/2026",
        "account": "Dovi Schaffer",
        "phase": "Phase 3 — First Mac Questions Begin",
        "subject": "Reddit Phase 3 — Dovi: Check Karma + Start Asking Mac Questions",
        "actions": [
            "CHECK KARMA FIRST: need 10+ karma",
            "If ready: post question in r/applehelp or r/apple",
            "Sample: 'My MBA M2 won't charge — Apple quotes 2-week turnaround. Any faster options in JHB?'",
            "Direct, time-conscious tone",
            "1-2 questions per week",
            "All 4 accounts now in Phase 3 — Phase 4 activations begin in 4 weeks",
        ],
        "next": "Phase 4 activations: Nico 23 May | Elise 24 May | Adam 25 May | Dovi 26 May",
    },

    # ── 2-WEEK WARNING BEFORE PHASE 4 ────────────────────────────────────────
    {
        "id": "p4_warning",
        "date": "09/05/2026",
        "account": "All 4 Accounts",
        "phase": "Phase 4 Warning — 2 Weeks to Seeding",
        "subject": "Reddit Phase 4 in 2 Weeks — Check Karma on All Accounts Now",
        "actions": [
            "CHECK ALL ACCOUNT KARMA NOW — all must be 50+ by 23 May for Phase 4",
            "Nico (u/Slow_Cheetah9554): reddit.com/u/Slow_Cheetah9554",
            "Elise: reddit.com/u/[username]",
            "Adam: reddit.com/u/[username]",
            "Dovi: reddit.com/u/[username]",
            "If any account is below 50 karma: increase comment frequency to 3-4/week for next 2 weeks",
            "ALSO: register DesperateBonus6367 as a Reddit script app at reddit.com/prefs/apps",
            "  — Click 'Create App' → choose 'script' → name: 'ZA Support Bot'",
            "  — Note the client_id and client_secret",
            "  — Add to ~/.za-keys-pending.env: REDDIT_CLIENT_ID=xxx REDDIT_CLIENT_SECRET=xxx",
            "  — This is required before Phase 4 can go live",
        ],
        "next": "Phase 4 activation: Nico 23 May",
    },

    # ── PHASE 4 — SEEDING ACTIVE (Day 61) ────────────────────────────────────
    {
        "id": "p4_nico",
        "date": "23/05/2026",
        "account": "Nico Hammans (u/Slow_Cheetah9554)",
        "phase": "Phase 4 — SEEDING ACTIVE",
        "subject": "Reddit Phase 4 LIVE — Nico Hammans: Verify Karma + Activate in System",
        "actions": [
            "VERIFY: reddit.com/u/Slow_Cheetah9554 — karma must be 50+ to activate",
            "VERIFY: REDDIT_CLIENT_ID and REDDIT_CLIENT_SECRET are in ~/.za-keys-pending.env",
            "VERIFY: No account warnings or bans",
            "If all clear: update ~/Desktop/Claude/Personas/personas.json — set Nico active=true",
            "Update reddit_username field to u/Slow_Cheetah9554",
            "Overnight batch will now automatically generate and post seeding questions for Nico",
            "DesperateBonus6367 will reply recommending ZA Support",
            "Monitor first 3 nights: check .za-overnight-batch.log for seeder_poster results",
        ],
        "next": "Elise Phase 4 activation: 24 May",
    },
    {
        "id": "p4_elise",
        "date": "24/05/2026",
        "account": "Elise Mills",
        "phase": "Phase 4 — SEEDING ACTIVE",
        "subject": "Reddit Phase 4 LIVE — Elise Mills: Verify Karma + Activate in System",
        "actions": [
            "VERIFY: karma 50+ | No warnings",
            "Update personas.json: Elise Mills active=true, add reddit_username",
            "Monitor overnight batch log",
        ],
        "next": "Adam Phase 4 activation: 25 May",
    },
    {
        "id": "p4_adam",
        "date": "25/05/2026",
        "account": "Adam Levitt",
        "phase": "Phase 4 — SEEDING ACTIVE",
        "subject": "Reddit Phase 4 LIVE — Adam Levitt: Verify Karma + Activate in System",
        "actions": [
            "VERIFY: karma 50+ | No warnings",
            "Update personas.json: Adam Levitt active=true, add reddit_username",
            "Monitor overnight batch log",
        ],
        "next": "Dovi Phase 4 activation: 26 May — final account",
    },
    {
        "id": "p4_dovi",
        "date": "26/05/2026",
        "account": "Dovi Schaffer",
        "phase": "Phase 4 — SEEDING ACTIVE (All Accounts Live)",
        "subject": "Reddit Phase 4 COMPLETE — All 4 Seeders Active — Full System Live",
        "actions": [
            "VERIFY: karma 50+ | No warnings",
            "Update personas.json: Dovi Schaffer active=true, add reddit_username",
            "ALL 4 SEEDER ACCOUNTS NOW ACTIVE",
            "Overnight batch runs: persona_questions + seeder_poster + reddit_poster (authority)",
            "Weekly monitoring: check each account has not been shadowbanned",
            "Test shadowban: open incognito, go to reddit.com/u/[username] — if profile shows = fine",
            "Maximum 2 ZA Support mentions per week across all accounts",
            "Monitor: .za-overnight-batch.log nightly for any errors",
        ],
        "next": "System fully live. Monitor weekly. No further manual actions required.",
    },
]

# ── STATE FILE ────────────────────────────────────────────────────────────────
def load_state():
    if os.path.exists(STATE_FILE):
        with open(STATE_FILE) as f:
            return json.load(f)
    return {"sent": []}

def save_state(state):
    with open(STATE_FILE, "w") as f:
        json.dump(state, f, indent=2)

# ── EMAIL ─────────────────────────────────────────────────────────────────────
def send_email(subject, html_body):
    if not RESEND_API_KEY:
        print("ERROR: RESEND_API_KEY not set — cannot send email")
        return False

    payload = json.dumps({
        "from": FROM_EMAIL,
        "to": [TO_EMAIL],
        "subject": subject,
        "html": html_body,
    }).encode("utf-8")

    req = urllib.request.Request(
        "https://api.resend.com/emails",
        data=payload,
        headers={
            "Authorization": f"Bearer {RESEND_API_KEY}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            body = json.loads(resp.read())
            print(f"Email sent: {body.get('id', 'ok')}")
            return True
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        print(f"Email error {e.code}: {body}")
        # 429 = daily quota exceeded — not a script failure, will retry tomorrow
        if e.code == 429:
            return None  # None = rate limited, don't count as error
        return False

def build_html(trigger, today_str):
    phase_colour = {
        "Account Creation": "#1B6B4A",
        "Phase 2": "#27504D",
        "Phase 3": "#D68910",
        "Phase 4": "#C0392B",
    }
    colour = "#27504D"
    for k, v in phase_colour.items():
        if k.lower() in trigger["phase"].lower():
            colour = v
            break

    actions_html = "".join(
        f'<li style="margin-bottom:6px">{a}</li>' for a in trigger["actions"]
    )

    return f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <div style="background:{colour};padding:20px 24px;border-radius:6px 6px 0 0">
        <h1 style="color:white;margin:0;font-size:18px">Reddit Phase Notification</h1>
        <p style="color:#0FEA7A;margin:4px 0 0;font-size:13px">ZA Support — Apple Experts</p>
      </div>
      <div style="background:#f7f7f7;padding:16px 24px">
        <table style="width:100%;border-collapse:collapse;font-size:13px">
          <tr><td style="padding:6px 0;color:#555;width:120px"><b>Date</b></td>
              <td style="padding:6px 0">{today_str}</td></tr>
          <tr><td style="padding:6px 0;color:#555"><b>Account</b></td>
              <td style="padding:6px 0">{trigger["account"]}</td></tr>
          <tr><td style="padding:6px 0;color:#555"><b>Phase</b></td>
              <td style="padding:6px 0;color:{colour}"><b>{trigger["phase"]}</b></td></tr>
        </table>
      </div>
      <div style="background:white;padding:16px 24px">
        <h2 style="font-size:14px;color:{colour};margin:0 0 12px">Actions Required Today</h2>
        <ol style="font-size:13px;line-height:1.6;padding-left:20px">{actions_html}</ol>
      </div>
      <div style="background:#EAF2F1;padding:12px 24px;font-size:12px;color:#555">
        <b>Next:</b> {trigger["next"]}
      </div>
      <div style="background:#1B3D3A;padding:10px 24px">
        <p style="color:#aaa;font-size:11px;margin:0">
          ZA Support (Apple Experts) · Automated Reddit Phase Notification ·
          Script: ~/Developer/new-zas-website/scripts/reddit-phase-notify.py
        </p>
      </div>
    </div>
    """

# ── MAIN ──────────────────────────────────────────────────────────────────────
def main():
    today = datetime.date.today()
    today_str = today.strftime("%d/%m/%Y")

    state = load_state()
    sent_ids = set(state.get("sent", []))

    matches = [t for t in TRIGGERS if t["date"] == today_str]

    if not matches:
        print(f"{today_str}: No Reddit phase triggers today.")
        return 0

    errors = 0
    for trigger in matches:
        tid = trigger["id"]
        if tid in sent_ids:
            print(f"SKIP (already sent today): {tid}")
            continue

        print(f"Sending: {trigger['subject']}")
        html = build_html(trigger, today_str)
        ok = send_email(trigger["subject"], html)
        if ok:
            sent_ids.add(tid)
            state["sent"].append(tid)
            save_state(state)
        elif ok is None:
            # Rate limited — log but don't count as error, will retry tomorrow
            print(f"Rate limited — will retry tomorrow: {tid}")
        else:
            errors += 1

    return 1 if errors else 0

if __name__ == "__main__":
    sys.exit(main())
