import {
  ETHERSCAN,
  EtherscanRequestOptionsAuth,
  EtherscanRequestOptionsParams,
} from './configs/etherscan.config'
import {
  MAILERSEND,
  MailerSendRequestOptionsAuth,
  MailerSendRequestOptionsParams,
} from './configs/mailersend.config'
import {
  PINATA,
  PinataRequestOptionsAuth,
  PinataRequestOptionsParams,
} from './configs/pinata.config'
import {
  SLACK,
  SlackRequestOptionsAuth,
  SlackRequestOptionsParams,
} from './configs/slack.config'
import { HttpRequest } from './controllers/HttpRequest'
import {
  HttpRequestConfig,
  RequestOptions,
} from './controllers/HttpRequestConfig'
import { logger } from './utils/Logger'

async function main() {
  const requestOptions: {
    [key: string]: RequestOptions<
      | EtherscanRequestOptionsParams
      | PinataRequestOptionsParams
      | SlackRequestOptionsParams
      | MailerSendRequestOptionsParams,
      | EtherscanRequestOptionsAuth
      | PinataRequestOptionsAuth
      | SlackRequestOptionsAuth
      | MailerSendRequestOptionsAuth
    >
  } = {
    etherscan: {
      api: ETHERSCAN,
      endpoint: ETHERSCAN.api.accounts.balanceSingleAddress,
      params: {
        tag: 'latest',
        address: process.env.ETHERSCAN_ADDRESS,
      },
      auth: {
        apikey: process.env.ETHERSCAN_APIKEY,
      },
    },
    pinata: {
      api: PINATA,
      endpoint: PINATA.api.pinning.pinJSONToIPFS,
      params: {
        pinataContent: { test: 'test' },
        pinataMetadata: { name: 'asd', keyvalues: { key1: 'value1' } },
      },
      auth: {
        pinata_api_key: process.env.PINATA_API_KEY,
        pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
      },
    },
    slack: {
      api: SLACK,
      endpoint: SLACK.api.incomingWebhooks.message,
      params: {
        text: 'Hello World!',
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: 'Hello **World**!',
            },
          },
        ],
      },
      auth: {
        webhookid: process.env.SLACK_WEBHOOK_ID,
      },
    },
    mailersend: {
      api: MAILERSEND,
      endpoint: MAILERSEND.api.email.send,
      auth: {
        Authorization: `Bearer ${process.env.MAILER_SEND_API_TOKEN}`,
      },
      params: {
        from: {
          email: 'adam@diypunks.xyz',
          name: 'Adam',
        },
        // eslint-disable-next-line id-length
        to: [
          {
            email: 'adam.urban@gmail.com',
            name: 'Adam',
          },
        ],
        subject: 'Welcome to diypunks!',
        text: 'Hi there! Welcome to diypunks!',
        html: '<h1>Hi there!</h1><p>Welcome to diypunks!</p>',
      },
    },
  }
  const currentRequestOptions = requestOptions.mailersend

  const requestConfig = await HttpRequestConfig.requestConfig(
    currentRequestOptions
  )
  logger.info(requestConfig)
  const response = await HttpRequest.request(requestConfig)
  logger.info(response)

  // const responseTypes = await HttpRequest.quicktypeJson(
  //   `${capitalizeFirstLetter(currentRequestOptions.api.meta.name)}Response`,
  //   JSON.stringify(response)
  // )
  // logger.info(responseTypes)
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

main()
