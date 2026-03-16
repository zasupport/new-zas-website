import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Shield, Clock, CheckCircle, Star } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Mac Mini Logic Board Repair Johannesburg | ZA Support',
  description:
    'Mac mini logic board repair Johannesburg. M1, M2, M2 Pro, M4, and Intel models. We fix the chip, not the board. Assessment: from R599 ex VAT, up-to-3 year warranty. Hyde Park. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/logic-board-repair/mac-mini' },
};

const faqs = [
  {
    question: 'Which Mac mini models do you repair?',
    answer:
      'Mac mini 2014 (Intel Core i5/i7), Mac mini 2018 (Intel Core i3/i5/i7), Mac mini M1 (A2348, 2020), Mac mini M2 (A2686, 2023), Mac mini M2 Pro (A2686, 2023), and Mac mini M4 / M4 Pro (A3617, 2024). All models from 2014 onwards are serviceable at component level.',
  },
  {
    question: 'My Mac mini M1 has no power. Is this repairable?',
    answer:
      'Yes. A dead Mac mini M1 is almost always caused by a failed power supply component or a power rail fault on the logic board, not the M1 chip itself. Both are repairable through component-level repair. We see this fault regularly, and our success rate for no-power Mac mini repairs is over 85%.',
  },
  {
    question: 'Mac mini is running very hot and throttling. Is this a logic board fault?',
    answer:
      'Not necessarily. Thermal throttling in a Mac mini is most commonly caused by dust accumulation in the fan and heatsink. Failed thermal paste is the next most common cause. A faulty fan motor or a power rail fault causing incorrect voltage can also cause throttling. We diagnose the exact cause before recommending any repair.',
  },
  {
    question: 'Can the Mac mini M2 Pro logic board be repaired?',
    answer:
      'Yes, for surrounding component faults. The M2 Pro chip integrates CPU, GPU, RAM, and Neural Engine, these are on a single die and cannot be replaced at component level. However, USB-C controllers, PCIe/NVMe storage circuits, HDMI 2.1 controller, power management ICs, Thunderbolt 4 controllers, and board traces are all repairable through component-level repair.',
  },
  {
    question: 'Is Mac mini logic board repair worth it vs buying a new machine?',
    answer:
      'Generally yes. Mac mini is the most cost-effective Mac to own and repair. A new Mac mini costs significantly more than a component-level repair. We give you an honest written comparison at the assessment stage, we will tell you clearly if replacement makes more financial sense.',
  },
  {
    question: 'My Mac mini has no HDMI output. Is this repairable?',
    answer:
      'Yes. No-display output on Mac mini is almost always caused by a failed HDMI controller IC, a failed Thunderbolt controller, or occasionally a bent HDMI port. All are repairable at component level. Before bringing it in, test with a different cable and different display, if the fault persists across both, it is hardware.',
  },
  {
    question: 'Mac mini shows no Thunderbolt or USB-C devices. What is the cause?',
    answer:
      'USB-C and Thunderbolt 4 on Mac mini are controlled by Thunderbolt controller ICs (typically Intel JHL8540 on Intel models, Apple-proprietary on M-series). Failure of this IC causes complete loss of USB-C, Thunderbolt, and DisplayPort output simultaneously. This is repairable through IC replacement at our Hyde Park workshop.',
  },
  {
    question: 'How long does Mac mini logic board repair take?',
    answer:
      'Diagnostic is same-day. Simple repairs (HDMI controller, USB-C IC, power rail) are typically 1–3 business days. Complex repairs (trace reconstruction, liquid damage, multi-IC failure) are 3–7 business days. We give you a written turnaround estimate before work begins.',
  },
  {
    question: 'Do you offer Mac mini collection and delivery in Johannesburg?',
    answer:
      'Yes. Mac mini is compact and easy to courier. We collect from Hyde Park, Sandton, Rosebank, Randburg, Fourways, Midrand, and Bryanston. Call 064 529 5863 or WhatsApp to arrange.',
  },
  {
    question: 'What warranty do you provide on Mac mini logic board repair?',
    answer:
      'All Mac mini logic board repairs carry a warranty on the specific component repaired. This is a up-to-3 year warranty with no fine print. If the repaired component fails within the warranty period, we fix it at no charge. We stand behind our work.',
  },
];

const icFaults = [
  {
    ic: 'CD3217 / Thunderbolt Controller',
    fault: 'Controller IC failure',
    symptom: 'No USB-C, no Thunderbolt, no display output',
    repair: 'IC replacement',
  },
  {
    ic: 'HDMI Controller IC',
    fault: 'HDMI output failure',
    symptom: 'No display signal via HDMI',
    repair: 'IC replacement',
  },
  {
    ic: 'TPS51980 (PWM Controller)',
    fault: 'Power rail dropout',
    symptom: 'No power, dead on arrival',
    repair: 'IC + trace repair',
  },
  {
    ic: 'Power Supply Module',
    fault: 'PSU capacitor / FET failure',
    symptom: 'No power or intermittent shutdown',
    repair: 'Component replacement',
  },
  {
    ic: 'NVMe / PCIe Storage Controller',
    fault: 'Storage path failure',
    symptom: 'Not booting, no disk in Recovery',
    repair: 'Controller replacement',
  },
  {
    ic: 'Fan Controller / Temp Sensor',
    fault: 'Thermal management failure',
    symptom: 'Fan at max speed, extreme throttling',
    repair: 'Sensor replacement',
  },
];

const models = [
  { model: 'Mac mini 2014 (Intel)', chip: 'Intel Core i5/i7', notes: 'HDMI, Thunderbolt 2, power supply' },
  { model: 'Mac mini 2018 (Intel)', chip: 'Intel Core i3/i5/i7', notes: 'USB-C/Thunderbolt 3, HDMI 2.0' },
  { model: 'Mac mini M1 (2020)', chip: 'Apple M1', notes: 'Power management, Thunderbolt 4' },
  { model: 'Mac mini M2 (2023)', chip: 'Apple M2', notes: 'HDMI 2.1, USB-C, power circuits' },
  { model: 'Mac mini M2 Pro (2023)', chip: 'Apple M2 Pro', notes: 'Thunderbolt 4 × 3, PCIe storage' },
  { model: 'Mac mini M4 / M4 Pro (2024)', chip: 'Apple M4 / M4 Pro', notes: 'Diagnostic assessment required' },
];

const reviews = [
  {
    name: 'Mark T.',
    suburb: 'Sandton',
    text: 'Mac mini M1 completely dead after a power surge. ZA Support diagnosed a blown power IC the same day and fixed it in two days. Saved me a significant amount on a new machine. up-to-3 year warranty in writing, that is what sealed it for me.',
    rating: 5,
  },
  {
    name: 'Lisa R.',
    suburb: 'Fourways',
    text: 'No HDMI output on my Mac mini M2, nothing on any display or cable. ZA Support identified the HDMI controller IC and replaced it. Back working within 48 hours. Very professional, no upselling.',
    rating: 5,
  },
  {
    name: 'James K.',
    suburb: 'Midrand',
    text: 'Mac mini 2018 Intel with all USB-C ports dead. I was quoted a full board replacement elsewhere. ZA Support fixed the Thunderbolt controller for a fraction of that price. These are the real Apple specialists in Joburg.',
    rating: 5,
  },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Logic Board Repair', item: 'https://zasupport.com/logic-board-repair' },
    { '@type': 'ListItem', position: 3, name: 'Mac mini', item: 'https://zasupport.com/logic-board-repair/mac-mini' },
  ],
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Mac mini Logic Board Repair Johannesburg',
  provider: {
    '@type': 'LocalBusiness',
    name: 'ZA Support',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1 Hyde Park Lane',
      addressLocality: 'Hyde Park',
      addressRegion: 'Gauteng',
      postalCode: '2196',
      addressCountry: 'ZA',
    },
    telephone: '+27645295863',
  },
  areaServed: { '@type': 'City', name: 'Johannesburg' },
  description: 'Mac mini logic board repair. Assessment: from R599 ex VAT. up-to-3 year warranty.',
  offers: {
    '@type': 'Offer',
    description: 'Mac mini logic board repair. Assessment: from R599 ex VAT.',
  },
};

const faqSchema = buildFaqSchema(faqs);

export default function MacMiniLogicBoardPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />
      <SchemaOrg schema={serviceSchema} />

      {/* Hero */}
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Logic Board Repair', href: '/logic-board-repair' }, { label: 'Mac mini' }]} />
          <div className="mt-8 max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.2)] rounded-full px-4 py-2 mb-6">
              <span className="text-[#0FEA7A] text-sm font-semibold">Assessment: from R599 ex VAT · Up-to-3 Year Warranty · Hyde Park</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] leading-tight mb-4">
              Mac mini Logic Board<br /><span className="text-[#0FEA7A]">Repair Johannesburg 2026</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-6 max-w-3xl leading-relaxed">
              Mac mini logic board repair. M1, M2, M2 Pro, M4, and Intel models.
              We replace the failed component. Apple replaces the board. Assessment: from R599 ex VAT.
            </p>

            {/* Stats bar */}
            <div className="flex flex-wrap gap-6 mb-8">
              {[
                { value: '3,000+', label: 'Repairs Done' },
                { value: '4.9★', label: '120+ Reviews' },
                { value: '16 Years', label: 'Apple Experience' },
                { value: 'Covered', label: 'Warranty' },
              ].map((s) => (
                <div key={s.label}>
                  <span className="block text-2xl font-extrabold text-[#0FEA7A]">{s.value}</span>
                  <span className="text-xs text-[#7A9E98]">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={CONTACT.whatsappLogicBoard}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                💬 WhatsApp for Quote
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all"
              >
                Free Diagnostic <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison callout */}
      <section className="py-10 bg-[rgba(39,80,77,0.2)] border-y border-[rgba(15,234,122,0.1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-[#7A9E98] text-sm mb-1">Authorised service</p>
              <p className="text-2xl font-extrabold text-red-400">Full board replacement</p>
              <p className="text-[#7A9E98] text-xs mt-1">Entire board swapped, expensive and unnecessary</p>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-[#0FEA7A] text-4xl font-black">vs</div>
            </div>
            <div>
              <p className="text-[#7A9E98] text-sm mb-1">ZA Support, Mac mini Logic Board Repair</p>
              <p className="text-2xl font-extrabold text-[#0FEA7A]">Component-level repair</p>
              <p className="text-[#7A9E98] text-xs mt-1">We repair only the failed component. up-to-3 year warranty.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Faults + Pricing */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">Mac mini Faults We Repair</h2>
              {[
                { fault: 'No Power, Dead Mac mini', desc: 'Power supply failure or power rail fault on logic board. Very common after load-shedding spikes. Over 85% success rate on no-power repairs.' },
                { fault: 'No HDMI Output', desc: 'Failed HDMI controller IC. Mac mini boots and operates normally but no display signal on any HDMI display or cable.' },
                { fault: 'No USB-C / Thunderbolt', desc: 'All USB-C ports dead simultaneously. Thunderbolt controller IC fault, all ports share one controller, so IC failure kills all ports at once.' },
                { fault: 'Not Booting, Stuck on Apple Logo', desc: 'Boot-loop or failure to reach login. Can indicate NVMe storage controller fault, corrupted SMC, or power delivery issue.' },
                { fault: 'Extreme Thermal Throttling', desc: 'CPU performance drops to minimum under any load. Usually thermal paste, fan, or temperature sensor. Occasionally a power rail voltage fault.' },
                { fault: 'Fan Running at Max Speed', desc: 'Constant loud fan despite cool temperatures. Temperature sensor failure, disconnected sensor cable, or SMC fault.' },
                { fault: 'Kernel Panic Loops', desc: 'Repeated unexpected restarts with kernel panic reports. Multiple causes, we read the panic log to identify hardware vs software origin.' },
                { fault: 'Liquid Damage', desc: 'Water or cleaning fluid, typically enters through the vents on the bottom of the Mac mini. Board-level clean and component replacement.' },
              ].map((item) => (
                <div key={item.fault} className="flex gap-4 p-4 bg-[rgba(22,34,32,0.5)] rounded-xl border border-[rgba(15,234,122,0.08)] mb-3">
                  <div>
                    <p className="text-[#E8F4F1] font-semibold text-sm">{item.fault}</p>
                    <p className="text-[#7A9E98] text-xs mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">Repair Services</h2>
              <div className="glass-card p-6 mb-6">
                {[
                  'Diagnostic Assessment',
                  'Power Supply Repair',
                  'Logic Board Component-level repair',
                  'HDMI Controller Repair',
                  'USB-C / Thunderbolt Repair',
                  'Thermal Repaste',
                  'Liquid Damage Restoration',
                  'Board Replacement',
                ].map((item, i, arr) => (
                  <div key={item} className={`py-3 ${i < arr.length - 1 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}>
                    <span className="text-[#7A9E98] text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 p-3 bg-[rgba(15,234,122,0.05)] rounded-lg border border-[rgba(15,234,122,0.1)]">
                  <Shield className="w-5 h-5 text-[#0FEA7A] flex-shrink-0" />
                  <p className="text-[#7A9E98] text-sm"><span className="text-[#E8F4F1] font-semibold">Warranty</span>, Written. No 90-day fine print. No exceptions.</p>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[rgba(15,234,122,0.05)] rounded-lg border border-[rgba(15,234,122,0.1)]">
                  <CheckCircle className="w-5 h-5 text-[#0FEA7A] flex-shrink-0" />
                  <p className="text-[#7A9E98] text-sm"><span className="text-[#E8F4F1] font-semibold">Assessment: from R599 ex VAT</span>, If we cannot repair it, assessment fee of from R599 ex VAT applies.</p>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[rgba(15,234,122,0.05)] rounded-lg border border-[rgba(15,234,122,0.1)]">
                  <Clock className="w-5 h-5 text-[#0FEA7A] flex-shrink-0" />
                  <p className="text-[#7A9E98] text-sm"><span className="text-[#E8F4F1] font-semibold">Turnaround</span>, Same-day diagnostic. Repairs 1–5 business days.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IC-level fault table */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
            Component-Level Repair, Mac mini Logic Board ICs
          </h2>
          <p className="text-[#7A9E98] mb-8 max-w-3xl">
            We identify and replace the specific failed IC under microscope. Apple replaces the entire board. Component-level repair is a fraction of the cost.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[rgba(15,234,122,0.15)]">
                  <th className="text-left text-[#0FEA7A] py-3 pr-6">Component</th>
                  <th className="text-left text-[#0FEA7A] py-3 pr-6">Failure Mode</th>
                  <th className="text-left text-[#0FEA7A] py-3 pr-6">Symptom</th>
                  <th className="text-left text-[#0FEA7A] py-3">Repair</th>
                </tr>
              </thead>
              <tbody>
                {icFaults.map((row, i) => (
                  <tr key={row.ic} className={`${i < icFaults.length - 1 ? 'border-b border-[rgba(255,255,255,0.04)]' : ''}`}>
                    <td className="text-[#E8F4F1] py-3 pr-6 font-medium">{row.ic}</td>
                    <td className="text-[#7A9E98] py-3 pr-6">{row.fault}</td>
                    <td className="text-[#7A9E98] py-3 pr-6">{row.symptom}</td>
                    <td className="text-[#7A9E98] py-3">{row.repair}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Model compatibility */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
            Mac mini Models We Repair
          </h2>
          <p className="text-[#7A9E98] mb-8">All Mac mini generations from 2014 through M4 Pro (2024).</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[rgba(15,234,122,0.15)]">
                  <th className="text-left text-[#0FEA7A] py-3 pr-6">Model</th>
                  <th className="text-left text-[#0FEA7A] py-3 pr-6">Chip</th>
                  <th className="text-left text-[#0FEA7A] py-3">Common Repairs</th>
                </tr>
              </thead>
              <tbody>
                {models.map((row, i) => (
                  <tr key={row.model} className={`${i < models.length - 1 ? 'border-b border-[rgba(255,255,255,0.04)]' : ''}`}>
                    <td className="text-[#E8F4F1] py-3 pr-6 font-medium">{row.model}</td>
                    <td className="text-[#7A9E98] py-3 pr-6">{row.chip}</td>
                    <td className="text-[#7A9E98] py-3">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Repair process */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
            Our Mac mini Repair Process
          </h2>
          <p className="text-[#7A9E98] mb-10 max-w-2xl">
            Clear process. No surprises. Written quote before any work begins.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Drop-Off or Collection', desc: 'Bring your Mac mini to Hyde Park or arrange same-day collection from Sandton, Rosebank, Randburg, Fourways, Midrand, or Bryanston.' },
              { step: '02', title: 'Free Same-Day Diagnostic', desc: 'Board-level diagnostic using DC power supply analysis, scope probing, and thermal imaging. We identify the exact component at fault.' },
              { step: '03', title: 'Component-Level Repair', desc: 'Under microscope, we replace only the failed IC or component, not the whole board. Temperature-controlled soldering, correct equipment.' },
              { step: '04', title: 'Full Test + Up-to-3 Year Warranty', desc: 'Post-repair stress test: all ports, display outputs, boot stability, thermal performance. Up-to-3 year warranty issued on collection.' },
            ].map((s) => (
              <div key={s.step} className="glass-card p-6">
                <span className="text-4xl font-black text-[rgba(15,234,122,0.2)]">{s.step}</span>
                <h3 className="text-[#E8F4F1] font-bold mt-3 mb-2">{s.title}</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why ZA Support */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-10">
            Why Johannesburg Chooses ZA Support for Mac mini Repair
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Component Repair, Not Board Swap',
                desc: 'Apple replaces the entire Mac mini board. We replace the specific failed IC. You keep your data and save thousands.',
              },
              {
                title: 'Up-to-3 Year Warranty',
                desc: 'We issue a up-to-3 year warranty on every repair. No 90-day hidden cap. No fine print. If the repaired component fails within the warranty period, we fix it at zero cost.',
              },
              {
                title: 'Assessment: from R599 ex VAT',
                desc: 'If we cannot repair your Mac mini, assessment fee of from R599 ex VAT applies, including the diagnostic. We back our diagnosis with our own fee. That is how confident we are.',
              },
              {
                title: 'Apple Silicon M-Series Expertise',
                desc: 'Mac mini M1, M2, M2 Pro, and M4 repairs require understanding of Unified Memory Architecture and Apple Silicon power delivery. We have that knowledge.',
              },
              {
                title: '4.9★ on Google, 120+ Reviews',
                desc: 'The strongest review profile for Apple repair in Johannesburg. Every review is real, every client is local. Check our Google Maps listing.',
              },
              {
                title: 'Hyde Park + Collection Across JHB',
                desc: '1 Hyde Park Lane. We cover Sandton, Rosebank, Randburg, Fourways, Midrand, and Bryanston.',
              },
            ].map((item) => (
              <div key={item.title} className="glass-card p-6">
                <h3 className="text-[#E8F4F1] font-bold mb-2">{item.title}</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer reviews */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8">
            Mac mini Repair Reviews, Johannesburg
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.name} className="glass-card p-6">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#0FEA7A] text-[#0FEA7A]" />
                  ))}
                </div>
                <p className="text-[#7A9E98] text-sm leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
                <p className="text-[#E8F4F1] font-semibold text-sm">{r.name}</p>
                <p className="text-[#7A9E98] text-xs">{r.suburb}, Johannesburg</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Mac mini Logic Board Repair, Frequently Asked Questions" />
        </div>
      </section>

      {/* Related pages */}
      <section className="py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-[#E8F4F1] mb-6">Related Repairs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {[
              { title: 'MacBook Pro Logic Board', href: '/logic-board-repair/macbook-pro', label: 'Assessment: from R599 ex VAT' },
              { title: 'MacBook Air Logic Board', href: '/logic-board-repair/macbook-air', label: 'Assessment: from R599 ex VAT' },
              { title: 'iMac Logic Board', href: '/logic-board-repair/imac', label: 'Assessment: from R599 ex VAT' },
              { title: 'Logic Board Repair Hub', href: '/logic-board-repair', label: 'All Devices' },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="glass-card p-4 flex items-center justify-between group">
                <div>
                  <p className="text-[#E8F4F1] font-semibold text-sm">{item.title}</p>
                  <p className="text-[#0FEA7A] text-xs mt-0.5">{item.label}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#7A9E98] group-hover:text-[#0FEA7A] transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
              Mac mini Not Working?
            </h2>
            <p className="text-[#7A9E98] mb-2">Assessment: from R599 ex VAT. up-to-3 year warranty. Hyde Park, Johannesburg.</p>
            <p className="text-[#7A9E98] text-sm mb-8">A second opinion costs you nothing, bring it in before committing to a board replacement.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={CONTACT.whatsappLogicBoard}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                💬 WhatsApp for Quote
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
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
