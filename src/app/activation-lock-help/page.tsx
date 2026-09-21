import type { Metadata } from 'next';
import RepairInformationPage from '@/components/seo/RepairInformationPage';
export const metadata: Metadata = {
  title: { absolute: "Activation Lock Help for Apple Device Owners | ZA Support" },
  description: "Owner-authorised Activation Lock assistance for Mac and iPhone. Find My, previous-owner removal, business management and official Apple support routes.",
  alternates: { canonical: "https://zasupport.com/activation-lock-help" },
  robots: { index: true, follow: true },
  openGraph: { title: "Activation Lock Help for Apple Device Owners", description: "Owner-authorised Activation Lock assistance for Mac and iPhone. Find My, previous-owner removal, business management and official Apple support routes.", url: "https://zasupport.com/activation-lock-help", type: 'website' }
};
export default function Page() { return <RepairInformationPage slug="activation-lock-help" />; }
