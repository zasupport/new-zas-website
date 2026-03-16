import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, Award, Shield, Wrench } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { CONTACT, SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Courtney Bentley, Apple Certified Technician | ZA Support',
  description:
    'Courtney Bentley is the founder of ZA Support and an Apple Certified Technician with 16 years of experience in Mac repair, JAMF MDM, and component-level microsoldering in Johannesburg.',
  alternates: { canonical: 'https://zasupport.com/author/courtney-bentley' },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://zasupport.com/author/courtney-bentley',
  name: 'Courtney Bentley',
  jobTitle: 'Founder & Apple Certified Technician',
  description:
    'Courtney Bentley is the founder of ZA Support (trading as Apple Experts) and has been repairing Apple devices in Johannesburg since 2009. Specialising in component-level microsoldering, JAMF MDM, and medical practice IT.',
  url: 'https://zasupport.com/author/courtney-bentley',
  image: 'https://zasupport.com/courtney-bentley.jpg',
  email: CONTACT.email,
  telephone: CONTACT.phoneTel,
  knowsAbout: [
    'MacBook logic board repair',
    'Component-level microsoldering',
    'JAMF MDM',
    'Apple device repair',
    'Medical practice IT',
    'macOS',
    'iOS',
  ],
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'certification',
      name: 'JAMF Certified Technician',
      issuedBy: { '@type': 'Organization', name: 'JAMF Software' },
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'certification',
      name: 'Component-Level Microsoldering, Apple Logic Boards',
      issuedBy: { '@type': 'Organization', name: 'ZA Support' },
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
    'https://facebook.com/zasupport',
  ],
};

const credentials = [
  { icon: Award, label: 'JAMF Certified Technician', detail: 'Apple device management and MDM deployment' },
  { icon: Wrench, label: 'Component-Level Microsoldering', detail: 'Logic board repair under microscope, chip-level' },
  { icon: Shield, label: 'Medical IT Specialist', detail: 'HPCSA-compliant IT for medical practices across Gauteng' },
  { icon: CheckCircle, label: '16 Years Apple Experience', detail: 'Mac repair, iPhone, iPad, Apple Watch since 2009' },
];

export default function CourtneyBentleyPage() {
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
            <span className="text-sm text-[#E8F4F1]">Courtney Bentley</span>
          </div>

          <h1 className="text-4xl font-bold text-[#E8F4F1] mb-2">Courtney Bentley</h1>
          <p className="text-[#0FEA7A] font-semibold text-lg mb-6">
            Founder &amp; Apple Certified Technician, ZA Support
          </p>

          <p className="text-[#7A9E98] text-lg leading-relaxed mb-10">
            Courtney Bentley founded ZA Support in 2009 and has spent 16 years repairing Apple devices
            at component level from the workshop in Hyde Park, Johannesburg. Specialising in MacBook
            logic board microsoldering, JAMF MDM rollouts for businesses, and managed IT for medical
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
              {['Logic Board Repair', 'Liquid Damage', 'JAMF MDM', 'MacBook Repair', 'Medical Practice IT', 'Assessment: R899 ex VAT'].map((s) => (
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
