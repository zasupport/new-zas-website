import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Shield, CheckCircle, Zap, AlertTriangle, Smartphone, Eye } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildBreadcrumbSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import GoogleReviews from '@/components/ui/GoogleReviews';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, SITE, buildWhatsAppUrl } from '@/lib/constants';
import PricingNote from '@/components/PricingNote';
import PricingRange from '@/components/PricingRange';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'iPhone Screen Repair Johannesburg [2026] | From R1,299 | ZA Support',
  description:
    'iPhone screen repair in Johannesburg from R1,299. OLED & LCD panels, True Tone calibration, Face ID preserved. Same-day repair at Hyde Park. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/screen-repair/iphone' },
  keywords: [
    'iPhone screen repair Johannesburg',
    'iPhone screen replacement Johannesburg',
    'cracked iPhone screen repair Hyde Park',
    'iPhone OLED screen repair Johannesburg',
    'iPhone 15 screen repair Johannesburg',
    'iPhone 16 Pro Max screen repair',
    'iPhone True Tone screen replacement',
    'broken iPhone screen repair from R1299',
    'iPhone screen repair same day Johannesburg',
    'iPhone Face ID screen repair Johannesburg',
  ],
};

const breadcrumbItems = [
  { label: 'Screen Repair', href: '/screen-repair' },
  { label: 'iPhone' },
];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Screen Repair', url: 'https://zasupport.com/screen-repair' },
  { name: 'iPhone Screen Repair', url: 'https://zasupport.com/screen-repair/iphone' },
];

const pricingTiers = [
  {
    range: 'iPhone 8, SE (2nd & 3rd gen)',
    price: 'From R1,299',
    panel: 'LCD (IPS Retina)',
    note: 'True Tone not supported on these models',
    turnaround: 'Same day',
  },
  {
    range: 'iPhone X, XS, XS Max',
    price: 'From R1,499',
    panel: 'Super Retina OLED',
    note: 'True Tone + wide colour (P3)',
    turnaround: 'Same day',
  },
  {
    range: 'iPhone 11',
    price: 'From R1,399',
    panel: 'Liquid Retina LCD',
    note: 'True Tone, Haptic Touch',
    turnaround: 'Same day',
  },
  {
    range: 'iPhone 12, 12 Mini, 12 Pro',
    price: 'From R1,799',
    panel: 'Super Retina XDR OLED',
    note: 'Ceramic Shield glass, True Tone, P3',
    turnaround: 'Same day',
  },
  {
    range: 'iPhone 13, 13 Mini, 13 Pro',
    price: 'From R1,799',
    panel: 'Super Retina XDR OLED',
    note: 'ProMotion 120 Hz on Pro models',
    turnaround: 'Same day',
  },
  {
    range: 'iPhone 14, 14 Plus',
    price: 'From R1,999',
    panel: 'Super Retina XDR OLED',
    note: 'Emergency SOS via satellite (unaffected by repair)',
    turnaround: 'Same day',
  },
  {
    range: 'iPhone 14 Pro, 14 Pro Max',
    price: 'From R2,199',
    panel: 'ProMotion Always-On OLED',
    note: 'Dynamic Island; 120 Hz ProMotion',
    turnaround: '24–48 hrs',
  },
  {
    range: 'iPhone 15, 15 Plus',
    price: 'From R2,499',
    panel: 'Super Retina XDR OLED',
    note: 'USB-C; titanium frame on Pro',
    turnaround: '24–48 hrs',
  },
  {
    range: 'iPhone 15 Pro, 15 Pro Max',
    price: 'From R2,799',
    panel: 'ProMotion Always-On OLED',
    note: 'Action button; titanium chassis',
    turnaround: '24–48 hrs',
  },
  {
    range: 'iPhone 16, 16 Plus',
    price: 'From R2,499',
    panel: 'Super Retina XDR OLED',
    note: 'Camera Control button; Apple Intelligence',
    turnaround: '24–48 hrs',
  },
  {
    range: 'iPhone 16 Pro, 16 Pro Max',
    price: 'From R2,999',
    panel: 'ProMotion Always-On OLED',
    note: 'Largest display Apple has made — 6.9″',
    turnaround: '24–48 hrs',
  },
];

const technicalPoints = [
  {
    title: 'OLED vs LCD — Why It Matters for Your Repair',
    body: 'From iPhone X onwards, Apple moved to OLED panels on most models. OLED produces deeper blacks, higher contrast ratios, and more accurate colours than the LCD panels used in iPhone 8, SE, and iPhone 11. During a repair, this distinction matters practically: OLED panels must be handled differently to avoid burn-in during testing, and calibration is performed against different brightness targets. We treat every panel type correctly.',
    icon: Eye,
  },
  {
    title: 'True Tone Calibration After Screen Replacement',
    body: 'Apple\'s True Tone technology reads ambient light colour temperature and adjusts the display accordingly. The calibration data is stored on a small chip bonded to the original display. When we fit a new panel, we transfer this data to the replacement using specialist equipment. Without this step, True Tone either fails silently or shows a "unable to verify" prompt in Settings. We complete this transfer on every eligible iPhone — from iPhone 8 through to iPhone 16 Pro Max.',
    icon: Zap,
  },
  {
    title: 'Face ID and the Dot Projector Flex Cable',
    body: 'Face ID on iPhone X and later relies on a dot projector module housed in the TrueDepth camera assembly. This module is connected via a dedicated flex cable that routes along the top of the display bezel. During a screen replacement, this flex cable must be carefully disconnected and reconnected — a torn or incorrectly seated flex cable will permanently disable Face ID. Apple has made it cryptographically paired to the Secure Enclave on your specific device, so it cannot be replaced from another iPhone. We handle this cable with particular care on every Face ID model.',
    icon: Shield,
  },
  {
    title: 'IP68 Re-sealing After Repair',
    body: 'iPhones from iPhone 7 onwards carry an IP rating for water and dust resistance. This seal is broken during any screen replacement. We re-seal the display assembly with fresh adhesive gasket material rated to the same specification as the original Apple seal. We cannot guarantee the same official IP rating as Apple — no third-party repairer can — but our re-seal provides practical protection against splashes and brief water contact. We are transparent about this limitation.',
    icon: CheckCircle,
  },
];

const faqs = [
  {
    question: 'How much does iPhone screen repair cost in Johannesburg?',
    answer:
      'iPhone screen repair at ZA Support starts from R1,299 for iPhone 8 and SE models with LCD panels. iPhone 12 to 14 series repairs start from R1,799. iPhone 15 and 16 Pro Max repairs start from R2,499 to R2,999 depending on the model. All prices include labour, the display assembly, True Tone calibration transfer where applicable, and our up-to-3 year warranty. Compare this to the Apple Store, where iPhone screen replacements run between R3,500 and R9,000 depending on model.',
  },
  {
    question: 'Does iPhone screen repair affect Face ID?',
    answer:
      'No — when done correctly. Face ID is paired to the TrueDepth camera module and the Secure Enclave on your iPhone, not to the display glass itself. During a proper screen replacement, the dot projector flex cable is carefully disconnected and reconnected without damaging the module. In our Hyde Park workshop, we have never had a Face ID failure caused by a screen replacement when the procedure is performed correctly. The risk arises only if the flex cable is torn or forced — which does not happen in our workshop.',
  },
  {
    question: 'What is the difference between an LCD and an OLED iPhone screen?',
    answer:
      'iPhone 8, SE (2nd and 3rd generation), and iPhone 11 use LCD panels (Liquid Retina on iPhone 11). From iPhone X onwards, Apple uses OLED panels branded as Super Retina XDR, with ProMotion OLED on Pro models from iPhone 13 Pro. OLED panels offer higher contrast, true blacks, and wider colour gamut. From a repair standpoint, OLED panels are more expensive to source and require different handling — they must not be folded or pressed during installation, as this causes internal damage. We stock OEM-grade panels for both technologies.',
  },
  {
    question: 'Will True Tone still work after my iPhone screen is replaced?',
    answer:
      'Yes, if the calibration data is transferred correctly. True Tone data is stored on a microchip bonded to the original display assembly. When fitting a new panel, this chip must be moved to the replacement display. We perform this transfer on every iPhone model that supports True Tone. Without it, you will either lose True Tone functionality or see a "unable to verify genuine Apple component" notice in Settings. We complete this step as standard — it is not an optional add-on.',
  },
  {
    question: 'How long does iPhone screen repair take?',
    answer:
      'Most iPhone screen repairs are completed same day at our Hyde Park workshop. For iPhone 8 through to iPhone 14 Pro Max, bring your phone in by noon and it is typically ready by early afternoon. iPhone 15 and 16 Pro Max repairs that require part sourcing may take 24 to 48 hours. We will confirm the exact turnaround time when you contact us — we never hold a phone overnight without giving you a specific collection time.',
  },
  {
    question: 'Is it worth repairing an older iPhone screen or should I just upgrade?',
    answer:
      'For iPhone 12 and newer, screen repair is almost always more cost-effective than upgrading. These are capable devices with years of support ahead. For iPhone 8 and SE, the calculus depends on the phone\'s condition — if the battery is also degraded, we would suggest combining a screen repair and battery replacement in one visit to maximise the device\'s useful life. We will give you an honest recommendation based on the device\'s actual condition, not a sales pitch.',
  },
  {
    question: 'Do you repair iPhones with cracked back glass as well as the screen?',
    answer:
      'Yes. We repair both front screen (display assembly) damage and back glass damage as separate services. Back glass repair on iPhone 8 through iPhone 13 is a significant undertaking — the glass is bonded with strong adhesive, and the frame must be carefully heated to separate it. From iPhone 14 onwards, Apple redesigned the chassis to allow easier back glass removal. We offer both repairs and can quote for combining them in a single visit to save time.',
  },
  {
    question: 'My iPhone shows a "genuine Apple component" warning after a previous repair. Can you fix this?',
    answer:
      'Apple\'s iOS shows a "unable to verify this iPhone has a genuine Apple display" notice when the True Tone calibration chip was not transferred during a repair. In some cases, we can resolve this by transferring the calibration data correctly during a re-repair. However, if the original chip was damaged or discarded during the previous repair, the notice will remain — Apple has tied this notification to hardware pairing that cannot be bypassed by third-party repairers. We will inspect the current state and give you an honest prognosis before doing any work.',
  },
  {
    question: 'Does iPhone screen repair affect my insurance excess or warranty?',
    answer:
      'Third-party repairs do void Apple\'s remaining warranty on the display assembly, but they do not void cover on other components under South African Consumer Protection Act rules. For short-term insurance claims, the excess on iPhone screen damage is often R1,500 to R2,500 depending on the policy — in many cases, paying for a repair directly rather than claiming is more cost-effective for lower-tier iPhones. We do not bill insurers directly, but we can provide a written quote that meets most insurer requirements for a managed repair.',
  },
  {
    question: 'Do you offer a warranty on iPhone screen replacements?',
    answer:
      'Yes. Every iPhone screen repair at ZA Support includes an up-to-3 year warranty covering the display panel and our workmanship. If the replacement display develops a fault — dead pixels, touch issues, backlight failure, or colour shift — within the warranty period, we repair or replace it at from R599. The warranty is provided in writing at the time of collection. It covers parts and labour. It does not cover subsequent physical damage or liquid ingress.',
  },
  {
    question: 'Do you repair iPhone screens in Sandton or do I need to come to Hyde Park?',
    answer:
      'Our workshop is based at Hyde Park, which is approximately 8 minutes from Sandton\'s central business area. We also offer a collection and return service for clients across Johannesburg — including Sandton, Rosebank, Bryanston, Fourways, and Midrand. Contact us on WhatsApp or by phone to arrange a same-day or next-day collection. We also have a dedicated screen repair page for Sandton at zasupport.com/screen-repair/sandton.',
  },
];

const faqSchema = buildFaqSchema(faqs);

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'iPhone Screen Repair Johannesburg',
  description:
    'Professional iPhone screen repair in Johannesburg. OLED and LCD panel replacement, True Tone calibration transfer, Face ID preserved. Same-day repair from R1,299 at Hyde Park workshop.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Hyde Park' },
    { '@type': 'Neighborhood', name: 'Sandton' },
  ],
  offers: {
    '@type': 'Offer',
    priceCurrency: 'ZAR',
    price: '1299',
    priceSpecification: {
      '@type': 'PriceSpecification',
      minPrice: '1299',
      maxPrice: '2999',
      priceCurrency: 'ZAR',
    },
  },
};

const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

export default function ScreenRepairIphonePage() {
  const whatsappUrl = buildWhatsAppUrl('SCR-IPHONE-HERO', 'screen-repair');

  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      {/* Hero */}
      <section className="hero-gradient grid-overlay pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              iPhone Screen Repair
              <br />
              <span className="text-[#0FEA7A]">Johannesburg</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              The most common iPhone screen repair we do at our Hyde Park workshop is cracked OLED glass on the 12 and 13 series — typically from a hip-height drop onto tiled floors, which is unforgiving to any glass panel. We carry stock for every iPhone from 8 through to 16 Pro Max, and most repairs are completed same day.
            </p>
            <p className="text-[#7A9E98] mb-8 max-w-3xl leading-relaxed text-base">
              From R1,299. True Tone calibration transferred as standard. Face ID preserved. IP68 re-sealed. Up-to-3 year warranty. Assessment from R599 if we need to diagnose before quoting.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Shield, label: 'From R599 assessment' },
                { icon: CheckCircle, label: 'True Tone Calibrated' },
                { icon: Smartphone, label: 'Face ID Preserved' },
                { icon: Zap, label: 'Same-Day Repair' },
                { icon: Shield, label: 'Up-to-3 Year Warranty' },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-3 py-2 rounded-full"
                >
                  <Icon className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all"
              >
                WhatsApp for a Quote
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link
                href="/screen-repair"
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all"
              >
                All Screen Repair <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)]">
              {[
                { value: '300+', label: 'iPhone Screens Replaced' },
                { value: SITE.yearsExperience + ' Years', label: 'Apple Specialists Since 2009' },
                { value: SITE.rating + '/5', label: SITE.reviewCount + ' Google Reviews' },
                { value: 'Same Day', label: 'For Most iPhone Models' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-[#0FEA7A] text-xl font-extrabold">{value}</p>
                  <p className="text-[#7A9E98] text-xs mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-3">
            iPhone Screen Repair Pricing
          </h2>
          <p className="text-[#7A9E98] mb-3 max-w-3xl leading-relaxed">
            All prices include the display assembly, True Tone calibration transfer where supported, IP68 re-seal, and our up-to-3 year warranty. The Apple Store charges R3,500 to R9,000 for the same models — our pricing represents a saving of 50–70% on every repair.
          </p>
          <p className="text-[#7A9E98] mb-10 max-w-3xl leading-relaxed text-sm">
            For South African short-term insurance holders: many policies carry an excess of R1,500 to R2,500 on accidental screen damage. On iPhone 12 and below, claiming on insurance for a screen repair is often not economical compared to paying for the repair directly — speak to us and we will help you make the right call.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-[rgba(15,234,122,0.12)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[rgba(15,234,122,0.12)] bg-[rgba(15,234,122,0.05)]">
                  <th className="text-left px-5 py-3 text-[#E8F4F1] font-semibold">Model</th>
                  <th className="text-left px-5 py-3 text-[#E8F4F1] font-semibold">Price</th>
                  <th className="text-left px-5 py-3 text-[#E8F4F1] font-semibold hidden sm:table-cell">Panel Type</th>
                  <th className="text-left px-5 py-3 text-[#E8F4F1] font-semibold hidden md:table-cell">Notes</th>
                  <th className="text-left px-5 py-3 text-[#E8F4F1] font-semibold">Turnaround</th>
                </tr>
              </thead>
              <tbody>
                {pricingTiers.map((row, i) => (
                  <tr
                    key={row.range}
                    className={`border-b border-[rgba(255,255,255,0.04)] ${i % 2 === 0 ? 'bg-transparent' : 'bg-[rgba(15,234,122,0.02)]'}`}
                  >
                    <td className="px-5 py-3 text-[#E8F4F1] font-medium">{row.range}</td>
                    <td className="px-5 py-3 text-[#0FEA7A] font-bold">{row.price}</td>
                    <td className="px-5 py-3 text-[#7A9E98] hidden sm:table-cell">{row.panel}</td>
                    <td className="px-5 py-3 text-[#7A9E98] hidden md:table-cell text-xs">{row.note}</td>
                    <td className="px-5 py-3 text-[#7A9E98]">{row.turnaround}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[#7A9E98] text-xs mt-4">
            Prices are indicative and confirmed in writing before any work begins. Assessment from R599 applies where diagnosis is required before a quote can be given.
          </p>
          <PricingRange page="/screen-repair/iphone" />
          <PricingNote variant="inline" />
        </div>
      </section>

      {/* Technical Detail */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
            What Makes iPhone Screen Repair Technical
          </h2>
          <p className="text-[#7A9E98] mb-10 max-w-3xl leading-relaxed">
            iPhone screen replacement is not simply swapping glass. Apple has layered a series of software-pairing and calibration steps into recent models that trip up repairers who do not have the right equipment or training. Here is what we do differently at ZA Support.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {technicalPoints.map((point) => (
              <div
                key={point.title}
                className="rounded-2xl border border-[rgba(15,234,122,0.15)] bg-[rgba(15,234,122,0.03)] p-6"
              >
                <div className="flex items-start gap-4 mb-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[rgba(15,234,122,0.1)] flex items-center justify-center">
                    <point.icon className="w-5 h-5 text-[#0FEA7A]" />
                  </div>
                  <h3 className="text-[#E8F4F1] font-bold text-lg leading-snug">{point.title}</h3>
                </div>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{point.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Body Copy — Process & Context */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
            iPhone Screen Repair in Our Hyde Park Workshop
          </h2>
          <div className="space-y-5 text-[#7A9E98] leading-relaxed">
            <p>
              In our Hyde Park workshop, iPhone screen repairs make up a significant portion of our daily volume. The most frequent models we see are the iPhone 12 and 13 series — the OLED panels on these devices are beautiful but they shatter on impact more readily than the older LCD panels. The Ceramic Shield glass Apple introduced on iPhone 12 reduces surface scratching, but it does not prevent the OLED layer beneath from cracking when the phone is dropped at the wrong angle.
            </p>
            <p>
              We stock replacement panels for the full range from iPhone 8 through to iPhone 16 Pro Max. For the more common models — iPhone 12, 13, 14 — we typically have parts in-house and can complete the repair in two to three hours. For the 15 and 16 Pro Max, which use the newest OLED technology and carry the highest part costs, we may need 24 to 48 hours depending on availability. We will tell you this upfront when you contact us.
            </p>
            <p>
              The repair itself is methodical. We first run a diagnostic to confirm the display is the only fault — we have seen iPhones come in with a cracked screen that also had a partially bent frame from the same drop, which needs to be straightened before a new screen is fitted or the seal will not close properly. Once we confirm the scope of work, we quote in writing. The phone is powered down, the display assembly is carefully opened using a hot plate and suction tool, the Face ID flex cable is disconnected first (it sits at the top of the assembly and must be released before the display is lifted), and the new panel is fitted and calibrated.
            </p>
            <p>
              True Tone calibration is completed before the phone is sealed. We then run a full function test: touch responsiveness across the full panel, Face ID (verified by enrolling a face scan), front and rear cameras, earpiece, and proximity sensor. Only once every function is confirmed do we seal the display with fresh adhesive gasket and return the phone.
            </p>
            <p>
              If you are based in Sandton, Rosebank, Bryanston, or Fourways and cannot get to Hyde Park, contact us on WhatsApp to arrange a collection. We collect daily across Johannesburg and can usually collect and return within the same business day for the common iPhone models. For clients further afield — Pretoria, Centurion, Midrand — next-day collection and return is standard.
            </p>
            <p>
              One thing we are upfront about: since iPhones from iOS 15.2 onwards log unverified repairs in Settings under General &gt; About, a notice that reads &ldquo;Unable to verify this iPhone has a genuine Apple display&rdquo; may appear for a period after fitting a non-Apple sourced panel. This is a software flag, not a hardware fault, and it does not affect the function of the display or any feature including True Tone and Face ID. It typically clears after a software update. We explain this to every customer before starting work.
            </p>
            <p>
              For an authoritative overview of iPhone display technologies, Apple&rsquo;s own <a href="https://support.apple.com/en-gb/111901" target="_blank" rel="noopener noreferrer" className="text-[#0FEA7A] hover:underline">iPhone display comparison guide</a> details the panel specifications for every model — useful context if you are deciding between repair and upgrade.
            </p>
          </div>
        </div>
      </section>

      {/* Apple vs ZA Support Comparison */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">
            Apple Store vs ZA Support: iPhone Screen Repair
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="glass-card p-6 border border-red-500/20">
              <h3 className="text-red-400 font-bold mb-3">Apple Store / iStore</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2">
                <li>iPhone 15 screen: R5,500–R9,000 out of warranty</li>
                <li>iPhone 12: R3,500–R5,000 out of warranty</li>
                <li>Turnaround: 2–5 business days via depot</li>
                <li>AppleCare+ required for reduced pricing</li>
                <li>Walk-in availability varies; appointments often 48 hrs out</li>
              </ul>
            </div>
            <div className="glass-card p-6 border border-[rgba(15,234,122,0.3)]">
              <h3 className="text-[#0FEA7A] font-bold mb-3">ZA Support</h3>
              <ul className="text-[#7A9E98] text-sm space-y-2">
                <li>iPhone 15 from R2,499 | iPhone 12 from R1,799</li>
                <li>Same-day repair for most models</li>
                <li>Up-to-3 year warranty on display and workmanship</li>
                <li>True Tone transferred | Face ID preserved</li>
                <li>Collection across Johannesburg — no travel needed</li>
              </ul>
            </div>
          </div>
          <div className="p-5 rounded-xl border border-[rgba(15,234,122,0.15)] bg-[rgba(15,234,122,0.04)] flex items-start gap-4">
            <AlertTriangle className="w-5 h-5 text-[#F5A623] flex-shrink-0 mt-0.5" />
            <p className="text-[#7A9E98] text-sm leading-relaxed">
              From R599 assessment applies to every iPhone screen repair. If we cannot resolve your fault after assessment, you pay the R599 diagnostic fee and receive your phone back exactly as presented. We quote in writing before every repair — there are no surprises.
            </p>
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="py-10 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={null}>
            <GoogleReviews />
          </Suspense>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="iPhone Screen Repair — Common Questions" />
        </div>
      </section>

      {/* Internal Links / Related Services */}
      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Repairs</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'All Screen Repair', href: '/screen-repair' },
              { label: 'iPhone Repair Hub', href: '/iphone-repair' },
              { label: 'Logic Board Repair', href: '/logic-board-repair' },
              { label: 'Screen Repair Sandton', href: '/screen-repair/sandton' },
              { label: 'Liquid Damage Repair', href: '/liquid-damage' },
              { label: 'Battery Replacement', href: '/battery-replacement' },
              { label: 'MacBook Pro Screen', href: '/screen-repair/macbook-pro' },
              { label: 'Contact Us', href: '/contact' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="glass-card p-4 text-center group"
              >
                <span className="text-[#E8F4F1] text-sm font-semibold group-hover:text-[#0FEA7A] transition-colors">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
              Cracked iPhone Screen? Book Same-Day Repair.
            </h2>
            <p className="text-[#7A9E98] mb-6 max-w-xl mx-auto leading-relaxed">
              WhatsApp us your iPhone model and a photo of the damage. We will confirm parts availability and give you a fixed price within minutes. Most repairs completed same day at our Hyde Park workshop.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all"
              >
                WhatsApp for a Quote
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
            <p className="text-[#7A9E98] text-xs mt-6">
              1 Hyde Lane, Hyde Park, Office E2004, JHB 2196 | From R1,299 | Up-to-3 year warranty | Assessment from R599
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
