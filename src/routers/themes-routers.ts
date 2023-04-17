import { createTheme, deleteTheme, getThemes, updateTheme } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { JustNameSchema } from "@/models/theme-schema";
import { Router } from "express";

const themesRouters = Router()

themesRouters
  .all("/*", authenticateToken)
  .get("/", getThemes)
  .post("/",validateBody(JustNameSchema) , createTheme)
  .put("/:theme_id",validateBody(JustNameSchema),  updateTheme)
  .delete("/:theme_id", deleteTheme)

export { themesRouters }