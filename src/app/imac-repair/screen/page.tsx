import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Monitor, AlertTriangle } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'iMac Screen Repair Johannesburg | Cracked Display Replacement | From R 4,500 | ZA Support',
  description:
    'iMac screen repair in Johannesburg. Cracked glass, dead pixels, backlight failure, display lines — all iMac models from 2012 onwards. Professional panel replacement from R 4,500. Hyde Park.',
  alternates: { canonical: 'https://zasupport.com/imac-repair/screen' },
};

const pricingRows = [
  { model: 'iMac 21.5" (2012–2014)', issue: 'Glass + LCD panel', price: 'From R 4,500', note: 'Front glass separate from panel' },
  { model: 'iMac 21.5" (2015–2019)', issue: 'Laminated display assembly', price: 'From R 5,500', note: 'Glass fused to LCD — full assembly' },
  { model: 'iMac 27" (2012–2014)', issue: 'Glass + LCD panel', price: 'From R 5,500', note: 'Glass separate — careful removal needed' },
  { model: 'iMac 27" (2015–2019)', issue: 'Laminated display assembly', price: 'From R 6,500', note: 'Glass fused to LCD — full assembly' },
  { model: 'iMac 27" (2020)', issue: 'Nano-texture display', price: 'From R 7,500', note: 'Call for quote — nano-texture variant' },
  { model: 'Backlight failure (any model)', issue: 'Backlight board or TCON', price: 'From R 2,800', note: 'Board repair — panel may be reused' },
];

const symptoms = [
  'Cracked or shattered front glass',
  'Dead pixels or lines on screen',
  'Display is dark but machine still runs (backlight failure)',
  'Half the screen is black or discoloured',
  'Yellow tint or colour shift across part of the display',
  'Pressure marks or blotches after impact',
];

const faqs = [
  {
    question: 'What is the difference between the glass panel and the LCD panel?',
    answer:
      'Older iMac models (2012–2014) have a separate front glass held in by magnets, and a separate LCD panel behind it. If only the glass is cracked (no visible damage to the image), replacing just the glass is cheaper. From 2015 onwards, Apple fused (laminated) the glass directly to the LCD — they are one unit and must be replaced together, which increases the cost.',
  },
  {
    question: 'My iMac screen is dark but I can hear it running — is that the display or the logic board?',
    answer:
      'If the machine boots and responds to keyboard commands but the screen is black, it is almost certainly the backlight. Connect an external monitor: if a desktop appears, the logic board is fine and the issue is the backlight circuit or TCON board inside the iMac — not the logic board. Backlight repairs are significantly less expensive than full panel replacements.',
  },
  {
    question: 'Can you repair just the cracked glass on an older iMac without replacing the LCD?',
    answer:
      'On 2012–2014 iMac models, yes — if the LCD itself is undamaged (no dead pixels, no lines, no cracks visible in the image), replacing just the front glass is possible and less expensive than a full panel replacement. We assess the LCD condition before quoting.',
  },
  {
    question: 'How do you open an iMac to replace the screen?',
    answer:
      'On 2012–2014 models, the front glass is held by magnets and lifts off with suction cups. From 2015 onwards, the glass is glued to the frame with adhesive strips. We use professional iMac display separation tools to cut the adhesive without cracking the glass or LCD, then reseal with fresh adhesive after the repair. The result looks factory-original.',
  },
  {
    question: 'How long does an iMac screen replacement take?',
    answer:
      'Display removal and panel replacement takes 2–3 hours. If parts are in stock, most repairs are completed same day or the following morning. We confirm parts availability before you bring the machine in.',
  },
  {
    question: 'What causes iMac screens to fail?',
    answer:
      'Physical impact is the most common cause (cracked glass or LCD). Backlight failure is the second most common — the backlight LEDs or the TCON driver board fail with age, causing a dark or partially lit screen. Dead pixels and lines are typically caused by panel degradation or, on older models, a failing T-CON board which can be replaced without touching the LCD panel itself.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'iMac Screen Repair Johannesburg',
  description:
    'iMac screen repair in Johannesburg. Cracked glass, dead pixels, backlight failure, display lines. All Intel iMac models. Professional panel replacement.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: { '@type': 'City', name: 'Johannesburg' },
  serviceType: 'Computer Repair',
  offers: [
    { '@type': 'Offer', name: 'iMac 21.5" Screen Repair', price: '4500', priceCurrency: 'ZAR' },
    { '@type': 'Offer', name: 'iMac 27" Screen Repair', price: '5500', priceCurrency: 'ZAR' },
  ],
};

export default function IMacScreenRepairPage() {
  const faqSchema = buildFaqSchema(faqs);

  return (
    <>
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={faqSchema} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <Link href="/imac-repair" className="text-sm text-slate-400 hover:text-green-400 flex items-center gap-1">
              iMac Repair
              <ArrowRight className="w-3 h-3" />
              <span className="text-white">Screen Repair</span>
            </Link>
          </div>
          <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Monitor className="w-4 h-4" />
            iMac Screen Repair
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            iMac Screen Repair Johannesburg
          </h1>
          <p className="text-xl text-slate-300 mb-4 max-w-2xl mx-auto">
            Cracked glass, dead pixels, backlight failure, display lines.
            All iMac models from 2012 onwards. Free assessment and fixed quote.
          </p>
          <p className="text-2xl font-bold text-green-400 mb-8">From R 4,500</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${CONTACT.phone}`}
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              <Phone className="w-5 h-5" />
              {CONTACT.phone}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-slate-500 hover:border-green-400 text-slate-300 hover:text-green-400 px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              Book Assessment
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Symptoms */}
      <section className="py-12 px-4 bg-amber-50 border-b border-amber-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Common iMac screen problems we repair:</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {symptoms.map((s) => (
              <div key={s} className="flex items-center gap-2 text-slate-700">
                <span className="w-2 h-2 bg-amber-400 rounded-full shrink-0" />
                {s}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dark screen tip */}
      <section className="py-10 px-4 bg-blue-50 border-b border-blue-100">
        <div className="max-w-3xl mx-auto flex gap-4 items-start">
          <AlertTriangle className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-slate-900 mb-1">Dark screen but machine still running?</h3>
            <p className="text-slate-600 text-sm">
              Connect an external monitor via Thunderbolt or HDMI. If your desktop appears on the external screen, the logic board is fine — the issue is the internal backlight, not the logic board. Backlight repairs start from R 2,800, significantly less than a full screen replacement.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">iMac Screen Repair Pricing</h2>
          <p className="text-slate-500 text-center mb-8">Prices include parts and labour. Free assessment before any commitment.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="text-left p-4">iMac Model</th>
                  <th className="text-left p-4">Issue</th>
                  <th className="text-left p-4">Price</th>
                  <th className="text-left p-4">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pricingRows.map((row) => (
                  <tr key={`${row.model}-${row.issue}`} className="hover:bg-slate-50">
                    <td className="p-4 text-slate-700">{row.model}</td>
                    <td className="p-4 text-slate-700 text-xs">{row.issue}</td>
                    <td className="p-4 font-semibold text-green-600">{row.price}</td>
                    <td className="p-4 text-slate-500 text-xs">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-sm text-slate-500 mt-4">
            Parts availability confirmed before any work begins. Prices may vary for unusual configurations.
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">How iMac Screen Repair Works</h2>
          <div className="space-y-6">
            {[
              { step: '1', title: 'Bring in your iMac', desc: 'We inspect the screen damage, connect an external monitor if needed to verify the logic board, and quote a fixed price.' },
              { step: '2', title: 'Parts confirmed', desc: 'We confirm the replacement glass or panel is available for your model and year before you leave the machine.' },
              { step: '3', title: 'Display carefully separated', desc: 'Using professional separation tools, we lift the display from the adhesive without cracking the rear housing. On older magnet-held models, the glass is removed without adhesive.' },
              { step: '4', title: 'Panel or glass replaced', desc: 'The damaged component is replaced. On models with separate glass and LCD, only the damaged component is replaced. On laminated assemblies, the full display module is replaced.' },
              { step: '5', title: 'Resealed and tested', desc: 'The display is resealed with new adhesive strips (where applicable), powered on, and tested for dead pixels, colour accuracy, and backlight uniformity before collection.' },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  <p className="text-slate-500 text-sm mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">iMac Screen Repair Questions</h2>
          <FAQAccordion items={faqs} />
        </div>
      </section>

      {/* Combine with upgrade callout */}
      <section className="py-12 px-4 bg-green-50 border-y border-green-100">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-bold text-slate-900 mb-1">While the display is open — upgrade the SSD?</h3>
            <p className="text-slate-600 text-sm">
              For most iMac models, the SSD is accessed through the same display opening. Replacing the internal drive at the same time as a screen repair adds minimal labour cost and eliminates a second service visit.
            </p>
          </div>
          <Link
            href="/imac-repair/ssd-upgrade"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-colors"
          >
            SSD Upgrade
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-slate-900 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Book Your iMac Screen Repair</h2>
          <p className="text-slate-300 mb-8">
            Free assessment. Fixed quote. No Fix No Fee.
            Hyde Park, Johannesburg.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${CONTACT.phone}`}
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
            >
              <Phone className="w-5 h-5" />
              {CONTACT.phone}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-slate-600 hover:border-green-400 text-slate-300 hover:text-green-400 px-8 py-4 rounded-xl font-semibold transition-colors"
            >
              Book Online
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
