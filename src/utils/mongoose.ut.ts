// lib/mongoose.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

export const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) return;

  console.log("Connecting to MongoDB...", mongoose.connection.readyState);
  console.log("Connecting to:", process.env.MONGODB_URI);

  await mongoose.connect(MONGODB_URI, {
    dbName: "portfolio",
  });
};
