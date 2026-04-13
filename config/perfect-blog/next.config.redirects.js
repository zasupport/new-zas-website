// config/next.config.redirects.js
// 301 redirect map for water damage blog cluster consolidation
// Merge into your existing next.config.js redirects() function

/**
 * USAGE:
 *
 * In next.config.js, add this to the module.exports:
 *
 *   const blogRedirects = require('./config/next.config.redirects.js')
 *
 *   module.exports = {
 *     async redirects() {
 *       return [...blogRedirects]
 *     },
 *   }
 *
 * Or paste the array contents directly into your existing redirects() function.
 *
 * IMPORTANT:
 * 1. Run a database backup of your Sanity content BEFORE applying these redirects.
 * 2. After deployment, submit the new sitemap.xml to Google Search Console.
 * 3. Monitor GSC's "Coverage" report for 7 days to confirm Google has processed the redirects.
 * 4. Use 301 (permanent) — NOT 302 (temporary) — to pass link equity to the new URLs.
 */

const blogRedirects = [
  // === WATER DAMAGE CLUSTER → 5 PILLAR/SPOKE STRUCTURE ===
  // Pillar: macbook-water-damage-repair-johannesburg

  {
    source: '/blog/can-water-damaged-macbook-be-repaired-south-africa',
    destination: '/blog/macbook-water-damage-repair-johannesburg',
    permanent: true,
  },
  {
    source: '/blog/macbook-air-water-damage-logic-board-repair-johannesburg',
    destination: '/blog/macbook-water-damage-repair-johannesburg',
    permanent: true,
  },
  {
    source: '/blog/macbook-water-damage-data-recovery-options',
    destination: '/blog/macbook-water-damage-repair-johannesburg',
    permanent: true,
  },
  {
    source: '/blog/how-long-macbook-survive-after-water-damage',
    destination: '/blog/macbook-water-damage-repair-johannesburg',
    permanent: true,
  },
  {
    source: '/blog/prevent-macbook-water-damage-protection-tips',
    destination: '/blog/macbook-water-damage-repair-johannesburg',
    permanent: true,
  },
  {
    source: '/blog/does-macbook-warranty-cover-water-damage-south-africa',
    destination: '/blog/macbook-water-damage-repair-johannesburg',
    permanent: true,
  },

  // Spoke 1: macbook-water-damage-first-aid (first 30 minutes guide)
  {
    source: '/blog/macbook-water-damage-first-aid-steps-johannesburg',
    destination: '/blog/macbook-water-damage-first-aid',
    permanent: true,
  },
  {
    source: '/blog/macbook-water-damage-diy-mistakes-to-avoid',
    destination: '/blog/macbook-water-damage-first-aid',
    permanent: true,
  },
  {
    source: '/blog/spilled-coffee-on-macbook-what-to-do-right-now',
    destination: '/blog/macbook-water-damage-first-aid',
    permanent: true,
  },
  {
    source: '/blog/what-to-do-macbook-liquid-damage',
    destination: '/blog/macbook-water-damage-first-aid',
    permanent: true,
  },

  // Spoke 2: macbook-water-damage-repair-cost-2026
  {
    source: '/blog/macbook-pro-coffee-spill-repair-cost-johannesburg',
    destination: '/blog/macbook-water-damage-repair-cost-2026',
    permanent: true,
  },
  {
    source: '/blog/macbook-water-damage-repair-cost-south-africa',
    destination: '/blog/macbook-water-damage-repair-cost-2026',
    permanent: true,
  },
  {
    source: '/blog/liquid-damage-macbook-johannesburg-cost',
    destination: '/blog/macbook-water-damage-repair-cost-2026',
    permanent: true,
  },

  // Spoke 3: signs-of-water-damage-macbook
  {
    source: '/blog/macbook-liquid-damage-indicator-what-apple-checks',
    destination: '/blog/signs-of-water-damage-macbook',
    permanent: true,
  },
  {
    source: '/blog/signs-of-water-damage-macbook-how-to-tell',
    destination: '/blog/signs-of-water-damage-macbook',
    permanent: true,
  },

  // Spoke 4: macbook-logic-board-repair-vs-replacement
  {
    source: '/blog/macbook-logic-board-repair-vs-replacement-water-damage',
    destination: '/blog/macbook-logic-board-repair-vs-replacement',
    permanent: true,
  },
  {
    source: '/blog/laptop-water-damage-repair-vs-buy-new-south-africa',
    destination: '/blog/macbook-logic-board-repair-vs-replacement',
    permanent: true,
  },

  // === LEGACY WORDPRESS POSTS → NEW STRUCTURE ===
  // Add legacy WordPress URL redirects here as identified during the legacy audit
  // Example:
  // {
  //   source: '/has-your-mac-been-hacked',
  //   destination: '/blog/has-your-mac-been-hacked-2026',
  //   permanent: true,
  // },
]

module.exports = blogRedirects
