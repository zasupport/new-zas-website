#!/usr/bin/env python3
# ======================================================================
# CLAUDE-CODE-INJECTION
#   operation: create-new-file
#   target_path: scripts/daily-seo-normalize.py
#   permissions: "0755"
#   create_parent_dirs: true
#   overwrite_if_exists: false
#   backup_if_exists: true
#   post_install_verify: "python3 scripts/daily-seo-normalize.py --test"
#   rollback_command: "git checkout -- scripts/daily-seo-normalize.py"
#   hook_governance: lint-v2.sh + secrets.sh (PostToolUse Edit|Write) and
#     test-gate.sh (Stop) govern edits to this file. Beyond that this is a
#     CLI pipeline stage with no Claude lifecycle touchpoint (hook-block-mandate
#     exemption clause, stated explicitly): its equivalent controls are this
#     script's own --test (positive/negative/absence) executed by
#     scripts/smoke-seo-pipeline.sh, which records evidence in the repo.
# END-CLAUDE-CODE-INJECTION
# ======================================================================
"""daily-seo-normalize.py — Stage 2 of the Daily SEO Intelligence pipeline.

Reads a run's raw evidence and produces a normalized, date-keyed snapshot.
Design invariants:
  - UNAVAILABLE != ZERO. A source that was BLOCKED/MISSING is carried through with its health, never
    coerced to an empty list that later reads as "we measured zero" (§313/§374).
  - Append-only, date-keyed. snapshots/<date>/normalized.json is the period-vs-period substrate.
  - Idempotent. Re-running the same date REPLACES that date's snapshot atomically (tmp + os.replace),
    never duplicates and never truncates-in-place (§573).
  - Malformed input is QUARANTINED (moved, not deleted), and recorded — never silently dropped.

  --normalize --run-id ID     normalize that run; write run + date snapshot
  --test                      controls: valid / malformed-quarantine / unavailable-not-zero / idempotent
"""

import sys
import os
import json
import argparse
import shutil
import hashlib
from pathlib import Path
from datetime import datetime, timezone

HOME = Path(os.path.expanduser("~"))
ROOT = Path(os.environ.get("ZA_DAILY_SEO_ROOT", HOME / ".za-daily-seo"))


def now_utc():
    return datetime.now(timezone.utc)


def _load_json_or_quarantine(path, quarantine_dir, quarantined):
    """Return parsed JSON, or None and move the file to quarantine (never discard)."""
    if not path.exists():
        return None
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception as e:
        quarantine_dir.mkdir(parents=True, exist_ok=True)
        dest = quarantine_dir / f"{path.name}.{now_utc().strftime('%Y%m%dT%H%M%SZ')}"
        shutil.move(str(path), str(dest))
        quarantined.append({"file": str(path), "moved_to": str(dest), "error": str(e)})
        return None


def normalize(run_id):
    run_dir = ROOT / "runs" / run_id
    raw = run_dir / "raw"
    manifest_p = run_dir / "collect-manifest.json"
    if not manifest_p.exists():
        print(f"BLOCKED: no collect-manifest for run {run_id} at {manifest_p} — run collect first")
        return 2
    manifest = json.loads(manifest_p.read_text(encoding="utf-8"))
    quarantined = []
    qdir = ROOT / "quarantine" / run_id

    gsc = _load_json_or_quarantine(raw / "gsc_pages.json", qdir, quarantined)
    sitemap = _load_json_or_quarantine(raw / "sitemap.json", qdir, quarantined)
    probe = _load_json_or_quarantine(raw / "siteprobe.json", qdir, quarantined)
    repo = _load_json_or_quarantine(raw / "repo.json", qdir, quarantined)

    health = manifest.get("sources", {})

    # UNAVAILABLE != ZERO: only present a data list when the source was actually FRESH.
    def present(state):
        return state == "FRESH"

    date = now_utc().strftime("%Y-%m-%d")
    norm = {
        "run_id": run_id,
        "date": date,
        "generated_utc": now_utc().isoformat(),
        "site": manifest.get("site"),
        "gsc_pages": gsc if present(health.get("gsc_pages", {}).get("state")) else None,
        "sitemap_urls": sitemap if present(health.get("sitemap", {}).get("state")) else None,
        "siteprobe": probe if present(health.get("live_site", {}).get("state")) else None,
        "repo": repo if present(health.get("repo", {}).get("state")) else None,
        "source_health": health,
        "quarantined": quarantined,
    }
    # counts stated only where the source is real; absent sources report their state, not 0
    norm["counts"] = {
        "gsc_pages": len(gsc)
        if isinstance(gsc, list)
        else health.get("gsc_pages", {}).get("state", "UNKNOWN"),
        "sitemap_urls": len(sitemap)
        if isinstance(sitemap, list)
        else health.get("sitemap", {}).get("state", "UNKNOWN"),
        "siteprobe": len(probe)
        if isinstance(probe, list)
        else health.get("live_site", {}).get("state", "UNKNOWN"),
        "repo_sitemap_ts_urls": (repo or {}).get("sitemap_ts_url_count")
        if repo
        else health.get("repo", {}).get("state", "UNKNOWN"),
    }

    payload = json.dumps(norm, indent=2)
    (run_dir / "normalized.json").write_text(payload)

    # date-keyed snapshot, idempotent atomic replace.
    # IDENTITY = the DATA content only. run_id/generated_utc/quarantined are per-run operational
    # metadata and must NOT make an otherwise-identical day look "changed".
    def content_identity(d):
        c = {
            k: d.get(k)
            for k in (
                "date",
                "site",
                "gsc_pages",
                "sitemap_urls",
                "siteprobe",
                "repo",
                "counts",
                "source_health",
            )
        }
        return hashlib.sha256(json.dumps(c, sort_keys=True).encode()).hexdigest()

    snap_dir = ROOT / "snapshots" / date
    snap_dir.mkdir(parents=True, exist_ok=True)
    snap = snap_dir / "normalized.json"
    dup = False
    if snap.exists():
        try:
            dup = content_identity(json.loads(snap.read_text())) == content_identity(norm)
        except Exception:
            dup = False
    if not dup:
        tmp = snap.with_suffix(".json.tmp")
        tmp.write_text(payload)
        os.replace(tmp, snap)  # atomic; earlier snapshot intact until this instant

    print(f"normalized run {run_id} (date {date})")
    for k, v in norm["counts"].items():
        print(f"  {k:26s} {v}")
    if quarantined:
        print(
            f"  ⚠ quarantined {len(quarantined)} malformed input(s) -> {qdir} (moved, not deleted)"
        )
    print(f"  snapshot {'UNCHANGED (idempotent)' if dup else 'written'} -> {snap}")
    return 0


def selftest():
    import tempfile

    fails = 0
    td = Path(tempfile.mkdtemp())
    global ROOT
    _root = ROOT
    ROOT = td
    rid = "TESTRUN"
    raw = td / "runs" / rid / "raw"
    raw.mkdir(parents=True)
    # VALID gsc + a MALFORMED probe + an UNAVAILABLE ga4 (BLOCKED in manifest, no file)
    (raw / "gsc_pages.json").write_text(
        json.dumps([{"page": "p", "clicks": 1, "impressions": 500, "position": 5.0}])
    )
    (raw / "siteprobe.json").write_text("{ this is not valid json ")
    manifest = {
        "run_id": rid,
        "site": "https://zasupport.com",
        "sources": {
            "gsc_pages": {"state": "FRESH", "rows": 1},
            "sitemap": {"state": "BLOCKED", "reason": "HTTP 500"},
            "live_site": {"state": "FRESH"},  # file is malformed though -> must quarantine
            "repo": {"state": "MISSING"},
            "ga4": {"state": "BLOCKED", "reason": "connector closed"},
        },
    }
    (td / "runs" / rid / "collect-manifest.json").write_text(json.dumps(manifest))
    rc = normalize(rid)
    norm = json.loads((td / "runs" / rid / "normalized.json").read_text())
    # VALID control
    ok1 = rc == 0 and norm["gsc_pages"] == [
        {"page": "p", "clicks": 1, "impressions": 500, "position": 5.0}
    ]
    print("  PASS valid: FRESH gsc rows normalized through" if ok1 else "  FAIL valid")
    fails |= 0 if ok1 else 1
    # MALFORMED -> quarantine, not dropped, and probe becomes None
    ok2 = (
        len(norm["quarantined"]) == 1
        and norm["siteprobe"] is None
        and Path(norm["quarantined"][0]["moved_to"]).exists()
    )
    print(
        "  PASS malformed: bad JSON quarantined (moved, file exists), not silently dropped"
        if ok2
        else f"  FAIL malformed: {norm['quarantined']}"
    )
    fails |= 0 if ok2 else 1
    # UNAVAILABLE != ZERO: blocked sitemap must be None + counts show state, never 0
    ok3 = norm["sitemap_urls"] is None and norm["counts"]["sitemap_urls"] == "BLOCKED"
    print(
        "  PASS unavailable!=zero: BLOCKED sitemap -> None + count='BLOCKED', never a fake 0"
        if ok3
        else f"  FAIL unavailable: {norm['counts']}"
    )
    fails |= 0 if ok3 else 1
    # IDEMPOTENT: re-run same date -> snapshot reported UNCHANGED
    import io
    import contextlib

    buf = io.StringIO()
    with contextlib.redirect_stdout(buf):
        normalize(rid)
    ok4 = "UNCHANGED" in buf.getvalue()
    print(
        "  PASS idempotent: same-date re-run -> snapshot UNCHANGED (no duplicate)"
        if ok4
        else "  FAIL idempotent"
    )
    fails |= 0 if ok4 else 1
    ROOT = _root
    shutil.rmtree(td, ignore_errors=True)
    print("SELFTEST PASS" if fails == 0 else "SELFTEST FAIL")
    return fails


def main():
    ap = argparse.ArgumentParser(description="Daily SEO normalize (append-only, idempotent)")
    ap.add_argument("--normalize", action="store_true")
    ap.add_argument("--run-id", default=None)
    ap.add_argument("--test", action="store_true")
    a = ap.parse_args()
    if a.test:
        sys.exit(selftest())
    if not a.run_id:
        print("usage: --normalize --run-id ID")
        sys.exit(2)
    sys.exit(normalize(a.run_id))


if __name__ == "__main__":
    main()
