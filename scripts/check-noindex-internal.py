#!/usr/bin/env python3
"""check-noindex-internal.py - INTERNAL-PAGE NOINDEX LOCK (HARD, F1/F2 SEO-hardening 27/07/2026)

Internal utility routes must stay out of Google's index. /seo-report (internal SEO tracker) and
/search (parameterised search results, infinite-space) must carry metadata.robots.index === false.
This gate FAILS if either page loses its noindex.

WHY a dedicated gate (not just the drift gate): check-route-sitemap-drift.py flags an indexable
route missing from the sitemap. If someone deletes the noindex from /seo-report, the drift gate
would push toward the WRONG fix (add it to the sitemap = publish an internal page). This lock
asserts the RIGHT posture directly: these routes stay noindex, never sitemapped.

noindex, NOT robots.txt disallow (brief + GSC WNC-20237597): a disallow stops Google reading the
noindex. Keep the routes crawlable; the <meta name="robots"> / X-Robots-Tag does the de-indexing.

Modes:
  (default)  scan real repo; exit 1 (fail-closed) if any listed page lacks index:false
  --test     §244/§584/§704 controls: page without noindex MUST fail; with noindex MUST pass;
             missing file MUST fail-closed
"""

import os
import re
import sys
import tempfile
import shutil

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Internal routes that MUST remain noindex, keyed by their page.tsx path (relative to repo root).
INTERNAL_PAGES = {
    "/seo-report": "src/app/seo-report/page.tsx",
    "/search": "src/app/search/page.tsx",
}


def has_noindex(source):
    return bool(re.search(r"robots\s*:\s*\{[^}]*index\s*:\s*false", source or "", re.DOTALL))


def check(pages):
    """pages: {route: abspath}. Returns (ok, errors)."""
    errs = []
    for route, path in sorted(pages.items()):
        if not os.path.isfile(path):
            errs.append(f"{route}: page.tsx MISSING at {path} (fail-closed)")
            continue
        if not has_noindex(open(path, encoding="utf-8").read()):
            errs.append(
                f"{route}: no `robots: {{ index: false }}` — internal page would be indexable"
            )
    return (len(errs) == 0), errs


def scan():
    pages = {r: os.path.join(ROOT, p) for r, p in INTERNAL_PAGES.items()}
    ok, errs = check(pages)
    if not ok:
        print("FAIL: internal-page noindex lock violated:", file=sys.stderr)
        for e in errs:
            print(f"  - {e}", file=sys.stderr)
        print(
            "Fix: add `robots: { index: false, follow: true }` to the page's metadata.",
            file=sys.stderr,
        )
        return 1
    print(f"OK: {len(pages)} internal page(s) noindexed ({', '.join(sorted(INTERNAL_PAGES))})")
    return 0


def test():
    rc = 0
    td = tempfile.mkdtemp()
    good = os.path.join(td, "good.tsx")
    bad = os.path.join(td, "bad.tsx")
    open(good, "w").write("export const metadata = { robots: { index: false, follow: true } };")
    open(bad, "w").write("export const metadata = { title: 'Search' };")

    # POSITIVE: page with noindex -> pass
    ok, _ = check({"/good": good})
    print(
        "  PASS positive: noindex page accepted" if ok else "  FAIL positive: noindex page rejected"
    )
    rc |= 0 if ok else 1

    # NEGATIVE control: page WITHOUT noindex -> MUST fail
    ok, errs = check({"/bad": bad})
    if not ok:
        print(f"  PASS neg-control: missing noindex CAUGHT -> {errs}")
    else:
        print("  FAIL neg-control: missing noindex NOT caught (gate has zero power)")
        rc = 1

    # §704 ABSENCE control: missing file -> fail-closed
    ok, _ = check({"/gone": os.path.join(td, "does-not-exist.tsx")})
    if not ok:
        print("  PASS absence-control: missing page.tsx -> fail-closed")
    else:
        print("  FAIL absence-control: missing file did NOT fail-closed")
        rc = 1

    shutil.rmtree(td)
    print("TEST: ALL PASS" if rc == 0 else "TEST: FAIL")
    return rc


if __name__ == "__main__":
    sys.exit(test() if "--test" in sys.argv else scan())
