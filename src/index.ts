import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./graphql/schema/typeDefs";
import { resolvers } from "./graphql/resolvers";
import { AppDataSource } from "./dataSource";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static("public"));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  context: async ({ req }) => {
    const token = req.headers.authorization || "";
    if (!token) return {};
    const isIntrospectionQuery = req.body?.query?.includes('__schema');
    if (isIntrospectionQuery) return {};
    
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
  await AppDataSource.initialize();
  console.log("✅ Connected to PostgreSQL....");

  await server.start();
  server.applyMiddleware({ app: app as any, path: "/" });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => console.error("❌ Error starting server:", err));
