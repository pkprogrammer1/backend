import { Category } from "../../entity";
import { AppDataSource } from "../../dataSource";

export const categoryResolvers = {
  Query: {
    getCategories: async () => {
      // Returns all categories
      return await AppDataSource.getRepository(Category).find();
    },
    getCategory: async (_: any, { id }: { id: string }) => {
      // Returns a single category by its ID
      return await AppDataSource.getRepository(Category).findOne({ where: { id } });
    },
  },
  Mutation: {
    createCategory: async (_: any, { name }: { name: string }) => {
      const categoryRepo = AppDataSource.getRepository(Category);
      const newCategory = categoryRepo.create({ name });
      await categoryRepo.save(newCategory);
      return newCategory;
    },
    updateCategory: async (_: any, { id, name }: { id: string; name: string }) => {
      const categoryRepo = AppDataSource.getRepository(Category);
      const category = await categoryRepo.findOne({ where: { id } });
      if (!category) throw new Error("Category not found");
      category.name = name;
      await categoryRepo.save(category);
      return category;
    },
    deleteCategory: async (_: any, { id }: { id: string }) => {
      const categoryRepo = AppDataSource.getRepository(Category);
      const category = await categoryRepo.findOne({ where: { id } });
      if (!category) throw new Error("Category not found");
      await categoryRepo.remove(category);
      return true;
    },
  },
};
