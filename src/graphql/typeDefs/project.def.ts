import { gql } from "graphql-tag";

export default gql`
  type Project {
    id: ID!
    type: String!
    name: String!
    heroImage: String
    overview: String
    challenge: String
    photos: [String!]
    details: [String!]
    url: String
    category: String
  }

  extend type Query {
    projects(category: String, type: String): [Project!]!
    project(id: ID!): Project
  }

  extend type Mutation {
    addProject(
      type: String!
      name: String!
      heroImage: String
      overview: String
      challenge: String
      photos: [String!]
      details: [String!]
      url: String
      category: String
    ): Project
    deleteProject(id: ID!): Boolean
    updateProject(
      type: String
      id: ID!
      name: String
      heroImage: String
      overview: String
      challenge: String
      photos: [String!]
      details: [String!]
      url: String
      category: String
    ): Project
  }

  scalar Upload
`;
