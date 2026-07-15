#!/usr/bin/env python3
"""
hide-pricing.py — TEMP price hide (2026-07-15).

Removes VISIBLE Rand amounts from hardcoded page text (titles, meta
descriptions, prose, feature-label chips, headings, visible price-table cells,
schema description strings), replacing them with the site's own price-free
convention ("Contact for pricing" / a clean drop) while keeping process
language and warranties intact.

Schema Offer prices are handled at the chokepoint (src/lib/schema.ts
HIDE_SCHEMA_PRICING) and on-page ranges at src/components/PricingRange.tsx
(HIDE_PRICING) — this script does NOT touch lowPrice/highPrice call args
(they are ignored while the chokepoint is on, and keeping them makes the
revert a one-flag change).

Reversible: restore from git tag pre-pricing-strip-2026-07-15 (or flip the two
chokepoint flags + git revert this run) when new pricing is live.

Modes:
  --scan     count + list residual visible Rand tokens in the live tree
  --diff     show unified diff of what --apply WOULD change (writes nothing)
  --apply    apply in place (backs up each changed file to *.pre-hide-pricing)
  --test     built-in positive + negative controls (no filesystem writes)

ASCII-only output (no typographic dashes, §547). Idempotent.
"""
import re
import sys
import os
import difflib
import glob

# Rand token: R + digit ... ending in a digit (R599, R1,500, R15,000).
# Ends in a digit so it never swallows a trailing comma/punctuation.
# Not preceded by a letter, so battery part numbers (CR2032, CR2016) and other
# letter+R codes are never treated as a price.
RAND = r"(?<![A-Za-z])R[0-9][0-9,]*[0-9]"

# Ordered rewrite rules. Longest / most specific first. Each is (pattern, repl).
# Every rule is anchored to a price context to avoid mangling unrelated text.
# GRAMMAR-SAFE SUBSET ONLY. Prose-embedded comparison/estimate figures
# (costs R.., runs R.., R.. to R.. ranges, worth R..) are deliberately NOT
# handled here -- they are rewritten to qualitative by surgical agents, because
# a blind regex would mangle live sentences (§566). Everything below is
# anchored to a mechanical, non-grammatical context.
RULES = [
    # --- sentence-level fragment deletions (whole clause, keeps grammar) ---
    (rf"[ \t]*From {RAND} if you decline[^.\n]*\.", ""),
    (rf"[ \t]*From {RAND} regardless of outcome\.", ""),
    # --- Apple / competitor hyphen ranges right after "Apple charges" -> qualitative ---
    (rf"Apple charges {RAND}[ \t]*[-–][ \t]*{RAND}", "Apple charges many times more"),
    # --- title / label price suffix "| From R599" ---
    (rf"[ \t]*\|[ \t]*From {RAND}", ""),
    # --- assessment / diagnostic fee phrasings (drop amount, keep the noun) ---
    (rf"\bassessment fee of from {RAND}", "assessment fee"),
    (rf"\bassessment fee of {RAND}", "assessment fee"),
    (rf"\bassessment is {RAND}", "assessment applies"),
    (rf"\bAssessment:?\s*from {RAND}", "Assessment"),
    (rf"\bAssessment:?\s*{RAND}", "Assessment"),
    (rf"\bDiagnostic:?\s*from {RAND}", "Diagnostic"),
    (rf"\bDiagnostic:?\s*{RAND}", "Diagnostic"),
    (rf"\bthe {RAND} assessment", "the assessment"),
    (rf"\bthe {RAND} diagnostic", "the diagnostic"),
    # extended assessment-fee phrasings (R599 is always the assessment fee) --
    # specific first, all anchored to the fee/assessment noun.
    (rf"\bassessment fee is from {RAND}", "assessment fee applies"),
    (rf"\bassessment fee starts from {RAND}", "assessment fee applies"),
    (rf"\bassessment fee:?\s*\(from {RAND}\)", "assessment fee"),
    (rf"\bassessment fee:?\s*\({RAND}\)", "assessment fee"),
    (rf"\bassessment fee:?\s*from {RAND}", "assessment fee"),
    (rf"\bassessment fee:?\s*{RAND}", "assessment fee"),
    (rf"\bassessment is from {RAND}", "assessment applies"),
    (rf"\bassessment starts from {RAND}", "assessment applies"),
    (rf"\bassessment costs from {RAND}", "assessment applies"),
    (rf"\bassessment from {RAND}", "assessment"),
    (rf"[ \t]*\(from {RAND}\)", ""),
    (rf"[ \t]*\({RAND}\)", ""),
    (rf"\bat from {RAND}", "at our assessment fee"),
    (rf"\bthe {RAND} is deducted", "the assessment fee is deducted"),
    (rf"\bfrom {RAND} if unfixable", "if unfixable"),
    (rf"'{RAND} Assessment'", "'Assessment'"),
    # consume a leading "from"/"From" so "from R599 assessment fee" does not
    # leave a dangling "from assessment fee".
    (rf"\bfrom {RAND} assessment fee", "assessment fee"),
    (rf"\bFrom {RAND} assessment fee", "Assessment fee"),
    (rf"\bfrom {RAND} assessment", "assessment"),
    (rf"\bFrom {RAND} assessment", "Assessment"),
    (rf"\bfrom {RAND} diagnostic", "diagnostic"),
    (rf"\b{RAND} assessment fee", "assessment fee"),
    (rf"\b{RAND} assessment", "assessment"),
    (rf"\b{RAND} diagnostic", "diagnostic"),
    (rf"\bfrom {RAND} fee", "assessment fee"),
    # artifact fixers for dangling "from"/"From" left by an earlier run (no amount left)
    (r"\bfrom assessment fee\b", "assessment fee"),
    (r"\bFrom assessment fee\b", "Assessment fee"),
    (r"\bfrom assessment\b", "assessment"),
    (r"\bFrom assessment\b", "Assessment"),
    (r"\bfrom diagnostic\b", "diagnostic"),
    # collapse redundant "Assessment. Assessment" doubles left when two adjacent
    # price callouts both reduced to "Assessment".
    (r"\bAssessment\. Assessment\b", "Assessment"),
    (r"\bassessment\. Assessment\b", "assessment"),
    # article agreement: "a R599 assessment" -> "a assessment" needs "an".
    (r"\ba assessment\b", "an assessment"),
    (r"\ba Assessment\b", "an Assessment"),
    (r"\bA assessment\b", "An assessment"),
    # vestigial price-column header (cells now say "Contact for pricing").
    (r">From</th>", ">Pricing</th>"),
    # --- whole-quoted price chips / data-array value cells -> contact ---
    #     matches a string literal that is JUST a price ('R3,499', 'From R599'),
    #     never a price sitting inside a longer sentence string.
    (rf"'(?:From |from )?{RAND}'", "'Contact for pricing'"),
    (rf"\"(?:From |from )?{RAND}\"", "\"Contact for pricing\""),
]

def transform(text: str) -> str:
    # Anchored rules only. NO global whitespace cleanup: `\s+`/`[ \t]{2,}` would
    # span newlines and leading indentation and reflow/mangle the whole file.
    # The rules are written to consume adjacent spaces themselves so they leave
    # no stray double spaces.
    for pat, repl in RULES:
        text = re.sub(pat, repl, text)
    return text


def target_files(root="src"):
    files = []
    for ext in ("*.tsx", "*.ts"):
        files += glob.glob(os.path.join(root, "**", ext), recursive=True)
    # schema.ts chokepoint already handled; blog is out of scope (service pages
    # only) and its prose is handled separately if ever needed.
    skip = ("src/lib/schema.ts",
            "src/app/blog/[slug]/page.tsx",
            "src/app/blog/page.tsx")
    return [f for f in sorted(set(files))
            if not f.endswith(".pre-hide-pricing") and f not in skip]


def residual_tokens(text: str):
    """Visible Rand tokens that survive the transform (for --scan / flagging).
    Excludes lowPrice/highPrice numeric call-args (no R prefix, not matched)."""
    return re.findall(RAND, text)


def cmd_scan():
    total = 0
    files_hit = 0
    for f in target_files():
        with open(f, encoding="utf-8") as fh:
            out = transform(fh.read())
        toks = residual_tokens(out)
        if toks:
            files_hit += 1
            total += len(toks)
            with open(f, encoding="utf-8") as fh:
                for i, line in enumerate(fh, 1):
                    if re.search(RAND, transform(line)):
                        print(f"{f}:{i}: {line.strip()[:140]}")
    print(f"\nRESIDUAL after transform: {total} visible Rand token(s) in {files_hit} file(s)")
    return total


def cmd_diff():
    changed = 0
    for f in target_files():
        with open(f, encoding="utf-8") as fh:
            src = fh.read()
        out = transform(src)
        if out != src:
            changed += 1
            for line in difflib.unified_diff(
                src.splitlines(), out.splitlines(),
                fromfile=f, tofile=f + " (hidden)", lineterm=""):
                print(line)
    print(f"\n# {changed} file(s) would change")


def cmd_apply():
    changed = 0
    for f in target_files():
        with open(f, encoding="utf-8") as fh:
            src = fh.read()
        out = transform(src)
        if out != src:
            # §547: refuse only if the transform INTRODUCES a non-ASCII char that
            # was not already in the source (pre-existing star/prime/dash glyphs
            # are not ours to touch).
            new_nonascii = {c for c in out if ord(c) > 127} - {c for c in src if ord(c) > 127}
            if new_nonascii:
                print(f"REFUSE (would introduce non-ASCII {new_nonascii!r}): {f}")
                continue
            with open(f + ".pre-hide-pricing", "w", encoding="utf-8") as bh:
                bh.write(src)
            with open(f, "w", encoding="utf-8") as fh:
                fh.write(out)
            changed += 1
    print(f"APPLIED to {changed} file(s). Backups: *.pre-hide-pricing")


def cmd_test():
    ok = True
    # positive: known priced strings must lose the amount, keep grammar
    pos = [
        ("title: 'MacBook Liquid Damage Repair Johannesburg [2026] | From R1,500',",
         "title: 'MacBook Liquid Damage Repair Johannesburg [2026]',"),
        ("Assessment: from R599. This covers inspection.",
         "Assessment. This covers inspection."),
        ("the R599 assessment confirms the fault",
         "the assessment confirms the fault"),
        ("Apple charges R15,000-R70,000 for a board replacement.",
         "Apple charges many times more for a board replacement."),
        ("{ service: 'Assessment', price: 'From R599', note: 'x' },",
         "{ service: 'Assessment', price: 'Contact for pricing', note: 'x' },"),
        ("{ device: 'MacBook Air', from: 'R2,499', note: 'x' },",
         "{ device: 'MacBook Air', from: 'Contact for pricing', note: 'x' },"),
        ("You decide whether to go ahead. From R599 if you decline the repair.",
         "You decide whether to go ahead."),
        ("The assessment fee is from R599. This covers diagnosis.",
         "The assessment fee applies. This covers diagnosis."),
        ("Our assessment starts from R599 and includes a written quote.",
         "Our assessment applies and includes a written quote."),
        ("only the assessment fee from R599, not the repair",
         "only the assessment fee, not the repair"),
        ("Bring it in, we assess it (from R599), give you a quote.",
         "Bring it in, we assess it, give you a quote."),
        ("if it fails within the period, we fix it at from R599.",
         "if it fails within the period, we fix it at our assessment fee."),
        ("the R599 is deducted from the repair cost",
         "the assessment fee is deducted from the repair cost"),
        ("{ label: 'R599 Assessment', icon: 'x' }",
         "{ label: 'Assessment', icon: 'x' }"),
        ("How ZA Support assessments work: from R599 assessment fee, transparent.",
         "How ZA Support assessments work: assessment fee, transparent."),
        ("the from assessment fee applies to the repair",
         "the assessment fee applies to the repair"),
    ]
    for src, want in pos:
        got = transform(src)
        if got != want:
            ok = False
            print(f"POS FAIL:\n  in:   {src}\n  want: {want}\n  got:  {got}")
    # negative control: text with NO price must be untouched (proves no over-strip)
    # PLUS prose-embedded prices the transform must LEAVE for agents (proves the
    # transform does not blindly mangle sentences).
    neg = [
        "12-month warranty on parts and labour.",
        "Component-level board repair keeps your data intact.",
        "you enquire and speak to a ZA Support consultant who assesses your machine.",
        "Apple Store charges R6,000 to R15,000 for the same repairs.",
        "Screen repair starts from R3,499 for the 13-inch models.",
    ]
    for src in neg:
        got = transform(src)
        if got != src:
            ok = False
            print(f"NEG FAIL (over-strip):\n  in:  {src}\n  got: {got}")
    # negative control 2: absence — a priced input MUST still contain a Rand token
    # BEFORE transform (proves the detector can see prices at all)
    if not re.search(RAND, "Assessment: from R599."):
        ok = False
        print("NEG FAIL: detector blind to a real price token")
    # idempotency: transform(transform(x)) == transform(x)
    for src, _ in pos:
        once = transform(src)
        if transform(once) != once:
            ok = False
            print(f"IDEMPOTENCY FAIL: {src}")
    print("ALL PASS" if ok else "FAILURES ABOVE")
    return 0 if ok else 1


if __name__ == "__main__":
    mode = sys.argv[1] if len(sys.argv) > 1 else "--scan"
    if mode == "--scan":
        cmd_scan()
    elif mode == "--diff":
        cmd_diff()
    elif mode == "--apply":
        cmd_apply()
    elif mode == "--test":
        sys.exit(cmd_test())
    else:
        print(__doc__)
        sys.exit(2)
