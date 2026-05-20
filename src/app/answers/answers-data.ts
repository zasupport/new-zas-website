// /answers — Q&A hub data.
// Genuinely useful customer questions, answered plainly. Calibrated to the
// conversational queries people ask AI engines and search. Value/process-led,
// not price-led (§287 disclaimer governs any pricing). No competitor names.

export interface AnswerCluster {
  slug: string;
  shortTitle: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  relatedService: { label: string; href: string };
  faqs: { question: string; answer: string }[];
}

export const ANSWER_CLUSTERS: AnswerCluster[] = [
  {
    slug: 'logic-board-repair',
    shortTitle: 'Logic Board Repair',
    title: 'MacBook Logic Board Repair — Your Questions Answered',
    metaTitle: 'MacBook Logic Board Repair Questions Answered | ZA Support Johannesburg',
    metaDescription:
      'Clear answers to common MacBook logic board repair questions — faults, repair vs replace, turnaround and data safety. Hyde Park, Johannesburg. Call 064 529 5863.',
    intro:
      'Component-level logic board repair is what ZA Support is known for. These are the questions Johannesburg Mac owners ask us most often before booking a logic board assessment.',
    relatedService: { label: 'Logic Board Repair service', href: '/logic-board-repair' },
    faqs: [
      {
        question: 'What is a MacBook logic board and what does it do?',
        answer:
          'The logic board is the main circuit board of a MacBook — it holds the processor, memory, power management and every connection between components. If the logic board fails, the MacBook will not start, charge or run correctly, regardless of how healthy the other parts are.',
      },
      {
        question: 'How do I know if my MacBook has a logic board fault?',
        answer:
          'Common signs are a MacBook that will not power on, no charging light, random shutdowns, no display despite power, or USB and Thunderbolt ports that have stopped working. A proper diagnostic is the only way to confirm it — many of these symptoms can also come from a battery or charger fault.',
      },
      {
        question: 'Can a MacBook logic board be repaired, or does it have to be replaced?',
        answer:
          'In most cases it can be repaired. ZA Support works at component level — replacing the specific failed chip, capacitor or connector under a microscope — rather than swapping the entire board. Component-level repair is usually faster and far less expensive than a full board replacement.',
      },
      {
        question: 'How long does a logic board repair take in Johannesburg?',
        answer:
          'A logic board assessment is typically completed within one to two business days. The repair itself depends on the fault — straightforward component repairs are often done within a few days, while complex faults needing parts can take longer. You receive a written quote and timeline before any work begins.',
      },
      {
        question: 'Is it worth repairing a MacBook logic board or should I buy a new one?',
        answer:
          'For most MacBooks from the last several years, a component-level repair costs a fraction of a replacement machine and restores the device fully. We give you an honest assessment first — if a repair is not economical for your specific model, we will tell you so before you commit.',
      },
      {
        question: 'What causes MacBook logic board failure?',
        answer:
          'The most common causes are liquid contact, power surges or faulty chargers, physical impact, and component wear over time. Liquid damage is the single biggest cause we see in our Hyde Park workshop — and the faster it is treated, the more boards we save.',
      },
      {
        question: 'Will I lose my data during a logic board repair?',
        answer:
          'A logic board repair does not erase your storage. On most MacBooks the data lives on the SSD, which is separate from the components being repaired. Where a board fault risks data access, we discuss data recovery options with you before starting. We always recommend a backup where one is possible.',
      },
      {
        question: 'Do you repair logic boards on M1, M2 and M3 MacBooks?',
        answer:
          'Yes. ZA Support repairs logic boards across Intel and Apple Silicon MacBooks, including M1, M2 and M3 models. Apple Silicon boards require specialist micro-soldering equipment and experience, which is the core of what our workshop does.',
      },
      {
        question: 'What does a logic board assessment involve?',
        answer:
          'We test the board under power, measure voltages across the power rails, inspect for corrosion or damaged components under magnification, and isolate the fault. You then receive a written, fixed-price quote and a clear explanation of what failed before any repair work starts.',
      },
    ],
  },
  {
    slug: 'liquid-damage',
    shortTitle: 'Liquid Damage',
    title: 'MacBook Liquid Damage — Your Questions Answered',
    metaTitle: 'MacBook Liquid Damage Repair Questions Answered | ZA Support Johannesburg',
    metaDescription:
      'What to do after a MacBook spill — immediate steps, whether it can be saved, and how liquid damage repair works. Hyde Park, Johannesburg. Call 064 529 5863.',
    intro:
      'Liquid damage is time-sensitive. These answers cover what to do in the first minutes after a spill and how professional liquid damage repair recovers a MacBook.',
    relatedService: { label: 'Liquid Damage Repair service', href: '/liquid-damage' },
    faqs: [
      {
        question: 'What should I do immediately after spilling liquid on my MacBook?',
        answer:
          'Shut it down straight away, disconnect the charger, and do not switch it on again. Turn it upside down in a tent shape to let liquid drain away from the board, and get it to a repairer as fast as possible. The first few hours decide how much can be saved.',
      },
      {
        question: 'Can a MacBook be saved after liquid damage?',
        answer:
          'Often, yes — especially if it is brought in quickly and not powered on. The damage liquid causes is mostly from corrosion that develops over hours and days. Early professional cleaning of the board stops that corrosion and gives the best chance of full recovery.',
      },
      {
        question: 'Why should I not turn on a MacBook after a liquid spill?',
        answer:
          'Powering on a wet board sends current through paths the liquid has bridged, which can short components that were otherwise fine and turn a recoverable board into a far worse repair. The single most damaging thing after a spill is switching the MacBook on to "check if it still works".',
      },
      {
        question: 'Does putting a liquid-damaged laptop in rice work?',
        answer:
          'No. Rice may absorb a little surface moisture but it does nothing about the liquid and corrosion already inside the board, and the delay while it sits in rice lets corrosion spread. A liquid-damaged MacBook needs proper board cleaning, not a home remedy.',
      },
      {
        question: 'How long do I have to get a liquid-damaged MacBook to a repairer?',
        answer:
          'The sooner the better — ideally the same day. Corrosion begins within hours. A MacBook brought in quickly and left switched off has a much higher recovery rate than one that sat for several days or was powered on repeatedly.',
      },
      {
        question: 'What does liquid damage repair involve?',
        answer:
          'We fully disassemble the MacBook, remove the board, and clean it to lift liquid residue and corrosion. Damaged components are then repaired or replaced at component level, and the board is tested under power. You get a written assessment of what was affected before repair begins.',
      },
      {
        question: 'Will my MacBook work normally again after liquid damage repair?',
        answer:
          'In most cases a properly repaired board returns the MacBook to full normal function. The outcome depends on how much liquid reached the board, what it was, and how quickly it was treated. We give you an honest assessment of the expected result before you commit to the repair.',
      },
      {
        question: 'Does an Apple warranty cover liquid damage?',
        answer:
          'Standard Apple warranties generally do not cover accidental liquid damage. That is one reason independent component-level repair is worth considering — it can restore a liquid-damaged MacBook that would otherwise be quoted as a costly full replacement.',
      },
    ],
  },
  {
    slug: 'battery-and-screen',
    shortTitle: 'Battery & Screen',
    title: 'MacBook Battery & Screen — Your Questions Answered',
    metaTitle: 'MacBook Battery & Screen Repair Questions Answered | ZA Support Johannesburg',
    metaDescription:
      'Answers on MacBook battery health, swollen batteries, screen repair and turnaround. Hyde Park, Johannesburg. Call 064 529 5863.',
    intro:
      'Battery and screen work are the most common MacBook repairs. These answers help you tell when a repair is needed and what to expect.',
    relatedService: { label: 'Battery Replacement service', href: '/battery-replacement' },
    faqs: [
      {
        question: 'How do I know my MacBook battery needs replacing?',
        answer:
          'macOS will often show "Service Recommended" or "Replace Soon" in the battery menu. Other signs are sharply reduced runtime, unexpected shutdowns, slow performance when unplugged, or a trackpad that no longer clicks evenly — which can indicate a swelling battery underneath.',
      },
      {
        question: 'What is a healthy MacBook battery cycle count?',
        answer:
          'Most modern MacBook batteries are rated for around 1,000 charge cycles before capacity drops noticeably. You can check your current count in System Information under Power. A high cycle count combined with reduced runtime is a clear sign the battery is near the end of its life.',
      },
      {
        question: 'Is a swollen MacBook battery dangerous?',
        answer:
          'A swollen battery should be treated as urgent. The swelling puts physical pressure on the trackpad, chassis and logic board, and a swollen cell is unstable. Stop charging the MacBook, stop using it, and bring it in for assessment — continuing to use it risks both injury and board damage.',
      },
      {
        question: 'How long does a MacBook battery replacement take?',
        answer:
          'Most MacBook battery replacements are completed within a few hours, including a full charge-and-discharge calibration cycle. Apple Silicon and Retina models use adhesive-mounted cells that need careful specialist removal, which is built into the turnaround.',
      },
      {
        question: 'Can a cracked MacBook screen be repaired without replacing the whole lid?',
        answer:
          'On many models, yes. Where the glass or panel can be replaced independently we do that rather than swap the entire display assembly, which keeps the repair more affordable. The right approach depends on your specific model — the assessment confirms it.',
      },
      {
        question: 'Do you replace iPhone and iPad batteries and screens too?',
        answer:
          'Yes. Alongside MacBook work, ZA Support replaces iPhone and iPad batteries and screens at our Hyde Park workshop. iPhone battery and screen work is usually a same-visit repair; iPad work takes a little longer because the screens are adhesive-mounted.',
      },
      {
        question: 'How long will a new MacBook battery last?',
        answer:
          'A correctly fitted replacement battery should give years of normal use, similar to the original. Lifespan depends on how the MacBook is used — heavy daily charging and high-temperature environments shorten any battery’s life. We calibrate every new battery before you collect the device.',
      },
    ],
  },
  {
    slug: 'business-it-support',
    shortTitle: 'Business & Managed IT',
    title: 'Apple Business & Managed IT Support — Your Questions Answered',
    metaTitle: 'Apple Business IT Support Questions Answered | ZA Support Johannesburg',
    metaDescription:
      'How managed Apple IT support, SLAs and device management work for businesses in Johannesburg. ZA Support — Apple specialists. Call 064 529 5863.',
    intro:
      'For businesses running on Apple, ongoing managed support is very different from a once-off repair. These answers explain how ZA Support supports SMEs and enterprises.',
    relatedService: { label: 'Managed Services', href: '/managed-services' },
    faqs: [
      {
        question: 'What does Apple managed IT support include for a business?',
        answer:
          'Managed support covers your Apple devices on an ongoing basis — proactive monitoring, software and security updates, priority repairs, device management, user support and advice on new hardware. The aim is to keep the business running smoothly rather than only reacting once something breaks.',
      },
      {
        question: 'Do you offer service level agreements (SLAs) for business clients?',
        answer:
          'Yes. Business clients are supported under a service level agreement that sets out response times, what is covered, and how support is delivered. An SLA gives a business predictable IT support and a clear commitment, rather than ad-hoc help when a problem appears.',
      },
      {
        question: 'Can you support a mixed fleet of Macs, iPhones and iPads?',
        answer:
          'Yes. Most businesses run a mix of Macs, iPhones and iPads, and ZA Support manages the whole fleet as one — consistent setup, security and updates across every device, with a single point of contact for the business.',
      },
      {
        question: 'What is Apple device management (MDM) and does my business need it?',
        answer:
          'Mobile device management lets a business configure, secure and update its Apple devices centrally instead of one at a time. It is valuable once a business has more than a handful of devices, staff turnover, or data that must be protected — we advise whether it is worthwhile for your situation.',
      },
      {
        question: 'How do you handle IT support for a small business with no IT staff?',
        answer:
          'Many of our SME clients have no in-house IT person — ZA Support effectively becomes their IT department. The business gets a dedicated account manager, a clear support channel for staff, and proactive management, without the cost of a full-time hire.',
      },
      {
        question: 'Do you support businesses outside central Johannesburg?',
        answer:
          'Yes. ZA Support serves businesses across Gauteng within roughly 60 km of our Hyde Park base, including the greater Johannesburg, Sandton, Midrand and surrounding business areas. Support is delivered through a mix of remote assistance, workshop service and on-site visits.',
      },
      {
        question: 'How does ongoing managed IT support differ from once-off repairs?',
        answer:
          'A once-off repair fixes a problem after it has happened. Managed support works to prevent problems — keeping devices updated, secure and monitored — and gives priority service when something does need attention. For a business, that means less downtime and predictable monthly cost.',
      },
      {
        question: 'Can you help a business deploy or migrate new Apple devices?',
        answer:
          'Yes. ZA Support handles Apple device deployments and migrations — setting up new Macs, iPhones and iPads, transferring data, applying business settings and security, and getting staff productive quickly, whether it is a few devices or a full rollout.',
      },
    ],
  },
  {
    slug: 'medical-practice-it',
    shortTitle: 'Medical Practice IT',
    title: 'Medical Practice IT Support — Your Questions Answered',
    metaTitle: 'Medical Practice IT Support Questions Answered | ZA Support Johannesburg',
    metaDescription:
      'How managed IT support works for doctors and medical practices in Johannesburg — POPIA-aware, practice software, backups. ZA Support. Call 064 529 5863.',
    intro:
      'Medical practices have specific IT needs — patient data protection, practice software and minimal downtime. These answers explain how ZA Support supports doctors and practices.',
    relatedService: { label: 'Medical Practice IT', href: '/medical-it' },
    faqs: [
      {
        question: 'What IT support do medical practices in Johannesburg need?',
        answer:
          'A practice needs reliable devices, secure and backed-up patient data, working practice management software, and fast support when something goes wrong during consulting hours. ZA Support manages all of this so the practice can focus on patients rather than IT.',
      },
      {
        question: 'How do you keep a medical practice’s patient data POPIA-aware?',
        answer:
          'We help a practice handle patient information in line with POPIA expectations — secure device configuration, controlled access, encrypted backups and clear data handling. The practice remains the responsible party; ZA Support configures and manages the IT so it supports compliance rather than working against it.',
      },
      {
        question: 'Can you support practice management software on Apple devices?',
        answer:
          'Yes. We support practices running their management and billing software across Apple devices, including the setup, updates and troubleshooting needed to keep that software available during the working day.',
      },
      {
        question: 'Do you provide managed IT for doctors with no in-house IT team?',
        answer:
          'Most practices do not have IT staff, and that is exactly who our managed service is built for. ZA Support becomes the practice’s IT support — a clear channel for the team, proactive management of devices and backups, and a dedicated account manager.',
      },
      {
        question: 'What happens if our practice systems go down during consulting hours?',
        answer:
          'Practices are supported under a service level agreement with defined response times, so downtime during consulting hours is treated as a priority. Many issues are resolved remotely within minutes; where an on-site visit is needed, it is dispatched quickly.',
      },
      {
        question: 'Can you set up secure backups for a medical practice?',
        answer:
          'Yes. Reliable, secure backups of patient and practice data are a core part of how we support medical practices — configured so that data can be recovered quickly if a device fails, is lost, or is affected by an incident.',
      },
      {
        question: 'Do you support both Apple and Windows in a medical practice?',
        answer:
          'ZA Support specialises in Apple, and many practices run a mix of Apple devices with some Windows systems or specific medical software. We manage the practice’s environment as a whole and work with the mix the practice actually uses.',
      },
      {
        question: 'How do you onboard a new medical practice as a managed IT client?',
        answer:
          'We start with a review of the practice’s current devices, data, backups and software, agree a service level agreement, then bring everything up to a secure, well-managed standard. From there the practice has ongoing proactive support and a single point of contact.',
      },
    ],
  },
];

export function getCluster(slug: string): AnswerCluster | undefined {
  return ANSWER_CLUSTERS.find((c) => c.slug === slug);
}
