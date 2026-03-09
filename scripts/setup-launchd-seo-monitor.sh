#!/bin/bash
# Install SEO monitor as a weekly macOS launchd job
# Usage: bash scripts/setup-launchd-seo-monitor.sh

PLIST="$HOME/Library/LaunchAgents/com.zasupport.seo-monitor.plist"
SCRIPT_PATH="$(cd "$(dirname "$0")/.." && pwd)/scripts/seo-monitor.sh"

cat > "$PLIST" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.zasupport.seo-monitor</string>
    <key>ProgramArguments</key>
    <array>
        <string>/bin/bash</string>
        <string>$SCRIPT_PATH</string>
    </array>
    <key>StartCalendarInterval</key>
    <dict>
        <key>Weekday</key>
        <integer>1</integer>
        <key>Hour</key>
        <integer>9</integer>
        <key>Minute</key>
        <integer>0</integer>
    </dict>
    <key>StandardOutPath</key>
    <string>$HOME/.za_support/seo-logs/launchd.log</string>
    <key>StandardErrorPath</key>
    <string>$HOME/.za_support/seo-logs/launchd-error.log</string>
    <key>RunAtLoad</key>
    <false/>
</dict>
</plist>
EOF

launchctl unload "$PLIST" 2>/dev/null || true
launchctl load "$PLIST"
echo "✓ SEO monitor scheduled: every Monday at 09:00"
echo "✓ Logs: $HOME/.za_support/seo-logs/"
