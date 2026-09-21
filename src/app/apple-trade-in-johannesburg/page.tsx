import type { Metadata } from 'next';
import RepairInformationPage from '@/components/seo/RepairInformationPage';
export const metadata: Metadata = {
  title: { absolute: "Apple Trade-in and Resale Readiness in Johannesburg | ZA Support" },
  description: "Prepare a MacBook or iPhone for trade-in or resale. Backup, condition checks, Find My, Activation Lock, secure erasure and business-device readiness.",
  alternates: { canonical: "https://zasupport.com/apple-trade-in-johannesburg" },
  robots: { index: true, follow: true },
  openGraph: { title: "Apple Trade-in and Resale Readiness in Johannesburg", description: "Prepare a MacBook or iPhone for trade-in or resale. Backup, condition checks, Find My, Activation Lock, secure erasure and business-device readiness.", url: "https://zasupport.com/apple-trade-in-johannesburg", type: 'website' }
};
export default function Page() { return <RepairInformationPage slug="apple-trade-in-johannesburg" />; }
