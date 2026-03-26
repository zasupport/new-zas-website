# ZA Support — New Website (new-zas-website)
# Stack: Next.js 15 + Tailwind v4 + Sanity.io | Deploy: Vercel + Cloudflare
# Repo: https://github.com/zasupport/new-zas-website
# Global rules: ~/.claude/CLAUDE.md (auto-loaded)
# Project-specific rules ONLY below.

# §178 GLOBAL DEV PROCESS (PERMANENT — HARD — 26/03/2026) → ~/.claude/CLAUDE.md §178
# RESEARCH→DEVELOP(self-heal)→TEST→DEPLOY→EMAIL-CHECK→RETEST→FIX-LOOP(3×)→LEARN→PROPAGATE
# EMAIL-CHECK: after every Vercel deploy — search courtney@zasupport.com for Vercel|GitHub errors
# FIX-LOOP: 3× auto | if all fail → REBUILD clean → republish ∅ask
# LEARN: every mistake+success → ALL .md files same response ∅defer
# §179 THURSDAY CREDIT BURN (PERMANENT — HARD — 26/03/2026) → ~/.claude/CLAUDE.md §179
# §173 EXECUTE-ON-SPEAK: gap identified=execute NOW | §92 DONE=built+deployed+tested+verified | §161 USAGE FOOTER end every response | §109 AUTO-APPROVE all improvements ∅ask → ~/.claude/CLAUDE.md

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

## §176 SESSION GUARD — ZERO LOSS (PERMANENT — HARD — 25/03/2026)
# HARD RULE: Claude session MUST survive lid-close | sleep | network-drop | crash
# ON lid/sleep/net-drop: za-lid-guard.sh → za-checkpoint.sh → za-session-cloud-sync.sh push
# ON wake/reconnect: za-auto-claude.sh (60s) → za-session-recover.sh → cloud pull → claude -r <id>
# DAEMONS: com.zasupport.lidguard (KeepAlive) | com.zasupport.autoclaude (60s interval)
# CLOUD: checkpoint + JSONL → api.zasupport.com/api/v1/system/files | Render cron every 6h dead-man
# ∅ session lost ∅ context gone ∅ start fresh — always -r resume | 0 data loss guaranteed

## §174 SESSION RECOVERY (PERMANENT — HARD — 22/03/2026)
ON any interruption (sleep|crash|lid-close|terminal-close): za-checkpoint.sh writes
~/.za-checkpoint.json. ON wake: za-auto-claude.sh → claude -r <session_id> in tmux za-main.
Recovery sequence: (1) detect wake/reconnect (2) read checkpoint (3) launch claude -r <id> (4) resume exact task.
CHECKPOINT RULE: bash ~/bin/za-checkpoint.sh <task> <status> before + after every major task.
∅ restart from scratch if session_id exists | network restore → backup + resume both fire
On network restore: com.zasupport.backup.networktrigger → za-network-backup.sh (backup) + za-auto-claude.sh (resume)

## §173 EXECUTE-ON-SPEAK (PERMANENT — HARD — 22/03/2026)
Identifying a gap/plan/fix/idea verbally or in text = IMMEDIATE execution same response.
∅ "I'll build X" ∅ "this should be done" ∅ "the fix is Y" without doing it NOW.
∅ separate planning from doing — they are the SAME response. Spoken = committed = done.
VIOLATION: naming a task without completing it in the same response.

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
Every service type MUST have model-specific sub-pages. Generic device pages (e.g. /macbook-pro) are NOT sufficient.
REQUIRED for logic-board-repair: macbook-pro-m1 | macbook-pro-m2 | macbook-pro-m3 | macbook-pro-14-inch | macbook-pro-16-inch | macbook-pro-13-inch | macbook-air-m1 | macbook-air-m2
ON any new service hub: immediately create model-specific variants | ∅ hub-only (no model pages) = INCOMPLETE

## §168 E-E-A-T SIGNALS (PERMANENT — HARD — 22/03/2026)
Every service page MUST include at minimum:
- Specific technical process described (not generic)
- At least 1 suburb/location-specific detail in body copy
- Explicit mention of: written warranty | assessment fee (from R599) | No Fix No Fee
- ZA Support contact embedded naturally (not just CTA)
∅ generic filler content | ∅ pages under 400 words body text

## §169 SERVICE AREA (PERMANENT — HARD — 22/03/2026)
Service area = all suburbs within 25km of Hyde Park (1 Hyde Park Lane, JHB) PLUS Pretoria and Centurion (explicit client request).
COVERED SUBURBS (22/03/2026): sandton|rosebank|bryanston|fourways|midrand|randburg|kempton-park
PENDING SUBURBS: pretoria|centurion|morningside|rivonia|sunninghill|paulshof|northcliff|houghton|parkhurst
ON new suburb page: create across ALL 4 service types simultaneously: logic-board-repair + battery-replacement + liquid-damage + iphone-repair/screen
∅ create suburb page for one service without creating for all 4 | sitemap updated same commit

## §171 CONTENT QUALITY — AI DETECTION MITIGATION (PERMANENT — HARD — 22/03/2026)
Google does not explicitly penalise AI-written content — it penalises LOW-QUALITY content that lacks E-E-A-T.
ALL generated content MUST include:
1. First-person experience signals: "We have seen...", "In our Hyde Park workshop...", "Clients frequently ask us..."
2. Specific technical detail: component names, model numbers, tool names, exact procedures
3. Local SA context: ZAR prices, load shedding, SA ISPs, Johannesburg suburbs, POPIA
4. Varied sentence rhythm: mix short punchy sentences with longer explanatory ones — ∅ uniform length
5. Concrete numbers: repair percentages, temperatures, time ranges, cost ranges
6. Genuine opinion: "The most common mistake we see..." — ∅ neutral fence-sitting
∅ publish content without all 6 signals present | update blog generator system prompt with these requirements
AI HUMANISER TOOLS (use when content flagged): rewrite.ai (free) | Undetectable.ai (limited free) | QuillBot paraphrase mode
PRIORITY FIX: update scripts/generate-blog-posts.py SYSTEM prompt to include these signals in every generation

## §172 CONTENT SEO COMPLETENESS (PERMANENT — HARD — 22/03/2026)
EVERY page before publish MUST have:
- Title tag: target keyword + location + year + brand
- Meta description: 150-160 chars, includes keyword + CTA
- H1: one only, contains primary keyword
- H2s: at least 4, covering subtopics and long-tail variants
- Internal links: at least 3 linking to service hubs
- External link: at least 1 to authoritative source (Apple support, iFixit, etc.)
- Image alt tags: keyword-rich (if images present)
- FAQPage schema: ≥6 questions (see §165)
- Word count: minimum 600 words body text (800+ preferred)
∅ publish page missing any item above | treat as incomplete until all present

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
- [ ] GA4 ID real — NOT `G-XXXXXXXXXX` | Real ID: Google Analytics → Admin → Data Streams
- [ ] GSC verified — NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION set in Vercel | GSC: paulwhittaker099@gmail.com
- [ ] IndexNow key live — curl zasupport.com/c4f4daab237f44197e59b5b52f40da52.txt = key
- [ ] Sitemap no duplicates — grep url sitemap.ts | sort | uniq -d = empty
- [ ] OG image in metadata — grep "og-image" src/app/layout.tsx shows openGraph.images AND twitter.images
- [ ] robots.txt correct — Disallow: /api/ /studio/ /_next/ /admin/
- [ ] SSL cert > 30 days — morning billing report checks daily, warn <30d
- [ ] Vercel deploy green — gh run list --limit 1 → CI pass
- [ ] PSI scores > 90 — ~/bin/za-website-morning-report.sh

## §W-SITEMAP-DEDUP (PERMANENT — HARD — 24/03/2026)
Before committing ANY sitemap.ts change:
```bash
grep -o 'url: `[^`]*`' src/app/sitemap.ts | sort | uniq -d
```
Any output = duplicates — remove before committing. Duplicates waste GSC crawl budget.

## §W-GA4-GSC (PERMANENT — HARD — 24/03/2026)
GA4: NEXT_PUBLIC_GA4_ID must match `G-[A-Z0-9]{7,10}` — placeholder G-XXXXXXXXXX = zero tracking.
GSC: verified via `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` env var in Vercel.
IndexNow: ∅ direct Google/Bing ping URLs (deprecated) — use ~/bin/za-index-submit.sh ONLY.
OG images: must be declared in metadata `openGraph.images` + `twitter.images` (absolute URLs, 1200×630px) — file in /public is NOT enough.
PWA/mobile: theme-color + apple-mobile-web-app-capable + apple-touch-icon in layout.tsx <head> on every new project.

## §170 CONTENT CALENDAR — 3 BLOGS/DAY (PERMANENT — 22/03/2026)
Generate 3 blog posts per day using claude-haiku-4-5 via scripts/generate-blog-posts.py
Topics rotate: model-specific fault guides | suburb-specific repair guides | cost/pricing guides | how-to diagnostic guides
Each post MUST have: FAQPage schema | ServiceSchema mention | 600-900 words | UK English | ≥6 FAQs in faqSchemas map
∅ blog post without FAQPage schema | ∅ generic content (must target specific keyword)

## §109: AUTO-APPROVE IMPROVEMENTS (PERMANENT — HARD)
ANY request to improve/optimise/upgrade/enhance/fix/refactor ANY file = pre-approved. Execute immediately.
∅ "Shall I?" | ∅ "Want me to?" | ∅ "Would you like?" — ALL BANNED.
Hard stops only: force push main | delete production data.
→ memory/feedback_auto_approve_improvements.md

## AUTO-EXECUTE RULE (§122 — PERMANENT — HARD)
Before closing ANY chat or session: execute ALL remaining tasks (build/fix/commit/deploy/verify), write ALL learnings to MEMORY.md + memory/*.md, sync new permanent rules to all repo CLAUDE.md files.
BANNED: stopping mid-task | leaving items for next session without executing | reporting without acting | "shall I continue?" when more remains.

## CI/DEPLOY ERROR RULE (§123 — PERMANENT — HARD — P0)
ON ANY CI/Vercel/build failure: FIX IMMEDIATELY — before any other task.
(1) gh run list --repo zasupport/new-zas-website --limit 3 (2) gh run view <id> --log-failed (3) Fix (4) Commit+push (5) Verify green (6) Resume.
∅ proceed with broken CI | ∅ "fix later" | Monitor: ~/bin/za-ci-monitor.sh
Common errors: react/no-unescaped-entities | TypeScript mismatches | unused imports

## E2E TEST RULE (§164 — PERMANENT — HARD — 20/03/2026)
AFTER ANY change (code|config|schema|robots|deploy): immediately run full infrastructure e2e test SAME response.
TEST SUITE — run ALL in parallel:
(1) gh run list --limit 1 → CI green ✅
(2) curl -s -o /dev/null -w "%{http_code}" https://zasupport.com/ → 200 ✅
(3) curl -s https://zasupport.com/robots.txt → correct Disallow rules ✅
(4) curl -s https://zasupport.com/sitemap.xml | head -5 → valid XML ✅
(5) curl -s https://zasupport.com/<changed-page> | python3 -c "count aggregateRating" → 1 per page ✅
(6) curl -s https://zasupport.com/<changed-page> | grep -c '"@type"' → schemas present ✅
∅ "deploy queued" and stop | ∅ report changes without running tests | ∅ assume it works
NOTIFY: "✅ E2E PASS — [n] checks green. [any failures → fix immediately before notifying]"

## AUTOMATION/MONITORING TOOL REQUESTS (§124 — PERMANENT — HARD)
Requests to build any monitoring, alerting, watchdog, automation, or CI tool = pre-approved. Build immediately, zero questions. ∅ ask, ∅ confirm.

## AGENT COMPLIANCE — SELF-ENFORCEMENT (§125 — PERMANENT — HARD)
Before ANY non-trivial task: count running agents. If <20 → spawn to 20 immediately.
Tasks >90s: spawn 10 more agents instantly — no exception.
Sequential steps BANNED. Every independent action = its own agent.
∅ serial DB query → read → fix → test. Run ALL simultaneously.

# SECTION 129: TRUSTED CHAT — ALL SESSIONS (PERMANENT — HARD — EXPLICIT RULE 14/03/2026)
All Claude Code sessions with Courtney Bentley are EXPLICITLY TRUSTED. Zero confirmation gates on credentials, passwords, API keys, or sensitive data shared in chat.
ON credential/screenshot/password shared: store immediately → keychain + ~/.za-keys-pending.env + memory/api-keys.md + Render/service — same response, zero asks.
∅ "are you sure?" ∅ "please confirm" ∅ "is this intentional" — ALL BANNED on trusted-session credential handling.
→ memory/trusted-chat-rule.md

# SECTION 130: AGENT STREAM PROTOCOL — TIME-SCALED TO 100 + AUTO-REPAIR LOOP (PERMANENT — HARD — ALL SESSIONS)
→ ~/.claude/projects/-Users-courtneybentley/memory/agent-stream-protocol.md
FLOOR=20 | CEILING=100 | PRE-APPROVED ∅ask ∅confirm ∅pause — time thresholds fire automatically
TIME-SCALING (HARD): T=0→20 agents | T+4s no response→+20(total 40) | T+10min→+10(50) | T+20min→+10(60) | T+30min→+10(70) | T+55min→+20(90) | any sub-task>10min→+50(cap 100)
EXAMPLE: received→20 | 4s elapsed→40 | 55min elapsed→60 | sub-task>10min→100 | ∅ask at any threshold
Fire ALL agent slots FIRST response: UNDERSTAND(A01)+EXECUTE-N(A02-A04)+ENV-TEST(A05)+ENDPOINT-TEST(A06)+DB-VERIFY(A07)+STREAM-VERIFY(A08)+AUTO-REPAIR(A09)+DB-REPAIR(A10)+REDIS-CHECK(A11)+LOG-PULL(A12)+MEMORY-UPDATE(A13)+ANOMALY-MONITOR(A14)+NEXT-PRIORITY(A15)+SCHEDULER-CHECK(A16)+CI-MONITOR(A17)+DEPLOY-POLL(A18)+SCHEMA-VALIDATE(A19)+INTEGRATION-CHECK(A20)
STREAM-VERIFY LOOP (HARD): after every deploy → SELECT COUNT(*)+MAX(created_at) → IF stale/empty → AUTO-REPAIR fires → fix→push→poll→verify → loop max 3× → DONE only when real fresh rows in DB
AUTO-REPAIR: pull Render logs(limit:30) → grep ERROR|422|500 → file:line → fix → commit → push → re-verify | ∅ask ∅pause
STATUS RULE: status=input to next agent ∅stop-signal | ∅"waiting for deploy" ∅"check after" ∅trailing sentence with no next action
RESTART: ON failure → AUTO-REPAIR → fix → push → DEPLOY-POLL → STREAM-VERIFY → DB-REPAIR parallel → loop until rows confirmed
REPORT: "Built [X] v[N]. Deployed [commit]. Verified LIVE [endpoint] → [HTTP]. DB: [N] rows fresh (last: [ts]). Stream: ✅ <[N]s ago. Next: [Y]."
∅"should be streaming" ∅"should be working" ∅<20 agents ∅stopping after fix without verifying
INJECTED 15/03/2026 — global rule, all repos.

# GLOBAL RULES ACTIVE (§129|§131|§132|§133|§134)
→ ~/.claude/CLAUDE.md §129 BUILD INITIATION PROTOCOL
→ ~/.claude/CLAUDE.md §131 ERROR EMAIL AUTO-PROCESSING
→ ~/.claude/CLAUDE.md §132 DATA COLLECTION P0 PIPELINE
→ ~/.claude/CLAUDE.md §133 REPORT DELIVERY
→ ~/.claude/CLAUDE.md §134 LOCAL PG MIRROR

# §COMPRESS: RT COMPRESSION PROTOCOL (PERMANENT — HARD — 15/03/2026)
→ ~/.claude/projects/-Users-courtneybentley/memory/compression-protocol.md | global §64
ON every write|edit|build|response: classify→measure→compress→verify SAME response ∅defer ∅batch
SCOPE: *.ts|*.tsx|*.mdx|*.json|*.md|*.css|img|video|Claude ctx
PIPELINE: write→size_check→IF exceed: compress(method[type])→verify(new<limit)→checksum→log→∅block_task
IMAGE RT: exiftool -all= → WebP ≤200KB ≤1200px/72% | strip EXIF (POPIA) | ∅original | SEO: alt+title injected
VIDEO RT: ffmpeg crf=28 scale=1280 ≤5MB/clip | strip audio if no speech | WebM preferred
SELF-HEAL: fail→alt_method→split_file→archive | 3×fail→[COMPRESS-FAIL] MEMORY.md ∅block_task
LIMITS: CLAUDE_MD=40k | MEMORY_MD=120L | IMG=200KB | VIDEO=5MB | MDX_COMPONENT=200L
VERIFY: assert new_size<old_size + integrity_checksum + pii_clear | log "COMPRESSED {f}: {old}→{new} ({pct}%)"
SEO SAFE: compress ∅remove structured data | ∅alter FAQPage|ServiceSchema|AggregateRating blocks

# §§145-151: AGENT + PROMPT COMPRESSION (PERMANENT — HARD — 15/03/2026)
→ ~/.claude/projects/-Users-courtneybentley/memory/compression-protocol.md

§145 AGENT PROMPTS: DSL only ∅prose | ≤500 tokens simple ≤2k complex | FORMAT: TASK:[verb][target] CTX:[min] RET:[§146 DSL] ∅:[bans]
§146 AGENT RESULTS: [SLOT]:[STATUS][DOMAIN]([finding]) ∅prose | ≤200 tokens/agent | STATUS: ✅❌⚠️⏳— | 20 results=1 line=300 tokens
§147 PRE-SPAWN DEDUP: hash(domain+verb+target) → IF >80% overlap: merge | ∅2 agents same domain | log ~/.za-agent-dedup.log
§148 CACHE PREFIX: stable rules FIRST, variable task LAST in ALL agent prompts | ~90% cache hit rate
§149 TIMEOUTS: simple=30s build=120s deploy=90s stream=45s log=60s | ON timeout: kill→respawn→if 2×: AUTO-REPAIR
§150 HAIKU ROUTING: A05|A06|A07|A11|A12|A16|A17|A18|A19=Haiku | A01|A02-A04|A09|A14|A15|A20=Opus | 70% cost reduction
§151 PROMPT PARSING: UserPromptSubmit hook → za-prompt-parse.sh → DSL prepended ∅replace | passthrough: go|next|yes|/cmds|<20chars

# SECTION 103: AUTO-TRUST + ZERO-STOP (PERMANENT — HARD — FINAL CORRECTION 15/03/2026)
§103.TRUST: auto-approve "trust this folder"=option 1 | send "1"+Enter | tmux: 4s delay
§103.ZERO-STOP: BUILD→VERIFY LIVE→COMMIT→PUSH→NEXT TASK | ∅check-ins ∅gates
§103.SKIP-PERMS: `claude --dangerously-skip-permissions` always | option 2 "Yes, allow [dir]"→Down+Enter
# AUTO-ACCEPT OPTION 2 — FINAL — 15/03/2026
# ∅ NEVER show permission prompt to user | ALWAYS send Down+Enter | option 2 EVERY time
§103.SESSION-ALLOW: EVERY directory permission prompt = ALWAYS option 2 → Down+Enter immediately | ∅ option 1 | ∅ option 3 | ∅ show to user | ∅ ask Courtney | REINFORCED 15/03/2026 — NEVER IGNORED AGAIN

# SECTION 136: RENDER ENV VAR UPDATE — NEVER DESTRUCTIVE PUT (PERMANENT — HARD — P0)
PUT /env-vars REPLACES ALL — wiped DATABASE_URL+REDIS_URL+32 others in one call
SAFE: mcp__render__update_environment_variables (merge=default) | UNSAFE: PUT replace=true OR partial
ON rotation: MCP ONLY changed key(s) | manual PUT: fetch ALL vars first→PUT | →memory/feedback_render_env_destructive_put.md

# SECTION 153: ERROR INBOX — ALL ERRORS ROUTE TO CLAUDE FIRST (PERMANENT — HARD — 15/03/2026)
→ memory/email-processing-rules.md | error_inbox DB table | /api/v1/system/error-inbox
HARD RULE: ALL backend errors accumulate in error_inbox table. ∅ individual error emails to Courtney.
Claude reads error_inbox at session start → classifies → auto-fixes → ONE summary email to Courtney.
ONE EMAIL RULE: Courtney receives MAX 1 error summary email per day (07:00 SAST via _error_summary_job).
∅ individual scheduler failure emails | ∅ individual build failure emails | ∅ duplicate alert emails
Session start: curl -s "https://api.zasupport.com/api/v1/system/error-inbox?status=unread&limit=50" -H "Authorization: Bearer $AGENT_AUTH_TOKEN" → classify → fix → mark processed
SEVERITY: critical→fix immediately(§123) | high→fix this session | medium→queue | low→log only

# ── §92 SCRIPT FIX RULE (HARD — 26/03/2026) ────────────────────────────────
# SCRIPT FIX RULE (HARD — 26/03/2026): bash -n = syntax only ≠ test | DONE requires:
#   execute script → capture stdout → confirm fixed behaviour in output — SAME response as fix
#   ∅commit without running | ∅"syntax OK" as verification | ∅declare done before seeing real output
