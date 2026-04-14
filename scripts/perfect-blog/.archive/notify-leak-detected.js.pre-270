// scripts/notify-leak-detected.js
// Sends email notifications when blog leaks are detected and repaired
// Uses MS Graph API (Courtney's existing email infrastructure)
//
// Triggered by:
// - blog-leak-scanner when critical leaks found
// - blog-page-wording-repair when a repair completes (or fails)
//
// Uses MS_GRAPH_REFRESH_TOKEN from environment (per existing infrastructure)
//
// Notification recipients: admin@zasupport.com (Courtney + Mary)

const https = require('https')

const NOTIFY_RECIPIENTS = ['admin@zasupport.com']
const FROM_ADDRESS = 'admin@zasupport.com'

/**
 * Get a fresh access token from MS Graph using the refresh token.
 */
async function getAccessToken() {
  const refreshToken = process.env.MS_GRAPH_REFRESH_TOKEN
  if (!refreshToken) {
    throw new Error('MS_GRAPH_REFRESH_TOKEN not set in environment. Check ~/.za-keys-pending.env')
  }

  const tenantId = process.env.MS_GRAPH_TENANT_ID
  const clientId = process.env.MS_GRAPH_CLIENT_ID
  const clientSecret = process.env.MS_GRAPH_CLIENT_SECRET

  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
    scope: 'https://graph.microsoft.com/.default',
  })

  return new Promise((resolve, reject) => {
    const req = https.request(
      `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
      (res) => {
        let data = ''
        res.on('data', (chunk) => { data += chunk })
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data)
            if (parsed.access_token) {
              resolve(parsed.access_token)
            } else {
              reject(new Error(`Token refresh failed: ${data}`))
            }
          } catch (err) {
            reject(err)
          }
        })
      }
    )
    req.on('error', reject)
    req.write(params.toString())
    req.end()
  })
}

/**
 * Send an email via MS Graph API.
 */
async function sendEmail({ to, subject, htmlBody }) {
  const token = await getAccessToken()

  const payload = {
    message: {
      subject,
      body: {
        contentType: 'HTML',
        content: htmlBody,
      },
      toRecipients: to.map((address) => ({
        emailAddress: { address },
      })),
    },
    saveToSentItems: true,
  }

  return new Promise((resolve, reject) => {
    const req = https.request(
      `https://graph.microsoft.com/v1.0/users/${FROM_ADDRESS}/sendMail`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
      (res) => {
        let data = ''
        res.on('data', (chunk) => { data += chunk })
        res.on('end', () => {
          if (res.statusCode === 202) {
            resolve({ success: true })
          } else {
            reject(new Error(`Email send failed (${res.statusCode}): ${data}`))
          }
        })
      }
    )
    req.on('error', reject)
    req.write(JSON.stringify(payload))
    req.end()
  })
}

/**
 * Build an HTML notification for a leak detection event.
 */
function buildLeakDetectedEmail({ url, findings, autoFixStatus }) {
  const critical = findings.filter((f) => f.severity === 'critical')
  const findingsList = critical
    .map(
      (f) => `
        <li style="margin-bottom: 12px;">
          <strong style="color: #c0392b;">${f.category}</strong> — found "${f.match}"<br>
          <code style="background: #f4f4f4; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${f.context}</code>
        </li>`
    )
    .join('')

  return `
    <!DOCTYPE html>
    <html>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 640px; margin: 0 auto; padding: 24px; color: #333;">
      <h2 style="color: #c0392b; border-bottom: 2px solid #c0392b; padding-bottom: 8px;">Blog Leak Detected</h2>

      <p>The blog leak scanner has detected ${critical.length} critical content leak(s) on a published page.</p>

      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <tr>
          <td style="padding: 8px; background: #f4f4f4; font-weight: 600;">Page URL</td>
          <td style="padding: 8px;"><a href="${url}">${url}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px; background: #f4f4f4; font-weight: 600;">Detected at</td>
          <td style="padding: 8px;">${new Date().toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' })} SAST</td>
        </tr>
        <tr>
          <td style="padding: 8px; background: #f4f4f4; font-weight: 600;">Auto-fix status</td>
          <td style="padding: 8px;">${autoFixStatus}</td>
        </tr>
      </table>

      <h3>Findings</h3>
      <ul>${findingsList}</ul>

      <hr style="margin: 24px 0; border: none; border-top: 1px solid #e0e0e0;">

      <p style="font-size: 12px; color: #888;">
        This notification was generated by the blog-leak-scanner skill running on zasupport.com.<br>
        To adjust which patterns trigger alerts, edit <code>config/banned-content-patterns.js</code>.
      </p>
    </body>
    </html>
  `
}

/**
 * Build an HTML notification for a successful repair.
 */
function buildRepairCompletedEmail({ url, findingsFixed, blocksModified, before, after }) {
  return `
    <!DOCTYPE html>
    <html>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 640px; margin: 0 auto; padding: 24px; color: #333;">
      <h2 style="color: #27ae60; border-bottom: 2px solid #27ae60; padding-bottom: 8px;">Blog Leak Auto-Repaired</h2>

      <p>The blog-page-wording-repair skill has automatically fixed ${findingsFixed} leak(s) on a published page.</p>

      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <tr>
          <td style="padding: 8px; background: #f4f4f4; font-weight: 600;">Page URL</td>
          <td style="padding: 8px;"><a href="${url}">${url}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px; background: #f4f4f4; font-weight: 600;">Fixed at</td>
          <td style="padding: 8px;">${new Date().toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' })} SAST</td>
        </tr>
        <tr>
          <td style="padding: 8px; background: #f4f4f4; font-weight: 600;">Blocks modified</td>
          <td style="padding: 8px;">${blocksModified}</td>
        </tr>
      </table>

      <h3>Before</h3>
      <pre style="background: #fef5f5; padding: 12px; border-left: 4px solid #c0392b; overflow-x: auto; font-size: 12px;">${before}</pre>

      <h3>After</h3>
      <pre style="background: #f0faf0; padding: 12px; border-left: 4px solid #27ae60; overflow-x: auto; font-size: 12px;">${after}</pre>

      <hr style="margin: 24px 0; border: none; border-top: 1px solid #e0e0e0;">

      <p style="font-size: 12px; color: #888;">
        Review the live page at <a href="${url}">${url}</a> to confirm the repair looks correct.<br>
        If the auto-fix made an incorrect change, you can roll back via Sanity Studio's revision history.
      </p>
    </body>
    </html>
  `
}

/**
 * Public API: notify on leak detection.
 */
async function notifyLeakDetected({ url, findings, autoFixStatus = 'Queued' }) {
  const subject = `[ZA Support] Blog leak detected: ${new URL(url).pathname}`
  const htmlBody = buildLeakDetectedEmail({ url, findings, autoFixStatus })
  return sendEmail({ to: NOTIFY_RECIPIENTS, subject, htmlBody })
}

/**
 * Public API: notify on repair completion.
 */
async function notifyRepairCompleted({ url, findingsFixed, blocksModified, before, after }) {
  const subject = `[ZA Support] Blog leak auto-repaired: ${new URL(url).pathname}`
  const htmlBody = buildRepairCompletedEmail({ url, findingsFixed, blocksModified, before, after })
  return sendEmail({ to: NOTIFY_RECIPIENTS, subject, htmlBody })
}

module.exports = {
  notifyLeakDetected,
  notifyRepairCompleted,
  sendEmail,
}

// CLI mode for testing
if (require.main === module) {
  const action = process.argv[2]
  if (action === 'test') {
    notifyLeakDetected({
      url: 'https://www.zasupport.com/blog/test-post',
      findings: [
        {
          category: 'evaluationLabels',
          severity: 'critical',
          match: 'LEARNED:',
          context: 'workshop patterns. LEARNED: M3 Air thermal architecture requires...',
        },
      ],
      autoFixStatus: 'Queued (test)',
    })
      .then(() => console.log('Test email sent'))
      .catch((err) => console.error('Test failed:', err.message))
  } else {
    console.log('Usage: node notify-leak-detected.js test')
  }
}
