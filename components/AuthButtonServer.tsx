import { auth, signIn, signOut } from '../auth';

export default async function AuthButtonServer() {
  const session = await auth();
  const callbackUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000/';

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

  return (
    <div>
      <form
        action={async () => {
          'use server';
          await signIn('github', { redirectTo: callbackUrl });
        }}
      >
        <button type="submit" className="btn">Sign in with GitHub</button>
      </form>
    </div>
  );
}
