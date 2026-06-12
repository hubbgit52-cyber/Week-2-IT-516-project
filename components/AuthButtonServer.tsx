import { auth, signIn, signOut } from '../auth';

export default async function AuthButtonServer() {
  const session = await auth();
  const callbackUrl = process.env.NEXTAUTH_URL || '/';

  if (session?.user) {
    return (
      <form action={async () => { 'use server'; try { await signOut({ redirectTo: callbackUrl }); } catch (err) { console.error('signOut error', err); } }}>
        <span>Hi, {session.user.name}</span>
        <button type="submit">Sign out</button>
      </form>
    );
  }

  return (
    <form action={async () => { 'use server'; try { await signIn('github', { callbackUrl }); } catch (err) { console.error('signIn error', err); } }}>
      <button type="submit">Sign in with GitHub</button>
    </form>
  );
}
