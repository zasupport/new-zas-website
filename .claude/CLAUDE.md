# ZA Support — New Website (new-zas-website)
# Stack: Next.js 15 + Tailwind v4 + Sanity.io | Deploy: Vercel + Cloudflare
# Repo: https://github.com/zasupport/new-zas-website
# Global rules: ~/.claude/CLAUDE.md (auto-loaded)
# Project-specific rules ONLY below.

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

## §109: AUTO-APPROVE IMPROVEMENTS (PERMANENT — HARD)
ANY request to improve/optimise/upgrade/enhance/fix/refactor ANY file = pre-approved. Execute immediately.
∅ "Shall I?" | ∅ "Want me to?" | ∅ "Would you like?" — ALL BANNED.
Hard stops only: force push main | delete production data.
→ memory/feedback_auto_approve_improvements.md

## AUTO-EXECUTE RULE (§122 — PERMANENT — HARD)
Before closing ANY chat or session: execute ALL remaining tasks (build/fix/commit/deploy/verify), write ALL learnings to MEMORY.md + memory/*.md, sync new permanent rules to all repo CLAUDE.md files.
BANNED: stopping mid-task | leaving items for next session without executing | reporting without acting | "shall I continue?" when more remains.

## CI/DEPLOY ERROR RULE (§BUILD-FIRST — PERMANENT — HARD)
ON ANY CI failure, GitHub Actions failure, Vercel deploy failure, or build error:
FIX IT IMMEDIATELY — before any other task, before any new feature, before any other response.
(1) Pull exact error from `gh run list --repo zasupport/new-zas-website` + `gh run view <id> --log-failed` (2) Fix root cause in code (3) Commit + push (4) Verify CI passes (5) THEN continue prior task.
∅ "I'll fix this later" | ∅ move on with failure unresolved | ∅ report without fixing
Email signals: subject:"Run failed" | subject:"Failed production deployment" — treat as P0 interrupts.
Common errors this repo: react/no-unescaped-entities (FIXED in eslint.config.mjs) | TypeScript type mismatches | unused imports

## CI/DEPLOY ERROR RULE (§123 — PERMANENT — HARD — P0)
ON ANY CI failure, GitHub Actions failure, Vercel deploy failure, Render crash, or build error:
FIX IMMEDIATELY — before any other task, before any new feature, before continuing anything.
(1) gh run list --repo <repo> --limit 3 → identify (2) gh run view <id> --log-failed → get errors (3) Fix in code (4) Commit+push (5) Verify green (6) Resume prior task.
∅ "I will fix this later" | ∅ proceed with broken CI | ∅ report without fixing
Monitor: ~/bin/za-ci-monitor.sh (every 5min) | Alert: ~/Desktop/ZA-CI-FAILURE-*.md → fix same response.

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
