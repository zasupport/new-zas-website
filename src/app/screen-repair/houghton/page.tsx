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
  title: 'MacBook Screen Repair Houghton | ZA Support Hyde Park',
  description:
    'MacBook screen repair for Houghton clients. Cracked displays, backlight failure, LCD faults. We collect from Houghton and repair at our Hyde Park workshop, 4km away. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/screen-repair/houghton' },
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
    question: 'Do you collect MacBooks from Houghton for screen repairs?',
    answer: 'Yes. Houghton is one of our closest collection areas — approximately 4km south-east of our Hyde Park workshop. We collect from residential addresses, home offices, and anywhere in Houghton including the Golf Course area, Killarney border, and the embassy strip. Contact us on WhatsApp or by phone to agree a time.',
  },
  {
    question: 'How long does a MacBook screen replacement take from Houghton?',
    answer: 'Most screen replacements are completed within 24–48 hours. Given how close Houghton is to our Hyde Park workshop, same-day turnaround is sometimes possible for straightforward panel replacements on common models — contact us to check availability. We stock display assemblies for all major MacBook Air and MacBook Pro configurations.',
  },
  {
    question: 'My MacBook cracked on the way to a meeting. How urgent is the repair?',
    answer: 'Urgent — but the machine is still usable for now, provided the crack is small and the backlight is unaffected. The risk is progressive: cracks spread under heat and pressure, and the seal break allows moisture in, especially in Johannesburg\'s rainy summers. A crack in the glass that is addressed within a week or two is a straightforward panel replacement. The same crack left for months can require a more involved repair if the backlight layer has been compromised.',
  },
  {
    question: 'What is the difference between a display replacement and a screen repair?',
    answer: 'Display replacement fits a complete new assembly — LCD panel, backlight, and outer glass — as a single unit. This is the right approach for cracked or physically damaged screens. Screen repair refers to targeted work for electronic faults: backlight driver failure, flickering from a failing display cable, or GPU-linked display issues where the panel itself is undamaged. We diagnose before recommending either approach, so you only pay for what the fault requires.',
  },
  {
    question: 'My MacBook screen has developed pressure marks and discolouration near the edges. What caused that?',
    answer: 'Pressure marks and edge discolouration on Retina displays are almost always caused by the battery swelling beneath the trackpad or motherboard area, pushing upward against the display when the lid is closed. It can also result from heavy items being placed on top of a closed MacBook. The LCD panel requires replacement once this type of damage appears — and if a swollen battery is responsible, that should be addressed at the same time to prevent recurrence.',
  },
  {
    question: 'Does screen replacement affect anything else on my MacBook?',
    answer: 'A display replacement is contained to the display assembly — the hinge, the panel, and the cable connecting it to the logic board. It does not affect Touch ID (which is in the keyboard or power button), the trackpad, storage, or any other component. Everything works exactly as before once the new display is fitted and tested.',
  },
  {
    question: 'Do you repair Apple Silicon MacBook displays from Houghton?',
    answer: 'Yes. We service all Apple Silicon MacBook models — MacBook Air M1, M2, M3 and MacBook Pro M1 Pro, M1 Max, M2 Pro, M2 Max, M3 Pro, M3 Max. The display assemblies for Apple Silicon models differ from Intel-era panels and we source the appropriate quality-matched part for each generation. Every repair carries a written warranty.',
  },
  {
    question: 'How do I arrange a collection from Houghton?',
    answer: 'WhatsApp us or call 064 529 5863. We will confirm a collection time at your Houghton address. Given the proximity to our Hyde Park workshop, we can often accommodate same-day or next-morning collection. We collect, repair, and return — no need to travel anywhere.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Screen Repair Houghton',
  description: 'MacBook screen repair and display replacement for Houghton clients. Collection from Houghton — Golf Course, Killarney, diplomatic area — repair at Hyde Park workshop 4km away. All display faults on all MacBook models.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Houghton' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Screen Repair', item: 'https://zasupport.com/screen-repair' },
    { '@type': 'ListItem', position: 3, name: 'Houghton', item: 'https://zasupport.com/screen-repair/houghton' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function ScreenRepairHoughtonPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Screen Repair', href: '/screen-repair' },
            { label: 'Houghton' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Screen Repair Houghton
              <br /><span className="text-[#0FEA7A]">— Hyde Park Workshop</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              MacBook screen repair and display replacement for Houghton clients. Our Hyde Park workshop is approximately 4km from Houghton — one of our closest collection areas. We collect, repair, and return your MacBook, usually within 24–48 hours.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>We collect from Houghton — approx. 4km from our Hyde Park workshop</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: Monitor, label: 'Display Replacement' },
                { icon: Zap, label: '24–48 Hour Turnaround' },
                { icon: CheckCircle, label: 'Written Warranty' },
                { icon: MapPin, label: 'Collect from Houghton' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <Icon className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('SCR-HOUGHTON-HERO', 'screen-repair')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
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
            MacBook Screen Repair for Houghton Residents and Professionals
          </h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              Houghton is one of the closest suburbs to our Hyde Park workshop — approximately 4km south-east along Jan Smuts Avenue. It is one of Johannesburg's most established upmarket residential areas, home to professionals, diplomatic residents, and a mix of home offices overlooking the Houghton Golf Course. A MacBook display failure here does not require a long trip across the city: we collect, and we return.
            </p>
            <p>
              The most common screen faults we see from Houghton clients are cracked LCD panels from accidental drops, backlight failure on older Intel MacBook Pros, and the characteristic pressure marks and edge discolouration that develop when a swollen battery pushes upward against the display from inside the chassis. All three are repairable — and all three are best addressed early rather than after the fault has progressed.
            </p>
            <p>
              We cover all MacBook models at our Hyde Park workshop. MacBook Air from the 11-inch through to the current 15-inch M3, across every Intel and Apple Silicon generation. MacBook Pro from the 13-inch through to the 16-inch, Intel Core i5, i7, i9 and all M-series chips. A display fault on any of these machines is not a write-off — it is a repair.
            </p>
            <p>
              Not every display fault requires a full panel replacement. Backlight driver failures, fraying display cables causing intermittent flicker, and T-Con board issues can all be addressed at component level. We always carry out a diagnostic before quoting, and the written quote arrives before a single part is ordered. No surprises, no pressure.
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
            Our Screen Repair Process for Houghton Clients
          </h2>
          <div className="space-y-6">
            {[
              { step: '01', title: 'Collection from Houghton', desc: 'Contact us via WhatsApp or phone. We arrange a collection from your Houghton address — Golf Course area, Killarney border, or anywhere in the suburb — at a time that suits you.' },
              { step: '02', title: 'Display Diagnostic', desc: 'We identify the exact fault at our Hyde Park workshop: physical panel, backlight component, display cable, or board-level issue. This shapes the repair approach and cost.' },
              { step: '03', title: 'Written Quote', desc: 'Fixed-price written quote covering the fault, repair method, and turnaround time. No work begins without your approval.' },
              { step: '04', title: 'Repair or Replacement', desc: 'Component-level repair where possible, full display replacement where the panel requires it. Quality-matched parts throughout.' },
              { step: '05', title: 'Return to Houghton', desc: 'Display tested at all brightness levels and on lid movement. MacBook returned to your Houghton address with a written ZA Support warranty.' },
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
          <FAQAccordion items={faqs} title="MacBook Screen Repair Houghton, Common Questions" />
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Houghton MacBook Screen Issue? We Collect.</h2>
            <p className="text-[#7A9E98] mb-6">24–48 hour turnaround. Written warranty. Hyde Park workshop — just 4km away.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('SCR-HOUGHTON-HERO', 'screen-repair')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
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
