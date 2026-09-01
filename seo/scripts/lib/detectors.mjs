// Pure detector functions — single source shared by audit scripts and unit tests
// (no network, no fs). Keeps gate logic and its tests from drifting apart.

// --- Schema: self-serving AggregateRating/Review detector (Handoff §5.4, §166) ---
export function findSelfRating(jsonLdString) {
	let data;
	try {
		data = JSON.parse(jsonLdString);
	} catch {
		return false;
	}
	let hit = false;
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		if (Array.isArray(node)) {
			for (const n of node) walk(n);
			return;
		}
		const type = node["@type"];
		const types = Array.isArray(type) ? type : type ? [type] : [];
		if (types.includes("AggregateRating") || types.includes("Review"))
			hit = true;
		if (
			types.some((t) =>
				["LocalBusiness", "Organization", "ComputerRepairService"].includes(t),
			) &&
			(node.aggregateRating || node.review)
		) {
			hit = true;
		}
		for (const k of Object.keys(node)) walk(node[k]);
	};
	walk(data);
	return hit;
}

// --- Claims: prohibited-variant scanner against the facts register ---
export function scanClaims(text, register) {
	const lower = text.toLowerCase();
	const hits = [];
	for (const e of register.entries) {
		for (const variant of e.prohibited_variants || []) {
			// FR-009: "Apple Authorised Service Provider" is permitted inside the correct
			// negation ("not an Apple Authorised Service Provider" / "independent ...").
			if (e.claim_id === "FR-009") {
				const v = variant.toLowerCase();
				let idx = lower.indexOf(v);
				let bad = 0;
				while (idx > -1) {
					const before = lower.slice(Math.max(0, idx - 24), idx);
					const after = lower.slice(idx + v.length, idx + v.length + 30);
					const negated = /not an|not a|independent/.test(before);
					const question = /^[^.!]*\?/.test(after);
					if (!negated && !question) bad++;
					idx = lower.indexOf(v, idx + v.length);
				}
				if (bad > 0)
					hits.push({
						claim_id: e.claim_id,
						variant,
						count: bad,
						note: "positive AASP claim outside negation",
					});
				continue;
			}
			const count = lower.split(variant.toLowerCase()).length - 1;
			if (count > 0) hits.push({ claim_id: e.claim_id, variant, count });
		}
	}
	return hits;
}

// --- Search: keyless index ranking (mirrors the client + API ranker) ---
const norm = (s) =>
	s
		.toLowerCase()
		.replace(/[-_/]+/g, " ")
		.replace(/\s+/g, " ")
		.trim();

export function rankIndex(entries, query) {
	const nq = norm(query);
	if (!nq) return [];
	const tokens = nq.split(" ").filter(Boolean);
	return entries
		.map((e) => {
			const t = norm(e.title);
			const k = norm(e.keywords);
			const p = norm(e.path);
			let score = 0;
			if (t.includes(nq)) score += 12;
			if (k.includes(nq)) score += 8;
			if (p.includes(nq)) score += 6;
			for (const tok of tokens) {
				if (t.includes(tok)) score += 3;
				if (k.includes(tok)) score += 2;
				if (p.includes(tok)) score += 1;
			}
			if (
				score > 0 &&
				["home", "hub", "service", "business", "action"].includes(e.type)
			)
				score += 1;
			return { e, score };
		})
		.filter((x) => x.score > 0)
		.sort((a, b) => b.score - a.score)
		.map(({ e }) => ({ title: e.title, url: e.url, path: e.path }));
}
