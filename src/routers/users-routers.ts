import { Router } from "express";

const userRouters = Router()

userRouters
  .post("/signin")
  .post("/login")
  .post("/logout")

export { userRouters }