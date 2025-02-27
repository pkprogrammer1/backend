// import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// @Entity()
// export class User {
//   @PrimaryGeneratedColumn()
//   id!: number; // ✅ Fix: Tells TypeScript that TypeORM will initialize this property

//   @Column({ unique: true })
//   email!: string; // ✅ Fix: Ensure email is always assigned

//   @Column()
//   password!: string; // ✅ Fix: Ensure password is always assigned

//   @Column({ default: "" })
//   name!: string; // ✅ Fix: Ensure name is always assigned
// }

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;
}



