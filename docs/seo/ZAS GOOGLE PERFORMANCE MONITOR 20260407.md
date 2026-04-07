---
name: ZAS-GOOGLE-PERFORMANCE-MONITOR-20260407
version: 2.8 FINAL
chat_id: ZAS-CHAT-20260407-1100-SEO
status: Script NOT INSTALLED. Cron NOT DEPLOYED. Azure AD CREDENTIAL SET.
---

# Google Performance Monitor

## HR RULES: 1-19
Sources: sc-noreply@google.com + businessprofile-noreply@google.com → courtney@zasupport.com → MS Graph
Script: za_google_monitor.py — fetches emails, parses GSC+GBP data, analyses, generates action plan, emails report, creates 7pm reminders.
Schedule: cron Monday 8am. Complete: `python3 za_google_monitor.py --complete "date"`
Also monitors: GBP API approval email (case 2-6348000041138).

## DEPLOYMENT VERIFICATION
```bash
VLOG=~/Developer/new-zas-website/media/workshop/logs/validation.log
ls ~/Developer/new-zas-website/media/workshop/scripts/za_google_monitor.py && echo "[$(date '+%F %T')] SCRIPT za_google_monitor.py EXISTS" >> $VLOG || echo "[$(date '+%F %T')] SCRIPT za_google_monitor.py NOT INSTALLED" >> $VLOG
crontab -l 2>/dev/null | grep google_monitor && echo "[$(date '+%F %T')] CRON DEPLOYED" >> $VLOG || echo "[$(date '+%F %T')] CRON NOT DEPLOYED" >> $VLOG
```

---
*v2.8 FINAL | 07/04/2026 SAST*
