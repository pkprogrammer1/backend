import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Category } from "./Category"; 

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column("float")
  price!: number;

  // Many products belong to one category
  @ManyToOne(() => Category, (category) => category.products)
  category!: Category;
}
