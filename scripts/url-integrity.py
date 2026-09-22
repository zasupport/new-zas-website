#!/usr/bin/env python3
"""Read-only URL integrity audit. No publishing, Google writes, or auto-remediation.

Modes: source, crawl, rendered, sanitize. Uses only the Python standard library.
Reports are evidence, not proof of Google indexation. Every network hop is bounded
to approved hosts. Public reports redact deployment identities without pretending
that preview evidence was obtained from production.
"""
import argparse
import concurrent.futures
import datetime as dt
import hashlib
from html.parser import HTMLParser
import json
import os
from pathlib import Path
import re
import subprocess
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET

ROOT = Path(os.environ.get("URL_INTEGRITY_REPO", str(Path(__file__).resolve().parents[1]))).resolve()
ORIGIN = "https://zasupport.com"
HOSTS = {"zasupport.com", "www.zasupport.com"}
REDIRECTS = {301, 302, 303, 307, 308}
VENDOR = re.compile(r"(?i)(?:https?:)?//(?:[a-z0-9-]+\.)*(?:vercel\.app|render\.com)(?::\d+)?[^\s<>\"'`)\]]*")
BARE_VENDOR = re.compile(r"(?i)\b(?:[a-z0-9-]+\.)+(?:vercel\.app|render\.com)\b")
PRIVATE = ("/api/", "/admin", "/studio", "/seo-report")
ASSET = re.compile(r"\.(?:jpg|jpeg|png|webp|gif|svg|ico|css|js|woff2?|ttf|pdf|txt|xml|json|mp4)$", re.I)


def git(*args):
    return subprocess.check_output(["git", "-C", str(ROOT), *args], text=True).strip()


def normalized(url):
    p = urllib.parse.urlsplit(url)
    return urllib.parse.urlunsplit((p.scheme, p.netloc, p.path or "/", p.query, p.fragment))


def path_url(path):
    return ORIGIN + (path if path.startswith("/") else "/" + path)


def private(path):
    return any(path == x.rstrip("/") or path.startswith(x if x.endswith("/") else x + "/") for x in PRIVATE)


def redact(text):
    # Never turn a preview into a production link. Retain the raw original only
    # in the caller's restricted evidence store.
    text = VENDOR.sub("[deployment URL redacted]", text)
    return BARE_VENDOR.sub("[deployment host redacted]", text)


def inventory():
    source = (ROOT / "src/app/sitemap.ts").read_text()
    entries = re.findall(r"\burl:\s*(`[^`]*`|'[^']*'|\"[^\"]*\"|base\b)", source)
    urls, errors = [], []
    for value in entries:
        if value == "base":
            url = ORIGIN
        else:
            url = value[1:-1].replace("${base}", ORIGIN)
        p = urllib.parse.urlsplit(url)
        if p.scheme != "https" or p.netloc != "zasupport.com" or p.query or p.fragment or "${" in url:
            errors.append({"kind": "sitemap_origin_or_expression", "value": url})
        urls.append(normalized(url))
    if len(entries) != len(re.findall(r"\burl\s*:", source)) or not urls:
        errors.append({"kind": "sitemap_inventory_incomplete"})
    if len(urls) != len(set(urls)):
        errors.append({"kind": "duplicate_sitemap_url"})
    cfg = (ROOT / "next.config.ts").read_text()
    redirects = dict(re.findall(r"source:\s*'([^']+)',\s*destination:\s*'([^']+)',\s*permanent:\s*true", cfg))
    paths = {urllib.parse.urlsplit(u).path or "/" for u in urls}
    for page in (ROOT / "src/app").rglob("page.tsx"):
        parts = page.relative_to(ROOT / "src/app").parts[:-1]
        if any("[" in p or p.startswith(("_", "@")) for p in parts):
            continue
        path = "/" + "/".join(p for p in parts if not p.startswith("("))
        if not private(path):
            paths.add(path)
        text = page.read_text()
        match = re.search(r"\b(?:permanentRedirect|redirect)\(\s*['\"]([^'\"]+)['\"]", text)
        if match and "next/navigation" in text:
            redirects[path] = match[1]
    # Reuse the repaired blog inventory rather than another partial slug parser.
    sys.path.insert(0, str(ROOT / "scripts"))
    from blog_post_inventory import post_slugs
    for slug in post_slugs((ROOT / "src/app/blog/[slug]/page.tsx").read_text()):
        paths.add("/blog/" + slug)
    paths.update(k for k in redirects if ":" not in k)
    paths.update({"/robots.txt", "/sitemap.xml"})
    return {"sitemap": sorted(set(urls)), "paths": sorted(p for p in paths if not private(p)),
            "redirects": redirects, "errors": errors}


def source_audit(inv):
    errors = list(inv["errors"])
    scanned = 0
    for folder in ("src", "content", "public"):
        for file in (ROOT / folder).rglob("*"):
            if not file.is_file() or file.suffix not in {".ts", ".tsx", ".json", ".html", ".md", ".xml", ".txt"}:
                continue
            scanned += 1
            text = file.read_text(errors="replace")
            for n, line in enumerate(text.splitlines(), 1):
                if VENDOR.search(line) or BARE_VENDOR.search(line):
                    errors.append({"kind": "deployment_url_in_public_source", "file": str(file.relative_to(ROOT)), "line": n})
                # The middleware's explicitly approved request-host allowlist is
                # not a public page identity.
                if "https://www.zasupport.com" in line and file.name != "middleware.ts":
                    errors.append({"kind": "noncanonical_owned_url", "file": str(file.relative_to(ROOT)), "line": n})
    sm_paths = {urllib.parse.urlsplit(u).path for u in inv["sitemap"]}
    for start, target in inv["redirects"].items():
        if start in sm_paths:
            errors.append({"kind": "redirect_in_sitemap", "path": start})
        seen = {start}
        while target in inv["redirects"]:
            if target in seen:
                errors.append({"kind": "redirect_cycle", "path": start})
                break
            seen.add(target)
            target = inv["redirects"][target]
        if len(seen) > 1:
            errors.append({"kind": "redirect_chain_in_source", "path": start, "hops": len(seen)})
    return {"mode": "source", "files_scanned": scanned, "sitemap_urls": len(inv["sitemap"]),
            "inventory_paths": len(inv["paths"]), "errors": errors, "passed": not errors}


class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.in_head = False
        self.canonicals = []
        self.robots = []
        self.og = []
        self.links = []
        self.schema = []
        self.schema_text = None
        self.schema_errors = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "head":
            self.in_head = True
        if tag == "link" and "canonical" in a.get("rel", "").lower().split():
            self.canonicals.append((a.get("href", ""), self.in_head))
        if tag == "meta" and a.get("name", "").lower() in {"robots", "googlebot"}:
            self.robots.append(a.get("content", ""))
        if tag == "meta" and a.get("property", "").lower() == "og:url":
            self.og.append(a.get("content", ""))
        if tag == "a" and a.get("href"):
            self.links.append(a["href"])
        if tag == "script" and a.get("type", "").lower() == "application/ld+json":
            self.schema_text = ""

    def handle_data(self, data):
        if self.schema_text is not None:
            self.schema_text += data

    def handle_endtag(self, tag):
        if tag == "head":
            self.in_head = False
        if tag == "script" and self.schema_text is not None:
            try:
                self.schema.append(json.loads(self.schema_text))
            except ValueError:
                self.schema_errors.append("invalid_jsonld")
            self.schema_text = None


def inspect_page(body, status, headers, expected, indexable=True):
    page = Page()
    page.feed(body)
    errors = []
    if status != 200:
        errors.append("not_http_200")
    if len(page.canonicals) != 1:
        errors.append("canonical_count")
    elif not page.canonicals[0][1]:
        errors.append("canonical_outside_head")
    elif normalized(page.canonicals[0][0]) != normalized(expected):
        errors.append("canonical_mismatch")
    robots = ",".join(page.robots + [headers.get("x-robots-tag", "")])
    noindex = bool(re.search(r"\b(?:noindex|none)\b", robots, re.I))
    if indexable and noindex:
        errors.append("unexpected_noindex")
    if not indexable and not noindex:
        errors.append("missing_noindex")
    if len(page.og) != 1 or normalized(page.og[0]) != normalized(expected):
        errors.append("og_url_mismatch_or_missing")
    if VENDOR.search(body):
        errors.append("deployment_url_in_html")
    errors.extend(page.schema_errors)
    def walk(value, key=""):
        if isinstance(value, dict):
            types = value.get("@type", [])
            types = [types] if isinstance(types, str) else types
            if any(t in {"WebPage", "Article", "BlogPosting", "NewsArticle"} for t in types):
                if value.get("url") and normalized(value["url"]) != normalized(expected):
                    errors.append("schema_page_url_mismatch")
                entity = value.get("mainEntityOfPage")
                entity_url = entity.get("@id", entity.get("url")) if isinstance(entity, dict) else entity
                if isinstance(entity_url, str) and normalized(entity_url) != normalized(expected):
                    errors.append("schema_main_entity_mismatch")
            for k, v in value.items():
                walk(v, k)
        elif isinstance(value, list):
            for v in value:
                walk(v, key)
        elif isinstance(value, str) and key in {"url", "@id", "item", "image", "contentUrl"}:
            p = urllib.parse.urlsplit(value)
            if p.hostname in HOSTS and (p.scheme != "https" or p.netloc != "zasupport.com"):
                errors.append("schema_owned_origin_mismatch")
            if VENDOR.search(value):
                errors.append("schema_deployment_url")
            # Identity entities such as Organization, author and breadcrumb
            # parents legitimately have different paths from the current page.
    for schema in page.schema:
        walk(schema)
    for link in page.links:
        p = urllib.parse.urlsplit(link)
        if p.hostname in HOSTS and (p.scheme != "https" or p.netloc != "zasupport.com"):
            errors.append("internal_link_noncanonical_origin")
    return {"errors": sorted(set(errors)), "canonical": [x[0] for x in page.canonicals],
            "og": page.og, "links": page.links, "noindex": noindex}


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


def request(url):
    opener = urllib.request.build_opener(NoRedirect())
    req = urllib.request.Request(url, headers={"User-Agent": "ZA-Support-URL-Integrity/1.0", "Accept": "text/html,application/xml"})
    for attempt in range(2):
        try:
            response = opener.open(req, timeout=20)
            break
        except urllib.error.HTTPError as exc:
            response = exc
            break
        except (urllib.error.URLError, TimeoutError):
            if attempt:
                raise
            time.sleep(0.5)
    with response:
        data = response.read(8_000_001)
        if len(data) > 8_000_000:
            raise ValueError("response_size_limit")
        return response.status, {k.lower(): v for k, v in response.headers.items()}, data.decode("utf-8", errors="replace")


def chain(url, allowed_hosts, fetch=request):
    hops, seen = [], set()
    for _ in range(7):
        p = urllib.parse.urlsplit(url)
        if p.scheme not in {"http", "https"} or p.hostname not in allowed_hosts or p.username or p.password:
            return {"hops": hops, "error": "redirect_outside_approved_hosts", "final": url}
        if url in seen:
            return {"hops": hops, "error": "redirect_loop", "final": url}
        seen.add(url)
        status, headers, body = fetch(url)
        location = headers.get("location")
        hops.append({"url": url, "status": status, "location": location})
        if status not in REDIRECTS:
            return {"hops": hops, "final": url, "status": status, "headers": headers, "body": body}
        if not location:
            return {"hops": hops, "error": "redirect_without_location", "final": url}
        url = urllib.parse.urljoin(url, location)
    return {"hops": hops, "error": "redirect_hop_limit", "final": url}


def sitemap_live(base):
    pending, seen, urls, errors = [base + "/sitemap.xml"], set(), set(), []
    while pending:
        address = pending.pop()
        if address in seen:
            errors.append({"kind": "sitemap_cycle", "url": address})
            continue
        if len(seen) >= 100:
            errors.append({"kind": "sitemap_index_limit"})
            break
        seen.add(address)
        status, _, body = request(address)
        if status != 200:
            errors.append({"kind": "sitemap_http_status", "status": status})
            continue
        root = ET.fromstring(body)
        if root.tag.rsplit("}", 1)[-1] not in {"urlset", "sitemapindex"}:
            errors.append({"kind": "sitemap_invalid_root"})
            continue
        locs = [n.text or "" for n in root.iter() if n.tag.rsplit("}", 1)[-1] == "loc"]
        for loc in locs:
            p = urllib.parse.urlsplit(loc)
            if p.scheme != "https" or p.netloc != "zasupport.com" or p.query or p.fragment:
                errors.append({"kind": "sitemap_noncanonical_absolute_url", "url": loc})
                continue
            if root.tag.endswith("sitemapindex"):
                pending.append(base + p.path)
            else:
                if normalized(loc) in urls:
                    errors.append({"kind": "duplicate_sitemap_url", "url": loc})
                urls.add(normalized(loc))
    if not urls:
        errors.append({"kind": "empty_sitemap"})
    return urls, errors


def crawl(inv, base=ORIGIN, variants=True, workers=4, alerted=()):
    target = urllib.parse.urlsplit(base)
    if base != ORIGIN and not (target.hostname in {"localhost", "127.0.0.1"} and target.scheme == "http"):
        raise ValueError("Unapproved crawl base. Protected previews require separately authenticated evidence.")
    urls, errors = sitemap_live(base)
    for value in alerted:
        if not value.startswith("/") or value.startswith("//") or private(value):
            raise ValueError("Alerted paths must be public relative site paths")
    pending = set(inv["paths"]) | {urllib.parse.urlsplit(u).path for u in urls} | set(alerted)
    pending.add("/za-url-integrity-negative-control-20260922")
    visited, results = set(), []
    allowed_hosts = HOSTS if base == ORIGIN else {target.hostname}

    def check(path):
        row = {"path": path, "errors": [], "variants": [], "links": []}
        probes = [base + path]
        if variants and base == ORIGIN:
            # Query preservation tested on every route, not a homepage sample.
            query_path = path + ("&" if "?" in path else "?") + "za_url_probe=integrity"
            probes += ["https://www.zasupport.com" + query_path, "http://zasupport.com" + query_path,
                       "http://www.zasupport.com" + query_path]
        for probe in probes:
            try:
                result = chain(probe, allowed_hosts)
                row["variants"].append({k: v for k, v in result.items() if k not in {"body", "headers"}})
                if result.get("error"):
                    row["errors"].append(result["error"])
                    continue
                hops = result["hops"]
                if any(h["status"] not in {301, 308} for h in hops[:-1]):
                    row["errors"].append("temporary_redirect")
                if len(hops) > 2:
                    row["errors"].append("multiple_redirect_hops")
                if probe != probes[0] and len(hops) != 2:
                    row["errors"].append("host_redirect_not_single_hop")
                if probe != probes[0] and "za_url_probe=integrity" not in urllib.parse.urlsplit(result["final"]).query:
                    row["errors"].append("query_not_preserved")
                if base == ORIGIN and urllib.parse.urlsplit(result["final"]).netloc != "zasupport.com":
                    row["errors"].append("final_host_mismatch")
                if probe != probes[0]:
                    # The host variant must reach the same resource, not merely
                    # any 200 on the approved host.
                    first = row["variants"][0]
                    if urllib.parse.urlsplit(result["final"]).path != urllib.parse.urlsplit(first.get("final", "")).path:
                        row["errors"].append("host_path_not_preserved")
                    if result["status"] != first.get("status"):
                        row["errors"].append("variant_status_mismatch")
                    continue
                if path.endswith("negative-control-20260922"):
                    if result["status"] != 404 or len(hops) != 1:
                        row["errors"].append("negative_control_not_404")
                    continue
                if normalized(path_url(path)) in urls and len(hops) != 1:
                    row["errors"].append("sitemap_route_redirects")
                if result["status"] != 200:
                    row["errors"].append("not_http_200")
                    continue
                if path == "/sitemap.xml":
                    continue
                if path == "/robots.txt":
                    if f"Sitemap: {ORIGIN}/sitemap.xml" not in result["body"]:
                        row["errors"].append("robots_sitemap_mismatch")
                    continue
                expected = ORIGIN + urllib.parse.urlsplit(result["final"]).path
                is_indexable = path != "/search"
                inspected = inspect_page(result["body"], result["status"], result["headers"], expected, is_indexable)
                row["errors"].extend(inspected["errors"])
                row["canonical"], row["og"] = inspected["canonical"], inspected["og"]
                row["links"] = inspected["links"]
            except Exception as exc:
                row["errors"].append("request_error:" + type(exc).__name__ + ":" + str(exc)[:180])
            time.sleep(0.08)
        row["errors"] = sorted(set(row["errors"]))
        return row

    while pending:
        batch = sorted(pending - visited)
        if not batch:
            break
        if len(visited) + len(batch) > 10000:
            errors.append({"kind": "crawl_inventory_limit", "pending": len(batch)})
            break
        with concurrent.futures.ThreadPoolExecutor(max_workers=workers) as pool:
            for row in pool.map(check, batch):
                results.append(row)
                visited.add(row["path"])
                for link in row.pop("links", []):
                    u = urllib.parse.urlsplit(urllib.parse.urljoin(ORIGIN + row["path"], link))
                    if u.hostname in HOSTS and not private(u.path) and not ASSET.search(u.path) and not u.path.startswith("/_next/"):
                        # Search/filter spaces are finite by source inventory;
                        # never recursively expand query-string combinations.
                        pending.add(u.path or "/")
                if len(results) % 100 == 0:
                    print(f"Audited {len(results)} paths; failures {sum(bool(r['errors']) for r in results)}", file=sys.stderr, flush=True)
        pending -= visited
    for missing in sorted(set(inv["sitemap"]) - urls):
        errors.append({"kind": "source_sitemap_not_live", "url": missing})
    return {"mode": "crawl", "base": base, "host_variants_tested": variants and base == ORIGIN,
            "paths_audited": len(results), "sitemap_urls": len(urls), "errors": errors,
            "results": sorted(results, key=lambda r: r["path"]),
            "passed": not errors and all(not r["errors"] for r in results)}


def rendered(inv):
    folder = ROOT / ".next/server/app"
    errors, rows = [], []
    if not folder.exists():
        return {"mode": "rendered", "passed": False, "errors": [{"kind": "build_missing"}]}
    known_paths = set(inv["paths"])
    for url in inv["sitemap"]:
        path = urllib.parse.urlsplit(url).path
        file = folder / ("index.html" if path == "/" else path.lstrip("/") + ".html")
        if not file.exists():
            errors.append({"kind": "rendered_page_missing", "path": path})
            continue
        checked = inspect_page(file.read_text(), 200, {}, url)
        broken_links = []
        for link in checked["links"]:
            target = urllib.parse.urlsplit(urllib.parse.urljoin(url, link))
            target_path = target.path or "/"
            if target.hostname not in HOSTS or private(target_path) or ASSET.search(target_path) or target_path.startswith("/_next/"):
                continue
            if target_path not in known_paths:
                broken_links.append(target_path)
        if broken_links:
            checked["errors"].append("internal_link_missing_from_route_inventory")
        rows.append({"path": path, "errors": checked["errors"], "canonical": checked["canonical"],
                     "og": checked["og"], "unmapped_links": sorted(set(broken_links))})
    return {"mode": "rendered", "paths_audited": len(rows), "errors": errors, "results": rows,
            "passed": not errors and all(not row["errors"] for row in rows)}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("mode", choices=["source", "crawl", "rendered", "sanitize"])
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--input", type=Path)
    parser.add_argument("--base", default=ORIGIN)
    parser.add_argument("--no-host-variants", action="store_true")
    parser.add_argument("--workers", type=int, default=4)
    parser.add_argument("--alerted-path", action="append", default=[])
    args = parser.parse_args()
    if args.output.exists():
        raise ValueError("Refusing to overwrite existing evidence; use a timestamped output")
    args.output.parent.mkdir(parents=True, exist_ok=True)
    if args.mode == "sanitize":
        if not args.input or args.input.resolve() == args.output.resolve():
            raise ValueError("Specify a separate original input and outward output")
        text = redact(args.input.read_text())
        if VENDOR.search(text) or BARE_VENDOR.search(text):
            raise ValueError("Residual deployment host remains")
        args.output.write_text(text)
        print("Public report written; raw original unchanged.")
        return 0
    inv = inventory()
    if args.mode == "source":
        report = source_audit(inv)
    elif args.mode == "rendered":
        report = rendered(inv)
    else:
        if not 1 <= args.workers <= 8:
            raise ValueError("workers must be between 1 and 8")
        report = crawl(inv, args.base, not args.no_host_variants, args.workers, args.alerted_path)
    # Commit IDs alone do not identify uncommitted candidate bytes.
    changed = git("diff", "--binary", "HEAD")
    untracked = git("ls-files", "--others", "--exclude-standard").splitlines()
    extra = "".join(p + ":" + hashlib.sha256((ROOT / p).read_bytes()).hexdigest()
                    for p in sorted(untracked) if (ROOT / p).is_file())
    report.update({"observed_at": dt.datetime.now(dt.timezone.utc).isoformat(),
                   "head_sha": git("rev-parse", "HEAD"), "origin_main_sha": git("rev-parse", "origin/main"),
                   "working_tree": git("status", "--porcelain"),
                   "candidate_diff_sha256": hashlib.sha256((changed + extra).encode()).hexdigest(),
                   "inventory_sha256": hashlib.sha256(json.dumps(inv, sort_keys=True).encode()).hexdigest(),
                   "google_indexation_verified": False})
    args.output.write_text(json.dumps(report, indent=2) + "\n")
    print(json.dumps({k: v for k, v in report.items() if k not in {"results", "working_tree"}}, indent=2))
    return 0 if report["passed"] else 1


if __name__ == "__main__":
    sys.exit(main())
