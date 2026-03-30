import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, ArrowRight, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Logic Board Repair Melville | ZA Support Hyde Park',
  description: 'MacBook logic board repair for Melville clients. Component-level repair, assessment from R599. We collect from Melville. No Fix No Fee. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/logic-board-repair/melville' },
};

const faults = [
  { title: 'No Power', desc: 'MacBook shows no signs of life. We trace the power rail from the charging port through to the SoC power domain. The most common cause we see from Melville clients is USB-C controller or power management IC damage from load shedding surges — South Africa\'s grid instability accounts for roughly 35% of the no-power boards that arrive at our Hyde Park workshop.' },
  { title: 'No Display / Black Screen', desc: 'The machine boots — you can hear the startup chime or feel the trackpad click — but the screen stays black. In our experience this is usually a backlight fuse, display driver IC, or on older Intel models a GPU fault. We diagnose the exact failed component before quoting.' },
  { title: 'Liquid Damage', desc: 'Coffee, water, or condensation causes progressive corrosion on the logic board. We have seen boards from Melville where a small spill two weeks earlier quietly corroded a power rail. Ultrasonic cleaning followed by targeted component replacement at board level. Time-critical — the sooner the board reaches us, the better the outcome.' },
  { title: 'USB-C / Thunderbolt Failure', desc: 'No charging, no data transfer, or no external display output on one or both USB-C ports. The CD3217 or similar controller IC is a discrete, replaceable component. We see this fault frequently after third-party charger use or load shedding events.' },
  { title: 'Overheating / Shutdown', desc: 'Unexpected shutdowns under load traced to failed voltage regulators, shorted capacitors, or thermal sensor faults on the logic board. Not a fan or thermal paste issue — a board-level electrical fault that requires component-level diagnosis.' },
  { title: 'Fan Running at Full Speed', desc: 'Continuous full-speed fan operation even at idle. This is an SMC or thermal sensor fault on the logic board — not dust buildup. The specific failed sensor or SMC component is identified and replaced. We repair this at component level rather than replacing the entire board.' },
];

const faqs = [
  {
    question: 'Do you collect MacBooks for logic board repair from Melville?',
    answer: 'Yes. We collect from Melville and the surrounding Johannesburg North area. Melville is approximately 8 km from our Hyde Park workshop — roughly 12–18 minutes by car. We collect, repair at our workshop at 1 Hyde Park Lane, and return once complete. WhatsApp 064 529 5863 to arrange same-day collection.',
  },
  {
    question: 'How far is Melville from your Hyde Park workshop?',
    answer: 'Approximately 8 km — roughly 12–18 minutes by car depending on traffic. Melville is one of our regular collection areas in Johannesburg North.',
  },
  {
    question: 'What does MacBook logic board repair cost for Melville clients?',
    answer: 'Assessment from R599. The repair cost depends on the specific fault — a written quote with the exact price is provided before any work proceeds. Component-level repair typically costs 60–80% less than Apple\'s full board replacement. No Fix No Fee applies to all Melville clients.',
  },
  {
    question: 'Can a MacBook logic board be repaired or does it need replacing?',
    answer: 'In most cases repaired. Component-level repair replaces only the failed IC, capacitor, or connector — not the entire board. Apple charges R15,000–R70,000 for a board replacement. We repair the specific failed component at a fraction of that cost, and your data stays intact.',
  },
  {
    question: 'My MacBook was damaged by a load shedding power surge — is it repairable?',
    answer: 'Yes, in most cases. Power surges typically damage the USB-C charge controller — a discrete, repairable IC. South African load shedding is the single most common cause of logic board faults we see. The R599 assessment confirms the specific damaged component before any commitment.',
  },
  {
    question: 'How long does MacBook logic board repair take?',
    answer: 'After the R599 assessment and your written approval, most repairs complete within 3–5 business days. Liquid damage cases requiring ultrasonic cleaning may take slightly longer. We provide a specific timeline in the written quote.',
  },
  {
    question: 'Is my data safe during logic board repair?',
    answer: 'Yes. Component-level board repair does not require erasing or removing the SSD. Your data remains on the board throughout the repair process. If the board is completely non-functional, SSD readability is assessed as part of the R599 diagnostic.',
  },
  {
    question: 'Do you offer No Fix No Fee for Melville clients?',
    answer: 'Yes. If we cannot repair your MacBook after the assessment, you pay only the R599 assessment fee — not the full repair cost. This applies to all clients regardless of location. Collection from Melville is included.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Logic Board Repair Melville',
  description: 'Component-level MacBook logic board repair for Melville clients. Assessment from R599. Collection included.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Place', name: 'Melville' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Logic Board Repair', item: 'https://zasupport.com/logic-board-repair' },
    { '@type': 'ListItem', position: 3, name: 'Melville', item: 'https://zasupport.com/logic-board-repair/melville' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function LogicBoardRepairMelvillePage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Logic Board Repair', href: '/logic-board-repair' },
            { label: 'Melville' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Logic Board Repair
              <br /><span className="text-[#0FEA7A]">Melville</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Component-level MacBook logic board repair for Melville clients. No power, charging faults, liquid damage, display failures, and USB-C faults repaired at our Hyde Park workshop. Collection from Melville — approximately 8 km, 12–18 minutes by car.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>Hyde Park, Johannesburg | Assessment from R599 | Collecting from Melville — approx 12–18 min drive</span>
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
              <a href={buildWhatsAppUrl('LBR-MELVILLE', 'logic-board')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
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
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">MacBook Logic Board Faults We Repair for Melville Clients</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">Melville is approximately 8 km from our Hyde Park workshop — one of our regular collection areas in Johannesburg North. All MacBook models from 2015 onwards are covered — Intel and Apple Silicon. Every fault is assessed at component level with a written quote before any repair proceeds.</p>
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
          <FAQAccordion items={faqs} title={`MacBook Logic Board Repair Melville — Common Questions`} />
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
              { label: 'Liquid Damage Melville', href: '/liquid-damage/melville' },
              { label: 'Battery Replacement Melville', href: '/battery-replacement/melville' },
              { label: 'Screen Repair Melville', href: '/screen-repair/melville' },
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
            <p className="text-[#7A9E98] mb-6">Collecting from Melville. No Fix No Fee.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('LBR-MELVILLE', 'logic-board')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
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
