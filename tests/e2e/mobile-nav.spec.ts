import fs from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";
import {
	assessMobileNav,
	EXPECTED_APPLE_SUPPORT_CHILDREN,
	TARGET_WIDTH,
} from "./lib/mobile-nav-verdict.mjs";

// Permanent 390px authenticated/local mobile-nav acceptance pack.
// Runs at a TRUE device viewport (Playwright sets it at the context level, so it is
// reachable regardless of the host display — the exact thing Claude-in-Chrome could
// not do). Needs no preview auth: it renders the candidate's own client-side nav.
// Verdict is fail-closed via assessMobileNav; command success is never trusted —
// the effective innerWidth is measured and asserted.

test.use({
	viewport: { width: TARGET_WIDTH, height: 844 },
	deviceScaleFactor: 1,
	isMobile: true,
	hasTouch: true,
});

const CHILD_HREFS: Record<string, string> = {
	"Apple Account Security Help": "/apple-account-security-help",
	"Suspected Hacked Apple Device": "/suspected-hacked-apple-device",
	"Mac Data Recovery": "/mac-data-recovery",
	"Apple Trade-In Johannesburg": "/apple-trade-in-johannesburg",
};

const OUT =
	process.env.MOBILE_NAV_OUT ||
	path.join(process.cwd(), "test-results", "mobile-nav");

test("390px mobile nav acceptance pack", async ({ page, baseURL }) => {
	fs.mkdirSync(OUT, { recursive: true });
	const evidence: Record<string, unknown> = {
		observed_at: new Date().toISOString(),
		base: baseURL,
		candidate_sha: process.env.CANDIDATE_SHA || null,
		target_width: TARGET_WIDTH,
	};

	const res = await page.goto("/", { waitUntil: "domcontentloaded" });
	const title = await page.title();
	const isLoginWall =
		/login\s*[–-]\s*vercel|authentication required|vercel security/i.test(
			title,
		);

	// Measure the EFFECTIVE viewport — the guard against a false-narrow trap.
	const measured = await page.evaluate(() => ({
		innerWidth: window.innerWidth,
		clientWidth: document.documentElement.clientWidth,
		scrollWidth: document.documentElement.scrollWidth,
		mqMobile: window.matchMedia("(max-width: 767px)").matches,
	}));
	evidence.status = res?.status() ?? null;
	evidence.title = title;
	evidence.measured = measured;
	const horizontalOverflow = measured.scrollWidth > measured.clientWidth + 1;

	const hamburger = page.getByRole("button", { name: "Toggle menu" });
	const menu = page.locator("div.fixed.inset-0").first(); // mobile overlay (rendered outside header)

	// Closed-state screenshot.
	await page.screenshot({ path: path.join(OUT, "01-nav-closed.png") });

	// Open.
	let hamburgerOpens = false;
	if (await hamburger.count()) {
		await hamburger.click();
		hamburgerOpens = await menu.isVisible().catch(() => false);
	}
	await page.screenshot({ path: path.join(OUT, "02-nav-open.png") });

	// Expand Apple Support accordion inside the mobile menu.
	const appleSupportChildLabels: string[] = [];
	if (hamburgerOpens) {
		const toggle = menu.getByRole("button", { name: /Apple Support/i });
		if (await toggle.count()) {
			await toggle.click();
			await page.waitForTimeout(250);
			for (const [label, href] of Object.entries(CHILD_HREFS)) {
				const link = menu.locator(`a[href="${href}"]`);
				if (
					(await link.count()) &&
					(await link
						.first()
						.isVisible()
						.catch(() => false))
				) {
					appleSupportChildLabels.push(label);
				}
			}
		}
	}
	await page.screenshot({
		path: path.join(OUT, "03-apple-support-expanded.png"),
	});

	// Keyboard traversal with the menu open: focus must stay on visible controls.
	let keyboardFocusVisible = false;
	let focusEnteredHiddenControls = false;
	if (hamburgerOpens) {
		let visibleFocusCount = 0;
		for (let i = 0; i < 8; i++) {
			await page.keyboard.press("Tab");
			const f = await page.evaluate(() => {
				const el = document.activeElement as HTMLElement | null;
				if (!el || el === document.body) return { ok: false, hidden: false };
				const r = el.getBoundingClientRect();
				const cs = getComputedStyle(el);
				const hidden =
					cs.visibility === "hidden" ||
					cs.display === "none" ||
					r.width === 0 ||
					r.height === 0;
				const onscreen =
					r.bottom > 0 && r.right > 0 && r.left < window.innerWidth;
				return { ok: !hidden && onscreen, hidden: hidden || !onscreen };
			});
			if (f.ok) visibleFocusCount++;
			if (f.hidden) focusEnteredHiddenControls = true;
		}
		keyboardFocusVisible = visibleFocusCount >= 3;
	}

	// Close (toggle again) — must hide the menu.
	let hamburgerCloses = false;
	if (hamburgerOpens && (await hamburger.count())) {
		await hamburger.click();
		hamburgerCloses = !(await menu.isVisible().catch(() => true));
	}

	// Representative child link reaches its route. Fresh navigation so the accordion
	// starts collapsed and a single toggle expands it (avoids a double-toggle collapse).
	let representativeLinkReached = false;
	{
		const repHref = CHILD_HREFS["Mac Data Recovery"];
		await page.goto("/", { waitUntil: "domcontentloaded" });
		await hamburger.click();
		await menu.getByRole("button", { name: /Apple Support/i }).click();
		const link = menu.locator(`a[href="${repHref}"]`).first();
		await link.waitFor({ state: "visible", timeout: 5_000 }).catch(() => {});
		if (await link.isVisible().catch(() => false)) {
			await Promise.all([
				page.waitForURL(`**${repHref}`, { timeout: 10_000 }).catch(() => {}),
				link.click(),
			]);
			representativeLinkReached = new URL(page.url()).pathname === repHref;
			if (representativeLinkReached) {
				await expect(page.locator("h1")).toHaveCount(1);
			}
		}
	}

	const inputs = {
		effectiveInnerWidth: measured.innerWidth,
		isLoginWall,
		hamburgerOpens,
		hamburgerCloses,
		appleSupportChildLabels,
		representativeLinkReached,
		keyboardFocusVisible,
		focusEnteredHiddenControls,
		horizontalOverflow,
	};
	const result = assessMobileNav(inputs);
	evidence.inputs = inputs;
	evidence.expectedChildren = EXPECTED_APPLE_SUPPORT_CHILDREN;
	evidence.verdict = result.verdict;
	evidence.reasons = result.reasons;
	fs.writeFileSync(
		path.join(OUT, "mobile-nav-evidence.json"),
		JSON.stringify(evidence, null, 2),
	);

	console.log(
		`MOBILE-NAV VERDICT: ${result.verdict} | innerWidth=${measured.innerWidth} | children=${appleSupportChildLabels.length}/4`,
	);
	if (result.reasons.length)
		console.log("reasons: " + result.reasons.join("; "));

	// Fail-closed: only a genuine PASS is green.
	expect(result.verdict, result.reasons.join("; ") || "ok").toBe("PASS");
});
