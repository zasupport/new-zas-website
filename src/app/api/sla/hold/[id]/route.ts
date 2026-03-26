import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_API_URL ?? 'https://api.zasupport.com';
const AGENT_AUTH_TOKEN = process.env.AGENT_AUTH_TOKEN!;
const FETCH_TIMEOUT_MS = 10_000;

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const { id } = await params;

  if (!id || typeof id !== 'string') {
    return NextResponse.json({ error: 'Client ID is required.' }, { status: 400 });
  }

  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/sla/clients/${encodeURIComponent(id)}/hold`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AGENT_AUTH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => 'no body');
      console.error(`[sla/hold/${id}] backend ${res.status}: ${errText}`);
      return NextResponse.json({ error: 'Unable to place client on hold.' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[sla/hold/${id}] fetch error: ${message}`);
    return NextResponse.json({ error: 'Service temporarily unavailable.' }, { status: 503 });
  }
}
