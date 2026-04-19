import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { Phone, ArrowRight, Zap, CheckCircle, Shield, Clock, AlertTriangle, Settings, Battery, Monitor } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildBreadcrumbSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import GoogleReviews from '@/components/ui/GoogleReviews';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, SITE, buildWhatsAppUrl } from '@/lib/constants';
import PricingNote from '@/components/PricingNote';

export const metadata: Metadata = {
  title: 'iMac Battery & Power Supply Repair Johannesburg [2026] | From R899 | ZA Support',
  description:
    'iMac CMOS battery & PSU repair in Johannesburg. Clock resets, boot failures, kernel panics, voltage spike damage. No Fix No Fee. Assessment from R599. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/battery-replacement/imac' },
  keywords: [
    'iMac CMOS battery replacement Johannesburg',
    'iMac power supply repair Johannesburg',
    'iMac PSU repair South Africa',
    'iMac clock reset fix Johannesburg',
    'iMac not booting after load shedding',
    'iMac kernel panic fix Hyde Park',
    'iMac PRAM battery CR2032 replacement',
    'iMac power supply capacitor repair',
  ],
};

/* ── Breadcrumb ─────────────────────────────────────────────────────────── */
const breadcrumbItems = [
  { label: 'Battery Replacement', href: '/battery-replacement' },
  { label: 'iMac' },
];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Battery Replacement', url: 'https://zasupport.com/battery-replacement' },
  { name: 'iMac Battery & Power Repair', url: 'https://zasupport.com/battery-replacement/imac' },
];

/* ── FAQs ────────────────────────────────────────────────────────────────── */
const faqs = [
  {
    question: 'Does the iMac have a battery?',
    answer:
      'The iMac is a desktop machine that runs entirely from mains power — it has no main lithium-ion battery. However, Intel-based iMacs (2007 to 2019) do contain a CR2032 coin cell on the logic board, commonly called the CMOS or PRAM battery. This small cell keeps the real-time clock (RTC) running and preserves firmware settings when the iMac is unplugged. When it dies you will see the clock resetting to 1 January 2000, startup delays, or occasional kernel panics. Apple Silicon iMacs (M1, M3, M4) store these values differently and do not use a replaceable CMOS cell.',
  },
  {
    question: 'What are the symptoms of a dead iMac CMOS battery?',
    answer:
      'The most reliable symptom is the iMac clock resetting to 1 January 2000 every time the machine is unplugged from the wall. You may also see a persistent "This startup disk could not be found" error on boot, unusual kernel panics particularly at startup, or the iMac taking significantly longer than normal to reach the login screen. On some 2012 to 2017 Intel iMac models a dying CMOS battery also causes the machine to forget its boot disk preference — you may find it trying to boot from an external drive instead of the internal SSD.',
  },
  {
    question: 'How much does iMac CMOS battery replacement cost?',
    answer:
      'CMOS battery replacement on an Intel iMac starts from R899 at ZA Support. The CR2032 cell itself is inexpensive — the cost reflects the labour required to open the bonded display, locate the battery on the logic board, replace it, and reseal the machine. Apple does not offer CMOS battery replacement as a standalone service — they typically quote a logic board replacement at R4,000 to R12,000. Assessment from R599 applies if you decide not to proceed with the repair.',
  },
  {
    question: 'How much does iMac power supply repair cost?',
    answer:
      'PSU repair on an iMac starts from R1,999 depending on the extent of the damage. A blown fuse or failed capacitor is at the lower end; a PSU that has sustained multiple component failures from a serious voltage spike sits higher. Apple and iStores typically quote R4,000 to R12,000 for a PSU replacement — sometimes more on the 27-inch models. We always attempt a component-level repair before sourcing a replacement PSU, which keeps costs down considerably.',
  },
  {
    question: 'Can load shedding damage an iMac power supply?',
    answer:
      'Yes — this is the single most common cause of iMac PSU failure we see in Johannesburg. When Eskom restores power after an outage, the voltage on the line can spike for a fraction of a second before stabilising. The iMac power supply contains a bank of electrolytic capacitors that absorb transient voltage, but repeated spikes — sometimes four or five a day during Stage 4 and above — accelerate capacitor wear. When the capacitors fail, the symptoms range from a machine that will not power on at all, to random shutdowns under load, to a persistent whining noise from the display cavity. We see iMacs from Bryanston, Randburg, and Fourways most frequently with this exact fault, usually in the weeks following a sustained shedding period.',
  },
  {
    question: 'What UPS do you recommend for an iMac in South Africa?',
    answer:
      'For a 21.5-inch iMac, a 600VA or 850VA line-interactive UPS with pure sine wave output is sufficient — we recommend the APC Back-UPS Pro range or the Mecer 850VA as cost-effective options. The 27-inch iMac draws considerably more power under load (up to 295W continuous), so we suggest a 1500VA pure sine wave UPS such as the APC Smart-UPS 1500VA. Pure sine wave output is important — modified sine wave UPS units can cause the iMac PSU to run hot, which accelerates capacitor wear over time. A quality surge protector is the absolute minimum if a UPS is not in the budget.',
  },
  {
    question: 'Where is the CMOS battery located on an Intel iMac?',
    answer:
      'On most Intel iMac models (2012 to 2019) the CR2032 CMOS battery sits on the logic board, accessible after the display has been removed. On 21.5-inch models it is located near the lower-right quadrant of the logic board. On 27-inch iMacs it is positioned closer to the centre of the board, adjacent to the memory slots. Reaching it requires opening the bonded display — there is no external access panel on the iMac chassis. This is why we strongly advise against DIY CMOS battery replacement on an iMac: one slip while lifting the adhesive-bonded glass and you face a screen repair bill on top of the battery replacement.',
  },
  {
    question: 'My iMac will not turn on at all after load shedding. Is it the PSU?',
    answer:
      'It is the most likely cause when an iMac goes completely dead after a power restoration event — no startup chime, no fan spin, no display backlight, no indicator light. The PSU is the first thing we check. We test it with a bench power supply to determine whether the fault is a blown fuse, failed capacitors, or a damaged primary switching stage. In our experience, roughly 70% of post-load-shedding "dead iMac" cases we see in Johannesburg are PSU failures rather than logic board failures — which is good news, because PSU repair is considerably cheaper.',
  },
  {
    question: 'Do Apple Silicon iMacs (M1, M3, M4) have CMOS battery issues?',
    answer:
      'No. The 24-inch iMac with M1, M3, and M4 chips uses a non-volatile memory architecture to store RTC and firmware settings — there is no CR2032 cell on the logic board. If your M-series iMac is showing clock issues or unexpected boot behaviour, the fault is more likely a software or firmware issue rather than a hardware battery problem. That said, Apple Silicon iMacs are still susceptible to power supply damage from voltage spikes, and we have repaired several M1 iMac PSU faults in our Hyde Park workshop since 2022.',
  },
  {
    question: 'What is the SMC reset procedure for iMac, and does it help PSU issues?',
    answer:
      'The System Management Controller (SMC) on Intel iMacs governs power, thermal management, and battery/charging behaviour. Resetting it can resolve fan behaviour faults, incorrect power states, and some startup issues. The procedure on a desktop iMac is: shut down, unplug the power cable, wait 15 seconds, reconnect, wait 5 seconds, then power on. An SMC reset is worth attempting before booking a repair — it resolves roughly 10–15% of "random shutdown" and "slow to start" complaints we receive. However, it will not resolve a hardware PSU fault, a dead CMOS cell, or capacitor failure — those require physical repair.',
  },
  {
    question: 'How long does iMac PSU or CMOS battery repair take?',
    answer:
      'CMOS battery replacement typically takes 1 to 2 business days once the machine is in our workshop — most of that time is the careful display removal and resealing process. PSU component-level repair takes 2 to 4 business days depending on fault complexity and parts availability. PSU replacement (if the board cannot be repaired) takes 3 to 5 business days. We update clients via WhatsApp at every stage. Collection from Sandton, Rosebank, Fourways, Bryanston, Midrand, and Randburg is available for large-format machines like the 27-inch iMac.',
  },
];

/* ── Repair Highlights ───────────────────────────────────────────────────── */
const repairHighlights = [
  {
    title: 'CMOS Battery Diagnosis',
    desc: 'We read the firmware clock state and test voltage across the CR2032 before quoting replacement. A healthy cell reads 3.0V; anything below 2.7V is failing and will cause intermittent boot issues.',
    icon: Battery,
  },
  {
    title: 'PSU Capacitor Testing',
    desc: 'Our bench tests measure ESR (equivalent series resistance) across every primary and secondary capacitor in the PSU. Capacitors that read high ESR are failing — often before visible symptoms appear.',
    icon: Zap,
  },
  {
    title: 'Voltage Spike Assessment',
    desc: 'After every load shedding-related repair we run a full power rail test to confirm the logic board downstream of the PSU has not been damaged by the same surge event.',
    icon: AlertTriangle,
  },
  {
    title: 'Bonded Display Opening',
    desc: 'Accessing the CMOS battery or PSU requires removing the adhesive-bonded iMac display. We use a heated pad and slicing wheel to open the machine without glass damage.',
    icon: Monitor,
  },
  {
    title: 'SMC & NVRAM Reset',
    desc: 'Included with every repair: SMC and NVRAM/PRAM reset to flush any stale power management state that can persist after a PSU or CMOS fault.',
    icon: Settings,
  },
  {
    title: 'UPS Configuration Advice',
    desc: 'Every iMac PSU repair includes a written UPS recommendation sized for your specific model — 21.5-inch, 24-inch, or 27-inch. We also check your existing surge protector for rating adequacy.',
    icon: Shield,
  },
];

/* ── Pricing ─────────────────────────────────────────────────────────────── */
const pricingRows = [
  { service: 'CMOS Battery Replacement (21.5″ Intel)', from: 'R899', turnaround: '1–2 days', apple: 'N/A — Apple quotes LB replacement' },
  { service: 'CMOS Battery Replacement (27″ Intel)', from: 'R999', turnaround: '1–2 days', apple: 'N/A — Apple quotes LB replacement' },
  { service: 'PSU Capacitor Repair (21.5″)', from: 'R1,999', turnaround: '2–4 days', apple: 'R4,000–R8,000' },
  { service: 'PSU Capacitor Repair (27″)', from: 'R2,499', turnaround: '2–4 days', apple: 'R6,000–R12,000' },
  { service: 'PSU Board Replacement (21.5″)', from: 'R3,499', turnaround: '3–5 days', apple: 'R4,000–R8,000' },
  { service: 'PSU Board Replacement (27″)', from: 'R3,999', turnaround: '3–5 days', apple: 'R6,000–R12,000' },
];

/* ── Schema ──────────────────────────────────────────────────────────────── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'iMac Battery & Power Supply Repair Johannesburg',
  description:
    'iMac CMOS battery replacement and power supply repair in Johannesburg. Intel iMac CR2032 replacement from R899. PSU capacitor repair from R1,999. Load shedding damage specialists. Hyde Park workshop.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Hyde Park' },
    { '@type': 'Neighborhood', name: 'Sandton' },
    { '@type': 'Neighborhood', name: 'Rosebank' },
    { '@type': 'Neighborhood', name: 'Bryanston' },
    { '@type': 'Neighborhood', name: 'Fourways' },
  ],
  availableChannel: [
    { '@type': 'ServiceChannel', serviceUrl: 'https://wa.me/27645295863', serviceType: 'WhatsApp' },
    { '@type': 'ServiceChannel', servicePhone: '+27645295863', serviceType: 'Phone' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'iMac Battery & Power Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'iMac CMOS Battery Replacement',
          description: 'Intel iMac CR2032 CMOS/PRAM battery replacement. Resolves clock resets, boot delays, kernel panics. From R899.',
        },
        price: '899',
        priceCurrency: 'ZAR',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'iMac PSU Capacitor Repair',
          description: 'Component-level iMac power supply repair targeting failed capacitors from voltage spikes. From R1,999.',
        },
        price: '1999',
        priceCurrency: 'ZAR',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'iMac PSU Board Replacement',
          description: 'Full iMac power supply board replacement where component-level repair is not viable. From R3,499.',
        },
        price: '3499',
        priceCurrency: 'ZAR',
      },
    ],
  },
};

const faqSchema = buildFaqSchema(faqs);
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

/* ── Page ────────────────────────────────────────────────────────────────── */
export default function BatteryReplacementImacPage() {
  const whatsappUrl = buildWhatsAppUrl('BAT-IMAC-HERO', 'battery');

  return (
    <>
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <main className="bg-[#0A1A18] text-[#E8F4F1] min-h-screen">

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="hero-gradient grid-overlay pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumb items={breadcrumbItems} />
            <div className="mt-8 max-w-4xl">
              <div className="flex items-center gap-2 text-[#0FEA7A] text-sm font-medium mb-4">
                <Zap className="w-4 h-4" />
                <span>iMac Power &amp; CMOS Specialists</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
                iMac Battery &amp; Power<br />
                <span className="text-[#0FEA7A]">Supply Repair</span>
              </h1>
              <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed speakable-summary">
                The iMac has no main battery — but your Intel iMac does have a CR2032 CMOS cell that dies after 5 to 8 years, and a power supply that load shedding systematically destroys. CMOS replacement from{' '}
                <strong className="text-[#E8F4F1]">R899</strong>. PSU repair from{' '}
                <strong className="text-[#E8F4F1]">R1,999</strong>. Apple Store charges R4,000 to R12,000 — and that is if they will even attempt it.
              </p>
              <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
                <Monitor className="w-4 h-4 text-[#0FEA7A]" />
                <span>1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | Assessment from R599 | Collection across Johannesburg</span>
              </div>
              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  { icon: Shield, label: 'No Fix No Fee' },
                  { icon: Battery, label: 'CMOS from R899' },
                  { icon: Zap, label: 'PSU from R1,999' },
                  { icon: CheckCircle, label: 'Up to 3 Year Warranty' },
                  { icon: Clock, label: '1–5 Day Turnaround' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-3 py-2 rounded-full">
                    <Icon className="w-4 h-4 text-[#0FEA7A]" />
                    <span className="text-[#E8F4F1] text-sm font-medium">{label}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all"
                >
                  <Zap className="w-5 h-5" />
                  WhatsApp Us Now
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href={`tel:${CONTACT.phoneTel}`}
                  className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
                >
                  <Phone className="w-5 h-5" /> Call {CONTACT.phone}
                </a>
              </div>
              <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)]">
                {[
                  { value: '150+', label: 'iMac PSU Repairs Completed' },
                  { value: SITE.yearsExperience + ' Years', label: 'In Business Since 2009' },
                  { value: SITE.rating + '/5', label: SITE.reviewCount + ' Google Reviews' },
                  { value: 'Up to 3 Yrs', label: 'Written Warranty' },
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

        {/* ── Why iMac Power Issues Are Different ──────────────────────── */}
        <section className="py-10 sm:py-20 bg-[#111C1A]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
              The iMac Has No Main Battery — But It Has Two Power Vulnerabilities You Should Know About
            </h2>
            <div className="space-y-4 text-[#7A9E98] leading-relaxed mb-8">
              <p>
                When clients come in saying "my iMac battery needs replacing," they usually mean one of two things: the clock keeps resetting and someone online told them it is a battery problem — or the iMac went dead after a load shedding event and they assume the battery is flat. The first diagnosis is correct (it is a CMOS battery); the second is wrong in an interesting way (it is actually the power supply).
              </p>
              <p>
                Intel iMacs from 2007 through to the 2019 models contain a CR2032 coin cell on the logic board. This cell has nothing to do with running the machine — it simply keeps a small memory chip powered when the iMac is unplugged, preserving the real-time clock and certain NVRAM settings. When it dies, the symptoms are subtle at first: the clock resets to 1 January 2000 after an overnight power cut, or the machine takes an extra 30 seconds to boot while it re-validates the startup disk. Left unaddressed for long enough, a completely dead CMOS cell can cause kernel panics at startup on some logic board revisions. Replacement is straightforward once the display is open — the CR2032 sits in a standard battery holder on the logic board and swaps out in seconds.
              </p>
              <p>
                The power supply story is more significant. The iMac PSU contains a bank of electrolytic capacitors designed to smooth the AC input and absorb transient voltage spikes. Under normal UK or European grid conditions, these capacitors last 10 to 15 years. Under South African load shedding conditions — where Eskom voltage can spike by 20 to 40 volts for a fraction of a second on restoration — we see them failing in 3 to 5 years. In our Hyde Park workshop, iMac PSU repairs now account for more bench time than any other single iMac fault. The hotspot suburbs are Bryanston, Randburg, Fourways, and Midrand — areas that historically drew the longest and most frequent shedding schedules.
              </p>
              <p>
                The good news is that both faults are repairable. We do not quote logic board replacement when the actual fault is a dead CMOS cell or a blown PSU capacitor. That distinction saves our clients thousands of rand per repair.
              </p>
            </div>
          </div>
        </section>

        {/* ── Pricing Table ────────────────────────────────────────────── */}
        <section id="pricing" className="py-10 sm:py-20 bg-[#0A1A18]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">iMac Power Repair Pricing</h2>
            <p className="text-[#7A9E98] mb-8 max-w-3xl leading-relaxed">
              All prices include parts, labour, SMC reset, and an up-to-3 year warranty. Assessment from R599 — waived if you proceed with the repair. Compare with Apple Store pricing, where both CMOS and PSU faults are typically handled as a logic board replacement at R4,000 to R12,000.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-[rgba(15,234,122,0.12)]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[rgba(15,234,122,0.06)] border-b border-[rgba(15,234,122,0.12)]">
                    <th className="text-left px-5 py-4 text-[#E8F4F1] font-bold">Service</th>
                    <th className="text-left px-5 py-4 text-[#E8F4F1] font-bold">From</th>
                    <th className="text-left px-5 py-4 text-[#E8F4F1] font-bold hidden sm:table-cell">Turnaround</th>
                    <th className="text-left px-5 py-4 text-[#E8F4F1] font-bold hidden md:table-cell">Apple / iStore</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingRows.map((row, i) => (
                    <tr
                      key={row.service}
                      className={`border-b border-[rgba(255,255,255,0.04)] ${i % 2 === 0 ? 'bg-transparent' : 'bg-[rgba(255,255,255,0.02)]'}`}
                    >
                      <td className="px-5 py-4 text-[#E8F4F1] font-medium">{row.service}</td>
                      <td className="px-5 py-4 text-[#0FEA7A] font-bold">{row.from}</td>
                      <td className="px-5 py-4 text-[#7A9E98] hidden sm:table-cell">{row.turnaround}</td>
                      <td className="px-5 py-4 text-[#7A9E98] hidden md:table-cell">{row.apple}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[#7A9E98] text-xs mt-4">
              Prices are indicative. A written fixed-price quote is provided before any work begins. Assessment fee from R599 applies if the repair is declined after diagnosis.
            </p>
            <PricingNote variant="inline" />
          </div>
        </section>

        {/* ── What We Do ───────────────────────────────────────────────── */}
        <section className="py-10 sm:py-20 bg-[#111C1A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">How We Diagnose &amp; Repair iMac Power Faults</h2>
            <p className="text-[#7A9E98] mb-10 max-w-3xl leading-relaxed">
              Every iMac power repair starts with the same structured diagnostic process. We do not replace components unless the bench test confirms the fault — this is how we keep costs lower than quoting parts blindly.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {repairHighlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="glass-card p-6 rounded-2xl border border-[rgba(15,234,122,0.12)] hover:border-[rgba(15,234,122,0.25)] transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-[rgba(15,234,122,0.1)] flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-[#0FEA7A]" />
                    </div>
                    <h3 className="text-[#E8F4F1] font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-[#7A9E98] text-sm leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Technical Deep Dive ───────────────────────────────────────── */}
        <section className="py-10 sm:py-20 bg-[#0A1A18]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">
              Load Shedding &amp; iMac Power Supplies: What Actually Happens
            </h2>
            <div className="space-y-5 text-[#7A9E98] leading-relaxed">
              <p>
                The iMac power supply is a switch-mode PSU — the same fundamental architecture used in desktop computers worldwide. It rectifies the AC mains input, switches it at high frequency, and steps it down to the DC voltages the logic board requires: 12V, 5V, 3.3V, and a standby 5V rail. The primary side capacitors buffer the raw rectified DC and are rated for a specific working voltage — typically 400V to 450V for a 230V input circuit.
              </p>
              <p>
                When Eskom restores power after an outage, the supply voltage does not always return cleanly. Inductive loads (motors, compressors) on the same circuit create a brief transient that can push the line voltage to 270V or higher for a few milliseconds. This is well within the instantaneous rating of the capacitors when they are new, but the transient charges the capacitor to a higher peak voltage than its continuous design point. Over time — and after dozens of shedding cycles per month during Stage 4 and above — the capacitor dielectric degrades, its ESR rises, and it begins to dissipate energy as heat rather than storing it. The observable result is an iMac that powers on but shuts down under load, or one that simply will not start at all.
              </p>
              <p>
                We measure ESR on every capacitor in the PSU before quoting a repair. The{' '}
                <a
                  href="https://www.eskom.co.za/distribution/customer-services/protection-against-voltage-surges/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0FEA7A] underline underline-offset-2 hover:text-[#0FEA7A]/80 transition-colors"
                >
                  Eskom distribution documentation on voltage surges
                </a>{' '}
                acknowledges this risk explicitly for sensitive electronics — an iMac running without a pure sine wave UPS in South Africa is exposed to this damage mechanism every time the lights come back on.
              </p>
              <p>
                For clients who have already sustained one PSU repair, the investment in a quality UPS pays for itself within 18 months. We include a written UPS specification sheet with every iMac PSU repair — sized to the exact model, with specific product recommendations available at Incredible Connection, Takealot, and Game, all within Johannesburg.
              </p>
            </div>
          </div>
        </section>

        {/* ── Apple vs ZA Support ───────────────────────────────────────── */}
        <section className="py-10 sm:py-20 bg-[#111C1A]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">Apple Store vs ZA Support: iMac Power Repair</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="glass-card p-6 border border-red-500/20">
                <h3 className="text-red-400 font-bold mb-3">Apple Store / iStore</h3>
                <ul className="text-[#7A9E98] text-sm space-y-2">
                  <li>CMOS battery not offered as standalone service — quoted as logic board replacement</li>
                  <li>PSU fault often quoted as full logic board replacement: R4,000 to R12,000</li>
                  <li>No component-level capacitor testing — board replaced rather than repaired</li>
                  <li>Machine shipped to central depot — turnaround 5 to 10 business days</li>
                  <li>Standard 90-day repair warranty</li>
                  <li>No specific load shedding protection advice provided</li>
                </ul>
              </div>
              <div className="glass-card p-6 border border-[rgba(15,234,122,0.3)]">
                <h3 className="text-[#0FEA7A] font-bold mb-3">ZA Support</h3>
                <ul className="text-[#7A9E98] text-sm space-y-2">
                  <li>CMOS battery replacement from R899 — not quoted as a board replacement</li>
                  <li>PSU capacitor repair from R1,999 — component-level, not board-swap by default</li>
                  <li>ESR testing on every capacitor before quoting</li>
                  <li>All work in our Hyde Park workshop — your machine never leaves our hands</li>
                  <li>Up-to-3 year warranty on parts and labour</li>
                  <li>Written UPS recommendation included with every PSU repair</li>
                </ul>
              </div>
            </div>
            <div className="p-5 rounded-xl border border-[rgba(15,234,122,0.15)] bg-[rgba(15,234,122,0.04)] flex items-start gap-4">
              <Shield className="w-5 h-5 text-[#0FEA7A] flex-shrink-0 mt-0.5" />
              <p className="text-[#7A9E98] text-sm leading-relaxed">
                No Fix No Fee applies to every iMac power repair. If we complete the full assessment and the fault is beyond economic repair, you pay the assessment fee of R599 and the machine is returned exactly as received. We will tell you honestly if replacement makes more sense than repair.
              </p>
            </div>
          </div>
        </section>

        {/* ── Google Reviews ────────────────────────────────────────────── */}
        <section className="py-10 sm:py-20 bg-[#0A1A18]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">What Johannesburg Clients Say</h2>
            <Suspense fallback={<div className="text-[#7A9E98] text-sm">Loading reviews…</div>}>
              <GoogleReviews maxReviews={4} />
            </Suspense>
          </div>
        </section>

        {/* ── FAQs ──────────────────────────────────────────────────────── */}
        <section className="py-10 sm:py-20 bg-[#111C1A]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <FAQAccordion items={faqs} title="iMac Battery &amp; Power Repair — Common Questions" />
          </div>
        </section>

        {/* ── Related Services ──────────────────────────────────────────── */}
        <section className="py-8 sm:py-16 bg-[#0A1A18]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Repairs &amp; Services</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { label: 'Battery Replacement Hub', href: '/battery-replacement' },
                { label: 'iMac Repair', href: '/imac-repair' },
                { label: 'iMac Screen Repair', href: '/screen-repair/imac' },
                { label: 'iMac Logic Board Repair', href: '/logic-board-repair/imac' },
                { label: 'Logic Board Repair', href: '/logic-board-repair' },
                { label: 'MacBook Pro Battery', href: '/battery-replacement/macbook-pro' },
                { label: 'MacBook Air Battery', href: '/battery-replacement/macbook-air' },
                { label: 'Contact Us', href: '/contact' },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="glass-card p-4 text-center group">
                  <span className="text-[#E8F4F1] text-sm font-semibold group-hover:text-[#0FEA7A] transition-colors">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ────────────────────────────────────────────────── */}
        <section className="py-8 sm:py-16 bg-[#111C1A]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
                iMac Not Starting After Load Shedding? Get a Diagnosis Today.
              </h2>
              <p className="text-[#7A9E98] mb-6 max-w-xl mx-auto leading-relaxed">
                CMOS battery from R899. PSU repair from R1,999. Assessment from R599 — waived if you proceed. No Fix No Fee. WhatsApp us a description of the fault and we will give you an indicative price within the hour.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all"
                >
                  <Zap className="w-5 h-5" />
                  WhatsApp Us Now
                  <ArrowRight className="w-5 h-5" />
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

      </main>
    </>
  );
}
