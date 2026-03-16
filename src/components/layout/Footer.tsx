import Link from 'next/link';
import { Phone, Mail, MapPin, Zap, ExternalLink } from 'lucide-react';
import { CONTACT, SITE, SOCIAL } from '@/lib/constants';

const serviceLinks = [
  { label: 'Liquid Damage Repair', href: '/liquid-damage' },
  { label: 'Logic Board Repair', href: '/logic-board-repair' },
  { label: 'iPhone Repair', href: '/iphone-repair' },
  { label: 'iPad Repair', href: '/ipad-repair' },
  { label: 'Apple Repair Hub', href: '/apple-repair' },
  { label: 'JAMF MDM', href: '/jamf-mdm' },
  { label: 'Managed Services', href: '/managed-services' },
];

const infoLinks = [
  { label: 'About ZA Support', href: '/about' },
  { label: 'Services & Pricing', href: '/services' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Blog', href: '/blog' },
  { label: 'Apple Support', href: '/apple-support' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A1A18] border-t border-[rgba(15,234,122,0.1)]">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#0FEA7A] rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#0A1A18]" />
              </div>
              <span className="font-bold text-xl text-[#E8F4F1]">
                ZA Support<span className="text-[#0FEA7A]">.</span>
              </span>
            </Link>
            <p className="text-[#7A9E98] text-sm leading-relaxed mb-6">
              Johannesburg&apos;s Apple repair specialists. Logic board microsoldering, liquid damage,
              iPhone &amp; iPad repair, JAMF MDM, and managed IT services.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={SOCIAL.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] rounded-lg flex items-center justify-center text-[#7A9E98] hover:text-[#0FEA7A] hover:border-[rgba(15,234,122,0.4)] transition-all"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] rounded-lg flex items-center justify-center text-[#7A9E98] hover:text-[#0FEA7A] hover:border-[rgba(15,234,122,0.4)] transition-all"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href={SOCIAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.15)] rounded-lg flex items-center justify-center text-[#7A9E98] hover:text-[#0FEA7A] hover:border-[rgba(15,234,122,0.4)] transition-all"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-[#E8F4F1] font-semibold mb-5 text-sm uppercase tracking-wider">
              Repair Services
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#7A9E98] hover:text-[#0FEA7A] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-[#E8F4F1] font-semibold mb-5 text-sm uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-3">
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#7A9E98] hover:text-[#0FEA7A] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[#E8F4F1] font-semibold mb-5 text-sm uppercase tracking-wider">
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${CONTACT.phoneTel}`}
                  className="flex items-start gap-3 text-[#7A9E98] hover:text-[#0FEA7A] transition-colors group"
                >
                  <Phone className="w-4 h-4 text-[#0FEA7A] mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-sm block">{CONTACT.phone}</span>
                    <span className="text-xs text-[#7A9E98]/60">Mon–Sat</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-3 text-[#7A9E98] hover:text-[#0FEA7A] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#0FEA7A] flex-shrink-0" />
                  <span className="text-sm">{CONTACT.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={SITE.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-[#7A9E98] hover:text-[#0FEA7A] transition-colors group"
                >
                  <MapPin className="w-4 h-4 text-[#0FEA7A] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-sm block">{CONTACT.address.full}</span>
                    <span className="text-xs text-[#0FEA7A] flex items-center gap-1 mt-1 group-hover:underline">
                      Get Directions <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </a>
              </li>
              <li className="text-[#7A9E98] text-sm">
                <span className="text-[#E8F4F1] font-medium block mb-1">Hours</span>
                <span className="block">Mon–Fri: 08:00 – 17:30</span>
                <span className="block">Saturday: 09:00 – 13:00</span>
                <span className="block text-[#7A9E98]/60">Closed Sundays</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[rgba(255,255,255,0.05)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7A9E98]">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span>© {currentYear} ZA Support. All rights reserved.</span>
              <span>|</span>
              <span>Vizibiliti Intelligent Solutions (Pty) Ltd</span>
              <span>|</span>
              <span>VAT: {SITE.vat}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[#0FEA7A]">★★★★★</span>
              <span className="ml-1">{SITE.rating} · {SITE.reviewCount} Google Reviews</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
