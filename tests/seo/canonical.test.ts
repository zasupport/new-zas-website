// Canonical + noindex policy (offline) (Handoff §9-D, §5.5).
// Asserts the declared policy is internally consistent and the search index is
// apex-canonical. Live host/redirect behaviour is checked by audit-canonicals.mjs.
import assert from "node:assert";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..", "..");
const noindex = JSON.parse(
	readFileSync(join(root, "seo/config/noindex-rules.json"), "utf8"),
);

test("/search is declared must-be-noindex", () => {
	assert.ok(
		noindex.must_be_noindex.some((r: { pattern: string }) =>
			r.pattern.includes("search"),
		),
	);
});

test("search page component sets robots noindex", () => {
	const page = readFileSync(join(root, "src/app/search/page.tsx"), "utf8");
	assert.match(page, /robots:\s*\{\s*index:\s*false/);
});

test("every search-index entry is apex-canonical (no www, no other host)", () => {
	execFileSync("node", ["seo/scripts/build-search-index.mjs"], { cwd: root });
	const idx = JSON.parse(
		readFileSync(join(root, "public/search-index.json"), "utf8"),
	);
	const bad = idx.entries.filter(
		(e: { url: string }) => !e.url.startsWith("https://zasupport.com"),
	);
	assert.deepEqual(
		bad,
		[],
		"all index URLs must be apex https://zasupport.com",
	);
});
