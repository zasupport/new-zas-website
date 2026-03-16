'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

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
  apple:   { label: 'Apple Experts',          phone: '064 529 5863', tel: '+27645295863' },
  it:      { label: 'IT Specialist',           phone: '063 529 5863', tel: '+27635295863' },
  medical: { label: 'Medical IT Specialist',   phone: '064 529 5863', tel: '+27645295863' },
} as const;

export function useLogoVariant() {
  const pathname = usePathname();
  return VARIANTS[getVariant(pathname)];
}

/* SVG brand mark — matches the official ZA Support logo:
   partial circle arc, bold "za", green leaf, spaced "support" */
function ZaMarkSvg() {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      aria-hidden="true"
      className="flex-shrink-0"
    >
      {/* Partial circle arc — open at bottom-left (~300°) */}
      <path
        d="M 9 34 A 16 16 0 1 1 35 34"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Bold "z" */}
      <text
        x="8"
        y="33"
        fontFamily="'Inter', 'Arial', sans-serif"
        fontWeight="800"
        fontSize="19"
        fill="white"
        letterSpacing="-0.5"
      >
        z
      </text>
      {/* Bold "a" */}
      <text
        x="20"
        y="33"
        fontFamily="'Inter', 'Arial', sans-serif"
        fontWeight="800"
        fontSize="19"
        fill="white"
        letterSpacing="-0.5"
      >
        a
      </text>
      {/* Green leaf at top-right of "a" */}
      <g transform="translate(33, 11) rotate(-30)">
        <ellipse cx="0" cy="0" rx="3" ry="5.5" fill="#0FEA7A" />
        <line x1="0" y1="-5" x2="0" y2="4" stroke="#0A1A18" strokeWidth="0.7" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export default function Logo() {
  const pathname = usePathname();
  const config = VARIANTS[getVariant(pathname)];

  return (
    <Link href="/" className="flex items-center gap-1.5 group select-none">
      {/* SVG brand mark */}
      <div className="group-hover:drop-shadow-[0_0_8px_rgba(15,234,122,0.5)] transition-all duration-200">
        <ZaMarkSvg />
      </div>

      {/* Text stack: "support" + variant label */}
      <div className="flex flex-col leading-none -ml-0.5">
        <span
          className="text-[#0FEA7A] font-light text-[13px] tracking-[0.35em] uppercase"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          support
        </span>
        <span className="text-[#E8F4F1] font-bold text-[11px] tracking-wide mt-0.5 group-hover:text-white transition-colors whitespace-nowrap">
          {config.label}
        </span>
      </div>
    </Link>
  );
}
