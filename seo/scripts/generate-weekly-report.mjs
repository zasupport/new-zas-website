#!/usr/bin/env node
// generate-weekly-report.mjs — non-destructive weekly audit aggregator (Handoff §9-G, §9-H).
// Runs the read-only audits against production, captures their output, and writes a dated
// markdown report to seo/reports/. NO edits, NO deploys. Exit 0 always (report is the artefact);
// individual audit exit codes are recorded inside the report.
// Usage: node seo/scripts/generate-weekly-report.mjs [--base URL]

import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..", "..");

const bi = process.argv.indexOf("--base");
const base = bi > -1 ? process.argv[bi + 1] : "https://zasupport.com";

const AUDITS = [
	["Search (P0)", "audit-search.mjs"],
	["Sitemap integrity", "audit-sitemap.mjs"],
	["Canonical / host", "audit-canonicals.mjs"],
	["Schema", "audit-schema.mjs"],
	["Content duplication", "audit-content-duplication.mjs"],
	["Internal links", "audit-internal-links.mjs"],
	["Conversions", "audit-conversions.mjs"],
	["Claims (homepage)", "audit-claims.mjs"],
];

function run(script) {
	const args =
		script === "audit-claims.mjs"
			? [join(__dirname, script), "--paths", "/", "--base", base]
			: [join(__dirname, script), "--base", base];
	const res = spawnSync("node", args, { encoding: "utf8", timeout: 120000 });
	return { code: res.status, out: (res.stdout || "") + (res.stderr || "") };
}

function main() {
	const stamp = new Date().toISOString();
	const date = stamp.slice(0, 10);
	let md = `# Weekly SEO Audit — ${date}\n\n**Base:** ${base}\n**Generated:** ${stamp} (read-only; no production change)\n\n`;
	md += "| Audit | Exit | Verdict |\n|---|--:|---|\n";
	const sections = [];
	for (const [name, script] of AUDITS) {
		const { code, out } = run(script);
		const verdict =
			code === 0 ? "PASS/report" : code === 2 ? "FINDING (gate)" : "ERROR";
		md += `| ${name} | ${code ?? "?"} | ${verdict} |\n`;
		sections.push(
			`## ${name} (exit ${code})\n\n\`\`\`\n${out.trim()}\n\`\`\`\n`,
		);
	}
	md += `\n${sections.join("\n")}`;
	md +=
		"\n---\nNo automatic edits or deployments were made. Material regressions require an approval-gated PR (Handoff §9-H).\n";

	const outDir = join(repoRoot, "seo", "reports");
	mkdirSync(outDir, { recursive: true });
	const outFile = join(outDir, `weekly-audit-${date}.md`);
	writeFileSync(outFile, md);
	process.stdout.write(`Wrote ${outFile}\n`);
	process.exit(0);
}

main();
