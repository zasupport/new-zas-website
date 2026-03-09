import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Pro Logic Board Repair Johannesburg | Microsoldering | ZA Support',
  description:
    'MacBook Pro logic board repair in Johannesburg. Expert microsoldering for no-power, USB-C failure, GPU faults. All M-series and Intel models. Free diagnostic. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/logic-board-repair/macbook-pro' },
};

const faqs = [
  {
    question: 'Can you repair M3 Pro and M3 Max MacBook Pro logic boards?',
    answer: 'Yes, with targeted component-level repair. While the M3 SoC itself cannot be replaced at chip level, surrounding components — power management ICs, USB-C controllers, display circuits, and board traces — are fully repairable through microsoldering. Most M3 MacBook Pro failures are in these surrounding components.',
  },
  {
    question: 'My MacBook Pro 16" shows GPU artifacts. Is this repairable?',
    answer: 'On Intel MacBook Pros with discrete GPUs (AMD Radeon), GPU artifacts and display failures are often caused by solder joint failure on the GPU package, which we can address through reballing. On M-series MacBook Pros, GPU functions are integrated into the SoC — different diagnostics apply, but many display-related faults are still repairable.',
  },
  {
    question: 'The Touch Bar on my MacBook Pro is not working. Is this a logic board fault?',
    answer: 'The Touch Bar has its own controller (T1 chip on older models). Touch Bar failure can be caused by the Touch Bar flex cable, the Touch Bar controller, or a fault on the logic board. We diagnose the specific failure point before quoting for repair.',
  },
  {
    question: 'My MacBook Pro stopped charging after the USB-C port got damaged. What is the repair?',
    answer: 'USB-C / Thunderbolt 4 port damage is one of the most common MacBook Pro repairs we perform. The USB-C ports connect to a separate I/O board on many MacBook Pro models, which can be replaced independently. In some cases, the fault is in the Thunderbolt IC on the logic board, which requires microsoldering.',
  },
  {
    question: 'How much does MacBook Pro logic board repair cost?',
    answer: 'The diagnostic is always free. Repair pricing depends on the specific fault: USB-C / I/O board repairs start from R 1,800; power rail and microsoldering repairs from R 2,500; GPU reballing from R 3,500 (Intel models). Full board replacement starts from R 8,000 where repair is not viable.',
  },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Logic Board Repair', item: 'https://zasupport.com/logic-board-repair' },
    { '@type': 'ListItem', position: 3, name: 'MacBook Pro', item: 'https://zasupport.com/logic-board-repair/macbook-pro' },
  ],
};

export default function MacBookProLogicBoardPage() {
  return (
    <>
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Logic Board Repair', href: '/logic-board-repair' },
            { label: 'MacBook Pro' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
              MacBook Pro Logic Board
              <br /><span className="text-[#0FEA7A]">Repair Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-6 max-w-3xl leading-relaxed">
              Expert MacBook Pro logic board repair and microsoldering. All M-series and Intel models.
              Free diagnostic, No Fix No Fee. Hyde Park, Johannesburg.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                Free Diagnostic <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>Common Faults We Repair</h2>
              <div className="space-y-4">
                {[
                  { fault: 'No Power / Dead MacBook Pro', solution: 'Power rail diagnosis, blown fuse replacement, charging IC' },
                  { fault: 'Not Charging (MagSafe / USB-C)', solution: 'I/O board, USB-C controller IC, charging circuit' },
                  { fault: 'Black Screen / No Display', solution: 'GPU, backlight driver, T-Con, display connector' },
                  { fault: 'GPU Artifacts (Intel 15"/16")', solution: 'AMD Radeon GPU reballing or component-level repair' },
                  { fault: 'Liquid Damage', solution: 'Ultrasonic clean, trace repair, component replacement' },
                  { fault: 'Kernel Panic Loop', solution: 'RAM, storage controller, power rail instability diagnosis' },
                  { fault: 'Fan at Max Speed', solution: 'SMC reset, thermal sensor fault, fan controller IC' },
                  { fault: 'Touch Bar Not Working', solution: 'Touch Bar flex, T1/T2 controller, BRDG IC' },
                ].map((item) => (
                  <div key={item.fault} className="flex gap-4 p-4 bg-[rgba(22,34,32,0.5)] rounded-xl border border-[rgba(15,234,122,0.08)] hover:border-[rgba(15,234,122,0.2)] transition-all">
                    <div className="flex-1">
                      <p className="text-[#E8F4F1] font-semibold text-sm">{item.fault}</p>
                      <p className="text-[#7A9E98] text-xs mt-1">{item.solution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>Pricing</h2>
              <div className="glass-card p-6 mb-6">
                {[
                  { item: 'Diagnostic', price: 'Free' },
                  { item: 'USB-C / I/O Board Repair', price: 'From R 1,800' },
                  { item: 'Power Circuit Microsoldering', price: 'From R 2,500' },
                  { item: 'GPU Reballing (Intel)', price: 'From R 3,500' },
                  { item: 'Board Replacement', price: 'From R 8,000' },
                ].map((item, i) => (
                  <div key={item.item} className={`flex justify-between py-3 ${i < 4 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}>
                    <span className="text-[#7A9E98] text-sm">{item.item}</span>
                    <span className="text-[#0FEA7A] font-bold text-sm">{item.price}</span>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-[rgba(15,234,122,0.05)] rounded-xl border border-[rgba(15,234,122,0.1)]">
                <p className="text-[#7A9E98] text-sm">No Fix No Fee. 12-month warranty on all repairs. Free assessment with no obligation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="MacBook Pro Logic Board — FAQs" />
        </div>
      </section>

      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: 'MacBook Air Logic Board', href: '/logic-board-repair/macbook-air', price: 'From R 2,000' },
              { title: 'Logic Board Repair Hub', href: '/logic-board-repair', price: 'All Devices' },
              { title: 'Liquid Damage Repair', href: '/liquid-damage', price: 'From R 2,500' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>MacBook Pro Logic Board Fault?</h2>
            <p className="text-[#7A9E98] mb-6">Free diagnostic. No Fix No Fee. Hyde Park, Johannesburg.</p>
            <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
              <Phone className="w-5 h-5" /> Call {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
