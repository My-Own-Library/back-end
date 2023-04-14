import { prismaDb } from "@/config";

async function getThemesById(theme_id: number) {
  return prismaDb.themes.findFirst({
    where:{
      id: theme_id
    }
  })
}

async function getThemesByUserId(user_id: number) {
  return prismaDb.themes.findMany({
    where:{
      user_id
    }
  })
}

async function getThemesByNameAndUser(name: string, user_id: number) {
  return prismaDb.themes.findFirst({
    where:{
      name,
      user_id
    }
  })
} 

async function createTheme(name: string, user_id: number) {
  return prismaDb.themes.create({
    data:{
      user_id,
      name
    }
  })
}

async function updateTheme(theme_id: number, name: string) {
  return prismaDb.themes.update({
    where:{
      id: theme_id
    },
    data: {
      name
    }
  })
}

async function deleteTheme(theme_id: number) {
  return prismaDb.themes.delete({
    where:{
      id: theme_id
    }
  })
}

const themesRepository = {
  getThemesById,
  getThemesByUserId,
  getThemesByNameAndUser,
  createTheme,
  updateTheme,
  deleteTheme
}

export default themesRepository