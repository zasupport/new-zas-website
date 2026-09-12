# Capability Registry

Live status of every tool, connector and data source the programme depends on. Status labels per
handoff §18. **No capability may be called "unavailable" while its status is
`UNKNOWN_NOT_CHECKED`.** Re-verify at the start of each session; a status here is a snapshot.

**Snapshot taken:** 12 September 2026, 11h39 SAST (session 95d83018).

| Capability | Purpose | Status | Evidence (this session) |
|---|---|---|---|
| Live site (zasupport.com) | Production verification | `VERIFIED_AVAILABLE` | `curl /` -> 200; `/search?q=` -> 200 (48 KB); `/sitemap.xml` -> 200 (155 KB) |
| Git repo / working tree | Source of truth for code | `VERIFIED_AVAILABLE` | `git log`, branch `seo/organic-growth-infra` |
| Search index (build-time) | Keyless onsite search | `VERIFIED_AVAILABLE` | `public/search-index.json` present, 838 entries |
| Production `/api/search` | Legacy search backend | `VERIFIED_UNAVAILABLE` (drift) | live -> HTTP 500 "invalid argument" (old CSE proxy still deployed; keyless rewrite in-branch, undeployed) |
| Google Search Console (MCP) | Ranking / query data | `AVAILABLE_FAILED_RETRYING` | MCP `google-search-console` CONNECTION_CLOSED this session |
| Google Analytics (MCP) | Conversion / traffic data | `AVAILABLE_FAILED_RETRYING` | MCP `google-analytics` CONNECTION_CLOSED this session |
| GSC page export (CSV) | Historic ranking snapshots | `VERIFIED_UNAVAILABLE` | ran `za-gsc-page-export.py --export` this session -> FAILED: "google-auth / api-client not installed"; CSV mtime unchanged (Sep 1). Blocker is a missing Python dependency, not (only) auth. |
| Sanity CMS (MCP) | Content source | `AVAILABLE_FAILED_RETRYING` | MCP `sanity` CONNECTION_CLOSED this session |
| Cloudflare (MCP) | DNS / edge | `AVAILABLE_FAILED_RETRYING` | MCP `cloudflare` CONNECTION_CLOSED this session |
| Brave Search (MCP) | Web research | `AVAILABLE_FAILED_RETRYING` | MCP `brave-search` CONNECTION_CLOSED this session |
| Microsoft 365 / Outlook (MCP) | GBP-email intelligence (§9.4) | `AVAILABLE_REQUIRES_AUTH` | tools present, not yet invoked this session |
| Vercel (MCP) | Deployment state / logs | `AVAILABLE_REQUIRES_AUTH` | tools present, not yet invoked this session |
| Google Business Profile | Reviews, local performance | `UNKNOWN_NOT_CHECKED` | no working connector confirmed this session; needs live audit (§9.2) |
| GA4 direct | Conversion funnel | `UNKNOWN_NOT_CHECKED` | not checked this session |
| Local LLM (Ollama) | Redacted local analysis | `VERIFIED_AVAILABLE` | `qwen2.5-coder:14b` resident, 100% GPU |
| WebFetch / WebSearch | Public research | `AVAILABLE_REQUIRES_CONFIRMATION` | deferred tools, not yet invoked |

## Data-dependent work currently blocked

Cannibalisation (§8), opportunity analysis, and GBP / analytics performance attribution (§9, §10)
cannot run on real data until a fresh GSC export is available. Analysis on stale data is prohibited
(§0.6). **Two independent blockers, both confirmed this session:** (1) the GSC/GA MCP connectors
returned CONNECTION_CLOSED; (2) the local `za-gsc-page-export.py` fell over on a missing Python
dependency (`google-auth`, `google-api-python-client`). Next step to try: install those libs
(`pip install google-auth google-api-python-client google-auth-oauthlib`) and re-run the export; if
it then fails on credentials, that is the point at which owner re-auth is genuinely required.

## Re-verification procedure

Before declaring any capability above unavailable, attempt the required invocation. If it was used
successfully earlier in the same conversation, treat it as available unless current output proves
otherwise (§0.6).
