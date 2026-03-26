import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_API_URL ?? 'https://api.zasupport.com';
const AGENT_AUTH_TOKEN = process.env.AGENT_AUTH_TOKEN!;
const FETCH_TIMEOUT_MS = 10_000;

interface PeachWebhookResult {
  code?: string;
  description?: string;
}

interface PeachWebhookPayload {
  id?: string;
  registrationId?: string;
  merchantTransactionId?: string;
  result?: PeachWebhookResult;
  [key: string]: unknown;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  let payload: PeachWebhookPayload = {};

  const contentType = req.headers.get('content-type') ?? '';

  try {
    if (contentType.includes('application/x-www-form-urlencoded')) {
      const text = await req.text();
      const params = new URLSearchParams(text);
      // Flatten URLSearchParams into a plain object; nested keys (result.code) come as strings
      for (const [key, value] of params.entries()) {
        // Handle dot-notation keys like "result.code"
        const parts = key.split('.');
        if (parts.length === 2) {
          const parent = parts[0] as keyof PeachWebhookPayload;
          if (!payload[parent] || typeof payload[parent] !== 'object') {
            payload[parent] = {} as PeachWebhookResult;
          }
          (payload[parent] as Record<string, string>)[parts[1]] = value;
        } else {
          payload[key] = value;
        }
      }
    } else {
      payload = (await req.json()) as PeachWebhookPayload;
    }
  } catch {
    // Peach requires 200 — log and return OK
    console.error('[webhooks/peach-payments] Failed to parse webhook body');
    return NextResponse.json({ received: true }, { status: 200 });
  }

  const resultCode = payload.result?.code ?? 'unknown';
  const success =
    resultCode.startsWith('000.000') || resultCode.startsWith('000.100');

  const forwardBody = {
    transaction_id: payload.id ?? null,
    registration_id: payload.registrationId ?? null,
    client_id: payload.merchantTransactionId ?? null,
    result_code: resultCode,
    success,
    raw: payload,
  };

  // Forward to backend — fire and forget pattern; Peach must get 200 fast
  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/sla/webhook/peach`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AGENT_AUTH_TOKEN}`,
      },
      body: JSON.stringify(forwardBody),
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => 'no body');
      console.error(`[webhooks/peach-payments] backend ${res.status}: ${errText}`);
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[webhooks/peach-payments] forward error: ${message}`);
  }

  // Always return 200 — Peach will retry on non-200
  return NextResponse.json({ received: true }, { status: 200 });
}
