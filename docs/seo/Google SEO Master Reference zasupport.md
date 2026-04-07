---
name: google-seo-master-reference
version: 3.3 FINAL
chat_id: ZAS-CHAT-20260407-1100-SEO
site: zasupport.com
extends: R6 v7.2
---

# Google SEO Master Reference — ZA Support

## HR RULES: 1-19
CONFIRMED: 1 Hyde Lane | Mon-Thu 17:00, Fri 16:30 | linkedin.com/company/zasupport | Courtney Bentley | GBP maps.app.goo.gl/Mgk4Hx2PvbZ6D8T5A
RANKING: 15 systems. Content 23%, Title 14%, Backlinks 13%, Expertise 13%. CWV: LCP<2.5s, INP<200ms, CLS<0.1.
SCHEMA (NOT DONE): WebSite+SearchAction, Service, ProfilePage, FAQPage, max-image-preview:large, primaryImageOfPage, image sitemap.
GBP: Address DONE. Website+LinkedIn PENDING. API BLOCKED (case 2-6348000041138).
IMAGE SEO: Pipeline designed, NOT INSTALLED. Credentials CREDENTIAL SET.
TOOLS: All free. mcp-gsc NOT INSTALLED. claude-seo NOT INSTALLED.
MONITOR: Scripts NOT INSTALLED. Azure AD CREDENTIAL SET.
DISTRIBUTION: TikTok (phone) → yt-dlp pull → pipeline → Instagram + Facebook + GBP (when approved).

## DEPLOYMENT VERIFICATION
```bash
VLOG=~/Developer/new-zas-website/media/workshop/logs/validation.log
curl -s https://zasupport.com | grep -c "WebSite" | while read c; do echo "[$(date '+%F %T')] SCHEMA WebSite: $([ "$c" -gt 0 ] && echo FOUND || echo NOT FOUND)" >> $VLOG; done
curl -s https://zasupport.com/author/courtney-bentley -o /dev/null -w "%{http_code}" | while read c; do echo "[$(date '+%F %T')] AUTHOR PAGE: $c" >> $VLOG; done
```

---
*v3.3 FINAL | 07/04/2026 SAST*
