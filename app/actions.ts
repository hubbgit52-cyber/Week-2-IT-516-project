"use server";

import { prisma } from '../lib/prisma';

export async function createMessage(formData: FormData) {
  const name = String(formData.get('name') ?? '');
  const email = String(formData.get('email') ?? '');
  const body = String(formData.get('body') ?? '');

  if (!name || !email || !body) {
    throw new Error('All fields are required');
  }

  return prisma.message.create({
    data: {
      name,
      email,
      body,
    },
  });
}
