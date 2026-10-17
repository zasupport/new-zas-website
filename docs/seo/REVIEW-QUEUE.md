# REVIEW-QUEUE — owner decisions required

Every item is **approval-gated** (Handoff §2.3). Nothing below has been applied to
production. Each has a drafted or proposed remediation ready on branch
`seo/organic-growth-infra`.

| # | Decision | Evidence (live 2026-09-01) | Options | Recommendation | Risk |
|--:|---|---|---|---|---|
| 1 | Search architecture sign-off | `/api/search` returns HTTP 500 (Google CSE "invalid argument") | (a) keyless build-time JSON index [built], (b) Pagefind, (c) keep CSE + valid key | **(a)** — no external key, deterministic, CI-tested | Low; on-branch, reversible |
| 2 | www → apex one-hop 301 | `www.zasupport.com/` serves HTTP 200, canonical=apex, no 301 | 301 redirect vs leave as canonical-tag only | Add narrowly-scoped 301, preview-verify | Med; redirect policy, needs rollback plan |
| 3 | Homepage FAQ "assessment fee included in the total" | present ×2 on `/` | Replace with approved FR-008 wording | Replace everywhere it appears | Med; trust/commercial claim |
| 4 | Single Google-review source + value | `645` ×39 **and** `632` ×2 on `/` simultaneously | One GBP-sourced value; suppress on stale | Wire one source; never hard-code | Med; trust claim |
| 5 | "Established in 2009" vs "16 Years" | `16 Year(s)` ×10 on `/` | Replace calculated-duration with fixed year | Replace all "16 years" variants | Low; editorial |
| 6 | Apple Original Parts / authorised-resale wording | FR-009 pending legal | Confirm exact permitted terminology | Legal/contract verification before publish | High; legal |
| 7 | Meta keywords removal | present sitewide (83 source files) | Remove in a staged PR | Remove; no ranking value | Low but wide; stage the edit |
| 8 | Sitemap `lastmod` integrity | all 838 URLs share one build-time `lastmod` | Truthful per-URL lastmod or omit | Omit or derive from real content mtime | Low |
| 9 | Sitemap membership / doorway matrix | 838 hardcoded URLs incl service×suburb/model | Route-family audit before any change | Audit, do not expand; stage prune | Med; do not bulk-redirect |
| 10 | Title template: doubled "\| ZA Support" | 10 pages | Fix title template | Fix template; document title/OG policy | Low |

## Notes
- Items 3, 4, 5 are content/claim changes — draft the copy, do not publish (Handoff §2.3).
- Item 2 must ship with a preview verification and an exact revert command.
- Item 9: **never** bulk redirect/noindex location/model pages; dry-run inventory first (Handoff §7.3).
