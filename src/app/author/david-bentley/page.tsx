import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, Award, Shield, Wrench } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { CONTACT, SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'David Bentley, Founder & Apple Certified Technician | ZA Support',
  description:
    'David Bentley is the founder of ZA Support and an Apple Certified Technician with 16 years of experience in Mac repair and component-level repair in Johannesburg. BSc Informatics, previous Apple Manager.',
  alternates: { canonical: 'https://zasupport.com/author/david-bentley' },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://zasupport.com/author/david-bentley',
  name: 'David Bentley',
  jobTitle: 'Founder & Apple Certified Technician',
  description:
    'David Bentley is the founder of ZA Support (trading as Apple Experts) and has been repairing Apple devices in Johannesburg since 2009. BSc Informatics, previous Apple Manager and Solution Architect. Specialising in component-level repair and medical practice IT.',
  url: 'https://zasupport.com/author/david-bentley',
  email: CONTACT.email,
  telephone: CONTACT.phoneTel,
  knowsAbout: [
    'MacBook logic board repair',
    'Component-level repair',
    'Apple Device Management',
    'Apple device repair',
    'Medical practice IT',
    'macOS',
    'iOS',
    'Solution Architecture',
  ],
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'degree',
      name: 'BSc Informatics',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'certification',
      name: 'Apple Certified Technician',
    },
  ],
  worksFor: {
    '@type': 'LocalBusiness',
    '@id': 'https://zasupport.com/#organization',
    name: SITE.name,
    url: 'https://zasupport.com',
  },
  sameAs: [
    'https://linkedin.com/company/zasupport',
    'https://facebook.com/appleexpertsouthafrica',
  ],
};

const credentials = [
  { icon: Award, label: 'BSc Informatics', detail: 'Formal qualification in information systems and technology' },
  { icon: Wrench, label: 'Component-Level Repair', detail: 'Logic board repair under microscope, chip-level diagnostics' },
  { icon: Shield, label: 'Medical IT Specialist', detail: 'HPCSA-compliant IT for medical practices across Gauteng' },
  { icon: CheckCircle, label: '16 Years Apple Experience', detail: 'Previous Apple Manager & Solution Architect, Mac repair since 2009' },
];

export default function DavidBentleyPage() {
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
            <span className="text-sm text-[#E8F4F1]">David Bentley</span>
          </div>

          <h1 className="text-4xl font-bold text-[#E8F4F1] mb-2">David Bentley</h1>
          <p className="text-[#0FEA7A] font-semibold text-lg mb-6">
            Founder &amp; Apple Certified Technician, ZA Support
          </p>

          <p className="text-[#7A9E98] text-lg leading-relaxed mb-10">
            David Bentley founded ZA Support in 2009 and has spent 16 years repairing Apple devices
            at component level from the workshop in Hyde Park, Johannesburg. With a BSc in Informatics
            and experience as a previous Apple Manager and Solution Architect, David specialises in MacBook
            logic board component-level repair, Apple device management for businesses, and managed IT for medical
            practices across Gauteng.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {credentials.map((c) => (
              <div
                key={c.label}
                className="flex gap-4 p-5 rounded-xl border border-[#27504D]/30 bg-[#111C1A]/60"
              >
                <c.icon className="w-6 h-6 text-[#0FEA7A] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#E8F4F1] text-sm">{c.label}</p>
                  <p className="text-xs text-[#7A9E98] mt-0.5">{c.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-[#27504D]/20 pt-8">
            <h2 className="text-xl font-bold text-[#E8F4F1] mb-4">Services</h2>
            <div className="flex flex-wrap gap-3">
              {['Logic Board Repair', 'Liquid Damage', 'Apple MDM', 'MacBook Repair', 'Medical Practice IT', 'Assessment: from R599'].map((s) => (
                <span key={s} className="text-sm px-3 py-1 rounded-full border border-[#27504D]/40 text-[#7A9E98]">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
