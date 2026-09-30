import type { Metadata } from 'next';
import RepairInformationPage from '@/components/seo/RepairInformationPage';
export const metadata: Metadata = {
  title: { absolute: "Business Mac Security Incident Response | ZA Support" },
  description: "Apple-focused incident assessment for Johannesburg businesses. Authorised containment, preservation, account review, reporting and recovery planning.",
  alternates: { canonical: "https://zasupport.com/business-mac-security-incident-response" },
  robots: { index: true, follow: true },
  openGraph: { title: "Business Mac Security Incident Response", description: "Apple-focused incident assessment for Johannesburg businesses. Authorised containment, preservation, account review, reporting and recovery planning.", url: "https://zasupport.com/business-mac-security-incident-response", type: 'website' }
};
export default function Page() { return <RepairInformationPage slug="business-mac-security-incident-response" />; }
