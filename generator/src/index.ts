import { ETHERSCAN } from './configs/etherscan.config'
import { PINATA } from './configs/pinata.config'
import { ApiRequest, RequestOptions } from './controllers/ApiRequest'
import { logger } from './utils/Logger'

async function main() {
  const requestOptions: { [key: string]: RequestOptions } = {
    etherscan: {
      api: ETHERSCAN,
      endpoint: ETHERSCAN.api.accounts.balanceSingleAddress,
      params: {
        tag: 'latest',
        address: process.env.ETHERSCAN_ADDRESS,
      },
      auth: {
        apikey: process.env.ETHERSCAN_APIKEY,
      },
    },
    pinata: {
      api: PINATA,
      endpoint: PINATA.api.pinning.pinJSONToIPFS,
      params: {
        pinataContent: { test: 'test' },
        pinataMetadata: { name: 'asd', keyvalues: { key1: 'value1' } },
      },
      auth: {
        pinata_api_key: process.env.PINATA_API_KEY,
        pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
      },
    },
  }
  const currentRequestOptions = requestOptions.etherscan

  const requestConfig = await ApiRequest.requestConfig(currentRequestOptions)
  const response = await ApiRequest.request(requestConfig)
  logger.info(response)

  const responseTypes = await ApiRequest.quicktypeJson(
    `${capitalizeFirstLetter(currentRequestOptions.api.meta.name)}Response`,
    JSON.stringify(response)
  )
  // logger.info(responseTypes)
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

main()
