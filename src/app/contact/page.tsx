'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { CONTACT, SITE } from '@/lib/constants';
import SchemaOrg from '@/components/seo/SchemaOrg';

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'ZA Support (Apple Experts)',
  alternateName: 'ZA Support',
  url: 'https://zasupport.com',
  telephone: '+27645295863',
  email: 'admin@zasupport.com',
  description: 'MacBook repair, iPhone repair, logic board microsoldering, managed IT services and Apple device support in Johannesburg. Assessment: R899 ex VAT.',
  image: 'https://zasupport.com/og-image.jpg',
  priceRange: 'RR',
  currenciesAccepted: 'ZAR',
  paymentAccepted: 'Cash, Credit Card, EFT',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1 Hyde Lane, Second Floor, Office E2004',
    addressLocality: 'Johannesburg',
    addressRegion: 'Gauteng',
    postalCode: '2196',
    addressCountry: 'ZA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -26.1348,
    longitude: 28.0469,
  },
  hasMap: 'https://maps.app.goo.gl/E1agQ3ZZ6va73ano9',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:30',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '09:00',
      closes: '13:00',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: SITE.rating,
    reviewCount: '120',
    bestRating: '5',
    worstRating: '1',
  },
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'Neighborhood', name: 'Hyde Park' },
    { '@type': 'Neighborhood', name: 'Sandton' },
    { '@type': 'Neighborhood', name: 'Rosebank' },
    { '@type': 'Neighborhood', name: 'Illovo' },
    { '@type': 'Neighborhood', name: 'Bryanston' },
    { '@type': 'Neighborhood', name: 'Fourways' },
    { '@type': 'Neighborhood', name: 'Parktown' },
  ],
  sameAs: [
    'https://facebook.com/appleexpertsouthafrica',
    'https://instagram.com/appleexpertza',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zasupport.com' },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://zasupport.com/contact' },
  ],
};

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', device: '', issue: '', urgency: 'medium' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <SchemaOrg schema={localBusinessSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      {/* Hero */}
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
              Contact <span className="text-[#0FEA7A]">ZA Support</span>
            </h1>
            <p className="text-xl text-[#7A9E98] mb-6 max-w-2xl">
              Assessment: R899 ex VAT. Response within 1 hour during business hours. Hyde Park, Johannesburg.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-6 py-3 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all"
              >
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-6 py-3 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="glass-card p-8">
                <h2 className="text-2xl font-bold text-[#E8F4F1] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>Send an Enquiry</h2>
                {status === 'sent' ? (
                  <div className="p-6 bg-[rgba(15,234,122,0.1)] border border-[rgba(15,234,122,0.3)] rounded-xl text-center">
                    <p className="text-[#0FEA7A] text-xl font-bold mb-2">Message Sent!</p>
                    <p className="text-[#7A9E98]">We will get back to you within 1 hour during business hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[#7A9E98] text-sm mb-2" htmlFor="name">Full Name *</label>
                        <input
                          id="name" type="text" required
                          value={form.name}
                          onChange={e => setForm({ ...form, name: e.target.value })}
                          className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] focus:border-[rgba(15,234,122,0.4)] rounded-xl px-4 py-3 text-[#E8F4F1] text-sm outline-none transition-all"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-[#7A9E98] text-sm mb-2" htmlFor="email">Email Address *</label>
                        <input
                          id="email" type="email" required
                          value={form.email}
                          onChange={e => setForm({ ...form, email: e.target.value })}
                          className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] focus:border-[rgba(15,234,122,0.4)] rounded-xl px-4 py-3 text-[#E8F4F1] text-sm outline-none transition-all"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[#7A9E98] text-sm mb-2" htmlFor="phone">Phone Number</label>
                        <input
                          id="phone" type="tel"
                          value={form.phone}
                          onChange={e => setForm({ ...form, phone: e.target.value })}
                          className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] focus:border-[rgba(15,234,122,0.4)] rounded-xl px-4 py-3 text-[#E8F4F1] text-sm outline-none transition-all"
                          placeholder="0xx xxx xxxx"
                        />
                      </div>
                      <div>
                        <label className="block text-[#7A9E98] text-sm mb-2" htmlFor="device">Device Type</label>
                        <select
                          id="device"
                          value={form.device}
                          onChange={e => setForm({ ...form, device: e.target.value })}
                          className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] focus:border-[rgba(15,234,122,0.4)] rounded-xl px-4 py-3 text-[#E8F4F1] text-sm outline-none transition-all"
                        >
                          <option value="">Select device</option>
                          <option>MacBook Air</option>
                          <option>MacBook Pro</option>
                          <option>iMac</option>
                          <option>Mac mini</option>
                          <option>iPhone</option>
                          <option>iPad</option>
                          <option>Apple Watch</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[#7A9E98] text-sm mb-2" htmlFor="urgency">Urgency</label>
                      <select
                        id="urgency"
                        value={form.urgency}
                        onChange={e => setForm({ ...form, urgency: e.target.value })}
                        className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] focus:border-[rgba(15,234,122,0.4)] rounded-xl px-4 py-3 text-[#E8F4F1] text-sm outline-none transition-all"
                      >
                        <option value="low">Not urgent, within a few days</option>
                        <option value="medium">Soon, this week</option>
                        <option value="high">Urgent, as soon as possible</option>
                        <option value="emergency">Emergency, device just damaged</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[#7A9E98] text-sm mb-2" htmlFor="issue">Describe the Issue *</label>
                      <textarea
                        id="issue" required rows={5}
                        value={form.issue}
                        onChange={e => setForm({ ...form, issue: e.target.value })}
                        className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] focus:border-[rgba(15,234,122,0.4)] rounded-xl px-4 py-3 text-[#E8F4F1] text-sm outline-none transition-all resize-none"
                        placeholder="Describe what happened and what symptoms you are experiencing..."
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl font-bold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_24px_rgba(15,234,122,0.4)] transition-all disabled:opacity-50"
                    >
                      <Send className="w-5 h-5" />
                      {status === 'sending' ? 'Sending...' : 'Send Enquiry'}
                    </button>
                    {status === 'error' && (
                      <p className="text-red-400 text-sm text-center">Something went wrong. Please call us directly on {CONTACT.phone}.</p>
                    )}
                  </form>
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="glass-card p-6">
                <h3 className="text-[#E8F4F1] font-bold mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>Call or WhatsApp</h3>
                <a href={`tel:${CONTACT.phoneTel}`} className="flex items-center gap-3 text-[#7A9E98] hover:text-[#0FEA7A] transition-colors mb-3">
                  <Phone className="w-5 h-5 text-[#0FEA7A]" />
                  <span className="text-lg font-semibold">{CONTACT.phone}</span>
                </a>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[#7A9E98] hover:text-[#0FEA7A] transition-colors mb-3"
                >
                  <MessageCircle className="w-5 h-5 text-[#0FEA7A]" />
                  <span className="text-sm">WhatsApp (preferred for photos)</span>
                </a>
                <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 text-[#7A9E98] hover:text-[#0FEA7A] transition-colors">
                  <Mail className="w-5 h-5 text-[#0FEA7A]" />
                  <span>{CONTACT.email}</span>
                </a>
              </div>

              <div className="glass-card p-6">
                <h3 className="text-[#E8F4F1] font-bold mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>Location</h3>
                <div className="flex items-start gap-3 text-[#7A9E98] mb-4">
                  <MapPin className="w-5 h-5 text-[#0FEA7A] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm leading-relaxed">{CONTACT.address.full}</p>
                  </div>
                </div>
                <a
                  href="https://maps.app.goo.gl/E1agQ3ZZ6va73ano9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0FEA7A] text-sm hover:underline"
                >
                  Get Directions on Google Maps &rarr;
                </a>
              </div>

              <div className="glass-card p-6">
                <h3 className="text-[#E8F4F1] font-bold mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>Business Hours</h3>
                <div className="flex items-start gap-3 text-[#7A9E98]">
                  <Clock className="w-5 h-5 text-[#0FEA7A] flex-shrink-0 mt-0.5" />
                  <div className="space-y-1 text-sm">
                    <p>Monday &ndash; Friday: 08:00 &ndash; 17:30</p>
                    <p>Saturday: 09:00 &ndash; 13:00</p>
                    <p className="text-[#7A9E98]/60">Closed Sundays &amp; Public Holidays</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[rgba(15,234,122,0.08)] border border-[rgba(15,234,122,0.2)] rounded-xl">
                <p className="text-[#0FEA7A] font-semibold text-sm mb-1">Emergency? Call directly.</p>
                <p className="text-[#7A9E98] text-xs">For liquid damage and urgent repairs, calling is faster than the contact form. We answer during business hours.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps embed */}
      <section className="bg-[#111C1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-extrabold text-[#E8F4F1] mb-6 text-center" style={{ fontFamily: 'Syne, sans-serif' }}>
            Find Us in <span className="text-[#0FEA7A]">Hyde Park</span>
          </h2>
          <p className="text-[#7A9E98] text-center text-sm mb-8 max-w-xl mx-auto">
            1 Hyde Lane, Second Floor, Office E2004, Hyde Park, Johannesburg. Free parking on site.
            Easily accessible from Sandton, Rosebank, Illovo, Bryanston and Parktown.
          </p>
          <div className="rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.08)]" style={{ height: '400px' }}>
            <iframe
              title="ZA Support, Hyde Park, Johannesburg"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3582.4!2d28.0469!3d-26.1348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950d4db39a0c5b%3A0x1234567890abcdef!2s1%20Hyde%20Lane%2C%20Hyde%20Park%2C%20Johannesburg!5e0!3m2!1sen!2sza!4v1000000000000!5m2!1sen!2sza"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(0.9) hue-rotate(180deg)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="flex justify-center mt-6">
            <a
              href="https://maps.app.goo.gl/E1agQ3ZZ6va73ano9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-6 py-3 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all text-sm"
            >
              <MapPin className="w-4 h-4" /> Open in Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* Nearby areas */}
      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-extrabold text-[#E8F4F1] mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            Serving All of <span className="text-[#0FEA7A]">Johannesburg</span>
          </h2>
          <p className="text-[#7A9E98] text-sm mb-8 max-w-2xl mx-auto">
            Walk-in or drop-off from anywhere in Johannesburg. We also offer collection and delivery for managed service clients.
          </p>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {['Hyde Park', 'Sandton', 'Rosebank', 'Illovo', 'Bryanston', 'Fourways', 'Parktown', 'Melrose', 'Randburg', 'Midrand', 'Rivonia', 'Morningside'].map((area) => (
              <span key={area} className="text-[#7A9E98] text-sm bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] px-4 py-2 rounded-full">
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
