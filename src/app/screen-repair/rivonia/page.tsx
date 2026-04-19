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
  title: 'MacBook Screen Repair Rivonia | ZA Support Hyde Park',
  description:
    'MacBook screen repair for Rivonia clients near Rivonia Village and Sandton CBD. Cracked displays, backlight failure, and LCD faults. Collection service from Rivonia. Repair at our Hyde Park workshop. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/screen-repair/rivonia' },
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
    question: 'Do you collect MacBooks from Rivonia for screen repairs?',
    answer: 'Yes. We collect from Rivonia and return the repaired MacBook to you. Rivonia is approximately 8km north-east of our Hyde Park workshop — a straightforward drive along William Nicol Drive or Rivonia Road. We collect from residential addresses, Rivonia Village, and business parks in the area. Contact us on WhatsApp to arrange a convenient collection time.',
  },
  {
    question: 'How long does a MacBook screen repair take for Rivonia clients?',
    answer: 'Most screen replacements are completed within 24–48 hours. We carry display assemblies for the most common MacBook models in stock. For less common configurations — such as the 16-inch M3 Pro or certain older Intel models — we confirm parts availability and a specific timeframe when you contact us. Same-day collection and next-day return is achievable for most Rivonia clients.',
  },
  {
    question: 'My MacBook screen cracked. Should I repair it now or wait?',
    answer: 'Repair it now. A cracked display is a progressive fault — moisture ingress through the crack can damage the backlight over time, and a crack that starts small can spread under heat cycles. Waiting typically results in a more expensive repair. We have seen many MacBooks from the Rivonia and Sandton areas that came in with a small crack that had progressed to include backlight damage because the repair was deferred.',
  },
  {
    question: 'Are there screen repair shops closer to Rivonia than Hyde Park?',
    answer: 'There are general repair shops in the Sandton area, but the standard of Mac-specific component-level repair varies considerably. Most shops replace the full display assembly for every fault — including faults that only need a backlight fuse or cable repair. We diagnose at component level, quote accurately, and only replace what is actually faulty. Given that Rivonia is only 8km from our workshop and we offer a collection service, the distance is not a meaningful factor.',
  },
  {
    question: 'What is the difference between a display replacement and a screen repair?',
    answer: 'Display replacement means fitting a complete new display assembly — LCD panel, backlight, and outer glass — as a single unit. This is the standard approach for cracked or physically damaged screens. Screen repair refers to targeted component-level fault diagnosis for issues such as backlight failure, flickering, or a black screen where the panel is undamaged. We always diagnose first and never recommend a full replacement when targeted repair will resolve the fault.',
  },
  {
    question: 'My MacBook Pro flickers when I move the lid. Is this a display cable fault?',
    answer: 'Almost certainly yes. Flickering on lid movement is the defining symptom of a failing display cable on Intel MacBook Pro models, particularly the 13-inch 2016–2019 Touch Bar generation. The cable runs through the hinge mechanism and develops stress fractures over time. This is a repairable fault at component level — it does not require a full display assembly replacement and is significantly less expensive.',
  },
  {
    question: 'I work from a business park in Rivonia. Can you collect from my office?',
    answer: 'Yes. We collect from commercial premises throughout Rivonia, including business parks and cluster office developments. Contact us on WhatsApp and we will arrange a collection from reception or a designated point at your office. We understand that business clients need clarity on timing and a precise return schedule.',
  },
  {
    question: 'Does a screen replacement come with a warranty?',
    answer: 'Yes. Every display replacement at ZA Support comes with a written warranty. The warranty covers the panel, the replacement work, and any associated components that were repaired or replaced. If any fault related to the repair work arises within the warranty period, we resolve it at from R599.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Screen Repair Rivonia',
  description: 'MacBook screen repair and display replacement for Rivonia clients near Rivonia Village and Sandton CBD. Collection from Rivonia, repair at Hyde Park workshop. Cracked screens, backlight faults, and LCD damage.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Rivonia' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Screen Repair', item: 'https://zasupport.com/screen-repair' },
    { '@type': 'ListItem', position: 3, name: 'Rivonia', item: 'https://zasupport.com/screen-repair/rivonia' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function ScreenRepairRivoniaPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Screen Repair', href: '/screen-repair' },
            { label: 'Rivonia' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Screen Repair Rivonia
              <br /><span className="text-[#0FEA7A]">— Hyde Park Workshop</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              MacBook screen repair and display replacement for Rivonia clients. We collect from Rivonia Village, local business parks, and residential addresses and carry out the repair at our Hyde Park workshop, approximately 8km away.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>We collect from Rivonia and repair at our Hyde Park workshop, approx. 8km via Rivonia Road</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: Monitor, label: 'Display Replacement' },
                { icon: Zap, label: '24–48 Hour Turnaround' },
                { icon: CheckCircle, label: 'Written Warranty' },
                { icon: MapPin, label: 'Collect from Rivonia' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <Icon className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('SCR-RIVONIA-HERO', 'screen-repair')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
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
            MacBook Screen Repair for Rivonia Residents and Businesses
          </h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              Rivonia sits 8km north-east of Hyde Park — close enough that our collection and return service makes the repair genuinely quick and convenient. We collect from residential addresses, Rivonia Village, and the business park corridor between Rivonia and Sandton CBD. If your MacBook display has cracked, gone dark, or started showing lines or flickering, we can have it collected and back with you within 24–48 hours.
            </p>
            <p>
              We see a broad mix of MacBook faults from Rivonia clients. Impact cracks from bags dropped or MacBooks knocked off desks are the most common. Backlight failures on older Intel MacBook Pros are also frequent — particularly on machines that have been running hard for three or more years in a Rivonia home office or business. We also see a significant number of flickering display faults on Intel MacBook Pro models, which is almost always a cable fault rather than a panel fault.
            </p>
            <p>
              We repair and replace displays on all MacBook models: MacBook Air (M1, M2, M3, and all Intel generations) and MacBook Pro (13-inch, 14-inch, 15-inch, and 16-inch). In our Hyde Park workshop, every fault is diagnosed at component level before we quote. We do not replace a full display assembly when a targeted repair will resolve the fault — and we never start work without written approval.
            </p>
            <p>
              Rivonia and the surrounding Sandton north area has a high density of professional MacBook users — finance, consulting, and technology sectors — and we understand that a screen failure here is not a minor inconvenience. Our 24–48 hour turnaround is built around that reality. Every display replacement is backed by a written ZA Support warranty.
            </p>
            <p>
              Contact us on WhatsApp to arrange a collection from Rivonia. We will confirm a time the same day and provide a clear quote before any work begins.
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
            Our Screen Repair Process for Rivonia Clients
          </h2>
          <div className="space-y-6">
            {[
              { step: '01', title: 'Collection from Rivonia', desc: 'Contact us via WhatsApp or phone. We arrange a collection from your Rivonia home, Rivonia Village, or office park at a time that works for you.' },
              { step: '02', title: 'Display Diagnostic', desc: 'We identify whether the fault is a physical panel, backlight, cable, or board-level issue. This determines the correct repair approach and cost.' },
              { step: '03', title: 'Written Quote', desc: 'Clear fixed-price quote covering the fault, repair method, and timeframe. No work starts until you approve in writing.' },
              { step: '04', title: 'Repair or Replacement', desc: 'Component-level repair where possible, full display replacement where necessary. Quality-matched panel fitted by our technician at the Hyde Park workshop.' },
              { step: '05', title: 'Return to Rivonia', desc: 'Display tested across brightness levels and colour profiles. MacBook returned to your Rivonia address with a written warranty.' },
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
          <FAQAccordion items={faqs} title="MacBook Screen Repair Rivonia, Common Questions" />
        </div>
      </section>

      {/* Other Areas */}
      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">We Also Serve These Areas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'Screen Repair Sandton', href: '/screen-repair/sandton' },
              { label: 'Screen Repair Morningside', href: '/screen-repair/morningside' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Rivonia MacBook Screen Issue? We Collect.</h2>
            <p className="text-[#7A9E98] mb-6">24–48 hour turnaround. Written warranty. Hyde Park workshop.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('SCR-RIVONIA-HERO', 'screen-repair')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
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
