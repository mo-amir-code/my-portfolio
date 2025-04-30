import express from "express";
import {
  createNewProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  updateProject,
} from "../../controllers/v1/project.controller";
import { zodValidation } from "../../services/zod";
import {
  createProjectZodSchema,
  deleteProjectByIDZodSchema,
  getProjectByIDZodSchema,
  updateProjectZodSchema,
} from "../../services/zod/project.zod";

const router = express.Router();

router.post("/", zodValidation(createProjectZodSchema), createNewProject);
router.get("/all", getAllProjects);
router.get("/:id", zodValidation(getProjectByIDZodSchema), getProjectById);
router.patch("/", zodValidation(updateProjectZodSchema), updateProject);
router.delete("/:id", zodValidation(deleteProjectByIDZodSchema), deleteProject);

export default router;
