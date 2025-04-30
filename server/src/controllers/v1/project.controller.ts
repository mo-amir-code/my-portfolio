import {
  apiHandler,
  ErrorHandlerClass,
  ok,
} from "../../services/errorHandling";
import {
  CreateProjectType,
  FindByIdAndUpdateProjectType,
} from "../../db/services/types";
import {
  createProject,
  deleteProjectById,
  findProjectByIdAndUpdate,
  getProjectByID,
} from "../../db/services/project.db.service";
import {
  PROJECT_CREATED_MSG,
  PROJECT_DELETED_MSG,
  PROJECT_FECTHED_MSG,
  PROJECT_NOT_FOUND_MSG,
  PROJECT_UPDATED_MSG,
} from "../../utils/constants/serverResponseMessages";
import { Project, User } from "../../db/schemas";
import { NOT_FOUND_STATUS_CODE } from "../../utils/constants/common";

// Create Project
const createNewProject = apiHandler(async (req, res) => {
  const data = req.body as CreateProjectType;

  const newProject = await createProject(data);

  return ok({
    res,
    message: PROJECT_CREATED_MSG,
    data: newProject,
  });
});

// Get All Projects
const getAllProjects = apiHandler(async (_req, res) => {
  const admin = await User.findOne({ role: "admin" });
  const projects = await Project.find({ userId: admin._id });

  return ok({
    res,
    message: PROJECT_FECTHED_MSG,
    data: projects,
  });
});

// Get Project by ID
const getProjectById = apiHandler(async (req, res, next) => {
  const { id } = req.params;

  const project = await getProjectByID({ id });

  if (!project) {
    return next(
      new ErrorHandlerClass(PROJECT_NOT_FOUND_MSG, NOT_FOUND_STATUS_CODE)
    );
  }

  return ok({
    res,
    message: PROJECT_FECTHED_MSG,
    data: project,
  });
});

// Update Project
const updateProject = apiHandler(async (req, res, next) => {
  const updates = req.body as FindByIdAndUpdateProjectType;

  const updatedProject = await findProjectByIdAndUpdate(updates);

  if (!updatedProject) {
    return next(
      new ErrorHandlerClass(PROJECT_NOT_FOUND_MSG, NOT_FOUND_STATUS_CODE)
    );
  }

  return ok({
    res,
    message: PROJECT_UPDATED_MSG,
    data: updatedProject,
  });
});

// Delete Project
const deleteProject = apiHandler(async (req, res, next) => {
  const { id } = req.params;

  const deletedProject = await deleteProjectById(id);

  if (!deletedProject) {
    return next(
      new ErrorHandlerClass(PROJECT_NOT_FOUND_MSG, NOT_FOUND_STATUS_CODE)
    );
  }

  return ok({
    res,
    message: PROJECT_DELETED_MSG,
  });
});

export {
  createNewProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
