# FACTS-REGISTER (human mirror)

**Machine SoT:** `seo/config/facts-register.json` (validated by `tests/seo/facts-register.test.ts`).
Do **not** change an approved value without owner approval (Handoff §4). This file mirrors the JSON
for readers; if they disagree, the JSON wins and the test will fail.

| ID | Class | Approved value | Status | Prohibited variants |
|---|---|---|---|---|
| FR-001 | trust | **Established in 2009** | approved | 16 years, 16 Years Experience, 16 Years Apple Experience, years of experience |
| FR-002 | trust | **50,000+ repairs completed** | approved | (never merge with 25,000 / 17,000) |
| FR-003 | trust | **25,000 repair operations** | approved | (never merge) |
| FR-004 | trust | **17,000 board-level repairs** | approved | (never merge) |
| FR-005 | trust | Google rating/count from **GBP, single source** | pending value | 645, 632+, 120 reviews (no hard-coded figures) |
| FR-006 | commercial | Assessment fee iPhone/iPad/Watch **R599 excl VAT** | approved | — |
| FR-007 | commercial | Assessment fee all computers **R899 excl VAT** | approved | — |
| FR-008 | commercial | Fee is **separate, non-refundable, non-creditable, not included** | approved | "included in the total", "deducted", "free assessment", "no fix no fee" |
| FR-009 | legal | Apple Original Parts / authorised resale; **independent specialist, not an AASP** | pending legal | positive "Apple Authorised Service Provider" claim (outside the negation) |
| FR-010 | trust | **Courtney Bentley, CEO & Apple Certified Expert** | approved | David Bentley |

## Metric presentation (FR-002/003/004)
The three repair metrics are **separate measures**, never merged and never presented so as to
invite comparison. Each needs a short explanatory label. Recommended block:

```
50,000+ repairs completed
25,000 repair operations
17,000 board-level repairs
```

## Assessment-fee canonical wording (FR-006/007/008)
Use the approved long/short/FAQ/booking-checkbox/quotation wording from the handoff §4.5 verbatim.
The legacy homepage FAQ "the assessment fee is included in the total" **contradicts** FR-008 and
must be removed/replaced everywhere (REVIEW-QUEUE #3).
