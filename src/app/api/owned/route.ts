// ...existing code...
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req: Request) {
  const user = await getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const owned = await prisma.ownedCard.findMany({ where: { userId: user.id } });
  return NextResponse.json({ owned });
}

export async function POST(req: Request) {
  const user = await getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { cardId, qty = 1 } = await req.json();
  if (!cardId) return NextResponse.json({ error: 'cardId required' }, { status: 400 });

  const upsert = await prisma.ownedCard.upsert({
    where: { userId_cardId: { userId: user.id, cardId } },
    create: { userId: user.id, cardId, qty },
    update: { qty },
  });
  return NextResponse.json({ owned: upsert });
}

export async function DELETE(req: Request) {
  const user = await getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { cardId } = await req.json();
  await prisma.ownedCard.deleteMany({ where: { userId: user.id, cardId } });
  return NextResponse.json({ ok: true });
}