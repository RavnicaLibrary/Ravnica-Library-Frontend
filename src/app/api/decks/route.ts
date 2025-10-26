// ...existing code...
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req: Request) {
  const user = await getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const decks = await prisma.deck.findMany({ where: { userId: user.id }, include: { cards: true } });
  return NextResponse.json({ decks });
}

export async function POST(req: Request) {
  const user = await getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { name } = await req.json();
  if (!name) return NextResponse.json({ error: 'Name required' }, { status: 400 });
  const deck = await prisma.deck.create({ data: { name, userId: user.id } });
  return NextResponse.json({ deck });
}