import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';

    // Clone the request so we can safely read the raw text for logging
    const clone = request.clone();
    const raw = await clone.text().catch(() => '');
    console.log('API /api/messages incoming headers:', Object.fromEntries(request.headers.entries()));
    console.log('API /api/messages raw body:', raw);

    let name = '';
    let email = '';
    let body = '';

    if (contentType.includes('application/json')) {
      let json: any = {};
      try {
        json = raw ? JSON.parse(raw) : {};
      } catch (err) {
        console.error('API /api/messages JSON parse error:', err);
      }
      name = String((json && json.name) ?? '');
      email = String((json && json.email) ?? '');
      body = String((json && json.body) ?? '');
    } else {
      const formData = await request.formData();
      name = String(formData.get('name') ?? '');
      email = String(formData.get('email') ?? '');
      body = String(formData.get('body') ?? '');
    }

    if (!name || !email || !body) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const result = await prisma.message.create({
      data: { name, email, body },
    });

    return NextResponse.json({ ok: true, id: result.id });
  } catch (err) {
    console.error('API /api/messages error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
