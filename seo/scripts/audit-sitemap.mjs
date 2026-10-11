#!/usr/bin/env node
// audit-sitemap.mjs — sitemap membership + lastmod integrity (Handoff §5.2, §9-D).
// Read-only. Flags: identical build-time lastmod, non-200 sample, non-self canonical.
// Exit 2 if a hard integrity check fails (CI gate). Usage:
//   node seo/scripts/audit-sitemap.mjs [--base URL] [--sample N]

import {
	BASE,
	fetchRaw,
	parseHtml,
	parseSitemapLocs,
	sleep,
} from "./lib/crawl.mjs";

function arg(name, def) {
	const i = process.argv.indexOf(name);
	return i > -1 ? process.argv[i + 1] : def;
}

async function main() {
	const base = arg("--base", BASE);
	const sampleN = parseInt(arg("--sample", "12"), 10);
	const sm = await fetchRaw(`${base}/sitemap.xml`, { follow: true });
	if (sm.status !== 200) {
		process.stdout.write(`FAIL: sitemap.xml returned ${sm.status}\n`);
		process.exit(2);
	}
	const locs = parseSitemapLocs(sm.body);
	const lastmods = [...sm.body.matchAll(/<lastmod>([^<]+)<\/lastmod>/gi)].map(
		(m) => m[1],
	);
	const distinctLastmod = new Set(lastmods);

	const findings = [];
	// Integrity: identical lastmod across all URLs = build-time, not real modification.
	if (lastmods.length > 1 && distinctLastmod.size === 1) {
		findings.push({
			severity: "P2",
			check: "lastmod-integrity",
			detail: `All ${lastmods.length} <lastmod> are identical (${[...distinctLastmod][0]}) — build time, not real content modification. Make truthful per-URL or omit.`,
		});
	}

	// Sample a spread of URLs for status + self-canonical.
	const step = Math.max(1, Math.floor(locs.length / sampleN));
	const sample = locs.filter((_, i) => i % step === 0).slice(0, sampleN);
	const badStatus = [];
	const badCanonical = [];
	for (const loc of sample) {
		const r = await fetchRaw(loc, { follow: false });
		if (r.status !== 200) badStatus.push({ loc, status: r.status });
		if (r.contentType.includes("text/html")) {
			const p = parseHtml(r.body);
			const canon = (p.canonical || "").replace(/\/$/, "");
			const self = loc.replace(/\/$/, "");
			if (canon && canon !== self)
				badCanonical.push({ loc, canonical: p.canonical });
		}
		await sleep(300);
	}
	if (badStatus.length)
		findings.push({
			severity: "P1",
			check: "sitemap-status",
			detail: `Non-200 sitemap URLs (sampled): ${JSON.stringify(badStatus)}`,
		});
	if (badCanonical.length)
		findings.push({
			severity: "P2",
			check: "sitemap-canonical",
			detail: `Sitemap URLs whose canonical != self (sampled): ${JSON.stringify(badCanonical)}`,
		});

	process.stdout.write(
		`sitemap.xml: ${locs.length} URLs, ${distinctLastmod.size} distinct lastmod, sampled ${sample.length}\n`,
	);
	for (const f of findings)
		process.stdout.write(`  [${f.severity}] ${f.check}: ${f.detail}\n`);
	if (!findings.length)
		process.stdout.write("  PASS: no sitemap integrity findings\n");

	// Hard-fail only on P1 (broken sitemap URL). P2 is a warning in baseline mode.
	const hard = findings.some((f) => f.severity === "P1");
	process.exit(hard ? 2 : 0);
}

main().catch((e) => {
	process.stdout.write(`audit-sitemap error: ${e}\n`);
	process.exit(1);
});
