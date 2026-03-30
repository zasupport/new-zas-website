import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, ArrowRight, Shield, MapPin, Droplets, AlertTriangle, Cpu, Zap } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildServiceSchema, buildBreadcrumbSchema } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, SITE, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Pro M1 Liquid Damage Repair Johannesburg | ZA Support',
  description:
    'MacBook Pro M1 liquid damage repair in Johannesburg. Unified memory architecture means spills affect CPU, GPU and RAM simultaneously. Ultrasonic cleaning, component-level repair. Assessment from R599. Hyde Park.',
  alternates: { canonical: 'https://zasupport.com/liquid-damage/macbook-pro-m1' },
  keywords: [
    'MacBook Pro M1 liquid damage repair Johannesburg',
    'MacBook Pro M1 water damage repair',
    'M1 MacBook Pro spill repair Johannesburg',
    'MacBook Pro M1 corrosion repair Hyde Park',
    'liquid damaged MacBook Pro M1 fix',
    'MacBook Pro M1 USB-C corrosion repair',
    'M1 MacBook Pro coffee spill repair Johannesburg',
    'MacBook Pro M1 liquid damage assessment from R599',
  ],
};

const breadcrumbItems = [
  { label: 'Liquid Damage', href: '/liquid-damage' },
  { label: 'MacBook Pro', href: '/liquid-damage/macbook-pro' },
  { label: 'M1' },
];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Liquid Damage', url: 'https://zasupport.com/liquid-damage' },
  { name: 'MacBook Pro', url: 'https://zasupport.com/liquid-damage/macbook-pro' },
  { name: 'MacBook Pro M1', url: 'https://zasupport.com/liquid-damage/macbook-pro-m1' },
];

const faqs = [
  {
    question: 'Can a liquid-damaged MacBook Pro M1 be repaired?',
    answer:
      'Yes, in most cases. The M1 chip itself is remarkably resilient — we find that liquid damage on M1 MacBook Pros typically destroys peripheral circuits first: USB-C controllers, power management ICs, and audio amplifiers. These are all individually repairable components. At ZA Support in Hyde Park, we have successfully recovered M1 MacBook Pros even after significant spills. Assessment from R599.',
  },
  {
    question: 'Why is M1 liquid damage different from Intel MacBook Pro liquid damage?',
    answer:
      'The M1 chip uses a unified memory architecture — CPU, GPU, Neural Engine, and RAM all sit on a single die. On Intel MacBook Pros, liquid might destroy the RAM modules but leave the CPU intact. On the M1, if the liquid reaches the SoC and causes corrosion on its BGA connections, all processing capability is lost simultaneously. This makes early intervention even more critical for M1 models.',
  },
  {
    question: 'How much does MacBook Pro M1 liquid damage repair cost?',
    answer:
      'The cost depends entirely on the severity and location of the damage. A keyboard-only spill with no logic board involvement is the most affordable repair. USB-C board corrosion requiring controller replacement costs more. Severe logic board corrosion with multiple IC failures is the most complex case. We confirm the exact cost before any work begins. Assessment from R599. No Fix No Fee.',
  },
  {
    question: 'My M1 MacBook Pro got wet but still works — do I need repair?',
    answer:
      'Yes, absolutely. This is the most dangerous scenario. Corrosion is progressive — your M1 MacBook Pro may function today but fail within days or weeks as corrosion spreads across board traces. We see this pattern weekly in our Hyde Park workshop. Bring it in immediately for ultrasonic cleaning to halt the corrosion before it causes permanent damage.',
  },
  {
    question: 'Can you recover data from a water-damaged MacBook Pro M1?',
    answer:
      'In most cases, yes. On M1 MacBook Pros, the NAND flash storage is a separate component from the M1 die. Even if the logic board is beyond repair, we can usually recover data by reading the storage chips directly. Data recovery is assessed as part of our R599 diagnostic.',
  },
  {
    question: 'How long does M1 MacBook Pro liquid damage repair take?',
    answer:
      'Assessment is completed within 24 hours. Simple repairs such as USB-C board replacement take 24-48 hours. Full logic board cleaning and component-level repair typically takes 48-72 hours. Complex multi-site corrosion with IC replacement takes 3-5 business days. We provide a specific timeline in the written quote.',
  },
  {
    question: 'Does the M1 MacBook Pro have liquid contact indicators?',
    answer:
      'Yes. Apple places liquid contact indicators (LCIs) inside all MacBook Pro models, including the M1. These small white stickers turn red or pink on liquid contact. Apple uses triggered LCIs to void warranty coverage. We repair liquid-damaged machines regardless of LCI status — our focus is on restoring function, not voiding warranties.',
  },
  {
    question: 'Is it worth repairing a liquid-damaged M1 MacBook Pro or should I buy new?',
    answer:
      'In the vast majority of cases, repair is significantly more cost-effective. A new MacBook Pro M1 replacement costs R20,000-R50,000 depending on specification. Our component-level repairs cost a fraction of this, and we preserve your existing data on the same machine. We provide an honest assessment — if repair is not economical, we tell you upfront.',
  },
  {
    question: 'Do you collect liquid-damaged MacBook Pros from across Johannesburg?',
    answer:
      'Yes. ZA Support offers collection from Sandton, Rosebank, Fourways, Bryanston, Midrand, Randburg, and surrounding Johannesburg suburbs. For liquid damage cases, we recommend bringing the machine in as quickly as possible — every hour matters. Contact us on 064 529 5863 to arrange immediate collection.',
  },
];

const m1FailurePoints = [
  {
    title: 'USB-C Port Corrosion Spreading to SoC',
    desc: 'The most common M1 liquid damage pattern we see. Liquid enters through the USB-C ports and corrodes the CD3217 controller IC. Because the USB-C data lines connect directly to the M1 die, corrosion can migrate along these traces from the port to the SoC. Early cleaning stops this progression.',
    severity: 'high',
  },
  {
    title: 'Power Management IC (PMIC) Failure',
    desc: 'The M1 MacBook Pro uses a complex power delivery system with multiple voltage rails feeding the SoC. Liquid contamination on PMIC circuits causes incorrect voltages, which can damage the M1 die itself. We test every power rail under our oscilloscope before powering on a liquid-damaged M1 board.',
    severity: 'high',
  },
  {
    title: 'Keyboard Deck to Logic Board Migration',
    desc: 'Coffee and tea spills on the keyboard seep through the scissor-switch mechanism and drip onto the logic board below. On the M1 MacBook Pro 13-inch, the logic board sits directly beneath the keyboard centre — liquid pooling on the SoC area is common after top-deck spills.',
    severity: 'medium',
  },
  {
    title: 'Audio Circuit and Speaker Damage',
    desc: 'Liquid frequently reaches the speaker assemblies and audio codec IC. On the M1 MacBook Pro, this causes crackling, distortion, or complete audio failure. Speaker replacement and audio IC repair restore full function without board replacement.',
    severity: 'low',
  },
  {
    title: 'Display Backlight Circuit Corrosion',
    desc: 'Corrosion on the backlight driver circuit causes a black screen even though the M1 chip and display panel are functioning normally. The backlight fuse and driver IC are repairable components — we replace these at the component level rather than swapping the entire display.',
    severity: 'medium',
  },
  {
    title: 'Thunderbolt Controller Failure',
    desc: 'The M1 Pro and M1 Max MacBook Pros include dedicated Thunderbolt 4 controllers. Liquid corrosion on these controllers causes external displays, docks, and high-speed peripherals to stop working. Controller replacement restores full Thunderbolt 4 functionality.',
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
  high: 'Critical',
  medium: 'Moderate',
  low: 'Repairable',
};

const faqSchema = buildFaqSchema(faqs);
const serviceSchema = buildServiceSchema({
  name: 'MacBook Pro M1 Liquid Damage Repair Johannesburg',
  description: 'Professional MacBook Pro M1 liquid damage repair in Johannesburg. Unified memory architecture specialist. Ultrasonic cleaning, component-level repair. Assessment from R599. Up-to-3 year warranty.',
});
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

export default function MacBookProM1LiquidDamagePage() {
  const whatsappUrl = buildWhatsAppUrl('LIQ-MBPM1-HERO', 'liquid-damage');

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
              MacBook Pro M1 Liquid Damage
              <br /><span className="text-[#0FEA7A]">Repair Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              The M1 chip&apos;s unified memory architecture means a single spill can take out CPU, GPU, and RAM simultaneously. We have repaired hundreds of liquid-damaged M1 MacBook Pros in our Hyde Park workshop — early intervention is everything.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | Assessment from R599 | Collection across Johannesburg</span>
            </div>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Shield, label: 'No Fix No Fee' },
                { icon: Droplets, label: 'Ultrasonic Cleaning' },
                { icon: Cpu, label: 'M1 Specialist' },
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
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all" >
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

      {/* Why M1 Is Different */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">Why M1 Liquid Damage Is More Dangerous Than Intel</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed mb-8">
            <p>The transition from Intel to Apple Silicon fundamentally changed what happens when liquid hits a MacBook Pro logic board. On Intel MacBook Pros, the CPU, GPU, and RAM were separate chips spread across the board. Liquid might destroy one component while leaving others intact. The M1 chip changed that equation entirely.</p>
            <p>Apple&apos;s M1 is a system-on-chip (SoC) — it integrates the CPU, GPU, Neural Engine, and unified memory onto a single die. In our Hyde Park workshop, we have seen the consequences of this architecture after liquid spills: corrosion that reaches the M1 die&apos;s BGA connections can disable all processing and memory functions simultaneously, turning a partially recoverable situation into a total loss.</p>
            <p>The critical difference is speed. On an Intel board, you might have days before corrosion reaches a vital component. On the M1 board, the USB-C controller traces run directly to the SoC — we have measured corrosion migrating from a USB-C port to the M1 die in under 48 hours. This is why we tell every M1 owner the same thing: power off immediately and bring it in within 24 hours.</p>
            <p>The good news is that the peripheral circuits — USB-C controllers (CD3217/CD3218), power management ICs, audio codecs, backlight drivers — are all discrete components that we can replace individually. In the majority of M1 liquid damage cases we handle, the M1 die itself survives because clients brought the machine in quickly enough for us to halt the corrosion before it reached the SoC.</p>
          </div>
        </div>
      </section>

      {/* M1 Failure Points */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">M1 MacBook Pro Liquid Damage Failure Points</h2>
          <p className="text-[#7A9E98] mb-10 max-w-3xl leading-relaxed">
            After repairing hundreds of liquid-damaged M1 MacBook Pros, we have mapped the most common failure patterns. Each failure point below is individually repairable at the component level.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {m1FailurePoints.map((item) => (
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
              All repairs quoted before work begins. No Fix No Fee on every case — if we cannot repair your M1 MacBook Pro, an assessment fee of R599 applies and the machine is returned exactly as received. Up-to-3 year warranty on all completed repairs.
            </p>
          </div>
        </div>
      </section>

      {/* Apple vs ZA Support */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Apple vs ZA Support: M1 Liquid Damage Repair</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="glass-card p-6 border border-red-500/20">
              <h3 className="text-red-400 font-bold mb-3">Apple Store / iStore</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2">
                <li>Entire logic board replacement — R18,000 to R48,000</li>
                <li>Liquid damage not covered by standard AppleCare</li>
                <li>Data may not be preserved during board swap</li>
                <li>Turnaround 5-10 business days via Apple depot</li>
                <li>No component-level diagnosis offered</li>
              </ul>
            </div>
            <div className="glass-card p-6 border border-[rgba(15,234,122,0.3)]">
              <h3 className="text-[#0FEA7A] font-bold mb-3">ZA Support</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2">
                <li>Component-level repair — only failed parts replaced</li>
                <li>Assessment from R599, repair quoted individually</li>
                <li>Data preserved on the same logic board</li>
                <li>Turnaround 24-72 hours for most cases</li>
                <li>Up-to-3 year warranty on all repairs</li>
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
            <p className="text-[#F5A623] text-sm font-semibold uppercase tracking-wider">M1 Emergency Guide</p>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">Spilled Liquid on Your M1 MacBook Pro?</h2>
          <p className="text-[#7A9E98] leading-relaxed mb-10">
            The M1&apos;s unified architecture means every second counts. Follow these steps immediately — they apply specifically to the M1 MacBook Pro 13-inch (A2338), 14-inch M1 Pro/Max (A2442), and 16-inch M1 Pro/Max (A2485).
          </p>
          <div className="space-y-5">
            {[
              { step: '1', title: 'Force power off immediately', detail: 'Hold the power button (Touch ID) for 10 seconds. Do not wait for a clean shutdown. On the M1, the SoC draws power continuously even in sleep mode — liquid on a powered board corrodes traces in minutes.', urgent: true },
              { step: '2', title: 'Disconnect everything — charger, peripherals, all USB-C cables', detail: 'Any connected USB-C cable provides a power path that accelerates electrolytic corrosion on the USB-C controller and M1 die traces. Remove every cable immediately.', urgent: true },
              { step: '3', title: 'Flip it keyboard-down onto a towel', detail: 'Gravity is your ally. The M1 MacBook Pro logic board sits below the keyboard — flipping the machine drains liquid away from the board rather than pooling on it.', urgent: false },
              { step: '4', title: 'Do NOT put it in rice, use a hairdryer, or attempt to charge it', detail: 'Rice does nothing for corrosion. Heat drives moisture deeper into BGA connections. Charging energises corroded traces. All three actions make the damage worse, not better.', urgent: true },
              { step: '5', title: 'Bring it to ZA Support within 24 hours', detail: 'In our experience with M1 boards, the difference between a R2,000 repair and an unrepairable board is often 24-48 hours of unchecked corrosion. Call us on 064 529 5863 for same-day collection.', urgent: false },
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
          <FAQAccordion items={faqs} title="MacBook Pro M1 Liquid Damage — Common Questions" />
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
              { label: 'MacBook Pro M2 Liquid Damage', href: '/liquid-damage/macbook-pro-m2' },
              { label: 'MacBook Air M1 Liquid Damage', href: '/liquid-damage/macbook-air-m1' },
              { label: 'M1 Logic Board Repair', href: '/logic-board-repair/macbook-pro-m1' },
              { label: 'Logic Board Hub', href: '/logic-board-repair' },
              { label: 'Contact Us', href: '/contact' },
              { label: 'MacBook Pro Repair', href: '/macbook-pro-repair' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">M1 MacBook Pro Liquid Damage? Act Now.</h2>
            <p className="text-[#7A9E98] mb-6 max-w-xl mx-auto leading-relaxed">
              Every minute counts with M1 liquid damage. WhatsApp us now — we will guide you through immediate steps and arrange same-day collection across Johannesburg.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all" >
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
