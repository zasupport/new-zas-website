#!/bin/bash
# scripts/install-cron-jobs.sh
# Installs all scheduled jobs for the ZA Support blog automation system.
#
# Jobs installed:
#   1. GSC traffic refresh — weekly, Sunday 23:00 SAST (refreshes publish schedule)
#   2. Sanity post scheduler — hourly (assigns ready drafts to next slot)
#   3. Blog leak scanner — daily, 02:00 SAST (catches leaks on live pages)
#   4. Learning loop — daily, 03:00 SAST (turns detected leaks into permanent patterns)
#
# Usage:
#   bash scripts/install-cron-jobs.sh
#
# To uninstall:
#   crontab -l | grep -v "ZA-SUPPORT-BLOG" | crontab -

set -e

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
NODE_BIN="$(which node)"
LOG_DIR="${PROJECT_DIR}/logs"

mkdir -p "${LOG_DIR}"

echo "Installing cron jobs for ZA Support blog automation"
echo "  Project dir: ${PROJECT_DIR}"
echo "  Node binary: ${NODE_BIN}"
echo "  Log dir:     ${LOG_DIR}"
echo ""

# Build the new crontab — preserve existing entries that aren't ours
TEMP_CRON=$(mktemp)
crontab -l 2>/dev/null | grep -v "ZA-SUPPORT-BLOG" > "${TEMP_CRON}" || true

cat >> "${TEMP_CRON}" << EOF

# ZA-SUPPORT-BLOG — Auto-installed $(date '+%Y-%m-%d %H:%M:%S')
# 1. GSC traffic refresh (Sunday 23:00 SAST = 21:00 UTC)
0 21 * * 0 cd "${PROJECT_DIR}" && ${NODE_BIN} scripts/gsc-traffic-analyser.js --refresh-schedule >> "${LOG_DIR}/gsc-refresh.log" 2>&1 # ZA-SUPPORT-BLOG

# 2. Sanity post scheduler (hourly, runs at :05 to allow for clock drift)
5 * * * * cd "${PROJECT_DIR}" && ${NODE_BIN} scripts/schedule-sanity-posts.js >> "${LOG_DIR}/scheduler.log" 2>&1 # ZA-SUPPORT-BLOG

# 3. Blog leak scanner (daily, 02:00 SAST = 00:00 UTC)
0 0 * * * cd "${PROJECT_DIR}" && ${NODE_BIN} scripts/scan-blog-leaks.js >> "${LOG_DIR}/leak-scanner.log" 2>&1 # ZA-SUPPORT-BLOG

# 4. Learning loop (daily, 03:00 SAST = 01:00 UTC, runs after scanner)
0 1 * * * cd "${PROJECT_DIR}" && ${NODE_BIN} scripts/learning-loop.js >> "${LOG_DIR}/learning-loop.log" 2>&1 # ZA-SUPPORT-BLOG

EOF

crontab "${TEMP_CRON}"
rm "${TEMP_CRON}"

echo "Installed cron jobs:"
crontab -l | grep "ZA-SUPPORT-BLOG"
echo ""
echo "Logs will be written to: ${LOG_DIR}"
echo ""
echo "To verify the jobs are scheduled correctly:"
echo "  crontab -l | grep ZA-SUPPORT-BLOG"
echo ""
echo "To tail the logs:"
echo "  tail -f ${LOG_DIR}/*.log"
echo ""
echo "First run will be at the next matching time."
echo "To run any job immediately:"
echo "  cd ${PROJECT_DIR} && node scripts/gsc-traffic-analyser.js --refresh-schedule"
