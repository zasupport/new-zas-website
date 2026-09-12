---
claude_code_injection:
  operation: create-new-file
  target_path: .claude/rules/file-placement-mandate.md
  permissions: "0644"
  create_parent_dirs: true
  overwrite_if_exists: false
  backup_if_exists: true
  artefact_version: "1.0"
  artefact_created: "2026-08-13T14:30:00+02:00"
  post_install_verify: "test -f .claude/rules/file-placement-mandate.md"
  rollback_command: "rm .claude/rules/file-placement-mandate.md"
---

# HARD RULE: every generated artefact states where it saves

Applies always. No `paths:` frontmatter, so this rule is loaded in every session.

Every piece of content generated for ZA Support ships with an explicit, automatic instruction naming exactly which folder it saves into, chosen as the optimal location for Claude Code to find and access it.

Never leave placement implicit. Never hand the decision back with "save this wherever suits". Never describe a destination in prose without the machine-readable directive that makes it executable.

## The injection header

Every generated artefact carries a `CLAUDE-CODE-INJECTION` block. Shell and Python files carry it as a comment near the top; markdown and JSON carry it as YAML frontmatter or a `claude_code_injection` key. Required fields:

`target_path`, `permissions`, `create_parent_dirs`, `overwrite_if_exists`, `backup_if_exists`, `post_install_verify`, `rollback_command`.

An artefact without this block is incomplete and may not be delivered.

## Canonical destinations

| Content type | Destination | Mode | Why there and nowhere else |
|---|---|---|---|
| Hook scripts and executables | `.claude/hooks/` | 0755 | Referenced by settings.json through `${CLAUDE_PROJECT_DIR}/.claude/hooks/`, so one path prefix covers every executable |
| Rules | `.claude/rules/` | 0644 | Claude Code discovers `.md` recursively here. Add `paths:` frontmatter to make a rule load lazily only when a matching file is touched |
| Subagents | `.claude/agents/` | 0644 | Discovered by name from this directory |
| Manifests, JSON, ledgers | `.claude/` | 0644 | Project-scoped configuration and state |
| Test fixtures | `.claude/fixtures/` | 0644 | Kept out of the lint path so planted faults are never treated as real code |
| Session knowledge | `.claude/capture/` | 0644 | Also the upload source for claude.ai project knowledge |
| Skills | `~/.claude/skills/<name>/SKILL.md` | 0644 | User scope, so a skill is available across every project |
| CI workflows | `.github/workflows/` | 0644 | GitHub Actions reads no other path |
| Machine-wide scripts | `~/bin/` | 0755 | Runs across all projects on a schedule, not tied to one repository |
| launchd agents | `~/Library/LaunchAgents/` | 0644 | macOS loads user agents from nowhere else |
| Client deliverables | the client folder, per the naming rule | 0644 | Spaces in filenames, DD.MM.YYYY dates |

## Project scope versus machine scope

Anything a single repository needs goes under that repository's `.claude/`. Anything that runs on a schedule across every project goes to `~/bin` and `~/Library/LaunchAgents`. Putting a scheduled job inside one repository means it stops working the moment that repository moves, and putting a project hook at machine scope means it fires on unrelated work.

## Generate the map, never recall it

Placement instructions are derived from the installer's own logic, not written from memory. On 13/08/2026 a hand-written destination map claimed twenty-one hook files when there were twenty, and promised two directories the installer did not populate. Both were caught by generating the map from the installer and comparing. Deriving the map mechanically makes the map and the installer unable to disagree.

## Non-negotiables on every write

Archive before replacing, into `.claude/_archive/<UTC-timestamp>/`. Never delete. Never truncate an append-only file. Merge configuration inside managed block markers only, leaving every key outside them untouched. Verify after writing and show the real output.
