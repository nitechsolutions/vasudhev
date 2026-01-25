// models/Post.ts
import mongoose, { Schema, Model, Document, Types } from "mongoose";

export interface IPost extends Document {
  title: string;
  slug: string;
  category: string;
  description: string;

  image?: string;
  tags: string[];

  featured: boolean;
  trending: boolean;

  author: Types.ObjectId;
  views: number;

  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    category: {
      type: String,
      required: true,
      index: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    tags: {
      type: [String],
      default: [],
      index: true,
    },

    featured: {
      type: Boolean,
      default: false,
      index: true,
    },

    trending: {
      type: Boolean,
      default: false,
      index: true,
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Post: Model<IPost> =
  mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);

export default Post;
