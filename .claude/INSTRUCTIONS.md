# ZA Support Website — Claude Code Instructions
# Project: new-zas-website | Stack: Next.js 15, Tailwind, Sanity CMS
# Owner: Courtney Bentley | Last Updated: 10/03/2026
# CRITICAL: Read this file BEFORE writing any page or editing any existing page.

---

## SECTION 1: WORKFLOW — PROPOSE BEFORE BUILDING (MANDATORY)

Before writing any new page or editing any existing page, output a proposal block:

```
PROPOSED CHANGES:
• Page(s): [list]
• Why: [SEO gap / missing revenue page / client request]
• What changes on screen: [visible content]
• What changes invisibly: [schema, meta, links]
• Estimated SEO lift: [score change]
• Design risk: NONE / LOW / MEDIUM (with reason)

Proceed? → wait for "go" / "yes" / any affirmative
```

Exception: pure schema additions to existing pages (no visible content change) — safe to execute without proposal.

---

## SECTION 2: DESIGN SYSTEM (NEVER DEVIATE — ALL PAGES MUST USE THESE)

### Colour Palette
```
Background primary:   #0A1A18 (dark teal — main page background)
Background secondary: #111C1A (slightly lighter — alternating sections)
Text primary:         #E8F4F1 (near-white — headings)
Text secondary:       #7A9E98 (muted teal — body text, labels)
Accent green:         #0FEA7A (ZA Support green — CTAs, highlights, icons)
Glass card border:    rgba(255,255,255,0.06)
Accent border:        rgba(15,234,122,0.2)
```

### Typography
```
Headings (H1–H3): font-family: 'Syne, sans-serif' — always extrabold (font-weight: 800)
Body: system default (Tailwind prose defaults)
```

### CSS Classes (reuse these — do NOT invent new ones)
```
.hero-gradient       — hero section background gradient
.grid-overlay        — subtle grid texture on hero
.glass-card          — card component (dark glass, border, rounded-xl)
```

### Section Pattern (every page follows this exact alternating pattern)
```
Section 1: Hero          → bg hero-gradient + grid-overlay, pt-32 pb-16
Section 2: Main content  → bg #0A1A18, py-20
Section 3: Secondary     → bg #111C1A, py-20
Section 4: Trust/social  → bg #0A1A18, py-20
Section 5: FAQ           → bg #111C1A, py-20
Section 6: CTA footer    → bg #0A1A18, py-16
```

### Component Inventory (use these — do NOT rebuild them)
```
src/components/ui/Breadcrumb.tsx    — breadcrumb nav
src/components/ui/FAQ.tsx           — FAQ accordion
src/components/ui/Layout.tsx        — nav + footer wrapper
src/components/seo/SchemaOrg.tsx    — injects JSON-LD schema
src/lib/constants.ts                — CONTACT, SITE, REVIEWS, SOCIAL constants
```

### CTA Button Pattern (ALWAYS use both options)
```tsx
<a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl font-bold">
  <Phone className="w-5 h-5" /> Call {CONTACT.phone}
</a>
<Link href="/contact" className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold">
  Get a Quote <ArrowRight className="w-5 h-5" />
</Link>
```

---

## SECTION 3: SEO RULES — APPLY TO EVERY NEW OR EDITED PAGE

### 3.1 Meta — Required on Every Page
```tsx
export const metadata: Metadata = {
  title: '[Service] [City] | [Price Anchor if applicable] | ZA Support',
  // Max 60 chars. Include primary keyword + city.
  description: '[Service] in [City] from [price]. [Differentiator]. [CTA with phone].',
  // 150–160 chars. Include service, city, price/warranty, CTA.
  alternates: { canonical: 'https://zasupport.com/[exact-path]' },
  // Canonical is MANDATORY — prevents duplicate content penalties.
};
```

### 3.2 H Heading Structure — Required on Every Service Page
```
H1: [Primary keyword] — [city] — ONE per page, in hero section
H2: [Major section headings — 4–7 per page]
H3: [Sub-topics, FAQ questions, process steps]
```
Rule: H1 must include the primary keyword AND "Johannesburg" or the target suburb.

### 3.3 Content Depth — MINIMUM REQUIREMENTS
| Page Type | Minimum Word Count | Required Sections |
|---|---|---|
| Service sub-page (e.g. /macbook-repair/battery) | 800 words | symptoms, pricing, process, service area, FAQ, technician, CTA |
| Service hub (e.g. /macbook-repair) | 600 words | service grid, model list, trust stats, FAQ, CTA |
| Blog post | 1,200 words | intro, body (H2/H3 structured), FAQ, internal links, CTA |
| Location page | 500 words | local signals, service list, map, NAP |

### 3.4 Required Content Sections — ALL Service Sub-Pages Must Have
1. **Symptoms/When you need this service** (matches search intent)
2. **Pricing table** by model (transparency = E-E-A-T signal)
3. **Process steps** (numbered, builds trust)
4. **Service area section** — always include: Hyde Park, Sandton, Rosebank, Illovo, Melrose, Parktown North, Bryanston, Fourways, Midrand, Randburg
5. **Technician/author line** — "Repairs performed by Courtney Bentley — 14 years Apple experience, 3,000+ repairs completed."
6. **FAQ section** (6–8 questions minimum, using FAQAccordion component)
7. **Internal links** (3–5 contextual links within body text — see 3.6)
8. **External links** (1–2 links to Apple Support documentation — see 3.7)
9. **CTA section** (always both: call + WhatsApp)

### 3.5 Schema — REQUIRED ON EVERY PAGE

#### ALWAYS include (all pages):
```tsx
// BreadcrumbList — every sub-page
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: '[Hub]', item: 'https://zasupport.com/[hub]' },
    { '@type': 'ListItem', position: 3, name: '[Page]', item: 'https://zasupport.com/[hub]/[page]' },
  ],
};
```

#### ALWAYS include on service pages (hub and sub-pages):
```tsx
// AggregateRating — adds ★★★★★ to Google search result listings
const aggregateRating = {
  '@type': 'AggregateRating',
  ratingValue: SITE.rating,       // '4.9'
  reviewCount: '120',             // use SITE.reviewCount, strip non-numeric
  bestRating: '5',
  worstRating: '1',
};

// Service schema with AggregateRating embedded
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: '[Service Name]',
  provider: {
    '@type': 'LocalBusiness',
    name: SITE.name,
    telephone: CONTACT.phone,
    url: 'https://zasupport.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT.address.street,
      addressLocality: CONTACT.address.city,
      addressRegion: CONTACT.address.province,
      postalCode: CONTACT.address.postalCode,
      addressCountry: 'ZA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -26.1348,
      longitude: 28.0469,
    },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '08:00', closes: '17:30' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '09:00', closes: '13:00' },
    ],
    aggregateRating,
  },
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Hyde Park' },
    { '@type': 'Neighborhood', name: 'Sandton' },
    { '@type': 'Neighborhood', name: 'Rosebank' },
  ],
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: '[lowest price — digits only]',
    highPrice: '[highest price — digits only]',
    priceCurrency: 'ZAR',
  },
};
```

#### ALWAYS include on pages with FAQ sections:
```tsx
// FAQPage schema — enables featured snippets + AI Overview citations
// NOTE: Google removed the visual dropdown for non-government sites in 2023.
// FAQPage schema is still valuable for featured snippets + AI Overviews — always implement.
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};
```

#### Include on homepage and About page:
```tsx
// LocalBusiness — full declaration with all fields
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'ZA Support (Apple Experts)',
  alternateName: 'ZA Support',
  description: 'Apple repair specialists in Johannesburg. MacBook, iPhone, iPad repair. Liquid damage, logic board, battery, screen. No Fix No Fee. Hyde Park.',
  url: 'https://zasupport.com',
  telephone: CONTACT.phone,
  email: 'admin@zasupport.com',
  priceRange: 'RR',
  currenciesAccepted: 'ZAR',
  paymentAccepted: 'Cash, Credit Card, EFT',
  address: { '@type': 'PostalAddress', ... },
  geo: { '@type': 'GeoCoordinates', latitude: -26.1348, longitude: 28.0469 },
  openingHours: ['Mo-Fr 08:00-17:30', 'Sa 09:00-13:00'],
  aggregateRating,
  sameAs: [SOCIAL.facebook, SOCIAL.instagram, SOCIAL.twitter],
  hasMap: CONTACT.googleMapsUrl,
  founder: { '@type': 'Person', name: 'Courtney Bentley' },
};
```

### 3.6 Internal Linking Rules (apply within body text)
- Every service sub-page links back to its hub: `/macbook-repair/battery` → `/macbook-repair`
- Every hub page links to all its sub-pages
- Cross-link related services: battery page mentions liquid damage → link to `/liquid-damage/macbook-air`
- Minimum 3 contextual links per service page (within paragraph text, not just navigation)
- Anchor text: use the keyword of the destination page, e.g. "MacBook liquid damage repair" not "click here"

**Internal link map:**
```
/macbook-repair → /macbook-repair/battery, /macbook-repair/screen, /macbook-repair/keyboard, /liquid-damage, /logic-board-repair
/liquid-damage → /liquid-damage/macbook-pro, /liquid-damage/macbook-air, /macbook-repair
/logic-board-repair → /logic-board-repair/macbook-pro, /logic-board-repair/macbook-air, /liquid-damage
/iphone-repair → /iphone-repair/battery, /iphone-repair/screen, /iphone-repair/charging
/apple-repair → ALL hub pages (it is the master hub)
Blog posts → relevant service page (always link from blog to the service being discussed)
```

### 3.7 External Linking Rules
- Add 1–2 external links to Apple Support per relevant service page
- Use `target="_blank" rel="noopener noreferrer"` on all external links
- Approved external link targets:
  - `https://support.apple.com/batteries` — battery health information
  - `https://support.apple.com/mac` — general Mac support
  - `https://support.apple.com/iphone` — iPhone support
  - `https://support.apple.com/ipad` — iPad support
  - Apple's official repair program pages (AppleCare, self-service)
- NEVER link to competitors

### 3.8 Local SEO — Required on Every Service Page
The following service area text must appear on every service page (can be a dedicated H2 section or embedded in body):
```
We serve clients across Johannesburg North, including Hyde Park, Sandton, Rosebank,
Illovo, Melrose, Parktown North, Bryanston, Fourways, Midrand, and Randburg.
Most repairs are same-day — drop off in the morning, collect in the afternoon.
```

### 3.9 E-E-A-T Signals — Required on Every Service Page
Include at minimum ONE of these per page (in the hero section OR as a dedicated sub-section):
- `"Repaired by Courtney Bentley — 14 years Apple experience, 3,000+ devices repaired in Johannesburg."`
- `"[N]+ MacBook batteries replaced in Johannesburg since 2012."`
- `"Founded 2012. Hyde Park, Johannesburg. VAT registered: 436-026-0014."`

### 3.10 Sitemap — Update on Every New Page
File: `src/app/sitemap.ts`
- Priority rules: homepage 1.0 | hub pages 0.9 | service sub-pages 0.8–0.85 | blog 0.6 | static 0.7
- changeFrequency: homepage + blog = 'weekly' | service pages = 'monthly'

---

## SECTION 4: PAGE INVENTORY

### Existing Pages (do NOT recreate)
```
/ (homepage)
/about
/services
/contact
/blog
/blog/[slug]
/apple-repair (master hub)
/macbook-repair (hub)
/macbook-repair/battery
/macbook-repair/screen
/macbook-repair/keyboard
/liquid-damage (hub)
/liquid-damage/macbook-pro
/liquid-damage/macbook-air
/liquid-damage/iphone
/liquid-damage/ipad
/liquid-damage/imac
/liquid-damage/apple-watch
/logic-board-repair (hub)
/logic-board-repair/macbook-pro
/logic-board-repair/macbook-air
/logic-board-repair/imac
/logic-board-repair/mac-mini
/iphone-repair (hub)
/iphone-repair/screen
/iphone-repair/battery
/iphone-repair/back-glass
/iphone-repair/camera
/iphone-repair/charging
/ipad-repair (hub)
/ipad-repair/screen
/ipad-repair/battery
/ipad-repair/charging
/ipad-repair/liquid-damage
/apple-support (hub)
/apple-support/business
/apple-support/enterprise
/managed-services (hub)
/managed-services/apple-specialist (redirects to /managed-services)
/managed-services/it-support (redirects to /managed-services)
/jamf-mdm
```

### High-Priority Missing Pages (build next in this order)
```
1. /macbook-pro-repair      — "MacBook Pro repair Johannesburg" (high volume)
2. /macbook-air-repair      — "MacBook Air repair Johannesburg" (high volume)
3. /imac-repair             — "iMac repair Johannesburg" (missing entirely)
4. /macbook-repair/trackpad — completes MacBook sub-page set
5. /apple-watch-repair      — separate from liquid-damage/apple-watch
6. /mac-mini-repair         — currently only under logic-board
7. /data-recovery           — "Mac data recovery Johannesburg" (high commercial intent)
8. /health-check            — Health Check AI diagnostic service landing page
```

---

## SECTION 5: BRAND RULES

- Business name: **ZA Support** (main) or **ZA Support (Apple Experts)** (longer form)
- Never: "ZASupport", "za-support", "ZAS"
- Tagline: "Practice IT. Perfected." — use on About, Contact, and homepage only
- Phone: 064 529 5863 | Tel href: +27645295863
- Address: 1 Hyde Lane, Second Floor, Office E2004, Hyde Park, Johannesburg, 2196
- Currency: R with space — R 1,200 not R1200 and not R1,200
- Dates: DD/MM/YYYY
- No em dashes (—) in client-facing content (per global CLAUDE.md rule)

---

## SECTION 6: MONITORING & ANALYTICS (PENDING SETUP)

### Required (not yet set up)
- **Google Search Console**: Add property for zasupport.com, verify via DNS TXT record
- **Google Analytics 4**: Add GA4 measurement ID to Next.js layout
- **Google Business Profile**: Verify all fields complete, 20+ photos, responses to all reviews

### Already Active
- Vercel Analytics: `@vercel/analytics` in package.json — Core Web Vitals monitoring
- Vercel Speed Insights: `@vercel/speed-insights` — LCP/CLS/INP tracking

### When to Add GA4
Add to `src/app/layout.tsx`:
```tsx
import { GoogleAnalytics } from '@next/third-parties/google'
// In <html> body: <GoogleAnalytics gaId="G-XXXXXXXXXX" />
```
Requires: GA4 Measurement ID from Google Analytics account.

---

## SECTION 7: ANTI-PATTERNS — NEVER DO THESE

1. NEVER write a new page without including BreadcrumbList + Service schema
2. NEVER write a service page under 400 words of visible content
3. NEVER use inline colours that differ from the design system palette
4. NEVER create a new Tailwind CSS class when an existing one works
5. NEVER hardcode phone number — always use `CONTACT.phone` / `CONTACT.phoneTel`
6. NEVER hardcode site URL — always use `https://zasupport.com` (from SITE.url)
7. NEVER import REVIEWS as an aggregate — it is an array; use SITE.rating + SITE.reviewCount
8. NEVER push without running `npm run build` first — 0 errors required
9. NEVER add a page without updating `src/app/sitemap.ts`
10. NEVER use `rel="nofollow"` on external links to Apple Support — it is informational, not commercial
