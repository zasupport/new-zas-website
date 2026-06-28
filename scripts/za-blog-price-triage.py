#!/usr/bin/env python3
"""
za-blog-price-triage.py — READ-ONLY §489 live-corpus triage report (28/06/2026).

Classifies every unconfirmed Rand figure in the committed blog corpus into:
  ZA-INVENTED      — an unconfirmed price for ZA's OWN service  => real §374/§559/§287 violation
  COMPETITOR-ANCHOR — figure attributed to Apple / a competitor / "a new Mac" => market context
  AMBIGUOUS        — both ZA-attribution and a competitor token in context => needs human eyeball

Purpose (advisor 28/06): the §489 gate amendment must be data-driven — does the
competitor class cluster on the CONFIRMED values (R15k-R70k, R4,499) so we can
allowlist those, or does it sprawl across invented values so they must go
qualitative? This report answers that. It NEVER edits any blog file.

Usage:
  za-blog-price-triage.py                 # triage HEAD (committed/live) corpus, print + write report
  za-blog-price-triage.py --file <path>   # triage a specific .tsx/.md
  za-blog-price-triage.py --test          # negative-control: classifier discriminates
"""
import importlib.util, re, subprocess, sys
from pathlib import Path

_HERE = Path(__file__).parent
# reuse the §489 gate as SoT for ALLOWED + token regex (§354 no-fork)
_spec = importlib.util.spec_from_file_location("price_gate", _HERE / "check-blog-price-allowlist.py")
_pg = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_pg)
ALLOWED, TOKEN_RE = _pg.ALLOWED, _pg.TOKEN_RE

# Confirmed competitor/market anchors (CLAUDE.md SEO rule) — the ONLY competitor
# figures that are NOT themselves invented. Range R15,000-R70,000 + R4,499.
CONFIRMED_COMPETITOR = {"R4,499"}
def _in_confirmed_range(tok):
    try:
        v = int(tok.replace("R", "").replace(",", ""))
    except ValueError:
        return False
    return 15000 <= v <= 70000  # Apple Store R15k-R70k (CLAUDE.md)

COMPETITOR_RE = re.compile(
    r"apple|mac\s*shack|istore|official .{0,20}service provider|"
    r"new m[0-9]|new imac|new macbook|new mac mini|base m[0-9]|minimum for a new",
    re.I,
)
ZA_RE = re.compile(r"we charge|we quote|our price|our repair|at za support|za support (charge|repair|price)|in our workshop|costs? (from|between|roughly|around)", re.I)


def classify(ctx: str) -> str:
    comp = bool(COMPETITOR_RE.search(ctx))
    za = bool(ZA_RE.search(ctx))
    if comp and not za:
        return "COMPETITOR-ANCHOR"
    if comp and za:
        return "AMBIGUOUS"
    return "ZA-INVENTED"


def triage(text: str):
    rows = []
    slug = "(preamble)"
    slug_re = re.compile(r"slug:\s*['\"]([a-z0-9-]+)['\"]")
    # build a flat char->slug map cheaply by walking lines
    pos = 0
    line_slug = []
    for ln in text.splitlines(keepends=True):
        m = slug_re.search(ln)
        if m:
            slug = m.group(1)
        line_slug.append((pos, pos + len(ln), slug))
        pos += len(ln)

    def slug_at(idx):
        for a, b, s in line_slug:
            if a <= idx < b:
                return s
        return slug

    for m in TOKEN_RE.finditer(text):
        tok = m.group(0).replace(" ", "").rstrip(",")
        if tok in ALLOWED:
            continue
        s = max(0, m.start() - 70)
        ctx = text[s:m.end() + 30].replace("\n", " ")
        cls = classify(ctx)
        # confirmed competitor values are legit even if attribution is loose
        if cls in ("COMPETITOR-ANCHOR", "AMBIGUOUS") and (tok in CONFIRMED_COMPETITOR or _in_confirmed_range(tok)):
            cls = "COMPETITOR-CONFIRMED"
        rows.append((slug_at(m.start()), tok, cls, ctx.strip()))
    return rows


def report(rows) -> str:
    from collections import Counter, defaultdict
    cls_count = Counter(r[2] for r in rows)
    by_post = defaultdict(lambda: Counter())
    for slug, tok, cls, _ in rows:
        by_post[slug][cls] += 1
    za_vals = Counter(r[1] for r in rows if r[2] == "ZA-INVENTED")
    comp_vals = Counter(r[1] for r in rows if r[2].startswith("COMPETITOR"))

    out = ["# §489 Live-Corpus Price Triage (READ-ONLY) — 28/06/2026", ""]
    out.append(f"Total unconfirmed Rand figures: **{len(rows)}** across **{len(by_post)}** posts.")
    out.append("")
    out.append("## Classification totals")
    for cls, n in cls_count.most_common():
        out.append(f"- **{cls}**: {n}")
    out.append("")
    out.append("## ZA-INVENTED (real §489/§374/§559 violations) — distinct values")
    out.append(", ".join(f"{v}×{c}" for v, c in za_vals.most_common()) or "(none)")
    out.append("")
    out.append("## COMPETITOR figures — distinct values (do they cluster on confirmed R15k-R70k/R4,499 or sprawl?)")
    out.append(", ".join(f"{v}×{c}" for v, c in comp_vals.most_common()) or "(none)")
    out.append("")
    out.append("## Posts with the most ZA-INVENTED prices (remediation priority)")
    ranked = sorted(by_post.items(), key=lambda kv: -kv[1].get("ZA-INVENTED", 0))
    for slug, c in ranked[:30]:
        if c.get("ZA-INVENTED", 0):
            out.append(f"- `{slug}` — ZA-INVENTED:{c.get('ZA-INVENTED',0)} | competitor:{c.get('COMPETITOR-ANCHOR',0)+c.get('COMPETITOR-CONFIRMED',0)} | ambiguous:{c.get('AMBIGUOUS',0)}")
    return "\n".join(out)


def _test() -> int:
    rc = 0
    cases = [
        ("M3 board repair at ZA Support ranges from R3,499 to R6,499", "R3,499", "ZA-INVENTED"),
        ("Apple's M3 board replacement quote is typically R32,000 to R55,000", "R32,000", "COMPETITOR-CONFIRMED"),
        ("the R17,000 minimum for a new MacBook", "R17,000", "COMPETITOR-CONFIRMED"),
        ("Apple charges R8,500 but we charge R3,499 in our workshop", "R8,500", "AMBIGUOUS"),
    ]
    for ctx, tok, expect in cases:
        rows = triage(ctx)
        got = next((r[2] for r in rows if r[1] == tok), "MISSING")
        ok = got == expect
        print(f"  {'PASS' if ok else 'FAIL'}: {tok!r} in {ctx[:40]!r} -> {got} (expect {expect})")
        if not ok:
            rc = 1
    # NEG-CONTROL power: a confirmed ZA anchor must NOT appear as a violation at all
    if any(r[1] == "R599" for r in triage("Assessment from R599.")):
        print("  FAIL: confirmed anchor R599 leaked into violations (no power)"); rc = 1
    else:
        print("  PASS: NEG-CTRL confirmed anchor R599 correctly excluded")
    print("RESULT:", "ALL PASS" if rc == 0 else "FAILURES")
    return rc


if __name__ == "__main__":
    a = sys.argv[1:]
    if a and a[0] == "--test":
        sys.exit(_test())
    if a and a[0] == "--file":
        text = open(a[1]).read()
    else:
        text = subprocess.run(
            ["git", "show", "HEAD:src/app/blog/[slug]/page.tsx"],
            capture_output=True, text=True,
        ).stdout
    rows = triage(text)
    rep = report(rows)
    print(rep)
    dest = _HERE.parent / "docs" / "seo" / "blog-price-triage-28-06-2026.md"
    dest.write_text(rep + "\n")
    print(f"\n[written] {dest}")
