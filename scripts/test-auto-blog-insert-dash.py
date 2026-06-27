#!/usr/bin/env python3
"""
test-auto-blog-insert-dash.py — §547/§584 negative-controlled test for the
insert-path dash-normalisation fix (27/06/2026).

Root cause it guards: extract_title / extract_excerpt / FAQ text bypassed
normalize_dashes, so Haiku em-dashes landed in titles + listing excerpts →
pre-commit §547 gate rejected the commit → posts stranded uncommitted every run.

Four real checks:
  1. POSITIVE  — title with em-dash → extract_title output is dash-clean
  2. POSITIVE  — excerpt para with em-dash → extract_excerpt output is dash-clean
  3. POSITIVE  — FAQ q/a with em+en-dash → build_faq_schema_entry output is dash-clean
  4. NEG-CTRL  — prove the test has POWER: the raw fixture really DOES contain the
                 glyphs (so a no-op fix would be caught) AND a deliberately
                 un-normalised string fails the same assertion.
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import importlib
abi = importlib.import_module("auto-blog-insert")

EM = "—"  # —
EN = "–"  # –
DASHES = (EM, EN)


def has_dash(s: str) -> bool:
    return any(d in s for d in DASHES)


FIXTURE = f"""# MacBook Pro Repair Cost {EM} What You Pay in Johannesburg

Data loss happens fast {EM} a spill, a surge, a drop {EN} these are daily here at our Hyde Park workshop and we handle them all.

### How much does it cost {EM} really?

Most repairs fall in the R2,800{EN}R8,500 range {EM} the assessment is R599.
"""

results = []


def check(name, ok):
    results.append((name, ok))
    print(f"  {'PASS' if ok else 'FAIL'}: {name}")


# 1. title
title = abi.extract_title(FIXTURE)
check("title is dash-clean after extract_title", not has_dash(title))

# 2. excerpt
excerpt = abi.extract_excerpt(FIXTURE)
check("excerpt is dash-clean after extract_excerpt", not has_dash(excerpt))

# 3. FAQ schema entry
faqs = abi.extract_faqs_from_content(FIXTURE)
faq_entry = abi.build_faq_schema_entry("test-slug", faqs) if faqs else ""
check("FAQ schema entry is dash-clean", faq_entry and not has_dash(faq_entry))

# 3b. full Record entry (belt-and-braces: title+excerpt+body together)
post_entry = abi.build_post_entry("test-slug", FIXTURE)
check("full Record post entry is dash-clean", not has_dash(post_entry))

# 4. NEGATIVE CONTROL — the test must be able to fail.
#    (a) the raw fixture genuinely contains the glyphs (else checks 1-3 are vacuous)
check("NEG-CTRL: raw fixture really contains dashes (test has power)", has_dash(FIXTURE))
#    (b) the has_dash assertion really fires on a known-dirty string
check("NEG-CTRL: has_dash() flags a known-dirty string", has_dash(f"x{EM}y"))

print()
passed = sum(1 for _, ok in results if ok)
total = len(results)
if passed == total:
    print(f"== §547 insert-path dash test: ALL PASS ({passed}/{total}) ==")
    sys.exit(0)
print(f"== §547 insert-path dash test: {passed}/{total} PASS — FAILURES ABOVE ==")
sys.exit(1)
