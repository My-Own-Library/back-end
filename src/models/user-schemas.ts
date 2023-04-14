import Joi from "joi";

export const SignupUserSchema = Joi.object<SignupParams>({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().strict()
})

export const SigninUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
})

type SignupParams ={
  email: string,
  password: string,
  confirmPassword: string,
}