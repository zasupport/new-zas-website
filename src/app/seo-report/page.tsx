import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SEO Tracker | ZA Support',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

interface SeoReportData {
  generated: string;
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
  search_console: {
    source: string;
    period?: string;
    clicks: number;
    impressions: number;
    ctr: number;
    avg_position: number;
    queries: GscQuery[];
    error?: string;
  };
  trends: {
    trends?: Array<{ keyword: string; avg_interest: number; recent_interest: number; trend: string }>;
    rising?: Array<{ seed: string; query: string; value: string }>;
    error?: string;
  };
  pagespeed: { mobile_score_logic_board: number; lcp_homepage: string };
  alerts: { rank_drops: string[]; rank_improvements: string[]; competitor_changes: string[] };
  setup_needed: { cse_cx: boolean; search_console: boolean };
}

interface ApiResponse {
  source: string;
  report?: SeoReportData;
  note?: string;
  date?: string;
  page_statuses?: Array<{ label: string; url: string; status: number | string; ok: boolean }>;
  pagespeed?: {
    lcp: string;
    fid: string;
    cls: string;
    ttfb: string;
    performanceScore: number | null;
  };
}

async function fetchReport(): Promise<ApiResponse> {
  try {
    const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zasupport.com';
    const res = await fetch(`${base}/api/seo-report`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  } catch {
    return { source: 'error', note: 'Failed to fetch SEO report data.' };
  }
}

function scoreColor(s: number) {
  if (s >= 70) return '#0FEA7A';
  if (s >= 50) return '#F5A623';
  return '#F56565';
}

function RankBadge({ rank }: { rank: number }) {
  if (rank > 0 && rank <= 3) return <span style={{ background: '#0FEA7A', color: '#111', borderRadius: 4, padding: '2px 7px', fontWeight: 700, fontSize: 13 }}>#{rank}</span>;
  if (rank > 0 && rank <= 10) return <span style={{ background: '#27504D', color: '#fff', borderRadius: 4, padding: '2px 7px', fontWeight: 700, fontSize: 13 }}>#{rank}</span>;
  if (rank === 0) return <span style={{ color: '#888', fontSize: 13 }}>&gt;10</span>;
  return <span style={{ color: '#555', fontSize: 13 }}>N/A</span>;
}

function DeltaBadge({ delta }: { delta: number }) {
  if (delta > 0) return <span style={{ color: '#0FEA7A', fontWeight: 600, fontSize: 13 }}>▲{delta}</span>;
  if (delta < 0) return <span style={{ color: '#F56565', fontWeight: 600, fontSize: 13 }}>▼{Math.abs(delta)}</span>;
  return <span style={{ color: '#888', fontSize: 13 }}>—</span>;
}

export default async function SeoReportPage() {
  const data = await fetchReport();

  if (data.source === 'error') {
    return (
      <main style={{ fontFamily: 'Arial, sans-serif', maxWidth: 720, margin: '40px auto', padding: '0 20px', color: '#222' }}>
        <h1 style={{ color: '#27504D' }}>SEO Tracker</h1>
        <p style={{ color: '#F56565' }}>{data.note ?? 'Unknown error'}</p>
      </main>
    );
  }

  // Live-check fallback (no overnight report)
  if (data.source === 'live_check') {
    const ps = data.pagespeed;
    return (
      <main style={{ fontFamily: 'Arial, sans-serif', maxWidth: 720, margin: '40px auto', padding: '0 20px', color: '#222' }}>
        <h1 style={{ color: '#27504D' }}>SEO Tracker — Live Check</h1>
        <p style={{ background: '#FFF3CD', border: '1px solid #F5A623', borderRadius: 6, padding: '10px 14px', color: '#7a5a00', fontSize: 14 }}>
          ⚠️ No overnight tracker report found. Run <code>bash ~/bin/za-seo-tracker.sh</code> to generate one.
          The LaunchAgent runs daily at 02:30 via <code>com.zasupport.seotracker</code>.
        </p>

        <h2 style={{ color: '#27504D', marginTop: 28 }}>Page Status</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#27504D', color: '#fff' }}>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Page</th>
              <th style={{ padding: '8px 12px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {(data.page_statuses ?? []).map((p, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                <td style={{ padding: '7px 12px' }}><a href={p.url} style={{ color: '#27504D' }}>{p.label}</a></td>
                <td style={{ padding: '7px 12px', textAlign: 'center' }}>{p.ok ? '✅' : `❌ ${p.status}`}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {ps && (
          <>
            <h2 style={{ color: '#27504D', marginTop: 28 }}>PageSpeed — Mobile</h2>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginTop: 10 }}>
              {[
                { label: 'Performance', val: ps.performanceScore != null ? String(ps.performanceScore) : 'N/A', color: ps.performanceScore != null ? scoreColor(ps.performanceScore) : '#888' },
                { label: 'LCP', val: ps.lcp, color: '#222' },
                { label: 'TBT', val: ps.fid, color: '#222' },
                { label: 'CLS', val: ps.cls, color: '#222' },
                { label: 'TTFB', val: ps.ttfb, color: '#222' },
              ].map((m) => (
                <div key={m.label} style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 8, padding: '12px 20px', minWidth: 110, textAlign: 'center' }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: m.color }}>{m.val}</div>
                  <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>{m.label}</div>
                </div>
              ))}
            </div>
          </>
        )}
        <p style={{ fontSize: 11, color: '#bbb', marginTop: 30 }}>ZA Support SEO Tracker — {data.date}</p>
      </main>
    );
  }

  // Full tracker report
  const r = data.report!;
  const allAlerts = [...(r.alerts.rank_drops ?? []), ...(r.alerts.competitor_changes ?? [])];
  const improvements = r.alerts.rank_improvements ?? [];

  return (
    <main style={{ fontFamily: 'Arial, sans-serif', maxWidth: 940, margin: '40px auto', padding: '0 20px', color: '#222' }}>
      <h1 style={{ color: '#27504D', marginBottom: 4 }}>ZA Support — SEO Tracker</h1>
      <p style={{ color: '#888', marginTop: 0, fontSize: 14 }}>Generated: {r.generated} | {r.site}</p>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 14, margin: '20px 0' }}>
        {[
          { label: 'Top 10 Keywords', val: `${r.summary.keywords_ranked_top10}/${r.summary.keywords_tracked}`, color: '#0FEA7A' },
          { label: 'Top 3', val: r.summary.keywords_ranked_top3, color: '#0FEA7A' },
          { label: 'Dropped', val: r.summary.keywords_dropped, color: r.summary.keywords_dropped > 0 ? '#F56565' : '#0FEA7A' },
          { label: 'Improved', val: r.summary.keywords_improved, color: '#0FEA7A' },
          { label: 'GSC Clicks', val: r.search_console.clicks, color: '#222' },
          { label: 'Impressions', val: r.search_console.impressions, color: '#222' },
          { label: 'Avg Position', val: r.search_console.avg_position, color: '#222' },
          { label: 'Mobile Score', val: r.pagespeed.mobile_score_logic_board, color: scoreColor(r.pagespeed.mobile_score_logic_board) },
        ].map((c) => (
          <div key={c.label} style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: 10, padding: '14px 16px', boxShadow: '0 1px 4px rgba(0,0,0,.06)' }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: c.color }}>{c.val}</div>
            <div style={{ fontSize: 11, color: '#888', marginTop: 4 }}>{c.label}</div>
          </div>
        ))}
      </div>

      {!r.summary.cse_configured && (
        <div style={{ background: '#FFF3CD', border: '1px solid #F5A623', borderRadius: 6, padding: '10px 14px', color: '#7a5a00', fontSize: 13, marginBottom: 16 }}>
          ⚠️ Custom Search Engine not configured — set <code>GOOGLE_CSE_CX</code>.
          See <code>~/bin/za-seo-tracker.sh</code> lines 40–60 for setup instructions.
        </div>
      )}

      {/* Alerts */}
      {allAlerts.length > 0 && (
        <div style={{ background: '#fff', border: '1px solid #F56565', borderRadius: 8, padding: 16, marginBottom: 16 }}>
          <h2 style={{ color: '#F56565', marginTop: 0, fontSize: 16 }}>⚠️ Alerts</h2>
          <ul style={{ paddingLeft: 20, margin: 0 }}>
            {allAlerts.map((a, i) => <li key={i} style={{ color: '#F56565', fontSize: 14, marginBottom: 4 }}>{a}</li>)}
          </ul>
        </div>
      )}

      {improvements.length > 0 && (
        <div style={{ background: '#fff', border: '1px solid #0FEA7A', borderRadius: 8, padding: 16, marginBottom: 16 }}>
          <h2 style={{ color: '#0FEA7A', marginTop: 0, fontSize: 16 }}>✅ Improvements</h2>
          <ul style={{ paddingLeft: 20, margin: 0 }}>
            {improvements.map((a, i) => <li key={i} style={{ color: '#27504D', fontSize: 14, marginBottom: 4 }}>{a}</li>)}
          </ul>
        </div>
      )}

      {/* Keyword Rankings */}
      <div style={{ background: '#fff', borderRadius: 10, padding: 20, marginBottom: 16, boxShadow: '0 1px 4px rgba(0,0,0,.07)' }}>
        <h2 style={{ color: '#27504D', marginTop: 0, borderBottom: '2px solid #27504D', paddingBottom: 6 }}>
          Keyword Rankings — Johannesburg SERPs
        </h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#27504D', color: '#fff' }}>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Keyword</th>
              <th style={{ padding: '8px 12px', textAlign: 'center' }}>Position</th>
              <th style={{ padding: '8px 12px', textAlign: 'center' }}>Change</th>
            </tr>
          </thead>
          <tbody>
            {r.keyword_ranks.map((k, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                <td style={{ padding: '7px 12px' }}>{k.keyword}</td>
                <td style={{ padding: '7px 12px', textAlign: 'center' }}><RankBadge rank={k.rank} /></td>
                <td style={{ padding: '7px 12px', textAlign: 'center' }}><DeltaBadge delta={k.delta} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 11, color: '#bbb', marginTop: 8 }}>
          Queries used today: {r.summary.queries_used_today}/100 daily free quota
          {!r.summary.cse_configured && ' — * N/A = CSE not yet configured'}
        </p>
      </div>

      {/* Competitor Monitoring */}
      <div style={{ background: '#fff', borderRadius: 10, padding: 20, marginBottom: 16, boxShadow: '0 1px 4px rgba(0,0,0,.07)' }}>
        <h2 style={{ color: '#27504D', marginTop: 0, borderBottom: '2px solid #27504D', paddingBottom: 6 }}>
          Competitor Monitoring
        </h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#27504D', color: '#fff' }}>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Domain</th>
              <th style={{ padding: '8px 12px', textAlign: 'center' }}>Reachable</th>
              <th style={{ padding: '8px 12px', textAlign: 'center' }}>Pages</th>
              <th style={{ padding: '8px 12px', textAlign: 'center' }}>Changed</th>
            </tr>
          </thead>
          <tbody>
            {r.competitor_monitoring.map((c, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                <td style={{ padding: '7px 12px' }}><a href={`https://${c.domain}`} style={{ color: '#27504D' }}>{c.domain}</a></td>
                <td style={{ padding: '7px 12px', textAlign: 'center' }}>{c.status === 'ok' ? '✅' : '❌'}</td>
                <td style={{ padding: '7px 12px', textAlign: 'center' }}>{c.page_count}</td>
                <td style={{ padding: '7px 12px', textAlign: 'center' }}>{c.changed ? '⚠️ Changed' : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rising Keywords */}
      {(r.trends?.rising ?? []).length > 0 && (
        <div style={{ background: '#fff', borderRadius: 10, padding: 20, marginBottom: 16, boxShadow: '0 1px 4px rgba(0,0,0,.07)' }}>
          <h2 style={{ color: '#27504D', marginTop: 0, borderBottom: '2px solid #27504D', paddingBottom: 6 }}>
            Rising Keyword Opportunities (PyTrends)
          </h2>
          <ul style={{ paddingLeft: 20, margin: 0 }}>
            {(r.trends.rising ?? []).slice(0, 10).map((t, i) => (
              <li key={i} style={{ fontSize: 14, marginBottom: 6 }}>
                <strong>{t.query}</strong> <span style={{ color: '#888', fontSize: 12 }}>(from: {t.seed})</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Search Console */}
      <div style={{ background: '#fff', borderRadius: 10, padding: 20, marginBottom: 16, boxShadow: '0 1px 4px rgba(0,0,0,.07)' }}>
        <h2 style={{ color: '#27504D', marginTop: 0, borderBottom: '2px solid #27504D', paddingBottom: 6 }}>
          Search Console — {r.search_console.source}{r.search_console.period ? ` (${r.search_console.period})` : ''}
        </h2>
        {r.search_console.queries.length > 0 ? (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: '#27504D', color: '#fff' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Query</th>
                <th style={{ padding: '8px 12px', textAlign: 'center' }}>Clicks</th>
                <th style={{ padding: '8px 12px', textAlign: 'center' }}>Impr.</th>
                <th style={{ padding: '8px 12px', textAlign: 'center' }}>CTR%</th>
                <th style={{ padding: '8px 12px', textAlign: 'center' }}>Pos.</th>
              </tr>
            </thead>
            <tbody>
              {r.search_console.queries.slice(0, 20).map((q, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                  <td style={{ padding: '7px 12px' }}>{q.query}</td>
                  <td style={{ padding: '7px 12px', textAlign: 'center' }}>{q.clicks}</td>
                  <td style={{ padding: '7px 12px', textAlign: 'center' }}>{q.impressions}</td>
                  <td style={{ padding: '7px 12px', textAlign: 'center' }}>{q.ctr}</td>
                  <td style={{ padding: '7px 12px', textAlign: 'center' }}>{q.position}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ color: '#F5A623', fontSize: 14 }}>
            No GSC data.
            {r.setup_needed.search_console && (
              <> Export CSV from Search Console → Performance → Download, save as <code>~/Desktop/Claude/SEO/gsc-export.csv</code></>
            )}
          </p>
        )}
      </div>

      {/* PageSpeed */}
      <div style={{ background: '#fff', borderRadius: 10, padding: 20, marginBottom: 16, boxShadow: '0 1px 4px rgba(0,0,0,.07)' }}>
        <h2 style={{ color: '#27504D', marginTop: 0, borderBottom: '2px solid #27504D', paddingBottom: 6 }}>
          PageSpeed — Mobile (logic-board-repair)
        </h2>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginTop: 10 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: scoreColor(r.pagespeed.mobile_score_logic_board) }}>
              {r.pagespeed.mobile_score_logic_board}
            </div>
            <div style={{ fontSize: 12, color: '#888' }}>Performance Score</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 600, color: '#222' }}>{r.pagespeed.lcp_homepage ?? 'N/A'}</div>
            <div style={{ fontSize: 12, color: '#888' }}>LCP</div>
          </div>
        </div>
      </div>

      <p style={{ fontSize: 11, color: '#ccc', marginTop: 30 }}>
        Runs daily 02:30 via com.zasupport.seotracker — ~/bin/za-seo-tracker.sh
      </p>
    </main>
  );
}
