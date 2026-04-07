---
name: ZAS-CLAUDE-CODE-EXECUTION-20260407
version: 2.2 FINAL
chat_id: ZAS-CHAT-20260407-1100-SEO
type: claude-code-injection
rule: Rules 1-19. Test every step. Log every result. Auto-execute. No human intervention except Apple Shortcuts UI.
---

# Claude Code Execution — Deploy, Test, Verify

## MANDATORY FIRST STEP: Read Previous Learnings
```bash
echo "=== PREVIOUS SESSION LEARNINGS ==="
cat ~/Developer/new-zas-website/docs/seo/cumulative-learnings.md 2>/dev/null || echo "No previous learnings"
tail -20 ~/Developer/new-zas-website/media/workshop/logs/validation.log 2>/dev/null || echo "No validation log"
VLOG=~/Developer/new-zas-website/media/workshop/logs/validation.log
mkdir -p $(dirname $VLOG)
echo "[$(date '+%F %T')] [ZAS-CHAT-20260407-1100-SEO] === SESSION STARTED ===" >> $VLOG
source ~/.za-support.env
```

## PHASE 1: INSTALL + VERIFY TOOLS
```bash
brew install exiftool webp imagemagick ffmpeg fswatch yt-dlp python3
pip3 install anthropic requests requests-oauthlib --break-system-packages
npm install -g tiktok-api-dl 2>/dev/null
# Verify each — log to validation.log
for tool in exiftool cwebp convert ffmpeg fswatch yt-dlp; do
  which $tool &>/dev/null && echo "[$(date '+%F %T')] [ZAS-CHAT-20260407-1100-SEO] TOOL $tool INSTALLED: $(which $tool)" >> $VLOG || echo "[$(date '+%F %T')] TOOL $tool INSTALL FAILED" >> $VLOG
done
```

## PHASE 2: TEST WITH REAL DATA
Test every tool with real input. Real photo, real TikTok pull, real API call. ALL results logged. If ANY fails: Rule 16 — stop, fix, log, propagate.

## PHASE 3: DEPLOY SCRIPTS
Extract from .md files, save to ~/Developer/new-zas-website/media/workshop/scripts/. Test each with real input. Scripts: za_media_pipeline.py, za_google_monitor.py, za_email_scanner.py, za_session_feedback.py, za_file_watcher.py, za_content_inherit.py, za_icloud_bridge.sh

## PHASE 4: DEPLOY SERVICES
LaunchAgents: media-pipeline, icloud-bridge, file-watcher. Cron: Google monitor Monday 8am, email scanner daily 7am. Verify all running.

## PHASE 5: WEBSITE CHANGES
Author david→courtney, WordPress 301 redirects, hours fix, footer, Get Directions, max-image-preview, schema, /editorial-policy.

## PHASE 6: END-TO-END TEST
Drop real photo in ~/Workshop Photos/ → verify full pipeline → check Instagram post.

## PHASE 7: APPLE SHORTCUT (only manual step)
```bash
open -a "Shortcuts"
cat << 'STEPS'
1. Delete existing ZAS-Workshop-Sync if exists
2. Create new: Find Photos → Album "ZA Support Workshop" → Last 2 Days
3. Repeat → Save File → Shortcuts/Workshop Sync/ → Overwrite Yes
4. Automation: 06:00 daily → Run ZAS-Workshop-Sync → Ask Before Running OFF
STEPS
read -p "Press Enter when shortcut is built..."
```

## PHASE 8: SESSION FEEDBACK (mandatory)
```bash
source ~/.za-support.env
python3 ~/Developer/new-zas-website/media/workshop/scripts/za_session_feedback.py "ZAS-CHAT-20260407-1100-SEO"
```

## RULE 17: CONTENT INHERITANCE
```bash
python3 ~/Developer/new-zas-website/media/workshop/scripts/za_content_inherit.py [new-file] # Run before overwriting any .md
```

## DEPLOYMENT VERIFICATION
```bash
echo "=== FINAL STATUS ===" && grep -c "PASS\|INSTALLED\|DEPLOYED" $VLOG && echo "passed" && grep "FAIL\|NOT INSTALLED\|NOT DEPLOYED" $VLOG
```

---
*v2.2 FINAL | 07/04/2026 SAST*
