---
name: ZAS-SELF-HEALING-EMAIL-SCANNER-20260407
version: 1.4 FINAL
chat_id: ZAS-CHAT-20260407-1100-SEO
status: Script NOT INSTALLED. Cron NOT DEPLOYED. Azure AD CREDENTIAL SET.
---

# Self-Healing Email Scanner

## HR RULES: 1-19. Notify = courtney@zasupport.com ALWAYS (Rule 12).

Keywords: failed, denied, error, paused, couldn't complete, not approved, rejected, suspended, action required, blocked, expired, quota exceeded, unauthorized, token expired, service unavailable, billing issue, payment failed, violation, warning, critical, urgent + variations.

Scans: Gmail (paulwhittaker099@gmail.com via Gmail MCP in claude.ai) + Outlook (courtney@zasupport.com via MS Graph).
Auto-heals: token refresh, rate limit backoff, GitHub branch protection.
Notifies courtney@zasupport.com ONLY if unable to fix. Silent otherwise.
Schedule: cron daily 7am.

Known errors (07/04/2026): GBP API denied (reapplied), Cloudflare pending, GitHub branch protection pending.

Full script: za_email_scanner.py in Workshop Media Library v6.5.

## DEPLOYMENT VERIFICATION
```bash
VLOG=~/Developer/new-zas-website/media/workshop/logs/validation.log
ls ~/Developer/new-zas-website/media/workshop/scripts/za_email_scanner.py && echo "[$(date '+%F %T')] SCRIPT za_email_scanner.py EXISTS" >> $VLOG || echo "[$(date '+%F %T')] SCRIPT za_email_scanner.py NOT INSTALLED" >> $VLOG
crontab -l 2>/dev/null | grep email_scanner && echo "[$(date '+%F %T')] CRON DEPLOYED" >> $VLOG || echo "[$(date '+%F %T')] CRON NOT DEPLOYED" >> $VLOG
```

---
*v1.4 FINAL | 07/04/2026 SAST*
