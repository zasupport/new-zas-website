import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Suppress X-Powered-By: Next.js header — hides framework from HTTP fingerprinting
  poweredByHeader: false,

  // Skip TypeScript type-checking during Vercel build — CI runs tsc --noEmit in parallel
  // Saves ~5-8s per build by not double-checking types
  typescript: { ignoreBuildErrors: true },

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },

  // Security headers are now handled centrally in src/middleware.ts.
  // The only header config here is for static asset caching (unchanged from vercel.json).
  // Do NOT add security headers here — they will conflict with middleware and create mismatches.

  async rewrites() {
    return [
      // Proxy Sanity CDN images through our own origin.
      // This removes cdn.sanity.io from CSP img-src, hiding the CMS provider.
      {
        source: '/cms-img/:path*',
        destination: 'https://cdn.sanity.io/:path*',
      },
    ];
  },

  async redirects() {
    return [
      // WordPress legacy URL redirects
      { source: '/category/:slug', destination: '/blog', permanent: true },
      { source: '/tag/:slug', destination: '/blog', permanent: true },
      { source: '/wp-content/:path*', destination: '/', permanent: true },
      { source: '/wp-admin', destination: '/', permanent: true },
      { source: '/wp-login.php', destination: '/', permanent: true },

      // Common legacy service page patterns
      { source: '/services/liquid-damage', destination: '/liquid-damage', permanent: true },
      { source: '/services/logic-board', destination: '/logic-board-repair', permanent: true },
      { source: '/services/iphone', destination: '/iphone-repair', permanent: true },
      { source: '/services/ipad', destination: '/ipad-repair', permanent: true },
      { source: '/services/jamf', destination: '/jamf-mdm', permanent: true },

      // Apple Repair hub aliases
      { source: '/apple-specialist', destination: '/apple-repair', permanent: true },
      // /macbook-repair un-redirected 01/06/2026 — the dedicated 22KB page now serves "macbook repair" (387 imp, was pos 14.9 stuck on homepage). §410/§434/§401.
      { source: '/mac-repair', destination: '/apple-repair', permanent: true },
      { source: '/mac-repair-johannesburg', destination: '/apple-repair', permanent: true },
      { source: '/apple-repair-johannesburg', destination: '/apple-repair', permanent: true },

      // Old blog slugs
      { source: '/blog/liquid-damage', destination: '/blog/macbook-water-damage-first-aid', permanent: true },
      { source: '/blog/rice-myth', destination: '/blog/why-rice-does-not-work', permanent: true },

      // Water damage cluster consolidation → pillar post
      { source: '/blog/can-water-damaged-macbook-be-repaired-south-africa', destination: '/blog/macbook-water-damage-repair-johannesburg', permanent: true },
      { source: '/blog/macbook-air-water-damage-logic-board-repair-johannesburg', destination: '/blog/macbook-water-damage-repair-johannesburg', permanent: true },
      { source: '/blog/macbook-water-damage-data-recovery-options', destination: '/blog/macbook-water-damage-repair-johannesburg', permanent: true },
      { source: '/blog/how-long-macbook-survive-after-water-damage', destination: '/blog/macbook-water-damage-repair-johannesburg', permanent: true },
      { source: '/blog/prevent-macbook-water-damage-protection-tips', destination: '/blog/macbook-water-damage-repair-johannesburg', permanent: true },
      { source: '/blog/does-macbook-warranty-cover-water-damage-south-africa', destination: '/blog/macbook-water-damage-repair-johannesburg', permanent: true },

      // Water damage cluster → spoke 1 (first aid)
      { source: '/blog/macbook-water-damage-first-aid-steps-johannesburg', destination: '/blog/macbook-water-damage-first-aid', permanent: true },
      { source: '/blog/macbook-water-damage-diy-mistakes-to-avoid', destination: '/blog/macbook-water-damage-first-aid', permanent: true },
      { source: '/blog/spilled-coffee-on-macbook-what-to-do-right-now', destination: '/blog/macbook-water-damage-first-aid', permanent: true },
      { source: '/blog/what-to-do-macbook-liquid-damage', destination: '/blog/macbook-water-damage-first-aid', permanent: true },

      // Water damage cluster → spoke 2 (cost)
      { source: '/blog/macbook-pro-coffee-spill-repair-cost-johannesburg', destination: '/blog/macbook-water-damage-repair-cost-2026', permanent: true },
      { source: '/blog/macbook-water-damage-repair-cost-south-africa', destination: '/blog/macbook-water-damage-repair-cost-2026', permanent: true },
      { source: '/blog/liquid-damage-macbook-johannesburg-cost', destination: '/blog/macbook-water-damage-repair-cost-2026', permanent: true },

      // Water damage cluster → spoke 3 (signs/diagnosis)
      { source: '/blog/macbook-liquid-damage-indicator-what-apple-checks', destination: '/blog/signs-of-water-damage-macbook', permanent: true },
      { source: '/blog/signs-of-water-damage-macbook-how-to-tell', destination: '/blog/signs-of-water-damage-macbook', permanent: true },

      // Water damage cluster → spoke 4 (repair vs replacement)
      { source: '/blog/macbook-logic-board-repair-vs-replacement-water-damage', destination: '/blog/macbook-logic-board-repair-vs-replacement', permanent: true },
      { source: '/blog/laptop-water-damage-repair-vs-buy-new-south-africa', destination: '/blog/macbook-logic-board-repair-vs-replacement', permanent: true },

      // Old WordPress page URLs (404s from legacy site)
      { source: '/apple-repairs', destination: '/apple-repair', permanent: true },
      { source: '/apple-expertise-johannesburg-south-africa', destination: '/about', permanent: true },
      { source: '/macbook-pro-ram-memory-upgrades', destination: '/macbook-repair/ram-upgrade', permanent: true },
      { source: '/apple-macbook-pro-upgrades-johannesburg-south-africa', destination: '/macbook-pro-repair', permanent: true },
      { source: '/imac-support-johannesburg-south-africa', destination: '/imac-repair', permanent: true },
      { source: '/apple-repair-near-me', destination: '/apple-repair', permanent: true },
      { source: '/macbook-pro-repairs-johannesburg-south-africa', destination: '/macbook-pro-repair', permanent: true },
      { source: '/macbook-pro-support-johannesburg-south-africa', destination: '/apple-support', permanent: true },
      { source: '/apple-upgrades-johannesburg-south-africa', destination: '/macbook-repair/ssd-upgrade', permanent: true },
      { source: '/macbook-air-ssd-upgrades', destination: '/macbook-repair/ssd-upgrade', permanent: true },

      // §403 (25/05/2026): Courtney Bentley is the sole founder and sole author of ZA Support, permanently.
      // 'David Bentley' was a hallucination introduced by a prior Claude session (commit 7f971cb 29/03/2026)
      // and has been removed per §374 anti-hallucination. Any external backlinks to /author/david-bentley
      // are redirected to Courtney's profile (301 — final, consolidates link equity per Google primary docs).
      { source: '/author/david-bentley', destination: '/author/courtney-bentley', permanent: true },

      // §523 DOORWAY PRUNE (20260610): 103 thin suburb-permutation blog posts with 0 clicks
      // & <=5 impressions in 90d page-level GSC → 301 to the canonical service HUB (city-level,
      // §400/§520/§425). Named-entity + impression-earning permutations EXCLUDED (kept live).
      { source: '/blog/gpu-repair-bryanston', destination: '/logic-board-repair', permanent: true },
      { source: '/blog/gpu-repair-fourways', destination: '/logic-board-repair', permanent: true },
      { source: '/blog/gpu-repair-houghton', destination: '/logic-board-repair', permanent: true },
      { source: '/blog/gpu-repair-melrose', destination: '/logic-board-repair', permanent: true },
      { source: '/blog/gpu-repair-morningside', destination: '/logic-board-repair', permanent: true },
      { source: '/blog/gpu-repair-randburg', destination: '/logic-board-repair', permanent: true },
      { source: '/blog/gpu-repair-rivonia', destination: '/logic-board-repair', permanent: true },
      { source: '/blog/gpu-repair-rosebank', destination: '/logic-board-repair', permanent: true },
      { source: '/blog/gpu-repair-sandton', destination: '/logic-board-repair', permanent: true },
      { source: '/blog/imac-fusion-drive-replacement-sandton', destination: '/logic-board-repair', permanent: true },
      { source: '/blog/imac-logic-board-repair-sandton', destination: '/logic-board-repair', permanent: true },
      { source: '/blog/liquid-damage-macbook-fourways', destination: '/liquid-damage', permanent: true },
      { source: '/blog/liquid-damage-macbook-pro-randburg', destination: '/liquid-damage', permanent: true },
      { source: '/blog/liquid-damage-repair-bryanston', destination: '/liquid-damage', permanent: true },
      { source: '/blog/liquid-damage-repair-fourways', destination: '/liquid-damage', permanent: true },
      { source: '/blog/liquid-damage-repair-houghton', destination: '/liquid-damage', permanent: true },
      { source: '/blog/liquid-damage-repair-melrose', destination: '/liquid-damage', permanent: true },
      { source: '/blog/liquid-damage-repair-morningside', destination: '/liquid-damage', permanent: true },
      { source: '/blog/liquid-damage-repair-randburg', destination: '/liquid-damage', permanent: true },
      { source: '/blog/liquid-damage-repair-rivonia', destination: '/liquid-damage', permanent: true },
      { source: '/blog/liquid-damage-repair-rosebank', destination: '/liquid-damage', permanent: true },
      { source: '/blog/liquid-damage-repair-sandton', destination: '/liquid-damage', permanent: true },
      { source: '/blog/logic-board-repair-bryanston', destination: '/logic-board-repair', permanent: true },
      { source: '/blog/logic-board-repair-randburg', destination: '/logic-board-repair', permanent: true },
      { source: '/blog/logic-board-repair-sandton', destination: '/logic-board-repair', permanent: true },
      { source: '/blog/mac-repair-morningside-johannesburg', destination: '/macbook-repair', permanent: true },
      { source: '/blog/macbook-battery-replacement-fourways', destination: '/battery-replacement', permanent: true },
      { source: '/blog/macbook-pro-m4-data-recovery-houghton', destination: '/macbook-repair/data-recovery', permanent: true },
      { source: '/blog/macbook-pro-m4-data-recovery-melrose', destination: '/macbook-repair/data-recovery', permanent: true },
      { source: '/blog/macbook-pro-m4-data-recovery-morningside', destination: '/macbook-repair/data-recovery', permanent: true },
      { source: '/blog/macbook-pro-m4-data-recovery-rivonia', destination: '/macbook-repair/data-recovery', permanent: true },
      { source: '/blog/macbook-pro-m4-data-recovery-rosebank', destination: '/macbook-repair/data-recovery', permanent: true },
      { source: '/blog/macbook-pro-m4-data-recovery-sandton', destination: '/macbook-repair/data-recovery', permanent: true },
      { source: '/blog/macbook-pro-m4-gpu-repair-bryanston', destination: '/logic-board-repair', permanent: true },
      { source: '/blog/macbook-pro-m4-gpu-repair-fourways', destination: '/logic-board-repair', permanent: true },
      { source: '/blog/macbook-pro-m4-gpu-repair-houghton', destination: '/logic-board-repair', permanent: true },
      { source: '/blog/macbook-pro-m4-gpu-repair-melrose', destination: '/logic-board-repair', permanent: true },
      { source: '/blog/macbook-pro-m4-gpu-repair-morningside', destination: '/logic-board-repair', permanent: true },
      { source: '/blog/macbook-pro-m4-gpu-repair-rivonia', destination: '/logic-board-repair', permanent: true },
      { source: '/blog/macbook-pro-m4-gpu-repair-rosebank', destination: '/logic-board-repair', permanent: true },
      { source: '/blog/macbook-pro-m4-gpu-repair-sandton', destination: '/logic-board-repair', permanent: true },
      { source: '/blog/macbook-pro-m4-liquid-damage-repair-bryanston', destination: '/liquid-damage', permanent: true },
      { source: '/blog/macbook-pro-m4-liquid-damage-repair-fourways', destination: '/liquid-damage', permanent: true },
      { source: '/blog/macbook-pro-m4-liquid-damage-repair-houghton', destination: '/liquid-damage', permanent: true },
      { source: '/blog/macbook-pro-m4-liquid-damage-repair-melrose', destination: '/liquid-damage', permanent: true },
      { source: '/blog/macbook-pro-m4-liquid-damage-repair-morningside', destination: '/liquid-damage', permanent: true },
      { source: '/blog/macbook-pro-m4-liquid-damage-repair-rivonia', destination: '/liquid-damage', permanent: true },
      { source: '/blog/macbook-pro-m4-liquid-damage-repair-rosebank', destination: '/liquid-damage', permanent: true },
      { source: '/blog/macbook-pro-m4-liquid-damage-repair-sandton', destination: '/liquid-damage', permanent: true },
      { source: '/blog/macbook-pro-m4-logic-board-repair-bryanston', destination: '/logic-board-repair', permanent: true },
      { source: '/blog/macbook-pro-m4-logic-board-repair-fourways', destination: '/logic-board-repair', permanent: true },
      { source: '/blog/macbook-pro-m4-logic-board-repair-houghton', destination: '/logic-board-repair', permanent: true },
      { source: '/blog/macbook-pro-m4-logic-board-repair-melrose', destination: '/logic-board-repair', permanent: true },
      { source: '/blog/macbook-pro-m4-logic-board-repair-morningside', destination: '/logic-board-repair', permanent: true },
      { source: '/blog/macbook-pro-m4-logic-board-repair-rivonia', destination: '/logic-board-repair', permanent: true },
      { source: '/blog/macbook-pro-m4-logic-board-repair-rosebank', destination: '/logic-board-repair', permanent: true },
      { source: '/blog/macbook-pro-m4-logic-board-repair-sandton', destination: '/logic-board-repair', permanent: true },
      { source: '/blog/macbook-pro-m4-water-damage-repair-rosebank', destination: '/liquid-damage', permanent: true },
      { source: '/blog/macbook-pro-m4-water-damage-repair-sandton', destination: '/liquid-damage', permanent: true },
      { source: '/blog/macbook-pro-m4-wont-turn-on-bryanston', destination: '/macbook-pro-repair', permanent: true },
      { source: '/blog/macbook-pro-m4-wont-turn-on-fourways', destination: '/macbook-pro-repair', permanent: true },
      { source: '/blog/macbook-pro-m4-wont-turn-on-houghton', destination: '/macbook-pro-repair', permanent: true },
      { source: '/blog/macbook-pro-m4-wont-turn-on-melrose', destination: '/macbook-pro-repair', permanent: true },
      { source: '/blog/macbook-pro-m4-wont-turn-on-morningside', destination: '/macbook-pro-repair', permanent: true },
      { source: '/blog/macbook-pro-m4-wont-turn-on-rivonia', destination: '/macbook-pro-repair', permanent: true },
      { source: '/blog/macbook-pro-m4-wont-turn-on-rosebank', destination: '/macbook-pro-repair', permanent: true },
      { source: '/blog/macbook-pro-m4-wont-turn-on-sandton', destination: '/macbook-pro-repair', permanent: true },
      { source: '/blog/macbook-screen-repair-fourways-johannesburg', destination: '/screen-repair', permanent: true },
      { source: '/blog/managed-it-services-sandton-johannesburg', destination: '/managed-services', permanent: true },
      { source: '/blog/no-power-repair-bryanston', destination: '/macbook-repair', permanent: true },
      { source: '/blog/no-power-repair-fourways', destination: '/macbook-repair', permanent: true },
      { source: '/blog/no-power-repair-houghton', destination: '/macbook-repair', permanent: true },
      { source: '/blog/no-power-repair-melrose', destination: '/macbook-repair', permanent: true },
      { source: '/blog/no-power-repair-morningside', destination: '/macbook-repair', permanent: true },
      { source: '/blog/no-power-repair-randburg', destination: '/macbook-repair', permanent: true },
      { source: '/blog/no-power-repair-rivonia', destination: '/macbook-repair', permanent: true },
      { source: '/blog/no-power-repair-rosebank', destination: '/macbook-repair', permanent: true },
      { source: '/blog/no-power-repair-sandton', destination: '/macbook-repair', permanent: true },
      { source: '/blog/unifi-installation-bryanston-johannesburg', destination: '/macbook-repair', permanent: true },
      { source: '/blog/unifi-installation-fourways-johannesburg', destination: '/macbook-repair', permanent: true },
      { source: '/blog/unifi-installation-rosebank-johannesburg', destination: '/macbook-repair', permanent: true },
      { source: '/blog/unifi-installation-sandton-johannesburg', destination: '/macbook-repair', permanent: true },
      { source: '/blog/unifi-installer-near-me-sandton-johannesburg', destination: '/macbook-repair', permanent: true },
      { source: '/blog/unifi-installer-sandton-business-johannesburg', destination: '/macbook-repair', permanent: true },
      { source: '/blog/unifi-troubleshooting-sandton-johannesburg', destination: '/macbook-repair', permanent: true },
      { source: '/blog/water-damage-repair-bryanston', destination: '/liquid-damage', permanent: true },
      { source: '/blog/water-damage-repair-fourways', destination: '/liquid-damage', permanent: true },
      { source: '/blog/water-damage-repair-houghton', destination: '/liquid-damage', permanent: true },
      { source: '/blog/water-damage-repair-melrose', destination: '/liquid-damage', permanent: true },
      { source: '/blog/water-damage-repair-morningside', destination: '/liquid-damage', permanent: true },
      { source: '/blog/water-damage-repair-randburg', destination: '/liquid-damage', permanent: true },
      { source: '/blog/water-damage-repair-rivonia', destination: '/liquid-damage', permanent: true },
      { source: '/blog/water-damage-repair-rosebank', destination: '/liquid-damage', permanent: true },
      { source: '/blog/water-damage-repair-sandton', destination: '/liquid-damage', permanent: true },
      { source: '/blog/wont-turn-on-bryanston', destination: '/macbook-repair', permanent: true },
      { source: '/blog/wont-turn-on-fourways', destination: '/macbook-repair', permanent: true },
      { source: '/blog/wont-turn-on-houghton', destination: '/macbook-repair', permanent: true },
      { source: '/blog/wont-turn-on-melrose', destination: '/macbook-repair', permanent: true },
      { source: '/blog/wont-turn-on-morningside', destination: '/macbook-repair', permanent: true },
      { source: '/blog/wont-turn-on-randburg', destination: '/macbook-repair', permanent: true },
      { source: '/blog/wont-turn-on-rivonia', destination: '/macbook-repair', permanent: true },
      { source: '/blog/wont-turn-on-rosebank', destination: '/macbook-repair', permanent: true },
      { source: '/blog/wont-turn-on-sandton', destination: '/macbook-repair', permanent: true },

      // §529 doorway prune wave-2 (11/06): 18 overnight-generated thin permutations → hub
      { source: '/blog/macbook-pro-m3-water-damage-repair-bryanston', destination: '/liquid-damage', permanent: true },
      { source: '/blog/macbook-pro-m3-water-damage-repair-fourways', destination: '/liquid-damage', permanent: true },
      { source: '/blog/macbook-pro-m3-water-damage-repair-houghton', destination: '/liquid-damage', permanent: true },
      { source: '/blog/macbook-pro-m3-water-damage-repair-melrose', destination: '/liquid-damage', permanent: true },
      { source: '/blog/macbook-pro-m3-water-damage-repair-morningside', destination: '/liquid-damage', permanent: true },
      { source: '/blog/macbook-pro-m3-water-damage-repair-rivonia', destination: '/liquid-damage', permanent: true },
      { source: '/blog/macbook-pro-m3-water-damage-repair-rosebank', destination: '/liquid-damage', permanent: true },
      { source: '/blog/macbook-pro-m3-water-damage-repair-sandton', destination: '/liquid-damage', permanent: true },
      { source: '/blog/macbook-pro-m3-wont-turn-on-bryanston', destination: '/macbook-not-turning-on', permanent: true },
      { source: '/blog/macbook-pro-m3-wont-turn-on-fourways', destination: '/macbook-not-turning-on', permanent: true },
      { source: '/blog/macbook-pro-m3-wont-turn-on-houghton', destination: '/macbook-not-turning-on', permanent: true },
      { source: '/blog/macbook-pro-m3-wont-turn-on-melrose', destination: '/macbook-not-turning-on', permanent: true },
      { source: '/blog/macbook-pro-m3-wont-turn-on-morningside', destination: '/macbook-not-turning-on', permanent: true },
      { source: '/blog/macbook-pro-m3-wont-turn-on-rivonia', destination: '/macbook-not-turning-on', permanent: true },
      { source: '/blog/macbook-pro-m3-wont-turn-on-rosebank', destination: '/macbook-not-turning-on', permanent: true },
      { source: '/blog/macbook-pro-m3-wont-turn-on-sandton', destination: '/macbook-not-turning-on', permanent: true },
      { source: '/blog/macbook-pro-m4-data-recovery-bryanston', destination: '/macbook-repair/data-recovery', permanent: true },
      { source: '/blog/macbook-pro-m4-data-recovery-fourways', destination: '/macbook-repair/data-recovery', permanent: true },
      // §529 doorway prune 27/06/2026 (GSC-bucketed: 0 clicks AND <=5 impr, generic suburb, no named-entity)
      { source: '/blog/gpu-repair-parkhurst', destination: '/logic-board-repair', permanent: true },
      { source: '/blog/gpu-repair-northcliff', destination: '/logic-board-repair', permanent: true },
      { source: '/blog/gpu-repair-illovo', destination: '/logic-board-repair', permanent: true },
      { source: '/blog/logic-board-repair-northcliff', destination: '/logic-board-repair', permanent: true },
      { source: '/blog/logic-board-repair-illovo', destination: '/logic-board-repair', permanent: true },
      { source: '/blog/no-power-repair-parkhurst', destination: '/logic-board-repair', permanent: true },
      { source: '/blog/no-power-repair-northcliff', destination: '/logic-board-repair', permanent: true },
      { source: '/blog/no-power-repair-illovo', destination: '/logic-board-repair', permanent: true },
      { source: '/blog/wont-turn-on-illovo', destination: '/logic-board-repair', permanent: true },
      { source: '/blog/wont-turn-on-parkhurst', destination: '/logic-board-repair', permanent: true },
      { source: '/blog/liquid-damage-repair-northcliff', destination: '/liquid-damage', permanent: true },
      { source: '/blog/liquid-damage-repair-illovo', destination: '/liquid-damage', permanent: true },
      { source: '/blog/water-damage-repair-northcliff', destination: '/liquid-damage', permanent: true },
      { source: '/blog/water-damage-repair-illovo', destination: '/liquid-damage', permanent: true },
      { source: '/blog/managed-it-medical-practices-sandton-2026', destination: '/apple-support/medical-practices', permanent: true }, // §529 doorway prune 30/06 (0-traffic, §671 orphan)
    ];
  },
};

export default nextConfig;
