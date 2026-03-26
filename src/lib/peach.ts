const PEACH_BASE = 'https://eu-prod.oppwa.com';
const ENTITY_ID = process.env.PEACH_ENTITY_ID!;
const ACCESS_TOKEN = process.env.PEACH_ACCESS_TOKEN!;

const FETCH_TIMEOUT_MS = 10_000;

export interface PeachCheckout {
  id: string;
  buildNumber: string;
  timestamp: string;
  ndc: string;
}

export interface PeachPaymentStatus {
  success: boolean;
  registrationId?: string;
  transactionId?: string;
  resultCode: string;
}

function withTimeout(ms: number): AbortSignal {
  return AbortSignal.timeout(ms);
}

/**
 * Create a new checkout for card registration + initial payment.
 * Uses DB (debit) + INITIAL recurring type to capture the card for future billing.
 */
export async function createPeachCheckout(params: {
  amount: number; // in Rands (e.g. 5331)
  currency?: string;
  description: string;
  email: string;
  clientId: string;
}): Promise<PeachCheckout> {
  const currency = params.currency ?? 'ZAR';
  const amountFormatted = params.amount.toFixed(2);

  const body = new URLSearchParams({
    entityId: ENTITY_ID,
    amount: amountFormatted,
    currency,
    paymentType: 'DB',
    recurringType: 'INITIAL',
    createRegistration: 'true',
    'customer.email': params.email,
    merchantTransactionId: params.clientId,
    description: params.description,
  });

  const res = await fetch(`${PEACH_BASE}/v1/checkouts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    body: body.toString(),
    signal: withTimeout(FETCH_TIMEOUT_MS),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => 'no body');
    throw new Error(`Peach checkout failed: HTTP ${res.status} — ${text}`);
  }

  const data = (await res.json()) as PeachCheckout & { result?: { code?: string; description?: string } };

  // Peach returns 200 even on logical errors — check result code
  if (data.result?.code && !data.result.code.startsWith('000.200')) {
    throw new Error(`Peach checkout rejected: ${data.result.code} — ${data.result.description ?? 'no description'}`);
  }

  return {
    id: data.id,
    buildNumber: data.buildNumber,
    timestamp: data.timestamp,
    ndc: data.ndc,
  };
}

/**
 * Verify Peach webhook signature.
 * Full HMAC implementation pending Peach webhook secret — returns true for now.
 */
export function verifyPeachWebhook(_payload: string, _signature: string): boolean {
  return true;
}

/**
 * Check payment status for a completed checkout.
 */
export async function getPaymentStatus(checkoutId: string): Promise<PeachPaymentStatus> {
  const url = `${PEACH_BASE}/v1/checkouts/${encodeURIComponent(checkoutId)}/payment?entityId=${encodeURIComponent(ENTITY_ID)}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    signal: withTimeout(FETCH_TIMEOUT_MS),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => 'no body');
    throw new Error(`Peach status check failed: HTTP ${res.status} — ${text}`);
  }

  const data = (await res.json()) as {
    id?: string;
    registrationId?: string;
    result?: { code?: string };
  };

  const resultCode = data.result?.code ?? 'unknown';
  const success =
    resultCode.startsWith('000.000') || resultCode.startsWith('000.100');

  return {
    success,
    registrationId: data.registrationId,
    transactionId: data.id,
    resultCode,
  };
}

/** Returns the Peach JS widget URL for embedding in a page. */
export function getPeachWidgetUrl(checkoutId: string): string {
  return `${PEACH_BASE}/v1/paymentWidgets.js?checkoutId=${encodeURIComponent(checkoutId)}`;
}

/** Returns the Peach widget CSS URL. */
export function getPeachCssUrl(): string {
  return `${PEACH_BASE}/v1/paymentWidgets.css`;
}
