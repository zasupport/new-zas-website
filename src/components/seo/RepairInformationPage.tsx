import Link from 'next/link';
import { Phone, ArrowRight, Shield, BadgeCheck, Clock, Headphones, BookOpen, ExternalLink } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildServiceSchema, buildBreadcrumbSchema } from '@/lib/schema';
import PricingNote from '@/components/PricingNote';
import RepairGrowthSection from './RepairGrowthSection';
import { CONTACT, SITE } from '@/lib/constants';
import content from '@/content/repair-growth.json';

// Trust strip: generic-true for every information page (no service-specific claim).
const TRUST = [
  { icon: Shield, label: 'Assessment from R599' },
  { icon: BadgeCheck, label: 'Written warranty' },
  { icon: Clock, label: 'Same-day help' },
  { icon: Headphones, label: 'All Apple devices' },
] as const;

export default function RepairInformationPage({ slug }: { slug: keyof typeof content }) {
  const page = content[slug];
  const url = 'https://zasupport.com/' + slug;
  return <>
    {page.service && <SchemaOrg schema={{ ...buildServiceSchema({name: page.title, description: page.description}), provider: { '@id': 'https://zasupport.com/#organization' }, '@id': url + '#service', url }} />}
    <SchemaOrg schema={buildBreadcrumbSchema([{ name: 'Home', url: 'https://zasupport.com' }, { name: page.title, url }])} />
    <article data-release="repair-growth-20260921" data-template="service-standard" className="min-h-screen bg-[#0A1A18] text-[#E8F4F1]">

      {/* Hero - matches /macbook-not-turning-on: glow, Breadcrumb component, pill badge, shadowed primary CTA */}
      <section className="hero-gradient grid-overlay relative overflow-hidden pb-16 pt-24 sm:pb-24 sm:pt-32">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute left-1/2 top-1/4 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-[#0FEA7A]/5 blur-[120px]" />
        </div>
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8"><Breadcrumb items={[{ label: page.title }]} /></div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0FEA7A]/20 bg-[#0FEA7A]/10 px-4 py-2">
            <span className="text-[#0FEA7A]" aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            <span className="text-sm font-semibold tracking-wide text-[#0FEA7A]">{SITE.rating} &middot; {SITE.reviewCount} Google Reviews</span>
          </div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#0FEA7A]">ZA Support &middot; Johannesburg</p>
          <h1 className="max-w-4xl text-4xl font-extrabold leading-tight text-[#E8F4F1] sm:text-5xl lg:text-6xl">{page.title}</h1>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-[#7A9E98]">{page.intro}</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0FEA7A] px-8 py-4 text-lg font-bold text-[#0A1A18] shadow-lg shadow-[#0FEA7A]/20 transition-all hover:bg-[#0FEA7A]/90">
              <Phone className="h-5 w-5" /> Call {CONTACT.phone}
            </a>
            <Link href="/book" className="inline-flex items-center justify-center gap-2 rounded-xl border border-[rgba(255,255,255,0.12)] px-8 py-4 text-lg font-semibold text-[#E8F4F1] transition-all hover:border-[#0FEA7A]/40 hover:text-[#0FEA7A]">
              Arrange an assessment <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust strip - reference stats-bar surface */}
      <section className="border-y border-[rgba(255,255,255,0.06)] bg-[rgba(15,234,122,0.03)]">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 px-4 py-6 sm:grid-cols-4 sm:px-6 lg:px-8">
          {TRUST.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-[#0FEA7A]/20 bg-[#0FEA7A]/10">
                <Icon className="h-4 w-4 text-[#0FEA7A]" />
              </div>
              <span className="text-sm font-medium text-[#E8F4F1]">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Body - numbered bordered cards, the "5 Quick Checks" pattern */}
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-20 lg:px-8">
        <div className="space-y-4">
          {page.sections.map(([heading, ...paragraphs], i) => (
            <div key={heading} className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-6 transition-all hover:border-[rgba(15,234,122,0.15)]">
              <div className="flex items-start gap-5">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-[#0FEA7A]/20 bg-[#0FEA7A]/10">
                  <span className="text-sm font-bold text-[#0FEA7A]">{i + 1}</span>
                </div>
                <div className="flex-1">
                  <h2 className="mb-2 text-lg font-bold text-[#E8F4F1] sm:text-xl">{heading}</h2>
                  {paragraphs.map(p => <p key={p} className="mt-2 text-base leading-relaxed text-[#7A9E98]">{p}</p>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Further reading - external sources as bordered cards with icon */}
      <section className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 sm:pb-16 lg:px-8">
        <h2 className="mb-6 text-2xl font-extrabold text-[#E8F4F1]">Further reading</h2>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">{page.sources.map(([label, href]) => <li key={href}>
          <a href={href} target="_blank" rel="noopener noreferrer" className="group flex h-full items-center justify-between gap-4 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-4 transition-all hover:border-[rgba(15,234,122,0.25)] hover:bg-[rgba(15,234,122,0.04)]">
            <span className="flex items-center gap-3">
              <BookOpen className="h-4 w-4 flex-shrink-0 text-[#0FEA7A]" aria-hidden="true" />
              <span className="font-semibold text-[#E8F4F1] transition-colors group-hover:text-[#0FEA7A]">{label}</span>
            </span>
            <ExternalLink className="h-4 w-4 flex-shrink-0 text-[#0FEA7A]" aria-hidden="true" />
          </a>
        </li>)}</ul>
      </section>

      <RepairGrowthSection title="Related services and guidance" links={page.links as [string, string][]} />
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6"><PricingNote /></div>
    </article>
  </>;
}
