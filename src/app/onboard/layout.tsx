import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SLA Onboarding — ZA Support',
  robots: 'noindex,nofollow',
};

export default function OnboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
