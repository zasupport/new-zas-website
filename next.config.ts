import type { NextConfig } from "next";

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      root: __dirname,
    },
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
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
