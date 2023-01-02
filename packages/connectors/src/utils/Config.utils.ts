import { CONFIGS } from '../constants/configs.const'
import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'

export class ConfigUtils {
  public static getAllConfigs(): Map<string, ApiDescription<any, any>> {
    return CONFIGS
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

    try {
      const api = ConfigUtils.getConfigById(service)
      const endpoint = api.api[entity][entityEndpoint]
      return { api, endpoint }
    } catch (error) {
      throw new Error(`Failed to get config by kind: ${kind}`)
    }
  }
}
