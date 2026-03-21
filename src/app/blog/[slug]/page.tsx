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

In those cases, we will tell you clearly. Our Assessment: from R599 policy means you never pay for an unsuccessful assessment.

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

We offer same-day liquid damage assessments, 7 days a week. Assessment: from R599 on all repairs. Call 064 529 5863.
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

Apple authorised service in South Africa does not offer component-level logic board repair. They will quote a full board replacement or, in many cases, decline to repair the machine at all if it is out of up-to-3 year warranty. ZA Support is a component-level repair workshop — we fix the specific fault, not the whole board.

**Q: How long does surge damage repair take?**

Most surge damage repairs are completed within 3–5 working days. Complex cases involving multiple failed components or damaged data storage can extend to 7–10 days. We provide a clear timeline estimate during the assessment assessment.

**Q: Does my Apple Care or device insurance cover surge damage?**

AppleCare does not cover accidental damage or power surge damage — it covers manufacturing defects and, with AppleCare+, accidental damage at an excess fee. Most South African short-term insurance policies do cover surge damage to electronics as a specified or all-risk item, but the excess is often close to or exceeds the cost of a ZA Support repair. Check your policy schedule. We can provide a detailed repair quotation for insurance claim purposes.

**Q: What is the best UPS for a home office MacBook setup in South Africa?**

For most home offices running a MacBook Pro or MacBook Air, we recommend the APC Back-UPS Pro 1500VA or the Mecer 2000VA. Both provide true sine wave output, automatic voltage regulation, and adequate runtime. Avoid cheap generic UPS units without AVR — they absorb some surge but do not regulate brownout conditions that are common during load shedding transitions.

## Book a Surge Damage Assessment

If your MacBook is showing any of the symptoms described in this guide — or if it was plugged in during a load shedding reinstatement event and you want peace of mind — bring it in for a assessment fee (from R599).

We are based at 1 Hyde Park Lane, Hyde Park, Johannesburg. We assess surge damage same day, 7 days a week. Assessment: from R599 on all repairs.

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

**Assessment: from R599. Hyde Park, Johannesburg.**

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

[Book a WiFi diagnostic.](https://wa.me/27645295863)

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

For issues beyond DIY, [ZA Support offers assessment](/macbook-repair). We run a full 28-phase Health Check, give you a plain-English report of exactly what we found, and quote any recommended repairs before touching anything. Assessment: from R599. Hyde Park, Johannesburg.

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

Assessment: from R599 assessment. Assessment: from R599. [Read about our MacBook not turning on repair service](/macbook-not-turning-on) or contact us directly.

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

Our process starts with a assessment fee (from R599): we review your current device estate, understand your compliance requirements, and design a JAMF configuration that fits your business.

Contact us on 064 529 5863 or via our contact form to book your assessment fee (from R599).
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

**1. Assessment: from R599.** We confirm which model you have, run a battery diagnostic report showing current capacity, cycle count, and condition, and confirm that no other components have been affected (swollen batteries sometimes damage the trackpad cable or flex connectors in the lower case).

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

Bring your MacBook in for a assessment fee (from R599). We will confirm the battery condition, give you a quote, and in most cases complete the replacement the same day. Assessment: from R599. warranty on all battery replacements.

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

If your MacBook is still covered by AppleCare+, a third-party battery replacement may affect that coverage. We recommend checking your AppleCare+ status before proceeding. If you are out of up-to-3 year warranty, which is the case for the majority of battery replacements we perform, this does not apply.
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

**Step 1 -- Assessment: from R599.** We test the Mac with an external monitor to determine whether the fault is in the display assembly, the display cable, or the logic board GPU. This distinction is critical -- a logic board GPU fault requires very different work to a display assembly replacement.

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

We offer a assessment fee (from R599) before any commitment. Bring your Mac in to 1 Hyde Park Lane, Hyde Park, Johannesburg and we will diagnose the fault, identify the correct part, and provide a written quote with Assessment: from R599. All screen replacements carry a up-to-3 year warranty.

Call **064 529 5863** or message us on WhatsApp to book or ask about your specific model.

## Frequently Asked Questions

**Q: My MacBook fell and the screen cracked -- can it be repaired?**

Yes. A cracked Retina display is repaired by replacing the full display assembly. On non-Retina models, it is sometimes possible to replace only the outer glass, but this is uncommon because the adhesion bond makes separation risky. We will assess which approach is appropriate for your model at no charge.

**Q: My MacBook screen is black but I can hear it starting up -- is this a screen fault or something worse?**

It could be either. The key test is to connect an external monitor via USB-C or HDMI. If the external monitor works, the fault is in the display assembly or cable -- typically a display repair. If the external monitor also shows nothing, the fault is on the logic board. We perform this test during the assessment fee (from R599).

**Q: Does ZA Support repair the 2016-2019 MacBook Pro Flexgate issue?**

Yes. We replace the display backlight cable on affected models. Before proceeding, check whether your serial number qualifies for Apple extended service programme by entering it at apple.com/support.

**Q: My MacBook display flickers when I move the lid -- is this the cable?**

Almost certainly yes. Intermittent display faults that are position-sensitive are almost always caused by a failing display data cable running through the hinge. Cable replacement resolves this.

**Q: Can I use my MacBook with a cracked screen while I wait for repair?**

Yes, provided the crack has not compromised the LCD panel. If you can see screen contents clearly and the crack is only in the outer glass, it is generally safe to continue using the machine while you arrange a repair. If there are dead pixels, colour bleeding, or dark patches spreading from the crack, the LCD layer is damaged.

**Q: How long does a MacBook screen replacement take?**

Most repairs completed within 1-3 business days. We will confirm the timeline at assessment.

**Q: My MacBook Pro 2019 screen is showing pink lines -- what is causing this?**

On 2019 Intel MacBook Pro models, horizontal or vertical coloured lines are most commonly caused by a failing display data cable rather than a failed panel. This is a more cost-effective repair than a full assembly replacement. We will test with an external monitor during the assessment fee (from R599) to confirm.
    `.trim(),
  },
  'apple-background-security-update-safari-mac-2026': {
    slug: 'apple-background-security-update-safari-mac-2026',
    title: 'Apple\'s New Background Security Updates: What Mac Users in South Africa Need to Know',
    excerpt: 'Apple has introduced a new category of silent security patches that update Safari automatically without requiring a full macOS update. Here is what it means, why it matters, and how to confirm your Mac is protected.',
    date: '18/03/2026',
    category: 'Security',
    readTime: '5 min read',
    author: 'Mary',
    content: `
## Apple Has Changed How It Patches Security Vulnerabilities

On 17 March 2026, Apple quietly rolled out something new: the first-ever "background security improvement." Unlike a standard macOS update that requires you to approve and install it, this patch applied itself silently in the background — no restart required, no notification, no action needed from you.

The target was a vulnerability in Safari, Apple's built-in web browser, affecting iPhones, iPads, and Macs running current software versions.

This matters because it represents a fundamental shift in how Apple responds to security threats. Rather than waiting for the next scheduled update cycle, Apple can now push targeted fixes directly to your browser — the application most exposed to the internet — without touching the rest of your operating system.

## What Is a "Background Security Improvement"?

Apple introduced this mechanism specifically for Safari and WebKit — the browser engine that powers Safari and all web content on iOS and macOS. Because WebKit handles everything you view in a browser, vulnerabilities in it are high-value targets for attackers.

Previously, fixing a Safari bug required a full iOS or macOS software update. That process involves:
- Apple publishing a security advisory
- Users receiving an update notification
- Users choosing when (or whether) to install it
- A restart of the device

With background security improvements, Apple bypasses that entire chain. The fix is delivered and applied automatically, in the background, with no user interaction.

**For you as a Mac user in Johannesburg:** your Safari was patched on 17 March 2026 whether you noticed or not — provided you are running a current version of macOS.

## Why This Safari Vulnerability Mattered

Safari vulnerabilities are serious because your browser is the primary point of contact between your Mac and the internet. A flaw in how Safari processes web content — JavaScript, images, fonts, or video — can potentially allow a malicious website to execute code on your machine without your knowledge.

Apple has not published full technical details of this specific vulnerability, which is standard practice until the patch has been widely distributed. What is clear is that the urgency was sufficient for Apple to deploy their new rapid-response mechanism for the first time.

## How to Confirm Your Mac Received the Update

To verify the background security improvement has been applied to your Mac:

1. Open **Safari**
2. Click **Safari** in the menu bar → **About Safari**
3. Your Safari version should reflect the March 2026 update

Alternatively, check your macOS software update history:
1. Open **System Settings** (macOS Ventura and later)
2. Click **General** → **Software Update**
3. Click **Update History** — background security improvements appear here separately from full OS updates

If your Mac is running macOS Monterey or earlier, background security improvements may not apply. This is one of several security reasons to upgrade to Ventura or Sonoma.

## What This Means for Older Macs

Background security improvements only apply to current macOS versions. If your Mac is running:

- **macOS Ventura (13)** — supported
- **macOS Sonoma (14)** — supported
- **macOS Sequoia (15)** — supported
- **macOS Monterey (12) or earlier** — not supported for background updates

Intel Macs from 2015–2019 can run Ventura, which keeps you within Apple's supported security umbrella. If your Intel Mac is stuck on Catalina or Big Sur because of a compatibility issue, that is worth addressing — those machines are no longer receiving full security coverage.

ZA Support can assess your Mac, confirm which macOS version it supports, and handle the upgrade. Intel Mac upgrades to Ventura start from R 1,999 at our Hyde Park workshop.

## The Broader Picture: Mac Security in 2026

This Safari patch is part of a larger pattern. Apple has significantly expanded its security response capabilities over the past two years:

- **Rapid Security Responses (RSRs)** — introduced in 2023 for critical fixes
- **Background security improvements** — the new mechanism, targeting Safari/WebKit specifically
- **Lockdown Mode** — for users under active threat
- **Advanced Data Protection** — end-to-end encryption for iCloud

Taken together, Apple's security posture in 2026 is meaningfully stronger than it was in 2020. But these protections only work if your Mac is running a supported operating system and you have not disabled automatic updates.

## How ZA Support's Health Check Monitors Your Mac's Security Status

Our [Health Check diagnostic](/services) scans 32 categories of your Mac's configuration, including:

- **Current macOS version** — identifies if you are on an unsupported OS
- **Safari and WebKit version** — confirms security patches are applied
- **Software Update settings** — flags if automatic updates are disabled
- **System Integrity Protection (SIP)** — confirms core OS protection is active
- **Firewall status** — identifies if network protection is enabled
- **Gatekeeper** — confirms only signed software can run

After the scan, you receive a written report with a risk rating and specific recommendations. If your Mac has received the March 2026 Safari patch, that will be confirmed. If it has not — because of an outdated OS or a configuration issue — we will identify why and resolve it.

[Book a Health Check assessment](/book) — from R599 at our Hyde Park workshop.

## Keeping Your Mac Protected: The Checklist

While Apple's background updates handle Safari automatically, the rest of your Mac's security posture still requires attention:

- ✓ **Keep macOS updated** — install updates within 7 days of release
- ✓ **Enable automatic updates** — System Settings → General → Software Update → turn on all automatic options
- ✓ **Do not disable SIP** — never follow instructions that require turning off System Integrity Protection
- ✓ **Use a password manager** — Safari's built-in Passwords app works, or use 1Password
- ✓ **Enable FileVault** — full-disk encryption protects your data if your Mac is lost or stolen
- ✓ **Enable the firewall** — System Settings → Network → Firewall

These six settings take under ten minutes to configure and collectively close the most common attack vectors on a Mac.

---

## Frequently Asked Questions

**Do I need to do anything to get Apple's background security update?**

No. If you are running a current version of macOS, the update applied automatically in the background. Check Safari → About Safari to confirm your version is current.

**What if my Mac is too old to run the latest macOS?**

You will not receive background security improvements. Intel Macs from 2015 onwards can typically run macOS Ventura. ZA Support can assess your specific Mac and handle the upgrade. Contact us on WhatsApp: 064 529 5863.

**Can I turn off background security updates?**

You can, but it is strongly advised against. These updates fix active vulnerabilities in Safari — the browser you use every day. Disabling them leaves a known security gap open until the next full OS update.

**How is this different from a normal macOS update?**

A normal macOS update covers the entire operating system and requires approval and usually a restart. Background security improvements target only Safari and WebKit, apply silently, and require no restart. They can be deployed by Apple within hours of a vulnerability being confirmed.

**Does this affect iPhones and iPads too?**

Yes. The same background security mechanism applies to iPhones and iPads running current iOS and iPadOS versions. All three platforms — Mac, iPhone, iPad — received the March 2026 Safari patch simultaneously.
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

**Step 1 — Assessment: from R599.** Your Mac is inspected under specialist equipment and tested with professional diagnostic tools. We identify the exact fault — not a generic guess — and provide a written quote. This is with no obligation.

**Step 2 — Board removal.** The logic board is carefully removed from the chassis. Every connector is documented and tested. The board is inspected under high magnification for physical damage, corrosion, or component failure.

**Step 3 — Component-level repair.** Using specialist equipment, our technicians replace or reflow the failed component. This might be a power management IC, a USB-C controller, a BIOS chip, or a failed resistor or capacitor.

**Step 4 — Post-repair testing.** The board is tested in isolation before reassembly to confirm the fault is resolved. We then reassemble the Mac and run a full functional test covering display, keyboard, trackpad, Wi-Fi, Bluetooth, camera, charging, and all ports.

**Step 5 — Return with up-to-3 year warranty.** Your Mac is returned clean and fully functional with a ZA Support warranty on all repaired components.

## Why Component-Level Repair Beats Board Replacement

Authorised service quotes for a new logic board when yours fails. That replacement board costs significantly more than a component-level repair — and on Apple Silicon Macs, board replacement means losing everything on your soldered SSD.

Most repair shops that do not work at component level charge for a "refurbished" board swap — a used board of unknown provenance with no guarantee the same fault will not recur.

Component-level [logic board component-level repair](/logic-board-repair) replaces only what is broken. Your data stays intact. Your SSD stays in place. Your repair costs a fraction of board replacement. And our warranty covers the specific components we worked on — not a refurbished used board we cannot vouch for.

## Assessment: from R599 — What It Means for Logic Board Repair

Logic board repair is the highest-risk category of Mac repair. Some boards are simply too far gone to recover. We will not charge you for a repair we cannot complete.

Our [Assessment: from R599](/no-fix-no-fee) guarantee applies fully to logic board repair: if we assess your board and determine it cannot be economically repaired, or if we attempt the repair and cannot resolve the fault, assessment fee of from R599 applies. No diagnostic fee. No handling charge.

## How to Book Your Logic Board Assessment

The fastest way is to WhatsApp us on 064 529 5863 with your Mac model and the fault description. We will confirm a same-day or next-day appointment.

You can also [book a repair online](/book) — fill in the form and we will respond within 2 hours.

We are based at Hyde Park, Johannesburg. Clients come to us from Sandton, Rosebank, Fourways, Bryanston, Midrand, and across Gauteng.

---

## Frequently Asked Questions

**How much does MacBook logic board repair cost in Johannesburg in 2026?**

Component-level logic board repair at ZA Support is significantly less than a full board swap or replacement. Assessment: from R599 — you receive a fixed quote before any work begins. Contact us for a quote specific to your model and fault.

**Can a MacBook logic board be repaired without losing data?**

In most cases, yes. Component-level repair leaves the SSD untouched. Your files, operating system, and settings remain on the storage device. Board replacement on Apple Silicon Macs, by contrast, requires a new SSD — meaning total data loss. This is one of the strongest reasons to choose component-level repair over board swap.

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


'macbook-wont-charge-johannesburg': {
    slug: 'macbook-wont-charge-johannesburg',
    title: `MacBook Won't Charge? What To Do in Johannesburg`,
    excerpt: `MacBook plugged in but not charging? Here are the most common causes and what to check before spending money on a repair.`,
    date: '21 March 2026',
    category: 'Troubleshooting',
    readTime: '4 min read',
    author: 'ZA Support',
    content: `# MacBook Won't Charge? What To Do in Johannesburg

There's nothing quite like that moment of panic when you plug in your MacBook and nothing happens. The charging light doesn't appear, the battery percentage doesn't budge, and you're left wondering if you've just lost R15,000 or more to a broken computer. Before you assume the worst, take a breath. Most MacBooks that won't charge have a simple culprit, and many issues can be resolved without professional help.

## Check the basics first

Start with the absolute fundamentals. Plug your charger into a different power outlet in your home. Sometimes the issue isn't your MacBook at all, but a tripped circuit breaker or a faulty wall socket. If you're working from a coffee shop or office, try a different outlet there too.

Next, inspect your charging cable carefully. Look along the entire length of the wire for any visible damage, fraying, or discolouration. The cable near the connector is particularly vulnerable to wear and tear. If you notice any damage, stop using that charger immediately, as a compromised cable can be a fire hazard.

## Restart your Mac with the charger plugged in

Sometimes your MacBook's power management system gets a bit confused. Leave your charger connected and then perform a proper restart. For newer Macs with Apple Silicon, hold the power button for 10 seconds until you see the shutdown screen, then click Restart. For Intel-based MacBooks, use the Apple menu and select Restart.

After your Mac boots up, check whether the battery icon in the menu bar has changed. Even if it still shows 0%, the system may have reset its power detection. Leave the charger connected for at least 30 minutes before drawing any conclusions.

## Reset the SMC (System Management Controller)

The SMC controls power delivery in your MacBook, and resetting it can solve charging issues. The process differs depending on your Mac's age and processor.

If you have a MacBook with Apple Silicon (M1, M2, M3, and newer), simply shut down completely and press the power button. This single action resets the SMC automatically after about 10 seconds.

For Intel-based MacBooks, the process varies. Shut down your Mac, then press and hold Shift, Control, and Option (all on the left side of your keyboard) plus the power button simultaneously for 10 seconds. Release all keys, wait a few seconds, then power on normally.

If this works, you'll likely see the charging indicator light up within moments of restarting.

## Examine the charging port closely

Even if you can't see obvious damage, debris or corrosion in the charging port can prevent connection. Look carefully at the port on your MacBook using your phone's torch or a magnifying glass. Look for any lint, dust, or greenish discolouration inside.

If the port looks dirty, gently clean it using a dry toothpick or the edge of a stiff card. Never use liquids, as moisture near power electronics is dangerous. Be extremely gentle, as these ports are fragile. If you're uncomfortable doing this yourself, professional cleaning is worth R599 and could save you from more expensive repairs.

## When the charger itself is the problem

If you've tried everything above and your Mac still won't charge, the issue likely lies with the power adapter. MacBook chargers are expensive (often R1,200 to R2,500 depending on wattage), so it's worth being sure before you replace it.

If you have access to a compatible charger from a friend or colleague, try borrowing it for 15 minutes. This simple test will definitively tell you whether your charger is dead. However, never use an incompatible charger, as using the wrong wattage can damage your battery and logic board.

## Time to get professional help

If your charging port has visible damage, corrosion that won't clean, or if your MacBook still refuses to charge after trying these steps, it's time to call in the experts. Port repairs or replacements typically cost between R1,500 and R3,000 depending on whether the port itself is damaged or just needs cleaning, and whether related components have been affected.

**ZA Support in Hyde Park can help.** We diagnose charging issues for an assessment fee from R599, and we're honest about whether you're looking at a simple fix or a more substantial repair. If you're in Sandton, Rosebank, Fourways, Bryanston, Midrand, or Randburg, we offer a collection service so you don't need to travel with your Mac. Get in touch via WhatsApp on 064 529 5863 and we'll take it from there.`,
  },

  'macbook-overheating-fix-johannesburg': {
    slug: 'macbook-overheating-fix-johannesburg',
    title: `MacBook Overheating: Causes, Fixes, and When To Get Help`,
    excerpt: `A MacBook that runs hot under normal use is telling you something. Here is how to diagnose overheating and when to bring it in.`,
    date: '21 March 2026',
    category: 'Troubleshooting',
    readTime: '4 min read',
    author: 'ZA Support',
    content: `# MacBook Overheating: Causes, Fixes, and When To Get Help

If your MacBook is running hot to the touch or the fan sounds like it's about to take flight, you're not alone. Overheating is one of the most common issues we see at ZA Support, and the good news is that it's often fixable. Your Mac is trying to tell you something, and the sooner you listen, the better it'll be for your machine's longevity.

## Why Is Your MacBook Getting So Hot?

MacBooks are engineered to run cool, but several things can cause them to overheat during normal use. The most common culprit is dust and debris clogging the air vents and fans, which prevents proper airflow inside the chassis. Over time, the thermal paste that sits between your processor and heat sink can dry out, reducing its ability to transfer heat away from your components.

Software problems can also be responsible. A runaway process, a poorly optimised app, or even a malware infection can cause your CPU to work harder than it should, generating excess heat. Sometimes it's as simple as having too many browser tabs open or running demanding applications like video editing software while your system is already struggling.

Lastly, ambient temperature matters. If you're working in a warm room or with your MacBook on a soft surface like a bed or pillow, the vents get blocked and heat has nowhere to escape. This is particularly common in Johannesburg's summer months.

## How to Diagnose Overheating Before It Becomes Serious

Start by checking what's actually using your CPU. Open Activity Monitor (search for it in Spotlight), then click the CPU tab and sort by percentage. Look for any process using more than 50% of your CPU when you're not actively running anything demanding. If you see something unfamiliar hogging resources, that's your problem.

Listen to your fan. A MacBook fan running at full speed constantly is a red flag. Check your Mac's temperature using free tools like Macs Fan Control or Coconut Battery. Normal operating temperature is around 40-60°C. If you're seeing 80°C or higher during everyday tasks, something needs attention.

Feel the bottom of your MacBook. It should be warm, not painfully hot. If you can't hold your hand on the bottom for more than a few seconds, bring it in for assessment. We charge from R599 for a thorough diagnostic at ZA Support.

## Simple Fixes You Can Try Right Now

Before you panic, try these steps. First, restart your Mac completely. Many thermal issues are temporary software gremlins that a reboot will fix. While it's off, make sure your vents are clear. Use a soft brush or low-power compressed air to gently clean the vents on the sides and back of your MacBook. Never use a vacuum, as static electricity can damage components.

Next, reset your Mac's System Management Controller (SMC). This controls thermal management and fan speed. For Apple silicon Macs (M1, M2, M3), simply shut down your machine and leave it off for at least 30 seconds, then power it back on. For Intel Macs, the process is more involved and involves holding specific key combinations, so check Apple's official instructions.

Check your Safari tabs and browser extensions. Close anything you're not using. If you use Chrome, switch to Safari, which is far more efficient on battery and thermals. Quit any background apps you don't need, especially video streaming services.

## When You Need Professional Help

If your MacBook is still overheating after these steps, the problem is likely internal. Dust buildup deep inside the chassis, failing fans, or dried-out thermal paste all require professional repair. These aren't jobs for DIY unless you're comfortable with precision electronics work.

**Thermal paste replacement** is one of the most common fixes we do, and it can make a dramatic difference. After a few years, the paste between your CPU and heat sink deteriorates and loses its effectiveness. Reapplying quality thermal paste restores proper heat transfer and often drops temperatures by 10-15°C.

Failed fans also require replacement. If your fan is running but your Mac is still overheating, the fan might not be functioning properly. A new fan typically costs less than you'd think, and it's absolutely worth doing before heat damage impacts your logic board.

## Get Your MacBook Back to Cool Running at ZA Support

If your MacBook is overheating, don't ignore it. Heat damage compounds quickly and can permanently harm your machine. We're based in Hyde Park, Johannesburg, and we offer a hassle-free collection service if you're in Sandton, Rosebank, Fourways, Bryanston, Midrand, or Randburg.

Get in touch via WhatsApp on 064 529 5863 to discuss what's happening with your Mac. We'll give you honest advice on whether it needs a repair or a simple clean, and we'll get you sorted quickly. Your MacBook shouldn't sound like a jet engine, and ours don't.`,
  },

  'macbook-keyboard-not-working': {
    slug: 'macbook-keyboard-not-working',
    title: `MacBook Keyboard Not Working? Common Fixes for Johannesburg Users`,
    excerpt: `Keys sticking, not registering, or entire keyboard unresponsive? Here is what causes MacBook keyboard failures and how they are fixed.`,
    date: '21 March 2026',
    category: 'Repairs',
    readTime: '4 min read',
    author: 'ZA Support',
    content: `# MacBook Keyboard Not Working? Common Fixes for Johannesburg Users

If your MacBook keyboard has suddenly stopped cooperating, you're not alone. Whether it's a single key that refuses to register, multiple keys sticking, or your entire keyboard going dark, keyboard issues are one of the most frustrating problems Mac users face. The good news is that not every keyboard problem requires a full replacement, and understanding what's gone wrong is the first step to getting your Mac back in working order.

## What causes MacBook keyboard failure?

MacBook keyboards fail for several common reasons, and the cause often determines whether you can fix it yourself or need professional help. **Liquid damage** is surprisingly frequent, even from small spills or morning coffee mishaps that happen near your desk. Dust, crumbs, and debris can accumulate under keys over time, preventing them from making proper contact. Some users experience **sticky keys** that feel sluggish or don't register consistently, which might be caused by residue buildup or manufacturing defects.

Older MacBook models, particularly those with butterfly keyboards (2015 to 2019 models), suffered from widespread design flaws that caused premature failure. These keyboards were prone to sticking and non-responsive keys because even tiny particles could lodge beneath the shallow switches. Apple eventually acknowledged this issue and offered extended keyboard repairs for affected models, though that programme has now concluded.

## Quick fixes you can try at home

Before you book a repair appointment, try a few simple steps that might resolve your issue. If a single key isn't registering, try pressing it firmly and repeatedly at different angles, as dust sometimes shifts on its own. You can also gently tilt your MacBook and tap around the affected key area to dislodge any trapped debris.

For sticky keys, dip a cotton bud in isopropyl alcohol (70% concentration is ideal) and gently clean around the edges of the problem key. Avoid pouring liquid directly onto your keyboard. If your entire keyboard is unresponsive, restart your Mac completely, as a software glitch occasionally causes this. You might also check System Preferences to ensure no accessibility features are interfering with your keyboard.

If the issue persists after these attempts, stop experimenting and seek professional help. Disassembling your MacBook yourself risks damaging other components and will almost certainly void your warranty.

## When to seek professional repair

Some keyboard problems require specialist attention. If you've spilled liquid on your Mac, have it inspected immediately, even if it seems to be working fine. Liquid can corrode internal circuits over time, and only professionals with proper tools can assess the damage accurately. Non-responsive keys that don't improve with cleaning, widespread sticking across multiple keys, and keyboard backlighting failures all point to issues that need hands-on repair.

**ZA Support in Hyde Park offers MacBook keyboard repair for Johannesburg users**, with an initial assessment starting from R599. Our technicians can diagnose whether you need a simple cleaning, key replacement, or full keyboard assembly replacement. If your MacBook is still under AppleCare+ or manufacturer warranty, we can advise you on the best path forward.

## Butterfly vs modern keyboards

If you're using a 2015 to 2019 MacBook, there's a strong chance your keyboard uses the infamous butterfly mechanism. These were designed to be thinner but proved unreliable in real-world use. Modern MacBooks from 2021 onwards use the redesigned Magic Keyboard, which is far more durable and responsive. If you're repeatedly having keyboard trouble with an older model, it might be worth discussing whether repair or upgrade makes sense for your situation.

## Getting your MacBook repaired in Johannesburg

When you're ready to sort out your keyboard, bring your MacBook to **ZA Support in Hyde Park** or use our convenient collection service. We collect from Sandton, Rosebank, Fourways, Bryanston, Midrand, and Randburg, so you don't need to travel if those areas are more convenient. Get in touch via WhatsApp on **064 529 5863** to arrange a collection time or book your appointment.

We'll run diagnostics to pinpoint exactly what's causing your keyboard issues and provide you with repair options and pricing upfront. Most keyboard repairs can be completed within a few days, and we'll keep you updated throughout the process.

Don't let a broken keyboard hold you back. Whether it's a quick clean or a full keyboard replacement, we're here to help Johannesburg Mac users get typing again.`,
  },

  'iphone-screen-repair-cost-johannesburg-2026': {
    slug: 'iphone-screen-repair-cost-johannesburg-2026',
    title: `iPhone Screen Repair Cost in Johannesburg — 2026 Price Guide`,
    excerpt: `How much does iPhone screen repair cost in Johannesburg in 2026? We break down pricing by model and explain what affects the final price.`,
    date: '21 March 2026',
    category: 'Pricing',
    readTime: '4 min read',
    author: 'ZA Support',
    content: `# iPhone Screen Repair Cost in Johannesburg — 2026 Price Guide

You've dropped your iPhone, and now there's a spiderweb of cracks across the screen. Your first thought is probably, "How much is this going to cost me?" The truth is, iPhone screen repair costs vary quite a bit depending on which model you own, whether it's just the glass or the LCD underneath, and where you go for repairs. We'll walk you through what you can expect to pay in Johannesburg in 2026, so you can make an informed decision.

## Screen Repair vs Screen Replacement: What's the Difference?

Before we talk pricing, it's worth understanding what repair technicians mean when they discuss screen damage. If only the outer glass is cracked but your display still works perfectly, some repair shops can replace just the glass layer. This is typically cheaper than a full screen replacement.

However, most modern iPhones have the glass and LCD fused together as one unit, which means damage to either part usually requires replacing the entire display assembly. It's not really a repair in the traditional sense, it's a replacement. This is important because it affects your final bill significantly.

## iPhone Screen Replacement Costs by Model

Pricing varies considerably depending on your iPhone model. Newer models with larger displays and advanced screen technology command higher replacement costs than older ones.

For current-generation models like the iPhone 15 and iPhone 15 Pro Max, expect to pay somewhere between R2,500 and R4,200 for a genuine screen replacement, depending on the specific variant. Mid-range models such as the iPhone 14 typically cost between R1,800 and R3,000. Older phones like the iPhone 12 or iPhone 11 are generally cheaper to repair, with costs ranging from R1,200 to R2,500.

It's worth noting that **aftermarket screens** are sometimes available at lower prices, but they often come with compromises in quality, brightness, and touch responsiveness. Apple's official pricing through Apple Johannesburg tends to be higher than independent repair specialists, but you do get guaranteed quality and warranty protection.

## What Affects Your Final Repair Cost

Several factors beyond just your model will influence how much you'll actually pay. The extent of damage matters, particularly if the impact has damaged the frame, battery, or other internal components alongside the screen. A technician will need to assess this before giving you a final quote.

Your location also plays a role. Getting your screen replaced in the CBD might cost differently than a specialist in the northern suburbs. Many repair shops in Johannesburg charge similar rates, but transport logistics can affect pricing if you're in a difficult-to-reach area. This is why many local shops, including ZA Support in Hyde Park, offer collection services from areas like Sandton, Rosebank, Fourways, Bryanston, Midrand, and Randburg.

Whether you choose a genuine Apple screen or a quality third-party replacement will significantly impact your cost. Genuine screens are more expensive but perform identically to your original display. Third-party screens are cheaper but may have lower brightness or touch sensitivity issues.

## Should You Repair or Replace Your iPhone?

If your iPhone is relatively new and the screen is the only damage, repair makes good financial sense. However, if your phone is already four or five years old and the screen is cracked, you might want to consider whether the repair cost justifies keeping the device.

Calculate roughly what your phone is worth secondhand versus what the repair costs. If the repair is more than 40 percent of the replacement value of a used phone in good condition, upgrading might be smarter in the long run.

## Getting Your Screen Replaced in Johannesburg

When you're ready to book a repair, get a proper assessment before committing to the cost. Many Johannesburg repair specialists, including ZA Support, charge a modest assessment fee (from R599) that gives you an accurate quote based on your specific phone and damage. This removes guesswork from the process.

ZA Support operates from Hyde Park and serves the broader Johannesburg area. You can reach them via WhatsApp on 064 529 5863 to discuss your situation, arrange collection from your location in Johannesburg's northern suburbs, or book an appointment. They'll give you honest advice about whether your phone is worth repairing and what the actual cost will be.

The key is getting the repair done sooner rather than later. A cracked screen can worsen with daily use, and moisture can eventually damage internal components if the seal is broken. A quick assessment and repair will get your phone back to normal and prevent bigger problems down the line.`,
  },

  'mac-data-recovery-johannesburg': {
    slug: 'mac-data-recovery-johannesburg',
    title: `Mac Data Recovery in Johannesburg — What You Need to Know`,
    excerpt: `Deleted files, failed SSD, or a dead MacBook? Here is how Mac data recovery works and what affects whether your data can be saved.`,
    date: '21 March 2026',
    category: 'Data Recovery',
    readTime: '4 min read',
    author: 'ZA Support',
    content: `# Mac Data Recovery in Johannesburg — What You Need to Know

You've just realised your important files are gone. Whether you emptied the Trash by mistake, your MacBook stopped working, or your hard drive is making strange noises, the panic sets in quickly. The good news is that deleted files on a Mac don't always disappear for ever, and even data from failed drives can often be recovered. Understanding how the process works will help you know what to expect and what your chances are.

## How Mac Data Recovery Actually Works

When you delete a file on your Mac, the operating system doesn't wipe it away immediately. Instead, it marks the space as available for new data. The file itself remains on the drive until that space gets overwritten. This is why acting quickly matters. The sooner you stop using your Mac after data loss, the better your chances of recovery.

**Professional data recovery** works in stages. First, a technician assesses what went wrong, whether that is accidental deletion, a failing SSD, water damage, or a hardware failure. Next, they extract the data using specialist equipment and software. Finally, they verify the recovered files and transfer them to a new drive or your preferred storage device. The entire process typically takes several days, depending on the severity of the damage.

## What Affects Your Recovery Success Rate

Several factors determine whether your data can be recovered and how much of it survives. The type of storage your Mac uses is significant. Newer Macs with SSDs (solid-state drives) behave differently to older Macs with mechanical hard drives. SSDs write data more aggressively, which means deleted files can be overwritten faster. However, SSDs also have better failure diagnostics, which can work in your favour.

The extent of the physical damage matters considerably. A Mac that won't turn on but has no physical damage to the logic board has a much higher recovery rate than one that has been exposed to liquid or impact. Similarly, if your Mac is still functioning but just showing signs of a failing drive, recovery is usually straightforward. If the drive makes clicking sounds or the system randomly freezes, get it checked before the situation worsens.

Time also plays a role. If you used your Mac heavily after losing the files, you have overwritten more space and reduced your recovery chances. This is why we recommend turning off your Mac immediately after discovering data loss and avoiding any further use.

## When to Attempt DIY Recovery vs Professional Help

If your MacBook is still working and responding normally, you might recover recently deleted files yourself using software like **Trash recovery apps** or **Time Machine backups**. Check your Trash first, it is surprising how often files sit there unnoticed. If you have a Time Machine backup from before the deletion, recovery is simple and free. Just open Time Machine and browse to the date when your files were still there.

However, if your Mac has failed to start, your drive is making unusual sounds, or you are seeing error messages about the disk, do not attempt to recover data yourself. Opening a failing drive or trying software recovery on a damaged system can cause further damage and reduce your chances of professional recovery later. This is when you need specialist help.

Water damage, physical trauma, or logic board failures also require professional intervention. These situations need clean-room conditions and specialist equipment that only proper data recovery services have.

## What Professional Recovery Costs in Johannesburg

Pricing for data recovery in South Africa typically starts from around **R599 for an initial assessment**. This fee helps technicians diagnose the problem and give you an honest estimate of whether recovery is possible and what it will cost. Some recovery jobs are straightforward and cost less, whilst others involving failed drives or severe damage may range from R1,500 to R5,000 or more, depending on the extent of the work needed.

The assessment fee is usually credited towards your final bill if you proceed with recovery, so it is not a wasted cost. You will get a clear picture of your options before committing to anything.

## Getting Professional Help in Johannesburg

If you are in Johannesburg and need professional data recovery, **ZA Support** can help. We handle everything from accidental deletion to failed SSDs and water-damaged Macs. Based in Hyde Park, we also offer a collection service for clients across Sandton, Rosebank, Fourways, Bryanston, Midrand, and Randburg, so you do not need to worry about transport. Simply get in touch via WhatsApp on **064 529 5863** to arrange an assessment. We will give you honest advice about whether your data can be recovered and what it will cost, so you can make an informed decision without stress.`,
  },

  'macbook-pro-m1-m2-repair-johannesburg': {
    slug: 'macbook-pro-m1-m2-repair-johannesburg',
    title: `MacBook Pro M1 and M2 Repair in Johannesburg — What You Need to Know`,
    excerpt: `Apple Silicon MacBook Pro repair is different to Intel-era repairs. Here is what to know before bringing your M1 or M2 MacBook Pro in for service.`,
    date: '21 March 2026',
    category: 'Repairs',
    readTime: '4 min read',
    author: 'ZA Support',
    content: `# MacBook Pro M1 and M2 Repair in Johannesburg — What You Need to Know

If your M1 or M2 MacBook Pro has started playing up, you might be wondering whether it's worth repairing or if you should just replace it. The good news is that most issues are fixable, but Apple Silicon repairs are quite different from what older MacBook owners experienced. Understanding these differences now will help you make better decisions about your machine and avoid unnecessary costs.

## Apple Silicon Is Different From Intel

The biggest shift in MacBook Pro repair came when Apple moved to its own chips, the M1 and M2 processors. These are not traditional processors like Intel's—they're designed specifically for Apple's hardware and software, which means the repair process is fundamentally different. With Intel-based MacBooks, repair shops could swap components relatively freely. With Apple Silicon, things are far more tightly integrated.

The M1 and M2 are essentially soldered directly to the logic board, which means they cannot be replaced as individual components. If your chip fails, the entire logic board needs to be replaced, not just the processor. This is one reason why getting an accurate diagnosis early on really matters—misidentifying an issue as a chip problem when it's actually something else can lead to unnecessary expense.

## What Can Actually Be Repaired

The good news is that not everything on an M1 or M2 MacBook requires a complete logic board replacement. Several components can still be serviced independently, which keeps repair costs down when possible. Storage upgrades or replacements are straightforward, provided your model allows them. Battery replacements are also standard work that most repair specialists handle regularly. Similarly, screen repairs, keyboard replacement, and port repairs can often be done without touching the core components.

Thermal issues are common with M1 and M2 MacBooks, particularly when they're pushed hard. If your machine is running hot or the fans are loud, it might just need cleaning and fresh thermal paste rather than a major repair. This is something ZA Support can diagnose quickly during an assessment.

## Common M1 and M2 MacBook Pro Problems

Several issues tend to crop up more frequently with these newer machines. Some users experience battery drain even when the machine is properly shut down. Others report graphical glitches, kernel panics, or unexpected shutdowns. Some M1 and M2 machines have had touchpad issues or charging problems that stem from USB-C port damage rather than the actual charger.

Software can sometimes mimic hardware problems, which is why a proper diagnostic is essential. Running through standard troubleshooting steps like resetting the NVRAM, booting in safe mode, or reinstalling macOS might resolve your issue without any repair at all. If you're comfortable doing this yourself, it's worth trying first.

## When to Come In vs When to Wait

You should bring your MacBook Pro to a specialist if you're experiencing kernel panics that persist after a clean OS install, genuine hardware failures like trackpad unresponsiveness, or charging issues. If your machine simply runs slowly or feels hot, try these first: close unnecessary applications, check Activity Monitor for resource-heavy processes, and make sure your storage isn't completely full.

If you're based in Johannesburg and prefer not to travel, ZA Support offers a collection service for customers in Sandton, Rosebank, Fourways, Bryanston, Midrand, and Randburg. We can collect your machine, diagnose the issue, and keep you updated throughout the process.

## Cost Expectations for M1 and M2 Repairs

Repair costs vary significantly depending on what's actually wrong. A battery replacement costs considerably less than a logic board replacement, which could be substantial. The assessment fee from ZA Support is from R599, which includes a full diagnostic and a detailed report of what needs fixing and what it will cost. This upfront clarity helps you decide whether repair makes sense economically.

Parts availability for Apple Silicon machines is improving but can still be slower than for older models. This means some repairs may take a bit longer than you'd expect with Intel-era machines.

## Get Your M1 or M2 Assessed

If you're uncertain about what's wrong with your MacBook Pro, getting a professional assessment is the smart first step. ZA Support specialises in Apple Silicon repairs and can give you honest advice about whether your machine is worth fixing or whether replacement might be the better option. Contact us on WhatsApp at 064 529 5863 to arrange a collection or book your machine in at our Hyde Park location. We'll get you clear answers about what's happening with your M1 or M2.`,
  },

  'macbook-trackpad-not-clicking': {
    slug: 'macbook-trackpad-not-clicking',
    title: `MacBook Trackpad Not Clicking or Stuck? Here Is Why`,
    excerpt: `MacBook trackpad not responding to clicks, clicking everywhere, or physically stuck? These are the most common causes and fixes.`,
    date: '21 March 2026',
    category: 'Troubleshooting',
    readTime: '4 min read',
    author: 'ZA Support',
    content: `# MacBook Trackpad Not Clicking or Stuck? Here Is Why

If your MacBook trackpad has stopped responding to clicks, feels physically stuck, or is registering clicks in the wrong places, you're not alone. The trackpad is one of the most-used components on a Mac, and it can develop issues for several different reasons. The good news is that some problems are easy to fix yourself, whilst others need professional attention. Let's walk through the most common causes and what you can do about them.

## Software Issues: Try These Fixes First

Sometimes your trackpad isn't actually broken, it's just confused. Your Mac might have disabled it temporarily, or there could be a software glitch preventing normal operation.

The first thing to try is restarting your Mac. This sounds simple, but it genuinely solves many trackpad issues. Hold down the power button for 10 seconds until your Mac shuts down completely, then turn it back on.

If that doesn't work, check whether your trackpad is disabled in System Settings. Go to System Settings, then Trackpad, and make sure it's enabled. You can also reset your trackpad settings by clicking "Reset" in this menu, which can help if your Mac is misinterpreting your gestures.

Another common fix is updating your macOS. Apple regularly releases updates that address trackpad bugs. Go to System Settings, then General, then Software Update to check for any pending updates.

## Physical Debris and Dirt

The most common reason for a trackpad to feel sticky or stuck is dust and debris underneath the surface. MacBook trackpads are incredibly thin and precise, so even tiny particles can cause problems.

Start by powering off your Mac completely. Then use a dry, lint-free cloth to gently wipe the entire trackpad surface. You can also use a slightly dampened cloth (not wet, just slightly damp) with distilled water or a 50-50 mix of water and isopropyl alcohol.

For debris trapped underneath, try angling the cloth and gently working around the edges. Never use compressed air on a trackpad, as the pressure can force particles deeper inside or damage the delicate internal components.

If cleaning doesn't help within a few hours, the debris is probably too far inside for a simple wipe-down to reach, and you'll need professional cleaning equipment.

## Trackpad Mechanical Failure

If your trackpad clicks everywhere except where you're pressing, or doesn't click at all despite physical contact, you likely have a mechanical issue inside the trackpad mechanism itself.

MacBook trackpads use a special force-sensing technology that can wear out over time. When this happens, the trackpad might register pressure unevenly, making it impossible to click accurately. You might notice clicking working on the left side but not the right, or clicks happening randomly across the surface.

Another common mechanical problem is a stuck button mechanism, where the internal spring or lever has become lodged and won't respond to pressure anymore. This usually feels like the trackpad is completely frozen or unresponsive to any clicks.

These issues cannot be fixed at home. The trackpad mechanism is sealed and soldered to the logic board, so it requires professional repair or replacement.

## Battery and Keyboard Swelling

In some cases, your trackpad issues are actually caused by a swollen battery beneath it. MacBook batteries naturally degrade over time, and when they swell, they can press upward against the trackpad, making it unresponsive or physically stuck.

You might notice your trackpad feels slightly raised or bulging, or your keyboard sits unevenly. If your MacBook is also getting warm, running slowly, or your battery drains rapidly, a swollen battery is likely the culprit.

Do not attempt to open your MacBook yourself if you suspect battery swelling. This is a safety risk and requires professional handling. Get in touch with a specialist as soon as possible.

## When to Seek Professional Help

If you've tried restarting, updating your software, and cleaning your trackpad without success, it's time to bring your Mac in for assessment. At ZA Support in Hyde Park, we diagnose trackpad issues for from R599. We can identify whether the problem is software-related, a mechanical fault, or something more serious like battery swelling.

We serve Johannesburg and the surrounding areas, including Sandton, Rosebank, Fourways, Bryanston, Midrand, and Randburg. If you'd prefer not to bring your Mac in, we offer a collection service, so we can come to you.

Most trackpad repairs are straightforward once properly diagnosed, and we can usually complete work quickly. Get in touch with us on WhatsApp at 064 529 5863 to discuss your issue and book an assessment.`,
  },

  'apple-watch-screen-repair-johannesburg': {
    slug: 'apple-watch-screen-repair-johannesburg',
    title: `Apple Watch Screen Repair in Johannesburg — Cost and Options`,
    excerpt: `Cracked Apple Watch screen? Here is what your options are in Johannesburg and what affects the cost of Apple Watch screen repair.`,
    date: '21 March 2026',
    category: 'Repairs',
    readTime: '4 min read',
    author: 'ZA Support',
    content: `A cracked or shattered **Apple Watch screen** is frustrating, especially when you rely on your watch for notifications, fitness tracking, and everyday timekeeping. The good news is that screen repair is usually straightforward and far more affordable than replacing the entire device. If you're in Johannesburg and wondering what your options are, what it will cost, and how long it takes, we've got the answers you need.

## What determines your Apple Watch screen repair cost

The price of fixing your Apple Watch screen depends on several factors. First, your watch model matters significantly, Apple Watch Series 9, Ultra, and older models all have different screen configurations and repair complexity. Second, whether you have damage to just the glass or the entire display affects the cost, a glass-only repair is cheaper than replacing the full screen assembly. Third, your watch's age and current repair status influence pricing. An older Series 3 will typically cost less to repair than a newer Ultra model.

In South Africa, you can expect Apple Watch screen repairs to range from around R1,200 to R3,500 depending on these variables. The most precise quote comes from an in-person assessment, which is why we charge only from R599 for an evaluation.

## Apple's official repair versus third-party options

Apple's own repair service is reliable and guarantees genuine parts, but it often means longer turnaround times and higher costs. You'll typically need to visit an Apple Store or an authorised service provider, and repairs can take several days. For many Johannesburg residents, this route is inconvenient when you need your watch back quickly.

Third-party repair specialists like ZA Support offer a faster alternative. We keep common Apple Watch components in stock, which means we can often complete repairs the same day or within 24 hours. Our technicians are experienced in handling all Apple Watch models, and we provide transparent pricing upfront so you're never surprised by hidden costs.

## The repair process and turnaround time

When you bring your Apple Watch in for screen repair, the technician will first diagnose the exact issue. Sometimes what looks like a cracked screen is actually a pressure damage to the sapphire crystal, which repairs differently. This assessment takes just a few minutes.

The actual repair typically takes between 1 to 3 hours, depending on how busy we are and the complexity of your specific model. You don't need to wait around, we can book you in at a time that works for your schedule. If you're in Sandton, Rosebank, Fourways, Bryanston, Midrand, or Randburg, we also offer a collection service, so you don't even need to travel to Hyde Park yourself.

## Can you repair it yourself

Before you search for DIY videos, here's the honest truth, Apple Watch screen repair is extremely difficult to do at home. The watches are sealed devices with tiny screws and delicate ribbon cables. If you're not experienced with micro-electronics, you risk damaging the battery, digitiser, or internal components beyond repair. A simple screen replacement could become a R3,000+ device replacement.

Unless you're genuinely comfortable with precision electronics work, professional repair is the safer choice. It also gives you peace of mind and usually comes with a warranty on the work.

## Water resistance after repair

One concern many people have is whether their watch remains water resistant after screen repair. A properly completed screen repair maintains the watch's original water resistance rating. This is why using a reputable repair service matters, poor repair work can compromise the seals and lead to water damage later.

When we complete a screen repair at ZA Support, we test the seal to ensure your watch is still water resistant to its rated depth. This is part of our standard quality assurance process.

## Getting your Apple Watch screen repaired in Johannesburg

If you've got a cracked or damaged Apple Watch screen, ZA Support in Hyde Park is your local solution. We repair all Apple Watch models, from the original Series through to the latest Ultra. Our technicians work quickly without compromising quality, and we're upfront about pricing from the moment you contact us.

To get started, **WhatsApp us on 064 529 5863** with a photo of your damaged screen and your watch model. We'll give you a repair estimate immediately. If you'd prefer a full assessment in person, book a time that suits you, or use our collection service if you're anywhere in northern Johannesburg. We're here to get your watch working again without the hassle or the long wait times.`,
  },

  'ipad-screen-repair-johannesburg-2026': {
    slug: 'ipad-screen-repair-johannesburg-2026',
    title: `iPad Screen Repair in Johannesburg — 2026 Guide`,
    excerpt: `Cracked iPad screen? Here is what screen repair costs in Johannesburg in 2026, which iPads are most repairable, and what to expect.`,
    date: '21 March 2026',
    category: 'Repairs',
    readTime: '4 min read',
    author: 'ZA Support',
    content: `# iPad Screen Repair in Johannesburg — 2026 Guide

If you've just dropped your iPad and watched the screen crack, you're probably wondering three things: can it be fixed, how much will it cost, and how long will it take? The good news is that iPad screen repairs are generally straightforward and affordable compared to replacing the entire device. The better news is that Johannesburg has several reliable repair specialists, including those who can collect your device from your location if you're in the northern suburbs.

This guide will walk you through what to expect when repairing a cracked iPad screen in 2026, pricing for different iPad models, and whether you should attempt a DIY fix or bring your device to a professional.

## Why iPad Screens Crack So Easily

iPad screens are toughened glass, but they're not indestructible. Most cracks happen from drops, pressure damage, or impact with hard surfaces. Unlike some older devices, modern iPads use laminated screens that bond the glass tightly to the LCD layer beneath, which means even a seemingly small crack can affect the display's performance over time.

The frustrating part is that a cracked screen often works fine initially. You can still tap, swipe, and view content without major problems. However, cracks tend to spread, dust can get trapped under the glass, and the structural integrity of your screen weakens. Repairing it sooner rather than later saves you money and prevents further damage to the LCD panel underneath.

## iPad Screen Repair Costs in Johannesburg 2026

Screen repair pricing varies significantly depending on which iPad model you own. Larger screens cost more to replace, and newer iPad Pro models with advanced display technology command higher repair costs.

For standard iPad models (iPad 10th generation and earlier), screen replacement typically ranges from **R1,800 to R2,400**. iPad Air screens fall into the **R2,200 to R3,000** range, whilst iPad Pro screens are considerably more expensive at **R3,500 to R6,500** depending on screen size and generation. iPad mini repairs sit around **R1,600 to R2,200**.

These prices include parts and labour. Most Johannesburg repair shops charge an assessment fee of around **R599** if you're unsure of the damage or model specifics. When you contact a repair specialist, always ask whether the quote includes the assessment fee and whether any warranty applies to the repaired screen.

## Which iPads Are Easiest to Repair?

Not all iPad screens are equally simple to replace. Standard iPad models have the most straightforward repair process, requiring basic tools and reasonable technical skill. iPad Air and iPad Pro models are more complex, partly because they're thinner and have tighter internal spacing.

iPad Pro screens are notoriously difficult to replace because the device is so thin and the components are densely packed. Additionally, newer iPad Pro models often feature more advanced display technologies like ProMotion or mini-LED, which increases both the cost and the technical difficulty of repair.

If your iPad is relatively old (more than five years), you might struggle to find replacement screens in stock. Specialist repair shops in Johannesburg often keep screens for popular current and recent models, but obscure or very old iPads may require ordering parts from international suppliers, adding several days to the repair time.

## Should You DIY or Go Professional?

Repairing an iPad screen yourself is possible if you have a replacement screen, appropriate tools, and patience. However, it's genuinely difficult work. The glass is bonded with strong adhesive, removing it without damaging the LCD layer beneath requires practice, and reassembly demands precision to ensure the device is waterproof and functions correctly.

If you've never done device repairs before, professional repair is usually the better choice. You'll get a properly repaired device, a warranty on the work, and you won't risk making the damage worse (which could cost you significantly more). If you're skilled at repairs and can source a quality replacement screen online, DIY might save you money.

For most people in Johannesburg, taking the device to a specialist makes sense. The labour cost is reasonable, you get certainty that the repair is done correctly, and most shops stand behind their work with warranties.

## Get Your iPad Screen Fixed at ZA Support

If you're in Johannesburg and need your iPad screen repaired, **ZA Support** specialises in Apple device repairs, including iPad screens for all models. We're located in Hyde Park, and we offer a convenient collection service if you're in Sandton, Rosebank, Fourways, Bryanston, Midrand, or Randburg.

Our assessment process is transparent. We'll diagnose the damage, give you an honest quote, and explain what's involved in your specific repair. We source quality replacement screens and provide warranty coverage on completed work.

Drop us a message on **WhatsApp at 064 529 5863** to discuss your iPad screen damage, get a quote, or arrange collection from your location. We'll get your iPad looking and functioning like new.`,
  },

  'mac-mini-repair-johannesburg': {
    slug: 'mac-mini-repair-johannesburg',
    title: `Mac Mini Repair in Johannesburg — RAM, SSD, and Logic Board`,
    excerpt: `Mac Mini not turning on, running slow, or showing no display? Here is what Mac Mini repairs involve and what can be upgraded.`,
    date: '21 March 2026',
    category: 'Repairs',
    readTime: '4 min read',
    author: 'ZA Support',
    content: `# Mac Mini Repair in Johannesburg — RAM, SSD, and Logic Board

Your Mac Mini won't turn on. Or maybe it's crawling through tasks that used to be instant. Perhaps the screen stays dark even when you know the machine is running. These are frustrating problems, but they're also some of the most common reasons Mac Mini owners visit a repair specialist. The good news is that many Mac Mini issues are fixable, and some are even preventable with the right upgrades. Let's walk through what's usually involved in Mac Mini repairs and what you can actually upgrade yourself.

## Why Your Mac Mini Might Not Be Turning On

A Mac Mini that won't start can feel like a complete dead end, but there are several culprits to investigate before assuming the worst. Power supply problems are surprisingly common, especially in older models where the cable connections have loosened or the internal power board has failed. You should first check that the power cable is firmly seated and that your wall outlet is working (try plugging in something else, like a lamp).

If the Mac Mini shows no signs of life at all, a failed power supply or logic board issue is likely. These aren't things you should try to fix yourself, as they involve internal components and potential electrical hazards. This is where a proper **Mac Mini repair** service becomes essential. At ZA Support in Hyde Park, we can diagnose power issues for from R599 as an assessment fee, and we'll let you know exactly what's needed before proceeding with repairs.

## Upgrading RAM for Better Performance

If your Mac Mini is running slowly but still switching on, a RAM upgrade might be the answer. Modern versions of macOS demand more memory, especially if you're juggling multiple browser tabs, editing video, or running virtual machines. Most Mac Mini models can have their RAM upgraded, though the difficulty varies by year.

For older Mac Mini computers, upgrading RAM is relatively straightforward and something a confident user might attempt at home. For newer models, especially the M1 and M2 versions, RAM is often soldered to the logic board, making upgrades impossible after purchase. Before you buy new RAM, check your Mac Mini's specifications online or ask an expert which models allow upgrades.

If you're not comfortable opening your Mac Mini, ZA Support offers RAM upgrades with professional installation. We can advise you on the right memory for your machine and handle the installation, ensuring everything is properly seated and your system recognises the upgrade.

## Storage Solutions: Upgrading Your SSD

Running out of storage space is one of the most common reasons Mac Mini owners notice a performance drop. When your drive fills up, macOS has nowhere to write temporary files and caches, which causes the entire system to slow down noticeably. Unlike older Mac Minis with traditional hard drives, modern models use fast **SSD storage**, which is more reliable but also makes upgrading trickier.

Many users don't realise that upgrading the internal SSD requires opening the Mac Mini and, in some cases, transferring your data to the new drive. It's not dangerous, but it is fiddly and requires some technical know-how. If you're comfortable with it, replacement SSDs are available at reasonable prices. However, if the thought of opening your machine makes you nervous, our team can handle the upgrade and data transfer for you.

We also recommend making regular backups to an external drive or cloud storage, regardless of whether you plan to upgrade. If your SSD fails suddenly, backups are what save you from losing irreplaceable files.

## Logic Board Repairs and Diagnostics

The **logic board** is the heart of your Mac Mini. When it fails, the symptoms can look like almost anything: unexpected shutdowns, kernel panics, no display output, or a machine that won't recognise its storage. Logic board failures are one of the few problems that typically can't be fixed at home and require professional equipment to diagnose properly.

Common logic board issues include liquid damage (if your Mac Mini has been exposed to spills), failed power delivery components, or GPU failures on machines that get heavy use. Sometimes the problem is as simple as a loose internal cable, which only takes a few minutes to reseat once the Mac Mini is open.

If you suspect a logic board problem, don't spend time troubleshooting on your own. A professional diagnostic is worthwhile because the fix might be simpler than you think, or you'll at least know exactly what you're facing.

## What Should You Do Now?

If your Mac Mini is experiencing any of these issues, start with a professional assessment. ZA Support is based in Hyde Park, Johannesburg, and offers diagnostics from R599 to identify exactly what's wrong. We serve the wider Johannesburg area, including Sandton, Rosebank, Fourways, Bryanston, Midrand, and Randburg, and we offer a collection service if you'd prefer not to transport your Mac Mini yourself.

Whether you need a simple RAM upgrade, SSD replacement, power supply fix, or logic board repair, we can guide you through your options and help you get back to productive work. Contact us via WhatsApp on 064 529 5863 to discuss your Mac Mini, or visit us in store for a hands-on look at what's needed.`,
  },

  'how-to-check-macbook-battery-health': {
    slug: 'how-to-check-macbook-battery-health',
    title: `How to Check Your MacBook Battery Health (And What the Numbers Mean)`,
    excerpt: `macOS tells you your battery health — but what do cycle count and condition actually mean? Here is a plain-language guide.`,
    date: '21 March 2026',
    category: 'How-To',
    readTime: '4 min read',
    author: 'ZA Support',
    content: `# How to Check Your MacBook Battery Health (And What the Numbers Mean)

Your MacBook battery won't last forever, and at some point you'll wonder whether it's dying naturally or if something's gone wrong. The good news is that macOS includes built-in tools that tell you exactly what's happening with your battery, but the reports can seem cryptic if you don't know what you're looking at. This guide breaks down cycle count, battery condition, and what the numbers actually mean for your machine.

## How to Check Your Battery Health on macOS

Getting your battery health report takes about 30 seconds. Start by holding down the **Option key** and clicking the battery icon in the menu bar (top right of your screen). You'll see a window pop up with several pieces of information, including the battery's current condition and charge status.

If you want more detailed information, open **System Information**. Click the Apple menu, select About This Mac, then click System Report. From there, navigate to Power in the left sidebar. This screen shows you everything you need to know, including your cycle count and design capacity versus actual capacity.

## Understanding Cycle Count

A **cycle count** is simply the number of complete charge-discharge cycles your battery has gone through. One cycle means you've drained the battery from 100% down to 0% (though this doesn't have to happen all at once, it can be gradual over several days).

Most MacBook batteries are designed to retain about 80% of their original capacity at around 1,000 cycles. If your MacBook is a few years old and you're seeing a cycle count in the 400 to 600 range, that's perfectly normal use. A higher cycle count doesn't necessarily mean your battery is failing, but it does give you realistic expectations about how much longer the battery will perform at its best.

For reference, if you use your MacBook daily and charge it once per day, you'll accumulate roughly 365 cycles per year. A three-year-old machine might have somewhere between 800 and 1,200 cycles, depending on your usage habits.

## What "Condition" Really Means

The **Condition** field in System Information is what tells you whether your battery is actually healthy or not. There are four possible statuses you might see here.

**Normal** means your battery is functioning as it should. Even if your cycle count is high, if the condition shows as Normal, your battery is fine and you have no reason to worry.

**Replace Now** appears when your battery's capacity has dropped significantly (usually below 50% of its design capacity). This means the battery won't hold a charge effectively anymore, and you should plan to replace it soon.

**Service Recommended** appears when there's a detected issue with the battery, even if the capacity seems adequate. This might indicate a manufacturing defect or accelerated degradation that Apple wants you to address.

**Replace Soon** is less common and indicates your battery is still working but degrading faster than normal, and you should get it replaced within the next few weeks or months.

## What's the Difference Between Design Capacity and Current Capacity?

These two numbers tell you the story of your battery's life. **Design Capacity** is how much charge your battery could hold when it was brand new, measured in milliampere-hours (mAh). **Current Maximum Capacity** is what it can hold right now.

If your design capacity is 7,600 mAh and your current maximum capacity is 6,800 mAh, your battery is operating at about 89% of its original capacity. That's still very healthy. Once that percentage drops below 80%, you'll likely notice shorter battery life, and Apple may recommend replacement.

The difference between these two numbers grows naturally over time. Lithium batteries degrade with every charge, but Apple engineers their MacBook batteries to last several years of typical use before you'll notice a real difference in day-to-day performance.

## When to Replace Your MacBook Battery

If your condition shows **Replace Now** or **Service Recommended**, it's time to come in. You don't need to wait until your battery completely dies, and continuing to use a degraded battery can sometimes cause further issues.

For readers in the Johannesburg area, **ZA Support** in Hyde Park can handle your battery replacement. We offer a full battery service for most MacBook models, with pricing from R599 for an assessment. If you're based in surrounding areas like Sandton, Rosebank, Fourways, or Midrand, we also offer a collection service, so you don't need to bring your machine to us. Just give us a WhatsApp on **064 529 5863** to arrange a time.

Battery replacement is one of the most common MacBook repairs, and it's usually straightforward. Our team can have your machine back to you with a fresh battery and performance to match.

Keep checking your battery health every few months, especially as your cycle count climbs above 800. Knowing what's happening with your battery means you'll never be caught out by a dying machine at the worst possible moment.`,
  },

  'macbook-black-screen-on-startup': {
    slug: 'macbook-black-screen-on-startup',
    title: `MacBook Black Screen on Startup — Causes and Fixes`,
    excerpt: `MacBook powers on but the screen stays black? This guide covers the most common causes from display failures to logic board faults.`,
    date: '21 March 2026',
    category: 'Troubleshooting',
    readTime: '4 min read',
    author: 'ZA Support',
    content: `# MacBook Black Screen on Startup — Causes and Fixes

There's nothing quite like the panic of pressing the power button on your MacBook and hearing it spring to life, only to stare at a black screen. The device sounds normal, the lights might be on, but nothing appears on the display. This is one of the most frustrating issues Mac owners face, and the good news is that it's often fixable without a full logic board replacement.

The key to solving a **MacBook black screen on startup** is understanding what's actually happening. Your machine might be working perfectly well underneath, but something is preventing the display from showing anything. Let's walk through the most common causes and what you can actually do about them.

## Check the Obvious First: Power and Display Settings

Before you assume the worst, let's rule out the simple stuff. Your MacBook might be in sleep mode with the display dimmed to absolute zero. Press the spacebar or move the trackpad to wake it, then try adjusting the brightness using the F1 and F2 keys on your keyboard. Some users have accidentally maxed out the brightness or enabled a display setting that makes the screen appear completely black.

If you're using an external monitor, try disconnecting it and restarting. Sometimes a MacBook will route all display output to an external screen, leaving the built-in display blank. You should also check whether you've accidentally triggered **clamshell mode**, which disables the built-in display when a monitor is connected. Disconnect any external displays and try again.

## Reset the SMC (System Management Controller)

The SMC handles everything related to power, battery, thermal management, and yes, your display. When the SMC gets confused, black screens are a common symptom. Resetting it is straightforward and completely safe.

For most modern MacBooks with Apple Silicon (M1, M2, M3 chips), simply shut down the machine completely, wait 10 seconds, then power it back on. For older Intel-based MacBooks, shut down, then hold Shift + Control + Option + Power for 10 seconds. Release all keys and power on normally. You'll likely see the Apple logo appear shortly after.

This simple reset fixes the problem in a surprising number of cases. It costs nothing and takes two minutes.

## NVRAM Reset for Persistent Display Issues

If the SMC reset didn't work, the next step is resetting your **NVRAM** (non-volatile RAM), which stores display settings and other preferences. This is slightly more involved but still something you can do yourself at home.

Restart your Mac and immediately hold Command + Option + P + R as soon as you hear the startup sound (on Intel Macs, hold it until you hear the startup sound twice). On Apple Silicon Macs, hold these keys until you see the Apple logo appear and disappear. This process clears the NVRAM and often restores normal display function.

## Hardware Failures: When It's Beyond Software

If you've tried the resets above and your screen is still black, you might be dealing with a hardware issue. The most common culprit is the **display cable**, which can become loose or damaged, especially if your MacBook has been moved around frequently or dropped. Another possibility is the display itself failing internally, or occasionally, the **logic board** is sending no signal to the screen.

These aren't things you should attempt to fix yourself unless you're experienced with electronics. Opening a MacBook incorrectly can cause further damage, and the components are delicate. A professional diagnosis is really the safest route at this point.

## When to Seek Professional Help

If the screen remains black after trying the SMC and NVRAM resets, it's time to bring your MacBook in for proper diagnosis. A technician can run hardware diagnostics to pinpoint exactly what's wrong, whether it's a display cable, a failing screen, or something deeper like logic board damage.

The team at **ZA Support** in Hyde Park can run a complete diagnostic from just R599, which is often less than you'd pay for a replacement cable that might not even be the problem. We see this issue regularly and can usually identify the cause within a few minutes. If you're in Johannesburg or the surrounding areas, like Sandton, Rosebank, Fourways, Bryanston, Midrand, or Randburg, we also offer a **collection service**, so you don't even need to bring your MacBook in yourself.

A **black screen on startup** feels serious, but it often isn't. Start with the free resets at home, and if those don't work, get a professional opinion quickly. The longer you wait, the more you risk using a machine that might have minor damage that could worsen. Get in touch with ZA Support via WhatsApp on 064 529 5863 to arrange a diagnostic appointment today.`,
  },

  'liquid-damage-macbook-johannesburg-cost': {
    slug: 'liquid-damage-macbook-johannesburg-cost',
    title: `How Much Does MacBook Liquid Damage Repair Cost in Johannesburg?`,
    excerpt: `Spilled something on your MacBook? Here is an honest guide to liquid damage repair costs in Johannesburg and what factors affect the price.`,
    date: '21 March 2026',
    category: 'Pricing',
    readTime: '4 min read',
    author: 'ZA Support',
    content: `# MacBook Liquid Damage Repair Cost in Johannesburg

If you've just spilled water, coffee, tea, or any other liquid on your MacBook, the first thing you're wondering is probably how much it's going to cost to fix. The honest answer is that it depends on several factors, but understanding what those factors are will help you know what to expect before you book in for a repair. Liquid damage is one of the most common issues we see at ZA Support in Hyde Park, and whilst it can seem catastrophic in the moment, most MacBooks can be salvaged with the right treatment.

## Why Liquid Damage Is More Expensive Than You'd Expect

Repairing a MacBook that's been exposed to liquid isn't simply a matter of drying it out and switching it back on. When liquid seeps into your MacBook, it can damage multiple components across the machine. The motherboard, battery, trackpad, keyboard, and display can all be affected depending on how much liquid got in and where it went.

The reason liquid damage repairs cost more than other issues is because the repair process is thorough and time-consuming. We need to disassemble your MacBook carefully, assess each component for corrosion or short-circuiting, clean affected areas with specialised equipment, and replace any parts that are beyond repair. This is delicate work that prevents further damage and ensures your MacBook actually works reliably afterwards.

## The Assessment Fee and What It Covers

When you bring your MacBook to ZA Support with suspected liquid damage, we start with a proper assessment. The assessment fee starts from R599, and this gives us a clear picture of what's happened inside your machine. During this assessment, we'll identify which components have been damaged and provide you with an honest quote for the full repair.

This fee is worth paying because it means you won't get any surprises when you receive your repair quote. You'll know exactly what needs to be fixed and how much it will cost before we go ahead with any work. Many people are relieved to find out their damage is less severe than they feared, whilst others decide to replace their machine if the costs are significant.

## What Affects the Price of Your Repair

Several factors will influence the final cost of your liquid damage repair. The **age and model of your MacBook** matters considerably, as older models may require harder-to-source replacement parts. A liquid damage repair on a 2015 MacBook Air will typically cost less than the same damage on a new M3 MacBook Pro, simply because the parts are less expensive.

The **extent of the damage** is the biggest price driver. If liquid only touched the keyboard and trackpad, you might be looking at a replacement keyboard and some cleaning work, which would cost considerably less than if the liquid reached the motherboard and logic board. Deep liquid damage that requires component-level repairs can run into several thousand Rands.

The **type of liquid** also plays a role. Water damage is generally less destructive than sugary drinks or salt water, which leave behind corrosive residues that damage circuits more severely. Alcohol-based liquids like spirits fall somewhere in between.

## Typical Repair Cost Ranges

For a straightforward keyboard and trackpad replacement due to liquid exposure, you might spend between R1,500 and R3,500 depending on your MacBook model. If the damage extends to the battery or requires motherboard cleaning and component replacement, costs can range from R4,000 to R8,000 or more.

Serious liquid damage affecting the logic board of a newer MacBook can sometimes exceed R10,000, which is when some customers decide that replacing their machine makes more financial sense. This is a conversation worth having with a technician who can give you honest advice.

## What You Should Do Right Now

If your MacBook has just been exposed to liquid, switch it off immediately if it's still on. Don't try to dry it with heat, and don't keep turning it on and off to check if it still works. Simply power it down and bring it to us as soon as possible. The sooner we can assess and clean it, the better the chances of a successful repair with minimal component loss.

## Getting Your MacBook Assessed in Johannesburg

If you're in the Johannesburg area and need an honest assessment of your liquid damage repair costs, ZA Support is here to help. We're based in Hyde Park and offer a collection service if you're in surrounding areas like Sandton, Rosebank, Fourways, Bryanston, Midrand, or Randburg, so you don't have to worry about getting your damaged MacBook to us.

Contact us on WhatsApp at 064 529 5863 to arrange your assessment. We'll give you a clear picture of what's happened and exactly what the repair will cost before we proceed with any work.`,
  },

  'when-to-replace-vs-repair-macbook': {
    slug: 'when-to-replace-vs-repair-macbook',
    title: `MacBook Repair vs Replace — How to Make the Right Decision`,
    excerpt: `Should you repair your MacBook or buy a new one? Here is a practical framework for making that decision based on repair cost, age, and performance.`,
    date: '21 March 2026',
    category: 'Advice',
    readTime: '4 min read',
    author: 'ZA Support',
    content: `# MacBook Repair vs Replace — How to Make the Right Decision

When your MacBook stops working properly, the question isn't just "what's wrong with it?" but "is it worth fixing?" That calculation depends on repair costs, how old your machine is, and whether it still meets your needs. Making the right decision here can save you thousands of Rands or point you towards a better long-term investment. We'll walk you through a practical framework to help you decide.

## The Three Questions You Need to Answer First

Before you even phone a repair shop, ask yourself three things. First, how old is your MacBook? Machines from the last three to four years are usually worth repairing if the problem isn't catastrophic. Second, what exactly is broken? A cracked screen is often repairable at reasonable cost, whilst logic board failure is far more serious. Third, do you actually need this machine, or have you been thinking about upgrading anyway?

These questions matter because they frame everything that follows. A newer MacBook with a broken keyboard is an easy repair decision. A ten-year-old MacBook with a failing battery might be a sign to move on.

## Understanding the True Cost of Repair

Repair costs vary wildly depending on what needs fixing. A screen replacement on a MacBook Air might run R2,500 to R4,500. Battery replacement typically costs between R1,200 and R2,000. Logic board repairs or data recovery work can easily exceed R3,000 to R6,000 or more.

The first step is always an honest assessment of what you're facing. At ZA Support, we charge from R599 for a diagnostic assessment, which tells you exactly what's broken and what the repair will cost. Once you know the actual figure, you can make an informed decision rather than guessing.

## The Age and Depreciation Factor

A MacBook purchased three years ago still has real value and useful life ahead. Machines from five to seven years ago are in a grey zone: they may still work well for everyday tasks, but repairs become more expensive relative to remaining usefulness. Once you're looking at MacBooks that are eight years or older, repair costs often don't make financial sense unless the issue is minor.

Think about it this way. If your eight-year-old MacBook needs a R4,000 screen repair, you're spending a lot of money on a machine with limited resale value and potentially limited time left. A newer MacBook might cost R6,000 to R8,000 more than the repair, but it'll last you another four to five years and hold its value better.

## Performance Needs Matter More Than You Think

Some of us use our MacBooks for email and web browsing. Others rely on them for video editing, design work, or software development. Your actual use case shifts the equation significantly.

If you do basic work, a four-year-old MacBook still performs beautifully for most tasks. Repairing it makes sense. If you do demanding creative work, that same machine might feel slow even if nothing is technically broken. In this case, upgrading could boost your productivity enough to justify the cost. You need to be honest about whether the machine still serves your actual needs, not just whether it turns on.

## When Repair Makes Sense

You should repair your MacBook when the fault is isolated and not too expensive relative to the machine's value. A water-damaged keyboard on a 2021 MacBook Pro, for example, is definitely worth fixing. A cracked screen on a machine that's two to three years old is also a straightforward decision.

You should also repair when you're attached to the machine for workflow reasons. If you've got specific software configurations, files, and settings that matter to you, the hassle of moving everything to a new computer can justify a repair that might otherwise seem marginal.

## When Replacement Makes Sense

Replace your MacBook if repair costs exceed 50 percent of what a new model would cost, unless the machine is very recent. Replace it if the same issue has recurred multiple times in the past year. Replace it if you're using a machine that's significantly older and the repair feels like throwing good money after bad.

Also consider replacement if you find yourself frustrated with performance regularly. That frustration is real, and your time is valuable.

## Getting the Right Answer for Your Situation

The decision between repair and replacement isn't always obvious, which is why getting professional advice matters. When you're in Johannesburg and facing this choice, bring your MacBook to ZA Support in Hyde Park for a proper assessment. We'll tell you exactly what's wrong and what it costs to fix, and we'll give you honest advice about whether repair or replacement makes sense for your situation.

If you're in areas like Sandton, Rosebank, Fourways, Bryanston, Midrand, or Randburg, we offer a collection service, so you don't need to bring it in yourself. Get in touch on WhatsApp at 064 529 5863 to arrange a diagnostic appointment. Once you know the real costs and options, making the right decision becomes much easier.`,
  },

  'macbook-ssd-upgrade-johannesburg': {
    slug: 'macbook-ssd-upgrade-johannesburg',
    title: `MacBook SSD Upgrade in Johannesburg — Speed Up Your Mac Without Buying New`,
    excerpt: `An SSD upgrade is the most effective way to speed up an older MacBook. Here is how it works, which models are upgradeable, and what it costs.`,
    date: '21 March 2026',
    category: 'Upgrades',
    readTime: '4 min read',
    author: 'ZA Support',
    content: `# MacBook SSD Upgrade in Johannesburg — Speed Up Your Mac Without Buying New

If your MacBook feels slower than it used to, an SSD upgrade might be exactly what you need. Whether your Mac is taking forever to boot, applications are sluggish, or you're constantly running out of storage space, a solid-state drive upgrade can breathe new life into your machine for a fraction of the cost of replacing it. We'll walk you through what you need to know about MacBook SSD upgrades in Johannesburg, including which models qualify, the performance gains you can expect, and what the process actually costs.

## How Much Faster Will Your MacBook Be?

The difference between an old hard drive or a nearly-full SSD and a fresh, modern solid-state drive is genuinely dramatic. Many users notice their MacBook boots up in 15-20 seconds instead of 60 or more. Applications launch immediately rather than hanging on the loading screen. File transfers, video editing, and daily multitasking all feel noticeably smoother. If you've been considering buying a new MacBook because your current one feels sluggish, an SSD upgrade often delivers 80% of the perceived benefit at 10-15% of the cost.

The speed improvement comes down to access time. Traditional spinning hard drives are mechanical, so they need time to physically locate and read data. Modern NVMe SSDs have no moving parts and can access data almost instantly. This is why older MacBooks with failing drives or drives nearing capacity feel like a completely different machine after an upgrade.

## Which MacBook Models Can Be Upgraded?

Not every MacBook has an upgradeable SSD, and this is important to understand before you get your hopes up. Apple has made this choice deliberately over the years, and the options depend on your model and year of manufacture.

Most Intel-based MacBooks and older MacBook Pro models from 2012 through 2015 have upgradeable SSDs. If you own a MacBook Air from 2013-2017 or a MacBook Pro from 2012-2015, you're likely in good shape. However, newer models, particularly those from 2016 onwards, have soldered storage that cannot be upgraded. The same applies to all Apple Silicon MacBooks, including the newer M1, M2, M3, and M4 models.

The easiest way to know whether your MacBook qualifies is to check the model identifier. You can find this by clicking the Apple menu, selecting "About This Mac," and looking at the "Model Identifier" field. Our team at ZA Support can tell you in seconds whether your machine is upgradeable, so don't hesitate to get in touch if you're unsure.

## What Does a MacBook SSD Upgrade Cost?

The total cost of an SSD upgrade depends on the capacity you choose and whether you need professional installation. A modern 512GB SSD suitable for older MacBooks typically costs R1,500 to R3,000, while larger 1TB drives run R2,500 to R5,000. If you're comfortable opening your MacBook yourself, the component alone is your only expense.

Most people, however, prefer professional installation. This protects your warranty, ensures the job is done correctly, and means you don't risk damaging internal components or voiding AppleCare agreements. At ZA Support, our SSD installation service includes labour, the new drive, and data migration assistance. We start with an assessment fee from R599 to evaluate your specific machine and provide an accurate quote. From there, a complete SSD upgrade typically costs between R2,000 and R5,000 all-in, depending on the capacity and your MacBook model.

## The Upgrade Process Explained

Installing a new SSD involves opening the MacBook, removing the old drive, and installing the new one in its place. It's a straightforward task for technicians but requires careful handling and anti-static precautions. The process itself takes 30-45 minutes. Data migration can happen either before removal, by cloning the old drive to the new one, or afterwards, by restoring from a Time Machine backup.

Many people worry about losing their files during an upgrade. The good news is that professional technicians handle data migration as part of the service, so everything stays intact. Your applications, settings, photos, and documents all transfer seamlessly to the new drive.

## Getting Your MacBook SSD Upgrade in Johannesburg

If you've decided an SSD upgrade is right for your MacBook, ZA Support is here to help. We've installed hundreds of new drives in older MacBooks and can advise you on whether your specific model qualifies. If it does, we'll provide a fixed quote before proceeding, handle the installation professionally, and make sure your data is safe throughout the process.

We offer collection and drop-off services too, so if you're based in Sandton, Rosebank, Fourways, Bryanston, Midrand, or Randburg, we can collect your MacBook at a time that suits you. Simply WhatsApp us on 064 529 5863 with your MacBook model and serial number, and we'll confirm whether an upgrade is possible and provide a quote. Our team in Hyde Park, Johannesburg is ready to get your Mac running like new again.`,
  },

  'imac-repair-johannesburg': {
    slug: 'imac-repair-johannesburg',
    title: `iMac Repair in Johannesburg — Screen, RAM, SSD, and Logic Board`,
    excerpt: `iMac not turning on, slow, or showing a distorted display? Here is what iMac repairs involve and what is worth fixing vs replacing.`,
    date: '21 March 2026',
    category: 'Repairs',
    readTime: '4 min read',
    author: 'ZA Support',
    content: `# iMac Repair in Johannesburg — Screen, RAM, SSD, and Logic Board

Your iMac has always been reliable, but now something's wrong. The screen has gone fuzzy, it's running like a slow computer, or worse, it won't start at all. Before you assume it's time to replace the whole machine, it's worth understanding what's actually broken and whether a repair makes financial sense.

At ZA Support in Hyde Park, we've been fixing iMacs for years and we've seen every problem imaginable. Some repairs cost under R2,000 and breathe new life into your machine. Others are expensive enough that you should seriously consider upgrading. This guide walks you through the most common iMac issues in Johannesburg and what you can realistically expect.

## iMac Screen and Display Issues

One of the most obvious signs of trouble is a broken or distorted display. Your iMac might show lines, discolouration, complete darkness, or a flickering image. The frustrating part is that the problem could be the screen itself or the logic board driving it, and you won't know until someone opens it up.

**External display test first.** Plug an external monitor into your iMac's USB-C or Thunderbolt port. If the external display works perfectly, your iMac itself is fine and only the built-in screen needs replacing. If the external monitor also shows problems, you're likely looking at a logic board fault instead.

A built-in iMac screen replacement typically costs between R3,500 and R6,500 depending on the model and screen type. Logic board repairs are more expensive and more risky, sometimes costing R8,000 or more. This is where an honest assessment becomes critical. For older iMacs, these repairs might not justify the cost of the whole machine.

## RAM and Performance Problems

If your iMac has slowed to a crawl, opens applications painfully slowly, or freezes regularly, RAM is often the culprit. The good news is that RAM upgrades or replacements are straightforward and affordable.

Start by checking how much RAM you're actually using. Open Activity Monitor (search for it in Spotlight), click the Memory tab, and look at the "Memory Pressure" graph. If it's in the yellow or red zone, you need more RAM. Many older iMacs shipped with 8GB, which isn't enough for modern Mac users juggling browsers, design software, or video work.

Upgrading from 8GB to 16GB costs around R1,200 to R2,500 depending on your iMac model, and you'll feel the difference immediately. This is one of the most cost-effective repairs you can make. For newer iMacs where RAM is soldered to the board, unfortunately, this upgrade isn't an option, but older models like the 27-inch iMac from 2013 to 2017 can be upgraded easily.

## SSD Problems and Storage

Modern iMacs come with solid state drives instead of traditional hard drives, which is faster but also means replacement requires more care. A failing SSD shows up as spinning wheels, kernel panics, or the Mac refusing to start up at all.

Before assuming your SSD is broken, restart your iMac and hold Command + S to boot into single-user mode. Run the **fsck** command by typing fsck -fy at the prompt. This can sometimes fix minor file system errors without a full drive replacement.

If that doesn't work, your SSD probably needs replacing. Costs vary from R2,000 to R5,000 including labour and a fresh installation of macOS, depending on the storage capacity you choose. This is worth doing on any iMac that's otherwise healthy. A new SSD can make a five-year-old machine feel brand new again.

## Logic Board Failures

The logic board is the heart of your iMac, and when it fails, you're facing the most expensive repair. Signs include the Mac not turning on at all, freezing constantly, strange behaviour with external devices, or problems that don't fit any other category.

Logic board repair is complex and sometimes impossible. Components can fail due to heat damage, liquid damage, or just age. Repair costs start at R4,000 for diagnosis and can exceed R10,000 for replacement. Honestly, if your iMac is over seven years old and the logic board is failing, you should seriously consider buying a new machine instead.

## When to Repair vs When to Replace

Here's the practical truth: if your iMac is under six years old and the repair costs less than R6,000, it's usually worth fixing. If it's older than that or the repair costs more than half the value of a replacement Mac, walk away.

## Get Your iMac Checked by ZA Support

If you're in Johannesburg and unsure what's wrong with your iMac, an honest assessment is the first step. We charge from R599 for a full diagnosis, and we'll tell you exactly what's broken and whether repair or replacement makes sense for your situation.

We're based in Hyde Park and we offer a collection service if you're in Sandton, Rosebank, Fourways, Bryanston, Midrand, or Randburg. Get in touch on WhatsApp at 064 529 5863 and we'll walk you through your options.`,
  },

  'macbook-speaker-not-working': {
    slug: 'macbook-speaker-not-working',
    title: `MacBook Speaker Not Working? Here Is What to Check`,
    excerpt: `No sound from your MacBook speakers? Before paying for a repair, here are the software and hardware checks worth running first.`,
    date: '21 March 2026',
    category: 'Troubleshooting',
    readTime: '4 min read',
    author: 'ZA Support',
    content: `# Blog Post Body

There's nothing quite like the moment you realise your MacBook speakers aren't working. You press play on your favourite song, open a video call, and... silence. Before you assume you need an expensive repair, there are several straightforward checks you can run yourself. Most MacBook speaker issues are software-related and easily fixed at home with a few minutes of troubleshooting.

## Check Your Volume Settings First

The most obvious culprit is often overlooked. Look at the top-right corner of your menu bar and click the **volume icon**. If you see a speaker with a line through it, your volume is muted. Simply click the icon and drag the slider to increase the volume. You should also check whether the volume is simply turned down very low. While you're there, make sure you haven't accidentally enabled **Do Not Disturb mode**, which silences notifications and can affect system sounds.

Next, open **System Settings** and navigate to **Sound**. Check that **Output volume** is set above zero and that **Mute** is not enabled. Take a moment to look at the list of available output devices. If your MacBook is connected to external speakers or a Bluetooth device, it may be routing audio there instead of the built-in speakers. Select **Internal Speakers** from the dropdown menu to redirect sound.

## Restart Core Audio

Sometimes macOS gets confused about audio settings, and the best fix is to restart the audio system itself. You can do this by opening **Activity Monitor**, which lives in your **Applications/Utilities** folder. Search for **coreaudiod** in the search bar. When you find it, click **Force Quit**. The system will automatically restart this process within seconds, and often this clears audio glitches. This is a safe operation that experts recommend regularly for persistent sound issues.

## Check Your App Settings

Audio problems aren't always system-wide. Your MacBook speakers might work fine for one app but fail in another. Open **System Settings**, head to **Privacy & Security**, and scroll down to **Microphone and Speaker**. Check whether the specific app causing problems has permission. Some applications also have their own audio settings buried in their preferences, so don't skip checking the app's menu before assuming it's a hardware fault.

If you're experiencing issues during video calls, check **System Settings > Sound > Input** as well. Sometimes microphone and speaker problems come together. The webcam and microphone are separate from speakers, so a speaker problem won't affect calls, but it's worth ruling out related audio issues while you're investigating.

## Test Different Audio Sources

Try playing sound from multiple sources to narrow down the problem. Play music from a streaming app, watch a YouTube video, and test your notification sounds. If sound works from some sources but not others, the issue is likely confined to a specific app rather than your hardware. Restarting the problematic app usually solves this.

Connect a pair of wired headphones or external speakers to your MacBook. If audio works through external devices but not the built-in speakers, you're looking at a hardware issue. If nothing produces sound through any device, the problem is almost certainly software, and you've got more troubleshooting options available before considering a repair.

## When Hardware Is the Culprit

If you've worked through all these steps and your MacBook speakers still aren't working, you're likely dealing with a **hardware fault**. Liquid damage, a failed speaker component, or a loose internal connection can all prevent sound production. These issues require professional attention.

At **ZA Support in Hyde Park**, we diagnose and repair MacBook audio problems regularly. Our assessment fee starts from **R599**, and we can often identify the exact issue within an hour. If you're across the wider Johannesburg area, we offer a **collection service** for clients in Sandton, Rosebank, Fourways, Bryanston, Midrand, and Randburg, so you don't need to travel with your MacBook.

If you've completed these troubleshooting steps without success, it's time to get professional eyes on your device. **WhatsApp us on 064 529 5863** to book an assessment or arrange a collection. We'll get you back to enjoying your MacBook with sound again.`,
  },

  'airpods-repair-johannesburg': {
    slug: 'airpods-repair-johannesburg',
    title: `AirPods Repair in Johannesburg — What Can Actually Be Fixed`,
    excerpt: `AirPods battery dead, one side not working, or sound quality degraded? Here is what AirPods repairs are possible and what it costs in Johannesburg.`,
    date: '21 March 2026',
    category: 'Repairs',
    readTime: '4 min read',
    author: 'ZA Support',
    content: `# AirPods Repair in Johannesburg — What Can Actually Be Fixed

Your AirPods stopped charging, one side has gone silent, or the sound just isn't what it used to be. Before you resign yourself to buying a new pair, it's worth knowing what repairs are actually possible. The good news is that many AirPods issues can be fixed, and in Johannesburg, you have options that don't involve sending your earbuds halfway across the world.

## Battery problems are the most common repair

Dead AirPods batteries are by far the most frequent issue we see at ZA Support. If your AirPods won't hold a charge or drain within minutes of use, the battery inside the earbud or charging case has likely degraded. This is completely normal after a couple of years, since lithium batteries degrade with each charge cycle.

The good news is that **AirPods battery replacement** is straightforward and affordable. A single earbud battery replacement typically costs around R799 to R999, depending on your AirPods model. If both earbuds need new batteries, expect to pay roughly double. The charging case battery is usually in the R599 to R799 range. The entire process takes just a few hours, so you won't be without your earbuds for long.

## One side not working, but the other is fine

This is frustrating, but it's almost always fixable. When one AirPod suddenly stops producing sound or connecting properly, the problem is usually either a dead battery in that earbud or a connectivity issue. If the battery is the culprit, replacement costs are the same as above.

Sometimes the issue is something simpler, though. Try resetting your AirPods by holding the setup button on the back of the case for 15 seconds until the light flashes amber and white. This clears the pairing and often fixes mysterious connectivity problems. If that doesn't work, the earbud might need professional diagnostics to identify whether it's a battery, speaker, or internal component failure.

## Sound quality and audio issues

If your AirPods still work but the sound has become tinny, distorted, or noticeably quieter, several things could be happening. The most common cause is simply earwax and debris buildup on the speaker mesh, which is easily cleaned without opening the earbud. Try gently brushing the speaker area with a dry, soft-bristled toothbrush or using a slightly damp cotton swab. Let them dry completely before using them again.

If cleaning doesn't help, the speaker driver inside may be failing, which requires replacement. Speaker repairs typically cost between R1,199 and R1,599 per earbud. You might also have a firmware or connectivity issue, which should be ruled out before investing in hardware repairs. This is where a professional assessment becomes valuable.

## Water damage and physical damage

AirPods are water resistant, but not waterproof. If they've been submerged or exposed to heavy moisture, corrosion can develop inside the charging contacts or electronic components. This isn't always immediately obvious, either. Your AirPods might work for a few days before failing completely.

If you've dropped them or sat on them and there's visible damage to the case, repairs become more complicated. Cracked cases are difficult to repair and replacement cases can be pricey. However, if the actual earbud components are intact, they may still be functional. Physical damage requires a proper inspection to determine whether repair makes financial sense.

## Charging case problems

Your AirPods earbuds might be perfectly fine, but the case won't charge them. In many cases, this is a battery issue in the case itself. The charging contacts can also accumulate corrosion or debris, which blocks the charging connection. Before assuming the worst, clean the metal charging contacts on both the case and the earbuds using a dry cloth or slightly damp cotton swab.

If the case battery has failed, replacement is usually the most practical solution. Some case problems, like a stuck charging port, can sometimes be repaired, but you'll need to have it assessed by someone experienced with AirPods hardware.

## Getting your AirPods assessed in Johannesburg

Not every AirPods issue needs a professional, but knowing exactly what's wrong before you decide whether to repair or replace is sensible. ZA Support offers **AirPods assessments from R599**, which gives you a clear diagnosis and repair quote before you commit to anything.

We're located in Hyde Park and serve the greater Johannesburg area. If you're in Sandton, Rosebank, Fourways, Bryanston, Midrand, or Randburg, we offer a collection service, so you don't even need to make a trip. Get in touch via WhatsApp on 064 529 5863 to arrange a collection or book an appointment. Most AirPods repairs can be completed within 24 hours, so you'll be back to your music quickly.`,
  },

  'macbook-wifi-keeps-disconnecting': {
    slug: 'macbook-wifi-keeps-disconnecting',
    title: `MacBook Wi-Fi Keeps Disconnecting — How to Fix It`,
    excerpt: `MacBook dropping Wi-Fi connection regularly? Here are the common causes from software settings to failed Wi-Fi cards, and how to fix each one.`,
    date: '21 March 2026',
    category: 'Troubleshooting',
    readTime: '4 min read',
    author: 'ZA Support',
    content: `# MacBook Wi-Fi Keeps Disconnecting — How to Fix It

If your MacBook keeps dropping its Wi-Fi connection every few minutes, you're not alone. This frustration affects plenty of Mac users, and the good news is that the cause is usually something you can either fix yourself or get sorted quickly. The problem might be as simple as a software setting, or it could point to a hardware issue with your Wi-Fi card. Either way, we'll walk you through what to try first before you need professional help.

## Check Your Wi-Fi Router First

Before blaming your MacBook, spend a moment on your router. Restart it by unplugging the power cable for 30 seconds, then plug it back in and wait for it to fully restart. This fixes the majority of temporary connection dropouts.

While you're at it, check whether other devices in your home are also losing connection. If your phone, tablet, or another laptop can't stay connected either, the problem is almost certainly your router or internet provider, not your Mac. In that case, contact your ISP or consider whether your router is old enough to need replacing.

If only your MacBook is having trouble, you're looking at a MacBook-specific issue. Move on to the next steps.

## Forget and Reconnect to Your Network

Sometimes macOS holds onto outdated or corrupted network information, which causes it to drop the connection repeatedly. The fix is simple: forget the network and reconnect to it fresh.

Go to System Settings, then Network, and select Wi-Fi. Click on your network name and choose "Forget This Network". Once you've done that, select the same network again from the available networks list and re-enter your password. This clears out any corrupted settings and often solves connection dropouts immediately.

Give it a few hours of normal use before deciding whether this worked. Occasionally the problem takes a little time to reveal itself again.

## Update macOS and Restart Your Mac

Software updates from Apple often include Wi-Fi stability improvements, so check whether your MacBook is fully up to date. Go to System Settings, select General, then Software Update. Install any available updates and restart your Mac afterwards.

Even if there are no updates available, a simple restart of your Mac can solve stubborn Wi-Fi dropouts. Shut down completely, wait 10 seconds, then power back on. This clears your Mac's memory and resets network connections, which is surprisingly effective.

## Disable Wi-Fi Interference and Power Saving

Your Mac has a few power-saving settings that can interfere with Wi-Fi stability. In System Settings under Network, click Wi-Fi Settings, then Advanced. Look for any options related to low power mode or Wi-Fi power saving, and make sure these are disabled.

Also check whether you have Bluetooth devices nearby. Although Bluetooth and Wi-Fi operate on different frequencies, they can sometimes interfere with each other, particularly if you have multiple devices connected at once. Try disabling Bluetooth temporarily to see whether your Wi-Fi becomes more stable.

## When It's Your Wi-Fi Card

If you've worked through all the software fixes above and your MacBook still keeps disconnecting, the issue is likely a failing **Wi-Fi card**. This is a small piece of hardware inside your Mac that handles wireless connections, and unfortunately it can wear out or fail, particularly in older MacBooks.

Signs of a failing Wi-Fi card include connection dropouts that happen regardless of which network you're on, weak signal strength even when you're close to the router, and problems that started suddenly without any recent software changes. If you're seeing these patterns, you need professional help to replace the card.

MacBook Wi-Fi cards cost between R1,500 and R3,500 depending on your model, plus labour. It's not something to attempt yourself unless you're experienced with MacBook repairs, as the hardware sits deep inside your machine.

## Get Your MacBook Checked in Hyde Park

If you've tried the software fixes above without success, the next step is a proper diagnosis. At **ZA Support in Hyde Park, Johannesburg**, we can run a full diagnostic on your MacBook to identify whether it's a software issue or a hardware problem like a failing Wi-Fi card. Our assessment fee starts from R599, and we'll give you honest advice about whether repair is worth it for your model.

If you're based in Sandton, Rosebank, Fourways, Bryanston, Midrand, or Randburg, we also offer a collection service, so you don't have to bring your MacBook in yourself. Get in touch via WhatsApp on 064 529 5863 to arrange a time that suits you.

A MacBook that keeps disconnecting is annoying, but it's usually fixable. Whether it's a quick settings change or a Wi-Fi card replacement, we're here to help.`,
  },

  'macbook-logic-board-symptoms-johannesburg': {
    slug: 'macbook-logic-board-symptoms-johannesburg',
    title: `MacBook Logic Board Failure — 8 Warning Signs You Should Not Ignore`,
    excerpt: `Logic board failure is the most serious MacBook fault. These are the warning signs that suggest your MacBook logic board is failing.`,
    date: '21 March 2026',
    category: 'Troubleshooting',
    readTime: '4 min read',
    author: 'ZA Support',
    content: `# MacBook Logic Board Failure — 8 Warning Signs You Should Not Ignore

If your MacBook has stopped responding, won't turn on, or keeps crashing without explanation, you might be facing **logic board failure**. The logic board is your MacBook's brain, and when it fails, virtually nothing works. The bad news is that it's the most serious fault a Mac can develop. The good news is that catching the early warning signs can sometimes save your machine and your wallet.

## Understanding the Logic Board and Why It Fails

Your MacBook's logic board is a complex circuit board that controls every function, from powering on to running your applications. It contains thousands of tiny components and circuitry that can fail due to liquid damage, heat stress, manufacturing defects, or age. When the logic board starts to fail, your Mac typically shows warning signs before it stops working entirely.

Logic board failure is not always sudden. In many cases, your MacBook will send you signals that something is wrong. Recognising these signals early means you might catch the problem before complete failure occurs, potentially saving the board from further damage.

## Warning Sign 1: Your MacBook Won't Power On or Dies Immediately

This is the most obvious sign, but it doesn't always mean logic board failure. However, if your Mac won't turn on even when plugged in, and you've checked the power adapter, this could indicate a serious problem. Try resetting the SMC (System Management Controller) first, as this sometimes resolves power issues.

If your MacBook powers on for a few seconds then shuts down without reason, especially if this happens repeatedly, the logic board may be failing. The board might be drawing too much power or shutting down to protect itself from damage.

## Warning Sign 2: Unexpected Restart Loops and Kernel Panics

When your MacBook restarts randomly or displays a message saying it needs to restart, kernel panic has occurred. This suggests the operating system has detected a critical hardware failure it cannot recover from. Whilst software can sometimes cause this, repeated kernel panics often point to logic board issues.

Pay special attention if you see the same crash every time you perform a specific action, like opening a particular application or connecting an external device. This pattern can help identify whether the problem is genuinely the logic board or something more straightforward.

## Warning Sign 3: Freezing, Spinning Wheel, and Sluggish Performance

Your MacBook feels like it's moving through treacle, with the beach ball spinning constantly. Logic board failure can cause performance to degrade significantly as damaged components struggle to function. The machine might work for a few minutes then freeze completely.

This warning sign is tricky because slow performance can have many causes: full storage, malware, or failing hard drives. Before concluding it's the logic board, restart your Mac in Safe Mode and run Disk Utility's First Aid. If the problem persists, the logic board may be the culprit.

## Warning Sign 4: Physical Damage, Heat, or Burning Smells

Water damage is the number one cause of logic board failure. If your MacBook has been exposed to liquid, even if it seemed fine afterwards, internal corrosion may be progressing silently. Similarly, if your Mac runs extremely hot or you notice a burning smell near the vents, the logic board may have shorted circuits.

Do not attempt to use your MacBook if you notice burning smells or detect heat coming from the logic board area. Shut it down immediately and leave it off. Continuing to use it can cause further damage and potentially pose a safety risk.

## Warning Sign 5: No Fan Noise and No Response to Any Input

If your MacBook is completely unresponsive, won't turn on, has no fan noise, and doesn't respond to keyboard or trackpad input, the logic board has likely failed entirely. At this stage, the problem is beyond DIY fixes.

One last thing to try: connect your MacBook to a known-working power adapter and leave it plugged in for 30 minutes. Sometimes a completely drained battery can mimic logic board failure. If nothing changes, professional help is necessary.

## When to Seek Professional Help

Logic board repair is not a DIY task. You cannot fix a failed logic board at home, and attempting to do so can cause irreversible damage. **Professional diagnosis is essential** because multiple issues can produce similar symptoms, and only experienced technicians with proper diagnostic equipment can identify the exact problem.

If you're in Johannesburg and your MacBook shows any of these warning signs, **ZA Support can help**. We offer **logic board diagnostics and repair** with an assessment fee starting from R599. We understand how frustrating this situation is, especially when you rely on your MacBook for work or study.

Better yet, if you're in Sandton, Rosebank, Fourways, Bryanston, Midrand, or Randburg, we offer a **collection service**. Simply WhatsApp us at **064 529 5863**, and we'll collect your MacBook, diagnose the issue, and get you a quote without the hassle of travelling to Hyde Park.

Don't wait until your logic board completely fails. If you're experiencing any of these warning signs, reach out to us today. Early diagnosis can sometimes make the difference between repair and replacement.`,
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
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://zasupport.com/blog/${slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: ['/og-image.jpg'],
    },
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
          acceptedAnswer: { '@type': 'Answer', text: 'If you have worked through the free steps — cleared storage, removed login items, reset SMC and NVRAM, checked Activity Monitor — and the Mac is still slow, the cause is likely hardware: thermal paste degradation, insufficient RAM, or a failing SSD. ZA Support offers Mac diagnosis: from R599 in Hyde Park, Johannesburg.' },
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
          acceptedAnswer: { '@type': 'Answer', text: 'Cost depends on the cause. ZA Support offers a assessment assessment — we identify the exact fault and quote before any work begins. Software fixes, hardware repairs, and logic board repairs are all quoted individually after diagnosis. Assessment: from R599. Hyde Park, Johannesburg.' },
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
          acceptedAnswer: { '@type': 'Answer', text: 'Most MacBooks from 2015 onwards are viable for repair and upgrade. The key factors are: does it support a current enough macOS for your software, is the hardware in working condition, and does the cost of the upgrade compare favourably to a replacement? ZA Support offers assessment fee (from R599)s and provides both repair and replacement options with honest recommendations.' },
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
          acceptedAnswer: { '@type': 'Answer', text: 'ZA Support\'s Health Check service includes a full 28-phase diagnostic with a plain-English report. If hardware upgrades are needed (RAM, SSD, thermal paste), we quote those separately before proceeding. Assessment: from R599 on all work. Based in Hyde Park, Johannesburg.' },
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
          acceptedAnswer: { '@type': 'Answer', text: 'On Intel MacBooks (up to approximately 2019), the WiFi/Bluetooth card is a replaceable module. On Apple Silicon MacBooks (M1 and later), the WiFi chip is integrated into the logic board and requires board-level repair. ZA Support diagnoses and replaces WiFi cards on Intel MacBooks. Contact us for a assessment fee (from R599).' },
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
          acceptedAnswer: { '@type': 'Answer', text: 'WiFi repair cost depends on the cause. ZA Support offers diagnostic assessments: from R599 — we identify the exact fault before quoting. Software fixes, WiFi card replacement, and logic board circuit repair are all quoted individually after diagnosis. Hyde Park, Johannesburg.' },
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
          acceptedAnswer: { '@type': 'Answer', text: 'ZA Support repairs MacBook surge damage at component level — significantly less than a full board replacement through authorised service. Assessment: from R599.' },
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
          acceptedAnswer: { '@type': 'Answer', text: 'Component-level logic board repair at ZA Support is significantly less than a full board swap or replacement through authorised service. Assessment: from R599. Contact us for a quote specific to your model and fault.' },
        },
        {
          '@type': 'Question',
          name: 'Can a MacBook logic board be repaired without losing data?',
          acceptedAnswer: { '@type': 'Answer', text: 'In most cases, yes. Component-level repair leaves the SSD untouched. Board replacement on Apple Silicon Macs, by contrast, requires a new SSD — meaning total data loss. This is one of the strongest reasons to choose component-level repair over board swap.' },
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
          acceptedAnswer: { '@type': 'Answer', text: 'Do not attempt to restart it repeatedly. If there was liquid exposure, do not plug in a charger. Bring it to ZA Support in Hyde Park, Johannesburg for a same-day assessment. Assessment: from R599. The faster we see it, the higher the likelihood of a full, cost-effective repair.' },
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
          acceptedAnswer: { '@type': 'Answer', text: 'warranty on parts and labour. Assessment: from R599 -- if we find a secondary issue during assessment that means we cannot complete the repair cleanly, we tell you before proceeding.' },
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
          acceptedAnswer: { '@type': 'Answer', text: 'It could be either. Connect an external monitor via USB-C or HDMI. If the external monitor works, the fault is in the display assembly or cable. If the external monitor also shows nothing, the fault is on the logic board. ZA Support performs this test during the assessment fee (from R599).' },
        },
        {
          '@type': 'Question',
          name: 'How much does MacBook screen replacement cost in Johannesburg?',
          acceptedAnswer: { '@type': 'Answer', text: 'Contact ZA Support for a quote on your specific model. Cost depends on the model, model year, and whether the repair requires a full assembly replacement or a cable repair. Assessment: from R599 with Assessment: from R599.' },
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
          acceptedAnswer: { '@type': 'Answer', text: 'On 2019 Intel MacBook Pro models, horizontal or vertical coloured lines are most commonly caused by a failing display data cable rather than a failed panel. This is a more cost-effective repair than a full assembly replacement. We test with an external monitor during the assessment fee (from R599) to confirm.' },
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
            <p className="text-[#E8F4F1] font-bold text-lg mb-2">Need a repair? Assessment: from R599.</p>
            <p className="text-[#7A9E98] mb-4">Hyde Park, Johannesburg. Assessment: from R599 on all repairs.</p>
            <a href="tel:0645295863" className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-3 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all">
              Call 064 529 5863
            </a>
          </div>

          <div className="mt-10">
            <h2 className="text-lg font-bold text-[#E8F4F1] mb-4">ZA Support Services</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: 'Logic Board Repair', href: '/logic-board-repair' },
                { label: 'Liquid Damage Repair', href: '/liquid-damage' },
                { label: 'Battery Replacement', href: '/battery-replacement' },
                { label: 'MacBook Repair', href: '/macbook-repair' },
                { label: 'iPhone Screen Repair', href: '/iphone-repair/screen' },
                { label: 'All Blog Posts', href: '/blog' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="glass-card p-3 text-center text-sm font-medium text-[#E8F4F1] hover:text-[#0FEA7A] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
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
