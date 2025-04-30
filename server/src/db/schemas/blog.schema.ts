import mongoose, { Schema } from "mongoose";
import { BlogSchemaType, ProjectSchemaType } from "./types";
import {
  BLOG_SCHEMA_NAME,
  BLOG_STATUS,
  USER_SCHEMA_NAME,
} from "../../config/schemas";

const blogSchema: Schema<BlogSchemaType> = new Schema<BlogSchemaType>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: USER_SCHEMA_NAME,
      required: [true, "UserId is required"],
    },
    title: { type: String, required: [true, "Title is required"] },
    content: { type: Object, required: [true, "Content is required"] },
    coverImage: { type: String, required: [true, "Cover image is required"] },
    slug: { type: String, required: [true, "Slug is required"], unique: true },
    views: { type: Number, default: 0 },
    tags: [{ type: String }],
    excerpt: { type: String, required: [true, "Excerpt is required"] },
    status: { type: String, default: "draft", enum: BLOG_STATUS },
  },
  { timestamps: true }
);

export default mongoose.models[BLOG_SCHEMA_NAME] ||
  mongoose.model<BlogSchemaType>(BLOG_SCHEMA_NAME, blogSchema);
