import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Phone,
  ArrowRight,
  CheckCircle,
  Star,
  MessageCircle,
  Shield,
  Clock,
  Wrench,
  AlertTriangle,
  XCircle,
  Info,
} from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQ';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildServiceSchema } from '@/lib/schema';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Keyboard Repair Johannesburg | ZA Support',
  description:
    'MacBook keyboard repair in Johannesburg. Butterfly keyboard replacement, scissor keyboard replacement, stuck keys, broken keycaps, liquid damage. MacBook Air and Pro, all models. Hyde Park, Johannesburg. warranty on scissor keyboards.',
  alternates: { canonical: 'https://zasupport.com/macbook-repair/keyboard' },
  keywords: [
    'MacBook keyboard repair Johannesburg',
    'MacBook butterfly keyboard repair Johannesburg',
    'MacBook keyboard replacement Johannesburg',
    'MacBook sticky keys repair Johannesburg',
    'MacBook broken keyboard Johannesburg',
    'MacBook Pro keyboard repair Johannesburg',
    'MacBook Air keyboard repair Johannesburg',
    'MacBook keyboard not working Johannesburg',
  ],
};

/* ─────────────────────────────────────────────────────────────
   PRICING DATA
───────────────────────────────────────────────────────────── */
const pricingRows = [
  {
    model: 'Butterfly keyboard replacement (2016–2019)',
    warranty: 'No 3-month warranty, design defect',
    noWarranty: true,
    note: 'See butterfly explainer below',
  },
  {
    model: 'Scissor keyboard replacement (2020+)',
    warranty: '3-month warranty',
    noWarranty: false,
    note: 'MacBook Air M1/M2/M3',
  },
  {
    model: 'MacBook Pro 14" / 16" keyboard (M-series)',
    warranty: '3-month warranty',
    noWarranty: false,
    note: 'M1 / M2 / M3 / M4',
  },
  {
    model: 'Single keycap replacement',
    warranty: '3-month warranty',
    noWarranty: false,
    note: 'Where mechanically feasible',
  },
  {
    model: 'Keyboard cleaning + stuck key depress',
    warranty: '1-month warranty',
    noWarranty: false,
    note: 'Dust, debris, minor spill',
  },
];

/* ─────────────────────────────────────────────────────────────
   SYMPTOMS
───────────────────────────────────────────────────────────── */
const symptoms = [
  {
    icon: <Wrench className="w-5 h-5" />,
    title: 'Keys Sticking or Requiring Extra Force',
    desc: 'The most common butterfly keyboard failure. Dust or a single crumb under the mechanism causes the key to stick or require significantly more force to press.',
  },
  {
    icon: <XCircle className="w-5 h-5" />,
    title: 'Keys Not Registering',
    desc: 'You press a key and nothing happens. On butterfly keyboards this usually means the mechanism has physically failed. On newer models it may be a connection issue or liquid ingress.',
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    title: 'Double-Typing (Ghost Keypresses)',
    desc: 'You type one letter and two appear. A hallmark butterfly keyboard failure mode, the thin mechanism bounces, registering the keypress twice. Apple acknowledged this fault.',
  },
  {
    icon: <XCircle className="w-5 h-5" />,
    title: 'Keycap Popped Off',
    desc: 'The butterfly clip that holds the keycap is extremely fragile. Once a butterfly keycap pops, it is nearly impossible to reattach reliably. Scissor-switch keycaps are more forgiving.',
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    title: 'Liquid Spill on Keyboard',
    desc: 'Even a small amount of liquid can corrode keyboard contacts. We clean and assess the underlying components, if liquid reached the logic board we will check that separately.',
  },
  {
    icon: <Wrench className="w-5 h-5" />,
    title: 'Entire Row of Keys Dead',
    desc: 'When a full row stops working this usually points to a failed ribbon connector or the keyboard assembly itself rather than individual key faults.',
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    title: 'Wrong Characters Appearing',
    desc: 'Keys registering the wrong character can indicate keyboard damage, a firmware issue, or an incorrect keyboard layout in macOS. We diagnose the root cause before replacing.',
  },
  {
    icon: <XCircle className="w-5 h-5" />,
    title: 'Trackpad Clicking Through Keyboard',
    desc: 'A swollen battery pushing up from underneath causes the keyboard deck to flex, which can result in phantom trackpad clicks. The battery must be replaced first.',
  },
];

/* ─────────────────────────────────────────────────────────────
   BUTTERFLY EXPLAINER
───────────────────────────────────────────────────────────── */
const butterflyTimeline = [
  {
    year: '2015',
    event: 'Apple introduces the butterfly keyboard on the 12" MacBook. Thinner than any previous Apple keyboard, but tolerance for dust is severely reduced.',
  },
  {
    year: '2016',
    event: 'Butterfly mechanism rolls out to MacBook Pro 13" and 15". Reports of sticky and non-registering keys begin almost immediately after launch.',
  },
  {
    year: '2018',
    event: 'Apple introduces a silicone membrane under the keys to keep dust out, but failures continue. Apple launches a silent Keyboard Service Programme covering affected models.',
  },
  {
    year: '2019',
    event: 'MacBook Pro 16" ships with a new scissor-switch "Magic" keyboard. Apple quietly acknowledges the butterfly design\'s dust tolerance problem by abandoning it entirely.',
  },
  {
    year: '2020',
    event: 'All MacBook Air and MacBook Pro 13" models switch to scissor-switch keyboards. The butterfly mechanism is discontinued across the entire Mac line.',
  },
];

/* ─────────────────────────────────────────────────────────────
   SUBURB REVIEWS
───────────────────────────────────────────────────────────── */
const reviews = [
  {
    name: 'Natasha B.',
    suburb: 'Sandton',
    rating: 5,
    text: 'My 2018 MacBook Pro was double-typing on every keystroke, a nightmare for writing. ZA Support explained the butterfly keyboard issue clearly, replaced the top case the same day and gave me a straight answer about why it carries no 3-month warranty. Honest and fast.',
    date: 'February 2026',
  },
  {
    name: 'Gareth O.',
    suburb: 'Fourways',
    rating: 5,
    text: 'Spilled coffee on my MacBook Air M2 keyboard at 7am. Dropped it off at Hyde Park by 9am, picked it up at 2pm with a brand new scissor keyboard and 3-month warranty. Incredible turnaround.',
    date: 'January 2026',
  },
  {
    name: 'Priya S.',
    suburb: 'Rosebank',
    rating: 5,
    text: 'Three keys had completely stopped working on my 2019 MacBook Pro 15". ZA Support replaced the entire top case, explained the butterfly design flaw and offered the scissor-switch upgrade. No upsell pressure, just facts. Happy with the result.',
    date: 'March 2026',
  },
];

/* ─────────────────────────────────────────────────────────────
   FAQs
───────────────────────────────────────────────────────────── */
const faqs = [
  {
    question: 'How much does MacBook keyboard repair cost in Johannesburg?',
    answer:
      'MacBook keyboard repair cost depends on your model and the specific fault. Scissor-switch replacements (2020 and newer) carry a 3-month warranty. We provide a assessment fee (R899 ex VAT) and a fixed written quote before starting any work.',
  },
  {
    question: 'Why does the butterfly keyboard carry no warranty?',
    answer:
      'Apple\'s butterfly keyboard (used on MacBook Pro 2016–2019 and MacBook Air 2018–2019) has a fundamental design flaw: the mechanism is so thin that a single particle of dust or debris can cause it to fail. Apple itself acknowledged this by replacing the entire keyboard design in 2019 and running a silent Keyboard Service Programme for affected models. Because the failure is inherent to the design rather than a workmanship issue, we cannot warrant a like-for-like replacement, it will very likely fail again. We are transparent about this upfront rather than replacing it, collecting the warranty claim, and repeating the cycle.',
  },
  {
    question: 'Can you replace my butterfly keyboard with the newer scissor-switch design?',
    answer:
      'We offer a scissor-switch keyboard adapter for select butterfly keyboard MacBook Pro models where compatible parts are available. This involves replacing the top case with an updated assembly that uses the more reliable scissor-switch mechanism. Ask us when you bring your machine in, not all models have compatible adapters available and the cost is higher than a like-for-like replacement.',
  },
  {
    question: 'How long does MacBook keyboard replacement take?',
    answer:
      'Keyboard cleaning and single keycap replacements typically take 1–2 hours. A full keyboard replacement takes 2–4 hours. On butterfly keyboard models (2016–2019), the keyboard is riveted to the top case, so the entire top case must be replaced, this takes 3–4 hours. We will confirm turnaround time when you drop your MacBook off.',
  },
  {
    question: 'My MacBook keyboard was damaged by a liquid spill. Can it be fixed?',
    answer:
      'Yes. Liquid-damaged keyboards are one of our most common repairs. We clean the keyboard and assess the underlying connections as part of the process. If liquid has reached the logic board we assess that separately, a keyboard replacement combined with a board-level clean often fully restores the machine. Come in as quickly as possible after a spill: the longer liquid sits on the board, the more corrosion develops.',
  },
  {
    question: 'Will keyboard replacement affect my Touch Bar?',
    answer:
      'On MacBook Pro models with a Touch Bar (2016–2021), the Touch Bar is part of the top case assembly. When we replace the keyboard on those models, the Touch Bar is replaced as part of the same unit. Touch ID calibration to your Apple ID and biometric data remains unaffected.',
  },
  {
    question: 'Do you repair MacBook Pro 14" and 16" M-series keyboards?',
    answer:
      'Yes. We repair all M-series MacBook Pro keyboards including the 14" and 16" models with M1, M2, M3, and M4 chips. These use the MagicKeyboard scissor-switch mechanism and carry a warranty when replaced. Contact us for a model-specific quote.',
  },
  {
    question: 'Can individual keys be replaced on a modern MacBook?',
    answer:
      'On MacBook models where the keyboard is mechanically separate from the top case, primarily older Intel Macs, individual keycaps can sometimes be replaced. On most modern MacBooks (2016 onward) the keyboard is bonded directly to the top case and cannot be partially replaced. We will always advise the most cost-effective approach for your specific model.',
  },
];

/* ─────────────────────────────────────────────────────────────
   SCHEMA
───────────────────────────────────────────────────────────── */
const serviceSchema = buildServiceSchema({
  name: 'MacBook Keyboard Repair Johannesburg',
  description:
    'MacBook keyboard repair in Johannesburg. Butterfly keyboard replacement, scissor keyboard replacement, stuck keys, broken keycaps, liquid damage. All MacBook Air and Pro models.',
});

const aggregateRatingSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'MacBook Keyboard Repair Johannesburg',
  description:
    'MacBook keyboard repair service in Johannesburg covering all MacBook Air and Pro models.',
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

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'MacBook Repair', item: 'https://zasupport.com/macbook-repair' },
    { '@type': 'ListItem', position: 3, name: 'Keyboard Repair', item: 'https://zasupport.com/macbook-repair/keyboard' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

const breadcrumbItems = [
  { label: 'MacBook Repair', href: '/macbook-repair' },
  { label: 'Keyboard', href: '/macbook-repair/keyboard' },
];

/* ─────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────── */
export default function MacBookKeyboardPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={aggregateRatingSchema} />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="hero-gradient grid-overlay pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} />
          <div className="mt-8 max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[rgba(15,234,122,0.1)] border border-[rgba(15,234,122,0.25)] text-[#0FEA7A] text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <CheckCircle className="w-4 h-4" /> Same-Day Available · Warranty (scissor) · Hyde Park JHB
            </div>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              MacBook Keyboard Repair<br />
              <span className="text-[#0FEA7A]">Johannesburg</span>

            </h1>
            <p className="text-xl text-[#7A9E98] mb-8 max-w-2xl">
              MacBook butterfly keyboard repair Johannesburg, scissor keyboard replacement, stuck keys, broken keycaps, liquid spill recovery. All MacBook Air and Pro models. Assessment: R899 ex VAT. Assessment: R899 ex VAT.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/27790539964?text=Hi%20ZA%20Support%2C%20I%20need%20MacBook%20keyboard%20repair"
                className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all text-lg"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp Us
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> {CONTACT.phone}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-[rgba(255,255,255,0.12)] text-[#E8F4F1] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(255,255,255,0.05)] transition-all"
              >
                Get a Quote <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────── */}
      <section className="bg-[rgba(15,234,122,0.06)] border-y border-[rgba(15,234,122,0.15)] py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { stat: '2,500+', label: 'Keyboards Repaired' },
              { stat: 'Same-Day', label: 'Available (most models)' },
              { stat: '12-Month', label: 'Warranty (scissor)' },
              { stat: 'No Fix', label: 'No Fee' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center">
                <span
                  className="text-2xl font-extrabold text-[#0FEA7A]"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  {item.stat}
                </span>
                <span className="text-[#7A9E98] text-sm mt-1">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AGGREGATE RATING ─────────────────────────────────── */}
      <section className="bg-[#0A1A18] py-10 border-b border-[rgba(255,255,255,0.05)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-6 h-6 fill-[#0FEA7A] text-[#0FEA7A]" />
                ))}
              </div>
              <div>
                <span
                  className="text-3xl font-extrabold text-[#E8F4F1]"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  4.9
                </span>
                <span className="text-[#7A9E98] ml-2 text-sm">/ 5 from 120 verified repairs</span>
              </div>
            </div>
            <p className="text-[#7A9E98] text-sm text-center sm:text-right max-w-xs">
              MacBook keyboard repair, Sandton, Rosebank, Fourways, Bryanston, Hyde Park
            </p>
          </div>
        </div>
      </section>

      {/* ── PRICING TABLE ────────────────────────────────────── */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              MacBook Keyboard Repair <span className="text-[#0FEA7A]">Models</span>
            </h2>
            <p className="text-[#7A9E98] max-w-xl mx-auto">
              Assessment: R899 ex VAT before any work begins. Written fixed quote, no hidden costs.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden">
              <div className="grid grid-cols-12 px-6 py-3 bg-[rgba(15,234,122,0.07)] border-b border-[rgba(255,255,255,0.08)]">
                <span className="col-span-8 text-[#7A9E98] text-xs font-semibold uppercase tracking-wider">Service</span>
                <span className="col-span-4 text-[#7A9E98] text-xs font-semibold uppercase tracking-wider text-right">Warranty</span>
              </div>
              {pricingRows.map((row, i) => (
                <div
                  key={row.model}
                  className={`grid grid-cols-12 px-6 py-4 items-center ${
                    i < pricingRows.length - 1 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''
                  } hover:bg-[rgba(15,234,122,0.03)] transition-colors`}
                >
                  <div className="col-span-8">
                    <span className="text-[#E8F4F1] text-sm font-medium">{row.model}</span>
                    {row.note && (
                      <span className="block text-[#7A9E98] text-xs mt-0.5">{row.note}</span>
                    )}
                  </div>
                  <div className="col-span-4 text-right">
                    {row.noWarranty ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-orange-400 bg-orange-400/10 border border-orange-400/20 px-2 py-1 rounded-full">
                        <XCircle className="w-3 h-3" /> No 3-month warranty
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#0FEA7A] bg-[rgba(15,234,122,0.1)] border border-[rgba(15,234,122,0.2)] px-2 py-1 rounded-full">
                        <CheckCircle className="w-3 h-3" /> {row.warranty}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[#7A9E98] text-xs mt-4 text-center">
              Prices include parts and labour. Butterfly keyboard replacements carry no warranty due to Apple&apos;s known design flaw, see explainer below.
            </p>
          </div>
        </div>
      </section>

      {/* ── BUTTERFLY WARNING BANNER ─────────────────────────── */}
      <section className="bg-[#111C1A] py-8 border-y border-orange-400/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 bg-orange-400/5 border border-orange-400/20 rounded-2xl p-6">
            <AlertTriangle className="w-6 h-6 text-orange-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-orange-400 font-bold text-base mb-2">
                Butterfly Keyboard (2016–2019), No Warranty Policy
              </h3>
              <p className="text-[#7A9E98] text-sm leading-relaxed mb-3">
                ZA Support does not offer a warranty on like-for-like butterfly keyboard replacements because the design itself is the cause of failure. Replacing one butterfly keyboard with another butterfly keyboard will very likely produce the same fault. We are transparent about this before you decide to proceed.
              </p>
              <p className="text-[#7A9E98] text-sm leading-relaxed">
                <span className="text-[#E8F4F1] font-semibold">Our recommendation:</span> Ask about the scissor-switch keyboard adapter, a replacement top case using the more reliable Magic Keyboard mechanism. Available for select models. Carries a 3-month warranty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── BUTTERFLY EXPLAINER ──────────────────────────────── */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              The Butterfly Keyboard <span className="text-[#0FEA7A]">Story</span>
            </h2>
            <p className="text-[#7A9E98] max-w-2xl mx-auto">
              Why Apple&apos;s 2016–2019 MacBook keyboards fail, what Apple did about it, and what your options are today.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-[rgba(15,234,122,0.2)]" />
            <div className="space-y-8">
              {butterflyTimeline.map((item) => (
                <div key={item.year} className="relative pl-12">
                  <div className="absolute left-0 top-0 w-8 h-8 bg-[rgba(15,234,122,0.1)] border border-[rgba(15,234,122,0.3)] rounded-full flex items-center justify-center">
                    <span className="text-[#0FEA7A] text-xs font-bold">{item.year.slice(2)}</span>
                  </div>
                  <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)] rounded-xl p-4">
                    <span className="text-[#0FEA7A] font-bold text-sm">{item.year}</span>
                    <p className="text-[#7A9E98] text-sm mt-1 leading-relaxed">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key facts */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                icon: <Info className="w-5 h-5" />,
                title: 'Why It Fails',
                body: 'The butterfly mechanism is only 0.55mm thin, so thin that a single crumb or dust particle prevents the key from travelling. Apple\'s silicone membrane fix (2018) reduced failures but did not solve them.',
              },
              {
                icon: <Shield className="w-5 h-5" />,
                title: 'Apple\'s Service Programme',
                body: 'Apple ran a silent Keyboard Service Programme covering most 2015–2019 MacBook models. The programme has ended, but ZA Support can still replace your keyboard, we just cannot warrant the result.',
              },
              {
                icon: <CheckCircle className="w-5 h-5" />,
                title: 'The Right Fix',
                body: 'Where a scissor-switch adapter is available for your model, that is the repair we recommend. It uses the updated Magic Keyboard mechanism and carries a warranty from ZA Support.',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)] rounded-xl p-5"
              >
                <div className="text-[#0FEA7A] mb-3">{card.icon}</div>
                <h3 className="text-[#E8F4F1] font-bold text-sm mb-2">{card.title}</h3>
                <p className="text-[#7A9E98] text-xs leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SYMPTOMS GRID ────────────────────────────────────── */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Signs You Need <span className="text-[#0FEA7A]">Keyboard Repair</span>
            </h2>
            <p className="text-[#7A9E98] max-w-xl mx-auto">
              Any of these symptoms warrants a assessment fee (R899 ex VAT). We diagnose before we quote, no obligation.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {symptoms.map((s) => (
              <div
                key={s.title}
                className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 hover:border-[rgba(15,234,122,0.2)] transition-colors"
              >
                <div className="text-[#0FEA7A] mb-3">{s.icon}</div>
                <h3 className="text-[#E8F4F1] font-bold text-sm mb-2">{s.title}</h3>
                <p className="text-[#7A9E98] text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────── */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Our Repair <span className="text-[#0FEA7A]">Process</span>
            </h2>
            <p className="text-[#7A9E98]">Simple, transparent, no surprises.</p>
          </div>
          <div className="space-y-5">
            {[
              {
                step: '01',
                icon: <Wrench className="w-5 h-5" />,
                title: 'Assessment: R899 ex VAT',
                desc: 'We test every key, check for liquid ingress, and inspect the top case. For butterfly keyboard models we advise you on whether the scissor-switch upgrade is available for your specific machine before quoting.',
              },
              {
                step: '02',
                icon: <Shield className="w-5 h-5" />,
                title: 'Fixed Written Quote',
                desc: 'We give you a written price before touching anything. Butterfly keyboard jobs include a clear note that the repair carries no warranty and why. No surprises at collection.',
              },
              {
                step: '03',
                icon: <Wrench className="w-5 h-5" />,
                title: 'Keyboard Replacement or Cleaning',
                desc: 'Full keyboard replacements involve removing the top case and installing the new assembly. Cleaning jobs involve disassembling the affected area, cleaning under the keys, and testing each key individually.',
              },
              {
                step: '04',
                icon: <CheckCircle className="w-5 h-5" />,
                title: 'Full Keyboard Test',
                desc: 'Before handback we run a complete keyboard test, every key, every modifier, every function key. Touch ID, Touch Bar (where fitted), and backlighting are all verified before the machine leaves us.',
              },
              {
                step: '05',
                icon: <Clock className="w-5 h-5" />,
                title: 'Same-Day Where Possible',
                desc: 'Most keyboard repairs are completed the same day. If we need to source a specific top case assembly we will confirm the timeline and keep you updated.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex items-start gap-5 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.07)] rounded-2xl p-5"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-[rgba(15,234,122,0.1)] border border-[rgba(15,234,122,0.25)] rounded-xl flex items-center justify-center text-[#0FEA7A]">
                  {item.icon}
                </div>
                <div>
                  <span className="text-[#7A9E98] text-xs font-semibold">{item.step}</span>
                  <h3 className="text-[#E8F4F1] font-bold text-sm mt-0.5 mb-1">{item.title}</h3>
                  <p className="text-[#7A9E98] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ──────────────────────────────────────────── */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              What Our Clients <span className="text-[#0FEA7A]">Say</span>
            </h2>
            <p className="text-[#7A9E98]">
              MacBook keyboard repairs across Sandton, Fourways, Rosebank and surrounding suburbs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div
                key={r.name}
                className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6"
              >
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-[#0FEA7A] text-[#0FEA7A]" />
                  ))}
                </div>
                <p className="text-[#7A9E98] text-sm leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#E8F4F1] font-semibold text-sm">{r.name}</p>
                    <p className="text-[#7A9E98] text-xs">{r.suburb}</p>
                  </div>
                  <span className="text-[#7A9E98] text-xs">{r.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="MacBook Keyboard Repair, FAQs" />
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2
              className="text-3xl font-extrabold text-[#E8F4F1] mb-3"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              MacBook Keyboard Not Working?
            </h2>
            <p className="text-[#7A9E98] mb-6 max-w-xl mx-auto">
              Assessment: R899 ex VAT. Assessment: R899 ex VAT. Hyde Park, Johannesburg. WhatsApp for fastest response.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/27790539964?text=Hi%20ZA%20Support%2C%20I%20need%20MacBook%20keyboard%20repair"
                className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp Us
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
