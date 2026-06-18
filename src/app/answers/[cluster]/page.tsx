import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Phone, ArrowLeft } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import Breadcrumb from '@/components/ui/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQ';
import { buildFaqSchema, buildBreadcrumbSchema } from '@/lib/schema';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';
import { ANSWER_CLUSTERS, getCluster } from '../answers-data';

export function generateStaticParams() {
  return ANSWER_CLUSTERS.map((c) => ({ cluster: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cluster: string }>;
}): Promise<Metadata> {
  const { cluster: slug } = await params;
  const cluster = getCluster(slug);
  if (!cluster) return {};
  return {
    title: cluster.metaTitle,
    description: cluster.metaDescription,
    alternates: { canonical: `https://zasupport.com/answers/${cluster.slug}` },
  };
}

export default async function AnswerClusterPage({
  params,
}: {
  params: Promise<{ cluster: string }>;
}) {
  const { cluster: slug } = await params;
  const cluster = getCluster(slug);
  if (!cluster) notFound();

  const faqSchema = buildFaqSchema(cluster.faqs);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: 'https://zasupport.com' },
    { name: 'Answers', url: 'https://zasupport.com/answers' },
    { name: cluster.shortTitle, url: `https://zasupport.com/answers/${cluster.slug}` },
  ]);

  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="hero-gradient grid-overlay pt-32 pb-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: 'Answers', href: '/answers' },
                { label: cluster.shortTitle },
              ]}
            />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#E8F4F1] leading-tight mb-5">
            {cluster.title}
          </h1>
          <p className="text-lg text-[#7A9E98] leading-relaxed mb-7">{cluster.intro}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={buildWhatsAppUrl(`ANSWERS-${cluster.slug.toUpperCase()}`, cluster.slug)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-7 py-3.5 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all"
            >
              <Phone className="w-5 h-5" /> WhatsApp us on {CONTACT.phone}
            </a>
            <Link
              href={cluster.relatedService.href}
              className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-7 py-3.5 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
            >
              {cluster.relatedService.label} <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Q&A ────────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={cluster.faqs} title={`${cluster.shortTitle}, questions answered`} />

          {/* Related service + CTA */}
          <div className="mt-12 rounded-2xl border border-[rgba(15,234,122,0.18)] bg-[#0F2522] p-7">
            <h2 className="text-xl font-bold text-[#E8F4F1] mb-2">
              Ready to go further than the answers?
            </h2>
            <p className="text-[#7A9E98] text-sm leading-relaxed mb-5">
              For full detail, pricing and to book, see our{' '}
              <Link href={cluster.relatedService.href} className="text-[#0FEA7A] font-semibold">
                {cluster.relatedService.label.toLowerCase()}
              </Link>
, or speak to a technician directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-7 py-3.5 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link
                href="/answers"
                className="inline-flex items-center gap-2 text-[#7A9E98] px-7 py-3.5 rounded-xl font-semibold hover:text-[#0FEA7A] transition-all"
              >
                <ArrowLeft className="w-5 h-5" /> All answer topics
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
