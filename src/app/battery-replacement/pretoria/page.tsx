import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, ArrowRight, MapPin, Battery } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Battery Replacement Pretoria | ZA Support Hyde Park',
  description: 'MacBook battery replacement for Pretoria clients. Apple-spec batteries, same-day service. We collect from Pretoria. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/battery-replacement/pretoria' },
};

const symptoms = [
  { title: 'Battery Not Charging', desc: 'MacBook plugged in but battery percentage does not increase. Faulty battery cell, charging IC, or port issue diagnosed and resolved.' },
  { title: 'Swollen Battery', desc: 'Trackpad lifting or case separating indicates a swollen battery. Safety issue — replace immediately. We remove and dispose of swollen cells safely.' },
  { title: 'Short Battery Life', desc: 'MacBook running for 2 hours or less on a full charge. Worn cells lose capacity. A new battery restores full runtime.' },
  { title: 'Service Battery Warning', desc: 'macOS showing "Service Recommended" or "Replace Now". Confirmed degradation — replacement advised.' },
  { title: 'Sudden Shutdowns', desc: 'MacBook shuts down unexpectedly at 20–40% battery. Failing cells cannot deliver consistent voltage under load.' },
  { title: 'Battery Health Below 80%', desc: 'Apple considers batteries below 80% health to be at end of useful life. Replacement restores full capacity.' },
];

const faqs = [
  {
    question: 'Do you collect MacBooks for battery replacement from Pretoria?',
    answer: 'We collect from Pretoria and surrounding areas including Hatfield, Brooklyn, Waterkloof, Centurion, and Midrand. Collection, battery replacement at Hyde Park, and return once complete. WhatsApp 064 529 5863 to arrange.',
  },
  {
    question: 'How far is Pretoria from your Hyde Park workshop?',
    answer: 'Approximately 55 km — roughly 40–55 minutes by car. Pretoria clients benefit from our Hyde Park-based component-level repair facility. Same assessment standard. Same No Fix No Fee guarantee.',
  },
  {
    question: 'How long does a MacBook battery replacement take?',
    answer: 'Most MacBook battery replacements are completed same-day or within 24 hours. We carry stock of common battery sizes for MacBook Air and MacBook Pro models.',
  },
  {
    question: 'What batteries do you use?',
    answer: 'Apple-specification replacement batteries meeting or exceeding OEM specifications for cycle life and capacity. Every replacement includes a written warranty.',
  },
  {
    question: 'My MacBook battery is swollen — is it safe to use?',
    answer: 'No. A swollen battery is a safety hazard. Do not use the Mac until the battery is replaced. Contact us for same-day collection from Pretoria.',
  },
  {
    question: 'How do I know if my battery needs replacing?',
    answer: 'Check System Information > Power > Cycle Count. Above 800–1000 cycles (model dependent) indicates a worn battery. macOS also shows "Service Recommended" when health drops below Apple\'s threshold.',
  },
  {
    question: 'How much does MacBook battery replacement cost for Pretoria clients?',
    answer: 'Cost varies by model. Contact us via WhatsApp for a quote — pricing is confirmed before any work proceeds. Assessment from R599 if a full diagnostic is also needed.',
  },
  {
    question: 'Do you offer a warranty on battery replacements?',
    answer: 'Yes. All battery replacements include a written warranty covering the battery and the installation. Contact us if you have any issues after the replacement.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Battery Replacement Pretoria',
  description: 'MacBook battery replacement for Pretoria clients. Collection and return service.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Place', name: 'Pretoria' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Battery Replacement', item: 'https://zasupport.com/battery-replacement' },
    { '@type': 'ListItem', position: 3, name: 'Pretoria', item: 'https://zasupport.com/battery-replacement/pretoria' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function BatteryReplacementPretoriaPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Battery Replacement', href: '/battery-replacement' },
            { label: 'Pretoria' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Battery Replacement
              <br /><span className="text-[#0FEA7A]">Pretoria</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              MacBook battery replacement for Pretoria clients. Apple-spec batteries, written warranty, same-day or next-day turnaround. Collection from Pretoria — approx 40–55 minutes to Hyde Park.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>Hyde Park, Johannesburg | Collection from Pretoria | Same-day service available</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {['Apple-Spec Batteries', 'Written Warranty', 'Same-Day Service', 'Collection Available'].map((l) => (
                <div key={l} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <CheckCircle className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{l}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('BAT-PRETORIA', 'battery')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all" >
                WhatsApp for Quote
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link href="/battery-replacement" className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all">
                All Battery Replacement <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Battery Symptoms We Fix for Pretoria Clients</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">Pretoria clients benefit from our Hyde Park-based component-level repair facility. Same assessment standard. Same No Fix No Fee guarantee. We service all MacBook Air and MacBook Pro models from 2015 onwards, Intel and Apple Silicon.</p>
          <div className="space-y-4">
            {symptoms.map((f) => (
              <div key={f.title} className="glass-card p-5">
                <h3 className="text-[#E8F4F1] font-bold mb-2">{f.title}</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title={`MacBook Battery Replacement Pretoria — Common Questions`} />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Battery Fault in Pretoria? We Collect.</h2>
            <p className="text-[#7A9E98] mb-6">We collect from Pretoria and surrounding areas including Hatfield, Brooklyn, Waterkloof, Centurion, and Midrand.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('BAT-PRETORIA', 'battery')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all" >
                WhatsApp for Quote
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
