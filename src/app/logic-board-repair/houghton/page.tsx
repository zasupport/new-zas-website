import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, ArrowRight, MapPin, Cpu } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Logic Board Repair Houghton | ZA Support Hyde Park',
  description: 'MacBook logic board repair for Houghton clients. Component-level repair, assessment from R599. We collect from Houghton. No Fix No Fee. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/logic-board-repair/houghton' },
};

const faults = [
  { title: 'No Power', desc: 'MacBook shows no signs of life. Power rail diagnosis and component-level repair. Most common cause: USB-C controller or power management IC damaged by load shedding surge.' },
  { title: 'No Display / Black Screen', desc: 'Machine boots but screen stays black or shows artefacts. Backlight fuse, display driver IC, or GPU fault identified and repaired.' },
  { title: 'Liquid Damage', desc: 'Coffee, water, or condensation causes corrosion. Ultrasonic cleaning followed by targeted component replacement at board level.' },
  { title: 'USB-C / Thunderbolt Failure', desc: 'No charging, no data, or no external display on USB-C ports. Controller IC or port board replaced at component level.' },
  { title: 'Overheating / Shutdown', desc: 'Unexpected shutdowns traced to failed voltage regulators, thermal sensor faults, or blocked power rails on the logic board.' },
  { title: 'Fan Running at Full Speed', desc: 'SMC fault or failed thermal sensor causes fans to run continuously. Board-level diagnosis and SMC component repair.' },
];

const faqs = [
  {
    question: 'Do you collect MacBooks for logic board repair from Houghton?',
    answer: 'We collect from Houghton, Saxonwold, Parktown, and Rosebank. We collect, repair at our Hyde Park workshop, and return once complete. WhatsApp 064 529 5863 to arrange.',
  },
  {
    question: 'How far is Houghton from your Hyde Park workshop?',
    answer: 'Approximately 7 km from Houghton to our workshop at 1 Hyde Lane, Second Floor, Office E2004 — roughly 10–15 minutes by car. Houghton is one of our closest collection areas — approximately 7 km from Hyde Park.',
  },
  {
    question: 'What does MacBook logic board repair cost for Houghton clients?',
    answer: 'Assessment from R599. Repair cost depends on the specific fault — quoted in writing before any work proceeds. No Fix No Fee applies to all Houghton clients.',
  },
  {
    question: 'Can a MacBook logic board be repaired or does it need replacing?',
    answer: 'In most cases repaired. Component-level repair replaces only the failed IC, capacitor, or connector — not the entire board. This costs 60–80% less than a board replacement and preserves your data.',
  },
  {
    question: 'My MacBook was damaged by a load shedding power surge — is it repairable?',
    answer: 'Yes, in most cases. Power surges typically damage the USB-C charge controller — a discrete, repairable IC. The R599 assessment confirms the specific fault before any commitment.',
  },
  {
    question: 'How long does MacBook logic board repair take?',
    answer: 'After the R599 assessment and written approval, most repairs complete within 3–5 business days. We provide a specific timeline in the written quote.',
  },
  {
    question: 'Is my data safe during logic board repair?',
    answer: 'Yes. Component-level board repair does not require erasing or removing the SSD. If the board is completely non-functional, SSD readability is assessed as part of the R599 diagnostic.',
  },
  {
    question: 'Do you offer No Fix No Fee for Houghton clients?',
    answer: 'Yes. If we cannot repair your MacBook after the assessment, you pay only the R599 assessment fee — not the full repair cost. This applies to all clients regardless of location.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Logic Board Repair Houghton',
  description: 'Component-level MacBook logic board repair for Houghton clients. Assessment from R599.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Place', name: 'Houghton' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Logic Board Repair', item: 'https://zasupport.com/logic-board-repair' },
    { '@type': 'ListItem', position: 3, name: 'Houghton', item: 'https://zasupport.com/logic-board-repair/houghton' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function LogicBoardRepairHoughtonPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Logic Board Repair', href: '/logic-board-repair' },
            { label: 'Houghton' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Logic Board Repair
              <br /><span className="text-[#0FEA7A]">Houghton</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Component-level MacBook logic board repair for Houghton clients. No power, charging faults, liquid damage, display failures, and USB-C faults repaired at our Hyde Park workshop. Collection from Houghton.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>Hyde Park, Johannesburg | Assessment from R599 | Collecting from Houghton — approx 10–15 min drive</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {['Component-Level Repair', 'No Fix No Fee', 'Written Warranty', 'Assessment from R599'].map((l) => (
                <div key={l} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <CheckCircle className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{l}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('LBR-HOUGHTON', 'logic-board')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
                WhatsApp for Quote
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link href="/logic-board-repair" className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all">
                All Logic Board Repair <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">MacBook Logic Board Faults We Repair for Houghton Clients</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">Houghton is one of our closest collection areas — approximately 7 km from Hyde Park. All MacBook models from 2015 onwards are covered — Intel and Apple Silicon. Faults assessed at component level. Written quote before any repair proceeds.</p>
          <div className="space-y-4">
            {faults.map((f) => (
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
          <FAQAccordion items={faqs} title={`MacBook Logic Board Repair Houghton — Common Questions`} />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Services</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'Logic Board Hub', href: '/logic-board-repair' },
              { label: 'MacBook Pro M1', href: '/logic-board-repair/macbook-pro-m1' },
              { label: 'MacBook Pro M2', href: '/logic-board-repair/macbook-pro-m2' },
              { label: 'Liquid Damage Houghton', href: '/liquid-damage/houghton' },
              { label: 'Battery Replacement Houghton', href: '/battery-replacement/houghton' },
              { label: 'iPhone Repair Houghton', href: '/iphone-repair/screen/houghton' },
              { label: 'Liquid Damage Repair', href: '/liquid-damage' },
              { label: 'All MacBook Repair', href: '/macbook-repair' },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="glass-card p-4 text-center group">
                <span className="text-[#E8F4F1] text-sm font-semibold group-hover:text-[#0FEA7A] transition-colors">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">MacBook Logic Board Fault? Assessment from R599.</h2>
            <p className="text-[#7A9E98] mb-6">Collecting from Houghton. No Fix No Fee.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('LBR-HOUGHTON', 'logic-board')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
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
