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
  title: 'MacBook Screen Repair Sunninghill | ZA Support Hyde Park',
  description:
    'MacBook screen repair for Sunninghill clients. Cracked displays, backlight failure, LCD faults. We collect from Sunninghill Village and repair at our Hyde Park workshop. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/screen-repair/sunninghill' },
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
    question: 'Do you collect MacBooks from Sunninghill for screen repairs?',
    answer: 'Yes. We collect from Sunninghill — including Sunninghill Village and the tech office precinct along Leeuwkop Road — and bring your MacBook to our Hyde Park workshop, roughly 10km to the south-west. We return the machine once the repair is complete. Contact us on WhatsApp or by phone to arrange a convenient time.',
  },
  {
    question: 'How long does a MacBook screen replacement take from Sunninghill?',
    answer: 'Most screen replacements are completed within 24–48 hours. We carry display assemblies for the most common MacBook models. For less common configurations, we will confirm parts availability and a specific turnaround when you contact us. Sunninghill clients working from home or from the nearby technology parks benefit from our same-week turnaround.',
  },
  {
    question: 'My MacBook screen cracked but the machine still works. Do I need to act now?',
    answer: 'Yes, the sooner the better. A cracked panel is a progressive fault — small cracks spread with heat cycles and light pressure, and a crack that breaks the seal on the display allows moisture in. Moisture ingress leads to backlight damage, dead pixels, and pressure marks. A straightforward display replacement now costs significantly less than repairing a screen that has also suffered liquid damage inside the panel.',
  },
  {
    question: 'What is the difference between a display replacement and a screen repair?',
    answer: 'Display replacement fits a complete new assembly: LCD panel, backlight, and outer glass as a single unit. This is the standard approach for cracked screens and physical damage. Screen repair refers to targeted component-level fault diagnosis for issues such as backlight failure, flickering, or black screen — where the panel itself may be undamaged. We always diagnose the exact fault before recommending a replacement.',
  },
  {
    question: 'My MacBook Pro screen flickers when I move the lid. Can you fix that?',
    answer: 'Yes. Flickering on lid movement is a well-known symptom of a failing display cable on Intel MacBook Pro models — particularly the 13-inch 2016–2019 Touch Bar range. The cable runs through the hinge and develops stress fractures over time. In most cases this is a targeted cable repair, not a full display replacement. We diagnose the fault first so you are not paying for parts you do not need.',
  },
  {
    question: 'Does a screen replacement affect Touch ID on my MacBook?',
    answer: 'No. Touch ID on all MacBook models is built into the keyboard or the power button, not the display assembly. A screen replacement does not touch the Touch ID sensor or its secure enclave pairing. Your fingerprint data remains intact and fully functional after a display replacement.',
  },
  {
    question: 'Do you repair screens on Apple Silicon MacBooks from Sunninghill?',
    answer: 'Yes. We repair and replace displays on all Apple Silicon MacBook models — MacBook Air M1, M2, M3 and MacBook Pro M1 Pro, M1 Max, M2 Pro, M2 Max, M3 Pro, M3 Max. Apple Silicon display assemblies are different from Intel-era parts and we source quality-matched panels for each generation. All repairs carry a written ZA Support warranty.',
  },
  {
    question: 'How do I arrange a collection from Sunninghill?',
    answer: 'Send us a WhatsApp message or call 064 529 5863. We will confirm a collection time at your home or office — Sunninghill Village, the tech parks near Leeuwkop Road, or anywhere nearby. We collect, repair at our Hyde Park workshop, and return your MacBook to your Sunninghill address. No need to travel to a repair centre.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Screen Repair Sunninghill',
  description: 'MacBook screen repair and display replacement for Sunninghill clients. Collection from Sunninghill Village and tech offices, repair at Hyde Park workshop. Cracked screens, backlight, and display faults.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Sunninghill' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Screen Repair', item: 'https://zasupport.com/screen-repair' },
    { '@type': 'ListItem', position: 3, name: 'Sunninghill', item: 'https://zasupport.com/screen-repair/sunninghill' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function ScreenRepairSunninghillPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Screen Repair', href: '/screen-repair' },
            { label: 'Sunninghill' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Screen Repair Sunninghill
              <br /><span className="text-[#0FEA7A]">— Hyde Park Workshop</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              MacBook screen repair and display replacement for Sunninghill clients. We collect from Sunninghill Village and the surrounding tech offices, and repair at our Hyde Park workshop approximately 10km to the south-west.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>We collect from Sunninghill and repair at our Hyde Park workshop, approx. 10km south-west</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: Monitor, label: 'Display Replacement' },
                { icon: Zap, label: '24–48 Hour Turnaround' },
                { icon: CheckCircle, label: 'Written Warranty' },
                { icon: MapPin, label: 'Collect from Sunninghill' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <Icon className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('SCR-SUNNINGHILL-HERO', 'screen-repair')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
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
            MacBook Screen Repair for Sunninghill Residents and Businesses
          </h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              A cracked or failed MacBook display is one of the most common repairs we carry out for Sunninghill clients. Whether your screen was damaged in transit, developed a flickering fault from a fraying display cable, or simply went dark overnight, ZA Support offers a collection service from Sunninghill and a fast, professional repair at our Hyde Park workshop.
            </p>
            <p>
              Sunninghill is home to a large concentration of technology companies, software consultancies, and remote workers — many of them operating MacBook Pros as their primary workstation. A failed display in that context is not merely inconvenient; it halts client work, coding sessions, and video calls completely. We have seen this enough times to keep display assemblies for the most common MacBook models in stock so we can turn repairs around within 24–48 hours.
            </p>
            <p>
              We collect from Sunninghill Village, the tech office parks along Leeuwkop Road, and surrounding residential streets. Your MacBook travels to our Hyde Park workshop — roughly 10km south-west — and returns once the repair is complete and fully tested. Most Sunninghill clients are back at full capacity within the same working week.
            </p>
            <p>
              We repair and replace displays on all MacBook models including MacBook Air (M1, M2, M3 and all Intel generations) and MacBook Pro (13-inch, 14-inch, 15-inch, and 16-inch, Intel and M-series). Not every display fault requires a full panel replacement — backlight failures, flickering from a failing display cable, and board-level faults are repaired at component level where possible, keeping costs as low as the fault allows.
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
            Our Screen Repair Process for Sunninghill Clients
          </h2>
          <div className="space-y-6">
            {[
              { step: '01', title: 'Collection from Sunninghill', desc: 'Contact us via WhatsApp or phone. We arrange a collection from your home or office in Sunninghill — Village, Leeuwkop Road tech parks, or surrounding streets — at a time that suits you.' },
              { step: '02', title: 'Display Diagnostic', desc: 'We identify whether the fault is a physical panel, backlight, cable, or board-level issue. This determines the correct repair approach and cost before any work begins.' },
              { step: '03', title: 'Written Quote', desc: 'Clear fixed-price quote covering the fault, repair method, and turnaround time. No work starts until you approve in writing.' },
              { step: '04', title: 'Repair or Replacement', desc: 'Component-level repair where possible, full display replacement where necessary. Quality-matched panel fitted by our technician at our Hyde Park workshop.' },
              { step: '05', title: 'Return to Sunninghill', desc: 'Display tested across brightness levels and colour profiles. MacBook returned to your Sunninghill address with a written ZA Support warranty.' },
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
          <FAQAccordion items={faqs} title="MacBook Screen Repair Sunninghill, Common Questions" />
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
              { label: 'Logic Board Sandton', href: '/logic-board-repair/sandton' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Sunninghill MacBook Screen Issue? We Collect.</h2>
            <p className="text-[#7A9E98] mb-6">24–48 hour turnaround. Written warranty. Hyde Park workshop.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('SCR-SUNNINGHILL-HERO', 'screen-repair')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
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
