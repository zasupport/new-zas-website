#!/usr/bin/env python3
# CLAUDE-CODE-INJECTION:
#   target_path: scripts/discovery-self-gap-pass1.py
#   permissions: 0755
#   create_parent_dirs: true
#   overwrite_if_exists: true
#   backup_if_exists: true
#   post_install_verify: python3 scripts/discovery-self-gap-pass1.py --test
#   rollback_command: git checkout -- scripts/discovery-self-gap-pass1.py
"""discovery-self-gap-pass1.py — DOUBLE_SELF_GAP_ANALYSIS_ENGINE, PASS 1.

Internal completeness / logic gap pass over a candidate output (default: the run's decisions.json).
Runs CONCRETE executable checks (not prose) and emits the mandated PASS1_* fields
(double-self-gap-analysis-schema.json). Fail-closed downstream if this file is absent.

  --pass1 --run-id ID [--input PATH]   write discovery/self-gap-pass1.json
  --test                               positive (planted gaps found) / clean (no false gaps) / absence
"""

import sys
import os
import json
import argparse
from pathlib import Path
from datetime import datetime, timezone

HOME = Path(os.path.expanduser("~"))
ROOT = Path(os.environ.get("ZA_DAILY_SEO_ROOT", HOME / ".za-daily-seo"))


def now_utc():
    return datetime.now(timezone.utc)


def run_checks(candidate, run_dir):
    """Return (gaps, severity, enhancements, blockers) from concrete predicates over the candidate."""
    gaps, severity, enh, blockers = [], {}, [], []
    decisions = candidate.get("decisions", []) if isinstance(candidate, dict) else []

    # 1) over-reliance on user-stated pillars: is any newly-discovered (Lane E unmapped) item present?
    types = {d.get("type") for d in decisions}
    if decisions and "unmapped-demand" not in types:
        gaps.append(
            "over-reliance-on-user-pillars: no newly-discovered (unmapped) demand in the queue"
        )
        severity["over-reliance-on-user-pillars"] = "medium"
        enh.append(
            "run discovery-snapshot Lane-E candidate detection and feed unmapped demand into gaps"
        )

    # 2) missing validation paths: every decision must carry source_ids
    if any(not d.get("source_ids") for d in decisions):
        gaps.append(
            "missing-source-ids: at least one decision lacks a source_id (untraceable claim)"
        )
        severity["missing-source-ids"] = "high"
        enh.append("reject any decision without a non-empty source_ids list")

    # 3) models lacking calibration label
    scored_p = run_dir / "discovery" / "scored.json"
    if scored_p.exists():
        sc = json.loads(scored_p.read_text())
        if (
            sc.get("calibration_status") != "UNCALIBRATED"
            and sc.get("calibration_status") != "CALIBRATED"
        ):
            gaps.append(
                "missing-calibration-label: scored output lacks calibrated/uncalibrated labelling"
            )
            severity["missing-calibration-label"] = "high"
            enh.append("stamp calibration_status on every scored record")
    else:
        gaps.append("missing-scored-input: no scored.json present for this run")
        severity["missing-scored-input"] = "medium"

    # 4) missing source-health class
    if not (run_dir / "discovery" / "source-health.json").exists():
        gaps.append("missing-source-health: no source-health.json (blocked sources may be silent)")
        severity["missing-source-health"] = "medium"
        blockers.append("run discovery-source-health.py --check first")

    # 5) vague / non-executable rationale
    if any(not (d.get("rationale") or "").strip() for d in decisions):
        gaps.append("vague-rationale: a decision has an empty rationale")
        severity["vague-rationale"] = "low"

    # 6) invariant present
    if isinstance(candidate, dict) and candidate.get("invariant_ok") is False:
        gaps.append("decision-invariant-violation: a content/high-trust rec was marked AUTO_SAFE")
        severity["decision-invariant-violation"] = "critical"
        blockers.append("re-run discovery-decision; content/high-trust must be HUMAN_REVIEW")

    return gaps, severity, enh, blockers


def pass1(run_id, input_path):
    run_dir = ROOT / "runs" / run_id
    cand_p = Path(input_path) if input_path else run_dir / "discovery" / "decisions.json"
    if not cand_p.exists():
        print(f"BLOCKED: candidate not found: {cand_p}")
        return 2
    candidate = json.loads(cand_p.read_text())
    gaps, severity, enh, blockers = run_checks(candidate, run_dir)
    confidence = "corroborated" if not blockers else "single-source"
    out = {
        "input_ref": str(cand_p),
        "generated_utc": now_utc().isoformat(),
        "PASS1_GAPS_FOUND": gaps,
        "PASS1_SEVERITY_BY_GAP": severity,
        "PASS1_RECOMMENDED_ENHANCEMENTS": enh,
        "PASS1_BLOCKERS": blockers,
        "PASS1_CONFIDENCE_LABEL": confidence,
        "PASS1_DIFF_PLAN": [f"apply: {e}" for e in enh],
    }
    d = run_dir / "discovery"
    d.mkdir(parents=True, exist_ok=True)
    (d / "self-gap-pass1.json").write_text(json.dumps(out, indent=2))
    print(
        f"pass1 {run_id}: {len(gaps)} gap(s) found, {len(blockers)} blocker(s), confidence={confidence}"
    )
    for g in gaps:
        print(f"  gap: {g}")
    return 0


def selftest():
    import tempfile
    import shutil

    fails = 0
    td = Path(tempfile.mkdtemp())
    global ROOT
    _root = ROOT
    ROOT = td
    rid = "T"
    dd = td / "runs" / rid / "discovery"
    dd.mkdir(parents=True)
    # PLANTED-GAP candidate: no unmapped-demand, one decision missing source_ids
    (dd / "decisions.json").write_text(
        json.dumps(
            {
                "decisions": [
                    {"type": "lane-coverage-gap", "lane": "B", "source_ids": [], "rationale": "r"}
                ],
                "invariant_ok": True,
            }
        )
    )
    rc = pass1(rid, None)
    out = json.loads((dd / "self-gap-pass1.json").read_text())
    ok1 = (
        rc == 0
        and any("missing-source-ids" in g for g in out["PASS1_GAPS_FOUND"])
        and any("over-reliance" in g for g in out["PASS1_GAPS_FOUND"])
    )
    print(
        "  PASS positive: planted gaps (missing source-ids + pillar over-reliance) found"
        if ok1
        else f"  FAIL positive: {out['PASS1_GAPS_FOUND']}"
    )
    fails |= 0 if ok1 else 1
    # mandated fields all present
    ok2 = all(
        k in out
        for k in (
            "PASS1_GAPS_FOUND",
            "PASS1_SEVERITY_BY_GAP",
            "PASS1_RECOMMENDED_ENHANCEMENTS",
            "PASS1_BLOCKERS",
            "PASS1_CONFIDENCE_LABEL",
            "PASS1_DIFF_PLAN",
        )
    )
    print("  PASS schema: all mandated PASS1_* fields present" if ok2 else "  FAIL schema")
    fails |= 0 if ok2 else 1
    # CLEAN candidate: no false gaps on a complete queue
    dd2 = td / "runs" / "CLEAN" / "discovery"
    dd2.mkdir(parents=True)
    (dd2 / "scored.json").write_text(json.dumps({"calibration_status": "UNCALIBRATED"}))
    (dd2 / "source-health.json").write_text(json.dumps({"verdict": "OK"}))
    (dd2 / "decisions.json").write_text(
        json.dumps(
            {
                "decisions": [
                    {"type": "unmapped-demand", "lane": "E", "source_ids": ["s"], "rationale": "r"},
                    {
                        "type": "lane-coverage-gap",
                        "lane": "B",
                        "source_ids": ["s"],
                        "rationale": "r",
                    },
                ],
                "invariant_ok": True,
            }
        )
    )
    pass1("CLEAN", None)
    clean = json.loads((dd2 / "self-gap-pass1.json").read_text())
    ok3 = clean["PASS1_GAPS_FOUND"] == []
    print(
        "  PASS clean: complete queue -> zero false gaps (checks have power, not noise)"
        if ok3
        else f"  FAIL clean: {clean['PASS1_GAPS_FOUND']}"
    )
    fails |= 0 if ok3 else 1
    ok4 = pass1("NOPE", None) == 2
    print("  PASS absence: missing candidate -> BLOCKED rc2" if ok4 else "  FAIL absence")
    fails |= 0 if ok4 else 1
    ROOT = _root
    shutil.rmtree(td, ignore_errors=True)
    print("SELFTEST PASS" if fails == 0 else "SELFTEST FAIL")
    return fails


def main():
    ap = argparse.ArgumentParser(description="Double self-gap PASS 1 (internal completeness)")
    ap.add_argument("--pass1", action="store_true")
    ap.add_argument("--run-id", default=None)
    ap.add_argument("--input", default=None)
    ap.add_argument("--test", action="store_true")
    a = ap.parse_args()
    if a.test:
        sys.exit(selftest())
    if not a.run_id:
        print("usage: --pass1 --run-id ID [--input PATH]")
        sys.exit(2)
    sys.exit(pass1(a.run_id, a.input))


if __name__ == "__main__":
    main()
