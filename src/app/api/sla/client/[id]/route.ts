import { NextRequest, NextResponse } from 'next/server';
import type { SlaClient } from '@/types/sla';

const BACKEND_URL = process.env.BACKEND_API_URL ?? 'https://api.zasupport.com';
const AGENT_AUTH_TOKEN = process.env.AGENT_AUTH_TOKEN!;
const FETCH_TIMEOUT_MS = 10_000;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const { id } = await params;

  if (!id || typeof id !== 'string') {
    return NextResponse.json({ error: 'Client ID is required.' }, { status: 400 });
  }

  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/sla/clients/${encodeURIComponent(id)}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${AGENT_AUTH_TOKEN}`,
      },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      cache: 'no-store',
    });

    if (res.status === 404) {
      return NextResponse.json({ error: 'Client not found.' }, { status: 404 });
    }

    if (!res.ok) {
      const errText = await res.text().catch(() => 'no body');
      console.error(`[sla/client/${id}] backend ${res.status}: ${errText}`);
      return NextResponse.json({ error: 'Unable to fetch client.' }, { status: 502 });
    }

    const data = (await res.json()) as SlaClient;
    return NextResponse.json(data);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[sla/client/${id}] fetch error: ${message}`);
    return NextResponse.json({ error: 'Service temporarily unavailable.' }, { status: 503 });
  }
}
