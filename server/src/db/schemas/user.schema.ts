import mongoose, { Schema } from "mongoose";
import { UserSchemaType } from "./types";
import {
  SOCIALS_NAME,
  USER_SCHEMA_NAME,
  USERS_ROLE,
} from "../../config/schemas";

const userSchema: Schema<UserSchemaType> = new Schema<UserSchemaType>(
  {
    fullName: {
      first: { type: String, required: [true, "First name is requried"] },
      last: { type: String },
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    socials: [
      {
        type: {
          type: String,
          required: [true, "Social type is required"],
          enum: SOCIALS_NAME,
        },
        src: { type: String, required: [true, "Source link is required"] },
      },
    ],
    headline: {
      type: String,
    },
    about: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
      enum: USERS_ROLE,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    session: { type: String },
    otp: { type: String },
    otpToken: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models[USER_SCHEMA_NAME] ||
  mongoose.model<UserSchemaType>(USER_SCHEMA_NAME, userSchema);
