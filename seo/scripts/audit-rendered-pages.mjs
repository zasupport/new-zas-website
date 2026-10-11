#!/usr/bin/env node
// audit-rendered-pages.mjs — per-URL rendered SEO record as markdown (Handoff §9-A step 5).
// Read-only. Emits title/OG/canonical/robots/H1/schema/link-count per priority URL and
// flags title!=og and meta-keywords presence. Usage: node seo/scripts/audit-rendered-pages.mjs [--base URL]

import { BASE, fetchRaw, parseHtml, sleep } from "./lib/crawl.mjs";

const PATHS = [
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
];

async function main() {
	const i = process.argv.indexOf("--base");
	const base = i > -1 ? process.argv[i + 1] : BASE;
	process.stdout.write(
		"| Path | Status | Canonical self | robots | title!=OG | metaKw | JSON-LD types |\n",
	);
	process.stdout.write("|---|--:|:--:|---|:--:|:--:|---|\n");
	for (const path of PATHS) {
		const r = await fetchRaw(base + path, { follow: false });
		if (r.status !== 200 || !r.contentType.includes("text/html")) {
			process.stdout.write(`| ${path} | ${r.status} | — | — | — | — | — |\n`);
			continue;
		}
		const p = parseHtml(r.body);
		const canon = (p.canonical || "").replace(/\/$/, "");
		const self = (base + path).replace(/\/$/, "");
		const selfOk = canon === self ? "yes" : "NO";
		const titleOg =
			p.title && p.ogTitle && p.title !== p.ogTitle ? "YES" : "no";
		const metaKw = p.metaKeywords ? "YES" : "no";
		process.stdout.write(
			`| ${path} | ${r.status} | ${selfOk} | ${(p.robotsMeta || "").split(",")[0]} | ${titleOg} | ${metaKw} | ${(p.jsonldTypes || []).join(", ")} |\n`,
		);
		await sleep(300);
	}
	process.exit(0);
}

main().catch((e) => {
	process.stdout.write(`audit-rendered-pages error: ${e}\n`);
	process.exit(1);
});
