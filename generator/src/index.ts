import { ApiRequest } from './controllers/ApiRequest'
import { logger } from './utils/Logger'

async function main() {
  const json: any = await import('./configs/etherscan.json')
  const controller = new ApiRequest()
  controller.init(json.default)

  const entity = 'accounts'
  const endpoint = 'balanceSingleAddress'

  const requestConfig = await controller.requestConfig({
    entity,
    endpoint,
    params: {
      tag: 'latest',
      address: process.env.ETHERSCAN_ADDRESS,
    },
    auth: {
      apikey: process.env.ETHERSCAN_APIKEY,
    },
  })
  const response = await ApiRequest.request(requestConfig)
  logger.info(response)

  const responseTypes = await ApiRequest.quicktypeJson(
    `${capitalizeFirstLetter(controller.getApiName())}${capitalizeFirstLetter(
      entity
    )}${capitalizeFirstLetter(endpoint)}`,
    JSON.stringify(response)
  )
  logger.info(responseTypes)
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

main()
