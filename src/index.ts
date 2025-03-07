import { ApolloServer } from "apollo-server";
import { typeDefs } from "./graphql/schema/typeUser";
import { resolvers } from "./graphql/resolvers/userResolvers";
import { AppDataSource } from "./dataSource";
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";

dotenv.config();

// Express for static files
const app = express();
app.use(express.static("public"));

const server = new ApolloServer({
  cors: {
    credentials: true,
    origin: [
      "https://studio.apollographql.com",
      "http://localhost:3000",
      "https://your-frontend-app.com",
    ],
  },
  typeDefs,
  resolvers,
  introspection: true,
  context: async ({ req }) => {
    const token = req.headers.authorization || "";
    if (!token) return {};

    try {
      const decodedToken = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET!) as { userId: string };
      return { userId: decodedToken.userId };
    } catch (err) {
      console.warn("Invalid token");
      return {};
    }
  },
});

// Start database and servers
AppDataSource.initialize()
  .then(() => {
    app.listen(4001, () => {
      console.log(`🚀 Express Server ready at 4001`);
    });

    server.listen({ port: 4000 }).then(({ url }) => {
      console.log(`🚀 GraphQL Server ready at ${url}`);
    });
  })
  .catch((error) => {
    console.error("Error initializing data source:", error);
  });
