#!/usr/bin/env python3
"""
ZA Support File Watcher
Detects new .md files in docs/seo/, extracts chat_id, creates deployment markers, emails notification.
Runs as LaunchAgent — zero manual intervention.
"""

import os, re, time, json, hashlib, requests
from pathlib import Path
from datetime import datetime

WATCH_DIR = os.path.expanduser("~/Developer/new-zas-website/docs/seo")
PENDING_DIR = os.path.join(WATCH_DIR, ".pending-deployments")
PROCESSED_LOG = os.path.join(WATCH_DIR, ".processed-files.json")
VLOG = os.path.expanduser("~/Developer/new-zas-website/media/workshop/logs/validation.log")
NOTIFY = "courtney@zasupport.com"

def log(msg):
    ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    line = f"[{ts}] WATCHER: {msg}"
    os.makedirs(os.path.dirname(VLOG), exist_ok=True)
    with open(VLOG, "a") as f:
        f.write(line + "\n")

def get_processed():
    if os.path.exists(PROCESSED_LOG):
        with open(PROCESSED_LOG) as f:
            return json.load(f)
    return {}

def save_processed(data):
    with open(PROCESSED_LOG, "w") as f:
        json.dump(data, f, indent=2)

def file_hash(path):
    with open(path, "rb") as f:
        return hashlib.md5(f.read()).hexdigest()

def extract_chat_id(filepath):
    """Extract chat_id from YAML header of .md file."""
    with open(filepath) as f:
        content = f.read(2000)
    match = re.search(r'chat_id:\s*(.+)', content)
    if match:
        return match.group(1).strip()
    return None

def extract_version(filepath):
    with open(filepath) as f:
        content = f.read(2000)
    match = re.search(r'version:\s*(.+)', content)
    return match.group(1).strip() if match else "unknown"

def get_ms_token():
    try:
        env_file = os.path.expanduser("~/.za-support.env")
        if os.path.exists(env_file):
            with open(env_file) as f:
                for line in f:
                    if line.startswith("export "):
                        key, _, val = line[7:].partition("=")
                        os.environ[key.strip()] = val.strip().strip('"')
        refresh = os.environ.get("MS_GRAPH_REFRESH_TOKEN", "")
        client = os.environ.get("MS_CLIENT_ID", "02d82633-39c6-4456-bb06-43ba34c6ee91")
        secret = os.environ.get("MS_CLIENT_SECRET", "")
        if not refresh:
            return ""
        r = requests.post("https://login.microsoftonline.com/common/oauth2/v2.0/token",
            data={"grant_type": "refresh_token", "client_id": client,
                  "client_secret": secret, "refresh_token": refresh,
                  "scope": "https://graph.microsoft.com/Mail.Send"})
        return r.json().get("access_token", "")
    except Exception:
        return ""

def notify(chat_id, files):
    """Email notification that new files detected."""
    token = get_ms_token()
    if not token:
        log("Cannot send notification — no MS Graph token")
        return

    ts = datetime.now().strftime("%d/%m/%Y %H:%M SAST")
    file_list = "<br>".join([f"- {os.path.basename(f['path'])} (v{f['version']})" for f in files])

    html = f"""<p>New .md files detected from claude.ai chat.</p>
<p><strong>Chat ID:</strong> {chat_id}<br>
<strong>Detected:</strong> {ts}<br>
<strong>Files:</strong> {len(files)}</p>
<p>{file_list}</p>
<p>Deployment is ready. Open Claude Code to execute.<br>
Claude Code will automatically link all actions to chat {chat_id}.</p>"""

    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
    payload = {
        "message": {
            "subject": f"New deployment ready — {chat_id} ({len(files)} files)",
            "body": {"contentType": "HTML", "content": html},
            "toRecipients": [{"emailAddress": {"address": NOTIFY}}]
        }
    }

    r = requests.post("https://graph.microsoft.com/v1.0/me/sendMail",
                      headers=headers, json=payload)
    if r.status_code == 202:
        log(f"Notification sent: {chat_id} ({len(files)} files)")
    else:
        log(f"Notification failed: {r.status_code}")

def create_deployment_marker(chat_id, files):
    """Create a pending deployment marker for Claude Code to read."""
    os.makedirs(PENDING_DIR, exist_ok=True)
    marker = {
        "chat_id": chat_id,
        "detected": datetime.now().isoformat(),
        "files": [{"path": f["path"], "version": f["version"]} for f in files],
        "status": "PENDING",
        "executed_by": None,
        "executed_at": None
    }
    marker_path = os.path.join(PENDING_DIR, f"{chat_id}.json")
    with open(marker_path, "w") as f:
        json.dump(marker, f, indent=2)
    log(f"Deployment marker created: {marker_path}")
    return marker_path

def scan():
    """Scan for new or changed .md files."""
    processed = get_processed()
    new_files = []

    for md_file in Path(WATCH_DIR).glob("*.md"):
        path = str(md_file)
        current_hash = file_hash(path)

        if path in processed and processed[path] == current_hash:
            continue

        chat_id = extract_chat_id(path)
        version = extract_version(path)

        new_files.append({
            "path": path,
            "chat_id": chat_id,
            "version": version,
            "hash": current_hash
        })

        processed[path] = current_hash

    if new_files:
        by_chat = {}
        for f in new_files:
            cid = f["chat_id"] or "UNKNOWN"
            by_chat.setdefault(cid, []).append(f)

        for chat_id, files in by_chat.items():
            log(f"Detected {len(files)} new/changed files from {chat_id}")
            create_deployment_marker(chat_id, files)
            notify(chat_id, files)

    save_processed(processed)
    return new_files

def watch():
    """Continuous watch loop."""
    log("File watcher started")
    while True:
        try:
            scan()
            time.sleep(10)
        except KeyboardInterrupt:
            break
        except Exception as e:
            log(f"Error: {e}")
            time.sleep(30)

if __name__ == "__main__":
    import sys
    if "--scan" in sys.argv:
        results = scan()
        print(f"Found {len(results)} new files")
    else:
        watch()
