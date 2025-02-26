import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL, // Uses Heroku Postgres URL
  synchronize: true, // Set to false in production
  logging: true,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false, // Required for Heroku
  entities: ["src/entity/*.ts"],
});
