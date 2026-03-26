import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ZA Support — SLA Activation',
  robots: { index: false, follow: false },
};

export default function LeanneLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
