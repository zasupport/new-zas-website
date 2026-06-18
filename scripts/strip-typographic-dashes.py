#!/usr/bin/env python3
"""
strip-typographic-dashes.py — §547 sitewide em/en-dash remover + deploy gate (18/06/2026)

Applies the canonical transform (dash_normalizer.normalize_dashes) to every LIVE
src file, and doubles as the fail-closed deploy/pre-commit GATE (--scan, exit 1 if
any typographic dash remains in a live file). Backups (.bak / .pre-* / .orig /
backup / editor temp) are EXCLUDED so git-tracked snapshots can't false-trip the
gate or get rewritten.

  --scan       exit 1 if any live src file contains — or – (the gate). prints offenders.
  --dry-run    report files + counts that WOULD change, write nothing.
  --apply      rewrite live files in place (idempotent).
  --test       self-test the file-selection + scan/apply round-trip on a fixture.
"""
import os
import re
import sys
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent  # repo root
SRC = ROOT / "src"
sys.path.insert(0, str(ROOT / "scripts"))
from dash_normalizer import normalize_dashes, has_typographic_dash, count_dashes  # noqa: E402

EXCLUDE_RE = re.compile(r"\.(bak|orig)$|\.pre-|\.backup|backup|~$|\.swp$")
INCLUDE_EXT = {".tsx", ".ts", ".jsx", ".js", ".mdx"}


def live_files():
    for p in SRC.rglob("*"):
        if not p.is_file():
            continue
        if p.suffix not in INCLUDE_EXT:
            continue
        rel = str(p.relative_to(ROOT))
        if EXCLUDE_RE.search(p.name) or EXCLUDE_RE.search(rel):
            continue
        yield p


def scan():
    offenders = []
    for p in live_files():
        t = p.read_text(encoding="utf-8")
        if has_typographic_dash(t):
            em, en = count_dashes(t)
            offenders.append((p, em, en))
    if offenders:
        print(f"❌ §547 GATE FAIL — {len(offenders)} live file(s) contain typographic dashes:")
        for p, em, en in sorted(offenders, key=lambda x: -(x[1] + x[2]))[:40]:
            print(f"    {em+en:>5}  ({em} em / {en} en)  {p.relative_to(ROOT)}")
        total_em = sum(o[1] for o in offenders)
        total_en = sum(o[2] for o in offenders)
        print(f"  TOTAL: {total_em} em-dash + {total_en} en-dash across {len(offenders)} files")
        print("  FIX: python3 scripts/strip-typographic-dashes.py --apply")
        return 1
    print("✅ §547 GATE PASS — no em/en-dash in any live src file")
    return 0


def run(apply: bool):
    changed = 0
    tot_em = tot_en = 0
    for p in live_files():
        t = p.read_text(encoding="utf-8")
        if not has_typographic_dash(t):
            continue
        em, en = count_dashes(t)
        tot_em += em
        tot_en += en
        new = normalize_dashes(t)
        if new != t:
            changed += 1
            if apply:
                p.write_text(new, encoding="utf-8")
            print(f"  {'fixed' if apply else 'would fix'}: {p.relative_to(ROOT)}  (-{em} em / -{en} en)")
    verb = "fixed" if apply else "would change"
    print(f"\n{'✅ APPLIED' if apply else '🔍 DRY-RUN'}: {verb} {changed} file(s) | "
          f"{tot_em} em-dash + {tot_en} en-dash removed")
    return 0


def _test():
    import tempfile
    checks = []
    # exclusion: a .pre-* file must NOT be selected
    fx = SRC / "__dash_fixture__.tsx"
    bak = SRC / "__dash_fixture__.tsx.pre-547-test"
    try:
        fx.write_text("const t = 'MacBook — fix';\n", encoding="utf-8")
        bak.write_text("const t = 'MacBook — leave';\n", encoding="utf-8")
        files = {str(p.relative_to(ROOT)) for p in live_files()}
        checks.append(("fixture included", str(fx.relative_to(ROOT)) in files))
        checks.append(("backup excluded", str(bak.relative_to(ROOT)) not in files))
        # round-trip: apply then scan clean
        fx.write_text("'MacBook — fix' 2007–2009\n", encoding="utf-8")
        normd = normalize_dashes(fx.read_text())
        fx.write_text(normd, encoding="utf-8")
        checks.append(("applied removes dash", not has_typographic_dash(fx.read_text())))
        checks.append(("range preserved", "2007-2009" in fx.read_text()))
    finally:
        fx.unlink(missing_ok=True)
        bak.unlink(missing_ok=True)
    ok = all(p for _, p in checks)
    for n, p in checks:
        print(f"  {'✅' if p else '❌'} {n}")
    print(f"{'✅ PASS' if ok else '❌ FAIL'}: strip-typographic-dashes §547 ({sum(p for _,p in checks)}/{len(checks)})")
    return 0 if ok else 1


if __name__ == "__main__":
    a = sys.argv[1:]
    if "--test" in a:
        sys.exit(_test())
    if "--scan" in a:
        sys.exit(scan())
    if "--apply" in a:
        sys.exit(run(apply=True))
    if "--dry-run" in a:
        sys.exit(run(apply=False))
    print(__doc__)
    sys.exit(2)
