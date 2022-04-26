import { Alchemy } from './configs/alchemy.config'
import { Etherscan } from './configs/etherscan.config'
import { MailerSend } from './configs/mailersend.config'
import { OpenSea } from './configs/opensea.config'
import { Pinata } from './configs/pinata.config'
import { Slack } from './configs/slack.config'
import { TheGraph } from './configs/thegraph.config'
import { Web3Storage } from './configs/web3storage.config'
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
      HttpRequestConfig.requestOptions<Etherscan.AccountsBalanceSingleAddress>({
        kind: 'etherscan.accounts.balanceSingleAddress',
        'query:tag': 'latest',
        'query:address': process.env.ETHERSCAN_ADDRESS,
        'auth:apikey': process.env.ETHERSCAN_APIKEY,
      }),
    pinata: HttpRequestConfig.requestOptions<Pinata.PinningPinJsonToIPFS>({
      kind: 'pinata.pinning.pinJSONToIPFS',
      'auth:pinata_api_key': process.env.PINATA_API_KEY,
      'auth:pinata_secret_api_key': process.env.PINATA_SECRET_API_KEY,
      'body:pinataContent': { test: 'test' },
      'body:pinataMetadata': { name: 'asd', keyvalues: { key1: 'value1' } },
    }),
    slack: HttpRequestConfig.requestOptions<Slack.IncomingWebhooksMessage>({
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
    mailersend: HttpRequestConfig.requestOptions<MailerSend.EmailSend>({
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
    alchemy: HttpRequestConfig.requestOptions<Alchemy.NftGetNFTs>({
      kind: 'alchemy.nft.getNFTs',
      'auth:apikey': process.env.ALCHEMY_APIKEY,
      'query:contractAddresses[]': process.env.ETH_DIYPUNKS_CONTRACT,
      'query:owner': process.env.ETH_OWNER,
    }),
    opensea: HttpRequestConfig.requestOptions<OpenSea.GetAssets>({
      kind: 'opensea.assets.get',
      'auth:X-API-KEY': process.env.OPENSEA_APIKEY,
      'query:asset_contract_address': process.env.ETH_DIYPUNKS_CONTRACT,
      'query:owner': process.env.ETH_OWNER,
      'query:limit': 20,
      'query:offset': 0,
      'query:order_direction': 'desc',
    }),
    openseaCollections:
      HttpRequestConfig.requestOptions<OpenSea.GetCollections>({
        kind: 'opensea.collections.get',
        'auth:X-API-KEY': process.env.OPENSEA_APIKEY,
        'query:asset_owner': process.env.ETH_OWNER,
        'query:limit': 20,
        'query:offset': 0,
      }),
    web3storage: HttpRequestConfig.requestOptions<Web3Storage.UploadContent>({
      kind: 'web3storage.upload.content',
      'auth:Authorization': `Bearer ${process.env.WEB3_STORAGE_API_TOKEN}`,
      'body:content': {
        testString: 'testString',
        testNumber: 1,
        testBoolean: true,
      },
    }),
    thegraph: HttpRequestConfig.requestOptions<TheGraph.Query>({
      kind: 'thegraph.hostedservice.query',
      'auth:subgraphId': process.env.SUBGRAPH_ID,
      'body:query': `{
        tokens(first: 5) {
          id
          owner {
            id
          }
          uri
          transfers {
            id
          }
        }
        owners(first: 5) {
          id
          ownedTokens {
            id
          }
          balance
        }
      }`,
    }),
  }
  const currentRequestOptions = requestOptions.alchemy

  const requestConfig = HttpRequestConfig.requestConfig(currentRequestOptions)
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
