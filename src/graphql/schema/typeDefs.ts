import { userTypeDefs } from "./userTypeDefs";
import { categoryTypeDefs } from "./categoryTypeDefs";
import { productTypeDefs } from "./productTypeDefs";

// import { gql } from "apollo-server-express";

// // Base schema for shared Query and Mutation types
// const baseTypeDefs = gql`
//   type Query {
//     getHealth: String!
//     me: User
//   }

//   type Mutation {
//     register(email: String!, password: String!): User
//     login(email: String!, password: String!): User
//   }
// `;

export const typeDefs = [
  userTypeDefs,
  categoryTypeDefs,
  productTypeDefs,
];
