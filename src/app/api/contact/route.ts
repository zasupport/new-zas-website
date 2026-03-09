import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, device, issue, urgency } = body;

    if (!name || !email || !issue) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const urgencyLabels: Record<string, string> = {
      low: 'Not urgent',
      medium: 'This week',
      high: 'Urgent',
      emergency: 'Emergency',
    };

    // Send notification to admin
    await resend.emails.send({
      from: 'ZA Support Website <admin@zasupport.com>',
      to: ['admin@zasupport.com'],
      subject: `[${urgencyLabels[urgency] || urgency}] New Enquiry — ${device || 'Unknown device'} — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0FEA7A; border-bottom: 2px solid #0FEA7A; padding-bottom: 8px;">New Website Enquiry</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666; width: 140px;"><strong>Name:</strong></td><td style="padding: 8px 0;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Phone:</strong></td><td style="padding: 8px 0;">${phone || 'Not provided'}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Device:</strong></td><td style="padding: 8px 0;">${device || 'Not specified'}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Urgency:</strong></td><td style="padding: 8px 0; color: ${urgency === 'emergency' ? 'red' : 'inherit'};">${urgencyLabels[urgency] || urgency}</td></tr>
          </table>
          <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; margin-top: 16px;">
            <strong>Issue:</strong><br/>
            <p style="white-space: pre-wrap; margin: 8px 0 0;">${issue}</p>
          </div>
        </div>
      `,
    });

    // Send auto-reply to client
    await resend.emails.send({
      from: 'ZA Support <admin@zasupport.com>',
      to: [email],
      subject: 'Your ZA Support Enquiry — We\'ll Be in Touch',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0FEA7A;">Thank you, ${name}.</h2>
          <p>We have received your enquiry and will get back to you within 1 hour during business hours.</p>
          <p>If your issue is urgent, please call us directly:</p>
          <p style="font-size: 20px; font-weight: bold; color: #27504D;">064 529 5863</p>
          <hr style="border: 1px solid #eee; margin: 24px 0;" />
          <p><strong>Your enquiry:</strong></p>
          <p>${issue}</p>
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
