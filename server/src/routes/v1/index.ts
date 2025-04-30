import express from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import blogRoutes from "./blog.routes";
import projectRoutes from "./project.routes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/blog", blogRoutes);
router.use("/project", projectRoutes);

export default router;
