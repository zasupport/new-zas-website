#!/bin/bash
ICLOUD_SOURCE="$HOME/Library/Mobile Documents/com~apple~CloudDocs/ZAS-Workshop-Media"
TARGET_DIR="$HOME/Workshop Photos"
LOG_FILE="$HOME/.za-media-watcher.log"
PROCESSED_MARKER=".za-processed"

log() { echo "$(date '+%Y-%m-%d %H:%M:%S') $1" >> "$LOG_FILE"; }

mkdir -p "$ICLOUD_SOURCE" "$TARGET_DIR"

find "$ICLOUD_SOURCE" -type f \( \
    -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o \
    -iname "*.heic" -o -iname "*.heif" -o -iname "*.webp" -o \
    -iname "*.mov" -o -iname "*.mp4" -o -iname "*.m4v" \
\) ! -name ".*" | while read -r file; do
    filename=$(basename "$file")
    if [ -f "${file}.${PROCESSED_MARKER}" ]; then continue; fi
    if [[ "$filename" == *.icloud ]]; then
        brctl download "$file" 2>/dev/null
        log "DOWNLOADING — $filename"
        continue
    fi
    size1=$(stat -f%z "$file" 2>/dev/null)
    sleep 2
    size2=$(stat -f%z "$file" 2>/dev/null)
    if [ "$size1" != "$size2" ]; then
        log "WAITING — $filename still syncing"
        continue
    fi
    timestamp=$(date -r "$file" '+%Y%m%d-%H%M%S' 2>/dev/null || date '+%Y%m%d-%H%M%S')
    extension="${filename##*.}"
    extension_lower=$(echo "$extension" | tr '[:upper:]' '[:lower:]')
    clean_name="${timestamp}-${filename%.*}"
    clean_name=$(echo "$clean_name" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr -cd 'a-z0-9-')
    target_file="${TARGET_DIR}/${clean_name}.${extension_lower}"
    counter=1
    while [ -f "$target_file" ]; do
        target_file="${TARGET_DIR}/${clean_name}-${counter}.${extension_lower}"
        counter=$((counter + 1))
    done
    cp "$file" "$target_file"
    if [ $? -eq 0 ]; then
        touch "${file}.${PROCESSED_MARKER}"
        log "COPIED — $filename → $(basename "$target_file")"
    else
        log "ERROR — Failed to copy $filename"
    fi
done
find "$ICLOUD_SOURCE" -name "*.${PROCESSED_MARKER}" -mtime +30 -delete 2>/dev/null
