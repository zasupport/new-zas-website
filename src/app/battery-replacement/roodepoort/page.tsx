import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Battery, Zap, CheckCircle, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Battery Replacement Roodepoort | ZA Support Hyde Park',
  description:
    'MacBook battery replacement for Roodepoort clients. Genuine Apple-spec batteries, fast turnaround. We collect from Roodepoort and replace at our Hyde Park workshop. Assessment from R599. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/battery-replacement/roodepoort' },
};

const symptoms = [
  { title: 'Battery Not Charging', desc: 'MacBook plugged in but battery percentage does not increase. Faulty battery cell, charging IC, or MagSafe/USB-C port issue diagnosed and resolved.' },
  { title: 'Swollen Battery', desc: 'Trackpad lifting or case separating indicates a swollen battery. This is a safety issue — replace immediately. We remove and dispose of swollen cells safely.' },
  { title: 'Short Battery Life', desc: 'MacBook running for 2 hours or less on a full charge. Worn cells lose capacity over time. A new battery restores full runtime.' },
  { title: 'Battery Service Warning', desc: 'macOS showing "Service Recommended" or "Replace Now" in the battery menu. We replace before the cell fails completely.' },
  { title: 'MacBook Dies at 20%', desc: 'Sudden shutdown at partial charge indicates degraded cells that can no longer deliver consistent voltage under load.' },
  { title: 'Overheating During Charge', desc: 'Excessive heat during charging points to a failing battery or charging circuit. Assessed and resolved before it causes board damage.' },
];

const faqs = [
  {
    question: 'Do you collect MacBooks for battery replacement from Roodepoort?',
    answer: 'Yes. We collect from Roodepoort, Florida, and the West Rand business corridor and carry out the replacement at our Hyde Park workshop, approximately 32 minutes away. Contact us on WhatsApp to arrange a convenient collection time.',
  },
  {
    question: 'How long does a MacBook battery replacement take?',
    answer: 'Most MacBook battery replacements are completed within 24–48 hours of collection. Same-day turnaround is available for common models with stock in workshop. You will receive a confirmed timeframe with your quote.',
  },
  {
    question: 'What batteries do you use?',
    answer: 'We use Apple-spec replacement batteries that meet the original capacity, voltage, and cycle-count specifications. All batteries come with a ZA Support warranty covering defects and premature degradation.',
  },
  {
    question: 'How do I know if my MacBook battery needs replacing?',
    answer: 'Key signs: battery life under 3 hours on a full charge, macOS showing Service Recommended, sudden shutdowns at partial charge, swollen trackpad, or battery not charging. Run System Information > Power to check cycle count — over 800–1000 cycles typically means replacement is due.',
  },
  {
    question: 'My MacBook trackpad is stiff or raised. Is that a battery issue?',
    answer: 'Yes — a raised or stiff trackpad almost always indicates a swollen battery. Do not continue using the machine. A swollen lithium battery is a fire risk. Contact us immediately for an urgent collection from Roodepoort.',
  },
  {
    question: 'What is the assessment fee for a battery replacement?',
    answer: 'Assessment from R599. This covers inspection of the battery, charging circuit, and any related faults. If a straight battery replacement is confirmed, the assessment fee is applied to the repair cost.',
  },
  {
    question: 'Do you replace batteries in Apple Silicon MacBooks?',
    answer: 'Yes. We replace batteries in MacBook Air M1, M2, M3 and MacBook Pro M1, M2, M3. Apple Silicon models use updated battery designs and we stock appropriate replacements for current-generation machines.',
  },
  {
    question: 'What is your warranty on battery replacements?',
    answer: 'All battery replacements carry a ZA Support warranty. If the battery develops a fault or does not hold charge within the warranty period, we replace it at no additional cost.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Battery Replacement Roodepoort',
  description: 'MacBook battery replacement for Roodepoort clients. Apple-spec batteries, fast turnaround. Collection from Roodepoort.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Roodepoort' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Battery Replacement', item: 'https://zasupport.com/battery-replacement' },
    { '@type': 'ListItem', position: 3, name: 'Roodepoort', item: 'https://zasupport.com/battery-replacement/roodepoort' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function BatteryReplacementRoodepoortPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Battery Replacement', href: '/battery-replacement' },
            { label: 'Roodepoort' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Battery Replacement Roodepoort
              <br /><span className="text-[#0FEA7A]">— Restore Full Runtime</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Battery replacement for Roodepoort residents and businesses. Apple-spec batteries, fast turnaround. We collect from Roodepoort and carry out the replacement at our Hyde Park workshop. Assessment from R599.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>Collection from Roodepoort — approx. 32 min to our Hyde Park workshop</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: Battery, label: 'Apple-spec Batteries' },
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
              <a href={buildWhatsAppUrl('BAT-ROODEPOO', 'battery')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
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
            Battery Symptoms We Address
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {symptoms.map((item) => (
              <div key={item.title} className="glass-card p-5">
                <h3 className="text-[#E8F4F1] font-bold mb-2">{item.title}</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Battery Replacement Roodepoort — Common Questions" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">We Also Serve These Areas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: "Randburg", href: "/battery-replacement/randburg" },
              { label: "Northcliff", href: "/battery-replacement/northcliff" },
              { label: "Krugersdorp", href: "/battery-replacement/krugersdorp" },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">MacBook Battery Issue in Roodepoort? Assessment from R599.</h2>
            <p className="text-[#7A9E98] mb-6">We collect from Roodepoort. Assessment from R599. No Fix No Fee. 12-month warranty.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('BAT-ROODEPOO', 'battery')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
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
