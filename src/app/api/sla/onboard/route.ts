import { NextRequest, NextResponse } from 'next/server';
import { escapeHtml, isValidEmail } from '@/lib/sanitise';
import { calcTotalCents, baseFeeForCount, packageLabel } from '@/lib/pricing';

const BACKEND_URL = process.env.BACKEND_API_URL ?? 'https://api.zasupport.com';
const AGENT_AUTH_TOKEN = process.env.AGENT_AUTH_TOKEN!;
const FETCH_TIMEOUT_MS = 10_000;

interface OnboardRequestBody {
  practice_name: string;
  billing_entity?: string;
  contact_name: string;
  email: string;
  phone: string;
  address?: string;
  doctor_count: number;
  peach_checkout_id?: string;
}

interface OnboardResponse {
  client_id: string;
  contract_ref: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: Partial<OnboardRequestBody>;

  try {
    body = (await req.json()) as Partial<OnboardRequestBody>;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  // ── Validation ──────────────────────────────────────────────────────────
  const { practice_name, contact_name, email, phone, doctor_count } = body;

  if (!practice_name || typeof practice_name !== 'string' || practice_name.trim().length === 0) {
    return NextResponse.json({ error: 'practice_name is required.' }, { status: 422 });
  }
  if (!contact_name || typeof contact_name !== 'string' || contact_name.trim().length === 0) {
    return NextResponse.json({ error: 'contact_name is required.' }, { status: 422 });
  }
  if (!email || typeof email !== 'string' || !isValidEmail(email)) {
    return NextResponse.json({ error: 'A valid email address is required.' }, { status: 422 });
  }
  if (!phone || typeof phone !== 'string' || phone.trim().length === 0) {
    return NextResponse.json({ error: 'phone is required.' }, { status: 422 });
  }
  if (typeof doctor_count !== 'number' || doctor_count < 1 || !Number.isInteger(doctor_count)) {
    return NextResponse.json({ error: 'doctor_count must be a positive integer.' }, { status: 422 });
  }

  // ── Sanitise ─────────────────────────────────────────────────────────────
  const sanitised = {
    practice_name: escapeHtml(practice_name.trim()),
    billing_entity: body.billing_entity ? escapeHtml(body.billing_entity.trim()) : null,
    contact_name: escapeHtml(contact_name.trim()),
    email: email.trim().toLowerCase(),
    phone: escapeHtml(phone.trim()),
    address: body.address ? escapeHtml(body.address.trim()) : null,
    doctor_count,
    peach_checkout_id: body.peach_checkout_id ?? null,
    package_label: packageLabel(doctor_count),
    ...calcTotalCents(baseFeeForCount(doctor_count)),
    source: 'website_onboarding',
  };

  // ── Forward to backend ───────────────────────────────────────────────────
  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/sla/clients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AGENT_AUTH_TOKEN}`,
      },
      body: JSON.stringify(sanitised),
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => 'no body');
      console.error(`[sla/onboard] backend ${res.status}: ${errText}`);
      return NextResponse.json(
        { error: 'Unable to create SLA record. Please try again.' },
        { status: 502 },
      );
    }

    const data = (await res.json()) as OnboardResponse;

    return NextResponse.json({ client_id: data.client_id, contract_ref: data.contract_ref });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[sla/onboard] fetch error: ${message}`);
    return NextResponse.json({ error: 'Service temporarily unavailable.' }, { status: 503 });
  }
}
