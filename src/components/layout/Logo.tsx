'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

type LogoVariant = 'apple' | 'it' | 'medical';

const MEDICAL_PREFIXES = ['/apple-support/medical', '/medical'];
const IT_PREFIXES = ['/managed-services', '/jamf', '/enterprise', '/apple-support/business', '/apple-support/sme', '/network', '/cyber'];
const APPLE_PREFIXES = ['/macbook', '/logic-board', '/liquid-damage', '/iphone', '/ipad', '/apple-watch', '/airpods', '/accessories'];
const APPLE_EXACT = ['/', '/apple-repair', '/services', '/book', '/blog', '/contact'];

function getVariant(pathname: string): LogoVariant {
  for (const p of MEDICAL_PREFIXES) if (pathname.startsWith(p)) return 'medical';
  for (const p of IT_PREFIXES) if (pathname.startsWith(p)) return 'it';
  for (const p of APPLE_PREFIXES) if (pathname.startsWith(p)) return 'apple';
  if (APPLE_EXACT.includes(pathname)) return 'apple';
  return 'apple';
}

const VARIANTS = {
  apple:   { label: 'Apple Experts',          phone: '064 529 5863', tel: '+27645295863', logo: '/za-logo-apple-experts.png' },
  it:      { label: 'IT Specialist',           phone: '063 529 5863', tel: '+27635295863', logo: '/za-logo-it-specialist.png' },
  medical: { label: 'Medical IT Specialist',   phone: '064 529 5863', tel: '+27645295863', logo: '/za-logo-apple-experts.png' },
} as const;

export function useLogoVariant() {
  const pathname = usePathname();
  return VARIANTS[getVariant(pathname)];
}

export default function Logo() {
  const pathname = usePathname();
  const config = VARIANTS[getVariant(pathname)];

  return (
    <Link href="/" className="flex items-center gap-1.5 group select-none">
      <Image
        src={config.logo}
        alt={`ZA Support — ${config.label}`}
        width={160}
        height={44}
        className="h-10 w-auto group-hover:drop-shadow-[0_0_8px_rgba(15,234,122,0.5)] transition-all duration-200"
        priority
      />
    </Link>
  );
}
