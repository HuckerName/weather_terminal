#!/usr/bin/env node
import {
  TOKEN_DICTIONARY,
  getKeyValue,
  saveKeyValue,
  addDefaultToken,
  deleteToken,
  deleteDefaultToken,
} from './services/storage.service.js'
import { getArgs } from './helpers/args.js'
import {
  printError,
  printHelper,
  printSuccess,
  printWeather,
} from './services/log.service.js'
import { getIcon, getWeather } from './services/api.service.js'
import config from 'config'

addDefaultToken(config.get('WEATHER_TOKEN'))

const saveToken = async (token) => {
  if (!token.length) {
    printError('Не передан token')
    return
  }

  try {
    await deleteDefaultToken(token)

    printSuccess('Токен сохранён')
  } catch (error) {
    printError(error.message)
  }
}

const saveCity = async (city) => {
  if (!city.length) {
    printError('Неуказан город')
    return
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city)
    printSuccess('Город сохранён')
  } catch (e) {
    printError(e.message)
  }
}

const getForecast = async () => {
  try {
    const city = process.env.CITY ?? (await getKeyValue(TOKEN_DICTIONARY.city))
    const weather = await getWeather(city)
    const icon = getIcon(weather.weather[0].icon)
    printWeather(weather, icon)
  } catch (error) {
    if (error?.response?.status === 404) {
      return printError('Неверно указан город')
    }

    if (error?.response?.status === 401) {
      return printError('Неверно указан token')
    }

    if (error?.response?.status === 400) {
      return printError('Сохраните город командой -s [CITY]')
    }

    if (error?.code === 'EAI_AGAIN') {
      return printError('Потеряно соеденение с интернетом')
    }

    return printError(error.message)
  }
}

const initCLI = async () => {
  try {
    const args = getArgs(process.argv)

    if (args.h) {
      return printHelper()
    }

    if (args.s) {
      return await saveCity(args.s)
    }

    if (args.t) {
      return await saveToken(args.t)
    }

    if (args.d) {
      return await deleteToken()
    }

    return await getForecast()
  } catch (error) {
    printError(error.message)
  }
}

initCLI()
