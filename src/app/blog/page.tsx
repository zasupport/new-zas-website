import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog, Apple Tips, Repair Guides & Tech News | ZA Support',
  description: 'Apple repair tips, macOS guides, device maintenance advice, and IT news from ZA Support, Johannesburg\'s Apple specialists.',
  alternates: { canonical: 'https://zasupport.com/blog' },
};

const posts = [
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
