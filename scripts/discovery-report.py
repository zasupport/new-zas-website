#!/usr/bin/env python3
# CLAUDE-CODE-INJECTION:
#   target_path: scripts/discovery-report.py
#   permissions: 0644
#   create_parent_dirs: true
#   overwrite_if_exists: true
#   backup_if_exists: true
#   post_install_verify: test -e scripts/discovery-report.py
#   rollback_command: git checkout -- scripts/discovery-report.py
"""discovery-report.py — Commercial Discovery report renderer + ledger.

Aggregates the run's discovery artifacts (snapshot, gaps, scored, decisions, self-gap, next-step,
operationalization) into one facts-only report and appends the discovery change-measurement ledger.
No fabricated metrics; BLOCKED sources shown with their state; calibration status carried through.

  --report --run-id ID    write reports/commercial-discovery-<id>.md + append ledger
  --test                  positive / carries-blocked+calibration / absence
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


def _load(d, name):
    p = d / name
    return json.loads(p.read_text()) if p.exists() else None


def render(run_id):
    d = ROOT / "runs" / run_id / "discovery"
    snap = _load(d, "snapshot.json")
    if snap is None:
        print(f"BLOCKED: no discovery/snapshot.json for run {run_id}")
        return 2
    gaps = _load(d, "gaps.json") or {}
    scored = _load(d, "scored.json") or {}
    decisions = _load(d, "decisions.json") or {}
    selfgap = _load(d, "self-gap.json") or {}
    nextstep = _load(d, "next-step.json") or {}
    opz = _load(d, "operationalization.json") or {}
    srch = _load(d, "source-health.json") or {}

    L = []
    L.append(f"# Commercial Discovery report - run {run_id}")
    L.append(
        f"_Generated {now_utc().isoformat()} UTC. Facts only. Advisory: nothing is published by this system._\n"
    )

    L.append("## Source health")
    for n, h in (srch.get("sources") or {}).items():
        st = h.get("state")
        L.append(f"- {n}: {st}" + (f" | {h.get('invocation')}" if st == "BLOCKED" else ""))
    if not srch:
        L.append("- (source-health not run)")

    L.append("\n## Commercial lane map")
    for lane in ("A", "B", "C", "D", "E", "UNMAPPED"):
        L.append(
            f"- Lane {lane}: {snap['lane_counts'].get(lane, 0)} pages, {snap['lane_impressions'].get(lane, 0)} impressions"
        )
    L.append(
        f"- Lane E discovery candidates (unmapped demand): {len(snap.get('lane_E_discovery_candidates', []))}"
    )

    L.append("\n## Pillar validation (seed hypotheses vs measured demand)")
    for v in gaps.get("pillar_validation", []):
        L.append(
            f"- {v['pillar']} (lane {v['lane']}): {v['measured_impressions']} impr -> {v['verdict']} [{v['evidence_label']}]"
        )

    L.append(f"\n## Weighted model (calibration: {scored.get('calibration_status', 'UNKNOWN')})")
    L.append(
        "_Scores are heuristic ranking weights, NOT probabilities, UNCALIBRATED until validated._"
    )
    for r in scored.get("scored", [])[:10]:
        L.append(
            f"- {r.get('priority_score')} [{r.get('type')}] lane {r.get('lane')} ({r.get('calibration_status')})"
        )

    L.append("\n## Decision queue")
    for cls, n in (decisions.get("summary") or {}).items():
        L.append(f"- {cls}: {n}")
    L.append(f"- invariant_ok (no content/high-trust AUTO_SAFE): {decisions.get('invariant_ok')}")

    L.append("\n## Double self-gap analysis")
    L.append(f"- verdict: {selfgap.get('verdict', 'NOT_RUN')}")
    if selfgap.get("merge"):
        L.append(
            f"- pass1->improvements: {len(selfgap['merge'].get('diff_original_to_pass1', []))}"
        )
        L.append(
            f"- pass1->pass2 improvements: {len(selfgap['merge'].get('diff_pass1_to_pass2', []))}"
        )
    fo = selfgap.get("final_output", {})
    if fo.get("remaining_gaps"):
        L.append(f"- remaining gaps: {fo['remaining_gaps']}")

    L.append("\n## Operationalization evidence")
    for k, v in (opz.get("PROPAGATION_STATUS") or {}).items():
        L.append(f"- {k}: {v}")
    if opz.get("REMAINING_GAPS"):
        L.append(f"- not-fully-wired: {opz['REMAINING_GAPS']}")

    L.append("\n## Next executable downstream step")
    L.append(f"- selected: {nextstep.get('SELECTED_NEXT_STEP', 'n/a')}")
    L.append(f"- instruction: {nextstep.get('EXECUTABLE_DOWNSTREAM_INSTRUCTION', 'n/a')}")
    L.append(f"- validation: {nextstep.get('VALIDATION_COMMANDS_OR_CHECKS', 'n/a')}")
    L.append(f"- rollback/fail-closed: {nextstep.get('ROLLBACK_OR_FAIL_CLOSED_BEHAVIOR', 'n/a')}")

    reports = ROOT / "reports"
    reports.mkdir(parents=True, exist_ok=True)
    out = reports / f"commercial-discovery-{run_id}.md"
    out.write_text("\n".join(L) + "\n")

    ldir = ROOT / "ledger"
    ldir.mkdir(parents=True, exist_ok=True)
    lp = ldir / "commercial-discovery.jsonl"
    entry = {
        "run_id": run_id,
        "date": now_utc().strftime("%Y-%m-%d"),
        "lane_impressions": snap.get("lane_impressions"),
        "decision_summary": decisions.get("summary"),
        "self_gap_verdict": selfgap.get("verdict"),
        "calibration": scored.get("calibration_status"),
    }
    keep = []
    if lp.exists():
        for ln in lp.read_text().splitlines():
            ln = ln.strip()
            if ln:
                try:
                    if json.loads(ln).get("run_id") != run_id:
                        keep.append(ln)
                except Exception:
                    keep.append(ln)
    keep.append(json.dumps(entry))
    tmp = lp.with_suffix(".jsonl.tmp")
    tmp.write_text("\n".join(keep) + "\n")
    os.replace(tmp, lp)
    print(f"report -> {out}")
    print(f'reveal: open -R "{out}"')
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
    (dd / "snapshot.json").write_text(
        json.dumps(
            {
                "lane_counts": {"A": 1, "B": 1, "C": 0, "D": 0, "E": 1, "UNMAPPED": 1},
                "lane_impressions": {"A": 900, "B": 800, "C": 0, "D": 0, "E": 120, "UNMAPPED": 200},
                "lane_E_discovery_candidates": [{"page": "x"}],
            }
        )
    )
    (dd / "scored.json").write_text(
        json.dumps(
            {
                "calibration_status": "UNCALIBRATED",
                "scored": [
                    {
                        "priority_score": 0.78,
                        "type": "lane-coverage-gap",
                        "lane": "B",
                        "calibration_status": "UNCALIBRATED",
                    }
                ],
            }
        )
    )
    (dd / "decisions.json").write_text(
        json.dumps({"summary": {"HUMAN_REVIEW_REQUIRED": 3}, "invariant_ok": True})
    )
    (dd / "source-health.json").write_text(
        json.dumps(
            {
                "sources": {
                    "ga4": {"state": "BLOCKED", "invocation": "mcp__google-analytics runReport"}
                }
            }
        )
    )
    rc = render(rid)
    md = (td / "reports" / f"commercial-discovery-{rid}.md").read_text()
    ok1 = rc == 0 and "Commercial lane map" in md and "Lane E discovery candidates" in md
    print(
        "  PASS positive: report renders lane map + discovery candidates"
        if ok1
        else "  FAIL positive"
    )
    fails |= 0 if ok1 else 1
    ok2 = (
        "UNCALIBRATED" in md
        and "NOT probabilities" in md
        and "ga4: BLOCKED" in md
        and "runReport" in md
    )
    print(
        "  PASS carries: UNCALIBRATED label + BLOCKED source with exact invocation, no fake metric"
        if ok2
        else "  FAIL carries"
    )
    fails |= 0 if ok2 else 1
    ok3 = render("NOPE") == 2
    print("  PASS absence: missing snapshot -> BLOCKED rc2" if ok3 else "  FAIL absence")
    fails |= 0 if ok3 else 1
    ROOT = _root
    shutil.rmtree(td, ignore_errors=True)
    print("SELFTEST PASS" if fails == 0 else "SELFTEST FAIL")
    return fails


def main():
    ap = argparse.ArgumentParser(description="Commercial discovery report")
    ap.add_argument("--report", action="store_true")
    ap.add_argument("--run-id", default=None)
    ap.add_argument("--test", action="store_true")
    a = ap.parse_args()
    if a.test:
        sys.exit(selftest())
    if not a.run_id:
        print("usage: --report --run-id ID")
        sys.exit(2)
    sys.exit(render(a.run_id))


if __name__ == "__main__":
    main()
