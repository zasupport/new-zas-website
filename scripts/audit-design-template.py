#!/usr/bin/env python3
"""
audit-design-template.py  V1.0.0  26/09/2026 SAST

Design-template conformance auditor for zasupport.com.

REFERENCE TEMPLATES (Courtney, 26/09/2026):
  primary   /                         src/app/page.tsx
  secondary /macbook-not-turning-on   src/app/macbook-not-turning-on/page.tsx

WHAT IT DOES
  For every route (src/app/**/page.tsx) it resolves the local components the route
  renders (recursive @/ and ./ imports under src/), then checks the combined source
  against the reference template signatures:

  T1 plain-link-list   an underlined text link rendered as a list/grid item
                       (inside <li> or a .map()) with no border/rounded card surface.
                       This is the defect on /apple-account-security-help.
  T2 no-card-surface   no bordered card surface (rounded-xl|2xl + border) anywhere.
  T6 off-brand-palette light-theme or default Tailwind colour tokens (bg-white, slate/gray
                       surfaces, dark text) that render as white panels or invisible text.
  T4 no-icons          no lucide-react icon import anywhere in the rendered tree.
  T5 no-accent-pill    ADVISORY ONLY, never fails: no brand accent pill (rounded-full + brand
                       green). Visual check 26/09/2026 showed on-brand pages without a pill.

NO DUPLICATED EFFORT
  Ledger scripts/.design-template-ledger.json stores, per route, the sha256 of the
  route's full resolved source set plus RULES_VERSION. A route whose hash and rules
  version are unchanged reuses its stored verdict and is NOT re-scanned. Only new or
  changed routes (or a rules change) are scanned. --full ignores the ledger.

USAGE
  python3 scripts/audit-design-template.py            incremental scan, report, update ledger
  python3 scripts/audit-design-template.py --gate     same, exit 1 if any route fails
  python3 scripts/audit-design-template.py --full     rescan every route
  python3 scripts/audit-design-template.py --json F   also write the full report to F
  python3 scripts/audit-design-template.py --test     positive + negative controls

  python3 scripts/audit-design-template.py --fix F.. rewrite T6 colour tokens in files F to the
                                                     reference palette (className strings only)

EXEMPT routes (listed with reason) are reported, not failed: redirect stubs, noindex
internal pages, and legal/policy document layouts.

README (Claude Code / Claude.ai): execute this file with --test then --gate from the
repo root. The report lists every non-conforming route with the rule and the file
that carries the defect; fix the shared component named, never page content.
Rule record: docs/seo/design-template-conformance.md.
"""
import argparse
import hashlib
import json
import os
import re
import sys
import tempfile

RULES_VERSION = "1.2.1"
ADVISORY = ("T5",)
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LEDGER = os.path.join(ROOT, "scripts", ".design-template-ledger.json")

EXEMPT = {
    "/api": "API route, no UI",
    "/studio": "CMS studio, not public",
    "/privacy": "legal document layout",
    "/terms": "legal document layout",
    "/editorial-policy": "policy document layout",
}

IMPORT_RE = re.compile(r"""import\s+(?:[^'"]+?\s+from\s+)?['"]([^'"]+)['"]""")
ACCENT = re.compile(r"#0FEA7A|rgba\(15,\s*234,\s*122", re.I)
CLASS_RE = re.compile(r'className=(?:"([^"]*)"|\{`([^`]*)`\}|\{\'([^\']*)\'\})', re.S)

# T6: light-theme / default-palette colour tokens. The site is dark-only; these render as
# white panels or near-invisible dark text. Translucent white tints (bg-white/5) are allowed.
OFF_PALETTE = re.compile(
    r"(?<![\w/-])(?:hover:|focus:|group-hover:)?(?:"
    r"bg-white(?![\w/])|bg-(?:slate|gray|zinc|neutral|stone|blue)-\d{2,3}(?![\w/])"
    r"|(?:from|to|via)-(?:slate|gray|zinc)-\d{2,3}"
    r"|text-(?:gray|slate|zinc|neutral|stone)-(?:500|600|700|800|900|950)"
    r"|text-(?:emerald|green|teal)-(?:600|700|800|900)"
    r"|(?:border|divide)-(?:gray|slate|zinc|blue)-\d{2,3}"
    r"|bg-\[#27504D\](?!/)|text-\[#1B6B4A\]"
    r")(?![\w-])")

# Deterministic light -> brand map used by --fix. Tokens from /macbook-not-turning-on.
PALETTE_FIX = [
    ("bg-gradient-to-b from-slate-900 to-slate-800", "hero-gradient grid-overlay"),
    ("bg-[#27504D]", "hero-gradient grid-overlay"),
    ("hover:bg-slate-50", "hover:bg-[rgba(15,234,122,0.04)]"),
    ("hover:bg-[#27504D]", "hover:bg-[rgba(15,234,122,0.04)]"),
    ("hover:bg-green-400", "hover:bg-[#0FEA7A]/90"), ("hover:bg-green-500", "hover:bg-[#0FEA7A]/90"),
    ("hover:bg-[#20bd5a]", "hover:bg-[#0FEA7A]/90"),
    ("hover:text-emerald-700", "hover:text-[#0FEA7A]/80"), ("group-hover:text-[#1B6B4A]", "group-hover:text-[#0FEA7A]"),
    ("border-zinc-200", "border-[rgba(255,255,255,0.08)]"), ("text-zinc-900", "text-[#E8F4F1]"),
    ("text-zinc-700", "text-[#B9D2CB]"), ("text-zinc-600", "text-[#7A9E98]"), ("text-zinc-500", "text-[#B9D2CB]"),
    ("hover:text-green-400", "hover:text-[#0FEA7A]"), ("hover:text-green-500", "hover:text-[#0FEA7A]"),
    ("hover:border-green-400", "hover:border-[#0FEA7A]/40"), ("hover:border-[#1B6B4A]", "hover:border-[#0FEA7A]/40"),
    ("bg-green-500/20", "bg-[#0FEA7A]/10"), ("bg-[#1B6B4A]/10", "bg-[#0FEA7A]/10"),
    ("bg-white", "bg-[rgba(255,255,255,0.03)]"),
    ("bg-slate-50", "bg-[rgba(255,255,255,0.015)]"), ("bg-gray-50", "bg-[rgba(255,255,255,0.015)]"),
    ("bg-blue-50", "bg-[rgba(255,255,255,0.03)]"),
    ("bg-slate-900", "bg-[#0A1A18]"), ("bg-slate-800", "bg-[#111C1A]"),
    ("bg-green-50", "bg-[#0FEA7A]/10"), ("bg-green-200", "bg-[#0FEA7A]/20"),
    ("bg-green-500", "bg-[#0FEA7A]"), ("bg-green-600", "bg-[#0FEA7A]"), ("bg-[#25D366]", "bg-[#0FEA7A]"),
    ("bg-amber-50", "bg-[rgba(245,158,11,0.08)]"),
    ("text-slate-900", "text-[#E8F4F1]"), ("text-gray-900", "text-[#E8F4F1]"), ("text-gray-800", "text-[#B9D2CB]"),
    ("text-slate-700", "text-[#B9D2CB]"), ("text-gray-700", "text-[#B9D2CB]"), ("text-slate-300", "text-[#B9D2CB]"),
    ("text-slate-600", "text-[#7A9E98]"), ("text-gray-600", "text-[#7A9E98]"),
    ("text-slate-500", "text-[#7A9E98]"), ("text-gray-500", "text-[#7A9E98]"), ("text-slate-400", "text-[#7A9E98]"),
    ("text-green-400", "text-[#0FEA7A]"), ("text-green-600", "text-[#0FEA7A]"), ("text-green-700", "text-[#0FEA7A]"),
    ("text-emerald-600", "text-[#0FEA7A]"), ("text-emerald-700", "text-[#0FEA7A]"), ("text-emerald-800", "text-[#0FEA7A]"),
    ("text-[#1B6B4A]", "text-[#0FEA7A]"), ("text-[#27504D]", "text-[#0FEA7A]"), ("text-blue-500", "text-[#0FEA7A]"),
    ("text-amber-700", "text-amber-300"), ("text-red-600", "text-red-400"),
    ("border-slate-200", "border-[rgba(255,255,255,0.08)]"), ("border-gray-200", "border-[rgba(255,255,255,0.08)]"),
    ("border-blue-100", "border-[rgba(255,255,255,0.08)]"),
    ("border-slate-500", "border-[rgba(255,255,255,0.12)]"), ("border-slate-600", "border-[rgba(255,255,255,0.12)]"),
    ("border-slate-700", "border-[rgba(255,255,255,0.12)]"),
    ("border-green-100", "border-[#0FEA7A]/20"), ("border-green-200", "border-[#0FEA7A]/20"), ("border-[#27504D]", "border-[#0FEA7A]/20"),
    ("border-amber-100", "border-amber-500/30"),
    ("divide-slate-100", "divide-[rgba(255,255,255,0.06)]"),
]


def resolve_import(spec, from_file, src_dir):
    if spec.startswith("@/"):
        base = os.path.join(src_dir, spec[2:])
    elif spec.startswith("."):
        base = os.path.normpath(os.path.join(os.path.dirname(from_file), spec))
    else:
        return None
    for cand in (base, base + ".tsx", base + ".ts", os.path.join(base, "index.tsx"), os.path.join(base, "index.ts")):
        if os.path.isfile(cand) and cand.endswith((".tsx", ".ts")):
            return cand
    return None


def resolve_tree(entry, src_dir):
    seen, stack = [], [entry]
    while stack:
        f = stack.pop()
        if f in seen:
            continue
        seen.append(f)
        try:
            text = open(f, encoding="utf-8").read()
        except OSError:
            continue
        for spec in IMPORT_RE.findall(text):
            r = resolve_import(spec, f, src_dir)
            # Only follow UI components; data/lib files cannot carry markup defects.
            if r and ("/components/" in r or r.endswith(".tsx")) and r not in seen:
                stack.append(r)
    return seen


def classes_on_line(line):
    return " ".join(a or b or c for a, b, c in CLASS_RE.findall(line))


def check_files(files):
    """Return list of (rule, file, line_no, detail)."""
    findings = []
    combined = ""
    for f in files:
        try:
            lines = open(f, encoding="utf-8").read().splitlines()
        except OSError:
            continue
        combined += "\n".join(lines) + "\n"
        for i, line in enumerate(lines):
            cls = classes_on_line(line)
            if not re.search(r"(^|\s)underline(\s|$)", cls):
                continue
            if ("<Link" not in line and "<a " not in line and "<a\n" not in line):
                continue
            is_card = "border" in cls and "rounded" in cls
            ctx = "\n".join(lines[max(0, i - 2): i + 1])
            in_list = "<li" in ctx or ".map(" in ctx
            if in_list and not is_card:
                findings.append(("T1 plain-link-list", f, i + 1, line.strip()[:160]))
    all_cls = " ".join(classes_on_line(l) for l in combined.splitlines())
    # glass-card = bordered card class defined in src/app/globals.css
    if not ((re.search(r"\brounded-(xl|2xl)\b", all_cls) and re.search(r"\bborder\b", all_cls)) or re.search(r"\bglass-card\b", all_cls)):
        findings.append(("T2 no-card-surface", files[0], 0, "no bordered rounded card surface"))
    for f in files:
        try:
            text = open(f, encoding="utf-8").read()
        except OSError:
            continue
        for m in CLASS_RE.finditer(text):
            cls = m.group(1) or m.group(2) or m.group(3) or ""
            for tok in OFF_PALETTE.findall(cls):
                line = text.count("\n", 0, m.start()) + 1
                findings.append(("T6 off-brand-palette", f, line, tok))
    if "from 'lucide-react'" not in combined and 'from "lucide-react"' not in combined:
        findings.append(("T4 no-icons", files[0], 0, "no lucide-react icon import"))
    pill = any("rounded-full" in c and ACCENT.search(c)
               for l in combined.splitlines() for c in [classes_on_line(l)])
    if not pill:
        findings.append(("T5 no-accent-pill", files[0], 0, "no brand accent pill"))
    return findings


def route_of(page_file, app_dir):
    rel = os.path.relpath(os.path.dirname(page_file), app_dir)
    return "/" if rel == "." else "/" + rel.replace(os.sep, "/")


def exempt_reason(route, page_file=None):
    if page_file:
        text = open(page_file, encoding="utf-8").read()
        if "redirect(" in text and text.count("\n") < 30:
            return "redirect stub, renders no page"
        if re.search(r"index:\s*false", text):
            return "noindex internal page"
    for pfx, why in EXEMPT.items():
        if route == pfx or route.startswith(pfx + "/"):
            return why
    return None


def audit(root, full=False, ledger_path=LEDGER, write_ledger=True):
    src_dir = os.path.join(root, "src")
    app_dir = os.path.join(src_dir, "app")
    try:
        ledger = {} if full else json.load(open(ledger_path))
    except (OSError, ValueError):
        ledger = {}
    pages = []
    for d, _, fs in os.walk(app_dir):
        if "page.tsx" in fs:
            pages.append(os.path.join(d, "page.tsx"))
    pages.sort()
    report, scanned, reused = {}, 0, 0
    for p in pages:
        route = route_of(p, app_dir)
        why = exempt_reason(route, p)
        if why:
            report[route] = {"status": "EXEMPT", "reason": why}
            continue
        files = resolve_tree(p, src_dir)
        h = hashlib.sha256()
        for f in sorted(files):
            h.update(f.encode())
            h.update(open(f, "rb").read())
        digest = h.hexdigest()
        prev = ledger.get(route)
        if prev and prev.get("hash") == digest and prev.get("rules") == RULES_VERSION:
            report[route] = dict(prev, reused=True)
            reused += 1
            continue
        scanned += 1
        allf = check_files(files)
        found = [x for x in allf if not x[0].startswith(ADVISORY)]
        adv = [x[0] for x in allf if x[0].startswith(ADVISORY)]
        report[route] = {
            "status": "FAIL" if found else "PASS",
            "advisories": adv,
            "hash": digest,
            "rules": RULES_VERSION,
            "files": [os.path.relpath(f, root) for f in files],
            "findings": [
                {"rule": r, "file": os.path.relpath(f, root), "line": n, "detail": d} for r, f, n, d in found
            ],
        }
    if write_ledger:
        keep = {k: {kk: vv for kk, vv in v.items() if kk != "reused"} for k, v in report.items() if v["status"] != "EXEMPT"}
        json.dump(keep, open(ledger_path, "w"), indent=1, sort_keys=True)
    return report, scanned, reused


def print_report(report, scanned, reused):
    fails = {k: v for k, v in report.items() if v["status"] == "FAIL"}
    by_file = {}
    for route, v in fails.items():
        for fd in v["findings"]:
            line = 0 if fd["rule"].startswith("T6") else fd["line"]
            key = (fd["rule"], fd["file"], line)
            if route not in by_file.setdefault(key, []):
                by_file[key].append(route)
    total = len(report)
    ex = sum(1 for v in report.values() if v["status"] == "EXEMPT")
    print(f"design-template audit v{RULES_VERSION}: routes={total} scanned={scanned} reused_from_ledger={reused} exempt={ex} "
          f"pass={total - ex - len(fails)} fail={len(fails)}")
    for (rule, f, line), routes in sorted(by_file.items(), key=lambda x: (-len(x[1]), x[0])):
        where = f"{f}:{line}" if line else f
        print(f"  {rule}  {where}  affects {len(routes)} route(s): {', '.join(sorted(routes)[:8])}{' ...' if len(routes) > 8 else ''}")
    return len(fails)


def fix_palette(paths):
    changed = 0
    for path in paths:
        text = open(path, encoding="utf-8").read()

        def repl(m):
            q = m.group(0)
            for old, new in PALETTE_FIX:
                q = re.sub(r"(?<![\w/:\[-])" + re.escape(old) + r"(?![\w/\]-])", new, q)
            # Brand button: dark text on the brand green, never white.
            if re.search(r"(?<![:\w])bg-\[#0FEA7A\](?![/\w])", q):
                q = re.sub(r"(?<![:\w/])text-white(?![/\w])", "text-[#0A1A18]", q)
            return q
        new_text = CLASS_RE.sub(repl, text)
        if new_text != text:
            open(path, "w", encoding="utf-8").write(new_text)
            changed += 1
            left = sum(len(OFF_PALETTE.findall(m.group(1) or m.group(2) or m.group(3) or "")) for m in CLASS_RE.finditer(new_text))
            print(f"fixed {os.path.relpath(path, ROOT)}  remaining T6 tokens: {left}")
    return changed


def self_test():
    ok = True
    with tempfile.TemporaryDirectory() as t:
        app = os.path.join(t, "src", "app")
        comp = os.path.join(t, "src", "components")
        os.makedirs(os.path.join(app, "bad"))
        os.makedirs(os.path.join(app, "good"))
        os.makedirs(comp)
        open(os.path.join(comp, "Bad.tsx"), "w").write(
            "import Link from 'next/link';\nexport default function B({l}){return <ul>{l.map(x => <li key={x}>\n"
            "<Link href={x} className=\"text-[#0FEA7A] underline underline-offset-4\">{x}</Link></li>)}</ul>;}\n")
        open(os.path.join(app, "bad", "page.tsx"), "w").write(
            "import B from '@/components/Bad';\nexport default function P(){return <div className=\"bg-white text-slate-900\">"
            "<button className=\"bg-green-500 text-white hover:bg-green-400\">x</button><B l={[]} /></div>;}\n")
        os.makedirs(os.path.join(app, "old"))
        open(os.path.join(app, "old", "page.tsx"), "w").write(
            "import { redirect } from 'next/navigation';\nexport default function P(){ redirect('/good'); }\n")
        open(os.path.join(app, "good", "page.tsx"), "w").write(
            "import { ArrowRight } from 'lucide-react';\nexport default function P(){return <section className=\"hero-gradient\">"
            "<div className=\"rounded-full bg-[#0FEA7A]/10\" /><a className=\"rounded-xl border p-4\" href=\"/x\">x</a></section>;}\n")
        ledger = os.path.join(t, "ledger.json")
        rep, sc, ru = audit(t, full=True, ledger_path=ledger)
        bad_rules = {f["rule"] for f in rep["/bad"]["findings"]}
        checks = [
            ("negative control: plain link list flagged T1 via imported component", "T1 plain-link-list" in bad_rules),
            ("negative control: missing icons/card flagged", {"T2 no-card-surface", "T4 no-icons"} <= bad_rules),
            ("advisory: missing pill recorded, not failed", "T5 no-accent-pill" in rep["/bad"]["advisories"]),
            ("positive control: conforming page passes", rep["/good"]["status"] == "PASS"),
            ("negative control: light palette flagged T6", any(f["rule"].startswith("T6") and f["detail"] == "bg-white" for f in rep["/bad"]["findings"])),
            ("positive control: translucent bg-white/5 not flagged", not OFF_PALETTE.findall("bg-white/5 border-white/10")),
            ("redirect stub exempt", rep["/old"]["status"] == "EXEMPT"),
            ("first run scans both routes", sc == 2 and ru == 0),
        ]
        rep2, sc2, ru2 = audit(t, full=False, ledger_path=ledger)
        checks.append(("ledger: unchanged routes reused, zero rescans", sc2 == 0 and ru2 == 2))
        with open(os.path.join(comp, "Bad.tsx"), "a") as fh:
            fh.write("// edit\n")
        rep3, sc3, ru3 = audit(t, full=False, ledger_path=ledger)
        checks.append(("ledger: component edit rescans only its dependent route", sc3 == 1 and ru3 == 1))
        badp = os.path.join(app, "bad", "page.tsx")
        before = open(badp).read()
        fix_palette([badp])
        after = open(badp).read()
        checks.append(("fix: palette tokens rewritten, zero T6 left", not OFF_PALETTE.findall(after) and "bg-[#0FEA7A] text-[#0A1A18]" in after))
        strip = lambda t: re.sub(r'className="[^"]*"', "", t)
        checks.append(("fix: only className strings changed", strip(before) == strip(after)))
    # Real reference templates must pass under the real rules.
    rep_real, _, _ = audit(ROOT, full=True, ledger_path=os.path.join(tempfile.gettempdir(), "dta-selftest.json"), write_ledger=False)
    for ref in ("/", "/macbook-not-turning-on"):
        checks.append((f"reference template {ref} passes", rep_real.get(ref, {}).get("status") == "PASS"))
    for name, passed in checks:
        print(("PASS " if passed else "FAIL ") + name)
        ok &= passed
    print("SELF-TEST " + ("PASS" if ok else "FAIL"))
    return 0 if ok else 1


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--gate", action="store_true")
    ap.add_argument("--full", action="store_true")
    ap.add_argument("--test", action="store_true")
    ap.add_argument("--json")
    ap.add_argument("--fix", nargs="+", metavar="FILE")
    a = ap.parse_args()
    if a.test:
        sys.exit(self_test())
    if a.fix:
        fix_palette([os.path.abspath(f) for f in a.fix])
        return
    rep, sc, ru = audit(ROOT, full=a.full)
    n = print_report(rep, sc, ru)
    if a.json:
        json.dump(rep, open(a.json, "w"), indent=1, sort_keys=True)
    sys.exit(1 if (a.gate and n) else 0)


if __name__ == "__main__":
    main()
