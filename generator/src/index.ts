import { Airtable } from '../../http-configs/src/configs/airtable.config'
import { Alchemy } from '../../http-configs/src/configs/alchemy.config'
import { CoinMarketCap } from '../../http-configs/src/configs/coinmarketcap.config'
import { Covalent } from '../../http-configs/src/configs/covalent.config'
import { Etherscan } from '../../http-configs/src/configs/etherscan.config'
import { Github } from '../../http-configs/src/configs/github.config'
import { MailerSend } from '../../http-configs/src/configs/mailersend.config'
import { Mergent } from '../../http-configs/src/configs/mergent.config'
import { Mixpanel } from '../../http-configs/src/configs/mixpanel.config'
import { Notion } from '../../http-configs/src/configs/notion.config'
import { OpenSea } from '../../http-configs/src/configs/opensea.config'
import { Pinata } from '../../http-configs/src/configs/pinata.config'
import { Slack } from '../../http-configs/src/configs/slack.config'
import { TheGraph } from '../../http-configs/src/configs/thegraph.config'
import { Web3Storage } from '../../http-configs/src/configs/web3storage.config'
import { FetchParams } from '../../http-configs/src/types/FetchParams.type'
import { nao } from '../../http-configs/src/utils/Request.utils'
import { HttpRequest } from './controllers/HttpRequest'
import { logger } from './utils/Logger'

async function main() {
  const requestConfigs: {
    [key: string]: FetchParams
  } = {
    etherscan: nao<Etherscan.AccountsBalanceSingleAddress>({
      kind: 'etherscan.accounts.balanceSingleAddress',
      'query:tag': 'latest',
      'query:address': process.env.ETHERSCAN_ADDRESS,
      'auth:apikey': process.env.ETHERSCAN_APIKEY,
    }),
    pinata: nao<Pinata.PinningPinJsonToIPFS>({
      kind: 'pinata.pinning.pinJSONToIPFS',
      'auth:pinata_api_key': process.env.PINATA_API_KEY,
      'auth:pinata_secret_api_key': process.env.PINATA_SECRET_API_KEY,
      'body:pinataContent': { test: 'test' },
      'body:pinataMetadata': { name: 'asd', keyvalues: { key1: 'value1' } },
    }),
    slack: nao<Slack.IncomingWebhooksMessage>({
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
    mailersend: nao<MailerSend.EmailSend>({
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
      'auth:Authorization': process.env.MAILER_SEND_API_TOKEN,
    }),
    alchemy: nao<Alchemy.NftGetNFTs>({
      kind: 'alchemy.nft.getNFTs',
      'auth:apikey': process.env.ALCHEMY_APIKEY,
      'query:contractAddresses[]': process.env.ETH_DIYPUNKS_CONTRACT,
      'query:owner': process.env.ETH_OWNER,
    }),
    opensea: nao<OpenSea.GetAssets>({
      kind: 'opensea.assets.get',
      'auth:X-API-KEY': process.env.OPENSEA_APIKEY,
      'query:asset_contract_address': process.env.ETH_DIYPUNKS_CONTRACT,
      'query:owner': process.env.ETH_OWNER,
      'query:limit': 20,
      'query:offset': 0,
      'query:order_direction': 'desc',
    }),
    openseaCollections: nao<OpenSea.GetCollections>({
      kind: 'opensea.collections.get',
      'auth:X-API-KEY': process.env.OPENSEA_APIKEY,
      'query:asset_owner': process.env.ETH_OWNER,
      'query:limit': 20,
      'query:offset': 0,
    }),
    web3storage: nao<Web3Storage.UploadContent>({
      kind: 'web3storage.upload.content',
      'auth:Authorization': process.env.WEB3_STORAGE_API_TOKEN,
      'body:content': {
        testString: 'testString',
        testNumber: 1,
        testBoolean: true,
      },
    }),
    thegraph: nao<TheGraph.QueryById>({
      kind: 'thegraph.hostedservice.queryById',
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
    thegraphByName: nao<TheGraph.QueryByName>({
      kind: 'thegraph.hostedservice.queryByName',
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
      'param:account': process.env.SUBGRAPH_ACCOUNT,
      'param:name': process.env.SUBGRAPH_NAME,
    }),
    github: nao<Github.ListRepositoryIssues>({
      kind: 'github.issues.listrepository',
      'param:owner': 'web3nao',
      'param:repo': 'web3nao',
      'query:state': 'all',
      // 'auth:Authorization': process.env.GITHUB_PAT,
    }),
    airtable: nao<Airtable.ListTableRecords>({
      kind: 'airtable.table.listrecords',
      'auth:Authorization': process.env.AIRTABLE_API_KEY,
      'param:baseId': process.env.AIRTABLE_BASE,
      'param:tableId': process.env.AIRTABLE_TABLE,
    }),
    notion: nao<Notion.CreateDatabase>({
      kind: 'notion.databases.create',
      'auth:Authorization': process.env.NOTION_API_KEY,
      'header:Notion-Version': '2022-02-22',
      'body:parent': {
        type: 'page_id',
        page_id: process.env.NOTION_PAGE_ID,
      },
      'body:properties': {
        temp1: {
          title: {},
        },
        temp2: {
          checkbox: {},
        },
        temp3: {
          created_by: {},
        },
        temp4: {
          select: {
            options: [
              {
                name: 'nice',
                color: 'default',
              },
              {
                name: 'nice2',
                color: 'red',
              },
            ],
          },
        },
      },
    }),
    mixpanel: nao<Mixpanel.TrackEvents>({
      kind: 'mixpanel.events.track',
      'auth:token': process.env.MIXPANEL_TOKEN,
      'body:body': [
        {
          properties: {
            distinct_id: 'userId',
            time: Date.now(),
          },
          event: 'test',
        },
      ],
    }),
    mergent: nao<Mergent.CreateTask>({
      kind: 'mergent.tasks.create',
      'auth:Authorization': process.env.MERGENT_API_TOKEN,
      'body:queue': 'default',
      'body:request': {
        url: `https://webhook.site/78094945-f530-4050-afb0-7793e53d2969`,
        headers: {
          'x-web3nao': 'web3nao',
        },
        body: JSON.stringify({ hello: 'world!' }),
      },
    }),
    covalent: nao<Covalent.ClassAGetTransactionsForAddress>({
      kind: 'covalent.classA.getTransactionsForAddress',
      'auth:key': process.env.COVALENT_API_KEY,
      'param:address': '0xa79E63e78Eec28741e711f89A672A4C40876Ebf3',
      'param:chainid': 1,
      'query:page-size': 1,
    }),
    covalentB: nao<Covalent.ClassBGetUniswapV3Pools>({
      kind: 'covalent.classB.getUniswapV3Pools',
      'auth:key': process.env.COVALENT_API_KEY,
      'param:chainid': 1,
    }),
    covalentPricing: nao<Covalent.PricingGetHistoricalTokenPrices>({
      kind: 'covalent.pricing.getHistoricalTokenPrices',
      'auth:key': process.env.COVALENT_API_KEY,
      'param:chainid': 1,
      'param:quote_currency': 'USD',
      'query:contract_addresses': '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0',
    }),
    coinmarketcap: nao<CoinMarketCap.CryptocurrencyListingsLatest>({
      kind: 'coinmarketcap.cryptocurrency.listingsLatest',
      'auth:X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY,
    }),
  }
  const requestConfig = requestConfigs.thegraphByName

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
