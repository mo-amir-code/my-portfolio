import mongoose, { Schema } from "mongoose";
import { ProjectSchemaType } from "./types";
import { PROJECT_SCHEMA_NAME, SOCIALS_NAME } from "../../config/schemas";

const projectSchema: Schema<ProjectSchemaType> = new Schema<ProjectSchemaType>(
  {
    title: { type: String, required: [true, "Title is required"] },
    desc: {
      type: String,
      required: [true, "Description is required"]
    },
    users: { type: Number, default: 0 },
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
    images: [{ type: String }],
    completionDate: { type: Date, required: [true, "Completion date is required"] }
  },
  { timestamps: true }
);

export default mongoose.models[PROJECT_SCHEMA_NAME] ||
  mongoose.model<ProjectSchemaType>(PROJECT_SCHEMA_NAME, projectSchema);
