#!/usr/bin/env node
import { saveKeyValue } from './services/storage.service.js'
import { getArgs } from './helpers/args.js'
import { printHelper } from './services/log.service.js'

const initCLI = () => {
  const args = getArgs(process.argv)

  if (args.h) {
    printHelper()
  }

  if (args.s) {
    // save town
  }

  if (args.t) {
    saveKeyValue('token', args.t)
  }

  // return weather
}

initCLI()
