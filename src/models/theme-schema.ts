import Joi from "joi";

export const JustNameSchema = Joi.object<JustName>({
  name: Joi.string().required().min(2)
})

export type JustName = {
  name: string
}