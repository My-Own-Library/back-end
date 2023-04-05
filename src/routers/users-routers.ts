import { signin, signup } from "@/controllers/users-controllers";
import { validateBody } from "@/middlewares";
import { SigninUserSchema, SignupUserSchema } from "@/models";
import { Router } from "express";

const userRouters = Router()

userRouters
  .post("/signin", validateBody(SigninUserSchema), signin)
  .post("/signup", validateBody(SignupUserSchema), signup)
  .post("/logout", )

export { userRouters }