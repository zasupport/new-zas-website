import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Monitor, Zap, CheckCircle, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Screen Repair Northcliff | ZA Support Hyde Park',
  description:
    'MacBook screen repair for Northcliff clients. Cracked displays, backlight failure, LCD faults fixed. We collect from Northcliff Ridge and repair at our Hyde Park workshop. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/screen-repair/northcliff' },
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
    question: 'Do you collect MacBooks from Northcliff for screen repairs?',
    answer: 'Yes. We collect from Northcliff — including the Ridge, Northcliff Hill, and the streets around Northcliff Corner — and bring your MacBook to our Hyde Park workshop, approximately 12km to the east. We return the machine once the repair is complete and tested. Contact us on WhatsApp or by phone to arrange a suitable time.',
  },
  {
    question: 'How long does a MacBook screen replacement take?',
    answer: 'Most screen replacements are completed within 24–48 hours. We keep display assemblies for the most common MacBook Air and MacBook Pro models in stock. For less common configurations we confirm parts availability and a specific turnaround when you get in touch. Northcliff clients typically have their MacBook back within the same working week.',
  },
  {
    question: 'Is a cracked MacBook screen an urgent repair?',
    answer: 'Yes. A cracked display is not cosmetic — it is a structural and moisture risk. The LCD seal breaks at the crack line, allowing humidity to enter the backlight layer during Johannesburg summer rains. We have replaced panels where a small crack in one corner has progressed to full backlight failure because the repair was delayed by a few weeks. Acting early is always cheaper.',
  },
  {
    question: 'What is the difference between a display replacement and a screen repair?',
    answer: 'Display replacement fits a complete new assembly — LCD panel, backlight, and outer glass — as a single unit. This is the appropriate approach for cracked panels and physical damage. Screen repair refers to targeted component-level work for electronic faults: backlight driver failure, flickering from a fraying display cable, or GPU-related display issues where the panel is intact. We diagnose the fault precisely before recommending either approach.',
  },
  {
    question: 'My screen flickers intermittently — is that serious?',
    answer: 'Yes, especially on Intel MacBook Pro models. Intermittent flickering — particularly flickering that worsens on lid movement — is typically a failing display cable running through the hinge. Left unrepaired, the cable fractures fully and the screen goes dark permanently. We have seen this progression many times in our Hyde Park workshop. Early cable repair is substantially cheaper than replacing the cable after the display has gone completely dark.',
  },
  {
    question: 'Does screen replacement affect Touch ID on my MacBook?',
    answer: 'No. Touch ID on all MacBook models is integrated into the keyboard or power button, not the display assembly. A screen replacement has no effect on Touch ID pairing or function. Your fingerprint data and secure enclave pairing remain completely intact.',
  },
  {
    question: 'Do you repair Apple Silicon MacBook screens from Northcliff?',
    answer: 'Yes. We repair and replace displays on all Apple Silicon models — MacBook Air M1, M2, M3 and MacBook Pro M1 Pro, M1 Max, M2 Pro, M2 Max, M3 Pro, and M3 Max. Apple Silicon display assemblies use different components from Intel-era panels, and we source quality-matched parts for each generation. All repairs carry a written ZA Support warranty.',
  },
  {
    question: 'How do I arrange a MacBook collection from Northcliff?',
    answer: 'Send us a WhatsApp message or call 064 529 5863. We will agree a collection time at your Northcliff address — on the Ridge, near Northcliff Corner, or anywhere in the suburb. We collect, carry out the repair at our Hyde Park workshop, and return your MacBook to you. The written quote is provided before any work starts.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Screen Repair Northcliff',
  description: 'MacBook screen repair and display replacement for Northcliff clients. Collection from Northcliff Ridge and surrounding area, repair at Hyde Park workshop. All display faults on all MacBook models.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Northcliff' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Screen Repair', item: 'https://zasupport.com/screen-repair' },
    { '@type': 'ListItem', position: 3, name: 'Northcliff', item: 'https://zasupport.com/screen-repair/northcliff' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function ScreenRepairNorthcliffPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Screen Repair', href: '/screen-repair' },
            { label: 'Northcliff' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Screen Repair Northcliff
              <br /><span className="text-[#0FEA7A]">— Hyde Park Workshop</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              MacBook screen repair and display replacement for Northcliff clients. We collect from Northcliff Ridge, Northcliff Hill, and the Northcliff Corner area, and carry out the repair at our Hyde Park workshop approximately 12km to the east.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>We collect from Northcliff and repair at our Hyde Park workshop, approx. 12km east</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: Monitor, label: 'Display Replacement' },
                { icon: Zap, label: '24–48 Hour Turnaround' },
                { icon: CheckCircle, label: 'Written Warranty' },
                { icon: MapPin, label: 'Collect from Northcliff' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <Icon className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('SCR-NORTHCLIFF-HERO', 'screen-repair')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
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
            MacBook Screen Repair for Northcliff Residents
          </h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              Northcliff sits on a ridge to the west of Johannesburg, a well-established residential area with a mix of creative professionals, families, and small businesses operating from home offices. It is not a suburb with a convenient Apple reseller or specialist repair centre nearby — which is why our collection service from Northcliff to our Hyde Park workshop matters to clients here.
            </p>
            <p>
              We collect from across Northcliff — the Ridge, Northcliff Hill, the streets around Northcliff Corner shopping centre — and carry the MacBook across to our workshop on Hyde Park Lane, roughly 12km to the east. Most screen repairs and display replacements are completed within 24–48 hours, with the machine returned to your Northcliff address once we have confirmed the display is performing correctly.
            </p>
            <p>
              The most common display faults we handle for Northcliff clients are: cracked LCD panels (usually from a drop or compression in a bag), backlight failure (screen dark, faint image visible under torchlight), and intermittent flickering from a failing display cable — a documented fault on Intel MacBook Pro 13-inch models from 2016 to 2019. All three are repairable, and we diagnose before quoting to ensure you only pay for what the fault actually requires.
            </p>
            <p>
              We repair and replace displays on all MacBook models. MacBook Air — 11-inch, 13-inch, 15-inch, all Intel and Apple Silicon generations. MacBook Pro — 13-inch, 14-inch, 15-inch, and 16-inch, Intel and M-series. Every repair carries a written warranty. Final price is quoted after the diagnostic and confirmed before any work begins.
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
            Our Screen Repair Process for Northcliff Clients
          </h2>
          <div className="space-y-6">
            {[
              { step: '01', title: 'Collection from Northcliff', desc: 'Contact us via WhatsApp or phone. We arrange a collection at your Northcliff address — Ridge, Hill, or near Northcliff Corner — at a time that works for you.' },
              { step: '02', title: 'Display Diagnostic', desc: 'We identify the exact fault: physical panel damage, backlight component, display cable, or board-level issue. This shapes the correct repair approach and cost estimate.' },
              { step: '03', title: 'Written Quote', desc: 'Clear fixed-price quote covering fault, repair method, and turnaround time. No work starts until you approve it in writing.' },
              { step: '04', title: 'Repair or Replacement', desc: 'Component-level repair where possible, full display replacement where the panel is damaged. Quality-matched parts fitted at our Hyde Park workshop.' },
              { step: '05', title: 'Return to Northcliff', desc: 'Display tested at full brightness, across colour profiles, and on lid movement. MacBook returned to your Northcliff address with a written warranty.' },
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
          <FAQAccordion items={faqs} title="MacBook Screen Repair Northcliff, Common Questions" />
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
              { label: 'Logic Board Randburg', href: '/logic-board-repair/randburg' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Northcliff MacBook Screen Issue? We Collect.</h2>
            <p className="text-[#7A9E98] mb-6">24–48 hour turnaround. Written warranty. Hyde Park workshop.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('SCR-NORTHCLIFF-HERO', 'screen-repair')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
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
