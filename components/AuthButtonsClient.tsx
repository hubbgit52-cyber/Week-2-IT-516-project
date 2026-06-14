"use client";

import { signIn as nextSignIn, signOut as nextSignOut } from 'next-auth/react';

type Props = {
  signedIn: boolean;
  name?: string | null;
};

export default function AuthButtonsClient({ signedIn, name }: Props) {
  if (signedIn) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span>Hi, {name}</span>
        <button
          className="btn"
          style={{ marginLeft: 12 }}
          onClick={() => nextSignOut({ callbackUrl: '/' })}
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div>
      <button className="btn" onClick={() => nextSignIn('github', { callbackUrl: '/' })}>
        Sign in with GitHub
      </button>
    </div>
  );
}
