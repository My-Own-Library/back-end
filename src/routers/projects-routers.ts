import { Router } from "express";

const projectsRouters = Router()

projectsRouters
  .all("/*",)
  .get("/by-theme/:themeId",)
  .post("/",)
  .put("/:projectId",)
  .delete("/:projectId",)

export { projectsRouters }