import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, CheckCircle, Shield } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Air Liquid Damage Repair Johannesburg | From R 2,500 | ZA Support',
  description:
    'MacBook Air liquid damage repair in Johannesburg from R 2,500. M1, M2, M3 and Intel models. Free assessment, No Fix No Fee, 12-month warranty. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/liquid-damage/macbook-air' },
};

const faqs = [
  {
    question: 'Is the MacBook Air easier to repair after liquid damage than the MacBook Pro?',
    answer:
      'MacBook Air models have a slightly different internal layout but are broadly similar in repairability to MacBook Pros. The M-series MacBook Airs have unified memory on the logic board, which cannot be replaced separately, making early intervention especially important. Both models benefit significantly from rapid ultrasonic cleaning.',
  },
  {
    question: 'Which MacBook Air models do you repair?',
    answer:
      'All models — Intel MacBook Air (2018, 2019, 2020), M1 MacBook Air (A2337, 2020), M2 MacBook Air (A2681, 2022), and M3 MacBook Air (A3113, A3114, 2024) in both 13" and 15" variants.',
  },
  {
    question: 'My MacBook Air M2 got wet. Is it repairable?',
    answer:
      'Yes, often. The M2 MacBook Air has a well-designed internal layout that makes cleaning and component repair feasible. The SSD and unified memory are on the logic board (not removable), but the board itself can be cleaned and repaired at component level. Bring it in immediately for the best outcome.',
  },
  {
    question: 'How long does MacBook Air liquid damage repair take?',
    answer:
      'Most MacBook Air liquid damage cases are completed within 48–72 hours. The ultrasonic cleaning process takes several hours; the diagnostic and any component repair adds time depending on the extent of damage. We will give you an accurate timeframe after the initial assessment.',
  },
  {
    question: 'What if my data is at risk from the liquid damage?',
    answer:
      'Data recovery is part of our process. If the logic board requires replacement or is beyond repair, we make every effort to recover your data before any destructive work. The MacBook Air\'s SSD is soldered to the logic board in M-series models, so we work carefully to preserve your data throughout the repair process.',
  },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Liquid Damage Repair', item: 'https://zasupport.com/liquid-damage' },
    { '@type': 'ListItem', position: 3, name: 'MacBook Air', item: 'https://zasupport.com/liquid-damage/macbook-air' },
  ],
};

export default function MacBookAirLiquidDamagePage() {
  return (
    <>
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Liquid Damage Repair', href: '/liquid-damage' },
            { label: 'MacBook Air' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
              MacBook Air Liquid Damage
              <br /><span className="text-[#0FEA7A]">Repair Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-6 max-w-3xl leading-relaxed">
              MacBook Air liquid damage repair from R 2,500. M1, M2, M3, and Intel models. Free assessment,
              No Fix No Fee, 12-month warranty. Hyde Park, Johannesburg.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
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
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
                MacBook Air Models We Repair
              </h2>
              <p className="text-[#7A9E98] leading-relaxed mb-6">
                From the slim Intel MacBook Airs of 2018–2020 through to the current M3 models, we service every
                generation. Our engineers understand the specific layout and failure modes of each revision.
              </p>
              <div className="space-y-3">
                {[
                  'MacBook Air 13" (A1932) — 2018 Intel',
                  'MacBook Air 13" (A1932) — 2019 Intel',
                  'MacBook Air 13" (A2179) — 2020 Intel',
                  'MacBook Air 13" M1 (A2337) — 2020',
                  'MacBook Air 13" M2 (A2681) — 2022',
                  'MacBook Air 15" M2 (A2941) — 2023',
                  'MacBook Air 13" M3 (A3113) — 2024',
                  'MacBook Air 15" M3 (A3114) — 2024',
                ].map((model) => (
                  <div key={model} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-[#0FEA7A] flex-shrink-0" />
                    <span className="text-[#7A9E98] text-sm">{model}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>Pricing</h2>
              <div className="glass-card p-6 mb-6">
                {[
                  { label: 'Assessment', price: 'Free', note: 'Always, no obligation' },
                  { label: 'Intel MacBook Air (2018–2020)', price: 'From R 2,500', note: '' },
                  { label: 'MacBook Air M1', price: 'From R 2,800', note: '' },
                  { label: 'MacBook Air M2 / M3', price: 'From R 3,000', note: '' },
                ].map((item, i) => (
                  <div key={item.label} className={`flex justify-between items-center py-3 ${i < 3 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}>
                    <div>
                      <p className="text-[#E8F4F1] text-sm font-medium">{item.label}</p>
                      {item.note && <p className="text-[#7A9E98] text-xs">{item.note}</p>}
                    </div>
                    <span className="text-[#0FEA7A] font-bold text-sm">{item.price}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 p-4 bg-[rgba(15,234,122,0.05)] rounded-xl border border-[rgba(15,234,122,0.1)]">
                <Shield className="w-5 h-5 text-[#0FEA7A] flex-shrink-0" />
                <p className="text-[#7A9E98] text-sm">No Fix No Fee — you pay nothing if we cannot repair your device.</p>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold text-[#E8F4F1] mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>Why Immediate Action Matters</h3>
                <p className="text-[#7A9E98] leading-relaxed text-sm mb-3">
                  MacBook Air devices use Apple Silicon chips where RAM and storage are integrated directly onto the logic board.
                  This means corrosion that reaches these components cannot be addressed through board replacement alone — the
                  entire logic board would need replacement, at significant cost.
                </p>
                <p className="text-[#7A9E98] leading-relaxed text-sm">
                  Early ultrasonic cleaning — before corrosion reaches these components — is the most cost-effective path to recovery.
                  Do not wait. Bring your MacBook Air in immediately after liquid exposure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="MacBook Air Liquid Damage — FAQs" />
        </div>
      </section>

      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>Related</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: 'MacBook Pro Liquid Damage', href: '/liquid-damage/macbook-pro', price: 'From R 3,500' },
              { title: 'Liquid Damage Hub', href: '/liquid-damage', price: 'All Devices' },
              { title: 'Logic Board Repair', href: '/logic-board-repair', price: 'From R 1,800' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>MacBook Air Water Damage? Call Now.</h2>
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
