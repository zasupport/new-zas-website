# Release-to-Outcome Map

Narrative companion to `CHANGE-PERFORMANCE-LEDGER.csv`. Each material release is linked from the
code change through to the measured business effect, so a decision to keep, revise or roll back
rests on evidence, not intent. Append-only.

## The link chain (handoff §10)

```
git commit / PR  ->  Vercel deployment  ->  affected routes / templates  ->  (GBP change)
  ->  GSC clicks / impressions / CTR / position
  ->  GBP search / maps impressions / calls / directions / website clicks
  ->  GA4 events / landing pages  ->  assessment starts -> submissions -> quote approvals
  ->  completed jobs -> gross margin
  ->  keep / revise / rollback decision  ->  reusable lesson
```

Measurement windows: baseline before change, then 28 / 56 / 90 days after (handoff §8.2, §17).
Confounders (seasonality, GBP change, algorithm update, paid or offline activity) are recorded so a
movement is not misattributed.

## Releases

_None recorded yet. The first entry will be logged when a Phase-0 change is approved, merged and
deployed. Until then the ledger header stands ready and the baseline is captured in
`docs/seo/BASELINE-CURRENT.md`._

### Pending / undeployed (tracked, not yet released)

| Item | State | Evidence | Gate |
|---|---|---|---|
| Keyless onsite search (`/api/search` + static index) | Built + tested on `seo/organic-growth-infra`, **not deployed**; production still 500s on old CSE proxy | `docs/seo/DECISIONS.md` 2026-09-01; live `curl /api/search` -> 500 | Deploy approval (§180/§190) |
| www -> apex one-hop 301 | Draft only | `audit-canonicals.mjs`; `DECISIONS.md` | Approval-gated |
| Meta-keywords removal (83 files) | Staged | `DECISIONS.md`; `audit-rendered-pages.mjs` | Staged multi-file PR |
| Assessment-fee + trust-claim wording reconciliation | Worklist drafted | `docs/seo/WORDING-REMEDIATION-WORKLIST.md` | Approval-gated + pricing-restore dependency |
