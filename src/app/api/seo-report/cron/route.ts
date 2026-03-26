import { NextRequest, NextResponse } from 'next/server';

// Vercel Cron handler — delegates to main SEO report endpoint
// Schedule: "0 7 * * *" in vercel.json (07:00 UTC = 09:00 SAST)
// Auth: Vercel injects Authorization: Bearer ${CRON_SECRET} automatically when CRON_SECRET env var is set.
// Middleware also guards this route — double protection.
export async function GET(request: NextRequest) {
  // Verify Vercel cron token (middleware handles this too, belt-and-suspenders)
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const auth = request.headers.get('authorization');
    if (auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
    }
  }

  try {
    const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zasupport.com';
    const res = await fetch(`${base}/api/seo-report`, {
      method: 'GET',
      headers: {
        // Pass the cron secret through so seo-report can also validate if needed
        ...(cronSecret ? { authorization: `Bearer ${cronSecret}` } : {}),
      },
    });
    const data = await res.json();
    return NextResponse.json({ cron: true, ...data });
  } catch (err) {
    return NextResponse.json({ cron: true, error: String(err) }, { status: 500 });
  }
}
