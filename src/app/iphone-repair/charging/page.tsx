import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, CheckCircle, Star, MessageCircle, Shield, Clock, Wrench, Zap, AlertTriangle } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQ';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildBreadcrumbSchema, buildServiceSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'iPhone Not Charging, Repair Johannesburg | ZA Support',
  description:
    'iPhone not charging? Lightning and USB-C port repair in Johannesburg. All models iPhone 12 through 16 Pro Max. Same-day available. 3-month warranty. Hyde Park.',
  alternates: { canonical: 'https://zasupport.com/iphone-repair/charging' },
  keywords: [
    'iPhone not charging Johannesburg',
    'iPhone charging port repair Johannesburg',
    'iPhone Lightning port repair Johannesburg',
    'iPhone USB-C port repair Johannesburg',
    'iPhone charging port replacement Johannesburg',
    'iPhone 15 charging port repair Johannesburg',
    'iPhone not charging fix Johannesburg',
    'iPhone charging intermittent Johannesburg',
  ],
};

const pricingRows = [
  { model: 'Lint/Debris Clean (no parts)', note: 'Often resolves the fault' },
  { model: 'Lightning Port, iPhone 12/13', note: '' },
  { model: 'Lightning Port, iPhone 14', note: '' },
  { model: 'USB-C Port, iPhone 15/16', note: '' },
  { model: 'USB-C Port Pro, iPhone 15/16 Pro', note: '' },
  { model: 'Charging Board Replacement', note: 'If flex cable failed' },
  { model: 'Liquid-Damaged Port', note: 'Corrosion cleaning + port' },
];

const symptoms = [
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'iPhone Not Charging At All',
    desc: 'You plug in the cable and nothing happens, no charging indicator, no sound. Before replacing the port we rule out the cable, adapter, and battery. The fix is often simpler than expected.',
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    title: 'Cable Falls Out of Port',
    desc: 'The Lightning or USB-C connector no longer seats firmly and falls out with the slightest movement. The port retaining clips have worn or broken, a port replacement resolves this permanently.',
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Charging Only When Angled',
    desc: 'The iPhone only charges when the cable is held at a specific angle. This indicates bent or corroded port pins. A port replacement is required, the fault will worsen without repair.',
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    title: 'Intermittent Charging',
    desc: 'The iPhone charges for a few minutes then stops, or only charges while the phone is stationary. This is caused by worn port contacts or a damaged charging flex cable.',
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Lint in Port',
    desc: 'Pocket lint compacts into the port over time, preventing the cable from seating properly. This is often mistaken for a broken port. We remove the lint safely, no parts required, low cost.',
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    title: 'No Data Sync via Cable',
    desc: 'Your iPhone charges but will not sync with a Mac or PC, or CarPlay no longer works via USB. The data pins in the port have failed while the charging pins still function.',
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Port Corroded After Liquid',
    desc: 'If your iPhone was exposed to water or moisture, the charging port is often the first component to corrode. Corrosion can spread, early cleaning and port replacement prevents further damage.',
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    title: 'Charging Very Slowly',
    desc: 'Your iPhone charges at 5W instead of the expected 20W. This can be caused by a dirty or damaged port, a faulty cable, or a failing charging circuit. We diagnose the root cause first.',
  },
];

const processSteps = [
  { step: '1', title: 'Assessment: R899 ex VAT', desc: 'Bring your iPhone in or WhatsApp us. We first test your cable and adapter, if those are the problem, there is no charge. Then we inspect the port.' },
  { step: '2', title: 'Root Cause Found', desc: 'We determine whether the fault is lint blockage, port damage, a charging flex cable, or a broader liquid damage issue. You get a written fixed-price quote.' },
  { step: '3', title: 'Port Repaired', desc: 'A certified technician cleans or replaces the charging port. Port replacement takes approximately 60 minutes. Lint cleaning takes under 30 minutes.' },
  { step: '4', title: 'Charging Verified', desc: 'We verify fast charging works at the correct wattage, test data sync via cable, and confirm CarPlay connectivity if applicable.' },
  { step: '5', title: 'Collect with Warranty', desc: 'You collect your iPhone with a written warranty on the repair and our labour. Assessment: R899 ex VAT, assessment fee of R899 ex VAT applies if we cannot resolve the fault.' },
];

const faqs = [
  {
    question: 'How much does iPhone charging port repair cost in Johannesburg?',
    answer:
      'We provide a assessment fee (R899 ex VAT) and fixed-price quote before any work. The cost depends on whether it is a simple lint clean, port replacement, or corrosion repair.',
  },
  {
    question: 'My iPhone stopped charging, is it definitely the port?',
    answer:
      'Not necessarily. The most common cause is actually a blocked port (lint) or a faulty cable or adapter. We always check the cable, adapter, and battery first before diagnosing the port. If it is lint, we clean it for a fraction of the cost of a port replacement.',
  },
  {
    question: 'How long does iPhone charging port repair take?',
    answer:
      'A lint cleaning takes 15–30 minutes. A port replacement typically takes 60 minutes. We confirm parts availability and turnaround time when you contact us, same-day service is available for most models.',
  },
  {
    question: 'Can you repair a Lightning port on older iPhones?',
    answer:
      'Yes. We repair Lightning ports on all iPhone models that use Lightning (iPhone 8 through iPhone 14). For USB-C models (iPhone 15 and later), we repair those as well. We stock charging ports for all current iPhone generations.',
  },
  {
    question: 'My iPhone 15 uses USB-C, can you repair that port?',
    answer:
      'Yes. We repair USB-C charging ports on iPhone 15, 15 Plus, 15 Pro, 15 Pro Max, iPhone 16, 16 Plus, 16 Pro, and 16 Pro Max. USB-C port repairs use the same process as Lightning, we confirm parts availability when you contact us.',
  },
  {
    question: 'Will charging port repair fix my CarPlay connectivity?',
    answer:
      'Possibly yes. Wired CarPlay uses the USB data pins in the charging port. If CarPlay stopped working after a drop or after the port started charging intermittently, port replacement often restores full CarPlay connectivity.',
  },
  {
    question: 'Is it safe to try cleaning the port myself with a toothpick?',
    answer:
      'We do not recommend it. Lint is tightly compacted and the port pins are easily bent. A misplaced tool can damage the data pins or push lint deeper into the connector housing. We use specialist tools to clean ports safely without risk of further damage.',
  },
  {
    question: 'What warranty do you offer on charging port repairs?',
    answer:
      'All charging port repairs at ZA Support come with a written warranty on parts and labour. If the port stops charging, data sync fails, or CarPlay fails within the warranty period, we fix it at no charge.',
  },
];

const reviews = [
  {
    name: 'Thandeka M.',
    suburb: 'Sandton',
    rating: 5,
    text: 'My iPhone 15 Pro stopped charging completely. ZA Support cleaned out the lint in 20 minutes, no parts, no port replacement needed. Saved me a fortune. They were honest about what the problem was.',
    date: 'February 2026',
  },
  {
    name: 'Craig F.',
    suburb: 'Rosebank',
    rating: 5,
    text: 'iPhone 14 charging port was loose and intermittent. Replaced the port in under an hour, charges perfectly and CarPlay works again. 3-month warranty. Excellent service.',
    date: 'January 2026',
  },
  {
    name: 'Yusuf A.',
    suburb: 'Fourways',
    rating: 5,
    text: 'iPhone fell in water and stopped charging after a day. ZA Support cleaned the corrosion and replaced the port. Back to normal charging speeds. Very knowledgeable team.',
    date: 'March 2026',
  },
];

const aggregateRatingSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'iPhone Charging Port Repair Johannesburg',
  description: 'iPhone not charging repair in Johannesburg. Lightning and USB-C ports. All models iPhone 12 through 16 Pro Max. Lint cleaning, port replacement, corrosion repair.',
  brand: { '@type': 'Brand', name: 'ZA Support' },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '120',
    bestRating: '5',
    worstRating: '1',
  },
  review: reviews.map((r) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: r.name },
    reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
    reviewBody: r.text,
    datePublished: r.date,
  })),
};

const serviceSchema = buildServiceSchema({
  name: 'iPhone Charging Port Repair Johannesburg',
  description: 'iPhone charging port repair in Johannesburg. Lightning and USB-C. All models iPhone 12 through 16 Pro Max. Lint cleaning, port replacement, corrosion. 3-month warranty.',
});

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'iPhone Repair', url: 'https://zasupport.com/iphone-repair' },
  { name: 'Charging Port Repair', url: 'https://zasupport.com/iphone-repair/charging' },
];

const faqSchema = buildFaqSchema(faqs);
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

const whatsappUrl = 'https://wa.me/27790539964?text=Hi%20ZA%20Support%2C%20my%20iPhone%20is%20not%20charging';

void LOCAL_BUSINESS_PROVIDER;

export default function iPhoneChargingPage() {
  return (
    <>
      <SchemaOrg schema={aggregateRatingSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'iPhone Repair', href: '/iphone-repair' },
              { label: 'Charging Port Repair' },
            ]}
          />
          <div className="mt-8 max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[rgba(15,234,122,0.1)] border border-[rgba(15,234,122,0.25)] text-[#0FEA7A] text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <Star className="w-4 h-4 fill-current" /> 4.9 / 5 from 120 verified repairs
            </div>
            <h1
              className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] leading-tight mb-6"
             
            >
              iPhone Not Charging?<br />
              <span className="text-[#0FEA7A]">Repair Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4">
              Charging port not working, cable falls out, lint blockage, we repair all iPhone charging faults.
              Lightning and USB-C, iPhone 12 through 16 Pro Max, same-day available, Hyde Park Johannesburg.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#7A9E98] mb-8">
              {['Assessment: R899 ex VAT', 'Assessment: R899 ex VAT', '3-Month Warranty', 'Lint clean available', 'Same-day available', 'Written quote'].map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#0FEA7A] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp Us
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link
                href="/iphone-repair"
                className="inline-flex items-center gap-2 border border-[rgba(255,255,255,0.1)] text-[#7A9E98] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(255,255,255,0.04)] transition-all"
              >
                All iPhone Repairs <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Repair Services ──────────────────────────────────────────────── */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
            iPhone Charging Repair Services, Johannesburg 2026
          </h2>
          <p className="text-[#7A9E98] mb-8 max-w-2xl">
            We always start with the simplest fix first. If lint is blocking the port, we clean it for a fraction
            of the cost of a full port replacement. Written fixed-price quote before any work.
          </p>
          <div className="glass-card overflow-hidden max-w-2xl">
            <div className="grid grid-cols-2 gap-0 bg-[rgba(15,234,122,0.06)] px-6 py-3 border-b border-[rgba(255,255,255,0.06)]">
              <span className="text-[#0FEA7A] text-xs font-bold uppercase tracking-wider">Repair Type</span>
              <span className="text-[#0FEA7A] text-xs font-bold uppercase tracking-wider text-right">Note</span>
            </div>
            {pricingRows.map((row, i) => (
              <div
                key={row.model}
                className={`grid grid-cols-2 gap-0 px-6 py-4 ${i < pricingRows.length - 1 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}
              >
                <span className="text-[#E8F4F1] text-sm font-medium">{row.model}</span>
                <span className="text-[#7A9E98] text-xs text-right self-center">{row.note}</span>
              </div>
            ))}
          </div>
          <p className="text-[#7A9E98] text-xs mt-4">
            All port repairs include written 3-month warranty. Assessment: R899 ex VAT.
            Assessment: R899 ex VAT, we test your cable and adapter first before quoting a port replacement.
          </p>
        </div>
      </section>

      {/* ── Symptoms ─────────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
            Charging Faults We Repair
          </h2>
          <p className="text-[#7A9E98] mb-10 max-w-2xl">
            Every fault listed below is something we diagnose and fix every day.
            We always identify the root cause before replacing any parts.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {symptoms.map((s) => (
              <div
                key={s.title}
                className="glass-card p-6 flex flex-col gap-3 hover:border-[rgba(15,234,122,0.3)] transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[rgba(15,234,122,0.1)] flex items-center justify-center text-[#0FEA7A]">
                  {s.icon}
                </div>
                <h3 className="text-[#E8F4F1] font-bold text-sm">
                  {s.title}
                </h3>
                <p className="text-[#7A9E98] text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose ZA Support ─────────────────────────────────────────── */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">
                Why Choose ZA Support for iPhone Charging Repair
              </h2>
              <div className="space-y-5">
                {[
                  {
                    icon: <Shield className="w-5 h-5" />,
                    title: 'Written Warranty',
                    desc: 'Every charging port repair carries a warranty on the replacement port and labour. If the fault returns within the warranty period, we fix it, no charge.',
                  },
                  {
                    icon: <Clock className="w-5 h-5" />,
                    title: 'Diagnose First, No Guessing',
                    desc: 'We test your cable, adapter, and battery before touching the port. Many charging faults are not the port, we find the actual cause and quote accordingly.',
                  },
                  {
                    icon: <Wrench className="w-5 h-5" />,
                    title: 'Fast Charging Verified',
                    desc: 'After every port replacement we verify fast charging works at the correct wattage for your model (20W, 27W, or 45W), and test USB data sync and CarPlay.',
                  },
                  {
                    icon: <CheckCircle className="w-5 h-5" />,
                    title: 'Lightning and USB-C',
                    desc: 'We repair both Lightning ports (iPhone 8 through 14) and USB-C ports (iPhone 15 and 16). We stock parts for all current iPhone generations.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[rgba(15,234,122,0.1)] flex items-center justify-center text-[#0FEA7A] flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-[#E8F4F1] font-semibold text-sm mb-1">
                        {item.title}
                      </h3>
                      <p className="text-[#7A9E98] text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {reviews.map((r) => (
                <div key={r.name} className="glass-card p-6 border-l-2 border-[#0FEA7A]">
                  <p className="text-[#7A9E98] text-sm italic mb-3">&ldquo;{r.text}&rdquo;</p>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map((s) => <Star key={s} className="w-3.5 h-3.5 fill-[#0FEA7A] text-[#0FEA7A]" />)}
                    </div>
                    <span className="text-[#E8F4F1] text-xs font-semibold">{r.name}</span>
                    <span className="text-[#7A9E98] text-xs">— {r.suburb}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-10">
            How iPhone Charging Port Repair Works
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {processSteps.map((p) => (
              <div key={p.step} className="glass-card p-6">
                <div className="w-8 h-8 rounded-full bg-[rgba(15,234,122,0.15)] flex items-center justify-center text-[#0FEA7A] font-bold text-sm mb-4">
                  {p.step}
                </div>
                <h3 className="text-[#E8F4F1] font-bold text-sm mb-2">
                  {p.title}
                </h3>
                <p className="text-[#7A9E98] text-xs leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="iPhone Charging Repair, Frequently Asked Questions" />
        </div>
      </section>

      {/* ── Related repairs ───────────────────────────────────────────────── */}
      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-[#E8F4F1] mb-6">
            Other iPhone Repairs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: 'iPhone Battery Replacement', href: '/iphone-repair/battery', label: 'Assessment: R899 ex VAT' },
              { title: 'iPhone Screen Repair', href: '/iphone-repair/screen', label: 'Assessment: R899 ex VAT' },
              { title: 'iPhone Back Glass Repair', href: '/iphone-repair/back-glass', label: 'Assessment: R899 ex VAT' },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="glass-card p-4 flex items-center justify-between group">
                <div>
                  <p className="text-[#E8F4F1] font-semibold text-sm">{item.title}</p>
                  <p className="text-[#0FEA7A] text-xs mt-0.5">{item.label}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#7A9E98] group-hover:text-[#0FEA7A] transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2
              className="text-3xl font-extrabold text-[#E8F4F1] mb-3"
             
            >
              iPhone Not Charging?
            </h2>
            <p className="text-[#7A9E98] mb-2">Assessment: R899 ex VAT. 3-month warranty.</p>
            <p className="text-[#7A9E98] text-sm mb-8">
              Hyde Park, Johannesburg, serving Sandton, Rosebank, Fourways, Bryanston and surrounds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp Us Now
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
