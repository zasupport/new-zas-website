import type { Metadata } from 'next';
import RepairInformationPage from '@/components/seo/RepairInformationPage';
export const metadata: Metadata = {
  title: { absolute: "MacBook Trade-in and Resale Checklist | ZA Support" },
  description: "What to do before selling a MacBook: check backups, ownership, FileVault, Find My, management release and the correct macOS erase procedure.",
  alternates: { canonical: "https://zasupport.com/macbook-trade-in-checklist" },
  robots: { index: true, follow: true },
  openGraph: { title: "MacBook Trade-in and Resale Checklist", description: "What to do before selling a MacBook: check backups, ownership, FileVault, Find My, management release and the correct macOS erase procedure.", url: "https://zasupport.com/macbook-trade-in-checklist", type: 'website' }
};
export default function Page() { return <RepairInformationPage slug="macbook-trade-in-checklist" />; }
