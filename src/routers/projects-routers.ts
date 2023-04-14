import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const projectsRouters = Router()

projectsRouters
  .all("/*", authenticateToken)
  .get("/by-theme/:themeId",)
  .post("/",)
  .put("/:projectId",)
  .delete("/:projectId",)

export { projectsRouters }