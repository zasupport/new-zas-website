# Documentation — Verification First, Action Second

**This README is for Claude Code, not for human readers.** A human can scan it, but its primary purpose is to instruct Claude Code on how to verify everything in `blog-leak-prevention.md` against ground truth before acting on it.

---

## WHY THIS README EXISTS

Every claim in `blog-leak-prevention.md` was made by a Claude session that:

- Could see the contents of `perfect-blog/` in its sandbox
- Could run HTTP requests against `zasupport.com`
- **Could not** see the actual live Sanity schema
- **Could not** see GitHub repo secrets or workflow registrations
- **Could not** see Vercel environment variables or deployed routes
- **Could not** see git commit history beyond what was discussed in chat

This means every observation in the prevention doc falls into one of three categories:

1. **Directly verified by Claude at the time** — e.g. file exists in the package, sitemap has 94 URLs, scanner detects 28 affected slugs
2. **Inferred from Claude's reasoning** — e.g. "the schema does not import the auto-fixer", "GitHub Actions are not registered", "Vercel env vars are not set"
3. **Plausibly stale** — observations from 16 April 2026 that may not match the state on 21 May 2026 or later

Category 2 and 3 claims **must be re-verified against the actual machine and the actual production site** before Claude Code takes action on them. The verification script does this systematically.

The cost of trusting a stale observation is real: if Claude Code follows the prevention doc's instruction to wire layer 2 when layer 2 was wired three weeks ago, it overwrites working production configuration with old code.

---

## SESSION-START PROTOCOL

When Claude Code opens a session in this repo, the first action sequence is:

```bash
# 1. Verify every observation in blog-leak-prevention.md against ground truth
bash perfect-blog/scripts/verify-observations.sh
```

The script writes a JSON report to `/tmp/verify-observations-<timestamp>.json` and a human-readable summary to stdout. Each of the ~15 claims in the prevention doc is classified as **CONFIRMED**, **REFUTED**, **PARTIAL**, or **UNVERIFIABLE**.

### Interpreting the output

After the script completes:

| Result | Meaning | Claude Code action |
|---|---|---|
| All CONFIRMED, 0 REFUTED | Doc matches reality. Defences still need wiring. | Proceed with the wiring tasks in section 7 of the prevention doc. |
| Some REFUTED | Doc is out of date. Reality has moved on since the doc was written. | Amend the prevention doc to reflect actual state before doing any wiring. Do not blindly apply doc instructions. |
| Many UNVERIFIABLE | The local environment lacks tooling. | Install `gh`, `vercel` CLI, link the local repo to the Vercel project. Then re-run. |
| All REFUTED | Defences are fully deployed. The 28 posts may already be fixed. | Run a fresh `node perfect-blog/scripts/scan-site-health.js --mode full` to confirm clean state. If clean, the work is complete; archive the prevention doc with `[RESOLVED]` prefix. |

---

## WHAT THE SCRIPT CHECKS

Six sections of verification, ~15 specific claims:

### Section A — Filesystem claims (8 checks)

Does each file the doc references actually exist on disk?

- `perfect-blog/sanity/leak-auto-fixer.ts`
- `perfect-blog/config/banned-content-patterns.js`
- `perfect-blog/scripts/scan-site-health.js`
- `perfect-blog/.github/workflows/auto-heal.yml`
- `perfect-blog/app/api/webhooks/sanity/route.ts`
- `perfect-blog/app/api/health/defences/route.ts`
- `perfect-blog/scripts/pre-build-leak-check.js`
- `perfect-blog/skills/` populated

### Section B — Wiring claims (6 checks)

The most critical section. The doc's core thesis is that defences exist but are not wired. This section tests that thesis against current production state:

- **B.1** — Does the live `blogPost` schema import `leak-auto-fixer`? Searches `sanity/schemas/`, `studio/schemas/`, `schemas/` outside `perfect-blog/`.
- **B.2** — Does `https://zasupport.com/api/webhooks/sanity` return 200 (deployed) or 404 (not deployed)?
- **B.3** — Does `https://zasupport.com/api/health/defences` return 200 (deployed) or 404 (not deployed)?
- **B.4** — Are `auto-heal.yml` and `scheduled-scans.yml` registered as GitHub workflows? Requires `gh auth`.
- **B.5** — Are the 8 required GitHub secrets set? Requires `gh auth`.
- **B.6** — Are the 4 required Vercel env vars set in production? Requires `vercel` CLI.

### Section C — Live site claims (2 checks)

The doc's empirical claims about the production site:

- **C.1** — Does a fresh scan find 28 leaked posts? (Or fewer if some have been fixed, or zero if all clean.)
- **C.2** — Does `sitemap.xml` return ~94 URLs?

### Section D — Incident timeline (2 checks)

The doc claims three incidents on 13/15/16 April 2026. The git history should reflect this:

- **D.1** — Are there commits on each of those three dates?
- **D.2** — Do any commits mention leak/banned/scanner/integrity keywords?

### Section E — Skill propagation (1 check)

The doc claims skills propagate to `/mnt/skills/user/`, `~/.claude/skills/`, and `<repo>/.claude/skills/`. The script checks each.

### Section F — Local environment (2 checks)

- **F.1** — Does `~/.za-keys-pending.env` exist (the MS_GRAPH refresh token holding file)?
- **F.2** — Is `SANITY_WRITE_TOKEN` in the current shell environment?

---

## WHAT TO DO WITH THE JSON REPORT

The script writes `/tmp/verify-observations-<timestamp>.json` with this structure:

```json
{
  "timestamp": "20260521T085500Z",
  "repo_root": "/Users/courtney/Developer/zasupport-website",
  "hostname": "courtneys-mac.local",
  "summary": {
    "total": 15,
    "confirmed": 9,
    "refuted": 2,
    "partial": 1,
    "unverifiable": 3
  },
  "findings": [
    {
      "id": "B.2",
      "status": "REFUTED",
      "description": "Webhook endpoint returns 404 (per prevention doc)",
      "evidence": "Endpoint actually returns HTTP 200 — layer 4 IS deployed"
    },
    ...
  ]
}
```

When Claude Code reads this report:

1. **Refuted claims override doc claims.** If B.2 says the webhook is deployed but the doc says it isn't, the webhook is deployed. Update the doc, don't re-deploy.
2. **Confirmed claims are the source of truth for what still needs doing.** Every confirmed claim about a defence not being wired = a real wiring task.
3. **Unverifiable claims are blockers.** If `gh` is not authenticated, Claude Code cannot tell whether GitHub Actions are wired. The blocker must be cleared before any irreversible action is taken.

---

## PROTOCOL FOR DOC AMENDMENT

If `verify-observations.sh` returns any REFUTED claims, the prevention doc is out of date. Claude Code's responsibility is to amend it, not to apply outdated instructions.

The amendment protocol:

1. Read `docs/blog-leak-prevention.md` end to end.
2. For each REFUTED finding in the JSON report, locate the corresponding claim in the doc.
3. Update the claim with the actual state observed by the script.
4. Add an entry to a new section "13. Verification History" at the bottom of the doc, recording:
   - Verification timestamp
   - What was refuted
   - What the actual state was
   - Whether the doc was amended in response
5. Commit the amended doc.
6. Re-run `verify-observations.sh` — confirm 0 REFUTED after the amendment.
7. Then, and only then, proceed with the remaining CONFIRMED tasks.

---

## ANTI-PATTERNS TO AVOID

These behaviours have caused prior incidents — Claude Code must not repeat them:

### Anti-pattern 1 — Trusting Claude's prior observations

Every claim made by a previous chat session is a hypothesis until verified against current ground truth. The verification script is the source of truth, not the doc.

### Anti-pattern 2 — Skipping the verification step because "it looks obvious"

If a layer is described as "not wired" and the natural next action is to wire it, the script still runs first. The cost of an unnecessary script run is 30 seconds. The cost of overwriting working production with stale code is days of recovery.

### Anti-pattern 3 — Treating UNVERIFIABLE as if it were CONFIRMED

UNVERIFIABLE means the script could not determine the state. It is not permission to assume the state matches the doc. The blocker (missing CLI, missing auth, network failure) must be resolved before action.

### Anti-pattern 4 — Bulk wiring without per-step verification

After each individual wiring operation (e.g. patching the schema, pushing the workflows), re-run the relevant section of the verification script. Confirm the wiring took effect before moving to the next operation. A failed wiring that is not detected becomes the next stale observation.

### Anti-pattern 5 — Documentation as a substitute for verification

Adding a comment "verified on 2026-05-21" in the doc is not verification. Running the script and reading its output is verification. The doc reflects the verification; it doesn't replace it.

---

## ESCALATION

If `verify-observations.sh` returns exit code 2 (more than 3 refuted claims), the prevention doc is significantly out of date and should not be acted on without human review. Surface the JSON report in the chat and ask Courtney to confirm the current state before any wiring operation.

If `verify-observations.sh` returns exit code 1 (fewer than 5 confirmed claims), the verification environment is incomplete. The script needs more access — typically `gh auth login`, `vercel login`, and being run from inside a `git clone` of the live repo rather than a standalone copy.

Exit code 0 means the doc and reality are broadly aligned. Proceed with wiring per the prevention doc's section 7 and 10.

---

## QUICK START FOR CLAUDE CODE

In a single command:

```bash
bash perfect-blog/scripts/verify-observations.sh && \
echo "✓ Verification passed — proceed with section 7 wiring" || \
echo "✗ Doc out of date or environment incomplete — amend before proceeding"
```

This is the first line of every Claude Code session in this repo.

---

## FILES IN THIS DOCUMENTATION FOLDER

| File | Purpose |
|---|---|
| `README.md` | This file — verification-first protocol |
| `blog-leak-prevention.md` | Root cause analysis and seven-layer prevention plan |
| `verify-observations.sh` | The verification script (under `perfect-blog/scripts/`) |

The verification script lives under `perfect-blog/scripts/` because it's part of the defence package. The README and prevention doc live under `docs/` because Claude Code auto-loads files there.

---

*README — Documentation folder protocol*
*Last updated: 21 May 2026*
*Read by: Claude Code at session start*
*Purpose: ensure observations are verified against ground truth before being acted on*
