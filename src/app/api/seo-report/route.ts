import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// ── Types ─────────────────────────────────────────────────────

interface KeywordRank {
  keyword: string;
  rank: number;
  prev_rank: number;
  delta: number;
}

interface CompetitorRecord {
  domain: string;
  url: string;
  status: string;
  hash: string;
  changed: boolean;
  page_count: number;
}

interface GscQuery {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface GscData {
  source: string;
  period?: string;
  clicks: number;
  impressions: number;
  ctr: number;
  avg_position: number;
  queries: GscQuery[];
  error?: string;
}

interface SeoReport {
  generated: string;
  date_stamp: string;
  site: string;
  summary: {
    keywords_tracked: number;
    keywords_ranked_top10: number;
    keywords_ranked_top3: number;
    keywords_dropped: number;
    keywords_improved: number;
    competitors_changed: number;
    cse_configured: boolean;
    queries_used_today: number;
  };
  keyword_ranks: KeywordRank[];
  competitor_monitoring: CompetitorRecord[];
  search_console: GscData;
  trends: {
    trends?: Array<{ keyword: string; avg_interest: number; recent_interest: number; trend: string }>;
    rising?: Array<{ seed: string; query: string; value: string }>;
    error?: string;
  };
  pagespeed: { mobile_score_logic_board: number; lcp_homepage: string };
  alerts: { rank_drops: string[]; rank_improvements: string[]; competitor_changes: string[] };
  setup_needed: { cse_cx: boolean; search_console: boolean; instructions: string };
}

// ── Fallback live checks (used on Vercel / when no local report) ──

const PAGES_TO_CHECK = [
  { label: 'Homepage', url: 'https://zasupport.com' },
  { label: 'Logic Board Repair', url: 'https://zasupport.com/logic-board-repair' },
  { label: 'Liquid Damage', url: 'https://zasupport.com/liquid-damage' },
  { label: 'MacBook Repair', url: 'https://zasupport.com/macbook-repair' },
];

async function checkPageStatus(label: string, url: string) {
  try {
    const res = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(10000) });
    return { label, url, status: res.status, ok: res.ok };
  } catch (err) {
    return { label, url, status: String(err), ok: false };
  }
}

async function getPageSpeed(apiKey?: string) {
  try {
    const key = apiKey ?? '';
    const psUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://zasupport.com/logic-board-repair&strategy=mobile${key ? `&key=${key}` : ''}`;
    const res = await fetch(psUrl, { signal: AbortSignal.timeout(30000) });
    if (!res.ok) return { lcp: 'N/A', fid: 'N/A', cls: 'N/A', ttfb: 'N/A', performanceScore: null };
    const data = await res.json();
    const cats = data?.lighthouseResult?.categories;
    const audits = data?.lighthouseResult?.audits;
    return {
      lcp: (audits?.['largest-contentful-paint']?.displayValue ?? 'N/A') as string,
      fid: (audits?.['total-blocking-time']?.displayValue ?? 'N/A') as string,
      cls: (audits?.['cumulative-layout-shift']?.displayValue ?? 'N/A') as string,
      ttfb: (audits?.['server-response-time']?.displayValue ?? 'N/A') as string,
      performanceScore: cats?.performance?.score != null ? Math.round(cats.performance.score * 100) : null,
    };
  } catch {
    return { lcp: 'N/A', fid: 'N/A', cls: 'N/A', ttfb: 'N/A', performanceScore: null };
  }
}

// ── Read latest local SEO tracker report ─────────────────────
// Works locally; on Vercel filesystem access is read-only to project root,
// so this gracefully returns null and falls through to live checks.

function getLatestReport(): SeoReport | null {
  const home = process.env.HOME ?? '/Users/courtneybentley';
  const seoDir = path.join(home, 'Desktop/Claude/SEO');
  try {
    if (!fs.existsSync(seoDir)) return null;
    const files = fs
      .readdirSync(seoDir)
      .filter((f) => /^report-\d{8}\.json$/.test(f))
      .sort()
      .reverse();
    if (files.length === 0) return null;
    const raw = fs.readFileSync(path.join(seoDir, files[0]), 'utf-8');
    return JSON.parse(raw) as SeoReport;
  } catch {
    return null;
  }
}

// ── HTML builder for full tracker report ─────────────────────

function scoreColour(s: number) {
  return s >= 70 ? '#0FEA7A' : s >= 50 ? '#F5A623' : '#F56565';
}

function buildReportHtml(r: SeoReport): string {
  const rankRows = r.keyword_ranks
    .map((k) => {
      const rankStr = k.rank > 0 ? `#${k.rank}` : k.rank === 0 ? '>10' : k.rank === -2 ? 'N/A*' : 'Err';
      const deltaStr = k.delta > 0 ? `&#9650;${k.delta}` : k.delta < 0 ? `&#9660;${Math.abs(k.delta)}` : '&#8212;';
      const dc = k.delta > 0 ? '#0FEA7A' : k.delta < 0 ? '#F56565' : '#888';
      return `<tr><td style="padding:6px 10px">${k.keyword}</td><td style="padding:6px 10px;text-align:center;font-weight:bold">${rankStr}</td><td style="padding:6px 10px;text-align:center;color:${dc}">${deltaStr}</td></tr>`;
    }).join('');

  const compRows = r.competitor_monitoring.map((c) =>
    `<tr><td style="padding:6px 10px">${c.domain}</td><td style="padding:6px 10px;text-align:center">${c.status === 'ok' ? '&#x2705;' : '&#x274C;'}</td><td style="padding:6px 10px;text-align:center">${c.page_count}</td><td style="padding:6px 10px;text-align:center">${c.changed ? '&#x26A0;&#xFE0F; Changed' : '&#8212;'}</td></tr>`
  ).join('');

  const risingList = (r.trends?.rising ?? []).slice(0, 10)
    .map((q) => `<li><strong>${q.query}</strong> <span style="color:#888;font-size:12px">(from: ${q.seed})</span></li>`).join('');

  const gsc = r.search_console;
  const ps = r.pagespeed;
  const alerts = [...r.alerts.rank_drops, ...r.alerts.competitor_changes];

  const gscRows = gsc.queries.slice(0, 15).map((q) =>
    `<tr><td style="padding:5px 10px">${q.query}</td><td style="padding:5px 10px;text-align:center">${q.clicks}</td><td style="padding:5px 10px;text-align:center">${q.impressions}</td><td style="padding:5px 10px;text-align:center">${q.ctr}</td><td style="padding:5px 10px;text-align:center">${q.position}</td></tr>`
  ).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <title>ZA Support SEO Report</title>
  <style>
    body{font-family:Arial,sans-serif;max-width:920px;margin:0 auto;padding:20px;color:#222;background:#f7f7f7}
    h2{color:#27504D}h3{color:#27504D;border-bottom:2px solid #27504D;padding-bottom:4px}
    .card{background:#fff;border-radius:8px;padding:16px;margin-bottom:16px;box-shadow:0 1px 4px rgba(0,0,0,.08)}
    table{width:100%;border-collapse:collapse}
    th{background:#27504D;color:#fff;padding:8px 10px;text-align:left;font-size:13px}
    td{font-size:13px}tr:nth-child(even){background:#f2f2f2}
    .stat{display:inline-block;margin:4px 14px 4px 0;font-size:1.3em;font-weight:bold}
    .stat-label{font-size:11px;color:#888;display:block;font-weight:normal}
    ul{padding-left:20px}li{margin-bottom:4px}
    .warn{color:#F5A623}.ok{color:#0FEA7A}.err{color:#F56565}
  </style>
</head>
<body>
  <h2>ZA Support &#8212; SEO Tracker Report</h2>
  <p style="color:#888;margin-top:-8px">Generated: ${r.generated} | ${r.site}</p>

  <div class="card">
    <h3>Summary</h3>
    <span class="stat"><span class="stat-label">Top 10</span>${r.summary.keywords_ranked_top10}/${r.summary.keywords_tracked}</span>
    <span class="stat"><span class="stat-label">Top 3</span>${r.summary.keywords_ranked_top3}</span>
    <span class="stat"><span class="stat-label">Dropped</span><span class="${r.summary.keywords_dropped > 0 ? 'err' : 'ok'}">${r.summary.keywords_dropped}</span></span>
    <span class="stat"><span class="stat-label">Improved</span><span class="ok">${r.summary.keywords_improved}</span></span>
    <span class="stat"><span class="stat-label">GSC Clicks</span>${gsc.clicks}</span>
    <span class="stat"><span class="stat-label">Impressions</span>${gsc.impressions}</span>
    <span class="stat"><span class="stat-label">Avg Pos</span>${gsc.avg_position}</span>
    <span class="stat"><span class="stat-label">Mobile Score</span><span style="color:${scoreColour(ps.mobile_score_logic_board)}">${ps.mobile_score_logic_board}</span></span>
    ${!r.summary.cse_configured ? '<p class="warn" style="margin-top:10px;font-size:13px">&#x26A0;&#xFE0F; Custom Search Engine not configured &#8212; set GOOGLE_CSE_CX. See ~/bin/za-seo-tracker.sh lines 40-60.</p>' : ''}
  </div>

  ${alerts.length > 0 ? `<div class="card"><h3>&#x26A0;&#xFE0F; Alerts</h3><ul>${alerts.map((a) => `<li class="err">${a}</li>`).join('')}</ul></div>` : ''}

  <div class="card">
    <h3>Keyword Rankings &#8212; Johannesburg SERPs</h3>
    <table><thead><tr><th>Keyword</th><th>Position</th><th>Change</th></tr></thead><tbody>${rankRows}</tbody></table>
    <p style="font-size:11px;color:#aaa;margin-top:6px">Queries used: ${r.summary.queries_used_today}/100 free daily quota ${!r.summary.cse_configured ? '&#8212; * N/A = CSE not yet configured' : ''}</p>
  </div>

  <div class="card">
    <h3>Competitor Monitoring</h3>
    <table><thead><tr><th>Domain</th><th>Reachable</th><th>Pages</th><th>Changed</th></tr></thead><tbody>${compRows}</tbody></table>
  </div>

  ${risingList ? `<div class="card"><h3>Rising Keyword Opportunities (PyTrends)</h3><ul>${risingList}</ul></div>` : ''}

  <div class="card">
    <h3>Search Console &#8212; ${gsc.source}${gsc.period ? ` (${gsc.period})` : ''}</h3>
    ${gsc.queries.length > 0
      ? `<table><thead><tr><th>Query</th><th>Clicks</th><th>Impr.</th><th>CTR%</th><th>Pos.</th></tr></thead><tbody>${gscRows}</tbody></table>`
      : `<p class="warn">No GSC data. ${r.setup_needed.search_console ? 'Export CSV from Search Console &#8594; Performance &#8594; Download, save as ~/Desktop/Claude/SEO/gsc-export.csv' : ''}</p>`}
  </div>

  <div class="card">
    <h3>PageSpeed &#8212; Mobile (logic-board-repair)</h3>
    <p><strong>Score:</strong> <span style="color:${scoreColour(ps.mobile_score_logic_board)}">${ps.mobile_score_logic_board}</span> &nbsp; <strong>LCP:</strong> ${ps.lcp_homepage ?? 'N/A'}</p>
  </div>

  <p style="font-size:11px;color:#ccc;margin-top:20px">Runs daily 02:30 via com.zasupport.seotracker &#8212; ~/bin/za-seo-tracker.sh</p>
</body></html>`;
}

// ── GET ───────────────────────────────────────────────────────

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get('format') ?? 'json';

  // Serve from local overnight tracker report if available
  const localReport = getLatestReport();
  if (localReport) {
    if (format === 'html') {
      return new Response(buildReportHtml(localReport), {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }
    return NextResponse.json({ source: 'local_tracker', report: localReport });
  }

  // Fallback: live checks for Vercel / first run
  const date = new Date().toLocaleDateString('en-ZA', {
    day: '2-digit', month: 'long', year: 'numeric', timeZone: 'Africa/Johannesburg',
  });

  const [pageStatuses, cwv] = await Promise.all([
    Promise.all(PAGES_TO_CHECK.map((p) => checkPageStatus(p.label, p.url))),
    getPageSpeed(process.env.GOOGLE_MAPS_API_KEY),
  ]);

  if (format === 'html') {
    const allOk = pageStatuses.every((p) => p.ok);
    const rows = pageStatuses.map((p) =>
      `<li>${p.ok ? '&#x2705;' : '&#x274C;'} <strong>${p.label}</strong> &#8212; HTTP ${p.status}</li>`
    ).join('');
    const sc = cwv.performanceScore == null ? '#888' : cwv.performanceScore >= 70 ? '#0FEA7A' : '#F5A623';
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>SEO Report</title></head>
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#222">
  <h2 style="color:#27504D">ZA Support SEO Report &#8212; ${date}</h2>
  <p style="color:#F5A623">&#x26A0;&#xFE0F; No overnight tracker report found. Run <code>bash ~/bin/za-seo-tracker.sh</code></p>
  <h3>Live Page Status</h3>
  <ul>${rows}</ul>
  <p>${allOk ? '&#x2705; All pages OK.' : '&#x26A0;&#xFE0F; One or more pages returned non-200.'}</p>
  <h3>PageSpeed (mobile)</h3>
  <ul>
    <li><strong>Performance Score:</strong> <span style="color:${sc}">${cwv.performanceScore ?? 'N/A'}</span></li>
    <li><strong>LCP:</strong> ${cwv.lcp}</li>
    <li><strong>TBT:</strong> ${cwv.fid}</li>
    <li><strong>CLS:</strong> ${cwv.cls}</li>
    <li><strong>TTFB:</strong> ${cwv.ttfb}</li>
  </ul>
</body></html>`;
    return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  }

  return NextResponse.json({
    source: 'live_check',
    note: 'No local tracker report. Run ~/bin/za-seo-tracker.sh to generate one.',
    date,
    page_statuses: pageStatuses,
    pagespeed: cwv,
  });
}
