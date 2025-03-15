import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Category, Product } from "./entity";
import { User } from './entity/User';

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true, 
  logging: true,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,
  entities: [User, Product, Category], 
});