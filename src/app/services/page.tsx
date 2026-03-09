import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight } from 'lucide-react';
import { CONTACT, REPAIR_PRICES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Services & Pricing | ZA Support — Apple Repair Johannesburg',
  description:
    'Full pricing for all ZA Support services. Liquid damage, logic board, iPhone, iPad repair, JAMF MDM, managed IT services. Hyde Park, Johannesburg.',
  alternates: { canonical: 'https://zasupport.com/services' },
};

export default function ServicesPage() {
  return (
    <>
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            Services &amp; <span className="text-[#0FEA7A]">Pricing</span>
          </h1>
          <p className="text-xl text-[#7A9E98] max-w-2xl">
            Transparent pricing on every service. All assessments are free. No Fix No Fee on all repairs.
            12-month warranty on all work.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Liquid Damage */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-extrabold text-[#E8F4F1]" style={{ fontFamily: 'Syne, sans-serif' }}>Liquid Damage Repair</h2>
              <Link href="/liquid-damage" className="text-[#0FEA7A] text-sm hover:underline flex items-center gap-1">View full page <ArrowRight className="w-3 h-3" /></Link>
            </div>
            <div className="glass-card overflow-hidden p-0">
              {Object.entries(REPAIR_PRICES.liquidDamage).map(([device, price], i) => {
                const labels: Record<string, string> = { macbookAir: 'MacBook Air', macbookPro: 'MacBook Pro', iphone: 'iPhone', ipad: 'iPad', appleWatch: 'Apple Watch', imac: 'iMac' };
                return (
                  <div key={device} className={`flex justify-between items-center p-4 ${i < 5 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}>
                    <span className="text-[#7A9E98]">{labels[device]}</span>
                    <span className="text-[#0FEA7A] font-bold">{price}+</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Logic Board */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-extrabold text-[#E8F4F1]" style={{ fontFamily: 'Syne, sans-serif' }}>Logic Board / Microsoldering</h2>
              <Link href="/logic-board-repair" className="text-[#0FEA7A] text-sm hover:underline flex items-center gap-1">View full page <ArrowRight className="w-3 h-3" /></Link>
            </div>
            <div className="glass-card overflow-hidden p-0">
              {[
                ['Diagnostic Assessment', 'Free'],
                ['USB-C / Thunderbolt Repair', 'From R 1,800'],
                ['Power Circuit Microsoldering', 'From R 2,000'],
                ['Component-Level Microsoldering', 'From R 2,500'],
                ['GPU Reballing (Intel Mac)', 'From R 3,500'],
                ['Logic Board Replacement', 'From R 8,000'],
              ].map(([item, price], i) => (
                <div key={item} className={`flex justify-between items-center p-4 ${i < 5 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}>
                  <span className="text-[#7A9E98]">{item}</span>
                  <span className="text-[#0FEA7A] font-bold">{price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* iPhone */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-extrabold text-[#E8F4F1]" style={{ fontFamily: 'Syne, sans-serif' }}>iPhone Repair</h2>
              <Link href="/iphone-repair" className="text-[#0FEA7A] text-sm hover:underline flex items-center gap-1">View full page <ArrowRight className="w-3 h-3" /></Link>
            </div>
            <div className="glass-card overflow-hidden p-0">
              {[
                ['Screen Replacement', 'From R 1,500'],
                ['Battery Replacement', 'From R 950'],
                ['Liquid Damage', 'From R 1,200'],
                ['Charging Port', 'From R 750'],
                ['Back Glass', 'From R 1,200'],
                ['Camera Repair', 'From R 1,800'],
              ].map(([item, price], i) => (
                <div key={item} className={`flex justify-between items-center p-4 ${i < 5 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}>
                  <span className="text-[#7A9E98]">{item}</span>
                  <span className="text-[#0FEA7A] font-bold">{price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Business Services */}
          <div>
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>Business & Managed Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-[#E8F4F1] font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>JAMF MDM</h3>
                  <Link href="/jamf-mdm" className="text-[#0FEA7A] text-xs hover:underline">Details →</Link>
                </div>
                {[['Starter (≤25 devices)', 'R 4,500/month'], ['Business (25–100 devices)', 'R 8,500/month'], ['Enterprise', 'Custom']].map(([tier, price], i) => (
                  <div key={tier} className={`flex justify-between py-2.5 ${i < 2 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}>
                    <span className="text-[#7A9E98] text-sm">{tier}</span>
                    <span className="text-[#0FEA7A] font-bold text-sm">{price}</span>
                  </div>
                ))}
              </div>
              <div className="glass-card p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-[#E8F4F1] font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>Managed IT Services</h3>
                  <Link href="/managed-services" className="text-[#0FEA7A] text-xs hover:underline">Details →</Link>
                </div>
                {[['Starter', 'R 4,500/month'], ['Business', 'R 8,500/month'], ['Enterprise', 'Custom']].map(([tier, price], i) => (
                  <div key={tier} className={`flex justify-between py-2.5 ${i < 2 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}>
                    <span className="text-[#7A9E98] text-sm">{tier}</span>
                    <span className="text-[#0FEA7A] font-bold text-sm">{price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>Free Assessment — No Obligation</h2>
            <p className="text-[#7A9E98] mb-6">Bring your device in. We assess, quote honestly, and fix it fast.</p>
            <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
              <Phone className="w-5 h-5" /> Call {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
