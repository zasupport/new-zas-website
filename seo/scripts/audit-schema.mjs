#!/usr/bin/env node
// audit-schema.mjs — JSON-LD coverage + self-serving AggregateRating detector (Handoff §5.4, §9-D).
// HARD GATE: any self-serving AggregateRating/Review JSON-LD for ZA Support's own
// business is forbidden (§166) -> exit 2. Read-only.
// Usage: node seo/scripts/audit-schema.mjs [--base URL] [--paths a,b,c]

import { BASE, fetchRaw, sleep } from "./lib/crawl.mjs";
import { findSelfRating } from "./lib/detectors.mjs";

const DEFAULT_PATHS = [
	"/",
	"/apple-repair",
	"/macbook-repair",
	"/logic-board-repair",
	"/battery-replacement",
	"/screen-repair",
];

// findSelfRating (self-serving AggregateRating/Review detector) is shared with the
// unit tests via seo/scripts/lib/detectors.mjs — single source, no drift.

async function main() {
	const bi = process.argv.indexOf("--base");
	const base = bi > -1 ? process.argv[bi + 1] : BASE;
	const pi = process.argv.indexOf("--paths");
	const paths = pi > -1 ? process.argv[pi + 1].split(",") : DEFAULT_PATHS;

	const violations = [];
	const coverage = {};
	for (const path of paths) {
		const r = await fetchRaw(base + path, { follow: false });
		if (r.status !== 200 || !r.contentType.includes("text/html")) {
			coverage[path] = `status ${r.status}`;
			continue;
		}
		const blocks = [
			...r.body.matchAll(
				/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
			),
		].map((m) => m[1].trim());
		const types = new Set();
		for (const b of blocks) {
			if (findSelfRating(b)) violations.push(path);
			try {
				const parsed = JSON.parse(b);
				const collect = (n) => {
					if (!n || typeof n !== "object") return;
					if (Array.isArray(n)) {
						for (const x of n) collect(x);
						return;
					}
					if (n["@type"]) for (const t of [].concat(n["@type"])) types.add(t);
					if (n["@graph"]) collect(n["@graph"]);
				};
				collect(parsed);
			} catch {
				types.add("__PARSE_ERROR__");
			}
		}
		coverage[path] = [...types].sort().join(", ") || "(none)";
		await sleep(300);
	}

	process.stdout.write("Schema coverage:\n");
	for (const [p, t] of Object.entries(coverage))
		process.stdout.write(`  ${p}: ${t}\n`);
	const uniqueViol = [...new Set(violations)];
	if (uniqueViol.length) {
		process.stdout.write(
			`\nFAIL [P1]: self-serving AggregateRating/Review JSON-LD on: ${uniqueViol.join(", ")}\n`,
		);
		process.exit(2);
	}
	process.stdout.write(
		"\nPASS: no self-serving AggregateRating/Review markup detected.\n",
	);
	process.exit(0);
}

main().catch((e) => {
	process.stdout.write(`audit-schema error: ${e}\n`);
	process.exit(1);
});
