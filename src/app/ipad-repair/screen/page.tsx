import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT } from '@/lib/constants';
export const metadata: Metadata = {
  title: 'iPad Screen Repair Johannesburg | From R 2,000 | ZA Support',
  description: 'iPad screen repair in Johannesburg from R 2,000. All models. ProMotion and standard LCD. 12-month warranty. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/ipad-repair/screen' },
};
export default function iPadScreenPage() {
  return (
    <>
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'iPad Repair', href: '/ipad-repair' }, { label: 'Screen' }]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] leading-tight mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
              iPad Screen Repair<br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-6">iPad screen repair from R 2,000. All models including iPad Pro M4 ProMotion. 12-month warranty. Hyde Park, Johannesburg.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all"><Phone className="w-5 h-5" /> Call {CONTACT.phone}</a>
              <Link href="/ipad-repair" className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">All iPad Repairs <ArrowRight className="w-5 h-5" /></Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>Pricing by Model</h2>
          <div className="glass-card p-6 max-w-xl">
            {[['iPad (standard)', 'From R 2,000'], ['iPad mini', 'From R 2,200'], ['iPad Air', 'From R 2,500'], ['iPad Pro 11"', 'From R 3,000'], ['iPad Pro 12.9" / 13"', 'From R 3,500']].map(([model, price], i) => (
              <div key={model} className={`flex justify-between py-2.5 ${i < 4 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}>
                <span className="text-[#7A9E98] text-sm">{model}</span>
                <span className="text-[#0FEA7A] font-bold text-sm">{price}</span>
              </div>
            ))}
          </div>
          <p className="text-[#7A9E98] text-xs mt-3">12-month warranty. Apple Pencil compatibility preserved. No Fix No Fee.</p>
        </div>
      </section>
      <section className="py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>Cracked iPad Screen?</h2>
            <p className="text-[#7A9E98] mb-6">Free assessment. Hyde Park, Johannesburg.</p>
            <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all"><Phone className="w-5 h-5" /> Call {CONTACT.phone}</a>
          </div>
        </div>
      </section>
    </>
  );
}
