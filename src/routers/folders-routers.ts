import { Router } from "express";

const folderRouters = Router()

folderRouters
  .all("/*",)
  .get("/in-themes/:themeId",)
  .post("/",)
  .put("/:folderId",)
  .delete("/:folderId",)

export { folderRouters }