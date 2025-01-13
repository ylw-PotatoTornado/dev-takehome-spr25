import mongoose from "mongoose";

if (!process.env.MONGO_URI) {
  throw new Error(
    "Please define MongoDB connection string (MONGO_URI) in .env file.",
  );
}

// Declare global with extra property to avoid multiple connections
declare global {
  var mongoose: {
    conn: mongoose.Mongoose | null;
    promise: Promise<mongoose.Mongoose> | null;
  };
}

global.mongoose = global.mongoose || { conn: null, promise: null };

export const connectDB = async (): Promise<mongoose.Mongoose> => {
  if (global.mongoose.conn) {
    console.log(`MongoDB connected: ${global.mongoose.conn.connection.host}`);
    return global.mongoose.conn;
  }

  /** Estalibsh new connection when no prev connection exist */
  if (!global.mongoose.promise) {
    console.log("Creating new MongoDB connection.");

    try {
      global.mongoose.promise = mongoose.connect(process.env.MONGO_URI!, {
        bufferCommands: false,
      });

      global.mongoose.conn = await global.mongoose.promise;
      console.log(`MongoDB connected: ${global.mongoose.conn.connection.host}`);
    } catch (error) {
      console.error("Error connecting MongoDB", error);
      throw new Error("Failed to connect to MongoDB");
    }
  }

  return global.mongoose.conn;
};
