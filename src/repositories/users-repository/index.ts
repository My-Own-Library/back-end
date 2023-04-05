import { prismaDb } from "@/config";

async function findByEmail(email: string) {
  return prismaDb.users.findFirst({
    where:{
      email
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
};

export default userRepository;