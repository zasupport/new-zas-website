#!/usr/bin/env python3
# CLAUDE-CODE-INJECTION:
#   target_path: scripts/test-commercial-discovery.py
#   permissions: 0644
#   create_parent_dirs: true
#   overwrite_if_exists: true
#   backup_if_exists: true
#   post_install_verify: test -e scripts/test-commercial-discovery.py
#   rollback_command: git checkout -- scripts/test-commercial-discovery.py
"""test-commercial-discovery.py — aggregate control harness for the Commercial Discovery OS.

Runs every discovery-* stage's own --test (subprocess), proves NO writes hit shared stores, and maps
the 23 mandatory test categories to the concrete control that covers each. Exit 0 only if all pass.

  --test    run everything
"""

import sys
import os
import subprocess
import hashlib
from pathlib import Path

HERE = Path(__file__).resolve().parent
HOME = Path(os.path.expanduser("~"))
SHARED_TS = HOME / ".za-gsc-pages-timeseries.jsonl"
SHARED_CSV = HOME / "Desktop/Claude/Google/SEO/gsc-pages-export.csv"

STAGES = [
    "discovery-source-health.py",
    "discovery-snapshot.py",
    "discovery-keyword-intent-expand.py",
    "discovery-gap-detect.py",
    "discovery-score.py",
    "discovery-decision.py",
    "discovery-self-gap-pass1.py",
    "discovery-self-gap-pass2.py",
    "discovery-self-gap-merge.py",
    "discovery-operationalization-check.py",
    "discovery-next-step.py",
    "discovery-report.py",
    "discovery-preview-verify.py",
]

# 23 mandatory categories -> the stage control that proves each
COVERAGE = {
    "1 user-pillar-only bias detection": "discovery-self-gap-pass1.py (over-reliance gap)",
    "2 newly discovered opportunity classification": "discovery-snapshot.py (lane-E discovery)",
    "3 four-lane + Lane E mapping": "discovery-snapshot.py (positive: A/B/C/E tags)",
    "4 weighted-model classification": "discovery-score.py (positive + revenue-weighting)",
    "5 unsupported-claim rejection": "discovery-gap-detect.py (pillar LOW_CONFIDENCE not asserted)",
    "6 scaled-content-abuse rejection": "discovery-keyword-intent-expand.py (spam-rejection)",
    "7 top-of-funnel protection": "discovery-gap-detect.py (top-funnel-protection gap)",
    "8 duplicate/cannibalization": "daily-seo-analyze.py (cannibalisation) + intent dedupe",
    "9 self-healing retry-limit": "daily-seo-healthcheck.py (retry helper gives up loud)",
    "10 no-silent-failure": "discovery-source-health.py (blocked-not-silent)",
    "11 Pass 1 execution": "discovery-self-gap-pass1.py (positive)",
    "12 Pass 2 execution": "discovery-self-gap-pass2.py (positive)",
    "13 improvement-merge": "discovery-self-gap-merge.py (positive)",
    "14 invalid-output gating": "discovery-self-gap-merge.py (fail-closed)",
    "15 pre-vs-pass1 diff recording": "discovery-self-gap-merge.py (diff_original_to_pass1)",
    "16 pass1-vs-pass2 diff recording": "discovery-self-gap-merge.py (diff_pass1_to_pass2)",
    "17 confidence-label discipline": "pass1/pass2 CONFIDENCE_LABEL fields",
    "18 operationalization-status": "discovery-operationalization-check.py (WIRED/NOT_YET)",
    "19 next-step selection": "discovery-next-step.py (positive)",
    "20 blocked-next-step behavior": "discovery-next-step.py (blocked)",
    "21 related-keyword expansion": "discovery-keyword-intent-expand.py (positive)",
    "22 adjacent-intent clustering": "discovery-keyword-intent-expand.py (symptom/owner buckets)",
    "23 append-only learning-ledger": "discovery-self-gap-merge.py (ledger) + discovery-report.py (ledger)",
}


def _sha(p):
    return hashlib.sha256(p.read_bytes()).hexdigest() if p.exists() else "ABSENT"


def run_stage_tests():
    ok = True
    for s in STAGES:
        r = subprocess.run(
            [sys.executable, str(HERE / s), "--test"], capture_output=True, text=True
        )
        passed = r.returncode == 0 and "SELFTEST PASS" in r.stdout
        print(f"  [{'PASS' if passed else 'FAIL'}] {s}")
        if not passed:
            print("      " + (r.stdout.strip().splitlines() or [""])[-1])
        ok = ok and passed
    return ok


def main():
    print("== Commercial Discovery OS - aggregate controls ==")
    before = (_sha(SHARED_TS), _sha(SHARED_CSV))
    stages_ok = run_stage_tests()
    after = (_sha(SHARED_TS), _sha(SHARED_CSV))
    no_writes = before == after
    print(
        f"  [{'PASS' if no_writes else 'FAIL'}] no-writes: shared timeseries + CSV byte-identical before/after"
    )
    print("\n  23-category coverage map:")
    for cat, control in COVERAGE.items():
        print(f"    {cat:44s} <- {control}")
    allok = stages_ok and no_writes
    print("\n== RESULT: " + ("ALL PASS" if allok else "FAILURES") + " ==")
    sys.exit(0 if allok else 1)


if __name__ == "__main__":
    main()
