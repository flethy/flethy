import { ApiRequest } from './controllers/ApiRequest'
import { logger } from './utils/Logger'

async function main() {
  const json: any = await import('./configs/etherscan.json')
  const controller = new ApiRequest()
  controller.init(json.default)
  const response = await controller.request({
    entity: 'accounts',
    endpoint: 'balanceSingleAddress',
    params: {
      tag: 'latest',
      address: process.env.ETHERSCAN_ADDRESS,
    },
    auth: {
      apikey: process.env.ETHERSCAN_APIKEY,
    },
  })
  logger.info(response)
}

main()
