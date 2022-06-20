import { ApiDescription } from '../types/ApiDescription.type'
import { Airtable } from '../configs/airtable.config'
import { Alchemy } from '../configs/alchemy.config'
import { Camunda } from '../configs/camunda.config'
import { Clearbit } from '../configs/clearbit.config'
import { CoinCap } from '../configs/coincap.config'
import { CoinGecko } from '../configs/coingecko.config'
import { Coinlayer } from '../configs/coinlayer.config'
import { CoinMarketCap } from '../configs/coinmarketcap.config'
import { Covalent } from '../configs/covalent.config'
import { Disify } from '../configs/disify.config'
import { Etherscan } from '../configs/etherscan.config'
import { Frankfurter } from '../configs/frankfurter.config'
import { Github } from '../configs/github.config'
import { Hubspot } from '../configs/hubspot.config'
import { MailCheckAi } from '../configs/mailcheckai.config'
import { MailerSend } from '../configs/mailersend.config'
import { Mergent } from '../configs/mergent.config'
import { Mixpanel } from '../configs/mixpanel.config'
import { Notion } from '../configs/notion.config'
import { OneInch } from '../configs/oneinch.config'
import { OpenLibrary } from '../configs/openlibrary.config'
import { OpenSea } from '../configs/opensea.config'
import { Pinata } from '../configs/pinata.config'
import { Slack } from '../configs/slack.config'
import { TheGraph } from '../configs/thegraph.config'
import { Trello } from '../configs/trello.config'
import { Web3Storage } from '../configs/web3storage.config'
import { ZeroX } from '../configs/zerox.config'

export const CONFIGS: Map<string, ApiDescription<any, any>> = new Map<string, ApiDescription<any, any>>([
['airtable', Airtable.API],
['alchemy', Alchemy.API],
['camunda', Camunda.API],
['clearbit', Clearbit.API],
['coincap', CoinCap.API],
['coingecko', CoinGecko.API],
['coinlayer', Coinlayer.API],
['coinmarketcap', CoinMarketCap.API],
['covalent', Covalent.API],
['disify', Disify.API],
['etherscan', Etherscan.API],
['frankfurter', Frankfurter.API],
['github', Github.API],
['hubspot', Hubspot.API],
['mailcheckai', MailCheckAi.API],
['mailersend', MailerSend.API],
['mergent', Mergent.API],
['mixpanel', Mixpanel.API],
['notion', Notion.API],
['1inch', OneInch.API],
['openlibrary', OpenLibrary.API],
['opensea', OpenSea.API],
['pinata', Pinata.API],
['slack', Slack.API],
['thegraph', TheGraph.API],
['trello', Trello.API],
['web3storage', Web3Storage.API],
['0x', ZeroX.API],
])