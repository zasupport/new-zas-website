import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, MapPin, ArrowRight } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Not Charging? 10 Steps to Fix It in 2026 | ZA Support',
  description:
    'MacBook not charging? Follow our 10-step troubleshooting guide covering charger checks, SMC resets, port diagnosis and charging IC repair. Hyde Park, JHB.',
  alternates: { canonical: 'https://zasupport.com/guides/macbook-not-charging' },
};

const faqs = [
  { question: 'Why is my MacBook not charging when plugged in?', answer: 'The most common causes are a damaged cable, debris in the charging port, a faulty charger brick, or a software glitch preventing charge negotiation. In South Africa, load shedding power surges also damage the internal charging IC, which stops the Mac from accepting power even with a working charger. Start with the 10 steps in our guide above, and if none resolve it, the fault is likely board-level.' },
  { question: 'How do I reset the SMC on my MacBook?', answer: 'On Intel MacBooks: shut down, hold Shift + Control + Option + Power for 10 seconds, release all keys, then press Power to start. On Apple Silicon (M1, M2, M3, M4): shut down completely, wait 30 seconds, then press and hold the power button for 10 seconds. Release, wait a few seconds, and press power normally. The Apple Silicon method forces the power management controller to reinitialise.' },
  { question: 'My MagSafe light is not coming on at all. What does that mean?', answer: 'No light on the MagSafe connector means zero power is reaching the Mac. Check the cable for damage, try a different wall outlet (especially after load shedding), and try a known-good charger. If the charger works on another Mac but produces no light on yours, the fault is internal — typically the MagSafe board connector, a blown fuse on the logic board, or a failed charging IC.' },
  { question: 'Can a USB-C MacBook charge from only one port?', answer: 'If your MacBook charges from one USB-C port but not the other, it usually indicates a failed CD3215 or CD3217 USB-C controller IC on the dead port side. This is a board-level component repair, not a port replacement. ZA Support repairs these at component level in our Hyde Park workshop.' },
  { question: 'How much does MacBook charging repair cost in South Africa?', answer: 'Costs vary by fault type. A new genuine charger runs R1,200 to R2,499. USB-C port cleaning is R299 to R499. Charging IC replacement (CD3215, CD3217, ISL9240) ranges from R1,800 to R4,500 depending on the model. Battery replacement costs R1,499 to R3,999. ZA Support provides a written quote after the R599 assessment — From R599 assessment applies.' },
  { question: 'Does load shedding damage MacBook chargers?', answer: 'Yes. The power surge when electricity returns after load shedding regularly damages both the charger brick and the MacBook internal charging circuit. We see this weekly in our Hyde Park workshop. A quality surge protector rated for South African load shedding conditions (minimum 1,000 joules) is essential. If your MacBook stopped charging after a power event, the ISL9240 charger IC or CD3217 USB-C controller is the most likely casualty.' },
  { question: 'How do I check my MacBook battery health?', answer: 'Click the Apple menu, hold Option, and click System Information. Navigate to Hardware then Power. Look for Cycle Count (under 1,000 is normal), Condition (should say Normal), and Maximum Capacity percentage. Below 80% maximum capacity means the battery is degraded and may not hold charge or accept charge properly. On macOS Ventura and later, go to System Settings then Battery then Battery Health.' },
  { question: 'My MacBook shows "Not Charging" but is plugged in. Why?', answer: 'The "Not Charging" status means the Mac detects the charger but is deliberately not drawing power. Common causes: using a charger with insufficient wattage (e.g., a 30W charger on a 16-inch MacBook Pro that needs 140W), battery temperature too high, or a software bug. Try an SMC reset first. If the status persists with the correct wattage charger, the battery or charging circuit needs professional diagnosis.' },
  { question: 'Can you repair a MacBook charging port?', answer: 'Yes. For USB-C MacBooks, the port itself is soldered to the logic board and can be replaced if physically damaged. More often, the fault is the USB-C controller IC (CD3215 or CD3217) behind the port rather than the port itself. For older MagSafe MacBooks, the DC-in board is a separate module that clips in and is straightforward to replace. ZA Support diagnoses the exact fault during the R599 assessment.' },
  { question: 'Is it safe to use a third-party MacBook charger?', answer: 'We strongly advise against cheap unbranded chargers. They often lack proper voltage regulation, overheat, and can damage the USB-C controller IC on the logic board. If you need an alternative to Apple, stick to reputable brands like Anker or Belkin that are USB-PD certified. In South Africa, counterfeit Apple chargers are common — if the price seems too good, it probably is. A R200 charger that kills a R4,000 charging IC is no saving.' },
  { question: 'How long does charging IC repair take?', answer: 'At ZA Support, the R599 assessment typically takes 24 to 48 hours. Once you approve the written quote, charging IC repair (CD3215, CD3217, ISL9240) is completed within 3 to 5 business days. The repair includes a 12-month warranty on parts and labour. We collect from Sandton, Rosebank, Fourways, Bryanston, Midrand, Randburg, and surrounding Johannesburg suburbs.' },
];

const steps = [
  { name: 'Check the charger and cable', text: 'Inspect your charging cable from end to end. Look for fraying, kinks, exposed wiring, or burn marks near the connector. MagSafe cables are notorious for fraying where the cable meets the magnetic tip. USB-C cables can develop internal breaks that are invisible from outside. Try a different wall outlet — after load shedding in South Africa, individual outlets can be damaged by the return surge even if the breaker stays on. If you have access to a second charger, test with that. A working charger on a different Mac but dead on yours points to an internal Mac fault rather than the charger.' },
  { name: 'Inspect the charging port', text: 'Use a torch to look inside the USB-C or MagSafe port. Pocket lint, dust, and debris accumulate over months and prevent proper contact. For USB-C ports, a wooden toothpick works well to gently clear compacted lint — never use metal tools as they can short the pins. For MagSafe, check for bent pins or dark residue that indicates liquid exposure. If you spot green or white corrosion, that is liquid damage and requires professional cleaning to prevent further board damage.' },
  { name: 'Reset the SMC (Intel) or power cycle (Apple Silicon)', text: 'On Intel MacBooks (2019 and earlier, plus Intel models through 2020): shut down, then hold Shift + Control + Option + Power simultaneously for 10 seconds. Release all keys, then press Power to start up. On Apple Silicon Macs (M1, M2, M3, M4): shut down completely, wait 30 seconds, then press and hold the power button for a full 10 seconds. Release, wait a few seconds, and press power normally. This forces the power management controller to reinitialise and clears stuck charge states that software alone cannot fix.' },
  { name: 'Check battery health in System Information', text: 'Click the Apple menu, hold Option, and click System Information. Go to Hardware then Power. Key values to check: Cycle Count (Apple rates batteries for 1,000 cycles), Condition (Normal, Replace Soon, Replace Now, or Service Battery), and Maximum Capacity. A battery below 80% capacity is considered consumed by Apple standards and may refuse to charge or hold charge intermittently. On macOS Ventura and newer, you can also check System Settings then Battery then Battery Health for a simplified view.' },
  { name: 'Boot into Safe Mode', text: 'Safe Mode disables third-party kernel extensions and login items that can interfere with power management. On Intel Macs: restart and hold Shift until you see the login screen. On Apple Silicon: shut down, hold the power button until you see startup options, select your disk, then hold Shift and click Continue in Safe Mode. If the Mac charges normally in Safe Mode, a third-party app or driver is the culprit. Common offenders include fan control apps, battery management utilities, and VPN software with kernel extensions.' },
  { name: 'Diagnose the MagSafe LED', text: 'The MagSafe LED is a direct indicator of what the charging circuit is doing. No light at all means zero power delivery — the charger, cable, or DC-in board is not making a connection. Amber (orange) means the battery is actively charging. Green means the battery is fully charged or nearly full. A flickering or intermittently flashing LED usually indicates a board-level fault, often a failing charging IC or a short on the power rail pulling the voltage down. If the light flashes once and goes out, suspect a short circuit on the logic board.' },
  { name: 'Test both USB-C ports', text: 'On MacBooks with USB-C charging, try plugging the charger into each port individually. If one port charges and the other does not, the fault is a failed USB-C controller IC on the dead port side — typically the CD3215 (older models) or CD3217 (newer models). Each USB-C port has its own controller chip, so a single port failure is a discrete component fault, not a whole-board issue. If neither port charges, the fault may be upstream on the main power rail or the ISL9240 charger IC.' },
  { name: 'Identify a charging IC fault', text: 'When all external checks pass but the MacBook still will not charge, the fault is almost certainly a failed charging IC on the logic board. The three most common culprits we see in our Hyde Park workshop: the CD3215 and CD3217 USB-C power delivery controllers that negotiate voltage and current with the charger, and the ISL9240 charger IC that regulates power from the USB-C controller to the battery. Load shedding surges in South Africa are the number one cause of these failures — the return-of-power spike exceeds the IC voltage tolerances. These are surface-mount components requiring micro-soldering to replace.' },
  { name: 'Check for battery problems', text: 'A battery can fail in ways that prevent charging entirely. Swollen batteries (visible as a bulging trackpad or uneven base) must be replaced immediately as they are a fire hazard. Dead cells cause the battery management system to reject charge to protect the remaining cells. Connector damage — corrosion or a loose ribbon cable at the battery connector on the logic board — breaks the charge path. If your MacBook runs on mains power but the battery percentage never increases, or if it shuts down the moment you unplug, the battery itself needs replacement.' },
  { name: 'Get a professional assessment', text: 'If you have worked through steps 1 to 9 without success, the fault requires board-level diagnosis. At ZA Support, we use thermal imaging and micro-soldering stations to pinpoint the exact failed component — whether that is a blown fuse, a shorted capacitor, a dead charging IC, or a damaged battery connector. Our R599 assessment includes a full written report identifying the fault, a fixed-price repair quote, and our From R599 assessment guarantee. We collect from Sandton, Rosebank, Fourways, Bryanston, Midrand, Randburg, and surrounding Johannesburg suburbs.' },
];

const costGuide = [
  { repair: 'New genuine Apple charger (USB-C / MagSafe)', cost: 'R1,200 – R2,499' },
  { repair: 'USB-C / MagSafe port cleaning', cost: 'R299 – R499' },
  { repair: 'MagSafe DC-in board replacement', cost: 'R899 – R1,499' },
  { repair: 'USB-C controller IC repair (CD3215 / CD3217)', cost: 'R1,800 – R3,500' },
  { repair: 'Charger IC repair (ISL9240)', cost: 'R2,200 – R4,500' },
  { repair: 'Battery replacement (MacBook Air)', cost: 'R1,499 – R2,499' },
  { repair: 'Battery replacement (MacBook Pro)', cost: 'R1,999 – R3,999' },
  { repair: 'Full logic board diagnosis (assessment fee)', cost: 'From R599' },
];

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Fix a MacBook That Is Not Charging',
  description:
    'A 10-step troubleshooting guide to diagnose and fix a MacBook that will not charge, covering charger checks, SMC resets, port diagnosis, and board-level charging IC faults.',
  totalTime: 'PT45M',
  estimatedCost: {
    '@type': 'MonetaryAmount',
    currency: 'ZAR',
    value: '599',
  },
  supply: [
    { '@type': 'HowToSupply', name: 'A working USB-C or MagSafe charger for testing' },
    { '@type': 'HowToSupply', name: 'A torch for port inspection' },
    { '@type': 'HowToSupply', name: 'A wooden toothpick for debris removal' },
  ],
  tool: [
    { '@type': 'HowToTool', name: 'MacBook (any model)' },
    { '@type': 'HowToTool', name: 'Access to a second charger (recommended)' },
  ],
  step: steps.map((s, i) => ({
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
    { '@type': 'ListItem', position: 3, name: 'MacBook Not Charging', item: 'https://zasupport.com/guides/macbook-not-charging' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Charging Repair Johannesburg',
  description: 'MacBook charging fault diagnosis and repair in Johannesburg. USB-C controller, charger IC, MagSafe, and battery repairs. Assessment from R599.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: { '@type': 'City', name: 'Johannesburg' },
};

export default function MacBookNotChargingGuidePage() {
  return (
    <>
      <SchemaOrg schema={howToSchema} />
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />
      <SchemaOrg schema={serviceSchema} />

      {/* Hero */}
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Guides', href: '/guides' },
            { label: 'MacBook Not Charging' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Not Charging?
              <br /><span className="text-[#0FEA7A]">Here&apos;s How to Fix It</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Your MacBook is plugged in but nothing happens. No light, from R599, no response. Before you panic, work through these 10 steps. We have diagnosed thousands of charging faults at our Hyde Park workshop in Johannesburg — from dead chargers to blown charging ICs caused by South African load shedding surges. This guide covers everything you can check at home, when it is time for professional repair, and what each fix costs in ZAR.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>1 Hyde Park Lane, Hyde Park, JHB 2196 | Assessment from R599 | From R599 assessment | 12-Month Warranty</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {['10-Step Guide', 'From R599 assessment', '12-Month Warranty', 'Assessment from R599'].map((l) => (
                <div key={l} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <CheckCircle className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{l}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('GUIDE-CHARGING-HERO', 'charging-port')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
                WhatsApp for Quote
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 10 Steps */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">10 Steps to Fix a MacBook That Will Not Charge</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">
            Work through these steps in order. Each one eliminates a specific cause. If you reach step 10, the fault is board-level and needs professional micro-soldering — but most charging problems are resolved in the first five steps.
          </p>
          <div className="space-y-6">
            {steps.map((step, i) => (
              <div key={step.name} className="glass-card p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[rgba(15,234,122,0.15)] border border-[rgba(15,234,122,0.3)] rounded-full flex items-center justify-center">
                    <span className="text-[#0FEA7A] font-bold text-lg">{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-[#E8F4F1] font-bold text-lg mb-2">Step {i + 1}: {step.name}</h3>
                    <p className="text-[#7A9E98] text-sm leading-relaxed">{step.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Charging IC Deep Dive */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">When It Is a Charging IC Problem</h2>
          <p className="text-[#7A9E98] mb-6 leading-relaxed">
            In our experience at ZA Support, roughly 40% of MacBooks that arrive with &quot;not charging&quot; symptoms have a failed charging IC on the logic board. This is particularly common in South Africa where load shedding surges are a daily reality. Here are the three ICs we replace most frequently:
          </p>
          <div className="space-y-4">
            <div className="glass-card p-5">
              <h3 className="text-[#E8F4F1] font-bold mb-2">CD3215 / CD3217 — USB-C Power Delivery Controller</h3>
              <p className="text-[#7A9E98] text-sm leading-relaxed">
                These Texas Instruments chips handle USB-C power negotiation on every MacBook from 2016 onwards. They communicate with the charger to agree on voltage (5V, 9V, 15V, or 20V) and current. A surge or liquid damage kills the negotiation, so the charger never delivers power even though the cable is physically connected. Symptoms: from R599 from one or both USB-C ports, intermittent charging, or the Mac drawing power but not negotiating the correct wattage. The CD3217 is the newer variant found in M1 and later machines.
              </p>
            </div>
            <div className="glass-card p-5">
              <h3 className="text-[#E8F4F1] font-bold mb-2">ISL9240 — Main Charger IC</h3>
              <p className="text-[#7A9E98] text-sm leading-relaxed">
                The Renesas ISL9240 sits between the USB-C controller and the battery, converting the incoming USB-C power into the correct charging voltage for the battery cells. When this IC fails, the Mac may power on from mains but the battery percentage never increases — or it may not power on at all. This is the single most common IC failure we see after load shedding events. Replacement requires removing the old chip, reballing the pads, and soldering a new ISL9240 under microscope at our Hyde Park micro-soldering station.
              </p>
            </div>
            <div className="glass-card p-5">
              <h3 className="text-[#E8F4F1] font-bold mb-2">When It Is the Battery</h3>
              <p className="text-[#7A9E98] text-sm leading-relaxed">
                Not every charging problem is a board fault. Swollen batteries physically push against the trackpad and base — if your MacBook rocks on a flat surface or the trackpad clicks unevenly, check for swelling immediately. Dead cells prevent the battery management system from accepting charge. Corroded battery connectors (common after minor liquid exposure) break the charge path entirely. We test batteries as part of every R599 assessment and only recommend replacement when the cells or connector are genuinely faulty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Guide */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">MacBook Charging Repair Costs in South Africa (2026)</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">
            Prices depend on the specific fault and MacBook model. Apple charges R15,000 to R55,000 for a full logic board replacement because they do not repair at component level. ZA Support repairs only the failed component, which is a fraction of the cost. All prices below are in ZAR and include our 12-month warranty.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[rgba(15,234,122,0.2)]">
                  <th className="py-3 pr-4 text-[#E8F4F1] font-bold text-sm">Repair Type</th>
                  <th className="py-3 text-[#E8F4F1] font-bold text-sm text-right">Cost (ZAR)</th>
                </tr>
              </thead>
              <tbody>
                {costGuide.map((row) => (
                  <tr key={row.repair} className="border-b border-[rgba(122,158,152,0.1)]">
                    <td className="py-3 pr-4 text-[#7A9E98] text-sm">{row.repair}</td>
                    <td className="py-3 text-[#0FEA7A] text-sm font-semibold text-right">{row.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[#7A9E98] text-sm mt-6">
            All repairs are quoted after the R599 assessment. From R599 assessment applies — if we cannot fix it, you pay nothing beyond the assessment fee. Prices valid as of 2026 and subject to model-specific variation.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="MacBook Not Charging — Frequently Asked Questions" />
        </div>
      </section>

      {/* Related Links */}
      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Repairs and Guides</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'Logic Board Repair', href: '/logic-board-repair' },
              { label: 'Battery Replacement', href: '/battery-replacement' },
              { label: 'Charging Port Repair', href: '/charging-port-repair' },
              { label: 'Liquid Damage Repair', href: '/liquid-damage' },
              { label: 'MacBook Pro Repair', href: '/macbook-pro-repair' },
              { label: 'MacBook Air Repair', href: '/macbook-air-repair' },
              { label: 'MacBook Not Turning On', href: '/macbook-not-turning-on' },
              { label: 'Contact Us', href: '/contact' },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="glass-card p-4 text-center group">
                <span className="text-[#E8F4F1] text-sm font-semibold group-hover:text-[#0FEA7A] transition-colors">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Still Not Charging? We Will Fix It.</h2>
            <p className="text-[#7A9E98] mb-6">
              R599 assessment. From R599 assessment. 12-month warranty on all charging repairs. Collection from Sandton, Rosebank, Fourways, Bryanston, Midrand, and Randburg.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('GUIDE-CHARGING-CTA', 'charging-port')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
                WhatsApp for Quote
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all">
                Contact Us <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
