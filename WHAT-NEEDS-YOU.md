# ZA Support Website — What Needs Courtney vs What's Automated
# Last updated: 09/03/2026

---

## FULLY AUTOMATED (zero input needed)

| Task | Status | Notes |
|------|--------|-------|
| Next.js project scaffold | ✓ Done | /Developer/new-zas-website |
| 55+ SEO pages written | ✓ Building | Full keyword-targeted content |
| All Schema.org markup | ✓ Building | LocalBusiness, Service, FAQPage, BreadcrumbList |
| GitHub repo created | ✓ Done | github.com/zasupport/new-zas-website |
| Vercel project created | ✓ Done | prj_HbqpqjzYnZquFSes2NQwoSrjwYPd |
| Vercel env vars set | ✓ Done | RESEND_API_KEY, SITE_URL, Sanity placeholders |
| zasupport.com domain added to Vercel | ✓ Done | Verified |
| www.zasupport.com domain added | ✓ Done | Verified |
| GitHub Actions CI/CD pipeline | ✓ Done | Auto-deploys on every push to main |
| GitHub Actions secrets | ✓ Done | VERCEL_TOKEN, ORG_ID, PROJECT_ID |
| Weekly SEO monitor (launchd) | ✓ Done | Runs every Monday 09:00 — checks all pages |
| WordPress URL crawler | ✓ Done | Maps all old URLs for 301 redirects |
| WordPress 301 redirects | ✓ Built in vercel.json | Preserves all existing SEO value |
| Security headers | ✓ Built | HSTS, X-Frame-Options, CSP |
| Blog post generator | ✓ Script ready | scripts/generate-blog-post.sh "topic" |
| vercel.json config | ✓ Done | Redirects, headers, caching |
| deploy.sh | ✓ Done | One command: bash deploy.sh |

---

## NEEDS COURTNEY — 4 THINGS ONLY

### 1. DNS records at 1-grid (5 minutes — do this when ready to go live)
Log in to your 1-grid DNS control panel and change:

```
CURRENT:
zasupport.com        A      41.185.8.55  ← DELETE THIS

REPLACE WITH:
zasupport.com        A      76.76.21.21  ← Vercel IP
www.zasupport.com    CNAME  cname.vercel-dns.com  ← Vercel redirect

ALSO ADD (for Resend email — already identified):
send.zasupport.com   MX     feedback-smtp.eu-west-1.amazonses.com
send.zasupport.com   TXT    v=spf1 include:amazonses.com ~all
```

**WHY:** This is the single DNS change that makes zasupport.com serve the new Next.js site instead of WordPress. Once done, everything else is automatic.

**When to do it:** After you confirm the site looks correct on the Vercel preview URL.

---

### 2. Sanity CMS account (10 minutes — browser only)
1. Go to sanity.io → "Get started free"
2. Log in with admin@zasupport.com
3. Create project: "za-support-website" → dataset: "production"
4. Get project ID (shown in dashboard, format: abc123de)
5. Create API read token: Settings → API → Tokens → "Add API token" → Read → copy
6. Update Vercel env vars: NEXT_PUBLIC_SANITY_PROJECT_ID + SANITY_API_READ_TOKEN
   (or paste them here and I'll set them automatically)

**WHY:** Sanity is the headless CMS that powers the blog and will enable future content without dev time. No Sanity = no blog. Everything else works without it.

---

### 3. Google Analytics 4 (5 minutes — browser only)
1. Go to analytics.google.com
2. Admin → Create property → "ZA Support Website" → South Africa → ZAR
3. Web stream → zasupport.com → Get Measurement ID (format: G-XXXXXXXXXX)
4. Paste the ID here and I'll set it on Vercel automatically

**WHY:** GA4 tracks which pages convert visitors to calls/leads. Tells you exactly which keywords are working.

---

### 4. Google Search Console verification (10 minutes — requires DNS access)
After DNS is pointed to Vercel:
1. Go to search.google.com/search-console (already logged in as paulwhittaker099@gmail.com)
2. Add property: zasupport.com (domain property)
3. Verify via DNS TXT record — add at 1-grid at same time as Vercel DNS
4. Submit sitemap: https://zasupport.com/sitemap.xml
5. Request indexing for: /liquid-damage, /logic-board-repair, /apple-repair

**WHY:** Without GSC verification, Google won't show you ranking data or let you submit sitemaps for fast indexing.

---

## AFTER GO-LIVE — ALSO AUTOMATED

| Task | Trigger | Action |
|------|---------|--------|
| Blog posts | Run: `bash scripts/generate-blog-post.sh "topic"` | Full 1,200+ word post written by Claude API |
| SEO monitoring | Every Monday 09:00 | Checks all pages, PageSpeed, sitemap |
| WordPress crawl + redirects | Run: `bash scripts/crawl-wordpress-redirects.sh` | Maps any missed old URLs |
| Auto-deploy | `git push origin main` (or `bash deploy.sh`) | Full CI/CD: type check → lint → build → deploy |

---

## WHAT HAPPENS AUTOMATICALLY ONCE LIVE

Every time you push code:
→ GitHub Actions: type-checks → lints → deploys to Vercel → live in 2 minutes

Every Monday 09:00:
→ SEO monitor runs → checks all 50+ pages are returning 200 → checks sitemap → logs results → sends macOS notification

Any blog post you want:
→ `bash scripts/generate-blog-post.sh "MacBook battery replacement cost South Africa 2026"` → 1,200 word SEO-optimised post ready to paste into Sanity

---

## CURRENT SITE STATUS

```
GitHub:    github.com/zasupport/new-zas-website  ✓ Created
Vercel:    prj_HbqpqjzYnZquFSes2NQwoSrjwYPd      ✓ Ready
Domain:    zasupport.com                           ✓ Added to Vercel
DNS:       41.185.8.55 (1-grid)                   ⏳ CHANGE NEEDED → 76.76.21.21
Sanity:    Not yet configured                      ⏳ 10 min setup
GA4:       Not yet configured                      ⏳ 5 min setup
GSC:       Not yet verified                        ⏳ After DNS change
Build:     In progress                             ⏳ Building 55+ pages
```

ZA Support | admin@zasupport.com | 064 529 5863
