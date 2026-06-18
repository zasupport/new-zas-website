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
  title: 'MacBook Screen Repair Randpark Ridge | ZA Support Hyde Park',
  description:
    'MacBook screen repair for Randpark Ridge clients. Cracked displays, backlight failure, LCD faults. We collect from Randpark Ridge and repair at our Hyde Park workshop. Assessment from R599. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/screen-repair/randpark-ridge' },
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
  { question: 'Do you collect MacBooks for screen repair from Randpark Ridge?', answer: 'Yes, we collect across Randpark Ridge, from the streets off Pendulum Avenue, the area around Randpark Ridge Shopping Centre, and the residential roads bordering Randpark Golf Club. Collection runs from our Hyde Park workshop down Republic Road or via the N1, usually a 20-minute drive depending on traffic. Book on 064 529 5863 or WhatsApp wa.me/27645295863 and we will confirm a window.' },
  { question: 'How long does a MacBook screen repair take?', answer: 'For most MacBook models in common use across Randpark Ridge, screen repairs complete within three to five working days from collection. Newer Apple Silicon models with full display assemblies can take a little longer depending on parts. We give a firm timeline once the machine is on the diagnostic bench and the exact fault is confirmed.' },
  { question: 'What is the screen repair assessment fee?', answer: 'Assessment is from R599. That covers collection from Randpark Ridge, full diagnostic at the Hyde Park workshop, and a written quote covering parts, labour and return delivery. If you proceed with the repair, the assessment fee is credited against the final invoice. You decide whether to go ahead before any work starts.' },
  { question: 'Do you use genuine Apple screens?', answer: 'We use high-grade replacement displays sourced through reliable trade channels. Genuine Apple panels are only supplied through Apple\'s own repair programme, so independent workshops like ours fit equivalent-grade aftermarket or pulled-original panels. We are upfront about which grade is going into your machine and what the warranty looks like before you approve the quote.' },
  { question: 'My MacBook screen has lines but still works. Should I get it repaired?', answer: 'Lines on the display usually point to a failing LCD or a flex cable issue, and in our experience they spread rather than settle. We have seen Randpark Ridge clients try to live with a single faint line for months only to lose the full panel during a routine lid-close. If the machine is still under daily use, it is worth booking an assessment before the fault progresses.' },
  { question: 'Can you repair the screen on Apple Silicon MacBooks?', answer: 'Yes, M1, M2 and M3 MacBook Air and Pro screen replacements are part of our regular workload. These models use a full display assembly rather than a separate LCD, so the repair approach differs from older Intel machines and parts cost more. We confirm exact pricing once we have the serial number and have inspected the damage at the workshop.' },
  { question: 'What is a From R599 assessment guarantee?', answer: 'It means the diagnostic fee starts at R599 and you receive a full written quote before any repair work begins. If you decide not to proceed, you pay only the assessment and we return the MacBook to your Randpark Ridge address. If you proceed, the R599 comes off the final invoice. No surprise charges.' },
  { question: 'Can you repair a cracked outer glass without replacing the full display?', answer: 'On older MacBook Pro Retina models, glass-only replacement was sometimes possible, but on every modern MacBook the glass is bonded to the LCD as a single unit. That means a cracked outer layer typically requires a full display assembly swap. We will confirm during assessment which approach applies to your specific model and give you the cost difference clearly.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Screen Repair Randpark Ridge',
  description: 'MacBook screen repair for Randpark Ridge clients. Cracked displays, backlight, LCD faults. Collection from Randpark Ridge.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Randpark Ridge' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Screen Repair', item: 'https://zasupport.com/screen-repair' },
    { '@type': 'ListItem', position: 3, name: 'Randpark Ridge', item: 'https://zasupport.com/screen-repair/randpark-ridge' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function ScreenRepairRandparkRidgePage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Screen Repair', href: '/screen-repair' },
            { label: 'Randpark Ridge' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Screen Repair Randpark Ridge
              <br /><span className="text-[#0FEA7A]">, Display Specialists</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Screen repairs for Randpark Ridge homes and small businesses, from the quiet roads off Pendulum Avenue to the offices around Randpark Ridge Shopping Centre. We collect across the suburb, drive the unit back to our Hyde Park workshop, and handle cracked panels, backlight failure, vertical lines and LCD bruising. Assessment from R599 and a clear quote before any work begins.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>Collection from Randpark Ridge, approx. 20 min to our Hyde Park workshop</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: Monitor, label: 'Retina Display Repairs' },
                { icon: Zap, label: 'Assessment from R599' },
                { icon: CheckCircle, label: 'From R599 assessment' },
                { icon: CheckCircle, label: '12-Month Warranty' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <Icon className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('SCR-RANDPARK', 'screen-repair')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
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
          <FAQAccordion items={faqs} title="Screen Repair Randpark Ridge, Common Questions" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">We Also Serve These Areas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: "Randburg", href: "/screen-repair/randburg" },
              { label: "Roodepoort", href: "/screen-repair/roodepoort" },
              { label: "Northcliff", href: "/screen-repair/northcliff" },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Cracked Screen in Randpark Ridge? Assessment from R599.</h2>
            <p className="text-[#7A9E98] mb-6">We collect from Randpark Ridge. Assessment from R599. From R599 assessment. 12-month warranty.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('SCR-RANDPARK', 'screen-repair')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
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
          <PricingRange page="/screen-repair/randpark-ridge" />
          <PricingNote />
        </div>
      </section>

    </>
  );
}
