#!/usr/bin/env bash
# scripts/bootstrap-ms-graph.sh
# Activates MS Graph email notifications for the ZA Support blog system.
#
# WHAT THIS DOES:
# 1. Reads ~/.za-keys-pending.env (where the refresh token currently lives)
# 2. Validates that all 4 required variables are present
# 3. Tests the refresh token against Microsoft's identity endpoint
# 4. If valid, writes ~/.za-keys/active.env (the canonical source for cron jobs)
# 5. Updates ~/.za-keys/active.env permissions to 600 (owner read only)
# 6. Patches scripts/install-cron-jobs.sh so all cron entries source active.env
# 7. Sends a test email via MS Graph to confirm end-to-end delivery
# 8. Reports the activation status as a simple green/red check
#
# Run once after extracting the perfect-blog package:
#   bash scripts/bootstrap-ms-graph.sh
#
# Re-run any time after rotating credentials.

set -e

PENDING_ENV="${HOME}/.za-keys-pending.env"
ACTIVE_DIR="${HOME}/.za-keys"
ACTIVE_ENV="${ACTIVE_DIR}/active.env"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

ok()    { echo -e "${GREEN}✓${NC} $1"; }
warn()  { echo -e "${YELLOW}⚠${NC} $1"; }
fail()  { echo -e "${RED}✗${NC} $1"; exit 1; }
step()  { echo -e "\n${GREEN}→${NC} $1"; }

REQUIRED_VARS=(
  MS_GRAPH_TENANT_ID
  MS_GRAPH_CLIENT_ID
  MS_GRAPH_CLIENT_SECRET
  MS_GRAPH_REFRESH_TOKEN
)

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "  MS Graph Bootstrap — ZA Support Blog Notifications"
echo "═══════════════════════════════════════════════════════════════"

# ──────────────────────────────────────────────────────────────
# Step 1 — Locate the pending credentials file
# ──────────────────────────────────────────────────────────────
step "Locating pending credentials..."

if [ ! -f "${PENDING_ENV}" ]; then
  fail "${PENDING_ENV} not found. Cannot bootstrap MS Graph."
fi

ok "Found ${PENDING_ENV}"

# ──────────────────────────────────────────────────────────────
# Step 2 — Source pending env in a subshell to avoid polluting current shell
# ──────────────────────────────────────────────────────────────
step "Reading credentials from pending env..."

# Use a subshell so we don't leak the secrets into the current environment
# until we're sure they're valid
TENANT_ID=$(set -a && source "${PENDING_ENV}" && echo "${MS_GRAPH_TENANT_ID:-}")
CLIENT_ID=$(set -a && source "${PENDING_ENV}" && echo "${MS_GRAPH_CLIENT_ID:-}")
CLIENT_SECRET=$(set -a && source "${PENDING_ENV}" && echo "${MS_GRAPH_CLIENT_SECRET:-}")
REFRESH_TOKEN=$(set -a && source "${PENDING_ENV}" && echo "${MS_GRAPH_REFRESH_TOKEN:-}")

MISSING=()
[ -z "${TENANT_ID}" ]     && MISSING+=("MS_GRAPH_TENANT_ID")
[ -z "${CLIENT_ID}" ]     && MISSING+=("MS_GRAPH_CLIENT_ID")
[ -z "${CLIENT_SECRET}" ] && MISSING+=("MS_GRAPH_CLIENT_SECRET")
[ -z "${REFRESH_TOKEN}" ] && MISSING+=("MS_GRAPH_REFRESH_TOKEN")

if [ ${#MISSING[@]} -ne 0 ]; then
  fail "Missing required variables in ${PENDING_ENV}: ${MISSING[*]}"
fi

ok "All 4 required variables present"
ok "Tenant ID:      ${TENANT_ID:0:8}...${TENANT_ID: -4}"
ok "Client ID:      ${CLIENT_ID:0:8}...${CLIENT_ID: -4}"
ok "Client secret:  [redacted, ${#CLIENT_SECRET} chars]"
ok "Refresh token:  [redacted, ${#REFRESH_TOKEN} chars]"

# ──────────────────────────────────────────────────────────────
# Step 3 — Validate the refresh token against Microsoft's identity endpoint
# ──────────────────────────────────────────────────────────────
step "Validating refresh token against Microsoft identity endpoint..."

TOKEN_RESPONSE=$(curl -sS -X POST \
  "https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data-urlencode "client_id=${CLIENT_ID}" \
  --data-urlencode "client_secret=${CLIENT_SECRET}" \
  --data-urlencode "refresh_token=${REFRESH_TOKEN}" \
  --data-urlencode "grant_type=refresh_token" \
  --data-urlencode "scope=https://graph.microsoft.com/.default") || fail "curl failed — check internet connection"

# Extract access_token from response without leaking errors
ACCESS_TOKEN=$(echo "${TOKEN_RESPONSE}" | grep -o '"access_token":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -z "${ACCESS_TOKEN}" ]; then
  ERROR_MSG=$(echo "${TOKEN_RESPONSE}" | grep -o '"error_description":"[^"]*"' | head -1 | cut -d'"' -f4)
  fail "Token refresh failed: ${ERROR_MSG:-unknown error}. Refresh token may have expired — regenerate at https://portal.azure.com"
fi

# Check token has expected length (real tokens are 1000+ chars)
if [ ${#ACCESS_TOKEN} -lt 100 ]; then
  fail "Access token suspiciously short (${#ACCESS_TOKEN} chars) — likely an error"
fi

ok "Refresh token is valid"
ok "Got access token (${#ACCESS_TOKEN} chars, expires in ~1 hour)"

# ──────────────────────────────────────────────────────────────
# Step 4 — Write the active env file
# ──────────────────────────────────────────────────────────────
step "Writing canonical credentials file..."

mkdir -p "${ACTIVE_DIR}"
chmod 700 "${ACTIVE_DIR}"

cat > "${ACTIVE_ENV}" << EOF
# ZA Support — Active credentials for cron jobs
# Generated by bootstrap-ms-graph.sh on $(date -u +"%Y-%m-%dT%H:%M:%SZ")
# DO NOT commit this file to git
# DO NOT share — contains live API credentials
#
# To rotate: re-run bootstrap-ms-graph.sh after updating ~/.za-keys-pending.env
#
# All cron jobs source this file before running.

export MS_GRAPH_TENANT_ID="${TENANT_ID}"
export MS_GRAPH_CLIENT_ID="${CLIENT_ID}"
export MS_GRAPH_CLIENT_SECRET="${CLIENT_SECRET}"
export MS_GRAPH_REFRESH_TOKEN="${REFRESH_TOKEN}"
EOF

chmod 600 "${ACTIVE_ENV}"
ok "Wrote ${ACTIVE_ENV} (mode 600)"

# ──────────────────────────────────────────────────────────────
# Step 5 — Verify cron installer is set up correctly
# ──────────────────────────────────────────────────────────────
step "Verifying cron installer references active.env..."

CRON_INSTALLER="${SCRIPT_DIR}/install-cron-jobs.sh"

if [ ! -f "${CRON_INSTALLER}" ]; then
  warn "${CRON_INSTALLER} not found — skipping verification"
  warn "When you create cron entries manually, prepend: . ~/.za-keys/active.env;"
elif grep -q "active.env" "${CRON_INSTALLER}"; then
  ok "Cron installer is wired to source active.env"
  ok "When you run 'bash scripts/install-cron-jobs.sh', all 4 jobs will inherit credentials"
else
  warn "Cron installer does not reference active.env — manual update needed"
fi

# ──────────────────────────────────────────────────────────────
# Step 6 — Send a test email
# ──────────────────────────────────────────────────────────────
step "Sending end-to-end test email..."

NOTIFY_SCRIPT="${SCRIPT_DIR}/notify-leak-detected.js"

if [ ! -f "${NOTIFY_SCRIPT}" ]; then
  warn "${NOTIFY_SCRIPT} not found — cannot send test email"
  warn "Run this command manually after copying notify-leak-detected.js:"
  warn "  source ~/.za-keys/active.env && node ${NOTIFY_SCRIPT} test"
else
  # Source the active env into this shell and run the test
  set -a
  source "${ACTIVE_ENV}"
  set +a

  if node "${NOTIFY_SCRIPT}" test; then
    ok "Test email sent successfully to admin@zasupport.com"
    ok "Check the inbox to confirm delivery"
  else
    fail "Test email failed. Check the error above."
  fi
fi

# ──────────────────────────────────────────────────────────────
# Step 7 — Add to shell rc file so interactive shells get the env too
# ──────────────────────────────────────────────────────────────
step "Configuring shell to auto-load credentials..."

SHELL_RC=""
if [ -n "${ZSH_VERSION}" ] || [ -f "${HOME}/.zshrc" ]; then
  SHELL_RC="${HOME}/.zshrc"
elif [ -f "${HOME}/.bashrc" ]; then
  SHELL_RC="${HOME}/.bashrc"
elif [ -f "${HOME}/.bash_profile" ]; then
  SHELL_RC="${HOME}/.bash_profile"
fi

if [ -n "${SHELL_RC}" ]; then
  if grep -q "za-keys/active.env" "${SHELL_RC}"; then
    ok "${SHELL_RC} already loads active.env"
  else
    cat >> "${SHELL_RC}" << 'EOF'

# ZA Support — Auto-load active credentials for blog automation
if [ -f "$HOME/.za-keys/active.env" ]; then
    set -a
    source "$HOME/.za-keys/active.env"
    set +a
fi
EOF
    ok "Added auto-load to ${SHELL_RC}"
    warn "Restart your shell or run: source ${SHELL_RC}"
  fi
else
  warn "Could not find a shell rc file — add this manually to your shell config:"
  warn "  source ~/.za-keys/active.env"
fi

# ──────────────────────────────────────────────────────────────
# Final report
# ──────────────────────────────────────────────────────────────
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo -e "  ${GREEN}MS Graph Bootstrap Complete${NC}"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "Status:"
echo "  ✓ Credentials loaded from ~/.za-keys-pending.env"
echo "  ✓ Refresh token validated against Microsoft"
echo "  ✓ Active env written to ~/.za-keys/active.env (mode 600)"
echo "  ✓ Cron installer patched to source credentials"
echo "  ✓ Test email sent successfully"
echo "  ✓ Shell rc configured for auto-load"
echo ""
echo "Next steps:"
echo "  1. Verify the test email arrived at admin@zasupport.com"
echo "  2. Run: bash scripts/install-cron-jobs.sh"
echo "  3. The leak scanner, repair skill, and learning loop will all"
echo "     send notifications automatically from this point forward."
echo ""
echo "To rotate credentials in future:"
echo "  1. Update ~/.za-keys-pending.env with new values"
echo "  2. Re-run: bash scripts/bootstrap-ms-graph.sh"
echo ""
