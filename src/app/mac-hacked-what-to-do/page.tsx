import type { Metadata } from 'next';
import RepairInformationPage from '@/components/seo/RepairInformationPage';
export const metadata: Metadata = {
  title: { absolute: "Think Your Mac Has Been Hacked? What to Do | ZA Support" },
  description: "Practical first steps for suspicious Mac activity, phishing, unexpected remote access and account alerts. Preserve evidence and arrange an assessment.",
  alternates: { canonical: "https://zasupport.com/mac-hacked-what-to-do" },
  robots: { index: true, follow: true },
  openGraph: { title: "Think Your Mac Has Been Hacked? What to Do", description: "Practical first steps for suspicious Mac activity, phishing, unexpected remote access and account alerts. Preserve evidence and arrange an assessment.", url: "https://zasupport.com/mac-hacked-what-to-do", type: 'website' }
};
export default function Page() { return <RepairInformationPage slug="mac-hacked-what-to-do" />; }
