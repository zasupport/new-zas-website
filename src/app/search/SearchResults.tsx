'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ExternalLink, AlertCircle, ArrowRight } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/constants';

interface IntentCTA {
  heading: string;
  body: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}

function getIntentCTA(query: string): IntentCTA | null {
  const q = query.toLowerCase();
  const isRepair = /logic board|liquid|water damage|screen|display|battery|macbook repair|mac repair|not turning on|won.t start/.test(q);
  const isManaged = /managed|sla|monthly|business it|it support|it services/.test(q);
  const isHealthCheck = /health check|diagnostic|slow mac|performance|virus|malware|cybershield|security/.test(q);
  const isPrice = /cost|price|how much|quote|R[0-9]|repair cost/.test(q);

  if (isManaged) return {
    heading: 'Managed IT for Businesses & Medical Practices',
    body: 'Fixed monthly fee. No surprise invoices. Includes monitoring, support and Health Check.',
    primary: { label: 'View Packages', href: '/managed-services' },
    secondary: { label: '💬 WhatsApp for Quote', href: buildWhatsAppUrl('SEARCH', 'general') },
  };
  if (isHealthCheck) return {
    heading: 'Mac Health Check — Know Exactly What\'s Wrong',
    body: 'Our diagnostic tool checks 120+ data points: battery health, security risks, software conflicts and more.',
    primary: { label: 'Learn About Health Check', href: '/services' },
    secondary: { label: '💬 Book a Diagnostic', href: buildWhatsAppUrl('SEARCH', 'general') },
  };
  if (isPrice || isRepair) return {
    heading: 'No-Obligation Diagnostic — From R599 assessment',
    body: 'We assess your Mac at from R599. No fix = no invoice. Logic board repairs from R2,499 with a 12-month warranty.',
    primary: { label: '💬 Get a WhatsApp Quote', href: buildWhatsAppUrl('SEARCH', 'general') },
    secondary: { label: 'Book a Repair', href: '/book' },
  };
  return null;
}

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

function CTACard({ cta }: { cta: IntentCTA }) {
  const isExternal = (href: string) => href.startsWith('http');
  return (
    <div className="bg-[rgba(15,234,122,0.06)] border border-[rgba(15,234,122,0.2)] rounded-xl p-5">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#0FEA7A]/60 mb-2">Recommended for you</p>
      <h3 className="text-white font-semibold text-base mb-1">{cta.heading}</h3>
      <p className="text-sm text-white/60 mb-4 leading-relaxed">{cta.body}</p>
      <div className="flex flex-wrap gap-2">
        {isExternal(cta.primary.href) ? (
          <a
            href={cta.primary.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#0FEA7A] text-[#0A1A18] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#0FEA7A]/90 transition"
          >
            {cta.primary.label} <ArrowRight className="w-3.5 h-3.5" />
          </a>
        ) : (
          <Link
            href={cta.primary.href}
            className="inline-flex items-center gap-1.5 bg-[#0FEA7A] text-[#0A1A18] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#0FEA7A]/90 transition"
          >
            {cta.primary.label} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
        {cta.secondary && (
          isExternal(cta.secondary.href) ? (
            <a
              href={cta.secondary.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[rgba(15,234,122,0.08)] transition"
            >
              {cta.secondary.label}
            </a>
          ) : (
            <Link
              href={cta.secondary.href}
              className="inline-flex items-center gap-1.5 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[rgba(15,234,122,0.08)] transition"
            >
              {cta.secondary.label}
            </Link>
          )
        )}
      </div>
    </div>
  );
}

export default function SearchResults({ query, start }: Props) {
  const [data, setData] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const cta = getIntentCTA(query);

  useEffect(() => {
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
      <div className="space-y-6">
        <div className="text-sm text-white/50 space-y-2">
          <p>No results found for <strong className="text-white">&ldquo;{query}&rdquo;</strong>.</p>
          <p>Try different keywords, or <Link href="/contact" className="text-[#0FEA7A] hover:underline">contact us directly</Link>.</p>
        </div>
        {cta && <CTACard cta={cta} />}
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

      {cta && start === 1 && <div className="mb-8"><CTACard cta={cta} /></div>}

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
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1" >
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
