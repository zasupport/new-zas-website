import Link from 'next/link';
import { ArrowRight, CalendarCheck } from 'lucide-react';

// Design-template conformance (26/09/2026): link list rendered as the bordered
// card grid used by "Related Repairs" on /macbook-not-turning-on. Content, hrefs
// and labels unchanged; styling only.
export default function RepairGrowthSection({ title, paragraphs = [], links }: {
  title: string; paragraphs?: string[]; links: [string, string][];
}) {
  return <section data-release="repair-growth-20260921" data-template="card-links" className="bg-[rgba(255,255,255,0.015)] border-y border-[rgba(255,255,255,0.06)] text-[#E8F4F1]">
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      <h2 className="text-2xl font-extrabold text-[#E8F4F1] sm:text-3xl">{title}</h2>
      {paragraphs.map(p => <p key={p} className="mt-4 max-w-3xl text-lg leading-relaxed text-[#7A9E98]">{p}</p>)}
      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {links.map(([href, label]) => <li key={href}>
          <Link href={href} className="group flex h-full items-center justify-between gap-4 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-4 transition-all hover:border-[rgba(15,234,122,0.25)] hover:bg-[rgba(15,234,122,0.04)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0FEA7A]">
            <span className="font-semibold text-[#E8F4F1] transition-colors group-hover:text-[#0FEA7A]">{label}</span>
            <ArrowRight className="h-4 w-4 flex-shrink-0 text-[#0FEA7A] transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </li>)}
      </ul>
      <Link href="/book" className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0FEA7A] px-8 py-4 text-lg font-bold text-[#0A1A18] shadow-lg shadow-[#0FEA7A]/20 transition-all hover:bg-[#0FEA7A]/90">
        <CalendarCheck className="h-5 w-5" aria-hidden="true" /> Book an assessment
      </Link>
    </div>
  </section>;
}
