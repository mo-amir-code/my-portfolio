import { Blog } from "../../db/schemas";
import {
  createBlog,
  deleteBlogById,
  findBlogByIdAndUpdate,
  getBlogById,
} from "../../db/services/blog.db.service";
import {
  CreateBlogType,
  FindByIdAndUpdateBlogType,
} from "../../db/services/types";
import {
  apiHandler,
  ErrorHandlerClass,
  ok,
} from "../../services/errorHandling";
import { NOT_FOUND_STATUS_CODE } from "../../utils/constants/common";
import {
  BLOG_CREATED_MSG,
  BLOG_DELETED_MSG,
  BLOG_FETCHED_MSG,
  BLOG_NOT_FOUND_MSG,
  BLOG_UPDATED_MSG,
} from "../../utils/constants/serverResponseMessages";

// Create Blog
const createNewBlog = apiHandler(async (req, res) => {
  const blogData = req.body as CreateBlogType;
  const blog = await createBlog(blogData);

  return ok({
    res,
    message: BLOG_CREATED_MSG,
    data: {
      id: blog._id,
      slug: blog.slug,
    },
  });
});

// Get All Blogs
const getAllBlogs = apiHandler(async (_req, res) => {
  const blogs = await Blog.find();

  return ok({
    res,
    message: BLOG_FETCHED_MSG,
    data: blogs,
  });
});

// Get Blog by ID
const getBlogByIdHandler = apiHandler(async (req, res, next) => {
  const { id } = req.params;
  const blog = await getBlogById({ id });

  if (!blog) {
    return next(
      new ErrorHandlerClass(BLOG_NOT_FOUND_MSG, NOT_FOUND_STATUS_CODE)
    );
  }

  return ok({
    res,
    message: BLOG_FETCHED_MSG,
    data: blog,
  });
});

// Update Blog
const updateBlog = apiHandler(async (req, res, next) => {
  const updates = req.body as FindByIdAndUpdateBlogType;
  const updatedBlog = await findBlogByIdAndUpdate(updates);

  if (!updatedBlog) {
    return next(
      new ErrorHandlerClass(BLOG_NOT_FOUND_MSG, NOT_FOUND_STATUS_CODE)
    );
  }

  return ok({
    res,
    message: BLOG_UPDATED_MSG,
    data: updatedBlog,
  });
});

// Delete Blog
const deleteBlog = apiHandler(async (req, res, next) => {
  const { id } = req.params;
  const deleted = await deleteBlogById(id);

  if (!deleted) {
    return next(
      new ErrorHandlerClass(BLOG_NOT_FOUND_MSG, NOT_FOUND_STATUS_CODE)
    );
  }

  return ok({
    res,
    message: BLOG_DELETED_MSG,
  });
});

export {
  createNewBlog,
  getAllBlogs,
  getBlogByIdHandler,
  updateBlog,
  deleteBlog,
};
