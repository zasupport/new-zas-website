import type { Metadata } from 'next';
import type { SchemaOrg } from '@/types';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import SchemaOrgComp from '@/components/seo/SchemaOrg';
import { AuthorBox } from '@/components/blog/AuthorBox';

import { posts } from './posts.data';

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return { title: 'Post Not Found' };
  // §FIX 11/06/2026: do NOT hard-truncate (sliced "Complete 2026 Guide"→"Comple")
  // and do NOT append "| ZA Support", layout.tsx title.template '%s | ZA Support'
  // already adds it once. Manual suffix + template = doubled "| ZA Support | ZA Support".
  // Strip any pre-baked trailing brand so the template adds it exactly once.
  const serpTitle = (post.shortTitle || post.title)
    .replace(/\s*\|\s*ZA Support\s*$/i, '')
    .trim();
  const metaDescription = (post.seoDescription && post.seoDescription.length >= 130)
    ? post.seoDescription
    : post.excerpt.slice(0, 160);
  return {
    title: serpTitle,
    description: metaDescription,
    alternates: { canonical: `https://zasupport.com/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: metaDescription,
      url: `https://zasupport.com/blog/${slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: metaDescription,
      images: ['/og-image.jpg'],
    },
  };
}

function extractFaqsFromContent(content: string): { question: string; answer: string }[] {
  // Two-pass FAQ extraction (§343: this only feeds FAQPage JSON-LD in a <script> tag, 
  // it never renders body content). Primary pass = original heading/### question format,
  // behaviour-identical to before. Fallback only runs when the primary finds nothing, so
  // posts already emitting FAQPage are byte-unchanged; the fallback recognises the
  // bold-question (`**Question?**`), bold inline (`**Q: ...?**A: ...`) and plain inline
  // (`Question? Answer`) formats that older posts use, so they too emit FAQPage schema.
  const primary = extractFaqsHeadingFormat(content);
  if (primary.length > 0) return primary;
  return extractFaqsAltFormat(content);
}

function extractFaqsHeadingFormat(content: string): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [];
  const lines = content.split('\n');
  let inCodeBlock = false;
  let currentQuestion = '';
  let currentAnswer = '';
  let inFaqSection = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('```')) { inCodeBlock = !inCodeBlock; continue; }
    if (inCodeBlock) continue;
    if (/^#{1,2}\s/.test(line) && /faq|frequently asked/i.test(line)) {
      inFaqSection = true;
      continue;
    }
    if (inFaqSection && line.startsWith('### ')) {
      if (currentQuestion && currentAnswer.trim()) {
        faqs.push({ question: currentQuestion, answer: currentAnswer.trim() });
      }
      currentQuestion = line.slice(4).trim();
      currentAnswer = '';
    } else if (inFaqSection && currentQuestion && line.startsWith('## ')) {
      if (currentAnswer.trim()) faqs.push({ question: currentQuestion, answer: currentAnswer.trim() });
      break;
    } else if (inFaqSection && currentQuestion && line.trim()) {
      currentAnswer += (currentAnswer ? ' ' : '') + line.trim();
    }
  }
  if (currentQuestion && currentAnswer.trim()) {
    faqs.push({ question: currentQuestion, answer: currentAnswer.trim() });
  }
  return faqs;
}

function extractFaqsAltFormat(content: string): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [];
  const lines = content.split('\n');
  const faqHeading = /^(#{1,4}\s+)?(\*\*)?\s*(frequently asked questions|faqs?)\s*(\*\*)?\s*$/i;
  // Never treat a rendered schema/JSON-LD heading as a FAQ section (avoids scraping a
  // leaked `## FAQPage JSON-LD Schema` block, §343/§377).
  const schemaWord = /json-?ld|schema|faqpage/i;
  // A bold line that is actually a CTA (markdown link / wa.me / http) is not a question.
  const ctaLine = /\]\(|https?:|wa\.me/i;
  const stripQ = (s: string) =>
    s.replace(/^\s*Q\d*\s*[:.)]\s*/i, '').replace(/^\s*\d+[.)]\s*/, '').trim();
  const stripA = (s: string) => s.replace(/^\s*A\s*[:.)]\s*/i, '').trim();
  let inCodeBlock = false;
  let inFaqSection = false;
  let currentQuestion = '';
  let currentAnswer = '';
  const push = () => {
    if (currentQuestion && currentAnswer.trim()) {
      faqs.push({ question: currentQuestion.trim(), answer: currentAnswer.trim() });
    }
    currentQuestion = '';
    currentAnswer = '';
  };
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('```')) { inCodeBlock = !inCodeBlock; continue; }
    if (inCodeBlock) continue;
    const t = line.trim();
    const isFaqHeading =
      ((/^#{1,4}\s/.test(line) && /faq|frequently asked/i.test(line)) || faqHeading.test(t)) &&
      !schemaWord.test(t);
    if (isFaqHeading) { push(); inFaqSection = true; continue; }
    if (!inFaqSection) continue;
    if (line.startsWith('## ') && !schemaWord.test(t)) { push(); break; }
    if (t.startsWith('**') && t.includes('?') && !ctaLine.test(t)) {
      const m = t.match(/^\*\*(.+?)\*\*(.*)$/);
      if (m) {
        push();
        currentQuestion = stripQ(m[1]);
        const rest = m[2].trim();
        currentAnswer = rest ? stripA(rest) : '';
      } else if (currentQuestion) {
        currentAnswer += (currentAnswer ? ' ' : '') + t;
      }
    } else if (
      !currentQuestion &&
      t &&
      t.includes('?') &&
      !/^[-*>#✓✗"{}[\]]/.test(t) &&
      !t.includes('":') &&
      !ctaLine.test(t) &&
      t.indexOf('?') >= 8
    ) {
      const qp = t.indexOf('?');
      const a = t.slice(qp + 1).trim();
      if (a) faqs.push({ question: stripQ(t.slice(0, qp + 1).trim()), answer: a });
    } else if (currentQuestion && t) {
      currentAnswer += (currentAnswer ? ' ' : '') + t;
    }
  }
  push();
  return faqs;
}

function getAuthorSlug(name: string): string {
  if (!name || name === 'ZA Support') return 'courtney-bentley';
  return name.toLowerCase().replace(/\s+/g, '-');
}

// §CRO/§402, match a blog post to its matching SERVICE page so the article hands a
// buying-intent reader off to the page that actually converts (research-backed: blog
// readers scan + are in research mode; the service page catches buying mode). All hrefs
// are confirmed live service hubs. ASCII only (§547), factual wording (§210).
function matchService(post: { slug: string; title: string; category?: string }): { href: string; label: string; problem: string } {
  const s = `${post.slug} ${post.title} ${post.category || ''}`.toLowerCase();
  const has = (...w: string[]) => w.some((x) => s.includes(x));
  const mac = has('macbook', 'imac', 'mac mini', 'mac-mini', ' mac ', 'mac-', 'macos');
  if (has('logic board', 'logic-board', 'motherboard', 'short circuit', 'no power', 'not turning on', 'wont turn on', 'will not turn on'))
    return { href: '/logic-board-repair', label: 'Logic Board Repair', problem: 'a logic board or power fault' };
  if (has('liquid', 'water damage', 'water-damage', 'spill', 'coffee'))
    return { href: '/liquid-damage', label: 'Liquid Damage Repair', problem: 'liquid or water damage' };
  if (has('imac')) return { href: '/imac-repair', label: 'iMac Repair', problem: 'an iMac issue' };
  if (has('mac mini', 'mac-mini')) return { href: '/mac-mini-repair', label: 'Mac mini Repair', problem: 'a Mac mini issue' };
  if (mac) return { href: '/macbook-repair', label: 'MacBook Repair', problem: 'a MacBook issue' };
  if (has('ipad')) return { href: '/ipad-repair', label: 'iPad Repair', problem: 'an iPad issue' };
  if (has('iphone') && has('battery')) return { href: '/battery-replacement', label: 'iPhone Battery Replacement', problem: 'an iPhone battery' };
  if (has('iphone') && has('screen', 'glass', 'cracked', 'display')) return { href: '/screen-repair', label: 'Screen Repair', problem: 'a cracked screen' };
  if (has('iphone')) return { href: '/iphone-repair', label: 'iPhone Repair', problem: 'an iPhone issue' };
  return { href: '/apple-repair', label: 'Apple Repair', problem: 'an Apple device issue' };
}

// §350, auto-inject [REF:BLOG-<slug>] tracking into bare wa.me URLs in blog content
// before rendering. Bare URL (no existing ?text=) gets rewritten; manual ?text= preserved.
function injectWaTracking(content: string, slug: string): string {
  const safeSlug = (slug || 'unknown').slice(0, 64).replace(/[^a-zA-Z0-9-]/g, '');
  const ref = `BLOG-${safeSlug.toUpperCase()}`;
  const tracked = `https://wa.me/27645295863?text=${encodeURIComponent(`Hi ZAS, I'm enquiring from the /blog/${safeSlug} page [REF:${ref}]`)}`;
  // Replace bare URL (not followed by ?, already-tracked URLs are left alone)
  return content.replace(/https:\/\/wa\.me\/27645295863(?!\?)/g, tracked);
}

function processInlineMarkdown(text: string, keyPrefix: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let partIdx = 0;
  while (remaining.length > 0) {
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);
    const candidates: { index: number; length: number; node: React.ReactNode }[] = [];
    if (boldMatch && boldMatch.index !== undefined) {
      candidates.push({ index: boldMatch.index, length: boldMatch[0].length, node: <strong key={`${keyPrefix}-b${partIdx}`} className="text-[#E8F4F1] font-semibold">{boldMatch[1]}</strong> });
    }
    if (linkMatch && linkMatch.index !== undefined) {
      candidates.push({ index: linkMatch.index, length: linkMatch[0].length, node: <a key={`${keyPrefix}-a${partIdx}`} href={linkMatch[2]} className="text-[#0FEA7A] underline hover:text-[#0FEA7A]/80" target={linkMatch[2].startsWith('http') ? '_blank' : undefined} rel={linkMatch[2].startsWith('http') ? 'noopener noreferrer' : undefined}>{linkMatch[1]}</a> });
    }
    candidates.sort((a, b) => a.index - b.index);
    const earliest = candidates[0];
    if (earliest) {
      if (earliest.index > 0) parts.push(remaining.slice(0, earliest.index));
      parts.push(earliest.node);
      remaining = remaining.slice(earliest.index + earliest.length);
      partIdx++;
    } else {
      parts.push(remaining);
      break;
    }
  }
  return parts.length === 1 && typeof parts[0] === 'string' ? parts[0] : <>{parts}</>;
}
function renderContent(content: string, excerpt?: string) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  let inCodeBlock = false;
  const normalise = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  const excerptNorm = excerpt ? normalise(excerpt) : '';
  let ledeChecked = !excerptNorm;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      i++;
      continue;
    }
    if (inCodeBlock) {
      i++;
      continue;
    }
    if (line.startsWith('# ') && !line.startsWith('## ')) {
      i++;
      continue;
    }
    if (line.startsWith('## ')) {
      elements.push(<h2 key={i} className="text-2xl font-bold text-[#E8F4F1] mt-10 mb-4">{processInlineMarkdown(line.slice(3), `h2-${i}`)}</h2>);
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={i} className="text-xl font-bold text-[#E8F4F1] mt-8 mb-3">{processInlineMarkdown(line.slice(4), `h3-${i}`)}</h3>);
    } else if (line.startsWith('> ')) {
      elements.push(<blockquote key={i} className="border-l-4 border-[#0FEA7A] pl-4 my-4 text-[#7A9E98] italic">{processInlineMarkdown(line.slice(2), `bq-${i}`)}</blockquote>);
    } else if (line.startsWith('![')) {
      const imgMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)/);
      if (imgMatch) {
        elements.push(<figure key={i} className="my-6"><img src={imgMatch[2]} alt={imgMatch[1]} className="rounded-xl w-full" loading="lazy" /></figure>);
      }
    } else if (line.startsWith('*') && !line.startsWith('**') && line.endsWith('*') && !line.endsWith('**')) {
      elements.push(<p key={i} className="text-[#7A9E98] text-sm italic mt-1 mb-4">{line.slice(1, -1)}</p>);
    } else if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(<p key={i} className="text-[#E8F4F1] font-semibold mt-4 mb-2">{line.slice(2, -2)}</p>);
    } else if (/^\d+\.\s/.test(line)) {
      elements.push(<li key={i} className="text-[#7A9E98] leading-relaxed list-decimal ml-6">{processInlineMarkdown(line.replace(/^\d+\.\s/, ''), `ol-${i}`)}</li>);
    } else if (line.startsWith('- ') || line.startsWith('✓ ') || line.startsWith('✗ ')) {
      elements.push(<li key={i} className="text-[#7A9E98] leading-relaxed list-disc ml-6">{processInlineMarkdown(line.slice(2), `ul-${i}`)}</li>);
    } else if (line.trim() === '') {
      // skip empty lines
    } else {
      if (!ledeChecked && elements.length === 0) {
        ledeChecked = true;
        const lineNorm = normalise(line);
        if (
          lineNorm === excerptNorm ||
          lineNorm.startsWith(excerptNorm) ||
          excerptNorm.startsWith(lineNorm)
        ) {
          i++;
          continue;
        }
      }
      elements.push(<p key={i} className="text-[#7A9E98] leading-relaxed mb-4">{processInlineMarkdown(line, `p-${i}`)}</p>);
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
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: 'courtney-bentley',
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
      streetAddress: '1 Hyde Lane, Second Floor, Office E2004',
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
          acceptedAnswer: { '@type': 'Answer', text: 'The ten most effective free steps are: (1) clear storage to at least 20% free, (2) remove login items that start at boot, (3) reset the SMC on Intel Macs, (4) reset NVRAM/PRAM, (5) check Activity Monitor for CPU hogs, (6) clean the Downloads folder, (7) reduce visual effects, (8) update macOS, (9) reindex Spotlight, (10) reduce browser tabs and extensions. Start with storage, it is the most common cause of Mac slowness and the easiest free fix.' },
        },
        {
          '@type': 'Question',
          name: 'What is the SMC reset and does it speed up a Mac?',
          acceptedAnswer: { '@type': 'Answer', text: 'The SMC (System Management Controller) on Intel Macs manages power delivery, fans, sleep, and startup behaviour. A corrupted SMC state can cause sluggishness, runaway fans, and unresponsiveness. To reset on a 2017 or later MacBook: shut down, hold Shift + Control + Option + Power for 10 seconds, release, then start normally. Apple Silicon Macs (M1-M4) do not have an SMC and do not need this step.' },
        },
        {
          '@type': 'Question',
          name: 'How do I remove startup items on a Mac?',
          acceptedAnswer: { '@type': 'Answer', text: 'On macOS Ventura and later: System Settings → General → Login Items. Remove items from the "Open at Login" list and disable "Allow in Background" for apps you do not use daily. On macOS Monterey and earlier: System Preferences → Users & Groups → Login Items → select item → click the minus button. Every removed login item frees RAM and reduces startup time.' },
        },
        {
          '@type': 'Question',
          name: 'Why is my Mac slow even after restarting?',
          acceptedAnswer: { '@type': 'Answer', text: 'If a Mac is slow even after a fresh restart, the cause is likely hardware rather than software: thermal throttling from dried-out thermal paste (common on Macs 4+ years old), insufficient RAM for your workload, or an early-stage SSD failure. Check Activity Monitor immediately after restart, if CPU or memory pressure is already high before you open anything, a background process or hardware limitation is the cause.' },
        },
        {
          '@type': 'Question',
          name: 'Does clearing cache speed up a Mac?',
          acceptedAnswer: { '@type': 'Answer', text: 'Clearing user caches can free up storage, which indirectly improves performance on a nearly-full drive. However, clearing caches does not directly speed up CPU performance and can slow down applications temporarily as they rebuild cached data. Focus on freeing up storage by deleting large files and emptying the Trash rather than clearing caches specifically.' },
        },
        {
          '@type': 'Question',
          name: 'How much storage should I keep free on a Mac?',
          acceptedAnswer: { '@type': 'Answer', text: 'Apple recommends keeping at least 10-15% of your drive free for virtual memory and system operations. On a 256 GB Mac, aim for at least 30 GB free. On a 512 GB Mac, at least 50 GB. If available storage drops below 5 GB, macOS will warn you and performance will be severely impacted as the virtual memory system runs out of space.' },
        },
        {
          '@type': 'Question',
          name: 'How do I reindex Spotlight on a Mac?',
          acceptedAnswer: { '@type': 'Answer', text: 'System Settings → Siri & Spotlight → Spotlight Privacy → click + and add your Macintosh HD → wait 10 seconds → select Macintosh HD and click - to remove it. This triggers a complete Spotlight reindex, which takes 30 minutes to several hours depending on drive size. During reindexing the Mac may run warm, this is normal and performance improves once complete.' },
        },
        {
          '@type': 'Question',
          name: 'When should I take my slow Mac to a repair shop?',
          acceptedAnswer: { '@type': 'Answer', text: 'If you have worked through the free steps, cleared storage, removed login items, reset SMC and NVRAM, checked Activity Monitor, and the Mac is still slow, the cause is likely hardware: thermal paste degradation, insufficient RAM, or a failing SSD. ZA Support offers Mac diagnosis: from R599 in Hyde Park, Johannesburg.' },
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
          name: 'My Mac makes no sound and screen is black, is it dead?',
          acceptedAnswer: { '@type': 'Answer', text: 'Not necessarily. A completely black screen with no fan activity usually indicates a power delivery issue, the most common causes are a flat battery that needs 15+ minutes of charging before it can start, a faulty charger cable, or a hung power state that a hard reset (hold power for 10 seconds) can clear. Try charging for 20 minutes and performing a hard reset before assuming hardware failure.' },
        },
        {
          '@type': 'Question',
          name: 'What does it mean when a MacBook has a black screen but the fan is running?',
          acceptedAnswer: { '@type': 'Answer', text: 'Fan running with a black screen means the Mac is starting but not displaying anything. Causes include: display backlight failure (test with a torch, look for a faint image), a failed display cable (common on MacBook Pros that hinge between the display and body), or a GPU fault. Connect an external monitor to determine if the Mac is actually starting successfully, if the external monitor shows your desktop, the fault is in the display assembly.' },
        },
        {
          '@type': 'Question',
          name: 'How do I start a Mac in Safe Mode?',
          acceptedAnswer: { '@type': 'Answer', text: 'Intel Mac: Shut down, then hold the Shift key while pressing Power. Keep holding Shift until the login screen shows "Safe Boot" in the top right. Apple Silicon Mac (M1-M4): Shut down, press and hold the Power button until "Loading startup options" appears, select your startup disk, hold Shift, click "Continue in Safe Mode." If the Mac starts in Safe Mode but not normally, a software conflict or corrupted login item is the cause.' },
        },
        {
          '@type': 'Question',
          name: 'How do I access macOS Recovery Mode?',
          acceptedAnswer: { '@type': 'Answer', text: 'Intel Mac: Press and hold Command + R immediately after pressing the power button. Hold until you see the Apple logo or spinning globe. Apple Silicon Mac: Press and hold the Power button until "Loading startup options" appears, then select Options → Continue. In Recovery Mode, use Disk Utility → First Aid to check and repair the startup volume. This resolves many startup failures without erasing data.' },
        },
        {
          '@type': 'Question',
          name: 'Will a Mac that won\'t turn on lose all my data?',
          acceptedAnswer: { '@type': 'Answer', text: 'In most cases, no. The majority of startup failures are software or power-related, the data on the SSD is intact even if the Mac cannot boot. Hardware failures like a dead battery or failed logic board do not directly affect SSD data. Even in logic board failure cases, the SSD can typically be read using specialist equipment. ZA Support retrieves data from non-booting Macs regularly.' },
        },
        {
          '@type': 'Question',
          name: 'How do I reset a Mac that won\'t turn on using SMC?',
          acceptedAnswer: { '@type': 'Answer', text: 'On a 2017 or later Intel MacBook: hold Shift + Control + Option (all on the left side of the keyboard) + the Power button simultaneously for 10 seconds. Release all keys. Press Power to start normally. On a pre-2017 Intel MacBook with removable battery: remove the battery, hold the Power button for 5 seconds, reinstall the battery, press Power. Apple Silicon Macs have no SMC, skip this step.' },
        },
        {
          '@type': 'Question',
          name: 'How much does it cost to fix a Mac that won\'t turn on in Johannesburg?',
          acceptedAnswer: { '@type': 'Answer', text: 'Cost depends on the cause. ZA Support offers a initial assessment, we identify the exact fault and quote before any work begins. Software fixes, hardware repairs, and logic board repairs are all quoted individually after diagnosis. Assessment: from R599. Hyde Park, Johannesburg.' },
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
          acceptedAnswer: { '@type': 'Answer', text: 'Sudden MacBook slowness is most often caused by full or nearly-full storage (macOS uses free space as virtual memory), a background process consuming CPU (check Activity Monitor), or a macOS update triggering Spotlight re-indexing. Check your available storage first, if it is under 20 GB on a 256 GB drive, that is likely the cause.' },
        },
        {
          '@type': 'Question',
          name: 'Will a RAM upgrade make my MacBook faster?',
          acceptedAnswer: { '@type': 'Answer', text: 'On Intel MacBooks (up to 2019 MacBook Pro), a RAM upgrade from 8 GB to 16 GB can deliver significant performance improvement if Activity Monitor shows sustained high memory pressure or swap usage above 2-3 GB. On Apple Silicon Macs (M1-M4), RAM is not upgradeable, it is part of the chip. ZA Support fits RAM upgrades on eligible Intel MacBooks, contact us for a quote.' },
        },
        {
          '@type': 'Question',
          name: 'How do I check if my Mac has a failing hard drive?',
          acceptedAnswer: { '@type': 'Answer', text: 'Download DriveDx (paid) or use the built-in Disk Utility (Applications → Utilities → Disk Utility → select your drive → First Aid). Warning signs of a failing SSD include dramatically slow app launches, frequent beach ball spinning, and system freezes that last 10-30 seconds. If S.M.A.R.T. errors are detected, back up immediately and bring the Mac to ZA Support for assessment.' },
        },
        {
          '@type': 'Question',
          name: 'Can a MacBook be too old to fix or upgrade?',
          acceptedAnswer: { '@type': 'Answer', text: 'Most MacBooks from 2015 onwards are viable for repair and upgrade. The key factors are: does it support a current enough macOS for your software, is the hardware in working condition, and does the cost of the upgrade compare favourably to a replacement? ZA Support offers assessments from R599 and provides both repair and replacement options with honest recommendations.' },
        },
        {
          '@type': 'Question',
          name: 'My MacBook fan is running constantly, is that causing the slowness?',
          acceptedAnswer: { '@type': 'Answer', text: 'A fan running at full speed is a symptom, not a cause. It indicates the processor is running hot, either because of a demanding task, dried-out thermal paste (common on MacBooks 4+ years old), or a blocked exhaust. When the Mac runs hot, it thermal-throttles the CPU, which directly causes slowness. Thermal paste replacement at ZA Support can reduce temperatures by 20-30°C.' },
        },
        {
          '@type': 'Question',
          name: 'How do I find out what is slowing down my Mac?',
          acceptedAnswer: { '@type': 'Answer', text: 'Open Activity Monitor (Applications → Utilities → Activity Monitor). The CPU tab shows which processes are consuming processing power. The Memory tab shows memory pressure and swap usage. Sort each by the highest consumer to identify the culprit. For a full diagnosis, ZA Support\'s Health Check service covers 28 diagnostic phases including hardware, storage health, memory, security, and software.' },
        },
        {
          '@type': 'Question',
          name: 'Does reinstalling macOS make a Mac faster?',
          acceptedAnswer: { '@type': 'Answer', text: 'A clean macOS reinstall can help if the slowness is caused by accumulated software faults, corrupted system files, or malware. It will not help if the cause is hardware, insufficient RAM, a failing SSD, or thermal throttling from degraded thermal paste. Before reinstalling, it is worth diagnosing the root cause, as a reinstall is time-consuming and may not solve the problem.' },
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
          name: 'My MacBook connects to WiFi but has no internet, what does that mean?',
          acceptedAnswer: { '@type': 'Answer', text: 'Connected to WiFi but no internet means your Mac is communicating with the router successfully, but the router cannot reach the internet. This is an ISP or router problem, not a Mac problem. Restart your router and contact your ISP if the problem persists.' },
        },
        {
          '@type': 'Question',
          name: 'How do I reset WiFi settings on a Mac?',
          acceptedAnswer: { '@type': 'Answer', text: 'Open Finder → press Cmd+Shift+G → type /Library/Preferences/SystemConfiguration/ → move these files to the Desktop: com.apple.airport.preferences.plist, NetworkInterfaces.plist, and preferences.plist → restart the Mac. macOS will recreate these files with fresh settings. If WiFi works after the restart, delete the files you moved to the Desktop.' },
        },
        {
          '@type': 'Question',
          name: 'My MacBook keeps dropping WiFi, how do I fix it?',
          acceptedAnswer: { '@type': 'Answer', text: 'Intermittent WiFi drops are usually caused by interference on the 2.4GHz band (switch to 5GHz if available on your router), an overloaded router, or a DHCP lease renewal failure. Try switching bands, reducing the number of connected devices, and updating your router firmware. If drops continue, check Activity Monitor for any VPN or network monitoring software causing conflicts.' },
        },
        {
          '@type': 'Question',
          name: 'Can a MacBook WiFi card be replaced?',
          acceptedAnswer: { '@type': 'Answer', text: 'On Intel MacBooks (up to approximately 2019), the WiFi/Bluetooth card is a replaceable module. On Apple Silicon MacBooks (M1 and later), the WiFi chip is integrated into the logic board and requires board-level repair. ZA Support diagnoses and replaces WiFi cards on Intel MacBooks. Contact us for an assessment from R599.' },
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
          acceptedAnswer: { '@type': 'Answer', text: 'WiFi repair cost depends on the cause. ZA Support offers diagnostic assessments: from R599, we identify the exact fault before quoting. Software fixes, WiFi card replacement, and logic board circuit repair are all quoted individually after diagnosis. Hyde Park, Johannesburg.' },
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
          acceptedAnswer: { '@type': 'Answer', text: 'Go to iforgot.apple.com, enter your Apple ID email address, and choose your verification method: a code sent to your trusted phone number, a trusted device nearby, or your Recovery Key if you set one up. If you have lost access to all trusted methods, use the "Start account recovery" option, Apple will verify your identity and set a waiting period of 72 hours to several weeks before allowing a password reset.' },
        },
        {
          '@type': 'Question',
          name: 'How long does Apple account recovery take?',
          acceptedAnswer: { '@type': 'Answer', text: 'Apple account recovery typically takes 72 hours for accounts with moderate security settings. Accounts with high security settings, no recent trusted device activity, or suspected compromise can have waiting periods of 2-4 weeks. Do not cancel or interrupt the recovery process, and do not attempt to sign in from other devices during the wait, this will cancel the recovery.' },
        },
        {
          '@type': 'Question',
          name: 'I\'m locked out of my Mac because of my Apple ID, what do I do?',
          acceptedAnswer: { '@type': 'Answer', text: 'If your Mac is locked at startup because FileVault is linked to your Apple ID, you can unlock it using the FileVault Recovery Key generated when FileVault was first set up. Boot into macOS Recovery (hold Cmd+R on Intel, hold power on Apple Silicon) and follow the disk unlock process. If you do not have the Recovery Key, data recovery may be required. ZA Support handles FileVault-linked lockouts, contact us on 064 529 5863.' },
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
          acceptedAnswer: { '@type': 'Answer', text: 'A Recovery Key is a 28-character code that lets you bypass the waiting period during account recovery. Setting one up means if you are ever locked out, you can recover instantly using the key, there is no waiting period. The trade-off: if you lose the key and lose access to your trusted devices simultaneously, account recovery becomes significantly harder. Store the key in two physical locations.' },
        },
        {
          '@type': 'Question',
          name: 'My Apple ID shows activity I don\'t recognise, is my account compromised?',
          acceptedAnswer: { '@type': 'Answer', text: 'Unrecognised activity on your Apple ID is a serious concern. Go to appleid.apple.com, sign in, and review the "Devices" section, remove any device you do not recognise. Change your password immediately. Enable two-factor authentication if not already active. If you cannot access the account at all, contact Apple Support immediately and report the suspected compromise, this is treated as a priority case.' },
        },
        {
          '@type': 'Question',
          name: 'What happens to my iCloud data if my Apple ID is permanently locked?',
          acceptedAnswer: { '@type': 'Answer', text: 'In the rare case where an Apple ID cannot be recovered, iCloud data (photos, documents, backups) remains tied to that account. Apple does not provide direct data extraction from iCloud without account access. The most important protection is having regular local backups of your iPhone and Mac, Time Machine for Mac, iTunes/Finder backups for iPhone, so your data is not exclusively in iCloud.' },
        },
      ],
    },
    'macbook-load-shedding-damage': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'My MacBook was not plugged in during load shedding, can it still be damaged?',
          acceptedAnswer: { '@type': 'Answer', text: 'If the MacBook was not connected to a charger or any peripherals during the outage, it is very unlikely to have been affected by the power reinstatement surge. However, if you plugged the charger back in immediately after power returned, that first connection carries the surge.' },
        },
        {
          '@type': 'Question',
          name: 'My MacBook turned on fine after load shedding, am I safe?',
          acceptedAnswer: { '@type': 'Answer', text: 'Not necessarily. Surge damage to certain components, particularly capacitors, can manifest as a gradual failure over days or weeks. Watch for unexpected shutdowns, charging irregularities, or performance changes over the following week.' },
        },
        {
          '@type': 'Question',
          name: 'Can authorised service providers repair surge damage?',
          acceptedAnswer: { '@type': 'Answer', text: 'Apple authorised service does not offer component-level logic board repair. They quote full board replacement at significantly higher cost. ZA Support repairs the specific failed component, not the whole board, at a fraction of that price.' },
        },
        {
          '@type': 'Question',
          name: 'How long does surge damage repair take?',
          acceptedAnswer: { '@type': 'Answer', text: 'Most surge damage repairs are completed within 3-5 working days. Complex cases can extend to 7-10 days. We provide a timeline estimate during the initial assessment.' },
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
          acceptedAnswer: { '@type': 'Answer', text: 'ZA Support repairs MacBook surge damage at component level, significantly less than a full board replacement through authorised service. Assessment: from R599.' },
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
          acceptedAnswer: { '@type': 'Answer', text: 'In most cases, yes. Component-level repair leaves the SSD untouched. Board replacement on Apple Silicon Macs, by contrast, requires a new SSD, meaning total data loss. This is one of the strongest reasons to choose component-level repair over board swap.' },
        },
        {
          '@type': 'Question',
          name: 'How long does MacBook logic board repair take?',
          acceptedAnswer: { '@type': 'Answer', text: 'Most logic board repairs are completed within 1-3 business days. Simple component replacements can be done same-day. Complex faults involving advanced chip work or multi-point corrosion damage may take 3-5 days. We provide a realistic turnaround at the diagnostic stage.' },
        },
        {
          '@type': 'Question',
          name: 'Is it worth repairing a 2015-2019 Intel MacBook logic board?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes, in most cases. Intel MacBook logic boards from 2015-2019 are well-understood and parts are available. Given the cost of a comparable secondhand replacement, a component-level board repair is almost always the better financial decision. Contact us for a quote.' },
        },
        {
          '@type': 'Question',
          name: 'Can liquid-damaged MacBook logic boards be repaired?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. Liquid damage is the most common cause of logic board failure. The outcome depends on how quickly the Mac was powered off and how long it sat before being brought in. ZA Support combines ultrasonic cleaning with component-level repair for liquid-damaged boards. Early intervention dramatically improves success rates.' },
        },
        {
          '@type': 'Question',
          name: 'Does ZA Support repair Apple Silicon M1 M2 M3 M4 logic boards?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. ZA Support has the specialist equipment required for M-series board repair in Johannesburg. Not every fault is repairable, but many are, and the alternative (board replacement equals data loss and significant cost) makes the attempt worthwhile.' },
        },
        {
          '@type': 'Question',
          name: 'What warranty does ZA Support provide on logic board repair?',
          acceptedAnswer: { '@type': 'Answer', text: 'All logic board repairs at ZA Support carry a warranty on parts and labour. If the same fault recurs within the warranty period, we fix it at from R599.' },
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
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. A cracked Retina display is repaired by replacing the full display assembly. On non-Retina models, replacing only the outer glass is sometimes possible but uncommon. We will assess which approach is appropriate for your model at from R599.' },
        },
        {
          '@type': 'Question',
          name: 'My MacBook screen is black but I can hear it starting up -- is this a screen fault?',
          acceptedAnswer: { '@type': 'Answer', text: 'It could be either. Connect an external monitor via USB-C or HDMI. If the external monitor works, the fault is in the display assembly or cable. If the external monitor also shows nothing, the fault is on the logic board. ZA Support performs this test during the assessment from R599.' },
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
          acceptedAnswer: { '@type': 'Answer', text: 'On 2019 Intel MacBook Pro models, horizontal or vertical coloured lines are most commonly caused by a failing display data cable rather than a failed panel. This is a more cost-effective repair than a full assembly replacement. We test with an external monitor during the assessment from R599 to confirm.' },
        },
      ],
    },
    'macbook-wont-charge-johannesburg': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Why is my MacBook not charging?', acceptedAnswer: { '@type': 'Answer', text: 'The most common causes are: a faulty MagSafe or USB-C cable, debris in the charging port, a failed charging chip on the logic board, or a dead battery that requires the charger to sit for 15+ minutes before it can start the machine. Start by trying a different cable and port, then clean the port with a dry brush.' } },
        { '@type': 'Question', name: 'How do I know if it is the charger or the MacBook port that is broken?', acceptedAnswer: { '@type': 'Answer', text: 'Test with a known-good charger on the same MacBook. If a different charger works, the original cable is the fault. If from R599r works and the MacBook does not show any charging indicator, the issue is the MacBook port or charging circuit. A green/amber MagSafe LED or the charging animation on USB-C models confirms the cable is delivering power.' } },
        { '@type': 'Question', name: 'Can a MacBook charging port be repaired?', acceptedAnswer: { '@type': 'Answer', text: 'On Intel MacBooks with MagSafe, the port is part of a board that can often be replaced independently. On USB-C MacBooks, the ports are connected to the logic board, port repair requires board-level microsoldering. ZA Support performs component-level charging port repairs in Johannesburg. Assessment: from R599.' } },
        { '@type': 'Question', name: 'My MacBook says "not charging" even though it is plugged in, what does this mean?', acceptedAnswer: { '@type': 'Answer', text: '"Not Charging" in the battery menu means macOS is deliberately pausing charging, usually because the battery is above 80% and Optimised Battery Charging is active, or because the charger cannot supply enough power while the system is under heavy load. If it says "not charging" at low battery levels, there is a hardware fault in the charging circuit.' } },
        { '@type': 'Question', name: 'Is liquid damage causing my MacBook not to charge?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, liquid damage is one of the most common causes of MacBook charging failure. Corrosion on the charging IC or USB-C controller chips disrupts power delivery. If your MacBook was recently exposed to liquid and stopped charging, bring it in immediately, corrosion spreads and early cleaning dramatically improves outcomes.' } },
        { '@type': 'Question', name: 'Do you repair MacBook charging faults in Johannesburg?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. ZA Support diagnoses and repairs all MacBook charging faults including cable faults, port damage, charging IC failures, and battery replacement. We collect from Sandton, Rosebank, Fourways, Bryanston, Midrand, and Randburg. Assessment: from R599.' } },
      ],
    },
    'macbook-overheating-fix-johannesburg': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Why is my MacBook overheating?', acceptedAnswer: { '@type': 'Answer', text: 'The most common causes are: dried-out thermal paste that no longer conducts heat efficiently (common on Macs 4+ years old), blocked fan vents from dust accumulation, a background process consuming excessive CPU, and on Intel models, thermal throttling triggered by demanding workloads. Check Activity Monitor for CPU usage above 80% at idle.' } },
        { '@type': 'Question', name: 'How do I know if my MacBook fan is working?', acceptedAnswer: { '@type': 'Answer', text: 'Download a free app such as Macs Fan Control to read your fan RPM directly. Under normal load, MacBook fans run between 1,200 and 2,400 RPM. If your fan shows 0 RPM or a fixed speed regardless of temperature, the fan or its controller has failed. A fan that runs at maximum speed constantly suggests the Mac is hot but cannot cool itself effectively.' } },
        { '@type': 'Question', name: 'Can I replace thermal paste on a MacBook myself?', acceptedAnswer: { '@type': 'Answer', text: 'Technically yes, but it requires full disassembly, correct paste application, and careful reassembly, one mistake and you can damage logic board connectors or strip screws. On Apple Silicon MacBooks the process is more involved than on Intel models. ZA Support performs thermal paste replacement as a standalone service.' } },
        { '@type': 'Question', name: 'My MacBook shuts down randomly, is it overheating?', acceptedAnswer: { '@type': 'Answer', text: 'Random shutdowns are a classic overheating symptom, the T2 chip or Apple Silicon die will trigger an emergency shutdown at a threshold temperature to prevent permanent damage. Check Console.app for kernel panics with thermal references. However, random shutdowns can also be caused by a failing battery or logic board fault, have it assessed to confirm the cause.' } },
        { '@type': 'Question', name: 'Does thermal paste replacement actually help?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, significantly. On a MacBook 4-6 years old, degraded thermal paste can cause temperatures to run 20-30°C higher than necessary. After repasting, many users report sustained performance boosts because the CPU is no longer throttling, quieter fans, and cooler bottom temperatures during normal use.' } },
        { '@type': 'Question', name: 'Where do you repair overheating MacBooks in Johannesburg?', acceptedAnswer: { '@type': 'Answer', text: 'ZA Support is based in Hyde Park, Johannesburg. We diagnose overheating causes, perform thermal paste replacement, clean fan assemblies, and carry out board-level repairs if a component has been damaged by sustained heat. We collect from Sandton, Rosebank, Fourways, Bryanston, Midrand, and Randburg.' } },
      ],
    },
    'macbook-keyboard-not-working': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Why is my MacBook keyboard not working?', acceptedAnswer: { '@type': 'Answer', text: 'Common causes include: liquid damage to the keyboard or logic board, debris under the butterfly mechanism (2015-2019 MacBook Pros), a failed keyboard ribbon cable, or a software driver issue after a macOS update. First check if the keyboard works in another user account, if it does, the issue is software. If it fails everywhere, the fault is hardware.' } },
        { '@type': 'Question', name: 'What is the butterfly keyboard problem?', acceptedAnswer: { '@type': 'Answer', text: 'Apple\'s butterfly keyboard mechanism, used on MacBook Pros from 2015 to 2019, was prone to key failure from dust or debris. Even a tiny particle under a key could cause it to stop registering. Apple extended the warranty on affected models, check your serial number at Apple\'s support page. Keys on butterfly keyboards cannot be individually replaced and require a full keyboard/top case replacement.' } },
        { '@type': 'Question', name: 'Can individual keys be replaced on a MacBook?', acceptedAnswer: { '@type': 'Answer', text: 'On newer scissor-switch keyboards (2020 onwards), individual keycaps can sometimes be replaced if only the cap is damaged. On butterfly keyboards, individual key replacement is not possible, the full top case must be replaced. On any model, if the key switch itself is damaged (not registering any input), the keyboard assembly requires replacement.' } },
        { '@type': 'Question', name: 'My MacBook keyboard types random characters, what is wrong?', acceptedAnswer: { '@type': 'Answer', text: 'Random or stuck characters are almost always caused by liquid damage. Liquid on a keyboard leaves conductive residue that causes phantom keypresses and incorrect characters. Liquid damage repairs require full disassembly and cleaning, simply drying the MacBook is not sufficient. Bring it in immediately for the best recovery outcome.' } },
        { '@type': 'Question', name: 'Will macOS re-install fix a non-working keyboard?', acceptedAnswer: { '@type': 'Answer', text: 'If the keyboard works in macOS Recovery Mode but not in normal macOS, a software fix (reinstalling macOS or creating a new user account) may resolve the issue. If the keyboard does not respond in Recovery Mode or Safe Mode, the fault is hardware and reinstalling will not help.' } },
        { '@type': 'Question', name: 'How much does MacBook keyboard replacement cost in Johannesburg?', acceptedAnswer: { '@type': 'Answer', text: 'Cost varies by model. ZA Support assesses your MacBook from R599 and provides a quote before any work begins. We collect from Sandton, Rosebank, Fourways, Bryanston, Midrand, and Randburg for keyboard repairs.' } },
      ],
    },
    'iphone-screen-repair-cost-johannesburg-2026': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How much does iPhone screen repair cost in Johannesburg in 2026?', acceptedAnswer: { '@type': 'Answer', text: 'iPhone screen repair costs in Johannesburg vary by model. Older models (iPhone 11, 12) are less expensive because parts are more widely available. Newer OLED models (iPhone 15 Pro, 16 Pro Max) carry higher part costs. Contact ZA Support for a model-specific quote. We collect from Sandton, Rosebank, Fourways, Bryanston, Midrand, and Randburg.' } },
        { '@type': 'Question', name: 'Is it worth repairing an older iPhone screen or should I buy a new phone?', acceptedAnswer: { '@type': 'Answer', text: 'If your iPhone is iPhone 12 or newer and is otherwise working well, screen repair is almost always worth it. A repair costs significantly less than a new handset and keeps your data, preferences, and apps intact. If your iPhone is iPhone X or older and has other issues, a replacement may be more cost-effective. We provide an honest assessment.' } },
        { '@type': 'Question', name: 'Do you use genuine Apple screens for iPhone repairs?', acceptedAnswer: { '@type': 'Answer', text: 'We use high-quality OLED replacement screens that match or exceed OEM specifications for brightness, colour accuracy, and touch sensitivity. Aftermarket OLED panels are functionally equivalent for most users. We do not use inferior LCD replacements on OLED models, which would significantly degrade display quality.' } },
        { '@type': 'Question', name: 'Will Face ID still work after a screen replacement?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Face ID is handled by the TrueDepth camera system in the notch, it is not part of the display assembly. Screen replacement does not affect Face ID when performed correctly. We do not remove or disturb the Face ID module during screen repairs.' } },
        { '@type': 'Question', name: 'How long does iPhone screen repair take?', acceptedAnswer: { '@type': 'Answer', text: 'Most iPhone screen repairs are completed within 1-2 hours. For Johannesburg clients, we collect, repair, and return on the same day in most cases.' } },
        { '@type': 'Question', name: 'Do you offer iPhone screen repair with collection from my area?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. ZA Support collects iPhones from Sandton, Rosebank, Fourways, Bryanston, Midrand, Randburg, and surrounding Johannesburg areas for screen repair.' } },
      ],
    },
    'mac-data-recovery-johannesburg': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Can you recover data from a dead MacBook?', acceptedAnswer: { '@type': 'Answer', text: 'In most cases, yes. When a MacBook fails to start due to a logic board fault, the SSD itself is usually intact. We can read the SSD directly to recover your files. Even in cases of liquid damage, the SSD survives in the majority of cases if the MacBook is brought in promptly.' } },
        { '@type': 'Question', name: 'Can deleted files be recovered from a Mac?', acceptedAnswer: { '@type': 'Answer', text: 'Recovery of recently deleted files depends on whether the space has been overwritten. On SSDs with TRIM enabled (all modern Macs), deleted files are quickly zeroed and cannot be recovered with standard tools. Time Machine backups are the only reliable recovery method for deleted files. We can help you check backup status and attempt recovery of recently deleted items.' } },
        { '@type': 'Question', name: 'My Mac SSD failed, is the data recoverable?', acceptedAnswer: { '@type': 'Answer', text: 'SSD failure type determines recoverability. Logical failures (corrupted file system) are recoverable with specialist tools. Physical NAND failures may allow partial recovery. Controller failures are the most difficult. We assess your SSD and give an honest prognosis before any recovery attempt. Assessment: from R599.' } },
        { '@type': 'Question', name: 'How do I prevent losing data on my Mac?', acceptedAnswer: { '@type': 'Answer', text: 'Use Time Machine to an external drive for local backups, and use iCloud or Backblaze for offsite backup. The 3-2-1 rule: 3 copies, 2 different media, 1 offsite. MacBook SSDs are soldered and cannot be replaced on Apple Silicon models, if the logic board fails, data recovery becomes significantly more complex.' } },
        { '@type': 'Question', name: 'How much does Mac data recovery cost in Johannesburg?', acceptedAnswer: { '@type': 'Answer', text: 'ZA Support assesses your Mac from R599. Recovery cost depends on the failure type and complexity. We provide a quote before any recovery work begins and only charge for successful recovery.' } },
        { '@type': 'Question', name: 'Do you collect Macs for data recovery from across Johannesburg?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We collect from Sandton, Rosebank, Fourways, Bryanston, Midrand, Randburg, and surrounding Johannesburg suburbs for data recovery assessments.' } },
      ],
    },
    'macbook-pro-m1-m2-repair-johannesburg': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Is MacBook Pro M1 or M2 repair possible in Johannesburg?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. ZA Support repairs Apple Silicon MacBook Pros in Johannesburg. M1 and M2 repair is more complex than Intel-era repair because the CPU, RAM, and Neural Engine are all integrated on a single die, individual components cannot be replaced. However, charging faults, display repairs, keyboard and trackpad faults, liquid damage cleaning, and data recovery are all possible.' } },
        { '@type': 'Question', name: 'What is different about repairing an Apple Silicon MacBook?', acceptedAnswer: { '@type': 'Answer', text: 'Apple Silicon (M1-M4) MacBooks have unified memory, RAM is on the same chip as the CPU. This means RAM cannot be upgraded post-purchase. The SSD is also soldered on most models. This makes data recovery more complex if the logic board fails. Component-level repair of Apple Silicon boards requires specialist equipment, but charging controllers, display circuits, and peripheral components are still repairable.' } },
        { '@type': 'Question', name: 'Can a MacBook Pro M1 logic board be repaired?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. While the M1 processor itself cannot be swapped (it is integrated), many logic board faults on M1 MacBook Pros are in peripheral circuits, power management ICs, USB-C controllers, display backlight circuits, rather than the processor itself. These are repairable with board-level microsoldering. Assessment: from R599.' } },
        { '@type': 'Question', name: 'Is liquid damage on an M1 or M2 MacBook repairable?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The same ultrasonic cleaning process used on Intel MacBooks applies to Apple Silicon models. The critical difference is the unified memory, if the M1/M2 die itself is damaged by corrosion, data recovery becomes very difficult. Early intervention dramatically improves outcomes. Contact us immediately after a spill.' } },
        { '@type': 'Question', name: 'My M2 MacBook Pro has no display, what could cause this?', acceptedAnswer: { '@type': 'Answer', text: 'Display failure on M2 MacBook Pros can be caused by a failed display backlight circuit (common fault), a damaged display cable at the hinge, a failed display panel, or a logic board fault affecting the display output. Connect an external monitor to isolate, if the external monitor works, the fault is in the display assembly.' } },
        { '@type': 'Question', name: 'Where do you repair M1 and M2 MacBook Pros in Johannesburg?', acceptedAnswer: { '@type': 'Answer', text: 'ZA Support is in Hyde Park, Johannesburg. We collect from Sandton, Rosebank, Fourways, Bryanston, Midrand, and Randburg for Apple Silicon MacBook Pro repairs. Assessment: from R599.' } },
      ],
    },
    'macbook-trackpad-not-clicking': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Why is my MacBook trackpad not clicking?', acceptedAnswer: { '@type': 'Answer', text: 'The most common cause is a swollen battery pressing up against the trackpad from below, preventing physical movement. Other causes include debris under the trackpad, a broken Force Touch actuator, or trackpad firmware corruption. If the trackpad clicks in one corner but not another, mechanical displacement (often from a swollen battery) is the likely cause.' } },
        { '@type': 'Question', name: 'My MacBook trackpad clicks everywhere without me touching it, what is wrong?', acceptedAnswer: { '@type': 'Answer', text: 'Phantom clicks (the trackpad registering clicks without being touched) are almost always caused by liquid damage. Conductive liquid residue on the trackpad sensing circuit creates false touch inputs. This requires cleaning the trackpad and potentially the logic board. Do not use the Mac until repaired, phantom clicks can trigger accidental data deletion.' } },
        { '@type': 'Question', name: 'Can I use my MacBook if the trackpad is stuck?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, temporarily. Connect a USB or Bluetooth mouse and disable the trackpad in System Settings if phantom clicks are occurring. However, if the trackpad is stuck due to a swollen battery, the battery is a safety risk, a swollen battery should not be left in the machine and must be replaced promptly.' } },
        { '@type': 'Question', name: 'Is trackpad replacement expensive?', acceptedAnswer: { '@type': 'Answer', text: 'Trackpad replacement is generally less expensive than logic board repair. ZA Support assesses your MacBook from R599 and provides a quote. In many cases where a swollen battery is the cause, replacing the battery resolves the trackpad issue without a separate trackpad repair.' } },
        { '@type': 'Question', name: 'How do I enable clicking without pressing down (tap-to-click)?', acceptedAnswer: { '@type': 'Answer', text: 'System Settings → Trackpad → enable "Tap to click." This uses a light touch rather than a physical click, which works even if the physical click mechanism is stuck. This is a useful temporary workaround while awaiting a repair.' } },
        { '@type': 'Question', name: 'Do you collect MacBooks for trackpad repair in Johannesburg?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. ZA Support collects MacBooks from Sandton, Rosebank, Fourways, Bryanston, Midrand, Randburg, and surrounding Johannesburg suburbs for trackpad diagnosis and repair.' } },
      ],
    },
    'apple-watch-screen-repair-johannesburg': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Can a cracked Apple Watch screen be repaired?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Apple Watch screen repair is possible for most Series and Ultra models. The repair involves removing the cracked glass or OLED panel and replacing it with a new display assembly. Series 4 and later use OLED panels. Earlier models use OLED or AMOLED depending on the model.' } },
        { '@type': 'Question', name: 'How much does Apple Watch screen repair cost in Johannesburg?', acceptedAnswer: { '@type': 'Answer', text: 'Cost depends on the Apple Watch model, case size, and whether the damage is limited to the glass or includes the OLED panel. Contact ZA Support for a model-specific quote. Assessment: from R599.' } },
        { '@type': 'Question', name: 'Is Apple Watch screen repair worth it?', acceptedAnswer: { '@type': 'Answer', text: 'If your Apple Watch is Series 4 or newer and otherwise functioning well, repair is usually worthwhile. A cracked screen is not just cosmetic, water resistance is compromised when the display seal is broken, and the touchscreen may become less responsive over time. If your watch is Series 3 or older, the cost of repair relative to the watch\'s value may make replacement more practical.' } },
        { '@type': 'Question', name: 'Does Apple Watch repair affect waterproofing?', acceptedAnswer: { '@type': 'Answer', text: 'Professional screen repair includes resealing the display to restore the water resistance rating. A repair that does not reseal correctly will compromise the IP rating. ZA Support includes resealing in our Apple Watch screen repair process.' } },
        { '@type': 'Question', name: 'How long does Apple Watch screen repair take?', acceptedAnswer: { '@type': 'Answer', text: 'Apple Watch screen repairs typically take 1-2 business days at ZA Support in Hyde Park, Johannesburg.' } },
        { '@type': 'Question', name: 'Do you repair Apple Watch in Johannesburg?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. ZA Support repairs Apple Watch screens in Johannesburg. We collect from Sandton, Rosebank, Fourways, Bryanston, Midrand, and Randburg.' } },
      ],
    },
    'ipad-screen-repair-johannesburg-2026': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How much does iPad screen repair cost in Johannesburg in 2026?', acceptedAnswer: { '@type': 'Answer', text: 'iPad screen repair cost depends on the model. Standard iPad (9th/10th gen) screens are less expensive than iPad Pro models with Liquid Retina XDR displays. Contact ZA Support for a model-specific quote. Assessment: from R599 in Hyde Park.' } },
        { '@type': 'Question', name: 'Can an iPad Pro screen be repaired?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. iPad Pro 11-inch and 12.9-inch screens can be repaired. The Liquid Retina XDR display on Pro models is more complex and carries a higher repair cost than standard iPad screens. ProMotion (120Hz) and Apple Pencil compatibility are preserved in quality repairs.' } },
        { '@type': 'Question', name: 'Is it worth repairing a cracked iPad screen?', acceptedAnswer: { '@type': 'Answer', text: 'For iPads in otherwise good condition, screen repair is almost always cheaper than replacement. The iPad\'s glass is under significant tension from the adhesive, a crack will typically spread over time and can compromise the touch digitiser. Early repair is cheaper than deferred repair.' } },
        { '@type': 'Question', name: 'Does iPad screen repair affect Face ID or Touch ID?', acceptedAnswer: { '@type': 'Answer', text: 'Face ID on iPad Pro is in the sensor bar at the top of the device, it is not part of the display assembly and is unaffected by screen replacement. Touch ID on standard iPads is in the home button or the power button, also not affected by screen repair.' } },
        { '@type': 'Question', name: 'How long does iPad screen repair take?', acceptedAnswer: { '@type': 'Answer', text: 'Most iPad screen repairs are completed within 1-3 business days at ZA Support in Hyde Park, Johannesburg. Timeline is confirmed at assessment.' } },
        { '@type': 'Question', name: 'Do you repair iPads in Johannesburg?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. ZA Support repairs iPad screens in Johannesburg. We collect from Sandton, Rosebank, Fourways, Bryanston, Midrand, and Randburg.' } },
      ],
    },
    'mac-mini-repair-johannesburg': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What can be repaired on a Mac Mini?', acceptedAnswer: { '@type': 'Answer', text: 'Mac Mini repairs include: SSD replacement or upgrade (on Intel models with replaceable SSD), RAM upgrade (Intel 2018 Mac Mini only), fan replacement, logic board repair for power faults, and port repairs. The M1 and M2 Mac Mini have soldered SSD and unified memory, RAM cannot be upgraded, but SSD upgrade via board-level work is possible by specialists.' } },
        { '@type': 'Question', name: 'My Mac Mini won\'t turn on, what is wrong?', acceptedAnswer: { '@type': 'Answer', text: 'Common causes for a Mac Mini not turning on: faulty power cable (try a different kettle lead), failed power supply (the internal PSU), a logic board fault, or a corrupted boot volume. Connect a display before concluding the Mac Mini is dead, it may be starting but not displaying. Reset the SMC on Intel models to clear power state issues.' } },
        { '@type': 'Question', name: 'Can I upgrade the RAM in my Mac Mini?', acceptedAnswer: { '@type': 'Answer', text: 'Only the 2018 Intel Mac Mini has user-upgradeable RAM (DDR4 SO-DIMMs). All other Mac Mini models, 2014, 2020 (M1), 2023 (M2), have RAM soldered to the logic board and cannot be upgraded. If your workflow has outgrown your Mac Mini\'s RAM, a new model or an external eGPU solution is the practical path forward.' } },
        { '@type': 'Question', name: 'Is a slow Mac Mini worth upgrading?', acceptedAnswer: { '@type': 'Answer', text: 'An Intel Mac Mini (2018) with a hard drive can be dramatically improved by installing an SSD, this is the most cost-effective upgrade. An M1 Mac Mini that runs slow is usually limited by RAM or the nature of the task, hardware upgrade is not possible, but performance optimisation can help.' } },
        { '@type': 'Question', name: 'How much does Mac Mini repair cost in Johannesburg?', acceptedAnswer: { '@type': 'Answer', text: 'ZA Support assesses Mac Minis from R599 in Hyde Park, Johannesburg. Repair cost depends on the fault. SSD upgrades, power supply replacements, and port repairs are quoted individually after diagnosis.' } },
        { '@type': 'Question', name: 'Do you collect Mac Minis for repair in Johannesburg?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We collect from Sandton, Rosebank, Fourways, Bryanston, Midrand, and Randburg. Mac Minis are small enough to courier, we can also arrange courier collection from further afield.' } },
      ],
    },
    'how-to-check-macbook-battery-health': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How do I check my MacBook battery health?', acceptedAnswer: { '@type': 'Answer', text: 'Hold Option and click the battery icon in the menu bar to see the condition (Normal, Replace Soon, Replace Now, Service Battery). For more detail: Apple menu → System Information → Power → check Cycle Count and Condition. On macOS Ventura and later: System Settings → Battery → Battery Health.' } },
        { '@type': 'Question', name: 'What is a MacBook battery cycle count?', acceptedAnswer: { '@type': 'Answer', text: 'A cycle count is the number of full charge-discharge cycles your battery has completed. A cycle is counted when you use 100% of your battery\'s total charge, whether in one go or across multiple partial charges. Apple designs most MacBook batteries to retain 80% capacity at 1,000 cycles. Beyond 1,000 cycles, capacity degrades noticeably.' } },
        { '@type': 'Question', name: 'When should I replace my MacBook battery?', acceptedAnswer: { '@type': 'Answer', text: 'Replace your battery when: macOS shows "Replace Now" or "Service Battery," the cycle count exceeds 1,000 on modern MacBooks (500 on pre-2013 models), battery life has dropped to less than 3 hours on light use, or you see physical swelling under the trackpad or keyboard. Do not delay replacement if swelling is present, a swollen battery is a safety hazard.' } },
        { '@type': 'Question', name: 'Does a high cycle count mean the battery needs immediate replacement?', acceptedAnswer: { '@type': 'Answer', text: 'Not necessarily. Cycle count alone does not determine replacement, condition does. A battery at 900 cycles showing "Normal" condition may still perform adequately. A battery at 400 cycles showing "Replace Soon" may have degraded faster due to heat exposure or charging habits. Monitor both the count and the condition.' } },
        { '@type': 'Question', name: 'How do I improve MacBook battery life?', acceptedAnswer: { '@type': 'Answer', text: 'Enable Optimised Battery Charging (System Settings → Battery), reduce screen brightness, close unused browser tabs (each tab consumes RAM and CPU), disable unused Bluetooth and WiFi, and avoid charging to 100% regularly. Keeping your MacBook between 20% and 80% charge extends battery longevity significantly.' } },
        { '@type': 'Question', name: 'How much does MacBook battery replacement cost in Johannesburg?', acceptedAnswer: { '@type': 'Answer', text: 'ZA Support replaces MacBook batteries in Hyde Park, Johannesburg. Assessment: from R599. We collect from Sandton, Rosebank, Fourways, Bryanston, Midrand, and Randburg.' } },
      ],
    },
    'macbook-black-screen-on-startup': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Why does my MacBook have a black screen on startup?', acceptedAnswer: { '@type': 'Answer', text: 'A black screen on startup has several causes: the display backlight has failed (the Mac is running but the screen appears dark, test with a torch), a display data cable has failed at the hinge, a logic board GPU fault is preventing display output, or the Mac is not completing POST (power-on self-test). Connect an external monitor to isolate which category the fault falls into.' } },
        { '@type': 'Question', name: 'My MacBook screen is black but I can hear the startup chime, what does this mean?', acceptedAnswer: { '@type': 'Answer', text: 'The startup chime confirms the Mac is attempting to start. A black screen with a chime means the fault is in the display path, not the main logic board. Causes: failed display backlight, broken display cable (common at the hinge), or a failed display panel. Shine a torch at an angle to the screen, if you can see a faint image, the backlight is the fault.' } },
        { '@type': 'Question', name: 'My MacBook Pro 2019 screen goes black randomly, is this a known fault?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The 2016-2019 MacBook Pro "Flexgate" issue causes display cable failure through repeated hinge use. Symptoms include a black screen at certain lid angles, a stage-light effect at the bottom of the display, or intermittent display loss. Apple extended the service programme on some affected models, check your serial at apple.com/support.' } },
        { '@type': 'Question', name: 'Can a MacBook black screen be caused by a software problem?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. A corrupted macOS installation or failed graphics driver can cause a black screen post-login. Boot into Recovery Mode (Command + R on Intel, hold Power on Apple Silicon), if the Recovery screen displays correctly, the fault is software. If Recovery also shows a black screen, the fault is hardware.' } },
        { '@type': 'Question', name: 'How much does MacBook display repair cost in Johannesburg?', acceptedAnswer: { '@type': 'Answer', text: 'Cost varies by fault type. A display cable replacement is less expensive than a full panel replacement. ZA Support assesses your MacBook from R599 in Hyde Park, Johannesburg, and provides a repair quote before any work begins.' } },
        { '@type': 'Question', name: 'Do you repair MacBook black screen faults in Johannesburg?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. ZA Support diagnoses and repairs MacBook black screen faults in Johannesburg. We collect from Sandton, Rosebank, Fourways, Bryanston, Midrand, and Randburg.' } },
      ],
    },
    'liquid-damage-macbook-johannesburg-cost': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How much does MacBook liquid damage repair cost in Johannesburg?', acceptedAnswer: { '@type': 'Answer', text: 'MacBook liquid damage repair costs vary significantly by damage severity. Ultrasonic cleaning with no failed components can be relatively affordable. If chips or traces have been burned by corrosion, board-level microsoldering is required. ZA Support assesses from R599, this covers full disassembly, ultrasonic cleaning, and a detailed repair quote. No work proceeds without your written approval.' } },
        { '@type': 'Question', name: 'Does MacBook liquid damage repair cost more than a new MacBook?', acceptedAnswer: { '@type': 'Answer', text: 'For recent MacBook models (2019 onwards), component-level board repair is almost always significantly cheaper than replacement. New MacBook Pros start from R25,000. Even a complex liquid damage repair is a fraction of this cost. The exception is catastrophic corrosion damage across multiple chips on an older machine where the repair cost approaches the device value.' } },
        { '@type': 'Question', name: 'My MacBook is working after a spill, do I still need to bring it in?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, urgently. Corrosion is a chemical process that continues after the liquid evaporates. A MacBook that appears to work after a spill will typically develop faults within 24-72 hours as corrosion bridges circuits. Early cleaning costs significantly less than repairs after corrosion damage has spread.' } },
        { '@type': 'Question', name: 'Does insurance cover MacBook liquid damage in South Africa?', acceptedAnswer: { '@type': 'Answer', text: 'Many contents insurance and device insurance policies in South Africa cover accidental liquid damage. You will typically need a repair quote or assessment report from a repair centre. ZA Support provides written assessment reports for insurance purposes.' } },
        { '@type': 'Question', name: 'Can my data be recovered after liquid damage?', acceptedAnswer: { '@type': 'Answer', text: 'In most cases yes. The SSD is separate from the logic board\'s most liquid-vulnerable components and survives in the majority of cases. Even on Apple Silicon models where the SSD is integrated, data recovery is often possible when the damage is limited to peripheral circuits.' } },
        { '@type': 'Question', name: 'How long does MacBook liquid damage repair take?', acceptedAnswer: { '@type': 'Answer', text: 'Ultrasonic cleaning and initial assessment: typically 24-48 hours. Board-level repair following cleaning: 2-5 business days depending on component availability and damage complexity. ZA Support confirms turnaround time after assessment in Hyde Park, Johannesburg.' } },
      ],
    },
    'when-to-replace-vs-repair-macbook': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How do I decide whether to repair or replace my MacBook?', acceptedAnswer: { '@type': 'Answer', text: 'Use the 50% rule as a starting point: if the repair cost exceeds 50% of the machine\'s current value, replacement deserves serious consideration. But also factor in: the age of the machine, whether it runs the latest macOS, whether it meets your current performance needs, and whether there are other known issues. A 2019 MacBook Pro with a R3,000 repair is almost certainly worth fixing.' } },
        { '@type': 'Question', name: 'At what age should I stop repairing a MacBook?', acceptedAnswer: { '@type': 'Answer', text: 'Apple designates Macs as "vintage" at 5 years and "obsolete" at 7 years (no longer serviced by Apple). However, a 2017 MacBook Pro running Sequoia performs adequately for most users. The practical decision point is macOS support, when Apple stops issuing security updates for your macOS version, the machine is a security risk in business environments.' } },
        { '@type': 'Question', name: 'Is it worth repairing an Intel MacBook when M-series Macs exist?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, in most cases. Apple Silicon Macs are significantly faster, but a repaired Intel MacBook still handles web, documents, and communication tasks well. If your work is CPU or GPU-intensive (video editing, 3D rendering, large Xcode builds), upgrading to Apple Silicon delivers real-world productivity gains. For general use, a repaired Intel Mac has years of service life remaining.' } },
        { '@type': 'Question', name: 'What MacBook repairs are always worth doing?', acceptedAnswer: { '@type': 'Answer', text: 'Battery replacement is almost always worth doing on a MacBook in otherwise good condition, it is the single component most likely to fail with age and restores the Mac to portable use. SSD upgrades on Intel machines with spinning drives or slow original SSDs are also high-value. These repairs extend machine life by 3-5 years for a fraction of replacement cost.' } },
        { '@type': 'Question', name: 'Where can I get an honest repair vs replace assessment in Johannesburg?', acceptedAnswer: { '@type': 'Answer', text: 'ZA Support provides honest assessment reports in Hyde Park, Johannesburg. Assessment: from R599. We do not profit from recommending replacement over repair, our revenue comes from repairs, so our incentive is to repair when it makes sense for the client.' } },
        { '@type': 'Question', name: 'Do you buy MacBooks for trade-in?', acceptedAnswer: { '@type': 'Answer', text: 'Contact ZA Support to discuss device options. We primarily provide repair services but can advise on the most cost-effective path for your specific situation.' } },
      ],
    },
    'macbook-ssd-upgrade-johannesburg': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Which MacBook models can have their SSD upgraded?', acceptedAnswer: { '@type': 'Answer', text: 'Intel MacBook Pros (2013-2019) and Intel MacBook Airs (2013-2017) have replaceable SSDs. MacBook Airs from 2018 onwards and MacBook Pros from 2016 with the Touch Bar have soldered SSDs that cannot be conventionally upgraded. Apple Silicon MacBooks (M1-M4) have soldered storage integrated with the processor die, traditional upgrade is not possible.' } },
        { '@type': 'Question', name: 'How much faster is an SSD upgrade on an older MacBook?', acceptedAnswer: { '@type': 'Answer', text: 'An SSD upgrade on an older MacBook with a slow original SSD or spinning hard drive is transformative. Boot times drop from minutes to seconds. App launch times improve by 5-10x. The Finder and file operations become near-instant. For many users, an SSD upgrade extends the usable life of a Mac by 3-5 years.' } },
        { '@type': 'Question', name: 'What SSD sizes are available for MacBook upgrades?', acceptedAnswer: { '@type': 'Answer', text: 'For upgradeable Intel MacBooks, replacement SSDs are typically available in 256 GB, 512 GB, 1 TB, and 2 TB capacities. The specific options depend on your model and connector type (PCIe vs M.2 NVMe). ZA Support advises on the correct upgrade for your model.' } },
        { '@type': 'Question', name: 'Do I lose my data during an SSD upgrade?', acceptedAnswer: { '@type': 'Answer', text: 'A MacBook SSD upgrade can be performed with full data migration: we clone your old SSD to the new one, install the new SSD, and verify all data has transferred before returning the machine. Your data, apps, and settings migrate intact.' } },
        { '@type': 'Question', name: 'How much does a MacBook SSD upgrade cost in Johannesburg?', acceptedAnswer: { '@type': 'Answer', text: 'ZA Support performs MacBook SSD upgrades in Hyde Park, Johannesburg. Cost depends on your MacBook model and the SSD capacity you choose. Assessment: from R599. Collection from Sandton, Rosebank, Fourways, Bryanston, Midrand, and Randburg.' } },
        { '@type': 'Question', name: 'Can you upgrade a MacBook SSD and transfer everything to the new drive?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We perform a full clone of your existing SSD to the new drive before installation. All your applications, settings, files, and preferences transfer to the upgraded storage with no reinstallation required.' } },
      ],
    },
    'imac-repair-johannesburg': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What iMac faults can be repaired in Johannesburg?', acceptedAnswer: { '@type': 'Answer', text: 'ZA Support repairs iMacs for: screen cracks or dead displays, logic board faults, SSD upgrades (on Intel models), GPU failures, power supply failures, RAM upgrades (Intel non-Retina models), and liquid damage. The 2021 and 2023 M1/M3 iMacs have more integrated designs that limit some upgrade paths.' } },
        { '@type': 'Question', name: 'My iMac screen is cracked, can it be repaired?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. iMac screen replacement requires removing the display glass (held by magnets on older models, adhesive on newer ones), replacing the panel or glass, and resealing. It is a delicate repair that requires specialist tools to avoid secondary damage to internal components. Assessment: from R599.' } },
        { '@type': 'Question', name: 'My iMac won\'t turn on, what should I check first?', acceptedAnswer: { '@type': 'Answer', text: 'First check the power cable and wall socket. Plug a different device into the same outlet to confirm power. Press and hold the power button for 10 seconds to force a reset. If there is no response at all (no fan, no light), the internal power supply may have failed. iMac PSU failure is a relatively common fault and is repairable.' } },
        { '@type': 'Question', name: 'Can an iMac logic board be repaired?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. iMac logic board faults, GPU failures, charging circuits, power management, can be repaired at the board level. ZA Support performs component-level iMac logic board repair in Johannesburg. Assessment: from R599.' } },
        { '@type': 'Question', name: 'Is it worth repairing an older iMac?', acceptedAnswer: { '@type': 'Answer', text: 'Intel iMacs from 2015-2019 that run current macOS are worth repairing for typical home and office use. A 2019 5K iMac is still a capable machine, replacing its SSD or repairing its display is far cheaper than buying a new M3 iMac. The 2021 M1 iMac is worth repairing for any non-catastrophic fault.' } },
        { '@type': 'Question', name: 'Do you collect iMacs for repair in Johannesburg?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We collect iMacs from across Johannesburg including Sandton, Rosebank, Fourways, Bryanston, Midrand, and Randburg. We provide appropriate packing materials and handle iMacs with care during transit.' } },
      ],
    },
    'macbook-speaker-not-working': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Why is there no sound from my MacBook speakers?', acceptedAnswer: { '@type': 'Answer', text: 'Start with software checks: volume is not muted (press F12), output device in System Settings → Sound → Output is set to MacBook Speakers (not headphones or external device), and the audio cable has not been detected incorrectly. If software checks pass and there is still no sound, the speaker cable, speaker unit, or audio amplifier chip may have failed.' } },
        { '@type': 'Question', name: 'My MacBook only plays sound through headphones, not speakers, what is wrong?', acceptedAnswer: { '@type': 'Answer', text: 'This usually means macOS believes headphones are plugged in when they are not. The audio jack may be stuck in headphone mode from debris or a damaged headphone sensor. Try inserting and removing a headphone plug several times. Also try: System Settings → Sound → Output, if "Headphones" is shown with nothing plugged in, the headphone jack sensor is stuck.' } },
        { '@type': 'Question', name: 'Can liquid damage cause MacBook speaker failure?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The speaker audio path runs through the logic board\'s audio amplifier chip. Liquid corrosion on this chip is a common cause of speaker failure after a spill. Speaker failure alongside other post-spill symptoms (charging issues, keyboard faults) confirms liquid damage to the board.' } },
        { '@type': 'Question', name: 'Are MacBook speakers replaceable?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. MacBook speaker units are separate components connected to the logic board via ribbon cables. Speaker replacement is a moderately complex repair requiring partial disassembly but is significantly less expensive than logic board repair.' } },
        { '@type': 'Question', name: 'How much does MacBook speaker repair cost in Johannesburg?', acceptedAnswer: { '@type': 'Answer', text: 'ZA Support diagnoses MacBook speaker faults in Hyde Park, Johannesburg. Assessment: from R599. Speaker replacement cost depends on the model and whether the fault is in the speaker itself or the audio amplifier circuit on the logic board.' } },
        { '@type': 'Question', name: 'Do you repair MacBook audio issues in Johannesburg?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. ZA Support repairs MacBook speaker failures, audio jack faults, and audio amplifier chip failures. We collect from Sandton, Rosebank, Fourways, Bryanston, Midrand, and Randburg.' } },
      ],
    },
    'airpods-repair-johannesburg': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Can AirPods be repaired in Johannesburg?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. ZA Support repairs AirPods in Johannesburg. Common repairs include battery replacement (the most frequent fault as batteries degrade with age), fixing one-side audio failures, and addressing charging case issues. Contact us with your AirPods model for availability.' } },
        { '@type': 'Question', name: 'Why is one AirPod not working?', acceptedAnswer: { '@type': 'Answer', text: 'One-sided AirPod failure is usually caused by: a dead battery in one AirPod (charge both in the case for 15+ minutes and test again), debris over the speaker mesh blocking audio, a failed speaker or microphone, or a pairing issue. Try resetting your AirPods (hold the case button for 15 seconds until the LED flashes amber) before concluding hardware fault.' } },
        { '@type': 'Question', name: 'Can AirPod batteries be replaced?', acceptedAnswer: { '@type': 'Answer', text: 'AirPod battery replacement is technically challenging, the AirPods are glued shut and batteries are small and fragile. Professional replacement is required. ZA Support performs AirPod battery replacement where the model and condition makes repair viable.' } },
        { '@type': 'Question', name: 'My AirPods are not connecting, how do I fix this?', acceptedAnswer: { '@type': 'Answer', text: 'Try these steps in order: (1) Place AirPods in the case, close and reopen the lid near your iPhone, (2) Reset by holding the case button for 15 seconds until amber LED flashes, (3) Go to Bluetooth settings, forget the AirPods, and re-pair, (4) Reset network settings on iPhone. If one AirPod consistently fails to connect after these steps, it has a hardware fault.' } },
        { '@type': 'Question', name: 'How much does AirPod repair cost in Johannesburg?', acceptedAnswer: { '@type': 'Answer', text: 'AirPod repair cost in Johannesburg depends on the model (AirPods 2, 3, Pro, Max) and the fault. Contact ZA Support for a model-specific assessment. In cases where repair cost approaches replacement cost, we will advise honestly.' } },
        { '@type': 'Question', name: 'Are AirPods Pro worth repairing?', acceptedAnswer: { '@type': 'Answer', text: 'AirPods Pro are more expensive to replace than standard AirPods, making repair relatively more worthwhile. Battery degradation is the most common fault. If your AirPods Pro battery life has dropped significantly, battery replacement can restore them to near-new performance.' } },
      ],
    },
    'macbook-wifi-keeps-disconnecting': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Why does my MacBook keep dropping the WiFi connection?', acceptedAnswer: { '@type': 'Answer', text: 'Common causes: your router is on a congested channel (switch to 5GHz if available), macOS has a corrupted network preference file, a conflicting VPN or firewall is interrupting the connection, or the WiFi card or antenna has developed a hardware fault. Start with software troubleshooting before assuming hardware failure.' } },
        { '@type': 'Question', name: 'How do I fix MacBook WiFi dropping?', acceptedAnswer: { '@type': 'Answer', text: 'In order: (1) Forget the network and reconnect, (2) Delete WiFi preference files at /Library/Preferences/SystemConfiguration/ (remove com.apple.network.identification.plist and preferences.plist, then restart), (3) Reset SMC on Intel Macs, (4) Create a new network location in System Settings → Network, (5) Test with a different router to isolate if the issue is Mac or router. If all software fixes fail, the WiFi card may be failing.' } },
        { '@type': 'Question', name: 'Can liquid damage cause MacBook WiFi to fail?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The WiFi/Bluetooth card in most MacBooks connects to the logic board via a cable, and the logic board\'s WiFi circuit can be affected by liquid corrosion. If your MacBook started dropping WiFi after a spill, liquid damage to the wireless circuit is the likely cause.' } },
        { '@type': 'Question', name: 'My MacBook shows full WiFi bars but has no internet, is this a Mac problem?', acceptedAnswer: { '@type': 'Answer', text: 'No, this almost always indicates a router or ISP issue rather than a Mac fault. Full WiFi signal means you are connected to the router. No internet means the router cannot reach the internet. Test another device on the same network. If other devices also have no internet, the fault is your router or ISP, not your MacBook.' } },
        { '@type': 'Question', name: 'Can the MacBook WiFi card be replaced?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. On most Intel MacBooks, the WiFi/Bluetooth card (AirPort card) is a replaceable module. On Apple Silicon MacBooks, WiFi is integrated into the logic board and requires board-level repair if it fails. ZA Support assesses and advises on the correct repair approach for your model.' } },
        { '@type': 'Question', name: 'Do you repair MacBook WiFi faults in Johannesburg?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. ZA Support diagnoses and repairs MacBook WiFi issues in Hyde Park, Johannesburg. Assessment: from R599. We collect from Sandton, Rosebank, Fourways, Bryanston, Midrand, and Randburg.' } },
      ],
    },
    'macbook-logic-board-symptoms-johannesburg': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What are the warning signs of MacBook logic board failure?', acceptedAnswer: { '@type': 'Answer', text: 'The 8 most common warning signs are: (1) random kernel panics, (2) Mac starts but screen stays black, (3) repeated startup failures, (4) GPU distortion or artifacting, (5) USB/Thunderbolt ports stopped working, (6) no charging detected, (7) fans running at maximum speed permanently, (8) specific apps crashing consistently. Multiple symptoms together strongly suggest logic board involvement.' } },
        { '@type': 'Question', name: 'Can a failing MacBook logic board be repaired?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. ZA Support specialises in component-level MacBook logic board repair in Johannesburg. Most logic board faults are in specific chips, power management ICs, USB controllers, GPU circuits, rather than the entire board. Component-level repair replaces only what is broken, at a fraction of the cost of board replacement.' } },
        { '@type': 'Question', name: 'How much does MacBook logic board repair cost in Johannesburg?', acceptedAnswer: { '@type': 'Answer', text: 'Component-level logic board repair at ZA Support starts from significantly less than the R4,499 charged for board swaps at Mac Shack and far less than the R15,000-R70,000 Apple charges for board replacement. Assessment: from R599 in Hyde Park, Johannesburg.' } },
        { '@type': 'Question', name: 'What causes MacBook logic board failure?', acceptedAnswer: { '@type': 'Answer', text: 'The most common causes are: liquid damage (corrosion burns traces and chips over days to weeks), power surges during load shedding (common in South Africa), manufacturing defects in specific batches, thermal damage from years of high-temperature operation, and physical damage from drops.' } },
        { '@type': 'Question', name: 'My MacBook was working and then just stopped, is this the logic board?', acceptedAnswer: { '@type': 'Answer', text: 'Sudden complete failure (working one moment, completely dead the next) with no prior warning is often a power management failure on the logic board, a catastrophic component failure, or a result of a power surge. Unlike mechanical failures that degrade gradually, electronic failures can be instantaneous. Assessment determines the specific component at fault.' } },
        { '@type': 'Question', name: 'How do I get a MacBook logic board repaired in Johannesburg?', acceptedAnswer: { '@type': 'Answer', text: 'ZA Support performs MacBook logic board repair in Hyde Park, Johannesburg. Contact us via [WhatsApp on 064 529 5863](https://wa.me/27645295863) or call us. We collect from Sandton, Rosebank, Fourways, Bryanston, Midrand, Randburg, and surrounding areas. Assessment: from R599.' } },
      ],
    },
    'apple-prepping-ios-26-4-1-update-for-iphone-south-africa-2026': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Why should I install iOS 26.4.1 on my iPhone?', acceptedAnswer: { '@type': 'Answer', text: 'iOS 26.4.1 is a maintenance release that fixes security vulnerabilities, stability issues, performance bugs, and compatibility problems discovered after iOS 26.4. Delaying updates can cause your iPhone to work harder than necessary, generating excess heat and draining the battery aggressively, which may lead to logic board degradation or battery failure over time.' } },
        { '@type': 'Question', name: 'Can a software bug actually damage my iPhone hardware?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. A buggy iOS version can cause your iPhone to generate excess heat, drain the battery aggressively, or push components beyond safe operating limits. Over time, this stress leads to logic board degradation, battery failure requiring R1,200+ replacement, thermal damage, and increased vulnerability to liquid damage. At ZA Support in Johannesburg, we regularly see hardware damage that timely software updates could have prevented.' } },
        { '@type': 'Question', name: 'How do I safely install iOS 26.4.1 in South Africa?', acceptedAnswer: { '@type': 'Answer', text: 'Charge your iPhone to at least 50%, back up to iCloud or your computer via Finder, close running apps, and ensure at least 5GB of free storage. Connect to WiFi, go to Settings, General, Software Update, and tap Download and Install. Avoid updating during load shedding or right before important meetings. Updates often roll out overnight South African time.' } },
        { '@type': 'Question', name: 'What does a ZA Support Health Check include for iPhones?', acceptedAnswer: { '@type': 'Answer', text: 'A Health Check from ZA Support costs R599 and includes verifying your iOS is current and stable, checking for heat damage or early warning signs, testing battery health, and identifying apps causing software conflicts. This assessment helps catch issues before they become expensive hardware repairs.' } },
        { '@type': 'Question', name: 'How much does iPhone logic board repair cost in Johannesburg?', acceptedAnswer: { '@type': 'Answer', text: 'At ZA Support in Johannesburg, logic board repairs start from R2,499 and liquid damage repairs from R1,999. By comparison, Apple Store repairs can run R15,000 to R70,000 depending on severity, and Mac Shack charges R4,499 and upwards. A simple iOS update takes 10 minutes whilst a logic board repair takes days.' } },
        { '@type': 'Question', name: 'Should I update iOS during load shedding?', acceptedAnswer: { '@type': 'Answer', text: 'No. Avoid updating your iPhone during load shedding as power interruptions during an update can corrupt the operating system. iOS updates often roll out during US business hours, arriving overnight in South Africa. Update while your iPhone is plugged in overnight for the safest experience. If your iPhone has suffered damage from power surges, contact ZA Support on 064 529 5863.' } },
      ],
    },
    'these-are-my-favorite-macbook-neo-accessories-after-one-south-africa-2026': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What are the best accessories for the MacBook Neo in South Africa?', acceptedAnswer: { '@type': 'Answer', text: 'The essential accessories for a MacBook Neo in South Africa include a cooling pad (R250-R800) to prevent thermal throttling in Johannesburg heat, a USB-C hub (R600-R1,200) for additional ports, a USB-C power bank (R400-R900) for load shedding protection, a protective sleeve (R300-R700) for moisture resistance, and an external monitor (R2,500-R6,000) for productivity. Total investment is approximately R2,250, less than one emergency repair.' } },
        { '@type': 'Question', name: 'Why is a cooling pad important for MacBooks in Johannesburg?', acceptedAnswer: { '@type': 'Answer', text: 'South Africa summers are harsh, and the MacBook Neo compact design concentrates heat efficiently. Passive cooling prevents thermal throttling during video calls or document processing. Sustained heat also accelerates battery degradation. Quality cooling pads range from R250 to R800 and the investment pays for itself in performance stability and longevity.' } },
        { '@type': 'Question', name: 'How does load shedding affect MacBook hardware?', acceptedAnswer: { '@type': 'Answer', text: 'Load shedding creates power surges and unexpected shutdowns that can damage logic boards, corrupt data, and stress power management circuits. A USB-C power bank (R400-R900) prevents data loss during unexpected shutdowns. Unlike screen replacements (often R1,999+ at competitors) or logic board repairs (R2,499 at ZA Support), a power bank is a preventative investment.' } },
        { '@type': 'Question', name: 'How much does MacBook liquid damage repair cost?', acceptedAnswer: { '@type': 'Answer', text: 'Liquid damage repairs at ZA Support cost R1,999. Liquid exposure remains the leading cause of motherboard failure in MacBooks. A quality protective sleeve costs R300-R700 and provides moisture resistance and shock absorption, making prevention significantly more economical than repair.' } },
        { '@type': 'Question', name: 'What is included in a ZA Support MacBook Health Check?', acceptedAnswer: { '@type': 'Answer', text: 'A ZA Support Health Check costs R599 and provides a complete system assessment including battery health, thermal performance, storage integrity, and identification of any developing issues. This diagnostic helps catch problems before they become expensive, especially for MacBook Neo users in Johannesburg climate conditions.' } },
        { '@type': 'Question', name: 'Is the MacBook Neo worth buying in South Africa?', acceptedAnswer: { '@type': 'Answer', text: 'At R3,499 to R4,999 the MacBook Neo delivers solid specs for South African professionals without the flagship premium. Protecting it with sensible accessories, cooling, backup power, external storage, makes it a long-term investment rather than a temporary workaround. If issues arise, ZA Support offers logic board repairs at R2,499 and liquid damage assessment from R1,999.' } },
      ],
    },
    'discounted-ipad-pro-hits-apple-refurb-store-with-last-g-south-africa-2026': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Is it better to buy a refurbished Mac or repair my existing one?', acceptedAnswer: { '@type': 'Answer', text: 'If the repair costs less than 40% of replacement cost, repair almost always wins. A logic board repair at R2,499 is drastically cheaper than replacing a MacBook Pro that costs R25,000 to R45,000 new. Apple refurbished devices save only 10-15% on retail price and carry just a one-year warranty, which is often insufficient for Johannesburg climate conditions.' } },
        { '@type': 'Question', name: 'How much does a Mac Health Check cost at ZA Support?', acceptedAnswer: { '@type': 'Answer', text: 'A Health Check at ZA Support costs R599 and runs nine diagnostic points including battery health, thermal performance, storage integrity, liquid damage markers, keyboard and trackpad responsiveness, display functionality, RAM stability, logic board micro-faults, and firmware or software issues. Many Johannesburg users discover their Mac just needs cleaning or optimisation rather than replacement.' } },
        { '@type': 'Question', name: 'What is the difference between Apple Store and ZA Support repair costs?', acceptedAnswer: { '@type': 'Answer', text: 'Apple Store repairs range from R15,000 to R70,000 depending on model and issue, with long turnaround times of 2-4 weeks. Mac Shack charges R4,499 to R12,000 for common repairs. ZA Support offers targeted transparent pricing: R599 Health Check, R1,999 liquid damage repair, and R2,499 logic board repair, with same-day or next-day turnaround for most jobs.' } },
        { '@type': 'Question', name: 'Are Apple refurbished devices available in South Africa?', acceptedAnswer: { '@type': 'Answer', text: 'Apple refurbished stock is sometimes available locally but usually ships from international warehouses with shipping costs built into pricing. You are also buying last-generation specs at reduced prices, meaning slower performance for the same money. A refurbished 2022 MacBook Air will not perform like a new 2026 model, whilst repairing your existing 2022 model often costs one-tenth as much.' } },
        { '@type': 'Question', name: 'When should I buy refurbished instead of repairing?', acceptedAnswer: { '@type': 'Answer', text: 'Refurbished devices make sense if you want a specific older model for software compatibility, your current device is truly unsalvageable with parts unavailable, you need backup hardware immediately, or you are buying for secondary use such as kids or travel. For primary work devices in Johannesburg, repair and optimisation almost always wins on cost, reliability, and environmental impact.' } },
        { '@type': 'Question', name: 'Can ZA Support repair liquid damage on my Mac?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. ZA Support offers liquid damage repair starting from R1,999 in our Hyde Park workshop. Many users discover their Mac has hidden liquid damage from old spills that causes intermittent issues. Our Health Check (R599) can detect liquid damage markers even from previous incidents, helping you make an informed decision about repair versus replacement.' } },
      ],
    },
    'iphone-18-s-biggest-design-change-will-be-new-colors-sa-south-africa-2026': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What new colours will the iPhone 18 come in?', acceptedAnswer: { '@type': 'Answer', text: 'Reports suggest Apple is introducing bolder, more vibrant finishes for the iPhone 18 lineup. The iPhone 18 Pro is reportedly dropping the black finish entirely, with options expected to include blue, orange, silver, and other new variants. This marks the biggest visual shift in iPhone design in years.' } },
        { '@type': 'Question', name: 'Does iPhone colour choice affect device durability?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Lighter colours show fingerprints and dust more easily, prompting more frequent cleaning. Darker colours hide wear better but absorb more heat in Johannesburg summer sun, potentially affecting battery health and internal components. Neutral colours like silver and space grey historically hold better resale value in the South African second-hand market.' } },
        { '@type': 'Question', name: 'How much does iPhone repair cost in South Africa?', acceptedAnswer: { '@type': 'Answer', text: 'Repair costs vary significantly by provider. Apple Store repairs in South Africa can reach R15,000 to R70,000 depending on the issue. Mac Shack charges R4,499 and upwards for comparable fixes. ZA Support offers Health Checks from R599, liquid damage repair from R1,999, and logic board repair from R2,499 with honest pricing and expert diagnostics.' } },
        { '@type': 'Question', name: 'How can I protect my new iPhone 18 from damage?', acceptedAnswer: { '@type': 'Answer', text: 'Invest in a screen protector (R200-R500) and quality case (R300-R800) immediately. Avoid all-white finishes in dusty areas, and use a case with darker colours to reduce thermal stress. Consider AppleCare+ for accidental damage coverage. Visit ZA Support for a Health Check (R599) within the first month to assess battery, screen brightness, and hardware integrity.' } },
        { '@type': 'Question', name: 'When will the iPhone 18 be available in South Africa?', acceptedAnswer: { '@type': 'Answer', text: 'Apple typically releases new iPhones in September globally. South African Apple retailers usually receive stock within 2-4 weeks of international launch. Expect announcements in late August with pre-orders opening immediately after, making September or October realistic for local availability.' } },
        { '@type': 'Question', name: 'Does Johannesburg climate affect iPhone battery health?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Johannesburg intense sun causes darker iPhones to absorb more heat, which can degrade battery performance faster. Regular Health Checks (R599 at ZA Support) monitor battery health and catch issues before they become expensive. Our Hyde Park workshop sees increased battery-related repairs during summer months.' } },
      ],
    },
    'apple-adds-apple-tv-and-ipad-mini-models-to-obsolete-pr-south-africa-2026': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What does it mean when Apple marks a device as obsolete?', acceptedAnswer: { '@type': 'Answer', text: 'When Apple designates a product as obsolete, it means the device stopped being sold more than seven years ago. Hardware repair support through Apple Authorised Service Providers ends completely. Your device will not suddenly stop working, but official repairs, spare parts, and support options effectively disappear. In South Africa, local Authorised Service Providers follow these classifications with no exceptions.' } },
        { '@type': 'Question', name: 'Which Apple devices were recently added to the obsolete list?', acceptedAnswer: { '@type': 'Answer', text: 'Apple has added the Apple TV HD and several iPad mini models to the discontinued support category. This means official hardware repair support through Apple Authorised Service Providers is no longer available for these devices, leaving owners to seek independent repair specialists.' } },
        { '@type': 'Question', name: 'Can obsolete Apple devices still be repaired in Johannesburg?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Whilst Apple Authorised Service Providers cannot repair obsolete devices, independent specialists like ZA Support can often save devices that Apple has officially abandoned. We offer logic board repair from R2,499 and liquid damage remediation from R1,999, extending device life and preserving your investment long after official support ends.' } },
        { '@type': 'Question', name: 'How much do repairs cost for obsolete Apple devices?', acceptedAnswer: { '@type': 'Answer', text: 'Independent repair shops fill the gap when official channels close. Mac Shack charges R4,499 and upward for repairs. Apple Store repairs on unsupported devices can exceed R15,000 to R70,000. ZA Support offers transparent pricing with a Health Check from R599 to diagnose issues, logic board repair from R2,499, and liquid damage repair from R1,999.' } },
        { '@type': 'Question', name: 'Should I repair or replace my obsolete Apple device?', acceptedAnswer: { '@type': 'Answer', text: 'Consider three questions: does the device still serve its purpose, are repairs needed now, and have you considered your exit strategy. A Health Check (R599) identifies emerging problems whilst repair options still exist. Once a device is officially obsolete, preventative maintenance becomes exponentially more important as there is no safety net of official repairs.' } },
        { '@type': 'Question', name: 'Why do Apple obsolescence classifications affect South African users differently?', acceptedAnswer: { '@type': 'Answer', text: 'Apple products cost substantially more in South Africa due to import duties and VAT. A device representing a significant initial investment becomes difficult to repair the moment it loses official support. Many South African users depend on devices functioning reliably for five to seven years, unlike markets where device replacement cycles are faster and cheaper.' } },
      ],
    },
    'sunday-reboot-addiction-vr-and-how-the-iphone-air-doesn-south-africa-2026': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How do I know if my Mac has liquid damage?', acceptedAnswer: { '@type': 'Answer', text: 'Common signs include erratic keyboard behaviour, keys that do not respond, screen flickering, or the Mac shutting down randomly. If your MacBook has been near water, even steam from a cup of tea, bring it to ZA Support immediately. We can assess damage within an hour, often before it spreads to other components.' } },
        { '@type': 'Question', name: 'Is my MacBook Pro affected by load shedding?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Power surges during load shedding can damage your logic board. Use a UPS (uninterruptible power supply) costing R800 to R1,500 to protect expensive Macs, this investment saves you R25,000 in potential repairs. Always shut down properly and do not force shut down during brownouts.' } },
        { '@type': 'Question', name: 'Can I game on my MacBook Air with Apple Vision Pro?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, but be cautious. Ensure your Mac is not running hot, update macOS, and do not game for more than 2 to 3 hours continuously. Let it cool between sessions. If your Mac feels hot to the touch, bring it in for assessment. Thermal paste degradation is fixable and affordable if caught early.' } },
        { '@type': 'Question', name: 'What is the difference between ZA Support and Mac Shack or Apple Store?', acceptedAnswer: { '@type': 'Answer', text: 'Apple Store is official but slow (2 to 4 weeks) and expensive. Mac Shack charges R4,499 and upwards for logic board work. ZA Support is local, fast (48 hours in the Johannesburg area), affordable (from R2,499 for logic board repair), and provides written 12-month warranties. Our From R599 assessment guarantee means you do not pay if we cannot fix it.' } },
        { '@type': 'Question', name: 'How often should I get my Mac serviced?', acceptedAnswer: { '@type': 'Answer', text: 'Every 12 to 18 months if you are a heavy user. If you game, edit video, or live in dusty areas, annual thermal maintenance is wise. Light users can go 2 years. A Health Check annually (R599) catches problems before they become expensive failures.' } },
        { '@type': 'Question', name: 'Should I upgrade to macOS 26 if my Mac is older?', acceptedAnswer: { '@type': 'Answer', text: 'Not necessarily. If your Mac is 5 or more years old (pre-M1), upgrading may slow it down. ZA Support can assess whether an upgrade makes sense for your specific hardware, or help you optimise your current OS instead. A Health Check (R599) provides clarity on your best path forward.' } },
      ],
    },
    'm5-macbook-air-review-incremental-update-but-the-best-b-south-africa-2026': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Is the M5 MacBook Air worth buying in South Africa in 2026?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, for most users. The M5 MacBook Air (13-inch base model) costs roughly R13,500 to R16,000 locally and delivers 15+ hours of battery life with performance that handles video editing, design work, and heavy multitasking. It is the right balance of power, reliability, and cost for students, consultants, designers, medical professionals, and IT specialists in South Africa.' } },
        { '@type': 'Question', name: 'What are the most common M5 MacBook Air problems?', acceptedAnswer: { '@type': 'Answer', text: 'In our Hyde Park workshop, the most common M5 issues are preventable: liquid damage from spills and condensation, thermal stress from extended use without breaks, and power-related faults during load shedding. We have repaired 12 M5 boards with charger-induced damage this quarter alone. These issues are exacerbated by Johannesburg climate conditions.' } },
        { '@type': 'Question', name: 'How much does M5 MacBook Air logic board repair cost?', acceptedAnswer: { '@type': 'Answer', text: 'ZA Support charges R2,499 for logic board repair on the M5 MacBook Air, compared to R15,000 to R20,000 at the Apple Store and R4,499 or more at Mac Shack. The cost difference between choosing the right repair partner can save you R12,000 to R17,000 on a single repair.' } },
        { '@type': 'Question', name: 'How can I protect my M5 MacBook Air from liquid damage?', acceptedAnswer: { '@type': 'Answer', text: 'Keep a R2,000 buffer for potential liquid spill repairs. In Johannesburg 45 degree summer months, condensation is a real risk. If a spill occurs, bring the device to ZA Support within 2 hours for the best chance of saving the logic board. Liquid damage repair costs R1,999 compared to R20,000 at Apple for a board replacement.' } },
        { '@type': 'Question', name: 'What does a Health Check include for the MacBook Air M5?', acceptedAnswer: { '@type': 'Answer', text: 'A R599 Health Check from ZA Support provides baseline diagnostics including identifying any manufacturing issues Apple might have missed, checking for failing power components, battery degradation, and thermal paste breakdown. We recommend getting one within the first month of purchase for peace of mind.' } },
        { '@type': 'Question', name: 'Does load shedding damage MacBook Air hardware?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Load shedding and power instability cause approximately 30% of the expensive failures we see at ZA Support. Investing in a quality charger and surge protector is essential for M5 MacBook Air owners in South Africa. Power surges can damage logic boards and power management circuits, leading to repairs costing R2,499 or more.' } },
      ],
    },
    'first-ios-26-5-macos-26-5-developer-betas-now-available-south-africa-2026': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Will the macOS 26.5 beta break my Mac?', acceptedAnswer: { '@type': 'Answer', text: 'It might. File system corruption, thermal issues, and unexpected shutdowns are real risks with beta software. In our Hyde Park workshop, we have repaired dozens of Macs that suffered serious problems after beta testing without proper preparation, including logic board corruption, unexpected kernel panics, and file system failures. Backups are essential before installing.' } },
        { '@type': 'Question', name: 'Can I downgrade from macOS 26.5 beta if something goes wrong?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, but it requires a full restore through Finder and you will lose any data created during the beta period. Proper backups using Time Machine and Carbon Copy Cloner prevent this disaster. Always create a bootable backup before installing any beta software.' } },
        { '@type': 'Question', name: 'How often do Apple beta updates release?', acceptedAnswer: { '@type': 'Answer', text: 'Typically every two weeks. Beta 2 of 26.5 would arrive around 13 April, beta 3 around 27 April, with the release candidate expected in May. Each cycle addresses issues reported by testers in the previous build. Developer betas arrive 3 to 4 weeks before public betas.' } },
        { '@type': 'Question', name: 'Does South Africa climate affect beta testing on Macs?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Unstable betas cause unexpected CPU spikes. Combined with Johannesburg typical temperatures and variable air conditioning, your Mac will thermal-throttle and fan noise becomes constant. Hardware stress accumulates over time, potentially leading to logic board damage. A Health Check (R599) before installing beta software can identify whether your machine is ready.' } },
        { '@type': 'Question', name: 'What should I do before installing beta software on my Mac?', acceptedAnswer: { '@type': 'Answer', text: 'Create a full Time Machine backup with at least 500GB of free space, clone your entire drive using Carbon Copy Cloner, screenshot your System Settings, list all installed apps, wait 24 hours after release before installing, and test on a secondary machine first if possible. A Health Check (R599) from ZA Support tells you if your machine is ready for beta testing.' } },
        { '@type': 'Question', name: 'How much does it cost to fix a Mac damaged by beta software?', acceptedAnswer: { '@type': 'Answer', text: 'Logic board repair at ZA Support starts from R2,499, liquid damage repair from R1,999 if emergency cooling caused water exposure, and a Health Check costs R599 for same-day diagnostics. Start with a Health Check to determine the extent of damage before committing to repair.' } },
      ],
    },
    'iphone-will-still-exist-50-years-from-now-says-apple-an-south-africa-2026': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How long do Macs actually last?', acceptedAnswer: { '@type': 'Answer', text: 'Modern Macs receive software updates for 7 to 10 years. Hardware typically functions 10 to 15 years with proper maintenance. A R599 Health Check from ZA Support identifies issues early, helping extend your device lifespan significantly. Apple designs products expecting them to function for decades, making repair investment genuine protection.' } },
        { '@type': 'Question', name: 'Is logic board repair worth it on an older Mac?', acceptedAnswer: { '@type': 'Answer', text: 'Absolutely. At R2,499 at ZA Support, logic board repair is a fraction of replacement cost. Your Mac can work another 5 or more years after repair. A 2017 MacBook Pro is not old, it is designed to last until 2047. Repair beats replacement across Sandton, Rosebank, Midrand, Randburg, Fourways, and Bryanston.' } },
        { '@type': 'Question', name: 'What about liquid damage on a Mac?', acceptedAnswer: { '@type': 'Answer', text: 'Liquid damage repair at ZA Support costs R1,999. Delaying treatment risks permanent failure as corrosion spreads over time. Contact ZA Support immediately after any spillage for the best chance of recovery. In Johannesburg load shedding conditions, unexpected power surges can also corrupt components regularly.' } },
        { '@type': 'Question', name: 'Can I repair my Mac myself?', acceptedAnswer: { '@type': 'Answer', text: 'Modern Macs are sealed by design. Professional repair preserves warranty and functionality. ZA Support has serviced hundreds of Macs in our Hyde Park workshop with the specialist tools and expertise Apple designed these devices to receive. DIY repairs risk further damage and void any remaining warranty.' } },
        { '@type': 'Question', name: 'How do I know if my Mac needs repair?', acceptedAnswer: { '@type': 'Answer', text: 'Unexpected crashes, overheating, kernel panics, or unexpected shutdowns signal logic board issues. A diagnostic Health Check at ZA Support costs R599 and reveals exactly what is wrong with your device, often identifying issues before they become catastrophic failures.' } },
        { '@type': 'Question', name: 'Does Mac repair affect warranty?', acceptedAnswer: { '@type': 'Answer', text: 'ZA Support repairs carry a 12-month warranty on all work performed. Your device regains reliability with professional component-level repair. Our From R599 assessment guarantee means you only pay the assessment fee if we cannot restore your Mac to full functionality.' } },
      ],
    },
    'ipados-26-5-beta-1-now-available-plus-tvos-26-5-watchos-south-africa-2026': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Should I install iPadOS 26.5 beta on my iPad?', acceptedAnswer: { '@type': 'Answer', text: 'Only if you are a developer testing new APIs or have a dedicated test device. Beta software sometimes introduces unexpected problems including compatibility issues, battery drain, and crashes. If your iPad handles critical work or personal tasks, wait for the public release expected in late April or May. Always back up your data before installing any beta.' } },
        { '@type': 'Question', name: 'What should I do if beta software breaks my iPad?', acceptedAnswer: { '@type': 'Answer', text: 'First try a force restart by holding power and volume buttons until the restart screen appears. Try updating to the latest beta build as newer versions often fix earlier issues. If the device becomes unusable, use iCloud or Mac Finder to restore from your backup. If hardware problems emerge, ZA Support offers logic board repair from R2,499 and liquid damage repair from R1,999.' } },
        { '@type': 'Question', name: 'Can beta software cause hardware damage to my Apple devices?', acceptedAnswer: { '@type': 'Answer', text: 'Beta software can expose underlying hardware issues and cause additional stress. Unstable software combined with Johannesburg electrical stress from load shedding can damage logic boards or power management circuits. Apps may crash due to software bugs but also due to failing storage, overheating components, or battery problems that beta software aggravates.' } },
        { '@type': 'Question', name: 'How much does iPad repair cost in Johannesburg?', acceptedAnswer: { '@type': 'Answer', text: 'Mac Shack charges R4,499 and upward for logic board work. Apple Store repairs range from R15,000 to R70,000 depending on the issue. ZA Support offers logic board repair from R2,499 and liquid damage repair from R1,999, significantly less than high-street alternatives. A Health Check (R599) can diagnose the issue before committing to repair.' } },
        { '@type': 'Question', name: 'Should I get a Health Check before installing beta software?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. A Health Check (R599) verifies your device core systems are working properly, identifies lurking issues, and gives you peace of mind before loading experimental software. A device with marginal battery health, thermal issues, or storage problems will struggle even more under beta software. The Health Check provides a baseline for comparison.' } },
        { '@type': 'Question', name: 'What is the difference between developer beta and public beta?', acceptedAnswer: { '@type': 'Answer', text: 'Developer betas arrive 3 to 4 weeks earlier and are less stable, but include new APIs for app development. Public betas release later and are much more stable for general testing. You need a developer.apple.com account for early access to developer betas. For most users, waiting for the public beta or final release is the safer choice.' } },
      ],
    },
    'what-to-do-macbook-liquid-damage': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What should I do immediately after spilling liquid on my MacBook?', acceptedAnswer: { '@type': 'Answer', text: 'Power off immediately by holding the power button until the screen goes dark. Do not wait for a graceful shutdown. Unplug the charger from the wall first, then disconnect from the MacBook. Place the MacBook flat on a dry, absorbent towel. Every second the board is powered with liquid present creates short circuits that burn traces and components.' } },
        { '@type': 'Question', name: 'Why should I not put my MacBook in rice after a liquid spill?', acceptedAnswer: { '@type': 'Answer', text: 'Rice cannot draw liquid out of a sealed chassis, off a circuit board, or from inside a connector. It is hygroscopic, meaning it absorbs moisture from the surrounding air, but it cannot reach liquid inside your MacBook. More importantly, rice does nothing to stop the corrosion process happening on your logic board. It gives you a false sense of action while oxidation and electrolytic corrosion progress unchecked.' } },
        { '@type': 'Question', name: 'Can I use a hairdryer to dry my MacBook after a spill?', acceptedAnswer: { '@type': 'Answer', text: 'No. Heat does not help with liquid damage and causes additional harm. Hairdryers push liquid deeper into the chassis via air pressure, high heat warps plastic connectors and damages solder joints, and it can destroy thermal paste and adhesives. Room-temperature airflow from a fan positioned to blow across the vents is acceptable, but direct heat is not.' } },
        { '@type': 'Question', name: 'How much does MacBook liquid damage repair cost in Johannesburg?', acceptedAnswer: { '@type': 'Answer', text: 'ZA Support offers liquid damage assessment from R599 at our Hyde Park workshop. The repair cost depends on the extent of corrosion and which components need replacement. Ultrasonic cleaning without component replacement starts from R2,800. Component-level repairs range from R3,500 to R8,000 depending on the damage. If we cannot repair it, you only pay the assessment fee.' } },
        { '@type': 'Question', name: 'How soon should I bring my MacBook in after a liquid spill?', acceptedAnswer: { '@type': 'Answer', text: 'As soon as possible, ideally the same day. The corrosive process begins the moment liquid contacts your logic board. Machines brought in within 2 hours of a spill have a significantly better outcome than those that arrive the following day. Every hour of delay allows corrosion to spread further across the board, increasing the repair complexity and cost.' } },
        { '@type': 'Question', name: 'What does the liquid damage repair process involve at ZA Support?', acceptedAnswer: { '@type': 'Answer', text: 'Our process includes full chassis disassembly, ultrasonic cleaning bath to remove corrosive residue, isopropyl alcohol cleaning under magnification, component-level inspection under specialist equipment, power-on testing after confirmed drying, and full diagnostic under load. This is the only reliable method to halt corrosion and restore a liquid-damaged MacBook.' } },
      ],
    },
    'why-rice-does-not-work': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Does putting a wet phone or MacBook in rice actually work?', acceptedAnswer: { '@type': 'Answer', text: 'No. Rice is hygroscopic, meaning it absorbs moisture from the surrounding air, but liquid inside a sealed device is not accessible to the surrounding air. Your iPhone has a sealed IP-rated enclosure, tight tolerances between chassis components, and gaskets around internal connectors. Rice sitting outside the device cannot draw liquid out through these barriers.' } },
        { '@type': 'Question', name: 'What is actually happening inside a water-damaged device while it sits in rice?', acceptedAnswer: { '@type': 'Answer', text: 'While your device sits in rice, electrolytic corrosion is actively progressing inside it. When conductive liquid contacts a powered circuit board, it creates an electrolytic cell. Metal ions migrate away from traces and component leads. Oxide and hydroxide compounds form on contact surfaces. This process continues for hours and days. Rice does nothing to stop or slow this chemical process.' } },
        { '@type': 'Question', name: 'Can rice dust damage my iPhone or MacBook further?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Fine rice particles and starch can enter your device through speaker grilles and gaps, contaminate the charging port, and coat internal components with a sticky residue when mixed with liquid. At ZA Support, we have cleaned rice residue off iPhone logic boards. It is an additional hazard, not a solution.' } },
        { '@type': 'Question', name: 'What should I do instead of using rice for a water-damaged device?', acceptedAnswer: { '@type': 'Answer', text: 'Power off immediately to stop electrolytic corrosion. Do not plug in to charge. Do not press any buttons as this can push liquid into connectors. Bring it to ZA Support for professional ultrasonic cleaning, which creates cavitation bubbles in specialised fluid that removes corrosive residue from every surface, including under chips and in connectors. Same-day assessment from R599.' } },
        { '@type': 'Question', name: 'How does the time after a liquid spill affect the chance of successful repair?', acceptedAnswer: { '@type': 'Answer', text: 'Our data from over 3,000 repairs shows a clear relationship. Under 2 hours: highest recovery rate. 2 to 24 hours: good recovery, minor component replacement typically needed. 24 to 72 hours: moderate recovery, board-level repair often required. Over 72 hours: significantly reduced recovery rate with extensive corrosion likely. No amount of rice changes this curve.' } },
        { '@type': 'Question', name: 'How much does professional liquid damage repair cost at ZA Support?', acceptedAnswer: { '@type': 'Answer', text: 'ZA Support offers same-day liquid damage assessments from R599, 7 days a week, at our Hyde Park workshop in Johannesburg. The assessment includes ultrasonic cleaning, isopropyl alcohol rinse, and component-level inspection. Repair costs depend on the extent of corrosion. Call 064 529 5863 to book your assessment.' } },
      ],
    },
    'jamf-mdm-guide-south-africa': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What is JAMF MDM and why do South African businesses need it?', acceptedAnswer: { '@type': 'Answer', text: 'JAMF is the industry-leading Mobile Device Management platform for Apple devices. It provides centralised visibility, security, and control over every Mac, iPhone, and iPad in your fleet. South African businesses need it for POPIA compliance, including encryption enforcement, remote wipe capability, access control, and audit trails for every managed device.' } },
        { '@type': 'Question', name: 'How does JAMF help with POPIA compliance for Apple devices?', acceptedAnswer: { '@type': 'Answer', text: 'JAMF enforces FileVault encryption on every Mac, implements screen lock policies and complex password requirements, provides remote wipe capability for lost or stolen devices, enforces minimum OS versions to close security vulnerabilities, and maintains a documented audit trail of device compliance status. This addresses POPIA requirements for encryption at rest, access control, and accountability.' } },
        { '@type': 'Question', name: 'How much does JAMF implementation cost in South Africa?', acceptedAnswer: { '@type': 'Answer', text: 'JAMF licensing is USD-denominated, which creates currency exposure for South African businesses. ZA Support offers Starter packages for up to 25 devices, Business packages for 25 to 100 devices, and Enterprise pricing for 100+ devices. All packages include licensing, implementation, configuration, onboarding training, and ongoing management. Assessment from R599 to evaluate your device estate.' } },
        { '@type': 'Question', name: 'How long does a JAMF implementation take for a South African business?', acceptedAnswer: { '@type': 'Answer', text: 'A standard JAMF implementation for 20 to 50 devices typically runs four weeks. Week 1: instance provisioning and Apple Business Manager integration. Week 2: policy design, software packaging, and test device enrolment. Week 3: pilot rollout on 5 to 10 devices with testing. Week 4: full fleet rollout, user training, and documentation.' } },
        { '@type': 'Question', name: 'Does JAMF work during load shedding in South Africa?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. During power outages, JAMF check-ins queue automatically and resume when connectivity is restored. No manual intervention is needed. JAMF also uses delta updates for software distribution, minimising bandwidth consumption. For branches with limited connectivity, content caching on a local Mac server reduces external bandwidth requirements significantly.' } },
        { '@type': 'Question', name: 'Can employees see personal data on BYOD devices managed by JAMF?', acceptedAnswer: { '@type': 'Answer', text: 'JAMF distinguishes between corporate-owned and BYOD scenarios. For bring-your-own devices, a managed container approach separates corporate apps and data from personal content. The company never has visibility into personal photos, messages, or application data. When an employee leaves, only the corporate container is wiped, personal content remains untouched.' } },
      ],
    },
    'apple-background-security-update-safari-mac-2026': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What is Apple\'s new background security update for Safari?', acceptedAnswer: { '@type': 'Answer', text: 'Apple introduced a new mechanism to push targeted security fixes directly to Safari and WebKit without requiring a full macOS update. The fix is delivered and applied automatically in the background with no user interaction or restart needed. This allows Apple to respond to critical browser vulnerabilities faster than the traditional OS update cycle.' } },
        { '@type': 'Question', name: 'Do I need to do anything to receive Apple\'s background security updates?', acceptedAnswer: { '@type': 'Answer', text: 'No. If you are running a current version of macOS (Ventura, Sonoma, or Sequoia), the update applied automatically in the background. You can verify by opening Safari, clicking Safari in the menu bar, then About Safari, and checking that your version reflects the latest update. Background security improvements also appear in System Settings under Software Update history.' } },
        { '@type': 'Question', name: 'Does my older Mac receive Apple\'s background security improvements?', acceptedAnswer: { '@type': 'Answer', text: 'Background security improvements only apply to macOS Ventura (13) and later. If your Mac is running macOS Monterey or earlier, you will not receive these updates. Intel Macs from 2015 onwards can typically run macOS Ventura. ZA Support can assess your Mac and handle the upgrade at our Hyde Park workshop. Contact us on 064 529 5863.' } },
        { '@type': 'Question', name: 'Can I turn off Apple\'s background security updates on my Mac?', acceptedAnswer: { '@type': 'Answer', text: 'You can, but it is strongly advised against. These updates fix active vulnerabilities in Safari, the browser you use every day for internet access. Disabling them leaves a known security gap open until the next full OS update. Keeping automatic updates enabled is one of the most important security measures for any Mac.' } },
        { '@type': 'Question', name: 'How can I check my Mac\'s overall security status?', acceptedAnswer: { '@type': 'Answer', text: 'ZA Support offers a Health Check assessment from R599 that scans 32 categories of your Mac configuration, including current macOS version, Safari and WebKit version, software update settings, System Integrity Protection status, firewall status, and Gatekeeper configuration. You receive a written report with a risk rating and specific recommendations.' } },
        { '@type': 'Question', name: 'What security settings should every Mac user in South Africa enable?', acceptedAnswer: { '@type': 'Answer', text: 'Keep macOS updated within 7 days of release. Enable automatic updates in System Settings. Never disable System Integrity Protection. Use a password manager such as Safari Passwords or 1Password. Enable FileVault for full-disk encryption. Enable the macOS firewall in System Settings. These six settings take under ten minutes and close the most common attack vectors on a Mac.' } },
      ],
    },
    'macbook-pro-no-power-repair-hyde-park': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What is the most common reason a MacBook Pro will not turn on?', acceptedAnswer: { '@type': 'Answer', text: 'In our Hyde Park workshop, the most common cause is a power management IC failure, often triggered by voltage irregularities from load shedding in Johannesburg. The second most common is a failed Thunderbolt charging controller (CD3217B12) that prevents the MacBook from accepting charge. Both are repairable at component level, typically for R1,800 to R2,800.' } },
        { '@type': 'Question', name: 'What does it mean when my MacBook Pro fans spin but the screen stays black?', acceptedAnswer: { '@type': 'Answer', text: 'Fan running with a black screen means the MacBook is starting but not producing video output. This is not actually a no-power issue. It is a display or GPU fault. Common causes include display backlight failure, a failed display cable, or a GPU fault. Connect an external monitor to determine if the MacBook is starting successfully. If the external shows your desktop, the fault is in the display assembly.' } },
        { '@type': 'Question', name: 'Should I try replacing the battery if my MacBook Pro will not turn on?', acceptedAnswer: { '@type': 'Answer', text: 'Only if the battery is visibly swollen or your MacBook is more than 4 years old with over 1,000 charge cycles. A flat battery is rarely the sole cause of a no-power condition. If the charger IC is working and the battery simply needs charging, the MacBook should show some sign of life when connected to power. A new battery will not fix a PMIC or charger IC fault.' } },
        { '@type': 'Question', name: 'Can you recover data from a MacBook Pro that will not power on?', acceptedAnswer: { '@type': 'Answer', text: 'In most cases, yes. If the SSD is intact and the fault is in the power delivery system, repairing the board restores access to all data. Even if the board cannot be repaired, we can sometimes extract data by reading the NAND chips directly, though this is more complex on M-series machines with hardware encryption. Data preservation is always our first priority.' } },
        { '@type': 'Question', name: 'How much does it cost to diagnose a MacBook Pro that will not turn on?', acceptedAnswer: { '@type': 'Answer', text: 'Our diagnostic assessment starts from R599 at our Hyde Park workshop. This covers voltage injection testing, thermal imaging, and a detailed fault report identifying the exact failed component. If you proceed with the repair, the R599 is deducted from the final bill. If we cannot fix it, you only pay the assessment fee. From R599 assessment.' } },
        { '@type': 'Question', name: 'How long does a no-power MacBook Pro repair take at ZA Support?', acceptedAnswer: { '@type': 'Answer', text: 'Most no-power diagnoses are completed within 24 hours. The repair itself depends on the fault. A charger IC replacement is typically 1 to 2 days. A PMIC repair may take 3 to 5 days. If parts need to be sourced, we communicate the timeline upfront. Clients in Sandton, Bryanston, and Fourways are a 10 to 15 minute drive from our Hyde Park workshop.' } },
      ],
    },
    'imac-logic-board-repair-sandton': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How much does iMac logic board repair cost compared to Apple Store?', acceptedAnswer: { '@type': 'Answer', text: 'ZA Support charges R3,200 to R4,800 for GPU reball or replacement, compared to R12,000 to R18,000 at Apple for a board swap. PMIC and power regulation repairs cost R2,499 to R3,800 versus Apple\'s R12,000 to R18,000. We repair at component level, replacing only the failed parts, while Apple replaces the entire board. On a 2019 27-inch iMac with a GPU fault, the saving is over R13,000.' } },
        { '@type': 'Question', name: 'How do I know if my iMac has a power supply issue or a logic board issue?', acceptedAnswer: { '@type': 'Answer', text: 'A power supply failure typically means the iMac shows no signs of life at all, no fan, no chime, no LED. A logic board failure often allows the iMac to partially start, you might hear fans or see the Apple logo before it shuts down. However, these symptoms overlap, which is why proper diagnosis is important. We test the PSU first on every iMac, which takes about 20 minutes and can save you from being quoted for unnecessary board work.' } },
        { '@type': 'Question', name: 'Can you repair the GPU on a 2013 or 2015 27-inch iMac?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The AMD GPUs used in these models are a known failure point. We either reball the existing GPU if the chip is functional but the solder joints have cracked, or replace it entirely. The repair costs R3,200 to R4,800 and includes a stress-tested warranty. Apple\'s repair programme for these models ended years ago, and Apple now quotes R12,000 to R18,000 for a board replacement.' } },
        { '@type': 'Question', name: 'Do you offer collection and delivery for iMac repairs in Sandton?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We collect from offices and homes across Sandton, Rosebank, Rivonia, Morningside, Bryanston, and Fourways. The iMac is transported in protective packaging. Collection and delivery is complimentary for repairs over R3,000 in value within 15km of our Hyde Park workshop at 1 Hyde Park Lane, Johannesburg.' } },
        { '@type': 'Question', name: 'Does load shedding damage iMac power supplies?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Johannesburg\'s load shedding is particularly harsh on iMac power supplies. The repeated on-off cycling of mains power causes capacitor degradation in the PSU over time. A power supply replacement costs R1,200 to R2,500, far less than a logic board repair. We recommend a quality UPS for any iMac that cannot be shut down gracefully before each load shedding window.' } },
        { '@type': 'Question', name: 'How much does an iMac logic board assessment cost at ZA Support?', acceptedAnswer: { '@type': 'Answer', text: 'Our diagnostic assessment starts from R599. We test the power supply, logic board voltage rails, and individual components using thermal imaging and board-level measurement to identify the exact fault. If you proceed with the repair, the R599 is deducted from the total bill. If the repair is not feasible or not cost-effective, you only pay the assessment fee.' } },
      ],
    },
    'macbook-air-m2-water-damage-recovery-johannesburg': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How quickly should I bring my MacBook Air M2 in after a liquid spill?', acceptedAnswer: { '@type': 'Answer', text: 'As quickly as possible, ideally within the same day. The first 48 hours are the critical window. After that, corrosion accelerates exponentially, especially with sugary liquids like coffee or juice. Every hour of delay reduces the probability of a successful recovery. Power off immediately by holding the power button for 5 seconds and do not attempt to charge or restart it.' } },
        { '@type': 'Question', name: 'Why is the MacBook Air M2 particularly vulnerable to liquid damage?', acceptedAnswer: { '@type': 'Answer', text: 'The M2 MacBook Air has a thin profile with almost no vertical space between keyboard and logic board, so liquid reaches components within seconds. The unified memory architecture means a damaged chip requires full replacement. The soldered SSD means losing the board means losing data. The fanless design allows liquid to spread directly across the entire board surface without pooling away from components.' } },
        { '@type': 'Question', name: 'What are the success rates for MacBook Air M2 liquid damage recovery?', acceptedAnswer: { '@type': 'Answer', text: 'We track outcomes carefully. Water only with no sugar: approximately 85% full recovery when brought within 48 hours. Coffee with sugar or milk: approximately 65% within 48 hours, dropping to roughly 40% after one week. Wine or juice: approximately 55% within 48 hours due to rapid acid corrosion. Machines powered on after a spill see recovery rates drop by approximately 20%.' } },
        { '@type': 'Question', name: 'Does AppleCare cover liquid damage on a MacBook Air M2?', acceptedAnswer: { '@type': 'Answer', text: 'Standard AppleCare does not cover liquid damage. AppleCare+ covers accidental damage including liquid spills, but with an excess fee of approximately R1,299 per incident, and Apple replaces the entire board rather than repairing it. ZA Support component-level repair often costs less than the AppleCare+ excess, and preserves your original data on the soldered SSD.' } },
        { '@type': 'Question', name: 'What does the ultrasonic cleaning process involve for a MacBook Air M2?', acceptedAnswer: { '@type': 'Answer', text: 'Our six-stage process includes disassembly and battery disconnection (30 minutes), initial cleaning under magnification with isopropyl alcohol (1 hour), ultrasonic bath with specialised electronics cleaning solution (45 minutes), controlled drying and inspection (2 to 4 hours), component replacement via micro-soldering if needed, and 24-hour reassembly and comprehensive testing.' } },
        { '@type': 'Question', name: 'How much does MacBook Air M2 liquid damage repair cost at ZA Support?', acceptedAnswer: { '@type': 'Answer', text: 'Assessment starts from R599. Ultrasonic cleaning without component replacement costs R2,800 to R3,500. If components need replacement, costs range from R3,500 to R6,500 depending on damage. Apple quotes R18,000 to R25,000 because they replace the entire board and top case. If damage is too extensive, you only pay the R599 assessment fee. We are at 1 Hyde Park Lane, Hyde Park, Johannesburg.' } },
      ],
    },
    'macbook-liquid-damage-repair-cost-south-africa-2026': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How much does MacBook liquid damage repair cost in South Africa in 2026?', acceptedAnswer: { '@type': 'Answer', text: 'At ZA Support, light damage needing ultrasonic cleaning only costs R2,800 to R3,500. Moderate damage with 1 to 3 component replacements costs R3,500 to R5,500. Heavy damage with 4 or more component replacements costs R5,500 to R8,000. Severe board-level damage with trace repair costs R8,000 to R12,000. Assessment from R599, deducted from repair cost if you proceed.' } },
        { '@type': 'Question', name: 'Why is liquid damage repair cheaper at ZA Support than at Apple?', acceptedAnswer: { '@type': 'Answer', text: 'Apple replaces the entire logic board and top case for any liquid damage, regardless of severity. ZA Support repairs at component level, replacing only the specific damaged parts. A single corroded capacitor that costs R50 in parts does not require a R20,000 board replacement. Our approach saves you money and preserves your data on the soldered SSD.' } },
        { '@type': 'Question', name: 'How much does Apple charge for MacBook liquid damage repair in 2026?', acceptedAnswer: { '@type': 'Answer', text: 'Apple charges R15,000 to R22,000 for MacBook Air M1 or M2, R16,000 to R24,000 for MacBook Air M3, R18,000 to R28,000 for MacBook Pro 14-inch M3, and R22,000 to R35,000 for MacBook Pro 16-inch M3. Apple also requires 5 to 10 working days, and all data on the soldered SSD is lost if the board is replaced.' } },
        { '@type': 'Question', name: 'Does the type of liquid spilled affect the repair cost?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, significantly. Water is the least damaging and cheapest to repair. Coffee with sugar and milk is moderately corrosive. Wine, juice, and soft drinks are the most corrosive due to acidity and sugar content, causing faster and more extensive corrosion that requires more component replacements. The time before power-off and the MacBook model also affect the final cost.' } },
        { '@type': 'Question', name: 'Does liquid damage get worse over time if I do not get it repaired?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, significantly. Corrosion is a chemical process that continues as long as moisture and residue remain on the board. A MacBook that works today after a spill may fail in days or weeks as corrosion eats through traces and component leads. The cost of repair increases with every day of delay. Early intervention with ultrasonic cleaning is always cheaper than waiting.' } },
        { '@type': 'Question', name: 'Can I get a cost estimate before bringing my MacBook in for liquid damage repair?', acceptedAnswer: { '@type': 'Answer', text: 'We can give a general estimate based on what was spilled and how long the MacBook was powered on afterwards. However, an accurate quote requires opening the machine and inspecting the board under magnification. Our assessment from R599 provides detailed diagnosis with to proceed. If we cannot repair the machine, you only pay the assessment fee.' } },
      ],
    },
    'signs-macbook-has-liquid-damage': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Can liquid damage appear weeks after the original spill on a MacBook?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, this is extremely common. We see it every week in our Hyde Park workshop. Corrosion is a progressive chemical process. A MacBook that works perfectly immediately after a small splash can fail two to six weeks later as oxidation eats through critical traces and component connections. The longer you wait, the more extensive and expensive the repair becomes.' } },
        { '@type': 'Question', name: 'How can I check for liquid damage on my MacBook without opening it?', acceptedAnswer: { '@type': 'Answer', text: 'Shine a torch into each USB-C port and look for Apple\'s Liquid Contact Indicators, small dots that turn pink or red when exposed to moisture. Also check for sticky or unresponsive keys, trackpad clicking changes, green or white crusty residue around ports, fans running at full speed immediately after startup, or intermittent charging from one USB-C port but not the other.' } },
        { '@type': 'Question', name: 'What are the warning signs of hidden liquid damage on a MacBook?', acceptedAnswer: { '@type': 'Answer', text: 'Watch for random kernel panics and unexplained crashes, battery draining faster than normal with sudden health drops, display flickering or backlight issues, audio crackling or one speaker failing, sticky keyboard keys, inconsistent trackpad clicks, and intermittent charging. These symptoms often appear days to weeks after liquid exposure and are frequently mistaken for software issues.' } },
        { '@type': 'Question', name: 'My MacBook got slightly wet but seems fine. Should I still get it checked?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The fact that it works now does not mean corrosion is not developing internally. A preventive ultrasonic cleaning from R2,800 is significantly cheaper than a component repair costing R4,500 to R8,000 that becomes necessary weeks later. Think of it as an insurance measure against progressive corrosion damage.' } },
        { '@type': 'Question', name: 'Will Apple tell me if my MacBook has liquid damage?', acceptedAnswer: { '@type': 'Answer', text: 'Apple will check the Liquid Contact Indicators during any service visit. If the indicators are triggered, they will classify the damage as accidental and it will not be covered under standard warranty. However, Apple does not perform component-level assessment to determine the extent of internal corrosion, they only check the indicator strips.' } },
        { '@type': 'Question', name: 'How much does a liquid damage assessment cost at ZA Support?', acceptedAnswer: { '@type': 'Answer', text: 'Our assessment starts from R599 at our Hyde Park workshop in Johannesburg and includes a full internal inspection with photographs. We check all internal Liquid Contact Indicators, inspect the logic board under magnification for corrosion, test voltage rails, and provide a detailed report. Clients from Sandton, Fourways, Rosebank, Midrand, and Bryanston can reach us within 20 minutes.' } },
      ],
    },
    'managed-it-medical-practices-sandton-2026': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What happens if a MacBook containing patient data is stolen from a medical practice?', acceptedAnswer: { '@type': 'Answer', text: 'If the device is enrolled in our JAMF MDM, we initiate a remote wipe within minutes of being notified. FileVault encryption means the data on the device is inaccessible without the password even before the wipe completes. We then assist with the POPIA breach notification process if required, helping you demonstrate that appropriate security measures were in place.' } },
        { '@type': 'Question', name: 'How does JAMF MDM help medical practices comply with POPIA?', acceptedAnswer: { '@type': 'Answer', text: 'JAMF enforces FileVault encryption on every device, implements per-user access control with strong passwords and automatic 5-minute screen lock, provides remote wipe capability for lost devices, enforces minimum OS versions to close vulnerabilities, maintains audit trails, and manages secure data disposal when devices are decommissioned. POPIA fines reach up to R10 million for non-compliance.' } },
        { '@type': 'Question', name: 'How much does managed IT cost for a medical practice in Sandton?', acceptedAnswer: { '@type': 'Answer', text: 'Solo practices with 1 to 3 devices start from R2,499 per month. Group practices with 4 to 10 devices start from R4,999 per month including on-site visits and priority support. Multi-location practices with 11 or more devices start from R8,999 per month with a dedicated account manager. All packages include JAMF MDM, encrypted backup, automated updates, and support. Initial assessment from R599.' } },
        { '@type': 'Question', name: 'What is the onboarding process for a medical practice switching to managed IT?', acceptedAnswer: { '@type': 'Answer', text: 'Week 1: security audit and gap analysis. Week 2: JAMF setup and device enrolment. Week 3: migration of existing data to encrypted storage and backup configuration. Week 4: staff training and go-live. The entire process is designed to cause zero disruption to patient consultations. For practices transitioning from unmanaged environments, we address immediate vulnerabilities first.' } },
        { '@type': 'Question', name: 'Does ZA Support managed IT handle load shedding for Sandton medical practices?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Our managed IT service includes UPS sizing and configuration for all critical equipment, automatic safe shutdown of Macs before battery depletion, cloud-based services that remain accessible during office power outages via mobile data, and automatic recovery procedures when power returns. For Sandton practices, load shedding remains a daily operational challenge that we manage proactively.' } },
        { '@type': 'Question', name: 'Which practice management software is compatible with ZA Support managed Apple environments?', acceptedAnswer: { '@type': 'Answer', text: 'We have experience managing Apple environments running GoodX (runs natively on macOS, we handle updates and database backups), CarePoint (server environment and client device connections), Healthbridge (electronic claims submission integration), and Elixir (mobile access to patient records). We test practice software compatibility with every macOS update before pushing it to practice Macs.' } },
      ],
    },
    'apple-device-management-law-firms-johannesburg': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Can you manage both personal and firm-owned Apple devices for a law firm?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. JAMF supports a BYOD (Bring Your Own Device) model where we manage a secure partition on personal devices without accessing the lawyer\'s personal data. Firm applications and documents are contained in a managed workspace that can be wiped independently of personal content if the lawyer leaves the firm. This approach satisfies POPIA requirements while respecting personal privacy.' } },
        { '@type': 'Question', name: 'How does Apple device management help law firms comply with POPIA?', acceptedAnswer: { '@type': 'Answer', text: 'We enforce FileVault full-disk encryption on every managed Mac, implement per-user access control with strong password policies, configure automatic screen lock after 3 minutes, maintain audit trails of device access and software installations, provide remote wipe capability for lost devices, and perform certified cryptographic erasure when devices are decommissioned. POPIA fines reach up to R10 million for non-compliance.' } },
        { '@type': 'Question', name: 'How much does Apple device management cost for a law firm in Johannesburg?', acceptedAnswer: { '@type': 'Answer', text: 'Sole practitioners with 1 to 3 devices start from R2,499 per month. Small firms with 4 to 10 devices start from R4,999 per month. Mid-size firms with 11 to 30 devices start from R8,999 per month. Custom enterprise pricing is available for firms with 30 or more devices. All engagements begin with a security and compliance audit from R599.' } },
        { '@type': 'Question', name: 'What happens when a lawyer leaves the firm and has firm data on their device?', acceptedAnswer: { '@type': 'Answer', text: 'We remotely remove all firm data, applications, and email accounts from their device within hours of notification. If it is a firm-owned device, we perform a full wipe and reconfigure it for the replacement hire. An audit log of the entire off-boarding process is provided for your compliance records. Client privilege is maintained throughout the process.' } },
        { '@type': 'Question', name: 'Do you provide on-site support for law firms in Sandton and Rosebank?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Our Hyde Park workshop is 5 minutes from Sandton CBD and 10 minutes from Rosebank. For managed IT clients, we provide on-site support visits as part of the SLA. Critical issues receive a 30-minute response time for Sandton, Rosebank, and Bryanston locations. We understand that downtime in a law firm has direct financial consequences measured in lost billable hours.' } },
        { '@type': 'Question', name: 'How does ZA Support handle load shedding for Johannesburg law firms?', acceptedAnswer: { '@type': 'Answer', text: 'Our managed IT service includes UPS sizing and configuration for all critical equipment, automatic safe shutdown of Macs before UPS battery depletion, cloud-based services that remain accessible during office power outages via mobile data, and generator integration monitoring for firms with standby power. All managed Macs are configured to handle load shedding gracefully, saving open documents and maintaining sync state.' } },
      ],
    },
    'macbook-pro-screen-replacement-cost-johannesburg-2026': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Can you replace just the glass on a MacBook Pro screen?', acceptedAnswer: { '@type': 'Answer', text: 'No. The MacBook Pro display is a fused assembly where the glass, LCD panel, and backlight are bonded together and cannot be separated without destroying the panel. The entire display assembly is replaced as a unit. This is the same approach Apple uses. Attempting to separate the layers results in a destroyed panel every time.' } },
        { '@type': 'Question', name: 'How much does a MacBook Pro screen replacement cost in Johannesburg in 2026?', acceptedAnswer: { '@type': 'Answer', text: 'Pricing depends on the model. MacBook Pro 13-inch 2016 to 2020: R3,800 to R5,200. MacBook Pro 15-inch 2016 to 2019: R4,500 to R6,000. MacBook Pro 14-inch M1 or M2 Pro: R5,500 to R7,500. MacBook Pro 14-inch M3 Pro or Max: R6,000 to R8,500. MacBook Pro 16-inch M1, M2, or M3: R7,000 to R10,000. All prices include the display assembly, installation, and calibration. Assessment from R599.' } },
        { '@type': 'Question', name: 'What is Flexgate and does it affect my MacBook Pro screen?', acceptedAnswer: { '@type': 'Answer', text: 'Flexgate is a design flaw in MacBook Pro 13-inch and 15-inch models from 2016 and 2017 where the display flex cable is too short. Over time, opening and closing the lid wears through the cable, causing a stage lighting effect at the bottom of the screen followed by complete backlight failure. We replace the display cable for R1,200 to R1,800, which is far less than a full screen replacement.' } },
        { '@type': 'Question', name: 'Is a third-party MacBook Pro screen as good as the original Apple screen?', acceptedAnswer: { '@type': 'Answer', text: 'For pre-2021 Retina LCD models, quality third-party screens are virtually identical to the original in colour accuracy and brightness. For Liquid Retina XDR models from 2021 onwards, we strongly recommend original Apple display assemblies because the mini-LED technology and ProMotion calibration are difficult to replicate. We are always transparent about what we are installing.' } },
        { '@type': 'Question', name: 'Does MacBook Pro screen replacement affect True Tone?', acceptedAnswer: { '@type': 'Answer', text: 'When an original Apple display assembly is used, True Tone and other features work correctly after proper calibration. With third-party assemblies on newer models, True Tone may not function. We always inform you before the repair if a feature limitation applies so you can make an informed decision.' } },
        { '@type': 'Question', name: 'How long does a MacBook Pro screen replacement take at ZA Support?', acceptedAnswer: { '@type': 'Answer', text: 'For models where we have the display in stock, the replacement is typically completed within 1 to 2 working days. For less common configurations such as the M3 Pro or Max 16-inch, parts may need to be sourced, which can add 3 to 5 working days. We always confirm the timeline before you leave your device at our Hyde Park workshop.' } },
      ],
    },
    'macbook-battery-health-below-80-percent': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What does it mean when MacBook battery health drops below 80 percent?', acceptedAnswer: { '@type': 'Answer', text: 'When battery health drops below 80%, the battery can no longer hold more than 80% of its original charge capacity. For a MacBook Pro with a 70 Wh battery, this means it now effectively has a 56 Wh or smaller battery. macOS will display Service Recommended. Performance may be throttled to prevent unexpected shutdowns, and runtime is significantly reduced.' } },
        { '@type': 'Question', name: 'How much does a MacBook battery replacement cost in South Africa?', acceptedAnswer: { '@type': 'Answer', text: 'MacBook Air Intel 2018 to 2020: R1,499 to R1,899. MacBook Air M1, M2, or M3: R1,699 to R2,099. MacBook Pro 13-inch 2016 to 2020: R1,699 to R2,099. MacBook Pro 14-inch M1, M2, or M3: R1,899 to R2,499. MacBook Pro 16-inch M1, M2, or M3: R2,099 to R2,699. Prices include the battery, installation, adhesive removal, and a full health check. Assessment from R599.' } },
        { '@type': 'Question', name: 'Can I replace my MacBook battery myself?', acceptedAnswer: { '@type': 'Answer', text: 'We do not recommend it. MacBook batteries are adhesively mounted with pull tabs that break easily, and applying too much force can puncture a cell, which is a fire hazard. The M-series MacBook Pro batteries are particularly difficult because of how Apple designed the adhesive strips. Professional replacement ensures the battery is safely removed and the new one is properly calibrated.' } },
        { '@type': 'Question', name: 'Does load shedding in Johannesburg affect MacBook battery health?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Repeatedly draining to near-zero during load shedding and then fully charging when power returns places significant stress on lithium-ion cells. This charge cycling pattern accelerates degradation faster than normal use. We recommend keeping the battery between 20% and 80% for daily use and using a quality surge protector to avoid voltage spikes during load shedding switching.' } },
        { '@type': 'Question', name: 'Will a new battery make my old MacBook faster?', acceptedAnswer: { '@type': 'Answer', text: 'Not directly, but macOS throttles performance when battery health is very low to prevent unexpected shutdowns. Replacing a severely degraded battery can restore the full performance profile that macOS was previously limiting. If your MacBook feels slower than when you bought it and battery health is below 70%, a new battery may noticeably improve responsiveness.' } },
        { '@type': 'Question', name: 'How long does a MacBook battery replacement take at ZA Support?', acceptedAnswer: { '@type': 'Answer', text: 'Most battery replacements at our Hyde Park workshop are completed same-day. The actual replacement takes 45 to 90 minutes depending on the model. MacBook Air batteries are quicker due to easier access. MacBook Pro 16-inch models take longer because of the larger battery with more adhesive points. Assessment from R599, deducted from the repair cost if you proceed.' } },
      ],
    },
    'mac-repair-vs-apple-store-johannesburg-2026': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Will repairing my Mac at an independent shop void my Apple warranty?', acceptedAnswer: { '@type': 'Answer', text: 'No. Under South African consumer law and Apple\'s own policies, using a third-party repairer for one issue does not void your warranty for unrelated issues. If you have a logic board repaired independently and later develop a battery fault covered by warranty, Apple must honour the battery warranty. The only exception is if the independent repair directly caused the subsequent fault.' } },
        { '@type': 'Question', name: 'How much cheaper is independent Mac repair compared to the Apple Store in Johannesburg?', acceptedAnswer: { '@type': 'Answer', text: 'Savings vary by repair type. Logic board component-level repair: R2,499 to R6,500 versus Apple\'s R18,000 to R32,000, saving up to 85%. Screen replacement: R3,800 to R10,000 versus Apple\'s R8,500 to R24,000, saving up to 60%. Battery replacement: R1,499 to R2,699 versus Apple\'s R2,799 to R4,399, saving up to 45%. Liquid damage recovery: R2,800 to R8,000 versus Apple\'s R18,000 to R35,000, saving up to 85%.' } },
        { '@type': 'Question', name: 'When should I choose Apple over an independent repairer?', acceptedAnswer: { '@type': 'Answer', text: 'Apple is the better option when your Mac is under warranty or AppleCare+, when you need cosmetic top case replacement on a relatively new machine, when the issue is purely software and Apple\'s Genius Bar can resolve it for free, or when corporate compliance or insurance requires exact OEM components. For out-of-warranty repairs, liquid damage, data recovery, or older machines, an independent specialist is typically the better choice.' } },
        { '@type': 'Question', name: 'How do I know if an independent Mac repairer is competent?', acceptedAnswer: { '@type': 'Answer', text: 'Ask specific questions: Do they perform component-level micro-soldering or only board swaps? What diagnostic equipment do they use? Can you visit the workshop? Do they provide a written warranty? A reputable independent specialist will have a physical workshop, professional-grade equipment, and be transparent about their process and warranty terms.' } },
        { '@type': 'Question', name: 'What if an independent repairer cannot fix my Mac?', acceptedAnswer: { '@type': 'Answer', text: 'A reputable independent repairer will be upfront about this. At ZA Support, if we cannot repair your Mac, you only pay the assessment fee from R599. We do not charge for unsuccessful repairs. We will also advise you on the best next step, whether that is Apple, data recovery, or replacement.' } },
        { '@type': 'Question', name: 'Does independent Mac repair preserve my data better than Apple?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, in most cases. Apple\'s board-swap model means your original SSD, which is soldered on M-series Macs, is discarded with the old board and all data is lost. Component-level repair at an independent shop preserves the original board and all data intact. If your data is not backed up, this distinction can be the difference between full recovery and total loss.' } },
      ],
    },
    'macbook-overheating-fix-johannesburg-2026': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How hot is too hot for a MacBook in Johannesburg?', acceptedAnswer: { '@type': 'Answer', text: 'Apple designs MacBooks to operate safely up to an internal CPU temperature of approximately 100 degrees Celsius, at which point aggressive throttling occurs. Sustained temperatures above 90 degrees during moderate tasks like web browsing and document editing indicate a problem. During heavy loads like video export, temperatures of 85 to 95 degrees are normal. If your MacBook hits 100 degrees during everyday use, bring it in.' } },
        { '@type': 'Question', name: 'Does thermal paste replacement really make a difference on a MacBook?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, measurably so. On Intel MacBooks older than 3 years, we typically see temperature drops of 8 to 15 degrees Celsius after replacing degraded thermal paste with high-quality compound such as Thermal Grizzly Kryonaut. This translates to less fan noise, less throttling, and snappier performance. On M-series MacBooks, the improvement is smaller at 3 to 8 degrees but still noticeable.' } },
        { '@type': 'Question', name: 'Why do MacBooks overheat more in Johannesburg than in other cities?', acceptedAnswer: { '@type': 'Answer', text: 'Johannesburg sits at roughly 1,750 metres above sea level. The thinner air at altitude reduces the effectiveness of fan-based cooling because there are fewer air molecules to carry heat away from the heatsink. Combined with summer temperatures of 30 to 35 degrees Celsius and a notably dusty environment during dry winter months, MacBooks in Johannesburg face tougher thermal conditions than at sea level.' } },
        { '@type': 'Question', name: 'How often should I get my MacBook cleaned internally in Johannesburg?', acceptedAnswer: { '@type': 'Answer', text: 'In Johannesburg\'s dusty environment, we recommend an internal clean every 18 to 24 months for MacBooks used daily. If your MacBook is in a particularly dusty environment such as a construction office or near major roads, every 12 months is advisable. This is a quick, inexpensive service that prevents larger thermal problems from developing.' } },
        { '@type': 'Question', name: 'Can MacBook overheating cause permanent damage?', acceptedAnswer: { '@type': 'Answer', text: 'Prolonged operation at extreme temperatures can accelerate degradation of the logic board, particularly solder joints and the battery. The CPU and GPU have thermal protection that prevents immediate damage, but years of running hot due to clogged fans or degraded thermal paste reduces the lifespan of the machine. A thermal service is preventive maintenance that pays for itself.' } },
        { '@type': 'Question', name: 'How much does a MacBook thermal assessment cost at ZA Support?', acceptedAnswer: { '@type': 'Answer', text: 'Our assessment starts from R599 and includes temperature benchmarking, internal inspection, and diagnosis of the thermal issue. The typical cost for a full thermal service including cleaning, thermal paste replacement, and fan check is R999 to R1,499 depending on the model. If fan replacement is needed, the part cost is additional. The R599 is deducted from the service cost if you proceed.' } },
      ],
    },
    'data-recovery-dead-macbook-johannesburg': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Can you recover data from a MacBook that will not turn on at all?', acceptedAnswer: { '@type': 'Answer', text: 'In most cases, yes. A completely dead MacBook usually has a power delivery fault such as a failed PMIC or charger IC, while the SSD and its data remain intact. We repair the power system to restore board function and access the data normally. This scenario has an approximately 80% success rate. The data is not affected by a power delivery failure.' } },
        { '@type': 'Question', name: 'Is data recovery possible from an M-series MacBook with a soldered SSD?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, if the M-series chip itself is intact. The SSD is soldered to the board and the encryption is tied to the specific chip, so the data can only be read by the exact logic board that wrote it. Our approach is to repair the board at component level to restore enough function to boot the machine and copy data to an external drive. If the M-series SoC is physically destroyed, recovery is not possible with current technology.' } },
        { '@type': 'Question', name: 'How much does data recovery from a dead MacBook cost in Johannesburg?', acceptedAnswer: { '@type': 'Answer', text: 'Board repair for power fault plus data access costs R2,499 to R5,500. Liquid damage clean plus board repair plus data access costs R3,500 to R7,000. SSD removal and external reading on pre-2018 Intel Macs costs R1,200 to R1,800. Complex board repair for data access only costs R4,500 to R8,000. If we cannot recover the data, you only pay the assessment fee from R599.' } },
        { '@type': 'Question', name: 'Can I get just the data without fully repairing the MacBook?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. If you do not need the MacBook repaired but only want the data, we perform the minimum board repair necessary to boot the machine and copy data to your external drive. This is often less expensive than a full repair because we only need to restore basic function, not perfect long-term reliability.' } },
        { '@type': 'Question', name: 'How quickly should I bring in a liquid-damaged MacBook for data recovery?', acceptedAnswer: { '@type': 'Answer', text: 'As quickly as possible. Corrosion spreads over time, and a board that is recoverable today may not be recoverable next week. We see clients who left a liquid-damaged MacBook in a drawer for months, and by the time they bring it in, the corrosion has destroyed traces around the SSD controller that were probably intact at the time of the spill. The first 48 hours are the critical window.' } },
        { '@type': 'Question', name: 'What is the difference between data recovery from Intel and M-series MacBooks?', acceptedAnswer: { '@type': 'Answer', text: 'Intel MacBooks without T2 chip (pre-2018) have removable SSDs that can be read with an adapter in another Mac, making recovery straightforward. Intel MacBooks with T2 chip (2018 to 2020) and all M-series MacBooks have hardware encryption tied to the specific security chip, so the data can only be decrypted by repairing the original board. This makes component-level board repair essential for modern MacBook data recovery.' } },
      ],
    },
    'macbook-ssd-upgrade-johannesburg-worth-it-2026': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Can you upgrade the SSD in an M1 or M2 MacBook?', acceptedAnswer: { '@type': 'Answer', text: 'No. All M-series MacBooks including M1, M2, and M3 have the SSD soldered directly to the logic board. It cannot be removed or replaced. This is a design decision by Apple and there is no workaround. If you need more storage on an M-series MacBook, your options are an external USB-C SSD or purchasing a new MacBook with a larger storage configuration.' } },
        { '@type': 'Question', name: 'How much does a MacBook SSD upgrade cost in Johannesburg?', acceptedAnswer: { '@type': 'Answer', text: 'For models with upgradeable SSDs: MacBook Air 2013 to 2017 128 GB to 512 GB costs R2,499 to R2,999. MacBook Air 128 GB to 1 TB costs R3,499 to R3,999. MacBook Pro 2013 to 2015 256 GB to 1 TB costs R3,499 to R3,999. MacBook Pro 2016 to 2017 256 GB to 1 TB costs R2,999 to R3,999. iMac HDD to 1 TB SSD costs R2,499 to R3,499. All prices include the SSD, installation, and data migration. Assessment from R599.' } },
        { '@type': 'Question', name: 'Is it worth upgrading a 2015 MacBook Pro SSD in 2026?', acceptedAnswer: { '@type': 'Answer', text: 'It depends on your usage. For document work, web browsing, email, and light creative tasks, a 2015 MacBook Pro with 16 GB RAM and a new 1 TB SSD is still perfectly capable. Adding a 1 TB SSD for R3,499 is far less than the R17,000 minimum for a new MacBook Air. You get 2 to 3 more years of productive use. For professional creative work or software development, the performance gap with M-series machines is too significant.' } },
        { '@type': 'Question', name: 'Will upgrading my MacBook SSD erase my data?', acceptedAnswer: { '@type': 'Answer', text: 'No. We clone your existing drive to the new SSD as part of the upgrade process. When you get your MacBook back, everything is exactly as you left it: same desktop, same applications, same files. The only difference is that you now have significantly more free space. We create a complete backup before touching anything as a safety measure.' } },
        { '@type': 'Question', name: 'Which iMac models benefit most from an SSD upgrade?', acceptedAnswer: { '@type': 'Answer', text: 'Any iMac from 2012 to 2019 with a spinning hard drive or failing Fusion Drive benefits enormously. This is the single most impactful upgrade we do. Boot time goes from 90 seconds to 15 seconds. Applications open instantly. The machine feels entirely new. If the iMac otherwise works well and has sufficient RAM, an SSD upgrade is a straightforward recommendation.' } },
        { '@type': 'Question', name: 'How much does an SSD upgrade assessment cost at ZA Support?', acceptedAnswer: { '@type': 'Answer', text: 'Our assessment starts from R599. We verify your model\'s upgrade compatibility, check the health of all other components, and provide a fixed-price quote for the upgrade including the SSD, installation, and data migration. If you proceed with the upgrade, the R599 is deducted from the total cost. We are at 1 Hyde Park Lane, Hyde Park, Johannesburg.' } },
      ],
    },
    'medical-practice-popia-it-provider-johannesburg': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Why does a medical practice in Johannesburg need a POPIA-aligned IT provider?', acceptedAnswer: { '@type': 'Answer', text: 'POPIA section 19 requires a responsible party (the practice) to ensure integrity and confidentiality of personal information, including special-category health data. Section 21 requires a written operator agreement with any third party processing personal information on the practice\'s behalf. A generic IT provider without a signed operator agreement, documented technical controls, and incident-response procedures leaves the practice exposed when an inspection, breach, or Information Regulator enquiry arises. The question the Regulator asks first is: "What written technical and organisational measures do you have in place?"' } },
        { '@type': 'Question', name: 'What should a medical practice\'s POPIA operator agreement cover?', acceptedAnswer: { '@type': 'Answer', text: 'At minimum: scope of processing, categories of personal information handled, security measures required, breach notification timelines (the 72-hour expectation from the Regulator), audit rights, subcontractor handling, data return or destruction on termination, and indemnities. ZA Support provides a practice-specific operator agreement that references the actual systems, the actual staff, and the actual data flows, not a generic template.' } },
        { '@type': 'Question', name: 'Does the practice\'s Microsoft 365 licence satisfy POPIA compliance?', acceptedAnswer: { '@type': 'Answer', text: 'No. The Microsoft Data Protection Addendum is a global tenant-level document between Microsoft and the tenant administrator. It does not configure the tenant, does not monitor the configuration, does not train staff, does not detect or report breaches, and does not constitute a POPIA section 21 operator agreement between the practice and its IT provider. The licence provides tools, the managed IT provider applies them, configures them, monitors them, and documents that they remain configured.' } },
        { '@type': 'Question', name: 'What specific technical controls should a medical practice have in place?', acceptedAnswer: { '@type': 'Answer', text: 'The essentials for a Johannesburg medical practice: full-disk encryption on every device that stores patient data, multi-factor authentication on all Microsoft 365 accounts, documented access control (who can see which records), automated backups with tested restore, endpoint detection and response against ransomware, a segmented guest network separate from clinical systems, written acceptable-use and password policies, and an incident-response playbook. Each control is documentable and auditable.' } },
        { '@type': 'Question', name: 'What happens if a medical practice has a data breach in South Africa?', acceptedAnswer: { '@type': 'Answer', text: 'POPIA section 22 requires notification to the Information Regulator "as soon as reasonably possible" after becoming aware of a breach. Affected data subjects must also be notified. In practice the Regulator expects notification within 72 hours. A practice approaching the process from a position of documented corrective action, "these are the controls we had, this is what failed, this is what we have already fixed", is in a materially stronger position than one scrambling to reconstruct evidence after the fact.' } },
        { '@type': 'Question', name: 'How much does POPIA-aligned managed IT cost for a Johannesburg medical practice?', acceptedAnswer: { '@type': 'Answer', text: 'Our medical-practice managed IT service is scoped per practice after a documented assessment from R599. Typical pricing for a solo practice with two to three staff starts from R4,999 monthly and covers monitoring, backups, patching, endpoint security, Microsoft 365 administration, and the signed operator agreement. Larger practices with multiple rooms and integrated medical software are scoped individually. We do not publish fixed per-user pricing because practice environments vary too much for a single rate to be honest.' } },
        { '@type': 'Question', name: 'Does ZA Support work with medical software like GoodX or MedEDI?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We support practices running GoodX, MedEDI, Elixir, and Vericlaim as part of our managed IT service. We do not sell the medical software, the vendor handles the application itself, but we support the infrastructure it runs on: the workstations, the server or cloud environment, the network, the backups, and the security controls around the patient database. We maintain working relationships with the major vendors\' support teams so issues are resolved without the practice mediating.' } },
        { '@type': 'Question', name: 'How do I start a POPIA compliance review of my practice\'s IT?', acceptedAnswer: { '@type': 'Answer', text: 'Email courtney@zasupport.com or [WhatsApp 064 529 5863](https://wa.me/27645295863) with your practice name and location. We arrange a 30-minute site visit at 1 Hyde Park Lane or at the practice. The assessment (from R599) produces a written report covering: current technical controls, gaps against POPIA requirements, recommended remediation, indicative pricing, and a draft operator agreement., the report is yours regardless.' } },
      ],
    },
    'macbook-pro-m3-logic-board-repair-johannesburg': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Can the MacBook Pro M3 logic board actually be repaired, or does it always need replacement?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, the M3 logic board is repairable at component level for the majority of common failures. Charging IC faults, USB-C port damage, backlight circuit issues, and peripheral power delivery problems are all repairable by microsoldering the affected component back to the existing board. What cannot be repaired is damage to the M3 SoC itself, that one chip is the processor, GPU, and RAM combined, and if the SoC fails the board is a replacement. We identify this during the R599 assessment before quoting.' } },
        { '@type': 'Question', name: 'How much does MacBook Pro M3 logic board repair cost in Johannesburg?', acceptedAnswer: { '@type': 'Answer', text: 'Component-level M3 board repair at ZA Support ranges from R3,499 to R6,499. Charging IC repair is R3,499 to R4,499. USB-C port replacement is R3,999 to R4,999. Backlight circuit repair is R4,499 to R5,499. Liquid-damage reconstruction is R4,999 to R6,499. Apple\'s M3 board replacement quote is typically R32,000 to R55,000 because Apple swaps the entire board including the SoC. We address the specific fault without touching working components.' } },
        { '@type': 'Question', name: 'Will my data survive an M3 MacBook logic board repair?', acceptedAnswer: { '@type': 'Answer', text: 'On the M3 MacBook Pro the SSD is bonded to the logic board via a dedicated controller soldered alongside the SoC. If the board repair does not touch the SSD section and the SoC is intact, data is retained. We always image the SSD before starting board work as a precaution, this takes 45 to 90 minutes depending on drive size. If a client has an active Time Machine or iCloud backup we verify it during the R599 assessment before touching the board.' } },
        { '@type': 'Question', name: 'What are the most common MacBook Pro M3 logic board faults?', acceptedAnswer: { '@type': 'Answer', text: 'The five most common M3 Pro faults we see in the workshop: USB-C port physical damage (usually from repeated insertion at an angle), charging IC failure after a power surge or cheap non-MFi charger, backlight circuit failure following liquid contact, speaker amplifier IC failure (no sound), and Wi-Fi antenna connector fatigue. Each has a specific symptom signature. We do not see M3 SoC failures often, the chip itself is robust.' } },
        { '@type': 'Question', name: 'How long does MacBook Pro M3 logic board repair take?', acceptedAnswer: { '@type': 'Answer', text: 'Five to seven working days. Day one is disassembly and detailed microscope inspection. Days two to four are for the actual microsoldering work, M3 components are extremely small and require careful thermal control. Days five to six are reassembly and 48-hour soak testing. Day seven allows a buffer for unexpected complications. We do not rush M3 repairs; the tolerance for solder reflow errors is very low on M-series boards.' } },
        { '@type': 'Question', name: 'Is component-level M3 logic board repair better than Apple board replacement?', acceptedAnswer: { '@type': 'Answer', text: 'For the majority of faults, yes, component repair costs a third to a fifth of Apple\'s replacement quote, retains the SSD with existing data, and preserves the original serial number. Apple\'s advantage is speed (5 to 10 working days turnaround for parts) and a like-new board. The trade-off is cost: a R4,999 component repair versus a R42,000 board swap. For a machine that is two to three years old, the economics of component repair are compelling.' } },
        { '@type': 'Question', name: 'Do you repair MacBook Pro M3 boards from outside Johannesburg?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Our workshop at 1 Hyde Park Lane receives MacBook Pro M3 boards from Cape Town, Durban, Pretoria, and Bloemfontein regularly. We provide a courier-friendly packaging checklist and accept machines via The Courier Guy or Postnet overnight services. The assessment report and repair timeline are the same regardless of where the client is based. We return the repaired machine via the same courier service with insurance.' } },
        { '@type': 'Question', name: 'How do I book a MacBook Pro M3 logic board repair?', acceptedAnswer: { '@type': 'Answer', text: '[WhatsApp 064 529 5863](https://wa.me/27645295863) or email courtney@zasupport.com with your M3 MacBook Pro model (14-inch or 16-inch, base M3 or M3 Pro or M3 Max), serial number, and a description of the symptom. We confirm a drop-off slot or courier address within 24 hours. Assessment is R599 and includes a written diagnosis plus fixed-price repair quote within two working days.' } },
      ],
    },
    'imac-logic-board-repair-johannesburg-2026': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How much does iMac logic board repair cost in Johannesburg in 2026?', acceptedAnswer: { '@type': 'Answer', text: 'Component-level iMac board repair at ZA Support ranges from R2,999 to R6,499 depending on the fault and iMac generation. Power supply or backlight repair on 21.5" and 27" Intel iMacs (2012 to 2020) is R2,999 to R3,999. GPU resolder or power management IC repair is R3,999 to R4,999. M1 and M3 iMac board repairs are R4,499 to R6,499 due to component density. Apple\'s equivalent board replacement ranges from R18,000 to R35,000. Assessment from R599.' } },
        { '@type': 'Question', name: 'Which iMac generations do you repair at component level?', acceptedAnswer: { '@type': 'Answer', text: 'Every iMac from 2012 onwards is repairable at component level. Intel iMacs (2012, 2013, Late 2013, Mid 2014, Mid 2015, Late 2015, 2017, 2019, 2020) and Apple Silicon iMacs (M1 2021, M3 2023, M4 2024) all pass through our workshop regularly. The 2012 to 2015 iMacs with spinning hard drives are especially common, a board repair plus an SSD upgrade transforms the machine. Pre-2012 iMacs are harder to source parts for and we assess economic viability case by case.' } },
        { '@type': 'Question', name: 'What are the most common iMac logic board faults?', acceptedAnswer: { '@type': 'Answer', text: 'The five most common: power supply board failure (iMac does not turn on, backlight flickers, or machine shuts down randomly), GPU solder fatigue on 2011 to 2015 Late 27" iMacs, backlight LED driver circuit failure (image visible under torch but screen dark), VRM capacitor failure on the main logic board, and fan controller IC failure (fans run at full speed or not at all). Each has distinct diagnostic markers we verify during assessment.' } },
        { '@type': 'Question', name: 'Can an iMac that does not turn on be repaired?', acceptedAnswer: { '@type': 'Answer', text: 'In the vast majority of cases, yes. A no-power iMac is one of our most common intakes and the failure is usually in the power supply unit (PSU) or the power management section of the logic board, both repairable. We test the PSU first as a discrete unit; if it is good, we move to logic board power delivery. Out of roughly 200 no-power iMacs we have assessed over the past three years, approximately 85 percent were economically repairable.' } },
        { '@type': 'Question', name: 'Do I need to bring the iMac to your workshop, or can you collect it?', acceptedAnswer: { '@type': 'Answer', text: 'For clients in the Gauteng 60km service area (Sandton, Rosebank, Bryanston, Fourways, Midrand, Centurion, Pretoria, and surrounds) we offer a paid collection-and-return service from R499 depending on distance. Clients outside Gauteng typically send iMacs via The Courier Guy Overnight Express, we provide the packaging guidance. Walk-in drop-off at 1 Hyde Park Lane is free. Assessment fee of R599 applies regardless of how the iMac reaches us.' } },
        { '@type': 'Question', name: 'Will my iMac data be safe during logic board repair?', acceptedAnswer: { '@type': 'Answer', text: 'Yes for Intel iMacs, the storage (SSD, HDD, or Fusion Drive) is a separate module that we remove before board work and reinstall afterwards. Data is preserved. For M1 and M3 iMacs the SSD is soldered to the board, so if the repair touches the storage section we discuss this at the quote stage. In all cases we recommend a verified Time Machine or iCloud backup before any board work, we verify this during the R599 assessment.' } },
        { '@type': 'Question', name: 'Is it worth repairing a 2015 or 2017 Intel iMac instead of buying a new M4?', acceptedAnswer: { '@type': 'Answer', text: 'For document work, web browsing, creative photography, video editing up to 1080p, and office productivity, a 2015 or 2017 iMac with a working logic board, 16 GB of RAM, and a 1 TB SSD is perfectly capable, and the upgrade costs roughly R7,500 total versus R35,000 for a base M4 iMac. For professional 4K video, Final Cut Pro, Logic Pro with large plugin chains, or code compilation on large projects, the M4 Intel jump is material. We give an honest recommendation during assessment.' } },
        { '@type': 'Question', name: 'How do I book an iMac logic board repair assessment?', acceptedAnswer: { '@type': 'Answer', text: '[WhatsApp 064 529 5863](https://wa.me/27645295863) or email courtney@zasupport.com with your iMac model (size, year, processor), serial number from the back stand, and a description of the fault. We confirm a drop-off slot or arrange collection within 24 hours. Assessment is R599 and produces a written diagnosis plus fixed-price repair quote within two working days. From R599 assessment if the board is not economically repairable.' } },
      ],
    },
    'iphone-fold-is-on-track-to-launch-this-september-per-ma-south-africa-2026': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'When is the iPhone Fold expected to launch in South Africa?', acceptedAnswer: { '@type': 'Answer', text: 'Based on current supply-chain reporting from Ming-Chi Kuo and other Apple analysts, the iPhone Fold is on track for a September 2026 announcement with general availability shortly afterwards. South African availability typically lags the US launch by two to four weeks, so mid-October to early November 2026 is a realistic local arrival window. iStore and authorised resellers will list pre-order options once Apple confirms dates.' } },
        { '@type': 'Question', name: 'How much will the iPhone Fold cost in South Africa?', acceptedAnswer: { '@type': 'Answer', text: 'Apple has not announced pricing. Analyst estimates put the US starting price between US$2,000 and US$2,500. Translated to South African pricing after VAT, exchange rate, and local margin, a reasonable projection is R45,000 to R55,000 for the base configuration. Final South African pricing will be confirmed by iStore closer to launch.' } },
        { '@type': 'Question', name: 'Will the iPhone Fold replace my existing iPhone Pro?', acceptedAnswer: { '@type': 'Answer', text: 'Not for most users. The iPhone Fold targets a specific use case, productivity workflows, document editing on a tablet-sized screen, and professional multitasking, at a price point that positions it as a complement to, not a replacement for, the standard Pro line. Apple is expected to continue the iPhone 18 Pro and Pro Max in 2026 alongside the Fold.' } },
        { '@type': 'Question', name: 'Will iPhone Fold screens be repairable at ZA Support?', acceptedAnswer: { '@type': 'Answer', text: 'Folding displays introduce new repair complexity, the hinge mechanism, the inner flexible panel, and the crease durability are all first-generation components. We will offer repair services once parts become available through our component-level supply network, typically six to twelve months after launch. In the interim clients needing inner-display repair will need to use Apple\'s authorised service. We will publish pricing and availability once the parts channel stabilises.' } },
        { '@type': 'Question', name: 'Is an iPhone Fold a better option than an iPad for business users?', acceptedAnswer: { '@type': 'Answer', text: 'It depends on workflow. A Fold gives you a phone and a tablet in one device, excellent for always-connected professionals who need to read documents, respond to email, and review contracts on a larger screen without carrying two devices. An iPad with an Apple Pencil remains better for drawing, detailed annotation, large-format design work, and multi-hour content creation due to the larger screen and longer battery. We help business clients choose the right combination based on actual use rather than hype.' } },
        { '@type': 'Question', name: 'Will ZA Support stock iPhone Fold devices?', acceptedAnswer: { '@type': 'Answer', text: 'ZA Support is not a retailer, we do not sell new iPhones. We do advise clients on procurement, help them choose the right model for their workflow, and provide POPIA-aligned device management for medical practices, law firms, and financial service businesses deploying new iPhones at scale. For new iPhone purchases we recommend iStore South Africa for warranty and AppleCare access.' } },
        { '@type': 'Question', name: 'What happens if my iPhone Fold has liquid damage?', acceptedAnswer: { '@type': 'Answer', text: 'The hinge mechanism on a folding phone introduces a water ingress path that traditional solid-chassis iPhones do not have. Apple\'s IP rating on the first-generation iPhone Fold is expected to be lower than the iPhone 17 Pro. If liquid enters via the hinge it can corrode the inner flexible display cables and the main logic board. Take the device to a component-level workshop immediately, do not power on, do not put in rice. ZA Support will offer iPhone Fold liquid damage assessment once the model is available locally.' } },
        { '@type': 'Question', name: 'How do I prepare my business for iPhone Fold deployment?', acceptedAnswer: { '@type': 'Answer', text: 'The infrastructure preparation is identical to any new iPhone rollout: multi-factor authentication on Microsoft 365 and Apple Business Manager, mobile device management (MDM) enrolment to apply security policies, clear acceptable-use policies for personal and business data separation, POPIA-aligned handling of any patient or client data stored on the device, and verified backup of existing iPhone data before migration. ZA Support manages this deployment for Johannesburg medical practices, law firms, and corporate clients, contact us for a scoping conversation.' } },
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

  const personSchema: SchemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Courtney Bentley',
    url: 'https://zasupport.com/author/courtney-bentley',
    jobTitle: 'Apple Certified Expert Consultant',
    worksFor: {
      '@type': 'Organization',
      name: 'ZA Support',
      url: 'https://zasupport.com',
    },
    sameAs: [
      'https://www.linkedin.com/in/bentleycourtney/',
      'https://www.tiktok.com/@appleexpertza',
      'https://x.com/za_support',
      'https://www.facebook.com/courtney.bentley.10/',
      'https://www.instagram.com/appleexpertza/',
    ],
    knowsAbout: [
      'Apple Mac repair',
      'MacBook logic board repair',
      'Apple liquid damage recovery',
      'MacBook Pro component-level repair',
      'Apple device diagnostics',
      'JAMF MDM',
      'Apple enterprise fleet management',
    ],
  };

  const schemas: SchemaOrg[] = [articleSchema, breadcrumbSchema, aggregateRatingSchema, personSchema];
  if (post.category.toLowerCase().includes('news')) {
    schemas.push({ ...articleSchema, '@type': 'NewsArticle' });
  }
  if (faqSchemas[slug]) {
    schemas.push(faqSchemas[slug]);
  } else {
    const extractedFaqs = extractFaqsFromContent(post.content);
    if (extractedFaqs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: extractedFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      });
    }
  }

  return (
    <>
      <SchemaOrgComp schema={schemas} keepPricing />

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
          {post.featuredImage && (
            <figure className="mt-8">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="rounded-2xl w-full max-h-96 object-cover"
                loading="eager"
              />
            </figure>
          )}
        </div>
      </section>

      {/* §CRO service handoff, route the scanning reader to the page that converts (top, not buried) */}
      {(() => { const svc = matchService(post); return (
      <section className="pt-10 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.25)] rounded-2xl">
            <p className="text-[#E8F4F1] text-sm sm:text-base flex-1">
              <span className="font-bold">Device giving trouble?</span> If you have {svc.problem}, you do not have to read the full guide. Message us on WhatsApp for a fixed quote, or see our <Link href={svc.href} className="text-[#0FEA7A] underline font-semibold">{svc.label}</Link> page.
            </p>
            <a href={`https://wa.me/27645295863?text=${encodeURIComponent(`Hi ZAS, I'm enquiring from the /blog/${slug} page [REF:BLOG-HANDOFF-${slug.toUpperCase().replace(/[^A-Z0-9-]/g, '')}]`)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-6 py-3 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all whitespace-nowrap">
              WhatsApp for a Quote
            </a>
          </div>
        </div>
      </section>
      ); })()}

      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 lg:p-12">
            <article className="prose-custom">
              {renderContent(injectWaTracking(post.content, slug), post.excerpt)}
            </article>
            <AuthorBox authorSlug={getAuthorSlug(post.author)} />
          </div>

          <div className="mt-12 p-6 bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-2xl text-center">
            <p className="text-[#E8F4F1] font-bold text-lg mb-2">Need a repair? Assessment from R599.</p>
            <p className="text-[#7A9E98] mb-6">Hyde Park, Johannesburg. Same-day diagnostics available.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={`https://wa.me/27645295863?text=${encodeURIComponent(`Hi ZAS, I'm enquiring from the /blog/${slug} page [REF:BLOG-CTA-${slug.toUpperCase().replace(/[^A-Z0-9-]/g, '')}]`)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-3 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.113.549 4.1 1.51 5.83L0 24l6.335-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.808 9.808 0 01-5.002-1.368l-.36-.214-3.715.97.99-3.614-.235-.372A9.808 9.808 0 012.182 12c0-5.417 4.401-9.818 9.818-9.818 5.417 0 9.818 4.401 9.818 9.818 0 5.417-4.401 9.818-9.818 9.818z"/></svg>
                WhatsApp
              </a>
              <a href="/book" className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.4)] text-[#0FEA7A] px-8 py-3 rounded-xl font-bold hover:bg-[rgba(15,234,122,0.1)] transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                Book a Repair
              </a>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-lg font-bold text-[#E8F4F1] mb-4">ZA Support Services</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: 'Logic Board Repair', href: '/logic-board-repair' },
                { label: 'Liquid Damage Repair', href: '/liquid-damage' },
                { label: 'Battery Replacement', href: '/battery-replacement' },
                { label: 'MacBook Repair', href: '/macbook-repair' },
                { label: 'iMac Repair', href: '/imac-repair' },
                { label: 'Apple Repair Hub', href: '/apple-repair' },
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
