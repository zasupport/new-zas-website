// ZA Support SEO audit — shared crawl/parse helpers.
// Read-only. Dependency-free (Node >=18 built-in fetch). Best-effort HTML parsing
// for audit purposes only; not a substitute for a real DOM in production code.
//
// Handoff §2.1: read-only first, never print secret values, conservative crawl.

export const BASE = process.env.SEO_BASE_URL || "https://zasupport.com";
const UA =
	"ZASupport-SEO-Audit/1.0 (+read-only; contact courtney@zasupport.com)";

// Conservative fetch with timeout. redirect:'manual' so we can observe redirect
// hops (host canonical audit needs the raw hop).
export async function fetchRaw(
	url,
	{ follow = false, timeoutMs = 15000 } = {},
) {
	const ctrl = new AbortController();
	const t = setTimeout(() => ctrl.abort(), timeoutMs);
	try {
		const res = await fetch(url, {
			redirect: follow ? "follow" : "manual",
			headers: { "user-agent": UA, accept: "text/html,application/xhtml+xml" },
			signal: ctrl.signal,
		});
		const contentType = res.headers.get("content-type") || "";
		let body = "";
		if (/text\/html|xml|json|text\/plain/.test(contentType)) {
			body = await res.text();
		} else {
			await res.arrayBuffer().catch(() => {});
		}
		return {
			status: res.status,
			location: res.headers.get("location"),
			finalUrl: res.url || url,
			contentType,
			body,
			ok: res.ok,
		};
	} finally {
		clearTimeout(t);
	}
}

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function firstMatch(re, s) {
	const m = re.exec(s);
	return m ? m[1].trim() : null;
}

function metaContent(html, attr, val) {
	const re1 = new RegExp(
		`<meta[^>]*\\b${attr}=["']${val}["'][^>]*\\bcontent=["']([^"']*)["']`,
		"i",
	);
	const re2 = new RegExp(
		`<meta[^>]*\\bcontent=["']([^"']*)["'][^>]*\\b${attr}=["']${val}["']`,
		"i",
	);
	return firstMatch(re1, html) ?? firstMatch(re2, html);
}

function collectTypes(node, out) {
	if (!node || typeof node !== "object") return;
	if (Array.isArray(node)) {
		for (const n of node) collectTypes(n, out);
		return;
	}
	if (node["@type"]) {
		const t = node["@type"];
		for (const x of Array.isArray(t) ? t : [t]) out.push(x);
	}
	if (node["@graph"]) collectTypes(node["@graph"], out);
}

export function parseHtml(html) {
	if (!html) return {};
	const jsonldTypes = [];
	const jsonldBlocks = [];
	const ldRe =
		/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
	for (const m of html.matchAll(ldRe)) {
		const raw = m[1].trim();
		jsonldBlocks.push(raw);
		try {
			collectTypes(JSON.parse(raw), jsonldTypes);
		} catch {
			jsonldTypes.push("__PARSE_ERROR__");
		}
	}

	const links = new Set();
	const aRe = /<a\b[^>]*\bhref=["']([^"']+)["']/gi;
	for (const m of html.matchAll(aRe)) {
		let href = m[1];
		if (href.startsWith(BASE)) href = href.slice(BASE.length) || "/";
		if (href.startsWith("/") && !href.startsWith("//")) {
			links.add(href.split("#")[0].split("?")[0]);
		}
	}

	const title = firstMatch(/<title[^>]*>([\s\S]*?)<\/title>/i, html);
	const h1 =
		firstMatch(/<h1[^>]*>([\s\S]*?)<\/h1>/i, html)
			?.replace(/<[^>]+>/g, "")
			.trim() ?? null;

	return {
		title,
		description: metaContent(html, "name", "description"),
		ogTitle: metaContent(html, "property", "og:title"),
		ogDescription: metaContent(html, "property", "og:description"),
		canonical:
			firstMatch(
				/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i,
				html,
			) ??
			firstMatch(
				/<link[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["']/i,
				html,
			),
		robotsMeta: metaContent(html, "name", "robots"),
		metaKeywords: metaContent(html, "name", "keywords"),
		h1,
		jsonldTypes: [...new Set(jsonldTypes)],
		jsonldBlocks,
		internalLinks: [...links].sort(),
		htmlBytes: html.length,
	};
}

export function parseSitemapLocs(xml) {
	const locs = [];
	for (const m of (xml || "").matchAll(/<loc>([^<]+)<\/loc>/gi))
		locs.push(m[1].trim());
	return locs;
}

export function nowIso() {
	return new Date().toISOString();
}
