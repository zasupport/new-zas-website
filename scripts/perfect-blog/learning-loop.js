#!/usr/bin/env node
// scripts/learning-loop.js
// The learning loop — turns every leak detection into a permanent prevention.
//
// HOW IT WORKS:
// 1. Reads all leak scan reports from /reports/leak-scan-*.json
// 2. For every detected leak, checks if the EXACT pattern is already in the registry
// 3. If not, extracts a generalised pattern and adds it to learned-patterns.json
// 4. Generates a learning report showing what was learned
// 5. Notifies Courtney with the new patterns added
//
// The next time the scanner runs, it will catch any new variant of the same
// leak type — because the pattern is now permanent.
//
// Runs daily after the leak scanner completes:
//   0 3 * * * cd /var/www/zasupport && node scripts/learning-loop.js
//
// Or on-demand:
//   node scripts/learning-loop.js              # Process all reports
//   node scripts/learning-loop.js --since 7    # Last 7 days only
//   node scripts/learning-loop.js --dry-run    # Show what would be learned, don't write

const fs = require('fs')
const path = require('path')
const { addLearnedPattern, loadLearnedPatterns, scanText } = require('../config/banned-content-patterns')

const REPORTS_DIR = path.join(__dirname, '..', 'reports')
const LEARNING_LOG = path.join(REPORTS_DIR, 'learning-log.json')

// ============================================================
// Pattern generalisation
// ============================================================

/**
 * Takes a specific matched string and converts it into a generalised pattern
 * that will catch variants of the same leak type.
 *
 * Examples:
 *   "LEARNED:" → /^\s*LEARNED\s*:/im (already covered)
 *   "OBSERVATION 1:" → /^\s*OBSERVATION\s*\d*\s*:/im
 *   "SCORE: 8/10" → /^\s*SCORE\s*:\s*\d+/im
 *   "[CHECK] schema valid" → /\[\s*CHECK\s*\]/i
 *   "Note to self:" → /^\s*Note to self\s*:/im
 */
function generalisePattern(matchedText, context) {
  const trimmed = matchedText.trim()

  // Detect ALL CAPS labels with optional number and colon — "INSIGHT 1:", "VERDICT:", "SCORE 8:"
  const capsWithNumberMatch = trimmed.match(/^([A-Z][A-Z\s]+?)(\s+\d+)?\s*:?$/)
  if (capsWithNumberMatch) {
    const label = capsWithNumberMatch[1].trim()
    return {
      pattern: `^\\s*${escapeRegex(label)}(\\s+\\d+)?\\s*:`,
      flags: 'im',
      type: 'caps_label_optional_number',
    }
  }

  // Detect bracketed audit markers like [x], [✓], [CHECK]
  if (/^\[[^\]]+\]/i.test(trimmed)) {
    const bracketMatch = trimmed.match(/^\[([^\]]+)\]/)
    if (bracketMatch) {
      return {
        pattern: `\\[\\s*${escapeRegex(bracketMatch[1].trim())}\\s*\\]`,
        flags: 'i',
        type: 'bracket_marker',
      }
    }
  }

  // Detect "Title Case Label:" patterns
  if (/^[A-Z][a-z]+(\s[A-Z][a-z]+)*\s*:/.test(trimmed)) {
    const label = trimmed.replace(/:.*$/, '').trim()
    return {
      pattern: `^\\s*${escapeRegex(label)}\\s*:`,
      flags: 'im',
      type: 'title_case_label',
    }
  }

  // Detect score-like patterns "X/Y" or "X out of Y"
  if (/\d+\s*[\/]\s*\d+/.test(trimmed) || /\d+\s*out of\s*\d+/i.test(trimmed)) {
    return {
      pattern: `\\b(score|rating|grade)\\s*:?\\s*\\d+\\s*[\\/out]+\\s*\\d+`,
      flags: 'i',
      type: 'score_value',
    }
  }

  // Default: escape and use as-is, but make whitespace flexible
  return {
    pattern: escapeRegex(trimmed).replace(/\\\s/g, '\\s+'),
    flags: 'i',
    type: 'literal',
  }
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// ============================================================
// Report processing
// ============================================================

function loadAllReports(sinceDays = null) {
  if (!fs.existsSync(REPORTS_DIR)) return []

  const files = fs.readdirSync(REPORTS_DIR).filter((f) => f.startsWith('leak-scan-') && f.endsWith('.json'))
  const cutoff = sinceDays ? Date.now() - sinceDays * 86400000 : 0

  const reports = []
  for (const file of files) {
    const filePath = path.join(REPORTS_DIR, file)
    const stat = fs.statSync(filePath)
    if (stat.mtimeMs < cutoff) continue

    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
      reports.push({ file, data })
    } catch (err) {
      console.warn(`Failed to parse ${file}: ${err.message}`)
    }
  }

  return reports
}

function extractAllFindings(reports) {
  const findings = []
  for (const { file, data } of reports) {
    if (!data.findings) continue
    for (const result of data.findings) {
      for (const issue of result.issues || []) {
        findings.push({
          ...issue,
          url: result.url,
          source: file,
        })
      }
    }
  }
  return findings
}

// ============================================================
// Learning loop
// ============================================================

function runLearningLoop(options = {}) {
  const { sinceDays = null, dryRun = false } = options

  console.log(`[${new Date().toISOString()}] Running learning loop`)
  if (dryRun) console.log('  (DRY RUN — no patterns will be added)')

  const reports = loadAllReports(sinceDays)
  console.log(`  Found ${reports.length} scan reports`)

  const findings = extractAllFindings(reports)
  console.log(`  Total findings to process: ${findings.length}`)

  const existingLearned = loadLearnedPatterns()
  console.log(`  Existing learned patterns: ${existingLearned.length}`)

  // Group findings by their generalised pattern
  const patternMap = new Map()
  for (const finding of findings) {
    const generalised = generalisePattern(finding.match, finding.context)
    const key = generalised.pattern

    if (!patternMap.has(key)) {
      patternMap.set(key, {
        ...generalised,
        examples: [],
        urls: new Set(),
        firstSeen: finding.source,
        category: finding.category,
      })
    }

    const entry = patternMap.get(key)
    entry.examples.push(finding.match)
    entry.urls.add(finding.url)
  }

  // Filter to patterns that aren't already in the registry
  const newPatterns = []
  for (const [patternKey, entry] of patternMap) {
    // Test if any existing static pattern would already catch this
    const testText = entry.examples[0]
    const existingFindings = scanText(testText)
    const alreadyCaught = existingFindings.some((f) => f.category !== 'learnedPatterns')

    if (!alreadyCaught) {
      newPatterns.push({
        pattern: patternKey,
        flags: entry.flags,
        type: entry.type,
        examples: [...new Set(entry.examples)].slice(0, 5),
        affectedUrls: [...entry.urls],
        firstSeenIn: entry.firstSeen,
        originalCategory: entry.category,
      })
    }
  }

  console.log(`  New patterns to learn: ${newPatterns.length}`)

  if (newPatterns.length === 0) {
    console.log('  Nothing new to learn. System is up to date.')
    return { learned: 0, patterns: [] }
  }

  // Add to registry
  const added = []
  for (const newPattern of newPatterns) {
    if (dryRun) {
      console.log(`  WOULD LEARN: ${newPattern.pattern} (from "${newPattern.examples[0]}")`)
      added.push(newPattern)
      continue
    }

    const result = addLearnedPattern({
      pattern: newPattern.pattern,
      flags: newPattern.flags,
      description: `Learned from ${newPattern.affectedUrls.length} affected URL(s) on ${new Date().toISOString().split('T')[0]} — type: ${newPattern.type}`,
      source: newPattern.firstSeenIn,
      exampleMatch: newPattern.examples[0],
    })

    if (result.added) {
      console.log(`  ✓ LEARNED: ${newPattern.pattern}`)
      console.log(`    Example: "${newPattern.examples[0]}"`)
      console.log(`    Type: ${newPattern.type}`)
      console.log(`    Affected URLs: ${newPattern.affectedUrls.length}`)
      added.push(newPattern)
    }
  }

  // Write learning log
  if (!dryRun && added.length > 0) {
    const log = fs.existsSync(LEARNING_LOG) ? JSON.parse(fs.readFileSync(LEARNING_LOG, 'utf-8')) : { entries: [] }
    log.entries.push({
      timestamp: new Date().toISOString(),
      patternsLearned: added.length,
      patterns: added,
    })
    fs.writeFileSync(LEARNING_LOG, JSON.stringify(log, null, 2))
    console.log(`  Learning log updated: ${LEARNING_LOG}`)
  }

  return { learned: added.length, patterns: added }
}

// ============================================================
// CLI
// ============================================================

if (require.main === module) {
  const args = process.argv.slice(2)
  const dryRun = args.includes('--dry-run')
  const sinceIdx = args.indexOf('--since')
  const sinceDays = sinceIdx !== -1 ? parseInt(args[sinceIdx + 1], 10) : null

  try {
    const result = runLearningLoop({ sinceDays, dryRun })
    console.log(`\nLearning loop complete. ${result.learned} new patterns added.`)

    // Notify if any patterns were learned (and not a dry run)
    if (result.learned > 0 && !dryRun) {
      try {
        const { sendEmail } = require('./notify-leak-detected')
        const html = `
          <h2>Learning Loop: ${result.learned} new pattern(s) added</h2>
          <p>The blog content sanitisation system has learned ${result.learned} new pattern(s) from recent leak detections. These patterns will now prevent similar mistakes from ever occurring again.</p>
          <ul>
            ${result.patterns.map((p) => `<li><code>${p.pattern}</code> — example: "${p.examples[0]}"</li>`).join('')}
          </ul>
          <p>The system is now smarter than it was yesterday. Content publishing continues at full velocity.</p>
        `
        sendEmail({
          to: ['admin@zasupport.com'],
          subject: `[ZA Support] Learning loop: ${result.learned} new patterns learned`,
          htmlBody: html,
        }).catch((err) => console.warn('Notification failed:', err.message))
      } catch (err) {
        // Notification module not available — that's OK
      }
    }

    process.exit(0)
  } catch (err) {
    console.error('Learning loop failed:', err)
    process.exit(1)
  }
}

module.exports = { runLearningLoop, generalisePattern }
