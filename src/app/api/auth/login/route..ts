import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, signToken } from '@/lib/auth';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  if (!email || !password) return NextResponse.json({ error: 'Missing' }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ error: 'Invalid' }, { status: 401 });

  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) return NextResponse.json({ error: 'Invalid' }, { status: 401 });

  const token = signToken({ userId: user.id });
  return NextResponse.json({ token, user: { id: user.id, email: user.email, nickname: user.nickname } });
}