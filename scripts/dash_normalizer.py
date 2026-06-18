#!/usr/bin/env python3
"""
dash_normalizer.py — §547 canonical typographic-dash remover (18/06/2026)

ROOT CAUSE this fixes: AI generators (Haiku/Opus) emit em-dashes (—, U+2014) and
en-dashes (–, U+2013) by default. §206 banned "AI dividers" only as PROSE in
CLAUDE.md — it never named the — glyph and shipped NO executable test, so the
pipeline was blind to it (§404 silent-recurrence). Result: every new post +
page reintroduced the character to production. This module is the ONE source of
truth for both DETECTION (the deploy/pre-commit gate) and the TRANSFORM (the
one-time strip + the insertion sanitiser), so the two can never diverge.

POLICY (meaning-preserving, advisor-reviewed 18/06/2026):
  en-dash  (–, U+2013)  -> ASCII hyphen "-"   ALWAYS.
      Safe because en-dash is the RANGE glyph: 2007–2009 -> 2007-2009 (Courtney's
      founder dates §403), Monday–Friday, 9am–5pm, R599–R2000 all keep meaning.
  em-dash  (—, U+2014):
      digit—digit                 -> "-"      (preserve any range mis-set as em)
      inside a title: '...' value -> ": " first, ", " for any subsequent
                                     ("MacBook — What to Do" -> "MacBook: What to Do")
      everywhere else (clause break) -> ", "  (the standard em-dash substitute)
  Then whitespace/punctuation is normalised so no ", ," / " ," / ",." artefacts remain.

The transform is IDEMPOTENT: after one pass no curly dash remains, so re-running
is a no-op and the gate passes.

API:
  normalize_dashes(text) -> str          full transform (title-aware)
  has_typographic_dash(text) -> bool     detection for the gate
  count_dashes(text) -> (em, en)         reporting

CLI:
  dash_normalizer.py --test              positive + negative controls (gate must be green)
"""
import re
import sys

EM = "—"  # —
EN = "–"  # –


def _strip_em_in_titles(text: str) -> str:
    """Within every  title: '...'  value, first em-dash -> ': ', rest -> ', '."""
    title_re = re.compile(r"(title:\s*')([^']*)(')")

    def repl(m):
        pre, val, post = m.group(1), m.group(2), m.group(3)
        if EM not in val:
            return m.group(0)
        # first em-dash -> colon, subsequent -> comma
        first, _, rest = val.partition(EM)
        rest = rest.replace(EM, ", ")
        new = first.rstrip() + ": " + rest.lstrip()
        return pre + new + post

    return title_re.sub(repl, text)


def normalize_dashes(text: str) -> str:
    if EM not in text and EN not in text:
        return text

    # 1. en-dash -> ASCII hyphen everywhere (range-safe, meaning-preserving)
    text = text.replace(EN, "-")

    # 2. em-dash between numeric/currency tokens -> hyphen (preserve a range
    #    mis-set as em-dash, incl. "R599—R2000"). Right side allows an optional
    #    R/$ currency prefix so "9—R2" in R599—R2000 is caught; "2024 — Apple"
    #    has a letter (no digit) on the right and correctly falls through to comma.
    text = re.sub(r"(\d)\s*" + EM + r"\s*([R$]?\d)", r"\1-\2", text)

    # 3. em-dash inside title: '...' values -> colon/comma (title-aware)
    text = _strip_em_in_titles(text)

    # 4. all remaining em-dashes (clause breaks) -> comma + space. Eat only
    #    spaces/tabs around it (NOT newlines, so paragraphs don't collapse) so
    #    " — " and "word—word" both land as "x, y".
    text = re.sub(r"[ \t]*" + EM + r"[ \t]*", ", ", text)

    # 5. normalise ONLY artefacts the substitution created. Crucially we do NOT
    #    touch pre-existing commas (thousands separators like R4,499 / 10,000).
    text = re.sub(r"[ \t]+,", ",", text)            # " ," -> "," (from spaced em-dash)
    text = re.sub(r",[ \t]*,", ", ", text)          # ", ," -> ", "
    # ", ." -> "." but NEVER touch ", ..." / ", ...spread" (the lookahead guards
    #   JS spread/ellipsis: `{ a, ...b }` and "wait, ..." must stay intact).
    text = re.sub(r",[ \t]*(?!\.\.)([.;:!?])", r"\1", text)

    return text


def has_typographic_dash(text: str) -> bool:
    return EM in text or EN in text


def count_dashes(text: str):
    return text.count(EM), text.count(EN)


def _test() -> int:
    cases = [
        # (input, expected)
        ("Spilled Coffee on a MacBook — What to Do",
         "Spilled Coffee on a MacBook — What to Do"),  # plain text -> comma (not title field)
    ]
    # The plain-text case becomes a comma; title-field case becomes colon.
    checks = []

    # 1. en-dash range preserved as hyphen (founder dates §403)
    checks.append(("en range 2007", normalize_dashes("2007–2009") == "2007-2009"))
    checks.append(("en Mon-Fri", normalize_dashes("Monday–Friday") == "Monday-Friday"))
    checks.append(("en price", normalize_dashes("R599–R2000") == "R599-R2000"))

    # 2. em-dash clause break -> comma
    checks.append(("em nospace", normalize_dashes("display—somewhere") == "display, somewhere"))
    checks.append(("em spaced", normalize_dashes("Johannesburg — iPhone") == "Johannesburg, iPhone"))

    # 3. em-dash in title field -> colon
    t_in = "title: 'Spilled Coffee on a MacBook — What to Do'"
    t_out = "title: 'Spilled Coffee on a MacBook: What to Do'"
    checks.append(("em title colon", normalize_dashes(t_in) == t_out))

    # 4. em-dash digit range -> hyphen
    checks.append(("em digit range", normalize_dashes("R599—R2000") == "R599-R2000"))

    # 5. detection positive + negative
    checks.append(("detect pos em", has_typographic_dash("a—b") is True))
    checks.append(("detect pos en", has_typographic_dash("a–b") is True))
    checks.append(("detect neg", has_typographic_dash("a-b, c: d") is False))

    # 6. IDEMPOTENT — second pass changes nothing
    once = normalize_dashes(t_in + " and display—somewhere R599–R2000")
    checks.append(("idempotent", normalize_dashes(once) == once))
    checks.append(("idempotent clean", not has_typographic_dash(once)))

    # 7. no artefacts
    checks.append(("no double comma", ", ," not in normalize_dashes("a — , b")))

    # 8. thousands separators MUST be untouched (the R4,499 regression)
    checks.append(("thousands sep kept",
                   normalize_dashes("**R4,499 and up** for work—still cheaper")
                   == "**R4,499 and up** for work, still cheaper"))
    checks.append(("plain 10,000 kept", normalize_dashes("over 10,000 repairs") == "over 10,000 repairs"))

    # 9. newline not collapsed by a line-terminal em-dash
    checks.append(("no para collapse",
                   normalize_dashes("line one—\nline two") == "line one, \nline two"))

    # 10. JS spread / ellipsis must survive a same-file em-dash trigger (the
    #     `true...data` build-break: rule 5c must NOT eat ", ..." )
    checks.append(("spread intact",
                   normalize_dashes("{ cron: true, ...data } and x—y")
                   == "{ cron: true, ...data } and x, y"))
    checks.append(("array spread intact",
                   normalize_dashes("[...a ?? [], ...b] plus a—b")
                   == "[...a ?? [], ...b] plus a, b"))
    checks.append(("prose ellipsis intact",
                   normalize_dashes("Wait, ... really? plus a—b")
                   == "Wait, ... really? plus a, b"))

    ok = all(p for _, p in checks)
    for name, p in checks:
        print(f"  {'✅' if p else '❌'} {name}")
    print(f"{'✅ PASS' if ok else '❌ FAIL'}: dash_normalizer §547 ({sum(p for _,p in checks)}/{len(checks)})")
    return 0 if ok else 1


if __name__ == "__main__":
    if "--test" in sys.argv:
        sys.exit(_test())
    # stdin -> stdout filter
    sys.stdout.write(normalize_dashes(sys.stdin.read()))
