import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, ArrowRight, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Pro 13-inch Logic Board Repair Johannesburg | ZA Support',
  description: 'MacBook Pro 13-inch logic board repair in Johannesburg. Intel 2016-2020, M1 2020, M2 2022. Butterfly keyboard, USB-C faults, no power, T2 chip, liquid damage. Assessment from R599.',
  alternates: { canonical: 'https://zasupport.com/logic-board-repair/macbook-pro-13-inch' },
};

const faults = [
  { fault: 'No Power / Dead MacBook Pro 13-inch', desc: 'The 13-inch MacBook Pro spans Intel (2016-2020) and Apple Silicon (M1 2020, M2 2022) generations, each with distinct power delivery architectures. Intel models use the ISL9241 charge controller; M1 and M2 models use the CD3217B USB-C controller. Surge damage from load shedding most commonly affects the charge controller first, preventing the machine from powering on via any port.' },
  { fault: 'USB-C Charging Not Working', desc: 'The 13-inch MacBook Pro charges exclusively via USB-C on all generations from 2016 onwards — there is no MagSafe port until the M2 (2022) model which retains USB-C. Port damage, controller IC failure, or charge line shorts prevent charging on individual ports or all ports simultaneously. Diagnosis determines whether the fault is port-level or controller-level.' },
  { fault: 'T2 Chip Fault (Intel 2019-2020)', desc: 'The Intel MacBook Pro 13-inch (2019 and 2020) includes an Apple T2 security chip managing Touch ID, secure boot, encrypted storage, and the system management controller. T2 faults present as Touch ID failure, inability to boot, kernel panics, or FileVault unlock failures. The T2 is a discrete IC on the logic board and is repairable in most scenarios.' },
  { fault: 'Butterfly Keyboard Failure (Intel 2016-2019)', desc: 'The Intel 13-inch MacBook Pro 2016-2019 uses Apple\'s butterfly keyboard mechanism. Keys that stop registering, repeat randomly, or stick physically are a known fault mode. While Apple ran a recall programme, many affected machines are now outside that window. We service butterfly keyboard failures at component level.' },
  { fault: 'Liquid Damage', desc: 'The 13-inch MacBook Pro is one of the most common liquid damage cases we handle in our Hyde Park workshop. The compact chassis and keyboard ventilation area make it vulnerable to coffee and water spills. Intel models with T2 chips require more careful liquid damage assessment as the T2 has separate liquid exposure pathways from the main logic board.' },
  { fault: 'Black Screen / Display Fault', desc: 'The 13-inch MacBook Pro display backlight circuit is driven by a dedicated backlight IC and fuse. Faults cause a black screen while the machine continues running. On Intel models, the display cable flex is an additional failure point. On M1 and M2 models, the display connector is more robust. External monitor testing distinguishes backlight failure from logic board failure.' },
];

const faqs = [
  { question: 'Can the MacBook Pro 13-inch logic board be repaired?', answer: 'Yes. All MacBook Pro 13-inch generations are repairable at component level. On Intel models (2016-2020), the T2 chip, charge controllers, Thunderbolt controllers, and USB-C power delivery circuits are discrete components. On Apple Silicon models (M1 2020, M2 2022), the SoC is integrated but surrounding power, display, and I/O circuits are all individually diagnosable and repairable. ZA Support in Hyde Park, Johannesburg assesses from R599.' },
  { question: 'Which MacBook Pro 13-inch models do you repair?', answer: 'We repair all MacBook Pro 13-inch generations: Intel 2016, 2017, 2018, 2019, and 2020 (including Touch Bar and non-Touch Bar variants), M1 (late 2020), and M2 (mid 2022). Each has a distinct logic board layout, so our assessment identifies the specific generation and component fault before any repair proceeds.' },
  { question: 'Can you repair T2 chip faults on Intel MacBook Pro 13-inch?', answer: 'Yes. T2 chip faults on the 2019 and 2020 Intel MacBook Pro 13-inch — including Touch ID failure, boot failures, and encrypted storage issues — are addressable at component level in most cases. The T2 is a discrete Apple-designed IC on the logic board. Assessment from R599 determines the specific T2 fault mode and repair viability.' },
  { question: 'My MacBook Pro 13-inch has a no-charge fault after a load shedding surge — is it repairable?', answer: 'Yes, in most cases. Load shedding power surges are a common cause of USB-C charging failures on 13-inch MacBook Pros in South Africa. The surge typically damages the charge controller IC rather than the logic board\'s core circuits. The R599 assessment identifies the specific failed component and confirms repair viability before any commitment.' },
  { question: 'How much does MacBook Pro 13-inch logic board repair cost?', answer: 'Apple charges R15,000–R40,000 for logic board replacement on 13-inch MacBook Pro models depending on generation and configuration. ZA Support repairs only the specific failed component at a fraction of that cost. A written quote is provided after the R599 assessment with the exact repair cost.' },
  { question: 'How long does 13-inch MacBook Pro logic board repair take?', answer: 'After the R599 assessment and your written approval, most 13-inch MacBook Pro logic board repairs complete within 3–5 business days. Liquid damage cases on Intel models with T2 chips may require additional assessment time. We provide a specific timeline in the written quote before starting.' },
  { question: 'Is it worth repairing an older Intel MacBook Pro 13-inch?', answer: 'For 2018-2020 Intel models with T2 chips, repair is generally worthwhile as these machines run macOS Ventura and Sequoia and have substantial performance remaining. For 2016-2017 models, repair viability depends on the fault type and repair cost relative to the machine\'s current value. The R599 assessment helps you make this decision with accurate information.' },
  { question: 'Does ZA Support collect MacBook Pro 13-inch for repair in Johannesburg?', answer: 'Yes. We collect from Sandton, Rosebank, Fourways, Bryanston, Midrand, Randburg, and surrounding Johannesburg suburbs. WhatsApp 064 529 5863 to arrange collection.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Pro 13-inch Logic Board Repair Johannesburg',
  description: 'Component-level MacBook Pro 13-inch logic board repair in Johannesburg. Intel 2016-2020, M1, M2. Assessment from R599.',
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
    { '@type': 'ListItem', position: 4, name: '13-inch', item: 'https://zasupport.com/logic-board-repair/macbook-pro-13-inch' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function MacBookPro13InchLogicBoardPage() {
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
            { label: '13-inch' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Pro 13-inch Logic Board Repair
              <br /><span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Component-level repair for MacBook Pro 13-inch: Intel 2016-2020 (including T2 chip and butterfly keyboard faults), M1 (2020), and M2 (2022). Charging failures, no power, T2 faults, liquid damage, and display issues repaired in Hyde Park, Johannesburg.
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
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
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
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">MacBook Pro 13-inch Logic Board Faults We Repair</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">The 13-inch MacBook Pro covers the largest span of any MacBook line in terms of architecture diversity. Intel models from 2016 to 2020 feature discrete USB-C and Thunderbolt controllers, T2 security chips (2019-2020), and the notorious butterfly keyboard mechanism (2016-2019). The M1 (2020) and M2 (2022) models integrate the SoC but retain discrete power management, USB-C, and display circuits. All are component-level repairable at our Hyde Park workshop.</p>
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
          <FAQAccordion items={faqs} title="MacBook Pro 13-inch Logic Board Repair — Common Questions" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Repairs</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'MacBook Pro M1 Repair', href: '/logic-board-repair/macbook-pro-m1' },
              { label: 'MacBook Pro M2 Repair', href: '/logic-board-repair/macbook-pro-m2' },
              { label: 'MacBook Pro 14-inch', href: '/logic-board-repair/macbook-pro-14-inch' },
              { label: 'MacBook Pro 16-inch', href: '/logic-board-repair/macbook-pro-16-inch' },
              { label: 'MacBook Air M1', href: '/logic-board-repair/macbook-air-m1' },
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
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">MacBook Pro 13-inch Fault? Assessment from R599.</h2>
            <p className="text-[#7A9E98] mb-6">Collection from Sandton, Rosebank, Fourways, Bryanston, Midrand, and Randburg. No Fix No Fee.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
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
