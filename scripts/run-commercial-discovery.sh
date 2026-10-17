#!/bin/bash
# CLAUDE-CODE-INJECTION:
#   target_path: scripts/run-commercial-discovery.sh
#   permissions: 0755
#   create_parent_dirs: true
#   overwrite_if_exists: true
#   backup_if_exists: true
#   post_install_verify: test -e scripts/run-commercial-discovery.sh
#   rollback_command: git checkout -- scripts/run-commercial-discovery.sh
# run-commercial-discovery.sh - local, READ-ONLY orchestrator for the Daily SEO Intelligence +
# Commercial Discovery pipeline. Writes ONLY under ~/.za-daily-seo (private runtime). No prod, no
# deploy, no git, no Google write, no installs. This is the single wrapper the disabled launchd
# proposal and the next-step engine reference.
#
#   run-commercial-discovery.sh [RUN_ID] [SAMPLE]
#     RUN_ID  optional; default = new UTC stamp
#     SAMPLE  optional live-probe sample size (default 8)
set -uo pipefail
cd "$(dirname "$0")/.." || exit 2
RID="${1:-$(date -u +%Y%m%dT%H%M%SZ)}"
SAMPLE="${2:-8}"
PY="python3"

echo "== run-commercial-discovery RID=$RID (read-only) =="
# Stage A: Daily SEO Intelligence
$PY scripts/daily-seo-collect.py    --collect   --run-id "$RID" --sample "$SAMPLE" || exit 1
$PY scripts/daily-seo-normalize.py  --normalize --run-id "$RID" || exit 1
$PY scripts/daily-seo-analyze.py    --analyze   --run-id "$RID" || exit 1
$PY scripts/daily-seo-healthcheck.py --healthcheck --run-id "$RID" || true   # rc3 = DEGRADED is expected when sources blocked
$PY scripts/daily-seo-report.py     --report    --run-id "$RID" || exit 1

# Stage B: Commercial Discovery (reuses A's normalized snapshot)
$PY scripts/discovery-source-health.py         --check   --run-id "$RID" || true
$PY scripts/discovery-snapshot.py              --snapshot --run-id "$RID" || exit 1
$PY scripts/discovery-keyword-intent-expand.py --expand  --run-id "$RID" || exit 1
$PY scripts/discovery-gap-detect.py            --detect  --run-id "$RID" || exit 1
$PY scripts/discovery-score.py                 --score   --run-id "$RID" || exit 1
$PY scripts/discovery-decision.py              --decide  --run-id "$RID" || exit 1
# DOUBLE self-gap engine (mandatory before finalising)
$PY scripts/discovery-self-gap-pass1.py        --pass1   --run-id "$RID" || exit 1
$PY scripts/discovery-self-gap-pass2.py        --pass2   --run-id "$RID" || exit 1
$PY scripts/discovery-self-gap-merge.py        --merge   --run-id "$RID" || exit 1
$PY scripts/discovery-operationalization-check.py --check --run-id "$RID" || true
$PY scripts/discovery-next-step.py             --next    --run-id "$RID" || exit 1
$PY scripts/discovery-report.py                --report  --run-id "$RID" || exit 1
# Workstream 12: release-state evidence + preview verification (read-only; never pushes)
$PY scripts/discovery-preview-verify.py        --verify || true

echo "== done. artifacts under ~/.za-daily-seo/runs/$RID/ and reports/ =="
echo "RID=$RID"
