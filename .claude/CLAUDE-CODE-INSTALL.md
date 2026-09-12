---
name: zas-infrastructure-install-instructions
description: Self-installing instruction file. Tells Claude Code exactly which file goes where, with permissions, verification and rollback. Works as a Claude Code executable .md and as claude.ai project knowledge. Answers the question "must I copy-paste these files" with no.
artefact_version: "1.0"
artefact_created: "2026-08-13T13:00:00+02:00"
surface: [code, chat]
---

<!-- claude-code-import-metadata
operation: guided-install
entry_point: "ZAS Claude Install 10.8.26.command"
copy_paste_required: false
target_root: "${CLAUDE_PROJECT_DIR:-$PWD}"
create_parent_dirs: true
backup_before_write: true
overwrite_if_exists: false
archive_path: ".claude/_archive/<UTC-timestamp>/"
append_only_files:
  - .claude/telemetry.ndjson
  - .claude/validation.log
  - .claude/learning-ledger.md
  - .claude/eval-history.ndjson
  - .claude/verification-results.ndjson
  - .claude/framework/install-ledger.ndjson
post_install_verify: "bash .claude/hooks/smoke-test.sh"
rollback_command: "cp -r .claude/_archive/<timestamp>/* .claude/"
-->

# Claude Code install instructions

## Answer first: no copy-pasting

You do not place any of these files by hand. One command does all of it:

```bash
cd /path/to/zas-m2m && bash "ZAS Claude Install 10.8.26.command"
```

On macOS you can also double-click `ZAS Claude Install 10.8.26.command` in Finder. The installer creates directories, archives anything it would replace, copies each file to its destination, sets permissions, merges the settings JSON inside a managed block, and runs a smoke test that refuses to report success if the negative control does not correctly fail.

The rest of this document exists so that Claude Code (or you) can verify the placement is correct, or perform it manually if the installer is ever unavailable.

## Destination map

Generated from the installer's own logic, so this table and the installer cannot disagree.

### Project scope, under the repository you run the installer in

| Source in bundle | Destination | Mode | Why there |
|---|---|---|---|
| `hooks/*.sh` and `hooks/*.py` (20 files) | `.claude/hooks/` | 0755 | Referenced by settings.json via `${CLAUDE_PROJECT_DIR}/.claude/hooks/` |
| `pattern-engine.py` | `.claude/hooks/pattern-engine.py` | 0755 | Grouped with hooks so one path prefix covers all executables |
| `claim-verify.py` | `.claude/hooks/claim-verify.py` | 0755 | Same |
| `rules/*.md` (9 files) | `.claude/rules/` | 0644 | Claude Code auto-discovers `.md` recursively here; `paths:` frontmatter makes them lazily loaded |
| `agents/*.md` (2 files) | `.claude/agents/` | 0644 | Subagent definitions are discovered here by name |
| `fixtures/*.py` | `.claude/fixtures/` | 0644 | Smoke-test inputs; `bad.py` carries planted faults and must never be linted as real code |
| `guardrails.json` | `.claude/guardrails.json` | 0644 | Machine-readable guardrail manifest |
| `roadmap.json` | `.claude/roadmap.json` | 0644 | Dependency-ordered build plan |
| `claims-ledger.json` | `.claude/claims-ledger.json` | 0644 | Claim definitions the verifier executes |
| `framework/tooling-framework.json` | `.claude/framework/` | 0644 | Drives the tooling installer |
| `capture/SESSION-INTELLIGENCE.md` | `.claude/capture/` | 0644 | Session knowledge, also uploadable to claude.ai |
| `ci/claude-quality.yml` | `.github/workflows/` | 0644 | GitHub Actions expects workflows only at this exact path |

### Machine scope, outside the repository

| Source in bundle | Destination | Mode | Why there |
|---|---|---|---|
| `scripts/cc-weekly-audit.sh` | `~/bin/` | 0755 | Runs on a schedule across all projects, not one repo |
| `scripts/cc-watchdog.sh` | `~/bin/` | 0755 | Same |
| `scripts/local-advisor-agent.py` | `~/bin/` | 0755 | Same |
| `launchd/*.plist` (4 files) | `~/Library/LaunchAgents/` | 0644 | macOS only loads user agents from this exact directory |

### Stays in the bundle, not installed

`README.md`, `framework/README.md`, `framework/TOOLING-KNOWLEDGE.md`, `framework/framework-install.sh`, `.deliveryignore`, and both `.command` files are run or read from where they are. `TOOLING-KNOWLEDGE.md` is for uploading to claude.ai, not for the filesystem.

## Execution sequence

### Phase 1, install the infrastructure

```bash
cd /path/to/zas-m2m
bash "ZAS Claude Install 10.8.26.command"
```

Expect `RESULT: OPERATIONAL. All checks passed.` If it prints BLOCKED, stop and read which check failed. Do not proceed.

### Phase 2, start a new Claude Code session

This is not optional. Hook and settings changes are deliberately not applied to a running session, as a protection against mid-session modification. Open a new session in the project, then confirm:

```
/hooks
/permissions
```

`/hooks` should list SessionStart, PreToolUse, PostToolUse, SessionEnd, ConfigChange, Stop and SubagentStop with source "Project Settings". `/permissions` should show the deny rules including `Edit(.claude/hooks/**)`.

### Phase 3, verify

```bash
bash "ZAS Verify And Capture 11.8.26.command"
```

Prints a measured confidence rate. An unreachable source is reported as unknown, never as a pass.

### Phase 4, load the launchd agents (one time, macOS only)

The installer stages the plists but does not load them, because loading a scheduled job is a decision you should make deliberately:

```bash
for L in com.zasupport.ccwatchdog.weekly com.zasupport.ccwatchdog.heartbeat com.zasupport.ccadvisor com.zasupport.persistence; do
  launchctl bootstrap "gui/$(id -u)" "$HOME/Library/LaunchAgents/$L.plist" 2>/dev/null && echo "loaded $L"
done
```

### Phase 5, review the tooling plan before installing anything

```bash
bash framework/framework-install.sh              # dry run, installs nothing
bash framework/framework-install.sh --declined   # what was rejected and why
bash framework/framework-install.sh --risks      # bus-factor and licence risks
bash framework/framework-install.sh --apply --stage 4
```

## Verification checklist

Run these on the Mac. They exercise the BSD-specific paths that a Linux build container cannot test, so this is the real proof for `launchctl`, `osascript`, and the BSD variants of `stat`, `sed` and `date`.

```bash
bash .claude/hooks/smoke-test.sh                          # five controls, negative must exit 2 internally
bash .claude/hooks/persistence-watchdog.sh --self-test    # exercises launchctl and BSD stat
bash .claude/hooks/preflight-inventory.sh --self-test     # exercises BSD stat and cloud-root detection
bash .claude/hooks/consolidate.sh --self-test             # exercises the git and cloud refusals
bash .claude/hooks/authority.sh --self-test
python3 .claude/hooks/advisor-router.py --self-test
python3 .claude/hooks/advisor-eval.py --self-test
python3 .claude/hooks/escalation-gate.py --self-test
bash framework/framework-install.sh --self-test
```

All should print OPERATIONAL. If one fails, its output names the construct that broke.

## Manual placement, only if the installer is unavailable

```bash
cd /path/to/zas-m2m
T="${CLAUDE_PROJECT_DIR:-$PWD}"     # set T to your project root first
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
mkdir -p "$T/.claude/_archive/$STAMP" "$T/.claude/hooks" "$T/.claude/rules" \
         "$T/.claude/agents" "$T/.claude/fixtures" "$T/.claude/framework" \
         "$T/.claude/capture" "$T/.github/workflows" "$HOME/bin" "$HOME/Library/LaunchAgents"

# Archive anything that would be replaced. Never delete.
[ -d "$T/.claude/hooks" ] && cp -r "$T/.claude/hooks" "$T/.claude/_archive/$STAMP/" 2>/dev/null
[ -f "$T/.claude/settings.json" ] && cp "$T/.claude/settings.json" "$T/.claude/_archive/$STAMP/" 2>/dev/null

cp hooks/*.sh hooks/*.py "$T/.claude/hooks/" && chmod 755 "$T/.claude/hooks/"*
cp pattern-engine.py claim-verify.py "$T/.claude/hooks/" && chmod 755 "$T/.claude/hooks/"*.py
cp rules/*.md "$T/.claude/rules/"
cp agents/*.md "$T/.claude/agents/"
cp fixtures/*.py "$T/.claude/fixtures/"
cp guardrails.json roadmap.json claims-ledger.json "$T/.claude/"
cp framework/tooling-framework.json "$T/.claude/framework/"
cp capture/SESSION-INTELLIGENCE.md "$T/.claude/capture/"
cp ci/claude-quality.yml "$T/.github/workflows/"
cp scripts/* "$HOME/bin/" && chmod 755 "$HOME/bin/cc-"* "$HOME/bin/local-advisor-agent.py"
cp launchd/*.plist "$HOME/Library/LaunchAgents/"
echo "Files placed. settings.json still needs merging; prefer the installer, which does it inside a managed block."
```

Manual placement does NOT merge the hooks and permissions into `settings.json`. That merge is the part most easily got wrong, which is why the installer exists. Use manual placement only to recover, then re-run the installer to complete the wiring.

## Rules Claude Code must follow when acting on this document

1. Never delete. Archive to `.claude/_archive/<UTC-timestamp>/` before replacing anything.
2. Never truncate an append-only file. The list is in the metadata block above; the installer records line counts and fails if any shrank.
3. Merge `settings.json` inside the managed block markers only. Leave every key outside those markers untouched.
4. Verify after each phase and paste the real output. Do not claim a phase completed without evidence.
5. If the smoke test's negative control does not fail correctly, the pipeline is broken. Stop and report rather than continuing.
6. If `git status` is dirty at the start, stop and ask before writing anything.

## Known limitations

- The bundle was built and tested in a Linux container, so `launchctl`, `osascript` and BSD userland were exercised only by construction. The Phase 5 verification checklist is what closes that gap; run it on the Mac.
- The installer stages launchd plists but does not load them. Phase 4 is a deliberate manual step.
- Ten of the twelve tools in the tooling framework were verified by plan rather than by installing every one during the build. Two (squawk and schemathesis) were genuinely installed and verified.
- Manual placement omits the settings merge, so it is a recovery path, not an equivalent.
