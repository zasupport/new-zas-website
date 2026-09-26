# Design-template conformance rule

V1.2.1 · 26/09/2026 · enforced by `scripts/audit-design-template.py`

README for Claude Code and Claude.ai: run `python3 scripts/audit-design-template.py --test` then `npm run check:design` from the repo root. The report names the rule and the file carrying the defect. Fix the shared component it names, never page content. For T6 palette defects run `python3 scripts/audit-design-template.py --fix <file>`.

## Reference templates

| Role | Route | Source |
|---|---|---|
| Primary | `/` | `src/app/page.tsx` |
| Secondary (sub-page) | `/macbook-not-turning-on` | `src/app/macbook-not-turning-on/page.tsx` |

Reference tokens: page `#0A1A18`, alt surface `#111C1A`, heading `#E8F4F1`, body `#B9D2CB` / `#7A9E98`, accent `#0FEA7A`, card `bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] rounded-xl|2xl`, card hover `border-[rgba(15,234,122,0.25)] bg-[rgba(15,234,122,0.04)]`, hero `hero-gradient grid-overlay pt-24 sm:pt-32`, primary button `bg-[#0FEA7A] text-[#0A1A18] shadow-lg shadow-[#0FEA7A]/20`, icons from lucide-react.

## Rules

| Rule | Fails when | Status |
|---|---|---|
| T1 plain-link-list | An underlined text link is rendered as a list or grid item with no bordered card surface | Fail |
| T2 no-card-surface | No bordered rounded card (or `glass-card`) anywhere in the route's rendered tree | Fail |
| T4 no-icons | No lucide-react icon import in the route's rendered tree | Fail |
| T5 no-accent-pill | No brand accent pill | Advisory only (visual check showed on-brand pages without one) |
| T6 off-brand-palette | `bg-white`, slate/gray/zinc surfaces or dark text, flat `bg-[#27504D]` hero, `text-[#1B6B4A]` | Fail |

A former hero-gradient rule (T3) was removed after a visual check showed on-brand pages built with a different hero class.

Exempt: redirect stubs, `index: false` internal pages, `/privacy`, `/terms`, `/editorial-policy`, `/api`, `/studio`.

## No duplicated effort

`scripts/.design-template-ledger.json` (gitignored, local cache) stores, per route, the sha256 of the route's full resolved source set and the rules version. Unchanged routes reuse their stored verdict. Editing a shared component re-scans only the routes that render it. A rules-version bump forces one full re-scan. CI has no ledger and scans everything.

## Enforcement

`deploy.sh` step 3.8, `.github/workflows/deploy.yml` (`npm run check:design`), and `npm run check:design` locally. Fail-closed.

## Evidence, 26/09/2026

Run against production commit `8bba0a6` before the fix: 316 routes scanned. T1 hit `RepairGrowthSection.tsx` (32 routes), `RepairInformationPage.tsx` (13 routes) and `/suspected-hacked-apple-device`. T6 hit 6 pages (iMac hub + 3 sub-pages, Mac mini, guides), `/suspected-hacked-apple-device` and `AuthorBox.tsx` (every blog post: author name rendered `text-zinc-900` on the dark page, not visible).

After the fix: 319 routes, 307 pass, 0 fail, 12 exempt. Second run: 0 scanned, 307 reused from the ledger.

## Lesson

A page generator that emits its own markup instead of importing the reference card and section patterns drifts from the brand. New page generators must reuse `RepairGrowthSection` / the reference card classes, and `npm run check:design` must pass before a page ships.
