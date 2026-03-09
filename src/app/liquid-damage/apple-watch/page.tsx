import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Apple Watch Water Damage Repair Johannesburg | From R 900 | ZA Support',
  description:
    'Apple Watch water damage repair in Johannesburg from R 900. Series 3 through Ultra 2. Free assessment, No Fix No Fee. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/liquid-damage/apple-watch' },
};

const faqs = [
  {
    question: 'My Apple Watch is water resistant — why did it get damaged?',
    answer: 'Apple Watch water resistance degrades over time. The seals around the Digital Crown and sensors wear with daily use. After a drop or impact, the water resistance may be compromised without any visible external damage. Saltwater, pool chlorine, soap, and shampoo all degrade seals faster than fresh water. Apple recommends resealing Apple Watch water resistance annually.',
  },
  {
    question: 'Which Apple Watch models do you repair?',
    answer: 'Apple Watch Series 3, 4, 5, 6, 7, 8, 9, Ultra, Ultra 2, and all Apple Watch SE models.',
  },
  {
    question: 'What are the symptoms of Apple Watch water damage?',
    answer: 'Common symptoms include: screen not responding to touch, display flickering or showing lines, Digital Crown not functioning correctly, the watch not charging, speaker or microphone failure, and random restarts or power-off. Even subtle symptoms can indicate internal moisture that will worsen over time.',
  },
  {
    question: 'Can the Apple Watch screen be replaced separately from the water damage repair?',
    answer: 'Yes. If the display is damaged during or as a result of the liquid exposure, we can replace the screen as part of the same repair. We will assess all damage at intake and include everything in one quote.',
  },
  {
    question: 'Is it worth repairing an older Apple Watch Series 3 or 4?',
    answer: 'This depends on the extent of damage and your attachment to the device. We will give you an honest assessment — if the repair cost approaches the replacement value of the device, we will say so clearly and let you make an informed decision. For more recent models (Series 6, 7, 8, Ultra), repair is almost always cost-effective.',
  },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Liquid Damage Repair', item: 'https://zasupport.com/liquid-damage' },
    { '@type': 'ListItem', position: 3, name: 'Apple Watch', item: 'https://zasupport.com/liquid-damage/apple-watch' },
  ],
};

export default function AppleWatchWaterDamagePage() {
  return (
    <>
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Liquid Damage Repair', href: '/liquid-damage' }, { label: 'Apple Watch' }]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] leading-tight mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
              Apple Watch Water Damage<br /><span className="text-[#0FEA7A]">Repair Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-6 max-w-3xl leading-relaxed">
              Apple Watch water damage repair from R 900. Series 3 through Ultra 2.
              Free assessment, No Fix No Fee. Hyde Park, Johannesburg.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                Free Assessment <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>Why Apple Watch Water Resistance Fails</h2>
              <p className="text-[#7A9E98] leading-relaxed mb-4">
                Apple Watch is designed to be water resistant, but this resistance is not permanent and degrades with use.
                The seals around the Digital Crown, microphone ports, and sensors wear over time. After swimming, surfing,
                or heavy sweat exposure over months of daily wear, the internal seals no longer provide the same protection.
              </p>
              <p className="text-[#7A9E98] leading-relaxed mb-6">
                Pool chlorine and saltwater are particularly aggressive at degrading these seals. Apple recommends annual
                resealing for Apple Watch to maintain water resistance — but very few users are aware of this service.
              </p>
              <h3 className="text-xl font-bold text-[#E8F4F1] mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>Models We Repair</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Apple Watch Series 3', 'Apple Watch Series 4',
                  'Apple Watch Series 5', 'Apple Watch SE (1st Gen)',
                  'Apple Watch Series 6', 'Apple Watch SE (2nd Gen)',
                  'Apple Watch Series 7', 'Apple Watch Series 8',
                  'Apple Watch Series 9', 'Apple Watch Ultra',
                  'Apple Watch Ultra 2', 'Apple Watch SE (current)',
                ].map((model) => (
                  <div key={model} className="flex items-center gap-2 text-[#7A9E98] text-sm py-1">
                    <span className="text-[#0FEA7A] text-xs">✓</span> {model}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>Pricing</h2>
              <div className="glass-card p-6 mb-6">
                {[
                  { model: 'Apple Watch Series 3–5', price: 'From R 900' },
                  { model: 'Apple Watch SE', price: 'From R 950' },
                  { model: 'Apple Watch Series 6–8', price: 'From R 1,100' },
                  { model: 'Apple Watch Series 9', price: 'From R 1,200' },
                  { model: 'Apple Watch Ultra / Ultra 2', price: 'From R 1,500' },
                  { model: 'Assessment', price: 'Free' },
                ].map((item, i) => (
                  <div key={item.model} className={`flex justify-between py-2.5 ${i < 5 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}>
                    <span className="text-[#7A9E98] text-sm">{item.model}</span>
                    <span className="text-[#0FEA7A] font-bold text-sm">{item.price}</span>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-[rgba(15,234,122,0.05)] rounded-xl border border-[rgba(15,234,122,0.1)]">
                <p className="text-[#7A9E98] text-sm">No Fix No Fee. 12-month warranty on all repairs completed. Apple Watch resealing service also available.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Apple Watch Water Damage — FAQs" />
        </div>
      </section>

      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>Apple Watch Water Damage Repair</h2>
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
