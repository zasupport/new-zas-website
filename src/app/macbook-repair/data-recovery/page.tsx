import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, CheckCircle, Star, MessageCircle, Shield, Clock, Wrench, HardDrive, AlertTriangle, Database, FileSearch } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQ';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import { CONTACT, buildWhatsAppUrl} from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Data Recovery Johannesburg | ZA Support',
  description:
    'MacBook data recovery in Johannesburg. Recover deleted files, failed hard drives, SSD faults, accidental format, and liquid damage data loss. 95% success rate. No data, no fee. Hyde Park, Johannesburg.',
  alternates: { canonical: 'https://zasupport.com/macbook-repair/data-recovery' },
  keywords: [
    'macbook data recovery johannesburg',
    'recover deleted files mac',
    'hard drive recovery johannesburg',
    'mac data recovery johannesburg',
    'SSD data recovery mac',
    'recover files from broken macbook',
    'macbook hard drive failure johannesburg',
    'data recovery service johannesburg',
  ],
};

const pricingRows = [
  { tier: 'Logical Recovery, Deleted Files / Accidental Format', note: 'Most common' },
  { tier: 'Logical Recovery, OS Corruption / Failed Boot', note: '' },
  { tier: 'Physical SSD Recovery, MacBook Air / Pro', note: 'Chip-level work' },
  { tier: 'Liquid Damage + Data Recovery', note: 'Combined service' },
  { tier: 'Emergency Same-Day Recovery', note: 'Subject to availability' },
];

const whatWeRecover = [
  { icon: <FileSearch className="w-5 h-5" />, title: 'Documents & Spreadsheets', desc: 'Word files, Excel, Pages, Numbers, PDFs, regardless of whether the files were deleted, corrupted, or the drive failed to mount.' },
  { icon: <Database className="w-5 h-5" />, title: 'Photos & Videos', desc: 'Camera roll imports, Final Cut Pro projects, Lightroom libraries, iMovie archives, recovered from internal drives and external media.' },
  { icon: <HardDrive className="w-5 h-5" />, title: 'Emails & Contacts', desc: 'Apple Mail databases, Outlook PST and OLM archives, Contacts libraries, recovered from failed drives before migrating to a new machine.' },
  { icon: <Shield className="w-5 h-5" />, title: 'Xcode Projects & Code', desc: 'Developer project directories, Git repositories, database dumps, if you were not pushing to GitHub regularly, we can recover local history.' },
  { icon: <AlertTriangle className="w-5 h-5" />, title: 'Accounting & Financial Data', desc: 'QuickBooks, Sage, and Xero local databases. Payroll files. Invoicing records. We prioritise these as time-sensitive recoveries.' },
  { icon: <FileSearch className="w-5 h-5" />, title: 'Medical & Practice Records', desc: 'Patient record exports, GoodX backups, diagnostic imaging. We follow POPIA-compliant handling for all medical practice data recoveries.' },
  { icon: <Database className="w-5 h-5" />, title: 'Creative Projects', desc: 'Adobe Premiere, Photoshop, InDesign, Illustrator project files. Logic Pro and GarageBand sessions. Recovered from failed internal SSDs.' },
  { icon: <HardDrive className="w-5 h-5" />, title: 'Business Applications', desc: 'Custom database files, legacy application data, backup archives (.zip, .dmg, .sparsebundle), including Time Machine sparse bundles from failed drives.' },
];

const faultTypes = [
  { icon: <AlertTriangle className="w-5 h-5" />, title: 'Accidental Delete', desc: 'Emptied the Trash or deleted files without a backup. Recovery success rate is high if no significant new data has been written to the drive since.' },
  { icon: <HardDrive className="w-5 h-5" />, title: 'Drive Not Mounting', desc: 'MacBook shows no internal drive, or the drive appears as unreadable. Often a firmware fault, partition table corruption, or early-stage physical failure.' },
  { icon: <Database className="w-5 h-5" />, title: 'Accidental Format', desc: 'Drive was wiped or formatted, whether during a reinstall, APFS conversion, or by mistake. Logical recovery tools can reconstruct file structures before overwrite.' },
  { icon: <Shield className="w-5 h-5" />, title: 'macOS Won&apos;t Boot', desc: 'MacBook turns on but gets stuck at the loading bar, shows a folder with a question mark, or cycles to recovery mode. The data is usually intact, it is the OS layer that has failed.' },
  { icon: <AlertTriangle className="w-5 h-5" />, title: 'Liquid Damage', desc: 'If liquid reached the logic board or storage chips, data recovery requires board-level work before any file extraction can begin. Act fast, salt or sugary liquid causes rapid corrosion.' },
  { icon: <HardDrive className="w-5 h-5" />, title: 'SSD Controller Failure', desc: 'Newer MacBook SSDs use Apple-proprietary storage chips soldered to the logic board. Physical controller failure requires specialist equipment, not something a general repair shop can handle.' },
  { icon: <FileSearch className="w-5 h-5" />, title: 'Ransomware / Malware Encryption', desc: 'Some Mac malware variants encrypt the home folder. If you have a snapshot or Time Machine backup, recovery is often possible without paying the ransom. Contact us immediately.' },
  { icon: <Clock className="w-5 h-5" />, title: 'Old Machine, Can No Longer Boot', desc: 'MacBook Pro 2015 or earlier with a spinning HDD? If the machine no longer powers on, we can remove the drive and recover data to a new machine or external storage.' },
];

const faqs = [
  {
    question: 'How much does MacBook data recovery cost in Johannesburg?',
    answer: 'MacBook data recovery cost depends on the fault type and the volume of data. We provide a assessment fee (from R599) and a written fixed quote before any work begins, if we cannot recover your data, you do not pay.',
  },
  {
    question: 'What is the success rate for MacBook data recovery?',
    answer: 'For logical recovery (deleted files, accidental format, OS corruption), our success rate is approximately 95%. For physical SSD failure where the controller is damaged, success depends on the extent of chip damage, we achieve recovery in roughly 70–80% of physical cases. We will give you an honest assessment after our diagnostic. We do not quote recovery jobs we cannot deliver.',
  },
  {
    question: 'How long does data recovery take?',
    answer: 'Logical recovery for standard volumes (up to 500 GB) typically takes 4–8 hours. Physical SSD recovery requiring chip-level work can take 1–3 business days. If you need emergency same-day recovery, contact us before bringing the machine in, subject to capacity. We will give you a realistic timeline at assessment.',
  },
  {
    question: 'Can you recover data from a MacBook that will not turn on?',
    answer: 'Yes. If the MacBook does not power on due to a logic board fault, battery failure, or liquid damage, we assess whether the storage chips are intact. For MacBooks from 2017 onwards, the SSD chips are soldered to the logic board, we work at the component level to extract data before or after board repair. Bring the machine in as soon as possible to maximise the chance of recovery.',
  },
  {
    question: 'I accidentally formatted my MacBook, can my files be recovered?',
    answer: 'In most cases, yes. When you format a drive, macOS marks the space as available but does not immediately overwrite existing file data. Recovery success depends on how much new data has been written since the format. If you have used the machine significantly after formatting, some files may be partially overwritten. Bring it in immediately and minimise use in the meantime.',
  },
  {
    question: 'Can you recover data from a MacBook with liquid damage?',
    answer: 'Yes. Liquid damage data recovery is one of our most common requests. We first assess the board to determine whether the storage chips have been affected. For most liquid damage cases where the Mac was powered off quickly, the data is recoverable. We recommend bringing the machine in within 48 hours of the incident, corrosion from salt or sugary liquids accelerates over time and can destroy storage chips permanently.',
  },
  {
    question: 'Is my recovered data kept private?',
    answer: 'Yes. We operate under POPIA (Protection of Personal Information Act) for all data recovery work. We do not copy, retain, or transmit your data beyond what is required for the recovery process. Medical and financial data is handled with additional controls. All recovered data is transferred to your own storage media or a secure cloud share, never stored on our systems beyond the recovery period.',
  },
  {
    question: 'What should I do right now to maximise data recovery chances?',
    answer: 'Stop using the machine immediately, every write operation reduces recovery chances. Do not reinstall macOS, run Disk Utility Repair, or attempt a restore from backup on the same drive. If liquid damage occurred, power the machine off immediately and do not attempt to turn it on again. Bring it to us as soon as possible. The faster you act, the higher the recovery rate.',
  },
];

const reviews = [
  {
    name: 'Nkosi M.',
    suburb: 'Sandton',
    rating: 5,
    text: 'Accidentally emptied the Trash on my MacBook Pro with three years of client files. ZA Support recovered everything within five hours. I was prepared to lose it all. Cannot recommend them highly enough.',
    date: 'February 2026',
  },
  {
    name: 'Anja V.',
    suburb: 'Rosebank',
    rating: 5,
    text: 'My MacBook Air stopped booting after a macOS update. ZA Support diagnosed a corrupted APFS container, recovered all my data, and had a fresh OS installed the same day. No data lost.',
    date: 'January 2026',
  },
  {
    name: 'Dr P. Dlamini',
    suburb: 'Hyde Park',
    rating: 5,
    text: 'Spilled water on my MacBook in the practice. Brought it in within an hour. They recovered all patient records and practice files. POPIA-compliant handling throughout. Professional in every respect.',
    date: 'March 2026',
  },
];

const aggregateRatingSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'MacBook Data Recovery Johannesburg',
  description: 'MacBook data recovery service in Johannesburg. Deleted files, failed drives, liquid damage, accidental format. No data, no fee.',
  brand: { '@type': 'Brand', name: 'ZA Support' },
  review: reviews.map((r) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: r.name },
    reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
    reviewBody: r.text,
    datePublished: r.date,
  })),
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Data Recovery Johannesburg',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Suburb', name: 'Sandton' },
    { '@type': 'Suburb', name: 'Rosebank' },
    { '@type': 'Suburb', name: 'Fourways' },
    { '@type': 'Suburb', name: 'Bryanston' },
    { '@type': 'Suburb', name: 'Hyde Park' },
  ],
  description: 'MacBook data recovery in Johannesburg. Deleted files, hard drive failure, SSD faults, accidental format, liquid damage. 95% success rate. No data, no fee.',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'MacBook Repair', item: 'https://zasupport.com/macbook-repair' },
    { '@type': 'ListItem', position: 3, name: 'Data Recovery', item: 'https://zasupport.com/macbook-repair/data-recovery' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function MacBookDataRecoveryPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />
      <SchemaOrg schema={serviceSchema} />

      {/* HERO */}
      <section className="hero-gradient grid-overlay pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'MacBook Repair', href: '/macbook-repair' }, { label: 'Data Recovery' }]} />
          <div className="mt-8 max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[rgba(15,234,122,0.1)] border border-[rgba(15,234,122,0.25)] text-[#0FEA7A] text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <CheckCircle className="w-4 h-4" /> 95% Success Rate · No Data, No Fee · Hyde Park JHB
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Data Recovery<br />
              <span className="text-[#0FEA7A]">Johannesburg</span>

            </h1>
            <p className="text-xl text-[#7A9E98] mb-8 max-w-2xl">
              Deleted files, failed SSD, accidental format, liquid damage, macOS corruption. If your data is on the drive, we will find it. Assessment: from R599. If we cannot recover your data, assessment fee of from R599 applies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={buildWhatsAppUrl('MBR-DATA', 'macbook-repair')}
                className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all text-lg"
               target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5" /> WhatsApp Us
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
               target="_blank" rel="noopener noreferrer">
                <Phone className="w-5 h-5" /> {CONTACT.phone}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-[rgba(255,255,255,0.12)] text-[#E8F4F1] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(255,255,255,0.05)] transition-all"
              >
                Get a Quote <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-[rgba(15,234,122,0.06)] border-y border-[rgba(15,234,122,0.15)] py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { stat: '95%', label: 'Logical Recovery Success Rate' },
              { stat: 'No Data', label: 'No Fee, Zero Risk' },
              { stat: 'POPIA', label: 'Compliant Handling' },
              { stat: 'R599', label: 'Assessment, from' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center">
                <span className="text-2xl font-extrabold text-[#0FEA7A]">{item.stat}</span>
                <span className="text-[#7A9E98] text-sm mt-1">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AGGREGATE RATING */}
      <section className="bg-[#0A1A18] py-10 border-b border-[rgba(255,255,255,0.05)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-6 h-6 fill-[#0FEA7A] text-[#0FEA7A]" />
                ))}
              </div>
              <div>
                <span className="text-3xl font-extrabold text-[#E8F4F1]">4.9</span>
                <span className="text-[#7A9E98] ml-2 text-sm">/ 5 from 98 verified recoveries</span>
              </div>
            </div>
            <p className="text-[#7A9E98] text-sm text-center sm:text-right max-w-xs">
              Mac data recovery, Sandton, Rosebank, Fourways, Bryanston, Hyde Park
            </p>
          </div>
        </div>
      </section>

      {/* PRICING TABLE */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
              Data Recovery <span className="text-[#0FEA7A]">Types</span>
            </h2>
            <p className="text-[#7A9E98] max-w-xl mx-auto">
              Assessment: from R599 first. Written fixed quote before any work begins. If we cannot recover your data, assessment fee of from R599 applies, no exceptions.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden">
              <div className="grid grid-cols-2 px-6 py-3 bg-[rgba(15,234,122,0.07)] border-b border-[rgba(255,255,255,0.08)]">
                <span className="text-[#7A9E98] text-xs font-semibold uppercase tracking-wider">Recovery Type</span>
                <span className="text-[#7A9E98] text-xs font-semibold uppercase tracking-wider text-right">Notes</span>
              </div>
              {pricingRows.map((row, i) => (
                <div
                  key={row.tier}
                  className={`grid grid-cols-2 px-6 py-4 items-center ${i < pricingRows.length - 1 ? 'border-b border-[rgba(255,255,255,0.05)]' : ''} hover:bg-[rgba(15,234,122,0.03)] transition-colors`}
                >
                  <span className="text-[#E8F4F1] text-sm font-medium">{row.tier}</span>
                  <span className="text-[#7A9E98] text-xs text-right">{row.note}</span>
                </div>
              ))}
            </div>
            <p className="text-[#7A9E98] text-xs mt-4 text-center">
              Assessment, recovery labour, and transfer to your storage media included. No hidden fees.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT WE RECOVER */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
              What Data We <span className="text-[#0FEA7A]">Recover</span>
            </h2>
            <p className="text-[#7A9E98] max-w-xl mx-auto">
              From personal photos to practice management databases, if it was on your Mac, we work to get it back.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whatWeRecover.map((item) => (
              <div key={item.title} className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 hover:border-[rgba(15,234,122,0.2)] transition-colors">
                <div className="text-[#0FEA7A] mb-3">{item.icon}</div>
                <h3 className="text-[#E8F4F1] font-bold text-sm mb-2">{item.title}</h3>
                <p className="text-[#7A9E98] text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAULT TYPES */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
              Data Loss Situations <span className="text-[#0FEA7A]">We Handle</span>
            </h2>
            <p className="text-[#7A9E98] max-w-xl mx-auto">
              Recognise your situation? Bring the machine in for a assessment fee (from R599). The sooner you act, the higher the recovery rate.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {faultTypes.map((item) => (
              <div key={item.title} className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 hover:border-[rgba(15,234,122,0.2)] transition-colors">
                <div className="text-[#0FEA7A] mb-3">{item.icon}</div>
                <h3 className="text-[#E8F4F1] font-bold text-sm mb-2">{item.title}</h3>
                <p className="text-[#7A9E98] text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
              Our Recovery <span className="text-[#0FEA7A]">Process</span>
            </h2>
            <p className="text-[#7A9E98]">Transparent at every step. No work begins without your written approval.</p>
          </div>
          <div className="space-y-5">
            {[
              {
                step: '01',
                icon: <Wrench className="w-5 h-5" />,
                title: 'Assessment: from R599',
                desc: 'We image the drive sector-by-sector to a recovery volume before any attempt begins, this protects the original data. We then assess the fault type, determine recovery approach, and confirm what data is visible.',
              },
              {
                step: '02',
                icon: <Shield className="w-5 h-5" />,
                title: 'Written Fixed Quote',
                desc: 'You receive a written price before we begin. If the fault is physical and requires chip-level work, we explain exactly what is involved and what the realistic success rate is for your specific situation.',
              },
              {
                step: '03',
                icon: <Database className="w-5 h-5" />,
                title: 'Recovery Execution',
                desc: 'Logical recovery uses professional forensic tools to reconstruct file structures and recover intact data. Physical recovery uses controlled component-level techniques. You can stay and work from our space while we run the process.',
              },
              {
                step: '04',
                icon: <FileSearch className="w-5 h-5" />,
                title: 'Verification & Handover',
                desc: 'Before we hand data back, you review the recovered file list to confirm everything critical is present. We transfer to your external drive or cloud storage. We do not retain copies.',
              },
              {
                step: '05',
                icon: <CheckCircle className="w-5 h-5" />,
                title: 'Backup Plan',
                desc: 'Once your data is recovered, we discuss a proper backup strategy so this never happens again. Time Machine, cloud sync, and offsite backup options are all covered, matched to your workflow and budget.',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 hover:border-[rgba(15,234,122,0.15)] transition-colors">
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                  <div className="text-2xl font-extrabold text-[#0FEA7A] opacity-40">{item.step}</div>
                  <div className="text-[#0FEA7A] opacity-60">{item.icon}</div>
                </div>
                <div>
                  <h3 className="text-[#E8F4F1] font-bold mb-2">{item.title}</h3>
                  <p className="text-[#7A9E98] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY ZA SUPPORT */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
              Why Johannesburg Mac Owners <span className="text-[#0FEA7A]">Trust ZA Support</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                title: 'No Data, No Fee',
                desc: 'If we cannot recover your data, assessment fee of from R599 applies. We absorb the diagnostic and imaging costs. Zero financial risk to you.',
              },
              {
                title: 'POPIA-Compliant',
                desc: 'Your data is handled under South African privacy law. We do not copy, transmit, or retain your files. Medical and financial data receives enhanced controls.',
              },
              {
                title: 'Forensic Imaging First',
                desc: 'We sector-image the original drive before any recovery attempt. Your source data is never modified. This is the correct approach, not all shops do this.',
              },
              {
                title: 'Medical Practice Specialists',
                desc: 'We understand patient record systems, GoodX, and practice management software. Data recovery for medical practices is a regular part of our work.',
              },
              {
                title: 'Apple-Native Expertise',
                desc: 'APFS, HFS+, Core Storage, and T2/Apple Silicon storage architectures, we work exclusively on Mac. No Windows generalists guessing at Apple file systems.',
              },
              {
                title: 'Hyde Park, Johannesburg',
                desc: '1 Hyde Lane, Second Floor, Office E2004. Accessible from Sandton, Rosebank, Fourways, Bryanston. Walk-ins welcome, call first to confirm same-day capacity.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 hover:border-[rgba(15,234,122,0.2)] transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[rgba(15,234,122,0.12)] flex items-center justify-center mb-4">
                  <CheckCircle className="w-4 h-4 text-[#0FEA7A]" />
                </div>
                <h3 className="text-[#E8F4F1] font-bold mb-2">{item.title}</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
              What Clients Say About <span className="text-[#0FEA7A]">Data Recovery</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div key={review.name} className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 flex flex-col gap-4">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-[#0FEA7A] text-[#0FEA7A]" />
                  ))}
                </div>
                <p className="text-[#7A9E98] text-sm leading-relaxed flex-1">&ldquo;{review.text}&rdquo;</p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[#E8F4F1] font-semibold text-sm">{review.name}</p>
                    <p className="text-[#7A9E98] text-xs">{review.suburb}</p>
                  </div>
                  <span className="text-[#7A9E98] text-xs">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="MacBook Data Recovery, Frequently Asked Questions" />
        </div>
      </section>

      {/* SUBURBS */}
      <section className="py-8 sm:py-16 bg-[#0A1A18] border-t border-[rgba(255,255,255,0.05)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-[#E8F4F1] mb-6 text-center">
            MacBook Data Recovery Near You, <span className="text-[#0FEA7A]">Johannesburg</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Sandton', 'Rosebank', 'Fourways', 'Bryanston', 'Hyde Park',
              'Randburg', 'Midrand', 'Melrose', 'Parkhurst', 'Illovo',
              'Rivonia', 'Morningside', 'Paulshof', 'Sunninghill', 'Woodmead',
            ].map((suburb) => (
              <span key={suburb} className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[#7A9E98] text-sm px-4 py-2 rounded-full hover:border-[rgba(15,234,122,0.2)] hover:text-[#E8F4F1] transition-colors">
                {suburb}
              </span>
            ))}
          </div>
          <p className="text-[#7A9E98] text-sm text-center mt-6">
            Based at <strong className="text-[#E8F4F1]">1 Hyde Lane, Hyde Park, Second Floor, Office E2004, Johannesburg 2196</strong>. Walk-ins welcome, call first to confirm same-day capacity.
          </p>
        </div>
      </section>

      {/* RELATED SERVICES */}
      <section className="py-12 bg-[#071210]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-[#E8F4F1] mb-6">
            Related Services
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: 'MacBook Repair', href: '/macbook-repair' },
              { label: 'Liquid Damage Repair', href: '/liquid-damage' },
              { label: 'Virus & Malware Removal', href: '/macbook-repair/virus-removal' },
              { label: 'Logic Board Repair', href: '/logic-board-repair' },
              { label: 'MacBook Pro Repair', href: '/macbook-pro-repair' },
              { label: 'Battery Replacement', href: '/macbook-repair/battery' },
            ].map(link => (
              <Link key={link.href} href={link.href} className="block p-3 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[#7A9E98] hover:text-[#0FEA7A] hover:border-[#0FEA7A] text-sm transition-colors">
                {link.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BOTTOM */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-3">
              Lost Data on Your MacBook?
            </h2>
            <p className="text-[#7A9E98] mb-2 text-lg">95% success rate. No data recovered, no charge.</p>
            <p className="text-[#7A9E98] text-sm mb-8">Hyde Park, Johannesburg · POPIA-compliant · Stop using the machine and contact us now</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={buildWhatsAppUrl('MBR-DATA', 'macbook-repair')}
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all"
               target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5" /> WhatsApp Us Now
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
               target="_blank" rel="noopener noreferrer">
                <Phone className="w-5 h-5" /> {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
