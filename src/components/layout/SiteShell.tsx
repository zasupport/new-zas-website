'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const SHELL_FREE = ['/admin/sla'];

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = SHELL_FREE.some((p) => pathname.startsWith(p));

  // Website hardening — disable right-click and common copy shortcuts
  useEffect(() => {
    const blockContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    const blockKeys = (e: KeyboardEvent) => {
      // Block Ctrl/Cmd+U (view source), Ctrl/Cmd+S (save), Ctrl/Cmd+Shift+I (devtools)
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S')
      ) {
        e.preventDefault();
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'i' || e.key === 'I' || e.key === 'j' || e.key === 'J')) {
        e.preventDefault();
      }
    };

    // Prevent text selection on body (allow in inputs/textareas)
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';

    // Prevent image dragging
    const blockDrag = (e: DragEvent) => {
      if ((e.target as HTMLElement)?.tagName === 'IMG') e.preventDefault();
    };

    document.addEventListener('contextmenu', blockContextMenu);
    document.addEventListener('keydown', blockKeys);
    document.addEventListener('dragstart', blockDrag);
    return () => {
      document.removeEventListener('contextmenu', blockContextMenu);
      document.removeEventListener('keydown', blockKeys);
      document.removeEventListener('dragstart', blockDrag);
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
    };
  }, []);

  if (bare) return <>{children}</>;

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
