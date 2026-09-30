import type { Metadata } from 'next';
import RepairInformationPage from '@/components/seo/RepairInformationPage';
export const metadata: Metadata = {
  title: { absolute: "Apple Device Forensic Assessment and Reporting | ZA Support" },
  description: "Authorised Mac and iPhone technical investigation, evidence preservation and reporting, with qualified partner process review where required.",
  alternates: { canonical: "https://zasupport.com/apple-device-forensic-assessment" },
  robots: { index: true, follow: true },
  openGraph: { title: "Apple Device Forensic Assessment and Reporting", description: "Authorised Mac and iPhone technical investigation, evidence preservation and reporting, with qualified partner process review where required.", url: "https://zasupport.com/apple-device-forensic-assessment", type: 'website' }
};
export default function Page() { return <RepairInformationPage slug="apple-device-forensic-assessment" />; }
