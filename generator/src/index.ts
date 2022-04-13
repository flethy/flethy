import { SlackIncomingWebhooksMessage } from './configs/slack.config'
import { EtherscanAccountsBalanceSingleAddress } from './configs/etherscan.config'
import { MailerSendEmailSend } from './configs/mailersend.config'
import { PinataPinningPinJsonToIPFS } from './configs/pinata.config'
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
    etherscan:
      HttpRequestConfig.requestOptions<EtherscanAccountsBalanceSingleAddress>({
        kind: 'etherscan.accounts.balanceSingleAddress',
        'query:tag': 'latest',
        'query:address': process.env.ETHERSCAN_ADDRESS,
        'auth:apikey': process.env.ETHERSCAN_APIKEY,
      }),
    pinata: HttpRequestConfig.requestOptions<PinataPinningPinJsonToIPFS>({
      kind: 'pinata.pinning.pinJSONToIPFS',
      'auth:pinata_api_key': process.env.PINATA_API_KEY,
      'auth:pinata_secret_api_key': process.env.PINATA_SECRET_API_KEY,
      'body:pinataContent': { test: 'test' },
      'body:pinataMetadata': { name: 'asd', keyvalues: { key1: 'value1' } },
    }),
    slack: HttpRequestConfig.requestOptions<SlackIncomingWebhooksMessage>({
      kind: 'slack.incomingWebhooks.message',
      'auth:webhookid': process.env.SLACK_WEBHOOK_ID,
      'body:text': 'Hello, world!',
      'body:blocks': [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: 'Hello, *world*!',
          },
        },
      ],
    }),
    mailersend: HttpRequestConfig.requestOptions<MailerSendEmailSend>({
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
    }),
  }
  const currentRequestOptions = requestOptions.slack

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
