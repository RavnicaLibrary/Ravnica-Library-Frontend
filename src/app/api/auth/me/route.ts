import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req: Request) {
  const user = await getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json({ user: { id: user.id, email: user.email, nickname: user.nickname } });
}