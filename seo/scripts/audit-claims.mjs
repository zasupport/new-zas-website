#!/usr/bin/env node
// audit-claims.mjs — Facts-Register enforcement (Handoff §4, Phase B).
// Scans live pages (or a local HTML/text file) for prohibited claim variants declared
// in seo/config/facts-register.json. Two modes:
//   default (warning): report conflicts, exit 0  -- baseline reconciliation phase
//   --block          : exit 2 on any prohibited-variant hit  -- post-reconciliation CI
// Usage:
//   node seo/scripts/audit-claims.mjs [--base URL] [--paths a,b] [--block]
//   node seo/scripts/audit-claims.mjs --file path/to/file.html [--block]

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { BASE, fetchRaw, sleep } from "./lib/crawl.mjs";
import { scanClaims } from "./lib/detectors.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const registerPath = join(__dirname, "..", "config", "facts-register.json");

function arg(name, def) {
	const i = process.argv.indexOf(name);
	return i > -1 ? process.argv[i + 1] : def;
}
const has = (name) => process.argv.includes(name);

function stripTags(html) {
	return html
		.replace(/<script[\s\S]*?<\/script>/gi, " ")
		.replace(/<style[\s\S]*?<\/style>/gi, " ")
		.replace(/<[^>]+>/g, " ");
}

const scan = (text, register) => scanClaims(text, register);

async function main() {
	const register = JSON.parse(readFileSync(registerPath, "utf8"));
	const block = has("--block");
	const allHits = [];

	if (has("--file")) {
		const f = arg("--file");
		const raw = readFileSync(f, "utf8");
		const text = /\.html?$/.test(f) ? stripTags(raw) : raw;
		const hits = scan(text, register);
		for (const h of hits) allHits.push({ where: f, ...h });
	} else {
		const base = arg("--base", BASE);
		const paths = (arg("--paths", "/") || "/").split(",");
		for (const path of paths) {
			const r = await fetchRaw(base + path, { follow: false });
			if (r.status !== 200) {
				process.stdout.write(`  skip ${path} (status ${r.status})\n`);
				continue;
			}
			const hits = scan(stripTags(r.body), register);
			for (const h of hits) allHits.push({ where: path, ...h });
			await sleep(300);
		}
	}

	if (!allHits.length) {
		process.stdout.write("PASS: no prohibited claim variants found.\n");
		process.exit(0);
	}
	process.stdout.write(
		`Facts-register conflicts (${block ? "BLOCKING" : "warning"} mode):\n`,
	);
	for (const h of allHits) {
		process.stdout.write(
			`  ${h.where}: [${h.claim_id}] "${h.variant}" x${h.count}${h.note ? " — " + h.note : ""}\n`,
		);
	}
	process.exit(block ? 2 : 0);
}

main().catch((e) => {
	process.stdout.write(`audit-claims error: ${e}\n`);
	process.exit(1);
});
