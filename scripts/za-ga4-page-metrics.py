#!/usr/bin/env python3
# ======================================================================
# CLAUDE-CODE-INJECTION
#   operation: create-new-file
#   target_path: scripts/za-ga4-page-metrics.py
#   permissions: "0755"
#   create_parent_dirs: true
#   overwrite_if_exists: false
#   backup_if_exists: true
#   post_install_verify: "python3 scripts/za-ga4-page-metrics.py --test"
#   rollback_command: "git checkout -- scripts/za-ga4-page-metrics.py"
#   hook_governance: lint-v2.sh + secrets.sh (PostToolUse Edit|Write) and
#     test-gate.sh (Stop) govern edits to this file. Beyond that this is a
#     CLI pipeline stage with no Claude lifecycle touchpoint (hook-block-mandate
#     exemption clause, stated explicitly): its equivalent controls are this
#     script's own --test (positive/negative/absence) executed by
#     scripts/smoke-seo-pipeline.sh, which records evidence in the repo.
# END-CLAUDE-CODE-INJECTION
# ======================================================================
"""za-ga4-page-metrics.py -- read-only GA4 page-metrics path for the Daily SEO runner.

Pulls page-level metrics (screenPageViews, sessions, totalUsers by pagePath) from GA4
property 398665484 using the EXISTING service account (za-seo-service-account.json) over the
REST analyticsdata v1beta discovery API. The dedicated google-analytics-data library is NOT
required and is NOT installed: this reuses the already-present google-auth + googleapiclient
(read-only / no-install scope). Feasibility gate verified 04/10/2026 against real data:
getMetadata returned 380 dimensions / 119 metrics, runReport rowCount=286 (real per-page views).

SCOPE (HARD): read-only. No prod write, no deploy, no git, no Google write, no package install.

Emits a per-source acquisition result with status isolation:
  PASS            runReport ok, >=1 row
  EMPTY_BUT_VALID runReport ok, 0 rows in window (a VALID zero, never an error, never fabricated)
  AUTH_REQUIRED   401/403/missing-credential/missing-library (the GA4 path is not authorised)
  ERROR           anything else (transient, network, parse)

A blocked or failed call returns data=None plus the exact failing detail. No metric is ever
fabricated for an unavailable source (anti-fabricated-zero discipline).

  --collect [--run-id ID] [--days D]   live pull; write runs/ID/ga4_pages.json; print entry
  --emit [--days D]                    live pull; print the acquisition entry JSON to stdout
  --test                               positive / negative(no-fabrication) / absence controls
"""

import argparse
import json
import os
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path

HOME = Path(os.path.expanduser("~"))
ROOT = Path(os.environ.get("ZA_DAILY_SEO_ROOT", HOME / ".za-daily-seo"))
SA_JSON = Path(os.environ.get("ZA_SEO_SA_JSON", HOME / "za-seo-service-account.json"))
GA4_PROPERTY = os.environ.get("ZA_GA4_PROPERTY", "398665484")
GA4_SCOPES = ["https://www.googleapis.com/auth/analytics.readonly"]


def now_utc():
    return datetime.now(timezone.utc)


def _entry(status, data, detail, invocation, as_of):
    """One acquisition result. data is None whenever the source is unavailable."""
    return {
        "source": "ga4_pages",
        "status": status,
        "data": data,
        "detail": detail,
        "invocation": invocation,
        "as_of": as_of,
    }


def _classify_exc(exc) -> str:
    """Map an exception to the status taxonomy. 401/403/permission -> AUTH_REQUIRED, else ERROR."""
    s = str(exc).lower()
    if "403" in s or "401" in s or "permission" in s or "forbidden" in s or "unauthenticated" in s:
        return "AUTH_REQUIRED"
    return "ERROR"


def _parse_runreport(resp, property_id, start, end, days):
    """Turn a runReport response into (status, data). 0 rows -> EMPTY_BUT_VALID (valid zero)."""
    rows = resp.get("rows", [])
    pages = []
    totals = {"screenPageViews": 0, "sessions": 0, "totalUsers": 0}
    for r in rows:
        dv = r.get("dimensionValues", [])
        mv = r.get("metricValues", [])
        page = dv[0]["value"] if dv else ""
        vals = [int(float(m.get("value", 0) or 0)) for m in mv]
        spv, ses, usr = (vals + [0, 0, 0])[:3]
        pages.append({"page": page, "screenPageViews": spv, "sessions": ses, "totalUsers": usr})
        totals["screenPageViews"] += spv
        totals["sessions"] += ses
        totals["totalUsers"] += usr
    data = {
        "property": f"properties/{property_id}",
        "window": {"start": str(start), "end": str(end), "days": days},
        "page_count": int(resp.get("rowCount", len(rows)) or 0),
        "returned": len(pages),
        "totals": totals,
        "top_pages": pages[:20],
    }
    status = "PASS" if rows else "EMPTY_BUT_VALID"
    return status, data


def collect_ga4(property_id=GA4_PROPERTY, days=90, limit=1000):
    """Live read-only GA4 page-metrics pull. Returns an acquisition entry; never raises."""
    as_of = now_utc().isoformat()
    invocation = (
        f"analyticsdata.v1beta properties/{property_id}:runReport "
        f"dims=[pagePath] metrics=[screenPageViews,sessions,totalUsers] {days}d limit={limit}"
    )
    try:
        from google.oauth2 import service_account
        from googleapiclient.discovery import build
    except ImportError as e:
        return _entry("AUTH_REQUIRED", None, f"google libraries missing: {e}", invocation, as_of)
    if not SA_JSON.exists():
        return _entry(
            "AUTH_REQUIRED", None, f"service-account JSON absent: {SA_JSON}", invocation, as_of
        )
    try:
        creds = service_account.Credentials.from_service_account_file(
            str(SA_JSON), scopes=GA4_SCOPES
        )
        svc = build("analyticsdata", "v1beta", credentials=creds, cache_discovery=False)
        end = now_utc().date()
        start = end - timedelta(days=days)
        body = {
            "dateRanges": [{"startDate": str(start), "endDate": str(end)}],
            "dimensions": [{"name": "pagePath"}],
            "metrics": [
                {"name": "screenPageViews"},
                {"name": "sessions"},
                {"name": "totalUsers"},
            ],
            "limit": limit,
            "orderBys": [{"metric": {"metricName": "screenPageViews"}, "desc": True}],
        }
        resp = svc.properties().runReport(property=f"properties/{property_id}", body=body).execute()
        status, data = _parse_runreport(resp, property_id, start, end, days)
        return _entry(status, data, None, invocation, as_of)
    except Exception as e:  # quota/auth/transient reported LOUD, never a silent fabricated zero
        status = _classify_exc(e)
        return _entry(status, None, f"{type(e).__name__}: {str(e)[:300]}", invocation, as_of)


def _atomic_write(path: Path, text: str):
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_suffix(path.suffix + ".tmp")
    tmp.write_text(text)
    os.replace(tmp, path)


def write_run(run_id, entry) -> Path:
    target = ROOT / "runs" / run_id / "ga4_pages.json"
    _atomic_write(target, json.dumps(entry, indent=2))
    return target


def selftest():  # noqa: C901 - a flat control sequence, deliberately linear for auditability
    fails = 0

    # NEGATIVE 1 (no-fabrication): 0-row runReport -> EMPTY_BUT_VALID with a VALID zero,
    # never PASS and never a fabricated metric. A naive collector that marked this PASS
    # (or invented a non-zero) is caught here.
    st, data = _parse_runreport({"rows": [], "rowCount": 0}, GA4_PROPERTY, "a", "b", 7)
    ok = (
        st == "EMPTY_BUT_VALID"
        and data["page_count"] == 0
        and data["totals"] == {"screenPageViews": 0, "sessions": 0, "totalUsers": 0}
        and data["returned"] == 0
    )
    print(
        "  PASS negative: 0-row runReport -> EMPTY_BUT_VALID valid-zero (not PASS, not fabricated)"
        if ok
        else f"  FAIL negative: {st} {data}"
    )
    fails |= 0 if ok else 1

    # NEGATIVE 2 (status mapping): a 403 must map to AUTH_REQUIRED, a generic error to ERROR.
    ok2 = (
        _classify_exc(Exception("HttpError 403 permission denied")) == "AUTH_REQUIRED"
        and _classify_exc(Exception("Remote end closed connection")) == "ERROR"
    )
    print(
        "  PASS negative: 403 -> AUTH_REQUIRED, transient -> ERROR (auth not mislabeled valid)"
        if ok2
        else "  FAIL negative: exc classification"
    )
    fails |= 0 if ok2 else 1

    # POSITIVE (schema): a 2-row runReport -> PASS with summed totals and per-page rows.
    resp = {
        "rowCount": 2,
        "rows": [
            {
                "dimensionValues": [{"value": "/"}],
                "metricValues": [{"value": "103"}, {"value": "102"}, {"value": "85"}],
            },
            {
                "dimensionValues": [{"value": "/iphone-repair"}],
                "metricValues": [{"value": "14"}, {"value": "14"}, {"value": "13"}],
            },
        ],
    }
    st3, d3 = _parse_runreport(resp, GA4_PROPERTY, "a", "b", 7)
    ok3 = (
        st3 == "PASS"
        and d3["returned"] == 2
        and d3["totals"]["screenPageViews"] == 117
        and d3["top_pages"][0]["page"] == "/"
    )
    print(
        "  PASS positive: multi-row runReport -> PASS, totals summed, per-page rows"
        if ok3
        else f"  FAIL positive: {st3} {d3}"
    )
    fails |= 0 if ok3 else 1

    # ABSENCE (real, no network): point the SA JSON at a nonexistent file ->
    # AUTH_REQUIRED with data=None, never a silent 0-metric success.
    global SA_JSON
    _sa = SA_JSON
    SA_JSON = HOME / ".za-ga4-selftest-nonexistent.json"
    e = collect_ga4(days=1)
    SA_JSON = _sa
    ok4 = e["status"] == "AUTH_REQUIRED" and e["data"] is None and "absent" in (e["detail"] or "")
    print(
        "  PASS absence: no service-account -> AUTH_REQUIRED, data None (not a silent zero)"
        if ok4
        else f"  FAIL absence: {e}"
    )
    fails |= 0 if ok4 else 1

    print("SELFTEST PASS" if fails == 0 else "SELFTEST FAIL")
    return fails


def main():
    ap = argparse.ArgumentParser(description="GA4 read-only page-metrics path (daily SEO runner)")
    ap.add_argument("--collect", action="store_true")
    ap.add_argument("--emit", action="store_true")
    ap.add_argument("--run-id", default=None)
    ap.add_argument("--days", type=int, default=90)
    ap.add_argument("--test", action="store_true")
    a = ap.parse_args()
    if a.test:
        sys.exit(selftest())
    entry = collect_ga4(days=a.days)
    if a.collect:
        rid = a.run_id or now_utc().strftime("%Y%m%dT%H%M%SZ")
        target = write_run(rid, entry)
        print(f"ga4 entry -> {target}")
    print(json.dumps(entry, indent=2))
    # A degraded source is a RECORDED fact, not a run failure (status isolation): exit 0.
    sys.exit(0)


if __name__ == "__main__":
    main()
