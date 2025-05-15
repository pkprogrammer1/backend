import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;

export interface TokenPayload {
  userId: string;
  role?: string;
}

export const verifyToken = async (token: string): Promise<{ userId?: string; role?: string }> => {
  try {
    if (!token) return {};
    
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    
    // Verify user exists in database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, role: true }
    });

    if (!user) throw new Error('User not found');

    return {
      userId: user.id,
      role: user.role
    };
  } catch (error) {
    console.error('Token verification failed:', error);
    return {};
  }
};