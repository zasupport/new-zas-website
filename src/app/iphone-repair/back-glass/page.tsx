import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'iPhone Back Glass Repair Johannesburg | From R 1,200 | ZA Support',
  description: 'iPhone back glass repair in Johannesburg from R 1,200. iPhone 8 through 16 Pro Max. 12-month warranty. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/iphone-repair/back-glass' },
};

export default function iPhoneBackGlassPage() {
  return (
    <>
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'iPhone Repair', href: '/iphone-repair' }, { label: 'Back Glass' }]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] leading-tight mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
              iPhone Back Glass<br /><span className="text-[#0FEA7A]">Repair Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-6">Back glass repair from R 1,200. iPhone 8 through 16 Pro Max. 12-month warranty. Hyde Park, Johannesburg.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link href="/iphone-repair" className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                All iPhone Repairs <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>Why Repair the Back Glass?</h2>
              <p className="text-[#7A9E98] leading-relaxed mb-4">A cracked iPhone back glass is more than cosmetic. Sharp glass edges can cut your hand. Cracked back glass compromises the structural integrity of the chassis and exposes the device to moisture ingress. Repair is recommended before further damage occurs.</p>
              <p className="text-[#7A9E98] leading-relaxed mb-6">On iPhone models with wireless charging, back glass cracks can also interfere with Qi charging performance.</p>
              <div className="glass-card p-6">
                {[['iPhone 8 / SE 2nd/3rd Gen', 'From R 1,200'], ['iPhone X / XR / XS', 'From R 1,400'], ['iPhone 11 / 12 Series', 'From R 1,600'], ['iPhone 13 / 14 Series', 'From R 1,800'], ['iPhone 15 / 16 Series', 'From R 2,000']].map(([model, price], i) => (
                  <div key={model} className={`flex justify-between py-2.5 ${i < 4 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}>
                    <span className="text-[#7A9E98] text-sm">{model}</span>
                    <span className="text-[#0FEA7A] font-bold text-sm">{price}</span>
                  </div>
                ))}
              </div>
              <p className="text-[#7A9E98] text-xs mt-3">12-month warranty. No Fix No Fee.</p>
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>Our Back Glass Process</h2>
              {['Full chassis disassembly', 'Heated removal of shattered glass panels', 'New OEM-quality glass fitted', 'Wireless charging coil inspected and tested', 'Full camera system tested post-repair', 'MagSafe alignment verified (iPhone 12+)', 'IP68 re-seal where applicable', '12-month warranty issued'].map((step, i) => (
                <div key={step} className="flex items-start gap-3 py-2.5 border-b border-[rgba(255,255,255,0.04)]">
                  <span className="w-6 h-6 bg-[rgba(15,234,122,0.1)] rounded-full flex items-center justify-center text-[#0FEA7A] text-xs font-bold flex-shrink-0">{i+1}</span>
                  <span className="text-[#7A9E98] text-sm">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>Cracked iPhone Back?</h2>
            <p className="text-[#7A9E98] mb-6">From R 1,200. Hyde Park, Johannesburg.</p>
            <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
              <Phone className="w-5 h-5" /> Call {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
