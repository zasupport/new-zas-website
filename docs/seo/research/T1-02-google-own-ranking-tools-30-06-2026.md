# T1 #2 — Google's OWN Ranking Tools & Official Guidance (Primary-Source Layer)

Research date: 30 June 2026
Scope: Authoritative Layer-2 sources only (Google's own tools + Search Central docs). Every claim cites the official Google URL and, where Google dates it, the date. Third-party blogs are excluded by design (§373: Layer 2 wins). Items not directly confirmable from a Google page are marked [UNVERIFIED].

Note on citation dates: Google documents the *policy/feature* date (e.g. "March 2024 spam policies"); the support pages themselves carry a "last updated" stamp that Google moves frequently, so feature/policy dates are cited rather than page-edit dates.

---

## Tool-by-tool

### 1. Google Search Console — Performance report (Search results)
- What it feeds: clicks, impressions, CTR, average position — segmentable by Query, Page, Country, Device, Search Appearance, Date. This is the single most direct ranking-feedback surface Google gives a site owner.
- Official definitions (Google): **Impressions** = how often a link to your site was seen on Google (may require scroll/expand). **Clicks** = how often someone clicked through to your site. **CTR** = clicks ÷ impressions. **Average position** = the topmost position a link to your property occupied, averaged across queries where it appeared (1 = top); a link must get an impression for its position to be recorded.
- How to act: (a) High impressions + low CTR + position 4-15 = title/meta/snippet opportunity (rewrite to win the click, no ranking risk) — this is the ZA "O1 CTR" pattern already in use. (b) Position 5-20 with rising impressions = a page Google is testing; reinforce with content depth + internal links to push onto page 1. (c) Sort by clicks/week × revenue-per-click (§409/§194) to prioritise. (d) Page-level export drives the doorway-prune decision (§529).
- URLs:
  - Impressions/position/clicks defined: https://support.google.com/webmasters/answer/7042828
  - Performance report overview: https://support.google.com/webmasters/answer/7576553
  - Data filtering & limits deep-dive (note the ~1,000-row + 16-month limits, anonymized-query withholding): https://developers.google.com/search/blog/2022/10/performance-data-deep-dive
  - Recent-data (fresher 24h-lag) view: https://developers.google.com/search/blog/2024/12/recent-data-search-console

### 2. GSC — Page Indexing (Coverage) report
- What it feeds: how many URLs Google has crawled and indexed vs excluded, with the reason per excluded bucket (crawled-not-indexed, discovered-not-indexed, duplicate-without-user-canonical, redirect, soft 404, blocked by robots, noindex, etc.). Up to 1,000 example URLs per state.
- How to act: "Crawled – currently not indexed" / "Discovered – currently not indexed" at scale is the classic thin/doorway signal (relevant to §529 prune and §227 helpful-content). "Duplicate, Google chose a different canonical" flags the canonical mismatch §399 guards against. Fix → Validate Fix to request re-evaluation.
- URL: https://support.google.com/webmasters/answer/7440203

### 3. GSC — URL Inspection tool
- What it feeds: Google's indexed version of one URL — index status, last crawl, user-vs-Google-declared canonical, discovered structured data, mobile usability, and a live-test option to check current indexability. Includes "Request indexing".
- How to act: After any page ship/redirect change, inspect the live URL to confirm 200 + indexable + correct canonical + schema detected (composes §346/§401). Use "Test live URL" before "Request indexing" on net-new pages.
- URL: https://support.google.com/webmasters/answer/9012289

### 4. GSC — Core Web Vitals report
- What it feeds: real-user (field/CrUX) LCP, INP, CLS grouped Good / Needs improvement / Poor, split mobile vs desktop, grouped by similar-URL clusters. Only indexed URLs; a sample, not exhaustive.
- How to act: Page experience is a Google-confirmed (modest, tie-breaker) signal. Treat "Poor" URL groups as a fix queue; validate after deploy. Pair with PageSpeed Insights (tool 9) for the per-URL lab diagnostics that explain *why*.
- URLs:
  - Report: https://support.google.com/webmasters/answer/9205520
  - How CWV relates to Search: https://developers.google.com/search/docs/appearance/core-web-vitals

### 5. GSC — Links report
- What it feeds: top linked pages (external), top linking sites, top linking text (anchors), and internal links. A sample, not every link.
- How to act: (a) Internal-links view validates §402 (every sitemap URL ≥1 inbound link; orphan detection). (b) External top-linked-pages shows which pages earned authority — model new content on them. Off-page authority is the lever flagged when rankings plateau 6-8 weeks (§520).
- URL: https://support.google.com/webmasters/answer/9049606

### 6. GSC — Enhancements / rich-result reports
- What it feeds: per-feature validity reports for structured data Google still renders (Breadcrumbs, Merchant/Product, Reviews, Videos, Events, etc.), with error/warning/valid counts. Note: FAQ and HowTo enhancement reports were removed when those features were deprecated (see Schema section).
- How to act: Keep these green for any schema type that still yields a SERP feature. After deploy, cross-check with the Rich Results Test (tool 8). Do NOT expect an FAQ enhancement report any more.
- URL (reports at a glance): https://support.google.com/webmasters/answer/9133276

### 7. Google Business Profile (local ranking — Google-documented factors)
- What it feeds — Google states local results rank mainly on three factors:
  - **Relevance** — "how well a Business Profile matches what someone is searching for"; improved by complete, detailed business info (primary + secondary categories are the strongest relevance lever Google documents).
  - **Distance** — "how far each business is from the customer who's searching" (proximity; cannot be directly controlled, but service-area + accurate address matter).
  - **Prominence** — "how well-known a business is"; based partly on links to your site and on review count + score: "More reviews and positive ratings can help your business's local ranking."
- How to act: (a) Set the most accurate **primary category** — Google-documented #1 local relevance factor (§578 known-state confirms). (b) Complete every field; verify the profile. (c) Drive review velocity + reply to reviews ("Positive reviews and helpful replies can help your business stand out"). (d) Earn links to the site (feeds prominence — same off-page lever as organic). (e) Surface rating as plain text on-site ("Rated 4.9 on Google · N reviews") — self-serving AggregateRating JSON-LD is ineligible/risky (§166).
- URL: https://support.google.com/business/answer/7091
- Performance/insights (calls, direction requests, searches that surfaced you): https://support.google.com/business/answer/9918094

### 8. Rich Results Test
- What it feeds: live or code test of whether a URL's structured data is eligible for a Google rich result, rendering exactly what Google parses. The Schema.org validator (validator.schema.org) checks syntax; the Rich Results Test checks *Google eligibility* — use the Google one for ranking decisions.
- How to act: Post-deploy gate for any schema'd page (§166). If it reports "eligible" for a feature, that feature can render; if no feature listed (e.g. FAQ now), the markup is parsed but yields no SERP enhancement.
- URL (entry): https://developers.google.com/search/docs/appearance/structured-data

### 9. PageSpeed Insights + Lighthouse + CrUX
- What it feeds: PSI combines **field data** (real users, from the Chrome UX Report / CrUX, trailing 28 days, updated daily) and **lab data** (Lighthouse simulated load — Performance/Accessibility/Best-Practices/SEO + actionable diagnostics). CrUX is the same real-user dataset behind the GSC CWV report; BigQuery CrUX is origin-level monthly.
- Core Web Vitals thresholds ("Good"): **LCP ≤ 2.5 s**, **INP ≤ 200 ms** (INP replaced FID as a Core Web Vital on 12 March 2024), **CLS ≤ 0.1**. An origin/page passes when the **75th percentile** of all three is Good (if INP data insufficient, passes on LCP + CLS).
- How to act: Field data = the ranking-relevant truth (matches what GSC/Google uses); lab data = the diagnostic that tells you what to fix. Fix Poor field metrics, re-measure (§530 measured loop).
- URLs:
  - About PSI (field vs lab): https://developers.google.com/speed/docs/insights/v5/about
  - CWV tooling workflow: https://web.dev/articles/vitals-tools
  - INP definition/threshold: https://web.dev/articles/inp

### 10. Google Trends
- What it feeds: **relative** search interest (0-100 normalised, sampled, anonymised, by geography + time), trending queries, related/rising queries, regional breakdown. It is a *demand/seasonality/topic-discovery* input, NOT a direct ranking signal and NOT absolute volume.
- How to act: Validate that a keyword has real, rising ZA demand before committing content (§366/§428 real-data keyword validation, avoids [INFERRED] topics); time content to seasonality (§518 — e.g. pre-holiday capture). Never read Trends as ranking position or absolute volume.
- URLs:
  - How the data works (normalisation/sampling): https://support.google.com/trends/answer/4365533
  - Get started: https://support.google.com/trends/answer/6248105

### 11. GA4 (engagement/conversion signals for SEO decisions)
- What it feeds (Google-defined): **Engaged session** = a session lasting ≥10 s, OR with ≥1 key event, OR with ≥2 page/screen views. **Engagement rate** = engaged sessions ÷ total sessions. **Key events** = events you mark as important (replaced "conversions" terminology inside GA4; a GA4 key event can become a Google Ads conversion). Sessions = traffic volume; engagement rate = traffic quality.
- The **Google organic search traffic report** is a pre-made GA4 report that joins Search Console metrics (clicks/impressions/position) with GA4 landing-page behaviour — requires the GSC↔GA4 link.
- How to act: This is the missing half of the §520/ranking-intel lever — pages that rank page-1 but convert 0 leads are a **CTA/landing problem, not a ranking problem**. Use GA4 engagement rate + key-event (booking/contact) per landing page to find high-rank/low-conversion pages and fix the page, not the ranking. Mark booking + contact form submits as key events.
- URLs:
  - Engagement rate vs bounce: https://support.google.com/analytics/answer/12195621
  - Conversions vs key events: https://support.google.com/analytics/answer/13965727
  - Key events: https://support.google.com/analytics/answer/9267568
  - GA4 organic search report: https://support.google.com/analytics/answer/13682863
  - Using GSC + GA together for SEO: https://developers.google.com/search/docs/monitor-debug/google-analytics-search-console

---

## Current Google spam / helpful-content policy state — 2026 (cited)

### Helpful content = now part of core ranking (not a separate system)
- The standalone "Helpful Content System" was folded **into Google's core ranking systems** with the **March 2024 core update**. There is no separate helpful-content classifier any more; "helpfulness" is assessed by multiple core signals.
- Guidance is the self-assessment **"Who / How / Why"** framework + **E-E-A-T** (Experience added to E-A-T, Dec 2022): demonstrate first-hand experience, expertise, authority, trust. People-first, not search-engine-first.
- Action for ZA: the §171 six AI-mitigation signals (first-person workshop experience, specific technical/model detail, local SA context, varied rhythm, concrete numbers, genuine opinion) map directly onto "Who/How/Why" + Experience. Keep enforcing.
- URLs:
  - Creating helpful, reliable, people-first content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
  - Core updates (incl. helpful-content folded in, traffic-drop self-assessment): https://developers.google.com/search/docs/appearance/core-updates
  - E-E-A-T (extra E): https://developers.google.com/search/blog/2022/12/google-raters-guidelines-e-e-a-t
  - March 2024 core update + new spam policies: https://developers.google.com/search/blog/2024/03/core-update-spam-policies

### Spam policies (the named ones that matter to a content site)
- **Scaled content abuse** (named policy, March 2024): "many pages generated for the primary purpose of manipulating search rankings and not helping users… large amounts of unoriginal content that provides little to no value, **no matter how it's created**" (covers AI, human, or hybrid). This is the direct constraint on blog-velocity (§229) and doorway permutations (§529) — volume without genuine per-page value is the violation.
- **Site reputation abuse** ("parasite SEO", March 2024; enforcement update Nov 2024; **language clarified 21 Jan 2025**): third-party pages published to exploit a host's ranking signals with little first-party value — now a violation **regardless of first-party oversight**.
- **Expired domain abuse** (March 2024): buying expired domains to boost thin content.
- Enforcement: violations → rank lower or be removed; manual actions notified in Search Console with a reconsideration path.
- URLs:
  - Spam policies (full, current): https://developers.google.com/search/docs/essentials/spam-policies
  - Site reputation abuse update: https://developers.google.com/search/blog/2024/11/site-reputation-abuse
  - March 2024 announcement: https://developers.google.com/search/blog/2024/03/core-update-spam-policies

### Ranking systems Google publicly names (the guide)
- Core systems include BERT, MUM, neural matching, RankBrain, plus the **Reviews system** (rewards in-depth, first-hand expert review content over thin summaries), passage ranking, and page-experience signals. Useful for understanding *what* the core update assesses.
- URLs:
  - Guide to ranking systems: https://developers.google.com/search/docs/appearance/ranking-systems-guide
  - Reviews system: https://developers.google.com/search/updates/reviews-update
  - Live ranking-update log (watch for core updates): https://developers.google.com/search/updates/ranking

---

## Schema currently ELIGIBLE for rich results — 2026

Source of truth — Google's structured-data **search gallery** (the definitive list of features that still render): https://developers.google.com/search/docs/appearance/structured-data/search-gallery

Currently supported feature types (gallery, 30 Jun 2026): Article · Breadcrumb · Carousel · Course (list/info) · Dataset · Discussion forum · Education Q&A · Employer aggregate rating · Event · Image metadata · Job posting · **Local business** · Math solver · Movie · Organization · Product (incl. merchant listing) · Profile page · Q&A · Recipe · **Review snippet** · Software app · Speakable · Subscription/paywalled content · Vacation rental · Video.

What this means for ZA (relevant types only):
- **Breadcrumb** — ELIGIBLE. Renders on **desktop only** (truncated on mobile, per Google's feature-availability note). Keep BreadcrumbList on every page below home (§166). URL: https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
- **Article** (Article / BlogPosting / NewsArticle) — supported for blog posts; helps Google understand authorship/dates (author, datePublished, dateModified, headline, image). Keep on blog. URL: https://developers.google.com/search/docs/appearance/structured-data/article
- **LocalBusiness** + **Organization** — the correct markup for ZA's business identity (hours, address, contact). This is where business info belongs, NOT self-serving review markup. URL via gallery.
- **Review snippet / AggregateRating** — eligible **only** when the reviews are about a reviewed item and are not self-serving. Google rules **self-collected reviews about your own LocalBusiness/Organization ineligible** for star results and a manual-action risk — keep rating as plain text only (§166). General policy: https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- **FAQPage — NO LONGER A RICH RESULT.** Restricted to "well-known, authoritative government and health websites" by **14 Sept 2023**, then **fully deprecated: stopped showing 7 May 2026** (changelog note 8 May 2026; docs confirm 15 Jun 2026 "no longer shown in Google Search results"). Keeping FAQPage schema + the FAQAccordion component is fine for on-page UX/value, but expect **zero** SERP FAQ enhancement and no GSC FAQ report (§165 is now a UX/value decision, not a rich-result one — Courtney's call per §578). URL: https://developers.google.com/search/docs/appearance/structured-data/faqpage
- **HowTo — also deprecated** (announced Aug 2023, removed). Do not rely on it. URL: https://developers.google.com/search/blog/2023/08/howto-faq-changes
- **"Service" schema** — there is **no dedicated "Service" rich result** in Google's gallery. ServiceSchema/Service is valid Schema.org and aids Google's understanding, but it does **not** by itself produce a SERP enhancement. Don't expect a rich result from it; value is comprehension + entity clarity, and the business-level result comes from LocalBusiness. [Confirmed by absence from the gallery list above.]

General eligibility rule (Google): structured data must not violate the structured-data content/quality policies, must reflect visible page content, and must not be misleading — or the page loses rich-result eligibility / risks a manual action. URL: https://developers.google.com/search/docs/appearance/structured-data/sd-policies

---

## Google signals we should ADD to the daily stack

Ranked by forward value (§407). Items already in our stack are noted so the gap is clear.

1. **GA4 engagement-rate + key-event (booking/contact) per organic landing page** — HIGHEST VALUE GAP. We track GSC rankings well; we do not systematically join them to GA4 conversion behaviour. This is the lever to find page-1 / zero-lead pages (fix CTA, not ranking — §520/ranking-intel). Requires GSC↔GA4 link + booking/contact marked as key events. Source: GA4 organic search report + engagement rate (above).
2. **GSC Page Indexing "crawled/discovered – not indexed" daily delta** — direct, early signal of thin/doorway content Google is rejecting (feeds §529 prune + §227). We monitor sitemap 200s (§401) but not the indexed-vs-excluded reason buckets as a trend (§530 measured loop).
3. **GSC Core Web Vitals field report (mobile) + PSI 75th-percentile pass/fail per template** — page-experience is a confirmed tie-breaker; track as a measured loop, not one-off (§530). Thresholds: LCP ≤2.5s / INP ≤200ms / CLS ≤0.1.
4. **GBP primary-category audit + review-velocity + review-reply rate** — Google's documented #1 local relevance factor + prominence. Confirm primary category is the highest-revenue service term; track weekly review count/score as a first-party time series (§194/§481 reciprocate responsiveness).
5. **GSC Links report — internal-link orphan + external top-linked-pages** — validates §402 (no orphans) and surfaces the off-page-authority lever for plateaued pages (§520). Pull on a schedule, not ad hoc.
6. **Search Central ranking-update log + spam-policy page watch** — biweekly (already §578 za-google-ranking-watch.sh). Keep; it caught the FAQ deprecation and the scaled-content-abuse naming. Add the structured-data **search gallery** to the watch so any further feature deprecation (next FAQ-style surprise) is caught early.
7. **Rich Results Test as a post-deploy gate for still-eligible schema only** (Breadcrumb, Article, LocalBusiness, Product/Review-where-eligible) — drop any expectation of FAQ/HowTo output.

---

### Reconciliation note for existing ZA rules (surfaced, not actioned — read-only task)
- §165 FAQ mandate and §166 "FAQPage schema every page" predate the **full** FAQ deprecation (7 May 2026). FAQAccordion still has on-page/UX value, but the *rich-result* rationale is now void. This is Courtney's call (§384/§578) — flagged here, not changed.
- §171/§227/§229/§529 already align tightly with the current "scaled content abuse" + helpful-content-in-core reality. No conflict found; the named policy simply makes the per-page-value requirement enforceable.

Sources are inline above as official Google URLs.
