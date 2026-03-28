import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, AlertTriangle, CheckCircle, MapPin, Clock } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Liquid Damage Repair Sandton | ZA Support Hyde Park',
  description:
    'MacBook liquid damage repair for Sandton clients. Ultrasonic cleaning, board-level diagnostics. We collect from Sandton. Assessment from R599. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/liquid-damage/sandton' },
};

const urgentSteps = [
  { step: '01', title: 'Switch Off Immediately', desc: 'Do not attempt to use or charge the MacBook. Power it off using the power button and leave it off.' },
  { step: '02', title: 'Do Not Use Rice', desc: 'Rice does not remove corrosion or clean contaminated contacts. It wastes critical intervention time.' },
  { step: '03', title: 'Contact Us Now', desc: 'WhatsApp or call us immediately. Every hour increases corrosion spread. We arrange same-day collection from Sandton.' },
  { step: '04', title: 'Ultrasonic Cleaning', desc: 'Full disassembly. Logic board cleaned in ultrasonic bath to remove corrosion and contaminants at component level.' },
  { step: '05', title: 'Diagnostic and Repair', desc: 'Post-clean diagnostic to identify damaged components. Board-level repair under magnification.' },
  { step: '06', title: 'Return to Sandton', desc: 'Your device returned clean, fully tested, with a ZA Support warranty on all repaired components.' },
];

const faqs = [
  {
    question: 'How quickly should I contact you after liquid damage in Sandton?',
    answer: 'Immediately — within hours if possible. Every hour that passes allows corrosion to spread further across the logic board. We offer same-day collection from Sandton, which is approximately 15 minutes from our Hyde Park workshop. The faster we can get to the board, the higher the success rate.',
  },
  {
    question: 'Do you collect MacBooks from Sandton after liquid damage?',
    answer: 'Yes. We collect from homes, offices, and corporate buildings throughout Sandton, Sandton City, Morningside, and Katherine Street. Contact us via WhatsApp and we will arrange the fastest possible collection.',
  },
  {
    question: 'What does the liquid damage assessment cost?',
    answer: 'The assessment is from R599. This covers full disassembly, inspection under magnification, and an honest quote. If the device is not economically repairable, we will tell you — and help with data recovery options. No further work proceeds without your approval.',
  },
  {
    question: 'What types of liquid cause the most damage?',
    answer: 'Coffee and sugary drinks cause the most damage because they leave conductive residue that accelerates corrosion. Salt water causes rapid severe corrosion. Even pure water causes oxidation over time. Whatever liquid was involved, the process is the same — bring the device in immediately.',
  },
  {
    question: 'My MacBook got wet but still works. Should I bring it in?',
    answer: 'Yes, absolutely. Liquid damage is progressive. Even if your MacBook appears to work normally after getting wet, corrosion continues to develop invisibly. The most common failure pattern is a MacBook that survived liquid exposure for weeks, then suddenly failed. Early intervention is dramatically cheaper and more successful.',
  },
  {
    question: 'Will you be able to save my data?',
    answer: 'In most cases, yes. The SSD (where your data is stored) is separate from the logic board and survives liquid damage in many cases. We assess data recoverability as part of our diagnostic. If the logic board cannot be repaired, we will advise on data recovery options.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Liquid Damage Repair Sandton',
  description: 'MacBook liquid damage repair for Sandton clients. Ultrasonic cleaning, board-level diagnostics. Collection from Sandton.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Sandton' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Liquid Damage', item: 'https://zasupport.com/liquid-damage' },
    { '@type': 'ListItem', position: 3, name: 'Sandton', item: 'https://zasupport.com/liquid-damage/sandton' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function LiquidDamageSandtonPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Liquid Damage', href: '/liquid-damage' },
            { label: 'Sandton' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 px-4 py-2 rounded-full mb-6">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span className="text-red-400 text-sm font-semibold">Act immediately — every hour matters</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Liquid Damage Repair Sandton
              <br /><span className="text-[#0FEA7A]">— Same-day Collection</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              MacBook exposed to liquid in Sandton? Switch it off now and contact us. We collect from Sandton immediately. Ultrasonic cleaning, board-level repair. Assessment from R599.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>Sandton is approx. 15 min from our Hyde Park workshop — we prioritise liquid damage collections</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: Clock, label: 'Same-day Collection' },
                { icon: CheckCircle, label: 'Ultrasonic Cleaning' },
                { icon: CheckCircle, label: 'Board-level Repair' },
                { icon: MapPin, label: 'Collect from Sandton' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <Icon className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('LIQ-SANDTON', 'liquid-damage')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
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
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">MacBook Liquid Damage Repair for Sandton Clients</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              Sandton is Johannesburg&apos;s commercial heart, and professionals in Sandton City, Morningside, and Katherine Street work under time pressure where a MacBook failure is a serious business interruption. Liquid damage is one of the most time-sensitive repairs we handle.
            </p>
            <p>
              ZA Support offers Sandton clients same-day emergency collection for liquid-damaged MacBooks. Our Hyde Park workshop at 1 Hyde Lane is approximately 9.5 km from central Sandton — a 15-minute drive. We collect from your office, meeting room, or home, and begin the cleaning and diagnostic process the same day.
            </p>
            <p>
              Our process includes full disassembly, ultrasonic cleaning of the logic board in an IPA-based bath to remove corrosion and contaminants, a post-clean diagnostic under magnification, and board-level component repair where required. Every repair is covered by a ZA Support warranty.
            </p>
            <p>
              Assessment from R599. No work proceeds without your written approval.
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
          <FAQAccordion items={faqs} title="MacBook Liquid Damage Repair Sandton — Common Questions" />
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
              { label: 'Sandton Logic Board', href: '/logic-board-repair/sandton' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Sandton MacBook Liquid Damage — Act Now.</h2>
            <p className="text-[#7A9E98] mb-6">Assessment from R599. Same-day collection from Sandton. Switch it off and call us.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('LIQ-SANDTON', 'liquid-damage')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
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
