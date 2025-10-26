import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from './prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
const JWT_EXP = '7d';

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function signToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXP });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as any;
  } catch {
    return null;
  }
}

export async function getUserFromRequest(req: Request) {
  const auth = req.headers.get('authorization') || '';
  const match = auth.match(/^Bearer (.+)$/);
  if (!match) return null;
  const data = verifyToken(match[1]);
  if (!data?.userId) return null;
  return prisma.user.findUnique({ where: { id: data.userId } });
}