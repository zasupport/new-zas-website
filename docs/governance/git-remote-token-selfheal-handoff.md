---
kind: claude-code-native-automation-handoff
title: Git remote embedded-token failure — permanent fix + self-heal
owner: Claude Code (local, zero external-credit runtime)
created_utc: 20260921T081500Z
status: LIVE-VERIFIED
rules: [§627, §635, §585, §789, §514, §630, §381, persistence-mandate, testing-controls]
---

# Git push failure from a stale token embedded in a remote URL — permanent fix

## The failure
`~/za-support-diagnostics` could not push to `origin`
(`github.com/zasupport/za-diagnostic-v3-engine`): the classic `ghp_` token hard-coded into the
remote URL was dead ("Authentication failed"). Token-in-URL is also a plaintext secret exposure.

## Three-part permanent fix
1. **De-tokenise now (immediate).** za-diag `origin` rewritten to the clean URL
   `https://github.com/zasupport/za-diagnostic-v3-engine.git`; the osxkeychain credential
   (username zasupport, valid to 2026-12-06) authenticates. Config backed up first.
2. **Chokepoint fix (root cause).** `~/bin/za-rotate-zasupportbackup-pat.sh` was re-embedding the
   PAT into `backup` remote URLs on every rotation (line 86). Changed to: store the new PAT in the
   keychain BEFORE the loop, then set a CLEAN `https://<user>@host/path` URL — no embedded secret
   ever written again. (za-diag `origin` embedder was never identified; the guard below is the net
   that makes it self-healing regardless of source — not "root cause eliminated" for origin.)
3. **Self-heal guard (safety net).** `~/bin/za-git-remote-token-selfheal.sh` + LaunchAgent
   `com.zasupport.gitRemoteTokenSelfheal` (RunAtLoad + hourly). Scans all repos (find -maxdepth 4,
   same discovery as the rotation script), strips any embedded-token remote to a clean URL — but
   only after a keychain auth probe to the clean URL SUCCEEDS (fail-safe: never removes the only
   working credential; a dead token with no keychain fallback is left in place and escalated).

## Data-driven proof (all captured 21/09/2026)
- za-diag origin embedded tokens: **0**; `git ls-remote origin` exit 0; `push --dry-run` → "Everything up-to-date" (real auth).
- Machine-wide embedded-token sweep (`find ~ -path '*/.git/config'`): **0** anywhere.
- Guard `--test`: **8/8 PASS** incl the fail-safe (dead+no-cred → CRITICAL exit 2, token NOT stripped).
- Launchd-env auth (advisor Gap 1): `env -i HOME PATH=/usr/bin:/bin git ls-remote` → **exit 0** (heal path authenticates under launchd — EVIDENCED, not assumed).
- Guard `--check` machine-wide: **OK** in 2.8s; RunAtLoad fired (validation.log `check: OK`).
- Rotation chokepoint: embedded-token `set-url` count = **0**.

## Boundaries / honest limits
- The **origin** embedder source is unknown; the guard re-strips regardless of source (that is the
  permanent mechanism), rather than a proven root-cause elimination for origin.
- Fail-safe means a genuinely dead token with no keychain fallback is NOT auto-stripped (would
  break push) — it escalates (CRITICAL + notification) for a human to supply a working credential.
- The stripped dead `ghp_` remains inside each `.git/config.pre-detokenise-*.bak` (rollback copy).
  Dead/revoked-equivalent (auth fails), low risk; purge after the fix is confirmed stable.

## Operate
```
za-git-remote-token-selfheal.sh --check    # 3-state OK/DRIFT/CRITICAL, machine-wide
za-git-remote-token-selfheal.sh --heal     # strip embedded tokens (fail-safe gated)
za-git-remote-token-selfheal.sh --list     # embedded-token remotes (redacted)
za-git-remote-token-selfheal.sh --test     # five controls
```
