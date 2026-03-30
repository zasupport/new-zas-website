# ZA Support — New Website (new-zas-website)

# §201 WHATSAPP DEFAULT NUMBER (HARD — 30/03/2026):n# When sending ANY WhatsApp draft or message and the client's number is unknown → use Courtney's number: 27790539964 (079 053 9964)n# ∅ wait for another number | ∅ block on "pending SIM" | ∅ say "number needed first"n# Courtney's number = default send-to for all WA drafts until client number is confirmedn# Helper: ~/bin/za-whatsapp-send.sh 27790539964 "[message]"
# Stack: Next.js 15 + Tailwind v4 + Sanity.io | Deploy: Vercel + Cloudflare
# Repo: https://github.com/zasupport/new-zas-website
# Global rules: ~/.claude/CLAUDE.md (auto-loaded)
# Project-specific rules ONLY below.

# §178/§179/§173/§92/§161/§109 → global CLAUDE.md (auto-loaded)
# §176 SESSION GUARD → global CLAUDE.md (auto-loaded)
# §174 SESSION RECOVERY → global CLAUDE.md (auto-loaded)
# §180 DEPLOY GATE → global CLAUDE.md (auto-loaded)
# §181 EMAIL CHECK → global CLAUDE.md (auto-loaded)
# §122 AUTO-EXECUTE → global CLAUDE.md (auto-loaded)
# §123 CI/DEPLOY ERROR → global CLAUDE.md (auto-loaded)
# §124 AUTOMATION PRE-APPROVED → global CLAUDE.md (auto-loaded)
# §125/§130 AGENTS → global CLAUDE.md (auto-loaded)
# §129 TRUSTED CHAT → global CLAUDE.md (auto-loaded)
# §136 RENDER ENV → global CLAUDE.md (auto-loaded)
# §64/§COMPRESS → global CLAUDE.md (auto-loaded)
# §103 SESSION PERMISSIONS → global CLAUDE.md (auto-loaded)
# §129/§131/§132/§133/§134 → global CLAUDE.md (auto-loaded)
# §145-§151 AGENT COMPRESSION → global CLAUDE.md (auto-loaded)
# §153 ERROR INBOX → global CLAUDE.md (auto-loaded)
# §187 LOCAL AUTOMATION FIRST → global CLAUDE.md (auto-loaded)

## PROJECT PURPOSE
Public marketing website for zasupport.com. SEO-first. Converts Mac owners with logic board faults.
Revenue priority: Logic board repair #1 | Liquid damage #2 | iPhone/iPad #3 (organic only, not promoted)

## KEY PAGES
- / Homepage — Logic Board Repair card #1
- /logic-board-repair — Hub (2,500+ words, FAQ schema, AggregateRating)
- /logic-board-repair/macbook-pro|macbook-air|imac|mac-mini — Expanded sub-pages (500+ lines each)
- /logic-board-repair/sandton|rosebank|midrand|randburg|fourways|bryanston — Suburb pages
- /apple-support/medical-practices — Medical practice IT (uncontested keyword)

## SEO RULES
- Every logic board page: WhatsApp primary CTA | Free diagnostic callout | 12-month warranty | No Fix No Fee
- AggregateRating schema: ratingValue=4.9 reviewCount=120 on all logic board pages
- ServiceSchema on every service page
- FAQPage schema: minimum 8 FAQs per page
- Title format: "[Service] Johannesburg [Year] | From R[Price] | ZA Support"
- Competitor price anchors: Mac Shack=R4,499 board replacement | Apple Store=R15k-R70k

## §165 FAQ MANDATE (PERMANENT — HARD — 22/03/2026)
EVERY page (service|suburb|blog|landing) MUST have:
1. FAQAccordion component with ≥6 FAQs visible on page
2. FAQPage schema block (buildFaqSchema) in structured data
∅ create any page without FAQAccordion + FAQPage schema | ∅ ship any page without both

## §166 SERP MAXIMISATION (PERMANENT — HARD — 22/03/2026)
Every SERP-eligible page MUST have ALL applicable schema:
- ServiceSchema (every service/suburb page)
- FAQPage schema (every page with Q&A content)
- BreadcrumbList (every page below homepage)
- AggregateRating via layout LocalBusiness (do NOT duplicate on page level)
- ArticleSchema (blog posts only)
∅ ship page missing applicable schema | check via Google Rich Results Test after deploy

## §167 MODEL-SPECIFIC PAGES (PERMANENT — HARD — 22/03/2026)
Every service type MUST have model-specific sub-pages. Generic device pages NOT sufficient.
REQUIRED for logic-board-repair: macbook-pro-m1 | macbook-pro-m2 | macbook-pro-m3 | macbook-pro-14-inch | macbook-pro-16-inch | macbook-pro-13-inch | macbook-air-m1 | macbook-air-m2
ON any new service hub: immediately create model-specific variants

## §168 E-E-A-T SIGNALS (PERMANENT — HARD — 22/03/2026)
Every service page MUST include at minimum:
- Specific technical process described (not generic)
- At least 1 suburb/location-specific detail in body copy
- Explicit mention of: written warranty | assessment fee (from R599) | No Fix No Fee
- ZA Support contact embedded naturally (not just CTA)
∅ generic filler content | ∅ pages under 400 words body text

## §169 SERVICE AREA (PERMANENT — HARD — 22/03/2026)
Service area = all suburbs within 25km of Hyde Park (1 Hyde Park Lane, JHB) PLUS Pretoria and Centurion.
COVERED: sandton|rosebank|bryanston|fourways|midrand|randburg|kempton-park
PENDING: pretoria|centurion|morningside|rivonia|sunninghill|paulshof|northcliff|houghton|parkhurst
ON new suburb page: create across ALL 4 service types simultaneously
∅ create suburb page for one service without creating for all 4 | sitemap updated same commit

## §171 CONTENT QUALITY — AI DETECTION MITIGATION (PERMANENT — HARD — 22/03/2026)
ALL generated content MUST include:
1. First-person experience signals: "We have seen...", "In our Hyde Park workshop..."
2. Specific technical detail: component names, model numbers, exact procedures
3. Local SA context: ZAR prices, load shedding, SA ISPs, Johannesburg suburbs, POPIA
4. Varied sentence rhythm: mix short punchy with longer explanatory — ∅ uniform length
5. Concrete numbers: repair percentages, temperatures, time ranges, cost ranges
6. Genuine opinion: "The most common mistake we see..." — ∅ neutral fence-sitting
∅ publish content without all 6 signals | AI humaniser tools: rewrite.ai | Undetectable.ai | QuillBot

## §172 CONTENT SEO COMPLETENESS (PERMANENT — HARD — 22/03/2026)
EVERY page before publish MUST have:
- Title tag: target keyword + location + year + brand
- Meta description: 150-160 chars, keyword + CTA
- H1: one only, primary keyword
- H2s: at least 4, covering subtopics and long-tail variants
- Internal links: at least 3 to service hubs
- External link: at least 1 to authoritative source
- Image alt tags: keyword-rich | FAQPage schema ≥6 Qs | Word count: min 600 (800+ preferred)

## §W-SESSION-START — CHECKLIST (PERMANENT — HARD — 24/03/2026)
ON every W session start, run ALL checks before any code changes:
```bash
grep "NEXT_PUBLIC_GA4_ID" ~/Developer/new-zas-website/.env.local 2>/dev/null; vercel env ls 2>/dev/null | grep GA4
grep "NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION" ~/Developer/new-zas-website/.env.local 2>/dev/null
curl -sf https://zasupport.com/c4f4daab237f44197e59b5b52f40da52.txt | head -1
grep -o 'url: `[^`]*`' src/app/sitemap.ts | sort | uniq -d
grep "og-image" src/app/layout.tsx
curl -sf https://zasupport.com/robots.txt | head -5
```
**9-point service checklist (FAIL = fix before new features):**
- [ ] GA4 ID real — NOT `G-XXXXXXXXXX`
- [ ] GSC verified — NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION set in Vercel
- [ ] IndexNow key live — curl zasupport.com/c4f4daab237f44197e59b5b52f40da52.txt = key
- [ ] Sitemap no duplicates — grep url sitemap.ts | sort | uniq -d = empty
- [ ] OG image in metadata — openGraph.images AND twitter.images
- [ ] robots.txt correct — Disallow: /api/ /studio/ /_next/ /admin/
- [ ] SSL cert > 30 days
- [ ] Vercel deploy green — gh run list --limit 1
- [ ] PSI scores > 90 — ~/bin/za-website-morning-report.sh

## §W-SITEMAP-DEDUP (PERMANENT — HARD — 24/03/2026)
Before committing ANY sitemap.ts change:
```bash
grep -o 'url: `[^`]*`' src/app/sitemap.ts | sort | uniq -d
```
Any output = duplicates — remove before committing.

## §W-GA4-GSC (PERMANENT — HARD — 24/03/2026)
GA4: NEXT_PUBLIC_GA4_ID must match `G-[A-Z0-9]{7,10}` — placeholder = zero tracking.
GSC: verified via `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` env var in Vercel.
IndexNow: ∅ direct Google/Bing ping URLs — use ~/bin/za-index-submit.sh ONLY.
OG images: metadata `openGraph.images` + `twitter.images` (absolute URLs, 1200x630px).
PWA/mobile: theme-color + apple-mobile-web-app-capable + apple-touch-icon in layout.tsx.

## §170 CONTENT CALENDAR — 3 BLOGS/DAY (PERMANENT — 22/03/2026)
Generate 3 blog posts per day using claude-haiku-4-5 via scripts/generate-blog-posts.py
Topics rotate: model-specific fault guides | suburb-specific repair guides | cost/pricing guides | how-to diagnostic guides
Each post: FAQPage schema | ServiceSchema mention | 600-900 words | UK English | ≥6 FAQs

## E2E TEST RULE (§164 — PERMANENT — HARD — 20/03/2026)
AFTER ANY change: run full infrastructure e2e test SAME response:
(1) gh run list --limit 1 → CI green
(2) curl -s -o /dev/null -w "%{http_code}" https://zasupport.com/ → 200
(3) curl -s https://zasupport.com/robots.txt → correct Disallow rules
(4) curl -s https://zasupport.com/sitemap.xml | head -5 → valid XML
(5) curl changed page | count aggregateRating → 1 per page
(6) curl changed page | grep -c '"@type"' → schemas present
∅ "deploy queued" and stop | ∅ assume it works

## §189 DAILY CONTENT PIPELINE (HARD — 30/03/2026)
# 18:00 SAST daily: ~/bin/za-daily-content-pipeline.sh → builds up to 10 high-value SEO pages
# LaunchAgent: com.zasupport.dailycontent | Log: ~/.za-daily-content.log
# Priority: model pages > suburb pages | logic-board > liquid-damage > screen-repair > battery
# Each page: ServiceSchema+FAQPage+BreadcrumbList | 800+ words (model) | 600+ words (suburb)
# Google safe limit: 10 quality pages/day for small business domain | ∅ thin/duplicate content
# Auto: audit missing → build via claude --print → tsc → sitemap update → commit → deploy.sh

## §MONITOR-ALERTS (HARD — 26/03/2026)
# VERCEL INFRA HEADERS: x-nextjs-prerender | x-nextjs-stale-time | x-nextjs-cache | server:Vercel
#   x-vercel-id | x-vercel-cache — injected by Vercel edge, CANNOT be removed in code
#   → WARN only in monitoring scripts | NEVER fail() | strip requires Cloudflare Transform Rules
# ALERT DEDUP: MD5(message)+timestamp → file before osascript | same alert ≤1× per 2 hours

## §153 ERROR INBOX (PROJECT-SPECIFIC DETAIL)
→ error_inbox DB table | /api/v1/system/error-inbox
Session start: curl -s "https://api.zasupport.com/api/v1/system/error-inbox?status=unread&limit=50" → classify → fix
SEVERITY: critical→fix immediately | high→fix this session | medium→queue | low→log only
# §188 CLIENT MACHINE APPROVAL → global CLAUDE.md (auto-loaded)
# §189 RULES SYNC → global CLAUDE.md (auto-loaded)
# §191 HR ZOHO AUTO-EXCHANGE → global CLAUDE.md (auto-loaded)
# §192 HR PREFIX = HARD RULE → global CLAUDE.md (auto-loaded)
# §200 ROOT CAUSE DISCLOSURE → global CLAUDE.md (auto-loaded)
# §201 WHATSAPP DEFAULT NUMBER → global CLAUDE.md (auto-loaded)

# §203 IP PROTECTION (HARD — 30/03/2026): token gate + copy lock + noindex + generic title on ALL demos/previews | bare URL = black screen | CSS user-select:none + JS block copy/F12/Ctrl+U | robots.txt Disallow:/ in every demo repo

# §204 URL HASHING POPIA (HARD — 30/03/2026): ALL demo/preview URL segments hashed sha256[:8] | ∅ client name ∅ descriptive words in repo/path/filename | mapping in memory/api-keys.md only

# §205 CLIENT-FACING DOCS BY DEFAULT (HARD — 30/03/2026): ALL docs/PDFs/reports = client-facing unless Courtney says "internal" | ∅ internal headers on client PDFs | written FOR the client

# §206 NO AI DIVIDERS (HARD — 30/03/2026): ∅ "---" ∅ "***" ∅ horizontal rules in any doc/email/WA/PDF | use white space + headings | repetitive parallel bullet structures also banned

# §207 HTML EMAIL FORMATTING (HARD — 30/03/2026): ALL automated emails must use HTML — ∅ plain text ∅ content= property | use --html flag on za-outlook-send.sh | <p> per paragraph <h3> for sections | each item on own line

# §208 AUTO-REGENERATE ON RULE CHANGE (HARD — 30/03/2026): when any formatting/doc rule is updated → automatically regenerate ALL affected documents same response | ∅ apply rule to future docs only | ∅ leave existing docs stale | affected docs = any PDF/email/WA template that references the changed rule

# §209 GOOGLE FOLDER (HARD — 30/03/2026): ALL Google/SEO/ranking/analytics content → ~/Desktop/Claude/Google/ | Sub-folders: SEO|SEO-Intelligence|Lighthouse|PageSpeed|Analytics|Search-Console|Nightly-Tests|Competitor-Intel | ∅ create SEO folders outside Google/