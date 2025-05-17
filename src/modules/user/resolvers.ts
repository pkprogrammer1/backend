import { IResolvers } from '@graphql-tools/utils';
import * as userService from './servcies.js';
import { Context } from '../.././context.js';

const userResolvers: IResolvers<any, Context> = {
  Query: {
    getUsers: (_p, _a, ctx) => userService.getUsers(ctx),
    getUser: (_p, args, ctx) =>
      userService.getUser(Number(args.id), ctx),
  },
  Mutation: {
    createUser: (_p, args, ctx) => userService.createUser(args, ctx),
    updateUser: (_p, args, ctx) => userService.updateUser(args, ctx),
    deleteUser: (_p, args, ctx) =>
      userService.deleteUser(Number(args.id), ctx),
  },
};

export default userResolvers;
