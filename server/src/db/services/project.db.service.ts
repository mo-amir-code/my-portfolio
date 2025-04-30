import { Schema } from "mongoose";
import { ProjectSchemaType, UserSchemaType } from "../schemas/types";
import { Project } from "../schemas";
import { CreateProjectType, FindByIdAndUpdateProjectType } from "./types";

const createProject = async (
  data: CreateProjectType
): Promise<ProjectSchemaType> => {
  return await Project.create(data);
};

const deleteProjectById = async (
  projectId: string
): Promise<ProjectSchemaType | null> => {
  return await Project.findByIdAndDelete(projectId);
};

const findProjectByIdAndUpdate = async (
  data: FindByIdAndUpdateProjectType
): Promise<UserSchemaType | null> => {
  return await Project.findByIdAndUpdate(data.id, { ...data });
};

const getProjectByID = async ({
  id,
}: {
  id: string;
}): Promise<UserSchemaType | null> => {
  return Project.findById(id);
};

export {
  createProject,
  deleteProjectById,
  findProjectByIdAndUpdate,
  getProjectByID,
};
