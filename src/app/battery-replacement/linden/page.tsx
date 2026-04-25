import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, ArrowRight, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';
import PricingNote from '@/components/PricingNote';

export const metadata: Metadata = {
  title: 'MacBook Battery Replacement Linden | ZA Support Hyde Park',
  description: 'MacBook battery replacement for Linden clients. Same-day service, from R1,899. Collection from Linden. Written warranty. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/battery-replacement/linden' },
};

const faults = [
  { title: 'Service Battery Warning', desc: 'macOS shows "Service Recommended" when battery health drops below 80%. This is Apple\'s signal that the cells are degraded and runtime will continue to decrease. We replace same-day with a genuine-spec battery that restores full macOS health reporting.' },
  { title: 'Swollen / Expanding Battery', desc: 'A swollen battery is a safety issue. It pushes against the trackpad causing stiffness or phantom clicks, and can warp the bottom case. Do not charge or use a MacBook with a swollen battery. We handle safe removal and disposal. This is the most urgent battery fault — bring it in immediately.' },
  { title: 'Rapid Drain (Under 3 Hours)', desc: 'If your MacBook lasts under 3 hours on light tasks, the battery cells are degraded beyond useful capacity. South African load shedding accelerates this — constant charge-discharge cycling wears cells faster than normal use. We test actual capacity, not just the macOS percentage.' },
  { title: 'Not Charging', desc: 'Failure to charge can be a battery fault or a logic board fault. If the MagSafe light does not illuminate or the charging icon does not appear, the issue may be the charge controller on the board rather than the battery itself. Our assessment distinguishes the two before quoting — you pay only for what is actually broken.' },
  { title: 'Battery Percentage Stuck', desc: 'The battery indicator stuck at one percentage, or jumping erratically between numbers, indicates a failed battery gauge circuit or degraded cells that cannot hold a consistent voltage. This is a battery replacement, not a software issue.' },
  { title: 'Shutdown at 20–30%', desc: 'The MacBook shuts down suddenly at 20% or 30% remaining — the cells can no longer deliver the voltage macOS needs under even light load. The battery is reporting inaccurate capacity. Replacement resolves this completely.' },
];

const faqs = [
  {
    question: 'Do you collect MacBooks for battery replacement from Linden?',
    answer: 'Yes. Linden is approximately 7 km from our Hyde Park workshop — roughly 12–15 minutes by car. We collect, replace the battery same-day, and return. WhatsApp 064 529 5863 to arrange.',
  },
  {
    question: 'How much does MacBook battery replacement cost for Linden clients?',
    answer: 'From R1,899 depending on the MacBook model. Apple charges R2,999–R5,499. We use genuine-spec batteries with written warranty. Written quote before any work proceeds.',
  },
  {
    question: 'How long does MacBook battery replacement take?',
    answer: 'Same-day for most models. Drop off in the morning, collect in the afternoon. The M1/M2/M3 Air and Pro models use adhesive pull-tabs making the replacement faster. Older glued-in models take slightly longer.',
  },
  {
    question: 'Will replacing my battery erase my data?',
    answer: 'No. Battery replacement does not touch the logic board, SSD, or any data-bearing component. Your files, applications, and settings are completely untouched.',
  },
  {
    question: 'How do I check my MacBook battery health?',
    answer: 'Apple menu > System Settings > Battery > Battery Health. It shows the condition and maximum capacity percentage. Below 80% means replacement is recommended. Cycle count is in System Information > Power.',
  },
  {
    question: 'Does load shedding damage MacBook batteries?',
    answer: 'Not directly damage, but it accelerates degradation significantly. Each charge-discharge cycle during load shedding counts toward the battery\'s lifespan. MacBooks used through daily load shedding reach the replacement threshold much faster than those on stable power.',
  },
  {
    question: 'My trackpad feels stiff — could it be the battery?',
    answer: 'Almost certainly yes. A swollen battery expands upward and pushes against the trackpad. This is a safety issue — stop using the machine and bring it in. We see this regularly from Linden and across Johannesburg.',
  },
  {
    question: 'Do you offer warranty on battery replacements for Linden clients?',
    answer: 'Yes. Every battery replacement includes a written warranty covering defects and premature capacity loss. The warranty applies equally to all clients regardless of location.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Battery Replacement Linden',
  description: 'Same-day MacBook battery replacement for Linden clients. From R1,899. Collection included.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Place', name: 'Linden' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Battery Replacement', item: 'https://zasupport.com/battery-replacement' },
    { '@type': 'ListItem', position: 3, name: 'Linden', item: 'https://zasupport.com/battery-replacement/linden' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function BatteryReplacementLindenPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Battery Replacement', href: '/battery-replacement' },
            { label: 'Linden' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Battery Replacement
              <br /><span className="text-[#0FEA7A]">Linden</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Same-day MacBook battery replacement for Linden clients. Service Battery warning, swollen battery, rapid drain, and charging faults. From R1,899 with written warranty. Collection from Linden — approximately 7 km, 12–15 minutes from our Hyde Park workshop.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>Hyde Park, Johannesburg | From R1,899 | Same-day service | Collecting from Linden</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {['Same-Day Replacement', 'Genuine-Spec Battery', 'Written Warranty', 'From R1,899'].map((l) => (
                <div key={l} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <CheckCircle className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{l}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('BAT-LINDEN', 'battery')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
                WhatsApp for Quote
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link href="/battery-replacement" className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all">
                All Battery Replacement <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">MacBook Battery Faults We Fix for Linden Clients</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">Linden is approximately 7 km from our Hyde Park workshop. All MacBook models from 2015 onwards are covered — Intel and Apple Silicon. We test actual cell capacity before recommending replacement and provide a written quote before any work proceeds.</p>
          <div className="space-y-4">
            {faults.map((f) => (
              <div key={f.title} className="glass-card p-5">
                <h3 className="text-[#E8F4F1] font-bold mb-2">{f.title}</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title={`MacBook Battery Replacement Linden — Common Questions`} />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Services</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'Battery Hub', href: '/battery-replacement' },
              { label: 'Logic Board Repair Linden', href: '/logic-board-repair/linden' },
              { label: 'Liquid Damage Linden', href: '/liquid-damage/linden' },
              { label: 'Screen Repair Linden', href: '/screen-repair/linden' },
              { label: 'MacBook Pro Battery', href: '/battery-replacement/macbook-pro' },
              { label: 'MacBook Air Battery', href: '/battery-replacement/macbook-air' },
              { label: 'Logic Board Repair', href: '/logic-board-repair' },
              { label: 'All MacBook Repair', href: '/macbook-repair' },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="glass-card p-4 text-center group">
                <span className="text-[#E8F4F1] text-sm font-semibold group-hover:text-[#0FEA7A] transition-colors">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">MacBook Battery Failing? From R1,899.</h2>
            <p className="text-[#7A9E98] mb-6">Same-day replacement. Collecting from Linden. Written warranty.</p>
            <PricingNote variant="inline" />
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <a href={buildWhatsAppUrl('BAT-LINDEN', 'battery')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
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
