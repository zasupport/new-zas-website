---
paths: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"]
---
# JavaScript and TypeScript quality rules
- Blocking at PostToolUse: no-undef, no-unreachable, no-unused-vars. Biome is the default for speed.
- Every promise is handled. `@typescript-eslint/no-floating-promises` is type-aware and runs at the Stop gate and in CI, never per edit, because `projectService` adds seconds to every keystroke.
- `tsc --noEmit` runs at the Stop gate. Linters do not type-check.
- Security: eslint-plugin-security is on. No `eval`, no non-literal `require`, no unsanitised input reaching a filesystem path or a regex.
- Sanitise and validate all external input at the boundary before it reaches business logic.
