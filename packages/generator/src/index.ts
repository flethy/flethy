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
import Twitter from '../../http-configs/src/wip/twitter.config'
import { Web3Storage } from '../../http-configs/src/configs/web3storage.config'
import { ZeroX } from '../../http-configs/src/configs/zerox.config'
import Zora from '../../http-configs/src/configs/zora.config'
import { FetchParams } from '../../http-configs/src/types/FetchParams.type'
import { nao } from '../../http-configs/src/utils/Request.utils'
import { HttpRequest } from './controllers/HttpRequest'
import { logger } from './utils/Logger'
import HelloSign from '../../http-configs/src/configs/hellosign.config'
import AbstractApi from '../../http-configs/src/configs/abstractapi.config'
import Calendarific from '../../http-configs/src/configs/calendarific.config'
import HostIo from '../../http-configs/src/configs/hostio.config'
import HunterIo from '../../http-configs/src/configs/hunterio.config'
import CalCom from '../../http-configs/src/configs/calcom.config'
import Ortto from '../../http-configs/src/configs/ortto.config'
import APITemplateIo from '../../http-configs/src/configs/apitemplateio.config'
import BaseRow from '../../http-configs/src/configs/baserow.config'
import RemoteOk from '../../http-configs/src/configs/remoteok.config'
import Bitly from '../../http-configs/src/configs/bitly.config'
import Typeform from '../../http-configs/src/configs/typeform.config'
import ConvertKit from '../../http-configs/src/configs/convertkit.config'
import DeepL from '../../http-configs/src/configs/deepl.config'
import Tribe from '../../http-configs/src/configs/tribe.config'
import Sentry from '../../http-configs/src/configs/sentry.config'
import WhoIsXMLApi from '../../http-configs/src/configs/whoisxmlapi.config'
import BambooHR from '../../http-configs/src/configs/bamboohr.config'
import Personio from '../../http-configs/src/configs/personio.config'
import Up42 from '../../http-configs/src/configs/up42.config'
import Brandfetch from '../../http-configs/src/configs/brandfetch.config'
import UsePlunk from '../../http-configs/src/configs/useplunk.config'
import ClickUp from '../../http-configs/src/configs/clickup.config'
import Clockify from '../../http-configs/src/configs/clockify.config'
import Dhl from '../../http-configs/src/configs/dhl.config'
import Eventbrite from '../../http-configs/src/configs/eventbrite.config'
import RemoveBg from '../../http-configs/src/configs/removebg.config'
import Grist from '../../http-configs/src/configs/grist.config'
import MailPace from '../../http-configs/src/configs/mailpace.config'
import HackerNews from '../../http-configs/src/configs/hackernews.config'
import Harvest from '../../http-configs/src/configs/harvest.config'
import Jira from '../../http-configs/src/configs/jira.config'
import Linear from '../../http-configs/src/configs/linear.config'
import Mezmo from '../../http-configs/src/configs/mezmo.config'
import Medium from '../../http-configs/src/configs/medium.config'
import Fauna from '../../http-configs/src/configs/fauna.config'
import PayPal from '../../http-configs/src/configs/paypal.config'
import Shortcut from '../../http-configs/src/configs/shortcut.config'
import RapidApi from '../../http-configs/src/configs/rapidapi.config'
import SendGrid from '../../http-configs/src/configs/sendgrid.config'
import Apify from '../../http-configs/src/configs/apify.config'
import Bruzu from '../../http-configs/src/configs/bruzu.config'
import Clarifai from '../../http-configs/src/configs/clarifai.config'
import Lokalise from '../../http-configs/src/configs/lokalise.config'
import Klaviyo from '../../http-configs/src/configs/klaviyo.config'
import Peekalink from '../../http-configs/src/configs/peekalink.config'
import Stackby from '../../http-configs/src/configs/stackby.config'
import GrafBase from '../../http-configs/src/configs/grafbase.config'
import UptimeRobot from '../../http-configs/src/configs/uptimerobot.config'
import Twilio from '../../http-configs/src/configs/twilio.config'
import UrlScan from '../../http-configs/src/configs/urlscan.config'
import CurrencyScoop from '../../http-configs/src/configs/currencyscoop.config'
import Geekflare from '../../http-configs/src/configs/geekflare.config'
import Canny from '../../http-configs/src/configs/canny.config'
import ChartMogul from '../../http-configs/src/configs/chartmogul.config'
import DynaPictures from '../../http-configs/src/configs/dynapictures.config'
import Hybiscus from '../../http-configs/src/configs/hybiscus.config'
import BigDataCloud from '../../http-configs/src/configs/bigdatacloud.config'
import MailboxValidator from '../../http-configs/src/configs/mailboxvalidator.config'
import Microlink from '../../http-configs/src/configs/microlink.config'
import Unavatar from '../../http-configs/src/configs/unavatar.config'
import NewsApi from '../../http-configs/src/configs/newsapi.config'
import OCRSpace from '../../http-configs/src/configs/ocrspace.config'
import Pixela from '../../http-configs/src/configs/pixela.config'
import Shrtcode from '../../http-configs/src/configs/shrtcode.config'
import SerpApi from '../../http-configs/src/configs/serpapi.config'
import Nasa from '../../http-configs/src/configs/nasa.config'
import WordSimi from '../../http-configs/src/configs/wordsimi.config'
import DatoCMS from '../../http-configs/src/configs/datocms.config'
import Unsplash from '../../http-configs/src/configs/unsplash.config'
import PostHog from '../../http-configs/src/configs/posthog.config'
import Doppler from '../../http-configs/src/configs/doppler.config'
import MojoAuth from '../../http-configs/src/configs/mojoauth.config'
import Ably from '../../http-configs/src/configs/ably.config'
import GraphJSON from '../../http-configs/src/configs/graphjson.config'
import Tenderly from '../../http-configs/src/configs/tenderly.config'
import OpenWeatherMap from '../../http-configs/src/configs/openweathermap.config'
import TMDB from '../../http-configs/src/configs/tmdb.config'
import Beehiiv from '../../http-configs/src/configs/beehiiv.config'
import BannerBear from '../../http-configs/src/configs/bannerbear.config'
import Lecto from '../../http-configs/src/configs/lecto.config'
import Algolia from '../../http-configs/src/configs/algolia.config'
import TheStarWarsApi from '../../http-configs/src/configs/thestarwarsapi.config'
import SideKick from '../../http-configs/src/configs/sidekick.config'
import RestZeebe from '../../http-configs/src/configs/restzeebe.config'
import CloudFlare from '../../http-configs/src/configs/cloudflare.config'
import Netlify from '../../http-configs/src/configs/netlify.config'
import EasyDb from '../../http-configs/src/configs/easydb.config'
import RestDB from '../../http-configs/src/configs/restdb.config'
import ClickSend from '../../http-configs/src/configs/clicksend.config'
import Render from '../../http-configs/src/configs/render.config'
import Parsiq from '../../http-configs/src/configs/parsiq.config'

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
    slackPublishMessage: nao<Slack.ChatPostMessage>({
      kind: 'slack.chat.postMessage',
      'auth:Authorization': process.env.SLACK_BOT_TOKEN,
      'body:text': 'Hello, world!',
      'body:channel': process.env.SLACK_CHANNEL_ID,
    }),
    slackListConversations: nao<Slack.ConversationsList>({
      kind: 'slack.conversations.list',
      'auth:Authorization': process.env.SLACK_BOT_TOKEN,
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
      baseId: 'api',
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
        { emailCollection(order: [order_ASC]) { items { content } } }
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
    // twitterBearerToken: nao<Twitter.AuthBearer>({
    //   kind: 'twitter.auth.bearer',
    //   'auth:grant_type': 'client_credentials',
    //   'auth:Authorization': {
    //     username: process.env.TWITTER_API_KEY,
    //     password: process.env.TWITTER_API_SECRET,
    //   },
    // }),
    // twitterAuthorizationCode: nao<Twitter.AuthOAuth2AuthorizationCode>({
    //   kind: 'twitter.auth.oAuth2AuthorizationCode',
    //   'auth:grant_type': 'refresh_token',
    //   'auth:client_id': process.env.TWITTER_CLIENT_ID,
    //   'auth:client_secret': process.env.TWITTER_CLIENT_SECRET,
    //   'auth:refresh_token': process.env.TWITTER_REFRESH_TOKEN,
    //   'header:Content-Type': 'application/x-www-form-urlencoded',
    // }),
    // twitterManagePostTweets: nao<Twitter.PostTweets>({
    //   kind: 'twitter.manage.postTweets',
    //   'auth:Authorization': {
    //     username: process.env.TWITTER_ACCESS_TOKEN,
    //     password: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    //   },
    //   'body:text': 'nice!',
    // }),
    // twitterV1StatusUpdate: nao<Twitter.StatusUpdate>({
    //   kind: 'twitter.v1status.update',
    //   'auth:Authorization': {
    //     username: process.env.TWITTER_ACCESS_TOKEN,
    //     password: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    //   },
    //   'query:status': 'nice!',
    // }),
    helloSignGetAccount: nao<HelloSign.GetAccount>({
      kind: 'hellosign.account.get',
      'auth:Authorization': {
        username: process.env.HELLOSIGN_API_KEY,
      },
    }),
    helloSignSignatureRequest: nao<HelloSign.SendSignatureRequest>({
      kind: 'hellosign.signatureRequest.send',
      'auth:Authorization': {
        username: process.env.HELLOSIGN_API_KEY,
      },
      signers: [
        {
          name: 'Adam',
          email_address: 'adam.urban@gmail.com',
        },
      ],
      file_url: ['https://web3nao.xyz'],
      test_mode: true,
    }),
    abstractHolidays: nao<AbstractApi.GetPublicHolidays>({
      kind: 'abstractapi.publicHolidays.get',
      'auth:api_key': process.env.ABSTRACT_HOLIDAY_API_KEY,
      'query:country': 'DE',
      'query:year': 2022,
      'query:month': 10,
      'query:day': 3,
    }),
    calendarificHolidays: nao<Calendarific.GetHolidays>({
      kind: 'calendarific.core.holidays',
      'auth:api_key': process.env.CALENDARIFIC_API_KEY,
      'query:country': 'DE',
      'query:year': 2022,
      'query:month': 10,
      'query:day': 3,
    }),
    hostioDomain: nao<HostIo.GetDomain>({
      kind: 'hostio.core.web',
      'auth:Authorization': process.env.HOST_IO_API_TOKEN,
      'param:domain': `urbanisierung.dev`,
    }),
    hostioFull: nao<HostIo.GetFull>({
      kind: 'hostio.core.full',
      'auth:Authorization': process.env.HOST_IO_API_TOKEN,
      'param:domain': `urbanisierung.dev`,
    }),
    hunterioDomainSearch: nao<HunterIo.DomainSearch>({
      kind: 'hunterio.core.domainSearch',
      'auth:api_key': process.env.HUNTER_API_KEY,
      'query:domain': `urbanisierung.dev`,
    }),
    hunterioEmailFinder: nao<HunterIo.EmailFinder>({
      kind: 'hunterio.core.emailFinder',
      'auth:api_key': process.env.HUNTER_API_KEY,
      'query:domain': `diypunks.xyz`,
      'query:first_name': 'Adam',
      'query:last_name': 'Urban',
    }),
    hunterioEmailVerification: nao<HunterIo.EmailVerification>({
      kind: 'hunterio.core.emailVerification',
      'auth:api_key': process.env.HUNTER_API_KEY,
      'query:email': 'adam.urban@urbanisierung.dev',
    }),
    calComFindAllAvailabilities: nao<CalCom.FindAllAvailabilities>({
      kind: 'calcom.availability.findAllAvailabilities',
      'auth:apiKey': process.env.CAL_COM_API_KEY,
    }),
    calComFindAnAvailability: nao<CalCom.FindAnAvailability>({
      kind: 'calcom.availability.findAnAvailability',
      'auth:apiKey': process.env.CAL_COM_API_KEY,
      'param:availabilityId': Number(process.env.CAL_COM_AVAILABILITY_ID),
    }),
    calComCreateAvailability: nao<CalCom.CreateAvailability>({
      kind: 'calcom.availability.create',
      'auth:apiKey': process.env.CAL_COM_API_KEY,
      'body:startTime': new Date('2022-07-18 09:00').toISOString(),
      'body:endTime': new Date('2022-07-18 15:00').toISOString(),
    }),
    calComFindAllEventTypes: nao<CalCom.FindAllEventTypes>({
      kind: 'calcom.eventTypes.findAllEventTypes',
      'auth:apiKey': process.env.CAL_COM_API_KEY,
    }),
    orttoRetrieve: nao<Ortto.RetrieveOneOrMorePeople>({
      kind: 'ortto.person.retrieve',
      'auth:X-Api-Key': process.env.ORTTO_API_KEY,
      'body:sort_by_field_id': 'str::last',
      'body:fields': ['str::first', 'str::email'],
      'body:filter': {
        $has_any_value: {
          field_id: 'str::first',
        },
      },
    }),
    apiTemplateIoCreateImage: nao<APITemplateIo.CreateImage>({
      kind: 'apitemplateio.core.createImage',
      'auth:X-API-KEY': process.env.API_TEMPLATE_IO_API_KEY,
      baseId: 'default',
      'query:template_id': process.env.API_TEMPLATE_IO_TEMPLATE_ID,
      'query:expiration': 5,
      'body:overrides': [
        {
          name: 'text_content',
          text: 'web3nao',
        },
      ],
    }),
    baseRowCreate: nao<BaseRow.CreateRow>({
      kind: 'baserow.core.create',
      'auth:Authorization': process.env.BASEROW_API_TOKEN,
      'param:tableId': process.env.BASEROW_TABLE_ID,
      'body:body': {
        Name: 'web3nao',
        'Last name': 'web3nao',
        Notes: 'web3nao notes',
        Active: true,
      },
      'query:user_field_names': true,
    }),
    baseRowGet: nao<BaseRow.GetRows>({
      kind: 'baserow.core.get',
      'auth:Authorization': process.env.BASEROW_API_TOKEN,
      'param:tableId': process.env.BASEROW_TABLE_ID,
      // 'query:user_field_names': true,
    }),
    remoteOk: nao<RemoteOk.GetListings>({
      kind: 'remoteok.core.get',
    }),
    bitlyShorten: nao<Bitly.CreateShortLink>({
      kind: 'bitly.links.shorten',
      'auth:Authoriztion': process.env.BITLY_API_TOKEN,
      // 'body:group_guid': process.env.BITLY_GROUP_ID,
      'body:long_url': 'https://urbanisierung.dev',
      // 'body:domain': 'bit.ly',
    }),
    typeformCreateForm: nao<Typeform.CreateApiCreateForm>({
      kind: 'typeform.create.create',
      'auth:Authorization': process.env.TYPEFORM_API_TOKEN,
      'body:title': 'test',
    }),
    convertKitGetAccount: nao<ConvertKit.GetAccount>({
      kind: 'convertkit.account.get',
      'auth:api_secret': process.env.CONVERTKIT_API_SECRET,
    }),
    convertKitListSubscribers: nao<ConvertKit.ListSubscribers>({
      kind: 'convertkit.subscribers.list',
      'auth:api_secret': process.env.CONVERTKIT_API_SECRET,
    }),
    deeplTranslate: nao<DeepL.TranslatingRequest>({
      kind: 'deepl.translating.request',
      baseId: 'free',
      'auth:Authorization': process.env.DEEPL_AUTH_KEY,
      'query:text': `Hi web3nao, wie geht es dir?`,
      'query:target_lang': 'EN-US',
    }),
    deeplListLanguagePairs: nao<DeepL.GlossaryListLanguagePairs>({
      kind: 'deepl.glossaries.listLanguagePairs',
      baseId: 'free',
      'auth:Authorization': process.env.DEEPL_AUTH_KEY,
    }),
    tribeAppAccessToken: nao<Tribe.TribeAccessToken>({
      kind: 'tribe.auth.appAccessToken',
      baseId: 'app-access-token',
      'auth:clientId': process.env.TRIBE_CLIENT_ID,
      'auth:clientSecret': process.env.TRIBE_CLIENT_SECRET,
      'body:query': `query {
        limitedToken(
          context:NETWORK, 
          networkId: "${process.env.TRIBE_NETWORK_ID}", 
          entityId: "${process.env.TRIBE_NETWORK_ID}", 
        ) {
          accessToken
        }
      }`,
    }),
    sentryQueryDiscoverEvents: nao<Sentry.QueryDiscoverEvents>({
      kind: 'sentry.discover.query',
      'auth:Authorization': process.env.SENTRY_API_TOKEN,
      'param:organizationSlug': 'web3nao',
      'query:field': 'transaction',
    }),
    sentryListProjects: nao<Sentry.ListProjects>({
      kind: 'sentry.projects.list',
      'auth:Authorization': process.env.SENTRY_API_TOKEN,
    }),
    whoIsXMLApiDomainAvailability: nao<WhoIsXMLApi.DomainAvailability>({
      kind: 'whoisxmlapi.core.domainavailability',
      'auth:apiKey': process.env.WHOISXMLAPI_API_KEY,
      'query:domainName': 'doitnao.xyz',
    }),
    bamboohrEmployeesDir: nao<BambooHR.EmployeesDirectory>({
      kind: 'bamboohr.employees.directory',
      'auth:Authorization': {
        username: process.env.BAMBOOHR_API_KEY,
        password: 'x',
      },
      'param:companySlug': 'ethme',
    }),
    personioAuthRequest: nao<Personio.AuthRequest>({
      kind: 'personio.auth.request',
      'auth:client_id': process.env.PERSONIO_CLIENT_ID,
      'auth:client_secret': process.env.PERSONIO_CLIENT_SECRET,
    }),
    personioEmployeesGet: nao<Personio.EmployeesGet>({
      kind: 'personio.employees.get',
      'auth:Authorization': process.env.PERSONIO_JWT,
    }),
    personioAbsencesGet: nao<Personio.AbsencesGet>({
      kind: 'personio.absences.get',
      'auth:Authorization': process.env.PERSONIO_JWT,
    }),
    up42AuthRequest: nao<Up42.AuthRequest>({
      kind: 'up42.auth.request',
      'auth:Authorization': {
        username: process.env.UP42_PROJECT_ID,
        password: process.env.UP42_PROJECT_API_KEY,
      },
      'auth:grant_type': 'client_credentials',
    }),
    up42CreditsBalance: nao<Up42.CreditsBalance>({
      kind: 'up42.credits.balance',
      'auth:Authorization': process.env.UP42_JWT,
    }),
    up42CatalogSearch: nao<Up42.CatalogSearch>({
      kind: 'up42.catalog.search',
      'auth:Authorization': process.env.UP42_JWT,
      'body:datetime': '2019-03-22T00:00:00Z/2019-03-24T23:59:59Z',
      'body:intersects': {
        type: 'Polygon',
        coordinates: [
          [
            [13.58899063, 52.72706317],
            [13.8941314, 52.73057866],
            [13.89381997, 52.4393652],
            [13.58935102, 2.43718654],
            [1.58899063, 52.72706317],
          ],
        ],
      },
      'body:limit': 1,
      'body:collections': ['PHR'],
      'body:query': {
        cloudCoverage: {
          lte: 90,
        },
        resolution: {
          lte: 10,
        },
        'up42:usageType': {
          in: ['DATA', 'ANALYTICS'],
        },
        deliveryTime: {
          in: ['HOURS', 'MINUTES'],
        },
        producer: {
          in: ['Airbus'],
        },
        processingLevel: {
          in: ['ALBUM', 'SENSOR'],
        },
      },
    }),
    brandFetch: nao<Brandfetch.BrandByDomainOrId>({
      kind: 'brandfetch.brands.byDomainOrId',
      'auth:Authorization': process.env.BRANDFETCH_API_KEY,
      'param:domainOrId': 'diypunks.xyz',
    }),
    usePlunk: nao<UsePlunk.PostEvent>({
      kind: 'useplunk.core.event',
      'auth:Authorization': process.env.USEPLUNK_SECRET_KEY,
      'body:event': 'my-first-event',
      'body:email': 'adam.urban@gmail.com',
    }),
    clickupGetAllSpaces: nao<ClickUp.SpacesGetAll>({
      kind: 'clickup.spaces.getAll',
      'auth:Authorization': process.env.CLICKUP_API_TOKEN,
      'param:teamId': Number(process.env.CLICKUP_TEAM_ID),
    }),
    clickupGetAllLists: nao<ClickUp.ListsGetAllFolderless>({
      kind: 'clickup.lists.getAllFolderless',
      'auth:Authorization': process.env.CLICKUP_API_TOKEN,
      'param:spaceId': Number(process.env.CLICKUP_SPACE_ID),
    }),
    tasksGetAll: nao<ClickUp.TasksGetAll>({
      kind: 'clickup.tasks.getAll',
      'auth:Authorization': process.env.CLICKUP_API_TOKEN,
      'param:listId': Number(process.env.CLICKUP_LIST_ID),
    }),
    clockifyGetAllProjects: nao<Clockify.ProjectsGetAll>({
      kind: 'clockify.projects.getAll',
      baseId: 'base',
      'auth:X-Api-Key': process.env.CLOCKIFY_API_KEY,
      'param:workspaceId': process.env.CLOCKIFY_WORKSPACE_ID,
    }),
    dhlTracking: nao<Dhl.TrackingUnified>({
      kind: 'dhl.tracking.unified',
      'auth:DHL-API-Key': process.env.DHL_API_KEY,
      'query:trackingNumber': process.env.DHL_TRACKING_NUMBER,
    }),
    eventbriteListAttendees: nao<Eventbrite.ListAttendeeByEventId>({
      kind: 'eventbrite.attendee.listByEventId',
      'auth:Authorization': process.env.EVENTBRITE_API_TOKEN,
      'param:eventId': '83305830983',
    }),
    eventbriteGetUserMe: nao<Eventbrite.GetUserMe>({
      kind: 'eventbrite.user.me',
      'auth:Authorization': process.env.EVENTBRITE_API_TOKEN,
    }),
    removeBg: nao<RemoveBg.Remove>({
      kind: 'removebg.core.remove',
      'auth:X-API-Key': process.env.REMOVEBG_API_KEY,
      'body:image_url':
        'https://images.unsplash.com/photo-1658801615124-e815ce5ff4a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      'header:Content-Type': 'application/json',
    }),
    gristAddRecords: nao<Grist.AddRecords>({
      kind: 'grist.records.add',
      'auth:Authorization': process.env.GRIST_API_KEY,
      'param:docId': process.env.GRIST_DOC_ID,
      'param:tableId': process.env.GRIST_TABLE_ID,
      baseId: 'docs',
      'body:records': [
        {
          fields: {
            A: 1,
            B: 2,
          },
        },
        {
          fields: {
            A: 11,
            B: 22,
          },
        },
      ],
    }),
    gristFetchRecords: nao<Grist.FetchRecords>({
      kind: 'grist.records.fetch',
      'auth:Authorization': process.env.GRIST_API_KEY,
      'param:docId': process.env.GRIST_DOC_ID,
      'param:tableId': process.env.GRIST_TABLE_ID,
      baseId: 'docs',
    }),
    gristDescribeDocument: nao<Grist.DescribeDocument>({
      kind: 'grist.docs.describe',
      'auth:Authorization': process.env.GRIST_API_KEY,
      'param:docId': process.env.GRIST_DOC_ID,
      baseId: 'docs',
    }),
    mailpaceSend: nao<MailPace.Send>({
      kind: 'mailpace.core.send',
      'auth:MailPace-Server-Token': process.env.MAILPACE_API_KEY,
      'header:Accept': 'application/json',
      'header:Content-Type': 'application/json',
      'body:from': 'adam@web3nao.xyz',
      'body:to': 'adam.urban@gmail.com',
      'body:textbody': `Yo!
      
      Already checked web3nao? It's AWESOME!`,
      'body:subject': 'Check! Out! web3nao!',
    }),
    hackerNews: nao<HackerNews.GetItem>({
      kind: 'hackernews.core.item',
      'param:id': '8863.json',
    }),
    harvestListProjects: nao<Harvest.ListProjects>({
      kind: 'harvest.projects.list',
      'auth:Authorization': process.env.HARVEST_API_TOKEN,
      'auth:Harvest-Account-Id': process.env.HARVEST_ACCOUNT_ID,
    }),
    jiraGetIssue: nao<Jira.GetIssue>({
      kind: 'jira.issue.get',
      'auth:Authorization': {
        username: process.env.JIRA_USERNAME,
        password: process.env.JIRA_API_TOKEN,
      },
      'subdomain:project': process.env.JIRA_PROJECT,
      'param:issueId': process.env.JIRA_ISSUE_ID,
    }),
    jiraCreateIssue: nao<Jira.CreateIssue>({
      kind: 'jira.issue.create',
      'auth:Authorization': {
        username: process.env.JIRA_USERNAME,
        password: process.env.JIRA_API_TOKEN,
      },
      'subdomain:project': process.env.JIRA_PROJECT,
      'body:fields': {
        project: {
          id: '10000',
        },
        summary: 'Integrate with JIRA',
        description: 'doit',
        issuetype: {
          id: '10001',
        },
      },
    }),
    jiraSearchIssues: nao<Jira.SearchIssues>({
      kind: 'jira.issue.search',
      'auth:Authorization': {
        username: process.env.JIRA_USERNAME,
        password: process.env.JIRA_API_TOKEN,
      },
      'subdomain:project': process.env.JIRA_PROJECT,
    }),
    linear: nao<Linear.GraphQLQuery>({
      kind: 'linear.graphql.query',
      'auth:Authorization': process.env.LINEAR_API_KEY,
      'body:query': `{ issues { nodes { id title } } }`,
    }),
    mezmoIngest: nao<Mezmo.IngestLogs>({
      kind: 'mezmo.logs.ingest',
      baseId: 'logs',
      'auth:Authorization': { username: process.env.MEZMO_API_KEY },
      'body:lines': [
        {
          line: 'first log',
          app: 'web3nao',
        },
      ],
      'query:hostname': 'web3nao',
    }),
    mediumMe: nao<Medium.Me>({
      kind: 'medium.users.me',
      'auth:Authorization': process.env.MEDIUM_API_KEY,
    }),
    mediumPublications: nao<Medium.GetPublications>({
      kind: 'medium.users.publications',
      'auth:Authorization': process.env.MEDIUM_API_KEY,
      'param:userId': process.env.MEDIUM_USER_ID,
    }),
    faunaQuery: nao<Fauna.GraphQLQuery>({
      kind: 'fauna.graphql.query',
      'auth:Authorization': process.env.FAUNA_API_KEY,
      baseId: 'eu',
      'body:query': `query {
        allProducts {
          data {
            name
          }
        }
      }`,
    }),
    paypalAuth: nao<PayPal.AuthRequest>({
      kind: 'paypal.auth.request',
      'auth:Authorization': {
        username: process.env.PAYPAL_SANDBOX_CLIENT_ID,
        password: process.env.PAYPAL_SANDBOX_CLIENT_SECRET,
      },
      'auth:grant_type': 'client_credentials',
      baseId: 'sandbox',
    }),
    shortcutListCategories: nao<Shortcut.ListCategories>({
      kind: 'shortcut.categories.list',
      'auth:Shortcut-Token': process.env.SHORTCUT_API_TOKEN,
    }),
    shortcutCreateCategory: nao<Shortcut.CreateCategory>({
      kind: 'shortcut.categories.create',
      'auth:Shortcut-Token': process.env.SHORTCUT_API_TOKEN,
      'body:name': 'web3nao',
      'body:type': 'milestone',
    }),
    shortcutSearch: nao<Shortcut.Search>({
      kind: 'shortcut.search.all',
      'auth:Shortcut-Token': process.env.SHORTCUT_API_TOKEN,
      'query:query': `type:feature`,
    }),
    rapidApiArticleExtractor: nao<RapidApi.ArticleExtractor>({
      kind: 'rapidapi.data.articleExtractor',
      'auth:X-RapidAPI-Key': process.env.RAPIDAPI_API_KEY,
      'header:X-RapidAPI-Host': 'article-extractor2.p.rapidapi.com',
      'subdomain:api': 'article-extractor2',
      'query:url':
        'https://dev.to/urbanisierung/cut-a-few-braids-new-npm-package-1234',
    }),
    sendgridSendMail: nao<SendGrid.SendMail>({
      kind: 'sendgrid.mail.send',
      'auth:Authorization': process.env.SENDGRID_API_KEY,
      'body:from': {
        email: 'adam@web3nao.xyz',
      },
      'body:subject': 'Hi!',
      'body:personalizations': [
        {
          to: [
            {
              email: 'adam.urban@gmail.com',
            },
          ],
          dynamic_template_data: {
            name: 'Adam',
          },
        },
      ],
      'body:template_id': process.env.SENDGRID_TEMPLATE_ID,
    }),
    apifyListActors: nao<Apify.ListActors>({
      kind: 'apify.actors.list',
      'auth:Authorization': process.env.APIFY_API_KEY,
    }),
    bruzu: nao<Bruzu.CreateImage>({
      kind: 'bruzu.image.create',
      'auth:apiKey': process.env.BRUZU_API_KEY,
      'query:backgroundImage':
        'https://source.unsplash.com/U-Kty6HxcQc/600x400',
      'query:backgroundImage.opacity': 0.7,
      'query:height': 400,
      'query:width': 600,
      'query:backgroundColor': 'red',
      'query:a.text': 'web3nao',
    }),
    clarifaiMakePrediction: nao<Clarifai.MakePredictions>({
      kind: 'clarifai.predictions.make',
      'auth:Authorization': process.env.CLARIFAI_API_KEY,
      'param:modelId': 'general-image-recognition',
      'body:inputs': [
        {
          data: {
            image: {
              url: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            },
          },
        },
      ],
    }),
    lokaliseCreateTask: nao<Lokalise.CreateTask>({
      kind: 'lokalise.tasks.create',
      'auth:X-Api-Token': process.env.LOKALISE_API_TOKEN,
      'param:project_id': process.env.LOKALISE_PROJECT_ID,
      'body:title': 'first',
      'body:task_type': 'translation',
      'body:source_language_iso': 'en',
      'body:languages': [
        {
          language_iso: 'de_DE',
          users: [process.env.LOKALISE_USER_ID],
        },
      ],
    }),
    lokaliseListTasks: nao<Lokalise.ListTasks>({
      kind: 'lokalise.tasks.list',
      'auth:X-Api-Token': process.env.LOKALISE_API_TOKEN,
      'param:project_id': process.env.LOKALISE_PROJECT_ID,
    }),
    lokaliseListTeams: nao<Lokalise.ListTeams>({
      kind: 'lokalise.teams.list',
      'auth:X-Api-Token': process.env.LOKALISE_API_TOKEN,
    }),
    lokaliseListUsers: nao<Lokalise.ListUsers>({
      kind: 'lokalise.users.list',
      'auth:X-Api-Token': process.env.LOKALISE_API_TOKEN,
      'param:team_id': process.env.LOKALISE_TEAM_ID,
    }),
    klaviyoTrack: nao<Klaviyo.TrackProfileActivity>({
      kind: 'klaviyo.track.trackProfile',
      'auth:token': process.env.KLAVIYO_PUBLIC_KEY,
      'body:event': 'first',
      'body:customer_properties': {
        $email: 'adam.urban@gmail.com',
      },
    }),
    klaviyoGetProfileId: nao<Klaviyo.GetProfileId>({
      kind: 'klaviyo.profiles.getProfileId',
      'auth:api_key': process.env.KLAVIYO_PRIVATE_KEY,
      'query:email': 'adam.urban@gmail.com',
    }),
    klaviyoGetProfile: nao<Klaviyo.GetProfile>({
      kind: 'klaviyo.profiles.getProfile',
      'auth:api_key': process.env.KLAVIYO_PRIVATE_KEY,
      'param:person_id': process.env.KLAVIYO_PERSON_ID,
    }),
    peekalink: nao<Peekalink.Preview>({
      kind: 'peekalink.core.preview',
      'auth:X-API-Key': process.env.PEEKALINK_API_KEY,
      'body:link': 'https://diypunks.xyz',
    }),
    stackbyList: nao<Stackby.ListRows>({
      kind: 'stackby.core.list',
      'param:stackId': process.env.STACKBY_STACK_ID,
      'param:tableId': process.env.STACKBY_TABLE_ID,
      'auth:api-key': process.env.STACKBY_API_KEY,
    }),
    grafbasePagination: nao<GrafBase.GraphQLQuery>({
      kind: 'grafbase.graphql.query',
      'auth:Authorization': process.env.GRAFBASE_API_KEY,
      'subdomain:project': process.env.GRAFBASE_PROJECT,
      'body:query': `{
        userCollection(first: 5) {
          pageInfo {
            hasPreviousPage
            hasNextPage
          }
          edges {
            node {
              id
              name
              email
            }
            cursor
          }
        }
      }`,
    }),
    grafbaseCreate: nao<GrafBase.GraphQLQuery>({
      kind: 'grafbase.graphql.query',
      'auth:Authorization': process.env.GRAFBASE_API_KEY,
      'subdomain:project': process.env.GRAFBASE_PROJECT,
      'body:query': `mutation {
        userCreate(
          input: {name: "web3nao", email: "web3nao", posts: {create: {title: "nice!", url: "woopwoop"}}, comments: {create: {content: "Foo bar"}}}
        ) {
          user {
            id
            name
            email
            posts {
              id
              title
              url
            }
            comments {
              id
              content
            }
          }
        }
      }`,
    }),
    uptimeRobotsGetMonitors: nao<UptimeRobot.GetMonitors>({
      kind: 'uptimerobot.monitors.get',
      'auth:api_key': process.env.UPTIMEROBOT_API_KEY,
    }),
    twilioSms: nao<Twilio.SendSms>({
      kind: 'twilio.messaging.sms',
      'auth:Authorization': {
        username: process.env.TWILIO_ACCOUNT_SID,
        password: process.env.TWILIO_AUTH_TOKEN,
      },
      'param:accountSid': process.env.TWILIO_ACCOUNT_SID,
      'header:Content-Type': 'application/x-www-form-urlencoded',
      'bodyform:To': process.env.TWILIO_NUMBER,
      'bodyform:MessagingServiceSid': process.env.TWILIO_MESSAGIN_SID,
      'bodyform:Body': 'Hi web3nao!',
    }),
    urlscanSubmission: nao<UrlScan.Submission>({
      kind: 'urlscan.core.submission',
      'auth:API-Key': process.env.URLSCAN_API_KEY,
      'body:url': 'https://makeroracles.xyz',
    }),
    urlscanResult: nao<UrlScan.Result>({
      kind: 'urlscan.core.result',
      'auth:API-Key': process.env.URLSCAN_API_KEY,
      'param:uuid': '08ebe42d-d765-4aaf-b028-b7c33a571f92',
    }),
    currencyScoopCurrencies: nao<CurrencyScoop.Currencies>({
      kind: 'currencyscoop.core.currencies',
      'auth:api_key': process.env.CURRENCYSCOOP_API_KEY,
      'query:type': 'fiat',
    }),
    currencyScoopLatest: nao<CurrencyScoop.Latest>({
      kind: 'currencyscoop.core.latest',
      'auth:api_key': process.env.CURRENCYSCOOP_API_KEY,
      'query:base': 'EUR',
    }),
    geekflareBrokenLink: nao<Geekflare.BrokenLink>({
      kind: 'geekflare.core.brokenLink',
      'auth:x-api-key': process.env.GEEKFLARE_API_KEY,
      'body:url': 'https://diypunks.xyz',
      'body:proxyCountry': 'us',
      'body:followRedirect': false,
    }),
    geekflareDNSRecords: nao<Geekflare.DNSRecords>({
      kind: 'geekflare.core.dnsRecords',
      'auth:x-api-key': process.env.GEEKFLARE_API_KEY,
      'body:url': 'https://diypunks.xyz',
    }),
    geekflareLighthouse: nao<Geekflare.Lighthouse>({
      kind: 'geekflare.core.lighthouse',
      'auth:x-api-key': process.env.GEEKFLARE_API_KEY,
      'body:url': 'https://diypunks.xyz',
      'body:proxyCountry': 'us',
      'body:followRedirect': false,
    }),
    geekflareScreenshot: nao<Geekflare.Screenshot>({
      kind: 'geekflare.core.screenshot',
      'auth:x-api-key': process.env.GEEKFLARE_API_KEY,
      'body:url': 'https://diypunks.xyz',
      'body:proxyCountry': 'us',
    }),
    cannyListBoards: nao<Canny.ListBoards>({
      kind: 'canny.boards.list',
      'auth:apiKey': process.env.CANNY_API_KEY,
    }),
    cannyRetrieveBoard: nao<Canny.RetrieveBoard>({
      kind: 'canny.boards.retrieve',
      'auth:apiKey': process.env.CANNY_API_KEY,
      'body:id': process.env.CANNY_BOARD_ID,
    }),
    cannyListPosts: nao<Canny.ListPosts>({
      kind: 'canny.posts.list',
      'auth:apiKey': process.env.CANNY_API_KEY,
      'body:boardID': process.env.CANNY_BOARD_ID,
    }),
    chartMogulTrack: nao<ChartMogul.TrackLeadAndFreeTrial>({
      kind: 'chartmogul.tracking.user',
      'auth:Authorization': {
        username: process.env.CHARTMOGUL_API_KEY,
      },
      'body:data_source_uuid': process.env.CHARTMOGUL_DS_ID,
      'body:external_id': 'web3nao_1',
      'body:name': 'Adam Urban',
      'body:email': 'adam.urban@gmail.com',
      'body:country': 'DE',
      'body:lead_created_at': '2022-07-10 00:00:00',
      'body:free_trial_started_at': '2022-07-31 00:00:00',
    }),
    dynaPicturesGenerateImage: nao<DynaPictures.GenerateImage>({
      kind: 'dynapictures.core.imageGeneration',
      'auth:Authorization': process.env.DYNAPICTURES_API_KEY,
      'param:templateId': process.env.DYNAPICTURES_TEMPLATE_ID,
      'body:format': 'png',
      'body:metadata': 'metadata',
      'body:params': [
        {
          name: 'text',
          text: 'web3nao rockz!',
        },
      ],
    }),
    hybiscusBuildReport: nao<Hybiscus.BuildReport>({
      kind: 'hybiscus.core.buildReport',
      'auth:X-API-KEY': process.env.HYBISCUS_API_KEY,
      'body:options': {
        report_title: 'web3nao',
        report_byline: 'yay yay yay',
        version_number: 'v0.1.0',
      },
      'body:config': {
        colour_theme: 'forest',
        typography_theme: 'newspaper',
      },
      'body:components': [
        {
          type: 'Section',
          options: {
            section_title: 'Overviews and KPI metrics',
            highlighted: true,
            columns: 3,
          },
        },
      ],
    }),
    hybiscusGetReport: nao<Hybiscus.GetReport>({
      kind: 'hybiscus.core.getReport',
      'auth:X-API-KEY': process.env.HYBISCUS_API_KEY,
      'query:task_id': process.env.HYBISCUS_TASK_ID,
    }),
    bigDataCloudGeocode: nao<BigDataCloud.ReverseGeoCodeClient>({
      kind: 'bigdatacloud.free.reverseGeoCodeClient',
      'query:latitude': '37.421',
      'query:longitude': '-122.083',
    }),
    mailboxValidatorSingleEmailValidation:
      nao<MailboxValidator.SingleEmailValidation>({
        kind: 'mailboxvalidator.singleEmailValidation.singleEmailValidation',
        'auth:key': process.env.MAILBOXVALIDATOR_API_KEY,
        'query:email': 'adam.urban@gmail.com',
      }),
    microlinkUrl: nao<Microlink.Url>({
      kind: 'microlink.core.url',
      'query:url': 'https://diypunks.xyz',
    }),
    unavatarUsername: nao<Unavatar.FromUsernameEmailDomain>({
      kind: 'unavatar.core.fromUsernameEmailDomain',
      'param:usernameEmailDomain': 'urbanisierung',
      'query:json': true,
    }),
    unavatarProvider: nao<Unavatar.FromProvider>({
      kind: 'unavatar.core.fromProvider',
      'param:provider': 'duckduckgo',
      'param:input': 'diypunks.xyz',
      'query:json': true,
    }),
    newsApiEverything: nao<NewsApi.SearchEverything>({
      kind: 'newsapi.core.everything',
      'auth:X-Api-Key': process.env.NEWSAPI_API_KEY,
      'query:q': 'New+SaaS',
    }),
    ocrspaceUrl: nao<OCRSpace.ParseURL>({
      kind: 'ocrspace.core.url',
      'auth:apikey': process.env.OCRSPACE_API_KEY,
      'bodyform:url': 'http://dl.a9t9.com/blog/ocr-online/screenshot.jpg',
    }),
    pixelaCreateGraph: nao<Pixela.CreateGraph>({
      kind: 'pixela.graph.create',
      'auth:X-USER-TOKEN': process.env.PIXELA_TOKEN,
      'param:username': process.env.PIXELA_USERNAME,
      'body:id': 'first',
      'body:name': 'first',
      'body:color': 'kuro',
      'body:type': 'int',
      'body:unit': 'count',
    }),
    pixelaPostValue: nao<Pixela.PostValue>({
      kind: 'pixela.pixel.postValue',
      'auth:X-USER-TOKEN': process.env.PIXELA_TOKEN,
      'param:username': process.env.PIXELA_USERNAME,
      'param:graphId': 'first',
      'body:date': '20220812',
      'body:quantity': '5',
    }),
    shrtcodeShorten: nao<Shrtcode.Shorten>({
      kind: 'shrtcode.core.shorten',
      'query:url':
        'https://dev.to/urbanisierung/cut-a-few-braids-new-npm-package-1234',
    }),
    serpapiSearch: nao<SerpApi.Search>({
      kind: 'serpapi.core.search',
      'auth:api_key': process.env.SERPAPI_API_KEY,
      'query:engine': 'google',
      'query:q': 'diypunks',
    }),
    nasaApod: nao<Nasa.AstronomyPictureOfTheDay>({
      kind: 'nasa.planetary.apod',
      'auth:api_key': process.env.NASA_API_KEY,
    }),
    wordSimi: nao<WordSimi.MostSimilarWords>({
      kind: 'wordsimi.core.get',
      'param:word': 'automation',
      'query:count': 20,
    }),
    datocmsQuery: nao<DatoCMS.Query>({
      kind: 'datocms.graphql.query',
      'auth:Authorization': process.env.DATOCMS_API_KEY,
      'body:query': `{
        allBlogs {
          test
          createdAt
          id
        }
      }`,
    }),
    unsplashListPhotos: nao<Unsplash.ListPhotos>({
      kind: 'unsplash.photos.list',
      'auth:Authorization': process.env.UNSPLASH_ACCESS_KEY,
    }),
    unsplashSearchPhotos: nao<Unsplash.SearchPhotos>({
      kind: 'unsplash.search.photos',
      'auth:Authorization': process.env.UNSPLASH_ACCESS_KEY,
      'query:query': 'automation',
    }),
    posthogSendEvent: nao<PostHog.SendEvent>({
      kind: 'posthog.post.sendEvent',
      'auth:api_key': process.env.POSTHOG_API_KEY,
      'body:event': 'web3nao',
      'body:properties': {
        distinct_id: 'first',
        testkey: 'testvalue',
      },
    }),
    dopplerDownloadSecrets: nao<Doppler.DownloadSecrets>({
      kind: 'doppler.secrets.download',
      'auth:token': process.env.DOPPLER_SERVICE_TOKEN,
      'query:format': 'json',
    }),
    mojoauthSendMagicLink: nao<MojoAuth.SendMagicLink>({
      kind: 'mojoauth.auth.sendMagicLink',
      'auth:X-API-Key': process.env.MOJOAUTH_API_KEY,
      'body:email': 'adam.urban@gmail.com',
    }),
    ablyPublishMessage: nao<Ably.PublishMessage>({
      kind: 'ably.channels.publishMessage',
      'auth:Authorization': process.env.ABLY_API_KEY,
      'param:channelId': 'web3nao',
      'body:name': 'greeting',
      'body:data': 'hello',
    }),
    mixpanelImport: nao<Mixpanel.ImportEvents>({
      kind: 'mixpanel.events.import',
      baseId: 'api-eu',
      'auth:Authorization': {
        username: process.env.MIXPANEL_USER,
        password: process.env.MIXPANEL_SECRET,
      },
      'query:project_id': '2781461',
      'body:body': [
        {
          properties: {
            distinct_id: 'userId',
            time: Date.now(),
            $insert_id: 'test',
          },
          event: 'test',
        },
      ],
    }),
    graphJsonLog: nao<GraphJSON.Log>({
      kind: 'graphjson.core.logging',
      'auth:api_key': process.env.GRAPHJSON_API_KEY,
      'body:collection': 'web3nao',
      'body:timestamp': Math.floor(Date.now() / 1000),
      'body:json': JSON.stringify({
        price: 0.5,
        value: 'nice!',
        id: 'web3nao',
      }),
    }),
    tenderlySimulation: nao<Tenderly.ExecuteTransactionSimulation>({
      kind: 'tenderly.simulator.simulation',
      'auth:X-Access-Key': process.env.TENDERLY_API_KEY,
      'param:projectSlug': 'project',
      'body:from': '0x0000000000000000000000000000000000000000',
      'body:to': '0x0000000000000000000000000000000000000001',
      'body:gas_limit': '8000000',
      'body:gas_price': '0',
      'body:value': '10000000000',
      'body:input': '',
      'body:target': {
        network: {
          block_number: '15375377',
          id: '1',
          transaction_index: '97',
        },
      },
    }),
    openweathermapCurrent: nao<OpenWeatherMap.Current>({
      kind: 'openweathermap.core.current',
      'auth:appid': process.env.OPENWEATHERMAP_API_KEY,
      'query:lat': 52.52,
      'query:lon': 13.405,
    }),
    tmdbTrending: nao<TMDB.Trending>({
      kind: 'tmdb.core.trending',
      'auth:Authorization': process.env.TMDB_ACCESS_TOKEN,
      'param:mediaType': 'movie',
      'param:timeWindow': 'day',
    }),
    beehiivGetPublications: nao<Beehiiv.GetPublications>({
      kind: 'beehiiv.core.getPublications',
      'auth:X-ApiKey': process.env.BEEHIIV_API_KEY,
    }),
    bannerbearCreateImage: nao<BannerBear.CreateImage>({
      kind: 'bannerbear.images.create',
      'auth:Authorization': process.env.BANNERBEAR_API_KEY,
      'body:template': 'n1MJGd520ojPb7LaPV',
      'body:modifications': [
        {
          name: 'message',
          text: 'web3nao rockz!',
          color: null,
          background: null,
        },
        {
          name: 'face',
          image_url:
            'https://cdn.bannerbear.com/sample_images/welcome_bear_photo.jpg',
        },
      ],
    }),
    bannerbearListImages: nao<BannerBear.ListImages>({
      kind: 'bannerbear.images.list',
      'auth:Authorization': process.env.BANNERBEAR_API_KEY,
    }),
    lectoTranslateText: nao<Lecto.TranslateText>({
      kind: 'lecto.translate.text',
      'auth:X-API-Key': process.env.LECTO_API_KEY,
      'body:texts': ['Hello World!', 'Nice to meet you!'],
      'body:to': ['de', 'es'],
    }),
    lectoTranslateJson: nao<Lecto.TranslateJson>({
      kind: 'lecto.translate.json',
      'auth:X-API-Key': process.env.LECTO_API_KEY,
      'body:to': ['de', 'es'],
      'body:from': 'en',
      'body:json': JSON.stringify({
        hello: {
          world: 'Hello world!',
        },
        nice: {
          toMeetYou: 'Nice to meet you!',
        },
      }),
      'body:protected_keys': ['nice.toMeetYou'],
    }),
    algoliaInsightsEvent: nao<Algolia.PostEvents>({
      kind: 'algolia.insights.events',
      'auth:x-algolia-api-key': process.env.ALGOLIA_SEARCH_API_KEY,
      'auth:x-algolia-application-id': process.env.ALGOLIA_APP_ID,
      'body:events': [
        {
          eventName: 'first',
          eventType: 'view',
          index: 'web3nao',
          userToken: 'adam',
          objectIDs: ['9780545139700', '9780439784542'],
        },
      ],
    }),
    algoliaObjectsAddWithoutId: nao<Algolia.AddObjectWithoutId>({
      kind: 'algolia.objects.addWithoutId',
      'auth:x-algolia-api-key': process.env.ALGOLIA_ADMIN_API_KEY,
      'auth:x-algolia-application-id': process.env.ALGOLIA_APP_ID,
      'body:body': {
        name: 'first',
      },
      'param:indexName': 'web3nao',
      'subdomain:applicationId': process.env.ALGOLIA_APP_ID,
    }),
    algoliaObjectsAddWithId: nao<Algolia.AddObjectWithId>({
      kind: 'algolia.objects.addWithId',
      'auth:x-algolia-api-key': process.env.ALGOLIA_ADMIN_API_KEY,
      'auth:x-algolia-application-id': process.env.ALGOLIA_APP_ID,
      'body:body': {
        firstname: 'Adam',
        lastname: 'nice',
        company: 'web3nao',
      },
      'param:indexName': 'web3nao',
      'param:objectId': 'myId',
      'subdomain:applicationId': process.env.ALGOLIA_APP_ID,
    }),
    algoliaSearchQueryIndex: nao<Algolia.SearchQueryIndex>({
      kind: 'algolia.search.queryIndex',
      'auth:x-algolia-api-key': process.env.ALGOLIA_ADMIN_API_KEY,
      'auth:x-algolia-application-id': process.env.ALGOLIA_APP_ID,
      'body:params': 'query=Adam',
      'param:indexName': 'web3nao',
      'subdomain:applicationId': process.env.ALGOLIA_APP_ID,
    }),
    swapiGetEntities: nao<TheStarWarsApi.GetEntities>({
      kind: 'thestarwarsapi.core.getEntities',
      'param:entity': 'films',
    }),
    swapiGetEntity: nao<TheStarWarsApi.GetEntity>({
      kind: 'thestarwarsapi.core.getEntity',
      'param:entity': 'people',
      'param:id': 1,
    }),
    sidekickListLogpoints: nao<SideKick.ListLogpoints>({
      kind: 'sidekick.logpoint.list',
      'auth:ApiKey': process.env.SIDEKICK_API_KEY,
      'auth:Authorization': process.env.SIDEKICK_API_TOKEN,
    }),
    restZeebeStartInstance: nao<RestZeebe.StartInstance>({
      kind: 'restzeebe.core.start',
      'auth:Authorization': process.env.RESTZEEBE_API_KEY,
      'param:workspaceId': process.env.RESTZEEBE_WORKSPACE_ID,
      'param:clusterId': process.env.RESTZEEBE_CLUSTER_ID,
      'param:processId': process.env.RESTZEEBE_PROCESS_ID,
      'body:clientId': process.env.RESTZEEBE_CLIENT_ID,
      'body:clientSecret': process.env.RESTZEEBE_CLIENT_SECRET,
      'header:Content-Type': 'application/json',
      'body:variables': {
        data: {
          name: 'Adam',
        },
      },
    }),
    cloudflareListZones: nao<CloudFlare.ListZones>({
      kind: 'cloudflare.zones.list',
      'auth:Authorization': process.env.CLOUDFLARE_API_TOKEN,
    }),
    netlifyGetEnvVars: nao<Netlify.GetEnvironmentVariables>({
      kind: 'netlify.sites.getEnvironmentVariables',
      'auth:Authorization': process.env.NETLIFY_PAT,
      'param:accountId': 'adam-urban',
    }),
    netlifyListSites: nao<Netlify.ListSites>({
      kind: 'netlify.sites.listSites',
      'auth:Authorization': process.env.NETLIFY_PAT,
    }),
    easydbPut: nao<EasyDb.Put>({
      kind: 'easydb.core.put',
      'auth:token': process.env.EASYDB_TOKEN,
      'param:databaseId': process.env.EASYDB_UUID,
      'body:key': 'web3nao',
      'body:value': 'nice',
    }),
    easydbList: nao<EasyDb.List>({
      kind: 'easydb.core.list',
      'auth:token': process.env.EASYDB_TOKEN,
      'param:databaseId': process.env.EASYDB_UUID,
    }),
    restDbGet: nao<RestDB.GetItemsFromCollection>({
      kind: 'restdb.collections.get',
      'auth:x-apikey': process.env.RESTDB_API_KEY,
      'subdomain:databaseId': process.env.RESTDB_DBID,
      'param:collection': 'web3nao',
    }),
    clicksendSendEmail: nao<ClickSend.SendEmail>({
      kind: 'clicksend.email.send',
      'auth:Authorization': {
        username: process.env.CLICKSEND_USERNAME,
        password: process.env.CLICKSEND_API_KEY,
      },
      'body:body': {
        from: {
          email_address_id: 23143,
          name: 'Adam',
        },
        to: [
          {
            email: 'adam.urban@gmail.com',
            name: 'Adam',
          },
        ],
        subject: 'Hi!',
        body: 'web3nao is nice!',
      },
    }),
    renderListServices: nao<Render.ListServices>({
      kind: 'render.services.list',
      'auth:Authorization': process.env.RENDER_API_KEY,
    }),
    parsiqEvents: nao<Parsiq.GetEvents>({
      kind: 'parsiq.fundamentalData.events',
      'auth:Authorization': process.env.PARSIQ_API_KEY,
      'param:chainId': 'eip155-1',
      'query:block_number_start': 0,
      'query:block_number_end': 'latest',
      'query:conract': '0x362bc847A3a9637d3af6624EeC853618a43ed7D2',
      'query:limit': 1000,
      'query:topic_0': 'test',
    }),
    parsiqSingleBlock: nao<Parsiq.GetSingleBlock>({
      kind: 'parsiq.blocks.single',
      'auth:Authorization': process.env.PARSIQ_API_KEY,
      'param:chainId': 'eip155-80001',
      'param:blockHash':
        '0xe4f060e269a1266dddf02f2ec1d3e60579b5241f9adb5fddd31e5aa7ef647914',
    }),
  }
  const requestConfig = requestConfigs.parsiqSingleBlock

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
