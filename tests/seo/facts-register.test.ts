// Facts-register claim enforcement (Handoff §4, Phase B).
// Positive: approved-wording fixture produces zero conflicts.
// Negative: dirty fixture (16 years / 645+632 / "included in the total") IS flagged.
// Absence: an empty register or empty text never crashes.
import assert from "node:assert";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { scanClaims } from "../../seo/scripts/lib/detectors.mjs";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..", "..");
const register = JSON.parse(
	readFileSync(join(root, "seo/config/facts-register.json"), "utf8"),
);
const strip = (html: string) => html.replace(/<[^>]+>/g, " ");

test("positive control: approved-wording fixture has zero conflicts", () => {
	const html = readFileSync(
		join(root, "seo/fixtures/claims-clean.html"),
		"utf8",
	);
	const hits = scanClaims(strip(html), register);
	assert.deepEqual(
		hits,
		[],
		`expected no conflicts, got ${JSON.stringify(hits)}`,
	);
});

test("negative control: dirty fixture IS flagged (16y, review figures, included-in-total)", () => {
	const html = readFileSync(
		join(root, "seo/fixtures/claims-dirty.html"),
		"utf8",
	);
	const hits = scanClaims(strip(html), register);
	const ids = new Set(hits.map((h: { claim_id: string }) => h.claim_id));
	assert.ok(hits.length > 0, "expected conflicts, got none");
	assert.ok(
		ids.has("FR-001"),
		"must flag establishment-duration claim (FR-001)",
	);
	assert.ok(ids.has("FR-005"), "must flag hard-coded review figures (FR-005)");
	assert.ok(
		ids.has("FR-008"),
		'must flag "assessment fee included in total" (FR-008)',
	);
	assert.ok(
		ids.has("FR-009"),
		"must flag positive AASP claim outside negation (FR-009)",
	);
});

test("FR-009: correct negation is NOT a false positive", () => {
	const ok =
		"ZA Support is an independent Apple specialist, not an Apple Authorised Service Provider.";
	const hits = scanClaims(ok.toLowerCase(), register);
	assert.ok(
		!hits.some((h: { claim_id: string }) => h.claim_id === "FR-009"),
		"negation must not be flagged",
	);
});

test("absence control: empty text and empty register do not crash", () => {
	assert.deepEqual(scanClaims("", register), []);
	assert.deepEqual(scanClaims("anything", { entries: [] }), []);
});

test("register conforms to required shape", () => {
	for (const e of register.entries) {
		assert.match(e.claim_id, /^FR-\d{3}$/);
		assert.ok(
			e.claim_class && e.scope && e.source_of_truth,
			`entry ${e.claim_id} missing required field`,
		);
	}
});
