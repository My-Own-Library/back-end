import {  prismaDb } from "@/config";

async function create(data: {user_id: number, token: string}){
  return prismaDb.sessions.create({
    data,
    include:{
      users: true
    }
  });
}

async function findSessionByUserId(user_id: number){
  return prismaDb.sessions.findFirst({
    where:{
      user_id
    },
    include:{
      users: true
    }
  });
}

async function activateSession(session_id: number){
  return prismaDb.sessions.update({
    where:{
      id: session_id
    },
    data:{
      active: true
    }
  });
}


const sessionRepository = {
  create,
  findSessionByUserId,
  activateSession
};

export default sessionRepository;