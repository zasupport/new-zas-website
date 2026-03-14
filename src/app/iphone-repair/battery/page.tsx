import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, CheckCircle, Star, MessageCircle, Shield, Clock, Wrench, Zap, AlertTriangle, Battery } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQ';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildBreadcrumbSchema, buildServiceSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'iPhone Battery Replacement Johannesburg | ZA Support',
  description:
    'iPhone battery replacement in Johannesburg from R 499. All models iPhone 12 through 16 Pro Max. Same-day available. 12-month warranty. Hyde Park, Johannesburg.',
  alternates: { canonical: 'https://zasupport.com/iphone-repair/battery' },
  keywords: [
    'iPhone battery replacement Johannesburg',
    'iPhone battery repair Johannesburg',
    'iPhone battery draining fast Johannesburg',
    'iPhone battery health Johannesburg',
    'iPhone 15 battery replacement Johannesburg',
    'iPhone 16 battery replacement Johannesburg',
    'iPhone battery swollen Johannesburg',
    'iPhone not holding charge Johannesburg',
  ],
};

const pricingRows = [
  { model: 'iPhone 12 / 12 mini', price: 'R 499 – R 549', note: '' },
  { model: 'iPhone 12 Pro / Pro Max', price: 'R 549 – R 599', note: '' },
  { model: 'iPhone 13 / 13 mini', price: 'R 549 – R 599', note: 'Most common' },
  { model: 'iPhone 13 Pro / Pro Max', price: 'R 599 – R 649', note: '' },
  { model: 'iPhone 14 / 14 Plus', price: 'R 599 – R 649', note: '' },
  { model: 'iPhone 14 Pro / Pro Max', price: 'R 649 – R 749', note: '' },
  { model: 'iPhone 15 / 15 Plus', price: 'R 699 – R 799', note: '' },
  { model: 'iPhone 15 Pro / Pro Max', price: 'R 799 – R 899', note: '' },
  { model: 'iPhone 16 / 16 Plus', price: 'R 799 – R 899', note: '' },
  { model: 'iPhone 16 Pro / Pro Max', price: 'R 899 – R 999', note: 'Most popular 2025' },
];

const symptoms = [
  {
    icon: <Battery className="w-5 h-5" />,
    title: 'Battery Draining Fast',
    desc: 'Your iPhone used to last all day but now runs out in a few hours. This is the most common sign that the lithium-ion cells have degraded and the battery needs replacement.',
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    title: 'iPhone Shuts Off at 20%+',
    desc: 'A degraded battery cannot deliver the peak current the processor demands under load. The phone shuts off suddenly even when the percentage shows 20, 30, or 40%.',
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Battery Health Below 80%',
    desc: 'Apple recommends replacing the battery when health drops below 80%. At this level, iOS may enable performance throttling, slowing your iPhone significantly.',
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    title: 'iPhone Runs Hot',
    desc: 'A battery that runs unusually warm during normal use or charging is losing efficiency. Excessive heat accelerates cell degradation further.',
  },
  {
    icon: <Battery className="w-5 h-5" />,
    title: 'Swollen Battery',
    desc: 'If your screen is lifting away from the body or the back is bulging, the battery has swollen from gas build-up. This is a safety issue — bring it in immediately.',
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Performance Throttling',
    desc: 'iOS throttles CPU speed when the battery cannot sustain peak current. If your iPhone feels slow and Settings shows a performance management message, battery replacement restores full speed.',
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    title: 'Stuck at 1% for Hours',
    desc: 'The battery percentage freezes at a low number and will not move even while charging. This indicates a failed battery cell or a faulty battery management chip reading.',
  },
  {
    icon: <Battery className="w-5 h-5" />,
    title: 'Charging Percentage Jumps',
    desc: 'The battery jumps from 40% to 10% instantly, or from 90% to full without passing through intermediate steps. This is a calibration failure caused by cell degradation.',
  },
];

const processSteps = [
  { step: '1', title: 'Free Assessment', desc: 'Bring your iPhone in or WhatsApp us. We check battery health in Settings and give you a written fixed-price quote.' },
  { step: '2', title: 'Battery Confirmed', desc: 'We confirm the correct replacement battery is in stock for your model. Same-day replacement is available for most models.' },
  { step: '3', title: 'Battery Replaced', desc: 'A certified technician replaces the battery under controlled conditions. iPhone battery replacement takes approximately 45–60 minutes.' },
  { step: '4', title: 'Quality Check', desc: 'We verify the new battery charges correctly, confirm battery health reads 100%, and test for unexpected shutdowns before returning your iPhone.' },
  { step: '5', title: 'Collect with Warranty', desc: 'You leave with a 12-month written warranty on the replacement battery and our labour. No Fix No Fee applies if anything goes wrong.' },
];

const faqs = [
  {
    question: 'How much does iPhone battery replacement cost in Johannesburg?',
    answer:
      'iPhone battery replacement in Johannesburg starts at R 499 for iPhone 12 mini and ranges up to R 999 for iPhone 16 Pro Max. The exact price depends on your model. We provide a free battery health check and written fixed-price quote before starting any work.',
  },
  {
    question: 'How do I know if my iPhone battery needs replacing?',
    answer:
      'Go to Settings then Battery then Battery Health and Charging. If Maximum Capacity is below 80%, replacement is recommended. Other signs include unexpected shutdowns, rapid drain, the phone running hot, or a Performance Management message in Battery settings.',
  },
  {
    question: 'How long does iPhone battery replacement take?',
    answer:
      'iPhone battery replacement typically takes 45–60 minutes. If we have your model in stock, same-day service is available. We confirm availability when you WhatsApp or call us.',
  },
  {
    question: 'Will iPhone battery replacement remove my data?',
    answer:
      'No. Battery replacement does not affect your data. We do not need your passcode and we do not access your data. However, we always recommend backing up your iPhone before any repair as a precaution.',
  },
  {
    question: 'My iPhone is slow — will a new battery fix it?',
    answer:
      'Possibly yes. iOS enables performance throttling when the battery cannot sustain peak current. Replacing the battery with a healthy one often restores full CPU speed. You will see the throttling message under Settings then Battery then Battery Health and Charging if this applies to your device.',
  },
  {
    question: 'Is a swollen iPhone battery dangerous?',
    answer:
      'Yes — a swollen battery is a safety concern. Lithium-ion cells produce flammable gas when they fail. If your screen is lifting, the back is bulging, or you can see or feel a bulge under the display, bring it in immediately. Do not leave it on a soft surface like a bed or sofa.',
  },
  {
    question: 'Will Face ID or Touch ID still work after battery replacement?',
    answer:
      'Yes. Battery replacement does not affect Face ID or Touch ID. These are tied to the logic board and secure enclave, not the battery. We verify all functions before returning your iPhone.',
  },
  {
    question: 'What warranty do you provide on iPhone battery replacements?',
    answer:
      'All iPhone battery replacements at ZA Support come with a 12-month written warranty on the replacement battery and our labour. If the battery drains unusually fast, fails to charge, or causes shutdowns within 12 months of our repair, we replace it at no charge.',
  },
];

const reviews = [
  {
    name: 'Kevin M.',
    suburb: 'Sandton',
    rating: 5,
    text: 'iPhone 14 Pro was shutting off at 30%. New battery from ZA Support and it lasts all day again. Under an hour, 12-month warranty. Brilliant service.',
    date: 'February 2026',
  },
  {
    name: 'Sarah P.',
    suburb: 'Bryanston',
    rating: 5,
    text: 'Battery health was at 74% and my iPhone 15 was crawling. ZA Support replaced the battery same day — it is back to full speed. Very professional.',
    date: 'January 2026',
  },
  {
    name: 'Deshlan N.',
    suburb: 'Fourways',
    rating: 5,
    text: 'Swollen battery was pushing my screen out. ZA Support replaced it immediately, explained the safety risk clearly, and even checked the screen for damage. Excellent.',
    date: 'March 2026',
  },
];

const aggregateRatingSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'iPhone Battery Replacement Johannesburg',
  description: 'iPhone battery replacement in Johannesburg for all models iPhone 12 through 16 Pro Max. Rapid drain, unexpected shutdowns, swollen battery. From R 499. 12-month warranty.',
  brand: { '@type': 'Brand', name: 'ZA Support' },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '120',
    bestRating: '5',
    worstRating: '1',
  },
  review: reviews.map((r) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: r.name },
    reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
    reviewBody: r.text,
    datePublished: r.date,
  })),
};

const serviceSchema = buildServiceSchema({
  name: 'iPhone Battery Replacement Johannesburg',
  description: 'iPhone battery replacement in Johannesburg for all models iPhone 12 through 16 Pro Max. Rapid drain, unexpected shutdowns, swollen batteries. From R 499. 12-month warranty.',
  lowPrice: '499',
  highPrice: '999',
});

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'iPhone Repair', url: 'https://zasupport.com/iphone-repair' },
  { name: 'Battery Replacement', url: 'https://zasupport.com/iphone-repair/battery' },
];

const faqSchema = buildFaqSchema(faqs);
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

const whatsappUrl = 'https://wa.me/27790539964?text=Hi%20ZA%20Support%2C%20I%20need%20iPhone%20battery%20replacement';

void LOCAL_BUSINESS_PROVIDER;

export default function iPhoneBatteryPage() {
  return (
    <>
      <SchemaOrg schema={aggregateRatingSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'iPhone Repair', href: '/iphone-repair' },
              { label: 'Battery Replacement' },
            ]}
          />
          <div className="mt-8 max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[rgba(15,234,122,0.1)] border border-[rgba(15,234,122,0.25)] text-[#0FEA7A] text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <Star className="w-4 h-4 fill-current" /> 4.9 / 5 from 120 verified repairs
            </div>
            <h1
              className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] leading-tight mb-6"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              iPhone Battery Replacement<br />
              <span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4">
              Battery draining fast, unexpected shutdowns, swollen battery — we replace iPhone batteries
              from R 499. iPhone 12 through 16 Pro Max. Same-day available.
              12-month warranty. Hyde Park, Johannesburg.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#7A9E98] mb-8">
              {['From R 499', 'No Fix No Fee', '12-month warranty', 'Data safe', 'Same-day available', 'Free assessment'].map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#0FEA7A] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp Us
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link
                href="/iphone-repair"
                className="inline-flex items-center gap-2 border border-[rgba(255,255,255,0.1)] text-[#7A9E98] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(255,255,255,0.04)] transition-all"
              >
                All iPhone Repairs <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
            iPhone Battery Replacement Prices — Johannesburg 2026
          </h2>
          <p className="text-[#7A9E98] mb-8 max-w-2xl">
            All prices include the replacement battery, parts, and labour. We provide a written fixed-price
            quote after a free battery health check. Prices include 12-month warranty.
          </p>
          <div className="glass-card overflow-hidden max-w-2xl">
            <div className="grid grid-cols-3 gap-0 bg-[rgba(15,234,122,0.06)] px-6 py-3 border-b border-[rgba(255,255,255,0.06)]">
              <span className="text-[#0FEA7A] text-xs font-bold uppercase tracking-wider">Model</span>
              <span className="text-[#0FEA7A] text-xs font-bold uppercase tracking-wider text-center">Price Range</span>
              <span className="text-[#0FEA7A] text-xs font-bold uppercase tracking-wider text-right">Note</span>
            </div>
            {pricingRows.map((row, i) => (
              <div
                key={row.model}
                className={`grid grid-cols-3 gap-0 px-6 py-4 ${i < pricingRows.length - 1 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}
              >
                <span className="text-[#E8F4F1] text-sm font-medium">{row.model}</span>
                <span className="text-[#0FEA7A] font-bold text-sm text-center">{row.price}</span>
                <span className="text-[#7A9E98] text-xs text-right self-center">{row.note}</span>
              </div>
            ))}
          </div>
          <p className="text-[#7A9E98] text-xs mt-4">
            All repairs include 12-month written warranty. No Fix No Fee. Data is never accessed or affected.
            Free battery health check — no charge if we cannot repair your device.
          </p>
        </div>
      </section>

      {/* ── Symptoms ─────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
            Battery Problems We Fix
          </h2>
          <p className="text-[#7A9E98] mb-10 max-w-2xl">
            Every symptom listed below is something we see and fix every day.
            If you are not sure whether your issue is the battery or something else — we diagnose first, at no cost.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {symptoms.map((s) => (
              <div
                key={s.title}
                className="glass-card p-6 flex flex-col gap-3 hover:border-[rgba(15,234,122,0.3)] transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[rgba(15,234,122,0.1)] flex items-center justify-center text-[#0FEA7A]">
                  {s.icon}
                </div>
                <h3 className="text-[#E8F4F1] font-bold text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>
                  {s.title}
                </h3>
                <p className="text-[#7A9E98] text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose ZA Support ─────────────────────────────────────────── */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
                Why Choose ZA Support for iPhone Battery Replacement
              </h2>
              <div className="space-y-5">
                {[
                  {
                    icon: <Shield className="w-5 h-5" />,
                    title: '12-Month Written Warranty',
                    desc: 'Every battery replacement carries a 12-month warranty on the battery and labour. If it fails or drains unusually fast, we replace it — no charge.',
                  },
                  {
                    icon: <Clock className="w-5 h-5" />,
                    title: 'Same-Day When in Stock',
                    desc: 'We stock batteries for the most common iPhone models. Most battery replacements are complete within the hour. Call or WhatsApp to confirm stock.',
                  },
                  {
                    icon: <Wrench className="w-5 h-5" />,
                    title: 'Data Always Safe',
                    desc: 'Battery replacement does not require your passcode and does not affect your data. We never access, copy, or view your personal data.',
                  },
                  {
                    icon: <CheckCircle className="w-5 h-5" />,
                    title: 'Swollen Battery Specialists',
                    desc: 'We handle swollen batteries safely and promptly. If your screen is lifting or there is a visible bulge, bring it in immediately — we treat it as a priority.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[rgba(15,234,122,0.1)] flex items-center justify-center text-[#0FEA7A] flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-[#E8F4F1] font-semibold text-sm mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>
                        {item.title}
                      </h3>
                      <p className="text-[#7A9E98] text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {reviews.map((r) => (
                <div key={r.name} className="glass-card p-6 border-l-2 border-[#0FEA7A]">
                  <p className="text-[#7A9E98] text-sm italic mb-3">&ldquo;{r.text}&rdquo;</p>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map((s) => <Star key={s} className="w-3.5 h-3.5 fill-[#0FEA7A] text-[#0FEA7A]" />)}
                    </div>
                    <span className="text-[#E8F4F1] text-xs font-semibold">{r.name}</span>
                    <span className="text-[#7A9E98] text-xs">— {r.suburb}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-10" style={{ fontFamily: 'Syne, sans-serif' }}>
            How iPhone Battery Replacement Works
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {processSteps.map((p) => (
              <div key={p.step} className="glass-card p-6">
                <div className="w-8 h-8 rounded-full bg-[rgba(15,234,122,0.15)] flex items-center justify-center text-[#0FEA7A] font-bold text-sm mb-4">
                  {p.step}
                </div>
                <h3 className="text-[#E8F4F1] font-bold text-sm mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                  {p.title}
                </h3>
                <p className="text-[#7A9E98] text-xs leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="iPhone Battery Replacement — Frequently Asked Questions" />
        </div>
      </section>

      {/* ── Related repairs ───────────────────────────────────────────────── */}
      <section className="py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-[#E8F4F1] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
            Other iPhone Repairs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: 'iPhone Screen Repair', href: '/iphone-repair/screen', price: 'From R 599' },
              { title: 'iPhone Camera Repair', href: '/iphone-repair/camera', price: 'From R 799' },
              { title: 'iPhone Charging Port Repair', href: '/iphone-repair/charging', price: 'From R 399' },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="glass-card p-4 flex items-center justify-between group">
                <div>
                  <p className="text-[#E8F4F1] font-semibold text-sm">{item.title}</p>
                  <p className="text-[#0FEA7A] text-xs mt-0.5">{item.price}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#7A9E98] group-hover:text-[#0FEA7A] transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2
              className="text-3xl font-extrabold text-[#E8F4F1] mb-3"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              iPhone Battery Draining Fast?
            </h2>
            <p className="text-[#7A9E98] mb-2">From R 499. Free battery health check. No Fix No Fee.</p>
            <p className="text-[#7A9E98] text-sm mb-8">
              Hyde Park, Johannesburg — serving Sandton, Rosebank, Fourways, Bryanston and surrounds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp Us Now
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
