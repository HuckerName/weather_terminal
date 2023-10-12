## Description

Это погода для терминале. Легка в использованиии и информативная.

## Install

```bash
  npm install cli-weather-terminal
```

## Usage

Когда вы скачали этот пакет, то вам надо будет до начала сохранить Город, командой: `weather -s [CITY]`  
И теперь можно посмотреть погоду, вызвав без параметров: `weather`

Вы так же можете создать свой токен для погоды [здесь](https://home.openweathermap.org/api_keys) и сохранить его `weather -t [API_KEY]`

## Command

`**Без параметров** - вывод погоды
**-s [CITY]** - для установки города
**-h** - для вывода помощи
**-t [API_KEY]** - для сохранения токена`

**токен** создать [здесь](https://home.openweathermap.org/api_keys)