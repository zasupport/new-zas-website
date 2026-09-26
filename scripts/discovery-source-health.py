#!/usr/bin/env python3
# ======================================================================
# CLAUDE-CODE-INJECTION
#   operation: create-new-file
#   target_path: scripts/discovery-source-health.py
#   permissions: "0755"
#   create_parent_dirs: true
#   overwrite_if_exists: false
#   backup_if_exists: true
#   post_install_verify: "python3 scripts/discovery-source-health.py --test"
#   rollback_command: "git checkout -- scripts/discovery-source-health.py"
#   hook_governance: lint-v2.sh + secrets.sh (PostToolUse Edit|Write) and
#     test-gate.sh (Stop) govern edits to this file. Beyond that this is a
#     CLI pipeline stage with no Claude lifecycle touchpoint (hook-block-mandate
#     exemption clause, stated explicitly): its equivalent controls are this
#     script's own --test (positive/negative/absence) executed by
#     scripts/smoke-seo-pipeline.sh, which records evidence in the repo.
# END-CLAUDE-CODE-INJECTION
# ======================================================================
"""discovery-source-health.py — Commercial Discovery source-health surface.

Reuses the daily-seo collect-manifest (single source of truth for source state) and reports the
health of every source the discovery engine depends on, so no discovery claim is made from a
blocked/absent source without saying so (§313/§514/§374).

  --check --run-id ID    report FRESH/STALE/BLOCKED/MISSING per source + overall verdict
  --test                 positive / blocked-not-silent / absence
"""

import sys
import os
import json
import argparse
from pathlib import Path

HOME = Path(os.path.expanduser("~"))
ROOT = Path(os.environ.get("ZA_DAILY_SEO_ROOT", HOME / ".za-daily-seo"))


def check(run_id):
    man = ROOT / "runs" / run_id / "collect-manifest.json"
    if not man.exists():
        print(f"BLOCKED: no collect-manifest for run {run_id}")
        return 2
    m = json.loads(man.read_text())
    sources = m.get("sources", {})
    d = ROOT / "runs" / run_id / "discovery"
    d.mkdir(parents=True, exist_ok=True)
    verdict = "OK"
    blocked = [n for n, h in sources.items() if h.get("state") == "BLOCKED"]
    if blocked:
        verdict = "DEGRADED"
    out = {
        "run_id": run_id,
        "verdict": verdict,
        "sources": {
            n: {
                "state": h.get("state"),
                "reason": h.get("reason"),
                "invocation": h.get("invocation"),
            }
            for n, h in sources.items()
        },
        "blocked": blocked,
    }
    (d / "source-health.json").write_text(json.dumps(out, indent=2))
    print(f"discovery source-health {run_id}: {verdict}")
    for n, h in sources.items():
        st = h.get("state")
        extra = f" | {h.get('invocation')}" if st == "BLOCKED" else ""
        print(f"  {n:14s} {st}{extra}")
    return 0 if verdict == "OK" else 3


def selftest():
    import tempfile
    import shutil

    fails = 0
    td = Path(tempfile.mkdtemp())
    global ROOT
    _root = ROOT
    ROOT = td
    rid = "T"
    rd = td / "runs" / rid
    rd.mkdir(parents=True)
    (rd / "collect-manifest.json").write_text(
        json.dumps(
            {
                "sources": {
                    "gsc_pages": {"state": "FRESH"},
                    "ga4": {
                        "state": "BLOCKED",
                        "reason": "closed",
                        "invocation": "mcp__google-analytics runReport",
                    },
                }
            }
        )
    )
    rc = check(rid)
    out = json.loads((rd / "discovery" / "source-health.json").read_text())
    ok1 = rc == 3 and out["verdict"] == "DEGRADED" and "ga4" in out["blocked"]
    print("  PASS positive: mixed health -> DEGRADED, ga4 flagged" if ok1 else "  FAIL positive")
    fails |= 0 if ok1 else 1
    ok2 = out["sources"]["ga4"]["invocation"] == "mcp__google-analytics runReport"
    print(
        "  PASS blocked-not-silent: BLOCKED source carries exact invocation"
        if ok2
        else "  FAIL blocked-not-silent"
    )
    fails |= 0 if ok2 else 1
    ok3 = check("NOPE") == 2
    print("  PASS absence: missing manifest -> BLOCKED rc2" if ok3 else "  FAIL absence")
    fails |= 0 if ok3 else 1
    ROOT = _root
    shutil.rmtree(td, ignore_errors=True)
    print("SELFTEST PASS" if fails == 0 else "SELFTEST FAIL")
    return fails


def main():
    ap = argparse.ArgumentParser(description="Commercial discovery source health")
    ap.add_argument("--check", action="store_true")
    ap.add_argument("--run-id", default=None)
    ap.add_argument("--test", action="store_true")
    a = ap.parse_args()
    if a.test:
        sys.exit(selftest())
    if not a.run_id:
        print("usage: --check --run-id ID")
        sys.exit(2)
    sys.exit(check(a.run_id))


if __name__ == "__main__":
    main()
