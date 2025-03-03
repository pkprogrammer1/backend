import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    password: String!
    token: String
  }

  type Query {
    getHealth: String!
    me: User
  }

  type Mutation {
    register(email: String!, password: String!): User
    login(email: String!, password: String!): User
  }
`;
