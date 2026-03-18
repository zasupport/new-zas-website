import type { Metadata } from 'next';
import Link from 'next/link';
import { Search } from 'lucide-react';
import SearchResults from './SearchResults';

export const metadata: Metadata = {
  title: 'Search | ZA Support',
  description: 'Search the ZA Support website for Mac repair services, repair guides, and Apple tips.',
  robots: { index: false, follow: true },
};

interface Props {
  searchParams: Promise<{ q?: string; start?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams;
  const query = params.q?.trim() || '';
  const start = parseInt(params.start || '1', 10);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* Search bar */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-6">
            {query ? `Search results for "${query}"` : 'Search ZA Support'}
          </h1>
          <form action="/search" method="GET" className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                name="q"
                type="search"
                defaultValue={query}
                placeholder="Search for Mac repairs, guides, tips…"
                autoFocus
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#0FEA7A]/60 focus:ring-1 focus:ring-[#0FEA7A]/30"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-3 bg-[#0FEA7A] text-[#0a0a0a] font-semibold rounded-lg text-sm hover:bg-[#0FEA7A]/90 transition"
            >
              Search
            </button>
          </form>
        </div>

        {/* Results */}
        {query ? (
          <SearchResults query={query} start={start} />
        ) : (
          <div className="space-y-4 text-sm text-white/50">
            <p>Try searching for:</p>
            <div className="flex flex-wrap gap-2">
              {['logic board repair', 'liquid damage', 'MacBook battery', 'iPhone screen', 'Mac Health Check', 'managed services'].map((s) => (
                <Link
                  key={s}
                  href={`/search?q=${encodeURIComponent(s)}`}
                  className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/70 hover:border-[#0FEA7A]/50 hover:text-white transition text-xs"
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
