import { getType, Type } from 'tst-reflect'
import { Airtable } from '../../../http-configs/src/configs/airtable.config'
import { Alchemy } from '../../../http-configs/src/configs/alchemy.config'
import { Camunda } from '../../../http-configs/src/configs/camunda.config'
import { CoinCap } from '../../../http-configs/src/configs/coincap.config'
import { CoinGecko } from '../../../http-configs/src/configs/coingecko.config'
import { Coinlayer } from '../../../http-configs/src/configs/coinlayer.config'
import { CoinMarketCap } from '../../../http-configs/src/configs/coinmarketcap.config'
import { Covalent } from '../../../http-configs/src/configs/covalent.config'
import { Disify } from '../../../http-configs/src/configs/disify.config'
import { Etherscan } from '../../../http-configs/src/configs/etherscan.config'
import { Github } from '../../../http-configs/src/configs/github.config'
import { Hubspot } from '../../../http-configs/src/configs/hubspot.config'
import { MailCheckAi } from '../../../http-configs/src/configs/mailcheckai.config'
import { MailerSend } from '../../../http-configs/src/configs/mailersend.config'
import { Mergent } from '../../../http-configs/src/configs/mergent.config'
import { Mixpanel } from '../../../http-configs/src/configs/mixpanel.config'
import { Notion } from '../../../http-configs/src/configs/notion.config'
import { OneInch } from '../../../http-configs/src/configs/oneinch.config'
import { OpenSea } from '../../../http-configs/src/configs/opensea.config'
import { Pinata } from '../../../http-configs/src/configs/pinata.config'
import { Slack } from '../../../http-configs/src/configs/slack.config'
import { TheGraph } from '../../../http-configs/src/configs/thegraph.config'
import { Web3Storage } from '../../../http-configs/src/configs/web3storage.config'
import { ZeroX } from '../../../http-configs/src/configs/zerox.config'
export const configTypes: Array<{type: Type; name: string}> = []
configTypes.push({type: getType<Airtable.ListTableRecords>(), name: 'Airtable'})
configTypes.push({type: getType<Airtable.CreateTableRecords>(), name: 'Airtable'})
configTypes.push({type: getType<Alchemy.NftGetNFTs>(), name: 'Alchemy'})
configTypes.push({type: getType<Camunda.ConsoleToken>(), name: 'Camunda'})
configTypes.push({type: getType<Camunda.ConsoleGetClusters>(), name: 'Camunda'})
configTypes.push({type: getType<Camunda.ConsoleGetClustersParameters>(), name: 'Camunda'})
configTypes.push({type: getType<Camunda.ConsoleDeleteCluster>(), name: 'Camunda'})
configTypes.push({type: getType<Camunda.ConsoleCreateCluster>(), name: 'Camunda'})
configTypes.push({type: getType<Camunda.ConsoleGetClients>(), name: 'Camunda'})
configTypes.push({type: getType<Camunda.ConsoleCreateClient>(), name: 'Camunda'})
configTypes.push({type: getType<Camunda.ConsoleGetClient>(), name: 'Camunda'})
configTypes.push({type: getType<Camunda.ConsoleDeleteClient>(), name: 'Camunda'})
configTypes.push({type: getType<CoinCap.getAssets>(), name: 'CoinCap'})
configTypes.push({type: getType<CoinCap.getAsset>(), name: 'CoinCap'})
configTypes.push({type: getType<CoinCap.getAssetHistory>(), name: 'CoinCap'})
configTypes.push({type: getType<CoinCap.getAssetMarkets>(), name: 'CoinCap'})
configTypes.push({type: getType<CoinGecko.ListCoins>(), name: 'CoinGecko'})
configTypes.push({type: getType<CoinGecko.CoinsMarkets>(), name: 'CoinGecko'})
configTypes.push({type: getType<CoinGecko.CoinById>(), name: 'CoinGecko'})
configTypes.push({type: getType<CoinGecko.CoinTickersById>(), name: 'CoinGecko'})
configTypes.push({type: getType<CoinGecko.CoinHistoryById>(), name: 'CoinGecko'})
configTypes.push({type: getType<CoinGecko.GetSimpleSupportedVsCurrencies>(), name: 'CoinGecko'})
configTypes.push({type: getType<CoinGecko.GetSimplePrice>(), name: 'CoinGecko'})
configTypes.push({type: getType<CoinGecko.GetSimpleTokenPrice>(), name: 'CoinGecko'})
configTypes.push({type: getType<Coinlayer.GetLive>(), name: 'Coinlayer'})
configTypes.push({type: getType<Coinlayer.GetList>(), name: 'Coinlayer'})
configTypes.push({type: getType<Coinlayer.GetHistorical>(), name: 'Coinlayer'})
configTypes.push({type: getType<CoinMarketCap.CryptocurrencyListingsHistorical>(), name: 'CoinMarketCap'})
configTypes.push({type: getType<CoinMarketCap.CryptocurrencyListingsLatest>(), name: 'CoinMarketCap'})
configTypes.push({type: getType<Covalent.ClassAGetTransactionsForAddress>(), name: 'Covalent'})
configTypes.push({type: getType<Covalent.ClassBGetUniswapV3Pools>(), name: 'Covalent'})
configTypes.push({type: getType<Covalent.PricingGetHistoricalTokenPrices>(), name: 'Covalent'})
configTypes.push({type: getType<Disify.CheckSingleDomain>(), name: 'Disify'})
configTypes.push({type: getType<Disify.CheckMassDomain>(), name: 'Disify'})
configTypes.push({type: getType<Disify.CheckSingleEmail>(), name: 'Disify'})
configTypes.push({type: getType<Disify.CheckMassEmail>(), name: 'Disify'})
configTypes.push({type: getType<Etherscan.AccountsBalanceSingleAddress>(), name: 'Etherscan'})
configTypes.push({type: getType<Github.ListRepositoryIssues>(), name: 'Github'})
configTypes.push({type: getType<Hubspot.OAuthToken>(), name: 'Hubspot'})
configTypes.push({type: getType<Hubspot.FormsSubmit>(), name: 'Hubspot'})
configTypes.push({type: getType<Hubspot.ContactsCreateOrUpdate>(), name: 'Hubspot'})
configTypes.push({type: getType<MailCheckAi.CheckDomain>(), name: 'MailCheckAi'})
configTypes.push({type: getType<MailCheckAi.CheckEmail>(), name: 'MailCheckAi'})
configTypes.push({type: getType<MailerSend.EmailSend>(), name: 'MailerSend'})
configTypes.push({type: getType<Mergent.CreateTask>(), name: 'Mergent'})
configTypes.push({type: getType<Mixpanel.TrackEvents>(), name: 'Mixpanel'})
configTypes.push({type: getType<Notion.CreateDatabase>(), name: 'Notion'})
configTypes.push({type: getType<OneInch.AggregationInfoTokens>(), name: 'OneInch'})
configTypes.push({type: getType<OneInch.AggregationQuote>(), name: 'OneInch'})
configTypes.push({type: getType<OneInch.AggregationSwap>(), name: 'OneInch'})
configTypes.push({type: getType<OpenSea.GetAssets>(), name: 'OpenSea'})
configTypes.push({type: getType<OpenSea.GetCollections>(), name: 'OpenSea'})
configTypes.push({type: getType<Pinata.PinningPinJsonToIPFS>(), name: 'Pinata'})
configTypes.push({type: getType<Slack.IncomingWebhooksMessage>(), name: 'Slack'})
configTypes.push({type: getType<TheGraph.QueryById>(), name: 'TheGraph'})
configTypes.push({type: getType<TheGraph.QueryByName>(), name: 'TheGraph'})
configTypes.push({type: getType<Web3Storage.UploadContent>(), name: 'Web3Storage'})
configTypes.push({type: getType<ZeroX.SwapQuote>(), name: 'ZeroX'})
configTypes.push({type: getType<ZeroX.SwapPrice>(), name: 'ZeroX'})
configTypes.push({type: getType<ZeroX.SwapSources>(), name: 'ZeroX'})