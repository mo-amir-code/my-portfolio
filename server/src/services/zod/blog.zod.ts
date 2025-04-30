import z from "zod";
import { ZOD_REQUIRED_ERR } from "../../utils/constants/auth";

// Create Blog Schema
const createBlogZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: ZOD_REQUIRED_ERR.replace("{field}", "Title"),
    }),
    content: z.record(z.any(), {
      required_error: ZOD_REQUIRED_ERR.replace("{field}", "Content"),
    }),
    coverImage: z.string({
      required_error: ZOD_REQUIRED_ERR.replace("{field}", "Cover Image"),
    }),
    slug: z.string({
      required_error: ZOD_REQUIRED_ERR.replace("{field}", "Slug"),
    }).optional(),
    tags: z.array(z.string()).optional(),
    excerpt: z.string({
      required_error: ZOD_REQUIRED_ERR.replace("{field}", "Excerpt"),
    }),
    status: z.enum(["draft", "published", "archived"]).optional(),
  }),
});

// Get Blog by ID Schema
const getBlogByIDZodSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: ZOD_REQUIRED_ERR.replace("{field}", "Id"),
    }),
  }),
});

// Update Blog Schema
const updateBlogZodSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: ZOD_REQUIRED_ERR.replace("{field}", "Id"),
    }),
    title: z.string().optional(),
    content: z.record(z.any()).optional(),
    coverImage: z.string().optional(),
    slug: z.string().optional(),
    tags: z.array(z.string()).optional(),
    excerpt: z.string().optional(),
    status: z.enum(["draft", "published", "archived"]).optional(),
    views: z.number().optional(),
  }),
});

// Delete Blog Schema
const deleteBlogZodSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: ZOD_REQUIRED_ERR.replace("{field}", "Id"),
    }),
  }),
});

export {
  createBlogZodSchema,
  getBlogByIDZodSchema,
  updateBlogZodSchema,
  deleteBlogZodSchema,
};
