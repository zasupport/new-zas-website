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
  title: 'MacBook Screen Repair Kyalami | ZA Support Hyde Park',
  description:
    'MacBook screen repair for Kyalami clients. Cracked displays, backlight failure, LCD faults. We collect from Kyalami and repair at our Hyde Park workshop. Assessment from R599. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/screen-repair/kyalami' },
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
  { question: 'Do you collect MacBooks for screen repair from Kyalami?', answer: 'Yes. We collect across Kyalami, Kyalami Estates, Kyalami Hills, Crowthorne, and the businesses around Kyalami Corner and Main Road. The drive from our Hyde Park workshop is about 25 minutes via the M1 and N1, so we usually offer a same-day or next-morning collection window. We pre-register driver details for estate visitor systems so gate access is smooth. Call or WhatsApp 064 529 5863 to book.' },
  { question: 'How long does a MacBook screen repair take?', answer: 'Most MacBook screen repairs are completed within three to five working days from collection in Kyalami. Straightforward Retina panel swaps on standard models can be quicker; Apple Silicon machines with full display assembly replacement sometimes need an extra day or two if a specific part has to be ordered. We give you a realistic timeline with the written quote so you can plan around it.' },
  { question: 'What is the screen repair assessment fee?', answer: 'Assessment is from R599. That covers collection from your Kyalami address, a full diagnostic at the Hyde Park workshop, and a written quote covering parts, labour and turnaround. If you proceed with the repair, the assessment fee is credited against the final invoice. If you decide not to proceed, we return the MacBook to Kyalami in its original condition.' },
  { question: 'Do you use genuine Apple screens?', answer: 'We use genuine-grade replacement displays sourced through established trade channels. For most Retina models we can offer either an original-pull tested panel or a high-quality equivalent, and we explain the difference, warranty terms, and price for each option in the written quote. Kyalami clients generally choose based on whether the MacBook is a daily work machine or a longer-term resale asset.' },
  { question: 'My MacBook screen has lines but still works. Should I get it repaired?', answer: 'Vertical or horizontal lines almost always get worse, not better. What starts as a thin line across the display usually progresses to flickering, then full panel failure, often within a few weeks. We have seen this pattern repeatedly on Kyalami machines brought in late. Bringing it in while the screen still works lets us diagnose whether the fault is the panel, the flex cable, or the logic board, and the earlier diagnosis is usually the cheaper repair.' },
  { question: 'Can you repair the screen on Apple Silicon MacBooks?', answer: 'Yes. We repair displays on M1, M2, and M3 MacBook Air and Pro models. The Apple Silicon display assembly is more integrated than older Retina designs, so the repair typically involves a full lid assembly rather than just the panel, and pricing reflects that. We confirm exact part availability and cost in the written quote before proceeding.' },
  { question: 'What is a From R599 assessment guarantee?', answer: 'It means the assessment cost starts at R599 and is fixed before we collect, there are no surprise add-ons to the diagnostic itself. After assessment you get a written quote for the repair, and you decide whether to proceed. If you go ahead, the R599 is credited towards the repair invoice. If not, we return the MacBook to your Kyalami address with a clear explanation of what we found.' },
  { question: 'Can you repair a cracked outer glass without replacing the full display?', answer: 'On most modern MacBooks the glass is bonded to the LCD as a single unit, so a glass-only repair is not viable, replacing the assembly is the reliable fix. On a few older models a glass separation repair is technically possible, but we rarely recommend it because the long-term result is inconsistent. We assess your specific model and tell you honestly which approach makes sense, rather than quoting the cheapest option on paper.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Screen Repair Kyalami',
  description: 'MacBook screen repair for Kyalami clients. Cracked displays, backlight, LCD faults. Collection from Kyalami.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Kyalami' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Screen Repair', item: 'https://zasupport.com/screen-repair' },
    { '@type': 'ListItem', position: 3, name: 'Kyalami', item: 'https://zasupport.com/screen-repair/kyalami' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function ScreenRepairKyalamiPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Screen Repair', href: '/screen-repair' },
            { label: 'Kyalami' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Screen Repair Kyalami
              <br /><span className="text-[#0FEA7A]">, Display Specialists</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Screen repairs for Kyalami homes, equestrian estates, and the businesses around the Kyalami Corner shopping centre. Cracked panels, backlight failure, vertical lines, and LCD damage handled at our Hyde Park workshop. We collect along Main Road and from the estates off Maple Road, with assessment from R599.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>Collection from Kyalami, approx. 22 min to our Hyde Park workshop</span>
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
              <a href={buildWhatsAppUrl('SCR-KYALAMI', 'screen-repair')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
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
          <FAQAccordion items={faqs} title="Screen Repair Kyalami, Common Questions" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">We Also Serve These Areas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: "Midrand", href: "/screen-repair/midrand" },
              { label: "Paulshof", href: "/screen-repair/paulshof" },
              { label: "Fourways", href: "/screen-repair/fourways" },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Cracked Screen in Kyalami? Assessment from R599.</h2>
            <p className="text-[#7A9E98] mb-6">We collect from Kyalami. Assessment from R599. From R599 assessment. 12-month warranty.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('SCR-KYALAMI', 'screen-repair')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
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
          <PricingRange page="/screen-repair/kyalami" />
          <PricingNote />
        </div>
      </section>

    </>
  );
}
