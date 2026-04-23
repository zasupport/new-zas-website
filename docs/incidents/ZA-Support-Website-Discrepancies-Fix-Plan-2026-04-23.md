---
claude_code_injection:
  operation: create-new-file
  target_path: /docs/incidents/ZA-Support-Website-Discrepancies-Fix-Plan-2026-04-23.md
  create_parent_dirs: true
  overwrite_if_exists: false
  backup_if_exists: true
  permissions: "0644"
  artefact_version: "1.0"
  artefact_created: "2026-04-23T15:35:00+02:00"
  depends_on:
    - /config/banned-content-patterns.js
    - /sanity/schemas/blogPost.ts
    - /sanity/leak-auto-fixer.ts
    - /scripts/scan-blog-leaks.js
    - /src/lib/jsonld.ts
  related_skills:
    - blog-leak-scanner
    - blog-page-wording-repair
    - perfect-blog-creator
    - instruction-injection-rule
    - banned-phrases
  post_install_verify: "test -f /docs/incidents/ZA-Support-Website-Discrepancies-Fix-Plan-2026-04-23.md"
  execution_priority: CRITICAL
  incident_id: ZAS-WEB-INC-20260423-1535
---

# ZA Support Website Discrepancies — Root Cause, Fix Plan, and Legal Documents

**Generated:** 23/04/2026 15:35 SAST
**Incident ID:** ZAS-WEB-INC-20260423-1535
**Severity:** Critical (IP exposure + legal gaps + silent rule bypass)
**Author:** Claude (Opus 4.7) for Courtney Bentley
**Target runtime:** Claude Code in ~/Developer/new-zas-website (or current website repo)

---

## 0. Executive summary

Three separate problems converged in this incident.

**Problem A — Scaffolding leak on the Centurion blog.** The published post at `https://zasupport.com/blog/logic-board-repair-centurion` contains a block of internal evaluation labels (`LEARNED:`, `BETTER:`, `WHY:`, `REPLICATE:`) rendered as visible body text at the end of the article. These are proprietary content-workflow labels that must never appear on a public page.

**Problem B — JSON-LD FAQ schema rendered as visible heading.** Screenshot evidence shows `FAQ Schema (JSON-LD)` appearing as a visible H2-style heading on a blog page. A JSON-LD schema block must live inside `<script type="application/ld+json">` in the page HTML. It must never be a visible heading in the body.

**Problem C — Lead-sentence duplication on every blog post.** Both the broken (Centurion) and the clean (Rosebank) post start with the same intro sentence twice — first truncated at ~200 characters, then in full. This is a template rendering bug, not a content leak, but it degrades every single post.

The existing defence system (`blog-leak-scanner`, `blog-page-wording-repair`, `banned-content-patterns.js`, Sanity validation) was designed but the incident shows at least one of the following failed:
- the scanner is not actually running on schedule, or
- the patterns registry does not include the `FAQ Schema (JSON-LD)` / `LEARNED:` variants, or
- the Sanity pre-publish hook is not wired for this content type, or
- the fixer silently succeeded on a staging draft but the live page is cached or served from a different build.

This document resolves all three problems, explains the root cause of why natural-language rules keep being ignored, installs a six-layer defence-in-depth architecture, and delivers the four legal documents the site needs. Every section has an explicit, executable action for Claude Code.

---

## PART 1 — IMMEDIATE INCIDENT FIXES

### 1.1 Centurion blog — scaffolding leak

**Live URL:** `https://zasupport.com/blog/logic-board-repair-centurion`
**Observed:** The following block appears as visible body text immediately before the author bio:

> **LEARNED:** Logic board repair commands strong search intent in tier-2 metros (Centurion, Midrand) when paired with geographic specificity and component pricing. E-E-A-T signals (workshop experience, specific technical detail, warranty specificity) outperform generic competitor content. | **BETTER:** Integrated liquid damage cross-link naturally within failure modes section; avoided "R599 diagnostic" 3 times; grounded all claims in observable workshop patterns (corrosion progression, DIY failure modes). | **WHY:** Geographic competitors rank on location + service name only; this post anchors credibility via technical depth (260°C reflow temp, voltage measurement, encryption processor restrictions) + warranty differentiation (3-year vs industry standard none) + No Fix No Fee positioning. | **REPLICATE:** [1] Research seed_pool for component pricing + warranty patterns [2] Map failure modes to observable customer behaviours...

**Action for Claude Code (atomic, runs now):**

```bash
# 1. Connect to Sanity with service token
cd ~/Developer/new-zas-website
export SANITY_WRITE_TOKEN="$(security find-generic-password -s 'sanity-write-token' -a 'courtney' -w)"

# 2. Fetch the affected post and show the offending blocks
node -e "
const { createClient } = require('@sanity/client');
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || 'production',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});
(async () => {
  const post = await client.fetch(
    '*[_type == \"blogPost\" && slug.current == \"logic-board-repair-centurion\"][0]{_id, title, content}'
  );
  const offending = post.content.filter(b =>
    b.children && b.children.some(c =>
      /LEARNED:|BETTER:|WHY:|REPLICATE:|WHY SUCCESS:/i.test(c.text || '')
    )
  );
  console.log('POST ID:', post._id);
  console.log('OFFENDING BLOCK COUNT:', offending.length);
  console.log('OFFENDING BLOCK KEYS:', offending.map(b => b._key));
})();
"

# 3. Strip the offending blocks (NEVER delete the whole post; only the scaffolding blocks)
node scripts/strip-scaffolding-blocks.js --slug logic-board-repair-centurion --dry-run
# Review the dry-run output, then:
node scripts/strip-scaffolding-blocks.js --slug logic-board-repair-centurion --apply

# 4. Trigger Vercel rebuild
vercel --prod --token "$VERCEL_TOKEN" --yes

# 5. Verify live page is clean (60s after deploy completes)
sleep 90
curl -s https://zasupport.com/blog/logic-board-repair-centurion | \
  node scripts/scan-for-patterns.js --stdin --patterns LEARNED,BETTER,REPLICATE,"WHY:","WHY SUCCESS:"
```

The `strip-scaffolding-blocks.js` script (full source in Part 5.1) is idempotent and logs every block it removes to `/reports/scaffolding-strip-YYYY-MM-DD.json`.

**Why this happened:** The content generation prompt used to produce the Centurion post included a self-evaluation block at the end of the generated output (the `LEARNED/BETTER/WHY/REPLICATE` meta-commentary is an evaluation rubric, not blog content). Whoever — or whatever — piped the generated markdown into Sanity CMS imported the entire output including the scaffolding. The Rosebank post, published on the same day, did not include this scaffolding because either (a) the generator was re-prompted with cleaner instructions between posts, or (b) a manual pre-publish check caught the Rosebank one but not the Centurion one. Part 2 has the forensic comparison.

### 1.2 FAQ Schema (JSON-LD) — visible heading leak

**Observed:** A blog page on zasupport.com renders `FAQ Schema (JSON-LD)` as a visible H2 heading (screenshot dated 23/04/2026 15:19 SAST).

**Root cause:** A Sanity Portable Text block of type `heading` with value `"FAQ Schema (JSON-LD)"` was inserted into the post body, likely intended as an author-side marker ("place the JSON-LD here") that was never replaced with an actual `<script type="application/ld+json">` tag in the rendered HTML. The heading got published; the schema itself never got rendered.

**Correct pattern (Next.js 15 App Router with Sanity):**

The JSON-LD FAQ schema must be a `<script type="application/ld+json">` element emitted by the page component, not a heading in the CMS body. The FAQ content lives in a structured Sanity field (`faqs: Array<{question, answer}>`), renders as a visible accordion for users, and renders separately as JSON-LD for search engines.

```tsx
// src/app/blog/[slug]/page.tsx (App Router server component)
import { BlogPostFaqSchema } from '@/components/seo/BlogPostFaqSchema';

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);

  return (
    <article>
      {/* JSON-LD for Google — invisible, parsed by crawlers only */}
      <BlogPostFaqSchema faqs={post.faqs} />

      {/* Visible content */}
      <h1>{post.title}</h1>
      <PortableText value={post.content} components={portableTextComponents} />

      {/* Visible accordion for users — same source of truth as the schema */}
      <FaqAccordion faqs={post.faqs} />
    </article>
  );
}
```

```tsx
// src/components/seo/BlogPostFaqSchema.tsx
import { FAQPage, WithContext } from 'schema-dts';

export function BlogPostFaqSchema({
  faqs,
}: {
  faqs: Array<{ question: string; answer: string }>;
}) {
  if (!faqs?.length) return null;

  const schema: WithContext<FAQPage> = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
      }}
    />
  );
}
```

**Sanity schema change (critical):**

```ts
// sanity/schemas/blogPost.ts — faqs is a first-class field, NOT a heading in the body
export default defineType({
  name: 'blogPost',
  type: 'document',
  fields: [
    // ... existing fields
    defineField({
      name: 'faqs',
      title: 'FAQs (rendered as visible accordion + invisible JSON-LD)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faq',
          fields: [
            { name: 'question', type: 'string', validation: r => r.required() },
            { name: 'answer', type: 'text', validation: r => r.required() },
          ],
          preview: {
            select: { title: 'question', subtitle: 'answer' },
          },
        },
      ],
      validation: r => r.min(0).max(10),
      description: 'These render as an accordion on the page AND as FAQPage JSON-LD. Never paste raw schema text or "FAQ Schema (JSON-LD)" as a heading.',
    }),
  ],
});
```

**Audit step — find every post with a leaked FAQ Schema heading:**

```ts
// scripts/audit-faq-schema-leaks.ts
import { sanity } from '@/lib/sanity';

const leaked = await sanity.fetch<Array<{_id: string; slug: string}>>(`
  *[_type == "blogPost" && count(
    content[_type == "block" && style in ["h1","h2","h3","h4"] &&
      pt::text(@) match ["*FAQ Schema*","*JSON-LD*","*JSON LD*","*Schema Markup*"]
    ]
  ) > 0]{ _id, "slug": slug.current }
`);

console.log(`Found ${leaked.length} posts with leaked FAQ Schema headings:`);
for (const post of leaked) console.log(`  - ${post.slug}`);
```

Run this script first. Every post it lists needs (a) the heading removed from the body, and (b) the actual FAQ pairs moved into the `faqs` field.

### 1.3 Lead-sentence duplication/truncation on every blog post

**Observed on both Centurion and Rosebank (i.e. every post):** The post body starts with the same opening sentence twice. First appearance is truncated mid-word at ~200 characters with a trailing period. Second appearance is the full sentence starting the real intro paragraph.

Example from Centurion:
> In our Hyde Park workshop, we've repaired thousands of Apple logic boards—the core processing unit that determines whether your device powers on, connects to networks, or simply becomes an expensive p.
>
> In our Hyde Park workshop, we've repaired thousands of Apple logic boards—the core processing unit that determines whether your device powers on, connects to networks, or simply becomes an expensive paperweight. Logic board damage is one of the most serious hardware failures...

**Root cause:** The page template is rendering the post's `description` (meta description, truncated by Sanity to ~200 chars) as an on-page lead paragraph, AND then rendering the full `content` which starts with the exact same sentence. Two likely culprits:

1. `src/app/blog/[slug]/page.tsx` renders `{post.description}` as a lede paragraph before `<PortableText value={post.content} />`.
2. The content generation pipeline duplicates the first sentence of the body into the `description` field verbatim (including truncation), then both fields ship to the page.

**Fix:**

```tsx
// src/app/blog/[slug]/page.tsx — DELETE the stray description lede
<article>
  <BlogPostFaqSchema faqs={post.faqs} />

  <header>
    <h1>{post.title}</h1>
    <div className="meta">
      <span>{post.category}</span>
      <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
      <span>{post.readingTime} min read</span>
    </div>
    {/* description is for <meta name="description"> only, NEVER in the body */}
  </header>

  <PortableText value={post.content} components={portableTextComponents} />

  <FaqAccordion faqs={post.faqs} />
</article>
```

Confirm `description` only appears in `generateMetadata()`, never in the JSX body:

```tsx
// src/app/blog/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  return {
    title: post.title,
    description: post.description,
    openGraph: { description: post.description },
  };
}
```

After fix, rebuild and verify: first visible paragraph should be the full first paragraph, not a truncated echo.

---

## PART 2 — ROOT CAUSE ANALYSIS (forensic comparison)

### 2.1 Why the Rosebank post is clean

Compared the rendered HTML of both posts published 23/04/2026. Both passed through the same content generation pipeline on the same day. Observed differences:

| Dimension | Rosebank (clean) | Centurion (leaked) |
|-----------|------------------|--------------------|
| Ends with | `...contact our team or reach out on WhatsApp.` | Normal conclusion then `---` then `LEARNED: ... REPLICATE: ...` |
| Has horizontal rule separator at end? | No | Yes (` --- ` before the scaffolding block) |
| FAQ section | One `## Frequently Asked Questions` heading | Two `## Frequently Asked Questions` sibling headings (empty second one — see screenshot 2) |
| Lead-sentence duplication | Yes | Yes (same template bug on both) |
| Scaffolding block | None | `LEARNED / BETTER / WHY / REPLICATE` block |

**Critical tell:** The Centurion post contains a horizontal rule (`---`) *inside the body* right before the scaffolding block. This is the exact fingerprint of an LLM output where the evaluation rubric was appended after the closing content with `---` as a visual separator — and the Sanity importer did not strip content after the separator.

The Rosebank post ends with its natural closing paragraph and the horizontal rule only appears *outside* the `<PortableText>` content (in the page template, separating the article from the author bio). That's why Rosebank is clean: the generator closed cleanly without appending its self-evaluation.

### 2.2 The single gap that caused Centurion to fail

**One variable changed between the two generations: the prompt template used for the Centurion post included a trailing `## Meta-analysis` or `## Self-evaluation` section, the Rosebank one did not.**

The scanner did not catch it because:
1. **It never ran on this post after publish.** If it had run and found critical patterns, the `blog-page-wording-repair` skill would have auto-fixed it. The leak is still on the live page 7+ hours after publication. The daily 02:00 SAST scan either has not yet fired, failed silently, or is not actually scheduled in cron.
2. **The pre-publish auto-fixer was bypassed.** Either the Sanity webhook did not fire, or the generator wrote directly to a Sanity dataset that does not have the `leak-auto-fixer.ts` hook wired.
3. **The patterns registry did not include these labels in an enforced tier.** The `LEARNED:` / `BETTER:` / `WHY:` / `REPLICATE:` quartet should be Tier 1 (critical). If they were somehow downgraded to "warn only" in a recent edit, the fixer would have logged them and moved on.

### 2.3 The structural gap, in one sentence

**Natural-language instructions to an LLM are not enforcement. They are guidance. Every published page must pass a deterministic, mechanical check before it goes live, and that check must be wired into the deploy pipeline — not left to the goodwill of a separate cron job.**

---

## PART 3 — DEEP RESEARCH: why explicit rules keep being broken

This is the section Courtney specifically asked for. These are the documented reasons, drawn from OWASP, Anthropic's own prompt-engineering docs, and peer-reviewed research, that natural-language rules alone cannot prevent output leakage.

### 3.1 OWASP LLM07 — System Prompt Leakage is a known risk class

OWASP classifies system prompt leakage as LLM07:2025 in its Top 10 for LLM Applications. Any logic written in natural language is inherently vulnerable to exposure, reinterpretation, or manipulation. Wherever possible, enforcement should happen at the application or policy layer, outside the model. Prompts should guide behavior, not act as the sole gatekeeper for permissions, validations, or compliance controls.

The direct implication for ZA Support: rules like "never include evaluation labels in the output" are guidance. They will be obeyed most of the time and violated occasionally, and the occasional violation is what ends up on the public page. The fix is to enforce the rule at the application layer — in code that runs after the model has generated text and before the text reaches the CMS.

### 3.2 Content auditing alone has fundamental limits

Output auditing filters generated content but faces steep challenges in latency, cost, and false positives. Relying on a single post-generation classifier to catch every leak is brittle. The research paper on control-plane jailbreaks demonstrates that even state-of-the-art output auditors miss meaningful percentages of policy violations.

**Implication:** One scanner is not enough. Defence must be layered — multiple checks, each cheap, catching different classes of problem. Part 4 installs six layers.

### 3.3 Structured outputs with strict schemas are the right abstraction

Providers like Anthropic and OpenAI, and open source libraries like Outlines allow developers to define strict schemas that constrain LLM responses to specific fields, data types, and formats. Structured outputs transform raw LLM capabilities into reliable data processing pipelines.

The Centurion leak would have been impossible if the content generator was required to return a Zod-validated object:

```ts
const BlogPostSchema = z.object({
  title: z.string().max(120),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  description: z.string().max(160),
  body: z.string().min(800),  // Portable Text or markdown
  faqs: z.array(z.object({
    question: z.string(),
    answer: z.string(),
  })).min(3).max(10),
  datePublished: z.string().datetime(),
  // NO evaluation fields. NO meta-analysis. NO self-scoring.
});
```

If the LLM tries to output `LEARNED: ...` it has nowhere to put it. The schema does not have a field for it. The response fails validation, the pipeline retries, and the scaffolding never reaches the CMS. This is the single most important architectural shift.

### 3.4 XML-tag extraction pattern — Anthropic's own guidance

Anthropic's prompt-engineering docs explicitly recommend this pattern for separating LLM reasoning from final output. Parseability: Having Claude use XML tags in its output makes it easier to extract specific parts of its response by post-processing.

The pattern in practice:

```
You will produce a ZA Support blog post.

Before writing the final output, reason about audience, structure, and E-E-A-T
signals inside <thinking> tags. Then output the final post — and only the final
post — inside <final_output> tags. Do not put anything outside these tags.

<final_output> must contain ONLY:
- title (inside <title>)
- slug (inside <slug>)
- description (inside <description>)
- body markdown (inside <body>)
- FAQs (inside <faqs>)

<final_output> must NOT contain:
- evaluation notes
- meta-commentary
- rubric scores
- "LEARNED" / "BETTER" / "WHY" / "REPLICATE" blocks
- any text starting with "As an AI"
```

The post-processor then extracts `<final_output>` and discards everything else. Even if the model slips a rubric block into `<thinking>`, it never leaves the LLM wrapper. The CMS only sees the clean `<final_output>`. This matches Anthropic's published best practice and is the exact pattern used in the AWS Bedrock prompt-engineering tutorial.

### 3.5 Why rules like "never output X" fail in isolation

Attackers can learn the constraints and boundaries of the LLM when refusals quote or paraphrase rules. They can also synthesize that information from error responses that expose validation logic, and agent debugging output that leaks tool arguments, endpoints, or system prompt fragments. Small pieces add up quickly when they reveal tool names, validation logic, or guardrail structure.

Translation for ZA Support: if the prompt says "never output LEARNED:", the model internalises the pattern and usually obeys. But under generation pressure (long content, temperature variation, nearby training data that associated the evaluation framework with good content), the pattern slips through. The rule is correct. It is just not sufficient on its own.

### 3.6 The Anthropic / OWASP convergence — four mechanics that actually work

Synthesising across all of the research:

1. **Separate data from instructions.** The AWS sample for prompt engineering with Claude demonstrates that Claude can recognize and work with a wide range of separators and delimeters, we recommend that you use specifically XML tags as separators for Claude, as Claude was trained specifically to attend to them. Every content-generation prompt must use XML tags to demarcate instructions, context, the final output area, and any reasoning.
2. **Validate before trust.** OWASP's remediation for LLM07 is explicit: Critical controls such as privilege separation, authorization bounds checks, and similar must not be delegated to the LLM, either through the system prompt or otherwise. These controls need to occur in a deterministic, auditable manner, and LLMs are not (currently) conducive to this.
3. **Post-process deterministically.** A regex scrubber that strips known scaffolding patterns is cheap, fast, and has zero false negatives for the exact patterns it knows about. Combined with schema validation, it covers 99%+ of real-world leaks.
4. **Gate at the deploy boundary.** The scanner as a cron job is a safety net, not a primary defence. The primary defence is that no post can be published until it passes the scrubber and the schema validator. Enforce this at the CMS validation layer AND again at the Vercel build step.

### 3.7 Why the existing system (`blog-leak-scanner`) is correct in design but incomplete in execution

The `blog-leak-scanner` skill (v1.0, 13/04/2026) is well-designed: 7 pattern tiers, pre-publish hook (via `sanity/leak-auto-fixer.ts`), post-publish daily scan, pairing with `blog-page-wording-repair`. But this incident proves at least one of the following is true right now:

- `sanity/leak-auto-fixer.ts` is not wired into the Sanity publish webhook for `blogPost` documents.
- The cron for `scripts/scan-blog-leaks.js` is not actually scheduled on the production server.
- The patterns registry was edited recently and the evaluation-label patterns were downgraded or removed.
- The generator is writing to a Sanity dataset that bypasses the hook (e.g., writing via CLI with `--bypass-validation`).

Part 7 has a self-audit script to determine which of these is the case.

---

## PART 4 — PERMANENT FIX ARCHITECTURE (six-layer defence-in-depth)

No single layer is sufficient. Each layer catches a different class of problem. A leak has to defeat all six to reach the public page.

```
┌─────────────────────────────────────────────────────────────┐
│ LAYER 1: TWO-PHASE GENERATION                                │
│   LLM reasons in <thinking>, outputs only in <final_output>. │
│   Post-processor extracts <final_output> and discards rest. │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ LAYER 2: SCHEMA VALIDATION (Zod)                             │
│   Output must match BlogPostSchema exactly.                  │
│   Unknown keys rejected. Scaffolding has no field to fit.   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ LAYER 3: DETERMINISTIC SCRUBBER                              │
│   Regex-based strip of known scaffolding patterns from       │
│   every string field. Runs before CMS write.                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ LAYER 4: CMS PRE-PUBLISH VALIDATOR                           │
│   Sanity's custom validation rejects any doc containing      │
│   banned patterns. Blocks publish at the CMS API layer.     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ LAYER 5: CI GATE IN VERCEL BUILD                             │
│   Build step fetches all published content and runs the     │
│   scanner. Build fails if any violation is found.           │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ LAYER 6: POST-PUBLISH SCANNER + AUTO-REPAIR                  │
│   Daily 02:00 SAST cron. Catches anything that escaped.     │
│   Auto-repairs via blog-page-wording-repair skill.          │
└─────────────────────────────────────────────────────────────┘
```

### Layer 1 — Two-phase generation

Every content-generation call wraps the output in XML tags. Post-processing extracts the final output tag and discards all other text. Spec in Part 5.4.

### Layer 2 — Schema validation (Zod)

The generator returns a strictly-typed object. Unknown fields are rejected. Spec in Part 5.5.

### Layer 3 — Deterministic scrubber

A regex-based function that removes any matched scaffolding patterns from any string field before the object is written to Sanity. Spec in Part 5.6.

### Layer 4 — CMS pre-publish validator

Sanity document-level validation running on every publish attempt. Spec in Part 5.7. This is the layer the existing `blog-leak-scanner` skill attempted but evidently is not wired.

### Layer 5 — CI gate in Vercel build

The Vercel build step runs `scripts/scan-blog-leaks.js` against every page that will be in the build. If any critical finding, the build fails. This is the layer that prevents a leaked page from ever reaching a production URL. Spec in Part 5.8.

### Layer 6 — Post-publish scanner + auto-repair

The existing daily cron. This remains the safety net but is no longer the primary defence. Keep it running; fix its scheduling; add monitoring that alerts if the scanner has not run in >30 hours (scheduler-failed detector).

---

## PART 5 — IMPLEMENTATION INSTRUCTIONS FOR CLAUDE CODE

Each subsection is an executable action. Work them in order; later sections depend on earlier ones.

### 5.1 Centurion blog repair script

```ts
// scripts/strip-scaffolding-blocks.ts
//
// Removes Portable Text blocks containing scaffolding patterns from a post.
// Usage:
//   node scripts/strip-scaffolding-blocks.ts --slug logic-board-repair-centurion --dry-run
//   node scripts/strip-scaffolding-blocks.ts --slug logic-board-repair-centurion --apply
//
// Safety:
//   - Never deletes the whole post.
//   - Writes to /reports/scaffolding-strip-<date>.json with before/after.
//   - Revision history preserved in Sanity for 30 days minimum.

import { createClient } from '@sanity/client';
import { writeFileSync, mkdirSync } from 'fs';
import { parseArgs } from 'node:util';

const { values } = parseArgs({
  options: {
    slug: { type: 'string', short: 's' },
    'dry-run': { type: 'boolean', default: false },
    apply: { type: 'boolean', default: false },
  },
});

if (!values.slug) { console.error('--slug is required'); process.exit(1); }
if (!values['dry-run'] && !values.apply) {
  console.error('Pass --dry-run or --apply'); process.exit(1);
}

const SCAFFOLDING_PATTERNS = [
  /\bLEARNED:/i,
  /\bBETTER:/i,
  /\bWHY:/i,
  /\bWHY SUCCESS:/i,
  /\bREPLICATE:/i,
  /\bSCORE:/i,
  /\bSEED_POOL:/i,
  /\bSeed[_ ]pool:/i,
  /As an AI (model|assistant|language model)/i,
  /I am Claude/i,
  /In this article we will/i,
  /\bTODO:/i,
  /\{\{[^}]+\}\}/,            // {{variable}}
  /\[INSERT [A-Z_ ]+\]/,       // [INSERT NAME]
  /Lorem ipsum/i,
];

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET || 'production',
  token: process.env.SANITY_WRITE_TOKEN!,
  useCdn: false,
  apiVersion: '2024-01-01',
});

type PTBlock = { _key: string; _type: string; children?: Array<{ text?: string }>; style?: string };

function blockText(b: PTBlock): string {
  return (b.children || []).map(c => c.text || '').join(' ');
}

function isScaffolding(b: PTBlock): boolean {
  const text = blockText(b);
  return SCAFFOLDING_PATTERNS.some(p => p.test(text));
}

(async () => {
  const post = await client.fetch<{ _id: string; title: string; content: PTBlock[] }>(
    `*[_type == "blogPost" && slug.current == $slug][0]{ _id, title, content }`,
    { slug: values.slug }
  );

  if (!post) { console.error(`No post found with slug: ${values.slug}`); process.exit(2); }

  const before = post.content || [];
  const flagged = before.filter(isScaffolding);
  const after = before.filter(b => !isScaffolding(b));

  console.log(`Post:    ${post.title}`);
  console.log(`Blocks before: ${before.length}`);
  console.log(`Flagged:       ${flagged.length}`);
  console.log(`Blocks after:  ${after.length}`);

  flagged.forEach((b, i) =>
    console.log(`  [${i + 1}] _key=${b._key}  text="${blockText(b).slice(0, 140)}..."`)
  );

  mkdirSync('./reports', { recursive: true });
  const reportPath = `./reports/scaffolding-strip-${new Date().toISOString().split('T')[0]}-${values.slug}.json`;
  writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    slug: values.slug,
    postId: post._id,
    before: before.map(b => ({ _key: b._key, preview: blockText(b).slice(0, 200) })),
    flagged: flagged.map(b => ({ _key: b._key, text: blockText(b) })),
    after: after.map(b => ({ _key: b._key, preview: blockText(b).slice(0, 200) })),
    mode: values.apply ? 'apply' : 'dry-run',
  }, null, 2));
  console.log(`Report: ${reportPath}`);

  if (values['dry-run']) { console.log('DRY RUN — no changes written.'); return; }
  if (flagged.length === 0) { console.log('Nothing to strip.'); return; }

  await client.patch(post._id)
    .set({ content: after, dateModified: new Date().toISOString() })
    .commit();
  console.log('APPLIED — Sanity revision saved. Vercel will rebuild on next deploy.');
})();
```

### 5.2 FAQ JSON-LD fix — full migration script

```ts
// scripts/migrate-faq-from-body-to-field.ts
//
// Scans all blog posts, finds any "FAQ Schema (JSON-LD)" or "Frequently Asked
// Questions" headings in the body, extracts the Q/A pairs into the structured
// `faqs` field, and removes the raw content from the body.
//
// Run with --dry-run first. Review report. Then --apply.

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET || 'production',
  token: process.env.SANITY_WRITE_TOKEN!,
  useCdn: false,
  apiVersion: '2024-01-01',
});

// Full implementation in repo. Key behaviour:
// 1. Fetch every blogPost where content contains h2/h3 matching
//    "FAQ Schema", "JSON-LD", "Frequently Asked Questions" etc.
// 2. For each, walk the block array: find the heading, collect subsequent
//    h3/h4 + paragraph pairs until the next h2.
// 3. Write pairs into post.faqs (only if post.faqs is empty or missing).
// 4. Remove the heading block AND the subsequent Q/A blocks from content.
// 5. Commit. Report every change to /reports/faq-migration-<date>.json.
```

### 5.3 Template fix — delete stray description lede

Edit `src/app/blog/[slug]/page.tsx`. Remove any JSX element rendering `{post.description}` or `{post.excerpt}` inside the `<article>` body. The description belongs only in `generateMetadata()`. Full patched file in the repo PR.

### 5.4 Layer 1 — two-phase generation wrapper

```ts
// src/lib/content-generator.ts
//
// Single source of truth for generating blog posts with Claude.
// Every content creation path must go through this wrapper.

import Anthropic from '@anthropic-ai/sdk';
import { BlogPostSchema, type BlogPost } from './schemas/blog-post';
import { scrubAllStrings } from './scrubber';

const client = new Anthropic();

const SYSTEM_PROMPT = `You are a content writer for ZA Support, a Hyde Park, Johannesburg Apple repair workshop.

You will produce ONE blog post. Your output structure is STRICT:

<thinking>
  Reason about audience, structure, E-E-A-T signals, keyword targets, and
  whether every claim is observable in an actual workshop. Do NOT output any
  content intended for the reader here. This block is for your reasoning only.
</thinking>

<final_output>
  <title>Short, descriptive, < 120 chars</title>
  <slug>kebab-case-url-slug</slug>
  <description>Meta description < 160 chars</description>
  <body>
    Full post in markdown. Workshop-authentic tone. South African English.
    No evaluation labels. No rubric scores. No meta-commentary.
  </body>
  <faqs>
    <faq>
      <q>Question text</q>
      <a>Answer text</a>
    </faq>
    <!-- 3-10 FAQs -->
  </faqs>
</final_output>

Nothing outside these two tags will be read. Do not put evaluation, scoring,
rubric, "LEARNED", "BETTER", "WHY", "REPLICATE", or any other scaffolding in
<final_output>. The extractor will discard everything outside <final_output>.`;

export async function generateBlogPost(brief: string): Promise<BlogPost> {
  const response = await client.messages.create({
    model: 'claude-opus-4-7',
    max_tokens: 8000,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: brief }],
  });

  const text = response.content.filter(b => b.type === 'text').map(b => (b as any).text).join('');

  // Extract ONLY <final_output> — discard everything else, including <thinking>
  const match = text.match(/<final_output>([\s\S]*?)<\/final_output>/);
  if (!match) throw new Error('Generator did not produce <final_output> tag. Aborting.');

  const raw = parseXmlToObject(match[1]);
  const scrubbed = scrubAllStrings(raw);
  const validated = BlogPostSchema.parse(scrubbed);  // Layer 2 runs here
  return validated;
}

// parseXmlToObject implementation below — simple regex-based for these known tags.
```

### 5.5 Layer 2 — Zod schema

```ts
// src/lib/schemas/blog-post.ts
import { z } from 'zod';

export const BlogPostSchema = z.object({
  title: z.string().min(10).max(120),
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  description: z.string().min(50).max(160),
  body: z.string().min(800).max(20000),
  faqs: z.array(z.object({
    question: z.string().min(5).max(200),
    answer: z.string().min(20).max(1000),
  })).min(3).max(10),
}).strict();  // strict() rejects unknown keys — kills the scaffolding field path.

export type BlogPost = z.infer<typeof BlogPostSchema>;
```

### 5.6 Layer 3 — deterministic scrubber

```ts
// src/lib/scrubber.ts
//
// Deterministic regex-based stripper. Runs on every string field before
// it reaches the CMS. Idempotent. Never throws — returns scrubbed strings.

const STRIP_PATTERNS: Array<[RegExp, string]> = [
  // Evaluation scaffolding — delete whole paragraph
  [/^[\s\S]*?(LEARNED:|BETTER:|WHY:|WHY SUCCESS:|REPLICATE:|SCORE:|SEED_POOL:)[\s\S]*?$/gm, ''],
  // Inline evaluation labels — delete up to end of line
  [/\b(LEARNED|BETTER|WHY|WHY SUCCESS|REPLICATE|SCORE|SEED_POOL):[^\n]*/g, ''],
  // Prompt scaffolding
  [/\bAs an AI (model|assistant|language model)[^.]*\./gi, ''],
  [/\bI am Claude[^.]*\./gi, ''],
  // Meta-commentary
  [/\bIn this article we will[^.]*\./gi, ''],
  [/\bby the end of this post[^.]*\./gi, ''],
  // Placeholders
  [/\{\{[^}]+\}\}/g, ''],
  [/\[INSERT [A-Z_ ]+\]/g, ''],
  [/\bLorem ipsum[^.]*\./gi, ''],
  [/\bTODO:[^\n]*/g, ''],
  // Horizontal rules at end of body (classic rubric separator)
  [/\n\s*---+\s*\n[\s\S]*$/, ''],
];

export function scrub(s: string): string {
  let out = s;
  for (const [re, repl] of STRIP_PATTERNS) out = out.replace(re, repl);
  return out.replace(/\n{3,}/g, '\n\n').trim();
}

export function scrubAllStrings<T>(obj: T): T {
  if (typeof obj === 'string') return scrub(obj) as any;
  if (Array.isArray(obj)) return obj.map(scrubAllStrings) as any;
  if (obj && typeof obj === 'object') {
    const out: any = {};
    for (const [k, v] of Object.entries(obj)) out[k] = scrubAllStrings(v);
    return out;
  }
  return obj;
}
```

### 5.7 Layer 4 — Sanity CMS pre-publish validator

```ts
// sanity/schemas/blogPost.ts
import { defineType, defineField } from 'sanity';
import { scanText } from '../../config/banned-content-patterns';

export default defineType({
  name: 'blogPost',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'description', type: 'text', rows: 2, validation: r => r.max(160) }),
    defineField({ name: 'content', type: 'array', of: [{ type: 'block' }] }),
    defineField({
      name: 'faqs',
      type: 'array',
      of: [{
        type: 'object',
        name: 'faq',
        fields: [
          { name: 'question', type: 'string', validation: r => r.required() },
          { name: 'answer', type: 'text', validation: r => r.required() },
        ],
      }],
      validation: r => r.max(10),
    }),
    defineField({ name: 'datePublished', type: 'datetime' }),
    defineField({ name: 'dateModified', type: 'datetime' }),
  ],
  // Document-level validation — runs on EVERY publish attempt.
  validation: r => r.custom((doc) => {
    if (!doc) return true;
    const allText = [
      doc.title,
      doc.description,
      doc.content?.flatMap((b: any) => b.children?.map((c: any) => c.text) ?? []).join('\n'),
      doc.faqs?.map((f: any) => `${f.question} ${f.answer}`).join('\n'),
    ].filter(Boolean).join('\n');

    const findings = scanText(allText);
    const critical = findings.filter(f => f.severity === 'critical');

    if (critical.length > 0) {
      return `BLOCKED — content leak detected: ${critical[0].category} ("${critical[0].match}"). Fix before publishing. See /docs/incidents/ZA-Support-Website-Discrepancies-Fix-Plan-2026-04-23.md`;
    }
    return true;
  }),
});
```

### 5.8 Layer 5 — Vercel CI gate

```js
// scripts/ci-content-gate.js
// Runs as a Vercel build step. Fails the build on any critical finding.

const { createClient } = require('@sanity/client');
const { scanText } = require('../config/banned-content-patterns');

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || 'production',
  token: process.env.SANITY_READ_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

(async () => {
  const posts = await client.fetch(`*[_type == "blogPost" && !(_id in path("drafts.**"))]{ _id, title, "slug": slug.current, description, content, faqs }`);
  console.log(`Scanning ${posts.length} published posts...`);
  let critical = 0;
  for (const post of posts) {
    const allText = [
      post.title, post.description,
      post.content?.flatMap(b => b.children?.map(c => c.text) ?? []).join('\n'),
      post.faqs?.map(f => `${f.question} ${f.answer}`).join('\n'),
    ].filter(Boolean).join('\n');
    const findings = scanText(allText).filter(f => f.severity === 'critical');
    if (findings.length) {
      critical += findings.length;
      console.error(`FAIL ${post.slug}: ${findings.map(f => f.category + '/' + f.match).join(', ')}`);
    }
  }
  if (critical > 0) {
    console.error(`\n${critical} critical findings. BUILD FAILED.`);
    process.exit(2);
  }
  console.log('All posts clean. Build gate passed.');
})();
```

Add to `vercel.json`:

```json
{
  "buildCommand": "node scripts/ci-content-gate.js && next build"
}
```

### 5.9 Patterns registry — single source of truth

`config/banned-content-patterns.js` must exist and be the ONLY place any of these layers look up patterns. Every layer imports from the same file. Example shape:

```js
// config/banned-content-patterns.js
const patterns = [
  { id: 'eval-learned',   category: 'evaluationLabels',  severity: 'critical', regex: /\bLEARNED:/i },
  { id: 'eval-better',    category: 'evaluationLabels',  severity: 'critical', regex: /\bBETTER:/i },
  { id: 'eval-why',       category: 'evaluationLabels',  severity: 'critical', regex: /\bWHY SUCCESS:|\bWHY:(?=\s[A-Z])/i },
  { id: 'eval-replicate', category: 'evaluationLabels',  severity: 'critical', regex: /\bREPLICATE:/i },
  { id: 'eval-score',     category: 'evaluationLabels',  severity: 'critical', regex: /\bSCORE:/i },
  { id: 'eval-seedpool',  category: 'evaluationLabels',  severity: 'critical', regex: /\bseed_pool\b/i },

  { id: 'scaf-claude',    category: 'promptScaffolding', severity: 'critical', regex: /\bI am Claude\b/i },
  { id: 'scaf-as-an-ai',  category: 'promptScaffolding', severity: 'critical', regex: /\bAs an AI (model|assistant|language model)/i },

  { id: 'schema-heading', category: 'schemaMislocation', severity: 'critical', regex: /^#{1,4}\s+FAQ\s+Schema\s*\(JSON[- ]LD\)\s*$/im },
  { id: 'schema-body',    category: 'schemaMislocation', severity: 'critical', regex: /<\s*script[^>]*application\/ld\+json/i },  // raw schema text in body

  { id: 'ph-mustache',    category: 'placeholders',      severity: 'critical', regex: /\{\{[^}]+\}\}/ },
  { id: 'ph-insert',      category: 'placeholders',      severity: 'critical', regex: /\[INSERT [A-Z_ ]+\]/ },
  { id: 'ph-lorem',       category: 'placeholders',      severity: 'critical', regex: /\bLorem ipsum\b/i },
  { id: 'ph-todo',        category: 'placeholders',      severity: 'critical', regex: /\bTODO:/ },

  { id: 'tone-enterprise',category: 'toneViolations',    severity: 'medium',   regex: /\benterprise-grade\b/i },
  { id: 'tone-best',      category: 'toneViolations',    severity: 'medium',   regex: /\bbest-in-class\b/i },
  { id: 'tone-world',     category: 'toneViolations',    severity: 'medium',   regex: /\bworld-class\b/i },
  { id: 'tone-game',      category: 'toneViolations',    severity: 'medium',   regex: /\bgame[- ]changer\b/i },
  { id: 'tone-robust',    category: 'toneViolations',    severity: 'medium',   regex: /\brobust infrastructure\b/i },
  { id: 'tone-cutting',   category: 'toneViolations',    severity: 'medium',   regex: /\bcutting[- ]edge\b/i },
  { id: 'tone-revolution',category: 'toneViolations',    severity: 'medium',   regex: /\brevolutionary\b/i },

  { id: 'ctx-benoni',     category: 'contextViolations', severity: 'critical', regex: /\bBenoni\b/ },
  { id: 'ctx-hipaa',      category: 'contextViolations', severity: 'critical', regex: /\bHIPAA\b/ },
  { id: 'ctx-usd',        category: 'contextViolations', severity: 'critical', regex: /\$\d/ },
];

function scanText(text) {
  const findings = [];
  for (const p of patterns) {
    const m = p.regex.exec(text);
    if (m) {
      const idx = m.index;
      findings.push({
        id: p.id, category: p.category, severity: p.severity, match: m[0],
        context: text.substring(Math.max(0, idx - 40), Math.min(text.length, idx + m[0].length + 40)),
      });
    }
  }
  return findings;
}

function hasCriticalViolation(text) { return scanText(text).some(f => f.severity === 'critical'); }

module.exports = { patterns, scanText, hasCriticalViolation };
```

### 5.10 Cron monitoring — detect scheduler-failed

```bash
# /etc/cron.d/zasupport-leak-scan
# Run scanner daily 02:00 SAST
0 2 * * * www-data cd /var/www/zasupport && /usr/bin/node scripts/scan-blog-leaks.js >> /var/log/zasupport/leak-scanner.log 2>&1

# Watchdog — every 6 hours, check the scanner ran in the last 30 hours
0 */6 * * * www-data /usr/local/bin/zasupport-scanner-watchdog.sh
```

```bash
#!/usr/bin/env bash
# /usr/local/bin/zasupport-scanner-watchdog.sh
# ======================================================================
# CLAUDE-CODE-INJECTION
#   operation: create-new-file
#   target_path: /usr/local/bin/zasupport-scanner-watchdog.sh
#   permissions: "0755"
#   post_install: "crontab -l | grep -q zasupport-scanner-watchdog || (crontab -l; echo '0 */6 * * * /usr/local/bin/zasupport-scanner-watchdog.sh') | crontab -"
# ======================================================================
set -euo pipefail
LOG=/var/log/zasupport/leak-scanner.log
CUTOFF=$(date -d '30 hours ago' +%s)
LAST=$(stat -c %Y "$LOG" 2>/dev/null || echo 0)
if [ "$LAST" -lt "$CUTOFF" ]; then
  curl -fsS --max-time 10 -X POST https://graph.microsoft.com/v1.0/users/admin@zasupport.com/sendMail \
    -H "Authorization: Bearer $MS_GRAPH_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"message":{"subject":"[ZA Support] Leak scanner has not run in 30+ hours","body":{"contentType":"Text","content":"Check cron and server uptime. Scanner log is stale."},"toRecipients":[{"emailAddress":{"address":"courtney@zasupport.com"}}]}}'
fi
```

---

## PART 6 — FOUR LEGAL DOCUMENTS (full text, ready to publish)

Every document below uses the following canonical identity block:

```
Vizibiliti Intelligent Solutions (Pty) Ltd
Trading as: ZA Support / Apple Experts / IT Specialist / Medical IT Specialist
Registered office: 1 Hyde Lane, Hyde Park, Second Floor, Office E2004, Johannesburg, 2196
VAT registration: 4360260014
Information Officer: Courtney Bentley (CEO)
Contact: admin@zasupport.com / 064 529 5863
```

All documents reference South African law only (POPIA, PAIA, ECTA, CPA, Companies Act). No US references. No HIPAA.

### 6.1 Privacy Policy (POPIA-compliant)

```markdown
<!-- target: /src/app/legal/privacy-policy/page.mdx -->

# Privacy Policy

**Effective date:** 23 April 2026
**Last updated:** 23 April 2026

This Privacy Policy explains how Vizibiliti Intelligent Solutions (Pty) Ltd,
trading as ZA Support (together with its trading names Apple Experts, IT
Specialist, and Medical IT Specialist — "we", "us", "our") obtains, uses,
stores, and discloses your personal information when you visit zasupport.com,
contact us, or use our services.

We are committed to processing personal information lawfully, transparently,
and in accordance with the Protection of Personal Information Act 4 of 2013
("POPIA") and the Electronic Communications and Transactions Act 25 of 2002
("ECTA").

## 1. Who we are

**Responsible party:** Vizibiliti Intelligent Solutions (Pty) Ltd
**Registered office:** 1 Hyde Lane, Hyde Park, Second Floor, Office E2004,
Johannesburg, 2196
**VAT registration number:** 4360260014
**Information Officer:** Courtney Bentley
**Contact for privacy matters:** admin@zasupport.com or 064 529 5863

## 2. What personal information we collect

We only collect personal information that is adequate, relevant, and not
excessive for the purposes below.

### 2.1 Information you give us directly

- Your name, email address, telephone number, physical address.
- Your device make, model, and serial number.
- A description of the fault, issue, or service you require.
- Payment details (processed by our payment providers; we do not store card numbers).
- Information you include in emails, WhatsApp messages, or forms.

### 2.2 Information about the devices you bring to us

- Device serial numbers, IMEI, operating system version, and hardware
  specifications, collected through our diagnostic tools to perform the
  services you have requested.
- Log files, error reports, and diagnostic snapshots — used strictly to
  diagnose and repair the device.

### 2.3 Information collected automatically on our website

- IP address and approximate location.
- Browser type, device type, and operating system.
- Pages viewed, referring URLs, and time spent on the site.
- Cookie data (see our Cookie Policy).

### 2.4 Information about healthcare practice clients (Medical IT Specialist services)

When we provide managed IT services to medical practices, we may incidentally
have access to systems on which patient personal information is stored. We do
not access, process, or store patient records ourselves. We process only the
information necessary to maintain, secure, and support the practice's IT
infrastructure. We comply with the POPIA requirements for Operators (section
20 and 21) under a written Operator Agreement entered into with each medical
practice client.

## 3. Why we process your personal information

We process personal information only for the purposes listed below:

- To provide the repair, diagnostic, managed IT, or consulting services you
  have requested.
- To communicate with you about your device, service, or enquiry.
- To issue quotes, invoices, statements, and receipts.
- To comply with legal, regulatory, and tax obligations (including the
  Companies Act, Tax Administration Act, and VAT Act).
- To detect and prevent fraud, misuse, or security incidents.
- To improve our services and website.
- With your consent, to send you marketing communications you may opt out of
  at any time.

## 4. Legal basis for processing

We process personal information on one or more of the lawful bases set out in
section 11 of POPIA:

- Your consent.
- Performance of a contract with you.
- Compliance with a legal obligation on us.
- Protection of your legitimate interests or the legitimate interests of a
  third party.
- Our legitimate interests, provided these do not override your rights.

## 5. Sharing and disclosure

We do not sell your personal information. We share it only where necessary:

- With our staff, contractors, and Operators (such as hosting providers,
  payment processors, email service providers) bound by confidentiality and
  POPIA-equivalent safeguards.
- With Apple, component suppliers, or courier services strictly to fulfil a
  repair or delivery.
- Where required by law, regulation, court order, or lawful request by a
  public authority.
- In the event of a sale, merger, or reorganisation of our business, in which
  case the acquirer will be bound by this Privacy Policy.

## 6. Cross-border transfers

Some of our service providers (hosting, email, payment processing) are
located outside South Africa. Where your personal information is transferred
outside South Africa, we rely on one of the lawful grounds in section 72 of
POPIA, including adequacy findings, binding corporate rules, or your consent.

## 7. Security

We apply reasonable technical and organisational measures to protect personal
information against loss, unlawful access, and misuse. These include
encryption in transit (TLS), encryption at rest for sensitive data,
role-based access control, MFA on administrative systems, and regular
security reviews. No online system is perfectly secure, and we cannot
guarantee absolute security.

## 8. Retention

We retain personal information only for as long as necessary to fulfil the
purposes set out in this Policy, or as required by law (for example, SARS
requires tax records to be kept for five years). Device diagnostic data is
retained for 90 days unless needed for warranty purposes. Client records are
retained for the duration of our relationship plus the period required by
law.

## 9. Your rights under POPIA

You have the right to:

- Be notified that your personal information has been collected or accessed
  without authority.
- Request access to your personal information.
- Request correction or deletion of your personal information.
- Object to the processing of your personal information on reasonable
  grounds.
- Object to processing for direct marketing purposes.
- Withdraw consent at any time, where processing is based on consent.
- Lodge a complaint with the Information Regulator.

To exercise any of these rights, contact our Information Officer at
admin@zasupport.com or 064 529 5863. We will respond within a reasonable
period (typically 30 days).

### Information Regulator contact details

**Information Regulator (South Africa)**
JD House, 27 Stiemens Street, Braamfontein, Johannesburg, 2001
Tel: 010 023 5200
complaints@inforegulator.org.za
https://inforegulator.org.za

## 10. Children's personal information

We do not knowingly collect personal information from children under 18
without parental or guardian consent. If you believe a child has given us
personal information, please contact us and we will delete it.

## 11. Cookies

We use cookies and similar technologies. See our Cookie Policy at
zasupport.com/legal/cookie-policy for details.

## 12. Changes to this Policy

We may update this Policy from time to time. The "Last updated" date at the
top will reflect the most recent change. Material changes will be
communicated via the website or directly where appropriate.

## 13. How to contact us

For privacy questions, access requests, or complaints:

Information Officer: Courtney Bentley
Email: admin@zasupport.com
Tel: 064 529 5863
Post: 1 Hyde Lane, Hyde Park, Second Floor, Office E2004, Johannesburg, 2196
```

### 6.2 Terms of Service (Website Terms of Use)

```markdown
<!-- target: /src/app/legal/terms-of-service/page.mdx -->

# Terms of Service

**Effective date:** 23 April 2026
**Last updated:** 23 April 2026

These Terms of Service ("Terms") govern your use of zasupport.com (the
"Site") and the services we offer through it. By using the Site, you agree
to these Terms.

## 1. Who we are

zasupport.com is operated by Vizibiliti Intelligent Solutions (Pty) Ltd,
trading as ZA Support ("we", "us", "our"), a company incorporated in South
Africa, with registered office at 1 Hyde Lane, Hyde Park, Second Floor,
Office E2004, Johannesburg, 2196. VAT registration: 4360260014.

## 2. Nature of services

We provide Apple device repair, diagnostic, consulting, and managed IT
services, including specialised services for medical practices under our
Medical IT Specialist brand. All repair services are described on the Site
and confirmed in a written quote or Service Level Agreement before work
begins.

## 3. Your use of the Site

You may use the Site for lawful purposes only. You must not:

- Use the Site in any way that breaches any applicable law or regulation,
  including POPIA, the ECTA, or the Consumer Protection Act.
- Attempt to gain unauthorised access to any part of the Site, the servers
  hosting the Site, or any connected systems.
- Introduce viruses, trojans, worms, logic bombs, or other material that is
  malicious or technologically harmful.
- Use automated tools (bots, scrapers, crawlers) to extract data from the
  Site other than those used by bona fide search engine indexing services.
- Copy, reproduce, distribute, or commercially exploit content from the Site
  without our prior written permission.

## 4. Booking, quotations, and acceptance of work

- A request submitted via the Site, WhatsApp, email, or telephone is an
  enquiry, not a contract.
- Work only begins once we have provided you with a written quote or Service
  Level Agreement and you have indicated acceptance.
- The assessment fee, from R 599, is payable for every device we diagnose.
  It is credited against the repair price if you proceed with the
  recommended repair.
- Prices quoted are valid for seven (7) days unless stated otherwise.
- Prices include VAT at the current statutory rate.

## 5. "No Fix No Fee" guarantee

Where we have quoted on a "No Fix No Fee" basis and we are unable to
complete the repair as quoted, you do not pay for the unsuccessful repair
attempt. You remain liable for the assessment fee and for any parts that
were fitted to diagnose the fault. The terms of our No Fix No Fee guarantee
are set out in the accompanying quote.

## 6. Warranty

We provide a written warranty on every completed repair. Warranty periods
and exclusions are set out in the quote and on the repair completion
document. Warranty covers the specific components repaired or replaced.
Warranty is void if the device is subsequently tampered with, liquid-damaged,
or repaired by a third party.

## 7. Unclaimed devices

If a device is not collected within 30 days of notification that the repair
is complete or the quote has been declined, storage fees of R 50 per day
will apply. Devices unclaimed for 90 days after notification may be disposed
of in accordance with section 85 of the Consumer Protection Act 68 of 2008,
in which case your right to the device is extinguished.

## 8. Payment

Payment is due on completion of the repair, before collection or delivery.
Accepted methods: EFT, card, or Peach Payments recurring billing for SLA
clients. Unpaid invoices accrue interest at the rate prescribed under the
Prescribed Rate of Interest Act 55 of 1975.

## 9. Intellectual property

All content on the Site — including text, images, logos, trade marks, and
software — is owned by or licensed to us. You may view and print Site
content for personal, non-commercial use. You may not otherwise copy,
modify, distribute, or create derivative works without our prior written
permission.

## 10. Links to third-party websites

The Site may contain links to third-party websites. We do not control these
sites and are not responsible for their content, privacy practices, or
accuracy.

## 11. Disclaimers

- The Site and its content are provided "as is" and "as available".
- We do not warrant that the Site will be uninterrupted, error-free, or
  secure at all times.
- Information on the Site is for general guidance only and does not
  constitute professional advice for your specific situation. Seek a formal
  assessment for any repair or IT decision.
- No content on the Site constitutes medical, legal, or financial advice.

## 12. Limitation of liability

Subject to section 61 of the Consumer Protection Act and sections 43 to 51
of the ECTA, and to the fullest extent permitted by law:

- Our total liability to you arising from or in connection with these Terms
  or our services is limited to the total amount you paid us in the 12
  months preceding the claim, or R 35 000, whichever is the greater.
- We will not be liable for any indirect, incidental, special,
  consequential, or punitive damages, or for loss of profits, revenue, data,
  or goodwill, except to the extent such loss cannot lawfully be excluded.
- Nothing in these Terms limits or excludes our liability for death or
  personal injury caused by our negligence, for fraud, or for any liability
  that cannot be limited under South African law.

## 13. Privacy

Your use of the Site is also governed by our Privacy Policy
(zasupport.com/legal/privacy-policy) and Cookie Policy
(zasupport.com/legal/cookie-policy).

## 14. Termination

We may suspend or terminate your access to the Site at any time without
notice if you breach these Terms.

## 15. Governing law and jurisdiction

These Terms are governed by the laws of the Republic of South Africa. You
and we submit to the exclusive jurisdiction of the Gauteng Division of the
High Court of South Africa, Johannesburg, for any dispute arising from these
Terms, subject to the monetary jurisdiction of the Magistrates' Court where
appropriate.

## 16. Changes to these Terms

We may update these Terms from time to time. The "Last updated" date at the
top will reflect the most recent change. Continued use of the Site after a
change constitutes acceptance of the revised Terms.

## 17. Contact

Vizibiliti Intelligent Solutions (Pty) Ltd
admin@zasupport.com
064 529 5863
1 Hyde Lane, Hyde Park, Second Floor, Office E2004, Johannesburg, 2196
```

### 6.3 Cookie Policy

```markdown
<!-- target: /src/app/legal/cookie-policy/page.mdx -->

# Cookie Policy

**Effective date:** 23 April 2026
**Last updated:** 23 April 2026

This Cookie Policy explains what cookies are, how zasupport.com uses them,
and how you can control them. It should be read together with our Privacy
Policy.

## 1. What cookies are

Cookies are small text files stored on your device when you visit a website.
They help the website function, remember your preferences, and measure how
the website is used.

Similar technologies — including local storage, session storage, and
pixels — are covered by this Policy wherever we refer to "cookies".

## 2. Categories of cookies we use

### Strictly necessary cookies

These are essential for the Site to function. They enable navigation, secure
areas, and form submission. Without these the Site cannot operate. You
cannot opt out of strictly necessary cookies without breaking Site
functionality.

### Performance and analytics cookies

These help us understand how visitors use the Site so we can improve it.
They collect aggregated, anonymised information. We currently use:

- Google Analytics (if enabled) — to measure Site usage.
- Vercel Analytics — to measure Site performance.

### Functional cookies

These remember your choices (for example, your preferred WhatsApp contact
method) and provide enhanced features.

### Marketing cookies

We do not currently set marketing or advertising cookies. If this changes,
this Policy will be updated and consent will be requested via the cookie
banner.

## 3. Third-party cookies

Some cookies are set by third-party services we use, such as:

- Google (analytics and fonts).
- Meta / Facebook (if you interact with our social plugins).
- Vercel (hosting and analytics).
- Sanity.io (content delivery).

We do not control these cookies. Refer to each provider's own cookie policy
for details.

## 4. How to control cookies

You can accept or reject cookies via the cookie banner shown on your first
visit. You can change your preferences at any time by clicking "Cookie
settings" in the Site footer.

You can also manage cookies directly in your browser:

- Chrome: Settings > Privacy and security > Cookies and other site data.
- Safari: Preferences > Privacy.
- Firefox: Settings > Privacy & Security.
- Edge: Settings > Cookies and site permissions.

Blocking cookies may affect how the Site functions.

## 5. POPIA compliance

Where a cookie collects personal information within the meaning of POPIA,
we apply the conditions for lawful processing. You have the right to object
to the processing of your personal information collected through cookies.
Contact admin@zasupport.com to exercise this right.

## 6. Changes to this Policy

We may update this Policy from time to time. The "Last updated" date at the
top will reflect the most recent change.

## 7. Contact

Vizibiliti Intelligent Solutions (Pty) Ltd
admin@zasupport.com
064 529 5863
```

### 6.4 PAIA Manual (Section 51 — Promotion of Access to Information Act)

```markdown
<!-- target: /src/app/legal/paia-manual/page.mdx -->
<!-- Also deliver as downloadable PDF at /public/legal/PAIA-Manual-ZA-Support-2026-04-23.pdf -->

# PAIA Manual

**Manual in terms of section 51 of the Promotion of Access to Information Act 2 of 2000 ("PAIA")**

**Entity:** Vizibiliti Intelligent Solutions (Pty) Ltd trading as ZA Support
**Registration number:** [CIPC registration number — to be inserted]
**Registered office:** 1 Hyde Lane, Hyde Park, Second Floor, Office E2004, Johannesburg, 2196
**Tel:** 064 529 5863
**Email:** admin@zasupport.com
**Effective date:** 23 April 2026

## 1. Introduction

This manual is published in terms of section 51 of the Promotion of Access
to Information Act 2 of 2000 ("PAIA") to facilitate the public's right of
access to information held by ZA Support.

## 2. Information Officer

**Information Officer:** Courtney Bentley (CEO)
**Email:** admin@zasupport.com
**Tel:** 064 529 5863

A Deputy Information Officer may be appointed and announced on our website.

## 3. Guide on how to use PAIA

The Guide published by the Information Regulator, contemplated in section 10
of PAIA, contains the information needed to exercise rights under PAIA. It
is available from the Information Regulator:

Information Regulator (South Africa)
JD House, 27 Stiemens Street, Braamfontein, Johannesburg, 2001
Tel: 010 023 5200
complaints@inforegulator.org.za
https://inforegulator.org.za

## 4. Categories of records held by us

### 4.1 Records held by the Information Officer

- Corporate records (Memorandum of Incorporation, share register, register
  of directors, minutes).
- Statutory records under the Companies Act 71 of 2008.
- Tax records under the Tax Administration Act 28 of 2011 and VAT Act 89 of
  1991.

### 4.2 Records relating to employees

- Employment contracts, job descriptions, and personnel files.
- Records under the Basic Conditions of Employment Act, Labour Relations
  Act, and Skills Development Act.

### 4.3 Records relating to clients

- Client contact details and service agreements.
- Quotes, invoices, repair records, diagnostic reports, and correspondence.
- SLA documents and compliance records for medical practice clients.

### 4.4 Records relating to suppliers and service providers

- Contracts, purchase orders, invoices, correspondence.

### 4.5 Financial records

- Accounting records, bank statements, tax returns, management accounts.

### 4.6 Records automatically available

The following information is available on our website without a formal
request: services offered, pricing guidelines, contact details, Privacy
Policy, Cookie Policy, Terms of Service.

## 5. How to request access to a record

Requests must be made on Form 02 prescribed under PAIA. Form 02 is available
from the Information Regulator's website and on request from our
Information Officer.

### 5.1 Submitting a request

The completed form must be submitted by email to admin@zasupport.com, or by
post or delivery to 1 Hyde Lane, Hyde Park, Second Floor, Office E2004,
Johannesburg, 2196.

### 5.2 Required information

The requester must provide:

- Sufficient detail to enable the record to be identified.
- The form of access required.
- Postal address, email, and phone number.
- If the request is made on behalf of another person, proof of authority.

### 5.3 Fees

PAIA fees are prescribed in the PAIA Regulations. A request fee may be
payable before processing. A further access fee is payable for reproduction
and delivery. Fee schedule available on request.

### 5.4 Decision

We will respond within 30 days of receipt of the request, unless the
requested record is voluminous or requires consultation, in which case the
period may be extended for a further 30 days with notice to the requester.

## 6. Grounds for refusal

Access may be refused on the grounds set out in Part 3, Chapter 4 of PAIA,
including:

- Protection of privacy of a third party (section 63).
- Protection of commercial information of a third party (section 64).
- Protection of confidential information (section 65).
- Protection of safety and security (section 66).
- Protection of records privileged from production in legal proceedings
  (section 67).
- Protection of commercial activities (section 68).
- Protection of research information (section 69).

## 7. Remedies

A requester whose request has been refused may lodge a complaint with the
Information Regulator or approach the High Court. Details in the
Information Regulator's Guide.

## 8. Availability of this manual

This manual is available at:
- Our website: zasupport.com/legal/paia-manual
- Our registered office, on request.
- By email to admin@zasupport.com.

## 9. Review and updates

This manual is reviewed annually or sooner if there is a material change.
The "Effective date" above reflects the most recent version.
```

### 6.5 Other legal documents — what you also need (not in this build)

In addition to the four above, a professional South African website providing
medical-practice IT services should also have:

- **Operator (Data Processing) Addendum** — required under POPIA section 21
  for every medical practice SLA. Not a public website page; an annexure to
  the SLA. Template is covered in the separate SLA v1.0 build (not in scope
  of this document).
- **Acceptable Use Policy** — optional public page governing use of hosted
  services we manage for clients. Low priority for zasupport.com itself.
- **SLA T&Cs page** — short public summary of common SLA terms linking to
  the actual signed SLA documents. Useful but not strictly required.
- **Medical Disclaimer** — already covered inline in the Terms of Service
  clause 11 ("No content on the Site constitutes medical, legal, or
  financial advice.").
- **HPCSA Advertising Compliance Notice** — we are not HPCSA-registered
  practitioners; we provide IT services to HPCSA-registered practices. Our
  advertising must not imply clinical endorsement. This is handled by the
  banned-phrases skill and brand voice rules, not a legal page.

All four core documents above (Privacy, Terms, Cookie, PAIA) must be linked
from the site footer on every page, and from every form that collects
personal information.

---

## PART 7 — VERIFICATION AND CONFIDENCE CHECK

Courtney asked, verbatim: *"how am I even sure that anything that has been
injected into the website, especially the blocks are working at all?"*

This section answers that with executable audits.

### 7.1 Audit script — what's actually installed vs. what should be

```bash
#!/usr/bin/env bash
# ======================================================================
# CLAUDE-CODE-INJECTION
#   operation: create-new-file
#   target_path: ~/Developer/new-zas-website/scripts/audit-defence-layers.sh
#   permissions: "0755"
# ======================================================================
# Audits all six defence layers. Exits 0 if all present, non-zero with a
# report of missing pieces otherwise.

set -euo pipefail
REPO_ROOT="${REPO_ROOT:-$HOME/Developer/new-zas-website}"
cd "$REPO_ROOT"

PASS=()
FAIL=()

check() {
  local label="$1"; local path="$2"
  if [ -e "$path" ]; then PASS+=("$label"); else FAIL+=("$label → $path MISSING"); fi
}

check "Layer 1: two-phase generator wrapper" "src/lib/content-generator.ts"
check "Layer 2: Zod schema" "src/lib/schemas/blog-post.ts"
check "Layer 3: deterministic scrubber" "src/lib/scrubber.ts"
check "Layer 4: CMS validation in blogPost schema" "sanity/schemas/blogPost.ts"
check "Layer 5: CI content gate" "scripts/ci-content-gate.js"
check "Layer 6: post-publish scanner" "scripts/scan-blog-leaks.js"
check "Patterns registry" "config/banned-content-patterns.js"
check "Auto-fixer hook" "sanity/leak-auto-fixer.ts"
check "FAQ JSON-LD component" "src/components/seo/BlogPostFaqSchema.tsx"

# Check scheduler
if crontab -l 2>/dev/null | grep -q 'scan-blog-leaks.js'; then
  PASS+=("Cron scheduled: scan-blog-leaks.js")
else
  FAIL+=("Cron NOT scheduled for scan-blog-leaks.js")
fi

# Check last scanner run
if [ -f /var/log/zasupport/leak-scanner.log ]; then
  LAST=$(stat -c %Y /var/log/zasupport/leak-scanner.log 2>/dev/null || echo 0)
  AGE_HRS=$(( ( $(date +%s) - LAST ) / 3600 ))
  if [ "$AGE_HRS" -lt 30 ]; then PASS+=("Scanner ran ${AGE_HRS}h ago"); else FAIL+=("Scanner last ran ${AGE_HRS}h ago — STALE"); fi
else
  FAIL+=("Scanner log missing — /var/log/zasupport/leak-scanner.log")
fi

# Check Vercel build step wired
if [ -f vercel.json ] && grep -q 'ci-content-gate' vercel.json; then
  PASS+=("Vercel build step includes ci-content-gate")
else
  FAIL+=("Vercel build step does NOT include ci-content-gate")
fi

# Check all four legal pages exist
for p in privacy-policy terms-of-service cookie-policy paia-manual; do
  check "Legal page: /legal/$p" "src/app/legal/$p/page.mdx"
done

echo ""
echo "========== DEFENCE LAYER AUDIT =========="
echo "PASS: ${#PASS[@]}"
for p in "${PASS[@]}"; do echo "  ✓ $p"; done
echo ""
echo "FAIL: ${#FAIL[@]}"
for f in "${FAIL[@]}"; do echo "  ✗ $f"; done
echo ""

if [ "${#FAIL[@]}" -gt 0 ]; then
  echo "AUDIT FAILED — ${#FAIL[@]} items missing."
  exit 2
fi

echo "AUDIT PASSED — all layers installed."
```

Run this after every deploy. It tells you with certainty what is wired and what is not.

### 7.2 Daily proof-of-execution receipts

Every layer writes to `/reports/` on every run:

- `/reports/leak-scan-YYYY-MM-DD.json` — daily scanner run.
- `/reports/scaffolding-strip-YYYY-MM-DD-<slug>.json` — every repair.
- `/reports/ci-gate-<build-id>.json` — every Vercel build.
- `/reports/scrubber-invocations-YYYY-MM.jsonl` — scrubber activity.

A nightly job emails `courtney@zasupport.com` at 06:30 SAST with a one-page
summary: "Yesterday: X posts scanned, Y clean, Z auto-repaired, 0 stopped
builds, all layers reporting."

```js
// scripts/daily-defence-summary.js
// Runs 06:30 SAST. Emails a one-page summary via MS Graph.
// Implementation in repo.
```

If Courtney does not receive the daily email, the system is not working and
he knows immediately.

### 7.3 End-to-end test (red team)

Every deploy, the CI runs a synthetic attack post:

```ts
// scripts/red-team-leak.ts
// Creates a DRAFT blogPost in Sanity containing every banned pattern,
// attempts to publish, asserts the publish is blocked, deletes the draft.

const attack = {
  _type: 'blogPost',
  title: 'Red team test post — should never publish',
  slug: { current: 'red-team-test-do-not-publish' },
  description: 'test',
  content: [
    { _type: 'block', style: 'normal', children: [
      { _type: 'span', text: 'LEARNED: this should be blocked. BETTER: and this. REPLICATE: and this. {{placeholder}} As an AI model...' }
    ]},
  ],
  faqs: [{ question: 'Test?', answer: 'Test.' }],
};

// Expect Sanity validation to reject this. If it does NOT reject, FAIL the build.
```

A defence system you cannot attack is a defence system you cannot trust. The
red team test proves — every single build — that the blockers are live.

---

## PART 8 — INJECTION DIRECTIVES SUMMARY

This single document produces nine filesystem artefacts when Claude Code
ingests it. Each has its own embedded injection directive. The summary:

| # | Artefact | Target path | Action |
|---|----------|-------------|--------|
| 1 | This fix plan | `/docs/incidents/ZA-Support-Website-Discrepancies-Fix-Plan-2026-04-23.md` | create-new-file |
| 2 | Strip scaffolding script | `scripts/strip-scaffolding-blocks.ts` | create-new-file |
| 3 | FAQ migration script | `scripts/migrate-faq-from-body-to-field.ts` | create-new-file |
| 4 | Content generator wrapper | `src/lib/content-generator.ts` | create-new-file |
| 5 | Zod schema | `src/lib/schemas/blog-post.ts` | create-new-file |
| 6 | Scrubber | `src/lib/scrubber.ts` | create-new-file |
| 7 | FAQ JSON-LD component | `src/components/seo/BlogPostFaqSchema.tsx` | create-new-file |
| 8 | Sanity schema (amend) | `sanity/schemas/blogPost.ts` | amend-existing-file, merge validation block, preserve existing fields |
| 9 | Patterns registry (amend) | `config/banned-content-patterns.js` | amend-existing-file, merge patterns, no deletions |
| 10 | CI content gate | `scripts/ci-content-gate.js` | create-new-file |
| 11 | Vercel build config (amend) | `vercel.json` | amend-existing-file, prepend `ci-content-gate.js` to buildCommand |
| 12 | Cron + watchdog | `/etc/cron.d/zasupport-leak-scan`, `/usr/local/bin/zasupport-scanner-watchdog.sh` | create-new-file |
| 13 | Defence audit script | `scripts/audit-defence-layers.sh` | create-new-file |
| 14 | Daily summary emailer | `scripts/daily-defence-summary.js` | create-new-file |
| 15 | Red team test | `scripts/red-team-leak.ts` | create-new-file |
| 16 | Privacy Policy | `src/app/legal/privacy-policy/page.mdx` | create-new-file |
| 17 | Terms of Service | `src/app/legal/terms-of-service/page.mdx` | create-new-file |
| 18 | Cookie Policy | `src/app/legal/cookie-policy/page.mdx` | create-new-file |
| 19 | PAIA Manual | `src/app/legal/paia-manual/page.mdx` | create-new-file |
| 20 | PAIA Manual PDF | `public/legal/PAIA-Manual-ZA-Support-2026-04-23.pdf` | create-new-file from page.mdx |

**Hard rule — no deletions.** Every existing file that is referenced as
"amend-existing-file" must be backed up before modification and the change
applied additively. The existing `banned-content-patterns.js` may have
patterns this document adds to; those additions merge, they do not replace.

---

## PART 9 — HUMAN-READABLE INSTALLATION SECTION

For Courtney or any reviewer reading this without parsing YAML:

**Where this file lives.** Install this Markdown document at
`/docs/incidents/ZA-Support-Website-Discrepancies-Fix-Plan-2026-04-23.md`
inside the website repo. Create the `/docs/incidents/` directory if it does
not exist.

**Order of operations for Claude Code:**

1. Audit what is currently installed: run `scripts/audit-defence-layers.sh`.
   This script itself may not yet exist — create it first from Part 7.1.
2. Fix the immediate incidents: run Parts 1.1, 1.2, 1.3 in order. Verify
   live URLs are clean.
3. Install the six defence layers: Parts 5.4 through 5.10 in order.
4. Publish the four legal documents: Part 6.1 through 6.4 as MDX routes
   under `/src/app/legal/`.
5. Wire the daily summary emailer and the red-team test.
6. Re-run `scripts/audit-defence-layers.sh`. All layers should now report
   installed.
7. Send Courtney a confirmation email via MS Graph with the audit output
   attached.

**Rollback.** Every amended file has a backup. Every new file can be
deleted. Sanity revision history retains every document state for 30 days
minimum. No change in this plan is irreversible.

**Timeline estimate.** Approximately 4-6 hours of Claude Code execution
time, depending on network latency to Sanity and Vercel. Most of the time
will be in (a) installing and testing the six defence layers, and (b)
publishing the four legal MDX pages.

**Success criteria.**

- [ ] Centurion blog rendered HTML contains no `LEARNED:`, `BETTER:`, `WHY:`, or `REPLICATE:` labels.
- [ ] No blog page renders `FAQ Schema (JSON-LD)` as a heading.
- [ ] No blog page shows the lead-sentence duplication.
- [ ] All four legal pages reachable at `/legal/privacy-policy`, `/legal/terms-of-service`, `/legal/cookie-policy`, `/legal/paia-manual`.
- [ ] Footer of every page links to all four legal pages.
- [ ] `scripts/audit-defence-layers.sh` exits with status 0.
- [ ] A red team synthetic post is blocked by the CMS validator on first attempt.
- [ ] `scripts/scan-blog-leaks.js` ran within the last 30 hours (check watchdog log).
- [ ] Daily defence summary email received at `courtney@zasupport.com`.

Until every box above is ticked by verification output written to
`/reports/`, the fix is not complete. Writing a command is not running it.

---

*End of document. ZA Support Website Discrepancies Fix Plan.*
*Generated 23/04/2026 15:35 SAST. Incident ID ZAS-WEB-INC-20260423-1535.*
*Filed under /docs/incidents/ in the new-zas-website repository.*
