import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, MapPin } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Running Slow? 12 Proven Fixes for 2026 | ZA Support',
  description:
    'MacBook running slow? 12 step-by-step fixes from Activity Monitor to SSD upgrades. South Africa pricing, load shedding tips. Free assessment from R599.',
  alternates: { canonical: 'https://zasupport.com/guides/macbook-running-slow' },
};

const faqs = [
  {
    question: 'Why is my MacBook suddenly running slow?',
    answer:
      'The most common cause we see at our Hyde Park workshop is insufficient free storage. macOS needs at least 10% of your SSD free for swap files and caches. Chrome with 30+ tabs open is the second biggest culprit, consuming 4 GB or more of RAM. A quick check of Activity Monitor reveals the exact bottleneck within seconds.',
  },
  {
    question: 'Does restarting actually help a slow MacBook?',
    answer:
      'Yes. A restart clears accumulated memory leaks, resets swap files, and unloads background processes that have stalled. We recommend restarting at least once a week. In South Africa, if your MacBook has been through a load shedding hard shutdown, a clean restart afterwards helps macOS rebuild its disk caches properly.',
  },
  {
    question: 'How much free storage does my MacBook need to run smoothly?',
    answer:
      'Apple recommends keeping at least 10% of your SSD free. On a 256 GB MacBook, that means 25 GB minimum. Below that threshold, macOS cannot manage virtual memory efficiently, and you will notice severe slowdowns. We regularly see MacBooks in our workshop with under 5 GB free storage performing 10x slower than expected.',
  },
  {
    question: 'Is 8 GB RAM enough for a MacBook in 2026?',
    answer:
      'For basic tasks like email, web browsing with under 10 tabs, and document editing, 8 GB is manageable. However, in 2026, modern browsers and macOS itself consume more memory than ever. If you regularly use Zoom, Slack, and Chrome simultaneously, 8 GB will leave you swapping to disk constantly. We assess whether a RAM upgrade (on supported models) or a new machine makes more financial sense.',
  },
  {
    question: 'Can load shedding cause my MacBook to run slowly?',
    answer:
      'Indirectly, yes. Repeated hard shutdowns from load shedding can corrupt disk caches, leave incomplete writes on the SSD, and prevent macOS from finishing background maintenance tasks. We see this regularly in Johannesburg. After a load shedding event, restart your MacBook cleanly and let it idle for 10 minutes so Spotlight and other maintenance processes can complete.',
  },
  {
    question: 'How do I check if my MacBook SSD is failing?',
    answer:
      'Open Disk Utility and check the S.M.A.R.T. status. It should read "Verified". If it reads "Failing" or is absent, your SSD has hardware issues that no software fix will resolve. At ZA Support we run deeper diagnostics that check read/write speeds and error rates. Assessment from R599.',
  },
  {
    question: 'Should I reset SMC and NVRAM to fix a slow MacBook?',
    answer:
      'An SMC reset resolves thermal management and fan speed issues that cause throttling. An NVRAM reset clears startup disk selection and display resolution caches. Neither directly speeds up your Mac, but if thermal throttling or incorrect boot settings are causing the slowdown, these resets address the root cause. Apple Silicon Macs (M1 and later) do not have a traditional SMC or NVRAM reset; a restart handles both.',
  },
  {
    question: 'Is it worth upgrading the SSD in my MacBook?',
    answer:
      'For MacBook Pro and MacBook Air models from 2013 to 2017 with 128 GB or 256 GB SSDs, an upgrade to 512 GB or 1 TB is one of the best value upgrades available. Expect to pay R2,500 to R5,500 depending on capacity. Apple Silicon models (M1 onwards) have soldered storage and cannot be upgraded after purchase.',
  },
  {
    question: 'When should I consider replacing my MacBook instead of fixing it?',
    answer:
      'If your MacBook is an Intel model from 2015 or earlier, it cannot run the latest macOS and will receive no further security updates. Combined with 8 GB RAM and a small SSD, the cost of upgrades approaches the price of a refurbished Apple Silicon MacBook Air. We provide honest assessments at R599 and will tell you when repair is not the best investment.',
  },
  {
    question: 'How long does a MacBook diagnostic assessment take at ZA Support?',
    answer:
      'A standard diagnostic takes 24 to 48 hours and covers CPU performance, SSD health, RAM usage under load, battery condition, and thermal performance. You receive a written report with our findings and a quote for any recommended work. Assessment from R599, and if you proceed with repairs, the fee is deducted from the final invoice.',
  },
  {
    question: 'Does ZA Support collect MacBooks for assessment in Johannesburg?',
    answer:
      'Yes. We collect from Sandton, Rosebank, Fourways, Bryanston, Midrand, Randburg, and surrounding Johannesburg suburbs. WhatsApp 064 529 5863 to arrange same-day collection. No Fix No Fee applies to all assessments.',
  },
];

const faqSchema = buildFaqSchema(faqs);

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://zasupport.com/guides' },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'MacBook Running Slow',
      item: 'https://zasupport.com/guides/macbook-running-slow',
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Fix a Slow MacBook',
  description:
    'A 12-step guide to diagnosing and fixing a slow MacBook, from Activity Monitor checks to hardware upgrades.',
  totalTime: 'PT2H',
  estimatedCost: { '@type': 'MonetaryAmount', currency: 'ZAR', value: '0' },
  tool: [
    { '@type': 'HowToTool', name: 'Activity Monitor (built into macOS)' },
    { '@type': 'HowToTool', name: 'Disk Utility (built into macOS)' },
    { '@type': 'HowToTool', name: 'System Settings' },
  ],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Check Activity Monitor',
      text: 'Open Activity Monitor from Applications > Utilities. Check the CPU tab for processes using over 100% CPU, and the Memory tab for memory pressure (green is fine, yellow means swapping, red means severely constrained).',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Close unnecessary apps and browser tabs',
      text: 'Quit apps you are not actively using. In Chrome, each open tab consumes 100-300 MB of RAM. Close tabs you do not need or use a tab suspender extension.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Restart your MacBook',
      text: 'Click Apple menu > Restart. A clean restart clears memory leaks, resets swap files, and allows macOS to run background maintenance tasks.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Check available storage',
      text: 'Click Apple menu > About This Mac > Storage. If you have less than 10% free space, your MacBook will slow significantly as macOS cannot manage virtual memory.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Clear system junk and caches',
      text: 'Delete old Time Machine local snapshots, iOS device backups in ~/Library/Application Support/MobileSync/Backup/, and clear browser caches. Empty the Trash.',
    },
    {
      '@type': 'HowToStep',
      position: 6,
      name: 'Disable unnecessary login items',
      text: 'Open System Settings > General > Login Items. Remove any apps you do not need launching at startup. Each login item consumes RAM and CPU at boot.',
    },
    {
      '@type': 'HowToStep',
      position: 7,
      name: 'Update macOS',
      text: 'Open System Settings > General > Software Update. Install any pending updates. Apple includes performance optimisations and bug fixes in every release.',
    },
    {
      '@type': 'HowToStep',
      position: 8,
      name: 'Reset SMC and NVRAM (Intel Macs only)',
      text: 'For Intel Macs: shut down, hold Shift+Control+Option+Power for 10 seconds (SMC reset), then restart holding Option+Command+P+R for 20 seconds (NVRAM reset). Apple Silicon Macs reset automatically on restart.',
    },
    {
      '@type': 'HowToStep',
      position: 9,
      name: 'Reinstall macOS',
      text: 'As a last software resort, boot into Recovery Mode (Command+R on Intel, hold Power on Apple Silicon) and reinstall macOS. This replaces system files without erasing your data.',
    },
    {
      '@type': 'HowToStep',
      position: 10,
      name: 'Check for hardware causes',
      text: 'Open Disk Utility and check S.M.A.R.T. status for SSD health. Monitor temperatures using Activity Monitor. If your Mac throttles under light load, the thermal system or SSD may be failing.',
    },
    {
      '@type': 'HowToStep',
      position: 11,
      name: 'Consider the age of your MacBook',
      text: 'Intel MacBooks from 2015 and earlier genuinely struggle with modern macOS. If yours cannot run macOS Ventura or later, security updates have ended and performance will only decline.',
    },
    {
      '@type': 'HowToStep',
      position: 12,
      name: 'Get a professional diagnostic assessment',
      text: 'If software fixes have not resolved the issue, book a diagnostic assessment at ZA Support from R599. We test SSD health, RAM performance, thermal behaviour, and battery condition. No Fix No Fee. WhatsApp 064 529 5863.',
    },
  ],
  provider: LOCAL_BUSINESS_PROVIDER,
};

export default function MacBookRunningSlowGuidePage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />
      <SchemaOrg schema={howToSchema} />

      {/* Hero */}
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[{ label: 'Guides', href: '/guides' }, { label: 'MacBook Running Slow' }]}
          />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Running Slow?
              <br />
              <span className="text-[#0FEA7A]">Here&apos;s How to Speed It Up</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              A practical, step-by-step troubleshooting guide from ZA Support&apos;s workshop in
              Hyde Park, Johannesburg. We&apos;ve diagnosed thousands of slow MacBooks over 16
              years. These are the 12 fixes that actually work, in the order we recommend trying
              them.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>
                Hyde Park, Johannesburg | Assessment from R599 | No Fix No Fee | 12-Month
                Warranty
              </span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {['12 Proven Fixes', 'No Fix No Fee', 'Assessment from R599', 'Same-Day Collection'].map(
                (l) => (
                  <div
                    key={l}
                    className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full"
                  >
                    <CheckCircle className="w-4 h-4 text-[#0FEA7A]" />
                    <span className="text-[#E8F4F1] text-sm font-medium">{l}</span>
                  </div>
                ),
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={buildWhatsAppUrl('GUIDE-SLOW-HERO', 'general', 'Hi, my MacBook is running slow and I need help')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all"
              >
                WhatsApp Us
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

      {/* Introduction */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">
            Why Your MacBook Is Slow (and What Actually Fixes It)
          </h2>
          <div className="text-[#7A9E98] leading-relaxed space-y-4">
            <p>
              A slow MacBook is not something you have to accept. In our Hyde Park workshop, we
              diagnose slow Macs every single day. The cause is almost always one of four things:
              insufficient free storage, too many browser tabs eating RAM, outdated macOS, or a
              genuine hardware fault. Rarely is it &ldquo;your Mac is just old.&rdquo;
            </p>
            <p>
              This guide walks you through the same 12 checks our technicians run, starting with the
              easiest free fixes and progressing to hardware-level diagnostics. Most MacBooks can be
              restored to full speed without spending a cent. When hardware is the culprit, we
              provide honest assessments from R599 with a No Fix No Fee guarantee.
            </p>
            <p>
              In South Africa specifically, load shedding complicates things. Repeated hard shutdowns
              corrupt disk caches and prevent macOS from completing background maintenance. We
              address that directly in this guide.
            </p>
          </div>
        </div>
      </section>

      {/* Steps 1-3: Quick Software Fixes */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8">
            Quick Fixes You Can Do Right Now
          </h2>

          <div className="space-y-8">
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold text-[#E8F4F1] mb-3">
                1. Check Activity Monitor for Resource Hogs
              </h3>
              <div className="text-[#7A9E98] leading-relaxed space-y-3">
                <p>
                  Open <strong className="text-[#E8F4F1]">Activity Monitor</strong> from
                  Applications &gt; Utilities. This is your Mac&apos;s task manager, and it tells
                  you exactly what is consuming your CPU and memory.
                </p>
                <p>
                  Click the <strong className="text-[#E8F4F1]">CPU tab</strong> and sort by &ldquo;%
                  CPU&rdquo; descending. Any process consistently above 100% is a problem. Common
                  culprits include &ldquo;kernel_task&rdquo; (thermal throttling), runaway browser
                  tabs labelled &ldquo;Google Chrome Helper (Renderer)&rdquo;, and &ldquo;mds&rdquo;
                  or &ldquo;mds_stores&rdquo; (Spotlight indexing, which settles after a few hours).
                </p>
                <p>
                  Switch to the <strong className="text-[#E8F4F1]">Memory tab</strong>. The
                  &ldquo;Memory Pressure&rdquo; graph at the bottom is what matters. Green means
                  your Mac has headroom. Yellow means it is actively swapping to disk and
                  performance is degraded. Red means your Mac is severely memory-constrained and will
                  feel unusable.
                </p>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-xl font-bold text-[#E8F4F1] mb-3">
                2. Close Unnecessary Apps and Browser Tabs
              </h3>
              <div className="text-[#7A9E98] leading-relaxed space-y-3">
                <p>
                  Chrome is the single biggest memory consumer on most MacBooks we diagnose. Each
                  open tab uses between 100 MB and 300 MB of RAM. Thirty tabs can consume 4 to 8 GB
                  on their own, which is the entire memory allocation of a base-model MacBook.
                </p>
                <p>
                  Close tabs you are not actively reading. If you keep tabs open as reminders, use
                  bookmarks instead. Consider Safari, which uses significantly less memory per tab on
                  macOS, or install a tab suspender extension in Chrome that unloads inactive tabs.
                </p>
                <p>
                  Quit applications you are not using. A dock full of running apps, each with a dot
                  underneath, means each is consuming RAM. Press{' '}
                  <strong className="text-[#E8F4F1]">Command + Q</strong> (not just close the
                  window) to fully quit an app.
                </p>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-xl font-bold text-[#E8F4F1] mb-3">
                3. Restart Your MacBook
              </h3>
              <div className="text-[#7A9E98] leading-relaxed space-y-3">
                <p>
                  It sounds simple because it is. A proper restart clears accumulated memory leaks,
                  resets swap files, and forces macOS to run its built-in maintenance routines. If
                  you have not restarted in weeks, this alone can make a dramatic difference.
                </p>
                <p>
                  Click{' '}
                  <strong className="text-[#E8F4F1]">Apple menu &gt; Restart</strong>. Wait for the
                  Mac to fully shut down and boot back up. Do not just close and open the lid.
                  Sleep does not clear memory or reset swap.
                </p>
                <p>
                  After a load shedding event, always do a clean restart even if your MacBook
                  appears to be running. The hard shutdown may have left disk caches in an
                  inconsistent state, and a clean restart allows macOS to rebuild them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps 4-7: Storage and System */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8">
            Storage and System Maintenance
          </h2>

          <div className="space-y-8">
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold text-[#E8F4F1] mb-3">
                4. Check Your Available Storage
              </h3>
              <div className="text-[#7A9E98] leading-relaxed space-y-3">
                <p>
                  Click{' '}
                  <strong className="text-[#E8F4F1]">
                    Apple menu &gt; About This Mac &gt; More Info &gt; Storage
                  </strong>
                  . If you have less than 10% of your SSD free, your MacBook will be slow regardless
                  of how fast its processor is.
                </p>
                <p>
                  macOS uses free disk space for virtual memory (swap), application caches, and
                  temporary files. When there is less than 25 GB free on a 256 GB drive, the system
                  has to constantly juggle what stays in memory and what gets written to disk. The
                  result is a Mac that pauses, stutters, and takes seconds to switch between apps.
                </p>
                <p>
                  We see this in our workshop more than any other single cause of slow performance.
                  A MacBook Air with 3 GB free on a 128 GB SSD is essentially unusable. Freeing up
                  even 15 GB often transforms performance immediately.
                </p>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-xl font-bold text-[#E8F4F1] mb-3">
                5. Clear System Junk and Caches
              </h3>
              <div className="text-[#7A9E98] leading-relaxed space-y-3">
                <p>
                  Three areas typically consume the most hidden storage:
                </p>
                <p>
                  <strong className="text-[#E8F4F1]">~/Library/Caches:</strong> Application caches
                  can grow to tens of gigabytes over time. Safari, Chrome, Slack, and Microsoft Teams
                  are the worst offenders. You can safely delete the contents of this folder; apps
                  will rebuild their caches as needed.
                </p>
                <p>
                  <strong className="text-[#E8F4F1]">Time Machine local snapshots:</strong> If you
                  use Time Machine, macOS keeps local snapshots on your internal drive. On a full
                  disk, these can consume 50 GB or more. Open Terminal and run{' '}
                  <code className="bg-[#0A1A18] px-2 py-1 rounded text-[#0FEA7A] text-sm">
                    tmutil listlocalsnapshots /
                  </code>{' '}
                  to see them.
                </p>
                <p>
                  <strong className="text-[#E8F4F1]">Old iOS device backups:</strong> Each iPhone or
                  iPad backup stored locally can be 10 to 60 GB. Find them in ~/Library/Application
                  Support/MobileSync/Backup/ and delete backups for devices you no longer own.
                </p>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-xl font-bold text-[#E8F4F1] mb-3">
                6. Disable Unnecessary Login Items
              </h3>
              <div className="text-[#7A9E98] leading-relaxed space-y-3">
                <p>
                  Open{' '}
                  <strong className="text-[#E8F4F1]">
                    System Settings &gt; General &gt; Login Items
                  </strong>
                  . Every app listed here launches automatically when you start your MacBook. Each
                  one claims a slice of RAM and CPU before you have even opened anything yourself.
                </p>
                <p>
                  Common unnecessary login items include Spotify, Adobe Creative Cloud, Microsoft
                  Teams auto-updater, Google Chrome updater, and various cloud sync agents. Remove
                  anything that does not need to be running the moment you log in. You can always
                  open these apps manually when you need them.
                </p>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-xl font-bold text-[#E8F4F1] mb-3">7. Update macOS</h3>
              <div className="text-[#7A9E98] leading-relaxed space-y-3">
                <p>
                  Open{' '}
                  <strong className="text-[#E8F4F1]">
                    System Settings &gt; General &gt; Software Update
                  </strong>{' '}
                  and install any pending updates. Apple includes performance optimisations, memory
                  management improvements, and bug fixes in every release. Running an outdated macOS
                  version means missing out on these refinements.
                </p>
                <p>
                  If you are several versions behind, consider updating in stages. Large jumps (e.g.
                  Monterey to Sonoma) can be slow and occasionally cause compatibility issues with
                  older apps. Back up with Time Machine before any major update.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps 8-9: Advanced Software */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8">
            Advanced Software Fixes
          </h2>

          <div className="space-y-8">
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold text-[#E8F4F1] mb-3">
                8. Reset SMC and NVRAM
              </h3>
              <div className="text-[#7A9E98] leading-relaxed space-y-3">
                <p>
                  <strong className="text-[#E8F4F1]">Intel Macs only</strong> (Apple Silicon Macs
                  handle this automatically on restart):
                </p>
                <p>
                  <strong className="text-[#E8F4F1]">SMC Reset:</strong> Shut down your MacBook.
                  Hold Shift + Control + Option on the left side of the keyboard, then press the
                  power button. Hold all four keys for 10 seconds, then release. The SMC controls
                  fan speeds, thermal management, and power delivery. If your fans run constantly or
                  your Mac throttles under light load, this often resolves it.
                </p>
                <p>
                  <strong className="text-[#E8F4F1]">NVRAM Reset:</strong> Restart your MacBook and
                  immediately hold Option + Command + P + R for about 20 seconds. This clears
                  startup disk selection, screen resolution, and time zone settings. It resolves boot
                  slowness caused by incorrect startup disk configuration.
                </p>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-xl font-bold text-[#E8F4F1] mb-3">
                9. Reinstall macOS (Last Software Resort)
              </h3>
              <div className="text-[#7A9E98] leading-relaxed space-y-3">
                <p>
                  If none of the above has helped, a macOS reinstall replaces all system files
                  without erasing your personal data. Boot into Recovery Mode (Command + R on Intel
                  Macs, hold the power button on Apple Silicon) and select &ldquo;Reinstall
                  macOS.&rdquo;
                </p>
                <p>
                  This resolves corrupted system files, damaged frameworks, and broken background
                  services. It takes 30 to 90 minutes depending on your internet speed, as the
                  installer downloads a fresh copy of macOS. We always recommend a Time Machine
                  backup before proceeding, even though this process is designed to preserve your
                  data.
                </p>
                <p>
                  For the most thorough result, a clean install (erase and reinstall) followed by
                  migrating data manually gives you the cleanest possible system. This is what we do
                  at ZA Support when all other software fixes have been exhausted.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps 10-12: Hardware */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8">
            Hardware Causes and Upgrades
          </h2>

          <div className="space-y-8">
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold text-[#E8F4F1] mb-3">
                10. Check for Hardware Faults
              </h3>
              <div className="text-[#7A9E98] leading-relaxed space-y-3">
                <p>
                  Three hardware issues cause slowdowns that no software fix can resolve:
                </p>
                <p>
                  <strong className="text-[#E8F4F1]">Failing SSD:</strong> Open Disk Utility and
                  check the S.M.A.R.T. status. &ldquo;Verified&rdquo; is healthy.
                  &ldquo;Failing&rdquo; means imminent data loss and severe performance
                  degradation. An SSD with rising error rates slows every read and write operation
                  on your Mac. In South Africa, SSDs in MacBooks that have endured years of load
                  shedding hard shutdowns show higher failure rates than machines in countries with
                  stable power.
                </p>
                <p>
                  <strong className="text-[#E8F4F1]">Insufficient RAM:</strong> In 2026, 8 GB of
                  RAM is the bare minimum. macOS itself, Chrome, and Zoom together can consume 7 GB
                  before you open a single document. If Activity Monitor consistently shows yellow or
                  red memory pressure, your Mac needs more RAM or fewer simultaneous applications.
                </p>
                <p>
                  <strong className="text-[#E8F4F1]">Thermal throttling:</strong> If your MacBook
                  feels hot and the fans run at full speed, the CPU may be throttling itself to
                  prevent overheating. Dust build-up in the heatsink, dried thermal paste, or a
                  failing fan can cause this. In &ldquo;kernel_task&rdquo; shows high CPU in Activity
                  Monitor, thermal throttling is likely the cause.
                </p>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-xl font-bold text-[#E8F4F1] mb-3">
                11. When It&apos;s Genuinely the Age of Your MacBook
              </h3>
              <div className="text-[#7A9E98] leading-relaxed space-y-3">
                <p>
                  Intel MacBooks from 2015 and earlier are genuinely struggling with modern macOS in
                  2026. These machines shipped with 4 or 8 GB of RAM, slow SATA SSDs (pre-2013
                  models had spinning hard drives), and Intel processors that cannot match the
                  efficiency of Apple Silicon.
                </p>
                <p>
                  If your MacBook cannot run macOS Ventura (2022) or later, Apple has ended security
                  updates for your machine. Performance will decline as apps optimise exclusively for
                  newer systems. A 2012 MacBook Pro running macOS Catalina in 2026 is three major
                  versions behind and increasingly incompatible with modern web standards.
                </p>
                <p>
                  That said, we regularly breathe new life into 2013 to 2017 MacBooks with SSD
                  upgrades and fresh macOS installs. The hardware is capable; it just needs the right
                  maintenance.
                </p>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-xl font-bold text-[#E8F4F1] mb-3">
                12. SSD and RAM Upgrade Options
              </h3>
              <div className="text-[#7A9E98] leading-relaxed space-y-3">
                <p>
                  <strong className="text-[#E8F4F1]">SSD upgrades (2013 to 2017 MacBooks):</strong>{' '}
                  Replacing a 128 GB or 256 GB SSD with a 512 GB or 1 TB NVMe drive is the single
                  best upgrade for older MacBooks. In South Africa, expect to pay R2,500 to R5,500
                  including parts and labour, depending on the capacity. Import costs on quality
                  NVMe drives from overseas add roughly 20% compared to US pricing, but the
                  performance gain is transformational.
                </p>
                <p>
                  <strong className="text-[#E8F4F1]">RAM upgrades (2012 and earlier):</strong>{' '}
                  MacBook Pros from 2012 and earlier have user-upgradeable RAM slots. Upgrading from
                  4 GB to 8 GB or from 8 GB to 16 GB costs R800 to R2,200 for the modules. From
                  2013 onwards, RAM is soldered and cannot be upgraded.
                </p>
                <p>
                  <strong className="text-[#E8F4F1]">
                    Apple Silicon (M1 and later) — no upgrades possible:
                  </strong>{' '}
                  Unified memory and storage are part of the chip package. If your M1, M2, M3, or M4
                  MacBook is slow, the issue is software-related or a hardware fault, not a capacity
                  problem you can upgrade your way out of. This is where a professional diagnostic at
                  R599 identifies the exact cause.
                </p>
                <p>
                  <strong className="text-[#E8F4F1]">When to buy new:</strong> If your MacBook is
                  Intel, has 8 GB soldered RAM, a 128 GB SSD, and cannot run macOS Ventura, the
                  combined cost of an SSD upgrade and the machine&apos;s age mean a refurbished M1
                  MacBook Air (from around R12,000 to R15,000 in South Africa) is often the better
                  investment. We will tell you honestly at your R599 assessment if repair or
                  replacement makes more financial sense.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="MacBook Running Slow — Common Questions" />
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Services</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: 'Logic Board Repair', href: '/logic-board-repair' },
              { label: 'Battery Replacement', href: '/battery-replacement' },
              { label: 'SSD Upgrade', href: '/ssd-upgrade' },
              { label: 'Liquid Damage Repair', href: '/liquid-damage' },
              { label: 'MacBook Pro Repair', href: '/macbook-pro-repair' },
              { label: 'MacBook Air Repair', href: '/macbook-air-repair' },
              { label: 'MacBook Not Turning On', href: '/macbook-not-turning-on' },
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

      {/* CTA */}
      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">
              Still Slow? Get a Professional Diagnostic from R599.
            </h2>
            <p className="text-[#7A9E98] mb-6">
              We test SSD health, RAM performance, thermals, and battery condition. Collection from
              Sandton, Rosebank, Fourways, Bryanston, Midrand, and Randburg. No Fix No Fee.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={buildWhatsAppUrl('GUIDE-SLOW-CTA', 'general', 'Hi, my MacBook is running slow and I need a diagnostic')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                WhatsApp for Assessment
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
