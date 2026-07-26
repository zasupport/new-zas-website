# robots-index-guard v1.3.0

Installed by the /robots-index command file. Corrects the two defects the gap
analysis of 21/07/2026 found in v1.2.0.

| File | Role |
|---|---|
| robots preflight.py | Readiness check, now includes robots.txt structure analysis, run first |
| robots pressure test.py | 29 controls (25 regression + 4 baseline integrity) |
| robots guard.py | The gate. Fails CLOSED on missing, empty or corrupt baseline |
| robots index engine.py | Ten stages. New: bootstrap arms the baseline from the sitemap |
| zero loss.py | Snapshot, verify, restore. No delete path |
| protected urls.json | The guard baseline, armed from the sitemap at install |

Fixes in v1.3.0:
1. Guard fails closed. A missing baseline now blocks commits instead of passing them.
2. bootstrap stage arms the baseline from the live sitemap on day one, independent of
   any patch. The guard is live from the first commit.
3. Baseline is committed to the repo, so a fresh clone or CI runner is never unprotected.
4. Preflight flags the multi-user-agent-group trap, the Host directive, and AI search
   crawlers caught by a broad block.

Run order: bootstrap, pressure test, wiring-audit, preflight, then the pipeline.
