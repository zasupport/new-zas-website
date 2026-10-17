#!/usr/bin/env node
// audit-content-duplication.mjs — duplicate title/description/H1 across templates (Handoff §9-A, §9-E).
// Read-only. Flags exact-duplicate title/description/H1 and generic shared og:title.
// Usage: node seo/scripts/audit-content-duplication.mjs [--base URL] [--paths a,b]

import { BASE, fetchRaw, parseHtml, sleep } from "./lib/crawl.mjs";

const DEFAULT = [
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
	"/business",
	"/book",
	"/contact",
];

function dupes(map) {
	const byVal = new Map();
	for (const [path, val] of Object.entries(map)) {
		if (!val) continue;
		if (!byVal.has(val)) byVal.set(val, []);
		byVal.get(val).push(path);
	}
	return [...byVal.entries()].filter(([, paths]) => paths.length > 1);
}

async function main() {
	const bi = process.argv.indexOf("--base");
	const base = bi > -1 ? process.argv[bi + 1] : BASE;
	const pi = process.argv.indexOf("--paths");
	const paths = pi > -1 ? process.argv[pi + 1].split(",") : DEFAULT;

	const titles = {};
	const descs = {};
	const ogTitles = {};
	const h1s = {};
	for (const path of paths) {
		const r = await fetchRaw(base + path, { follow: false });
		if (r.status !== 200 || !r.contentType.includes("text/html")) continue;
		const p = parseHtml(r.body);
		titles[path] = p.title;
		descs[path] = p.description;
		ogTitles[path] = p.ogTitle;
		h1s[path] = p.h1;
		await sleep(300);
	}

	const report = {
		title: dupes(titles),
		description: dupes(descs),
		h1: dupes(h1s),
		ogTitle: dupes(ogTitles),
	};
	let findings = 0;
	for (const [kind, groups] of Object.entries(report)) {
		for (const [val, ps] of groups) {
			findings++;
			process.stdout.write(
				`  [P2] duplicate ${kind}: ${JSON.stringify(val).slice(0, 70)} on ${ps.join(", ")}\n`,
			);
		}
	}
	if (!findings)
		process.stdout.write(
			"  PASS: no duplicate title/description/H1/og:title in sampled pages\n",
		);
	else
		process.stdout.write(
			`  ${findings} duplication finding(s) — report-only (P2)\n`,
		);
	process.exit(0);
}

main().catch((e) => {
	process.stdout.write(`audit-content-duplication error: ${e}\n`);
	process.exit(1);
});
