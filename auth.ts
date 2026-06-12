import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

const githubClientId = process.env.GITHUB_ID;
const githubClientSecret = process.env.GITHUB_SECRET;

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: githubClientId || '',
      clientSecret: githubClientSecret || '',
    }),
  ],
  session: { strategy: 'jwt', maxAge: 60 * 60 * 24 },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {},
});

export default handlers;

// Re-export HTTP method handlers for Next.js route forwarding
export const GET = handlers.GET;
export const POST = handlers.POST;
