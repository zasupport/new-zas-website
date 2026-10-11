#!/usr/bin/env node
// audit-internal-links.mjs — orphan / internal-link reachability for money pages (Handoff §7.2).
// Read-only. Crawls priority pages, aggregates internal links, flags priority service
// pages that receive no inbound link from the crawled set (orphan risk).
// Usage: node seo/scripts/audit-internal-links.mjs [--base URL]

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { BASE, fetchRaw, parseHtml, sleep } from "./lib/crawl.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));

function priorityUrls() {
	const tax = JSON.parse(
		readFileSync(
			join(__dirname, "..", "config", "service-taxonomy.json"),
			"utf8",
		),
	);
	const urls = new Set();
	for (const pillar of Object.values(tax.pillars)) {
		if (pillar.hub) urls.add(pillar.hub);
		for (const s of pillar.services) if (s.primary_url) urls.add(s.primary_url);
	}
	return [...urls];
}

async function main() {
	const i = process.argv.indexOf("--base");
	const base = i > -1 ? process.argv[i + 1] : BASE;
	const seeds = ["/", ...priorityUrls()];
	const inbound = new Map();
	for (const u of priorityUrls()) inbound.set(u, 0);

	for (const path of seeds) {
		const r = await fetchRaw(base + path, { follow: false });
		if (r.status !== 200 || !r.contentType.includes("text/html")) continue;
		const p = parseHtml(r.body);
		for (const link of p.internalLinks || []) {
			const norm = link.replace(/\/$/, "");
			if (inbound.has(norm)) inbound.set(norm, inbound.get(norm) + 1);
		}
		await sleep(300);
	}

	const orphans = [...inbound.entries()]
		.filter(([, n]) => n === 0)
		.map(([u]) => u);
	process.stdout.write(
		"Internal-link inbound counts (priority pages, crawled seed set):\n",
	);
	for (const [u, n] of inbound)
		process.stdout.write(`  ${n === 0 ? "[ORPHAN]" : "        "} ${n}  ${u}\n`);
	if (orphans.length) {
		process.stdout.write(
			`\nWARN [P2]: ${orphans.length} priority page(s) with no inbound link in the crawled set: ${orphans.join(", ")}\n`,
		);
		process.stdout.write(
			"(Note: crawled seed set is small; confirm against full nav/footer before acting.)\n",
		);
	} else {
		process.stdout.write(
			"\nPASS: every priority page has >=1 inbound link in the crawled set.\n",
		);
	}
	process.exit(0);
}

main().catch((e) => {
	process.stdout.write(`audit-internal-links error: ${e}\n`);
	process.exit(1);
});
