import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, MessageCircle } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Apple Accessories Repair Johannesburg | Keyboard, Mouse & Trackpad | ZA Support',
  description:
    'Apple accessories repair in Johannesburg. Magic Keyboard, Magic Mouse, Magic Trackpad, and MagSafe cable repair. Hyde Park. Assessment: R899 ex VAT.',
  keywords: [
    'magic keyboard repair johannesburg',
    'mac accessories repair',
    'magic mouse repair johannesburg',
    'apple keyboard not working johannesburg',
    'magsafe cable repair johannesburg',
    'magic trackpad repair johannesburg',
    'apple accessories repair johannesburg',
  ],
  alternates: { canonical: 'https://zasupport.com/accessories-repair' },
};

const faqs = [
  {
    question: 'Can you repair a Magic Keyboard with sticky or unresponsive keys?',
    answer:
      'Yes. Sticky keys are almost always caused by liquid contamination, crumbs, or dust beneath the keycaps. We disassemble the keyboard, clean the switch mechanisms and PCB, and test every key before returning it. If the scissor mechanism on a key is broken rather than dirty, we replace the individual key mechanism. Most Magic Keyboard faults are cleaning faults and are resolved the same day.',
  },
  {
    question: 'My Magic Mouse is not tracking properly or the click is not registering. Can you fix it?',
    answer:
      'Yes. Erratic tracking is commonly caused by a dirty optical sensor on the underside, we clean this as part of any mouse service. Unresponsive clicks are usually caused by worn click dome switches beneath the main surface. We assess whether the switches can be resoldered or whether a replacement is more practical. Battery degradation also causes tracking instability on Magic Mouse 2, we check battery health as part of every assessment.',
  },
  {
    question: 'The bottom charge port on my Magic Mouse is damaged. Can it be repaired?',
    answer:
      'Apple placed the Lightning charging port on the underside of Magic Mouse 2, making it impossible to use while charging, a well-known design choice. If the port is physically damaged or bent, we can assess and attempt a port repair or replacement. This is a board-level repair and success depends on how much the port has deformed. We quote after inspection.',
  },
  {
    question: 'Is my MagSafe cable covered under the Assessment: R899 ex VAT policy?',
    answer:
      'Yes. If we cannot determine whether the fault is with the cable, the adapter, or the MacBook charging circuit, or if the cable cannot be repaired, assessment fee of R899 ex VAT applies. Assessment: R899 ex VAT applies. In many cases we can identify whether the fault is in the cable, the brick, or the Mac itself, which saves you from replacing the wrong part.',
  },
  {
    question: 'Can you repair a Thunderbolt display or external monitor port?',
    answer:
      'External display port repair depends on whether the fault is in the display itself, the cable, or the Mac. We assess all three components to isolate the fault. Display-side port repairs (mini DisplayPort, Thunderbolt, USB-C on the monitor) are possible but depend on the specific model and whether replacement parts are available. We are always upfront about what is and is not fixable before any work begins.',
  },
  {
    question: 'My Magic Trackpad clicks but does not register. What is causing this?',
    answer:
      'Magic Trackpad uses a Force Touch mechanism rather than a physical click, it simulates click feedback using a Taptic Engine. If the click sensation is present but nothing registers, the issue is likely a driver or firmware fault rather than hardware. If the click sensation itself has disappeared, the Taptic Engine or its connection may be at fault. We diagnose both scenarios. A full reset and macOS update resolves the majority of trackpad registration faults before any hardware work is needed.',
  },
];

const repairServices = [
  {
    title: 'Magic Keyboard, Clean & Repair',
    models: 'All Magic Keyboard models (USB, Lightning, USB-C, Touch ID, Numeric)',
    note: 'Includes full disassembly, PCB clean, key mechanism test. Liquid damage assessed separately.',
  },
  {
    title: 'Magic Mouse, Repair & Service',
    models: 'Magic Mouse 1 & 2, Magic Mouse USB-C',
    note: 'Sensor clean, click switch test, battery health check. Port repair quoted separately.',
  },
  {
    title: 'Magic Trackpad, Repair & Service',
    models: 'Magic Trackpad 2 & 3',
    note: 'Force Touch mechanism and Taptic Engine assessment included.',
  },
  {
    title: 'MagSafe Cable, Assessment',
    models: 'MagSafe, MagSafe 2, USB-C MagSafe 3',
    note: 'Fault isolation: cable vs brick vs Mac. No charge if unfixable.',
  },
  {
    title: 'External Display Port Repair',
    models: 'Thunderbolt Display, LG UltraFine, Studio Display',
    note: 'Mini DisplayPort, Thunderbolt, USB-C. Success depends on damage and parts availability.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Apple Accessories Repair Johannesburg',
  description:
    'Apple accessories repair in Johannesburg. Magic Keyboard, Magic Mouse, Magic Trackpad, and MagSafe cable assessment. Hyde Park. Assessment: R899 ex VAT.',
  provider: {
    '@type': 'LocalBusiness',
    name: SITE.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1 Hyde Lane, Second Floor, Office E2004',
      addressLocality: 'Hyde Park, Johannesburg',
      addressRegion: 'Gauteng',
      postalCode: '2196',
      addressCountry: 'ZA',
    },
    telephone: CONTACT.phoneTel,
    url: 'https://zasupport.com',
  },
  areaServed: 'Johannesburg',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: SITE.rating,
    reviewCount: '120',
    bestRating: '5',
    worstRating: '1',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Apple Accessories Repair', item: 'https://zasupport.com/accessories-repair' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function AccessoriesRepairPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      {/* Hero */}
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Apple Accessories Repair' }]} />
          <div className="mt-8 max-w-4xl">
            <p className="text-[#0FEA7A] font-mono text-sm tracking-widest uppercase mb-4">
              Hyde Park, Johannesburg
            </p>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Apple Accessories Repair
              <br />
              <span className="text-[#0FEA7A]">Keyboard, Mouse & Trackpad.</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Magic Keyboard sticky keys, Magic Mouse not clicking, MagSafe not charging? Free fault isolation included, we diagnose before quoting any repair.
            </p>
            <p className="text-[#7A9E98] mb-8 max-w-3xl">
              Assessment: R899 ex VAT. Free fault isolation. Hyde Park, Johannesburg.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp Us
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-extrabold text-[#E8F4F1] mb-4 text-center"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Apple Accessories We Repair
          </h2>
          <p className="text-[#7A9E98] text-center mb-10 max-w-2xl mx-auto">
            Most accessory faults are cleaning or switch faults, not hardware failure. We diagnose first.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {repairServices.map((service) => (
              <div key={service.title} className="glass-card p-6">
                <h3
                  className="text-[#E8F4F1] font-bold text-xl mb-1"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  {service.title}
                </h3>
                <p className="text-[#7A9E98] text-xs mb-3">{service.models}</p>

                {service.note && (
                  <p className="text-[#7A9E98] text-xs italic border-t border-[rgba(15,234,122,0.1)] pt-3 mt-3">
                    {service.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common symptoms */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-extrabold text-[#E8F4F1] mb-8"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Common Apple Accessory Faults
          </h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">
            Apple accessories are well-built but face the same practical realities as any device used daily, liquid
            spills, crumbs, worn switches, and connector fatigue. Most faults are fixable. Here is what we see most
            often and what resolves it.
          </p>
          <div className="space-y-4">
            {[
              {
                symptom: 'Magic Keyboard, one or more keys not working',
                fix: 'Debris or liquid beneath the scissor mechanism, disassemble, clean, and test each switch',
              },
              {
                symptom: 'Magic Keyboard, keys feel sticky',
                fix: 'Residue on switch mechanism, full clean with IPA, usually same day',
              },
              {
                symptom: 'Magic Mouse, erratic cursor movement',
                fix: 'Dirty optical sensor on underside, clean resolves most tracking faults',
              },
              {
                symptom: 'Magic Mouse, left or right click not registering',
                fix: 'Click dome switch worn, resolder or replace the switch mechanism',
              },
              {
                symptom: 'Magic Mouse, not charging',
                fix: 'Lightning port damage or battery degradation, port repair or battery assessment',
              },
              {
                symptom: 'Magic Trackpad, click not registering',
                fix: 'Usually a firmware or driver fault, full reset first. If Taptic Engine fault: hardware assessment',
              },
              {
                symptom: 'MagSafe not charging MacBook',
                fix: 'Fault isolation: cable vs brick vs Mac charging circuit, we identify the source before any repair',
              },
              {
                symptom: 'External display not detected',
                fix: 'Cable, port, or Mac GPU fault, we test all three to isolate before quoting any repair',
              },
            ].map((item) => (
              <div
                key={item.symptom}
                className="glass-card p-5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
              >
                <p className="text-[#E8F4F1] font-semibold sm:w-64 flex-shrink-0">{item.symptom}</p>
                <p className="text-[#7A9E98] text-sm">{item.fix}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why ZA Support */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-extrabold text-[#E8F4F1] mb-10 text-center"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Why Repair Rather Than Replace?
          </h2>
          <p className="text-[#7A9E98] text-center mb-10 max-w-2xl mx-auto">
            A new Magic Keyboard retails for far more than a repair costs to resolve.
            The same logic applies to Magic Mouse and Trackpad.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Assessment: R899 ex VAT',
                desc: 'Cannot fix it? Assessment fee of R899 ex VAT applies. Applies to keyboards, mice, trackpads, and MagSafe assessments.',
              },
              {
                title: 'Fault Isolation Included',
                desc: 'We identify whether the problem is the accessory, the cable, or the Mac before any work starts. Stops you replacing the wrong thing.',
              },
              {
                title: 'Same-Day for Cleaning',
                desc: 'Sticky keyboard, dirty mouse sensor, contaminated trackpad, cleaning jobs are done same day in most cases.',
              },
              {
                title: 'Board-Level Repair',
                desc: 'Switch replacement, port repair, and connector work carried out in-house. Not just a clean and return.',
              },
              {
                title: 'All Magic Accessories',
                desc: 'Magic Keyboard (all variants including numeric and Touch ID), Magic Mouse 1 and 2, Magic Trackpad 2 and 3.',
              },
              {
                title: 'Hyde Park, Johannesburg',
                desc: '1 Hyde Lane, Hyde Park. Convenient for Sandton, Rosebank, Parktown, and Northcliff.',
              },
            ].map((item) => (
              <div key={item.title} className="glass-card p-6">
                <h3
                  className="text-[#0FEA7A] font-bold text-base mb-2"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  {item.title}
                </h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Apple Accessories Repair Johannesburg, Common Questions" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2
              className="text-3xl font-extrabold text-[#E8F4F1] mb-3"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Accessory Not Working? Bring It In.
            </h2>

            <p className="text-[#7A9E98] mb-8">Assessment: R899 ex VAT. Free fault isolation. Hyde Park, Johannesburg.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp Us Now
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related links */}
      <section className="py-12 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#7A9E98] text-sm mb-4">Related Repairs</p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'MacBook Repair', href: '/macbook-repair' },
              { label: 'MacBook Keyboard Repair', href: '/macbook-repair/keyboard' },
              { label: 'MacBook Trackpad Repair', href: '/macbook-repair/trackpad' },
              { label: 'AirPods Repair', href: '/airpods-repair' },
              { label: 'Apple Watch Repair', href: '/apple-watch-repair' },
              { label: 'Apple Repair Johannesburg', href: '/apple-repair' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-1 text-sm text-[#7A9E98] hover:text-[#0FEA7A] transition-colors"
              >
                {link.label} <ArrowRight className="w-3 h-3" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
