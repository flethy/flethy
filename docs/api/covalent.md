# Covalent

## Links

* URL: [https://www.covalenthq.com](https://www.covalenthq.com)
* Documentation: [https://www.covalenthq.com/docs](https://www.covalenthq.com/docs)
* Tags: web3
* Category: aggregation
* Type: indexer

## API

### Authentication

* key: query

### classA

#### getTransactionsForAddress

##### Get transactions for address

* Description: Given chain_id and wallet address, return all transactions along with their decoded log events.
* Docs: [https://www.covalenthq.com/docs/api/#/0/Get%20transactions%20for%20address/USD/1](https://www.covalenthq.com/docs/api/#/0/Get%20transactions%20for%20address/USD/1)

### classB

#### getUniswapV3Pools

##### Get Uniswap v3 pools

* Description: Given a chain_id , return a paginated list of Uniswap pools sorted by transaction timestamp in desc order.
* Docs: [https://www.covalenthq.com/docs/api/#/0/Get%20Uniswap%20v3%20pools/USD/1](https://www.covalenthq.com/docs/api/#/0/Get%20Uniswap%20v3%20pools/USD/1)

### pricing

#### getHistoricalTokenPrices

##### Get historical token prices

* Description: Given chain_id and contract_addresses, return their historical prices. Can filter by date ranges and convert to quote_currency. Only daily granularity is supported.
* Docs: [https://www.covalenthq.com/docs/api/#/0/Get%20historical%20token%20prices/USD/1](https://www.covalenthq.com/docs/api/#/0/Get%20historical%20token%20prices/USD/1)
