#!/usr/bin/env python3
"""check-blog-sitemap-reconcile.py - §671 DEPLOY GATE (HARD, 30/06/2026)

Kills the recurring "live but undiscoverable" blog failure class: a post defined in
src/app/blog/[slug]/posts.data.ts must be EITHER in src/app/sitemap.ts (discoverable) OR the
SOURCE of a /blog redirect in next.config.ts (intentionally 301'd, §529) OR listed in the
410-Gone set in src/middleware.ts (intentionally retired, no genuine 301 target). A source slug
in NONE of those = an ORPHAN: absent from the sitemap/redirect/gone inventory. This does not prove
Google cannot discover it through another link or guarantee that a listed URL is indexed.
(the m3/m4 logic-board pages, 30/06). A manual reconcile was done 10/06 and RECURRED because
no gate held it (§404). This gate makes an orphan unshippable.

ROOT CAUSE it fixes: generation adds a slug to posts.data.ts but the sitemap insert is skipped (§346).

Modes:
  (default)  scan real repo files; exit 1 (fail-closed) if any orphan, listing them
  --test     §244/§584 negative control: synthetic orphan MUST fail, clean fixture MUST pass
"""

import re
import sys
import os
import tempfile
from blog_post_inventory import InventoryError, post_slugs

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# The posts object was refactored out of [slug]/page.tsx into this clean data module
# (page.tsx now does `import { posts } from './posts.data'` and holds only JSX). The gate
# must read the real source of truth, not the stale JSX page. (repointed 05/10/2026)
PAGE = os.path.join(ROOT, "src/app/blog/[slug]/posts.data.ts")
SITEMAP = os.path.join(ROOT, "src/app/sitemap.ts")
CONFIG = os.path.join(ROOT, "next.config.ts")
GONE = os.path.join(ROOT, "src/middleware.ts")  # 410-Gone set for retired posts


def src_slugs(page_path):
    t = open(page_path, encoding="utf-8").read()
    return post_slugs(t)


def gone_slugs(gone_path):
    """Blog slugs intentionally retired via a 410 in middleware (not orphans)."""
    if not gone_path or not os.path.isfile(gone_path):
        return set()
    t = open(gone_path, encoding="utf-8").read()
    # Any /blog/<slug> hardcoded in middleware is route-level removal/handling.
    return set(re.findall(r"/blog/([a-z0-9][a-z0-9-]+)", t))


def sitemap_slugs(sitemap_path):
    t = open(sitemap_path, encoding="utf-8").read()
    return set(re.findall(r"/blog/([a-z0-9][a-z0-9-]+)`", t))


def redirect_source_slugs(config_path):
    t = open(config_path, encoding="utf-8").read()
    # only the SOURCE of a redirect counts as "handled" (it is being 301'd away)
    return set(re.findall(r"source:\s*['\"]/blog/([a-z0-9][a-z0-9-]+)['\"]", t))


def orphans(page_path, sitemap_path, config_path, gone_path=None):
    src = src_slugs(page_path)
    handled = (
        sitemap_slugs(sitemap_path) | redirect_source_slugs(config_path) | gone_slugs(gone_path)
    )
    return sorted(src - handled)


def scan():
    for f in (PAGE, SITEMAP, CONFIG, GONE):
        if not os.path.isfile(f):
            print(f"FAIL: missing {f}", file=sys.stderr)
            return 1
    try:
        orph = orphans(PAGE, SITEMAP, CONFIG, GONE)
    except (OSError, InventoryError) as exc:
        print(f"FAIL (inventory unavailable; fail-closed): {exc}", file=sys.stderr)
        return 2
    if orph:
        print(
            f"FAIL §671: {len(orph)} ORPHAN blog slug(s) — in posts.data.ts but NOT in sitemap.ts and NOT 301'd:",
            file=sys.stderr,
        )
        for s in orph:
            print(
                f"  - {s}   (decide: add to sitemap.ts OR 301 in next.config.ts per §529)",
                file=sys.stderr,
            )
        return 1
    print(
        f"OK §671: 0 orphans ({len(src_slugs(PAGE))} source slugs all in sitemap, redirected, or 410-gone)"
    )
    return 0


def test():
    rc = 0
    td = tempfile.mkdtemp()
    page = os.path.join(td, "page.tsx")
    sm = os.path.join(td, "sitemap.ts")
    cfg = os.path.join(td, "config.ts")
    # POSITIVE: every source slug handled (one in sitemap, one redirected) -> 0 orphans
    open(page, "w").write("export const posts = {\n  'alpha-post': {},\n  'beta-post': {},\n};\n")
    open(sm, "w").write("`${base}/blog/alpha-post`,\n")
    open(cfg, "w").write("{ source: '/blog/beta-post', destination: '/hub', permanent: true },\n")
    if orphans(page, sm, cfg) == []:
        print("  PASS positive: clean fixture -> 0 orphans")
    else:
        print(f"  FAIL positive: {orphans(page, sm, cfg)}")
        rc = 1
    # NEGATIVE CONTROL: inject a synthetic orphan (in page, neither sitemap nor redirect) -> MUST be caught
    open(page, "w").write(
        "export const posts = {\n  'alpha-post': {},\n  'beta-post': {},\n  'orphan-slug-xyz': {},\n};\n"
    )
    got = orphans(page, sm, cfg)
    if got == ["orphan-slug-xyz"]:
        print("  PASS neg-control: orphan provably CAUGHT (gate can fail)")
    else:
        print(f"  FAIL neg-control: expected ['orphan-slug-xyz'], got {got}")
        rc = 1
    # 410-GONE CONTROL: a slug retired in middleware is HANDLED, not an orphan;
    # and without that gone source it MUST still be caught (proves the gate did not go blind).
    gonef = os.path.join(td, "middleware.ts")
    open(page, "w").write("export const posts = {\n  'alpha-post': {},\n  'gone-post': {},\n};\n")
    open(sm, "w").write("`${base}/blog/alpha-post`,\n")
    open(cfg, "w").write("")
    open(gonef, "w").write("const AIRPODS_GONE = new Set(['/blog/gone-post']);")
    if orphans(page, sm, cfg, gonef) == []:
        print("  PASS 410-gone: middleware-retired slug treated as handled")
    else:
        print(f"  FAIL 410-gone: {orphans(page, sm, cfg, gonef)}")
        rc = 1
    if orphans(page, sm, cfg, None) == ["gone-post"]:
        print("  PASS 410-gone neg: slug NOT in the gone list still orphans")
    else:
        print(f"  FAIL 410-gone neg: expected ['gone-post'], got {orphans(page, sm, cfg, None)}")
        rc = 1
    controls = [
        (
            "zero-indent",
            "const posts = {\n'alpha-post':{},\n\"beta-post\":{}\n};",
            {"alpha-post", "beta-post"},
        ),
        (
            "tabs-and-double-quotes",
            'const posts = {\n\t"alpha-post":{},\n\t"beta-post":{}\n};',
            {"alpha-post", "beta-post"},
        ),
        (
            "same-line-and-identifier",
            "const posts={alpha:{},'beta-post':{}};",
            {"alpha", "beta-post"},
        ),
        (
            "typed-record-semicolons",
            "const posts: Record<string, { slug: string; title: string; }> = {'alpha-post':{}};",
            {"alpha-post"},
        ),
        (
            "comments-and-nested-decoys",
            """// const posts = {'fake':{}};
const posts: Record<string, { content: string }> = {
/* 'comment-fake': {} */ 'alpha-post': {
content: `literal } 'fake-content': { and ${`nested ${1}`} end`,
nested: {'nested-fake': {}}, other: "escaped \\"quote\\" }",
}, "beta-post": {} };
const unrelated = {'not-a-post': {}};""",
            {"alpha-post", "beta-post"},
        ),
        ("missing-store", "const other={'alpha-post':{}};", None),
        ("empty-store", "const posts={};", None),
        ("truncated-store", "const posts={'alpha-post':{", None),
        ("unterminated-string", "const posts={'alpha-post':{content:`bad", None),
        ("duplicate-key", "const posts={'alpha-post':{},'alpha-post':{}};", None),
        ("spread", "const posts={...other};", None),
        ("computed-key", "const posts={['alpha-post']:{}};", None),
        ("bad-separator", "const posts={'alpha-post':{} 'beta-post':{}};", None),
    ]
    for label, source, expected in controls:
        try:
            got = post_slugs(source)
        except InventoryError:
            got = None
        ok = got == expected
        print(f"  {'PASS' if ok else 'FAIL'} parser-control: {label}")
        if not ok:
            rc = 1
    # The exact historical indentation/quote failure must raise an orphan.
    open(page, "w").write('const posts={"alpha-post":{},\n"hidden-orphan":{},\n};')
    got = orphans(page, sm, cfg)
    ok = got == ["hidden-orphan"]
    print(f"  {'PASS' if ok else 'FAIL'} regression: unindented double-quoted orphan")
    if not ok:
        rc = 1
    import shutil

    shutil.rmtree(td)
    print("TEST: ALL PASS" if rc == 0 else "TEST: FAIL")
    return rc


if __name__ == "__main__":
    sys.exit(test() if "--test" in sys.argv else scan())
