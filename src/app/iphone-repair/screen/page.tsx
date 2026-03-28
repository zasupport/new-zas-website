import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, CheckCircle, Star, MessageCircle, Shield, Clock, Wrench, Monitor, Zap, AlertTriangle } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQ';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildBreadcrumbSchema, buildServiceSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import { CONTACT, buildWhatsAppUrl} from '@/lib/constants';

export const metadata: Metadata = {
  title: 'iPhone Screen Repair Johannesburg | ZA Support',
  description:
    'iPhone screen repair in Johannesburg. Cracked OLED, dead touch, lines on display. iPhone 12 through 16 Pro Max. Same-day available. up-to-3 year warranty. Hyde Park, Johannesburg.',
  alternates: { canonical: 'https://zasupport.com/iphone-repair/screen' },
  keywords: [
    'iPhone screen repair Johannesburg',
    'cracked iPhone screen Johannesburg',
    'iPhone screen replacement Johannesburg',
    'iPhone OLED repair Johannesburg',
    'iPhone 15 screen repair Johannesburg',
    'iPhone 16 screen repair Johannesburg',
    'iPhone 14 screen repair Johannesburg',
    'broken iPhone screen Johannesburg',
  ],
};

const pricingRows = [
  { model: 'iPhone 12 / 12 mini', note: 'OLED' },
  { model: 'iPhone 12 Pro / Pro Max', note: 'Super Retina XDR' },
  { model: 'iPhone 13 / 13 mini', note: 'OLED' },
  { model: 'iPhone 13 Pro / Pro Max', note: 'ProMotion OLED' },
  { model: 'iPhone 14 / 14 Plus', note: 'OLED' },
  { model: 'iPhone 14 Pro / Pro Max', note: 'Always-On ProMotion' },
  { model: 'iPhone 15 / 15 Plus', note: 'OLED' },
  { model: 'iPhone 15 Pro / Pro Max', note: 'ProMotion titanium' },
  { model: 'iPhone 16 / 16 Plus', note: 'OLED' },
  { model: 'iPhone 16 Pro / Pro Max', note: 'Most popular 2025' },
];

const symptoms = [
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    title: 'Cracked or Shattered OLED',
    desc: 'A single drop shatters the glass and often cracks the OLED panel beneath. Even a hairline crack spreads under daily pressure, early repair prevents further damage and dark spots forming.',
  },
  {
    icon: <Monitor className="w-5 h-5" />,
    title: 'Touch Not Responding',
    desc: 'Part of the screen stops registering touch, or the digitiser becomes entirely unresponsive. The touch layer is bonded to the OLED, replacement of the full assembly resolves this.',
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Dead Pixels or Dark Blotches',
    desc: 'Permanent dark patches or spreading black blotches are signs of OLED cell failure. This is common after a drop, the impact stresses the display internally without always cracking the glass.',
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    title: 'Lines Across the Display',
    desc: 'Horizontal or vertical lines on an iPhone screen are a classic sign of a damaged OLED panel or a loose display connector. Both are resolved by screen replacement.',
  },
  {
    icon: <Monitor className="w-5 h-5" />,
    title: 'Flickering or Dimming',
    desc: 'Intermittent screen flicker, sudden dimming not controlled by settings, or a display that flashes on and off indicate a failing backlight or OLED assembly.',
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Green Line Down the Side',
    desc: 'A thin green line running vertically down the display is a known OLED failure mode, sometimes triggered by a drop, sometimes spontaneous. Screen replacement resolves it.',
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    title: 'Ghost Touch (Screen Taps Itself)',
    desc: 'Your iPhone appears to swipe and tap on its own. This is a digitiser fault, often caused by a cracked panel creating phantom capacitive signals. Replacement stops it completely.',
  },
  {
    icon: <Monitor className="w-5 h-5" />,
    title: 'Screen Separated from Frame',
    desc: 'The display peeling away from the body is caused by a swelling battery pushing outward. We replace the screen and address the battery in the same visit.',
  },
];

const processSteps = [
  { step: '1', title: 'Assessment: from R599', desc: 'Bring your iPhone in or WhatsApp us a photo. We inspect the display and provide a written fixed-price quote, no surprises, no obligation.' },
  { step: '2', title: 'Parts Confirmed', desc: 'We confirm the correct OLED assembly is in stock for your exact model before committing to a repair date. Same-day is available for most models.' },
  { step: '3', title: 'Screen Replaced', desc: 'A certified technician replaces the OLED display assembly. iPhone screen repairs typically take 60–90 minutes.' },
  { step: '4', title: 'Full Quality Check', desc: 'We test touch accuracy, Face ID, True Tone, brightness, and colour uniformity across the full panel before returning your device.' },
  { step: '5', title: 'Collect with Warranty', desc: 'You leave with a up-to-3 year warranty on the replacement screen and our labour. Assessment: from R599 applies, assessment fee of from R599 applies if we cannot fix it.' },
];

const faqs = [
  {
    question: 'How much does iPhone screen repair cost in Johannesburg?',
    answer:
      'The exact price depends on your model and generation. We provide a assessment fee (from R599) and written fixed-price quote before starting, no surprises.',
  },
  {
    question: 'Will Face ID still work after iPhone screen repair?',
    answer:
      'Yes, if done correctly. We carefully preserve the TrueDepth camera module and Face ID sensor during screen replacement. Face ID, True Tone, and Haptic Touch all function normally after our repairs. We test every function before you collect your iPhone.',
  },
  {
    question: 'How long does iPhone screen replacement take?',
    answer:
      'Most iPhone screen replacements take 60–90 minutes. If we have your specific OLED assembly in stock, same-day repair is often available. We confirm turnaround time when you bring the phone in or when you WhatsApp us your model.',
  },
  {
    question: 'Do you use genuine Apple screens?',
    answer:
      'We use OEM-quality OLED assemblies that preserve True Tone calibration, ProMotion (120 Hz on Pro models), and Face ID functionality. Genuine Apple screens are available on request at a higher price point, ask us when you book.',
  },
  {
    question: 'Is it worth repairing a cracked iPhone screen?',
    answer:
      'In almost every case, yes. Screen repair is a fraction of the cost of a new device. We give you an honest assessment, if repair is not economical, we will tell you.',
  },
  {
    question: 'My iPhone screen has lines on it but is not cracked, is this a screen fault?',
    answer:
      'Yes. Vertical or horizontal lines on an otherwise uncracked iPhone display typically indicate OLED panel failure or a loose display connector. Both are caused by internal stress from a drop and are resolved by screen replacement.',
  },
  {
    question: 'Can you repair an iPhone 15 Pro or 16 Pro ProMotion screen?',
    answer:
      'Yes. We repair ProMotion (120 Hz) OLED displays on all iPhone Pro models. These are premium assemblies and the pricing reflects that. We use quality replacements that preserve full ProMotion refresh rates and colour accuracy.',
  },
  {
    question: 'What warranty do you provide on iPhone screen repairs?',
    answer:
      'All iPhone screen repairs at ZA Support come with a up-to-3 year warranty on the replacement panel and our labour. If dead pixels appear, the touch layer fails, or the display develops any fault within the warranty period, we fix it at no charge.',
  },
];

const reviews = [
  {
    name: 'Tayla R.',
    suburb: 'Sandton',
    rating: 5,
    text: 'Dropped my iPhone 15 Pro and the screen shattered. ZA Support replaced it the same day, Face ID works perfectly and the ProMotion display is flawless. Best repair service in Joburg.',
    date: 'February 2026',
  },
  {
    name: 'Marcus B.',
    suburb: 'Rosebank',
    rating: 5,
    text: 'Green line appeared on my iPhone 14 Pro screen out of nowhere. ZA Support diagnosed it immediately, replaced the OLED and it has been perfect for months. Very professional.',
    date: 'January 2026',
  },
  {
    name: 'Nomsa K.',
    suburb: 'Fourways',
    rating: 5,
    text: 'Ghost touch was making my iPhone 16 unusable. Fixed in under an hour, up-to-3 year warranty, and the technician explained everything clearly. Highly recommend.',
    date: 'March 2026',
  },
];

const aggregateRatingSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'iPhone Screen Repair Johannesburg',
  description: 'iPhone screen repair in Johannesburg. All models iPhone 12 through 16 Pro Max. OLED replacement, touch repair, dead pixels. up-to-3 year warranty.',
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
  name: 'iPhone Screen Repair Johannesburg',
  description: 'iPhone screen repair in Johannesburg for all models iPhone 12 through 16 Pro Max. Cracked OLED, dead touch, lines, dead pixels. up-to-3 year warranty.',
});

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'iPhone Repair', url: 'https://zasupport.com/iphone-repair' },
  { name: 'Screen Repair', url: 'https://zasupport.com/iphone-repair/screen' },
];

const faqSchema = buildFaqSchema(faqs);
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

const whatsappUrl = buildWhatsAppUrl('IPH-SCR', 'iphone-repair');

void LOCAL_BUSINESS_PROVIDER;

export default function iPhoneScreenPage() {
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
              { label: 'Screen Repair' },
            ]}
          />
          <div className="mt-8 max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[rgba(15,234,122,0.1)] border border-[rgba(15,234,122,0.25)] text-[#0FEA7A] text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <Star className="w-4 h-4 fill-current" /> 4.9 / 5 from 632 verified reviews
            </div>
            <h1
              className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] leading-tight mb-6"
             
            >
              iPhone Screen Repair<br />
              <span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4">
              Cracked OLED, dead touch, lines, ghost touch, we repair all iPhone screen faults.
              iPhone 12 through 16 Pro Max, same-day available, up-to-3 year warranty, Hyde Park Johannesburg.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#7A9E98] mb-8">
              {['Assessment: from R599', 'Assessment: from R599', 'Up-to-3 Year Warranty', 'Face ID preserved', 'Same-day available', 'Written quote'].map((item) => (
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

      {/* ── Supported Models ─────────────────────────────────────────────── */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
            iPhone Models We Repair, Johannesburg 2026
          </h2>
          <p className="text-[#7A9E98] mb-8 max-w-2xl">
            All repairs include the OLED assembly, parts, and labour. We provide a written fixed-price
            quote before starting, send us your model for an exact quote.
          </p>
          <div className="glass-card overflow-hidden max-w-2xl">
            <div className="grid grid-cols-2 gap-0 bg-[rgba(15,234,122,0.06)] px-6 py-3 border-b border-[rgba(255,255,255,0.06)]">
              <span className="text-[#0FEA7A] text-xs font-bold uppercase tracking-wider">Model</span>
              <span className="text-[#0FEA7A] text-xs font-bold uppercase tracking-wider text-right">Display Type</span>
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
            All repairs include written up-to-3 year warranty. Assessment: from R599. Face ID and True Tone preserved.
            Assessment: from R599, no charge if we cannot repair your device.
          </p>
        </div>
      </section>

      {/* ── Symptoms ─────────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
            iPhone Screen Faults We Repair
          </h2>
          <p className="text-[#7A9E98] mb-10 max-w-2xl">
            Every symptom listed below is something we repair daily. If you are unsure whether your
            fault is the screen or something deeper, we diagnose first, at no cost.
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
                Why Johannesburg iPhone Owners Choose ZA Support
              </h2>
              <div className="space-y-5">
                {[
                  {
                    icon: <Shield className="w-5 h-5" />,
                    title: 'Up-to-3 Year Warranty',
                    desc: 'Every iPhone screen repair carries a warranty on parts and labour. If it fails, we fix it, no arguments, no charge.',
                  },
                  {
                    icon: <Clock className="w-5 h-5" />,
                    title: 'Same-Day When in Stock',
                    desc: 'We stock OLED assemblies for the most common iPhone models. If yours is in stock, same-day repair is available. We confirm before you bring it in.',
                  },
                  {
                    icon: <Wrench className="w-5 h-5" />,
                    title: 'Assessment: from R599',
                    desc: 'If we cannot fix your iPhone screen, assessment fee of from R599 applies. We give you an honest assessment and fixed price before we start.',
                  },
                  {
                    icon: <CheckCircle className="w-5 h-5" />,
                    title: 'Face ID and True Tone Preserved',
                    desc: 'We carefully transfer the TrueDepth camera module and calibration data during every screen replacement, Face ID and True Tone work normally after repair.',
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
              <div className="glass-card p-6 border-l-2 border-[#0FEA7A]">
                <p className="text-[#7A9E98] text-sm italic mb-3">
                  &ldquo;Dropped my iPhone 15 Pro and the screen shattered. Same-day repair, Face ID works perfectly,
                  ProMotion display flawless. Best repair service in Joburg.&rdquo;
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map((s) => <Star key={s} className="w-3.5 h-3.5 fill-[#0FEA7A] text-[#0FEA7A]" />)}
                  </div>
                  <span className="text-[#E8F4F1] text-xs font-semibold">Tayla R.</span>
                  <span className="text-[#7A9E98] text-xs">— Sandton</span>
                </div>
              </div>
              <div className="glass-card p-6 border-l-2 border-[#0FEA7A]">
                <p className="text-[#7A9E98] text-sm italic mb-3">
                  &ldquo;Green line appeared on my iPhone 14 Pro screen out of nowhere. ZA Support diagnosed it
                  immediately and replaced the OLED. Perfect for months since.&rdquo;
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map((s) => <Star key={s} className="w-3.5 h-3.5 fill-[#0FEA7A] text-[#0FEA7A]" />)}
                  </div>
                  <span className="text-[#E8F4F1] text-xs font-semibold">Marcus B.</span>
                  <span className="text-[#7A9E98] text-xs">— Rosebank</span>
                </div>
              </div>
              <div className="glass-card p-6 border-l-2 border-[#0FEA7A]">
                <p className="text-[#7A9E98] text-sm italic mb-3">
                  &ldquo;Ghost touch was making my iPhone 16 unusable. Fixed in under an hour, up-to-3 year warranty.
                  The technician explained everything clearly.&rdquo;
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map((s) => <Star key={s} className="w-3.5 h-3.5 fill-[#0FEA7A] text-[#0FEA7A]" />)}
                  </div>
                  <span className="text-[#E8F4F1] text-xs font-semibold">Nomsa K.</span>
                  <span className="text-[#7A9E98] text-xs">— Fourways</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-10">
            How iPhone Screen Repair Works
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
          <FAQAccordion items={faqs} title="iPhone Screen Repair, Frequently Asked Questions" />
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
              { title: 'iPhone Battery Replacement', href: '/iphone-repair/battery', label: 'Assessment: from R599' },
              { title: 'iPhone Camera Repair', href: '/iphone-repair/camera', label: 'Assessment: from R599' },
              { title: 'iPhone Charging Port Repair', href: '/iphone-repair/charging', label: 'Assessment: from R599' },
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
              Cracked iPhone Screen?
            </h2>
            <p className="text-[#7A9E98] mb-2">Assessment: from R599. up-to-3 year warranty.</p>
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
