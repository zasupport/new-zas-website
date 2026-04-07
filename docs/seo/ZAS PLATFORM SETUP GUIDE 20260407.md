---
name: ZAS-PLATFORM-SETUP-GUIDE-20260407
version: 2.5 FINAL
chat_id: ZAS-CHAT-20260407-1100-SEO
status: ALL CRITICAL SETUPS COMPLETE
---

# Platform Setup Guide — All Credentials

## HR RULES: 1-19

## AZURE AD: CREDENTIAL SET (07/04/2026)
App: 033c8fd5-10b5-4918-9030-5a336531066f | 14 permissions granted: Mail.Read, Mail.ReadWrite, Mail.Send, Calendars.ReadWrite, Files.Read.All, Files.ReadWrite.All + 8 delegated. All green ticks.

## INSTAGRAM + FACEBOOK: CREDENTIAL SET (07/04/2026)
Meta App: ZA Support Pipeline (ID 1240306301419431, Business type)
Meta App Secret: 2ce09c97ff19a7ad091e0059d672ff22
Instagram App ID: 1976499056297428 | IG App Secret: 35fa53e0f92ed2acb4fed525cc7d8561
Instagram Business Account: @appleexpertza (ID 17841447858894928)
Long-lived token in ~/.za-support.env (60-day, expires ~June 2026)
Business Portfolio: Courtney Bentley's Business (ID 2169050193411436)
Note: IG direct login broken. Graph API via Facebook login works.

## GBP API: BLOCKED (07/04/2026)
Case: 2-6348000041138 | Project: 795563431366 (za-support-seo-202603) | 7-10 working days (~14-21 April)

## TIKTOK: NOT NEEDED — post from phone, pipeline pulls via yt-dlp
## X/TWITTER: DEPRIORITISED | WHATSAPP: FUTURE (Meta app supports it)

## TOKEN REFRESH (every 60 days)
```bash
source ~/.za-support.env
NEW=$(curl -s "https://graph.facebook.com/v19.0/oauth/access_token?grant_type=fb_exchange_token&client_id=$META_APP_ID&client_secret=$META_APP_SECRET&fb_exchange_token=$INSTAGRAM_ACCESS_TOKEN" | python3 -c "import sys,json;print(json.load(sys.stdin)['access_token'])")
sed -i '' "s|^export INSTAGRAM_ACCESS_TOKEN=.*|export INSTAGRAM_ACCESS_TOKEN=\"$NEW\"|" ~/.za-support.env
source ~/.za-support.env && echo "Refreshed. Expires: $(date -v+60d '+%d/%m/%Y')"
```

## DEPLOYMENT VERIFICATION
```bash
source ~/.za-support.env
python3 -c "
import os
for k in ['ANTHROPIC_API_KEY','MS_TENANT_ID','MS_CLIENT_SECRET','INSTAGRAM_ACCESS_TOKEN','INSTAGRAM_USER_ID','META_APP_ID','META_APP_SECRET']:
    v=os.environ.get(k,'')
    print(f'  {\"CREDENTIAL SET\" if v else \"MISSING\":15} {k} {(\"(\"+v[:12]+\"...)\") if v else \"\"}')"
```

---
*v2.5 FINAL | 07/04/2026 SAST*
