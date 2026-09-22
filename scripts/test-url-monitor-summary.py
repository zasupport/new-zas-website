#!/usr/bin/env python3
import importlib.util
from pathlib import Path
import unittest

spec = importlib.util.spec_from_file_location("summary", Path(__file__).with_name("url-monitor-summary.py"))
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)


def report(errors=()):
    return {"mode":"crawl", "observed_at":"2026-09-22T00:00:00Z", "head_sha":"fixture",
            "paths_audited":1, "passed":not errors, "host_variants_tested":True,
            "errors":[], "results":[{"path":"/probe", "errors":list(errors)}]}


class SummaryTest(unittest.TestCase):
    def test_same_failure_silent(self):
        self.assertFalse(m.summarize(report(["canonical_mismatch"]), report(["canonical_mismatch"]))["notify"])

    def test_new_failure(self):
        self.assertTrue(m.summarize(report(["canonical_mismatch"]), report())["notify"])

    def test_resolved(self):
        summary = m.summarize(report(), report(["canonical_mismatch"]))
        self.assertTrue(summary["notify"])
        self.assertEqual(len(summary["resolved"]), 1)

    def test_absence(self):
        with self.assertRaises(ValueError):
            m.summarize({})

    def test_first_baseline(self):
        self.assertTrue(m.summarize(report())["first_baseline"])


if __name__ == "__main__":
    unittest.main()
