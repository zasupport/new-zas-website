---
name: ZAS-SEO-TOOLS-PROPAGATION-SELFHEALING
version: 2.7 FINAL
chat_id: ZAS-CHAT-20260407-1100-SEO
last_updated: 07/04/2026 14:20 SAST
---

# SEO Tools, Propagation, Self-Healing

## HR RULES: 1-19. Rule 17: content inheritance. Rule 18: auto-execute. Rule 19: full regeneration on multi-file changes.

## TOOLS (ALL FREE, ALL NOT INSTALLED)
ExifTool, cwebp, ImageMagick, ffmpeg, fswatch, yt-dlp, tiktok-api-dl, Anthropic SDK, requests-oauthlib

## SCRIPTS (ALL NOT INSTALLED — exist in .md files only)
za_media_pipeline.py, za_google_monitor.py, za_email_scanner.py, za_session_feedback.py, za_file_watcher.py, za_content_inherit.py, za_icloud_bridge.sh

## SERVICES (ALL NOT DEPLOYED)
media-pipeline LaunchAgent, icloud-bridge LaunchAgent, file-watcher LaunchAgent, Google monitor cron, email scanner cron

## CREDENTIALS (VERIFIED)
Azure AD ✓ | Instagram ✓ | Facebook ✓ | Anthropic ✓ | MS Graph ✓ | GBP BLOCKED

## PROPAGATION — 13 files

| # | File | Version |
|---|---|---|
| 1 | ZAS TESTING VALIDATION PROTOCOL | v1.2 FINAL |
| 2 | ZAS SEO COMPREHENSIVE R6 | v7.2 FINAL |
| 3 | ZAS CLAUDE CODE EXECUTION | v2.2 FINAL |
| 4 | ZAS PLATFORM SETUP GUIDE | v2.5 FINAL |
| 5 | ZAS GOOGLE PERFORMANCE MONITOR | v2.8 FINAL |
| 6 | ZAS SELF HEALING EMAIL SCANNER | v1.4 FINAL |
| 7 | Google SEO Master Reference | v3.3 FINAL |
| 8 | Perfect Blog Creator SKILL | v3.5 FINAL |
| 9 | ZAS SEO TOOLS PROPAGATION | v2.7 FINAL |
| 10 | ZAS WORKSHOP MEDIA LIBRARY | v6.5 FINAL |
| 11 | ZAS SESSION FEEDBACK SYSTEM | v1.1 FINAL |
| 12 | ZAS AUTO DETECTION CHAT LINKING | v1.1 FINAL |
| 13 | ZAS WORKSHOP PHOTO SHORTCUT | v1.2 FINAL |

## PROPAGATION TARGETS (Rule 16)
~/Developer/new-zas-website/docs/seo/ | ~/.claude/skills/ | validation.log | ~/.claude/INSTRUCTIONS.md | Claude Projects | GitHub

## COST: R0 (plus ~R40/month Anthropic existing)

## DEPLOYMENT VERIFICATION
```bash
VLOG=~/Developer/new-zas-website/media/workshop/logs/validation.log
ls ~/Developer/new-zas-website/docs/seo/*.md 2>/dev/null | wc -l | while read c; do echo "[$(date '+%F %T')] DOCS: $c .md files" >> $VLOG; done
```

---
*v2.7 FINAL | 07/04/2026 SAST*
