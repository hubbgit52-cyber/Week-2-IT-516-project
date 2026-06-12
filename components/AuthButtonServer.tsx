import { auth } from '../auth';

export default async function AuthButtonServer() {
  const session = await auth();
  const callbackUrl = process.env.NEXTAUTH_URL || '/';

  if (session?.user) {
    const signOutHref = `/api/auth/signout?callbackUrl=${encodeURIComponent(callbackUrl)}`;
    return (
      <div>
        <span>Hi, {session.user.name}</span>
        <a href={signOutHref} className="btn" style={{ marginLeft: 12 }}>Sign out</a>
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
