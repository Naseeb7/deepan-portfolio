import { gql } from "graphql-tag";

export default gql`
  type Contact {
    id: ID!
    name: String
    email: String
    message: String
    createdAt: String
  }

  extend type Mutation {
    submitContact(name: String, email: String, message: String): Contact
  }
`;
