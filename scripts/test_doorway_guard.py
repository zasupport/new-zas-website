#!/usr/bin/env python3
"""§529 doorway-guard POSITIVE CONTROL (Fable audit step 2, 11/06/2026).
Asserts the runtime-derived suburb set catches slugs the old static set MISSED
(e.g. melville, craighall) while keeping named-entity + genuine model/info posts.
Run: python3 scripts/test_doorway_guard.py   (exit 0 = PASS, 1 = FAIL)"""
import importlib.util, os, sys

spec = importlib.util.spec_from_file_location(
    "abi", os.path.join(os.path.dirname(os.path.abspath(__file__)), "auto-blog-insert.py"))
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)

CASES = [
    ("gpu-repair-melville",              True),   # previously MISSED — not in static set
    ("liquid-damage-repair-craighall",   True),   # previously MISSED
    ("logic-board-repair-sandton",       True),   # known doorway (static set)
    ("managed-it-medical-practices-sandton-2026", False),  # §194 named-entity (practices) — keep
    ("investec-managed-it-sandton",      False),  # §194 named-entity — keep
    ("macbook-pro-m4-logic-board-repair", False), # genuine model post, no suburb
    ("how-to-clean-a-macbook-keyboard",  False),  # genuine informational
]
fail = 0
for slug, want in CASES:
    got = m.is_doorway_slug(slug)
    ok = (got == want)
    print(f"  {'PASS' if ok else 'FAIL'}  is_doorway_slug({slug!r}) = {got}  (want {want})")
    fail += (0 if ok else 1)
# prove the derivation actually picked up a previously-missing suburb
derived = m._service_suburbs()
got_melville = 'melville' in m.DOORWAY_SUBURBS
print(f"  {'PASS' if got_melville else 'FAIL'}  'melville' now in DOORWAY_SUBURBS (derived {len(derived)} suburb dirs)")
fail += (0 if got_melville else 1)

print(f"\n{'PASS' if fail == 0 else 'FAIL'} §529 doorway-guard ({len(CASES)+1-fail}/{len(CASES)+1})")
sys.exit(1 if fail else 0)
