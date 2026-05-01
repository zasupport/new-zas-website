<!--
target_path: docs/instructions/Email Voice Amendment Progress Update HTML Table 30 04 2026.md
merge_strategy: append
applies_to:
  - Perfect Code project (~/Desktop/Perfect Code)
  - Perfect Blog project (~/Desktop/Perfect Blog)
  - Health Check v11 (~/Desktop/za-support-backendV1)
  - Workshop PKG (~/Desktop/Workshop PKG)
  - Any future ZA Support project that generates client-facing emails
sha256_check: not required (append-only)
-->

# Email Voice Amendment — Progress Update HTML Table — 30/04/2026

## Source

This amendment captures the email patterns confirmed by the 30/04/2026 progress update Courtney sent to Natalie Teixeira at the Pieterse / Hunt / Meyberg / Laher practice. Subject line — `Comprehensive Progress Update For Dr Meyberg's Practise 30.4.26`. The .eml capture is the canonical reference.

## What changed

Three skill files in `~/.claude/skills/` are new or updated as of 30/04/2026:

| Skill | Status | Why |
|---|---|---|
| `progress-update-email-html-table` | NEW v1.0.0 | Captures the HTML colour-coded table format for multi-item progress emails |
| `courtney-voice-09-progress-update-quirks` | NEW v1.0.0 | Patterns 13-16 of the voice catalogue — rhetorical close, word repetition tolerance, "Practise" preserved, comma-before-and |
| `email-html-paragraph-spacing` | UPDATED v2.0.0 | Font stack changed from Arial-only to "Aptos, Arial, Helvetica, sans-serif" because Outlook for Mac sends with Aptos primary |

Memory rule slot 29 also updated to reflect the canonical font stack and the four voice quirks.

## Apply this when

Any code in this project generates an email body destined for Courtney's Outlook for Mac. This includes:

1. The MS Graph `/sendMail` automation in any ZA Support backend service.
2. Any FastAPI endpoint that builds an HTML email body for a client communication.
3. Any AppleScript or Python wrapper that hands HTML to Outlook for Mac for review-and-send.
4. Any Mary-export script that drafts a client comm for Courtney's approval.
5. Any test fixture or seed data that contains a sample email body.

## The four hard rules

### Rule 1 — Aptos-first font stack

Every Outlook email body uses:

```css
font-family: Aptos, Arial, Helvetica, sans-serif;
font-size: 12pt;
```

Hard-coded Arial in any HTML email template is a regression. Update existing templates, fixtures, and tests to the Aptos-first stack on next touch.

### Rule 2 — Progress updates use colour-coded HTML tables

Emails whose purpose is to walk a recipient through a list of items at mixed completion states use a 2-column HTML table with cells coloured by status. Never use a pipe-separated pseudo-table in prose.

The four colours and their RGB values:

| Status | RGB | Meaning |
|---|---|---|
| Green | rgb(56, 118, 29) | Completed |
| Orange / brown-orange | rgb(147, 69, 17) | Outstanding, ZA Support to deliver in flight |
| Purple | rgb(94, 50, 124) | Needs confirmation from recipient |
| Black | rgb(0, 0, 0) | Body text only — never on table cells |

Both cells in a row carry the SAME status colour.

### Rule 3 — Voice quirks preserved verbatim

When generating or editing a Courtney email:

1. The rhetorical question-mark close is canonical for multi-item updates: `Let me know if I have missed something or that you would like to add?`
2. Word repetition is tolerated where meaning is clear: `Set up to be done once domain transfer is done` — do NOT polish to `complete`.
3. "Practise" in a subject Courtney has authored is preserved. Do NOT auto-correct to "Practice".
4. Comma before "and" joining two independent clauses is kept: `Let me know when you have read this email, and I will give you a call to run through it.`

### Rule 4 — Subject line format

Per `email-subject-line-formatting`. Title Case + DD.M.YY. Example for progress updates:

```
Comprehensive Progress Update For {Practice / Client / Project} {DD.M.YY}
```

## Code-level implications

### Python / FastAPI services that build email bodies

If your service hard-codes the font in any HTML email template, update it on next touch:

```python
# OLD
EMAIL_BODY_STYLE = 'font-family: Arial, sans-serif; font-size: 12pt;'

# NEW
EMAIL_BODY_STYLE = 'font-family: Aptos, Arial, Helvetica, sans-serif; font-size: 12pt;'
```

If your service generates a progress update email, factor out a helper that returns an HTML colour-coded table given a list of `(item, status_text, colour)` tuples. The colour parameter must accept one of the four canonical RGB values above.

### MS Graph /sendMail wrappers

The `body.contentType` stays `HTML`. The `body.content` HTML must use the Aptos-first stack. The dispatching wrapper must NOT downgrade to plain text on send.

### Test fixtures

Any unit test or integration fixture that asserts an exact email body string must be updated. The font-family substring is the most common assertion that will break — update assertions to match the new stack.

### Seed data

Any seed JSON / YAML / SQL containing example email bodies must be updated on next touch. This is non-urgent — old fixtures do not break production — but new seed entries must use the new format.

## Composition with existing project rules

This amendment sits BELOW `email-html-paragraph-spacing` v2.0.0 and ABOVE `courtney-bentley-email-template` and `email-subject-line-formatting`. Read order for any code that generates an email body:

1. `email-html-paragraph-spacing` v2.0.0 — font stack and HTML body shape.
2. `courtney-bentley-email-template` — block order spine.
3. `progress-update-email-html-table` — when the body is a progress update.
4. `courtney-voice-09-progress-update-quirks` — voice patterns 13-16.
5. `courtney-voice-01` through `courtney-voice-08` — the existing 12 patterns.
6. `email-subject-line-formatting` — subject line.
7. `email-signoff-standard` — sign-off block.
8. `outlook-for-mac-only-send` — send path.
9. `banned-phrases` — final pre-send screen.

## Change log

30/04/2026 — Amendment created from the Meyberg 30.4.26 progress update. Captured by Claude on Courtney's instruction to propagate throughout the whole Claude infrastructure.
