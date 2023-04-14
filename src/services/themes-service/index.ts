import { ConflictError, UnauthorizedError } from "@/errors"
import { NotFoundError } from "@/errors/not-found-error"
import themesRepository from "@/repositories/themes-repository"

async function getThemes(user_id: number) {
  return await themesRepository.getThemesByUserId(user_id)
}

async function createTheme(name: string, user_id: number) {
  const themeExist = await themesRepository.getThemesByNameAndUser(name, user_id)

  if(themeExist) throw ConflictError("Theme name already in use")

  return await themesRepository.createTheme(name, user_id)
}

async function updateTheme(user_id:number, theme_id: number, name: string) {
  const themeExist = await themesRepository.getThemesById(theme_id)

  if(!themeExist) throw NotFoundError("Theme not found")

  if( themeExist.user_id !== user_id) throw UnauthorizedError("Unauthorized theme owner")

  return await themesRepository.updateTheme(theme_id, name)
}

async function deleteTheme(theme_id: number, user_id: number) {
  const themeExist = await themesRepository.getThemesById(theme_id)

  if(!themeExist) throw NotFoundError("Theme not found")

  if( themeExist.user_id !== user_id) throw UnauthorizedError("Unauthorized theme owner")

  return await themesRepository.deleteTheme(theme_id)
}

export const themesServices = { 
  getThemes,
  createTheme,
  updateTheme,
  deleteTheme
}