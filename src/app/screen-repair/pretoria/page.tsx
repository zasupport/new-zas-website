import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Monitor, Zap, CheckCircle, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';
import PricingNote from '@/components/PricingNote';

export const metadata: Metadata = {
  title: 'MacBook Screen Repair Pretoria | ZA Support Hyde Park',
  description:
    'MacBook screen repair for Pretoria clients — Hatfield, Brooklyn, and surrounds. Cracked displays, backlight faults, and LCD damage repaired at our Hyde Park workshop. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/screen-repair/pretoria' },
};

const faults = [
  { title: 'Cracked Screen', desc: 'Physical impact cracks the LCD panel or outer glass. Full display assembly replacement restores your MacBook to a pristine, like-new condition.' },
  { title: 'Black Screen on Boot', desc: 'MacBook starts — fan runs, keyboard lights — but the display stays dark. Backlight failure, display cable fault, or GPU issue diagnosed before any part is ordered.' },
  { title: 'Backlight Failure', desc: 'Display shows a faint image visible with a torch but no backlight. Backlight fuse, driver board, or LED strip fault identified and repaired at component level.' },
  { title: 'Horizontal or Vertical Lines', desc: 'Coloured lines or bars across the display indicate a damaged LCD panel, failed T-Con board, or a display connector that has pulled loose.' },
  { title: 'Flickering Display', desc: 'Screen flickers intermittently or on lid movement. Often a loose display cable on Intel-era MacBook Pros. Diagnosed before any repair work begins.' },
  { title: 'Discolouration or Dead Pixels', desc: 'Yellow patches, discolouration, or clusters of dead pixels indicate LCD panel damage. Display replacement resolves this permanently.' },
  { title: 'Water Damage to Screen', desc: 'Liquid ingress behind the display causes streaks, dark patches, or pressure marks on the LCD. Panel replacement carried out after a full liquid damage assessment.' },
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
    question: 'Do you collect MacBooks from Pretoria for screen repairs?',
    answer: 'Yes. We offer a collection and return service for Pretoria clients. Your MacBook is collected from your home, office, or practice in Hatfield, Brooklyn, Menlyn, Lynnwood, or surrounding areas, repaired at our Hyde Park workshop, and returned once the work is complete. The drive between Pretoria and Hyde Park is approximately 55 minutes via the N1/N14. Contact us on WhatsApp or phone to arrange collection.',
  },
  {
    question: 'How long does a MacBook screen repair take for Pretoria clients?',
    answer: 'Most screen replacements are completed within 24–48 hours. Because we carry display assemblies for the most common MacBook models in stock, Pretoria clients can expect their machine back within one to two working days from collection. For less common configurations, we will confirm parts availability and a specific turnaround time when you contact us.',
  },
  {
    question: 'My MacBook screen cracked but it still works. Should I repair it now?',
    answer: 'Yes. A cracked display is a progressive fault — moisture ingress through the crack can damage the backlight, and a crack that starts small can spread under heat or light pressure. The longer it is left, the higher the risk of a more expensive repair. A display replacement now is significantly cheaper than replacing a display that has also suffered liquid ingress. We see this often from Pretoria clients who waited and ended up with a panel that needed full replacement due to moisture damage.',
  },
  {
    question: 'Are there any MacBook repairers closer to Pretoria or Hatfield?',
    answer: 'There are a handful of repair shops in the Pretoria area, but the standard of Mac-specific repair varies widely. Most do not carry out component-level repairs — they simply replace the full display assembly for every fault, whether it needs it or not. We diagnose first and only replace what is actually faulty. Our collection service means the distance to Hyde Park is not a barrier for Pretoria clients.',
  },
  {
    question: 'What is the difference between a display replacement and a screen repair?',
    answer: 'Display replacement means fitting a complete new display assembly — LCD panel, backlight, and outer glass — as a single unit. This is the standard approach for cracked screens. Screen repair refers to targeted component-level fault diagnosis for issues such as backlight failure or flickering, where the panel itself may be undamaged. We always diagnose the exact fault before recommending a replacement.',
  },
  {
    question: 'My MacBook Pro screen flickers when I move the lid. Is that fixable?',
    answer: 'Yes. Flickering on lid movement is a classic symptom of a loose or failing display cable on Intel MacBook Pro models, particularly the 13-inch 2016–2019 Touch Bar models. The cable runs through the hinge and develops stress fractures over time. It is a well-documented fault and does not require a full display replacement in most cases. We repair the cable and confirm the fault is resolved before returning the machine.',
  },
  {
    question: 'I am a student at the University of Pretoria. Can you collect from the UP campus?',
    answer: 'Yes. We collect from residential addresses, student accommodation, and offices in the Hatfield and Lynnwood areas near the University of Pretoria. Contact us via WhatsApp to arrange a collection point and time that works around your schedule.',
  },
  {
    question: 'Does screen replacement affect Touch ID or any biometric features?',
    answer: 'No. Touch ID on MacBook models is built into the keyboard or the power button — not the display. A screen or display replacement does not affect Touch ID in any way, and your biometric pairing remains intact after the repair.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Screen Repair Pretoria',
  description: 'MacBook screen repair and display replacement for Pretoria clients — Hatfield, Brooklyn, Menlyn, and surrounds. Collection from Pretoria, repair at Hyde Park workshop. Cracked screens, backlight, and display faults.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Pretoria' },
    { '@type': 'Neighborhood', name: 'Hatfield' },
    { '@type': 'Neighborhood', name: 'Brooklyn' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Screen Repair', item: 'https://zasupport.com/screen-repair' },
    { '@type': 'ListItem', position: 3, name: 'Pretoria', item: 'https://zasupport.com/screen-repair/pretoria' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function ScreenRepairPretoriaPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Screen Repair', href: '/screen-repair' },
            { label: 'Pretoria' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Screen Repair Pretoria
              <br /><span className="text-[#0FEA7A]">— Hyde Park Workshop</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              MacBook screen repair and display replacement for Pretoria clients. We collect from Hatfield, Brooklyn, Menlyn, and surrounding areas and carry out the repair at our Hyde Park workshop, approximately 55 minutes north.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>We collect from Pretoria and repair at our Hyde Park workshop, approx. 55 min via N1/N14</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: Monitor, label: 'Display Replacement' },
                { icon: Zap, label: '24–48 Hour Turnaround' },
                { icon: CheckCircle, label: 'Written Warranty' },
                { icon: MapPin, label: 'Collect from Pretoria' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <Icon className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('SCR-PRETORIA-HERO', 'screen-repair')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
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
            MacBook Screen Repair for Pretoria Residents and Professionals
          </h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              Pretoria has a dense population of MacBook users — students at the University of Pretoria, professionals in the Hatfield and Brooklyn business nodes, and government-sector workers throughout the city. A cracked or failed MacBook display in that environment means lost lectures, missed deadlines, and interrupted client work. We collect from Pretoria and have the machine repaired and returned within 24–48 hours.
            </p>
            <p>
              We collect from all Pretoria suburbs including Hatfield, Brooklyn, Lynnwood, Menlyn, Arcadia, Centurion North, and surrounding areas. Collections are arranged at a time that suits you — we understand that Pretoria clients cannot always plan around variable traffic on the N1. Our collection service removes that entirely.
            </p>
            <p>
              In our Hyde Park workshop we repair and replace displays on every MacBook model: MacBook Air (M1, M2, M3, and all Intel generations) and MacBook Pro (13-inch, 14-inch, 15-inch, and 16-inch). The most common screen faults we see from Pretoria clients are impact cracks — often from laptops knocked in bags or dropped on tiled floors — and backlight failures on older Intel MacBook Pros that have been running hard for three or more years.
            </p>
            <p>
              Not every display fault requires a full panel replacement. We see a significant number of MacBooks from Pretoria where the fault is a failing backlight fuse or a frayed display cable — both repairable at component level for a fraction of the cost of a new display assembly. We always diagnose before we quote, and we never start work without written approval.
            </p>
            <p>
              Every repair is backed by a written ZA Support warranty. For Pretoria clients in professional roles — legal, medical, or academic — we know that your MacBook is not just a device. We treat the repair accordingly.
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
            Our Screen Repair Process for Pretoria Clients
          </h2>
          <div className="space-y-6">
            {[
              { step: '01', title: 'Collection from Pretoria', desc: 'Contact us via WhatsApp or phone. We arrange a collection from your Pretoria address — Hatfield, Brooklyn, Menlyn, Lynnwood, or elsewhere — at a time that suits your schedule.' },
              { step: '02', title: 'Display Diagnostic', desc: 'We identify whether the fault is a physical panel, backlight, cable, or board-level issue. This determines the correct repair approach and cost.' },
              { step: '03', title: 'Written Quote', desc: 'Clear fixed-price quote covering the fault, repair method, and timeframe. No work starts until you approve in writing.' },
              { step: '04', title: 'Repair or Replacement', desc: 'Component-level repair where possible, full display replacement where necessary. Quality-matched panel fitted by our technician.' },
              { step: '05', title: 'Return to Pretoria', desc: 'Display tested across brightness levels and colour profiles. MacBook returned to your Pretoria address with a written warranty.' },
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
          <PricingNote variant="inline" />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="MacBook Screen Repair Pretoria, Common Questions" />
        </div>
      </section>

      {/* Other Areas */}
      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">We Also Serve These Areas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'Screen Repair Centurion', href: '/screen-repair/centurion' },
              { label: 'Screen Repair Sandton', href: '/screen-repair/sandton' },
              { label: 'Screen Repair Hub', href: '/screen-repair' },
              { label: 'Logic Board Repair', href: '/logic-board-repair' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Pretoria MacBook Screen Issue? We Collect.</h2>
            <p className="text-[#7A9E98] mb-6">24–48 hour turnaround. Written warranty. Hyde Park workshop.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('SCR-PRETORIA-HERO', 'screen-repair')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
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
