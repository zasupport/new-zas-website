import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Monitor, AlertTriangle, CheckCircle, Shield, Zap, Eye, MapPin, Cpu } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildBreadcrumbSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import GoogleReviews from '@/components/ui/GoogleReviews';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, SITE, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Pro 13 Inch Screen Repair Johannesburg [2026] | From R3,499 | ZA Support',
  description:
    'MacBook Pro 13-inch screen repair in Johannesburg from R3,499. Retina IPS LCD specialists. M1, M2, Intel. Backlight IC, display cable. No Fix No Fee. Hyde Park.',
  alternates: { canonical: 'https://zasupport.com/screen-repair/macbook-pro-13-inch' },
  keywords: [
    'MacBook Pro 13 inch screen repair Johannesburg',
    'MacBook Pro 13 inch display replacement Johannesburg',
    'MacBook Pro 13 Retina screen repair',
    'MacBook Pro 13 cracked screen Johannesburg',
    'MacBook Pro 13 inch backlight repair Johannesburg',
    'MacBook Pro 13 screen repair Hyde Park',
    'MacBook Pro M1 13 inch screen repair',
    'MacBook Pro M2 13 inch screen repair',
    'MacBook Pro 13 inch display cable fault',
    'MacBook Pro Intel 13 inch screen repair',
    'MacBook Pro A2338 screen repair Johannesburg',
    'MacBook Pro 13 inch Retina display repair South Africa',
  ],
};

const breadcrumbItems = [
  { label: 'Screen Repair', href: '/screen-repair' },
  { label: 'MacBook Pro', href: '/screen-repair/macbook-pro' },
  { label: 'MacBook Pro 13 Inch' },
];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Screen Repair', url: 'https://zasupport.com/screen-repair' },
  { name: 'MacBook Pro Screen Repair', url: 'https://zasupport.com/screen-repair/macbook-pro' },
  { name: 'MacBook Pro 13 Inch', url: 'https://zasupport.com/screen-repair/macbook-pro-13-inch' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Pro 13 Inch Screen Repair Johannesburg',
  description:
    'Professional MacBook Pro 13-inch screen repair in Johannesburg. Retina IPS LCD display replacement for M1, M2, and Intel models. Display cable fault, backlight driver IC repair, True Tone preservation. Assessment from R599. Up-to-3 year warranty.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Hyde Park' },
    { '@type': 'Neighborhood', name: 'Sandton' },
    { '@type': 'Neighborhood', name: 'Rosebank' },
    { '@type': 'Neighborhood', name: 'Bryanston' },
    { '@type': 'Neighborhood', name: 'Fourways' },
  ],
  serviceType: 'Screen Repair',
  availableChannel: [
    { '@type': 'ServiceChannel', serviceUrl: 'https://wa.me/27645295863', serviceType: 'WhatsApp' },
    { '@type': 'ServiceChannel', servicePhone: '+27645295863', serviceType: 'Phone' },
  ],
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: '3499',
    highPrice: '6499',
    priceCurrency: 'ZAR',
    offerCount: '5',
  },
};

const pricingRows = [
  {
    model: 'MacBook Pro 13″ M2 (A2338, 2022)',
    panel: 'Retina IPS LCD (2560 × 1600, 227 ppi), True Tone',
    from: 'R3,999',
    turnaround: '48–72 hrs',
  },
  {
    model: 'MacBook Pro 13″ M1 (A2338, 2020)',
    panel: 'Retina IPS LCD (2560 × 1600, 227 ppi), True Tone',
    from: 'R3,999',
    turnaround: '48–72 hrs',
  },
  {
    model: 'MacBook Pro 13″ Intel (A2289/A2251, 2020)',
    panel: 'Retina IPS LCD (2560 × 1600, 227 ppi), Touch Bar',
    from: 'R3,499',
    turnaround: '48–72 hrs',
  },
  {
    model: 'MacBook Pro 13″ Intel (A1989/A1706, 2016–2019)',
    panel: 'Retina IPS LCD (2560 × 1600, 227 ppi)',
    from: 'R3,499',
    turnaround: '48–72 hrs',
  },
  {
    model: 'MacBook Pro 13″ — display cable / backlight IC only',
    panel: 'Component-level backlight driver or flex cable repair',
    from: 'R1,499',
    turnaround: '24–48 hrs',
  },
];

const faultTypes = [
  {
    title: 'Backlight Driver IC Failure — Load Shedding Surge Damage',
    icon: Zap,
    desc: 'Load shedding is the leading cause of MacBook Pro 13-inch backlight failure we see across Johannesburg. The 13-inch models from the M1 and M2 generation use a 61 W USB-C power adapter, and clients in Sandton, Fourways, Bryanston, and Midrand frequently leave the machine plugged in overnight. When Eskom restores power after a stage-4 or stage-6 outage, the inrush voltage spike travels through the USB-C charger onto the backlight power rail. The backlight driver IC — a small surface-mounted component on the logic board — absorbs the surge and fails. The result is a MacBook Pro 13 that boots normally, with keyboard backlight and external display working correctly, but with a completely dark built-in screen. We repair the backlight driver IC at component level from R1,499 — no logic board replacement required.',
    severity: 'high',
  },
  {
    title: 'Cracked Retina IPS LCD Panel — Physical Impact',
    icon: AlertTriangle,
    desc: 'The MacBook Pro 13-inch display assembly is a laminated unit — the glass, IPS LCD panel, and backlight diffuser are bonded together without a separately replaceable outer glass layer. A corner drop onto concrete or tile, a hard object caught between the keyboard and screen when the lid is closed, or a direct impact against the display face is enough to crack the panel. We have seen cracked 13-inch screens from clients in Rosebank, Northcliff, Pretoria, and Centurion — typically laptops carried without a padded sleeve. The full display assembly must be sourced and replaced as a unit. We verify colour accuracy, brightness uniformity, and True Tone operation before returning the machine from our Hyde Park workshop.',
    severity: 'high',
  },
  {
    title: 'Display Flex Cable Failure — Hinge Wear',
    icon: Monitor,
    desc: 'The MacBook Pro 13-inch display flex cable routes through the hinge assembly between the logic board and the display panel. In machines used on a desk where the lid is opened and closed frequently — medical practices, legal firms, and accountancy offices in Sandton and Rosebank are common examples — the cable develops micro-fractures from repeated flexing at the hinge. The symptom is a display that flickers or goes dark at specific hinge angles but works correctly when held still. The diagnostic is simple: slowly open and close the lid while watching the screen. If the symptom tracks with hinge position, the cable is the likely cause. A cable-only repair costs significantly less than a full display assembly and is our first recommendation when the panel is otherwise undamaged.',
    severity: 'high',
  },
  {
    title: 'Stage-Light Flexgate Effect — Flex Cable Delamination',
    icon: AlertTriangle,
    desc: 'A known failure mode on MacBook Pro 13-inch Intel models from 2016 to 2019 — in particular the A1706 and A1989 — is the so-called Flexgate fault. The display backlight flex cable on these machines is unusually short and subject to stress fatigue near the hinge pivot point. In our Hyde Park workshop we have seen this manifest as a narrow strip of light at the bottom of the display when the lid is near-closed — a visual effect described as a stage spotlight or torch beam along the bottom edge — or as a full backlight failure. This is a design-specific fault, not the result of misuse, and it affects some machines that have never been dropped. The repair involves replacing the display cable assembly; we quote the exact cost after confirming the model year and serial number.',
    severity: 'medium',
  },
  {
    title: 'True Tone Loss After Incorrect Replacement (M1 and M2)',
    icon: Eye,
    desc: 'MacBook Pro 13-inch models with the M1 and M2 chip store True Tone calibration data within the display assembly, matched to that specific panel at the factory. When a screen replacement is performed without transferring this calibration data — which requires specific tooling and procedural knowledge — True Tone becomes permanently unavailable, appearing as greyed out in System Settings. We include True Tone calibration data transfer in every M1 and M2 13-inch display replacement as standard practice. Clients who have had the repair done elsewhere and are now missing True Tone can bring the machine in; in most cases we can restore the feature if the serial number is still intact in the display assembly.',
    severity: 'medium',
  },
  {
    title: 'Discolouration and Staining — Liquid Ingress Through Keyboard',
    icon: Monitor,
    desc: 'MacBook Pro 13-inch models — including the A2338 M1 and M2 variants — route ventilation and keyboard openings in a way that allows liquid to reach the display assembly if a drink is spilled onto the keyboard. We have seen clients in Bryanston and Morningside present MacBook Pro 13-inch machines where coffee, tea, or water has migrated to the display cable connectors or reached the edge of the display panel, causing yellow or brown staining in the lower corner of the screen. Depending on severity, this may be repairable at component level (cable cleaning and connector inspection) or may require a full display assembly replacement. Our assessment identifies the extent of contamination before we quote.',
    severity: 'medium',
  },
];

const severityColours: Record<string, string> = {
  high: 'border-[rgba(245,87,54,0.25)] bg-[rgba(245,87,54,0.04)]',
  medium: 'border-[rgba(245,166,35,0.25)] bg-[rgba(245,166,35,0.04)]',
  low: 'border-[rgba(15,234,122,0.2)] bg-[rgba(15,234,122,0.04)]',
};

const severityBadgeColours: Record<string, string> = {
  high: 'text-[#F55736] bg-[rgba(245,87,54,0.1)]',
  medium: 'text-[#F5A623] bg-[rgba(245,166,35,0.1)]',
  low: 'text-[#0FEA7A] bg-[rgba(15,234,122,0.1)]',
};

const severityLabels: Record<string, string> = {
  high: 'Common',
  medium: 'Moderate',
  low: 'Minor',
};

const faqs = [
  {
    question: 'How much does MacBook Pro 13-inch screen repair cost in Johannesburg?',
    answer:
      'MacBook Pro 13-inch screen repair at ZA Support starts from R3,999 for M1 and M2 models (A2338) and from R3,499 for Intel models (A2289, A2251, A1989, A1706). Component-level repairs — backlight driver IC or display cable — start from R1,499. The Apple Store and iStore charge R8,000 to R14,000 for MacBook Pro 13-inch display swaps. We carry out a component-level diagnostic first to avoid recommending a full assembly replacement when only a cable or IC is at fault. A written fixed-price quote is provided after the assessment before any work begins.',
  },
  {
    question: 'My MacBook Pro 13-inch screen is black but the Mac is on. What is the cause?',
    answer:
      'The most likely cause is backlight driver IC failure. To confirm: in a dark room, hold a torch against the display at a low angle. If you can faintly see the desktop or menu bar, the M1, M2, or Intel chip is functioning normally — only the backlight circuit has failed. In Johannesburg, the most common trigger is a load shedding voltage surge through the USB-C charger damaging the backlight IC on the logic board. We repair this at component level from R1,499 — no display assembly replacement required. If you see nothing under torchlight, the fault may be in the panel, the display cable, or deeper in the logic board — our assessment identifies the exact cause.',
  },
  {
    question: 'What is the Flexgate fault on MacBook Pro 13-inch and do you repair it?',
    answer:
      'Flexgate refers to a display cable failure found primarily in MacBook Pro 13-inch Intel models from 2016 to 2019 (A1706 and A1989). The display backlight flex cable on these machines is too short and cracks near the hinge pivot after repeated lid opening and closing. The visual symptom is a narrow band of light along the bottom edge of the screen when the lid is partially closed, or a full backlight failure. Yes, we repair this fault — we replace the display cable assembly. Bring your machine in or contact us on WhatsApp with your serial number and we will confirm the exact repair cost.',
  },
  {
    question: 'Does MacBook Pro 13-inch M1 and M2 screen replacement preserve True Tone?',
    answer:
      'Only if the replacement is performed with the correct procedure. True Tone on M1 and M2 MacBook Pro 13-inch models stores calibration data inside the display assembly, matched to that panel at the factory. Replacing the display without transferring this data permanently disables True Tone — it will show greyed out in System Settings. At ZA Support, True Tone calibration data transfer is included as standard in every M1 and M2 13-inch display replacement. Your machine will show True Tone as active and functioning after leaving our Hyde Park workshop.',
  },
  {
    question: 'How long does MacBook Pro 13-inch screen repair take?',
    answer:
      'MacBook Pro 13-inch screen repairs typically take 48 to 72 hours from drop-off, accounting for parts sourcing, the replacement procedure, and post-repair calibration checks. Component-level repairs — backlight IC or display cable — are usually complete within 24 to 48 hours. We confirm the exact turnaround at assessment. Collection and return is available for clients in Sandton, Rosebank, Bryanston, Fourways, Midrand, and Randburg.',
  },
  {
    question: 'Is it worth repairing a cracked MacBook Pro 13-inch M1 or M2 screen?',
    answer:
      'In the majority of cases, yes. MacBook Pro 13-inch M1 and M2 machines still receive full macOS feature updates and will do so for several more years. A MacBook Pro M2 13-inch in good condition sells for R16,000 to R24,000 on the South African used market. Our display assembly replacement starts from R3,999 — roughly 17 to 25% of replacement value. We will tell you honestly at assessment if the repair cost does not make financial sense, but this is uncommon. Intel models from 2019 onwards also retain strong resale value and are worth repairing over purchasing new.',
  },
  {
    question: 'Can load shedding damage the MacBook Pro 13-inch screen?',
    answer:
      'Yes, and we see this regularly in Johannesburg. MacBook Pro 13-inch models use a 61 W USB-C power adapter, and many clients in Sandton, Fourways, and Bryanston leave the machine plugged in overnight. When Eskom restores power after a stage-4 or stage-6 outage, the inrush voltage spike reaches the backlight driver IC on the logic board through the USB-C charger. The symptom is a completely dark built-in display on a machine that otherwise works normally, including keyboard backlight and external display output. We repair this at component level from R1,499. A quality UPS with true sine wave output prevents this fault entirely.',
  },
  {
    question: 'My MacBook Pro 13-inch screen flickers when I open the lid. Is it the cable or the panel?',
    answer:
      'Flickering that correlates with the hinge angle — worse at certain lid positions, fine at others — almost always indicates a display flex cable fault rather than a panel failure. This is especially common in A1706 and A1989 Intel models where the original cable is too short. Flickering that is random and does not track with hinge position is more likely the backlight driver circuit or the display panel itself. We diagnose both scenarios during the assessment before recommending a repair path.',
  },
  {
    question: 'Do you repair MacBook Pro 13-inch Intel Touch Bar screens?',
    answer:
      'Yes. We repair all MacBook Pro 13-inch Intel models including Touch Bar variants (A1706, A1989, A2289, A2251). The Touch Bar itself is separate from the main Retina display assembly and is rarely affected by a display cable or panel replacement. We inspect the Touch Bar during the assessment and flag any issues before the repair begins. If the Touch Bar has been damaged in addition to the main display, we quote both separately so you can make an informed decision.',
  },
  {
    question: 'Does ZA Support repair MacBook Pro 13-inch screens for insurance claims?',
    answer:
      'Yes. We issue a detailed repair quote and job card describing the fault, parts replaced, and labour performed — all the documentation your insurer requires. We are a VAT-registered business and can provide a formal tax invoice. We have completed insurance claim repairs for clients with Discovery Insure, Outsurance, and Momentum in Johannesburg, Sandton, and Pretoria. Contact us on WhatsApp with your claim reference number and serial number and we will coordinate throughout the process.',
  },
  {
    question: 'What is the difference between the MacBook Pro 13-inch M1 and M2 display?',
    answer:
      'The MacBook Pro 13-inch M1 (A2338, 2020) and M2 (A2338, 2022) both use the same Retina IPS LCD display specification: 2560 × 1600 pixels at 227 ppi, with True Tone, P3 wide colour, and 500 nits brightness. They share the same model number (A2338) and the display assemblies are mechanically identical. However, the True Tone calibration data is specific to each individual panel, so the transfer procedure is required on both. The Intel 13-inch models (A1706, A1989, A2289, A2251) use the same Retina IPS panel specification but differ in chassis design and do not include True Tone on pre-2018 variants.',
  },
];

const faqSchema = buildFaqSchema(faqs);
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

export default function ScreenRepairMacBookPro13InchPage() {
  const whatsappUrl = buildWhatsAppUrl('SCR-MBP-13-HERO', 'screen-repair');

  return (
    <>
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      {/* Hero */}
      <section className="hero-gradient grid-overlay pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Pro 13 Inch Screen Repair
              <br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              We repair MacBook Pro 13-inch Retina displays across all generations — M1, M2, and Intel. Cracked panels, backlight driver IC damage from load shedding, display cable faults, and the Flexgate flex cable failure on 2016–2019 Intel models. Assessment from R599, repairs from R1,499, from our Hyde Park workshop.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | M1/M2 from R3,999 | Intel from R3,499</span>
            </div>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Shield, label: 'No Fix No Fee' },
                { icon: Cpu, label: 'M1, M2 & Intel Specialists' },
                { icon: Eye, label: 'True Tone Preserved (M1/M2)' },
                { icon: CheckCircle, label: 'Up to 3 Year Warranty' },
                { icon: Zap, label: 'Assessment from R599' },
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
                WhatsApp for a Quote
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link
                href="/screen-repair/macbook-pro"
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all"
              >
                All MacBook Pro Screens <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)]">
              {[
                { value: '300+', label: 'MacBook Pro 13" Screens Repaired' },
                { value: SITE.yearsExperience + ' Years', label: 'In Business Since 2009' },
                { value: SITE.rating + '/5', label: SITE.reviewCount + ' Google Reviews' },
                { value: 'Up to 3 Yrs', label: 'Repair Warranty' },
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

      {/* Pricing Table */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro 13 Inch Screen Repair Pricing</h2>
          <p className="text-[#7A9E98] mb-8 max-w-3xl leading-relaxed">
            Prices below are starting prices including the display assembly or component repair, labour, and our warranty. The Apple Store and iStore charge R8,000 to R14,000 for MacBook Pro 13-inch display swaps — we perform a component-level diagnostic first to avoid unnecessary part replacements and reduce the cost wherever possible.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-[rgba(255,255,255,0.06)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.08)] bg-[rgba(15,234,122,0.06)]">
                  <th className="text-left text-[#E8F4F1] font-semibold px-5 py-4">Repair Type</th>
                  <th className="text-left text-[#E8F4F1] font-semibold px-5 py-4">Component</th>
                  <th className="text-left text-[#0FEA7A] font-semibold px-5 py-4">From</th>
                  <th className="text-left text-[#E8F4F1] font-semibold px-5 py-4">Turnaround</th>
                </tr>
              </thead>
              <tbody>
                {pricingRows.map((row, i) => (
                  <tr key={row.model} className={`border-b border-[rgba(255,255,255,0.04)] ${i % 2 === 0 ? 'bg-[#0A1A18]' : 'bg-[#111C1A]'}`}>
                    <td className="text-[#E8F4F1] px-5 py-4 font-medium">{row.model}</td>
                    <td className="text-[#7A9E98] px-5 py-4">{row.panel}</td>
                    <td className="text-[#0FEA7A] px-5 py-4 font-bold">{row.from}</td>
                    <td className="text-[#7A9E98] px-5 py-4">{row.turnaround}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[#7A9E98] text-xs mt-4">
            All prices include parts, labour, and our up-to-3 year warranty. Assessment from R599 — applied toward the repair cost if you proceed. No Fix No Fee applies on all cases.
          </p>
        </div>
      </section>

      {/* Technical Expertise */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">What Makes MacBook Pro 13 Inch Screen Repair Distinct</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              The MacBook Pro 13-inch occupies a specific and important position in Apple&apos;s history: it was the last form factor to use a traditional IPS LCD Retina display before Apple retired the 13-inch MagSafe MacBook Pro entirely with the M3 generation in October 2023. Every MacBook Pro 13-inch — from the 2016 Touch Bar Intel models through to the 2022 M2 (A2338) — uses a 2560 × 1600 Retina IPS LCD display at 227 ppi with 500 nits brightness and P3 wide colour. In our Hyde Park workshop we work across all of these generations. The distinction matters for parts compatibility: the A2338 chassis used for both M1 and M2 shares a display assembly, while the Intel models across A1706, A1989, A2289, and A2251 each have slightly different chassis tolerances that affect sourcing.
            </p>
            <p>
              Unlike the MacBook Pro M3 — which uses a Liquid Retina XDR mini-LED display — the 13-inch Retina IPS LCD uses a traditional edge-lit LED backlight array. This means the backlight driver architecture differs substantially, and the failure modes differ accordingly. The backlight driver IC on the 13-inch logic board is a discrete component that we can repair at component level in the majority of load-shedding surge cases. We have seen consistent patterns in M1 and M2 13-inch machines from Sandton and Midrand where stage-6 outages in late 2023 and early 2024 caused widespread backlight IC damage through USB-C power adapters left plugged in overnight.
            </p>
            <p>
              The display flex cable routing is a significant point of differentiation between Intel generations. Apple engineers shortened the display cable on the 2016–2019 MacBook Pro models — A1706 and A1989 — to the point where the cable experiences mechanical stress fatigue after several hundred hinge cycles. This produced the well-documented Flexgate fault: a stage-light effect visible as a bright strip at the bottom of the screen when the lid is held near-closed, or in more advanced cases, a total backlight failure. Apple extended the warranty coverage for affected machines, but that coverage has now expired for most of the affected population. We repair this fault at cable level in our workshop, and we see several cases per month from clients across Johannesburg who were unaware that a documented design issue is the cause.
            </p>
            <p>
              True Tone on the MacBook Pro 13-inch M1 and M2 stores calibration data within the display assembly, tied to that specific panel at the factory. According to{' '}
              <a
                href="https://support.apple.com/en-gb/102869"
                className="text-[#0FEA7A] hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apple&apos;s display service documentation
              </a>
              , transferring this calibration data during a screen replacement is a mandatory step for preserving True Tone after a repair. It is also one of the most commonly skipped steps in workshops without the correct tooling. At ZA Support, we perform this transfer as standard on every M1 and M2 13-inch display replacement — your machine will show True Tone as active in System Settings after the repair.
            </p>
            <p>
              Load shedding remains the single largest preventable cause of MacBook Pro 13-inch screen repairs we handle in Johannesburg. The 61 W USB-C power adapter provides a direct conductive path from the mains supply to the backlight driver IC on the logic board. When Eskom restores power after an outage, the brief inrush voltage spike — which a quality UPS with true sine wave output absorbs silently — travels onto the backlight rail and can destroy the IC in under a millisecond. The machine appears to boot normally in every other respect. We have repaired this fault on machines as new as four months old from clients who had no idea load shedding could damage a plugged-in laptop screen. A UPS with a true sine wave inverter, not a standby surge protector, eliminates this risk entirely.
            </p>
          </div>
        </div>
      </section>

      {/* Fault Types */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro 13 Inch Display Fault Types</h2>
          <p className="text-[#7A9E98] mb-8 max-w-3xl">
            These are the display faults we see most frequently on MacBook Pro 13-inch machines from clients across Johannesburg, Sandton, Pretoria, and surrounding areas.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {faultTypes.map((fault) => {
              const Icon = fault.icon;
              return (
                <div
                  key={fault.title}
                  className={`rounded-2xl border p-6 ${severityColours[fault.severity]}`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-[rgba(15,234,122,0.08)] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[#0FEA7A]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-[#E8F4F1] font-semibold text-sm leading-tight">{fault.title}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${severityBadgeColours[fault.severity]}`}>
                          {severityLabels[fault.severity]}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-[#7A9E98] text-sm leading-relaxed">{fault.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-8">Our MacBook Pro 13 Inch Screen Repair Process</h2>
          <div className="space-y-6">
            {[
              {
                step: '01',
                title: 'Assessment (30–60 minutes)',
                desc: 'We open the MacBook Pro 13-inch and systematically isolate the fault across the display assembly, display flex cable, backlight driver IC, and display connector on the logic board. We use a thermal camera to identify components running outside specification. For Intel models, we check for Flexgate cable fatigue at the hinge pivot point. The assessment costs from R599 and is applied toward the repair if you proceed.',
              },
              {
                step: '02',
                title: 'Fixed-Price Written Quote',
                desc: 'After assessment we provide a written fixed-price quote by WhatsApp and email. The quote includes parts, labour, and the warranty period — no hidden costs. We explain precisely what we found, what we will replace or repair, and why. If the repair is not economically viable for your machine and fault combination, we say so clearly at this stage.',
              },
              {
                step: '03',
                title: 'Component-Level Repair or Assembly Replacement',
                desc: 'Where possible we repair at component level — backlight driver IC, display cable, or Flexgate cable replacement — to avoid sourcing a full display assembly unnecessarily. Where the panel is cracked or the assembly is beyond component repair, we source a matched replacement assembly for your exact model number and confirm chip generation before placing the order.',
              },
              {
                step: '04',
                title: 'Post-Repair Calibration',
                desc: 'Every 13-inch screen repair concludes with our calibration checklist: brightness uniformity test, colour accuracy verification, True Tone data transfer and confirmation in System Settings (M1 and M2 models), and a 30-minute stability run to confirm no thermal or intermittent faults. We return the machine only after all checks pass.',
              },
              {
                step: '05',
                title: 'Warranty and Collection',
                desc: 'All MacBook Pro 13-inch screen repairs include our up-to-3 year warranty covering the parts and labour performed. We document the repair with a formal job card and can provide a VAT invoice for insurance claims. Collection and return is available for clients in Sandton, Rosebank, Bryanston, Fourways, Midrand, and Randburg.',
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-5">
                <div className="w-12 h-12 rounded-full bg-[rgba(15,234,122,0.1)] border border-[rgba(15,234,122,0.2)] flex items-center justify-center flex-shrink-0">
                  <span className="text-[#0FEA7A] font-bold text-sm">{step}</span>
                </div>
                <div>
                  <h3 className="text-[#E8F4F1] font-semibold mb-1">{title}</h3>
                  <p className="text-[#7A9E98] leading-relaxed text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#E8F4F1] mb-6">Related MacBook Pro 13 Inch Repair Services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { href: '/screen-repair', label: 'Screen Repair Hub', desc: 'All Mac and iPhone screen repairs' },
              { href: '/screen-repair/macbook-pro', label: 'MacBook Pro Screen Repair', desc: 'All MacBook Pro models' },
              { href: '/screen-repair/macbook-pro-m1', label: 'MacBook Pro M1 Screen', desc: 'M1 and M1 Pro/Max display repairs' },
              { href: '/screen-repair/macbook-pro-m2', label: 'MacBook Pro M2 Screen', desc: 'M2 13, 14, and 16-inch display repairs' },
              { href: '/logic-board-repair/macbook-pro', label: 'MacBook Pro Logic Board', desc: 'All MacBook Pro board-level repairs' },
              { href: '/liquid-damage/macbook-pro', label: 'MacBook Pro Liquid Damage', desc: 'Board-level liquid damage recovery' },
              { href: '/logic-board-repair', label: 'Logic Board Repair Hub', desc: 'All Mac logic board repairs' },
              { href: '/screen-repair/macbook-air', label: 'MacBook Air Screen Repair', desc: 'MacBook Air display replacement' },
            ].map(({ href, label, desc }) => (
              <Link
                key={href}
                href={href}
                className="group p-4 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#0A1A18] hover:border-[rgba(15,234,122,0.2)] hover:bg-[rgba(15,234,122,0.03)] transition-all"
              >
                <p className="text-[#E8F4F1] font-semibold text-sm mb-1 group-hover:text-[#0FEA7A] transition-colors">{label}</p>
                <p className="text-[#7A9E98] text-xs">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#E8F4F1] mb-8">What Johannesburg Clients Say</h2>
          <GoogleReviews />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-8">MacBook Pro 13 Inch Screen Repair — Frequently Asked Questions</h2>
          <FAQAccordion items={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0A1A18] border-t border-[rgba(255,255,255,0.06)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
            MacBook Pro 13 Inch Screen Cracked or Dark?
          </h2>
          <p className="text-[#7A9E98] text-lg mb-8 leading-relaxed">
            Send us your serial number on WhatsApp for a same-day quote. Assessment from R599 — applied toward repair if you proceed. No Fix No Fee on every job.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={buildWhatsAppUrl('SCR-MBP-13-CTA', 'screen-repair')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all"
            >
              WhatsApp for a Quote
            </a>
            <a
              href={`tel:${CONTACT.phoneTel}`}
              className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
            >
              <Phone className="w-5 h-5" /> Call {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
