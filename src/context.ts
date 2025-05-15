// src/context.ts
import { PrismaClient } from '@prisma/client';
import type { ExpressContextFunctionArgument } from '@apollo/server/express4';

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  req?: Express.Request;
  res?: Express.Response;
}

export async function createContext(
  context: ExpressContextFunctionArgument
): Promise<Context> {
  return {
    prisma,
    req: context.req,
    res: context.res,
  };
}