import { Context } from '../../context.js';

export const getUsers = (ctx: Context) => {
  return ctx.prisma.user.findMany();
};

export const getUser = (id: number, ctx: Context) => {
  return ctx.prisma.user.findUnique({ where: { id: Number(id) } });
};

export const createUser = (args: { name: string; email: string }, ctx: Context) => {
  return ctx.prisma.user.create({ data: args });
};

export const updateUser = (args: { id: number; name?: string; email?: string }, ctx: Context) => {
  const { id, ...data } = args;
  return ctx.prisma.user.update({
    where: { id: Number(id) },
    data,
  });
};

export const deleteUser = (id: number, ctx: Context) => {
  return ctx.prisma.user.delete({ where: { id: Number(id) } });
};
