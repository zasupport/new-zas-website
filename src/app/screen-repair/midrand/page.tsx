import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Monitor, Zap, CheckCircle, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Screen Repair Midrand | ZA Support Hyde Park',
  description:
    'MacBook screen repair for Midrand clients. Cracked displays, backlight failure, and LCD faults repaired at our Hyde Park workshop with collection and return service. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/screen-repair/midrand' },
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
    question: 'Do you collect MacBooks from Midrand for screen repairs?',
    answer: 'Yes. We collect from Midrand as part of our service area. Midrand is approximately 20 kilometres north of our Hyde Park workshop, accessible via the N1 highway. Whether you are based near the Gallagher Convention Centre, in the Midrand tech corridor, or in the residential areas off Old Johannesburg Road, we arrange a collection at a time that suits you.',
  },
  {
    question: 'How long does a MacBook screen replacement take from Midrand?',
    answer: 'Most screen replacements are completed within 24–48 hours of collection. We carry display assemblies for the most common MacBook models at our Hyde Park workshop. Because Midrand is approximately 20 kilometres from our workshop, we typically schedule the collection and return on planned days to keep your time investment minimal. We will confirm the full logistics when you contact us.',
  },
  {
    question: 'My MacBook screen cracked but it still works. Should I repair it now?',
    answer: 'Yes — do not wait. A cracked display is a progressive fault. Moisture ingress through the crack causes independent backlight damage that compounds the cost of the repair. A crack that is left for weeks in a laptop bag can turn a straightforward panel replacement into a combined backlight and panel job. Early repair is consistently the lower-cost outcome, and we see this pattern regularly in our workshop.',
  },
  {
    question: 'What is the difference between a display replacement and a screen repair?',
    answer: 'Display replacement means fitting a complete new assembly — LCD panel, backlight, and outer glass as a single unit. This is the approach for physical cracks. Screen repair refers to component-level fault diagnosis for issues such as backlight failure, flickering, or black screen where the LCD panel itself may be intact. We always diagnose the exact fault before recommending a replacement — and in many cases a targeted repair is possible at lower cost.',
  },
  {
    question: 'My MacBook Pro screen flickers when I move the lid. Is that fixable?',
    answer: 'Yes. Lid-movement flickering is a known and well-documented fault on Intel MacBook Pro models, particularly the 13-inch 2016–2019 Touch Bar range. The display cable runs through the hinge and develops micro-fractures from repeated opening and closing. This is a targeted cable repair and does not require a full display replacement. It is one of the more cost-effective repairs we carry out.',
  },
  {
    question: 'Does screen replacement affect Touch ID?',
    answer: 'No. Touch ID on MacBook models is integrated into the keyboard or power button, not the display assembly. A screen replacement has no effect on Touch ID functionality or pairing on any MacBook model. Your Touch ID works exactly as before after the repair.',
  },
  {
    question: 'I work near Gallagher Convention Centre in Midrand. Is collection easy to arrange?',
    answer: 'Yes. We collect from Midrand addresses including the business parks and office nodes around Gallagher and the broader Midrand tech corridor. Contact us via WhatsApp with your address and preferred time, and we will confirm a collection slot. We are used to accommodating professional schedules and can often arrange early morning or late afternoon collections.',
  },
  {
    question: 'What warranty do I receive on a MacBook screen replacement?',
    answer: 'Every display replacement at ZA Support is backed by a written warranty covering the display panel and the installation work. Warranty terms are confirmed in your written quote before any repair begins. We use quality-matched panels appropriate to your specific MacBook model and generation.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Screen Repair Midrand',
  description: 'MacBook screen repair and display replacement for Midrand clients. Collection from Midrand, repair at Hyde Park workshop approximately 20 kilometres away. Cracked screens, backlight, and display faults.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Midrand' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Screen Repair', item: 'https://zasupport.com/screen-repair' },
    { '@type': 'ListItem', position: 3, name: 'Midrand', item: 'https://zasupport.com/screen-repair/midrand' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function ScreenRepairMidrandPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Screen Repair', href: '/screen-repair' },
            { label: 'Midrand' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Screen Repair Midrand
              <br /><span className="text-[#0FEA7A]">— Hyde Park Workshop</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              MacBook screen repair and display replacement for Midrand clients. We collect from Midrand and carry out the repair at our Hyde Park workshop, approximately 20 kilometres south via the N1.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>We collect from Midrand and repair at our Hyde Park workshop, approx. 20 km south via the N1</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: Monitor, label: 'Display Replacement' },
                { icon: Zap, label: '24–48 Hour Turnaround' },
                { icon: CheckCircle, label: 'Written Warranty' },
                { icon: MapPin, label: 'Collect from Midrand' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <Icon className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('SCR-MIDRAND-HERO', 'screen-repair')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all" >
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
            MacBook Screen Repair for Midrand Residents and Businesses
          </h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              Midrand sits halfway between Johannesburg and Pretoria — a location that has made it one of the region's fastest-growing business and technology corridors. The area around Gallagher Convention Centre, the Midrand tech parks, and the office nodes off the N1 hosts a significant population of MacBook-dependent professionals. A screen failure in that context is a genuine productivity crisis.
            </p>
            <p>
              We collect from Midrand as part of our standard service area. At approximately 20 kilometres south of our Hyde Park workshop via the N1 highway, it is our furthest regular collection point to the north. We coordinate collection and return efficiently — typically on planned days — to minimise the disruption to your schedule. Most repairs are completed within 24–48 hours of collection.
            </p>
            <p>
              We repair and replace displays on all MacBook models — MacBook Air (M1, M2, M3, and all Intel generations) and MacBook Pro (13-inch, 14-inch, 15-inch, and 16-inch, Intel and M-series). Every repair uses quality-matched panels and is backed by a written warranty from ZA Support.
            </p>
            <p>
              Display faults on Midrand clients' MacBooks follow the same patterns we see across all areas. Cracked panels from physical damage are the most straightforward — a replacement fixes them permanently. Less obvious are backlight failures and display cable faults, which present as black screens or flickering and are often repairable without a full display assembly. We diagnose accurately first, and that frequently means a lower cost than the client expected.
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
            Our Screen Repair Process for Midrand Clients
          </h2>
          <div className="space-y-6">
            {[
              { step: '01', title: 'Collection from Midrand', desc: 'Contact us via WhatsApp or phone. We arrange a collection from your Midrand home or office — approximately 20 kilometres from our Hyde Park workshop via the N1.' },
              { step: '02', title: 'Display Diagnostic', desc: 'We identify whether the fault is a physical panel, backlight, cable, or board-level issue. This determines the correct repair approach and cost.' },
              { step: '03', title: 'Written Quote', desc: 'Clear fixed-price quote covering the fault, repair method, and timeframe. No work starts until you approve in writing.' },
              { step: '04', title: 'Repair or Replacement', desc: 'Component-level repair where possible, full display replacement where necessary. Quality-matched panel fitted by our technician.' },
              { step: '05', title: 'Return to Midrand', desc: 'Display tested across brightness levels and colour profiles. MacBook returned to your Midrand address with a written warranty.' },
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
          <FAQAccordion items={faqs} title="MacBook Screen Repair Midrand, Common Questions" />
        </div>
      </section>

      {/* Other Areas */}
      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">We Also Serve These Areas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'Screen Repair Hub', href: '/screen-repair' },
              { label: 'Sandton Screen Repair', href: '/screen-repair/sandton' },
              { label: 'Logic Board Repair', href: '/logic-board-repair' },
              { label: 'Midrand Logic Board', href: '/logic-board-repair/midrand' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Midrand MacBook Screen Issue? We Collect.</h2>
            <p className="text-[#7A9E98] mb-6">24–48 hour turnaround. Written warranty. Hyde Park workshop.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('SCR-MIDRAND-HERO', 'screen-repair')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all" >
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
