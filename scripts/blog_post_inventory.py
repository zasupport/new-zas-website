"""Node-free inventory of the static TypeScript `posts` object.

This is a structural reader, not a TypeScript evaluator. Comments and strings
are opaque; only direct object keys are counted. Dynamic keys, spreads,
duplicate keys, missing/empty stores and malformed delimiters fail closed.
"""

import re


class InventoryError(ValueError):
    pass


def tokens(text):
    """Yield (kind, value); skip comments and keep literal contents opaque."""
    n = len(text)

    def quoted(i):
        quote, start = text[i], i
        i += 1
        while i < n:
            if text[i] == "\\":
                i += 2
            elif text[i] == quote:
                return i + 1
            elif quote == "`" and text.startswith("${", i):
                i = expression(i + 2)
            elif quote != "`" and text[i] in "\r\n":
                raise InventoryError(f"newline in string at {start}")
            else:
                i += 1
        raise InventoryError(f"unterminated string at {start}")

    def comment(i):
        if text.startswith("//", i):
            end = text.find("\n", i + 2)
            return n if end < 0 else end + 1
        end = text.find("*/", i + 2)
        if end < 0:
            raise InventoryError(f"unterminated comment at {i}")
        return end + 2

    def expression(i):
        depth = 1
        while i < n:
            if text[i] in "'\"`":
                i = quoted(i)
            elif text.startswith(("//", "/*"), i):
                i = comment(i)
            elif text[i] == "{":
                depth += 1
                i += 1
            elif text[i] == "}":
                depth -= 1
                i += 1
                if not depth:
                    return i
            else:
                i += 1
        raise InventoryError("unterminated template interpolation")

    i = 0
    while i < n:
        c = text[i]
        if c.isspace():
            i += 1
        elif text.startswith(("//", "/*"), i):
            i = comment(i)
        elif c in "'\"`":
            end = quoted(i)
            yield ("template" if c == "`" else "string", text[i + 1 : end - 1])
            i = end
        elif c.isalpha() or c in "_$":
            end = i + 1
            while end < n and (text[end].isalnum() or text[end] in "_$"):
                end += 1
            yield ("identifier", text[i:end])
            i = end
        else:
            yield ("punctuation", c)
            i += 1


def post_slugs(text):
    stream = iter(tokens(text))

    def take():
        try:
            return next(stream)
        except StopIteration as exc:
            raise InventoryError("unexpected end of posts declaration") from exc

    # Locate a real declaration, not a mention inside a comment/content string.
    for kind, value in stream:
        if kind == "identifier" and value in ("const", "let", "var"):
            if take() != ("identifier", "posts"):
                continue
            type_depth = 0
            while True:
                token = take()
                if token[0] == "punctuation" and token[1] in "{[(":
                    type_depth += 1
                elif token[0] == "punctuation" and token[1] in "}])":
                    type_depth -= 1
                if token == ("punctuation", "=") and type_depth == 0:
                    break
                if token == ("punctuation", ";") and type_depth == 0:
                    raise InventoryError("posts has no object initializer")
            if take() != ("punctuation", "{"):
                raise InventoryError("posts must be a static object literal")
            break
    else:
        raise InventoryError("posts declaration missing")

    slugs = set()
    token = take()
    while token != ("punctuation", "}"):
        kind, slug = token
        if kind not in ("string", "identifier") or not re.fullmatch(r"[a-z0-9][a-z0-9-]*", slug):
            raise InventoryError(f"unsupported/dynamic post key: {token!r}")
        if slug in slugs:
            raise InventoryError(f"duplicate post key: {slug}")
        if take() != ("punctuation", ":") or take() != ("punctuation", "{"):
            raise InventoryError(f"{slug}: expected a static record object")
        stack = ["}"]
        # Walk the record structurally; strings/comments cannot spoof record keys.
        while stack:
            kind, value = take()
            if kind != "punctuation":
                continue
            if value in "{[(":
                stack.append({"{": "}", "[": "]", "(": ")"}[value])
            elif value in "}])":
                if value != stack.pop():
                    raise InventoryError(f"{slug}: mismatched delimiter")
        slugs.add(slug)
        token = take()
        if token == ("punctuation", ","):
            token = take()
        elif token != ("punctuation", "}"):
            raise InventoryError(f"{slug}: missing record separator")
    if not slugs:
        raise InventoryError("posts object is empty; refusing a blind pass")
    return slugs
