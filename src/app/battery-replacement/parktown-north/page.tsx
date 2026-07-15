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
  title: 'MacBook Battery Replacement Parktown North | ZA Support Hyde Park',
  description: 'MacBook battery replacement for Parktown North clients. Same-day service, collection from Parktown North. Written warranty. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/battery-replacement/parktown-north' },
};

const faults = [
  { title: 'Service Battery Warning', desc: 'macOS shows "Service Recommended" when battery health drops below 80%. This is Apple\'s signal that the cells are degraded and runtime will continue to decrease. We replace same-day with a genuine-spec battery that restores full macOS health reporting.' },
  { title: 'Swollen / Expanding Battery', desc: 'A swollen battery is a safety issue. It pushes against the trackpad causing stiffness or phantom clicks, and can warp the bottom case. Do not charge or use a MacBook with a swollen battery. We handle safe removal and disposal. This is the most urgent battery fault, bring it in immediately.' },
  { title: 'Rapid Drain (Under 3 Hours)', desc: 'If your MacBook lasts under 3 hours on light tasks, the battery cells are degraded beyond useful capacity. South African load shedding accelerates this, constant charge-discharge cycling wears cells faster than normal use. We test actual capacity, not just the macOS percentage.' },
  { title: 'Not Charging', desc: 'Failure to charge can be a battery fault or a logic board fault. If the MagSafe light does not illuminate or the charging icon does not appear, the issue may be the charge controller on the board rather than the battery itself. Our assessment distinguishes the two before quoting, you pay only for what is actually broken.' },
  { title: 'Battery Percentage Stuck', desc: 'The battery indicator stuck at one percentage, or jumping erratically between numbers, indicates a failed battery gauge circuit or degraded cells that cannot hold a consistent voltage. This is a battery replacement, not a software issue.' },
  { title: 'Shutdown at 20-30%', desc: 'The MacBook shuts down suddenly at 20% or 30% remaining, the cells can no longer deliver the voltage macOS needs under even light load. The battery is reporting inaccurate capacity. Replacement resolves this completely.' },
];

const faqs = [
  { question: 'Do you collect MacBooks for battery replacement from Parktown North?', answer: 'Yes, Parktown North is one of our quickest collection runs. From our Hyde Park workshop it is roughly 10 minutes via Jan Smuts Avenue, so we can usually be at a 7th Avenue studio or a home off Conrad Drive within the hour. We collect from residential addresses, from the agencies and architects along 6th and 7th, and from the commercial blocks near 4th Avenue. WhatsApp 064 529 5863 with your model and we will confirm a collection window.' },
  { question: 'How much does MacBook battery replacement cost for Parktown North clients?', answer: 'Battery replacement is most affordable for older Air and 13-inch Pro models. 15-inch and 16-inch Pros, and the M-series machines, sit higher because the cells are larger and the disassembly is more involved. We always quote against your specific model and serial before collection, no surprises at handover. Collection from Parktown North is included; the assessment fee applies if you only want a diagnostic without proceeding to repair.' },
  { question: 'How long does MacBook battery replacement take?', answer: 'For common models with stock on the shelf, it is usually a same-day turnaround, collected in the morning from Parktown North, returned by late afternoon. Less common Pro variants take two to three working days while the correct cell is sourced. Swollen batteries take a little longer because we need to remove the old cell carefully and check that the trackpad, speakers, and lower case have not been distorted by the swelling.' },
  { question: 'Will replacing my battery erase my data?', answer: 'No. Battery replacement is a hardware-only job, your SSD, macOS install, files, and accounts are untouched. That said, we always recommend a current Time Machine backup before any repair, and if you do not have one we are happy to help you set one up. We do not log into your machine; if the work requires a power-on test we will ask you for your password and confirm with you before doing so.' },
  { question: 'How do I check my MacBook battery health?', answer: 'Hold Option and click the Apple menu, then choose System Information and select Power in the sidebar, you will see cycle count and condition. On newer macOS you can also go to System Settings, Battery, then Battery Health. Anything reading Service Recommended, or a cycle count above 900-1,000 with noticeable drain issues, is worth replacing. Send us a screenshot on WhatsApp and we will tell you honestly whether it is urgent or whether you have another six months.' },
  {
    question: 'Does load shedding damage MacBook batteries?',
    answer: 'Not directly damage, but it accelerates degradation significantly. Each charge-discharge cycle during load shedding counts toward the battery\'s lifespan. MacBooks used through daily load shedding reach the replacement threshold much faster than those on stable power.',
  },
  { question: 'My trackpad feels stiff, could it be the battery?', answer: 'Almost certainly, yes. On every MacBook with a Force Touch trackpad, the battery sits directly beneath it. When a cell swells it pushes the trackpad up from underneath, and the click goes from crisp to stiff, uneven, or non-responsive. This is the single most common symptom we see from Parktown North callouts. Stop charging the machine, power it down, and get in touch, a swollen battery is a genuine fire risk and should not stay in service.' },
  { question: 'Do you offer warranty on battery replacements for Parktown North clients?', answer: 'Yes. Every battery we fit carries a written warranty covering the cell itself and our workmanship. If the new battery fails to hold charge properly or shows abnormal behaviour within the warranty period, we collect from Parktown North again at no charge, diagnose, and resolve it. The warranty paperwork is handed over with the machine and emailed to you so you have a record.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Battery Replacement Parktown North',
  description: 'Same-day MacBook battery replacement for Parktown North clients. Collection included.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Place', name: 'Parktown North' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Battery Replacement', item: 'https://zasupport.com/battery-replacement' },
    { '@type': 'ListItem', position: 3, name: 'Parktown North', item: 'https://zasupport.com/battery-replacement/parktown-north' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function BatteryReplacementParktownNorthPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Battery Replacement', href: '/battery-replacement' },
            { label: 'Parktown North' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Battery Replacement
              <br /><span className="text-[#0FEA7A]">Parktown North</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Same-day MacBook battery replacement for Parktown North residents and the design studios along 7th Avenue. We handle Service Battery warnings, swollen cells lifting the trackpad, rapid drain, and charging faults, with a written warranty. Collection runs from Parktown North take roughly 10 minutes from our Hyde Park workshop, an easy hop down Jan Smuts Avenue.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>Hyde Park, Johannesburg | Same-day service | Collecting from Parktown North</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {['Same-Day Replacement', 'Genuine-Spec Battery', 'Written Warranty', 'Contact for pricing'].map((l) => (
                <div key={l} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <CheckCircle className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{l}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('BAT-PARKTOWNNORTH', 'battery')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
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
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">MacBook Battery Faults We Fix for Parktown North Clients</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">Parktown North is approximately 6 km from our Hyde Park workshop. All MacBook models from 2015 onwards are covered, Intel and Apple Silicon. We test actual cell capacity before recommending replacement and provide a written quote before any work proceeds.</p>
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
          <FAQAccordion items={faqs} title={`MacBook Battery Replacement Parktown North, Common Questions`} />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Services</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'Battery Hub', href: '/battery-replacement' },
              { label: 'Logic Board Repair Parktown North', href: '/logic-board-repair/parktown-north' },
              { label: 'Liquid Damage Parktown North', href: '/liquid-damage/parktown-north' },
              { label: 'Screen Repair Parktown North', href: '/screen-repair/parktown-north' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">MacBook Battery Failing?</h2>
            <p className="text-[#7A9E98] mb-6">Same-day replacement. Collecting from Parktown North. Written warranty.</p>
            <PricingNote variant="inline" />
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <a href={buildWhatsAppUrl('BAT-PARKTOWNNORTH', 'battery')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
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
