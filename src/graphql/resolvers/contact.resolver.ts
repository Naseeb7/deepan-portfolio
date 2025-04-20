import Contact from "@/app/models/Contacts.mo";
import { connectToDatabase } from "@/utils/mongoose";

const ContactResolver = {
  Mutation: {
    submitContact: async (_: any, args: any) => {
      await connectToDatabase();
      return await Contact.create(args);
    },
  },
};

export default ContactResolver;
