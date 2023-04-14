import { AuthenticatedRequest } from "@/protocols";
import { foldersServices } from "@/services";
import { Response } from "express";
import httpStatus from "http-status";

export async function getFoldersByTheme(req: AuthenticatedRequest, res: Response){
  const { theme_id } = req.params

  try{
    const folders = await foldersServices.getFoldersByTheme(Number(theme_id), req.user_id)
    return res.status(httpStatus.OK).send(folders)

  }catch(error){
    if (error.name === "UnauthorizedError") {
      return res.status(httpStatus.UNAUTHORIZED).send(error);
    }
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
  }
}

export async function createFolder(req: AuthenticatedRequest, res: Response){
  const { theme_id, name } = req.body as {name: string, theme_id: number}

  try{
    const folder = await foldersServices.createFolder(name, theme_id, req.user_id)
    return res.status(httpStatus.CREATED).send(folder)

  }catch(error){
    if (error.name === "UnauthorizedError") {
      return res.status(httpStatus.UNAUTHORIZED).send(error);
    }
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    if (error.name === "ConflictError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
  }
}

export async function updateFolder(req: AuthenticatedRequest, res: Response){
  const { name } = req.body as {name: string, theme_id: number}
  const { folder_id } = req.params

  try{
    const folder = await foldersServices.updateFolder(req.user_id, Number(folder_id), name)
    return res.status(httpStatus.CREATED).send(folder)

  }catch(error){
    if (error.name === "UnauthorizedError") {
      return res.status(httpStatus.UNAUTHORIZED).send(error);
    }
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
  }
}

export async function deleteFolder(req: AuthenticatedRequest, res: Response){
  const { folder_id } = req.params

  try{
    await foldersServices.deleteFolder( Number(folder_id), req.user_id)
    return res.status(httpStatus.CREATED)
  }catch(error){
    if (error.name === "UnauthorizedError") {
      return res.status(httpStatus.UNAUTHORIZED).send(error);
    }
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
  }
}

