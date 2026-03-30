import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Battery, Shield, Zap, CheckCircle, AlertTriangle, Star, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, SITE, buildWhatsAppUrl} from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Pro Battery Replacement Johannesburg | All Models | ZA Support',
  description:
    'MacBook Pro battery replacement in Johannesburg. All Intel and Apple Silicon models. Genuine replacement batteries, data safe, up-to-3 year warranty. Assessment: from R599. Hyde Park.',
  alternates: { canonical: 'https://zasupport.com/macbook-pro-repair/battery' },
  keywords: [
    'MacBook Pro battery replacement Johannesburg',
    'MacBook Pro battery swollen Johannesburg',
    'MacBook Pro M1 M2 M3 battery replacement',
    'MacBook Pro battery not charging Johannesburg',
    'MacBook Pro battery replacement Hyde Park',
    'MacBook Pro battery service Johannesburg',
  ],
  openGraph: {
    title: 'MacBook Pro Battery Replacement Johannesburg | All Models | ZA Support',
    description: 'MacBook Pro battery replacement in Johannesburg. All Intel and Apple Silicon models. up-to-3 year warranty. Assessment: from R599.',
    url: 'https://zasupport.com/macbook-pro-repair/battery',
    siteName: 'ZA Support',
    type: 'website',
  },
};

const aggregateRatingSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'MacBook Pro Battery Replacement Johannesburg',
  description: 'Professional MacBook Pro battery replacement in Johannesburg. All Intel and Apple Silicon models. up-to-3 year warranty.',
  brand: { '@type': 'Brand', name: 'ZA Support' },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Pro Battery Replacement Johannesburg',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Hyde Park' },
    { '@type': 'Neighborhood', name: 'Sandton' },
  ],
  description:
    'MacBook Pro battery replacement in Johannesburg. All Intel and Apple Silicon models covered. Assessment from R599. up-to-3 year warranty on parts and labour.',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'MacBook Pro Repair', item: 'https://zasupport.com/macbook-pro-repair' },
    { '@type': 'ListItem', position: 3, name: 'Battery Replacement', item: 'https://zasupport.com/macbook-pro-repair/battery' },
  ],
};

const symptoms = [
  { title: 'Battery drains in under 2 hours', detail: 'A healthy MacBook Pro should give 8-18 hours depending on model. Under 2 hours of real use means significant cell degradation.' },
  { title: 'MacBook shuts off before reaching 0%', detail: 'Powers off at 20-30% or higher. Classic sign of cells that can no longer hold charge under load.' },
  { title: 'Battery health below 80% in System Info', detail: 'Apple classifies anything below 80% maximum capacity as consumed. macOS will show "Service Recommended" at this point.' },
  { title: 'Swollen or bulging battery', detail: 'Trackpad feels raised or pops. Bring in immediately — a swollen battery is a fire risk and should not be charged.', urgent: true },
  { title: '"Service Recommended" or "Replace Now" in macOS', detail: 'Apple flags degraded batteries directly in Battery Settings. This message confirms replacement is needed.' },
  { title: 'Won\'t hold charge even when plugged in', detail: 'The battery has failed completely. The Mac will only run on AC power with no portability remaining.' },
];

const models = [
  { name: 'MacBook Pro 13" 2015–2020 (Intel)', note: 'Intel' },
  { name: 'MacBook Pro 15" 2015–2019 (Intel)', note: 'Intel' },
  { name: 'MacBook Pro 16" 2019 (Intel)', note: 'Intel' },
  { name: 'MacBook Pro 13" M1, M2 (Apple Silicon)', note: 'Apple Silicon' },
  { name: 'MacBook Pro 14" M1 Pro/Max, M2 Pro/Max, M3 Pro/Max', note: 'Apple Silicon' },
  { name: 'MacBook Pro 16" M1 Pro/Max, M2 Pro/Max, M3 Pro/Max', note: 'Apple Silicon' },
];

const process = [
  { step: '01', title: 'Drop In for Assessment', desc: 'Bring your MacBook Pro to our Hyde Park workshop. No appointment required, though calling ahead confirms stock for same-day service.' },
  { step: '02', title: 'Written Quote', desc: 'We check battery health, cycle count, and cell condition. You receive a fixed quote before any work begins — no surprises.' },
  { step: '03', title: 'Battery Replacement (Data Untouched)', desc: 'We replace the battery only. Your storage, apps, and data are completely unaffected. No reinstall or erase required.' },
  { step: '04', title: 'Full Test and Return', desc: 'Battery health confirmed at 100% in macOS before collection. up-to-3 year warranty issued on parts and labour.' },
];

const faqs = [
  {
    question: 'How do I know if my MacBook Pro battery needs replacing?',
    answer: 'Check System Information > Power. If cycle count is above 1,000 or health is below 80%, replacement is recommended. Other signs: shutting down at 20-30%, won\'t hold charge, or the battery feels warm even when idle.',
  },
  {
    question: 'What is the assessment fee policy?',
    answer: 'from R599 covers a full diagnostic and written quote. If you proceed with the repair, the assessment fee applies. It is payable only if you decline the quote.',
  },
  {
    question: 'How long does a MacBook Pro battery replacement take?',
    answer: 'Most MacBook Pro battery replacements are completed within 1-3 hours. We aim for same-day service where possible. M-series models with glued assemblies take slightly longer — typically 2-3 hours.',
  },
  {
    question: 'Is my data safe during a battery replacement?',
    answer: 'Yes. Battery replacement does not affect your storage or data. We do not need to erase or reinstall macOS. Your files, apps, and accounts remain exactly as they were.',
  },
  {
    question: 'My battery is swollen. Is it safe to bring in?',
    answer: 'If your battery is swollen, stop using the MacBook and do not charge it. Bring it in as soon as possible. A swollen battery is a fire risk and should be handled by a technician immediately. We treat these as same-day priority.',
  },
  {
    question: 'Do you replace batteries in Apple Silicon MacBook Pro models?',
    answer: 'Yes. We replace batteries in M1, M2, and M3 MacBook Pro models including 13-inch, 14-inch, and 16-inch. Both Intel and Apple Silicon are fully supported.',
  },
  {
    question: 'What warranty do you provide on battery replacements?',
    answer: 'up-to-3 year warranty on the battery and labour. If the battery fails or shows the same fault within the warranty period, we replace it at no charge. Extended warranty is also available on request.',
  },
  {
    question: 'What cycle count is considered high for a MacBook Pro battery?',
    answer: 'Apple specifies 1,000 cycles as the rated lifespan for MacBook Pro batteries. At 80% health or above 1,000 cycles, replacement is typically recommended. macOS will show "Service Recommended" when the battery needs attention.',
  },
];

const reviews = [
  {
    name: 'Tarryn M.',
    suburb: 'Sandton',
    rating: 5,
    text: 'My MacBook Pro 14" was dying after 90 minutes on a charge. ZA Support replaced the battery the same day. 100% health confirmed before I left. Fantastic service.',
  },
  {
    name: 'David K.',
    suburb: 'Rosebank',
    rating: 5,
    text: 'Swollen battery on my MacBook Pro 2019. They treated it as urgent, had it done in 3 hours. Very professional, clear pricing, up-to-3 year warranty in writing.',
  },
  {
    name: 'Priya N.',
    suburb: 'Hyde Park',
    rating: 5,
    text: 'Battery health at 61% on my M1 Pro. Called, dropped it off, collected the same afternoon at 100%. Incredibly fast and the staff knew exactly what they were doing.',
  },
];

const faqSchema = buildFaqSchema(faqs);

export default function MacBookProBatteryPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />
      <SchemaOrg schema={serviceSchema} />

      {/* Hero */}
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'MacBook Pro Repair', href: '/macbook-pro-repair' },
              { label: 'Battery Replacement' },
            ]}
          />
          <div className="mt-8 max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[rgba(15,234,122,0.1)] border border-[rgba(15,234,122,0.25)] text-[#0FEA7A] text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <Battery className="w-4 h-4" /> MacBook Pro Battery Replacement
            </div>
            <h1
              className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] leading-tight mb-6"
             
            >
              MacBook Pro Battery<br />
              <span className="text-[#0FEA7A]">Replacement</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-8 max-w-2xl">
              Battery draining fast, not charging, or swollen? We replace MacBook Pro batteries on all models. up-to-3 year warranty.
            </p>
            {/* Badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Battery, label: 'Battery Replacement' },
                { icon: Shield, label: 'Up-to-3 Year Warranty' },
                { icon: Zap, label: 'Assessment: from R599' },
                { icon: CheckCircle, label: 'Data Safe' },
              ].map(({ icon: Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-1.5 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.2)] text-[#7A9E98] text-xs px-3 py-1.5 rounded-full">
                  <Icon className="w-3.5 h-3.5 text-[#0FEA7A]" /> {label}
                </span>
              ))}
            </div>
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={buildWhatsAppUrl('MBP-BAT', 'macbook-pro-repair')}
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
               target="_blank" rel="noopener noreferrer">
                <Phone className="w-5 h-5" /> {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Signs You Need a Battery Replacement */}
      <section className="py-12 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3 text-center">
            Signs You Need a Battery Replacement
          </h2>
          <p className="text-[#7A9E98] text-center mb-12 max-w-2xl mx-auto text-sm">
            Recognise any of these? Assessment: from R599 — we diagnose and quote before any work begins.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {symptoms.map((s) => (
              <div
                key={s.title}
                className={`glass-card p-6 rounded-2xl ${s.urgent ? 'border-[rgba(245,166,35,0.35)]' : ''}`}
              >
                <div className="flex items-start gap-3 mb-3">
                  {s.urgent
                    ? <AlertTriangle className="w-5 h-5 text-[#F5A623] flex-shrink-0 mt-0.5" />
                    : <Battery className="w-5 h-5 text-[#0FEA7A] flex-shrink-0 mt-0.5" />
                  }
                  <h3 className="text-[#E8F4F1] font-bold text-sm leading-snug">{s.title}</h3>
                  {s.urgent && (
                    <span className="ml-auto text-[#F5A623] text-xs font-semibold bg-[rgba(245,166,35,0.1)] px-2 py-0.5 rounded-full whitespace-nowrap">
                      Urgent
                    </span>
                  )}
                </div>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Swollen Battery Warning */}
      <section className="py-8 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[rgba(245,166,35,0.08)] border border-[rgba(245,166,35,0.3)] rounded-2xl p-6 flex gap-4">
            <AlertTriangle className="w-6 h-6 text-[#F5A623] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[#E8F4F1] font-bold mb-1">Swollen Battery Warning</p>
              <p className="text-[#7A9E98] text-sm">
                If your trackpad feels raised or your MacBook Pro has a visible bulge, bring it in immediately. Do not charge it and do not leave it unattended. A swollen lithium battery is a fire risk. We treat these as same-day priority.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Models */}
      <section className="py-12 sm:py-20 bg-[#0A1A18]">
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
          <p className="text-[#7A9E98] text-xs text-center mt-4">All models supported. Apple Silicon battery replacement available.</p>
        </div>
      </section>

      {/* Process */}
      <section className="py-12 sm:py-20 bg-[#111C1A]">
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
      <section className="py-12 sm:py-20 bg-[#0A1A18]">
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
      <section className="py-12 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="MacBook Pro Battery Replacement, FAQs" />
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
              { label: 'MacBook Pro Screen Repair', href: '/macbook-pro-repair/screen' },
              { label: 'MacBook Pro Keyboard Repair', href: '/macbook-pro-repair/keyboard' },
              { label: 'Logic Board Repair', href: '/logic-board-repair' },
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
            <Battery className="w-10 h-10 text-[#0FEA7A] mx-auto mb-4" />
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
              MacBook Pro Battery Dying?
            </h2>
            <p className="text-[#7A9E98] mb-2">Completed in 1-3 hours. up-to-3 year warranty. Assessment: from R599.</p>
            <p className="text-[#7A9E98] text-sm mb-8">Hyde Park, Johannesburg. Drop in, no appointment needed.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={buildWhatsAppUrl('MBP-BAT', 'macbook-pro-repair')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                WhatsApp Us Now
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
               target="_blank" rel="noopener noreferrer">
                <Phone className="w-5 h-5" /> {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
