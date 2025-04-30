import z, { object } from "zod";
import { ZOD_REQUIRED_ERR } from "../../utils/constants/auth";
import { SOCIALS_NAME } from "../../config/schemas";

const createProjectZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: ZOD_REQUIRED_ERR.replace("{field}", "Title"),
    }),
    desc: z.string({
      required_error: ZOD_REQUIRED_ERR.replace("{field}", "Description"),
    }),
    users: z.number().optional(),
    socials: z.array(
      object({
        type: z.enum(SOCIALS_NAME),
        src: z.string(),
      })
    ),
    images: z.array(z.string()).optional(),
    completionDate: z
      .string({
        required_error: ZOD_REQUIRED_ERR.replace("{field}", "Completion date"),
      })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format. Use YYYY-MM-DD",
      }),
  }),
});

const getProjectByIDZodSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: ZOD_REQUIRED_ERR.replace("{field}", "Id"),
    }),
  }),
});

const updateProjectZodSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: ZOD_REQUIRED_ERR.replace("{field}", "Id"),
    }),
    title: z.string().optional(),
    desc: z.string().optional(),
    users: z.number().optional(),
    socials: z
      .array(
        object({
          type: z.enum(SOCIALS_NAME),
          src: z.string(),
        })
      )
      .optional(),
    images: z.array(z.string()).optional(),
    completionDate: z.coerce.date().optional(),
  }),
});

const deleteProjectByIDZodSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: ZOD_REQUIRED_ERR.replace("{field}", "Id"),
    }),
  }),
});

export {
  createProjectZodSchema,
  getProjectByIDZodSchema,
  updateProjectZodSchema,
  deleteProjectByIDZodSchema,
};
