---
name: ZAS-AUTO-DETECTION-CHAT-LINKING-20260407
version: 1.1 FINAL
chat_id: ZAS-CHAT-20260407-1100-SEO
type: claude-code-injection
---

# Auto-Detection and Chat Linking System

## HR RULES: 1-19

File watcher detects new .md files → extracts chat_id → creates deployment marker → runs content inheritance check (Rule 17) → emails courtney@zasupport.com → Claude Code reads pending markers.

## SCRIPT: za_file_watcher.py
(Extract and save to ~/Developer/new-zas-website/media/workshop/scripts/)

```python
#!/usr/bin/env python3
"""Watches docs/seo/ for new .md files, extracts chat_id, creates deployment markers, emails notification."""
import os, re, time, json, hashlib, requests
from datetime import datetime
from pathlib import Path

WATCH_DIR = os.path.expanduser("~/Developer/new-zas-website/docs/seo")
PENDING_DIR = os.path.join(WATCH_DIR, ".pending-deployments")
PROCESSED = os.path.join(WATCH_DIR, ".processed-files.json")
VLOG = os.path.expanduser("~/Developer/new-zas-website/media/workshop/logs/validation.log")
NOTIFY = "courtney@zasupport.com"

def get_ms_token():
    try:
        r = requests.post(f"https://login.microsoftonline.com/{os.environ.get('MS_TENANT_ID')}/oauth2/v2.0/token",
            data={"grant_type":"client_credentials","client_id":"033c8fd5-10b5-4918-9030-5a336531066f",
                  "client_secret":os.environ.get("MS_CLIENT_SECRET"),"scope":"https://graph.microsoft.com/.default"})
        return r.json().get("access_token","")
    except: return ""

def scan():
    processed = json.load(open(PROCESSED)) if os.path.exists(PROCESSED) else {}
    new_files = []
    for f in Path(WATCH_DIR).glob("*.md"):
        h = hashlib.md5(open(f,"rb").read()).hexdigest()
        if str(f) not in processed or processed[str(f)] != h:
            chat_id = re.search(r'chat_id:\s*(.+)', open(f).read(2000))
            new_files.append({"path":str(f),"chat_id":chat_id.group(1).strip() if chat_id else "UNKNOWN","hash":h})
            processed[str(f)] = h
    if new_files:
        os.makedirs(PENDING_DIR, exist_ok=True)
        cid = new_files[0]["chat_id"]
        with open(os.path.join(PENDING_DIR, f"{cid}.json"), "w") as f:
            json.dump({"chat_id":cid,"files":[n["path"] for n in new_files],"status":"PENDING","detected":datetime.now().isoformat()}, f, indent=2)
        token = get_ms_token()
        if token:
            requests.post(f"https://graph.microsoft.com/v1.0/users/{NOTIFY}/sendMail",
                headers={"Authorization":f"Bearer {token}","Content-Type":"application/json"},
                json={"message":{"subject":f"New deployment: {cid} ({len(new_files)} files)",
                    "body":{"contentType":"Text","content":f"Detected {len(new_files)} files from {cid}. Claude Code ready."},
                    "toRecipients":[{"emailAddress":{"address":NOTIFY}}]}})
    json.dump(processed, open(PROCESSED,"w"), indent=2)
    return new_files

def watch():
    while True:
        try: scan(); time.sleep(10)
        except KeyboardInterrupt: break
        except Exception as e: time.sleep(30)

if __name__ == "__main__":
    import sys
    if "--scan" in sys.argv: print(f"Found {len(scan())} new files")
    else: watch()
```

## SCRIPT: za_content_inherit.py (Rule 17)
```python
#!/usr/bin/env python3
"""Diffs old vs new .md files, extracts valuable content, archives old versions."""
import os, re, shutil, json
from datetime import datetime
from pathlib import Path

DOCS = os.path.expanduser("~/Developer/new-zas-website/docs/seo")
ARCHIVE = os.path.join(DOCS, "archive")

def check(new_path):
    basename = os.path.basename(new_path)
    existing = os.path.join(DOCS, basename)
    if not os.path.exists(existing): return
    old = open(existing).read()
    new = open(new_path).read()
    patterns = [r'```python.*?```', r'```bash.*?```', r'curl\s+-s\s+"https?://.*?"', r'export\s+\w+=']
    for p in patterns:
        old_m = set(re.findall(p, old, re.DOTALL))
        new_m = set(re.findall(p, new, re.DOTALL))
        missing = old_m - new_m
        if missing:
            print(f"WARNING: {basename} loses {len(missing)} valuable items")
    os.makedirs(ARCHIVE, exist_ok=True)
    ver = re.search(r'version:\s*(.+)', old)
    ver = ver.group(1).strip() if ver else "unknown"
    shutil.copy2(existing, os.path.join(ARCHIVE, f"{basename.replace('.md','')}-v{ver}-archived-{datetime.now().strftime('%Y%m%d')}.md"))

if __name__ == "__main__":
    import sys
    for f in sys.argv[1:]: check(f)
```

## LAUNCHAGENT: com.zasupport.file-watcher.plist
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
<key>Label</key><string>com.zasupport.file-watcher</string>
<key>ProgramArguments</key><array><string>/usr/bin/env</string><string>python3</string>
<string>/Users/courtney/Developer/new-zas-website/media/workshop/scripts/za_file_watcher.py</string></array>
<key>EnvironmentVariables</key><dict><key>PATH</key><string>/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin</string></dict>
<key>RunAtLoad</key><true/><key>KeepAlive</key><true/>
</dict></plist>
```

## DEPLOYMENT VERIFICATION
```bash
VLOG=~/Developer/new-zas-website/media/workshop/logs/validation.log
ls ~/Developer/new-zas-website/media/workshop/scripts/za_file_watcher.py && echo "[$(date '+%F %T')] SCRIPT EXISTS" >> $VLOG || echo "[$(date '+%F %T')] NOT INSTALLED" >> $VLOG
ls ~/Developer/new-zas-website/media/workshop/scripts/za_content_inherit.py && echo "[$(date '+%F %T')] INHERIT SCRIPT EXISTS" >> $VLOG || echo "[$(date '+%F %T')] NOT INSTALLED" >> $VLOG
launchctl list 2>/dev/null | grep file-watcher && echo "[$(date '+%F %T')] SERVICE RUNNING" >> $VLOG || echo "[$(date '+%F %T')] NOT DEPLOYED" >> $VLOG
```

---
*v1.1 FINAL | 07/04/2026 SAST*
