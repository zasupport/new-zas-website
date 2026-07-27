# SEO / Infra Hardening — 4 HIGH findings, fix permanently TODAY

Source: the robots-index-guard `analyse` run, 27/07/2026 09:16 SAST.
Full machine-readable findings: `tools/robots/state/infrastructure findings.json`
(4 HIGH, 8 MEDIUM, 3 LOW — this brief covers the 4 HIGH; triage the MEDIUM/LOW after).

You OWN fixing all four permanently. "Permanent" (§244/§354/§627) = for each finding:
ROOT fix at the single source of truth + ENFORCEMENT wired so it CANNOT silently
regress (CI step / gate, not prose) + a real-data TEST with a negative control +
LIVE verification after deploy (§346/§394, not exit-0).

## Standing rules for this work
- **Web/blog gate (§522/§641):** consult `advisor()` BEFORE crystallising any change,
  and cite the live ranking snapshot. Never assert GSC state from memory.
- **Deploy discipline (§180):** ship via `bash deploy.sh`, never raw `git push`.
  NOTE: local node was just upgraded 25→26 and `npm ci` blocked sharp/esbuild install
  scripts — run `npm run build` standalone FIRST to confirm the toolchain builds; if it
  fails, that's a toolchain issue to fix/surface, not force through. The suspended
  `api.zasupport.com` will make deploy.sh's health/E2E tail false-fail — don't chase that
  (§726), confirm the push landed + Vercel built instead.
- **Approval gate (§190/§283/§381):** commit each fix locally; get Courtney's explicit
  "deploy" before the production push. No irreversible prod change without it.
- **noindex, NOT disallow:** to de-index a page, use `metadata.robots={index:false}` or an
  `X-Robots-Tag` header — keep it crawlable. A robots.txt disallow would stop Google
  reading the noindex (the exact WNC-20237597 class). Do not add robots.txt disallows.
- **/_next/ stays crawlable** — never disallow it (existing invariant).

## The four HIGH findings

### 1. `/seo-report` and `/search` are indexable with no noindex
`src/app/seo-report/page.tsx` and `src/app/search/page.tsx` are crawlable + not in the
sitemap + carry no noindex, so Google can index internal pages.
FIX: add `export const metadata = { robots: { index: false, follow: true } }` (or an
X-Robots-Tag header rule in `vercel.json`/`middleware.ts` for those paths). Verify the
rendered `<meta name="robots">` / header is live after deploy. Check for OTHER internal
routes with the same exposure while you're in there.

### 2. Enforcement scripts exist but are not wired into CI
`scripts/check-robots-next-static.py` and the sitemap-reconcile script are referenced in
prose/comments as "enforced" but are invoked by nothing (absent from `package.json`
scripts and `.github/workflows/robots guard.yml`).
FIX: add them as failing steps in the CI workflow AND as `npm run` scripts, so the
`/_next/` crawlability + sitemap invariants are enforced in CI. Prove each gate FAILS on
an injected violation (negative control) before trusting it (§704/§705).

### 3. `next.config.ts` suppresses TypeScript build errors
`ignoreBuildErrors: true` ships type errors to production silently; no `tsc` step is
visible anywhere.
FIX: add `"typecheck": "tsc --noEmit"` to `package.json` and a CI step that runs it.
Then assess removing `ignoreBuildErrors` — run tsc first; if the repo is clean, remove
the suppression; if not, fix the errors or record why it must stay (don't blindly flip
it and break the build). deploy.sh should run typecheck as a gate.

### 4. `sitemap.ts` has drifted from live routes
`src/app/sitemap.ts` is a hand-maintained static list; live `page.tsx` routes are missing
from it (undiscoverable by crawl).
FIX: build a route↔sitemap diff (enumerate `src/app/**/page.tsx` real routes vs
`sitemap.ts` vs `next.config.ts` redirects), add the genuinely-missing indexable routes,
and wire the diff into CI as a failing check so drift is caught at commit, not in GSC.
Respect existing 301/308 redirects and §523/§529 doorway prunes — a redirected/pruned
slug must NOT be re-added.

## Definition of done (§661)
All four dispositioned: each with a committed root fix, a wired+negative-control-tested
CI gate, and — once Courtney approves the deploy — live verification. Produce a short
completion report (what changed, the gate that now enforces it, the live proof). Then
triage the 8 MEDIUM / 3 LOW findings and surface them, do not silently drop them (§384).
