import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, Award, Shield, Wrench, ExternalLink } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { CONTACT, SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Courtney Bentley, Apple Certified Expert Consultant | ZA Support',
  description:
    'Courtney Bentley is the founder of ZA Support. Former Apple South Africa Manager. Forbes Africa 30 Under 30 (2019). 25,000+ Mac repairs. Component-level logic board repair specialist in Johannesburg.',
  alternates: { canonical: 'https://zasupport.com/author/courtney-bentley' },
  robots: { index: true, follow: true, 'max-image-preview': 'large' as const, 'max-snippet': -1, 'max-video-preview': -1 },
};

const profilePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: {
    '@type': 'Person',
    '@id': 'https://zasupport.com/author/courtney-bentley',
    name: 'Courtney Bentley',
    jobTitle: 'Apple Certified Expert Consultant',
    description:
      'Courtney Bentley is the founder of ZA Support and has been repairing Apple devices in Johannesburg since 2009. Former Apple South Africa Manager. Forbes Africa 30 Under 30 (2019). Specialising in component-level logic board repair, liquid damage recovery, and medical practice IT.',
    url: 'https://zasupport.com/author/courtney-bentley',
    image: 'https://zasupport.com/authors/courtney-bentley-author.webp',
    email: CONTACT.email,
    telephone: CONTACT.phoneTel,
    knowsAbout: [
      'MacBook logic board repair',
      'Component-level repair',
      'Apple device management',
      'Apple device repair',
      'Medical practice IT',
      'POPIA compliance',
      'macOS',
      'iOS',
      'Artificial Intelligence',
      'Alternative credit scoring',
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'certification',
        name: 'Apple Certified Expert Consultant',
      },
    ],
    alumniOf: [
      { '@type': 'EducationalOrganization', name: 'UNISA', department: 'BSc Informatics' },
      { '@type': 'EducationalOrganization', name: 'St John\'s College' },
    ],
    award: [
      'Forbes Africa 30 Under 30 — Technology (2019)',
      'Mercedes-Benz Predictive Manufacturing Award Winner (2017)',
      'Attacq Commercial Real Estate Innovation Award Winner (2017)',
      'Knife Capital Grindstone Venture Capital Program (2018)',
      'VivaTech Paris — Verizon Alternative Credit Scoring Award (2018)',
    ],
    worksFor: {
      '@type': 'LocalBusiness',
      '@id': 'https://zasupport.com/#organization',
      name: SITE.name,
      url: 'https://zasupport.com',
    },
    sameAs: [
      'https://www.linkedin.com/in/bentleycourtney/',
      'https://www.facebook.com/courtney.bentley.10/',
      'https://x.com/za_support',
      'https://www.tiktok.com/@appleexpertza',
      'https://www.instagram.com/appleexpertza/',
      'https://www.facebook.com/appleexpertsouthafrica',
      'https://www.youtube.com/@zasupport-applemacupgrader6746',
    ],
  },
};

const credentials = [
  { icon: Award, label: 'Forbes Africa 30 Under 30 (2019)', detail: 'Technology category — recognised for Apple repair innovation and Vizibiliti AI credit scoring' },
  { icon: Award, label: 'Former Apple South Africa Manager', detail: 'Apple retail and enterprise operations (2007-2009), founded ZA Support at age 19' },
  { icon: Wrench, label: 'Component-Level Repair', detail: '25,000+ Mac repairs — logic board repair under microscope, chip-level diagnostics' },
  { icon: Shield, label: 'Medical IT Specialist', detail: 'HPCSA-compliant IT for medical practices across Gauteng, POPIA compliance' },
  { icon: CheckCircle, label: 'BSc Informatics (UNISA)', detail: 'Formal qualification in information systems and technology' },
  { icon: CheckCircle, label: 'BEE Level 1', detail: 'Broad-based black economic empowerment — qualifying supplier for enterprise and government' },
];

const mediaLinks = [
  { label: 'Forbes Africa 30 Under 30', url: 'https://bit.ly/2YrcW8q' },
  { label: 'Gadget.co.za', url: 'https://gadget.co.za/sas-vizibiliti-conquers-us/' },
  { label: 'Good Things Guy', url: 'https://bit.ly/2uAZq0W' },
  { label: 'YouTube — Mercedes-Benz Award', url: 'https://www.youtube.com/watch?v=A4Km_OonG80' },
];

export default function CourtneyBentleyPage() {
  return (
    <>
      <SchemaOrg schema={profilePageSchema} />
      <main className="min-h-screen bg-[#0A1A18] text-[#E8F4F1]">
        <div className="max-w-3xl mx-auto px-4 py-10 sm:py-20">
          <div className="mb-6">
            <Link href="/" className="text-sm text-[#7A9E98] hover:text-[#0FEA7A] transition-colors">
              ZA Support
            </Link>
            <span className="text-[#7A9E98] mx-2">/</span>
            <span className="text-sm text-[#E8F4F1]">Courtney Bentley</span>
          </div>

          <div className="flex items-center gap-5 mb-6">
            <Image
              src="/authors/courtney-bentley-author.webp"
              alt="Courtney Bentley, Apple Certified Expert Consultant at ZA Support"
              width={96}
              height={96}
              className="rounded-full object-cover"
            />
            <div>
              <h1 className="text-4xl font-bold text-[#E8F4F1]">Courtney Bentley</h1>
              <p className="text-[#0FEA7A] font-semibold text-lg">
                Apple Certified Expert Consultant, ZA Support
              </p>
            </div>
          </div>

          <p className="text-[#7A9E98] text-lg leading-relaxed mb-4">
            Former Apple South Africa Manager (2007-2009). Founded ZA Support at age 19 in 2009.
            Forbes Africa 30 Under 30 (2019). Has personally overseen more than 25,000 Mac repairs
            at ZA Support&apos;s Hyde Park workshop. Specialises in component-level logic board repair,
            liquid damage recovery, and medical practice IT. BSc Informatics (UNISA). Member of the
            Apple Developer Program.
          </p>

          <p className="text-[#7A9E98] text-sm leading-relaxed mb-10">
            Also co-founded Vizibiliti Insight Africa in 2016 — an AI alternative credit scoring platform
            that worked with Mercedes-Benz Financial Services, Capitec Bank, and Old Mutual. Winner of the
            Mercedes-Benz Predictive Manufacturing Award (2017) and VivaTech Paris Verizon Alternative
            Credit Scoring Award (2018).
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <a href="https://www.linkedin.com/in/bentleycourtney/" target="_blank" rel="noopener noreferrer" className="text-sm px-4 py-2 rounded-full border border-[#27504D]/40 text-[#7A9E98] hover:text-[#0FEA7A] hover:border-[#0FEA7A]/40 transition-colors">LinkedIn</a>
            <a href="https://www.facebook.com/courtney.bentley.10/" target="_blank" rel="noopener noreferrer" className="text-sm px-4 py-2 rounded-full border border-[#27504D]/40 text-[#7A9E98] hover:text-[#0FEA7A] hover:border-[#0FEA7A]/40 transition-colors">Facebook</a>
            <a href="https://x.com/za_support" target="_blank" rel="noopener noreferrer" className="text-sm px-4 py-2 rounded-full border border-[#27504D]/40 text-[#7A9E98] hover:text-[#0FEA7A] hover:border-[#0FEA7A]/40 transition-colors">X / Twitter</a>
            <a href="https://www.tiktok.com/@appleexpertza" target="_blank" rel="noopener noreferrer" className="text-sm px-4 py-2 rounded-full border border-[#27504D]/40 text-[#7A9E98] hover:text-[#0FEA7A] hover:border-[#0FEA7A]/40 transition-colors">TikTok</a>
            <a href="https://www.instagram.com/appleexpertza/" target="_blank" rel="noopener noreferrer" className="text-sm px-4 py-2 rounded-full border border-[#27504D]/40 text-[#7A9E98] hover:text-[#0FEA7A] hover:border-[#0FEA7A]/40 transition-colors">Instagram</a>
          </div>

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

          <div className="border-t border-[#27504D]/20 pt-8 mb-10">
            <h2 className="text-xl font-bold text-[#E8F4F1] mb-4">Media &amp; Awards</h2>
            <div className="space-y-3">
              {mediaLinks.map((m) => (
                <a
                  key={m.label}
                  href={m.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#7A9E98] hover:text-[#0FEA7A] transition-colors text-sm"
                >
                  <ExternalLink className="w-4 h-4 shrink-0" />
                  {m.label}
                </a>
              ))}
            </div>
          </div>

          <div className="border-t border-[#27504D]/20 pt-8 mb-10">
            <h2 className="text-xl font-bold text-[#E8F4F1] mb-4">Services</h2>
            <div className="flex flex-wrap gap-3">
              {['Logic Board Repair', 'Liquid Damage', 'Apple MDM', 'MacBook Repair', 'Medical Practice IT', 'Assessment from R599'].map((s) => (
                <span key={s} className="text-sm px-3 py-1 rounded-full border border-[#27504D]/40 text-[#7A9E98]">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-[#27504D]/20 pt-8">
            <p className="text-xs text-[#7A9E98]">
              <Link href="/editorial-policy" className="hover:text-[#0FEA7A] transition-colors">Editorial Policy</Link>
              {' · '}
              <Link href="/blog" className="hover:text-[#0FEA7A] transition-colors">All Blog Posts</Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
