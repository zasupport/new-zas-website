#!/usr/bin/env python3
# CLAUDE-CODE-INJECTION:
#   target_path: scripts/discovery-operationalization-check.py
#   permissions: 0644
#   create_parent_dirs: true
#   overwrite_if_exists: true
#   backup_if_exists: true
#   post_install_verify: test -e scripts/discovery-operationalization-check.py
#   rollback_command: git checkout -- scripts/discovery-operationalization-check.py
"""discovery-operationalization-check.py — WORKSTREAM 9: OPERATIONALIZATION_EVIDENCE_ENGINE.

Every new or updated concept/rule/subsystem must be WIRED, not prose. This checks each item's wiring
against real files on disk and emits a status: WIRED | PARTIALLY_WIRED | NOT_YET_WIRED | BLOCKED.
Fail-closed: a prose-only item (no script) is NOT_YET_WIRED, never silently "done".

Wiring proof for a subsystem item = (1) its script exists, (2) the script exposes a --test,
(3) the aggregate test harness references it.

  --check [--items PATH]   default items = the commercial-discovery subsystems
  --test                   positive(wired) / not-yet-wired(prose only) / partially(no test ref)
"""

import sys
import os
import json
import argparse
from pathlib import Path
from datetime import datetime, timezone

HOME = Path(os.path.expanduser("~"))
REPO = Path(os.environ.get("ZA_REPO", Path(__file__).resolve().parent.parent))
SCRIPTS = REPO / "scripts"
HARNESS = SCRIPTS / "test-commercial-discovery.py"

DEFAULT_ITEMS = [
    {"item": "DOUBLE_SELF_GAP_ANALYSIS_ENGINE", "script": "discovery-self-gap-merge.py"},
    {"item": "MULTI_FACTOR_PRIORITIZATION_MODEL", "script": "discovery-score.py"},
    {"item": "DECISION_ENGINE_INVARIANT", "script": "discovery-decision.py"},
    {"item": "NEXT_STEP_AUTOBUILD_ENGINE", "script": "discovery-next-step.py"},
    {"item": "RELATED_KEYWORD_INTENT_EXPANSION", "script": "discovery-keyword-intent-expand.py"},
    {"item": "GAP_DETECTION", "script": "discovery-gap-detect.py"},
    {"item": "LANE_TAGGING_SNAPSHOT", "script": "discovery-snapshot.py"},
    {"item": "SOURCE_HEALTH", "script": "discovery-source-health.py"},
    {
        "item": "OPERATIONALIZATION_EVIDENCE_ENGINE",
        "script": "discovery-operationalization-check.py",
    },
    {"item": "COMMERCIAL_DISCOVERY_REPORT", "script": "discovery-report.py"},
]


def now_utc():
    return datetime.now(timezone.utc)


def wiring_status(item):
    script = SCRIPTS / item["script"]
    if not script.exists():
        return "NOT_YET_WIRED", "script absent (prose-only)"
    body = script.read_text(errors="replace")
    has_test = "--test" in body
    referenced = HARNESS.exists() and item["script"] in HARNESS.read_text(errors="replace")
    if has_test and referenced:
        return "WIRED", "script + --test + referenced by aggregate harness"
    if has_test and not referenced:
        return "PARTIALLY_WIRED", "has --test but not referenced by aggregate harness"
    return "PARTIALLY_WIRED", "script exists but no --test"


def check(items_path):
    items = json.loads(Path(items_path).read_text()) if items_path else DEFAULT_ITEMS
    rows = []
    for it in items:
        status, why = wiring_status(it)
        rows.append(
            {
                "item": it["item"],
                "script": it["script"],
                "status": status,
                "evidence": why,
                "fail_closed": status == "NOT_YET_WIRED",
            }
        )
    counts = {}
    for r in rows:
        counts[r["status"]] = counts.get(r["status"], 0) + 1
    out = {
        "generated_utc": now_utc().isoformat(),
        "NEW_OR_UPDATED_ITEMS": [r["item"] for r in rows],
        "WIRING_STATUS_BY_ITEM": rows,
        "ENCODING_TARGETS": "scripts/discovery-*.py + docs/operating-system/commercial-discovery/*",
        "TEST_OR_CHECK_REQUIREMENTS": "each script --test referenced by scripts/test-commercial-discovery.py",
        "PROPAGATION_STATUS": counts,
        "REMAINING_GAPS": [r["item"] for r in rows if r["status"] != "WIRED"],
    }
    print("operationalization-check: " + " ".join(f"{k}={v}" for k, v in counts.items()))
    for r in rows:
        print(f"  {r['status']:16s} {r['item']} ({r['script']})")
    # exit non-zero if anything prose-only (fail-closed surfacing)
    return 0 if not any(r["status"] == "NOT_YET_WIRED" for r in rows) else 3, out


def selftest():
    import tempfile
    import shutil

    fails = 0
    td = Path(tempfile.mkdtemp())
    global SCRIPTS, HARNESS
    _s, _h = SCRIPTS, HARNESS
    SCRIPTS = td
    HARNESS = td / "test-commercial-discovery.py"
    # WIRED item: script with --test + referenced by harness
    (td / "wired.py").write_text("# has --test\n")
    HARNESS.write_text("wired.py partial.py\n")
    # PARTIALLY: script with --test but NOT referenced
    (td / "partial.py").write_text("# has --test\n")
    # remove reference to partial for the partially case
    HARNESS.write_text("wired.py\n")
    items = td / "items.json"
    items.write_text(
        json.dumps(
            [
                {"item": "WIRED_ONE", "script": "wired.py"},
                {"item": "PARTIAL_ONE", "script": "partial.py"},
                {"item": "PROSE_ONLY", "script": "does-not-exist.py"},
            ]
        )
    )
    rc, out = check(str(items))
    st = {r["item"]: r["status"] for r in out["WIRING_STATUS_BY_ITEM"]}
    ok1 = st["WIRED_ONE"] == "WIRED"
    print("  PASS positive: script+test+harness-ref -> WIRED" if ok1 else f"  FAIL positive: {st}")
    fails |= 0 if ok1 else 1
    ok2 = st["PARTIAL_ONE"] == "PARTIALLY_WIRED"
    print(
        "  PASS partial: has --test but unreferenced -> PARTIALLY_WIRED"
        if ok2
        else "  FAIL partial"
    )
    fails |= 0 if ok2 else 1
    ok3 = st["PROSE_ONLY"] == "NOT_YET_WIRED" and rc == 3
    print(
        "  PASS not-yet-wired: absent script -> NOT_YET_WIRED + fail-closed rc3 (never silently done)"
        if ok3
        else "  FAIL not-yet-wired"
    )
    fails |= 0 if ok3 else 1
    SCRIPTS, HARNESS = _s, _h
    shutil.rmtree(td, ignore_errors=True)
    print("SELFTEST PASS" if fails == 0 else "SELFTEST FAIL")
    return fails


def main():
    ap = argparse.ArgumentParser(description="Operationalization evidence check")
    ap.add_argument("--check", action="store_true")
    ap.add_argument("--items", default=None)
    ap.add_argument("--run-id", default=None)
    ap.add_argument("--test", action="store_true")
    a = ap.parse_args()
    if a.test:
        sys.exit(selftest())
    rc, out = check(a.items)
    if a.run_id:
        d = (
            Path(os.environ.get("ZA_DAILY_SEO_ROOT", HOME / ".za-daily-seo"))
            / "runs"
            / a.run_id
            / "discovery"
        )
        d.mkdir(parents=True, exist_ok=True)
        (d / "operationalization.json").write_text(json.dumps(out, indent=2))
    sys.exit(rc)


if __name__ == "__main__":
    main()
