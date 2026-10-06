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
            r"(?<![Nn]ot )credited\s+(?:against|towards?)|"
            r"(?:deducted from|applies? towards?|included in)\s+"
            r"(?:the\s+|your\s+|any\s+)?(?:repair|replacement|final|total|bill|quote)",
            re.I,
        ),
    ),
    ("N_NO_FIX_NO_FEE", re.compile(r"(?<![/'])no[-\s][Ff]ix[-\s,]*no[-\s][Ff]ee", re.I)),
    ("B_BEE_LEVEL_1", re.compile(r"bee level 1", re.I)),
    ("F_FREE_ASSESSMENT", re.compile(r"free (?:mac )?(?:assessment|diagnostic|check)\b", re.I)),
]


def scan(root):
    hits = []
    debt = 0
    for p in sorted(root.rglob("*.ts*")):
        rel = str(p.relative_to(REPO)) if p.is_relative_to(REPO) else str(p)
        text = p.read_text(encoding="utf-8", errors="replace")
        if rel in BLOG_DEBT:
            for name, rx in RULES:
                debt += len(rx.findall(text))
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
        # positive: compliant content passes
        (root / "good.tsx").write_text(
            "12-month warranty. The R599 assessment fee is a separate, non-refundable "
            "charge. It is not credited toward the repair. See /no-fix-no-fee for the "
            "assessment process. B-BBEE Level 4.\n"
        )
        assert scan(root) == [], "positive control failed"
        ok += 1
        # negative: each banned class MUST be caught
        planted = [
            "covered by our up-to-3 year warranty",
            "the fee is credited against the repair",
            "assessment is deducted from the final bill",
            "our No Fix No Fee promise",
            "a BEE Level 1 provider",
            "book a free Mac diagnostic",
        ]
        for i, bad in enumerate(planted):
            f = root / f"bad{i}.tsx"
            f.write_text(bad + "\n")
            assert any(h[0].endswith(f.name) for h in scan(root)), f"missed: {bad}"
            f.unlink()
        ok += 1
        # absence: empty dir is a defined clean outcome, not a crash
        empty = root / "empty"
        empty.mkdir()
        assert scan(empty) == []
        ok += 1
    print("TEST %d/3 PASS (positive, negative x6, absence)" % ok)
    return 0


if __name__ == "__main__":
    sys.exit(run_test() if "--test" in sys.argv else run_check())
