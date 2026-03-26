'use client';

const C = {
  green: '#0FEA7A',
  bgDark: '#0A1A18',
  text: '#E8F4F1',
  muted: '#7A9E98',
};
const f = 'Inter, sans-serif';

export default function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ width: 32, height: 32, background: C.green, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.bgDark} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
        </svg>
      </div>
      <div>
        <div style={{ fontSize: 17, fontWeight: 700, color: C.text, fontFamily: f, lineHeight: 1 }}>
          ZA Support<span style={{ color: C.green }}>.</span>
        </div>
        <div style={{ fontSize: 9, color: C.muted, fontFamily: f, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 1 }}>
          Apple Experts
        </div>
      </div>
    </div>
  );
}
