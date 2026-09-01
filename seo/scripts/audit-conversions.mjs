#!/usr/bin/env node
// audit-conversions.mjs — conversion-path health (Handoff §9-A, §10). Read-only.
// Checks that key action pages are 200 and expose a direct action route
// (tel: link, wa.me WhatsApp link, or a booking/quote form control).
// Usage: node seo/scripts/audit-conversions.mjs [--base URL]

import { BASE, fetchRaw, sleep } from "./lib/crawl.mjs";

const PAGES = [
	"/",
	"/book",
	"/contact",
	"/logic-board-repair",
	"/liquid-damage",
	"/battery-replacement",
	"/screen-repair",
];

async function main() {
	const i = process.argv.indexOf("--base");
	const base = i > -1 ? process.argv[i + 1] : BASE;
	const findings = [];
	for (const path of PAGES) {
		const r = await fetchRaw(base + path, { follow: false });
		if (r.status !== 200) {
			findings.push({ severity: "P0", path, detail: `status ${r.status}` });
			continue;
		}
		const html = r.body || "";
		const hasTel = /href=["']tel:/i.test(html);
		const hasWa = /wa\.me\//i.test(html) || /whatsapp/i.test(html);
		const hasForm =
			/<form/i.test(html) || /\/book/i.test(html) || /quote/i.test(html);
		if (!hasTel && !hasWa && !hasForm) {
			findings.push({
				severity: "P1",
				path,
				detail: "no tel/WhatsApp/booking action route detected",
			});
		} else {
			process.stdout.write(
				`  OK  ${path}  tel=${hasTel} wa=${hasWa} form/book=${hasForm}\n`,
			);
		}
		await sleep(300);
	}
	for (const f of findings)
		process.stdout.write(`  [${f.severity}] ${f.path}: ${f.detail}\n`);
	const hard = findings.some((f) => f.severity === "P0");
	process.stdout.write(
		hard
			? "\nFAIL: a conversion page is not reachable.\n"
			: "\nPASS: action routes present on reachable pages.\n",
	);
	process.exit(hard ? 2 : 0);
}

main().catch((e) => {
	process.stdout.write(`audit-conversions error: ${e}\n`);
	process.exit(1);
});
