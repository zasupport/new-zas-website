---
name: perfect-blog-creator
chat_id: ZAS-CHAT-20260407-1100-SEO
description: ALL blog content, SEO, publishing, distribution for zasupport.com.
extends: R6 v7.1
---
# Perfect Blog Creator v3.4 | zasupport.com | 07/04/2026
HR RULES: 1-16. Rule 15: verification in every .md. Rule 16: fix uncertainty, propagate.
PRE-FLIGHT/POST/SCHEMA/AUTHOR/E-E-A-T/VELOCITY/LINKING: unchanged from v3.3.
IMAGES: Pipeline designed. Tools NOT INSTALLED. Credentials CREDENTIAL SET.
DISTRIBUTION: Instagram CREDENTIAL SET (untested post). GBP BLOCKED. TikTok pull NOT INSTALLED.

## DEPLOYMENT VERIFICATION
```bash
VLOG=~/Developer/new-zas-website/media/workshop/logs/validation.log
# Verify pipeline can process and post
ls ~/Developer/new-zas-website/media/workshop/catalogue.csv && echo "[$(date '+%F %T')] CATALOGUE EXISTS" >> $VLOG || echo "[$(date '+%F %T')] CATALOGUE NOT FOUND" >> $VLOG
ls ~/Developer/new-zas-website/media/workshop/webp/ | head -3 | while read f; do echo "[$(date '+%F %T')] WEBP FILES: $f" >> $VLOG; done
# Test Instagram post capability (dry run)
python3 -c "
import requests, os
t=os.environ.get('INSTAGRAM_ACCESS_TOKEN','')
u=os.environ.get('INSTAGRAM_USER_ID','')
r=requests.get(f'https://graph.facebook.com/v19.0/{u}?fields=id,username&access_token={t}')
print(f'IG API: {r.status_code} @{r.json().get(\"username\",\"unknown\")}' if r.status_code==200 else f'IG API FAIL: {r.status_code}')
" 2>/dev/null | while read line; do echo "[$(date '+%F %T')] BLOG DISTRIBUTION: $line" >> $VLOG; done
```

---
*v3.4 | 07/04/2026 SAST*
