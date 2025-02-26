import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { User } from "../entity/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../dataSource";

@Resolver()
export class UserResolver {
  private userRepo = AppDataSource.getRepository(User);

  @Mutation(() => String)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("name", { nullable: true }) name?: string
  ): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepo.create({ email, password: hashedPassword, name });
    await this.userRepo.save(user);
    return "User registered successfully!";
  }

  @Mutation(() => String)
  async login(@Arg("email") email: string, @Arg("password") password: string): Promise<string> {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) throw new Error("User not found");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Invalid password");

    return jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "1h" });
  }

  @Query(() => User, { nullable: true }) // ✅ Mark the GraphQL return type as nullable
  async profile(@Arg("token") token: string): Promise<User | null> { // ✅ Fix TypeScript return type
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
      return await this.userRepo.findOne({ where: { id: decoded.userId } }); // ✅ Now TypeScript allows null
    } catch (err) {
      throw new Error("Invalid token");
    }
  }
}
