import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Battery, Monitor, Keyboard, Wrench, Droplets, Cpu } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import { CONTACT, SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Air Repair Johannesburg | Battery, Screen, Keyboard — All Models | ZA Support',
  description:
    'MacBook Air repair in Johannesburg. Battery, screen, keyboard, trackpad, charging port, liquid damage — M1, M2, M3 and Intel models. From R 950. No Fix No Fee. Hyde Park.',
  alternates: { canonical: 'https://zasupport.com/macbook-air-repair' },
};

const services = [
  {
    icon: Battery,
    title: 'Battery Replacement',
    description: 'Restore all-day battery life. MacBook Air M1/M2/M3 from R 1,200. Intel models from R 1,000.',
    href: '/macbook-repair/battery',
    price: 'From R 1,200',
  },
  {
    icon: Monitor,
    title: 'Screen Replacement',
    description: 'Cracked Retina display, dead pixels, backlight failure. MacBook Air screens from R 3,500.',
    href: '/macbook-repair/screen',
    price: 'From R 3,500',
  },
  {
    icon: Keyboard,
    title: 'Keyboard Replacement',
    description: 'Sticky keys, broken keys, butterfly keyboard failure. From R 2,500.',
    href: '/macbook-repair/keyboard',
    price: 'From R 2,500',
  },
  {
    icon: Wrench,
    title: 'Trackpad Repair',
    description: 'Trackpad not clicking, erratic cursor, raised trackpad from swollen battery.',
    href: '/macbook-repair/trackpad',
    price: 'From R 1,800',
  },
  {
    icon: Wrench,
    title: 'Charging Port Repair',
    description: 'USB-C port not charging, MagSafe not connecting, bent pins.',
    href: '/macbook-repair/charging-port',
    price: 'From R 500',
  },
  {
    icon: Droplets,
    title: 'Liquid Damage',
    description: 'MacBook Air liquid damage repair. Ultrasonic board cleaning and component-level repair.',
    href: '/liquid-damage/macbook-air',
    price: 'From R 2,500',
  },
];

const models = [
  { name: 'MacBook Air M3 15" (2024)', note: 'Latest model' },
  { name: 'MacBook Air M3 13" (2024)', note: 'Latest model' },
  { name: 'MacBook Air M2 15" (2023)', note: 'Popular' },
  { name: 'MacBook Air M2 13" (2022)', note: 'Popular' },
  { name: 'MacBook Air M1 13" (2020)', note: 'Popular' },
  { name: 'MacBook Air Intel 13" (2017–2020)', note: 'Intel' },
  { name: 'MacBook Air Intel 13" (2013–2017)', note: 'Intel' },
  { name: 'MacBook Air 11" (all years)', note: 'Intel' },
];

const faqs = [
  {
    question: 'How much does MacBook Air repair cost in Johannesburg?',
    answer: 'MacBook Air repair costs depend on the fault: battery replacement starts at R 1,200, screen replacement starts at R 3,500, keyboard replacement starts at R 2,500, and port repairs start at R 500. We provide a free assessment and fixed quote before starting any work.',
  },
  {
    question: 'Can M1, M2, and M3 MacBook Air models be repaired?',
    answer: 'Yes. We repair all M-series MacBook Air models including M1 (2020), M2 (2022), and M3 (2024) variants. Some components — specifically RAM and storage — are soldered directly to the logic board on M-series machines and cannot be upgraded after purchase, but battery, screen, keyboard, trackpad, and port repairs are all available.',
  },
  {
    question: 'My MacBook Air is not turning on. Can you diagnose it?',
    answer: 'Yes. A MacBook Air that does not power on is one of our most common repairs. Common causes include a failed battery, a faulty charging port, liquid damage, or a power management fault on the logic board. We run a free diagnostic on no-power MacBook Air machines before quoting.',
  },
  {
    question: 'How long does MacBook Air repair take?',
    answer: 'Battery and port repairs typically take 1.5 to 2 hours. Screen replacement takes 2 to 3 hours. Liquid damage assessment takes 1 to 2 days once the machine has been fully cleaned and dried. We will give you a specific timeline when you drop your machine in.',
  },
  {
    question: 'Do you offer a warranty on MacBook Air repairs?',
    answer: 'Yes — all repairs carry a 12-month ZA Support warranty on parts and labour. If the same fault reoccurs within 12 months, we fix it at no charge.',
  },
  {
    question: 'Is it worth repairing an older MacBook Air?',
    answer: 'For most Intel MacBook Air models in good condition, repair is nearly always worth it — the machines are well-built and repairable. We will give you an honest repair-vs-replace recommendation based on the repair cost versus the current value of your machine. We never recommend a repair that does not make financial sense.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Air Repair Johannesburg',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: { '@type': 'City', name: 'Johannesburg' },
  description: 'MacBook Air repair in Johannesburg. Battery, screen, keyboard, trackpad, charging port. M1, M2, M3 and Intel models.',
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: '500',
    highPrice: '5000',
    priceCurrency: 'ZAR',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'MacBook Air Repair', item: 'https://zasupport.com/macbook-air-repair' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function MacBookAirRepairPage() {
  const REVIEWS = { rating: SITE.rating, count: SITE.reviewCount };

  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />
      <SchemaOrg schema={serviceSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-8 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(15,234,122,0.3)] bg-[rgba(15,234,122,0.08)] text-[#0FEA7A] text-xs font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0FEA7A] animate-pulse" />
              {REVIEWS.rating} stars &middot; {REVIEWS.count} reviews &middot; {SITE.repairsCount} repairs
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] leading-tight mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
              MacBook Air Repair<br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-8">
              Battery, screen, keyboard, trackpad, and port repair for all MacBook Air models — M1, M2, M3, and Intel. Hyde Park specialists. No Fix No Fee.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link href="/contact" className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                Get a Quote <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4 text-center" style={{ fontFamily: 'Syne, sans-serif' }}>MacBook Air Repairs We Do</h2>
          <p className="text-[#7A9E98] text-center mb-12 text-sm">All common MacBook Air faults — same-day diagnosis, fixed pricing, 12-month warranty.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc) => {
              const Icon = svc.icon;
              return (
                <Link
                  key={svc.href}
                  href={svc.href}
                  className="group glass-card p-6 rounded-2xl hover:border-[rgba(15,234,122,0.35)] transition-all"
                >
                  <Icon className="w-8 h-8 text-[#0FEA7A] mb-4" />
                  <h3 className="text-lg font-bold text-[#E8F4F1] mb-2 group-hover:text-[#0FEA7A] transition-colors">{svc.title}</h3>
                  <p className="text-[#7A9E98] text-sm mb-4">{svc.description}</p>
                  <span className="text-[#0FEA7A] font-bold text-sm">{svc.price}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Models supported */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8 text-center" style={{ fontFamily: 'Syne, sans-serif' }}>All MacBook Air Models Supported</h2>
          <div className="glass-card p-6">
            {models.map(({ name, note }, i) => (
              <div key={name} className={`flex justify-between items-center py-3 ${i < models.length - 1 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}>
                <span className="text-[#7A9E98] text-sm">{name}</span>
                <span className="text-xs text-[#0FEA7A] bg-[rgba(15,234,122,0.1)] px-2 py-0.5 rounded-full">{note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="MacBook Air Repair — FAQs" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>MacBook Air Needs a Repair?</h2>
            <p className="text-[#7A9E98] mb-6">Free assessment. Fixed pricing. No Fix No Fee. Hyde Park, Johannesburg.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link href="/contact" className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                Get a Quote <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
