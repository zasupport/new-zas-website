#!/usr/bin/env python3
"""
ZA Support — Blog Keyword Gap Analyser
DEPRECATED (§220 — 04/04/2026): Replaced by ~/bin/za-blog-research-engine.py
Kept as fallback for 2026-04-18 (2 weeks). Remove after that date.
Original function: finds best 3 blog topics from PyTrends + DDG scraping.
New function: za-blog-research-engine.py uses GSC + GA4 + PyTrends + competitor gaps + rank tracker.
"""

import json
import os
import re
import sys
import subprocess
from datetime import datetime
from pathlib import Path
from urllib.request import urlopen, Request
from urllib.parse import urlencode, quote_plus
from urllib.error import URLError
import time

# ── Constants ──────────────────────────────────────────────────────────────────
BLOG_PAGE = Path("/Users/courtneybentley/Developer/new-zas-website/src/app/blog/page.tsx")
SEO_DIR = Path("/Users/courtneybentley/Desktop/Claude/SEO")
OUTPUT_DIR = Path("/Users/courtneybentley/Desktop/Claude/Blog")
TODAY = datetime.now().strftime("%d%m%Y")
OUTPUT_FILE = OUTPUT_DIR / f"keyword-gaps-{TODAY}.json"

PYTRENDS_TERMS = [
    'macbook repair johannesburg',
    'macbook not turning on',
    'macbook liquid damage',
    'logic board repair',
    'macbook screen repair johannesburg',
    'apple repair johannesburg',
    'macbook battery johannesburg',
]

FALLBACK_POOL = [
    ("macbook-not-turning-on-johannesburg", "MacBook not turning on Johannesburg 2026"),
    ("macbook-water-damage-repair-johannesburg", "Water damaged MacBook repair Johannesburg"),
    ("logic-board-repair-cost-johannesburg-2026", "Logic board repair cost Johannesburg 2026"),
    ("macbook-pro-m1-m2-repair-johannesburg", "MacBook Pro M1 M2 repair Johannesburg"),
    ("macbook-air-repair-johannesburg-2026", "MacBook Air repair Johannesburg 2026"),
    ("imac-repair-johannesburg", "iMac repair Johannesburg"),
    ("macbook-battery-swollen-johannesburg", "Swollen MacBook battery repair Johannesburg"),
    ("iphone-screen-repair-johannesburg", "iPhone screen repair Johannesburg 2026"),
    ("apple-watch-repair-johannesburg", "Apple Watch repair Johannesburg"),
    ("macbook-keyboard-not-working", "MacBook keyboard not working repair Johannesburg"),
    ("load-shedding-mac-damage", "Load shedding Mac surge damage repair"),
    ("macbook-pro-16-inch-repair", "MacBook Pro 16 inch repair Johannesburg"),
]


# ── Step 1: Read existing slugs ────────────────────────────────────────────────
def get_existing_slugs() -> set:
    slugs = set()
    if not BLOG_PAGE.exists():
        return slugs
    content = BLOG_PAGE.read_text(encoding="utf-8")
    for match in re.finditer(r"slug:\s*['\"]([^'\"]+)['\"]", content):
        slugs.add(match.group(1).strip())
    return slugs


# ── Step 2: Read latest SEO report keywords ────────────────────────────────────
def get_seo_keywords() -> list:
    """Returns list of keyword strings from the newest report-*.json in SEO_DIR."""
    keywords = []
    if not SEO_DIR.exists():
        return keywords
    reports = sorted(SEO_DIR.glob("report-*.json"), reverse=True)
    if not reports:
        return keywords
    try:
        data = json.loads(reports[0].read_text(encoding="utf-8"))
        raw = data.get("keywords") or data.get("keyword_ranks") or []
        if isinstance(raw, list):
            for item in raw:
                if isinstance(item, dict):
                    kw = item.get("keyword") or item.get("term") or ""
                elif isinstance(item, str):
                    kw = item
                else:
                    kw = ""
                if kw:
                    keywords.append(kw.strip())
        elif isinstance(raw, dict):
            keywords.extend(str(k) for k in raw.keys())
    except Exception:
        pass
    return keywords


# ── Step 3: PyTrends ───────────────────────────────────────────────────────────
def get_trending_scores() -> dict:
    """Returns {term: score} from PyTrends (ZA, 30d). Fails gracefully."""
    scores = {}
    try:
        try:
            from pytrends.request import TrendReq
        except ImportError:
            subprocess.run(
                [sys.executable, "-m", "pip", "install", "pytrends", "-q"],
                capture_output=True,
                timeout=30,
            )
            try:
                from pytrends.request import TrendReq
            except ImportError:
                return scores

        pt = TrendReq(hl="en-ZA", tz=120, timeout=(10, 25), retries=1, backoff_factor=0.5)
        # pytrends accepts max 5 terms per request
        chunks = [PYTRENDS_TERMS[i:i+5] for i in range(0, len(PYTRENDS_TERMS), 5)]
        for chunk in chunks:
            try:
                pt.build_payload(chunk, cat=0, timeframe="now 30-d", geo="ZA")
                df = pt.interest_over_time()
                if df is not None and not df.empty:
                    for term in chunk:
                        if term in df.columns:
                            scores[term] = int(df[term].mean())
                time.sleep(1)
            except Exception:
                pass
    except Exception:
        pass
    return scores


# ── Step 4: DuckDuckGo competitor titles ──────────────────────────────────────
def get_competitor_titles() -> list:
    """Scrapes DuckDuckGo HTML for competitor blog titles. Returns list of strings."""
    titles = []
    query = "macbook repair johannesburg blog site:co.za -site:zasupport.com"
    url = f"https://html.duckduckgo.com/html/?{urlencode({'q': query})}"
    try:
        req = Request(url, headers={
            "User-Agent": (
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/120.0.0.0 Safari/537.36"
            ),
            "Accept-Language": "en-ZA,en;q=0.9",
        })
        with urlopen(req, timeout=15) as resp:
            html = resp.read().decode("utf-8", errors="ignore")

        # Extract result titles from DDG HTML (class="result__a")
        for match in re.finditer(r'class="result__a"[^>]*>(.*?)</a>', html, re.DOTALL):
            raw = match.group(1)
            clean = re.sub(r"<[^>]+>", "", raw).strip()
            clean = re.sub(r"\s+", " ", clean)
            if clean and len(clean) > 5:
                titles.append(clean)
            if len(titles) >= 20:
                break

        # Also try result__snippet for additional context
        if not titles:
            for match in re.finditer(r'class="result__snippet"[^>]*>(.*?)</(?:a|span|div)>', html, re.DOTALL):
                raw = match.group(1)
                clean = re.sub(r"<[^>]+>", "", raw).strip()
                clean = re.sub(r"\s+", " ", clean)
                if clean and len(clean) > 10:
                    titles.append(clean)
                if len(titles) >= 20:
                    break
    except (URLError, Exception):
        pass
    return titles


# ── Fuzzy slug duplicate check ────────────────────────────────────────────────
def _slug_words(slug: str) -> set:
    """Extract meaningful words from a slug."""
    return set(re.split(r"[-_]+", slug.lower())) - {"", "a", "the", "in", "of", "to", "and", "or", "for", "2026"}


def is_duplicate(candidate_slug: str, existing_slugs: set) -> bool:
    """Return True if >50% of candidate words overlap with any existing slug."""
    cand_words = _slug_words(candidate_slug)
    if not cand_words:
        return False
    for existing in existing_slugs:
        ex_words = _slug_words(existing)
        if not ex_words:
            continue
        overlap = cand_words & ex_words
        ratio = len(overlap) / len(cand_words)
        if ratio > 0.5:
            return True
    return False


# ── Build candidate list ───────────────────────────────────────────────────────
def build_candidates(
    existing_slugs: set,
    seo_keywords: list,
    trending_scores: dict,
    competitor_titles: list,
) -> list:
    """
    Returns list of dicts: {slug, keyword, trend_score, competitor_titles, gap_note}
    Combines dynamic signals + fallback pool, deduped against existing slugs.
    """
    candidates = []

    # Build dynamic candidates from trending + SEO keywords
    all_dynamic_terms = list(trending_scores.keys()) + seo_keywords

    for term in all_dynamic_terms:
        slug = re.sub(r"[^a-z0-9]+", "-", term.lower().strip()).strip("-")
        if not slug or is_duplicate(slug, existing_slugs):
            continue
        score = trending_scores.get(term, 0)
        # Find matching competitor titles
        term_words = set(term.lower().split())
        matched_titles = [
            t for t in competitor_titles
            if len(term_words & set(t.lower().split())) >= 2
        ]
        gap = "not covered"
        candidates.append({
            "slug": slug,
            "keyword": term.title() + " 2026" if "2026" not in term else term.title(),
            "trend_score": score,
            "competitor_titles": matched_titles[:3],
            "gap_note": gap,
        })

    # Append fallback pool items if needed (always available as reserve)
    for fb_slug, fb_keyword in FALLBACK_POOL:
        if not is_duplicate(fb_slug, existing_slugs):
            # Avoid re-adding what's already in candidates
            if not any(c["slug"] == fb_slug for c in candidates):
                candidates.append({
                    "slug": fb_slug,
                    "keyword": fb_keyword,
                    "trend_score": 0,
                    "competitor_titles": [],
                    "gap_note": "not covered",
                })

    # Sort: highest trend_score first, then fewest competitor titles (lower competition)
    candidates.sort(key=lambda c: (-c["trend_score"], len(c["competitor_titles"])))

    return candidates


# ── Format final output ────────────────────────────────────────────────────────
def format_topic(c: dict) -> dict:
    comp_str = " | ".join(c["competitor_titles"]) if c["competitor_titles"] else "none found"
    return {
        "slug": c["slug"],
        "keyword": c["keyword"],
        "research": (
            f"Competitor titles: [{comp_str}] | "
            f"Trending score: {c['trend_score']} | "
            f"Gap: {c['gap_note']}"
        ),
    }


# ── Main ───────────────────────────────────────────────────────────────────────
def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # Idempotent: if file already exists for today, print and exit
    if OUTPUT_FILE.exists():
        print(f"[blog-keyword-gap] File already exists for today: {OUTPUT_FILE}", file=sys.stderr)
        content = OUTPUT_FILE.read_text(encoding="utf-8")
        print(content)
        sys.exit(0)

    print("[blog-keyword-gap] Reading existing blog slugs...", file=sys.stderr)
    existing_slugs = get_existing_slugs()
    print(f"[blog-keyword-gap] Found {len(existing_slugs)} existing slugs.", file=sys.stderr)

    print("[blog-keyword-gap] Reading SEO report keywords...", file=sys.stderr)
    seo_keywords = get_seo_keywords()
    print(f"[blog-keyword-gap] Got {len(seo_keywords)} SEO keywords.", file=sys.stderr)

    print("[blog-keyword-gap] Fetching PyTrends data (ZA, 30d)...", file=sys.stderr)
    trending_scores = get_trending_scores()
    if trending_scores:
        print(f"[blog-keyword-gap] Trends: {trending_scores}", file=sys.stderr)
    else:
        print("[blog-keyword-gap] Trends unavailable — continuing without.", file=sys.stderr)

    print("[blog-keyword-gap] Fetching DuckDuckGo competitor titles...", file=sys.stderr)
    competitor_titles = get_competitor_titles()
    print(f"[blog-keyword-gap] Got {len(competitor_titles)} competitor titles.", file=sys.stderr)

    print("[blog-keyword-gap] Building candidate topic list...", file=sys.stderr)
    candidates = build_candidates(existing_slugs, seo_keywords, trending_scores, competitor_titles)

    # Take top 3
    top3 = candidates[:3]

    if len(top3) < 3:
        # Safety: pad with hardcoded fallback if we somehow exhausted the pool
        for fb_slug, fb_keyword in FALLBACK_POOL:
            if len(top3) >= 3:
                break
            if not any(t["slug"] == fb_slug for t in top3):
                top3.append({
                    "slug": fb_slug,
                    "keyword": fb_keyword,
                    "trend_score": 0,
                    "competitor_titles": [],
                    "gap_note": "fallback — not covered",
                })

    output = [format_topic(c) for c in top3[:3]]
    output_json = json.dumps(output, indent=2, ensure_ascii=False)

    # Write to file
    OUTPUT_FILE.write_text(output_json, encoding="utf-8")
    print(f"[blog-keyword-gap] Written to {OUTPUT_FILE}", file=sys.stderr)

    # Print to stdout
    print(output_json)


if __name__ == "__main__":
    main()
