import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Monitor, Zap, CheckCircle, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Screen Repair Germiston | ZA Support Hyde Park',
  description:
    'MacBook screen repair for Germiston clients. Cracked displays, backlight failure, LCD faults. We collect from Germiston and repair at our Hyde Park workshop. Assessment from R599. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/screen-repair/germiston' },
};

const faults = [
  { title: 'Cracked Screen', desc: 'Physical impact cracks the LCD panel or outer glass. Full display assembly replacement restores your Mac to a pristine condition.' },
  { title: 'Black Screen on Boot', desc: 'MacBook starts — fan runs, keyboard lights — but screen stays dark. Backlight failure, display cable fault, or GPU issue diagnosed before any part is ordered.' },
  { title: 'Backlight Failure', desc: 'Display shows a faint image visible with a torch but no backlight. Backlight fuse, driver board, or LED strip fault identified and repaired.' },
  { title: 'Display Lines or Artefacts', desc: 'Vertical or horizontal lines, colour banding, or flickering on the display. Display cable damage or LCD panel fault diagnosed at component level.' },
  { title: 'Flickering Display', desc: 'Intermittent flickering or display that goes black under certain angles. Flex cable damage or GPU driver fault identified and resolved.' },
  { title: 'Water-damaged Display', desc: 'Liquid ingress into the display assembly causes condensation marks, dead pixels, or backlight failure. Assessment determines repair viability.' },
];

const faqs = [
  {
    question: 'Do you collect MacBooks for screen repair from Germiston?',
    answer: 'Yes. We offer collection and return for Germiston clients. Your MacBook is collected from Germiston, Bedfordview, and the OR Tambo gateway corridor, repaired at our Hyde Park workshop approximately 30 minutes away, and returned once complete.',
  },
  {
    question: 'How long does a MacBook screen repair take?',
    answer: 'Simple screen replacements are typically completed within 24–48 hours of assessment. Backlight component repairs or display cable faults may take 48–72 hours. You will receive a clear timeframe with your quote before work begins.',
  },
  {
    question: 'What is the screen repair assessment fee?',
    answer: 'Assessment from R599. This covers inspection, fault diagnosis, and a written quote with no obligation. Final repair cost depends on the model and fault type.',
  },
  {
    question: 'Do you use genuine Apple screens?',
    answer: 'We use Apple-spec display assemblies that meet OEM standards. For Retina and Liquid Retina displays we source panels that match the original brightness, colour gamut, and resolution specifications.',
  },
  {
    question: 'My MacBook screen has lines but still works. Should I get it repaired?',
    answer: 'Yes. Display faults are progressive — lines typically spread and worsen over time. A partial display fault is much cheaper to repair than a fully failed display. Book an assessment before the fault deteriorates further.',
  },
  {
    question: 'Can you repair the screen on Apple Silicon MacBooks?',
    answer: 'Yes. We repair displays on MacBook Air M1, M2, M3 and MacBook Pro M1, M2, M3 models. Apple Silicon models use different display assemblies to Intel models and we stock parts for current-generation machines.',
  },
  {
    question: 'What is a No Fix No Fee guarantee?',
    answer: 'If we cannot repair your MacBook screen, you only pay the assessment fee. We will not charge for repair work that does not succeed.',
  },
  {
    question: 'Can you repair a cracked outer glass without replacing the full display?',
    answer: 'On some older models, the outer glass can be replaced without replacing the full LCD panel. On Retina models, the glass is fused to the panel and the full assembly is replaced. We will advise the most cost-effective approach for your specific model.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Screen Repair Germiston',
  description: 'MacBook screen repair for Germiston clients. Cracked displays, backlight, LCD faults. Collection from Germiston.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Germiston' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Screen Repair', item: 'https://zasupport.com/screen-repair' },
    { '@type': 'ListItem', position: 3, name: 'Germiston', item: 'https://zasupport.com/screen-repair/germiston' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function ScreenRepairGermistonPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Screen Repair', href: '/screen-repair' },
            { label: 'Germiston' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Screen Repair Germiston
              <br /><span className="text-[#0FEA7A]">— Display Specialists</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Screen repairs for Germiston residents and businesses. Cracked displays, backlight failure, display lines, and LCD faults. We collect from Germiston and repair at our Hyde Park workshop. Assessment from R599.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>Collection from Germiston — approx. 30 min to our Hyde Park workshop</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: Monitor, label: 'Retina Display Repairs' },
                { icon: Zap, label: 'Assessment from R599' },
                { icon: CheckCircle, label: 'No Fix No Fee' },
                { icon: CheckCircle, label: '12-Month Warranty' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <Icon className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('SCR-GERMISTO', 'screen-repair')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
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
          <FAQAccordion items={faqs} title="Screen Repair Germiston — Common Questions" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">We Also Serve These Areas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: "Edenvale", href: "/screen-repair/edenvale" },
              { label: "Alberton", href: "/screen-repair/alberton" },
              { label: "Boksburg", href: "/screen-repair/boksburg" },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Cracked Screen in Germiston? Assessment from R599.</h2>
            <p className="text-[#7A9E98] mb-6">We collect from Germiston. Assessment from R599. No Fix No Fee. 12-month warranty.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('SCR-GERMISTO', 'screen-repair')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
                💬 WhatsApp for Quote
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
