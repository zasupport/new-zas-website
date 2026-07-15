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
  title: 'MacBook Battery Replacement Emmarentia | ZA Support Hyde Park',
  description: 'MacBook battery replacement for Emmarentia clients. Same-day service. Collection from Emmarentia. Written warranty. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/battery-replacement/emmarentia' },
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
  { question: 'Do you collect MacBooks for battery replacement from Emmarentia?', answer: 'Yes, collection from anywhere in Emmarentia is included at no extra cost. We cover the streets around the Botanical Gardens, the area near Emmarentia Dam, and the homes off Greenhill and Komatieland Roads. From our Hyde Park workshop the drive is about 6 km via Barry Hertzog Avenue, usually 10-12 minutes outside peak. Book a window on 064 529 5863 and we will confirm a one-hour slot that suits you.' },
  { question: 'How much does MacBook battery replacement cost for Emmarentia clients?', answer: 'Battery replacement pricing depends on your specific model, a 2017 MacBook Pro is different from an M2 Air. Collection from Emmarentia is included. Where the assessment uncovers a swollen battery that has damaged the trackpad or top case, we will quote those parts separately before proceeding. Every replacement carries a written warranty.' },
  { question: 'How long does MacBook battery replacement take?', answer: 'Most Emmarentia jobs are completed within 24 to 48 hours from collection. The actual battery work takes a few hours, but we deliberately run a full charge-discharge calibration cycle afterwards to confirm the new cell is reporting correctly in macOS before we return the machine. Urgent same-day turnarounds can sometimes be arranged if you drop off in person at Hyde Park, phone first on 064 529 5863.' },
  { question: 'Will replacing my battery erase my data?', answer: 'No. A battery replacement is a hardware swap that does not touch the SSD or your macOS installation. Your files, applications, and settings all remain exactly as they were. That said, we always recommend a current Time Machine backup before any repair, a habit worth keeping regardless. If you do not have a backup drive, we can help you set one up when we return the machine.' },
  { question: 'How do I check my MacBook battery health?', answer: 'Hold Option and click the Apple menu, then choose System Information and look under Power, you will see Cycle Count and Condition. Apple considers most modern MacBook batteries consumable after around 1,000 cycles. If Condition reads Service Recommended, or your cycle count is high and runtime has dropped below an hour, replacement is worth considering. Send us a screenshot on WhatsApp (wa.me/27645295863) and we will give you an honest opinion before you commit.' },
  {
    question: 'Does load shedding damage MacBook batteries?',
    answer: 'Not directly damage, but it accelerates degradation significantly. Each charge-discharge cycle during load shedding counts toward the battery\'s lifespan. MacBooks used through daily load shedding reach the replacement threshold much faster than those on stable power.',
  },
  { question: 'My trackpad feels stiff, could it be the battery?', answer: 'Very likely, yes. A swollen battery sits directly underneath the trackpad on most MacBook models, and as the cells expand they push the trackpad upward, making clicks feel stiff or unresponsive. This is one of the more common faults we see from Emmarentia clients with older Retina MacBook Pros. It is also a safety issue, a swollen lithium cell should not be ignored. Stop charging the machine and arrange collection on 064 529 5863.' },
  { question: 'Do you offer warranty on battery replacements for Emmarentia clients?', answer: 'Yes, every battery replacement comes with a written warranty covering the cell and the labour. If the battery develops a fault within the warranty period we replace it again at no charge, with collection from Emmarentia included. We keep records of every repair on file, so if you phone us with your serial number we can confirm cover immediately.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Battery Replacement Emmarentia',
  description: 'Same-day MacBook battery replacement for Emmarentia clients. Collection included.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Place', name: 'Emmarentia' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Battery Replacement', item: 'https://zasupport.com/battery-replacement' },
    { '@type': 'ListItem', position: 3, name: 'Emmarentia', item: 'https://zasupport.com/battery-replacement/emmarentia' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function BatteryReplacementEmmarentiaPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Battery Replacement', href: '/battery-replacement' },
            { label: 'Emmarentia' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Battery Replacement
              <br /><span className="text-[#0FEA7A]">Emmarentia</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Same-day MacBook battery replacement for Emmarentia residents working from home offices around the Botanical Gardens, Emmarentia Dam, and the leafy streets off Greenhill Road. We handle Service Battery warnings, swollen cells lifting the trackpad, rapid drain, and charging faults, all backed by a written warranty. Collection takes 10-12 minutes from our Hyde Park workshop, roughly 6 km via Barry Hertzog Avenue.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>Hyde Park, Johannesburg | Same-day service | Collecting from Emmarentia</span>
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
              <a href={buildWhatsAppUrl('BAT-EMMARENTIA', 'battery')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
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
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">MacBook Battery Faults We Fix for Emmarentia Clients</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">Emmarentia is approximately 6 km from our Hyde Park workshop. All MacBook models from 2015 onwards are covered, Intel and Apple Silicon. We test actual cell capacity before recommending replacement and provide a written quote before any work proceeds.</p>
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
          <FAQAccordion items={faqs} title={`MacBook Battery Replacement Emmarentia, Common Questions`} />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Services</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'Battery Hub', href: '/battery-replacement' },
              { label: 'Logic Board Repair Emmarentia', href: '/logic-board-repair/emmarentia' },
              { label: 'Liquid Damage Emmarentia', href: '/liquid-damage/emmarentia' },
              { label: 'Screen Repair Emmarentia', href: '/screen-repair/emmarentia' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">MacBook Battery Failing? We Collect.</h2>
            <p className="text-[#7A9E98] mb-6">Same-day replacement. Collecting from Emmarentia. Written warranty.</p>
            <PricingNote variant="inline" />
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <a href={buildWhatsAppUrl('BAT-EMMARENTIA', 'battery')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
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
