import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Shield, CheckCircle } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Pro Liquid Damage Repair Johannesburg | From R 3,500 | ZA Support',
  description:
    'MacBook Pro liquid damage repair in Johannesburg from R 3,500. All M-series and Intel models. Free assessment, No Fix No Fee, 12-month warranty. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/liquid-damage/macbook-pro' },
};

const faqs = [
  {
    question: 'Can a MacBook Pro be saved after liquid damage?',
    answer:
      'In the majority of cases, yes — especially when the device is brought in quickly. MacBook Pros have reasonably accessible logic boards, and our ultrasonic cleaning process is highly effective at removing corrosion before permanent damage sets in. Success rates are significantly higher when the device is brought in within 24 hours.',
  },
  {
    question: 'Which MacBook Pro models do you repair for liquid damage?',
    answer:
      'All of them — from the A1706 and A1708 (2016) through to the current M3 Pro and M3 Max models (A2991, A2992). This includes all Intel Touch Bar and non-Touch Bar models, M1 Pro, M1 Max, M2 Pro, M2 Max, M3 Pro, and M3 Max variants. If it is a MacBook Pro, we repair it.',
  },
  {
    question: 'What is the most common failure point after a MacBook Pro gets wet?',
    answer:
      'The USB-C/Thunderbolt board is often the first component to fail after liquid exposure, as it sits directly above the ventilation area and is electrically active during charging. The keyboard and trackpad assembly are also vulnerable. On more severe cases, corrosion reaches the main logic board causing no-power or no-display faults.',
  },
  {
    question: 'My MacBook Pro still works after getting wet. Should I be concerned?',
    answer:
      'Yes. Liquid damage is progressive. The corrosion products left behind after liquid exposure continue to develop even after the device appears dry. Many clients bring in their MacBook Pro weeks after a spill, when it suddenly stops working. Early intervention is always cheaper and more successful.',
  },
  {
    question: 'Does liquid damage void my AppleCare+ warranty?',
    answer:
      'Standard AppleCare+ does not cover accidental liquid damage without additional coverage. Apple\'s accidental damage coverage (available with AppleCare+) may cover liquid damage with a service fee. ZA Support\'s own 12-month warranty covers all components we repair, regardless of the original cause of damage.',
  },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Liquid Damage Repair', item: 'https://zasupport.com/liquid-damage' },
    { '@type': 'ListItem', position: 3, name: 'MacBook Pro', item: 'https://zasupport.com/liquid-damage/macbook-pro' },
  ],
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Pro Liquid Damage Repair Johannesburg',
  description: 'Professional MacBook Pro liquid damage repair from R 3,500. All models. Free assessment. No Fix No Fee.',
  provider: { '@type': 'LocalBusiness', name: 'ZA Support', telephone: CONTACT.phoneTel },
  offers: { '@type': 'Offer', price: '3500', priceCurrency: 'ZAR', priceValidUntil: '2027-12-31' },
};

export default function MacBookProLiquidDamagePage() {
  return (
    <>
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Liquid Damage Repair', href: '/liquid-damage' },
            { label: 'MacBook Pro' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              MacBook Pro Liquid Damage
              <br />
              <span className="text-[#0FEA7A]">Repair Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-6 max-w-3xl leading-relaxed">
              Expert MacBook Pro liquid damage repair from R 3,500. All M-series and Intel models.
              Free assessment, No Fix No Fee, 12-month warranty. Hyde Park, Johannesburg.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                <Phone className="w-5 h-5" />
                Call {CONTACT.phone}
              </a>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                Free Assessment <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
                MacBook Pro Models We Repair
              </h2>
              <p className="text-[#7A9E98] leading-relaxed mb-6">
                We repair all MacBook Pro models for liquid damage — from the 2016 redesign through to the latest
                M3 Pro and M3 Max. Our engineers are familiar with every board revision, every failure mode, and
                every nuance of each generation.
              </p>
              <div className="space-y-3">
                {[
                  'MacBook Pro 13" (A1706, A1708) — 2016–2017',
                  'MacBook Pro 15" (A1707) — 2016–2017',
                  'MacBook Pro 13" (A1989, A1990) — 2018–2019',
                  'MacBook Pro 16" (A2141) — 2019',
                  'MacBook Pro 13" (A2251, A2289, A2338) — 2020',
                  'MacBook Pro 14" M1 Pro/Max (A2442) — 2021',
                  'MacBook Pro 16" M1 Pro/Max (A2485) — 2021',
                  'MacBook Pro 13" M2 (A2338) — 2022',
                  'MacBook Pro 14" M2 Pro/Max (A2779) — 2023',
                  'MacBook Pro 16" M2 Pro/Max (A2780) — 2023',
                  'MacBook Pro 14" M3 Pro/Max (A2992) — 2023–2024',
                  'MacBook Pro 16" M3 Pro/Max (A2991) — 2023–2024',
                ].map((model) => (
                  <div key={model} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-[#0FEA7A] flex-shrink-0" />
                    <span className="text-[#7A9E98] text-sm">{model}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
                Common Failure Points
              </h2>
              <div className="space-y-4">
                {[
                  { title: 'USB-C / Thunderbolt Board', desc: 'First component to fail in most liquid damage cases. Controls charging, data, and display output.' },
                  { title: 'Keyboard & Trackpad', desc: 'Butterfly and scissor-switch keyboards are both vulnerable to liquid intrusion from the top.' },
                  { title: 'Logic Board Traces', desc: 'Corrosion on PCB copper traces causes open circuits — no power, no display, or random restarts.' },
                  { title: 'RAM (Intel Models)', desc: 'Intel MacBook Pros with removable RAM can suffer pin corrosion on RAM slots.' },
                  { title: 'Touch Bar / Touch ID', desc: 'The Touch Bar flex cable and controller chip are vulnerable on 2016–2021 Touch Bar models.' },
                  { title: 'Speaker Assemblies', desc: 'MacBook Pro speakers can be permanently damaged by liquid and distort audio. Replaceable.' },
                ].map((item) => (
                  <div key={item.title} className="glass-card p-4">
                    <h3 className="text-[#E8F4F1] font-semibold mb-1">{item.title}</h3>
                    <p className="text-[#7A9E98] text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 glass-card p-8">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
              Pricing Guide
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-4">
              {[
                { label: 'Assessment', price: 'Free', note: 'Always. No obligation.' },
                { label: 'Standard Repair', price: 'From R 3,500', note: 'Cleaning + minor component repair' },
                { label: 'Major Board Repair', price: 'From R 5,500', note: 'Microsoldering + chip replacement' },
              ].map((item) => (
                <div key={item.label} className="text-center p-4 bg-[rgba(15,234,122,0.05)] rounded-xl border border-[rgba(15,234,122,0.1)]">
                  <p className="text-[#7A9E98] text-sm mb-1">{item.label}</p>
                  <p className="text-[#0FEA7A] text-2xl font-extrabold mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>{item.price}</p>
                  <p className="text-[#7A9E98] text-xs">{item.note}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-[#0FEA7A] flex-shrink-0" />
              <p className="text-[#7A9E98] text-sm">No Fix No Fee — if we cannot repair your MacBook Pro, you pay nothing for the attempt. 12-month warranty on all repairs.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="MacBook Pro Liquid Damage — FAQs" />
        </div>
      </section>

      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-[#E8F4F1] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>Related Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: 'MacBook Air Liquid Damage', href: '/liquid-damage/macbook-air', price: 'From R 2,500' },
              { title: 'Logic Board Repair', href: '/logic-board-repair', price: 'From R 1,800' },
              { title: 'Liquid Damage Hub', href: '/liquid-damage', price: 'All Devices' },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="glass-card p-4 flex items-center justify-between group">
                <div>
                  <p className="text-[#E8F4F1] font-semibold text-sm">{item.title}</p>
                  <p className="text-[#0FEA7A] text-xs mt-0.5">{item.price}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#7A9E98] group-hover:text-[#0FEA7A] transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
              MacBook Pro Liquid Damage? Act Now.
            </h2>
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
