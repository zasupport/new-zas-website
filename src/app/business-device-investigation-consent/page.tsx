import type { Metadata } from 'next';
import RepairInformationPage from '@/components/seo/RepairInformationPage';
export const metadata: Metadata = {
  title: { absolute: "Authority and Consent for Business Device Investigations | ZA Support" },
  description: "An intake checklist for Mac and iPhone investigations: ownership, lawful authority, scope, employee privacy, retention and legal direction.",
  alternates: { canonical: "https://zasupport.com/business-device-investigation-consent" },
  robots: { index: true, follow: true },
  openGraph: { title: "Authority and Consent for Business Device Investigations", description: "An intake checklist for Mac and iPhone investigations: ownership, lawful authority, scope, employee privacy, retention and legal direction.", url: "https://zasupport.com/business-device-investigation-consent", type: 'website' }
};
export default function Page() { return <RepairInformationPage slug="business-device-investigation-consent" />; }
