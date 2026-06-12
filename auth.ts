import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

const githubClientId = process.env.GITHUB_ID || process.env.AUTH_GITHUB_ID;
const githubClientSecret = process.env.GITHUB_SECRET || process.env.AUTH_GITHUB_SECRET;
const nextAuthSecret = process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET;

if (!githubClientId || !githubClientSecret) {
  throw new Error('Missing GitHub client ID/secret. Set GITHUB_ID/GITHUB_SECRET or AUTH_GITHUB_ID/AUTH_GITHUB_SECRET in your environment.');
}

if (!nextAuthSecret) {
  throw new Error('Missing NEXTAUTH_SECRET (or AUTH_SECRET) environment variable. Set NEXTAUTH_SECRET to a long random string.');
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: githubClientId,
      clientSecret: githubClientSecret,
    }),
  ],
  session: { strategy: 'jwt', maxAge: 60 * 60 * 24 },
  secret: nextAuthSecret,
  callbacks: {},
});
// Note: do not export default; handlers is exported as a named export.
