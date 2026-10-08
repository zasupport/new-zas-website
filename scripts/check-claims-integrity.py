#!/usr/bin/env python3
# CLAUDE-CODE-INJECTION
#   target_path: scripts/check-claims-integrity.py
#   permissions: 0755
#   create_parent_dirs: false
#   overwrite_if_exists: false
#   backup_if_exists: .claude/_archive/<UTC>/
#   post_install_verify: python3 scripts/check-claims-integrity.py --test
#   rollback_command: git checkout -- scripts/check-claims-integrity.py
#
# Claims-integrity gate (Iteration 1, 06/10/2026). Owner-confirmed facts:
#   - warranty is 12-month written (answer sheet Q3b, 05/10/2026)
#   - R599 assessment is SEPARATE and NON-REFUNDABLE (answer sheet Q3a)
#   - B-BBEE status is Level 4 (owner confirmation 06/10/2026)
# Therefore these claim classes are banned from src/:
#   W  "3-year / three-year / up-to-3 year warranty"
#   C  assessment credited/deducted/applied toward the repair ("not credited" is
#      the compliant negation and passes; the UniFi installation-survey credit is
#      a different service pending owner confirmation and is allowlisted)
#   N  "no fix no fee" promises (route SLUGS like /no-fix-no-fee are references,
#      not claims, and pass)
#   B  "BEE Level 1" (superseded by Level 4)
#   F  "free assessment/diagnostic/check" (section 226)
#
# P4 data-recovery extension (owner confirmation, 2026-10-08):
#   R  affirmative guarantee of data/recovery/files ("not/cannot be guaranteed"
#      negations are the compliant form and pass)
#   H  "100% recovery/success" claims
#   M  any N% recovery rate other than the owner-confirmed 92%, anywhere; and
#      92% itself only on the allowlisted primary page WITH the
#      recovery-cannot-be-guaranteed qualification adjacent (<=600 chars)
#   A  92 used as ratingValue (AggregateRating/Review laundering of the metric)
#   S  stale internal approval notes rendered publicly (case-sensitive)
#   P  data-recovery "from R<n>" below the R2,999 confirmed minimum on the two
#      data-recovery pages (assessment-fee context is exempt)
# Exit 0 = clean, 2 = violation, never silent-pass.
import pathlib
import re
import sys

REPO = pathlib.Path(__file__).resolve().parent.parent
SRC = REPO / "src"

ALLOWLIST_C = {"src/app/managed-services/unifi-networking/page.tsx"}

# Blog monolith: embedded legacy content carrying the known claim/price debt.
# In-place rewrite of blog prose is BANNED (it mangles; proven 28/06 and again
# 06/10) - remediation route is the staged regenerate-not-rewrite pipeline.
# The gate EXCLUDES it from fail-closed scope but REPORTS the debt count every
# run so the backlog is never silent (section 384).
BLOG_DEBT = {"src/app/blog/[slug]/page.tsx", "src/app/blog/[slug]/posts.data.ts"}

RULES = [
    ("W_3YEAR_WARRANTY", re.compile(r"(?:up[-\s]to[-\s])?(?:3|three)[-\s]year warranty", re.I)),
    (
        "C_ASSESSMENT_CREDIT",
        re.compile(
            r"(?<![Nn]ot )credited\s+(?:against|towards?|to\b|into\b)|"
            r"(?:deducted from|applies? towards?|included in)\s+"
            r"(?:the\s+|your\s+|any\s+)?(?:repair|replacement|final|total|bill|quote)",
            re.I,
        ),
    ),
    ("N_NO_FIX_NO_FEE", re.compile(r"(?<![/'])no[-\s][Ff]ix[-\s,]*no[-\s][Ff]ee", re.I)),
    ("B_BEE_LEVEL_1", re.compile(r"bee level 1", re.I)),
    ("F_FREE_ASSESSMENT", re.compile(r"free (?:mac )?(?:assessment|diagnostic|check)\b", re.I)),
    (
        "H_100_PERCENT_RECOVERY",
        re.compile(r"100%\s*(?:data[-\s])?(?:recovery|success|recoverable)", re.I),
    ),
    ("A_RATING_FROM_92", re.compile(r"ratingValue\D{0,6}92\b")),
]

# Case-sensitive classes: internal approval-register notes must never render.
RULES_CS = [
    (
        "S_STALE_INTERNAL_NOTE",
        re.compile(
            r"DO NOT PUBLISH|STAGING ONLY|NOT YET CONFIRMED|FINAL AUTHORISED|OWNER CONFIRMED"
        ),
    ),
]

# P4 data-recovery rate + price-floor scope (endswith so --test temp trees work)
ALLOWLIST_92_SUFFIX = ("app/mac-data-recovery/page.tsx",)
DR_PAGE_SUFFIXES = (
    "app/mac-data-recovery/page.tsx",
    "app/macbook-repair/data-recovery/page.tsx",
)
RATE_RX = re.compile(
    r"\b(\d{1,3}(?:\.\d+)?)%[\s-]*(?:of\s+cases\s+)?(?:data[-\s])?recovery\s+rate", re.I
)
PRICE_RX = re.compile(r"[Ff]rom\s+R\s?([\d,]{3,})")
ADJ_WINDOW = 600

# R class runs on whitespace-collapsed full text so negations that wrap across
# formatted JSX lines ("does not\n  guarantee that data...") are still seen.
R_RX = re.compile(
    r"guarantee[sd]?\s+(?:that\s+)?(?:your\s+|the\s+|all\s+)?(?:data\b|recovery\b|files\b)"
    r"|guaranteed\s+(?:data[-\s])?recovery",
    re.I,
)
R_NEGATIONS = (" not ", "cannot", "can't", " never ", "won't", " no ")


def scan_data_recovery(rel, text):
    """P4 claim checks needing full-text context. Returns (rel, lineno, class, frag) hits."""
    hits = []
    flat = re.sub(r"\s+", " ", text)
    for m in R_RX.finditer(flat):
        pre = " " + flat[max(0, m.start() - 60) : m.start()].lower()
        if any(k in pre for k in R_NEGATIONS):
            continue  # compliant negation ("cannot be guaranteed", "no ... guarantees")
        if flat[max(0, m.start() - 10) : m.start()].rstrip().endswith("•"):
            continue  # bulleted not-provided disclaimer list item
        hits.append((rel, 0, "R_GUARANTEED_RECOVERY", flat[m.start() : m.start() + 70]))
    for m in RATE_RX.finditer(text):
        line_no = text.count("\n", 0, m.start()) + 1
        frag = text[m.start() : m.start() + 60].replace("\n", " ")
        if m.group(1) != "92":
            hits.append((rel, line_no, "M_INVENTED_RECOVERY_RATE", frag))
        elif not rel.endswith(ALLOWLIST_92_SUFFIX):
            hits.append((rel, line_no, "M_92_OUTSIDE_ALLOWLIST", frag))
        elif "cannot be guaranteed" not in text[m.end() : m.end() + ADJ_WINDOW].lower():
            hits.append((rel, line_no, "M_92_QUALIFIER_NOT_ADJACENT", frag))
    if rel.endswith(DR_PAGE_SUFFIXES):
        for m in PRICE_RX.finditer(text):
            try:
                val = int(m.group(1).replace(",", ""))
            except ValueError:
                continue
            if val < 2999 and "assessment" not in text[max(0, m.start() - 80) : m.start()].lower():
                line_no = text.count("\n", 0, m.start()) + 1
                hits.append((rel, line_no, "P_PRICE_BELOW_FLOOR", text[m.start() : m.start() + 40]))
    return hits


def scan(root):
    hits = []
    debt = 0
    for p in sorted(root.rglob("*.ts*")):
        rel = str(p.relative_to(REPO)) if p.is_relative_to(REPO) else str(p)
        text = p.read_text(encoding="utf-8", errors="replace")
        if rel in BLOG_DEBT:
            for name, rx in RULES:
                debt += len(rx.findall(text))
            debt += len(RATE_RX.findall(text))
            continue
        for n, line in enumerate(text.splitlines(), 1):
            for name, rx in RULES:
                if name == "C_ASSESSMENT_CREDIT" and rel in ALLOWLIST_C:
                    continue
                m = rx.search(line)
                if m is None:
                    continue
                # route-reference guard for N: preceded by / or quote-keyed slug
                if name == "N_NO_FIX_NO_FEE":
                    i = m.start()
                    if i > 0 and line[i - 1] in "/'\"":
                        continue
                hits.append((rel, n, name, line.strip()[:80]))
            for name, rx in RULES_CS:
                if rx.search(line):
                    hits.append((rel, n, name, line.strip()[:80]))
        hits.extend(scan_data_recovery(rel, text))
    scan.debt = debt  # exposed for reporting
    return hits


def run_check():
    if not SRC.is_dir():
        print("claims-gate: ERROR - src/ not found", file=sys.stderr)
        return 2
    hits = scan(SRC)
    if hits:
        print("claims-gate: FAIL - %d banned claim(s):" % len(hits), file=sys.stderr)
        for rel, n, name, frag in hits[:40]:
            print("  %s:%s  %s  %s" % (rel, n, name, frag), file=sys.stderr)
        return 2
    debt = getattr(scan, "debt", 0)
    print("claims-gate: PASS (src/ clean of W/C/N/B/F claim classes outside blog)")
    if debt:
        print(
            "claims-gate: KNOWN-DEBT %d blog-content occurrence(s) registered for the "
            "regenerate-not-rewrite pipeline (in-place rewrite banned)" % debt
        )
    return 0


def run_test():
    import tempfile

    ok = 0
    with tempfile.TemporaryDirectory() as td:
        root = pathlib.Path(td)
        # positive: compliant content passes (incl. owner-approved P4 copy on the
        # allowlisted primary page path with the qualifier adjacent)
        (root / "good.tsx").write_text(
            "12-month warranty. The R599 assessment fee is a separate, non-refundable "
            "charge. It is not credited toward the repair. See /no-fix-no-fee for the "
            "assessment process. B-BBEE Level 4. It does not guarantee that data can "
            "be recovered or that recovered files will be complete, compatible or "
            "usable. Recovery cannot be guaranteed. We do not publish untested advice.\n"
        )
        dr = root / "app" / "mac-data-recovery"
        dr.mkdir(parents=True)
        (dr / "page.tsx").write_text(
            "92% data-recovery rate. Recovery outcomes depend on the condition of the "
            "device and storage components. Recovery cannot be guaranteed, and every "
            "device is assessed individually. Data recovery from R2,999. Final pricing "
            "is confirmed after assessment. The assessment is from R599, charged "
            "separately and non-refundable.\n"
        )
        assert scan(root) == [], "positive control failed: %r" % scan(root)
        ok += 1
        # negative: each banned class MUST be caught
        planted = [
            "covered by our up-to-3 year warranty",
            "the fee is credited against the repair",
            "assessment fee credited to your repair",
            "assessment is deducted from the final bill",
            "our No Fix No Fee promise",
            "a BEE Level 1 provider",
            "book a free Mac diagnostic",
            "we offer guaranteed data recovery",
            "we guarantee your data comes back",
            "100% recovery on all Macs",
            "95% recovery rate for MacBook Air",
            "92% recovery rate, no conditions apply",
            "ratingValue: 92",
            "DO NOT PUBLISH this section",
        ]
        for i, bad in enumerate(planted):
            f = root / f"bad{i}.tsx"
            f.write_text(bad + "\n")
            assert any(h[0].endswith(f.name) for h in scan(root)), f"missed: {bad}"
            f.unlink()
        # negative, DR-page-scoped: price below floor + 92% without adjacent qualifier
        good_dr = (dr / "page.tsx").read_text()
        for bad_dr, want in [
            ("Data recovery from R1,999 for any Mac.\n", "P_PRICE_BELOW_FLOOR"),
            (
                "92% data-recovery rate on every job." + "x" * 700 + "\n",
                "M_92_QUALIFIER_NOT_ADJACENT",
            ),
        ]:
            (dr / "page.tsx").write_text(bad_dr)
            assert any(h[2] == want for h in scan(root)), f"missed: {want}"
        (dr / "page.tsx").write_text(good_dr)
        ok += 1
        # absence: empty dir is a defined clean outcome, not a crash
        empty = root / "empty"
        empty.mkdir()
        assert scan(empty) == []
        ok += 1
    print("TEST %d/3 PASS (positive incl. approved P4 copy, negative x16, absence)" % ok)
    return 0


if __name__ == "__main__":
    sys.exit(run_test() if "--test" in sys.argv else run_check())
