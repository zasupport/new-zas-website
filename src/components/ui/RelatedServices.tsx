import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ServiceLink {
  title: string;
  href: string;
  description?: string;
}

interface RelatedServicesProps {
  heading?: string;
  services: ServiceLink[];
}

// Predefined service sets for common page types
export const RELATED_LOGIC_BOARD: ServiceLink[] = [
  { title: 'Liquid Damage Repair', href: '/liquid-damage', description: 'Board-level professional cleaning' },
  { title: 'MacBook Not Turning On', href: '/macbook-not-turning-on', description: 'Same-day assessment: from R599' },
  { title: 'MacBook Repair', href: '/macbook-repair', description: 'All models, all faults' },
  { title: 'Pricing & Assessment', href: '/no-fix-no-fee', description: 'Assessment: from R599' },
  { title: 'About ZA Support', href: '/about', description: '16 years, 3,000+ repairs' },
];

export const RELATED_MACBOOK_REPAIR: ServiceLink[] = [
  { title: 'Logic Board Repair', href: '/logic-board-repair', description: 'Expert component-level repair' },
  { title: 'Liquid Damage', href: '/liquid-damage', description: 'Professional board cleaning' },
  { title: 'Battery Replacement', href: '/macbook-repair/battery', description: 'All models, same-day' },
  { title: 'Screen Replacement', href: '/macbook-repair/screen', description: 'Retina display repair' },
  { title: 'Pricing & Assessment', href: '/no-fix-no-fee', description: 'Assessment: from R599' },
];

export const RELATED_LIQUID_DAMAGE: ServiceLink[] = [
  { title: 'Logic Board Repair', href: '/logic-board-repair', description: 'Component-level repair specialists' },
  { title: 'MacBook Not Turning On', href: '/macbook-not-turning-on', description: 'Power fault diagnosis' },
  { title: 'iPhone Repair', href: '/iphone-repair', description: 'All iPhone models' },
  { title: 'iPad Repair', href: '/ipad-repair', description: 'Screen, battery, liquid' },
  { title: 'Pricing & Assessment', href: '/no-fix-no-fee', description: 'Assessment: from R599' },
];

export const RELATED_IPHONE: ServiceLink[] = [
  { title: 'iPad Repair', href: '/ipad-repair', description: 'All iPad generations' },
  { title: 'MacBook Repair', href: '/macbook-repair', description: 'Battery, screen, logic board' },
  { title: 'Liquid Damage Repair', href: '/liquid-damage', description: 'Board-level cleaning' },
  { title: 'Apple Support', href: '/apple-support', description: 'AppleCare alternatives' },
  { title: 'Pricing & Assessment', href: '/no-fix-no-fee', description: 'Assessment: from R599' },
];

export default function RelatedServices({ heading = 'Related Services', services }: RelatedServicesProps) {
  return (
    <section className="py-16 border-t border-[#27504D]/20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-[#E8F4F1] mb-8">{heading}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {services.map((svc) => (
            <a
              key={svc.href}
              href={svc.href}
              className="group flex flex-col gap-1 p-4 rounded-xl border border-[#27504D]/30 hover:border-[#0FEA7A]/50 bg-[#111C1A]/60 hover:bg-[#0FEA7A]/5 transition-all"
            >
              <span className="flex items-center gap-1 text-sm font-semibold text-[#E8F4F1] group-hover:text-[#0FEA7A] transition-colors">
                {svc.title}
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </span>
              {svc.description && (
                <span className="text-xs text-[#7A9E98]">{svc.description}</span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// Re-export Link for use in pages that need it alongside this component
export { Link };
