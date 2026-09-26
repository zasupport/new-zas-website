// Self-test for the mobile-nav verdict logic (run: node --test).
// §704 positive + negative + absence controls. These prove the gate is REAL:
// a login wall, the exact 1725px viewport trap that blocked us, a 3-child list,
// a missing hamburger, and overflow must each score non-PASS. Only a fully-proven
// 390px pass scores PASS.

import assert from "node:assert/strict";
import { test } from "node:test";
import {
	assessMobileNav,
	EXPECTED_APPLE_SUPPORT_CHILDREN,
	TARGET_WIDTH,
} from "./lib/mobile-nav-verdict.mjs";

const good = {
	effectiveInnerWidth: TARGET_WIDTH,
	isLoginWall: false,
	hamburgerOpens: true,
	hamburgerCloses: true,
	appleSupportChildLabels: [...EXPECTED_APPLE_SUPPORT_CHILDREN],
	representativeLinkReached: true,
	keyboardFocusVisible: true,
	focusEnteredHiddenControls: false,
	horizontalOverflow: false,
};

test("positive control: a fully-proven 390 pack scores PASS", () => {
	assert.equal(assessMobileNav(good).verdict, "PASS");
});

test("negative: login wall scores BLOCKED, never PASS", () => {
	const r = assessMobileNav({ ...good, isLoginWall: true });
	assert.equal(r.verdict, "BLOCKED");
});

test("negative: the exact 1725px viewport trap scores FAIL, never PASS", () => {
	const r = assessMobileNav({ ...good, effectiveInnerWidth: 1725 });
	assert.equal(r.verdict, "FAIL");
	assert.match(r.reasons.join(" "), /1725/);
});

test("negative: only 3 Apple Support children scores FAIL", () => {
	const r = assessMobileNav({
		...good,
		appleSupportChildLabels: EXPECTED_APPLE_SUPPORT_CHILDREN.slice(0, 3),
	});
	assert.equal(r.verdict, "FAIL");
});

test("negative: an unexpected extra child scores FAIL", () => {
	const r = assessMobileNav({
		...good,
		appleSupportChildLabels: [
			...EXPECTED_APPLE_SUPPORT_CHILDREN,
			"AirPods Repair",
		],
	});
	assert.equal(r.verdict, "FAIL");
});

test("negative: hamburger that does not open scores FAIL", () => {
	assert.equal(
		assessMobileNav({ ...good, hamburgerOpens: false }).verdict,
		"FAIL",
	);
});

test("negative: hamburger that does not close scores FAIL", () => {
	assert.equal(
		assessMobileNav({ ...good, hamburgerCloses: false }).verdict,
		"FAIL",
	);
});

test("negative: focus entering hidden controls scores FAIL", () => {
	assert.equal(
		assessMobileNav({ ...good, focusEnteredHiddenControls: true }).verdict,
		"FAIL",
	);
});

test("negative: no visible focus scores FAIL", () => {
	assert.equal(
		assessMobileNav({ ...good, keyboardFocusVisible: false }).verdict,
		"FAIL",
	);
});

test("negative: horizontal overflow scores FAIL", () => {
	assert.equal(
		assessMobileNav({ ...good, horizontalOverflow: true }).verdict,
		"FAIL",
	);
});

test("negative: representative link not reached scores FAIL", () => {
	assert.equal(
		assessMobileNav({ ...good, representativeLinkReached: false }).verdict,
		"FAIL",
	);
});

test("absence control: empty input scores FAIL, never PASS", () => {
	assert.equal(assessMobileNav({}).verdict, "FAIL");
	assert.equal(assessMobileNav().verdict, "FAIL");
});
