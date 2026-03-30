import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Monitor, Zap, CheckCircle, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Screen Repair Paulshof | ZA Support Hyde Park',
  description:
    'MacBook screen repair for Paulshof clients. Cracked displays, backlight failure, LCD faults. We collect from Paulshof and repair at our Hyde Park workshop. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/screen-repair/paulshof' },
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
    question: 'Do you collect MacBooks from Paulshof for screen repairs?',
    answer: 'Yes. We collect from Paulshof — whether from a residential address or from the Country Club area — and bring your MacBook to our Hyde Park workshop, approximately 9km to the west. We return the machine once the repair is fully complete and tested. WhatsApp or call us to arrange a collection time that suits your schedule.',
  },
  {
    question: 'How long does a MacBook screen replacement take?',
    answer: 'Most screen replacements are completed within 24–48 hours. We stock display assemblies for the most common MacBook Air and MacBook Pro models. For less common configurations — such as a 16-inch M3 Max or an older mid-2012 model — we confirm parts availability and a turnaround time when you contact us.',
  },
  {
    question: 'My MacBook screen cracked but it still turns on. Is it urgent?',
    answer: 'Yes. A hairline crack in the outer glass or LCD panel is a progressive fault. Heat cycles during normal use expand the crack, the panel seal breaks, and moisture from the air enters the backlight layer. What starts as a small crack in one corner can become a full backlight failure within weeks. Replacing a cracked panel is considerably cheaper than replacing a panel that has also suffered liquid ingress behind the display.',
  },
  {
    question: 'What is the difference between a display replacement and a screen repair?',
    answer: 'Display replacement means fitting a complete new display assembly — LCD panel, backlight, and outer glass — as a single unit. This is the correct approach for physical damage and cracked screens. Screen repair refers to targeted component-level work for electronic faults: backlight failure, flickering caused by a fraying display cable, or GPU-related display issues. We diagnose the fault before recommending any approach.',
  },
  {
    question: 'My screen flickers when I move the lid. What causes that?',
    answer: 'Lid-movement flickering on Intel MacBook Pro models — especially the 13-inch 2016–2019 Touch Bar generation — is almost always caused by a failing display cable. The cable runs through the hinge and develops stress fractures under normal use over time. This is a documented Apple quality issue. In most cases it is a cable repair, not a full display replacement, which keeps the repair cost lower.',
  },
  {
    question: 'Does screen replacement affect Touch ID or any biometrics?',
    answer: 'No. Touch ID on MacBook models is integrated into the keyboard or the power button — not the display assembly. Replacing the screen does not touch the Touch ID sensor or its secure enclave pairing. Everything continues to work exactly as before.',
  },
  {
    question: 'Do you repair Apple Silicon MacBook screens from Paulshof?',
    answer: 'Yes. We repair and replace displays on all Apple Silicon MacBook models — MacBook Air M1, M2, M3 and MacBook Pro M1 Pro, M1 Max, M2 Pro, M2 Max, M3 Pro, and M3 Max. Apple Silicon display assemblies differ from Intel-era parts, and we source quality-matched panels appropriate to each generation. Every repair carries a written warranty.',
  },
  {
    question: 'How do I get started with a collection from Paulshof?',
    answer: 'Send us a WhatsApp message or call 064 529 5863. We will agree a collection time — from your home near the Paulshof Country Club or anywhere in the suburb. We collect, carry out the repair or diagnostic at our Hyde Park workshop, and return your MacBook to you. The written quote comes before any work begins, so there are no surprises.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Screen Repair Paulshof',
  description: 'MacBook screen repair and display replacement for Paulshof clients. Collection from Paulshof, repair at Hyde Park workshop. Cracked screens, backlight failure, and display faults on all MacBook models.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Paulshof' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Screen Repair', item: 'https://zasupport.com/screen-repair' },
    { '@type': 'ListItem', position: 3, name: 'Paulshof', item: 'https://zasupport.com/screen-repair/paulshof' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function ScreenRepairPaulshofPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Screen Repair', href: '/screen-repair' },
            { label: 'Paulshof' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Screen Repair Paulshof
              <br /><span className="text-[#0FEA7A]">— Hyde Park Workshop</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              MacBook screen repair and display replacement for Paulshof clients. We collect from Paulshof — including the Country Club area and residential streets near Woodmead — and repair at our Hyde Park workshop approximately 9km to the west.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>We collect from Paulshof and repair at our Hyde Park workshop, approx. 9km west</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: Monitor, label: 'Display Replacement' },
                { icon: Zap, label: '24–48 Hour Turnaround' },
                { icon: CheckCircle, label: 'Written Warranty' },
                { icon: MapPin, label: 'Collect from Paulshof' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <Icon className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('SCR-PAULSHOF-HERO', 'screen-repair')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
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
            MacBook Screen Repair for Paulshof Residents
          </h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              Paulshof is a quiet, well-established residential suburb on the north-east edge of Sandton, close to Woodmead and bordered by the natural ridge running through this part of Johannesburg. MacBook owners in Paulshof tend to work remotely or from home offices — and when a screen fails, there is no convenient walk-in option nearby. That is exactly why we offer a collection service from Paulshof directly to our Hyde Park workshop.
            </p>
            <p>
              Whether your MacBook Air took a knock and the display cracked, your MacBook Pro develops the characteristic grey lines and pressure marks from an aging LCD panel, or your screen simply went dark on boot, we diagnose the fault before recommending any repair. Most display faults we see from Paulshof clients fall into one of three categories: physical panel damage, backlight failure, or a fraying display cable — and not all of them require a full assembly replacement.
            </p>
            <p>
              We cover all MacBook models: MacBook Air (all Intel and Apple Silicon generations, 11-inch through 15-inch) and MacBook Pro (13-inch, 14-inch, 15-inch, and 16-inch, across both Intel and M-series). Every repair comes with a written ZA Support warranty so you have documented cover if a fault recurs.
            </p>
            <p>
              The collection process is straightforward. You contact us by WhatsApp or phone, we agree a time at your Paulshof address — near the Country Club, on the Woodmead border, or anywhere in between — and we handle the rest. No need to carry your MacBook across to a mall or a repair centre. We collect, repair, and return.
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
            Our Screen Repair Process for Paulshof Clients
          </h2>
          <div className="space-y-6">
            {[
              { step: '01', title: 'Collection from Paulshof', desc: 'Contact us via WhatsApp or phone. We arrange collection from your Paulshof address — home, home office, or anywhere in the suburb — at a time that suits your schedule.' },
              { step: '02', title: 'Display Diagnostic', desc: 'We identify the exact fault: physical panel damage, backlight component, display cable, or board-level issue. This determines the correct repair and cost.' },
              { step: '03', title: 'Written Quote', desc: 'Clear fixed-price quote covering fault, repair method, and turnaround. No work begins until you have approved it in writing.' },
              { step: '04', title: 'Repair or Replacement', desc: 'Component-level repair where the fault allows, full display replacement where the panel is physically damaged. Quality-matched parts throughout.' },
              { step: '05', title: 'Return to Paulshof', desc: 'Display tested across all brightness levels and colour accuracy checked. MacBook returned to your Paulshof address with a written warranty.' },
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
          <FAQAccordion items={faqs} title="MacBook Screen Repair Paulshof, Common Questions" />
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Paulshof MacBook Screen Issue? We Collect.</h2>
            <p className="text-[#7A9E98] mb-6">24–48 hour turnaround. Written warranty. Hyde Park workshop.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('SCR-PAULSHOF-HERO', 'screen-repair')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
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
