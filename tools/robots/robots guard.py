#!/usr/bin/env python3
"""
PURPOSE   Fail fast if any protected URL would be disallowed to Googlebot by a
          proposed robots.txt. This is what makes the fix permanent rather than
          a one-off correction that silently regresses on a future deploy.
STORAGE   ~/Projects/zas robots index fix/
EXECUTES  python3 "robots guard.py" [--robots <file>] [--live] [--protected <json>]
RELATED   robots index engine.py | protected urls.json
VERSION   1.0.0
DATE      18/07/2026 13:39 SAST
AUTHOR    Courtney Bentley, ZA Support

Exit codes
  0  every protected URL is crawlable by Googlebot
  1  at least one protected URL is disallowed, the build must not ship
  2  configuration or input problem

Wire it in two places:
  .git/hooks/pre-commit         blocks the commit locally
  CI or Vercel ignored-build    blocks the deploy
"""

import argparse
import json
import subprocess
import sys
from pathlib import Path

import requests
from protego import Protego

ROOT = Path(__file__).resolve().parent
UA = "Mozilla/5.0 (compatible; ZASupportIndexGuard/1.0; +https://zasupport.com)"
GOOGLEBOT = "Googlebot"


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
    if text.startswith("\ufeff"):
        text = text[1:]
    text = text.replace("\r\n", "\n").replace("\r", "\n")
    encoded = text.encode("utf-8")
    limit = 500 * 1024
    if len(encoded) > limit:
        text = encoded[:limit].decode("utf-8", errors="ignore")
    return text


def robots_from_next_source(path: Path) -> str:
    """
    Render a robots.txt approximation from a Next.js app/robots.ts source by
    extracting the disallow entries. Used pre-deploy, when no live URL exists yet.
    """
    import re
    text = path.read_text(encoding="utf-8")
    disallows = []
    for m in re.finditer(r"disallow\s*:\s*(\[[^\]]*\]|['\"][^'\"]+['\"])", text, re.I | re.S):
        blob = m.group(1)
        disallows.extend(re.findall(r"['\"]([^'\"]+)['\"]", blob))
    lines = ["User-agent: *", "Allow: /"]
    lines += [f"Disallow: {d}" for d in dict.fromkeys(disallows)]
    return normalise_robots("\n".join(lines) + "\n")


def load_robots(args) -> str:
    if args.live:
        r = requests.get(args.live, headers={"User-Agent": UA}, timeout=30)
        r.raise_for_status()
        return normalise_robots(r.text)
    p = Path(args.robots)
    if not p.exists():
        print(f"GUARD ERROR: {p} not found", file=sys.stderr)
        sys.exit(2)
    if p.suffix in (".ts", ".js"):
        return robots_from_next_source(p)
    return normalise_robots(p.read_text(encoding="utf-8"))


def main():
    ap = argparse.ArgumentParser(description="ZA Support robots.txt regression guard")
    ap.add_argument("--robots", default="", help="path to robots.txt or app/robots.ts")
    ap.add_argument("--live", default="", help="fetch robots.txt from this URL instead")
    ap.add_argument("--protected", default=str(ROOT / "protected urls.json"))
    ap.add_argument("--quiet", action="store_true")
    args = ap.parse_args()

    if not args.robots and not args.live:
        print("GUARD ERROR: pass --robots <file> or --live <url>", file=sys.stderr)
        sys.exit(2)

    # Fail CLOSED on any baseline problem. A guard whose baseline is missing, empty
    # or corrupt must block, never wave the change through. The gap analysis of
    # 21/07/2026 confirmed the fail-open case (no baseline, no protection) as the
    # single highest-severity defect, so all three conditions below exit non-zero.
    prot_path = Path(args.protected)
    if not prot_path.exists():
        print("=" * 72, file=sys.stderr)
        print("ROBOTS GUARD BLOCKED: protection baseline is missing.", file=sys.stderr)
        print(f"  expected: {prot_path}", file=sys.stderr)
        print("  The guard fails closed rather than pass every commit unprotected.", file=sys.stderr)
        print("  Generate it: python3 \"robots index engine.py\" bootstrap", file=sys.stderr)
        print("=" * 72, file=sys.stderr)
        sys.exit(1)
    try:
        doc = json.loads(prot_path.read_text(encoding="utf-8"))
        urls = doc["urls"]
    except Exception as exc:
        print(f"ROBOTS GUARD BLOCKED: baseline unparseable ({exc}).", file=sys.stderr)
        print("  Regenerate it: python3 \"robots index engine.py\" bootstrap", file=sys.stderr)
        sys.exit(1)
    if not urls:
        print("ROBOTS GUARD BLOCKED: baseline exists but is empty.", file=sys.stderr)
        print("  An empty baseline protects nothing. Regenerate it:", file=sys.stderr)
        print("  python3 \"robots index engine.py\" bootstrap", file=sys.stderr)
        sys.exit(1)

    robots_txt = load_robots(args)
    parser = Protego.parse(robots_txt)

    blocked = [u for u in urls if not parser.can_fetch(u, GOOGLEBOT)]

    if blocked:
        print("=" * 72)
        print("ROBOTS GUARD FAILED")
        print(f"{len(blocked)} of {len(urls)} protected URLs would be disallowed to Googlebot.")
        print("A URL that is already in Google's index and then blocked in robots.txt")
        print("cannot be crawled, cannot be re-evaluated, and cannot be removed by a")
        print("noindex rule, because the crawler never reaches the rule.")
        print("=" * 72)
        for u in blocked[:40]:
            print(f"  BLOCKED  {u}")
        if len(blocked) > 40:
            print(f"  ... and {len(blocked) - 40} more")
        sys.exit(1)

    if not args.quiet:
        print(f"ROBOTS GUARD PASSED: {len(urls)} protected URLs remain crawlable by Googlebot.")
    sys.exit(0)


if __name__ == "__main__":
    main()
