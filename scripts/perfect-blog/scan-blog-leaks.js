#!/usr/bin/env node
// scripts/scan-blog-leaks.js
// Daily blog leak scanner for zasupport.com
//
// Runs nightly at 02:00 SAST via cron. Scans all blog URLs from sitemap.xml,
// strips HTML, runs banned pattern detection, generates JSON report, and
// triggers blog-page-wording-repair for critical findings.
//
// Usage:
//   node scripts/scan-blog-leaks.js                  # Scan all blog URLs
//   node scripts/scan-blog-leaks.js --url <URL>      # Scan single URL
//   node scripts/scan-blog-leaks.js --report-only    # Don't trigger repairs
//
// Exit codes:
//   0 = no issues found
//   2 = critical leaks found (repair triggered)
//   1 = scanner error

const fs = require('fs')
const path = require('path')
const https = require('https')
const { scanText } = require('../config/banned-content-patterns')

const SITEMAP_URL = 'https://www.zasupport.com/sitemap.xml'
const REPORTS_DIR = path.join(__dirname, '..', 'reports')
const USER_AGENT = 'ZASupport-LeakScanner/1.0 (+https://www.zasupport.com)'
const RATE_LIMIT_MS = 500

// ============================================================
// Utilities
// ============================================================

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': USER_AGENT } }, (res) => {
      let data = ''
      res.on('data', chunk => { data += chunk })
      res.on('end', () => resolve({ status: res.statusCode, body: data }))
    }).on('error', reject)
  })
}

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#\d+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function parseSitemapUrls(xml) {
  const urlRegex = /<loc>([^<]+)<\/loc>/g
  const urls = []
  let match
  while ((match = urlRegex.exec(xml)) !== null) {
    urls.push(match[1])
  }
  return urls.filter(url => url.includes('/blog/') && !url.endsWith('/blog'))
}

function ensureReportsDir() {
  if (!fs.existsSync(REPORTS_DIR)) {
    fs.mkdirSync(REPORTS_DIR, { recursive: true })
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// ============================================================
// Core scanner
// ============================================================

async function scanUrl(url) {
  const startTime = Date.now()
  try {
    const { status, body } = await fetchUrl(url)
    if (status !== 200) {
      return { url, status, error: `HTTP ${status}`, findings: [], duration_ms: Date.now() - startTime }
    }
    const text = stripHtml(body)
    const findings = scanText(text)
    return {
      url,
      status,
      textLength: text.length,
      findings,
      duration_ms: Date.now() - startTime,
    }
  } catch (err) {
    return { url, error: err.message, findings: [], duration_ms: Date.now() - startTime }
  }
}

async function scanAllUrls() {
  console.log(`[${new Date().toISOString()}] Starting blog leak scan`)
  console.log(`Fetching sitemap from ${SITEMAP_URL}`)

  const sitemapResponse = await fetchUrl(SITEMAP_URL)
  if (sitemapResponse.status !== 200) {
    throw new Error(`Failed to fetch sitemap: HTTP ${sitemapResponse.status}`)
  }

  const urls = parseSitemapUrls(sitemapResponse.body)
  console.log(`Found ${urls.length} blog URLs to scan`)
  console.log('---')

  const results = []
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i]
    process.stdout.write(`[${i + 1}/${urls.length}] ${url.substring(0, 80)}... `)
    const result = await scanUrl(url)
    results.push(result)

    if (result.error) {
      console.log(`ERROR (${result.error})`)
    } else if (result.findings.length === 0) {
      console.log('OK')
    } else {
      const critical = result.findings.filter(f => f.severity === 'critical').length
      const high = result.findings.filter(f => f.severity === 'high').length
      const medium = result.findings.filter(f => f.severity === 'medium').length
      console.log(`FLAGGED (${critical}C/${high}H/${medium}M)`)
    }

    await sleep(RATE_LIMIT_MS)
  }

  return results
}

// ============================================================
// Reporting
// ============================================================

function generateReport(results) {
  const flagged = results.filter(r => r.findings && r.findings.length > 0)
  const critical = flagged.filter(r => r.findings.some(f => f.severity === 'critical'))
  const errors = results.filter(r => r.error)

  return {
    timestamp: new Date().toISOString(),
    summary: {
      totalScanned: results.length,
      clean: results.length - flagged.length - errors.length,
      flagged: flagged.length,
      critical: critical.length,
      errors: errors.length,
    },
    criticalUrls: critical.map(r => r.url),
    findings: flagged.map(r => ({
      url: r.url,
      issueCount: r.findings.length,
      hasCritical: r.findings.some(f => f.severity === 'critical'),
      issues: r.findings.map(f => ({
        category: f.category,
        severity: f.severity,
        description: f.description,
        match: f.match,
        context: f.context,
      })),
    })),
    errorUrls: errors.map(r => ({ url: r.url, error: r.error })),
  }
}

function saveReport(report) {
  ensureReportsDir()
  const date = report.timestamp.split('T')[0]
  const reportPath = path.join(REPORTS_DIR, `leak-scan-${date}.json`)
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))
  console.log(`\nReport saved: ${reportPath}`)
  return reportPath
}

function printSummary(report) {
  console.log('\n' + '='.repeat(60))
  console.log('LEAK SCAN SUMMARY')
  console.log('='.repeat(60))
  console.log(`Total scanned:   ${report.summary.totalScanned}`)
  console.log(`Clean:           ${report.summary.clean}`)
  console.log(`Flagged:         ${report.summary.flagged}`)
  console.log(`Critical:        ${report.summary.critical}`)
  console.log(`Errors:          ${report.summary.errors}`)
  console.log('='.repeat(60))

  if (report.summary.critical > 0) {
    console.log('\nCRITICAL LEAKS DETECTED:')
    for (const url of report.criticalUrls) {
      console.log(`  ${url}`)
    }
    console.log('\nTriggering blog-page-wording-repair skill...')
  }
}

// ============================================================
// Repair trigger — queues critical leaks for repair AND notifies via email
// ============================================================

async function triggerRepair(criticalUrls, criticalFindings) {
  // Queue file for the repair worker
  const triggerPath = path.join(REPORTS_DIR, 'repair-queue.json')
  const queue = fs.existsSync(triggerPath)
    ? JSON.parse(fs.readFileSync(triggerPath, 'utf-8'))
    : []
  for (const url of criticalUrls) {
    queue.push({ url, queuedAt: new Date().toISOString(), status: 'pending' })
  }
  fs.writeFileSync(triggerPath, JSON.stringify(queue, null, 2))
  console.log(`Queued ${criticalUrls.length} URLs for repair: ${triggerPath}`)

  // Send email notifications via MS Graph
  try {
    const { notifyLeakDetected } = require('./notify-leak-detected')
    for (const finding of criticalFindings) {
      await notifyLeakDetected({
        url: finding.url,
        findings: finding.findings,
        autoFixStatus: 'Queued for blog-page-wording-repair',
      })
      console.log(`  → Notification sent for ${finding.url}`)
    }
  } catch (err) {
    console.error(`  ! Notification failed: ${err.message}`)
    console.error('    (repair queue still populated — repair will proceed)')
  }
}

// ============================================================
// Main
// ============================================================

async function main() {
  const args = process.argv.slice(2)
  const reportOnly = args.includes('--report-only')
  const singleUrlIdx = args.indexOf('--url')
  const singleUrl = singleUrlIdx !== -1 ? args[singleUrlIdx + 1] : null

  try {
    let results
    if (singleUrl) {
      console.log(`Scanning single URL: ${singleUrl}`)
      results = [await scanUrl(singleUrl)]
    } else {
      results = await scanAllUrls()
    }

    const report = generateReport(results)
    saveReport(report)
    printSummary(report)

    if (report.summary.critical > 0 && !reportOnly) {
      const criticalFindings = report.findings.filter((f) => f.hasCritical)
      await triggerRepair(report.criticalUrls, criticalFindings)
      process.exit(2)
    }

    process.exit(0)
  } catch (err) {
    console.error('Scanner failed:', err.message)
    console.error(err.stack)
    process.exit(1)
  }
}

main()
