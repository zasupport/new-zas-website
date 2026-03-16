import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// WhatsApp tracking redirect — logs clicks, redirects to appropriate wa.me URL
// wa.me doesn't support UTM params, so we track server-side instead.

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
  const service = searchParams.get('service') ?? 'general';
  const page = searchParams.get('page') ?? '/';

  const textParam = SERVICE_MAP[service] ?? SERVICE_MAP['general'];
  const waUrl = `${BASE_WA}?text=${textParam}`;

  // Log the click (file-based, swap for DB later)
  try {
    const logDir = '/tmp/za-wa-clicks';
    if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
    const logFile = path.join(logDir, 'clicks.ndjson');
    const entry = JSON.stringify({
      ts: new Date().toISOString(),
      service,
      page,
      ua: request.headers.get('user-agent') ?? '',
      ref: request.headers.get('referer') ?? '',
    });
    fs.appendFileSync(logFile, entry + '\n');
  } catch {
    // Non-fatal — log to console and continue
    console.log(`[wa-track] service=${service} page=${page}`);
  }

  const response = NextResponse.redirect(waUrl, { status: 302 });
  // Track returning visitors — 30 day expiry
  response.cookies.set('za_wa_click', '1', {
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
    sameSite: 'lax',
  });
  return response;
}
