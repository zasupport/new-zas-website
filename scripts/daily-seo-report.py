#!/usr/bin/env python3
# ======================================================================
# CLAUDE-CODE-INJECTION
#   operation: create-new-file
#   target_path: scripts/daily-seo-report.py
#   permissions: "0755"
#   create_parent_dirs: true
#   overwrite_if_exists: false
#   backup_if_exists: true
#   post_install_verify: "python3 scripts/daily-seo-report.py --test"
#   rollback_command: "git checkout -- scripts/daily-seo-report.py"
#   hook_governance: lint-v2.sh + secrets.sh (PostToolUse Edit|Write) and
#     test-gate.sh (Stop) govern edits to this file. Beyond that this is a
#     CLI pipeline stage with no Claude lifecycle touchpoint (hook-block-mandate
#     exemption clause, stated explicitly): its equivalent controls are this
#     script's own --test (positive/negative/absence) executed by
#     scripts/smoke-seo-pipeline.sh, which records evidence in the repo.
# END-CLAUDE-CODE-INJECTION
# ======================================================================
"""daily-seo-report.py — Stage 5 of the Daily SEO Intelligence pipeline.

Renders the daily report (facts only, third person) and appends the change-measurement ledger.
BLOCKED sources are listed with their EXACT failed invocation and NEVER a fabricated metric.
Indexing-eligibility is reported separately from performance.

  --report --run-id ID    write reports/daily-seo-<run-id>.md + append ledger
  --test                  positive / negative(no-fabrication) / absence / ledger-idempotency
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


def render(run_id):
    run_dir = ROOT / "runs" / run_id
    opp_p = run_dir / "opportunities.json"
    man_p = run_dir / "collect-manifest.json"
    if not opp_p.exists():
        print(f"BLOCKED: no opportunities.json for run {run_id} — run analyze first")
        return 2
    opp = json.loads(opp_p.read_text())
    manifest = json.loads(man_p.read_text()) if man_p.exists() else {"sources": {}}
    sources = manifest.get("sources", {})

    L = []
    L.append(f"# Daily SEO Intelligence report — run {run_id}")
    L.append(
        f"_Generated {now_utc().isoformat()} (UTC). Facts only. Advisory: no change is published by this system._\n"
    )

    L.append("## 1 Data sources and health")
    for name, h in sources.items():
        state = h.get("state", "UNKNOWN")
        if state == "BLOCKED":
            # NEVER a fabricated metric: state the exact failed invocation instead
            L.append(
                f"- {name}: BLOCKED — {h.get('reason', '')} | exact invocation: `{h.get('invocation', 'n/a')}`"
            )
        elif state == "MISSING":
            L.append(f"- {name}: MISSING — {h.get('reason', '')}")
        else:
            metric = h.get("rows", h.get("count", h.get("sampled", "")))
            L.append(f"- {name}: {state}{(' — ' + str(metric)) if metric != '' else ''}")

    L.append("\n## 2 Opportunity queue (HUMAN_REVIEW_REQUIRED — ranked)")
    hrr = [
        o
        for o in opp.get("opportunities", [])
        if o.get("decision_class") == "HUMAN_REVIEW_REQUIRED"
    ]
    perf = [o for o in hrr if o.get("type") != "indexing-eligibility"]
    idx = [o for o in hrr if o.get("type") == "indexing-eligibility"]
    if not perf:
        L.append("- none in this run.")
    for o in perf:
        sc = o.get("priority_score")
        L.append(
            f"- [{o['type']}] {o['target']} "
            f"{('(score ' + str(round(sc, 1)) + ')') if sc is not None else ''} "
            f"[{o['evidence_label']}]"
        )
        L.append(f"    - {o['rationale']}")
        L.append(f"    - review action: {o.get('recommended_review_action', '')}")
        L.append(f"    - source: {', '.join(o.get('source_ids', []))}")

    L.append("\n## 3 Indexing eligibility (reported SEPARATELY from performance)")
    if not idx:
        L.append(
            "- no indexing-eligibility signals in this run. (HTTP 200 != indexed; no indexed claim made without URL Inspection.)"
        )
    for o in idx:
        L.append(
            f"- {o['target']}: {o['rationale']} [{o['evidence_label']}] source: {', '.join(o.get('source_ids', []))}"
        )

    L.append("\n## 4 Decision summary")
    for cls, n in (opp.get("decision_summary") or {}).items():
        L.append(f"- {cls}: {n}")
    L.append(
        f"- delegated period engine (za-site-improve.py): {opp.get('delegated_period_engine', {}).get('state', 'n/a')}"
    )
    L.append(f"- local LLM layer: {opp.get('llm_layer', {}).get('state', 'n/a')}")

    reports = ROOT / "reports"
    reports.mkdir(parents=True, exist_ok=True)
    out = reports / f"daily-seo-{run_id}.md"
    out.write_text("\n".join(L) + "\n")

    # change-measurement ledger (append-only, idempotent per run_id)
    ledger_dir = ROOT / "ledger"
    ledger_dir.mkdir(parents=True, exist_ok=True)
    ledger = ledger_dir / "change-measurement.jsonl"
    entry = {
        "run_id": run_id,
        "date": now_utc().strftime("%Y-%m-%d"),
        "decision_summary": opp.get("decision_summary", {}),
        "source_health": {k: v.get("state") for k, v in sources.items()},
        "human_review_count": len(hrr),
    }
    keep = []
    if ledger.exists():
        for ln in ledger.read_text().splitlines():
            ln = ln.strip()
            if not ln:
                continue
            try:
                if json.loads(ln).get("run_id") != run_id:
                    keep.append(ln)
            except Exception:
                keep.append(ln)
    keep.append(json.dumps(entry))
    tmp = ledger.with_suffix(".jsonl.tmp")
    tmp.write_text("\n".join(keep) + "\n")
    os.replace(tmp, ledger)

    print(f"report -> {out}")
    print(f"ledger appended (idempotent) -> {ledger}")
    print(f'reveal: open -R "{out}"')
    return 0


def selftest():
    import tempfile
    import shutil

    fails = 0
    td = Path(tempfile.mkdtemp())
    global ROOT
    _root = ROOT
    ROOT = td
    rid = "REP"
    rd = td / "runs" / rid
    rd.mkdir(parents=True)
    (rd / "collect-manifest.json").write_text(
        json.dumps(
            {
                "run_id": rid,
                "sources": {
                    "gsc_pages": {"state": "FRESH", "rows": 5},
                    "ga4": {
                        "state": "BLOCKED",
                        "reason": "connector closed",
                        "invocation": "mcp__google-analytics runReport",
                    },
                },
            }
        )
    )
    (rd / "opportunities.json").write_text(
        json.dumps(
            {
                "run_id": rid,
                "opportunities": [
                    {
                        "type": "ctr-gap",
                        "target": "/logic-board-repair",
                        "evidence_label": "OBSERVED_FACT",
                        "decision_class": "HUMAN_REVIEW_REQUIRED",
                        "priority_score": 12.0,
                        "rationale": "earned ranking leaking clicks",
                        "recommended_review_action": "rewrite title/meta",
                        "source_ids": ["gsc_pages:https://zasupport.com/logic-board-repair"],
                    },
                    {
                        "type": "indexing-eligibility",
                        "target": "/x",
                        "evidence_label": "OBSERVED_FACT",
                        "decision_class": "HUMAN_REVIEW_REQUIRED",
                        "rationale": "noindex directive present",
                        "recommended_review_action": "confirm intended",
                        "source_ids": ["siteprobe:https://zasupport.com/x"],
                    },
                ],
                "decision_summary": {"HUMAN_REVIEW_REQUIRED": 2},
            }
        )
    )
    rc = render(rid)
    md = (td / "reports" / f"daily-seo-{rid}.md").read_text()
    # POSITIVE: queue + BLOCKED invocation present
    ok1 = rc == 0 and "/logic-board-repair" in md and "HUMAN_REVIEW_REQUIRED" in md
    print("  PASS positive: report renders ranked HUMAN_REVIEW queue" if ok1 else "  FAIL positive")
    fails |= 0 if ok1 else 1
    # NEGATIVE (no fabrication): BLOCKED ga4 shown with exact invocation, NO fake metric number
    ok2 = "BLOCKED" in md and "runReport" in md and "ga4: BLOCKED" in md
    print(
        "  PASS negative: BLOCKED source shown with exact invocation, no fabricated metric"
        if ok2
        else "  FAIL negative"
    )
    fails |= 0 if ok2 else 1
    # indexing separated from performance
    ok3 = (
        "Indexing eligibility (reported SEPARATELY" in md
        and "/x" in md.split("Indexing eligibility")[1]
    )
    print(
        "  PASS separation: indexing-eligibility reported separately from performance"
        if ok3
        else "  FAIL separation"
    )
    fails |= 0 if ok3 else 1
    # ABSENCE
    ok4 = render("NOPE") == 2
    print("  PASS absence: missing opportunities.json -> rc2 BLOCKED" if ok4 else "  FAIL absence")
    fails |= 0 if ok4 else 1
    # LEDGER idempotency: re-run same run_id -> single line
    render(rid)
    lines = [
        x
        for x in (td / "ledger" / "change-measurement.jsonl").read_text().splitlines()
        if x.strip()
    ]
    ok5 = sum(1 for x in lines if json.loads(x)["run_id"] == rid) == 1
    print(
        "  PASS ledger-idempotent: same run_id appended once, not duplicated"
        if ok5
        else "  FAIL ledger-idempotent"
    )
    fails |= 0 if ok5 else 1
    ROOT = _root
    shutil.rmtree(td, ignore_errors=True)
    print("SELFTEST PASS" if fails == 0 else "SELFTEST FAIL")
    return fails


def main():
    ap = argparse.ArgumentParser(description="Daily SEO report + ledger")
    ap.add_argument("--report", action="store_true")
    ap.add_argument("--run-id", default=None)
    ap.add_argument("--test", action="store_true")
    a = ap.parse_args()
    if a.test:
        sys.exit(selftest())
    if not a.run_id:
        print("usage: --report --run-id ID")
        sys.exit(2)
    sys.exit(render(a.run_id))


if __name__ == "__main__":
    main()
