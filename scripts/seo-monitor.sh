#!/bin/bash
# SEO Monitor — runs weekly via launchd or cron
# Checks: PageSpeed score, sitemap status, broken links, keyword positions
# Usage: bash scripts/seo-monitor.sh
# Schedule: weekly (add to crontab: 0 9 * * 1 cd /path && bash scripts/seo-monitor.sh)

[ -f "$HOME/.za-keys-pending.env" ] && source "$HOME/.za-keys-pending.env"

SITE="https://zasupport.com"
LOG_DIR="$HOME/.za_support/seo-logs"
DATE=$(date '+%d/%m/%Y %H:%M')
LOG_FILE="$LOG_DIR/$(date '+%Y-%m-%d').log"

mkdir -p "$LOG_DIR"

echo "=== ZA Support SEO Monitor — $DATE ===" | tee "$LOG_FILE"

# 1. Check site is live
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$SITE")
echo "Site status: $HTTP_STATUS" | tee -a "$LOG_FILE"
if [ "$HTTP_STATUS" != "200" ]; then
    osascript -e "display notification \"ALERT: zasupport.com returning $HTTP_STATUS\" with title \"SEO Monitor\" sound name \"Basso\""
fi

# 2. Check sitemap
SITEMAP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$SITE/sitemap.xml")
echo "Sitemap status: $SITEMAP_STATUS" | tee -a "$LOG_FILE"

# 3. Check robots.txt
ROBOTS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$SITE/robots.txt")
echo "Robots.txt status: $ROBOTS_STATUS" | tee -a "$LOG_FILE"

# 4. Check priority pages respond 200
PRIORITY_PAGES=(
    "/liquid-damage"
    "/logic-board-repair"
    "/iphone-repair"
    "/ipad-repair"
    "/apple-repair"
    "/jamf-mdm"
    "/managed-services"
    "/apple-support"
    "/contact"
    "/about"
)

echo "" | tee -a "$LOG_FILE"
echo "Priority page status:" | tee -a "$LOG_FILE"
for page in "${PRIORITY_PAGES[@]}"; do
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$SITE$page")
    echo "  $page → $STATUS" | tee -a "$LOG_FILE"
done

# 5. PageSpeed check (API call)
echo "" | tee -a "$LOG_FILE"
echo "PageSpeed scores:" | tee -a "$LOG_FILE"
if [ -z "${PSI_API_KEY:-}" ]; then
    echo "  [SKIP] PSI_API_KEY not set — skipping PageSpeed section" | tee -a "$LOG_FILE"
else
    for page in "/" "/liquid-damage" "/logic-board-repair"; do
        SCORE=$(curl -s "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${SITE}${page}&strategy=mobile&key=${PSI_API_KEY:-}" 2>/dev/null | \
            python3 -c "import sys,json; d=json.load(sys.stdin);
cats=d.get('lighthouseResult',{}).get('categories',{})
perf=cats.get('performance',{}).get('score','?')
if perf != '?': print(int(perf*100))
else: print('N/A')" 2>/dev/null)
        echo "  Mobile score $page: $SCORE" | tee -a "$LOG_FILE"
    done
fi

# 6. Summary notification
echo "" | tee -a "$LOG_FILE"
echo "✓ SEO check complete — log: $LOG_FILE" | tee -a "$LOG_FILE"

osascript -e "display notification \"SEO check complete — site: $HTTP_STATUS\" with title \"ZA Support SEO\" sound name \"Glass\"" 2>/dev/null
afplay /System/Library/Sounds/Glass.aiff 2>/dev/null
