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
  description: 'MacBook battery replacement for Linden clients. Same-day service. Collection from Linden. Written warranty. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/battery-replacement/linden' },
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
  { question: 'Do you collect MacBooks for battery replacement from Linden?', answer: 'Yes, Linden is one of our regular collection areas. We are roughly 7 km from the suburb and the run via Beyers Naudé Drive or Barry Hertzog Avenue takes 12-15 minutes outside of peak. We collect from homes along 4th Avenue and the side streets, from the businesses around 7th Street and Republic Road, and from the residential blocks closer to the Linden/Emmarentia border. Book on 064 529 5863 or wa.me/27645295863 and we will confirm a tight collection window.' },
  { question: 'How much does MacBook battery replacement cost for Linden clients?', answer: 'Battery replacement pricing depends on the exact model, a 13-inch Air is at the lower end while the 15- and 16-inch Pro batteries cost more because the cell assembly is larger and the labour is longer. We quote in writing after inspection, so a Linden client knows the full cost before authorising the work. An assessment fee applies if you decide not to proceed; if you go ahead with the replacement it is absorbed into the repair.' },
  { question: 'How long does MacBook battery replacement take?', answer: 'Most battery jobs are completed within the same working day once the MacBook is in our workshop. Morning collection from Linden usually means a finished machine ready for return that afternoon or first thing the next morning. Older Pro models with glued-in cells take longer because the adhesive has to be softened and removed cleanly, those occasionally need a second day, and we will tell you up front if yours falls into that category.' },
  { question: 'Will replacing my battery erase my data?', answer: 'No. Battery replacement is purely a hardware swap, the SSD, your files, applications, and macOS settings are untouched. That said, we always recommend a Time Machine backup before handing any laptop over, regardless of the job. If you do not have an external drive set up, the Linden Spar centre and the shops on Republic Road stock them, or we can advise on a suitable one when we collect.' },
  { question: 'How do I check my MacBook battery health?', answer: 'Hold Option and click the Apple menu, then choose System Information and look at Power. You will see cycle count and condition. Cycle counts above 1,000 on most modern MacBooks, or a condition reading of Service Recommended or Service Battery, mean replacement is due. If you are unsure what the numbers mean, send a screenshot via WhatsApp to wa.me/27645295863 and we will tell you honestly whether it is worth replacing or whether the battery still has useful life left.' },
  {
    question: 'Does load shedding damage MacBook batteries?',
    answer: 'Not directly damage, but it accelerates degradation significantly. Each charge-discharge cycle during load shedding counts toward the battery\'s lifespan. MacBooks used through daily load shedding reach the replacement threshold much faster than those on stable power.',
  },
  { question: 'My trackpad feels stiff, could it be the battery?', answer: 'Almost certainly yes. The battery sits directly beneath the trackpad on most MacBook models, and when a cell swells it pushes up against the underside of the trackpad and stiffens the click. This is one of the more common diagnoses we make for Linden machines, we have collected several from the 4th Avenue area where the owner thought the trackpad had failed when in fact it was a swollen battery underneath. Stop using the laptop and call us to collect; a swollen cell is a fire risk and should not be left running.' },
  { question: 'Do you offer warranty on battery replacements for Linden clients?', answer: 'Yes, every battery replacement comes with a written warranty covering the battery itself and the workmanship. If the replacement battery fails within the warranty period under normal use, we collect from Linden, replace it, and return the MacBook at no further cost. The warranty document is emailed to you the same day the repair is completed so you have it on record.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Battery Replacement Linden',
  description: 'Same-day MacBook battery replacement for Linden clients. Collection included.',
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
              Same-day MacBook battery replacement for Linden residents and small businesses. We handle Service Battery warnings, swollen cells lifting the trackpad, rapid drain, and charging faults that leave you tethered to a wall socket. Backed by a written warranty. Collection from Linden runs roughly 7 km from our Hyde Park workshop, typically 12-15 minutes via Beyers Naudé Drive or Barry Hertzog Avenue.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>Hyde Park, Johannesburg | Same-day service | Collecting from Linden</span>
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
          <p className="text-[#7A9E98] mb-8 leading-relaxed">Linden is approximately 7 km from our Hyde Park workshop. All MacBook models from 2015 onwards are covered, Intel and Apple Silicon. We test actual cell capacity before recommending replacement and provide a written quote before any work proceeds.</p>
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
          <FAQAccordion items={faqs} title={`MacBook Battery Replacement Linden, Common Questions`} />
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">MacBook Battery Failing?</h2>
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
