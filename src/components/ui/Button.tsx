import Link from 'next/link';
import { clsx } from 'clsx';
import type { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  external?: boolean;
  'aria-label'?: string;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-[#0FEA7A] text-[#0A1A18] font-semibold hover:bg-[#0FEA7A]/90 hover:shadow-[0_0_24px_rgba(15,234,122,0.4)] active:scale-[0.98]',
  outline:
    'border border-[rgba(15,234,122,0.4)] text-[#0FEA7A] hover:bg-[rgba(15,234,122,0.08)] hover:border-[#0FEA7A]',
  ghost:
    'text-[#E8F4F1] hover:text-[#0FEA7A] hover:bg-[rgba(15,234,122,0.06)]',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-xl',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className,
  type = 'button',
  disabled,
  external,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const classes = clsx(
    'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 cursor-pointer select-none',
    variants[variant],
    sizes[size],
    disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    className
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          aria-label={ariaLabel}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
