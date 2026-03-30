import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Monitor, AlertTriangle, CheckCircle, Shield, Zap, Cpu, MapPin, Lightbulb } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, buildBreadcrumbSchema } from '@/lib/schema';
import GoogleReviews from '@/components/ui/GoogleReviews';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CONTACT, SITE, buildWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MacBook Screen Flickering? Causes & Fixes for 2026 | ZA Support',
  description:
    'MacBook screen flickering? Diagnose Flexgate, GPU faults, backlight IC failure and more. Step-by-step fixes plus professional board-level repair in Johannesburg.',
  alternates: { canonical: 'https://zasupport.com/guides/macbook-screen-flickering' },
  keywords: [
    'MacBook screen flickering',
    'MacBook Pro screen flicker fix',
    'MacBook display flickering causes',
    'Flexgate MacBook Pro repair',
    'MacBook backlight flickering',
    'MacBook GPU artifacts fix',
    'MacBook screen flickering Johannesburg',
    'MacBook Pro display cable fault',
    'MacBook screen flicker after update',
    'MacBook screen flickering repair South Africa',
    'MacBook Pro backlight IC failure',
    'iMac T-Con board repair',
  ],
};

const breadcrumbItems = [
  { label: 'Guides', href: '/guides' },
  { label: 'MacBook Screen Flickering' },
];

const breadcrumbSchemaItems = [
  { name: 'Home', url: 'https://zasupport.com' },
  { name: 'Guides', url: 'https://zasupport.com/guides' },
  { name: 'MacBook Screen Flickering', url: 'https://zasupport.com/guides/macbook-screen-flickering' },
];

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Diagnose and Fix MacBook Screen Flickering',
  description:
    'A step-by-step troubleshooting guide for MacBook screen flickering, covering software resets, hardware isolation, and when to seek professional board-level repair.',
  totalTime: 'PT45M',
  estimatedCost: {
    '@type': 'MonetaryAmount',
    currency: 'ZAR',
    value: '0-599',
  },
  tool: [
    { '@type': 'HowToTool', name: 'External display and cable (HDMI or USB-C)' },
    { '@type': 'HowToTool', name: 'Torch or phone flashlight' },
  ],
  step: [
    {
      '@type': 'HowToStep',
      name: 'Restart your MacBook',
      text: 'Click Apple menu then Restart. A clean restart clears GPU frame buffer state, flushes display driver caches, and resolves transient software glitches that can cause flickering.',
      position: 1,
    },
    {
      '@type': 'HowToStep',
      name: 'Reset NVRAM or PRAM (Intel Macs)',
      text: 'Shut down, then power on and immediately hold Option + Command + P + R for 20 seconds. NVRAM stores display resolution, refresh rate, and brightness settings that can become corrupted.',
      position: 2,
    },
    {
      '@type': 'HowToStep',
      name: 'Reset SMC (Intel) or force restart (Apple Silicon)',
      text: 'Intel: shut down, hold Control + Shift + Option + Power for 10 seconds, then release and power on. Apple Silicon: hold the power button for 10 seconds to force restart. The SMC controls backlight PWM timing and display power sequencing.',
      position: 3,
    },
    {
      '@type': 'HowToStep',
      name: 'Check display settings',
      text: 'Open System Settings then Displays. Toggle off True Tone, Night Shift, and auto-brightness individually to isolate software-driven flicker from hardware faults.',
      position: 4,
    },
    {
      '@type': 'HowToStep',
      name: 'Update macOS',
      text: 'Go to System Settings then General then Software Update. Apple regularly patches GPU driver bugs and display controller firmware. macOS Sonoma 14.3 and Sequoia 15.1 both contained display-related fixes.',
      position: 5,
    },
    {
      '@type': 'HowToStep',
      name: 'Boot into Safe Mode',
      text: 'Intel: restart and hold Shift until the login screen. Apple Silicon: shut down, hold power until Loading Startup Options appears, select your disk and hold Shift then Continue in Safe Mode. Safe Mode disables third-party kernel extensions and GPU-accelerated compositing.',
      position: 6,
    },
    {
      '@type': 'HowToStep',
      name: 'Test with an external display',
      text: 'Connect an external monitor via HDMI or USB-C. If the external display is stable and only the built-in screen flickers, the fault is in the display panel, backlight, or display cable. If the external also flickers, the fault is the GPU or logic board.',
      position: 7,
    },
    {
      '@type': 'HowToStep',
      name: 'Perform torch test for backlight IC failure',
      text: 'In a dark room, shine a torch at a low angle against the display. If you can faintly see the desktop image, the LCD panel and GPU are working but the backlight circuit has failed. This points to backlight IC failure on the logic board.',
      position: 8,
    },
    {
      '@type': 'HowToStep',
      name: 'Seek professional board-level diagnosis',
      text: 'If software steps do not resolve the flicker, the fault is hardware: Flexgate cable (2016-2019 models), backlight IC, GPU BGA solder failure, or T-Con board (iMac). Contact ZA Support for a component-level diagnostic from R599.',
      position: 9,
    },
  ],
};

const faqs = [
  {
    question: 'Why is my MacBook screen flickering?',
    answer:
      'MacBook screen flickering has four main causes: software glitches (GPU driver bugs, corrupted NVRAM settings), display cable faults (the Flexgate issue on 2016 to 2019 MacBook Pros where the backlight cable cracks at the hinge), backlight IC failure on the logic board (common after load shedding surges in Johannesburg), and GPU faults (failing BGA solder joints causing artifacts and horizontal lines). A restart or NVRAM reset resolves software causes. Hardware causes require professional diagnosis.',
  },
  {
    question: 'Can a software update fix MacBook screen flickering?',
    answer:
      'Yes, if the flicker is caused by a GPU driver bug or display compositor issue. Apple has released multiple macOS updates that specifically address display-related bugs. macOS Sonoma 14.3 fixed a flickering issue on external displays, and Sequoia 15.1 patched GPU rendering anomalies on M3 machines. Always update to the latest macOS version as a first troubleshooting step. If the flicker persists after updating, the cause is almost certainly hardware.',
  },
  {
    question: 'What is Flexgate and does it cause screen flickering?',
    answer:
      'Flexgate is a design flaw in 2016 to 2019 MacBook Pro models (A1706, A1708, A1989, A2159) where the display backlight flex cable is too short and cracks from repeated hinge movement. Early symptoms include flickering at specific lid angles and a bright spotlight effect along the bottom edge of the screen. Advanced Flexgate causes total backlight failure. Apple ran a repair programme for some affected machines, but coverage has expired. We repair Flexgate at cable level in our Hyde Park workshop.',
  },
  {
    question: 'How do I know if my MacBook screen flicker is hardware or software?',
    answer:
      'Boot into Safe Mode (Intel: hold Shift during startup; Apple Silicon: hold power button then select Safe Mode). Safe Mode disables third-party extensions and GPU compositing. If the flicker stops in Safe Mode, the cause is software — likely a third-party app or driver. If the flicker continues in Safe Mode, the cause is hardware: display cable, backlight IC, or GPU. An external display test further isolates the fault: if external works fine but built-in flickers, it is the display or cable. If both flicker, it is the GPU or logic board.',
  },
  {
    question: 'Can load shedding cause MacBook screen flickering in South Africa?',
    answer:
      'Absolutely. Load shedding is the single most common preventable cause of MacBook backlight failure we see in Johannesburg. When Eskom restores power after a stage 4 or stage 6 outage, the inrush voltage spike travels through the USB-C charger onto the backlight power rail and damages the backlight driver IC on the logic board. The symptom is a dim or flickering backlight, or a completely dark screen on a machine that otherwise works normally. A true sine wave UPS prevents this entirely. We repair backlight IC damage at component level from R1,499.',
  },
  {
    question: 'What does MacBook GPU failure look like?',
    answer:
      'GPU failure on a MacBook manifests as horizontal or vertical coloured lines across the screen, graphical artifacts (blocks, squares, or corrupted text), screen flickering that worsens under GPU load (video playback, graphics-intensive apps), and kernel panics with GPU-related error messages. On older Intel MacBook Pros with discrete AMD GPUs, this is typically caused by failing BGA solder joints between the GPU chip and the logic board. On Apple Silicon machines, GPU failure is rare but indicates a logic board fault. Both require board-level repair.',
  },
  {
    question: 'How much does it cost to fix MacBook screen flickering in Johannesburg?',
    answer:
      'The cost depends on the root cause. Software fixes (NVRAM reset, macOS update, Safe Mode isolation) cost nothing. Display cable or Flexgate repair starts from R1,499. Backlight IC repair on the logic board starts from R1,499. Full display assembly replacement starts from R3,499 for Intel models and R3,999 for M1 and M2 models. GPU or logic board repair starts from R2,499. Our assessment fee is R599, which is applied toward the repair cost if you proceed. No Fix No Fee on every job.',
  },
  {
    question: 'My MacBook screen flickers only at certain lid angles. What is wrong?',
    answer:
      'Flickering that tracks with lid position — worse at certain angles, stable at others — is almost always a display flex cable fault. On 2016 to 2019 MacBook Pro models this is the well-documented Flexgate issue. On other models, repeated hinge movement over years causes micro-fractures in the flex cable. The diagnostic is straightforward: slowly open and close the lid while watching the screen. If the flicker follows the hinge position, it is the cable. We repair this at component level without replacing the entire display assembly.',
  },
  {
    question: 'What is a backlight IC and can it cause screen flickering?',
    answer:
      'The backlight IC (integrated circuit) is a small surface-mounted chip on the logic board that controls power delivery to the LED backlight array behind the LCD panel. When it partially fails, the backlight flickers, dims unevenly, or cuts out intermittently. A full failure produces a completely dark screen — the torch test confirms this: shine a torch at a low angle against the display and if you can faintly see the desktop image, the backlight IC is the cause. We repair this at component level in our Hyde Park workshop from R1,499.',
  },
  {
    question: 'Can an iMac screen flicker? What causes it?',
    answer:
      'Yes. iMac screen flickering is commonly caused by T-Con (timing controller) board failure. The T-Con board sits behind the display panel and controls the signal timing between the logic board and the LCD. When it fails, the screen flickers, shows horizontal banding, or displays washed-out colours. On 27-inch iMacs (A1419, A2115), the T-Con board is a separate replaceable component. Load shedding surges in Johannesburg are a frequent trigger. We diagnose and repair T-Con board faults at component level.',
  },
  {
    question: 'Does ZA Support offer a warranty on screen flickering repairs?',
    answer:
      'Yes. All display cable, backlight IC, GPU, and T-Con board repairs at ZA Support carry a 12-month warranty covering both parts and labour. Display assembly replacements carry our standard up-to-3 year warranty. We provide a formal job card documenting the fault and repair performed, and can issue a VAT invoice for insurance claims. Our No Fix No Fee policy means you pay nothing if we cannot resolve the flickering.',
  },
  {
    question: 'Should I reset NVRAM or SMC first for screen flickering?',
    answer:
      'Reset NVRAM first, then SMC. NVRAM stores display resolution, brightness, and refresh rate settings — corrupted NVRAM values are a more common cause of display anomalies than SMC faults. If the NVRAM reset does not resolve the flicker, an SMC reset addresses backlight PWM timing and display power sequencing. On Apple Silicon Macs there is no NVRAM or SMC reset — a force restart (hold power for 10 seconds) achieves the equivalent. Both resets are safe and do not affect your data.',
  },
];

const faqSchema = buildFaqSchema(faqs);
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbSchemaItems);

export default function MacBookScreenFlickeringGuidePage() {
  const whatsappUrl = buildWhatsAppUrl('GUIDE-FLICKER-HERO', 'screen-repair');

  return (
    <>
      <SchemaOrg schema={howToSchema} />
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      {/* Hero */}
      <section className="hero-gradient grid-overlay pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Screen Flickering?
              <br /><span className="text-[#0FEA7A]">Here&apos;s What&apos;s Causing It</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              We have repaired thousands of flickering MacBook screens since 2009 — from simple software glitches to Flexgate cable failures, backlight IC damage from load shedding, and GPU faults requiring BGA rework. This guide walks you through every troubleshooting step we use in our Hyde Park workshop, so you can isolate the cause before bringing your machine in.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>1 Hyde Park Lane, Hyde Park, JHB 2196 | Assessment from R599 | No Fix No Fee</span>
            </div>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Shield, label: 'No Fix No Fee' },
                { icon: Cpu, label: 'Board-Level Specialists' },
                { icon: CheckCircle, label: '12-Month Warranty' },
                { icon: Zap, label: 'Assessment from R599' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-3 py-2 rounded-full">
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
                WhatsApp Us Your Serial Number
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
            <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)]">
              {[
                { value: SITE.repairsCount, label: 'Repairs Since 2009' },
                { value: SITE.yearsExperience + ' Years', label: 'In Business' },
                { value: SITE.rating + '/5', label: SITE.reviewCount + ' Google Reviews' },
                { value: '12 Months', label: 'Repair Warranty' },
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

      {/* Software Troubleshooting Steps */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">Software Fixes You Can Try Right Now</h2>
          <p className="text-[#7A9E98] mb-8 max-w-3xl leading-relaxed">
            Before you assume the worst, roughly 30% of the flickering MacBooks we assess in Johannesburg turn out to have software-related causes. Work through these steps in order — each one takes under five minutes and costs nothing.
          </p>
          <div className="space-y-6">
            {[
              {
                step: '01',
                title: 'Restart Your MacBook',
                desc: 'The most basic step, but it genuinely resolves a surprising number of flicker cases. A restart clears the GPU frame buffer, flushes display driver caches, and terminates any misbehaving process that may be sending corrupted frames to the display controller. Click the Apple menu, then Restart. Do not use Sleep — a full restart is required. If the flicker appeared immediately after installing an app or running a heavy workload, the restart alone may resolve it permanently.',
              },
              {
                step: '02',
                title: 'Reset NVRAM / PRAM (Intel Macs Only)',
                desc: 'NVRAM (non-volatile random-access memory) stores display resolution, refresh rate, brightness, and startup disk selection. Corrupted NVRAM values can cause the display to flicker, show incorrect resolution, or cycle brightness erratically. To reset: shut down your Mac, press the power button, then immediately hold Option + Command + P + R for about 20 seconds. You will hear the startup chime twice on older models or see the Apple logo appear and disappear twice on newer Intel models. Apple Silicon Macs do not have a user-accessible NVRAM reset — a force restart serves the same purpose.',
              },
              {
                step: '03',
                title: 'Reset SMC (Intel) or Force Restart (Apple Silicon)',
                desc: 'The SMC (System Management Controller) governs backlight PWM (pulse-width modulation) timing, display power sequencing, and thermal management — all of which influence display behaviour. On Intel MacBooks with a T2 chip: shut down, hold Control + Shift + Option on the left side plus the Power button for 10 seconds simultaneously, then release all keys and power on normally. On older Intel models without T2: shut down, unplug power, hold the power button for 10 seconds. On Apple Silicon: hold the power button for 10 seconds to force restart. This resets the equivalent power management subsystem.',
              },
              {
                step: '04',
                title: 'Check Display Settings: Night Shift, True Tone, Auto-Brightness',
                desc: 'Open System Settings, then Displays. Toggle off True Tone, Night Shift, and auto-brightness one at a time, waiting 30 seconds between each change. True Tone uses the ambient light sensor to adjust colour temperature, and a faulty sensor or intermittent sensor cable connection can cause visible colour shifts that look like flickering. Auto-brightness adjusts the backlight level based on ambient light, and a malfunctioning sensor can cause the brightness to cycle rapidly. Night Shift shifts colour temperature on a schedule and can produce visible transitions. Disabling these individually helps isolate the cause.',
              },
              {
                step: '05',
                title: 'Update macOS',
                desc: 'Navigate to System Settings, then General, then Software Update. Apple regularly patches GPU driver bugs and display controller firmware in macOS updates. macOS Sonoma 14.3 specifically addressed a display flickering issue on external monitors, and Sequoia 15.1 patched GPU rendering anomalies on M3-based machines. We have seen clients in Sandton and Bryanston whose flickering resolved entirely after a pending macOS update was installed. Always update to the latest version before pursuing hardware diagnosis — it is free and takes 20 to 40 minutes.',
              },
              {
                step: '06',
                title: 'Boot into Safe Mode',
                desc: 'Safe Mode disables all third-party kernel extensions, login items, and non-essential system extensions, and it forces the GPU to use basic compositing without hardware acceleration. On Intel Macs: restart and hold Shift until the login screen appears — you will see "Safe Boot" in the menu bar. On Apple Silicon: shut down completely, hold the power button until "Loading Startup Options" appears, select your startup disk, then hold Shift and click "Continue in Safe Mode". If the flickering stops in Safe Mode, the cause is a third-party application or kernel extension. Common culprits we see in Johannesburg include outdated screen-recording software, older versions of Parallels Desktop, and third-party display management utilities.',
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-5">
                <div className="w-12 h-12 rounded-full bg-[rgba(15,234,122,0.1)] border border-[rgba(15,234,122,0.2)] flex items-center justify-center flex-shrink-0">
                  <span className="text-[#0FEA7A] font-bold text-sm">{step}</span>
                </div>
                <div>
                  <h3 className="text-[#E8F4F1] font-semibold mb-1">{title}</h3>
                  <p className="text-[#7A9E98] leading-relaxed text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hardware Isolation */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">Hardware Isolation: The External Display Test</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              If all six software steps above failed to resolve the flicker, you are dealing with a hardware fault. The single most useful diagnostic you can perform at home is the external display test. Connect your MacBook to any external monitor or television using a USB-C to HDMI cable (or Thunderbolt to HDMI adapter for older models). Mirror your display in System Settings so both screens show the same content.
            </p>
            <p>
              <strong className="text-[#E8F4F1]">If the external display is stable and only your built-in screen flickers</strong>, the fault is localised to the display assembly, backlight circuit, or display flex cable. This rules out the GPU and logic board processor. On 2016 to 2019 MacBook Pros, the most common cause in this scenario is Flexgate — the display backlight cable cracking at the hinge. On M1 and M2 machines, it is more likely backlight IC damage, particularly if you have experienced load shedding without a UPS.
            </p>
            <p>
              <strong className="text-[#E8F4F1]">If the external display also flickers or shows artifacts</strong>, the fault is in the GPU itself or the logic board&apos;s display output circuitry. On Intel MacBook Pros with discrete AMD Radeon GPUs (15-inch and 16-inch models from 2015 to 2019), this typically indicates failing BGA solder joints between the GPU die and the logic board substrate — a fault that worsens over time and under thermal stress. On Apple Silicon machines, GPU failure is uncommon but indicates a logic board fault. Both scenarios require board-level repair.
            </p>
          </div>
        </div>
      </section>

      {/* Hardware Causes */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">Hardware Causes of MacBook Screen Flickering</h2>
          <p className="text-[#7A9E98] mb-8 max-w-3xl">
            These are the four hardware faults we diagnose most frequently when a MacBook or iMac arrives at our Hyde Park workshop with a flickering display.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: 'Flexgate — Display Cable Failure (2016–2019 MacBook Pro)',
                icon: AlertTriangle,
                severity: 'high' as const,
                desc: 'Apple routed the display backlight flex cable through the hinge on 2016 to 2019 MacBook Pro models (A1706, A1708, A1989, A2159), and the cable is physically too short for the hinge travel distance. After several hundred lid cycles, the cable develops micro-fractures near the hinge pivot. Early symptoms: flickering at specific lid angles, a bright "stage light" strip along the bottom of the screen when the lid is near-closed. Advanced symptoms: total backlight failure. We see multiple Flexgate cases per month from clients in Sandton, Rosebank, and Midrand. The repair involves replacing the display cable assembly — significantly cheaper than a full display replacement.',
              },
              {
                title: 'GPU Failure — Artifacts, Lines, and Kernel Panics',
                icon: Monitor,
                severity: 'high' as const,
                desc: 'GPU failure produces horizontal or vertical coloured lines, graphical artifacts (corrupted blocks, garbled text, colour banding), and in severe cases, kernel panics with GPU error codes. On Intel MacBook Pros with discrete AMD Radeon GPUs (2015 to 2019 15-inch and 16-inch models), the root cause is typically BGA (ball grid array) solder joint failure between the GPU die and the logic board. Thermal cycling over years weakens the solder connections. Repair options include BGA reflow (re-melting solder under controlled heat) and BGA reballing (replacing solder balls entirely). This is logic board level work — no amount of software troubleshooting can resolve it.',
              },
              {
                title: 'Backlight IC Failure — Dim or Flickering Backlight',
                icon: Zap,
                severity: 'high' as const,
                desc: 'The backlight driver IC is a surface-mounted chip on the logic board that regulates power to the LED backlight array behind the LCD panel. Partial failure causes the backlight to flicker, pulse, or dim unevenly. Complete failure produces a dark screen that passes the torch test — shine a torch at a low angle and you will see the desktop image faintly, confirming the LCD panel and GPU are working but the backlight is dead. In Johannesburg, load shedding voltage surges through USB-C chargers are the leading cause. Clients in Fourways, Bryanston, and Midrand who leave their MacBook plugged in during outages are particularly affected. We repair the backlight IC at component level from R1,499 — no logic board swap needed.',
              },
              {
                title: 'T-Con Board Failure (iMac)',
                icon: Lightbulb,
                severity: 'medium' as const,
                desc: 'The T-Con (timing controller) board sits behind the iMac display panel and converts the logic board video signal into the precise timing signals the LCD panel requires. When it fails, symptoms include screen flickering, horizontal banding, colour washout, and intermittent blackouts. On 27-inch iMacs (A1419 and A2115), the T-Con board is a separate, replaceable component — meaning the repair does not require replacing the entire display assembly or logic board. Load shedding surges are a common trigger for T-Con failures in Johannesburg. We diagnose T-Con faults by substituting a known-good board during assessment.',
              },
            ].map((fault) => {
              const Icon = fault.icon;
              const severityColours = {
                high: 'border-[rgba(245,87,54,0.25)] bg-[rgba(245,87,54,0.04)]',
                medium: 'border-[rgba(245,166,35,0.25)] bg-[rgba(245,166,35,0.04)]',
              };
              const severityBadgeColours = {
                high: 'text-[#F55736] bg-[rgba(245,87,54,0.1)]',
                medium: 'text-[#F5A623] bg-[rgba(245,166,35,0.1)]',
              };
              const severityLabels = { high: 'Common', medium: 'Moderate' };
              return (
                <div
                  key={fault.title}
                  className={`rounded-2xl border p-6 ${severityColours[fault.severity]}`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-[rgba(15,234,122,0.08)] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[#0FEA7A]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-[#E8F4F1] font-semibold text-sm leading-tight">{fault.title}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${severityBadgeColours[fault.severity]}`}>
                          {severityLabels[fault.severity]}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-[#7A9E98] text-sm leading-relaxed">{fault.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Load Shedding Section */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">Load Shedding and MacBook Display Damage in South Africa</h2>
          <div className="space-y-4 text-[#7A9E98] leading-relaxed">
            <p>
              We need to address this directly because it is the single largest preventable cause of MacBook screen flickering we see in Johannesburg. Load shedding creates two dangerous electrical events for your MacBook: the initial power drop (which your battery handles gracefully) and the power restoration surge (which your charger does not filter).
            </p>
            <p>
              When Eskom restores power after a stage 4 or stage 6 outage, the inrush voltage spike travels through your USB-C or MagSafe charger directly onto the logic board power rails. The backlight driver IC — a component smaller than your fingernail — absorbs this surge. Partial damage causes intermittent flickering that worsens over weeks. Complete failure causes a dark screen. The machine boots normally in every other respect: keyboard backlight works, external display works, you can hear the startup chime.
            </p>
            <p>
              The fix is a <strong className="text-[#E8F4F1]">true sine wave UPS</strong> — not a standard surge protector, which does not filter the waveform distortion that accompanies power restoration. Clients in Sandton, Fourways, Bryanston, and Midrand who invested R2,000 to R3,500 in a quality UPS have never brought a load shedding-damaged MacBook to us. Those who relied on multi-plug surge protectors have. We have repaired backlight IC damage on machines as new as three months old from clients who did not realise load shedding could damage a laptop that was plugged in.
            </p>
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#E8F4F1] mb-6">Related Repair Services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { href: '/screen-repair', label: 'Screen Repair Hub', desc: 'All Mac and iPhone screen repairs' },
              { href: '/logic-board-repair', label: 'Logic Board Repair', desc: 'Component-level board repairs including GPU and backlight IC' },
              { href: '/screen-repair#backlight-repair', label: 'Backlight Repair', desc: 'Backlight IC and driver circuit repairs' },
              { href: '/contact', label: 'Contact Us', desc: 'Book an assessment or get a quote' },
              { href: '/logic-board-repair/macbook-pro', label: 'MacBook Pro Logic Board', desc: 'All MacBook Pro board-level repairs' },
              { href: '/liquid-damage/macbook-pro', label: 'Liquid Damage Recovery', desc: 'Board-level liquid damage repair' },
              { href: '/screen-repair/macbook-pro', label: 'MacBook Pro Screen Repair', desc: 'All MacBook Pro display replacements' },
              { href: '/screen-repair/imac', label: 'iMac Screen Repair', desc: 'iMac display and T-Con board repairs' },
            ].map(({ href, label, desc }) => (
              <Link
                key={href}
                href={href}
                className="group p-4 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#0A1A18] hover:border-[rgba(15,234,122,0.2)] hover:bg-[rgba(15,234,122,0.03)] transition-all"
              >
                <p className="text-[#E8F4F1] font-semibold text-sm mb-1 group-hover:text-[#0FEA7A] transition-colors">{label}</p>
                <p className="text-[#7A9E98] text-xs">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#E8F4F1] mb-8">What Johannesburg Clients Say</h2>
          <GoogleReviews />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-8">MacBook Screen Flickering — Frequently Asked Questions</h2>
          <FAQAccordion items={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0A1A18] border-t border-[rgba(255,255,255,0.06)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
            Still Flickering? We Will Find the Cause.
          </h2>
          <p className="text-[#7A9E98] text-lg mb-8 leading-relaxed">
            Send us your MacBook serial number on WhatsApp and describe the flicker. We will tell you the most likely cause before you even come in. Assessment from R599 — applied toward repair if you proceed. No Fix No Fee.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={buildWhatsAppUrl('GUIDE-FLICKER-CTA', 'screen-repair')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all"
            >
              WhatsApp for a Diagnosis
            </a>
            <a
              href={`tel:${CONTACT.phoneTel}`}
              className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
            >
              <Phone className="w-5 h-5" /> Call {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
