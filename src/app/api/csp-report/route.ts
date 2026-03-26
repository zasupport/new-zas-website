import { NextRequest, NextResponse } from 'next/server';

// CSP violation report receiver.
// Browsers POST here when a Content-Security-Policy rule is violated.
// Violations are logged to Vercel's log drain — no DB write needed.
// Content-Type: application/csp-report (old spec) or application/reports+json (Reporting API v1)

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') ?? '';
    let report: unknown;

    if (contentType.includes('application/csp-report') || contentType.includes('application/json')) {
      report = await request.json();
    } else {
      const text = await request.text();
      report = { raw: text };
    }

    console.log(JSON.stringify({
      event: 'csp_violation',
      ts: new Date().toISOString(),
      report,
      ua: request.headers.get('user-agent') ?? '',
      ref: request.headers.get('referer') ?? '',
    }));
  } catch {
    // Non-fatal
  }

  return new NextResponse(null, { status: 204 });
}
