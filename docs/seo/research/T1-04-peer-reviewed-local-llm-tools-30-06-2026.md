# T1 #4 — Peer-Reviewed, Open-Source and Local-LLM Tools to Enhance Ranking Opportunities

Research date: 30 June 2026
Scope: third-party verified / peer-reviewed / local-LLM / open-source tools that augment SEO WITHOUT paid SaaS where possible, runnable locally (the user runs Ollama models such as qwen2.5-coder).
Constraint: read-only research. No code or site files changed.

Citation policy: every claim carries URL + publisher + date where confirmable. Items I could not independently confirm from a primary source are marked [UNVERIFIED]. Several of the "best open source SEO tools" round-up articles below are commercial blogs (marketing content); they are cited as pointers to the named tools, not as authorities on ranking. Where a tool has a primary home (GitHub / PyPI / vendor docs) that primary source is preferred.

---

## Open-source / free tools

Each entry: purpose, URL, and a SAFE vs RISKY verdict against Google's spam/Terms guidance.

### Crawling, technical audit and on-page QA

- **LibreCrawl** — Free, open-source desktop SEO crawler (unlimited URLs, JS rendering, internal/external link relationship mapping, metadata extraction). Direct Screaming Frog alternative for technical audits and internal-link analysis.
  URL: https://github.com/PhialsBasement/LibreCrawl and https://librecrawl.com/ (project site). [UNVERIFIED on maturity/stability — verify the repo's last-commit date and open issues before relying on it.]
  Verdict: **SAFE** — crawls your OWN site; no Google ToS exposure. Respect robots/rate limits on any third-party site you point it at.

- **Screaming Frog SEO Spider (Free tier)** — Industry-standard desktop crawler; free tier capped at 500 URLs. Strong for schema extraction, redirect/canonical audits, title/meta/H1 checks, and PageSpeed/Lighthouse integration.
  URL: https://www.screamingfrog.co.uk/seo-spider/ (Screaming Frog, ongoing).
  Verdict: **SAFE** — closed-source but free tier; your-site audits only.

- **SEOnaut** — Open-source technical SEO auditor focused on crawlability and indexing issues (self-hostable web app).
  URL: referenced in round-ups (e.g. https://seojuice.com/blog/top-open-source-tools-for-seo/, SEOJuice blog, 2026). Primary repo: search "SEOnaut" on GitHub to confirm. [UNVERIFIED — confirm repo + licence.]
  Verdict: **SAFE** — own-site auditing.

- **Greenflare** — Open-source, lightweight technical SEO crawler aimed at fast large-scale site audits (Python-based desktop app).
  URL: named in https://ranksaver.com/blog/open-source-seo-tools (RankSaver blog, 2026). Primary repo: GitHub "greenflare". [UNVERIFIED — confirm repo + licence.]
  Verdict: **SAFE** — own-site auditing.

- **SEO Reporter (CLI)** — TypeScript CLI that crawls a site, runs 220+ technical SEO checks, and emits HTML/CSV reports.
  URL: referenced in https://prerender.io/blog/screaming-frog-alternative/ (Prerender blog, 2026). [UNVERIFIED — confirm repo.]
  Verdict: **SAFE** — own-site auditing, scriptable into CI.

### Performance / Core Web Vitals (highest-confidence, first-party Google tooling)

- **Lighthouse + Lighthouse CI** — Google's open-source page-quality auditor (performance, accessibility, best practices, SEO basics) and its CI harness for asserting score budgets on every deploy. NOTE: Lighthouse is a PAGE tool, not a site crawler or content-strategy engine. Pair it with a crawler.
  URL: https://github.com/GoogleChrome/lighthouse and https://github.com/GoogleChrome/lighthouse-ci (Google Chrome team, ongoing).
  Verdict: **SAFE** — Google's own tool; ideal as a deploy gate. (This project already references PSI/Lighthouse in its W-session checklist.)

- **PageSpeed Insights / CrUX** — first-party field + lab data.
  URL: https://developers.google.com/speed/docs/insights/v5/about (Google, ongoing).
  Verdict: **SAFE**.

### Log-file analysis (crawl-budget / Googlebot behaviour)

- **GoAccess** — Real-time, open-source CLI log analyser. Parses server access logs to show how Googlebot crawls the site: most-hit pages, crawl frequency, status codes. This is the open-source answer to expensive log-file SEO tools.
  URL: https://goaccess.io/ and https://github.com/allinurl/goaccess (Gerardo Orellana, ongoing; MIT-style licence).
  Verdict: **SAFE** — analyses YOUR server logs locally; no external requests, fully POPIA-friendly.

### Rank tracking (self-hosted)

- **SerpBear** — Open-source, self-hosted keyword rank tracker with notifications and a Search Console integration; you control where data is stored.
  URL: https://github.com/towfiqi/serpbear (Towfiq I., ongoing; open-source). [Confirm current scraping behaviour in repo before deploy.]
  Verdict: **RISKY-IF-MISUSED** — rank tracking itself is legitimate, but automated Google SERP scraping can breach Google's Terms of Service and trigger CAPTCHA/IP blocks. Use the official **Search Console API** for your own site's positions where possible (fully sanctioned). Reserve SERP scraping for low-volume, rate-limited checks via proxies, and treat it as ToS-grey.

- **Serposcope** — Free, self-hosted rank tracker (unlimited keywords/sites), proxy + CAPTCHA handling.
  URL: https://serposcope.serphacker.com/ / GitHub "serphacker/serposcope". [UNVERIFIED on current maintenance — project has historically been quiet.]
  Verdict: **RISKY-IF-MISUSED** — same SERP-scraping ToS caveat as SerpBear.

- **SEO Panel** — Open-source SEO control panel / reporting for multi-site/agency use.
  URL: https://www.seopanel.org/ (SEO Panel, ongoing).
  Verdict: **RISKY-IF-MISUSED** — includes rank-checking that can scrape SERPs; same caveat.

### Schema / structured-data validation

- **Schema.org Markup Validator** — Validates JSON-LD, RDFa, Microdata against schema.org. Google-hosted, provided to the schema.org project. The general-purpose replacement for the retired Structured Data Testing Tool.
  URL: https://validator.schema.org/ and https://schema.org/docs/validator.html (Schema.org / Google, launched 2021 per https://searchengineland.com/schema-org-launches-its-schema-markup-validator-tool-348590, Search Engine Land, 2021).
  Verdict: **SAFE**.

- **Google Rich Results Test** — Confirms which rich results a page is eligible for.
  URL: https://search.google.com/test/rich-results (Google, ongoing).
  Verdict: **SAFE**. (Project rule already mandates checking this post-deploy.)

- **Structured Data Linter / JSON-LD Playground / SDO-Check / Schemarama** — Open-source schema validators/linters; Schemarama can run as a GitHub Action for CI validation of structured data.
  URL: schema.org tools discussion https://github.com/schemaorg/schemaorg/discussions/3432 (schema.org project) and https://json-ld.org/playground/ (JSON-LD community).
  Verdict: **SAFE** — can be wired into the deploy pipeline as a structured-data gate.

### Keyword / demand research (free, programmatic)

- **pytrends** — Unofficial Python wrapper for Google Trends (interest over time, related queries, regional interest). Already named in this project's blog research pipeline.
  URL: https://github.com/GeneralMills/pytrends and https://pypi.org/project/pytrends/ (General Mills, ongoing; unofficial). Note: Google has changed Trends endpoints repeatedly, so expect breakage; a maintained fork "pytrends-modern" (https://github.com/yiromo/pytrends-modern) exists. [UNVERIFIED fork quality.]
  Verdict: **RISKY-LITE** — it scrapes an undocumented endpoint, so it is ToS-grey and fragile, but low-stakes for demand research. Rate-limit; do not hammer.

---

## Local-LLM SEO use-cases (legit, with guardrails)

All of the following are legitimate, non-spam uses that keep a HUMAN in the loop and produce DECISION SUPPORT, not auto-published text. They map directly to risks this project already manages (doorway/scaled-content abuse, §400/§529; AI-tell detection, §377). The user's local Ollama stack (qwen2.5-coder and similar) plus the Python libraries below run all of these offline, POPIA-safe, with zero SaaS cost.

Google's relevant lines: "scaled content abuse" is now a named spam policy and "using automation, including AI, to generate many pages with little value" is what is penalised — NOT the use of AI per se. Google's own guidance is "appropriate use of AI is not against our guidelines." (https://developers.google.com/search/blog/2023/02/google-search-and-ai-content, Google Search Central, Feb 2023; spam policies: https://developers.google.com/search/docs/essentials/spam-policies, Google, ongoing.) The guardrail is therefore: AI assists analysis and drafting for human review; AI never mass-publishes.

1. **Content-gap clustering / topic modelling**
   Embed your own pages and competitor pages, cluster by meaning (not keyword string), and surface topics you have not covered. Tools: sentence-transformers embeddings + scikit-learn / HDBSCAN clustering; or have the local LLM label clusters.
   Guardrail: output is a gap LIST for a human to commission, never an auto-generated page.

2. **Query-intent classification**
   Classify GSC queries as informational / commercial / transactional / navigational to route them: informational -> blog, commercial/transactional -> service or hub page. This is exactly the routing §578 already does manually. A local LLM (few-shot prompt) or a weak-supervision classifier does it at scale.
   Evidence this is a real IR task: "LLM-based Weak Supervision Framework for Query Intent Classification" (https://arxiv.org/pdf/2409.08931, arXiv, 2024) and "In a Few Words: Comparing Weak Supervision and LLMs for Short Query Intent Classification" (https://arxiv.org/pdf/2504.21398, arXiv, 2025).
   Guardrail: a classification label is advisory; pricing/Approved gates still apply.

3. **Title / meta-description variant generation for HUMAN review**
   Generate 3-5 title/meta candidates for a low-CTR, high-impression page (the exact O1 CTR work in this repo's recent commits). Human picks/edits before commit.
   Guardrail: never auto-commit; titles/H1 unchanged where ranking risk exists (the repo already follows this).

4. **Internal-link suggestion**
   Embed all pages, compute semantic similarity, and propose contextually relevant internal links from orphan/under-linked pages (supports §402 internal-link enforcement). The LLM proposes anchor + target; a human approves.
   Guardrail: respect the existing canonical/redirect map; do not link to pruned doorway URLs (§529).

5. **Semantic similarity / near-duplicate detection (doorway / scaled-content guard)**
   This is the most defensive and highest-value local-LLM use for THIS site. Detect when two suburb/cluster pages are too similar (the §400 "no sibling > 0.70 similarity" rule) BEFORE publishing, catching doorway/scaled-content risk that Google now names as spam. Methods: sentence-transformers cosine similarity for semantic near-dupes; MinHash/SimHash for cheap lexical near-dupes at scale.
   Guardrail: this is purely a pre-publish QA gate; it removes risk rather than adding it.

6. **Entity / topic extraction for schema and E-E-A-T**
   Extract entities and key facts to inform FAQ generation and structured data, and to check a page actually demonstrates first-hand experience (E-E-A-T proxies) rather than generic filler (§171).
   Guardrail: facts must be verified against real sources (§374); the LLM drafts, a human confirms.

RISKY local-LLM uses to AVOID (explicitly out of bounds):
- Mass auto-generating pages/posts from a template and publishing without human review = **scaled content abuse** (named Google spam policy, Mar 2024). RISKY.
- Spinning/rewriting competitor content to evade duplicate detection = manipulative, RISKY.
- Auto-generating doorway permutations per suburb x service with thin variation = doorway abuse, the exact thing §529 prunes. RISKY.
- Programmatic SERP scraping at volume to "train" anything = Google ToS breach + IP bans. RISKY.

---

## Peer-reviewed / academic findings

What the literature actually supports about organic ranking and clicks. Cited where confirmable; marked [UNVERIFIED] otherwise.

### Position bias and CTR (well-established, primary sources)

- **Joachims, Granka, Pan, Hembrooke, Gay — "Accurately Interpreting Clickthrough Data as Implicit Feedback," ACM SIGIR 2005.** Eye-tracking + clickthrough study showing users overwhelmingly examine and click the top results; clicks are informative but POSITION-BIASED, so clicks are not absolute relevance judgements, though RELATIVE preferences derived from clicks are reasonably accurate.
  URL: https://www.cs.cornell.edu/people/tj/publications/joachims_etal_05a.pdf (Cornell, 2005); ACM record https://dl.acm.org/doi/10.1145/1076034.1076063. Republished in ACM SIGIR Forum 51(1) 2017.
  Practical implication for ZA: ranking position dominates CTR, so the high-impression/low-CTR pages in this repo are mostly a POSITION problem first and a title/snippet problem second. Title tuning helps within a position band; it is not a substitute for ranking improvement.

- **Joachims et al. — "Evaluating the Accuracy of Implicit Feedback from Clicks and Query Reformulations in Web Search," ACM TOIS 25(2), 2007.** Follow-up confirming relative click signals are robust across query reformulations.
  URL: dblp/ACM record (ACM Transactions on Information Systems, 2007). https://dl.acm.org/doi/10.1145/3130332.3130334 (Forum reprint).

- **Position-bias correction / examination hypothesis literature** — "Revisiting the Examination Hypothesis with Query Specific Position Bias" (https://arxiv.org/pdf/1003.2458, arXiv, 2010) and "Eliminating Search Intent Bias in Learning to Rank" (https://arxiv.org/pdf/2002.03203, arXiv, 2020). The Examination Hypothesis: P(click) = P(examined | position) x P(relevant | snippet). This formalises why snippet quality (title/meta) only converts attention that POSITION already earned.

- **Lewandowski et al. — eye-tracking review** (https://searchstudies.org/wp-content/uploads/2021/04/20191203_Eyetracking-Review_Preprint.pdf, preprint, 2019). Survey of eye-tracking in web search confirming the "golden triangle" / top-down attention pattern.

### Ranking factors / E-E-A-T (weaker evidence base — be honest)

- **E-E-A-T is NOT a direct ranking factor.** Google's own position: E-E-A-T concepts are used by human Quality Raters to evaluate whether ranking SYSTEMS are surfacing helpful content; raters do not change individual rankings. Systems give more weight to content aligning with strong E-E-A-T for YMYL topics.
  URL: https://developers.google.com/search/blog/2022/12/google-raters-guidelines-e-e-a-t (Google Search Central, Dec 2022); Quality Rater Guidelines PDF https://services.google.com/fh/files/misc/hsw-sqrg.pdf (Google; guidelines last updated 11 Sep 2025 per multiple secondary reports). Helpful-content guidance: https://developers.google.com/search/docs/fundamentals/creating-helpful-content (Google, ongoing).
  Honest caveat: there is NO robust peer-reviewed causal study proving "more E-E-A-T -> higher ranking." It is Google-stated guidance + correlation studies from SEO vendors, not academic causation. Treat E-E-A-T work (named author = Courtney Bentley, workshop experience, local detail per §168/§171/§403) as a quality investment that is defensible and rater-aligned, not as a guaranteed ranking lever. [Causal academic proof: UNVERIFIED — none found.]

- **"Does CTR move ranking?"** Whether user clicks directly feed live ranking is contested and not settled in peer-reviewed literature; Google has given mixed public statements. The academically supported claim is narrower: clicks are a biased implicit-feedback signal useful for EVALUATING and TRAINING rankers (Joachims above), not a confirmed direct live ranking knob. [Direct CTR-as-ranking-factor: UNVERIFIED.]

### Retrieval algorithms underpinning the tools (established)

- **BM25 (Robertson & Walker / Robertson & Zaragoza, "The Probabilistic Relevance Framework: BM25 and Beyond," Foundations and Trends in IR, 2009)** is the canonical lexical ranking function and the basis of the bm25s library below. [Primary text well established; cited here as the algorithm's provenance.]
- **Sentence-BERT (Reimers & Gurevych, "Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks," EMNLP 2019, https://arxiv.org/abs/1908.10084)** is the basis of the sentence-transformers library used for semantic similarity / clustering / near-dup detection. (arXiv, 2019.)

---

## Python libraries already plausibly installed and useful

Confirmed-real libraries (primary sources) and exactly how each helps ZA's SEO without paid SaaS.

- **bm25s** — Fast BM25 lexical search in pure Python (Numpy/Scipy), up to ~500x faster than rank-bm25, package < 100KB, Hugging Face Hub integration.
  URL: https://github.com/xhluca/bm25s and https://pypi.org/project/bm25s/ (Xing Han Lu, ongoing).
  SEO use: build a local index of all site pages + GSC queries to find which existing page best answers an under-served query (internal-link target selection, content-gap routing) entirely offline. Pairs with embeddings as a cheap first-stage retriever.

- **ddgs** (the maintained successor to duckduckgo-search) — Python client for DuckDuckGo / meta-search results.
  URL: https://pypi.org/project/ddgs/ (PyPI, ongoing). [Note: the project was renamed from `duckduckgo_search` to `ddgs`; confirm the installed version.]
  SEO use: lightweight, ToS-friendlier SERP/competitor discovery and "what ranks for this query" sampling WITHOUT scraping Google directly. RISKY-LITE: still rate-limited and meta-search, so treat results as directional, not Google-accurate.

- **sentence-transformers (SBERT)** — Embeddings for semantic similarity, clustering, and near-duplicate detection; runs locally on CPU/GPU, many small models.
  URL: https://www.sbert.net/ and https://github.com/UKPLab/sentence-transformers (UKP Lab / Hugging Face, ongoing). Paper: Reimers & Gurevych, EMNLP 2019 (above).
  SEO use: the engine for §400 sibling-similarity (catch >0.70 near-dupes pre-publish), content-gap clustering, internal-link suggestion, and doorway/scaled-content QA. Highest-value local addition for THIS site.

- **pytrends** — Google Trends wrapper (covered above). Demand seasonality + related-query discovery feeding the keyword pipeline (§518 seasonality work).
  URL: https://github.com/GeneralMills/pytrends.

Supporting libraries worth confirming as installed:
- **scikit-learn / HDBSCAN / numpy / scipy** — clustering + vector maths behind the above. (scikit-learn.org; ongoing.)
- **datasketch** — MinHash LSH for scalable lexical near-dup detection. URL: https://github.com/ekzhu/datasketch (Eric Zhu, ongoing). SEO use: cheap pre-filter for near-duplicate pages before the heavier SBERT cosine pass.
- **trafilatura** — robust main-content extraction from HTML (cleaner than ad-hoc parsing) for building the local page corpus. URL: https://github.com/adbar/trafilatura (Adrien Barbaresi, ongoing; peer-reviewed companion paper ACL 2021). SEO use: extract clean body text of own/competitor pages to feed embeddings.

---

## Recommended additions to OUR local stack

Ranked by impact-per-effort and SAFE-by-construction (no Google ToS exposure, human-in-loop). All run on the existing Ollama + Python setup, zero SaaS spend.

1. **Pre-publish semantic near-duplicate gate (sentence-transformers + datasketch).** HIGHEST VALUE / LOWEST RISK. Directly hardens §400/§529 against the now-named "scaled content abuse" spam policy by catching sibling pages >0.70 similarity and thin doorway permutations BEFORE deploy. Wire into the existing deploy gate alongside the dash/price gates. SAFE.

2. **GoAccess log-file crawl-budget monitor.** Point it at the server access logs to see exactly how Googlebot spends crawl budget (which pages, how often, what status codes) — currently a blind spot. Fully local, POPIA-safe. SAFE.

3. **Schemarama / Structured Data Linter as a CI gate.** Add open-source schema validation to the pipeline so every page's JSON-LD is validated automatically (complements the manual Rich Results Test in §166). SAFE.

4. **Local query-intent classifier (Ollama qwen2.5-coder, few-shot).** Auto-route GSC queries to blog vs service/hub, feeding §578's content-type routing at scale. Advisory only; existing Approved/pricing gates remain. SAFE.

5. **bm25s + SBERT internal-link suggester.** Offline index of all pages to propose internal links for orphan/under-linked URLs (§402), human-approved. SAFE.

6. **Lighthouse CI as a hard deploy budget.** The project already reads PSI; formalise it as a CI assertion so a perf/SEO regression blocks the deploy. SAFE.

7. **(Optional, ToS-aware) SerpBear via Search Console API for own-site positions.** Use the SANCTIONED Search Console API path, NOT SERP scraping, to track your own positions self-hosted. SAFE if API-only; the scraping mode is RISKY and should stay off.

GUARDRAIL SUMMARY (the single rule): local LLMs and these tools may CLUSTER, CLASSIFY, COMPARE, VALIDATE, and DRAFT-FOR-REVIEW. They may not MASS-PUBLISH, SPIN, or SCRAPE-GOOGLE-AT-VOLUME. Everything in the recommended stack sits on the safe side of that line and most of it actively REDUCES the site's existing scaled-content/doorway risk.

---

### Source list (primary + key secondary)

- Joachims et al., SIGIR 2005 (Cornell PDF): https://www.cs.cornell.edu/people/tj/publications/joachims_etal_05a.pdf
- Joachims et al., ACM SIGIR Forum reprint 2017: https://dl.acm.org/doi/10.1145/3130332.3130334
- Examination/position-bias (arXiv 2010): https://arxiv.org/pdf/1003.2458
- Eliminating Search Intent Bias in LTR (arXiv 2020): https://arxiv.org/pdf/2002.03203
- Lewandowski eye-tracking review (2019 preprint): https://searchstudies.org/wp-content/uploads/2021/04/20191203_Eyetracking-Review_Preprint.pdf
- LLM weak-supervision query intent (arXiv 2024): https://arxiv.org/pdf/2409.08931
- Weak supervision vs LLM short-query intent (arXiv 2025): https://arxiv.org/pdf/2504.21398
- Google E-E-A-T blog (Dec 2022): https://developers.google.com/search/blog/2022/12/google-raters-guidelines-e-e-a-t
- Google Quality Rater Guidelines PDF: https://services.google.com/fh/files/misc/hsw-sqrg.pdf
- Google helpful content docs: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google AI-content guidance (Feb 2023): https://developers.google.com/search/blog/2023/02/google-search-and-ai-content
- Google spam policies (scaled content abuse): https://developers.google.com/search/docs/essentials/spam-policies
- Sentence-BERT (Reimers & Gurevych, EMNLP 2019): https://arxiv.org/abs/1908.10084
- bm25s: https://github.com/xhluca/bm25s | https://pypi.org/project/bm25s/
- sentence-transformers: https://www.sbert.net/ | https://github.com/UKPLab/sentence-transformers
- pytrends: https://github.com/GeneralMills/pytrends
- ddgs: https://pypi.org/project/ddgs/
- datasketch (MinHash LSH): https://github.com/ekzhu/datasketch
- trafilatura: https://github.com/adbar/trafilatura
- GoAccess: https://goaccess.io/ | https://github.com/allinurl/goaccess
- Lighthouse / Lighthouse CI: https://github.com/GoogleChrome/lighthouse | https://github.com/GoogleChrome/lighthouse-ci
- Schema.org Markup Validator: https://validator.schema.org/ | https://schema.org/docs/validator.html
- Schemarama GitHub Action discussion: https://github.com/schemaorg/schemaorg/discussions/3432
- SerpBear: https://github.com/towfiqi/serpbear
- LibreCrawl: https://github.com/PhialsBasement/LibreCrawl | https://librecrawl.com/
- Round-up pointers (commercial blogs, used only to NAME tools, not as authorities): https://ranksaver.com/blog/open-source-seo-tools | https://seojuice.com/blog/top-open-source-tools-for-seo/ | https://prerender.io/blog/screaming-frog-alternative/ | https://searchengineland.com/schema-org-launches-its-schema-markup-validator-tool-348590
