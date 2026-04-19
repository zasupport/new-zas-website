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
  title: 'MacBook Pro M1 Screen Repair Johannesburg [2026] | From R3,999 | ZA Support',
  description:
    'MacBook Pro M1 screen repair in Johannesburg from R3,999. IPS Retina display specialists. Backlight IC, display cable, True Tone. From R599 assessment. Hyde Park workshop.',
  alternates: { canonical: 'https://zasupport.com/screen-repair/macbook-pro-m1' },
  keywords: [
    'MacBook Pro M1 screen repair Johannesburg',
    'MacBook Pro M1 display replacement Johannesburg',
    'MacBook Pro M1 Retina display repair',
    'MacBook Pro M1 cracked screen Johannesburg',
    'MacBook Pro M1 backlight repair Johannesburg',
    'MacBook Pro M1 screen repair Hyde Park',
    'MacBook Pro M1 display cable fault',
    'MacBook Pro M1 True Tone screen repair',
    'MacBook Pro 13 inch M1 screen repair',
    'Apple M1 MacBook screen repair Johannesburg',
  ],
};

const breadcrumbItems = [
  { label: 'Screen Repair', href: '/screen-repair' },
  { label: 'MacBook Pro', href: '/screen-repair/macbook-pro' },
  { label: 'MacBook Pro M1' },
];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Screen Repair', url: 'https://zasupport.com/screen-repair' },
  { name: 'MacBook Pro Screen Repair', url: 'https://zasupport.com/screen-repair/macbook-pro' },
  { name: 'MacBook Pro M1', url: 'https://zasupport.com/screen-repair/macbook-pro-m1' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Pro M1 Screen Repair Johannesburg',
  description:
    'Professional MacBook Pro M1 screen repair in Johannesburg. IPS Retina display replacement, display cable fault, backlight driver IC repair, True Tone preservation. Assessment from R599. Up-to-3 year warranty.',
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
    lowPrice: '3999',
    highPrice: '5999',
    priceCurrency: 'ZAR',
    offerCount: '3',
  },
};

const pricingRows = [
  {
    model: 'MacBook Pro 13″ M1 (A2338, Late 2020)',
    panel: 'IPS LCD Retina (2560 × 1600, 227 ppi)',
    from: 'R3,999',
    turnaround: '24–48 hrs',
  },
  {
    model: 'MacBook Pro 13″ M1 (A2338) — display cable only',
    panel: 'Display cable / backlight fuse repair',
    from: 'R1,499',
    turnaround: '24 hrs',
  },
  {
    model: 'MacBook Pro 13″ M1 — backlight IC repair',
    panel: 'Component-level backlight driver repair',
    from: 'R2,499',
    turnaround: '24–48 hrs',
  },
];

const faultTypes = [
  {
    title: 'IPS Display Cable Failure',
    icon: AlertTriangle,
    desc: 'The MacBook Pro M1 (A2338) uses a thin display flex cable routed through the left hinge. Unlike the notorious 2016–2017 flexgate cable, the M1 cable is longer and better positioned — but it is not immune. In our Hyde Park workshop we see cable failures in machines that have been dropped, opened roughly, or repaired incorrectly by a previous technician. The symptom is a display that flickers at certain hinge angles, or goes dark completely despite the M1 chip running normally. A cable swap corrects this without needing to replace the full display assembly.',
    severity: 'high',
  },
  {
    title: 'Backlight Driver IC Failure — Load Shedding Damage',
    icon: Zap,
    desc: 'Load shedding is the leading cause of MacBook Pro backlight failure in South Africa. When Eskom power returns after an outage, the voltage surge on the 12V backlight rail can destroy the backlight driver IC on the logic board. The M1 MacBook Pro uses an updated backlight circuit compared to Intel models, but the same surge vulnerability applies whenever the machine is connected to a charger during power restoration. The symptom is a perfectly black screen on an otherwise running MacBook Pro — you can faintly see the desktop by shining a torch at the display. We repair this at component level without replacing the logic board.',
    severity: 'high',
  },
  {
    title: 'Cracked Retina Panel — Physical Impact',
    icon: AlertTriangle,
    desc: 'The MacBook Pro M1 uses a 13.3-inch IPS Retina display at 2560 × 1600 pixels. The panel is laminated to the display housing — there is no separate glass to replace. A single impact to the corner or a sharp object on the keyboard when the lid is closed is sufficient to shatter the panel. The entire display assembly must be replaced as a unit: panel, backlight, bezel, and hinge covers. We source genuine-equivalent assemblies for the A2338 chassis and test every replacement across five calibration screens before the machine leaves our workshop.',
    severity: 'high',
  },
  {
    title: 'True Tone Calibration Loss',
    icon: Eye,
    desc: 'MacBook Pro M1 models shipped from factory with True Tone enabled — the display adjusts its white point based on ambient light, measured by the front-facing sensor. The calibration data is stored in the display assembly itself. If the display is replaced without transferring the True Tone data, the system permanently shows "Not Available" in Display Settings. Every MacBook Pro M1 screen replacement at ZA Support includes True Tone data transfer as standard — your display will continue adapting to ambient light after the repair.',
    severity: 'medium',
  },
  {
    title: 'Display Delamination — Liquid Ingress',
    icon: Monitor,
    desc: 'Liquid ingress along the keyboard can travel to the display assembly via the hinge cable channel. We have seen this in MacBook Pro M1 machines where the liquid entered through the speaker grille or the USB-C port area rather than the keyboard. When liquid reaches the display bonding layer, the lamination between the LCD and the housing starts to separate — grey blotches or rainbow patches appear and spread from one edge inward. This is distinct from a cracked screen and requires full display assembly replacement. We always perform a liquid damage assessment before quoting screen repair to ensure no underlying board fault is present.',
    severity: 'medium',
  },
  {
    title: 'Backlight Bleed — Panel Pressure Points',
    icon: Monitor,
    desc: 'The MacBook Pro M1 is a thin, lightweight machine. A small warp in the chassis from a previous drop — even one that left no visible mark — can apply pressure to the display assembly, causing backlight bleed: bright patches visible in the corners or along one edge when the screen is showing a dark image. Mild bleed can be corrected by re-seating the display assembly. Severe cases require a new panel. We assess the chassis alignment at the same time to prevent the fault recurring after replacement.',
    severity: 'low',
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
    question: 'How much does MacBook Pro M1 screen repair cost in Johannesburg?',
    answer:
      'MacBook Pro M1 (A2338, 13-inch) screen repair starts from R3,999 at ZA Support for a full display assembly replacement. If the fault is limited to the display cable or backlight driver IC rather than the panel itself, the repair can be significantly cheaper — cable repair from R1,499 and backlight IC repair from R2,499. The Apple Store charges R6,000 to R10,000 for the same display assembly swap. We provide a written fixed-price quote after diagnosis before any work begins, so there are no surprises.',
  },
  {
    question: 'My MacBook Pro M1 screen is black but the Mac is still running. What is wrong?',
    answer:
      'The most likely cause is backlight failure. To confirm: hold a torch at the display at a low angle. If you can faintly see the desktop, your M1 chip is running perfectly but the backlight circuit has failed. In Johannesburg, this is frequently caused by a load shedding voltage surge reaching the backlight driver IC via the charger. This is a repairable component-level fault — we do not replace the entire logic board to fix it. If you cannot see anything under torchlight, the fault may be in the display panel, the display cable, or the GPU — our assessment will identify the cause within 24 hours.',
  },
  {
    question: 'Will MacBook Pro M1 screen replacement affect True Tone?',
    answer:
      'Only if it is done incorrectly. The MacBook Pro M1 stores True Tone calibration data inside the display assembly. If the replacement display does not have matching calibration data transferred, True Tone becomes permanently unavailable. At ZA Support we always carry the True Tone data across during display replacement using the correct procedure. Your MacBook Pro M1 will show True Tone as active in System Settings after the repair — not as a greyed-out unavailable option.',
  },
  {
    question: 'Can you repair the MacBook Pro M1 screen caused by load shedding damage?',
    answer:
      'Yes. Load shedding surge damage to the MacBook Pro M1 backlight circuit is one of the most common repair requests we see in our Hyde Park workshop — especially after prolonged Eskom outage schedules in Sandton, Fourways, Bryanston, and Randburg. The repair involves replacing the backlight driver IC on the logic board at component level. This typically costs R2,499 — far less than the R3,999+ for a new display assembly. We always recommend connecting your MacBook Pro to a UPS rather than directly to the wall or even a basic surge bar.',
  },
  {
    question: 'How long does MacBook Pro M1 screen repair take?',
    answer:
      'Most MacBook Pro M1 screen repairs are completed within 24 to 48 hours of drop-off at our Hyde Park workshop. If the fault is a display cable or backlight IC repair, turnaround is typically 24 hours once the assessment is confirmed. Full display assembly replacement takes 24 to 48 hours depending on parts availability. We will confirm the exact timeline in writing when you bring the machine in. Collection and return is available for clients in Sandton, Rosebank, Bryanston, Fourways, Midrand, and Randburg.',
  },
  {
    question: 'Is it worth repairing a cracked MacBook Pro M1 screen?',
    answer:
      'Almost always yes. A MacBook Pro M1 13-inch in good condition sells for R14,000 to R20,000 on the used market in South Africa. Our screen repair starts from R3,999 — roughly 20% of replacement cost. The M1 chip itself is extremely reliable and continues to receive macOS updates for many years to come. The screen is the only part that has physically failed. A replacement display assembly restores the machine to full working order. We will tell you if the cost of repair does not stack up in your specific case — but this is rare.',
  },
  {
    question: 'Does ZA Support repair MacBook Pro M1 screens covered under insurance?',
    answer:
      'Yes. We issue a detailed repair quote and a job card that describes the fault, the parts replaced, and the labour performed — all the documentation your insurer requires. We are a VAT-registered business (VAT 436-026-0014) and can provide a tax invoice for insurance purposes. We have completed insurance repairs for clients from Discovery Insure, Outsurance, and Momentum across Johannesburg. Contact us with your claim reference number and we will assist you directly.',
  },
  {
    question: 'My MacBook Pro M1 has a flickering screen. Is that the display or the M1 chip?',
    answer:
      'Flickering on a MacBook Pro M1 is almost always a hardware fault in the display assembly or cable, not the M1 chip. The most common cause is a display cable losing contact at a specific hinge angle — you can often reproduce it by opening and closing the lid slowly while watching the screen. If the flickering is random and does not correlate with hinge movement, the fault may be in the backlight driver circuit or the panel itself. We diagnose all three scenarios at assessment before recommending a fix. The M1 GPU producing display artifacts is extremely rare and would typically manifest as garbled output on an external display as well.',
  },
  {
    question: 'Do you repair MacBook Pro M1 screens that were damaged by a previous repair attempt?',
    answer:
      'Yes, and we see this regularly. The most common previous-repair damage we encounter is a broken ZIF connector where the display cable attaches to the logic board, cracked display housing from overly aggressive opening, or a non-calibrated replacement panel that has disabled True Tone. We assess the extent of secondary damage before quoting and provide a clear breakdown of what needs to be fixed and at what cost. In many cases we can restore a machine that a previous repair has made worse.',
  },
  {
    question: 'What is the difference between the MacBook Pro M1 display and the MacBook Pro 14-inch M1 Pro display?',
    answer:
      'The MacBook Pro M1 (13-inch, A2338, 2020) uses an IPS LCD Retina display at 2560 × 1600 pixels with a conventional LED backlight. The MacBook Pro 14-inch M1 Pro (A2442, 2021) uses the Liquid Retina XDR display — a mini-LED backlight with over 10,000 LEDs in local dimming zones, delivering significantly higher peak brightness and contrast. The two displays are completely different components and are not interchangeable. The 14-inch Liquid Retina XDR repair is more complex and starts from R4,999 rather than R3,999. We repair both models in our Hyde Park workshop.',
  },
  {
    question: 'Can the MacBook Pro M1 screen repair be done same day?',
    answer:
      'Same-day screen repair is possible for MacBook Pro M1 models if we have the relevant display assembly in stock and the machine arrives before midday. We hold stock of common M1 display assemblies in our Hyde Park workshop. Contact us on WhatsApp first with your serial number — we can confirm stock and schedule a same-day slot before you travel to us. Assessment itself takes 30 to 60 minutes; the repair typically takes a further 60 to 90 minutes once parts are confirmed.',
  },
];

const faqSchema = buildFaqSchema(faqs);
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

export default function ScreenRepairMacBookProM1Page() {
  const whatsappUrl = buildWhatsAppUrl('SCR-MBP-M1-HERO', 'screen-repair');

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
              MacBook Pro M1 Screen Repair
              <br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              The MacBook Pro M1 (A2338, 13-inch) uses a 2560 × 1600 IPS Retina display bonded to the housing. We repair cracked panels, display cable faults, backlight driver IC damage from load shedding, and True Tone calibration loss — in our Hyde Park workshop, typically within 24 to 48 hours.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | Full display assembly from R3,999 | Cable repair from R1,499</span>
            </div>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Shield, label: 'From R599 assessment' },
                { icon: Cpu, label: 'M1 Chip Specialists' },
                { icon: Eye, label: 'True Tone Preserved' },
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
                { value: '500+', label: 'MacBook Pro M1 Screens Repaired' },
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro M1 Screen Repair Pricing</h2>
          <p className="text-[#7A9E98] mb-8 max-w-3xl leading-relaxed">
            Prices below are starting prices including display assembly or component repair, labour, and our warranty. The Apple Store charges R6,000 to R10,000 for a MacBook Pro M1 display assembly swap — we provide a component-level diagnosis first to avoid unnecessary part replacements.
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">What Makes MacBook Pro M1 Screen Repair Distinct</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              The MacBook Pro M1 — Apple model A2338, released in late 2020 — was the first professional Mac laptop built on Apple&apos;s own silicon. The M1 chip integrates the CPU, GPU, Neural Engine, and unified memory onto a single die, which fundamentally changes the repair landscape: unlike Intel MacBook Pros, you cannot replace the GPU independently. The display, however, is an entirely separate assembly and remains repairable by an experienced technician.
            </p>
            <p>
              The 13.3-inch IPS Retina panel in the A2338 runs at 2560 × 1600 pixels — a 227 ppi density that produces noticeably sharper text and images compared to a standard 1080p display. The panel is laminated to the display housing assembly in the same way as earlier Retina MacBook Pros. When it cracks, the whole assembly must come out. In our Hyde Park workshop we have developed a removal procedure specific to the A2338 chassis that protects the hinge cable routing and the antenna assemblies in the lid corners.
            </p>
            <p>
              Load shedding has introduced a fault pattern that is unique to South Africa and affects the MacBook Pro M1 more than many clients expect. The M1 MacBook Pro ships with a USB-C charger — many clients leave it plugged in overnight. When Eskom power is restored after an outage, the surge travels through the charger and can damage the backlight driver IC on the logic board. We see this pattern regularly from clients in Fourways, Bryanston, Randburg, and Midrand — all areas with historically high load shedding frequency. A good UPS prevents this entirely.
            </p>
            <p>
              True Tone is a feature many MacBook Pro M1 owners only notice when it is gone. Apple calibrates each display assembly at the factory with a unique colour profile that matches the physical output of that specific panel. When the display is replaced without preserving this data, the M1 MacBook Pro permanently loses the ability to adjust its white point based on ambient light. We always transfer True Tone data as part of our standard display replacement — it is not an optional extra.
            </p>
            <p>
              For an independent overview of the A2338 internal layout, the iFixit MacBook Pro 13-inch M1 teardown is a useful reference for understanding the component relationships before and after a screen repair.
            </p>
          </div>
          <div className="mt-6">
            <a
              href="https://www.ifixit.com/Teardown/MacBook_Pro_13-Inch_M1_A2338_Teardown/138503"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#0FEA7A] text-sm font-semibold hover:underline"
            >
              iFixit MacBook Pro M1 A2338 Teardown <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Common Faults */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro M1 Display Faults We Repair</h2>
          <p className="text-[#7A9E98] mb-10 max-w-3xl leading-relaxed">
            We have documented the most common MacBook Pro M1 display faults across all A2338 configurations. Every fault below is a repairable condition — we diagnose the precise cause before recommending any part replacement.
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
              Every repair is quoted before work begins. Our From R599 assessment policy means that if we cannot resolve your MacBook Pro M1 screen fault, an assessment fee of R599 applies and your machine is returned exactly as we received it. Up-to-3 year warranty on all completed screen repairs.
            </p>
          </div>
        </div>
      </section>

      {/* Apple vs ZA Support Comparison */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Apple iStore vs ZA Support: MacBook Pro M1 Screen Repair</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">
            Apple and iStore technicians replace the entire display assembly as a unit and charge accordingly. We diagnose the specific fault — cable, driver IC, or panel — and replace only what is necessary.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="glass-card p-6 border border-red-500/20">
              <h3 className="text-red-400 font-bold mb-4">Apple Store / iStore</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2.5">
                <li>Full display assembly replacement — R6,000 to R10,000+</li>
                <li>Accidental damage not covered by standard warranty</li>
                <li>True Tone recalibration requires Apple Configurator</li>
                <li>Turnaround 5–10 business days via Apple depot</li>
                <li>No component-level backlight driver repair</li>
                <li>No distinction between cable fault and panel fault</li>
              </ul>
            </div>
            <div className="glass-card p-6 border border-[rgba(15,234,122,0.3)]">
              <h3 className="text-[#0FEA7A] font-bold mb-4">ZA Support</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2.5">
                <li>Component-level diagnosis — only failed parts replaced</li>
                <li>MacBook Pro M1 screen from R3,999 | cable from R1,499</li>
                <li>True Tone data preserved on every display replacement</li>
                <li>Turnaround 24–48 hours for most M1 screen repairs</li>
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
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro M1 Screen Repair — Johannesburg Service Area</h2>
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
          <FAQAccordion items={faqs} title="MacBook Pro M1 Screen Repair — Common Questions" />
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
              { label: 'Screen Repair — Sandton', href: '/screen-repair/sandton' },
              { label: 'MacBook Air Screen Repair', href: '/screen-repair/macbook-air' },
              { label: 'Logic Board — MacBook Pro M1', href: '/logic-board-repair/macbook-pro-m1' },
              { label: 'MacBook Pro M1 Logic Board', href: '/logic-board-repair/macbook-pro-m1' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">MacBook Pro M1 Screen Fault? Let Us Diagnose It.</h2>
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
            <p className="text-[#7A9E98] text-xs mt-6">
              1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | MacBook Pro M1 screen from R3,999 | Cable repair from R1,499 | Up-to-3 year warranty
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
