/**
 * Cloudflare Worker: Strip tech-stack fingerprints from HTML responses.
 * Deploy via Wrangler: wrangler deploy cloudflare-worker/strip-fingerprints.js
 *
 * What it removes:
 *   - server: Vercel header
 *   - x-vercel-id, x-vercel-cache, x-vercel-execution-region headers
 *   - x-nextjs-prerender, x-nextjs-stale-time headers
 *   - x-powered-by header (belt-and-suspenders)
 *   - HTML build-ID comments like <!--GpMfued4KOQvllko4uTP9-->
 *   - React Suspense markers: <!--$--> <!--/$--> <!--$?-->
 *   - <meta name="next-size-adjust"> tag
 *
 * What it sets:
 *   - server: ZAS (neutral, non-identifying)
 *
 * Only processes text/html responses — static assets are passed through unchanged.
 */

export default {
  async fetch(request, env) {
    const response = await fetch(request);

    // Only process HTML documents — skip static assets
    const contentType = response.headers.get('content-type') ?? '';
    if (!contentType.includes('text/html')) {
      return stripHeaders(response);
    }

    // Stream HTML through the fingerprint-stripping transformer
    const { readable, writable } = new TransformStream();
    stripHtml(response.body, writable);

    const newHeaders = new Headers(response.headers);
    removeFrameworkHeaders(newHeaders);

    return new Response(readable, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  },
};

/** Remove framework-identifying response headers. */
function removeFrameworkHeaders(headers) {
  const toRemove = [
    'server',
    'x-powered-by',
    'x-vercel-id',
    'x-vercel-cache',
    'x-vercel-execution-region',
    'x-nextjs-prerender',
    'x-nextjs-stale-time',
    'x-matched-path',
  ];
  for (const h of toRemove) {
    headers.delete(h);
  }
  headers.set('server', 'ZAS');
}

/** Strip headers for non-HTML responses (static assets etc.). */
function stripHeaders(response) {
  const newHeaders = new Headers(response.headers);
  removeFrameworkHeaders(newHeaders);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}

/**
 * Stream HTML through a TextDecoder/Encoder pipeline, removing fingerprint patterns.
 * Processes in 64KB chunks to avoid buffering entire pages.
 */
async function stripHtml(readable, writable) {
  const reader = readable.getReader();
  const writer = writable.getWriter();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      let chunk = decoder.decode(value, { stream: true });

      // Strip Next.js build-ID comment (alphanumeric hash in HTML comment)
      chunk = chunk.replace(/<!--[A-Za-z0-9+/=]{8,64}-->/g, '');

      // Strip React Server Component Suspense markers
      chunk = chunk.replace(/<!--\$(?:\?)?-->/g, '').replace(/<!--\/\$-->/g, '');

      // Strip next-size-adjust meta tag
      chunk = chunk.replace(/<meta\s+name="next-size-adjust"[^>]*>/gi, '');

      // Strip Vercel deploy ID from static asset URLs (?dpl=dpl_xxxx query param)
      chunk = chunk.replace(/\?dpl=dpl_[A-Za-z0-9]+/g, '');

      await writer.write(encoder.encode(chunk));
    }
  } finally {
    await writer.close();
  }
}
