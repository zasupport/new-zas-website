# URL integrity

The approved public page origin is `https://zasupport.com`. Canonical URLs,
Open Graph page URLs, sitemap locations and site-owned structured-data identities
must use that origin. Relative internal navigation links are valid. Third-party
citations, social profiles, schema vocabularies and normal framework resources
must not be indiscriminately rewritten or removed.

## Commands

- `npm run check:urls`: source inventory and verifier controls.
- `npm run build && npm run check:urls-rendered`: inspect every sitemap page's built HTML.
- `npm run monitor:urls`: read-only all-path live audit, including linked orphans,
  explicit redirects, and all four HTTP/HTTPS and www/non-www variants.
- `python3 scripts/url-integrity.py crawl --alerted-path /path --output .reliability/unique-report.json`:
  investigate an additional public path. Private operational routes are excluded.
- `python3 scripts/url-integrity.py sanitize --input private-report.md --output outward-report.md`:
  redact deployment links into a new report, preserving the raw original.

The scanner writes timestamped, SHA-bound JSON evidence under the ignored
`.reliability` directory. Missing data, network failures, empty sitemaps and
redirect loops fail closed. Output files are never overwritten. No command
changes production, submits URLs to Google, changes DNS, or publishes reports.

## Acceptance rules

Each indexable HTML page requires exactly one self-referential absolute canonical
in the HTML head and one matching Open Graph page URL. Site-owned schema entities
use the approved origin, but organization, author and breadcrumb-parent paths
must retain their own identities. Images are assets, not page identities.
Non-indexable search pages keep their noindex and their own canonical rather
than inheriting the homepage identity.

The public www host is consolidated with a permanent 308 redirect. Retired-path
and www-host redirects are combined when both are handled by the application.
Both 301 and 308 are acceptable permanent signals. Single-hop host consolidation
is a project quality requirement, not a universal Google rule. Upstream HTTP-to-HTTPS
redirects may occur before application code; any resulting extra hop remains an
open infrastructure finding until independently verified after an approved edge change.

Preview HTML and metadata endpoints receive a host-bound X-Robots-Tag noindex
header. Production hosts are exempt regardless of build environment, so promoting
a preview build cannot carry an environment-based noindex to production.
Keep Deployment Protection enabled. Do not use a blanket robots disallow as a
substitute for noindex; crawlers must be able to read noindex when public access
is intended. This change does not alter production robots crawling rules.

## Release and reporting

Use an isolated branch and record the exact origin/main SHA plus scoped diff.
Source tests, local rendered tests, preview deployment, authenticated preview
verification, production deployment, public live behavior and Google indexation
are separate states. Never promote from build success alone.

Before delivering any code/report, run three reviews and apply improvements:
coverage and source truth; actual behavior and negative controls; independent
regression, propagation, unresolved gaps and approval boundaries. A written rule
alone does not prove execution or global enforcement in other agent installations.

Public reports redact preview links rather than substituting the production
origin, which would falsely imply live proof. Keep original deployment identities
in restricted evidence, not in public report artifacts.

## Primary guidance

Google recommends consistent canonical signals and absolute canonical URLs:
[canonicalization guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).
Google must crawl a URL to read its noindex signal:
[noindex guidance](https://developers.google.com/search/docs/crawling-indexing/block-indexing).
These checks do not certify all Google policies or guarantee indexing.
