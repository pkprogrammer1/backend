import express, { NextFunction } from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./graphql/schema/typeUser";
import { resolvers } from "./graphql/resolvers/userResolvers";
import { AppDataSource } from "./dataSource";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cors from 'cors';


dotenv.config();
const app = express() as any;
app.use(cors({
  credentials: true,
  origin: ["https://studio.apollographql.com"],
}));

// Middleware to log requests
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});

const server = new ApolloServer({
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

async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  await AppDataSource.initialize();
  console.log("Connected to PostgreSQL");

  app.listen(process.env.PORT || 4000, () => {
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT || 4000}/graphql`);
  });
}

startServer().catch((err) => console.error("Error starting server", err));
