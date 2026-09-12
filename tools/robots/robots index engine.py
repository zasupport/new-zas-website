#!/usr/bin/env python3
"""
PURPOSE   Detect, adjudicate and permanently correct the Google Search Console
          condition "Indexed, though blocked by robots.txt" for zasupport.com.
STORAGE   ~/Projects/zas robots index fix/
EXECUTES  python3 "robots index engine.py" <stage> [--flags]
RELATED   robots guard.py | config.json | validation.log
PLACEMENT target_path: tools/robots/robots index engine.py (in place, per STORAGE)
GOVERNANCE HOOK-GOVERNANCE: not-hook-governed — standalone CLI, no Claude Code
          lifecycle touchpoint; equivalent controls per hook-block-mandate
          exemption clause: robots pressure test.py + validation.log proof lines
VERSION   1.3.0
DATE      18/07/2026 13:39 SAST
AUTHOR    Courtney Bentley, ZA Support (Vizibiliti Intelligent Solutions Pty Ltd)

Stages
  discover     Pull live robots.txt + sitemaps + GSC CSV exports, match locally (protego).
  inspect      Call GSC URL Inspection API per candidate, quota-governed, cached.
  adjudicate   Fetch each flagged URL live, ask claude-fable-5 for a JSON verdict.
  patch        Apply the verdict to the Next.js repo on a git branch. Archive, never delete.
  verify       Re-read live robots.txt + re-inspect. Write proof lines to validation.log.
  all          discover -> inspect -> adjudicate -> patch -> verify

Evidence base for the remediation logic (all primary source):
  - GSC has no index-coverage API. URL Inspection is the only programmatic mirror.
    https://developers.google.com/webmaster-tools/v1/urlInspection.index/inspect
  - URL Inspection quota: 2,000 QPD and 600 QPM per property.
    https://developers.google.com/webmaster-tools/limits
  - noindex is only effective if the page is NOT blocked by robots.txt, because a
    blocked crawler never sees the rule.
    https://developers.google.com/search/docs/crawling-indexing/block-indexing
  - robots.txt is not an indexing control. A disallowed URL can still be indexed
    when linked externally.
    https://developers.google.com/search/docs/crawling-indexing/robots/intro
  - Indexing API cannot be used for general pages (JobPosting / BroadcastEvent only),
    so programmatic recrawl is not available for this site.
    https://developers.google.com/search/apis/indexing-api/v3/quickstart
"""

import argparse
import hashlib
import json
import os
import re
import shutil
import subprocess
import sys
import time
from datetime import datetime, timedelta, timezone
from pathlib import Path
from xml.etree import ElementTree

import requests
from protego import Protego

# --------------------------------------------------------------------------------------
# Paths and constants
# --------------------------------------------------------------------------------------

ROOT = Path(__file__).resolve().parent
STATE = ROOT / "state"
INBOX = ROOT / "inbox"
ARCHIVE = ROOT / "_archive"
LOG = ROOT / "validation.log"
CONFIG = ROOT / "config.json"

SAST = timezone(timedelta(hours=2))
UA = "Mozilla/5.0 (compatible; ZASupportIndexAudit/1.0; +https://zasupport.com)"
GOOGLEBOT = "Googlebot"

BLOCKED_MARKER = "blocked by robots.txt"

# Anthropic model. Fable is the Mythos-tier model with the additional safety measures
# for biology, cyber and LLM R&D. Model string per Anthropic product documentation.
FABLE_MODEL = "claude-fable-5"
ANTHROPIC_URL = "https://api.anthropic.com/v1/messages"
ANTHROPIC_VERSION = "2023-06-01"

GSC_INSPECT_URL = "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect"
GSC_SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]

QPD_CAP = 2000  # per Search Console property, per Google usage limits
QPM_CAP = 600  # per Search Console property, per Google usage limits
SAFE_QPM = 240  # self-imposed ceiling, 40 percent of Google's limit


# --------------------------------------------------------------------------------------
# Small helpers
# --------------------------------------------------------------------------------------


def now_sast():
    return datetime.now(SAST)


def stamp():
    return now_sast().strftime("%d/%m/%Y %H:%M SAST")


def fstamp():
    return now_sast().strftime("%d %m %Y %H%M")


def say(msg):
    print(f"[{now_sast().strftime('%H:%M:%S')}] {msg}", flush=True)


def proof(line):
    """Append a proof line to validation.log. Nothing is DONE without a proof line."""
    LOG.parent.mkdir(parents=True, exist_ok=True)
    with LOG.open("a", encoding="utf-8") as fh:
        fh.write(f"{stamp()} | {line}\n")
    say(f"PROOF  {line}")


def load_json(path, default):
    try:
        return json.loads(Path(path).read_text(encoding="utf-8"))
    except Exception:
        return default


def save_json(path, obj):
    Path(path).parent.mkdir(parents=True, exist_ok=True)
    Path(path).write_text(
        json.dumps(obj, indent=2, ensure_ascii=False), encoding="utf-8"
    )


def sha256_text(text):
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def archive_file(path):
    """Archive, never delete. Returns archive path or None."""
    p = Path(path)
    if not p.exists():
        return None
    dest = ARCHIVE / fstamp()
    dest.mkdir(parents=True, exist_ok=True)
    target = dest / p.name
    shutil.copy2(p, target)
    return target


def cfg():
    c = load_json(CONFIG, {})
    if not c:
        say("config.json missing. Run the installer block first.")
        sys.exit(2)
    return c


# --------------------------------------------------------------------------------------
# Stage 1: discover
# --------------------------------------------------------------------------------------


def normalise_robots(text):
    """
    Bring a robots.txt into the form Google actually parses, before handing it
    to protego.

    Google's specification states that the file must be UTF-8 and that lines may
    be separated by CR, CR/LF or LF, and that Google ignores invalid lines
    including a Unicode BOM at the start of the file.
    https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt

    protego does not strip the BOM. A file saved with a BOM therefore has its
    first User-agent line silently discarded and every rule under it ignored,
    so a BOM'd "Disallow: /" reads as wide open to protego while Google honours
    it and removes the site from search. The pressure test caught this on
    18/07/2026 as a negative-control blind spot. This function closes it.

    Google also stops reading after 500 KiB, so anything beyond that is dropped
    here too rather than being trusted.
    """
    text = text.removeprefix("\ufeff")
    text = text.replace("\r\n", "\n").replace("\r", "\n")
    encoded = text.encode("utf-8")
    limit = 500 * 1024
    if len(encoded) > limit:
        text = encoded[:limit].decode("utf-8", errors="ignore")
    return text


def fetch_text(url, timeout=30):
    r = requests.get(
        url, headers={"User-Agent": UA}, timeout=timeout, allow_redirects=True
    )
    r.raise_for_status()
    return r.text


def collect_sitemap_urls(sitemap_url, seen=None, depth=0):
    """Walk sitemap indexes recursively. Returns a set of loc URLs."""
    seen = seen if seen is not None else set()
    if depth > 4 or sitemap_url in seen:
        return set()
    seen.add(sitemap_url)
    out = set()
    try:
        xml = fetch_text(sitemap_url)
    except Exception as exc:
        say(f"sitemap fetch failed {sitemap_url}: {exc}")
        return out
    try:
        root = ElementTree.fromstring(xml.encode("utf-8"))
    except ElementTree.ParseError as exc:
        say(f"sitemap parse failed {sitemap_url}: {exc}")
        return out
    ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    tag = root.tag.split("}")[-1]
    if tag == "sitemapindex":
        for loc in root.findall(".//s:sitemap/s:loc", ns):
            if loc.text:
                out |= collect_sitemap_urls(loc.text.strip(), seen, depth + 1)
    else:
        for loc in root.findall(".//s:url/s:loc", ns):
            if loc.text:
                out.add(loc.text.strip())
    return out


def read_inbox_csv_urls(site):
    """
    GSC exposes no coverage API, so the authoritative affected-URL list comes from the
    EXPORT button on the issue detail page. Drop those CSV or TSV exports into inbox/.
    Any cell that looks like a URL on this site is harvested.
    """
    INBOX.mkdir(parents=True, exist_ok=True)
    urls = set()
    files = []
    for pattern in ("*.csv", "*.tsv", "*.txt"):
        files.extend(INBOX.glob(pattern))
    rx = re.compile(re.escape(site.rstrip("/")) + r"[^\s\",;]*")
    for f in files:
        try:
            text = f.read_text(encoding="utf-8", errors="replace")
        except Exception:
            continue
        for m in rx.findall(text):
            urls.add(m.strip().rstrip('",;'))
    return urls, [f.name for f in files]


def gsc_credentials():
    """Service account or OAuth user credentials for the Search Console API."""
    from google.oauth2 import service_account

    c = cfg()
    key = os.path.expanduser(c.get("gsc_service_account_json", ""))
    if not key or not Path(key).exists():
        return None
    return service_account.Credentials.from_service_account_file(key, scopes=GSC_SCOPES)


def gsc_top_pages(days=90, row_limit=1000):
    """
    Search Analytics page dimension. This surfaces indexed URLs that receive
    impressions but are absent from the sitemap, which is exactly the population
    that produces this condition.
    """
    try:
        from googleapiclient.discovery import build
    except Exception:
        say("google-api-python-client not installed, skipping Search Analytics")
        return set()
    creds = gsc_credentials()
    if creds is None:
        say("no GSC credentials, skipping Search Analytics")
        return set()
    c = cfg()
    svc = build("searchconsole", "v1", credentials=creds, cache_discovery=False)
    end = now_sast().date()
    start = end - timedelta(days=days)
    body = {
        "startDate": start.isoformat(),
        "endDate": end.isoformat(),
        "dimensions": ["page"],
        "rowLimit": row_limit,
    }
    try:
        resp = (
            svc.searchanalytics().query(siteUrl=c["gsc_property"], body=body).execute()
        )
    except Exception as exc:
        say(f"Search Analytics query failed: {exc}")
        return set()
    return {r["keys"][0] for r in resp.get("rows", [])}


def stage_discover(args):
    c = cfg()
    site = c["site"].rstrip("/")
    STATE.mkdir(parents=True, exist_ok=True)

    robots_url = f"{site}/robots.txt"
    robots_txt = fetch_text(robots_url)
    (STATE / "live robots.txt").write_text(robots_txt, encoding="utf-8")
    rhash = sha256_text(robots_txt)
    proof(
        f"discover | robots.txt fetched | {len(robots_txt)} bytes | sha256 {rhash[:16]}"
    )

    parser = Protego.parse(normalise_robots(robots_txt))

    sitemap_urls = set()
    for sm in c.get("sitemaps", [f"{site}/sitemap.xml"]):
        sitemap_urls |= collect_sitemap_urls(sm)
    proof(f"discover | sitemap URLs {len(sitemap_urls)}")

    csv_urls, csv_files = read_inbox_csv_urls(site)
    proof(f"discover | inbox exports {csv_files or 'none'} | URLs {len(csv_urls)}")

    sa_urls = set()
    if not args.no_search_analytics:
        sa_urls = gsc_top_pages()
        proof(f"discover | Search Analytics pages {len(sa_urls)}")

    candidates = sorted(sitemap_urls | csv_urls | sa_urls)

    local_blocked = []
    for u in candidates:
        try:
            allowed = parser.can_fetch(u, GOOGLEBOT)
        except Exception:
            allowed = True
        if not allowed:
            local_blocked.append(u)

    out = {
        "generated": stamp(),
        "site": site,
        "robots_sha256": rhash,
        "robots_txt": robots_txt,
        "counts": {
            "sitemap": len(sitemap_urls),
            "inbox_csv": len(csv_urls),
            "search_analytics": len(sa_urls),
            "candidates": len(candidates),
            "locally_disallowed": len(local_blocked),
        },
        "candidates": candidates,
        "locally_disallowed": local_blocked,
        "inbox_urls": sorted(csv_urls),
    }
    save_json(STATE / "discovery.json", out)
    proof(
        f"discover | candidates {len(candidates)} | "
        f"disallowed to Googlebot by live robots.txt {len(local_blocked)}"
    )
    if local_blocked:
        say("Locally disallowed candidates (first 20):")
        for u in local_blocked[:20]:
            say(f"   BLOCKED  {u}")
    return out


# --------------------------------------------------------------------------------------
# Stage 2: inspect
# --------------------------------------------------------------------------------------


class Quota:
    """Persistent day-scoped ledger so repeat runs never breach Google's caps."""

    def __init__(self, path):
        self.path = Path(path)
        self.data = load_json(self.path, {})
        self.day = now_sast().strftime("%Y-%m-%d")
        self.data.setdefault(self.day, 0)
        self.minute_bucket = []

    def remaining(self):
        return QPD_CAP - self.data[self.day]

    def take(self):
        if self.remaining() <= 0:
            raise RuntimeError(
                "URL Inspection daily quota exhausted (2000 QPD per property)"
            )
        now = time.time()
        self.minute_bucket = [t for t in self.minute_bucket if now - t < 60]
        if len(self.minute_bucket) >= SAFE_QPM:
            sleep_for = 60 - (now - self.minute_bucket[0]) + 0.5
            say(f"rate limit hold {sleep_for:.1f}s")
            time.sleep(max(sleep_for, 0))
            self.minute_bucket = []
        self.minute_bucket.append(time.time())
        self.data[self.day] += 1
        save_json(self.path, self.data)


def inspect_url(svc, property_url, url):
    body = {"inspectionUrl": url, "siteUrl": property_url, "languageCode": "en-US"}
    resp = svc.urlInspection().index().inspect(body=body).execute()
    return resp.get("inspectionResult", {})


def stage_inspect(args):
    from googleapiclient.discovery import build

    c = cfg()
    disc = load_json(STATE / "discovery.json", None)
    if not disc:
        say("run discover first")
        sys.exit(2)

    creds = gsc_credentials()
    if creds is None:
        say(
            "No GSC service account configured. Set gsc_service_account_json in config.json."
        )
        sys.exit(2)

    svc = build("searchconsole", "v1", credentials=creds, cache_discovery=False)
    quota = Quota(STATE / "quota.json")
    cache = load_json(STATE / "inspect cache.json", {})

    # Priority order. Anything the live robots.txt blocks, plus anything Courtney
    # exported from the GSC issue page, gets inspected before the bulk sitemap set.
    priority = list(dict.fromkeys(disc["locally_disallowed"] + disc["inbox_urls"]))
    rest = [u for u in disc["candidates"] if u not in set(priority)]
    order = priority + (rest if args.full else [])

    limit = min(args.limit or len(order), quota.remaining())
    order = order[:limit]
    say(f"inspecting {len(order)} URLs | daily quota remaining {quota.remaining()}")

    flagged, errors, inspected = [], [], 0
    for i, url in enumerate(order, 1):
        key = f"{url}|{quota.day}"
        if key in cache and not args.refresh:
            res = cache[key]
        else:
            try:
                quota.take()
                res = inspect_url(svc, c["gsc_property"], url)
                cache[key] = res
                inspected += 1
            except Exception as exc:
                errors.append({"url": url, "error": str(exc)})
                say(f"  ERROR {url} :: {exc}")
                if "quota" in str(exc).lower():
                    break
                continue
        idx = res.get("indexStatusResult", {})
        coverage = (idx.get("coverageState") or "").strip()
        robots_state = idx.get("robotsTxtState") or ""
        if BLOCKED_MARKER in coverage.lower() or robots_state == "DISALLOWED":
            flagged.append(
                {
                    "url": url,
                    "coverageState": coverage,
                    "robotsTxtState": robots_state,
                    "indexingState": idx.get("indexingState"),
                    "pageFetchState": idx.get("pageFetchState"),
                    "verdict": idx.get("verdict"),
                    "lastCrawlTime": idx.get("lastCrawlTime"),
                    "googleCanonical": idx.get("googleCanonical"),
                    "userCanonical": idx.get("userCanonical"),
                    "referringUrls": idx.get("referringUrls", []),
                    "inspectionResultLink": res.get("inspectionResultLink"),
                }
            )
        if i % 25 == 0:
            save_json(STATE / "inspect cache.json", cache)
            say(f"  {i}/{len(order)} inspected, {len(flagged)} flagged")

    save_json(STATE / "inspect cache.json", cache)
    save_json(
        STATE / "flagged.json",
        {
            "generated": stamp(),
            "inspected_live": inspected,
            "from_cache": len(order) - inspected - len(errors),
            "flagged_count": len(flagged),
            "flagged": flagged,
            "errors": errors,
        },
    )
    proof(
        f"inspect | live calls {inspected} | flagged {len(flagged)} | "
        f"errors {len(errors)} | quota used today {quota.data[quota.day]}/{QPD_CAP}"
    )
    for f in flagged:
        say(
            f"   FLAGGED  {f['url']}  ::  {f['coverageState']}  ::  {f['robotsTxtState']}"
        )
    return flagged


# --------------------------------------------------------------------------------------
# Stage 3: adjudicate with Fable
# --------------------------------------------------------------------------------------


def live_page_evidence(url):
    """Direct fetch. What the page actually says about itself is primary evidence."""
    out = {"url": url}
    try:
        r = requests.get(
            url, headers={"User-Agent": UA}, timeout=30, allow_redirects=True
        )
        html = r.text[:200000]
        out["status"] = r.status_code
        out["final_url"] = r.url
        out["redirected"] = r.url.rstrip("/") != url.rstrip("/")
        out["x_robots_tag"] = r.headers.get("X-Robots-Tag", "")
        out["content_type"] = r.headers.get("Content-Type", "")
        m = re.search(
            r'<meta[^>]+name=["\']robots["\'][^>]+content=["\']([^"\']+)["\']',
            html,
            re.IGNORECASE,
        )
        out["meta_robots"] = m.group(1) if m else ""
        m = re.search(
            r'<link[^>]+rel=["\']canonical["\'][^>]+href=["\']([^"\']+)["\']',
            html,
            re.IGNORECASE,
        )
        out["canonical"] = m.group(1) if m else ""
        m = re.search(r"<title[^>]*>(.*?)</title>", html, re.IGNORECASE | re.DOTALL)
        out["title"] = re.sub(r"\s+", " ", m.group(1)).strip()[:200] if m else ""
        text = re.sub(
            r"<script.*?</script>|<style.*?</style>",
            " ",
            html,
            flags=re.IGNORECASE | re.DOTALL,
        )
        text = re.sub(r"<[^>]+>", " ", text)
        out["text_sample"] = re.sub(r"\s+", " ", text).strip()[:1200]
    except Exception as exc:
        out["status"] = None
        out["error"] = str(exc)
    return out


FABLE_SYSTEM = """You are the indexing adjudicator for zasupport.com, the website of ZA Support
(Vizibiliti Intelligent Solutions Pty Ltd), a 16 year Apple specialist IT managed services
provider in Johannesburg serving medical practices, SMEs and individuals.

You decide, for one URL at a time, what Google should do with it, and which permanent
technical control enforces that decision.

The governing facts, which you must not contradict:
1. robots.txt controls crawling, not indexing. A disallowed URL can still be indexed if
   something links to it. That is the exact condition producing this report entry.
2. A noindex rule is only effective when the URL is crawlable. If robots.txt blocks the
   URL, Googlebot never sees the noindex and the URL stays in the index indefinitely.
3. Therefore any URL that must leave the index has to be UNBLOCKED in robots.txt and given
   a noindex signal, or removed at the origin, or placed behind authentication.
4. Blocking in robots.txt and setting noindex at the same time is the failure mode that
   created this issue. Never recommend it.

Return STRICT JSON only. No prose, no markdown, no code fences.

{
  "intent": "INDEX" | "DEINDEX" | "REMOVE",
  "action": "ALLOW_CRAWL" | "ALLOW_CRAWL_PLUS_NOINDEX" | "GONE_410" | "REDIRECT_301" | "AUTH_GATE",
  "robots_disallow_to_remove": ["/path/prefix/"],
  "robots_disallow_to_keep": ["/path/prefix/"],
  "noindex_path_pattern": "/path/:slug*" or "",
  "redirect_target": "" ,
  "confidence": 0.0 to 1.0,
  "risk": "LOW" | "MEDIUM" | "HIGH",
  "reasoning": "two sentences maximum, plain English, no filler"
}

Decision guidance:
- Commercial service, repair, location, answer or blog pages that serve customers: INDEX,
  action ALLOW_CRAWL. Remove the robots.txt rule blocking them.
- CMS studio, admin, authentication, account, preview, draft and internal tooling routes:
  DEINDEX, action AUTH_GATE where the route is genuinely private, otherwise
  ALLOW_CRAWL_PLUS_NOINDEX. Keep the robots.txt rule ONLY if the URL is not currently in
  the index. If it is already indexed, the rule must come off so Google can read noindex.
- API endpoints returning JSON with no user-facing value and no index presence: keep
  disallowed, intent DEINDEX, action ALLOW_CRAWL_PLUS_NOINDEX via X-Robots-Tag only if
  the URL is already indexed.
- URLs returning 404 or that no longer exist: REMOVE, action GONE_410.
- URLs that duplicate a canonical page: REMOVE, action REDIRECT_301 with redirect_target.
- If the evidence is thin, set confidence below 0.6 and risk HIGH. A human reviews those.
"""


def fable_adjudicate(payload, api_key, model=FABLE_MODEL, retries=3):
    headers = {
        "x-api-key": api_key,
        "anthropic-version": ANTHROPIC_VERSION,
        "content-type": "application/json",
    }
    body = {
        "model": model,
        "max_tokens": 8000,
        "system": FABLE_SYSTEM,
        "messages": [
            {"role": "user", "content": json.dumps(payload, ensure_ascii=False)}
        ],
    }
    last = None
    for attempt in range(1, retries + 1):
        try:
            r = requests.post(ANTHROPIC_URL, headers=headers, json=body, timeout=120)
            if r.status_code in (429, 500, 502, 503, 529):
                wait = min(2**attempt, 30)
                say(f"  Fable {r.status_code}, retry {attempt}/{retries} in {wait}s")
                time.sleep(wait)
                last = f"HTTP {r.status_code}"
                continue
            r.raise_for_status()
            data = r.json()
            text = "".join(
                blk.get("text", "")
                for blk in data.get("content", [])
                if blk.get("type") == "text"
            ).strip()
            fence = chr(96) * 3
            text = re.sub(
                rf"^{fence}(?:json)?|{fence}$", "", text, flags=re.MULTILINE
            ).strip()
            return json.loads(text)
        except Exception as exc:
            last = str(exc)
            say(f"  Fable attempt {attempt}/{retries} failed: {exc}")
            time.sleep(min(2**attempt, 30))
    return {
        "error": last,
        "intent": "REVIEW",
        "action": "NONE",
        "confidence": 0.0,
        "risk": "HIGH",
        "reasoning": "Adjudication failed, human review required.",
    }


def stage_adjudicate(args):
    c = cfg()
    api_key = os.environ.get("ANTHROPIC_API_KEY", "").strip()
    if not api_key:
        say("ANTHROPIC_API_KEY not set. Load ~/.za-support.env first.")
        sys.exit(2)

    flagged_doc = load_json(STATE / "flagged.json", None)
    if not flagged_doc:
        say("run inspect first")
        sys.exit(2)
    disc = load_json(STATE / "discovery.json", {})
    robots_txt = disc.get("robots_txt", "")
    sitemap_set = set(disc.get("candidates", []))

    verdicts = []
    for item in flagged_doc["flagged"]:
        url = item["url"]
        say(f"adjudicating {url}")
        payload = {
            "url": url,
            "site": c["site"],
            "gsc_evidence": item,
            "live_page": live_page_evidence(url),
            "in_sitemap": url in sitemap_set,
            "robots_txt": robots_txt,
        }
        v = fable_adjudicate(payload, api_key, model=args.model or FABLE_MODEL)
        v["url"] = url
        verdicts.append(v)
        say(
            f"   -> {v.get('intent')} / {v.get('action')} "
            f"(confidence {v.get('confidence')}, risk {v.get('risk')})"
        )
        time.sleep(0.4)

    save_json(
        STATE / "verdicts.json",
        {
            "generated": stamp(),
            "model": args.model or FABLE_MODEL,
            "verdicts": verdicts,
        },
    )
    low = [v for v in verdicts if float(v.get("confidence") or 0) < 0.6]
    proof(
        f"adjudicate | model {args.model or FABLE_MODEL} | verdicts {len(verdicts)} | "
        f"below confidence threshold {len(low)}"
    )
    return verdicts


# --------------------------------------------------------------------------------------
# Stage 4: patch the repo
# --------------------------------------------------------------------------------------

ROBOTS_CANDIDATES = [
    "app/robots.ts",
    "app/robots.js",
    "src/app/robots.ts",
    "src/app/robots.js",
    "public/robots.txt",
    "app/robots.txt",
]


def find_robots_source(repo):
    repo = Path(repo)
    for rel in ROBOTS_CANDIDATES:
        p = repo / rel
        if p.exists():
            return p
    hits = list(repo.glob("**/robots.ts")) + list(repo.glob("**/robots.txt"))
    hits = [h for h in hits if "node_modules" not in str(h) and ".next" not in str(h)]
    return hits[0] if hits else None


def git(repo, *args, check=True):
    r = subprocess.run(["git", "-C", str(repo), *args], capture_output=True, text=True)
    if check and r.returncode != 0:
        raise RuntimeError(f"git {' '.join(args)} failed: {r.stderr.strip()}")
    return r.stdout.strip()


DISALLOW_ARRAY_RE = re.compile(r"(disallow\s*=\s*\[)(.*?)(\])", re.DOTALL)


def remove_disallow_rules(text, remove_rules, suffix):
    """Remove the given rule string-literals from ONLY the disallow array (.ts/.js)
    or the Disallow: lines (.txt).

    F12 fix: the previous implementation ran text.replace() and a trailing-comma
    regex across the WHOLE file, so a rule string that also appears in a comment or
    a different array would be stripped and unrelated commas tidied. Here every edit
    is confined to the `disallow = [ ... ]` array slice (or, for robots.txt, the
    Disallow: lines). If the array cannot be located in a .ts/.js file the text is
    returned UNCHANGED (fail-closed): rewrite_is_sound then rejects it because the
    rule is still present, and the original is restored, rather than doing blind
    whole-file surgery.
    """
    if suffix == ".txt":
        for rule in sorted(remove_rules):
            text = re.sub(rf"(?im)^\s*Disallow:\s*{re.escape(rule)}\s*$\n?", "", text)
        return text
    m = DISALLOW_ARRAY_RE.search(text)
    if not m:
        return text  # fail-closed, no whole-file fallback
    head, body, tail = m.group(1), m.group(2), m.group(3)
    for rule in sorted(remove_rules):
        body = re.sub(rf"(?m)^\s*['\"]{re.escape(rule)}['\"],?\s*$\n?", "", body)
        body = body.replace(f"'{rule}', ", "").replace(f'"{rule}", ', "")
        body = body.replace(f"'{rule}'", "").replace(f'"{rule}"', "")
    segment = head + body + tail
    segment = re.sub(r",(\s*\])", r"\1", segment)  # drop a dangling comma before ]
    segment = re.sub(r",(\s*),", r"\1,", segment)  # collapse doubled commas
    return text[: m.start()] + segment + text[m.end() :]


def rewrite_is_sound(original, rewritten, removed, kept):
    """
    Structural self-check on an edited robots source. A regex edit on a TypeScript
    file is a real risk, so the rewrite has to prove it did what it claimed and
    nothing else. Any failure restores the original.
    """
    for ch_open, ch_close in (("{", "}"), ("[", "]"), ("(", ")")):
        if original.count(ch_open) - original.count(ch_close) != rewritten.count(
            ch_open
        ) - rewritten.count(ch_close):
            return False, f"bracket balance changed for {ch_open}{ch_close}"
    for q in ("'", '"', "`"):
        if original.count(q) % 2 != rewritten.count(q) % 2:
            return False, f"quote parity changed for {q}"
    # "Removed" is checked in the disallow array only. A removed rule string may
    # legitimately still appear in a comment or an unrelated array (F12) — that is
    # NOT a failed removal, and a whole-file check here would false-reject the
    # correctly-scoped edit and restore the original (i.e. never remove anything).
    _arr = DISALLOW_ARRAY_RE.search(rewritten)
    for rule in removed:
        if _arr is not None:
            body = _arr.group(2)
            if f"'{rule}'" in body or f'"{rule}"' in body or f"`{rule}`" in body:
                return (
                    False,
                    f"rule {rule} was supposed to be removed but is still in the disallow array",
                )
        elif rule in rewritten:  # robots.txt / no array: fall back to whole-file
            return False, f"rule {rule} was supposed to be removed but is still present"
    for rule in kept:
        if rule in original and rule not in rewritten:
            return False, f"rule {rule} was supposed to be kept but was removed"
    shrink = len(original) - len(rewritten)
    # Plausible shrink = the bytes of the removed rules plus their punctuation
    # (quotes + comma + surrounding whitespace/newline), plus a small slack. This is
    # far tighter than the old len*0.4 heuristic, which permitted large collateral
    # edits on a whole-file rewrite (F12). Removal-only edits cannot legitimately
    # shrink the file by more than the rules they delete.
    max_shrink = max(120, sum(len(r) + 6 for r in removed) + 200)
    if shrink < 0 or shrink > max_shrink:
        return False, f"implausible size change of {shrink} bytes (budget {max_shrink})"
    if not rewritten.strip():
        return False, "rewritten file is empty"
    return True, "ok"


def stage_patch(args):
    c = cfg()
    repo = Path(os.path.expanduser(c["repo_path"]))
    if not (repo / ".git").exists():
        say(f"{repo} is not a git repository")
        sys.exit(2)

    doc = load_json(STATE / "verdicts.json", None)
    if not doc:
        say("run adjudicate first")
        sys.exit(2)
    verdicts = doc["verdicts"]

    # Independent verification gate. If verification has run, only CONFIRMED
    # verdicts are eligible. Absence of verification is itself a blocker unless
    # explicitly overridden, because an unverified verdict has never been checked
    # against raw data.
    approved = load_json(STATE / "approved verdicts.json", None)
    if approved is None:
        if not args.skip_verification:
            say(
                'No verification found. Run: python3 "robots index engine.py" verify-independent'
            )
            say(
                "Override deliberately with --skip-verification if you accept unverified verdicts."
            )
            sys.exit(2)
        proof(
            "patch | WARNING | proceeding without independent verification, operator override"
        )
    else:
        ok = set(approved["urls"])
        withheld = [v["url"] for v in verdicts if v["url"] not in ok]
        verdicts = [v for v in verdicts if v["url"] in ok]
        if withheld:
            proof(
                f"patch | {len(withheld)} verdict(s) withheld by the independent verifier"
            )
            for u in withheld:
                say(f"   WITHHELD  {u}")

    remove_rules, keep_rules, noindex_paths, gone_paths, redirects = (
        set(),
        set(),
        [],
        [],
        [],
    )
    review = []
    for v in verdicts:
        if float(v.get("confidence") or 0) < args.min_confidence:
            review.append(v)
            continue
        for r in v.get("robots_disallow_to_remove") or []:
            remove_rules.add(r)
        for r in v.get("robots_disallow_to_keep") or []:
            keep_rules.add(r)
        action = v.get("action")
        if action == "ALLOW_CRAWL_PLUS_NOINDEX" and v.get("noindex_path_pattern"):
            noindex_paths.append(v["noindex_path_pattern"])
        if action == "GONE_410":
            gone_paths.append(v["url"])
        if action == "REDIRECT_301" and v.get("redirect_target"):
            redirects.append({"from": v["url"], "to": v["redirect_target"]})

    plan = {
        "generated": stamp(),
        "remove_disallow": sorted(remove_rules),
        "keep_disallow": sorted(keep_rules),
        "noindex_paths": sorted(set(noindex_paths)),
        "gone_410": sorted(set(gone_paths)),
        "redirect_301": redirects,
        "held_for_human_review": review,
    }
    save_json(STATE / "patch plan.json", plan)
    say(json.dumps(plan, indent=2)[:3000])

    if args.dry_run:
        proof(
            f"patch | DRY RUN | remove {len(remove_rules)} rules | "
            f"noindex {len(noindex_paths)} | 410 {len(gone_paths)} | review {len(review)}"
        )
        return plan

    branch = f"seo/robots-index-fix-{now_sast().strftime('%Y%m%d-%H%M')}"
    prev_branch = git(repo, "rev-parse", "--abbrev-ref", "HEAD")
    git(repo, "checkout", "-b", branch)

    src = find_robots_source(repo)
    if src is None:
        say("no robots source found in repo, cannot patch automatically")
        sys.exit(2)
    archived = archive_file(src)
    proof(f"patch | robots source {src.relative_to(repo)} | archived to {archived}")

    text = src.read_text(encoding="utf-8")
    original = text
    # F12: removals confined to the disallow array slice (see remove_disallow_rules).
    text = remove_disallow_rules(text, remove_rules, src.suffix)
    if text != original:
        ok, why = rewrite_is_sound(original, text, remove_rules, keep_rules)
        if not ok:
            src.write_text(original, encoding="utf-8")
            git(repo, "checkout", prev_branch, check=False)
            git(repo, "branch", "-D", branch, check=False)
            proof(
                f"patch | REWRITE REJECTED | {why} | original restored, branch unwound"
            )
            say("The automatic rewrite did not pass its structural self-check.")
            say(f"Original is intact. Archived copy: {archived}")
            say(
                "Edit the robots source by hand using state/patch plan.json, then rerun verify."
            )
            sys.exit(3)
        src.write_text(text, encoding="utf-8")
        proof(
            f"patch | rewrote {src.name} | {len(remove_rules)} Disallow rules removed | "
            f"structural self-check passed"
        )

    if noindex_paths:
        hdr = repo / "seo noindex headers.md"
        hdr.write_text(
            "# X-Robots-Tag noindex targets\n\n"
            f"Generated {stamp()}\n\n"
            "Add these to the `headers()` block in next.config so Google can crawl the\n"
            "route and read the noindex. Crawlable plus noindex is the only combination\n"
            "that removes an already indexed URL from the index.\n\n"
            + "\n".join(
                f"- `{p}`  ->  `X-Robots-Tag: noindex, nofollow`"
                for p in sorted(set(noindex_paths))
            )
            + "\n",
            encoding="utf-8",
        )
        proof(f"patch | noindex header targets written to {hdr.name}")

    git(repo, "add", "-A")
    msg = (
        f"SEO: permanent fix for Indexed though blocked by robots.txt\n\n"
        f"Disallow rules removed: {len(remove_rules)}\n"
        f"noindex targets: {len(noindex_paths)}\n"
        f"410 candidates: {len(gone_paths)}\n"
        f"Held for human review: {len(review)}\n"
        f"Generated {stamp()}"
    )
    git(repo, "commit", "-m", msg)
    head = git(repo, "rev-parse", "--short", "HEAD")
    proof(f"patch | branch {branch} | commit {head}")

    if args.push:
        git(repo, "push", "-u", "origin", branch)
        proof(f"patch | pushed {branch} to origin, Vercel preview will build")
    else:
        say(f"Branch {branch} committed locally. Push with --push when reviewed.")
    return plan


# --------------------------------------------------------------------------------------
# Stage 5: verify
# --------------------------------------------------------------------------------------


def stage_bootstrap(args):
    """
    Arm the guard on day one, without waiting for a remediation event.

    The gap analysis of 21/07/2026 found that the guard's baseline was written
    only by the verify stage, which runs only after a patch. With Affected pages
    at 0 there is no patch, so the baseline never existed and the guard passed
    every commit. This stage removes that dependency: it builds the protected set
    directly from the live sitemap, the natural source of truth for "URLs that
    must stay crawlable", cross-checked with the same normalisation the guard uses.

    The baseline is committed to the repo (see the installer), so a fresh clone or
    CI runner is never unprotected. Re-running this stage refreshes it; the weekly
    monitor calls it so the committed set never drifts from the live sitemap.
    """
    c = cfg()
    site = c["site"].rstrip("/")
    robots_txt = fetch_text(f"{site}/robots.txt")
    parser = Protego.parse(normalise_robots(robots_txt))

    sitemap_urls = set()
    for sm in c.get("sitemaps", [f"{site}/sitemap.xml"]):
        sitemap_urls |= collect_sitemap_urls(sm)

    if not sitemap_urls:
        proof(
            "bootstrap | RESULT FAIL | sitemap returned zero URLs, refusing to write an "
            "empty baseline that would protect nothing"
        )
        say("The sitemap returned no URLs. Check the sitemap URL in config.json.")
        say("The guard will keep failing closed until a non-empty baseline exists.")
        return 1

    # Every sitemap URL is a URL that must remain crawlable. Any that the live
    # robots.txt already blocks is surfaced now rather than after a regression.
    protected = sorted(sitemap_urls)
    already_blocked = [u for u in protected if not parser.can_fetch(u, GOOGLEBOT)]

    save_json(
        ROOT / "protected urls.json",
        {
            "generated": stamp(),
            "source": "sitemap bootstrap",
            "sitemap_count": len(sitemap_urls),
            "urls": protected,
        },
    )
    proof(
        f"bootstrap | protected baseline written | {len(protected)} URLs from sitemap | "
        f"already blocked by live robots.txt {len(already_blocked)}"
    )

    if already_blocked:
        say("")
        say(
            "WARNING: these sitemap URLs are ALREADY disallowed to Googlebot right now:"
        )
        for u in already_blocked[:40]:
            say(f"   BLOCKED  {u}")
        say(
            "Run the discover -> adjudicate -> verify-independent -> patch pipeline to fix them."
        )
        proof(
            f"bootstrap | {len(already_blocked)} sitemap URLs currently blocked, pipeline needed"
        )
    else:
        say(
            f"Baseline armed. {len(protected)} URLs are protected and all are crawlable now."
        )
    return 0


def stage_verify(args):
    c = cfg()
    site = c["site"].rstrip("/")
    robots_txt = fetch_text(f"{site}/robots.txt")
    parser = Protego.parse(normalise_robots(robots_txt))
    rhash = sha256_text(robots_txt)

    doc = load_json(STATE / "verdicts.json", {"verdicts": []})
    targets = [
        v["url"]
        for v in doc["verdicts"]
        if v.get("intent") in ("INDEX", "DEINDEX", "REMOVE")
    ]
    if not targets:
        targets = load_json(STATE / "discovery.json", {}).get("locally_disallowed", [])

    still_blocked = [u for u in targets if not parser.can_fetch(u, GOOGLEBOT)]
    proof(
        f"verify | live robots.txt sha256 {rhash[:16]} | targets {len(targets)} | "
        f"still disallowed to Googlebot {len(still_blocked)}"
    )
    for u in still_blocked:
        say(f"   STILL BLOCKED  {u}")

    if still_blocked:
        proof("verify | RESULT FAIL | deployment has not taken effect or rules remain")
        return 1

    proof(
        "verify | RESULT PASS | no target URL is disallowed to Googlebot on the live site"
    )

    # Persist the protected set so the guard can defend it on every future build.
    # Merge into any existing baseline (e.g. from bootstrap) rather than overwrite,
    # so a URL that was protected before is never silently dropped. Archive first.
    existing = set(load_json(ROOT / "protected urls.json", {}).get("urls", []))
    fresh = set(targets) | set(
        load_json(STATE / "discovery.json", {}).get("candidates", [])
    )
    protected = sorted(existing | fresh)
    if existing:
        archive_file(ROOT / "protected urls.json")
    save_json(
        ROOT / "protected urls.json",
        {
            "generated": stamp(),
            "source": "verify merge",
            "previously_protected": len(existing),
            "added_this_run": len(protected) - len(existing),
            "urls": protected,
        },
    )
    proof(
        f"verify | protected URL set written | {len(protected)} URLs under guard "
        f"({len(existing)} kept, {len(protected) - len(existing)} added)"
    )
    return 0


# ======================================================================================
# EXTENSION 1.1.0 -- Analyst, Advisor, Verifier, Wiring audit
# Four named roles. Three use Fable. One uses no model at all, deliberately.
#
#   Analyst   (Fable)  reads the existing infrastructure and says what is missing,
#                      wrong or poor. Does not decide about URLs.
#   Adjudicator (Fable) decides index or de-index per URL. Defined further up.
#   Verifier  (Fable + deterministic) re-derives the answer blind, then checks every
#                      factual claim against raw data. Disagreement escalates.
#   Advisor   (Fable)  looks at everything together and names what was missed.
#
# The deterministic half of the Verifier is the important half. A model checking a
# model is a second opinion. A model checked against ground truth is verification.
# ======================================================================================

ANALYST_SYSTEM = """You are the infrastructure analyst for the zasupport.com blog and website
project. The stack is Next.js on Vercel with Sanity as the CMS.

You are given an inventory of the project: the file tree, the robots source, the Next.js
config, the existing git hooks, the existing CI workflows, the installed skills, and the
source of the robots remediation engine itself.

Your job is to find what is missing, what is incorrect, and what is poor. You are not
deciding anything about individual URLs. Another role does that.

Look specifically for:
- Search directives that contradict each other, for example a path disallowed in
  robots.txt while pages under it carry a canonical or sit in the sitemap.
- A sitemap that lists URLs the robots source blocks, or blocks URLs the sitemap lists.
- Missing X-Robots-Tag or meta robots handling for routes that should never be indexed.
- Guards, hooks or CI steps that exist but are not actually invoked by anything.
- Code in the remediation engine that is fragile, unsafe, duplicated or unclear.
- Anything that will silently stop working when a person changes something unrelated.

Return STRICT JSON only. No prose, no markdown, no code fences.

{
  "findings": [
    {
      "id": "F1",
      "severity": "CRITICAL" | "HIGH" | "MEDIUM" | "LOW",
      "category": "MISSING" | "INCORRECT" | "POOR" | "FRAGILE",
      "file": "relative/path or none",
      "what": "one sentence",
      "evidence": "what in the inventory shows this",
      "fix": "the concrete change, specific enough to apply",
      "auto_applicable": true | false
    }
  ],
  "summary": "three sentences maximum"
}

Rules you must not break:
- Every finding must cite something actually present in the inventory. If you cannot
  point at evidence, do not raise the finding.
- Do not invent files. If you did not see it in the tree, it is not there.
- auto_applicable is true only for a change that cannot break a build: adding a
  comment, adding a missing script entry, adding a missing header rule. Never true for
  anything touching robots rules, redirects or canonicals.
"""

VERIFIER_SYSTEM = """You are an independent verifier. You have not seen anyone else's
conclusion and you must not ask for it.

You are given the raw evidence for a single URL on zasupport.com: the Search Console
index status, the live HTTP response, the page's own robots meta and canonical, whether
the URL appears in the sitemap, and the full robots.txt.

Decide, from that evidence alone, what should happen to this URL.

The governing facts you must not contradict:
1. robots.txt controls crawling, not indexing. A blocked URL can still be indexed if
   something links to it.
2. A noindex rule only works if the URL is crawlable. Blocked in robots.txt means
   Googlebot never reads the noindex, so the URL stays indexed indefinitely.
3. Any URL that must leave the index has to be unblocked in robots.txt first.

Return STRICT JSON only. No prose, no markdown, no code fences.

{
  "intent": "INDEX" | "DEINDEX" | "REMOVE",
  "action": "ALLOW_CRAWL" | "ALLOW_CRAWL_PLUS_NOINDEX" | "GONE_410" | "REDIRECT_301" | "AUTH_GATE",
  "confidence": 0.0 to 1.0,
  "reasoning": "two sentences maximum"
}
"""

ADVISOR_SYSTEM = """You are the advisor. You see the whole picture at once: the
infrastructure findings, the pressure test result, the per-URL verdicts, the points where
the independent verifier disagreed, and the wiring audit showing which hook points are
actually in place.

Your single job is to name what the owner has missed. He is a technically strong operator
running an Apple specialist IT managed services business in Johannesburg. He does not need
encouragement and he does not need the obvious repeated back to him. He needs the gap he
cannot see from inside the work.

Consider at minimum:
- Failure modes the pressure test does not cover.
- Ways this system quietly stops working without anyone noticing.
- Adjacent indexing problems this engine deliberately does not touch.
- Anything where the wiring audit says a hook point is absent.
- Anything where the verifier disagreed with the adjudicator more than once, because
  repeated disagreement means the evidence is genuinely ambiguous, not that one is wrong.
- Commercial exposure: pages that make money and are one edit away from disappearing.

Return STRICT JSON only. No prose, no markdown, no code fences.

{
  "gaps": [
    {
      "id": "G1",
      "priority": "NOW" | "SOON" | "WATCH",
      "gap": "one sentence naming what is missing",
      "why_it_matters": "the concrete consequence, no drama",
      "first_step": "the single next action",
      "effort": "MINUTES" | "HOURS" | "DAYS"
    }
  ],
  "biggest_single_risk": "one sentence",
  "what_is_already_solid": "one sentence, only if true"
}

Do not pad the list. Five real gaps beat fifteen invented ones. If something is genuinely
well covered, say so once and move on.
"""


def call_fable(
    system, payload, api_key, model=FABLE_MODEL, max_tokens=16000, retries=3
):
    """Single entry point for every model role. One place to fix, one place to log."""
    headers = {
        "x-api-key": api_key,
        "anthropic-version": ANTHROPIC_VERSION,
        "content-type": "application/json",
    }
    body = {
        "model": model,
        "max_tokens": max_tokens,
        "system": system,
        "messages": [
            {
                "role": "user",
                "content": json.dumps(payload, ensure_ascii=False)[:400000],
            }
        ],
    }
    last = None
    for attempt in range(1, retries + 1):
        try:
            r = requests.post(ANTHROPIC_URL, headers=headers, json=body, timeout=600)
            if r.status_code in (429, 500, 502, 503, 529):
                wait = min(2**attempt, 30)
                say(f"  {r.status_code} from API, retry {attempt}/{retries} in {wait}s")
                time.sleep(wait)
                last = f"HTTP {r.status_code}"
                continue
            r.raise_for_status()
            data = r.json()
            text = "".join(
                b.get("text", "")
                for b in data.get("content", [])
                if b.get("type") == "text"
            ).strip()
            fence = chr(96) * 3
            text = re.sub(
                rf"^{fence}(?:json)?|{fence}$", "", text, flags=re.MULTILINE
            ).strip()
            if not text:
                raise ValueError(
                    f"empty text block (stop_reason={data.get('stop_reason')}); "
                    "extended-thinking models can exhaust max_tokens before the answer"
                )
            return json.loads(text)
        except Exception as exc:
            last = str(exc)
            say(f"  attempt {attempt}/{retries} failed: {exc}")
            time.sleep(min(2**attempt, 30))
    return {"error": last}


# --------------------------------------------------------------------------------------
# Analyst
# --------------------------------------------------------------------------------------

INVENTORY_FILES = [
    "app/robots.ts",
    "src/app/robots.ts",
    "app/robots.js",
    "public/robots.txt",
    "app/sitemap.ts",
    "src/app/sitemap.ts",
    "next.config.js",
    "next.config.mjs",
    "next.config.ts",
    "package.json",
    "vercel.json",
    "middleware.ts",
    "src/middleware.ts",
    ".github/workflows/robots guard.yml",
    "CLAUDE.md",
    "INSTRUCTIONS.md",
]


def build_inventory(repo):
    repo = Path(repo)
    inv = {
        "repo": str(repo),
        "generated": stamp(),
        "files": {},
        "tree": [],
        "hooks": [],
        "skills": [],
        "engine_source_excerpt": "",
    }

    skip = {"node_modules", ".next", ".git", "dist", "build", ".vercel", ".venv"}
    count = 0
    for p in sorted(repo.rglob("*")):
        if any(s in p.parts for s in skip):
            continue
        if p.is_file():
            inv["tree"].append(str(p.relative_to(repo)))
            count += 1
            if count > 4000:
                inv["tree"].append("... truncated at 4000 entries")
                break

    for rel in INVENTORY_FILES:
        f = repo / rel
        if f.exists():
            inv["files"][rel] = f.read_text(encoding="utf-8", errors="replace")[:24000]

    hooks_dir = repo / ".git" / "hooks"
    if hooks_dir.exists():
        inv["hooks"] = [
            h.name
            for h in hooks_dir.iterdir()
            if h.is_file() and not h.name.endswith(".sample")
        ]

    for base in (Path.home() / ".claude" / "skills", repo / ".claude" / "skills"):
        if base.exists():
            inv["skills"] += [d.name for d in base.iterdir() if d.is_dir()]

    eng = ROOT / "robots index engine.py"
    if eng.exists():
        inv["engine_source_excerpt"] = eng.read_text(encoding="utf-8")[:60000]
    return inv


def stage_analyse(args):
    c = cfg()
    api_key = os.environ.get("ANTHROPIC_API_KEY", "").strip()
    if not api_key:
        say("ANTHROPIC_API_KEY not set. Load ~/.za-support.env first.")
        sys.exit(2)
    repo = Path(os.path.expanduser(c["repo_path"]))
    if not repo.exists():
        say(f"repo not found at {repo}. Correct repo_path in config.json.")
        sys.exit(2)

    inv = build_inventory(repo)
    save_json(STATE / "inventory.json", inv)
    proof(
        f"analyse | inventory built | {len(inv['tree'])} files | "
        f"{len(inv['files'])} key files read | {len(inv['hooks'])} git hooks"
    )

    result = call_fable(ANALYST_SYSTEM, inv, api_key, model=args.model or FABLE_MODEL)
    if "error" in result:
        proof(f"analyse | RESULT ERROR | {result['error']}")
        sys.exit(4)

    findings = result.get("findings", [])
    save_json(
        STATE / "infrastructure findings.json",
        {"generated": stamp(), "model": args.model or FABLE_MODEL, **result},
    )

    by_sev = {}
    for f in findings:
        by_sev.setdefault(f.get("severity", "UNKNOWN"), []).append(f)
    proof(
        "analyse | findings "
        + " ".join(f"{k}:{len(v)}" for k, v in sorted(by_sev.items()))
        or "analyse | no findings"
    )

    for sev in ("CRITICAL", "HIGH", "MEDIUM", "LOW"):
        for f in by_sev.get(sev, []):
            say(f"  [{sev:8}] {f.get('category', ''):9} {f.get('file', '') or '-'}")
            say(f"             {f.get('what', '')}")
            say(f"             fix: {f.get('fix', '')}")

    auto = [f for f in findings if f.get("auto_applicable")]
    if auto and args.apply_safe:
        report = ROOT / f"analyst safe changes {fstamp()}.md"
        report.write_text(
            f"# Analyst safe changes\n\nGenerated {stamp()}\n\n"
            + "\n".join(
                f"## {f['id']} {f.get('file', '')}\n\n{f.get('fix', '')}\n"
                for f in auto
            ),
            encoding="utf-8",
        )
        proof(
            f"analyse | {len(auto)} auto-applicable changes written to {report.name} "
            f"for review, not applied silently"
        )
    return result


# --------------------------------------------------------------------------------------
# Verifier: deterministic half, then blind model half
# --------------------------------------------------------------------------------------


def deterministic_checks(verdict, flagged_item, robots_txt, sitemap_set):
    """
    Check every factual claim in a verdict against raw data. No model involved.
    A verdict that fails here is unsupported regardless of how confident it sounded.
    """
    issues = []
    url = verdict.get("url", "")
    parser = Protego.parse(normalise_robots(robots_txt))

    currently_blocked = not parser.can_fetch(url, GOOGLEBOT)
    gsc_state = (flagged_item or {}).get("robotsTxtState", "")
    if currently_blocked and gsc_state == "ALLOWED":
        issues.append(
            "live robots.txt blocks this URL but Search Console reports ALLOWED, "
            "the robots.txt Google holds is stale or differs"
        )
    if not currently_blocked and gsc_state == "DISALLOWED":
        issues.append(
            "live robots.txt allows this URL but Search Console reports DISALLOWED, "
            "the fix may already be deployed and simply not recrawled"
        )

    for rule in verdict.get("robots_disallow_to_remove") or []:
        if rule not in robots_txt:
            issues.append(
                f"rule to remove '{rule}' does not appear in the live robots.txt"
            )
    for rule in verdict.get("robots_disallow_to_keep") or []:
        if rule not in robots_txt:
            issues.append(
                f"rule to keep '{rule}' does not appear in the live robots.txt"
            )

    live = live_page_evidence(url)
    status = live.get("status")
    if verdict.get("action") == "GONE_410" and status == 200:
        issues.append(f"marked for removal but the URL returns HTTP {status}")
    if verdict.get("intent") == "INDEX" and status not in (200, None):
        issues.append(f"marked for indexing but the URL returns HTTP {status}")
    if verdict.get("action") == "ALLOW_CRAWL" and "noindex" in (
        live.get("meta_robots") or ""
    ):
        issues.append("marked for indexing but the page itself carries a noindex rule")
    if verdict.get("intent") == "INDEX" and url not in sitemap_set:
        issues.append("marked for indexing but the URL is absent from the sitemap")

    return {
        "url": url,
        "passed": not issues,
        "issues": issues,
        "live_status": status,
        "currently_blocked": currently_blocked,
    }


def stage_verify_independent(args):
    c = cfg()
    api_key = os.environ.get("ANTHROPIC_API_KEY", "").strip()
    if not api_key:
        say("ANTHROPIC_API_KEY not set.")
        sys.exit(2)

    vdoc = load_json(STATE / "verdicts.json", None)
    fdoc = load_json(STATE / "flagged.json", {"flagged": []})
    disc = load_json(STATE / "discovery.json", {})
    if not vdoc:
        say("run adjudicate first")
        sys.exit(2)

    robots_txt = disc.get("robots_txt", "")
    sitemap_set = set(disc.get("candidates", []))
    flagged_by_url = {f["url"]: f for f in fdoc.get("flagged", [])}

    rows = []
    for v in vdoc["verdicts"]:
        url = v["url"]
        say(f"verifying {url}")

        det = deterministic_checks(v, flagged_by_url.get(url), robots_txt, sitemap_set)

        # Blind re-derivation. The primary verdict is deliberately withheld.
        evidence = {
            "url": url,
            "gsc_evidence": flagged_by_url.get(url, {}),
            "live_page": live_page_evidence(url),
            "in_sitemap": url in sitemap_set,
            "robots_txt": robots_txt,
        }
        blind = call_fable(
            VERIFIER_SYSTEM,
            evidence,
            api_key,
            model=args.model or FABLE_MODEL,
            max_tokens=800,
        )

        agree_intent = blind.get("intent") == v.get("intent")
        agree_action = blind.get("action") == v.get("action")

        if not det["passed"]:
            outcome = "REJECTED"
        elif agree_intent and agree_action:
            outcome = "CONFIRMED"
        elif agree_intent:
            outcome = "PARTIAL"
        else:
            outcome = "DISPUTED"

        rows.append(
            {
                "url": url,
                "primary": {
                    "intent": v.get("intent"),
                    "action": v.get("action"),
                    "confidence": v.get("confidence"),
                },
                "independent": {
                    "intent": blind.get("intent"),
                    "action": blind.get("action"),
                    "confidence": blind.get("confidence"),
                    "reasoning": blind.get("reasoning"),
                },
                "deterministic": det,
                "outcome": outcome,
            }
        )
        say(
            f"   -> {outcome}  primary {v.get('intent')}/{v.get('action')}  "
            f"independent {blind.get('intent')}/{blind.get('action')}"
        )
        time.sleep(0.4)

    counts = {}
    for r in rows:
        counts[r["outcome"]] = counts.get(r["outcome"], 0) + 1
    save_json(
        STATE / "verification.json",
        {"generated": stamp(), "counts": counts, "rows": rows},
    )
    proof(
        "verify-independent | "
        + " ".join(f"{k}:{v}" for k, v in sorted(counts.items()))
    )

    blocked = [r for r in rows if r["outcome"] in ("REJECTED", "DISPUTED")]
    if blocked:
        say("")
        say("These verdicts must not be applied automatically:")
        for r in blocked:
            say(f"   {r['outcome']}  {r['url']}")
            for i in r["deterministic"]["issues"]:
                say(f"       {i}")
        proof(
            f"verify-independent | {len(blocked)} verdict(s) withheld from the patch stage"
        )

    # The patch stage reads this. Anything not CONFIRMED does not get applied.
    save_json(
        STATE / "approved verdicts.json",
        {
            "generated": stamp(),
            "urls": [r["url"] for r in rows if r["outcome"] == "CONFIRMED"],
        },
    )
    return rows


# --------------------------------------------------------------------------------------
# Advisor
# --------------------------------------------------------------------------------------


def stage_advise(args):
    api_key = os.environ.get("ANTHROPIC_API_KEY", "").strip()
    if not api_key:
        say("ANTHROPIC_API_KEY not set.")
        sys.exit(2)

    payload = {
        "site": cfg()["site"],
        "infrastructure_findings": load_json(
            STATE / "infrastructure findings.json", {}
        ),
        "pressure_test": load_json(STATE / "pressure test.json", {}),
        "verdicts": load_json(STATE / "verdicts.json", {}),
        "verification": load_json(STATE / "verification.json", {}),
        "wiring_audit": load_json(STATE / "wiring audit.json", {}),
        "discovery_counts": load_json(STATE / "discovery.json", {}).get("counts", {}),
    }
    result = call_fable(
        ADVISOR_SYSTEM, payload, api_key, model=args.model or FABLE_MODEL
    )
    if "error" in result:
        proof(f"advise | RESULT ERROR | {result['error']}")
        sys.exit(4)

    save_json(STATE / "gap analysis.json", {"generated": stamp(), **result})
    gaps = result.get("gaps", [])
    proof(f"advise | gaps identified {len(gaps)}")

    say("")
    say("=" * 72)
    say("GAP ANALYSIS")
    say("=" * 72)
    for pri in ("NOW", "SOON", "WATCH"):
        for g in [x for x in gaps if x.get("priority") == pri]:
            say(f"  [{pri:5}] [{g.get('effort', '')}] {g.get('gap', '')}")
            say(f"          why: {g.get('why_it_matters', '')}")
            say(f"          first step: {g.get('first_step', '')}")
    say("")
    say(f"  biggest single risk: {result.get('biggest_single_risk', '')}")
    if result.get("what_is_already_solid"):
        say(f"  already solid: {result['what_is_already_solid']}")
    return result


# --------------------------------------------------------------------------------------
# Wiring audit: is this thing actually connected to anything
# --------------------------------------------------------------------------------------


def stage_wiring_audit(args):
    """
    A guard nobody calls is decoration. This proves each hook point exists, by
    reading the filesystem, not by trusting that an installer ran.
    """
    c = cfg()
    repo = Path(os.path.expanduser(c["repo_path"]))
    home = Path.home()
    checks = []

    def check(name, ok, detail, fix):
        checks.append(
            {"hook_point": name, "present": bool(ok), "detail": detail, "fix": fix}
        )

    skill_user = home / ".claude" / "skills" / "robots-index-guard" / "SKILL.md"
    check(
        "Skill installed for every session",
        skill_user.exists(),
        str(skill_user),
        "Rerun Block 5 of the runbook",
    )

    skill_proj = repo / ".claude" / "skills" / "robots-index-guard" / "SKILL.md"
    check(
        "Skill installed at project scope",
        skill_proj.exists(),
        str(skill_proj),
        "Rerun Block 5 of the runbook",
    )

    instr = None
    for cand in (repo / "INSTRUCTIONS.md", repo / "docs" / "INSTRUCTIONS.md"):
        if cand.exists():
            instr = cand
            break
    referenced = bool(
        instr
        and "robots-index-guard" in instr.read_text(encoding="utf-8", errors="replace")
    )
    check(
        "Referenced from INSTRUCTIONS.md index",
        referenced,
        str(instr) if instr else "INSTRUCTIONS.md not found",
        "Rerun Block 6 of the runbook",
    )

    hook = repo / ".git" / "hooks" / "pre-commit"
    hook_ok = hook.exists() and "robots guard" in hook.read_text(
        encoding="utf-8", errors="replace"
    )
    check(
        "Pre-commit hook blocks bad robots edits",
        hook_ok,
        str(hook),
        "Rerun Block 6 of the runbook",
    )

    ci = repo / ".github" / "workflows" / "robots guard.yml"
    check(
        "CI workflow fails the build",
        ci.exists(),
        str(ci),
        "Rerun Block 6 of the runbook",
    )

    pkg = repo / "package.json"
    pkg_ok = pkg.exists() and "robots:guard" in pkg.read_text(
        encoding="utf-8", errors="replace"
    )
    check(
        "npm script robots:guard available",
        pkg_ok,
        str(pkg),
        "Rerun Block 6 of the runbook",
    )

    plist = home / "Library" / "LaunchAgents" / "com.zasupport.robotsguard.plist"
    loaded = False
    if plist.exists():
        r = subprocess.run(["launchctl", "list"], capture_output=True, text=True)
        loaded = "com.zasupport.robotsguard" in r.stdout
    check(
        "Weekly monitor loaded in launchd",
        loaded,
        str(plist),
        "Rerun Block 7 of the runbook",
    )

    prot = ROOT / "protected urls.json"
    prot_ok = False
    if prot.exists():
        try:
            prot_ok = len(load_json(prot, {}).get("urls", [])) > 0
        except Exception:
            prot_ok = False
    check(
        "Protected URL baseline armed (non-empty)",
        prot_ok,
        str(prot),
        'Run: python3 "robots index engine.py" bootstrap',
    )

    ptest = STATE / "pressure test.json"
    ptest_ok = False
    if ptest.exists():
        d = load_json(ptest, {})
        ptest_ok = d.get("negative_passed") == d.get("negative_total") and d.get(
            "positive_passed"
        ) == d.get("positive_total")
    check(
        "Pressure test passed on this machine",
        ptest_ok,
        str(ptest),
        "Run: python3 'robots pressure test.py'",
    )

    ledger = home / ".claude" / "install-ledger.json"
    led_ok = ledger.exists() and "robots-index-guard" in ledger.read_text(
        encoding="utf-8", errors="replace"
    )
    check(
        "Registered in the install chaser ledger",
        led_ok,
        str(ledger),
        "Rerun Block 6 of the runbook",
    )

    save_json(STATE / "wiring audit.json", {"generated": stamp(), "checks": checks})
    present = sum(1 for c_ in checks if c_["present"])
    say("")
    say("=" * 72)
    say(f"WIRING AUDIT   {present}/{len(checks)} hook points present")
    say("=" * 72)
    for c_ in checks:
        say(f"  [{'WIRED  ' if c_['present'] else 'MISSING'}] {c_['hook_point']}")
        if not c_["present"]:
            say(f"             {c_['fix']}")
    proof(f"wiring-audit | {present}/{len(checks)} hook points present")
    return 0 if present == len(checks) else 1


# --------------------------------------------------------------------------------------
# CLI
# --------------------------------------------------------------------------------------


def main():
    ap = argparse.ArgumentParser(
        description="ZA Support robots.txt index remediation engine"
    )
    ap.add_argument(
        "stage",
        choices=[
            "bootstrap",
            "analyse",
            "discover",
            "inspect",
            "adjudicate",
            "verify-independent",
            "patch",
            "verify",
            "advise",
            "wiring-audit",
            "all",
        ],
    )
    ap.add_argument("--limit", type=int, default=0, help="max URLs to inspect this run")
    ap.add_argument(
        "--full",
        action="store_true",
        help="inspect every candidate, not just blocked ones",
    )
    ap.add_argument("--refresh", action="store_true", help="ignore inspection cache")
    ap.add_argument("--no-search-analytics", action="store_true")
    ap.add_argument(
        "--model", default="", help=f"override model, default {FABLE_MODEL}"
    )
    ap.add_argument("--min-confidence", type=float, default=0.6)
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--push", action="store_true", help="push the fix branch to origin")
    ap.add_argument(
        "--apply-safe",
        action="store_true",
        help="write analyst safe changes to a review file",
    )
    ap.add_argument(
        "--skip-verification",
        action="store_true",
        help="apply verdicts that the independent verifier has not confirmed",
    )
    args = ap.parse_args()

    STATE.mkdir(parents=True, exist_ok=True)
    proof(f"RUN START | stage {args.stage} | engine 1.3.0")

    dispatch = {
        "analyse": stage_analyse,
        "discover": stage_discover,
        "inspect": stage_inspect,
        "adjudicate": stage_adjudicate,
        "verify-independent": stage_verify_independent,
        "patch": stage_patch,
        "advise": stage_advise,
    }
    if args.stage == "bootstrap":
        sys.exit(stage_bootstrap(args))
    elif args.stage in dispatch:
        dispatch[args.stage](args)
    elif args.stage == "verify":
        sys.exit(stage_verify(args))
    elif args.stage == "wiring-audit":
        sys.exit(stage_wiring_audit(args))
    else:
        stage_bootstrap(args)  # arm the guard first, before any other work
        stage_analyse(args)
        stage_discover(args)
        stage_inspect(args)
        stage_adjudicate(args)
        stage_verify_independent(args)
        stage_patch(args)
        rc = stage_verify(args)
        stage_wiring_audit(args)
        stage_advise(args)
        sys.exit(rc)

    proof(f"RUN END | stage {args.stage}")


if __name__ == "__main__":
    main()
