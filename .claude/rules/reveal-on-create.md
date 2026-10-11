---
claude_code_injection:
  operation: create-new-file
  target_path: .claude/rules/reveal-on-create.md
  permissions: "0644"
  create_parent_dirs: true
  overwrite_if_exists: false
  backup_if_exists: true
  artefact_version: "1.0"
  artefact_created: "2026-08-13T15:30:00+02:00"
  post_install_verify: "test -f .claude/rules/reveal-on-create.md"
  rollback_command: "rm .claude/rules/reveal-on-create.md"
---

# HARD RULE: every created file reveals its own location

Applies always. No `paths:` frontmatter, so this loads in every session.

A file whose location has to be hunted for is not delivered. Every file created for ZA Support reveals its exact location the moment it exists.

## Two mechanisms, both required

**The download path** is handled by a launchd agent (`com.zasupport.reveal`, script `~/bin/za-reveal.sh`, plist `~/Library/LaunchAgents/com.zasupport.reveal.plist`) watching Downloads, Desktop and Documents. On arrival it runs `open -R` on the newest qualifying file, which selects it in Finder without opening it, so nothing executes as a side effect of arriving.

**The script path** is a convention, not an agent, and it is the half that applies to code blocks. Every script, `.command` and terminal command that produces output ends with a reveal as its final action:

```
open -R "$OUTPUT_FILE"        # one file: select it in Finder
open "$OUTPUT_DIR"            # several files: open the containing folder
```

A script that writes a file and then exits silently is incomplete.

## Deliberately narrow

The agent only reveals extensions Claude actually produces: command, sh, py, md, json, zip, pdf, docx, xlsx, html, plist, yml. It ignores images, video, dotfiles, and partial downloads (`.crdownload`, `.part`, `.download`, `.tmp`).

It debounces, so a multi-file download reveals once rather than once per file, and it only considers files newer than 90 seconds so an unrelated filesystem event does not resurface something old.

The narrowness is the point. An agent that opens a Finder window for every downloaded image gets disabled within a day, and a disabled agent protects nothing.

## Tuning and disabling

`ZA_REVEAL_DEBOUNCE` (default 8 seconds), `ZA_REVEAL_MAX_AGE` (default 90 seconds), `ZA_REVEAL_DIRS` (colon-separated). Log at `~/.zas/reveal/reveal.log`. Disable with `launchctl bootout gui/$(id -u)/com.zasupport.reveal`.
