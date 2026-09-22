#!/usr/bin/env python3
"""Positive, negative, absence, security and mutation controls for URL evidence."""
import importlib.util
from pathlib import Path
import unittest

spec = importlib.util.spec_from_file_location("integrity", Path(__file__).with_name("url-integrity.py"))
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)

GOOD = '<html><head><link rel="canonical" href="https://zasupport.com/probe"><meta property="og:url" content="https://zasupport.com/probe"></head><body><h1>Probe</h1></body></html>'


class IntegrityTests(unittest.TestCase):
    def errors(self, text=GOOD, status=200, headers=None, indexable=True):
        return m.inspect_page(text, status, headers or {}, m.ORIGIN + "/probe", indexable)["errors"]

    def test_positive(self):
        self.assertEqual(self.errors(), [])

    def test_missing_canonical(self):
        self.assertIn("canonical_count", self.errors(GOOD.replace('rel="canonical"', 'rel="alternate"')))

    def test_duplicate(self):
        self.assertIn("canonical_count", self.errors(GOOD + GOOD))

    def test_wrong_origin(self):
        self.assertIn("canonical_mismatch", self.errors(GOOD.replace("https://zasupport.com/probe", "https://www.zasupport.com/probe")))

    def test_wrong_path(self):
        self.assertIn("canonical_mismatch", self.errors(GOOD.replace("/probe", "/other")))

    def test_relative(self):
        self.assertIn("canonical_mismatch", self.errors(GOOD.replace("https://zasupport.com", "")))

    def test_outside_head(self):
        self.assertIn("canonical_outside_head", self.errors(GOOD.replace("<head>", "<div>").replace("</head>", "</div>")))

    def test_noindex_header(self):
        self.assertIn("unexpected_noindex", self.errors(headers={"x-robots-tag": "googlebot: noindex"}))

    def test_meta_googlebot(self):
        self.assertIn("unexpected_noindex", self.errors(GOOD.replace("</head>", '<meta name="googlebot" content="none"></head>')))

    def test_missing_preview_protection(self):
        self.assertIn("missing_noindex", self.errors(indexable=False))

    def test_preview_header(self):
        self.assertEqual(self.errors(headers={"x-robots-tag": "noindex"}, indexable=False), [])

    def test_error_status(self):
        self.assertIn("not_http_200", self.errors(status=503))

    def test_og_inheritance(self):
        self.assertIn("og_url_mismatch_or_missing", self.errors(GOOD.replace('content="https://zasupport.com/probe"', 'content="https://zasupport.com"')))

    def test_schema_other_entities_allowed(self):
        text = GOOD + '<script type="application/ld+json">{"@context":"https://schema.org","url":"https://zasupport.com/author/courtney-bentley","sameAs":"https://example.com/profile"}</script>'
        self.assertEqual(self.errors(text), [])

    def test_schema_owned_wrong_host(self):
        text = GOOD + '<script type="application/ld+json">{"url":"https://www.zasupport.com"}</script>'
        self.assertIn("schema_owned_origin_mismatch", self.errors(text))

    def test_schema_invalid(self):
        self.assertIn("invalid_jsonld", self.errors(GOOD + '<script type="application/ld+json">{bad}</script>'))

    def test_schema_wrong_page(self):
        text = GOOD + '<script type="application/ld+json">{"@type":"WebPage","url":"https://zasupport.com/wrong"}</script>'
        self.assertIn("schema_page_url_mismatch", self.errors(text))

    def test_schema_wrong_main_entity(self):
        text = GOOD + '<script type="application/ld+json">{"@type":"BlogPosting","mainEntityOfPage":{"@id":"https://zasupport.com/wrong"}}</script>'
        self.assertIn("schema_main_entity_mismatch", self.errors(text))

    def test_assets_and_external_citations_allowed(self):
        self.assertEqual(self.errors(GOOD + '<script src="/_next/static/app.js"></script><a href="https://support.apple.com/">Support</a>'), [])

    def test_redact_without_fabrication(self):
        raw = '[preview](https://candidate.vercel.app/foo?q=x) and candidate.vercel.app and //other.vercel.app/x'
        result = m.redact(raw)
        self.assertNotIn("vercel.app", result)
        self.assertNotIn("zasupport.com", result)

    def test_redaction_idempotent(self):
        text = m.redact("https://candidate.vercel.app/a")
        self.assertEqual(m.redact(text), text)

    def test_loop(self):
        def fetch(url):
            return 301, {"location": url}, ""
        self.assertEqual(m.chain(m.ORIGIN, m.HOSTS, fetch)["error"], "redirect_loop")

    def test_missing_location(self):
        self.assertEqual(m.chain(m.ORIGIN, m.HOSTS, lambda _: (301, {}, ""))["error"], "redirect_without_location")

    def test_ssrf_redirect_blocked(self):
        count = []
        def fetch(url):
            count.append(url)
            return 301, {"location": "http://169.254.169.254/latest/meta-data"}, ""
        self.assertEqual(m.chain(m.ORIGIN, m.HOSTS, fetch)["error"], "redirect_outside_approved_hosts")
        self.assertEqual(len(count), 1)

    def test_single_hop(self):
        def fetch(url):
            return (200, {}, GOOD) if url == m.ORIGIN + "/probe?q=1" else (301, {"location": m.ORIGIN + "/probe?q=1"}, "")
        result = m.chain("https://www.zasupport.com/probe?q=1", m.HOSTS, fetch)
        self.assertEqual(len(result["hops"]), 2)
        self.assertEqual(result["status"], 200)

    def test_normalizes_only_home_slash(self):
        self.assertEqual(m.normalized(m.ORIGIN), m.normalized(m.ORIGIN + "/"))
        self.assertNotEqual(m.normalized(m.ORIGIN + "/probe"), m.normalized(m.ORIGIN + "/probe/"))

    def test_repository_inventory(self):
        inv = m.inventory()
        self.assertGreater(len(inv["paths"]), 800)
        self.assertGreater(len(inv["sitemap"]), 800)
        self.assertIn("/apple-support", inv["paths"])


if __name__ == "__main__":
    unittest.main()
