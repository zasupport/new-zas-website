# HARD RULE: persistence for compounded intelligence

Applies always. Any rule, aggregated feature, or compounded-intelligence capability must ship with persistence proven, not assumed.

A feature compounds intelligence when its value comes from accumulation across sessions: telemetry, evals, lessons, patterns, decisions, baselines, failure history. For every such feature, four things are mandatory.

1. **An append-only sink.** A named file that is appended to and never truncated or rewritten. Rotation moves a full file aside under a timestamp; it never deletes.
2. **A launch agent.** A launchd job that runs the accumulation on a schedule, so compounding does not depend on anyone remembering to invoke it.
3. **A watchdog that proves it.** `persistence-watchdog.sh` checks growth against the last checkpoint, freshness against a configured ceiling, and integrity (parseable and monotonic). Existence is not proof; a file that stopped growing three weeks ago looks identical to a healthy one.
4. **Self-healing.** A stalled agent is kickstarted, a missing artefact is initialised, a corrupt checkpoint is rebuilt from the artefact. Reporting the same fault forever is not monitoring.

## Deciding whether an item requires persistence

Ask `escalation-gate.py --should-persist "<item>"`. It answers from local rules first. Measurement streams, lessons, decision records, governing rules, baselines, and failure history all persist. One-off questions, explicitly transient work, and cosmetic changes do not.

When no rule matches, the default is **persist**, because losing compounded intelligence costs more than storing something that turns out unnecessary. A low-confidence default is flagged as an escalation candidate rather than presented as certainty.

## Escalating to Anthropic models

The local layer may not reach for a paid frontier model on impulse. Five gates must all pass, and the gate refuses by default.

Necessity, meaning the local advisor declined or the task is architectural, irreversible, security-critical, or cross-cutting. Competence, meaning the eval history shows the local route is genuinely unreliable for this class, so escalation is evidence-based rather than reflexive. Budget, against a configured ceiling over a rolling period. Credential, present in a service-only environment file and never a shell profile. Consent, given explicitly for that run, because money is being spent.

Every decision is logged, refusals included, so the escalation history is auditable. The default posture is PREPARE, never CALL.
