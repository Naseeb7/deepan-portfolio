import { gql } from "graphql-tag";

export default gql`
  type User {
    id: ID!
    username: String!
    isAdmin: Boolean
  }

  extend type Mutation {
    register(username: String!, password: String!): User
    login(username: String!, password: String!): String
  }
`;
