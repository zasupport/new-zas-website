import { NextResponse } from 'next/server';

// Vercel Cron handler — delegates to main SEO report endpoint
// Schedule: "0 7 * * *" in vercel.json (07:00 UTC = 09:00 SAST)
export async function GET() {
  try {
    const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zasupport.com';
    const res = await fetch(`${base}/api/seo-report`, { method: 'GET' });
    const data = await res.json();
    return NextResponse.json({ cron: true, ...data });
  } catch (err) {
    return NextResponse.json({ cron: true, error: String(err) }, { status: 500 });
  }
}
