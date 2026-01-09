import { BlogType } from "@/types/app/blog";
import mongoose, { Document, Model } from "mongoose";

export interface IBlog extends BlogType { }


export interface IBlogDocument extends IBlog, Document {
    createdAt: Date;
    updatedAt: Date;
}

const blogSchema = new mongoose.Schema<IBlogDocument>(
    {
        title: { type: String, required: [true, "Title is required"] },
        coverImage: { type: String, required: [true, "Cover image is required"] },
        slug: { type: String, unique: true, required: [true, "Slug is required"] },
        publishedAt: { type: Date, required: [true, "Published date is required"] },
        summary: { type: String, required: [true, "Summary is required"] },
        content: { type: String, required: [true, "Content is required"] },
        status: { type: String, enum: ["draft", "publish", "deleted"] },
    },
    {
        timestamps: true,
    }
);


const Blog: Model<IBlogDocument> =
    mongoose.models?.Blog || mongoose.model("Blog", blogSchema);

export default Blog;
