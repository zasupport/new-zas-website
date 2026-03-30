import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, CheckCircle, Star, MessageCircle, Shield, Clock, Wrench, Zap, AlertTriangle } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQ';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildBreadcrumbSchema, buildServiceSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import { CONTACT, buildWhatsAppUrl} from '@/lib/constants';

export const metadata: Metadata = {
  title: 'iPhone Back Glass Repair Johannesburg | ZA Support',
  description:
    'iPhone back glass repair in Johannesburg. Cracked rear glass on all models iPhone 12 through 16 Pro Max. MagSafe preserved. up-to-3 year warranty. Hyde Park.',
  alternates: { canonical: 'https://zasupport.com/iphone-repair/back-glass' },
  keywords: [
    'iPhone back glass repair Johannesburg',
    'iPhone back glass replacement Johannesburg',
    'cracked iPhone back Johannesburg',
    'iPhone rear glass repair Johannesburg',
    'iPhone 15 back glass repair Johannesburg',
    'iPhone 16 back glass repair Johannesburg',
    'iPhone MagSafe back glass Johannesburg',
    'iPhone back cover repair Johannesburg',
  ],
};

const pricingRows = [
  { model: 'iPhone 12 / 12 mini', note: '' },
  { model: 'iPhone 12 Pro / Pro Max', note: '' },
  { model: 'iPhone 13 / 13 mini', note: '' },
  { model: 'iPhone 13 Pro / Pro Max', note: '' },
  { model: 'iPhone 14 / 14 Plus', note: 'Most common' },
  { model: 'iPhone 14 Pro / Pro Max', note: '' },
  { model: 'iPhone 15 / 15 Plus', note: '' },
  { model: 'iPhone 15 Pro / Pro Max', note: 'Titanium chassis' },
  { model: 'iPhone 16 / 16 Plus', note: '' },
  { model: 'iPhone 16 Pro / Pro Max', note: 'Most popular 2025' },
];

const symptoms = [
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    title: 'Cracked or Shattered Rear Glass',
    desc: 'A drop or impact shatters the rear glass panel. Sharp edges make the phone uncomfortable to hold and can cut your hand. Early repair prevents the cracks spreading further.',
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Wireless Charging Not Working',
    desc: 'Cracks in the rear glass can disrupt the Qi/MagSafe charging coil beneath. If wireless charging has stopped working after a drop, back glass replacement often resolves it.',
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    title: 'MagSafe Alignment Issues',
    desc: 'Cracked rear glass on MagSafe-compatible models (iPhone 12 and later) can cause MagSafe accessories to attach poorly or at an angle. Replacement restores precise alignment.',
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Water Ingress Risk',
    desc: 'A cracked rear glass breaks the IP68 water-resistance seal. Even hairline cracks allow moisture to enter, particularly dangerous in South African summer storms.',
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    title: 'Glass Dust Under Camera',
    desc: 'Shattered rear glass often spreads microscopic shards under the camera module cover, causing blurry or spotty photos. We clean this thoroughly during back glass replacement.',
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Cosmetic Damage Before Trade-In',
    desc: 'iPhone trade-in and resale values drop significantly with cracked back glass. Repairing before a trade-in or upgrade often returns more than the repair cost.',
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    title: 'Splintering Glass',
    desc: 'Rear glass that was not immediately replaced continues to splinter under flexion. Over time, small glass fragments work their way into the sides of the device and can reach internal components.',
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Case No Longer Fitting',
    desc: 'Cracked back glass can cause warping or raised edges that prevent cases from seating correctly. Replacement restores the original dimensions and case compatibility.',
  },
];

const processSteps = [
  { step: '1', title: 'Assessment: from R599', desc: 'Bring your iPhone in or WhatsApp us a photo of the damage. We quote a fixed price for parts and labour before any work begins.' },
  { step: '2', title: 'Glass Confirmed', desc: 'We confirm the correct rear glass is in stock for your specific model and colour. We stock glass for all current iPhone models in the main colour options.' },
  { step: '3', title: 'Glass Replaced', desc: 'A certified technician uses controlled heat to remove the shattered glass and bonds OEM-quality replacement glass using UV adhesive. The process takes 90–120 minutes.' },
  { step: '4', title: 'Full Quality Check', desc: 'We test wireless charging, MagSafe alignment, the rear camera system, and re-seal the chassis to restore IP68-class water resistance.' },
  { step: '5', title: 'Collect with Warranty', desc: 'You collect your iPhone with a up-to-3 year warranty on the replacement glass and our labour. Assessment: from R599, assessment fee of from R599 applies if we cannot complete the repair.' },
];

const faqs = [
  {
    question: 'How much does iPhone back glass repair cost in Johannesburg?',
    answer:
      'iPhone back glass repair pricing depends on your model and colour. We provide a assessment fee (from R599) and written fixed-price quote before starting.',
  },
  {
    question: 'How long does iPhone back glass replacement take?',
    answer:
      'iPhone back glass replacement takes 90–120 minutes. The rear glass is bonded with UV adhesive and requires heat to remove safely. We confirm availability and turnaround when you contact us.',
  },
  {
    question: 'Is cracked iPhone back glass just cosmetic, do I need to repair it?',
    answer:
      'Not entirely cosmetic. A cracked rear glass breaks the IP68 water-resistance seal, leaves sharp edges that can cut your hand, can disrupt wireless charging and MagSafe, and lets moisture and dust into the device. We recommend repairing it sooner rather than later.',
  },
  {
    question: 'Will wireless charging and MagSafe work after back glass repair?',
    answer:
      'Yes. We test both Qi wireless charging and MagSafe alignment after every back glass replacement. We use replacement glass that is compatible with the MagSafe magnet array on iPhone 12 and later.',
  },
  {
    question: 'Can you match the original colour of my iPhone back glass?',
    answer:
      'Yes for most colours and models. We stock the most common colour options, Black, White, Blue, Purple, and Red depending on model generation. If your specific colour is not immediately in stock, we can order it. Ask us when you contact us.',
  },
  {
    question: 'Will back glass repair affect the cameras?',
    answer:
      'No, the rear cameras are not affected by back glass replacement. We inspect and clean around the camera module during the repair and test all cameras after completing the work.',
  },
  {
    question: 'Can you repair a back glass that is cracked but still in place?',
    answer:
      'Yes. We repair back glass in all states, from small corner cracks to fully shattered glass. The process is the same: heat removal and OEM-quality replacement. The price does not change based on how badly cracked it is.',
  },
  {
    question: 'What warranty do you offer on iPhone back glass repairs?',
    answer:
      'All iPhone back glass repairs at ZA Support carry a up-to-3 year warranty on the replacement glass and our labour. If the glass delaminates or any fault related to our repair appears within the warranty period, we fix it at no charge.',
  },
];

const reviews = [
  {
    name: 'Gareth L.',
    suburb: 'Sandton',
    rating: 5,
    text: 'iPhone 15 Pro back glass shattered after a drop. ZA Support replaced it perfectly, titanium chassis looks flawless, MagSafe snaps perfectly, up-to-3 year warranty. Fast and professional.',
    date: 'February 2026',
  },
  {
    name: 'Preethi N.',
    suburb: 'Rosebank',
    rating: 5,
    text: 'Cracked back glass on my iPhone 14 Pro was cutting my hand. ZA Support replaced it in under two hours. Wireless charging works perfectly and the colour match is exact.',
    date: 'January 2026',
  },
  {
    name: 'Sipho M.',
    suburb: 'Fourways',
    rating: 5,
    text: 'Back glass was shattered for months, finally got it fixed before trading in. ZA Support repaired it same day and the trade-in value was significantly higher than with the cracked glass.',
    date: 'March 2026',
  },
];

const aggregateRatingSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'iPhone Back Glass Repair Johannesburg',
  description: 'iPhone back glass repair in Johannesburg for all models iPhone 12 through 16 Pro Max. Cracked rear glass, MagSafe, wireless charging. up-to-3 year warranty.',
  brand: { '@type': 'Brand', name: 'ZA Support' },
  review: reviews.map((r) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: r.name },
    reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
    reviewBody: r.text,
    datePublished: r.date,
  })),
};

const serviceSchema = buildServiceSchema({
  name: 'iPhone Back Glass Repair Johannesburg',
  description: 'iPhone back glass repair in Johannesburg for all models iPhone 12 through 16 Pro Max. Cracked rear glass, MagSafe, wireless charging restoration. up-to-3 year warranty.',
});

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'iPhone Repair', url: 'https://zasupport.com/iphone-repair' },
  { name: 'Back Glass Repair', url: 'https://zasupport.com/iphone-repair/back-glass' },
];

const faqSchema = buildFaqSchema(faqs);
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

const whatsappUrl = buildWhatsAppUrl('IPH-BGLASS', 'iphone-repair');

void LOCAL_BUSINESS_PROVIDER;

export default function iPhoneBackGlassPage() {
  return (
    <>
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'iPhone Repair', href: '/iphone-repair' },
              { label: 'Back Glass Repair' },
            ]}
          />
          <div className="mt-8 max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[rgba(15,234,122,0.1)] border border-[rgba(15,234,122,0.25)] text-[#0FEA7A] text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <Star className="w-4 h-4 fill-current" /> 4.9 / 5 from 632 verified reviews
            </div>
            <h1
              className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] leading-tight mb-6"
             
            >
              iPhone Back Glass Repair<br />
              <span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4">
              Cracked rear glass, MagSafe alignment, wireless charging, we repair all iPhone back glass faults.
              iPhone 12 through 16 Pro Max, up-to-3 year warranty, Hyde Park Johannesburg.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#7A9E98] mb-8">
              {['Assessment: from R599', 'Up-to-3 Year Warranty', 'MagSafe preserved', 'IP68 re-sealed', 'Assessment: from R599'].map((item) => (
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
                className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
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

      {/* ── Pricing ──────────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
            iPhone Back Glass Repair, Models Supported
          </h2>
          <p className="text-[#7A9E98] mb-8 max-w-2xl">
            We provide a written fixed-price quote before starting.
            Bring your iPhone in or WhatsApp us a photo of the damage for an instant quote.
          </p>
          <div className="glass-card overflow-hidden max-w-2xl">
            <div className="grid grid-cols-2 gap-0 bg-[rgba(15,234,122,0.06)] px-6 py-3 border-b border-[rgba(255,255,255,0.06)]">
              <span className="text-[#0FEA7A] text-xs font-bold uppercase tracking-wider">Model</span>
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
            All repairs include written up-to-3 year warranty. Assessment: from R599. MagSafe and wireless charging tested post-repair.
            Assessment: from R599, no charge if we cannot complete the repair.
          </p>
        </div>
      </section>

      {/* ── Symptoms ─────────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
            Back Glass Problems We Repair
          </h2>
          <p className="text-[#7A9E98] mb-10 max-w-2xl">
            A cracked iPhone back is more than cosmetic. Here is why it matters and what we fix.
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
                Why Choose ZA Support for iPhone Back Glass Repair
              </h2>
              <div className="space-y-5">
                {[
                  {
                    icon: <Shield className="w-5 h-5" />,
                    title: 'Up-to-3 Year Warranty',
                    desc: 'Every back glass repair carries a warranty on the replacement glass and labour. If it delaminates or fails, we fix it, no charge.',
                  },
                  {
                    icon: <Clock className="w-5 h-5" />,
                    title: '90-Minute Turnaround',
                    desc: 'Most back glass repairs are complete within 90–120 minutes. We confirm stock and turnaround time when you contact us.',
                  },
                  {
                    icon: <Wrench className="w-5 h-5" />,
                    title: 'MagSafe and IP68 Restored',
                    desc: 'We test MagSafe alignment and Qi wireless charging after every repair. We re-seal the chassis to restore IP68-class resistance.',
                  },
                  {
                    icon: <CheckCircle className="w-5 h-5" />,
                    title: 'OEM-Quality Glass',
                    desc: 'We use high-quality replacement glass with the same colour tolerance and finish as the original. Colour-matched for most popular iPhone colour options.',
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
            How iPhone Back Glass Repair Works
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
          <FAQAccordion items={faqs} title="iPhone Back Glass Repair, Frequently Asked Questions" />
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
              { title: 'iPhone Screen Repair', href: '/iphone-repair/screen', price: 'Contact for pricing' },
              { title: 'iPhone Battery Replacement', href: '/iphone-repair/battery', price: 'Contact for pricing' },
              { title: 'iPhone Camera Repair', href: '/iphone-repair/camera', price: 'Contact for pricing' },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="glass-card p-4 flex items-center justify-between group">
                <div>
                  <p className="text-[#E8F4F1] font-semibold text-sm">{item.title}</p>
                  <p className="text-[#0FEA7A] text-xs mt-0.5">{item.price}</p>
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
              Cracked iPhone Back?
            </h2>
            <p className="text-[#7A9E98] mb-2">Assessment: from R599.</p>
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
                className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
