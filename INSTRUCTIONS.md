# Project instructions index


## Search indexing

- **robots-index-guard** — `tools/robots/README.md`, command `/robots-index`
  Read before any change to a robots source, `next.config` headers, or the sitemap.
  Enforces: a URL already in Google's index must never be disallowed in robots.txt,
  because a blocked crawler cannot read a noindex rule.
  Run `npm run robots:preflight` and `npm run robots:test` before committing such a change.

<!-- zas-design-system:start -->
## Design system

- **zas-design-system** — `docs/internal/design-system/V1.2 15h04 27.09.26 ZA Support Website Design System Perplexity Standing Rule.md`
  Read before any change to colours, type, spacing, components, header, footer, or a new page.
  Acceptance checklist in Section 11, change orders CO1 to CO5 in Section 13.
  Run `bash "docs/internal/design-system/zas design drift check.command"` before a design build.
  Chat record, evidence and scripts: `docs/internal/design-system/V1.3 15h50 27.09.26 ZA Support Website Design System Master Handoff.md`
<!-- zas-design-system:end -->
