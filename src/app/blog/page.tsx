import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog, Apple Tips, Repair Guides & Tech News | ZA Support',
  description: 'Apple repair tips, macOS guides, device maintenance advice, and IT news from ZA Support, Johannesburg\'s Apple specialists.',
  alternates: { canonical: 'https://zasupport.com/blog' },
};

const posts = [
  { slug: 'goodx-mac-support-johannesburg', title: 'Mac IT Support Johannesburg: Expert Repairs at ZA Support Hyde Park', excerpt: 'When your MacBook stops working, the panic sets in. You\'ve got deadlines, client meetings, or just important work sitting on that machine. If you\'re searching for \"Mac IT support Johannesburg,\" you\'ve.', date: '16 April 2026', category: 'Repairs', readTime: '9 min read' },
  { slug: 'macbook-cooling-pad-worth-it-johannesburg', title: 'Is a MacBook Cooling Pad Worth It in Johannesburg? A Workshop Reality Check', excerpt: 'When we see MacBook owners wheeling into our Hyde Park workshop with throttling complaints, the first question is rarely about cooling pads. It\'s usually: \"Will this actually fix my problem?\" After ei.', date: '16 April 2026', category: 'Repairs', readTime: '12 min read' },
  { slug: 'mac-clean-install-macos-johannesburg', title: 'Mac Clean Install macOS Johannesburg: Professional Guide from Hyde Park Workshop', excerpt: 'When your MacBook starts behaving erratically—freezing during load-shedding outages, accumulating years of fragmented files, or simply running slower than it should—a clean install of macOS can feel l.', date: '16 April 2026', category: 'Repairs', readTime: '9 min read' },
  { slug: 'hpcsa-records-mac-backup-johannesburg', title: 'HPCSA Records Mac Backup Solution in Johannesburg: Protect Your Medical Data on macOS', excerpt: 'Healthcare professionals across Johannesburg rely on their Macs to store sensitive patient records, test results, and clinical documentation. If you work in HPCSA-regulated practice—whether in Hyde Pa.', date: '16 April 2026', category: 'Repairs', readTime: '9 min read' },
  { slug: 'macbook-preventive-maintenance-johannesburg', title: 'MacBook Preventive Maintenance in Johannesburg: A Technician\'s Guide to Keeping Your Device Running', excerpt: 'In our Hyde Park workshop, we see the same pattern every week: MacBook owners arrive with machines that have suffered months of neglect, only to face repair bills that could have been prevented with b.', date: '17 April 2026', category: 'Repairs', readTime: '10 min read' },
  { slug: 'mac-security-setup-johannesburg', title: 'Mac Security Setup in Johannesburg: A Local Technician\'s Complete 2026 Guide', excerpt: 'When Apple released macOS Sequoia in autumn 2024, we noticed something shift in our Hyde Park workshop. Clients started asking us more detailed questions about security — not just \"is my Mac safe?\" bu.', date: '17 April 2026', category: 'Repairs', readTime: '15 min read' },
  { slug: 'macbook-backup-time-machine-johannesburg', title: 'MacBook Backup Time Machine Setup Johannesburg: A Complete Workshop Guide', excerpt: 'Time Machine is Apple\'s built-in backup system, yet we see MacBook owners in Hyde Park and surrounding Gauteng areas struggle with setup, external drive compatibility, and whether their backups are ac.', date: '17 April 2026', category: 'Repairs', readTime: '13 min read' },
  { slug: 'mac-support-small-business-johannesburg', title: 'Mac IT Support for Small Businesses in Johannesburg: Keeping Your Team Productive', excerpt: 'Running a small business in Johannesburg means your technology needs to work without drama. When your team\'s MacBooks, iMacs, and Mac minis start acting up, downtime costs money—not just in repairs, b.', date: '17 April 2026', category: 'Repairs', readTime: '8 min read' },
  { slug: 'mac-support-financial-services-johannesburg', title: 'Mac IT Support for Financial Services in Johannesburg', excerpt: 'Financial services firms in Johannesburg operate on razor-thin margins. A single Mac outage—whether it\'s a compliance officer unable to access files or a trader with a failed hard drive—can cost thous.', date: '17 April 2026', category: 'Repairs', readTime: '11 min read' },
  { slug: 'mac-migration-assistant-guide-johannesburg', title: 'Mac Migration Assistant Guide: How to Safely Transfer Your Data in Johannesburg', excerpt: 'Moving to a new Mac can feel daunting, especially when you\'re sitting in your Johannesburg office wondering whether your files, applications, and settings will make the transition intact. Migration As.', date: '17 April 2026', category: 'How-To', readTime: '11 min read' },
  { slug: 'how-to-diagnose-macbook-fault-johannesburg', title: 'How to Diagnose MacBook Fault in Johannesburg: A Technician\'s Guide', excerpt: 'If your MacBook is running slowly, crashing unexpectedly, or behaving strangely, you\'re not alone. We see dozens of machines every month at our Hyde Park workshop that owners thought were beyond repai.', date: '17 April 2026', category: 'How-To', readTime: '10 min read' },
  { slug: 'logic-board-repair-parkhurst', title: 'Logic Board Repair in Parkhurst: Expert Apple Technician Guide', excerpt: 'When your MacBook, iPad, or iPhone stops charging, won\'t power on, or behaves erratically, the logic board is often the culprit. At ZA Support in Hyde Park, we have repaired hundreds of devices with l.', date: '18 April 2026', category: 'Repairs', readTime: '9 min read' },
  { slug: 'investec-sandton-apple-support', title: 'Apple Support for Investec Sandton: Enterprise-Grade Repairs in Gauteng', excerpt: 'When your Apple devices go down at Investec\'s Sandton offices, downtime costs money. We\'ve spent the last eight years repairing MacBook Pros, iPhones, and iPads for corporate teams across Gauteng—from.', date: '18 April 2026', category: 'Repairs', readTime: '9 min read' },
  { slug: 'apple-repair-vs-replacement-guide-johannesburg', title: 'Apple Repair vs Replacement Guide: When to Fix Your Device in Johannesburg', excerpt: 'When your iPhone, iPad, or MacBook stops working properly, the decision between repair and replacement can feel overwhelming. In our Hyde Park workshop, we help customers make this choice every single.', date: '18 April 2026', category: 'How-To', readTime: '10 min read' },
  { slug: 'mac-startup-disk-full-fix-johannesburg', title: 'Mac Startup Disk Full Fix in Johannesburg: What\'s Actually Taking Your Storage', excerpt: 'Your Mac won\'t start. You\'ve seen the warning — \"Your startup disk is almost full\" — and now you\'re staring at a machine that\'s either refusing to boot or crawling so slowly it feels broken. In our Hy.', date: '18 April 2026', category: 'Repairs', readTime: '11 min read' },
  { slug: 'macbook-logic-board-repair-bryanston', title: 'MacBook Logic Board Repair in Bryanston: Professional Repair from ZA Support', excerpt: 'When your MacBook stops working or behaves erratically, the logic board is often the culprit. At ZA Support in Hyde Park, we have spent over a decade diagnosing and repairing logic board faults across.', date: '18 April 2026', category: 'Repairs', readTime: '12 min read' },
  { slug: 'imac-m3-repair-johannesburg', title: 'iMac M3 Repair in Johannesburg: Expert Apple Repair at ZA Support', excerpt: 'When your iMac M3 stops working, you need it fixed fast. At ZA Support in Hyde Park Johannesburg, we\'ve repaired hundreds of these machines—from simple software glitches to complex hardware failures. .', date: '18 April 2026', category: 'Repairs', readTime: '8 min read' },
  { slug: 'macbook-water-indicator-check-johannesburg', title: 'MacBook Liquid Contact Indicator Check in Johannesburg: What You Need to Know', excerpt: 'When liquid spills onto your MacBook, Apple\'s internal safety systems spring into action. One of the most critical components in this system is the Liquid Contact Indicator — a small but essential dev.', date: '18 April 2026', category: 'How-To', readTime: '10 min read' },
  { slug: 'macbook-camera-not-working-johannesburg', title: 'MacBook Camera Not Working? Fast Repairs in Johannesburg', excerpt: 'Your MacBook\'s camera suddenly stopped working. You\'ve tried restarting. You\'ve checked System Preferences. Nothing. Now you\'re stuck without video calls, and you need it fixed fast.', date: '18 April 2026', category: 'Troubleshooting', readTime: '11 min read' },
  { slug: 'imac-not-turning-on-repair-johannesburg', title: 'iMac Not Turning On: Expert Repair in Hyde Park Johannesburg', excerpt: 'When your iMac refuses to turn on, the panic sets in. You\'re staring at a blank screen, pressing the power button repeatedly, and nothing happens. We\'ve been there with hundreds of customers walking i.', date: '17 April 2026', category: 'Repairs', readTime: '12 min read' },
  { slug: 'macbook-running-slow-johannesburg', title: 'MacBook Running Slow in Johannesburg? Here\'s How We Fix It', excerpt: 'There\'s nothing quite like the frustration of opening your MacBook, expecting it to launch an application in seconds, only to watch the spinning beach ball appear for what feels like an eternity. We\'v.', date: '16 April 2026', category: 'Repairs', readTime: '11 min read' },
  { slug: 'macbook-black-screen-fix-johannesburg', title: 'MacBook Black Screen Fix in Johannesburg: What You Need to Know', excerpt: 'If your MacBook screen has gone black, you\'re not alone. In our Hyde Park workshop, we see this fault at least twice weekly—sometimes it\'s a simple fix, sometimes it requires component-level diagnosis.', date: '16 April 2026', category: 'Repairs', readTime: '10 min read' },
  { slug: 'macbook-battery-draining-fast-johannesburg', title: 'MacBook Battery Draining Fast in Johannesburg: Workshop-Tested Fixes', excerpt: 'Your MacBook\'s battery was lasting a full working day last month. Now it struggles to make it through lunch. You\'ve tried restarting. You\'ve closed browser tabs. The battery percentage still plummets.', date: '16 April 2026', category: 'Repairs', readTime: '11 min read' },
  { slug: 'liquid-damage-macbook-pro-sandton', title: 'Liquid Damage MacBook Pro Repair in Sandton: Expert Recovery at ZA Support', excerpt: 'Water damage to a MacBook Pro is one of the most distressing hardware failures a user can experience. Whether you\'ve spilled coffee across your keyboard, caught rain on your device, or dealt with an a.', date: '16 April 2026', category: 'Repairs', readTime: '9 min read' },
  { slug: 'macbook-screen-flickering-johannesburg', title: 'MacBook Screen Flickering: Expert Repair Guide for Johannesburg', excerpt: 'MacBook screen flickering is one of the most frustrating issues we encounter in our Hyde Park workshop. Your display flickers, dims, or shows visual glitches—and within hours, you\'re worried about los.', date: '15 April 2026', category: 'Repairs', readTime: '12 min read' },
  { slug: 'macbook-pro-m3-max-repair-johannesburg', title: 'MacBook Pro M3 Max Repair Johannesburg: Expert Logic Board and Component Solutions', excerpt: 'When your MacBook Pro M3 Max stops working properly, the problem usually isn\'t the screen or keyboard. We\'ve seen countless M3 Max machines arrive at our Hyde Park workshop with logic board failures, .', date: '15 April 2026', category: 'Repairs', readTime: '9 min read' },
  { slug: 'mac-repair-sandton-johannesburg', title: 'Mac Repair Sandton Johannesburg: Professional Apple Service Centre in Gauteng', excerpt: 'When your MacBook won\'t start, your iMac screen flickers, or your Mac mini stops responding to commands, finding a technician you can trust matters. In Sandton and the surrounding Johannesburg areas, .', date: '15 April 2026', category: 'Repairs', readTime: '9 min read' },
  { slug: 'medical-practice-it-security-johannesburg', title: 'Medical Practice IT Security in Johannesburg: Protecting Patient Data on Apple Devices', excerpt: 'In our Hyde Park workshop, we\'ve spent the last four years watching medical practices across Sandton, Rosebank, and Centurion grapple with a single, recurring problem: patient data living on devices t.', date: '14 April 2026', category: 'Repairs', readTime: '13 min read' },
  { slug: 'macbook-kernel-panic-fix-johannesburg', title: 'MacBook Kernel Panic Fix Johannesburg: Diagnosis and Repair in Sandton', excerpt: 'Kernel panics on MacBooks are one of the most frustrating issues we encounter in our Hyde Park workshop. Your screen goes grey, white text floods across the display, and your machine forces a restart .', date: '14 April 2026', category: 'Repairs', readTime: '9 min read' },
  { slug: 'macbook-hinge-repair-johannesburg', title: 'MacBook Hinge Repair Johannesburg: Professional Display Clutch Service in Hyde Park', excerpt: 'The MacBook display hinge is one of the most mechanically stressed components on any Apple laptop. In our Hyde Park workshop, we\'ve repaired hundreds of MacBooks with cracked display housings, bent hi.', date: '14 April 2026', category: 'Repairs', readTime: '10 min read' },
  { slug: 'macbook-pro-m4-repair-johannesburg', title: 'MacBook Pro M4 Repair in Johannesburg: Expert Board-Level Service at ZA Support', excerpt: 'When an M4 MacBook Pro fails in Johannesburg, you\'re facing a machine that represents a significant investment—and the stakes are higher than ever. Apple\'s latest generation brings processing power th.', date: '13 April 2026', category: 'Repairs', readTime: '12 min read' },
  { slug: 'macbook-pro-14-inch-repair-johannesburg', title: 'MacBook Pro 14 Inch Repair Johannesburg — Expert Apple Technicians in Hyde Park', excerpt: 'When your MacBook Pro 14-inch stops working properly, the cost of repair can feel daunting. We understand. At ZA Support in Hyde Park, Johannesburg, we\'ve been fixing M-series MacBooks since they arri.', date: '13 April 2026', category: 'Repairs', readTime: '9 min read' },
  { slug: 'macbook-keyboard-repair-johannesburg', title: 'MacBook Keyboard Repair Johannesburg: Butterfly & Scissor Switch Solutions', excerpt: 'When your MacBook keyboard stops responding, you\'re looking at lost productivity—and potentially a repair bill that makes you wince. At ZA Support in Hyde Park, we\'ve repaired thousands of MacBook key.', date: '13 April 2026', category: 'Repairs', readTime: '10 min read' },
  { slug: 'imac-logic-board-repair-johannesburg-2026', title: 'iMac Logic Board Repair in Johannesburg 2026: Component-Level Diagnosis and Repair at ZA Support', excerpt: 'When your iMac\'s logic board fails, Apple\'s solution is a full board replacement costing R15,000 to R45,000. At ZA Support in Hyde Park, we repair at component level — fixing the actual fault, not r.', date: '13 April 2026', category: 'Repairs', readTime: '14 min read' },
  { slug: 'mac-repair-rivonia-johannesburg', title: 'Mac Repair in Rivonia Johannesburg: Professional Apple Service Near You', excerpt: 'Rivonia professionals and businesses rely on their Apple devices daily. When your MacBook, iMac, or iPhone needs expert repair, ZA Support in nearby Hyde Park offers component-level service with a thr.', date: '13 April 2026', category: 'Repairs', readTime: '10 min read' },
  { slug: 'macbook-thunderbolt-port-repair-johannesburg', title: 'MacBook Thunderbolt Port Repair in Johannesburg: When Your Ports Stop Working', excerpt: 'A failed Thunderbolt port on your MacBook means no charging, no external display, and no data transfer. At ZA Support in Hyde Park, we diagnose and repair Thunderbolt controller and port faults at bo.', date: '13 April 2026', category: 'Troubleshooting', readTime: '8 min read' },
  { slug: 'macbook-liquid-damage-repair-bryanston', title: 'MacBook Liquid Damage Repair in Bryanston: Fast Recovery at ZA Support Hyde Park', excerpt: 'Bryanston professionals who spill liquid on their MacBook need fast, expert intervention. At ZA Support in Hyde Park — ten minutes from Bryanston — we recover approximately 80% of liquid-damaged MacBo.', date: '13 April 2026', category: 'Repairs', readTime: '11 min read' },
  { slug: 'managed-it-medical-practice-morningside-johannesburg', title: 'Managed IT for Medical Practices in Morningside Johannesburg: POPIA, HPCSA, and Apple Device Management', excerpt: 'Morningside medical practices handle sensitive patient data daily. Without a written IT provider agreement, your practice faces a compliance gap that the Information Regulator will ask about. ZA Suppo.', date: '13 April 2026', category: 'Enterprise', readTime: '12 min read' },
  { slug: 'macbook-repair-midrand', title: 'MacBook Repair Midrand: Professional Service for Your Apple Laptop', excerpt: 'When your MacBook stops working as it should, the panic sets in. You rely on it for work, study, or creative projects. In Midrand, finding a repair technician who understands Apple hardware—not just a.', date: '12 April 2026', category: 'Repairs', readTime: '9 min read' },
  { slug: 'macbook-air-m3-repair-johannesburg', title: 'MacBook Air M3 Repair in Johannesburg: Expert Technical Solutions at ZA Support', excerpt: 'The MacBook Air M3 represents a significant shift in Apple\'s thermal architecture. Unlike previous generations, the M3 chip operates without traditional cooling fans—a design that demands specialised .', date: '12 April 2026', category: 'Repairs', readTime: '11 min read' },
  { slug: 'corporate-apple-fleet-management-johannesburg', title: 'Corporate Apple Fleet Management in Johannesburg: MDM, DEP, and Enterprise Support', excerpt: 'Managing Apple devices across a large organisation is fundamentally different from supporting a handful of personal machines. When you\'re responsible for hundreds of MacBook Pros, iPads, and iPhones a.', date: '12 April 2026', category: 'Repairs', readTime: '10 min read' },
  { slug: 'apple-certified-repair-hyde-park', title: 'Apple Certified Repair in Hyde Park Johannesburg: Component-Level Expertise You Can Trust', excerpt: 'When your MacBook Pro won\'t power on, or your iPhone screen has shattered beyond recognition, the instinct is to visit the nearest technician. But not all repairs are created equal. At ZA Support in H.', date: '12 April 2026', category: 'Repairs', readTime: '10 min read' },
  { slug: 'macbook-touch-id-not-working-johannesburg', title: 'MacBook Touch ID Not Working in Johannesburg: What Your Secure Enclave Needs', excerpt: 'If your MacBook\'s Touch ID has stopped responding—no fingerprint recognition, no unlock, nothing—you\'re looking at one of the most frustrating modern Mac problems. At ZA Support in Hyde Park, we\'ve di.', date: '10 April 2026', category: 'Troubleshooting', readTime: '8 min read' },
  { slug: 'macbook-speaker-not-working-johannesburg', title: 'MacBook Speaker Not Working? Johannesburg Repair Guide', excerpt: 'If your MacBook\'s speakers have gone silent, you\'re not alone. We see this fault multiple times weekly in our Hyde Park workshop, and the good news is that most speaker issues can be diagnosed and res.', date: '10 April 2026', category: 'Troubleshooting', readTime: '9 min read' },
  { slug: 'ipad-screen-repair-johannesburg', title: 'iPad Screen Repair Johannesburg: Professional Digitiser and LCD Replacement in Sandton and Gauteng', excerpt: 'When your iPad screen cracks, it\'s not just a cosmetic problem. We\'ve seen too many customers in our Hyde Park workshop delay repairs only to face internal component damage weeks later. A fractured sc.', date: '10 April 2026', category: 'Repairs', readTime: '8 min read' },
  { slug: 'popia-it-provider-agreement-medical-practice', title: 'POPIA IT Provider Agreement for Medical Practices: What You Need to Know', excerpt: 'Medical practices across Johannesburg\'s northern suburbs—Sandton, Rosebank, Midrand, and Hyde Park—handle sensitive patient data daily. If your practice relies on IT support, cloud services, or device.', date: '09 April 2026', category: 'Repairs', readTime: '12 min read' },
  { slug: 'macbook-usb-c-port-not-working-johannesburg', title: 'MacBook USB-C Port Not Working in Johannesburg: Professional Repair Guide', excerpt: 'Your MacBook\'s USB-C port has stopped charging, transferring data, or connecting peripherals. You\'ve tried different cables. You\'ve restarted the machine. Nothing works. Before you assume the worst—or.', date: '09 April 2026', category: 'Troubleshooting', readTime: '9 min read' },
  { slug: 'mac-studio-repair-johannesburg', title: 'Mac Studio Repair in Johannesburg: Expert M-Series Service at ZA Support', excerpt: 'When a Mac Studio fails, your creative workflow stops. We understand—in our Hyde Park workshop, we\'ve seen everything from thermal throttling on M-series Ultra chips to catastrophic logic board failur.', date: '09 April 2026', category: 'Repairs', readTime: '9 min read' },
  { slug: 'medical-practice-popia-it-provider-johannesburg', title: 'Medical Practice POPIA IT Provider: Your Compliance Obligation as an HPCSA Practitioner', excerpt: 'If you run a medical practice in Johannesburg—whether in Sandton, Morningside, Bryanston, or anywhere across Gauteng—you have a personal regulatory obligation that most GPs and specialists overlook. U.', date: '08/04/2026', category: 'Repairs', readTime: '7 min read' },
  { slug: 'macbook-screen-repair-fourways-johannesburg', title: 'MacBook Screen Repair Fourways Johannesburg | ZA Support Hyde Park', excerpt: 'Your MacBook\'s retina display is one of the most precise pieces of engineering you own. When it cracks, dims, or develops dead pixels, it affects everything — from colour accuracy to screen brightness.', date: '08/04/2026', category: 'Repairs', readTime: '7 min read' },
  { slug: 'macbook-battery-swollen-replacement-sandton', title: 'MacBook Swollen Battery Replacement in Sandton: Safety-First Service from ZA Support', excerpt: 'A swollen MacBook battery is not a cosmetic issue. It\'s a fire risk that demands immediate attention. If your MacBook\'s trackpad is lifting, the keyboard feels spongy, or you\'ve noticed the chassis bu.', date: '08/04/2026', category: 'Repairs', readTime: '7 min read' },
  { slug: 'mac-repair-morningside-johannesburg', title: 'Mac Repair in Morningside Johannesburg: Fast, Reliable Service for Your Apple Devices', excerpt: 'We\'ve spent over a decade repairing Macs in Johannesburg\'s northern suburbs, and Morningside has become one of our busiest service areas. The suburb sits in the heart of Gauteng\'s professional corrido.', date: '08/04/2026', category: 'Repairs', readTime: '7 min read' },
  { slug: 'macbook-air-m2-repair-johannesburg', title: 'MacBook Air M2 Repair in Johannesburg: Expert Service at ZA Support', excerpt: 'The M2-powered MacBook Air has transformed how professionals work across Johannesburg. Its fanless design, stunning Liquid Retina display, and all-day battery life make it the go-to machine for design.', date: '08/04/2026', category: 'Repairs', readTime: '8 min read' },
  { slug: 'imac-not-turning-on-johannesburg', title: 'iMac Not Turning On: Professional Repair in Johannesburg', excerpt: 'When your iMac refuses to turn on, it\'s frustrating—especially if you\'ve got work waiting or clients depending on you. We understand. Here at ZA Support in Hyde Park, Johannesburg, we\'ve diagnosed and.', date: '08/04/2026', category: 'Repairs', readTime: '7 min read' },
  { slug: 'macbook-liquid-damage-recovery-johannesburg', title: 'MacBook Liquid Damage Recovery in Johannesburg: What You Need to Know', excerpt: 'When your MacBook encounters liquid damage, every minute counts. We\'re the team at ZA Support in Hyde Park, and we\'ve spent years recovering devices that their owners thought were beyond saving. This .', date: '07/04/2026', category: 'Repairs', readTime: '8 min read' },
  { slug: 'logic-board-repair-cost-johannesburg', title: 'Logic Board Repair Cost Johannesburg 2026: What You\'ll Actually Pay', excerpt: 'Logic board failures are among the most expensive repairs an Apple device can face. In our Hyde Park Johannesburg workshop, we see clients shocked by Apple Store quotes—often ranging from R15,000 to R.', date: '07/04/2026', category: 'Pricing', readTime: '8 min read' },
  { slug: 'macbook-battery-swollen-johannesburg', title: 'Swollen MacBook Battery Repair Johannesburg: What You Need to Know', excerpt: 'A swollen MacBook battery is one of the most dangerous hardware failures we encounter in our Hyde Park workshop. Unlike a cracked screen or keyboard malfunction, a bulging battery poses an immediate f.', date: '07/04/2026', category: 'Repairs', readTime: '8 min read' },
  { slug: 'macbook-wifi-not-working-johannesburg', title: 'MacBook WiFi Not Working in Johannesburg: Diagnosis and Repair', excerpt: 'When your MacBook won\'t connect to WiFi, it\'s frustrating—especially if you\'re working from a café in Sandton or relying on connectivity in Midrand. We\'ve diagnosed hundreds of wireless issues at our .', date: '07/04/2026', category: 'Troubleshooting', readTime: '8 min read' },
  { slug: 'macbook-fan-noise-fix-johannesburg', title: 'MacBook Fan Noise Fix Johannesburg: Why Your Mac Sounds Like a Jet Engine', excerpt: 'Your MacBook\'s fan has started making a noise that sounds like a small aircraft taking off from your desk. You\'re working from home in Sandton or Bryanston, the Johannesburg power cuts are unpredictab.', date: '07/04/2026', category: 'Repairs', readTime: '8 min read' },
  { slug: 'apple-vs-third-party-repair-johannesburg', title: 'Apple Store vs Third Party Repair in Johannesburg: What You Need to Know', excerpt: 'When your iPhone or MacBook breaks in Johannesburg, the choice between Apple\'s official service and a third-party repair shop feels straightforward. It isn\'t. We\'ve spent eight years repairing devices.', date: '07/04/2026', category: 'Repairs', readTime: '9 min read' },
  { slug: 'managed-it-law-firm-apple-mac-johannesburg', title: 'Managed Apple IT for Law Firms in Johannesburg — Mac Fleet, JAMF, and POPIA Compliance', excerpt: '**Category:** Enterprise | **Author:** Courtney Bentley | **Published:** 6 April 2026.', date: '06/04/2026', category: 'Repairs', readTime: '8 min read' },
  { slug: 'macbook-repair-dainfern-johannesburg', title: 'MacBook Repair in Dainfern, Johannesburg — Premium Logic Board and Liquid Damage Service', excerpt: '**Category:** Repairs | **Author:** Courtney Bentley | **Published:** 6 April 2026.', date: '06/04/2026', category: 'Repairs', readTime: '8 min read' },
  { slug: 'jamf-mdm-medical-practice-johannesburg', title: 'JAMF MDM for Medical Practices in Johannesburg — HPCSA-Compliant Apple Device Management', excerpt: '**Category:** Enterprise | **Author:** Courtney Bentley | **Published:** 6 April 2026.', date: '06/04/2026', category: 'Repairs', readTime: '7 min read' },
  { slug: 'apple-authorised-vs-independent-repair-johannesburg', title: 'Apple Authorised vs Independent Repair in Johannesburg: What Mac Owners Should Know', excerpt: 'Wondering whether to use an Apple Authorised Service Provider or an independent repairer in Johannesburg? We break down cost, quality, warranty, and turnaround so you can make an informed choice.', date: '06/04/2026', category: 'Advice', readTime: '8 min read' },
  { slug: 'macbook-trackpad-not-clicking-johannesburg', title: 'MacBook Trackpad Not Clicking in Johannesburg: Complete Repair Guide', excerpt: 'Your MacBook trackpad stopped responding to clicks, and you\'re frantically scrolling with two fingers just to navigate. We understand the frustration. In our Hyde Park workshop, we see this problem at.', date: '29/03/2026', category: 'Repairs', readTime: '9 min read' },
  { slug: 'macbook-pro-m1-logic-board-repair', title: 'MacBook Pro M1 Logic Board Repair in Johannesburg: Expert Fixes at ZA Support', excerpt: 'When your MacBook Pro M1 fails to power on, displays kernel panics, or shows unexpected restarts, the logic board is often the culprit. We have seen dozens of M1 units arrive at our Hyde Park workshop.', date: '29/03/2026', category: 'Repairs', readTime: '8 min read' },
  { slug: 'macbook-charging-port-repair-johannesburg', title: 'MacBook Charging Port Repair in Johannesburg: Professional Solutions at ZA Support', excerpt: 'MacBook charging issues are far more common than most people realise. In our Hyde Park workshop, we see at least three or four MacBook charging failures every week—everything from bent connector pins .', date: '29/03/2026', category: 'Repairs', readTime: '9 min read' },
  { slug: 'macbook-water-damage-first-aid-steps-johannesburg', title: 'MacBook Water Damage First Aid Steps: What To Do In Johannesburg', excerpt: 'Your MacBook has just taken an unexpected bath. Your heart sinks. You\'ve got maybe ten minutes to act properly, and the next 72 hours will determine whether your machine survives intact or heads towar.', date: '29/03/2026', category: 'Repairs', readTime: '10 min read' },
  { slug: 'macbook-pro-coffee-spill-repair-cost-johannesburg', title: 'MacBook Pro Coffee Spill Repair Cost Johannesburg 2026', excerpt: 'When you knock over your coffee onto your MacBook Pro, the first thing you feel is panic. We understand that at ZA Support in Hyde Park. We\'ve handled thousands of liquid damage cases—and coffee is qu.', date: '29/03/2026', category: 'Pricing', readTime: '9 min read' },
  { slug: 'macbook-liquid-damage-indicator-what-apple-checks', title: 'MacBook Liquid Damage Indicator: What Apple Checks and Why It Matters', excerpt: 'When a client brings a MacBook into our workshop at ZA Support in Hyde Park, one of the first things we examine isn\'t the logic board or the trackpad. It\'s a small adhesive strip inside the chassis—th.', date: '29/03/2026', category: 'How-To', readTime: '9 min read' },
  { slug: 'macbook-air-water-damage-logic-board-repair-johannesburg', title: 'MacBook Air Water Damage Logic Board Repair Johannesburg', excerpt: 'Water damage to a MacBook Air is one of the most stressful situations we encounter in our Hyde Park workshop. A single cup of coffee, a burst water pipe, or load shedding-related flooding can render y.', date: '29/03/2026', category: 'Repairs', readTime: '8 min read' },
  { slug: 'can-water-damaged-macbook-be-repaired-south-africa', title: 'Can a Water-Damaged MacBook Be Repaired in South Africa?', excerpt: 'Water damage to your MacBook feels like a catastrophe. You\'ve spilled coffee, survived a rainstorm, or your child knocked over a drink bottle. Now your machine is dead or behaving erratically. The hon.', date: '29/03/2026', category: 'Repairs', readTime: '9 min read' },
  { slug: 'logic-board-repair-cost-johannesburg-2026', title: 'Logic Board Repair Cost Johannesburg 2026: What You\'ll Actually Pay', excerpt: 'When your MacBook or iPad stops working, the logic board is often the culprit. We\'ve repaired thousands of Apple devices at our Hyde Park workshop over the past decade, and logic b.', date: '25 March 2026', category: 'Pricing', readTime: '8 min read' },
  { slug: 'macbook-not-turning-on-johannesburg', title: 'MacBook Not Turning On in Johannesburg: Diagnostic & Repair Guide', excerpt: 'Your MacBook won\'t power up. The screen stays black. The keyboard lights don\'t respond. You\'ve pressed every button combination you can think of, and nothing happens. In our Hyde P.', date: '25 March 2026', category: 'Repairs', readTime: '8 min read' },
  { slug: 'macbook-water-damage-repair-johannesburg', title: 'Water Damaged MacBook Repair Johannesburg: Professional Recovery Guide', excerpt: 'Water damage remains one of the most stressful incidents for MacBook owners. Whether it\'s spilled coffee, a burst water pipe during load shedding season, or an unexpected accident,.', date: '25 March 2026', category: 'Repairs', readTime: '8 min read' },
  { slug: 'macbook-not-charging-johannesburg', title: 'MacBook Not Charging Johannesburg: Complete Guide by ZA Support', excerpt: 'Is your MacBook refusing to charge in Johannesburg? You\'re not alone. This common issue frustrates countless users across South Africa, but the good news is that most charging prob.', date: '25 March 2026', category: 'Repairs', readTime: '4 min read' },
  { slug: 'macbook-keyboard-not-working-johannesburg', title: 'MacBook Keyboard Not Working in Johannesburg? Here\'s Your Complete Repair Guide', excerpt: 'I\'ve spent the last eight years sitting in our Hyde Park workshop, diagnosing and repairing MacBooks with temperamental keyboards. If you\'re reading this, your MacBook keyboard has.', date: '26 March 2026', category: 'Troubleshooting', readTime: '8 min read' },
  { slug: 'macbook-screen-replacement-johannesburg', title: 'MacBook Screen Replacement Cost in Johannesburg: Complete 2024 Guide', excerpt: 'I\'ve replaced hundreds of MacBook screens across Johannesburg—from shattered Retina displays in Hyde Park offices to liquid-damaged panels affecting everything from brightness to c.', date: '26 March 2026', category: 'Repairs', readTime: '6 min read' },
  { slug: 'apple-mac-battery-replacement-johannesburg', title: 'Apple Mac Battery Replacement in Johannesburg: Professional Service at ZA Support', excerpt: 'Your MacBook is slowing down, the battery drains in hours, and you\'re tethered to the power cable. We see this scenario multiple times each week in our Hyde Park workshop. A degrad.', date: '26 March 2026', category: 'Repairs', readTime: '8 min read' },
  { slug: 'iphone-screen-repair-johannesburg', title: 'iPhone Screen Repair Johannesburg: Same-Day Fixes at ZA Support', excerpt: 'When your iPhone screen shatters, you need it fixed today, not next week. We understand the frustration. At ZA Support in Hyde Park, Johannesburg, we\'ve repaired over 8,000 cracked.', date: '26 March 2026', category: 'Repairs', readTime: '8 min read' },
  { slug: 'does-macbook-warranty-cover-water-damage-south-africa', title: 'Does Apple Warranty Cover Water Damage? Your Guide to MacBook Liquid Damage Claims in South Africa', excerpt: 'Water damage to a MacBook is one of the most common hardware failures we encounter at our Hyde Park workshop, and the question that follows is almost always the same: "Will my warr.', date: '27 March 2026', category: 'Repairs', readTime: '9 min read' },
  { slug: 'how-long-macbook-survive-after-water-damage', title: 'How Long Can a MacBook Last After Water Damage? The Real Timeline', excerpt: 'Your MacBook just survived a coffee spill. It still powers on. The keyboard works. Everything seems fine. So you put it back in your bag and carry on with your day—a decision we se.', date: '27 March 2026', category: 'Repairs', readTime: '10 min read' },
  { slug: 'laptop-water-damage-repair-vs-buy-new-south-africa', title: 'Should You Repair a Water-Damaged Laptop or Buy New? A South Africa Decision Guide', excerpt: 'Last month, a client walked into our Hyde Park Johannesburg workshop with a MacBook Air that had spent approximately thirty seconds in a coffee spill. His first question wasn\'t "ca.', date: '27 March 2026', category: 'Repairs', readTime: '10 min read' },
  { slug: 'macbook-logic-board-repair-vs-replacement-water-damage', title: 'MacBook Logic Board Repair vs Replacement for Water Damage: What Really Works', excerpt: 'When a MacBook meets water—whether it\'s spilled coffee in the Hyde Park office or load shedding-era condensation—the logic board becomes the central concern. We have seen hundreds .', date: '27 March 2026', category: 'Repairs', readTime: '9 min read' },
  { slug: 'macbook-water-damage-data-recovery-options', title: 'MacBook Water Damage Data Recovery Options in Johannesburg', excerpt: 'Water damage to a MacBook feels catastrophic. You\'re not just losing a device—you\'re panicking about months of emails, client files, photos, and work in progress. We understand thi.', date: '27 March 2026', category: 'Repairs', readTime: '10 min read' },
  { slug: 'macbook-water-damage-diy-mistakes-to-avoid', title: 'MacBook Water Damage: DIY Fix Mistakes to Avoid', excerpt: 'We\'ve been repairing water-damaged MacBooks at our Hyde Park Johannesburg workshop for over a decade, and we can tell you with absolute certainty: the damage doesn\'t come from the .', date: '27 March 2026', category: 'Repairs', readTime: '11 min read' },
  { slug: 'macbook-water-damage-repair-cost-south-africa', title: 'MacBook Water Damage Repair Cost South Africa: ZA Support Transparent Pricing', excerpt: 'Water damage happens fast. One knocked-over coffee, a sudden rainstorm, or a spilled juice box—and your MacBook\'s logic board is at risk. In our Hyde Park workshop, we see at least.', date: '27 March 2026', category: 'Pricing', readTime: '10 min read' },
  { slug: 'prevent-macbook-water-damage-protection-tips', title: 'How to Protect Your MacBook From Water Damage: Essential Prevention Tips for SA Users', excerpt: 'Water damage remains one of the most common reasons we see MacBooks arrive at our Hyde Park workshop. Last month alone, we handled seventeen liquid damage cases—coffee spills, load.', date: '27 March 2026', category: 'Repairs', readTime: '10 min read' },
  { slug: 'signs-of-water-damage-macbook-how-to-tell', title: 'Signs of Water Damage MacBook: How to Tell If Your Mac Has Been Exposed to Liquid', excerpt: 'Water damage remains one of the most common problems we encounter in our Hyde Park workshop, and it\'s often discovered months after the initial spill. Unlike a cracked screen, liqu.', date: '27 March 2026', category: 'How-To', readTime: '11 min read' },
  { slug: 'spilled-coffee-on-macbook-what-to-do-right-now', title: 'Spilled Coffee on MacBook: What to Do Right Now', excerpt: 'You\'ve just watched your morning cappuccino cascade across the keyboard of your MacBook. Your stomach drops. The screen flickers. Your first instinct might be to grab a cloth and s.', date: '27 March 2026', category: 'Repairs', readTime: '12 min read' },
  {
    slug: 'macbook-screen-repair-johannesburg',
    title: 'MacBook Screen Repair in Johannesburg: Cracked, Black, or Flickering',
    excerpt: 'Whether your MacBook screen is cracked, completely black, flickering, or showing lines -- this guide covers every display fault, what causes it, and what your repair options are in Johannesburg.',
    date: '16/03/2026',
    category: 'Repair Guides',
    readTime: '7 min read',
  },
  {
    slug: 'macbook-battery-replacement-johannesburg',
    title: 'MacBook Battery Replacement in Johannesburg: Everything You Need to Know',
    excerpt: 'A swollen, draining, or dead MacBook battery does not mean the end of your machine. This guide covers how to tell when your battery needs replacing, what the process involves, and what to expect.',
    date: '16/03/2026',
    category: 'Repair Guides',
    readTime: '6 min read',
  },
  {
    slug: 'macbook-logic-board-repair-cost-johannesburg-2026',
    title: 'MacBook Logic Board Repair in Johannesburg: What to Expect in 2026',
    excerpt: 'Everything you need to know about MacBook logic board repair costs in Johannesburg, what a logic board does, signs it has failed, how the repair works, and why component-level repair saves you thousands.',
    date: '16/03/2026',
    category: 'Repair Guides',
    readTime: '7 min read',
  },
  {
    slug: 'how-to-speed-up-mac-free',
    title: 'How to Speed Up Your Mac for Free (2026 Guide)',
    excerpt: 'Ten free steps to make your Mac noticeably faster today, from clearing startup items and resetting the SMC to cleaning your Downloads folder and managing storage pressure. No paid software required.',
    date: '14/03/2026',
    category: 'How-To Guides',
    readTime: '9 min read',
  },
  {
    slug: 'mac-not-turning-on-checklist',
    title: 'Mac Won\'t Turn On? Work Through This Checklist First',
    excerpt: 'Before assuming the worst, work through this 8-step self-service checklist. Most Mac startup failures have a straightforward cause, a flat battery, a stuck power button, or a corrupted boot volume, and can be resolved without a repair.',
    date: '14/03/2026',
    category: 'How-To Guides',
    readTime: '8 min read',
  },
  {
    slug: 'macbook-running-slow',
    title: 'Why Is My MacBook Running Slow? 7 Fixes That Actually Work',
    excerpt: 'A slow MacBook is almost always fixable without spending a cent. Here are the 7 most common causes of MacBook slowness and exactly how to fix each one, from storage pressure to thermal throttling.',
    date: '14/03/2026',
    category: 'How-To Guides',
    readTime: '8 min read',
  },
  {
    slug: 'macbook-wont-connect-wifi',
    title: 'MacBook Won\'t Connect to WiFi: Complete Fix Guide (2026)',
    excerpt: 'MacBook WiFi problems range from a 30-second software fix to a hardware fault. This guide works through every fix in order so you resolve it without unnecessary steps.',
    date: '14/03/2026',
    category: 'How-To Guides',
    readTime: '7 min read',
  },
  {
    slug: 'apple-id-locked-out',
    title: 'Locked Out of Apple ID? Here\'s Exactly What to Do',
    excerpt: 'Being locked out of your Apple ID affects your Mac, iPhone, iPad, and every Apple service. This guide covers every recovery method available in 2026, including what to do when the standard options fail.',
    date: '14/03/2026',
    category: 'How-To Guides',
    readTime: '9 min read',
  },
  {
    slug: 'macbook-load-shedding-damage',
    title: 'Load Shedding Damaged My MacBook: What You Need to Know',
    excerpt: 'Load shedding does not just cut your power, the surge when power returns can silently destroy a MacBook logic board. Here is what happens, the warning signs, and how to protect your machine.',
    date: '14/03/2026',
    category: 'Repair Guides',
    readTime: '7 min read',
  },
  {
    slug: 'what-to-do-macbook-liquid-damage',
    title: 'What to Do Immediately After Your MacBook Gets Wet',
    excerpt: 'The first 30 minutes after a liquid spill are critical. Here is exactly what to do, and what not to do, to maximise your chances of a successful repair.',
    date: '08/03/2026',
    category: 'Repair Guides',
    readTime: '5 min read',
  },
  {
    slug: 'why-rice-does-not-work',
    title: 'Why Putting Your iPhone in Rice Does Not Work',
    excerpt: 'The rice myth is one of the most damaging pieces of consumer advice circulating online. We explain why it does not work and what you should do instead.',
    date: '01/03/2026',
    category: 'Repair Guides',
    readTime: '4 min read',
  },
  {
    slug: 'jamf-mdm-guide-south-africa',
    title: 'JAMF MDM for South African Businesses: A Complete Guide',
    excerpt: 'Everything you need to know about managing Apple devices with JAMF in a South African business context, POPIA compliance, costs, and implementation.',
    date: '20/02/2026',
    category: 'Enterprise',
    readTime: '8 min read',
  },
  // New posts — March 2026
  { slug: 'macbook-wont-charge-johannesburg', title: "MacBook Won't Charge? What To Do in Johannesburg", excerpt: 'MacBook plugged in but not charging? Here are the most common causes and what to check before spending money on a repair.', date: '21/03/2026', category: 'Troubleshooting', readTime: '4 min read' },
  { slug: 'macbook-overheating-fix-johannesburg', title: 'MacBook Overheating: Causes, Fixes, and When To Get Help', excerpt: 'A MacBook that runs hot under normal use is telling you something. Here is how to diagnose overheating and when to bring it in.', date: '21/03/2026', category: 'Troubleshooting', readTime: '4 min read' },
  { slug: 'macbook-keyboard-not-working', title: 'MacBook Keyboard Not Working? Common Fixes for Johannesburg Users', excerpt: 'Keys sticking, not registering, or entire keyboard unresponsive? Here is what causes MacBook keyboard failures and how they are fixed.', date: '21/03/2026', category: 'Repairs', readTime: '4 min read' },
  { slug: 'iphone-screen-repair-cost-johannesburg-2026', title: 'iPhone Screen Repair Cost in Johannesburg — 2026 Price Guide', excerpt: 'How much does iPhone screen repair cost in Johannesburg in 2026? We break down pricing by model and explain what affects the final price.', date: '21/03/2026', category: 'Pricing', readTime: '4 min read' },
  { slug: 'mac-data-recovery-johannesburg', title: 'Mac Data Recovery in Johannesburg — What You Need to Know', excerpt: 'Deleted files, failed SSD, or a dead MacBook? Here is how Mac data recovery works and what affects whether your data can be saved.', date: '21/03/2026', category: 'Data Recovery', readTime: '4 min read' },
  { slug: 'macbook-pro-m1-m2-repair-johannesburg', title: 'MacBook Pro M1 and M2 Repair in Johannesburg — What You Need to Know', excerpt: 'Apple Silicon MacBook Pro repair is different to Intel-era repairs. Here is what to know before bringing your M1 or M2 MacBook Pro in for service.', date: '21/03/2026', category: 'Repairs', readTime: '4 min read' },
  { slug: 'macbook-trackpad-not-clicking', title: 'MacBook Trackpad Not Clicking or Stuck? Here Is Why', excerpt: 'MacBook trackpad not responding to clicks, clicking everywhere, or physically stuck? These are the most common causes and fixes.', date: '21/03/2026', category: 'Troubleshooting', readTime: '4 min read' },
  { slug: 'apple-watch-screen-repair-johannesburg', title: 'Apple Watch Screen Repair in Johannesburg — Cost and Options', excerpt: 'Cracked Apple Watch screen? Here is what your options are in Johannesburg and what affects the cost of Apple Watch screen repair.', date: '21/03/2026', category: 'Repairs', readTime: '4 min read' },
  { slug: 'ipad-screen-repair-johannesburg-2026', title: 'iPad Screen Repair in Johannesburg — 2026 Guide', excerpt: 'Cracked iPad screen? Here is what screen repair costs in Johannesburg in 2026, which iPads are most repairable, and what to expect.', date: '21/03/2026', category: 'Repairs', readTime: '4 min read' },
  { slug: 'mac-mini-repair-johannesburg', title: 'Mac Mini Repair in Johannesburg — RAM, SSD, and Logic Board', excerpt: 'Mac Mini not turning on, running slow, or showing no display? Here is what Mac Mini repairs involve and what can be upgraded.', date: '21/03/2026', category: 'Repairs', readTime: '4 min read' },
  { slug: 'how-to-check-macbook-battery-health', title: 'How to Check Your MacBook Battery Health (And What the Numbers Mean)', excerpt: 'macOS tells you your battery health — but what do cycle count and condition actually mean? Here is a plain-language guide.', date: '21/03/2026', category: 'How-To', readTime: '4 min read' },
  { slug: 'macbook-black-screen-on-startup', title: 'MacBook Black Screen on Startup — Causes and Fixes', excerpt: 'MacBook powers on but the screen stays black? This guide covers the most common causes from display failures to logic board faults.', date: '21/03/2026', category: 'Troubleshooting', readTime: '4 min read' },
  { slug: 'liquid-damage-macbook-johannesburg-cost', title: 'How Much Does MacBook Liquid Damage Repair Cost in Johannesburg?', excerpt: 'Spilled something on your MacBook? Here is an honest guide to liquid damage repair costs in Johannesburg and what factors affect the price.', date: '21/03/2026', category: 'Pricing', readTime: '4 min read' },
  { slug: 'when-to-replace-vs-repair-macbook', title: 'MacBook Repair vs Replace — How to Make the Right Decision', excerpt: 'Should you repair your MacBook or buy a new one? Here is a practical framework for making that decision based on repair cost, age, and performance.', date: '21/03/2026', category: 'Advice', readTime: '4 min read' },
  { slug: 'macbook-ssd-upgrade-johannesburg', title: 'MacBook SSD Upgrade in Johannesburg — Speed Up Your Mac Without Buying New', excerpt: 'An SSD upgrade is the most effective way to speed up an older MacBook. Here is how it works, which models are upgradeable, and what it costs.', date: '21/03/2026', category: 'Upgrades', readTime: '4 min read' },
  { slug: 'imac-repair-johannesburg', title: 'iMac Repair in Johannesburg — Screen, RAM, SSD, and Logic Board', excerpt: 'iMac not turning on, slow, or showing a distorted display? Here is what iMac repairs involve and what is worth fixing vs replacing.', date: '21/03/2026', category: 'Repairs', readTime: '4 min read' },
  { slug: 'macbook-speaker-not-working', title: 'MacBook Speaker Not Working? Here Is What to Check', excerpt: 'No sound from your MacBook speakers? Before paying for a repair, here are the software and hardware checks worth running first.', date: '21/03/2026', category: 'Troubleshooting', readTime: '4 min read' },
  { slug: 'airpods-repair-johannesburg', title: 'AirPods Repair in Johannesburg — What Can Actually Be Fixed', excerpt: 'AirPods battery dead, one side not working, or sound quality degraded? Here is what AirPods repairs are possible and what it costs in Johannesburg.', date: '21/03/2026', category: 'Repairs', readTime: '4 min read' },
  { slug: 'macbook-wifi-keeps-disconnecting', title: 'MacBook Wi-Fi Keeps Disconnecting — How to Fix It', excerpt: 'MacBook dropping Wi-Fi connection regularly? Here are the common causes from software settings to failed Wi-Fi cards, and how to fix each one.', date: '21/03/2026', category: 'Troubleshooting', readTime: '4 min read' },
  { slug: 'macbook-logic-board-symptoms-johannesburg', title: 'MacBook Logic Board Failure — 8 Warning Signs You Should Not Ignore', excerpt: 'Logic board failure is the most serious MacBook fault. These are the warning signs that suggest your MacBook logic board is failing.', date: '21/03/2026', category: 'Troubleshooting', readTime: '4 min read' },
];

export default function BlogPage() {
  return (
    <>
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] mb-4">
            ZA Support <span className="text-[#0FEA7A]">Blog</span>
          </h1>
          <p className="text-xl text-[#7A9E98] max-w-2xl">Apple tips, repair guides, and IT insights from Johannesburg&apos;s Apple specialists.</p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {posts.map((post) => (
              <article key={post.slug} className="glass-card p-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold text-[#0FEA7A] bg-[rgba(15,234,122,0.1)] px-3 py-1 rounded-full">{post.category}</span>
                  <div className="flex items-center gap-1 text-[#7A9E98] text-xs">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </div>
                  <span className="text-[#7A9E98] text-xs">{post.readTime}</span>
                </div>
                <h2 className="text-2xl font-bold text-[#E8F4F1] mb-3">
                  <Link href={`/blog/${post.slug}`} className="hover:text-[#0FEA7A] transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-[#7A9E98] leading-relaxed mb-4">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-[#0FEA7A] text-sm font-medium hover:underline">
                  Read more <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
