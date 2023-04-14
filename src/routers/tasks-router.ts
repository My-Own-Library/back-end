import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const tasksRouters = Router()

//taskSchedule in DB

tasksRouters
  .all("/*", authenticateToken)
  .get("/by-theme/:themeId",)
  .post("/",)
  .put("/:taskId",)
  .delete("/:taskId",)

export { tasksRouters }