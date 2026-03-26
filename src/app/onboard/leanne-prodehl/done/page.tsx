'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const C = {
  green: '#0FEA7A', bgDark: '#0A1A18', text: '#E8F4F1', muted: '#7A9E98',
  cardBg: 'rgba(22,34,32,0.5)', cardBorder: 'rgba(15,234,122,0.1)',
  glow: 'rgba(15,234,122,0.08)', greenBorder: 'rgba(15,234,122,0.2)',
};
const f = 'Inter, sans-serif';
const TOTAL = 'R 5,331';

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ background: C.cardBg, border: `1px solid ${C.cardBorder}`, borderRadius: 16, padding: 20, ...style }}>{children}</div>;
}

function DoneContent() {
  useSearchParams(); // triggers Suspense boundary for static export

  return (
    <div style={{ textAlign: 'center', padding: '20px 0' }}>
      <div style={{ width: 64, height: 64, borderRadius: '50%', background: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 28, color: C.bgDark, boxShadow: '0 0 40px rgba(15,234,122,0.35)' }}>✓</div>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: C.text, fontFamily: f, marginBottom: 6 }}>Welcome Aboard, Leanne</h2>
      <p style={{ fontSize: 13, color: C.muted, fontFamily: f, maxWidth: 400, margin: '0 auto 24px', lineHeight: 1.6 }}>Your practice is now protected. Here&apos;s what happens next.</p>
      <div style={{ display: 'grid', gap: 10, textAlign: 'left', maxWidth: 440, margin: '0 auto 28px' }}>
        {([
          ['📄', 'Contract pending', 'Your service agreement is being prepared and will be emailed to you shortly'],
          ['🛡️', 'Threat detection activated', 'Threat detection has been activated on your network'],
          ['💳', 'Next billing: 25th', `${TOTAL} will be charged to your card on the 25th of each month`],
          ['📊', 'First report in 30 days', 'Your first monthly security report will be delivered after activation'],
        ] as [string, string, string][]).map(([ico, title, desc], i) => (
          <Card key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: 14 }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>{ico}</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.text, fontFamily: f }}>{title}</div>
              <div style={{ fontSize: 11, color: C.muted, fontFamily: f, marginTop: 2, lineHeight: 1.5 }}>{desc}</div>
            </div>
          </Card>
        ))}
      </div>
      <Card style={{ background: 'rgba(15,234,122,0.04)', border: `1px solid ${C.greenBorder}`, maxWidth: 440, margin: '0 auto 24px', textAlign: 'left' }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: C.green, fontFamily: f, marginBottom: 6 }}>Need help?</div>
        <div style={{ fontSize: 11, color: C.muted, fontFamily: f, lineHeight: 1.6 }}>Contact us at admin@zasupport.com or call 064 529 5863 during business hours.</div>
      </Card>
    </div>
  );
}

export default function LeanneDonePage() {
  return (
    <div style={{ minHeight: '100vh', background: C.bgDark }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 540, margin: '0 auto', padding: '28px 20px 48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 36 }}>
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
          <span style={{ fontSize: 11, color: C.muted, fontFamily: f }}>SLA Activation</span>
        </div>
        <Suspense fallback={<div style={{ textAlign: 'center', color: C.muted, fontFamily: f }}>Loading...</div>}>
          <DoneContent />
        </Suspense>
        <div style={{ textAlign: 'center', marginTop: 36, paddingTop: 16, borderTop: `1px solid ${C.cardBorder}` }}>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', fontFamily: f }}>256-bit SSL · PCI DSS compliant · Powered by Peach Payments</div>
        </div>
      </div>
    </div>
  );
}
