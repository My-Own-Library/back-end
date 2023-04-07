import { ConflictError } from "@/errors/conflict-error"
import { UnauthorizedError } from "@/errors/unauthorized-error";
import sessionRepository from "@/repositories/sessions-repository";
import userRepository from "@/repositories/users-repository"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function createUser(email: string, password: string): Promise<{email: string, password: string}> {

  console.log(email)
  const emailExist = await userRepository.findByEmail(email)

  console.log(emailExist)

  if(emailExist){
    throw ConflictError("Email already in use")
  }

  const encryptedPassword = await bcrypt.hash(password, 12);

  return await userRepository.create({email, password: encryptedPassword})
}


async function signinUser(email: string, password: string) {
  const userExist = await userRepository.findByEmail(email)
  const id = userExist.id

  if(!userExist){
    throw ConflictError("email or passsword incorrect")
  }

  const isValid = bcrypt.compareSync(password, userExist.password)

  if (!isValid){
   throw UnauthorizedError("email or passsword incorrect")
  }

  const already_session = await sessionRepository.findSessionByUserId(id)
  
  if(already_session){
    await sessionRepository.activateSession(already_session.id)
    return already_session
  }

  const session = jwt.sign({ id }, process.env.JWT_SECRET);

  return await sessionRepository.create({user_id: id, token: session})
}

export const userServices ={
  createUser,
  signinUser
}