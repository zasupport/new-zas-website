import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, ArrowRight, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Pro 14-inch Logic Board Repair Johannesburg | ZA Support',
  description: 'MacBook Pro 14-inch logic board repair in Johannesburg. M1 Pro/Max (2021), M2 Pro/Max (2023), M3 Pro/Max (2023). No power, charging, display, Thunderbolt faults. Assessment from R599.',
  alternates: { canonical: 'https://zasupport.com/logic-board-repair/macbook-pro-14-inch' },
};

const faults = [
  { fault: 'No Power / Dead MacBook Pro 14-inch', desc: 'The 14-inch MacBook Pro (all generations) charges via both MagSafe 3 and Thunderbolt left-side ports. Power delivery failures typically involve the CD3217 USB-C controller managing power negotiation. With both ports controlled by the same power management IC, a surge affecting this circuit leaves the machine completely unresponsive on all ports.' },
  { fault: 'MagSafe 3 Charging Not Working', desc: 'The MagSafe 3 connector on the 14-inch MacBook Pro is an active charging port with a separate charge controller path. Damage to the MagSafe 3 port — from impacts, tension, or liquid ingress — can disable MagSafe charging while USB-C Thunderbolt charging continues to function, or vice versa.' },
  { fault: 'Black Screen / Mini-LED Backlight Failure', desc: 'The 14-inch MacBook Pro uses a mini-LED ProMotion XDR display requiring a high-voltage backlight driver circuit. Fuse failure or backlight IC damage causes a completely black screen while the Mac continues to run audibly. Connecting an external display confirms the board is functional and the fault is in the backlight circuit.' },
  { fault: 'Thunderbolt 4 / USB-C Port Not Detecting Devices', desc: 'The 14-inch M1 Pro/Max and M2 Pro/Max feature Thunderbolt 4. The M3 Pro/Max 14-inch adds Thunderbolt 5 on Max models. Individual port faults — preventing docking stations, external monitors, or high-speed storage from being detected — are discrete controller IC failures repairable at component level.' },
  { fault: 'Liquid Damage', desc: 'The 14-inch MacBook Pro compact chassis concentrates components tightly. Liquid entering from the keyboard area quickly reaches the Thunderbolt controller and power management ICs. The left I/O cluster is most vulnerable. Ultrasonic cleaning within hours of a spill dramatically improves recovery prospects.' },
  { fault: 'SD Card Slot Not Working', desc: 'The 14-inch MacBook Pro (all M-series generations) includes a full-size SD card slot driven by a discrete SD controller IC. Failure of this IC — from liquid damage or physical damage — prevents all SD cards from being detected. Port-level controller replacement resolves most cases.' },
];

const faqs = [
  { question: 'Can the MacBook Pro 14-inch logic board be repaired?', answer: 'Yes. The 14-inch MacBook Pro uses Apple Silicon SoCs (M1 Pro, M1 Max, M2 Pro, M2 Max, M3 Pro, M3 Max) that are integrated on the logic board and cannot be individually replaced. However, all surrounding circuits — power management, USB-C controllers, Thunderbolt 4/5 controllers, display backlight driver, SD card controller, and audio circuits — are discrete components we repair at component level at ZA Support in Hyde Park, Johannesburg. Assessment from R599.' },
  { question: 'Which MacBook Pro 14-inch generations do you repair?', answer: 'We repair all MacBook Pro 14-inch generations: M1 Pro and M1 Max (2021), M2 Pro and M2 Max (2023, January release), and M3 Pro and M3 Max (2023, November release). All three generations share a similar form factor but have progressively different logic board layouts and connector configurations. Our component-level diagnosis applies to all three.' },
  { question: 'My 14-inch MacBook Pro has no power after a load shedding surge — is it repairable?', answer: 'In the majority of cases yes. Load shedding power surges in South Africa are a leading cause of 14-inch MacBook Pro logic board faults. The surge typically damages the USB-C power controller or the power management IC rather than the Apple Silicon die. These are discrete, repairable components. The R599 assessment confirms the specific damaged circuit and repair viability.' },
  { question: 'How much does MacBook Pro 14-inch logic board repair cost?', answer: 'Apple charges R22,000–R55,000 for logic board replacement on M-series 14-inch MacBook Pros as they replace the entire assembly. ZA Support repairs only the failed component on the existing board, which is a fraction of the Apple Store cost. A written quote is provided after the R599 assessment confirming the exact fault and repair cost.' },
  { question: 'How long does 14-inch MacBook Pro logic board repair take?', answer: 'Following the R599 assessment and your written approval, most 14-inch MacBook Pro logic board repairs are completed within 3–5 business days. We provide a specific timeline in the written quote. Complex liquid damage cases requiring ultrasonic cleaning and component-level assessment may take slightly longer.' },
  { question: 'Will my data be safe during logic board repair?', answer: 'Yes. Component-level board repair does not require erasing, removing, or reformatting the SSD. The storage remains on the board throughout the repair process. If the board is completely non-functional, SSD readability is assessed as part of the R599 diagnostic and reported before any repair work begins.' },
  { question: 'Can you repair a 14-inch MacBook Pro with a faulty Thunderbolt port?', answer: 'Yes. Thunderbolt 4 and Thunderbolt 5 controllers on the 14-inch MacBook Pro are discrete ICs on the logic board. A port that fails to detect docking stations, external monitors, or high-speed storage is typically a controller IC failure, not physical port damage. Component-level repair resolves most cases without board replacement.' },
  { question: 'Does ZA Support collect MacBook Pro 14-inch for repair in Johannesburg?', answer: 'Yes. ZA Support collects from Sandton, Rosebank, Fourways, Bryanston, Midrand, Randburg, and surrounding Johannesburg suburbs. WhatsApp 064 529 5863 to arrange same-day collection.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Pro 14-inch Logic Board Repair Johannesburg',
  description: 'Component-level MacBook Pro 14-inch logic board repair in Johannesburg. M1 Pro/Max, M2 Pro/Max, M3 Pro/Max. Assessment from R599.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: { '@type': 'City', name: 'Johannesburg' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Logic Board Repair', item: 'https://zasupport.com/logic-board-repair' },
    { '@type': 'ListItem', position: 3, name: 'MacBook Pro', item: 'https://zasupport.com/logic-board-repair/macbook-pro' },
    { '@type': 'ListItem', position: 4, name: '14-inch', item: 'https://zasupport.com/logic-board-repair/macbook-pro-14-inch' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function MacBookPro14InchLogicBoardPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Logic Board Repair', href: '/logic-board-repair' },
            { label: 'MacBook Pro', href: '/logic-board-repair/macbook-pro' },
            { label: '14-inch' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Pro 14-inch Logic Board Repair
              <br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Component-level logic board repair for all MacBook Pro 14-inch generations: M1 Pro/Max (2021), M2 Pro/Max (2023), M3 Pro/Max (2023). No power, MagSafe 3 faults, Thunderbolt failures, liquid damage, and ProMotion XDR display faults repaired in Hyde Park, Johannesburg.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>Hyde Park, Johannesburg | Assessment from R599 | Collection from Sandton, Rosebank, Fourways, Bryanston, Midrand, Randburg</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {['Component-Level Repair', 'No Fix No Fee', 'Written Warranty', 'Assessment from R599'].map((l) => (
                <div key={l} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <CheckCircle className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{l}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('LBR-MACBOOKPRO14INCH', 'logic-board')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all" >
                WhatsApp for Quote
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link href="/logic-board-repair" className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all">
                All Logic Board Repair <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro 14-inch Logic Board Faults We Repair</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">The 14-inch MacBook Pro form factor was introduced with the M1 Pro and M1 Max in October 2021 and has continued through M2 and M3 generations. All versions share a compact but dense logic board layout where the Apple Silicon SoC, unified memory, and Neural Engine are integrated. The surrounding power delivery, Thunderbolt, display, and I/O circuits are discrete components we diagnose and repair individually at our Hyde Park workshop.</p>
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
          <FAQAccordion items={faqs} title="MacBook Pro 14-inch Logic Board Repair — Common Questions" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Repairs</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'MacBook Pro M1 Repair', href: '/logic-board-repair/macbook-pro-m1' },
              { label: 'MacBook Pro M2 Repair', href: '/logic-board-repair/macbook-pro-m2' },
              { label: 'MacBook Pro M3 Repair', href: '/logic-board-repair/macbook-pro-m3' },
              { label: 'MacBook Pro 16-inch', href: '/logic-board-repair/macbook-pro-16-inch' },
              { label: 'MacBook Pro 13-inch', href: '/logic-board-repair/macbook-pro-13-inch' },
              { label: 'All MacBook Pro Repair', href: '/logic-board-repair/macbook-pro' },
              { label: 'Logic Board Hub', href: '/logic-board-repair' },
              { label: 'Liquid Damage Repair', href: '/liquid-damage' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">MacBook Pro 14-inch Fault? Assessment from R599.</h2>
            <p className="text-[#7A9E98] mb-6">Collection from Sandton, Rosebank, Fourways, Bryanston, Midrand, and Randburg. No Fix No Fee.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('LBR-MACBOOKPRO14INCH', 'logic-board')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all" >
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
