import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, ArrowRight, MapPin, AlertTriangle } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Liquid Damage Repair Sunninghill | ZA Support Hyde Park',
  description: 'MacBook liquid damage repair for Sunninghill clients. Ultrasonic cleaning, board-level diagnostics, same-day collection from Sunninghill. Assessment from R599. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/liquid-damage/sunninghill' },
};

const urgentSteps = [
  { step: '01', title: 'Switch Off Immediately', desc: 'Do not attempt to use or charge the MacBook. Power off using the power button and leave it off.' },
  { step: '02', title: 'Do Not Use Rice', desc: 'Rice does not remove corrosion or clean contaminated contacts. It wastes critical intervention time.' },
  { step: '03', title: 'Contact Us Now', desc: 'WhatsApp or call immediately. Every hour increases corrosion spread. We arrange same-day collection from Sunninghill.' },
  { step: '04', title: 'Ultrasonic Cleaning', desc: 'Full disassembly. Logic board cleaned in ultrasonic bath to remove corrosion and contaminants at component level.' },
  { step: '05', title: 'Diagnostic and Repair', desc: 'Post-clean diagnostic identifies damaged components. Board-level repair under magnification.' },
  { step: '06', title: 'Return to Sunninghill', desc: 'Device returned clean, fully tested, with a ZA Support warranty on all repaired components.' },
];

const faqs = [
  {
    question: 'How quickly should I contact you after liquid damage in Sunninghill?',
    answer: 'Immediately — within hours if possible. Every hour allows corrosion to spread further. We offer same-day collection from Sunninghill, approximately 20–25 minutes from our Hyde Park workshop. Speed is the single most important factor in liquid damage recovery.',
  },
  {
    question: 'Do you collect MacBooks for liquid damage repair from Sunninghill?',
    answer: 'We collect from Sunninghill, Rivonia, Paulshof, and Fourways. WhatsApp 064 529 5863 for same-day collection.',
  },
  {
    question: 'What is the success rate for MacBook liquid damage repair?',
    answer: 'Success rate depends heavily on time elapsed and liquid type. Water damage caught within 24 hours has approximately 80% success. Coffee or sugary liquids are more aggressive — corrosion spreads faster. Machines brought in within a few hours have the best outcomes.',
  },
  {
    question: 'Why not use rice to dry my MacBook?',
    answer: 'Rice absorbs surface moisture but does nothing to remove corrosion from circuit board contacts and component pads. It also delays professional treatment, allowing corrosion to spread. Ultrasonic cleaning is the only effective method for removing liquid contamination from a logic board.',
  },
  {
    question: 'Will my data be recovered after liquid damage?',
    answer: 'In most cases yes. The SSD in modern MacBooks is separate from the main liquid damage path. If the logic board is repairable, your data is intact. If the board cannot be recovered, SSD readability is assessed as part of the R599 diagnostic.',
  },
  {
    question: 'How much does MacBook liquid damage repair cost for Sunninghill clients?',
    answer: 'Assessment from R599. Repair cost depends on the extent of damage confirmed during the ultrasonic cleaning and diagnostic process. Written quote provided before any repair proceeds. No Fix No Fee applies.',
  },
  {
    question: 'How long does liquid damage repair take?',
    answer: 'Ultrasonic cleaning takes 2–4 hours. Post-clean diagnostic and component repair typically adds 2–5 business days depending on the extent of damage. We provide a timeline in the written quote after assessment.',
  },
  {
    question: 'Do you repair iPhones and iPads with liquid damage from Sunninghill?',
    answer: 'Yes. We repair liquid damage on MacBooks, iPhones, iPads, and other Apple devices. Contact us via WhatsApp with the device type for a same-day collection quote.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Liquid Damage Repair Sunninghill',
  description: 'MacBook liquid damage repair for Sunninghill clients. Ultrasonic cleaning, component-level repair. Assessment from R599.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Place', name: 'Sunninghill' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Liquid Damage', item: 'https://zasupport.com/liquid-damage' },
    { '@type': 'ListItem', position: 3, name: 'Sunninghill', item: 'https://zasupport.com/liquid-damage/sunninghill' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function LiquidDamageSunninghillPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Liquid Damage', href: '/liquid-damage' },
            { label: 'Sunninghill' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Liquid Damage Repair
              <br /><span className="text-[#0FEA7A]">Sunninghill</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Emergency MacBook liquid damage repair for Sunninghill clients. Same-day collection. Ultrasonic cleaning and component-level board repair at our Hyde Park workshop — approx 20–25 minutes from Sunninghill.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 font-medium">Act immediately — every hour increases corrosion spread.</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {['Same-Day Collection', 'Ultrasonic Cleaning', 'No Fix No Fee', 'Assessment from R599'].map((l) => (
                <div key={l} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <CheckCircle className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{l}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('LIQ-SUNNINGHILL', 'liquid-damage')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
                WhatsApp — Emergency Collection
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8">What To Do After a Spill — Sunninghill Clients</h2>
          <div className="space-y-4">
            {urgentSteps.map((s) => (
              <div key={s.step} className="glass-card p-5 flex gap-4">
                <span className="text-[#0FEA7A] font-mono font-bold text-lg min-w-[2.5rem]">{s.step}</span>
                <div>
                  <h3 className="text-[#E8F4F1] font-bold mb-1">{s.title}</h3>
                  <p className="text-[#7A9E98] text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title={`MacBook Liquid Damage Repair Sunninghill — Common Questions`} />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Liquid Damage in Sunninghill? Act Now.</h2>
            <p className="text-[#7A9E98] mb-6">We collect from Sunninghill, Rivonia, Paulshof, and Fourways.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('LIQ-SUNNINGHILL', 'liquid-damage')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
                WhatsApp — Emergency Collection
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
