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
import { registerUserZodSchema } from "../../services/zod/auth.zod";

const router = express.Router();

router.post(
  "/register",
  zodValidation(registerUserZodSchema),
  registerUser,
  sendOTP
);
router.post("/signin", signInUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset", resetPassword);
router.post("/verify", verifyOTP);

export default router;
