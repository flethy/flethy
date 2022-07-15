import { ApiDescription } from '../types/ApiDescription.type'
import { Airtable } from '../configs/airtable.config'
import { Alchemy } from '../configs/alchemy.config'
import { ApicAgent } from '../configs/apicagent.config'
import { Auth0 } from '../configs/auth0.config'
import { BrowsersFyi } from '../configs/browsersfyi.config'
import { Camunda } from '../configs/camunda.config'
import { Clearbit } from '../configs/clearbit.config'
import { CoinCap } from '../configs/coincap.config'
import { CoinGecko } from '../configs/coingecko.config'
import { Coinlayer } from '../configs/coinlayer.config'
import { CoinMarketCap } from '../configs/coinmarketcap.config'
import { ContentFul } from '../configs/contentful.config'
import { CountApi } from '../configs/countapi.config'
import { Courier } from '../configs/courier.config'
import { Covalent } from '../configs/covalent.config'
import { Disify } from '../configs/disify.config'
import { Etherscan } from '../configs/etherscan.config'
import { Frankfurter } from '../configs/frankfurter.config'
import { Github } from '../configs/github.config'
import { Hubspot } from '../configs/hubspot.config'
import { MailCheckAi } from '../configs/mailcheckai.config'
import { MailerSend } from '../configs/mailersend.config'
import { Mergent } from '../configs/mergent.config'
import { MicroDev } from '../configs/microdev.config'
import { Mixpanel } from '../configs/mixpanel.config'
import { NewRelic } from '../configs/newrelic.config'
import { Notion } from '../configs/notion.config'
import { OneInch } from '../configs/oneinch.config'
import { OpenLibrary } from '../configs/openlibrary.config'
import { OpenSea } from '../configs/opensea.config'
import { Pinata } from '../configs/pinata.config'
import { PurgoMalum } from '../configs/purgomalum.config'
import { RedisCloud } from '../configs/rediscloud.config'
import { SerpStack } from '../configs/serpstack.config'
import { Slack } from '../configs/slack.config'
import { Statically } from '../configs/statically.config'
import { Supabase } from '../configs/supabase.config'
import { TheGraph } from '../configs/thegraph.config'
import { Trello } from '../configs/trello.config'
import { Web3Storage } from '../configs/web3storage.config'
import { ZeroX } from '../configs/zerox.config'
import { Zora } from '../configs/zora.config'

export const CONFIGS: Map<string, ApiDescription<any, any>> = new Map<string, ApiDescription<any, any>>([
['airtable', Airtable.API],
['alchemy', Alchemy.API],
['apicagent', ApicAgent.API],
['auth0', Auth0.API],
['browsersfyi', BrowsersFyi.API],
['camunda', Camunda.API],
['clearbit', Clearbit.API],
['coincap', CoinCap.API],
['coingecko', CoinGecko.API],
['coinlayer', Coinlayer.API],
['coinmarketcap', CoinMarketCap.API],
['contentful', ContentFul.API],
['countapi', CountApi.API],
['courier', Courier.API],
['covalent', Covalent.API],
['disify', Disify.API],
['etherscan', Etherscan.API],
['frankfurter', Frankfurter.API],
['github', Github.API],
['hubspot', Hubspot.API],
['mailcheckai', MailCheckAi.API],
['mailersend', MailerSend.API],
['mergent', Mergent.API],
['microdev', MicroDev.API],
['mixpanel', Mixpanel.API],
['newrelic', NewRelic.API],
['notion', Notion.API],
['1inch', OneInch.API],
['openlibrary', OpenLibrary.API],
['opensea', OpenSea.API],
['pinata', Pinata.API],
['purgomalum', PurgoMalum.API],
['rediscloud', RedisCloud.API],
['serpstack', SerpStack.API],
['slack', Slack.API],
['statically', Statically.API],
['supabase', Supabase.API],
['thegraph', TheGraph.API],
['trello', Trello.API],
['web3storage', Web3Storage.API],
['0x', ZeroX.API],
['zora', Zora.API],
])