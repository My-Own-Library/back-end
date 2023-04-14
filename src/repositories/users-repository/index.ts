import { prismaDb } from "@/config";

async function findByEmail(email: string) {
  return prismaDb.users.findFirst({
    where:{
      email
    }
  });
}

async function findById(user_id: number) {
  return prismaDb.users.findFirst({
    where:{
      id: user_id
    }
  });
}

async function create(data: {email: string, password: string}) {
  return prismaDb.users.create({
    data,
  });
}

const userRepository = {
  findByEmail,
  create,
  findById
};

export default userRepository;