#!/usr/bin/env node
// gsc-cannibalisation-report.mjs — detect multiple URLs ranking for one query (Handoff §7.3, §9-G).
// HONEST: needs a GSC query×page export. Without it, reports the STRUCTURAL
// cannibalisation candidates from seo/config/intent-map.json (which records the
// historic SERP overlaps) and marks them "needs current GSC confirmation".
//
// Input: --csv <query,page,clicks,impressions,position> export, or $GSC_QUERY_PAGE_CSV.

import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
function arg(name) {
	const i = process.argv.indexOf(name);
	return i > -1 ? process.argv[i + 1] : undefined;
}

function fromExport(csv) {
	const lines = readFileSync(csv, "utf8").trim().split(/\r?\n/);
	const header = lines[0].split(",").map((h) => h.trim().toLowerCase());
	const col = (n) => header.findIndex((h) => h.includes(n));
	const iQ = col("quer");
	const iP = col("page");
	const byQuery = new Map();
	for (const line of lines.slice(1)) {
		const c = line.split(",");
		const q = (c[iQ] || "").trim();
		const p = (c[iP] || "").trim();
		if (!q || !p) continue;
		if (!byQuery.has(q)) byQuery.set(q, new Set());
		byQuery.get(q).add(p);
	}
	return [...byQuery.entries()].filter(([, pages]) => pages.size > 1);
}

function main() {
	const csv = arg("--csv") || process.env.GSC_QUERY_PAGE_CSV;
	process.stdout.write("# GSC Cannibalisation Report\n\n");
	if (csv && existsSync(csv)) {
		const cannibals = fromExport(csv)
			.sort((a, b) => b[1].size - a[1].size)
			.slice(0, 40);
		process.stdout.write(`**Source:** ${csv} (live GSC)\n\n`);
		process.stdout.write(
			"| Query | # competing URLs | URLs |\n|---|--:|---|\n",
		);
		for (const [q, pages] of cannibals) {
			process.stdout.write(
				`| ${q} | ${pages.size} | ${[...pages].slice(0, 4).join("<br>")} |\n`,
			);
		}
		process.stdout.write(
			`\n${cannibals.length} queries with >1 ranking URL.\n`,
		);
		process.exit(0);
	}
	// Fallback: structural candidates from intent-map (historic SERP overlaps).
	const intent = JSON.parse(
		readFileSync(join(__dirname, "..", "config", "intent-map.json"), "utf8"),
	);
	process.stdout.write(
		"**Status: NO LIVE GSC EXPORT** — showing structural candidates from intent-map.json (historic SERP overlaps). Confirm with current GSC query×page export.\n\n",
	);
	process.stdout.write(
		"| Intent | Canonical | Historic overlap |\n|---|---|---|\n",
	);
	for (const c of intent.clusters) {
		if (c.historic_serp || (c.note && /cannibal/i.test(c.note))) {
			process.stdout.write(
				`| ${c.intent} | ${c.canonical} | ${c.historic_serp || c.note} |\n`,
			);
		}
	}
	process.exit(0);
}

main();
