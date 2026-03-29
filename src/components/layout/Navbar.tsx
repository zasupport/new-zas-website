'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Phone, Menu, X, Calendar, Search, ChevronDown } from 'lucide-react';
import { NAV_LINKS, buildWhatsAppUrl } from '@/lib/constants';
import Logo, { useLogoVariant } from './Logo';
import NavSearch from './NavSearch';
import { trackWhatsAppClick, trackPhoneTap } from '@/lib/analytics';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [mobileSearch, setMobileSearch] = useState('');
  const logoVariant = useLogoVariant();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[rgba(10,26,24,0.98)] backdrop-blur-xl border-b border-[rgba(15,234,122,0.1)] shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
          : 'bg-[rgba(10,26,24,0.75)] backdrop-blur-md border-b border-[rgba(15,234,122,0.06)]'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Logo />

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div key={link.label} className="relative">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                    className="flex items-center gap-1 px-4 py-2 text-[#7A9E98] hover:text-[#E8F4F1] hover:bg-[rgba(15,234,122,0.06)] rounded-lg transition-all duration-200 text-sm font-medium"
                  >
                    {link.label}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === link.label ? 'rotate-180 text-[#0FEA7A]' : ''}`}
                    />
                  </button>

                  {openDropdown === link.label && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-[rgba(10,22,20,0.98)] backdrop-blur-xl border border-[rgba(15,234,122,0.15)] rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.6)] py-2 z-50">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setOpenDropdown(null)}
                          className="flex flex-col px-4 py-3 hover:bg-[rgba(15,234,122,0.07)] transition-all group"
                        >
                          <span className="text-[#E8F4F1] text-sm font-medium group-hover:text-[#0FEA7A] transition-colors">
                            {child.label}
                          </span>
                          {child.desc && (
                            <span className="text-[#7A9E98] text-xs mt-0.5">{child.desc}</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpenDropdown(null)}
                  className="px-4 py-2 text-[#7A9E98] hover:text-[#E8F4F1] hover:bg-[rgba(15,234,122,0.06)] rounded-lg transition-all duration-200 text-sm font-medium"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Desktop Phone CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <NavSearch />
            <a
              href={`tel:${logoVariant.tel}`}
              onClick={() => trackPhoneTap('navbar-desktop', 'NAV-DESK')}
              data-ref="NAV-DESK"
              className="flex items-center gap-2 text-[#E8F4F1] hover:text-[#0FEA7A] transition-colors text-sm font-medium"
            >
              <Phone className="w-4 h-4 text-[#0FEA7A]" />
              {logoVariant.phone}
            </a>
            <a
              href={buildWhatsAppUrl('NAV-DESK', 'general')}
              onClick={() => trackWhatsAppClick('navbar-desktop', 'general', 'NAV-DESK')}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0FEA7A] text-[#0A1A18] px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_20px_rgba(15,234,122,0.4)] transition-all"
            >
              💬 WhatsApp
            </a>
            <Link
              href="/book"
              className="flex items-center gap-1.5 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
            >
              <Calendar className="w-4 h-4" />
              Book a Repair
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-[#7A9E98] hover:text-[#E8F4F1] hover:bg-[rgba(255,255,255,0.06)] rounded-lg transition-all"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>
    </header>

      {/* Mobile Menu — rendered OUTSIDE header to avoid stacking context trap */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-[rgba(10,26,24,0.98)] backdrop-blur-xl z-[60] overflow-y-auto">
          <div className="flex flex-col p-6 gap-2">
            {/* Mobile Search */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const q = mobileSearch.trim();
                if (!q) return;
                setMobileOpen(false);
                setMobileSearch('');
                router.push(`/search?q=${encodeURIComponent(q)}`);
              }}
              className="flex gap-2 mb-2"
            >
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A9E98]" />
                <input
                  type="search"
                  value={mobileSearch}
                  onChange={(e) => setMobileSearch(e.target.value)}
                  placeholder="Search services…"
                  className="w-full bg-[rgba(15,234,122,0.06)] border border-[rgba(15,234,122,0.2)] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-[#7A9E98] focus:outline-none focus:border-[#0FEA7A]/50"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-3 bg-[#0FEA7A] text-[#0A1A18] rounded-xl text-sm font-semibold"
              >
                Go
              </button>
            </form>

            {NAV_LINKS.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === link.label ? null : link.label)}
                    className="w-full flex items-center justify-between px-4 py-3 text-[#E8F4F1] hover:text-[#0FEA7A] hover:bg-[rgba(15,234,122,0.08)] rounded-xl transition-all text-lg font-medium border-b border-[rgba(255,255,255,0.04)]"
                  >
                    {link.label}
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-200 ${mobileExpanded === link.label ? 'rotate-180 text-[#0FEA7A]' : 'text-[#7A9E98]'}`}
                    />
                  </button>
                  {mobileExpanded === link.label && (
                    <div className="ml-4 mt-1 flex flex-col gap-1 border-l border-[rgba(15,234,122,0.15)] pl-4">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => { setMobileOpen(false); setMobileExpanded(null); }}
                          className="py-2.5 text-[#7A9E98] hover:text-[#0FEA7A] transition-colors text-base font-medium"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-[#E8F4F1] hover:text-[#0FEA7A] hover:bg-[rgba(15,234,122,0.08)] rounded-xl transition-all text-lg font-medium border-b border-[rgba(255,255,255,0.04)]"
                >
                  {link.label}
                </Link>
              )
            )}

            <div className="mt-6 flex flex-col gap-3">
              <a
                href={buildWhatsAppUrl('NAV-MOB', 'general')}
                onClick={() => { trackWhatsAppClick('navbar-mobile', 'general', 'NAV-MOB'); setMobileOpen(false); }}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-6 py-4 rounded-xl font-semibold text-lg hover:bg-[#0FEA7A]/90 transition-all"
              >
                💬 WhatsApp for Quote
              </a>
              <Link
                href="/book"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-6 py-4 rounded-xl font-semibold text-lg hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Calendar className="w-5 h-5" />
                Book a Repair
              </Link>
              <a
                href={`tel:${logoVariant.tel}`}
                onClick={() => { trackPhoneTap('navbar-mobile', 'NAV-MOB'); setMobileOpen(false); }}
                data-ref="NAV-MOB"
                className="flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#7A9E98] px-6 py-4 rounded-xl font-semibold text-lg hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <Phone className="w-5 h-5" />
                Call {logoVariant.phone}
              </a>
              <p className="text-center text-[#7A9E98] text-sm">
                Mon–Fri 08:00–17:30 | Closed Sat & Sun
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
