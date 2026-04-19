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
  title: 'MacBook Pro M2 Screen Repair Johannesburg [2026] | From R4,199 | ZA Support',
  description:
    'MacBook Pro M2 screen repair in Johannesburg from R4,199. Liquid Retina & XDR display specialists. Backlight IC, display cable, True Tone. From R599 assessment. Hyde Park workshop.',
  alternates: { canonical: 'https://zasupport.com/screen-repair/macbook-pro-m2' },
  keywords: [
    'MacBook Pro M2 screen repair Johannesburg',
    'MacBook Pro M2 display replacement Johannesburg',
    'MacBook Pro M2 Retina display repair',
    'MacBook Pro M2 cracked screen Johannesburg',
    'MacBook Pro M2 backlight repair Johannesburg',
    'MacBook Pro M2 screen repair Hyde Park',
    'MacBook Pro M2 display cable fault',
    'MacBook Pro M2 True Tone screen repair',
    'MacBook Pro 14 inch M2 screen repair',
    'MacBook Pro 16 inch M2 screen repair',
    'Apple M2 MacBook screen repair Johannesburg',
    'Liquid Retina XDR screen repair Johannesburg',
  ],
};

const breadcrumbItems = [
  { label: 'Screen Repair', href: '/screen-repair' },
  { label: 'MacBook Pro', href: '/screen-repair/macbook-pro' },
  { label: 'MacBook Pro M2' },
];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Screen Repair', url: 'https://zasupport.com/screen-repair' },
  { name: 'MacBook Pro Screen Repair', url: 'https://zasupport.com/screen-repair/macbook-pro' },
  { name: 'MacBook Pro M2', url: 'https://zasupport.com/screen-repair/macbook-pro-m2' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Pro M2 Screen Repair Johannesburg',
  description:
    'Professional MacBook Pro M2 screen repair in Johannesburg. Liquid Retina XDR display replacement, display cable fault, backlight driver IC repair, True Tone preservation, ProMotion 120 Hz. Assessment from R599. Up-to-3 year warranty.',
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
    lowPrice: '4199',
    highPrice: '7999',
    priceCurrency: 'ZAR',
    offerCount: '4',
  },
};

const pricingRows = [
  {
    model: 'MacBook Pro 13″ M2 (A2686, 2022)',
    panel: 'IPS LCD Retina (2560 × 1600, 227 ppi)',
    from: 'R4,199',
    turnaround: '24–48 hrs',
  },
  {
    model: 'MacBook Pro 14″ M2 Pro / M2 Max (A2779, 2023)',
    panel: 'Liquid Retina XDR mini-LED (3024 × 1964, 254 ppi)',
    from: 'R5,499',
    turnaround: '48–72 hrs',
  },
  {
    model: 'MacBook Pro 16″ M2 Pro / M2 Max (A2780, 2023)',
    panel: 'Liquid Retina XDR mini-LED (3456 × 2234, 254 ppi)',
    from: 'R6,999',
    turnaround: '48–72 hrs',
  },
  {
    model: 'MacBook Pro M2 — display cable / backlight IC only',
    panel: 'Component-level backlight driver or cable repair',
    from: 'R1,799',
    turnaround: '24–48 hrs',
  },
];

const faultTypes = [
  {
    title: 'Liquid Retina XDR Mini-LED Local Dimming Failure',
    icon: Monitor,
    desc: 'The MacBook Pro 14-inch and 16-inch M2 models use mini-LED backlights with over 10,000 individual LEDs arranged in local dimming zones — a completely different architecture from the single-zone IPS displays in the 13-inch. In our Hyde Park workshop we have seen mini-LED zone failures that produce small dark patches or uneven brightness in high-contrast content. This is distinct from a cracked panel and in some cases can be addressed at component level. We assess which dimming zones are affected before recommending a full display assembly replacement, which can save significant cost on a repair that would otherwise be quoted as a straight panel swap.',
    severity: 'high',
  },
  {
    title: 'Backlight Driver IC Failure — Load Shedding Surge Damage',
    icon: Zap,
    desc: 'Load shedding remains the leading cause of MacBook Pro backlight failure in Johannesburg. The MacBook Pro M2 — particularly the 13-inch A2686 — uses a USB-C charger that many clients leave connected overnight. When Eskom power restores after a stage-6 outage in Sandton, Bryanston, or Randburg, the inrush voltage on the backlight rail can destroy the backlight driver IC on the logic board. The symptom is an otherwise functional machine with a completely dark display — hold a torch against the screen at a low angle and you will faintly see the desktop. We repair the backlight driver IC at component level from R1,799, without replacing the logic board.',
    severity: 'high',
  },
  {
    title: 'Cracked Retina or XDR Panel — Physical Impact',
    icon: AlertTriangle,
    desc: 'Both the 13-inch IPS Retina and the 14/16-inch Liquid Retina XDR panels are laminated directly to the display housing — there is no separate protective glass layer that can be replaced independently. A single corner impact or a hard object on the keyboard when the lid closes is sufficient to shatter the panel. The full display assembly must be sourced and replaced as a unit: panel, backlight array, bezels, and hinge covers. We test every replacement assembly across five calibration targets before the machine leaves our workshop, and we verify ProMotion adaptive refresh rate on 14 and 16-inch models after every replacement.',
    severity: 'high',
  },
  {
    title: 'ProMotion 120 Hz Adaptive Refresh Not Functioning',
    icon: Cpu,
    desc: 'The MacBook Pro 14-inch and 16-inch M2 models include ProMotion — Apple\'s adaptive refresh rate technology that scales between 24 Hz and 120 Hz depending on the content being displayed. After a screen replacement performed without the correct calibration procedure, ProMotion can become non-functional or locked to a fixed refresh rate. We see this frequently in machines that have been through a previous repair elsewhere. At ZA Support, every 14 and 16-inch M2 display replacement includes ProMotion verification as part of our post-repair quality check.',
    severity: 'medium',
  },
  {
    title: 'True Tone Calibration Loss After Incorrect Replacement',
    icon: Eye,
    desc: 'MacBook Pro M2 models store True Tone calibration data within the display assembly itself. This data encodes the factory-measured output of the specific panel, allowing the ambient light sensor to adjust the white point accurately. When a display is replaced without transferring this calibration data — a step that requires specific Apple tooling and knowledge — True Tone becomes permanently unavailable. We include True Tone data transfer in every M2 display replacement as standard. Your MacBook Pro M2 will show True Tone as active in System Settings after the repair, not greyed out.',
    severity: 'medium',
  },
  {
    title: 'Display Flex Cable Failure — Hinge Routing Damage',
    icon: AlertTriangle,
    desc: 'The MacBook Pro M2 13-inch (A2686) routes the display flex cable through the left hinge in a similar path to the M1 predecessor. Cable wear from repeated opening and closing over two to three years — particularly in machines that are opened and closed many times daily — can cause intermittent display flickering or a complete display blackout at certain hinge angles. Reproducing the fault by slowly opening and closing the lid while watching the display is a reliable diagnostic. A cable replacement typically costs significantly less than a full display assembly swap and is our first recommendation when the panel itself is undamaged.',
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
    question: 'How much does MacBook Pro M2 screen repair cost in Johannesburg?',
    answer:
      'MacBook Pro M2 screen repair at ZA Support starts from R4,199 for the 13-inch (A2686) IPS Retina display assembly, R5,499 for the 14-inch Liquid Retina XDR (A2779), and R6,999 for the 16-inch Liquid Retina XDR (A2780). Component-level repairs — display cable or backlight driver IC — start from R1,799 and are always assessed before recommending a full assembly replacement. The Apple Store and iStore charge R8,000 to R18,000 for the same display swaps. We provide a written fixed-price quote after diagnosis before any work begins.',
  },
  {
    question: 'My MacBook Pro M2 screen is completely black but the Mac appears to be running. What is wrong?',
    answer:
      'The most likely cause is backlight failure. To confirm: hold a torch against the display at a low angle in a dark room. If you can faintly make out the desktop, your M2 chip and GPU are working normally — the backlight circuit has failed. In Johannesburg this is very frequently caused by a load shedding voltage surge reaching the backlight driver IC via the USB-C charger. We repair this at component level from R1,799. If there is nothing visible under torchlight, the fault may be in the display panel, the display cable, or the GPU — our assessment identifies the exact cause.',
  },
  {
    question: 'Does MacBook Pro M2 screen replacement preserve ProMotion and True Tone?',
    answer:
      'Only if the replacement is done correctly. The 14-inch and 16-inch MacBook Pro M2 models include ProMotion adaptive refresh — 24 Hz to 120 Hz — which must be verified to function after a display swap. True Tone calibration data is stored in the display assembly and must be transferred to the replacement panel. At ZA Support we perform both checks on every M2 14 and 16-inch display replacement as part of our standard post-repair quality process. Your machine will show ProMotion and True Tone as active in System Settings after leaving our workshop.',
  },
  {
    question: 'What is the difference between the MacBook Pro M2 13-inch and 14-inch displays?',
    answer:
      'The MacBook Pro M2 13-inch (A2686) uses a traditional IPS LCD Retina display — a single-zone LED backlight at 2560 × 1600 pixels. The MacBook Pro M2 14-inch (A2779) uses the Liquid Retina XDR display — a mini-LED array with over 10,000 LEDs in local dimming zones, delivering 1,000 nits sustained brightness and 1,600 nits peak. The two displays are completely different in construction, cost, and repair complexity. The 14-inch XDR display assembly is more expensive to source and more involved to replace. We repair both in our Hyde Park workshop, and the assessment will confirm which specific fault is present before we quote.',
  },
  {
    question: 'How long does MacBook Pro M2 screen repair take in Johannesburg?',
    answer:
      'MacBook Pro M2 13-inch screen repairs typically complete within 24 to 48 hours. The 14-inch and 16-inch Liquid Retina XDR repairs take 48 to 72 hours due to the more complex display assembly and the additional post-repair calibration checks for ProMotion and True Tone. Component-level backlight IC or cable repairs are usually complete within 24 hours. We confirm the exact turnaround time in writing at assessment. Collection and return is available for clients in Sandton, Rosebank, Bryanston, Fourways, Midrand, and Randburg.',
  },
  {
    question: 'Is it worth repairing a cracked MacBook Pro M2 screen?',
    answer:
      'In almost every case, yes. The M2 chip itself is highly reliable and continues to receive macOS updates for many years. A MacBook Pro M2 14-inch in good condition sells for R22,000 to R35,000 on the South African used market. Our display assembly replacement starts from R5,499 — roughly 15 to 25% of replacement cost. We will tell you honestly if the repair cost does not stack up for your specific machine and fault combination, but this is uncommon. The screen is a replaceable component; the M2 chip is not.',
  },
  {
    question: 'Can load shedding damage the MacBook Pro M2 screen?',
    answer:
      'Yes, and we see this regularly in Johannesburg. The MacBook Pro M2 is typically used with a USB-C charger that many clients leave plugged in. When Eskom power restores after an outage — especially stage 4 to 6 — the voltage surge travels through the charger onto the backlight power rail and can destroy the backlight driver IC. The symptom is a fully dark screen on an otherwise working machine. This is a component-level repair from R1,799. We strongly recommend using a quality UPS with the MacBook Pro M2 rather than a basic surge bar, which does not protect against inrush voltage from power restoration.',
  },
  {
    question: 'Do you repair MacBook Pro M2 screens damaged by a previous repair attempt?',
    answer:
      'Yes, and we encounter this regularly. Common secondary damage from previous repair attempts includes a broken ZIF connector where the display cable attaches to the logic board, cracked display housing from aggressive prying, or a replacement panel installed without True Tone data transfer that has permanently disabled the feature. We assess the extent of secondary damage before quoting, and provide a clear breakdown of exactly what needs to be corrected and at what cost. We have successfully restored machines that were in a worse state after a previous attempt than before.',
  },
  {
    question: 'My MacBook Pro M2 screen is flickering. Is that the display or the M2 chip?',
    answer:
      'Flickering on a MacBook Pro M2 is almost always a hardware fault in the display assembly or display cable, not the M2 chip itself. The most reliable diagnostic is to open and close the lid slowly while watching the screen — if the flickering correlates with hinge angle, the display cable is the likely cause. If the flicker is random and does not track with lid position, the fault is more likely in the backlight driver circuit or the display panel. The M2 GPU producing display artefacts is very rare and would typically also affect an external display connected via USB-C. We diagnose all three scenarios before recommending any repair.',
  },
  {
    question: 'Does ZA Support repair MacBook Pro M2 screens for insurance claims?',
    answer:
      'Yes. We issue a detailed repair quote and a job card describing the fault, the parts replaced, and the labour performed — all the documentation your insurer requires. We are a VAT-registered business and can provide a formal tax invoice. We have completed insurance repairs for clients with Discovery Insure, Outsurance, and Momentum across Johannesburg and Sandton. Contact us with your claim reference number and we will coordinate with you directly throughout the process.',
  },
  {
    question: 'Can the MacBook Pro M2 screen be repaired the same day?',
    answer:
      'Same-day repair is possible for the MacBook Pro M2 13-inch if we have the display assembly in stock and the machine arrives before 10:00. For the 14-inch and 16-inch Liquid Retina XDR models, same-day is less likely due to parts lead time and the extended post-repair calibration process, though we can sometimes accommodate urgent cases. Contact us on WhatsApp with your serial number — we can confirm stock and schedule a same-day slot before you travel. The assessment itself takes 30 to 60 minutes; the repair typically takes a further 60 to 120 minutes.',
  },
];

const faqSchema = buildFaqSchema(faqs);
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

export default function ScreenRepairMacBookProM2Page() {
  const whatsappUrl = buildWhatsAppUrl('SCR-MBP-M2-HERO', 'screen-repair');

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
              MacBook Pro M2 Screen Repair
              <br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              The MacBook Pro M2 family spans three distinct display technologies — IPS Retina (13-inch A2686) and Liquid Retina XDR mini-LED (14-inch A2779 and 16-inch A2780). We repair cracked panels, display cable faults, backlight driver IC damage from load shedding, and ProMotion and True Tone calibration loss — from our Hyde Park workshop, typically within 24 to 72 hours.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | 13-inch from R4,199 | 14-inch from R5,499 | 16-inch from R6,999</span>
            </div>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Shield, label: 'From R599 assessment' },
                { icon: Cpu, label: 'M2 Chip Specialists' },
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
                { value: '350+', label: 'MacBook Pro M2 Screens Repaired' },
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro M2 Screen Repair Pricing</h2>
          <p className="text-[#7A9E98] mb-8 max-w-3xl leading-relaxed">
            Prices below are starting prices including the display assembly or component repair, labour, and our warranty. The Apple Store and iStore charge R8,000 to R18,000 for MacBook Pro M2 display swaps — we perform a component-level diagnosis first to avoid unnecessary part replacements and keep costs down where possible.
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
            All prices include parts, labour, and our up-to-3 year warranty. Assessment from R599 — applied toward the repair cost if you proceed. From R599 assessment applies on all cases.
          </p>
          <PricingNote variant="inline" />
        </div>
      </section>

      {/* Technical Expertise */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">What Makes MacBook Pro M2 Screen Repair Distinct</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              The MacBook Pro M2 generation covers three distinct configurations released across 2022 and 2023. The 13-inch M2 (A2686, released June 2022) retains the same form factor and IPS Retina display as its M1 predecessor. The 14-inch M2 Pro and M2 Max (A2779) and the 16-inch M2 Pro and M2 Max (A2780) — both released January 2023 — use the Liquid Retina XDR mini-LED display that Apple introduced with the 2021 MacBook Pro redesign. These are fundamentally different display technologies with different fault patterns, different repair procedures, and different price points.
            </p>
            <p>
              The Liquid Retina XDR display in the 14 and 16-inch M2 models uses a mini-LED backlight array with over 10,000 individual LEDs organised into local dimming zones. This architecture delivers 1,000 nits sustained brightness and 1,600 nits peak — roughly three times the brightness of the 13-inch IPS panel — along with significantly higher contrast. The trade-off is repair complexity. The mini-LED backlight is part of the display assembly and cannot be serviced independently from the panel. In our Hyde Park workshop we have developed a systematic fault isolation process to determine whether a reported symptom is caused by the panel, the backlight array, the display controller, or the display cable before we commit to sourcing a replacement assembly.
            </p>
            <p>
              ProMotion is the second significant display feature that can be lost during an incorrect screen replacement on the 14 and 16-inch M2 models. Apple&apos;s adaptive refresh technology adjusts the display between 24 Hz and 120 Hz depending on content — a smooth scroll through a document, a 24 fps film, or a 120 Hz game are all handled differently by the display controller. After a replacement performed without proper calibration, ProMotion can lock at a fixed rate or fail to engage the higher refresh rates entirely. We verify ProMotion function as part of every 14 and 16-inch M2 screen replacement in our workshop.
            </p>
            <p>
              Load shedding continues to drive a significant proportion of the MacBook Pro M2 backlight repairs we see from Johannesburg clients. Sandton, Fourways, Bryanston, Randburg, and Midrand have all experienced extended stage-4 and stage-6 schedules since these machines were released. The MacBook Pro M2 ships with a 67 W or 96 W USB-C power adapter — both of which provide a path for surge voltage to reach the backlight driver IC when Eskom power restores. We have seen this fault in MacBook Pro M2 machines that are as little as six months old. A UPS with true sine wave output prevents it entirely.
            </p>
            <p>
              For an independent reference on the internal layout of these machines, the iFixit MacBook Pro 14-inch M2 Pro teardown documents the display assembly routing and the mini-LED backlight structure in detail.
            </p>
          </div>
          <div className="mt-6">
            <a
              href="https://www.ifixit.com/Teardown/MacBook_Pro_14-Inch_M2_Pro_A2779_Teardown/158877"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#0FEA7A] text-sm font-semibold hover:underline"
            >
              iFixit MacBook Pro 14-inch M2 Pro A2779 Teardown <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Common Faults */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro M2 Display Faults We Repair</h2>
          <p className="text-[#7A9E98] mb-10 max-w-3xl leading-relaxed">
            We have documented the most common MacBook Pro M2 display faults across all A2686, A2779, and A2780 configurations. Every fault below is a repairable condition — we diagnose the precise cause before recommending any part replacement.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {faultTypes.map((fault) => (
              <div key={fault.title} className={`rounded-2xl border p-6 ${severityColours[fault.severity]}`}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <fault.icon className="w-5 h-5 text-[#0FEA7A] flex-shrink-0" />
                    <h3 className="text-[#E8F4F1] font-bold text-lg">{fault.title}</h3>
                  </div>
                  <span className={`flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${severityBadgeColours[fault.severity]}`}>
                    {severityLabels[fault.severity]}
                  </span>
                </div>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{fault.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 p-5 rounded-xl border border-[rgba(15,234,122,0.15)] bg-[rgba(15,234,122,0.04)] flex items-start gap-4">
            <Shield className="w-5 h-5 text-[#0FEA7A] flex-shrink-0 mt-0.5" />
            <p className="text-[#7A9E98] text-sm leading-relaxed">
              Every repair is quoted before work begins. Our From R599 assessment policy means that if we cannot resolve your MacBook Pro M2 screen fault, an assessment fee of R599 applies and your machine is returned exactly as we received it. Up-to-3 year warranty on all completed screen repairs.
            </p>
          </div>
        </div>
      </section>

      {/* Apple vs ZA Support Comparison */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Apple iStore vs ZA Support: MacBook Pro M2 Screen Repair</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">
            Apple and iStore technicians replace the entire display assembly as a unit and charge accordingly. We diagnose the specific fault first — cable, driver IC, or panel — and replace only what is necessary.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="glass-card p-6 border border-red-500/20">
              <h3 className="text-red-400 font-bold mb-4">Apple Store / iStore</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2.5">
                <li>Full display assembly replacement — R8,000 to R18,000+</li>
                <li>Accidental damage not covered by standard warranty</li>
                <li>ProMotion and True Tone recalibration requires Apple Configurator</li>
                <li>Turnaround 5–10 business days via Apple depot</li>
                <li>No component-level backlight driver repair</li>
                <li>No distinction between cable fault, IC fault, and panel fault</li>
              </ul>
            </div>
            <div className="glass-card p-6 border border-[rgba(15,234,122,0.3)]">
              <h3 className="text-[#0FEA7A] font-bold mb-4">ZA Support</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2.5">
                <li>Component-level diagnosis — only failed parts replaced</li>
                <li>13-inch from R4,199 | 14-inch from R5,499 | 16-inch from R6,999</li>
                <li>ProMotion verified and True Tone data preserved on every replacement</li>
                <li>Turnaround 24–72 hours for most M2 screen repairs</li>
                <li>Backlight driver IC repair — no full logic board replacement</li>
                <li>Up-to-3 year warranty on all completed repairs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro M2 Screen Repair — Johannesburg Service Area</h2>
          <p className="text-[#7A9E98] mb-6 leading-relaxed">
            Our Hyde Park workshop is 10–20 minutes from most northern Johannesburg suburbs. We offer collection and return from Sandton, Rosebank, Bryanston, Fourways, Midrand, Randburg, Morningside, Rivonia, Sunninghill, and Houghton. Same-day collection is available for urgent cases — contact us on WhatsApp or by phone to arrange a time.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              'Sandton', 'Rosebank', 'Bryanston', 'Fourways',
              'Midrand', 'Randburg', 'Morningside', 'Rivonia',
              'Sunninghill', 'Houghton', 'Parkhurst', 'Hyde Park',
            ].map((suburb) => (
              <div key={suburb} className="flex items-center gap-2 bg-[rgba(15,234,122,0.05)] border border-[rgba(15,234,122,0.1)] rounded-xl px-4 py-3">
                <MapPin className="w-3.5 h-3.5 text-[#0FEA7A] flex-shrink-0" />
                <span className="text-[#E8F4F1] text-sm">{suburb}</span>
              </div>
            ))}
          </div>
          <p className="text-[#7A9E98] text-sm mt-4">
            Also covering Kempton Park, Pretoria, and Centurion by arrangement. Call us on {CONTACT.phone} to confirm availability.
          </p>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GoogleReviews />
        </div>
      </section>

      {/* FAQs */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="MacBook Pro M2 Screen Repair — Common Questions" />
        </div>
      </section>

      {/* Related Services */}
      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Repairs</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'All Screen Repairs', href: '/screen-repair' },
              { label: 'MacBook Pro Screen Repair', href: '/screen-repair/macbook-pro' },
              { label: 'MacBook Pro M1 Screen Repair', href: '/screen-repair/macbook-pro-m1' },
              { label: 'Screen Repair — Sandton', href: '/screen-repair/sandton' },
              { label: 'MacBook Air Screen Repair', href: '/screen-repair/macbook-air' },
              { label: 'Logic Board — MacBook Pro M2', href: '/logic-board-repair/macbook-pro-m2' },
              { label: 'MacBook Pro Liquid Damage', href: '/liquid-damage' },
              { label: 'Contact Us', href: '/contact' },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="glass-card p-4 text-center group">
                <span className="text-[#E8F4F1] text-sm font-semibold group-hover:text-[#0FEA7A] transition-colors">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">MacBook Pro M2 Screen Fault? Let Us Diagnose It.</h2>
            <p className="text-[#7A9E98] mb-6 max-w-xl mx-auto leading-relaxed">
              WhatsApp us a photo of the fault — we will give you an honest assessment and a price range before you even bring the machine in.  Assessment from R599, applied toward the repair if you proceed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
