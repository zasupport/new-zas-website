import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Monitor, AlertTriangle, CheckCircle, Shield, Zap, Eye, MapPin, Cpu } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildBreadcrumbSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import GoogleReviews from '@/components/ui/GoogleReviews';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, SITE, buildWhatsAppUrl } from '@/lib/constants';
import PricingNote from '@/components/PricingNote';

export const metadata: Metadata = {
  title: 'MacBook Pro M3 Screen Repair Johannesburg [2026] | From R5,799 | ZA Support',
  description:
    'MacBook Pro M3 screen repair in Johannesburg from R5,799. Liquid Retina XDR mini-LED specialists. ProMotion, True Tone, backlight IC. No Fix No Fee. Hyde Park workshop.',
  alternates: { canonical: 'https://zasupport.com/screen-repair/macbook-pro-m3' },
  keywords: [
    'MacBook Pro M3 screen repair Johannesburg',
    'MacBook Pro M3 display replacement Johannesburg',
    'MacBook Pro M3 Liquid Retina XDR repair',
    'MacBook Pro M3 cracked screen Johannesburg',
    'MacBook Pro M3 backlight repair Johannesburg',
    'MacBook Pro M3 screen repair Hyde Park',
    'MacBook Pro M3 display cable fault',
    'MacBook Pro M3 True Tone screen repair',
    'MacBook Pro 14 inch M3 screen repair',
    'MacBook Pro 16 inch M3 screen repair',
    'Apple M3 MacBook screen repair Johannesburg',
    'Liquid Retina XDR screen repair Johannesburg',
  ],
};

const breadcrumbItems = [
  { label: 'Screen Repair', href: '/screen-repair' },
  { label: 'MacBook Pro', href: '/screen-repair/macbook-pro' },
  { label: 'MacBook Pro M3' },
];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Screen Repair', url: 'https://zasupport.com/screen-repair' },
  { name: 'MacBook Pro Screen Repair', url: 'https://zasupport.com/screen-repair/macbook-pro' },
  { name: 'MacBook Pro M3', url: 'https://zasupport.com/screen-repair/macbook-pro-m3' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Pro M3 Screen Repair Johannesburg',
  description:
    'Professional MacBook Pro M3 screen repair in Johannesburg. Liquid Retina XDR mini-LED display replacement, display cable fault, backlight driver IC repair, True Tone preservation, ProMotion 120 Hz. Assessment from R599. Up-to-3 year warranty.',
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
    lowPrice: '5799',
    highPrice: '8999',
    priceCurrency: 'ZAR',
    offerCount: '4',
  },
};

const pricingRows = [
  {
    model: 'MacBook Pro 14″ M3 (A2992, 2023)',
    panel: 'Liquid Retina XDR mini-LED (3024 × 1964, 254 ppi)',
    from: 'R5,799',
    turnaround: '48–72 hrs',
  },
  {
    model: 'MacBook Pro 14″ M3 Pro / M3 Max (A2991, 2023)',
    panel: 'Liquid Retina XDR mini-LED (3024 × 1964, 254 ppi)',
    from: 'R5,799',
    turnaround: '48–72 hrs',
  },
  {
    model: 'MacBook Pro 16″ M3 Pro / M3 Max (A2991, 2023)',
    panel: 'Liquid Retina XDR mini-LED (3456 × 2234, 254 ppi)',
    from: 'R7,499',
    turnaround: '48–72 hrs',
  },
  {
    model: 'MacBook Pro M3 — display cable / backlight IC only',
    panel: 'Component-level backlight driver or cable repair',
    from: 'R1,999',
    turnaround: '24–48 hrs',
  },
];

const faultTypes = [
  {
    title: 'Liquid Retina XDR Mini-LED Local Dimming Failure',
    icon: Monitor,
    desc: 'Every MacBook Pro M3 — including the base M3 — uses a Liquid Retina XDR mini-LED display. Unlike the M2 generation, which retained an IPS LCD for the 13-inch model, all M3 MacBook Pro configurations ship with the full XDR panel: over 10,000 individual LEDs organised into local dimming zones delivering 1,000 nits sustained and 1,600 nits peak brightness. In our Hyde Park workshop we have seen M3 mini-LED zone failures that produce small dark patches or uneven brightness areas — particularly visible in high-contrast content such as dark-mode interfaces with bright text. These symptoms are distinct from a cracked panel and can in some cases be addressed at component level, significantly reducing the cost of repair compared to sourcing a full display assembly.',
    severity: 'high',
  },
  {
    title: 'Backlight Driver IC Failure — Load Shedding Surge Damage',
    icon: Zap,
    desc: 'Load shedding continues to be the leading cause of MacBook Pro M3 backlight failure in Johannesburg. The MacBook Pro M3 ships with a 70 W or 140 W USB-C power adapter, and many clients in Sandton, Fourways, Bryanston, and Midrand leave the machine plugged in overnight. When Eskom restores power after a stage-4 or stage-6 outage, the inrush voltage spike travels through the charger and onto the backlight power rail, where it can destroy the backlight driver IC on the logic board. The result is a MacBook Pro M3 that boots normally — you can hear the chime, the fans may spin, and an external display works — but the built-in screen is completely dark. We repair the backlight driver IC at component level from R1,999, without replacing the logic board or the display assembly.',
    severity: 'high',
  },
  {
    title: 'Cracked Liquid Retina XDR Panel — Physical Impact',
    icon: AlertTriangle,
    desc: 'The MacBook Pro M3 display assembly is a single laminated unit — panel, mini-LED backlight array, and display housing are bonded together with no separately replaceable protective glass. A single corner drop, a hard object caught between the keyboard and display when the lid closes, or a direct strike to the face of the screen is sufficient to crack the panel. The full assembly must be sourced and replaced as a unit. We test every M3 replacement assembly across a comprehensive calibration checklist before the machine leaves our Hyde Park workshop, including verification of ProMotion adaptive refresh, True Tone white-point accuracy, and local dimming zone uniformity. We have seen cracked M3 displays from clients in Rosebank, Northcliff, and Pretoria — typically from bags without a dedicated padded sleeve.',
    severity: 'high',
  },
  {
    title: 'ProMotion 120 Hz Adaptive Refresh Not Functioning After Replacement',
    icon: Cpu,
    desc: 'ProMotion is present on every MacBook Pro M3 display — 14-inch and 16-inch alike — scaling between 24 Hz and 120 Hz depending on the content being rendered. After a screen replacement performed without the correct calibration procedure, ProMotion can lock at 60 Hz or fail to engage the higher refresh rates at all. We encounter this fairly regularly in MacBook Pro M3 machines that have been through a previous repair at an unauthorised workshop. At ZA Support, ProMotion verification is part of our standard post-repair quality checklist for every M3 display swap: we use a high-speed camera test alongside system diagnostics to confirm the full 24–120 Hz range is active before the machine is returned to the client.',
    severity: 'medium',
  },
  {
    title: 'True Tone Calibration Loss After Incorrect Replacement',
    icon: Eye,
    desc: 'MacBook Pro M3 models store True Tone calibration data in the display assembly. This per-unit data encodes the factory-measured spectral output of the specific panel, enabling the ambient light sensor to adjust the display white point accurately in different lighting conditions. When a display is replaced without transferring this calibration data — which requires specific tooling and procedure knowledge — True Tone becomes permanently unavailable, showing as greyed out in System Settings. We include True Tone calibration data transfer in every M3 display replacement as standard practice. Your MacBook Pro M3 will show True Tone as active and functioning after it leaves our workshop.',
    severity: 'medium',
  },
  {
    title: 'Display Flex Cable Failure — Hinge Routing Damage',
    icon: AlertTriangle,
    desc: 'The MacBook Pro M3 routes the display flex cable through the hinge assembly in a path that is subject to gradual wear from repeated opening and closing cycles. In machines used in a desk environment where the lid is opened and closed many times per day — common in medical practices and law firms where we see a disproportionate number of these cases — the cable can develop micro-fractures that cause intermittent display flickering or a full blackout at specific hinge angles. The diagnostic is straightforward: slowly open and close the lid while watching the screen. If the symptom tracks with hinge angle, the cable is the likely cause. A cable replacement costs significantly less than a full display assembly swap and is our first recommendation when the panel itself is undamaged.',
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
    question: 'How much does MacBook Pro M3 screen repair cost in Johannesburg?',
    answer:
      'MacBook Pro M3 screen repair at ZA Support starts from R5,799 for both the 14-inch M3 (A2992) and M3 Pro/M3 Max (A2991) Liquid Retina XDR display assemblies, and from R7,499 for the 16-inch M3 Pro and M3 Max. Component-level repairs — display cable or backlight driver IC — start from R1,999 and are assessed before recommending a full assembly replacement. The Apple Store and iStore charge R10,000 to R22,000 for M3 display swaps. We provide a written fixed-price quote after the diagnostic assessment before any work begins.',
  },
  {
    question: 'My MacBook Pro M3 screen is completely black but the Mac appears to be on. What is wrong?',
    answer:
      'The most likely cause is backlight failure. To confirm: hold a torch against the display at a low angle in a dark room. If you can faintly see the desktop or menu bar, the M3 chip and GPU are functioning normally — the backlight circuit has failed. In Johannesburg, this fault is very frequently triggered by a load shedding voltage surge reaching the backlight driver IC through the USB-C or MagSafe charger. We repair the backlight driver IC at component level from R1,999. If there is nothing visible under torchlight, the fault may be in the display panel, the display cable, or a GPU-level issue — our assessment identifies the exact cause before we quote.',
  },
  {
    question: 'Does MacBook Pro M3 screen replacement preserve ProMotion and True Tone?',
    answer:
      'Only if the replacement is performed correctly. Every MacBook Pro M3 model — 14-inch and 16-inch — includes ProMotion adaptive refresh (24 Hz to 120 Hz), which must be verified after a display swap. True Tone calibration data is stored in the display assembly and must be transferred to the replacement unit. At ZA Support, we perform both verification checks as part of our standard post-repair process on every M3 display replacement. Your machine will show ProMotion and True Tone as active in System Settings after leaving our Hyde Park workshop.',
  },
  {
    question: 'What is the difference between the MacBook Pro M3 and M3 Pro display?',
    answer:
      'All MacBook Pro M3 models — base M3, M3 Pro, and M3 Max — use the same Liquid Retina XDR display specification for their respective screen sizes: 3024 × 1964 at 254 ppi for the 14-inch and 3456 × 2234 at 254 ppi for the 16-inch. The display assemblies for the base M3 14-inch (A2992) and M3 Pro/Max 14-inch (A2991) share the same panel specification but differ slightly in chassis, so parts must be matched to the correct model number. We confirm your serial number and model identifier before ordering any display assembly.',
  },
  {
    question: 'How long does MacBook Pro M3 screen repair take in Johannesburg?',
    answer:
      'MacBook Pro M3 screen repairs typically take 48 to 72 hours from drop-off, accounting for parts sourcing, the replacement procedure, and our post-repair calibration checks for ProMotion and True Tone. Component-level backlight IC or cable repairs are usually complete within 24 to 48 hours. We confirm the exact turnaround time in writing at assessment. Collection and return is available for clients in Sandton, Rosebank, Bryanston, Fourways, Midrand, and Randburg.',
  },
  {
    question: 'Is it worth repairing a cracked MacBook Pro M3 screen?',
    answer:
      'In almost every case, yes. MacBook Pro M3 machines will receive macOS security and feature updates for many years. A MacBook Pro M3 14-inch in good condition sells for R28,000 to R42,000 on the South African used market. Our display assembly replacement starts from R5,799 — roughly 14 to 21% of replacement value. We will tell you honestly at assessment if the repair cost does not make financial sense for your specific combination of fault and machine condition, but this is uncommon. The screen is a replaceable component; the M3 chip is not.',
  },
  {
    question: 'Can load shedding damage the MacBook Pro M3 screen?',
    answer:
      'Yes, and we see this regularly across Johannesburg. The MacBook Pro M3 ships with a 70 W or 140 W USB-C power adapter, and many clients leave the machine plugged in overnight. When Eskom restores power after a stage-4 or stage-6 outage in areas like Sandton, Fourways, or Bryanston, the inrush voltage spike travels through the charger onto the backlight power rail and can destroy the backlight driver IC. The symptom is a completely dark built-in display on a machine that otherwise boots and works normally. We repair this at component level from R1,999. A quality UPS with true sine wave output prevents this fault entirely.',
  },
  {
    question: 'Do you repair MacBook Pro M3 screens damaged by a previous repair attempt?',
    answer:
      'Yes, and we encounter this regularly. Common secondary damage from previous repair attempts includes a broken ZIF connector on the display cable, cracked display housing from aggressive prying, and replacement panels installed without True Tone data transfer — permanently disabling the feature. We assess the extent of all damage before quoting, and provide a clear itemised breakdown of what needs to be corrected and at what cost. We have successfully restored MacBook Pro M3 machines that were in a worse state after an attempted repair elsewhere than before the original screen fault.',
  },
  {
    question: 'My MacBook Pro M3 screen is flickering. Is that the display or the M3 chip?',
    answer:
      'Flickering on a MacBook Pro M3 is almost always a hardware fault in the display assembly or display cable, not the M3 chip. The most reliable diagnostic is to open and close the lid slowly while watching the screen — if flickering tracks with hinge angle, the display cable is the likely cause. If the flicker is random and does not correlate with lid position, the fault is more likely in the backlight driver circuit or the display panel. Genuine M3 GPU artefacts are rare and would typically affect an external display connected via Thunderbolt 4 or USB-C simultaneously. We diagnose all three scenarios before recommending any repair.',
  },
  {
    question: 'Does ZA Support repair MacBook Pro M3 screens for insurance claims?',
    answer:
      'Yes. We issue a detailed repair quote and a job card describing the fault, the parts replaced, and the labour performed — all the documentation your insurer requires. We are a VAT-registered business and can provide a formal tax invoice. We have completed insurance claim repairs for clients with Discovery Insure, Outsurance, and Momentum across Johannesburg, Sandton, and Pretoria. Contact us on WhatsApp with your claim reference number and serial number and we will coordinate directly throughout the process.',
  },
  {
    question: 'What is hardware ray tracing and does it affect MacBook Pro M3 screen repair?',
    answer:
      'The M3 chip family introduced hardware-accelerated ray tracing — a rendering technique used in games and creative applications to simulate realistic light behaviour. This is entirely a GPU function and has no bearing on screen repair. Whether a display fault is caused by the panel, the backlight driver, or the display cable, the repair process is the same regardless of whether your machine has the base M3, M3 Pro, or M3 Max chip. We confirm chip variant from the serial number during assessment purely for parts matching, not because it affects the repair approach.',
  },
];

const faqSchema = buildFaqSchema(faqs);
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

export default function ScreenRepairMacBookProM3Page() {
  const whatsappUrl = buildWhatsAppUrl('SCR-MBP-M3-HERO', 'screen-repair');

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
              MacBook Pro M3 Screen Repair
              <br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Every MacBook Pro M3 — base M3, M3 Pro, and M3 Max — uses a Liquid Retina XDR mini-LED display. We repair cracked panels, display cable faults, backlight driver IC damage from load shedding, and ProMotion and True Tone calibration loss from our Hyde Park workshop, typically within 48 to 72 hours.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | 14-inch from R5,799 | 16-inch from R7,499</span>
            </div>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Shield, label: 'No Fix No Fee' },
                { icon: Cpu, label: 'M3 Chip Specialists' },
                { icon: Eye, label: 'True Tone & ProMotion Preserved' },
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
                { value: '200+', label: 'MacBook Pro M3 Screens Repaired' },
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro M3 Screen Repair Pricing</h2>
          <p className="text-[#7A9E98] mb-8 max-w-3xl leading-relaxed">
            Prices below are starting prices including the display assembly or component repair, labour, and our warranty. The Apple Store and iStore charge R10,000 to R22,000 for MacBook Pro M3 display swaps — we perform a component-level diagnosis first to avoid unnecessary part replacements and keep costs down where possible.
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
          <PricingNote variant="inline" />
        </div>
      </section>

      {/* Technical Expertise */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">What Makes MacBook Pro M3 Screen Repair Distinct</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              The MacBook Pro M3 generation — launched in October 2023 — marked a significant shift compared to the M2 family. Where the M2 range retained an IPS LCD display for the 13-inch entry model, Apple retired the 13-inch MagSafe MacBook Pro entirely with the M3 generation. Every MacBook Pro M3 now ships with the Liquid Retina XDR mini-LED display: the 14-inch at 3024 × 1964 pixels and 254 ppi, and the 16-inch at 3456 × 2234 pixels and 254 ppi. This means the display technology, fault patterns, and repair complexity are uniform across the M3 line in a way they were not for M2. What varies is the chassis model number — A2992 for the base M3 14-inch and A2991 for M3 Pro and M3 Max — which affects parts compatibility and must be confirmed before sourcing any assembly.
            </p>
            <p>
              The Liquid Retina XDR display uses a mini-LED backlight with over 10,000 individual LEDs organised into local dimming zones. Apple calls this technology &apos;ProMotion XDR&apos; internally. The result is a display capable of 1,000 nits sustained brightness with 1,600 nits peak, and a contrast ratio that conventional LCD cannot approach. In our Hyde Park workshop we have developed a systematic fault isolation process for M3 displays: we map which local dimming zones are affected before recommending a full assembly replacement, which in some cases allows a component-level repair that costs a fraction of a panel swap. This process takes 30 to 60 minutes during the initial assessment.
            </p>
            <p>
              ProMotion is present and identical across all three M3 chip variants — base M3, M3 Pro, and M3 Max. The display scales between 24 Hz and 120 Hz depending on content: a slowly scrolling webpage at 24 Hz, a high-frame-rate game at 120 Hz, and everything in between managed dynamically by the display controller. After a screen replacement performed without the correct calibration procedure, ProMotion can lock at a fixed refresh rate or fail to reach the full 120 Hz ceiling. We verify ProMotion operation as part of every M3 display replacement in our workshop, using a high-speed camera test alongside system diagnostics to confirm the full refresh range is active.
            </p>
            <p>
              Load shedding remains a significant driver of MacBook Pro M3 screen repairs in Johannesburg. The M3 MacBook Pro ships with a 70 W USB-C Power Adapter or the optional 140 W USB-C Power Adapter for M3 Max configurations. Both provide a direct path for inrush voltage from power restoration to reach the backlight driver IC. We have seen this fault in M3 machines that are under two years old — well within the period when a client would not expect a display failure. The symptom is a completely dark built-in screen on a machine that otherwise boots, receives external display output, and responds to keyboard input. A UPS with true sine wave output, rather than a simulated sine wave surge protector, eliminates this risk entirely.
            </p>
            <p>
              True Tone on the M3 MacBook Pro stores calibration data within the display assembly, matched to that specific panel at the factory. When a display is replaced without transferring this data — which requires specific tooling and procedure knowledge — True Tone shows as greyed out in System Settings permanently. We transfer True Tone calibration data as standard on every M3 display replacement. According to{' '}
              <a
                href="https://support.apple.com/en-gb/102869"
                className="text-[#0FEA7A] hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apple&apos;s display repair documentation
              </a>
              , this step is mandatory for preserving True Tone after a display replacement — and it is one of the most commonly skipped steps in workshops without the correct tooling.
            </p>
          </div>
        </div>
      </section>

      {/* Fault Types */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro M3 Display Fault Types</h2>
          <p className="text-[#7A9E98] mb-8 max-w-3xl">
            These are the display faults we see most frequently on MacBook Pro M3 machines from clients across Johannesburg, Sandton, Pretoria, and surrounding areas.
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-8">Our MacBook Pro M3 Screen Repair Process</h2>
          <div className="space-y-6">
            {[
              {
                step: '01',
                title: 'Assessment (30–60 minutes)',
                desc: 'We open the MacBook Pro M3 and carry out a systematic fault isolation of the display assembly, display cable, backlight driver circuit, and display connector on the logic board. We use a thermal camera to identify components running outside specification and a high-speed camera to map ProMotion behaviour before the repair. The assessment costs from R599 and is applied toward the repair if you proceed.',
              },
              {
                step: '02',
                title: 'Fixed-Price Written Quote',
                desc: 'After assessment we provide a written fixed-price quote by WhatsApp and email. The quote includes parts, labour, and the warranty period — no hidden costs added later. We explain precisely what we found, what we will replace or repair, and why. If the repair is not economically viable, we say so at this stage.',
              },
              {
                step: '03',
                title: 'Component-Level Repair or Assembly Replacement',
                desc: 'Where possible we perform the repair at component level — backlight driver IC, display cable, or ZIF connector — to avoid sourcing a full display assembly unnecessarily. Where the panel is cracked or the assembly is beyond component repair, we source a matched replacement assembly for your exact model number (A2992 or A2991) and screen size.',
              },
              {
                step: '04',
                title: 'Post-Repair Calibration',
                desc: 'Every M3 screen repair concludes with our calibration checklist: ProMotion verification across the full 24–120 Hz range, True Tone data transfer and confirmation in System Settings, local dimming zone uniformity test, and a 30-minute stability run to confirm no thermal or electrical intermittent issues. We return the machine only after all checks pass.',
              },
              {
                step: '05',
                title: 'Warranty and Collection',
                desc: 'All MacBook Pro M3 screen repairs include our up-to-3 year warranty covering the parts and labour performed. We document the repair with a formal job card and can provide a VAT invoice for insurance claim purposes. Collection and return is available for clients in Sandton, Rosebank, Bryanston, Fourways, Midrand, and Randburg.',
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
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#E8F4F1] mb-6">Related MacBook Pro M3 Repair Services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { href: '/screen-repair', label: 'Screen Repair Hub', desc: 'All Mac and iPhone screen repairs' },
              { href: '/screen-repair/macbook-pro', label: 'MacBook Pro Screen Repair', desc: 'All MacBook Pro models' },
              { href: '/screen-repair/macbook-pro-m1', label: 'MacBook Pro M1 Screen', desc: 'M1 and M1 Pro/Max display repairs' },
              { href: '/screen-repair/macbook-pro-m2', label: 'MacBook Pro M2 Screen', desc: 'M2 13, 14, and 16-inch display repairs' },
              { href: '/logic-board-repair/macbook-pro-m3', label: 'MacBook Pro M3 Logic Board', desc: 'M3 chip and board-level repairs' },
              { href: '/liquid-damage/macbook-pro-m3', label: 'MacBook Pro M3 Liquid Damage', desc: 'Board-level liquid damage recovery' },
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-8">MacBook Pro M3 Screen Repair — Frequently Asked Questions</h2>
          <FAQAccordion items={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0A1A18] border-t border-[rgba(255,255,255,0.06)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
            MacBook Pro M3 Screen Repair — Johannesburg
          </h2>
          <p className="text-[#7A9E98] mb-8 text-lg leading-relaxed">
            Assessment from R599 · No Fix No Fee · Up to 3 Year Warranty · Hyde Park Workshop · WhatsApp for a same-day quote
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={buildWhatsAppUrl('SCR-MBP-M3-FOOTER', 'screen-repair')}
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
