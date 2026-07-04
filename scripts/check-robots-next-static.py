#!/usr/bin/env python3
"""
ROBOTS RENDER-RESOURCE GATE (HARD) — GSC WNC-20237597, 04/07/2026.

robots.txt MUST keep Next.js render resources crawlable. Googlebot fetches
/_next/static/ (JS + CSS) and /_next/image/ to render pages. Blocking them
produces "Indexed, though blocked by robots.txt" warnings on chunk URLs and
risks under-rendering real pages. [Google-confirmed: never block resources
needed for rendering.]

Chokepoint: src/app/robots.ts  ->  the `disallow` array.
This gate FAILS if any disallow entry would block /_next/static/ or
/_next/image/ (i.e. an entry that is a path-prefix of those paths, such as
'/_next/', '/_next', '/_next/static', or '/').

Usage:
  check-robots-next-static.py            scan src/app/robots.ts, exit 1 on violation
  check-robots-next-static.py --test     run built-in positive + negative controls
"""
import os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ROBOTS_TS = os.path.join(ROOT, 'src', 'app', 'robots.ts')

# Paths that MUST remain crawlable (Googlebot render resources).
PROTECTED = ['/_next/static/', '/_next/image/']


def _extract_disallow(source: str):
    """Return the list of string literals in the `disallow` array of robots.ts."""
    m = re.search(r'disallow\s*=\s*\[(.*?)\]', source, re.DOTALL)
    if not m:
        return None  # signal: could not locate the array (fail closed)
    return re.findall(r"""['"`]([^'"`]*)['"`]""", m.group(1))


def _blocks_protected(disallow):
    """A disallow entry blocks a protected path if it is a prefix of it
    (robots.txt Disallow is a left-anchored prefix match)."""
    hits = []
    for rule in disallow:
        rule = rule.strip()
        if not rule:
            continue
        for prot in PROTECTED:
            if prot.startswith(rule):
                hits.append((rule, prot))
    return hits


def check(source: str):
    disallow = _extract_disallow(source)
    if disallow is None:
        return False, ["could not locate `disallow = [...]` array in robots.ts (fail-closed)"]
    hits = _blocks_protected(disallow)
    if hits:
        return False, [f"Disallow '{r}' blocks render resource {p}" for r, p in hits]
    return True, []


def run_tests():
    ok = True

    # POSITIVE control: current correct posture must PASS.
    good = "const disallow = ['/api/', '/admin/', '/studio/'];"
    passed, errs = check(good)
    if not passed:
        ok = False
        print(f"  FAIL positive-control (correct robots should pass): {errs}")
    else:
        print("  PASS positive-control: /api /admin /studio only -> crawlable /_next/static/")

    # NEGATIVE control: the exact bug must FAIL.
    bad = "const disallow = ['/api/', '/admin/', '/studio/', '/_next/'];"
    passed, errs = check(bad)
    if passed:
        ok = False
        print("  FAIL negative-control: Disallow /_next/ was NOT caught (gate has zero power)")
    else:
        print(f"  PASS negative-control: Disallow /_next/ correctly caught -> {errs}")

    # NEGATIVE control 2: narrower but still blocking /_next/static.
    bad2 = "const disallow = ['/_next/static'];"
    passed, _ = check(bad2)
    if passed:
        ok = False
        print("  FAIL negative-control-2: Disallow /_next/static was NOT caught")
    else:
        print("  PASS negative-control-2: Disallow /_next/static correctly caught")

    # NEGATIVE control 3: blocking /_next/data/ ONLY must PASS (that's allowed).
    edge = "const disallow = ['/api/', '/_next/data/'];"
    passed, errs = check(edge)
    if not passed:
        ok = False
        print(f"  FAIL edge: /_next/data/ block should be allowed (not a render resource): {errs}")
    else:
        print("  PASS edge: /_next/data/ block allowed (JSON data, not a render resource)")

    print("SELFTEST", "PASS" if ok else "FAIL")
    return ok


def main():
    if '--test' in sys.argv:
        sys.exit(0 if run_tests() else 1)
    with open(ROBOTS_TS, encoding='utf-8') as f:
        source = f.read()
    passed, errs = check(source)
    if not passed:
        print("ERROR: robots render-resource gate FAILED (GSC WNC-20237597):")
        for e in errs:
            print(f"  - {e}")
        print("Fix: remove the /_next/ prefix from the disallow array in src/app/robots.ts")
        sys.exit(1)
    print("OK: robots.ts keeps /_next/static/ and /_next/image/ crawlable")
    sys.exit(0)


if __name__ == '__main__':
    main()
