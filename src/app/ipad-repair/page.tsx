import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'iPad Repair Johannesburg — All Models, All Damage | ZA Support',
  description: 'iPad repair in Johannesburg. Screen, battery, charging, liquid damage. All iPad models including M4. No Fix No Fee. 12-month warranty. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/ipad-repair' },
};

const faqs = [
  { question: 'Do you repair all iPad models?', answer: 'Yes — iPad (5th through 10th generation), iPad mini (4th through 6th generation), iPad Air (3rd generation through M2), and iPad Pro (all sizes and generations including M4). Call to confirm parts availability for older models.' },
  { question: 'How long does iPad screen repair take?', answer: 'Standard iPad screen replacements take 2–4 hours depending on the model. iPad Pro models are more complex due to ProMotion display technology and require additional care. We will confirm the timeframe at assessment.' },
  { question: 'Will Apple Pencil compatibility be affected by screen repair?', answer: 'No, if done correctly. We use OEM-equivalent digitiser panels that maintain Apple Pencil compatibility. We test Apple Pencil functionality after every iPad screen repair.' },
  { question: 'Is iPad repair worth it given the cost of new iPads?', answer: 'Yes in most cases. iPad Pro repairs (screen, battery, charging) are significantly cheaper than replacement. Even standard iPad repairs are usually cost-effective. We will give you an honest cost-benefit comparison at the assessment.' },
  { question: 'Can you fix an iPad with a completely shattered screen that still works underneath?', answer: 'Yes. If the LCD beneath the glass is intact, we can replace just the digitiser (glass) on many models, which is less expensive than replacing the full display assembly. We assess at intake to determine the most cost-effective repair.' },
];

const repairTypes = [
  { title: 'Screen Replacement', href: '/ipad-repair/screen', price: 'From R 2,000', desc: 'LCD and digitiser. All models.' },
  { title: 'Battery Replacement', href: '/ipad-repair/battery', price: 'From R 1,200', desc: 'Restore full battery capacity.' },
  { title: 'Liquid Damage', href: '/ipad-repair/liquid-damage', price: 'From R 1,500', desc: 'Ultrasonic clean and board repair.' },
  { title: 'Charging Port', href: '/ipad-repair/charging', price: 'From R 900', desc: 'Lightning and USB-C port repair.' },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'iPad Repair', item: 'https://zasupport.com/ipad-repair' },
  ],
};

export default function iPadRepairPage() {
  return (
    <>
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'iPad Repair' }]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
              iPad Repair Johannesburg
              <br /><span className="text-[#0FEA7A]">All Models. All Damage.</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-6 max-w-3xl leading-relaxed">
              Professional iPad repair in Johannesburg. Screen, battery, liquid damage, charging.
              All iPad models including M4 iPad Pro. No Fix No Fee. Hyde Park.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                Book Repair <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8 text-center" style={{ fontFamily: 'Syne, sans-serif' }}>iPad Repair Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {repairTypes.map((repair) => (
              <Link key={repair.href} href={repair.href} className="glass-card p-6 group block">
                <h3 className="text-[#E8F4F1] font-bold text-lg mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>{repair.title}</h3>
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

      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8" style={{ fontFamily: 'Syne, sans-serif' }}>iPad Models We Repair</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { family: 'iPad (Standard)', models: '5th, 6th, 7th, 8th, 9th, 10th Generation' },
              { family: 'iPad mini', models: '4th, 5th, 6th Generation' },
              { family: 'iPad Air', models: '3rd Gen, 4th Gen, M1, M2' },
              { family: 'iPad Pro 11"', models: '1st, 2nd, 3rd Gen, M4' },
              { family: 'iPad Pro 12.9" / 13"', models: '2nd through 6th Gen, M4' },
              { family: 'Accessories', models: 'Apple Pencil (1st & 2nd Gen), Smart Keyboard' },
            ].map((item) => (
              <div key={item.family} className="glass-card p-4">
                <p className="text-[#E8F4F1] font-semibold mb-1">{item.family}</p>
                <p className="text-[#7A9E98] text-xs">{item.models}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="iPad Repair — Common Questions" />
        </div>
      </section>

      <section className="py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>iPad Damaged? We Fix It.</h2>
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
