#!/usr/bin/env python3
# CLAUDE-CODE-INJECTION:
#   target_path: scripts/discovery-next-step.py
#   permissions: 0644
#   create_parent_dirs: true
#   overwrite_if_exists: true
#   backup_if_exists: true
#   post_install_verify: test -e scripts/discovery-next-step.py
#   rollback_command: git checkout -- scripts/discovery-next-step.py
"""discovery-next-step.py — WORKSTREAM 10: NEXT_STEP_AUTOBUILD_ENGINE.

After the discovery run, detects the next highest-value BOUNDED, SAFE action and emits the executable
downstream instruction (or, if blocked, the exact unblock). Never proposes a prod/external/publish
action as auto-executable. Ranks candidates by revenue impact, risk, cost, dependency readiness,
evidence quality, and scope fit.

  --next --run-id ID    write discovery/next-step.json
  --test                positive(selects bounded step) / blocked(exact unblock) / absence
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


def candidates(run_id, decisions, source_health):
    """Bounded, SAFE candidate next steps only. Each carries readiness + why."""
    cands = []
    blocked_sources = source_health.get("blocked", []) if source_health else []
    # If query-dimension GSC is blocked, the highest-value SAFE next step is a read-only refresh.
    if "gsc_pages" not in blocked_sources:
        cands.append(
            {
                "id": "refresh-query-dimension-gsc",
                "revenue_impact": 0.7,
                "risk": 0.05,
                "cost": 0.2,
                "ready": True,
                "evidence": 0.9,
                "instruction": "python3 ~/bin/za-gsc-export.py --export   # read-only query-dimension refresh",
                "expected_outputs": "~/.za-gsc-export-latest.json refreshed; unblocks query/page-mismatch + rising-query review",
                "validation": "python3 scripts/discovery-keyword-intent-expand.py --expand --run-id <ID> shows query expansion AVAILABLE",
                "rollback": "none needed (read-only export; prior file archived by the exporter)",
            }
        )
    # Always-available SAFE step: re-run the discovery pipeline to refresh the advisory queue.
    cands.append(
        {
            "id": "rerun-discovery-pipeline",
            "revenue_impact": 0.5,
            "risk": 0.05,
            "cost": 0.1,
            "ready": True,
            "evidence": 0.8,
            "instruction": "bash scripts/run-commercial-discovery.sh   # local read-only pipeline (manual)",
            "expected_outputs": "fresh discovery/*.json + commercial-discovery report + self-gap VALID_IMPROVED_OUTPUT",
            "validation": "python3 scripts/test-commercial-discovery.py --test  => ALL PASS",
            "rollback": "none (writes only under ~/.za-daily-seo runtime; no repo/prod change)",
        }
    )
    # If there are HUMAN_REVIEW recs, the next human-facing step is to review the top-N queue.
    hrr = [d for d in decisions if d.get("decision_class") == "HUMAN_REVIEW_REQUIRED"]
    if hrr:
        cands.append(
            {
                "id": "human-review-top-queue",
                "revenue_impact": 0.8,
                "risk": 0.3,
                "cost": 0.4,
                "ready": True,
                "evidence": 0.7,
                "instruction": "REVIEW (human): open the ranked HUMAN_REVIEW_REQUIRED queue in the report; "
                "no auto-execution (content/schema change is review-gated).",
                "expected_outputs": "human decision per rec (approve/modify/reject)",
                "validation": "n/a (human step)",
                "rollback": "n/a",
            }
        )
    return cands


def select(cands):
    """Rank: high revenue + high evidence + low risk + low cost + ready. Prefer auto-executable SAFE."""

    def score(c):
        return (
            c["revenue_impact"] * 0.4
            + c["evidence"] * 0.3
            - c["risk"] * 0.2
            - c["cost"] * 0.1
            + (0.2 if c["ready"] else 0)
        )

    ranked = sorted(cands, key=score, reverse=True)
    # prefer a bounded auto-executable (non-human) step as the SELECTED downstream instruction
    auto = [c for c in ranked if not c["id"].startswith("human-")]
    return (auto[0] if auto else ranked[0]), ranked


def build(run_id):
    d = ROOT / "runs" / run_id / "discovery"
    dec_p = d / "decisions.json"
    if not dec_p.exists():
        print(f"BLOCKED: no decisions.json for run {run_id}")
        return 2
    decisions = json.loads(dec_p.read_text()).get("decisions", [])
    sh_p = d / "source-health.json"
    source_health = json.loads(sh_p.read_text()) if sh_p.exists() else {}
    cands = candidates(run_id, decisions, source_health)
    selected, ranked = select(cands)
    blockers = []
    if not selected["ready"]:
        blockers.append(f"{selected['id']} not ready")
    out = {
        "run_id": run_id,
        "generated_utc": now_utc().isoformat(),
        "NEXT_STEP_CANDIDATES": [c["id"] for c in ranked],
        "SELECTED_NEXT_STEP": selected["id"],
        "WHY_SELECTED": "highest revenue*evidence, lowest risk*cost, ready, and bounded/safe (auto-executable preferred)",
        "BLOCKERS_IF_ANY": blockers,
        "EXECUTABLE_DOWNSTREAM_INSTRUCTION": selected["instruction"],
        "EXPECTED_OUTPUTS": selected["expected_outputs"],
        "VALIDATION_COMMANDS_OR_CHECKS": selected["validation"],
        "ROLLBACK_OR_FAIL_CLOSED_BEHAVIOR": selected["rollback"],
    }
    (d / "next-step.json").write_text(json.dumps(out, indent=2))
    print(f"next-step {run_id}: SELECTED={selected['id']}")
    print(f"  instruction: {selected['instruction']}")
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
    (dd / "decisions.json").write_text(
        json.dumps(
            {
                "decisions": [
                    {"decision_class": "HUMAN_REVIEW_REQUIRED", "type": "lane-coverage-gap"}
                ]
            }
        )
    )
    (dd / "source-health.json").write_text(json.dumps({"blocked": []}))
    rc = build(rid)
    out = json.loads((dd / "next-step.json").read_text())
    # POSITIVE: selects a bounded, auto-executable SAFE step (not a human step) with validation+rollback
    ok1 = (
        rc == 0
        and not out["SELECTED_NEXT_STEP"].startswith("human-")
        and out["VALIDATION_COMMANDS_OR_CHECKS"]
        and out["ROLLBACK_OR_FAIL_CLOSED_BEHAVIOR"]
    )
    print(
        "  PASS positive: selects a bounded SAFE step with validation + rollback"
        if ok1
        else f"  FAIL positive: {out['SELECTED_NEXT_STEP']}"
    )
    fails |= 0 if ok1 else 1
    # mandated fields all present
    ok2 = all(
        k in out
        for k in (
            "NEXT_STEP_CANDIDATES",
            "SELECTED_NEXT_STEP",
            "WHY_SELECTED",
            "BLOCKERS_IF_ANY",
            "EXECUTABLE_DOWNSTREAM_INSTRUCTION",
            "EXPECTED_OUTPUTS",
            "VALIDATION_COMMANDS_OR_CHECKS",
            "ROLLBACK_OR_FAIL_CLOSED_BEHAVIOR",
        )
    )
    print("  PASS schema: all mandated next-step fields present" if ok2 else "  FAIL schema")
    fails |= 0 if ok2 else 1
    # BLOCKED source: gsc blocked -> refresh step NOT offered; still emits a safe step + candidates list
    (dd / "source-health.json").write_text(json.dumps({"blocked": ["gsc_pages"]}))
    build(rid)
    out2 = json.loads((dd / "next-step.json").read_text())
    ok3 = "refresh-query-dimension-gsc" not in out2["NEXT_STEP_CANDIDATES"]
    print(
        "  PASS blocked: gsc blocked -> refresh step withheld, no fabricated readiness"
        if ok3
        else "  FAIL blocked"
    )
    fails |= 0 if ok3 else 1
    ok4 = build("NOPE") == 2
    print("  PASS absence: missing decisions -> BLOCKED rc2" if ok4 else "  FAIL absence")
    fails |= 0 if ok4 else 1
    ROOT = _root
    shutil.rmtree(td, ignore_errors=True)
    print("SELFTEST PASS" if fails == 0 else "SELFTEST FAIL")
    return fails


def main():
    ap = argparse.ArgumentParser(description="Next-step autobuild engine")
    ap.add_argument("--next", action="store_true")
    ap.add_argument("--run-id", default=None)
    ap.add_argument("--test", action="store_true")
    a = ap.parse_args()
    if a.test:
        sys.exit(selftest())
    if not a.run_id:
        print("usage: --next --run-id ID")
        sys.exit(2)
    sys.exit(build(a.run_id))


if __name__ == "__main__":
    main()
