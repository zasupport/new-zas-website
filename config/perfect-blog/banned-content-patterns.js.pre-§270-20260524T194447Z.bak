// config/banned-content-patterns.js
// Registry of internal authoring labels and meta-commentary that must NEVER
// appear in rendered blog content. Shared by blog-leak-scanner and
// blog-page-wording-repair skills.
//
// LEARNING LOOP: The learnedPatterns category at the bottom of this file
// grows automatically. When blog-page-wording-repair fixes a leak that
// matches a pattern not yet in the registry, the learning-loop.js script
// adds it here so future content can never make the same mistake.
//
// Adding a pattern manually: put it in the appropriate tier above.
// Patterns added by the learning loop: appear in learnedPatterns at the bottom.

const fs = require('fs')
const path = require('path')

const BANNED_PATTERNS = {
  // === TIER 1: INTERNAL EVALUATION LABELS ===
  // These are the highest-severity leaks. They expose Claude's internal
  // reasoning scaffolding and proprietary content evaluation framework.
  // Any one of these on a published page = automatic quarantine.
  evaluationLabels: {
    severity: 'critical',
    patterns: [
      // Exact label matches at start of line/paragraph
      /^\s*LEARNED\s*:/im,
      /^\s*BETTER\s*:/im,
      /^\s*WHY SUCCESS\s*:/im,
      /^\s*WHY SUCCEEDED\s*:/im,
      /^\s*REPLICATE\s*:/im,
      /^\s*WHY THIS WORKS\s*:/im,
      /^\s*KEY INSIGHT\s*:/im,
      /^\s*OBSERVATION\s*:/im,
      /^\s*SCORE\s*:/im,
      /^\s*RUBRIC\s*:/im,
      /^\s*EVALUATION\s*:/im,
      /^\s*CRITIQUE\s*:/im,
      /^\s*SELF-CHECK\s*:/im,
      /^\s*ANALYSIS\s*:/im,
      /^\s*REFLECTION\s*:/im,
      /^\s*MEMO\s*:/im,
      /^\s*INTERNAL\s*:/im,
      /^\s*NOTES TO SELF\s*:/im,
      /^\s*REVIEWER\s*:/im,
      // Bracketed audit markers
      /\[\s*x\s*\][^.\n]*E-E-A-T/i,
      /\[\s*✓\s*\][^.\n]*signals/i,
    ],
    description: 'Internal Claude evaluation/reasoning labels leaking into rendered content',
  },

  // === TIER 2: PROMPT SCAFFOLDING ===
  // Markers that indicate prompt template or system instructions leaked through
  promptScaffolding: {
    severity: 'critical',
    patterns: [
      /\bAs an AI (language )?model\b/i,
      /\bI am Claude\b/i,
      /\bAs Claude\b/i,
      /\bI cannot (and will not|directly)\b/i,
      /\bAs an? (AI assistant|artificial intelligence)\b/i,
      /\bI do not have (access to|the ability)\b/i,
      /\bbased on my training\b/i,
      /\bmy knowledge cutoff\b/i,
      /\bmy training data\b/i,
      /<system>/i,
      /<\/system>/i,
      /<user>/i,
      /<\/user>/i,
      /<assistant>/i,
      /<\/assistant>/i,
      /\bsystem prompt\b/i,
      /\b(this is a|here is a) (draft|response|completion)\b/i,
      /\bcertainly[!,]? (here|i can)\b/i,
      /\bof course[!,]? (here|i)\b/i,
    ],
    description: 'AI/prompt scaffolding text leaking into content',
  },

  // === TIER 3: META-COMMENTARY ===
  // Self-referential text about the writing/generation process
  metaCommentary: {
    severity: 'high',
    patterns: [
      /\b(this|the) (article|post|blog) (will|would|should|aims to)\b/i,
      /\bin this (article|post|blog) (i|we) will\b/i,
      /\b(let me|i'll) (start by|begin by|first)\b/i,
      /\b(by the end of this|after reading this) (article|post)\b/i,
      /\b(word count|character count|reading time)\s*:\s*\d/i,
      /\b(target audience|primary keyword|secondary keyword)\s*:/i,
      /\bSEO score\s*:/i,
      /\bH[1-6] tag\b/i,
      /\bmeta description\s*:/i,
      /\bschema markup\b/i, // valid in technical posts but flag for review
    ],
    description: 'Meta-commentary about content creation process',
  },

  // === TIER 4: PLACEHOLDER / TEMPLATE LEAKS ===
  // Unfilled template variables and placeholder text
  placeholders: {
    severity: 'critical',
    patterns: [
      /\{\{[^}]+\}\}/,                  // {{ variable }}
      /\$\{[^}]+\}/,                    // ${ variable }
      /\[INSERT [A-Z ]+\]/i,            // [INSERT NAME]
      /\[CLIENT NAME\]/i,
      /\[YOUR [A-Z ]+\]/i,
      /\bLorem ipsum\b/i,
      /\bplaceholder text\b/i,
      /\bTODO\s*:/,
      /\bFIXME\s*:/,
      /\bXXX\s*:/,
      /\bTBD\b/,
      /\bTBC\b/,
      /<\?[\s\S]+?\?>/,                 // <? ... ?>
    ],
    description: 'Unfilled template placeholders',
  },

  // === TIER 5: TONE VIOLATIONS ===
  // Per Courtney's preferences — never appear in ZA Support content
  toneViolations: {
    severity: 'medium',
    patterns: [
      /\benterprise[ -]grade\b/i,
      /\bbest[ -]in[ -]class\b/i,
      /\bcutting[ -]edge\b/i,
      /\bgame[ -]changer\b/i,
      /\brevolutionary\b/i,
      /\bworld[ -]class\b/i,
      /\brobust infrastructure\b/i,
      /\bsynergy\b/i,
      /\bleverage\b/i,  // when used as a verb
      /\bunlock the power\b/i,
      /\bin today's fast[ -]paced world\b/i,
    ],
    description: 'Banned tone words per ZA Support brand voice',
  },

  // === TIER 6: GEOGRAPHIC / FORMAT VIOLATIONS ===
  // Wrong location, currency, date format, or regulation references
  contextViolations: {
    severity: 'critical',
    patterns: [
      /\bBenoni\b/,                    // legacy address
      /\bHIPAA\b/,                     // wrong jurisdiction
      /\$[0-9]+/,                      // USD pricing
      /\bUSD\b/,
      /\bUS dollars?\b/i,
      /\b\d{1,2}\/\d{1,2}\/\d{4}\b/,   // MM/DD/YYYY format (loose check)
      /\bLetter (size|paper)\b/i,
    ],
    description: 'Wrong jurisdiction, currency, date format, or legacy address',
  },

  // === TIER 7: CREDENTIAL / SECRET LEAKS ===
  // Passwords, API keys, internal URLs that should never be public
  secrets: {
    severity: 'critical',
    patterns: [
      /\bpassword\s*[:=]\s*\S+/i,
      /\bapi[ _-]?key\s*[:=]\s*\S+/i,
      /\bsecret\s*[:=]\s*\S+/i,
      /\btoken\s*[:=]\s*\S+/i,
      /\bBearer\s+[A-Za-z0-9_-]{20,}/,
      /\bsk-[A-Za-z0-9]{20,}/,         // OpenAI-style keys
      /\bAKIA[0-9A-Z]{16}/,            // AWS access key
      /-----BEGIN [A-Z ]+ KEY-----/,
      /\bwp-admin\b/i,
      /admin@zasupport\.com.*[!@#$%]/,  // leaked password near email
    ],
    description: 'Credentials, API keys, or secrets leaked into content',
  },
}

// ============================================================
// LEARNED PATTERNS — auto-populated by the learning loop
// These are patterns that were detected and fixed in production content.
// Once added here, they prevent the same mistake from ever recurring.
// Managed by scripts/learning-loop.js — do not edit by hand unless removing
// a false positive.
// ============================================================

const LEARNED_PATTERNS_FILE = path.join(__dirname, 'learned-patterns.json')

function loadLearnedPatterns() {
  try {
    if (!fs.existsSync(LEARNED_PATTERNS_FILE)) return []
    const data = JSON.parse(fs.readFileSync(LEARNED_PATTERNS_FILE, 'utf-8'))
    return data.patterns || []
  } catch (err) {
    return []
  }
}

function getLearnedPatterns() {
  const learned = loadLearnedPatterns()
  if (learned.length === 0) return null

  return {
    severity: 'critical',
    patterns: learned.map((p) => new RegExp(p.pattern, p.flags || 'i')),
    description: 'Patterns learned from previous detected leaks',
    learnedEntries: learned, // Full metadata for audit trail
  }
}

/**
 * Scan a string of text for banned patterns.
 * @param {string} text - Text content to scan
 * @returns {Array} Array of findings, each with category, severity, match, position
 */
function scanText(text) {
  const findings = []
  if (!text || typeof text !== 'string') return findings

  // Combine static patterns with learned patterns
  const allCategories = { ...BANNED_PATTERNS }
  const learned = getLearnedPatterns()
  if (learned) {
    allCategories.learnedPatterns = learned
  }

  for (const [category, config] of Object.entries(allCategories)) {
    for (const pattern of config.patterns) {
      let match
      const globalPattern = new RegExp(pattern.source, pattern.flags.includes('g') ? pattern.flags : pattern.flags + 'g')
      while ((match = globalPattern.exec(text)) !== null) {
        findings.push({
          category,
          severity: config.severity,
          description: config.description,
          match: match[0],
          position: match.index,
          context: text.substring(Math.max(0, match.index - 60), Math.min(text.length, match.index + match[0].length + 60)),
        })
        if (!pattern.flags.includes('g')) break
      }
    }
  }

  return findings
}

/**
 * Quick boolean check — does this text contain any critical violations?
 */
function hasCriticalViolation(text) {
  const findings = scanText(text)
  return findings.some(f => f.severity === 'critical')
}

/**
 * Add a new learned pattern to the registry.
 * Called by the learning loop when a new leak type is detected.
 */
function addLearnedPattern({ pattern, flags, description, source, exampleMatch }) {
  const learned = loadLearnedPatterns()

  // Don't add duplicates
  if (learned.some((p) => p.pattern === pattern)) {
    return { added: false, reason: 'already exists' }
  }

  learned.push({
    pattern,
    flags: flags || 'i',
    description,
    source,
    exampleMatch,
    addedAt: new Date().toISOString(),
  })

  fs.writeFileSync(
    LEARNED_PATTERNS_FILE,
    JSON.stringify({ patterns: learned, lastUpdated: new Date().toISOString() }, null, 2)
  )

  return { added: true, total: learned.length }
}

module.exports = {
  BANNED_PATTERNS,
  scanText,
  hasCriticalViolation,
  addLearnedPattern,
  loadLearnedPatterns,
}
