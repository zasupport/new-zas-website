import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Shield, BadgeCheck, Clock, Star, Headphones } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import { CONTACT, SITE, REVIEWS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Apple Support Johannesburg | Same-Day Help for Mac, iPhone, iPad | ZA Support',
  description:
    "Apple support in Johannesburg. On-site and in-studio help for Mac, iPhone, iPad and Apple Watch. Setup, troubleshooting, data recovery, business IT. 4.9★ 120+ reviews. Call 064 529 5863.",
  alternates: { canonical: 'https://zasupport.com/apple-support' },
};

const supportServices = [
  {
    title: 'Mac Troubleshooting',
    desc: 'Slow performance, startup problems, software crashes, macOS issues — diagnosed and resolved.',
    href: '/macbook-repair',
    price: 'From R 899/hr',
  },
  {
    title: 'Data Recovery',
    desc: 'Deleted files, failed drives, corrupted Time Machine backups — recovered where technically possible.',
    href: '/apple-repair',
    price: 'From R 1,800',
  },
  {
    title: 'Mac Setup & Migration',
    desc: 'New Mac setup, data migration from old Mac or Windows, iCloud configuration, Apple ID issues.',
    href: '/apple-repair',
    price: 'From R 1,499',
  },
  {
    title: 'iPhone & iPad Support',
    desc: 'Setup, backup restore, app issues, connectivity, iCloud sync problems — all models.',
    href: '/iphone-repair',
    price: 'From R 899/hr',
  },
  {
    title: 'Business Apple Support',
    desc: 'JAMF MDM deployment, Apple Business Manager, fleet setup, M365 integration.',
    href: '/managed-services',
    price: 'From R 4,500/mo',
  },
  {
    title: 'Apple Device Repair',
    desc: 'Screen, battery, liquid damage, logic board — all Apple devices, all damage types.',
    href: '/apple-repair',
    price: 'From R 950',
  },
];

const faqs = [
  {
    question: 'What is the difference between Apple Support and Apple Repair?',
    answer:
      'Apple Support at ZA Support covers troubleshooting, setup, configuration, data migration, and advice — the "how do I use this" and "something is not working right" questions. Apple Repair covers physical damage: cracked screens, dead batteries, liquid damage, and logic board failures. In practice, most visits involve elements of both — we fix the physical issue and ensure the software is fully set up correctly.',
  },
  {
    question: 'Do you support all Apple devices?',
    answer:
      'Yes — MacBook Air, MacBook Pro, iMac, Mac mini, Mac Pro, Mac Studio, iPhone (8 through 16 Pro Max), iPad (all models including M4), Apple Watch, AirPods, and HomePod. We also support Apple Business Manager, JAMF MDM, and Apple-first IT environments for companies.',
  },
  {
    question: 'Can you help with data migration from an old Mac to a new one?',
    answer:
      'Yes. We handle the full migration — old Mac to new Mac, Windows to Mac, or Mac to Mac via Migration Assistant or manual transfer. We also configure iCloud, email accounts, and apps on the new machine. You collect a fully set-up machine ready to work.',
  },
  {
    question: 'Do you offer on-site Apple support at our office?',
    answer:
      'Yes. On-site support is available in Johannesburg and surrounding areas. We charge a travel fee and our standard hourly rate. On-site is most cost-effective for multi-machine setup, network configuration, or issues that require us to see the full setup in context.',
  },
  {
    question: 'Can you help if I am locked out of my Apple ID?',
    answer:
      'Yes, for most scenarios. If you know your recovery email or phone number, we can walk through the Apple ID recovery process. If the account is tied to a deceased person\'s device, we can prepare the documentation Apple requires and assist with the removal process. We cannot bypass Apple\'s activation lock — no one legitimately can.',
  },
  {
    question: 'How much does Apple Support cost?',
    answer:
      'Hourly rate is R 899/hour. Most single-issue sessions take 1–2 hours. Setup and migration is quoted at a flat rate (typically R 1,499–R 2,999 depending on data size and complexity). Business support and managed services are charged monthly — see our Managed Services page for tier pricing.',
  },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Apple Support', item: 'https://zasupport.com/apple-support' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function AppleSupportPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.2)] rounded-full px-4 py-2 mb-6">
              <span className="text-[#0FEA7A]">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
              <span className="text-[#E8F4F1] text-sm">{SITE.rating} &middot; {SITE.reviewCount} Google Reviews</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
              Apple Support Johannesburg
              <br /><span className="text-[#0FEA7A]">Setup, Fix, Migrate. Same Day.</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-8 max-w-3xl leading-relaxed">
              Troubleshooting, setup, data migration, and ongoing support for every Apple device.
              {SITE.yearsExperience} years Apple experience. No Fix No Fee. Hyde Park, Johannesburg.
            </p>
            <div className="flex flex-wrap gap-6 mb-8">
              {[
                { value: SITE.repairsCount, label: 'Jobs Completed' },
                { value: SITE.rating + String.fromCharCode(9733), label: 'Google Rating' },
                { value: SITE.yearsExperience + ' Years', label: 'Apple Experience' },
              ].map((stat) => (
                <div key={stat.label}>
                  <span className="block text-3xl font-extrabold text-[#0FEA7A]" style={{ fontFamily: 'Syne, sans-serif' }}>{stat.value}</span>
                  <span className="text-[#7A9E98] text-sm">{stat.label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                Book Free Assessment <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 bg-[#111C1A] border-y border-[rgba(15,234,122,0.1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {[
              { icon: Shield, label: 'No Fix No Fee' },
              { icon: BadgeCheck, label: '12-Month Warranty' },
              { icon: Clock, label: 'Same-Day Help' },
              { icon: Headphones, label: 'All Apple Devices' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-[#0FEA7A]" />
                <span className="text-[#E8F4F1] text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3 text-center" style={{ fontFamily: 'Syne, sans-serif' }}>What We Help With</h2>
          <p className="text-[#7A9E98] text-center mb-10">Setup, troubleshooting, data, business IT &mdash; all under one roof.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {supportServices.map((service) => (
              <Link key={service.title} href={service.href} className="glass-card p-6 group block">
                <h3 className="text-[#E8F4F1] font-bold mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>{service.title}</h3>
                <p className="text-[#7A9E98] text-sm mb-4 leading-relaxed">{service.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#0FEA7A] text-sm font-bold">{service.price}</span>
                  <ArrowRight className="w-4 h-4 text-[#7A9E98] group-hover:text-[#0FEA7A] transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-1 mb-4">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-[#0FEA7A] text-[#0FEA7A]" />)}
          </div>
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-10 text-center" style={{ fontFamily: 'Syne, sans-serif' }}>
            {SITE.rating} on Google &mdash; {SITE.reviewCount} Reviews
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REVIEWS.map((review) => (
              <div key={review.name} className="p-6 rounded-2xl bg-[rgba(22,34,32,0.6)] border border-[rgba(15,234,122,0.12)]">
                <div className="flex items-center gap-1 mb-3">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-[#0FEA7A] text-[#0FEA7A]" />)}
                </div>
                <p className="text-[#E8F4F1] text-sm italic mb-4">&ldquo;{review.text}&rdquo;</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[rgba(15,234,122,0.15)] rounded-full flex items-center justify-center text-[#0FEA7A] font-bold text-sm">{review.name[0]}</div>
                  <span className="text-[#E8F4F1] font-semibold text-sm">{review.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Apple Support &mdash; Common Questions" />
        </div>
      </section>

      <section className="py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>Need Apple Support? Call Us.</h2>
            <p className="text-[#7A9E98] mb-6">Free assessment. No Fix No Fee. Hyde Park, Johannesburg.</p>
            <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
              <Phone className="w-5 h-5" /> Call {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
