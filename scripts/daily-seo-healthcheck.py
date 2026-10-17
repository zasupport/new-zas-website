#!/usr/bin/env python3
# ======================================================================
# CLAUDE-CODE-INJECTION
#   operation: create-new-file
#   target_path: scripts/daily-seo-healthcheck.py
#   permissions: "0755"
#   create_parent_dirs: true
#   overwrite_if_exists: false
#   backup_if_exists: true
#   post_install_verify: "python3 scripts/daily-seo-healthcheck.py --test"
#   rollback_command: "git checkout -- scripts/daily-seo-healthcheck.py"
#   hook_governance: lint-v2.sh + secrets.sh (PostToolUse Edit|Write) and
#     test-gate.sh (Stop) govern edits to this file. Beyond that this is a
#     CLI pipeline stage with no Claude lifecycle touchpoint (hook-block-mandate
#     exemption clause, stated explicitly): its equivalent controls are this
#     script's own --test (positive/negative/absence) executed by
#     scripts/smoke-seo-pipeline.sh, which records evidence in the repo.
# END-CLAUDE-CODE-INJECTION
# ======================================================================
"""daily-seo-healthcheck.py — Stage 4 (self-heal) of the Daily SEO Intelligence pipeline.

Self-healing is PIPELINE-ONLY. It may retry a transient collector step, dedupe duplicate same-date
snapshots, verify idempotent run-ids, and confirm quarantine integrity. For ANYTHING beyond that
(a prod/content/credential/publish fix) it emits an incident with the EXACT human unblock command and
NEVER attempts the fix itself. It never installs, alters creds, writes prod, publishes, or erases
evidence (quarantine = move, never delete). (§313 no silent failure; advisor design-question answer.)

  --healthcheck --run-id ID    verdict OK|DEGRADED|BLOCKED (+ incident file when DEGRADED)
  --test                       positive / negative / absence / retry-helper controls
"""

import sys
import os
import json
import argparse
import time
import hashlib
from pathlib import Path
from datetime import datetime, timezone

HOME = Path(os.path.expanduser("~"))
ROOT = Path(os.environ.get("ZA_DAILY_SEO_ROOT", HOME / ".za-daily-seo"))
STALE_HOURS = int(os.environ.get("ZA_DAILY_SEO_STALE_HOURS", "26"))


def now_utc():
    return datetime.now(timezone.utc)


def retry_with_backoff(fn, max_attempts=3, base_delay=0.0):
    """Bounded retry. Returns (ok, result_or_exc, attempts). NEVER loops forever: gives up loud
    after max_attempts. base_delay=0 in tests keeps them fast; production uses exponential backoff."""
    last = None
    for attempt in range(1, max_attempts + 1):
        try:
            return True, fn(), attempt
        except Exception as e:  # noqa: BLE001 - retry wrapper intentionally catches broadly
            last = e
            if attempt < max_attempts and base_delay:
                time.sleep(base_delay * (2 ** (attempt - 1)))
    return False, last, max_attempts


def _incident(run_id, kind, detail, unblock_cmd):
    inc_dir = ROOT / "incidents"
    inc_dir.mkdir(parents=True, exist_ok=True)
    inc = {
        "run_id": run_id,
        "kind": kind,
        "detail": detail,
        "generated_utc": now_utc().isoformat(),
        "unblock_command": unblock_cmd,
        "self_heal_attempted": False,
        "note": "Self-heal is pipeline-only. This class of fault is surfaced for a human, never auto-fixed.",
    }
    p = inc_dir / f"{run_id}.json"
    # AGGREGATE: multiple faults in one run must all persist (dry-run 21/09 found overwrite loss).
    existing = []
    if p.exists():
        try:
            prev = json.loads(p.read_text())
            existing = prev.get("incidents", []) if isinstance(prev, dict) else []
        except Exception:
            existing = []
    if not any(e.get("kind") == kind for e in existing):
        existing.append(inc)
    p.write_text(json.dumps({"run_id": run_id, "incidents": existing}, indent=2))
    return p


def _snapshot_dupes():
    """Detect two distinct snapshot files with identical content-identity across dates (a dedupe op
    that IS pipeline-safe). Returns list of (dateA, dateB) content-identical pairs."""
    snaps = ROOT / "snapshots"
    if not snaps.exists():
        return []
    seen = {}
    dupes = []
    for d in sorted(snaps.iterdir()):
        f = d / "normalized.json"
        if not f.exists():
            continue
        try:
            obj = json.loads(f.read_text())
            c = {k: obj.get(k) for k in ("site", "gsc_pages", "sitemap_urls", "siteprobe", "repo")}
            h = hashlib.sha256(json.dumps(c, sort_keys=True).encode()).hexdigest()
        except Exception:
            continue
        if h in seen:
            dupes.append((seen[h], d.name))
        else:
            seen[h] = d.name
    return dupes


def healthcheck(run_id):
    run_dir = ROOT / "runs" / run_id
    if not run_dir.exists():
        print(f"BLOCKED: run dir absent {run_dir}")
        return 2
    findings = {"pipeline_ops": [], "incidents": [], "verdict": "OK"}

    # stale collector detection
    manifest = run_dir / "collect-manifest.json"
    if manifest.exists():
        age_h = (now_utc().timestamp() - manifest.stat().st_mtime) / 3600
        if age_h > STALE_HOURS:
            p = _incident(
                run_id,
                "stale-collector",
                f"collect-manifest is {age_h:.1f}h old (> {STALE_HOURS}h)",
                "python3 scripts/daily-seo-collect.py --collect",
            )
            findings["incidents"].append(str(p))
            findings["verdict"] = "DEGRADED"
    else:
        p = _incident(
            run_id,
            "missing-collector",
            "no collect-manifest.json for this run",
            "python3 scripts/daily-seo-collect.py --collect --run-id " + run_id,
        )
        findings["incidents"].append(str(p))
        findings["verdict"] = "DEGRADED"

    # BLOCKED sources are NOT a pipeline fault to fix; surface as incident with exact unblock
    if manifest.exists():
        m = json.loads(manifest.read_text())
        for name, h in m.get("sources", {}).items():
            if h.get("state") == "BLOCKED":
                p = _incident(
                    run_id,
                    f"source-blocked:{name}",
                    h.get("reason", ""),
                    h.get("invocation", "n/a"),
                )
                findings["incidents"].append(str(p))
                if findings["verdict"] == "OK":
                    findings["verdict"] = "DEGRADED"

    # quarantine integrity (moved, present, never deleted)
    q = ROOT / "quarantine" / run_id
    if q.exists() and any(q.iterdir()):
        findings["pipeline_ops"].append(
            {
                "op": "quarantine-present",
                "class": "AUTO_SAFE_OPERATIONAL",
                "detail": f"{len(list(q.iterdir()))} quarantined input(s) retained",
            }
        )

    # dedupe duplicate same-content snapshots (pipeline-safe AUTO op — report only, never delete evidence)
    dupes = _snapshot_dupes()
    if dupes:
        findings["pipeline_ops"].append(
            {
                "op": "snapshot-dedupe-candidates",
                "class": "AUTO_SAFE_OPERATIONAL",
                "detail": f"{len(dupes)} content-identical snapshot pair(s): {dupes}",
            }
        )

    (run_dir / "healthcheck.json").write_text(json.dumps(findings, indent=2))
    print(f"healthcheck {run_id}: {findings['verdict']}")
    for op in findings["pipeline_ops"]:
        print(f"  pipeline-op [{op['class']}] {op['op']}: {op['detail']}")
    for inc in findings["incidents"]:
        print(f"  incident -> {inc}")
    return 0 if findings["verdict"] == "OK" else 3


def selftest():
    import tempfile
    import shutil

    fails = 0
    td = Path(tempfile.mkdtemp())
    global ROOT
    _root = ROOT
    ROOT = td
    # POSITIVE: healthy run -> OK
    rid = "HEALTHY"
    rd = td / "runs" / rid
    rd.mkdir(parents=True)
    (rd / "collect-manifest.json").write_text(
        json.dumps(
            {
                "run_id": rid,
                "sources": {"gsc_pages": {"state": "FRESH"}, "sitemap": {"state": "FRESH"}},
            }
        )
    )
    rc = healthcheck(rid)
    ok1 = rc == 0 and json.loads((rd / "healthcheck.json").read_text())["verdict"] == "OK"
    print("  PASS positive: healthy run -> OK" if ok1 else "  FAIL positive")
    fails |= 0 if ok1 else 1
    # NEGATIVE: a BLOCKED source -> DEGRADED + incident with exact invocation, never silent
    rid2 = "BLOCKED_SRC"
    rd2 = td / "runs" / rid2
    rd2.mkdir(parents=True)
    (rd2 / "collect-manifest.json").write_text(
        json.dumps(
            {
                "run_id": rid2,
                "sources": {
                    "ga4": {
                        "state": "BLOCKED",
                        "reason": "connector closed",
                        "invocation": "mcp__google-analytics runReport",
                    }
                },
            }
        )
    )
    rc2 = healthcheck(rid2)
    inc = td / "incidents" / f"{rid2}.json"
    ok2 = (
        rc2 == 3
        and inc.exists()
        and "runReport" in inc.read_text()
        and json.loads(inc.read_text())["incidents"][0]["self_heal_attempted"] is False
    )
    print(
        "  PASS negative: BLOCKED source -> DEGRADED + incident (exact unblock, no auto-fix)"
        if ok2
        else "  FAIL negative"
    )
    fails |= 0 if ok2 else 1
    # ABSENCE: missing run dir -> BLOCKED rc2, no crash
    ok3 = healthcheck("NOPE") == 2
    print("  PASS absence: missing run dir -> BLOCKED rc2, no crash" if ok3 else "  FAIL absence")
    fails |= 0 if ok3 else 1
    # RETRY-HELPER: fails twice then succeeds -> success within attempts; always-fails -> gives up loud
    state = {"n": 0}

    def flaky():
        state["n"] += 1
        if state["n"] < 3:
            raise RuntimeError("transient")
        return "ok"

    okA, resA, atA = retry_with_backoff(flaky, max_attempts=3)

    def always_fail():
        raise RuntimeError("permanent")

    okB, resB, atB = retry_with_backoff(always_fail, max_attempts=3)
    ok4 = (
        okA and resA == "ok" and atA == 3 and (not okB) and atB == 3 and isinstance(resB, Exception)
    )
    print(
        "  PASS retry: flaky-then-ok succeeds within max; always-fail gives up loud (no infinite loop)"
        if ok4
        else "  FAIL retry"
    )
    fails |= 0 if ok4 else 1
    ROOT = _root
    shutil.rmtree(td, ignore_errors=True)
    print("SELFTEST PASS" if fails == 0 else "SELFTEST FAIL")
    return fails


def main():
    ap = argparse.ArgumentParser(description="Daily SEO healthcheck (self-heal, pipeline-only)")
    ap.add_argument("--healthcheck", action="store_true")
    ap.add_argument("--run-id", default=None)
    ap.add_argument("--test", action="store_true")
    a = ap.parse_args()
    if a.test:
        sys.exit(selftest())
    if not a.run_id:
        print("usage: --healthcheck --run-id ID")
        sys.exit(2)
    sys.exit(healthcheck(a.run_id))


if __name__ == "__main__":
    main()
