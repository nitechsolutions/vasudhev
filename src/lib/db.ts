import mongoose, { Mongoose } from "mongoose";


const mongo = process.env.MONGO_URI;

if (!mongo) {
  throw new Error("Please define MONGO_URI in .env.local");
}

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}


const cached: MongooseCache =
  global.mongoose || { conn: null, promise: null };

global.mongoose = cached;


export async function connectDB(): Promise<Mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongo, {
      dbName: "vasudhev",
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
