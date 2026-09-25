---
title: Master Lossless Handoff — website session (e6a23fff)
kind: cc-to-cc-handoff
for: a different Claude Code session working on new-zas-website
from_session: e6a23fff-746f-494f-8e7b-4870f58f369d (fork of a41a19e2-0c89-45f1-8c01-e14beceb4129)
date: 2026-09-25 11:01 SAST (09:01 UTC)
repo: github.com/zasupport/new-zas-website
branch_at_handoff: seo/organic-growth-infra (0 ahead / 0 behind origin)
head_at_handoff: ae20228
claude_code_injection:
  target_path: docs/governance/MASTER-LOSSLESS-HANDOFF-website-session-e6a23fff-2026-09-25.md
  permissions: '0644'
  create_parent_dirs: true
  overwrite_if_exists: false
  backup_if_exists: true
  post_install_verify: "test -s docs/governance/MASTER-LOSSLESS-HANDOFF-website-session-e6a23fff-2026-09-25.md"
  rollback_command: "rm -f docs/governance/MASTER-LOSSLESS-HANDOFF-website-session-e6a23fff-2026-09-25.md"
---

<!--
CLAUDE-CODE-INJECTION
target_path: docs/governance/MASTER-LOSSLESS-HANDOFF-website-session-e6a23fff-2026-09-25.md
permissions: 0644
create_parent_dirs: true
backup_if_exists: true
overwrite_if_exists: false
post_install_verify: test -s docs/governance/MASTER-LOSSLESS-HANDOFF-website-session-e6a23fff-2026-09-25.md
rollback_command: rm -f docs/governance/MASTER-LOSSLESS-HANDOFF-website-session-e6a23fff-2026-09-25.md
rationale: CC-to-CC handoff for a website session; lives with sibling governance/handoff docs.
-->

# Master Lossless Handoff — website session (e6a23fff)

**Read this first.** You are picking up a website-focused Claude Code session. This file is the full, faithful record of what the prior session (`e6a23fff`, forked from `a41a19e2`) did on 25/09/2026, what is done, what is blocked, and exactly where to start. Every state claim here was read from disk this turn — re-verify before acting (EVIDENCE RULE).

## 0. Session identity
- from session: `e6a23fff-746f-494f-8e7b-4870f58f369d` (register name "new zas website", category Website, priority 35), fork of `a41a19e2-0c89-45f1-8c01-e14beceb4129`.
- cwd: `/Users/cb/Developer/new-zas-website` · reopen: `claude -r e6a23fff-746f-494f-8e7b-4870f58f369d`
- repo: branch `seo/organic-growth-infra`, HEAD `ae20228`, **0 ahead / 0 behind** origin, **80 uncommitted/untracked paths**.
- toolchain: Node **v26.9.0**, npm 11.19.1; Python3 gates present. CI: `claude-quality.yml`, `deploy.yml`, `robots guard.yml`, `seo-pr-gates.yml`, `seo-weekly-audit.yml`.

## 1. WHAT WAS BUILT this session (durable, verified)
Three tracks ran. Only the first is website-scoped; the other two are system-hardening that happened in the same terminal — listed for full visibility, but they are NOT your website workstream.

### A. WEBSITE — Cloud/Local routing audit (discovery pass, COMPLETE)
- File: `/Users/cb/Developer/new-zas-website/docs/governance/CLOUD-LOCAL-ROUTING-AUDIT-new-zas-website-2026-09-25.md`
- Read-only discovery under the `hybrid-cloud-local-dev-routing` skill. Nothing in the repo was modified/committed/pushed/deployed.
- Findings: cloud-fit work = lint/typecheck/`next build`/`seo:audit:*` on pushed code; **hard blocker = the 80 uncommitted files** (local tree ≠ GitHub tip); reproducibility gaps = no `engines`/`.nvmrc` (local Node 26), undocumented python deps, space-containing script paths (`tools/robots/robots preflight.py`); local-only = MCP servers, Ollama, private GSC/GA4 exports, all deploy/secrets/DNS.
- **Its named next action was NOT executed** (see §3.1).

### B. SYSTEM — reserved-skill-name permanent fix (COMPLETE, not website)
- Archived stale `~/.claude/skills/claude-ai` stub + 3 nested strays → `~/.claude/_archive/20260925T052932Z/reserved-skill-names/` (REVERT.txt inside).
- Built `/Users/cb/bin/za-skill-reserved-name-check.sh` (--check/--repair/--test, 4/4 controls) + LaunchAgent `com.zasupport.skillReservedNameCheck` (daily 06:45).

### C. SYSTEM — cycle-3 credit-dispatch guard verification (PARTIAL, not website)
- User applied the approved `PreToolUse` line to `~/.claude/settings.json` (SHA now `9997dee3…`, guard @ line 289, 10 entries, minimal diff verified).
- **Verdict PARTIAL / inert:** the guard greps for `"PERPLEXITY_PAID_DISPATCH"` but JSON-escaping of real Bash payloads makes it NOMATCH; matcher is `Bash` only while real paid dispatch is `mcp__perplexity__*` → `REAL_DISPATCH_UNPROTECTED`. Fix belongs in `za-credit-gate`/dispatch code, not settings. Evidence: `~/.claude/verification/verifier-report-e6a23fff-746f-494f-8e7b-4870f58f369d.md`; handoff `~/Desktop/Claude/Perplexity-Handoffs/2026-09/PERPLEXITY-HANDOFF-coding_session-cycle-3-credit-dispatch-guard-installed-verified-20260925T084641Z.json`.

## 2. WHAT IS MISSING / BLOCKED (website)
1. **80 uncommitted/untracked paths not triaged** — the single biggest website blocker. GitHub tip does not reflect local reality, so any cloud CC work would build on a stale tree. (docs/governance, docs/operating-system, .claude/fixtures, etc.)
2. **Repro pins missing** — no `engines`/`.nvmrc`; python deps undocumented; space-containing `tools/robots/*` script paths.
3. **4 Render services DOWN** (za-health-check-v11, za-db, za-redis, unifi-headless-scraper) — §726 says **migrate to M1 / free public GitHub Actions, do NOT pay/renew**. Not this session's task; flagged.
4. **Blog/SEO advisor gaps** — 4 gaps routed to `/Users/cb/Developer/new-zas-website/docs/seo/advisor-gap-inbox.md` (advisory only; §522/§753). GSC page export FRESH (~21h); GSC query export STALE (~92h); ranking-tools liveness STALE.
5. No website page/content/schema/SEO code was changed this session — the website itself is untouched.

## 3. NEXT STEPS (do these, in order)
### 3.1 START HERE — triage the 80 uncommitted paths (read-only, safe)
Classify each into **push-safe repo artefact / local-only-transient / needs-Courtney-decision**, written to `docs/governance/`. No `git add`, no commit, no push. This is the gate that unblocks all cloud routing and changes nothing. (This is the routing audit's own "exact next executable bounded action".)
### 3.2 Then reproducibility pins (needs a small local change + Courtney ok to commit)
Add `engines` + `.nvmrc` (pin Node), document python deps, quote/rename the space-containing `tools/robots/*` paths — so `npm ci` + `npm run check:seo` run identically in cloud.
### 3.3 Only after 3.1–3.2: cloud-fit work on a `cloud/TASK-*` branch (lint/typecheck/build/SEO audits).
### 3.4 Website content/SEO: consult the §522 advisor + cite the live §641 ranking snapshot before any web/blog code; blog topic ideas go ONLY to the pool via `za-blog-topic-pool.py --add-file` (§751).

## 4. HARD CONSTRAINTS the recipient must honour
- §641: never assert GSC/ranking state from memory — read the live preflight each turn.
- §180 deploy gate: `deploy.sh`, never raw `git push` to main; never work on `main` directly.
- §294: website form/booking notification emails route to `mary@zasupport.com`.
- §547 no em/en-dashes in committed src content; §287-T pricing/turnaround clause via `PricingNote`.
- Editing `~/.claude/settings.json` is blocked for the agent by the harness ([Self-Modification]) — that is Courtney's action.

## 5. EVIDENCE POINTERS (cheapest → richest)
- This file (start here).
- Routing audit: `docs/governance/CLOUD-LOCAL-ROUTING-AUDIT-new-zas-website-2026-09-25.md`.
- Verifier reports: `~/.claude/verification/verifier-report-{a41a19e2…,e6a23fff…}.md`.
- Full transcript: `/Users/cb/.claude/projects/-Users-cb-Developer-new-zas-website/e6a23fff-746f-494f-8e7b-4870f58f369d.jsonl` (read in chunks, never cat whole).

## 6. Top-line
Website workstream this session = **discovery only** (routing audit produced; repo untouched). The recipient's first real action is the read-only 80-file triage (§3.1). Everything else is gated on it.
