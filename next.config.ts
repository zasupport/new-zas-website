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
      { source: '/macbook-repair', destination: '/apple-repair', permanent: true },
      { source: '/mac-repair', destination: '/apple-repair', permanent: true },
      { source: '/mac-repair-johannesburg', destination: '/apple-repair', permanent: true },
      { source: '/apple-repair-johannesburg', destination: '/apple-repair', permanent: true },

      // Old blog slugs
      { source: '/blog/liquid-damage', destination: '/blog/what-to-do-macbook-liquid-damage', permanent: true },
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

      // Author identity correction
      { source: '/author/david-bentley', destination: '/author/courtney-bentley', permanent: true },
    ];
  },
};

export default nextConfig;
