import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  session: { strategy: 'jwt', maxAge: 60 * 60 * 24 },
  callbacks: {},
});

export default handlers;

// Re-export HTTP method handlers for Next.js route forwarding
export const GET = handlers.GET;
export const POST = handlers.POST;
