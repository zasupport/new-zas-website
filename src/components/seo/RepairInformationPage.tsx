import Link from 'next/link';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildServiceSchema, buildBreadcrumbSchema } from '@/lib/schema';
import PricingNote from '@/components/PricingNote';
import RepairGrowthSection from './RepairGrowthSection';
import content from '@/content/repair-growth.json';

export default function RepairInformationPage({ slug }: { slug: keyof typeof content }) {
  const page = content[slug];
  const url = 'https://zasupport.com/' + slug;
  return <>
    {page.service && <SchemaOrg schema={{ ...buildServiceSchema({name: page.title, description: page.description}), provider: { '@id': 'https://zasupport.com/#organization' }, '@id': url + '#service', url }} />}
    <SchemaOrg schema={buildBreadcrumbSchema([{ name: 'Home', url: 'https://zasupport.com' }, { name: page.title, url }])} />
    <article data-release="repair-growth-20260921" className="min-h-screen bg-[#0A1A18] text-[#E8F4F1]">
      <header className="mx-auto max-w-5xl px-4 pb-12 pt-28 sm:px-6 sm:pt-32">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm"><Link className="text-[#0FEA7A] underline" href="/">Home</Link><span className="px-2">/</span><span>{page.title}</span></nav>
        <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#0FEA7A]">ZA Support · Johannesburg</p>
        <h1 className="max-w-4xl text-3xl font-extrabold leading-tight sm:text-5xl">{page.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#B9D2CB]">{page.intro}</p>
        <div className="mt-8 flex flex-wrap gap-4"><Link href="/book" className="rounded-xl bg-[#0FEA7A] px-6 py-3 font-semibold text-[#0A1A18]">Arrange an assessment</Link><Link href="/contact" className="rounded-xl border border-[#547D73] px-6 py-3">Contact ZA Support</Link></div>
      </header>
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {page.sections.map(([heading, ...paragraphs]) => <section key={heading} className="border-t border-[#29443D] py-9">
          <h2 className="text-2xl font-bold">{heading}</h2>
          {paragraphs.map(p => <p key={p} className="mt-4 max-w-3xl leading-7 text-[#B9D2CB]">{p}</p>)}
        </section>)}
        <section className="border-t border-[#29443D] py-9">
          <h2 className="text-xl font-bold">Further reading</h2>
          <ul className="mt-4 space-y-3">{page.sources.map(([label, href]) => <li key={href}><a href={href} className="text-[#0FEA7A] underline underline-offset-4">{label}</a></li>)}</ul>
        </section>
      </div>
      <RepairGrowthSection title="Related services and guidance" links={page.links as [string, string][]} />
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6"><PricingNote /></div>
    </article>
  </>;
}
