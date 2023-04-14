import { AuthenticatedRequest } from "@/protocols";
import { themeServices } from "@/services";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getThemes(req: AuthenticatedRequest, res: Response){

  try{
    const themes =  await themeServices.getThemes(req.user_id)    
    return res.status(httpStatus.OK).send(themes)

  }catch(err){
    return res.status(httpStatus.INTERNAL_SERVER_ERROR)
  }
}

export async function createTheme(req: AuthenticatedRequest, res: Response){
  const { name } = req.body as {name: string}

  try{
    const theme = await themeServices.createTheme(name, req.user_id)
    return res.status(httpStatus.CREATED).send(theme.name)

  }catch(error){
    if (error.name === "ConflictError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
  }
}

export async function updateTheme(req: AuthenticatedRequest, res: Response){
  const { theme_id } = req.params 
  const { name } = req.body as {name: string}


  try{
    const theme = await themeServices.updateTheme(req.user_id, Number(theme_id), name)
    return res.status(httpStatus.CREATED).send(theme.name)

  }catch(error){
    if (error.name === "ConflictError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
  }
}

export async function deleteTheme(req: AuthenticatedRequest, res: Response){
  const { theme_id } = req.params 

  try{
    await themeServices.deleteTheme(req.user_id, Number(theme_id))
    return res.status(httpStatus.OK)

  }catch(error){
    if (error.name === "ConflictError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
  }
}