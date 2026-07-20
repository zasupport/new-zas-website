#!/usr/bin/env python3
"""
§402 BLOG-INDEX ORPHAN GATE — fail-closed. Every slug in sitemap.ts MUST be linked from the
blog index (src/app/blog/page.tsx), or Google cannot discover it by crawling.

WHY THIS EXISTS (real data, 20/07/2026):
  Three sources of truth had silently drifted apart:
      src/app/blog/[slug]/page.tsx  (content)  = 698 slugs
      src/app/sitemap.ts            (submitted)= 538 slugs
      src/app/blog/page.tsx         (index)    = 511 slugs
  538 - 511 = 27 ORPHANS: pages advertised to Google in the sitemap that NOTHING links to.
  A reachability detector had already found them and written them to a status file dated the
  same morning -- and nothing blocked, so they sat there. Detecting into a file is not a
  control. This gate BLOCKS the deploy instead.

  It also confirmed the sitemap itself is sound: sitemap \\ content = 0, sitemap subset of
  content = True. So the only defect is the hand-maintained index array falling behind.

INVARIANT ENFORCED:  set(sitemap /blog/ slugs)  -  set(index slugs)  ==  empty

Modes:
  --check   (default) exit 0 clean | 1 orphans found | 2 UNKNOWN (cannot read -> never pass)
  --list    print the orphan slugs, one per line (for the fixer)
  --test    POSITIVE / NEGATIVE / ABSENCE / MUTATION controls. exit 2 on failure so a daily
            runner COUNTS it (rc=1 would be downgraded to an uncounted WARN).

NOT enforced here (deliberate, stated so nobody assumes coverage):
  * content \\ sitemap is NOT flagged. 152 of those are correct §529 doorway 301s. Adding them
    back would resurrect exactly what Google penalises.
  * This gate proves LINK STRUCTURE only. Actual (re)indexing is Google's decision over days
    or weeks -- passing this gate does NOT mean a page is indexed.
"""
import re, sys, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITEMAP = os.path.join(ROOT, "src", "app", "sitemap.ts")
INDEX = os.path.join(ROOT, "src", "app", "blog", "page.tsx")


def _read(path):
    """Return file text, or None if unreadable. None is the BLIND signal (§704) -- the caller
    must turn it into UNKNOWN/exit 2, never into 'no orphans found'."""
    try:
        with open(path, encoding="utf-8") as fh:
            return fh.read()
    except Exception:
        return None


def sitemap_slugs(text):
    return set(re.findall(r"/blog/([a-z0-9-]+)", text))


def index_slugs(text):
    """Accept BOTH quote styles. The file is hand-written with single quotes, but generated
    rows use double quotes (json.dumps emits valid TS that way). A single-quote-only regex
    silently could not SEE 27 correctly-added rows and reported them as orphans forever --
    a false positive that would have got this gate deleted. Caught 20/07 by running the
    fixer and the gate back to back."""
    return set(re.findall(r"""slug:\s*['"]([a-z0-9-]+)['"]""", text))


def find_orphans(sitemap_text, index_text):
    """Return (orphans, reason). reason is None on success, or a string when BLIND."""
    if sitemap_text is None:
        return None, "sitemap.ts unreadable"
    if index_text is None:
        return None, "blog/page.tsx unreadable"
    sm = sitemap_slugs(sitemap_text)
    ix = index_slugs(index_text)
    # A parse yielding zero slugs means the FORMAT changed, not that the site is empty.
    # Treating that as "clean" is the classic pass-while-blind failure.
    if not sm:
        return None, "sitemap.ts parsed to 0 blog slugs (format drift)"
    if not ix:
        return None, "blog/page.tsx parsed to 0 slugs (format drift)"
    return sm - ix, None


def cmd_check(list_only=False):
    orphans, reason = find_orphans(_read(SITEMAP), _read(INDEX))
    if orphans is None:
        print(f"UNKNOWN [§402 orphan gate] — {reason}. Failing CLOSED: blind is never a pass.")
        return 2
    if list_only:
        for s in sorted(orphans):
            print(s)
        return 0 if not orphans else 1
    if orphans:
        print(f"FAIL [§402] — {len(orphans)} sitemap URL(s) are ORPHANS (in sitemap.ts, linked "
              f"from nothing). Google cannot discover them by crawling:")
        for s in sorted(orphans)[:30]:
            print(f"  /blog/{s}")
        if len(orphans) > 30:
            print(f"  ... and {len(orphans) - 30} more")
        print("  Fix: add them to the posts array in src/app/blog/page.tsx "
              "(scripts/fix-blog-index-orphans.py does this from the content store).")
        return 1
    print("PASS [§402] — every sitemap blog URL is linked from the index (0 orphans).")
    return 0


def _test():
    rc = 0

    def chk(name, cond):
        nonlocal rc
        print(("  PASS " if cond else "  FAIL ") + name)
        if not cond:
            rc = 1

    # POSITIVE — a sitemap slug missing from the index MUST be reported. Uses the real shapes.
    sm = "url: `${base}/blog/alpha`,\nurl: `${base}/blog/beta`,"
    ix = "{ slug: 'alpha', title: 'A' },"
    orph, reason = find_orphans(sm, ix)
    chk("POSITIVE: sitemap slug absent from index is flagged", reason is None and orph == {"beta"})

    # NEGATIVE — full coverage must be SILENT. A gate that fires on a correct state gets removed.
    ix_full = "{ slug: 'alpha' }, { slug: 'beta' },"
    orph, reason = find_orphans(sm, ix_full)
    chk("NEGATIVE: fully-linked sitemap yields no orphans", reason is None and orph == set())

    # NEGATIVE 2 — extra index entries not in the sitemap are NOT this gate's business.
    orph, reason = find_orphans(sm, ix_full + "{ slug: 'gamma' },")
    chk("NEGATIVE: index-only slug is not flagged (not an orphan)", reason is None and orph == set())

    # NEGATIVE 3 — DOUBLE-QUOTED index rows must be seen. This is the variant the first
    # version of this gate was blind to: generated rows use json.dumps (double quotes), so a
    # single-quote-only regex reported 27 correctly-linked pages as orphans.
    orph, reason = find_orphans(sm, '{ slug: "alpha" }, { slug: "beta" },')
    chk("NEGATIVE: double-quoted index rows are recognised", reason is None and orph == set())

    # ABSENCE — unreadable / empty / format-drift must be UNKNOWN, never 'clean'. (§704)
    for label, a, b in (("unreadable sitemap", None, ix_full),
                        ("unreadable index", sm, None),
                        ("sitemap parses to 0", "no slugs here", ix_full),
                        ("index parses to 0", sm, "no slugs here")):
        orph, reason = find_orphans(a, b)
        chk(f"ABSENCE: {label} -> UNKNOWN not clean", orph is None and reason is not None)

    # MUTATION — break the invariant (difference in the wrong direction) and POSITIVE must die.
    def mutated(sitemap_text, index_text):
        return index_slugs(index_text) - sitemap_slugs(sitemap_text), None
    orph, _ = mutated(sm, ix)
    chk("MUTATION: reversing the set difference breaks the positive case", orph != {"beta"})

    # PRODUCTION-VISIBILITY — the gate must SEE the real repo, not just fixtures (§722/§541).
    real_sm, real_ix = _read(SITEMAP), _read(INDEX)
    seen_sm = len(sitemap_slugs(real_sm)) if real_sm else 0
    seen_ix = len(index_slugs(real_ix)) if real_ix else 0
    chk(f"PRODUCTION-VISIBILITY: real files parsed ({seen_sm} sitemap / {seen_ix} index slugs)",
        seen_sm > 100 and seen_ix > 100)

    print("RESULT:", "ALL PASS" if rc == 0 else "FAILURES")
    return 2 if rc else 0   # >=2 so a daily runner counts a real failure


if __name__ == "__main__":
    arg = sys.argv[1] if len(sys.argv) > 1 else "--check"
    if arg == "--test":
        sys.exit(_test())
    if arg == "--list":
        sys.exit(cmd_check(list_only=True))
    if arg == "--check":
        sys.exit(cmd_check())
    print(__doc__)
    sys.exit(2)
