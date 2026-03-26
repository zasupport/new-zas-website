import { Resend } from 'resend';
import type { SlaClient } from '@/types/sla';

const resend = new Resend(process.env.RESEND_API_KEY!);

const FROM_ADDRESS = 'ZA Support <admin@zasupport.com>';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'admin@zasupport.com';
const MARY_EMAIL = 'mary@zasupport.com';
const BACKEND_URL = process.env.BACKEND_API_URL ?? 'https://api.zasupport.com';

/** Format cents as a ZAR string, e.g. 549900 → "R5,499.00" */
function formatRands(cents: number): string {
  const rands = cents / 100;
  return `R${rands.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/** Format a date string to DD/MM/YYYY */
function formatDate(iso: string): string {
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

/** Shared dark-themed email wrapper */
function wrapEmail(bodyHtml: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ZA Support</title>
</head>
<body style="margin:0;padding:0;background-color:#0A1A18;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#D4E8E5;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#0A1A18;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width:600px;background-color:#0F2420;border-radius:12px;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background-color:#0FEA7A;padding:24px 32px;">
              <span style="font-size:22px;font-weight:700;color:#0A1A18;letter-spacing:-0.5px;">ZA Support</span>
              <span style="font-size:13px;color:#0A1A18;margin-left:12px;opacity:0.7;">Practice IT. Perfected.</span>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              ${bodyHtml}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px;border-top:1px solid #1B3330;text-align:center;">
              <p style="margin:0;font-size:12px;color:#4A7A72;">ZA Support (Vizibiliti IS) &bull; 1 Hyde Park Lane, Hyde Park, Johannesburg 2196</p>
              <p style="margin:6px 0 0;font-size:12px;color:#4A7A72;">064 529 5863 &bull; admin@zasupport.com &bull; VAT 436-026-0014</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Send admin approval email with attached PDF contract.
 */
export async function sendAdminApprovalEmail(client: SlaClient, pdfBase64: string): Promise<void> {
  const approveUrl = `${BACKEND_URL}/api/v1/sla/approve/${client.approval_token}`;
  const holdUrl = `${BACKEND_URL}/api/v1/sla/hold/${client.approval_token}`;

  const bodyHtml = `
    <h2 style="margin:0 0 8px;font-size:20px;font-weight:700;color:#0FEA7A;">SLA Approval Required</h2>
    <p style="margin:0 0 24px;font-size:14px;color:#A0C4BE;">A new SLA application is ready for review.</p>

    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#0A1A18;border-radius:8px;overflow:hidden;margin-bottom:28px;">
      <tr><td style="padding:20px 24px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
          ${row('Practice', client.practice_name)}
          ${row('Contact', client.contact_name)}
          ${row('Email', client.email)}
          ${row('Phone', client.phone)}
          ${row('Package', client.package_label)}
          ${row('Doctors', String(client.doctor_count))}
          ${row('Monthly Total', formatRands(client.total_monthly))}
          ${row('Base Fee', formatRands(client.base_fee))}
          ${row('VAT (15%)', formatRands(client.vat_amount))}
          ${row('Processing Fee', formatRands(client.processing_fee))}
          ${row('Contract Ref', client.contract_ref ?? '—')}
          ${row('Applied', formatDate(client.created_at))}
          ${client.address ? row('Address', client.address) : ''}
        </table>
      </td></tr>
    </table>

    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
      <tr>
        <td style="padding-right:12px;">
          <a href="${approveUrl}" style="display:inline-block;background-color:#0FEA7A;color:#0A1A18;font-weight:700;font-size:14px;text-decoration:none;padding:12px 28px;border-radius:6px;">Approve SLA</a>
        </td>
        <td>
          <a href="${holdUrl}" style="display:inline-block;background-color:#1B3330;color:#D4E8E5;font-weight:600;font-size:14px;text-decoration:none;padding:12px 28px;border-radius:6px;border:1px solid #2A4A45;">Place on Hold</a>
        </td>
      </tr>
    </table>

    <p style="margin:24px 0 0;font-size:12px;color:#4A7A72;">Contract PDF is attached. Approve or hold within 24 hours.</p>
  `;

  await resend.emails.send({
    from: FROM_ADDRESS,
    to: [ADMIN_EMAIL],
    subject: `SLA Approval Required — ${client.practice_name}`,
    html: wrapEmail(bodyHtml),
    attachments: [
      {
        filename: `SLA-Contract-${client.contract_ref ?? client.client_id}.pdf`,
        content: pdfBase64,
      },
    ],
  });
}

/**
 * Send the signed contract to the client with PDF attached.
 */
export async function sendClientContractEmail(client: SlaClient, pdfBase64: string): Promise<void> {
  const bodyHtml = `
    <h2 style="margin:0 0 8px;font-size:20px;font-weight:700;color:#0FEA7A;">Welcome to ZA Support, ${client.contact_name.split(' ')[0]}.</h2>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#D4E8E5;">
      Thank you for signing up for ZA Support's Managed IT Service Level Agreement.
      We are genuinely glad to have ${client.practice_name} on board.
    </p>

    <h3 style="margin:0 0 12px;font-size:15px;font-weight:700;color:#0FEA7A;">What happens next</h3>
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:28px;">
      ${step('1', 'Health Check System activation', 'Our team will activate your practice\'s Health Check monitoring within 1 business day.')}
      ${step('2', 'First report', 'You will receive your first device health report within 7 days of activation.')}
      ${step('3', 'Monthly billing', `Your first invoice will be issued on the 25th of this month for ${formatRands(client.total_monthly)} per month (VAT inclusive).`)}
      ${step('4', 'Direct line of support', 'From today, reach us any time on 064 529 5863 — priority response for SLA clients.')}
    </table>

    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#0A1A18;border-radius:8px;margin-bottom:28px;">
      <tr><td style="padding:20px 24px;">
        ${row('Package', client.package_label)}
        ${row('Monthly Amount', formatRands(client.total_monthly))}
        ${row('Billing Date', '25th of each month')}
        ${row('Contract Reference', client.contract_ref ?? '—')}
      </td></tr>
    </table>

    <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#A0C4BE;">
      Your signed SLA contract is attached to this email for your records. Please keep a copy in a safe place.
    </p>

    <p style="margin:0;font-size:14px;line-height:1.6;color:#D4E8E5;">
      Kind regards,<br />
      <strong>Courtney Bentley</strong><br />
      ZA Support (Medical IT Specialist)<br />
      064 529 5863
    </p>
  `;

  await resend.emails.send({
    from: FROM_ADDRESS,
    to: [client.email],
    bcc: [ADMIN_EMAIL],
    subject: 'ZA Support — Your Service Level Agreement',
    html: wrapEmail(bodyHtml),
    attachments: [
      {
        filename: `SLA-Contract-${client.contract_ref ?? client.client_id}.pdf`,
        content: pdfBase64,
      },
    ],
  });
}

/**
 * Notify Mary to activate the HCS software for a newly approved client.
 */
export async function sendMaryHCSEmail(client: SlaClient): Promise<void> {
  const totalRands = formatRands(client.total_monthly);

  const text = `Hi Mary,

A new SLA client has been approved and requires Health Check System (HCS) software activation.

Practice Details:
- Practice Name: ${client.practice_name}
- Contact: ${client.contact_name}
- Email: ${client.email}
- Phone: ${client.phone}
- Package: ${client.package_label} (${client.doctor_count} doctor${client.doctor_count > 1 ? 's' : ''})
- Monthly Amount: ${totalRands}
- Contract Reference: ${client.contract_ref ?? '—'}
${client.address ? `- Address: ${client.address}` : ''}

Action Required:
1. Log in to the HCS admin portal.
2. Create a new client profile for ${client.practice_name}.
3. Activate the Health Check monitoring package: ${client.package_label}.
4. Set the billing reference to: ${client.contract_ref ?? client.client_id}.
5. Send the client a welcome WhatsApp message on ${client.phone} to introduce yourself and confirm activation.
6. Reply to this email once activation is complete.

Please complete this within 1 business day. If you have any questions, call Courtney on 079 053 9964.

Kind regards,
Courtney
ZA Support
064 529 5863`;

  await resend.emails.send({
    from: FROM_ADDRESS,
    to: [MARY_EMAIL],
    subject: `New SLA Client — HCS Software Activation Required — ${client.practice_name}`,
    text,
  });
}

// ── Helpers ────────────────────────────────────────────────────────────────

function row(label: string, value: string): string {
  if (!value || value === '—') return '';
  return `
    <tr>
      <td style="padding:6px 0;font-size:13px;color:#4A7A72;width:140px;vertical-align:top;">${label}</td>
      <td style="padding:6px 0 6px 12px;font-size:13px;color:#D4E8E5;font-weight:500;">${value}</td>
    </tr>`;
}

function step(num: string, title: string, desc: string): string {
  return `
    <tr>
      <td style="padding:10px 0;vertical-align:top;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr>
            <td style="width:32px;vertical-align:top;">
              <span style="display:inline-block;width:24px;height:24px;background-color:#0FEA7A;border-radius:50%;text-align:center;line-height:24px;font-size:12px;font-weight:700;color:#0A1A18;">${num}</span>
            </td>
            <td style="padding-left:12px;vertical-align:top;">
              <p style="margin:0 0 2px;font-size:14px;font-weight:700;color:#D4E8E5;">${title}</p>
              <p style="margin:0;font-size:13px;color:#A0C4BE;line-height:1.5;">${desc}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
}
