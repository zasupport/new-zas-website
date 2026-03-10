import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Star, Shield, Clock, BadgeCheck } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import { CONTACT, SITE, REVIEWS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Apple Repair Johannesburg — Every Device, Every Problem | ZA Support',
  description:
    "Johannesburg's Apple repair hub. MacBook, iPhone, iPad, Apple Watch. Liquid damage, screen, battery, logic board. 4.9★ 120+ reviews. No Fix No Fee. Call 064 529 5863.",
  alternates: { canonical: 'https://zasupport.com/apple-repair' },
};

const faqs = [
  { question: 'Do you repair all Apple devices?', answer: 'Yes — MacBook Air, MacBook Pro, iMac, Mac mini, Mac Pro, iPhone, iPad, Apple Watch, and AirPods. From liquid damage and screen cracks to logic board microsoldering and JAMF MDM setup.' },
  { question: 'How much does Apple repair cost in Johannesburg?', answer: 'Costs vary significantly by device and damage type. iPhone screen from R 1,500, battery from R 950. MacBook liquid damage from R 2,500. Logic board microsoldering from R 1,800. All assessments are free with no obligation.' },
  { question: 'Do you offer a warranty on repairs?', answer: 'Yes — 12 months on all repairs. This covers our workmanship and any components we replace. It does not cover subsequent physical damage or new faults unrelated to the original repair.' },
  { question: 'Is there a No Fix No Fee policy?', answer: 'Yes. If we assess your device and cannot repair it, or if the repair is not cost-effective, you pay nothing for the assessment. We will give you an honest prognosis upfront.' },
  { question: 'Do you repair both old and new Apple devices?', answer: 'Yes. We repair everything from older Intel MacBook Pros to the latest M3 models. For iPhones, we repair from iPhone 8 through iPhone 16 Pro Max. Call to confirm parts availability for very old models.' },
];

const allServices = [
  { title: 'MacBook Repair', href: '/macbook-repair', price: 'From R 950', sub: 'Battery, screen, keyboard, logic board' },
  { title: 'Liquid Damage Repair', href: '/liquid-damage', price: 'From R 2,500', sub: 'MacBook, iPhone, iPad, Apple Watch' },
  { title: 'Logic Board Repair', href: '/logic-board-repair', price: 'From R 1,800', sub: 'Microsoldering specialists' },
  { title: 'iPhone Repair', href: '/iphone-repair', price: 'From R 950', sub: 'All models, all damage types' },
  { title: 'iPad Repair', href: '/ipad-repair', price: 'From R 1,200', sub: 'All iPad models including M4' },
  { title: 'MacBook Battery Replacement', href: '/macbook-repair/battery', price: 'From R 1,200', sub: 'All M-series and Intel MacBook Air & Pro' },
  { title: 'MacBook Screen Replacement', href: '/macbook-repair/screen', price: 'From R 3,500', sub: 'Retina display, all models' },
  { title: 'JAMF MDM', href: '/jamf-mdm', price: 'From R 4,500/mo', sub: 'Enterprise Apple management' },
  { title: 'Managed Services', href: '/managed-services', price: 'From R 4,500/mo', sub: 'Apple-first IT MSP' },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Apple Repair', item: 'https://zasupport.com/apple-repair' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function AppleRepairPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.2)] rounded-full px-4 py-2 mb-6">
              <span className="text-[#0FEA7A]">★★★★★</span>
              <span className="text-[#E8F4F1] text-sm">{SITE.rating} · {SITE.reviewCount} Google Reviews</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
              Apple Repair Johannesburg
              <br /><span className="text-[#0FEA7A]">Every Device. Every Problem.</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-8 max-w-3xl leading-relaxed">
              {SITE.repairsCount} repairs. {SITE.yearsExperience} years Apple experience. 4.9★ on Google.
              No Fix No Fee. 12-month warranty. Hyde Park, Johannesburg.
            </p>
            <div className="flex flex-wrap gap-6 mb-8">
              {[
                { value: SITE.repairsCount, label: 'Repairs Completed' },
                { value: SITE.rating + '★', label: 'Google Rating' },
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
            {[{ icon: Shield, label: 'No Fix No Fee' }, { icon: BadgeCheck, label: '12-Month Warranty' }, { icon: Clock, label: '72-Hour Turnaround' }, { icon: Phone, label: '064 529 5863' }].map(({ icon: Icon, label }) => (
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
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8 text-center" style={{ fontFamily: 'Syne, sans-serif' }}>All Repair Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {allServices.map((service) => (
              <Link key={service.href} href={service.href} className="glass-card p-5 group block">
                <h3 className="text-[#E8F4F1] font-bold mb-1 text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>{service.title}</h3>
                <p className="text-[#7A9E98] text-xs mb-3">{service.sub}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#0FEA7A] text-sm font-bold">{service.price}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#7A9E98] group-hover:text-[#0FEA7A] transition-colors" />
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
            {SITE.rating} on Google — {SITE.reviewCount} Reviews
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
          <FAQAccordion items={faqs} title="Apple Repair — Common Questions" />
        </div>
      </section>

      <section className="py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>Apple Device Damaged? Call Us.</h2>
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
