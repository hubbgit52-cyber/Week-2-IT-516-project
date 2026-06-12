import { auth, signOut } from '../auth';

export default async function AuthButtonServer() {
  const session = await auth();
  const callbackUrl = process.env.NEXTAUTH_URL || '/';

  if (session?.user) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span>Hi, {session.user.name}</span>
        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: callbackUrl });
          }}
        >
          <button type="submit" className="btn" style={{ marginLeft: 12 }}>Sign out</button>
        </form>
      </div>
    );
  }

  const signInHref = `/api/auth/signin/github?callbackUrl=${encodeURIComponent(callbackUrl)}`;

  return (
    <div>
      <a href={signInHref} className="btn">Sign in with GitHub</a>
    </div>
  );
}
