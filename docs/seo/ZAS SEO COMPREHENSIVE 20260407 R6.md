---
name: ZAS-SEO-COMPREHENSIVE-20260407-R6
version: 7.2 FINAL
chat_id: ZAS-CHAT-20260407-1100-SEO
site: zasupport.com
last_updated: 07/04/2026 14:20 SAST
---

# ZA Support — Complete SEO and Infrastructure Handoff

## HR RULES: 1-19 (see Testing Validation Protocol v1.2 for full definitions)

## S1: BUSINESS
ZA Support | Vizibiliti Intelligent Solutions (Pty) Ltd | Courtney Bentley, Apple Certified Expert Consultant | Mary Blount PA | 1 Hyde Lane, Hyde Park, Second Floor, Office E2004, Johannesburg, 2196 | 064 529 5863 / 079 053 9964 | courtney@zasupport.com / admin@zasupport.com | https://zasupport.com | GBP: maps.app.goo.gl/Mgk4Hx2PvbZ6D8T5A | Founded 1 Jan 2009 | BEE L1 | Women-owned: Yes | 4.9/632 reviews | GA4: G-XJNXMVBGP6 | Hours: Mon-Thu 08:00-17:00, Fri 08:00-16:30, Sat-Sun Closed

Social: linkedin.com/company/zasupport | linkedin.com/in/bentleycourtney/ | facebook.com/appleexpertsouthafrica | x.com/za_support (deprioritised) | tiktok.com/@appleexpertza | instagram.com/appleexpertza/ (BUSINESS, ID 17841447858894928) | youtube.com/@zasupport-applemacupgrader6746

## S2: SITE — WordPress GONE. HTTPS OK. Canonicals OK. GA4 OK. sitemap 250+. IndexNow OK.
## S3: GBP — Address DONE (Hyde Lane). Website+LinkedIn PENDING Google review.
## S4: AUTHOR — Courtney Bentley (live says David — NOT DONE, requires Claude Code fix).
## S5: RANKING — 15 systems. Content 23%, Title 14%, Backlinks 13%, Expertise 13%. CWV: LCP<2.5s, INP<200ms, CLS<0.1.
## S6: SCHEMA GAPS (NOT DONE) — WebSite+SearchAction, Service, ProfilePage, FAQPage, max-image-preview:large.

## S12: HONEST STATUS (07/04/2026 14:20 SAST)

### Platform credentials (VERIFIED with screenshots/Terminal)
| Platform | Status | Evidence |
|---|---|---|
| Azure AD | CREDENTIAL SET | 14 permissions granted (portal screenshots) |
| Instagram | CREDENTIAL SET | 60-day token exchanged (Terminal), User ID 17841447858894928 |
| Facebook | CREDENTIAL SET | See ~/.za-support.env [REDACTED from git — rotate at developers.facebook.com] |
| GBP API | BLOCKED | Case 2-6348000041138, 7-10 working days |
| Anthropic API | CREDENTIAL SET | Console confirmed (sk-ant-api03-cf0) |
| MS Graph | CREDENTIAL SET | Pre-existing (033c8fd5-10b5-4918-9030-5a336531066f) |

### Everything else: NOT INSTALLED / NOT DONE / NOT DEPLOYED
All tools, scripts, services, website changes require Claude Code deployment.

## DEPLOYMENT VERIFICATION
```bash
VLOG=~/Developer/new-zas-website/media/workshop/logs/validation.log
echo "=== STATUS CHECK ===" >> $VLOG
for tool in exiftool cwebp convert ffmpeg fswatch yt-dlp; do
  which $tool &>/dev/null && echo "[$(date '+%F %T')] TOOL $tool: INSTALLED" >> $VLOG || echo "[$(date '+%F %T')] TOOL $tool: NOT INSTALLED" >> $VLOG
done
for script in za_media_pipeline.py za_google_monitor.py za_email_scanner.py za_session_feedback.py za_file_watcher.py za_content_inherit.py za_icloud_bridge.sh; do
  ls ~/Developer/new-zas-website/media/workshop/scripts/$script &>/dev/null && echo "[$(date '+%F %T')] SCRIPT $script: EXISTS" >> $VLOG || echo "[$(date '+%F %T')] SCRIPT $script: NOT INSTALLED" >> $VLOG
done
```

---
*R6 v7.2 FINAL | 07/04/2026 SAST*
