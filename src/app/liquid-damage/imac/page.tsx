import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Shield } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'iMac Water Damage Repair Johannesburg | ZA Support',
  description:
    'iMac water damage repair in Johannesburg. 21.5" and 27" models, M1, M3, and Intel. Assessment: from R599. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/liquid-damage/imac' },
};

const faqs = [
  {
    question: 'How does an iMac get liquid damaged?',
    answer: 'The most common causes are drinks spilled onto the keyboard that run underneath the iMac, ceiling leaks or sprinkler activations in office environments, and cleaning products sprayed near the display. The iMac\'s ventilation slots are at the bottom of the display panel, which makes it vulnerable to liquid seeping in from above or below.',
  },
  {
    question: 'Which iMac models do you repair?',
    answer: 'iMac 21.5" (2017–2019 Intel), iMac 27" (2017–2020 Intel), iMac 24" M1 (A2438, 2021), and iMac 24" M3 (A2873, 2023). We also repair older Intel iMacs from 2014–2016 where parts availability allows.',
  },
  {
    question: 'Is iMac liquid damage repair cost-effective?',
    answer: 'For M1 and M3 iMacs, repair is almost always significantly cheaper than replacement given the high cost of new machines. Even for older Intel iMacs, repair can be cost-effective if the logic board is salvageable. We will give you an honest assessment and quote before any work begins.',
  },
  {
    question: 'Will my data be safe during the repair?',
    answer: 'Data preservation is our priority. The iMac\'s SSD (soldered on M-series models) is handled carefully throughout the repair process. If the logic board requires replacement, we discuss data recovery options before proceeding. We recommend maintaining a Time Machine backup as standard practice.',
  },
  {
    question: 'How do I bring in an iMac for repair?',
    answer: 'We can collect larger items from the Hyde Park area. Alternatively, you can bring the iMac to our workshop. We recommend packaging the original box if available. Call us first and we will advise on the best option for your location.',
  },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Liquid Damage Repair', item: 'https://zasupport.com/liquid-damage' },
    { '@type': 'ListItem', position: 3, name: 'iMac', item: 'https://zasupport.com/liquid-damage/imac' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function iMacWaterDamagePage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Liquid Damage Repair', href: '/liquid-damage' }, { label: 'iMac' }]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              iMac Water Damage<br /><span className="text-[#0FEA7A]">Repair Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-6 max-w-3xl leading-relaxed">
              iMac water damage repair. 21.5&quot;, 24&quot;, and 27&quot; models, M1, M3, and Intel.
              Assessment: from R599. Hyde Park, Johannesburg.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all" target="_blank" rel="noopener noreferrer">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                Book Assessment <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">iMac Liquid Damage: What We See</h2>
              <p className="text-[#7A9E98] leading-relaxed mb-4">
                iMac liquid damage is most often caused by drinks spilled near the base of the display, where the ventilation
                slots draw air, and liquid, into the chassis. Office water leaks and cleaning accidents account for a significant
                number of iMac liquid damage cases we see in Johannesburg each year.
              </p>
              <p className="text-[#7A9E98] leading-relaxed mb-6">
                The iMac&apos;s all-in-one design means the logic board, power supply, display, and storage are all in the same
                chassis. Liquid can affect any or all of these components depending on where it enters and how much was involved.
              </p>
              <div className="space-y-3">
                {[
                  { model: 'iMac 21.5" (2017–2019)', desc: 'Intel Core i5/i7. Logic board, power supply, RAM, SSD/Fusion Drive all accessible.' },
                  { model: 'iMac 27" (2017–2020)', desc: 'Intel Core i5/i7/i9. Includes Radeon graphics. Larger logic board surface area.' },
                  { model: 'iMac 24" M1 (2021)', desc: 'Apple Silicon. Compact redesign. Logic board contains CPU, GPU, RAM, SSD.' },
                  { model: 'iMac 24" M3 (2023)', desc: 'Latest generation. Most cost-effective to repair given high replacement cost.' },
                ].map((item) => (
                  <div key={item.model} className="glass-card p-4">
                    <p className="text-[#E8F4F1] font-semibold text-sm mb-1">{item.model}</p>
                    <p className="text-[#7A9E98] text-xs">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">Assessment &amp; Warranty</h2>
              <div className="flex items-center gap-3 p-4 bg-[rgba(15,234,122,0.05)] rounded-xl border border-[rgba(15,234,122,0.1)]">
                <Shield className="w-5 h-5 text-[#0FEA7A] flex-shrink-0" />
                <p className="text-[#7A9E98] text-sm">Assessment: from R599. up-to-3 year warranty. Collection available in Hyde Park area.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="iMac Water Damage, FAQs" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">iMac Water Damage Repair</h2>
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
