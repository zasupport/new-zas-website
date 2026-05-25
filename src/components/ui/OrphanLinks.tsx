import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/**
 * OrphanLinks — internal-link injection block for hub pages.
 *
 * Renders categorised internal links so every orphan sitemap URL has at least
 * one inbound internal link path from a reachable hub. Per §402 / §402a
 * (internal-link path enforcement) and Google E-E-A-T crawl-depth guidance.
 *
 * USE A `<Link>` (next/link) and NOT `<a target="_blank">` — internal links
 * MUST stay in-flow for crawl depth + PageRank distribution.
 */

export interface OrphanLink {
  title: string;
  href: string;
  description?: string;
}

export interface OrphanLinkGroup {
  heading: string;
  links: OrphanLink[];
}

interface OrphanLinksProps {
  /** Main section heading shown above all groups. */
  sectionTitle: string;
  /** Short lead paragraph explaining what is in the section. */
  intro?: string;
  /** One or more groups. Use multiple groups when items split cleanly by category. */
  groups: OrphanLinkGroup[];
}

export default function OrphanLinks({ sectionTitle, intro, groups }: OrphanLinksProps) {
  return (
    <section className="py-12 sm:py-16 bg-[#0F2522] border-y border-[rgba(15,234,122,0.1)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#E8F4F1] mb-3">
          {sectionTitle}
        </h2>
        {intro && (
          <p className="text-[#7A9E98] mb-8 max-w-3xl leading-relaxed">{intro}</p>
        )}

        <div className="space-y-10">
          {groups.map((group) => (
            <div key={group.heading}>
              <h3 className="text-lg font-bold text-[#0FEA7A] mb-4 uppercase tracking-wide">
                {group.heading}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {group.links.map((lnk) => (
                  <Link
                    key={lnk.href}
                    href={lnk.href}
                    className="group flex items-start justify-between gap-3 p-4 rounded-xl border border-[rgba(15,234,122,0.15)] hover:border-[#0FEA7A]/50 bg-[#0A1A18]/60 hover:bg-[rgba(15,234,122,0.05)] transition-all"
                  >
                    <div className="min-w-0">
                      <span className="block text-sm font-semibold text-[#E8F4F1] group-hover:text-[#0FEA7A] transition-colors">
                        {lnk.title}
                      </span>
                      {lnk.description && (
                        <span className="block mt-1 text-xs text-[#7A9E98] leading-snug">
                          {lnk.description}
                        </span>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#7A9E98] group-hover:text-[#0FEA7A] group-hover:translate-x-0.5 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
