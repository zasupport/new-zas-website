#!/usr/bin/env node
// audit-canonicals.mjs — host canonicalisation + per-page self-canonical (Handoff §5.1, §9-D).
// Read-only. Checks: www serves 200 vs 301-to-apex; each priority page self-canonical.
// Usage: node seo/scripts/audit-canonicals.mjs [--base URL]

import { BASE, fetchRaw, parseHtml, sleep } from "./lib/crawl.mjs";

const PRIORITY = [
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
];

async function main() {
	const i = process.argv.indexOf("--base");
	const base = i > -1 ? process.argv[i + 1] : BASE;
	const findings = [];

	// Host canonical: www should 301 to apex, not serve 200.
	const wwwBase = base.replace("://", "://www.");
	const www = await fetchRaw(`${wwwBase}/`, { follow: false });
	if (www.status === 200) {
		findings.push({
			severity: "P1",
			check: "www-host",
			detail: `${wwwBase}/ serves HTTP 200 directly (no 301 to apex). One-hop 301 recommended (approval-gated).`,
		});
	} else if (www.status >= 300 && www.status < 400) {
		const loc = (www.location || "").replace(/\/$/, "");
		if (loc && !loc.startsWith(base)) {
			findings.push({
				severity: "P1",
				check: "www-host",
				detail: `${wwwBase}/ redirects to ${www.location}, not apex ${base}.`,
			});
		}
	}

	// Per-page self-canonical.
	for (const path of PRIORITY) {
		const r = await fetchRaw(base + path, { follow: false });
		if (r.status !== 200) {
			findings.push({
				severity: "P1",
				check: "status",
				detail: `${path} -> ${r.status}`,
			});
			continue;
		}
		const p = parseHtml(r.body);
		const canon = (p.canonical || "").replace(/\/$/, "");
		const self = (base + path).replace(/\/$/, "");
		if (!canon)
			findings.push({
				severity: "P2",
				check: "canonical-missing",
				detail: `${path} has no canonical`,
			});
		else if (canon !== self)
			findings.push({
				severity: "P2",
				check: "canonical-mismatch",
				detail: `${path} canonical=${p.canonical} (self=${self})`,
			});
		await sleep(300);
	}

	process.stdout.write(`canonical audit: ${findings.length} finding(s)\n`);
	for (const f of findings)
		process.stdout.write(`  [${f.severity}] ${f.check}: ${f.detail}\n`);
	if (!findings.length) process.stdout.write("  PASS\n");
	// Report-only in baseline mode (host redirect change is approval-gated, not auto-blocking).
	process.exit(0);
}

main().catch((e) => {
	process.stdout.write(`audit-canonicals error: ${e}\n`);
	process.exit(1);
});
