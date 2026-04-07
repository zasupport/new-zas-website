---
name: perfect-blog-creator
description: ALL blog content, SEO, publishing, distribution for zasupport.com.
chat_id: ZAS-CHAT-20260407-1100-SEO
extends: R6 v7.2
media: Workshop Media Library v6.5
---

# Perfect Blog Creator v3.5 FINAL | zasupport.com

## HR RULES: 1-19

PRE-FLIGHT: Cannibalisation check, keywords, SERP top 3, author Courtney Bentley, intent, AI Overview, snippet.
POST: Breadcrumbs, H1 question, Dates visible, Takeaways, ToC, Body (1500/800), Pipeline photos from catalogue.csv, FAQ (3-6, 40-60w), Author box, CTA, Related.
Schema: BlogPosting, BreadcrumbList, FAQPage, Person, Organization, ImageObject, primaryImageOfPage.
AUTHOR: Courtney Bentley | Apple Certified Expert Consultant | /author/courtney-bentley
IMAGES: catalogue.csv, min 1, >=1200px featured, AVIF+WebP, IPTC injected, no stock, no iFixit.

DISTRIBUTION FLOW:
1. Workshop photo AirDrop → pipeline → Instagram + Facebook + website
2. Workshop album (iPhone) → Shortcut 06:00 → iCloud → bridge → pipeline (deduplicated)
3. TikTok (phone) → yt-dlp pull → pipeline → Instagram + Facebook + website
4. Blog published → featured image → Instagram + Facebook + GBP (when approved)

E-E-A-T: workshop voice, pipeline photos, SA context, /author, since 2009, 25K+, Forbes, R599, 4.9/632.
VELOCITY: 2-3/day, 3/week. Update 3-6mo. dateModified.
MONTHLY: audit, GSC, pipeline, catalogue, social, token refresh (~June 2026).
NEVER: No Courtney no publish. No stock. No unpipelined. No undistributed. No paid tools.

## DEPLOYMENT VERIFICATION
```bash
VLOG=~/Developer/new-zas-website/media/workshop/logs/validation.log
ls ~/Developer/new-zas-website/media/workshop/catalogue.csv && echo "[$(date '+%F %T')] CATALOGUE: EXISTS" >> $VLOG || echo "[$(date '+%F %T')] CATALOGUE: NOT FOUND" >> $VLOG
python3 -c "import requests,os;t=os.environ.get('INSTAGRAM_ACCESS_TOKEN','');u=os.environ.get('INSTAGRAM_USER_ID','');r=requests.get(f'https://graph.facebook.com/v19.0/{u}?fields=id,username&access_token={t}');print(f'IG: {r.status_code}')" 2>/dev/null | while read l; do echo "[$(date '+%F %T')] $l" >> $VLOG; done
```

---
*v3.5 FINAL | 07/04/2026 SAST*
