---
paths: ["**/auth/**", "**/payments/**", "**/migrations/**", "app/api/**", "**/security/**"]
---
# Load-bearing code
This path carries risk that other code does not. A failure here is not a bug, it is an incident.

- The code-reviewer subagent must review before merge. Its review is advisory; the Stop gate is what blocks.
- Higher test coverage is required here than elsewhere. New branches need tests in the same change.
- Migrations are append-only. A downgrade path is written but never executed in production. The PreToolUse guard rewrites `alembic downgrade` to `--sql` so it emits rather than executes.
- Authentication and authorisation changes require an explicit statement of what the change permits that was previously denied.
- Secrets never appear here in literal form, not even in tests. Use fixtures and environment variables.
- Any change here that cannot be reverted by a single revert commit must say so in the change description.
