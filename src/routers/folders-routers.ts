import { createFolder, deleteFolder, getFoldersByTheme, updateFolder } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const folderRouters = Router()

folderRouters
  .all("/*", authenticateToken)
  .get("/in-themes/:themeId", getFoldersByTheme)
  .post("/", createFolder)
  .put("/:folderId", updateFolder)
  .delete("/:folderId", deleteFolder)

export { folderRouters }