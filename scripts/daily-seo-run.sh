#!/usr/bin/env bash
# CLAUDE-CODE-INJECTION:
#   target_path: scripts/daily-seo-run.sh
#   permissions: 0755
#   create_parent_dirs: true
#   overwrite_if_exists: true
#   backup_if_exists: true
#   post_install_verify: bash scripts/daily-seo-run.sh --dry-run
#   rollback_command: git checkout -- scripts/daily-seo-run.sh
# One-shot daily orchestrator: collect -> normalize -> analyze -> healthcheck -> report.
# READ-ONLY / advisory. Writes only under ~/.za-daily-seo. Never deploys/commits/publishes.
set -uo pipefail
cd "$(dirname "$0")/.." || exit 2
RID="$(date -u +%Y%m%dT%H%M%SZ)"
SAMPLE="${ZA_PROBE_SAMPLE:-8}"
if [ "${1:-}" = "--dry-run" ]; then echo "would run daily-seo pipeline run-id=$RID sample=$SAMPLE (read-only)"; exit 0; fi
python3 scripts/daily-seo-collect.py     --collect --run-id "$RID" --sample "$SAMPLE" || exit 1
python3 scripts/daily-seo-normalize.py   --normalize --run-id "$RID" || exit 1
python3 scripts/daily-seo-analyze.py     --analyze --run-id "$RID" || exit 1
python3 scripts/daily-seo-healthcheck.py --healthcheck --run-id "$RID" || true   # DEGRADED is not a failure
python3 scripts/daily-seo-report.py      --report --run-id "$RID" || exit 1
echo "daily-seo run complete: $RID"
