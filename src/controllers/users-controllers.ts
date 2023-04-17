import { AuthenticatedRequest } from "@/protocols";
import { userServices } from "@/services";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function signup(req: Request, res: Response){
  const { email, password } =req.body

  try{
    const user = await userServices.createUser( email, password);
    return res.status(httpStatus.CREATED).send({
      id: user.email,
      email: user.email
    });
  } catch (error) {
    if (error.name === "ConflictError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
  }
}

export async function signin(req: Request, res: Response){
  const { email, password } =req.body

  try{
    const userSession = await userServices.signinUser( email, password);
    return res.status(httpStatus.CREATED).send(userSession);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.status(httpStatus.UNAUTHORIZED).send(error);
    }
  }
}

export async function logout(req: AuthenticatedRequest, res: Response){
  try{
    await userServices.logoutUser(req.user_id)
    return res.sendStatus(httpStatus.OK)
  }catch(error){
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
  }
}