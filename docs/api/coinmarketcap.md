# CoinMarketCap

## Links

* URL: [https://coinmarketcap.com](https://coinmarketcap.com)
* Documentation: [https://coinmarketcap.com/api/documentation/v1/](https://coinmarketcap.com/api/documentation/v1/)
* Tags: web3
* Category: aggregation
* Type: prices

## API

### Authentication

* X-CMC_PRO_API_KEY: header

### cryptocurrency

#### listingsHistorical

##### Listings Historical

* Description: Returns a ranked and sorted list of all cryptocurrencies for a historical UTC date.
* Docs: [https://coinmarketcap.com/api/documentation/v1/#operation/getV1CryptocurrencyListingsHistorical](https://coinmarketcap.com/api/documentation/v1/#operation/getV1CryptocurrencyListingsHistorical)

#### listingsLatest

##### Listings Latest

* Description: Returns a paginated list of all active cryptocurrencies with latest market data. The default "market_cap" sort returns cryptocurrency in order of CoinMarketCap's market cap rank (as outlined in our methodology) but you may configure this call to order by another market ranking field. Use the "convert" option to return market values in multiple fiat and cryptocurrency conversions in the same call.
* Docs: [https://coinmarketcap.com/api/documentation/v1/#operation/getV1CryptocurrencyListingsLatest](https://coinmarketcap.com/api/documentation/v1/#operation/getV1CryptocurrencyListingsLatest)
