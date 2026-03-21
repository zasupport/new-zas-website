import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, AlertTriangle, CheckCircle, MapPin, Clock } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Liquid Damage Repair Rosebank | ZA Support Hyde Park',
  description:
    'MacBook liquid damage repair for Rosebank clients. Ultrasonic cleaning, board-level diagnostics. We collect from Rosebank — 2 km from our workshop. Assessment from R599. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/liquid-damage/rosebank' },
};

const urgentSteps = [
  { step: '01', title: 'Switch Off Immediately', desc: 'Do not attempt to use or charge the MacBook. Power it off using the power button and leave it off.' },
  { step: '02', title: 'Do Not Use Rice', desc: 'Rice does not remove corrosion or clean contaminated contacts. It wastes critical intervention time.' },
  { step: '03', title: 'Contact Us Now', desc: 'WhatsApp or call us immediately. Rosebank is 2 km from our workshop — we can collect within minutes in many cases.' },
  { step: '04', title: 'Ultrasonic Cleaning', desc: 'Full disassembly. Logic board cleaned in ultrasonic bath to remove corrosion and contaminants at component level.' },
  { step: '05', title: 'Diagnostic and Repair', desc: 'Post-clean diagnostic to identify damaged components. Board-level repair under magnification.' },
  { step: '06', title: 'Return to Rosebank', desc: 'Your device returned clean, fully tested, with a ZA Support warranty on all repaired components.' },
];

const faqs = [
  {
    question: 'How quickly can you collect from Rosebank after liquid damage?',
    answer: 'Very quickly. Rosebank is approximately 2 km from our Hyde Park workshop at 1 Hyde Lane. In many cases we can collect from Rosebank Mall, The Zone, or surrounding offices within 15–30 minutes of your call. Every minute counts with liquid damage — contact us immediately.',
  },
  {
    question: 'What does the liquid damage assessment cost?',
    answer: 'The assessment is from R599. This covers full disassembly, inspection under magnification, and an honest quote. If the device is not economically repairable, we will tell you — and help with data recovery options. No further work proceeds without your approval.',
  },
  {
    question: 'My MacBook got wet in a Rosebank coffee shop. What should I do?',
    answer: 'Switch it off immediately using the power button — do not wait for it to shut down normally. Do not attempt to charge it. Contact us via WhatsApp immediately. We can collect from Rosebank within minutes. The faster we intervene, the higher the success rate.',
  },
  {
    question: 'What types of liquid cause the most damage?',
    answer: 'Coffee and sugary drinks cause the most damage because they leave conductive residue. Salt water causes rapid severe corrosion. Even pure water causes oxidation over time. Whatever liquid was involved — contact us immediately.',
  },
  {
    question: 'My MacBook still works after getting wet. Should I still bring it in?',
    answer: 'Yes. Liquid damage is progressive. Even if your MacBook appears to work normally, corrosion continues to develop invisibly. The most common failure pattern is a MacBook that survived liquid exposure for weeks, then suddenly failed completely. Early intervention is dramatically cheaper and more successful than waiting.',
  },
  {
    question: 'Will you be able to save my data?',
    answer: 'In most cases, yes. The SSD is separate from the logic board and survives liquid damage in many cases. We assess data recoverability as part of our diagnostic.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Liquid Damage Repair Rosebank',
  description: 'MacBook liquid damage repair for Rosebank clients. Same-day collection from Rosebank. Ultrasonic cleaning, board-level repair.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Rosebank' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Liquid Damage', item: 'https://zasupport.com/liquid-damage' },
    { '@type': 'ListItem', position: 3, name: 'Rosebank', item: 'https://zasupport.com/liquid-damage/rosebank' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function LiquidDamageRosebankPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Liquid Damage', href: '/liquid-damage' },
            { label: 'Rosebank' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 px-4 py-2 rounded-full mb-6">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span className="text-red-400 text-sm font-semibold">Act immediately — every hour matters</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Liquid Damage Repair Rosebank
              <br /><span className="text-[#0FEA7A]">— 2 km Away, We Collect Fast</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              MacBook exposed to liquid in Rosebank? Switch it off now. We are 2 km away and can collect within minutes. Ultrasonic cleaning, board-level repair. Assessment from R599.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>Rosebank is 2 km from our Hyde Park workshop — fastest liquid damage response</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: Clock, label: 'Emergency Collection' },
                { icon: CheckCircle, label: 'Ultrasonic Cleaning' },
                { icon: CheckCircle, label: 'Board-level Repair' },
                { icon: MapPin, label: '2 km from Workshop' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <Icon className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
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

      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">MacBook Liquid Damage Repair for Rosebank Clients</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              Rosebank is one of Johannesburg&apos;s most active mixed-use suburbs — coffee shops, coworking spaces, and corporate offices all in close proximity. A spilled coffee or water in a Rosebank café or office is one of the most common causes of MacBook liquid damage we see.
            </p>
            <p>
              Our Hyde Park workshop at 1 Hyde Lane is approximately 2 km from Rosebank Mall and The Zone — the closest collection point of any MacBook repair service in Johannesburg. When you call us after a liquid damage incident in Rosebank, we can collect within 15–30 minutes in many cases.
            </p>
            <p>
              Our process includes full disassembly, ultrasonic cleaning of the logic board, a post-clean diagnostic under magnification, and board-level component repair where required. Assessment from R599. Every repair is covered by a ZA Support warranty.
            </p>
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
          <FAQAccordion items={faqs} title="MacBook Liquid Damage Repair Rosebank — Common Questions" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Services</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'All Liquid Damage', href: '/liquid-damage' },
              { label: 'MacBook Pro Liquid Damage', href: '/liquid-damage/macbook-pro' },
              { label: 'Logic Board Repair', href: '/logic-board-repair' },
              { label: 'Rosebank Battery', href: '/battery-replacement/rosebank' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Rosebank MacBook Liquid Damage — Act Now.</h2>
            <p className="text-[#7A9E98] mb-6">Assessment from R599. 2 km away. We collect immediately. Switch it off and call us.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
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
