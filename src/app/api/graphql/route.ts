import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";
import { readFileSync, writeFileSync } from "fs";
import path from "path";

// Load data from data/projects.json
const projectsPath = path.join(process.cwd(), "data", "projects.json");
const projects: Project[] = JSON.parse(readFileSync(projectsPath, "utf-8"));

// Define TypeScript types
type Project = {
  id: string;
  name: string;
  heroImage?: string;
  overview?: string;
  challenge?: string;
  photos?: string[];
  details?: string[];
  url?: string;
};

// Define GraphQL schema
const typeDefs = gql`
  type Project {
    id: ID!
    name: String!
    heroImage: String
    overview: String
    challenge: String
    photos: [String!]
    details: [String!]
    url: String
  }

  type Query {
    projects: [Project!]!
    project(id: ID!): Project
  }

  type Mutation {
    addProject(
      id: ID!
      name: String!
      heroImage: String
      overview: String
      challenge: String
      photos: [String!]
      details: [String!]
      url: String
    ): Project
    deleteProject(id: ID!): Boolean
  }
`;

// Define resolvers
const resolvers = {
  Query: {
    projects: (): Project[] => projects,
    project: (_parent: unknown, args: { id: string }): Project | undefined =>
      projects.find((project) => project.id === args.id),
  },
  Mutation: {
    addProject: (_parent: unknown, args: Project): Project => {
      const newProject = { ...args };
      projects.push(newProject);
      writeFileSync(projectsPath, JSON.stringify(projects, null, 2));
      return newProject;
    },
    deleteProject: (_parent: unknown, args: { id: string }): boolean => {
      const projectIndex = projects.findIndex(
        (project) => project.id === args.id
      );
      if (projectIndex === -1) return false;
      projects.splice(projectIndex, 1);
      writeFileSync(projectsPath, JSON.stringify(projects, null, 2));
      return true;
    },
  },
};

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export const POST = startServerAndCreateNextHandler(server);
