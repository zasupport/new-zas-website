import { NextResponse } from 'next/server';

// Health check endpoint — used by CI pipeline, monitoring scripts, and deploy verification.
// Returns 200 with version info when the app is live and responding.
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'zasupport-website',
    version: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 8) ?? 'local',
    deployment: process.env.VERCEL_DEPLOYMENT_ID ?? 'local',
    region: process.env.VERCEL_REGION ?? 'unknown',
    ts: new Date().toISOString(),
  });
}
