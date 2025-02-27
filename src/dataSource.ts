import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL, // Use Heroku DATABASE_URL
  synchronize: true, // Change to false in production (use migrations instead)
  logging: false,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined, // Required for Heroku
  entities: ["src/entities/*.ts"], // Update path as needed
});
