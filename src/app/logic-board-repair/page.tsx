import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import {
  Phone, ArrowRight, Cpu, Zap, AlertTriangle, CheckCircle, Star, Shield, Clock,
  Microscope, MapPin,
} from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildBreadcrumbSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import { GoogleReviews } from '@/components/GoogleReviews';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, SITE, buildWhatsAppUrl } from '@/lib/constants';
import PricingNote from '@/components/PricingNote';
import PricingRange from '@/components/PricingRange';
import OrphanLinks from '@/components/ui/OrphanLinks';

const orphanLbrModelLinks = [
  { title: 'MacBook Air M1', href: '/logic-board-repair/macbook-air-m1', description: 'Logic board repair for MacBook Air M1' },
  { title: 'MacBook Air M2', href: '/logic-board-repair/macbook-air-m2', description: 'Logic board repair for MacBook Air M2' },
  { title: 'MacBook Air M3', href: '/logic-board-repair/macbook-air-m3', description: 'Logic board repair for MacBook Air M3' },
  { title: 'MacBook Air M4', href: '/logic-board-repair/macbook-air-m4', description: 'Logic board repair for MacBook Air M4' },
  { title: 'MacBook Air M5', href: '/logic-board-repair/macbook-air-m5', description: 'Logic board repair for MacBook Air M5' },
  { title: 'MacBook Pro 13-inch', href: '/logic-board-repair/macbook-pro-13-inch', description: 'Logic board repair for MacBook Pro 13-inch' },
  { title: 'MacBook Pro 14-inch', href: '/logic-board-repair/macbook-pro-14-inch', description: 'Logic board repair for MacBook Pro 14-inch' },
  { title: 'MacBook Pro 16-inch', href: '/logic-board-repair/macbook-pro-16-inch', description: 'Logic board repair for MacBook Pro 16-inch' },
  { title: 'MacBook Pro M1', href: '/logic-board-repair/macbook-pro-m1', description: 'Logic board repair for MacBook Pro M1' },
  { title: 'MacBook Pro M2', href: '/logic-board-repair/macbook-pro-m2', description: 'Logic board repair for MacBook Pro M2' },
  { title: 'MacBook Pro M3', href: '/logic-board-repair/macbook-pro-m3', description: 'Logic board repair for MacBook Pro M3' },
  { title: 'MacBook Pro M4', href: '/logic-board-repair/macbook-pro-m4', description: 'Logic board repair for MacBook Pro M4, M4 Pro, M4 Max' },
  { title: 'MacBook Pro M5', href: '/logic-board-repair/macbook-pro-m5', description: 'Logic board repair for MacBook Pro M5, M5 Pro, M5 Max' },
];

const orphanLbrSuburbLinks = [
  { title: 'Alberton', href: '/logic-board-repair/alberton', description: 'Logic board repair in Alberton' },
  { title: 'Bedfordview', href: '/logic-board-repair/bedfordview', description: 'Logic board repair in Bedfordview' },
  { title: 'Benoni', href: '/logic-board-repair/benoni', description: 'Logic board repair in Benoni' },
  { title: 'Boksburg', href: '/logic-board-repair/boksburg', description: 'Logic board repair in Boksburg' },
  { title: 'Centurion', href: '/logic-board-repair/centurion', description: 'Logic board repair in Centurion' },
  { title: 'Craighall', href: '/logic-board-repair/craighall', description: 'Logic board repair in Craighall' },
  { title: 'Edenvale', href: '/logic-board-repair/edenvale', description: 'Logic board repair in Edenvale' },
  { title: 'Emmarentia', href: '/logic-board-repair/emmarentia', description: 'Logic board repair in Emmarentia' },
  { title: 'Germiston', href: '/logic-board-repair/germiston', description: 'Logic board repair in Germiston' },
  { title: 'Greenside', href: '/logic-board-repair/greenside', description: 'Logic board repair in Greenside' },
  { title: 'Houghton', href: '/logic-board-repair/houghton', description: 'Logic board repair in Houghton' },
  { title: 'Illovo', href: '/logic-board-repair/illovo', description: 'Logic board repair in Illovo' },
  { title: 'Kempton Park', href: '/logic-board-repair/kempton-park', description: 'Logic board repair in Kempton Park' },
  { title: 'Kyalami', href: '/logic-board-repair/kyalami', description: 'Logic board repair in Kyalami' },
  { title: 'Linden', href: '/logic-board-repair/linden', description: 'Logic board repair in Linden' },
  { title: 'Melrose', href: '/logic-board-repair/melrose', description: 'Logic board repair in Melrose' },
  { title: 'Melville', href: '/logic-board-repair/melville', description: 'Logic board repair in Melville' },
  { title: 'Morningside', href: '/logic-board-repair/morningside', description: 'Logic board repair in Morningside' },
  { title: 'Northcliff', href: '/logic-board-repair/northcliff', description: 'Logic board repair in Northcliff' },
  { title: 'Parkhurst', href: '/logic-board-repair/parkhurst', description: 'Logic board repair in Parkhurst' },
  { title: 'Parktown North', href: '/logic-board-repair/parktown-north', description: 'Logic board repair in Parktown North' },
  { title: 'Paulshof', href: '/logic-board-repair/paulshof', description: 'Logic board repair in Paulshof' },
  { title: 'Pretoria', href: '/logic-board-repair/pretoria', description: 'Logic board repair in Pretoria' },
  { title: 'Randpark Ridge', href: '/logic-board-repair/randpark-ridge', description: 'Logic board repair in Randpark Ridge' },
  { title: 'Rivonia', href: '/logic-board-repair/rivonia', description: 'Logic board repair in Rivonia' },
  { title: 'Roodepoort', href: '/logic-board-repair/roodepoort', description: 'Logic board repair in Roodepoort' },
  { title: 'Sunninghill', href: '/logic-board-repair/sunninghill', description: 'Logic board repair in Sunninghill' },
  { title: 'Woodmead', href: '/logic-board-repair/woodmead', description: 'Logic board repair in Woodmead' },
];

export const metadata: Metadata = {
  title: 'MacBook Logic Board Repair Johannesburg [2026] | From R2,500 | ZA Support',
  description:
    'MacBook logic board repair in Johannesburg. Component-level repair for no-power, no-display, USB-C failure, GPU faults. From R2,500. R599 assessment. 12-month warranty. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/logic-board-repair' },
};

/* ── Common faults ──────────────────────────────────────────────────────── */
const faults = [
  { title: 'No Power', desc: 'MacBook shows no signs of life — no fans, no display, no LED. Typically a failed power-management IC, blown fuse, or damaged charging controller. Component-level diagnosis and repair.' },
  { title: 'No Display / Black Screen', desc: 'Mac boots (you hear fans / chime) but screen stays black. Backlight driver IC failure, LP8550 fault, or display flex cable damage. Often a sub-R3,000 component-level repair.' },
  { title: 'Liquid Damage Corrosion', desc: 'Spill, splash, or humidity exposure leaves conductive residue on traces. Professional ultrasonic cleaning followed by component-level chip replacement.' },
  { title: 'Overheating / Random Shutdown', desc: 'Thermal runaway, failing voltage regulator, or blocked power rail. We trace current draw on each rail at component level to identify the root cause.' },
  { title: 'USB-C / Thunderbolt Failure', desc: 'No charging, no external display, or no data on one or both USB-C ports. CD3217B12 controller failure is the most common cause on 2016–2020 MacBook Pro and MacBook Air.' },
  { title: 'Fan Error / Loud Fan', desc: 'SMC fault, fan controller IC failure, or failed thermal sensor causing fans to run at maximum speed continuously.' },
  { title: 'GPU Failure (Artifacts)', desc: 'Screen artifacts, garbled display, external display dead. Discrete GPU solder-joint failure on Intel MBP 2011–2013 — GPU reball / replacement.' },
  { title: 'Kernel Panic / Crash Loop', desc: 'Persistent kernel panics traced to failing RAM module, storage controller, or specific logic board component fault under load.' },
];

const repairTypes = [
  { item: 'Component-Level Diagnostic Assessment', note: 'Full board inspection under microscope (from R599)' },
  { item: 'USB-C / Thunderbolt Controller Repair', note: 'CD3217B12 / port board replacement' },
  { item: 'Power Circuit Repair', note: 'No-power diagnosis, PMIC / fuse replacement' },
  { item: 'Component-Level Chip Repair', note: 'Specific IC replacement under microscope' },
  { item: 'Discrete GPU Repair', note: 'Intel MBP 2011–2013 — reball or chip swap' },
  { item: 'Board Replacement', note: 'Last resort — when component repair is not viable' },
];

/* ── Extended FAQ set ───────────────────────────────────────────────────── */
const faqs = [
  {
    question: 'How much does MacBook logic board repair cost in Johannesburg?',
    answer:
      'Component-level logic board repair at ZA Support starts from R2,500 for most MacBook Air and MacBook Pro 13-inch faults, and from R3,500 for MacBook Pro 14-inch and 16-inch models. This is significantly cheaper than a full board replacement — the Apple Store typically quotes R15,000 to R30,000 for the equivalent fix. We provide a written fixed-price quote after the R599 assessment, before any work begins. Final price depends on which specific component has failed.',
  },
  {
    question: 'What is your assessment fee policy?',
    answer:
      'Our assessment fee is from R599. This covers a full board-level diagnostic under microscope and a written fixed-price quote. If you proceed with the repair, the R599 is included in the total repair cost. If you decide not to proceed, the R599 is payable for the diagnostic work completed. We never start a repair without your explicit written approval of the fixed-price quote.',
  },
  {
    question: 'How long does logic board repair take?',
    answer:
      'Most logic board repairs are completed within 24 to 72 hours at our Hyde Park workshop. Simple faults — USB-C controller replacement, blown fuses, single PMIC failure — are typically done in 24 hours. More complex component-level work — GPU reball, multi-component faults, post-liquid corrosion — takes 3 to 5 business days. We confirm the exact turnaround as part of the written quote after assessment.',
  },
  {
    question: 'What MacBook models do you repair?',
    answer:
      'We repair all MacBook Pro, MacBook Air, iMac, and Mac mini models from 2010 through the current M4 generation. This covers Intel-based models 2010–2020 (including the 2011–2013 discrete GPU faults) and Apple Silicon M1, M2, M3, and M4 models. For Intel boards we replace GPU chips, power management ICs, USB-C controllers, and memory. For Apple Silicon boards we service the surrounding components — power management, USB-C controllers, board traces, fuses — but the SoC itself (CPU+GPU+RAM integrated) is not chip-level replaceable on any Mac.',
  },
  {
    question: 'Can you recover data from a dead MacBook logic board?',
    answer:
      'Yes, in most cases. On Intel MacBooks the SSD is a separate module — we can read it on another machine even if your logic board is dead. On Apple Silicon Macs the SSD is soldered to the logic board, and data recovery depends on whether the storage chip itself survived the fault. If the storage chips are intact, we can often recover data even from a board we cannot fully repair. We discuss data recoverability as part of the initial assessment.',
  },
  {
    question: 'Do you provide a warranty on logic board repairs?',
    answer:
      'Yes. Every logic board repair carries a written 12-month warranty covering the specific component or fault we repaired, and our workmanship. If the same fault returns within 12 months, we repair it again at no labour cost. The warranty is provided in writing at collection. It covers parts and labour for the work we performed — it does not cover unrelated subsequent damage (e.g. a new liquid spill, or a drop).',
  },
  {
    question: 'Can you fix a water-damaged MacBook logic board?',
    answer:
      'Yes. Liquid damage is one of our highest-volume repair categories. The process is: full disassembly, ultrasonic cleaning of the bare board in 99.9% isopropyl alcohol to remove conductive residue, micro-inspection at 45× magnification to identify failed components, then targeted component replacement. The earlier the device comes in, the higher the success rate — corrosion is progressive. See our dedicated liquid damage page at zasupport.com/liquid-damage for the full repair process.',
  },
  {
    question: "What's the most common MacBook logic board fault you see?",
    answer:
      'Three faults dominate our workshop volume: (1) USB-C charging controller failure (CD3217B12) on MacBook Pro and MacBook Air 2016–2020 — the chip fails and stops charging on one or both sides. (2) Backlight driver IC (LP8550) failure on MacBook Pro 13" 2012–2017 — screen goes black but you can faintly see the desktop with a torch. (3) Power-management IC (TPS51980) failure on MacBook Pro 2013–2016 — no power, fan briefly spins, then nothing. All three are standard component-level repairs for us — usually under R3,500.',
  },
  {
    question: 'What is the difference between component-level repair and board replacement?',
    answer:
      'Component-level repair fixes the specific failed component on your existing logic board — replacing a single chip, capacitor, resistor, or damaged trace under microscope. Board replacement swaps the entire logic board for a new or refurbished unit. Component-level repair is typically 60–80% cheaper, preserves your original board (and therefore your data, your Touch ID pairing, and your Apple Silicon SSD), and is finished in 24–72 hours instead of the week-plus that a board replacement requires. It is our strongly preferred approach and the one we use in the vast majority of cases.',
  },
  {
    question: 'My MacBook shows no signs of life. Is it worth bringing in?',
    answer:
      'Yes. A completely dead MacBook is one of the most common faults we successfully repair. "No power" faults are very often caused by a single failed component on the power rail — a blown fuse, failed MOSFET, or damaged charging IC. These are component-level repairs that cost a fraction of a new machine — typically R2,500 to R4,500 versus R30,000+ for a replacement MacBook Pro. Book a R599 assessment and we will tell you exactly what failed and what it will cost to fix.',
  },
  {
    question: 'Can you repair M1, M2, M3, and M4 MacBook logic boards?',
    answer:
      'Yes — with some differences from Intel models. Apple Silicon boards have the CPU, GPU, RAM, and Neural Engine integrated into a single SoC package, which cannot be replaced at chip level by anyone (including Apple). However, the surrounding components — power management ICs, USB-C controllers, storage chips, board traces, fuses — are fully serviceable through component-level repair. The most common Apple Silicon faults we see are USB-C controller failure, charging-circuit damage, and post-liquid corrosion — all of which are component-level repairs.',
  },
  {
    question: 'Is my data safe during a logic board repair?',
    answer:
      'Yes. Your storage stays in the device throughout the repair. We do not reformat, reinstall macOS, or touch your data unless you specifically ask us to. If a full board replacement is the only option and you have an Apple Silicon Mac, we will discuss the data situation with you up front — on Apple Silicon the SSD is soldered to the board, which complicates board replacement. In nearly all cases we can preserve your original board (and therefore your data) through component-level repair instead.',
  },
];

const subPages = [
  { title: 'MacBook Pro Logic Board', href: '/logic-board-repair/macbook-pro', desc: '13", 14", 16" — Intel and Apple Silicon component-level repair' },
  { title: 'MacBook Air Logic Board', href: '/logic-board-repair/macbook-air', desc: 'M1, M2, M3 — USB-C, charging, power-circuit repair' },
  { title: 'iMac Logic Board', href: '/logic-board-repair/imac', desc: '21.5", 24", 27" desktop board component repair' },
  { title: 'Mac mini Logic Board', href: '/logic-board-repair/mac-mini', desc: 'Intel and M-series Mac mini board diagnostics' },
];

const suburbPages = [
  { label: 'Sandton', href: '/logic-board-repair/sandton', distance: '8 min' },
  { label: 'Rosebank', href: '/logic-board-repair/rosebank', distance: '5 min' },
  { label: 'Midrand', href: '/logic-board-repair/midrand', distance: '30 min' },
  { label: 'Randburg', href: '/logic-board-repair/randburg', distance: '15 min' },
  { label: 'Fourways', href: '/logic-board-repair/fourways', distance: '25 min' },
  { label: 'Bryanston', href: '/logic-board-repair/bryanston', distance: '10 min' },
  { label: 'Morningside', href: '/logic-board-repair/morningside', distance: '6 min' },
  { label: 'Rivonia', href: '/logic-board-repair/rivonia', distance: '12 min' },
  { label: 'Houghton', href: '/logic-board-repair/houghton', distance: '10 min' },
  { label: 'Parkhurst', href: '/logic-board-repair/parkhurst', distance: '12 min' },
  { label: 'Pretoria', href: '/logic-board-repair/pretoria', distance: '45 min' },
  { label: 'Centurion', href: '/logic-board-repair/centurion', distance: '35 min' },
];

/* ── Pricing table ───────────────────────────────────────────────────────── */
const pricingTable = [
  { device: 'MacBook Air logic board (M1/M2/M3, Intel)', from: 'R2,500', turnaround: '24–72 hrs', warranty: '12 months' },
  { device: 'MacBook Pro 13″ logic board', from: 'R2,800', turnaround: '24–72 hrs', warranty: '12 months' },
  { device: 'MacBook Pro 14″ / 16″ logic board', from: 'R3,500', turnaround: '48–96 hrs', warranty: '12 months' },
  { device: 'iMac logic board', from: 'R3,200', turnaround: '3–5 days', warranty: '12 months' },
  { device: 'Mac mini logic board', from: 'R2,500', turnaround: '24–72 hrs', warranty: '12 months' },
  { device: 'USB-C controller only (CD3217B12)', from: 'R2,200', turnaround: '24–48 hrs', warranty: '12 months' },
  { device: 'Backlight driver IC only (LP8550)', from: 'R1,800', turnaround: '24–48 hrs', warranty: '12 months' },
];

/* ── IC fault reference table ───────────────────────────────────────────── */
const icFaults = [
  { chip: 'AMD GPU (MXM)', models: 'MBP 2011–2013', symptom: 'Screen artifacts, no video, garbled display', repair: 'GPU reball or replacement', risk: 'High' },
  { chip: 'CD3217B12', models: 'MBP / MBA 2016–2020', symptom: 'No charging, USB-C dead on one or both sides', repair: 'Controller chip replacement', risk: 'Medium' },
  { chip: 'TPS51980', models: 'MBP 2013–2016', symptom: 'No power, fan spin then shutdown, 0V on PPBUS_G3H', repair: 'Power management IC replacement', risk: 'High' },
  { chip: 'LP8550', models: 'MBP / MBA 2012–2017', symptom: 'No backlight, faint display visible with torch', repair: 'Backlight driver IC replacement', risk: 'Medium' },
  { chip: 'Thunderbolt Controller', models: 'MBP 2011–2014', symptom: 'No Thunderbolt, kernel panic on attach, port dead', repair: 'Thunderbolt IC replacement', risk: 'Medium' },
  { chip: 'T2 / SMC support', models: 'MBP 2018+, MBA 2020+', symptom: 'Loop boot, DFU required, USB-C only powers with specific cable', repair: 'Adjacent component service, DFU restore', risk: 'High' },
];

/* ── Structured Data ─────────────────────────────────────────────────────── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Logic Board Repair Johannesburg',
  description:
    'Professional MacBook logic board repair and component-level chip replacement in Johannesburg. From R2,500. R599 assessment. 12-month warranty. Hyde Park workshop.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Hyde Park' },
    { '@type': 'Neighborhood', name: 'Sandton' },
    { '@type': 'Neighborhood', name: 'Rosebank' },
    { '@type': 'Neighborhood', name: 'Bryanston' },
  ],
  availableChannel: [
    { '@type': 'ServiceChannel', serviceUrl: 'https://wa.me/27645295863', serviceType: 'WhatsApp' },
    { '@type': 'ServiceChannel', servicePhone: '+27645295863', serviceType: 'Phone' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Logic Board Repair Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'MacBook Air Logic Board Repair', description: 'Component-level repair for MacBook Air logic boards. From R2,500. 12-month warranty.' },
        price: '2500', priceCurrency: 'ZAR',
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'MacBook Pro Logic Board Repair', description: 'Component-level repair for MacBook Pro 13/14/16-inch logic boards. From R2,800. 12-month warranty.' },
        price: '2800', priceCurrency: 'ZAR',
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'USB-C Controller Replacement', description: 'CD3217B12 USB-C controller chip replacement. From R2,200. 12-month warranty.' },
        price: '2200', priceCurrency: 'ZAR',
      },
    ],
  },
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Logic Board Repair', url: 'https://zasupport.com/logic-board-repair' },
]);

const faqSchema = buildFaqSchema(faqs);

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://zasupport.com/logic-board-repair#webpage',
  name: 'MacBook Logic Board Repair Johannesburg | ZA Support',
  url: 'https://zasupport.com/logic-board-repair',
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '.speakable-summary'],
  },
};

// HowTo schema removed 27/05/2026 per T4 Google-primary research — Google deprecated
// HowTo rich results 14 Sep 2023; schema emission no longer adds SERP value.

export default function LogicBoardRepairPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />
      <SchemaOrg schema={speakableSchema} />

      <main className="bg-[#0A1A18] text-[#E8F4F1] min-h-screen">
        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto px-4 pt-4">
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Logic Board Repair', href: '/logic-board-repair' },
          ]} />
        </div>

        {/* ── Hero Section ───────────────────────────────────────────────── */}
        <section className="relative py-16 sm:py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-[#0FEA7A] text-sm font-medium mb-4">
                <Cpu className="w-4 h-4" />
                <span>Component-Level Logic Board Specialists &bull; Hyde Park, Johannesburg</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                MacBook Logic Board<br />
                <span className="text-[#0FEA7A]">Repair Johannesburg</span>
              </h1>
              <p className="text-lg sm:text-xl text-[#7A9E98] mb-4 speakable-summary">
                Component-level MacBook logic board repair from <strong className="text-[#E8F4F1]">R2,500</strong>{' '}
                at our Hyde Park workshop. We replace the specific failed chip under microscope —
                we do not swap the whole board. 12-month warranty. R599 assessment.
              </p>
              <p className="text-[#7A9E98] mb-4">
                We have been repairing MacBook logic boards from our Hyde Park workshop since 2009 —
                more than {SITE.yearsExperience} years and over 25,000 individual repair operations
                across our specialist Apple workshop. Logic board work is what our workshop is
                built around: Apple Silicon, Intel-era MacBook Pro, MacBook Air, iMac and Mac mini.
              </p>
              <p className="text-[#7A9E98] mb-8 text-sm italic">
                By <Link href="/author/courtney-bentley" className="text-[#0FEA7A] underline hover:no-underline">Courtney Bentley</Link>,
                Founder, CEO &amp; Apple Certified Expert Consultant
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  { icon: Microscope, label: 'Microscope Component Repair' },
                  { icon: Zap, label: 'R599 Assessment' },
                  { icon: CheckCircle, label: '12-Month Warranty' },
                  { icon: AlertTriangle, label: 'Written Quote First' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                    <Icon className="w-4 h-4 text-[#0FEA7A]" />
                    <span className="text-[#E8F4F1] text-sm font-medium">{label}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={buildWhatsAppUrl('LBR-HERO', 'logic-board')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] font-bold px-8 py-4 rounded-lg hover:bg-[#0dcc6a] transition-colors text-lg"
                >
                  <Zap className="w-5 h-5" />
                  WhatsApp Now
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href={`tel:${CONTACT.phoneTel}`}
                  className="inline-flex items-center justify-center gap-2 border border-[#27504D] text-[#E8F4F1] font-semibold px-8 py-4 rounded-lg hover:bg-[#27504D]/20 transition-colors text-lg"
                >
                  <Phone className="w-5 h-5" />
                  {CONTACT.phone}
                </a>
              </div>

              {/* Stats bar */}
              <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)]">
                {[
                  { value: 'Over 25,000', label: 'Workshop Repair Operations' },
                  { value: `${SITE.yearsExperience} Years`, label: 'Hyde Park Workshop Since 2009' },
                  { value: '12 Months', label: 'Written Warranty' },
                  { value: 'From R599', label: 'Assessment Fee' },
                  { value: `${SITE.rating}★`, label: `${SITE.reviewCount} Google Reviews` },
                ].map(({ value, label }) => (
                  <div key={label}>
                    <p className="text-[#0FEA7A] text-xl font-extrabold">{value}</p>
                    <p className="text-[#7A9E98] text-xs mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Trust Badges ───────────────────────────────────────────────── */}
        <section className="border-y border-[#27504D]/30 py-8 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { icon: Shield, label: '12-Month Warranty' },
              { icon: Clock, label: '24–72 hr Turnaround' },
              { icon: Star, label: `${SITE.rating}★ (${SITE.reviewCount} Reviews)` },
              { icon: CheckCircle, label: 'Component-Level Repair' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <Icon className="w-6 h-6 text-[#0FEA7A]" />
                <span className="text-sm font-semibold text-[#E8F4F1]">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Why Component-Level Repair Wins ────────────────────────────── */}
        <section className="py-16 sm:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Why Component-Level Repair Beats Board Replacement
            </h2>
            <p className="text-[#7A9E98] mb-10 max-w-3xl">
              Most Apple repair shops in Johannesburg quote a full logic board replacement for any
              significant board fault — R15,000 to R30,000 at the Apple Store. We work at component
              level under microscope and replace the specific failed chip. The math is dramatic.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Shield,
                  title: 'Your data stays on the device',
                  body: 'Component-level repair leaves your storage, your files, and your operating system completely untouched. Board replacement on Apple Silicon Macs means losing everything on the soldered SSD.',
                },
                {
                  icon: CheckCircle,
                  title: 'Touch ID pairing preserved',
                  body: 'Touch ID is paired to the T2 chip / Secure Enclave on your original logic board. Replacing the board breaks this pairing permanently. Component-level repair keeps your original board intact.',
                },
                {
                  icon: Clock,
                  title: '60–80% cheaper, days not weeks',
                  body: 'Component-level repair is typically R2,500 to R5,000 versus R15,000 to R30,000 for a board replacement at Apple. Most repairs are finished in 24 to 72 hours instead of the week-plus that board replacement requires.',
                },
              ].map(({ icon: Icon, title, body }) => (
                <div key={title} className="bg-[#111C1A] rounded-xl p-6 border border-[#27504D]/20">
                  <Icon className="w-7 h-7 text-[#0FEA7A] mb-3" />
                  <h3 className="text-lg font-bold mb-2">{title}</h3>
                  <p className="text-[#7A9E98] leading-relaxed text-sm">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Common Faults Grid ─────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 px-4 bg-[#111C1A]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Common Logic Board Faults We Fix</h2>
            <p className="text-[#7A9E98] text-sm mb-10 max-w-2xl">
              Every fault below is covered by our standard assessment process. We use professional
              microscope rework equipment for every component-level repair.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {faults.map((fault) => (
                <div key={fault.title} className="bg-[#0A1A18] rounded-xl p-5 border border-[#27504D]/20">
                  <h3 className="text-[#E8F4F1] font-bold mb-2">{fault.title}</h3>
                  <p className="text-[#7A9E98] text-sm leading-relaxed">{fault.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing Table ──────────────────────────────────────────────── */}
        <section id="pricing" className="py-16 sm:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Logic Board Repair Pricing</h2>
            <p className="text-[#7A9E98] mb-10 max-w-2xl">
              Component-level repair pricing. All prices include diagnosis, chip-level repair, full
              functional testing, and a written 12-month warranty. Compare with the Apple Store —
              R15,000 to R30,000 for a full board replacement.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#27504D]/40">
                    <th className="py-4 pr-6 text-[#7A9E98] font-semibold text-sm uppercase tracking-wider">Repair</th>
                    <th className="py-4 pr-6 text-[#7A9E98] font-semibold text-sm uppercase tracking-wider">From</th>
                    <th className="py-4 pr-6 text-[#7A9E98] font-semibold text-sm uppercase tracking-wider hidden sm:table-cell">Turnaround</th>
                    <th className="py-4 text-[#7A9E98] font-semibold text-sm uppercase tracking-wider hidden sm:table-cell">Warranty</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingTable.map((tier) => (
                    <tr key={tier.device} className="border-b border-[#27504D]/20">
                      <td className="py-4 pr-6 font-semibold">{tier.device}</td>
                      <td className="py-4 pr-6 text-[#0FEA7A] font-bold text-lg">{tier.from}</td>
                      <td className="py-4 pr-6 text-[#7A9E98] hidden sm:table-cell">{tier.turnaround}</td>
                      <td className="py-4 text-[#7A9E98] hidden sm:table-cell">{tier.warranty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[#7A9E98] text-sm mt-6">
              Assessment fee from R599 — covers full board diagnostic under microscope and written
              fixed-price quote. Included in the repair cost if you proceed. All prices in ZAR including VAT.
            </p>
            <PricingRange page="/logic-board-repair" />
            <PricingNote />
          </div>
        </section>

        {/* ── IC Fault Reference Table ───────────────────────────────────── */}
        <section className="py-16 sm:py-20 px-4 bg-[#111C1A]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              IC Fault Reference — Chips We Replace at Component Level
            </h2>
            <p className="text-[#7A9E98] text-sm mb-10 max-w-2xl">
              Our technicians work at component level under stereo microscope. Below are the most common
              integrated circuits we replace on MacBook and Mac logic boards, with affected models,
              typical symptoms, and our repair approach.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-[rgba(255,255,255,0.08)]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[rgba(15,234,122,0.06)] border-b border-[rgba(255,255,255,0.08)]">
                    <th className="text-left text-[#7A9E98] font-semibold px-5 py-4 uppercase tracking-wider text-xs">Chip / Component</th>
                    <th className="text-left text-[#7A9E98] font-semibold px-5 py-4 uppercase tracking-wider text-xs">Affected Models</th>
                    <th className="text-left text-[#7A9E98] font-semibold px-5 py-4 uppercase tracking-wider text-xs">Typical Symptom</th>
                    <th className="text-left text-[#7A9E98] font-semibold px-5 py-4 uppercase tracking-wider text-xs">Our Repair</th>
                    <th className="text-left text-[#7A9E98] font-semibold px-5 py-4 uppercase tracking-wider text-xs">Risk</th>
                  </tr>
                </thead>
                <tbody>
                  {icFaults.map((ic, i) => (
                    <tr key={ic.chip} className={`${i < icFaults.length - 1 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''} hover:bg-[rgba(255,255,255,0.02)] transition-colors`}>
                      <td className="px-5 py-4">
                        <span className="text-[#E8F4F1] font-bold font-mono text-xs">{ic.chip}</span>
                      </td>
                      <td className="px-5 py-4 text-[#7A9E98]">{ic.models}</td>
                      <td className="px-5 py-4 text-[#7A9E98]">{ic.symptom}</td>
                      <td className="px-5 py-4 text-[#E8F4F1] text-xs">{ic.repair}</td>
                      <td className="px-5 py-4">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${ic.risk === 'High' ? 'bg-red-500/10 text-red-400' : 'bg-orange-500/10 text-orange-400'}`}>
                          {ic.risk}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[#7A9E98] text-xs mt-4">
              Risk rating indicates complexity of the repair, not likelihood of success. Assessment fee
              from R599. 12-month warranty on all component-level repairs.
            </p>
          </div>
        </section>

        {/* ── Repair Services ────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-extrabold mb-4">Repair Services</h2>
            <p className="text-[#7A9E98] text-sm mb-8 max-w-2xl">
              All repairs are component-level under microscope. Final cost is confirmed in writing after
              the R599 assessment.
            </p>
            <div className="bg-[#111C1A] border border-[#27504D]/20 rounded-xl overflow-hidden">
              {repairTypes.map((item, i) => (
                <div key={item.item} className={`flex items-center justify-between p-5 ${i < repairTypes.length - 1 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}>
                  <div>
                    <p className="text-[#E8F4F1] font-semibold">{item.item}</p>
                    <p className="text-[#7A9E98] text-xs mt-0.5">{item.note}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mid-page WhatsApp CTA */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href={buildWhatsAppUrl('LBR-MID', 'logic-board')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0dcc6a] transition-colors"
              >
                <Zap className="w-5 h-5" />
                WhatsApp for Quote
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[#27504D] text-[#E8F4F1] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[#27504D]/20 transition-colors"
              >
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </section>

        {/* ── Why ZA Support ─────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 px-4 bg-[#111C1A]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-10">Why Johannesburg Trusts ZA Support With Logic Board Repair</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: '17 Years In One Workshop',
                  desc: `We have run the same Hyde Park workshop since 2009 — ${SITE.yearsExperience} years of Apple-only repair, including more than 25,000 individual repair operations across our specialist Apple workshop. Component-level logic board repair is what we do every day.`,
                },
                {
                  title: 'Component-Level Specialists',
                  desc: 'Most repair shops in Johannesburg quote a full board replacement for any logic board fault. We work at component level under microscope, replacing the specific failed chip — saving you 60–80% versus board replacement and preserving your data and Touch ID pairing.',
                },
                {
                  title: 'Workshop-Only — No Off-Site Shipping',
                  desc: 'Your device stays at our Hyde Park workshop for the entire repair. We do not send boards off-site to a third-party microsolder shop. Every step — diagnosis, chip replacement, testing — happens in front of our own technicians in Johannesburg.',
                },
                {
                  title: 'Written 12-Month Warranty',
                  desc: 'Every logic board repair carries a written 12-month warranty on the specific components we repaired and our workmanship. Most Johannesburg shops offer 90 days. The Apple Store offers 90 days on out-of-warranty work.',
                },
                {
                  title: 'Transparent Fixed-Price Quotes',
                  desc: 'You receive a written, fixed-price quote after the R599 assessment — and that price is the price. No surprises, no "we found something else" upsells, no hidden charges. The R599 is included in the repair cost if you proceed.',
                },
                {
                  title: 'Forbes Africa 30 Under 30 (2019)',
                  desc: 'Founder Courtney Bentley was named to the Forbes Africa 30 Under 30 list in 2019 for building ZA Support into one of Johannesburg\'s most-reviewed independent Apple specialists. We treat that recognition as a standard to maintain, not a credential to rest on.',
                },
              ].map((item) => (
                <div key={item.title} className="bg-[#0A1A18] rounded-xl p-6 border border-[#27504D]/20">
                  <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                  <p className="text-[#7A9E98] leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Sub-Pages Grid ─────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Logic Board Repair by Device</h2>
            <p className="text-[#7A9E98] mb-10 max-w-2xl">
              Each Mac model has unique logic board architecture and common fault patterns. Select your
              device below for model-specific information.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {subPages.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="bg-[#111C1A] rounded-xl p-5 border border-[#27504D]/20 hover:border-[#0FEA7A]/40 transition-colors group"
                >
                  <h3 className="text-[#E8F4F1] font-bold text-sm mb-2 group-hover:text-[#0FEA7A] transition-colors">{page.title}</h3>
                  <p className="text-[#7A9E98] text-xs leading-relaxed mb-3">{page.desc}</p>
                  <p className="text-[#0FEA7A] text-xs font-semibold">Assessment from R599</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Suburb Service Areas ───────────────────────────────────────── */}
        <section className="py-16 sm:py-20 px-4 bg-[#111C1A]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Logic Board Repair Near You</h2>
            <p className="text-[#7A9E98] mb-8">
              We collect from all major Johannesburg suburbs and repair at our Hyde Park workshop, plus
              Pretoria and Centurion. Click your area for local details.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {suburbPages.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="flex items-center justify-between bg-[#0A1A18] rounded-lg px-4 py-3 border border-[#27504D]/20 hover:border-[#0FEA7A]/40 transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#0FEA7A]" />
                    <span className="font-semibold text-sm group-hover:text-[#0FEA7A] transition-colors">{s.label}</span>
                  </div>
                  <span className="text-xs text-[#7A9E98]">{s.distance}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Related Repairs ────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-8">Related Apple Repair Services</h2>
            <p className="text-[#7A9E98] mb-8 max-w-2xl">
              Logic board faults frequently overlap with other faults. A MacBook that will not charge
              could be a logic board fault (USB-C controller), a{' '}
              <Link href="/battery-replacement" className="text-[#0FEA7A] underline hover:no-underline">failed battery</Link>,
              or downstream damage from a{' '}
              <Link href="/liquid-damage" className="text-[#0FEA7A] underline hover:no-underline">liquid spill</Link>.
              Our assessment identifies the root cause before any repair is quoted.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: 'Liquid Damage Repair', href: '/liquid-damage', desc: 'Ultrasonic cleaning and component-level board recovery after spills' },
                { title: 'Battery Replacement', href: '/battery-replacement', desc: 'MacBook and iPhone battery replacement with up-to-3 year warranty' },
                { title: 'Screen Repair', href: '/screen-repair', desc: 'Cracked or flickering MacBook, iMac, iPhone displays' },
                { title: 'Contact Us', href: '/contact', desc: 'Book an assessment or get a WhatsApp quote' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="bg-[#111C1A] rounded-xl p-6 border border-[#27504D]/20 hover:border-[#0FEA7A]/40 transition-colors group"
                >
                  <h3 className="text-lg font-bold mb-2 group-hover:text-[#0FEA7A] transition-colors">{link.title}</h3>
                  <p className="text-sm text-[#7A9E98]">{link.desc}</p>
                  <ArrowRight className="w-4 h-4 text-[#0FEA7A] mt-3" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Google Reviews ─────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 px-4 bg-[#111C1A]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-2 text-center">What Our Customers Say</h2>
            <p className="text-[#7A9E98] text-center mb-8">
              {SITE.rating}★ across {SITE.reviewCount} Google reviews — Johannesburg&apos;s most
              reviewed independent Apple specialist.
            </p>
            <Suspense fallback={<div className="h-48 bg-[#0A1A18] rounded-xl animate-pulse" />}>
              <GoogleReviews count={6} />
            </Suspense>
          </div>
        </section>

        {/* ── Orphan-link injection — per-model + per-suburb ─────────────── */}
        <OrphanLinks
          sectionTitle="Logic board repair by model and area"
          intro="Logic board work is what our Hyde Park workshop is built around — Apple Silicon, Intel-era MacBook Pro and MacBook Air, with collection across Gauteng. Pick the model you have or the suburb closest to you to read what the diagnostic, component-level repair and warranty work looks like for that machine or that area."
          groups={[
            { heading: 'By MacBook model', links: orphanLbrModelLinks },
            { heading: 'By Gauteng suburb', links: orphanLbrSuburbLinks },
          ]}
        />

        {/* ── FAQ Section ────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <FAQAccordion items={faqs} title="Logic Board Repair — Frequently Asked Questions" />
          </div>
        </section>

        {/* ── Bottom CTA ─────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 px-4 bg-[#111C1A]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">
              Logic Board Fault? Book an Assessment Today
            </h2>
            <p className="text-lg text-[#7A9E98] mb-4 max-w-2xl mx-auto">
              WhatsApp us your MacBook model and a description of the fault and we will reply with
              same-day intake details. R599 assessment with a written fixed-price quote before any
              work begins.
            </p>
            <p className="text-[#7A9E98] mb-8">
              <MapPin className="w-4 h-4 inline-block mr-1 text-[#0FEA7A]" />
              {CONTACT.address.full} &bull; {CONTACT.hours.weekdays}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={buildWhatsAppUrl('LBR-BOTTOM', 'logic-board')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] font-bold px-10 py-4 rounded-lg hover:bg-[#0dcc6a] transition-colors text-lg"
              >
                <Zap className="w-5 h-5" />
                WhatsApp for Quote
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[#27504D] text-[#E8F4F1] font-semibold px-10 py-4 rounded-lg hover:bg-[#27504D]/20 transition-colors text-lg"
              >
                <Phone className="w-5 h-5" />
                Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
