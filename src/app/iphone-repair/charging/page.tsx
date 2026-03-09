import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'iPhone Charging Port Repair Johannesburg | From R 750 | ZA Support',
  description: 'iPhone charging port repair in Johannesburg from R 750. Lightning and USB-C. All models. 12-month warranty. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/iphone-repair/charging' },
};

export default function iPhoneChargingPage() {
  return (
    <>
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'iPhone Repair', href: '/iphone-repair' }, { label: 'Charging Port' }]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] leading-tight mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
              iPhone Charging Port<br /><span className="text-[#0FEA7A]">Repair Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-6">Lightning and USB-C port repair from R 750. All models. 12-month warranty. Hyde Park, Johannesburg.</p>
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
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>Charging Port Faults We Repair</h2>
              {['iPhone not charging when plugged in', 'Cable falls out of port', 'Charging cable does not seat properly', 'Lint / debris stuck in port', 'Intermittent charging only', 'No data sync via cable', 'Bent or damaged Lightning / USB-C pins', 'Port corroded after liquid exposure'].map((item) => (
                <div key={item} className="flex items-center gap-3 py-2 border-b border-[rgba(255,255,255,0.04)]">
                  <span className="text-[#0FEA7A] text-sm">✓</span>
                  <span className="text-[#7A9E98] text-sm">{item}</span>
                </div>
              ))}
              <div className="mt-6 p-4 bg-[rgba(15,234,122,0.05)] rounded-xl border border-[rgba(15,234,122,0.1)]">
                <p className="text-[#E8F4F1] font-semibold text-sm mb-1">Before booking: try this first</p>
                <p className="text-[#7A9E98] text-sm">Compressed air can dislodge lint that is preventing good contact. If that does not resolve the issue, bring the phone in — the fix is usually quick and affordable.</p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>Pricing</h2>
              <div className="glass-card p-6 mb-4">
                {[['Lightning Port (iPhone 8–14)', 'From R 750'], ['USB-C Port (iPhone 15/16)', 'From R 850'], ['Charging Board Replacement', 'From R 900'], ['Assessment', 'Free']].map(([model, price], i) => (
                  <div key={model} className={`flex justify-between py-3 ${i < 3 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}>
                    <span className="text-[#7A9E98] text-sm">{model}</span>
                    <span className="text-[#0FEA7A] font-bold text-sm">{price}</span>
                  </div>
                ))}
              </div>
              <p className="text-[#7A9E98] text-xs">12-month warranty. No Fix No Fee.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>iPhone Not Charging?</h2>
            <p className="text-[#7A9E98] mb-6">From R 750. Done fast. Hyde Park, Johannesburg.</p>
            <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
              <Phone className="w-5 h-5" /> Call {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
