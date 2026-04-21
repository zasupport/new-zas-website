import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, AlertTriangle, CheckCircle, MapPin, Clock } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';
import PricingNote from '@/components/PricingNote';
import PricingRange from '@/components/PricingRange';

export const metadata: Metadata = {
  title: 'MacBook Liquid Damage Repair Germiston | ZA Support Hyde Park',
  description:
    'MacBook liquid damage repair for Germiston clients. Ultrasonic cleaning, board-level diagnostics. We collect from Germiston. Assessment from R599. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/liquid-damage/germiston' },
};

const urgentSteps = [
  { step: '01', title: 'Switch Off Immediately', desc: 'Do not attempt to use or charge the MacBook. Power it off and leave it off — powering a wet board causes short-circuit damage.' },
  { step: '02', title: 'Do Not Use Rice', desc: 'Rice does not remove corrosion or clean contaminated contacts. It wastes critical intervention time while corrosion spreads.' },
  { step: '03', title: 'Contact Us Now', desc: 'WhatsApp or call us immediately. Every hour increases corrosion spread. We arrange same-day collection from Germiston.' },
  { step: '04', title: 'Ultrasonic Cleaning', desc: 'Full disassembly. Logic board cleaned in ultrasonic bath to remove corrosion and contaminants at component level.' },
  { step: '05', title: 'Diagnostic and Repair', desc: 'Post-clean diagnostic to identify damaged components. Board-level repair under magnification.' },
  { step: '06', title: 'Return to Germiston', desc: 'Your device returned clean, fully tested, with a ZA Support warranty on all repaired components.' },
];

const faqs = [
  {
    question: 'How quickly should I contact you after liquid damage in Germiston?',
    answer: 'Immediately — within hours if possible. Every hour that passes allows corrosion to spread further across the logic board. We offer same-day collection from Germiston, which is approximately 30 minutes from our Hyde Park workshop. The faster we can get to the board, the higher the success rate.',
  },
  {
    question: 'Do you collect MacBooks from Germiston after liquid damage?',
    answer: 'Yes. We collect from Germiston, Bedfordview, and the OR Tambo gateway corridor. Contact us via WhatsApp and we will arrange the fastest possible collection.',
  },
  {
    question: 'What does the liquid damage assessment cost?',
    answer: 'The assessment is from R599. This covers full disassembly, inspection under magnification, and a written quote. If the device is not economically repairable, we will tell you clearly. No further work proceeds without your approval.',
  },
  {
    question: 'What types of liquid cause the most damage?',
    answer: 'Coffee and sugary drinks cause the most damage because they leave conductive residue that accelerates corrosion. Salt water causes rapid severe corrosion. Even pure water causes oxidation over time. Whatever liquid was involved, bring the device in immediately.',
  },
  {
    question: 'My MacBook got wet but still works. Should I bring it in?',
    answer: 'Yes, absolutely. Liquid damage is progressive. Even if your MacBook appears to work normally after getting wet, corrosion continues to develop invisibly. The most common failure pattern is a MacBook that survived liquid exposure for weeks, then suddenly failed. Early intervention is dramatically cheaper and more successful.',
  },
  {
    question: 'Will you be able to save my data?',
    answer: 'In most cases, yes. The SSD is separate from the logic board and survives liquid damage in many cases. We assess data recoverability as part of our diagnostic. If the logic board cannot be repaired, we will advise on data recovery options.',
  },
  {
    question: 'Is there a From R599 assessment policy for liquid damage?',
    answer: 'Yes. If we cannot repair your MacBook after cleaning and diagnostics, you only pay the assessment fee. We will not charge for repair work that does not succeed.',
  },
  {
    question: 'Can you repair Apple Silicon MacBooks with liquid damage?',
    answer: 'Yes. We repair M1, M2, and M3 MacBook Pro and MacBook Air models with liquid damage. Apple Silicon boards have different architecture to Intel boards but the cleaning and diagnostic process is the same.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Liquid Damage Repair Germiston',
  description: 'MacBook liquid damage repair for Germiston clients. Ultrasonic cleaning, board-level diagnostics. Collection from Germiston.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Germiston' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Liquid Damage Repair', item: 'https://zasupport.com/liquid-damage' },
    { '@type': 'ListItem', position: 3, name: 'Germiston', item: 'https://zasupport.com/liquid-damage/germiston' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function LiquidDamageGermistonPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Liquid Damage Repair', href: '/liquid-damage' },
            { label: 'Germiston' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Liquid Damage Repair Germiston
              <br /><span className="text-[#0FEA7A]">— Act Fast, Save Your Mac</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Liquid damage is time-critical. We collect from Germiston and carry out ultrasonic cleaning and board-level repair at our Hyde Park workshop, approximately 30 minutes away. Assessment from R599.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <Clock className="w-4 h-4 text-[#0FEA7A]" />
              <span>Same-day collection from Germiston — contact us immediately after liquid exposure</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: AlertTriangle, label: 'Act Within Hours' },
                { icon: CheckCircle, label: 'Ultrasonic Cleaning' },
                { icon: MapPin, label: 'Collect from Germiston' },
                { icon: CheckCircle, label: 'From R599 assessment' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <Icon className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('LDR-GERMISTO', 'liquid-damage')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
                💬 WhatsApp — Act Now
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">What to Do Right Now</h2>
          <div className="space-y-5">
            {urgentSteps.map((item) => (
              <div key={item.step} className="glass-card p-5 flex gap-4">
                <span className="text-[#0FEA7A] font-extrabold text-xl flex-shrink-0">{item.step}</span>
                <div>
                  <h3 className="text-[#E8F4F1] font-bold mb-1">{item.title}</h3>
                  <p className="text-[#7A9E98] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">
            Liquid Damage Repair for Germiston Clients
          </h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              We have seen every type of liquid damage in our Hyde Park workshop — coffee, water, wine, condensation from load-shedding humidity changes. The consistent finding is that time is the most critical variable. Liquid on a logic board causes two types of damage: the initial short-circuit when the machine was powered, and the ongoing corrosion that continues for days or weeks after the incident.
            </p>
            <p>
              For Germiston and Bedfordview residents and logistics-sector professionals, same-day collection from Germiston, Bedfordview, and the OR Tambo gateway corridor makes a measurable difference to the success rate. We use a commercial ultrasonic bath to remove all residue and contaminants from the board, followed by a full board-level diagnostic to identify any components that were damaged by the exposure.
            </p>
            <p>
              Not every liquid-damaged MacBook can be saved, but the majority can. We have repaired MacBooks that arrived weeks after the incident and still had the board restore to full function. The honest assessment you receive after our diagnostic will tell you exactly what is repairable and at what cost, with to proceed.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Liquid Damage Repair Germiston — Common Questions" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">We Also Serve These Areas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: "Edenvale", href: "/liquid-damage/edenvale" },
              { label: "Alberton", href: "/liquid-damage/alberton" },
              { label: "Boksburg", href: "/liquid-damage/boksburg" },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Liquid Damage in Germiston? Act Now.</h2>
            <p className="text-[#7A9E98] mb-6">Same-day collection from Germiston. Assessment from R599. From R599 assessment.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('LDR-GERMISTO', 'liquid-damage')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
                💬 WhatsApp — Act Now
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <PricingRange page="/liquid-damage/germiston" />
          <PricingNote />
        </div>
      </section>

    </>
  );
}
