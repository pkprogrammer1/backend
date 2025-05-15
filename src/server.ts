// src/server.ts
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import { json } from 'body-parser';
import { typeDefs } from './graphql/typeDefs.js';
import { resolvers } from './graphql/resolvers.js';
import { createContext, Context } from './context.js';
import { ExpressContextFunctionArgument } from '@apollo/server/express4';

export async function start() {
  const app = express();
  
  // Create Apollo Server
  const server = new ApolloServer<Context>({
    typeDefs,
    resolvers,
  });

  await server.start();

  // Apply middleware
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: async ({ req, res }: ExpressContextFunctionArgument) => createContext({ req, res }),
    })
  );

  const port = process.env.PORT ?? 4000;
  app.listen(port, () =>
    console.log(`🚀 Server ready at http://localhost:${port}/graphql`)
  );
}

start();