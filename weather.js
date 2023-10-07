#!/usr/bin/env node
import { saveKeyValue } from './services/storage.service.js'
import { getArgs } from './helpers/args.js'
import {
  printError,
  printHelper,
  printSuccess,
} from './services/log.service.js'

const saveToken = async (arg) => {
  try {
    await saveKeyValue('token', arg)
    printSuccess('Токен сохранён')
  } catch (error) {
    printError(error.message)
  }
}

const initCLI = () => {
  const args = getArgs(process.argv)

  if (args.h) {
    printHelper()
  }

  if (args.s) {
    // save town
  }

  if (args.t) {
    return saveToken(args.t)
  }

  // return weather
}

initCLI()
