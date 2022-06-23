import pino from 'pino'
import * as dotenv from 'dotenv'

dotenv.config()

// locally using pretty config: https://github.com/pinojs/pino-pretty
const localConfig = {
  name: 'web3nao',
  level: 'debug',
  transport: {
    target: 'pino-pretty',
  },
}

const config = {
  name: 'web3nao',
  level: 'debug',
}

export const logger =
  process.env.NODE_ENV === 'local' ? pino(localConfig) : pino(config)
