import type { Metadata } from 'next';
import RepairInformationPage from '@/components/seo/RepairInformationPage';
export const metadata: Metadata = {
  title: { absolute: "iPhone Trade-in and Resale Checklist | ZA Support" },
  description: "Prepare an iPhone for resale: transfer data, check backups, unpair Apple Watch, manage Find My and follow Apple's erase and service-transfer steps.",
  alternates: { canonical: "https://zasupport.com/iphone-trade-in-checklist" },
  robots: { index: true, follow: true },
  openGraph: { title: "iPhone Trade-in and Resale Checklist", description: "Prepare an iPhone for resale: transfer data, check backups, unpair Apple Watch, manage Find My and follow Apple's erase and service-transfer steps.", url: "https://zasupport.com/iphone-trade-in-checklist", type: 'website' }
};
export default function Page() { return <RepairInformationPage slug="iphone-trade-in-checklist" />; }
