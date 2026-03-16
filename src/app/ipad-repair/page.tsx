import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, MessageCircle } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'iPad Repair Johannesburg | Screen, Battery & Charging | ZA Support',
  description:
    'iPad repair in Johannesburg. Screen, battery, charging port. iPad Pro M4, Air M2, mini 6. Assessment: from R599 ex VAT. Hyde Park.',
  keywords: [
    'ipad repair johannesburg',
    'ipad screen repair johannesburg',
    'ipad battery replacement johannesburg',
    'ipad pro repair johannesburg',
    'ipad air repair johannesburg',
    'ipad mini repair johannesburg',
    'broken ipad screen johannesburg',
    'ipad charging port repair johannesburg',
  ],
  alternates: { canonical: 'https://zasupport.com/ipad-repair' },
};

const faqs = [
  {
    question: 'How much does iPad screen repair cost in Johannesburg?',
    answer:
      'iPad repair costs depend on the model and fault. iPad Pro repairs are higher than mini/Air due to the more complex ProMotion display and laminated glass construction. Call or WhatsApp us with your model for an exact quote.',
  },
  {
    question: 'Do you repair iPad Pro M4 and M2 models?',
    answer:
      'Yes, we repair all current iPad Pro models including M4 and M2. However, Apple Silicon iPad Pros (M1, M2, M4) are significantly more complex than older models, the display is fully laminated, the logic board is denser, and parts are harder to source. Repairs take longer and carry a higher parts cost. We are transparent about this upfront. For complex iPad Pro repairs we carry out a full assessment before committing to a price.',
  },
  {
    question: 'How long does iPad repair take?',
    answer:
      'iPad mini, Air, and standard iPad screen repairs typically take 2–4 hours. iPad Pro repairs take 4–8 hours depending on the model. Battery replacements take 1–2 hours for most models. Charging port repairs take 2–3 hours. We will confirm the exact timeframe when you bring it in.',
  },
  {
    question: 'Will Apple Pencil compatibility be affected after screen repair?',
    answer:
      'No, if the repair is done correctly. We use OEM-equivalent digitiser panels that maintain Apple Pencil (1st and 2nd generation) compatibility. We test Apple Pencil functionality after every screen repair before returning the device.',
  },
  {
    question: 'Is it worth repairing an iPad or should I replace it?',
    answer:
      'It depends on the repair and the model. Battery and charging port repairs are almost always worth it, they cost a fraction of a new iPad and extend the life significantly. Screen repairs are worth it on mid-range and Pro models. We will give you an honest cost-benefit comparison at assessment. If it is not worth repairing, we will tell you.',
  },
  {
    question: 'My iPad screen is shattered but the display underneath still works. Can you fix just the glass?',
    answer:
      'On older iPad models (iPad 6th–9th generation, some mini models), we can sometimes replace just the digitiser glass rather than the full assembly, which reduces cost. On iPad Air, iPad mini 6, and iPad Pro, the display is fully laminated so the full assembly must be replaced. We assess this at intake to recommend the most cost-effective approach.',
  },
  {
    question: 'Can you fix an iPad that will not charge?',
    answer:
      'Yes. Charging issues are usually one of three things: a faulty USB-C or Lightning port, a damaged charging cable or adapter, or a battery that no longer accepts charge. We diagnose all three and test the port and battery before quoting.',
  },
  {
    question: 'Do you offer a warranty on iPad repairs?',
    answer:
      'Yes. All iPad repairs carry a warranty on parts and labour. If the same fault recurs within the warranty period, we fix it at no charge. This excludes physical damage or liquid damage after the repair.',
  },
];

const repairServices = [
  {
    title: 'Screen Replacement',
    desc: 'LCD and digitiser assembly. All iPad models including current M-series.',
    priceStandard: 'Contact for pricing',
    pricePro: '',
    note: 'Apple Silicon iPads require additional time and care.',
  },
  {
    title: 'Battery Replacement',
    desc: 'Restore full battery capacity and eliminate unexpected shutdowns.',
    priceStandard: 'Contact for pricing',
    pricePro: '',
    note: 'Battery health check included at no charge.',
  },
  {
    title: 'Charging Port Repair',
    desc: 'Lightning and USB-C port replacement. Fixes slow/no charging and sync issues.',
    priceStandard: 'Contact for pricing',
    pricePro: '',
    note: 'Port cleaning attempted first before replacement.',
  },
  {
    title: 'Liquid Damage',
    desc: 'Ultrasonic board clean, component-level diagnosis, and board repair.',
    priceStandard: 'Contact for pricing',
    pricePro: '',
    note: 'Assessment: from R599 ex VAT applies, no charge if repair is not possible.',
  },
];

const models = [
  { family: 'iPad (Standard)', models: '6th, 7th, 8th, 9th, 10th Generation' },
  { family: 'iPad mini', models: '4th, 5th, 6th Generation' },
  { family: 'iPad Air', models: '3rd Gen, 4th Gen (M1), 5th Gen (M2)' },
  { family: 'iPad Pro 11"', models: '1st, 2nd, 3rd Gen, M4' },
  { family: 'iPad Pro 12.9" / 13"', models: '2nd through 6th Gen, M4' },
  { family: 'Accessories', models: 'Smart Keyboard, Smart Folio' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'iPad Repair Johannesburg',
  description:
    'Professional iPad repair in Johannesburg. Screen, battery, charging port, and liquid damage repair for all iPad models including iPad Pro M4, iPad Air M2, and iPad mini 6.',
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
    reviewCount: '632',
    bestRating: '5',
    worstRating: '1',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'iPad Repair', item: 'https://zasupport.com/ipad-repair' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function iPadRepairPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      {/* Hero */}
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'iPad Repair' }]} />
          <div className="mt-8 max-w-4xl">
            <p className="text-[#0FEA7A] font-mono text-sm tracking-widest uppercase mb-4">
              Hyde Park, Johannesburg
            </p>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6"
             
            >
              iPad Repair Johannesburg
              <br />
              <span className="text-[#0FEA7A]">All Models. All Damage.</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Professional iPad repair in Johannesburg. Screen, battery, and charging port repairs for all iPad models including M4 iPad Pro, Air M2, and mini 6.
            </p>
            <p className="text-[#7A9E98] mb-8 max-w-3xl">
              Assessment: from R599 ex VAT. warranty on all repairs. Assessment: from R599 ex VAT, no charge if we cannot fix it.
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

      {/* Pricing */}
      <section className="py-12 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-extrabold text-[#E8F4F1] mb-4 text-center"
           
          >
            iPad Repair Prices, Johannesburg
          </h2>
          <p className="text-[#7A9E98] text-center mb-10 max-w-2xl mx-auto">
            Starting prices for common repairs. Exact quotes provided after assessment fee (from R599 ex VAT).
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {repairServices.map((service) => (
              <div key={service.title} className="glass-card p-6">
                <h3
                  className="text-[#E8F4F1] font-bold text-xl mb-2"
                 
                >
                  {service.title}
                </h3>
                <p className="text-[#7A9E98] text-sm mb-4">{service.desc}</p>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="text-[#0FEA7A] font-bold text-lg">{service.priceStandard}</span>
                  {service.pricePro && (
                    <span className="text-[#7A9E98] text-sm">| {service.pricePro}</span>
                  )}
                </div>
                {service.note && (
                  <p className="text-[#7A9E98] text-xs italic border-t border-[rgba(15,234,122,0.1)] pt-3">
                    {service.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Honest note on Apple Silicon iPads */}
      <section className="py-12 sm:py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[rgba(39,80,77,0.25)] border border-[rgba(15,234,122,0.15)] rounded-2xl p-8">
            <h2
              className="text-2xl font-extrabold text-[#E8F4F1] mb-4"
             
            >
              A Honest Word on iPad Pro M4 and M2 Repairs
            </h2>
            <p className="text-[#7A9E98] mb-4 leading-relaxed">
              Apple Silicon iPad Pros are genuinely harder to repair. The display is fully laminated — glass, digitiser, and LCD are fused — meaning the entire assembly must be replaced even for a cracked outer glass.
            </p>
            <p className="text-[#7A9E98] leading-relaxed">
              M4 and M2 iPad Pro repairs require a full assessment before we commit to a price. Standard iPad, iPad mini, and older Air models are straightforward — 2–4 hours in most cases.
            </p>
          </div>
        </div>
      </section>

      {/* Models */}
      <section className="py-12 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-extrabold text-[#E8F4F1] mb-4"
           
          >
            iPad Models We Repair
          </h2>
          <p className="text-[#7A9E98] mb-8">
            All current and recent iPad generations. Call to confirm parts availability for specific models.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {models.map((item) => (
              <div key={item.family} className="glass-card p-4">
                <p className="text-[#E8F4F1] font-semibold mb-1">{item.family}</p>
                <p className="text-[#7A9E98] text-xs">{item.models}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why ZA Support */}
      <section className="py-12 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-extrabold text-[#E8F4F1] mb-10 text-center"
           
          >
            Why Bring Your iPad to ZA Support?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Assessment: from R599 ex VAT',
                desc: 'If we cannot repair your iPad, assessment fee of from R599 ex VAT applies. No diagnostic fee, no call-out charge.',
              },
              {
                title: 'Warranty',
                desc: 'All parts and labour carry a up-to-3 year warranty. Same fault within the warranty period, we fix it free.',
              },
              {
                title: 'Assessment: from R599 ex VAT',
                desc: 'We inspect your iPad and give you a full quote before starting any work. You decide.',
              },
              {
                title: 'Apple Pencil Tested',
                desc: 'Every screen repair is verified with Apple Pencil before it leaves our hands.',
              },
              {
                title: 'Honest Advice',
                desc: 'If a repair is not worth doing, we will tell you and recommend a better path.',
              },
              {
                title: 'Hyde Park, Johannesburg',
                desc: '1 Hyde Lane, Hyde Park. Serving Sandton, Rosebank, Randburg, and surrounding areas.',
              },
            ].map((item) => (
              <div key={item.title} className="glass-card p-6">
                <h3
                  className="text-[#0FEA7A] font-bold text-base mb-2"
                 
                >
                  {item.title}
                </h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-extrabold text-[#E8F4F1] mb-10 text-center"
           
          >
            How iPad Repair Works
          </h2>
          <div className="space-y-6">
            {[
              {
                step: '1',
                title: 'WhatsApp or Call First',
                desc: 'Send us a photo of the damage on WhatsApp or call. We will give you a rough estimate and confirm parts availability before you make a trip.',
              },
              {
                step: '2',
                title: 'Book Your Assessment',
                desc: 'Drop off your iPad at our Hyde Park office. We inspect it thoroughly, check screen, battery health, charging port, and any water damage. Assessment is free.',
              },
              {
                step: '3',
                title: 'Quote, You Decide',
                desc: 'We give you a fixed quote for the repair. No surprises. You decide whether to go ahead. No charge if you decline.',
              },
              {
                step: '4',
                title: 'Repair with Warranty',
                desc: 'We carry out the repair. You are notified when it is ready. All repairs carry a warranty on parts and labour.',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-5 glass-card p-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[rgba(15,234,122,0.15)] border border-[rgba(15,234,122,0.3)] flex items-center justify-center text-[#0FEA7A] font-bold text-sm">
                  {item.step}
                </div>
                <div>
                  <h3
                    className="text-[#E8F4F1] font-bold mb-1"
                   
                  >
                    {item.title}
                  </h3>
                  <p className="text-[#7A9E98] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="iPad Repair Johannesburg, Common Questions" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2
              className="text-3xl font-extrabold text-[#E8F4F1] mb-3"
             
            >
              iPad Damaged? Let Us Fix It.
            </h2>
            <p className="text-[#7A9E98] mb-2">Screen repair &nbsp;|&nbsp; Battery replacement &nbsp;|&nbsp; Charging port repair</p>
            <p className="text-[#7A9E98] mb-8">Assessment: from R599 ex VAT. Hyde Park, Johannesburg.</p>
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
              { label: 'iPhone Repair', href: '/iphone-repair' },
              { label: 'MacBook Repair', href: '/macbook-repair' },
              { label: 'Apple Watch Repair', href: '/apple-watch-repair' },
              { label: 'Battery Replacement', href: '/battery-replacement' },
              { label: 'Liquid Damage Repair', href: '/liquid-damage' },
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
