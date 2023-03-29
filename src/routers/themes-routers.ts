import { Router } from "express";

const themesRouters = Router()

themesRouters
  .all("/*",)
  .get("/",)
  .post("/",)
  .put("/:themeId",)
  .delete("/:themeId")

export { themesRouters }