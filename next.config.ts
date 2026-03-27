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
    ];
  },
};

export default nextConfig;
