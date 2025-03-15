import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../entity/User";
import { AppDataSource } from "../../dataSource";

export const userResolvers = {
  Query: {
    getHealth: () => "Server is running......",
    me: async (_: any, __: any, context: { userId?: string }) => {
      if (!context.userId) throw new Error("Not authenticated");
      return await AppDataSource.getRepository(User).findOne({ where: { id: context.userId } });
    },
  },
  Mutation: {
    register: async (_: any, { email, password }: { email: string; password: string }) => {
      const userRepo = AppDataSource.getRepository(User);
      const existingUser = await userRepo.findOne({ where: { email } });
      if (existingUser) throw new Error("User already exists");

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = userRepo.create({ email, password: hashedPassword });
      await userRepo.save(newUser);

      const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET!, { expiresIn: "1h" });

      return { ...newUser, token };
    },
    login: async (_: any, { email, password }: { email: string; password: string }) => {
      const userRepo = AppDataSource.getRepository(User);
      const user = await userRepo.findOne({ where: { email } });
      if (!user) throw new Error("User not found");

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) throw new Error("Invalid credentials");

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "1h" });

      return { ...user, token };
    },
  },
};
