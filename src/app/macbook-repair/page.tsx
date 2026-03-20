import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Shield, Clock, BadgeCheck, Star, Battery, Monitor, Keyboard, Cpu, Droplets, Wrench } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import { CONTACT, SITE } from '@/lib/constants';

const REVIEWS = { rating: SITE.rating, count: SITE.reviewCount };

export const metadata: Metadata = {
  title: 'MacBook Repair Johannesburg | ZA Support | All Models Fixed',
  description:
    'MacBook repair in Johannesburg. Battery, screen, keyboard, liquid damage, logic board component-level repair. All M-series and Intel models. Assessment: from R599. Hyde Park. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/macbook-repair' },
  keywords: ['macbook repair johannesburg', 'mac repair near me johannesburg', 'macbook repair sandton', 'apple repair johannesburg', 'macbook battery replacement johannesburg', 'macbook screen repair johannesburg'],
  openGraph: {
    title: 'MacBook Repair Johannesburg | ZA Support | All Models Fixed',
    description: 'MacBook repair in Johannesburg. Battery, screen, keyboard, liquid damage, logic board component-level repair. Assessment: from R599.',
    url: 'https://zasupport.com/macbook-repair',
    siteName: 'ZA Support',
    type: 'website',
  },
};

const services = [
  {
    icon: Battery,
    title: 'Battery Replacement',
    description: 'Restore battery life to 100%. MacBook Air and MacBook Pro, all models.',
    href: '/macbook-repair/battery',
    accent: 'text-green-400',
  },
  {
    icon: Monitor,
    title: 'Screen Replacement',
    description: 'Cracked Retina display, dead pixels, backlight failure. Genuine quality panels.',
    href: '/macbook-repair/screen',
    accent: 'text-blue-400',
  },
  {
    icon: Keyboard,
    title: 'Keyboard Replacement',
    description: 'Sticky keys, broken keys, water-damaged keyboard. MacBook Pro butterfly to Magic keyboard.',
    href: '/macbook-repair/keyboard',
    accent: 'text-purple-400',
  },
  {
    icon: Droplets,
    title: 'Liquid Damage Repair',
    description: 'Board-level ultrasonic cleaning and component repair. MacBook Air & Pro specialists.',
    href: '/liquid-damage',
    accent: 'text-cyan-400',
  },
  {
    icon: Cpu,
    title: 'Logic Board Repair',
    description: 'Expert component-level repair for no-power, no-display, USB-C failure and GPU faults.',
    href: '/logic-board-repair',
    accent: 'text-orange-400',
  },
  {
    icon: Wrench,
    title: 'Port & Charging Repair',
    description: 'MagSafe, USB-C and Thunderbolt port repair. MacBook not charging? We fix it.',
    href: '/macbook-repair/charging-port',
    accent: 'text-red-400',
  },
  {
    icon: Wrench,
    title: 'Trackpad Repair',
    description: 'Trackpad not clicking, cursor jumping, raised trackpad from swollen battery. All models.',
    href: '/macbook-repair/trackpad',
    accent: 'text-yellow-400',
  },
  {
    icon: Wrench,
    title: 'Data Recovery',
    description: 'Recover files from failed drives, water-damaged Macs, and non-booting MacBooks.',
    href: '/macbook-repair/data-recovery',
    accent: 'text-pink-400',
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
    answer: 'MacBook repair costs depend on the fault type and model. We provide a assessment fee (from R599) and a detailed written quote before any work begins. Contact us for a quote specific to your model and fault.',
  },
  {
    question: 'Do you repair M-series MacBooks (M1, M2, M3)?',
    answer: 'Yes. We repair all Apple Silicon MacBook models including M1, M2, and M3 variants of both MacBook Air and MacBook Pro. Some repairs differ slightly for M-series (RAM and storage are soldered) but battery, screen, keyboard, port, and logic board repairs are all available.',
  },
  {
    question: 'How long does MacBook repair take?',
    answer: 'Battery replacement: 60–90 minutes. Screen replacement: 2–4 hours depending on model. Keyboard replacement: 2–3 hours. Logic board and liquid damage repairs typically take 3–5 business days as they involve component-level diagnosis and component-level repair.',
  },
  {
    question: 'Is there a Assessment: from R599 policy?',
    answer: 'Yes. If we assess your MacBook and cannot repair it, or the repair is not cost-effective, assessment fee of from R599 applies. We provide an honest prognosis and written quote before starting any work.',
  },
  {
    question: 'Do you offer a warranty on MacBook repairs?',
    answer: 'All MacBook repairs carry a warranty covering our workmanship and any components we replace. This does not cover subsequent physical damage or new unrelated faults.',
  },
  {
    question: 'Can you recover data from a damaged MacBook?',
    answer: 'In most cases, yes. For liquid-damaged or failed-to-boot MacBooks, data recovery is often possible before or alongside the repair. Modern Macs with Apple Silicon have encrypted storage, data is recoverable if the logic board is repaired, not in all cases of total board failure. We will advise you honestly after assessment.',
  },
  {
    question: 'Where are you located in Johannesburg?',
    answer: 'We are based at 1 Hyde Lane, Hyde Park, Johannesburg, 2196. Hyde Park is centrally located and easily accessible from Sandton, Rosebank, Illovo, Bryanston, and Parktown. We are open Monday to Friday 08:00 – 17:30 and Closed Saturdays. Free parking is available on site.',
  },
  {
    question: 'Do you repair MacBooks that other shops have refused?',
    answer: 'Yes. We specialise in component-level logic board component-level repair, which many repair shops cannot perform. If you have been told your MacBook is beyond repair or only Apple can fix it, bring it to us for a second opinion. We successfully repair boards that Apple quotes for full replacement.',
  },
  {
    question: 'What is the difference between MacBook Air and MacBook Pro repair costs?',
    answer: 'MacBook Pro repairs are typically more involved than MacBook Air repairs for equivalent faults. This is due to the higher component cost, the more complex construction of Pro models, and the additional time required for disassembly. Logic board repair pricing is fault-specific and model-specific, a assessment gives you the exact cost before any work starts.',
  },
  {
    question: 'Can you fix a MacBook that will not turn on at all?',
    answer: 'Yes. A MacBook that will not power on is one of the most common repairs we handle. Causes include a failed charging circuit, corrupted T2/Secure Enclave, blown power management IC, failed SSD, or liquid corrosion on the logic board. We diagnose the root cause at no charge and provide a written quote with options before any repair begins.',
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
  description: 'MacBook repair in Johannesburg, battery, screen, keyboard, liquid damage, logic board. All M-series and Intel models. Assessment: from R599.',
  offers: {
    '@type': 'AggregateOffer',
  },
};

const faqSchema = buildFaqSchema(faqs);

const macbookReviewSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://zasupport.com/#business',
  name: 'ZA Support',
  review: [
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Michael B.' },
      datePublished: '2026-02',
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'Brought my MacBook Pro 16-inch in for a battery replacement and keyboard issue. ZA Support had it back to me the same day. Transparent pricing, no hidden costs, and the warranty gives real peace of mind.',
      itemReviewed: {
        '@type': 'Service',
        name: 'MacBook Repair Johannesburg',
        provider: { '@type': 'LocalBusiness', name: 'ZA Support', url: 'https://zasupport.com' },
      },
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Thabo N.' },
      datePublished: '2026-01',
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'MacBook Air would not turn on. ZA Support diagnosed it as a failed charging IC and fixed it in 24 hours. The assessment meant I knew exactly what was wrong before committing to anything. Excellent service.',
      itemReviewed: {
        '@type': 'Service',
        name: 'MacBook Repair Johannesburg',
        provider: { '@type': 'LocalBusiness', name: 'ZA Support', url: 'https://zasupport.com' },
      },
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Lisa V.' },
      datePublished: '2026-03',
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'Used ZA Support for a screen replacement on my MacBook. Professional, fast, and fairly priced. They also spotted a swollen battery I did not know about and flagged it, saved me from a bigger problem later.',
      itemReviewed: {
        '@type': 'Service',
        name: 'MacBook Repair Johannesburg',
        provider: { '@type': 'LocalBusiness', name: 'ZA Support', url: 'https://zasupport.com' },
      },
    },
  ],
};

export default function MacBookRepairPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={macbookReviewSchema} />

      {/* Hero */}
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[rgba(15,234,122,0.1)] border border-[rgba(15,234,122,0.2)] rounded-full px-4 py-2 mb-6">
              <Star className="w-4 h-4 text-[#0FEA7A]" />
              <span className="text-[#0FEA7A] text-sm font-medium">{REVIEWS.rating} · {REVIEWS.count} reviews · Hyde Park, Johannesburg</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Repair<br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-8 max-w-2xl">
              Battery, screen, keyboard, liquid damage, logic board. All M-series and Intel MacBook Air and MacBook Pro models. Assessment: from R599 policy. up-to-3 year warranty.
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
              <span className="flex items-center gap-1.5"><BadgeCheck className="w-4 h-4 text-[#0FEA7A]" /> Up-to-3 Year Warranty</span>
              <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-[#0FEA7A]" /> Assessment: from R599</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#0FEA7A]" /> Same-day for most repairs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4 text-center">
            MacBook Repair <span className="text-[#0FEA7A]">Services</span>
          </h2>
          <p className="text-[#7A9E98] text-center mb-12 max-w-2xl mx-auto">
            From a dead battery to board-level component-level repair, every MacBook fault, one address.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="glass-card p-6 hover:border-[rgba(15,234,122,0.3)] transition-all group block"
              >
                <service.icon className={`w-8 h-8 ${service.accent} mb-4`} />
                <h3 className="text-lg font-bold text-[#E8F4F1] mb-2 group-hover:text-[#0FEA7A] transition-colors">{service.title}</h3>
                <p className="text-[#7A9E98] text-sm mb-4">{service.description}</p>
                <div className="flex items-center justify-end">
                  <ArrowRight className="w-4 h-4 text-[#0FEA7A] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Repair Services Table */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4 text-center">
            MacBook <span className="text-[#0FEA7A]">Repair Services</span>
          </h2>
          <p className="text-[#7A9E98] text-center mb-12 max-w-2xl mx-auto">
            All costs are confirmed after a assessment fee (from R599). Final cost is confirmed in writing before work begins.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.08)]">
                  <th className="text-[#E8F4F1] font-semibold py-3 pr-6">Repair Type</th>
                  <th className="text-[#E8F4F1] font-semibold py-3 pr-6">Models</th>
                  <th className="text-[#E8F4F1] font-semibold py-3">Turnaround</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(255,255,255,0.05)]">
                {[
                  { repair: 'Battery Replacement', models: 'MacBook Air & Pro', time: '60–90 min' },
                  { repair: 'Screen / Display', models: 'MacBook Air & Pro', time: '2–4 hrs' },
                  { repair: 'Keyboard Replacement', models: 'MacBook Air & Pro', time: '2–3 hrs' },
                  { repair: 'Liquid Damage', models: 'MacBook Air & Pro', time: '2–5 days' },
                  { repair: 'Logic Board Repair', models: 'MacBook Air & Pro', time: '2–5 days' },
                  { repair: 'Charging / Port', models: 'MacBook Air & Pro', time: '1–2 hrs' },
                  { repair: 'Trackpad Repair', models: 'MacBook Air & Pro', time: '2–4 hrs' },
                  { repair: 'Data Recovery', models: 'MacBook Air & Pro', time: '1–3 days' },
                ].map((row) => (
                  <tr key={row.repair} className="hover:bg-[rgba(15,234,122,0.03)] transition-colors">
                    <td className="text-[#E8F4F1] font-medium py-3 pr-6">{row.repair}</td>
                    <td className="text-[#7A9E98] py-3 pr-6">{row.models}</td>
                    <td className="text-[#7A9E98] py-3">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[#7A9E98] text-xs text-center mt-6">
            Final cost confirmed after assessment fee (from R599). All repairs include up-to-3 year warranty.
          </p>
          <div className="mt-8 p-5 bg-[rgba(15,234,122,0.05)] border border-[rgba(15,234,122,0.15)] rounded-xl text-center">
            <p className="text-[#E8F4F1] text-sm">
              Looking for component-level{' '}
              <Link href="/logic-board-repair" className="text-[#0FEA7A] font-semibold hover:underline">
                logic board repair
              </Link>
              ? We repair the chips other shops replace, at a fraction of Apple&apos;s board replacement quote.
            </p>
          </div>
        </div>
      </section>

      {/* Models */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4 text-center">
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

      {/* Model-specific hubs */}
      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-[#E8F4F1] mb-4 text-center">Repair by MacBook Model</h2>
          <p className="text-[#7A9E98] text-center text-sm mb-8">See model-specific pricing, common faults, and repair options.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <Link href="/macbook-air-repair" className="glass-card p-6 flex items-center justify-between group hover:border-[rgba(15,234,122,0.35)] transition-all">
              <div>
                <div className="text-[#E8F4F1] font-bold group-hover:text-[#0FEA7A] transition-colors">MacBook Air Repair</div>
                <div className="text-[#7A9E98] text-xs mt-1">M1, M2, M3 and Intel, all years</div>
              </div>
              <ArrowRight className="w-5 h-5 text-[#0FEA7A] opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link href="/macbook-pro-repair" className="glass-card p-6 flex items-center justify-between group hover:border-[rgba(15,234,122,0.35)] transition-all">
              <div>
                <div className="text-[#E8F4F1] font-bold group-hover:text-[#0FEA7A] transition-colors">MacBook Pro Repair</div>
                <div className="text-[#7A9E98] text-xs mt-1">M1–M3 Pro/Max and Intel, all years</div>
              </div>
              <ArrowRight className="w-5 h-5 text-[#0FEA7A] opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: BadgeCheck, title: SITE.repairsCount + ' Repairs', sub: 'MacBook, iPhone and iPad' },
              { icon: Star, title: REVIEWS.rating + ' Stars', sub: REVIEWS.count + ' Google reviews' },
              { icon: Shield, title: 'Warranty', sub: 'On every repair, every component' },
            ].map((item) => (
              <div key={item.title} className="glass-card p-8">
                <item.icon className="w-10 h-10 text-[#0FEA7A] mx-auto mb-4" />
                <div className="text-2xl font-extrabold text-[#E8F4F1] mb-1">{item.title}</div>
                <div className="text-[#7A9E98] text-sm">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="MacBook Repair, FAQs" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">MacBook Giving You Problems?</h2>
            <p className="text-[#7A9E98] mb-6">Assessment: from R599. Honest quote. Assessment: from R599. Hyde Park, Johannesburg.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <a href="/api/wa?service=macbook-repair&page=/macbook-repair" className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
