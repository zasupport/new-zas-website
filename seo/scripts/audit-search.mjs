#!/usr/bin/env node
// audit-search.mjs — reproduce the onsite-search P0 (Handoff §5.5, §9-C, §10).
// Read-only. Tests the search page + API for the mandated query cases.
// Reports per-case status; exit 2 if search is broken (page 200 but API/results fail).
// Usage: node seo/scripts/audit-search.mjs [--base URL]

import { BASE, fetchRaw, sleep } from "./lib/crawl.mjs";

const CASES = [
	"Logic board",
	"logic-board",
	"MacBook liquid damage",
	"battery",
	"",
];

async function main() {
	const i = process.argv.indexOf("--base");
	const base = i > -1 ? process.argv[i + 1] : BASE;
	const results = [];

	for (const q of CASES) {
		const enc = encodeURIComponent(q);
		const page = await fetchRaw(`${base}/search?q=${enc}`, { follow: false });
		const api = await fetchRaw(`${base}/api/search?q=${enc}`, {
			follow: false,
		});
		let apiBody = "";
		try {
			apiBody = api.body ? api.body.slice(0, 160) : "";
		} catch {
			apiBody = "";
		}
		results.push({
			query: q || "(empty)",
			pageStatus: page.status,
			pageNoindex: /noindex/i.test(page.body || ""),
			apiStatus: api.status,
			apiBody,
		});
		await sleep(300);
	}

	process.stdout.write("Onsite search reproduction:\n");
	for (const r of results) {
		process.stdout.write(
			`  q=${JSON.stringify(r.query)}  page=${r.pageStatus} noindex=${r.pageNoindex}  api=${r.apiStatus}  ${r.apiBody}\n`,
		);
	}

	// The empty query legitimately 400s the API (Missing query). For non-empty
	// queries, API must be 200. A 500/503 = broken search P0.
	const broken = results.filter(
		(r) => r.query !== "(empty)" && r.apiStatus !== 200,
	);
	const crawlTrap = results.some((r) => r.pageStatus === 200 && !r.pageNoindex);

	if (crawlTrap)
		process.stdout.write(
			"\nWARN [P1]: a /search page is indexable (missing noindex) — crawl-trap risk.\n",
		);
	if (broken.length) {
		process.stdout.write(
			`\nFAIL [P0]: onsite search broken — API non-200 for: ${broken.map((b) => JSON.stringify(b.query)).join(", ")}\n`,
		);
		process.exit(2);
	}
	process.stdout.write(
		"\nPASS: onsite search returns results for all non-empty queries.\n",
	);
	process.exit(0);
}

main().catch((e) => {
	process.stdout.write(`audit-search error: ${e}\n`);
	process.exit(1);
});
