import { writeFileSync, appendFileSync, promises } from 'fs'
import { homedir } from 'os'
import { join } from 'path'
import { printError, printSuccess } from './log.service.js'

const TOKEN_DICTIONARY = {
  token: 'token',
  city: 'city',
  defaultToken: 'defaultToken',
}

const filePath = join(homedir(), 'weather-data.json')

const addDefaultToken = async (api_key) => {
  try {
    const data = await getData(filePath)

    if (!data?.defaultToken) {
      await saveKeyValue(TOKEN_DICTIONARY.defaultToken, api_key)
    }
  } catch (error) {
    printError(error.message)
  }
}

const saveKeyValue = async (key, value) => {
  let data = {}
  if (await isExist(filePath)) {
    data = await getData(filePath)
  }

  data[key] = value

  writeFileSync(filePath, '')
  appendFileSync(filePath, JSON.stringify(data))
}

const getKeyValue = async (key) => {
  try {
    if (await isExist(filePath)) {
      const data = await getData(filePath)
      return data[key]
    }
  } catch (error) {
    printError(error.message)
  }
}

const deleteToken = async () => {
  try {
    if (await isExist(filePath)) {
      const data = await getData(filePath)

      if (data.token) {
        delete data.token

        writeFileSync(filePath, '')
        appendFileSync(filePath, JSON.stringify(data))
        return printSuccess('Токен удален')
      }
    }

    return printError('Сохраните токен -t [API_KEY]')
  } catch (e) {
    printError(e.message)
  }
}

const getData = async (path) => {
  let data = {}
  try {
    if (await isExist(path)) {
      const file = await promises.readFile(path)
      data = JSON.parse(file)
      return data
    }
  } catch (e) {
    printError(e.message)
  }
}

const isExist = async (path) => {
  try {
    await promises.stat(path)
    return true
  } catch (e) {
    return false
  }
}

export {
  saveKeyValue,
  getKeyValue,
  TOKEN_DICTIONARY,
  addDefaultToken,
  deleteToken,
}
