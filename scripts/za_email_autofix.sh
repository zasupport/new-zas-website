#!/bin/bash
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
LOCK_FILE="$HOME/.za-email-fix.lock"
SUCCESS_MARKER="$HOME/.za-email-fix.resolved"
PENDING_ENV="$HOME/.za-keys-pending.env"
LOG_FILE="$HOME/.za-email-autofix.log"
FAILURE_REPORT="$SCRIPT_DIR/email-fix-failure.html"
SHELL_PROFILE="$HOME/.zshrc"
PLIST_NAME="com.zasupport.emailfix"
PLIST_PATH="$HOME/Library/LaunchAgents/${PLIST_NAME}.plist"

log() { echo "$(date '+%Y-%m-%d %H:%M:%S') $1" >> "$LOG_FILE"; }

if [ -f "$SUCCESS_MARKER" ]; then
    launchctl bootout "gui/$(id -u)" "$PLIST_PATH" 2>/dev/null
    rm -f "$PLIST_PATH" "$LOCK_FILE" "$FAILURE_REPORT"
    log "RESOLVED — LaunchAgent removed. Self-destruct complete."
    exit 0
fi

if [ -f "$LOCK_FILE" ]; then exit 0; fi
touch "$LOCK_FILE"
trap 'rm -f "$LOCK_FILE"' EXIT

log "--- Auto-fix attempt started ---"
FAIL_REASON=""

if [ -n "${MS_GRAPH_REFRESH_TOKEN:-}" ]; then
    log "Token already in environment."
else
    if [ -f "$PENDING_ENV" ]; then
        TOKEN_VALUE=$(grep 'MS_GRAPH_REFRESH_TOKEN' "$PENDING_ENV" | head -1 | cut -d'=' -f2- | tr -d '"' | tr -d "'")
        if [ -n "$TOKEN_VALUE" ]; then
            export MS_GRAPH_REFRESH_TOKEN="$TOKEN_VALUE"
            log "Token sourced from $PENDING_ENV"
        else
            FAIL_REASON="Token key exists in $PENDING_ENV but value is empty."
        fi
    else
        FAIL_REASON="$PENDING_ENV not found on disk."
    fi
fi

if [ -z "${MS_GRAPH_REFRESH_TOKEN:-}" ]; then
    [ -z "$FAIL_REASON" ] && FAIL_REASON="No token available from any source."
    log "FAIL — $FAIL_REASON"
fi

if [ -n "${MS_GRAPH_REFRESH_TOKEN:-}" ]; then
    if ! grep -q 'MS_GRAPH_REFRESH_TOKEN' "$SHELL_PROFILE" 2>/dev/null; then
        echo "" >> "$SHELL_PROFILE"
        echo "# ZA Support email token — auto-added by za_email_autofix.sh" >> "$SHELL_PROFILE"
        echo "export MS_GRAPH_REFRESH_TOKEN=\"$MS_GRAPH_REFRESH_TOKEN\"" >> "$SHELL_PROFILE"
        log "Token persisted to $SHELL_PROFILE"
    fi
fi

if [ -n "${MS_GRAPH_REFRESH_TOKEN:-}" ] && [ -z "$FAIL_REASON" ]; then
    HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
        -X POST "https://login.microsoftonline.com/common/oauth2/v2.0/token" \
        -d "client_id=${MS_CLIENT_ID:-02d82633-39c6-4456-bb06-43ba34c6ee91}" \
        -d "scope=Mail.Send" \
        -d "refresh_token=$MS_GRAPH_REFRESH_TOKEN" \
        -d "grant_type=refresh_token" \
        2>/dev/null)

    if [ "$HTTP_STATUS" = "200" ]; then
        log "SUCCESS — Token validated against Graph API."
        touch "$SUCCESS_MARKER"
        rm -f "$FAILURE_REPORT"
        exit 0
    elif [ "$HTTP_STATUS" = "000" ]; then
        if grep -q 'MS_GRAPH_REFRESH_TOKEN' "$SHELL_PROFILE" 2>/dev/null; then
            log "NETWORK SKIP — Offline. Token in profile. Marking tentatively resolved."
            touch "$SUCCESS_MARKER"
            exit 0
        fi
        FAIL_REASON="Network unavailable and token not yet in shell profile."
    else
        FAIL_REASON="Graph API rejected the token (HTTP $HTTP_STATUS). Token may be expired or client_id incorrect."
    fi
fi

if [ -n "$FAIL_REASON" ]; then
    log "WARN — $FAIL_REASON (non-fatal — token validation can be retried)"
    TIMESTAMP=$(date '+%A %d %B %Y at %H:%M')
    ATTEMPTS=$(grep -c "Auto-fix attempt started" "$LOG_FILE" 2>/dev/null || echo "1")
    cat > "$FAILURE_REPORT" << HTMLEOF
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>ZA Support — Email Fix Required</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,sans-serif;background:#0f172a;color:#e2e8f0;padding:40px}.card{max-width:640px;margin:0 auto;background:#1e293b;border-radius:12px;border:1px solid #334155;overflow:hidden}.header{background:#dc2626;padding:24px 32px}.header h1{font-size:18px;color:#fff}.header p{font-size:13px;color:#fecaca;margin-top:4px}.body{padding:32px}.reason{background:#0f172a;border-left:3px solid #dc2626;padding:16px 20px;border-radius:0 8px 8px 0;margin-bottom:24px;font-size:14px}code{background:#0f172a;padding:2px 6px;border-radius:4px;font-size:13px;color:#67e8f9}.meta{border-top:1px solid #334155;padding:20px 32px;font-size:12px;color:#64748b}</style>
</head>
<body><div class="card">
<div class="header"><h1>Email Send — Auto-Fix Failed</h1><p>$TIMESTAMP · Attempt #$ATTEMPTS</p></div>
<div class="body"><div class="reason">$FAIL_REASON</div>
<p>1. Check <code>~/.za-keys-pending.env</code> for MS_GRAPH_REFRESH_TOKEN</p>
<p>2. If expired, re-run OAuth2 flow</p>
<p>3. Script retries at 7pm daily or run manually</p>
</div>
<div class="meta">Log: ~/.za-email-fix.log</div>
</div></body></html>
HTMLEOF
    open "$FAILURE_REPORT" 2>/dev/null
    # Exit 0 — token validation failure is a known state, not a script error
    # The failure report HTML is generated for visibility
    exit 0
fi
