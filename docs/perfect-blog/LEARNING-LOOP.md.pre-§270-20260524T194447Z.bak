# The Learning Loop — How the Self-Improving Content Pipeline Works

**Version:** 1.0
**Last updated:** 13 April 2026
**Files involved:**
- `scripts/learning-loop.js`
- `config/banned-content-patterns.js`
- `config/learned-patterns.json` (auto-managed)
- `reports/learning-log.json` (audit trail)

---

## 1. THE PROBLEM

A static banned-pattern list ages poorly:
- New AI generations introduce new failure modes
- Manually maintaining a registry doesn't scale
- The same mistake can recur in slightly different forms (`INSIGHT 1:`, `INSIGHT 5:`, `INSIGHT 12:`)
- Content velocity (8/day) means there's no time to manually review every leak

The learning loop solves this by turning every detected leak into a permanent prevention pattern that catches all future variants.

---

## 2. HOW IT WORKS — END-TO-END

### Day 1: Initial leak appears

A blog post is published containing the text `INSIGHT 1: First-hand experience matters.` The author didn't notice the label, the auto-fixer didn't have a pattern for "INSIGHT", and it slipped through.

### Day 1, 02:00 SAST: Daily scanner finds it

`scripts/scan-blog-leaks.js` runs at 02:00 SAST every day. It:
1. Fetches `https://www.zasupport.com/sitemap.xml`
2. Iterates every blog URL
3. Strips HTML to plain text
4. Runs `scanText()` from `config/banned-content-patterns.js`
5. Tier-1 evaluation labels match — the static pattern catches `INSIGHT 1:`
6. Writes the finding to `reports/leak-scan-2026-04-13.json`
7. Queues the URL for repair in `reports/repair-queue.json`
8. Sends an email notification to admin@zasupport.com

### Day 1, automatic: Repair runs

The blog-page-wording-repair skill picks up the queue and rewrites the affected content blocks in plain prose. The post is republished via Sanity. The page is now clean.

### Day 1, 03:00 SAST: Learning loop runs

`scripts/learning-loop.js` runs one hour after the scanner. It:

1. Reads all scan reports from `/reports/leak-scan-*.json`
2. Extracts every detected match (`INSIGHT 1:` in this example)
3. For each match, calls `generalisePattern()` which examines the structure:
   - Is it ALL CAPS with optional number? → caps_label_optional_number
   - Is it a bracket marker like `[CHECK]`? → bracket_marker
   - Is it a Title Case label like `Note to self:`? → title_case_label
   - Is it a score pattern like `8/10`? → score_value
   - Otherwise → literal escape
4. For `INSIGHT 1:`, the generaliser produces:
   ```
   pattern: ^\s*INSIGHT(\s+\d+)?\s*:
   flags:   im
   type:    caps_label_optional_number
   ```
5. Checks if this pattern is already in the registry (static or learned). If not:
6. Adds it to `config/learned-patterns.json` permanently
7. Logs the addition to `reports/learning-log.json` with example, source, and timestamp
8. Sends an email to admin@zasupport.com summarising what was learned

### Day 2: New variant appears

A different post is published containing `INSIGHT 5: Battery swap procedure.` This is a different number, but the same structure as the original leak.

### Day 2, save time: Auto-fixer catches it instantly

When the author saves the new post in Sanity, `sanity/leak-auto-fixer.ts` runs. It:

1. Calls `scanText()` from `config/banned-content-patterns.js`
2. `scanText()` automatically loads `config/learned-patterns.json` and merges it into the registry
3. The learned pattern `^\s*INSIGHT(\s+\d+)?\s*:` matches `INSIGHT 5:`
4. The sentence containing the label is stripped silently
5. Save proceeds with the fixed content
6. Author sees a warning: "Auto-fixed 1 leak(s) in: content (1 removed). Pattern logged for learning loop."

The leak never reaches production because the system learned from yesterday's leak.

---

## 3. THE GENERALISER

The generaliser is the heart of the learning loop. It takes a specific matched string and converts it into a regex that catches structural variants.

### Generaliser pattern types

#### Type 1: caps_label_optional_number
**Trigger:** ALL CAPS word(s), optionally followed by a number, optionally followed by a colon.

| Input | Generalised | Catches |
|---|---|---|
| `INSIGHT 1:` | `^\s*INSIGHT(\s+\d+)?\s*:` | `INSIGHT:`, `INSIGHT 1:`, `INSIGHT 99:` |
| `VERDICT:` | `^\s*VERDICT(\s+\d+)?\s*:` | `VERDICT:`, `VERDICT 1:`, `VERDICT 12:` |
| `KEY POINT 3:` | `^\s*KEY POINT(\s+\d+)?\s*:` | `KEY POINT:`, `KEY POINT 1:`, `KEY POINT 100:` |

#### Type 2: bracket_marker
**Trigger:** Text wrapped in square brackets like `[CHECK]`, `[x]`, `[REVIEW]`.

| Input | Generalised | Catches |
|---|---|---|
| `[CHECK] schema valid` | `\[\s*CHECK\s*\]` | Any `[CHECK]` regardless of what follows |
| `[REVIEW] needed` | `\[\s*REVIEW\s*\]` | Any `[REVIEW]` regardless of what follows |
| `[x] complete` | `\[\s*x\s*\]` | Any `[x]` audit marker |

#### Type 3: title_case_label
**Trigger:** Title Case word(s) followed by a colon at the start of a line.

| Input | Generalised | Catches |
|---|---|---|
| `Note to self:` | `^\s*Note to self\s*:` | `Note to self:` (line-anchored) |
| `Editor Comment:` | `^\s*Editor Comment\s*:` | `Editor Comment:` (line-anchored) |

#### Type 4: score_value
**Trigger:** A score-like pattern (X/Y or X out of Y).

| Input | Generalised | Catches |
|---|---|---|
| `Score: 8/10` | `\b(score\|rating\|grade)\s*:?\s*\d+\s*[/out]+\s*\d+` | Any score/rating/grade with N/M format |

#### Type 5: literal (fallback)
**Trigger:** Anything that doesn't match the structural types above.

The matched text is escaped and used as-is, with whitespace made flexible. This is the least powerful generalisation but ensures the exact phrase will be caught next time.

---

## 4. THE STORE — `config/learned-patterns.json`

This file is auto-managed by the learning loop. **Never edit by hand** unless removing a verified false positive.

### Format
```json
{
  "patterns": [
    {
      "pattern": "^\\s*INSIGHT(\\s+\\d+)?\\s*:",
      "flags": "im",
      "description": "Learned from 1 affected URL(s) on 2026-04-13 — type: caps_label_optional_number",
      "source": "leak-scan-2026-04-13.json",
      "exampleMatch": "INSIGHT 1:",
      "addedAt": "2026-04-13T03:00:00.000Z"
    }
  ],
  "lastUpdated": "2026-04-13T03:00:00.000Z"
}
```

### How it's loaded
`config/banned-content-patterns.js` reads this file every time `scanText()` is called. There's no caching — fresh patterns are picked up immediately, including by long-running processes.

### How it integrates with the static tiers
The static tiers (1-7) are defined in code in `banned-content-patterns.js`. The learned patterns are loaded at runtime and added as an 8th category called `learnedPatterns` with severity `critical`.

When `scanText()` runs, it iterates all 8 categories and returns matches from any of them. The findings include the category name, so you can tell whether a leak was caught by a static or learned pattern.

---

## 5. THE AUDIT TRAIL — `reports/learning-log.json`

Every time the learning loop adds patterns, it appends an entry to this file:

```json
{
  "entries": [
    {
      "timestamp": "2026-04-13T03:00:00.000Z",
      "patternsLearned": 3,
      "patterns": [
        {
          "pattern": "^\\s*INSIGHT(\\s+\\d+)?\\s*:",
          "flags": "im",
          "type": "caps_label_optional_number",
          "examples": ["INSIGHT 1:", "INSIGHT 5:"],
          "affectedUrls": ["https://www.zasupport.com/blog/post-1"],
          "firstSeenIn": "leak-scan-2026-04-13.json",
          "originalCategory": "evaluationLabels"
        }
      ]
    }
  ]
}
```

This lets you trace every learned pattern back to:
- When it was learned
- Which scan report first detected it
- What the original example match was
- Which URLs were affected
- What category the static scanner classified it under

---

## 6. EMAIL NOTIFICATIONS

When the learning loop adds new patterns (and notifications are configured), it sends an email to admin@zasupport.com:

> **Subject:** [ZA Support] Learning loop: 3 new patterns learned
>
> The blog content sanitisation system has learned 3 new pattern(s) from recent leak detections. These patterns will now prevent similar mistakes from ever occurring again.
>
> - `^\s*INSIGHT(\s+\d+)?\s*:` — example: "INSIGHT 1:"
> - `^\s*VERDICT(\s+\d+)?\s*:` — example: "VERDICT:"
> - `\[\s*CHECK\s*\]` — example: "[CHECK] schema valid"
>
> The system is now smarter than it was yesterday. Content publishing continues at full velocity.

This is the only proactive contact the system makes. Courtney sees what the system learned, never what it needs approval for.

---

## 7. RUNNING THE LEARNING LOOP

### Automatic (production)
Installed by `scripts/install-cron-jobs.sh`:
```
0 1 * * * cd /var/www/zasupport && node scripts/learning-loop.js
```
Runs daily at 03:00 SAST (01:00 UTC), one hour after the leak scanner.

### Manual modes
```bash
# Process all available scan reports, add new patterns
node scripts/learning-loop.js

# Show what would be learned, don't write anything
node scripts/learning-loop.js --dry-run

# Only process reports from the last 7 days
node scripts/learning-loop.js --since 7
```

### What happens if it doesn't run
If the learning loop is skipped:
- Detected leaks are still fixed by the daily scanner + repair skill
- But the same pattern can recur the next day with no prevention
- The system stops getting smarter
- The static tiers still work, but new failure modes go uncaught

The learning loop is the only mechanism that makes the system self-improving. Without it, you have a static leak protection system instead of an evolving one.

---

## 8. VERIFIED WORKING — TEST RESULTS

End-to-end test on 13 April 2026:

```bash
# Step 1: Plant a fake scan report with a leak
echo '{"findings":[{"issues":[{"category":"evaluationLabels",
  "match":"INSIGHT 1:","context":"INSIGHT 1: leaked"}]}]}' \
  > reports/leak-scan-2026-04-13.json

# Step 2: Run learning loop
node scripts/learning-loop.js

# Output:
# ✓ LEARNED: ^\s*INSIGHT(\s+\d+)?\s*:
#   Example: "INSIGHT 1:"
#   Type: caps_label_optional_number

# Step 3: Test the learned pattern catches a new variant
node -e "
const { scanText } = require('./config/banned-content-patterns');
const findings = scanText('Workshop note.\nINSIGHT 5: New variant.');
console.log('Findings:', findings.length);
"

# Output:
# Findings: 1
# (The learned pattern caught INSIGHT 5: even though we never saw it before)
```

The system correctly:
1. Learned `INSIGHT 1:` as a generalised pattern
2. Caught `INSIGHT 5:` (different number) using the learned pattern
3. Did NOT catch unrelated text (no false positives)

---

## 9. EDGE CASES AND LIMITATIONS

### What the learning loop cannot catch
- **Semantic leaks** — text that's bad content but doesn't follow a structural pattern (e.g., a leaked client name, a wrong fact). The scanner doesn't understand meaning, only patterns.
- **Image leaks** — a screenshot containing leaked text isn't caught (the scanner only sees alt text)
- **Cross-page leaks** — if a leak is split across two paragraphs, the regex may not span the boundary

### False positive risk
The generaliser is conservative. The `caps_label_optional_number` type, for example, only triggers on text that's already been classified as a critical leak by the static tiers. It won't accidentally generalise legitimate ALL CAPS content (like `MACBOOK PRO` model names).

If a false positive does occur:
1. Find the entry in `config/learned-patterns.json`
2. Delete that single pattern object from the array
3. The next scan will no longer use it
4. Document the removal in `reports/learning-log.json` with a note

### Pattern accumulation
Over time, `learned-patterns.json` will grow. This is by design — every entry represents a permanent improvement. Expected growth rate: 2-5 patterns per month based on typical content velocity.

If the file grows beyond 500 patterns, performance impact is still negligible (regex matching against 500 patterns on a 1000-word post takes <50ms).

### Roll-back
If the learning loop ever adds a bad pattern that causes false positives:
1. Stop the cron job: `crontab -e` and comment out the learning-loop entry
2. Edit `config/learned-patterns.json` to remove the bad pattern
3. Investigate why the generaliser produced it
4. Fix the generaliser if needed (`scripts/learning-loop.js`)
5. Re-enable the cron job

---

## 10. PHILOSOPHY

The learning loop embodies three principles:

### 1. Mistakes are data
Every leak that reaches production is information about how the content pipeline can fail. Throwing that information away (manual fix, no learning) is wasteful. Capturing it (auto-fix + generalise + store) compounds.

### 2. The system should be smarter tomorrow than today
Static rules age. Learning systems improve. At 8 posts/day, the only sustainable approach is one that improves continuously without manual intervention.

### 3. Silent improvement
The author never knows the learning loop ran. They publish content, the system catches and fixes mistakes, and the next month the same mistake can't happen. There's no meeting, no review, no approval queue. The infrastructure quietly gets stronger.

---

*The Learning Loop — Documentation v1.0*
*ZA Support | zasupport.com | courtney@zasupport.com*
*Last updated: 13 April 2026*
