#!/bin/bash
# §T3c AirPods retirement gate — fails on any AirPods SERVICE residue in served content.
# AirPods are not serviced (retired 23/09). Allowlisted: the middleware 410 set + code
# comments (retirement plumbing) + factual editorial mentions in the Apple-CEO bio article
# (Apple product history, not a ZA service claim, kept per §374 accuracy).
set -uo pipefail
ROOT="${1:-$(cd "$(dirname "$0")/.." && pwd)}"
cd "$ROOT" || exit 2

# Editorial allowlist: factual Apple-history phrases (not service claims).
EDITORIAL='Ternus|Riccio|Dan Riccio|Cook|hearing aid|iPad, AirPods|Apple Watch, AirPods|AirPods, Apple Vision|led the iPad|entire AirPods|AirPods\. The|AirPods, Mac|led development of the iPad'
# Retirement-plumbing allowlist: the 410 route strings + comments.
PLUMBING="AIRPODS_GONE|410|// AirPods retired|'/airpods-repair'|airpods-repair-johannesburg'|airpods-pro-2-one-side-quiet-johannesburg'"

# Scan scope matches the audit (T3c #4): src/ + content/ + search-index + root next.config.
SCAN_PATHS="src/ public/search-index.json next.config.ts"
[ -d content/ ] && SCAN_PATHS="$SCAN_PATHS content/"
HITS=$(grep -rin "airpods" $SCAN_PATHS 2>/dev/null | grep -viE "$PLUMBING" | grep -viE "$EDITORIAL")

if [ -n "$HITS" ]; then
  echo "❌ AirPods residue gate FAILED — non-allowlisted AirPods reference(s) in served content:"
  echo "$HITS" | head -20
  echo "AirPods are retired (not serviced). Remove the reference or add to the documented editorial allowlist."
  exit 1
fi
echo "✅ AirPods residue gate: no non-allowlisted AirPods service references."
exit 0
