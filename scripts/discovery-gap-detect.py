#!/usr/bin/env python3
# ======================================================================
# CLAUDE-CODE-INJECTION
#   operation: create-new-file
#   target_path: scripts/discovery-gap-detect.py
#   permissions: "0755"
#   create_parent_dirs: true
#   overwrite_if_exists: false
#   backup_if_exists: true
#   post_install_verify: "python3 scripts/discovery-gap-detect.py --test"
#   rollback_command: "git checkout -- scripts/discovery-gap-detect.py"
#   hook_governance: lint-v2.sh + secrets.sh (PostToolUse Edit|Write) and
#     test-gate.sh (Stop) govern edits to this file. Beyond that this is a
#     CLI pipeline stage with no Claude lifecycle touchpoint (hook-block-mandate
#     exemption clause, stated explicitly): its equivalent controls are this
#     script's own --test (positive/negative/absence) executed by
#     scripts/smoke-seo-pipeline.sh, which records evidence in the repo.
# END-CLAUDE-CODE-INJECTION
# ======================================================================
"""discovery-gap-detect.py — Commercial Discovery gap detection.

Reads the lane snapshot + intent expansion and emits commercial gaps: lane-coverage gaps,
unmapped-demand (Lane E), top-funnel-protection signals, missing intent clusters, and a
user-pillar validation verdict (confirmed / reframed / newly-discovered / low-confidence).

User-stated pillars are treated as SEED HYPOTHESES validated against measured lane demand, never as
exhaustive truth. Every gap carries evidence + a provenance label. No fabricated demand.

  --detect --run-id ID    write discovery/gaps.json
  --test                  positive / pillar-validation / unmapped-demand / absence
"""

import sys
import os
import json
import argparse
from pathlib import Path
from datetime import datetime, timezone

HOME = Path(os.path.expanduser("~"))
ROOT = Path(os.environ.get("ZA_DAILY_SEO_ROOT", HOME / ".za-daily-seo"))
REPO = Path(os.environ.get("ZA_REPO", Path(__file__).resolve().parent.parent))
CONTRACT = Path(
    os.environ.get(
        "ZA_COMMERCIAL_CONTRACT",
        REPO / "docs/operating-system/commercial-discovery/commercial-contract.json",
    )
)


def now_utc():
    return datetime.now(timezone.utc)


def load_contract():
    try:
        return json.loads(CONTRACT.read_text())
    except Exception:
        return {"lanes": {}, "user_stated_pillars_as_seed_hypotheses": []}


def detect(run_id):
    d = ROOT / "runs" / run_id / "discovery"
    snap_p = d / "snapshot.json"
    if not snap_p.exists():
        print(
            f"BLOCKED: no discovery/snapshot.json for run {run_id} (run discovery-snapshot first)"
        )
        return 2
    snap = json.loads(snap_p.read_text())
    contract = load_contract()
    lane_impr = snap.get("lane_impressions", {})
    lane_counts = snap.get("lane_counts", {})
    lanes = snap.get("lanes", {})

    gaps = []

    def clicks(lane):
        return sum(x.get("clicks", 0) for x in lanes.get(lane, []))

    # 1) lane-coverage gaps: demand present, clicks leaking
    for lane in ("A", "B", "C", "D", "E"):
        impr = lane_impr.get(lane, 0)
        clk = clicks(lane)
        if impr >= 100 and (clk / impr if impr else 0) < 0.02:
            gaps.append(
                {
                    "type": "lane-coverage-gap",
                    "lane": lane,
                    "signal": {
                        "impressions": impr,
                        "clicks": clk,
                        "ctr": round(clk / impr, 4) if impr else 0,
                    },
                    "evidence_label": "OBSERVED_FACT",
                    "source_ids": [f"discovery-snapshot:lane:{lane}"],
                    "rationale": f"Lane {lane} has {impr} impressions but CTR < 2%: demand not converting to clicks.",
                }
            )

    # 2) unmapped demand -> Lane E discovery
    for c in snap.get("lane_E_discovery_candidates", []):
        gaps.append(
            {
                "type": "unmapped-demand",
                "lane": "E",
                "signal": {"page": c["page"], "impressions": c["impressions"]},
                "evidence_label": "INFERENCE",
                "source_ids": [f"discovery-snapshot:{c['page']}"],
                "rationale": "Demand with no commercial lane mapping: candidate for governed Lane E review.",
            }
        )

    # 3) top-funnel protection: Lane A demand must be protected (never sacrificed for B2B pivots)
    if lane_impr.get("A", 0) > 0:
        gaps.append(
            {
                "type": "top-funnel-protection",
                "lane": "A",
                "signal": {"impressions": lane_impr.get("A"), "pages": lane_counts.get("A")},
                "evidence_label": "OBSERVED_FACT",
                "source_ids": ["discovery-snapshot:lane:A"],
                "rationale": "Lane A (iPhone/iPad consumer entry) carries measured demand: protect, do not deprioritise.",
            }
        )

    # 4) pillar validation: seed hypotheses vs measured demand
    validation = []
    for p in contract.get("user_stated_pillars_as_seed_hypotheses", []):
        lane = p.get("lane")
        impr = lane_impr.get(lane, 0)
        if impr >= 100:
            verdict = "CONFIRMED"
        elif impr > 0:
            verdict = "REFRAMED_LOW_DEMAND"
        else:
            verdict = "LOW_CONFIDENCE_NO_MEASURED_DEMAND"
        validation.append(
            {
                "pillar": p.get("pillar"),
                "lane": lane,
                "measured_impressions": impr,
                "verdict": verdict,
                "evidence_label": "OBSERVED_FACT" if impr else "UNKNOWN",
            }
        )

    out = {
        "run_id": run_id,
        "generated_utc": now_utc().isoformat(),
        "gaps": gaps,
        "gap_count": len(gaps),
        "pillar_validation": validation,
        "note": "Pillars are seed hypotheses validated against measured lane demand. Gaps carry "
        "evidence; unmapped demand is a Lane E candidate, never an asserted service.",
    }
    (d / "gaps.json").write_text(json.dumps(out, indent=2))
    print(f"gap-detect {run_id}: {len(gaps)} gaps")
    for g in gaps:
        print(f"  [{g['type']}] lane {g['lane']} [{g['evidence_label']}]")
    print("  pillar validation:")
    for v in validation:
        print(
            f"    {v['pillar']:32s} lane {v['lane']} impr {v['measured_impressions']:>6} -> {v['verdict']}"
        )
    return 0


def selftest():
    import tempfile
    import shutil

    fails = 0
    td = Path(tempfile.mkdtemp())
    global ROOT, CONTRACT
    _root, _c = ROOT, CONTRACT
    ROOT = td
    CONTRACT = td / "contract.json"
    CONTRACT.write_text(
        json.dumps(
            {
                "user_stated_pillars_as_seed_hypotheses": [
                    {"pillar": "logic board repair", "lane": "B"},
                    {"pillar": "recurring maintenance contracts", "lane": "D"},
                ]
            }
        )
    )
    rid = "T"
    dd = td / "runs" / rid / "discovery"
    dd.mkdir(parents=True)
    (dd / "snapshot.json").write_text(
        json.dumps(
            {
                "lane_impressions": {"A": 900, "B": 800, "C": 0, "D": 0, "E": 0, "UNMAPPED": 200},
                "lane_counts": {"A": 1, "B": 1, "C": 0, "D": 0, "E": 0, "UNMAPPED": 1},
                "lanes": {
                    "A": [{"clicks": 5, "impressions": 900}],
                    "B": [{"clicks": 2, "impressions": 800}],
                    "C": [],
                    "D": [],
                    "E": [],
                },
                "lane_E_discovery_candidates": [
                    {"page": "https://zasupport.com/x", "impressions": 200}
                ],
            }
        )
    )
    rc = detect(rid)
    out = json.loads((dd / "gaps.json").read_text())
    types = {g["type"] for g in out["gaps"]}
    ok1 = rc == 0 and "lane-coverage-gap" in types and "top-funnel-protection" in types
    print(
        "  PASS positive: lane-coverage + top-funnel-protection gaps detected"
        if ok1
        else f"  FAIL positive: {types}"
    )
    fails |= 0 if ok1 else 1
    ok2 = "unmapped-demand" in types
    print(
        "  PASS unmapped-demand: Lane E candidate raised as gap"
        if ok2
        else "  FAIL unmapped-demand"
    )
    fails |= 0 if ok2 else 1
    v = {x["pillar"]: x["verdict"] for x in out["pillar_validation"]}
    ok3 = (
        v.get("logic board repair") == "CONFIRMED"
        and v.get("recurring maintenance contracts") == "LOW_CONFIDENCE_NO_MEASURED_DEMAND"
    )
    print(
        "  PASS pillar-validation: measured pillar CONFIRMED, unmeasured pillar LOW_CONFIDENCE (not asserted)"
        if ok3
        else f"  FAIL pillar-validation: {v}"
    )
    fails |= 0 if ok3 else 1
    ok4 = detect("NOPE") == 2
    print("  PASS absence: missing snapshot -> BLOCKED rc2" if ok4 else "  FAIL absence")
    fails |= 0 if ok4 else 1
    ROOT, CONTRACT = _root, _c
    shutil.rmtree(td, ignore_errors=True)
    print("SELFTEST PASS" if fails == 0 else "SELFTEST FAIL")
    return fails


def main():
    ap = argparse.ArgumentParser(description="Commercial discovery gap detection")
    ap.add_argument("--detect", action="store_true")
    ap.add_argument("--run-id", default=None)
    ap.add_argument("--test", action="store_true")
    a = ap.parse_args()
    if a.test:
        sys.exit(selftest())
    if not a.run_id:
        print("usage: --detect --run-id ID")
        sys.exit(2)
    sys.exit(detect(a.run_id))


if __name__ == "__main__":
    main()
