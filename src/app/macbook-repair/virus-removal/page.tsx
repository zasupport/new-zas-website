import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, CheckCircle, Star, MessageCircle, Shield, Wrench, AlertTriangle, Zap, Bug, Lock } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQ';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from '@/lib/schema';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Mac Virus & Malware Removal Johannesburg | Free Diagnosis | ZA Support',
  description:
    'Mac virus and malware removal in Johannesburg. Free diagnosis. Remove Genieo, SearchMine, MacKeeper, adware, and spyware. Mac running slow or showing pop-ups? We fix it. Hyde Park, Johannesburg.',
  alternates: { canonical: 'https://zasupport.com/macbook-repair/virus-removal' },
  keywords: [
    'mac virus removal johannesburg',
    'malware removal mac johannesburg',
    'mac running slow virus',
    'mac adware removal johannesburg',
    'remove genieo mac',
    'remove searchmine mac',
    'mac pop up virus removal',
    'macbook malware removal johannesburg',
  ],
};

const threats = [
  {
    name: 'Genieo',
    type: 'Browser Hijacker',
    risk: 'High',
    desc: 'One of the most widespread Mac infections. Genieo hijacks Safari, Chrome, and Firefox search results, redirects your homepage, and installs persistent background daemons that survive standard uninstalls. Many users have it without knowing.',
  },
  {
    name: 'SearchMine / SearchBaron',
    type: 'Browser Hijacker',
    risk: 'High',
    desc: 'Redirects all searches through searchmine.net or searchbaron.com. Hard to remove because it modifies browser profiles at the system level. Standard drag-to-trash deletion does not work — background components reinstall it.',
  },
  {
    name: 'MacKeeper',
    type: 'Potentially Unwanted App (PUA)',
    risk: 'Medium',
    desc: 'Aggressively marketed Mac "cleaner" that installs real-time scanning agents, uses excessive CPU and memory, and triggers scare notifications to push upgrades. Difficult to fully uninstall without specialist tools.',
  },
  {
    name: 'Pirrit / Crossrider',
    type: 'Adware',
    risk: 'High',
    desc: 'Injects advertising into web pages you visit — including secure banking sites. Installs as a Safari extension and a login daemon. Can intercept web traffic and serve fraudulent pages.',
  },
  {
    name: 'OSX.Shlayer',
    type: 'Trojan Downloader',
    risk: 'Critical',
    desc: 'The most commonly detected Mac malware family. Typically installed via fake Adobe Flash update pages. Downloads and installs additional adware and keyloggers in the background.',
  },
  {
    name: 'Atomic Stealer (AMOS)',
    type: 'Info Stealer',
    risk: 'Critical',
    desc: 'A newer Mac-targeting stealer that extracts saved passwords from Keychain, browser-stored credentials, and crypto wallet seed phrases. Often installed via cracked software downloads. Requires immediate response.',
  },
  {
    name: 'FlexibleFerret / Silver Sparrow',
    type: 'Persistent Agent',
    risk: 'High',
    desc: 'Background agent that calls home to a command-and-control server. Found on both Intel and Apple Silicon Macs. May install additional payloads. Often has no visible symptoms.',
  },
  {
    name: 'Adload Variants',
    type: 'Adware / Hijacker',
    risk: 'High',
    desc: 'A persistent family of adware that modifies system LaunchAgents, installs browser extensions, and periodically reinstalls itself. Active variants appear every few months with different names.',
  },
];

const symptoms = [
  { icon: <AlertTriangle className="w-5 h-5" />, title: 'Mac Running Unusually Slow', desc: 'Background malware processes consume CPU and memory. If Activity Monitor shows unknown processes using significant resources, this warrants investigation.' },
  { icon: <Bug className="w-5 h-5" />, title: 'Browser Redirects & Pop-Ups', desc: 'Searches redirect to unfamiliar sites. Pop-up windows appear even when no browser is open. Your homepage or default search engine has changed without your doing so.' },
  { icon: <AlertTriangle className="w-5 h-5" />, title: 'Fake Security Alerts', desc: 'Pop-ups warning your Mac is infected and urging you to call a phone number or download software. These are social-engineering attacks — do not call the number.' },
  { icon: <Lock className="w-5 h-5" />, title: 'Unknown Login Items', desc: 'Items appearing in System Settings → General → Login Items that you did not add. Background agents running at startup that you cannot identify or remove.' },
  { icon: <Zap className="w-5 h-5" />, title: 'Battery Draining Fast', desc: 'Malware running background tasks causes elevated CPU usage, which accelerates battery drain. If your battery life has dropped suddenly, malware is one possible cause.' },
  { icon: <Shield className="w-5 h-5" />, title: 'Antivirus Disabled or Blocked', desc: 'Some malware actively disables or quarantines security tools to prevent removal. If your security software suddenly stopped working, this is a warning sign.' },
];

const faqs = [
  {
    question: 'Can Macs actually get viruses?',
    answer: 'Yes. While macOS has strong built-in protections including XProtect, Gatekeeper, and SIP, Mac-targeting malware is a growing and well-documented problem. Adware, browser hijackers, info stealers, and trojan downloaders are all regularly discovered on macOS. The misconception that Macs cannot get viruses leads many users to ignore warning signs until the infection is significant.',
  },
  {
    question: 'How much does Mac virus removal cost in Johannesburg?',
    answer: 'Mac virus and malware removal at ZA Support starts with a free diagnosis. We give you a fixed written quote after the diagnostic — no surprises.',
  },
  {
    question: 'How long does Mac malware removal take?',
    answer: 'Most standard adware and browser hijacker removals are completed within 2–3 hours. More complex infections involving persistent LaunchAgents, modified system extensions, or rootkit-level components may require 4–6 hours. If a full macOS reinstall is the safest path (which we recommend for info stealers), we factor in data backup time and the reinstall itself — typically a same-day service.',
  },
  {
    question: 'I removed the app — why is the problem still there?',
    answer: 'Most Mac malware installs several components beyond the visible application: LaunchAgents in ~/Library/LaunchAgents/, system extensions, browser extensions, modified profile settings, and scheduled tasks. Dragging the app to Trash removes only the visible component. The background daemons remain and reinstall the app at next login. Proper removal requires identifying and removing all components — which is what we do.',
  },
  {
    question: 'Should I just wipe and reinstall macOS?',
    answer: 'For severe infections — particularly info stealers like Atomic Stealer that may have exfiltrated credentials — a clean macOS reinstall is the safest approach. We handle this as a complete service: back up your data, verify the backup, reinstall macOS fresh, restore your files, and install proper security tooling. For lighter adware infections, a targeted removal is usually sufficient without a full wipe.',
  },
  {
    question: 'What is CyberShield and should I get it after removal?',
    answer: 'CyberShield is ZA Support\'s ongoing Mac protection service. It includes real-time threat monitoring, monthly security health checks, network-level filtering to block malicious domains before they reach your browser, and alerts if new threats are detected. After a malware removal, we recommend CyberShield to prevent reinfection — contact us for plan details.',
  },
  {
    question: 'My bank account details were on the Mac — am I at risk?',
    answer: 'If you had an info-stealing infection (such as Atomic Stealer or a keylogger), credentials stored in your browser or macOS Keychain may have been compromised. In this situation, change passwords for banking, email, and any accounts you access on that Mac immediately — before bringing it in. Enable two-factor authentication on your critical accounts. We will advise further during the diagnostic.',
  },
  {
    question: 'How do I avoid getting malware on my Mac again?',
    answer: 'The most common infection vector is software downloaded outside the Mac App Store — particularly cracked apps, pirated software, and fake Adobe Flash or software update prompts. Never install software from untrusted sources. Keep macOS and all apps up to date. Use a password manager so you recognise phishing sites. Consider CyberShield for ongoing network-level protection. We cover all of this in our post-removal briefing.',
  },
];

const reviews = [
  {
    name: 'Remi T.',
    suburb: 'Fourways',
    rating: 5,
    text: 'My MacBook Pro was throwing pop-up alerts and my browser kept redirecting to strange sites. ZA Support found Genieo and two adware variants I had never heard of. Clean in under three hours. Safari works perfectly again.',
    date: 'February 2026',
  },
  {
    name: 'Lungelo D.',
    suburb: 'Sandton',
    rating: 5,
    text: 'My Mac was painfully slow and Activity Monitor showed a process using 80% CPU that I could not stop or identify. ZA Support diagnosed OSX.Shlayer and cleared everything, including three components it had downloaded. Runs like new.',
    date: 'January 2026',
  },
  {
    name: 'Mia H.',
    suburb: 'Bryanston',
    rating: 5,
    text: 'Downloaded a cracked app and ended up with Atomic Stealer on my machine. ZA Support removed it, did a full credential audit with me, and set up CyberShield. Have not had a single issue since. Genuinely grateful.',
    date: 'March 2026',
  },
];

const aggregateRatingSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Mac Virus & Malware Removal Johannesburg',
  description: 'Mac virus and malware removal service in Johannesburg. Free diagnosis. Remove adware, browser hijackers, spyware, trojans. Ongoing protection via CyberShield.',
  brand: { '@type': 'Brand', name: 'ZA Support' },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '87',
    bestRating: '5',
    worstRating: '1',
  },
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
  name: 'Mac Virus & Malware Removal Johannesburg',
  provider: LOCAL_BUSINESS_PROVIDER,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Suburb', name: 'Sandton' },
    { '@type': 'Suburb', name: 'Rosebank' },
    { '@type': 'Suburb', name: 'Fourways' },
    { '@type': 'Suburb', name: 'Bryanston' },
    { '@type': 'Suburb', name: 'Hyde Park' },
  ],
  description: 'Mac virus and malware removal in Johannesburg. Free diagnosis. Remove Genieo, SearchMine, adware, spyware, trojans. Ongoing protection available via CyberShield.',

};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'MacBook Repair', item: 'https://zasupport.com/macbook-repair' },
    { '@type': 'ListItem', position: 3, name: 'Virus & Malware Removal', item: 'https://zasupport.com/macbook-repair/virus-removal' },
  ],
};

const faqSchema = buildFaqSchema(faqs);

const riskColour: Record<string, string> = {
  Critical: 'bg-red-900/30 text-red-400 border-red-700/30',
  High: 'bg-orange-900/20 text-orange-400 border-orange-700/20',
  Medium: 'bg-yellow-900/20 text-yellow-400 border-yellow-700/20',
};

export default function MacVirusRemovalPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <SchemaOrg schema={breadcrumbSchema} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={aggregateRatingSchema} />

      {/* HERO */}
      <section className="hero-gradient grid-overlay pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'MacBook Repair', href: '/macbook-repair' }, { label: 'Virus & Malware Removal' }]} />
          <div className="mt-8 max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[rgba(15,234,122,0.1)] border border-[rgba(15,234,122,0.25)] text-[#0FEA7A] text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <CheckCircle className="w-4 h-4" /> Free Diagnosis · Same-Day Removal · Hyde Park JHB
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
              Mac Virus &amp; Malware Removal<br />
              <span className="text-[#0FEA7A]">Johannesburg</span>
              <span className="text-[#7A9E98] text-3xl sm:text-4xl"> | Free Diagnosis</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-8 max-w-2xl">
              Adware, browser hijackers, spyware, trojans, and info stealers — we diagnose and remove all known Mac threats. If your Mac is slow, showing pop-ups, or redirecting your browser, bring it in. Diagnosis is free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/27645295863?text=Hi%20ZA%20Support%2C%20I%20think%20my%20Mac%20has%20a%20virus"
                className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all text-lg"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp Us
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
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
              { stat: 'Free', label: 'Diagnosis — No Hidden Cost' },
              { stat: 'Same-Day', label: 'Removal for Most Infections' },
              { stat: '100%', label: 'Mac-Specialist Technicians' },
              { stat: 'CyberShield', label: 'Ongoing Protection Available' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center">
                <span className="text-2xl font-extrabold text-[#0FEA7A]" style={{ fontFamily: 'Syne, sans-serif' }}>{item.stat}</span>
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
                <span className="text-3xl font-extrabold text-[#E8F4F1]" style={{ fontFamily: 'Syne, sans-serif' }}>4.9</span>
                <span className="text-[#7A9E98] ml-2 text-sm">/ 5 from 87 verified removals</span>
              </div>
            </div>
            <p className="text-[#7A9E98] text-sm text-center sm:text-right max-w-xs">
              Mac malware removal — Sandton, Rosebank, Fourways, Bryanston, Hyde Park
            </p>
          </div>
        </div>
      </section>

      {/* SYMPTOMS */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
              Signs Your Mac May Be <span className="text-[#0FEA7A]">Infected</span>
            </h2>
            <p className="text-[#7A9E98] max-w-xl mx-auto">
              These symptoms do not always mean malware — but they warrant investigation. Diagnosis is free.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {symptoms.map((s) => (
              <div key={s.title} className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 hover:border-[rgba(15,234,122,0.2)] transition-colors">
                <div className="text-[#0FEA7A] mb-3">{s.icon}</div>
                <h3 className="text-[#E8F4F1] font-bold text-sm mb-2">{s.title}</h3>
                <p className="text-[#7A9E98] text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KNOWN THREATS */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
              Common Mac Threats <span className="text-[#0FEA7A]">We Remove</span>
            </h2>
            <p className="text-[#7A9E98] max-w-xl mx-auto">
              These are the most frequently encountered Mac infections in South Africa. We remove all of them — including persistent variants that reinstall after standard deletion.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {threats.map((threat) => (
              <div key={threat.name} className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 hover:border-[rgba(15,234,122,0.15)] transition-colors">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-[#E8F4F1] font-bold">{threat.name}</h3>
                    <span className="text-[#7A9E98] text-xs">{threat.type}</span>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded border flex-shrink-0 ${riskColour[threat.risk]}`}>
                    {threat.risk}
                  </span>
                </div>
                <p className="text-[#7A9E98] text-sm leading-relaxed">{threat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
              Our Removal <span className="text-[#0FEA7A]">Process</span>
            </h2>
            <p className="text-[#7A9E98]">Thorough, documented, and transparent.</p>
          </div>
          <div className="space-y-5">
            {[
              {
                step: '01',
                icon: <Wrench className="w-5 h-5" />,
                title: 'Free Diagnostic Scan',
                desc: 'We run a full system scan covering LaunchAgents, LaunchDaemons, login items, browser extensions, system extensions, and running processes. We map every component of the infection before touching anything.',
              },
              {
                step: '02',
                icon: <Shield className="w-5 h-5" />,
                title: 'Written Quote',
                desc: 'Based on the infection scope, we give you a fixed written price. For complex persistent infections or if a clean reinstall is recommended, we quote accordingly.',
              },
              {
                step: '03',
                icon: <Bug className="w-5 h-5" />,
                title: 'Full Removal — All Components',
                desc: 'We remove every component: the visible app, all LaunchAgent and LaunchDaemon entries, browser extensions across Safari and Chrome, modified preference files, and scheduled tasks. We verify removal before calling it done.',
              },
              {
                step: '04',
                icon: <CheckCircle className="w-5 h-5" />,
                title: 'Verification & Browser Reset',
                desc: 'After removal we reset browser search engines, homepages, and extension settings to known-good states. We run a post-removal scan to confirm zero active threats remain.',
              },
              {
                step: '05',
                icon: <Lock className="w-5 h-5" />,
                title: 'Security Briefing + CyberShield Option',
                desc: 'We explain how the infection got in and what to avoid going forward. We demonstrate CyberShield — our ongoing protection service with network-level filtering and monthly health checks. No hard sell. The choice is yours.',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 hover:border-[rgba(15,234,122,0.15)] transition-colors">
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                  <div className="text-2xl font-extrabold text-[#0FEA7A] opacity-40" style={{ fontFamily: 'Syne, sans-serif' }}>{item.step}</div>
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

      {/* CYBERSHIELD UPSELL */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[rgba(39,80,77,0.25)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <div className="flex items-start gap-5 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[rgba(15,234,122,0.15)] flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-[#0FEA7A]" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#E8F4F1] mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                  Prevent Reinfection — <span className="text-[#0FEA7A]">CyberShield</span>
                </h2>
                <p className="text-[#7A9E98]">
                  Malware removal fixes the immediate problem. CyberShield prevents the next one. Used by ZA Support clients across Johannesburg to keep Macs clean long-term.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                { label: 'Network-level domain blocking', desc: 'Stops malicious sites before they load — at the DNS level, before your browser even connects.' },
                { label: 'Monthly security health checks', desc: 'We scan your Mac every month for new threats, suspicious login items, and unusual processes.' },
                { label: 'Real-time threat intelligence', desc: 'ZA Support monitors emerging Mac threat families and updates your protection automatically.' },
                { label: 'Immediate incident response', desc: 'If a new infection is detected, we respond within 24 hours — included in your plan.' },
              ].map((f) => (
                <div key={f.label} className="flex gap-3 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)] rounded-xl p-4">
                  <CheckCircle className="w-4 h-4 text-[#0FEA7A] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#E8F4F1] text-sm font-semibold">{f.label}</p>
                    <p className="text-[#7A9E98] text-xs mt-1">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="text-center sm:text-left">
                <p className="text-[#7A9E98] text-sm">Starting from</p>
                <p className="text-2xl font-extrabold text-[#0FEA7A]" style={{ fontFamily: 'Syne, sans-serif' }}>Contact us for pricing</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:ml-auto">
                <a
                  href="https://wa.me/27645295863?text=Hi%20ZA%20Support%2C%20I%20want%20to%20know%20more%20about%20CyberShield"
                  className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-6 py-3 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all"
                >
                  <MessageCircle className="w-4 h-4" /> Ask About CyberShield
                </a>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.3)] text-[#0FEA7A] px-6 py-3 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all text-sm"
                >
                  View All Services <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY ZA SUPPORT */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
              Why Johannesburg Mac Owners <span className="text-[#0FEA7A]">Choose ZA Support</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Free Diagnosis',
                desc: 'We scan and identify the infection at no cost. You only pay for removal — and only after seeing a written fixed quote.',
              },
              {
                title: 'Mac Specialists Only',
                desc: 'We work exclusively on Apple hardware. We know APFS, macOS security architecture, and every major Mac malware family. No Windows generalists guessing.',
              },
              {
                title: 'Complete Removal',
                desc: 'We remove every component — not just the visible app. We verify clean status before handover. No partial fixes.',
              },
              {
                title: 'No Hard Sell',
                desc: 'CyberShield is genuinely useful — but we will explain it and let you decide. We do not pressure. The value speaks for itself.',
              },
              {
                title: 'Same-Day for Most Cases',
                desc: 'Standard adware and hijacker removal is typically done within 2–3 hours. We tell you realistic timing upfront.',
              },
              {
                title: 'Hyde Park, Johannesburg',
                desc: '1 Hyde Park Lane. Easy access from Sandton, Rosebank, Fourways, and surrounding suburbs.',
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
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
              What Clients Say About <span className="text-[#0FEA7A]">Malware Removal</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqs} title="Mac Virus & Malware Removal — Frequently Asked Questions" />
        </div>
      </section>

      {/* SUBURBS */}
      <section className="py-16 bg-[#0A1A18] border-t border-[rgba(255,255,255,0.05)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-[#E8F4F1] mb-6 text-center" style={{ fontFamily: 'Syne, sans-serif' }}>
            Mac Virus Removal Near You — <span className="text-[#0FEA7A]">Johannesburg</span>
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
            Based at <strong className="text-[#E8F4F1]">1 Hyde Park Lane, Hyde Park, Johannesburg 2196</strong>. Walk-ins welcome — call first for same-day availability.
          </p>
        </div>
      </section>

      {/* RELATED SERVICES */}
      <section className="py-12 bg-[#071210]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-[#E8F4F1] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
            Related Services
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: 'MacBook Repair', href: '/macbook-repair' },
              { label: 'Data Recovery', href: '/macbook-repair/data-recovery' },
              { label: 'Managed Services', href: '/managed-services' },
              { label: 'MacBook Pro Repair', href: '/macbook-pro-repair' },
              { label: 'Logic Board Repair', href: '/logic-board-repair' },
              { label: 'MacBook Not Turning On', href: '/macbook-not-turning-on' },
            ].map(link => (
              <Link key={link.href} href={link.href} className="block p-3 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[#7A9E98] hover:text-[#0FEA7A] hover:border-[#0FEA7A] text-sm transition-colors">
                {link.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BOTTOM */}
      <section className="py-20 bg-[#111C1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
              Think Your Mac Has a Virus?
            </h2>
            <p className="text-[#7A9E98] mb-2 text-lg">Free diagnosis. Same-day removal. No fix, no fee.</p>
            <p className="text-[#7A9E98] text-sm mb-8">Hyde Park, Johannesburg · 100% Mac specialists · CyberShield protection available</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/27645295863?text=Hi%20ZA%20Support%2C%20I%20think%20my%20Mac%20has%20a%20virus"
                className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp Us Now
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" /> {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
