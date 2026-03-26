'use client';

import { useState } from 'react';

const C = {
  green: '#0FEA7A',
  text: '#E8F4F1',
  muted: '#7A9E98',
  cardBorder: 'rgba(15,234,122,0.1)',
};

interface ServiceItemProps {
  name: string;
  detail: string;
}

export default function ServiceItem({ name, detail }: ServiceItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ borderBottom: `1px solid ${C.cardBorder}`, paddingBottom: 8, marginBottom: 8 }}>
      <div
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          cursor: 'pointer',
          paddingTop: 4,
        }}
      >
        <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
          <circle cx={8} cy={8} r={8} fill={C.green} fillOpacity={0.15} />
          <path d="M4.5 8L7 10.5L11.5 5.5" stroke={C.green} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={{ flex: 1, fontSize: 13, color: C.text }}>{name}</span>
        <svg
          width={14}
          height={14}
          viewBox="0 0 14 14"
          fill="none"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', flexShrink: 0 }}
        >
          <path d="M3 5L7 9L11 5" stroke={C.muted} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {open && (
        <div style={{ fontSize: 12, color: C.muted, paddingLeft: 26, paddingTop: 6, lineHeight: 1.5 }}>
          {detail}
        </div>
      )}
    </div>
  );
}
