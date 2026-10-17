#!/usr/bin/env python3
# ======================================================================
# CLAUDE-CODE-INJECTION
#   operation: create-new-file
#   target_path: scripts/test-daily-seo-intelligence.py
#   permissions: "0755"
#   create_parent_dirs: true
#   overwrite_if_exists: false
#   backup_if_exists: true
#   post_install_verify: "python3 scripts/test-daily-seo-intelligence.py --test"
#   rollback_command: "git checkout -- scripts/test-daily-seo-intelligence.py"
#   hook_governance: lint-v2.sh + secrets.sh (PostToolUse Edit|Write) and
#     test-gate.sh (Stop) govern edits to this file. Beyond that this is a
#     CLI pipeline stage with no Claude lifecycle touchpoint (hook-block-mandate
#     exemption clause, stated explicitly): its equivalent controls are this
#     script's own --test (positive/negative/absence) executed by
#     scripts/smoke-seo-pipeline.sh, which records evidence in the repo.
# END-CLAUDE-CODE-INJECTION
# ======================================================================
"""test-daily-seo-intelligence.py — integration + control harness for the Daily SEO pipeline.

Runs:
  1. each stage script's own --test (subprocess),
  2. an OFFLINE fixture matrix through normalize -> analyze -> healthcheck -> report in a temp root,
     covering: valid/missing/quota-fail GSC, GA4-aggregate-blocked, sitemap+canonical discrepancy,
     high-impr-low-CTR, cannibalisation, doorway/duplicate-topic, unsupported-claim rejection, no-action,
  3. the decision negative control (a content-change rec can never be AUTO_SAFE),
  4. a NO-WRITES proof: the shared stores (~/.za-gsc-pages-timeseries.jsonl, shared CSV) are byte-identical
     before and after the whole harness.

  --test    run everything; exit 0 only if ALL pass
"""

import sys
import os
import json
import subprocess
import tempfile
import shutil
import hashlib
import importlib.util
from pathlib import Path

HERE = Path(__file__).resolve().parent
HOME = Path(os.path.expanduser("~"))
SHARED_TS = HOME / ".za-gsc-pages-timeseries.jsonl"
SHARED_CSV = HOME / "Desktop/Claude/Google/SEO/gsc-pages-export.csv"
STAGES = [
    "daily-seo-collect.py",
    "daily-seo-normalize.py",
    "daily-seo-analyze.py",
    "daily-seo-healthcheck.py",
    "daily-seo-report.py",
]


def _load(mod_file):
    spec = importlib.util.spec_from_file_location(
        mod_file.replace("-", "_").replace(".py", ""), HERE / mod_file
    )
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    return m


def _sha(p):
    return hashlib.sha256(p.read_bytes()).hexdigest() if p.exists() else "ABSENT"


def stage_selftests():
    results = []
    for s in STAGES:
        r = subprocess.run(
            [sys.executable, str(HERE / s), "--test"], capture_output=True, text=True
        )
        ok = r.returncode == 0 and "SELFTEST PASS" in r.stdout
        results.append((s, ok))
        print(f"  [{'PASS' if ok else 'FAIL'}] stage selftest: {s}")
    return all(ok for _, ok in results)


def fixture_matrix():
    """Offline: craft a run, normalize -> analyze -> report, assert the matrix classifications."""
    ok = True
    td = Path(tempfile.mkdtemp())
    rid = "MATRIX"
    raw = td / "runs" / rid / "raw"
    raw.mkdir(parents=True)
    # GSC: high-impr-low-CTR (ctr-gap) + a good page (no rec) => valid + no-action both covered
    (raw / "gsc_pages.json").write_text(
        json.dumps(
            [
                {
                    "page": "https://zasupport.com/logic-board-repair",
                    "clicks": 2,
                    "impressions": 1500,
                    "position": 6.0,
                },
                {
                    "page": "https://zasupport.com/good",
                    "clicks": 400,
                    "impressions": 1000,
                    "position": 2.0,
                },
            ]
        )
    )
    # sitemap: a doorway slug + normals
    (raw / "sitemap.json").write_text(
        json.dumps(
            [
                "https://zasupport.com/",
                "https://zasupport.com/logic-board-repair",
                "https://zasupport.com/macbook-pro-repair-price-johannesburg",
            ]
        )
    )
    # siteprobe: missing-canonical(tech-reg), noindex(indexing), off-site canonical, cannibal pair, low-links
    (raw / "siteprobe.json").write_text(
        json.dumps(
            [
                {
                    "url": "https://zasupport.com/logic-board-repair",
                    "status": 200,
                    "canonical": None,
                    "title": "MacBook Logic Board Repair Johannesburg",
                    "meta_description": "d",
                    "h1_count": 1,
                    "internal_link_count": 9,
                    "robots_meta": None,
                    "schema_types": ["Service"],
                },
                {
                    "url": "https://zasupport.com/macbook-logic-board",
                    "status": 200,
                    "canonical": "https://zasupport.com/macbook-logic-board",
                    "title": "MacBook Logic Board Repair Johannesburg",
                    "meta_description": "d2",
                    "h1_count": 1,
                    "internal_link_count": 1,
                    "robots_meta": "noindex",
                    "schema_types": [],
                },
                {
                    "url": "https://zasupport.com/off",
                    "status": 200,
                    "canonical": "https://other.example/x",
                    "title": "Off Canonical",
                    "meta_description": "d3",
                    "h1_count": 1,
                    "internal_link_count": 5,
                },
            ]
        )
    )
    (td / "runs" / rid / "collect-manifest.json").write_text(
        json.dumps(
            {
                "run_id": rid,
                "site": "https://zasupport.com",
                "sources": {
                    "gsc_pages": {"state": "FRESH", "rows": 2},
                    "sitemap": {"state": "FRESH", "count": 3},
                    "live_site": {"state": "FRESH", "sampled": 3},
                    "repo": {"state": "MISSING"},
                    "ga4": {
                        "state": "BLOCKED",
                        "reason": "aggregate connector closed",
                        "invocation": "mcp__google-analytics runReport",
                    },
                    "gsc_pages_quota": {
                        "state": "BLOCKED",
                        "reason": "API error: quota exceeded",
                        "invocation": "searchanalytics().query(...)",
                    },
                },
            }
        )
    )
    env = dict(os.environ, ZA_DAILY_SEO_ROOT=str(td))
    for stage, args in [
        ("daily-seo-normalize.py", ["--normalize", "--run-id", rid]),
        ("daily-seo-analyze.py", ["--analyze", "--run-id", rid]),
        ("daily-seo-report.py", ["--report", "--run-id", rid]),
    ]:
        r = subprocess.run(
            [sys.executable, str(HERE / stage), *args], capture_output=True, text=True, env=env
        )
        if r.returncode not in (0,):
            print(f"  FAIL matrix: {stage} rc={r.returncode} {r.stderr[:200]}")
            ok = False
    opp = json.loads((td / "runs" / rid / "opportunities.json").read_text())
    types = {o["type"] for o in opp["opportunities"]}
    checks = {
        "ctr-gap (high-impr-low-CTR)": "ctr-gap" in types,
        "tech-regression (missing canonical)": "tech-regression" in types,
        "cannibalisation (title overlap)": "cannibalisation" in types,
        "doorway-risk (price slug)": "doorway-risk" in types,
        "indexing-eligibility (noindex/off-site)": "indexing-eligibility" in types,
        "missing-internal-link (low count)": "missing-internal-link" in types,
        "no-action (good page absent from queue)": not any(
            o["target"] == "/good" for o in opp["opportunities"]
        ),
        "every rec HUMAN_REVIEW (none AUTO_SAFE)": all(
            o["decision_class"] != "AUTO_SAFE_OPERATIONAL" for o in opp["opportunities"]
        ),
    }
    md = (td / "reports" / f"daily-seo-{rid}.md").read_text()
    checks["report shows GA4 BLOCKED + exact invocation, no fake metric"] = (
        "runReport" in md and "ga4: BLOCKED" in md
    )
    checks["quota-fail GSC surfaced BLOCKED not zero"] = "quota exceeded" in md
    for name, passed in checks.items():
        print(f"  [{'PASS' if passed else 'FAIL'}] matrix: {name}")
        ok = ok and passed
    shutil.rmtree(td, ignore_errors=True)
    return ok


def unsupported_claim_and_negctrl():
    """Import analyze; assert validator rejects unsupported claims + content rec forced HUMAN_REVIEW."""
    ok = True
    an = _load("daily-seo-analyze.py")
    # unsupported claim: model_proposed record labelled OBSERVED_FACT must be rejected
    bad = {
        "id": "cannibalisation--x",
        "type": "cannibalisation",
        "target": "/x",
        "signal": {},
        "evidence_label": "OBSERVED_FACT",
        "source_ids": ["siteprobe:/x"],
        "decision_class": "HUMAN_REVIEW_REQUIRED",
        "rationale": "r",
        "recommended_review_action": "a",
        "model_proposed": True,
    }
    errs = an.validate_opportunity(bad)
    c1 = "model-proposed-must-be-inference" in errs
    print(
        f"  [{'PASS' if c1 else 'FAIL'}] unsupported-claim: model-proposed record cannot claim OBSERVED_FACT"
    )
    ok = ok and c1
    # empty source_ids rejected
    c2 = "empty-source_ids" in an.validate_opportunity(
        {**bad, "source_ids": [], "model_proposed": False, "evidence_label": "INFERENCE"}
    )
    print(
        f"  [{'PASS' if c2 else 'FAIL'}] unsupported-claim: a finding with no source_ids is rejected"
    )
    ok = ok and c2
    # decision neg-control
    forced = an.classify(
        {
            "type": "tech-regression",
            "decision_class": "AUTO_SAFE_OPERATIONAL",
            "evidence_label": "OBSERVED_FACT",
        }
    )
    c3 = forced == "HUMAN_REVIEW_REQUIRED"
    print(
        f"  [{'PASS' if c3 else 'FAIL'}] neg-control: content-change rec forced HUMAN_REVIEW, never AUTO_SAFE"
    )
    ok = ok and c3
    return ok


def no_writes_proof(run_fn):
    before = (_sha(SHARED_TS), _sha(SHARED_CSV))
    run_fn()
    after = (_sha(SHARED_TS), _sha(SHARED_CSV))
    ok = before == after
    print(
        f"  [{'PASS' if ok else 'FAIL'}] no-writes: shared timeseries + CSV byte-identical before/after harness"
    )
    if not ok:
        print(f"       before={before} after={after}")
    return ok


def main():
    print("== Daily SEO Intelligence — integration + controls ==")
    results = []
    # capture the whole harness inside the no-writes proof
    inner = {}

    def run_inner():
        inner["stages"] = stage_selftests()
        inner["matrix"] = fixture_matrix()
        inner["claims"] = unsupported_claim_and_negctrl()

    results.append(("no-writes-to-shared-stores", no_writes_proof(run_inner)))
    results.append(("stage-selftests", inner.get("stages", False)))
    results.append(("fixture-matrix", inner.get("matrix", False)))
    results.append(("unsupported-claim+neg-control", inner.get("claims", False)))
    allok = all(v for _, v in results)
    print("== RESULT: " + ("ALL PASS" if allok else "FAILURES") + " ==")
    sys.exit(0 if allok else 1)


if __name__ == "__main__":
    main()
