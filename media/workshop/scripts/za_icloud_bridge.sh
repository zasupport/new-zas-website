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
