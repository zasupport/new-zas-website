import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Keyboard, Shield, Zap, AlertTriangle, Star, MapPin, CheckCircle, Droplets } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Pro Keyboard Repair Johannesburg | Butterfly Keyboard Fix | ZA Support',
  description:
    'MacBook Pro keyboard repair in Johannesburg. Butterfly keyboard failure, sticky keys, repeating keys, no key response. All models. Assessment: R899 ex VAT. Hyde Park.',
  alternates: { canonical: 'https://zasupport.com/macbook-pro-repair/keyboard' },
  keywords: [
    'MacBook Pro keyboard repair Johannesburg',
    'MacBook Pro butterfly keyboard repair Johannesburg',
    'MacBook Pro sticky keys Johannesburg',
    'MacBook Pro keys not working Johannesburg',
    'MacBook Pro keyboard replacement Johannesburg',
    'butterfly keyboard fix Johannesburg',
  ],
  openGraph: {
    title: 'MacBook Pro Keyboard Repair Johannesburg | Butterfly Keyboard Fix | ZA Support',
    description: 'MacBook Pro keyboard repair in Johannesburg. Butterfly keyboard failure, sticky keys, no key response. All models. Assessment: R899 ex VAT.',
    url: 'https://zasupport.com/macbook-pro-repair/keyboard',
    siteName: 'ZA Support',
    type: 'website',
  },
};

const aggregateRatingSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'MacBook Pro Keyboard Repair Johannesburg',
  description: 'Professional MacBook Pro keyboard repair in Johannesburg. Butterfly keyboard failure, sticky keys, liquid damage. All models. 3-month warranty.',
  brand: { '@type': 'Brand', name: 'ZA Support' },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: SITE.rating,
    reviewCount: '120',
    bestRating: '5',
    worstRating: '1',
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Pro Keyboard Repair Johannesburg',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Hyde Park' },
    { '@type': 'Neighborhood', name: 'Sandton' },
  ],
  description:
    'MacBook Pro keyboard repair in Johannesburg. Butterfly keyboard failure, sticky keys, repeating keys, liquid damage. All models. Assessment R899 ex VAT.',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'MacBook Pro Repair', item: 'https://zasupport.com/macbook-pro-repair' },
    { '@type': 'ListItem', position: 3, name: 'Keyboard Repair', item: 'https://zasupport.com/macbook-pro-repair/keyboard' },
  ],
};

const symptoms = [
  { title: 'Keys not registering', detail: 'One or more keys press but produce no output. Classic butterfly keyboard dust ingress on 2016-2019 models.' },
  { title: 'Repeating or stuck keys', detail: 'A single keypress produces multiple characters, or a key fires continuously without being pressed.' },
  { title: 'Sticky or unresponsive keys', detail: 'Keys feel stiff, require extra force, or occasionally miss keypresses entirely.' },
  { title: 'Space bar or return key failure', detail: 'The two highest-use keys are also the most prone to butterfly mechanism failure.' },
  { title: 'Liquid spill damage', detail: 'Liquid under the keyboard causes corrosion on the key contacts and switches. Assessment determines repairability.' },
  { title: 'Keys physically broken or missing', detail: 'Keycaps snapped off or lost. Butterfly keys cannot be replaced individually — full top case assembly is required.' },
];

const keyboardTypes = [
  {
    name: 'Butterfly Keyboard',
    models: '2016–2019 MacBook Pro (all sizes)',
    description: 'Apple\'s butterfly mechanism is prone to dust ingress, key bounce, and complete switch failure. Apple\'s free repair programme has ended. The fix involves replacing the full top case assembly, including the keyboard, battery bracket, and chassis. We carry top cases for most affected models with a 3-month warranty.',
    warning: true,
  },
  {
    name: 'Magic Keyboard (Scissor)',
    models: '2020+ MacBook Pro (Intel and Apple Silicon)',
    description: 'The Magic Keyboard returned the scissor mechanism from 2020 onward. Significantly more reliable than butterfly. Key failures are less common and typically caused by liquid damage or physical impact. Individual key replacement is sometimes possible, but full top case replacement may be required.',
    warning: false,
  },
  {
    name: 'Classic Scissor Keyboard',
    models: '2013–2015 MacBook Pro',
    description: 'Earlier Intel MacBook Pro models used a traditional scissor mechanism. More robust than butterfly. Failures are usually caused by liquid damage or heavy wear. Top case replacement restores full keyboard functionality with warranty.',
    warning: false,
  },
];

const models = [
  { name: 'MacBook Pro 13" 2013–2015 (Classic scissor keyboard)', note: 'Intel' },
  { name: 'MacBook Pro 13" 2016–2019 (Butterfly keyboard)', note: 'Intel, butterfly risk' },
  { name: 'MacBook Pro 15" 2016–2019 (Butterfly keyboard)', note: 'Intel, butterfly risk' },
  { name: 'MacBook Pro 16" 2019 (Butterfly keyboard)', note: 'Intel, butterfly risk' },
  { name: 'MacBook Pro 13" 2020 (Magic keyboard)', note: 'Intel' },
  { name: 'MacBook Pro 13" M1, M2 (Magic keyboard)', note: 'Apple Silicon' },
  { name: 'MacBook Pro 14" M1 Pro/Max, M2 Pro/Max, M3 Pro/Max', note: 'Apple Silicon' },
  { name: 'MacBook Pro 16" M1 Pro/Max, M2 Pro/Max, M3 Pro/Max', note: 'Apple Silicon' },
];

const process = [
  { step: '01', title: 'Drop In for Assessment', desc: 'Bring your MacBook Pro to our Hyde Park workshop. We test every key, check for liquid damage, and identify whether the fault is butterfly mechanism, top case, or logic board input.' },
  { step: '02', title: 'Written Quote', desc: 'You receive a fixed price before any work begins. For butterfly models, we also confirm whether any Apple extended programme coverage may apply.' },
  { step: '03', title: 'Top Case or Keyboard Replacement', desc: 'Most MacBook Pro keyboard repairs require full top case assembly replacement. Your storage and data are completely unaffected throughout.' },
  { step: '04', title: 'Full Test and Return', desc: 'Every key tested before collection. 3-month written warranty issued on parts and labour.' },
];

const faqs = [
  {
    question: 'What is the butterfly keyboard issue on MacBook Pro?',
    answer: 'Apple used a butterfly keyboard mechanism in MacBook Pro models from 2016 to 2019. The mechanism is very sensitive to dust and debris, which causes keys to stop registering, repeat, or become sticky. Apple ran a free repair programme that has since ended. The repair involves replacing the full top case assembly.',
  },
  {
    question: 'Does Apple still cover butterfly keyboards under the extended programme?',
    answer: 'Apple\'s keyboard service programme for butterfly keyboards ended. Machines purchased between 2015 and 2019 may have been eligible, but the programme is closed. We check on assessment whether any coverage may still apply through other channels before quoting.',
  },
  {
    question: 'How long does MacBook Pro keyboard repair take?',
    answer: 'Top case replacement typically takes 2-4 hours. If we have the correct top case in stock for your model, same-day service is often possible. Call ahead to confirm stock availability.',
  },
  {
    question: 'What is the assessment fee policy?',
    answer: 'R899 ex VAT covers a full keyboard diagnostic and written fixed-price quote. The fee is absorbed into the repair if you proceed, and payable only if you decline.',
  },
  {
    question: 'Can individual butterfly keys be replaced?',
    answer: 'No. The butterfly mechanism does not support individual key replacement. If one key fails, the full top case assembly must be replaced. This includes the keyboard, battery connector bracket, and surrounding chassis. This is why Apple\'s repair was so costly — it is unavoidable with this design.',
  },
  {
    question: 'What if liquid got into the keyboard?',
    answer: 'Liquid damage to the keyboard requires assessment. We check whether the corrosion is limited to the top case or has reached the logic board. If only the top case is affected, replacement resolves the issue. Logic board corrosion requires additional microsoldering repair. Assessment: R899 ex VAT before any quote.',
  },
  {
    question: 'What warranty do you provide on keyboard repairs?',
    answer: '3-month written warranty on the top case assembly and labour. If the same fault reoccurs within the warranty period, we fix it at no charge. Extended warranty is also available on request.',
  },
  {
    question: 'Are MacBook Pro 2020 and later keyboards more reliable?',
    answer: 'Yes. Apple returned to a scissor mechanism (branded Magic Keyboard) from 2020 onward. The Magic Keyboard is significantly more reliable than the butterfly design. It is less susceptible to dust ingress and key bounce. Failures still occur but are far less common, usually from liquid damage or heavy physical impact.',
  },
];

const reviews = [
  {
    name: 'Michael B.',
    suburb: 'Sandton',
    rating: 5,
    text: 'Butterfly keyboard on my 2017 MacBook Pro — space bar completely dead. ZA Support had the right top case in stock, fixed same day. 3-month warranty, no issues since.',
  },
  {
    name: 'Leigh A.',
    suburb: 'Rosebank',
    rating: 5,
    text: 'Coffee spill on my MacBook Pro keyboard. They assessed the damage, quoted clearly, and had it repaired within 48 hours. Data completely safe throughout.',
  },
  {
    name: 'Sipho M.',
    suburb: 'Fourways',
    rating: 5,
    text: 'Three keys on my 2018 MacBook Pro stopped working. ZA Support diagnosed it as butterfly failure immediately, no guesswork. Repaired quickly at a fair price.',
  },
];

const faqSchema = buildFaqSchema(faqs);

export default function MacBookProKeyboardPage() {
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
              { label: 'Keyboard Repair' },
            ]}
          />
          <div className="mt-8 max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[rgba(15,234,122,0.1)] border border-[rgba(15,234,122,0.25)] text-[#0FEA7A] text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <Keyboard className="w-4 h-4" /> Butterfly Keyboard Specialists
            </div>
            <h1
              className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] leading-tight mb-6"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              MacBook Pro Keyboard<br />
              <span className="text-[#0FEA7A]">Repair</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-2xl">
              Butterfly keyboard failure, sticky keys, keys not registering. 2015-2019 MacBook Pro specialists. All models. 3-month warranty.
            </p>
            <div className="bg-[rgba(255,165,0,0.08)] border border-[rgba(255,165,0,0.25)] rounded-xl px-4 py-3 mb-8 inline-flex items-start gap-2 max-w-2xl">
              <AlertTriangle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
              <p className="text-[#7A9E98] text-sm">
                Butterfly keyboard (2016-2019 MacBook Pro) is a known fault. Apple extended service programme may cover your device. We check first.
              </p>
            </div>
            {/* Badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Keyboard, label: 'Keyboard Repair' },
                { icon: Shield, label: '3-Month Warranty' },
                { icon: Zap, label: 'Assessment: R899 ex VAT' },
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
                href={`https://wa.me/27645295863?text=Hi%2C%20I%20need%20a%20MacBook%20Pro%20keyboard%20repair%20quote`}
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

      {/* Symptoms */}
      <section className="py-12 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3 text-center" style={{ fontFamily: 'Syne, sans-serif' }}>
            Keyboard Issues We Fix
          </h2>
          <p className="text-[#7A9E98] text-center mb-12 max-w-2xl mx-auto text-sm">
            Assessment: R899 ex VAT — we diagnose the exact fault and provide a fixed quote before any work begins.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {symptoms.map((s) => (
              <div key={s.title} className="glass-card p-6 rounded-2xl">
                <div className="flex items-start gap-3 mb-3">
                  <Keyboard className="w-5 h-5 text-[#0FEA7A] flex-shrink-0 mt-0.5" />
                  <h3 className="text-[#E8F4F1] font-bold text-sm leading-snug">{s.title}</h3>
                </div>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Butterfly vs Scissor */}
      <section className="py-12 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3 text-center" style={{ fontFamily: 'Syne, sans-serif' }}>
            MacBook Pro Keyboard <span className="text-[#0FEA7A]">Types Explained</span>
          </h2>
          <p className="text-[#7A9E98] text-center mb-12 max-w-2xl mx-auto text-sm">
            The keyboard mechanism in your MacBook Pro determines the repair approach. Understanding which type you have matters.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {keyboardTypes.map((kt) => (
              <div key={kt.name} className={`glass-card p-6 rounded-2xl ${kt.warning ? 'border-[rgba(255,165,0,0.2)]' : ''}`}>
                {kt.warning
                  ? <AlertTriangle className="w-6 h-6 text-orange-400 mb-3" />
                  : <Keyboard className="w-6 h-6 text-[#0FEA7A] mb-3" />
                }
                <h3 className="text-[#E8F4F1] font-bold text-lg mb-1">{kt.name}</h3>
                <p className="text-[#0FEA7A] text-xs font-medium mb-3">{kt.models}</p>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{kt.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Models */}
      <section className="py-12 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8 text-center" style={{ fontFamily: 'Syne, sans-serif' }}>
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
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-12 text-center" style={{ fontFamily: 'Syne, sans-serif' }}>
            How It <span className="text-[#0FEA7A]">Works</span>
          </h2>
          <div className="space-y-5">
            {process.map((item) => (
              <div key={item.step} className="flex gap-6 glass-card p-6 rounded-2xl">
                <div className="text-3xl font-extrabold text-[#0FEA7A] opacity-40 flex-shrink-0 w-10" style={{ fontFamily: 'Syne, sans-serif' }}>
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
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3 text-center" style={{ fontFamily: 'Syne, sans-serif' }}>
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
          <FAQAccordion items={faqs} title="MacBook Pro Keyboard Repair, FAQs" />
        </div>
      </section>

      {/* Related Services */}
      <section className="py-12 bg-[#071210]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-[#E8F4F1] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
            Related Services
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: 'MacBook Pro Repair', href: '/macbook-pro-repair' },
              { label: 'MacBook Pro Battery Replacement', href: '/macbook-pro-repair/battery' },
              { label: 'MacBook Pro Screen Repair', href: '/macbook-pro-repair/screen' },
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
            <Keyboard className="w-10 h-10 text-[#0FEA7A] mx-auto mb-4" />
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
              MacBook Pro Keyboard Not Working?
            </h2>
            <p className="text-[#7A9E98] mb-2">3-month warranty. Assessment: R899 ex VAT. Fixed quote before any work begins.</p>
            <p className="text-[#7A9E98] text-sm mb-8">Hyde Park, Johannesburg. Drop in, no appointment needed.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/27645295863?text=Hi%2C%20I%20need%20a%20MacBook%20Pro%20keyboard%20repair%20quote`}
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
                Book Online <Droplets className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
