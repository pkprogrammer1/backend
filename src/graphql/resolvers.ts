// src/graphql/resolvers.ts
import path from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers } from '@graphql-tools/merge';
import { IResolvers } from '@graphql-tools/utils';
import { Context } from '../context.js';

// load each module’s default export as an `IResolvers<any, Context>`
const modules = loadFilesSync(path.join(__dirname, '../modules/**/resolvers.{ts,js}'));
const resolversArray = modules as IResolvers<any, Context>[];

// now merge with the Context type fixed
export const resolvers = mergeResolvers(resolversArray) as IResolvers<any, Context>;
