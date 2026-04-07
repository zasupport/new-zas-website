---
name: ZAS-WORKSHOP-PHOTO-SHORTCUT-20260407
version: 1.2 FINAL
chat_id: ZAS-CHAT-20260407-1100-SEO
type: claude-code-injection
limitation: Apple Shortcuts has no programmatic creation API. Claude Code opens app and displays steps. 2-minute one-time task.
---

# Workshop Photo Shortcut — Phone to Pipeline

## HR RULES: 1-19

## CLAUDE CODE: AUTO-OPEN AND DISPLAY
```bash
open -a "Shortcuts"
cat << 'STEPS'
══════════════════════════════════════
ZAS-Workshop-Sync — Build in 2 minutes
══════════════════════════════════════
1. Delete existing ZAS-Workshop-Sync if exists
2. Click + → name: ZAS-Workshop-Sync
3. Add: Find Photos → Album "ZA Support Workshop" → Date Taken Last 2 Days → Limit 50
4. Add: Repeat with Each → input: Photos
5. Inside: Save File → Shortcuts/Workshop Sync/ → Overwrite Yes
6. End Repeat
7. Automations tab → Time of Day 06:00 daily → Run ZAS-Workshop-Sync → Ask Before Running OFF
══════════════════════════════════════
STEPS
read -p "Press Enter when done..."
```

## ICLOUD BRIDGE: za_icloud_bridge.sh
```bash
#!/bin/bash
ICLOUD_DIR="$HOME/Library/Mobile Documents/iCloud~is~workflow~my~workflows/Shortcuts/Workshop Sync"
WATCH_DIR="$HOME/Workshop Photos"
VLOG="$HOME/Developer/new-zas-website/media/workshop/logs/validation.log"
mkdir -p "$WATCH_DIR"
if [ -d "$ICLOUD_DIR" ]; then
    for f in "$ICLOUD_DIR"/*.{jpg,jpeg,png,heic,heif,JPG,JPEG,PNG,HEIC,HEIF} 2>/dev/null; do
        [ -f "$f" ] || continue
        bn=$(basename "$f")
        if [ ! -f "$WATCH_DIR/$bn" ]; then
            cp "$f" "$WATCH_DIR/$bn"
            echo "[$(date '+%F %T')] BRIDGE: copied $bn" >> "$VLOG"
        fi
    done
fi
```

## LAUNCHAGENT: com.zasupport.icloud-bridge.plist
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
<key>Label</key><string>com.zasupport.icloud-bridge</string>
<key>ProgramArguments</key><array><string>/bin/bash</string>
<string>/Users/courtney/Developer/new-zas-website/media/workshop/scripts/za_icloud_bridge.sh</string></array>
<key>StartInterval</key><integer>300</integer>
<key>RunAtLoad</key><true/>
</dict></plist>
```

## COMPLETE FLOW (zero intervention after shortcut built)
06:00 → Shortcut finds last 2 days photos → saves iCloud → syncs Mac → bridge copies to ~/Workshop Photos/ → pipeline detects → dedup check → identify → WebP → metadata → catalogue → Instagram + Facebook → done

## DEPLOYMENT VERIFICATION
```bash
VLOG=~/Developer/new-zas-website/media/workshop/logs/validation.log
ls ~/Developer/new-zas-website/media/workshop/scripts/za_icloud_bridge.sh && echo "[$(date '+%F %T')] BRIDGE SCRIPT EXISTS" >> $VLOG || echo "[$(date '+%F %T')] NOT INSTALLED" >> $VLOG
ls "$HOME/Library/Mobile Documents/iCloud~is~workflow~my~workflows/Shortcuts/Workshop Sync/" 2>/dev/null && echo "[$(date '+%F %T')] ICLOUD FOLDER EXISTS" >> $VLOG || echo "[$(date '+%F %T')] ICLOUD FOLDER NOT YET CREATED" >> $VLOG
launchctl list 2>/dev/null | grep icloud-bridge && echo "[$(date '+%F %T')] BRIDGE SERVICE RUNNING" >> $VLOG || echo "[$(date '+%F %T')] NOT DEPLOYED" >> $VLOG
```

---
*v1.2 FINAL | 07/04/2026 SAST*
