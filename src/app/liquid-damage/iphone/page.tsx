import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Shield, AlertTriangle } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'iPhone Liquid Damage Repair Johannesburg | ZA Support',
  description:
    'iPhone liquid damage repair in Johannesburg. All models iPhone 8 through 16 Pro Max. Free assessment, No Fix No Fee. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/liquid-damage/iphone' },
};

const faqs = [
  {
    question: 'My iPhone is IP67/IP68 rated — why did water damage it?',
    answer:
      'Apple\'s IP ratings are tested under specific laboratory conditions using fresh still water. Real-world liquid exposure is different. IP ratings degrade over time as seals wear. Saltwater, chlorinated pool water, and pressurised water (shower, running tap) can penetrate seals that would resist a brief submersion. Additionally, if your iPhone has been dropped before, the seal integrity may be compromised.',
  },
  {
    question: 'Which iPhone models do you repair for liquid damage?',
    answer:
      'iPhone 8, 8 Plus, X, XR, XS, XS Max, iPhone 11, 11 Pro, 11 Pro Max, iPhone 12 mini, 12, 12 Pro, 12 Pro Max, iPhone 13 mini, 13, 13 Pro, 13 Pro Max, iPhone 14, 14 Plus, 14 Pro, 14 Pro Max, iPhone 15, 15 Plus, 15 Pro, 15 Pro Max, iPhone 16, 16 Plus, 16 Pro, 16 Pro Max.',
  },
  {
    question: 'My iPhone shows the liquid detection alert. What should I do?',
    answer:
      'Do not try to charge it. Apple\'s liquid contact indicator (LCI) has been triggered — there is moisture in the charging port or near the logic board. Bring it to us immediately. Do not put it in rice, do not try to dry it with a hair dryer, and do not attempt to charge it as this can cause short circuit damage that makes repair more difficult.',
  },
  {
    question: 'Can you recover data from a water-damaged iPhone?',
    answer:
      'In most cases, yes. iPhones encrypt data on the device, but if we can repair the logic board or restore sufficient power to the device, data recovery is often possible. We also work with clients to restore from iCloud or iTunes backup where available. If you have a recent backup, your data is safe regardless of the physical repair outcome.',
  },
  {
    question: 'How long does iPhone liquid damage repair take?',
    answer:
      'Most iPhone liquid damage repairs are completed within 24–48 hours. The process involves disassembly, ultrasonic cleaning, drying, diagnostic, and component repair if needed. We will give you a realistic timeframe after the initial assessment.',
  },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Liquid Damage Repair', item: 'https://zasupport.com/liquid-damage' },
    { '@type': 'ListItem', position: 3, name: 'iPhone', item: 'https://zasupport.com/liquid-damage/iphone' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function iPhoneLiquidDamagePage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Liquid Damage Repair', href: '/liquid-damage' },
            { label: 'iPhone' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
              iPhone Liquid Damage
              <br /><span className="text-[#0FEA7A]">Repair Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-6 max-w-3xl leading-relaxed">
              iPhone liquid damage repair. All models iPhone 8 through iPhone 16 Pro Max.
              Free assessment, No Fix No Fee, warranty. Hyde Park, Johannesburg.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                Free Assessment <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="urgency-banner flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-white flex-shrink-0 mt-0.5" />
            <p className="text-white font-medium">
              Do not charge your iPhone after liquid exposure. This can cause permanent short-circuit damage.
              Switch it off and bring it in immediately.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>What IP67/IP68 Actually Means</h2>
              <p className="text-[#7A9E98] leading-relaxed mb-4">
                Apple rates modern iPhones at IP67 (iPhone 8 through 11) and IP68 (iPhone 12 and later). These ratings
                mean the device was tested to resist submersion in controlled laboratory conditions — typically 1–4 metres
                of still, fresh water for up to 30 minutes.
              </p>
              <p className="text-[#7A9E98] leading-relaxed mb-4">
                Real-world liquid exposure is entirely different. Seawater, pool water with chlorine, drinks with
                sugar and acids, and water under pressure (showers, running taps) all exceed what the IP rating is
                designed to handle. Additionally, IP ratings degrade over time — a two-year-old iPhone 14 no longer
                has the same water resistance as a new one.
              </p>
              <p className="text-[#7A9E98] leading-relaxed">
                This is why we regularly see iPhones with high IP ratings that have suffered liquid damage — the
                rating is a guide, not a guarantee. When liquid damage occurs, the repair process is the same
                regardless of the device&apos;s IP rating.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>Models We Repair</h2>
              <div className="glass-card p-6">
                {[
                  'iPhone 8 / 8 Plus',
                  'iPhone X / XS / XR / XS Max',
                  'iPhone 11 / 11 Pro / 11 Pro Max',
                  'iPhone 12 Series',
                  'iPhone 13 Series',
                  'iPhone 14 Series',
                  'iPhone 15 / 16 Series',
                ].map((model, i) => (
                  <div key={model} className={`py-2.5 ${i < 6 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}>
                    <span className="text-[#7A9E98] text-sm">{model}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 mt-4 p-4 bg-[rgba(15,234,122,0.05)] rounded-xl border border-[rgba(15,234,122,0.1)]">
                <Shield className="w-5 h-5 text-[#0FEA7A] flex-shrink-0" />
                <p className="text-[#7A9E98] text-sm">Free assessment. No Fix No Fee. warranty on all repairs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="iPhone Liquid Damage — FAQs" />
        </div>
      </section>

      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>Related Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: 'iPhone Repair Hub', href: '/iphone-repair' },
              { title: 'Liquid Damage Hub', href: '/liquid-damage' },
              { title: 'MacBook Liquid Damage', href: '/liquid-damage/macbook-pro' },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="glass-card p-4 flex items-center justify-between group">
                <div>
                  <p className="text-[#E8F4F1] font-semibold text-sm">{item.title}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#7A9E98] group-hover:text-[#0FEA7A] transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>iPhone Got Wet? Act Now.</h2>
            <p className="text-[#7A9E98] mb-6">Free assessment. No Fix No Fee. Hyde Park, Johannesburg.</p>
            <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
              <Phone className="w-5 h-5" /> Call {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
