import { Web3StorageUploadContent } from './configs/web3storage.config'
import { AlchemyNftGetNFTs } from './configs/alchemy.config'
import { EtherscanAccountsBalanceSingleAddress } from './configs/etherscan.config'
import { MailerSendEmailSend } from './configs/mailersend.config'
import {
  OpenseaGetAssets,
  OpenseaGetCollections,
} from './configs/opensea.config'
import { PinataPinningPinJsonToIPFS } from './configs/pinata.config'
import { SlackIncomingWebhooksMessage } from './configs/slack.config'
import { HttpRequest } from './controllers/HttpRequest'
import {
  HttpRequestConfig,
  RequestOptions,
} from './controllers/HttpRequestConfig'
import { logger } from './utils/Logger'
import { TheGraphQuery } from './configs/thegraph.config'

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
    alchemy: HttpRequestConfig.requestOptions<AlchemyNftGetNFTs>({
      kind: 'alchemy.nft.getNFTs',
      'auth:apikey': process.env.ALCHEMY_APIKEY,
      'query:contractAddresses[]': process.env.ETH_DIYPUNKS_CONTRACT,
      'query:owner': process.env.ETH_OWNER,
    }),
    opensea: HttpRequestConfig.requestOptions<OpenseaGetAssets>({
      kind: 'opensea.assets.get',
      'auth:X-API-KEY': process.env.OPENSEA_APIKEY,
      'query:asset_contract_address': process.env.ETH_DIYPUNKS_CONTRACT,
      'query:owner': process.env.ETH_OWNER,
      'query:limit': 20,
      'query:offset': 0,
      'query:order_direction': 'desc',
    }),
    openseaCollections: HttpRequestConfig.requestOptions<OpenseaGetCollections>(
      {
        kind: 'opensea.collections.get',
        'auth:X-API-KEY': process.env.OPENSEA_APIKEY,
        'query:asset_owner': process.env.ETH_OWNER,
        'query:limit': 20,
        'query:offset': 0,
      }
    ),
    web3storage: HttpRequestConfig.requestOptions<Web3StorageUploadContent>({
      kind: 'web3storage.upload.content',
      'auth:Authorization': `Bearer ${process.env.WEB3_STORAGE_API_TOKEN}`,
      'body:content': {
        testString: 'testString',
        testNumber: 1,
        testBoolean: true,
      },
    }),
    thegraph: HttpRequestConfig.requestOptions<TheGraphQuery>({
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
  const currentRequestOptions = requestOptions.thegraph

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
