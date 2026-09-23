import Link from 'next/link';
import { Phone, ArrowRight, Shield, BadgeCheck, Clock, Headphones } from 'lucide-react';
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
    <article data-release="repair-growth-20260921" className="min-h-screen bg-[#0A1A18] text-[#E8F4F1]">

      {/* Hero - design-system gradient + grid overlay, matching the Apple Support hub */}
      <section className="hero-gradient grid-overlay pb-14 pt-28 sm:pt-32">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm">
            <Link className="text-[#0FEA7A] underline" href="/">Home</Link>
            <span className="px-2 text-[#547D73]">/</span>
            <span className="text-[#B9D2CB]">{page.title}</span>
          </nav>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(15,234,122,0.2)] bg-[rgba(15,234,122,0.08)] px-4 py-2">
            <span className="text-[#0FEA7A]" aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            <span className="text-sm text-[#E8F4F1]">{SITE.rating} &middot; {SITE.reviewCount} Google Reviews</span>
          </div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#0FEA7A]">ZA Support &middot; Johannesburg</p>
          <h1 className="max-w-4xl text-3xl font-extrabold leading-tight sm:text-5xl">{page.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#B9D2CB]">{page.intro}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0FEA7A] px-6 py-3 text-lg font-bold text-[#0A1A18] transition-all hover:bg-[#0FEA7A]/90">
              <Phone className="h-5 w-5" /> Call {CONTACT.phone}
            </a>
            <Link href="/book" className="inline-flex items-center justify-center gap-2 rounded-xl border border-[rgba(15,234,122,0.35)] px-6 py-3 text-lg font-semibold text-[#0FEA7A] transition-all hover:bg-[rgba(15,234,122,0.08)]">
              Arrange an assessment <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust strip - generic-true, matching the hub rhythm */}
      <section className="border-y border-[rgba(15,234,122,0.1)] bg-[#111C1A] py-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-6 px-4 sm:gap-10 sm:px-6">
          {TRUST.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-[#0FEA7A]" />
              <span className="text-sm font-medium text-[#E8F4F1]">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Body - alternating section backgrounds instead of flat rules */}
      {page.sections.map(([heading, ...paragraphs], i) => (
        <section key={heading} className={(i % 2 === 0 ? 'bg-[#0A1A18]' : 'bg-[#111C1A]') + ' py-12'}>
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-2xl font-bold">{heading}</h2>
            {paragraphs.map(p => <p key={p} className="mt-4 max-w-3xl leading-7 text-[#B9D2CB]">{p}</p>)}
          </div>
        </section>
      ))}

      <section className={(page.sections.length % 2 === 0 ? 'bg-[#0A1A18]' : 'bg-[#111C1A]') + ' py-12'}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-xl font-bold">Further reading</h2>
          <ul className="mt-4 space-y-3">{page.sources.map(([label, href]) => <li key={href}><a href={href} className="text-[#0FEA7A] underline underline-offset-4">{label}</a></li>)}</ul>
        </div>
      </section>

      <RepairGrowthSection title="Related services and guidance" links={page.links as [string, string][]} />
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6"><PricingNote /></div>
    </article>
  </>;
}
