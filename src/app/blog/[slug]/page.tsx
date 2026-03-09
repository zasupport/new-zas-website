import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';

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

This guide covers exactly what to do in the critical window after a spill, based on 14 years of MacBook liquid damage repair in Johannesburg.

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
4. Component-level inspection under a stereo microscope
5. Power-on test after confirmed drying
6. Full diagnostic under load

The earlier we begin this process, the higher your recovery rate. Machines brought in within 2 hours of a spill have a significantly better outcome than those that arrive the following day.

## What We Cannot Recover

To be honest with you: some liquid damage is irreversible. Machines that were powered on post-spill, or that sat for several days before arriving, often have burned traces or failed chips that cannot be repaired economically.

In those cases, we will tell you clearly. Our No Fix No Fee policy means you never pay for an unsuccessful assessment.

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

After 14 years of repairing liquid-damaged iPhones, MacBooks, and iPads in Johannesburg, we have seen the consequences of this myth more times than we can count. This article explains, clearly and technically, why rice does not work — and what you should do instead.

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
After cleaning, a stereo microscope inspection identifies compromised components, burned traces, and damaged connectors that need replacement.

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

We offer free liquid damage assessments, 7 days a week. No Fix No Fee on all repairs. Call 064 529 5863.
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

- **Starter (up to 25 devices):** R 4,500/month — includes licensing, implementation, and support
- **Business (25–100 devices):** R 8,500/month — includes licensing, implementation, dedicated support
- **Enterprise (100+ devices):** Custom pricing

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

Our process starts with a free assessment: we review your current device estate, understand your compliance requirements, and design a JAMF configuration that fits your business.

Contact us on 064 529 5863 or via our contact form to book your free assessment.
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
      elements.push(<h2 key={i} className="text-2xl font-bold text-[#E8F4F1] mt-10 mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>{line.slice(3)}</h2>);
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={i} className="text-xl font-bold text-[#E8F4F1] mt-8 mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>{line.slice(4)}</h3>);
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

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://zasupport.com/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://zasupport.com/blog/${slug}` },
    ],
  };

  return (
    <>
      <SchemaOrg schema={[articleSchema, breadcrumbSchema]} />

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
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#E8F4F1] leading-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
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
            <p className="text-[#E8F4F1] font-bold text-lg mb-2">Need a repair? Free assessment, no obligation.</p>
            <p className="text-[#7A9E98] mb-4">Hyde Park, Johannesburg. No Fix No Fee on all repairs.</p>
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
