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

const printWeather = (data, icon) => {
  console.log(
    dedent`${chalk.bgYellow(' WEATHER ')} Погода в городе ${data.name}
  ${icon}  ${data.weather[0].description}
  Температура: ${Math.floor(data.main.temp)}° (ощущается как ${Math.floor(
      data.main.feels_like
    )}°)
  Влажность: ${Math.floor(data.main.humidity)}%  
  Скорость ветра: ${Math.floor(data.wind.speed)}`
  )
}

export { printError, printSuccess, printHelper, printWeather }
