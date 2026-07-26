# Project instructions index


## Search indexing

- **robots-index-guard** — `tools/robots/README.md`, command `/robots-index`
  Read before any change to a robots source, `next.config` headers, or the sitemap.
  Enforces: a URL already in Google's index must never be disallowed in robots.txt,
  because a blocked crawler cannot read a noindex rule.
  Run `npm run robots:preflight` and `npm run robots:test` before committing such a change.
