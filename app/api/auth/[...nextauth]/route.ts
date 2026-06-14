const githubClientId = process.env.GITHUB_ID || process.env.AUTH_GITHUB_ID;
const githubClientSecret = process.env.GITHUB_SECRET || process.env.AUTH_GITHUB_SECRET;

if (githubClientId && githubClientSecret) {
	// Auth configured — delegate to NextAuth handlers
	const mod = await import('../../../../auth');
	// eslint-disable-next-line import/namespace
	export const { GET, POST } = mod.handlers;
} else {
	// Auth not configured (dev). Return a safe empty session so client doesn't hang.
	export const GET = async () =>
		new Response(JSON.stringify(null), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});

	export const POST = GET;
}
