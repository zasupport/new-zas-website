---
claude_code_injection:
  operation: create-new-file
  target_path: .claude/rules/hook-block-mandate.md
  create_parent_dirs: true
  overwrite_if_exists: false
  backup_if_exists: true
  artefact_version: "1.0"
  artefact_created: "2026-08-10T16:45:00+02:00"
---

# HARD RULE: hook block schema on every developed process

Applies always (no paths frontmatter). Every process, task, script, automation, launchd job, or pipeline developed by Claude Code or Claude AI for ZA Support MUST ship with its hook block schema. A process without its hook block is incomplete and may not be declared done.

The mandatory set for every new process:

1. The hooks JSON wiring for `.claude/settings.json`, merged inside the managed block markers only (`>>> BEGIN self-healing-quality v2 (managed)` ... `<<< END`), exec form with `args: []` and an explicit `timeout`.
2. The hook script itself in `.claude/hooks/`, `#!/usr/bin/env bash`, `chmod +x`, BSD-safe (no `grep -P`, no GNU `sed -i`, jq optional with a python3 fallback), logging every run to `.claude/validation.log`, exit 2 for enforcement and never exit 1.
3. Paired permission deny rules for anything an `if` filter guards, because the `if` filter is best-effort and fails open. A guard hook without its deny rule is not enforcement.
4. A fixture pair and smoke-test entry: positive control (known-good input passes, exit 0), negative control (planted bad input MUST be flagged, exit 2), absence control (missing input or missing binary produces a logged advisory and exit 0, never a silent pass, never a crash).
5. Validation evidence before declaring done: the `/hooks` menu listing showing the new handler with its source, and a `claude --debug` run showing the hook firing. TEST-BEFORE-DECLARE. Paste real output, never a claim.
6. Archive-not-destroy: any pre-existing file the wiring replaces is archived to `.claude/_archive/<UTC>/` first. Never delete.

If a process genuinely cannot be hook-governed (purely external, no Claude lifecycle touchpoint), state that explicitly in the deliverable with the reason, and give it the equivalent controls (its own smoke test writing to validation.log). Silence is not an exemption.
