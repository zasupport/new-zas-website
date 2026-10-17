// Pure, fail-closed verdict for the authenticated/local 390px mobile-nav pack.
//
// WHY THIS EXISTS (root cause it permanently fixes):
// Claude-in-Chrome could not drive the CSS viewport below the display width this
// session (measured innerWidth stayed ~1725 while a 390px window was requested;
// exact mechanism unconfirmed — resize_window was not driving the CSS viewport).
// So a real mobile breakpoint (<768) was unreachable through that tool and the
// 390px acceptance pack came back BLOCKED_TOOLING. Playwright device emulation
// sets the render viewport at the context level, independent of the display, so a
// genuine 390 CSS px viewport is always reachable and needs NO preview auth for
// client-side nav (it renders the candidate's own React).
//
// This module holds ONLY the decision logic, so it can be unit-tested with real
// negative controls (a login wall, a non-390 viewport, a short child list, a
// missing hamburger) that MUST NOT score PASS. The Playwright spec feeds it
// real measured values. Command success is never trusted — measured width is.

export const EXPECTED_APPLE_SUPPORT_CHILDREN = [
	"Apple Account Security Help",
	"Suspected Hacked Apple Device",
	"Mac Data Recovery",
	"Apple Trade-In Johannesburg",
];

export const TARGET_WIDTH = 390;
export const WIDTH_TOLERANCE = 8; // Playwright viewport is exact; small slack for scrollbar/rounding.

const norm = (s) =>
	String(s ?? "")
		.replace(/\s+/g, " ")
		.trim()
		.toLowerCase();

// m: {
//   effectiveInnerWidth:number, isLoginWall:boolean, hamburgerOpens:boolean,
//   hamburgerCloses:boolean, appleSupportChildLabels:string[],
//   representativeLinkReached:boolean, keyboardFocusVisible:boolean,
//   focusEnteredHiddenControls:boolean, horizontalOverflow:boolean,
// }
// Returns { verdict:'PASS'|'FAIL'|'BLOCKED', reasons:string[] }.
// Fail-closed: anything not strictly proven is a failure, never a pass.
export function assessMobileNav(m = {}) {
	const reasons = [];

	// Auth wall / not-the-app => BLOCKED (never PASS, never FAIL-as-app-defect).
	if (m.isLoginWall === true) {
		return {
			verdict: "BLOCKED",
			reasons: ["login/auth wall served instead of the application"],
		};
	}

	// Effective viewport must be genuinely ~390 — this is THE guard against the
	// "resize reported success but viewport was 1725" trap.
	const w = Number(m.effectiveInnerWidth);
	if (!Number.isFinite(w) || Math.abs(w - TARGET_WIDTH) > WIDTH_TOLERANCE) {
		reasons.push(
			`effective innerWidth ${Number.isFinite(w) ? w : "unknown"} is not ~${TARGET_WIDTH}px (±${WIDTH_TOLERANCE})`,
		);
	}

	if (m.hamburgerOpens !== true)
		reasons.push("hamburger did not open the mobile menu");
	if (m.hamburgerCloses !== true)
		reasons.push("hamburger did not close the mobile menu");

	const got = Array.isArray(m.appleSupportChildLabels)
		? m.appleSupportChildLabels.map(norm)
		: [];
	const want = EXPECTED_APPLE_SUPPORT_CHILDREN.map(norm);
	const missing = want.filter((x) => !got.includes(x));
	const extra = got.filter((x) => !want.includes(x));
	if (missing.length || extra.length || got.length !== want.length) {
		reasons.push(
			`Apple Support children mismatch (got ${got.length}, expected ${want.length}` +
				(missing.length ? `; missing: ${missing.join(", ")}` : "") +
				(extra.length ? `; unexpected: ${extra.join(", ")}` : "") +
				")",
		);
	}

	if (m.representativeLinkReached !== true)
		reasons.push("representative child link did not reach its route");
	if (m.keyboardFocusVisible !== true)
		reasons.push("keyboard focus was not visible during traversal");
	if (m.focusEnteredHiddenControls === true)
		reasons.push("keyboard focus entered hidden/off-screen controls");
	if (m.horizontalOverflow === true)
		reasons.push("horizontal overflow at 390px");

	return reasons.length
		? { verdict: "FAIL", reasons }
		: { verdict: "PASS", reasons: [] };
}
