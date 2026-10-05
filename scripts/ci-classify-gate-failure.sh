#!/usr/bin/env bash
# CLAUDE-CODE-INJECTION
# target_path: scripts/ci-classify-gate-failure.sh
# permissions: 0755
# create_parent_dirs: false
# overwrite_if_exists: true
# backup_if_exists: true
# post_install_verify: bash scripts/ci-classify-gate-failure.sh --test
# rollback_command: git checkout -- scripts/ci-classify-gate-failure.sh
#
# Read-only CI gate-failure diagnostic (option b, proportionate to a one-off bug).
# On a failed "SEO PR gates" run it classifies the failure into a known class and
# posts/updates ONE marked comment on the PR so the next session starts at root cause.
#
# HARD boundaries (why this is safe):
#   - READ-ONLY on the repo: it never edits code, never commits, never opens/merges a PR.
#   - The ONLY write is a single PR *comment* (find-or-update, so no spam), needing just
#     `pull-requests: write` -- never `contents: write`.
#   - It does NOT change the gate's pass/fail: it runs as an `if: failure()` step after the
#     real test step has already set the job result.
#   - Same-repo PRs only (the workflow `if:` guards forks; this is belt-and-braces).
#   - Emits a classification + the first matching signature line only; no raw log dump.
# This runs on a Linux CI runner; there is no local file to reveal (reveal-on-create N/A).
set -euo pipefail

MARKER='<!-- za-ci-gate-diagnostic -->'

# classify <logfile> -> prints the class slug to stdout (pure, no network).
classify() {
	local log="$1"
	if [ ! -s "$log" ]; then
		echo "pre-e2e-failure"; return 0
	fi
	if grep -qE "Failed to load the ES module|Unexpected token 'export'|require\(\) of ES Module|ERR_REQUIRE_ESM" "$log"; then
		echo "esm-cjs-loader"; return 0
	fi
	if grep -qE "from config\.webServer|webServer.*(exited|timed out)|net::ERR_CONNECTION_REFUSED|Timed out waiting .*localhost" "$log"; then
		echo "playwright-webserver"; return 0
	fi
	if grep -qE "Test timeout of [0-9]+ms exceeded|page\.goto.*[Tt]imeout|locator.*[Tt]imeout exceeded|waiting for .* to be visible" "$log"; then
		echo "playwright-timeout-flake"; return 0
	fi
	if grep -qE "Failed to compile|Build error occurred|next build.*(error|failed)|Type error:" "$log"; then
		echo "build-failure"; return 0
	fi
	if grep -qE "Error: expect\(|expect\(received\)|Assertion failed|toEqual|toBe\(" "$log"; then
		echo "assertion-failure"; return 0
	fi
	echo "unknown"
}

# hint <class> -> prints a concise root-cause hint for the comment.
hint() {
	case "$1" in
		esm-cjs-loader)        echo "A spec imports an ESM \`.mjs\` while the package is CommonJS (no \`type:module\`). Playwright hands \`.mjs\` to Node's raw loader. Fix at the resolution layer (convert the helper to \`.ts\`/\`.mts\` and import without the extension, or scope testMatch to \`*.spec.ts\`). Do NOT set \`type:module\` repo-wide." ;;
		playwright-webserver)  echo "The Playwright webServer (\`npm run start\`) did not come up on BASE_URL. Check the production build step and that the server binds the expected port before tests start." ;;
		playwright-timeout-flake) echo "A test timed out waiting on the page. Likely a real selector/route change or a flake; inspect the Playwright report artifact before assuming flake." ;;
		build-failure)         echo "The production build or typecheck failed before E2E. Fix the compile/type error; E2E never ran." ;;
		assertion-failure)     echo "A test assertion failed (the harness ran). This is a genuine behaviour change; read the failing expectation." ;;
		pre-e2e-failure)       echo "The job failed before the E2E step produced output (install/index/typecheck/lint/seo-unit/build). See the run log for the failing step." ;;
		*)                     echo "Unrecognised failure signature. Open the run log and the Playwright report artifact to root-cause; if this class recurs, extend the classifier registry." ;;
	esac
}

# first_signature <logfile> <class> -> first matching line (sanitised), for the comment.
first_signature() {
	local log="$1" cls="$2" pat=""
	case "$cls" in
		esm-cjs-loader) pat="Failed to load the ES module|Unexpected token 'export'|ERR_REQUIRE_ESM" ;;
		playwright-webserver) pat="config\.webServer|ERR_CONNECTION_REFUSED|Timed out waiting .*localhost" ;;
		playwright-timeout-flake) pat="Test timeout of|[Tt]imeout exceeded" ;;
		build-failure) pat="Failed to compile|Build error occurred|Type error:" ;;
		assertion-failure) pat="Error: expect\(|Assertion failed" ;;
		*) echo ""; return 0 ;;
	esac
	[ -s "$log" ] || { echo ""; return 0; }
	# -m1 (not a head pipe) stops at first match and exits 0; `|| true` swallows no-match so
	# `set -e`/pipefail cannot abort build_comment and silently suppress the whole comment.
	local line
	line="$(grep -m1 -E "$pat" "$log" 2>/dev/null || true)"
	# strip anything token-like; cap length; single line.
	printf '%s' "$line" | sed -E 's/gh[po]_[A-Za-z0-9]+/[redacted]/g; s/(token|secret|key)=[^ ]+/\1=[redacted]/Ig' | cut -c1-240
}

build_comment() {
	local cls="$1" log="$2" sig
	sig="$(first_signature "$log" "$cls")"
	printf '%s\n' "$MARKER"
	printf '### CI gate diagnostic (read-only)\n\n'
	printf '**Failure class:** \`%s\`\n\n' "$cls"
	if [ -n "$sig" ]; then printf '**First signature:** \`%s\`\n\n' "$sig"; fi
	printf '**Root-cause hint:** %s\n\n' "$(hint "$cls")"
	printf '_This comment is posted by a read-only diagnostic step. It does not change the gate result, edit code, or open a PR. Auto-updated in place on each failure (no spam)._\n'
}

post_or_update() {
	# needs env: GH_TOKEN, REPO (owner/name), PR_NUMBER
	local body="$1" existing tmpf
	command -v gh >/dev/null 2>&1 || { echo "gh not available; skipping comment (classification still printed)"; return 0; }
	# No --paginate (fresh PR = one page) so the id is never multiline; // empty => clean absent.
	existing="$(gh api "repos/${REPO}/issues/${PR_NUMBER}/comments" \
		--jq "map(select(.body | contains(\"${MARKER}\"))) | .[0].id // empty" 2>/dev/null || true)"
	# Write via a temp file (-F body=@file is the well-supported form; @- stdin is fragile).
	tmpf="$(mktemp)"; printf '%s' "$body" > "$tmpf"
	if [ -n "$existing" ]; then
		gh api -X PATCH "repos/${REPO}/issues/comments/${existing}" -F body=@"$tmpf" >/dev/null \
			&& echo "updated existing diagnostic comment id=${existing}"
	else
		gh api -X POST "repos/${REPO}/issues/${PR_NUMBER}/comments" -F body=@"$tmpf" >/dev/null \
			&& echo "posted new diagnostic comment"
	fi
	rm -f "$tmpf"
}

run_tests() {
	local tmp rc=0
	tmp="$(mktemp -d)"
	trap 'rm -rf "$tmp"' RETURN
	# POSITIVE control: ESM/CJS loader signature classifies correctly.
	printf 'blah\n##[error]SyntaxError: Unexpected token '\''export'\''\n at mobile-nav.spec.ts:4\n' > "$tmp/esm.log"
	[ "$(classify "$tmp/esm.log")" = "esm-cjs-loader" ] && echo "PASS positive: esm-cjs-loader" || { echo "FAIL positive esm"; rc=1; }
	# POSITIVE 2: webServer failure.
	printf 'Error: Process from config.webServer exited early.\n' > "$tmp/ws.log"
	[ "$(classify "$tmp/ws.log")" = "playwright-webserver" ] && echo "PASS positive: playwright-webserver" || { echo "FAIL positive webserver"; rc=1; }
	# NEGATIVE control: a clean/green log must NOT match a failure class -> unknown.
	printf 'Running 5 tests using 1 worker\n  5 passed (3.2s)\n' > "$tmp/green.log"
	[ "$(classify "$tmp/green.log")" = "unknown" ] && echo "PASS negative: green log -> unknown (no false class)" || { echo "FAIL negative green"; rc=1; }
	# ABSENCE control: missing/empty log -> pre-e2e-failure, never crash.
	[ "$(classify "$tmp/does-not-exist.log")" = "pre-e2e-failure" ] && echo "PASS absence: missing log -> pre-e2e-failure" || { echo "FAIL absence missing"; rc=1; }
	: > "$tmp/empty.log"
	[ "$(classify "$tmp/empty.log")" = "pre-e2e-failure" ] && echo "PASS absence: empty log -> pre-e2e-failure" || { echo "FAIL absence empty"; rc=1; }
	# comment builder always carries the dedup marker (no pipe: pipefail+grep -q SIGPIPEs).
	local cbody; cbody="$(build_comment "esm-cjs-loader" "$tmp/esm.log")"
	case "$cbody" in *"$MARKER"*) echo "PASS: comment carries dedup marker" ;; *) echo "FAIL marker"; rc=1 ;; esac
	return $rc
}

main() {
	if [ "${1:-}" = "--test" ]; then run_tests; exit $?; fi
	local log="${1:-e2e-output.log}" cls body
	cls="$(classify "$log")"
	echo "ci-gate-failure-class=${cls}"
	body="$(build_comment "$cls" "$log")"
	if [ -n "${PR_NUMBER:-}" ] && [ -n "${REPO:-}" ]; then
		post_or_update "$body"
	else
		echo "no PR_NUMBER/REPO in env; classification only (no comment)"
	fi
}

main "$@"
