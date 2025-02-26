import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/userResolvers";
import { AppDataSource } from "./dataSource";
import dotenv from "dotenv";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

dotenv.config();

(async () => {
  await AppDataSource.initialize();
  const app = express();

  const server = new ApolloServer({
    schema: await buildSchema({ resolvers: [UserResolver] }),
    introspection: true,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await server.start();
  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("🚀 Server ready at http://localhost:4000/graphql");
  });
})();
