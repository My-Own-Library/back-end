import { ValidationError } from "joi"
import { Request } from "express";

export type ErrorCase = { 
  name: String,
  message: String | String[] | ValidationError
}

export type AuthenticatedRequest = Request & JWTPayload;

type JWTPayload = {
  user_id: number;
};