import { getType, Type } from 'tst-reflect'
import { Ably } from '../../../connectors/src/configs/ably.config'
import { AbstractApi } from '../../../connectors/src/configs/abstractapi.config'
import { Airtable } from '../../../connectors/src/configs/airtable.config'
import { Alchemy } from '../../../connectors/src/configs/alchemy.config'
import { Algolia } from '../../../connectors/src/configs/algolia.config'
import { ApicAgent } from '../../../connectors/src/configs/apicagent.config'
import { APIFlash } from '../../../connectors/src/configs/apiflash.config'
import { Apify } from '../../../connectors/src/configs/apify.config'
import { APIPoint } from '../../../connectors/src/configs/apipoint.config'
import { APITemplateIo } from '../../../connectors/src/configs/apitemplateio.config'
import { AssemblyAI } from '../../../connectors/src/configs/assemblyai.config'
import { Auth0 } from '../../../connectors/src/configs/auth0.config'
import { Ayrshare } from '../../../connectors/src/configs/ayrshare.config'
import { BambooHR } from '../../../connectors/src/configs/bamboohr.config'
import { BannerBear } from '../../../connectors/src/configs/bannerbear.config'
import { BaseRow } from '../../../connectors/src/configs/baserow.config'
import { Beehiiv } from '../../../connectors/src/configs/beehiiv.config'
import { BigDataCloud } from '../../../connectors/src/configs/bigdatacloud.config'
import { Bitly } from '../../../connectors/src/configs/bitly.config'
import { BooAPI } from '../../../connectors/src/configs/booapi.config'
import { Brandfetch } from '../../../connectors/src/configs/brandfetch.config'
import { BrowsersFyi } from '../../../connectors/src/configs/browsersfyi.config'
import { Bruzu } from '../../../connectors/src/configs/bruzu.config'
import { ButtondownEmail } from '../../../connectors/src/configs/buttondownemail.config'
import { CalCom } from '../../../connectors/src/configs/calcom.config'
import { Calendarific } from '../../../connectors/src/configs/calendarific.config'
import { Camunda } from '../../../connectors/src/configs/camunda.config'
import { Canny } from '../../../connectors/src/configs/canny.config'
import { CarbEngage } from '../../../connectors/src/configs/carbengage.config'
import { Chargebee } from '../../../connectors/src/configs/chargebee.config'
import { ChartMogul } from '../../../connectors/src/configs/chartmogul.config'
import { Carifai } from '../../../connectors/src/configs/clarifai.config'
import { Clearbit } from '../../../connectors/src/configs/clearbit.config'
import { ClickSend } from '../../../connectors/src/configs/clicksend.config'
import { ClickUp } from '../../../connectors/src/configs/clickup.config'
import { Clockify } from '../../../connectors/src/configs/clockify.config'
import { CloudFlare } from '../../../connectors/src/configs/cloudflare.config'
import { Codat } from '../../../connectors/src/configs/codat.config'
import { CodeDetection } from '../../../connectors/src/configs/codedetection.config'
import { CoinCap } from '../../../connectors/src/configs/coincap.config'
import { CoinGecko } from '../../../connectors/src/configs/coingecko.config'
import { Coinlayer } from '../../../connectors/src/configs/coinlayer.config'
import { CoinMarketCap } from '../../../connectors/src/configs/coinmarketcap.config'
import { ConfigCat } from '../../../connectors/src/configs/configcat.config'
import { CongressGov } from '../../../connectors/src/configs/congressgov.config'
import { ContentFul } from '../../../connectors/src/configs/contentful.config'
import { ConvertKit } from '../../../connectors/src/configs/convertkit.config'
import { CountApi } from '../../../connectors/src/configs/countapi.config'
import { Courier } from '../../../connectors/src/configs/courier.config'
import { Covalent } from '../../../connectors/src/configs/covalent.config'
import { Cronhooks } from '../../../connectors/src/configs/cronhooks.config'
import { Cumul } from '../../../connectors/src/configs/cumul.config'
import { CurrencyScoop } from '../../../connectors/src/configs/currencyscoop.config'
import { Dataddo } from '../../../connectors/src/configs/dataddo.config'
import { DataDog } from '../../../connectors/src/configs/datadog.config'
import { DatoCMS } from '../../../connectors/src/configs/datocms.config'
import { Deepgram } from '../../../connectors/src/configs/deepgram.config'
import { DeepL } from '../../../connectors/src/configs/deepl.config'
import { DevCycle } from '../../../connectors/src/configs/devcycle.config'
import { DevTo } from '../../../connectors/src/configs/devto.config'
import { Dhl } from '../../../connectors/src/configs/dhl.config'
import { Directus } from '../../../connectors/src/configs/directus.config'
import { Disify } from '../../../connectors/src/configs/disify.config'
import { Doppler } from '../../../connectors/src/configs/doppler.config'
import { DynaPictures } from '../../../connectors/src/configs/dynapictures.config'
import { EasyDb } from '../../../connectors/src/configs/easydb.config'
import { EmailOctopus } from '../../../connectors/src/configs/emailoctopus.config'
import { Etherscan } from '../../../connectors/src/configs/etherscan.config'
import { Eventbrite } from '../../../connectors/src/configs/eventbrite.config'
import { Fauna } from '../../../connectors/src/configs/fauna.config'
import { Festdays } from '../../../connectors/src/configs/festdays.config'
import { Fibery } from '../../../connectors/src/configs/fibery.config'
import { Figma } from '../../../connectors/src/configs/figma.config'
import { Flatfile } from '../../../connectors/src/configs/flatfile.config'
import { Frankfurter } from '../../../connectors/src/configs/frankfurter.config'
import { Geekflare } from '../../../connectors/src/configs/geekflare.config'
import { Github } from '../../../connectors/src/configs/github.config'
import { GitLab } from '../../../connectors/src/configs/gitlab.config'
import { GrafBase } from '../../../connectors/src/configs/grafbase.config'
import { GraphJSON } from '../../../connectors/src/configs/graphjson.config'
import { Grist } from '../../../connectors/src/configs/grist.config'
import { HackerNews } from '../../../connectors/src/configs/hackernews.config'
import { Harvest } from '../../../connectors/src/configs/harvest.config'
import { Hashnode } from '../../../connectors/src/configs/hashnode.config'
import { HeapAnalytics } from '../../../connectors/src/configs/heapanalytics.config'
import { HelloSign } from '../../../connectors/src/configs/hellosign.config'
import { Here } from '../../../connectors/src/configs/here.config'
import { HostIo } from '../../../connectors/src/configs/hostio.config'
import { Hubspot } from '../../../connectors/src/configs/hubspot.config'
import { HunterIo } from '../../../connectors/src/configs/hunterio.config'
import { Hybiscus } from '../../../connectors/src/configs/hybiscus.config'
import { Hygraph } from '../../../connectors/src/configs/hygraph.config'
import { Imglab } from '../../../connectors/src/configs/imglab.config'
import { IncidentIo } from '../../../connectors/src/configs/incidentio.config'
import { Jira } from '../../../connectors/src/configs/jira.config'
import { Keen } from '../../../connectors/src/configs/keen.config'
import { Klaviyo } from '../../../connectors/src/configs/klaviyo.config'
import { Koyeb } from '../../../connectors/src/configs/koyeb.config'
import { LanguageLayer } from '../../../connectors/src/configs/languagelayer.config'
import { Lecto } from '../../../connectors/src/configs/lecto.config'
import { Linear } from '../../../connectors/src/configs/linear.config'
import { LinkedIn } from '../../../connectors/src/configs/linkedin.config'
import { LinkPreview } from '../../../connectors/src/configs/linkpreview.config'
import { Logz } from '../../../connectors/src/configs/logz.config'
import { Lokalise } from '../../../connectors/src/configs/lokalise.config'
import { Lolo } from '../../../connectors/src/configs/lolo.config'
import { Luabase } from '../../../connectors/src/configs/luabase.config'
import { MailboxValidator } from '../../../connectors/src/configs/mailboxvalidator.config'
import { MailCheckAi } from '../../../connectors/src/configs/mailcheckai.config'
import { Mailchimp } from '../../../connectors/src/configs/mailchimp.config'
import { MailerSend } from '../../../connectors/src/configs/mailersend.config'
import { MailJet } from '../../../connectors/src/configs/mailjet.config'
import { MailPace } from '../../../connectors/src/configs/mailpace.config'
import { Medium } from '../../../connectors/src/configs/medium.config'
import { Mergent } from '../../../connectors/src/configs/mergent.config'
import { Mezmo } from '../../../connectors/src/configs/mezmo.config'
import { MicroDev } from '../../../connectors/src/configs/microdev.config'
import { Microlink } from '../../../connectors/src/configs/microlink.config'
import { Mixpanel } from '../../../connectors/src/configs/mixpanel.config'
import { MJML } from '../../../connectors/src/configs/mjml.config'
import { MojoAuth } from '../../../connectors/src/configs/mojoauth.config'
import { Nasa } from '../../../connectors/src/configs/nasa.config'
import { Netlify } from '../../../connectors/src/configs/netlify.config'
import { NewRelic } from '../../../connectors/src/configs/newrelic.config'
import { NewsApi } from '../../../connectors/src/configs/newsapi.config'
import { Notion } from '../../../connectors/src/configs/notion.config'
import { Npoint } from '../../../connectors/src/configs/npoint.config'
import { OCRSpace } from '../../../connectors/src/configs/ocrspace.config'
import { OneInch } from '../../../connectors/src/configs/oneinch.config'
import { OpenLibrary } from '../../../connectors/src/configs/openlibrary.config'
import { OpenSea } from '../../../connectors/src/configs/opensea.config'
import { OpenWeatherMap } from '../../../connectors/src/configs/openweathermap.config'
import { ORBIntelligence } from '../../../connectors/src/configs/orbintelligence.config'
import { Ortto } from '../../../connectors/src/configs/ortto.config'
import { Ory } from '../../../connectors/src/configs/ory.config'
import { Parsiq } from '../../../connectors/src/configs/parsiq.config'
import { PayPal } from '../../../connectors/src/configs/paypal.config'
import { Peekalink } from '../../../connectors/src/configs/peekalink.config'
import { PeopleDataLabs } from '../../../connectors/src/configs/peopledatalabs.config'
import { Personio } from '../../../connectors/src/configs/personio.config'
import { Phyllo } from '../../../connectors/src/configs/phyllo.config'
import { Pinata } from '../../../connectors/src/configs/pinata.config'
import { Pipedream } from '../../../connectors/src/configs/pipedream.config'
import { Pirsch } from '../../../connectors/src/configs/pirsch.config'
import { Pixela } from '../../../connectors/src/configs/pixela.config'
import { PolyScale } from '../../../connectors/src/configs/polyscale.config'
import { PostHog } from '../../../connectors/src/configs/posthog.config'
import { Prerender } from '../../../connectors/src/configs/prerender.config'
import { ProductHunt } from '../../../connectors/src/configs/producthunt.config'
import { PurgoMalum } from '../../../connectors/src/configs/purgomalum.config'
import { QuickChart } from '../../../connectors/src/configs/quickchart.config'
import { RapidApi } from '../../../connectors/src/configs/rapidapi.config'
import { RedisCloud } from '../../../connectors/src/configs/rediscloud.config'
import { RemoteOk } from '../../../connectors/src/configs/remoteok.config'
import { RemoveBg } from '../../../connectors/src/configs/removebg.config'
import { Render } from '../../../connectors/src/configs/render.config'
import { RestCountries } from '../../../connectors/src/configs/restcountries.config'
import { RestDB } from '../../../connectors/src/configs/restdb.config'
import { RestZeebe } from '../../../connectors/src/configs/restzeebe.config'
import { Revue } from '../../../connectors/src/configs/revue.config'
import { Robolly } from '../../../connectors/src/configs/robolly.config'
import { Rye } from '../../../connectors/src/configs/rye.config'
import { Savepage } from '../../../connectors/src/configs/savepage.config'
import { Semrush } from '../../../connectors/src/configs/semrush.config'
import { SendGrid } from '../../../connectors/src/configs/sendgrid.config'
import { Sentry } from '../../../connectors/src/configs/sentry.config'
import { SerpApi } from '../../../connectors/src/configs/serpapi.config'
import { SerpStack } from '../../../connectors/src/configs/serpstack.config'
import { Sheety } from '../../../connectors/src/configs/sheety.config'
import { Shortcut } from '../../../connectors/src/configs/shortcut.config'
import { Shrtcode } from '../../../connectors/src/configs/shrtcode.config'
import { SideKick } from '../../../connectors/src/configs/sidekick.config'
import { Sidemail } from '../../../connectors/src/configs/sidemail.config'
import { Slack } from '../../../connectors/src/configs/slack.config'
import { SpeechTextAI } from '../../../connectors/src/configs/speechtextai.config'
import { Splitbee } from '../../../connectors/src/configs/splitbee.config'
import { Stackby } from '../../../connectors/src/configs/stackby.config'
import { Statically } from '../../../connectors/src/configs/statically.config'
import { Storyblok } from '../../../connectors/src/configs/storyblok.config'
import { Stytch } from '../../../connectors/src/configs/stytch.config'
import { Supabase } from '../../../connectors/src/configs/supabase.config'
import { Tenderly } from '../../../connectors/src/configs/tenderly.config'
import { TheCompaniesApi } from '../../../connectors/src/configs/thecompaniesapi.config'
import { TheGraph } from '../../../connectors/src/configs/thegraph.config'
import { TheStarWarsApi } from '../../../connectors/src/configs/thestarwarsapi.config'
import { Tinify } from '../../../connectors/src/configs/tinify.config'
import { TMDB } from '../../../connectors/src/configs/tmdb.config'
import { Trello } from '../../../connectors/src/configs/trello.config'
import { Tribe } from '../../../connectors/src/configs/tribe.config'
import { Twilio } from '../../../connectors/src/configs/twilio.config'
import { Twitter } from '../../../connectors/src/configs/twitter.config'
import { Typeform } from '../../../connectors/src/configs/typeform.config'
import { Umami } from '../../../connectors/src/configs/umami.config'
import { Unavatar } from '../../../connectors/src/configs/unavatar.config'
import { Unlayer } from '../../../connectors/src/configs/unlayer.config'
import { Unsplash } from '../../../connectors/src/configs/unsplash.config'
import { Up42 } from '../../../connectors/src/configs/up42.config'
import { UptimeRobot } from '../../../connectors/src/configs/uptimerobot.config'
import { UrlScan } from '../../../connectors/src/configs/urlscan.config'
import { UsePlunk } from '../../../connectors/src/configs/useplunk.config'
import { Userfront } from '../../../connectors/src/configs/userfront.config'
import { Vantevo } from '../../../connectors/src/configs/vantevo.config'
import { Vonage } from '../../../connectors/src/configs/vonage.config'
import { Web3Storage } from '../../../connectors/src/configs/web3storage.config'
import { WhoIsXMLApi } from '../../../connectors/src/configs/whoisxmlapi.config'
import { WordSimi } from '../../../connectors/src/configs/wordsimi.config'
import { YahooFinance } from '../../../connectors/src/configs/yahoofinance.config'
import { ZeroX } from '../../../connectors/src/configs/zerox.config'
import { Zora } from '../../../connectors/src/configs/zora.config'
export const configTypes: Array<{type: Type; id: string; name: string; interface: string}> = []
configTypes.push({type: getType<Ably.PublishMessage>(), id: 'ably', name: 'Ably', interface: 'PublishMessage'})
configTypes.push({type: getType<AbstractApi.GetPublicHolidays>(), id: 'abstractapi', name: 'AbstractApi', interface: 'GetPublicHolidays'})
configTypes.push({type: getType<Airtable.ListTableRecords>(), id: 'airtable', name: 'Airtable', interface: 'ListTableRecords'})
configTypes.push({type: getType<Airtable.CreateTableRecords>(), id: 'airtable', name: 'Airtable', interface: 'CreateTableRecords'})
configTypes.push({type: getType<Alchemy.NftGetNFTs>(), id: 'alchemy', name: 'Alchemy', interface: 'NftGetNFTs'})
configTypes.push({type: getType<Algolia.PostEvents>(), id: 'algolia', name: 'Algolia', interface: 'PostEvents'})
configTypes.push({type: getType<Algolia.AddObjectWithoutId>(), id: 'algolia', name: 'Algolia', interface: 'AddObjectWithoutId'})
configTypes.push({type: getType<Algolia.AddObjectWithId>(), id: 'algolia', name: 'Algolia', interface: 'AddObjectWithId'})
configTypes.push({type: getType<Algolia.SearchQueryIndex>(), id: 'algolia', name: 'Algolia', interface: 'SearchQueryIndex'})
configTypes.push({type: getType<ApicAgent.Get>(), id: 'apicagent', name: 'ApicAgent', interface: 'Get'})
configTypes.push({type: getType<ApicAgent.Post>(), id: 'apicagent', name: 'ApicAgent', interface: 'Post'})
configTypes.push({type: getType<APIFlash.Screenshot>(), id: 'apiflash', name: 'APIFlash', interface: 'Screenshot'})
configTypes.push({type: getType<Apify.ListActors>(), id: 'apify', name: 'Apify', interface: 'ListActors'})
configTypes.push({type: getType<APIPoint.UserAvatar>(), id: 'apipoint', name: 'APIPoint', interface: 'UserAvatar'})
configTypes.push({type: getType<APIPoint.Weather>(), id: 'apipoint', name: 'APIPoint', interface: 'Weather'})
configTypes.push({type: getType<APIPoint.FreeGifs>(), id: 'apipoint', name: 'APIPoint', interface: 'FreeGifs'})
configTypes.push({type: getType<APIPoint.QRCode>(), id: 'apipoint', name: 'APIPoint', interface: 'QRCode'})
configTypes.push({type: getType<APIPoint.IPDetails>(), id: 'apipoint', name: 'APIPoint', interface: 'IPDetails'})
configTypes.push({type: getType<APIPoint.URLShot>(), id: 'apipoint', name: 'APIPoint', interface: 'URLShot'})
configTypes.push({type: getType<APITemplateIo.CreateImage>(), id: 'apitemplateio', name: 'APITemplateIo', interface: 'CreateImage'})
configTypes.push({type: getType<AssemblyAI.Transcribe>(), id: 'assemblyai', name: 'AssemblyAI', interface: 'Transcribe'})
configTypes.push({type: getType<AssemblyAI.Export>(), id: 'assemblyai', name: 'AssemblyAI', interface: 'Export'})
configTypes.push({type: getType<Auth0.GetAuthAccessToken>(), id: 'auth0', name: 'Auth0', interface: 'GetAuthAccessToken'})
configTypes.push({type: getType<Auth0.GetUsersByEmail>(), id: 'auth0', name: 'Auth0', interface: 'GetUsersByEmail'})
configTypes.push({type: getType<Auth0.ListOrSearchUsers>(), id: 'auth0', name: 'Auth0', interface: 'ListOrSearchUsers'})
configTypes.push({type: getType<Auth0.GetUser>(), id: 'auth0', name: 'Auth0', interface: 'GetUser'})
configTypes.push({type: getType<Auth0.CreateUser>(), id: 'auth0', name: 'Auth0', interface: 'CreateUser'})
configTypes.push({type: getType<Auth0.DeleteUser>(), id: 'auth0', name: 'Auth0', interface: 'DeleteUser'})
configTypes.push({type: getType<Auth0.GetConnections>(), id: 'auth0', name: 'Auth0', interface: 'GetConnections'})
configTypes.push({type: getType<Auth0.GetRoles>(), id: 'auth0', name: 'Auth0', interface: 'GetRoles'})
configTypes.push({type: getType<Ayrshare.AnalyticsOnAShortenedLink>(), id: 'ayrshare', name: 'Ayrshare', interface: 'AnalyticsOnAShortenedLink'})
configTypes.push({type: getType<Ayrshare.Post>(), id: 'ayrshare', name: 'Ayrshare', interface: 'Post'})
configTypes.push({type: getType<BambooHR.EmployeesDirectory>(), id: 'bamboohr', name: 'BambooHR', interface: 'EmployeesDirectory'})
configTypes.push({type: getType<BannerBear.CreateImage>(), id: 'bannerbear', name: 'BannerBear', interface: 'CreateImage'})
configTypes.push({type: getType<BannerBear.RetrieveImage>(), id: 'bannerbear', name: 'BannerBear', interface: 'RetrieveImage'})
configTypes.push({type: getType<BannerBear.ListImages>(), id: 'bannerbear', name: 'BannerBear', interface: 'ListImages'})
configTypes.push({type: getType<BaseRow.CreateRow>(), id: 'baserow', name: 'BaseRow', interface: 'CreateRow'})
configTypes.push({type: getType<BaseRow.GetRows>(), id: 'baserow', name: 'BaseRow', interface: 'GetRows'})
configTypes.push({type: getType<Beehiiv.CreateSubscriber>(), id: 'beehiiv', name: 'Beehiiv', interface: 'CreateSubscriber'})
configTypes.push({type: getType<Beehiiv.GetPublications>(), id: 'beehiiv', name: 'Beehiiv', interface: 'GetPublications'})
configTypes.push({type: getType<BigDataCloud.ReverseGeoCodeClient>(), id: 'bigdatacloud', name: 'BigDataCloud', interface: 'ReverseGeoCodeClient'})
configTypes.push({type: getType<Bitly.CreateShortLink>(), id: 'bitly', name: 'Bitly', interface: 'CreateShortLink'})
configTypes.push({type: getType<BooAPI.UserBalance>(), id: 'booapi', name: 'BooAPI', interface: 'UserBalance'})
configTypes.push({type: getType<BooAPI.CreateTask>(), id: 'booapi', name: 'BooAPI', interface: 'CreateTask'})
configTypes.push({type: getType<BooAPI.TaskStatus>(), id: 'booapi', name: 'BooAPI', interface: 'TaskStatus'})
configTypes.push({type: getType<BooAPI.TaskResults>(), id: 'booapi', name: 'BooAPI', interface: 'TaskResults'})
configTypes.push({type: getType<Brandfetch.BrandByDomainOrId>(), id: 'brandfetch', name: 'Brandfetch', interface: 'BrandByDomainOrId'})
configTypes.push({type: getType<BrowsersFyi.Get>(), id: 'browsersfyi', name: 'BrowsersFyi', interface: 'Get'})
configTypes.push({type: getType<Bruzu.CreateImage>(), id: 'bruzu', name: 'Bruzu', interface: 'CreateImage'})
configTypes.push({type: getType<ButtondownEmail.ListSubscribers>(), id: 'buttondownemail', name: 'ButtondownEmail', interface: 'ListSubscribers'})
configTypes.push({type: getType<ButtondownEmail.CreateSubscriber>(), id: 'buttondownemail', name: 'ButtondownEmail', interface: 'CreateSubscriber'})
configTypes.push({type: getType<ButtondownEmail.UpdateSubscriber>(), id: 'buttondownemail', name: 'ButtondownEmail', interface: 'UpdateSubscriber'})
configTypes.push({type: getType<ButtondownEmail.DeleteSubscriber>(), id: 'buttondownemail', name: 'ButtondownEmail', interface: 'DeleteSubscriber'})
configTypes.push({type: getType<CalCom.FindAllAvailabilities>(), id: 'calcom', name: 'CalCom', interface: 'FindAllAvailabilities'})
configTypes.push({type: getType<CalCom.FindAnAvailability>(), id: 'calcom', name: 'CalCom', interface: 'FindAnAvailability'})
configTypes.push({type: getType<CalCom.CreateAvailability>(), id: 'calcom', name: 'CalCom', interface: 'CreateAvailability'})
configTypes.push({type: getType<CalCom.FindAllEventTypes>(), id: 'calcom', name: 'CalCom', interface: 'FindAllEventTypes'})
configTypes.push({type: getType<Calendarific.GetHolidays>(), id: 'calendarific', name: 'Calendarific', interface: 'GetHolidays'})
configTypes.push({type: getType<Calendarific.GetCountries>(), id: 'calendarific', name: 'Calendarific', interface: 'GetCountries'})
configTypes.push({type: getType<Calendarific.GetLanguages>(), id: 'calendarific', name: 'Calendarific', interface: 'GetLanguages'})
configTypes.push({type: getType<Camunda.ConsoleToken>(), id: 'camunda', name: 'Camunda', interface: 'ConsoleToken'})
configTypes.push({type: getType<Camunda.ConsoleGetClusters>(), id: 'camunda', name: 'Camunda', interface: 'ConsoleGetClusters'})
configTypes.push({type: getType<Camunda.ConsoleGetClustersParameters>(), id: 'camunda', name: 'Camunda', interface: 'ConsoleGetClustersParameters'})
configTypes.push({type: getType<Camunda.ConsoleDeleteCluster>(), id: 'camunda', name: 'Camunda', interface: 'ConsoleDeleteCluster'})
configTypes.push({type: getType<Camunda.ConsoleCreateCluster>(), id: 'camunda', name: 'Camunda', interface: 'ConsoleCreateCluster'})
configTypes.push({type: getType<Camunda.ConsoleGetClients>(), id: 'camunda', name: 'Camunda', interface: 'ConsoleGetClients'})
configTypes.push({type: getType<Camunda.ConsoleCreateClient>(), id: 'camunda', name: 'Camunda', interface: 'ConsoleCreateClient'})
configTypes.push({type: getType<Camunda.ConsoleGetClient>(), id: 'camunda', name: 'Camunda', interface: 'ConsoleGetClient'})
configTypes.push({type: getType<Camunda.ConsoleDeleteClient>(), id: 'camunda', name: 'Camunda', interface: 'ConsoleDeleteClient'})
configTypes.push({type: getType<Canny.ListBoards>(), id: 'canny', name: 'Canny', interface: 'ListBoards'})
configTypes.push({type: getType<Canny.RetrieveBoard>(), id: 'canny', name: 'Canny', interface: 'RetrieveBoard'})
configTypes.push({type: getType<Canny.ListPosts>(), id: 'canny', name: 'Canny', interface: 'ListPosts'})
configTypes.push({type: getType<CarbEngage.Info>(), id: 'carbengage', name: 'CarbEngage', interface: 'Info'})
configTypes.push({type: getType<Chargebee.ListSubscriptions>(), id: 'chargebee', name: 'Chargebee', interface: 'ListSubscriptions'})
configTypes.push({type: getType<ChartMogul.TrackLeadAndFreeTrial>(), id: 'chartmogul', name: 'ChartMogul', interface: 'TrackLeadAndFreeTrial'})
configTypes.push({type: getType<Carifai.MakePredictions>(), id: 'clarifai', name: 'Carifai', interface: 'MakePredictions'})
configTypes.push({type: getType<Carifai.MakePredictionsWithVersion>(), id: 'clarifai', name: 'Carifai', interface: 'MakePredictionsWithVersion'})
configTypes.push({type: getType<Clearbit.LogoGet>(), id: 'clearbit', name: 'Clearbit', interface: 'LogoGet'})
configTypes.push({type: getType<ClickSend.SendEmail>(), id: 'clicksend', name: 'ClickSend', interface: 'SendEmail'})
configTypes.push({type: getType<ClickUp.SpacesGetAll>(), id: 'clickup', name: 'ClickUp', interface: 'SpacesGetAll'})
configTypes.push({type: getType<ClickUp.ListsGetAllFolderless>(), id: 'clickup', name: 'ClickUp', interface: 'ListsGetAllFolderless'})
configTypes.push({type: getType<ClickUp.TasksGetAll>(), id: 'clickup', name: 'ClickUp', interface: 'TasksGetAll'})
configTypes.push({type: getType<Clockify.ProjectsGetAll>(), id: 'clockify', name: 'Clockify', interface: 'ProjectsGetAll'})
configTypes.push({type: getType<CloudFlare.ListZones>(), id: 'cloudflare', name: 'CloudFlare', interface: 'ListZones'})
configTypes.push({type: getType<Codat.GetCategories>(), id: 'codat', name: 'Codat', interface: 'GetCategories'})
configTypes.push({type: getType<CodeDetection.CodeDetectionBase>(), id: 'codedetection', name: 'CodeDetection', interface: 'CodeDetectionBase'})
configTypes.push({type: getType<CoinCap.getAssets>(), id: 'coincap', name: 'CoinCap', interface: 'getAssets'})
configTypes.push({type: getType<CoinCap.getAsset>(), id: 'coincap', name: 'CoinCap', interface: 'getAsset'})
configTypes.push({type: getType<CoinCap.getAssetHistory>(), id: 'coincap', name: 'CoinCap', interface: 'getAssetHistory'})
configTypes.push({type: getType<CoinCap.getAssetMarkets>(), id: 'coincap', name: 'CoinCap', interface: 'getAssetMarkets'})
configTypes.push({type: getType<CoinGecko.ListCoins>(), id: 'coingecko', name: 'CoinGecko', interface: 'ListCoins'})
configTypes.push({type: getType<CoinGecko.CoinsMarkets>(), id: 'coingecko', name: 'CoinGecko', interface: 'CoinsMarkets'})
configTypes.push({type: getType<CoinGecko.CoinById>(), id: 'coingecko', name: 'CoinGecko', interface: 'CoinById'})
configTypes.push({type: getType<CoinGecko.CoinTickersById>(), id: 'coingecko', name: 'CoinGecko', interface: 'CoinTickersById'})
configTypes.push({type: getType<CoinGecko.CoinHistoryById>(), id: 'coingecko', name: 'CoinGecko', interface: 'CoinHistoryById'})
configTypes.push({type: getType<CoinGecko.CoinMarketChartById>(), id: 'coingecko', name: 'CoinGecko', interface: 'CoinMarketChartById'})
configTypes.push({type: getType<CoinGecko.CoinMarketChartRangeById>(), id: 'coingecko', name: 'CoinGecko', interface: 'CoinMarketChartRangeById'})
configTypes.push({type: getType<CoinGecko.GetSimpleSupportedVsCurrencies>(), id: 'coingecko', name: 'CoinGecko', interface: 'GetSimpleSupportedVsCurrencies'})
configTypes.push({type: getType<CoinGecko.GetSimplePrice>(), id: 'coingecko', name: 'CoinGecko', interface: 'GetSimplePrice'})
configTypes.push({type: getType<CoinGecko.GetSimpleTokenPrice>(), id: 'coingecko', name: 'CoinGecko', interface: 'GetSimpleTokenPrice'})
configTypes.push({type: getType<Coinlayer.GetLive>(), id: 'coinlayer', name: 'Coinlayer', interface: 'GetLive'})
configTypes.push({type: getType<Coinlayer.GetList>(), id: 'coinlayer', name: 'Coinlayer', interface: 'GetList'})
configTypes.push({type: getType<Coinlayer.GetHistorical>(), id: 'coinlayer', name: 'Coinlayer', interface: 'GetHistorical'})
configTypes.push({type: getType<CoinMarketCap.CryptocurrencyListingsHistorical>(), id: 'coinmarketcap', name: 'CoinMarketCap', interface: 'CryptocurrencyListingsHistorical'})
configTypes.push({type: getType<CoinMarketCap.CryptocurrencyListingsLatest>(), id: 'coinmarketcap', name: 'CoinMarketCap', interface: 'CryptocurrencyListingsLatest'})
configTypes.push({type: getType<ConfigCat.FeatureFlagGetValue>(), id: 'configcat', name: 'ConfigCat', interface: 'FeatureFlagGetValue'})
configTypes.push({type: getType<CongressGov.ListBills>(), id: 'congressgov', name: 'CongressGov', interface: 'ListBills'})
configTypes.push({type: getType<CongressGov.ListAmendments>(), id: 'congressgov', name: 'CongressGov', interface: 'ListAmendments'})
configTypes.push({type: getType<ContentFul.ContentGetSpace>(), id: 'contentful', name: 'ContentFul', interface: 'ContentGetSpace'})
configTypes.push({type: getType<ContentFul.ContentGetSpaceContentModel>(), id: 'contentful', name: 'ContentFul', interface: 'ContentGetSpaceContentModel'})
configTypes.push({type: getType<ContentFul.ContentGetSpaceSingleContentType>(), id: 'contentful', name: 'ContentFul', interface: 'ContentGetSpaceSingleContentType'})
configTypes.push({type: getType<ContentFul.GraphQLbySpace>(), id: 'contentful', name: 'ContentFul', interface: 'GraphQLbySpace'})
configTypes.push({type: getType<ContentFul.GraphQLbySpaceAndEnvironment>(), id: 'contentful', name: 'ContentFul', interface: 'GraphQLbySpaceAndEnvironment'})
configTypes.push({type: getType<ConvertKit.GetAccount>(), id: 'convertkit', name: 'ConvertKit', interface: 'GetAccount'})
configTypes.push({type: getType<ConvertKit.ListSubscribers>(), id: 'convertkit', name: 'ConvertKit', interface: 'ListSubscribers'})
configTypes.push({type: getType<CountApi.Get>(), id: 'countapi', name: 'CountApi', interface: 'Get'})
configTypes.push({type: getType<CountApi.Set>(), id: 'countapi', name: 'CountApi', interface: 'Set'})
configTypes.push({type: getType<CountApi.Update>(), id: 'countapi', name: 'CountApi', interface: 'Update'})
configTypes.push({type: getType<CountApi.Hit>(), id: 'countapi', name: 'CountApi', interface: 'Hit'})
configTypes.push({type: getType<CountApi.Create>(), id: 'countapi', name: 'CountApi', interface: 'Create'})
configTypes.push({type: getType<CountApi.Info>(), id: 'countapi', name: 'CountApi', interface: 'Info'})
configTypes.push({type: getType<Courier.Send>(), id: 'courier', name: 'Courier', interface: 'Send'})
configTypes.push({type: getType<Covalent.ClassAGetTransactionsForAddress>(), id: 'covalent', name: 'Covalent', interface: 'ClassAGetTransactionsForAddress'})
configTypes.push({type: getType<Covalent.ClassBGetUniswapV3Pools>(), id: 'covalent', name: 'Covalent', interface: 'ClassBGetUniswapV3Pools'})
configTypes.push({type: getType<Covalent.PricingGetHistoricalTokenPrices>(), id: 'covalent', name: 'Covalent', interface: 'PricingGetHistoricalTokenPrices'})
configTypes.push({type: getType<Cronhooks.ScheduleNewWebhool>(), id: 'cronhooks', name: 'Cronhooks', interface: 'ScheduleNewWebhool'})
configTypes.push({type: getType<Cumul.Create>(), id: 'cumul', name: 'Cumul', interface: 'Create'})
configTypes.push({type: getType<CurrencyScoop.Latest>(), id: 'currencyscoop', name: 'CurrencyScoop', interface: 'Latest'})
configTypes.push({type: getType<CurrencyScoop.Historical>(), id: 'currencyscoop', name: 'CurrencyScoop', interface: 'Historical'})
configTypes.push({type: getType<CurrencyScoop.Timeseries>(), id: 'currencyscoop', name: 'CurrencyScoop', interface: 'Timeseries'})
configTypes.push({type: getType<CurrencyScoop.Currencies>(), id: 'currencyscoop', name: 'CurrencyScoop', interface: 'Currencies'})
configTypes.push({type: getType<CurrencyScoop.Convert>(), id: 'currencyscoop', name: 'CurrencyScoop', interface: 'Convert'})
configTypes.push({type: getType<Dataddo.GetServices>(), id: 'dataddo', name: 'Dataddo', interface: 'GetServices'})
configTypes.push({type: getType<Dataddo.CreateService>(), id: 'dataddo', name: 'Dataddo', interface: 'CreateService'})
configTypes.push({type: getType<Dataddo.GetSources>(), id: 'dataddo', name: 'Dataddo', interface: 'GetSources'})
configTypes.push({type: getType<Dataddo.GetToken>(), id: 'dataddo', name: 'Dataddo', interface: 'GetToken'})
configTypes.push({type: getType<DataDog.ValidateApiKey>(), id: 'datadog', name: 'DataDog', interface: 'ValidateApiKey'})
configTypes.push({type: getType<DataDog.PostEvent>(), id: 'datadog', name: 'DataDog', interface: 'PostEvent'})
configTypes.push({type: getType<DataDog.ListEvents>(), id: 'datadog', name: 'DataDog', interface: 'ListEvents'})
configTypes.push({type: getType<DatoCMS.Query>(), id: 'datocms', name: 'DatoCMS', interface: 'Query'})
configTypes.push({type: getType<Deepgram.TranscribePrerecordedAudio>(), id: 'deepgram', name: 'Deepgram', interface: 'TranscribePrerecordedAudio'})
configTypes.push({type: getType<DeepL.TranslatingRequest>(), id: 'deepl', name: 'DeepL', interface: 'TranslatingRequest'})
configTypes.push({type: getType<DeepL.GlossaryListLanguagePairs>(), id: 'deepl', name: 'DeepL', interface: 'GlossaryListLanguagePairs'})
configTypes.push({type: getType<DevCycle.Token>(), id: 'devcycle', name: 'DevCycle', interface: 'Token'})
configTypes.push({type: getType<DevCycle.ListFeatures>(), id: 'devcycle', name: 'DevCycle', interface: 'ListFeatures'})
configTypes.push({type: getType<DevTo.PostArticle>(), id: 'devto', name: 'DevTo', interface: 'PostArticle'})
configTypes.push({type: getType<Dhl.TrackingUnified>(), id: 'dhl', name: 'Dhl', interface: 'TrackingUnified'})
configTypes.push({type: getType<Directus.Login>(), id: 'directus', name: 'Directus', interface: 'Login'})
configTypes.push({type: getType<Directus.CreateCollection>(), id: 'directus', name: 'Directus', interface: 'CreateCollection'})
configTypes.push({type: getType<Directus.ListCollections>(), id: 'directus', name: 'Directus', interface: 'ListCollections'})
configTypes.push({type: getType<Disify.CheckSingleDomain>(), id: 'disify', name: 'Disify', interface: 'CheckSingleDomain'})
configTypes.push({type: getType<Disify.CheckMassDomain>(), id: 'disify', name: 'Disify', interface: 'CheckMassDomain'})
configTypes.push({type: getType<Disify.CheckSingleEmail>(), id: 'disify', name: 'Disify', interface: 'CheckSingleEmail'})
configTypes.push({type: getType<Disify.CheckMassEmail>(), id: 'disify', name: 'Disify', interface: 'CheckMassEmail'})
configTypes.push({type: getType<Doppler.DownloadSecrets>(), id: 'doppler', name: 'Doppler', interface: 'DownloadSecrets'})
configTypes.push({type: getType<DynaPictures.GenerateImage>(), id: 'dynapictures', name: 'DynaPictures', interface: 'GenerateImage'})
configTypes.push({type: getType<EasyDb.Get>(), id: 'easydb', name: 'EasyDb', interface: 'Get'})
configTypes.push({type: getType<EasyDb.Put>(), id: 'easydb', name: 'EasyDb', interface: 'Put'})
configTypes.push({type: getType<EasyDb.List>(), id: 'easydb', name: 'EasyDb', interface: 'List'})
configTypes.push({type: getType<EasyDb.Delete>(), id: 'easydb', name: 'EasyDb', interface: 'Delete'})
configTypes.push({type: getType<EmailOctopus.GetList>(), id: 'emailoctopus', name: 'EmailOctopus', interface: 'GetList'})
configTypes.push({type: getType<EmailOctopus.CreateContact>(), id: 'emailoctopus', name: 'EmailOctopus', interface: 'CreateContact'})
configTypes.push({type: getType<Etherscan.AccountsBalanceSingleAddress>(), id: 'etherscan', name: 'Etherscan', interface: 'AccountsBalanceSingleAddress'})
configTypes.push({type: getType<Eventbrite.ListAttendeeByEventId>(), id: 'eventbrite', name: 'Eventbrite', interface: 'ListAttendeeByEventId'})
configTypes.push({type: getType<Eventbrite.GetUserMe>(), id: 'eventbrite', name: 'Eventbrite', interface: 'GetUserMe'})
configTypes.push({type: getType<Fauna.GraphQLQuery>(), id: 'fauna', name: 'Fauna', interface: 'GraphQLQuery'})
configTypes.push({type: getType<Festdays.Holidays>(), id: 'festdays', name: 'Festdays', interface: 'Holidays'})
configTypes.push({type: getType<Fibery.GetSchema>(), id: 'fibery', name: 'Fibery', interface: 'GetSchema'})
configTypes.push({type: getType<Fibery.GraphQLQuery>(), id: 'fibery', name: 'Fibery', interface: 'GraphQLQuery'})
configTypes.push({type: getType<Figma.GetFile>(), id: 'figma', name: 'Figma', interface: 'GetFile'})
configTypes.push({type: getType<Figma.GetFileNodes>(), id: 'figma', name: 'Figma', interface: 'GetFileNodes'})
configTypes.push({type: getType<Figma.GetImages>(), id: 'figma', name: 'Figma', interface: 'GetImages'})
configTypes.push({type: getType<Figma.GetImageFills>(), id: 'figma', name: 'Figma', interface: 'GetImageFills'})
configTypes.push({type: getType<Flatfile.ExchangeAccessKey>(), id: 'flatfile', name: 'Flatfile', interface: 'ExchangeAccessKey'})
configTypes.push({type: getType<Flatfile.ListWorkspaces>(), id: 'flatfile', name: 'Flatfile', interface: 'ListWorkspaces'})
configTypes.push({type: getType<Flatfile.DownloadUpload>(), id: 'flatfile', name: 'Flatfile', interface: 'DownloadUpload'})
configTypes.push({type: getType<Flatfile.DeleteUpload>(), id: 'flatfile', name: 'Flatfile', interface: 'DeleteUpload'})
configTypes.push({type: getType<Flatfile.BulkDeleteUploads>(), id: 'flatfile', name: 'Flatfile', interface: 'BulkDeleteUploads'})
configTypes.push({type: getType<Frankfurter.Latest>(), id: 'frankfurter', name: 'Frankfurter', interface: 'Latest'})
configTypes.push({type: getType<Frankfurter.Historical>(), id: 'frankfurter', name: 'Frankfurter', interface: 'Historical'})
configTypes.push({type: getType<Frankfurter.TimeSeries>(), id: 'frankfurter', name: 'Frankfurter', interface: 'TimeSeries'})
configTypes.push({type: getType<Geekflare.BrokenLink>(), id: 'geekflare', name: 'Geekflare', interface: 'BrokenLink'})
configTypes.push({type: getType<Geekflare.DNSRecords>(), id: 'geekflare', name: 'Geekflare', interface: 'DNSRecords'})
configTypes.push({type: getType<Geekflare.Lighthouse>(), id: 'geekflare', name: 'Geekflare', interface: 'Lighthouse'})
configTypes.push({type: getType<Geekflare.Screenshot>(), id: 'geekflare', name: 'Geekflare', interface: 'Screenshot'})
configTypes.push({type: getType<Geekflare.UrlToPdf>(), id: 'geekflare', name: 'Geekflare', interface: 'UrlToPdf'})
configTypes.push({type: getType<Github.ListRepositoryIssues>(), id: 'github', name: 'Github', interface: 'ListRepositoryIssues'})
configTypes.push({type: getType<Github.RepositoriesGetContent>(), id: 'github', name: 'Github', interface: 'RepositoriesGetContent'})
configTypes.push({type: getType<Github.GitDatabaseGetTree>(), id: 'github', name: 'Github', interface: 'GitDatabaseGetTree'})
configTypes.push({type: getType<GitLab.GraphQLQuery>(), id: 'gitlab', name: 'GitLab', interface: 'GraphQLQuery'})
configTypes.push({type: getType<GrafBase.GraphQLQuery>(), id: 'grafbase', name: 'GrafBase', interface: 'GraphQLQuery'})
configTypes.push({type: getType<GraphJSON.Log>(), id: 'graphjson', name: 'GraphJSON', interface: 'Log'})
configTypes.push({type: getType<GraphJSON.BulkLog>(), id: 'graphjson', name: 'GraphJSON', interface: 'BulkLog'})
configTypes.push({type: getType<GraphJSON.Data>(), id: 'graphjson', name: 'GraphJSON', interface: 'Data'})
configTypes.push({type: getType<GraphJSON.Visualization>(), id: 'graphjson', name: 'GraphJSON', interface: 'Visualization'})
configTypes.push({type: getType<Grist.AddRecords>(), id: 'grist', name: 'Grist', interface: 'AddRecords'})
configTypes.push({type: getType<Grist.FetchRecords>(), id: 'grist', name: 'Grist', interface: 'FetchRecords'})
configTypes.push({type: getType<Grist.DescribeDocument>(), id: 'grist', name: 'Grist', interface: 'DescribeDocument'})
configTypes.push({type: getType<HackerNews.GetItem>(), id: 'hackernews', name: 'HackerNews', interface: 'GetItem'})
configTypes.push({type: getType<HackerNews.GetUser>(), id: 'hackernews', name: 'HackerNews', interface: 'GetUser'})
configTypes.push({type: getType<HackerNews.GetLive>(), id: 'hackernews', name: 'HackerNews', interface: 'GetLive'})
configTypes.push({type: getType<Harvest.ListProjects>(), id: 'harvest', name: 'Harvest', interface: 'ListProjects'})
configTypes.push({type: getType<Hashnode.GraphQLQuery>(), id: 'hashnode', name: 'Hashnode', interface: 'GraphQLQuery'})
configTypes.push({type: getType<HeapAnalytics.ServerSideTrack>(), id: 'heapanalytics', name: 'HeapAnalytics', interface: 'ServerSideTrack'})
configTypes.push({type: getType<HelloSign.GetAccount>(), id: 'hellosign', name: 'HelloSign', interface: 'GetAccount'})
configTypes.push({type: getType<HelloSign.SendSignatureRequest>(), id: 'hellosign', name: 'HelloSign', interface: 'SendSignatureRequest'})
configTypes.push({type: getType<Here.CalculateRouteViaGet>(), id: 'here', name: 'Here', interface: 'CalculateRouteViaGet'})
configTypes.push({type: getType<Here.Autosuggest>(), id: 'here', name: 'Here', interface: 'Autosuggest'})
configTypes.push({type: getType<Here.Discover>(), id: 'here', name: 'Here', interface: 'Discover'})
configTypes.push({type: getType<HostIo.GetDomain>(), id: 'hostio', name: 'HostIo', interface: 'GetDomain'})
configTypes.push({type: getType<HostIo.GetDns>(), id: 'hostio', name: 'HostIo', interface: 'GetDns'})
configTypes.push({type: getType<HostIo.GetRelated>(), id: 'hostio', name: 'HostIo', interface: 'GetRelated'})
configTypes.push({type: getType<HostIo.GetFull>(), id: 'hostio', name: 'HostIo', interface: 'GetFull'})
configTypes.push({type: getType<HostIo.GetByFieldValue>(), id: 'hostio', name: 'HostIo', interface: 'GetByFieldValue'})
configTypes.push({type: getType<Hubspot.OAuthToken>(), id: 'hubspot', name: 'Hubspot', interface: 'OAuthToken'})
configTypes.push({type: getType<Hubspot.FormsSubmit>(), id: 'hubspot', name: 'Hubspot', interface: 'FormsSubmit'})
configTypes.push({type: getType<Hubspot.ContactsCreateOrUpdate>(), id: 'hubspot', name: 'Hubspot', interface: 'ContactsCreateOrUpdate'})
configTypes.push({type: getType<HunterIo.DomainSearch>(), id: 'hunterio', name: 'HunterIo', interface: 'DomainSearch'})
configTypes.push({type: getType<HunterIo.EmailFinder>(), id: 'hunterio', name: 'HunterIo', interface: 'EmailFinder'})
configTypes.push({type: getType<HunterIo.AuthorFinder>(), id: 'hunterio', name: 'HunterIo', interface: 'AuthorFinder'})
configTypes.push({type: getType<HunterIo.EmailVerification>(), id: 'hunterio', name: 'HunterIo', interface: 'EmailVerification'})
configTypes.push({type: getType<Hybiscus.BuildReport>(), id: 'hybiscus', name: 'Hybiscus', interface: 'BuildReport'})
configTypes.push({type: getType<Hybiscus.GetReport>(), id: 'hybiscus', name: 'Hybiscus', interface: 'GetReport'})
configTypes.push({type: getType<Hygraph.ContentApiGraphQl>(), id: 'hygraph', name: 'Hygraph', interface: 'ContentApiGraphQl'})
configTypes.push({type: getType<Imglab.Api>(), id: 'imglab', name: 'Imglab', interface: 'Api'})
configTypes.push({type: getType<IncidentIo.ListIncidents>(), id: 'incidentio', name: 'IncidentIo', interface: 'ListIncidents'})
configTypes.push({type: getType<Jira.GetIssue>(), id: 'jira', name: 'Jira', interface: 'GetIssue'})
configTypes.push({type: getType<Jira.SearchIssues>(), id: 'jira', name: 'Jira', interface: 'SearchIssues'})
configTypes.push({type: getType<Jira.CreateIssue>(), id: 'jira', name: 'Jira', interface: 'CreateIssue'})
configTypes.push({type: getType<Keen.RecordASingleEvent>(), id: 'keen', name: 'Keen', interface: 'RecordASingleEvent'})
configTypes.push({type: getType<Keen.RecordMultipleEvents>(), id: 'keen', name: 'Keen', interface: 'RecordMultipleEvents'})
configTypes.push({type: getType<Klaviyo.TrackProfileActivity>(), id: 'klaviyo', name: 'Klaviyo', interface: 'TrackProfileActivity'})
configTypes.push({type: getType<Klaviyo.IdentifyProfile>(), id: 'klaviyo', name: 'Klaviyo', interface: 'IdentifyProfile'})
configTypes.push({type: getType<Klaviyo.GetProfileId>(), id: 'klaviyo', name: 'Klaviyo', interface: 'GetProfileId'})
configTypes.push({type: getType<Klaviyo.GetProfile>(), id: 'klaviyo', name: 'Klaviyo', interface: 'GetProfile'})
configTypes.push({type: getType<Koyeb.GetCurrentUser>(), id: 'koyeb', name: 'Koyeb', interface: 'GetCurrentUser'})
configTypes.push({type: getType<Koyeb.ListApps>(), id: 'koyeb', name: 'Koyeb', interface: 'ListApps'})
configTypes.push({type: getType<LanguageLayer.Detect>(), id: 'languagelayer', name: 'LanguageLayer', interface: 'Detect'})
configTypes.push({type: getType<Lecto.TranslateText>(), id: 'lecto', name: 'Lecto', interface: 'TranslateText'})
configTypes.push({type: getType<Lecto.TranslateJson>(), id: 'lecto', name: 'Lecto', interface: 'TranslateJson'})
configTypes.push({type: getType<Linear.GraphQLQuery>(), id: 'linear', name: 'Linear', interface: 'GraphQLQuery'})
configTypes.push({type: getType<LinkedIn.SharePost>(), id: 'linkedin', name: 'LinkedIn', interface: 'SharePost'})
configTypes.push({type: getType<LinkPreview.LinkPreview>(), id: 'linkpreview', name: 'LinkPreview', interface: 'LinkPreview'})
configTypes.push({type: getType<Logz.SearchLogs>(), id: 'logz', name: 'Logz', interface: 'SearchLogs'})
configTypes.push({type: getType<Logz.RetrieveUsersInAssociatedAccounts>(), id: 'logz', name: 'Logz', interface: 'RetrieveUsersInAssociatedAccounts'})
configTypes.push({type: getType<Lokalise.CreateTask>(), id: 'lokalise', name: 'Lokalise', interface: 'CreateTask'})
configTypes.push({type: getType<Lokalise.ListTasks>(), id: 'lokalise', name: 'Lokalise', interface: 'ListTasks'})
configTypes.push({type: getType<Lokalise.ListUsers>(), id: 'lokalise', name: 'Lokalise', interface: 'ListUsers'})
configTypes.push({type: getType<Lokalise.ListTeams>(), id: 'lokalise', name: 'Lokalise', interface: 'ListTeams'})
configTypes.push({type: getType<Lolo.ListAccounts>(), id: 'lolo', name: 'Lolo', interface: 'ListAccounts'})
configTypes.push({type: getType<Luabase.RunQuery>(), id: 'luabase', name: 'Luabase', interface: 'RunQuery'})
configTypes.push({type: getType<MailboxValidator.SingleEmailValidation>(), id: 'mailboxvalidator', name: 'MailboxValidator', interface: 'SingleEmailValidation'})
configTypes.push({type: getType<MailboxValidator.DisposableEmail>(), id: 'mailboxvalidator', name: 'MailboxValidator', interface: 'DisposableEmail'})
configTypes.push({type: getType<MailboxValidator.FreeEmail>(), id: 'mailboxvalidator', name: 'MailboxValidator', interface: 'FreeEmail'})
configTypes.push({type: getType<MailCheckAi.CheckDomain>(), id: 'mailcheckai', name: 'MailCheckAi', interface: 'CheckDomain'})
configTypes.push({type: getType<MailCheckAi.CheckEmail>(), id: 'mailcheckai', name: 'MailCheckAi', interface: 'CheckEmail'})
configTypes.push({type: getType<Mailchimp.ListCampaigns>(), id: 'mailchimp', name: 'Mailchimp', interface: 'ListCampaigns'})
configTypes.push({type: getType<MailerSend.EmailSend>(), id: 'mailersend', name: 'MailerSend', interface: 'EmailSend'})
configTypes.push({type: getType<MailJet.SendBasicEmail>(), id: 'mailjet', name: 'MailJet', interface: 'SendBasicEmail'})
configTypes.push({type: getType<MailPace.Send>(), id: 'mailpace', name: 'MailPace', interface: 'Send'})
configTypes.push({type: getType<Medium.Me>(), id: 'medium', name: 'Medium', interface: 'Me'})
configTypes.push({type: getType<Medium.GetPublications>(), id: 'medium', name: 'Medium', interface: 'GetPublications'})
configTypes.push({type: getType<Medium.CreatePost>(), id: 'medium', name: 'Medium', interface: 'CreatePost'})
configTypes.push({type: getType<Medium.CreatePostUnderPublication>(), id: 'medium', name: 'Medium', interface: 'CreatePostUnderPublication'})
configTypes.push({type: getType<Medium.GetContributorsOfPublication>(), id: 'medium', name: 'Medium', interface: 'GetContributorsOfPublication'})
configTypes.push({type: getType<Mergent.CreateTask>(), id: 'mergent', name: 'Mergent', interface: 'CreateTask'})
configTypes.push({type: getType<Mezmo.IngestLogs>(), id: 'mezmo', name: 'Mezmo', interface: 'IngestLogs'})
configTypes.push({type: getType<MicroDev.StorageDbCreateRecord>(), id: 'microdev', name: 'MicroDev', interface: 'StorageDbCreateRecord'})
configTypes.push({type: getType<MicroDev.StorageDbReadRecord>(), id: 'microdev', name: 'MicroDev', interface: 'StorageDbReadRecord'})
configTypes.push({type: getType<MicroDev.StorageDbUpdateRecord>(), id: 'microdev', name: 'MicroDev', interface: 'StorageDbUpdateRecord'})
configTypes.push({type: getType<MicroDev.StorageDbDeleteRecord>(), id: 'microdev', name: 'MicroDev', interface: 'StorageDbDeleteRecord'})
configTypes.push({type: getType<MicroDev.StorageCacheDecrement>(), id: 'microdev', name: 'MicroDev', interface: 'StorageCacheDecrement'})
configTypes.push({type: getType<MicroDev.StorageCacheDelete>(), id: 'microdev', name: 'MicroDev', interface: 'StorageCacheDelete'})
configTypes.push({type: getType<MicroDev.StorageCacheGet>(), id: 'microdev', name: 'MicroDev', interface: 'StorageCacheGet'})
configTypes.push({type: getType<MicroDev.StorageCacheIncrement>(), id: 'microdev', name: 'MicroDev', interface: 'StorageCacheIncrement'})
configTypes.push({type: getType<MicroDev.StorageCacheListKeys>(), id: 'microdev', name: 'MicroDev', interface: 'StorageCacheListKeys'})
configTypes.push({type: getType<MicroDev.StorageCacheSet>(), id: 'microdev', name: 'MicroDev', interface: 'StorageCacheSet'})
configTypes.push({type: getType<MicroDev.StorageNotesCreate>(), id: 'microdev', name: 'MicroDev', interface: 'StorageNotesCreate'})
configTypes.push({type: getType<MicroDev.StorageNotesDelete>(), id: 'microdev', name: 'MicroDev', interface: 'StorageNotesDelete'})
configTypes.push({type: getType<MicroDev.StorageNotesList>(), id: 'microdev', name: 'MicroDev', interface: 'StorageNotesList'})
configTypes.push({type: getType<MicroDev.StorageNotesRead>(), id: 'microdev', name: 'MicroDev', interface: 'StorageNotesRead'})
configTypes.push({type: getType<MicroDev.StorageNotesUpdate>(), id: 'microdev', name: 'MicroDev', interface: 'StorageNotesUpdate'})
configTypes.push({type: getType<Microlink.Url>(), id: 'microlink', name: 'Microlink', interface: 'Url'})
configTypes.push({type: getType<Mixpanel.TrackEvents>(), id: 'mixpanel', name: 'Mixpanel', interface: 'TrackEvents'})
configTypes.push({type: getType<Mixpanel.ImportEvents>(), id: 'mixpanel', name: 'Mixpanel', interface: 'ImportEvents'})
configTypes.push({type: getType<MJML.RenderMJMLToHMTL>(), id: 'mjml', name: 'MJML', interface: 'RenderMJMLToHMTL'})
configTypes.push({type: getType<MojoAuth.SendMagicLink>(), id: 'mojoauth', name: 'MojoAuth', interface: 'SendMagicLink'})
configTypes.push({type: getType<Nasa.AstronomyPictureOfTheDay>(), id: 'nasa', name: 'Nasa', interface: 'AstronomyPictureOfTheDay'})
configTypes.push({type: getType<Netlify.ListSites>(), id: 'netlify', name: 'Netlify', interface: 'ListSites'})
configTypes.push({type: getType<Netlify.GetEnvironmentVariables>(), id: 'netlify', name: 'Netlify', interface: 'GetEnvironmentVariables'})
configTypes.push({type: getType<NewRelic.InsightsEvents>(), id: 'newrelic', name: 'NewRelic', interface: 'InsightsEvents'})
configTypes.push({type: getType<NewsApi.SearchEverything>(), id: 'newsapi', name: 'NewsApi', interface: 'SearchEverything'})
configTypes.push({type: getType<Notion.CreateDatabase>(), id: 'notion', name: 'Notion', interface: 'CreateDatabase'})
configTypes.push({type: getType<Npoint.GetBin>(), id: 'npoint', name: 'Npoint', interface: 'GetBin'})
configTypes.push({type: getType<OCRSpace.ParseURL>(), id: 'ocrspace', name: 'OCRSpace', interface: 'ParseURL'})
configTypes.push({type: getType<OCRSpace.ParseBase64>(), id: 'ocrspace', name: 'OCRSpace', interface: 'ParseBase64'})
configTypes.push({type: getType<OneInch.AggregationInfoTokens>(), id: '1inch', name: 'OneInch', interface: 'AggregationInfoTokens'})
configTypes.push({type: getType<OneInch.AggregationQuote>(), id: '1inch', name: 'OneInch', interface: 'AggregationQuote'})
configTypes.push({type: getType<OneInch.AggregationSwap>(), id: '1inch', name: 'OneInch', interface: 'AggregationSwap'})
configTypes.push({type: getType<OpenLibrary.Books>(), id: 'openlibrary', name: 'OpenLibrary', interface: 'Books'})
configTypes.push({type: getType<OpenSea.GetAssets>(), id: 'opensea', name: 'OpenSea', interface: 'GetAssets'})
configTypes.push({type: getType<OpenSea.GetCollections>(), id: 'opensea', name: 'OpenSea', interface: 'GetCollections'})
configTypes.push({type: getType<OpenWeatherMap.CurrentAndForecast>(), id: 'openweathermap', name: 'OpenWeatherMap', interface: 'CurrentAndForecast'})
configTypes.push({type: getType<OpenWeatherMap.Current>(), id: 'openweathermap', name: 'OpenWeatherMap', interface: 'Current'})
configTypes.push({type: getType<ORBIntelligence.Match>(), id: 'orbintelligence', name: 'ORBIntelligence', interface: 'Match'})
configTypes.push({type: getType<ORBIntelligence.Fetch>(), id: 'orbintelligence', name: 'ORBIntelligence', interface: 'Fetch'})
configTypes.push({type: getType<ORBIntelligence.Search>(), id: 'orbintelligence', name: 'ORBIntelligence', interface: 'Search'})
configTypes.push({type: getType<ORBIntelligence.Lookalike>(), id: 'orbintelligence', name: 'ORBIntelligence', interface: 'Lookalike'})
configTypes.push({type: getType<ORBIntelligence.CorpTree>(), id: 'orbintelligence', name: 'ORBIntelligence', interface: 'CorpTree'})
configTypes.push({type: getType<ORBIntelligence.Dictionaries>(), id: 'orbintelligence', name: 'ORBIntelligence', interface: 'Dictionaries'})
configTypes.push({type: getType<Ortto.RetrieveOneOrMorePeople>(), id: 'ortto', name: 'Ortto', interface: 'RetrieveOneOrMorePeople'})
configTypes.push({type: getType<Ory.ListOAuth2Clients>(), id: 'ory', name: 'Ory', interface: 'ListOAuth2Clients'})
configTypes.push({type: getType<Parsiq.GetEvents>(), id: 'parsiq', name: 'Parsiq', interface: 'GetEvents'})
configTypes.push({type: getType<Parsiq.GetSingleBlock>(), id: 'parsiq', name: 'Parsiq', interface: 'GetSingleBlock'})
configTypes.push({type: getType<PayPal.AuthRequest>(), id: 'paypal', name: 'PayPal', interface: 'AuthRequest'})
configTypes.push({type: getType<Peekalink.Preview>(), id: 'peekalink', name: 'Peekalink', interface: 'Preview'})
configTypes.push({type: getType<Peekalink.IsAvailable>(), id: 'peekalink', name: 'Peekalink', interface: 'IsAvailable'})
configTypes.push({type: getType<PeopleDataLabs.CompanyEnrichment>(), id: 'peopledatalabs', name: 'PeopleDataLabs', interface: 'CompanyEnrichment'})
configTypes.push({type: getType<Personio.AuthRequest>(), id: 'personio', name: 'Personio', interface: 'AuthRequest'})
configTypes.push({type: getType<Personio.EmployeesGet>(), id: 'personio', name: 'Personio', interface: 'EmployeesGet'})
configTypes.push({type: getType<Personio.AbsencesGet>(), id: 'personio', name: 'Personio', interface: 'AbsencesGet'})
configTypes.push({type: getType<Phyllo.CreateUser>(), id: 'phyllo', name: 'Phyllo', interface: 'CreateUser'})
configTypes.push({type: getType<Phyllo.RetrieveUserByExternalId>(), id: 'phyllo', name: 'Phyllo', interface: 'RetrieveUserByExternalId'})
configTypes.push({type: getType<Phyllo.CreateSDKToken>(), id: 'phyllo', name: 'Phyllo', interface: 'CreateSDKToken'})
configTypes.push({type: getType<Pinata.PinningPinJsonToIPFS>(), id: 'pinata', name: 'Pinata', interface: 'PinningPinJsonToIPFS'})
configTypes.push({type: getType<Pipedream.GetWorkflowEmits>(), id: 'pipedream', name: 'Pipedream', interface: 'GetWorkflowEmits'})
configTypes.push({type: getType<Pipedream.ListCurrentUserSources>(), id: 'pipedream', name: 'Pipedream', interface: 'ListCurrentUserSources'})
configTypes.push({type: getType<Pirsch.GetAccessToken>(), id: 'pirsch', name: 'Pirsch', interface: 'GetAccessToken'})
configTypes.push({type: getType<Pirsch.SendPageHit>(), id: 'pirsch', name: 'Pirsch', interface: 'SendPageHit'})
configTypes.push({type: getType<Pirsch.SendEvent>(), id: 'pirsch', name: 'Pirsch', interface: 'SendEvent'})
configTypes.push({type: getType<Pixela.CreateGraph>(), id: 'pixela', name: 'Pixela', interface: 'CreateGraph'})
configTypes.push({type: getType<Pixela.GetGraph>(), id: 'pixela', name: 'Pixela', interface: 'GetGraph'})
configTypes.push({type: getType<Pixela.PostValue>(), id: 'pixela', name: 'Pixela', interface: 'PostValue'})
configTypes.push({type: getType<PolyScale.GetCaches>(), id: 'polyscale', name: 'PolyScale', interface: 'GetCaches'})
configTypes.push({type: getType<PolyScale.PurgeCache>(), id: 'polyscale', name: 'PolyScale', interface: 'PurgeCache'})
configTypes.push({type: getType<PostHog.SendEvent>(), id: 'posthog', name: 'PostHog', interface: 'SendEvent'})
configTypes.push({type: getType<Prerender.Recache>(), id: 'prerender', name: 'Prerender', interface: 'Recache'})
configTypes.push({type: getType<Prerender.RecacheMultiple>(), id: 'prerender', name: 'Prerender', interface: 'RecacheMultiple'})
configTypes.push({type: getType<Prerender.Search>(), id: 'prerender', name: 'Prerender', interface: 'Search'})
configTypes.push({type: getType<Prerender.Sitemap>(), id: 'prerender', name: 'Prerender', interface: 'Sitemap'})
configTypes.push({type: getType<Prerender.ClearCache>(), id: 'prerender', name: 'Prerender', interface: 'ClearCache'})
configTypes.push({type: getType<ProductHunt.GetCollections>(), id: 'producthunt', name: 'ProductHunt', interface: 'GetCollections'})
configTypes.push({type: getType<PurgoMalum.Profanity>(), id: 'purgomalum', name: 'PurgoMalum', interface: 'Profanity'})
configTypes.push({type: getType<QuickChart.PlotChart>(), id: 'quickchart', name: 'QuickChart', interface: 'PlotChart'})
configTypes.push({type: getType<RapidApi.ArticleExtractor>(), id: 'rapidapi', name: 'RapidApi', interface: 'ArticleExtractor'})
configTypes.push({type: getType<RedisCloud.GetCurrentAccount>(), id: 'rediscloud', name: 'RedisCloud', interface: 'GetCurrentAccount'})
configTypes.push({type: getType<RemoteOk.GetListings>(), id: 'remoteok', name: 'RemoteOk', interface: 'GetListings'})
configTypes.push({type: getType<RemoveBg.Remove>(), id: 'removebg', name: 'RemoveBg', interface: 'Remove'})
configTypes.push({type: getType<Render.ListServices>(), id: 'render', name: 'Render', interface: 'ListServices'})
configTypes.push({type: getType<Render.UpdateEnvironmentVariables>(), id: 'render', name: 'Render', interface: 'UpdateEnvironmentVariables'})
configTypes.push({type: getType<RestCountries.GetAll>(), id: 'restcountries', name: 'RestCountries', interface: 'GetAll'})
configTypes.push({type: getType<RestCountries.GetByFullName>(), id: 'restcountries', name: 'RestCountries', interface: 'GetByFullName'})
configTypes.push({type: getType<RestCountries.GetByCode>(), id: 'restcountries', name: 'RestCountries', interface: 'GetByCode'})
configTypes.push({type: getType<RestCountries.ListOfCodes>(), id: 'restcountries', name: 'RestCountries', interface: 'ListOfCodes'})
configTypes.push({type: getType<RestDB.GetItemsFromCollection>(), id: 'restdb', name: 'RestDB', interface: 'GetItemsFromCollection'})
configTypes.push({type: getType<RestZeebe.StartInstance>(), id: 'restzeebe', name: 'RestZeebe', interface: 'StartInstance'})
configTypes.push({type: getType<Revue.ListAllLists>(), id: 'revue', name: 'Revue', interface: 'ListAllLists'})
configTypes.push({type: getType<Revue.GetList>(), id: 'revue', name: 'Revue', interface: 'GetList'})
configTypes.push({type: getType<Revue.GetSubscribers>(), id: 'revue', name: 'Revue', interface: 'GetSubscribers'})
configTypes.push({type: getType<Revue.AddSubscriber>(), id: 'revue', name: 'Revue', interface: 'AddSubscriber'})
configTypes.push({type: getType<Robolly.Render>(), id: 'robolly', name: 'Robolly', interface: 'Render'})
configTypes.push({type: getType<Rye.GraphQLQuery>(), id: 'rye', name: 'Rye', interface: 'GraphQLQuery'})
configTypes.push({type: getType<Savepage.Screenshot>(), id: 'savepage', name: 'Savepage', interface: 'Screenshot'})
configTypes.push({type: getType<Semrush.GetBacklinksOverview>(), id: 'semrush', name: 'Semrush', interface: 'GetBacklinksOverview'})
configTypes.push({type: getType<SendGrid.SendMail>(), id: 'sendgrid', name: 'SendGrid', interface: 'SendMail'})
configTypes.push({type: getType<Sentry.QueryDiscoverEvents>(), id: 'sentry', name: 'Sentry', interface: 'QueryDiscoverEvents'})
configTypes.push({type: getType<Sentry.ListProjects>(), id: 'sentry', name: 'Sentry', interface: 'ListProjects'})
configTypes.push({type: getType<SerpApi.Search>(), id: 'serpapi', name: 'SerpApi', interface: 'Search'})
configTypes.push({type: getType<SerpStack.Search>(), id: 'serpstack', name: 'SerpStack', interface: 'Search'})
configTypes.push({type: getType<Sheety.Get>(), id: 'sheety', name: 'Sheety', interface: 'Get'})
configTypes.push({type: getType<Sheety.Post>(), id: 'sheety', name: 'Sheety', interface: 'Post'})
configTypes.push({type: getType<Sheety.Put>(), id: 'sheety', name: 'Sheety', interface: 'Put'})
configTypes.push({type: getType<Sheety.Delete>(), id: 'sheety', name: 'Sheety', interface: 'Delete'})
configTypes.push({type: getType<Shortcut.ListCategories>(), id: 'shortcut', name: 'Shortcut', interface: 'ListCategories'})
configTypes.push({type: getType<Shortcut.CreateCategory>(), id: 'shortcut', name: 'Shortcut', interface: 'CreateCategory'})
configTypes.push({type: getType<Shortcut.Search>(), id: 'shortcut', name: 'Shortcut', interface: 'Search'})
configTypes.push({type: getType<Shortcut.SearchEpics>(), id: 'shortcut', name: 'Shortcut', interface: 'SearchEpics'})
configTypes.push({type: getType<Shortcut.SearchStories>(), id: 'shortcut', name: 'Shortcut', interface: 'SearchStories'})
configTypes.push({type: getType<Shrtcode.Shorten>(), id: 'shrtcode', name: 'Shrtcode', interface: 'Shorten'})
configTypes.push({type: getType<Shrtcode.Info>(), id: 'shrtcode', name: 'Shrtcode', interface: 'Info'})
configTypes.push({type: getType<SideKick.ListApplications>(), id: 'sidekick', name: 'SideKick', interface: 'ListApplications'})
configTypes.push({type: getType<SideKick.ListLogpoints>(), id: 'sidekick', name: 'SideKick', interface: 'ListLogpoints'})
configTypes.push({type: getType<Sidemail.SendEmail>(), id: 'sidemail', name: 'Sidemail', interface: 'SendEmail'})
configTypes.push({type: getType<Slack.IncomingWebhooksMessage>(), id: 'slack', name: 'Slack', interface: 'IncomingWebhooksMessage'})
configTypes.push({type: getType<Slack.ChatPostMessage>(), id: 'slack', name: 'Slack', interface: 'ChatPostMessage'})
configTypes.push({type: getType<Slack.ConversationsList>(), id: 'slack', name: 'Slack', interface: 'ConversationsList'})
configTypes.push({type: getType<SpeechTextAI.Recognize>(), id: 'speechtextai', name: 'SpeechTextAI', interface: 'Recognize'})
configTypes.push({type: getType<SpeechTextAI.Results>(), id: 'speechtextai', name: 'SpeechTextAI', interface: 'Results'})
configTypes.push({type: getType<Splitbee.TrackEvent>(), id: 'splitbee', name: 'Splitbee', interface: 'TrackEvent'})
configTypes.push({type: getType<Splitbee.SetCustomUserData>(), id: 'splitbee', name: 'Splitbee', interface: 'SetCustomUserData'})
configTypes.push({type: getType<Stackby.ListRows>(), id: 'stackby', name: 'Stackby', interface: 'ListRows'})
configTypes.push({type: getType<Statically.StaticZapGithub>(), id: 'statically', name: 'Statically', interface: 'StaticZapGithub'})
configTypes.push({type: getType<Statically.StaticZapGitlab>(), id: 'statically', name: 'Statically', interface: 'StaticZapGitlab'})
configTypes.push({type: getType<Statically.StaticZapBitbucket>(), id: 'statically', name: 'Statically', interface: 'StaticZapBitbucket'})
configTypes.push({type: getType<Storyblok.GraphQLQuery>(), id: 'storyblok', name: 'Storyblok', interface: 'GraphQLQuery'})
configTypes.push({type: getType<Storyblok.ListStories>(), id: 'storyblok', name: 'Storyblok', interface: 'ListStories'})
configTypes.push({type: getType<Storyblok.GetStory>(), id: 'storyblok', name: 'Storyblok', interface: 'GetStory'})
configTypes.push({type: getType<Stytch.SendMagicLink>(), id: 'stytch', name: 'Stytch', interface: 'SendMagicLink'})
configTypes.push({type: getType<Stytch.CreateUser>(), id: 'stytch', name: 'Stytch', interface: 'CreateUser'})
configTypes.push({type: getType<Supabase.InsertRows>(), id: 'supabase', name: 'Supabase', interface: 'InsertRows'})
configTypes.push({type: getType<Supabase.ReadRows>(), id: 'supabase', name: 'Supabase', interface: 'ReadRows'})
configTypes.push({type: getType<Tenderly.ExecuteTransactionSimulation>(), id: 'tenderly', name: 'Tenderly', interface: 'ExecuteTransactionSimulation'})
configTypes.push({type: getType<TheCompaniesApi.SearchCompanies>(), id: 'thecompaniesapi', name: 'TheCompaniesApi', interface: 'SearchCompanies'})
configTypes.push({type: getType<TheCompaniesApi.SearchCompaniesByName>(), id: 'thecompaniesapi', name: 'TheCompaniesApi', interface: 'SearchCompaniesByName'})
configTypes.push({type: getType<TheCompaniesApi.SearchCompaniesByDomain>(), id: 'thecompaniesapi', name: 'TheCompaniesApi', interface: 'SearchCompaniesByDomain'})
configTypes.push({type: getType<TheCompaniesApi.FindSimilarCompanies>(), id: 'thecompaniesapi', name: 'TheCompaniesApi', interface: 'FindSimilarCompanies'})
configTypes.push({type: getType<TheCompaniesApi.DetectEmployees>(), id: 'thecompaniesapi', name: 'TheCompaniesApi', interface: 'DetectEmployees'})
configTypes.push({type: getType<TheCompaniesApi.EnrichBusinessEmail>(), id: 'thecompaniesapi', name: 'TheCompaniesApi', interface: 'EnrichBusinessEmail'})
configTypes.push({type: getType<TheCompaniesApi.SearchCities>(), id: 'thecompaniesapi', name: 'TheCompaniesApi', interface: 'SearchCities'})
configTypes.push({type: getType<TheGraph.QueryById>(), id: 'thegraph', name: 'TheGraph', interface: 'QueryById'})
configTypes.push({type: getType<TheGraph.QueryByName>(), id: 'thegraph', name: 'TheGraph', interface: 'QueryByName'})
configTypes.push({type: getType<TheStarWarsApi.GetEntities>(), id: 'thestarwarsapi', name: 'TheStarWarsApi', interface: 'GetEntities'})
configTypes.push({type: getType<TheStarWarsApi.GetEntity>(), id: 'thestarwarsapi', name: 'TheStarWarsApi', interface: 'GetEntity'})
configTypes.push({type: getType<Tinify.Shrink>(), id: 'tinify', name: 'Tinify', interface: 'Shrink'})
configTypes.push({type: getType<TMDB.Trending>(), id: 'tmdb', name: 'TMDB', interface: 'Trending'})
configTypes.push({type: getType<Trello.BoardGetLists>(), id: 'trello', name: 'Trello', interface: 'BoardGetLists'})
configTypes.push({type: getType<Trello.CardsCreate>(), id: 'trello', name: 'Trello', interface: 'CardsCreate'})
configTypes.push({type: getType<Tribe.TribeAccessToken>(), id: 'tribe', name: 'Tribe', interface: 'TribeAccessToken'})
configTypes.push({type: getType<Twilio.SendSms>(), id: 'twilio', name: 'Twilio', interface: 'SendSms'})
configTypes.push({type: getType<Twitter.AuthBearer>(), id: 'twitter', name: 'Twitter', interface: 'AuthBearer'})
configTypes.push({type: getType<Twitter.AuthOAuth2AuthorizationCode>(), id: 'twitter', name: 'Twitter', interface: 'AuthOAuth2AuthorizationCode'})
configTypes.push({type: getType<Twitter.PostTweets>(), id: 'twitter', name: 'Twitter', interface: 'PostTweets'})
configTypes.push({type: getType<Twitter.StatusUpdate>(), id: 'twitter', name: 'Twitter', interface: 'StatusUpdate'})
configTypes.push({type: getType<Typeform.CreateApiCreateForm>(), id: 'typeform', name: 'Typeform', interface: 'CreateApiCreateForm'})
configTypes.push({type: getType<Umami.AuthLogin>(), id: 'umami', name: 'Umami', interface: 'AuthLogin'})
configTypes.push({type: getType<Umami.CreateWebsite>(), id: 'umami', name: 'Umami', interface: 'CreateWebsite'})
configTypes.push({type: getType<Umami.ListWebsites>(), id: 'umami', name: 'Umami', interface: 'ListWebsites'})
configTypes.push({type: getType<Unavatar.FromUsernameEmailDomain>(), id: 'unavatar', name: 'Unavatar', interface: 'FromUsernameEmailDomain'})
configTypes.push({type: getType<Unavatar.FromProvider>(), id: 'unavatar', name: 'Unavatar', interface: 'FromProvider'})
configTypes.push({type: getType<Unlayer.ListTemplates>(), id: 'unlayer', name: 'Unlayer', interface: 'ListTemplates'})
configTypes.push({type: getType<Unlayer.ExportHtml>(), id: 'unlayer', name: 'Unlayer', interface: 'ExportHtml'})
configTypes.push({type: getType<Unsplash.ListPhotos>(), id: 'unsplash', name: 'Unsplash', interface: 'ListPhotos'})
configTypes.push({type: getType<Unsplash.SearchPhotos>(), id: 'unsplash', name: 'Unsplash', interface: 'SearchPhotos'})
configTypes.push({type: getType<Up42.AuthRequest>(), id: 'up42', name: 'Up42', interface: 'AuthRequest'})
configTypes.push({type: getType<Up42.CreditsBalance>(), id: 'up42', name: 'Up42', interface: 'CreditsBalance'})
configTypes.push({type: getType<Up42.CatalogSearch>(), id: 'up42', name: 'Up42', interface: 'CatalogSearch'})
configTypes.push({type: getType<UptimeRobot.GetMonitors>(), id: 'uptimerobot', name: 'UptimeRobot', interface: 'GetMonitors'})
configTypes.push({type: getType<UrlScan.Submission>(), id: 'urlscan', name: 'UrlScan', interface: 'Submission'})
configTypes.push({type: getType<UrlScan.Result>(), id: 'urlscan', name: 'UrlScan', interface: 'Result'})
configTypes.push({type: getType<UrlScan.Search>(), id: 'urlscan', name: 'UrlScan', interface: 'Search'})
configTypes.push({type: getType<UsePlunk.PostEvent>(), id: 'useplunk', name: 'UsePlunk', interface: 'PostEvent'})
configTypes.push({type: getType<Userfront.CreateUser>(), id: 'userfront', name: 'Userfront', interface: 'CreateUser'})
configTypes.push({type: getType<Userfront.SearchUsers>(), id: 'userfront', name: 'Userfront', interface: 'SearchUsers'})
configTypes.push({type: getType<Userfront.ListRoles>(), id: 'userfront', name: 'Userfront', interface: 'ListRoles'})
configTypes.push({type: getType<Vantevo.SendEvent>(), id: 'vantevo', name: 'Vantevo', interface: 'SendEvent'})
configTypes.push({type: getType<Vantevo.GetStatistics>(), id: 'vantevo', name: 'Vantevo', interface: 'GetStatistics'})
configTypes.push({type: getType<Vantevo.GetEventStatistics>(), id: 'vantevo', name: 'Vantevo', interface: 'GetEventStatistics'})
configTypes.push({type: getType<Vonage.SendMessageToChannel>(), id: 'vonage', name: 'Vonage', interface: 'SendMessageToChannel'})
configTypes.push({type: getType<Web3Storage.UploadContent>(), id: 'web3storage', name: 'Web3Storage', interface: 'UploadContent'})
configTypes.push({type: getType<WhoIsXMLApi.DomainAvailability>(), id: 'whoisxmlapi', name: 'WhoIsXMLApi', interface: 'DomainAvailability'})
configTypes.push({type: getType<WordSimi.MostSimilarWords>(), id: 'wordsimi', name: 'WordSimi', interface: 'MostSimilarWords'})
configTypes.push({type: getType<YahooFinance.GetQuote>(), id: 'yahoofinance', name: 'YahooFinance', interface: 'GetQuote'})
configTypes.push({type: getType<YahooFinance.GetRecommendations>(), id: 'yahoofinance', name: 'YahooFinance', interface: 'GetRecommendations'})
configTypes.push({type: getType<YahooFinance.GetInsights>(), id: 'yahoofinance', name: 'YahooFinance', interface: 'GetInsights'})
configTypes.push({type: getType<ZeroX.SwapQuote>(), id: '0x', name: 'ZeroX', interface: 'SwapQuote'})
configTypes.push({type: getType<ZeroX.SwapPrice>(), id: '0x', name: 'ZeroX', interface: 'SwapPrice'})
configTypes.push({type: getType<ZeroX.SwapSources>(), id: '0x', name: 'ZeroX', interface: 'SwapSources'})
configTypes.push({type: getType<Zora.Query>(), id: 'zora', name: 'Zora', interface: 'Query'})