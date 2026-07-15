import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import {
  Phone, ArrowRight, Droplets, AlertTriangle, CheckCircle, Shield, Clock,
  MapPin, Star, Microscope, Zap, Cpu,
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

const orphanModelLinks = [
  { title: 'Mac mini', href: '/liquid-damage/mac-mini', description: 'Liquid damage repair for Mac mini' },
  { title: 'MacBook Air M1', href: '/liquid-damage/macbook-air-m1', description: 'Liquid damage repair for MacBook Air M1' },
  { title: 'MacBook Air M2', href: '/liquid-damage/macbook-air-m2', description: 'Liquid damage repair for MacBook Air M2' },
  { title: 'MacBook Air M3', href: '/liquid-damage/macbook-air-m3', description: 'Liquid damage repair for MacBook Air M3' },
  { title: 'MacBook Air M4', href: '/liquid-damage/macbook-air-m4', description: 'Liquid damage repair for MacBook Air M4' },
  { title: 'MacBook Air M5', href: '/liquid-damage/macbook-air-m5', description: 'Liquid damage repair for MacBook Air M5' },
  { title: 'MacBook Pro 13-inch', href: '/liquid-damage/macbook-pro-13-inch', description: 'Liquid damage repair for MacBook Pro 13-inch' },
  { title: 'MacBook Pro 14-inch', href: '/liquid-damage/macbook-pro-14-inch', description: 'Liquid damage repair for MacBook Pro 14-inch' },
  { title: 'MacBook Pro 16-inch', href: '/liquid-damage/macbook-pro-16-inch', description: 'Liquid damage repair for MacBook Pro 16-inch' },
  { title: 'MacBook Pro M1', href: '/liquid-damage/macbook-pro-m1', description: 'Liquid damage repair for MacBook Pro M1' },
  { title: 'MacBook Pro M2', href: '/liquid-damage/macbook-pro-m2', description: 'Liquid damage repair for MacBook Pro M2' },
  { title: 'MacBook Pro M4', href: '/liquid-damage/macbook-pro-m4', description: 'Liquid damage repair for MacBook Pro M4, M4 Pro, M4 Max' },
  { title: 'MacBook Pro M5', href: '/liquid-damage/macbook-pro-m5', description: 'Liquid damage repair for MacBook Pro M5, M5 Pro, M5 Max' },
  { title: 'MacBook Pro M3', href: '/liquid-damage/macbook-pro-m3', description: 'Liquid damage repair for MacBook Pro M3' },
];

const orphanSuburbLinks = [
  { title: 'Alberton', href: '/liquid-damage/alberton', description: 'Liquid damage repair in Alberton' },
  { title: 'Bedfordview', href: '/liquid-damage/bedfordview', description: 'Liquid damage repair in Bedfordview' },
  { title: 'Benoni', href: '/liquid-damage/benoni', description: 'Liquid damage repair in Benoni' },
  { title: 'Boksburg', href: '/liquid-damage/boksburg', description: 'Liquid damage repair in Boksburg' },
  { title: 'Bryanston', href: '/liquid-damage/bryanston', description: 'Liquid damage repair in Bryanston' },
  { title: 'Centurion', href: '/liquid-damage/centurion', description: 'Liquid damage repair in Centurion' },
  { title: 'Craighall', href: '/liquid-damage/craighall', description: 'Liquid damage repair in Craighall' },
  { title: 'Edenvale', href: '/liquid-damage/edenvale', description: 'Liquid damage repair in Edenvale' },
  { title: 'Emmarentia', href: '/liquid-damage/emmarentia', description: 'Liquid damage repair in Emmarentia' },
  { title: 'Fourways', href: '/liquid-damage/fourways', description: 'Liquid damage repair in Fourways' },
  { title: 'Germiston', href: '/liquid-damage/germiston', description: 'Liquid damage repair in Germiston' },
  { title: 'Greenside', href: '/liquid-damage/greenside', description: 'Liquid damage repair in Greenside' },
  { title: 'Houghton', href: '/liquid-damage/houghton', description: 'Liquid damage repair in Houghton' },
  { title: 'Illovo', href: '/liquid-damage/illovo', description: 'Liquid damage repair in Illovo' },
  { title: 'Kempton Park', href: '/liquid-damage/kempton-park', description: 'Liquid damage repair in Kempton Park' },
  { title: 'Kyalami', href: '/liquid-damage/kyalami', description: 'Liquid damage repair in Kyalami' },
  { title: 'Linden', href: '/liquid-damage/linden', description: 'Liquid damage repair in Linden' },
  { title: 'Melrose', href: '/liquid-damage/melrose', description: 'Liquid damage repair in Melrose' },
  { title: 'Melville', href: '/liquid-damage/melville', description: 'Liquid damage repair in Melville' },
  { title: 'Midrand', href: '/liquid-damage/midrand', description: 'Liquid damage repair in Midrand' },
  { title: 'Morningside', href: '/liquid-damage/morningside', description: 'Liquid damage repair in Morningside' },
  { title: 'Northcliff', href: '/liquid-damage/northcliff', description: 'Liquid damage repair in Northcliff' },
  { title: 'Parkhurst', href: '/liquid-damage/parkhurst', description: 'Liquid damage repair in Parkhurst' },
  { title: 'Parktown North', href: '/liquid-damage/parktown-north', description: 'Liquid damage repair in Parktown North' },
  { title: 'Paulshof', href: '/liquid-damage/paulshof', description: 'Liquid damage repair in Paulshof' },
  { title: 'Pretoria', href: '/liquid-damage/pretoria', description: 'Liquid damage repair in Pretoria' },
  { title: 'Randburg', href: '/liquid-damage/randburg', description: 'Liquid damage repair in Randburg' },
  { title: 'Randpark Ridge', href: '/liquid-damage/randpark-ridge', description: 'Liquid damage repair in Randpark Ridge' },
  { title: 'Rivonia', href: '/liquid-damage/rivonia', description: 'Liquid damage repair in Rivonia' },
  { title: 'Roodepoort', href: '/liquid-damage/roodepoort', description: 'Liquid damage repair in Roodepoort' },
  { title: 'Rosebank', href: '/liquid-damage/rosebank', description: 'Liquid damage repair in Rosebank' },
  { title: 'Sandton', href: '/liquid-damage/sandton', description: 'Liquid damage repair in Sandton' },
  { title: 'Sunninghill', href: '/liquid-damage/sunninghill', description: 'Liquid damage repair in Sunninghill' },
  { title: 'Woodmead', href: '/liquid-damage/woodmead', description: 'Liquid damage repair in Woodmead' },
];

export const metadata: Metadata = {
  title: 'MacBook Liquid Damage Repair Johannesburg [2026]',
  description:
    'MacBook & iPhone liquid damage repair in Johannesburg. Component-level board cleaning, ultrasonic recovery, same-day assessment. 12-month warranty. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/liquid-damage' },
};

/* ── Pricing Table ───────────────────────────────────────────────────────── */
const pricingTiers = [
  { device: 'MacBook Air liquid damage', from: 'Contact for pricing', turnaround: '3-5 days', warranty: '12 months', popular: false },
  { device: 'MacBook Pro 13″ liquid damage', from: 'Contact for pricing', turnaround: '3-5 days', warranty: '12 months', popular: true },
  { device: 'MacBook Pro 14″ / 16″ liquid damage', from: 'Contact for pricing', turnaround: '5-7 days', warranty: '12 months', popular: false },
  { device: 'iMac liquid damage', from: 'Contact for pricing', turnaround: '5-7 days', warranty: '12 months', popular: false },
  { device: 'iPhone liquid damage', from: 'Contact for pricing', turnaround: '24-72 hours', warranty: '12 months', popular: false },
  { device: 'iPad liquid damage', from: 'Contact for pricing', turnaround: '3-5 days', warranty: '12 months', popular: false },
];

/* ── Process Steps ───────────────────────────────────────────────────────── */
const processSteps = [
  { step: 1, title: 'Same-Day Diagnosis', desc: 'WhatsApp us or walk into our Hyde Park workshop. We open the device within hours of receipt, photograph the corrosion, and identify which logic-board rails, chips and connectors have been affected. Assessment fee applies.' },
  { step: 2, title: 'Full Disassembly', desc: 'The logic board is removed from the chassis under ESD-safe conditions. Display, keyboard, trackpad, battery, speakers and antennas are isolated and inspected individually for liquid migration paths.' },
  { step: 3, title: 'Ultrasonic Cleaning', desc: 'The bare logic board is submerged in a temperature-controlled ultrasonic bath with 99.9% isopropyl alcohol. The cavitation lifts conductive residue from beneath surface-mount chips, BGA pads and shielding cans where hand-cleaning cannot reach.' },
  { step: 4, title: 'Component-Level Repair', desc: 'Under stereo microscope, our technician identifies failed components, power-management ICs, charging controllers, USB-C ports, audio amplifiers, fuses, capacitors, and replaces them individually using hot-air rework and precision soldering. We do not swap the whole board.' },
  { step: 5, title: 'Bench Testing', desc: 'The board is powered on a DC bench supply outside the chassis and monitored for current draw on every rail. We verify display, charging, audio, Wi-Fi, Bluetooth, camera, microphone, keyboard, trackpad and every USB-C port before reassembly.' },
  { step: 6, title: 'Reassembly + 12-Month Warranty', desc: 'The device is rebuilt, full functional test repeated, and returned to you with a written 12-month warranty on every component we repaired. If the same fault returns within 12 months, we repair it again at no labour cost.' },
];

/* ── What Component-Level Repair Means ───────────────────────────────────── */
const componentRepairFeatures = [
  { icon: Microscope, title: 'Microscope Component Repair', desc: 'Stereo microscope at 7×-45× magnification used for every liquid damage repair. We see corrosion in places dripping naked eye cannot.' },
  { icon: Cpu, title: 'Component-Level: Not Board-Swap', desc: 'We replace the specific failed chip or component. Your original logic board, Touch ID pairing, and Apple Silicon SSD remain in place.' },
  { icon: Zap, title: 'Bench Power Diagnostics', desc: 'The board is powered on a regulated DC supply before reassembly. Short circuits and abnormal current draws are isolated to specific rails.' },
  { icon: Shield, title: '12-Month Workmanship Warranty', desc: 'Written warranty on every component we repair or replace. If the same fault returns within 12 months, we repair it again at no labour cost.' },
];

/* ── Suburb Service Area ─────────────────────────────────────────────────── */
const suburbPages = [
  { label: 'Sandton', href: '/liquid-damage/sandton', distance: '8 min' },
  { label: 'Rosebank', href: '/liquid-damage/rosebank', distance: '5 min' },
  { label: 'Midrand', href: '/liquid-damage/midrand', distance: '30 min' },
  { label: 'Randburg', href: '/liquid-damage/randburg', distance: '15 min' },
  { label: 'Fourways', href: '/liquid-damage/fourways', distance: '25 min' },
  { label: 'Bryanston', href: '/liquid-damage/bryanston', distance: '10 min' },
  { label: 'Morningside', href: '/liquid-damage/morningside', distance: '6 min' },
  { label: 'Rivonia', href: '/liquid-damage/rivonia', distance: '12 min' },
  { label: 'Houghton', href: '/liquid-damage/houghton', distance: '10 min' },
  { label: 'Parkhurst', href: '/liquid-damage/parkhurst', distance: '12 min' },
  { label: 'Pretoria', href: '/liquid-damage/pretoria', distance: '45 min' },
  { label: 'Centurion', href: '/liquid-damage/centurion', distance: '35 min' },
];

/* ── Sub-Pages ───────────────────────────────────────────────────────────── */
const subPages = [
  { title: 'MacBook Pro liquid damage', href: '/liquid-damage/macbook-pro', desc: 'Pro 13", 14", 16", Intel and Apple Silicon' },
  { title: 'MacBook Air liquid damage', href: '/liquid-damage/macbook-air', desc: 'M1, M2, M3, board cleaning and component repair' },
  { title: 'iPhone liquid damage', href: '/liquid-damage/iphone', desc: 'iPhone 8 through iPhone 16 Pro Max water recovery' },
  { title: 'iPad liquid damage', href: '/liquid-damage/ipad', desc: 'All iPad models including M4 iPad Pro' },
  { title: 'Apple Watch liquid damage', href: '/liquid-damage/apple-watch', desc: 'Series 3 through Ultra 2 sealed-housing recovery' },
  { title: 'iMac liquid damage', href: '/liquid-damage/imac', desc: '21.5", 24", 27" desktop board cleaning' },
];

/* ── FAQs (10 items) ─────────────────────────────────────────────────────── */
const faqs = [
  {
    question: 'How quickly should I bring my MacBook in after a spill?',
    answer:
      'Immediately, within hours if possible. Corrosion on a wet logic board begins within minutes and spreads progressively. Switch the device off, do not attempt to charge it, do not turn it on to "check", and bring it to our Hyde Park workshop the same day. We have seen MacBooks recovered fully when brought in within hours, and the same machine declared uneconomic to repair when brought in three weeks later because the owner kept trying to charge it.',
  },
  {
    question: 'Does rice work for a wet MacBook or iPhone?',
    answer:
      'No. Rice absorbs ambient humidity from the air, it does not draw liquid out of a sealed logic board. While the device sits in a bag of rice, mineral salts from the original spill are corroding copper traces and chip pads beneath the surface-mount components. By the time the device "feels dry", the damage is already done. The single most important step is professional ultrasonic cleaning to physically remove the conductive residue before it eats through traces.',
  },
  {
    question: 'How much does MacBook liquid damage repair cost in Johannesburg?',
    answer:
      'MacBook liquid damage repair pricing depends on the model and which components were damaged. A simple board clean is at the lower end, while replacing a damaged power-management IC or USB-C controller adds component cost. We provide a written fixed-price quote after the assessment and no work begins without your approval. Contact us for pricing.',
  },
  {
    question: 'How is component-level repair different from a logic-board swap?',
    answer:
      'A board swap replaces the entire logic board with a new or refurbished unit, typically many times the cost of a component-level repair from the Apple Store, and on an Apple Silicon Mac you also lose your soldered SSD (and therefore all your data) plus your Touch ID pairing. Component-level repair identifies the specific failed chip or component on your existing board and replaces only that component under microscope. You keep your original board, your data, your Touch ID. We use component-level repair on roughly 90% of the liquid damage Macs that come into the workshop. Board replacement is a last resort.',
  },
  {
    question: 'What does the ultrasonic cleaning process involve?',
    answer:
      'The logic board is removed from the chassis and submerged in a temperature-controlled ultrasonic tank filled with 99.9% isopropyl alcohol. High-frequency vibration causes the liquid to cavitate against every surface of the board, including underneath surface-mount chips, BGA solder balls, EMI shielding cans and connector pins that hand-cleaning cannot reach. The cycle runs at 40-60°C for 15-25 minutes. The board is then dried under heated air and inspected at 45× magnification before any further repair work begins.',
  },
  {
    question: 'My MacBook got wet but still works, should I bring it in anyway?',
    answer:
      'Yes. Liquid damage is progressive. We see this every week in the workshop, a customer spilled coffee or wine on the MacBook two months ago, dried it off, and it kept working "fine" until one day it suddenly stopped charging, or the keyboard developed dead keys, or the Wi-Fi card failed. The corrosion was developing invisibly the entire time. Early intervention, ultrasonic cleaning while the board is still functional, is dramatically cheaper and far more successful than waiting for the failure cascade.',
  },
  {
    question: 'What types of liquid cause the worst damage?',
    answer:
      'Sugary drinks (Coke, juice, energy drinks) and salt water are the most aggressive. They leave conductive residue that bridges adjacent chip pads and keeps causing short circuits long after the visible liquid has dried. Coffee is next, it is mildly acidic and leaves sticky residue. Pure water and tea are the gentlest, but still introduce moisture that triggers oxidation on copper traces over weeks. Sea water on iPhones is particularly destructive because chloride ions migrate through the case seals. Whatever the liquid, the cleaning protocol is the same, get it on the bench before the residue can react with the metals.',
  },
  {
    question: 'Will my data be safe during liquid damage repair?',
    answer:
      'Yes, your storage stays with your device throughout the entire repair. On Intel MacBooks the SSD is a removable module that we leave in place. On Apple Silicon MacBooks the SSD is soldered to the logic board, and component-level repair preserves it. We do not reformat, reinstall macOS, or touch your data at any point unless you specifically request it. If we determine the SSD itself is damaged, we discuss recovery options with you before any further work.',
  },
  {
    question: 'Does liquid damage repair come with a warranty?',
    answer:
      'Yes. Every liquid damage repair carries a written 12-month warranty on the components we repaired or replaced and on our workmanship. If the same fault returns within 12 months, we repair it again at no labour cost. The warranty does not cover further liquid exposure, drops, or unrelated faults, but it does cover the specific work we performed. The warranty document is handed to you at collection.',
  },
  {
    question: 'Do you do liquid damage repair on iPhones and iPads?',
    answer:
      'Yes. The process is similar, open the device, remove the logic board, ultrasonic clean, identify and replace failed components, full functional test. iPhone repairs typically complete in 24-72 hours, iPad in 3-5 days. We handle all iPhone models from iPhone 8 through iPhone 16 Pro Max, and all current iPads including the M4 iPad Pro.',
  },
];

/* ── Structured Data ─────────────────────────────────────────────────────── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Liquid Damage Repair Johannesburg',
  description:
    'Professional MacBook, iPhone and iPad liquid damage repair in Johannesburg. Component-level board repair, ultrasonic cleaning, same-day assessment. 12-month warranty. Hyde Park workshop.',
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
    name: 'Liquid Damage Repair Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'MacBook Air Liquid Damage Repair', description: 'Component-level liquid damage repair for MacBook Air. 12-month warranty.' },
        price: '1500', priceCurrency: 'ZAR',
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'MacBook Pro Liquid Damage Repair', description: 'Component-level liquid damage repair for MacBook Pro 13/14/16-inch. 12-month warranty.' },
        price: '2500', priceCurrency: 'ZAR',
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'iPhone Liquid Damage Repair', description: 'Component-level liquid damage repair for iPhone. 12-month warranty.' },
        price: '1200', priceCurrency: 'ZAR',
      },
    ],
  },
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Liquid Damage Repair', url: 'https://zasupport.com/liquid-damage' },
]);

const faqSchema = buildFaqSchema(faqs);

/* ── Page Component ──────────────────────────────────────────────────────── */
export default function LiquidDamagePage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <main className="bg-[#0A1A18] text-[#E8F4F1] min-h-screen">
        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto px-4 pt-4">
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Liquid Damage Repair', href: '/liquid-damage' },
          ]} />
        </div>

        {/* ── Hero Section ───────────────────────────────────────────────── */}
        <section className="relative py-16 sm:py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-[#0FEA7A] text-sm font-medium mb-4">
                <Droplets className="w-4 h-4" />
                <span>Component-Level Liquid Damage Specialists &bull; Hyde Park, Johannesburg</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                MacBook Liquid Damage<br />
                <span className="text-[#0FEA7A]">Repair Johannesburg</span>
              </h1>
              <p className="text-lg sm:text-xl text-[#7A9E98] mb-4 speakable-summary">
                Same-day assessment for spilled MacBooks, iPhones and iPads at our Hyde Park workshop.
                Component-level board cleaning and chip-level repair,
                with a written 12-month warranty. Assessment fee applies.
              </p>
              <p className="text-[#7A9E98] mb-4">
                We have been recovering liquid-damaged Apple devices from our Hyde Park workshop
                for over {SITE.yearsExperience} years, more than 25,000 MacBook repair operations across
                our specialist Apple workshop. We work at component level under microscope, not by
                swapping the whole logic board, which keeps your original board, your data, and your
                Touch ID pairing intact.
              </p>
              <p className="text-[#7A9E98] mb-8 text-sm italic">
                By <Link href="/author/courtney-bentley" className="text-[#0FEA7A] underline hover:no-underline">Courtney Bentley</Link>,
                Founder, CEO &amp; Apple Certified Expert Consultant
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={buildWhatsAppUrl('LIQ-HERO', 'liquid-damage')}
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
            </div>
          </div>
        </section>

        {/* ── Urgency Banner ─────────────────────────────────────────────── */}
        <section className="bg-red-900/20 border-y border-red-500/30 py-6 px-4">
          <div className="max-w-6xl mx-auto flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-bold text-lg">
                Wet MacBook? Act today. Corrosion spreads within hours, and rice does not help.
              </p>
              <p className="text-red-200 text-sm mt-1">
                Switch the device off immediately. Do not attempt to charge it. Do not turn it on to &ldquo;check&rdquo;.
                WhatsApp us a photo of the device and we will arrange same-day intake at our Hyde Park workshop.
              </p>
            </div>
          </div>
        </section>

        {/* ── Trust Badges ───────────────────────────────────────────────── */}
        <section className="border-b border-[#27504D]/30 py-8 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { icon: Shield, label: '12-Month Warranty' },
              { icon: Clock, label: 'Same-Day Assessment' },
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

        {/* ── What Happens Inside Your Device ──────────────────────────── */}
        <section className="py-16 sm:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">
              What Happens Inside Your MacBook After a Spill
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#111C1A] rounded-xl p-6 border border-[#27504D]/20">
                <div className="flex items-center gap-3 mb-4">
                  <Droplets className="w-6 h-6 text-[#0FEA7A]" />
                  <h3 className="text-xl font-bold">The First Few Minutes</h3>
                </div>
                <p className="text-[#7A9E98] leading-relaxed">
                  The moment liquid penetrates the keyboard or chassis vents, it spreads across the logic board
                  by capillary action, under the EMI shielding cans, between surface-mount chip leads, into
                  connector contacts. Live power rails encounter conductive liquid and short-circuit. Tiny
                  fuses (typically rated 3A, 5A or 10A) blow as designed to protect downstream chips. Power
                  rails collapse, and your MacBook either shuts down immediately or continues running while
                  damage cascades silently.
                </p>
              </div>
              <div className="bg-[#111C1A] rounded-xl p-6 border border-[#27504D]/20">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-[#0FEA7A]" />
                  <h3 className="text-xl font-bold">The Hours and Days After</h3>
                </div>
                <p className="text-[#7A9E98] leading-relaxed">
                  As the liquid dries, the dissolved sugars, salts and acids stay behind as conductive residue
                  on the board. Galvanic corrosion begins at every junction where dissimilar metals meet.
                  Copper traces oxidise. BGA solder balls beneath chips corrode from the edges inward. The
                  damage is invisible from above because everything happens under the chip packages. This is
                  why ultrasonic cleaning is critical, it physically lifts the residue out from underneath
                  the components before corrosion eats through the connections.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Our Process ────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 px-4 bg-[#111C1A]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Our 6-Step Liquid Damage Repair Process</h2>
            <p className="text-[#7A9E98] mb-10 max-w-2xl">
              The same process whether you bring in a wet MacBook Air or a flooded MacBook Pro 16-inch.
              Workshop-only, no parts are shipped, no devices leave Johannesburg.
            </p>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {processSteps.map((s) => (
                <div key={s.step} className="bg-[#0A1A18] rounded-xl p-6 border border-[#27504D]/20 relative">
                  <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-[#0FEA7A] text-[#0A1A18] flex items-center justify-center font-extrabold text-lg">
                    {s.step}
                  </div>
                  <h3 className="text-xl font-bold mt-4 mb-3">{s.title}</h3>
                  <p className="text-[#7A9E98] leading-relaxed text-sm">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Component-Level Repair ─────────────────────────────────── */}
        <section className="py-16 sm:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Why We Repair at Component Level, Not Board Swap
            </h2>
            <p className="text-[#7A9E98] mb-10 max-w-2xl">
              Most Apple repair shops quote a full logic-board replacement for any liquid damage,
              many times the cost of a component-level repair at the Apple Store, and on Apple Silicon Macs you lose your data and
              Touch ID pairing in the process. We do the opposite. We fix the specific failed components
              under microscope and leave your original board in place.
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {componentRepairFeatures.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-[#111C1A] rounded-xl p-6 border border-[#27504D]/20">
                  <Icon className="w-7 h-7 text-[#0FEA7A] mb-3" />
                  <h3 className="text-lg font-bold mb-2">{title}</h3>
                  <p className="text-[#7A9E98] leading-relaxed text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing Table ──────────────────────────────────────────────── */}
        <section id="pricing" className="py-16 sm:py-20 px-4 bg-[#111C1A]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Liquid Damage Repair Pricing</h2>
            <p className="text-[#7A9E98] mb-10 max-w-2xl">
              Component-level repair pricing. All prices include ultrasonic cleaning, component repair,
              labour, full functional testing, and a written 12-month warranty. Compare with the Apple
              Store, which quotes many times our price for a full logic-board swap.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#27504D]/40">
                    <th className="py-4 pr-6 text-[#7A9E98] font-semibold text-sm uppercase tracking-wider">Device</th>
                    <th className="py-4 pr-6 text-[#7A9E98] font-semibold text-sm uppercase tracking-wider">Pricing</th>
                    <th className="py-4 pr-6 text-[#7A9E98] font-semibold text-sm uppercase tracking-wider hidden sm:table-cell">Turnaround</th>
                    <th className="py-4 text-[#7A9E98] font-semibold text-sm uppercase tracking-wider hidden sm:table-cell">Warranty</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingTiers.map((tier) => (
                    <tr key={tier.device} className={`border-b border-[#27504D]/20 ${tier.popular ? 'bg-[#0FEA7A]/5' : ''}`}>
                      <td className="py-4 pr-6 font-semibold">
                        {tier.device}
                        {tier.popular && <span className="ml-2 text-xs bg-[#0FEA7A] text-[#0A1A18] px-2 py-0.5 rounded-full font-bold">Most Common</span>}
                      </td>
                      <td className="py-4 pr-6 text-[#0FEA7A] font-bold text-lg">{tier.from}</td>
                      <td className="py-4 pr-6 text-[#7A9E98] hidden sm:table-cell">{tier.turnaround}</td>
                      <td className="py-4 text-[#7A9E98] hidden sm:table-cell">{tier.warranty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[#7A9E98] text-sm mt-6">
              Assessment fee covers full disassembly, inspection, and written fixed-price quote.
              If you proceed with the repair, the assessment fee is included in the total. All prices in ZAR including VAT.
            </p>
            <PricingRange page="/liquid-damage" />
            <PricingNote />
          </div>
        </section>

        {/* ── Why ZA Support ─────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-10">Why Johannesburg Trusts ZA Support With Liquid Damage</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: '17 Years In One Workshop',
                  desc: `We have run the same Hyde Park workshop since 2009, ${SITE.yearsExperience} years of Apple-only repair, including more than 25,000 individual repair operations across our specialist Apple workshop. Liquid damage is one of our highest-volume repair categories.`,
                },
                {
                  title: 'Component-Level Specialists',
                  desc: 'Most repair shops in Johannesburg quote a full board replacement for any liquid damage. We work at component level under microscope, replacing the specific failed chips, power-management ICs, charging controllers, USB-C ports, audio amplifiers, for a fraction of board-swap cost.',
                },
                {
                  title: 'Workshop-Only: No Off-Site Shipping',
                  desc: 'Your device stays at our Hyde Park workshop for the entire repair. We do not ship boards to a third-party microsolder shop. Every step, disassembly, ultrasonic cleaning, component repair, testing, happens in front of our own technicians in Johannesburg.',
                },
                {
                  title: 'Written 12-Month Warranty',
                  desc: 'Every liquid damage repair carries a written 12-month warranty on the components we repaired and our workmanship. Most Johannesburg shops offer 90 days. The Apple Store offers 90 days on out-of-warranty work. We offer 12 months.',
                },
                {
                  title: 'Transparent Fixed-Price Quotes',
                  desc: 'You receive a written, fixed-price quote after the assessment, and that price is the price. No surprises, no "we found something else" upsells, no hidden charges. Assessment fee included in the repair cost if you proceed.',
                },
                {
                  title: 'Forbes Africa 30 Under 30 (2019)',
                  desc: 'Founder Courtney Bentley was named to the Forbes Africa 30 Under 30 list in 2019 for the work building ZA Support into one of Johannesburg\'s most-reviewed independent Apple specialists. We treat that recognition as a standard to maintain, not a credential to rest on.',
                },
              ].map((item) => (
                <div key={item.title} className="bg-[#111C1A] rounded-xl p-6 border border-[#27504D]/20">
                  <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                  <p className="text-[#7A9E98] leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Sub-Pages Grid ─────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 px-4 bg-[#111C1A]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Liquid Damage Repair by Device</h2>
            <p className="text-[#7A9E98] mb-10 max-w-2xl">
              Every Apple device has different liquid damage failure patterns. Select your model below for
              device-specific information including common failure components, turnaround time, and price.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {subPages.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="bg-[#0A1A18] rounded-xl p-6 border border-[#27504D]/20 hover:border-[#0FEA7A]/40 transition-colors group"
                >
                  <h3 className="text-lg font-bold mb-2 group-hover:text-[#0FEA7A] transition-colors">{page.title}</h3>
                  <p className="text-sm text-[#7A9E98] mb-3">{page.desc}</p>
                  <ArrowRight className="w-4 h-4 text-[#0FEA7A]" />
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
              Liquid damage frequently causes downstream faults. If your MacBook is not charging after a
              spill, the cause could be a damaged USB-C controller (covered by our{' '}
              <Link href="/logic-board-repair" className="text-[#0FEA7A] underline hover:no-underline">logic board repair</Link>{' '}
              service), a damaged battery cell (
              <Link href="/battery-replacement" className="text-[#0FEA7A] underline hover:no-underline">battery replacement</Link>),
              or a failed display (
              <Link href="/screen-repair" className="text-[#0FEA7A] underline hover:no-underline">screen repair</Link>).
              Our assessment identifies the root cause before any repair is quoted.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: 'Logic Board Repair', href: '/logic-board-repair', desc: 'Component-level board repair for no-power, no-display, USB-C faults' },
                { title: 'Battery Replacement', href: '/battery-replacement', desc: 'MacBook and iPhone battery replacement with up-to-3 year warranty' },
                { title: 'Screen Repair', href: '/screen-repair', desc: 'Cracked or flickering displays, MacBook, iMac, iPhone' },
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

        {/* ── Suburb Service Areas ───────────────────────────────────────── */}
        <section className="py-16 sm:py-20 px-4 bg-[#111C1A]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Liquid Damage Repair Near You</h2>
            <p className="text-[#7A9E98] mb-8">
              We collect and service all suburbs within 60 km of our Hyde Park workshop, plus Pretoria and Centurion.
              Click your area for local details.
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

        {/* ── Google Reviews ─────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-2 text-center">What Our Customers Say</h2>
            <p className="text-[#7A9E98] text-center mb-8">
              {SITE.rating}★ across {SITE.reviewCount} Google reviews, 
              Johannesburg&apos;s most reviewed independent Apple specialist.
            </p>
            <Suspense fallback={<div className="h-48 bg-[#111C1A] rounded-xl animate-pulse" />}>
              <GoogleReviews count={6} />
            </Suspense>
          </div>
        </section>

        {/* ── Orphan-link injection, per-model + per-suburb ─────────────── */}
        <OrphanLinks
          sectionTitle="Liquid damage repair across Gauteng"
          intro="Most liquid damage on MacBook, iMac, iPhone and iPad comes through our Hyde Park workshop, with collection across the wider Gauteng area. Pick the model you have or the suburb closest to you to read what the assessment, ultrasonic cleaning and board-level repair work looks like for that device or that area."
          groups={[
            { heading: 'By Apple model', links: orphanModelLinks },
            { heading: 'By Gauteng suburb', links: orphanSuburbLinks },
          ]}
        />

        {/* ── FAQ Section ────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 px-4 bg-[#111C1A]">
          <div className="max-w-4xl mx-auto">
            <FAQAccordion items={faqs} title="Liquid Damage Repair, Frequently Asked Questions" />
          </div>
        </section>

        {/* ── Bottom CTA ─────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">
              Wet MacBook? WhatsApp Us Now
            </h2>
            <p className="text-lg text-[#7A9E98] mb-4 max-w-2xl mx-auto">
              Send us a photo of your device and a short description of what was spilled. We will reply
              with same-day intake details. Assessment with a written fixed-price quote before
              any work begins.
            </p>
            <p className="text-[#7A9E98] mb-8">
              <MapPin className="w-4 h-4 inline-block mr-1 text-[#0FEA7A]" />
              {CONTACT.address.full} &bull; {CONTACT.hours.weekdays}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={buildWhatsAppUrl('LIQ-BOTTOM', 'liquid-damage')}
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
