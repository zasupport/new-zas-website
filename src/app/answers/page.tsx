import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MessageCircleQuestion, Phone } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { buildBreadcrumbSchema } from '@/lib/schema';
import { CONTACT } from '@/lib/constants';
import { ANSWER_CLUSTERS } from './answers-data';

export const metadata: Metadata = {
  title: 'Apple Repair & IT Questions Answered | ZA Support Johannesburg',
  description:
    'Straight answers to the questions Johannesburg Mac owners and businesses ask most, logic board repair, liquid damage, batteries, screens, and managed Apple IT. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/answers' },
};

const totalQuestions = ANSWER_CLUSTERS.reduce((n, c) => n + c.faqs.length, 0);

export default function AnswersHubPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: 'https://zasupport.com' },
    { name: 'Answers', url: 'https://zasupport.com/answers' },
  ]);

  return (
    <>
      <SchemaOrg schema={breadcrumbSchema} />

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumb items={[{ label: 'Answers' }]} />
          </div>
          <div className="max-w-4xl">
            <p className="text-[#0FEA7A] text-sm font-semibold uppercase tracking-widest mb-3">
              Apple Experts · Johannesburg · {totalQuestions} questions answered
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              Your Apple repair &amp; IT
              <br />
              <span className="text-[#0FEA7A]">questions, answered</span>
            </h1>
            <p className="text-xl text-[#7A9E98] leading-relaxed max-w-3xl mb-8">
              Plain, honest answers to what Johannesburg Mac owners and businesses ask us most, 
              before they book a repair or call us about Apple IT support. Pick a topic below.
            </p>
            <a
              href={`tel:${CONTACT.phoneTel}`}
              className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all"
            >
              <Phone className="w-5 h-5" /> Speak to a technician, {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ── Cluster grid ───────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ANSWER_CLUSTERS.map((cluster) => (
              <Link
                key={cluster.slug}
                href={`/answers/${cluster.slug}`}
                className="group block rounded-2xl border border-[rgba(15,234,122,0.18)] bg-[#0F2522] p-6 hover:border-[#0FEA7A]/50 transition-all"
              >
                <MessageCircleQuestion className="w-8 h-8 text-[#0FEA7A] mb-4" />
                <h2 className="text-xl font-bold text-[#E8F4F1] mb-2">{cluster.shortTitle}</h2>
                <p className="text-[#7A9E98] text-sm leading-relaxed mb-4">{cluster.intro}</p>
                <span className="inline-flex items-center gap-1 text-[#0FEA7A] text-sm font-semibold">
                  {cluster.faqs.length} questions answered
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
