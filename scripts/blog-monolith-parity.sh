#!/bin/bash
# ======================================================================
# CLAUDE-CODE-INJECTION
#   operation: create-new-file
#   target_path: scripts/blog-monolith-parity.sh
#   permissions: "0755"
#   create_parent_dirs: true
#   overwrite_if_exists: true
#   backup_if_exists: ".claude/_archive/<UTC>/blog-monolith-parity.sh"
#   artefact_version: "1.0"
#   post_install_verify: "bash scripts/blog-monolith-parity.sh --test; test $? -eq 0"
#   rollback_command: "rm scripts/blog-monolith-parity.sh && git checkout -- next.config.ts"
# END-CLAUDE-CODE-INJECTION
# ======================================================================
# HOOK-BLOCK-MANDATE EXEMPTION (.claude/rules/hook-block-mandate.md):
#   This is a MANUAL, on-demand developer parity tool. It has NO Claude lifecycle
#   touchpoint (not a PreToolUse/PostToolUse/Stop hook, not a launchd job) — it is
#   invoked by a person or by the Phase A PR flow, never fired by an event. Per the
#   rule's escape clause it is not hook-governed; instead it ships EQUIVALENT controls:
#   `--test` runs positive/negative/absence controls and appends a line to
#   .claude/validation.log, and a fixture set lives at .claude/fixtures/blog-monolith-parity-*.
# ======================================================================
# blog-monolith-parity.sh — right-sized behaviour-parity harness for Blog Monolith Phase A.
#
# Phase A = move the pure-data `posts` object verbatim from
#   src/app/blog/[slug]/page.tsx  ->  src/app/blog/[slug]/posts.data.ts
# and import it back (import surface unchanged). This harness PROVES the move is
# behaviour-preserving by BUILD OUTPUT, not typecheck alone.
#
# Scope discipline (advisor-reviewed 26.09.26): the `posts` type is 100% data
# (all string fields), and NOTHING imports `posts` except this one server route.
# So the proportionate proof is:
#   (a) slug-set equality   (static, no build)
#   (b) content-region + title/metadata diff on a representative SAMPLE from the
#       prerendered HTML, with framework asset refs + BUILD_ID normalised
#   (c) a client-boundary grep: no 'use client' module imports posts.data
#   + tsc --noEmit clean + a successful `next build` (run by the caller).
# The heavy `next experimental-analyze` client-graph proof is deferred to Phase B
# (chunking), where the module graph actually changes.
#
# Modes:
#   --slug-set <label>        Extract sorted slug set from the data source -> SNAP/<label>.slugs
#   --capture  <label>        ZA_PARITY_BUILD=1 next build, then capture normalised
#                             content signatures for the sample -> SNAP/<label>/
#   --compare  <A> <B>        Diff snapshot A vs B. Exit 2 on ANY difference.
#   --client-boundary         Assert no 'use client' file imports posts.data. Exit 2 on violation.
#   --test                    Pos/neg self-test of the compare logic (synthetic, no build).
#
# Reversible: this script is additive; delete it + revert next.config.ts to remove.
set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ROUTE="$REPO/src/app/blog/[slug]/page.tsx"
DATA_MODULE="$REPO/src/app/blog/[slug]/posts.data.ts"   # exists only after Phase A
SNAP="$REPO/docs/governance/baselines/blog-monolith-parity"   # gitignored dir
SAMPLE_SIZE="${ZA_PARITY_SAMPLE:-15}"
mkdir -p "$SNAP"

log(){ printf '[parity] %s\n' "$*"; }

# --- extract sorted slug set from whichever source currently holds `posts` ---
# Baseline: the route file. Post-extraction: posts.data.ts. We read the object KEYS
# via a tolerant grep of top-level `'slug-key': {` entries, then sort -u.
extract_slugs(){
  local src="$1"
  # keys look like:  'macbook-pro-m2-data-recovery': {
  grep -oE "^  '[^']+': \{" "$src" 2>/dev/null | sed -E "s/^  '([^']+)': \{/\1/" | LC_ALL=C sort -u
}

slug_source(){ [ -f "$DATA_MODULE" ] && echo "$DATA_MODULE" || echo "$ROUTE"; }

cmd_slug_set(){
  local label="${1:?label required}"; local src; src="$(slug_source)"
  extract_slugs "$src" > "$SNAP/$label.slugs"
  log "slug-set[$label]: $(wc -l < "$SNAP/$label.slugs" | tr -d ' ') slugs from $(basename "$src") -> $SNAP/$label.slugs"
}

# --- normalise one prerendered HTML file into a content signature ---
# Strips <script>/<link>/<style>, normalises /_next/static/<hash>/ and the build id,
# and emits title|description|canonical + a sha of the remaining (content) HTML.
normalise_html(){
  python3 - "$1" <<'PY'
import re,sys,hashlib
html=open(sys.argv[1],encoding="utf-8",errors="replace").read()
def m(pat):
    x=re.search(pat,html,re.I|re.S); return (x.group(1).strip() if x else "")
title=m(r"<title[^>]*>(.*?)</title>")
desc=m(r'<meta[^>]+name=["\']description["\'][^>]+content=["\'](.*?)["\']')
canon=m(r'<link[^>]+rel=["\']canonical["\'][^>]+href=["\'](.*?)["\']')
body=html
body=re.sub(r"<script\b.*?</script>","",body,flags=re.I|re.S)
body=re.sub(r"<style\b.*?</style>","",body,flags=re.I|re.S)
body=re.sub(r"<link\b[^>]*>","",body,flags=re.I)
body=re.sub(r"/_next/static/[^\"'()]+","/_next/static/NORM",body)
body=re.sub(r"za-parity-fixed|buildId[\"']?\s*:\s*[\"'][^\"']+[\"']","BUILDID",body)
body=re.sub(r"\s+"," ",body).strip()
sig=hashlib.sha256(body.encode()).hexdigest()
print("title\t"+title); print("description\t"+desc); print("canonical\t"+canon); print("content_sha256\t"+sig)
PY
}

# find a prerendered HTML file for a slug in the Next 16 build output
find_html(){
  local slug="$1"
  find "$REPO/.next/server/app/blog" -type f -name "$slug.html" 2>/dev/null | head -1
}

cmd_capture(){
  local label="${1:?label required}"
  log "capture[$label]: building with pinned BUILD_ID (ZA_PARITY_BUILD=1)…"
  ( cd "$REPO" && ZA_PARITY_BUILD=1 npx next build ) > "$SNAP/$label.build.log" 2>&1 || {
    log "BUILD FAILED — see $SNAP/$label.build.log"; return 3; }
  local src; src="$(slug_source)"; extract_slugs "$src" > "$SNAP/$label.slugs"
  local total; total=$(wc -l < "$SNAP/$label.slugs" | tr -d ' ')
  mkdir -p "$SNAP/$label"
  # representative sample: every Nth slug across the sorted set
  local step=$(( total / SAMPLE_SIZE )); [ "$step" -lt 1 ] && step=1
  local i=0 n=0
  while IFS= read -r slug; do
    i=$((i+1)); [ $(( i % step )) -ne 0 ] && continue
    local f; f="$(find_html "$slug")"
    if [ -n "$f" ]; then normalise_html "$f" > "$SNAP/$label/$slug.sig"; n=$((n+1)); fi
  done < "$SNAP/$label.slugs"
  log "capture[$label]: $total slugs, $n sample signatures -> $SNAP/$label/"
}

cmd_compare(){
  local a="${1:?A}"; local b="${2:?B}"; local rc=0
  if ! diff -q "$SNAP/$a.slugs" "$SNAP/$b.slugs" >/dev/null 2>&1; then
    log "SLUG-SET DIFF between $a and $b:"; diff "$SNAP/$a.slugs" "$SNAP/$b.slugs" || true; rc=2
  else log "slug-set: identical ($(wc -l < "$SNAP/$a.slugs" | tr -d ' ') slugs)"; fi
  if [ -d "$SNAP/$a" ] && [ -d "$SNAP/$b" ]; then
    if diff -rq "$SNAP/$a" "$SNAP/$b" >/dev/null 2>&1; then
      log "content signatures: identical"
    else log "CONTENT SIGNATURE DIFF:"; diff -r "$SNAP/$a" "$SNAP/$b" || true; rc=2; fi
  fi
  [ "$rc" -eq 0 ] && log "PARITY PASS ($a vs $b)" || log "PARITY FAIL ($a vs $b)"
  return "$rc"
}

cmd_client_boundary(){
  # vacuous-but-recorded for Phase A: nothing may import posts.data from a client module
  local hits
  hits=$(grep -rlE "posts\.data|posts-data" "$REPO/src" 2>/dev/null | while read -r f; do
           head -3 "$f" | grep -qE "^['\"]use client['\"]" && echo "$f"; done || true)
  if [ -n "$hits" ]; then log "CLIENT-BOUNDARY VIOLATION: 'use client' file(s) import posts.data:"; echo "$hits"; return 2; fi
  log "client-boundary: OK (no 'use client' module imports posts.data)"
}

cmd_test(){
  local t; t="$(mktemp -d)"; local rc=0
  mkdir -p "$SNAP/_t_a" "$SNAP/_t_b"
  printf 'title\tX\ncontent_sha256\tabc\n' > "$SNAP/_t_a/s1.sig"
  cp "$SNAP/_t_a/s1.sig" "$SNAP/_t_b/s1.sig"
  printf 'a\nb\nc\n' > "$SNAP/_t_a.slugs"; cp "$SNAP/_t_a.slugs" "$SNAP/_t_b.slugs"
  # positive control: identical -> PASS (0)
  if cmd_compare _t_a _t_b >/dev/null 2>&1; then log "POS control PASS (identical -> 0)"; else log "POS control FAILED"; rc=1; fi
  # negative control: perturb one content sig -> must FAIL (2)
  printf 'title\tX\ncontent_sha256\tZZZ\n' > "$SNAP/_t_b/s1.sig"
  if cmd_compare _t_a _t_b >/dev/null 2>&1; then log "NEG control FAILED (diff not caught!)"; rc=1; else log "NEG control PASS (planted diff caught -> 2)"; fi
  # negative control 2: slug-set drift -> must FAIL
  printf 'a\nb\n' > "$SNAP/_t_b.slugs"
  if cmd_compare _t_a _t_b >/dev/null 2>&1; then log "NEG(slug) FAILED"; rc=1; else log "NEG(slug) PASS (slug drift caught)"; fi
  # absence control: comparing a missing snapshot must be a DEFINED failure, never a crash/silent pass
  if cmd_compare _t_a _t_missing >/dev/null 2>&1; then log "ABSENCE control FAILED (missing snapshot passed!)"; rc=1; else log "ABSENCE control PASS (missing snapshot -> defined fail, no crash)"; fi
  rm -rf "$SNAP/_t_a" "$SNAP/_t_b" "$SNAP/_t_a.slugs" "$SNAP/_t_b.slugs" "$t"
  local vlog="$REPO/.claude/validation.log"
  printf '%s blog-monolith-parity --test rc=%s (pos/neg/neg-slug/absence)\n' "$(date -u +%FT%TZ)" "$rc" >> "$vlog" 2>/dev/null || true
  [ "$rc" -eq 0 ] && log "SELF-TEST: ALL CONTROLS PASS" || log "SELF-TEST: FAILURES"
  return "$rc"
}

case "${1:-}" in
  --slug-set)        shift; cmd_slug_set "$@";;
  --capture)         shift; cmd_capture "$@";;
  --compare)         shift; cmd_compare "$@";;
  --client-boundary) shift; cmd_client_boundary "$@";;
  --test)            shift; cmd_test "$@";;
  *) echo "usage: $0 --slug-set <label> | --capture <label> | --compare <A> <B> | --client-boundary | --test" >&2; exit 2;;
esac
