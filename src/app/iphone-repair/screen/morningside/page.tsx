import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, ArrowRight, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'iPhone Screen Repair Morningside | ZA Support Hyde Park',
  description: 'iPhone screen repair for Morningside clients. OLED and LCD screens, all models. We collect from Morningside. Same-day repair available. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/iphone-repair/screen/morningside' },
};

const models = [
  { model: 'iPhone 15 / 15 Pro / 15 Pro Max', desc: 'OLED Super Retina XDR display repair. Titanium frame models require specialist handling.' },
  { model: 'iPhone 14 / 14 Pro / 14 Pro Max', desc: 'OLED and Dynamic Island display repair. ProMotion on Pro models.' },
  { model: 'iPhone 13 / 13 Pro / 13 Pro Max', desc: 'OLED Super Retina XDR. ProMotion on Pro models. All screen conditions repaired.' },
  { model: 'iPhone 12 / 12 Pro / 12 Pro Max', desc: 'OLED display repair. MagSafe compatibility preserved post-repair.' },
  { model: 'iPhone 11 / XR', desc: 'Liquid Retina LCD display repair. Most affordable screen repair tier.' },
  { model: 'iPhone SE (all generations)', desc: 'LCD Retina display repair. Budget-conscious repair option with full functionality.' },
];

const faqs = [
  {
    question: 'Do you collect iPhones for screen repair from Morningside?',
    answer: 'We collect from Morningside, Sandton, and the surrounding Johannesburg North area. WhatsApp 064 529 5863 to arrange same-day collection from Morningside.',
  },
  {
    question: 'How far is Morningside from your Hyde Park workshop?',
    answer: 'Approximately 8 km — roughly 10–15 minutes by car. Morningside is approximately 8 km from our Hyde Park workshop — one of our closest collection areas.',
  },
  {
    question: 'How long does iPhone screen repair take?',
    answer: 'Most iPhone screen repairs are completed within 1–2 hours of arrival at our Hyde Park workshop. We carry stock of common iPhone screen sizes. If collection is arranged from Morningside, same-day return is typically available.',
  },
  {
    question: 'Do you use genuine Apple screens?',
    answer: 'We use high-quality OLED and LCD screens that meet or exceed Apple specifications for brightness, colour accuracy, and touch sensitivity. We do not use low-grade aftermarket panels. Every screen repair includes a written warranty.',
  },
  {
    question: 'Will Touch ID or Face ID still work after screen repair?',
    answer: 'Yes. Touch ID (home button models) and Face ID (Face ID models) are not affected by screen replacement. We do not touch the biometric components during screen repair.',
  },
  {
    question: 'How much does iPhone screen repair cost for Morningside clients?',
    answer: 'Cost varies by model. iPhone 11/XR screens are the most affordable; iPhone 15 Pro Max OLED screens are at the higher end. WhatsApp us for a model-specific quote — pricing confirmed before any work proceeds.',
  },
  {
    question: 'My iPhone screen works but is cracked — do I need to repair it?',
    answer: 'Cracked glass can allow liquid to enter, worsen over time, and cause touch failures. We recommend repair before the crack spreads to the OLED layer below, which significantly increases repair cost.',
  },
  {
    question: 'Do you repair iPads and MacBooks from Morningside as well?',
    answer: 'Yes. We repair MacBooks, iPads, Apple Watches, AirPods, and iMacs in addition to iPhones. Collection from Morningside covers all Apple device types.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'iPhone Screen Repair Morningside',
  description: 'iPhone screen repair for Morningside clients. All models. Collection and return service.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Place', name: 'Morningside' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'iPhone Repair', item: 'https://zasupport.com/iphone-repair' },
    { '@type': 'ListItem', position: 3, name: 'Screen Repair', item: 'https://zasupport.com/iphone-repair/screen' },
    { '@type': 'ListItem', position: 4, name: 'Morningside', item: 'https://zasupport.com/iphone-repair/screen/morningside' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function IPhoneScreenRepairMorningsidePage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'iPhone Repair', href: '/iphone-repair' },
            { label: 'Screen Repair', href: '/iphone-repair/screen' },
            { label: 'Morningside' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              iPhone Screen Repair
              <br /><span className="text-[#0FEA7A]">Morningside</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              iPhone screen repair for Morningside clients. All models from iPhone SE to iPhone 15 Pro Max. OLED and LCD screens. Collection from Morningside — approx 10–15 minutes to Hyde Park.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>Hyde Park, Johannesburg | Collection from Morningside | Same-day repair available</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {['All iPhone Models', 'Written Warranty', 'Same-Day Repair', 'Collection Available'].map((l) => (
                <div key={l} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <CheckCircle className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{l}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('IPH-SCR-MORNINGSIDE', 'iphone-repair')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all" >
                WhatsApp for Quote
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all" target="_blank" rel="noopener noreferrer">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link href="/iphone-repair/screen" className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all">
                All iPhone Screen Repair <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">iPhone Models We Repair for Morningside Clients</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">Morningside is approximately 8 km from our Hyde Park workshop — one of our closest collection areas. We carry stock of common screen sizes. Less common models are ordered and typically available within 1–2 business days.</p>
          <div className="space-y-4">
            {models.map((m) => (
              <div key={m.model} className="glass-card p-5">
                <h3 className="text-[#E8F4F1] font-bold mb-2">{m.model}</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title={`iPhone Screen Repair Morningside — Common Questions`} />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Cracked iPhone in Morningside? We Collect.</h2>
            <p className="text-[#7A9E98] mb-6">We collect from Morningside, Sandton, and the surrounding Johannesburg North area.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('IPH-SCR-MORNINGSIDE', 'iphone-repair')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all" >
                WhatsApp for Quote
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all" target="_blank" rel="noopener noreferrer">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
