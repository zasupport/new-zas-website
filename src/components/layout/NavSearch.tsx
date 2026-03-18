'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowRight } from 'lucide-react';

const REVENUE_LINKS = [
  { label: 'Logic Board Repair', href: '/logic-board-repair', tag: 'Most popular' },
  { label: 'MacBook Repair Johannesburg', href: '/macbook-repair', tag: null },
  { label: 'Liquid Damage Recovery', href: '/liquid-damage', tag: null },
  { label: 'MacBook Battery Replacement', href: '/battery-replacement', tag: null },
  { label: 'Managed IT Services', href: '/managed-services', tag: 'High value' },
  { label: 'Mac Health Check', href: '/services', tag: null },
];

export default function NavSearch() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setValue('');
      }
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = value.trim();
    if (!q) return;
    setOpen(false);
    setValue('');
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <div ref={containerRef} className="relative">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="p-2 text-[#7A9E98] hover:text-[#0FEA7A] hover:bg-[rgba(15,234,122,0.06)] rounded-lg transition-all"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="flex items-center gap-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#0FEA7A]/60 pointer-events-none" />
            <input
              ref={inputRef}
              type="search"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Search services…"
              className="w-52 bg-[rgba(15,234,122,0.06)] border border-[rgba(15,234,122,0.25)] rounded-lg pl-8 pr-3 py-1.5 text-sm text-white placeholder-[#7A9E98] focus:outline-none focus:border-[#0FEA7A]/60 focus:ring-1 focus:ring-[#0FEA7A]/20"
            />
          </div>
          <button
            type="button"
            onClick={() => { setOpen(false); setValue(''); }}
            className="p-1.5 text-[#7A9E98] hover:text-white rounded-lg transition-all"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </form>
      )}

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-[rgba(10,26,24,0.98)] border border-[rgba(15,234,122,0.15)] rounded-xl shadow-[0_16px_48px_rgba(0,0,0,0.6)] backdrop-blur-xl z-50 overflow-hidden">
          <div className="px-3 py-2 border-b border-[rgba(255,255,255,0.06)]">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#7A9E98]">Popular Services</p>
          </div>
          <div className="py-1">
            {REVENUE_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => { setOpen(false); setValue(''); }}
                className="flex items-center justify-between px-3 py-2.5 hover:bg-[rgba(15,234,122,0.08)] group transition-all"
              >
                <span className="text-sm text-[#E8F4F1] group-hover:text-[#0FEA7A] transition-colors">
                  {link.label}
                </span>
                <div className="flex items-center gap-2">
                  {link.tag && (
                    <span className="text-[10px] bg-[rgba(15,234,122,0.15)] text-[#0FEA7A] px-1.5 py-0.5 rounded-full font-medium">
                      {link.tag}
                    </span>
                  )}
                  <ArrowRight className="w-3 h-3 text-[#7A9E98] group-hover:text-[#0FEA7A] transition-colors" />
                </div>
              </a>
            ))}
          </div>
          {value.trim() && (
            <div className="border-t border-[rgba(255,255,255,0.06)] px-3 py-2">
              <button
                type="button"
                onClick={handleSubmit as unknown as React.MouseEventHandler}
                className="w-full flex items-center justify-between text-sm text-[#0FEA7A] hover:text-white transition-colors py-1"
              >
                <span>Search for &ldquo;{value}&rdquo;</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
