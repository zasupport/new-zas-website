import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, ArrowRight, Shield, MapPin, Droplets, AlertTriangle, Cpu, Zap } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildServiceSchema, buildBreadcrumbSchema } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, SITE, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Pro M2 Liquid Damage Repair Johannesburg | ZA Support',
  description:
    'MacBook Pro M2 liquid damage repair in Johannesburg. M2 NAND controller vulnerability, keyboard deck spill recovery, ultrasonic cleaning. Assessment from R599. Hyde Park.',
  alternates: { canonical: 'https://zasupport.com/liquid-damage/macbook-pro-m2' },
  keywords: [
    'MacBook Pro M2 liquid damage repair Johannesburg',
    'MacBook Pro M2 water damage repair',
    'M2 MacBook Pro spill repair Johannesburg',
    'MacBook Pro M2 corrosion repair Hyde Park',
    'liquid damaged MacBook Pro M2 fix',
    'MacBook Pro M2 keyboard spill repair',
    'M2 MacBook Pro coffee spill repair Johannesburg',
    'MacBook Pro M2 liquid damage assessment from R599',
  ],
};

const breadcrumbItems = [
  { label: 'Liquid Damage', href: '/liquid-damage' },
  { label: 'MacBook Pro', href: '/liquid-damage/macbook-pro' },
  { label: 'M2' },
];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Liquid Damage', url: 'https://zasupport.com/liquid-damage' },
  { name: 'MacBook Pro', url: 'https://zasupport.com/liquid-damage/macbook-pro' },
  { name: 'MacBook Pro M2', url: 'https://zasupport.com/liquid-damage/macbook-pro-m2' },
];

const faqs = [
  {
    question: 'Can a liquid-damaged MacBook Pro M2 be repaired?',
    answer:
      'Yes, in most cases. The M2 MacBook Pro uses the same unified architecture as the M1 but with improved power efficiency circuits that introduce different failure patterns after liquid exposure. We have repaired hundreds of M2 MacBook Pros with liquid damage in our Hyde Park workshop. Assessment from R599.',
  },
  {
    question: 'How does M2 liquid damage differ from M1 liquid damage?',
    answer:
      'The M2 chip has a more sensitive NAND flash controller compared to the M1. Liquid near the storage controller can corrupt the SSD firmware, causing the machine to fail to boot even after the board is cleaned. We have developed specific recovery procedures for M2 NAND controller issues that go beyond standard ultrasonic cleaning.',
  },
  {
    question: 'My MacBook Pro M2 keyboard got wet — is the logic board damaged?',
    answer:
      'Possibly. On the M2 MacBook Pro 13-inch, the keyboard ribbon cables route directly over the logic board. Liquid seeping through the keyboard mechanism follows these cables down to the board. Even a small keyboard spill can reach critical components within minutes. We recommend a full assessment regardless of whether the machine appears to work after drying.',
  },
  {
    question: 'How much does MacBook Pro M2 liquid damage repair cost?',
    answer:
      'Costs depend on the extent of damage. A keyboard-only replacement where no liquid reached the logic board is the most affordable. USB-C controller or NAND controller repair is moderately priced. Full board cleaning with multiple IC replacements is the most complex case. All repairs are quoted upfront. Assessment from R599. No Fix No Fee.',
  },
  {
    question: 'Can you recover data from a water-damaged MacBook Pro M2?',
    answer:
      'Yes, in most cases. The M2 MacBook Pro stores data on dedicated NAND flash chips. Even when the logic board is beyond economic repair, we can usually recover data by reading the NAND chips directly. However, if the NAND controller itself was damaged by liquid, recovery is more complex and requires specialised tools. We assess this during the R599 diagnostic.',
  },
  {
    question: 'How long does M2 MacBook Pro liquid damage repair take?',
    answer:
      'Assessment is completed within 24 hours. Simple repairs such as keyboard or trackpad replacement take 24-48 hours. Logic board ultrasonic cleaning and component repair typically takes 48-72 hours. NAND controller recovery adds an additional 24-48 hours. We confirm the exact timeline in the written quote.',
  },
  {
    question: 'Does AppleCare+ cover liquid damage on the M2 MacBook Pro?',
    answer:
      'Standard AppleCare does not cover liquid damage. AppleCare+ covers up to two incidents of accidental damage per year, but each incident incurs a service fee of approximately R4,500 for a MacBook Pro, and Apple replaces the entire logic board rather than repairing at component level. ZA Support repairs only the affected components at a fraction of the cost.',
  },
  {
    question: 'Is a liquid-damaged M2 MacBook Pro worth repairing?',
    answer:
      'Almost always, yes. A new MacBook Pro M2 costs R22,000-R55,000 depending on specification. Our component-level repairs typically cost a fraction of replacement. We preserve your data, your settings, and your machine. If repair is genuinely not economical, we tell you honestly during the assessment — no obligation beyond the R599 fee.',
  },
  {
    question: 'Do you collect M2 MacBook Pros from across Johannesburg?',
    answer:
      'Yes. We collect from Sandton, Rosebank, Fourways, Bryanston, Midrand, Randburg, and all surrounding Johannesburg suburbs. For liquid damage, speed is critical — call 064 529 5863 for same-day collection.',
  },
];

const m2FailurePoints = [
  {
    title: 'Keyboard Deck Spills via Ribbon Cables',
    desc: 'The most common M2 liquid damage scenario we encounter. Coffee or tea spills on the keyboard seep through the scissor mechanism and wick along the keyboard ribbon cable directly onto the logic board. On the M2 MacBook Pro 13-inch, this cable passes over the NAND controller area — a uniquely vulnerable path that we see exploited in roughly 40% of M2 liquid damage cases.',
    severity: 'high',
  },
  {
    title: 'NAND Flash Controller Sensitivity',
    desc: 'The M2 chip improved power efficiency by tightening voltage tolerances on the NAND flash controller. While this means better battery life, it also means the storage controller is more susceptible to corruption from liquid-induced voltage fluctuations. A contaminated power rail that an M1 might tolerate can cause the M2 NAND controller to enter a permanent error state.',
    severity: 'high',
  },
  {
    title: 'USB-C Controller Corrosion',
    desc: 'Like the M1, the M2 MacBook Pro uses CD3217/CD3218 USB-C controller ICs. Liquid entering via the USB-C ports corrodes these controllers, disabling charging and data transfer. We replace these controllers individually — a targeted repair that restores full USB-C function without replacing the entire board.',
    severity: 'medium',
  },
  {
    title: 'Power Management Circuit Contamination',
    desc: 'The M2 MacBook Pro has refined power delivery circuits with tighter tolerances than the M1. Liquid contamination on these circuits can cause cascading voltage faults that damage downstream components. We test every power rail under oscilloscope before powering on a liquid-damaged M2 board to prevent secondary damage.',
    severity: 'high',
  },
  {
    title: 'Audio Codec and Speaker Assembly',
    desc: 'Liquid frequently saturates the speaker assemblies, particularly after a large spill. The audio codec IC on the M2 board is positioned near the left speaker — corrosion here causes crackling, distortion, or complete audio failure. Both the speakers and codec IC are individually replaceable components.',
    severity: 'low',
  },
  {
    title: 'Display Connector and Backlight',
    desc: 'On M2 Pro and M2 Max MacBook Pros with Liquid Retina XDR displays, the display connector carries both data and backlight power. Corrosion on this connector causes intermittent display failures, flickering, or complete blackout. Connector cleaning or replacement restores the display without replacing the panel itself.',
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
  name: 'MacBook Pro M2 Liquid Damage Repair Johannesburg',
  description: 'Professional MacBook Pro M2 liquid damage repair in Johannesburg. NAND controller specialist. Ultrasonic cleaning, component-level repair. Assessment from R599. Up-to-3 year warranty.',
});
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

export default function MacBookProM2LiquidDamagePage() {
  const whatsappUrl = buildWhatsAppUrl('LIQ-MBPM2-HERO', 'liquid-damage');

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
              MacBook Pro M2 Liquid Damage
              <br /><span className="text-[#0FEA7A]">Repair Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              The M2 chip&apos;s improved power efficiency comes with a trade-off: its NAND controller is more sensitive to liquid contamination than the M1. Keyboard spills reach the logic board via ribbon cables faster than most owners realise. We have the tools and experience to save it.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | Assessment from R599 | Collection across Johannesburg</span>
            </div>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Shield, label: 'No Fix No Fee' },
                { icon: Droplets, label: 'Ultrasonic Cleaning' },
                { icon: Cpu, label: 'M2 Specialist' },
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
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all" target="_blank" rel="noopener noreferrer">
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

      {/* Why M2 Is Different */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">Why M2 Liquid Damage Requires Specialist Repair</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed mb-8">
            <p>The M2 MacBook Pro represented Apple&apos;s second generation of Apple Silicon, and it introduced subtle but significant changes to the board layout that affect how liquid damage manifests. In our Hyde Park workshop, we have observed patterns on M2 boards that do not appear on M1 boards — and vice versa.</p>
            <p>The most critical difference is the NAND flash controller. Apple redesigned the storage interface on the M2 to achieve faster read/write speeds with lower power consumption. The tighter voltage tolerances that enable this efficiency also make the controller more vulnerable to corruption from liquid-induced voltage fluctuations. We have seen M2 boards where the SoC, USB-C controllers, and power management circuits all survived a spill, but the NAND controller entered an unrecoverable error state because a contaminated power rail delivered 3.35V instead of 3.3V for a fraction of a second.</p>
            <p>The second pattern unique to the M2 is keyboard ribbon cable migration. On the M2 MacBook Pro 13-inch (A2338), the keyboard and trackpad ribbon cables route directly over the NAND controller area of the logic board. When liquid seeps through the keyboard, it follows these cables by capillary action and drips onto the most sensitive area of the board. We estimate that roughly 40% of the M2 keyboard spills we see result in NAND controller involvement — compared to approximately 15% on the M1.</p>
            <p>The good news: every peripheral component on the M2 board is individually repairable. USB-C controllers, power management ICs, audio codecs, backlight drivers, and even the NAND controller in many cases can be repaired or replaced at the component level. The key is getting the machine to us before corrosion spreads beyond repairable circuits.</p>
          </div>
        </div>
      </section>

      {/* M2 Failure Points */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">M2 MacBook Pro Liquid Damage Failure Points</h2>
          <p className="text-[#7A9E98] mb-10 max-w-3xl leading-relaxed">
            Based on our repair data from hundreds of M2 MacBook Pro liquid damage cases, these are the most common failure patterns. Each is individually diagnosed and repaired at the component level.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {m2FailurePoints.map((item) => (
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
              All repairs are quoted before work begins. No Fix No Fee on every case — if we cannot repair your M2 MacBook Pro, an assessment fee of R599 applies and the machine is returned as received. Up-to-3 year warranty on all completed repairs.
            </p>
          </div>
        </div>
      </section>

      {/* Apple vs ZA Support */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Apple vs ZA Support: M2 Liquid Damage Repair</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="glass-card p-6 border border-red-500/20">
              <h3 className="text-red-400 font-bold mb-3">Apple Store / iStore</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2">
                <li>Full logic board replacement — R22,000 to R55,000</li>
                <li>Liquid damage excluded from standard AppleCare</li>
                <li>AppleCare+ incident fee approximately R4,500</li>
                <li>Data may not survive board replacement</li>
                <li>5-10 business days via Apple depot repair</li>
              </ul>
            </div>
            <div className="glass-card p-6 border border-[rgba(15,234,122,0.3)]">
              <h3 className="text-[#0FEA7A] font-bold mb-3">ZA Support</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2">
                <li>Component-level repair — only failed parts replaced</li>
                <li>Assessment from R599, repair quoted individually</li>
                <li>Data preserved on the same logic board</li>
                <li>NAND controller recovery available</li>
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
            <p className="text-[#F5A623] text-sm font-semibold uppercase tracking-wider">M2 Emergency Guide</p>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">Spilled Liquid on Your M2 MacBook Pro?</h2>
          <p className="text-[#7A9E98] leading-relaxed mb-10">
            The M2&apos;s sensitive NAND controller makes speed critical. Follow these steps immediately — they apply to the M2 MacBook Pro 13-inch (A2338), 14-inch M2 Pro/Max (A2779), and 16-inch M2 Pro/Max (A2780).
          </p>
          <div className="space-y-5">
            {[
              { step: '1', title: 'Force power off — hold Touch ID for 10 seconds', detail: 'Do not wait for a normal shutdown. The M2 SoC draws power continuously in sleep mode, and the NAND controller remains active. Power off removes voltage from corroding traces immediately.', urgent: true },
              { step: '2', title: 'Remove all USB-C cables immediately', detail: 'Any USB-C connection provides power to the board. Even a connected external drive can supply enough voltage to accelerate electrolytic corrosion on the USB-C controller and surrounding circuits.', urgent: true },
              { step: '3', title: 'Flip keyboard-down and let it drain', detail: 'The M2 MacBook Pro logic board sits below the keyboard deck. Flipping the machine ensures liquid drains away from the board rather than pooling on the NAND controller and SoC areas.', urgent: false },
              { step: '4', title: 'Skip the rice, skip the hairdryer — both cause more harm', detail: 'Rice does nothing to remove corrosive residue from PCB traces. A hairdryer drives moisture deeper into BGA connections and can warp the thin M2 MacBook Pro chassis. Neither addresses the actual problem: active corrosion.', urgent: true },
              { step: '5', title: 'Contact ZA Support within 24 hours — 064 529 5863', detail: 'The M2 NAND controller is particularly time-sensitive after liquid exposure. In our experience, boards brought in within 24 hours have a dramatically higher recovery rate than those left for several days. We offer same-day collection across Johannesburg.', urgent: false },
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
          <FAQAccordion items={faqs} title="MacBook Pro M2 Liquid Damage — Common Questions" />
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
              { label: 'MacBook Air M1 Liquid Damage', href: '/liquid-damage/macbook-air-m1' },
              { label: 'M2 Logic Board Repair', href: '/logic-board-repair/macbook-pro-m2' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">M2 MacBook Pro Liquid Damage? Act Now.</h2>
            <p className="text-[#7A9E98] mb-6 max-w-xl mx-auto leading-relaxed">
              The M2 NAND controller is time-sensitive after liquid exposure. WhatsApp us now for immediate guidance and same-day collection across Johannesburg.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all" >
                WhatsApp for Urgent Help
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all" target="_blank" rel="noopener noreferrer">
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
