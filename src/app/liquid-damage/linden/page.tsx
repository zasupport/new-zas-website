import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, ArrowRight, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Liquid Damage Repair Linden | ZA Support Hyde Park',
  description: 'MacBook liquid damage repair for Linden clients. Ultrasonic cleaning, component-level board repair. Assessment from R599. Collection from Linden. No Fix No Fee.',
  alternates: { canonical: 'https://zasupport.com/liquid-damage/linden' },
};

const faults = [
  { title: 'Coffee or Tea Spill', desc: 'The most common liquid damage we see from Linden clients. Coffee contains acids and sugars that accelerate corrosion on the logic board far faster than clean water. Immediate assessment gives the best repair outcome — corrosion spreads hourly once the liquid dries.' },
  { title: 'Rain or Humidity Damage', desc: 'Johannesburg\'s afternoon thunderstorms and summer humidity cause a pattern of damage we see frequently. Rain through an open bag or condensation from rapid temperature changes between air-conditioned offices and outdoor heat in Linden. The damage is progressive and often invisible until symptoms appear days later.' },
  { title: 'Liquid Through Keyboard', desc: 'The keyboard is the primary liquid entry point on any MacBook. Liquid passes through the key mechanisms and reaches the logic board within seconds. On newer Apple Silicon Macs, the most vulnerable components — charge controllers and power management ICs — sit directly below the keyboard area.' },
  { title: 'USB-C Port Exposure', desc: 'Liquid entering through USB-C ports damages the charge controller IC. We see this after spills that pool on the left edge of the MacBook. Port-specific charging failure is a clear sign. The controller is a discrete, replaceable component — not a reason to replace the entire board.' },
  { title: 'Delayed Corrosion', desc: 'A small spill seems fine — the Mac keeps working. But trapped moisture under chips and shielding corrodes solder joints over days or weeks. Sudden failure two weeks after a spill is the most expensive scenario we encounter. We always recommend assessment within 48 hours of any liquid contact, even if everything appears normal.' },
  { title: 'Secondary Component Failure', desc: 'After an initial liquid damage event, other components can fail weeks or months later as corrosion continues to spread. We see Linden clients return after an apparently successful home dry-out only to find additional circuits failing. Professional ultrasonic cleaning removes all corrosion — preventing the cascading failure pattern.' },
];

const faqs = [
  {
    question: 'Do you collect liquid-damaged MacBooks from Linden?',
    answer: 'Yes — same-day collection from Linden. For liquid damage, speed matters. Linden is approximately 7 km from our Hyde Park workshop, roughly 12–15 minutes by car. WhatsApp 064 529 5863 to arrange immediate collection.',
  },
  {
    question: 'How much does MacBook liquid damage repair cost for Linden clients?',
    answer: 'Assessment from R599 determines the extent of damage. Repair cost depends on which components have been damaged by the liquid. Apple charges R15,000–R70,000 for board replacement after liquid damage. We repair only the affected components at a fraction of that cost. Written quote before any work.',
  },
  {
    question: 'My MacBook got wet but still works — do I need to bring it in?',
    answer: 'Yes, as soon as possible. Liquid damage is progressive — corrosion continues even after drying. Ultrasonic cleaning within 48 hours prevents long-term component failure. Waiting until the machine stops working always costs more.',
  },
  {
    question: 'What is ultrasonic cleaning?',
    answer: 'We remove the logic board and submerge it in a professional ultrasonic cleaning bath. High-frequency sound waves remove corrosion and contaminants from under BGA chips and shielding where manual cleaning cannot reach. After cleaning, each component is inspected under magnification and damaged ones replaced.',
  },
  {
    question: 'Should I put my wet MacBook in rice?',
    answer: 'No. Rice does not remove corrosion — it only absorbs surface moisture while corrosion continues spreading on the logic board. Rice dust can also enter ports and cause additional problems. The correct response is to power off immediately, do not charge, and bring to our workshop for professional ultrasonic cleaning.',
  },
  {
    question: 'Is my data safe after liquid damage?',
    answer: 'In most cases yes. On Apple Silicon Macs (M1/M2/M3), storage is integrated into the SoC. The chip itself is highly resistant to liquid damage. As long as the SoC is intact, your data is typically recoverable after the surrounding circuits are repaired.',
  },
  {
    question: 'How long does liquid damage repair take?',
    answer: 'Ultrasonic cleaning takes 24 hours including drying time. Component-level repair adds 2–5 business days depending on the extent of corrosion. Typical total turnaround is 3–5 business days. We provide a timeline with the written quote.',
  },
  {
    question: 'Do you offer No Fix No Fee for liquid damage from Linden?',
    answer: 'Yes. If we cannot repair the board after assessment, you pay only the R599 assessment fee. No Fix No Fee applies to all Linden clients. Collection is included.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Liquid Damage Repair Linden',
  description: 'Ultrasonic cleaning and component-level MacBook liquid damage repair for Linden clients. Assessment from R599.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Place', name: 'Linden' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Liquid Damage', item: 'https://zasupport.com/liquid-damage' },
    { '@type': 'ListItem', position: 3, name: 'Linden', item: 'https://zasupport.com/liquid-damage/linden' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function LiquidDamageLindenPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Liquid Damage', href: '/liquid-damage' },
            { label: 'Linden' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Liquid Damage Repair
              <br /><span className="text-[#0FEA7A]">Linden</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Ultrasonic cleaning and component-level board repair for liquid-damaged MacBooks from Linden. Coffee, water, rain, condensation — all assessed and repaired at our Hyde Park workshop. Collection from Linden — approximately 7 km, 12–15 minutes by car.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>Hyde Park, Johannesburg | Assessment from R599 | Same-day collection from Linden</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {['Ultrasonic Cleaning', 'Component-Level Repair', 'No Fix No Fee', 'Assessment from R599'].map((l) => (
                <div key={l} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <CheckCircle className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{l}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('LD-LINDEN', 'liquid-damage')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
                WhatsApp for Quote
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link href="/liquid-damage" className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all">
                All Liquid Damage Repair <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Liquid Damage Scenarios We Repair for Linden Clients</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">Linden is approximately 7 km from our Hyde Park workshop. For liquid damage, proximity matters — the sooner the board reaches us, the better the repair outcome. All MacBook models from 2015 onwards are covered. Ultrasonic cleaning and component-level board repair, not board replacement.</p>
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
          <FAQAccordion items={faqs} title={`MacBook Liquid Damage Repair Linden — Common Questions`} />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Services</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'Liquid Damage Hub', href: '/liquid-damage' },
              { label: 'Logic Board Repair Linden', href: '/logic-board-repair/linden' },
              { label: 'Battery Replacement Linden', href: '/battery-replacement/linden' },
              { label: 'Screen Repair Linden', href: '/screen-repair/linden' },
              { label: 'MacBook Pro Liquid Damage', href: '/liquid-damage/macbook-pro' },
              { label: 'MacBook Air Liquid Damage', href: '/liquid-damage/macbook-air' },
              { label: 'Logic Board Repair', href: '/logic-board-repair' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">MacBook Liquid Damage? Time matters.</h2>
            <p className="text-[#7A9E98] mb-6">Same-day collection from Linden. Ultrasonic cleaning. Assessment from R599. No Fix No Fee.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('LD-LINDEN', 'liquid-damage')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
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
