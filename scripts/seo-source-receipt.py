#!/usr/bin/env python3
# ======================================================================
# CLAUDE-CODE-INJECTION
#   operation: create-new-file
#   target_path: scripts/seo-source-receipt.py
#   permissions: "0755"
#   create_parent_dirs: true
#   overwrite_if_exists: false
#   backup_if_exists: true
#   post_install_verify: "python3 scripts/seo-source-receipt.py --test"
#   rollback_command: "git checkout -- scripts/seo-source-receipt.py"
#   hook_governance: lint-v2.sh + secrets.sh (PostToolUse Edit|Write) and
#     test-gate.sh (Stop) govern edits to this file. Beyond that this is a
#     CLI pipeline stage with no Claude lifecycle touchpoint (hook-block-mandate
#     exemption clause, stated explicitly): its equivalent controls are this
#     script's own --test (five controls + idempotency/partial-failure/stale-data)
#     executed by scripts/smoke-seo-pipeline.sh, which records evidence in the repo.
# END-CLAUDE-CODE-INJECTION
# ======================================================================
"""seo-source-receipt.py -- one structured per-source SEO evidence receipt.

Combines, per source, with STATUS ISOLATION (one source failing never blanks another):
  gsc_totals   clicks / impressions / avg_position   (last-known-good: ~/.za-gsc-export-latest.json)
  gsc_queries  top queries + count                   (last-known-good: same file)
  gsc_pages    page split blog vs service            (last-known-good: ~/.za-gsc-pages-export.json)
  ga4_pages    live page metrics                      (live: za-ga4-page-metrics.collect_ga4, or the
                                                        runner's run-dir ga4_pages.json if present)

Each source entry carries:
  status      PASS | AUTH_REQUIRED | EMPTY_BUT_VALID | ERROR  (this run's acquisition outcome)
  served_from live | last_known_good | none
  fresh       bool, served data age vs the per-source threshold
  age_s       age of the served data in seconds (None when no data)
  as_of       ISO-8601 UTC timestamp of the served data
  threshold_s freshness threshold for this source
  data        the served metrics, or null when the source is unavailable (never fabricated)
  detail      exact failure text when degraded
  invocation  the exact call that produced (or would produce) the data

GSC is READ from its on-disk artifacts and is NEVER re-pulled here (NR-002: no GSC re-pull <24h);
those artifacts ARE the GSC last-known-good. Only GA4 is a live call. When a source fails this run
(AUTH_REQUIRED/ERROR) and the previous receipt held data, that data is carried forward as
served_from=last_known_good with fresh=false. Output is ATOMIC (tmp + os.replace); a stable
receipt-latest.json feeds the next run's last-known-good.

  --build [--run-id ID] [--days D]   build the receipt (read-only; GA4 live)
  --test                             5 controls (pos/neg/absence/pressure/e2e) + idempotency /
                                     partial-failure / stale-data
"""

import argparse
import importlib.util
import json
import os
import sys
import time
from datetime import datetime, timedelta, timezone
from pathlib import Path

HOME = Path(os.path.expanduser("~"))
ROOT = Path(os.environ.get("ZA_DAILY_SEO_ROOT", HOME / ".za-daily-seo"))
GSC_LATEST = Path(os.environ.get("ZA_GSC_LATEST_JSON", HOME / ".za-gsc-export-latest.json"))
GSC_PAGES = Path(os.environ.get("ZA_GSC_PAGES_JSON", HOME / ".za-gsc-pages-export.json"))

GSC_SITE = "sc-domain:zasupport.com"
GA4_PROPERTY = os.environ.get("ZA_GA4_PROPERTY", "398665484")

SOURCES = ["gsc_totals", "gsc_queries", "gsc_pages", "ga4_pages"]
THRESHOLD_S = {
    "gsc_totals": 24 * 3600,
    "gsc_queries": 24 * 3600,
    "gsc_pages": 48 * 3600,
    "ga4_pages": 24 * 3600,
}
SEVERITY = {"PASS": 0, "EMPTY_BUT_VALID": 1, "AUTH_REQUIRED": 2, "ERROR": 3}


def now_utc():
    return datetime.now(timezone.utc)


# ── GA4 path (imported so tests can stub it; hyphenated filename -> importlib) ──
def _load_ga4():
    spec = importlib.util.spec_from_file_location(
        "za_ga4_page_metrics", Path(__file__).resolve().parent / "za-ga4-page-metrics.py"
    )
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    return m


GA4 = _load_ga4()


def _parse_iso(s):
    if not s:
        return None
    try:
        dt = datetime.fromisoformat(s.replace("Z", "+00:00"))
        return dt if dt.tzinfo else dt.replace(tzinfo=timezone.utc)
    except Exception:
        return None


def _mtime_iso(p: Path):
    return datetime.fromtimestamp(p.stat().st_mtime, tz=timezone.utc).isoformat()


def _atomic_write(path: Path, text: str):
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_suffix(path.suffix + ".tmp")
    tmp.write_text(text)
    os.replace(tmp, path)


# ── acquisition (each returns an entry {status,data,detail,invocation,as_of}) ──
def _acq(status, data, detail, invocation, as_of):
    return {
        "status": status,
        "data": data,
        "detail": detail,
        "invocation": invocation,
        "as_of": as_of,
    }


def acquire_gsc_totals():
    inv = f"read {GSC_LATEST} -> clicks/impressions/avg_position"
    if not GSC_LATEST.exists():
        return _acq("ERROR", None, f"artifact absent: {GSC_LATEST}", inv, None)
    try:
        d = json.loads(GSC_LATEST.read_text())
    except Exception as e:
        return _acq("ERROR", None, f"unreadable: {type(e).__name__}: {e}", inv, None)
    src, err = d.get("source"), d.get("error")
    if src in (None, "failed") or err not in (None, "null"):
        st = "AUTH_REQUIRED" if "403" in str(err) else "ERROR"
        return _acq(st, None, f"GSC export reported source={src} error={err}", inv, None)
    clicks, impr = int(d.get("clicks", 0) or 0), int(d.get("impressions", 0) or 0)
    data = {
        "property": GSC_SITE,
        "clicks": clicks,
        "impressions": impr,
        "avg_position": d.get("avg_position"),
    }
    status = "EMPTY_BUT_VALID" if (clicks == 0 and impr == 0) else "PASS"
    return _acq(status, data, None, inv, _mtime_iso(GSC_LATEST))


def acquire_gsc_queries():
    inv = f"read {GSC_LATEST} -> top_queries"
    if not GSC_LATEST.exists():
        return _acq("ERROR", None, f"artifact absent: {GSC_LATEST}", inv, None)
    try:
        d = json.loads(GSC_LATEST.read_text())
    except Exception as e:
        return _acq("ERROR", None, f"unreadable: {type(e).__name__}: {e}", inv, None)
    src, err = d.get("source"), d.get("error")
    if src in (None, "failed") or err not in (None, "null"):
        st = "AUTH_REQUIRED" if "403" in str(err) else "ERROR"
        return _acq(st, None, f"GSC export reported source={src} error={err}", inv, None)
    q = d.get("top_queries", []) or []
    data = {"property": GSC_SITE, "query_count": len(q), "top_queries": q[:20]}
    status = "EMPTY_BUT_VALID" if len(q) == 0 else "PASS"
    return _acq(status, data, None, inv, _mtime_iso(GSC_LATEST))


def acquire_gsc_pages():
    inv = f"read {GSC_PAGES} -> blog/service page split"
    if not GSC_PAGES.exists():
        return _acq("ERROR", None, f"artifact absent: {GSC_PAGES}", inv, None)
    try:
        d = json.loads(GSC_PAGES.read_text())
    except Exception as e:
        return _acq("ERROR", None, f"unreadable: {type(e).__name__}: {e}", inv, None)
    pages = int(d.get("pages", 0) or 0)
    data = {
        "property": GSC_SITE,
        "pages": pages,
        "blog": d.get("blog", {}),
        "service": d.get("service", {}),
    }
    status = "EMPTY_BUT_VALID" if pages == 0 else "PASS"
    return _acq(status, data, None, inv, _mtime_iso(GSC_PAGES))


def acquire_ga4(run_id, days):
    """Prefer the runner's run-dir ga4_pages.json (live this run); else call GA4 live."""
    if run_id:
        art = ROOT / "runs" / run_id / "ga4_pages.json"
        if art.exists():
            try:
                e = json.loads(art.read_text())
                return _acq(
                    e.get("status", "ERROR"),
                    e.get("data"),
                    e.get("detail"),
                    e.get("invocation"),
                    e.get("as_of"),
                )
            except Exception:
                pass  # fall through to a live call
    try:
        e = GA4.collect_ga4(days=days)
        return _acq(
            e["status"], e.get("data"), e.get("detail"), e.get("invocation"), e.get("as_of")
        )
    except Exception as e:  # backstop: a GA4 crash must not abort the receipt (isolation)
        return _acq(
            "ERROR",
            None,
            f"collect_ga4 raised: {type(e).__name__}: {e}",
            "za-ga4-page-metrics.collect_ga4",
            now_utc().isoformat(),
        )


# ── finalize: add served_from / fresh / age, apply last-known-good carry-forward ──
def finalize(key, acq, prev, now):
    status = acq["status"]
    data = acq.get("data")
    as_of = acq.get("as_of")
    served_from = "live" if key == "ga4_pages" else "last_known_good"
    detail = acq.get("detail")
    if data is None and status in ("AUTH_REQUIRED", "ERROR"):
        p = (prev.get("sources") or {}).get(key) or {}
        if p.get("data") is not None:
            data = p["data"]
            as_of = p.get("as_of")
            served_from = "last_known_good"
            detail = (detail or "") + " | served last-known-good from previous receipt"
    age_s = None
    fresh = False
    dt = _parse_iso(as_of)
    if dt is not None:
        age_s = max(0, int((now - dt).total_seconds()))
        fresh = age_s <= THRESHOLD_S[key]
    if data is None:
        served_from = "none"
        fresh = False
    return {
        "status": status,
        "served_from": served_from,
        "fresh": fresh,
        "age_s": age_s,
        "as_of": as_of,
        "threshold_s": THRESHOLD_S[key],
        "detail": detail,
        "invocation": acq.get("invocation"),
        "data": data,
    }


def _load_prev():
    p = ROOT / "receipt-latest.json"
    if p.exists():
        try:
            return json.loads(p.read_text())
        except Exception:
            return {}
    return {}


def _append_ledger(run_id, receipt):
    ledger = ROOT / "ledger" / "source-receipt.jsonl"
    ledger.parent.mkdir(parents=True, exist_ok=True)
    entry = {
        "run_id": run_id,
        "date": receipt["generated_utc"][:10],
        "source_status": {k: v["status"] for k, v in receipt["sources"].items()},
        "worst_status": receipt["overall"]["worst_status"],
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
    _atomic_write(ledger, "\n".join(keep) + "\n")


def build(run_id=None, days=90):
    rid = run_id or now_utc().strftime("%Y%m%dT%H%M%SZ")
    now = now_utc()
    prev = _load_prev()
    acq = {
        "gsc_totals": acquire_gsc_totals(),
        "gsc_queries": acquire_gsc_queries(),
        "gsc_pages": acquire_gsc_pages(),
        "ga4_pages": acquire_ga4(rid, days),
    }
    sources = {k: finalize(k, acq[k], prev, now) for k in SOURCES}
    statuses = [v["status"] for v in sources.values()]
    worst = max(statuses, key=lambda s: SEVERITY.get(s, 0))
    receipt = {
        "schema": "za-seo-source-receipt/v1",
        "generated_utc": now.isoformat(),
        "run_id": rid,
        "property": {"gsc": GSC_SITE, "ga4": f"properties/{GA4_PROPERTY}"},
        "sources": sources,
        "overall": {
            "sources_total": len(SOURCES),
            "counts": {s: statuses.count(s) for s in SEVERITY},
            "worst_status": worst,
            "all_fresh": all(v["fresh"] for v in sources.values()),
        },
    }
    text = json.dumps(receipt, indent=2)
    _atomic_write(ROOT / "runs" / rid / "source-receipt.json", text)
    _atomic_write(ROOT / "receipt-latest.json", text)
    _append_ledger(rid, receipt)
    return receipt


# ── tests ──────────────────────────────────────────────────────────────────────
def _strip_volatile(receipt):
    r = json.loads(json.dumps(receipt))
    r.pop("generated_utc", None)
    for v in r.get("sources", {}).values():
        v.pop("age_s", None)
    return r


def selftest():  # noqa: C901 - a flat control sequence, deliberately linear for auditability
    import shutil
    import tempfile

    global ROOT, GSC_LATEST, GSC_PAGES
    _sv = (ROOT, GSC_LATEST, GSC_PAGES, GA4.collect_ga4)
    td = Path(tempfile.mkdtemp())
    ROOT = td / "daily"
    GSC_LATEST = td / "gsc-latest.json"
    GSC_PAGES = td / "gsc-pages.json"
    fails = 0

    def put_gsc(clicks=918, impr=29279, nq=20, src="service_account", err=None, age_s=0):
        GSC_LATEST.write_text(
            json.dumps(
                {
                    "source": src,
                    "clicks": clicks,
                    "impressions": impr,
                    "avg_position": 7.2,
                    "top_queries": [
                        {"query": f"q{i}", "clicks": 1, "impressions": 2, "position": 3.0}
                        for i in range(nq)
                    ],
                    "error": err,
                    "timestamp": "04/10/2026 13:57 SAST",
                }
            )
        )
        GSC_PAGES.write_text(
            json.dumps(
                {
                    "generated": "2026-10-03T12:33:34",
                    "pages": 862,
                    "blog": {"clicks": 1708, "impressions": 226797, "pages": 583},
                    "service": {"clicks": 1790, "impressions": 173552, "pages": 279},
                }
            )
        )
        if age_s:
            old = time.time() - age_s
            os.utime(GSC_LATEST, (old, old))
            os.utime(GSC_PAGES, (old, old))

    def stub_ga4(status="PASS", with_data=True, as_of=None):
        def _f(**kw):
            d = (
                {
                    "property": f"properties/{GA4_PROPERTY}",
                    "page_count": 897,
                    "returned": 897,
                    "totals": {"screenPageViews": 12685, "sessions": 12765, "totalUsers": 12017},
                    "top_pages": [{"page": "/", "screenPageViews": 1543}],
                }
                if with_data
                else None
            )
            return {
                "source": "ga4_pages",
                "status": status,
                "data": d,
                "detail": None if with_data else "stub failure",
                "invocation": "stub",
                "as_of": as_of or now_utc().isoformat(),
            }

        return _f

    def no_tmp():
        return not list((ROOT).rglob("*.tmp"))

    # 1 POSITIVE
    put_gsc()
    GA4.collect_ga4 = stub_ga4("PASS", True)
    r = build(run_id="POS")
    rf = ROOT / "runs" / "POS" / "source-receipt.json"
    ok = (
        rf.exists()
        and json.loads(rf.read_text())["run_id"] == "POS"
        and all(r["sources"][k]["status"] == "PASS" for k in SOURCES)
        and r["sources"]["gsc_totals"]["served_from"] == "last_known_good"
        and r["sources"]["ga4_pages"]["served_from"] == "live"
        and r["overall"]["worst_status"] == "PASS"
        and no_tmp()
    )
    print(
        "  PASS positive: all 4 sources PASS, served_from correct, atomic (no .tmp)"
        if ok
        else f"  FAIL positive: {r['overall']}"
    )
    fails |= 0 if ok else 1

    # 2 NEGATIVE (definition of done): zero GSC must be EMPTY_BUT_VALID not PASS;
    #   failed GA4 must NOT be PASS/EMPTY and must carry NO fabricated metric.
    (ROOT / "receipt-latest.json").unlink(missing_ok=True)  # isolate: no prior to carry forward
    put_gsc(clicks=0, impr=0, nq=0)
    GA4.collect_ga4 = stub_ga4("AUTH_REQUIRED", with_data=False)
    r = build(run_id="NEG")
    g_t = r["sources"]["gsc_totals"]
    ga = r["sources"]["ga4_pages"]
    ok2 = (
        g_t["status"] == "EMPTY_BUT_VALID"  # a real zero, not mislabeled PASS
        and ga["status"] == "AUTH_REQUIRED"
        and ga["status"] not in ("PASS", "EMPTY_BUT_VALID")
        and ga["data"] is None  # no fabricated metric (no prev to carry)
        and ga["served_from"] == "none"
    )
    print(
        "  PASS negative: zero->EMPTY_BUT_VALID (not PASS); auth-fail->no PASS, no fabricated metric"
        if ok2
        else f"  FAIL negative: gsc_totals={g_t['status']} ga4={ga['status']}/{ga['data']}"
    )
    fails |= 0 if ok2 else 1

    # 3 ABSENCE: no GSC files + GA4 auth-fail + no prev -> honest none, receipt STILL written, no crash
    GSC_LATEST.unlink(missing_ok=True)
    GSC_PAGES.unlink(missing_ok=True)
    (ROOT / "receipt-latest.json").unlink(missing_ok=True)
    GA4.collect_ga4 = stub_ga4("AUTH_REQUIRED", with_data=False)
    r = build(run_id="ABS")
    ok3 = (
        (ROOT / "runs" / "ABS" / "source-receipt.json").exists()
        and all(r["sources"][k]["data"] is None for k in SOURCES)
        and all(r["sources"][k]["served_from"] == "none" for k in SOURCES)
        and r["overall"]["worst_status"] in ("ERROR", "AUTH_REQUIRED")
    )
    print(
        "  PASS absence: no sources -> all none/degraded, receipt still written, no crash"
        if ok3
        else f"  FAIL absence: {r['overall']} {[r['sources'][k]['served_from'] for k in SOURCES]}"
    )
    fails |= 0 if ok3 else 1

    # 4 PRESSURE: 25 rapid builds within budget, all valid, no leftover tmp
    put_gsc()
    GA4.collect_ga4 = stub_ga4("PASS", True)
    t0 = time.time()
    okp = True
    for i in range(25):
        rr = build(run_id=f"P{i}")
        if rr["overall"]["worst_status"] != "PASS":
            okp = False
            break
    dur = time.time() - t0
    ok4 = okp and no_tmp() and dur < 10.0
    print(
        f"  PASS pressure: 25 builds in {dur:.2f}s, all valid, no .tmp"
        if ok4
        else f"  FAIL pressure: okp={okp} dur={dur:.2f}s tmp={not no_tmp()}"
    )
    fails |= 0 if ok4 else 1

    # 5 E2E / TELEMETRY: a build records a single ledger line + both receipt files exist
    put_gsc()
    GA4.collect_ga4 = stub_ga4("PASS", True)
    build(run_id="E2E")
    ledger = (ROOT / "ledger" / "source-receipt.jsonl").read_text().splitlines()
    n_e2e = sum(1 for ln in ledger if ln.strip() and json.loads(ln)["run_id"] == "E2E")
    ok5 = (
        n_e2e == 1
        and (ROOT / "runs" / "E2E" / "source-receipt.json").exists()
        and (ROOT / "receipt-latest.json").exists()
    )
    print(
        "  PASS e2e: build recorded in telemetry ledger (1 line) + receipt files present"
        if ok5
        else f"  FAIL e2e: ledger lines for E2E={n_e2e}"
    )
    fails |= 0 if ok5 else 1

    # 6 IDEMPOTENCY: same run_id + same inputs -> identical receipt (minus volatile) + 1 ledger line
    put_gsc()
    fixed = now_utc().isoformat()
    GA4.collect_ga4 = stub_ga4("PASS", True, as_of=fixed)
    r1 = build(run_id="IDEM")
    r2 = build(run_id="IDEM")
    ledger = (ROOT / "ledger" / "source-receipt.jsonl").read_text().splitlines()
    n_idem = sum(1 for ln in ledger if ln.strip() and json.loads(ln)["run_id"] == "IDEM")
    ok6 = _strip_volatile(r1) == _strip_volatile(r2) and n_idem == 1
    print(
        "  PASS idempotency: identical inputs -> identical receipt + single ledger line"
        if ok6
        else f"  FAIL idempotency: equal={_strip_volatile(r1) == _strip_volatile(r2)} ledger={n_idem}"
    )
    fails |= 0 if ok6 else 1

    # 7 PARTIAL-FAILURE: good GSC + GA4 ERROR, no prev -> GSC intact, GA4 isolated, receipt written
    (ROOT / "receipt-latest.json").unlink(missing_ok=True)
    put_gsc()
    GA4.collect_ga4 = stub_ga4("ERROR", with_data=False)
    r = build(run_id="PART")
    ga = r["sources"]["ga4_pages"]
    ok7 = (
        all(
            r["sources"][k]["status"] == "PASS" and r["sources"][k]["data"] is not None
            for k in ("gsc_totals", "gsc_queries", "gsc_pages")
        )
        and ga["status"] == "ERROR"
        and ga["served_from"] == "none"
        and (ROOT / "runs" / "PART" / "source-receipt.json").exists()
    )
    print(
        "  PASS partial-failure: GA4 ERROR isolated, GSC sources intact, receipt written"
        if ok7
        else f"  FAIL partial-failure: {[(k, r['sources'][k]['status']) for k in SOURCES]}"
    )
    fails |= 0 if ok7 else 1

    # 8 STALE-DATA: prev receipt has GA4 data 3d old; this run GA4 fails ->
    #   served_from=last_known_good, fresh=false, data carried forward.
    #   Also a stale (3d) GSC artifact -> fresh=false but status still PASS.
    old_iso = (now_utc() - timedelta(days=3)).isoformat()
    (ROOT).mkdir(parents=True, exist_ok=True)
    (ROOT / "receipt-latest.json").write_text(
        json.dumps(
            {
                "sources": {
                    "ga4_pages": {
                        "status": "PASS",
                        "served_from": "live",
                        "as_of": old_iso,
                        "data": {
                            "property": f"properties/{GA4_PROPERTY}",
                            "page_count": 500,
                            "totals": {"screenPageViews": 9000},
                        },
                    }
                }
            }
        )
    )
    put_gsc(age_s=3 * 24 * 3600)  # GSC artifact 3 days old (threshold 24h)
    GA4.collect_ga4 = stub_ga4("ERROR", with_data=False)
    r = build(run_id="STALE")
    ga = r["sources"]["ga4_pages"]
    gt = r["sources"]["gsc_totals"]
    ok8 = (
        ga["served_from"] == "last_known_good"
        and ga["fresh"] is False
        and ga["data"] is not None
        and ga["data"]["page_count"] == 500
        and gt["status"] == "PASS"
        and gt["fresh"] is False
    )
    print(
        "  PASS stale-data: failed live GA4 -> last-known-good (fresh=false); stale GSC PASS+fresh=false"
        if ok8
        else f"  FAIL stale-data: ga4={ga['served_from']}/{ga['fresh']} gsc_fresh={gt['fresh']}"
    )
    fails |= 0 if ok8 else 1

    ROOT, GSC_LATEST, GSC_PAGES, GA4.collect_ga4 = _sv
    shutil.rmtree(td, ignore_errors=True)
    print("SELFTEST PASS" if fails == 0 else "SELFTEST FAIL")
    return fails


def main():
    ap = argparse.ArgumentParser(description="Single structured per-source SEO evidence receipt")
    ap.add_argument("--build", action="store_true")
    ap.add_argument("--run-id", default=None)
    ap.add_argument("--days", type=int, default=90)
    ap.add_argument("--test", action="store_true")
    a = ap.parse_args()
    if a.test:
        sys.exit(selftest())
    r = build(run_id=a.run_id, days=a.days)
    out = ROOT / "runs" / r["run_id"] / "source-receipt.json"
    for k in SOURCES:
        v = r["sources"][k]
        print(
            f"  {k:12s} {v['status']:16s} served={v['served_from']:15s} fresh={str(v['fresh']):5s} age_s={v['age_s']}"
        )
    print(f"  overall worst={r['overall']['worst_status']} all_fresh={r['overall']['all_fresh']}")
    print(f"receipt -> {out}")
    print(f"latest  -> {ROOT / 'receipt-latest.json'}")
    print(f'reveal: open -R "{out}"')
    sys.exit(0)


if __name__ == "__main__":
    main()
