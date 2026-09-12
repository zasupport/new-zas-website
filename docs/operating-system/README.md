# Operating System (governance registers)

The change-attribution and capability spine for the ZA Support organic-growth programme.
Established from the Website Audit Master Handoff (12 September 2026), which mandates a
delta-audit and enhancement approach, not a greenfield rebuild.

## Canonical sources of truth (do not duplicate here)

- **Facts / approved claims:** `seo/config/facts-register.json` (machine SoT), mirrored for
  humans at `docs/seo/FACTS-REGISTER.md`. Validated by `tests/seo/facts-register.test.ts`.
- **SEO policy:** `seo/config/seo-policy.json`.
- **SEO decisions log:** `docs/seo/DECISIONS.md` (append-only).
- **Current baseline:** `docs/seo/BASELINE-CURRENT.md`.
- **Remediation queue:** `docs/seo/REVIEW-QUEUE.md`.

This directory holds only what those files do not: the project charter, the ideal-state target,
the live capability register, and the append-only ledgers that link a code change to a business
outcome.

## Files here

| File | Purpose | Shape |
|---|---|---|
| `PROJECT-CHARTER.md` | Scope, boundaries, approval gates, success measure | prose |
| `IDEAL-STATE.md` | The evidence-led end state the programme builds toward | prose |
| `CAPABILITY-REGISTRY.md` | Live status of every tool, connector and data source | table, dated |
| `CHANGE-PERFORMANCE-LEDGER.csv` | commit -> deployment -> route -> outcome | append-only |
| `GBP-PERFORMANCE-LEDGER.csv` | GBP change -> local-search outcome | append-only |
| `SEARCH-CONSOLE-HISTORY.csv` | GSC clicks/impressions/CTR/position over time | append-only |
| `ANALYTICS-CONVERSION-HISTORY.csv` | GA4 sessions -> assessment -> quote -> job | append-only |
| `RELEASE-TO-OUTCOME-MAP.md` | Narrative linking releases to measured effect | prose |

## Rules that govern this directory

- Append-only ledgers are never rewritten or truncated; a full file rotates aside under a
  timestamp, it is never deleted.
- No capability is called "unavailable" while its status is `UNKNOWN_NOT_CHECKED` (§18 of the
  handoff). Check first, then label.
- No production, GBP, GSC, content, pricing, legal or trust change is applied without explicit
  owner approval. Autonomous scope is read, audit, branch, preview and report only.
- A register that will hold data gets a header row now; a document gets real content or it is not
  created. Empty stubs manufacture false completeness and are banned.
