import type { Metadata } from 'next';
import RepairInformationPage from '@/components/seo/RepairInformationPage';
export const metadata: Metadata = {
  title: { absolute: "Digital Evidence Preservation for Apple Devices | ZA Support" },
  description: "Preserve Mac and iPhone incident evidence with authorised intake, custody records, appropriate isolation, integrity checks and documented limitations.",
  alternates: { canonical: "https://zasupport.com/digital-evidence-preservation" },
  robots: { index: true, follow: true },
  openGraph: { title: "Digital Evidence Preservation for Apple Devices", description: "Preserve Mac and iPhone incident evidence with authorised intake, custody records, appropriate isolation, integrity checks and documented limitations.", url: "https://zasupport.com/digital-evidence-preservation", type: 'website' }
};
export default function Page() { return <RepairInformationPage slug="digital-evidence-preservation" />; }
