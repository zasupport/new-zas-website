#!/usr/bin/env python3
# CLAUDE-CODE-INJECTION:
#   target_path: scripts/discovery-self-gap-merge.py
#   permissions: 0644
#   create_parent_dirs: true
#   overwrite_if_exists: true
#   backup_if_exists: true
#   post_install_verify: test -e scripts/discovery-self-gap-merge.py
#   rollback_command: git checkout -- scripts/discovery-self-gap-merge.py
"""discovery-self-gap-merge.py — DOUBLE_SELF_GAP_ANALYSIS_ENGINE, MERGE + fail-closed verdict.

Applies PASS 1 improvements (-> intermediate), then PASS 2 improvements (-> final), records diffs
original->pass1 and pass1->pass2, preserves ledger entries for all stages, and emits the merged output
conforming to double-self-gap-analysis-schema.json.

FAIL-CLOSED: if either pass output or the improvement records are absent, the verdict is
INVALID_INCOMPLETE_OUTPUT (the output must not be claimed complete).

  --merge --run-id ID     read pass1+pass2 -> write self-gap.json + append ledger
  --test                  positive(valid+diffs+ledger) / fail-closed(missing pass) / absence
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


def merge(run_id):
    d = ROOT / "runs" / run_id / "discovery"
    p1 = d / "self-gap-pass1.json"
    p2 = d / "self-gap-pass2.json"
    cand_p = d / "decisions.json"
    # FAIL-CLOSED gate
    if not cand_p.exists():
        print(f"BLOCKED: no candidate (decisions.json) for run {run_id}")
        return 2
    missing = [str(p) for p in (p1, p2) if not p.exists()]
    if missing:
        out = {
            "input_ref": str(cand_p),
            "verdict": "INVALID_INCOMPLETE_OUTPUT",
            "reason": f"missing pass output(s): {missing} — both passes are mandatory",
            "generated_utc": now_utc().isoformat(),
        }
        (d / "self-gap.json").write_text(json.dumps(out, indent=2))
        print(f"FAIL-CLOSED: {out['verdict']} ({out['reason']})")
        return 3

    pass1 = json.loads(p1.read_text())
    pass2 = json.loads(p2.read_text())
    candidate = json.loads(cand_p.read_text())

    # apply pass1 improvements -> intermediate (annotations, never content mutation)
    intermediate = dict(candidate)
    intermediate["self_gap_pass1_applied"] = pass1.get("PASS1_RECOMMENDED_ENHANCEMENTS", [])
    diff_orig_p1 = [f"+pass1: {e}" for e in pass1.get("PASS1_RECOMMENDED_ENHANCEMENTS", [])]

    # apply pass2 improvements -> final
    final = dict(intermediate)
    final["self_gap_pass2_applied"] = pass2.get("PASS2_ENHANCEMENTS_APPLIED", [])
    final["remaining_gaps"] = pass1.get("PASS1_BLOCKERS", []) + pass2.get(
        "PASS2_REMAINING_GAPS", []
    )
    final["deferred_items"] = pass2.get("PASS2_DEFERRED_ITEMS", [])
    diff_p1_p2 = [f"+pass2: {e}" for e in pass2.get("PASS2_ENHANCEMENTS_APPLIED", [])]

    ledger_entries = [
        {
            "stage": "pass1",
            "gaps": len(pass1.get("PASS1_GAPS_FOUND", [])),
            "confidence": pass1.get("PASS1_CONFIDENCE_LABEL"),
        },
        {
            "stage": "pass2",
            "enhancements": len(pass2.get("PASS2_ENHANCEMENTS_APPLIED", [])),
            "confidence": pass2.get("PASS2_CONFIDENCE_LABEL"),
        },
    ]
    out = {
        "input_ref": str(cand_p),
        "generated_utc": now_utc().isoformat(),
        "pass1": pass1,
        "pass2": pass2,
        "merge": {
            "diff_original_to_pass1": diff_orig_p1,
            "diff_pass1_to_pass2": diff_p1_p2,
            "ledger_entries": ledger_entries,
        },
        "final_output": final,
        "verdict": "VALID_IMPROVED_OUTPUT",
    }
    (d / "self-gap.json").write_text(json.dumps(out, indent=2))
    (d / "self-gap-final-output.json").write_text(json.dumps(final, indent=2))

    # append durable ledger (all stages preserved)
    ldir = ROOT / "ledger"
    ldir.mkdir(parents=True, exist_ok=True)
    lp = ldir / "self-gap.jsonl"
    entry = {
        "run_id": run_id,
        "date": now_utc().strftime("%Y-%m-%d"),
        "verdict": out["verdict"],
        "pass1_gaps": len(pass1.get("PASS1_GAPS_FOUND", [])),
        "pass2_enhancements": len(pass2.get("PASS2_ENHANCEMENTS_APPLIED", [])),
        "remaining_gaps": len(final["remaining_gaps"]),
    }
    keep = []
    if lp.exists():
        for ln in lp.read_text().splitlines():
            ln = ln.strip()
            if not ln:
                continue
            try:
                if json.loads(ln).get("run_id") != run_id:
                    keep.append(ln)
            except Exception:
                keep.append(ln)
    keep.append(json.dumps(entry))
    tmp = lp.with_suffix(".jsonl.tmp")
    tmp.write_text("\n".join(keep) + "\n")
    os.replace(tmp, lp)

    print(
        f"merge {run_id}: {out['verdict']} | pass1 diffs {len(diff_orig_p1)}, pass2 diffs {len(diff_p1_p2)}, "
        f"remaining {len(final['remaining_gaps'])}"
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
    (dd / "decisions.json").write_text(
        json.dumps({"decisions": [{"type": "lane-coverage-gap", "lane": "B"}]})
    )
    (dd / "self-gap-pass1.json").write_text(
        json.dumps(
            {
                "PASS1_GAPS_FOUND": ["g1"],
                "PASS1_RECOMMENDED_ENHANCEMENTS": ["e1"],
                "PASS1_BLOCKERS": [],
                "PASS1_CONFIDENCE_LABEL": "corroborated",
            }
        )
    )
    (dd / "self-gap-pass2.json").write_text(
        json.dumps(
            {
                "PASS2_ENHANCEMENTS_APPLIED": ["ea1", "ea2"],
                "PASS2_REMAINING_GAPS": ["r1"],
                "PASS2_DEFERRED_ITEMS": ["d1"],
                "PASS2_CONFIDENCE_LABEL": "corroborated",
            }
        )
    )
    rc = merge(rid)
    out = json.loads((dd / "self-gap.json").read_text())
    # POSITIVE: valid, diffs recorded both directions, ledger written
    ok1 = (
        rc == 0
        and out["verdict"] == "VALID_IMPROVED_OUTPUT"
        and out["merge"]["diff_original_to_pass1"] == ["+pass1: e1"]
        and len(out["merge"]["diff_pass1_to_pass2"]) == 2
    )
    print(
        "  PASS positive: VALID_IMPROVED_OUTPUT with both diff directions recorded"
        if ok1
        else f"  FAIL positive: {out.get('verdict')}"
    )
    fails |= 0 if ok1 else 1
    lp = td / "ledger" / "self-gap.jsonl"
    ok2 = lp.exists() and len([x for x in lp.read_text().splitlines() if x.strip()]) == 1
    print("  PASS ledger: one ledger entry preserved for the run" if ok2 else "  FAIL ledger")
    fails |= 0 if ok2 else 1
    # remaining gaps carried through (blockers + remaining)
    ok3 = out["final_output"]["remaining_gaps"] == ["r1"] and out["final_output"][
        "deferred_items"
    ] == ["d1"]
    print(
        "  PASS carry-through: remaining gaps + deferred items preserved"
        if ok3
        else "  FAIL carry-through"
    )
    fails |= 0 if ok3 else 1
    # FAIL-CLOSED: remove pass2 -> INVALID_INCOMPLETE_OUTPUT
    (dd / "self-gap-pass2.json").unlink()
    rc2 = merge(rid)
    out2 = json.loads((dd / "self-gap.json").read_text())
    ok4 = rc2 == 3 and out2["verdict"] == "INVALID_INCOMPLETE_OUTPUT"
    print(
        "  PASS fail-closed: missing PASS 2 -> INVALID_INCOMPLETE_OUTPUT (never claimed complete)"
        if ok4
        else "  FAIL fail-closed"
    )
    fails |= 0 if ok4 else 1
    ok5 = merge("NOPE") == 2
    print("  PASS absence: missing candidate -> BLOCKED rc2" if ok5 else "  FAIL absence")
    fails |= 0 if ok5 else 1
    ROOT = _root
    shutil.rmtree(td, ignore_errors=True)
    print("SELFTEST PASS" if fails == 0 else "SELFTEST FAIL")
    return fails


def main():
    ap = argparse.ArgumentParser(description="Double self-gap merge (fail-closed)")
    ap.add_argument("--merge", action="store_true")
    ap.add_argument("--run-id", default=None)
    ap.add_argument("--test", action="store_true")
    a = ap.parse_args()
    if a.test:
        sys.exit(selftest())
    if not a.run_id:
        print("usage: --merge --run-id ID")
        sys.exit(2)
    sys.exit(merge(a.run_id))


if __name__ == "__main__":
    main()
