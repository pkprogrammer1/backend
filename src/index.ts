import express, { Request, Response, NextFunction } from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schema";
import { AppDataSource } from "./dataSource";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});

// GraphQL endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

// Initialize database connection
AppDataSource.initialize()
  .then(async () => {
    console.log("Connected to PostgreSQL");

    // Test database connection
    try {
      const result = await AppDataSource.query("SELECT 1 + 1 AS result");
      console.log("Test Query Result:", result);
    } catch (error) {
      console.error("Database test query failed:", error);
    }

    // Start the server
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/graphql`);
    });
  })
  .catch((error) => {
    console.error("Error initializing database:", error);
  });
