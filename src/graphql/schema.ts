import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import rootDef from "./typeDefs/root.def";
import projectDef from "./typeDefs/project.def";
import usersDef from "./typeDefs/users.def";
import contactDef from "./typeDefs/contact.def";
import UserResolver from "./resolvers/user.resolver";
import ContactResolver from "./resolvers/contact.resolver";
import ProjectResolver from "./resolvers/project.resolver";

export const typeDefs = mergeTypeDefs([
  rootDef,
  projectDef,
  usersDef,
  contactDef,
]);
export const resolvers = mergeResolvers([
  ProjectResolver,
  UserResolver,
  ContactResolver,
]);
