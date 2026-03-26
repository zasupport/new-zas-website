'use client';

import React from 'react';

const C = {
  cardBg: 'rgba(22,34,32,0.5)',
  cardBorder: 'rgba(15,234,122,0.1)',
  glow: 'rgba(15,234,122,0.08)',
  greenBorder: 'rgba(15,234,122,0.2)',
};

interface GlassCardProps {
  children: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export default function GlassCard({ children, onClick, selected, style, className }: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={className}
      style={{
        background: selected ? C.glow : C.cardBg,
        border: `1px solid ${selected ? C.greenBorder : C.cardBorder}`,
        borderRadius: 16,
        padding: 20,
        cursor: onClick ? 'pointer' : undefined,
        transition: onClick ? 'background 0.2s, border-color 0.2s' : undefined,
        backdropFilter: 'blur(8px)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
