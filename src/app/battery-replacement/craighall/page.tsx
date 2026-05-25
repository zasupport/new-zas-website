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
  title: 'MacBook Battery Replacement Craighall | ZA Support Hyde Park',
  description: 'MacBook battery replacement for Craighall clients. Same-day service, from R1,899. Collection from Craighall. Written warranty. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/battery-replacement/craighall' },
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
  { question: 'Do you collect MacBooks for battery replacement from Craighall?', answer: 'Yes — Craighall is one of our quickest collections. From our Hyde Park workshop it is roughly 3 km down Jan Smuts Avenue or through Federation Road, usually 5 to 8 minutes outside peak hours. We cover Craighall, Craighall Park and the adjoining stretch along Republic Road. Book on 064 529 5863 or wa.me/27645295863 and we will agree a window that suits you.' },
  { question: 'How much does MacBook battery replacement cost for Craighall clients?', answer: 'Battery replacement starts from R1,899 for MacBook Air models and rises depending on the exact model and year — Touch Bar Pros and 16-inch units sit higher because the battery is bonded into the top case. Assessment is from R599 and is credited against the repair if you go ahead. We give Craighall clients a firm written quote before any work starts, so there are no surprises.' },
  { question: 'How long does MacBook battery replacement take?', answer: 'For most MacBook Air and current Pro models collected from Craighall in the morning, we can return the machine the same afternoon or next working day. Older Retina and Touch Bar Pros that require a full top-case swap typically take one to two working days because the battery is glued in and the keyboard, trackpad and speakers have to be transferred across. We confirm the timeline once we have seen the model.' },
  { question: 'Will replacing my battery erase my data?', answer: 'No. A battery replacement is a hardware-only procedure — we do not touch the SSD or macOS installation, so your files, apps and settings remain exactly as they were. That said, we always recommend a Time Machine backup before sending any machine in, regardless of the repair. If you need help setting one up before collection from Craighall, mention it when you book and we will walk you through it.' },
  { question: 'How do I check my MacBook battery health?', answer: 'Hold the Option key and click the Apple menu, then choose System Information and look under Power. You will see cycle count and condition. Anything reporting Service Battery, Service Recommended, or a cycle count over 1,000 is a strong candidate for replacement. If you would prefer, send us a screenshot on WhatsApp and we will tell you whether it is worth replacing now or whether you have another year in it.' },
  {
    question: 'Does load shedding damage MacBook batteries?',
    answer: 'Not directly damage, but it accelerates degradation significantly. Each charge-discharge cycle during load shedding counts toward the battery\'s lifespan. MacBooks used through daily load shedding reach the replacement threshold much faster than those on stable power.',
  },
  { question: 'My trackpad feels stiff — could it be the battery?', answer: 'Almost certainly, yes. A stiff or unevenly clicking trackpad on a MacBook three or more years old is the classic symptom of a swollen battery pushing up from underneath. We see this constantly on 2017–2020 Touch Bar Pros from Craighall. A swollen battery is a genuine fire risk and should not be left in the machine — stop charging it, power down if possible, and call us on 064 529 5863 for same-day collection.' },
  { question: 'Do you offer warranty on battery replacements for Craighall clients?', answer: 'Yes — every battery replacement carries a six-month written warranty covering the cell itself and the workmanship. If the new battery develops any fault in that window, we collect from Craighall again at no charge, diagnose, and repair or replace under warranty. The warranty document is emailed to you the same day the machine is returned.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Battery Replacement Craighall',
  description: 'Same-day MacBook battery replacement for Craighall clients. From R1,899. Collection included.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Place', name: 'Craighall' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Battery Replacement', item: 'https://zasupport.com/battery-replacement' },
    { '@type': 'ListItem', position: 3, name: 'Craighall', item: 'https://zasupport.com/battery-replacement/craighall' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function BatteryReplacementCraighallPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Battery Replacement', href: '/battery-replacement' },
            { label: 'Craighall' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Battery Replacement
              <br /><span className="text-[#0FEA7A]">Craighall</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Same-day MacBook battery replacement for Craighall residents and businesses along Jan Smuts Avenue. We handle Service Battery warnings, swollen cells lifting the trackpad, rapid drain, and charging faults from R1,899 with a written warranty. Collection across Craighall and Craighall Park is roughly 3 km from our Hyde Park workshop — typically 5 to 8 minutes via Jan Smuts or Federation Road.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>Hyde Park, Johannesburg | From R1,899 | Same-day service | Collecting from Craighall</span>
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
              <a href={buildWhatsAppUrl('BAT-CRAIGHALL', 'battery')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
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
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">MacBook Battery Faults We Fix for Craighall Clients</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">Craighall is approximately 3 km from our Hyde Park workshop. All MacBook models from 2015 onwards are covered — Intel and Apple Silicon. We test actual cell capacity before recommending replacement and provide a written quote before any work proceeds.</p>
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
          <FAQAccordion items={faqs} title={`MacBook Battery Replacement Craighall — Common Questions`} />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Services</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'Battery Hub', href: '/battery-replacement' },
              { label: 'Logic Board Repair Craighall', href: '/logic-board-repair/craighall' },
              { label: 'Liquid Damage Craighall', href: '/liquid-damage/craighall' },
              { label: 'Screen Repair Craighall', href: '/screen-repair/craighall' },
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
            <p className="text-[#7A9E98] mb-6">Same-day replacement. Collecting from Craighall. Written warranty.</p>
            <PricingNote variant="inline" />
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <a href={buildWhatsAppUrl('BAT-CRAIGHALL', 'battery')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
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
