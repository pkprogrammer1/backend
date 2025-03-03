import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../entity/user";
import { AppDataSource } from "../../dataSource";

export const resolvers = {
  Query: {
    getHealth: () => "Server is running",
    me: async (_, __, context) => {
      if (!context.userId) throw new Error("Not authenticated");
      return await AppDataSource.getRepository(User).findOne({ where: { id: context.userId } });
    },
  },
  Mutation: {
    register: async (_, { email, password }) => {
      const userRepo = AppDataSource.getRepository(User);
      const existingUser = await userRepo.findOne({ where: { email } });
      if (existingUser) throw new Error("User already exists");

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = userRepo.create({ email, password: hashedPassword });
      await userRepo.save(newUser);

      const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET!, { expiresIn: "1h" });

      return { ...newUser, token };
    },
    login: async (_, { email, password }) => {
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
