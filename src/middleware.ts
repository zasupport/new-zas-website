import { NextRequest, NextResponse } from 'next/server';

// ─── Rate Limiting ──────────────────────────────────────────────────────────
// In-memory sliding window per IP. Vercel edge functions are stateless so this
// resets per cold start — sufficient to throttle bursts, not persistent DDoS.

interface RateEntry {
  count: number;
  windowStart: number;
}

const rateLimitStore = new Map<string, RateEntry>();

const RATE_LIMITS: Record<string, { max: number; windowMs: number }> = {
  '/api/contact': { max: 5, windowMs: 60_000 },
  '/api/book': { max: 5, windowMs: 60_000 },
  '/api/search': { max: 20, windowMs: 60_000 },
  '/api/wa': { max: 30, windowMs: 60_000 },
  '/api/seo-report': { max: 10, windowMs: 60_000 },
  default: { max: 120, windowMs: 60_000 },
};

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('cf-connecting-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'
  );
}

function checkRateLimit(ip: string, path: string): boolean {
  const rule =
    RATE_LIMITS[path] ??
    Object.entries(RATE_LIMITS).find(([k]) => path.startsWith(k))?.[1] ??
    RATE_LIMITS.default;

  const key = `${ip}:${path}`;
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now - entry.windowStart > rule.windowMs) {
    rateLimitStore.set(key, { count: 1, windowStart: now });
    return true; // allowed
  }

  if (entry.count >= rule.max) return false; // blocked

  entry.count++;
  return true; // allowed
}

// ─── Bot Detection ──────────────────────────────────────────────────────────
const BLOCKED_UA_PATTERNS = [
  /sqlmap/i,
  /nikto/i,
  /nmap/i,
  /masscan/i,
  /zgrab/i,
  /scrapy/i,
  /python-requests\/[01]\./i,
  /curl\/[0-6]\./i,
  /Go-http-client\/1\./i,
  /libwww-perl/i,
  /zgrab/i,
  /nuclei/i,
  /dirbuster/i,
  /gobuster/i,
  /wfuzz/i,
];

function isMaliciousBot(ua: string | null): boolean {
  if (!ua) return false; // no UA on API routes is handled separately
  return BLOCKED_UA_PATTERNS.some((p) => p.test(ua));
}

// ─── Security Headers ───────────────────────────────────────────────────────
// Single source of truth — replaces both next.config.ts headers() and vercel.json headers.

function buildCsp(nonce: string): string {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' https://www.googletagmanager.com https://www.google-analytics.com`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    // img-src: Sanity images proxied via /_next/image — cdn.sanity.io not needed in browser CSP
    "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com",
    "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://api.zasupport.com https://api.indexnow.org",
    "frame-src 'self' https://maps.google.com https://www.google.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    "upgrade-insecure-requests",
    "report-uri /api/csp-report",
  ].join('; ');
}

function applySecurityHeaders(response: NextResponse, nonce: string): void {
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Content-Security-Policy', buildCsp(nonce));

  // Strip framework-identifying headers (Vercel/Next.js fingerprints).
  // Note: server + x-vercel-id are injected AFTER middleware by Vercel's edge — strip those via Cloudflare Transform Rules.
  response.headers.delete('x-powered-by');
  response.headers.delete('x-nextjs-prerender');
  response.headers.delete('x-nextjs-stale-time');
  response.headers.delete('x-matched-path');
  // Replace framework-leaking Vary with a clean value for HTML responses
  if (!response.headers.get('content-type')?.includes('application/javascript')) {
    response.headers.set('vary', 'Accept-Encoding');
  }
}

// ─── Cron Authentication ────────────────────────────────────────────────────
function isCronAuthorised(request: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) return false; // If CRON_SECRET not set, deny all cron access
  const auth = request.headers.get('authorization');
  return auth === `Bearer ${cronSecret}`;
}

// ─── CSRF Origin Check ──────────────────────────────────────────────────────
function isValidOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  const allowed = ['https://zasupport.com', 'https://www.zasupport.com', 'http://localhost:3000'];

  if (origin) return allowed.some((a) => origin.startsWith(a));
  if (referer) return allowed.some((a) => referer.startsWith(a));

  // No origin/referer — could be a direct API call (curl, Postman). Allow GET, block POST.
  return request.method === 'GET';
}

// ─── Middleware Entry ───────────────────────────────────────────────────────
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ip = getClientIp(request);
  const ua = request.headers.get('user-agent');

  // Block known malicious bots on all routes
  if (isMaliciousBot(ua)) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  // Block API routes with no user-agent (raw bot probes)
  if (pathname.startsWith('/api/') && !ua) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  // Protect cron endpoint — Vercel injects Authorization header automatically when CRON_SECRET is set
  if (pathname === '/api/seo-report/cron') {
    if (!isCronAuthorised(request)) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
    }
  }

  // CSRF origin check on POST routes
  // Exempt /api/csp-report — browsers POST violation reports without a matching Origin header
  if (request.method === 'POST' && pathname.startsWith('/api/') && pathname !== '/api/csp-report') {
    if (!isValidOrigin(request)) {
      return NextResponse.json({ error: 'Invalid origin' }, { status: 403 });
    }
  }

  // Rate limiting on API routes
  if (pathname.startsWith('/api/')) {
    if (!checkRateLimit(ip, pathname)) {
      return NextResponse.json(
        { error: 'Too many requests — please wait before trying again.' },
        {
          status: 429,
          headers: { 'Retry-After': '60' },
        }
      );
    }
  }

  // Generate a per-request nonce for CSP
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  // Pass nonce downstream so layout.tsx can attach it to <script> tags
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);

  const response = NextResponse.next({ request: { headers: requestHeaders } });

  applySecurityHeaders(response, nonce);

  return response;
}

export const config = {
  matcher: [
    // Apply to everything except static assets and images (handled by Vercel CDN)
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|c4f4daab237f44197e59b5b52f40da52.txt).*)',
  ],
};
