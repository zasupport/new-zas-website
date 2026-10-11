// Sitemap integrity + search-index coverage (Handoff §5.2, §9-C).
// - No duplicate URLs in src/app/sitemap.ts (existing rule reinforced).
// - The build-time search index covers every sitemap path (search recall).
import assert from "node:assert";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..", "..");

function sitemapPaths(): string[] {
	const src = readFileSync(join(root, "src/app/sitemap.ts"), "utf8");
	const paths = new Set<string>(["/"]);
	for (const m of src.matchAll(/\$\{base\}(\/[^`'"]*)/g)) {
		const p = m[1].replace(/\/$/, "") || "/";
		if (
			!p.startsWith("/api") &&
			!p.startsWith("/studio") &&
			!p.startsWith("/admin")
		)
			paths.add(p);
	}
	return [...paths];
}

test("sitemap.ts has no duplicate URL paths", () => {
	const src = readFileSync(join(root, "src/app/sitemap.ts"), "utf8");
	const urls = [...src.matchAll(/url:\s*`([^`]+)`/g)].map((m) => m[1]);
	const seen = new Set<string>();
	const dupes: string[] = [];
	for (const u of urls) {
		if (seen.has(u)) dupes.push(u);
		seen.add(u);
	}
	assert.deepEqual(dupes, [], `duplicate sitemap URLs: ${dupes.join(", ")}`);
});

test("build-search-index generates an index covering every sitemap path", () => {
	execFileSync("node", ["seo/scripts/build-search-index.mjs"], { cwd: root });
	const idxPath = join(root, "public/search-index.json");
	assert.ok(existsSync(idxPath), "search-index.json must exist after build");
	const idx = JSON.parse(readFileSync(idxPath, "utf8"));
	const indexed = new Set(idx.entries.map((e: { path: string }) => e.path));
	const missing = sitemapPaths().filter((p) => !indexed.has(p));
	assert.deepEqual(
		missing,
		[],
		`sitemap paths missing from search index: ${missing.slice(0, 5).join(", ")}`,
	);
});
