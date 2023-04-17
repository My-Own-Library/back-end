import { ConflictError } from "@/errors/conflict-error"
import { NotFoundError } from "@/errors/not-found-error";
import { UnauthorizedError } from "@/errors/unauthorized-error";
import sessionRepository from "@/repositories/sessions-repository";
import userRepository from "@/repositories/users-repository"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function createUser(email: string, password: string) {

  const emailExist = await userRepository.findByEmail(email)

  if(emailExist){
    throw ConflictError("Email already in use")
  }

  const encryptedPassword = await bcrypt.hash(password, 12);

  return await userRepository.create({email, password: encryptedPassword})
}


async function signinUser(email: string, password: string) {
  const userExist = await userRepository.findByEmail(email)
  if(!userExist){
    throw UnauthorizedError("email or passsword incorrect")
  }

  const id = userExist.id

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

async function logoutUser(user_id: number) {
  const userExist = await userRepository.findById(user_id)

  if(!userExist) throw NotFoundError("User not registred")
  
  const sessionExist = await sessionRepository.findSessionByUserId(user_id)

  if(!sessionExist) throw NotFoundError("User does not have session")

  return await sessionRepository.deactivateSession(sessionExist.id)
}

export const userServices ={
  createUser,
  signinUser,
  logoutUser
}