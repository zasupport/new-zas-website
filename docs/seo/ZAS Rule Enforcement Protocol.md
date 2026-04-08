# ZA Support Rule Enforcement Protocol

**Source:** Feedback Loop V6 deployment gap analysis, 08/04/2026
**Portable:** Usable across Claude Code, Claude.ai web, Claude app, Claude API.

## The Problem

§240 (verify status with real data) was written as text in CLAUDE.md files and marked as "propagated." But no script, LaunchAgent, or hook was built to enforce it. The rule existed as words. Nothing executed it automatically. Courtney had to ask why the deployment verification loop wasn't built.

## The Fix: §244 RULE = RULE + ENFORCEMENT + TEST

Every new Hard Rule must deliver three things in the same response:

1. RULE: text propagated to global CLAUDE.md + all project CLAUDE.md files + MEMORY.md
2. ENFORCEMENT: a script (~/bin/za-*.sh), LaunchAgent (com.zasupport.*), or hook that enforces the rule without human intervention
3. TEST: real-data execution of the enforcement mechanism, stdout captured in validation.log

If any of the three is missing, the HR is not done. Do not mark it complete. Do not move to the next task.

## Related Rules

- §233 TEST-BEFORE-DECLARE: don't claim a status without running it
- §240 STATUS VERIFICATION: every status claim verified by real execution
- §241 UNCERTAIN LOOP: uncertainty triggers test/self-heal/retest loop
- §243 DEPLOYMENT VERIFICATION LOOP: every deployment polls every 10 min until success
- §244 RULE + ENFORCEMENT + TEST: this rule (the meta-rule)

## Enforcement

Script: ~/bin/za-deploy-verify-loop.sh (checks all deployments every 10 min)
LaunchAgent: com.zasupport.deployverify (600s interval)
Feedback memory: memory/feedback_rule_enforcement_gap.md

*ZA Support Rule Enforcement Protocol — 08/04/2026*
