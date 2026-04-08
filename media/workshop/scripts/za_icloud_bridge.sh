#!/bin/bash
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"

LOG="$HOME/.za-icloud-bridge.log"
ICLOUD_DIR="$HOME/Library/Mobile Documents/iCloud~is~workflow~my~workflows/Shortcuts/Workshop Sync"
WATCH_DIR="$HOME/Workshop Photos"
VLOG="$HOME/Developer/new-zas-website/media/workshop/logs/validation.log"
mkdir -p "$WATCH_DIR" "$(dirname "$VLOG")" 2>>"$LOG"
if [ -d "$ICLOUD_DIR" ]; then
    find "$ICLOUD_DIR" -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.heic" -o -iname "*.heif" \) 2>/dev/null | while read -r f; do
        bn=$(basename "$f")
        if [ ! -f "$WATCH_DIR/$bn" ]; then
            cp "$f" "$WATCH_DIR/$bn" 2>>"$LOG"
            echo "[$(date '+%F %T')] BRIDGE: copied $bn" >> "$VLOG"
        fi
    done
else
    echo "[$(date '+%F %T')] BRIDGE: iCloud dir not found, skipping" >> "$LOG"
fi
exit 0
