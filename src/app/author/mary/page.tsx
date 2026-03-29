import type { Metadata } from 'next';
import Link from 'next/link';
import { MessageCircle, BookOpen, Users } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Mary, Content & Client Communications | ZA Support',
  description:
    'Mary is the content author and client communications lead at ZA Support. All educational guides, blog posts, and client-facing documentation are authored by Mary.',
  alternates: { canonical: 'https://zasupport.com/author/mary' },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://zasupport.com/author/mary',
  name: 'Mary',
  jobTitle: 'Content Author & Client Communications, ZA Support',
  description:
    'Mary is the content and communications specialist at ZA Support. All educational articles, repair guides, blog posts, and client-facing documentation published on zasupport.com are authored by Mary.',
  url: 'https://zasupport.com/author/mary',
  knowsAbout: [
    'Apple device repair guides',
    'MacBook troubleshooting',
    'IT support content',
    'Client communications',
    'Technical writing',
  ],
  worksFor: {
    '@type': 'LocalBusiness',
    '@id': 'https://zasupport.com/#organization',
    name: SITE.name,
    url: 'https://zasupport.com',
  },
};

const roles = [
  { icon: BookOpen, label: 'Educational Content', detail: 'All how-to guides, repair articles, and FAQ content on zasupport.com' },
  { icon: MessageCircle, label: 'Client Communications', detail: 'Client emails, assessment summaries, and follow-up correspondence' },
  { icon: Users, label: 'Blog & Guides', detail: 'All blog posts, service pages, and structured educational content' },
];

export default function MaryPage() {
  return (
    <>
      <SchemaOrg schema={personSchema} />
      <main className="min-h-screen bg-[#0A1A18] text-[#E8F4F1]">
        <div className="max-w-3xl mx-auto px-4 py-10 sm:py-20">
          <div className="mb-6">
            <Link href="/" className="text-sm text-[#7A9E98] hover:text-[#0FEA7A] transition-colors">
              ZA Support
            </Link>
            <span className="text-[#7A9E98] mx-2">/</span>
            <span className="text-sm text-[#E8F4F1]">Mary</span>
          </div>

          <h1 className="text-4xl font-bold text-[#E8F4F1] mb-2">Mary</h1>
          <p className="text-[#0FEA7A] font-semibold text-lg mb-6">
            Content Author &amp; Client Communications, ZA Support
          </p>

          <p className="text-[#7A9E98] text-lg leading-relaxed mb-10">
            Mary handles all content and client communications at ZA Support. Every educational guide,
            repair blog post, how-to article, and client-facing document published on zasupport.com
            is authored by Mary, ensuring clear, plain-language explanations of complex technical
            topics for Mac owners across South Africa.
          </p>

          <div className="grid gap-4 mb-12">
            {roles.map((r) => (
              <div
                key={r.label}
                className="flex gap-4 p-5 rounded-xl border border-[#27504D]/30 bg-[#111C1A]/60"
              >
                <r.icon className="w-6 h-6 text-[#0FEA7A] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#E8F4F1] text-sm">{r.label}</p>
                  <p className="text-xs text-[#7A9E98] mt-0.5">{r.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-[#27504D]/20 pt-8">
            <p className="text-sm text-[#7A9E98]">
              Technical accuracy verified by{' '}
              <Link href="/author/david-bentley" className="text-[#0FEA7A] hover:underline">
                David Bentley
              </Link>
              , Founder &amp; Apple Certified Technician.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
