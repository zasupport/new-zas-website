#!/usr/bin/env python3
# ======================================================================
# CLAUDE-CODE-INJECTION
#   operation: create-new-file
#   target_path: scripts/discovery-score.py
#   permissions: "0755"
#   create_parent_dirs: true
#   overwrite_if_exists: false
#   backup_if_exists: true
#   post_install_verify: "python3 scripts/discovery-score.py --test"
#   rollback_command: "git checkout -- scripts/discovery-score.py"
#   hook_governance: lint-v2.sh + secrets.sh (PostToolUse Edit|Write) and
#     test-gate.sh (Stop) govern edits to this file. Beyond that this is a
#     CLI pipeline stage with no Claude lifecycle touchpoint (hook-block-mandate
#     exemption clause, stated explicitly): its equivalent controls are this
#     script's own --test (positive/negative/absence) executed by
#     scripts/smoke-seo-pipeline.sh, which records evidence in the repo.
# END-CLAUDE-CODE-INJECTION
# ======================================================================
"""discovery-score.py — WORKSTREAM 3: multi-factor prioritisation model.

Scores each gap using the weighted model in commercial-contract.json. Every score is emitted with
its per-factor breakdown AND its calibration status. The initial weights are UNCALIBRATED (a heuristic,
not a validated probability) and are labelled so on every record until validated against real
retrospective GSC/GA4 outcomes (safety rule 7). A score is NEVER presented as a probability.

  --score --run-id ID    read gaps.json -> write scored.json (ranked, calibration-labelled)
  --test                 positive / uncalibrated-label / revenue-weighting / absence
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

# lane -> revenue posture weight (from §194 revenue priority; B/D highest commercial value)
LANE_REVENUE = {"B": 1.0, "D": 0.9, "C": 0.8, "A": 0.6, "E": 0.5, "UNMAPPED": 0.4}


def now_utc():
    return datetime.now(timezone.utc)


def load_weights():
    try:
        c = json.loads(CONTRACT.read_text())
        wm = c.get("weighted_model", {})
        return {k: v["weight"] for k, v in wm.get("factors", {}).items()}, wm.get(
            "calibration_status", "UNCALIBRATED"
        )
    except Exception:
        return (
            {
                "revenue_impact": 0.30,
                "evidence_quality": 0.20,
                "conversion_readiness": 0.15,
                "recurring_revenue_fit": 0.15,
                "implementation_cost": -0.10,
                "risk": -0.10,
            },
            "UNCALIBRATED",
        )


def factors_for(gap):
    lane = gap.get("lane", "UNMAPPED")
    sig = gap.get("signal", {})
    impr = sig.get("impressions", 0)
    # each factor normalised to [0,1]
    return {
        "revenue_impact": LANE_REVENUE.get(lane, 0.4),
        "evidence_quality": 1.0 if gap.get("evidence_label") == "OBSERVED_FACT" else 0.5,
        "conversion_readiness": min(1.0, impr / 1000.0),
        "recurring_revenue_fit": 1.0 if lane == "D" else (0.5 if lane == "C" else 0.1),
        "implementation_cost": 0.5,  # neutral default; refined when live-page existence is known
        "risk": 0.8 if lane == "E" else 0.2,  # Lane E (forensic/incident) = high trust risk
    }


def score_gap(gap, weights):
    f = factors_for(gap)
    raw = sum(weights.get(k, 0) * f.get(k, 0) for k in f)
    # squash to [0,1] for readability; still NOT a probability
    s = max(0.0, min(1.0, 0.5 + raw / 2.0))
    return round(s, 3), f


def score(run_id):
    d = ROOT / "runs" / run_id / "discovery"
    gaps_p = d / "gaps.json"
    if not gaps_p.exists():
        print(f"BLOCKED: no discovery/gaps.json for run {run_id}")
        return 2
    gaps = json.loads(gaps_p.read_text()).get("gaps", [])
    weights, calib = load_weights()
    scored = []
    for g in gaps:
        s, f = score_gap(g, weights)
        scored.append(
            {
                **g,
                "priority_score": s,
                "factor_breakdown": f,
                "calibration_status": calib,
                "score_note": "heuristic ranking weight, NOT a probability; UNCALIBRATED until validated",
            }
        )
    scored.sort(key=lambda r: -r["priority_score"])
    out = {
        "run_id": run_id,
        "generated_utc": now_utc().isoformat(),
        "calibration_status": calib,
        "weights": weights,
        "scored": scored,
    }
    (d / "scored.json").write_text(json.dumps(out, indent=2))
    print(f"score {run_id}: {len(scored)} gaps ranked | calibration={calib}")
    for r in scored[:8]:
        print(f"  {r['priority_score']:.3f} [{r['type']}] lane {r['lane']} ({calib})")
    return 0


def selftest():
    import tempfile
    import shutil

    fails = 0
    td = Path(tempfile.mkdtemp())
    global ROOT, CONTRACT
    _root, _c = ROOT, CONTRACT
    ROOT = td
    CONTRACT = td / "c.json"
    CONTRACT.write_text(
        json.dumps(
            {
                "weighted_model": {
                    "calibration_status": "UNCALIBRATED",
                    "factors": {
                        "revenue_impact": {"weight": 0.30},
                        "evidence_quality": {"weight": 0.20},
                        "conversion_readiness": {"weight": 0.15},
                        "recurring_revenue_fit": {"weight": 0.15},
                        "implementation_cost": {"weight": -0.10},
                        "risk": {"weight": -0.10},
                    },
                }
            }
        )
    )
    rid = "T"
    dd = td / "runs" / rid / "discovery"
    dd.mkdir(parents=True)
    (dd / "gaps.json").write_text(
        json.dumps(
            {
                "gaps": [
                    {
                        "type": "lane-coverage-gap",
                        "lane": "B",
                        "evidence_label": "OBSERVED_FACT",
                        "signal": {"impressions": 800},
                    },
                    {
                        "type": "unmapped-demand",
                        "lane": "E",
                        "evidence_label": "INFERENCE",
                        "signal": {"impressions": 120},
                    },
                ]
            }
        )
    )
    rc = score(rid)
    out = json.loads((dd / "scored.json").read_text())
    # POSITIVE: ranked, each carries score + breakdown
    ok1 = rc == 0 and all("priority_score" in r and "factor_breakdown" in r for r in out["scored"])
    print(
        "  PASS positive: each gap scored with per-factor breakdown" if ok1 else "  FAIL positive"
    )
    fails |= 0 if ok1 else 1
    # UNCALIBRATED label on every record (safety rule 7)
    ok2 = (
        all(r["calibration_status"] == "UNCALIBRATED" for r in out["scored"])
        and out["calibration_status"] == "UNCALIBRATED"
    )
    print(
        "  PASS uncalibrated: every score labelled UNCALIBRATED (never a probability)"
        if ok2
        else "  FAIL uncalibrated"
    )
    fails |= 0 if ok2 else 1
    # REVENUE weighting: Lane B (revenue centre) outranks Lane E here
    by = {r["lane"]: r["priority_score"] for r in out["scored"]}
    ok3 = by["B"] > by["E"]
    print(
        "  PASS revenue-weighting: Lane B outranks Lane E under the model"
        if ok3
        else f"  FAIL revenue-weighting: {by}"
    )
    fails |= 0 if ok3 else 1
    ok4 = score("NOPE") == 2
    print("  PASS absence: missing gaps.json -> BLOCKED rc2" if ok4 else "  FAIL absence")
    fails |= 0 if ok4 else 1
    ROOT, CONTRACT = _root, _c
    shutil.rmtree(td, ignore_errors=True)
    print("SELFTEST PASS" if fails == 0 else "SELFTEST FAIL")
    return fails


def main():
    ap = argparse.ArgumentParser(description="Commercial discovery weighted scoring")
    ap.add_argument("--score", action="store_true")
    ap.add_argument("--run-id", default=None)
    ap.add_argument("--test", action="store_true")
    a = ap.parse_args()
    if a.test:
        sys.exit(selftest())
    if not a.run_id:
        print("usage: --score --run-id ID")
        sys.exit(2)
    sys.exit(score(a.run_id))


if __name__ == "__main__":
    main()
