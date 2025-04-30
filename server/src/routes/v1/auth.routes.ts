import express from "express";
import {
  forgotPassword,
  registerUser,
  resetPassword,
  sendOTP,
  signInUser,
  verifyOTP,
} from "../../controllers/v1/auth.controller";
import { zodValidation } from "../../services/zod";
import {
  forgotPasswordZodSchema,
  registerUserZodSchema,
  resetPasswordZodSchema,
  signInUserZodSchema,
  verifyOTPZodSchema,
} from "../../services/zod/auth.zod";

const router = express.Router();

router.post(
  "/register",
  zodValidation(registerUserZodSchema),
  registerUser,
  sendOTP
);
router.post("/signin", zodValidation(signInUserZodSchema), signInUser);
router.post(
  "/forgot-password",
  zodValidation(forgotPasswordZodSchema),
  forgotPassword,
  sendOTP
);
router.post(
  "/reset-password",
  zodValidation(resetPasswordZodSchema),
  resetPassword
);
router.post("/verify", zodValidation(verifyOTPZodSchema), verifyOTP);

export default router;
