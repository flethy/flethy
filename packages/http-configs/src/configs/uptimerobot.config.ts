import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { FetchParams } from '../types/FetchParams.type'
import { RequestParams } from '../types/Request.types'

export namespace UptimeRobot {
  export type Entity = { monitors: any }
  export type Endpoint = { get: ApiDescriptionEndpoint }

  interface UptimeRobotBase {
    'auth:api_key': string
  }

  export interface GetMonitors extends UptimeRobotBase, RequestParams {
    kind: 'uptimerobot.monitors.get'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'uptimerobot',
      name: 'UptimeRobot',
      url: 'https://uptimerobot.com',
      docs: 'https://uptimerobot.com/api/',
      tags: ['web2'],
      category: 'infra',
      type: 'monitoring',
    },
    base: 'https://api.uptimerobot.com/v2',
    auth: {
      api_key: {
        type: 'body',
        authHandler: (fetchParams: FetchParams, authValue: string) => {
          if (fetchParams.body) {
            fetchParams.body.api_key = authValue
          } else {
            fetchParams.body = {
              api_key: authValue,
            }
          }
        },
      },
    },
    api: {
      monitors: {
        get: {
          interface: 'GetMonitors',
          meta: {
            title: 'Get Monitors',
            description: `Get Monitors`,
            docs: 'https://uptimerobot.com/api/',
          },
          method: 'POST',
          paths: [
            {
              name: 'getMonitors',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default UptimeRobot
