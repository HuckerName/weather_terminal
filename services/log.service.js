import chalk from 'chalk'
import dedent from 'dedent-js'

const printError = (error) => {
  console.log(`${chalk.bgRed(' ERROR ')} ${error}`)
}

const printSuccess = (msg) => {
  console.log(`${chalk.bgGreen(' Success ')} ${msg}`)
}

const printHelper = () => {
  console.log(
    dedent`${chalk.bgMagentaBright(' HELP ')}
     Без параметров - вывод погоды
     -s [CITY] для установки города
     -h для вывода помощи
     -t [API_KEY] для сохранения токена
    `
  )
}

export { printError, printSuccess, printHelper }
