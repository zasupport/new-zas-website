import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import {
  Phone,
  ArrowRight,
  Battery,
  BatteryWarning,
  Zap,
  CheckCircle,
  Shield,
  AlertTriangle,
  MapPin,
  Cpu,
  Activity,
  Wrench,
} from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildBreadcrumbSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import GoogleReviews from '@/components/ui/GoogleReviews';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, SITE, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Mac Mini Battery & Power Supply Repair Johannesburg 2026 | From R599 | ZA Support',
  description:
    'Mac Mini PRAM battery, power supply unit repair and UPS advice in Johannesburg. From R599 assessment. No Fix No Fee. 12-month warranty. Hyde Park workshop.',
  alternates: { canonical: 'https://zasupport.com/battery-replacement/mac-mini' },
  keywords: [
    'Mac Mini power supply repair Johannesburg',
    'Mac Mini PRAM battery replacement',
    'Mac Mini PSU repair Hyde Park',
    'Mac Mini power board repair South Africa',
    'Mac Mini not turning on Johannesburg',
    'Mac Mini UPS load shedding',
    'Mac Mini CR2032 battery replacement',
    'Mac Mini power supply unit cost South Africa',
    'Mac Mini power issues repair near me',
    'Mac Mini CMOS battery replacement Johannesburg',
  ],
};

/* -- Breadcrumbs ----------------------------------------------------------- */
const breadcrumbItems = [
  { label: 'Battery Replacement', href: '/battery-replacement' },
  { label: 'Mac Mini' },
];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Battery Replacement', url: 'https://zasupport.com/battery-replacement' },
  { name: 'Mac Mini', url: 'https://zasupport.com/battery-replacement/mac-mini' },
];

/* -- Service Schema -------------------------------------------------------- */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Mac Mini Power Supply & PRAM Battery Repair Johannesburg',
  description:
    'Professional Mac Mini power supply unit repair, PRAM/CMOS battery replacement, and power board diagnostics in Johannesburg. From R599 assessment. No Fix No Fee. 12-month warranty on parts and labour.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Hyde Park' },
    { '@type': 'Neighborhood', name: 'Sandton' },
    { '@type': 'Neighborhood', name: 'Rosebank' },
  ],
  serviceType: 'Power Supply & Battery Repair',
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: '599',
    highPrice: '3499',
    priceCurrency: 'ZAR',
    offerCount: '4',
  },
  availableChannel: [
    { '@type': 'ServiceChannel', serviceUrl: 'https://wa.me/27645295863', serviceType: 'WhatsApp' },
    { '@type': 'ServiceChannel', servicePhone: '+27645295863', serviceType: 'Phone' },
  ],
};

/* -- FAQs ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'Does the Mac Mini have a battery?',
    answer:
      'The Mac Mini does not have a main rechargeable battery like a MacBook — it is a desktop and runs entirely from mains power. However, every Mac Mini contains a small CR2032 coin cell known as the PRAM or CMOS battery. This battery maintains system settings such as date, time, timezone, startup disk preference, and display resolution when the Mac Mini is unplugged from power. When this battery dies, the Mac Mini may lose its date and time on every restart, boot to the wrong disk, or display unexpected behaviour during startup.',
  },
  {
    question: 'How much does a Mac Mini PRAM battery replacement cost in Johannesburg?',
    answer:
      'A Mac Mini PRAM (CR2032) battery replacement at our Hyde Park workshop starts from R599 including the assessment, the replacement cell, and labour. The CR2032 itself costs under R50, but accessing it requires partial disassembly of the Mac Mini — the 2014 and earlier models require removal of the logic board, while the 2018 and later models (including M1 and M2) have it soldered to the logic board in some configurations. Our assessment fee of R599 is applied toward the repair cost if you proceed.',
  },
  {
    question: 'How much does a Mac Mini power supply repair cost?',
    answer:
      'Mac Mini power supply unit (PSU) repair in Johannesburg ranges from R1,299 to R3,499 depending on the model and fault. Intel Mac Minis (2014 and 2018) have an internal power supply that can be replaced as a unit. The Mac Mini M1 and M2 use an external-style internal PSU that is more compact but equally repairable. Surge damage from load shedding is the most common cause of PSU failure we see at our Hyde Park workshop — about 65% of all Mac Mini power supply repairs we perform are surge-related.',
  },
  {
    question: 'My Mac Mini will not turn on — is it the power supply?',
    answer:
      'A Mac Mini that does not respond to the power button at all is most commonly a power supply failure. We diagnose this by testing the PSU output voltages independently of the logic board. If the PSU delivers correct voltage but the Mac Mini still does not power on, the fault is on the logic board — typically a blown power management IC or shorted capacitor near the power input. We can repair both. Bring it in for a free diagnostic and we will identify the exact component at fault before quoting.',
  },
  {
    question: 'Can load shedding damage a Mac Mini power supply?',
    answer:
      'Absolutely. The Mac Mini is more vulnerable to load shedding damage than any MacBook because it has no internal battery to act as a buffer. When power returns after load shedding, the initial surge can exceed 300 volts momentarily — enough to damage the rectifier bridge, filter capacitors, or voltage regulators inside the Mac Mini PSU. We have seen a significant increase in Mac Mini power supply failures during Stages 4 through 6. A quality UPS with automatic voltage regulation is the single best investment for any Mac Mini owner in Johannesburg.',
  },
  {
    question: 'What UPS do you recommend for a Mac Mini in South Africa?',
    answer:
      'For a Mac Mini, we recommend a line-interactive UPS rated at 600 VA or higher with automatic voltage regulation (AVR). The Mac Mini draws between 39 watts (M1 idle) and 150 watts (Intel under load), so a 600 VA UPS provides 20 to 45 minutes of runtime during load shedding — enough to save work and shut down safely, or work through a brief interruption. Brands available in South Africa that we have tested include APC Back-UPS (BX600CI-ZA, around R1,200), Mecer 650 VA (around R900), and RCT 850 VA (around R1,100). The critical feature is AVR, which cleans voltage fluctuations without switching to battery.',
  },
  {
    question: 'How do I know if my Mac Mini PRAM battery is dead?',
    answer:
      'The clearest sign is that your Mac Mini resets its date and time to January 2001 or December 2000 every time it is unplugged and plugged back in. Other symptoms include: the Mac Mini booting to the wrong startup disk, Bluetooth devices not reconnecting automatically after a power cycle, display resolution resetting to default, and the startup chime playing at full volume regardless of your volume setting. In load shedding conditions, a dead PRAM battery means the Mac Mini loses all these settings during every power outage.',
  },
  {
    question: 'Can you repair a Mac Mini M1 or M2 power supply?',
    answer:
      'Yes. The Mac Mini M1 (A2348) and Mac Mini M2 (A2686) both have internal power supply units that we repair and replace. The M-series Mac Minis are actually simpler to service than the Intel 2018 model because Apple moved to a more modular internal layout. The M1 Mac Mini draws a maximum of 39 watts, so its PSU is smaller and runs cooler than Intel equivalents. PSU replacement on M1 or M2 Mac Mini models typically takes 1 to 2 hours at our Hyde Park workshop.',
  },
  {
    question: 'Is it worth repairing an old Mac Mini power supply?',
    answer:
      'It depends on the model. For a Mac Mini 2014 (the last user-upgradeable Intel model) or newer, PSU repair is almost always worthwhile — the machine has years of useful life remaining. For Mac Mini 2012 and earlier, the repair cost needs to be weighed against the machine age: if you are spending R2,500 on a PSU for a 12-year-old machine, a used Mac Mini M1 at R8,000 to R10,000 may be better value. We give honest advice. If the repair does not make financial sense, we will tell you before starting work.',
  },
  {
    question: 'What warranty do you offer on Mac Mini power supply repairs?',
    answer:
      'All Mac Mini power supply repairs and PRAM battery replacements at ZA Support carry a written 12-month warranty covering the replacement parts and our workmanship. If the PSU develops any fault within 12 months — voltage instability, failure to power on, unexpected shutdowns, or any electrical fault — we repair it again at no charge. No Fix No Fee applies: if we assess your Mac Mini and determine the PSU is not repairable, you pay only the assessment fee from R599.',
  },
  {
    question: 'Do you offer collection for Mac Mini power supply repair?',
    answer:
      'Yes. We collect and return Mac Minis from all suburbs within 25 km of our Hyde Park workshop — Sandton, Rosebank, Bryanston, Fourways, Midrand, Randburg, Morningside, Rivonia, Houghton, and Parkhurst. The Mac Mini is small and easy to transport, so collection is straightforward. WhatsApp us or call 064 529 5863 to arrange. Pretoria and Centurion collection is available by arrangement.',
  },
];

/* -- Structured Data ------------------------------------------------------- */
const faqSchema = buildFaqSchema(faqs);
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

/* -- Page Component -------------------------------------------------------- */
export default function BatteryReplacementMacMiniPage() {
  const whatsappUrl = buildWhatsAppUrl('BAT-MINI-HERO', 'battery');

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
              Mac Mini Power Supply &amp; PRAM Battery Repair
              <br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              The Mac Mini is a desktop — it does not have a rechargeable battery. But it does have a PRAM coin cell, an internal power supply unit, and a power board that are all vulnerable to Johannesburg&apos;s load shedding surges. We diagnose and repair all Mac Mini power faults at our Hyde Park workshop. Assessment from R599 with No Fix No Fee guarantee and 12-month warranty.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | Assessment from R599</span>
            </div>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Shield, label: 'No Fix No Fee' },
                { icon: Zap, label: 'PSU & Power Board' },
                { icon: Battery, label: 'PRAM Battery' },
                { icon: CheckCircle, label: '12-Month Warranty' },
                { icon: Wrench, label: 'Same-Day Service' },
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
                href="/battery-replacement"
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all"
              >
                All Battery Replacements <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)]">
              {[
                { value: '800+', label: 'Mac Minis Serviced' },
                { value: SITE.yearsExperience + ' Years', label: 'In Business Since 2009' },
                { value: SITE.rating + '/5', label: SITE.reviewCount + ' Google Reviews' },
                { value: '12 Months', label: 'Repair Warranty' },
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

      {/* Technical Detail */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">Understanding Mac Mini Power Architecture</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              The Mac Mini is Apple&apos;s most compact desktop. Every generation since the original 2005 model has packed a full computer into an aluminium enclosure roughly 19.7 centimetres square. Because it draws power directly from mains, it has no rechargeable lithium battery — but it does have two critical power components that bring machines into our Hyde Park workshop regularly: the internal power supply unit and the PRAM coin cell.
            </p>
            <p>
              The power supply unit converts 220-volt South African mains electricity into the 12-volt and 5-volt rails that the logic board requires. In the Intel Mac Mini 2018 (A1993), this is a compact switching PSU rated at 150 watts, mounted in the top section of the enclosure. The Mac Mini M1 (A2348) and M2 (A2686) reduced maximum power draw to 150 watts and 39 watts respectively, but both still contain internal PSUs of similar design. These power supplies are the component most directly exposed to mains voltage — and therefore the most vulnerable to the surges, brownouts, and transients that accompany load shedding in Johannesburg.
            </p>
            <p>
              We have documented a clear correlation in our workshop records. During Stages 4 through 6 in 2023 and early 2024, Mac Mini PSU repairs increased by roughly 40% compared to the same period without load shedding. The failure mode is consistent: the input rectifier bridge or the primary-side filter capacitors fail when a voltage spike exceeds their rated tolerance. The Mac Mini simply stops powering on. No light on the front panel. No fan spin. Nothing. The logic board is usually fine — the PSU absorbed the damage.
            </p>
            <p>
              The PRAM battery is a different matter entirely. This is a standard CR2032 lithium coin cell — the same one used in wristwatches and car key fobs. It sits on the logic board and maintains the non-volatile RAM that stores date, time, timezone, startup disk selection, display resolution, and speaker volume when the Mac Mini is disconnected from power. Under normal conditions, a CR2032 lasts 5 to 7 years. But in load shedding conditions, where the Mac Mini loses and regains power multiple times daily, the PRAM battery is accessed far more frequently than Apple intended. We are seeing PRAM batteries fail at 3 to 4 years in Johannesburg machines.
            </p>
            <p>
              The third power-related component is the power board itself — the section of the logic board that manages voltage regulation, power sequencing, and the power button circuit. A blown power management integrated circuit (PMIC) or a shorted capacitor on the power rail can mimic a dead PSU. This is why our diagnostic process always tests the PSU independently before recommending a replacement. In roughly 20% of &quot;dead Mac Mini&quot; cases we see, the PSU is actually fine and the fault is a R2 to R15 surface-mount component on the logic board. Board-level repair on these is significantly cheaper than PSU replacement.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">Mac Mini Power &amp; Battery Repair Pricing</h2>
          <p className="text-[#7A9E98] mb-8 max-w-3xl leading-relaxed">
            Pricing depends on the Mac Mini model and the specific fault. PRAM battery replacement is straightforward and affordable. Power supply repairs vary by model — the M-series Minis are simpler than the 2018 Intel model. All prices include parts, labour, and a 12-month warranty.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-[rgba(255,255,255,0.06)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.08)] bg-[rgba(15,234,122,0.06)]">
                  <th className="text-left text-[#E8F4F1] font-semibold px-5 py-4">Repair Type</th>
                  <th className="text-left text-[#E8F4F1] font-semibold px-5 py-4">Models</th>
                  <th className="text-left text-[#0FEA7A] font-semibold px-5 py-4">From</th>
                  <th className="text-left text-[#E8F4F1] font-semibold px-5 py-4">Turnaround</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { type: 'PRAM / CMOS Battery (CR2032)', models: 'All Mac Mini models', from: 'R599', turnaround: '1-2 hrs' },
                  { type: 'Power Supply Unit (PSU) Replacement', models: 'Mac Mini 2014 / 2018 Intel', from: 'R1,899', turnaround: '2-4 hrs' },
                  { type: 'Power Supply Unit (PSU) Replacement', models: 'Mac Mini M1 / M2 / M2 Pro', from: 'R1,299', turnaround: '1-3 hrs' },
                  { type: 'Power Board / PMIC Repair', models: 'All Mac Mini models', from: 'R1,499', turnaround: '2-5 days' },
                  { type: 'Full Power Diagnostic', models: 'All Mac Mini models', from: 'R599', turnaround: '30-60 min' },
                ].map((row, i) => (
                  <tr key={`${row.type}-${row.models}`} className={`border-b border-[rgba(255,255,255,0.04)] ${i % 2 === 0 ? 'bg-[#0A1A18]' : 'bg-[#111C1A]'}`}>
                    <td className="text-[#E8F4F1] px-5 py-4 font-medium">{row.type}</td>
                    <td className="text-[#7A9E98] px-5 py-4">{row.models}</td>
                    <td className="text-[#0FEA7A] px-5 py-4 font-bold">{row.from}</td>
                    <td className="text-[#7A9E98] px-5 py-4">{row.turnaround}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[#7A9E98] text-xs mt-4">
            Assessment from R599 — applied toward repair cost if you proceed. No Fix No Fee. All repairs include a written 12-month warranty.
          </p>
        </div>
      </section>

      {/* Load Shedding Section */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Load Shedding and Your Mac Mini</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              The Mac Mini is uniquely vulnerable to load shedding damage. Unlike a MacBook, which has an internal battery that absorbs power fluctuations, the Mac Mini is connected directly to the grid. Every power cut and every power restoration event hits the Mac Mini&apos;s PSU without any buffer. The moment power returns — often with an initial voltage spike — the PSU must handle a transient that can exceed its rated input by 50% or more.
            </p>
            <p>
              In our Hyde Park workshop, we track the cause of every Mac Mini power failure. Over the past 18 months, approximately 65% of Mac Mini PSU repairs we have performed were directly attributable to load shedding surge damage. The pattern is unmistakable: the machine worked fine before the power cut, and failed to turn on after power returned. In some cases, the owner heard a faint pop from the Mac Mini during the power restoration — that is the sound of a capacitor or rectifier failing.
            </p>
            <p>
              The most effective protection is a UPS with automatic voltage regulation. Not a basic surge protector strip — those are insufficient for the sustained voltage instability that accompanies load shedding. A proper line-interactive UPS rated at 600 VA or higher will maintain clean, stable power to the Mac Mini during brownouts and will switch to battery during a full outage. For a machine that costs R10,000 to R25,000 to replace, a R1,000 UPS is the obvious investment. We recommend specific models during every Mac Mini consultation.
            </p>
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8">Our Mac Mini Power Repair Process</h2>
          <div className="space-y-6">
            {[
              {
                step: 1,
                title: 'Walk-In Power Diagnostic',
                desc: 'No appointment needed. We test the PSU output voltages independently using a bench power supply and multimeter. If the PSU delivers correct rails (12V, 5V, 3.3V), we move to logic board diagnostics. If not, we identify the failed PSU component. Written quote within 30 minutes. Assessment from R599.',
              },
              {
                step: 2,
                title: 'Isolate the Fault',
                desc: 'Roughly 20% of "dead Mac Mini" cases have a working PSU and a logic board power fault — a blown PMIC, shorted capacitor, or corroded power connector. We test each rail under load to identify the exact failure point. This distinction matters because board-level component repair can be significantly cheaper than full PSU replacement.',
              },
              {
                step: 3,
                title: 'PSU Replacement or Board Repair',
                desc: 'For PSU failures, we replace the entire unit with a tested OEM-equivalent module. For board-level faults, we perform component-level repair under magnification — replacing the specific IC, capacitor, or resistor that failed. The Mac Mini M1 and M2 are particularly straightforward due to their modular internal layout.',
              },
              {
                step: 4,
                title: 'PRAM Battery Check',
                desc: 'While the Mac Mini is open, we test the CR2032 PRAM battery voltage. A fresh cell reads 3.0 to 3.3 volts. Below 2.5 volts, we replace it as part of the service — no additional charge if combined with a PSU repair. This prevents the date/time reset issues that plague Mac Minis in load shedding conditions.',
              },
              {
                step: 5,
                title: 'Burn-In Test and Collection',
                desc: 'After repair, we run a 2-hour burn-in test: sustained CPU load to stress the power delivery, multiple power cycles to verify cold boot reliability, and voltage measurement at the logic board under load. We verify stable operation before the machine leaves. You collect with a written 12-month warranty and our UPS recommendation.',
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[rgba(15,234,122,0.1)] border border-[rgba(15,234,122,0.25)] flex items-center justify-center">
                  <span className="text-[#0FEA7A] font-bold text-sm">{step}</span>
                </div>
                <div>
                  <h3 className="text-[#E8F4F1] font-bold mb-1">{title}</h3>
                  <p className="text-[#7A9E98] text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPS Recommendations */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">UPS Recommendations for Mac Mini in South Africa</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              After every Mac Mini power repair, we advise on UPS protection. The most common mistake we see is owners buying a basic surge protector strip and assuming they are protected. A surge strip provides a single layer of protection against voltage spikes, but offers nothing during a brownout (sustained under-voltage) or during the transition from grid power to generator power in buildings with backup generators. A proper UPS is a fundamentally different device.
            </p>
            <p>
              For a Mac Mini setup — the Mini itself plus an external display and a router — we recommend a line-interactive UPS rated at 600 VA minimum. The Mac Mini M1 draws only 39 watts at peak, but your display may draw 40 to 80 watts and your router another 12 to 20 watts. A 600 VA UPS handles this comfortably and provides 15 to 30 minutes of battery runtime during a full outage. That is enough to save your work, close applications, and shut down gracefully.
            </p>
            <p>
              Specific models we have tested and recommend to clients in Johannesburg: the APC Back-UPS BX600CI-ZA (approximately R1,200 from Takealot or Incredible Connection), the Mecer 650 VA line-interactive (approximately R900), and the RCT 850 VA with AVR (approximately R1,100). All three are available locally, carry South African warranties, and include the automatic voltage regulation that is essential for Johannesburg&apos;s unstable grid. We do not sell UPS units — this is honest advice based on what we see working in the field.
            </p>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Service Area — Mac Mini Power Repair</h2>
          <p className="text-[#7A9E98] mb-6 leading-relaxed">
            Walk in to our Hyde Park workshop or arrange collection. The Mac Mini is compact and easy to transport — most clients simply bring it in a bag. We serve all northern Johannesburg suburbs and beyond.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
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
          <p className="text-[#7A9E98] text-sm">
            Also covering Kempton Park, Pretoria, and Centurion by arrangement. Call {CONTACT.phone} to confirm.
          </p>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={null}>
            <GoogleReviews />
          </Suspense>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Mac Mini Power & Battery Repair — Common Questions" />
        </div>
      </section>

      {/* Related Services */}
      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Repairs</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'All Battery Replacements', href: '/battery-replacement' },
              { label: 'Mac Mini Logic Board Repair', href: '/logic-board-repair/mac-mini' },
              { label: 'MacBook Pro Battery', href: '/battery-replacement/macbook-pro' },
              { label: 'MacBook Air M1 Battery', href: '/battery-replacement/macbook-air-m1' },
              { label: 'Logic Board Repair', href: '/logic-board-repair' },
              { label: 'Screen Repair', href: '/screen-repair' },
              { label: 'iMac Power Repair', href: '/battery-replacement/imac' },
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
      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Mac Mini Not Powering On?</h2>
            <p className="text-[#7A9E98] mb-6 max-w-xl mx-auto leading-relaxed">
              WhatsApp us your Mac Mini model and a description of the fault — dead, intermittent, or losing settings after power cuts — and we will give you an honest assessment and price. Free diagnostic. Same-day service for most repairs. No Fix No Fee.
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
              1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | Assessment from R599 | 12-month warranty
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
