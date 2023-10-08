#!/usr/bin/env node
import { saveKeyValue } from './services/storage.service.js'
import { getArgs } from './helpers/args.js'
import {
  printError,
  printHelper,
  printSuccess,
} from './services/log.service.js'
import { getWeather } from './services/api.service.js'

const saveToken = async (token) => {
  if (!token.length) {
    printError('Не передан token')
    return
  }

  try {
    await saveKeyValue('token', token)
    printSuccess('Токен сохранён')
  } catch (error) {
    printError(error.message)
  }
}

const getForecast = async () => {
  try {
    const weather = await getWeather(process.env.CITY ?? 'moscow')
    console.log(weather) // красивый вывод
  } catch (error) {
    if (error?.response?.status === 404) {
      return printError('Неверно указан город')
    }

    if (error?.response?.status === 401) {
      return printError('Неверно указан token')
    }

    printError(error.message)
  }
}

const initCLI = () => {
  const args = getArgs(process.argv)

  if (args.h) {
    return printHelper()
  }

  if (args.s) {
    // save town
  }

  if (args.t) {
    return saveToken(args.t)
  }

  getForecast()
}

initCLI()
