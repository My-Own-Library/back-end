import { prismaDb } from "@/config";

async function getFoldersById(theme_id: number) {
  return prismaDb.folders.findFirst({
    where:{
      id: theme_id
    },
    include:{
      themes: true
    }
  })
}

async function getFoldersByThemeId(theme_id: number) {
  return prismaDb.folders.findMany({
    where:{
      theme_id
    }
  })
}

async function getFoldersByNameAndTheme(name: string, theme_id: number) {
  return prismaDb.folders.findFirst({
    where:{
      name,
      theme_id
    }
  })
} 

async function createFolder(name: string,theme_id: number) {
  return prismaDb.folders.create({
    data:{
      theme_id,
      name
    }
  })
}

async function updateFolder(folder_id: number, name: string) {
  return prismaDb.folders.update({
    where:{
      id: folder_id
    },
    data: {
      name
    }
  })
}

async function deleteFolder(folder_id: number) {
  return prismaDb.folders.delete({
    where:{
      id: folder_id
    }
  })
}

const foldersRepository = {
  getFoldersById,
  getFoldersByThemeId,
  getFoldersByNameAndTheme,
  createFolder,
  updateFolder,
  deleteFolder
}

export default foldersRepository