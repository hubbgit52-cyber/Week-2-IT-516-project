import { auth } from '../../../../auth';

export async function GET() {
  try {
    const session = await auth();
    return new Response(JSON.stringify(session ?? null), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify(null), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
