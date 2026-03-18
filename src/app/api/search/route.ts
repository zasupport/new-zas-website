import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const GOOGLE_API_KEY = process.env.GOOGLE_MAPS_API_KEY || '';
const GOOGLE_CSE_CX = process.env.GOOGLE_CSE_CX || '';

interface CSEItem {
  title: string;
  link: string;
  displayLink: string;
  snippet: string;
  pagemap?: {
    metatags?: Array<Record<string, string>>;
    cse_thumbnail?: Array<{ src: string; width: string; height: string }>;
  };
}

interface CSEResponse {
  searchInformation?: { totalResults: string; formattedTotalResults: string };
  items?: CSEItem[];
  error?: { message: string; code: number };
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.trim();
  const start = parseInt(req.nextUrl.searchParams.get('start') || '1', 10);

  if (!q) {
    return NextResponse.json({ error: 'Missing query' }, { status: 400 });
  }

  if (!GOOGLE_CSE_CX || !GOOGLE_API_KEY) {
    return NextResponse.json({ error: 'Search not configured' }, { status: 503 });
  }

  const params = new URLSearchParams({
    key: GOOGLE_API_KEY,
    cx: GOOGLE_CSE_CX,
    q,
    gl: 'za',
    hl: 'en',
    num: '10',
    start: String(Math.max(1, start)),
    // Restrict to zasupport.com domain
    siteSearch: 'zasupport.com',
    siteSearchFilter: 'i',
  });

  try {
    const res = await fetch(`https://www.googleapis.com/customsearch/v1?${params}`, {
      next: { revalidate: 300 }, // cache 5 min
    });
    const data: CSEResponse = await res.json();

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    return NextResponse.json({
      total: parseInt(data.searchInformation?.totalResults || '0', 10),
      results: (data.items || []).map((item) => ({
        title: item.title,
        url: item.link,
        snippet: item.snippet,
        thumbnail: item.pagemap?.cse_thumbnail?.[0]?.src,
      })),
    });
  } catch (err) {
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
