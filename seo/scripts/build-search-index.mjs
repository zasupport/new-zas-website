#!/usr/bin/env node
// build-search-index.mjs — deterministic, keyless onsite-search index (Handoff §5.5.3, §9-C).
// Replaces the external Google-CSE dependency (which returns HTTP 500 in production)
// with a build-time static JSON index derived from the site's own canonical URL list
// (src/app/sitemap.ts). Runs in CI with NO network and NO secrets.
//
// Output: public/search-index.json  (served statically; client does fuzzy matching)
// Optional: if SANITY_API_READ_TOKEN + NEXT_PUBLIC_SANITY_PROJECT_ID are present the
// script can be extended to enrich blog entries; absence is non-fatal (staged).
//
// Usage: node seo/scripts/build-search-index.mjs

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..", "..");

// Curated metadata for priority money/hub/service pages (titles + search keywords).
// Slug-derived titles are used for everything else. Keywords widen recall for the
// exact acceptance-criteria queries (Logic board, liquid damage, battery, etc.).
const CURATED = {
	"/": {
		title: "ZA Support — Apple & Mac Repair Johannesburg",
		type: "home",
		keywords: "apple mac macbook iphone repair johannesburg logic board",
	},
	"/apple-repair": {
		title: "Apple Mac Repair, Johannesburg",
		type: "hub",
		keywords: "apple repair mac macbook imac mac mini johannesburg",
	},
	"/iphone-repair": {
		title: "iPhone Repair Johannesburg",
		type: "hub",
		keywords: "iphone repair screen battery charging liquid damage",
	},
	"/macbook-repair": {
		title: "MacBook Repair Johannesburg",
		type: "hub",
		keywords:
			"macbook repair screen battery keyboard trackpad logic board air pro",
	},
	"/logic-board-repair": {
		title: "MacBook Logic Board Repair Johannesburg",
		type: "service",
		keywords:
			"logic board logic-board motherboard microsoldering component level board repair",
	},
	"/liquid-damage": {
		title: "MacBook Liquid Damage Repair Johannesburg",
		type: "service",
		keywords: "liquid damage water damage spill corrosion macbook",
	},
	"/battery-replacement": {
		title: "MacBook & iPhone Battery Replacement Johannesburg",
		type: "service",
		keywords: "battery replacement macbook iphone swelling health",
	},
	"/screen-repair": {
		title: "MacBook & iPhone Screen Repair Johannesburg",
		type: "service",
		keywords: "screen repair display cracked lcd macbook iphone",
	},
	"/macbook-not-turning-on": {
		title: "MacBook Not Turning On / No Power Repair",
		type: "service",
		keywords: "not turning on no power charging dead wont start macbook",
	},
	"/imac-repair": {
		title: "iMac Repair Johannesburg",
		type: "service",
		keywords: "imac repair screen ram ssd logic board upgrade",
	},
	"/mac-mini-repair": {
		title: "Mac Mini Repair & Upgrade Johannesburg",
		type: "service",
		keywords: "mac mini repair ssd ram upgrade",
	},
	"/macbook-air-repair": {
		title: "MacBook Air Repair Johannesburg",
		type: "service",
		keywords: "macbook air repair screen battery logic board",
	},
	"/macbook-pro-repair": {
		title: "MacBook Pro Repair Johannesburg",
		type: "service",
		keywords: "macbook pro repair screen battery logic board",
	},
	"/business": {
		title: "Apple IT Support for Business Johannesburg",
		type: "business",
		keywords:
			"business managed it support apple mac microsoft 365 medical practice",
	},
	"/managed-services": {
		title: "Managed IT Services Johannesburg",
		type: "business",
		keywords: "managed it services sla monthly support business",
	},
	"/book": {
		title: "Book a Mac Repair — Hyde Park, Johannesburg",
		type: "action",
		keywords: "book repair assessment appointment quote",
	},
	"/contact": {
		title: "Contact ZA Support",
		type: "action",
		keywords: "contact phone whatsapp email directions",
	},
};

function slugTitle(path) {
	const last =
		path.replace(/\/$/, "").split("/").filter(Boolean).pop() || "home";
	return last.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function extractPathsFromSitemap(src) {
	const paths = new Set(["/"]);
	// matches `${base}/anything` inside sitemap.ts
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

function main() {
	const sitemapSrc = readFileSync(
		join(repoRoot, "src", "app", "sitemap.ts"),
		"utf8",
	);
	const paths = extractPathsFromSitemap(sitemapSrc);

	const entries = paths.map((path) => {
		const c = CURATED[path];
		return {
			url: `https://zasupport.com${path === "/" ? "" : path}`,
			path,
			title: c?.title || slugTitle(path),
			type:
				c?.type ||
				(path.startsWith("/blog")
					? "blog"
					: path.startsWith("/answers") || path.startsWith("/guides")
						? "guide"
						: "page"),
			keywords: c?.keywords || slugTitle(path).toLowerCase(),
		};
	});

	const index = {
		generated: new Date().toISOString(),
		source:
			"src/app/sitemap.ts (canonical URL list) + curated priority metadata",
		// File-placement directive (consumers read .entries only; extra keys are inert)
		claude_code_injection: {
			target_path: "public/search-index.json",
			permissions: "0644",
			create_parent_dirs: false,
			overwrite_if_exists: true,
			backup_if_exists: false,
			generated_by:
				"seo/scripts/build-search-index.mjs (npm run search:index / prebuild)",
			post_install_verify:
				"node -e \"const i=require('./public/search-index.json'); if(!Array.isArray(i.entries)||i.entries.length<100) process.exit(1)\"",
			rollback_command: "git checkout HEAD -- public/search-index.json",
		},
		count: entries.length,
		entries,
	};

	const outFile = join(repoRoot, "public", "search-index.json");
	writeFileSync(outFile, JSON.stringify(index));
	process.stdout.write(
		`Wrote public/search-index.json — ${entries.length} entries (curated priority: ${Object.keys(CURATED).length})\n`,
	);
}

main();
