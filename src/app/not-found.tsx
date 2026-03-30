import Link from 'next/link';
import { Home, Wrench, Phone, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="min-h-screen hero-gradient grid-overlay flex items-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="text-8xl font-extrabold text-[#0FEA7A] mb-4">
          404
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
          Page Not Found
        </h1>
        <p className="text-xl text-[#7A9E98] mb-12 max-w-xl mx-auto">
          The page you are looking for does not exist or has been moved. Try one of the links below, or give us a call.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          <Link href="/" className="glass-card p-5 text-left hover:border-[rgba(15,234,122,0.3)] transition-all group">
            <Home className="w-6 h-6 text-[#0FEA7A] mb-3" />
            <p className="text-[#E8F4F1] font-semibold">Homepage</p>
            <p className="text-[#7A9E98] text-sm">ZA Support overview</p>
          </Link>
          <Link href="/liquid-damage" className="glass-card p-5 text-left hover:border-[rgba(15,234,122,0.3)] transition-all group">
            <Wrench className="w-6 h-6 text-[#0FEA7A] mb-3" />
            <p className="text-[#E8F4F1] font-semibold">Liquid Damage Repair</p>
            <p className="text-[#7A9E98] text-sm">MacBook, iPhone, iPad</p>
          </Link>
          <Link href="/logic-board-repair" className="glass-card p-5 text-left hover:border-[rgba(15,234,122,0.3)] transition-all group">
            <Wrench className="w-6 h-6 text-[#0FEA7A] mb-3" />
            <p className="text-[#E8F4F1] font-semibold">Logic Board Repair</p>
            <p className="text-[#7A9E98] text-sm">Component-level repair experts</p>
          </Link>
          <Link href="/iphone-repair" className="glass-card p-5 text-left hover:border-[rgba(15,234,122,0.3)] transition-all group">
            <Wrench className="w-6 h-6 text-[#0FEA7A] mb-3" />
            <p className="text-[#E8F4F1] font-semibold">iPhone Repair</p>
            <p className="text-[#7A9E98] text-sm">Screen, battery, liquid</p>
          </Link>
          <Link href="/services" className="glass-card p-5 text-left hover:border-[rgba(15,234,122,0.3)] transition-all group">
            <ArrowRight className="w-6 h-6 text-[#0FEA7A] mb-3" />
            <p className="text-[#E8F4F1] font-semibold">All Services & Pricing</p>
            <p className="text-[#7A9E98] text-sm">Transparent pricing</p>
          </Link>
          <Link href="/contact" className="glass-card p-5 text-left hover:border-[rgba(15,234,122,0.3)] transition-all group">
            <Phone className="w-6 h-6 text-[#0FEA7A] mb-3" />
            <p className="text-[#E8F4F1] font-semibold">Contact Us</p>
            <p className="text-[#7A9E98] text-sm">Hyde Park, Johannesburg</p>
          </Link>
        </div>

        <a
          href="tel:0645295863"
          className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all">
          <Phone className="w-5 h-5" /> Call 064 529 5863
        </a>
      </div>
    </section>
  );
}
