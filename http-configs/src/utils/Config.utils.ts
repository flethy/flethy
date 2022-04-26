import { Alchemy } from '../configs/alchemy.config'
import { Etherscan } from '../configs/etherscan.config'
import { MailerSend } from '../configs/mailersend.config'
import { OpenSea } from '../configs/opensea.config'
import { Pinata } from '../configs/pinata.config'
import { Slack } from '../configs/slack.config'
import { TheGraph } from '../configs/thegraph.config'
import { Web3Storage } from '../configs/web3storage.config'
import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'

export class ConfigUtils {
  public static getAllConfigs(): Map<string, ApiDescription<any, any>> {
    const apiDescriptions = [
      Alchemy.API,
      Etherscan.API,
      MailerSend.API,
      OpenSea.API,
      Pinata.API,
      Slack.API,
      TheGraph.API,
      Web3Storage.API,
    ]
    const map: Map<string, ApiDescription<any, any>> = new Map<
      string,
      ApiDescription<any, any>
    >()
    apiDescriptions.forEach((apiDescription) => {
      map.set(apiDescription.meta.id, apiDescription)
    })
    return map
  }

  public static getConfigById(id: string): ApiDescription<any, any> {
    const config = ConfigUtils.getAllConfigs().get(id)
    if (!config) {
      throw new Error(`Unknown service: ${id}`)
    }
    return config
  }

  public static getConfigByKind(kind: string): {
    api: ApiDescription<any, any>
    endpoint: ApiDescriptionEndpoint
  } {
    const splittedKind = kind.split('.')
    const service = splittedKind[0]
    const entity = splittedKind[1]
    const entityEndpoint = splittedKind[2]

    const api = ConfigUtils.getConfigById(service)
    const endpoint = api.api[entity][entityEndpoint]
    return { api, endpoint }
  }
}
