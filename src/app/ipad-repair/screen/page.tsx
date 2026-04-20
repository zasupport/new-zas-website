import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, CheckCircle, Star, MessageCircle, Shield, Clock, Wrench, Monitor, Zap, AlertTriangle } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQ';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildBreadcrumbSchema, buildServiceSchema } from '@/lib/schema';
import { CONTACT, buildWhatsAppUrl} from '@/lib/constants';
import PricingNote from '@/components/PricingNote';

export const metadata: Metadata = {
  title: 'iPad Screen Repair Johannesburg | ZA Support',
  description:
    'iPad screen repair in Johannesburg. Cracked glass, dead touch, unresponsive display. iPad mini, Air, Pro 11" and 12.9". Same-day available. up-to-3 year warranty. Hyde Park, Johannesburg.',
  alternates: { canonical: 'https://zasupport.com/ipad-repair/screen' },
  keywords: [
    'iPad screen repair Johannesburg',
    'cracked iPad screen Johannesburg',
    'iPad screen replacement Johannesburg',
    'iPad Pro screen repair Johannesburg',
    'iPad Air screen repair Johannesburg',
    'iPad mini screen repair Johannesburg',
    'iPad glass repair Johannesburg',
    'iPad touch screen not working Johannesburg',
  ],
};

const pricingRows = [
  { model: 'iPad mini (all generations)', note: '' },
  { model: 'iPad Air (all generations)', note: 'Most popular repair' },
  { model: 'iPad Pro 11"', note: 'ProMotion LCD / OLED' },
  { model: 'iPad Pro 12.9" / 13"', note: 'Liquid Retina XDR' },
];

const symptoms = [
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    title: 'Cracked or Shattered Glass',
    desc: 'A drop or impact cracks the front glass and often the LCD beneath. Even minor cracks spread under daily pressure, early repair prevents further damage.',
  },
  {
    icon: <Monitor className="w-5 h-5" />,
    title: 'Touch Not Responding',
    desc: 'Part of the screen stops registering touch, or the entire digitiser becomes unresponsive. The cause is usually a failed touch layer bonded to the glass.',
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Dead Pixels or Colour Blotches',
    desc: 'Permanent dark spots, coloured patches, or white blotches appear on the panel. These are signs of LCD cell failure that only a replacement resolves.',
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    title: 'Flickering or Dimming',
    desc: 'Intermittent backlight flickering or sudden dimming that brightness controls cannot fix is a display assembly fault requiring replacement.',
  },
  {
    icon: <Monitor className="w-5 h-5" />,
    title: 'Lines Across the Display',
    desc: 'Horizontal or vertical lines are a classic sign of a damaged LCD panel. If the lines appeared after a drop, the display connector may also need inspection.',
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Black Screen but iPad Is On',
    desc: 'If your iPad powers on (you can hear sounds or it shows on a connected Mac) but the screen is black, the backlight or LCD assembly has failed.',
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    title: 'Ghost Touch (Screen Touches Itself)',
    desc: 'The display appears to tap and swipe on its own. This is a digitiser fault, often triggered by a cracked panel creating phantom capacitive signals.',
  },
  {
    icon: <Monitor className="w-5 h-5" />,
    title: 'Water Lines or Grey Blotches',
    desc: 'Liquid ingress creates spreading grey or brown blotches. Early screen replacement prevents the moisture from reaching internal components.',
  },
];

const processSteps = [
  { step: '1', title: 'Assessment: from R599', desc: 'Bring your iPad in or WhatsApp us a photo. We inspect the display and give you a written fixed-price quote, no surprises.' },
  { step: '2', title: 'Parts Confirmed', desc: 'We confirm the correct replacement assembly is in stock for your specific model before committing to a repair date.' },
  { step: '3', title: 'Screen Replaced', desc: 'A certified technician replaces the display assembly. Most iPad screen repairs take 1–3 hours.' },
  { step: '4', title: 'Full Quality Check', desc: 'We test touch accuracy across the full panel, check brightness uniformity, verify Apple Pencil compatibility, and confirm Face ID or Touch ID still functions.' },
  { step: '5', title: 'Collect with Warranty', desc: 'You collect your iPad with a up-to-3 year warranty on the replacement screen and our labour. Assessment: from R599 applies.' },
];

const faqs = [
  {
    question: 'How much does iPad screen repair cost in Johannesburg?',
    answer:
      'iPad screen repair cost depends on your specific model and generation. We provide a assessment fee (from R599) and written fixed-price quote before starting any work, no surprises.',
  },
  {
    question: 'How long does iPad screen replacement take?',
    answer:
      'Most iPad screen replacements take 1–3 hours. If we have your specific display assembly in stock, same-day repair is often available. iPad Pro 11" and 12.9" repairs may take 2–4 hours due to the adhesive bonding process. We confirm the turnaround time when you bring it in.',
  },
  {
    question: 'Will Apple Pencil still work after screen repair?',
    answer:
      'Yes. We use OEM-quality display assemblies that maintain full Apple Pencil compatibility, including tilt detection and pressure sensitivity on supported models. We test Apple Pencil functionality before returning your iPad.',
  },
  {
    question: 'Will Face ID or Touch ID still work after an iPad screen repair?',
    answer:
      'Yes. Screen replacement on an iPad does not affect Face ID (iPad Pro) or Touch ID (iPad Air / iPad mini). These functions are tied to the logic board, not the display assembly. We verify both before you collect your device.',
  },
  {
    question: 'Is it worth repairing a cracked iPad screen?',
    answer:
      'In most cases, yes. iPad screen repair costs a fraction of replacement. Screen repair versus buying new is almost always the better value. We provide an honest assessment, if repair is not economical, we will tell you.',
  },
  {
    question: 'Can you repair an iPad Pro OLED or ProMotion screen?',
    answer:
      'Yes. We repair iPad Pro displays including ProMotion (120 Hz) LCD and OLED panels on the latest M4 iPad Pro. These are premium assemblies. We use high-quality replacements that preserve ProMotion refresh rates and colour accuracy.',
  },
  {
    question: 'My iPad screen cracked but still works, should I repair it now?',
    answer:
      'Yes, sooner is always better. Cracks spread under daily flexion and fingertip pressure. A crack that starts at the corner can reach across the display within weeks. More importantly, a cracked screen exposes the LCD beneath to dust and moisture. Repairing early saves money.',
  },
  {
    question: 'Do you offer a warranty on iPad screen repairs?',
    answer:
      'Yes. All iPad screen repairs at ZA Support come with a up-to-3 year warranty on the replacement panel and our labour. If dead pixels appear, the touch layer fails, or the display develops any fault within the warranty period, we fix it at from R599. This warranty is backed in writing.',
  },
];

const reviews = [
  {
    name: 'Priya N.',
    suburb: 'Sandton',
    rating: 5,
    text: 'Dropped my iPad Air and the screen shattered completely. ZA Support had it fixed the same day, the new display looks perfect and Apple Pencil works flawlessly. Brilliant service.',
    date: 'February 2026',
  },
  {
    name: 'James O.',
    suburb: 'Rosebank',
    rating: 5,
    text: 'iPad Pro 11" screen had dead pixels spreading from the corner. Fixed in two hours, Touch ID still works, up-to-3 year warranty. Very professional team.',
    date: 'January 2026',
  },
  {
    name: 'Fatima D.',
    suburb: 'Fourways',
    rating: 5,
    text: 'Ghost touch was driving me crazy, the screen was tapping itself constantly. ZA Support replaced the digitiser and it has been perfect ever since.',
    date: 'March 2026',
  },
];


const serviceSchema = buildServiceSchema({
  name: 'iPad Screen Repair Johannesburg',
  description: 'iPad screen repair in Johannesburg for all iPad mini, Air, and Pro models. Cracked glass, dead touch, dead pixels, backlight failure. up-to-3 year warranty.',
});

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'iPad Repair', url: 'https://zasupport.com/ipad-repair' },
  { name: 'Screen Repair', url: 'https://zasupport.com/ipad-repair/screen' },
];

const faqSchema = buildFaqSchema(faqs);
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

const whatsappUrl = buildWhatsAppUrl('IPD-SCR', 'ipad-repair');

export default function iPadScreenPage() {
  return (
    <>
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'iPad Repair', href: '/ipad-repair' },
              { label: 'Screen Repair' },
            ]}
          />
          <div className="mt-8 max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[rgba(15,234,122,0.1)] border border-[rgba(15,234,122,0.25)] text-[#0FEA7A] text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <Star className="w-4 h-4 fill-current" /> 4.9 / 5 from 632 verified reviews
            </div>
            <h1
              className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] leading-tight mb-6"
             
            >
              iPad Screen Repair<br />
              <span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4">
              Cracked glass, dead touch, dead pixels, ghost touch, we repair all iPad screen faults.
              iPad mini, iPad Air, iPad Pro 11" and 12.9". Same-day available.
              up-to-3 year warranty. Hyde Park, Johannesburg.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#7A9E98] mb-8">
              {['Assessment: from R599', 'Up-to-3 Year Warranty', 'Apple Pencil compatible', 'Same-day available', 'Assessment: from R599'].map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#0FEA7A] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp Us
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link
                href="/ipad-repair"
                className="inline-flex items-center gap-2 border border-[rgba(255,255,255,0.1)] text-[#7A9E98] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(255,255,255,0.04)] transition-all"
              >
                All iPad Repairs <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Models ──────────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
            iPad Models We Repair
          </h2>
          <p className="text-[#7A9E98] mb-8 max-w-2xl">
            We provide a written fixed-price quote before starting.
            Bring your iPad in or send us the model number for an exact quote.
          </p>
          <div className="glass-card overflow-hidden max-w-2xl">
            <div className="grid grid-cols-2 gap-0 bg-[rgba(15,234,122,0.06)] px-6 py-3 border-b border-[rgba(255,255,255,0.06)]">
              <span className="text-[#0FEA7A] text-xs font-bold uppercase tracking-wider">Model</span>
              <span className="text-[#0FEA7A] text-xs font-bold uppercase tracking-wider text-right">Note</span>
            </div>
            {pricingRows.map((row, i) => (
              <div
                key={row.model}
                className={`grid grid-cols-2 gap-0 px-6 py-4 ${i < pricingRows.length - 1 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''}`}
              >
                <span className="text-[#E8F4F1] text-sm font-medium">{row.model}</span>
                <span className="text-[#7A9E98] text-xs text-right self-center">{row.note}</span>
              </div>
            ))}
          </div>
          <p className="text-[#7A9E98] text-xs mt-4">
            All repairs include written up-to-3 year warranty. Assessment: from R599. Apple Pencil compatibility preserved.
            Assessment: from R599, from R599 if we cannot repair your device.
          </p>
          <PricingNote variant="inline" />
        </div>
      </section>

      {/* ── Symptoms ─────────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
            iPad Screen Faults We Repair
          </h2>
          <p className="text-[#7A9E98] mb-10 max-w-2xl">
            Every symptom listed below is something we repair daily. If you are not sure whether your
            fault is the screen or something deeper, we diagnose first, from R599.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {symptoms.map((s) => (
              <div
                key={s.title}
                className="glass-card p-6 flex flex-col gap-3 hover:border-[rgba(15,234,122,0.3)] transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[rgba(15,234,122,0.1)] flex items-center justify-center text-[#0FEA7A]">
                  {s.icon}
                </div>
                <h3 className="text-[#E8F4F1] font-bold text-sm">
                  {s.title}
                </h3>
                <p className="text-[#7A9E98] text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose ZA Support ─────────────────────────────────────────── */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">
                Why Johannesburg iPad Owners Choose ZA Support
              </h2>
              <div className="space-y-5">
                {[
                  {
                    icon: <Shield className="w-5 h-5" />,
                    title: 'Up-to-3 Year Warranty',
                    desc: 'Every iPad screen repair carries a warranty on parts and labour. If it fails, we fix it, no arguments, from R599.',
                  },
                  {
                    icon: <Clock className="w-5 h-5" />,
                    title: 'Same-Day When in Stock',
                    desc: 'We stock screens for the most common iPad models. If yours is in stock, same-day repair is available. We confirm before you bring it in.',
                  },
                  {
                    icon: <Wrench className="w-5 h-5" />,
                    title: 'Assessment: from R599',
                    desc: 'If we cannot fix your iPad screen, assessment fee of from R599 applies. We give you an honest assessment and fixed price before we start.',
                  },
                  {
                    icon: <CheckCircle className="w-5 h-5" />,
                    title: 'Apple Pencil Compatibility Preserved',
                    desc: 'We use OEM-quality display assemblies that maintain full Apple Pencil support, including pressure, tilt, and latency on Pro models.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[rgba(15,234,122,0.1)] flex items-center justify-center text-[#0FEA7A] flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-[#E8F4F1] font-semibold text-sm mb-1">
                        {item.title}
                      </h3>
                      <p className="text-[#7A9E98] text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="glass-card p-6 border-l-2 border-[#0FEA7A]">
                <p className="text-[#7A9E98] text-sm italic mb-3">
                  &ldquo;I was told to replace the whole iPad. ZA Support replaced my screen
                  same-day, up-to-3 year warranty, Apple Pencil still works. Should have called them first.&rdquo;
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map((s) => <Star key={s} className="w-3.5 h-3.5 fill-[#0FEA7A] text-[#0FEA7A]" />)}
                  </div>
                  <span className="text-[#E8F4F1] text-xs font-semibold">Priya N.</span>
                  <span className="text-[#7A9E98] text-xs">— Sandton</span>
                </div>
              </div>
              <div className="glass-card p-6 border-l-2 border-[#0FEA7A]">
                <p className="text-[#7A9E98] text-sm italic mb-3">
                  &ldquo;iPad Pro 11" dead pixels spreading from the corner. Repaired in two hours. Touch ID still works,
                  the display is perfect. Very professional and transparent about pricing.&rdquo;
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map((s) => <Star key={s} className="w-3.5 h-3.5 fill-[#0FEA7A] text-[#0FEA7A]" />)}
                  </div>
                  <span className="text-[#E8F4F1] text-xs font-semibold">James O.</span>
                  <span className="text-[#7A9E98] text-xs">— Rosebank</span>
                </div>
              </div>
              <div className="glass-card p-6 border-l-2 border-[#0FEA7A]">
                <p className="text-[#7A9E98] text-sm italic mb-3">
                  &ldquo;Ghost touch was making my iPad unusable. ZA Support replaced the digitiser and it has been
                  flawless since. Wish I had brought it in sooner.&rdquo;
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map((s) => <Star key={s} className="w-3.5 h-3.5 fill-[#0FEA7A] text-[#0FEA7A]" />)}
                  </div>
                  <span className="text-[#E8F4F1] text-xs font-semibold">Fatima D.</span>
                  <span className="text-[#7A9E98] text-xs">— Fourways</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-10">
            How iPad Screen Repair Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {processSteps.map((p) => (
              <div key={p.step} className="glass-card p-6">
                <div className="w-8 h-8 rounded-full bg-[rgba(15,234,122,0.15)] flex items-center justify-center text-[#0FEA7A] font-bold text-sm mb-4">
                  {p.step}
                </div>
                <h3 className="text-[#E8F4F1] font-bold text-sm mb-2">
                  {p.title}
                </h3>
                <p className="text-[#7A9E98] text-xs leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="iPad Screen Repair, Frequently Asked Questions" />
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2
              className="text-3xl font-extrabold text-[#E8F4F1] mb-3"
             
            >
              Cracked iPad Screen?
            </h2>
            <p className="text-[#7A9E98] mb-2">Assessment: from R599.</p>
            <p className="text-[#7A9E98] text-sm mb-8">
              Hyde Park, Johannesburg, serving Sandton, Rosebank, Fourways, Bryanston and surrounds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp Us Now
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
