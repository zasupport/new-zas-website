import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, CheckCircle, Star, MessageCircle, Shield, Clock, Wrench, Zap, AlertTriangle, Battery } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQ';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildBreadcrumbSchema, buildServiceSchema } from '@/lib/schema';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'iPad Battery Replacement Johannesburg | ZA Support',
  description:
    'iPad battery replacement in Johannesburg. iPad dying at 40%, swollen back, slow charging. All models. Same-day available. up-to-3 year warranty. Hyde Park, Johannesburg.',
  alternates: { canonical: 'https://zasupport.com/ipad-repair/battery' },
  keywords: [
    'iPad battery replacement Johannesburg',
    'iPad battery repair Johannesburg',
    'iPad not holding charge Johannesburg',
    'iPad battery swollen Johannesburg',
    'iPad dying quickly Johannesburg',
    'iPad Pro battery replacement Johannesburg',
    'iPad Air battery replacement Johannesburg',
    'iPad mini battery replacement Johannesburg',
  ],
};

const pricingRows = [
  { model: 'iPad mini (all generations)', price: 'Contact for pricing', note: '' },
  { model: 'iPad Air (all generations)', price: 'Contact for pricing', note: 'Most popular repair' },
  { model: 'iPad Pro 11" / 12.9"', price: 'Contact for pricing', note: 'M-series + older' },
];

const symptoms = [
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'iPad Dying at 40% or 50%',
    desc: 'The battery gauge jumps from 40% to zero suddenly. This is a classic sign of a degraded lithium cell that can no longer sustain load at lower charge levels.',
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    title: 'Swollen or Raised Back Cover',
    desc: 'A bulging back panel means the battery is swelling. This is a safety risk, continued use can crack the screen or damage internal components. Repair immediately.',
  },
  {
    icon: <Battery className="w-5 h-5" />,
    title: 'Barely Lasts Half a Day',
    desc: 'An iPad that used to run all day now needs charging by noon. Battery capacity degrades after 500–800 charge cycles. Replacement restores full-day battery life.',
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: 'Takes All Day to Charge',
    desc: 'Very slow charging can indicate a degraded battery struggling to accept charge. We test the battery and charging circuit to identify the correct cause.',
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'iPad Shuts Off at Random',
    desc: 'Unexpected shutdowns, even at 60% or 70%, are caused by voltage sags in a failing battery. Replacement eliminates the shutdowns.',
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    title: 'iPad Only Works Plugged In',
    desc: 'If your iPad shuts off the moment you unplug it, the battery has lost its ability to hold any charge. This requires immediate replacement.',
  },
  {
    icon: <Battery className="w-5 h-5" />,
    title: 'Battery Health Below 80%',
    desc: 'Apple recommends replacement when battery health drops below 80%. At this point capacity loss is noticeable and will worsen with every charge cycle.',
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'iPad Overheats While Charging',
    desc: 'Excessive heat during charging can signal a failing battery or faulty charging circuit. We diagnose the cause before replacing any parts.',
  },
];

const processSteps = [
  { step: '1', title: 'Assessment: from R599', desc: 'Bring your iPad in or WhatsApp us a photo. We test the battery and provide a written fixed-price quote.' },
  { step: '2', title: 'Battery Sourced', desc: 'We confirm the correct OEM-grade replacement battery is available for your model before booking the repair.' },
  { step: '3', title: 'Battery Replaced', desc: 'A certified technician replaces the battery. Most iPad battery replacements take 1–2 hours.' },
  { step: '4', title: 'Full Calibration', desc: 'We run a charge-discharge cycle to calibrate the new battery and verify accurate charge reporting.' },
  { step: '5', title: 'Collect with Warranty', desc: 'You collect with a up-to-3 year warranty on the replacement battery and our labour. Assessment: from R599.' },
];

const faqs = [
  {
    question: 'How much does iPad battery replacement cost in Johannesburg?',
    answer:
      'iPad battery replacement pricing depends on your model and generation. We provide a battery health test and a written fixed-price quote before starting any work.',
  },
  {
    question: 'How do I know if my iPad battery needs replacing?',
    answer:
      'Key signs are: iPad dying at 40–50% charge; noticeable bulging or raised back cover; barely lasting half a day; shutting off randomly; only working when plugged in. Any of these symptoms means your battery is degraded. We test battery health and give you an accurate capacity reading.',
  },
  {
    question: 'Is a swollen iPad battery dangerous?',
    answer:
      'Yes. A swollen battery is a lithium cell failure and is a safety hazard. The expanding gas inside can crack the screen from beneath, damage the logic board, and in rare cases cause a thermal event. If you notice your iPad back cover is raised or you can rock it on a flat surface, bring it in immediately, do not charge it overnight.',
  },
  {
    question: 'How long does iPad battery replacement take?',
    answer:
      'Most iPad battery replacements take 1–2 hours. iPad Pro models with additional adhesive bonding may take 2–3 hours. If we have your battery in stock, same-day repair is available. We confirm turnaround time when you bring it in.',
  },
  {
    question: 'Will data be lost during an iPad battery replacement?',
    answer:
      'No. Battery replacement is a hardware procedure and does not affect your storage, apps, or settings. However, we always recommend backing up your iPad to iCloud or your Mac before any repair, your data is your responsibility.',
  },
  {
    question: 'Can you replace an iPad Pro battery?',
    answer:
      'Yes. We replace batteries across all iPad Pro generations, including 11" and 12.9" models from the first generation through to M4. iPad Pro batteries require careful removal of the screen adhesive, which is why the repair takes slightly longer and costs a little more than standard iPad models.',
  },
  {
    question: 'How many charge cycles before an iPad battery needs replacing?',
    answer:
      'Apple rates most iPad batteries for 1,000 charge cycles to 80% capacity. In practice, batteries start degrading noticeably around 500–700 cycles. If your iPad is 3–4 years old and used daily, battery replacement will likely restore full-day battery life noticeably.',
  },
  {
    question: 'Do you offer a warranty on iPad battery replacements?',
    answer:
      'Yes. All iPad battery replacements at ZA Support include a up-to-3 year warranty on the replacement battery and our labour. If the battery capacity drops unexpectedly or the replacement develops a fault within the warranty period, we fix it at no charge.',
  },
];

const reviews = [
  {
    name: 'Brendan H.',
    suburb: 'Sandton',
    rating: 5,
    text: 'iPad Air was dying at 40% every time. ZA Support replaced the battery same day and it now runs easily through a full day. Brilliant.',
    date: 'February 2026',
  },
  {
    name: 'Nadia K.',
    suburb: 'Rosebank',
    rating: 5,
    text: 'Noticed my iPad mini back was slightly raised, ZA Support confirmed a swollen battery and replaced it within two hours. Safe again and charges perfectly.',
    date: 'January 2026',
  },
  {
    name: 'Gareth S.',
    suburb: 'Bryanston',
    rating: 5,
    text: 'iPad Pro 11" was shutting off randomly at 60%. Fixed in two hours, up-to-3 year warranty. Should have done this months ago.',
    date: 'March 2026',
  },
];

const aggregateRatingSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'iPad Battery Replacement Johannesburg',
  description: 'iPad battery replacement service in Johannesburg for all iPad mini, Air, and Pro models. Same-day available. up-to-3 year warranty.',
  brand: { '@type': 'Brand', name: 'ZA Support' },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '632',
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
  name: 'iPad Battery Replacement Johannesburg',
  description: 'iPad battery replacement in Johannesburg for all iPad mini, Air, and Pro models. iPad dying, swollen battery, slow charging. up-to-3 year warranty.',
});

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'iPad Repair', url: 'https://zasupport.com/ipad-repair' },
  { name: 'Battery Replacement', url: 'https://zasupport.com/ipad-repair/battery' },
];

const faqSchema = buildFaqSchema(faqs);
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

const whatsappUrl = 'https://wa.me/27790539964?text=Hi%20ZA%20Support%2C%20I%20need%20iPad%20battery%20replacement';

export default function iPadBatteryPage() {
  return (
    <>
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'iPad Repair', href: '/ipad-repair' },
              { label: 'Battery Replacement' },
            ]}
          />
          <div className="mt-8 max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[rgba(15,234,122,0.1)] border border-[rgba(15,234,122,0.25)] text-[#0FEA7A] text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <Star className="w-4 h-4 fill-current" /> 4.9 / 5 from 632 verified reviews
            </div>
            <h1
              className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] leading-tight mb-6"
             
            >
              iPad Battery<br />
              <span className="text-[#0FEA7A]">Replacement Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4">
              iPad dying at 40%, swollen back, or barely lasting the morning? We replace iPad batteries.
              iPad mini, iPad Air, iPad Pro. Same-day available. up-to-3 year warranty.
              Hyde Park, Johannesburg.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#7A9E98] mb-8">
              {['Assessment: from R599', 'Up-to-3 Year Warranty', 'Same-day available', 'Battery health test included', 'Swollen battery, urgent repair'].map((item) => (
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
                href="/ipad-repair"
                className="inline-flex items-center gap-2 border border-[rgba(255,255,255,0.1)] text-[#7A9E98] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(255,255,255,0.04)] transition-all"
              >
                All iPad Repairs <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
            iPad Battery Replacement Prices, Johannesburg 2026
          </h2>
          <p className="text-[#7A9E98] mb-8 max-w-2xl">
            All prices include OEM-grade battery, labour, and post-replacement calibration.
            We confirm the exact price for your model before starting any work.
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
            All repairs include written up-to-3 year warranty. Assessment: from R599. Battery health assessment included.
          </p>
        </div>
      </section>

      {/* ── Signs your battery needs replacing ───────────────────────────── */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
            Signs Your iPad Battery Needs Replacing
          </h2>
          <p className="text-[#7A9E98] mb-10 max-w-2xl">
            Most iPad battery faults are easy to identify. If you recognise any of these symptoms,
            bring your iPad in, we test battery health and give you a written quote before starting.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {symptoms.map((s) => (
              <div
                key={s.title}
                className="glass-card p-6 flex flex-col gap-3 hover:border-[rgba(15,234,122,0.3)] transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[rgba(15,234,122,0.1)] flex items-center justify-center text-[#0FEA7A]">
                  {s.icon}
                </div>
                <h3 className="text-[#E8F4F1] font-bold text-sm">
                  {s.title}
                </h3>
                <p className="text-[#7A9E98] text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why ZA Support ───────────────────────────────────────────────── */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">
                Why Replace Your iPad Battery at ZA Support?
              </h2>
              <div className="space-y-5">
                {[
                  {
                    icon: <Shield className="w-5 h-5" />,
                    title: 'Up-to-3 Year Warranty',
                    desc: 'Every battery replacement includes a warranty on the replacement cell and labour. Unexpected capacity loss or faults are covered at no cost.',
                  },
                  {
                    icon: <Clock className="w-5 h-5" />,
                    title: 'Same-Day When in Stock',
                    desc: 'We stock batteries for the most common iPad models. Same-day repair is available when your battery is in stock, confirmed when you bring it in.',
                  },
                  {
                    icon: <Wrench className="w-5 h-5" />,
                    title: 'Battery Health Test Included',
                    desc: 'We test your iPad battery health before quoting. If the battery is fine and the fault is elsewhere, we diagnose that too, no unnecessary replacements.',
                  },
                  {
                    icon: <CheckCircle className="w-5 h-5" />,
                    title: 'OEM-Grade Replacement Cells',
                    desc: 'We do not use cheap no-name batteries. Our replacement cells meet Apple capacity and cycle specifications and are tested before installation.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[rgba(15,234,122,0.1)] flex items-center justify-center text-[#0FEA7A] flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-[#E8F4F1] font-semibold text-sm mb-1">
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
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-10">
            How iPad Battery Replacement Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {processSteps.map((p) => (
              <div key={p.step} className="glass-card p-6">
                <div className="w-8 h-8 rounded-full bg-[rgba(15,234,122,0.15)] flex items-center justify-center text-[#0FEA7A] font-bold text-sm mb-4">
                  {p.step}
                </div>
                <h3 className="text-[#E8F4F1] font-bold text-sm mb-2">
                  {p.title}
                </h3>
                <p className="text-[#7A9E98] text-xs leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="iPad Battery Replacement, Frequently Asked Questions" />
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2
              className="text-3xl font-extrabold text-[#E8F4F1] mb-3"
             
            >
              iPad Battery Dying?
            </h2>
            <p className="text-[#7A9E98] mb-2">Battery health test included. Assessment: from R599.</p>
            <p className="text-[#7A9E98] text-sm mb-8">
              Hyde Park, Johannesburg, serving Sandton, Rosebank, Fourways, Bryanston and surrounds.
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
