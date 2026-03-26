import { NextRequest, NextResponse } from 'next/server';

// WhatsApp tracking redirect — logs clicks, redirects to wa.me URL.
// wa.me does not support UTM params, so clicks are tracked server-side.

const SERVICE_MAP: Record<string, string> = {
  'logic-board': 'Hi%2C%20I%20need%20a%20logic%20board%20repair%20quote',
  'liquid-damage': 'Hi%2C%20I%20need%20a%20liquid%20damage%20repair%20quote',
  'macbook-repair': 'Hi%2C%20I%20need%20a%20MacBook%20repair%20quote',
  'battery': 'Hi%2C%20I%20need%20a%20MacBook%20battery%20replacement%20quote',
  'screen': 'Hi%2C%20I%20need%20a%20MacBook%20screen%20replacement%20quote',
  'no-fix-no-fee': 'Hi%2C%20I%20need%20a%20free%20Mac%20diagnostic',
  'general': 'Hi%2C%20I%20need%20help%20with%20my%20Apple%20device',
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

  const textParam = SERVICE_MAP[service];
  const waUrl = `${BASE_WA}?text=${textParam}`;

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
