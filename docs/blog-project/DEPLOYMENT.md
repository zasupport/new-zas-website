# Perfect Blog Creator — Deployment Runbook

**Target environment:** Next.js 15 App Router + Sanity CMS + Vercel
**Estimated deployment time:** 2-3 hours
**Prerequisites:** Access to the new-zas-website repository, Sanity Studio, Vercel deployment

---

## STAGE 1 — INSTALL THE SKILL (5 minutes)

The Perfect Blog Creator skill governs all future blog content. Install it first.

```bash
# Navigate to your Claude Code skills directory
cd ~/.claude/skills/user/

# Or if working in a project context
cd /path/to/new-zas-website/.claude/skills/

# Create the skill directory
mkdir -p perfect-blog-creator

# Copy SKILL.md into the directory
cp /path/to/perfect-blog/SKILL.md perfect-blog-creator/

# Verify
ls perfect-blog-creator/SKILL.md
```

After installation, the skill will trigger automatically on any blog-related request.

---

## STAGE 2 — INSTALL COMPONENTS (15 minutes)

```bash
# Navigate to the Next.js project root
cd /path/to/new-zas-website

# Create the blog components directory
mkdir -p components/blog

# Copy components
cp /path/to/perfect-blog/components/AuthorBox.tsx components/blog/
cp /path/to/perfect-blog/components/BlogSchema.tsx components/blog/
cp /path/to/perfect-blog/components/HowToSchema.tsx components/blog/
cp /path/to/perfect-blog/components/BlogComponents.tsx components/blog/

# SiteSchema goes in the root components folder (it's site-wide, not blog-specific)
cp /path/to/perfect-blog/components/SiteSchema.tsx components/

# Verify
ls components/blog/ components/SiteSchema.tsx
```

### Add SiteSchema to root layout

Edit `app/layout.tsx`:

```tsx
import { SiteSchema } from '@/components/SiteSchema'

export default function RootLayout({ children }) {
  return (
    <html lang="en-ZA">
      <head>
        <SiteSchema />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

---

## STAGE 3 — INSTALL ASSETS (10 minutes)

Author photos and workshop images need to be optimised to WebP and placed in /public.

```bash
# Create directories
mkdir -p public/authors
mkdir -p public/blog/workshop

# Convert PNGs to WebP (requires cwebp from libwebp)
# Install: brew install webp  (macOS) or apt install webp (Linux)

# Author photos (200x200, q=85)
cwebp -q 85 -resize 400 400 /path/to/perfect-blog/assets/courtney-bentley-author.png \
  -o public/authors/courtney-bentley.webp

cwebp -q 85 -resize 400 400 /path/to/perfect-blog/assets/mary-blount-safety-goggles-workshop.png \
  -o public/authors/mary-blount.webp

# Workshop photos for blog content
cwebp -q 85 -resize 1200 0 /path/to/perfect-blog/assets/za-support-team-imac-workshop.png \
  -o public/blog/workshop/za-support-team-imac-workshop.webp

cwebp -q 85 -resize 1200 0 /path/to/perfect-blog/assets/za-support-workshop-mac-repair.png \
  -o public/blog/workshop/za-support-workshop-mac-repair.webp

cwebp -q 85 -resize 1200 0 /path/to/perfect-blog/assets/mary-blount-macbook-desk.png \
  -o public/blog/workshop/mary-blount-macbook-desk.webp

cwebp -q 85 -resize 1200 0 /path/to/perfect-blog/assets/za-support-team-rooftop.png \
  -o public/blog/workshop/za-support-team-rooftop.webp

# Verify
ls -la public/authors/ public/blog/workshop/
```

---

## STAGE 4 — INSTALL PAGE TEMPLATES (20 minutes)

### Blog post page template

```bash
# Replace the existing blog post page
cp /path/to/perfect-blog/pages/BlogPostTemplate.tsx app/blog/[slug]/page.tsx
```

Then edit the file to wire it to your actual Sanity client:

```tsx
// app/blog/[slug]/page.tsx
import { sanityClient } from '@/lib/sanity'

async function getPostBySlug(slug: string) {
  const post = await sanityClient.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0]{
      title,
      "slug": slug.current,
      description,
      category,
      authorSlug,
      datePublished,
      dateModified,
      featuredImage,
      featuredImageAlt,
      keyTakeaways,
      tocItems,
      content,
      faqs,
      relatedPosts,
      howTo
    }`,
    { slug }
  )
  return post
}
```

### Author pages

```bash
# Create the author route
mkdir -p app/author/[slug]
cp /path/to/perfect-blog/pages/AuthorPage.tsx app/author/[slug]/page.tsx
```

### Editorial policy page

```bash
# Create the editorial policy route
mkdir -p app/editorial-policy
cp /path/to/perfect-blog/pages/EditorialPolicy.tsx app/editorial-policy/page.tsx
```

---

## STAGE 5 — APPLY 301 REDIRECTS (10 minutes)

```bash
# Copy the redirects config
cp /path/to/perfect-blog/config/next.config.redirects.js config/
```

Edit `next.config.js`:

```js
// next.config.js
const blogRedirects = require('./config/next.config.redirects.js')

module.exports = {
  // ... existing config
  async redirects() {
    return [
      ...blogRedirects,
      // ... any other existing redirects
    ]
  },
}
```

### Verify redirects locally

```bash
npm run build
npm run start

# In another terminal, test a redirect
curl -I http://localhost:3000/blog/spilled-coffee-on-macbook-what-to-do-right-now

# Expected output:
# HTTP/1.1 308 Permanent Redirect
# location: /blog/macbook-water-damage-first-aid
```

---

## STAGE 6 — UPDATE SANITY CMS SCHEMA (30 minutes)

Add author reference and required fields to the blog post schema.

In `sanity/schemas/blogPost.ts`:

```ts
export default {
  name: 'blogPost',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', validation: Rule => Rule.required() },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'description', type: 'text', validation: Rule => Rule.required().max(160) },
    { name: 'category', type: 'string', options: {
      list: ['Repairs', 'How-To', 'Pricing', 'Troubleshooting', 'Enterprise', 'Advice', 'Upgrades', 'Data Recovery']
    }},
    { name: 'authorSlug', type: 'string', options: {
      list: ['courtney-bentley', 'mary-blount']
    }, validation: Rule => Rule.required() },
    { name: 'datePublished', type: 'datetime', validation: Rule => Rule.required() },
    { name: 'dateModified', type: 'datetime', validation: Rule => Rule.required() },
    { name: 'featuredImage', type: 'image' },
    { name: 'featuredImageAlt', type: 'string', validation: Rule => Rule.required() },
    { name: 'keyTakeaways', type: 'array', of: [{ type: 'string' }],
      validation: Rule => Rule.required().min(3).max(5) },
    { name: 'tocItems', type: 'array', of: [{
      type: 'object',
      fields: [
        { name: 'id', type: 'string' },
        { name: 'text', type: 'string' },
        { name: 'level', type: 'number' },
      ]
    }]},
    { name: 'content', type: 'array', of: [{ type: 'block' }] },
    { name: 'faqs', type: 'array', of: [{
      type: 'object',
      fields: [
        { name: 'question', type: 'string' },
        { name: 'answer', type: 'text' },
      ]
    }]},
    { name: 'relatedPosts', type: 'array', of: [{ type: 'reference', to: [{ type: 'blogPost' }] }],
      validation: Rule => Rule.min(3).max(3) },
    { name: 'wordCount', type: 'number' },
    { name: 'readTime', type: 'number' },
    { name: 'howTo', type: 'object', fields: [
      { name: 'name', type: 'string' },
      { name: 'description', type: 'text' },
      { name: 'totalTime', type: 'string' },
      { name: 'estimatedCost', type: 'object', fields: [
        { name: 'currency', type: 'string', initialValue: 'ZAR' },
        { name: 'value', type: 'string' },
      ]},
      { name: 'tools', type: 'array', of: [{ type: 'object', fields: [{ name: 'name', type: 'string' }] }] },
      { name: 'steps', type: 'array', of: [{
        type: 'object',
        fields: [
          { name: 'name', type: 'string' },
          { name: 'text', type: 'text' },
          { name: 'url', type: 'string' },
        ]
      }]},
    ]},
  ],
}
```

Deploy the schema:

```bash
cd sanity
npx sanity deploy
```

---

## STAGE 7 — RETROFIT EXISTING POSTS (1-2 hours)

For each of the 58 existing blog posts:

1. Open the post in Sanity Studio
2. Set `authorSlug` to `courtney-bentley` (default) or `mary-blount` (where appropriate)
3. Set `datePublished` to the original publish date
4. Set `dateModified` to today's date
5. Add `keyTakeaways` (3-5 bullets)
6. Add `tocItems` (anchor jump points)
7. Add `featuredImage` and `featuredImageAlt`
8. Add 3 `relatedPosts` references
9. Save and publish

### Bulk retrofit option

For faster retrofitting, write a Sanity migration script:

```ts
// scripts/retrofit-blog-posts.ts
import { sanityClient } from '@/lib/sanity'

async function retrofit() {
  const posts = await sanityClient.fetch(`*[_type == "blogPost"]`)

  for (const post of posts) {
    if (!post.authorSlug) {
      await sanityClient
        .patch(post._id)
        .set({
          authorSlug: 'courtney-bentley',
          dateModified: new Date().toISOString(),
        })
        .commit()
      console.log(`Retrofitted: ${post.title}`)
    }
  }
}

retrofit()
```

Run with:

```bash
npx ts-node scripts/retrofit-blog-posts.ts
```

---

## STAGE 8 — DEPLOY TO PRODUCTION (15 minutes)

```bash
# Verify build passes locally
npm run build

# If successful, commit and push
git add .
git commit -m "feat: install Perfect Blog Creator infrastructure

- Author bylines + bios on every blog post
- BlogPosting + BreadcrumbList + Organization + Person schema
- Author profile pages with ProfilePage schema
- Editorial policy trust signal page
- Water damage cluster 301 redirects (20 → 5)
- HowTo schema component for repair guides
- Table of contents, key takeaways, last-updated components"

git push origin main
```

Vercel will auto-deploy. Monitor the deployment at https://vercel.com.

---

## STAGE 9 — POST-DEPLOYMENT VERIFICATION (30 minutes)

### Schema validation

Test every schema type with Google's Rich Results Test:
https://search.google.com/test/rich-results

Test these URLs:
- https://www.zasupport.com (Organization + LocalBusiness)
- https://www.zasupport.com/blog/[any-post] (BlogPosting + Breadcrumb + FAQ)
- https://www.zasupport.com/author/courtney-bentley (Person + ProfilePage)
- https://www.zasupport.com/blog/[repair-guide] (HowTo, if applicable)

All should pass with zero errors.

### Redirect verification

```bash
# Test each water damage redirect
for url in \
  "spilled-coffee-on-macbook-what-to-do-right-now" \
  "macbook-water-damage-diy-mistakes-to-avoid" \
  "macbook-pro-coffee-spill-repair-cost-johannesburg" \
  "macbook-liquid-damage-indicator-what-apple-checks"
do
  echo "Testing: $url"
  curl -I "https://www.zasupport.com/blog/$url" 2>&1 | grep -i "location\|HTTP"
  echo "---"
done
```

All should return 308 (Next.js default for permanent redirects) with the correct destination.

### Search Console submission

1. Open Google Search Console → Sitemaps
2. Re-submit https://www.zasupport.com/sitemap.xml
3. Use URL Inspection on 3-5 retrofitted blog posts
4. Click "Request Indexing" for each
5. Monitor "Coverage" report for 7 days

---

## STAGE 10 — WATER DAMAGE PILLAR/SPOKE CONTENT (1-2 hours)

Create the 5 consolidated water damage posts in Sanity:

1. **Pillar (3,000+ words):** /blog/macbook-water-damage-repair-johannesburg
   - Comprehensive guide combining the best content from the redirected posts
2. **Spoke 1:** /blog/macbook-water-damage-first-aid (first 30 minutes guide)
3. **Spoke 2:** /blog/macbook-water-damage-repair-cost-2026 (transparent pricing)
4. **Spoke 3:** /blog/signs-of-water-damage-macbook (diagnostic guide)
5. **Spoke 4:** /blog/macbook-logic-board-repair-vs-replacement (decision framework)

Internal linking: each spoke links to the pillar and to 2 other spokes. The pillar links to all 4 spokes.

---

## ROLLBACK PLAN

If anything goes wrong:

```bash
# Revert the deployment
git revert HEAD
git push origin main

# Or roll back via Vercel dashboard
# Vercel → Deployments → Previous deployment → "Promote to Production"
```

The 301 redirects can be removed by deleting `config/next.config.redirects.js` and removing the import from `next.config.js`.

---

## SUCCESS CRITERIA

After deployment, verify these metrics weekly for 30 days:

- [ ] All blog posts pass Google Rich Results Test (BlogPosting + Person)
- [ ] Author pages indexed in Google Search Console
- [ ] Editorial policy page indexed
- [ ] No "Discovered - currently not indexed" errors
- [ ] No manual actions in Search Console
- [ ] Average position improves for water damage cluster keywords
- [ ] Click-through rate (CTR) increases for blog posts with breadcrumbs/FAQs
- [ ] Core Web Vitals remain green (LCP <2.5s, INP <200ms, CLS <0.1)

---

*Perfect Blog Creator Deployment Runbook v1.0*
*Last updated: 12 April 2026*
