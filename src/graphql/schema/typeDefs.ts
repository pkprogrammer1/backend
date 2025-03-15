import { userTypeDefs } from "./userTypeDefs";
import { categoryTypeDefs } from "./categoryTypeDefs";
import { productTypeDefs } from "./productTypeDefs";

import { gql } from "apollo-server-express";

// // Base schema for shared Query and Mutation types
// const baseTypeDefs = gql`
//   type Query {
//     getHealth: String!
//     me: User
//     # Other Query fields from Category and Product will extend this
//   }

//   type Mutation {
//     register(email: String!, password: String!): User
//     login(email: String!, password: String!): User
//     # Other Mutation fields from Category and Product will extend this
//   }
// `;

export const typeDefs = [
  userTypeDefs,
  categoryTypeDefs,
  productTypeDefs,
];
