import User from "@/app/models/Users.mo";
import { connectToDatabase } from "@/utils/mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "jwt-secret";

const UserResolver = {
  Mutation: {
    login: async (_: any, { username, password }: any) => {
      await connectToDatabase();
      const user = await User.findOne({ username });
      if (!user) throw new Error("User not found");

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error("Wrong password");

      return jwt.sign(
        { id: user._id, username: user.username, isAdmin: user.isAdmin },
        SECRET,
        { expiresIn: "1d" }
      );
    },
  },
};

export default UserResolver;
