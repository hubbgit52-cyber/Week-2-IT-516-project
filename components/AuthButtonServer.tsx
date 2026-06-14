import { auth } from '../auth';
import dynamic from 'next/dynamic';

const AuthButtonsClient = dynamic(() => import('./AuthButtonsClient'), { ssr: false });

export default async function AuthButtonServer() {
  const session = await auth();

  return (
    <AuthButtonsClient signedIn={!!session?.user} name={session?.user?.name ?? null} />
  );
}
