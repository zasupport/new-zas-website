'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

const SHELL_FREE = ['/admin/sla'];

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = SHELL_FREE.some((p) => pathname.startsWith(p));

  if (bare) return <>{children}</>;

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
