import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, ArrowRight, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Pro 16-inch Logic Board Repair Johannesburg | ZA Support',
  description: 'MacBook Pro 16-inch logic board repair in Johannesburg. Intel 2019-2021, M1 Pro/Max 2021, M2 Pro/Max 2023, M3 Pro/Max 2023. No power, GPU, display, liquid damage. Assessment from R599.',
  alternates: { canonical: 'https://zasupport.com/logic-board-repair/macbook-pro-16-inch' },
};

const faults = [
  { fault: 'No Power / Dead MacBook Pro 16-inch', desc: 'The 16-inch MacBook Pro across Intel and Apple Silicon generations uses a multi-rail power architecture. In Intel models (2019-2021), the ISL9241 or ISL6259 charge controller manages USB-C power delivery. In M-series models, the CD3217B controller handles MagSafe 3 and Thunderbolt power negotiation. Load shedding surges targeting either generation typically damage this controller first.' },
  { fault: 'GPU / Graphics Fault (Intel 16-inch)', desc: 'The Intel MacBook Pro 16-inch (2019 and 2021) includes a discrete AMD Radeon GPU in addition to the Intel integrated graphics. GPU faults present as artifacts, random display corruption, kernel panics, or failure to switch to discrete graphics under load. The AMD GPU is integrated on the logic board and requires component-level reflow or replacement of the GPU vRAM ICs in some cases.' },
  { fault: 'USB-C / Thunderbolt 3 / Thunderbolt 4 Port Failure', desc: 'Intel 16-inch models use Thunderbolt 3. M1 and M2 16-inch models use Thunderbolt 4. M3 Max 16-inch adds Thunderbolt 5. Each generation has discrete Thunderbolt controller ICs on the logic board. A port that fails to detect external displays, docking stations, or high-speed storage is typically a controller failure rather than physical port damage.' },
  { fault: 'Black Screen / Backlight Failure', desc: 'The 16-inch MacBook Pro ProMotion XDR display uses a mini-LED backlight array requiring a high-voltage TCON and backlight driver circuit. A blown fuse or failed backlight IC causes a black screen while the Mac continues to operate. Connecting an external monitor distinguishes backlight failure from logic board failure.' },
  { fault: 'Liquid Damage', desc: 'The 16-inch MacBook Pro is frequently brought in after liquid spills. The larger chassis provides more area for liquid to spread before reaching the logic board, but the keyboard tray directs liquid down toward the left I/O cluster on both Intel and M-series models. The GPU area is particularly sensitive on Intel models.' },
  { fault: 'Fan Failure / Thermal Runaway', desc: 'Both Intel and M-series 16-inch MacBook Pros use dual active cooling fans. Fan controller circuits, thermal sensor ICs, and SMC firmware govern fan speed. A failed thermal sensor causes fans to run at maximum continuously. On Intel models, GPU thermal sensors are additional failure points not present in M-series machines.' },
];

const faqs = [
  { question: 'Can a MacBook Pro 16-inch logic board be repaired?', answer: 'Yes. All MacBook Pro 16-inch generations are repairable at component level. On Intel models (2019-2021), the discrete AMD GPU, Thunderbolt 3 controllers, and Intel power management circuits are individually addressable. On M-series models (M1 Pro/Max 2021, M2 Pro/Max 2023, M3 Pro/Max 2023), the Apple Silicon SoC is integrated but all surrounding power, display, and I/O circuits are discrete. ZA Support in Hyde Park, Johannesburg assesses from R599.' },
  { question: 'Is the Intel 16-inch MacBook Pro harder to repair than M-series?', answer: 'Intel 16-inch MacBook Pros have additional complexity from the discrete AMD GPU, Thunderbolt 3 controller, and Intel power management IC layer. GPU faults are unique to Intel models. However, the broader power delivery and I/O circuits follow similar repair approaches across generations. Both are component-level repairable at ZA Support.' },
  { question: 'Can you repair the AMD GPU in the 2019 MacBook Pro 16-inch?', answer: 'Yes. GPU faults on the Intel 16-inch MacBook Pro — including display artifacts, random shutdowns under GPU load, failure to switch to discrete graphics, and kernel panics — are addressable at component level. The AMD vRAM ICs and GPU power delivery circuits are discrete components on the logic board. Assessment from R599 confirms the specific GPU fault and repair viability.' },
  { question: 'My 16-inch MacBook Pro was damaged in a load shedding surge — what are the chances of repair?', answer: 'High. Load shedding power surges in South Africa are one of the most common causes of 16-inch MacBook Pro logic board faults we see in our Hyde Park workshop. Surges typically damage the USB-C or MagSafe 3 power controller rather than the SoC or GPU die. These are discrete, repairable ICs. The R599 assessment confirms the fault and repair likelihood before any commitment.' },
  { question: 'How much does 16-inch MacBook Pro logic board repair cost?', answer: 'Apple charges R25,000–R70,000 for a logic board replacement on 16-inch MacBook Pro models. ZA Support replaces only the failed component on the existing board at a fraction of that cost. A written quote is provided after the R599 assessment with the exact repair cost before any work proceeds.' },
  { question: 'How long does 16-inch MacBook Pro logic board repair take?', answer: 'After the R599 assessment and your written approval, most 16-inch MacBook Pro logic board repairs complete within 3–5 business days. GPU repairs on Intel models and complex liquid damage cases may require additional time. We provide a specific timeline in the written quote.' },
  { question: 'Will my data be safe during 16-inch MacBook Pro board repair?', answer: 'Yes. Component-level board repair does not require touching the SSD. On Apple Silicon models, the SSD remains on the board throughout. On Intel models, the SSD is a replaceable module that stays installed during board repair. If the board is completely dead, SSD readability is assessed as part of the R599 diagnostic.' },
  { question: 'Does ZA Support collect 16-inch MacBook Pro for repair in Johannesburg?', answer: 'Yes. We collect from Sandton, Rosebank, Fourways, Bryanston, Midrand, Randburg, and surrounding Johannesburg suburbs. WhatsApp 064 529 5863 to arrange same-day collection. We handle the 16-inch chassis carefully given its size and weight.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Pro 16-inch Logic Board Repair Johannesburg',
  description: 'Component-level MacBook Pro 16-inch logic board repair in Johannesburg. Intel, M1 Pro/Max, M2 Pro/Max, M3 Pro/Max. Assessment from R599.',
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
    { '@type': 'ListItem', position: 4, name: '16-inch', item: 'https://zasupport.com/logic-board-repair/macbook-pro-16-inch' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function MacBookPro16InchLogicBoardPage() {
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
            { label: '16-inch' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Pro 16-inch Logic Board Repair
              <br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Component-level repair for MacBook Pro 16-inch: Intel 2019-2021 (including AMD GPU faults), M1 Pro/Max (2021), M2 Pro/Max (2023), M3 Pro/Max (2023). No power, GPU, display, Thunderbolt, and liquid damage repaired in Hyde Park, Johannesburg.
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
              <a href={buildWhatsAppUrl('LBR-MACBOOKPRO16INCH', 'logic-board')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all" >
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
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro 16-inch Logic Board Faults We Repair</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">The 16-inch MacBook Pro spans the transition from Intel to Apple Silicon. Intel models (2019-2021) feature discrete AMD Radeon GPUs with additional fault modes unique to that architecture. M-series models (M1 Pro/Max, M2 Pro/Max, M3 Pro/Max) integrate the SoC but retain discrete Thunderbolt controllers, power management ICs, and display circuits that are all individually repairable. We handle every generation in our Hyde Park, Johannesburg workshop.</p>
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
          <FAQAccordion items={faqs} title="MacBook Pro 16-inch Logic Board Repair — Common Questions" />
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
              { label: 'MacBook Pro 14-inch', href: '/logic-board-repair/macbook-pro-14-inch' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">MacBook Pro 16-inch Fault? Assessment from R599.</h2>
            <p className="text-[#7A9E98] mb-6">Collection from Sandton, Rosebank, Fourways, Bryanston, Midrand, and Randburg. No Fix No Fee.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('LBR-MACBOOKPRO16INCH', 'logic-board')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all" >
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
