import { Router } from "express";

const tasksRouters = Router()

//taskSchedule in DB

tasksRouters
  .all("/*",)
  .get("/by-theme/:themeId",)
  .post("/",)
  .put("/:taskId",)
  .delete("/:taskId",)

export { tasksRouters }