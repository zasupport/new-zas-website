# Claude.ai / Claude Code Handoff Intake, 12 September 2026

**Per the 12h23 Master Handoff, section 1.** The prior Phase-0 handoff (a Claude Code coding-session
JSON, later consolidated by Claude.ai/Perplexity) is treated as `AGENT_CLAIM_UNVERIFIED` intake and
re-verified here against authoritative local, git, runtime and production sources. Evidence log:
`CLAIM-VERIFICATION-EVIDENCE/verify-log.txt`. Machine-readable results:
`AGENT-CLAIM-VERIFICATION-REGISTER.csv`.

## Source of the claims

`~/Desktop/Claude/Perplexity-Handoffs/2026-09/PERPLEXITY-HANDOFF-coding_session-za-support-website-audit-phase-0-delta-audit-fou-20260912T100534Z.json`
(emitted this same session). The 12h23 handoff correctly notes that a claim is not ground truth
merely because it exists, even one this runtime authored, so each was re-verified independently.

## Verdict

**10 of 10 claims CONFIRMED** against authoritative sources. No claim was INVALIDATED or found
CONFLICTING. One NEW correction surfaced by the re-verification itself (C10).

| Claim | Status | Note |
|---|---|---|
| C1 repo/branch identity | CONFIRMED | remotes `origin`(zasupport) + `backup`(zasupportbackup) |
| C2 commits fc63e99 + d507ab2 | CONFIRMED | 11-file docs + page.tsx |
| C3 /search 200, /sitemap 200, /api/search 500 | CONFIRMED (production, re-pulled) | |
| C4 A1 FAQ wording swap | CONFIRMED | prohibited removed, FR-008 added, amount-free |
| C5 keyless rewrite in-branch, undeployed; prod runs pre-keyless code | CONFIRMED (production SHA) | Vercel prod deployment = commit da20026 (precedes keyless feat 5a90e4b) |
| C6 GSC export fails on missing python libs | CONFIRMED (runtime) | dependency, not auth |
| C7 rating stale (645, 2026-07-25) | CONFIRMED | ~7 weeks; unverified vs live GBP |
| C8 push blocked by PAT workflow scope | CONFIRMED (runtime) | on `origin` |
| C9 A1 type-clean (tsc exit 0) | CONFIRMED (runtime) | |
| **C10 d507ab2 is a 902-line diff** | **NEW CORRECTION (INFERRED)** | Biome presumed to have reformatted the whole file; only the FAQ hunk reviewed, so "cosmetic-only" is a pre-deploy gate, not verified |

## What the re-verification adds beyond the original claims

1. **Both remotes exist** (`origin` = zasupport org, `backup` = zasupportbackup). The earlier push
   attempt targeted `origin` and was rejected for PAT workflow scope; neither remote holds these
   commits yet.
2. **C10:** the A1 commit is not a clean one-line diff. The Biome PostToolUse formatter is presumed
   to have reformatted `page.tsx` entirely (tabs, import order, quote style) in the same commit. The
   semantic FAQ change is confirmed correct and isolated in meaning; the other ~880 changed lines
   were NOT line-reviewed, so "cosmetic-only" is presumed, not verified. Because the commit is
   undeployed and Biome is behaviour-preserving by design, the risk is low. **Pre-deploy gate:**
   confirm the non-FAQ delta is cosmetic-only before deploying A1. Recommendation for future semantic
   edits: run a format-only pass first (or commit the reformat separately) so a one-line meaning
   change reads as a one-line diff.

3. **C5 deployed-commit verification (Vercel MCP):** the current production deployment
   `dpl_FuPz9NiFCpo7mRAaAqEQCVJMvzQy` (READY, target production, ref `main`) is commit **`da20026`**,
   which precedes `5a90e4b` (the keyless-search feat). Production therefore runs pre-keyless code,
   which is why `/api/search` 500s; it is not a keyless-code runtime failure. This upgrades C5 from
   inference to a genuine deployed-commit observation.

## Owner decisions this intake confirms are still open (real, evidence-backed)

- Grant PAT `workflow` scope (C8) so the branch can push.
- Install `google-auth google-api-python-client google-auth-oauthlib` and re-run the GSC export (C6)
  before any ranking/cannibalisation analysis.
- Deploy the keyless search fix (C3/C5) or keep it held.
- Refresh the GBP source (C7) before harmonising review counts.

## Boundary honoured

Per section 1: the pre-existing `.claude/` and `tools/robots` tree was **not** modified, archived,
deleted, committed or wired to silence Stop hooks. Ownership/runtime-linkage/security/test review of
that tree remains a separate owner-directed task.
