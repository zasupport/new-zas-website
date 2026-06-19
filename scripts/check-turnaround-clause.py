#!/usr/bin/env python3
"""
§287-T TURNAROUND / LEAD-TIME CLAUSE GATE (HARD).

Every device-repair page that displays a price or a turnaround/lead-time
MUST render the machine-dependent processing/lead-time clause (the red
PricingNote box with repair=true, the default).

Managed-services / contract pages MUST NOT carry the device-repair clause
(they render PricingNote with repair={false}).

The clause text lives in ONE chokepoint: src/components/PricingNote.tsx.

Usage:
  check-turnaround-clause.py            scan live tree, exit 1 on any violation
  check-turnaround-clause.py --test     run built-in negative controls
"""
import os, re, sys, glob

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
APP = os.path.join(ROOT, 'src', 'app')
COMPONENT = os.path.join(ROOT, 'src', 'components', 'PricingNote.tsx')

CLAUSE_MARKER = 'you enquire and speak to a ZA Support consultant'

# Pages that legitimately never carry the clause.
EXCLUDE_RE = re.compile(
    r'/app/(about|contact|search|terms|privacy|editorial-policy|book|sitemap)\b'
    r'|/app/author/'
    r'|/app/blog/page\.tsx$'
    r'|/app/guides/page\.tsx$'
    r'|/app/blog/\[slug\]/'
)

# Contract / managed-services routes: must NOT carry the device-repair clause.
CONTRACT_RE = re.compile(
    r'/app/(managed-services|enterprise|sme-support|government|medical-it|apple-support|business)\b'
)

META_BLOCK_RE = re.compile(r'export const metadata[^=]*=\s*\{.*?\n\};', re.DOTALL)
REDIRECT_RE = re.compile(r'\bredirect\(')

PRICE_RE = re.compile(r'(?:From|from)\s+R\s?\d|R\s?\d{3,}')
LEADTIME_RE = re.compile(r'\b\d{1,3}\s*-\s*\d{1,3}\s*(?:hours?|hrs?|min|mins|minutes|days?|business days?)\b'
                         r'|[Tt]urnaround'
                         r'|[Ll]ead[\s-]?time')


def body_of(src: str) -> str:
    """Strip the metadata export so price/lead-time in meta descriptions
    do not trigger the gate; only RENDERED content counts."""
    return META_BLOCK_RE.sub('', src)


def has_clause_render(src: str) -> bool:
    """PricingNote present and NOT opted out of the repair clause."""
    for m in re.finditer(r'<PricingNote\b([^>]*)/?>', src):
        attrs = m.group(1)
        if 'repair={false}' not in attrs:
            return True
    return False


def has_optout(src: str) -> bool:
    return bool(re.search(r'<PricingNote\b[^>]*repair=\{false\}', src))


def check_component() -> list:
    if not os.path.exists(COMPONENT):
        return [f"{COMPONENT}: MISSING component"]
    if CLAUSE_MARKER not in open(COMPONENT).read():
        return [f"{COMPONENT}: clause marker text removed from chokepoint"]
    return []


def scan() -> list:
    violations = list(check_component())
    for f in glob.glob(os.path.join(APP, '**', 'page.tsx'), recursive=True):
        rel = f.replace(ROOT, '')
        src = open(f).read()
        if REDIRECT_RE.search(src) and 'return' not in src.split('redirect')[0][-40:]:
            # pure redirect stub
            if '<' not in body_of(src):
                continue
        body = body_of(src)
        has_signal = bool(PRICE_RE.search(body) or LEADTIME_RE.search(body))

        if CONTRACT_RE.search(f):
            # contract page: if it uses PricingNote it must opt out
            if '<PricingNote' in src and not has_optout(src):
                violations.append(f"{rel}: CONTRACT page must use <PricingNote repair={{false}} /> (device-repair clause is wrong here)")
            continue

        if EXCLUDE_RE.search(f):
            continue

        if has_signal and not has_clause_render(src):
            violations.append(f"{rel}: shows price/turnaround but no machine-dependent lead-time clause (add <PricingNote />)")
    return violations


def run_tests() -> int:
    """Negative controls — the gate MUST flag these."""
    import tempfile, textwrap
    cases = [
        ("device page, turnaround, NO clause -> FAIL",
         'export const metadata = {\n  title: "x",\n};\nexport default function P(){return (<div><p>Turnaround 2-4 hours</p></div>);}',
         False),
        ("device page, From R price, NO clause -> FAIL",
         'export default function P(){return (<div><p>From R1,499</p></div>);}',
         False),
        ("device page WITH clause render -> PASS",
         'import PricingNote from "@/components/PricingNote";\nexport default function P(){return (<div><p>Turnaround 2-4 hours</p><PricingNote /></div>);}',
         True),
        ("device page price only in METADATA -> PASS (not rendered)",
         'export const metadata = {\n  description: "Assessment from R599",\n};\nexport default function P(){return (<div><p>hello world</p></div>);}',
         True),
        ("contract page with repair clause (no opt-out) -> FAIL",
         '__CONTRACT__import PricingNote from "@/components/PricingNote";\nexport default function P(){return (<div><PricingNote /></div>);}',
         False),
        ("contract page opted out -> PASS",
         '__CONTRACT__export default function P(){return (<div><PricingNote repair={false} /></div>);}',
         True),
    ]
    passed = 0
    for name, src, should_pass in cases:
        is_contract = src.startswith('__CONTRACT__')
        src = src.replace('__CONTRACT__', '')
        body = body_of(src)
        has_signal = bool(PRICE_RE.search(body) or LEADTIME_RE.search(body))
        if is_contract:
            ok = (not ('<PricingNote' in src)) or has_optout(src)
        else:
            ok = (not has_signal) or has_clause_render(src)
        result_pass = ok
        verdict = 'OK' if result_pass == should_pass else 'TEST-FAIL'
        if result_pass == should_pass:
            passed += 1
        print(f"  [{verdict}] {name}  (gate says {'PASS' if result_pass else 'FAIL'})")
    # component clause presence
    comp_ok = not check_component()
    print(f"  [{'OK' if comp_ok else 'TEST-FAIL'}] chokepoint component carries clause text")
    passed += 1 if comp_ok else 0
    total = len(cases) + 1
    print(f"\n{passed}/{total} gate self-tests passed")
    return 0 if passed == total else 1


if __name__ == '__main__':
    if '--test' in sys.argv:
        sys.exit(run_tests())
    v = scan()
    if v:
        print(f"❌ §287-T turnaround-clause gate: {len(v)} violation(s)")
        for x in v[:60]:
            print("   -", x)
        sys.exit(1)
    print("✅ §287-T turnaround-clause gate: all price/turnaround pages carry the machine-dependent lead-time clause; contract pages opted out.")
    sys.exit(0)
