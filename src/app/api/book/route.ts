import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { escapeHtml, isValidEmail, clampLength, LIMITS, normalizeZAPhone } from '@/lib/sanitise';

const resend = new Resend(process.env.RESEND_API_KEY);

const ZA_PHONE = '27645295863';

function buildClientReplyUrl(name: string, phone: string, problem: string): string {
  const firstName = (name.split(/\s+/)[0] || name).trim();
  const clientPhone = normalizeZAPhone(phone);
  const target = clientPhone || ZA_PHONE;
  const problemPhrase = problem.trim().replace(/[.!?\s]+$/, '').toLowerCase();
  const msg = encodeURIComponent(
    `Hi ${firstName},\n` +
    `Thank you for the email.\n` +
    `I understand your problem to be that your ${problemPhrase}. Would you mind sending me your serial number and your model number. The model number starts with an 'A'. Thanks so much. Chat soon.\n\n` +
    `Kind regards,\n` +
    `Mary Blount`
  );
  return `https://wa.me/${target}?text=${msg}`;
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { name, phone, deviceType, problem, preferredContact, email, _hp, _ts } = body as {
    name?: string;
    phone?: string;
    deviceType?: string;
    problem?: string;
    preferredContact?: string;
    email?: string;
    _hp?: string;
    _ts?: number;
  };

  // Honeypot — bots fill hidden fields, humans don't
  if (_hp) {
    return NextResponse.json({ success: true, whatsappUrl: `https://wa.me/${ZA_PHONE}` });
  }

  // Time gate — legitimate users take >3 seconds to fill a form
  if (_ts && typeof _ts === 'number' && Date.now() - _ts < 3000) {
    return NextResponse.json({ success: true, whatsappUrl: `https://wa.me/${ZA_PHONE}` });
  }

  // Validate required fields
  if (!name?.trim()) return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  if (!phone?.trim()) return NextResponse.json({ error: 'Phone is required' }, { status: 400 });
  if (!deviceType?.trim()) return NextResponse.json({ error: 'Device type is required' }, { status: 400 });
  if (!problem?.trim()) return NextResponse.json({ error: 'Problem description is required' }, { status: 400 });
  if (!preferredContact?.trim()) return NextResponse.json({ error: 'Preferred contact method is required' }, { status: 400 });

  const nameStr = name.trim();
  const phoneStr = phone.trim();
  const deviceTypeStr = deviceType.trim();
  const problemStr = problem.trim();
  const preferredContactStr = preferredContact.trim();
  const emailStr = email?.trim() ?? '';

  // Email format validation (only if provided)
  if (emailStr && !isValidEmail(emailStr)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  // Length limits
  if (clampLength(nameStr, LIMITS.name) === null)
    return NextResponse.json({ error: 'Name too long' }, { status: 400 });
  if (clampLength(phoneStr, LIMITS.phone) === null)
    return NextResponse.json({ error: 'Phone too long' }, { status: 400 });
  if (clampLength(deviceTypeStr, LIMITS.deviceType) === null)
    return NextResponse.json({ error: 'Device type too long' }, { status: 400 });
  if (clampLength(problemStr, LIMITS.problem) === null)
    return NextResponse.json({ error: 'Problem description too long (2000 chars max)' }, { status: 400 });
  if (clampLength(preferredContactStr, LIMITS.preferredContact) === null)
    return NextResponse.json({ error: 'Preferred contact value too long' }, { status: 400 });

  const whatsappUrl = buildClientReplyUrl(nameStr, phoneStr, problemStr);

  // Sanitise for HTML email
  const safeName = escapeHtml(nameStr);
  const safePhone = escapeHtml(phoneStr);
  const safeDeviceType = escapeHtml(deviceTypeStr);
  const safeProblem = escapeHtml(problemStr);
  const safePreferredContact = escapeHtml(preferredContactStr);
  const safeEmail = escapeHtml(emailStr);
  const safeWhatsappUrl = escapeHtml(whatsappUrl);

  // Send email notification
  try {
    await resend.emails.send({
      from: 'ZA Support Bookings <admin@zasupport.com>',
      to: 'mary@zasupport.com',
      subject: `New Repair Booking — ${safeName} — ${safeDeviceType}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0A1A18; color: #E8F4F1; padding: 24px; border-radius: 12px;">
          <div style="background: #0FEA7A; color: #0A1A18; padding: 12px 20px; border-radius: 8px; margin-bottom: 24px; font-weight: bold; font-size: 18px;">
            New Booking Request
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #7A9E98; width: 40%; vertical-align: top;">Name</td>
              <td style="padding: 8px 0; color: #E8F4F1; font-weight: 600;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #7A9E98;">Phone / WhatsApp</td>
              <td style="padding: 8px 0; color: #E8F4F1; font-weight: 600;">${safePhone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #7A9E98;">Device</td>
              <td style="padding: 8px 0; color: #E8F4F1;">${safeDeviceType}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #7A9E98;">Preferred Contact</td>
              <td style="padding: 8px 0; color: #E8F4F1;">${safePreferredContact}</td>
            </tr>
            ${safeEmail ? `<tr>
              <td style="padding: 8px 0; color: #7A9E98;">Email</td>
              <td style="padding: 8px 0; color: #E8F4F1;">${safeEmail}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 8px 0; color: #7A9E98; vertical-align: top;">Problem</td>
              <td style="padding: 8px 0; color: #E8F4F1;">${safeProblem}</td>
            </tr>
          </table>
          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.08);">
            <a href="${safeWhatsappUrl}" style="background: #0FEA7A; color: #0A1A18; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">
              Reply via WhatsApp
            </a>
          </div>
          <p style="color: #7A9E98; font-size: 12px; margin-top: 16px;">Submitted: ${new Date().toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' })} SAST</p>
        </div>
      `,
    });
  } catch (emailErr) {
    console.error('[book] Email send failed:', emailErr);
  }

  return NextResponse.json({ success: true, whatsappUrl }, { status: 200 });
}
