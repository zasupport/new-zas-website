import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Battery, Zap, CheckCircle, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Battery Replacement Sandton | ZA Support Hyde Park',
  description:
    'MacBook battery replacement for Sandton clients. Genuine Apple-spec batteries, fast turnaround. We collect from Sandton and replace at our Hyde Park workshop. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/battery-replacement/sandton' },
};

const symptoms = [
  { title: 'Battery Not Charging', desc: 'MacBook plugged in but battery percentage does not increase. Faulty battery cell, charging IC, or MagSafe/USB-C port issue diagnosed and resolved.' },
  { title: 'Swollen Battery', desc: 'Trackpad lifting or case separating indicates a swollen battery. This is a safety issue — replace immediately. We remove and dispose of swollen cells safely.' },
  { title: 'Short Battery Life', desc: 'MacBook running for 2 hours or less on a full charge. Worn cells lose capacity over time. A new battery restores full runtime.' },
  { title: 'Service Battery Warning', desc: 'macOS showing "Service Recommended" or "Replace Now" in the battery status menu. Confirmed degradation — replacement advised.' },
  { title: 'Sudden Shutdowns', desc: 'MacBook shuts down unexpectedly at 20–40% battery. Failing cells cannot deliver consistent voltage under load. Battery replacement resolves this.' },
  { title: 'Battery Health Below 80%', desc: 'Apple considers batteries with health below 80% to be at end of useful life. Replacement restores full capacity and performance.' },
];

const pricing = [
  { item: 'MacBook Air Battery Replacement', note: 'All Intel and Apple Silicon MacBook Air models' },
  { item: 'MacBook Pro 13-inch Battery Replacement', note: 'All 13-inch MacBook Pro models' },
  { item: 'MacBook Pro 14/16-inch Battery Replacement', note: '14-inch and 16-inch MacBook Pro M-series' },
  { item: 'MacBook Pro 15-inch Battery Replacement', note: 'Intel-era 15-inch MacBook Pro' },
  { item: 'Battery Health Diagnostic', note: 'Full battery cycle count and health assessment' },
];

const faqs = [
  {
    question: 'Do you collect MacBooks for battery replacement from Sandton?',
    answer: 'Yes. We offer a collection and return service for Sandton clients. Your MacBook is collected from your home or office in Sandton, the battery is replaced at our Hyde Park workshop approximately 15 minutes away, and your Mac is returned once the work is complete. Contact us on WhatsApp or by phone to arrange a convenient time.',
  },
  {
    question: 'How long does a MacBook battery replacement take?',
    answer: 'Most MacBook battery replacements are completed on the same day or within 24 hours. We carry stock of common battery sizes for MacBook Air and MacBook Pro models. If your model requires a less common battery, we will confirm availability and a specific turnaround time when you contact us.',
  },
  {
    question: 'What batteries do you use?',
    answer: 'We use high-quality Apple-specification replacement batteries that meet or exceed OEM specifications for cycle life and capacity. We do not use low-quality aftermarket cells. Every battery replacement includes a written warranty covering the battery and the installation.',
  },
  {
    question: 'My MacBook battery is swollen. Is it safe to use?',
    answer: 'No. A swollen battery is a safety hazard and the Mac should not be used until the battery is replaced. Swelling is caused by gas build-up inside the battery cells and can, in extreme cases, cause a fire or damage the logic board. If your trackpad is unresponsive, lifting, or your MacBook case is separating, those are signs of swelling. Contact us immediately and we will arrange a same-day collection.',
  },
  {
    question: 'Will a battery replacement fix my MacBook shutting down unexpectedly?',
    answer: 'Usually yes, if the shutdowns occur at 20–40% charge or are battery-health related. When cells degrade they cannot supply stable voltage under load, causing sudden shutdowns. If the shutdowns are caused by a logic board fault rather than the battery, our diagnostic will identify that before any work begins.',
  },
  {
    question: 'How many cycles should a MacBook battery last?',
    answer: 'Apple rates MacBook batteries for 1,000 charge cycles before capacity drops below 80%. In practice, daily users reach this in 3–4 years. Once you are above 1,000 cycles or below 80% health, a replacement is the most cost-effective way to restore your Mac to full performance.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Battery Replacement Sandton',
  description: 'MacBook battery replacement for Sandton clients. Collection from Sandton, same-day or next-day battery replacement at Hyde Park workshop.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Sandton' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Battery Replacement', item: 'https://zasupport.com/battery-replacement' },
    { '@type': 'ListItem', position: 3, name: 'Sandton', item: 'https://zasupport.com/battery-replacement/sandton' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function BatteryReplacementSandtonPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Battery Replacement', href: '/battery-replacement' },
            { label: 'Sandton' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Battery Replacement Sandton
              <br /><span className="text-[#0FEA7A]">— Hyde Park Workshop</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Battery replacement for Sandton MacBook users. We collect from Sandton and replace your battery at our Hyde Park workshop, approximately 15 minutes away. Same-day service available.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>We collect from Sandton and repair at our Hyde Park workshop, approx. 15 min drive</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: Battery, label: 'Apple-spec Batteries' },
                { icon: Zap, label: 'Same-day Service' },
                { icon: CheckCircle, label: 'Written Warranty' },
                { icon: MapPin, label: 'Collect from Sandton' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <Icon className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
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
            MacBook Battery Replacement for Sandton Clients
          </h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              Sandton is Johannesburg&apos;s commercial centre, and professionals working from Sandton City, Morningside, and Katherine Street rely on their MacBooks running through a full working day without interruption. When battery health degrades to the point where your Mac shuts down unexpectedly or will not last more than two hours, productivity stops.
            </p>
            <p>
              ZA Support offers Sandton clients a convenient collection and return service for MacBook battery replacements. We collect from your home or office in Sandton, replace the battery at our Hyde Park workshop, and return your Mac the same day or next day. Our Hyde Park workshop at 1 Hyde Lane is approximately 9.5 km from central Sandton, a 15-minute drive.
            </p>
            <p>
              We replace batteries in all MacBook Air and MacBook Pro models, from Intel-era machines through to the latest M-series. Every battery replacement uses Apple-specification cells and is backed by a written ZA Support warranty. We carry stock of the most common battery sizes, so in most cases your repair will not require an order.
            </p>
            <p>
              If you are unsure whether your battery needs replacing, we will check the cycle count and health percentage before proceeding. There is no charge for the health check.
            </p>
          </div>
        </div>
      </section>

      {/* Symptoms */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-10 text-center">
            Battery Problems We Resolve
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {symptoms.map((s) => (
              <div key={s.title} className="glass-card p-5">
                <h3 className="text-[#E8F4F1] font-bold mb-2">{s.title}</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8">
            Battery Replacement Process for Sandton Clients
          </h2>
          <div className="space-y-6">
            {[
              { step: '01', title: 'Collection from Sandton', desc: 'Contact us via WhatsApp or phone. We arrange a collection from your home or office in Sandton at a time that suits you.' },
              { step: '02', title: 'Battery Health Check', desc: 'We confirm the cycle count, health percentage, and whether replacement is the right fix. No charge for the health check.' },
              { step: '03', title: 'Written Quote', desc: 'Clear pricing confirmed before any work begins. No hidden costs.' },
              { step: '04', title: 'Battery Replacement', desc: 'Apple-specification battery fitted by our technician at the Hyde Park workshop. Old battery disposed of safely.' },
              { step: '05', title: 'Return to Sandton', desc: 'Your MacBook is tested and returned to your Sandton address with a written ZA Support warranty on the battery and installation.' },
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
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8">Battery Replacement Services</h2>
          <div className="glass-card overflow-hidden p-0">
            {pricing.map((item, i) => (
              <div key={item.item} className={`p-5 ${i < pricing.length - 1 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}>
                <p className="text-[#E8F4F1] font-semibold">{item.item}</p>
                <p className="text-[#7A9E98] text-xs mt-0.5">{item.note}</p>
              </div>
            ))}
          </div>
          <p className="text-[#7A9E98] text-xs mt-3">Final price confirmed after battery health check. Written quote before any work begins.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="MacBook Battery Replacement Sandton, Common Questions" />
        </div>
      </section>

      {/* Other Areas */}
      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">We Also Serve These Areas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'Rosebank Battery', href: '/battery-replacement/rosebank' },
              { label: 'Sandton Logic Board', href: '/logic-board-repair/sandton' },
              { label: 'Rosebank Logic Board', href: '/logic-board-repair/rosebank' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Sandton MacBook Battery Issue? We Collect.</h2>
            <p className="text-[#7A9E98] mb-6">Same-day or next-day battery replacement. Written warranty. Hyde Park workshop.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
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
