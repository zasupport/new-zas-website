#!/usr/bin/env python3
# CLAUDE-CODE-INJECTION:
#   target_path: scripts/discovery-decision.py
#   permissions: 0644
#   create_parent_dirs: true
#   overwrite_if_exists: true
#   backup_if_exists: true  # archive to .claude/_archive/<UTC>/ before replace
#   post_install_verify: python3 scripts/discovery-decision.py --test
#   rollback_command: git checkout -- scripts/discovery-decision.py  # advisory/read-only tool; no prod state to roll back
"""discovery-decision.py — Commercial Discovery decision engine.

Classifies each scored gap into AUTO_SAFE_OPERATIONAL | HUMAN_REVIEW_REQUIRED | BLOCKED | NO_ACTION.
INVARIANT (fail-safe chokepoint, negative-control tested): no content / schema / sitemap / nav / prod
change is ever AUTO_SAFE_OPERATIONAL. Lane E (forensic / incident / compromise), pricing, and schema
gaps are always HUMAN_REVIEW_REQUIRED (high trust). AUTO_SAFE is reserved for pipeline ops only.

  --decide --run-id ID    read scored.json -> write decisions.json
  --test                  positive / lane-E-review-gate / auto-safe-invariant / absence
"""

import sys
import os
import json
import argparse
from pathlib import Path
from datetime import datetime, timezone

HOME = Path(os.path.expanduser("~"))
ROOT = Path(os.environ.get("ZA_DAILY_SEO_ROOT", HOME / ".za-daily-seo"))

# Every discovery gap type implies a content/site/commercial change -> never AUTO_SAFE.
CONTENT_AFFECTING = {
    "lane-coverage-gap",
    "unmapped-demand",
    "top-funnel-protection",
    "missing-cluster",
    "cannibalisation",
}
HIGH_TRUST_LANES = {"E"}  # forensic/incident: always review


def now_utc():
    return datetime.now(timezone.utc)


def classify(gap):
    """Fail-safe: content-affecting or high-trust -> HUMAN_REVIEW_REQUIRED, never AUTO_SAFE."""
    if gap.get("evidence_label") == "BLOCKED":
        return "BLOCKED"
    if gap.get("lane") in HIGH_TRUST_LANES:
        return "HUMAN_REVIEW_REQUIRED"
    if gap.get("type") in CONTENT_AFFECTING:
        return "HUMAN_REVIEW_REQUIRED"
    # a gap with no measured evidence and below any actionable threshold
    if not gap.get("signal"):
        return "NO_ACTION"
    return "HUMAN_REVIEW_REQUIRED"


def decide(run_id):
    d = ROOT / "runs" / run_id / "discovery"
    scored_p = d / "scored.json"
    if not scored_p.exists():
        print(f"BLOCKED: no discovery/scored.json for run {run_id}")
        return 2
    scored = json.loads(scored_p.read_text()).get("scored", [])
    decisions = []
    for g in scored:
        cls = classify(g)
        review_reason = None
        if g.get("lane") in HIGH_TRUST_LANES:
            review_reason = (
                "high-trust lane (forensic/incident): human review mandatory, never auto-published"
            )
        decisions.append({**g, "decision_class": cls, "review_reason": review_reason})
    summary = {}
    for x in decisions:
        summary[x["decision_class"]] = summary.get(x["decision_class"], 0) + 1
    # invariant assertion (defensive): fail-closed if any content-affecting slipped to AUTO_SAFE
    violation = [
        x
        for x in decisions
        if x["decision_class"] == "AUTO_SAFE_OPERATIONAL"
        and (x.get("type") in CONTENT_AFFECTING or x.get("lane") in HIGH_TRUST_LANES)
    ]
    out = {
        "run_id": run_id,
        "generated_utc": now_utc().isoformat(),
        "decisions": decisions,
        "summary": summary,
        "invariant_ok": len(violation) == 0,
        "invariant_violations": violation,
    }
    (d / "decisions.json").write_text(json.dumps(out, indent=2))
    if violation:
        print(
            f"FAIL-CLOSED: {len(violation)} invariant violation(s) — content/high-trust marked AUTO_SAFE"
        )
        return 3
    print(f"decide {run_id}: " + " ".join(f"{k}={v}" for k, v in summary.items()))
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
    (dd / "scored.json").write_text(
        json.dumps(
            {
                "scored": [
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
    rc = decide(rid)
    out = json.loads((dd / "decisions.json").read_text())
    cls = {x["type"]: x["decision_class"] for x in out["decisions"]}
    ok1 = rc == 0 and cls["lane-coverage-gap"] == "HUMAN_REVIEW_REQUIRED"
    print("  PASS positive: content gap -> HUMAN_REVIEW_REQUIRED" if ok1 else "  FAIL positive")
    fails |= 0 if ok1 else 1
    ok2 = cls["unmapped-demand"] == "HUMAN_REVIEW_REQUIRED" and any(
        x["review_reason"] and "forensic" in x["review_reason"]
        for x in out["decisions"]
        if x["lane"] == "E"
    )
    print(
        "  PASS lane-E-gate: Lane E forced HUMAN_REVIEW with reason"
        if ok2
        else "  FAIL lane-E-gate"
    )
    fails |= 0 if ok2 else 1
    # AUTO-SAFE INVARIANT (neg control): classify can never emit AUTO_SAFE for content/high-trust
    ok3 = (
        classify({"type": "lane-coverage-gap", "lane": "B", "signal": {"x": 1}})
        != "AUTO_SAFE_OPERATIONAL"
        and classify({"type": "unmapped-demand", "lane": "E", "signal": {"x": 1}})
        != "AUTO_SAFE_OPERATIONAL"
    )
    print(
        "  PASS auto-safe-invariant: content/high-trust never AUTO_SAFE"
        if ok3
        else "  FAIL auto-safe-invariant"
    )
    fails |= 0 if ok3 else 1
    ok4 = decide("NOPE") == 2
    print("  PASS absence: missing scored.json -> BLOCKED rc2" if ok4 else "  FAIL absence")
    fails |= 0 if ok4 else 1
    ROOT = _root
    shutil.rmtree(td, ignore_errors=True)
    print("SELFTEST PASS" if fails == 0 else "SELFTEST FAIL")
    return fails


def main():
    ap = argparse.ArgumentParser(description="Commercial discovery decision engine")
    ap.add_argument("--decide", action="store_true")
    ap.add_argument("--run-id", default=None)
    ap.add_argument("--test", action="store_true")
    a = ap.parse_args()
    if a.test:
        sys.exit(selftest())
    if not a.run_id:
        print("usage: --decide --run-id ID")
        sys.exit(2)
    sys.exit(decide(a.run_id))


if __name__ == "__main__":
    main()
