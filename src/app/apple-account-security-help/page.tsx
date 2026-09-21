import type { Metadata } from 'next';
import RepairInformationPage from '@/components/seo/RepairInformationPage';
export const metadata: Metadata = {
  title: { absolute: "Apple Account Security and Phishing Help | ZA Support" },
  description: "Assistance with suspicious Apple Account sign-ins, phishing, account takeover concerns and official account recovery. No password or security bypass.",
  alternates: { canonical: "https://zasupport.com/apple-account-security-help" },
  robots: { index: true, follow: true },
  openGraph: { title: "Apple Account Security and Phishing Help", description: "Assistance with suspicious Apple Account sign-ins, phishing, account takeover concerns and official account recovery. No password or security bypass.", url: "https://zasupport.com/apple-account-security-help", type: 'website' }
};
export default function Page() { return <RepairInformationPage slug="apple-account-security-help" />; }
