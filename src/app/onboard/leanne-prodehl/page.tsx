'use client';

import { useState, useEffect, useCallback } from 'react';
import Script from 'next/script';

const C = {
  green: '#0FEA7A', bgDark: '#0A1A18', text: '#E8F4F1', muted: '#7A9E98',
  cardBg: 'rgba(22,34,32,0.5)', cardBorder: 'rgba(15,234,122,0.1)',
  glow: 'rgba(15,234,122,0.08)', greenBorder: 'rgba(15,234,122,0.2)',
};
const f = 'Inter, sans-serif';
const BASE = 4499;

function calcTotal(b: number) {
  const v = Math.round(b * 0.15);
  const s = b + v;
  const p = Math.ceil(s * 0.03 + 1.5);
  return { base: b, vat: v, subtotal: s, proc: p, total: s + p };
}
const PRICE = calcTotal(BASE);

const SERVICES = [
  { name: 'POPI/HPCSA Compliant Storage x 1', detail: 'Secure, encrypted cloud storage meeting POPI Act and HPCSA requirements for patient record retention. Includes automated backup with 90-day versioning.' },
  { name: 'App Configuration (e.g. Workspace)', detail: 'Setup and ongoing configuration of business productivity apps including Google Workspace or Microsoft 365. Email, calendar, and file sharing configured to compliance standards.' },
  { name: 'Security and Backup Verification', detail: 'Monthly verification that all backup systems are functioning correctly, data integrity checks, and restore testing to ensure practice data is recoverable.' },
  { name: 'Network Threat Detection', detail: '24/7 monitoring of your practice network for suspicious activity, intrusion attempts, malware, and unauthorised access. Real-time alerts on threats detected.' },
  { name: 'Health Check App Licence x 1', detail: 'Licence for the ZA Support Health Check monitoring application. Continuously monitors device health, storage, battery, and performance metrics with automated alerts.' },
  { name: 'Full Device Monitoring', detail: 'Proactive monitoring of all enrolled Apple devices. Tracks macOS updates, storage pressure, battery health, security patches, and performance degradation.' },
  { name: 'Full Shared Systems Monitoring', detail: 'Monitoring of shared infrastructure including routers, switches, NAS devices, printers, and shared drives. Uptime tracking with alerting on failures.' },
  { name: '1 Hour Remote Support p/m', detail: 'One hour of remote technical support per month. Screen sharing, troubleshooting, software installation, and configuration changes. Unused time does not roll over.' },
  { name: 'One Physical Onsite Visit p/m', detail: 'One scheduled onsite visit per month. Hardware inspection, network checks, physical security review, and hands-on support for issues that cannot be resolved remotely.' },
  { name: 'Dedicated Account Manager', detail: 'A named account manager who knows your practice. Single point of contact for all support requests, escalations, and quarterly reviews.' },
  { name: 'Network Stability & Optimisation', detail: 'Ongoing tuning of your network for performance and reliability. Wi-Fi optimisation, bandwidth management, QoS configuration, and interference resolution.' },
  { name: 'Device Synchronisation', detail: 'Configuration and maintenance of sync across Apple devices. iCloud, email, contacts, calendars, and practice management apps kept in sync.' },
  { name: 'Printer Support for One Printer', detail: 'Full support for one network printer. Driver management, connectivity troubleshooting, print queue management, and Apple device integration.' },
];

const PREFILLED = {
  practiceName: 'Dr Prodehl',
  contactName: 'Dr Leanne Prodehl',
  email: 'Info@drprodehl.co.za',
  phone: '082 320 1430',
  doctorCount: 1,
  billingEntity: '',
};

function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ width: 32, height: 32, background: C.green, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.bgDark} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
        </svg>
      </div>
      <div>
        <div style={{ fontSize: 17, fontWeight: 700, color: C.text, fontFamily: f, lineHeight: 1 }}>ZA Support<span style={{ color: C.green }}>.</span></div>
        <div style={{ fontSize: 9, color: C.muted, fontFamily: f, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 1 }}>Apple Experts</div>
      </div>
    </div>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ background: C.cardBg, border: `1px solid ${C.cardBorder}`, borderRadius: 16, padding: 20, ...style }}>{children}</div>;
}

function Input({ label, value, onChange, placeholder, type = 'text', required, error, hint }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string;
  type?: string; required?: boolean; error?: string; hint?: string;
}) {
  const [fo, setFo] = useState(false);
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: C.muted, marginBottom: 5, fontFamily: f, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        {label}{required && <span style={{ color: '#f87171', marginLeft: 3 }}>*</span>}
      </label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        onFocus={() => setFo(true)} onBlur={() => setFo(false)}
        style={{ width: '100%', padding: '11px 14px', background: 'rgba(255,255,255,0.03)', border: `1px solid ${error ? '#f87171' : fo ? C.greenBorder : 'rgba(255,255,255,0.08)'}`, borderRadius: 12, color: C.text, fontSize: 14, fontFamily: f, outline: 'none', boxSizing: 'border-box', transition: 'all 0.2s ease', boxShadow: fo ? `0 0 0 3px ${C.glow}` : 'none' }} />
      {hint && !error && <span style={{ fontSize: 10, color: C.muted, marginTop: 3, display: 'block', fontFamily: f, fontStyle: 'italic' }}>{hint}</span>}
      {error && <span style={{ fontSize: 11, color: '#f87171', marginTop: 3, display: 'block', fontFamily: f }}>{error}</span>}
    </div>
  );
}

function Btn({ children, onClick, variant = 'primary', disabled, style: x = {} }: {
  children: React.ReactNode; onClick?: () => void; variant?: 'primary' | 'secondary'; disabled?: boolean; style?: React.CSSProperties;
}) {
  const base: React.CSSProperties = { padding: '12px 28px', borderRadius: 12, fontSize: 14, fontWeight: 600, fontFamily: f, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.4 : 1, transition: 'all 0.2s ease', border: 'none' };
  const v = {
    primary: { ...base, background: C.green, color: C.bgDark, boxShadow: `0 0 20px ${C.glow}` },
    secondary: { ...base, background: 'transparent', color: C.muted, border: '1px solid rgba(255,255,255,0.1)' },
  };
  return <button onClick={onClick} disabled={disabled} style={{ ...v[variant], ...x }}>{children}</button>;
}

function ServiceItem({ name, detail }: { name: string; detail: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      <div onClick={() => setOpen(!open)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 0', cursor: 'pointer' }}>
        <span style={{ color: C.green, fontSize: 13, flexShrink: 0, width: 18, textAlign: 'center' }}>✓</span>
        <span style={{ fontSize: 13, color: C.text, fontFamily: f, flex: 1, fontWeight: 500 }}>{name}</span>
        <span style={{ fontSize: 11, color: C.muted, transition: 'transform 0.2s ease', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}>▾</span>
      </div>
      {open && <div style={{ padding: '0 0 12px 26px', fontSize: 12, color: C.muted, fontFamily: f, lineHeight: 1.6, animation: 'fadeIn 0.2s ease' }}>{detail}</div>}
    </div>
  );
}

interface FormData {
  practiceName: string;
  contactName: string;
  email: string;
  phone: string;
  doctorCount: number;
  billingEntity: string;
}

function StepConfirm({ data, setData, onNext, loading }: { data: FormData; setData: (d: FormData) => void; onNext: () => void; loading: boolean }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const validate = () => {
    const e: Record<string, string> = {};
    if (!data.contactName?.trim()) e.contactName = 'Required';
    if (!data.email?.trim()) e.email = 'Required';
    else if (!/\S+@\S+\.\S+/.test(data.email)) e.email = 'Invalid email';
    if (!data.phone?.trim()) e.phone = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  return (
    <div>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: C.text, fontFamily: f, marginBottom: 4 }}>Hi Leanne</h2>
        <p style={{ fontSize: 14, color: C.muted, fontFamily: f, lineHeight: 1.6 }}>We&apos;ve pre-filled your details. Please confirm or update the billing entity if your practice bills under a different name.</p>
      </div>
      <Card style={{ marginBottom: 16, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${C.green}, transparent)` }} />
        <div style={{ fontSize: 10, fontWeight: 600, color: C.muted, fontFamily: f, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>Your Details</div>
        <Input label="Practice / Billing Entity" value={data.billingEntity || data.practiceName} onChange={v => setData({ ...data, billingEntity: v })} placeholder="Company name for invoicing" hint="Update if billing under a different entity (e.g. Pty Ltd)" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Input label="Contact Person" value={data.contactName} onChange={v => setData({ ...data, contactName: v })} required error={errors.contactName} />
          <Input label="Phone" value={data.phone} onChange={v => setData({ ...data, phone: v })} type="tel" required error={errors.phone} />
        </div>
        <Input label="Email" value={data.email} onChange={v => setData({ ...data, email: v })} type="email" required error={errors.email} />
      </Card>
      <Card style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 700, color: C.text, fontFamily: f }}>Solo Practice SLA</div>
            <div style={{ fontSize: 12, color: C.muted, fontFamily: f, marginTop: 2 }}>1 doctor · Medical Practice Protection</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: C.green, fontFamily: f }}>R {PRICE.total.toLocaleString()}</div>
            <div style={{ fontSize: 10, color: C.muted, fontFamily: f }}>/month incl. VAT + fees</div>
          </div>
        </div>
      </Card>
      <Card style={{ marginBottom: 16, padding: '8px 20px' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.text, fontFamily: f, padding: '12px 0 4px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>What&apos;s Included</div>
        {SERVICES.map(s => <ServiceItem key={s.name} {...s} />)}
      </Card>
      <Card style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: C.muted, fontFamily: f, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Pricing Breakdown</div>
        <div style={{ display: 'grid', gap: 4 }}>
          {([['Monthly SLA fee', `R ${PRICE.base.toLocaleString()}`], ['VAT (15%)', `R ${PRICE.vat.toLocaleString()}`], ['Payment processing (3% + R1.50)', `R ${PRICE.proc}`]] as [string, string][]).map(([l, v]) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0' }}>
              <span style={{ fontSize: 12, color: C.muted, fontFamily: f }}>{l}</span>
              <span style={{ fontSize: 12, color: C.text, fontFamily: f }}>{v}</span>
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${C.cardBorder}`, marginTop: 6, paddingTop: 8, display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: C.text, fontFamily: f }}>Monthly total</span>
            <span style={{ fontSize: 18, fontWeight: 800, color: C.green, fontFamily: f }}>R {PRICE.total.toLocaleString()}</span>
          </div>
        </div>
      </Card>
      <div style={{ display: 'flex', gap: 10, padding: '10px 14px', background: C.glow, border: `1px solid ${C.greenBorder}`, borderRadius: 12, marginBottom: 20 }}>
        <span style={{ fontSize: 15, flexShrink: 0 }}>📅</span>
        <div style={{ fontSize: 12, color: C.text, fontFamily: f, lineHeight: 1.5 }}><strong>Billing date: 25th monthly.</strong> First charge today, recurring on the 25th thereafter.</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Btn onClick={() => validate() && onNext()} disabled={loading} style={{ padding: '14px 36px' }}>
          {loading ? 'Preparing…' : 'Confirm & Proceed to Payment'}
        </Btn>
      </div>
    </div>
  );
}

function StepPayment({ data, checkoutId, widgetUrl }: { data: FormData; checkoutId: string; widgetUrl: string }) {
  const entity = data.billingEntity?.trim() || data.practiceName;
  const [agreed, setAgreed] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    if (scriptReady && checkoutId) {
      const existing = document.getElementById('peach-widget-script');
      if (existing) existing.remove();
      const script = document.createElement('script');
      script.id = 'peach-widget-script';
      script.src = widgetUrl;
      script.async = true;
      document.body.appendChild(script);
    }
  }, [scriptReady, checkoutId, widgetUrl]);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zasupport.com';

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: C.text, fontFamily: f, marginBottom: 4 }}>Payment</h2>
      <p style={{ fontSize: 13, color: C.muted, fontFamily: f, marginBottom: 20 }}>Secure payment via Peach Payments. Card tokenised and charged on the 25th of each month.</p>
      <Card style={{ marginBottom: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.text, fontFamily: f, display: 'block' }}>First payment today</span>
          <span style={{ fontSize: 10, color: C.muted, fontFamily: f }}>Then R {PRICE.total.toLocaleString()} on the 25th monthly</span>
        </div>
        <div style={{ fontSize: 24, fontWeight: 800, color: C.green, fontFamily: f }}>R {PRICE.total.toLocaleString()}</div>
      </Card>
      <div style={{ fontSize: 11, color: C.muted, fontFamily: f, marginBottom: 14, padding: '0 2px', lineHeight: 1.5 }}>
        Billing to: <strong style={{ color: C.text }}>{entity}</strong> · {data.email}
      </div>
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 20, cursor: 'pointer' }} onClick={() => setAgreed(!agreed)}>
        <div style={{ width: 18, height: 18, borderRadius: 4, flexShrink: 0, marginTop: 1, border: agreed ? 'none' : '1.5px solid rgba(255,255,255,0.15)', background: agreed ? C.green : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease' }}>
          {agreed && <span style={{ color: C.bgDark, fontSize: 11, fontWeight: 700 }}>✓</span>}
        </div>
        <span style={{ fontSize: 11, color: C.muted, fontFamily: f, lineHeight: 1.5 }}>
          I agree to the ZA Support Service Level Agreement. I authorise an initial charge of R {PRICE.total.toLocaleString()} today, with recurring monthly charges of R {PRICE.total.toLocaleString()} on the 25th of each month. 12-month agreement with 30-day cancellation notice. Includes payment processing fees of 3% + R1.50.
        </span>
      </div>
      {agreed && checkoutId ? (
        <Card style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: C.muted, fontFamily: f, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>Secure Payment</div>
          <Script src={widgetUrl} strategy="afterInteractive" onLoad={() => setScriptReady(true)} />
          <form
            action={`${siteUrl}/onboard/leanne-prodehl/done`}
            className="paymentWidgets"
            data-brands="VISA MASTER AMEX"
            data-checkout-id={checkoutId}
            style={{ color: C.text }}
          />
        </Card>
      ) : (
        <div style={{ opacity: 0.5, textAlign: 'center', padding: '12px 0', fontSize: 13, color: C.muted, fontFamily: f }}>
          {agreed ? 'Loading payment form…' : 'Accept the agreement above to proceed to payment.'}
        </div>
      )}
    </div>
  );
}

export default function LeanneOnboarding() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>({ ...PREFILLED });
  const [vis, setVis] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkoutId, setCheckoutId] = useState('');
  const [widgetUrl, setWidgetUrl] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    setVis(false);
    const t = setTimeout(() => setVis(true), 60);
    return () => clearTimeout(t);
  }, [step]);

  const handleConfirm = useCallback(async () => {
    setLoading(true);
    setErr('');
    try {
      // 1. Create client record
      const onboardRes = await fetch('/api/sla/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          practice_name: data.billingEntity?.trim() || data.practiceName,
          contact_name: data.contactName,
          email: data.email,
          phone: data.phone,
          doctor_count: data.doctorCount,
        }),
      });
      if (!onboardRes.ok) {
        const j = await onboardRes.json().catch(() => ({})) as { error?: string };
        throw new Error(j.error ?? 'Failed to create record');
      }
      const { client_id } = await onboardRes.json() as { client_id: string };

      // 2. Prepare Peach checkout
      const payRes = await fetch('/api/sla/payment/prepare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ doctor_count: data.doctorCount, email: data.email, client_id_hint: client_id }),
      });
      if (!payRes.ok) {
        const j = await payRes.json().catch(() => ({})) as { error?: string };
        throw new Error(j.error ?? 'Failed to prepare payment');
      }
      const { checkout_id, widget_url } = await payRes.json() as { checkout_id: string; widget_url: string };
      setCheckoutId(checkout_id);
      setWidgetUrl(widget_url);
      setStep(1);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Something went wrong. Please try again.';
      setErr(msg);
    } finally {
      setLoading(false);
    }
  }, [data]);

  return (
    <div style={{ minHeight: '100vh', background: C.bgDark }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <div style={{ position: 'fixed', top: '-20%', right: '-10%', width: '50vw', height: '50vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(15,234,122,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 540, margin: '0 auto', padding: '28px 20px 48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <Logo />
          <span style={{ fontSize: 11, color: C.muted, fontFamily: f }}>SLA Activation</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 28 }}>
          {(['Confirm Details', 'Payment'] as const).map((label, i) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', flex: i === 0 ? 1 : 'unset' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, fontFamily: f, background: i < step ? C.green : i === step ? C.glow : 'rgba(255,255,255,0.04)', color: i < step ? C.bgDark : i === step ? C.green : 'rgba(255,255,255,0.25)', border: i === step ? `1.5px solid ${C.greenBorder}` : '1.5px solid transparent' }}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span style={{ fontSize: 12, fontWeight: i === step ? 600 : 400, fontFamily: f, color: i <= step ? C.text : 'rgba(255,255,255,0.25)', whiteSpace: 'nowrap' }}>{label}</span>
              </div>
              {i === 0 && <div style={{ flex: 1, height: 1, background: step > 0 ? C.green : 'rgba(255,255,255,0.06)', margin: '0 12px' }} />}
            </div>
          ))}
        </div>
        {err && (
          <div style={{ marginBottom: 16, padding: '10px 14px', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: 10, fontSize: 12, color: '#f87171', fontFamily: f }}>
            {err}
          </div>
        )}
        <div style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(8px)', transition: 'all 0.35s ease' }}>
          {step === 0 && <StepConfirm data={data} setData={setData} onNext={handleConfirm} loading={loading} />}
          {step === 1 && <StepPayment data={data} checkoutId={checkoutId} widgetUrl={widgetUrl} />}
        </div>
        <div style={{ textAlign: 'center', marginTop: 36, paddingTop: 16, borderTop: `1px solid ${C.cardBorder}` }}>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', fontFamily: f }}>256-bit SSL · PCI DSS compliant · Powered by Peach Payments</div>
        </div>
      </div>
    </div>
  );
}
