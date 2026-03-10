import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Shield, Clock, BadgeCheck, Star, Battery, Monitor, Keyboard, Cpu, Droplets, Wrench } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import { CONTACT, SITE } from '@/lib/constants';

const REVIEWS = { rating: SITE.rating, count: SITE.reviewCount };

export const metadata: Metadata = {
  title: 'MacBook Repair Johannesburg | Battery, Screen, Keyboard & Logic Board | ZA Support',
  description:
    'MacBook repair in Johannesburg from R 950. Battery, screen, keyboard, liquid damage, logic board microsoldering. All M-series and Intel models. No Fix No Fee. Hyde Park. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/macbook-repair' },
};

const services = [
  {
    icon: Battery,
    title: 'Battery Replacement',
    description: 'Restore battery life to 100%. MacBook Air from R 1,200. MacBook Pro from R 1,500.',
    href: '/macbook-repair/battery',
    price: 'From R 1,200',
    accent: 'text-green-400',
  },
  {
    icon: Monitor,
    title: 'Screen Replacement',
    description: 'Cracked Retina display, dead pixels, backlight failure. Genuine quality panels.',
    href: '/macbook-repair/screen',
    price: 'From R 3,500',
    accent: 'text-blue-400',
  },
  {
    icon: Keyboard,
    title: 'Keyboard Replacement',
    description: 'Sticky keys, broken keys, water-damaged keyboard. MacBook Pro butterfly to Magic keyboard.',
    href: '/macbook-repair/keyboard',
    price: 'From R 2,500',
    accent: 'text-purple-400',
  },
  {
    icon: Droplets,
    title: 'Liquid Damage Repair',
    description: 'Board-level ultrasonic cleaning and component repair. MacBook Air & Pro specialists.',
    href: '/liquid-damage',
    price: 'From R 2,500',
    accent: 'text-cyan-400',
  },
  {
    icon: Cpu,
    title: 'Logic Board Repair',
    description: 'Expert microsoldering for no-power, no-display, USB-C failure and GPU faults.',
    href: '/logic-board-repair',
    price: 'From R 1,800',
    accent: 'text-orange-400',
  },
  {
    icon: Wrench,
    title: 'Port & Charging Repair',
    description: 'MagSafe, USB-C and Thunderbolt port repair. MacBook not charging? We fix it.',
    href: '/contact',
    price: 'From R 950',
    accent: 'text-red-400',
  },
];

const models = [
  { name: 'MacBook Air M3 (2024)', tag: 'Latest' },
  { name: 'MacBook Air M2 (2022–2023)', tag: 'Popular' },
  { name: 'MacBook Air M1 (2020–2021)', tag: 'Popular' },
  { name: 'MacBook Pro M3 Pro / Max (2023)', tag: 'Pro' },
  { name: 'MacBook Pro M2 Pro / Max (2022)', tag: 'Pro' },
  { name: 'MacBook Pro M1 Pro / Max (2021)', tag: 'Pro' },
  { name: 'MacBook Pro Intel (2015–2019)', tag: 'Intel' },
  { name: 'MacBook Air Intel (2017–2020)', tag: 'Intel' },
];

const faqs = [
  {
    question: 'How much does MacBook repair cost in Johannesburg?',
    answer: 'MacBook repair costs depend on the fault type and model. Battery replacement starts at R 1,200. Screen replacement from R 3,500. Keyboard replacement from R 2,500. Logic board microsoldering from R 1,800. Liquid damage assessment is free with a detailed quote before any work begins.',
  },
  {
    question: 'Do you repair M-series MacBooks (M1, M2, M3)?',
    answer: 'Yes. We repair all Apple Silicon MacBook models including M1, M2, and M3 variants of both MacBook Air and MacBook Pro. Some repairs differ slightly for M-series (RAM and storage are soldered) but battery, screen, keyboard, port, and logic board repairs are all available.',
  },
  {
    question: 'How long does MacBook repair take?',
    answer: 'Battery replacement: 60–90 minutes. Screen replacement: 2–4 hours depending on model. Keyboard replacement: 2–3 hours. Logic board and liquid damage repairs typically take 3–5 business days as they involve component-level diagnosis and microsoldering.',
  },
  {
    question: 'Is there a No Fix No Fee policy?',
    answer: 'Yes. If we assess your MacBook and cannot repair it, or the repair is not cost-effective, you pay nothing. We provide an honest prognosis and written quote before starting any work.',
  },
  {
    question: 'Do you offer a warranty on MacBook repairs?',
    answer: 'All MacBook repairs carry a 12-month warranty covering our workmanship and any components we replace. This does not cover subsequent physical damage or new unrelated faults.',
  },
  {
    question: 'Can you recover data from a damaged MacBook?',
    answer: 'In most cases, yes. For liquid-damaged or failed-to-boot MacBooks, data recovery is often possible before or alongside the repair. Modern Macs with Apple Silicon have encrypted storage — data is recoverable if the logic board is repaired, not in all cases of total board failure. We will advise you honestly after assessment.',
  },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'MacBook Repair', item: 'https://zasupport.com/macbook-repair' },
  ],
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Repair Johannesburg',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: { '@type': 'City', name: 'Johannesburg' },
  description: 'MacBook repair in Johannesburg — battery, screen, keyboard, liquid damage, logic board. All M-series and Intel models. No Fix No Fee.',
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: '950',
    highPrice: '12000',
    priceCurrency: 'ZAR',
  },
};

const faqSchema = buildFaqSchema(faqs);

export default function MacBookRepairPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />
      <SchemaOrg schema={serviceSchema} />

      {/* Hero */}
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[rgba(15,234,122,0.1)] border border-[rgba(15,234,122,0.2)] rounded-full px-4 py-2 mb-6">
              <Star className="w-4 h-4 text-[#0FEA7A]" />
              <span className="text-[#0FEA7A] text-sm font-medium">{REVIEWS.rating} · {REVIEWS.count} reviews · Hyde Park, Johannesburg</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] leading-tight mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
              MacBook Repair<br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-8 max-w-2xl">
              Battery, screen, keyboard, liquid damage, logic board. All M-series and Intel MacBook Air and MacBook Pro models. No Fix No Fee policy. 12-month warranty.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all text-lg"
              >
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                Get a Quote <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 mt-8 text-sm text-[#7A9E98]">
              <span className="flex items-center gap-1.5"><BadgeCheck className="w-4 h-4 text-[#0FEA7A]" /> 12-month warranty</span>
              <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-[#0FEA7A]" /> No Fix No Fee</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#0FEA7A]" /> Same-day for most repairs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4 text-center" style={{ fontFamily: 'Syne, sans-serif' }}>
            MacBook Repair <span className="text-[#0FEA7A]">Services</span>
          </h2>
          <p className="text-[#7A9E98] text-center mb-12 max-w-2xl mx-auto">
            From a dead battery to board-level microsoldering — every MacBook fault, one address.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="glass-card p-6 hover:border-[rgba(15,234,122,0.3)] transition-all group block"
              >
                <service.icon className={`w-8 h-8 ${service.accent} mb-4`} />
                <h3 className="text-lg font-bold text-[#E8F4F1] mb-2 group-hover:text-[#0FEA7A] transition-colors">{service.title}</h3>
                <p className="text-[#7A9E98] text-sm mb-4">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#0FEA7A] font-bold text-sm">{service.price}</span>
                  <ArrowRight className="w-4 h-4 text-[#0FEA7A] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Models */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4 text-center" style={{ fontFamily: 'Syne, sans-serif' }}>
            Models <span className="text-[#0FEA7A]">We Repair</span>
          </h2>
          <p className="text-[#7A9E98] text-center mb-12">All MacBook Air and MacBook Pro models from 2015 to the latest M3.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {models.map((model) => (
              <div key={model.name} className="glass-card p-4 flex items-center gap-3">
                <span className="text-[#0FEA7A] text-xs font-semibold bg-[rgba(15,234,122,0.1)] px-2 py-0.5 rounded-full whitespace-nowrap">{model.tag}</span>
                <span className="text-[#7A9E98] text-sm">{model.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: BadgeCheck, title: SITE.repairsCount + ' Repairs', sub: 'MacBook, iPhone and iPad' },
              { icon: Star, title: REVIEWS.rating + ' Stars', sub: REVIEWS.count + ' Google reviews' },
              { icon: Shield, title: '12-Month Warranty', sub: 'On every repair, every component' },
            ].map((item) => (
              <div key={item.title} className="glass-card p-8">
                <item.icon className="w-10 h-10 text-[#0FEA7A] mx-auto mb-4" />
                <div className="text-2xl font-extrabold text-[#E8F4F1] mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>{item.title}</div>
                <div className="text-[#7A9E98] text-sm">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="MacBook Repair — FAQs" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>MacBook Giving You Problems?</h2>
            <p className="text-[#7A9E98] mb-6">Free assessment. Honest quote. No Fix No Fee. Hyde Park, Johannesburg.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
