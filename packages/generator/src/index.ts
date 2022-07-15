import { Airtable } from '../../http-configs/src/configs/airtable.config'
import { Alchemy } from '../../http-configs/src/configs/alchemy.config'
import ApicAgent from '../../http-configs/src/configs/apicagent.config'
import Auth0 from '../../http-configs/src/configs/auth0.config'
import BrowsersFyi from '../../http-configs/src/configs/browsersfyi.config'
import { Camunda } from '../../http-configs/src/configs/camunda.config'
import Clearbit from '../../http-configs/src/configs/clearbit.config'
import CoinCap from '../../http-configs/src/configs/coincap.config'
import { CoinGecko } from '../../http-configs/src/configs/coingecko.config'
import Coinlayer from '../../http-configs/src/configs/coinlayer.config'
import { CoinMarketCap } from '../../http-configs/src/configs/coinmarketcap.config'
import ContentFul from '../../http-configs/src/configs/contentful.config'
import CountApi from '../../http-configs/src/configs/countapi.config'
import Courier from '../../http-configs/src/configs/courier.config'
import { Covalent } from '../../http-configs/src/configs/covalent.config'
import { Disify } from '../../http-configs/src/configs/disify.config'
import { Etherscan } from '../../http-configs/src/configs/etherscan.config'
import Frankfurter from '../../http-configs/src/configs/frankfurter.config'
import { Github } from '../../http-configs/src/configs/github.config'
import { Hubspot } from '../../http-configs/src/configs/hubspot.config'
import { MailCheckAi } from '../../http-configs/src/configs/mailcheckai.config'
import { MailerSend } from '../../http-configs/src/configs/mailersend.config'
import { Mergent } from '../../http-configs/src/configs/mergent.config'
import MicroDev from '../../http-configs/src/configs/microdev.config'
import { Mixpanel } from '../../http-configs/src/configs/mixpanel.config'
import NewRelic from '../../http-configs/src/configs/newrelic.config'
import { Notion } from '../../http-configs/src/configs/notion.config'
import { OneInch } from '../../http-configs/src/configs/oneinch.config'
import OpenLibrary from '../../http-configs/src/configs/openlibrary.config'
import { OpenSea } from '../../http-configs/src/configs/opensea.config'
import { Pinata } from '../../http-configs/src/configs/pinata.config'
import PurgoMalum from '../../http-configs/src/configs/purgomalum.config'
import RedisCloud from '../../http-configs/src/configs/rediscloud.config'
import SerpStack from '../../http-configs/src/configs/serpstack.config'
import { Slack } from '../../http-configs/src/configs/slack.config'
import Statically from '../../http-configs/src/configs/statically.config'
import Supabase from '../../http-configs/src/configs/supabase.config'
import { TheGraph } from '../../http-configs/src/configs/thegraph.config'
import Trello from '../../http-configs/src/configs/trello.config'
import { Web3Storage } from '../../http-configs/src/configs/web3storage.config'
import { ZeroX } from '../../http-configs/src/configs/zerox.config'
import Zora from '../../http-configs/src/configs/zora.config'
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
    camundaConsoleToken: nao<Camunda.ConsoleToken>({
      kind: 'camunda.console.token',
      'body:audience': 'api.cloud.camunda.io',
      'body:grant_type': 'client_credentials',
      'body:client_id': process.env.CAMUNDA_CLIENT_ID,
      'body:client_secret': process.env.CAMUNDA_CLIENT_SECRET,
    }),

    camundaConsoleGetClusters: nao<Camunda.ConsoleGetClusters>({
      kind: 'camunda.console.getClusters',
      'auth:Authorization': process.env.CAMUNDA_JWT,
    }),
    camundaConsoleGetClustersParameters:
      nao<Camunda.ConsoleGetClustersParameters>({
        kind: 'camunda.console.getClustersParameters',
        'auth:Authorization': process.env.CAMUNDA_JWT,
      }),
    camundaConsoleDeleteCluster: nao<Camunda.ConsoleDeleteCluster>({
      kind: 'camunda.console.deleteCluster',
      'auth:Authorization': process.env.CAMUNDA_JWT,
      'param:clusterId': '',
    }),
    camundaConsoleCreateCluster: nao<Camunda.ConsoleCreateCluster>({
      kind: 'camunda.console.createCluster',
      'auth:Authorization': process.env.CAMUNDA_JWT,
      'body:name': 'nice!',
      'body:channelId': '',
      'body:generationId': '',
      'body:planTypeId': '',
      'body:regionId': '',
    }),
    camundaConsoleGetClients: nao<Camunda.ConsoleGetClients>({
      kind: 'camunda.console.getClients',
      'auth:Authorization': process.env.CAMUNDA_JWT,
      'param:clusterId': '',
    }),
    camundaConsoleCreateClient: nao<Camunda.ConsoleCreateClient>({
      kind: 'camunda.console.createClient',
      'auth:Authorization': process.env.CAMUNDA_JWT,
      'param:clusterId': '',
      'body:clientName': 'nice-client',
    }),
    camundaConsoleGetClient: nao<Camunda.ConsoleGetClient>({
      kind: 'camunda.console.getClient',
      'auth:Authorization': process.env.CAMUNDA_JWT,
      'param:clusterId': '',
      'param:clientId': 'P7sF3Z5K246Z-jAXbuJNx_g_lBA4T7Zv',
    }),
    camundaConsoleDeleteClient: nao<Camunda.ConsoleDeleteClient>({
      kind: 'camunda.console.deleteClient',
      'auth:Authorization': process.env.CAMUNDA_JWT,
      'param:clusterId': '',
      'param:clientId': 'P7sF3Z5K246Z-jAXbuJNx_g_lBA4T7Zv',
    }),
    mailcheckai: nao<MailCheckAi.CheckEmail>({
      kind: 'mailcheckai.email.check',
      'param:email': 'test@makerlabs.one',
    }),
    disify: nao<Disify.CheckSingleEmail>({
      kind: 'disify.email.single',
      'param:email': 'test@makerlabs.one',
    }),
    hubspotToken: nao<Hubspot.OAuthToken>({
      kind: 'hubspot.auth.token',
      'header:Content-Type': 'application/x-www-form-urlencoded',
      'auth:grant_type': 'refresh_token',
      'auth:client_id': process.env.HUBSPOT_CLIENT_ID,
      'auth:client_secret': process.env.HUBSPOT_CLIENT_SECRET,
      'auth:refresh_token': process.env.HUBSPOT_REFRESH_TOKEN,
    }),
    hubspotContactCreateOrUpdate: nao<Hubspot.ContactsCreateOrUpdate>({
      kind: 'hubspot.contacts.createOrUpdate',
      'auth:Authorization': process.env.HUBSPOT_JWT,
      'param:contact_email': '...',
      'body:properties': [
        {
          property: '...',
          value: '...',
        },
      ],
    }),
    zeroXSwapQuote: nao<ZeroX.SwapQuote>({
      kind: '0x.swap.quote',
      baseId: 'mainnet',
      'query:buyToken': 'DAI',
      'query:sellToken': 'WETH',
      'query:sellAmount': 100000000000000000,
    }),
    zeroXSwapPrice: nao<ZeroX.SwapPrice>({
      kind: '0x.swap.price',
      baseId: 'mainnet',
      'query:buyToken': 'DAI',
      'query:sellToken': 'WETH',
      'query:sellAmount': 100000000000000000,
    }),
    zeroXSwapSources: nao<ZeroX.SwapSources>({
      kind: '0x.swap.sources',
      baseId: 'mainnet',
    }),
    oneInchInfoTokens: nao<OneInch.AggregationInfoTokens>({
      kind: '1inch.aggregation.infoTokens',
      'param:chainId': 1,
    }),
    oneInchSwapQuote: nao<OneInch.AggregationQuote>({
      kind: '1inch.aggregation.quote',
      'param:chainId': 1,
      'query:fromTokenAddress': '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      'query:toTokenAddress': '0x111111111117dc0aa78b770fa6a738034120c302',
      'query:amount': 10000000000000000,
    }),
    oneInchSwap: nao<OneInch.AggregationSwap>({
      kind: '1inch.aggregation.swap',
      'param:chainId': 1,
      'query:fromTokenAddress': '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      'query:toTokenAddress': '0x111111111117dc0aa78b770fa6a738034120c302',
      'query:amount': 10000000000000000,
      'query:fromAddress': '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      'query:slippage': 1,
    }),
    coinlayerLive: nao<Coinlayer.GetLive>({
      kind: 'coinlayer.all.live',
      'auth:access_key': process.env.COINLAYER_API_KEY,
    }),
    coinlayerList: nao<Coinlayer.GetList>({
      kind: 'coinlayer.all.list',
      'auth:access_key': process.env.COINLAYER_API_KEY,
    }),
    coinlayerHistorical: nao<Coinlayer.GetHistorical>({
      kind: 'coinlayer.all.historical',
      'param:yyyy-mm-dd': '2020-01-01',
      'auth:access_key': process.env.COINLAYER_API_KEY,
    }),
    coincapAssets: nao<CoinCap.getAssets>({
      kind: 'coincap.assets.get',
    }),
    coincapAssetBitcoin: nao<CoinCap.getAsset>({
      kind: 'coincap.assets.getOne',
      'param:id': 'bitcoin',
    }),
    coincapAssetBitcoinHistory: nao<CoinCap.getAssetHistory>({
      kind: 'coincap.assets.history',
      'param:id': 'bitcoin',
      'query:interval': 'd1',
    }),
    coincapAssetBitcoinMarkets: nao<CoinCap.getAssetMarkets>({
      kind: 'coincap.assets.markets',
      'param:id': 'bitcoin',
    }),
    coingeckoListCoins: nao<CoinGecko.ListCoins>({
      kind: 'coingecko.coins.list',
    }),
    coingeckoGetSupportedVsCurrencies:
      nao<CoinGecko.GetSimpleSupportedVsCurrencies>({
        kind: 'coingecko.simple.supportedVsCurrencies',
      }),
    trelloBoardGetLists: nao<Trello.BoardGetLists>({
      kind: 'trello.boards.getLists',
      'param:boardId': process.env.TRELLO_BOARD_ID,
      'auth:key': process.env.TRELLO_KEY,
      'auth:token': process.env.TRELLO_TOKEN,
    }),
    trelloCardCreate: nao<Trello.CardsCreate>({
      kind: 'trello.cards.create',
      'query:idList': process.env.TRELLO_LIST_ID,
      'query:name': 'new web3nao card',
      'auth:key': process.env.TRELLO_KEY,
      'auth:token': process.env.TRELLO_TOKEN,
    }),
    openLibraryBook: nao<OpenLibrary.Books>({
      kind: 'openlibrary.core.books',
      'query:bibkeys': 'ISBN:9780316418522',
      'query:format': 'json',
      'query:jscmd': 'details',
    }),
    clearbitLogo: nao<Clearbit.LogoGet>({
      kind: 'clearbit.logo.get',
      'param:domain': 'segment.com',
      'query:size': 800,
      'query:format': 'png',
    }),
    frankfurterLatest: nao<Frankfurter.Latest>({
      kind: 'frankfurter.core.latest',
    }),
    frankfurterTimeSeries: nao<Frankfurter.TimeSeries>({
      kind: 'frankfurter.core.timeseries',
      'param:range': '2022-01-01..',
      'query:from': 'EUR',
      'query:to': 'USD',
    }),
    purgomalum: nao<PurgoMalum.Profanity>({
      kind: 'purgomalum.core.profanity',
      'query:text': 'this is some test input',
    }),
    apicAgentGet: nao<ApicAgent.Get>({
      kind: 'apicagent.agent.get',
      'query:ua':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36',
    }),
    apicAgentPost: nao<ApicAgent.Post>({
      kind: 'apicagent.agent.post',
      'body:ua':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36',
    }),
    countapiHit: nao<CountApi.Hit>({
      kind: 'countapi.core.hit',
      'param:namespace': 'web3nao.xyz',
      'param:key': 'visits',
    }),
    microDevDbCreateRecord: nao<MicroDev.StorageDbCreateRecord>({
      kind: 'microdev.storage.dbCreateRecord',
      'auth:Authorization': process.env.MICRODEV_TOKEN,
      'body:id': '1',
      'body:table': 'web3nao',
      'body:record': {
        ts: Date.now(),
        data: 'Hello World',
      },
    }),
    microDevDbReadRecord: nao<MicroDev.StorageDbReadRecord>({
      kind: 'microdev.storage.dbReadRecord',
      'auth:Authorization': process.env.MICRODEV_TOKEN,
      // 'body:query': `id == "1"`,
      'body:id': `1`,
      'body:table': 'web3nao',
    }),
    microDevDbUpdateRecord: nao<MicroDev.StorageDbUpdateRecord>({
      kind: 'microdev.storage.dbUpdateRecord',
      'auth:Authorization': process.env.MICRODEV_TOKEN,
      'body:id': `1`,
      'body:table': 'web3nao',
      'body:record': {
        ts: Date.now(),
        data: 'Hello World',
      },
    }),
    microDevDbDeleteRecord: nao<MicroDev.StorageDbDeleteRecord>({
      kind: 'microdev.storage.dbDeleteRecord',
      'auth:Authorization': process.env.MICRODEV_TOKEN,
      'body:id': `1`,
      'body:table': 'web3nao',
    }),
    microDevCacheSet: nao<MicroDev.StorageCacheSet>({
      kind: 'microdev.storage.cacheSet',
      'auth:Authorization': process.env.MICRODEV_TOKEN,
      'body:key': 'web3nao',
      'body:value': 'web3nao',
      'body:ttl': 60,
    }),
    microDevNotesList: nao<MicroDev.StorageNotesList>({
      kind: 'microdev.storage.notesList',
      'auth:Authorization': process.env.MICRODEV_TOKEN,
    }),
    serpStackSearch: nao<SerpStack.Search>({
      kind: 'serpstack.core.search',
      baseId: 'free',
      'auth:access_key': process.env.SERPSTACK_ACCESS_KEY,
      'query:query': 'web3',
    }),
    staticallyZap: nao<Statically.StaticZapGithub>({
      kind: 'statically.staticzap.github',
      'param:user': 'web3nao',
      'param:repo': 'web3nao',
      'param:tag': 'main',
      'param:file': 'packages/http-configs/package.json',
    }),
    browsersfyi: nao<BrowsersFyi.Get>({
      kind: 'browsersfyi.core.get',
    }),
    zoraQueryTokens: nao<Zora.Query>({
      kind: 'zora.graphql.query',
      'body:query': `{
        tokens(filter: {priceFilter: {minimumChainTokenPrice: "1000"}}) {
          nodes {
            token {
              name
            }
          }
        }
      }`,
    }),
    auth0Token: nao<Auth0.GetAuthAccessToken>({
      kind: 'auth0.auth.accesstoken',
      'body:audience': process.env.AUTH0_AUDIENCE,
      'body:grant_type': 'client_credentials',
      'body:client_id': process.env.AUTH0_CLIENT_ID,
      'body:client_secret': process.env.AUTH0_CLIENT_SECRET,
      'subdomain:tenant': process.env.AUTH0_TENANT,
    }),
    auth0SearchUsers: nao<Auth0.ListOrSearchUsers>({
      kind: 'auth0.users.listOrSearch',
      'auth:Authorization': process.env.AUTH0_JWT,
      'query:search_engine': 'v3',
      'query:q': 'email:web3nao@gmail.com',
      'subdomain:tenant': process.env.AUTH0_TENANT,
    }),
    auth0GetUser: nao<Auth0.GetUser>({
      kind: 'auth0.users.get',
      'auth:Authorization': process.env.AUTH0_JWT,
      'subdomain:tenant': process.env.AUTH0_TENANT,
      'param:id': process.env.AUTH0_USER_ID,
    }),
    auth0GetUsersByEmail: nao<Auth0.GetUsersByEmail>({
      kind: 'auth0.usersByEmail.get',
      'auth:Authorization': process.env.AUTH0_JWT,
      'subdomain:tenant': process.env.AUTH0_TENANT,
      'query:email': 'adam.urban@gmail.com',
    }),
    redisCloudGetAccount: nao<RedisCloud.GetCurrentAccount>({
      kind: 'rediscloud.account.get',
      'auth:x-api-key': process.env.REDIS_API_ACCOUNT_KEY,
      'auth:x-api-secret-key': process.env.REDIS_API_USER_KEY,
    }),
    supabaseInsert: nao<Supabase.InsertRows>({
      kind: 'supabase.core.insert',
      'auth:apikey': process.env.SUPABASE_API_KEY,
      'auth:Authorization': process.env.SUPABASE_API_KEY,
      'subdomain:postgres-ref': process.env.SUPABASE_POSTGRES_REF,
      'param:table': 'test',
      'body:body': {
        id: 2,
        name: 'web3nao',
      },
      'header:Prefer': 'resolution=merge-duplicates',
    }),
    supabaseRead: nao<Supabase.ReadRows>({
      kind: 'supabase.core.read',
      'auth:apikey': process.env.SUPABASE_API_KEY,
      'auth:Authorization': process.env.SUPABASE_API_KEY,
      'subdomain:postgres-ref': process.env.SUPABASE_POSTGRES_REF,
      'param:table': 'test',
      'query:select': '*',
      'customQuery:filter': {
        id: 'eq.1',
      },
    }),
    courierSend: nao<Courier.Send>({
      kind: 'courier.send.post',
      'auth:Authorization': process.env.COURIER_API_KEY,
      'body:message': {
        to: {
          email: 'i@adamurban.de',
          data: {
            variables: 'awesomeness',
          },
        },
        template: process.env.COURIER_TEMPLATE,
      },
    }),
    newRelicEvent: nao<NewRelic.InsightsEvents>({
      kind: 'newrelic.insights.events',
      baseId: 'eu',
      'auth:Api-Key': process.env.NEWRELIC_API_KEY,
      'param:accountId': process.env.NEWRELIC_ACCOUNT_ID,
      'body:body': [
        {
          eventType: 'web3nao',
          myType: 'tothemoon',
        },
      ],
    }),
    contentfulGetSpace: nao<ContentFul.ContentGetSpace>({
      kind: 'contentful.content.getSpace',
      baseId: 'cdn',
      'auth:Authorization': process.env.CONTENTFUL_DELIVERY_API_KEY,
      'param:spaceId': process.env.CONTENTFUL_SPACE_ID,
    }),
    contentfulGetSpaceContentModel: nao<ContentFul.ContentGetSpaceContentModel>(
      {
        kind: 'contentful.content.getSpaceContentModel',
        baseId: 'cdn',
        'auth:Authorization': process.env.CONTENTFUL_DELIVERY_API_KEY,
        'param:spaceId': process.env.CONTENTFUL_SPACE_ID,
        'param:environmentId': 'master',
      }
    ),
    contentfulGetSpaceSingleContentType:
      nao<ContentFul.ContentGetSpaceSingleContentType>({
        kind: 'contentful.content.getSpaceSingleContentType',
        baseId: 'cdn',
        'auth:Authorization': process.env.CONTENTFUL_DELIVERY_API_KEY,
        'param:spaceId': process.env.CONTENTFUL_SPACE_ID,
        'param:environmentId': 'master',
        'param:contentTypeId': 'product',
      }),
    contentfulQueryBySpace: nao<ContentFul.GraphQLbySpace>({
      kind: 'contentful.graphql.queryBySpace',
      baseId: 'graphql',
      'auth:Authorization': process.env.CONTENTFUL_DELIVERY_API_KEY,
      'param:spaceId': process.env.CONTENTFUL_SPACE_ID,
      'body:query': `
        {
          productCollection {
            items {
              title
            }
          }
        }
        `,
    }),
    contentfulQueryBySpaceAndEnv: nao<ContentFul.GraphQLbySpaceAndEnvironment>({
      kind: 'contentful.graphql.queryBySpaceAndEnvironment',
      baseId: 'graphql',
      'auth:Authorization': process.env.CONTENTFUL_DELIVERY_API_KEY,
      'param:spaceId': process.env.CONTENTFUL_SPACE_ID,
      'param:environmentId': 'master',
      'body:query': `
        {
          productCollection {
            items {
              title
            }
          }
        }
        `,
    }),
  }
  const requestConfig = requestConfigs.contentfulQueryBySpaceAndEnv

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
