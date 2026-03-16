import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Battery, Zap, CheckCircle, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Battery Replacement Rosebank | ZA Support Hyde Park',
  description:
    'MacBook battery replacement for Rosebank clients. 5 minutes from our Hyde Park workshop. Apple-spec batteries, same-day service. Written warranty. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/battery-replacement/rosebank' },
};

const symptoms = [
  { title: 'Battery Not Charging', desc: 'MacBook plugged in but charge percentage does not increase. Battery cell failure, charging circuit fault, or cable issue diagnosed before any part is ordered.' },
  { title: 'Swollen Battery', desc: 'Lifting trackpad or case separation indicates dangerous cell swelling. We remove swollen batteries safely and dispose of them correctly.' },
  { title: 'Short Runtime', desc: 'Battery depletes in 2 hours or less. Cell degradation reduces maximum charge capacity. Replacement restores your Mac to full daily runtime.' },
  { title: 'Service Battery Warning', desc: 'macOS showing "Service Recommended" or "Replace Now" confirms the battery has reached end of useful life. Straightforward replacement at our Hyde Park workshop.' },
  { title: 'Shutdowns at Part Charge', desc: 'MacBook shuts off at 20–40% charge under load. Worn cells cannot maintain stable voltage. Battery replacement resolves this reliably.' },
  { title: 'Battery Health Below 80%', desc: 'Below 80% health, Apple considers the battery due for replacement. New battery restores full capacity, runtime, and macOS performance.' },
];

const pricing = [
  { item: 'MacBook Air Battery Replacement', note: 'All Intel and Apple Silicon MacBook Air models' },
  { item: 'MacBook Pro 13-inch Battery Replacement', note: 'All 13-inch MacBook Pro models' },
  { item: 'MacBook Pro 14/16-inch Battery Replacement', note: '14-inch and 16-inch MacBook Pro M-series' },
  { item: 'MacBook Pro 15-inch Battery Replacement', note: 'Intel-era 15-inch MacBook Pro' },
  { item: 'Battery Health Diagnostic', note: 'Cycle count and health percentage check' },
];

const faqs = [
  {
    question: 'Do you collect from Rosebank for battery replacements?',
    answer: 'Yes. Our Hyde Park workshop is approximately 2–3 km from Rosebank, a 5-minute drive up Jan Smuts Avenue. We collect from your home, office, or a convenient spot in Rosebank, replace the battery, and return your MacBook the same day for most models. Contact us on WhatsApp or by phone to arrange a collection.',
  },
  {
    question: 'How close are you to Rosebank?',
    answer: 'Very close. Our workshop at 1 Hyde Lane, Hyde Park is about 2–3 km from Rosebank. Many Rosebank clients drop their MacBook in at the start of the day on their way to the Rosebank Mall or the Zone and collect it the same afternoon.',
  },
  {
    question: 'How long does a battery replacement take?',
    answer: 'Most MacBook battery replacements are completed the same day. We carry stock of common batteries for MacBook Air and MacBook Pro. If your model requires a less common part, we will confirm stock and turnaround when you contact us.',
  },
  {
    question: 'My MacBook trackpad is not clicking properly. Could that be the battery?',
    answer: 'Possibly. A swollen battery physically pushes up against the trackpad, preventing it from clicking correctly or causing it to feel stiff or raised. This is a common early sign of battery swelling. If you notice any change in trackpad feel, combined with reduced battery life, bring your MacBook in for a check. Swollen batteries are a safety issue and should be replaced promptly.',
  },
  {
    question: 'What batteries do you use?',
    answer: 'We use Apple-specification replacement batteries that match OEM capacity and cycle-life ratings. We do not use the cheapest available cells. Every battery replacement is covered by a written ZA Support warranty on both the battery and the installation.',
  },
  {
    question: 'Will replacing the battery improve my MacBook performance?',
    answer: 'Yes, on Intel models in particular. macOS applies CPU throttling when battery health is significantly degraded, to prevent unexpected shutdowns. This throttling reduces performance noticeably on older Intel MacBooks. Replacing the battery removes the throttling and restores full CPU and GPU performance. On M-series Macs, performance throttling is less pronounced, but runtime improvement is immediate.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Battery Replacement Rosebank',
  description: 'MacBook battery replacement for Rosebank clients. 5 minutes from Hyde Park workshop. Apple-spec batteries, same-day service, written warranty.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Rosebank' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Battery Replacement', item: 'https://zasupport.com/battery-replacement' },
    { '@type': 'ListItem', position: 3, name: 'Rosebank', item: 'https://zasupport.com/battery-replacement/rosebank' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function BatteryReplacementRosebankPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Battery Replacement', href: '/battery-replacement' },
            { label: 'Rosebank' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Battery Replacement Rosebank
              <br /><span className="text-[#0FEA7A]">— 5 Minutes from Hyde Park</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Rosebank is 5 minutes from our Hyde Park workshop. Drop in or let us collect — we replace MacBook batteries with Apple-specification cells and return your Mac the same day.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>We collect from Rosebank and repair at our Hyde Park workshop, approx. 5 min drive (2–3 km)</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: Battery, label: 'Apple-spec Batteries' },
                { icon: Zap, label: 'Same-day Service' },
                { icon: CheckCircle, label: 'Written Warranty' },
                { icon: MapPin, label: '5 Min from Rosebank' },
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
            MacBook Battery Replacement for Rosebank
          </h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              Rosebank is home to a concentration of creative agencies, media businesses, and professionals who depend on their MacBooks throughout the working day. When a degraded battery starts cutting sessions short or triggering unexpected shutdowns, it disrupts client work and erodes confidence in the machine. A battery replacement is a fast, straightforward fix that restores full runtime.
            </p>
            <p>
              Our Hyde Park workshop at 1 Hyde Lane is approximately 2–3 km from Rosebank, up Jan Smuts Avenue. Rosebank clients can drop their MacBook in on the way to the office, leave it with us during the working day, and collect a fully tested Mac with a fresh battery on the way home. For clients who prefer it, we also collect and return.
            </p>
            <p>
              We replace batteries in all MacBook models: MacBook Air (all Intel and M-series), MacBook Pro 13-inch, 14-inch, 15-inch, and 16-inch. Every battery is Apple-specification grade, matched to your model&apos;s capacity and cycle ratings. The old battery is removed and disposed of correctly.
            </p>
            <p>
              If you are unsure whether your battery needs replacing, message us the model and cycle count from System Information and we can advise before you bring it in.
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
            From Rosebank to Hyde Park and Back — Same Day
          </h2>
          <div className="space-y-6">
            {[
              { step: '01', title: 'Drop In or Request Collection', desc: 'Drop your MacBook at our Hyde Park workshop (5 min from Rosebank), or message us and we will arrange a Rosebank collection.' },
              { step: '02', title: 'Battery Health Check', desc: 'We confirm cycle count, health percentage, and the correct replacement battery for your model. No charge for this check.' },
              { step: '03', title: 'Written Quote', desc: 'Fixed price confirmed in writing before any work begins. No surprises.' },
              { step: '04', title: 'Battery Replacement', desc: 'Apple-specification battery fitted by our technician. Old battery removed and disposed of correctly.' },
              { step: '05', title: 'Same-day Return', desc: 'MacBook tested under load and ready for collection or returned to your Rosebank address. Written warranty included.' },
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
          <FAQAccordion items={faqs} title="MacBook Battery Replacement Rosebank, Common Questions" />
        </div>
      </section>

      {/* Other Areas */}
      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">We Also Serve These Areas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'Sandton Battery', href: '/battery-replacement/sandton' },
              { label: 'Rosebank Logic Board', href: '/logic-board-repair/rosebank' },
              { label: 'Sandton Logic Board', href: '/logic-board-repair/sandton' },
              { label: 'Sandton Screen Repair', href: '/screen-repair/sandton' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Rosebank MacBook Battery Issue? We Are 5 Minutes Away.</h2>
            <p className="text-[#7A9E98] mb-6">Drop in or let us collect. Same-day service. Written warranty.</p>
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
