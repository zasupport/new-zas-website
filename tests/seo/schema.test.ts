// Schema self-serving AggregateRating detector (Handoff §5.4, §166).
// Positive: clean ComputerRepairService JSON-LD passes.
// Negative: LocalBusiness with aggregateRating IS detected.
// Absence: malformed JSON does not crash (returns false).
import assert from "node:assert";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { findSelfRating } from "../../seo/scripts/lib/detectors.mjs";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..", "..");

test("positive control: clean schema has no self-rating", () => {
	const clean = readFileSync(
		join(root, "seo/fixtures/schema-clean.json"),
		"utf8",
	);
	assert.equal(findSelfRating(clean), false);
});

test("negative control: aggregateRating on LocalBusiness IS detected", () => {
	const dirty = readFileSync(
		join(root, "seo/fixtures/schema-dirty.json"),
		"utf8",
	);
	assert.equal(findSelfRating(dirty), true);
});

test("negative control: bare Review node IS detected", () => {
	assert.equal(
		findSelfRating('{"@type":"Review","reviewRating":{"ratingValue":5}}'),
		true,
	);
});

test("absence control: malformed JSON returns false, no throw", () => {
	assert.equal(findSelfRating("{not valid json"), false);
	assert.equal(findSelfRating(""), false);
});
