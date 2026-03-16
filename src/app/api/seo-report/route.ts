import { NextResponse } from 'next/server';

const RESEND_API_KEY = process.env.RESEND_API_KEY ?? '';
const RECIPIENT = 'courtney@zasupport.com';
const PAGES_TO_CHECK = [
  { label: 'Homepage', url: 'https://zasupport.com' },
  { label: 'Logic Board Repair', url: 'https://zasupport.com/logic-board-repair' },
  { label: 'Liquid Damage', url: 'https://zasupport.com/liquid-damage' },
  { label: 'MacBook Repair', url: 'https://zasupport.com/macbook-repair' },
];

interface PageStatus {
  label: string;
  url: string;
  status: number | string;
  ok: boolean;
}

interface CWV {
  lcp: string;
  fid: string;
  cls: string;
  ttfb: string;
  performanceScore: number | null;
}

async function checkPageStatus(label: string, url: string): Promise<PageStatus> {
  try {
    const res = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(10000) });
    return { label, url, status: res.status, ok: res.ok };
  } catch (err) {
    return { label, url, status: String(err), ok: false };
  }
}

async function getPageSpeed(): Promise<CWV> {
  try {
    const psUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://zasupport.com&strategy=mobile`;
    const res = await fetch(psUrl, { signal: AbortSignal.timeout(30000) });
    if (!res.ok) return { lcp: 'N/A', fid: 'N/A', cls: 'N/A', ttfb: 'N/A', performanceScore: null };
    const data = await res.json();
    const cats = data?.lighthouseResult?.categories;
    const audits = data?.lighthouseResult?.audits;
    return {
      lcp: audits?.['largest-contentful-paint']?.displayValue ?? 'N/A',
      fid: audits?.['total-blocking-time']?.displayValue ?? 'N/A',
      cls: audits?.['cumulative-layout-shift']?.displayValue ?? 'N/A',
      ttfb: audits?.['server-response-time']?.displayValue ?? 'N/A',
      performanceScore: cats?.performance?.score != null ? Math.round(cats.performance.score * 100) : null,
    };
  } catch {
    return { lcp: 'N/A', fid: 'N/A', cls: 'N/A', ttfb: 'N/A', performanceScore: null };
  }
}

export async function GET() {
  const date = new Date().toLocaleDateString('en-ZA', {
    day: '2-digit', month: 'long', year: 'numeric', timeZone: 'Africa/Johannesburg',
  });

  const [pageStatuses, cwv] = await Promise.all([
    Promise.all(PAGES_TO_CHECK.map((p) => checkPageStatus(p.label, p.url))),
    getPageSpeed(),
  ]);

  const allOk = pageStatuses.every((p) => p.ok);
  const statusRows = pageStatuses
    .map((p) => `<li>${p.ok ? '✅' : '❌'} <strong>${p.label}</strong> — HTTP ${p.status}</li>`)
    .join('\n');

  const scoreColour = cwv.performanceScore == null
    ? '#888'
    : cwv.performanceScore >= 70 ? '#0FEA7A' : '#F5A623';

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>SEO Morning Report</title></head>
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#222;">
  <h2 style="color:#27504D;">ZA Support SEO Morning Report</h2>
  <p><strong>Date:</strong> ${date}</p>

  <h3>Page Status</h3>
  <ul>${statusRows}</ul>
  <p>${allOk ? '✅ All pages returning 200 OK.' : '⚠️ One or more pages returned a non-200 status — investigate.'}</p>

  <h3>Core Web Vitals (mobile)</h3>
  <ul>
    <li><strong>Performance Score:</strong> <span style="color:${scoreColour}">${cwv.performanceScore ?? 'N/A'}</span></li>
    <li><strong>LCP (Largest Contentful Paint):</strong> ${cwv.lcp}</li>
    <li><strong>TBT (Total Blocking Time / FID proxy):</strong> ${cwv.fid}</li>
    <li><strong>CLS (Cumulative Layout Shift):</strong> ${cwv.cls}</li>
    <li><strong>TTFB (Server Response Time):</strong> ${cwv.ttfb}</li>
  </ul>

  <p style="font-size:12px;color:#888;">
    Sent automatically by ZA Support SEO Cron — ${date}
  </p>
</body>
</html>`;

  if (!RESEND_API_KEY) {
    return NextResponse.json({ status: 'skipped', reason: 'RESEND_API_KEY not set', date });
  }

  const sendRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'ZA Support SEO <onboarding@resend.dev>',
      to: [RECIPIENT],
      subject: `ZA Support SEO Morning Report — ${date}`,
      html,
    }),
  });

  const sendData = await sendRes.json();
  return NextResponse.json({ status: sendRes.ok ? 'sent' : 'error', date, resend: sendData });
}
