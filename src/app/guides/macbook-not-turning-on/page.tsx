import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, ArrowRight, AlertTriangle, Zap, MapPin, Shield } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';
import PricingNote from '@/components/PricingNote';

export const metadata: Metadata = {
  title: 'MacBook Not Turning On? 10 Fixes to Try in 2026 | ZA Support',
  description: 'MacBook not turning on? Try these 10 proven fixes before booking a repair. Step-by-step guide from Johannesburg Apple repair specialists. Assessment from R599.',
  alternates: { canonical: 'https://zasupport.com/guides/macbook-not-turning-on' },
};

const faqs = [
  { question: 'Why is my MacBook not turning on at all?', answer: 'A MacBook that shows zero signs of life — no fan spin, no chime, no LED — typically has a power delivery fault. On Intel models this means the SMC or power management IC (U7000/U7100) has failed. On Apple Silicon, the power controller inside the M-series SoC may not be receiving correct voltage from the PPBUS_G3H rail. Start with the troubleshooting steps above, and if none work, it needs board-level diagnosis.' },
  { question: 'How do I force restart a MacBook that won\'t turn on?', answer: 'Hold the power button for 10 full seconds, release, wait 5 seconds, then press once. On MacBook Pro 16-inch (2019+) and all Apple Silicon models, the power button is the Touch ID sensor in the top-right corner. If the Mac had a kernel panic, this hard reset clears the hang state. If the Mac is truly dead (no power at all), a force restart will not help — the issue is hardware.' },
  { question: 'Can load shedding damage my MacBook?', answer: 'Yes. In South Africa, the power surge when Eskom restores supply is the single most common cause of sudden MacBook death we see in our Hyde Park workshop. The surge enters via the USB-C charger and damages the charging IC (CD3217 on Intel, integrated controller on M-series). A quality surge protector rated for SA conditions (min 1,000 joules) prevents this. If your Mac died during or after load shedding, it is almost certainly a board-level fault — not a software issue.' },
  { question: 'My MacBook charges but won\'t turn on — what does that mean?', answer: 'If the MagSafe LED lights up (or the USB-C charger shows power draw) but the Mac does not boot, the charging circuit works but the power-on sequence is failing. On Intel Macs, this points to a failed SMC or corrupted EFI firmware. On Apple Silicon, it suggests the boot ROM or SSD controller has a fault. This narrows the repair scope significantly and is usually repairable at the component level.' },
  { question: 'Does a black screen mean my MacBook logic board is dead?', answer: 'Not necessarily. A black screen with fan noise means the Mac is running but the display path has failed. This could be a backlight fuse (costs under R500 to repair), a failed display cable, or a GPU/display controller fault. Connect an external monitor via HDMI or USB-C — if you get a picture, the logic board is fine and the issue is the display circuit or screen itself.' },
  { question: 'How much does it cost to fix a MacBook that won\'t turn on?', answer: 'At ZA Support, the diagnostic assessment starts from R599. Repair cost depends on the fault: a blown fuse or single IC replacement can be under R2,000; a complex power management circuit repair ranges from R2,500 to R6,000. Apple charges R15,000 to R45,000 for full logic board replacement. Our From R599 assessment policy means you only pay the assessment fee if we cannot repair it.' },
  { question: 'Can I fix a MacBook logic board myself?', answer: 'Board-level repair requires micro-soldering equipment (hot air rework station, microscope, BGA reballing tools) and schematic-level knowledge of Apple logic boards. Replacing a capacitor or fuse is possible with soldering experience, but IC-level work (power management, USB-C controllers) requires professional equipment. We strongly advise against DIY attempts on the logic board — a misplaced probe can cause irreversible damage to surrounding circuits.' },
  { question: 'What is the PPBUS_G3H rail and why does it matter?', answer: 'PPBUS_G3H is the main power rail on Intel MacBook logic boards. It carries 12.56V from the charger to the entire board. Every other voltage rail derives from PPBUS_G3H. If this rail reads 0V, nothing on the board receives power and the Mac is completely dead. Measuring PPBUS_G3H is the first diagnostic step in any no-power MacBook repair — it tells us immediately whether the fault is in the charging circuit or downstream.' },
  { question: 'Is it worth repairing an old MacBook that won\'t turn on?', answer: 'It depends on the model. A 2015 MacBook Pro with a blown charging IC costs R2,000 to R3,000 to repair and still runs macOS Ventura — absolutely worth it. A 2012 MacBook Pro with a failed GPU (known AMD defect) is not economically viable. During our R599 assessment, we provide a written quote with our honest recommendation on whether repair makes financial sense for your specific model.' },
  { question: 'How long does MacBook no-power diagnosis take?', answer: 'Our initial assessment takes 1 to 2 business days. We measure voltage rails, inspect for liquid damage under microscope, and test individual power stages. You receive a written diagnosis with photos, a fixed-price quote, and our recommendation. If you approve the repair, most no-power faults are completed within 3 to 5 business days.' },
  { question: 'Do you offer a warranty on MacBook power repairs?', answer: 'Yes. All logic board repairs at ZA Support carry a 12-month warranty on the repaired component. If the same fault recurs within 12 months, we repair it again at from R599. This applies to all component-level repairs including power management ICs, charging circuits, and USB-C controllers.' },
];

const howToSteps = [
  { name: 'Check Your Charger and Cable', text: 'Inspect the MagSafe or USB-C charger for frayed cables, bent pins, or scorch marks. Try a known-good charger if available. On USB-C MacBooks, test both ports — a single failed port does not mean the board is dead.' },
  { name: 'Perform a Hard Reset', text: 'Hold the power button (Touch ID button on 2016+ models) for 10 full seconds. Release, wait 5 seconds, press once. This drains residual charge from capacitors and resets the power controller state.' },
  { name: 'Reset the SMC (Intel Macs Only)', text: 'Shut down. On MacBooks with T2 chip: hold Control + Option + Shift (left side) for 7 seconds, then also hold the power button for another 7 seconds. Release all keys, wait 5 seconds, press power. On older models without T2: hold Shift + Control + Option + Power for 10 seconds simultaneously.' },
  { name: 'Reset NVRAM / PRAM', text: 'Power on and immediately hold Option + Command + P + R for 20 seconds. The Mac will appear to restart. This resets display resolution, startup disk selection, and speaker volume — all stored in NVRAM. On Apple Silicon Macs, NVRAM resets automatically on every boot, so this step only applies to Intel models.' },
  { name: 'Try a DFU Restore (Apple Silicon and T2 Macs)', text: 'Connect to another Mac via USB-C cable. On the dead Mac, press and hold: power button + right Shift + left Option + left Control for 10 seconds, then release all except power for another 10 seconds. Apple Configurator 2 on the second Mac can revive or restore the firmware.' },
  { name: 'Disconnect All Peripherals', text: 'Remove every USB device, SD card, external display, and hub. A shorted peripheral can prevent boot. We have seen faulty USB hubs hold the SMC in reset indefinitely — the Mac appears dead but boots fine once the hub is removed.' },
  { name: 'Check for Signs of Life', text: 'Press the power button and listen closely. Fan spin, a startup chime, a brief screen flash, or a charging LED all indicate the board has partial power. A Mac with zero signs of life (no fan, no LED, no warmth) has a power delivery fault that software resets cannot fix.' },
  { name: 'Test with an External Display', text: 'Connect an external monitor via HDMI, USB-C, or Thunderbolt. Press the power button. If the external display shows the Apple logo, your logic board is fine — the issue is the internal display, backlight circuit, or display cable. This single test saves hundreds of rands in unnecessary diagnosis.' },
  { name: 'Listen for Beep Codes (Older Macs)', text: 'Pre-2016 MacBooks use audible beep codes: one beep = no RAM detected, three beeps = RAM failed integrity check. If you hear repeating beeps, reseat or replace the RAM modules (on models with removable RAM). On 2016+ models with soldered RAM, beep codes indicate a board-level memory fault.' },
  { name: 'Check Battery Health via MagSafe LED', text: 'On MagSafe MacBooks (pre-2016 and MacBook Air through 2017): green LED = battery charged, amber = charging, no LED = no power reaching the board. On USB-C models, check the charger with another device to confirm it outputs power. A completely dead battery on older models can prevent boot even when plugged in — the board needs minimum battery voltage to initialise.' },
];

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Fix a MacBook That Won\'t Turn On',
  description: 'Step-by-step troubleshooting guide for a MacBook that will not power on. Covers Intel and Apple Silicon models, SMC reset, NVRAM reset, DFU restore, and when to seek professional repair.',
  totalTime: 'PT30M',
  estimatedCost: { '@type': 'MonetaryAmount', currency: 'ZAR', value: '0' },
  supply: [
    { '@type': 'HowToSupply', name: 'A known-good USB-C or MagSafe charger' },
    { '@type': 'HowToSupply', name: 'A second Mac (for DFU restore, optional)' },
    { '@type': 'HowToSupply', name: 'An external display with HDMI or USB-C cable (optional)' },
  ],
  tool: [
    { '@type': 'HowToTool', name: 'Apple Configurator 2 (free, for DFU restore)' },
  ],
  step: howToSteps.map((s, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: s.name,
    text: s.text,
  })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://zasupport.com/guides' },
    { '@type': 'ListItem', position: 3, name: 'MacBook Not Turning On', item: 'https://zasupport.com/guides/macbook-not-turning-on' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function MacBookNotTurningOnGuidePage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={howToSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Guides', href: '/guides' },
            { label: 'MacBook Not Turning On' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Not Turning On?
              <br /><span className="text-[#0FEA7A]">Here&apos;s What to Do</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              We&apos;ve repaired thousands of MacBooks that arrived at our Hyde Park workshop completely dead. Before you assume the worst, work through these 10 troubleshooting steps. Most take under two minutes and cost nothing. If none of them bring your Mac back to life, we explain exactly what happens inside the logic board when power fails — and what we can do about it.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>1 Hyde Park Lane, Hyde Park, Johannesburg 2196 | Assessment from R599 | From R599 assessment</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {['10 Step Guide', 'Intel + Apple Silicon', 'From R599 assessment', '12-Month Warranty'].map((l) => (
                <div key={l} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <CheckCircle className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{l}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('GUIDE-NOPOWER', 'logic-board')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
                WhatsApp Us Now
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Before You Start: What &quot;Not Turning On&quot; Actually Means</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed mb-10">
            <p>In our workshop, we see this issue daily. But &quot;not turning on&quot; means different things to different people, and the distinction matters. A MacBook that is completely dead — no fan noise, no screen flash, no charging LED — has a fundamentally different fault to one that powers on but shows a black screen. The dead Mac has a power delivery failure. The black-screen Mac has a display or boot failure. Both feel the same to you, but the repair path is entirely different.</p>
            <p>Before working through these steps, press the power button and observe. Does anything happen at all? A fan spin lasting even half a second, a faint chime, a brief backlight flash? Write down what you notice. When we diagnose your Mac, that 2-second observation often tells us more than 30 minutes of measurement.</p>
          </div>

          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">10 Steps to Try When Your MacBook Won&apos;t Turn On</h2>
          <div className="space-y-6">
            {howToSteps.map((step, i) => (
              <div key={step.name} className="glass-card p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[rgba(15,234,122,0.15)] border border-[rgba(15,234,122,0.3)] rounded-full flex items-center justify-center">
                    <span className="text-[#0FEA7A] font-bold text-sm">{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-[#E8F4F1] font-bold text-lg mb-2">{step.name}</h3>
                    <p className="text-[#7A9E98] leading-relaxed">{step.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">When It&apos;s a Logic Board Issue</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed mb-8">
            <p>If you have worked through every step above and your MacBook still shows no signs of life, the fault is almost certainly at the logic board level. This is not a software problem. Something physical has failed in the power delivery chain, and no reset sequence will fix it.</p>
            <p>Here is what typically goes wrong inside the board. On Intel MacBooks, the main power rail — called PPBUS_G3H — must reach 12.56 volts for anything to function. This voltage comes from the charger through the ISL9240 (or similar) charging IC, which converts the charger&apos;s input into regulated board voltage. If the ISL9240 fails, PPBUS_G3H reads zero volts and the entire board is dead. The SMC chip (a small ARM processor near the keyboard connector) orchestrates the power-on sequence: it checks PPBUS_G3H, enables secondary voltage rails (PP5V_S5, PP3V3_S5, PP3V3_S4), and finally triggers the CPU to boot. A failed SMC means the sequence never starts.</p>
            <p>On Apple Silicon MacBooks (M1, M2, M3, M4), the power architecture is different but the failure modes are similar. The M-series chip contains its own power management, but it still relies on external voltage regulators and USB-C power delivery controllers (Cypress CCG6 or Apple&apos;s own silicon) to negotiate charging. A surge from load shedding — extremely common in South Africa, and something we repair weekly — damages these controllers. The Mac charges normally one day, then is completely dead the next.</p>
            <p>The most common board-level faults we see in no-power MacBooks:</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              { title: 'Power Management IC Failure', desc: 'The ISL9240 or TPS51980 regulator has failed, killing the PPBUS_G3H rail. Common after power surges.' },
              { title: 'USB-C Controller Damage', desc: 'The CD3217/CD3218 controller on Intel or Cypress CCG6 on older models has shorted. No power negotiation, no charging.' },
              { title: 'Liquid Damage Corrosion', desc: 'Microscopic corrosion on power circuit traces. Often invisible to the naked eye. Progresses over days to weeks after the spill.' },
              { title: 'SMC Failure (Intel Only)', desc: 'The SMC ARM chip itself has failed. The power-on sequence never initiates. Requires micro-soldering replacement.' },
              { title: 'Blown Fuse or Capacitor', desc: 'A single protective fuse or decoupling capacitor has failed. Often the cheapest repair — under R1,500 in parts and labour.' },
              { title: 'EFI / Firmware Corruption', desc: 'The boot firmware is corrupted but the board has power. DFU restore may fix this; if not, the SPI flash chip can be reflashed.' },
            ].map((f) => (
              <div key={f.title} className="glass-card p-5">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-[#E8F4F1] font-bold mb-1">{f.title}</h3>
                    <p className="text-[#7A9E98] text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>Every one of these faults is repairable at the component level. We do not replace the entire logic board — we diagnose which specific component has failed and replace that component using micro-soldering. This preserves your data (it stays on the same board), costs a fraction of Apple&apos;s R15,000 to R45,000 board replacement, and carries a 12-month warranty from ZA Support.</p>
            <p>If you are in Johannesburg, we collect from Sandton, Rosebank, Fourways, Bryanston, Midrand, Randburg, and surrounding suburbs. Send us a WhatsApp on <a href={`tel:${CONTACT.phoneTel}`} className="text-[#0FEA7A] hover:underline">{CONTACT.phone}</a> with your MacBook model and what happened, and we will arrange collection the same day where possible.</p>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Load Shedding and MacBook Power Failures</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>This deserves its own section because it is the single most common cause of sudden MacBook death in South Africa. When Eskom restores power after a load shedding cycle, the voltage spike can exceed 300V for a fraction of a second. Your MacBook&apos;s USB-C charger passes this spike straight to the logic board&apos;s power delivery circuit.</p>
            <p>The damage is not always immediate. We have seen MacBooks survive the initial surge but fail two to three days later as a weakened component degrades. If your MacBook stopped working within a week of a load shedding event, the surge is the probable cause — even if it seemed fine at first.</p>
            <p>Prevention is straightforward: use a quality surge protector rated at minimum 1,000 joules with USB-C passthrough, or unplug your charger during scheduled load shedding. An uninterruptible power supply (UPS) offers the best protection — R1,500 to R3,000 for a unit that protects a single MacBook. Given that the alternative is a R2,000 to R6,000 board repair, the maths is simple.</p>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Why Choose ZA Support for MacBook Power Repairs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {[
              { icon: Zap, title: 'Component-Level Repair', desc: 'We replace the failed IC or component — not the entire R30,000 logic board. Your data stays on the same board.' },
              { icon: CheckCircle, title: 'From R599 assessment', desc: 'If we cannot repair it, you pay only the R599 assessment fee. No hidden charges, no surprises.' },
              { icon: Shield, title: '12-Month Warranty', desc: 'Every board repair carries a written 12-month warranty. If the same fault returns, we fix it at from R599.' },
              { icon: MapPin, title: 'Johannesburg Collection', desc: 'We collect from Sandton, Rosebank, Fourways, Bryanston, Midrand, Randburg, and all suburbs within 25km of Hyde Park.' },
            ].map((item) => (
              <div key={item.title} className="glass-card p-6">
                <item.icon className="w-8 h-8 text-[#0FEA7A] mb-3" />
                <h3 className="text-[#E8F4F1] font-bold mb-2">{item.title}</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>ZA Support has been repairing Apple logic boards in Johannesburg since 2009. We have the micro-soldering equipment, board schematics, and component-level diagnostic tools that general repair shops do not carry. The most common mistake we see is MacBook owners paying R4,000 to R6,000 at a general repair shop for a &quot;motherboard replacement&quot; that uses a refurbished board with no warranty — when the original fault was a R800 component.</p>
            <p>We diagnose first, quote second, and repair only with your written approval. Every repair includes before-and-after photos, a detailed fault report, and our 12-month written warranty.</p>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="MacBook Not Turning On — Common Questions" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Repairs</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'Logic Board Repair', href: '/logic-board-repair' },
              { label: 'MacBook Pro M1 Repair', href: '/logic-board-repair/macbook-pro-m1' },
              { label: 'Charging Port Repair', href: '/charging-port-repair' },
              { label: 'Battery Replacement', href: '/battery-replacement' },
              { label: 'Liquid Damage Repair', href: '/liquid-damage' },
              { label: 'MacBook Pro M2 Repair', href: '/logic-board-repair/macbook-pro-m2' },
              { label: 'MacBook Air M1 Repair', href: '/logic-board-repair/macbook-air-m1' },
              { label: 'Contact Us', href: '/contact' },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="glass-card p-4 text-center group">
                <span className="text-[#E8F4F1] text-sm font-semibold group-hover:text-[#0FEA7A] transition-colors">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Tried Everything? Assessment from R599.</h2>
            <p className="text-[#7A9E98] mb-6">Send us a WhatsApp with your MacBook model and symptoms. We collect from across Johannesburg. From R599 assessment on all board repairs. 12-month warranty.</p>
            <PricingNote variant="inline" />
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <a href={buildWhatsAppUrl('GUIDE-NOPOWER', 'logic-board')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
                WhatsApp for Quote
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
