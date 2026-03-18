'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ExternalLink, AlertCircle } from 'lucide-react';

interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  thumbnail?: string;
}

interface SearchResponse {
  total: number;
  results: SearchResult[];
  error?: string;
}

interface Props {
  query: string;
  start: number;
}

export default function SearchResults({ query, start }: Props) {
  const [data, setData] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/search?q=${encodeURIComponent(query)}&start=${start}`)
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => { setData({ total: 0, results: [], error: 'Search failed. Please try again.' }); setLoading(false); });
  }, [query, start]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse space-y-2">
            <div className="h-4 bg-white/10 rounded w-3/4" />
            <div className="h-3 bg-white/5 rounded w-1/2" />
            <div className="h-3 bg-white/5 rounded w-full" />
            <div className="h-3 bg-white/5 rounded w-5/6" />
          </div>
        ))}
      </div>
    );
  }

  if (data?.error) {
    return (
      <div className="flex items-center gap-2 text-red-400 text-sm">
        <AlertCircle className="w-4 h-4" />
        {data.error}
      </div>
    );
  }

  if (!data?.results?.length) {
    return (
      <div className="text-sm text-white/50 space-y-4">
        <p>No results found for <strong className="text-white">&ldquo;{query}&rdquo;</strong>.</p>
        <p>Try different keywords, or <Link href="/contact" className="text-[#0FEA7A] hover:underline">contact us directly</Link>.</p>
      </div>
    );
  }

  const prevStart = Math.max(1, start - 10);
  const nextStart = start + 10;
  const hasNext = nextStart <= data.total;
  const hasPrev = start > 1;

  return (
    <div>
      <p className="text-xs text-white/40 mb-6">
        About {data.total.toLocaleString()} results
      </p>

      <div className="space-y-8">
        {data.results.map((r, i) => {
          const isInternal = r.url.includes('zasupport.com');
          const displayUrl = r.url.replace(/^https?:\/\/(www\.)?/, '');
          const path = isInternal ? r.url.replace(/^https?:\/\/zasupport\.com/, '') || '/' : null;

          return (
            <div key={i} className="group">
              <div className="text-xs text-[#0FEA7A]/70 mb-0.5 truncate">{displayUrl}</div>
              {path ? (
                <Link href={path} className="block">
                  <h2 className="text-[#0FEA7A] group-hover:underline font-medium leading-snug mb-1">
                    {r.title}
                  </h2>
                </Link>
              ) : (
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                  <h2 className="text-[#0FEA7A] group-hover:underline font-medium leading-snug mb-1">
                    {r.title}
                  </h2>
                  <ExternalLink className="w-3 h-3 text-white/30 flex-shrink-0 mb-1" />
                </a>
              )}
              <p className="text-sm text-white/60 leading-relaxed line-clamp-3">{r.snippet}</p>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {(hasPrev || hasNext) && (
        <div className="flex gap-3 mt-10 pt-8 border-t border-white/10">
          {hasPrev && (
            <Link
              href={`/search?q=${encodeURIComponent(query)}&start=${prevStart}`}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm hover:border-[#0FEA7A]/50 transition"
            >
              ← Previous
            </Link>
          )}
          {hasNext && (
            <Link
              href={`/search?q=${encodeURIComponent(query)}&start=${nextStart}`}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm hover:border-[#0FEA7A]/50 transition ml-auto"
            >
              Next →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
