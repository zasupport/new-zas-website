# Phase Report — A: repository & production truth

## Evidence collected
- Live crawl of the 16 mandated URLs on 2026-09-01 (`seo/scripts/crawl-site.mjs` → `seo/reports/crawl-2026-09-01.json`), plus direct `curl` on homepage claims, robots.txt, sitemap.xml, www host.
- Tools: Node 26 crawler, curl. Limitation: best-effort regex HTML parse; not a full DOM.

## Findings
- **Confirmed facts:** Next.js App Router + Vercel + Sanity; apex canonical `https://zasupport.com`; HEAD `da20026`. All 16 priority URLs return 200. robots.txt correct (disallows /api /admin /studio, AI allowlist, sitemap present). No self-serving AggregateRating JSON-LD.
- **Risks/gaps:** search P0 (`/api/search` HTTP 500, CSE); www serves 200 (no 301); sitemap 838 URLs all one build-time `lastmod`; meta keywords sitewide; title≠og on 13 pages + doubled suffix on 10; conflicting review figures (645 + 632); homepage FAQ "assessment fee included in the total" contradicts approved policy.
- **Contradictions resolved:** "Authorised Service Provider" ×4 is the correct *negation* ("not an AASP") — compliant, not a violation; the claims detector excludes it.

## Changes proposed/applied
- Applied: `docs/seo/BASELINE-CURRENT.md` (evidence report). **No production change.**
- Proposed (later phases, approval-gated): see REVIEW-QUEUE.md.

## Verification
- `node seo/scripts/crawl-site.mjs` → 16/16 URLs recorded.
- Homepage claim scan, robots.txt, sitemap lastmod distinct-count, www HEAD — all captured with real output.

## Owner decisions required
- REVIEW-QUEUE #1–#10.

## Rollback
- Baseline is additive documentation; `git checkout -- docs/seo/BASELINE-CURRENT.md` to remove.

## Next safe action
- Phase B facts register (done) → Phase C search fix on-branch with tests (done).
