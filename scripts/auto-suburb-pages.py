#!/usr/bin/env python3
"""
auto-suburb-pages.py — ZA Support Overnight Suburb Page Generator
Generates missing suburb pages across all 4 service types.
No API calls. Pure templating. $0.00.
Run by overnight batch or standalone: python3 scripts/auto-suburb-pages.py
"""

import os
import json
import subprocess
import sys
from pathlib import Path

WEBSITE_DIR = Path(__file__).parent.parent
SRC = WEBSITE_DIR / "src" / "app"

# ── Suburb config ─────────────────────────────────────────────────────────────
# drive_mins: typical drive to Hyde Park | collection_note: in-page copy
SUBURBS = {
    "pretoria": {
        "label": "Pretoria",
        "drive_mins": "40–55",
        "distance_km": "55",
        "collection_note": "We collect from Pretoria and surrounding areas including Hatfield, Brooklyn, Waterkloof, Centurion, and Midrand.",
        "area_note": "Pretoria clients benefit from our Hyde Park-based component-level repair facility. Same assessment standard. Same No Fix No Fee guarantee.",
    },
    "centurion": {
        "label": "Centurion",
        "drive_mins": "30–40",
        "distance_km": "40",
        "collection_note": "We collect from Centurion including Irene, Lyttelton, Hennopspark, and Highveld.",
        "area_note": "Centurion is one of our most frequently served collection areas. Most collections arranged within 2–4 hours of WhatsApp contact.",
    },
    "morningside": {
        "label": "Morningside",
        "drive_mins": "10–15",
        "distance_km": "8",
        "collection_note": "We collect from Morningside, Sandton, and the surrounding Johannesburg North area.",
        "area_note": "Morningside is approximately 8 km from our Hyde Park workshop — one of our closest collection areas.",
    },
    "rivonia": {
        "label": "Rivonia",
        "drive_mins": "15–20",
        "distance_km": "12",
        "collection_note": "We collect from Rivonia, Sandton, Paulshof, and Sunninghill.",
        "area_note": "Rivonia clients are well within our standard collection zone. Same-day collection is typically available.",
    },
    "sunninghill": {
        "label": "Sunninghill",
        "drive_mins": "20–25",
        "distance_km": "18",
        "collection_note": "We collect from Sunninghill, Rivonia, Paulshof, and Fourways.",
        "area_note": "Sunninghill sits between Sandton and Fourways — both areas we collect from daily.",
    },
    "paulshof": {
        "label": "Paulshof",
        "drive_mins": "20–25",
        "distance_km": "17",
        "collection_note": "We collect from Paulshof, Sunninghill, Rivonia, and Fourways.",
        "area_note": "Paulshof clients are collected on the same runs as Sunninghill and Rivonia.",
    },
    "northcliff": {
        "label": "Northcliff",
        "drive_mins": "20–25",
        "distance_km": "16",
        "collection_note": "We collect from Northcliff, Randburg, Robindale, and Blairgowrie.",
        "area_note": "Northcliff is directly served from our Hyde Park collection route via Randburg.",
    },
    "houghton": {
        "label": "Houghton",
        "drive_mins": "10–15",
        "distance_km": "7",
        "collection_note": "We collect from Houghton, Saxonwold, Parktown, and Rosebank.",
        "area_note": "Houghton is one of our closest collection areas — approximately 7 km from Hyde Park.",
    },
    "parkhurst": {
        "label": "Parkhurst",
        "drive_mins": "10–15",
        "distance_km": "6",
        "collection_note": "We collect from Parkhurst, Parktown North, Greenside, and Emmarentia.",
        "area_note": "Parkhurst is the closest suburb to our Hyde Park workshop — under 6 km.",
    },
}

# ── Service type templates ────────────────────────────────────────────────────

def logic_board_page(slug: str, s: dict) -> str:
    label = s["label"]
    drive = s["drive_mins"]
    km = s["distance_km"]
    collection = s["collection_note"]
    area_note = s["area_note"]
    return f'''import type {{ Metadata }} from 'next';
import Link from 'next/link';
import {{ Phone, CheckCircle, ArrowRight, MapPin, Cpu }} from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import {{ buildFaqSchema, LOCAL_BUSINESS_PROVIDER }} from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import {{ CONTACT }} from '@/lib/constants';

export const metadata: Metadata = {{
  title: 'MacBook Logic Board Repair {label} | ZA Support Hyde Park',
  description: 'MacBook logic board repair for {label} clients. Component-level repair, assessment from R599. We collect from {label}. No Fix No Fee. Call 064 529 5863.',
  alternates: {{ canonical: 'https://zasupport.com/logic-board-repair/{slug}' }},
}};

const faults = [
  {{ title: 'No Power', desc: 'MacBook shows no signs of life. Power rail diagnosis and component-level repair. Most common cause: USB-C controller or power management IC damaged by load shedding surge.' }},
  {{ title: 'No Display / Black Screen', desc: 'Machine boots but screen stays black or shows artefacts. Backlight fuse, display driver IC, or GPU fault identified and repaired.' }},
  {{ title: 'Liquid Damage', desc: 'Coffee, water, or condensation causes corrosion. Ultrasonic cleaning followed by targeted component replacement at board level.' }},
  {{ title: 'USB-C / Thunderbolt Failure', desc: 'No charging, no data, or no external display on USB-C ports. Controller IC or port board replaced at component level.' }},
  {{ title: 'Overheating / Shutdown', desc: 'Unexpected shutdowns traced to failed voltage regulators, thermal sensor faults, or blocked power rails on the logic board.' }},
  {{ title: 'Fan Running at Full Speed', desc: 'SMC fault or failed thermal sensor causes fans to run continuously. Board-level diagnosis and SMC component repair.' }},
];

const faqs = [
  {{
    question: 'Do you collect MacBooks for logic board repair from {label}?',
    answer: '{collection} We collect, repair at our Hyde Park workshop, and return once complete. WhatsApp 064 529 5863 to arrange.',
  }},
  {{
    question: 'How far is {label} from your Hyde Park workshop?',
    answer: 'Approximately {km} km from {label} to our workshop at 1 Hyde Park Lane — roughly {drive} minutes by car. {area_note}',
  }},
  {{
    question: 'What does MacBook logic board repair cost for {label} clients?',
    answer: 'Assessment from R599. Repair cost depends on the specific fault — quoted in writing before any work proceeds. No Fix No Fee applies to all {label} clients.',
  }},
  {{
    question: 'Can a MacBook logic board be repaired or does it need replacing?',
    answer: 'In most cases repaired. Component-level repair replaces only the failed IC, capacitor, or connector — not the entire board. This costs 60–80% less than a board replacement and preserves your data.',
  }},
  {{
    question: 'My MacBook was damaged by a load shedding power surge — is it repairable?',
    answer: 'Yes, in most cases. Power surges typically damage the USB-C charge controller — a discrete, repairable IC. The R599 assessment confirms the specific fault before any commitment.',
  }},
  {{
    question: 'How long does MacBook logic board repair take?',
    answer: 'After the R599 assessment and written approval, most repairs complete within 3–5 business days. We provide a specific timeline in the written quote.',
  }},
  {{
    question: 'Is my data safe during logic board repair?',
    answer: 'Yes. Component-level board repair does not require erasing or removing the SSD. If the board is completely non-functional, SSD readability is assessed as part of the R599 diagnostic.',
  }},
  {{
    question: 'Do you offer No Fix No Fee for {label} clients?',
    answer: 'Yes. If we cannot repair your MacBook after the assessment, you pay only the R599 assessment fee — not the full repair cost. This applies to all clients regardless of location.',
  }},
];

const serviceSchema = {{
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Logic Board Repair {label}',
  description: 'Component-level MacBook logic board repair for {label} clients. Assessment from R599.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    {{ '@type': 'City', name: 'Johannesburg' }},
    {{ '@type': 'Place', name: '{label}' }},
  ],
}};

const breadcrumbSchema = {{
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' }},
    {{ '@type': 'ListItem', position: 2, name: 'Logic Board Repair', item: 'https://zasupport.com/logic-board-repair' }},
    {{ '@type': 'ListItem', position: 3, name: '{label}', item: 'https://zasupport.com/logic-board-repair/{slug}' }},
  ],
}};

const faqSchema = buildFaqSchema(faqs);

export default function LogicBoardRepair{label.replace(" ", "")}Page() {{
  return (
    <>
      <SchemaOrg schema={{faqSchema}} />
      <SchemaOrg schema={{serviceSchema}} />
      <SchemaOrg schema={{breadcrumbSchema}} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={{[
            {{ label: 'Logic Board Repair', href: '/logic-board-repair' }},
            {{ label: '{label}' }},
          ]}} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Logic Board Repair
              <br /><span className="text-[#0FEA7A]">{label}</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Component-level MacBook logic board repair for {label} clients. No power, charging faults, liquid damage, display failures, and USB-C faults repaired at our Hyde Park workshop. Collection from {label}.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>Hyde Park, Johannesburg | Assessment from R599 | Collecting from {label} — approx {drive} min drive</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {{['Component-Level Repair', 'No Fix No Fee', 'Written Warranty', 'Assessment from R599'].map((l) => (
                <div key={{l}} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <CheckCircle className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{{l}}</span>
                </div>
              ))}}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={{CONTACT.whatsapp}} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
                WhatsApp for Quote
              </a>
              <a href={{`tel:${{CONTACT.phoneTel}}`}} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {{CONTACT.phone}}
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
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">MacBook Logic Board Faults We Repair for {label} Clients</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">{area_note} All MacBook models from 2015 onwards are covered — Intel and Apple Silicon. Faults assessed at component level. Written quote before any repair proceeds.</p>
          <div className="space-y-4">
            {{faults.map((f) => (
              <div key={{f.title}} className="glass-card p-5">
                <h3 className="text-[#E8F4F1] font-bold mb-2">{{f.title}}</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{{f.desc}}</p>
              </div>
            ))}}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={{faqs}} title={{`MacBook Logic Board Repair {label} — Common Questions`}} />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6">Related Services</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {{[
              {{ label: 'Logic Board Hub', href: '/logic-board-repair' }},
              {{ label: 'MacBook Pro M1', href: '/logic-board-repair/macbook-pro-m1' }},
              {{ label: 'MacBook Pro M2', href: '/logic-board-repair/macbook-pro-m2' }},
              {{ label: 'Liquid Damage {label}', href: '/liquid-damage/{slug}' }},
              {{ label: 'Battery Replacement {label}', href: '/battery-replacement/{slug}' }},
              {{ label: 'iPhone Repair {label}', href: '/iphone-repair/screen/{slug}' }},
              {{ label: 'Liquid Damage Repair', href: '/liquid-damage' }},
              {{ label: 'All MacBook Repair', href: '/macbook-repair' }},
            ].map((link) => (
              <Link key={{link.href}} href={{link.href}} className="glass-card p-4 text-center group">
                <span className="text-[#E8F4F1] text-sm font-semibold group-hover:text-[#0FEA7A] transition-colors">{{link.label}}</span>
              </Link>
            ))}}
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">MacBook Logic Board Fault? Assessment from R599.</h2>
            <p className="text-[#7A9E98] mb-6">Collecting from {label}. No Fix No Fee.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={{CONTACT.whatsapp}} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
                WhatsApp for Quote
              </a>
              <a href={{`tel:${{CONTACT.phoneTel}}`}} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {{CONTACT.phone}}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}}
'''


def battery_page(slug: str, s: dict) -> str:
    label = s["label"]
    drive = s["drive_mins"]
    km = s["distance_km"]
    collection = s["collection_note"]
    area_note = s["area_note"]
    return f'''import type {{ Metadata }} from 'next';
import Link from 'next/link';
import {{ Phone, CheckCircle, ArrowRight, MapPin, Battery }} from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import {{ buildFaqSchema, LOCAL_BUSINESS_PROVIDER }} from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import {{ CONTACT }} from '@/lib/constants';

export const metadata: Metadata = {{
  title: 'MacBook Battery Replacement {label} | ZA Support Hyde Park',
  description: 'MacBook battery replacement for {label} clients. Apple-spec batteries, same-day service. We collect from {label}. Call 064 529 5863.',
  alternates: {{ canonical: 'https://zasupport.com/battery-replacement/{slug}' }},
}};

const symptoms = [
  {{ title: 'Battery Not Charging', desc: 'MacBook plugged in but battery percentage does not increase. Faulty battery cell, charging IC, or port issue diagnosed and resolved.' }},
  {{ title: 'Swollen Battery', desc: 'Trackpad lifting or case separating indicates a swollen battery. Safety issue — replace immediately. We remove and dispose of swollen cells safely.' }},
  {{ title: 'Short Battery Life', desc: 'MacBook running for 2 hours or less on a full charge. Worn cells lose capacity. A new battery restores full runtime.' }},
  {{ title: 'Service Battery Warning', desc: 'macOS showing "Service Recommended" or "Replace Now". Confirmed degradation — replacement advised.' }},
  {{ title: 'Sudden Shutdowns', desc: 'MacBook shuts down unexpectedly at 20–40% battery. Failing cells cannot deliver consistent voltage under load.' }},
  {{ title: 'Battery Health Below 80%', desc: 'Apple considers batteries below 80% health to be at end of useful life. Replacement restores full capacity.' }},
];

const faqs = [
  {{
    question: 'Do you collect MacBooks for battery replacement from {label}?',
    answer: '{collection} Collection, battery replacement at Hyde Park, and return once complete. WhatsApp 064 529 5863 to arrange.',
  }},
  {{
    question: 'How far is {label} from your Hyde Park workshop?',
    answer: 'Approximately {km} km — roughly {drive} minutes by car. {area_note}',
  }},
  {{
    question: 'How long does a MacBook battery replacement take?',
    answer: 'Most MacBook battery replacements are completed same-day or within 24 hours. We carry stock of common battery sizes for MacBook Air and MacBook Pro models.',
  }},
  {{
    question: 'What batteries do you use?',
    answer: 'Apple-specification replacement batteries meeting or exceeding OEM specifications for cycle life and capacity. Every replacement includes a written warranty.',
  }},
  {{
    question: 'My MacBook battery is swollen — is it safe to use?',
    answer: 'No. A swollen battery is a safety hazard. Do not use the Mac until the battery is replaced. Contact us for same-day collection from {label}.',
  }},
  {{
    question: 'How do I know if my battery needs replacing?',
    answer: 'Check System Information > Power > Cycle Count. Above 800–1000 cycles (model dependent) indicates a worn battery. macOS also shows "Service Recommended" when health drops below Apple\\'s threshold.',
  }},
  {{
    question: 'How much does MacBook battery replacement cost for {label} clients?',
    answer: 'Cost varies by model. Contact us via WhatsApp for a quote — pricing is confirmed before any work proceeds. Assessment from R599 if a full diagnostic is also needed.',
  }},
  {{
    question: 'Do you offer a warranty on battery replacements?',
    answer: 'Yes. All battery replacements include a written warranty covering the battery and the installation. Contact us if you have any issues after the replacement.',
  }},
];

const serviceSchema = {{
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Battery Replacement {label}',
  description: 'MacBook battery replacement for {label} clients. Collection and return service.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    {{ '@type': 'City', name: 'Johannesburg' }},
    {{ '@type': 'Place', name: '{label}' }},
  ],
}};

const breadcrumbSchema = {{
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' }},
    {{ '@type': 'ListItem', position: 2, name: 'Battery Replacement', item: 'https://zasupport.com/battery-replacement' }},
    {{ '@type': 'ListItem', position: 3, name: '{label}', item: 'https://zasupport.com/battery-replacement/{slug}' }},
  ],
}};

const faqSchema = buildFaqSchema(faqs);

export default function BatteryReplacement{label.replace(" ", "")}Page() {{
  return (
    <>
      <SchemaOrg schema={{faqSchema}} />
      <SchemaOrg schema={{serviceSchema}} />
      <SchemaOrg schema={{breadcrumbSchema}} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={{[
            {{ label: 'Battery Replacement', href: '/battery-replacement' }},
            {{ label: '{label}' }},
          ]}} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Battery Replacement
              <br /><span className="text-[#0FEA7A]">{label}</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              MacBook battery replacement for {label} clients. Apple-spec batteries, written warranty, same-day or next-day turnaround. Collection from {label} — approx {drive} minutes to Hyde Park.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>Hyde Park, Johannesburg | Collection from {label} | Same-day service available</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {{['Apple-Spec Batteries', 'Written Warranty', 'Same-Day Service', 'Collection Available'].map((l) => (
                <div key={{l}} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <CheckCircle className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{{l}}</span>
                </div>
              ))}}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={{CONTACT.whatsapp}} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
                WhatsApp for Quote
              </a>
              <a href={{`tel:${{CONTACT.phoneTel}}`}} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {{CONTACT.phone}}
              </a>
              <Link href="/battery-replacement" className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all">
                All Battery Replacement <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">Battery Symptoms We Fix for {label} Clients</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">{area_note} We service all MacBook Air and MacBook Pro models from 2015 onwards, Intel and Apple Silicon.</p>
          <div className="space-y-4">
            {{symptoms.map((f) => (
              <div key={{f.title}} className="glass-card p-5">
                <h3 className="text-[#E8F4F1] font-bold mb-2">{{f.title}}</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{{f.desc}}</p>
              </div>
            ))}}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={{faqs}} title={{`MacBook Battery Replacement {label} — Common Questions`}} />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Battery Fault in {label}? We Collect.</h2>
            <p className="text-[#7A9E98] mb-6">{collection}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={{CONTACT.whatsapp}} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
                WhatsApp for Quote
              </a>
              <a href={{`tel:${{CONTACT.phoneTel}}`}} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {{CONTACT.phone}}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}}
'''


def liquid_damage_page(slug: str, s: dict) -> str:
    label = s["label"]
    drive = s["drive_mins"]
    km = s["distance_km"]
    collection = s["collection_note"]
    area_note = s["area_note"]
    return f'''import type {{ Metadata }} from 'next';
import Link from 'next/link';
import {{ Phone, CheckCircle, ArrowRight, MapPin, AlertTriangle }} from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import {{ buildFaqSchema, LOCAL_BUSINESS_PROVIDER }} from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import {{ CONTACT }} from '@/lib/constants';

export const metadata: Metadata = {{
  title: 'MacBook Liquid Damage Repair {label} | ZA Support Hyde Park',
  description: 'MacBook liquid damage repair for {label} clients. Ultrasonic cleaning, board-level diagnostics, same-day collection from {label}. Assessment from R599. Call 064 529 5863.',
  alternates: {{ canonical: 'https://zasupport.com/liquid-damage/{slug}' }},
}};

const urgentSteps = [
  {{ step: '01', title: 'Switch Off Immediately', desc: 'Do not attempt to use or charge the MacBook. Power off using the power button and leave it off.' }},
  {{ step: '02', title: 'Do Not Use Rice', desc: 'Rice does not remove corrosion or clean contaminated contacts. It wastes critical intervention time.' }},
  {{ step: '03', title: 'Contact Us Now', desc: 'WhatsApp or call immediately. Every hour increases corrosion spread. We arrange same-day collection from {label}.' }},
  {{ step: '04', title: 'Ultrasonic Cleaning', desc: 'Full disassembly. Logic board cleaned in ultrasonic bath to remove corrosion and contaminants at component level.' }},
  {{ step: '05', title: 'Diagnostic and Repair', desc: 'Post-clean diagnostic identifies damaged components. Board-level repair under magnification.' }},
  {{ step: '06', title: 'Return to {label}', desc: 'Device returned clean, fully tested, with a ZA Support warranty on all repaired components.' }},
];

const faqs = [
  {{
    question: 'How quickly should I contact you after liquid damage in {label}?',
    answer: 'Immediately — within hours if possible. Every hour allows corrosion to spread further. We offer same-day collection from {label}, approximately {drive} minutes from our Hyde Park workshop. Speed is the single most important factor in liquid damage recovery.',
  }},
  {{
    question: 'Do you collect MacBooks for liquid damage repair from {label}?',
    answer: '{collection} WhatsApp 064 529 5863 for same-day collection.',
  }},
  {{
    question: 'What is the success rate for MacBook liquid damage repair?',
    answer: 'Success rate depends heavily on time elapsed and liquid type. Water damage caught within 24 hours has approximately 80% success. Coffee or sugary liquids are more aggressive — corrosion spreads faster. Machines brought in within a few hours have the best outcomes.',
  }},
  {{
    question: 'Why not use rice to dry my MacBook?',
    answer: 'Rice absorbs surface moisture but does nothing to remove corrosion from circuit board contacts and component pads. It also delays professional treatment, allowing corrosion to spread. Ultrasonic cleaning is the only effective method for removing liquid contamination from a logic board.',
  }},
  {{
    question: 'Will my data be recovered after liquid damage?',
    answer: 'In most cases yes. The SSD in modern MacBooks is separate from the main liquid damage path. If the logic board is repairable, your data is intact. If the board cannot be recovered, SSD readability is assessed as part of the R599 diagnostic.',
  }},
  {{
    question: 'How much does MacBook liquid damage repair cost for {label} clients?',
    answer: 'Assessment from R599. Repair cost depends on the extent of damage confirmed during the ultrasonic cleaning and diagnostic process. Written quote provided before any repair proceeds. No Fix No Fee applies.',
  }},
  {{
    question: 'How long does liquid damage repair take?',
    answer: 'Ultrasonic cleaning takes 2–4 hours. Post-clean diagnostic and component repair typically adds 2–5 business days depending on the extent of damage. We provide a timeline in the written quote after assessment.',
  }},
  {{
    question: 'Do you repair iPhones and iPads with liquid damage from {label}?',
    answer: 'Yes. We repair liquid damage on MacBooks, iPhones, iPads, and other Apple devices. Contact us via WhatsApp with the device type for a same-day collection quote.',
  }},
];

const serviceSchema = {{
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MacBook Liquid Damage Repair {label}',
  description: 'MacBook liquid damage repair for {label} clients. Ultrasonic cleaning, component-level repair. Assessment from R599.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    {{ '@type': 'City', name: 'Johannesburg' }},
    {{ '@type': 'Place', name: '{label}' }},
  ],
}};

const breadcrumbSchema = {{
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' }},
    {{ '@type': 'ListItem', position: 2, name: 'Liquid Damage', item: 'https://zasupport.com/liquid-damage' }},
    {{ '@type': 'ListItem', position: 3, name: '{label}', item: 'https://zasupport.com/liquid-damage/{slug}' }},
  ],
}};

const faqSchema = buildFaqSchema(faqs);

export default function LiquidDamage{label.replace(" ", "")}Page() {{
  return (
    <>
      <SchemaOrg schema={{faqSchema}} />
      <SchemaOrg schema={{serviceSchema}} />
      <SchemaOrg schema={{breadcrumbSchema}} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={{[
            {{ label: 'Liquid Damage', href: '/liquid-damage' }},
            {{ label: '{label}' }},
          ]}} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              MacBook Liquid Damage Repair
              <br /><span className="text-[#0FEA7A]">{label}</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              Emergency MacBook liquid damage repair for {label} clients. Same-day collection. Ultrasonic cleaning and component-level board repair at our Hyde Park workshop — approx {drive} minutes from {label}.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 font-medium">Act immediately — every hour increases corrosion spread.</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {{['Same-Day Collection', 'Ultrasonic Cleaning', 'No Fix No Fee', 'Assessment from R599'].map((l) => (
                <div key={{l}} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <CheckCircle className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{{l}}</span>
                </div>
              ))}}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={{CONTACT.whatsapp}} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
                WhatsApp — Emergency Collection
              </a>
              <a href={{`tel:${{CONTACT.phoneTel}}`}} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {{CONTACT.phone}}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8">What To Do After a Spill — {label} Clients</h2>
          <div className="space-y-4">
            {{urgentSteps.map((s) => (
              <div key={{s.step}} className="glass-card p-5 flex gap-4">
                <span className="text-[#0FEA7A] font-mono font-bold text-lg min-w-[2.5rem]">{{s.step}}</span>
                <div>
                  <h3 className="text-[#E8F4F1] font-bold mb-1">{{s.title}}</h3>
                  <p className="text-[#7A9E98] text-sm leading-relaxed">{{s.desc}}</p>
                </div>
              </div>
            ))}}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={{faqs}} title={{`MacBook Liquid Damage Repair {label} — Common Questions`}} />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Liquid Damage in {label}? Act Now.</h2>
            <p className="text-[#7A9E98] mb-6">{collection}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={{CONTACT.whatsapp}} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
                WhatsApp — Emergency Collection
              </a>
              <a href={{`tel:${{CONTACT.phoneTel}}`}} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {{CONTACT.phone}}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}}
'''


def iphone_screen_page(slug: str, s: dict) -> str:
    label = s["label"]
    drive = s["drive_mins"]
    km = s["distance_km"]
    collection = s["collection_note"]
    area_note = s["area_note"]
    return f'''import type {{ Metadata }} from 'next';
import Link from 'next/link';
import {{ Phone, CheckCircle, ArrowRight, MapPin }} from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import {{ buildFaqSchema, LOCAL_BUSINESS_PROVIDER }} from '@/lib/schema';
import FAQAccordion from '@/components/ui/FAQ';
import Breadcrumb from '@/components/ui/Breadcrumb';
import {{ CONTACT }} from '@/lib/constants';

export const metadata: Metadata = {{
  title: 'iPhone Screen Repair {label} | ZA Support Hyde Park',
  description: 'iPhone screen repair for {label} clients. OLED and LCD screens, all models. We collect from {label}. Same-day repair available. Call 064 529 5863.',
  alternates: {{ canonical: 'https://zasupport.com/iphone-repair/screen/{slug}' }},
}};

const models = [
  {{ model: 'iPhone 15 / 15 Pro / 15 Pro Max', desc: 'OLED Super Retina XDR display repair. Titanium frame models require specialist handling.' }},
  {{ model: 'iPhone 14 / 14 Pro / 14 Pro Max', desc: 'OLED and Dynamic Island display repair. ProMotion on Pro models.' }},
  {{ model: 'iPhone 13 / 13 Pro / 13 Pro Max', desc: 'OLED Super Retina XDR. ProMotion on Pro models. All screen conditions repaired.' }},
  {{ model: 'iPhone 12 / 12 Pro / 12 Pro Max', desc: 'OLED display repair. MagSafe compatibility preserved post-repair.' }},
  {{ model: 'iPhone 11 / XR', desc: 'Liquid Retina LCD display repair. Most affordable screen repair tier.' }},
  {{ model: 'iPhone SE (all generations)', desc: 'LCD Retina display repair. Budget-conscious repair option with full functionality.' }},
];

const faqs = [
  {{
    question: 'Do you collect iPhones for screen repair from {label}?',
    answer: '{collection} WhatsApp 064 529 5863 to arrange same-day collection from {label}.',
  }},
  {{
    question: 'How far is {label} from your Hyde Park workshop?',
    answer: 'Approximately {km} km — roughly {drive} minutes by car. {area_note}',
  }},
  {{
    question: 'How long does iPhone screen repair take?',
    answer: 'Most iPhone screen repairs are completed within 1–2 hours of arrival at our Hyde Park workshop. We carry stock of common iPhone screen sizes. If collection is arranged from {label}, same-day return is typically available.',
  }},
  {{
    question: 'Do you use genuine Apple screens?',
    answer: 'We use high-quality OLED and LCD screens that meet or exceed Apple specifications for brightness, colour accuracy, and touch sensitivity. We do not use low-grade aftermarket panels. Every screen repair includes a written warranty.',
  }},
  {{
    question: 'Will Touch ID or Face ID still work after screen repair?',
    answer: 'Yes. Touch ID (home button models) and Face ID (Face ID models) are not affected by screen replacement. We do not touch the biometric components during screen repair.',
  }},
  {{
    question: 'How much does iPhone screen repair cost for {label} clients?',
    answer: 'Cost varies by model. iPhone 11/XR screens are the most affordable; iPhone 15 Pro Max OLED screens are at the higher end. WhatsApp us for a model-specific quote — pricing confirmed before any work proceeds.',
  }},
  {{
    question: 'My iPhone screen works but is cracked — do I need to repair it?',
    answer: 'Cracked glass can allow liquid to enter, worsen over time, and cause touch failures. We recommend repair before the crack spreads to the OLED layer below, which significantly increases repair cost.',
  }},
  {{
    question: 'Do you repair iPads and MacBooks from {label} as well?',
    answer: 'Yes. We repair MacBooks, iPads, Apple Watches, AirPods, and iMacs in addition to iPhones. Collection from {label} covers all Apple device types.',
  }},
];

const serviceSchema = {{
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'iPhone Screen Repair {label}',
  description: 'iPhone screen repair for {label} clients. All models. Collection and return service.',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    {{ '@type': 'City', name: 'Johannesburg' }},
    {{ '@type': 'Place', name: '{label}' }},
  ],
}};

const breadcrumbSchema = {{
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' }},
    {{ '@type': 'ListItem', position: 2, name: 'iPhone Repair', item: 'https://zasupport.com/iphone-repair' }},
    {{ '@type': 'ListItem', position: 3, name: 'Screen Repair', item: 'https://zasupport.com/iphone-repair/screen' }},
    {{ '@type': 'ListItem', position: 4, name: '{label}', item: 'https://zasupport.com/iphone-repair/screen/{slug}' }},
  ],
}};

const faqSchema = buildFaqSchema(faqs);

export default function IPhoneScreenRepair{label.replace(" ", "")}Page() {{
  return (
    <>
      <SchemaOrg schema={{faqSchema}} />
      <SchemaOrg schema={{serviceSchema}} />
      <SchemaOrg schema={{breadcrumbSchema}} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={{[
            {{ label: 'iPhone Repair', href: '/iphone-repair' }},
            {{ label: 'Screen Repair', href: '/iphone-repair/screen' }},
            {{ label: '{label}' }},
          ]}} />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
              iPhone Screen Repair
              <br /><span className="text-[#0FEA7A]">{label}</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-4 max-w-3xl leading-relaxed">
              iPhone screen repair for {label} clients. All models from iPhone SE to iPhone 15 Pro Max. OLED and LCD screens. Collection from {label} — approx {drive} minutes to Hyde Park.
            </p>
            <div className="flex items-center gap-2 text-[#7A9E98] text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#0FEA7A]" />
              <span>Hyde Park, Johannesburg | Collection from {label} | Same-day repair available</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {{['All iPhone Models', 'Written Warranty', 'Same-Day Repair', 'Collection Available'].map((l) => (
                <div key={{l}} className="flex items-center gap-2 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] px-4 py-2 rounded-full">
                  <CheckCircle className="w-4 h-4 text-[#0FEA7A]" />
                  <span className="text-[#E8F4F1] text-sm font-medium">{{l}}</span>
                </div>
              ))}}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={{CONTACT.whatsapp}} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_32px_rgba(15,234,122,0.4)] transition-all">
                WhatsApp for Quote
              </a>
              <a href={{`tel:${{CONTACT.phoneTel}}`}} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {{CONTACT.phone}}
              </a>
              <Link href="/iphone-repair/screen" className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.2)] text-[#7A9E98] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.05)] transition-all">
                All iPhone Screen Repair <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">iPhone Models We Repair for {label} Clients</h2>
          <p className="text-[#7A9E98] mb-8 leading-relaxed">{area_note} We carry stock of common screen sizes. Less common models are ordered and typically available within 1–2 business days.</p>
          <div className="space-y-4">
            {{models.map((m) => (
              <div key={{m.model}} className="glass-card p-5">
                <h3 className="text-[#E8F4F1] font-bold mb-2">{{m.model}}</h3>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{{m.desc}}</p>
              </div>
            ))}}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={{faqs}} title={{`iPhone Screen Repair {label} — Common Questions`}} />
        </div>
      </section>

      <section className="py-8 sm:py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-3">Cracked iPhone in {label}? We Collect.</h2>
            <p className="text-[#7A9E98] mb-6">{collection}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={{CONTACT.whatsapp}} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
                WhatsApp for Quote
              </a>
              <a href={{`tel:${{CONTACT.phoneTel}}`}} className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all">
                <Phone className="w-5 h-5" /> Call {{CONTACT.phone}}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}}
'''


# ── Sitemap entries ────────────────────────────────────────────────────────────
SITEMAP_ENTRY = "    {{ url: `${{base}}/{service}/{slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 }},"

SERVICE_DIRS = {
    "logic-board-repair": logic_board_page,
    "battery-replacement": battery_page,
    "liquid-damage": liquid_damage_page,
    "iphone-repair/screen": iphone_screen_page,
}


def page_exists(service: str, slug: str) -> bool:
    path = SRC / service / slug / "page.tsx"
    return path.exists()


def write_page(service: str, slug: str, content: str):
    path = SRC / service / slug
    path.mkdir(parents=True, exist_ok=True)
    (path / "page.tsx").write_text(content)
    print(f"  WROTE: {service}/{slug}/page.tsx")


def update_sitemap(new_entries: list[str]):
    sitemap_path = WEBSITE_DIR / "src" / "app" / "sitemap.ts"
    content = sitemap_path.read_text()

    # Insert before the closing ]; of the return array
    marker = "  ];\n}"
    if marker not in content:
        print("  WARNING: sitemap marker not found — skipping sitemap update")
        return

    insertion = "\n    // Auto-generated suburb pages — overnight batch\n"
    for entry in new_entries:
        insertion += f"    {entry}\n"

    content = content.replace(marker, insertion + marker)
    sitemap_path.write_text(content)
    print(f"  SITEMAP: +{len(new_entries)} entries")


def main():
    print(f"auto-suburb-pages.py — scanning {len(SUBURBS)} suburbs × {len(SERVICE_DIRS)} services")
    print("=" * 60)

    written = 0
    skipped = 0
    new_sitemap_entries = []

    for slug, suburb_data in SUBURBS.items():
        for service, template_fn in SERVICE_DIRS.items():
            if page_exists(service, slug):
                skipped += 1
                continue

            content = template_fn(slug, suburb_data)
            write_page(service, slug, content)
            new_sitemap_entries.append(
                f"{{ url: `${{base}}/{service}/{slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 }},"
            )
            written += 1

    print(f"\nPages written: {written} | Skipped (exist): {skipped}")

    if written == 0:
        print("Nothing to do — all suburb pages already exist.")
        return 0

    # Update sitemap
    update_sitemap(new_sitemap_entries)

    # Build
    print("\nRunning npm build...")
    result = subprocess.run(
        ["npm", "run", "build"],
        cwd=WEBSITE_DIR,
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        print(f"BUILD FAILED:\n{result.stderr[-2000:]}")
        return 1
    print("Build: OK")

    # Commit + push
    subprocess.run(["git", "add", "-A"], cwd=WEBSITE_DIR, check=True)
    commit_msg = f"feat: {written} auto-generated suburb pages (overnight batch §169)"
    subprocess.run(
        ["git", "commit", "-m", commit_msg],
        cwd=WEBSITE_DIR,
        check=True,
    )
    subprocess.run(["git", "push", "origin", "main"], cwd=WEBSITE_DIR, check=True)
    print(f"\nCommitted + pushed: {written} new pages, {len(new_sitemap_entries)} sitemap entries")
    return 0


if __name__ == "__main__":
    sys.exit(main())
