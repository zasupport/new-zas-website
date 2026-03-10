import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQ';
import { CONTACT } from '@/lib/constants';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'iPhone Screen Repair Johannesburg | From R 1,500 | ZA Support',
  description: 'iPhone screen repair in Johannesburg from R 1,500. All models iPhone 8 through 16 Pro Max. OLED and LCD. 12-month warranty. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/iphone-repair/screen' },
};

const faqs = [
  { question: 'Do you use genuine Apple screens?', answer: 'We offer OEM-equivalent quality screens for all current iPhone models. For iPhone 13 and later, we use screens that preserve True Tone calibration. Genuine Apple screens are also available on request at a higher price point.' },
  { question: 'Will screen repair affect Face ID?', answer: 'No — if done correctly. We carefully transfer the TrueDepth camera module and Face ID sensor from the original screen to the new one. Face ID, True Tone, and Haptic Touch all function normally after repair.' },
  { question: 'How long does screen repair take?', answer: 'Most iPhone screen replacements are completed within 1–2 hours. Call ahead to confirm stock availability for your specific model.' },
  { question: 'My iPhone screen has lines on it but is not cracked. Is this a screen fault?', answer: 'Yes. Vertical or horizontal lines on an otherwise uncracked display typically indicate OLED failure or a loose display connector. This is covered under a screen replacement if the damage is internal.' },
  { question: 'What warranty do you provide on screen repairs?', answer: '12 months on all screen replacements. This covers the display hardware and our workmanship. It does not cover subsequent physical damage to the new screen.' },
];

const faqSchema = buildFaqSchema(faqs);

export default function iPhoneScreenPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'iPhone Repair', href: '/iphone-repair' }, { label: 'Screen Repair' }]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] leading-tight mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
              iPhone Screen Repair<br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-6 max-w-3xl">iPhone screen repair from R 1,500. All models. OLED and LCD. 12-month warranty. Hyde Park, Johannesburg.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link href="/contact" className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                Book Repair <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>Pricing by Model</h2>
              <div className="glass-card p-6">
                {[
                  ['iPhone 8 / 8 Plus / SE', 'From R 1,500'],
                  ['iPhone X / XS / XR', 'From R 1,800'],
                  ['iPhone 11 Series', 'From R 1,800'],
                  ['iPhone 12 Series', 'From R 2,000'],
                  ['iPhone 13 Series', 'From R 2,200'],
                  ['iPhone 14 / 14 Plus', 'From R 2,500'],
                  ['iPhone 14 Pro / Pro Max', 'From R 2,800'],
                  ['iPhone 15 / 16 Series', 'From R 2,800'],
                  ['iPhone 15 / 16 Pro / Pro Max', 'From R 3,200'],
                ].map(([model, price], i) => (
                  <div key={model} className={`flex justify-between py-2.5 ${i < 8 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}>
                    <span className="text-[#7A9E98] text-sm">{model}</span>
                    <span className="text-[#0FEA7A] font-bold text-sm">{price}</span>
                  </div>
                ))}
              </div>
              <p className="text-[#7A9E98] text-xs mt-3">12-month warranty on all screen repairs. No Fix No Fee.</p>
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>What We Repair</h2>
              {['Cracked or shattered OLED display', 'LCD screen with dead pixels', 'Screen with vertical/horizontal lines', 'Touch not responding on part of screen', 'Backlight failure (dark screen)', 'Yellow or discoloured display', 'Ghost touching / unresponsive touch', 'Display separating from frame'].map((item) => (
                <div key={item} className="flex items-center gap-3 py-2.5 border-b border-[rgba(255,255,255,0.04)]">
                  <span className="text-[#0FEA7A] text-sm">✓</span>
                  <span className="text-[#7A9E98] text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="iPhone Screen Repair — FAQs" />
        </div>
      </section>

      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: 'iPhone Battery Repair', href: '/iphone-repair/battery', price: 'From R 950' },
              { title: 'iPhone Liquid Damage', href: '/iphone-repair/liquid-damage', price: 'From R 1,200' },
              { title: 'All iPhone Repairs', href: '/iphone-repair', price: 'All Damage Types' },
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

      <section className="py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>Cracked iPhone Screen?</h2>
            <p className="text-[#7A9E98] mb-6">Same-day repair available. Hyde Park, Johannesburg.</p>
            <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
              <Phone className="w-5 h-5" /> Call {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
