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
import re, subprocess, sys, os, json

# --- ALLOWED derives from the registry SoT (§354 no-fork). The pricing-matrix
# loader (za-blog-pricing-matrix.py --load) writes ~/.za-blog-price-anchors.json;
# THIS gate reads the SAME file, so a confirmed anchor added via the Excel is
# immediately accepted everywhere (fixes the fork that stranded new anchors).
# Standing values (assessment/labour) + a fallback set (used only if the registry
# is unreadable) keep the gate working fail-safe.
_STANDING = {"R599", "R899"}
_FALLBACK = {"R599", "R800", "R2,000", "R3,000", "R3,500", "R1,200",
             "R2,500", "R2,999", "R899", "R1,900", "R5,500"}
_REGISTRY = os.path.expanduser("~/.za-blog-price-anchors.json")


def _norm(tok: str):
    """Normalise a raw price token to canonical 'R#,###' or None if not a plain Rand amount.
    Handles 'R2800'->'R2,800', 'R2,800', '2,800 rand', 'R3k'/'3 grand'->'R3,000'."""
    t = tok.lower().replace(" ", "")
    t = t.replace("rand", "").replace("grand", "").replace("r", "")
    kmul = 1
    if t.endswith("k"):
        kmul = 1000; t = t[:-1]
    t = t.rstrip(".,")
    if not t:
        return None
    if "." in t:
        try:
            n = int(round(float(t) * kmul))
        except ValueError:
            return None
    else:
        digits = t.replace(",", "")
        if not digits.isdigit():
            return None
        n = int(digits) * kmul
    return "R{:,}".format(n)


def registry_allowed():
    """Confirmed values = standing ∪ curated confirmed set (incl. range ceilings like R2,000)
    ∪ every confirmed anchor 'from' value in the registry. UNION, never a replace: the registry
    ADDS anchors filled via the pricing-matrix Excel (Gap 1 — new anchors accepted immediately),
    but can never DROP a previously-confirmed value (e.g. the R800-R2,000 liquid ceiling)."""
    vals = set(_STANDING) | set(_FALLBACK)
    try:
        anchors = json.load(open(_REGISTRY)).get("anchors", {})
        for v in anchors.values():
            if v.get("status") == "confirmed":
                nv = _norm(v.get("from", ""))
                if nv:
                    vals.add(nv)
    except Exception:
        pass
    return vals


ALLOWED = registry_allowed()

# Rand figures in ANY form (Gap 4 — R-prefix was evadable by rewording):
#  R2,800 | R2800 | R 2 800 | R3k | R2.8k | 2,800 rand | 2800 rand | 3 grand
# Literal uppercase 'R' (currency), NOT mid-word (so "over 15,000" / "for 3 years"
# never match); case-insensitivity is scoped to the rand/grand branch only.
TOKEN_RE = re.compile(
    r"(?<![A-Za-z])R\s?\d[\d,]*\.?\d*[kK]?"               # R2,800 | R2800 | R3k | R2.8k
    r"|(?i:\b\d[\d,]*\.?\d*\s?[kK]?\s?(?:rand|grand)\b)"  # 2,800 rand | 3 grand
)
# Competitor / Apple / new-device price (Gap 2). DIRECTIONAL to avoid false positives:
# a confirmed anchor value is fine for OUR OWN repair ("we charge R599", "logic board from
# R3,500") but NOT as a competitor/new-device price. This only fires when a competitor SUBJECT
# is followed (no sentence boundary) by a pricing verb and then a Rand figure — e.g.
# "Apple will quote R3,500", "a new Mac at R5,500", "iStore charges R2,999". "your Apple
# device", "Apple-certified", "we charge R599 ... Apple device" do NOT match (brand as object,
# or figure precedes the brand, or a full stop intervenes).
_COMPETITOR_PRICE_RE = re.compile(
    r"(?:apple|istore|genius bar|authoris\w+ service provider|"
    r"(?:a |the )?new (?:mac|device|machine|laptop|imac|macbook)|retail|\brrp\b)"
    r"[^.\n]{0,25}?"
    r"(?:charge|quote|cost|bill|price|runs?|asks?|at|from|of|around|about|start)\w*\s+"
    r"[^.\n]{0,15}?"
    r"(R\s?\d[\d,]*\.?\d*[kK]?)",
    re.IGNORECASE,
)


def offenders(text: str):
    found = []
    flagged = set()
    for m in TOKEN_RE.finditer(text):
        raw = m.group(0).strip().rstrip(".,")
        canon = _norm(raw)
        s = max(0, m.start() - 48)
        ctx = text[s:m.end() + 24].replace("\n", " ")
        # 1) not a confirmed anchor (or un-normalisable) -> invented price
        if canon is None or canon not in ALLOWED:
            found.append((raw.replace(" ", ""), ctx))
            flagged.add(m.start())
    # 2) an allowlisted figure used as a COMPETITOR/new-device price (directional) -> must be qualitative
    for m in _COMPETITOR_PRICE_RE.finditer(text):
        fs = m.start(1)
        if fs in flagged:
            continue
        canon = _norm(m.group(1).strip().rstrip(".,"))
        if canon in ALLOWED:   # only if it would otherwise pass
            s = max(0, m.start() - 8)
            ctx = text[s:m.end() + 8].replace("\n", " ")
            found.append((m.group(1).replace(" ", "") + " (competitor-context)", ctx))
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
    # Gap 4 — non-R evasion forms must be caught (reworded after correction pressure)
    for ev in ("around 2,800 rand for the board", "about R2.8k", "roughly 3 grand"):
        if not offenders(ev):
            print(f"  TEST FAIL (Gap4 evasion not caught): {ev!r}"); rc = 1
    # Gap 2 — allowlisted figure used as a COMPETITOR/new-device price (directional)
    for cc in ("Apple will quote you R3,500", "buying a new Mac at R5,500", "iStore charges R2,999"):
        if not offenders(cc):
            print(f"  TEST FAIL (Gap2 competitor-context not caught): {cc!r}"); rc = 1
    # False-positive controls — our OWN pricing + brand-as-object must NOT flag
    for fp in ("We charge R599 for a diagnostic on any Apple device",
               "liquid clean from R800 to R2,000 depending on damage",
               "we have repaired over 15,000 devices since 2009",
               "a fraction of Apple's quote, far less than a new Mac"):
        if offenders(fp):
            print(f"  TEST FAIL (false positive on clean own-pricing): {fp!r} -> {offenders(fp)}"); rc = 1
    # Gap 1 — ALLOWED must derive from the registry (standing values always present)
    if "R599" not in ALLOWED or "R2,000" not in ALLOWED:
        print("  TEST FAIL (Gap1): registry-derived ALLOWED missing standing/range values"); rc = 1
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
