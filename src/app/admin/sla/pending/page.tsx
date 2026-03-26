'use client';

import { useState, useEffect, useCallback } from 'react';

const C = {
  green: '#0FEA7A', bgDark: '#0A1A18', text: '#E8F4F1', muted: '#7A9E98',
  cardBg: 'rgba(22,34,32,0.5)', cardBorder: 'rgba(15,234,122,0.1)',
  glow: 'rgba(15,234,122,0.08)', greenBorder: 'rgba(15,234,122,0.2)',
  amber: '#fbbf24', amberBg: 'rgba(251,191,36,0.08)', amberBorder: 'rgba(251,191,36,0.15)',
};
const f = 'Inter, sans-serif';

interface PendingClient {
  client_id: string;
  practice_name: string;
  contact_name: string;
  email: string;
  phone: string;
  package_label: string;
  total_monthly: number;
  created_at: string;
  status: string;
  approval_token?: string;
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ background: C.cardBg, border: `1px solid ${C.cardBorder}`, borderRadius: 16, padding: 20, ...style }}>{children}</div>;
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string; label: string }> = {
    pending_approval: { bg: C.amberBg, color: C.amber, label: 'Pending Approval' },
    active: { bg: 'rgba(15,234,122,0.08)', color: C.green, label: 'Active' },
    on_hold: { bg: 'rgba(248,113,113,0.08)', color: '#f87171', label: 'On Hold' },
  };
  const s = map[status] ?? { bg: 'rgba(255,255,255,0.05)', color: C.muted, label: status };
  return <span style={{ padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600, fontFamily: f, background: s.bg, color: s.color }}>{s.label}</span>;
}

export default function AdminSLAPendingPage() {
  const [clients, setClients] = useState<PendingClient[]>([]);
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/sla/pending');
      if (!res.ok) throw new Error('Failed to load');
      const data = await res.json() as { clients: PendingClient[] };
      setClients(data.clients ?? []);
    } catch {
      setMessage({ text: 'Failed to load pending clients.', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const act = useCallback(async (clientId: string, action: 'approve' | 'hold') => {
    if (acting) return;
    setActing(clientId);
    setMessage(null);
    try {
      const res = await fetch(`/api/sla/${action}/${clientId}`, { method: 'POST' });
      if (!res.ok) throw new Error('Action failed');
      setMessage({ text: `Client ${action === 'approve' ? 'approved' : 'held'} successfully.`, type: 'success' });
      await load();
    } catch {
      setMessage({ text: `Failed to ${action} client.`, type: 'error' });
    } finally {
      setActing(null);
    }
  }, [acting, load]);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  };

  const formatZAR = (cents: number) => `R ${(cents / 100).toLocaleString('en-ZA', { minimumFractionDigits: 0 })}`;

  return (
    <div style={{ minHeight: '100vh', background: C.bgDark }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto', padding: '28px 20px 48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: C.text, fontFamily: f, marginBottom: 4 }}>SLA Pending Approvals</h1>
            <p style={{ fontSize: 13, color: C.muted, fontFamily: f }}>Review and approve or hold new SLA onboarding submissions.</p>
          </div>
          <button onClick={load} style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.04)', border: `1px solid ${C.cardBorder}`, borderRadius: 10, color: C.muted, fontFamily: f, fontSize: 12, cursor: 'pointer' }}>
            Refresh
          </button>
        </div>

        {message && (
          <div style={{ marginBottom: 20, padding: '10px 16px', borderRadius: 10, fontSize: 13, fontFamily: f, background: message.type === 'success' ? C.glow : 'rgba(248,113,113,0.08)', border: `1px solid ${message.type === 'success' ? C.greenBorder : 'rgba(248,113,113,0.2)'}`, color: message.type === 'success' ? C.green : '#f87171' }}>
            {message.text}
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: 60, color: C.muted, fontFamily: f }}>Loading…</div>
        ) : clients.length === 0 ? (
          <Card style={{ textAlign: 'center', padding: 60 }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>✓</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: C.text, fontFamily: f, marginBottom: 4 }}>All clear</div>
            <div style={{ fontSize: 13, color: C.muted, fontFamily: f }}>No pending approvals.</div>
          </Card>
        ) : (
          <div style={{ display: 'grid', gap: 16 }}>
            {clients.map(client => (
              <Card key={client.client_id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div>
                    <div style={{ fontSize: 17, fontWeight: 700, color: C.text, fontFamily: f, marginBottom: 2 }}>{client.practice_name}</div>
                    <div style={{ fontSize: 12, color: C.muted, fontFamily: f }}>{client.contact_name} · {client.email} · {client.phone}</div>
                  </div>
                  <StatusBadge status={client.status} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
                  {[['Package', client.package_label], ['Monthly (incl.)', formatZAR(client.total_monthly)], ['Submitted', formatDate(client.created_at)]].map(([k, v]) => (
                    <div key={k}>
                      <div style={{ fontSize: 10, color: C.muted, fontFamily: f, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>{k}</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: C.text, fontFamily: f }}>{v}</div>
                    </div>
                  ))}
                </div>
                {client.status === 'pending_approval' && (
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button
                      onClick={() => act(client.client_id, 'approve')}
                      disabled={acting === client.client_id}
                      style={{ flex: 1, padding: '10px 16px', borderRadius: 10, fontFamily: f, fontSize: 13, fontWeight: 600, cursor: acting ? 'not-allowed' : 'pointer', opacity: acting ? 0.5 : 1, border: 'none', background: C.green, color: C.bgDark, transition: 'all 0.2s ease' }}>
                      {acting === client.client_id ? 'Processing…' : '✓ Approve'}
                    </button>
                    <button
                      onClick={() => act(client.client_id, 'hold')}
                      disabled={acting === client.client_id}
                      style={{ flex: 1, padding: '10px 16px', borderRadius: 10, fontFamily: f, fontSize: 13, fontWeight: 600, cursor: acting ? 'not-allowed' : 'pointer', opacity: acting ? 0.5 : 1, border: `1px solid ${C.amberBorder}`, background: C.amberBg, color: C.amber, transition: 'all 0.2s ease' }}>
                      Hold
                    </button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
