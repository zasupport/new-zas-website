# Agent architecture and where responsibility sits

Three layers. Confusing them causes the wrong fix to be applied to the wrong layer.

**Language Agent.** The model reasoning engine. Parses intent, holds task memory, chooses tools. Controlled by model selection, effort, and extended thinking. It is probabilistic: rules influence it, they do not bind it.

**Local Agent.** The client-side runtime on this machine. Performs file operations, reads code, runs system commands. Controlled by permissions, sandbox, and tool availability. This is where deny rules take effect.

**Harness.** Claude Code itself. Runs the loop of gather context, take action, verify results. Enforces permission boundaries, dispatches tools, streams status. Hooks live here, at roughly thirty lifecycle events. This is the only layer that is deterministic.

The routing rule: if a requirement must hold every time, implement it in the harness or the local agent, never as an instruction to the language agent. If it needs judgement, it belongs to the language agent as a rule. Anything machine-evaluable that says NEVER or ALWAYS is a guardrail, not a rule.
