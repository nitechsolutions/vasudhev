import mongoose, { Mongoose } from "mongoose";

/* =========================================================
   ENV VALIDATION
========================================================= */
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("Please define MONGO_URI in .env.local");
}

/* =========================================================
   GLOBAL CACHE TYPE
========================================================= */
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

/* =========================================================
   CACHED CONNECTION
========================================================= */
const cached: MongooseCache =
  global.mongoose || { conn: null, promise: null };

global.mongoose = cached;

/* =========================================================
   CONNECT DB
========================================================= */
export async function connectDB(): Promise<Mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      dbName: "blogdb",
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
