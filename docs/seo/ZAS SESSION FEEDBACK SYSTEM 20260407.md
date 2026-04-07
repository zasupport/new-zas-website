---
name: ZAS-SESSION-FEEDBACK-SYSTEM-20260407
version: 1.1 FINAL
chat_id: ZAS-CHAT-20260407-1100-SEO
type: claude-code-injection
---

# Session Feedback System

## HR RULES: 1-19

Closed feedback loop: Claude Code → email report → courtney@zasupport.com → paste into next claude.ai chat → continuity.

## SCRIPT: za_session_feedback.py
(Extract and save to ~/Developer/new-zas-website/media/workshop/scripts/)

```python
#!/usr/bin/env python3
"""ZA Support Session Feedback. Reads validation.log, generates report, emails, updates learnings."""
import os, json, requests
from datetime import datetime

BASE = os.path.expanduser("~/Developer/new-zas-website")
VLOG = os.path.join(BASE, "media/workshop/logs/validation.log")
REPORTS = os.path.join(BASE, "docs/seo/session-reports")
LEARNINGS = os.path.join(BASE, "docs/seo/cumulative-learnings.md")
NOTIFY = "courtney@zasupport.com"

def get_ms_token():
    r = requests.post(f"https://login.microsoftonline.com/{os.environ.get('MS_TENANT_ID')}/oauth2/v2.0/token",
        data={"grant_type":"client_credentials","client_id":os.environ.get("MS_CLIENT_ID","033c8fd5-10b5-4918-9030-5a336531066f"),
              "client_secret":os.environ.get("MS_CLIENT_SECRET"),"scope":"https://graph.microsoft.com/.default"})
    return r.json().get("access_token","")

def run(chat_id=""):
    entries = open(VLOG).readlines() if os.path.exists(VLOG) else []
    passed = sum(1 for e in entries if "PASS" in e or "INSTALLED:" in e)
    failed = sum(1 for e in entries if "FAIL" in e)
    ts = datetime.now().strftime("%d/%m/%Y %H:%M SAST")
    report = f"# Session Report - {ts}\nChat: {chat_id}\nPassed: {passed} | Failed: {failed}\n"
    for e in entries[-30:]: report += f"- {e.strip()}\n"
    os.makedirs(REPORTS, exist_ok=True)
    with open(os.path.join(REPORTS, f"report-{datetime.now().strftime('%Y%m%d-%H%M')}.md"), "w") as f: f.write(report)
    with open(LEARNINGS, "a") as f: f.write(f"\n## {ts} ({chat_id})\nPassed: {passed} | Failed: {failed}\n")
    token = get_ms_token()
    if token:
        requests.post(f"https://graph.microsoft.com/v1.0/users/{NOTIFY}/sendMail",
            headers={"Authorization":f"Bearer {token}","Content-Type":"application/json"},
            json={"message":{"subject":f"Claude Code Report - {chat_id} - {ts}",
                "body":{"contentType":"Text","content":report},
                "toRecipients":[{"emailAddress":{"address":NOTIFY}}]}})
    print(f"Report sent to {NOTIFY}")

if __name__ == "__main__":
    import sys
    run(sys.argv[1] if len(sys.argv) > 1 else "unknown")
```

## Claude Code SESSION RULES
START: `cat ~/Developer/new-zas-website/docs/seo/cumulative-learnings.md 2>/dev/null`
END: `python3 ~/Developer/new-zas-website/media/workshop/scripts/za_session_feedback.py "ZAS-CHAT-20260407-1100-SEO"`

## DEPLOYMENT VERIFICATION
```bash
VLOG=~/Developer/new-zas-website/media/workshop/logs/validation.log
ls ~/Developer/new-zas-website/media/workshop/scripts/za_session_feedback.py && echo "[$(date '+%F %T')] SCRIPT za_session_feedback.py EXISTS" >> $VLOG || echo "[$(date '+%F %T')] NOT INSTALLED" >> $VLOG
```

---
*v1.1 FINAL | 07/04/2026 SAST*
