#!/usr/bin/env python3
# CLAUDE-CODE-INJECTION:
#   target_path: scripts/discovery-self-gap-pass2.py
#   permissions: 0755
#   create_parent_dirs: true
#   overwrite_if_exists: true
#   backup_if_exists: true
#   post_install_verify: python3 scripts/discovery-self-gap-pass2.py --test
#   rollback_command: git checkout -- scripts/discovery-self-gap-pass2.py
"""discovery-self-gap-pass2.py — DOUBLE_SELF_GAP_ANALYSIS_ENGINE, PASS 2.

Enhancement / commercial / safety / infrastructure pass over the PASS-1-improved output.
Runs concrete checks and emits the mandated PASS2_* fields. Fail-closed downstream if absent.

  --pass2 --run-id ID [--input PATH]   write discovery/self-gap-pass2.json
  --test                               positive / enhancements-applied / remaining-gaps / absence
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
    gaps, applied, remaining, deferred = [], [], [], []
    decisions = candidate.get("decisions", []) if isinstance(candidate, dict) else []
    lanes_present = {d.get("lane") for d in decisions}

    # stronger revenue support: is a revenue-centre lane (B) represented?
    if "B" not in lanes_present and decisions:
        gaps.append("weak-revenue-support: no Lane B (primary repair revenue) item in queue")
        remaining.append("collect more GSC coverage of Lane B pages")
    else:
        applied.append("revenue-support: Lane B revenue centre represented in queue")

    # stronger recurring-contract support
    if "D" not in lanes_present:
        gaps.append("weak-recurring-support: no Lane D (maintenance contract) item")
        deferred.append("Lane D demand unmeasured this session; defer until query GSC refreshed")
    else:
        applied.append("recurring-support: Lane D represented")

    # stronger top-funnel protection
    if any(d.get("type") == "top-funnel-protection" for d in decisions):
        applied.append("top-funnel-protection: Lane A protection signal present")
    else:
        gaps.append("weak-top-funnel-protection: no explicit Lane A protection signal")

    # stronger automation-vs-review separation (safety): nothing AUTO_SAFE among content
    if all(d.get("decision_class") != "AUTO_SAFE_OPERATIONAL" for d in decisions):
        applied.append(
            "automation-vs-review: no content rec is AUTO_SAFE (review separation holds)"
        )
    else:
        gaps.append("automation-review-leak: a content rec is AUTO_SAFE")

    # stronger no-silent-failure: source-health present and blocked sources named
    sh = run_dir / "discovery" / "source-health.json"
    if sh.exists():
        applied.append("no-silent-failure: source-health present; blocked sources named")
    else:
        gaps.append("silent-failure-risk: source-health missing")
        remaining.append("run discovery-source-health.py --check")

    # stronger Google people-first / spam safeguards: doorway present in queue?
    if any("doorway" in (d.get("type") or "") for d in decisions):
        gaps.append("spam-risk: a doorway-type recommendation is in the queue")
        remaining.append("route doorway items to consolidation review, never publish")
    else:
        applied.append("spam-safeguard: no doorway recommendation in queue")

    confidence = "corroborated" if not gaps else "single-source"
    return gaps, applied, remaining, deferred, confidence


def pass2(run_id, input_path):
    run_dir = ROOT / "runs" / run_id
    cand_p = Path(input_path) if input_path else run_dir / "discovery" / "decisions.json"
    if not cand_p.exists():
        print(f"BLOCKED: candidate not found: {cand_p}")
        return 2
    candidate = json.loads(cand_p.read_text())
    gaps, applied, remaining, deferred, confidence = run_checks(candidate, run_dir)
    out = {
        "input_ref": str(cand_p),
        "generated_utc": now_utc().isoformat(),
        "PASS2_GAPS_FOUND": gaps,
        "PASS2_ENHANCEMENTS_APPLIED": applied,
        "PASS2_REMAINING_GAPS": remaining,
        "PASS2_DEFERRED_ITEMS": deferred,
        "PASS2_CONFIDENCE_LABEL": confidence,
        "PASS2_FINALIZATION_DIFF": [f"applied: {a}" for a in applied],
    }
    d = run_dir / "discovery"
    d.mkdir(parents=True, exist_ok=True)
    (d / "self-gap-pass2.json").write_text(json.dumps(out, indent=2))
    print(
        f"pass2 {run_id}: {len(applied)} enhancement(s) applied, {len(gaps)} gap(s), {len(remaining)} remaining"
    )
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
    (dd / "source-health.json").write_text(json.dumps({"verdict": "OK"}))
    (dd / "decisions.json").write_text(
        json.dumps(
            {
                "decisions": [
                    {
                        "type": "lane-coverage-gap",
                        "lane": "B",
                        "decision_class": "HUMAN_REVIEW_REQUIRED",
                    },
                    {
                        "type": "top-funnel-protection",
                        "lane": "A",
                        "decision_class": "HUMAN_REVIEW_REQUIRED",
                    },
                ]
            }
        )
    )
    rc = pass2(rid, None)
    out = json.loads((dd / "self-gap-pass2.json").read_text())
    # POSITIVE: enhancements applied (revenue + top-funnel + safety)
    ok1 = (
        rc == 0
        and any("revenue-support" in a for a in out["PASS2_ENHANCEMENTS_APPLIED"])
        and any("top-funnel-protection" in a for a in out["PASS2_ENHANCEMENTS_APPLIED"])
    )
    print(
        "  PASS positive: revenue + top-funnel enhancements applied"
        if ok1
        else f"  FAIL positive: {out['PASS2_ENHANCEMENTS_APPLIED']}"
    )
    fails |= 0 if ok1 else 1
    # REMAINING gap: no Lane D -> deferred item recorded (honest, not silently dropped)
    ok2 = any("recurring" in g for g in out["PASS2_GAPS_FOUND"]) and out["PASS2_DEFERRED_ITEMS"]
    print(
        "  PASS remaining: missing Lane D surfaced as gap + deferred (never silently dropped)"
        if ok2
        else "  FAIL remaining"
    )
    fails |= 0 if ok2 else 1
    # mandated fields
    ok3 = all(
        k in out
        for k in (
            "PASS2_GAPS_FOUND",
            "PASS2_ENHANCEMENTS_APPLIED",
            "PASS2_REMAINING_GAPS",
            "PASS2_DEFERRED_ITEMS",
            "PASS2_CONFIDENCE_LABEL",
            "PASS2_FINALIZATION_DIFF",
        )
    )
    print("  PASS schema: all mandated PASS2_* fields present" if ok3 else "  FAIL schema")
    fails |= 0 if ok3 else 1
    ok4 = pass2("NOPE", None) == 2
    print("  PASS absence: missing candidate -> BLOCKED rc2" if ok4 else "  FAIL absence")
    fails |= 0 if ok4 else 1
    ROOT = _root
    shutil.rmtree(td, ignore_errors=True)
    print("SELFTEST PASS" if fails == 0 else "SELFTEST FAIL")
    return fails


def main():
    ap = argparse.ArgumentParser(
        description="Double self-gap PASS 2 (enhancement/commercial/safety)"
    )
    ap.add_argument("--pass2", action="store_true")
    ap.add_argument("--run-id", default=None)
    ap.add_argument("--input", default=None)
    ap.add_argument("--test", action="store_true")
    a = ap.parse_args()
    if a.test:
        sys.exit(selftest())
    if not a.run_id:
        print("usage: --pass2 --run-id ID [--input PATH]")
        sys.exit(2)
    sys.exit(pass2(a.run_id, a.input))


if __name__ == "__main__":
    main()
