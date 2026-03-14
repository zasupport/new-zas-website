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
