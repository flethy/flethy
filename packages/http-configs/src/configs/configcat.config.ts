import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace ConfigCat {
  export type Entity = { featureflagValue: any }
  export type Endpoint = { get: ApiDescriptionEndpoint }

  interface ConfigCatBase {
    'auth:Authorization': {
      username: string
      password: string
    }
  }

  interface ConfigCatBaseSDK extends ConfigCatBase {
    'auth:X-CONFIGCAT-SDKKEY': string
  }

  export interface FeatureFlagGetValue extends ConfigCatBaseSDK, RequestParams {
    kind: 'configcat.featureflagValue.get'
    'param:settingKeyOrId': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'configcat',
      name: 'ConfigCat',
      url: 'https://configcat.com',
      docs: 'https://api.configcat.com/docs/',
      signup: 'https://app.configcat.com/signup',
      pricing: 'https://configcat.com/#pricing',
      tags: ['web2'],
      category: 'utils',
      type: 'featureflags',
      social: {
        twitter: 'configcat',
        github: 'configcat',
      },
    },
    base: 'https://api.configcat.com/v1',
    auth: {
      Authorization: {
        type: 'header:basic',
      },
      'X-CONFIGCAT-SDKKEY': {
        type: 'header',
      },
    },
    api: {
      featureflagValue: {
        get: {
          interface: 'FeatureFlagGetValue',
          meta: {
            title: 'FeatureFlag: Get Value',
            description: `This endpoint returns the value of a Feature Flag or Setting in a specified Environment identified by the SDK key passed in the X-CONFIGCAT-SDKKEY header.`,
            docs: 'https://api.configcat.com/docs/#tag/Feature-Flag-and-Setting-values-using-SDK-Key/operation/get-setting-value-by-sdkkey',
          },
          method: 'GET',
          paths: [
            {
              name: 'settings',
              type: 'static',
            },
            {
              name: 'settingKeyOrId',
              type: 'param',
            },
            {
              name: 'value',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default ConfigCat
