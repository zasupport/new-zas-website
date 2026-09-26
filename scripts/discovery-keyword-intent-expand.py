#!/usr/bin/env python3
# ======================================================================
# CLAUDE-CODE-INJECTION
#   operation: create-new-file
#   target_path: scripts/discovery-keyword-intent-expand.py
#   permissions: "0755"
#   create_parent_dirs: true
#   overwrite_if_exists: false
#   backup_if_exists: true
#   post_install_verify: "python3 scripts/discovery-keyword-intent-expand.py --test"
#   rollback_command: "git checkout -- scripts/discovery-keyword-intent-expand.py"
#   hook_governance: lint-v2.sh + secrets.sh (PostToolUse Edit|Write) and
#     test-gate.sh (Stop) govern edits to this file. Beyond that this is a
#     CLI pipeline stage with no Claude lifecycle touchpoint (hook-block-mandate
#     exemption clause, stated explicitly): its equivalent controls are this
#     script's own --test (positive/negative/absence) executed by
#     scripts/smoke-seo-pipeline.sh, which records evidence in the repo.
# END-CLAUDE-CODE-INJECTION
# ======================================================================
"""discovery-keyword-intent-expand.py — WORKSTREAM 11: related-keyword / adjacent-intent expansion.

Reviews adjacent intent BEFORE recommendations narrow. Operates on the evidence that is actually
available this session (page-dimension GSC + sitemap slugs). Query-dimension expansion (rising
queries, query/page mismatch) needs the query GSC export, which is STALE this session -> that part
is reported BLOCKED with the exact unblock, never fabricated (§374/§559).

Clusters candidate intent into buckets and flags scaled-content-abuse risk. No spammy long-tail junk:
every cluster is checked for people-first usefulness + duplicate intent before it is surfaced.

  --expand --run-id ID    build intent clusters from available evidence
  --test                  positive / symptom+owner buckets / blocked-query-dim / spam-rejection
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
QUERY_GSC = HOME / ".za-gsc-export-latest.json"  # query-dimension export (may be stale/absent)
QUERY_STALE_HOURS = 48

BUCKETS = {
    "symptom-language": r"(won-?t-turn-on|not-charging|black-screen|no-power|water-damage|wont-boot|frozen|slow|overheating|no-display|clicking)",
    "business-owner-phrasing": r"(for-business|for-my-office|practice|company|fleet|multiple-macs|team|staff)",
    "recurring-support": r"(support-plan|maintenance|managed|retainer|monthly|ongoing|contract|sla)",
    "incident-trust": r"(hacked|breach|compromise|ransomware|forensic|incident|recover-data|data-loss)",
}
DOORWAY_TAIL = re.compile(r"(how-much|price|cost|near-me|same-day|-vs-replacement)-[a-z-]+$")


def now_utc():
    return datetime.now(timezone.utc)


def bucketise(slug):
    hits = [b for b, pat in BUCKETS.items() if re.search(pat, slug)]
    return hits


def spam_risk(slug):
    """People-first / scaled-content-abuse guard. True = risky (doorway/thin permutation)."""
    return bool(DOORWAY_TAIL.search(slug))


def expand(run_id):
    norm_p = ROOT / "runs" / run_id / "normalized.json"
    if not norm_p.exists():
        print(f"BLOCKED: no normalized.json for run {run_id}")
        return 2
    norm = json.loads(norm_p.read_text())
    gsc = norm.get("gsc_pages") or []
    sitemap = norm.get("sitemap_urls") or []
    clusters = {b: [] for b in BUCKETS}
    spam_rejected = []
    seen_intent = set()
    for r in gsc:
        slug = r.get("page", "").rstrip("/").split("/")[-1].lower()
        if not slug:
            continue
        if spam_risk(slug):
            spam_rejected.append(slug)
            continue
        for b in bucketise(slug):
            key = (b, slug)
            if key in seen_intent:  # dedupe identical intent (no junk inflation)
                continue
            seen_intent.add(key)
            clusters[b].append(
                {
                    "page": r.get("page"),
                    "impressions": r.get("impressions", 0),
                    "clicks": r.get("clicks", 0),
                    "evidence_label": "OBSERVED_FACT",
                }
            )
    # query-dimension expansion state (honest)
    if QUERY_GSC.exists():
        age_h = (now_utc().timestamp() - QUERY_GSC.stat().st_mtime) / 3600
        query_state = {
            "state": "FRESH" if age_h <= QUERY_STALE_HOURS else "STALE",
            "age_hours": round(age_h, 1),
            "path": str(QUERY_GSC),
        }
    else:
        query_state = {"state": "MISSING", "path": str(QUERY_GSC)}
    query_expansion = {
        "state": "BLOCKED" if query_state["state"] != "FRESH" else "AVAILABLE",
        "reason": f"query-dimension GSC {query_state['state']} (rising queries + query/page mismatch need it)",
        "exact_unblock": "python3 ~/bin/za-gsc-export.py --export   # refresh query-dimension export",
        "detail": query_state,
    }
    out = {
        "run_id": run_id,
        "generated_utc": now_utc().isoformat(),
        "clusters": clusters,
        "cluster_counts": {b: len(v) for b, v in clusters.items()},
        "spam_rejected_count": len(spam_rejected),
        "spam_rejected_sample": spam_rejected[:10],
        "query_dimension_expansion": query_expansion,
        "sitemap_url_count": len(sitemap),
        "note": "Adjacent-intent review over available page-dimension evidence. Rising-query and "
        "query/page-mismatch review is BLOCKED until the query GSC export is refreshed.",
    }
    d = ROOT / "runs" / run_id / "discovery"
    d.mkdir(parents=True, exist_ok=True)
    (d / "intent-expansion.json").write_text(json.dumps(out, indent=2))
    print(f"intent expansion {run_id}:")
    for b, n in out["cluster_counts"].items():
        print(f"  {b:24s} {n}")
    print(f"  spam/doorway rejected: {len(spam_rejected)}")
    print(f"  query-dimension expansion: {query_expansion['state']} ({query_expansion['reason']})")
    return 0


def selftest():
    import tempfile
    import shutil

    fails = 0
    td = Path(tempfile.mkdtemp())
    global ROOT, QUERY_GSC
    _root, _q = ROOT, QUERY_GSC
    ROOT = td
    QUERY_GSC = td / "absent-query.json"
    rid = "T"
    rd = td / "runs" / rid
    rd.mkdir(parents=True)
    (rd / "normalized.json").write_text(
        json.dumps(
            {
                "gsc_pages": [
                    {
                        "page": "https://zasupport.com/macbook-wont-turn-on",
                        "impressions": 300,
                        "clicks": 4,
                    },
                    {
                        "page": "https://zasupport.com/mac-support-for-business",
                        "impressions": 150,
                        "clicks": 1,
                    },
                    {
                        "page": "https://zasupport.com/managed-maintenance-plan",
                        "impressions": 90,
                        "clicks": 0,
                    },
                    {
                        "page": "https://zasupport.com/macbook-repair-how-much-johannesburg",
                        "impressions": 500,
                        "clicks": 0,
                    },
                ],
                "sitemap_urls": [],
            }
        )
    )
    rc = expand(rid)
    out = json.loads((rd / "discovery" / "intent-expansion.json").read_text())
    ok1 = (
        rc == 0
        and out["cluster_counts"]["symptom-language"] == 1
        and out["cluster_counts"]["business-owner-phrasing"] == 1
    )
    print(
        "  PASS positive: symptom + business-owner buckets populated"
        if ok1
        else f"  FAIL positive: {out['cluster_counts']}"
    )
    fails |= 0 if ok1 else 1
    ok2 = out["cluster_counts"]["recurring-support"] == 1
    print("  PASS recurring: recurring-support phrasing detected" if ok2 else "  FAIL recurring")
    fails |= 0 if ok2 else 1
    # SPAM rejection: the price-doorway permutation must be rejected, not clustered
    ok3 = out["spam_rejected_count"] == 1 and any(
        "how-much" in s for s in out["spam_rejected_sample"]
    )
    print(
        "  PASS spam-rejection: price-doorway permutation rejected (people-first guard)"
        if ok3
        else f"  FAIL spam: {out['spam_rejected_sample']}"
    )
    fails |= 0 if ok3 else 1
    # BLOCKED query dim (absent export), exact unblock present, never fabricated
    ok4 = (
        out["query_dimension_expansion"]["state"] == "BLOCKED"
        and "za-gsc-export.py" in out["query_dimension_expansion"]["exact_unblock"]
    )
    print(
        "  PASS blocked-query-dim: absent query GSC -> BLOCKED + exact unblock, no fabrication"
        if ok4
        else "  FAIL blocked-query-dim"
    )
    fails |= 0 if ok4 else 1
    ok5 = expand("NOPE") == 2
    print("  PASS absence: missing normalized -> BLOCKED rc2" if ok5 else "  FAIL absence")
    fails |= 0 if ok5 else 1
    ROOT, QUERY_GSC = _root, _q
    shutil.rmtree(td, ignore_errors=True)
    print("SELFTEST PASS" if fails == 0 else "SELFTEST FAIL")
    return fails


def main():
    ap = argparse.ArgumentParser(description="Related-keyword / adjacent-intent expansion")
    ap.add_argument("--expand", action="store_true")
    ap.add_argument("--run-id", default=None)
    ap.add_argument("--test", action="store_true")
    a = ap.parse_args()
    if a.test:
        sys.exit(selftest())
    if not a.run_id:
        print("usage: --expand --run-id ID")
        sys.exit(2)
    sys.exit(expand(a.run_id))


if __name__ == "__main__":
    main()
