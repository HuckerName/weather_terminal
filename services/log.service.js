import chalk from 'chalk'
import dedent from 'dedent-js'
import { promises } from 'fs'

const printError = (error) => {
  console.log(`${chalk.bgRed(' ERROR ')} ${error}`)
}

const printSuccess = (msg) => {
  console.log(`${chalk.bgGreen(' Success ')} ${msg}`)
}

const printHelper = async () => {
  const instruction = await promises.readFile('./README.md')

  console.log(
    dedent`${chalk.black(chalk.bgMagentaBright(' HELP '))}
    ${instruction}`
  )
}

const printWeather = (data, icon) => {
  const strCity = `${chalk.bold(
    chalk.black(chalk.bgBlueBright(' WEATHER '))
  )} Погода в городе ${chalk.cyan(chalk.italic(data.name))}`

  const strDescription = `${icon}  ${data.weather[0].description}`

  const strTemp = `${chalk.greenBright('Температура')}: ${chalk.bold(
    Math.floor(data.main.temp) + '°'
  )} (ощущается как ${chalk.bold(Math.floor(data.main.feels_like) + '°')})`

  const strHumidity = `${chalk.blueBright('Влажность')}: ${chalk.bold(
    Math.floor(data.main.humidity) + '%'
  )}`

  const strWindSpeed = `${chalk.magentaBright('Скорость ветра')}: ${chalk.bold(
    Math.floor(data.wind.speed)
  )}`

  console.log(dedent`${strCity} 
  ${strDescription}
  ${strTemp}
  ${strHumidity}
  ${strWindSpeed}`)
}

export { printError, printSuccess, printHelper, printWeather }
