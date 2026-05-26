import type { Metadata } from 'next';
import Link from 'next/link';
import { MessageCircle, Calendar, Phone } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Mary, Client Communications & Operations Lead | ZA Support',
  description:
    'Mary is the client communications and operations lead at ZA Support. She handles all incoming client enquiries, repair bookings, and follow-up correspondence from zasupport.com. All technical content is authored by Courtney Bentley.',
  alternates: { canonical: 'https://zasupport.com/author/mary' },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://zasupport.com/author/mary',
  name: 'Mary',
  jobTitle: 'Client Communications & Operations Lead, ZA Support',
  description:
    'Mary is the client communications and operations lead at ZA Support. She handles all incoming client enquiries, repair bookings, and follow-up correspondence from zasupport.com. All technical content is authored by Courtney Bentley.',
  url: 'https://zasupport.com/author/mary',
  knowsAbout: [
    'Client communications',
    'Apple repair coordination',
    'Service scheduling',
    'Customer support',
    'Repair status tracking',
  ],
  worksFor: {
    '@type': 'LocalBusiness',
    '@id': 'https://zasupport.com/#organization',
    name: SITE.name,
    url: 'https://zasupport.com',
  },
};

const roles = [
  { icon: MessageCircle, label: 'Client Enquiries', detail: 'Receives every enquiry submitted via the zasupport.com contact form' },
  { icon: Calendar, label: 'Repair Bookings', detail: 'Coordinates booking, scheduling, and intake for every repair on zasupport.com/book' },
  { icon: Phone, label: 'Follow-Up Correspondence', detail: 'Manages assessment summaries, status updates, and post-repair follow-up with clients' },
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
            Client Communications &amp; Operations Lead, ZA Support
          </p>

          <p className="text-[#7A9E98] text-lg leading-relaxed mb-4">
            Mary is the first point of contact for every client who reaches ZA Support through
            zasupport.com. She receives all enquiries submitted via the contact form, all repair
            bookings made through the booking page, and handles every follow-up communication
            from initial assessment summary through to repair completion at the Hyde Park
            workshop.
          </p>

          <p className="text-[#7A9E98] text-lg leading-relaxed mb-10">
            All technical articles, repair guides, and educational content on zasupport.com are
            written by{' '}
            <Link href="/author/courtney-bentley" className="text-[#0FEA7A] hover:underline">
              Courtney Bentley
            </Link>
            , the founder and Apple Certified Expert Consultant. Mary&apos;s focus is making sure
            every client who contacts ZA Support is responded to quickly, scheduled accurately,
            and kept informed throughout the repair process.
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
              All technical content authored by{' '}
              <Link href="/author/courtney-bentley" className="text-[#0FEA7A] hover:underline">
                Courtney Bentley
              </Link>
              , Apple Certified Expert Consultant.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
