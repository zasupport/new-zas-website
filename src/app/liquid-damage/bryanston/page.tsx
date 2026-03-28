import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, AlertTriangle, CheckCircle, MapPin, Clock } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Liquid Damage Repair Bryanston | ZA Support Hyde Park',
  description:
    'MacBook liquid damage repair for Bryanston clients. Ultrasonic cleaning, board-level diagnostics. We collect from Bryanston — 12 min from our workshop. Assessment from R599. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/liquid-damage/bryanston' },
};

const urgentSteps = [
  { step: '01', title: 'Switch Off Immediately', desc: 'Do not attempt to use or charge the MacBook. Power it off using the power button and leave it off.' },
  { step: '02', title: 'Do Not Use Rice', desc: 'Rice does not remove corrosion or clean contaminated contacts. It wastes critical intervention time.' },
  { step: '03', title: 'Contact Us Now', desc: 'WhatsApp or call us immediately. Bryanston is 12 minutes from our workshop — we can collect quickly.' },
  { step: '04', title: 'Ultrasonic Cleaning', desc: 'Full disassembly. Logic board cleaned in ultrasonic bath to remove corrosion and contaminants at component level.' },
  { step: '05', title: 'Diagnostic and Repair', desc: 'Post-clean diagnostic to identify damaged components. Board-level repair under magnification.' },
  { step: '06', title: 'Return to Bryanston', desc: 'Your device returned clean, fully tested, with a ZA Support warranty on all repaired components.' },
];

const faqs = [
  {
    question: 'Do you collect liquid-damaged MacBooks from Bryanston?',
    answer: 'Yes. Bryanston is approximately 12 minutes from our Hyde Park workshop via Jan Smuts Avenue. We collect from homes, offices, and the Bryanston Corporate Park and prioritise liquid damage collections — every hour matters.',
  },
  {
    question: 'What does the liquid damage assessment cost?',
    answer: 'The assessment is from R599. This covers full disassembly, inspection under magnification, and an honest quote. No work proceeds without your written approval.',
  },
  {
    question: 'My MacBook got wet in Bryanston. What should I do right now?',
    answer: 'Switch it off immediately using the power button. Do not attempt to charge it or turn it back on. Do not put it in rice. Contact us via WhatsApp immediately — we will arrange collection from Bryanston as quickly as possible.',
  },
  {
    question: 'My MacBook still works after getting wet. Should I still bring it in?',
    answer: 'Yes. Liquid damage is progressive. Corrosion continues to develop even when the device appears to work. Early intervention is dramatically cheaper than waiting for the board to fail.',
  },
  {
    question: 'Will you be able to save my data?',
    answer: 'In most cases, yes. The SSD is separate from the logic board and survives liquid damage in many cases. We assess data recoverability as part of our diagnostic.',
  },
  {
    question: 'How long does the liquid damage repair take?',
    answer: 'Assessment and cleaning are typically completed within 24–48 hours. Complex board-level repairs may take longer. We provide a specific turnaround time after the initial assessment.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Liquid Damage Repair Bryanston',
  description: 'MacBook liquid damage repair for Bryanston clients. Collection from Bryanston. Ultrasonic cleaning, board-level repair.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Bryanston' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Liquid Damage', item: 'https://zasupport.com/liquid-damage' },
    { '@type': 'ListItem', position: 3, name: 'Bryanston', item: 'https://zasupport.com/liquid-damage/bryanston' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function LiquidDamageBryanstonPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Liquid Damage', href: '/liquid-damage' },
            { label: 'Bryanston' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 px-4 py-2 rounded-full mb-6">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span className="text-red-400 text-sm font-semibold">Act immediately — every hour matters</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Liquid Damage Repair Bryanston
              <br /><span className="text-[#0FEA7A]">— 12 Min Away, We Collect Fast</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              MacBook exposed to liquid in Bryanston? Switch it off now. We are 12 minutes away. Same-day collection. Ultrasonic cleaning, board-level repair. Assessment from R599.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>Bryanston is approx. 12 min from our Hyde Park workshop — fast collection</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: Clock, label: 'Same-day Collection' },
                { icon: CheckCircle, label: 'Ultrasonic Cleaning' },
                { icon: CheckCircle, label: 'Board-level Repair' },
                { icon: MapPin, label: 'Collect from Bryanston' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <Icon className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('LIQ-BRYANSTON', 'liquid-damage')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
                WhatsApp Now — Urgent
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link href="/liquid-damage" className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all">
                Learn More <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8">What to Do Right Now</h2>
          <div className="space-y-6">
            {urgentSteps.map(({ step, title, desc }) => (
              <div key={step} className="glass-card p-6 flex gap-5">
                <span className="text-[#0FEA7A] font-extrabold text-2xl flex-shrink-0">{step}</span>
                <div>
                  <h3 className="text-[#E8F4F1] font-bold mb-1">{title}</h3>
                  <p className="text-[#7A9E98] text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="MacBook Liquid Damage Repair Bryanston — Common Questions" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Services</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'All Liquid Damage', href: '/liquid-damage' },
              { label: 'MacBook Pro Liquid Damage', href: '/liquid-damage/macbook-pro' },
              { label: 'Bryanston Logic Board', href: '/logic-board-repair/bryanston' },
              { label: 'Bryanston Battery', href: '/battery-replacement/bryanston' },
            ].map((area) => (
              <Link key={area.href} href={area.href} className="glass-card p-4 text-center group">
                <span className="text-[#E8F4F1] text-sm font-semibold group-hover:text-[#0FEA7A] transition-colors">{area.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Bryanston MacBook Liquid Damage — Act Now.</h2>
            <p className="text-[#7A9E98] mb-6">Assessment from R599. 12 minutes away. Same-day collection. Switch it off and call us.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('LIQ-BRYANSTON', 'liquid-damage')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
                WhatsApp Now — Urgent
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
