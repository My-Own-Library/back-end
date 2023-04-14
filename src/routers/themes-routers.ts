import { createTheme, deleteTheme, getThemes, updateTheme } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const themesRouters = Router()

themesRouters
  .all("/*", authenticateToken)
  .get("/", getThemes)
  .post("/", createTheme)
  .put("/:theme_id", updateTheme)
  .delete("/:theme_id", deleteTheme)

export { themesRouters }