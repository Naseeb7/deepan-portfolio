import Project from "@/models/Project.mo";
import { verifyAdmin } from "@/utils/auth.ut";
import { connectToDatabase } from "@/utils/mongoose.ut";

const ProjectResolver = {
  Query: {
    projects: async (_: any, { category }: any) => {
      await connectToDatabase();
      const filter = category ? { category } : {};
      return await Project.find(filter);
    },
    project: async (_: any, { id }: any) => {
      await connectToDatabase();
      return await Project.findOne({ _id: id });
    },
  },
  Mutation: {
    addProject: async (_: any, args: any, context: any) => {
      await verifyAdmin(context.token);
      await connectToDatabase();
      return await Project.create(args);
    },
    deleteProject: async (_: any, { id }: any, context: any) => {
      await verifyAdmin(context.token);
      await connectToDatabase();
      const result = await Project.deleteOne({ _id: id });
      return result.deletedCount === 1;
    },
    updateProject: async (_: any, args: any, context: any) => {
      await verifyAdmin(context.token);
      await connectToDatabase();
      const result = await Project.findOneAndUpdate(
        { _id: args.id },
        {
          $set: { ...args },
        },
        {
          new: true,
        }
      );
      return result;
    },
  },
};

export default ProjectResolver;
