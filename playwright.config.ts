import { defineConfig, devices } from "@playwright/test";

// E2E config for SEO/search/conversion tests (Handoff §5.5.7, §9-C, §10).
// BASE_URL points at a preview or production URL. In CI, the seo-pr-gates workflow
// builds and serves the app, then sets BASE_URL to the local server.
const baseURL = process.env.BASE_URL || "http://localhost:3000";

export default defineConfig({
	testDir: "./tests/e2e",
	timeout: 30_000,
	expect: { timeout: 10_000 },
	fullyParallel: true,
	retries: process.env.CI ? 1 : 0,
	reporter: process.env.CI ? [["github"], ["list"]] : "list",
	use: {
		baseURL,
		trace: "on-first-retry",
	},
	// Self-serve only for a local build; skip when BASE_URL is a remote/preview URL.
	webServer: baseURL.includes("localhost")
		? {
				command: "npm run start",
				url: baseURL,
				reuseExistingServer: !process.env.CI,
				timeout: 120_000,
			}
		: undefined,
	projects: [
		{ name: "chromium", use: { ...devices["Desktop Chrome"] } },
		{ name: "mobile", use: { ...devices["Pixel 5"] } },
	],
});
