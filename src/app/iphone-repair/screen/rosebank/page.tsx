import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, CheckCircle, MapPin, Shield, Zap } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'iPhone Screen Repair Rosebank | ZA Support Hyde Park',
  description:
    'iPhone screen repair for Rosebank clients. Cracked OLED, dead touch, lines on display. iPhone 12 to 16 Pro Max. We collect from Rosebank. Call 064 529 5863.',
  alternates: { canonical: 'https://zasupport.com/iphone-repair/screen/rosebank' },
};

const issues = [
  { title: 'Cracked OLED Screen', desc: 'Shattered glass or cracked OLED panel from a drop. We replace the full display assembly — glass, OLED, and touch digitiser.' },
  { title: 'Touch Not Responding', desc: 'Part of the screen stops registering touch or becomes fully unresponsive. Full display assembly replacement resolves this.' },
  { title: 'Dead Pixels or Dark Blotches', desc: 'Permanent dark patches spreading after a drop. OLED cell failure caused by internal impact stress.' },
  { title: 'Lines Across the Screen', desc: 'Horizontal or vertical lines on an iPhone display — classic OLED panel damage or a loose display connector.' },
  { title: 'Green Line Down the Side', desc: 'Thin green vertical line — a known OLED failure mode. Screen replacement resolves it completely.' },
  { title: 'Ghost Touch', desc: 'iPhone appears to tap and swipe on its own. Digitiser fault from a cracked panel creating phantom capacitive signals.' },
];

const faqs = [
  {
    question: 'Do you collect iPhones for screen repair from Rosebank?',
    answer: 'Yes. Rosebank is approximately 2 km from our Hyde Park workshop — one of our closest collection suburbs. We collect from Rosebank Mall, The Zone, and surrounding offices and apartments. Same-day screen repair and return is typically possible for Rosebank clients.',
  },
  {
    question: 'How long does an iPhone screen repair take?',
    answer: 'Most iPhone screen replacements are completed within 1–2 hours. For Rosebank clients, we can often collect, repair, and return your iPhone on the same day.',
  },
  {
    question: 'Which iPhone models do you repair?',
    answer: 'We repair iPhone 12, 12 mini, 12 Pro, 12 Pro Max, 13 series, 14 series, 15 series, and 16 series including all Pro and Pro Max variants. Contact us if you have an older model — we service earlier iPhones too.',
  },
  {
    question: 'What screens do you use?',
    answer: 'We use high-quality OLED replacement screens that match or exceed OEM specifications for brightness, colour accuracy, and touch sensitivity. We do not use inferior LCD substitutes for iPhone models that shipped with OLED displays.',
  },
  {
    question: 'Will a screen repair affect Face ID?',
    answer: 'No, when performed correctly. We do not touch the Face ID module during a screen replacement. Face ID operates independently of the display assembly and will continue to function normally after our repair.',
  },
  {
    question: 'My iPhone screen is cracked but still works. Should I repair it?',
    answer: 'Yes. A cracked screen will worsen over time — small cracks spread under daily pressure and temperature changes. The cracked glass also exposes the OLED panel to dust and moisture. Repairing a lightly cracked screen is significantly cheaper than replacing a screen that has developed dark blotches from deferred repairs.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'iPhone Screen Repair Rosebank',
  description: 'iPhone screen repair for Rosebank clients. Collection from Rosebank, same-day repair at Hyde Park workshop.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Rosebank' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'iPhone Repair', item: 'https://zasupport.com/iphone-repair' },
    { '@type': 'ListItem', position: 3, name: 'Screen Repair', item: 'https://zasupport.com/iphone-repair/screen' },
    { '@type': 'ListItem', position: 4, name: 'Rosebank', item: 'https://zasupport.com/iphone-repair/screen/rosebank' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function IPhoneScreenRepairRosebankPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'iPhone Repair', href: '/iphone-repair' },
            { label: 'Screen Repair', href: '/iphone-repair/screen' },
            { label: 'Rosebank' },
          ]} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              iPhone Screen Repair Rosebank
              <br /><span className="text-[#0FEA7A]">— Hyde Park Workshop</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Cracked iPhone screen? We collect from Rosebank — just 2 km from our Hyde Park workshop. Same-day repair for most iPhone models.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>Rosebank is 2 km from our Hyde Park workshop — fastest collection suburb</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: CheckCircle, label: 'iPhone 12–16 Pro Max' },
                { icon: Zap, label: 'Same-day Repair' },
                { icon: Shield, label: 'Written Warranty' },
                { icon: MapPin, label: 'Collect from Rosebank' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <Icon className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={buildWhatsAppUrl('IPH-SCR-ROSEBANK', 'iphone-repair')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
                WhatsApp for Quote
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all">
                Book Collection <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-6">iPhone Screen Repair for Rosebank Clients</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              Rosebank is one of Johannesburg&apos;s most active retail and commercial hubs, and home to some of the city&apos;s densest residential apartment complexes. A cracked iPhone screen in Rosebank is minutes away from a solution — our Hyde Park workshop at 1 Hyde Lane is approximately 2 km from Rosebank Mall and The Zone.
            </p>
            <p>
              We collect iPhones from Rosebank, complete the screen repair at our workshop, and return the device — often on the same day. We repair all current iPhone OLED models including the iPhone 12 through 16 Pro Max range.
            </p>
            <p>
              Every screen replacement uses a high-quality OLED assembly matched to your iPhone model, and is covered by a written ZA Support warranty. Face ID continues to function normally after our repairs.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-10 text-center">Screen Problems We Fix</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {issues.map((s) => (
              <div key={s.title} className="glass-card p-5">
                <h3 className="text-[#E8F4F1] font-bold mb-2">{s.title}</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="iPhone Screen Repair Rosebank — Common Questions" />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">We Also Serve These Areas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'Sandton iPhone Screen', href: '/iphone-repair/screen/sandton' },
              { label: 'Rosebank Battery', href: '/battery-replacement/rosebank' },
              { label: 'Sandton Battery', href: '/battery-replacement/sandton' },
              { label: 'All iPhone Repairs', href: '/iphone-repair' },
            ].map((area) => (
              <Link key={area.href} href={area.href} className="glass-card p-4 text-center group">
                <span className="text-[#E8F4F1] text-sm font-semibold group-hover:text-[#0FEA7A] transition-colors">{area.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Rosebank iPhone Screen Cracked? We Collect.</h2>
            <p className="text-[#7A9E98] mb-6">Same-day repair for most models. Written warranty. 2 km from your door.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWhatsAppUrl('IPH-SCR-ROSEBANK', 'iphone-repair')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
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
