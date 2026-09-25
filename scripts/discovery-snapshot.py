#!/usr/bin/env python3
# ======================================================================
# CLAUDE-CODE-INJECTION
#   operation: create-new-file
#   target_path: scripts/discovery-snapshot.py
#   permissions: "0755"
#   create_parent_dirs: true
#   overwrite_if_exists: false
#   backup_if_exists: true
#   post_install_verify: "python3 scripts/discovery-snapshot.py --test"
#   rollback_command: "git checkout -- scripts/discovery-snapshot.py"
#   hook_governance: lint-v2.sh + secrets.sh (PostToolUse Edit|Write) and
#     test-gate.sh (Stop) govern edits to this file. Beyond that this is a
#     CLI pipeline stage with no Claude lifecycle touchpoint (hook-block-mandate
#     exemption clause, stated explicitly): its equivalent controls are this
#     script's own --test (positive/negative/absence) executed by
#     scripts/smoke-seo-pipeline.sh, which records evidence in the repo.
# END-CLAUDE-CODE-INJECTION
# ======================================================================
"""discovery-snapshot.py — Commercial Discovery Stage 1.

Reuses the Daily SEO Intelligence normalized snapshot (~/.za-daily-seo/runs/<id>/normalized.json)
and tags each page/query into the four-lane + Lane E commercial architecture (commercial-contract.json).
Pages with demand (impressions) that map to NO lane become Lane E discovery candidates.

No fabrication: a page's lane tag is INFERENCE from slug/title; its metrics are OBSERVED_FACT from GSC.
Writes runs/<id>/discovery/snapshot.json.

  --snapshot --run-id ID    tag the run's pages into lanes
  --test                    positive / lane-E-discovery / absence controls
"""

import sys
import os
import json
import argparse
import re
from pathlib import Path
from datetime import datetime, timezone

HOME = Path(os.path.expanduser("~"))
ROOT = Path(os.environ.get("ZA_DAILY_SEO_ROOT", HOME / ".za-daily-seo"))

LANE_PATTERNS = {
    "A": r"(iphone|ipad|airpod|apple-watch|imessage|icloud)",
    "B": r"(macbook|imac|mac-mini|mac-pro|logic-board|liquid|screen|battery|keyboard|mac-repair|display)",
    "C": r"(managed|m365|microsoft|entra|intune|unifi|network|enterprise|sme|business|windows|server|migration|365)",
    "D": r"(maintenance|contract|retainer|sla|support-plan|managed-services)",
    "E": r"(forensic|incident|compromise|breach|data-recovery|ransomware|malware|hacked)",
}


def now_utc():
    return datetime.now(timezone.utc)


def tag_lane(path):
    s = (path or "").lower()
    for lane, pat in LANE_PATTERNS.items():
        if re.search(pat, s):
            return lane, "INFERENCE"
    return "UNMAPPED", "INFERENCE"


def snapshot(run_id):
    norm_p = ROOT / "runs" / run_id / "normalized.json"
    if not norm_p.exists():
        print(f"BLOCKED: no normalized.json for run {run_id} (run the daily-seo pipeline first)")
        return 2
    norm = json.loads(norm_p.read_text())
    gsc = norm.get("gsc_pages") or []
    live_urls = {p.get("url") for p in (norm.get("siteprobe") or [])}
    lanes = {k: [] for k in list(LANE_PATTERNS) + ["UNMAPPED"]}
    discovery_candidates = []
    for r in gsc:
        page = r.get("page", "")
        lane, label = tag_lane(page)
        rec = {
            "page": page,
            "lane": lane,
            "lane_label": label,
            "clicks": r.get("clicks", 0),
            "impressions": r.get("impressions", 0),
            "position": r.get("position", 0),
            "live_probed": page in live_urls,
        }
        lanes[lane].append(rec)
        if lane == "UNMAPPED" and r.get("impressions", 0) >= 50:
            discovery_candidates.append(rec)  # demand with no commercial home => Lane E candidate
    out = {
        "run_id": run_id,
        "generated_utc": now_utc().isoformat(),
        "lane_counts": {k: len(v) for k, v in lanes.items()},
        "lane_impressions": {k: sum(x["impressions"] for x in v) for k, v in lanes.items()},
        "lanes": lanes,
        "lane_E_discovery_candidates": discovery_candidates,
        "note": "Lane tags are INFERENCE from slug/title; metrics are OBSERVED_FACT from GSC. "
        "UNMAPPED demand is a Lane E candidate, not an asserted service.",
    }
    d = ROOT / "runs" / run_id / "discovery"
    d.mkdir(parents=True, exist_ok=True)
    (d / "snapshot.json").write_text(json.dumps(out, indent=2))
    print(f"discovery snapshot {run_id}:")
    for k in list(LANE_PATTERNS) + ["UNMAPPED"]:
        print(f"  lane {k}: {out['lane_counts'][k]:>4} pages, {out['lane_impressions'][k]:>7} impr")
    print(f"  Lane E discovery candidates (unmapped demand >=50 impr): {len(discovery_candidates)}")
    print(f"  -> {d}/snapshot.json")
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
    rd = td / "runs" / rid
    rd.mkdir(parents=True)
    (rd / "normalized.json").write_text(
        json.dumps(
            {
                "gsc_pages": [
                    {
                        "page": "https://zasupport.com/iphone-screen-repair",
                        "clicks": 5,
                        "impressions": 900,
                        "position": 4,
                    },
                    {
                        "page": "https://zasupport.com/logic-board-repair",
                        "clicks": 2,
                        "impressions": 800,
                        "position": 6,
                    },
                    {
                        "page": "https://zasupport.com/managed-services",
                        "clicks": 1,
                        "impressions": 300,
                        "position": 9,
                    },
                    {
                        "page": "https://zasupport.com/data-recovery-forensics",
                        "clicks": 0,
                        "impressions": 120,
                        "position": 12,
                    },
                    {
                        "page": "https://zasupport.com/some-unexpected-thing",
                        "clicks": 0,
                        "impressions": 200,
                        "position": 15,
                    },
                ],
                "siteprobe": [],
            }
        )
    )
    rc = snapshot(rid)
    out = json.loads((rd / "discovery" / "snapshot.json").read_text())
    # POSITIVE: known slugs map to A/B/C/E
    ok1 = (
        rc == 0
        and out["lane_counts"]["A"] == 1
        and out["lane_counts"]["B"] == 1
        and out["lane_counts"]["C"] == 1
        and out["lane_counts"]["E"] == 1
    )
    print(
        "  PASS positive: iphone->A, logic-board->B, managed->C, forensics->E"
        if ok1
        else f"  FAIL positive: {out['lane_counts']}"
    )
    fails |= 0 if ok1 else 1
    # LANE-E DISCOVERY: the unmapped 200-impr page becomes a discovery candidate
    ok2 = any("some-unexpected-thing" in c["page"] for c in out["lane_E_discovery_candidates"])
    print(
        "  PASS lane-E: unmapped demand surfaced as discovery candidate (not asserted as a service)"
        if ok2
        else "  FAIL lane-E"
    )
    fails |= 0 if ok2 else 1
    # ABSENCE
    ok3 = snapshot("NOPE") == 2
    print("  PASS absence: missing normalized.json -> BLOCKED rc2" if ok3 else "  FAIL absence")
    fails |= 0 if ok3 else 1
    ROOT = _root
    shutil.rmtree(td, ignore_errors=True)
    print("SELFTEST PASS" if fails == 0 else "SELFTEST FAIL")
    return fails


def main():
    ap = argparse.ArgumentParser(description="Commercial discovery snapshot (lane tagging)")
    ap.add_argument("--snapshot", action="store_true")
    ap.add_argument("--run-id", default=None)
    ap.add_argument("--test", action="store_true")
    a = ap.parse_args()
    if a.test:
        sys.exit(selftest())
    if not a.run_id:
        print("usage: --snapshot --run-id ID")
        sys.exit(2)
    sys.exit(snapshot(a.run_id))


if __name__ == "__main__":
    main()
