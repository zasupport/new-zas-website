---
name: ZAS-WORKSHOP-MEDIA-LIBRARY-20260407
version: 6.5 FINAL
chat_id: ZAS-CHAT-20260407-1100-SEO
type: claude-code-injection
---

# Workshop Media Library — Complete Pipeline

## HR RULES: 1-19. ALL tools NOT INSTALLED. ALL scripts NOT INSTALLED. Credentials CREDENTIAL SET.

## PIPELINE DESIGN
```
WORKSHOP PHOTOS                    TIKTOK VIDEOS                IPHONE ALBUM
AirDrop → ~/Workshop Photos/       Phone app → @appleexpertza   "ZA Support Workshop"
        ↓                                    ↓                          ↓
   fswatch detects                   yt-dlp pulls daily          Shortcut 06:00 daily
        ↓                                    ↓                          ↓
                         ALL MERGE → ~/Workshop Photos/
                                        ↓
                              Dedup check (MD5 hash)
                                        ↓
                              Anthropic API identify
                                        ↓
                         WebP → Compress → IPTC metadata
                                        ↓
                    ┌───────────┬────────────┬──────────┐
                    ↓           ↓            ↓          ↓
               Instagram   Facebook     Website    Catalogue
              (Graph API) (Graph API) (public/)   (CSV+hash)
                    ↓           ↓
              GBP (when approved)
```

## FULL SCRIPT: za_media_pipeline.py
(Extract this script and save to ~/Developer/new-zas-website/media/workshop/scripts/)

```python
#!/usr/bin/env python3
"""ZA Support Zero-Cost Media Pipeline. AirDrop/iCloud/TikTok → process → distribute."""

import os, sys, json, time, shutil, subprocess, csv, base64, re, hashlib
from datetime import datetime
from pathlib import Path

WATCH_DIR = os.path.expanduser("~/Workshop Photos")
MEDIA_DIR = os.path.expanduser("~/Developer/new-zas-website/media/workshop")
PUBLIC_DIR = os.path.expanduser("~/Developer/new-zas-website/public/images/workshop")
CATALOGUE = os.path.join(MEDIA_DIR, "catalogue.csv")
HASH_DB = os.path.join(MEDIA_DIR, "processed-hashes.json")
LOG_DIR = os.path.join(MEDIA_DIR, "logs")
VLOG = os.path.join(LOG_DIR, "validation.log")
SITE_URL = "https://zasupport.com"
CATEGORIES = ["rework","diagnostics","cleaning","tools","parts","devices","workshop","before-after","delivery"]

def log(msg):
    ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    os.makedirs(LOG_DIR, exist_ok=True)
    with open(os.path.join(LOG_DIR, "pipeline.log"), "a") as f:
        f.write(f"[{ts}] {msg}\n")

def file_content_hash(fp):
    h = hashlib.md5()
    with open(fp, "rb") as f:
        for chunk in iter(lambda: f.read(8192), b""): h.update(chunk)
    return h.hexdigest()

def is_duplicate(fp):
    new_hash = file_content_hash(fp)
    hashes = json.load(open(HASH_DB)) if os.path.exists(HASH_DB) else {}
    if new_hash in hashes:
        log(f"DUPLICATE: {os.path.basename(fp)} matches {hashes[new_hash]}")
        return True
    hashes[new_hash] = os.path.basename(fp)
    with open(HASH_DB, "w") as f: json.dump(hashes, f, indent=2)
    return False

def convert_heic(fp):
    if fp.lower().endswith((".heic",".heif")):
        out = fp.rsplit(".",1)[0] + ".jpg"
        subprocess.run(["sips","-s","format","jpeg",fp,"--out",out], capture_output=True)
        return out
    return fp

def identify_image(fp):
    import anthropic
    key = os.environ.get("ANTHROPIC_API_KEY","")
    if not key:
        return {"filename":Path(fp).stem.lower().replace(" ","-")+"-za-support","category":"workshop",
                "title":"Workshop photo","alt_text":"ZA Support workshop Hyde Park",
                "description":"ZA Support workshop.","keywords":"ZA Support,Apple repair","blog_topics":"general"}
    with open(fp,"rb") as f: data = base64.standard_b64encode(f.read()).decode()
    ext = fp.rsplit(".",1)[-1].lower()
    mt = {"jpg":"image/jpeg","jpeg":"image/jpeg","png":"image/png","webp":"image/webp"}.get(ext,"image/jpeg")
    client = anthropic.Anthropic(api_key=key)
    msg = client.messages.create(model="claude-sonnet-4-20250514", max_tokens=500, messages=[{
        "role":"user","content":[
            {"type":"image","source":{"type":"base64","media_type":mt,"data":data}},
            {"type":"text","text":'Apple repair workshop photo, Hyde Park Johannesburg. JSON only: {"filename":"lowercase-hyphens-za-support","category":"rework|diagnostics|cleaning|tools|parts|devices|workshop|before-after|delivery","title":"under 70 chars","alt_text":"50-125 chars","description":"1-2 sentences","keywords":"comma-sep","blog_topics":"categories"}'}
        ]}])
    try:
        txt = re.sub(r"^```json\s*","",msg.content[0].text.strip())
        txt = re.sub(r"\s*```$","",txt)
        return json.loads(txt)
    except: return {"filename":Path(fp).stem.lower().replace(" ","-")+"-za-support","category":"workshop",
                     "title":"Workshop photo","alt_text":"ZA Support workshop","description":"ZA Support.","keywords":"ZA Support","blog_topics":"general"}

def convert_webp(fp, out, q=82):
    subprocess.run(["cwebp","-q",str(q),fp,"-o",out], capture_output=True)
    if os.path.exists(out) and os.path.getsize(out)/1024 > 200:
        subprocess.run(["cwebp","-q","75",fp,"-o",out], capture_output=True)
    return os.path.exists(out)

def inject_metadata(fp, m):
    subprocess.run(["exiftool","-overwrite_original",f"-IPTC:ObjectName={m['title']}",
        f"-IPTC:Caption-Abstract={m['description']}",f"-IPTC:Keywords={m['keywords']}",
        "-IPTC:By-line=Courtney Bentley","-IPTC:Credit=ZA Support",
        "-IPTC:CopyrightNotice=Copyright 2025 ZA Support. All rights reserved.",
        "-IPTC:City=Johannesburg","-IPTC:Province-State=Gauteng",
        "-IPTC:Country-PrimaryLocationName=South Africa",f"-XMP:Title={m['title']}",
        f"-XMP:Description={m['description']}",f"-EXIF:ImageDescription={m['alt_text']}",fp], capture_output=True)
    subprocess.run(["exiftool","-overwrite_original","-gps:all=",fp], capture_output=True)

def post_to_instagram(meta, webp_path):
    token = os.environ.get("INSTAGRAM_ACCESS_TOKEN","")
    user_id = os.environ.get("INSTAGRAM_USER_ID","")
    if not all([token, user_id]): log("Instagram: not configured"); return
    import requests
    image_url = f"{SITE_URL}/images/workshop/{meta['category']}/{meta['filename']}.webp"
    caption = f"{meta['title']}\n\n{meta['description']}\n\n#AppleRepair #MacBookRepair #HydePark #Johannesburg #ZASupport"
    r1 = requests.post(f"https://graph.facebook.com/v19.0/{user_id}/media",
        data={"image_url":image_url,"caption":caption,"access_token":token})
    if r1.status_code == 200:
        r2 = requests.post(f"https://graph.facebook.com/v19.0/{user_id}/media_publish",
            data={"creation_id":r1.json().get("id"),"access_token":token})
        log(f"Instagram: {r2.status_code}")
    else: log(f"Instagram failed: {r1.status_code}")

def post_to_gbp(meta):
    token = os.environ.get("GBP_ACCESS_TOKEN","")
    if not token: log("GBP: not configured (pending approval)"); return
    # GBP posting code here when approved

def process_file(fp):
    log(f"=== Processing: {fp} ===")
    if not fp.lower().endswith((".jpg",".jpeg",".png",".heic",".heif",".webp")): return
    if is_duplicate(fp):
        proc = os.path.join(MEDIA_DIR,"originals","processed")
        os.makedirs(proc, exist_ok=True)
        shutil.move(fp, os.path.join(proc, "dup-" + os.path.basename(fp)))
        return
    fp = convert_heic(fp)
    w, h = 0, 0
    try:
        r = subprocess.run(["identify","-format","%wx%h",fp], capture_output=True, text=True)
        w, h = map(int, r.stdout.strip().split("x"))
    except: pass
    meta = identify_image(fp)
    if meta.get("category") not in CATEGORIES: meta["category"] = "workshop"
    cat_dir = os.path.join(MEDIA_DIR,"webp",meta["category"])
    os.makedirs(cat_dir, exist_ok=True)
    webp_path = os.path.join(cat_dir, meta["filename"]+".webp")
    if not convert_webp(fp, webp_path): log("WebP failed"); return
    inject_metadata(webp_path, meta)
    pub_dir = os.path.join(PUBLIC_DIR, meta["category"])
    os.makedirs(pub_dir, exist_ok=True)
    shutil.copy2(webp_path, os.path.join(pub_dir, meta["filename"]+".webp"))
    for rw in [400,800]:
        subprocess.run(["convert",webp_path,"-resize",f"{rw}x",
            os.path.join(pub_dir,meta["filename"]+f"-{rw}w.webp")], capture_output=True)
    # Catalogue
    os.makedirs(os.path.dirname(CATALOGUE), exist_ok=True)
    exists = os.path.exists(CATALOGUE)
    with open(CATALOGUE,"a",newline="") as f:
        wr = csv.writer(f)
        if not exists: wr.writerow(["filename","category","title","alt_text","description","keywords","width","height","size_kb","date","quality"])
        sz = os.path.getsize(webp_path)/1024
        q = "PUBLISH" if w>=1200 else ("ACCEPTABLE" if w>=800 else "LOW")
        wr.writerow([meta["filename"]+".webp",meta["category"],meta["title"],meta["alt_text"],meta["description"],meta["keywords"],w,h,f"{sz:.0f}",datetime.now().strftime("%Y-%m-%d %H:%M"),q])
    # Distribute
    if w >= 800:
        post_to_instagram(meta, webp_path)
        post_to_gbp(meta)
    proc = os.path.join(MEDIA_DIR,"originals","processed")
    os.makedirs(proc, exist_ok=True)
    shutil.move(fp, os.path.join(proc, os.path.basename(fp)))
    log(f"=== DONE: {meta['filename']}.webp ===")

def watch():
    log("Pipeline started")
    seen = set()
    for f in Path(WATCH_DIR).iterdir():
        if f.is_file() and not f.name.startswith("."): process_file(str(f))
    while True:
        try:
            for f in Path(WATCH_DIR).iterdir():
                if f.is_file() and not f.name.startswith(".") and str(f) not in seen:
                    seen.add(str(f)); time.sleep(1); process_file(str(f))
            time.sleep(2)
        except KeyboardInterrupt: break
        except Exception as e: log(f"ERROR: {e}"); time.sleep(5)

if __name__ == "__main__":
    if len(sys.argv) > 1: process_file(sys.argv[1])
    else: watch()
```

## LAUNCHAGENT: com.zasupport.media-pipeline.plist
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
<key>Label</key><string>com.zasupport.media-pipeline</string>
<key>ProgramArguments</key><array><string>/usr/bin/env</string><string>python3</string>
<string>/Users/courtney/Developer/new-zas-website/media/workshop/scripts/za_media_pipeline.py</string></array>
<key>EnvironmentVariables</key><dict><key>PATH</key><string>/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin</string></dict>
<key>RunAtLoad</key><true/><key>KeepAlive</key><true/>
<key>StandardOutPath</key><string>/Users/courtney/Developer/new-zas-website/media/workshop/logs/pipeline-stdout.log</string>
<key>StandardErrorPath</key><string>/Users/courtney/Developer/new-zas-website/media/workshop/logs/pipeline-stderr.log</string>
</dict></plist>
```

## DEPLOYMENT VERIFICATION
```bash
VLOG=~/Developer/new-zas-website/media/workshop/logs/validation.log
ls ~/Developer/new-zas-website/media/workshop/scripts/za_media_pipeline.py && echo "[$(date '+%F %T')] SCRIPT za_media_pipeline.py EXISTS" >> $VLOG || echo "[$(date '+%F %T')] NOT INSTALLED" >> $VLOG
launchctl list 2>/dev/null | grep media-pipeline && echo "[$(date '+%F %T')] SERVICE RUNNING" >> $VLOG || echo "[$(date '+%F %T')] NOT DEPLOYED" >> $VLOG
```

---
*v6.5 FINAL | 07/04/2026 SAST*
