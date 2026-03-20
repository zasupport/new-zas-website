import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, CheckCircle, Star, MessageCircle, Shield, Clock, Wrench, Zap, AlertTriangle, Camera } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQ';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildBreadcrumbSchema, buildServiceSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'iPhone Camera Repair Johannesburg | ZA Support',
  description:
    'iPhone camera repair in Johannesburg. Blurry photos, black screen, cracked lens. Front and rear. iPhone 12 through 16 Pro Max. up-to-3 year warranty. Hyde Park.',
  alternates: { canonical: 'https://zasupport.com/iphone-repair/camera' },
  keywords: [
    'iPhone camera repair Johannesburg',
    'iPhone camera not working Johannesburg',
    'iPhone blurry camera Johannesburg',
    'iPhone camera black screen Johannesburg',
    'iPhone camera lens repair Johannesburg',
    'iPhone 15 camera repair Johannesburg',
    'iPhone 16 camera repair Johannesburg',
    'iPhone front camera repair Johannesburg',
  ],
};

const pricingRows = [
  { model: 'Camera Lens Cover (any model)', note: 'Glass only' },
  { model: 'Front Camera Module', note: 'Face ID intact' },
  { model: 'Rear Camera, iPhone 12/13', note: '' },
  { model: 'Rear Camera, iPhone 14', note: '' },
  { model: 'Rear Camera Pro, iPhone 14 Pro', note: 'Wide/Tele/UW' },
  { model: 'Rear Camera, iPhone 15/16', note: '' },
  { model: 'Rear Camera Pro, iPhone 15/16 Pro', note: 'Most popular 2025' },
  { model: 'Full Rear Camera System', note: 'All modules' },
];

const symptoms = [
  {
    icon: <Camera className="w-5 h-5" />,
    title: 'Blurry Photos on Every Shot',
    desc: 'If every photo is blurry regardless of lighting, the camera module or optical image stabiliser (OIS) has failed. This is not a software problem, it needs physical replacement.',
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    title: 'Black Screen in Camera App',
    desc: 'Opening the Camera app shows a black or frozen screen. This indicates the camera module has failed or its ribbon cable has disconnected, often caused by a drop.',
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Camera App Crashes',
    desc: 'The Camera app closes immediately or freezes on opening. Once software resets and iOS reinstalls have been ruled out, the camera module itself is the cause.',
  },
  {
    icon: <Camera className="w-5 h-5" />,
    title: 'Cracked Camera Lens',
    desc: 'A cracked rear camera lens cover causes flare, blurring, and dark patches in photos. This is a common drop injury, we replace just the glass cover without touching the camera module.',
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    title: 'Flash Not Working',
    desc: 'The LED flash fails to fire in Camera or Torch modes. This can be a flash module failure or a related power circuit issue, both are diagnosable and repairable.',
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Front Camera Not Working',
    desc: 'The selfie camera shows a black screen or distorted image. We replace the front camera module while preserving Face ID, the TrueDepth sensor is a separate component.',
  },
  {
    icon: <Camera className="w-5 h-5" />,
    title: 'Shaky or Jumpy Video',
    desc: 'Optical image stabilisation (OIS) is built into the camera module. If video is shaky despite steady hands, the OIS actuator has failed and the module needs replacing.',
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    title: 'Green Tint or Discolouration',
    desc: 'A green cast, purple fringing, or colour distortion in photos and video is a sign of camera module damage, often caused by internal impact or liquid exposure.',
  },
];

const processSteps = [
  { step: '1', title: 'Assessment: from R599', desc: 'Bring your iPhone in or WhatsApp us a sample photo. We identify whether the fault is the lens, the module, or a software issue before quoting.' },
  { step: '2', title: 'Parts Confirmed', desc: 'We confirm the correct camera module is in stock for your specific model. We stock modules for all current iPhone generations.' },
  { step: '3', title: 'Camera Replaced', desc: 'A certified technician replaces the camera module or lens cover. Camera repairs typically take 60–90 minutes.' },
  { step: '4', title: 'Full Camera Test', desc: 'We test all lenses (wide, ultra-wide, telephoto), the flash, front camera, video OIS, and Portrait Mode before returning your iPhone.' },
  { step: '5', title: 'Collect with Warranty', desc: 'You collect your iPhone with a up-to-3 year warranty on the repair and our labour. Assessment: from R599 applies.' },
];

const faqs = [
  {
    question: 'How much does iPhone camera repair cost in Johannesburg?',
    answer:
      'iPhone camera repair pricing depends on the repair type and model. We provide a assessment fee (from R599) and written fixed-price quote before any work begins.',
  },
  {
    question: 'My iPhone camera is blurry, is it the lens or the module?',
    answer:
      'If the lens glass is cracked or scratched, replacing the lens cover resolves the blurring. If the lens is clean but photos are still blurry or the OIS is shaky, the camera module itself has failed. Bring it in or WhatsApp us a sample photo and we will diagnose it.',
  },
  {
    question: 'Will Front camera repair affect Face ID?',
    answer:
      'No, if done correctly. The Face ID TrueDepth sensor is a separate component from the selfie camera. We replace only the front camera module and do not touch the Face ID sensor or its calibration data.',
  },
  {
    question: 'Can you repair just the cracked camera lens cover?',
    answer:
      'Yes. If the camera module is functioning correctly but the protective glass over the lens is cracked, we replace just the lens cover. This is a faster and less expensive repair than a full camera module replacement.',
  },
  {
    question: 'How long does iPhone camera repair take?',
    answer:
      'Camera repairs typically take 60–90 minutes. A lens cover replacement can be done in under an hour. Full rear camera system replacements on Pro models take closer to 90 minutes. We confirm availability and turnaround when you contact us.',
  },
  {
    question: 'Can you repair the rear camera without removing the screen?',
    answer:
      'Yes. Rear camera modules on most iPhone models are accessed from the back of the device. Screen removal is not required for the majority of rear camera repairs, which keeps the repair time and risk to a minimum.',
  },
  {
    question: 'Will ProRes video and cinematic mode still work after camera repair?',
    answer:
      'Yes. We use high-quality replacement modules that preserve all camera software features including ProRes, Cinematic Mode, Action Mode, and Night Mode. We test all video modes before returning your iPhone.',
  },
  {
    question: 'What warranty do you offer on iPhone camera repairs?',
    answer:
      'All iPhone camera repairs at ZA Support come with a up-to-3 year warranty on the replacement module or lens and our labour. If the camera develops any fault within the warranty period, we fix it at no charge.',
  },
];

const reviews = [
  {
    name: 'Lindi S.',
    suburb: 'Sandton',
    rating: 5,
    text: 'Cracked camera lens on my iPhone 15 Pro was ruining every photo. ZA Support replaced the glass cover in under an hour. Camera quality is back to perfect, and my face ID still works.',
    date: 'February 2026',
  },
  {
    name: 'Brendan H.',
    suburb: 'Rosebank',
    rating: 5,
    text: 'Front camera was completely black after a drop. ZA Support replaced the module in 90 minutes, Face ID still works, selfie camera is perfect. Brilliant service.',
    date: 'January 2026',
  },
  {
    name: 'Ayesha M.',
    suburb: 'Fourways',
    rating: 5,
    text: 'iPhone 16 Pro rear camera showed green tint after a drop. Full camera system replaced, all three lenses working, ProRes video confirmed. up-to-3 year warranty. Very happy.',
    date: 'March 2026',
  },
];

const aggregateRatingSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'iPhone Camera Repair Johannesburg',
  description: 'iPhone camera repair in Johannesburg. Blurry photos, black screen, cracked lens, OIS failure. Front and rear. iPhone 12 through 16 Pro Max. up-to-3 year warranty.',
  brand: { '@type': 'Brand', name: 'ZA Support' },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '632',
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
  name: 'iPhone Camera Repair Johannesburg',
  description: 'iPhone camera repair in Johannesburg for all models iPhone 12 through 16 Pro Max. Blurry photos, black screen, cracked lens, OIS failure. up-to-3 year warranty.',
});

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'iPhone Repair', url: 'https://zasupport.com/iphone-repair' },
  { name: 'Camera Repair', url: 'https://zasupport.com/iphone-repair/camera' },
];

const faqSchema = buildFaqSchema(faqs);
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

const whatsappUrl = 'https://wa.me/27790539964?text=Hi%20ZA%20Support%2C%20I%20need%20iPhone%20camera%20repair';

void LOCAL_BUSINESS_PROVIDER;

export default function iPhoneCameraPage() {
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
              { label: 'Camera Repair' },
            ]}
          />
          <div className="mt-8 max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[rgba(15,234,122,0.1)] border border-[rgba(15,234,122,0.25)] text-[#0FEA7A] text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <Star className="w-4 h-4 fill-current" /> 4.9 / 5 from 632 verified reviews
            </div>
            <h1
              className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] leading-tight mb-6"
             
            >
              iPhone Camera Repair<br />
              <span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4">
              Blurry photos, black camera screen, cracked lens, OIS failure, we repair all iPhone camera faults.
              Front and rear cameras, iPhone 12 through 16 Pro Max, up-to-3 year warranty, Hyde Park Johannesburg.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#7A9E98] mb-8">
              {['Assessment: from R599', 'Up-to-3 Year Warranty', 'Face ID preserved', 'Assessment: from R599', 'ProRes compatible'].map((item) => (
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

      {/* ── Pricing ──────────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
            iPhone Camera Repair, Types Supported
          </h2>
          <p className="text-[#7A9E98] mb-8 max-w-2xl">
            We provide a written fixed-price quote after a assessment. Send us a photo of your camera fault
            or bring the phone in.
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
            All repairs include written up-to-3 year warranty. Assessment: from R599.
            Face ID is never affected by front camera replacement.
          </p>
        </div>
      </section>

      {/* ── Symptoms ─────────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
            iPhone Camera Faults We Repair
          </h2>
          <p className="text-[#7A9E98] mb-10 max-w-2xl">
            Every fault listed below is something we diagnose and repair daily. If you are not sure whether
            your camera fault is hardware or software, we check first, at no cost.
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
                Why Johannesburg iPhone Owners Choose ZA Support for Camera Repair
              </h2>
              <div className="space-y-5">
                {[
                  {
                    icon: <Shield className="w-5 h-5" />,
                    title: 'Up-to-3 Year Warranty',
                    desc: 'Every camera repair carries a warranty on the replacement module and labour. If blurring or faults return within the warranty period, we fix it, no charge.',
                  },
                  {
                    icon: <Clock className="w-5 h-5" />,
                    title: 'Fast Turnaround',
                    desc: 'Most camera repairs complete in 60–90 minutes. Lens cover replacements take under an hour. We confirm availability when you contact us.',
                  },
                  {
                    icon: <Wrench className="w-5 h-5" />,
                    title: 'All Lenses Tested Post-Repair',
                    desc: 'After every camera repair we test all lenses, flash, OIS, video modes including ProRes and Cinematic, and the front camera before you collect.',
                  },
                  {
                    icon: <CheckCircle className="w-5 h-5" />,
                    title: 'Face ID Always Preserved',
                    desc: 'We separate the Face ID TrueDepth sensor from the selfie camera during front camera replacement. Face ID, Memoji, and Attention Awareness are unaffected.',
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
            How iPhone Camera Repair Works
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
          <FAQAccordion items={faqs} title="iPhone Camera Repair, Frequently Asked Questions" />
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
              { title: 'iPhone Back Glass Repair', href: '/iphone-repair/back-glass', price: 'Contact for pricing' },
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
              iPhone Camera Not Working?
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
