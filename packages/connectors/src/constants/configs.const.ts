import { ApiDescription } from '../types/ApiDescription.type'
import { Ably } from '../configs/ably.config'
import { AbstractApi } from '../configs/abstractapi.config'
import { Airtable } from '../configs/airtable.config'
import { Alchemy } from '../configs/alchemy.config'
import { Algolia } from '../configs/algolia.config'
import { ApicAgent } from '../configs/apicagent.config'
import { APIFlash } from '../configs/apiflash.config'
import { Apify } from '../configs/apify.config'
import { APITemplateIo } from '../configs/apitemplateio.config'
import { Auth0 } from '../configs/auth0.config'
import { BambooHR } from '../configs/bamboohr.config'
import { BannerBear } from '../configs/bannerbear.config'
import { BaseRow } from '../configs/baserow.config'
import { Beehiiv } from '../configs/beehiiv.config'
import { BigDataCloud } from '../configs/bigdatacloud.config'
import { Bitly } from '../configs/bitly.config'
import { Brandfetch } from '../configs/brandfetch.config'
import { BrowsersFyi } from '../configs/browsersfyi.config'
import { Bruzu } from '../configs/bruzu.config'
import { CalCom } from '../configs/calcom.config'
import { Calendarific } from '../configs/calendarific.config'
import { Camunda } from '../configs/camunda.config'
import { Canny } from '../configs/canny.config'
import { Chargebee } from '../configs/chargebee.config'
import { ChartMogul } from '../configs/chartmogul.config'
import { Carifai } from '../configs/clarifai.config'
import { Clearbit } from '../configs/clearbit.config'
import { ClickSend } from '../configs/clicksend.config'
import { ClickUp } from '../configs/clickup.config'
import { Clockify } from '../configs/clockify.config'
import { CloudFlare } from '../configs/cloudflare.config'
import { CoinCap } from '../configs/coincap.config'
import { CoinGecko } from '../configs/coingecko.config'
import { Coinlayer } from '../configs/coinlayer.config'
import { CoinMarketCap } from '../configs/coinmarketcap.config'
import { ConfigCat } from '../configs/configcat.config'
import { CongressGov } from '../configs/congressgov.config'
import { ContentFul } from '../configs/contentful.config'
import { ConvertKit } from '../configs/convertkit.config'
import { CountApi } from '../configs/countapi.config'
import { Courier } from '../configs/courier.config'
import { Covalent } from '../configs/covalent.config'
import { Cronhooks } from '../configs/cronhooks.config'
import { CurrencyScoop } from '../configs/currencyscoop.config'
import { DatoCMS } from '../configs/datocms.config'
import { DeepL } from '../configs/deepl.config'
import { DevCycle } from '../configs/devcycle.config'
import { DevTo } from '../configs/devto.config'
import { Dhl } from '../configs/dhl.config'
import { Directus } from '../configs/directus.config'
import { Disify } from '../configs/disify.config'
import { Doppler } from '../configs/doppler.config'
import { DynaPictures } from '../configs/dynapictures.config'
import { EasyDb } from '../configs/easydb.config'
import { EmailOctopus } from '../configs/emailoctopus.config'
import { Etherscan } from '../configs/etherscan.config'
import { Eventbrite } from '../configs/eventbrite.config'
import { Fauna } from '../configs/fauna.config'
import { Frankfurter } from '../configs/frankfurter.config'
import { Geekflare } from '../configs/geekflare.config'
import { Github } from '../configs/github.config'
import { GrafBase } from '../configs/grafbase.config'
import { GraphJSON } from '../configs/graphjson.config'
import { Grist } from '../configs/grist.config'
import { HackerNews } from '../configs/hackernews.config'
import { Harvest } from '../configs/harvest.config'
import { Hashnode } from '../configs/hashnode.config'
import { HelloSign } from '../configs/hellosign.config'
import { HostIo } from '../configs/hostio.config'
import { Hubspot } from '../configs/hubspot.config'
import { HunterIo } from '../configs/hunterio.config'
import { Hybiscus } from '../configs/hybiscus.config'
import { Hygraph } from '../configs/hygraph.config'
import { Jira } from '../configs/jira.config'
import { Klaviyo } from '../configs/klaviyo.config'
import { Lecto } from '../configs/lecto.config'
import { Linear } from '../configs/linear.config'
import { LinkedIn } from '../configs/linkedin.config'
import { Lokalise } from '../configs/lokalise.config'
import { MailboxValidator } from '../configs/mailboxvalidator.config'
import { MailCheckAi } from '../configs/mailcheckai.config'
import { MailerSend } from '../configs/mailersend.config'
import { MailJet } from '../configs/mailjet.config'
import { MailPace } from '../configs/mailpace.config'
import { Medium } from '../configs/medium.config'
import { Mergent } from '../configs/mergent.config'
import { Mezmo } from '../configs/mezmo.config'
import { MicroDev } from '../configs/microdev.config'
import { Microlink } from '../configs/microlink.config'
import { Mixpanel } from '../configs/mixpanel.config'
import { MojoAuth } from '../configs/mojoauth.config'
import { Nasa } from '../configs/nasa.config'
import { Netlify } from '../configs/netlify.config'
import { NewRelic } from '../configs/newrelic.config'
import { NewsApi } from '../configs/newsapi.config'
import { Notion } from '../configs/notion.config'
import { OCRSpace } from '../configs/ocrspace.config'
import { OneInch } from '../configs/oneinch.config'
import { OpenLibrary } from '../configs/openlibrary.config'
import { OpenSea } from '../configs/opensea.config'
import { OpenWeatherMap } from '../configs/openweathermap.config'
import { Ortto } from '../configs/ortto.config'
import { Ory } from '../configs/ory.config'
import { Parsiq } from '../configs/parsiq.config'
import { PayPal } from '../configs/paypal.config'
import { Peekalink } from '../configs/peekalink.config'
import { Personio } from '../configs/personio.config'
import { Pinata } from '../configs/pinata.config'
import { Pixela } from '../configs/pixela.config'
import { PostHog } from '../configs/posthog.config'
import { ProductHunt } from '../configs/producthunt.config'
import { PurgoMalum } from '../configs/purgomalum.config'
import { QuickChart } from '../configs/quickchart.config'
import { RapidApi } from '../configs/rapidapi.config'
import { RedisCloud } from '../configs/rediscloud.config'
import { RemoteOk } from '../configs/remoteok.config'
import { RemoveBg } from '../configs/removebg.config'
import { Render } from '../configs/render.config'
import { RestCountries } from '../configs/restcountries.config'
import { RestDB } from '../configs/restdb.config'
import { RestZeebe } from '../configs/restzeebe.config'
import { SendGrid } from '../configs/sendgrid.config'
import { Sentry } from '../configs/sentry.config'
import { SerpApi } from '../configs/serpapi.config'
import { SerpStack } from '../configs/serpstack.config'
import { Shortcut } from '../configs/shortcut.config'
import { Shrtcode } from '../configs/shrtcode.config'
import { SideKick } from '../configs/sidekick.config'
import { Slack } from '../configs/slack.config'
import { Stackby } from '../configs/stackby.config'
import { Statically } from '../configs/statically.config'
import { Supabase } from '../configs/supabase.config'
import { Tenderly } from '../configs/tenderly.config'
import { TheGraph } from '../configs/thegraph.config'
import { TheStarWarsApi } from '../configs/thestarwarsapi.config'
import { Tinify } from '../configs/tinify.config'
import { TMDB } from '../configs/tmdb.config'
import { Trello } from '../configs/trello.config'
import { Tribe } from '../configs/tribe.config'
import { Twilio } from '../configs/twilio.config'
import { Typeform } from '../configs/typeform.config'
import { Unavatar } from '../configs/unavatar.config'
import { Unlayer } from '../configs/unlayer.config'
import { Unsplash } from '../configs/unsplash.config'
import { Up42 } from '../configs/up42.config'
import { UptimeRobot } from '../configs/uptimerobot.config'
import { UrlScan } from '../configs/urlscan.config'
import { UsePlunk } from '../configs/useplunk.config'
import { Web3Storage } from '../configs/web3storage.config'
import { WhoIsXMLApi } from '../configs/whoisxmlapi.config'
import { WordSimi } from '../configs/wordsimi.config'
import { YahooFinance } from '../configs/yahoofinance.config'
import { ZeroX } from '../configs/zerox.config'
import { Zora } from '../configs/zora.config'

export const CONFIGS: Map<string, ApiDescription<any, any>> = new Map<string, ApiDescription<any, any>>([
['ably', Ably.API],
['abstractapi', AbstractApi.API],
['airtable', Airtable.API],
['alchemy', Alchemy.API],
['algolia', Algolia.API],
['apicagent', ApicAgent.API],
['apiflash', APIFlash.API],
['apify', Apify.API],
['apitemplateio', APITemplateIo.API],
['auth0', Auth0.API],
['bamboohr', BambooHR.API],
['bannerbear', BannerBear.API],
['baserow', BaseRow.API],
['beehiiv', Beehiiv.API],
['bigdatacloud', BigDataCloud.API],
['bitly', Bitly.API],
['brandfetch', Brandfetch.API],
['browsersfyi', BrowsersFyi.API],
['bruzu', Bruzu.API],
['calcom', CalCom.API],
['calendarific', Calendarific.API],
['camunda', Camunda.API],
['canny', Canny.API],
['chargebee', Chargebee.API],
['chartmogul', ChartMogul.API],
['clarifai', Carifai.API],
['clearbit', Clearbit.API],
['clicksend', ClickSend.API],
['clickup', ClickUp.API],
['clockify', Clockify.API],
['cloudflare', CloudFlare.API],
['coincap', CoinCap.API],
['coingecko', CoinGecko.API],
['coinlayer', Coinlayer.API],
['coinmarketcap', CoinMarketCap.API],
['configcat', ConfigCat.API],
['congressgov', CongressGov.API],
['contentful', ContentFul.API],
['convertkit', ConvertKit.API],
['countapi', CountApi.API],
['courier', Courier.API],
['covalent', Covalent.API],
['cronhooks', Cronhooks.API],
['currencyscoop', CurrencyScoop.API],
['datocms', DatoCMS.API],
['deepl', DeepL.API],
['devcycle', DevCycle.API],
['devto', DevTo.API],
['dhl', Dhl.API],
['directus', Directus.API],
['disify', Disify.API],
['doppler', Doppler.API],
['dynapictures', DynaPictures.API],
['easydb', EasyDb.API],
['emailoctopus', EmailOctopus.API],
['etherscan', Etherscan.API],
['eventbrite', Eventbrite.API],
['fauna', Fauna.API],
['frankfurter', Frankfurter.API],
['geekflare', Geekflare.API],
['github', Github.API],
['grafbase', GrafBase.API],
['graphjson', GraphJSON.API],
['grist', Grist.API],
['hackernews', HackerNews.API],
['harvest', Harvest.API],
['hashnode', Hashnode.API],
['hellosign', HelloSign.API],
['hostio', HostIo.API],
['hubspot', Hubspot.API],
['hunterio', HunterIo.API],
['hybiscus', Hybiscus.API],
['hygraph', Hygraph.API],
['jira', Jira.API],
['klaviyo', Klaviyo.API],
['lecto', Lecto.API],
['linear', Linear.API],
['linkedin', LinkedIn.API],
['lokalise', Lokalise.API],
['mailboxvalidator', MailboxValidator.API],
['mailcheckai', MailCheckAi.API],
['mailersend', MailerSend.API],
['mailjet', MailJet.API],
['mailpace', MailPace.API],
['medium', Medium.API],
['mergent', Mergent.API],
['mezmo', Mezmo.API],
['microdev', MicroDev.API],
['microlink', Microlink.API],
['mixpanel', Mixpanel.API],
['mojoauth', MojoAuth.API],
['nasa', Nasa.API],
['netlify', Netlify.API],
['newrelic', NewRelic.API],
['newsapi', NewsApi.API],
['notion', Notion.API],
['ocrspace', OCRSpace.API],
['1inch', OneInch.API],
['openlibrary', OpenLibrary.API],
['opensea', OpenSea.API],
['openweathermap', OpenWeatherMap.API],
['ortto', Ortto.API],
['ory', Ory.API],
['parsiq', Parsiq.API],
['paypal', PayPal.API],
['peekalink', Peekalink.API],
['personio', Personio.API],
['pinata', Pinata.API],
['pixela', Pixela.API],
['posthog', PostHog.API],
['producthunt', ProductHunt.API],
['purgomalum', PurgoMalum.API],
['quickchart', QuickChart.API],
['rapidapi', RapidApi.API],
['rediscloud', RedisCloud.API],
['remoteok', RemoteOk.API],
['removebg', RemoveBg.API],
['render', Render.API],
['restcountries', RestCountries.API],
['restdb', RestDB.API],
['restzeebe', RestZeebe.API],
['sendgrid', SendGrid.API],
['sentry', Sentry.API],
['serpapi', SerpApi.API],
['serpstack', SerpStack.API],
['shortcut', Shortcut.API],
['shrtcode', Shrtcode.API],
['sidekick', SideKick.API],
['slack', Slack.API],
['stackby', Stackby.API],
['statically', Statically.API],
['supabase', Supabase.API],
['tenderly', Tenderly.API],
['thegraph', TheGraph.API],
['thestarwarsapi', TheStarWarsApi.API],
['tinify', Tinify.API],
['tmdb', TMDB.API],
['trello', Trello.API],
['tribe', Tribe.API],
['twilio', Twilio.API],
['typeform', Typeform.API],
['unavatar', Unavatar.API],
['unlayer', Unlayer.API],
['unsplash', Unsplash.API],
['up42', Up42.API],
['uptimerobot', UptimeRobot.API],
['urlscan', UrlScan.API],
['useplunk', UsePlunk.API],
['web3storage', Web3Storage.API],
['whoisxmlapi', WhoIsXMLApi.API],
['wordsimi', WordSimi.API],
['yahoofinance', YahooFinance.API],
['0x', ZeroX.API],
['zora', Zora.API],
])