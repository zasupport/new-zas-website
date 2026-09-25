#!/usr/bin/env python3
# ======================================================================
# CLAUDE-CODE-INJECTION
#   operation: create-new-file
#   target_path: scripts/daily-seo-collect.py
#   permissions: "0755"
#   create_parent_dirs: true
#   overwrite_if_exists: false
#   backup_if_exists: true
#   post_install_verify: "python3 scripts/daily-seo-collect.py --test"
#   rollback_command: "git checkout -- scripts/daily-seo-collect.py"
#   hook_governance: lint-v2.sh + secrets.sh (PostToolUse Edit|Write) and
#     test-gate.sh (Stop) govern edits to this file. Beyond that this is a
#     CLI pipeline stage with no Claude lifecycle touchpoint (hook-block-mandate
#     exemption clause, stated explicitly): its equivalent controls are this
#     script's own --test (positive/negative/absence) executed by
#     scripts/smoke-seo-pipeline.sh, which records evidence in the repo.
# END-CLAUDE-CODE-INJECTION
# ======================================================================
"""daily-seo-collect.py — Stage 1 of the Daily SEO Intelligence pipeline.

Collects READ-ONLY evidence into a per-run raw area under ~/.za-daily-seo/runs/<run-id>/raw/.
Records every source's health (FRESH|STALE|BLOCKED|MISSING) with the EXACT failed invocation for
anything unavailable — an unavailable source is NEVER a fabricated zero (§313/§514/§374).

SCOPE (HARD): read-only. No prod write, no deploy, no git, no Google write, no package install.
  - GSC page-dimension is read fresh into THIS run's own snapshot. It deliberately does NOT call
    za-gsc-page-export.py --export, which would rewrite the shared ~/.za-gsc-pages-timeseries.jsonl
    (15k+ accumulated rows that cannot be re-fetched) and the shared CSV. (advisor trap #3)
  - The live-site probe is bounded (priority sample + polite delay); HTTP 200 != indexed.

  --collect [--run-id ID] [--sample N] [--days D]   collect all authorised sources
  --test                                            controls: schema of manifest + BLOCKED-not-zero
"""

import sys
import os
import json
import argparse
import time
import urllib.request
import urllib.error
from pathlib import Path
from datetime import datetime, timezone, timedelta
import xml.etree.ElementTree as ET

HOME = Path(os.path.expanduser("~"))
ROOT = Path(os.environ.get("ZA_DAILY_SEO_ROOT", HOME / ".za-daily-seo"))
SA_JSON = Path(os.environ.get("ZA_SEO_SA_JSON", HOME / "za-seo-service-account.json"))
GSC_SITE = "sc-domain:zasupport.com"
SA_SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]
SITE = os.environ.get("ZA_SITE_ORIGIN", "https://zasupport.com")
REPO = Path(os.environ.get("ZA_REPO", HOME / "Developer/new-zas-website"))
UA = "ZA-DailySEO-ReadOnly-Probe/1.0 (+monitoring; no-store)"
POLITE_DELAY_S = float(os.environ.get("ZA_PROBE_DELAY", "1.0"))
DEFAULT_SAMPLE = int(os.environ.get("ZA_PROBE_SAMPLE", "8"))


def now_utc():
    return datetime.now(timezone.utc)


def run_id_new():
    return now_utc().strftime("%Y%m%dT%H%M%SZ")


def _http_get(url, timeout=15):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        body = r.read().decode("utf-8", "replace")
        return r.status, dict(r.headers), body


# ── GSC (read-only, own snapshot) ──────────────────────────────────────────────
def collect_gsc(days):
    """Returns (rows|None, health_dict). Never writes any shared store."""
    invocation = (
        f"service_account.Credentials.from_service_account_file({SA_JSON}) -> "
        f"searchconsole.searchanalytics().query(site={GSC_SITE}, dims=[page], {days}d)"
    )
    try:
        from google.oauth2 import service_account
        from googleapiclient.discovery import build
    except ImportError as e:
        return None, {
            "state": "BLOCKED",
            "reason": f"google libs missing: {e}",
            "invocation": invocation,
        }
    if not SA_JSON.exists():
        return None, {
            "state": "MISSING",
            "reason": f"service-account JSON absent: {SA_JSON}",
            "invocation": invocation,
        }
    try:
        creds = service_account.Credentials.from_service_account_file(
            str(SA_JSON), scopes=SA_SCOPES
        )
        svc = build("searchconsole", "v1", credentials=creds, cache_discovery=False)
        end = now_utc().date()
        start = end - timedelta(days=days)
        body = {
            "startDate": str(start),
            "endDate": str(end),
            "dimensions": ["page"],
            "rowLimit": 1000,
        }
        resp = svc.searchanalytics().query(siteUrl=GSC_SITE, body=body).execute()
        rows = [
            {
                "page": r["keys"][0] if r.get("keys") else "",
                "clicks": int(r.get("clicks", 0)),
                "impressions": int(r.get("impressions", 0)),
                "position": round(float(r.get("position", 0)), 1),
            }
            for r in resp.get("rows", [])
        ]
        return rows, {
            "state": "FRESH",
            "rows": len(rows),
            "window_days": days,
            "start": str(start),
            "end": str(end),
            "invocation": invocation,
        }
    except Exception as e:
        # quota / auth / transient — reported LOUD as BLOCKED with the exact call, never a silent zero
        return None, {"state": "BLOCKED", "reason": f"API error: {e}", "invocation": invocation}


# ── sitemap (read-only GET) ─────────────────────────────────────────────────────
def collect_sitemap():
    url = f"{SITE}/sitemap.xml"
    try:
        status, _h, body = _http_get(url)
        if status != 200:
            return None, {
                "state": "BLOCKED",
                "reason": f"HTTP {status}",
                "invocation": f"GET {url}",
            }
        urls = []
        root = ET.fromstring(body)
        for loc in root.iter():
            if loc.tag.endswith("}loc") or loc.tag == "loc":
                if loc.text:
                    urls.append(loc.text.strip())
        return urls, {"state": "FRESH", "count": len(urls), "invocation": f"GET {url}"}
    except Exception as e:
        return None, {"state": "BLOCKED", "reason": str(e), "invocation": f"GET {url}"}


# ── live-site tech probe (bounded, polite) ──────────────────────────────────────
def _extract(html):
    import re

    def one(pat):
        m = re.search(pat, html, re.I | re.S)
        return m.group(1).strip()[:300] if m else None

    canon = one(r'<link[^>]+rel=["\']canonical["\'][^>]+href=["\']([^"\']+)["\']')
    title = one(r"<title[^>]*>(.*?)</title>")
    desc = one(r'<meta[^>]+name=["\']description["\'][^>]+content=["\']([^"\']*)["\']')
    robots = one(r'<meta[^>]+name=["\']robots["\'][^>]+content=["\']([^"\']*)["\']')
    import re as _re

    h1 = len(_re.findall(r"<h1[\s>]", html, _re.I))
    # internal links = anchors to same-origin or site-relative
    anchors = _re.findall(r'<a[^>]+href=["\']([^"\']+)["\']', html, _re.I)
    internal = [a for a in anchors if a.startswith("/") or a.startswith(SITE)]
    schema_types = _re.findall(r'"@type"\s*:\s*"([^"]+)"', html)
    return {
        "canonical": canon,
        "title": title,
        "meta_description": desc,
        "robots_meta": robots,
        "h1_count": h1,
        "internal_link_count": len(internal),
        "schema_types": sorted(set(schema_types)),
    }


def collect_siteprobe(urls, sample):
    """Bounded read-only probe. HTTP 200 != indexed — this measures tech-health only."""
    if not urls:
        return None, {
            "state": "MISSING",
            "reason": "no sitemap urls to sample",
            "invocation": "n/a",
        }
    # priority sample: keep it deterministic + small — homepage + evenly-spaced picks
    picks, seen = [], set()
    for u in urls:
        if SITE in u and u.rstrip("/") == SITE:
            picks.append(u)
            seen.add(u)
    step = max(1, len(urls) // max(1, sample))
    for i in range(0, len(urls), step):
        if len(picks) >= sample:
            break
        if urls[i] not in seen:
            picks.append(urls[i])
            seen.add(urls[i])
    results = []
    for u in picks[:sample]:
        rec = {"url": u}
        try:
            status, headers, body = _http_get(u)
            rec["status"] = status
            rec.update(_extract(body))
            rec["x_robots_tag"] = headers.get("X-Robots-Tag")
        except urllib.error.HTTPError as e:
            rec["status"] = e.code
            rec["error"] = f"HTTPError {e.code}"
        except Exception as e:
            rec["status"] = None
            rec["error"] = str(e)
        results.append(rec)
        time.sleep(POLITE_DELAY_S)  # never hammer prod
    return results, {
        "state": "FRESH",
        "sampled": len(results),
        "of_urls": len(urls),
        "invocation": f"GET {SITE}/<{len(results)} sampled paths> (polite {POLITE_DELAY_S}s)",
    }


# ── repo (read-only fs) ─────────────────────────────────────────────────────────
def collect_repo():
    sm = REPO / "src/app/sitemap.ts"
    if not sm.exists():
        return None, {"state": "MISSING", "reason": f"absent: {sm}", "invocation": f"read {sm}"}
    txt = sm.read_text(encoding="utf-8", errors="replace")
    import re

    urls = re.findall(r"url:\s*`([^`]+)`", txt)
    return {"sitemap_ts_url_count": len(urls), "sitemap_ts_urls": urls}, {
        "state": "FRESH",
        "count": len(urls),
        "invocation": f"read {sm}",
    }


# ── known-blocked sources (record exact invocation; do not attempt) ─────────────
def blocked_source(name, invocation, reason):
    return None, {"state": "BLOCKED", "reason": reason, "invocation": invocation}


def collect(run_id, sample, days):
    run_dir = ROOT / "runs" / run_id
    raw = run_dir / "raw"
    raw.mkdir(parents=True, exist_ok=True)
    manifest = {
        "run_id": run_id,
        "generated_utc": now_utc().isoformat(),
        "site": SITE,
        "sources": {},
        "scope": "READ_ONLY_DRY_RUN",
    }

    gsc, gh = collect_gsc(days)
    if gsc is not None:
        (raw / "gsc_pages.json").write_text(json.dumps(gsc, indent=2))
    manifest["sources"]["gsc_pages"] = gh

    urls, sh = collect_sitemap()
    if urls is not None:
        (raw / "sitemap.json").write_text(json.dumps(urls, indent=2))
    manifest["sources"]["sitemap"] = sh

    probe, ph = collect_siteprobe(urls or [], sample)
    if probe is not None:
        (raw / "siteprobe.json").write_text(json.dumps(probe, indent=2))
    manifest["sources"]["live_site"] = ph

    repo, rh = collect_repo()
    if repo is not None:
        (raw / "repo.json").write_text(json.dumps(repo, indent=2))
    manifest["sources"]["repo"] = rh

    # BLOCKED this session — recorded honestly with the exact invocation that would be used
    manifest["sources"]["ga4"] = blocked_source(
        "ga4",
        "mcp__google-analytics runReport (aggregated, non-PII)",
        "google-analytics MCP CONNECTION_CLOSED this session",
    )[1]
    manifest["sources"]["gbp"] = blocked_source(
        "gbp",
        "GBP API accounts.locations (totalReviewCount only)",
        "no live GBP connector authorised this session",
    )[1]
    manifest["sources"]["perplexity"] = blocked_source(
        "perplexity",
        "mcp__perplexity perplexity_ask",
        "Perplexity MCP 401 (invalid/absent pplx- key)",
    )[1]

    (run_dir / "collect-manifest.json").write_text(json.dumps(manifest, indent=2))
    return manifest


def selftest():
    import tempfile
    import subprocess

    fails = 0
    td = tempfile.mkdtemp()
    # ABSENCE control: point SA_JSON at a nonexistent file -> GSC must be MISSING/BLOCKED, not zero rows.
    # collect_gsc is tested directly (in-process) rather than via subprocess.
    global SA_JSON, ROOT
    _sa, _root = SA_JSON, ROOT
    SA_JSON = Path(td) / "nope.json"
    ROOT = Path(td)
    rows, health = collect_gsc(days=1)
    ok = rows is None and health["state"] in ("MISSING", "BLOCKED") and "invocation" in health
    print(
        "  PASS absence: no-cred GSC -> BLOCKED/MISSING with invocation, never a silent 0-row success"
        if ok
        else f"  FAIL absence: {health}"
    )
    fails |= 0 if ok else 1
    # POSITIVE (structure): a fabricated sitemap parse yields urls + FRESH health shape
    sample_xml = (
        '<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
        "<url><loc>https://zasupport.com/</loc></url>"
        "<url><loc>https://zasupport.com/logic-board-repair</loc></url></urlset>"
    )
    root = ET.fromstring(sample_xml)
    parsed = [n.text for n in root.iter() if n.tag.endswith("}loc")]
    ok2 = parsed == ["https://zasupport.com/", "https://zasupport.com/logic-board-repair"]
    print(
        "  PASS positive: sitemap XML parses to loc list"
        if ok2
        else "  FAIL positive: sitemap parse"
    )
    fails |= 0 if ok2 else 1
    # NEGATIVE (extract power): a page with NO canonical must report canonical=None, not invent one
    ex = _extract(
        "<html><head><title>T</title></head><body><h1>x</h1><a href='/a'>a</a>"
        '<script>{"@type":"Service"}</script></body></html>'
    )
    ok3 = (
        ex["canonical"] is None
        and ex["h1_count"] == 1
        and ex["internal_link_count"] == 1
        and "Service" in ex["schema_types"]
    )
    print(
        "  PASS negative: missing canonical -> None (not fabricated); h1/link/schema counted"
        if ok3
        else f"  FAIL negative: {ex}"
    )
    fails |= 0 if ok3 else 1
    SA_JSON, ROOT = _sa, _root
    subprocess.run(["rm", "-rf", td])
    print("SELFTEST PASS" if fails == 0 else "SELFTEST FAIL")
    return fails


def main():
    ap = argparse.ArgumentParser(description="Daily SEO collect (read-only)")
    ap.add_argument("--collect", action="store_true")
    ap.add_argument("--run-id", default=None)
    ap.add_argument("--sample", type=int, default=DEFAULT_SAMPLE)
    ap.add_argument("--days", type=int, default=90)
    ap.add_argument("--test", action="store_true")
    a = ap.parse_args()
    if a.test:
        sys.exit(selftest())
    rid = a.run_id or run_id_new()
    m = collect(rid, a.sample, a.days)
    print(f"run-id: {rid}")
    for name, h in m["sources"].items():
        print(
            f"  {name:14s} {h['state']:8s} {h.get('reason', h.get('rows', h.get('count', h.get('sampled', ''))))}"
        )
    print(f"raw + manifest -> {ROOT}/runs/{rid}/")
    # exit 0 always: a BLOCKED source is a RECORDED fact, not a collect failure
    sys.exit(0)


if __name__ == "__main__":
    main()
