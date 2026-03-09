import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT } from '@/lib/constants';
export const metadata: Metadata = {
  title: 'iPad Battery Replacement Johannesburg | From R 1,200 | ZA Support',
  description: 'iPad battery replacement in Johannesburg from R 1,200. All models. Restore full battery life. 12-month warranty. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/ipad-repair/battery' },
};
export default function iPadBatteryPage() {
  return (
    <>
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'iPad Repair', href: '/ipad-repair' }, { label: 'Battery' }]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] leading-tight mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
              iPad Battery<br /><span className="text-[#0FEA7A]">Replacement Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-6">iPad battery replacement from R 1,200. All models. Restore full-day battery life. Hyde Park, Johannesburg.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all"><Phone className="w-5 h-5" /> Call {CONTACT.phone}</a>
              <Link href="/ipad-repair" className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">All iPad Repairs <ArrowRight className="w-5 h-5" /></Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-6 max-w-xl">
            {[['iPad (standard)', 'From R 1,200'], ['iPad mini', 'From R 1,300'], ['iPad Air', 'From R 1,400'], ['iPad Pro 11"', 'From R 1,600'], ['iPad Pro 12.9" / 13"', 'From R 1,800']].map(([model, price], i) => (
              <div key={model} className={`flex justify-between py-2.5 ${i < 4 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}>
                <span className="text-[#7A9E98] text-sm">{model}</span>
                <span className="text-[#0FEA7A] font-bold text-sm">{price}</span>
              </div>
            ))}
          </div>
          <p className="text-[#7A9E98] text-xs mt-3">12-month warranty. No Fix No Fee.</p>
        </div>
      </section>
      <section className="py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>iPad Battery Dying?</h2>
            <p className="text-[#7A9E98] mb-6">From R 1,200. Hyde Park, Johannesburg.</p>
            <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all"><Phone className="w-5 h-5" /> Call {CONTACT.phone}</a>
          </div>
        </div>
      </section>
    </>
  );
}
