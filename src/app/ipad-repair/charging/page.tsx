import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, CheckCircle, Star, MessageCircle, Shield, Clock, Wrench, Zap, AlertTriangle, Plug } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQ';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildBreadcrumbSchema, buildServiceSchema } from '@/lib/schema';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'iPad Not Charging, Repair Johannesburg | ZA Support',
  description:
    'iPad not charging in Johannesburg? Port cleaning, charging port repair, charging IC fault diagnosis. All models. up-to-3 year warranty. Hyde Park.',
  alternates: { canonical: 'https://zasupport.com/ipad-repair/charging' },
  keywords: [
    'iPad not charging Johannesburg',
    'iPad charging port repair Johannesburg',
    'iPad charging port replacement Johannesburg',
    'iPad USB-C port repair Johannesburg',
    'iPad Lightning port repair Johannesburg',
    'iPad charging problem Johannesburg',
    'iPad won\'t charge Johannesburg',
    'iPad charging slow Johannesburg',
  ],
};

const pricingRows = [
  { service: 'Charging port clean (lint / debris)', price: 'Contact for pricing', note: 'Most common fix' },
  { service: 'Lightning port repair / replacement', price: 'Contact for pricing', note: 'Older iPad models' },
  { service: 'USB-C port repair / replacement', price: 'Contact for pricing', note: 'iPad Air, Pro, mini 6+' },
  { service: 'Charging IC / logic board repair', price: 'Contact for pricing', note: 'Board-level diagnosis first' },
  { service: 'Assessment', price: 'Free', note: 'Assessment: from R599 ex VAT' },
];

const causes = [
  {
    icon: <Plug className="w-5 h-5" />,
    title: 'Dirty or Blocked Port',
    desc: 'The most common cause. Lint, dust, and pocket debris compact into the charging port over time and prevent the cable from making contact. A professional clean often resolves the issue immediately.',
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    title: 'Faulty Cable or Adaptor',
    desc: 'Apple cables have fine internal conductors that break with repeated bending. Always test with a known-good Apple-certified cable and adaptor before assuming the iPad is faulty. We can test this in store.',
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Damaged Charging Port',
    desc: 'Bent or broken pins inside the port, often from inserting the cable at an angle or a drop impact. Physical port damage requires port replacement.',
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    title: 'Charging IC Fault',
    desc: 'The charging integrated circuit on the logic board controls how the battery accepts charge. A failed charging IC means the iPad will not charge regardless of cable or port condition. This requires board-level diagnosis.',
  },
  {
    icon: <Plug className="w-5 h-5" />,
    title: 'Failed Battery',
    desc: 'A battery that has failed completely or is critically degraded may prevent the iPad from charging. If your iPad is showing a charge indicator but the percentage does not increase, battery replacement may be required.',
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Water / Liquid Damage',
    desc: 'Liquid entering the charging port corrodes the pins and nearby components. If your iPad stopped charging after exposure to liquid, bring it in immediately, early intervention prevents further corrosion damage.',
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    title: 'Software / Accessory Lockout',
    desc: 'iPadOS occasionally enters a locked state where it will not accept charge from a non-certified accessory. We test with multiple cables and restore software defaults as part of our assessment.',
  },
  {
    icon: <Plug className="w-5 h-5" />,
    title: 'Intermittent Charging',
    desc: 'iPad charges only when the cable is held at a specific angle. This is almost always a bent pin or debris issue inside the port. A clean or pin straighten usually resolves it.',
  },
];

const processSteps = [
  { step: '1', title: 'Assessment: from R599 ex VAT', desc: 'We test the port, cable, battery, and charging circuit. Most charging faults are diagnosed in under 30 minutes.' },
  { step: '2', title: 'Root Cause Identified', desc: 'We confirm whether the fault is debris, a damaged port, a charging IC fault, or the battery, before quoting.' },
  { step: '3', title: 'Fixed Price Quote', desc: 'You receive a written fixed-price quote. No surprises. No charge if you decline the repair.' },
  { step: '4', title: 'Repair Completed', desc: 'A certified technician carries out the repair. Port clean: same visit. Port replacement: 1–3 hours. Board repair: 1–2 days.' },
  { step: '5', title: 'Collect with Warranty', desc: 'up-to-3 year warranty on parts and labour. Assessment: from R599 ex VAT applies to every repair.' },
];

const faqs = [
  {
    question: 'Why is my iPad not charging?',
    answer:
      'The most common cause is a blocked charging port, lint and pocket debris compact over time and prevent the cable making contact. Other causes include a faulty cable, a damaged port, a failed charging IC on the logic board, or a critically degraded battery. We diagnose all four in a assessment fee (from R599 ex VAT). Contact us for a quote.',
  },
  {
    question: 'How much does iPad charging port repair cost in Johannesburg?',
    answer:
      'A charging port clean resolves most cases. If the port needs replacement, we carry out Lightning or USB-C port repair as needed. Logic board charging IC faults require board-level diagnosis. All repairs include a free initial assessment, no charge if we cannot fix it. Contact us for a quote.',
  },
  {
    question: 'Can a dirty charging port stop an iPad from charging completely?',
    answer:
      'Yes. Compacted lint in the port can prevent the cable pins from making contact at all. The iPad shows no charging indicator and may display a "This accessory may not be supported" alert. A professional clean with the correct tools removes debris without damaging the port pins. Do not use a toothpick, it pushes debris deeper.',
  },
  {
    question: 'My iPad charges slowly, is that a port problem?',
    answer:
      'Slow charging can be caused by a partially blocked port, a low-wattage charger, a faulty cable, or a degraded battery. iPad Pro models require at least a 20W USB-C charger to charge at full speed. We test all these factors in the assessment fee (from R599 ex VAT) before recommending any repair.',
  },
  {
    question: 'Is it worth repairing an iPad charging port?',
    answer:
      'Yes, in the vast majority of cases. A port clean or port replacement is far more economical than replacing an iPad. Even logic board charging IC repairs, while more involved, are a fraction of replacement cost. We give you an honest recommendation, if repair does not make economic sense, we will tell you.',
  },
  {
    question: 'How long does iPad charging port repair take?',
    answer:
      'A port clean is done during your visit, typically 20–30 minutes. Physical port replacement takes 1–3 hours depending on model. Logic board-level charging IC repair takes 1–2 days. We confirm the turnaround time before starting any work.',
  },
  {
    question: 'Can you repair water-damaged iPad charging ports?',
    answer:
      'Yes. Liquid damage to the charging port causes corrosion on the pins and surrounding components. The earlier we see it, the better the outcome. Bring your iPad in immediately after liquid exposure, do not try to charge it, as this can worsen the corrosion. We clean, treat, and test the port and surrounding board area.',
  },
  {
    question: 'Do you offer a warranty on iPad charging repairs?',
    answer:
      'Yes. All iPad charging repairs at ZA Support include a up-to-3 year warranty on parts and labour. If the port or related component fails within the warranty period, we fix it at no charge. This applies to port cleans, port replacements, and logic board charging repairs.',
  },
];

const reviews = [
  {
    name: 'Thabo M.',
    suburb: 'Sandton',
    rating: 5,
    text: 'iPad Air refused to charge. ZA Support cleaned the port in 20 minutes, charges perfectly now. Should have brought it in sooner.',
    date: 'February 2026',
  },
  {
    name: 'Karen W.',
    suburb: 'Rosebank',
    rating: 5,
    text: 'Bent pins in the Lightning port after a drop. ZA Support replaced the port same day. up-to-3 year warranty. Excellent service.',
    date: 'January 2026',
  },
  {
    name: 'Pieter V.',
    suburb: 'Fourways',
    rating: 5,
    text: 'iPad Pro USB-C port had water damage. Fixed in two days, full board assessment, port replacement, cleaned, tested. Professional from start to finish.',
    date: 'March 2026',
  },
];

const aggregateRatingSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'iPad Charging Repair Johannesburg',
  description: 'iPad not charging repair in Johannesburg. Port cleaning, port replacement, logic board charging IC fault. All models. up-to-3 year warranty.',
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
  name: 'iPad Charging Repair Johannesburg',
  description: 'iPad not charging repair in Johannesburg. Dirty port, cable fault, charging IC, battery failure. Port cleaning, port replacement, logic board repair.',
});

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'iPad Repair', url: 'https://zasupport.com/ipad-repair' },
  { name: 'Charging Repair', url: 'https://zasupport.com/ipad-repair/charging' },
];

const faqSchema = buildFaqSchema(faqs);
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

const whatsappUrl = 'https://wa.me/27790539964?text=Hi%20ZA%20Support%2C%20my%20iPad%20is%20not%20charging';

export default function iPadChargingPage() {
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
              { label: 'iPad Repair', href: '/ipad-repair' },
              { label: 'Charging Repair' },
            ]}
          />
          <div className="mt-8 max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[rgba(15,234,122,0.1)] border border-[rgba(15,234,122,0.25)] text-[#0FEA7A] text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <Star className="w-4 h-4 fill-current" /> 4.9 / 5 from 632 verified reviews
            </div>
            <h1
              className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] leading-tight mb-6"
             
            >
              iPad Not Charging?<br />
              <span className="text-[#0FEA7A]">Repair Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4">
              Dirty port, damaged pins, charging IC fault, or dead battery, we diagnose iPad charging
              problems for free. All models, Lightning and USB-C.
              up-to-3 year warranty. Hyde Park, Johannesburg.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#7A9E98] mb-8">
              {['Assessment: from R599 ex VAT', 'Up-to-3 Year Warranty', 'Assessment: from R599 ex VAT', 'Same-day for most faults'].map((item) => (
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
            iPad Charging Repair Prices, Johannesburg 2026
          </h2>
          <p className="text-[#7A9E98] mb-8 max-w-2xl">
            We diagnose the fault first, so you only pay for the repair that is actually needed.
            All prices include labour and a up-to-3 year warranty.
          </p>
          <div className="glass-card overflow-hidden max-w-2xl">
            <div className="grid grid-cols-3 gap-0 bg-[rgba(15,234,122,0.06)] px-6 py-3 border-b border-[rgba(255,255,255,0.06)]">
              <span className="text-[#0FEA7A] text-xs font-bold uppercase tracking-wider">Repair</span>
              <span className="text-[#0FEA7A] text-xs font-bold uppercase tracking-wider text-center">Price</span>
              <span className="text-[#0FEA7A] text-xs font-bold uppercase tracking-wider text-right">Note</span>
            </div>
            {pricingRows.map((row, i) => (
              <div
                key={row.service}
                className={`grid grid-cols-3 gap-0 px-6 py-4 ${i < pricingRows.length - 1 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}
              >
                <span className="text-[#E8F4F1] text-sm font-medium">{row.service}</span>
                <span className="text-[#0FEA7A] font-bold text-sm text-center">{row.price}</span>
                <span className="text-[#7A9E98] text-xs text-right self-center">{row.note}</span>
              </div>
            ))}
          </div>
          <p className="text-[#7A9E98] text-xs mt-4">
            All repairs include written up-to-3 year warranty. Assessment: from R599 ex VAT. Assessment is always free.
          </p>
        </div>
      </section>

      {/* ── Causes ───────────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
            Why Is My iPad Not Charging?
          </h2>
          <p className="text-[#7A9E98] mb-10 max-w-2xl">
            There are eight common causes of iPad charging failure. The most common, and cheapest to fix
           , is a blocked port. We identify the actual cause before recommending any repair.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {causes.map((c) => (
              <div
                key={c.title}
                className="glass-card p-6 flex flex-col gap-3 hover:border-[rgba(15,234,122,0.3)] transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[rgba(15,234,122,0.1)] flex items-center justify-center text-[#0FEA7A]">
                  {c.icon}
                </div>
                <h3 className="text-[#E8F4F1] font-bold text-sm">
                  {c.title}
                </h3>
                <p className="text-[#7A9E98] text-xs leading-relaxed">{c.desc}</p>
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
                Why Bring Your iPad to ZA Support?
              </h2>
              <div className="space-y-5">
                {[
                  {
                    icon: <Shield className="w-5 h-5" />,
                    title: 'Up-to-3 Year Warranty',
                    desc: 'Every charging repair includes a written up-to-3 year warranty. If the fault returns within the warranty period, we fix it at no charge.',
                  },
                  {
                    icon: <Wrench className="w-5 h-5" />,
                    title: 'Diagnose First, Always',
                    desc: 'We identify the root cause before recommending any repair. Most charging faults are a simple port clean, we will not upsell you to a port replacement you do not need.',
                  },
                  {
                    icon: <Clock className="w-5 h-5" />,
                    title: 'Same-Day for Most Faults',
                    desc: 'Port cleans are done during your visit. Physical port replacements typically take 1–3 hours. We confirm turnaround before starting.',
                  },
                  {
                    icon: <CheckCircle className="w-5 h-5" />,
                    title: 'Assessment: from R599 ex VAT',
                    desc: 'If we cannot resolve your iPad charging fault, assessment fee of from R599 ex VAT applies. Our assessment is always free, no charge regardless of outcome.',
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
            How iPad Charging Repair Works
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
          <FAQAccordion items={faqs} title="iPad Not Charging, Frequently Asked Questions" />
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2
              className="text-3xl font-extrabold text-[#E8F4F1] mb-3"
             
            >
              iPad Not Charging?
            </h2>
            <p className="text-[#7A9E98] mb-2">Assessment: from R599 ex VAT.</p>
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
