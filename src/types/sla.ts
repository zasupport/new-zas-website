export interface SlaClient {
  client_id: string;
  practice_name: string;
  billing_entity: string | null;
  contact_name: string;
  email: string;
  phone: string;
  address: string | null;
  doctor_count: number;
  package_label: string;
  base_fee: number; // cents
  vat_amount: number; // cents
  processing_fee: number; // cents
  total_monthly: number; // cents
  billing_day: number;
  status: 'pending_payment' | 'pending_approval' | 'active' | 'on_hold' | 'cancelled';
  approved_at: string | null;
  approved_by: string | null;
  contract_sent_at: string | null;
  peach_checkout_id: string | null;
  peach_registration_id: string | null;
  approval_token: string | null;
  approval_token_used: boolean;
  contract_ref: string | null;
  source: string;
  created_at: string;
  updated_at: string;
}

export interface OnboardingData {
  practiceName: string;
  billingEntity: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  doctorCount: number;
}

export interface PriceBreakdown {
  base: number;
  vat: number;
  subtotal: number;
  proc: number;
  total: number;
}
