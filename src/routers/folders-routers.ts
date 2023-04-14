import { createFolder, deleteFolder, getFoldersByTheme, updateFolder } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const folderRouters = Router()

folderRouters
  .all("/*", authenticateToken)
  .get("/in-themes/:theme_id", getFoldersByTheme)
  .post("/", createFolder)
  .put("/:folder_id", updateFolder)
  .delete("/:folder_id", deleteFolder)

export { folderRouters }