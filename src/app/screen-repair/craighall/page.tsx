import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, ArrowRight, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Screen Repair Craighall | ZA Support Hyde Park',
  description: 'MacBook screen repair for Craighall clients. Cracked display, pressure marks, flickering, backlight failure. Collection from Craighall. Assessment from R599.',
  alternates: { canonical: 'https://zasupport.com/screen-repair/craighall' },
};

const faults = [
  { title: 'Cracked Screen', desc: 'Impact cracks from drops, pressure, or objects placed on the closed lid. The Liquid Retina and Retina displays used in modern MacBooks are bonded to the front glass — a crack in the glass means the entire display assembly needs replacement. We carry stock for most models and replace same-day where possible.' },
  { title: 'Pressure Marks / Dead Pixels', desc: 'Dark spots or coloured patches caused by pressure on the display — often from something resting on the keyboard when the lid was closed. These are permanent LCD damage and require display replacement. We see this frequently from bags and backpacks where weight compressed the closed MacBook.' },
  { title: 'Flickering Display', desc: 'The screen flickers, strobes, or cuts in and out. This can be a display cable fault (flexgate on older models), a backlight driver IC failure on the logic board, or a failing display panel. Diagnosis determines the exact cause — cable and IC repairs are significantly cheaper than full display replacement.' },
  { title: 'Display Coating Wear', desc: 'The anti-reflective coating on Retina MacBook displays degrades over time, leaving uneven patches that look like stains. Apple ran a quality programme for certain models but it has expired. We replace the full display assembly with correct coating intact.' },
  { title: 'Backlight Failure', desc: 'The screen appears completely black but you can faintly see the desktop under bright light. The backlight circuit has failed — either a blown fuse, a failed backlight driver IC, or a damaged LED strip. On many models this is a board-level repair (R599 assessment) rather than a full display replacement, saving significant cost.' },
  { title: 'External Monitor Works, Built-in Does Not', desc: 'The MacBook drives an external display perfectly but the built-in screen is blank, flickering, or showing artefacts. This confirms the GPU and logic board are functional — the fault is in the display assembly, display cable, or display connector on the board. Targeted repair rather than board replacement.' },
];

const faqs = [
  {
    question: 'Do you collect MacBooks for screen repair from Craighall?',
    answer: 'Yes. Craighall is approximately 3 km from our Hyde Park workshop — roughly 5–8 minutes by car. We collect, assess the display fault, and provide a written quote before proceeding. WhatsApp 064 529 5863 to arrange.',
  },
  {
    question: 'How much does MacBook screen repair cost for Craighall clients?',
    answer: 'Assessment from R599. Screen replacement cost depends on the model — MacBook Air displays are less expensive than MacBook Pro Retina or Liquid Retina XDR. Apple charges R8,000–R25,000 for display replacement. Our pricing is significantly lower with the same quality result. Written quote before any work.',
  },
  {
    question: 'How long does MacBook screen repair take?',
    answer: 'Same-day for common models where we carry stock (MacBook Air M1/M2/M3, MacBook Pro 13/14/16-inch). Less common models may take 2–3 business days if a display needs to be sourced. Specific timeline provided in the written quote.',
  },
  {
    question: 'Will screen repair erase my data?',
    answer: 'No. Screen replacement is a physical display swap — the logic board, SSD, and all data-bearing components are not touched. Your files and applications are completely safe.',
  },
  {
    question: 'My screen is cracked but still displays — do I need to replace it?',
    answer: 'A cracked screen will continue to deteriorate — cracks spread over time, especially with temperature changes. Liquid can also enter through cracks and damage the display further. We recommend replacement before secondary damage occurs, but the machine remains usable in the interim.',
  },
  {
    question: 'Can you repair the backlight without replacing the entire screen?',
    answer: 'In many cases yes. If the backlight failure is caused by a blown fuse or failed driver IC on the logic board, we repair at component level — much cheaper than full display replacement. The R599 assessment determines whether it is a board fault or a display fault.',
  },
  {
    question: 'What is flexgate?',
    answer: 'Flexgate affected MacBook Pro 2016–2018 models where the display cable wore through from repeated opening and closing. It causes a backlight that only works at certain angles or a stage-light effect at the bottom of the screen. We repair with a revised cable design that prevents recurrence.',
  },
  {
    question: 'Do you use genuine Apple screens?',
    answer: 'We use genuine-spec replacement displays — same resolution, colour gamut (P3), brightness, and True Tone compatibility. On newer models with True Tone, calibration is performed post-replacement to restore automatic colour temperature adjustment.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Screen Repair Craighall',
  description: 'MacBook screen repair for Craighall clients. Cracked display, pressure marks, backlight failure. Assessment from R599.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Place', name: 'Craighall' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Screen Repair', item: 'https://zasupport.com/screen-repair' },
    { '@type': 'ListItem', position: 3, name: 'Craighall', item: 'https://zasupport.com/screen-repair/craighall' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function ScreenRepairCraighallPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Screen Repair', href: '/screen-repair' },
            { label: 'Craighall' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Screen Repair
              <br /><span className="text-[#0FEA7A]">Craighall</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              MacBook screen repair for Craighall clients. Cracked display, pressure marks, flickering, backlight failure, and display coating damage. Assessment from R599 at our Hyde Park workshop. Collection from Craighall — approximately 3 km, 5–8 minutes by car.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>Hyde Park, Johannesburg | Assessment from R599 | Collecting from Craighall — approx 5–8 min drive</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {['Same-Day Available', 'No Fix No Fee', 'Written Warranty', 'Assessment from R599'].map((l) => (
                <div key={l} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <CheckCircle className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{l}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('SR-CRAIGHALL', 'screen')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
                WhatsApp for Quote
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link href="/screen-repair" className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all">
                All Screen Repair <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">MacBook Screen Faults We Repair for Craighall Clients</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">Craighall is approximately 3 km from our Hyde Park workshop. All MacBook models from 2015 onwards are covered — Retina, Liquid Retina, and Liquid Retina XDR displays. Every fault is assessed before quoting, and many display issues can be resolved at board level without replacing the full screen assembly.</p>
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
          <FAQAccordion items={faqs} title={`MacBook Screen Repair Craighall — Common Questions`} />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Services</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'Screen Repair Hub', href: '/screen-repair' },
              { label: 'Logic Board Repair Craighall', href: '/logic-board-repair/craighall' },
              { label: 'Liquid Damage Craighall', href: '/liquid-damage/craighall' },
              { label: 'Battery Replacement Craighall', href: '/battery-replacement/craighall' },
              { label: 'MacBook Pro Screen', href: '/screen-repair/macbook-pro' },
              { label: 'MacBook Air Screen', href: '/screen-repair/macbook-air' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">MacBook Screen Damaged? Assessment from R599.</h2>
            <p className="text-[#7A9E98] mb-6">Collecting from Craighall. Same-day available. No Fix No Fee.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('SR-CRAIGHALL', 'screen')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
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
