import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, MessageCircle, AlertTriangle } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Apple Watch Repair Johannesburg | Screen & Battery | ZA Support',
  description:
    'Apple Watch repair in Johannesburg. Screen replacement, battery replacement, crown and button repair. Assessment: R899 ex VAT. 3-month warranty. Hyde Park.',
  keywords: [
    'apple watch repair johannesburg',
    'apple watch screen crack johannesburg',
    'apple watch battery replacement johannesburg',
    'apple watch screen replacement johannesburg',
    'apple watch series repair johannesburg',
    'broken apple watch screen johannesburg',
    'apple watch repair cost johannesburg',
  ],
  alternates: { canonical: 'https://zasupport.com/apple-watch-repair' },
};

const faqs = [
  {
    question: 'How much does Apple Watch screen repair cost in Johannesburg?',
    answer:
      'Apple Watch screen (LTPO OLED display and Ion-X glass) replacement is available for Series 3 through Series 9. Series 7 and later models are more complex due to the larger always-on display and tighter tolerances. Call or WhatsApp with your Watch model and series for an exact quote.',
  },
  {
    question: 'Do you repair Apple Watch Series 7, 8, and 9?',
    answer:
      'Yes, but with an important caveat. Series 7 and later introduced a significantly redesigned display assembly with a much smaller internal gap between the screen and the case. This makes screen replacement more difficult and time-consuming. We handle these repairs carefully, but turnaround is longer and parts cost more. We assess every watch before quoting.',
  },
  {
    question: 'Do you repair Apple Watch Ultra or Ultra 2?',
    answer:
      'No. Apple Watch Ultra is not a service we offer. The Ultra uses a titanium case with a custom display assembly that is not serviceable outside of Apple. We would rather be honest upfront than attempt a repair we cannot stand behind. Contact Apple directly for Ultra repairs.',
  },
  {
    question: 'How long does Apple Watch repair take?',
    answer:
      'Screen replacements typically take 2–4 hours for Series 3 through 6. Series 7 and later take 4–6 hours. Battery replacements take 1–2 hours for most models. Crown and button repairs vary depending on the issue, from 1 hour to a full day for complex cases.',
  },
  {
    question: 'Can Apple Watch water resistance be restored after screen repair?',
    answer:
      'Apple Watch water resistance relies on adhesive sealing around the display. We use appropriate adhesive and re-seal the watch after every screen repair. However, we do not certify water resistance to Apple specifications after a third-party repair, this is an honest limitation of any non-Apple repair. If water resistance is critical to your use case, this is worth knowing in advance.',
  },
  {
    question: 'My Apple Watch shows a red lightning bolt or will not turn on. Is this a battery issue?',
    answer:
      'Usually yes. A red lightning bolt on Apple Watch indicates a critically low or dead battery. In most cases the watch will recover after charging. If it still does not respond after 30 minutes on the charger, the battery may need replacement or there is a charging port fault. Bring it in for a assessment fee (R899 ex VAT).',
  },
];

const repairServices = [
  {
    title: 'Screen Replacement',
    models: 'Series 3, 4, 5, 6 (38mm / 40mm / 42mm / 44mm)',
    note: 'Series 7 and later: more complex due to redesigned display, assessment required.',
  },
  {
    title: 'Battery Replacement',
    models: 'All Apple Watch Series 3 through Series 9',
    note: 'Battery health test included at no charge before quoting.',
  },
  {
    title: 'Crown & Side Button Repair',
    models: 'Series 3 through Series 9',
    note: 'Digital Crown sticky, unresponsive, or damaged. Side button stuck or broken.',
  },
  {
    title: 'Back Glass / Sensor Cover',
    models: 'Series 4 and later',
    note: 'Cracked ceramic back. Heart rate sensor may be affected, tested post-repair.',
  },
];

const seriesSupport = [
  { series: 'Series 3 (38mm / 42mm)', screen: 'Available', battery: 'Available', note: 'Standard' },
  { series: 'Series 4 (40mm / 44mm)', screen: 'Available', battery: 'Available', note: 'Standard' },
  { series: 'Series 5 (40mm / 44mm)', screen: 'Available', battery: 'Available', note: 'Standard' },
  { series: 'Series 6 (40mm / 44mm)', screen: 'Available', battery: 'Available', note: 'Standard' },
  { series: 'Series 7 (41mm / 45mm)', screen: 'Assessment required', battery: 'Available', note: 'More complex, longer turnaround' },
  { series: 'Series 8 (41mm / 45mm)', screen: 'Assessment required', battery: 'Available', note: 'More complex, assessment required' },
  { series: 'Series 9 (41mm / 45mm)', screen: 'Assessment required', battery: 'Available', note: 'Assessment required' },
  { series: 'Apple Watch SE (1st & 2nd Gen)', screen: 'Available', battery: 'Available', note: 'Standard' },
  { series: 'Apple Watch Ultra / Ultra 2', screen: '—', battery: '—', note: 'Not offered, Apple Service only' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Apple Watch Repair Johannesburg',
  description:
    'Apple Watch screen and battery repair in Johannesburg. Series 3 through Series 9. Assessment: R899 ex VAT. Hyde Park.',
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
  offers: [
    { '@type': 'Offer', name: 'Apple Watch Screen Replacement (Series 3–6)' },
    { '@type': 'Offer', name: 'Apple Watch Screen Replacement (Series 7+)' },
    { '@type': 'Offer', name: 'Apple Watch Battery Replacement' },
    { '@type': 'Offer', name: 'Apple Watch Crown Repair' },
  ],
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
    { '@type': 'ListItem', position: 2, name: 'Apple Watch Repair', item: 'https://zasupport.com/apple-watch-repair' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function AppleWatchRepairPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      {/* Hero */}
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Apple Watch Repair' }]} />
          <div className="mt-8 max-w-4xl">
            <p className="text-[#0FEA7A] font-mono text-sm tracking-widest uppercase mb-4">
              Hyde Park, Johannesburg
            </p>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6"
             
            >
              Apple Watch Repair Johannesburg
              <br />
              <span className="text-[#0FEA7A]">Screen, Battery & Crown.</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Cracked Apple Watch screen or dead battery? Screen and battery replacement for Series 3 through Series 9 and Apple Watch SE.
            </p>
            <p className="text-[#7A9E98] mb-8 max-w-3xl">
              Assessment: R899 ex VAT. 3-month warranty. Assessment: R899 ex VAT. Hyde Park, Johannesburg.
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
           
          >
            Apple Watch Repair Services
          </h2>
          <p className="text-[#7A9E98] text-center mb-10 max-w-2xl mx-auto">
            Starting prices for common Apple Watch repairs. Exact quote after assessment fee (R899 ex VAT).
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {repairServices.map((service) => (
              <div key={service.title} className="glass-card p-6">
                <h3
                  className="text-[#E8F4F1] font-bold text-xl mb-1"
                 
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

      {/* Ultra warning */}
      <section className="py-12 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[rgba(245,166,35,0.08)] border border-[rgba(245,166,35,0.25)] rounded-2xl p-6 flex gap-4">
            <AlertTriangle className="w-6 h-6 text-[#F5A623] flex-shrink-0 mt-0.5" />
            <div>
              <h3
                className="text-[#F5A623] font-bold mb-2"
               
              >
                Apple Watch Ultra and Ultra 2, We Do Not Service These
              </h3>
              <p className="text-[#7A9E98] text-sm leading-relaxed">
                Apple Watch Ultra uses a titanium case and a custom display assembly that is not serviceable outside of
                Apple. Attempting a third-party Ultra repair risks permanently damaging the watch. We would rather be
                honest and send you to the right place than take your money for a repair we cannot do properly.
                Contact <strong className="text-[#E8F4F1]">Apple Support</strong> or an Apple Authorised Service
                Provider for Ultra repairs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing table by series */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-extrabold text-[#E8F4F1] mb-4"
           
          >
            Prices by Series
          </h2>
          <p className="text-[#7A9E98] mb-8">
            Starting prices. Final quote confirmed at assessment fee (R899 ex VAT) based on exact model and damage.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[rgba(15,234,122,0.15)]">
                  <th className="text-left text-[#7A9E98] font-medium pb-3 pr-4">Series</th>
                  <th className="text-left text-[#7A9E98] font-medium pb-3 pr-4">Screen</th>
                  <th className="text-left text-[#7A9E98] font-medium pb-3 pr-4">Battery</th>
                  <th className="text-left text-[#7A9E98] font-medium pb-3">Note</th>
                </tr>
              </thead>
              <tbody>
                {seriesSupport.map((row, i) => (
                  <tr
                    key={row.series}
                    className={`border-b border-[rgba(255,255,255,0.04)] ${i % 2 === 0 ? '' : 'bg-[rgba(15,234,122,0.02)]'}`}
                  >
                    <td className="text-[#E8F4F1] py-3 pr-4 font-medium">{row.series}</td>
                    <td className={`py-3 pr-4 font-semibold ${row.screen === '—' ? 'text-[#7A9E98]' : 'text-[#0FEA7A]'}`}>
                      {row.screen}
                    </td>
                    <td className={`py-3 pr-4 font-semibold ${row.battery === '—' ? 'text-[#7A9E98]' : 'text-[#0FEA7A]'}`}>
                      {row.battery}
                    </td>
                    <td className="text-[#7A9E98] py-3 text-xs">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Honest note on Series 7+ */}
      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[rgba(39,80,77,0.25)] border border-[rgba(15,234,122,0.15)] rounded-2xl p-8">
            <h2
              className="text-2xl font-extrabold text-[#E8F4F1] mb-4"
             
            >
              Series 7 and Later, What You Should Know
            </h2>
            <p className="text-[#7A9E98] mb-4 leading-relaxed">
              Apple redesigned the Apple Watch case in Series 7 to support a larger, edge-to-edge display. The internal
              clearance is tighter, and the display adhesive and sealing system changed significantly. This makes
              screen repairs more time-intensive and parts more expensive compared to Series 3 through 6.
            </p>
            <p className="text-[#7A9E98] mb-4 leading-relaxed">
              We repair Series 7, 8, and 9, but we require a full assessment first and turnaround is typically
              4–6 hours rather than 2. Battery replacements on these models are straightforward and
              unaffected by the screen design change.
            </p>
            <p className="text-[#7A9E98] leading-relaxed">
              Series 3 through 6 and Apple Watch SE are our fastest turnaround repairs, parts are widely available
              and the procedure is well established.
            </p>
          </div>
        </div>
      </section>

      {/* Why ZA Support */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-extrabold text-[#E8F4F1] mb-10 text-center"
           
          >
            Why ZA Support for Apple Watch?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Assessment: R899 ex VAT',
                desc: 'Cannot fix it? Assessment fee of R899 ex VAT applies. No assessment fee, no call-out charge, no admin.',
              },
              {
                title: 'Warranty',
                desc: 'All Apple Watch repairs carry a parts and labour 3-month warranty. Same fault, we fix it at no charge.',
              },
              {
                title: 'Sensor Testing',
                desc: 'We test heart rate sensor, GPS, and accelerometer after every screen repair before returning the watch.',
              },
              {
                title: 'Honest About Limitations',
                desc: 'We do not service Apple Watch Ultra. We tell you upfront what we can and cannot do rather than attempt repairs we cannot stand behind.',
              },
              {
                title: 'Assessment: R899 ex VAT',
                desc: 'Bring it in. We inspect and quote. No charge if you decide not to proceed.',
              },
              {
                title: 'Hyde Park, Johannesburg',
                desc: '1 Hyde Lane, Hyde Park. Convenient for Sandton, Rosebank, Parktown, and Northcliff.',
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

      {/* Common symptoms */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-extrabold text-[#E8F4F1] mb-8"
           
          >
            Common Apple Watch Problems We Fix
          </h2>
          <div className="space-y-4">
            {[
              { symptom: 'Cracked or shattered screen', fix: 'Display assembly replacement, screen + glass as one unit' },
              { symptom: 'Battery drains within a few hours', fix: 'Battery replacement, restores all-day battery life' },
              { symptom: 'Apple Watch will not charge', fix: 'Charging contact clean, magnetic charger test, or battery replacement' },
              { symptom: 'Red lightning bolt or dead screen', fix: 'Battery critically discharged, charge for 30 min, or battery replacement' },
              { symptom: 'Digital Crown stuck or unresponsive', fix: 'Crown cleaning or replacement, common on older Series' },
              { symptom: 'Side button not clicking', fix: 'Button mechanism repair or replacement' },
              { symptom: 'Cracked ceramic back', fix: 'Back glass/sensor cover replacement, Series 4 and later' },
              { symptom: 'Ghost touches or unresponsive screen', fix: 'Display replacement, often caused by micro-cracks in digitiser layer' },
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

      {/* FAQ */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Apple Watch Repair Johannesburg, Common Questions" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2
              className="text-3xl font-extrabold text-[#E8F4F1] mb-3"
             
            >
              Apple Watch Damaged? Bring It In.
            </h2>
            <p className="text-[#7A9E98] mb-2">
              Screen replacement &nbsp;|&nbsp; Battery replacement &nbsp;|&nbsp; Crown repair
            </p>
            <p className="text-[#7A9E98] mb-8">Assessment: R899 ex VAT. 3-month warranty. Hyde Park, Johannesburg.</p>
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
      <section className="py-12 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#7A9E98] text-sm mb-4">Related Repairs</p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'iPhone Repair', href: '/iphone-repair' },
              { label: 'iPad Repair', href: '/ipad-repair' },
              { label: 'MacBook Repair', href: '/macbook-repair' },
              { label: 'Battery Replacement', href: '/battery-replacement' },
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
