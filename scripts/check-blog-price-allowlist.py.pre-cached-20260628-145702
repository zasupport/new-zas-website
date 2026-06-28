#!/usr/bin/env python3
"""
§489 blog price-allowlist gate (27/06/2026).

Price-bearing blog posts may ONLY contain Rand figures that Courtney has
explicitly confirmed (§489 confirm-the-item). Any other Rand token = an
unconfirmed / AI-invented price = FAIL. Competitor/market/accessory figures
must be qualitative, not specific Rand amounts.

Usage:
  check-blog-price-allowlist.py --text "<markdown>"     # gate a content string
  check-blog-price-allowlist.py --file <path.md>         # gate a file
  check-blog-price-allowlist.py --test                   # negative-control test
"""
import re, sys

# The ONLY Rand values permitted in a price-bearing ZA blog post.
# Sources: Courtney-confirmed repair anchors (27/06/2026) + standing R599 / R899.
ALLOWED = {
    "R599",    # assessment / diagnostic fee + rush surcharge floor (confirmed)
    "R800",    # liquid clean+dry floor (confirmed range R800-R2000)
    "R2,000",  # liquid clean+dry ceiling (confirmed)
    "R3,000",  # liquid component repair / logic-board single-component / GPU (from)
    "R3,500",  # logic-board full replacement (from)
    "R1,200",  # charging port + iPad/iPhone battery (from)
    "R2,500",  # MacBook battery (from)
    "R2,999",  # data recovery (from)
    "R899",    # labour rate / genuine adapter (standing)
}

TOKEN_RE = re.compile(r"R\s?\d[\d,]*")


def offenders(text: str):
    found = []
    for m in TOKEN_RE.finditer(text):
        # strip trailing grammatical comma the greedy [\d,]* can absorb (R2,500, -> R2,500)
        tok = m.group(0).replace(" ", "").rstrip(",")
        if tok not in ALLOWED:
            # context for eyeballing
            s = max(0, m.start() - 45)
            found.append((tok, text[s:m.end() + 20].replace("\n", " ")))
    return found


def gate(text: str, label="content") -> int:
    bad = offenders(text)
    if bad:
        print(f"FAIL [{label}] — {len(bad)} unconfirmed Rand figure(s) (not in §489 allowlist):")
        for tok, ctx in bad:
            print(f"  {tok}  …{ctx.strip()}…")
        print(f"  Allowed: {', '.join(sorted(ALLOWED))}")
        return 1
    print(f"PASS [{label}] — all Rand figures are §489-confirmed anchors.")
    return 0


def _test() -> int:
    rc = 0
    ok = "Diagnosis from R599. Logic board replacement from R3,500. Liquid clean from R800 to R2,000."
    if gate(ok, "POSITIVE(clean)") != 0:
        print("  TEST FAIL: clean text rejected"); rc = 1
    bad = "Apple charges between R8,500 and R12,000. A sleeve costs R200."
    if gate(bad, "NEGATIVE(invented)") != 1:
        print("  TEST FAIL: invented prices NOT caught (gate has no power)"); rc = 1
    # right-value-wrong-context still passes value-gate (by design — eyeball catches context)
    print("RESULT:", "ALL PASS" if rc == 0 else "FAILURES")
    return rc


if __name__ == "__main__":
    a = sys.argv[1:]
    if not a or a[0] == "--test":
        sys.exit(_test())
    if a[0] == "--text":
        sys.exit(gate(a[1], "text"))
    if a[0] == "--file":
        sys.exit(gate(open(a[1]).read(), a[1]))
    print(__doc__); sys.exit(2)
