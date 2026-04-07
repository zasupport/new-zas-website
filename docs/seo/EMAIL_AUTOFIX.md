# ZA Support — Email Auto-Fix

## Behaviour

- Runs at login + 7pm daily
- Sources MS_GRAPH_REFRESH_TOKEN from ~/.za-keys-pending.env
- Persists to .zshrc
- Validates against Graph API
- SUCCESS: self-removes LaunchAgent permanently
- FAIL: opens failure report in browser at 7pm

## Manual override

```bash
bash ~/Developer/new-zas-website/scripts/za_email_autofix.sh
```

## Check status

```bash
cat ~/.za-email-fix.log
ls ~/.za-email-fix.resolved
```
