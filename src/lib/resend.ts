import { Resend } from "resend";

let client: Resend | null = null;

/**
 * Lazily instantiate the Resend client at REQUEST time, never at module load.
 *
 * The Resend constructor throws when RESEND_API_KEY is unset. Instantiating it
 * at module top level (`const resend = new Resend(process.env.RESEND_API_KEY)`)
 * broke `next build` on 14/09/2026: Next.js evaluates every route module while
 * collecting page data, and CI has no RESEND_API_KEY secret, so the constructor
 * threw and failed the build ("Failed to collect page data for /api/book").
 *
 * Call this INSIDE a route handler, inside a try/catch. At build time the module
 * only defines this function (never calls it), so evaluation is safe; at runtime
 * a missing key throws where the caller's catch can degrade gracefully.
 */
export function getResend(): Resend {
	if (!client) {
		client = new Resend(process.env.RESEND_API_KEY);
	}
	return client;
}
