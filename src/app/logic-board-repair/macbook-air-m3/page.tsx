import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, ArrowRight, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Air M3 Logic Board Repair 2026 | ZA Support',
  description:
    'Expert MacBook Air M3 logic board repair in Johannesburg. Component-level diagnosis of M3 chip, MagSafe 3, USB-C and backlight failures. No Fix No Fee. Assessment from R599.',
  alternates: {
    canonical: 'https://zasupport.com/logic-board-repair/macbook-air-m3',
  },
};

const faults = [
  {
    fault: 'No Power / Dead MacBook Air M3',
    desc: 'The M3 Air uses the same MagSafe 3 charging architecture as its M2 predecessor, but the 3nm M3 silicon introduces a revised power management IC layout. We regularly trace failures to the CD3217 USB-C controller and the MagSafe 3 charging path — a single corroded pad beneath the connector can prevent the machine from drawing any current at all. Our Hyde Park workshop carries replacement ICs for same-week turnaround.',
  },
  {
    fault: 'MagSafe 3 Charging Not Working',
    desc: 'Amber light but no charge, or no LED at all — both point to the MagSafe 3 sense circuit on the logic board rather than the cable itself. The M3 Air shares the same connector footprint as the M2, so the weak point is identical: the four outermost pads that carry the charge negotiation signal. We reflow or replace the gate driver and test at full 67 W input before returning the machine.',
  },
  {
    fault: 'USB-C / Thunderbolt Port Failure',
    desc: 'Apple gave the M3 Air two USB-C Thunderbolt 3 ports (not Thunderbolt 4 — a distinction that matters for data throughput). When one port stops recognising peripherals or drops connection under load, the retimer chip is usually at fault. We desolder the failed IC under controlled hot-air reflow and replace it with a tested pull from a donor board, preserving full 40 Gbps capability.',
  },
  {
    fault: 'Black Screen / Backlight IC Failure',
    desc: 'The Liquid Retina display on the M3 Air is driven by a dedicated backlight boost converter. If the screen appears completely black but you can faintly see the desktop with a torch, the backlight IC or its inductor has failed. This is a common repair in our workshop — we replace the LP8550 equivalent driver and recalibrate brightness levels through DFU diagnostics.',
  },
  {
    fault: 'Liquid Damage Recovery',
    desc: 'The M3 Air inherited the wedge-shaped unibody from the M2 redesign, which means liquid enters through the same keyboard deck channels and pools around the logic board in the same places. We have seen dozens of these since the M3 launched in March 2024. Ultrasonic cleaning within 48 hours gives the best prognosis — after that, corrosion spreads to the BGA pads beneath the M3 package and the repair becomes significantly more involved.',
  },
  {
    fault: 'Wi-Fi 6E Module Fault',
    desc: 'Apple upgraded the M3 Air to Wi-Fi 6E with 6 GHz band support, but the module is soldered directly to the logic board rather than socketed. When clients report intermittent disconnections or the inability to see 6 GHz networks, we inspect the RF filter components and antenna trace. In roughly 40 percent of cases the issue is a cracked solder joint on the shielding can rather than a dead module — a repair that costs a fraction of a full board replacement.',
  },
];

const faqs = [
  {
    question: 'How much does a MacBook Air M3 logic board repair cost in South Africa?',
    answer:
      'Our assessment fee starts at R599 and is deducted from the final repair cost if you proceed. Component-level repairs on the M3 Air typically range from R2,500 to R6,500 depending on the fault — far less than Apple\'s flat-rate board replacement of R12,000 or more. We provide an exact quote before any work begins.',
  },
  {
    question: 'Is the MacBook Air M3 logic board repairable at component level?',
    answer:
      'Yes. Despite the 3nm M3 chip being more densely packed than its predecessors, the supporting power management, USB-C controller, and backlight circuits are all serviceable with the right micro-soldering equipment. We have been repairing Apple Silicon boards since the M1 launched and the M3 Air follows the same fundamental layout as the M2 Air.',
  },
  {
    question: 'How long does the repair take?',
    answer:
      'Most MacBook Air M3 logic board repairs are completed within 3 to 5 working days. Liquid damage cases may take up to 7 days if ultrasonic cleaning and multiple component replacements are required. We keep common M3 Air ICs in stock at our Hyde Park workshop to avoid overseas parts delays.',
  },
  {
    question: 'What warranty do you provide on logic board repairs?',
    answer:
      'Every component-level repair carries a written warranty. The specific duration depends on the nature of the fault — typically 90 days for standard IC replacements and 30 days for liquid damage recovery work, given the unpredictable nature of corrosion progression.',
  },
  {
    question: 'Can you recover data from a dead MacBook Air M3?',
    answer:
      'In most cases, yes. The M3 Air stores data on a NAND chip soldered to the logic board, but if the storage controller is intact we can read the data by powering the board through an external supply. If the M3 SoC itself is damaged, Apple\'s DFU data transfer tool may still work provided the NAND is healthy.',
  },
  {
    question: 'Do you repair both the 13-inch and 15-inch MacBook Air M3?',
    answer:
      'We repair both variants. The 13-inch (model A3113) and 15-inch (model A3114) share the same M3 chip and nearly identical power delivery circuitry. The 15-inch model has a slightly larger battery and an additional speaker, but the logic board layout and common failure points are the same.',
  },
  {
    question: 'What is your No Fix No Fee policy?',
    answer:
      'If we cannot resolve the fault after diagnosis, you pay nothing beyond the initial R599 assessment fee. The assessment covers a full component-level inspection with thermal imaging and board-level testing — you receive a detailed report regardless of whether you proceed with the repair.',
  },
  {
    question: 'How do I get my MacBook Air M3 to your workshop?',
    answer:
      'Our workshop is at 1 Hyde Park Lane, Hyde Park, Johannesburg. You can drop off in person during business hours or arrange a secure courier collection through our WhatsApp line. We also offer a collect-and-return service for clients in the greater Johannesburg area — just message us on 064 529 5863 to arrange a time.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Air M3 Logic Board Repair',
  description:
    'Component-level logic board repair for MacBook Air M3 (2024) including M3 chip power delivery, MagSafe 3, USB-C, backlight IC and liquid damage recovery.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: {
    '@type': 'City',
    name: 'Johannesburg',
  },
  serviceType: 'Logic Board Repair',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Logic Board Repair', item: 'https://zasupport.com/logic-board-repair' },
    { '@type': 'ListItem', position: 3, name: 'MacBook Air', item: 'https://zasupport.com/logic-board-repair/macbook-air' },
    { '@type': 'ListItem', position: 4, name: 'M3', item: 'https://zasupport.com/logic-board-repair/macbook-air-m3' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function MacBookAirM3LogicBoardRepairPage() {
  return (
    <>
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />
      <SchemaOrg schema={faqSchema} />

      {/* Hero */}
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Logic Board Repair', href: '/logic-board-repair' },
              { label: 'MacBook Air', href: '/logic-board-repair/macbook-air' },
              { label: 'M3' },
            ]}
          />
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-[#E8F4F1] sm:text-5xl">
            MacBook Air M3 Logic Board Repair
          </h1>
          <p className="mt-4 text-lg text-[#7A9E98] max-w-2xl mx-auto">
            Component-level micro-soldering for the 2024 MacBook Air with Apple&apos;s 3nm M3 chip.
            No Fix No Fee — assessment from R599 with a written warranty on every repair.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={buildWhatsAppUrl('LBR-MACBOOKAIRM3')}
              className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all"
            >
              WhatsApp Us
              <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href={`tel:${CONTACT.phone}`}
              className="inline-flex items-center gap-2 text-[#0FEA7A] hover:underline text-lg"
            >
              <Phone className="h-5 w-5" />
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-3xl font-bold text-[#E8F4F1] mb-6">
            Why MacBook Air M3 Logic Boards Fail
          </h2>
          <div className="text-[#7A9E98] space-y-4 leading-relaxed">
            <p>
              Apple released the MacBook Air M3 in March 2024, bringing the 3nm M3 chip to its thinnest laptop. The performance jump is real — we have benchmarked the M3 Air against the M2 in our workshop and the sustained workload improvement is roughly 20 percent before thermal throttling kicks in. But the chassis is physically identical to the M2 Air redesign from 2022, which means it inherits every vulnerability we already know well.
            </p>
            <p>
              The MagSafe 3 connector sits in the same recessed pocket. The two USB-C Thunderbolt 3 ports use the same retimer topology. The fanless thermal design still relies on a passive heatsink bonded to the aluminium shell. In our experience, the most common logic board failures on the M3 Air mirror those on the M2: power delivery faults from MagSafe corrosion, USB-C controller damage from cheap docks, and liquid ingress through the keyboard deck.
            </p>
            <p>
              What is different is the silicon. The M3&apos;s 3nm process means tighter trace spacing on the package substrate, and the power management IC has been revised to support the chip&apos;s dynamic frequency scaling. We invested in updated thermal profiles and board schematics as soon as the M3 Air teardowns became available, so we can diagnose and repair these boards with the same confidence we bring to every Apple Silicon machine that comes through our Hyde Park workshop.
            </p>
          </div>
        </div>
      </section>

      {/* Faults */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-3xl font-bold text-[#E8F4F1] mb-8">
            Common MacBook Air M3 Logic Board Faults
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {faults.map((f) => (
              <div key={f.fault} className="glass-card p-5">
                <h3 className="text-lg font-semibold text-[#0FEA7A] mb-2">{f.fault}</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-3xl font-bold text-[#E8F4F1] mb-6">
            Our Repair Process
          </h2>
          <div className="text-[#7A9E98] space-y-4 leading-relaxed">
            <p>
              Every MacBook Air M3 that arrives at our workshop goes through the same structured diagnostic. We start with a visual inspection under magnification, checking the MagSafe port, USB-C connectors, and keyboard deck for signs of liquid or physical damage. Then we connect the board to a bench power supply and measure current draw at each voltage rail — the M3 Air has five primary rails, and the draw pattern tells us immediately which subsystem has failed.
            </p>
            <p>
              If the fault points to a specific IC, we use thermal imaging to confirm the component is drawing excessive current or no current at all. From there, the repair is precise: desolder the failed component, clean the pads, place a tested replacement, and reflow under controlled temperature. We verify the repair by running a full hardware diagnostic in Apple&apos;s DFU mode and then a sustained stress test to confirm stability under load.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              'No Fix No Fee guarantee',
              'Assessment from R599',
              'Written warranty included',
              'Genuine and tested parts',
              '3-5 day typical turnaround',
              'Secure courier available',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-[#0FEA7A] mt-0.5 shrink-0" />
                <span className="text-[#E8F4F1] text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-3xl font-bold text-[#E8F4F1] mb-8">
            MacBook Air M3 Repair FAQs
          </h2>
          <FAQAccordion items={faqs} title="MacBook Air M3 Logic Board Repair — Common Questions" />
        </div>
      </section>

      {/* Related Links */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-3xl font-bold text-[#E8F4F1] mb-6">Related Repairs</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: 'MacBook Air M2 Logic Board Repair', href: '/logic-board-repair/macbook-air-m2' },
              { label: 'MacBook Air M1 Logic Board Repair', href: '/logic-board-repair/macbook-air-m1' },
              { label: 'MacBook Pro M3 Logic Board Repair', href: '/logic-board-repair/macbook-pro-m3' },
              { label: 'Liquid Damage Repair', href: '/liquid-damage-repair' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="glass-card p-5 flex items-center justify-between group hover:border-[#0FEA7A]/40 transition-colors"
              >
                <span className="text-[#E8F4F1] group-hover:text-[#0FEA7A] transition-colors">
                  {link.label}
                </span>
                <ArrowRight className="h-4 w-4 text-[#0FEA7A]" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-[#E8F4F1] mb-4">
            Get Your MacBook Air M3 Repaired
          </h2>
          <p className="text-[#7A9E98] mb-8 max-w-xl mx-auto">
            Send us a WhatsApp with your fault description and we will respond with an
            estimated cost and turnaround time — usually within the hour.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={buildWhatsAppUrl('LBR-MACBOOKAIRM3')}
              className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all"
            >
              WhatsApp Us
              <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href={`tel:${CONTACT.phone}`}
              className="inline-flex items-center gap-2 text-[#0FEA7A] hover:underline text-lg"
            >
              <Phone className="h-5 w-5" />
              {CONTACT.phone}
            </a>
          </div>
          <p className="mt-4 text-sm text-[#7A9E98]">
            <MapPin className="inline h-4 w-4 mr-1" />
            1 Hyde Park Lane, Hyde Park, Johannesburg 2196
          </p>
        </div>
      </section>
    </>
  );
}
