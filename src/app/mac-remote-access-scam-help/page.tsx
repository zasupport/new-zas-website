import type { Metadata } from 'next';
import RepairInformationPage from '@/components/seo/RepairInformationPage';
export const metadata: Metadata = {
  title: { absolute: "Mac Remote-access Scam Help | ZA Support" },
  description: "Help after a fake-support call or unwanted remote session on a Mac. Containment, account checks, evidence preservation and technical assessment.",
  alternates: { canonical: "https://zasupport.com/mac-remote-access-scam-help" },
  robots: { index: true, follow: true },
  openGraph: { title: "Mac Remote-access Scam Help", description: "Help after a fake-support call or unwanted remote session on a Mac. Containment, account checks, evidence preservation and technical assessment.", url: "https://zasupport.com/mac-remote-access-scam-help", type: 'website' }
};
export default function Page() { return <RepairInformationPage slug="mac-remote-access-scam-help" />; }
