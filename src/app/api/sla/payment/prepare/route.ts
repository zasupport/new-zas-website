import { NextRequest, NextResponse } from 'next/server';
import { createPeachCheckout, getPeachWidgetUrl, getPeachCssUrl } from '@/lib/peach';
import { calcTotal, baseFeeForCount } from '@/lib/pricing';

interface PrepareRequestBody {
  doctor_count: number;
  email: string;
  client_id_hint?: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: Partial<PrepareRequestBody>;

  try {
    body = (await req.json()) as Partial<PrepareRequestBody>;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const { doctor_count, email, client_id_hint } = body;

  if (typeof doctor_count !== 'number' || doctor_count < 1 || !Number.isInteger(doctor_count)) {
    return NextResponse.json({ error: 'doctor_count must be a positive integer.' }, { status: 422 });
  }
  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'A valid email address is required.' }, { status: 422 });
  }

  const baseFee = baseFeeForCount(doctor_count);
  const { total } = calcTotal(baseFee);
  const clientId = client_id_hint ?? `web-${email.split('@')[0]}-${Date.now()}`;

  try {
    const checkout = await createPeachCheckout({
      amount: total,
      currency: 'ZAR',
      description: `ZA Support SLA — Monthly Managed IT`,
      email: email.trim().toLowerCase(),
      clientId,
    });

    return NextResponse.json({
      checkout_id: checkout.id,
      widget_url: getPeachWidgetUrl(checkout.id),
      css_url: getPeachCssUrl(),
      amount: total,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[sla/payment/prepare] ${message}`);
    return NextResponse.json({ error: 'Unable to initialise payment. Please try again.' }, { status: 502 });
  }
}
