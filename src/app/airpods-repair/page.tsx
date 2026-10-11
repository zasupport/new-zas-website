import {
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  Headphones,
  Phone,
  Smartphone,
} from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import SchemaOrg from '@/components/seo/SchemaOrg';
import Breadcrumb from '@/components/ui/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQ';
import { buildWhatsAppUrl, CONTACT } from '@/lib/constants';
import { buildBreadcrumbSchema, buildFaqSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'AirPods Repair Johannesburg [2026]',
  description:
    'Honest answer: AirPods are sealed units and cannot be economically repaired. What to do instead, Apple service options explained. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/airpods-repair' },
  keywords: [
    'AirPods repair Johannesburg',
    'can AirPods be repaired',
    'AirPods battery replacement Johannesburg',
    'one AirPod not working repair',
    'AirPods Pro repair South Africa',
    'broken AirPods what to do',
  ],
};

const breadcrumbItems = [{ label: 'AirPods Repair' }];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'AirPods Repair', url: 'https://zasupport.com/airpods-repair' },
];

const faqs = [
  {
    question: 'Can AirPods be repaired at all?',
    answer:
      'In almost every case, no. AirPods and AirPods Pro are ultrasonically welded and glued shut during manufacture. There are no screws, no clips, and no serviceable openings. Reaching the battery or driver destroys the housing, and Apple does not supply replacement internal parts to independent workshops. This is why reputable repairers, ZA Support included, decline AirPods repair work rather than charging you for an attempt that cannot end well.',
  },
  {
    question:
      'Why does ZA Support not repair AirPods when you repair iPhones and MacBooks?',
    answer:
      'Because the engineering is fundamentally different. An iPhone or MacBook is designed to be opened: the display, battery, and logic board are modular parts we can replace and warranty properly. AirPods are sealed single-piece assemblies. We would rather tell you that honestly than take an assessment fee for a device we know we cannot fix to a standard we can stand behind.',
  },
  {
    question: 'One of my AirPods has stopped working. What should I try first?',
    answer:
      'Before assuming hardware failure, clean the earbud mesh gently with a dry soft brush, check the ear tip seal on AirPods Pro, reset the AirPods (hold the case button until the light flashes amber then white), and re-pair them with your iPhone. Also check Settings for a firmware update and confirm the audio balance slider in Accessibility settings is centred. These steps resolve a surprising share of one-side-quiet complaints.',
  },
  {
    question:
      'My AirPods battery barely lasts an hour. Can the battery be replaced?',
    answer:
      'Not practically. The battery in each earbud is glued inside the sealed housing, and extraction destroys the earbud. Battery fade after a few years of charge cycles is the single most common AirPods end-of-life symptom. The realistic routes are Apple battery service or replacement of the affected earbud through Apple.',
  },
  {
    question: 'What are my options through Apple for faulty AirPods?',
    answer:
      'Apple offers service and one-for-one replacement of individual earbuds or the charging case, both in and out of warranty, and AppleCare+ for Headphones covers accidental damage. If your AirPods are within warranty or covered by the Consumer Protection Act, a manufacturing fault should cost you nothing. Check your coverage on the Apple support site before paying anyone for an attempted repair.',
  },
  {
    question: 'Do you repair AirPods Max?',
    answer:
      'No. Although AirPods Max are partially serviceable (ear cushions detach magnetically), the drivers, battery, and logic boards are not available as parts to independent repairers, so we refer AirPods Max faults to Apple as well. We are happy to help you work out whether the fault is the headphones or the source device before you commit to anything.',
  },
  {
    question: 'What Apple devices does ZA Support actually repair?',
    answer:
      'iPhones, iPads, MacBooks, iMacs, Mac minis, and Apple Watches at component level in our Hyde Park workshop: screens, batteries, charging ports, liquid damage, and logic board repair. If your AirPods problem turns out to be an iPhone problem, Bluetooth faults sometimes are, that we can fix properly, with a written 12-month warranty.',
  },
];

const faqSchema = buildFaqSchema(faqs);
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

export default function AirpodsRepairPage() {
  const whatsappUrl = buildWhatsAppUrl('AIRPODS-REFERRAL', 'general');

  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      {/* Hero */}
      <section className="hero-gradient grid-overlay pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              AirPods Repair
              <br />
              <span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              The honest answer first: ZA Support does not repair AirPods, and
              we suggest you are cautious of anyone who says they do. AirPods
              are sealed, glued units with no serviceable parts, and opening one
              destroys it. This page explains why, and what to do instead.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Headphones, label: 'Sealed Units, Not Serviceable' },
                { icon: CheckCircle, label: 'Honest Guidance' },
                { icon: Smartphone, label: 'iPhone & Mac Repairs Done Here' },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-3 py-2 rounded-full"
                >
                  <Icon className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">
                    {label}
                  </span>
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
                WhatsApp Us
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

      {/* Why not + what to do instead */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
            Why AirPods Cannot Be Economically Repaired
          </h2>
          <div className="space-y-5 text-[#7A9E98] leading-relaxed">
            <p>
              Every AirPods earbud is assembled around a tiny battery, a driver,
              and a flexible circuit, all encased in a housing that is
              ultrasonically welded and glued shut at the factory. There is no
              access panel and there are no fasteners. In our Hyde Park workshop
              we repair iPhones and MacBooks at component level every day, so
              this is not a question of skill or tooling: the product is simply
              not designed to be opened. Cutting an earbud apart to reach the
              battery wrecks the acoustic chamber and the housing, and Apple
              does not sell internal AirPods parts to independent repairers.
            </p>
            <p>
              That is why we say so upfront rather than taking your money for an
              assessment we already know the outcome of. If a workshop offers
              you an AirPods repair, ask exactly what will be replaced and what
              warranty you will receive in writing. In our experience the honest
              options are the ones below.
            </p>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#E8F4F1] mt-10 mb-4">
            What To Do With Faulty AirPods Instead
          </h2>
          <div className="space-y-5 text-[#7A9E98] leading-relaxed">
            <p>
              First, rule out the simple fixes: clean the mesh, reset and
              re-pair, update firmware, and test with another device. Our FAQ
              below walks through each step. If the fault persists, go through
              Apple. Apple services or replaces individual earbuds and charging
              cases, in and out of warranty, and AppleCare+ for Headphones
              covers accidental damage. Within the first years of ownership,
              South African Consumer Protection Act cover may also apply to
              manufacturing faults. Start at{' '}
              <a
                href="https://support.apple.com/airpods"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0FEA7A] hover:underline"
              >
                Apple&apos;s official AirPods support page
              </a>{' '}
              to check your coverage and service options.
            </p>
            <p>
              Second, if the problem might be the source device rather than the
              earbuds, one-sided audio, dropouts, and pairing failures are
              sometimes an iPhone Bluetooth or audio routing fault, we can
              diagnose that properly. That is the part ZA Support does do:
              component-level{' '}
              <Link
                href="/iphone-repair"
                className="text-[#0FEA7A] hover:underline"
              >
                iPhone repair
              </Link>
              ,{' '}
              <Link
                href="/battery-replacement"
                className="text-[#0FEA7A] hover:underline"
              >
                battery replacement
              </Link>
              ,{' '}
              <Link
                href="/screen-repair"
                className="text-[#0FEA7A] hover:underline"
              >
                screen repair
              </Link>{' '}
              and{' '}
              <Link
                href="/logic-board-repair"
                className="text-[#0FEA7A] hover:underline"
              >
                logic board repair
              </Link>{' '}
              for iPhone, iPad, and Mac, with a 12-month written warranty on our
              work.
            </p>
            <p>
              Dead AirPods should not go in the bin: lithium batteries are a
              fire risk in general waste. Apple accepts AirPods for recycling at
              its stores, and most South African e-waste programmes take them
              too.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="AirPods Repair, Common Questions" />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <div className="flex justify-center mb-4">
              <AlertTriangle className="w-6 h-6 text-[#F5A623]" />
            </div>
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
              iPhone, iPad or Mac Trouble? That We Fix.
            </h2>
            <p className="text-[#7A9E98] mb-6 max-w-xl mx-auto leading-relaxed">
              AirPods belong with Apple, but for everything else Apple we are
              the Johannesburg workshop: same-day iPhone repairs, MacBook logic
              board work, and honest written quotes from our Hyde Park workshop.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all"
              >
                WhatsApp Us
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link
                href="/apple-repair"
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all"
              >
                All Apple Repairs <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
