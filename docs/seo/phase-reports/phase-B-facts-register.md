# Phase Report — B: facts register & protected claims

## Evidence collected
- Handoff §4 approved wording; live homepage claim scan (2026-09-01).

## Findings
- Live conflicts: FR-001 "16 Years" ×10; FR-005 review figures 645+632 simultaneously; FR-008 "assessment fee included in the total" ×2.
- FR-009 (AASP) + Apple resale wording remain pending legal verification.

## Changes proposed/applied
- Applied: `seo/config/facts-register.json` (machine SoT, 10 seed claims), `seo/config/facts-register.schema.json`, `docs/seo/FACTS-REGISTER.md` (human mirror), `seo/scripts/audit-claims.mjs` (warning mode now; `--block` for post-reconciliation CI), `tests/seo/facts-register.test.ts`.
- Not applied: any live content correction (approval-gated).

## Verification
- `node --test tests/seo/facts-register.test.ts` — positive (clean fixture 0 conflicts), negative (dirty fixture flags FR-001/005/008/009), FR-009 negation not a false positive, absence controls: **all pass**.
- `audit-claims.mjs --file claims-clean.html --block` → exit 0; `--file claims-dirty.html --block` → exit 2.
- Live homepage warning-mode scan detects FR-001 + FR-005 conflicts.

## Owner decisions required
- REVIEW-QUEUE #3, #4, #5, #6 (claim corrections + legal wording + the FR-005 value).

## Rollback
- `git checkout -- seo/config/facts-register.json docs/seo/FACTS-REGISTER.md`.

## Next safe action
- Reconcile legacy content, then flip `audit-claims` to `--block` in CI.
