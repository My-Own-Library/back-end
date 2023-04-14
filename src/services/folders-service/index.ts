import { ConflictError, UnauthorizedError } from "@/errors"
import { NotFoundError } from "@/errors/not-found-error"
import foldersRepository from "@/repositories/folders-repository"
import themesRepository from "@/repositories/themes-repository"

async function getFoldersByTheme(theme_id: number, user_id: number) {
  const theme = await themesRepository.getThemesById(theme_id)
  if(!theme) throw NotFoundError("Theme not found")
  if( theme.user_id !== user_id ) throw UnauthorizedError("Unauthorized theme owner")

  return await foldersRepository.getFoldersByThemeId(theme_id)
}

async function createFolder(name: string, theme_id: number, user_id: number) {
  const theme = await themesRepository.getThemesById(theme_id)
  if(!theme) throw NotFoundError("Theme not found")
  if( theme.user_id !== user_id ) throw UnauthorizedError("Unauthorized theme owner")

  const folderExist = await foldersRepository.getFoldersByNameAndTheme(name, theme_id)
  if(folderExist) throw ConflictError("Folder name already in use")

  return await foldersRepository.createFolder(name, theme_id)
}

async function updateFolder(user_id:number, folder_id: number, name: string) {
  const folderExist = await foldersRepository.getFoldersById(folder_id)

  if(!folderExist) throw NotFoundError("Folder not found")

  if( folderExist.themes.user_id !== user_id) throw UnauthorizedError("Unauthorized folder owner")

  return await  foldersRepository.updateFolder(folder_id, name)
}

async function deleteFolder(folder_id: number, user_id: number) {
  const folderExist = await foldersRepository.getFoldersById(folder_id)

  if(!folderExist) throw NotFoundError("Folder not found")

  if( folderExist.themes.user_id !== user_id) throw UnauthorizedError("Unauthorized folder owner")

  return await foldersRepository.deleteFolder(folder_id)
}

export const foldersServices = { 
  getFoldersByTheme,
  createFolder,
  updateFolder,
  deleteFolder
}