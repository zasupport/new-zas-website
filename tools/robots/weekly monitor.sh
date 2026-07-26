#!/bin/bash
set -uo pipefail
cd "$(dirname "$0")" || exit 1
source .venv/bin/activate 2>/dev/null || true
OUT="$(python3 "robots guard.py" --live https://zasupport.com/robots.txt 2>&1)"; CODE=$?
if [ $CODE -ne 0 ]; then
  SAFE="$(printf '%s' "$OUT" | sed 's/&/\&amp;/g; s/</\&lt;/g; s/>/\&gt;/g; s/"/\&quot;/g')"
  F='font-family:Aptos,Arial,Helvetica,sans-serif;font-size:12pt'
  BODY="<p style=\"$F\">The weekly robots guard on zasupport.com has failed.</p><p style=\"$F\">URLs Google already has indexed are now disallowed to Googlebot. In that state they cannot be re-crawled and cannot be removed by a noindex rule.</p><pre style=\"font-family:Menlo,monospace;font-size:10pt\">$SAFE</pre>"
  osascript <<APPLE
tell application "Microsoft Outlook"
  set m to make new outgoing message with properties {subject:"Robots Guard Failure zasupport.com $(date '+%d.%m.%y')", content:"$BODY"}
  make new recipient at m with properties {email address:{address:"courtney@zasupport.com"}}
  open m
end tell
APPLE
fi
echo "$(date '+%d/%m/%Y %H:%M SAST') | weekly monitor | guard exit $CODE" >> validation.log
