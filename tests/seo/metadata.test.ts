// Metadata policy + search acceptance (Handoff §9-D, §10).
import assert from "node:assert";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { rankIndex } from "../../seo/scripts/lib/detectors.mjs";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..", "..");
const policy = JSON.parse(
	readFileSync(join(root, "seo/config/seo-policy.json"), "utf8"),
);

test("policy forbids meta keywords", () => {
	assert.equal(
		policy.metadata_policy.meta_keywords,
		"forbidden_remove_if_present",
	);
});

test("policy forbids self-serving AggregateRating", () => {
	assert.equal(policy.schema_policy.aggregate_rating_selfmarkup, "forbidden");
});

test("facts-register.json validates against its own required fields", () => {
	const reg = JSON.parse(
		readFileSync(join(root, "seo/config/facts-register.json"), "utf8"),
	);
	for (const e of reg.entries) {
		for (const f of [
			"claim_id",
			"claim_class",
			"scope",
			"source_of_truth",
			"approved_value",
		]) {
			assert.ok(f in e, `${e.claim_id} missing ${f}`);
		}
	}
});

test("search acceptance: every fixture query resolves to expected content", () => {
	execFileSync("node", ["seo/scripts/build-search-index.mjs"], { cwd: root });
	const idx = JSON.parse(
		readFileSync(join(root, "public/search-index.json"), "utf8"),
	);
	const fx = JSON.parse(
		readFileSync(join(root, "seo/fixtures/search-fixtures.json"), "utf8"),
	);
	for (const c of fx.cases) {
		const results = rankIndex(idx.entries, c.query);
		assert.ok(results.length > 0, `query "${c.query}" returned no results`);
		assert.ok(
			results.some((r: { path: string }) =>
				r.path.includes(c.expect_path_contains),
			),
			`query "${c.query}" missing a result containing "${c.expect_path_contains}" (top: ${results
				.slice(0, 3)
				.map((r: { path: string }) => r.path)
				.join(", ")})`,
		);
	}
	for (const q of fx.empty_cases)
		assert.deepEqual(
			rankIndex(idx.entries, q),
			[],
			`empty query "${q}" must return []`,
		);
	for (const q of fx.no_result_cases)
		assert.deepEqual(
			rankIndex(idx.entries, q),
			[],
			`nonsense query "${q}" must return []`,
		);
});
