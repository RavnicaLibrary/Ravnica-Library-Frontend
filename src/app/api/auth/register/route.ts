import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, signToken } from '@/lib/auth';

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password, nickname } = body;
  if (!email || !password || !nickname) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return NextResponse.json({ error: 'Email in use' }, { status: 409 });

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
    data: { email, passwordHash, nickname },
  });

  const token = signToken({ userId: user.id });
  return NextResponse.json({ token, user: { id: user.id, email: user.email, nickname: user.nickname } });
}