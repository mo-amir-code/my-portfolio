import { object, z } from "zod";
import { ZOD_REQUIRED_ERR } from "../../utils/constants/auth.js";
import { SOCIALS_NAME, USERS_ROLE } from "../../config/schemas.js";

const registerUserZodSchema = z.object({
  body: z.object({
    fullName: z.object({
      first: z.string({
        required_error: ZOD_REQUIRED_ERR.replace("{field}", "First name"),
      }),
      last: z.string().optional(),
    }),
    email: z
      .string({
        required_error: ZOD_REQUIRED_ERR.replace("{field}", "Email"),
      })
      .email("Not a valid email"),
    password: z
      .string({
        required_error: ZOD_REQUIRED_ERR.replace("{field}", "Password"),
      })
      .min(6, "Password length must be at least 6 characters"),
    socials: z
      .array(
        object({
          type: z.enum(SOCIALS_NAME),
          src: z.string(),
        })
      )
      .optional(),
    headline: z.string().optional(),
    about: z.string().optional(),
    role: z.enum(USERS_ROLE).optional(),
  }),
});

const signInUserZodSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: ZOD_REQUIRED_ERR.replace("{field}", "Email"),
      })
      .email("Not a valid email"),
    password: z
      .string({
        required_error: ZOD_REQUIRED_ERR.replace("{field}", "Password"),
      })
      .min(6, "Password length must be at least 6 characters"),
  }),
});

const verifyOTPZodSchema = z.object({
  body: z.object({
    otp: z.number({
      required_error: ZOD_REQUIRED_ERR.replace("{field}", "OTP"),
    }),
  }),
});

const forgotPasswordZodSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: ZOD_REQUIRED_ERR.replace("{field}", "Email"),
      })
      .email("Not a valid email"),
  }),
});

const resetPasswordZodSchema = z.object({
  body: z.object({
    otp: z.number({
      required_error: ZOD_REQUIRED_ERR.replace("{field}", "OTP"),
    }),
    newPassword: z
      .string({
        required_error: ZOD_REQUIRED_ERR.replace("{field}", "New password"),
      })
      .min(6, "New password length must be at least 6 characters"),
    otptoken: z.string().optional(),
  }),
});

export {
  registerUserZodSchema,
  signInUserZodSchema,
  verifyOTPZodSchema,
  forgotPasswordZodSchema,
  resetPasswordZodSchema,
};
