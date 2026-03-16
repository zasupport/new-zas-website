import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'iPhone Liquid Damage Repair Johannesburg | ZA Support',
  description: 'iPhone liquid damage repair in Johannesburg. Assessment: R899 ex VAT, Assessment: R899 ex VAT. Call 064 529 5863.',
};

export default function iPhoneRepairLiquidDamagePage() {
  redirect('/liquid-damage/iphone');
}
