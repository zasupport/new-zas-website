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

# §284 GAP ANALYSIS AUTO-EXECUTE (HARD — 19/04/2026): §278 EXECUTABLE-NOW items → auto-enqueue ~/.za-gap-analysis-queue.json + live drain + LaunchAgent com.zasupport.gapanalysisexecutor (RunAtLoad+300s failover, survives sleep/lid-close/session-death) | headless Claude per item → ~/.za-gap-analysis-logs/<id>.log | Retry 3× then notify+failed | BLOCKED-EXTERNAL never auto-executed | LIVE 19/04 13:50: exit=0, /tmp/ga-test.txt=OK, queue status=done | extends §278+§274+§265+§216+§267+§273 | global CLAUDE.md (full detail)

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

## §169 / §223 SERVICE AREA — 60KM GAUTENG ONLY (HARD — updated 06/04/2026)
Service area = Gauteng suburbs within 60km of Hyde Park (1 Hyde Park Lane, JHB 2196). ∅ Cape Town ∅ other provinces.
≤20km TIER 1: sandton|rosebank|bryanston|fourways|morningside|rivonia|houghton|melrose|illovo|parkhurst|northcliff|randburg|sunninghill|paulshof|woodmead|kyalami|edenvale|bedfordview
20–60km TIER 2: midrand|kempton-park|centurion|pretoria|roodepoort|boksburg|benoni|alberton|germiston|randpark-ridge
PRIORITY PER SUBURB: logic-board > liquid-damage > managed-IT(medical/corporate) > screen > battery
HIGH VALUE: sandton(Investec)|morningside(medical)|bryanston(corporate)|midrand(tech)
ON new suburb page: create across ALL service types simultaneously | sitemap updated same commit
∅ create suburb page for one service without creating for all | ∅ content targeting outside 60km radius

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

## §220 RESEARCH-FIRST BLOG PIPELINE — 8/DAY (HARD — 04/04/2026 — REPLACES §170/§213)
Target: 8 posts/day (~240/month — Google-safe with E-E-A-T quality gates, 85% confidence)
EVERY topic must be justified by data from ≥2 sources: GSC impressions-without-clicks | GA4 top-page patterns | PyTrends ZA | competitor keyword gaps | rank tracker position 5-20
Research engine: ~/bin/za-blog-research-engine.py → ~/Desktop/Claude/Blog/research-briefs-DDMMYYYY.json
Each topic gets a full research brief injected into the Haiku generation prompt
Each post: TIERED (1500+ repair/competitive | 1200+ informational | 800+ troubleshooting) | UK English | ≥6 FAQs | FAQPage schema | research data referenced naturally
∅ hardcoded topic pools | ∅ DDG scraping as sole research | ∅ generic AI topics

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
# §210 NO SALES WORDING (HARD — 30/03/2026): ∅ motivational/inspirational taglines in docs/PDFs/emails/proposals | ∅ "deserves" ∅ "works as hard as" | factual + professional tone only

# §211 OVERNIGHT EXECUTION VERIFICATION (HARD — 30/03/2026): EVERY automated task MUST verify output — ∅ exit 0 without proof | file tasks: [ -s ] + validate | git: diff --stat non-empty | API: parse body | blog/page: tsc pass or REVERT | pipeline: explicit PASS/FAIL verdict | ∅ Haiku claims success without deliverable
# §212 LAUNCHAGENT HEALTH (HARD — 30/03/2026): ALL 34 agents loaded | session start: launchctl list | grep -c zasupport = 34 | < 34 = reload before work | exit 127 = fix path | exit 1 = fix script
# §220 BLOG PIPELINE 8/DAY (HARD — 07/04/2026 — updated by §229): research-first (≥2 SEO sources per topic) → research brief → generate → insert → deploy | 8/day (4+4) | ∅ hardcoded pools | ∅ exit 0 with 0 posts | each: tiered 1500+/1200+/800+ words, ≥6 FAQs, FAQPage schema
# §225 GAUTENG 60KM ONLY (HARD — 06/04/2026): ALL SEO = Gauteng suburbs ≤60km Hyde Park | ∅ Cape Town ∅ other provinces | suburb × service matrix | priority: logic-board > liquid-damage > managed-IT > screen > battery
# §226 BANNED "FREE ASSESSMENT" (HARD — 06/04/2026): ∅ "free assessment" ∅ "free diagnostic" ∅ "free check" | ZA Support charges R599 for assessments | correct: "from R599 assessment" | find+replace immediately on any violation | applies to ALL pages|blogs|meta|emails

# §215 TERMINAL COMMANDS — NO LINE BREAKS (HARD — 31/03/2026): ALL terminal commands = single-line ∅ backslash continuations ∅ multi-line curl/python. Write to /tmp script file first if too long. ∅ wrap lines in user-facing commands.

# §219 WHO NOT HOW (HARD — 02/04/2026): ∅ "How do I do X?" → "Who is the best Who?" | Courtney=WHAT+WHY+approval | Claude=primary technical Who for ALL Hows | Impact Filter: WHAT+WHY+best/worst result+success checklist before any new goal | ∅ present How options — pick+execute | STUCK=find better Who ∅ escalate to Courtney → global CLAUDE.md (full detail)

# §221 GMB MEDIA SYNC (HARD — 06/04/2026):
# Pull all photos+videos from Google Business Profile → ~/Desktop/Claude/Google/GMB-Media/
# Auth: python3 ~/bin/za-gmb-oauth-setup.py (one-time OAuth2 consent — browser required)
# Sync: bash ~/bin/za-gmb-media-sync.sh | LaunchAgent: com.zasupport.gmbmediasync (Mon 07:00)
# Photos → /GMB-Media/photos/*.webp | Videos → /GMB-Media/videos/*.mp4
# Use GMB photos in blog posts instead of stock images (§7 Image Requirements)
# Credentials: GBP_CLIENT_ID + GBP_CLIENT_SECRET + GBP_REFRESH_TOKEN in ~/.za-keys-pending.env
# Setup prereq: enable Business Profile API at console.cloud.google.com (project: za-support-seo-202603)

# §222 CLAUDE OPUS TERMINAL ONLY (HARD — 06/04/2026):
# ALWAYS launch Claude via Terminal — ∅ web browser ∅ claude.ai
# Model lock: claude-opus-4-6 set in ~/.claude/settings.json (permanent)
# Terminal launcher: ~/Desktop/Claude Opus.app (double-click → Terminal → claude --model claude-opus-4-6)
# CLI: `claude --model claude-opus-4-6` or just `claude` (settings.json enforces Opus)
# ∅ open claude.ai in browser | ∅ use Sonnet when Opus is available | ∅ skip --model flag

# §234 CLIENT-FACING PDF FORMAT (HARD — 07/04/2026) → global CLAUDE.md (auto-loaded)
# §239 VEHICLE BRANDING MOCKUP (HARD — 08/04/2026) AUTO-EXECUTE → ~/Developer/za-support-imggen/ | /vehicle-branding | global CLAUDE.md (auto-loaded)

# §240 VERIFY STATUS WITH REAL DATA (HARD — 08/04/2026): EVERY status claim MUST be verified by executing with real data — same response | ∅ mark status without testing | ∅ ask before testing — auto-execute | Extends §233
# §240 STATUS VERIFICATION WITH REAL DATA (HARD — 08/04/2026) → global CLAUDE.md (auto-loaded)
# §241 UNCERTAIN=TEST→SELF-HEAL→RETEST→LOOP (HARD — 08/04/2026) → global CLAUDE.md (auto-loaded)

# §244 RULE = RULE + ENFORCEMENT + TEST (HARD — 08/04/2026): every new HR MUST deliver (1)rule text (2)enforcement script/LaunchAgent/hook (3)real-data test — ALL in same response | ∅ rule text alone = not implemented
# §240 MOCKUP OPUS PIPELINE + AUTO-OPEN (HARD — 08/04/2026) → Creative.MD + Opus refine + auto-open | global CLAUDE.md (auto-loaded)
# §241 TERMINAL OPUS LAUNCHER (HARD — 08/04/2026) → O = new Terminal CLI + claude-opus-4-6 | ∅ browser ∅ claude.ai | global CLAUDE.md (auto-loaded)
# §242 OPUS = NEW TERMINAL WINDOW (HARD — 08/04/2026): ANY Opus request → new Terminal CLI | ∅ claude.ai ∅ browser ∅ paste | global CLAUDE.md (auto-loaded)

# §246 GSC INTELLIGENCE FEEDBACK LOOP (HARD — 08/04/2026): GSC data every 60s → correlate git changes → learned behaviours → update .md rules | ~/bin/za-gsc-intelligence.py | com.zasupport.gscintelligence | positive=weight higher, negative=investigate
# §247 COMPLETION SELF-CHECK — CC/CI/PORTABLE.MD (HARD — 08/04/2026): before marking ANY output complete answer "How do I know this completed successfully?" | CC=run+stdout | CI=gh run view+exit 0 | Portable.MD=grep key section+propagated | global CLAUDE.md (auto-loaded)
# §248 CONTINUOUS LEARNING (HARD — 08/04/2026): after every task answer WHAT learned + WHAT better + WHY success/failure + WHAT to replicate → propagate to all .md + intelligence engine | global CLAUDE.md (auto-loaded)
# §251 PDF HEADING ORPHAN PREVENTION (HARD — 08/04/2026): ALL ReportLab PDF section/subheading ParagraphStyle MUST have keepWithNext=True | short sections wrap in KeepTogether([heading, body]) | ∅ orphaned headings | extends §234 | global CLAUDE.md (auto-loaded)

# §254 MAC MODEL ID SKILL: /mac-model-id — load before stating ANY Mac hardware spec/upgrade/macOS compat | ∅ guess from year alone | SKILL: ~/.claude/skills/mac-model-id/SKILL.md

# §255 HARDWARE RESEARCH VERIFICATION: /hardware-research — min 2 sources + real-world confirmation before ANY hardware/software compat claim | ∅ answer from training data alone

# §256 IFIXIT REPAIR GUIDE LOOKUP: /ifixit-repair-guide — search iFixit for exact model+component guide, verify A-number, save to Knowledge Centre | ∅ generic model without year

# §260 CONTINUE = RESUME, NOT RESTART: "continue"/"finish"/"complete the above" = resume signal | ∅ restart ∅ recap | extends §231
# §259 WHATSAPP SKILL AUTO-ACTIVATION: NLP trigger → auto-load WhatsApp skills (7 total) | za-whatsapp-skill-verify.sh
# §257 CROSS-PLATFORM CONTEXT SYNC: portable.md every 2min → iCloud+API+local | za-portable-context-sync.sh | com.zasupport.portablesync (120s)

# §269 PROPRIETARY TOOL CONCEALMENT (HARD — 13/04/2026): ∅ ANY reference to tools, technologies, frameworks, platforms, methods, processes in ANY public output | FULL SPEC: ~/.claude/rules/269-proprietary-tool-concealment.md | supersedes §268 | extends §203+§204+§205+§252 | global CLAUDE.md (full detail)
# §268 TECH STACK CONCEALMENT (HARD — 13/04/2026): ∅ proprietary technology identifiers (logos, favicons, SVGs, meta tags, boilerplate) visible on ANY public-facing property | Vercel/Next.js/Render/Sanity branding = competitive intelligence leak | remove on sight | replace with ZA Support branding | grep -rl "vercel\|nextjs" public/ must = 0 | extends §203+§204

# §266 CROSS-SESSION DEDUP (HARD — 12/04/2026): auto-detect duplicate work across sessions | za-session-dedup-hook.sh + za-session-dedup.sh | global CLAUDE.md (full detail)

# §261 CONTACT NUMBER LOCK (HARD — 11/04/2026): Website contact number = 064 529 5863 ALWAYS | ∅ change to 079 951 0851 | ∅ change ANY website contact number without explicit Courtney approval
# 079 951 0851 = WA Business number (pending approval) — WA link URLs (wa.me) are separate from displayed contact number
# REMINDER 13/04/2026: check if WA Business approved 079 951 0851 → ask Courtney before any number change

# §267 COMPLETE ALL PENDING BEFORE SESSION END (HARD — 12/04/2026): ∅ end session with unfinished detected tasks | verify 0 pending before stopping | za-pending-completion-gate.sh (Stop hook) | global CLAUDE.md (full detail)
# §265 AUTO-COMPLETE BLOG+WEBSITE WORK (HARD — 12/04/2026): auto-execute blog/website tasks that need no Courtney input | blog posts, SEO fixes, schema, sitemap, 404s, self-heal | ∅ ask ∅ wait | global CLAUDE.md (full detail)
# §263 WEEKLY KEYWORD STRATEGY (HARD — 11/04/2026): Saturday XLSX (exact format from ZA-Support-Keyword-Strategy-06042026.xlsx) + daily reminders until approved | global CLAUDE.md (full detail)
# §262 END-TO-END PROOF GATE (HARD — 11/04/2026): EVERY build/update/pipeline MUST prove with real data that every stage works end-to-end | ∅ done without proof | extends §92+§233+§240+§247 | global CLAUDE.md (full detail)
