import { gql } from "apollo-server-express";

export const categoryTypeDefs = gql`
  type Category {
    id: ID!
    name: String!
  }

  extend type Query {
    getCategories: [Category!]!
    getCategory(id: ID!): Category
  }

  extend type Mutation {
    createCategory(name: String!): Category!
    updateCategory(id: ID!, name: String!): Category!
    deleteCategory(id: ID!): Boolean!
  }
`;
