---
paths: ["**/*.py"]
---
# Python quality rules
- Undeclared names (F821) and unused imports block the edit at PostToolUse. Fix them, do not suppress them.
- Style is enforced by `ruff format`. Do not hand-format.
- Security rules (S, bandit) are on. Never hardcode credentials, never build SQL by string concatenation.
- Sanitise every external input at the trust boundary: validate type, length, and range before use. Parameterise all queries.
- Complexity ceiling C901. A function past it gets split, not excused.
- `# noqa` requires a rule code and a reason on the same line.
- Type checking (mypy or pyright) runs at the Stop gate, not per edit, because of latency.
