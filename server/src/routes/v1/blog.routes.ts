import express from "express";
import {
  createNewBlog,
  deleteBlog,
  getAllBlogs,
  getBlogByIdHandler,
  updateBlog,
} from "../../controllers/v1/blog.controller";
import { zodValidation } from "../../services/zod";
import {
  createBlogZodSchema,
  deleteBlogZodSchema,
  getBlogByIDZodSchema,
  updateBlogZodSchema,
} from "../../services/zod/blog.zod";

const router = express.Router();

router.post("/", zodValidation(createBlogZodSchema), createNewBlog);
router.get("/all", getAllBlogs);
router.get("/:id", zodValidation(getBlogByIDZodSchema), getBlogByIdHandler);
router.patch("/", zodValidation(updateBlogZodSchema), updateBlog);
router.delete("/:id", zodValidation(deleteBlogZodSchema), deleteBlog);

export default router;
