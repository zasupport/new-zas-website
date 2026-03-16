import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const PHONE = '27645295863';

function buildWhatsAppUrl(name: string, device: string, problem: string): string {
  const msg = encodeURIComponent(
    `Hi, I just submitted a booking request.\n\nName: ${name}\nDevice: ${device}\nProblem: ${problem}\n\nLooking forward to hearing from you!`
  );
  return `https://wa.me/${PHONE}?text=${msg}`;
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { name, phone, deviceType, problem, preferredContact, email } = body as {
    name?: string;
    phone?: string;
    deviceType?: string;
    problem?: string;
    preferredContact?: string;
    email?: string;
  };

  // Validate required fields
  if (!name?.trim()) return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  if (!phone?.trim()) return NextResponse.json({ error: 'Phone is required' }, { status: 400 });
  if (!deviceType?.trim()) return NextResponse.json({ error: 'Device type is required' }, { status: 400 });
  if (!problem?.trim()) return NextResponse.json({ error: 'Problem description is required' }, { status: 400 });
  if (!preferredContact?.trim()) return NextResponse.json({ error: 'Preferred contact method is required' }, { status: 400 });

  if (problem.length > 500) {
    return NextResponse.json({ error: 'Problem description exceeds 500 characters' }, { status: 400 });
  }

  const whatsappUrl = buildWhatsAppUrl(name, deviceType, problem);

  // Send email notification to Courtney
  try {
    await resend.emails.send({
      from: 'ZA Support Bookings <onboarding@resend.dev>',
      to: 'courtney@zasupport.com',
      subject: `New Repair Booking — ${name} — ${deviceType}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0A1A18; color: #E8F4F1; padding: 24px; border-radius: 12px;">
          <div style="background: #0FEA7A; color: #0A1A18; padding: 12px 20px; border-radius: 8px; margin-bottom: 24px; font-weight: bold; font-size: 18px;">
            New Booking Request
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #7A9E98; width: 40%; vertical-align: top;">Name</td>
              <td style="padding: 8px 0; color: #E8F4F1; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #7A9E98;">Phone / WhatsApp</td>
              <td style="padding: 8px 0; color: #E8F4F1; font-weight: 600;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #7A9E98;">Device</td>
              <td style="padding: 8px 0; color: #E8F4F1;">${deviceType}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #7A9E98;">Preferred Contact</td>
              <td style="padding: 8px 0; color: #E8F4F1;">${preferredContact}</td>
            </tr>
            ${email ? `<tr>
              <td style="padding: 8px 0; color: #7A9E98;">Email</td>
              <td style="padding: 8px 0; color: #E8F4F1;">${email}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 8px 0; color: #7A9E98; vertical-align: top;">Problem</td>
              <td style="padding: 8px 0; color: #E8F4F1;">${problem}</td>
            </tr>
          </table>
          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.08);">
            <a href="${whatsappUrl}" style="background: #0FEA7A; color: #0A1A18; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">
              Reply via WhatsApp
            </a>
          </div>
          <p style="color: #7A9E98; font-size: 12px; margin-top: 16px;">Submitted: ${new Date().toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' })} SAST</p>
        </div>
      `,
    });
  } catch (emailErr) {
    // Log but don't fail the request — booking still recorded
    console.error('[book] Email send failed:', emailErr);
  }

  return NextResponse.json({ success: true, whatsappUrl }, { status: 200 });
}
