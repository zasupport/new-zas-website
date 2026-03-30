import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'iPhone Repair Johannesburg, All Models, All Damage Types | ZA Support',
  description:
    'iPhone repair in Johannesburg. Screen, battery, charging, liquid damage, back glass, camera. All models iPhone 6 through 16 Pro Max. Assessment: from R599. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/iphone-repair' },
};

const faqs = [
  {
    question: 'How long does iPhone screen repair take?',
    answer: 'Most iPhone screen replacements are completed within 1–2 hours, depending on the model. We stock screens for all current models. Call ahead to confirm stock availability for your specific model.',
  },
  {
    question: 'Do you use genuine Apple screens or aftermarket?',
    answer: 'We offer both options. We can source OEM-equivalent (original quality manufacturer) displays for most iPhone models, as well as genuine Apple-pull screens where available. We will explain the options and pricing difference at your assessment, our recommended option is always the highest quality available for your model.',
  },
  {
    question: 'Will iPhone screen repair affect Face ID or Touch ID?',
    answer: 'A professional screen replacement should not affect Face ID or Touch ID if done correctly. Face ID is paired to the original TrueDepth camera module, which is transferred to the new display assembly. We handle this transfer carefully to preserve biometric functionality.',
  },
  {
    question: 'My iPhone battery percentage drops suddenly and the phone shuts off. Is this a repair?',
    answer: 'Yes. Sudden percentage drops and unexpected shutdowns are classic signs of a degraded battery with high internal resistance. iPhone battery replacement takes under an hour. We check your battery health percentage and give you an honest recommendation.',
  },
  {
    question: 'Is it worth repairing an older iPhone (6, 7, 8)?',
    answer: 'This depends on the repair type and how much you value the device. A battery replacement on an iPhone 8 is almost always worth it, it extends device life significantly for a small cost. A screen replacement on an iPhone 6 Plus may cost more than the device is worth on the secondhand market. We will give you an honest assessment.',
  },
];

const repairTypes = [
  { title: 'Screen Replacement', href: '/iphone-repair/screen', price: 'Contact for pricing', desc: 'OLED / LCD replacement. All models.' },
  { title: 'Battery Replacement', href: '/iphone-repair/battery', price: 'Contact for pricing', desc: 'Restore full battery life.' },
  { title: 'Liquid Damage', href: '/iphone-repair/liquid-damage', price: 'Contact for pricing', desc: 'Ultrasonic cleaning, board repair.' },
  { title: 'Charging Port', href: '/iphone-repair/charging', price: 'Contact for pricing', desc: 'Lightning and USB-C port repair.' },
  { title: 'Back Glass', href: '/iphone-repair/back-glass', price: 'Contact for pricing', desc: 'Cracked back glass replacement.' },
  { title: 'Camera Repair', href: '/iphone-repair/camera', price: 'Contact for pricing', desc: 'Front and rear camera module.' },
];

const models = [
  'iPhone 8 / 8 Plus', 'iPhone X', 'iPhone XR', 'iPhone XS / XS Max',
  'iPhone 11 / 11 Pro / 11 Pro Max', 'iPhone 12 mini / 12 / 12 Pro / 12 Pro Max',
  'iPhone 13 mini / 13 / 13 Pro / 13 Pro Max', 'iPhone 14 / 14 Plus / 14 Pro / 14 Pro Max',
  'iPhone 15 / 15 Plus / 15 Pro / 15 Pro Max', 'iPhone 16 / 16 Plus / 16 Pro / 16 Pro Max',
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'iPhone Repair', item: 'https://zasupport.com/iphone-repair' },
  ],
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'iPhone Repair Johannesburg',
  description: 'iPhone screen, battery, charging port, liquid damage and back glass repair in Johannesburg. All models iPhone 6 through 16 Pro Max. Assessment from R599.',
  provider: {
    '@type': 'LocalBusiness',
    name: 'ZA Support',
    url: 'https://zasupport.com',
    telephone: '+27645295863',
  },
  areaServed: { '@type': 'City', name: 'Johannesburg' },
  serviceType: 'iPhone Repair',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'ZAR',
    price: '599',
    priceSpecification: { '@type': 'UnitPriceSpecification', price: '599', priceCurrency: 'ZAR', unitText: 'assessment from' },
    availability: 'https://schema.org/InStock',
  },
};

const faqSchema = buildFaqSchema(faqs);

export default function iPhoneRepairPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />
      <SchemaOrg schema={serviceSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'iPhone Repair' }]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              iPhone Repair Johannesburg
              <br /><span className="text-[#0FEA7A]">All Models. All Damage.</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-6 max-w-3xl leading-relaxed">
              Professional iPhone repair in Johannesburg. Screen, battery, liquid damage, charging, back glass, camera.
              iPhone 8 through iPhone 16 Pro Max. Assessment: from R599. Hyde Park.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all" target="_blank" rel="noopener noreferrer">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                Book Repair <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8 text-center">iPhone Repair Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {repairTypes.map((repair) => (
              <Link key={repair.href} href={repair.href} className="glass-card p-6 group block">
                <h3 className="text-[#E8F4F1] font-bold text-lg mb-1">{repair.title}</h3>
                <p className="text-[#7A9E98] text-sm mb-3">{repair.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#0FEA7A] font-bold">{repair.price}</span>
                  <ArrowRight className="w-4 h-4 text-[#7A9E98] group-hover:text-[#0FEA7A] transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8">iPhone Models We Repair</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {models.map((model) => (
              <div key={model} className="glass-card p-3 text-center">
                <span className="text-[#7A9E98] text-xs">{model}</span>
              </div>
            ))}
          </div>
          <p className="text-[#7A9E98] text-sm mt-4">Also repair iPhone 6, 6s, 7, and earlier models where parts available. Call to confirm.</p>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="iPhone Repair, Common Questions" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">iPhone Damaged? We Can Fix It.</h2>
            <p className="text-[#7A9E98] mb-6">Assessment: from R599. Hyde Park, Johannesburg.</p>
            <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all" target="_blank" rel="noopener noreferrer">
              <Phone className="w-5 h-5" /> Call {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
