import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Monitor, Shield, Zap, AlertTriangle, Star, MapPin, CheckCircle } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Pro Screen Repair Johannesburg | Flexgate, Staingate, Crack | ZA Support',
  description:
    'MacBook Pro screen repair in Johannesburg. Flexgate, Staingate, cracked display, backlight failure. All Intel and M-series models. Assessment: from R599. Hyde Park.',
  alternates: { canonical: 'https://zasupport.com/macbook-pro-repair/screen' },
  keywords: [
    'MacBook Pro screen repair Johannesburg',
    'MacBook Pro Flexgate repair Johannesburg',
    'MacBook Pro Staingate repair Johannesburg',
    'MacBook Pro cracked screen Johannesburg',
    'MacBook Pro backlight repair Johannesburg',
    'MacBook Pro display replacement Johannesburg',
  ],
  openGraph: {
    title: 'MacBook Pro Screen Repair Johannesburg | Flexgate, Staingate, Crack | ZA Support',
    description: 'MacBook Pro screen repair in Johannesburg. Flexgate, Staingate, cracked display, backlight failure. All models. Assessment: from R599.',
    url: 'https://zasupport.com/macbook-pro-repair/screen',
    siteName: 'ZA Support',
    type: 'website',
  },
};

const aggregateRatingSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'MacBook Pro Screen Repair Johannesburg',
  description: 'Professional MacBook Pro screen repair in Johannesburg. Flexgate, Staingate, cracked display. All models. up-to-3 year warranty.',
  brand: { '@type': 'Brand', name: 'ZA Support' },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: SITE.rating,
    reviewCount: '632',
    bestRating: '5',
    worstRating: '1',
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Pro Screen Repair Johannesburg',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Hyde Park' },
    { '@type': 'Neighborhood', name: 'Sandton' },
  ],
  description:
    'MacBook Pro screen repair in Johannesburg. Flexgate, Staingate, cracked display, backlight failure, dead pixels. All Intel and M-series models. Assessment from R599.',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'MacBook Pro Repair', item: 'https://zasupport.com/macbook-pro-repair' },
    { '@type': 'ListItem', position: 3, name: 'Screen Repair', item: 'https://zasupport.com/macbook-pro-repair/screen' },
  ],
};

const faults = [
  { title: 'Cracked or shattered display', detail: 'Physical screen damage on any MacBook Pro model. We replace the full display assembly with a quality panel.' },
  { title: 'Flexgate: stage-light effect at screen base', detail: 'Affects 2016-2019 MacBook Pro. A bright band or stage-light pattern at the bottom of the screen worsening as the lid opens wider.', highlight: 'Flexgate' },
  { title: 'Staingate: anti-reflective coating peeling', detail: 'Affects 2013-2015 Retina MacBook Pro. Coating delaminates creating foggy, streaky marks that cannot be cleaned.', highlight: 'Staingate' },
  { title: 'No backlight (screen works but very dim or black)', detail: 'A faint image visible under strong light indicates a backlight failure. Often a component-level repair rather than full screen replacement.' },
  { title: 'Dead pixels or black spots', detail: 'Individual pixels fail or clusters of pixels go black. Screen replacement restores a full, clean image.' },
  { title: 'Display flicker or colour shift', detail: 'Screen flickers, shifts colour, or shows horizontal lines. Can indicate a cable fault, display fault, or GPU issue.' },
  { title: 'Water damage to screen', detail: 'Liquid ingress causes display corruption, backlight failure, or permanent lines. Assessment determines repairability.' },
  { title: 'External display works but built-in screen blank', detail: 'External display confirming GPU is functional points to a display cable or backlight driver fault — often repairable without full screen replacement.' },
];

const knownIssues = [
  {
    name: 'Flexgate',
    models: '2016-2019 13" and 15" MacBook Pro',
    description: 'A design fault in the display cable causes a stage-light pattern at the bottom of the screen, worsening as the lid opens. Apple extended the repair programme — we check coverage first before quoting.',
  },
  {
    name: 'Staingate',
    models: '2013-2015 MacBook Pro Retina',
    description: 'Anti-reflective coating delaminates creating foggy, streaky marks. Apple extended service programme may apply. We advise whether your device qualifies before starting work.',
  },
  {
    name: 'Standard Screen Damage',
    models: 'All MacBook Pro models',
    description: 'Cracks, dead pixels, backlight failure, and water damage on any model. Assessment: from R599, fixed quote provided before any work begins.',
  },
];

const models = [
  { name: 'MacBook Pro 13" 2013–2022 (Intel / M1 / M2)', note: 'All variants' },
  { name: 'MacBook Pro 14" M1 Pro/Max, M2 Pro/Max, M3 Pro/Max (2021-2024)', note: 'Apple Silicon' },
  { name: 'MacBook Pro 15" 2013–2019 (Intel)', note: 'Intel, Flexgate risk' },
  { name: 'MacBook Pro 16" M1 Pro/Max, M2 Pro/Max, M3 Pro/Max (2021-2024)', note: 'Apple Silicon' },
  { name: 'MacBook Pro 16" Intel (2019)', note: 'Intel' },
  { name: 'MacBook Pro M4 Pro/Max 14" & 16" (2024)', note: 'Latest' },
];

const process = [
  { step: '01', title: 'Drop In for Assessment', desc: 'Bring your MacBook Pro to our Hyde Park workshop. We connect an external display first to isolate whether the fault is in the screen assembly, cable, or logic board.' },
  { step: '02', title: 'Written Quote', desc: 'You receive a fixed price before any work begins. For Flexgate and Staingate, we check Apple extended programme eligibility first.' },
  { step: '03', title: 'Screen Replacement (Data Untouched)', desc: 'We replace the display assembly only. Your storage, apps, and data are completely unaffected. No reinstall or erase required.' },
  { step: '04', title: 'Full Test and Return', desc: 'Screen calibration verified, brightness and colour confirmed, and up-to-3 year warranty issued on parts and labour.' },
];

const faqs = [
  {
    question: 'What is Flexgate on MacBook Pro?',
    answer: 'Flexgate is a design defect in 2016-2019 MacBook Pro models where the display backlight cable is too short. It creates a stage-light pattern at the bottom of the screen that worsens as the lid opens wider. Apple has an extended repair programme for some serial numbers — we check this before quoting.',
  },
  {
    question: 'What is Staingate on MacBook Pro?',
    answer: 'Staingate is an anti-reflective coating delamination issue on 2013-2015 MacBook Retina Pro models. The coating peels or bubbles, creating foggy marks that cannot be cleaned. Apple has an extended programme for qualifying serial numbers. We advise whether your device qualifies before starting work.',
  },
  {
    question: 'What is the assessment fee policy?',
    answer: 'from R599. Includes full screen diagnostic and written fixed-price quote. The fee is, and payable only if you decline.',
  },
  {
    question: 'How long does MacBook Pro screen repair take?',
    answer: 'Most screen replacements are completed within 1-3 business days. Flexgate and Staingate repairs typically take 2-4 days depending on parts availability for your specific model.',
  },
  {
    question: 'Is my data safe during screen repair?',
    answer: 'Yes. Screen repair does not affect your storage or data. No reinstall or erase is required. Your files, apps, and accounts remain exactly as they were.',
  },
  {
    question: 'Do you repair M1, M2, M3 MacBook Pro screens?',
    answer: 'Yes. We repair screens on all Apple Silicon MacBook Pro models including 14-inch and 16-inch M1, M2, and M3 variants, as well as all Intel models.',
  },
  {
    question: 'My backlight is out but the screen shows a faint image. Is it repairable?',
    answer: 'Yes. A faint image with no backlight is typically a backlight circuit fault on the logic board or a failed backlight driver IC. This is a component-level repair, not necessarily a full screen replacement. Assessment will determine the exact cause and the most cost-effective fix.',
  },
  {
    question: 'What warranty do you provide on screen repairs?',
    answer: 'up-to-3 year warranty on the screen assembly and labour. If the same fault reoccurs within the warranty period, we fix it at no charge. Extended warranty is also available on request.',
  },
];

const reviews = [
  {
    name: 'Sarah M.',
    suburb: 'Sandton',
    rating: 5,
    text: 'Flexgate on my 2017 MacBook Pro. ZA Support diagnosed it in 20 minutes, checked Apple programme eligibility, and had it fixed in 2 days. Outstanding service.',
  },
  {
    name: 'James T.',
    suburb: 'Rosebank',
    rating: 5,
    text: 'Cracked Retina screen on my M2 Pro. Quoted clearly, repaired quickly, and the screen looks perfect. up-to-3 year warranty in writing. Highly recommend.',
  },
  {
    name: 'Anita V.',
    suburb: 'Hyde Park',
    rating: 5,
    text: 'Staingate on my 2015 MacBook Pro. They checked the Apple programme, it qualified, handled the whole process. Professional from start to finish.',
  },
];

const faqSchema = buildFaqSchema(faqs);

export default function MacBookProScreenPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={aggregateRatingSchema} />

      {/* Hero */}
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'MacBook Pro Repair', href: '/macbook-pro-repair' },
              { label: 'Screen Repair' },
            ]}
          />
          <div className="mt-8 max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[rgba(15,234,122,0.1)] border border-[rgba(15,234,122,0.25)] text-[#0FEA7A] text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <Monitor className="w-4 h-4" /> Flexgate Specialists
            </div>
            <h1
              className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] leading-tight mb-6"
             
            >
              MacBook Pro Screen<br />
              <span className="text-[#0FEA7A]">Repair</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-8 max-w-2xl">
              Cracked display, Flexgate stage-light effect, Staingate coating, backlight failure. All MacBook Pro models. up-to-3 year warranty.
            </p>
            {/* Badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Monitor, label: 'Screen Repair' },
                { icon: Shield, label: 'Up-to-3 Year Warranty' },
                { icon: Zap, label: 'Assessment: from R599' },
                { icon: AlertTriangle, label: 'Flexgate Specialists' },
              ].map(({ icon: Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-1.5 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.2)] text-[#7A9E98] text-xs px-3 py-1.5 rounded-full">
                  <Icon className="w-3.5 h-3.5 text-[#0FEA7A]" /> {label}
                </span>
              ))}
            </div>
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`https://wa.me/27645295863?text=Hi%2C%20I%20need%20a%20MacBook%20Pro%20screen%20repair%20quote`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                WhatsApp a Quote
              </a>
              <Link
                href="/book"
                className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                Book Online <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Screen Issues We Fix */}
      <section className="py-12 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3 text-center">
            Screen Issues We Fix
          </h2>
          <p className="text-[#7A9E98] text-center mb-12 max-w-2xl mx-auto text-sm">
            Assessment: from R599 — we diagnose the exact fault and provide a fixed quote before any work begins.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {faults.map((f) => (
              <div key={f.title} className="glass-card p-5 rounded-2xl">
                <div className="flex items-start gap-2 mb-2">
                  <Monitor className="w-4 h-4 text-[#0FEA7A] flex-shrink-0 mt-0.5" />
                  <h3 className="text-[#E8F4F1] font-bold text-sm leading-snug">{f.title}</h3>
                </div>
                {f.highlight && (
                  <span className="inline-block text-xs text-orange-400 bg-[rgba(255,165,0,0.1)] px-2 py-0.5 rounded-full mb-2">{f.highlight}</span>
                )}
                <p className="text-[#7A9E98] text-xs leading-relaxed">{f.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MacBook Pro Screen Issues Explained */}
      <section className="py-12 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3 text-center">
            MacBook Pro Screen Issues <span className="text-[#0FEA7A]">Explained</span>
          </h2>
          <p className="text-[#7A9E98] text-center mb-12 max-w-2xl mx-auto text-sm">
            Several MacBook Pro generations have well-documented screen defects. If your machine has any of these, you are not alone.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {knownIssues.map((issue) => (
              <div key={issue.name} className="glass-card p-6 rounded-2xl border border-[rgba(255,165,0,0.15)]">
                <AlertTriangle className="w-6 h-6 text-orange-400 mb-3" />
                <h3 className="text-[#E8F4F1] font-bold text-lg mb-1">{issue.name}</h3>
                <p className="text-[#0FEA7A] text-xs font-medium mb-3">{issue.models}</p>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{issue.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Models */}
      <section className="py-12 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8 text-center">
            Supported <span className="text-[#0FEA7A]">Models</span>
          </h2>
          <div className="glass-card rounded-2xl overflow-hidden">
            {models.map(({ name, note }, i) => (
              <div key={name} className={`flex justify-between items-center px-6 py-4 ${i < models.length - 1 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}>
                <span className="text-[#7A9E98] text-sm">{name}</span>
                <span className="text-xs text-[#0FEA7A] bg-[rgba(15,234,122,0.1)] px-2 py-0.5 rounded-full whitespace-nowrap">{note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-12 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-12 text-center">
            How It <span className="text-[#0FEA7A]">Works</span>
          </h2>
          <div className="space-y-5">
            {process.map((item) => (
              <div key={item.step} className="flex gap-6 glass-card p-6 rounded-2xl">
                <div className="text-3xl font-extrabold text-[#0FEA7A] opacity-40 flex-shrink-0 w-10">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-[#E8F4F1] font-bold mb-1">{item.title}</h3>
                  <p className="text-[#7A9E98] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-12 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3 text-center">
            What Clients Say
          </h2>
          <p className="text-[#7A9E98] text-center mb-12 text-sm">
            Rated {SITE.rating} from {SITE.reviewCount} reviews across Johannesburg
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.name} className="glass-card p-6 rounded-2xl flex flex-col gap-4">
                <div className="flex gap-1">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#0FEA7A] text-[#0FEA7A]" />
                  ))}
                </div>
                <p className="text-[#7A9E98] text-sm leading-relaxed flex-1">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center gap-2 pt-2 border-t border-[rgba(255,255,255,0.05)]">
                  <div className="w-8 h-8 rounded-full bg-[rgba(15,234,122,0.15)] flex items-center justify-center text-[#0FEA7A] font-bold text-sm">
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="text-[#E8F4F1] text-sm font-semibold">{r.name}</p>
                    <div className="flex items-center gap-1 text-[#7A9E98] text-xs">
                      <MapPin className="w-3 h-3" /> {r.suburb}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="MacBook Pro Screen Repair, FAQs" />
        </div>
      </section>

      {/* Related Services */}
      <section className="py-12 bg-[#071210]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-[#E8F4F1] mb-6">
            Related Services
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: 'MacBook Pro Repair', href: '/macbook-pro-repair' },
              { label: 'MacBook Pro Battery Replacement', href: '/macbook-pro-repair/battery' },
              { label: 'MacBook Pro Keyboard Repair', href: '/macbook-pro-repair/keyboard' },
              { label: 'Logic Board Repair', href: '/logic-board-repair/macbook-pro' },
              { label: 'Liquid Damage', href: '/liquid-damage/macbook-pro' },
              { label: 'MacBook Not Turning On', href: '/macbook-not-turning-on' },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="block p-3 rounded-lg glass-card text-[#7A9E98] hover:text-[#0FEA7A] hover:border-[#0FEA7A] text-sm transition-colors">
                {link.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <Monitor className="w-10 h-10 text-[#0FEA7A] mx-auto mb-4" />
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
              MacBook Pro Screen Needs Repair?
            </h2>
            <p className="text-[#7A9E98] mb-2">up-to-3 year warranty. Assessment: from R599. Fixed quote before any work begins.</p>
            <p className="text-[#7A9E98] text-sm mb-8">Hyde Park, Johannesburg. Drop in, no appointment needed.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/27645295863?text=Hi%2C%20I%20need%20a%20MacBook%20Pro%20screen%20repair%20quote`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                WhatsApp Us Now
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> {CONTACT.phone}
              </a>
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                Book Online <CheckCircle className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
