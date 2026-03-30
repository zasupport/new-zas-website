'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { Phone, MessageCircle, CheckCircle, ArrowRight, Calendar, Zap } from 'lucide-react';
import { trackBookFormSubmit, trackBookFormStart } from '@/lib/analytics';
import { buildWhatsAppUrl } from '@/lib/constants';

type FormValues = {
  name: string;
  phone: string;
  deviceType: string;
  problem: string;
  preferredContact: string;
  email?: string;
};

const deviceTypes = [
  'MacBook Air',
  'MacBook Pro',
  'iMac',
  'Mac Mini',
  'iPhone',
  'iPad',
  'Apple Watch',
  'Other',
];

const contactMethods = ['WhatsApp', 'Call', 'Email'];

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'ZA Support, Apple Repair Specialists',
  description: 'Book a Mac repair assessment in Hyde Park, Johannesburg. Assessment fee: from R599.',
  url: 'https://zasupport.com/book',
  telephone: '+27645295863',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1 Hyde Lane, Second Floor, Office E2004',
    addressLocality: 'Hyde Park',
    addressRegion: 'Gauteng',
    postalCode: '2196',
    addressCountry: 'ZA',
  },
  openingHours: 'Mo-Fr 08:00-17:30 Sa 09:00-13:00',
  priceRange: 'from R599 assessment',
};

export default function BookPage() {
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const preferredContact = watch('preferredContact');

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Submission failed');
      trackBookFormSubmit(data.deviceType, data.deviceType);
      setWhatsappUrl(json.whatsappUrl ?? '');
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* Hero */}
      <section className="hero-gradient grid-overlay pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-[#0FEA7A] rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 text-[#0A1A18]" />
            </div>
            <span className="text-[#0FEA7A] text-sm font-semibold tracking-widest uppercase">
              Assessment: from R599, No Deposit to Book
            </span>
          </div>
          <h1
            className="text-4xl sm:text-5xl font-extrabold text-[#E8F4F1] leading-tight mb-4"
           
          >
            Book a Mac Repair
            <br />
            <span className="text-[#0FEA7A]">Hyde Park, Johannesburg</span>
          </h1>
          <p className="text-lg text-[#7A9E98] max-w-xl leading-relaxed">
            Fill in the form below and we will contact you within 2 hours to confirm your booking.
            Assessment fee: from R599. up-to-3 year warranty on all repairs.
          </p>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-[#0D1F1C] border-y border-[rgba(255,255,255,0.05)] py-5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              ['Assessment: from R599', 'Absorbed into repair if you proceed'],
              ['Up-to-3 Year Warranty', 'On all parts and labour'],
              ['2-Hour Response', 'We call you back fast'],
              ['4.9★ Reviews', '120+ happy clients'],
            ].map(([title, sub]) => (
              <div key={title}>
                <p className="text-[#0FEA7A] font-bold text-sm">{title}</p>
                <p className="text-[#7A9E98] text-xs mt-0.5">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form / Success */}
      <section className="py-16 bg-[#0A1A18]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {submitted ? (
            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 bg-[rgba(15,234,122,0.1)] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-[#0FEA7A]" />
              </div>
              <h2
                className="text-2xl font-extrabold text-[#E8F4F1] mb-3"
               
              >
                Booking Request Received
              </h2>
              <p className="text-[#7A9E98] mb-8 leading-relaxed">
                We have received your booking request. We will contact you within 2 hours to confirm
                your appointment. If you need an immediate response, tap the WhatsApp button below.
              </p>
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-6 py-3.5 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all mb-4"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp Now
                </a>
              )}
              <p className="text-center">
                <Link href="/" className="text-[#7A9E98] hover:text-[#0FEA7A] text-sm transition-colors">
                  Return to homepage
                </Link>
              </p>
            </div>
          ) : (
            <div className="glass-card p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-[rgba(15,234,122,0.1)] rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-[#0FEA7A]" />
                </div>
                <div>
                  <h2
                    className="text-xl font-bold text-[#E8F4F1]"
                   
                  >
                    Book Your Assessment
                  </h2>
                  <p className="text-[#7A9E98] text-sm">Takes 60 seconds, we do the rest</p>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} onFocus={trackBookFormStart} className="space-y-5" noValidate>
                {/* Name */}
                <div>
                  <label className="block text-[#E8F4F1] text-sm font-medium mb-1.5">
                    Your Name <span className="text-[#0FEA7A]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. James Olivier"
                    className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-[#E8F4F1] placeholder-[#4A6B65] focus:outline-none focus:border-[#0FEA7A] transition-colors text-sm"
                    {...register('name', { required: 'Please enter your name' })}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[#E8F4F1] text-sm font-medium mb-1.5">
                    Phone / WhatsApp Number <span className="text-[#0FEA7A]">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 079 053 9964"
                    className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-[#E8F4F1] placeholder-[#4A6B65] focus:outline-none focus:border-[#0FEA7A] transition-colors text-sm"
                    {...register('phone', { required: 'Please enter your phone number' })}
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>
                  )}
                </div>

                {/* Device type */}
                <div>
                  <label className="block text-[#E8F4F1] text-sm font-medium mb-1.5">
                    Device Type <span className="text-[#0FEA7A]">*</span>
                  </label>
                  <select
                    className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-[#E8F4F1] focus:outline-none focus:border-[#0FEA7A] transition-colors text-sm appearance-none cursor-pointer"
                    {...register('deviceType', { required: 'Please select your device type' })}
                  >
                    <option value="" className="bg-[#0D1F1C]">Select device...</option>
                    {deviceTypes.map((d) => (
                      <option key={d} value={d} className="bg-[#0D1F1C]">
                        {d}
                      </option>
                    ))}
                  </select>
                  {errors.deviceType && (
                    <p className="text-red-400 text-xs mt-1">{errors.deviceType.message}</p>
                  )}
                </div>

                {/* Problem */}
                <div>
                  <label className="block text-[#E8F4F1] text-sm font-medium mb-1.5">
                    Problem Description <span className="text-[#0FEA7A]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    maxLength={500}
                    placeholder="e.g. MacBook Pro 2019 completely dead after coffee spill yesterday. Will not turn on at all."
                    className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-[#E8F4F1] placeholder-[#4A6B65] focus:outline-none focus:border-[#0FEA7A] transition-colors text-sm resize-none"
                    {...register('problem', {
                      required: 'Please describe the problem',
                      maxLength: { value: 500, message: 'Maximum 500 characters' },
                    })}
                  />
                  {errors.problem && (
                    <p className="text-red-400 text-xs mt-1">{errors.problem.message}</p>
                  )}
                </div>

                {/* Preferred contact */}
                <div>
                  <label className="block text-[#E8F4F1] text-sm font-medium mb-2">
                    Preferred Contact Method <span className="text-[#0FEA7A]">*</span>
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {contactMethods.map((method) => (
                      <label key={method} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value={method}
                          className="accent-[#0FEA7A]"
                          {...register('preferredContact', { required: true })}
                        />
                        <span className="text-[#E8F4F1] text-sm">{method}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Email (shown when Email is selected, otherwise optional) */}
                <div>
                  <label className="block text-[#E8F4F1] text-sm font-medium mb-1.5">
                    Email Address{' '}
                    {preferredContact === 'Email' ? (
                      <span className="text-[#0FEA7A]">*</span>
                    ) : (
                      <span className="text-[#7A9E98]">(optional)</span>
                    )}
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. james@example.com"
                    className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-[#E8F4F1] placeholder-[#4A6B65] focus:outline-none focus:border-[#0FEA7A] transition-colors text-sm"
                    {...register('email', {
                      required: preferredContact === 'Email' ? 'Email required when Email is selected' : false,
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Please enter a valid email address',
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>

                {error && (
                  <div className="bg-[rgba(255,80,80,0.08)] border border-[rgba(255,80,80,0.2)] rounded-xl px-4 py-3">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#0FEA7A] text-[#0A1A18] px-6 py-4 rounded-xl font-bold text-base hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_20px_rgba(15,234,122,0.3)] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Book My Assessment
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-center text-[#7A9E98] text-xs leading-relaxed">
                  By submitting this form you agree to be contacted by ZA Support regarding your repair.
                  We never share your details. Assessment: from R599.
                </p>
              </form>
            </div>
          )}

          {/* Secondary contact options */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <a
              href={buildWhatsAppUrl('BOOK', 'general')}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-4 flex items-center gap-3 hover:border-[rgba(15,234,122,0.3)] transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-[#0FEA7A] flex-shrink-0" />
              <div>
                <p className="text-[#E8F4F1] text-sm font-semibold">WhatsApp</p>
                <p className="text-[#7A9E98] text-xs">Instant reply</p>
              </div>
            </a>
            <a
              href="tel:+27645295863"
              className="glass-card p-4 flex items-center gap-3 hover:border-[rgba(15,234,122,0.3)] transition-colors">
              <Phone className="w-5 h-5 text-[#0FEA7A] flex-shrink-0" />
              <div>
                <p className="text-[#E8F4F1] text-sm font-semibold">064 529 5863</p>
                <p className="text-[#7A9E98] text-xs">Mon–Fri 08:00–17:30</p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
