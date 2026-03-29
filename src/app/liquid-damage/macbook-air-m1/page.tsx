import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, ArrowRight, Shield, MapPin, Droplets, AlertTriangle, Cpu, Zap, Wind } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildServiceSchema, buildBreadcrumbSchema } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, SITE, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Air M1 Liquid Damage Repair Johannesburg | ZA Support',
  description:
    'MacBook Air M1 liquid damage repair in Johannesburg. Fanless design means liquid pools on the board instead of spreading. Thinner chassis concentrates damage. Assessment from R599. Hyde Park.',
  alternates: { canonical: 'https://zasupport.com/liquid-damage/macbook-air-m1' },
  keywords: [
    'MacBook Air M1 liquid damage repair Johannesburg',
    'MacBook Air M1 water damage repair',
    'M1 MacBook Air spill repair Johannesburg',
    'MacBook Air M1 corrosion repair Hyde Park',
    'liquid damaged MacBook Air M1 fix',
    'MacBook Air M1 coffee spill repair Johannesburg',
    'fanless MacBook Air liquid damage repair',
    'MacBook Air M1 liquid damage assessment from R599',
  ],
};

const breadcrumbItems = [
  { label: 'Liquid Damage', href: '/liquid-damage' },
  { label: 'MacBook Air M1' },
];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Liquid Damage', url: 'https://zasupport.com/liquid-damage' },
  { name: 'MacBook Air M1', url: 'https://zasupport.com/liquid-damage/macbook-air-m1' },
];

const faqs = [
  {
    question: 'Can a liquid-damaged MacBook Air M1 be repaired?',
    answer:
      'Yes, in the majority of cases. The MacBook Air M1 has a simpler board layout than the MacBook Pro, with fewer peripheral chips, which often works in its favour for liquid damage recovery. The main risk is the fanless design — without airflow to distribute liquid, spills concentrate on a smaller area of the board. At ZA Support in Hyde Park, we have successfully recovered MacBook Air M1 units even after significant spills. Assessment from R599.',
  },
  {
    question: 'Why is liquid damage worse on a fanless MacBook Air M1?',
    answer:
      'On a MacBook Pro with fans, liquid that enters the chassis is partially distributed by airflow and fan blade rotation, spreading it across a larger area in thinner amounts. The MacBook Air M1 has no fan at all — liquid pools directly on the logic board and stays there. This concentrated pooling causes deeper corrosion in a smaller area, often affecting multiple critical components simultaneously. The thinner chassis also means less physical distance between the keyboard and the board.',
  },
  {
    question: 'How much does MacBook Air M1 liquid damage repair cost?',
    answer:
      'Repair cost depends on the extent of damage. A keyboard-only replacement where no liquid reached the logic board is the most affordable option. Minor board corrosion requiring ultrasonic cleaning and targeted component repair costs more. Extensive corrosion with multiple IC replacements is the most complex case. All repairs are quoted upfront before we proceed. Assessment from R599. No Fix No Fee.',
  },
  {
    question: 'My MacBook Air M1 got wet but seems fine — should I still get it checked?',
    answer:
      'Absolutely yes. This is the single most common mistake we see. The MacBook Air M1 may appear to function normally after a spill, but corrosion is progressive. Mineral residue from the liquid continues to corrode traces and component pads for days and weeks after the initial exposure. We regularly see machines that "worked fine" for a week after a spill, then died suddenly. Preventative ultrasonic cleaning costs far less than emergency repair after full failure.',
  },
  {
    question: 'Can you recover data from a water-damaged MacBook Air M1?',
    answer:
      'Yes, in most cases. The MacBook Air M1 stores data on NAND flash chips that are separate from the M1 die. Even if the logic board cannot be economically repaired, we can usually extract your data by reading the storage chips directly. Data recovery is assessed as part of our R599 diagnostic.',
  },
  {
    question: 'How long does MacBook Air M1 liquid damage repair take?',
    answer:
      'Assessment is completed within 24 hours. Simple repairs such as keyboard or trackpad replacement take 24-48 hours. Full logic board ultrasonic cleaning and component repair takes 48-72 hours. Complex multi-component repairs take 3-5 business days. We confirm the exact timeline in the written quote before proceeding.',
  },
  {
    question: 'Is a liquid-damaged MacBook Air M1 worth repairing?',
    answer:
      'In most cases, absolutely. A new MacBook Air M1 replacement costs R15,000-R25,000 depending on specification, and the M1 model is no longer sold new by Apple. Our component-level repairs cost a fraction of replacement price, preserve all your data, and come with up-to-3 year warranty. If repair is not economical, we tell you honestly during the assessment.',
  },
  {
    question: 'Does the MacBook Air M1 have liquid contact indicators?',
    answer:
      'Yes. Apple installs liquid contact indicators inside the MacBook Air M1 chassis. These small white stickers turn red or pink when exposed to liquid. Apple uses triggered LCIs to void warranty claims. ZA Support repairs liquid-damaged machines regardless of indicator status — our focus is restoring your machine, not enforcing warranty exclusions.',
  },
  {
    question: 'Do you collect liquid-damaged MacBook Airs from across Johannesburg?',
    answer:
      'Yes. ZA Support offers same-day collection from Sandton, Rosebank, Fourways, Bryanston, Midrand, Randburg, and all surrounding Johannesburg suburbs. For liquid damage, time is the most important factor — contact us immediately on 064 529 5863.',
  },
];

const airM1FailurePoints = [
  {
    title: 'Liquid Pooling on Logic Board (Fanless Design)',
    desc: 'The defining characteristic of MacBook Air M1 liquid damage. Without a fan to distribute liquid or create airflow that aids evaporation, spills pool directly on the logic board. We regularly open MacBook Air M1 units and find a concentrated puddle of residue sitting on the SoC area — corrosion in these cases is deep and localised rather than spread across the board.',
    severity: 'high',
  },
  {
    title: 'Keyboard to Board — Minimal Gap',
    desc: 'The MacBook Air M1 chassis is 15.6mm at its thickest point — significantly thinner than the MacBook Pro. This means there is very little physical distance between the keyboard surface and the logic board. A spill on the keyboard reaches the board in seconds, not minutes. In our experience, keyboard spills on the Air M1 cause board-level damage in roughly 60% of cases, compared to about 35% on the thicker MacBook Pro.',
    severity: 'high',
  },
  {
    title: 'USB-C Controller Corrosion',
    desc: 'The MacBook Air M1 has only two USB-C/Thunderbolt 3 ports, both on the left side. Liquid entering via these ports corrodes the CD3217 USB-C controller IC, disabling charging and all external connectivity. We replace these controllers individually at the component level — a targeted repair that avoids full board replacement.',
    severity: 'medium',
  },
  {
    title: 'Power Management IC Failure',
    desc: 'The MacBook Air M1 uses a streamlined power delivery system optimised for its 49.9Wh battery. Liquid contamination on the PMIC circuits causes incorrect voltage delivery to the M1 die. We test every power rail under oscilloscope before attempting to power on a liquid-damaged Air M1 board to prevent secondary damage to the SoC.',
    severity: 'high',
  },
  {
    title: 'Display Connector Corrosion',
    desc: 'On the MacBook Air M1, the display flex cable connects at the top edge of the logic board. Liquid that enters from the keyboard area can wick along the board edge and corrode the display connector, causing flickering, dead pixels, or complete display failure. Connector repair restores the display without replacing the entire Retina panel.',
    severity: 'medium',
  },
  {
    title: 'Speaker and Audio Codec Damage',
    desc: 'The MacBook Air M1 speakers sit on either side of the keyboard. Large spills frequently saturate both speaker assemblies. The audio codec IC, positioned near the left speaker, is particularly vulnerable. Crackling, distortion, or complete audio failure results. Both speakers and the codec are individually replaceable components.',
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
  high: 'Critical',
  medium: 'Moderate',
  low: 'Repairable',
};

const faqSchema = buildFaqSchema(faqs);
const serviceSchema = buildServiceSchema({
  name: 'MacBook Air M1 Liquid Damage Repair Johannesburg',
  description: 'Professional MacBook Air M1 liquid damage repair in Johannesburg. Fanless design specialist. Ultrasonic cleaning, component-level repair. Assessment from R599. Up-to-3 year warranty.',
});
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

export default function MacBookAirM1LiquidDamagePage() {
  const whatsappUrl = buildWhatsAppUrl('LIQ-MBAM1-HERO', 'liquid-damage');

  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      {/* Hero */}
      <section className="hero-gradient grid-overlay pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Air M1 Liquid Damage
              <br /><span className="text-[#0FEA7A]">Repair Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              The MacBook Air M1&apos;s fanless design is brilliant for silence — but it means liquid pools on the board instead of being distributed by airflow. The thinner chassis leaves almost no gap between keyboard and logic board. We know this machine inside out.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | Assessment from R599 | Collection across Johannesburg</span>
            </div>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Shield, label: 'No Fix No Fee' },
                { icon: Droplets, label: 'Ultrasonic Cleaning' },
                { icon: Wind, label: 'Fanless Design Specialist' },
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
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
                WhatsApp for Urgent Help
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link href="/liquid-damage" className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all">
                All Liquid Damage <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)]">
              {[
                { value: '500+', label: 'Liquid Damage Recoveries' },
                { value: SITE.yearsExperience + ' Years', label: 'In Business Since 2009' },
                { value: SITE.rating + '/5', label: SITE.reviewCount + ' Google Reviews' },
                { value: 'Covered', label: 'Up-to-3 Year Warranty' },
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

      {/* Why Fanless Is Different */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">Why the Fanless Design Makes Liquid Damage More Severe</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed mb-8">
            <p>The MacBook Air M1 (A2337) was Apple&apos;s first fanless laptop with the M1 chip, and it is a remarkable machine — silent, efficient, and powerful. But that fanless design creates a specific vulnerability when liquid enters the chassis that most owners do not realise until it is too late.</p>
            <p>On a MacBook Pro with an active fan, liquid that enters the chassis is partially distributed by airflow. The fan blade rotation flings droplets outward, spreading them across a wider area of the board in thinner layers. This is not ideal, but it means corrosion develops more slowly and across more surface area, often leaving critical components untouched long enough for professional intervention.</p>
            <p>The MacBook Air M1 has no fan. Liquid that enters through the keyboard — the most common entry point, accounting for over 70% of our Air M1 liquid damage cases — drips straight down and pools on the logic board. There is no airflow to distribute it, no fan to deflect it. The liquid sits in a concentrated puddle directly on the board, and corrosion begins immediately at full intensity in that localised area.</p>
            <p>The chassis thickness compounds the problem. At 15.6mm at its thickest point and tapering to 4.1mm at the front edge, the MacBook Air M1 has remarkably little internal space. The distance between the bottom of the keyboard and the top of the logic board is minimal — we have measured as little as 2mm in some areas. A teaspoon of coffee on the keyboard can reach the M1 SoC in seconds, not minutes.</p>
            <p>In our Hyde Park workshop, we have adapted our M1 Air repair process specifically for these concentrated damage patterns. Our ultrasonic cleaning protocol for the Air M1 uses extended soak times to penetrate the deeper corrosion layers that form when liquid pools rather than spreads. The results are excellent when clients bring the machine in quickly — the same board that would be a straightforward clean at 6 hours can become an IC replacement job at 48 hours.</p>
          </div>
        </div>
      </section>

      {/* Failure Points */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">MacBook Air M1 Liquid Damage Failure Points</h2>
          <p className="text-[#7A9E98] mb-10 max-w-3xl leading-relaxed">
            After repairing hundreds of liquid-damaged MacBook Air M1 units, we have mapped the failure patterns specific to this model. The fanless design creates unique damage concentrations that differ from MacBook Pro patterns.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {airM1FailurePoints.map((item) => (
              <div key={item.title} className={`rounded-2xl border p-6 ${severityColours[item.severity]}`}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-[#E8F4F1] font-bold text-lg">{item.title}</h3>
                  <span className={`flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${severityBadgeColours[item.severity]}`}>
                    {severityLabels[item.severity]}
                  </span>
                </div>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 p-5 rounded-xl border border-[rgba(15,234,122,0.15)] bg-[rgba(15,234,122,0.04)] flex items-start gap-4">
            <Shield className="w-5 h-5 text-[#0FEA7A] flex-shrink-0 mt-0.5" />
            <p className="text-[#7A9E98] text-sm leading-relaxed">
              All repairs are quoted before work begins. No Fix No Fee on every case — if we cannot repair your MacBook Air M1, an assessment fee of R599 applies and the machine is returned as received. Up-to-3 year warranty on all completed repairs.
            </p>
          </div>
        </div>
      </section>

      {/* Apple vs ZA Support */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Apple vs ZA Support: MacBook Air M1 Liquid Damage</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="glass-card p-6 border border-red-500/20">
              <h3 className="text-red-400 font-bold mb-3">Apple Store / iStore</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2">
                <li>Full logic board replacement — R12,000 to R28,000</li>
                <li>Liquid damage excluded from standard AppleCare</li>
                <li>MacBook Air M1 no longer sold new — parts limited</li>
                <li>Data may not survive board replacement</li>
                <li>5-10 business day turnaround via depot</li>
              </ul>
            </div>
            <div className="glass-card p-6 border border-[rgba(15,234,122,0.3)]">
              <h3 className="text-[#0FEA7A] font-bold mb-3">ZA Support</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2">
                <li>Component-level repair — only failed parts replaced</li>
                <li>Assessment from R599, repair quoted individually</li>
                <li>Data preserved on the same logic board</li>
                <li>Fanless design expertise — adapted cleaning protocol</li>
                <li>Turnaround 24-72 hours, up-to-3 year warranty</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Steps */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-[#F5A623]" />
            <p className="text-[#F5A623] text-sm font-semibold uppercase tracking-wider">MacBook Air M1 Emergency Guide</p>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">Spilled Liquid on Your MacBook Air M1?</h2>
          <p className="text-[#7A9E98] leading-relaxed mb-10">
            The Air M1&apos;s thin chassis means liquid reaches the board faster than on any MacBook Pro. Follow these steps immediately for the best recovery chance.
          </p>
          <div className="space-y-5">
            {[
              { step: '1', title: 'Force power off immediately — hold Touch ID for 10 seconds', detail: 'The MacBook Air M1 draws power even in sleep mode. Liquid on a powered board causes electrolytic corrosion within minutes. Force power off removes voltage from all circuits immediately. Do not attempt a clean shutdown.', urgent: true },
              { step: '2', title: 'Disconnect the USB-C charger and any cables', detail: 'The MacBook Air M1 has two USB-C ports on the left side. Remove all cables immediately. Any connected power source energises the corroding circuits and dramatically accelerates damage.', urgent: true },
              { step: '3', title: 'Flip the Air upside down, keyboard facing down', detail: 'This is especially critical on the Air M1 because of the thin chassis. Flipping the machine uses gravity to pull liquid away from the logic board. Hold it keyboard-down over a towel for 2-3 minutes.', urgent: false },
              { step: '4', title: 'Do NOT use rice, a hairdryer, or attempt to charge it', detail: 'Rice absorbs some moisture but does nothing for the corrosive residue destroying your board traces. A hairdryer can warp the Air M1 thin aluminium chassis and drives moisture into BGA connections. Charging a wet board is the single most destructive action possible.', urgent: true },
              { step: '5', title: 'Bring it to ZA Support the same day — 064 529 5863', detail: 'The concentrated damage pattern on the fanless Air M1 progresses faster than on any MacBook Pro. In our experience, the difference between a clean-and-restore job and a multi-IC replacement is often just 12-24 hours. Same-day collection available across Johannesburg.', urgent: false },
            ].map((item) => (
              <div key={item.step} className={`flex gap-5 p-6 rounded-2xl border ${item.urgent ? 'border-[rgba(245,87,54,0.25)] bg-[rgba(245,87,54,0.04)]' : 'border-[rgba(15,234,122,0.15)] bg-[rgba(15,234,122,0.03)]'}`}>
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-extrabold ${item.urgent ? 'bg-[rgba(245,87,54,0.15)] text-[#F55736]' : 'bg-[rgba(15,234,122,0.12)] text-[#0FEA7A]'}`}>
                  {item.step}
                </div>
                <div>
                  <h3 className="text-[#E8F4F1] font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-[#7A9E98] leading-relaxed text-sm">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="MacBook Air M1 Liquid Damage — Common Questions" />
        </div>
      </section>

      {/* Related Services */}
      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Repairs</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'All Liquid Damage', href: '/liquid-damage' },
              { label: 'MacBook Pro Liquid Damage', href: '/liquid-damage/macbook-pro' },
              { label: 'MacBook Pro M1 Liquid Damage', href: '/liquid-damage/macbook-pro-m1' },
              { label: 'MacBook Pro M2 Liquid Damage', href: '/liquid-damage/macbook-pro-m2' },
              { label: 'MacBook Air M1 Logic Board', href: '/logic-board-repair/macbook-air-m1' },
              { label: 'Logic Board Hub', href: '/logic-board-repair' },
              { label: 'Contact Us', href: '/contact' },
              { label: 'MacBook Air Repair', href: '/macbook-air-repair' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">MacBook Air M1 Liquid Damage? Act Now.</h2>
            <p className="text-[#7A9E98] mb-6 max-w-xl mx-auto leading-relaxed">
              The fanless Air M1 concentrates liquid damage faster than any MacBook Pro. WhatsApp us now — we will guide you through the next steps and arrange same-day collection across Johannesburg.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
                WhatsApp for Urgent Help
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
            <p className="text-[#7A9E98] text-xs mt-6">
              1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | Assessment from R599 | Up-to-3 year warranty
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
