import type { Metadata } from 'next';
import type { SchemaOrg } from '@/types';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import SchemaOrgComp from '@/components/seo/SchemaOrg';

const posts: Record<string, {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  author: string;
  content: string;
}> = {
  'what-to-do-macbook-liquid-damage': {
    slug: 'what-to-do-macbook-liquid-damage',
    title: 'What to Do Immediately After Your MacBook Gets Wet',
    excerpt: 'The first 30 minutes after a liquid spill are critical. Here is exactly what to do — and what not to do — to maximise your chances of a successful repair.',
    date: '08/03/2026',
    category: 'Repair Guides',
    readTime: '5 min read',
    author: 'ZA Support',
    content: `
## The First 30 Minutes Are Everything

Liquid damage is the most time-sensitive repair scenario in the Apple ecosystem. The corrosive process begins the moment liquid contacts your logic board — and every minute you wait reduces the likelihood of a full recovery.

This guide covers exactly what to do in the critical window after a spill, based on 16 years of MacBook liquid damage repair in Johannesburg.

## Step 1: Power Off Immediately (Do Not Hesitate)

The single most important action is to cut power to the device as fast as possible.

**Do this immediately:**
- Hold the power button until the MacBook shuts off (do not wait for a graceful shutdown)
- If it will not shut off, close the lid firmly — this may trigger sleep mode
- Unplug the charger from the wall first, then disconnect from the MacBook

**Why this matters:** Liquid conducts electricity. A powered board with liquid present creates short circuits that burn traces, capacitors, and chips within seconds. A machine that was off when spilled has a vastly higher recovery rate than one that shorted under power.

## Step 2: Disconnect All Peripherals

Remove everything connected to the MacBook:
- USB-C / Thunderbolt cables and hubs
- External monitors
- SD cards
- USB drives
- Headphones

Each connected peripheral is a potential short circuit pathway. Disconnect them before anything else.

## Step 3: Do Not Tilt — Position Correctly

Many people instinctively tilt the MacBook to drain liquid. This is often counterproductive.

If liquid has entered through the keyboard area, tilting the machine can direct it toward the logic board — which is positioned below the keyboard in most MacBook designs.

**Correct position:** Place the MacBook flat on a clean, absorbent surface (a dry towel works). If liquid is actively draining from the chassis, you may angle it slightly to encourage drainage, but do not invert it aggressively.

## Step 4: Do Not Try to Turn It Back On

This is the second-most-common mistake. Once a spill has occurred, the instinct is to "check if it still works." Powering on a wet board causes immediate short circuits.

Even if the machine appears to power on normally, corrosion is already beginning. The damage will manifest hours or days later as:
- Random shutdowns
- Keyboard failures
- No charging
- Display issues
- Complete failure to boot

## Step 5: Do Not Use a Hairdryer or Oven

Heat does not help with liquid damage and causes additional harm:
- Hairdryers push liquid deeper into the chassis via air pressure
- High heat warps plastic connectors and damages solder joints
- Ovens are dangerous and destroy thermal paste and adhesives

Room-temperature airflow (a fan positioned to blow across — not into — the vents) is acceptable. Heat is not.

## The Rice Myth

Rice does not work for MacBooks. This is not a matter of debate — it is physics.

Rice is hygroscopic, meaning it absorbs moisture from the air around it. It cannot draw liquid out of a sealed chassis, off a circuit board, or from inside a connector.

More importantly, rice does nothing to stop corrosion. The damage happening inside your MacBook is a chemical process — oxidation and electrolytic corrosion — that continues with or without a bowl of rice nearby.

**What rice actually does:** It gives you a false sense of action while corrosion progresses unchecked.

## What You Should Do Instead

**Bring it to us — today.**

Our liquid damage assessment process begins with:

1. Full chassis disassembly (we remove every component from the board)
2. Ultrasonic cleaning bath — the only reliable method to remove corrosive residue
3. Isopropyl alcohol cleaning under magnification
4. Component-level inspection under specialist equipment
5. Power-on test after confirmed drying
6. Full diagnostic under load

The earlier we begin this process, the higher your recovery rate. Machines brought in within 2 hours of a spill have a significantly better outcome than those that arrive the following day.

## What We Cannot Recover

To be honest with you: some liquid damage is irreversible. Machines that were powered on post-spill, or that sat for several days before arriving, often have burned traces or failed chips that cannot be repaired economically.

In those cases, we will tell you clearly. Our Assessment: R899 ex VAT policy means you never pay for an unsuccessful assessment.

## Summary: The Liquid Damage Checklist

1. ✓ Power off immediately — hold the button, do not wait
2. ✓ Disconnect all cables and peripherals
3. ✓ Place flat on a dry, absorbent surface
4. ✗ Do not power on again
5. ✗ Do not use rice
6. ✗ Do not use a hairdryer
7. ✓ Contact ZA Support immediately — 064 529 5863

We assess liquid-damaged MacBooks same day, 7 days a week. Call us before you do anything else.
    `.trim(),
  },
  'why-rice-does-not-work': {
    slug: 'why-rice-does-not-work',
    title: 'Why Putting Your iPhone in Rice Does Not Work',
    excerpt: 'The rice myth is one of the most damaging pieces of consumer advice circulating online. We explain why it does not work and what you should do instead.',
    date: '01/03/2026',
    category: 'Repair Guides',
    readTime: '4 min read',
    author: 'ZA Support',
    content: `
## The Most Persistent Myth in Device Repair

"Put it in rice" is the most commonly given piece of advice for water-damaged electronics. It is also almost entirely useless — and in some cases, actively harmful.

After 16 years of repairing liquid-damaged iPhones, MacBooks, and iPads in Johannesburg, we have seen the consequences of this myth more times than we can count. This article explains, clearly and technically, why rice does not work and what you should do instead.

## Why Rice Does Not Work: The Physics

Rice is hygroscopic — it absorbs moisture from the surrounding air. This is the basis of the myth: people assume that placing a wet device in rice will draw the liquid out.

The problem is that liquid inside a sealed device is not accessible to the surrounding air. Your iPhone has:
- A sealed IP-rated enclosure (IP67 or IP68 depending on model)
- Tight tolerances between chassis components
- Gaskets and adhesives around internal connectors

Rice sitting outside the device cannot draw liquid out through these barriers. The liquid inside your iPhone will not migrate through the chassis wall because rice is nearby.

## What Is Actually Happening Inside Your Device

While your iPhone sits in a bowl of rice, corrosion is actively progressing inside it.

Liquid damage is not primarily about liquid — it is about electrolytic corrosion. When conductive liquid (tap water, juice, coffee, seawater) contacts a powered circuit board, it creates an electrolytic cell. Metal ions migrate away from traces, pads, and component leads. Oxide and hydroxide compounds form on contact surfaces.

This process continues for hours and days after the spill. The longer it runs, the more permanent the damage becomes.

Rice does nothing to stop or slow this chemical process.

## The Starch Problem

Rice dust and starch particles are an additional hazard. Fine particles from rice can:
- Enter your device through any gaps or speaker grilles
- Contaminate the charging port
- Coat internal components with a sticky residue when mixed with liquid

We have cleaned rice residue off iPhone logic boards. It is not helpful.

## What Actually Works

**1. Immediate power-off**
The single most important action. Power off the device immediately — hold the side button and volume down together on Face ID iPhones. This stops electrolytic corrosion from continuing under power.

**2. Professional ultrasonic cleaning**
The industry-standard method. Ultrasonic cleaners create cavitation bubbles in a specialised cleaning fluid that agitates and removes corrosive residue from every surface of the board — including under chips and in connectors that are physically inaccessible otherwise.

**3. Isopropyl alcohol rinse**
High-purity (99%+) isopropyl alcohol is water-miscible and evaporates completely. A thorough IPA rinse displaces water and removes conductive residue.

**4. Component-level inspection**
After cleaning, a specialist equipment inspection identifies compromised components, burned traces, and damaged connectors that need replacement.

## The Time Factor

Every hour matters with liquid damage. Our data from over 3,000 repairs shows a clear relationship between time-to-treatment and recovery rate:

- Under 2 hours: highest recovery rate
- 2–24 hours: good recovery rate, minor component replacement typically needed
- 24–72 hours: moderate recovery, board-level repair often required
- 72+ hours: significantly reduced recovery rate, extensive corrosion likely

No amount of rice changes this curve.

## What You Should Do

1. Power off immediately
2. Do not plug in to charge
3. Do not press any buttons (this can push liquid into connectors)
4. Bring it to ZA Support as soon as possible — same day is best

We offer free liquid damage assessments, 7 days a week. Assessment: R899 ex VAT on all repairs. Call 064 529 5863.
    `.trim(),
  },
  'macbook-load-shedding-damage': {
    slug: 'macbook-load-shedding-damage',
    title: 'Load Shedding Damaged My MacBook: What You Need to Know',
    excerpt: 'Load shedding does not just cut your power — the surge when power returns can silently destroy a MacBook logic board. Here is what happens, the warning signs, and how to protect your machine.',
    date: '14/03/2026',
    category: 'Repair Guides',
    readTime: '7 min read',
    author: 'ZA Support',
    content: `
## The Real Danger Is Not the Outage — It Is the Return

Most South Africans have learned to live with load shedding. You save your work, you wait, the power comes back. Simple enough.

What very few people know is that the moment power returns — that sudden, unregulated surge of electricity flooding back into the grid — is one of the most dangerous events for any electronics in your home or office. For a MacBook, it can mean the difference between a working machine and a completely dead logic board.

This guide explains exactly what happens to a MacBook during a load shedding surge, the warning signs that your machine has been affected, and what to do about it.

## Why Load Shedding Damages MacBooks: The Power Rail Explanation

Your MacBook is not simply "off or on." Inside it, a series of carefully regulated power lines — called power rails — deliver precise voltages to every component: the processor, the memory, the storage, the display. These rails are managed by a controller chip that expects stable, clean power from your charger.

When Eskom restores power after a load shedding stage, the reinstatement is not clean. Transformers reactivate under load, causing a voltage spike — a brief surge that travels through your wall socket, into your charger, and into your MacBook's power delivery circuitry.

Think of it like water in a pipe. When the supply is cut off and then suddenly restored at full pressure, the first thing through the pipe hits hard. Your MacBook's power controller is designed to handle normal fluctuations — but a reinstatement surge can exceed its tolerance, burning out components on the logic board.

The damage typically affects:

- The MOSFET transistors that regulate voltage to the processor
- The SMC (System Management Controller) chip that manages power states
- Capacitors on the primary power rails
- In severe cases, the CPU or GPU itself

The worst part: the damage is often invisible. Your MacBook may appear to switch on normally and then fail hours or days later. Or it may simply not turn on at all the next morning.

## Warning Signs Your MacBook Was Damaged by a Power Surge

Surge damage rarely announces itself immediately. These are the patterns we see most often in machines brought in after load shedding events:

**The machine will not turn on at all.**
You plug in the charger, press the power button, and nothing happens. No startup chime, no fan spin, no screen activity. This is the most common presentation of surge damage to the main power rail.

**The charger LED stays amber and never turns green.**
The MacBook draws charge but never reaches full power. The battery management circuit on the logic board has been compromised.

**Intermittent shutdowns under load.**
The MacBook starts normally but shuts off when you open a demanding application, connect an external display, or plug in peripherals. The damaged power rail cannot sustain current under load.

**The MagSafe or USB-C charger is not recognised.**
The machine does not respond to the charger at all — no charging indicator, no response in System Information. The power delivery controller has failed.

**Kernel panics shortly after startup.**
Random crashes with a grey screen and a restart prompt, typically pointing to a power-related kernel extension in the panic log.

**Distorted or flickering display.**
The display power rail has been affected. Lines across the screen, flickering, or a backlight that turns on but shows no image.

**Extremely hot chassis near the charger port.**
A component on the power delivery circuit is short-circuiting and dissipating heat directly into the chassis.

If you experienced a load shedding event in the last 24–72 hours and your MacBook is showing any of these symptoms, the machine needs to be assessed immediately.

## What to Do Immediately If You Suspect Surge Damage

**Step 1: Stop charging the machine.**
Disconnect the charger now. If a component on the power rail has been compromised, continuing to supply power risks cascading damage to components that are currently still functional. Every hour of continued charging after surge damage can worsen the repair outcome significantly.

**Step 2: Do not force it to power on repeatedly.**
We understand the instinct — you want to check if it still works. But pressing the power button repeatedly on a surge-damaged board risks triggering short circuits through already-weakened components. One careful power-on attempt is acceptable. More than that increases risk.

**Step 3: Note the sequence of events.**
When did the load shedding occur? When did the power return? Was the MacBook plugged in at the time? Was it on sleep or fully on? This information helps us diagnose the failure point quickly and accurately.

**Step 4: Bring it to us as soon as possible.**
Surge damage diagnosis requires specialist equipment: a DC power supply for safe bench testing, a thermal camera to identify hot components, oscilloscope access for power rail measurement, and microscope inspection of the logic board. This is not a home-repair situation.

## How ZA Support Repairs Surge Damage

The most important thing to understand about surge damage repair is this: we repair at component level, not board replacement level.

Authorised service providers quote significantly more for MacBook logic board issues because their process is a full board swap — they remove the entire logic board and install a new one. That price is not the cost of the fault. It is the cost of their refusal to diagnose at component level.

Our process is different:

**1. DC bench power supply test**
We bypass the internal battery and charger entirely, applying clean, controlled power directly to the board at known voltages. This tells us immediately which power rail has failed without risking further damage.

**2. Thermal camera scan**
An infrared camera identifies components running hotter than expected — the location of a short circuit or failed component shows up clearly as a heat signature.

**3. Schematic-level fault tracing**
Using board-level schematics and a multimeter, we trace the failed circuit back to the specific component — often a single MOSFET, capacitor, or power management IC costing a few rand to replace.

**4. Microsolder component replacement**
Failed components are removed using specialist equipment and replaced with matching-specification parts.

**5. Power-on verification and load test**
After repair, the board is tested under load using load testing and a full diagnostic suite to confirm stable power delivery before reassembly.

**The result:** You get your data back. Your original machine is returned working. And you pay a fraction of the board-replacement quote.

Surge damage repair at ZA Support is available at component level — significantly less than full board replacement at authorised service. Most repairs are completed within 3–5 working days.

## Prevention: The Right UPS for Your MacBook in South Africa

The single most effective protection against load shedding surge damage is a quality uninterruptible power supply (UPS). A UPS does two things: it provides battery backup during the outage so your MacBook does not shut down abruptly, and — critically — it conditions the power, absorbing the reinstatement surge before it reaches your charger.

Not all UPS units are equal. For MacBook protection in a South African home or office environment, these are the units we recommend:

### APC Back-UPS Pro 1500VA (Recommended for home offices)

APC is the gold standard for personal and small-business UPS. The Back-UPS Pro 1500VA provides true sine wave output (essential for MacBook chargers, which are switching power supplies), automatic voltage regulation (AVR) to handle brownouts, and surge suppression rated above the reinstatement spikes common on the South African grid.

It provides approximately 30–45 minutes of runtime for a MacBook Air or Pro with normal usage. Available from Incredible Connection, Takealot, and specialist IT suppliers.

### Mecer 2000VA Line-Interactive UPS (Best value for South Africa)

Mecer is a South African brand with service and parts availability locally — an important consideration when a UPS needs warranty service. The 2000VA line-interactive model provides AVR and pure sine wave output, with runtime suitable for finishing work and safely shutting down during extended outages.

Available from Takealot and Mecer resellers. Replace the battery every 3–4 years for continued protection.

### Eaton 5E 1100VA (Budget option for MacBook Air)

Eaton's entry-level 5E series provides adequate surge suppression and AVR for a single MacBook Air in a home setup. It does not offer pure sine wave output, which is acceptable for most MacBook chargers but should be noted.

Available from Eaton resellers and Takealot.

**Important note on UPS placement:** Plug your MacBook charger into the UPS. Do not plug the UPS into an extension lead — connect it directly to a wall socket rated for the UPS's current draw. Daisy-chaining extension leads eliminates much of the protection the UPS provides.

**Battery maintenance:** A UPS with a degraded battery can fail to suppress surges effectively. Test your UPS battery annually and replace it every 3–4 years regardless of apparent condition. Most South African UPS batteries are available locally from the original manufacturer or specialist battery suppliers.

## The Cost of Not Having a UPS

A quality UPS is a cost-effective investment. A MacBook logic board repair after surge damage at ZA Support is available at component level — significantly less than full board replacement through authorised service.

But beyond repair cost, there is a more important number: the value of your data. Logic board surge damage frequently affects the SSD controller. In those cases, data recovery is a separate, complex process on top of the board repair. Preventing the damage entirely is vastly more cost-effective than any repair.

South Africa averages over 200 load shedding days per year. Every one of those days includes a reinstatement event. Over 12 months, your MacBook is exposed to hundreds of potential surge events if it is connected without protection.

## Frequently Asked Questions

**Q: My MacBook was not plugged in during load shedding — can it still be damaged?**

If the MacBook was not connected to a charger or any peripherals during the outage, it is very unlikely to have been affected by the power reinstatement surge. The surge travels through the electrical supply — if your MacBook was running on battery with no cables connected, it was isolated from the event. However, if you plugged the charger back in immediately after power returned, that first connection carries the surge.

**Q: My MacBook turned on fine after load shedding — am I safe?**

Not necessarily. Surge damage to certain components — particularly capacitors — can manifest as a gradual failure over days or weeks. If your machine experienced a reinstatement event while plugged in, watch for the warning signs described above over the following week. Any unexpected shutdowns, charging irregularities, or performance changes should be investigated promptly.

**Q: Can authorised service providers repair surge damage?**

Apple authorised service in South Africa does not offer component-level logic board repair. They will quote a full board replacement or, in many cases, decline to repair the machine at all if it is out of 3-month warranty. ZA Support is a component-level repair workshop — we fix the specific fault, not the whole board.

**Q: How long does surge damage repair take?**

Most surge damage repairs are completed within 3–5 working days. Complex cases involving multiple failed components or damaged data storage can extend to 7–10 days. We provide a clear timeline estimate during the assessment assessment.

**Q: Does my Apple Care or device insurance cover surge damage?**

AppleCare does not cover accidental damage or power surge damage — it covers manufacturing defects and, with AppleCare+, accidental damage at an excess fee. Most South African short-term insurance policies do cover surge damage to electronics as a specified or all-risk item, but the excess is often close to or exceeds the cost of a ZA Support repair. Check your policy schedule. We can provide a detailed repair quotation for insurance claim purposes.

**Q: What is the best UPS for a home office MacBook setup in South Africa?**

For most home offices running a MacBook Pro or MacBook Air, we recommend the APC Back-UPS Pro 1500VA or the Mecer 2000VA. Both provide true sine wave output, automatic voltage regulation, and adequate runtime. Avoid cheap generic UPS units without AVR — they absorb some surge but do not regulate brownout conditions that are common during load shedding transitions.

## Book a Free Surge Damage Assessment

If your MacBook is showing any of the symptoms described in this guide — or if it was plugged in during a load shedding reinstatement event and you want peace of mind — bring it in for a assessment fee (R899 ex VAT).

We are based at 1 Hyde Park Lane, Hyde Park, Johannesburg. We assess surge damage same day, 7 days a week. Assessment: R899 ex VAT on all repairs.

Call **064 529 5863** or message us on WhatsApp. We will have a clear answer for you within the hour.
    `.trim(),
  },
  'macbook-running-slow': {
    slug: 'macbook-running-slow',
    title: 'Why Is My MacBook Running Slow? 7 Fixes That Actually Work',
    excerpt: 'A slow MacBook is almost always fixable without spending a cent. Here are the 7 most common causes of MacBook slowness and exactly how to fix each one.',
    date: '14/03/2026',
    category: 'How-To Guides',
    readTime: '8 min read',
    author: 'ZA Support',
    content: `
## Why Your MacBook Is Running Slow

A slow MacBook is one of the most frustrating IT problems — and one of the most misdiagnosed. Most people assume the machine is simply old and needs replacing. In our experience, the vast majority of slow MacBook cases are caused by fixable software and configuration issues, not failing hardware.

This guide covers the 7 most common causes of MacBook slowness, how to diagnose each one, and the exact steps to fix them. These are the same checks our technicians run during every Health Check service in Johannesburg.

## 1. Your Storage Is Nearly Full

This is the single most common cause of a slow Mac. macOS uses free storage space as virtual memory — when your drive fills up, the operating system has nowhere to write temporary data, and everything grinds to a halt.

**Symptoms:** General sluggishness across all applications. Long delays when opening files. Spinning beach ball on startup and after waking from sleep.

**How to check:** Apple menu → About This Mac → Storage. If available storage is under 20 GB on a 256 GB drive, or under 40 GB on a 512 GB drive, storage pressure is likely contributing to your slowness.

**How to fix:**
- Open Finder → Go → Downloads. Delete old downloads you no longer need.
- Open Photos → check Library for duplicates. Use the Duplicates album (macOS Ventura and later).
- Empty the Trash — it does not free space until emptied.
- Move large video files and archives to an external drive.
- If you use Time Machine, check that local snapshots are not consuming space: open Terminal and type \`tmutil listlocalsnapshots /\`

If storage is critically low (under 10 GB), your Mac may be nearly unusable regardless of other fixes. This is often the entire problem.

## 2. Too Many Login Items Starting Automatically

Every application that launches on startup consumes memory and CPU before you have even opened anything. Macs accumulate login items silently — a cloud backup app here, a printer utility there — and after a few years, a dozen applications can be fighting for resources before you have opened Safari.

**How to check (macOS Ventura and later):** System Settings → General → Login Items. Review both the "Open at Login" list and the "Allow in Background" section.

**How to fix:**
- Remove everything from "Open at Login" that you do not immediately need when you start your Mac. Applications you use daily (Zoom, Slack) may be reasonable to keep. Printer utilities, updater daemons, and cloud sync apps for services you rarely use should be removed.
- Toggle off the "Allow in Background" items for applications you do not actively use.

**On older macOS (Monterey and earlier):** System Preferences → Users & Groups → Login Items → select the item → click the minus button.

The effect on startup time and available memory can be substantial — we routinely see Macs with 20+ login items where removing half of them delivers an immediate, noticeable improvement.

## 3. Background Processes Consuming CPU

Sometimes a single misbehaving process consumes an entire CPU core, making the entire machine feel sluggish even though nothing visible is open.

**How to check:** Open Activity Monitor (Applications → Utilities → Activity Monitor). Click the CPU tab. Sort by % CPU descending. Look for any process using more than 20–30% CPU continuously when you are not actively doing anything demanding.

**Common culprits:**
- **Spotlight indexing** (mdworker_shared, mds_stores): This is normal after an OS update or after adding a large external drive. It will complete on its own — typically within a few hours. You cannot and should not kill it.
- **Antivirus software**: Some AV products run continuous background scans that consume significant CPU. If a product called "MegaCleaner," "Advanced Mac Cleaner," or any product you do not recognise is consuming CPU, this needs investigation.
- **cloudd / bird**: iCloud sync processes. If these are stuck at high CPU, signing out of iCloud and back in usually resolves it.
- **kernel_task**: If kernel_task is using very high CPU (over 200%), this is often a thermal management response — the Mac is overheating and throttling the processor. See Fix 6.

**How to fix:** For processes you do not recognise, note the name and search for it. Most legitimate system processes have well-documented purposes. If something unfamiliar is consuming sustained high CPU, bring the Mac to us for assessment — this can indicate malware or a software fault.

## 4. Insufficient RAM for Your Workflow

Modern macOS and application requirements have grown significantly. A MacBook with 8 GB of RAM running macOS Sonoma or Sequoia with multiple browser tabs, Zoom, Microsoft Office, and a cloud sync client is likely under constant memory pressure.

**How to check:** Open Activity Monitor → Memory tab. Look at the "Memory Pressure" graph at the bottom. Green = fine. Yellow = moderate pressure. Red = the Mac is actively swapping, and performance will suffer.

Also check the "Swap Used" figure. If swap usage is consistently above 2–3 GB, your Mac does not have enough RAM for your typical workload.

**For Intel Macs:** RAM is upgradeable on most MacBook Pro models up to 2019. A RAM upgrade from 8 GB to 16 GB is one of the highest-value upgrades we offer — fitted at our Hyde Park workshop — and the performance improvement on a memory-constrained machine is immediate and significant. [Contact us about a RAM upgrade.](/contact)

**For Apple Silicon Macs (M1–M4):** RAM is not upgradeable — it is integrated into the chip. If your M1 or M2 Mac with 8 GB is consistently hitting memory pressure, the realistic options are managing your workflow (fewer browser tabs, close unused apps) or planning an upgrade to a 16 GB model.

## 5. macOS Needs an Update

Apple regularly ships performance improvements, bug fixes, and optimisations in macOS updates. Running a significantly outdated version of macOS can mean missing substantial under-the-hood improvements.

**How to check:** Apple menu → System Settings → General → Software Update.

**How to update:** If an update is available, install it. For major macOS version upgrades (e.g., moving from Ventura to Sonoma), we recommend checking your applications for compatibility first — particularly if you use specialist software.

**One caveat:** On very old Intel Macs (pre-2017), forcing the latest macOS version via third-party tools like OCLP can sometimes cause slowness, not cure it. The Mac's hardware may not have the headroom to run the newer OS efficiently. If you are running OCLP on an older machine, stay on a version that runs smoothly rather than chasing the latest.

## 6. Thermal Throttling (Overheating)

When a MacBook's processor temperature exceeds safe limits, macOS automatically reduces clock speed to prevent damage — a process called thermal throttling. The result is dramatically reduced performance that feels identical to other slowness causes.

**Symptoms:** Slowness that is worse under sustained load (video calls, compilation, video rendering). The fan running constantly at high speed. The chassis being hot to the touch near the hinge or exhaust vents.

**Common causes on older MacBooks:**
- Degraded or dried-out thermal paste between the CPU and heatsink
- Blocked exhaust vents from dust accumulation
- A failing or slow fan

**How to check:** Download Macs Fan Control (free, from crystalidea.com). Open it and check your CPU die temperature. Under normal light use, this should be below 60°C. If you see temperatures above 80°C at idle or light load, thermal paste replacement is very likely needed.

**The fix:** Thermal paste replacement on a MacBook at ZA Support can deliver dramatic performance recovery on machines 4+ years old. On a 2017–2019 MacBook Pro, we routinely see temperatures drop by 20–30°C after a repaste, with proportionally improved performance.

[Read more about our MacBook servicing.](/apple-repair)

## 7. Your SSD May Be Failing

Storage drive health is rarely checked and is often overlooked as a performance cause. A MacBook SSD in the early stages of failure can exhibit dramatically increased read/write latency — the drive is still functional, but operations that normally take milliseconds are taking seconds.

**How to check:** Download DriveDx (paid) or use the free Disk Utility (Applications → Utilities → Disk Utility → select your drive → First Aid). DriveDx gives a more detailed S.M.A.R.T. analysis including reallocated sectors and error counts.

**Warning signs of a failing SSD:**
- Dramatically long application launch times even for simple apps
- Frequent "spinning beach ball" when switching between applications
- System freezes that last 10–30 seconds and then resume
- Failure to complete macOS updates

If DriveDx or Disk Utility reports any S.M.A.R.T. errors or caution status, back up your data immediately and bring the machine to us. SSD failure is progressive — a drive showing early S.M.A.R.T. warnings can fail completely within days to weeks.

[SSD replacement at ZA Support](/apple-repair) is available fitted, including a fresh macOS install and data migration.

## Still Slow After Trying These Fixes?

If you have worked through all seven fixes and your MacBook is still performing below expectations, the issue is likely hardware-level — either thermal paste degradation, a failing SSD, or insufficient RAM for your workload.

Our [Health Check service](/apple-repair) covers all of these: we run a full 28-phase diagnostic covering hardware, storage health, memory pressure, security, and software — and give you a plain-English report with exactly what we found and what we recommend.

**Assessment: R899 ex VAT. Hyde Park, Johannesburg.**

WhatsApp us on [064 529 5863](https://wa.me/27645295863) to book a same-day assessment.
    `.trim(),
  },
  'macbook-wont-connect-wifi': {
    slug: 'macbook-wont-connect-wifi',
    title: 'MacBook Won\'t Connect to WiFi: Complete Fix Guide (2026)',
    excerpt: 'MacBook WiFi problems range from a 30-second software fix to a hardware fault requiring repair. This guide walks through every fix in order, so you resolve it without unnecessary steps.',
    date: '14/03/2026',
    category: 'How-To Guides',
    readTime: '7 min read',
    author: 'ZA Support',
    content: `
## MacBook WiFi Not Working — Start Here

WiFi problems on a MacBook fall into a predictable set of categories: a corrupted network configuration, a conflicting system file, a router issue mistaken for a Mac issue, a macOS bug, or — least commonly — a hardware fault with the WiFi card.

This guide works through every fix in order of complexity. Start at Fix 1. Most cases are resolved by Fix 4. Hardware faults are covered at the end.

## Before You Start: Is It the Mac or the Router?

Before spending time on your MacBook, confirm the problem is not with your router or ISP.

**Quick test:** Take out your phone and connect it to the same WiFi network. If your phone also cannot connect or is experiencing the same symptoms, the problem is the router or ISP, not the Mac.

If your phone connects fine but the MacBook does not, continue with the fixes below.

## Fix 1: Turn WiFi Off and Back On

This sounds trivial, but a simple toggle resolves a surprising number of transient WiFi failures — particularly after waking from sleep.

Click the WiFi icon in the menu bar → Turn WiFi Off. Wait 10 seconds. Turn WiFi On. Attempt to connect.

If this does not work within 30 seconds, move to Fix 2.

## Fix 2: Forget the Network and Reconnect

Your Mac stores network credentials and configuration data for every network it has connected to. If that stored data is corrupted or stale, the Mac will fail to connect even when everything else is working correctly.

**Steps:**
1. System Settings → WiFi
2. Click the i (information) button next to your network name
3. Click "Forget This Network" → Forget
4. Click on your network name in the list and enter your password as if connecting for the first time

If you do not know your WiFi password, it is typically on a sticker on your router. For business networks, your IT administrator has it.

## Fix 3: Restart Your Router

Even if your phone is connecting fine, restarting the router can resolve issues with how it is handling the Mac's specific connection request.

Unplug your router from the power socket. Wait 30 seconds (not 5 — the router needs time to fully discharge). Plug it back in. Wait 60–90 seconds for it to fully restart before attempting to connect.

## Fix 4: Delete Stored WiFi Preference Files

macOS stores WiFi configuration in a set of preference files. When these become corrupted — which can happen after an OS update, after a crash, or gradually over time — WiFi connections become unreliable or fail entirely.

**Steps (requires admin password):**

1. Open Finder
2. Press Cmd+Shift+G to open "Go to Folder"
3. Type: /Library/Preferences/SystemConfiguration/
4. Look for these files and move them to the Desktop (do not delete yet — you can restore them if needed):
   - com.apple.airport.preferences.plist
   - com.apple.network.identification.plist
   - com.apple.wifi.message-tracer.plist
   - NetworkInterfaces.plist
   - preferences.plist
5. Restart your Mac
6. Attempt to connect to WiFi

After the restart, macOS will recreate these files from scratch. If WiFi now works, you can delete the files you moved to the Desktop. If it does not, move them back and continue to Fix 5.

## Fix 5: Create a New Network Location

macOS Network Locations allow you to save different network configurations. Creating a new location forces a clean set of network settings without permanently deleting anything.

1. System Settings → Network
2. Click the three-dot menu at the top of the left sidebar → Edit Locations
3. Click the + button to add a new location
4. Name it "Home" or "Default" → Done
5. With your new location selected, try connecting to WiFi

## Fix 6: Check for IP Address Conflicts

Your router assigns IP addresses to devices on your network. Occasionally, two devices on the same network are assigned the same IP address, causing connectivity failures.

**How to check:**
1. System Settings → Network → WiFi → Details (next to your connected network)
2. Check the IP Address field. If it shows 169.254.x.x, your Mac has failed to obtain a valid IP address from the router (this is an APIPA address — a fallback address assigned when DHCP fails).

**Fix:** In the same Details screen, click "Renew DHCP Lease." If this does not work, change the Configure IPv4 setting from "Using DHCP" to "Using DHCP with manual address" and enter a number in the IP address field that ends in a high number (e.g., 192.168.1.200) to avoid conflicts.

## Fix 7: Update macOS

Some macOS versions have shipped with known WiFi bugs that were fixed in subsequent point releases. If you are running a version that has known WiFi issues, an update may resolve everything.

Apple menu → System Settings → General → Software Update. Install any available updates.

## Fix 8: Check WiFi Hardware in System Information

If none of the above fixes have worked, it is worth confirming that macOS can actually see the WiFi hardware.

1. Hold Option and click the Apple menu → System Information
2. In the left sidebar, under Network, click WiFi
3. Look at the WiFi section in the right pane

If you see card details (a card name like "Broadcom BCM43xx" or "Apple Wireless" with a MAC address), the hardware is present and macOS can communicate with it.

If the WiFi section shows "No Information Found" or is blank, macOS cannot detect the WiFi card. This indicates either a hardware fault or a connector that has come loose — proceed to the Hardware section below.

## Fix 9: Safe Mode WiFi Test

Booting into Safe Mode loads a minimal version of macOS without third-party extensions. If WiFi works in Safe Mode but not in normal boot, a third-party kernel extension or security tool is interfering with your WiFi stack.

**Intel Mac:** Restart, then hold Shift during startup until you see the login screen with "Safe Boot" in the top right.

**Apple Silicon Mac:** Shut down. Press and hold the power button until you see "Loading startup options." Select your startup disk, hold Shift, and click "Continue in Safe Mode."

In Safe Mode, attempt to connect to WiFi. If it works, the problem is a third-party software conflict. Common culprits include VPN software, security tools, and network monitoring applications.

## Hardware Faults: When Software Fixes Do Not Work

If you have worked through every fix above and WiFi still does not work — or if System Information cannot detect the WiFi card — the issue is hardware.

**MacBook WiFi hardware faults are typically one of:**

**Loose or failed antenna connector:** The WiFi antenna runs through the MacBook display hinge. On older MacBooks (particularly 2015–2019 models), this connector can come loose or fail. Reconnecting it is a straightforward repair.

**Failed WiFi/Bluetooth card:** The WiFi card (which on most MacBooks also handles Bluetooth) can fail. On Intel MacBooks, this is a replaceable part. On Apple Silicon MacBooks, the WiFi chip is on the logic board and requires board-level repair.

**Logic board WiFi circuit fault:** Rare, but possible — particularly on machines that have experienced liquid damage or surge damage.

**What to do:** Bring the machine to us for a assessment. We can determine within 15 minutes whether the fault is software, a loose connector, or a hardware component failure — and give you a clear quote before any work begins.

[Book a free WiFi diagnostic.](https://wa.me/27645295863)

## Frequently Asked Questions

**Q: My Mac connects to WiFi but drops it repeatedly — is this the same problem?**

Intermittent drops are usually caused by a different set of issues: interference from other 2.4GHz devices (microwaves, baby monitors, other routers), a router that is overloaded with connected devices, or a DHCP lease renewal failure. The fix for intermittent drops is typically switching to the 5GHz band on your router and ensuring your router firmware is up to date.

**Q: My MacBook connects to WiFi but says "No Internet Connection" — what does that mean?**

This means your Mac is connected to your router but the router cannot reach the internet. This is an ISP or router problem, not a Mac problem. Restart the router, and if the problem persists, contact your ISP. Check [our ISP outage monitor](/) for known outages affecting South African providers.

**Q: Can I use a USB WiFi adapter as a workaround?**

Yes. A USB-C to WiFi adapter (available from Takealot) will work while you arrange a repair. macOS supports most generic USB WiFi adapters without additional drivers.

**Q: My Mac connects to my home WiFi but not to office or public networks — why?**

This usually indicates a network authentication or proxy configuration issue rather than a hardware fault. Office networks often use enterprise authentication (WPA2-Enterprise or WPA3-Enterprise) that requires specific certificate profiles. Bring the Mac to your IT team, or [contact ZA Support](/contact) for business network support.

WhatsApp us on [064 529 5863](https://wa.me/27645295863) for a same-day assessment at our Hyde Park workshop.
    `.trim(),
  },
  'apple-id-locked-out': {
    slug: 'apple-id-locked-out',
    title: 'Locked Out of Apple ID? Here\'s Exactly What to Do',
    excerpt: 'Being locked out of your Apple ID affects your Mac, iPhone, iPad, and access to every Apple service. This guide covers every recovery method available in 2026 — including what to do when the standard options fail.',
    date: '14/03/2026',
    category: 'How-To Guides',
    readTime: '9 min read',
    author: 'ZA Support',
    content: `
## Locked Out of Apple ID: What Is Actually Happening

An Apple ID lockout can mean one of three different things, and the recovery method depends entirely on which type you are dealing with:

**Type 1 — Disabled for security:** Apple disabled your account after multiple failed password attempts, unusual activity, or a security concern flagged by Apple's systems. You will see "This Apple ID has been disabled for security reasons."

**Type 2 — Account locked:** Too many failed password attempts have temporarily locked the account. You will see "Your Apple ID is locked."

**Type 3 — Forgotten password:** You know the account is active but you no longer know the password. You will see a standard authentication failure.

Each type has a specific recovery path. Start with the standard method below — it handles all three cases.

## Method 1: Recovery via iforgot.apple.com (Start Here)

Apple's account recovery page handles the majority of lockout situations.

1. On any device or browser, go to [iforgot.apple.com](https://iforgot.apple.com)
2. Enter your Apple ID email address
3. Choose your verification method:
   - **Trusted phone number** (most common): Apple sends a 6-digit code to your registered phone number
   - **Recovery key**: If you set up Account Recovery Key (a 28-character key), enter it here
   - **Trusted device**: If you have another Apple device signed into the same Apple ID and it is nearby, it can receive the verification prompt

If the trusted phone number is a current number you have access to, this should work immediately.

## Method 2: Two-Factor Authentication Recovery

If you set up two-factor authentication (2FA), the recovery process uses your trusted devices and phone numbers.

**If you have access to a trusted device (another iPhone, iPad, or Mac signed into the same Apple ID):**
1. On the trusted device, go to Settings → [Your Name] → Password & Security
2. Tap "Change Password" or follow the prompt to reset
3. The device itself acts as a verification method

**If you no longer have access to any trusted device:**
1. Go to iforgot.apple.com
2. Enter your Apple ID
3. Select "Can't access this phone number or device?"
4. Apple will begin an Account Recovery process (see Method 4 below)

## Method 3: Reset via Your Mac (FileVault Linked Accounts)

If your Mac uses FileVault disk encryption and your Apple ID is linked as a FileVault recovery method, you may be able to reset your Apple ID password directly from the Mac login screen.

**Steps:**
1. At the Mac login screen, enter an incorrect password three times
2. A message appears: "If you forgot your password, you can reset it using your Apple ID"
3. Click the Apple ID reset option
4. Follow the on-screen prompts — this connects to Apple's servers and initiates a password reset

This method requires an active internet connection at the login screen and the Apple ID account being in a recoverable state.

## Method 4: Apple Account Recovery (Last Resort — 72+ Hours)

If you have lost access to all trusted devices, your trusted phone numbers are no longer active, and you do not have a recovery key, Apple's Account Recovery process is the only remaining option.

**What it involves:**
1. Start the recovery at iforgot.apple.com — select "Start account recovery"
2. Apple verifies your identity using the information on the account: devices previously signed in, purchase history, billing address
3. Apple sets a waiting period — typically 72 hours to several weeks depending on the account security level
4. During the waiting period, if anyone else attempts to sign in or use the account, the recovery is cancelled (this is a security measure)
5. After the wait, Apple sends a notification to your trusted number or email confirming you can reset the password

**Important:** Do not cancel or interrupt the recovery process once started. Do not attempt to sign into the account from other devices during the waiting period.

## What Affects How Long Recovery Takes

Apple's recovery waiting period varies based on:

- How long since the account was last successfully accessed
- Whether two-factor authentication is enabled
- The security level of the account
- Whether any suspicious activity has been detected

Accounts with high-security settings and no recent trusted device activity can have waiting periods of 2–4 weeks. This is intentional — it is designed to prevent account hijacking by giving the legitimate owner time to cancel a fraudulent recovery attempt.

## Method 5: Contact Apple Support Directly

For complex situations — particularly where:
- The account was set up with a phone number or email you no longer have access to
- The account shows activity you do not recognise
- You have already gone through the standard recovery and it failed

Apple Support can investigate account issues that the automated recovery process cannot handle.

**How to contact Apple Support in South Africa:**
- Phone: 0800 020 009 (free from landlines, available Monday–Friday)
- Chat: [getsupport.apple.com](https://getsupport.apple.com) — available 24/7 for Apple ID issues
- In-person: Visit an Apple Authorised Service Provider in South Africa

When contacting Apple Support for account recovery, have ready:
- The Apple ID email address
- The credit or debit card associated with the account (last 4 digits and billing address)
- Serial numbers of Apple devices previously associated with the account
- Purchase receipts from the App Store or Apple (if available)

## Protecting Your Account After Recovery

Once you have regained access, take these steps immediately to prevent a repeat lockout:

**1. Add a current, accessible trusted phone number.**
Settings (on iPhone) or System Settings → Apple ID → Password & Security → Trusted Phone Numbers. Add a number you definitely have long-term access to.

**2. Set up a Recovery Key.**
System Settings → Apple ID → Password & Security → Recovery Key → Set Up Recovery Key. Store the 28-character key in two physical locations (not only digitally). This eliminates the waiting period in future recovery scenarios.

**3. Add a Recovery Contact.**
A Recovery Contact is a trusted person (family member, close colleague) who can help you access your account if you are locked out. They do not see your account — they simply receive a recovery code if you request one.
Settings → Apple ID → Password & Security → Account Recovery → Add Recovery Contact.

**4. Use a strong, unique password.**
Apple ID passwords should be unique — not used on any other service. Use a password manager (Keychain works, 1Password is excellent) to generate and store a strong password.

## What Happens to Your Mac When Your Apple ID Is Locked

If your Apple ID is locked or disabled:

**On your Mac:** You will see repeated prompts to sign in. iCloud services (Mail, Calendar, Contacts, iCloud Drive, iMessage, FaceTime) stop syncing. If FileVault is linked to your Apple ID, you may be locked out of the machine itself.

**FileVault lockout:** If you cannot log into your Mac because FileVault requires your Apple ID and the account is locked, this is a more complex situation. The Mac can be unlocked using the Recovery Key (generated when FileVault was first set up) or by booting into macOS Recovery (Cmd+R on Intel, hold power on Apple Silicon) and following the disk unlock process. If you do not have the Recovery Key, data recovery may be necessary. [Contact us](/contact) if you are facing this situation.

**On your iPhone/iPad:** Messages will not deliver. FaceTime will not connect. App Store will not open. Find My will stop tracking your devices.

## When to Get Professional Help

The following situations genuinely require professional or Apple-direct involvement:

- You cannot access the account and Apple's automated recovery has failed or timed out
- The account shows activity you do not recognise (possible account compromise)
- Your Mac is locked at startup because of a FileVault Apple ID link
- The Apple ID is linked to a deceased family member's device that needs to be reset
- Your Apple ID was created under a business account (Apple Business Manager) managed by a company IT team

ZA Support handles Apple ID-related Mac recovery situations regularly — particularly FileVault-linked lockouts and cases where the machine needs to be re-enrolled or reset. [Contact us via WhatsApp](https://wa.me/27645295863) for a same-day assessment at our Hyde Park workshop, or call 064 529 5863.

We do not charge for initial consultations. If the situation requires Apple-direct involvement, we will tell you clearly and point you to the right contact.
    `.trim(),
  },
  'how-to-speed-up-mac-free': {
    slug: 'how-to-speed-up-mac-free',
    title: 'How to Speed Up Your Mac for Free (2026 Guide)',
    excerpt: 'Ten free steps to make your Mac noticeably faster today — no paid software required. From clearing startup items and resetting the SMC to managing storage pressure and cleaning your Downloads folder.',
    date: '14/03/2026',
    category: 'How-To Guides',
    readTime: '9 min read',
    author: 'ZA Support',
    content: `
## Your Mac Is Probably Faster Than You Think

Before spending anything on a new machine or paid optimisation software, work through these ten free steps. In our experience at ZA Support, after 16 years of Mac repairs and Health Checks in Johannesburg, the majority of slow Macs are suffering from fixable software and configuration issues, not hardware failure.

These steps are in order of impact. Start at Step 1 and stop when your Mac feels fast again.

## Step 1: Check Your Available Storage (Most Common Cause)

macOS uses free disk space as virtual memory. When your drive fills up, the operating system has nowhere to write temporary data and the entire system slows to a crawl.

**How to check:** Apple menu → About This Mac → Storage (or System Settings → General → Storage on Ventura and later).

**What you are looking for:** If you have less than 15–20% of your drive free, storage pressure is almost certainly contributing to your slowness.

**Free fixes:**
- Open Finder → Go → Downloads. Delete anything you no longer need.
- Empty the Trash (Finder → Empty Trash). Files in the Trash still count against your storage.
- On macOS Ventura and later: System Settings → General → Storage → scroll down to see recommendations. "Store in iCloud" and "Optimise Storage" are free and effective if you have an active iCloud plan.
- Move large video files and photo libraries to an external drive.

A Mac with 5 GB free on a 256 GB drive can feel unusable. Freeing up 30–40 GB can transform performance overnight.

## Step 2: Remove Login Items That Start Automatically

Every application that launches at startup competes for CPU and RAM before you have opened anything. Macs accumulate login items silently over years — cloud backup apps, printer utilities, updater daemons — and after a while, a dozen processes are fighting for resources before you have opened Safari.

**macOS Ventura and later:** System Settings → General → Login Items. Review "Open at Login" and "Allow in Background." Remove anything you do not immediately need at startup.

**macOS Monterey and earlier:** System Preferences → Users & Groups → Login Items → select the item → click the minus (–) button.

**Recommended to remove:** Printer utilities, software updaters for apps you rarely use, cloud sync clients for services you do not actively use. Keep: Zoom or Teams if you use them daily, backup software you rely on.

This single step can dramatically reduce startup time and free up several hundred megabytes of RAM.

## Step 3: Reset the SMC (System Management Controller)

The SMC manages power delivery, fans, sleep behaviour, and thermal management on Intel Macs. A corrupted SMC state can cause sluggishness, runaway fan speeds, battery issues, and unresponsiveness.

**Intel Mac (MacBook with removable battery — pre-2017):**
Shut down. Remove the battery. Hold the power button for 5 seconds. Reinstall battery. Start normally.

**Intel Mac (MacBook with non-removable battery — 2017 onwards):**
Shut down. Hold Shift + Control + Option + Power simultaneously for 10 seconds. Release all keys. Press Power to start.

**Apple Silicon Mac (M1–M4):** There is no SMC on Apple Silicon. If you are on an M-series Mac, skip to Step 4.

**When it helps:** Slow response, fans running at full speed constantly, battery not charging correctly, display backlight behaving strangely, Mac not waking from sleep.

## Step 4: Reset NVRAM / PRAM

NVRAM stores small pieces of configuration data: display resolution, startup disk selection, time zone, and speaker volume. Corrupted NVRAM can cause boot slowness and erratic behaviour.

**Intel Mac:** Shut down. Press Power, then immediately hold Option + Command + P + R for about 20 seconds (you will hear the startup chime twice on older models, or see the Apple logo appear and disappear twice on newer ones).

**Apple Silicon Mac:** NVRAM resets automatically on Apple Silicon when needed. No manual step required.

## Step 5: Check Activity Monitor for CPU Hogs

A single misbehaving process can consume an entire CPU core, making everything else feel sluggish.

**Open Activity Monitor:** Applications → Utilities → Activity Monitor → CPU tab. Sort by % CPU descending.

**Normal to see:** kernel_task, windowserver, and your open applications. A brief spike from any app is normal.

**Investigate:** Any unfamiliar process using more than 20–30% CPU continuously when you are not doing anything demanding. Right-click the process → Inspect → Open Files and Ports can help identify what it is.

**Common culprits:**
- mdworker / mds_stores: Spotlight indexing — normal after an update, will finish on its own
- cloudd / bird: iCloud sync — sign out and back into iCloud if this is stuck
- Any process you do not recognise consuming sustained high CPU: search the name online before force-quitting

## Step 6: Clean Out Your Downloads Folder

The Downloads folder is one of the most neglected storage locations on most Macs. Over a few years, it accumulates gigabytes of old installers (.dmg, .pkg), ZIP files, PDF downloads, and attachments. It also often contains hundreds of small files that never get indexed efficiently.

Open Finder → Go → Downloads. Sort by Size (click the Size column header in List view). Delete installer files (.dmg, .pkg) for software you have already installed. They cannot be used again without downloading fresh copies anyway.

Sort by Date Added and delete anything older than six months that you have not opened.

This is free, takes five minutes, and often recovers 10–20 GB on machines that have been in use for a few years.

## Step 7: Reduce Visual Effects (Older Macs)

On Macs from 2015–2019 with integrated graphics, the transparency, animation, and blur effects in macOS can consume meaningful GPU resources.

**macOS Ventura and later:** System Settings → Accessibility → Display → enable "Reduce Motion" and "Reduce Transparency."

**macOS Monterey and earlier:** System Preferences → Accessibility → Display → tick "Reduce Motion" and "Reduce Transparency."

On modern Macs (2020 and later, including all Apple Silicon models), this makes little practical difference. On older Intel machines with 4 GB or 8 GB of RAM, reducing visual effects can noticeably improve responsiveness.

## Step 8: Update macOS

Apple ships performance fixes and under-the-hood improvements in every macOS update. Running a version that is one or two major releases behind can mean missing substantial optimisations — particularly on Apple Silicon where energy efficiency and performance improvements arrive frequently.

**Apple menu → System Settings → General → Software Update.**

Install any available updates. For a major macOS version upgrade, check your critical applications for compatibility first — particularly if you use specialist software like medical, legal, or creative tools.

## Step 9: Reindex Spotlight

If Spotlight suggestions are slow, searches take a long time, or the mdworker process is consistently consuming CPU even weeks after an OS update, Spotlight&apos;s index may be corrupted. Reindexing forces a fresh rebuild.

**To reindex Spotlight on macOS Ventura and later:**
1. System Settings → Siri & Spotlight → Spotlight Privacy
2. Click the + button and add your Macintosh HD (main drive)
3. Wait 10 seconds
4. Select Macintosh HD and click the – button to remove it
5. Spotlight will begin reindexing — this takes 30 minutes to several hours depending on drive size

While reindexing, the Mac may run warm and the fan may spin up. This is normal. Performance will improve once indexing completes.

## Step 10: Check Browser Extensions and Tabs

This step is specific to Mac users who spend most of their time in a web browser. Chrome and Safari with many tabs and extensions open are among the heaviest consumers of RAM and CPU on modern Macs.

**Check your tab count:** More than 15–20 tabs open in a browser on an 8 GB Mac will cause memory pressure. Use bookmarks or a tab manager extension to reduce open tabs.

**Audit browser extensions:** In Chrome: chrome://extensions — disable or remove extensions you do not actively use. In Safari: Settings → Extensions. Each extension runs in the background and consumes resources.

**For Chrome users specifically:** Chrome has its own Task Manager. Menu → More Tools → Task Manager. This shows which tabs and extensions are consuming the most CPU and memory, and you can close individual tabs directly from this list.

## When Free Steps Are Not Enough

If you have worked through all ten steps and your Mac is still performing below expectations, the cause is likely hardware:

- **Thermal throttling:** Dried-out thermal paste causes the CPU to overheat and reduce its clock speed. Thermal paste replacement at ZA Support can reduce temperatures by 20–30°C on machines 4+ years old.
- **Insufficient RAM:** Intel Macs with 8 GB running macOS Sonoma or later under a typical workload (browser, Zoom, Office) are frequently memory-constrained. A RAM upgrade from 8 GB to 16 GB is available fitted at our Hyde Park workshop.
- **Failing SSD:** Early-stage SSD failure causes dramatically increased read/write latency. Download DriveDx and check S.M.A.R.T. status.

For issues beyond DIY, [ZA Support offers assessment](/macbook-repair). We run a full 28-phase Health Check, give you a plain-English report of exactly what we found, and quote any recommended repairs before touching anything. Assessment: R899 ex VAT. Hyde Park, Johannesburg.

WhatsApp us on [064 529 5863](https://wa.me/27645295863) to book a same-day assessment.
    `.trim(),
  },
  'mac-not-turning-on-checklist': {
    slug: 'mac-not-turning-on-checklist',
    title: 'Mac Won\'t Turn On? Work Through This Checklist First',
    excerpt: 'Before assuming the worst, work through this 8-step self-service checklist. Most Mac startup failures have a straightforward cause — a flat battery, a stuck power button, or a corrupted boot volume — and can be resolved without a repair.',
    date: '14/03/2026',
    category: 'How-To Guides',
    readTime: '8 min read',
    author: 'ZA Support',
    content: `
## Before You Panic: Most Mac Startup Failures Are Fixable

A Mac that will not turn on is alarming, but in the majority of cases it is not a hardware failure. After 16 years of Mac repairs in Johannesburg, the most common causes we see are: a completely flat battery, a corrupted startup volume, a hung sleep state, or a failed macOS update that left the machine mid-boot.

This is a self-service checklist. Work through each step in order and stop when your Mac starts. If you reach the end without success, the problem is hardware — and that is what we are here for.

**Note:** This guide is about diagnosing and resolving startup issues yourself. If you need a repair service, see our [MacBook not turning on repair page](/macbook-not-turning-on).

## Step 1: Check the Power Source

This sounds obvious, but it is the most frequently skipped step.

**What to check:**

If you are on a MacBook:
- Is the charger cable securely connected at both ends — at the wall socket and at the MacBook?
- Is the wall socket working? Plug a phone charger into the same socket to confirm.
- Is the power adapter LED lit? On MagSafe chargers (older MacBooks), a green or amber LED confirms the adapter is working. On USB-C chargers, there is no visible indicator — try a different USB-C cable or adapter if you have one.
- If the battery was completely drained, leave it charging for at least 15 minutes before pressing the power button. A fully discharged battery may not respond immediately.

**Power LED indicator (older MacBooks with MagSafe):**
- Amber / orange = charging
- Green = fully charged
- No light = adapter not connected, faulty cable, or faulty power board on the Mac

If the charger shows no light at all and you have confirmed the socket is working, the issue may be with the MacBook&apos;s charging circuit rather than the battery. Note this and continue through the checklist.

## Step 2: Perform a Hard Reset

A hung or frozen power state can prevent the Mac from starting normally. A hard reset forces all power to cycle.

**Intel Mac (MacBook):**
Hold the power button continuously for 10 full seconds until the Mac completely powers off (you may feel or hear a click). Release. Wait 5 seconds. Press the power button once normally.

**Apple Silicon Mac (M1, M2, M3, M4):**
Hold the power button for 10 seconds. The Mac will power off. Release. Wait 5 seconds. Press the power button once normally.

**Mac desktop (iMac, Mac mini, Mac Pro):**
Disconnect the power cable from the wall. Wait 15 seconds. Reconnect. Press the power button.

If you hear startup sounds (fan spin, hard drive activity, or startup chime on older models) but nothing appears on screen, proceed to Step 6.

## Step 3: Reset the SMC (Intel Macs Only)

The SMC (System Management Controller) on Intel Macs manages power delivery, startup behaviour, and thermal management. A corrupted SMC state can prevent the Mac from powering on correctly even when all hardware is functioning.

**Intel MacBook (non-removable battery, 2017 and later):**
Shut down the Mac. Hold Shift + Control + Option (left side) + Power button simultaneously for 10 seconds. Release all keys simultaneously. Press the Power button to start.

**Intel MacBook (removable battery, pre-2017):**
Shut down. Remove the battery. Hold the Power button for 5 seconds. Reinstall the battery. Press the Power button.

**Apple Silicon Macs (M1 and later):** No SMC exists. Skip this step.

After the SMC reset, attempt to start the Mac normally. If you see charging behaviour change (MagSafe LED changes colour, or the Mac begins drawing charge), the SMC reset has taken effect.

## Step 4: Try a Different Power Outlet and Cable

Faulty power cables are more common than people expect, and a partially failed cable can prevent charging without showing any obvious signs of damage. Fraying near the connectors is the most common failure point on both MagSafe and USB-C cables.

If you have access to a friend&apos;s compatible MacBook charger, test with that. For USB-C MacBooks, any USB-C cable rated for power delivery (not a data-only cable) should work for testing purposes.

If the Mac starts successfully with a different cable, the problem was the original charger.

## Step 5: Check for External Display or Peripheral Conflicts

Some Mac startup failures are display-related rather than power-related — the Mac is actually starting, but nothing is appearing on screen.

Try this:
- Disconnect all external monitors, USB hubs, dongles, and peripherals
- Disconnect any external hard drives or USB drives
- Attempt to start the Mac with only the power cable connected

On MacBooks, after disconnecting everything, press the power button and listen carefully. If you hear fan activity, keyboard backlight activation, or any startup sounds, the Mac is starting but the display may be the issue.

**Brightness check:** On MacBooks, try pressing the brightness increase key (F2 or the dedicated brightness key) several times after pressing Power. If you see any change in screen brightness, the Mac is on and the backlight level was simply at zero.

## Step 6: Boot into Safe Mode

Safe Mode loads a minimal version of macOS, bypassing third-party extensions and running a basic file system check. If the Mac starts in Safe Mode but not normally, the problem is a software conflict or a corrupt system file.

**Intel Mac:**
Shut down. Press and hold the Shift key. Press the Power button. Keep holding Shift until you see the login screen (it will say "Safe Boot" in the top-right corner).

**Apple Silicon Mac:**
Shut down. Press and hold the Power button. Keep holding it until you see "Loading startup options." Select your startup disk. Hold the Shift key. Click "Continue in Safe Mode."

If Safe Mode works: your normal startup is being blocked by a third-party kernel extension, a startup item, or a corrupted login item. Common causes: a recently installed application or macOS update that did not complete cleanly.

If Safe Mode also fails: the issue is hardware or a more serious system software fault. Continue to Step 7.

## Step 7: Enter macOS Recovery Mode

Recovery Mode allows you to repair the startup volume, reinstall macOS, or restore from a Time Machine backup — without the Mac needing to boot normally.

**Intel Mac:**
Restart (or press Power if the Mac is off). Immediately hold Command + R. Hold until you see the Apple logo or spinning globe. Release.

**Apple Silicon Mac:**
Press and hold the Power button until "Loading startup options" appears. Select "Options" then click Continue.

**In Recovery Mode, try these in order:**

1. **Disk Utility → First Aid on your startup volume.** This checks and repairs the file system. Many startup failures are caused by a corrupted journal that First Aid can fix in 2–5 minutes.

2. **If First Aid finds errors it cannot repair:** Use Disk Utility → Erase (this erases all data — only do this if you have a backup) and then reinstall macOS from the Recovery menu.

3. **Reinstall macOS:** In the Recovery main menu, select "Reinstall macOS." This reinstalls the operating system over the existing installation without erasing your data. It requires an internet connection. This resolves startup failures caused by a corrupted system installation.

## Step 8: Check for Display vs Power Failure

If the Mac appears to be powering on (fan spins, keyboard lights activate) but the screen shows nothing, the problem may be the display rather than the Mac itself.

**Test with an external monitor:**
Connect the MacBook to an external monitor via HDMI or USB-C to DisplayPort. If the external monitor shows your desktop, the MacBook&apos;s internal display or its cable connection has failed. This is a hardware repair — not a data loss situation.

**Flashlight test for backlight failure:**
In a dark room, hold a torch directly against the MacBook screen and look closely. If you can faintly see the desktop or a login prompt through the screen when lit this way, the display backlight has failed. The Mac is working; only the backlight is not.

## If None of These Steps Work

If you have reached the end of this checklist and the Mac still will not start, the fault is hardware. The most common hardware causes of a Mac that will not turn on are:

- **Failed logic board** (power delivery circuit, often from a surge event or liquid exposure)
- **Dead battery** that will not hold enough charge to initiate startup
- **Failed SSD** (the Mac starts but cannot load an OS)
- **Display cable failure** (Mac starts but shows nothing)

We diagnose each of these at ZA Support using a DC bench power supply (we bypass the battery entirely to test the logic board), a thermal camera, and direct schematic tracing. Most cases are diagnosed within an hour.

Assessment: R899 ex VAT assessment. Assessment: R899 ex VAT. [Read about our MacBook not turning on repair service](/macbook-not-turning-on) or contact us directly.

WhatsApp us on [064 529 5863](https://wa.me/27645295863) — we are based at Hyde Park, Johannesburg, 7 days a week.
    `.trim(),
  },
  'jamf-mdm-guide-south-africa': {
    slug: 'jamf-mdm-guide-south-africa',
    title: 'JAMF MDM for South African Businesses: A Complete Guide',
    excerpt: 'Everything you need to know about managing Apple devices with JAMF in a South African business context — POPIA compliance, costs, and implementation.',
    date: '20/02/2026',
    category: 'Enterprise',
    readTime: '8 min read',
    author: 'ZA Support',
    content: `
## What Is JAMF and Why Does It Matter for South African Businesses?

JAMF is the industry-leading Mobile Device Management (MDM) platform for Apple devices. If your business runs Macs, iPhones, or iPads — whether you have 5 devices or 500 — JAMF gives you centralised visibility, security, and control over every device in your fleet.

For South African businesses, JAMF has become increasingly important for two reasons: the proliferation of Apple devices in corporate environments, and the requirements of the Protection of Personal Information Act (POPIA).

## POPIA Compliance and Apple MDM

POPIA requires organisations to implement reasonable security measures to protect personal information. For businesses running Apple devices, this means:

**Encryption at rest:** Every managed device must have FileVault (Mac) or device encryption (iPhone/iPad) enabled and verified. JAMF can enforce this automatically and report on compliance status.

**Remote wipe capability:** If a device is lost or stolen, POPIA's breach notification requirements become significantly more complex if you cannot confirm whether personal data was accessed. Remote wipe via JAMF eliminates this uncertainty.

**Access control:** JAMF enforces screen lock policies, complex password requirements, and maximum failed-attempt lockouts across your entire fleet.

**Software compliance:** Outdated operating systems and applications are a primary vector for data breaches. JAMF can enforce minimum OS versions and flag non-compliant devices automatically.

**Audit trail:** JAMF's reporting tools provide a documented record of device compliance status — essential if you need to demonstrate due diligence under POPIA's accountability principle.

## What JAMF Actually Does: Core Features

### Zero-Touch Deployment

New Macs arrive from Apple and configure themselves automatically when powered on. Employees receive a fully configured, enterprise-ready machine without IT intervention. Applications install silently in the background. Settings, profiles, and restrictions apply automatically.

For a business adding 10 new employees, this means 10 machines go from box to productive in under an hour, with zero manual setup.

### Software Distribution

Push applications to any device or group of devices silently. Adobe Creative Cloud, Microsoft Office, Zoom, Slack, custom line-of-business applications — all deployed without user action.

Self-service portal: employees can install approved applications on-demand without contacting IT.

### Security and Compliance

- FileVault encryption enforcement and key escrow
- Gatekeeper policy management
- Extension attribute collection (custom data points)
- Configuration profiles: WiFi, VPN, email, certificates — all automated
- Restricted software: block unwanted applications by name or hash
- OS update enforcement with grace periods

### Inventory and Reporting

Complete hardware inventory: every Mac's processor, RAM, storage, and serial number. Software inventory: every installed application, version, and last-used date. Hardware purchase date, warranty status, and age tracking.

Custom reports for compliance, procurement planning, and executive summaries.

### Remote Management

Remote lock, passcode reset, and wipe for lost or stolen devices. Remote commands for cache flush, log collection, and policy execution. Screen sharing for remote support (with user consent).

## JAMF in a South African Context

### Network Considerations

South African internet infrastructure presents specific challenges for JAMF deployment:

**Load-shedding:** During power outages, JAMF check-ins queue and resume automatically. No manual intervention needed.

**Bandwidth:** JAMF uses delta updates for software distribution, minimising bandwidth consumption. For branches with limited connectivity, content caching on a local Mac server reduces external bandwidth requirements significantly.

**Latency:** JAMF's cloud infrastructure includes regional nodes. South African clients route to the nearest available region, typically Europe (Frankfurt or London), with acceptable latency for policy application and reporting.

### Licensing Costs in Rand

JAMF licensing is USD-denominated at source, which creates currency exposure for South African businesses. ZA Support's JAMF packages include:

- **Starter (up to 25 devices):** includes licensing, implementation, and support
- **Business (25–100 devices):** includes licensing, implementation, and dedicated support
- **Enterprise (100+ devices):** custom pricing on request

These packages include full JAMF Pro licensing, initial implementation and configuration, onboarding training for your team, and ongoing ZA Support management of your instance.

### Implementation Timeline

A standard JAMF implementation for a South African business of 20–50 devices typically runs:

**Week 1:** Instance provisioning, initial configuration, Apple Business Manager integration
**Week 2:** Policy and profile design, software package preparation, test device enrollment
**Week 3:** Pilot rollout (5–10 devices), testing and refinement
**Week 4:** Full fleet rollout, user training, documentation

## Apple Business Manager Integration

JAMF works in conjunction with Apple Business Manager (ABM) — Apple's free programme for business device and content management. ABM enables:

**Automated Device Enrollment (ADE):** Devices purchased from Apple or an authorised reseller are automatically associated with your JAMF instance. They cannot be unenrolled without your authorisation — even if wiped.

**Volume Purchase Program (VPP):** Purchase app licences in bulk and distribute them through JAMF without individual Apple ID requirements.

**Managed Apple IDs:** Separate organisational Apple IDs for corporate resources, keeping personal and business data isolated.

Setting up Apple Business Manager for a South African company requires a DUNS number or company registration documentation. ZA Support handles this process as part of our JAMF implementation service.

## Common Questions

**Do employees need to do anything to enroll?**
For new devices purchased through Apple or an authorised reseller, enrollment happens automatically when the device is first powered on. For existing devices already in use, a simple enrollment process (typically under 10 minutes) is completed once by each user.

**What can the company see on personal devices?**
JAMF distinguishes between corporate-owned and BYOD (bring your own device) scenarios. For BYOD, a managed container approach is used — corporate apps and data are managed separately from personal content. The company never has visibility into personal photos, messages, or application data.

**What happens when an employee leaves?**
Remote wipe of the corporate device, or selective wipe of the managed container on a personal device. Corporate data and applications are removed; personal content is untouched.

**Is JAMF overkill for a small business?**
If you have 10 or more Apple devices and they are used for any business-critical function — including storing client data — JAMF is not overkill. The cost of a single data breach, reputational damage, or POPIA investigation exceeds years of JAMF licensing.

## Getting Started

ZA Support is one of Johannesburg's few JAMF-certified implementation teams. We have deployed JAMF for medical practices, law firms, financial services companies, and SMEs across Gauteng.

Our process starts with a assessment fee (R899 ex VAT): we review your current device estate, understand your compliance requirements, and design a JAMF configuration that fits your business.

Contact us on 064 529 5863 or via our contact form to book your assessment fee (R899 ex VAT).
    `.trim(),
  },
  'macbook-battery-replacement-johannesburg': {
    slug: 'macbook-battery-replacement-johannesburg',
    title: 'MacBook Battery Replacement in Johannesburg: Everything You Need to Know',
    excerpt: 'A swollen, draining, or dead MacBook battery does not mean the end of your machine. This guide covers how to tell when your battery needs replacing, what the process involves, and what to expect from a professional replacement in Johannesburg.',
    date: '16/03/2026',
    category: 'Repair Guides',
    readTime: '6 min read',
    author: 'Mary',
    content: `
## When Does a MacBook Battery Actually Need Replacing?

Your MacBook battery is designed to hold around 80% of its original charge capacity after 1,000 full charge cycles. Once it degrades below that threshold, you will start to notice real-world impacts: shorter runtimes, unexpected shutdowns, and in some cases, a swelling battery that physically distorts your MacBook trackpad or base.

Here is how to check your battery health right now. Hold the Option key and click the battery icon in the menu bar. If it says "Service Recommended" or "Replace Now", your battery has passed the replacement threshold. For a more detailed reading: Apple menu then About This Mac then System Report then Power.

You will see Cycle Count (the number of full charges used) and Condition (Normal, Service Recommended, or Replace Now).

## Warning Signs That Need Immediate Attention

A degraded battery is an inconvenience. A swollen battery is an emergency.

Swelling occurs when cells inside the battery expand due to gas buildup -- usually caused by age, deep discharge, or heat exposure. Signs of a swelling battery include:
- The trackpad feels raised or stiff and is harder to click
- The base of the MacBook is no longer flat -- it rocks on a hard surface
- The top case appears to be lifting slightly from the bottom chassis

If you notice any of these symptoms, stop using the MacBook immediately and bring it in for assessment. A swollen lithium battery is a fire risk. Do not attempt to remove it yourself -- the cells are glued and require specialist tools.

## The MacBook Battery Replacement Process

At ZA Support, battery replacement is a same-day service for most models. Here is what happens from the moment you drop off your Mac.

**1. Assessment: R899 ex VAT.** We confirm which model you have, run a battery diagnostic report showing current capacity, cycle count, and condition, and confirm that no other components have been affected (swollen batteries sometimes damage the trackpad cable or flex connectors in the lower case).

**2. Original-specification replacement battery.** We use replacement batteries that match or exceed the original Apple specification for your model year. MacBook Air and MacBook Pro batteries are model-specific -- a 2020 M1 MacBook Air uses a different battery to a 2019 Intel 13-inch. The specification matters: voltage, capacity in mAh, and physical dimensions all need to match.

**3. Calibrated installation.** After installation, the battery management system is reset and the battery is cycled to calibrate the charge readings. This ensures your battery percentage indicator is accurate from day one.

**4. Post-installation test.** We verify that the MacBook charges correctly, that the charge indicator functions normally, and that the system recognises the new battery.

## How to Make Your New Battery Last

**Avoid constant 100% charging.** MacBooks with Apple Silicon have built-in Optimised Battery Charging, which learns your routine and pauses charging at 80% until just before you typically unplug. Leave this on.

**Avoid deep discharge.** Repeatedly letting your battery drain to 0% before charging accelerates cycle consumption. Keep it above 20% where possible.

**Manage heat.** MacBook batteries degrade faster when consistently operated at high temperatures. If you use your MacBook on a surface that blocks airflow, use a stand that elevates the machine.

**Check your cycle count annually.** Knowing where you are in your battery lifecycle lets you plan a replacement before it becomes urgent.

## MacBook Battery Replacement in Johannesburg

ZA Support is based at 1 Hyde Park Lane, Second Floor, Johannesburg. We service all MacBook models.

Bring your MacBook in for a assessment fee (R899 ex VAT). We will confirm the battery condition, give you a quote, and in most cases complete the replacement the same day. Assessment: R899 ex VAT. warranty on all battery replacements.

Call **064 529 5863** or message us on WhatsApp to book.

## Frequently Asked Questions

**Q: My MacBook shuts down at 30% -- is that a battery problem?**

Yes. Unexpected shutdowns at a non-zero battery percentage are a classic sign of battery degradation. When battery cells lose capacity unevenly, the charge management system can no longer accurately predict when charge will run out -- the machine shuts down to protect itself. This happens most often in cold conditions or under high CPU load. Battery replacement resolves this.

**Q: Is a third-party MacBook battery as good as an Apple battery?**

Quality varies significantly. Low-cost batteries from online marketplaces often have lower actual capacity than advertised and may not properly communicate with macOS, leading to inaccurate charge readings. ZA Support uses replacement batteries from verified suppliers that match the original specification. We do not use the cheapest available option.

**Q: Can I replace my MacBook battery myself?**

Technically yes for some models, but we do not recommend it. MacBook batteries are glued to the chassis using adhesive strips. Removal requires specific tools, heat, and patience. Done incorrectly, you can tear the battery (a fire risk), damage the trackpad cable, or scratch the bottom case. Professional replacement is the safer choice.

**Q: How long does MacBook battery replacement take?**

Most repairs completed within 1-3 business days. We will confirm the timeline at assessment.

**Q: Does a new battery reset the cycle count in macOS?**

Yes. A new battery resets the cycle count to zero. The Condition indicator will show Normal and coconutBattery will show 100% health after replacement and calibration.

**Q: My MacBook is a 2015 Intel model -- is it worth replacing the battery?**

For a 2015 MacBook Pro or MacBook Air in good condition, a battery replacement is almost always worth doing. These machines run macOS Sequoia via OCLP and have no other planned hardware failures. A new battery effectively gives the machine another 3-5 years of daily use.

**Q: Will my MacBook warranty be affected by a ZA Support battery replacement?**

If your MacBook is still covered by AppleCare+, a third-party battery replacement may affect that coverage. We recommend checking your AppleCare+ status before proceeding. If you are out of 3-month warranty, which is the case for the majority of battery replacements we perform, this does not apply.
    `.trim(),
  },
  'macbook-screen-repair-johannesburg': {
    slug: 'macbook-screen-repair-johannesburg',
    title: 'MacBook Screen Repair in Johannesburg: Cracked, Black, or Flickering',
    excerpt: 'Whether your MacBook screen is cracked, completely black, flickering, or showing lines -- this guide covers every display fault, what causes it, and what your repair options are in Johannesburg.',
    date: '16/03/2026',
    category: 'Repair Guides',
    readTime: '7 min read',
    author: 'Mary',
    content: `
## MacBook Display Problems: What Is Actually Wrong?

A MacBook display fault is one of the most alarming things that can happen to your machine -- especially when it happens mid-work with no warning. But not every black screen means a dead Mac, and not every cracked display requires a full screen assembly replacement.

Understanding what kind of fault you have is the first step to knowing what your repair will involve.

## The Most Common MacBook Screen Faults

**Cracked or shattered display glass** -- Physical impact to the screen. The LCD panel beneath may or may not be damaged depending on the severity. On Retina models, the glass and LCD are fused -- damage to one typically means replacing the full assembly.

**Completely black screen** -- The Mac appears to be on (keyboard backlight, startup sound, fan spin) but the display shows nothing. This can be a failed display cable, a backlight fault, a GPU issue on the logic board, or a failed display panel. Diagnosis determines whether this is a display replacement or a logic board repair.

**Backlight failure (dark but visible)** -- You can faintly see the screen contents when you shine a light at it, but there is no illumination. The backlight LED strip or the backlight driver circuit on the logic board has failed. On many models this is repairable without a full screen replacement.

**Flickering or colour banding** -- The display flickers, shows horizontal or vertical lines, or has sections of colour distortion. This can be a failing display data cable, a failing LCD panel, or in some cases an early-stage logic board fault.

**Stage Light / Flexgate issue** -- Specific to certain 2016-2019 MacBook Pro models: a stage light pattern appears at the bottom of the screen, or the display only works when the lid is fully open. This is a known design flaw caused by the display backlight flex cable failing from repeated bending stress.

## What Happens During a MacBook Screen Repair

**Step 1 -- Assessment: R899 ex VAT.** We test the Mac with an external monitor to determine whether the fault is in the display assembly, the display cable, or the logic board GPU. This distinction is critical -- a logic board GPU fault requires very different work to a display assembly replacement.

**Step 2 -- Component identification.** MacBook display assemblies are model-specific. We identify the exact part required before quoting.

**Step 3 -- Display assembly replacement.** On most Retina MacBook models, the display is replaced as a complete assembly -- glass, LCD panel, backlight, and front camera integrated. The assembly is carefully installed and tested for colour accuracy, brightness uniformity, and proper lid-close sensor function.

**Step 4 -- Cable repair where applicable.** On models affected by the Flexgate issue, the fault is in the display data cable rather than the panel itself. Cable replacement is significantly less expensive than a full assembly replacement.

**Step 5 -- Calibration and verification.** True Tone, Night Shift, and ProMotion display features are verified. We do not return a machine with display features disabled.

## MacBook Models and Display Considerations

**MacBook Pro 2016-2019** -- These models are prone to the Flexgate display cable issue. If you see the stage light effect or lid-angle-dependent display failure, this is the cause. Check whether your serial is covered by Apple extended service programme before booking a repair.

**MacBook Pro M1 / M2 / M3 / M4 (2020 onwards)** -- Apple Silicon MacBooks have Liquid Retina XDR displays on Pro and Max models. These are high-quality but carry a premium replacement cost due to display technology.

**MacBook Air M1 / M2 / M3** -- The MacBook Air uses a thinner, lighter display assembly than the Pro line. Replacement assemblies are available.

**Intel MacBook Pro 13-inch (2012-2015)** -- Parts availability is good and replacement costs are lower than newer models.

## Screen Replacement in Johannesburg -- What to Expect

ZA Support services all MacBook models. Most repairs completed within 1-3 business days.

We offer a assessment fee (R899 ex VAT) before any commitment. Bring your Mac in to 1 Hyde Park Lane, Hyde Park, Johannesburg and we will diagnose the fault, identify the correct part, and provide a written quote with Assessment: R899 ex VAT. All screen replacements carry a 3-month warranty.

Call **064 529 5863** or message us on WhatsApp to book or ask about your specific model.

## Frequently Asked Questions

**Q: My MacBook fell and the screen cracked -- can it be repaired?**

Yes. A cracked Retina display is repaired by replacing the full display assembly. On non-Retina models, it is sometimes possible to replace only the outer glass, but this is uncommon because the adhesion bond makes separation risky. We will assess which approach is appropriate for your model at no charge.

**Q: My MacBook screen is black but I can hear it starting up -- is this a screen fault or something worse?**

It could be either. The key test is to connect an external monitor via USB-C or HDMI. If the external monitor works, the fault is in the display assembly or cable -- typically a display repair. If the external monitor also shows nothing, the fault is on the logic board. We perform this test during the assessment fee (R899 ex VAT).

**Q: Does ZA Support repair the 2016-2019 MacBook Pro Flexgate issue?**

Yes. We replace the display backlight cable on affected models. Before proceeding, check whether your serial number qualifies for Apple extended service programme by entering it at apple.com/support.

**Q: My MacBook display flickers when I move the lid -- is this the cable?**

Almost certainly yes. Intermittent display faults that are position-sensitive are almost always caused by a failing display data cable running through the hinge. Cable replacement resolves this.

**Q: Can I use my MacBook with a cracked screen while I wait for repair?**

Yes, provided the crack has not compromised the LCD panel. If you can see screen contents clearly and the crack is only in the outer glass, it is generally safe to continue using the machine while you arrange a repair. If there are dead pixels, colour bleeding, or dark patches spreading from the crack, the LCD layer is damaged.

**Q: How long does a MacBook screen replacement take?**

Most repairs completed within 1-3 business days. We will confirm the timeline at assessment.

**Q: My MacBook Pro 2019 screen is showing pink lines -- what is causing this?**

On 2019 Intel MacBook Pro models, horizontal or vertical coloured lines are most commonly caused by a failing display data cable rather than a failed panel. This is a more cost-effective repair than a full assembly replacement. We will test with an external monitor during the assessment fee (R899 ex VAT) to confirm.
    `.trim(),
  },
  'macbook-logic-board-repair-cost-johannesburg-2026': {
    slug: 'macbook-logic-board-repair-cost-johannesburg-2026',
    title: 'MacBook Logic Board Repair in Johannesburg: What to Expect in 2026',
    excerpt: 'Everything you need to know about MacBook logic board repair costs in Johannesburg — what a logic board does, signs it has failed, how the repair works, and why component-level repair saves you thousands.',
    date: '16/03/2026',
    category: 'Repair Guides',
    readTime: '7 min read',
    author: 'Mary',
    content: `
## What Is a Logic Board?

The logic board — also called the motherboard or mainboard — is the central circuit board inside every Mac. It is the backbone that connects your processor, RAM, storage, GPU, USB controllers, charging circuits, display controller, and every other component.

When your logic board fails, your Mac fails. There is no workaround, no software fix, no restart sequence that bypasses a dead board. But that does not mean your Mac is beyond repair.

## Signs Your Logic Board Has Failed

Logic board failure presents differently depending on which component or circuit has stopped working. Common symptoms include:

**No power at all** — The MacBook shows no signs of life when you press the power button. No fan spin, no startup chime, no LED. This is the most common presentation of a power management circuit failure.

**Black screen on boot** — The Mac appears to start (you hear the fan, the keyboard lights up) but the display stays black. This points to a GPU failure, backlight circuit fault, or display controller issue on the board.

**No charging** — The MacBook will not charge on either USB-C port, or only charges on one side. A failed BIOS chip or USB-C controller is usually responsible.

**Random shutdowns and kernel panics** — Frequent crashes, especially under load, often indicate a failing voltage regulator or thermal management fault on the board.

**USB-C and Thunderbolt failures** — Ports that do not recognise devices, monitors that do not display, or docks that connect intermittently. The USB-C/Thunderbolt controller chips sit on the logic board.

**Liquid damage aftermath** — If your MacBook stopped working days or weeks after a liquid spill, corrosion has progressed to the point of board failure.

## The Logic Board Repair Process at ZA Support

We follow a structured process for every [logic board repair](/logic-board-repair) we undertake:

**Step 1 — Assessment: R899 ex VAT.** Your Mac is inspected under specialist equipment and tested with professional diagnostic tools. We identify the exact fault — not a generic guess — and provide a written quote. This is completely free with no obligation.

**Step 2 — Board removal.** The logic board is carefully removed from the chassis. Every connector is documented and tested. The board is inspected under high magnification for physical damage, corrosion, or component failure.

**Step 3 — Component-level repair.** Using specialist equipment, our technicians replace or reflow the failed component. This might be a power management IC, a USB-C controller, a BIOS chip, or a failed resistor or capacitor.

**Step 4 — Post-repair testing.** The board is tested in isolation before reassembly to confirm the fault is resolved. We then reassemble the Mac and run a full functional test covering display, keyboard, trackpad, Wi-Fi, Bluetooth, camera, charging, and all ports.

**Step 5 — Return with 3-month warranty.** Your Mac is returned clean and fully functional with a ZA Support warranty on all repaired components.

## Why Component-Level Repair Beats Board Replacement

Authorised service quotes for a new logic board when yours fails. That replacement board costs significantly more than a component-level repair — and on Apple Silicon Macs, board replacement means losing everything on your soldered SSD.

Most repair shops that do not work at component level charge for a "refurbished" board swap — a used board of unknown provenance with no guarantee the same fault will not recur.

Component-level [logic board microsoldering](/logic-board-repair) replaces only what is broken. Your data stays intact. Your SSD stays in place. Your repair costs a fraction of board replacement. And our warranty covers the specific components we worked on — not a refurbished used board we cannot vouch for.

## Assessment: R899 ex VAT — What It Means for Logic Board Repair

Logic board repair is the highest-risk category of Mac repair. Some boards are simply too far gone to recover. We will not charge you for a repair we cannot complete.

Our [Assessment: R899 ex VAT](/no-fix-no-fee) guarantee applies fully to logic board repair: if we assess your board and determine it cannot be economically repaired, or if we attempt the repair and cannot resolve the fault, assessment fee of R899 ex VAT applies. No diagnostic fee. No handling charge.

## How to Book Your Free Logic Board Assessment

The fastest way is to WhatsApp us on 064 529 5863 with your Mac model and the fault description. We will confirm a same-day or next-day appointment.

You can also [book a repair online](/book) — fill in the form and we will respond within 2 hours.

We are based at Hyde Park, Johannesburg. Clients come to us from Sandton, Rosebank, Fourways, Bryanston, Midrand, and across Gauteng.

---

## Frequently Asked Questions

**How much does MacBook logic board repair cost in Johannesburg in 2026?**

Component-level logic board repair at ZA Support is significantly less than a full board swap or replacement. All assessments are free — you receive a fixed quote before any work begins. Contact us for a quote specific to your model and fault.

**Can a MacBook logic board be repaired without losing data?**

In most cases, yes. Component-level repair leaves the SSD untouched. Your files, operating system, and settings remain on the storage device. Board replacement on Apple Silicon Macs, by contrast, requires a new SSD — meaning total data loss. This is one of the strongest reasons to choose microsoldering repair over board swap.

**How long does logic board repair take?**

Most logic board repairs are completed within 1–3 business days. Simple component replacements (a failed fuse, a single blown capacitor) can be done same-day. Complex faults involving advanced chip work or multi-point corrosion damage may take 3–5 days. We give you a realistic turnaround time at the diagnostic stage.

**Is it worth repairing a 2015–2019 Intel MacBook logic board?**

Yes, in most cases. Intel MacBook logic boards from 2015–2019 are well-understood and parts are available. Repair costs are typically lower than newer M-series models. Given the cost of a comparable secondhand replacement, a component-level board repair is almost always the better financial decision. Contact us for a quote.

**Can liquid-damaged logic boards be repaired?**

Yes. Liquid damage is the most common cause of logic board failure we see, and it is very frequently repairable. The outcome depends on how quickly the Mac was powered off after the spill and how long it sat before being brought in. We combine ultrasonic cleaning with component-level repair for liquid-damaged boards. Early intervention dramatically improves success rates.

**Does ZA Support repair Apple Silicon (M1/M2/M3/M4) logic boards?**

Yes. Apple Silicon logic board repair requires specialist tooling and expertise that most repair shops do not have. ZA Support has the specialist equipment required for M-series board repair. Not every fault on an M-series board is repairable, but many are, and the alternative — board replacement meaning data loss and significant cost — makes the attempt worthwhile.

**What is the warranty on logic board repair?**

All logic board repairs at ZA Support carry a warranty on parts and labour. If the same fault recurs within the warranty period of the repair, we fix it at no charge. This applies to the specific components replaced — not unrelated new faults.

**What should I do if my MacBook suddenly stops working?**

Do not attempt to restart it repeatedly — this can cause further damage. If there was any liquid exposure, do not plug in a charger. Bring it to us as soon as possible. We offer same-day assessment in Hyde Park, Johannesburg. The faster we see it, the higher the likelihood of a full, cost-effective repair.
    `.trim(),
  },
};

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return { title: 'Post Not Found' };
  return {
    title: `${post.title} | ZA Support Blog`,
    description: post.excerpt,
    alternates: { canonical: `https://zasupport.com/blog/${slug}` },
  };
}

function renderContent(content: string) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith('## ')) {
      elements.push(<h2 key={i} className="text-2xl font-bold text-[#E8F4F1] mt-10 mb-4">{line.slice(3)}</h2>);
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={i} className="text-xl font-bold text-[#E8F4F1] mt-8 mb-3">{line.slice(4)}</h3>);
    } else if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(<p key={i} className="text-[#E8F4F1] font-semibold mt-4 mb-2">{line.slice(2, -2)}</p>);
    } else if (line.startsWith('- ') || line.startsWith('✓ ') || line.startsWith('✗ ')) {
      elements.push(<li key={i} className="text-[#7A9E98] leading-relaxed">{line.slice(2)}</li>);
    } else if (line.trim() === '') {
      // skip empty lines
    } else {
      elements.push(<p key={i} className="text-[#7A9E98] leading-relaxed mb-4">{line}</p>);
    }
    i++;
  }
  return elements;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'ZA Support' },
    publisher: { '@type': 'Organization', name: 'ZA Support', url: 'https://zasupport.com' },
    url: `https://zasupport.com/blog/${slug}`,
  };

  const aggregateRatingSchema: SchemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'ZA Support',
    image: 'https://zasupport.com/logo.png',
    url: 'https://zasupport.com',
    telephone: '+27645295863',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1 Hyde Park Lane',
      addressLocality: 'Hyde Park',
      addressRegion: 'Gauteng',
      postalCode: '2196',
      addressCountry: 'ZA',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '120',
      bestRating: '5',
      worstRating: '1',
    },
  };

  const faqSchemas: Record<string, SchemaOrg> = {
    'how-to-speed-up-mac-free': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How can I speed up my Mac for free?',
          acceptedAnswer: { '@type': 'Answer', text: 'The ten most effective free steps are: (1) clear storage to at least 20% free, (2) remove login items that start at boot, (3) reset the SMC on Intel Macs, (4) reset NVRAM/PRAM, (5) check Activity Monitor for CPU hogs, (6) clean the Downloads folder, (7) reduce visual effects, (8) update macOS, (9) reindex Spotlight, (10) reduce browser tabs and extensions. Start with storage — it is the most common cause of Mac slowness and the easiest free fix.' },
        },
        {
          '@type': 'Question',
          name: 'What is the SMC reset and does it speed up a Mac?',
          acceptedAnswer: { '@type': 'Answer', text: 'The SMC (System Management Controller) on Intel Macs manages power delivery, fans, sleep, and startup behaviour. A corrupted SMC state can cause sluggishness, runaway fans, and unresponsiveness. To reset on a 2017 or later MacBook: shut down, hold Shift + Control + Option + Power for 10 seconds, release, then start normally. Apple Silicon Macs (M1–M4) do not have an SMC and do not need this step.' },
        },
        {
          '@type': 'Question',
          name: 'How do I remove startup items on a Mac?',
          acceptedAnswer: { '@type': 'Answer', text: 'On macOS Ventura and later: System Settings → General → Login Items. Remove items from the "Open at Login" list and disable "Allow in Background" for apps you do not use daily. On macOS Monterey and earlier: System Preferences → Users & Groups → Login Items → select item → click the minus button. Every removed login item frees RAM and reduces startup time.' },
        },
        {
          '@type': 'Question',
          name: 'Why is my Mac slow even after restarting?',
          acceptedAnswer: { '@type': 'Answer', text: 'If a Mac is slow even after a fresh restart, the cause is likely hardware rather than software: thermal throttling from dried-out thermal paste (common on Macs 4+ years old), insufficient RAM for your workload, or an early-stage SSD failure. Check Activity Monitor immediately after restart — if CPU or memory pressure is already high before you open anything, a background process or hardware limitation is the cause.' },
        },
        {
          '@type': 'Question',
          name: 'Does clearing cache speed up a Mac?',
          acceptedAnswer: { '@type': 'Answer', text: 'Clearing user caches can free up storage, which indirectly improves performance on a nearly-full drive. However, clearing caches does not directly speed up CPU performance and can slow down applications temporarily as they rebuild cached data. Focus on freeing up storage by deleting large files and emptying the Trash rather than clearing caches specifically.' },
        },
        {
          '@type': 'Question',
          name: 'How much storage should I keep free on a Mac?',
          acceptedAnswer: { '@type': 'Answer', text: 'Apple recommends keeping at least 10–15% of your drive free for virtual memory and system operations. On a 256 GB Mac, aim for at least 30 GB free. On a 512 GB Mac, at least 50 GB. If available storage drops below 5 GB, macOS will warn you and performance will be severely impacted as the virtual memory system runs out of space.' },
        },
        {
          '@type': 'Question',
          name: 'How do I reindex Spotlight on a Mac?',
          acceptedAnswer: { '@type': 'Answer', text: 'System Settings → Siri & Spotlight → Spotlight Privacy → click + and add your Macintosh HD → wait 10 seconds → select Macintosh HD and click – to remove it. This triggers a complete Spotlight reindex, which takes 30 minutes to several hours depending on drive size. During reindexing the Mac may run warm — this is normal and performance improves once complete.' },
        },
        {
          '@type': 'Question',
          name: 'When should I take my slow Mac to a repair shop?',
          acceptedAnswer: { '@type': 'Answer', text: 'If you have worked through the free steps — cleared storage, removed login items, reset SMC and NVRAM, checked Activity Monitor — and the Mac is still slow, the cause is likely hardware: thermal paste degradation, insufficient RAM, or a failing SSD. ZA Support offers free Mac diagnosis in Hyde Park, Johannesburg. Assessment: R899 ex VAT on all repairs.' },
        },
      ],
    },
    'mac-not-turning-on-checklist': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What do I do if my Mac won\'t turn on?',
          acceptedAnswer: { '@type': 'Answer', text: 'Work through these steps in order: (1) Check the power source and charger cable, (2) Perform a hard reset by holding the power button for 10 seconds, (3) Reset the SMC on Intel Macs, (4) Try a different power cable or adapter, (5) Disconnect all peripherals and try again, (6) Boot into Safe Mode, (7) Enter macOS Recovery Mode and run First Aid, (8) Test with an external display to rule out a display fault. Most startup failures are resolved by one of these steps.' },
        },
        {
          '@type': 'Question',
          name: 'My Mac makes no sound and screen is black — is it dead?',
          acceptedAnswer: { '@type': 'Answer', text: 'Not necessarily. A completely black screen with no fan activity usually indicates a power delivery issue — the most common causes are a flat battery that needs 15+ minutes of charging before it can start, a faulty charger cable, or a hung power state that a hard reset (hold power for 10 seconds) can clear. Try charging for 20 minutes and performing a hard reset before assuming hardware failure.' },
        },
        {
          '@type': 'Question',
          name: 'What does it mean when a MacBook has a black screen but the fan is running?',
          acceptedAnswer: { '@type': 'Answer', text: 'Fan running with a black screen means the Mac is starting but not displaying anything. Causes include: display backlight failure (test with a torch — look for a faint image), a failed display cable (common on MacBook Pros that hinge between the display and body), or a GPU fault. Connect an external monitor to determine if the Mac is actually starting successfully — if the external monitor shows your desktop, the fault is in the display assembly.' },
        },
        {
          '@type': 'Question',
          name: 'How do I start a Mac in Safe Mode?',
          acceptedAnswer: { '@type': 'Answer', text: 'Intel Mac: Shut down, then hold the Shift key while pressing Power. Keep holding Shift until the login screen shows "Safe Boot" in the top right. Apple Silicon Mac (M1–M4): Shut down, press and hold the Power button until "Loading startup options" appears, select your startup disk, hold Shift, click "Continue in Safe Mode." If the Mac starts in Safe Mode but not normally, a software conflict or corrupted login item is the cause.' },
        },
        {
          '@type': 'Question',
          name: 'How do I access macOS Recovery Mode?',
          acceptedAnswer: { '@type': 'Answer', text: 'Intel Mac: Press and hold Command + R immediately after pressing the power button. Hold until you see the Apple logo or spinning globe. Apple Silicon Mac: Press and hold the Power button until "Loading startup options" appears, then select Options → Continue. In Recovery Mode, use Disk Utility → First Aid to check and repair the startup volume. This resolves many startup failures without erasing data.' },
        },
        {
          '@type': 'Question',
          name: 'Will a Mac that won\'t turn on lose all my data?',
          acceptedAnswer: { '@type': 'Answer', text: 'In most cases, no. The majority of startup failures are software or power-related — the data on the SSD is intact even if the Mac cannot boot. Hardware failures like a dead battery or failed logic board do not directly affect SSD data. Even in logic board failure cases, the SSD can typically be read using specialist equipment. ZA Support retrieves data from non-booting Macs regularly.' },
        },
        {
          '@type': 'Question',
          name: 'How do I reset a Mac that won\'t turn on using SMC?',
          acceptedAnswer: { '@type': 'Answer', text: 'On a 2017 or later Intel MacBook: hold Shift + Control + Option (all on the left side of the keyboard) + the Power button simultaneously for 10 seconds. Release all keys. Press Power to start normally. On a pre-2017 Intel MacBook with removable battery: remove the battery, hold the Power button for 5 seconds, reinstall the battery, press Power. Apple Silicon Macs have no SMC — skip this step.' },
        },
        {
          '@type': 'Question',
          name: 'How much does it cost to fix a Mac that won\'t turn on in Johannesburg?',
          acceptedAnswer: { '@type': 'Answer', text: 'Cost depends on the cause. ZA Support offers a assessment assessment — we identify the exact fault and quote before any work begins. Software fixes, hardware repairs, and logic board repairs are all quoted individually after diagnosis. Assessment: R899 ex VAT. Hyde Park, Johannesburg.' },
        },
      ],
    },
    'macbook-running-slow': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Why is my MacBook running so slow all of a sudden?',
          acceptedAnswer: { '@type': 'Answer', text: 'Sudden MacBook slowness is most often caused by full or nearly-full storage (macOS uses free space as virtual memory), a background process consuming CPU (check Activity Monitor), or a macOS update triggering Spotlight re-indexing. Check your available storage first — if it is under 20 GB on a 256 GB drive, that is likely the cause.' },
        },
        {
          '@type': 'Question',
          name: 'Will a RAM upgrade make my MacBook faster?',
          acceptedAnswer: { '@type': 'Answer', text: 'On Intel MacBooks (up to 2019 MacBook Pro), a RAM upgrade from 8 GB to 16 GB can deliver significant performance improvement if Activity Monitor shows sustained high memory pressure or swap usage above 2–3 GB. On Apple Silicon Macs (M1–M4), RAM is not upgradeable — it is part of the chip. ZA Support fits RAM upgrades on eligible Intel MacBooks — contact us for a quote.' },
        },
        {
          '@type': 'Question',
          name: 'How do I check if my Mac has a failing hard drive?',
          acceptedAnswer: { '@type': 'Answer', text: 'Download DriveDx (paid) or use the built-in Disk Utility (Applications → Utilities → Disk Utility → select your drive → First Aid). Warning signs of a failing SSD include dramatically slow app launches, frequent beach ball spinning, and system freezes that last 10–30 seconds. If S.M.A.R.T. errors are detected, back up immediately and bring the Mac to ZA Support for assessment.' },
        },
        {
          '@type': 'Question',
          name: 'Can a MacBook be too old to fix or upgrade?',
          acceptedAnswer: { '@type': 'Answer', text: 'Most MacBooks from 2015 onwards are viable for repair and upgrade. The key factors are: does it support a current enough macOS for your software, is the hardware in working condition, and does the cost of the upgrade compare favourably to a replacement? ZA Support offers assessment fee (R899 ex VAT)s and provides both repair and replacement options with honest recommendations.' },
        },
        {
          '@type': 'Question',
          name: 'My MacBook fan is running constantly — is that causing the slowness?',
          acceptedAnswer: { '@type': 'Answer', text: 'A fan running at full speed is a symptom, not a cause. It indicates the processor is running hot — either because of a demanding task, dried-out thermal paste (common on MacBooks 4+ years old), or a blocked exhaust. When the Mac runs hot, it thermal-throttles the CPU, which directly causes slowness. Thermal paste replacement at ZA Support can reduce temperatures by 20–30°C.' },
        },
        {
          '@type': 'Question',
          name: 'How do I find out what is slowing down my Mac?',
          acceptedAnswer: { '@type': 'Answer', text: 'Open Activity Monitor (Applications → Utilities → Activity Monitor). The CPU tab shows which processes are consuming processing power. The Memory tab shows memory pressure and swap usage. Sort each by the highest consumer to identify the culprit. For a full diagnosis, ZA Support\'s Health Check service covers 28 diagnostic phases including hardware, storage health, memory, security, and software.' },
        },
        {
          '@type': 'Question',
          name: 'Does reinstalling macOS make a Mac faster?',
          acceptedAnswer: { '@type': 'Answer', text: 'A clean macOS reinstall can help if the slowness is caused by accumulated software faults, corrupted system files, or malware. It will not help if the cause is hardware — insufficient RAM, a failing SSD, or thermal throttling from degraded thermal paste. Before reinstalling, it is worth diagnosing the root cause, as a reinstall is time-consuming and may not solve the problem.' },
        },
        {
          '@type': 'Question',
          name: 'How much does a MacBook speed-up service cost in Johannesburg?',
          acceptedAnswer: { '@type': 'Answer', text: 'ZA Support\'s Health Check service includes a full 28-phase diagnostic with a plain-English report. If hardware upgrades are needed (RAM, SSD, thermal paste), we quote those separately before proceeding. Initial assessment is free. Assessment: R899 ex VAT on all work. Based in Hyde Park, Johannesburg.' },
        },
      ],
    },
    'macbook-wont-connect-wifi': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Why won\'t my MacBook connect to WiFi when other devices can?',
          acceptedAnswer: { '@type': 'Answer', text: 'When other devices connect but your MacBook cannot, the issue is specific to the Mac. The most common causes are corrupted WiFi preference files, a stale network configuration, or a software conflict. Try forgetting the network and reconnecting, then if that fails, delete the WiFi preference files in /Library/Preferences/SystemConfiguration/ and restart.' },
        },
        {
          '@type': 'Question',
          name: 'My MacBook connects to WiFi but has no internet — what does that mean?',
          acceptedAnswer: { '@type': 'Answer', text: 'Connected to WiFi but no internet means your Mac is communicating with the router successfully, but the router cannot reach the internet. This is an ISP or router problem, not a Mac problem. Restart your router and contact your ISP if the problem persists.' },
        },
        {
          '@type': 'Question',
          name: 'How do I reset WiFi settings on a Mac?',
          acceptedAnswer: { '@type': 'Answer', text: 'Open Finder → press Cmd+Shift+G → type /Library/Preferences/SystemConfiguration/ → move these files to the Desktop: com.apple.airport.preferences.plist, NetworkInterfaces.plist, and preferences.plist → restart the Mac. macOS will recreate these files with fresh settings. If WiFi works after the restart, delete the files you moved to the Desktop.' },
        },
        {
          '@type': 'Question',
          name: 'My MacBook keeps dropping WiFi — how do I fix it?',
          acceptedAnswer: { '@type': 'Answer', text: 'Intermittent WiFi drops are usually caused by interference on the 2.4GHz band (switch to 5GHz if available on your router), an overloaded router, or a DHCP lease renewal failure. Try switching bands, reducing the number of connected devices, and updating your router firmware. If drops continue, check Activity Monitor for any VPN or network monitoring software causing conflicts.' },
        },
        {
          '@type': 'Question',
          name: 'Can a MacBook WiFi card be replaced?',
          acceptedAnswer: { '@type': 'Answer', text: 'On Intel MacBooks (up to approximately 2019), the WiFi/Bluetooth card is a replaceable module. On Apple Silicon MacBooks (M1 and later), the WiFi chip is integrated into the logic board and requires board-level repair. ZA Support diagnoses and replaces WiFi cards on Intel MacBooks. Contact us for a assessment fee (R899 ex VAT).' },
        },
        {
          '@type': 'Question',
          name: 'Why does my MacBook say WiFi: No Hardware Installed?',
          acceptedAnswer: { '@type': 'Answer', text: '"No Hardware Installed" means macOS cannot detect the WiFi card. On Intel MacBooks, this is often a loose internal connector (particularly on models that have been dropped or had the screen replaced) or a failed WiFi card. Resetting the SMC can sometimes resolve this: shut down, hold Shift+Control+Option+Power for 10 seconds, then start normally. If the error persists, the Mac needs hardware inspection.' },
        },
        {
          '@type': 'Question',
          name: 'Does macOS update fix WiFi problems?',
          acceptedAnswer: { '@type': 'Answer', text: 'Some macOS point releases specifically address WiFi bugs. If you are running an outdated version of macOS, an update can resolve WiFi issues introduced by a previous update. Check Apple menu → System Settings → General → Software Update and install any available updates.' },
        },
        {
          '@type': 'Question',
          name: 'How much does MacBook WiFi repair cost in Johannesburg?',
          acceptedAnswer: { '@type': 'Answer', text: 'WiFi repair cost depends on the cause. ZA Support offers free initial diagnostics — we identify the exact fault before quoting. Software fixes, WiFi card replacement, and logic board circuit repair are all quoted individually after diagnosis. Assessment: R899 ex VAT. Hyde Park, Johannesburg.' },
        },
      ],
    },
    'apple-id-locked-out': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I recover a locked Apple ID?',
          acceptedAnswer: { '@type': 'Answer', text: 'Go to iforgot.apple.com, enter your Apple ID email address, and choose your verification method: a code sent to your trusted phone number, a trusted device nearby, or your Recovery Key if you set one up. If you have lost access to all trusted methods, use the "Start account recovery" option — Apple will verify your identity and set a waiting period of 72 hours to several weeks before allowing a password reset.' },
        },
        {
          '@type': 'Question',
          name: 'How long does Apple account recovery take?',
          acceptedAnswer: { '@type': 'Answer', text: 'Apple account recovery typically takes 72 hours for accounts with moderate security settings. Accounts with high security settings, no recent trusted device activity, or suspected compromise can have waiting periods of 2–4 weeks. Do not cancel or interrupt the recovery process, and do not attempt to sign in from other devices during the wait — this will cancel the recovery.' },
        },
        {
          '@type': 'Question',
          name: 'I\'m locked out of my Mac because of my Apple ID — what do I do?',
          acceptedAnswer: { '@type': 'Answer', text: 'If your Mac is locked at startup because FileVault is linked to your Apple ID, you can unlock it using the FileVault Recovery Key generated when FileVault was first set up. Boot into macOS Recovery (hold Cmd+R on Intel, hold power on Apple Silicon) and follow the disk unlock process. If you do not have the Recovery Key, data recovery may be required. ZA Support handles FileVault-linked lockouts — contact us on 064 529 5863.' },
        },
        {
          '@type': 'Question',
          name: 'What information does Apple need to verify my identity for account recovery?',
          acceptedAnswer: { '@type': 'Answer', text: 'Apple uses a combination of: the billing address on the account, the credit or debit card associated with the account (last 4 digits), serial numbers of Apple devices previously associated with the account, and purchase history. Having any App Store receipts or original purchase documentation for your Apple devices strengthens your case.' },
        },
        {
          '@type': 'Question',
          name: 'Can Apple Support recover my account faster than the automated process?',
          acceptedAnswer: { '@type': 'Answer', text: 'Apple Support can investigate complex situations but they cannot override the security waiting period for standard lockouts. Where Apple Support is genuinely useful: accounts compromised by a third party, accounts associated with deceased family members, and business Apple ID accounts managed through Apple Business Manager. Call Apple South Africa on 0800 020 009 or use getsupport.apple.com.' },
        },
        {
          '@type': 'Question',
          name: 'What is an Apple ID Recovery Key and should I set one up?',
          acceptedAnswer: { '@type': 'Answer', text: 'A Recovery Key is a 28-character code that lets you bypass the waiting period during account recovery. Setting one up means if you are ever locked out, you can recover instantly using the key — there is no waiting period. The trade-off: if you lose the key and lose access to your trusted devices simultaneously, account recovery becomes significantly harder. Store the key in two physical locations.' },
        },
        {
          '@type': 'Question',
          name: 'My Apple ID shows activity I don\'t recognise — is my account compromised?',
          acceptedAnswer: { '@type': 'Answer', text: 'Unrecognised activity on your Apple ID is a serious concern. Go to appleid.apple.com, sign in, and review the "Devices" section — remove any device you do not recognise. Change your password immediately. Enable two-factor authentication if not already active. If you cannot access the account at all, contact Apple Support immediately and report the suspected compromise — this is treated as a priority case.' },
        },
        {
          '@type': 'Question',
          name: 'What happens to my iCloud data if my Apple ID is permanently locked?',
          acceptedAnswer: { '@type': 'Answer', text: 'In the rare case where an Apple ID cannot be recovered, iCloud data (photos, documents, backups) remains tied to that account. Apple does not provide direct data extraction from iCloud without account access. The most important protection is having regular local backups of your iPhone and Mac — Time Machine for Mac, iTunes/Finder backups for iPhone — so your data is not exclusively in iCloud.' },
        },
      ],
    },
    'macbook-load-shedding-damage': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'My MacBook was not plugged in during load shedding — can it still be damaged?',
          acceptedAnswer: { '@type': 'Answer', text: 'If the MacBook was not connected to a charger or any peripherals during the outage, it is very unlikely to have been affected by the power reinstatement surge. However, if you plugged the charger back in immediately after power returned, that first connection carries the surge.' },
        },
        {
          '@type': 'Question',
          name: 'My MacBook turned on fine after load shedding — am I safe?',
          acceptedAnswer: { '@type': 'Answer', text: 'Not necessarily. Surge damage to certain components — particularly capacitors — can manifest as a gradual failure over days or weeks. Watch for unexpected shutdowns, charging irregularities, or performance changes over the following week.' },
        },
        {
          '@type': 'Question',
          name: 'Can authorised service providers repair surge damage?',
          acceptedAnswer: { '@type': 'Answer', text: 'Apple authorised service does not offer component-level logic board repair. They quote full board replacement at significantly higher cost. ZA Support repairs the specific failed component, not the whole board, at a fraction of that price.' },
        },
        {
          '@type': 'Question',
          name: 'How long does surge damage repair take?',
          acceptedAnswer: { '@type': 'Answer', text: 'Most surge damage repairs are completed within 3–5 working days. Complex cases can extend to 7–10 days. We provide a timeline estimate during the assessment assessment.' },
        },
        {
          '@type': 'Question',
          name: 'Does Apple Care or device insurance cover surge damage?',
          acceptedAnswer: { '@type': 'Answer', text: 'AppleCare does not cover power surge damage. Most South African short-term insurance policies do cover surge damage to electronics as a specified or all-risk item. We can provide a detailed repair quotation for insurance claim purposes.' },
        },
        {
          '@type': 'Question',
          name: 'What is the best UPS for a MacBook in South Africa?',
          acceptedAnswer: { '@type': 'Answer', text: 'For most home offices, we recommend the APC Back-UPS Pro 1500VA or the Mecer 2000VA. Both provide true sine wave output and automatic voltage regulation to handle South African load shedding reinstatement surges.' },
        },
        {
          '@type': 'Question',
          name: 'How much does MacBook surge damage repair cost in Johannesburg?',
          acceptedAnswer: { '@type': 'Answer', text: 'ZA Support repairs MacBook surge damage at component level — significantly less than a full board replacement through authorised service. Assessment: R899 ex VAT.' },
        },
      ],
    },
    'macbook-logic-board-repair-cost-johannesburg-2026': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How much does MacBook logic board repair cost in Johannesburg in 2026?',
          acceptedAnswer: { '@type': 'Answer', text: 'Component-level logic board repair at ZA Support is significantly less than a full board swap or replacement through authorised service. All assessments are free with Assessment: R899 ex VAT. Contact us for a quote specific to your model and fault.' },
        },
        {
          '@type': 'Question',
          name: 'Can a MacBook logic board be repaired without losing data?',
          acceptedAnswer: { '@type': 'Answer', text: 'In most cases, yes. Component-level repair leaves the SSD untouched. Board replacement on Apple Silicon Macs, by contrast, requires a new SSD — meaning total data loss. This is one of the strongest reasons to choose microsoldering repair over board swap.' },
        },
        {
          '@type': 'Question',
          name: 'How long does MacBook logic board repair take?',
          acceptedAnswer: { '@type': 'Answer', text: 'Most logic board repairs are completed within 1–3 business days. Simple component replacements can be done same-day. Complex faults involving advanced chip work or multi-point corrosion damage may take 3–5 days. We provide a realistic turnaround at the diagnostic stage.' },
        },
        {
          '@type': 'Question',
          name: 'Is it worth repairing a 2015–2019 Intel MacBook logic board?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes, in most cases. Intel MacBook logic boards from 2015–2019 are well-understood and parts are available. Given the cost of a comparable secondhand replacement, a component-level board repair is almost always the better financial decision. Contact us for a quote.' },
        },
        {
          '@type': 'Question',
          name: 'Can liquid-damaged MacBook logic boards be repaired?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. Liquid damage is the most common cause of logic board failure. The outcome depends on how quickly the Mac was powered off and how long it sat before being brought in. ZA Support combines ultrasonic cleaning with component-level repair for liquid-damaged boards. Early intervention dramatically improves success rates.' },
        },
        {
          '@type': 'Question',
          name: 'Does ZA Support repair Apple Silicon M1 M2 M3 M4 logic boards?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. ZA Support has the specialist equipment required for M-series board repair in Johannesburg. Not every fault is repairable, but many are — and the alternative (board replacement equals data loss and significant cost) makes the attempt worthwhile.' },
        },
        {
          '@type': 'Question',
          name: 'What warranty does ZA Support provide on logic board repair?',
          acceptedAnswer: { '@type': 'Answer', text: 'All logic board repairs at ZA Support carry a warranty on parts and labour. If the same fault recurs within the warranty period, we fix it at no charge.' },
        },
        {
          '@type': 'Question',
          name: 'What should I do if my MacBook suddenly stops working?',
          acceptedAnswer: { '@type': 'Answer', text: 'Do not attempt to restart it repeatedly. If there was liquid exposure, do not plug in a charger. Bring it to ZA Support in Hyde Park, Johannesburg for a free same-day assessment. The faster we see it, the higher the likelihood of a full, cost-effective repair. Assessment: R899 ex VAT.' },
        },
      ],
    },
    'macbook-battery-replacement-johannesburg': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'My MacBook shuts down at 30% battery -- is that a battery problem?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. Unexpected shutdowns at a non-zero battery percentage are a classic sign of battery degradation. When cells lose capacity unevenly, the charge management system shuts down to protect itself. This happens most often in cold conditions or under high CPU load. Battery replacement resolves this.' },
        },
        {
          '@type': 'Question',
          name: 'How do I check my MacBook battery health?',
          acceptedAnswer: { '@type': 'Answer', text: 'Hold the Option key and click the battery icon in the menu bar. If it says Service Recommended or Replace Now, your battery has passed the replacement threshold. For full details: Apple menu, About This Mac, System Report, Power. You will see Cycle Count and Condition.' },
        },
        {
          '@type': 'Question',
          name: 'How long does MacBook battery replacement take in Johannesburg?',
          acceptedAnswer: { '@type': 'Answer', text: 'Most repairs completed within 1-3 business days at ZA Support in Hyde Park. We service all MacBook models.' },
        },
        {
          '@type': 'Question',
          name: 'Is a swollen MacBook battery dangerous?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. A swollen lithium battery is a fire risk. Signs include a raised trackpad, a rocking base, or lifting top case. Stop using the MacBook immediately and bring it in for professional assessment. Do not attempt to remove a swollen battery yourself -- the cells are glued and require specialist tools.' },
        },
        {
          '@type': 'Question',
          name: 'Does a new MacBook battery reset the cycle count?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. A new battery resets the cycle count to zero. The Condition indicator will show Normal and battery health diagnostic tools will show 100% capacity after replacement and calibration.' },
        },
        {
          '@type': 'Question',
          name: 'Is it worth replacing the battery on a 2015 Intel MacBook?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes, in most cases. A 2015 MacBook Pro or Air in good condition runs macOS Sequoia via OCLP and has no other planned hardware failures. A new battery effectively gives the machine another 3-5 years of daily use at a fraction of replacement cost.' },
        },
        {
          '@type': 'Question',
          name: 'What warranty does ZA Support provide on MacBook battery replacement?',
          acceptedAnswer: { '@type': 'Answer', text: 'warranty on parts and labour. Assessment: R899 ex VAT -- if we find a secondary issue during assessment that means we cannot complete the repair cleanly, we tell you before proceeding.' },
        },
      ],
    },
    'macbook-screen-repair-johannesburg': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'My MacBook fell and the screen cracked -- can it be repaired?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. A cracked Retina display is repaired by replacing the full display assembly. On non-Retina models, replacing only the outer glass is sometimes possible but uncommon. We will assess which approach is appropriate for your model at no charge.' },
        },
        {
          '@type': 'Question',
          name: 'My MacBook screen is black but I can hear it starting up -- is this a screen fault?',
          acceptedAnswer: { '@type': 'Answer', text: 'It could be either. Connect an external monitor via USB-C or HDMI. If the external monitor works, the fault is in the display assembly or cable. If the external monitor also shows nothing, the fault is on the logic board. ZA Support performs this test during the assessment fee (R899 ex VAT).' },
        },
        {
          '@type': 'Question',
          name: 'How much does MacBook screen replacement cost in Johannesburg?',
          acceptedAnswer: { '@type': 'Answer', text: 'Contact ZA Support for a quote on your specific model. Cost depends on the model, model year, and whether the repair requires a full assembly replacement or a cable repair. Assessment: R899 ex VAT with Assessment: R899 ex VAT.' },
        },
        {
          '@type': 'Question',
          name: 'Does ZA Support repair the 2016-2019 MacBook Pro Flexgate issue?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. We replace the display backlight cable on affected models. This produces the stage light effect or lid-angle-dependent display failure. Before proceeding, check whether your serial qualifies for Apple extended service at apple.com/support.' },
        },
        {
          '@type': 'Question',
          name: 'My MacBook display flickers when I move the lid -- is this the cable?',
          acceptedAnswer: { '@type': 'Answer', text: 'Almost certainly yes. Intermittent display faults that are position-sensitive are almost always caused by a failing display data cable running through the hinge. Cable replacement resolves this and is less expensive than a full assembly replacement.' },
        },
        {
          '@type': 'Question',
          name: 'How long does MacBook screen replacement take?',
          acceptedAnswer: { '@type': 'Answer', text: 'Most repairs completed within 1-3 business days at ZA Support in Hyde Park. Timeline confirmed at assessment.' },
        },
        {
          '@type': 'Question',
          name: 'My MacBook Pro 2019 screen is showing pink lines -- what is causing this?',
          acceptedAnswer: { '@type': 'Answer', text: 'On 2019 Intel MacBook Pro models, horizontal or vertical coloured lines are most commonly caused by a failing display data cable rather than a failed panel. This is a more cost-effective repair than a full assembly replacement. We test with an external monitor during the assessment fee (R899 ex VAT) to confirm.' },
        },
      ],
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://zasupport.com/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://zasupport.com/blog/${slug}` },
    ],
  };

  const schemas: SchemaOrg[] = [articleSchema, breadcrumbSchema, aggregateRatingSchema];
  if (faqSchemas[slug]) schemas.push(faqSchemas[slug]);

  return (
    <>
      <SchemaOrgComp schema={schemas} />

      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[#7A9E98] hover:text-[#0FEA7A] text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold text-[#0FEA7A] bg-[rgba(15,234,122,0.1)] px-3 py-1 rounded-full flex items-center gap-1">
              <Tag className="w-3 h-3" /> {post.category}
            </span>
            <span className="flex items-center gap-1 text-[#7A9E98] text-xs">
              <Calendar className="w-3.5 h-3.5" /> {post.date}
            </span>
            <span className="flex items-center gap-1 text-[#7A9E98] text-xs">
              <Clock className="w-3.5 h-3.5" /> {post.readTime}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#E8F4F1] leading-tight">
            {post.title}
          </h1>
          <p className="text-xl text-[#7A9E98] mt-4 max-w-2xl">{post.excerpt}</p>
        </div>
      </section>

      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 lg:p-12">
            <article className="prose-custom">
              {renderContent(post.content)}
            </article>
          </div>

          <div className="mt-12 p-6 bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-2xl text-center">
            <p className="text-[#E8F4F1] font-bold text-lg mb-2">Need a repair? Assessment: R899 ex VAT.</p>
            <p className="text-[#7A9E98] mb-4">Hyde Park, Johannesburg. Assessment: R899 ex VAT on all repairs.</p>
            <a href="tel:0645295863" className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-3 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all">
              Call 064 529 5863
            </a>
          </div>

          <div className="mt-8">
            <Link href="/blog" className="inline-flex items-center gap-2 text-[#7A9E98] hover:text-[#0FEA7A] text-sm transition-colors">
              <ArrowLeft className="w-4 h-4" /> All posts
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
