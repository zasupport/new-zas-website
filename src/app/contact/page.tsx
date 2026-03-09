'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { CONTACT } from '@/lib/constants';

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
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            Contact <span className="text-[#0FEA7A]">ZA Support</span>
          </h1>
          <p className="text-xl text-[#7A9E98] max-w-2xl">
            Free assessment. No Fix No Fee. Response within 1 hour during business hours.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#0A1A18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
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
                        <option value="low">Not urgent — within a few days</option>
                        <option value="medium">Soon — this week</option>
                        <option value="high">Urgent — as soon as possible</option>
                        <option value="emergency">Emergency — device just damaged</option>
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
                <a href="https://maps.google.com/?q=1+Hyde+Lane+Hyde+Park+Johannesburg" target="_blank" rel="noopener noreferrer"
                  className="text-[#0FEA7A] text-sm hover:underline">
                  Get Directions →
                </a>
              </div>

              <div className="glass-card p-6">
                <h3 className="text-[#E8F4F1] font-bold mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>Business Hours</h3>
                <div className="flex items-start gap-3 text-[#7A9E98]">
                  <Clock className="w-5 h-5 text-[#0FEA7A] flex-shrink-0 mt-0.5" />
                  <div className="space-y-1 text-sm">
                    <p>Monday – Friday: 08:00 – 17:30</p>
                    <p>Saturday: 09:00 – 13:00</p>
                    <p className="text-[#7A9E98]/60">Closed Sundays & Public Holidays</p>
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
    </>
  );
}
