#!/usr/bin/env python3
"""Deterministic divergence summary. Reads evidence only; never sends messages."""
import argparse
import json
from pathlib import Path


def issues(report):
    found = set()
    for item in report.get("errors", []):
        found.add(("SITE", item.get("kind", "unknown"), item.get("url", item.get("path", ""))))
    for row in report.get("results", []):
        for error in row.get("errors", []):
            # Keep network exception classes, not unstable OS detail text.
            key = ":".join(error.split(":")[:2]) if error.startswith("request_error:") else error
            found.add((row["path"], key, ""))
    return found


def summarize(current, previous=None):
    now, before = issues(current), issues(previous or {})
    verified = current.get("mode") == "crawl" and current.get("paths_audited", 0) > 0
    if not verified:
        raise ValueError("Missing or incomplete crawl evidence")
    return {
        "observed_at": current["observed_at"],
        "head_sha": current["head_sha"],
        "paths_audited": current["paths_audited"],
        "passed": current["passed"],
        "first_baseline": previous is None,
        "notify": previous is None or now != before,
        "new": sorted(now - before),
        "resolved": sorted(before - now),
        "remaining_count": len(now),
        "host_variants_tested": current["host_variants_tested"],
        "google_indexation_verified": False,
    }


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--current", required=True, type=Path)
    parser.add_argument("--previous", type=Path)
    args = parser.parse_args()
    current = json.loads(args.current.read_text())
    previous = json.loads(args.previous.read_text()) if args.previous else None
    print(json.dumps(summarize(current, previous), indent=2))
