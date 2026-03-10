import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Battery, Monitor, Keyboard, Wrench, Droplets, Cpu } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import { CONTACT, SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Pro Repair Johannesburg | Battery, Screen, Logic Board — All Models | ZA Support',
  description:
    'MacBook Pro repair in Johannesburg. Battery, screen, keyboard, logic board microsoldering, liquid damage — M1 Pro/Max, M2 Pro/Max, M3 Pro/Max and Intel models. From R 950. No Fix No Fee. Hyde Park.',
  alternates: { canonical: 'https://zasupport.com/macbook-pro-repair' },
};

const services = [
  {
    icon: Battery,
    title: 'Battery Replacement',
    description: 'Restore all-day battery life. MacBook Pro 13" from R 1,500. MacBook Pro 14"/16" from R 1,800.',
    href: '/macbook-repair/battery',
    price: 'From R 1,500',
  },
  {
    icon: Monitor,
    title: 'Screen Replacement',
    description: 'Cracked Retina or Liquid Retina XDR display, dead pixels, backlight failure. From R 3,500.',
    href: '/macbook-repair/screen',
    price: 'From R 3,500',
  },
  {
    icon: Keyboard,
    title: 'Keyboard Replacement',
    description: 'Butterfly keyboard failure, Magic Keyboard sticky keys, broken keys, water damage. From R 2,500.',
    href: '/macbook-repair/keyboard',
    price: 'From R 2,500',
  },
  {
    icon: Wrench,
    title: 'Trackpad Repair',
    description: 'Trackpad not clicking, erratic cursor, Force Touch not working, raised from swollen battery.',
    href: '/macbook-repair/trackpad',
    price: 'From R 2,200',
  },
  {
    icon: Wrench,
    title: 'Charging Port Repair',
    description: 'USB-C or Thunderbolt port not charging, MagSafe not connecting, bent pins, port physically damaged.',
    href: '/macbook-repair/charging-port',
    price: 'From R 1,800',
  },
  {
    icon: Cpu,
    title: 'Logic Board Repair',
    description: 'No power, no display, USB-C failure, GPU fault — component-level microsoldering. All MacBook Pro models.',
    href: '/logic-board-repair',
    price: 'From R 1,800',
  },
  {
    icon: Droplets,
    title: 'Liquid Damage',
    description: 'MacBook Pro liquid damage repair. Ultrasonic board cleaning and component-level microsoldering.',
    href: '/liquid-damage/macbook-pro',
    price: 'From R 2,500',
  },
];

const models = [
  { name: 'MacBook Pro M3 Pro / Max 16" (2023)', note: 'Latest' },
  { name: 'MacBook Pro M3 Pro / Max 14" (2023)', note: 'Latest' },
  { name: 'MacBook Pro M2 Pro / Max 16" (2023)', note: 'Popular' },
  { name: 'MacBook Pro M2 Pro / Max 14" (2023)', note: 'Popular' },
  { name: 'MacBook Pro M1 Pro / Max 16" (2021)', note: 'Popular' },
  { name: 'MacBook Pro M1 Pro / Max 14" (2021)', note: 'Popular' },
  { name: 'MacBook Pro Intel 16" (2019)', note: 'Intel' },
  { name: 'MacBook Pro Intel 15" (2015–2019)', note: 'Intel' },
  { name: 'MacBook Pro Intel 13" (2016–2020)', note: 'Intel' },
  { name: 'MacBook Pro Intel 13" (2011–2015)', note: 'Intel' },
];

const faqs = [
  {
    question: 'How much does MacBook Pro repair cost in Johannesburg?',
    answer: 'MacBook Pro repair costs depend on the model and fault: battery replacement starts at R 1,500, screen replacement starts at R 3,500, keyboard replacement starts at R 2,500, logic board microsoldering from R 1,800, and liquid damage assessment includes a free ultrasonic clean quote. We provide a fixed price before any work begins.',
  },
  {
    question: 'Can M1 Pro, M2 Pro, and M3 Pro MacBook Pro models be repaired?',
    answer: 'Yes. We repair all M-series MacBook Pro models — M1 Pro/Max (2021), M2 Pro/Max (2022–2023), and M3 Pro/Max (2023). RAM and storage are soldered to the logic board on all M-series machines and cannot be upgraded after purchase, but battery, screen, keyboard, trackpad, port, and board-level repairs are all available.',
  },
  {
    question: 'What is logic board microsoldering and when is it needed?',
    answer: 'Logic board microsoldering is component-level repair on the MacBook Pro main circuit board. It is needed when a MacBook Pro has no power, no display, GPU faults, or USB-C charging failures that cannot be resolved by replacing the port board alone. We use professional rework stations and perform these repairs in-house — the alternative is a full board replacement costing significantly more.',
  },
  {
    question: 'My MacBook Pro has a black screen but the fans spin. What is wrong?',
    answer: 'A black screen with fans spinning usually indicates a display failure, a backlight fault, or a GPU-related logic board issue. We diagnose this by connecting an external display first — if the external works, the fault is in the screen or display cable. If the external also fails, we investigate the logic board. We run a free diagnostic before quoting.',
  },
  {
    question: 'How long does MacBook Pro repair take?',
    answer: 'Battery and port repairs typically take 1.5 to 3 hours. Screen replacement takes 2 to 4 hours depending on model. Keyboard replacement takes 2 to 4 hours. Logic board and liquid damage repairs take 3 to 5 business days as they involve component-level diagnosis and sourcing. We give you a specific timeline when you drop your machine in.',
  },
  {
    question: 'Is the MacBook Pro butterfly keyboard covered under any warranty?',
    answer: 'Apple ran a keyboard service programme for affected butterfly keyboard MacBook Pro models (2016–2019) — this programme has now ended. If your butterfly keyboard has failed, we replace it with the full keyboard assembly. We also replace keyboards on all other MacBook Pro models. Our 12-month warranty covers all keyboard repairs.',
  },
  {
    question: 'Do you offer a warranty on MacBook Pro repairs?',
    answer: 'Yes — all repairs carry a 12-month ZA Support warranty on parts and labour. If the same fault reoccurs within 12 months, we fix it at no charge. This applies to all repairs including screen, battery, keyboard, trackpad, port, and logic board work.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Pro Repair Johannesburg',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: { '@type': 'City', name: 'Johannesburg' },
  description: 'MacBook Pro repair in Johannesburg. Battery, screen, keyboard, logic board microsoldering, liquid damage. M1 Pro/Max, M2 Pro/Max, M3 Pro/Max and Intel models.',
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: '950',
    highPrice: '12000',
    priceCurrency: 'ZAR',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'MacBook Pro Repair', item: 'https://zasupport.com/macbook-pro-repair' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function MacBookProRepairPage() {
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
              MacBook Pro Repair<br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-8">
              Battery, screen, keyboard, logic board microsoldering, and liquid damage repair for all MacBook Pro models — M1 Pro/Max, M2 Pro/Max, M3 Pro/Max, and Intel. Hyde Park specialists. No Fix No Fee.
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
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4 text-center" style={{ fontFamily: 'Syne, sans-serif' }}>MacBook Pro Repairs We Do</h2>
          <p className="text-[#7A9E98] text-center mb-12 text-sm">Every MacBook Pro fault — from battery to logic board microsoldering. Same-day diagnosis, fixed pricing, 12-month warranty.</p>
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
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8 text-center" style={{ fontFamily: 'Syne, sans-serif' }}>All MacBook Pro Models Supported</h2>
          <div className="glass-card p-6">
            {models.map(({ name, note }, i) => (
              <div key={name} className={`flex justify-between items-center py-3 ${i < models.length - 1 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}>
                <span className="text-[#7A9E98] text-sm">{name}</span>
                <span className="text-xs text-[#0FEA7A] bg-[rgba(15,234,122,0.1)] px-2 py-0.5 rounded-full">{note}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 glass-card p-4 border border-[rgba(15,234,122,0.15)]">
            <p className="text-[#0FEA7A] font-semibold text-sm mb-1">Logic Board Microsoldering</p>
            <p className="text-[#7A9E98] text-xs">MacBook Pro logic board repair is available for all models listed above. No-power, no-display, GPU fault, and USB-C charging failures are all repaired in-house. Component-level work — not full board replacement.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="MacBook Pro Repair — FAQs" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>MacBook Pro Needs a Repair?</h2>
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
