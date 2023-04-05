import Joi from "joi";

export const SignupUserSchema = Joi.object<SignupParams>({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
})

export const SigninUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
})

type SignupParams ={
  email: string,
  password: string,
  photo: string,
}