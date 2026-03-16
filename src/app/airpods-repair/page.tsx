import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, MessageCircle, AlertTriangle } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'AirPods Repair Johannesburg | Battery & Charging Case | ZA Support',
  description:
    'AirPods repair in Johannesburg. Battery service, charging case replacement, deep cleaning. One AirPod dead, case not charging, connection dropout, we fix it. Hyde Park.',
  keywords: [
    'airpods repair johannesburg',
    'airpods not charging',
    'airpods one side not working',
    'airpods battery replacement johannesburg',
    'airpods charging case repair johannesburg',
    'airpods cleaning johannesburg',
    'airpods pro repair johannesburg',
  ],
  alternates: { canonical: 'https://zasupport.com/airpods-repair' },
};

const faqs = [
  {
    question: 'Why is only one of my AirPods working?',
    answer:
      'One AirPod going silent is one of the most common AirPods faults. The most frequent causes are a dead or degraded battery in that ear, a blocked mesh speaker grille caused by earwax or debris, or a firmware pairing fault. We start with a deep clean and battery health check. If the battery is the issue, we replace it. If the grille is blocked, we clear it with a proper ultrasonic clean. Most one-sided faults are resolved within a day.',
  },
  {
    question: 'Why are my AirPods not charging in the case?',
    answer:
      'AirPods charge via metal contact pins inside the case. These pins corrode, accumulate earwax, and bend slightly over time, any of which breaks the charging circuit. We clean the charging contacts on both the AirPods and the case interior. If the case battery is dead or the charging circuitry has failed, we assess whether a case replacement is more cost-effective than a board-level repair.',
  },
  {
    question: 'Can you replace AirPods batteries?',
    answer:
      'Yes, for AirPods 2nd and 3rd generation and AirPods Pro 1st generation. AirPods Pro 2nd generation (USB-C and Lightning) have a significantly more compact internal design with the battery directly bonded to the driver assembly, these are extremely difficult to service without damaging the acoustic components. We assess Pro 2nd gen on a case-by-case basis and will be upfront if the repair risk outweighs the cost.',
  },
  {
    question: 'Do you repair AirPods Pro?',
    answer:
      'AirPods Pro 1st generation (2019), yes. We handle battery replacement, cleaning, and charging contact repairs. AirPods Pro 2nd generation (2022 and later, with H2 chip) are a different story. The internal construction is considerably more compact and the battery is not designed to be separated without high risk of damaging the noise-cancellation drivers or tearing the flex cable. We will assess them, but we set expectations honestly before attempting any invasive repair on Pro 2nd gen.',
  },
  {
    question: 'How long does AirPods repair take?',
    answer:
      'Deep cleaning takes 2–4 hours and is done same day. Battery replacement takes 1–2 days depending on parts availability. Charging case assessment and contact cleaning is typically same day. Case replacement (if we have stock) takes 1–2 days. We confirm timeline at assessment.',
  },
  {
    question: 'My AirPods keep disconnecting. Is that a repair issue?',
    answer:
      'Intermittent connection dropout is usually a software or firmware issue first, try unpairing from all devices, resetting the AirPods by holding the case button for 15 seconds until the LED flashes amber, then re-pairing. If dropout continues after a full reset, it may indicate a degraded battery (low voltage causes Bluetooth instability), a dirty charging case causing incomplete charges, or hardware failure in the Bluetooth antenna. Bring them in, we diagnose at no charge before quoting.',
  },
];

const repairServices = [
  {
    title: 'Battery Service, Per Ear',
    models: 'AirPods Gen 2, Gen 3 | AirPods Pro Gen 1',
    note: 'AirPods Pro Gen 2: assessment required, very complex internal construction.',
  },
  {
    title: 'Charging Case Replacement',
    models: 'AirPods Gen 2, Gen 3, AirPods Pro Gen 1 & 2',
    note: 'Case only, your AirPods retained. MagSafe cases quoted separately.',
  },
  {
    title: 'Deep Clean Service',
    models: 'All AirPods models',
    note: 'Speaker mesh, charging contacts, case interior. Restores audio and charging in many cases.',
  },
  {
    title: 'Charging Contact Repair',
    models: 'All AirPods models',
    note: 'Corroded or bent contact pins cleaned or restored. Often resolves intermittent charging.',
  },
];

const modelSupport = [
  { model: 'AirPods Gen 1 (2016)', battery: 'Assessment', note: 'Older design, assessment first' },
  { model: 'AirPods Gen 2 (2019)', battery: 'Available', note: 'Standard' },
  { model: 'AirPods Gen 3 (2021)', battery: 'Available', note: 'Standard' },
  { model: 'AirPods Pro Gen 1 (2019)', battery: 'Available', note: 'Standard' },
  { model: 'AirPods Pro Gen 2 (2022–2024)', battery: 'Assessment only', note: 'Very high complexity, honest limitations apply' },
  { model: 'AirPods Max', battery: '—', note: 'Cleaning only, battery not currently offered' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'AirPods Repair Johannesburg',
  description:
    'AirPods repair in Johannesburg. Battery service, charging case replacement, and deep cleaning. AirPods Gen 2 and 3, AirPods Pro Gen 1. Hyde Park.',
  provider: {
    '@type': 'LocalBusiness',
    name: SITE.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1 Hyde Lane, Second Floor, Office E2004',
      addressLocality: 'Hyde Park, Johannesburg',
      addressRegion: 'Gauteng',
      postalCode: '2196',
      addressCountry: 'ZA',
    },
    telephone: CONTACT.phoneTel,
    url: 'https://zasupport.com',
  },
  areaServed: 'Johannesburg',
  offers: [
    { '@type': 'Offer', name: 'AirPods Battery Service (per ear)' },
    { '@type': 'Offer', name: 'AirPods Charging Case Replacement' },
    { '@type': 'Offer', name: 'AirPods Deep Clean' },
    { '@type': 'Offer', name: 'AirPods Charging Contact Repair' },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: SITE.rating,
    reviewCount: '120',
    bestRating: '5',
    worstRating: '1',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'AirPods Repair', item: 'https://zasupport.com/airpods-repair' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function AirPodsRepairPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      {/* Hero */}
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'AirPods Repair' }]} />
          <div className="mt-8 max-w-4xl">
            <p className="text-[#0FEA7A] font-mono text-sm tracking-widest uppercase mb-4">
              Hyde Park, Johannesburg
            </p>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              AirPods Repair Johannesburg
              <br />
              <span className="text-[#0FEA7A]">Battery, Case & Cleaning.</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              One AirPod dead, case not charging, or sound muffled by earwax? Battery service, charging case replacement, and deep cleaning, assessment fee (R899 ex VAT) before any work.
            </p>
            <p className="text-[#7A9E98] mb-8 max-w-3xl">
              Assessment: R899 ex VAT. Assessment: R899 ex VAT. Hyde Park, Johannesburg.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp Us
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-extrabold text-[#E8F4F1] mb-4 text-center"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            AirPods Repair Services
          </h2>
          <p className="text-[#7A9E98] text-center mb-10 max-w-2xl mx-auto">
            Starting prices for the most common AirPods faults. Exact quote after assessment fee (R899 ex VAT).
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {repairServices.map((service) => (
              <div key={service.title} className="glass-card p-6">
                <h3
                  className="text-[#E8F4F1] font-bold text-xl mb-1"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  {service.title}
                </h3>
                <p className="text-[#7A9E98] text-xs mb-3">{service.models}</p>
                {service.note && (
                  <p className="text-[#7A9E98] text-xs italic border-t border-[rgba(15,234,122,0.1)] pt-3 mt-3">
                    {service.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AirPods Pro Gen 2 warning */}
      <section className="py-12 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[rgba(245,166,35,0.08)] border border-[rgba(245,166,35,0.25)] rounded-2xl p-6 flex gap-4">
            <AlertTriangle className="w-6 h-6 text-[#F5A623] flex-shrink-0 mt-0.5" />
            <div>
              <h3
                className="text-[#F5A623] font-bold mb-2"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                AirPods Pro Gen 2, Honest Expectations
              </h3>
              <p className="text-[#7A9E98] text-sm leading-relaxed">
                AirPods Pro 2nd generation (2022 and later) are significantly more difficult to service than earlier
                models. The battery is directly bonded to the driver assembly, and the internal clearances are extremely
                tight. Separating the components without damaging the active noise-cancellation drivers or tearing the
                flex cables requires specialist equipment and carries real risk. We assess Pro 2nd gen thoroughly before
                quoting, and we will tell you clearly if the repair risk is too high relative to the cost of replacement.
                We would rather be honest than take your money for a repair we cannot stand behind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing by model */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-extrabold text-[#E8F4F1] mb-4"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Prices by Model
          </h2>
          <p className="text-[#7A9E98] mb-8">
            Starting prices. Final quote confirmed at assessment fee (R899 ex VAT).
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[rgba(15,234,122,0.15)]">
                  <th className="text-left text-[#7A9E98] font-medium pb-3 pr-4">Model</th>
                  <th className="text-left text-[#7A9E98] font-medium pb-3 pr-4">Battery Service</th>
                  <th className="text-left text-[#7A9E98] font-medium pb-3">Note</th>
                </tr>
              </thead>
              <tbody>
                {modelSupport.map((row, i) => (
                  <tr
                    key={row.model}
                    className={`border-b border-[rgba(255,255,255,0.04)] ${i % 2 === 0 ? '' : 'bg-[rgba(15,234,122,0.02)]'}`}
                  >
                    <td className="text-[#E8F4F1] py-3 pr-4 font-medium">{row.model}</td>
                    <td className={`py-3 pr-4 font-semibold ${row.battery === '—' || row.battery === 'Assessment only' ? 'text-[#7A9E98]' : 'text-[#0FEA7A]'}`}>
                      {row.battery}
                    </td>
                    <td className="text-[#7A9E98] py-3 text-xs">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Common problems */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-extrabold text-[#E8F4F1] mb-8"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Common AirPods Problems We Fix
          </h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">
            Most AirPods faults fall into a small number of categories. Understanding which fault you have helps
            set expectations on whether a clean, a battery swap, or a case replacement will solve it.
          </p>
          <div className="space-y-4">
            {[
              {
                symptom: 'One AirPod not working or silent',
                fix: 'Battery dead or degraded on that ear, or mesh grille blocked, clean first, battery if needed',
              },
              {
                symptom: 'AirPods not charging in case',
                fix: 'Charging contact corrosion or earwax on pins, clean or contact pin repair',
              },
              {
                symptom: 'Battery draining in under 2 hours',
                fix: 'Battery replacement, AirPods batteries degrade to under 80% capacity within 1–2 years of heavy use',
              },
              {
                symptom: 'Muffled or distorted audio',
                fix: 'Speaker mesh blocked by earwax, deep clean resolves most audio degradation',
              },
              {
                symptom: 'AirPods keep disconnecting',
                fix: 'Reset AirPods first (hold case button 15s). If dropout continues: degraded battery or hardware fault',
              },
              {
                symptom: 'Case not holding charge',
                fix: 'Case battery degraded, case battery assessment or case replacement',
              },
              {
                symptom: 'Water or sweat damage',
                fix: 'Assessment required, AirPods Pro are rated IPX4 but not waterproof. Drying and contact clean often helps',
              },
              {
                symptom: 'AirPods not recognised by iPhone',
                fix: 'Pairing or firmware fault, full reset first, then hardware assessment if unresolved',
              },
            ].map((item) => (
              <div
                key={item.symptom}
                className="glass-card p-5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
              >
                <p className="text-[#E8F4F1] font-semibold sm:w-64 flex-shrink-0">{item.symptom}</p>
                <p className="text-[#7A9E98] text-sm">{item.fix}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why ZA Support */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-extrabold text-[#E8F4F1] mb-10 text-center"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Why ZA Support for AirPods?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Assessment: R899 ex VAT',
                desc: 'Cannot fix it? Assessment fee of R899 ex VAT applies. No assessment fee, no call-out charge.',
              },
              {
                title: 'Honest About Complexity',
                desc: 'AirPods Pro Gen 2 are genuinely difficult. We set expectations before we open anything, not after.',
              },
              {
                title: 'Deep Clean Included',
                desc: 'Every battery service includes a full clean of the mesh grilles and charging contacts. Most faults are cleaning faults.',
              },
              {
                title: 'Assessment: R899 ex VAT',
                desc: 'Bring them in. We inspect, test battery health, and quote. No charge if you decide not to proceed.',
              },
              {
                title: 'Same-Day Cleaning',
                desc: 'Deep clean service is done same day in most cases. Battery service takes 1–2 days.',
              },
              {
                title: 'Hyde Park, Johannesburg',
                desc: '1 Hyde Lane, Hyde Park. Convenient for Sandton, Rosebank, Parktown, and Northcliff.',
              },
            ].map((item) => (
              <div key={item.title} className="glass-card p-6">
                <h3
                  className="text-[#0FEA7A] font-bold text-base mb-2"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  {item.title}
                </h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="AirPods Repair Johannesburg, Common Questions" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2
              className="text-3xl font-extrabold text-[#E8F4F1] mb-3"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              AirPods Not Working? Bring Them In.
            </h2>
            <p className="text-[#7A9E98] mb-2">
              Battery service &nbsp;|&nbsp; Case replacement &nbsp;|&nbsp; Deep clean
            </p>
            <p className="text-[#7A9E98] mb-8">Assessment: R899 ex VAT. Assessment: R899 ex VAT. Hyde Park, Johannesburg.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp Us Now
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related links */}
      <section className="py-12 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#7A9E98] text-sm mb-4">Related Repairs</p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Apple Watch Repair', href: '/apple-watch-repair' },
              { label: 'iPhone Repair', href: '/iphone-repair' },
              { label: 'iPad Repair', href: '/ipad-repair' },
              { label: 'Apple Accessories Repair', href: '/accessories-repair' },
              { label: 'Apple Repair Johannesburg', href: '/apple-repair' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-1 text-sm text-[#7A9E98] hover:text-[#0FEA7A] transition-colors"
              >
                {link.label} <ArrowRight className="w-3 h-3" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
