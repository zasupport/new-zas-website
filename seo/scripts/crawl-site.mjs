#!/usr/bin/env node
// crawl-site.mjs — Phase A read-only crawl of the mandated URL set (Handoff §9 Phase A).
// Records status, canonical, robots, title/description/OG, H1, JSON-LD types and
// internal links per URL. Writes a dated JSON report under seo/reports/.
// NO production changes. Usage: node seo/scripts/crawl-site.mjs [--base https://...]

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { BASE, fetchRaw, nowIso, parseHtml, sleep } from "./lib/crawl.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..", "..");

// Mandated Phase A URL set + priority money pages.
const PHASE_A_PATHS = [
	"/",
	"/apple-repair",
	"/iphone-repair",
	"/macbook-repair",
	"/logic-board-repair",
	"/liquid-damage",
	"/battery-replacement",
	"/screen-repair",
	"/imac-repair",
	"/mac-mini-repair",
	"/book",
	"/contact",
	"/business",
	"/search?q=Logic%20board",
	"/robots.txt",
	"/sitemap.xml",
];

async function main() {
	const argBase = process.argv.indexOf("--base");
	const base = argBase > -1 ? process.argv[argBase + 1] : BASE;
	const records = [];

	for (const path of PHASE_A_PATHS) {
		const url = base + path;
		try {
			const r = await fetchRaw(url, { follow: false });
			const isHtml = r.contentType.includes("text/html");
			const parsed = isHtml ? parseHtml(r.body) : {};
			records.push({
				path,
				url,
				status: r.status,
				redirectLocation: r.location,
				contentType: r.contentType,
				bytes: r.body.length,
				...parsed,
				jsonldBlocks: undefined, // keep report lean; types retained
			});
			process.stderr.write(`  ${r.status}  ${path}\n`);
		} catch (e) {
			records.push({
				path,
				url,
				status: "ERROR",
				error: String(e && e.message ? e.message : e),
			});
			process.stderr.write(`  ERR  ${path}  ${e}\n`);
		}
		await sleep(400); // politeness
	}

	const report = { generated: nowIso(), base, count: records.length, records };
	const stamp = new Date().toISOString().slice(0, 10);
	const outDir = join(repoRoot, "seo", "reports");
	mkdirSync(outDir, { recursive: true });
	const outFile = join(outDir, `crawl-${stamp}.json`);
	writeFileSync(outFile, JSON.stringify(report, null, 2));
	process.stdout.write(`\nWrote ${outFile}  (${records.length} URLs)\n`);
	return outFile;
}

main().catch((e) => {
	process.stderr.write(`crawl-site failed: ${e}\n`);
	process.exit(1);
});
