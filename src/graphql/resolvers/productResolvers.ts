import { Product } from "../../entity";
import { AppDataSource } from "../../dataSource";

export const productResolvers = {
  Query: {
    getProducts: async () => {
      // Returns all products
      return await AppDataSource.getRepository(Product).find();
    },
    getProduct: async (_: any, { id }: { id: string }) => {
      // Returns a single product by its ID
      return await AppDataSource.getRepository(Product).findOne({ where: { id } });
    },
  },
  Mutation: {
    createProduct: async (_: any, { name, price, categoryId }: { name: string; price: number; categoryId: string }) => {
      const productRepo = AppDataSource.getRepository(Product);
      // Create new product with a name, price, and category relation (assuming a categoryId field exists)
      const newProduct = productRepo.create({ name, price, category: { id: categoryId } });
      await productRepo.save(newProduct);
      return newProduct;
    },
    updateProduct: async (_: any, { id, name, price }: { id: string; name: string; price: number }) => {
      const productRepo = AppDataSource.getRepository(Product);
      const product = await productRepo.findOne({ where: { id } });
      if (!product) throw new Error("Product not found");
      product.name = name;
      product.price = price;
      await productRepo.save(product);
      return product;
    },
    deleteProduct: async (_: any, { id }: { id: string }) => {
      const productRepo = AppDataSource.getRepository(Product);
      const product = await productRepo.findOne({ where: { id } });
      if (!product) throw new Error("Product not found");
      await productRepo.remove(product);
      return true;
    },
  },
};
