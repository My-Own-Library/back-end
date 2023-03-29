import { Router } from "express";

const evolutionRouters = Router()

evolutionRouters
  .all("/*",)
  .get("/by-theme/:themeId",)
  .get("/by-topic/:topicId",)
  .post("/",)

export { evolutionRouters }