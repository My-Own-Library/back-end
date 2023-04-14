import express, { Express } from "express"
import { connectDb, disconnectDB, loadEnv } from "./config"
import { folderRouters, topicRouters, userRouters } from "./routers"
import { themesRouters } from "./routers/themes-routers"
import cors from "cors";
import { upload } from "./middlewares/manage-images";

loadEnv();

const app = express();

app
  .use(cors())
  .use(express.json())
  .get("/health", (_req, res) => res.send("OK!"))
  .use("/themes", themesRouters)
  .use("/users", userRouters)
  .use("/topics", topicRouters)
  .use("/folders", folderRouters)

export async function init(): Promise<Express> {
  connectDb()
  return Promise.resolve(app)
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;