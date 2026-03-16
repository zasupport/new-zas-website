'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

type LogoVariant = 'apple' | 'it' | 'medical';

const APPLE_PATHS = [
  '/',
  '/apple-repair',
  '/services',
  '/book',
  '/blog',
  '/contact',
];

const APPLE_PREFIXES = [
  '/macbook',
  '/logic-board',
  '/liquid-damage',
  '/iphone',
  '/ipad',
  '/apple-watch',
  '/airpods',
  '/accessories',
  '/apple-support/medical',
];

const IT_PREFIXES = [
  '/managed-services',
  '/jamf',
  '/enterprise',
  '/apple-support/business',
  '/apple-support/sme',
  '/network',
  '/cyber',
];

const MEDICAL_PREFIXES = [
  '/apple-support/medical',
  '/medical',
];

function getVariant(pathname: string): LogoVariant {
  for (const prefix of MEDICAL_PREFIXES) {
    if (pathname.startsWith(prefix)) return 'medical';
  }
  for (const prefix of IT_PREFIXES) {
    if (pathname.startsWith(prefix)) return 'it';
  }
  for (const prefix of APPLE_PREFIXES) {
    if (pathname.startsWith(prefix)) return 'apple';
  }
  if (APPLE_PATHS.includes(pathname)) return 'apple';
  return 'apple';
}

const VARIANTS = {
  apple: {
    label: 'Apple Experts',
    phone: '064 529 5863',
    tel: '+27645295863',
    accentClass: 'text-[#0FEA7A]',
  },
  it: {
    label: 'IT Specialist',
    phone: '063 529 5863',
    tel: '+27635295863',
    accentClass: 'text-[#0FEA7A]',
  },
  medical: {
    label: 'Medical IT Specialist',
    phone: '064 529 5863',
    tel: '+27645295863',
    accentClass: 'text-[#0FEA7A]',
  },
} as const;

export function useLogoVariant() {
  const pathname = usePathname();
  const variant = getVariant(pathname);
  return VARIANTS[variant];
}

export default function Logo() {
  const pathname = usePathname();
  const variant = getVariant(pathname);
  const config = VARIANTS[variant];

  return (
    <Link href="/" className="flex items-center gap-2.5 group select-none">
      {/* Icon mark */}
      <div className="relative flex-shrink-0">
        <div className="w-9 h-9 bg-[#0FEA7A] rounded-lg flex items-center justify-center group-hover:shadow-[0_0_16px_rgba(15,234,122,0.5)] transition-all duration-200">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M9 1.5L16 5.25V9C16 12.75 12.9 16.275 9 17.25C5.1 16.275 2 12.75 2 9V5.25L9 1.5Z" fill="#0A1A18" fillOpacity="0.15" stroke="#0A1A18" strokeWidth="1.5" strokeLinejoin="round"/>
            <path d="M6.5 9L8.5 11L11.5 7" stroke="#0A1A18" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Text stack */}
      <div className="flex flex-col leading-none">
        <span className="font-bold text-[15px] tracking-tight text-[#E8F4F1] group-hover:text-white transition-colors">
          za support<span className="text-[#0FEA7A]">.</span>
        </span>
        <span className="text-[10px] font-medium tracking-wide text-[#7A9E98] group-hover:text-[#0FEA7A]/70 transition-colors uppercase mt-0.5">
          {config.label}
        </span>
      </div>
    </Link>
  );
}
