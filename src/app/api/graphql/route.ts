import { resolvers, typeDefs } from "@/graphql/schema";
import { connectToDatabase } from "@/utils/mongoose.ut";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

export const POST = async (req: Request, ctx: any) => {
  await connectToDatabase();

  const handler = startServerAndCreateNextHandler(server, {
    // @ts-expect-error next
    context: async () => {
      const auth = req.headers.get("authorization");
      const token = auth?.split(" ")[1];
      return { token };
    },
  });

  return handler(req, ctx);
};
