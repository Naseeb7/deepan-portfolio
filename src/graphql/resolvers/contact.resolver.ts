import Contact from "@/models/Contacts.mo";
import { connectToDatabase } from "@/utils/mongoose.ut";

const ContactResolver = {
  Mutation: {
    submitContact: async (_: any, args: any) => {
      await connectToDatabase();
      return await Contact.create(args);
    },
  },
};

export default ContactResolver;
