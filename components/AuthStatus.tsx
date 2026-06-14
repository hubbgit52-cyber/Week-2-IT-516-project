"use client";

import { useSession, signIn, signOut } from 'next-auth/react';

export default function AuthStatus() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Checking auth...</div>;
  }

  if (session?.user) {
    const name = session.user.name ?? session.user.email ?? 'User';
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span>Hi, {name}</span>
        <button className="btn" style={{ marginLeft: 12 }} onClick={() => signOut({ callbackUrl: '/' })}>
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div>
      <button className="btn" onClick={() => signIn('github', { callbackUrl: '/' })}>
        Sign in with GitHub
      </button>
    </div>
  );
}
