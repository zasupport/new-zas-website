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
  title: 'MacBook Screen Repair Morningside | ZA Support Hyde Park',
  description:
    'MacBook screen repair for Morningside clients. Just 3km from our Hyde Park workshop. Cracked displays, backlight failure, LCD faults. Same-day collection from Morningside Shopping Centre area. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/screen-repair/morningside' },
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
    question: 'Do you collect MacBooks from Morningside for screen repairs?',
    answer: 'Yes. Morningside is approximately 3km from our Hyde Park workshop — one of the closest suburbs we serve. We offer a same-day collection and return service for Morningside clients. Your MacBook is collected from your home, medical practice, or office near Morningside Shopping Centre and returned once the repair is complete. Contact us on WhatsApp to arrange collection.',
  },
  {
    question: 'How quickly can you repair a MacBook screen for a Morningside client?',
    answer: 'Given the short distance between Morningside and our Hyde Park workshop, turnaround is typically 24 hours for common MacBook models with display assemblies in stock. For less common configurations, we confirm availability and a specific timeframe when you contact us. Same-day collection and next-day return is achievable for most requests.',
  },
  {
    question: 'My MacBook screen cracked at home in Morningside. Can you come today?',
    answer: 'In most cases, yes. If you contact us in the morning via WhatsApp, we can arrange a same-day collection from your Morningside address. Given that we are only 3km away, collections from this area are straightforward to fit into the day. We will confirm availability when you message us.',
  },
  {
    question: 'I run a medical practice in Morningside. Do you handle screen repairs for practices?',
    answer: 'Yes. We work with medical practices throughout the Morningside and Sandton area. We understand that a MacBook used for clinical work, EMR systems, or patient-facing screens cannot be offline for long. We prioritise turnaround for professional clients and can collect from a reception desk with minimal disruption to your practice. A written warranty and service record is provided per machine.',
  },
  {
    question: 'What is the difference between a display replacement and a screen repair?',
    answer: 'Display replacement means fitting a complete new display assembly — LCD panel, backlight, and outer glass — as a single unit. This is the standard approach for cracked screens and physical damage. Screen repair refers to targeted component-level fault diagnosis for issues such as backlight failure or flickering, where the panel may be undamaged. We always diagnose the exact fault first and never replace more than is necessary.',
  },
  {
    question: 'My MacBook Pro screen flickers when I open the lid. Is that a display cable fault?',
    answer: 'Very likely, yes. Flickering on lid movement is a classic symptom of a loose or failing display cable on Intel MacBook Pro models — particularly the 13-inch 2016–2019 Touch Bar models. The cable runs through the hinge and develops stress fractures over time. It is a repairable fault that typically does not require a full display replacement, which saves a significant amount compared to fitting a new assembly.',
  },
  {
    question: 'Can I drop my MacBook off at your Hyde Park workshop instead of a collection?',
    answer: 'Yes. If it is more convenient for you to drop off and collect — and many Morningside clients do, given how close we are — you are welcome to bring the machine directly to our Hyde Park workshop at 1 Hyde Park Lane. Contact us first via WhatsApp to confirm availability and arrange a drop-off time.',
  },
  {
    question: 'Does screen replacement void my AppleCare warranty?',
    answer: 'If your MacBook is still under AppleCare, an Apple Authorised Service Provider is the correct first port of call for a display fault covered under warranty or accidental damage. However, if your AppleCare has expired, or if the fault is not covered, third-party repair by a specialist like ZA Support is a cost-effective alternative. We use quality-matched panels and provide a written warranty on all work.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Screen Repair Morningside',
  description: 'MacBook screen repair and display replacement for Morningside clients. Just 3km from Hyde Park workshop. Same-day collection from Morningside Shopping Centre area. Cracked screens, backlight faults, LCD damage.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Morningside' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Screen Repair', item: 'https://zasupport.com/screen-repair' },
    { '@type': 'ListItem', position: 3, name: 'Morningside', item: 'https://zasupport.com/screen-repair/morningside' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function ScreenRepairMorningsidePage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Screen Repair', href: '/screen-repair' },
            { label: 'Morningside' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Screen Repair Morningside
              <br /><span className="text-[#0FEA7A]">— Hyde Park Workshop</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              MacBook screen repair and display replacement for Morningside clients. Our Hyde Park workshop is just 3km from Morningside Shopping Centre — same-day collection available.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>Only 3km from Morningside Shopping Centre — same-day collection available</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: Monitor, label: 'Display Replacement' },
                { icon: Zap, label: 'Same-Day Collection' },
                { icon: CheckCircle, label: 'Written Warranty' },
                { icon: MapPin, label: '3km from Hyde Park' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <Icon className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('SCR-MORNINGSIDE-HERO', 'screen-repair')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
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
            MacBook Screen Repair for Morningside Residents and Practices
          </h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              Morningside is one of our closest service areas — just 3km east of Hyde Park along William Nicol Drive and Rivonia Road. For Morningside clients with a failed MacBook display, the combination of our proximity and same-day collection service means there is genuinely no disruption to your day. We collect in the morning, repair the screen at our Hyde Park workshop, and return the machine the following morning.
            </p>
            <p>
              We serve both residential clients in the Morningside estate and cluster-home areas, and professionals working from the Morningside Shopping Centre precinct and surrounding medical practices. A cracked screen or a sudden backlight failure should not mean days without your machine — and with Morningside this close, it does not have to.
            </p>
            <p>
              In our Hyde Park workshop we repair and replace displays on every MacBook model: MacBook Air (M1, M2, M3, and all Intel generations) and MacBook Pro (13-inch, 14-inch, 15-inch, and 16-inch). We carry display assemblies for the most common models in stock, which is why same-day collection and next-day return is realistic for Morningside clients.
            </p>
            <p>
              We do not replace every fault with a new display assembly. The most common screen repair we do for Morningside clients is a component-level backlight repair — often a failed backlight fuse that any shop will tell you requires a full panel replacement. We diagnose at component level, quote accurately, and only replace what is actually broken. Every repair is backed by a written ZA Support warranty.
            </p>
            <p>
              If your MacBook display has cracked, developed lines, gone dark, or started flickering — whether you are in Morningside, Dunkeld West, or Sandown — contact us on WhatsApp and we will sort a collection that works for you.
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
            Our Screen Repair Process for Morningside Clients
          </h2>
          <div className="space-y-6">
            {[
              { step: '01', title: 'Same-Day Collection from Morningside', desc: 'Contact us via WhatsApp or phone. We arrange a collection from your Morningside home, practice, or office — usually same-day given how close we are.' },
              { step: '02', title: 'Display Diagnostic', desc: 'We identify whether the fault is a physical panel, backlight, cable, or board-level issue. This determines the correct repair approach and cost.' },
              { step: '03', title: 'Written Quote', desc: 'Clear fixed-price quote covering the fault, repair method, and timeframe. No work starts until you approve in writing.' },
              { step: '04', title: 'Repair or Replacement', desc: 'Component-level repair where possible, full display replacement where necessary. Quality-matched panel fitted at our Hyde Park workshop.' },
              { step: '05', title: 'Return to Morningside', desc: 'Display tested across brightness levels and colour profiles. MacBook returned to your Morningside address the following morning, with a written warranty.' },
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
          <FAQAccordion items={faqs} title="MacBook Screen Repair Morningside, Common Questions" />
        </div>
      </section>

      {/* Other Areas */}
      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">We Also Serve These Areas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'Screen Repair Sandton', href: '/screen-repair/sandton' },
              { label: 'Screen Repair Rivonia', href: '/screen-repair/rivonia' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Morningside MacBook Screen Issue? We Collect Today.</h2>
            <p className="text-[#7A9E98] mb-6">3km from Hyde Park. Same-day collection. Written warranty.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('SCR-MORNINGSIDE-HERO', 'screen-repair')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
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
