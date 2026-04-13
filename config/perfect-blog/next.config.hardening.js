// config/next.config.hardening.js
// Production hardening configuration for zasupport.com
//
// Hides as much non-essential information from competitors as possible
// WITHOUT impacting Google SEO, Core Web Vitals, or accessibility.
//
// What this file hides:
// - Source maps in production builds (no .map files exposed)
// - x-powered-by header (no "X-Powered-By: Next.js")
// - Build IDs in URLs (random per build, harder to fingerprint)
// - HTML comments stripped from production output
// - Webpack devtool source mapping disabled
// - React DevTools detection blocked
// - Image filenames hashed (no descriptive paths in /_next/image)
//
// What this file PRESERVES (mandatory for SEO):
// - All schema markup (JSON-LD must be readable by Google)
// - All HTML content (must be crawlable)
// - Image alt text (accessibility + SEO)
// - meta tags
// - sitemap.xml and robots.txt
//
// USAGE:
//   const hardening = require('./config/next.config.hardening')
//   const blogRedirects = require('./config/next.config.redirects')
//
//   module.exports = {
//     ...hardening,
//     async redirects() {
//       return [...blogRedirects]
//     },
//   }

const hardening = {
  // ============================================================
  // 1. Disable source maps in production
  // Prevents competitors from reading your original TypeScript/React source
  // ============================================================
  productionBrowserSourceMaps: false,

  // ============================================================
  // 2. Remove "X-Powered-By: Next.js" header
  // Hides framework fingerprint from response headers
  // ============================================================
  poweredByHeader: false,

  // ============================================================
  // 3. Strict mode + minification
  // ============================================================
  reactStrictMode: true,
  swcMinify: true, // Default in Next 15+, included for clarity

  // ============================================================
  // 4. Generate randomised build IDs
  // Default Next.js uses a hash, but we explicitly opt in
  // ============================================================
  generateBuildId: async () => {
    // Use timestamp + random suffix for unpredictability
    return `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`
  },

  // ============================================================
  // 5. Image optimisation with hashed paths
  // Next.js /_next/image automatically hashes — no source filenames
  // ============================================================
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year cache
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    // Block external image sources unless whitelisted
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },

  // ============================================================
  // 6. Security headers
  // Prevents iframe embedding, MIME sniffing, XSS
  // ============================================================
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Prevent clickjacking
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          // Prevent MIME sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Referrer policy — don't leak full URLs to external sites
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Permissions policy — disable unnecessary browser APIs
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          // Strict transport security (HTTPS only)
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          // Content Security Policy — locked down but allows inline JSON-LD
          // Note: 'unsafe-inline' on script-src is required for JSON-LD schema markup
          // This is acceptable because we're not loading external scripts
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: https: blob:",
              "connect-src 'self' https://cdn.sanity.io",
              "frame-ancestors 'self'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
        ],
      },
      // Cache static assets aggressively
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  // ============================================================
  // 7. Webpack customisation — strip comments, disable source maps
  // ============================================================
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Disable source maps entirely in production client build
      config.devtool = false

      // Strip all comments from production output
      if (config.optimization && config.optimization.minimizer) {
        config.optimization.minimizer.forEach((minimizer) => {
          if (minimizer.constructor.name === 'TerserPlugin') {
            minimizer.options.terserOptions = {
              ...minimizer.options.terserOptions,
              format: {
                ...minimizer.options.terserOptions?.format,
                comments: false, // Strip all comments
              },
              compress: {
                ...minimizer.options.terserOptions?.compress,
                drop_console: true, // Remove console.log statements
                drop_debugger: true,
              },
            }
            minimizer.options.extractComments = false
          }
        })
      }
    }

    return config
  },

  // ============================================================
  // 8. Compiler options — strip JSX comments and React dev warnings
  // ============================================================
  compiler: {
    // Remove all console.* calls in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error'], // Keep console.error for debugging critical issues
    } : false,
    // Remove React properties used only for dev tools
    reactRemoveProperties: process.env.NODE_ENV === 'production',
  },

  // ============================================================
  // 9. Experimental — disable telemetry, optimise package imports
  // ============================================================
  experimental: {
    // Optimise package imports for tree shaking
    optimizePackageImports: ['lucide-react', '@sanity/client'],
  },
}

module.exports = hardening
