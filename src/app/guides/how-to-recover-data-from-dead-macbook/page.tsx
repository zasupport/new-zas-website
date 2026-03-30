import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Shield, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'How to Recover Data from a Dead MacBook in 2026 | ZA Support',
  description:
    'Step-by-step guide to recovering data from a dead MacBook. Target Disk Mode, Apple Silicon Share Disk, T2 encryption, SSD removal, and professional options. Johannesburg.',
  alternates: { canonical: 'https://zasupport.com/guides/how-to-recover-data-from-dead-macbook' },
};

const faqs = [
  {
    question: 'Can data be recovered from a dead MacBook Pro with a T2 chip?',
    answer:
      'Yes, but only if the logic board can be repaired first. The T2 chip contains a Secure Enclave Processor (SEP) that encrypts all data on the SSD. The encryption keys are bound to that specific T2 chip, so the SSD cannot be read by any other device. If the logic board is completely destroyed, the data is unrecoverable. In most cases, we can repair the board enough to extract the data, even if the Mac does not fully boot.',
  },
  {
    question: 'How much does MacBook data recovery cost in South Africa?',
    answer:
      'At ZA Support, data recovery assessment starts from R599. Simple recoveries using Target Disk Mode or Share Disk cost R599 to R1,500. Recoveries requiring logic board repair range from R2,500 to R8,000 depending on the fault. Chip-off NAND recovery, which is a last resort, starts from R12,000. We always quote before proceeding, and our No Fix No Fee policy means you only pay if we successfully recover your data.',
  },
  {
    question: 'Can I recover data from a MacBook that got water damage?',
    answer:
      'In most cases, yes. Liquid damage typically corrodes specific circuits on the logic board rather than destroying the SSD or its data. We perform board-level repair to restore enough functionality to access the drive. The critical factor is time: the sooner you bring it in after a spill, the better the chances. Do not attempt to power on a liquid-damaged MacBook, as this can cause short circuits that worsen the damage.',
  },
  {
    question: 'What is Target Disk Mode and does my MacBook support it?',
    answer:
      'Target Disk Mode turns your MacBook into an external drive that another Mac can read. It works on Intel Macs (pre-2020). You hold the T key while booting and connect via Thunderbolt or USB-C to a working Mac. Apple Silicon Macs (M1, M2, M3, M4) do not support Target Disk Mode. Instead, they use Share Disk through macOS Recovery, which serves a similar purpose but requires the Mac to reach the recovery environment.',
  },
  {
    question: 'My MacBook M1 is dead. Can the SSD be removed for data recovery?',
    answer:
      'No. On M1, M2, M3, and M4 MacBooks, the SSD NAND flash chips are soldered directly to the logic board and integrated into the Apple Silicon system-on-chip package. The storage controller and encryption are built into the SoC itself. There is no removable SSD to extract. Data recovery requires repairing the logic board to a functional state, then using Apple Share Disk or a direct boot to copy the data.',
  },
  {
    question: 'Can I use DFU mode to recover data from my MacBook?',
    answer:
      'DFU (Device Firmware Update) mode is useful for T2 Macs (2018 to 2020) with software corruption, not hardware failure. It allows you to restore the firmware and macOS using Apple Configurator 2 on another Mac. If the issue is a corrupted OS or firmware rather than a dead logic board, DFU mode can make the Mac bootable again so you can access your data. It does not work if the hardware itself has failed.',
  },
  {
    question: 'Is data recovery possible after a logic board failure?',
    answer:
      'Yes, this is what we specialise in at ZA Support. Most logic board failures are caused by a specific component, such as a power management IC, USB-C controller, or voltage regulator, rather than total board destruction. We diagnose the fault at component level, repair or replace the failed IC, and restore enough board function to access the SSD. Even if the Mac cannot fully boot, partial board repair often allows data extraction.',
  },
  {
    question: 'How long does MacBook data recovery take?',
    answer:
      'Simple recoveries using Target Disk Mode or Share Disk are typically same-day. Recoveries requiring board-level repair take 2 to 5 business days depending on the complexity of the fault and component availability. Chip-off NAND recovery, which we use only as a last resort, can take 5 to 10 business days. We provide a realistic timeline during the initial assessment.',
  },
  {
    question: 'Should I try to recover data myself before bringing it in?',
    answer:
      'If the MacBook powers on but will not boot, you can safely try Target Disk Mode (Intel) or Recovery Mode Share Disk (Apple Silicon) without risk. However, if the MacBook is completely dead, has liquid damage, or makes unusual sounds, do not attempt to open it or force power it on. Incorrect handling, especially on liquid-damaged boards, can cause irreversible short circuits that destroy data permanently.',
  },
  {
    question: 'What happens to my data if the logic board cannot be repaired?',
    answer:
      'If board-level repair is not possible, the final option is chip-off NAND recovery. This involves desoldering the NAND flash memory chips from the logic board and reading them directly using specialised equipment. This only works on older Macs without T2 or Apple Silicon encryption. For T2 and Apple Silicon Macs where the board is truly beyond repair, the data is unfortunately unrecoverable due to hardware-bound encryption.',
  },
  {
    question: 'Does ZA Support offer a No Fix No Fee guarantee on data recovery?',
    answer:
      'Yes. If we cannot recover your data, you only pay the assessment fee starting from R599. The assessment covers the full diagnostic, including opening the MacBook, inspecting the board under microscope, and determining the exact fault. If we determine recovery is possible and quote a repair, you only pay the full amount once your data is successfully extracted and verified.',
  },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://zasupport.com/guides' },
    { '@type': 'ListItem', position: 3, name: 'How to Recover Data from a Dead MacBook', item: 'https://zasupport.com/guides/how-to-recover-data-from-dead-macbook' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Recover Data from a Dead MacBook',
  description: 'Step-by-step guide covering every method of recovering data from a MacBook that will not turn on, from Target Disk Mode to professional board-level repair.',
  totalTime: 'PT2H',
  estimatedCost: { '@type': 'MonetaryAmount', currency: 'ZAR', value: '599' },
  supply: [
    { '@type': 'HowToSupply', name: 'A second working Mac' },
    { '@type': 'HowToSupply', name: 'Thunderbolt or USB-C cable' },
  ],
  tool: [
    { '@type': 'HowToTool', name: 'Apple Configurator 2 (for DFU mode)' },
  ],
  step: [
    {
      '@type': 'HowToStep',
      name: 'Try Target Disk Mode (Intel Macs)',
      text: 'Hold the T key while powering on the MacBook. Connect it to a working Mac via Thunderbolt or USB-C. The dead MacBook should appear as an external drive in Finder.',
    },
    {
      '@type': 'HowToStep',
      name: 'Try Share Disk in macOS Recovery (Apple Silicon)',
      text: 'Press and hold the power button until you see the Options icon. Select Options, then go to Utilities and choose Share Disk. Connect to another Mac on the same network or via cable.',
    },
    {
      '@type': 'HowToStep',
      name: 'Remove the SSD (2012 to 2017 models)',
      text: 'On MacBook Pro 2012 to 2015 and MacBook Air 2013 to 2017, the SSD uses a proprietary Apple connector. Remove it with a pentalobe screwdriver and use a USB adapter to read it on another Mac.',
    },
    {
      '@type': 'HowToStep',
      name: 'Use DFU Mode for T2 Mac software corruption',
      text: 'Connect the T2 MacBook to a working Mac running Apple Configurator 2. Put the MacBook into DFU mode using the specific key combination for your model. Restore firmware without erasing data.',
    },
    {
      '@type': 'HowToStep',
      name: 'Seek professional board-level repair',
      text: 'If the MacBook is completely dead and self-service methods fail, professional component-level logic board repair can restore enough function to access the SSD and extract data.',
    },
  ],
};

const faqSchema = buildFaqSchema(faqs);

export default function DataRecoveryGuidePage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />
      <SchemaOrg schema={howToSchema} />

      {/* Hero */}
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Guides', href: '/guides' }, { label: 'Recover Data from Dead MacBook' }]} />
          <div className="mt-8 max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.2)] rounded-full px-4 py-2 mb-6">
              <span className="text-[#0FEA7A] text-sm font-semibold">Data Recovery Guide · Assessment from R599 · No Fix No Fee</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] leading-tight mb-4">
              How to Recover Data from<br /><span className="text-[#0FEA7A]">a Dead MacBook</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-6 max-w-3xl leading-relaxed">
              Your MacBook will not turn on, and your data is trapped inside. This guide covers every
              recovery method available in 2026, from the ones you can try at home to the professional
              techniques we use daily at our Hyde Park workshop.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={buildWhatsAppUrl('GUIDE-DATA-RECOVERY', 'data-recovery')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                WhatsApp for Data Recovery
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why data recovery is different now */}
      <section className="py-16 bg-[rgba(39,80,77,0.2)] border-y border-[rgba(15,234,122,0.1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Why MacBook Data Recovery Is Harder Than It Used to Be</h2>
            <p className="text-[#7A9E98] leading-relaxed mb-4">
              Before 2018, recovering data from a dead MacBook was relatively straightforward. You could remove
              the SSD, plug it into an adapter, and read it on another Mac. The drive was a separate, unencrypted
              component. That era is over.
            </p>
            <p className="text-[#7A9E98] leading-relaxed mb-4">
              Apple&apos;s T2 Security Chip, introduced in 2018, added hardware-bound encryption to every MacBook.
              The Secure Enclave Processor (SEP) inside the T2 generates and stores encryption keys that never
              leave the chip. The SSD data is AES-256 encrypted, and those keys are tied to the specific T2 chip
              on your logic board. Remove the SSD, and it is unreadable. Destroy the T2, and the data is gone.
            </p>
            <p className="text-[#7A9E98] leading-relaxed">
              Apple Silicon took this further. On M1, M2, M3, and M4 MacBooks, the SSD controller, Secure Enclave,
              and NAND flash management are all integrated into the system-on-chip (SoC) package. The NAND chips
              are soldered to the logic board, not socketed. There is no removable drive. Data recovery on a dead
              Apple Silicon MacBook requires one thing: a working logic board. This is why{' '}
              <Link href="/logic-board-repair" className="text-[#0FEA7A] underline">logic board repair</Link> and
              data recovery are now inseparable.
            </p>
          </div>
        </div>
      </section>

      {/* Method 1: Target Disk Mode */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="text-4xl font-black text-[rgba(15,234,122,0.2)]">01</span>
                <span className="text-[#0FEA7A] text-sm font-semibold uppercase tracking-wide">Intel Macs Only</span>
              </div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Target Disk Mode</h2>
              <p className="text-[#7A9E98] leading-relaxed mb-4">
                This is the simplest method and works on all Intel-based MacBooks (2009 to 2020). It turns your
                dead MacBook into an external hard drive that a working Mac can read directly.
              </p>
              <div className="space-y-3">
                {[
                  'Connect your MacBook to a working Mac using a Thunderbolt or USB-C cable',
                  'Hold the T key and press the power button on the dead MacBook',
                  'Wait for the Thunderbolt icon to appear on the dead MacBook screen',
                  'The dead MacBook appears as an external drive in Finder on the working Mac',
                  'Copy your files, then eject and disconnect',
                ].map((step, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="text-[#0FEA7A] font-bold text-sm mt-0.5">{i + 1}.</span>
                    <p className="text-[#7A9E98] text-sm">{step}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-[rgba(15,234,122,0.05)] rounded-lg border border-[rgba(15,234,122,0.1)]">
                <p className="text-[#7A9E98] text-sm">
                  <span className="text-[#E8F4F1] font-semibold">Important:</span> Target Disk Mode requires
                  the logic board to partially function. If the MacBook is completely dead with no signs of
                  life (no fan spin, no LED, no charging indicator), this method will not work.
                </p>
              </div>
            </div>

            {/* Method 2: Apple Share Disk */}
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="text-4xl font-black text-[rgba(15,234,122,0.2)]">02</span>
                <span className="text-[#0FEA7A] text-sm font-semibold uppercase tracking-wide">Apple Silicon</span>
              </div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Share Disk via macOS Recovery</h2>
              <p className="text-[#7A9E98] leading-relaxed mb-4">
                Apple Silicon Macs (M1, M2, M3, M4) do not support Target Disk Mode. Instead, Apple provides
                Share Disk through the macOS Recovery environment. This requires the Mac to reach Recovery,
                which means the logic board must be partially functional.
              </p>
              <div className="space-y-3">
                {[
                  'Press and hold the power button until "Loading startup options" appears',
                  'Click Options, then Continue to enter macOS Recovery',
                  'From the menu bar, select Utilities, then Share Disk',
                  'Choose the volume to share and click Start Sharing',
                  'On the working Mac, open Finder and look for the shared volume under Network',
                ].map((step, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="text-[#0FEA7A] font-bold text-sm mt-0.5">{i + 1}.</span>
                    <p className="text-[#7A9E98] text-sm">{step}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-[rgba(15,234,122,0.05)] rounded-lg border border-[rgba(15,234,122,0.1)]">
                <p className="text-[#7A9E98] text-sm">
                  <span className="text-[#E8F4F1] font-semibold">Limitation:</span> Share Disk requires the
                  Mac to boot into Recovery. If the logic board fault prevents this, which is common with power
                  circuit failures, you will need professional board repair first.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Method 3: SSD Removal */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-4xl font-black text-[rgba(15,234,122,0.2)]">03</span>
              <span className="text-[#0FEA7A] text-sm font-semibold uppercase tracking-wide">2012 to 2017 Models</span>
            </div>
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Remove the SSD Physically</h2>
            <p className="text-[#7A9E98] leading-relaxed mb-4">
              MacBook Pro Retina (2012 to 2015) and MacBook Air (2013 to 2017) models have removable SSDs, but
              they use Apple&apos;s proprietary connector, not standard M.2 or SATA. You need a specific adapter
              to read these drives.
            </p>
            <p className="text-[#7A9E98] leading-relaxed mb-4">
              In our Hyde Park workshop, we keep these adapters in stock. The process takes about 15 minutes:
              remove the bottom case with a pentalobe P5 screwdriver, disconnect the battery (important for
              safety), unscrew the single T5 Torx screw holding the SSD, slide it out, and connect it to a
              USB adapter on a working Mac. The data appears unencrypted unless FileVault was enabled, in which
              case you will need the FileVault recovery key or the iCloud account password.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              {[
                { model: 'MacBook Pro Retina 2012–2015', connector: 'Apple 12+16 pin', adapter: 'Sintech or OWC Envoy' },
                { model: 'MacBook Air 2013–2017', connector: 'Apple 12+16 pin', adapter: 'Sintech or OWC Envoy' },
                { model: 'MacBook Pro 2016–2017', connector: 'Apple proprietary', adapter: 'Limited adapter availability' },
              ].map((item) => (
                <div key={item.model} className="glass-card p-4">
                  <p className="text-[#E8F4F1] font-semibold text-sm">{item.model}</p>
                  <p className="text-[#7A9E98] text-xs mt-1">Connector: {item.connector}</p>
                  <p className="text-[#7A9E98] text-xs">Adapter: {item.adapter}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* T2 and Apple Silicon deep dive */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="text-4xl font-black text-[rgba(15,234,122,0.2)]">04</span>
                <span className="text-[#0FEA7A] text-sm font-semibold uppercase tracking-wide">2018 to 2020</span>
              </div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">T2 Chip Data Recovery</h2>
              <p className="text-[#7A9E98] leading-relaxed mb-4">
                The T2 Security Chip fundamentally changed MacBook data recovery. Every byte written to the SSD
                is encrypted by the T2&apos;s hardware AES engine. The encryption keys live inside the T2&apos;s Secure
                Enclave Processor and are unique to each individual chip.
              </p>
              <p className="text-[#7A9E98] leading-relaxed mb-4">
                This means if the logic board is dead, the SSD data is encrypted with keys that only the T2 on
                that specific board can access. You cannot move the SSD to another Mac. You cannot read the NAND
                chips directly. The only path to data recovery is repairing the logic board.
              </p>
              <p className="text-[#7A9E98] leading-relaxed">
                At ZA Support, we see this regularly. A MacBook Pro 2019 comes in after a{' '}
                <Link href="/liquid-damage" className="text-[#0FEA7A] underline">liquid spill</Link>. The board
                has corrosion on the power management circuit. The SSD is physically fine, but the data is locked
                behind T2 encryption. We repair the power circuit, the T2 comes back online, and the data is
                accessible. This is why we say board repair IS data recovery on modern Macs.
              </p>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="text-4xl font-black text-[rgba(15,234,122,0.2)]">05</span>
                <span className="text-[#0FEA7A] text-sm font-semibold uppercase tracking-wide">M1 / M2 / M3 / M4</span>
              </div>
              <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Apple Silicon Data Recovery</h2>
              <p className="text-[#7A9E98] leading-relaxed mb-4">
                Apple Silicon made data recovery even more complex. The SSD is no longer a discrete component. On
                M1 through M4 MacBooks, the NAND flash chips are soldered to the logic board, and the storage
                controller is integrated into the SoC die itself. The Secure Enclave, which manages encryption
                keys, is also part of the SoC.
              </p>
              <p className="text-[#7A9E98] leading-relaxed mb-4">
                The NAND topology on Apple Silicon uses a custom controller with proprietary wear levelling and
                error correction. Even if you could desolder the NAND chips, the data layout is proprietary and
                encrypted. Without the SoC&apos;s storage controller and Secure Enclave, the data is meaningless.
              </p>
              <p className="text-[#7A9E98] leading-relaxed">
                For South African businesses, this has serious implications. Under POPIA, organisations are
                responsible for protecting personal information they process. A dead MacBook with client data
                on it is not just an inconvenience; it is a compliance risk. We have helped several Johannesburg
                medical practices and law firms recover patient and client data from dead Apple Silicon MacBooks
                through board-level repair, keeping them POPIA compliant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DFU Mode */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-4xl font-black text-[rgba(15,234,122,0.2)]">06</span>
              <span className="text-[#0FEA7A] text-sm font-semibold uppercase tracking-wide">Software Corruption Only</span>
            </div>
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">DFU Mode Recovery for T2 Macs</h2>
            <p className="text-[#7A9E98] leading-relaxed mb-4">
              DFU (Device Firmware Update) mode is specifically for T2 MacBooks (2018 to 2020) where the issue is
              software or firmware corruption, not hardware failure. If your MacBook shows no signs of life due
              to a corrupted BridgeOS or macOS, DFU mode can restore the firmware without erasing your data.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              <div className="glass-card p-6">
                <h3 className="text-[#E8F4F1] font-bold mb-3">What You Need</h3>
                <ul className="space-y-2">
                  {[
                    'A second Mac running macOS Catalina or later',
                    'Apple Configurator 2 (free from the App Store)',
                    'A USB-C cable (both ends USB-C)',
                    'The correct key combination for your model',
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2 items-start">
                      <CheckCircle className="w-4 h-4 text-[#0FEA7A] flex-shrink-0 mt-0.5" />
                      <span className="text-[#7A9E98] text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-card p-6">
                <h3 className="text-[#E8F4F1] font-bold mb-3">When DFU Works</h3>
                <ul className="space-y-2">
                  {[
                    'BridgeOS firmware corruption after failed update',
                    'macOS will not boot after interrupted installation',
                    'Mac stuck on Apple logo indefinitely',
                    'T2 chip responding but OS unreachable',
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2 items-start">
                      <CheckCircle className="w-4 h-4 text-[#0FEA7A] flex-shrink-0 mt-0.5" />
                      <span className="text-[#7A9E98] text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-[#7A9E98] leading-relaxed mt-6">
              DFU mode will not help if the logic board has a hardware fault. If the power management IC is
              dead, if there is liquid damage corrosion, or if the T2 chip itself is damaged, DFU mode cannot
              establish communication with the Mac. In these cases, board-level repair is the next step.
            </p>
          </div>
        </div>
      </section>

      {/* Professional options */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-4xl font-black text-[rgba(15,234,122,0.2)]">07</span>
            <span className="text-[#0FEA7A] text-sm font-semibold uppercase tracking-wide">When DIY Methods Fail</span>
          </div>
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Professional Data Recovery Options</h2>
          <p className="text-[#7A9E98] leading-relaxed mb-8 max-w-3xl">
            When self-service methods do not work, professional recovery is the next step. In our experience at
            ZA Support, roughly 70% of &ldquo;dead&rdquo; MacBooks brought to us can have their data recovered
            through board-level repair. Here are the professional methods available.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                title: 'Board-Level Repair',
                desc: 'The most common professional method. We diagnose the specific failed component on the logic board, whether it is a power management IC, USB-C controller, or corroded trace, and repair it. Once the board functions enough to access the SSD, we extract the data. This works for T2 and Apple Silicon Macs where the SSD cannot be removed.',
                price: 'R2,500 to R8,000',
                success: '70% success rate',
              },
              {
                title: 'Chip-Off NAND Recovery',
                desc: 'A last-resort technique for pre-T2 Macs (2017 and older). The NAND flash memory chips are carefully desoldered from the logic board and read using specialised NAND readers. The raw data is then reconstructed. This does not work on T2 or Apple Silicon Macs due to hardware encryption.',
                price: 'From R12,000',
                success: 'Pre-T2 only',
              },
              {
                title: 'Clean Room Recovery',
                desc: 'For older iMacs and Mac Pros with mechanical hard drives (pre-2012). Platters are removed in a dust-free environment and read on donor drive hardware. This is rare in 2026 as most Macs now use SSDs, but we still see the occasional 2011 iMac or Mac mini with a failing HDD.',
                price: 'From R8,000',
                success: 'Mechanical drives only',
              },
            ].map((item) => (
              <div key={item.title} className="glass-card p-6">
                <h3 className="text-[#E8F4F1] font-bold mb-2">{item.title}</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed mb-4">{item.desc}</p>
                <div className="flex items-center gap-3 pt-3 border-t border-[rgba(255,255,255,0.05)]">
                  <span className="text-[#0FEA7A] font-semibold text-sm">{item.price}</span>
                  <span className="text-[#7A9E98] text-xs">{item.success}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What NOT to do */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              <span className="text-red-400 text-sm font-semibold uppercase tracking-wide">Critical Warnings</span>
            </div>
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">What NOT to Do with a Dead MacBook</h2>
            <p className="text-[#7A9E98] leading-relaxed mb-6">
              We see these mistakes regularly at our Hyde Park workshop. Each one can turn a recoverable situation
              into a permanent data loss.
            </p>
            <div className="space-y-4">
              {[
                {
                  title: 'Do not open the MacBook yourself',
                  desc: 'Modern MacBooks have fragile flex cables, battery adhesive, and components that are easily damaged. A slip with a screwdriver can sever the display cable, puncture the battery (lithium fire risk), or crack the logic board. The pentalobe screws also strip easily without the correct driver.',
                },
                {
                  title: 'Do not attempt DIY repair on a liquid-damaged board',
                  desc: 'Liquid damage causes microscopic corrosion that spreads over time. Powering on a liquid-damaged MacBook, even briefly, can cause short circuits that destroy components the liquid did not originally reach. Rice does not help. Isopropyl alcohol without proper tools causes more harm than good.',
                },
                {
                  title: 'Do not use data recovery software on a hardware failure',
                  desc: 'Software recovery tools like Disk Drill or Data Rescue only work when the drive is accessible to the operating system. If the MacBook will not power on, no software can reach the SSD. Running recovery software on a failing drive can also accelerate its degradation.',
                },
                {
                  title: 'Do not take it to a general IT shop',
                  desc: 'Board-level repair requires a stereo microscope, hot air rework station, and component-level diagnostic skills. General IT shops that replace screens and batteries typically do not have this equipment. We have seen boards come in with additional damage from untrained repair attempts.',
                },
                {
                  title: 'Do not delay if there is liquid damage',
                  desc: 'Corrosion from liquid damage gets worse every day. A board that is repairable on day one may be beyond repair after two weeks of corrosion spreading through copper traces and under IC packages. If your MacBook had a spill, bring it in as soon as possible.',
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-4 bg-[rgba(220,38,38,0.05)] rounded-xl border border-[rgba(220,38,38,0.15)]">
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#E8F4F1] font-semibold text-sm">{item.title}</p>
                    <p className="text-[#7A9E98] text-xs mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cost expectations */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Data Recovery Cost in South Africa (2026)</h2>
          <p className="text-[#7A9E98] leading-relaxed mb-8 max-w-3xl">
            Pricing depends on the method required. We always provide a written quote after the initial assessment.
            Our No Fix No Fee policy means you only pay the full amount if we successfully recover your data.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[rgba(15,234,122,0.15)]">
                  <th className="text-left text-[#0FEA7A] py-3 pr-6">Recovery Method</th>
                  <th className="text-left text-[#0FEA7A] py-3 pr-6">Price Range (ZAR)</th>
                  <th className="text-left text-[#0FEA7A] py-3 pr-6">Turnaround</th>
                  <th className="text-left text-[#0FEA7A] py-3">Applies To</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { method: 'Initial Assessment', price: 'From R599', time: 'Same day', applies: 'All MacBooks' },
                  { method: 'Target Disk Mode / Share Disk', price: 'R599 – R1,500', time: 'Same day', applies: 'MacBooks that partially boot' },
                  { method: 'SSD Removal + Adapter', price: 'R899 – R1,500', time: 'Same day', applies: '2012–2017 models only' },
                  { method: 'DFU Firmware Restore', price: 'R899 – R1,500', time: '1–2 days', applies: 'T2 Macs (software fault)' },
                  { method: 'Board-Level Repair + Extraction', price: 'R2,500 – R8,000', time: '2–5 days', applies: 'T2 and Apple Silicon' },
                  { method: 'Chip-Off NAND Recovery', price: 'From R12,000', time: '5–10 days', applies: 'Pre-T2 only (last resort)' },
                  { method: 'Clean Room HDD Recovery', price: 'From R8,000', time: '5–10 days', applies: 'Mechanical drives (older iMacs)' },
                ].map((row, i, arr) => (
                  <tr key={row.method} className={`${i < arr.length - 1 ? 'border-b border-[rgba(255,255,255,0.04)]' : ''}`}>
                    <td className="text-[#E8F4F1] py-3 pr-6 font-medium">{row.method}</td>
                    <td className="text-[#0FEA7A] py-3 pr-6 font-semibold">{row.price}</td>
                    <td className="text-[#7A9E98] py-3 pr-6">{row.time}</td>
                    <td className="text-[#7A9E98] py-3">{row.applies}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <div className="flex items-center gap-3 p-3 bg-[rgba(15,234,122,0.05)] rounded-lg border border-[rgba(15,234,122,0.1)]">
              <Shield className="w-5 h-5 text-[#0FEA7A] flex-shrink-0" />
              <p className="text-[#7A9E98] text-sm"><span className="text-[#E8F4F1] font-semibold">No Fix No Fee</span> — You only pay in full if we recover your data.</p>
            </div>
            <div className="flex items-center gap-3 p-3 bg-[rgba(15,234,122,0.05)] rounded-lg border border-[rgba(15,234,122,0.1)]">
              <Clock className="w-5 h-5 text-[#0FEA7A] flex-shrink-0" />
              <p className="text-[#7A9E98] text-sm"><span className="text-[#E8F4F1] font-semibold">12-Month Warranty</span> — On all board repairs performed during data recovery.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SA context */}
      <section className="py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Why Data Recovery Matters for South African Businesses</h2>
            <p className="text-[#7A9E98] leading-relaxed mb-4">
              South Africa&apos;s load shedding legacy means power surges remain one of the most common causes of
              MacBook logic board failure we see. A sudden power event can destroy the power management IC,
              leaving the MacBook dead and the data locked behind hardware encryption.
            </p>
            <p className="text-[#7A9E98] leading-relaxed mb-4">
              For medical practices, the implications are severe. Patient records stored on a dead MacBook are
              both a POPIA compliance issue and a clinical risk. The Health Professions Council of South Africa
              (HPCSA) requires practitioners to maintain patient records for a minimum period. A dead MacBook
              with no backup strategy is a liability.
            </p>
            <p className="text-[#7A9E98] leading-relaxed">
              We work with several medical practices and professional services firms in Sandton, Rosebank, and
              Hyde Park. Our data recovery service is designed for urgency: same-day assessment, transparent
              quoting, and a clear timeline. We understand that when a practice&apos;s MacBook dies, it is not just
              an IT problem — it is a business continuity event. If you need a{' '}
              <Link href="/battery-replacement" className="text-[#0FEA7A] underline">battery replacement</Link> or
              other preventative maintenance, we recommend proactive servicing to avoid these situations entirely.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="MacBook Data Recovery — Frequently Asked Questions" />
        </div>
      </section>

      {/* Related pages */}
      <section className="py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-[#E8F4F1] mb-6">Related Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {[
              { title: 'Logic Board Repair', href: '/logic-board-repair', label: 'Board repair enables data recovery' },
              { title: 'Liquid Damage Repair', href: '/liquid-damage', label: 'Spill recovery and corrosion clean' },
              { title: 'Battery Replacement', href: '/battery-replacement', label: 'Preventative maintenance' },
              { title: 'Contact Us', href: '/contact', label: 'Book a data recovery assessment' },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="glass-card p-4 flex items-center justify-between group">
                <div>
                  <p className="text-[#E8F4F1] font-semibold text-sm">{item.title}</p>
                  <p className="text-[#0FEA7A] text-xs mt-0.5">{item.label}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#7A9E98] group-hover:text-[#0FEA7A] transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
              Dead MacBook? We Can Recover Your Data.
            </h2>
            <p className="text-[#7A9E98] mb-2">Assessment from R599. No Fix No Fee. 12-month warranty on all board repairs.</p>
            <p className="text-[#7A9E98] text-sm mb-8">1 Hyde Park Lane, Hyde Park, Johannesburg 2196. Same-day diagnostic available.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={buildWhatsAppUrl('GUIDE-DATA-RECOVERY-CTA', 'data-recovery')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                WhatsApp for Data Recovery
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
