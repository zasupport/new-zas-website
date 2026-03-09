'use client';

import { clsx } from 'clsx';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

const paddingSizes = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export default function Card({
  children,
  className,
  glow = false,
  hover = true,
  padding = 'md',
}: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-2xl border transition-all duration-300',
        'bg-[rgba(22,34,32,0.6)] backdrop-blur-md',
        'border-[rgba(15,234,122,0.15)]',
        hover && 'hover:border-[rgba(15,234,122,0.35)] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(15,234,122,0.1)]',
        glow && 'shadow-[0_0_20px_rgba(15,234,122,0.15)]',
        paddingSizes[padding],
        className
      )}
    >
      {children}
    </div>
  );
}
