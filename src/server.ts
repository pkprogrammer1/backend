// src/server.ts
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import cors from 'cors';
import { json } from 'body-parser';
import { typeDefs } from './graphql/typeDefs.js';
import { resolvers } from './graphql/resolvers.js';
import { createContext, Context } from './context.js';
import { ExpressContextFunctionArgument } from '@apollo/server/express4';

export async function start() {
  const app = express();
  app.use(cors(), json());

  // Note the <Context> generic here
  const server = new ApolloServer<Context>({
    typeDefs,
    resolvers,
  });
  await server.start();

  // Pass a context‐factory function
  app.use(
    '/graphql',
    expressMiddleware(server, {
        context: async ({ req, res }: ExpressContextFunctionArgument) => createContext(),
    })
 );

  const port = process.env.PORT ?? 4000;
  app.listen(port, () =>
    console.log(`🚀 Server ready at http://localhost:${port}/graphql`)
  );
}

start();
