import { NextRequest, NextResponse } from 'next/server';

// WhatsApp tracking redirect — logs clicks, redirects to wa.me URL.
// wa.me does not support UTM params, so clicks are tracked server-side.

const SERVICE_MAP: Record<string, string> = {
  'logic-board': 'Hi, I need a logic board repair quote',
  'liquid-damage': 'Hi, I need a liquid damage repair quote',
  'macbook-repair': 'Hi, I need a MacBook repair quote',
  'battery': 'Hi, I need a MacBook battery replacement quote',
  'screen': 'Hi, I need a MacBook screen replacement quote',
  'no-fix-no-fee': 'Hi, I need a free Mac diagnostic',
  'assessment': 'Hi, I need a free Mac diagnostic',
  'general': 'Hi, I need help with my Apple device',
};

const BASE_WA = 'https://wa.me/27645295863';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawService = searchParams.get('service') ?? 'general';
  const rawPage = searchParams.get('page') ?? '/';

  // Whitelist service values — reject anything not in the map
  const service = SERVICE_MAP[rawService] ? rawService : 'general';
  // Sanitise page param — only allow alphanumeric, hyphens, slashes
  const page = /^[a-zA-Z0-9\-\/]+$/.test(rawPage) ? rawPage : '/';

  // Build ref code from service + page for tracking
  const pageRef = page.replace(/^\//, '').replace(/\//g, '-').toUpperCase() || 'HOME';
  const svcRef = service.toUpperCase().replace(/-/g, '');
  const ref = `${svcRef}-${pageRef}`;

  const textParam = `${SERVICE_MAP[service]} [REF:${ref}]`;
  const waUrl = `${BASE_WA}?text=${encodeURIComponent(textParam)}`;

  // Log click via structured console.log (captured by Vercel log drain — no filesystem)
  console.log(JSON.stringify({
    event: 'wa_click',
    ts: new Date().toISOString(),
    service,
    page,
    ua: request.headers.get('user-agent') ?? '',
    ref: request.headers.get('referer') ?? '',
  }));

  const response = NextResponse.redirect(waUrl, { status: 302 });

  // Track returning visitors — 30 day expiry, secure + httpOnly
  response.cookies.set('za_wa_click', '1', {
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
    sameSite: 'lax',
    secure: true,
    httpOnly: true,
  });

  return response;
}
