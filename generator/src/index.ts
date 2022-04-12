import {
  ETHERSCAN,
  EtherscanRequestOptionsAuth,
  EtherscanRequestOptionsParams,
} from './configs/etherscan.config'
import {
  MAILERSEND,
  MailerSendRequestOptionsAuth,
  MailerSendEmailSend,
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
    [key: string]: RequestOptions<any>
  } = {
    // etherscan: {
    //   api: ETHERSCAN,
    //   endpoint: ETHERSCAN.api.accounts.balanceSingleAddress,
    //   params: {
    //     tag: 'latest',
    //     address: process.env.ETHERSCAN_ADDRESS,
    //   },
    //   auth: {
    //     apikey: process.env.ETHERSCAN_APIKEY,
    //   },
    // },
    // pinata: {
    //   api: PINATA,
    //   endpoint: PINATA.api.pinning.pinJSONToIPFS,
    //   params: {
    //     pinataContent: { test: 'test' },
    //     pinataMetadata: { name: 'asd', keyvalues: { key1: 'value1' } },
    //   },
    //   auth: {
    //     pinata_api_key: process.env.PINATA_API_KEY,
    //     pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
    //   },
    // },
    // slack: {
    //   api: SLACK,
    //   endpoint: SLACK.api.incomingWebhooks.message,
    //   params: {
    //     text: 'Hello World!',
    //     blocks: [
    //       {
    //         type: 'section',
    //         text: {
    //           type: 'mrkdwn',
    //           text: 'Hello **World**!',
    //         },
    //       },
    //     ],
    //   },
    //   auth: {
    //     webhookid: process.env.SLACK_WEBHOOK_ID,
    //   },
    // },
    mailersend: HttpRequestConfig.requestOptions<MailerSendEmailSend>({
      // api: MAILERSEND,
      // endpoint: MAILERSEND.api.email.send,
      // auth: {
      //   Authorization: `Bearer ${process.env.MAILER_SEND_API_TOKEN}`,
      // },
      // params: {
      kind: 'mailersend.email.send',
      'body:from': {
        email: 'adam@diypunks.xyz',
        name: 'Adam',
      },
      'body:to': [
        {
          email: 'adam.urban@gmail.com',
          name: 'Adam',
        },
      ],
      'body:subject': 'Welcome to diypunks!',
      'body:text': 'Hi there! Welcome to diypunks!',
      'body:html': '<h1>Hi there!</h1><p>Welcome to diypunks!</p>',
      'auth:Authorization': `Bearer ${process.env.MAILER_SEND_API_TOKEN}`,
      // },
    }),
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
