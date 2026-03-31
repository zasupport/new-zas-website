import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { escapeHtml, isValidEmail, clampLength, LIMITS } from '@/lib/sanitise';

const resend = new Resend(process.env.RESEND_API_KEY);

// ─── IP-based rate limiting ────────────────────────────────────────────────
// 5 requests per IP per 60 seconds. Module-level store persists within a warm
// Lambda instance. Cold-start resets are acceptable — provides meaningful
// protection against rapid-fire bot bursts within the same request window.
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60_000;

function checkRateLimit(ip: string): { limited: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { limited: false, remaining: RATE_LIMIT_MAX - 1 };
  }
  entry.count += 1;
  if (entry.count > RATE_LIMIT_MAX) {
    return { limited: true, remaining: 0 };
  }
  return { limited: false, remaining: RATE_LIMIT_MAX - entry.count };
}

// ─── Bot content detection ─────────────────────────────────────────────────
// Names/issues shorter than real human input, or known bot probe patterns
const BOT_NAME_PATTERNS = [/^rltest$/i, /^ci$/i, /^test$/i, /^bot$/i, /^asdf$/i, /^aaa+$/i, /^x+$/i, /^admin$/i, /^user$/i, /^null$/i];
const BOT_EMAIL_DOMAINS = ['example.com', 'test.com', 'mailinator.com', 'guerrillamail.com', 'tempmail.com', 'throwaway.email', 'yopmail.com', 'sharklasers.com', 'guerrillamailblock.com', 'grr.la'];
const BOT_ISSUE_PATTERNS = [/^test$/i, /^testing$/i, /^asdf/i, /^(a|x){3,}$/i, /^\.+$/, /^hello$/i, /^\d+$/];

function looksLikeBot(name: string, email: string, issue: string): boolean {
  // Name matches known bot probe patterns
  if (BOT_NAME_PATTERNS.some(p => p.test(name.trim()))) return true;
  // Disposable/test email domain
  const domain = email.split('@')[1]?.toLowerCase() ?? '';
  if (BOT_EMAIL_DOMAINS.includes(domain)) return true;
  // Issue body is trivially short or matches bot patterns
  if (issue.trim().length < 10) return true;
  if (BOT_ISSUE_PATTERNS.some(p => p.test(issue.trim()))) return true;
  // Name is a single character
  if (name.trim().length < 2) return true;
  return false;
}

export async function POST(request: NextRequest) {
  try {
    // ── Rate limit check — first, before any other processing ────────────────
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';
    const { limited, remaining } = checkRateLimit(ip);
    if (limited) {
      return NextResponse.json(
        { error: 'Too many requests — please wait before trying again.' },
        {
          status: 429,
          headers: {
            'Retry-After': '60',
            'X-RateLimit-Limit': String(RATE_LIMIT_MAX),
            'X-RateLimit-Remaining': '0',
          },
        }
      );
    }

    const body = await request.json();
    const { name, email, phone, device, issue, urgency, _hp, _ts } = body;

    // Honeypot — bots fill hidden fields, humans don't
    if (_hp) {
      return NextResponse.json({ success: true }); // Silent discard — 200 so bots think it worked
    }

    // Time gate — legitimate users take >3 seconds to fill a form
    if (_ts && typeof _ts === 'number' && Date.now() - _ts < 3000) {
      return NextResponse.json({ success: true }); // Silent discard
    }

    // Required fields
    if (!name || !email || !issue) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Content-based bot detection — silently discard, return 200 so bot doesn't retry
    if (looksLikeBot(String(name), String(email), String(issue))) {
      console.log(`[contact] bot-filtered: name="${String(name).slice(0, 20)}" email="${String(email).slice(0, 30)}"`);
      return NextResponse.json({ success: true });
    }

    // Type coercion to string
    const nameStr = String(name).trim();
    const emailStr = String(email).trim();
    const issueStr = String(issue).trim();
    const phoneStr = phone ? String(phone).trim() : '';
    const deviceStr = device ? String(device).trim() : '';
    const urgencyStr = urgency ? String(urgency).trim() : '';

    // Email format validation
    if (!isValidEmail(emailStr)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Length limits
    if (clampLength(nameStr, LIMITS.name) === null)
      return NextResponse.json({ error: 'Name too long' }, { status: 400 });
    if (clampLength(emailStr, LIMITS.email) === null)
      return NextResponse.json({ error: 'Email too long' }, { status: 400 });
    if (clampLength(issueStr, LIMITS.issue) === null)
      return NextResponse.json({ error: 'Issue description too long (2000 chars max)' }, { status: 400 });
    if (phoneStr && clampLength(phoneStr, LIMITS.phone) === null)
      return NextResponse.json({ error: 'Phone number too long' }, { status: 400 });
    if (deviceStr && clampLength(deviceStr, LIMITS.device) === null)
      return NextResponse.json({ error: 'Device name too long' }, { status: 400 });

    // Sanitise all user input before HTML interpolation
    const safeName = escapeHtml(nameStr);
    const safeEmail = escapeHtml(emailStr);
    const safePhone = escapeHtml(phoneStr);
    const safeDevice = escapeHtml(deviceStr);
    const safeIssue = escapeHtml(issueStr);

    const urgencyLabels: Record<string, string> = {
      low: 'Not urgent',
      medium: 'This week',
      high: 'Urgent',
      emergency: 'Emergency',
    };
    const safeUrgency = urgencyLabels[urgencyStr] ?? escapeHtml(urgencyStr);

    // Send notification to admin
    await resend.emails.send({
      from: 'ZA Support Website <admin@zasupport.com>',
      to: ['admin@zasupport.com'],
      subject: `[${safeUrgency}] New Enquiry — ${safeDevice || 'Unknown device'} — ${safeName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0FEA7A; border-bottom: 2px solid #0FEA7A; padding-bottom: 8px;">New Website Enquiry</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666; width: 140px;"><strong>Name:</strong></td><td style="padding: 8px 0;">${safeName}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td><td style="padding: 8px 0;"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Phone:</strong></td><td style="padding: 8px 0;">${safePhone || 'Not provided'}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Device:</strong></td><td style="padding: 8px 0;">${safeDevice || 'Not specified'}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Urgency:</strong></td><td style="padding: 8px 0; color: ${urgencyStr === 'emergency' ? 'red' : 'inherit'};">${safeUrgency}</td></tr>
          </table>
          <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; margin-top: 16px;">
            <strong>Issue:</strong><br/>
            <p style="white-space: pre-wrap; margin: 8px 0 0;">${safeIssue}</p>
          </div>
        </div>
      `,
    });

    // Send auto-reply to client
    await resend.emails.send({
      from: 'ZA Support <admin@zasupport.com>',
      to: [emailStr],
      subject: "Your ZA Support Enquiry — We'll Be in Touch",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0FEA7A;">Thank you, ${safeName}.</h2>
          <p>We have received your enquiry and will get back to you within 1 hour during business hours.</p>
          <p>If your issue is urgent, please call us directly:</p>
          <p style="font-size: 20px; font-weight: bold; color: #27504D;">064 529 5863</p>
          <hr style="border: 1px solid #eee; margin: 24px 0;" />
          <p><strong>Your enquiry:</strong></p>
          <p>${safeIssue}</p>
          <hr style="border: 1px solid #eee; margin: 24px 0;" />
          <p style="color: #666; font-size: 14px;">
            ZA Support | 1 Hyde Lane, Hyde Park, Second Floor, Office E2004, Johannesburg<br/>
            Mon–Fri: 08:00–17:30 · Sat: 09:00–13:00
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
