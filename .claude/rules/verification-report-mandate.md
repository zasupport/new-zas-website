---
claude_code_injection:
  operation: create-new-file
  target_path: .claude/rules/verification-report-mandate.md
  permissions: "0644"
  create_parent_dirs: true
  overwrite_if_exists: false
  backup_if_exists: true
  artefact_version: "1.0"
  artefact_created: "2026-08-13T16:00:00+02:00"
  post_install_verify: "test -f .claude/rules/verification-report-mandate.md"
  rollback_command: "rm .claude/rules/verification-report-mandate.md"
---

# HARD RULE: terminal code that creates data must prove it worked

Applies always. Non-negotiable.

Any terminal code generated for ZA Support that creates or modifies data must contain three things, not one. Shipping only the first is incomplete.

**Install.** The code places its artefacts at their declared paths, archiving anything it replaces.

**Test with real data.** Not fixtures alone. The code exercises itself against actual files on the machine it just installed to, because a fixture proves the code runs and real data proves it works here.

**Report.** The code writes a single self-contained file that can be uploaded to claude.ai for analysis. Without it, verification depends on the user pasting terminal output back, which loses formatting, truncates, and hides errors inside grep filters.

## What the report must contain

The verdict first, because that is what gets read. Then the machine context, so a reader knows what was actually tested: OS, model, memory, tool versions, and explicitly which tools were absent. Then the control results with the command that produced them. Then real-data evidence, not just fixture results. Then the limitations, stated rather than omitted.

A tool reported absent means the controls needing it are **unvalidated**, never passed. A report that cannot distinguish those two states is worse than no report, because it manufactures false confidence.

## Format

Markdown with YAML frontmatter at line 1, so claude.ai can classify it on upload. Written to `.claude/reports/` with a `DD.MM.YYYY HHMM` stamp in the filename. Revealed in Finder on completion per the reveal-on-create rule.

## Canonical implementation

`.claude/hooks/report.sh`. Run it any time with `bash .claude/hooks/report.sh`. It is also the final phase of the main installer, so every install ends with evidence rather than an assertion.
