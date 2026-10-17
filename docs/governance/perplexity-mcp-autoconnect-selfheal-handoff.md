---
kind: claude-code-native-automation-handoff
title: Perplexity MCP auto-connect + self-heal
owner: Claude Code (local, zero external-credit runtime)
created_utc: 20260921T071800Z
status: LIVE-VERIFIED
rules: [§842, §627, §638, §653, §514, §381, §788, §917, persistence-mandate, remote-shell-launchd-boundary]
---

# Perplexity MCP — auto-connect to the website project session, self-healing

## What this does
Makes the live Perplexity MCP server auto-connect in the `new-zas-website` project session —
and in home-scope and headless/launchd sessions — at any point in time, and repairs its own
drift with no remote assistant session in the runtime loop.

## The design (why it survives "at any point in time")
- **Key at the launch chokepoint, not `.zshrc`.** `.zshrc:123` sources `~/.za-keys-pending.env`
  for INTERACTIVE shells only. launchd/headless spawns source nothing, so `${PERPLEXITY_API_KEY}`
  in `.mcp.json` would resolve empty and the MCP would fail SILENTLY. Fix: the durable and headless
  launchers (`za-claude-launch-durable.sh`, `za-headless-spawn.sh`) now source the keyfile before
  launching `claude`, so every path inherits the key.
- **Secret out of plaintext.** Key moved from `~/.claude.json` (was 1 plaintext `pplx-`, now 0) into
  chmod-600 `~/.za-keys-pending.env`. Both the project `.mcp.json` and the home-scope
  `~/.claude.json` entry reference `${PERPLEXITY_API_KEY}`. A literal key in `.mcp.json` would be
  gitleaks-blocked by the committed secret gate anyway (§917).
- **Trust pre-set.** `enabledMcpjsonServers: ["perplexity"]` on the project so it auto-connects with
  no interactive prompt.

## Files
| Path | Role |
|---|---|
| `~/Developer/new-zas-website/.mcp.json` | Project MCP wiring, `${PERPLEXITY_API_KEY}` (committed) |
| `~/.za-keys-pending.env` | Key (chmod 600, not in repo), sourced by chokepoints |
| `~/bin/za-claude-launch-durable.sh`, `~/bin/za-headless-spawn.sh` | Chokepoints, source the keyfile |
| `~/bin/za-perplexity-mcp-selfheal.sh` | SoT healer: `--check\|--heal\|--probe\|--report\|--watch\|--test` |
| `~/bin/za-perplexity-mcp-selfheal.test.sh` | Five-control harness |
| `~/Library/LaunchAgents/com.zasupport.perplexityMcpSelfheal.plist` | RunAtLoad + 1800s heal loop |

## Acceptance criteria (all VERIFIED 21/09/2026)
- Project `.mcp.json` real Perplexity call in a headless spawn → **"Paris"** (auth end-to-end).
- Home-scope `${VAR}` expansion real call → **"Tokyo"** (plaintext removal safe, kept).
- Env negative control: bare non-interactive shell → key **ABSENT**; chokepoint source → **PRESENT**.
- `--test` five controls → **9/9 PASS** incl real live probe → LIVE.
- LaunchAgent RunAtLoad → validation.log `check: OK`, last exit 0.
- Self-heal proved on real drift: `enabledMcpjsonServers` clobbered by a nested session → `--heal`
  restored → `--check` ✅ OK on all five dimensions.

## Boundaries / what it will NOT do
- **Cannot fabricate the key.** If `PERPLEXITY_API_KEY` is absent from the keyfile, `--check` exits 2
  CRITICAL + notifies — it never silently passes and never invents a key.
- Routine LaunchAgent runs `--check`/`--heal` only (structural, zero external cost). The real
  Perplexity probe (`--probe` / `--test`) costs a Perplexity API call and is run on demand/weekly.
- `.mcp.json` is strict JSON consumed by the MCP loader; it deliberately carries no
  `CLAUDE-CODE-INJECTION` comment/key (would break the loader). Placement recorded here instead.

## Operate
```
za-perplexity-mcp-selfheal.sh --check     # 3-state OK/DRIFT/CRITICAL
za-perplexity-mcp-selfheal.sh --heal      # repair safe drift
za-perplexity-mcp-selfheal.sh --probe     # real Perplexity call -> LIVE/DEAD
za-perplexity-mcp-selfheal.sh --test      # five controls + live probe
```
