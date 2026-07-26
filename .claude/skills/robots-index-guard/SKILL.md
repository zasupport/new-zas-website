---
name: robots-index-guard
description: Fires on any change to a robots source, any Search Console index coverage question, and any phrase such as robots.txt, Disallow, noindex, indexed though blocked, deindex, crawl budget, sitemap change, page not indexed, or blocked by robots. Enforces the rule that a URL already in Google's index must never be disallowed in robots.txt, because a blocked crawler cannot read a noindex rule and the URL then stays indexed permanently with no exit. Requires the baseline to be armed from the sitemap, the pressure test and guard to pass before any robots change is committed, and the independent verifier to confirm a verdict before it is applied. Points to the engine at tools/robots in the site repository.
---

## When this fires

Any edit to `app/robots.ts`, `src/app/robots.ts`, `public/robots.txt` or `next.config`
headers. Any question about why a page is or is not indexed. Any Search Console coverage
report. Any request to hide, remove, block or deindex a page.

## The rule that must not be broken

robots.txt controls crawling, not indexing. A noindex rule is only read if the URL is
crawlable. Blocking an already indexed URL in robots.txt locks it into the index because
Googlebot never reaches the noindex.

To remove a URL from the index you unblock it in robots.txt and give it a noindex signal,
or you return 410, or you put it behind authentication. Never disallow and noindex together.

## What to do, in order

1. `cd "$(git rev-parse --show-toplevel)/tools/robots" && source .venv/bin/activate`
2. `python3 "robots index engine.py" bootstrap` arms the guard baseline from the sitemap.
   The guard fails closed without it, so this must run before any robots change.
3. `python3 "robots preflight.py"` must exit 0. It changes nothing and names what is missing.
4. `python3 "robots pressure test.py"` must exit 0. 29 controls, including baseline integrity.
5. `python3 "robots index engine.py" wiring-audit` must show every hook point wired.
6. For a coverage issue: `discover`, `inspect`, `adjudicate`, `verify-independent`,
   `patch --dry-run`, then `patch`, then `verify`.
7. Never pass `--skip-verification` unless a person has explicitly asked for it.
8. Never `--push`. A person merges.

## Stop conditions

Stop and ask a person if the pressure test fails, if the guard reports a missing or empty
baseline (run bootstrap), if the wiring audit reports a missing hook point, if the verifier
rejects or disputes a verdict, or if a verdict touches a page carrying client or patient
information.
