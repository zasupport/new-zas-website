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

## STAGE 11 — INSTALL LEAK PROTECTION SYSTEM (30 minutes)

Deploy the auto-fixer, scanner, and learning loop.

### 11.1 Copy banned-pattern registry
```bash
mkdir -p config
cp /path/to/perfect-blog/config/banned-content-patterns.js config/banned-content-patterns.js
```

### 11.2 Copy scripts
```bash
mkdir -p scripts
cp /path/to/perfect-blog/scripts/scan-blog-leaks.js scripts/
cp /path/to/perfect-blog/scripts/learning-loop.js scripts/
cp /path/to/perfect-blog/scripts/notify-leak-detected.js scripts/
chmod +x scripts/*.js
```

### 11.3 Test the scanner against a known leak
```bash
node -e "
const { scanText } = require('./config/banned-content-patterns');
const findings = scanText('Workshop notes.\nLEARNED: Example leak.\nBETTER: Another.');
console.log('Findings:', findings.length, '(should be 2)');
"
```

### 11.4 Run the scanner once manually
```bash
node scripts/scan-blog-leaks.js --report-only
```
This will scan all blog URLs in the sitemap and produce a report in `reports/leak-scan-YYYY-MM-DD.json`. No repairs are triggered with `--report-only`.

### 11.5 Verify reports directory created
```bash
ls -la reports/
```

---

## STAGE 12 — INSTALL SANITY AUTO-FIXER (20 minutes)

Replace the blocking validator with the transparent auto-fixer.

### 12.1 Copy the auto-fixer to Sanity Studio
```bash
mkdir -p sanity/validators
cp /path/to/perfect-blog/sanity/leak-auto-fixer.ts sanity/validators/
```

### 12.2 Update the blogPost schema
```bash
cp /path/to/perfect-blog/sanity/blogPost.schema.ts sanity/schemas/blogPost.ts
```

### 12.3 Verify the schema imports the auto-fixer
```bash
grep -n "leak-auto-fixer" sanity/schemas/blogPost.ts
# Expected: import { autoFixLeaks } from '../validators/leak-auto-fixer'
```

### 12.4 Restart Sanity Studio
```bash
cd sanity-studio && npm run dev
```

### 12.5 Test in Studio
1. Create a draft blog post
2. Add the text `LEARNED: This is a test leak` to the body
3. Save
4. Verify: the save proceeds (no error), but the leaked sentence is removed
5. The studio shows a warning: "Auto-fixed 1 leak(s) in: content (1 removed)"

---

## STAGE 13 — INSTALL PRODUCTION HARDENING (15 minutes)

Apply source-map disabling, EXIF stripping, and security headers.

### 13.1 Copy the hardening config
```bash
cp /path/to/perfect-blog/config/next.config.hardening.js config/
```

### 13.2 Update next.config.js to import it
```js
// next.config.js
const hardening = require('./config/next.config.hardening')
const blogRedirects = require('./config/next.config.redirects')

module.exports = {
  ...hardening,
  async redirects() {
    return blogRedirects
  },
}
```

### 13.3 Install sharp for EXIF stripping
```bash
npm install sharp
```

### 13.4 Copy the EXIF stripper
```bash
cp /path/to/perfect-blog/scripts/strip-image-exif.js scripts/
chmod +x scripts/strip-image-exif.js
```

### 13.5 Add to build pipeline
```json
// package.json
{
  "scripts": {
    "prebuild": "node scripts/strip-image-exif.js public/uploads public/images",
    "build": "next build"
  }
}
```

### 13.6 Verify hardening works
```bash
npm run build
# After build, verify no .map files exist:
find .next -name "*.map" 2>/dev/null
# Expected: empty
```

---

## STAGE 14 — INSTALL GSC TRAFFIC ANALYSER (45 minutes)

Set up the Google Search Console integration that drives publish scheduling.

### 14.1 Create a GCP service account
1. Go to https://console.cloud.google.com/
2. Create a new project (or select existing): "ZA Support Blog Automation"
3. Enable APIs: Search Console API
4. Create a service account: "blog-scheduler"
5. Generate a JSON key
6. Save the key to `~/.za-keys/gsc-service-account.json`
7. `chmod 600 ~/.za-keys/gsc-service-account.json`

### 14.2 Add service account to GSC
1. Go to https://search.google.com/search-console
2. Select property: zasupport.com
3. Settings → Users and permissions → Add user
4. Email: paste the service account email (looks like `blog-scheduler@<project>.iam.gserviceaccount.com`)
5. Permission: Restricted

### 14.3 Install googleapis
```bash
npm install googleapis
```

### 14.4 Copy the analyser
```bash
cp /path/to/perfect-blog/scripts/gsc-traffic-analyser.js scripts/
chmod +x scripts/gsc-traffic-analyser.js
```

### 14.5 Run the first analysis
```bash
export GSC_SERVICE_ACCOUNT_PATH=~/.za-keys/gsc-service-account.json
node scripts/gsc-traffic-analyser.js --refresh-schedule
```

Expected output: a heatmap of 24 hours with the top 8 slots selected, plus a `config/publish-schedule.json` file.

### 14.6 Verify the schedule
```bash
cat config/publish-schedule.json
# Expected: 8 hours in publishTimes array, all 2+ hours apart
```

---

## STAGE 15 — INSTALL SANITY POST SCHEDULER (30 minutes)

Wire the GSC schedule into Sanity Scheduled Publishing.

### 15.1 Install Sanity Scheduled Publishing plugin
```bash
cd sanity-studio
npm install @sanity/scheduled-publishing
```

### 15.2 Add to sanity.config.ts
```ts
import { scheduledPublishing } from '@sanity/scheduled-publishing'

export default defineConfig({
  // ...
  plugins: [
    // ... existing plugins
    scheduledPublishing(),
  ],
})
```

### 15.3 Copy the scheduler script
```bash
cp /path/to/perfect-blog/scripts/schedule-sanity-posts.js scripts/
chmod +x scripts/schedule-sanity-posts.js
```

### 15.4 Get a Sanity write token
1. https://sanity.io/manage/project/<project-id>/api
2. Create token → Editor permissions
3. Save it as an environment variable:
```bash
export SANITY_PROJECT_ID="your-project-id"
export SANITY_WRITE_TOKEN="your-write-token"
```

### 15.5 Test the scheduler in dry-run mode
```bash
node scripts/schedule-sanity-posts.js
```
Expected output: shows the schedule, queries for ready drafts, reports zero (assuming no ready drafts yet).

### 15.6 Test with a real draft
1. Create a blog post in Sanity Studio
2. Toggle "Ready to publish" to ON
3. Run the scheduler again:
```bash
node scripts/schedule-sanity-posts.js
```
Expected: the draft is assigned to the next available slot, `publishAt` is set.

---

## STAGE 16 — INSTALL CRON JOBS (5 minutes)

The final stage — activate all four scheduled jobs.

### 16.1 Run the installer
```bash
bash scripts/install-cron-jobs.sh
```

### 16.2 Verify all 4 jobs installed
```bash
crontab -l | grep ZA-SUPPORT-BLOG
```

Expected output:
```
0 21 * * 0 cd /var/www/zasupport && /usr/bin/node scripts/gsc-traffic-analyser.js --refresh-schedule >> ... # ZA-SUPPORT-BLOG
5 * * * * cd /var/www/zasupport && /usr/bin/node scripts/schedule-sanity-posts.js >> ... # ZA-SUPPORT-BLOG
0 0 * * * cd /var/www/zasupport && /usr/bin/node scripts/scan-blog-leaks.js >> ... # ZA-SUPPORT-BLOG
0 1 * * * cd /var/www/zasupport && /usr/bin/node scripts/learning-loop.js >> ... # ZA-SUPPORT-BLOG
```

### 16.3 Tail the logs for the first cycle
```bash
tail -f logs/*.log
```

The first hourly scheduler run will happen at the next :05. The first daily scanner run will happen at 02:00 SAST. The first GSC refresh will happen Sunday at 23:00 SAST.

### 16.4 Configure MS Graph email notifications
```bash
# Load the Microsoft Graph credentials
source ~/.za-keys-pending.env

# Test notification sending
node scripts/notify-leak-detected.js test
```
Expected: a test email arrives at admin@zasupport.com.

### 16.5 Verify end-to-end
1. Plant a test leak in a draft post (`LEARNED: test`)
2. Save the draft
3. Verify the auto-fixer stripped it (warning shown in Sanity)
4. Manually publish the post
5. Wait for daily scanner (or run manually): `node scripts/scan-blog-leaks.js`
6. Verify zero findings (because auto-fixer caught it)
7. Verify the learning loop runs the next morning

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

### Content quality metrics
- [ ] All blog posts pass Google Rich Results Test (BlogPosting + Person)
- [ ] Author pages indexed in Google Search Console
- [ ] Editorial policy page indexed
- [ ] No "Discovered - currently not indexed" errors
- [ ] No manual actions in Search Console
- [ ] Average position improves for water damage cluster keywords
- [ ] Click-through rate (CTR) increases for blog posts with breadcrumbs/FAQs
- [ ] Core Web Vitals remain green (LCP <2.5s, INP <200ms, CLS <0.1)

### Velocity & scheduling metrics
- [ ] 8 posts published per day, every day, with no missed slots
- [ ] No two publish slots within 2 hours of each other
- [ ] GSC schedule refreshes weekly (Sunday 23:00 SAST)
- [ ] No author has been blocked from saving in 30+ days
- [ ] Repair queue depth stays at 0 most of the time

### Leak protection metrics
- [ ] Zero leaked content visible on any live page
- [ ] Daily scanner runs without errors
- [ ] Email notifications arrive within 1 hour of any leak detection
- [ ] Learning loop adds at least 1 new pattern per week
- [ ] `config/learned-patterns.json` grows by ~2-5 patterns per month

### Hardening metrics
- [ ] No `.map` files in production builds
- [ ] No `X-Powered-By` header in HTTP responses
- [ ] CSP headers present on all pages
- [ ] EXIF metadata stripped from all uploaded images
- [ ] All static assets cached for 1 year

### Cron job health
- [ ] All 4 cron jobs visible in `crontab -l | grep ZA-SUPPORT-BLOG`
- [ ] Logs rotating to `logs/` directory
- [ ] No errors in any log file
- [ ] MS Graph notifications working

---

*Perfect Blog Creator Deployment Runbook v2.0*
*Last updated: 13 April 2026*
*16 stages, includes leak protection + GSC scheduling + learning loop + production hardening*
