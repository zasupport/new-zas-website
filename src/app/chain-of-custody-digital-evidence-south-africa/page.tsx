import type { Metadata } from 'next';
import RepairInformationPage from '@/components/seo/RepairInformationPage';
export const metadata: Metadata = {
  title: { absolute: "Digital Evidence Chain of Custody in South Africa | ZA Support" },
  description: "How digital-evidence handling is documented: item identifiers, transfers, integrity checks, access records, reporting and court-related limitations.",
  alternates: { canonical: "https://zasupport.com/chain-of-custody-digital-evidence-south-africa" },
  robots: { index: true, follow: true },
  openGraph: { title: "Digital Evidence Chain of Custody in South Africa", description: "How digital-evidence handling is documented: item identifiers, transfers, integrity checks, access records, reporting and court-related limitations.", url: "https://zasupport.com/chain-of-custody-digital-evidence-south-africa", type: 'website' }
};
export default function Page() { return <RepairInformationPage slug="chain-of-custody-digital-evidence-south-africa" />; }
