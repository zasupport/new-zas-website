#!/usr/bin/env python3
"""check-route-sitemap-drift.py - ROUTE<->SITEMAP DRIFT GATE (HARD, F6 SEO-hardening 27/07/2026)

Kills the "live but undiscoverable" failure class for STATIC app routes (the sibling of the
blog-only check-blog-sitemap-reconcile.py). A static route (src/app/**/page.tsx with no dynamic
[..] segment) is an ORPHAN if it is indexable but Google cannot discover it: not in
src/app/sitemap.ts, not the SOURCE of a redirect (next.config.ts / vercel.json), not internally
`redirect()`-ing, and not noindex. An orphan = live HTTP 200 absent from the sitemap.

ORPHAN-DIRECTION ONLY (advisor §704): we do NOT assert "every sitemap URL has a page" because
dynamic routes (author/[slug], answers/[cluster], blog/[slug]) legitimately serve sitemap URLs
with no static page.tsx. Going bidirectional would false-flag them; orphan-only avoids that.

A route is LEGITIMATELY excluded from the sitemap (NOT an orphan) when it is:
  - noindex           metadata.robots.index === false  (e.g. /search, /seo-report)
  - an internal 308   the page component calls redirect() from next/navigation (stub)
  - a redirect source listed in next.config.ts redirects() or vercel.json redirects

ROOT CAUSE it fixes: sitemap.ts is a hand-maintained static list (CLAUDE.md §346) that drifts as
pages are added. This gate makes an indexable-but-unlisted route unshippable.

Modes:
  (default)  scan real repo; exit 1 (fail-closed) listing any orphan
  --test     §244/§584/§704 controls: orphan MUST fail; clean MUST pass; noindex/redirect stubs
             absent from sitemap MUST pass (no false-fail); missing inputs MUST fail-closed
"""

import os
import re
import sys
import tempfile
import shutil

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def _page_source(dirpath):
    for fn in ("page.tsx", "page.ts"):
        p = os.path.join(dirpath, fn)
        if os.path.isfile(p):
            return open(p, encoding="utf-8").read()
    return None


def _is_noindex(src):
    # metadata.robots = { ... index: false ... }
    return bool(re.search(r"robots\s*:\s*\{[^}]*index\s*:\s*false", src or "", re.DOTALL))


def _is_internal_redirect(src):
    return bool(re.search(r"\bredirect\(", src or "")) and "next/navigation" in (src or "")


def enumerate_routes(app_dir):
    """Map static (non-dynamic) URL -> (noindex, internal_redirect). None if app_dir missing."""
    if not os.path.isdir(app_dir):
        return None
    routes = {}
    for dp, _dirs, files in os.walk(app_dir):
        if not ({"page.tsx", "page.ts"} & set(files)):
            continue
        rel = os.path.relpath(dp, app_dir)
        segs = [] if rel == "." else rel.split(os.sep)
        if any(s.startswith("_") for s in segs):  # private folder, not a route
            continue
        if any("[" in s for s in segs):  # dynamic route, handled elsewhere
            continue
        url_segs = [s for s in segs if not (s.startswith("(") and s.endswith(")"))]  # route groups
        url = "/" + "/".join(url_segs) if url_segs else "/"
        src = _page_source(dp)
        routes[url] = (_is_noindex(src), _is_internal_redirect(src))
    return routes


def sitemap_urls(sitemap_path):
    if not os.path.isfile(sitemap_path):
        return None
    t = open(sitemap_path, encoding="utf-8").read()
    urls = set(re.findall(r"\$\{base\}(/[^`]*)`", t))
    if re.search(r"url:\s*base\b", t):
        urls.add("/")
    return urls


def redirect_sources(config_path, vercel_path):
    src = set()
    if os.path.isfile(config_path):
        src |= set(re.findall(r"source:\s*'([^']+)'", open(config_path, encoding="utf-8").read()))
    if os.path.isfile(vercel_path):
        src |= set(re.findall(r'"source":\s*"([^"]+)"', open(vercel_path, encoding="utf-8").read()))
    return src


def find_orphans(app_dir, sitemap_path, config_path, vercel_path):
    """Return (orphans_list, error_or_None). error => fail-closed."""
    routes = enumerate_routes(app_dir)
    if routes is None:
        return [], f"app dir not found: {app_dir}"
    sm = sitemap_urls(sitemap_path)
    if sm is None:
        return [], f"sitemap not found: {sitemap_path}"
    red = redirect_sources(config_path, vercel_path)
    orphans = []
    for url, (noindex, internal_redirect) in sorted(routes.items()):
        if url in sm or url in red or noindex or internal_redirect:
            continue
        orphans.append(url)
    return orphans, None


def scan():
    orphans, err = find_orphans(
        os.path.join(ROOT, "src/app"),
        os.path.join(ROOT, "src/app/sitemap.ts"),
        os.path.join(ROOT, "next.config.ts"),
        os.path.join(ROOT, "vercel.json"),
    )
    if err:
        print(f"FAIL (fail-closed): {err}", file=sys.stderr)
        return 1
    if orphans:
        print(
            f"FAIL F6: {len(orphans)} ORPHAN static route(s) — indexable, live, but NOT in "
            f"sitemap.ts and not redirected:",
            file=sys.stderr,
        )
        for o in orphans:
            print(
                f"  - {o}   (add to src/app/sitemap.ts, OR noindex it, OR redirect it)",
                file=sys.stderr,
            )
        return 1
    print(
        "OK F6: 0 orphan static routes (every indexable route is in the sitemap or "
        "legitimately excluded via noindex/redirect)"
    )
    return 0


def test():
    rc = 0
    td = tempfile.mkdtemp()
    app = os.path.join(td, "app")

    def mkpage(route, body):
        d = os.path.join(app, *route.strip("/").split("/")) if route != "/" else app
        os.makedirs(d, exist_ok=True)
        open(os.path.join(d, "page.tsx"), "w").write(body)

    INDEXABLE = "export const metadata = { title: 'x' };\nexport default function P(){return null;}"
    NOINDEX = "export const metadata = { robots: { index: false, follow: true } };\nexport default function P(){return null;}"
    REDIR = "import { redirect } from 'next/navigation';\nexport default function P(){ redirect('/hub'); }"

    mkpage("/", INDEXABLE)
    mkpage("/listed", INDEXABLE)  # indexable + in sitemap  -> ok
    mkpage("/noindexed", NOINDEX)  # noindex, absent from sitemap -> MUST pass
    mkpage("/stub", REDIR)  # redirect(), absent from sitemap -> MUST pass
    mkpage("/redir-src", INDEXABLE)  # indexable but a redirect source -> ok

    sm = os.path.join(td, "sitemap.ts")
    open(sm, "w").write("const base='x';\nurl: base\n`${base}/listed`,\n")
    cfg = os.path.join(td, "next.config.ts")
    open(cfg, "w").write("source: '/redir-src',\n")
    vj = os.path.join(td, "vercel.json")
    open(vj, "w").write("{}")

    # POSITIVE (clean): no orphans
    orph, err = find_orphans(app, sm, cfg, vj)
    if err is None and orph == []:
        print(
            "  PASS positive: clean tree (noindex + redirect stub + redirect-source all excluded) -> 0 orphans"
        )
    else:
        print(f"  FAIL positive: err={err} orphans={orph}")
        rc = 1

    # NEGATIVE control: inject a real orphan (indexable, not listed, not redirected)
    mkpage("/orphan-xyz", INDEXABLE)
    orph, _ = find_orphans(app, sm, cfg, vj)
    if orph == ["/orphan-xyz"]:
        print("  PASS neg-control: orphan provably CAUGHT (gate can fail)")
    else:
        print(f"  FAIL neg-control: expected ['/orphan-xyz'], got {orph}")
        rc = 1

    # NEGATIVE control 2 (no false-fail): the noindex + stub pages must NEVER be flagged
    if "/noindexed" not in orph and "/stub" not in orph:
        print("  PASS no-false-fail: noindex page + redirect stub NOT flagged as orphans")
    else:
        print(f"  FAIL no-false-fail: noindex/stub wrongly flagged: {orph}")
        rc = 1

    # §704 ABSENCE control: missing sitemap => fail-closed (error, never a silent PASS)
    _, err = find_orphans(app, os.path.join(td, "nope-sitemap.ts"), cfg, vj)
    if err:
        print("  PASS absence-control: missing sitemap -> fail-closed (not a silent pass)")
    else:
        print("  FAIL absence-control: missing sitemap did NOT fail-closed")
        rc = 1

    # §704 ABSENCE control 2: missing app dir => fail-closed
    _, err = find_orphans(os.path.join(td, "nope-app"), sm, cfg, vj)
    if err:
        print("  PASS absence-control-2: missing app dir -> fail-closed")
    else:
        print("  FAIL absence-control-2: missing app dir did NOT fail-closed")
        rc = 1

    shutil.rmtree(td)
    print("TEST: ALL PASS" if rc == 0 else "TEST: FAIL")
    return rc


if __name__ == "__main__":
    sys.exit(test() if "--test" in sys.argv else scan())
