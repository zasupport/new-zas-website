import { expect, test } from "@playwright/test";

// Conversion-path smoke (Handoff §9-A, §10). Confirms money/action pages load and
// expose a direct action route (WhatsApp / phone / booking). Read-only; no submission.

const PAGES = [
	"/",
	"/book",
	"/contact",
	"/logic-board-repair",
	"/battery-replacement",
];

for (const path of PAGES) {
	test(`conversion route present on ${path}`, async ({ page }) => {
		const res = await page.goto(path);
		expect(res?.status()).toBe(200);
		const tel = await page.locator('a[href^="tel:"]').count();
		const wa = await page
			.locator('a[href*="wa.me"], a[href*="whatsapp"]')
			.count();
		const book = await page.locator('a[href*="/book"], form').count();
		expect(tel + wa + book).toBeGreaterThan(0);
	});
}
