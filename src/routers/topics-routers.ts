import { Router } from "express";

const topicRouters = Router()

topicRouters
  .all("/*",)
  .get("/in-themes/:themeId",)
  .get("/in-folders/:folderId")
  .post("/")
  .put("/:topicId",)
  .patch("/link/to-folders/:folderId")
  .patch("/link/to-themes/:folderId")
  .delete("/:topicId")

export { topicRouters }