import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, ArrowRight, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';
import PricingNote from '@/components/PricingNote';

export const metadata: Metadata = {
  title: 'MacBook Air M3 Battery Replacement Johannesburg 2026 | ZA Support',
  description: 'MacBook Air M3 battery replacement in Johannesburg. Service Battery warning, swollen battery, rapid drain. Same-day replacement. From R1,899. No Fix No Fee.',
  alternates: { canonical: 'https://zasupport.com/battery-replacement/macbook-air-m3' },
};

const faults = [
  { fault: 'Service Battery Warning', desc: 'macOS displays "Service Recommended" in the battery menu when the MacBook Air M3 battery health drops below 80% or the cycle count exceeds Apple\'s threshold. The M3 Air uses a 52.6 Wh battery (13-inch) or 66.5 Wh (15-inch) with adhesive pull-tabs. We replace same-day at our Hyde Park workshop with a genuine-spec replacement that restores full health reporting in macOS.' },
  { fault: 'Rapid Battery Drain', desc: 'The MacBook Air M3 is rated for 18 hours of battery life. If yours lasts under 4 hours on light tasks — web browsing, email, documents — the cells are degraded. We see this most commonly after 500+ charge cycles or after extended use during load shedding where the battery was constantly cycled between charge and discharge. Replacement restores the original 18-hour capability.' },
  { fault: 'Swollen / Expanding Battery', desc: 'A swollen battery in the MacBook Air M3 pushes against the trackpad (causing phantom clicks or stiffness) and can warp the bottom case. This is a safety issue — a swollen lithium battery should not be charged or used. We handle swollen battery replacement with proper disposal protocols. Do not ignore trackpad stiffness in an M3 Air — it is almost always a swelling battery.' },
  { fault: 'Not Charging via MagSafe 3', desc: 'The MacBook Air M3 charges via MagSafe 3 and USB-C. If MagSafe 3 charging stops while USB-C still works, the fault is likely the MagSafe charge controller on the logic board — not the battery. If neither charges, the battery\'s charge circuit may have failed. Our R599 assessment distinguishes between battery fault and board fault before any replacement.' },
  { fault: 'Not Charging via USB-C', desc: 'Both USB-C Thunderbolt 3 ports on the M3 Air can charge the machine. Failure to charge via USB-C while MagSafe works points to a USB-C controller fault, not battery. If the battery is not accepting charge from either source, the battery\'s internal protection circuit may have tripped. Diagnosis determines the exact cause before quoting.' },
  { fault: 'Reduced Runtime After macOS Update', desc: 'A macOS update can temporarily increase battery drain as Spotlight re-indexes and background processes run. If poor battery life persists beyond 48 hours after an update, the battery cells themselves may be degraded and the update merely exposed it. We test actual cell capacity — not just the percentage macOS reports — to confirm whether replacement is needed.' },
];

const faqs = [
  { question: 'How much does MacBook Air M3 battery replacement cost?', answer: 'Battery replacement for the MacBook Air M3 starts from R1,899 at our Hyde Park workshop. Apple charges R2,999–R3,499 through their official service. We use genuine-spec batteries that restore full macOS health reporting. Written quote before any work.' },
  { question: 'How long does MacBook Air M3 battery replacement take?', answer: 'Same-day replacement in most cases. The MacBook Air M3 uses adhesive pull-tabs (not glued) which makes the replacement cleaner and faster than older glued-in designs. Drop off in the morning, collect in the afternoon — or we collect and return from Johannesburg suburbs.' },
  { question: 'Will my data be affected by battery replacement?', answer: 'No. Battery replacement does not touch the logic board, SSD, or any data-bearing component. Your files, apps, and settings are untouched. No backup needed — though we always recommend keeping a Time Machine backup.' },
  { question: 'How do I check my MacBook Air M3 battery health?', answer: 'Click the Apple menu > System Settings > Battery > Battery Health. It shows the condition (Normal or Service Recommended) and the maximum capacity percentage. Anything below 80% typically means the battery should be replaced. You can also check cycle count in System Information > Power.' },
  { question: 'Is the MacBook Air M3 13-inch battery the same as the 15-inch?', answer: 'No. The 13-inch MacBook Air M3 has a 52.6 Wh battery, while the 15-inch has a 66.5 Wh battery. They are physically different sizes and not interchangeable. Both are replaced at our workshop — the 15-inch is a slightly longer procedure due to the larger chassis.' },
  { question: 'My MacBook Air M3 trackpad feels stiff — is that the battery?', answer: 'Very likely yes. A swollen battery pushes upward against the trackpad, causing stiffness, reduced travel, or phantom clicks. This is a safety issue. Stop using the machine and bring it in for assessment. We see this regularly and replace same-day.' },
  { question: 'Does load shedding affect MacBook Air M3 battery life?', answer: 'Yes. Repeated charge-discharge cycles during load shedding accelerate battery degradation. A MacBook Air M3 used through daily load shedding cycles will reach the 80% health threshold significantly faster than one on stable power. Surge protectors protect the charger but do not prevent cycle-related battery wear.' },
  { question: 'Do you collect from Johannesburg suburbs for battery replacement?', answer: 'Yes. Same-day collection from Sandton, Rosebank, Fourways, Bryanston, Midrand, Randburg, Parktown North, Greenside, and surrounding areas. WhatsApp 064 529 5863 to arrange.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Air M3 Battery Replacement Johannesburg',
  description: 'MacBook Air M3 battery replacement in Johannesburg. Same-day service. From R1,899. Genuine-spec batteries.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: { '@type': 'City', name: 'Johannesburg' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Battery Replacement', item: 'https://zasupport.com/battery-replacement' },
    { '@type': 'ListItem', position: 3, name: 'MacBook Air', item: 'https://zasupport.com/battery-replacement/macbook-air' },
    { '@type': 'ListItem', position: 4, name: 'M3', item: 'https://zasupport.com/battery-replacement/macbook-air-m3' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function MacBookAirM3BatteryPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Battery Replacement', href: '/battery-replacement' },
            { label: 'MacBook Air', href: '/battery-replacement/macbook-air' },
            { label: 'M3' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Air M3 Battery Replacement
              <br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Same-day MacBook Air M3 battery replacement at our Hyde Park workshop. Service Battery warning, swollen battery, rapid drain, and charging faults. The M3 Air uses adhesive pull-tab batteries — a clean, fast replacement. From R1,899 with written warranty.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>Hyde Park, Johannesburg | From R1,899 | Same-day replacement | Collection from Sandton, Rosebank, Fourways</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {['Same-Day Replacement', 'Genuine-Spec Battery', 'Written Warranty', 'From R1,899'].map((l) => (
                <div key={l} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <CheckCircle className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{l}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('BAT-MACBOOKAIRM3', 'battery')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
                WhatsApp for Quote
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link href="/battery-replacement" className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all">
                All Battery Replacement <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">MacBook Air M3 Battery Faults We Fix</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">The MacBook Air M3 (2024) uses a 52.6 Wh (13-inch) or 66.5 Wh (15-inch) lithium-polymer battery with adhesive pull-tabs for cleaner removal. South African load shedding accelerates battery degradation through constant charge-discharge cycling. We test actual cell capacity, not just the macOS percentage, to confirm whether replacement is warranted.</p>
          <div className="space-y-4">
            {faults.map((f) => (
              <div key={f.fault} className="glass-card p-5">
                <h3 className="text-[#E8F4F1] font-bold mb-2">{f.fault}</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="MacBook Air M3 Battery Replacement — Common Questions" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Repairs</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'MacBook Air M2 Battery', href: '/battery-replacement/macbook-air-m2' },
              { label: 'MacBook Air M1 Battery', href: '/battery-replacement/macbook-air-m1' },
              { label: 'MacBook Pro M3 Battery', href: '/battery-replacement/macbook-pro-m3' },
              { label: 'MacBook Air M3 Logic Board', href: '/logic-board-repair/macbook-air-m3' },
              { label: 'Battery Hub', href: '/battery-replacement' },
              { label: 'Logic Board Repair', href: '/logic-board-repair' },
              { label: 'Screen Repair', href: '/screen-repair' },
              { label: 'Sandton Battery', href: '/battery-replacement/sandton' },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="glass-card p-4 text-center group">
                <span className="text-[#E8F4F1] text-sm font-semibold group-hover:text-[#0FEA7A] transition-colors">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">MacBook Air M3 Battery Failing? From R1,899.</h2>
            <p className="text-[#7A9E98] mb-6">Same-day replacement. Written warranty. Collection from Johannesburg suburbs.</p>
            <PricingNote variant="inline" />
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <a href={buildWhatsAppUrl('BAT-MACBOOKAIRM3', 'battery')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
                WhatsApp for Quote
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
