import { gql } from "graphql-tag";

export default gql`
  type Contact {
    id: ID!
    firstName: String
    lastName: String
    email: String
    phone: String
    message: String
    createdAt: String
  }

  extend type Mutation {
    submitContact(
      firstName: String
      lastName: String
      email: String
      phone: String
      message: String
    ): Contact
  }
`;
