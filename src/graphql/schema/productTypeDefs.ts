import { gql } from "apollo-server-express";

export const productTypeDefs = gql`
  type Product {
    id: ID!
    name: String!
    price: Float!
    # Optionally, if you want to resolve the related Category:
    category: Category
  }

  extend type Query {
    getProducts: [Product!]!
    getProduct(id: ID!): Product
  }

  extend type Mutation {
    createProduct(name: String!, price: Float!, categoryId: ID!): Product!
    updateProduct(id: ID!, name: String!, price: Float!): Product!
    deleteProduct(id: ID!): Boolean!
  }
`;
