'use client';

import { usePathname } from 'next/navigation';
import { AlertTriangle } from 'lucide-react';

const PRICING_ROUTES = [
  '/battery-replacement',
  '/screen-repair',
  '/liquid-damage',
  '/logic-board-repair',
  '/iphone-repair',
  '/ipad-repair',
  '/imac-repair',
  '/mac-mini-repair',
  '/macbook-repair',
  '/macbook-pro-repair',
  '/macbook-air-repair',
  '/apple-watch-repair',
  '/airpods-repair',
  '/accessories-repair',
  '/macbook-not-turning-on',
  '/services',
  '/managed-services',
  '/apple-repair',
  '/apple-support',
  '/medical-it',
  '/enterprise',
  '/sme-support',
  '/government',
  '/no-fix-no-fee',
  '/book',
  '/blog',
  '/guides',
];

function shouldShow(pathname: string): boolean {
  if (pathname === '/') return true;
  return PRICING_ROUTES.some((r) => pathname === r || pathname.startsWith(`${r}/`));
}

export default function PricingDisclaimer() {
  const pathname = usePathname() || '/';
  if (!shouldShow(pathname)) return null;

  return (
    <section aria-label="Pricing disclaimer" className="bg-black py-3 border-b border-red-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="flex items-start gap-3 rounded-xl px-4 py-3"
          style={{
            background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
          }}
        >
          <AlertTriangle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" aria-hidden />
          <div>
            <p className="text-white font-bold text-sm sm:text-base leading-snug">
              Indicative pricing only. Final pricing is confirmed once ZA Support verifies your device model and serial number.
            </p>
            <p className="text-red-100 text-xs sm:text-sm mt-1 leading-snug">
              All prices shown are starting points and subject to device-specific assessment. Contact ZA Support on 064 529 5863
              with your model and serial number for a confirmed quote.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
