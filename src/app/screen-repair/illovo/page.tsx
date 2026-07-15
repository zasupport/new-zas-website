import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Monitor, Zap, CheckCircle, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';
import PricingNote from '@/components/PricingNote';
import PricingRange from '@/components/PricingRange';

export const metadata: Metadata = {
  title: 'MacBook Screen Repair Illovo | ZA Support Hyde Park',
  description:
    'MacBook screen repair for Illovo clients. Cracked displays, backlight failure, LCD faults. We collect from Illovo and repair at our Hyde Park workshop. Assessment. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/screen-repair/illovo' },
};

const faults = [
  { title: 'Cracked Screen', desc: 'Physical impact cracks the LCD panel or outer glass. Full display assembly replacement restores your Mac to a pristine condition.' },
  { title: 'Black Screen on Boot', desc: 'MacBook starts, fan runs, keyboard lights, but screen stays dark. Backlight failure, display cable fault, or GPU issue diagnosed before any part is ordered.' },
  { title: 'Backlight Failure', desc: 'Display shows a faint image visible with a torch but no backlight. Backlight fuse, driver board, or LED strip fault identified and repaired.' },
  { title: 'Display Lines or Artefacts', desc: 'Vertical or horizontal lines, colour banding, or flickering on the display. Display cable damage or LCD panel fault diagnosed at component level.' },
  { title: 'Flickering Display', desc: 'Intermittent flickering or display that goes black under certain angles. Flex cable damage or GPU driver fault identified and resolved.' },
  { title: 'Water-damaged Display', desc: 'Liquid ingress into the display assembly causes condensation marks, dead pixels, or backlight failure. Assessment determines repair viability.' },
];

const faqs = [
  { question: 'Do you collect MacBooks for screen repair from Illovo?', answer: 'Yes, Illovo is one of our closest collection suburbs. Our workshop is in Hyde Park, a few minutes up Oxford Road, so we collect from homes, apartments and offices across Illovo, including Illovo Boulevard, Fricker Road, Harries Road and the streets around Inanda Club. Book via WhatsApp on 064 529 5863 and we will agree a time that fits your day.' },
  { question: 'How long does a MacBook screen repair take?', answer: 'For most Illovo collections we work to a three-to-five working day turnaround once the quote is approved and parts are confirmed. Newer Apple Silicon models (M1, M2, M3) can take a day or two longer because display assemblies are ordered in. We give you a firm expected return date with the written quote, not a vague window.' },
  { question: 'What is the screen repair assessment fee?', answer: 'Our assessment fee applies. That covers a full diagnostic at the Hyde Park workshop, we check the panel, backlight, display cable, logic board video output and lid sensors so the quote reflects the real fault, not just the visible damage. If you go ahead with the repair, the assessment fee is credited against the final invoice.' },
  { question: 'Do you use genuine Apple screens?', answer: 'We use original Apple display assemblies sourced through our supply channels. For Retina and Apple Silicon MacBooks the display is a single bonded assembly, panel, glass, cables and lid all in one, so when we replace it, you get the same part Apple would fit. We do not fit aftermarket panels because the colour calibration and True Tone behaviour will not match.' },
  { question: 'My MacBook screen has lines but still works. Should I get it repaired?', answer: 'Vertical or horizontal lines almost always get worse, not better. We see this often on MacBooks brought in from Illovo home offices, a thin line appears, then within weeks it spreads or the panel develops dead bands. It is usually a panel or display cable fault rather than a software issue. Bring it in for an assessment while it is still usable; replacing a partially working screen is the same job as replacing a dead one.' },
  { question: 'Can you repair the screen on Apple Silicon MacBooks?', answer: 'Yes. M1, M2 and M3 MacBook Air and Pro screen replacements are a routine job for us. The display assembly is more tightly integrated than on older Intel models, which is why we always run a full assessment first, to confirm the fault is in the panel and not in the logic board\'s display controller. Apple Silicon repairs are quoted on the same assessment basis.' },
  { question: 'What is an Assessment guarantee?', answer: 'It means an assessment fee applies and you get a written quote before any repair work begins. No surprise charges, no work done without your sign-off. If the fault turns out to be more complex than a screen, say a logic board issue affecting the display, we tell you the full picture and you decide whether to proceed.' },
  { question: 'Can you repair a cracked outer glass without replacing the full display?', answer: 'On modern Retina and Apple Silicon MacBooks, no, and we are honest about this upfront. The glass is laser-bonded to the LCD panel as a single assembly, and any workshop offering glass-only repair on these models is either fitting non-original parts or risking damage to the panel underneath. We replace the full display assembly so the result matches factory condition. Older pre-Retina MacBooks are a different case and we can discuss those individually.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Screen Repair Illovo',
  description: 'MacBook screen repair for Illovo clients. Cracked displays, backlight, LCD faults. Collection from Illovo.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Illovo' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Screen Repair', item: 'https://zasupport.com/screen-repair' },
    { '@type': 'ListItem', position: 3, name: 'Illovo', item: 'https://zasupport.com/screen-repair/illovo' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function ScreenRepairIllovoPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Screen Repair', href: '/screen-repair' },
            { label: 'Illovo' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Screen Repair Illovo
              <br /><span className="text-[#0FEA7A]">, Display Specialists</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              MacBook screen repair for Illovo homes and offices, from Oxford Road through to Fricker Road and the office parks along Harries Road. We collect across Illovo and repair at our Hyde Park workshop, roughly five minutes up the road. Cracked panels, backlight failure, vertical lines, dead pixels and LCD bleed all handled. Assessment.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>Collection from Illovo, approx. 7 min to our Hyde Park workshop</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: Monitor, label: 'Retina Display Repairs' },
                { icon: Zap, label: 'Assessment' },
                { icon: CheckCircle, label: 'Assessment' },
                { icon: CheckCircle, label: '12-Month Warranty' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <Icon className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('SCR-ILLOVO', 'screen-repair')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
                💬 WhatsApp for Quote
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

      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-10 text-center">
            Screen Faults We Repair
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {faults.map((fault) => (
              <div key={fault.title} className="glass-card p-5">
                <h3 className="text-[#E8F4F1] font-bold mb-2">{fault.title}</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{fault.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Screen Repair Illovo, Common Questions" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">We Also Serve These Areas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: "Rosebank", href: "/screen-repair/rosebank" },
              { label: "Sandton", href: "/screen-repair/sandton" },
              { label: "Parktown North", href: "/screen-repair/parktown-north" },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Cracked Screen in Illovo? Assessment.</h2>
            <p className="text-[#7A9E98] mb-6">We collect from Illovo. Assessment. 12-month warranty.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('SCR-ILLOVO', 'screen-repair')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
                💬 WhatsApp for Quote
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <PricingRange page="/screen-repair/illovo" />
          <PricingNote />
        </div>
      </section>

    </>
  );
}
