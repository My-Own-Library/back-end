import { createTopic, deleteTopic, getTopicsByFolder, getTopicsByTheme, updateTopic } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const topicRouters = Router()

topicRouters
  .all("/*", authenticateToken)
  .get("/in-themes/:themeId", getTopicsByTheme)
  .get("/in-folders/:folderId", getTopicsByFolder)
  .post("/", createTopic)
  .put("/:topicId", updateTopic)
  .delete("/:topicId", deleteTopic)

export { topicRouters }