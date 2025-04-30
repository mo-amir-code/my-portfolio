import { Schema } from "mongoose";
import { Blog } from "../schemas"; // adjust the path if Blog model is in a different location
import { CreateBlogType, FindByIdAndUpdateBlogType } from "./types";
import { BlogSchemaType } from "../schemas/types";

const createBlog = async (data: CreateBlogType): Promise<BlogSchemaType> => {
  return await Blog.create(data);
};

const deleteBlogById = async (
  blogId: Schema.Types.ObjectId
): Promise<BlogSchemaType | null> => {
  return await Blog.findByIdAndDelete(blogId);
};

const findBlogByIdAndUpdate = async (
  data: FindByIdAndUpdateBlogType
): Promise<BlogSchemaType | null> => {
  return await Blog.findByIdAndUpdate(data.id, { ...data }, { new: true });
};

const getBlogById = async ({
  id,
}: {
  id: string;
}): Promise<BlogSchemaType | null> => {
  return await Blog.findById(id);
};

export { createBlog, deleteBlogById, findBlogByIdAndUpdate, getBlogById };
