import type { Metadata } from 'next';
import RepairInformationPage from '@/components/seo/RepairInformationPage';
export const metadata: Metadata = {
  title: { absolute: "Mac Data Recovery Johannesburg | ZA Support" },
  description: "MacBook, iMac and Mac mini data recovery assessment in Johannesburg. Dead Macs, liquid damage, FileVault and Apple silicon recovery options and limits.",
  alternates: { canonical: "https://zasupport.com/mac-data-recovery" },
  robots: { index: true, follow: true },
  openGraph: { title: "Mac Data Recovery Johannesburg", description: "MacBook, iMac and Mac mini data recovery assessment in Johannesburg. Dead Macs, liquid damage, FileVault and Apple silicon recovery options and limits.", url: "https://zasupport.com/mac-data-recovery", type: 'website' }
};
export default function Page() { return <RepairInformationPage slug="mac-data-recovery" />; }
