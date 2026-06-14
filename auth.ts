import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

const githubClientId = process.env.GITHUB_ID || process.env.AUTH_GITHUB_ID;
const githubClientSecret = process.env.GITHUB_SECRET || process.env.AUTH_GITHUB_SECRET;
const nextAuthSecret = process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET;

let handlers: any;
let auth: () => Promise<any>;
let signIn: (...args: any[]) => Promise<any> | void;
let signOut: (...args: any[]) => Promise<any> | void;

const isConfigured = !!(githubClientId && githubClientSecret && nextAuthSecret);

if (!isConfigured) {
  // Export safe no-op handlers so the app can run in environments without GitHub creds.
  handlers = {
    GET: async () =>
      new Response(JSON.stringify(null), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    POST: async () =>
      new Response(JSON.stringify(null), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
  };

  auth = async () => null;
  signIn = async () => {
    // noop in dev when not configured
    return;
  };
  signOut = async () => {
    return;
  };
} else {
  const next = NextAuth({
    providers: [
      GitHub({
        clientId: githubClientId!,
        clientSecret: githubClientSecret!,
      }),
    ],
    session: { strategy: 'jwt', maxAge: 60 * 60 * 24 },
    secret: nextAuthSecret,
    callbacks: {},
  });

  handlers = next.handlers;
  auth = next.auth;
  signIn = next.signIn;
  signOut = next.signOut;
}

export { handlers, auth, signIn, signOut };
