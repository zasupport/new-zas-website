import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQ';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'iPhone Battery Replacement Johannesburg | From R 950 | ZA Support',
  description: 'iPhone battery replacement in Johannesburg from R 950. All models. Restore full battery health. 12-month warranty. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/iphone-repair/battery' },
};

const faqs = [
  { question: 'How do I know if my iPhone battery needs replacing?', answer: 'Check Settings > Battery > Battery Health. If health is below 80%, Apple recommends replacement. Signs include sudden shutdowns, battery percentage dropping quickly, iPhone throttling performance, or very slow charging.' },
  { question: 'How long does battery replacement take?', answer: 'iPhone battery replacement takes approximately 45–60 minutes for most models. We keep stock of batteries for all current models.' },
  { question: 'Will battery replacement reset my iPhone?', answer: 'No. Battery replacement is a hardware-only repair. Your data, settings, and apps are completely unaffected.' },
  { question: 'What battery health percentage do you guarantee after replacement?', answer: 'New replacement batteries show 100% battery health in iOS Settings. We use high-quality replacement batteries that match or exceed original capacity.' },
  { question: 'Do you replace batteries for older iPhones?', answer: 'Yes, for models where parts are available. We stock batteries for iPhone 8 through iPhone 16 Pro Max. Call to confirm for older models.' },
];

export default function iPhoneBatteryPage() {
  return (
    <>
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'iPhone Repair', href: '/iphone-repair' }, { label: 'Battery' }]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] leading-tight mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
              iPhone Battery<br /><span className="text-[#0FEA7A]">Replacement Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-6">Battery replacement from R 950. 12-month warranty. Hyde Park, Johannesburg.</p>
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
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>Signs Your Battery Needs Replacing</h2>
              {['Battery health below 80% in Settings', 'iPhone shuts off with battery remaining', 'Battery drains within a few hours', 'Phone running very hot during use', 'Performance throttled by iOS', 'Very slow charging time', 'Battery percentage jumps unexpectedly', 'iPhone freezes when unplugged'].map((item) => (
                <div key={item} className="flex items-center gap-3 py-2 border-b border-[rgba(255,255,255,0.04)]">
                  <span className="text-[#0FEA7A] text-sm">✓</span>
                  <span className="text-[#7A9E98] text-sm">{item}</span>
                </div>
              ))}
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>Pricing</h2>
              <div className="glass-card p-6">
                {[['iPhone 8 / SE', 'R 950'], ['iPhone X / XR / XS', 'R 1,000'], ['iPhone 11 Series', 'R 1,000'], ['iPhone 12 Series', 'R 1,100'], ['iPhone 13 Series', 'R 1,100'], ['iPhone 14 / 15 / 16', 'R 1,200']].map(([model, price], i) => (
                  <div key={model} className={`flex justify-between py-2.5 ${i < 5 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}>
                    <span className="text-[#7A9E98] text-sm">{model}</span>
                    <span className="text-[#0FEA7A] font-bold text-sm">{price}</span>
                  </div>
                ))}
              </div>
              <p className="text-[#7A9E98] text-xs mt-3">12-month warranty. Completed in under 1 hour.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="iPhone Battery — FAQs" />
        </div>
      </section>

      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>iPhone Battery Dying?</h2>
            <p className="text-[#7A9E98] mb-6">R 950 fix. Done in under 1 hour. Hyde Park, Johannesburg.</p>
            <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
              <Phone className="w-5 h-5" /> Call {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
