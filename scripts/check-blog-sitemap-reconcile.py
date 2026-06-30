#!/usr/bin/env python3
"""check-blog-sitemap-reconcile.py - §671 DEPLOY GATE (HARD, 30/06/2026)

Kills the recurring "live but undiscoverable" blog failure class: a post defined in
src/app/blog/[slug]/page.tsx must be EITHER in src/app/sitemap.ts (discoverable) OR the
SOURCE of a /blog redirect in next.config.ts (intentionally 301'd, §529). A source slug in
NEITHER = an ORPHAN: live HTTP 200 but absent from the sitemap, so Google never crawls it
(the m3/m4 logic-board pages, 30/06). A manual reconcile was done 10/06 and RECURRED because
no gate held it (§404). This gate makes an orphan unshippable.

ROOT CAUSE it fixes: generation adds a slug to page.tsx but the sitemap insert is skipped (§346).

Modes:
  (default)  scan real repo files; exit 1 (fail-closed) if any orphan, listing them
  --test     §244/§584 negative control: synthetic orphan MUST fail, clean fixture MUST pass
"""
import re, sys, os, tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGE = os.path.join(ROOT, "src/app/blog/[slug]/page.tsx")
SITEMAP = os.path.join(ROOT, "src/app/sitemap.ts")
CONFIG = os.path.join(ROOT, "next.config.ts")

def src_slugs(page_path):
    t = open(page_path, encoding="utf-8").read()
    # Record keys: two-space indent, single-quoted slug, colon
    return set(re.findall(r"^  '([a-z0-9][a-z0-9-]+)':", t, re.M))

def sitemap_slugs(sitemap_path):
    t = open(sitemap_path, encoding="utf-8").read()
    return set(re.findall(r"/blog/([a-z0-9][a-z0-9-]+)`", t))

def redirect_source_slugs(config_path):
    t = open(config_path, encoding="utf-8").read()
    # only the SOURCE of a redirect counts as "handled" (it is being 301'd away)
    return set(re.findall(r"source:\s*['\"]/blog/([a-z0-9][a-z0-9-]+)['\"]", t))

def orphans(page_path, sitemap_path, config_path):
    src = src_slugs(page_path)
    handled = sitemap_slugs(sitemap_path) | redirect_source_slugs(config_path)
    return sorted(src - handled)

def scan():
    for f in (PAGE, SITEMAP, CONFIG):
        if not os.path.isfile(f):
            print(f"FAIL: missing {f}", file=sys.stderr); return 1
    orph = orphans(PAGE, SITEMAP, CONFIG)
    if orph:
        print(f"FAIL §671: {len(orph)} ORPHAN blog slug(s) — in page.tsx but NOT in sitemap.ts and NOT 301'd:", file=sys.stderr)
        for s in orph:
            print(f"  - {s}   (decide: add to sitemap.ts OR 301 in next.config.ts per §529)", file=sys.stderr)
        return 1
    print(f"OK §671: 0 orphans ({len(src_slugs(PAGE))} source slugs all in sitemap or redirected)")
    return 0

def test():
    rc = 0
    td = tempfile.mkdtemp()
    page = os.path.join(td, "page.tsx"); sm = os.path.join(td, "sitemap.ts"); cfg = os.path.join(td, "config.ts")
    # POSITIVE: every source slug handled (one in sitemap, one redirected) -> 0 orphans
    open(page, "w").write("export const posts = {\n  'alpha-post': {\n  'beta-post': {\n}\n")
    open(sm, "w").write("`${base}/blog/alpha-post`,\n")
    open(cfg, "w").write("{ source: '/blog/beta-post', destination: '/hub', permanent: true },\n")
    if orphans(page, sm, cfg) == []:
        print("  PASS positive: clean fixture -> 0 orphans")
    else:
        print(f"  FAIL positive: {orphans(page,sm,cfg)}"); rc = 1
    # NEGATIVE CONTROL: inject a synthetic orphan (in page, neither sitemap nor redirect) -> MUST be caught
    open(page, "w").write("export const posts = {\n  'alpha-post': {\n  'beta-post': {\n  'orphan-slug-xyz': {\n}\n")
    got = orphans(page, sm, cfg)
    if got == ["orphan-slug-xyz"]:
        print("  PASS neg-control: orphan provably CAUGHT (gate can fail)")
    else:
        print(f"  FAIL neg-control: expected ['orphan-slug-xyz'], got {got}"); rc = 1
    import shutil; shutil.rmtree(td)
    print("TEST: ALL PASS" if rc == 0 else "TEST: FAIL")
    return rc

if __name__ == "__main__":
    sys.exit(test() if "--test" in sys.argv else scan())
