import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Monitor, Zap, CheckCircle, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Screen Repair Parkhurst | ZA Support Hyde Park',
  description:
    'MacBook screen repair for Parkhurst clients. Cracked displays, backlight failure, LCD faults. We collect from 4th Avenue, Parkhurst and repair at our Hyde Park workshop. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/screen-repair/parkhurst' },
};

const faults = [
  { title: 'Cracked Screen', desc: 'Physical impact cracks the LCD panel or outer glass. Full display assembly replacement restores your Mac to a pristine condition.' },
  { title: 'Black Screen on Boot', desc: 'MacBook starts — fan runs, keyboard lights — but screen stays dark. Backlight failure, display cable fault, or GPU issue diagnosed before any part is ordered.' },
  { title: 'Backlight Failure', desc: 'Display shows a faint image visible with a torch but no backlight. Backlight fuse, driver board, or LED strip fault identified and repaired.' },
  { title: 'Horizontal or Vertical Lines', desc: 'Coloured lines or bars across the display indicate a damaged LCD panel, failed T-Con board, or display connector fault.' },
  { title: 'Flickering Display', desc: 'Screen flickers intermittently or on movement. Often a loose display cable on Intel-era MacBook Pros, or a GPU fault. Diagnosed before repair.' },
  { title: 'Discolouration or Dead Pixels', desc: 'Yellow patches, discolouration, or clusters of dead pixels indicate LCD panel damage. Display replacement resolves this permanently.' },
  { title: 'Water Damage to Screen', desc: 'Liquid ingress behind the display causes streaks, dark patches, or pressure marks on the LCD. Panel replacement after liquid damage assessment.' },
  { title: 'Display Only Half Working', desc: 'Part of the screen is blank or showing artefacts while the rest displays normally. Panel, cable, or GPU fault traced and repaired.' },
];

const pricing = [
  { item: 'MacBook Air Display Replacement', note: 'All Intel and Apple Silicon MacBook Air models' },
  { item: 'MacBook Pro 13-inch Display Replacement', note: 'Retina display replacement, all generations' },
  { item: 'MacBook Pro 14/16-inch Display Replacement', note: 'Liquid Retina XDR, M-series models' },
  { item: 'MacBook Pro 15-inch Display Replacement', note: 'Intel-era 15-inch Retina models' },
  { item: 'Backlight / Display Cable Repair', note: 'Component-level backlight fault repair' },
  { item: 'Screen Diagnostic', note: 'Full display and GPU diagnostic assessment' },
];

const faqs = [
  {
    question: 'Do you collect MacBooks from Parkhurst for screen repairs?',
    answer: 'Yes. We collect from Parkhurst — whether from a home near 4th Avenue, a studio, or a home office in the suburb — and bring your MacBook to our Hyde Park workshop approximately 6km to the north-east. We return the machine once the repair is complete. WhatsApp or call us to arrange a convenient time.',
  },
  {
    question: 'How long does a MacBook screen replacement take?',
    answer: 'Most screen replacements are completed within 24–48 hours. We stock display assemblies for the most common MacBook Air and MacBook Pro configurations. For less common models we confirm parts availability when you contact us. Parkhurst clients typically have their machine back within the same working week.',
  },
  {
    question: 'My MacBook screen cracked but the laptop still works. Is it worth repairing?',
    answer: 'Yes, and the sooner the better. A cracked display is a progressive fault — the crack spreads with heat cycles, the LCD seal fails, and moisture gets in behind the panel. Johannesburg\'s summer rains make this worse. A clean cracked panel replaced within a week or two is a predictable, straightforward repair. The same panel left for a month or more often requires additional work once moisture has reached the backlight layer. Repair costs more at that stage.',
  },
  {
    question: 'What is the difference between a display replacement and a screen repair?',
    answer: 'Display replacement fits a complete new assembly — LCD panel, backlight, and outer glass — as a single unit. This is appropriate for cracked panels and physical damage. Screen repair refers to targeted component-level work for electronic faults: backlight driver failure, intermittent flickering from a fraying display cable, or GPU-linked display issues where the panel itself is intact. We always diagnose before recommending either approach.',
  },
  {
    question: 'My MacBook Pro screen flickers when I move the lid. What does that mean?',
    answer: 'On Intel MacBook Pro models — particularly the 13-inch 2016–2019 Touch Bar range — lid-movement flickering is almost always a display cable fault. The cable passes through the hinge and develops stress fractures over time. Left unrepaired it progresses to a completely dark screen. In most cases this is a targeted cable repair rather than a full display replacement, which significantly reduces the cost compared to waiting for a complete failure.',
  },
  {
    question: 'Does screen replacement affect Touch ID on my MacBook?',
    answer: 'No. Touch ID on all MacBook models is integrated into the keyboard or the power button — not the display. Replacing the display assembly has no effect on Touch ID, its secure enclave pairing, or any other input. Everything works exactly as before once the new panel is fitted.',
  },
  {
    question: 'Do you work on Apple Silicon MacBooks from Parkhurst?',
    answer: 'Yes. We repair and replace displays on all Apple Silicon MacBook models — MacBook Air M1, M2, M3 and MacBook Pro M1 Pro, M1 Max, M2 Pro, M2 Max, M3 Pro, M3 Max. Apple Silicon display assemblies use different components from Intel-era models, and we source quality-matched panels for each generation. All repairs come with a written ZA Support warranty.',
  },
  {
    question: 'How do I get started with a collection from Parkhurst?',
    answer: 'Send us a WhatsApp message or call 064 529 5863. We agree a collection time at your Parkhurst address — 4th Avenue area, residential streets, or wherever suits you. We collect, carry out the repair or diagnostic at our Hyde Park workshop, and return your MacBook to you. No need to travel to a repair centre.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Screen Repair Parkhurst',
  description: 'MacBook screen repair and display replacement for Parkhurst clients. Collection from 4th Avenue and surrounding streets, repair at Hyde Park workshop 6km away. All display faults on all MacBook models.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Parkhurst' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Screen Repair', item: 'https://zasupport.com/screen-repair' },
    { '@type': 'ListItem', position: 3, name: 'Parkhurst', item: 'https://zasupport.com/screen-repair/parkhurst' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function ScreenRepairParkhursPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Screen Repair', href: '/screen-repair' },
            { label: 'Parkhurst' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Screen Repair Parkhurst
              <br /><span className="text-[#0FEA7A]">— Hyde Park Workshop</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              MacBook screen repair and display replacement for Parkhurst clients. We collect from the 4th Avenue area and surrounding streets, and carry out the repair at our Hyde Park workshop approximately 6km to the north-east.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>We collect from Parkhurst and repair at our Hyde Park workshop, approx. 6km north-east</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: Monitor, label: 'Display Replacement' },
                { icon: Zap, label: '24–48 Hour Turnaround' },
                { icon: CheckCircle, label: 'Written Warranty' },
                { icon: MapPin, label: 'Collect from Parkhurst' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <Icon className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('SCR-PARKHURST-HERO', 'screen-repair')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
                WhatsApp for Quote
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all">
                Book Collection <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">
            MacBook Screen Repair for Parkhurst Residents and Creative Professionals
          </h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              Parkhurst is one of Johannesburg's most distinctive inner suburbs — defined by the boutique shops, cafes, and restaurants along 4th Avenue, and by a high concentration of designers, architects, writers, and creative professionals who call it home. For many of them, a MacBook is not just a work machine; it is the primary tool for every billable hour. A failed screen is a direct revenue problem.
            </p>
            <p>
              We collect from Parkhurst and bring MacBooks to our Hyde Park workshop — approximately 6km north-east along Jan Smuts Avenue. Most screen repairs are completed within 24–48 hours, and the machine is returned to your Parkhurst address once we have confirmed the display is performing correctly at all brightness levels. For straightforward panel replacements on common models, same-day turnaround is sometimes possible — contact us to check.
            </p>
            <p>
              In our Hyde Park workshop, the most frequent display faults we diagnose on machines from Parkhurst are: cracked LCD panels (usually from a drop or from a bag being overpacked), backlight failure where the screen is dark but the machine is otherwise running, and intermittent flickering that worsens on lid movement — a documented cable fault on Intel MacBook Pro 13-inch models from 2016 to 2019. All three are repairable without replacing the entire machine.
            </p>
            <p>
              We cover every current and recent MacBook model. MacBook Air 11-inch through 15-inch, Intel and Apple Silicon. MacBook Pro 13-inch through 16-inch, Intel Core through M3 Max. Not every fault requires a full display replacement — and we diagnose before quoting to ensure the repair is right-sized to the actual fault. Written quote, written warranty, no surprises.
            </p>
          </div>
        </div>
      </section>

      {/* Fault Types */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-10 text-center">
            Screen and Display Faults We Repair
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {faults.map((fault) => (
              <div key={fault.title} className="glass-card p-5">
                <h3 className="text-[#E8F4F1] font-bold mb-2">{fault.title}</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{fault.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8">
            Our Screen Repair Process for Parkhurst Clients
          </h2>
          <div className="space-y-6">
            {[
              { step: '01', title: 'Collection from Parkhurst', desc: 'Contact us via WhatsApp or phone. We arrange a collection at your Parkhurst address — 4th Avenue area, residential streets, or anywhere in the suburb — at a time that works for you.' },
              { step: '02', title: 'Display Diagnostic', desc: 'We identify the exact fault: physical panel, backlight component, display cable, or board-level issue. This determines the correct repair and cost.' },
              { step: '03', title: 'Written Quote', desc: 'Fixed-price written quote covering the fault, repair method, and turnaround. No work begins without your written approval.' },
              { step: '04', title: 'Repair or Replacement', desc: 'Component-level repair where the fault allows, full display replacement where the panel requires it. Quality-matched parts throughout.' },
              { step: '05', title: 'Return to Parkhurst', desc: 'Display tested at all brightness levels and on lid movement. MacBook returned to your Parkhurst address with a written ZA Support warranty.' },
            ].map(({ step, title, desc }) => (
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

      {/* Pricing */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8">Screen Repair Services</h2>
          <div className="glass-card overflow-hidden p-0">
            {pricing.map((item, i) => (
              <div key={item.item} className={`p-5 ${i < pricing.length - 1 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}>
                <p className="text-[#E8F4F1] font-semibold">{item.item}</p>
                <p className="text-[#7A9E98] text-xs mt-0.5">{item.note}</p>
              </div>
            ))}
          </div>
          <p className="text-[#7A9E98] text-xs mt-3">Final price confirmed after diagnostic. Written quote before any work begins.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="MacBook Screen Repair Parkhurst, Common Questions" />
        </div>
      </section>

      {/* Other Areas */}
      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">We Also Serve These Areas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'Screen Repair Sandton', href: '/screen-repair/sandton' },
              { label: 'Screen Repair Hub', href: '/screen-repair' },
              { label: 'Logic Board Repair', href: '/logic-board-repair' },
              { label: 'Logic Board Rosebank', href: '/logic-board-repair/rosebank' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Parkhurst MacBook Screen Issue? We Collect.</h2>
            <p className="text-[#7A9E98] mb-6">24–48 hour turnaround. Written warranty. Hyde Park workshop.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('SCR-PARKHURST-HERO', 'screen-repair')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
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
