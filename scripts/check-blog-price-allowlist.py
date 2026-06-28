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
  check-blog-price-allowlist.py --cached                 # gate ONLY git-staged ADDED blog lines (pre-commit, diff-scoped §489)
  check-blog-price-allowlist.py --test                   # negative-control test (incl. --cached power proof)

Diff-scoped by design: --cached gates only the lines a commit ADDS under
src/app/blog/** , so unrelated edits and the large legacy corpus (which mixes
ZA prices with legitimate competitor/Apple anchors) never block a commit. New
invented-price content cannot reach git; legacy remediation is a separate
Courtney-gated decision (§190/§384).
"""
import re, subprocess, sys

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


def staged_added_blog_text() -> str:
    """Return ONLY the lines a staged commit ADDS under src/app/blog/** .
    Diff-scoped: legacy corpus + unrelated edits are never examined (§384)."""
    try:
        out = subprocess.run(
            ["git", "diff", "--cached", "--unified=0", "--", "src/app/blog"],
            capture_output=True, text=True, check=True,
        ).stdout
    except (subprocess.CalledProcessError, FileNotFoundError):
        return ""
    added = []
    for ln in out.splitlines():
        # added content lines start with '+' but not the '+++ ' file header
        if ln.startswith("+") and not ln.startswith("+++"):
            added.append(ln[1:])
    return "\n".join(added)


def gate_cached() -> int:
    text = staged_added_blog_text()
    if not text.strip():
        print("PASS [--cached] — no staged blog additions to gate.")
        return 0
    return gate(text, "--cached (staged blog additions)")


def _test() -> int:
    rc = 0
    ok = "Diagnosis from R599. Logic board replacement from R3,500. Liquid clean from R800 to R2,000."
    if gate(ok, "POSITIVE(clean)") != 0:
        print("  TEST FAIL: clean text rejected"); rc = 1
    bad = "Apple charges between R8,500 and R12,000. A sleeve costs R200."
    if gate(bad, "NEGATIVE(invented)") != 1:
        print("  TEST FAIL: invented prices NOT caught (gate has no power)"); rc = 1
    # --cached power proof: the offenders() engine --cached relies on must catch a
    # real dirty diff-line and pass a real clean one (both directions, real content).
    dirty_line = "+M3 board repair ranges from R3,499 to R6,499 in our workshop."
    if gate(dirty_line[1:], "NEGATIVE(--cached dirty line)") != 1:
        print("  TEST FAIL: --cached engine missed an invented price in a +line"); rc = 1
    clean_line = "+Assessment from R599. Logic board replacement from R3,500."
    if gate(clean_line[1:], "POSITIVE(--cached clean line)") != 0:
        print("  TEST FAIL: --cached engine rejected an allowlisted +line"); rc = 1
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
    if a[0] == "--cached":
        sys.exit(gate_cached())
    print(__doc__); sys.exit(2)
