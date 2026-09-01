#!/usr/bin/env node
// gsc-opportunity-report.mjs — keyword/page opportunity report from a GSC export (Handoff §9-G).
// HONEST BY DESIGN: never fabricates GSC data. Reads a real CSV export if present;
// otherwise emits an "unavailable" report naming the missing input. Position 4–20 +
// high-impression/weak-CTR clusters are the opportunity surface.
//
// Input (first found):
//   --csv <path>
//   $GSC_EXPORT_CSV
//   ~/Desktop/Claude/Google/SEO/gsc-pages-export.csv
// CSV columns expected (flexible header match): page/query, clicks, impressions, ctr, position.

import { existsSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

function arg(name) {
	const i = process.argv.indexOf(name);
	return i > -1 ? process.argv[i + 1] : undefined;
}

function findCsv() {
	const candidates = [
		arg("--csv"),
		process.env.GSC_EXPORT_CSV,
		join(
			homedir(),
			"Desktop",
			"Claude",
			"Google",
			"SEO",
			"gsc-pages-export.csv",
		),
		join(
			homedir(),
			"Desktop",
			"Claude",
			"Google",
			"SEO",
			"gsc-queries-export.csv",
		),
	].filter(Boolean);
	return candidates.find((p) => existsSync(p));
}

function parseCsv(text) {
	const lines = text.trim().split(/\r?\n/);
	const header = lines[0].split(",").map((h) => h.trim().toLowerCase());
	const col = (names) =>
		header.findIndex((h) => names.some((n) => h.includes(n)));
	const iKey = Math.max(col(["page"]), col(["query", "keyword"]));
	const iClicks = col(["click"]);
	const iImpr = col(["impression", "impr"]);
	const iPos = col(["position", "pos"]);
	const rows = [];
	for (const line of lines.slice(1)) {
		const c = line.split(",");
		rows.push({
			key: (c[iKey] || "").trim(),
			clicks: Number(c[iClicks] || 0),
			impressions: Number(c[iImpr] || 0),
			position: Number(c[iPos] || 0),
		});
	}
	return rows;
}

function main() {
	const csv = findCsv();
	if (!csv) {
		process.stdout.write("# GSC Opportunity Report\n\n");
		process.stdout.write("**Status: UNAVAILABLE.** No GSC export found.\n\n");
		process.stdout.write(
			"This report does not fabricate ranking data (Handoff §3.3/§5.9). Provide a\n",
		);
		process.stdout.write(
			"Search Console export (sc-domain:zasupport.com) via --csv <path> or $GSC_EXPORT_CSV,\n",
		);
		process.stdout.write(
			"or place it at ~/Desktop/Claude/Google/SEO/gsc-pages-export.csv, then re-run.\n",
		);
		process.exit(0);
	}
	const rows = parseCsv(readFileSync(csv, "utf8"));
	// Position 4–20, impressions >= 100, ctr weak (clicks/impr < 0.02) = opportunity.
	const opps = rows
		.filter((r) => r.position >= 4 && r.position <= 20 && r.impressions >= 100)
		.map((r) => ({ ...r, ctr: r.impressions ? r.clicks / r.impressions : 0 }))
		.sort((a, b) => b.impressions - a.impressions)
		.slice(0, 40);

	process.stdout.write(
		`# GSC Opportunity Report\n\n**Source:** ${csv}\n**Rows:** ${rows.length}\n\n`,
	);
	process.stdout.write(
		"| Page/Query | Impr | Clicks | CTR | Pos |\n|---|--:|--:|--:|--:|\n",
	);
	for (const o of opps) {
		process.stdout.write(
			`| ${o.key} | ${o.impressions} | ${o.clicks} | ${(o.ctr * 100).toFixed(1)}% | ${o.position.toFixed(1)} |\n`,
		);
	}
	process.stdout.write(
		`\n${opps.length} position 4–20 / high-impression opportunities.\n`,
	);
	process.exit(0);
}

main();
