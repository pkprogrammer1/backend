import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { verifyToken } from '../../utils/jwt.js';
import  prisma from '../../prisma/client.js'
export interface Context {
  prisma: PrismaClient
  userId?: string
  role?: string
}

export const createContext = async ({ req }: { req: Request }): Promise<Context> => {
  const token = req.headers.authorization?.replace('Bearer ', '') || '';
  return { prisma, ...(await verifyToken(token)) };
};