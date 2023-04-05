import { prismaDb } from "@/config";
import { UnauthorizedError } from "@/errors/unauthorized-error";
import { AuthenticatedRequest } from "@/protocols";
import { NextFunction, Response, Request } from "express";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";


export async function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const  authorization  = req.header("Authorization")
  if (!authorization) return unauthorizedError(res);

  const token = authorization.split(" ")[1];
  if (!token) return unauthorizedError(res);

  try {
    const { user_id } = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;

    const session = await prismaDb.sessions.findFirst({
      where: {
        token,
      },
    });
    if (!session || !session.active) return unauthorizedError(res);

    req.user_id = user_id;

    return next();
  } catch (err) {
    return unauthorizedError(res);
  }
}

function unauthorizedError(res: Response) {
  return res.status(httpStatus.UNAUTHORIZED).send(UnauthorizedError("Invalid credentials"));
}


