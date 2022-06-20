import { ApiDescription } from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Frankfurter {
  export type Entity = { core }
  export type Endpoint = { latest; historical; timeseries }

  export interface FrankfurterBase {
    'query:from'?: string
    'query:to'?: string
  }

  export interface Latest extends FrankfurterBase, RequestParams {
    kind: 'frankfurter.core.latest'
  }

  export interface Historical extends FrankfurterBase, RequestParams {
    kind: 'frankfurter.core.historical'
    'param:date': string
  }

  export interface TimeSeries extends FrankfurterBase, RequestParams {
    kind: 'frankfurter.core.timeseries'
    'param:range': string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'frankfurter',
      name: 'Frankfurter',
      url: 'https://www.frankfurter.app',
      docs: 'https://www.frankfurter.app/docs',
      tags: ['web2'],
      category: 'finance',
      type: 'currency',
    },
    base: 'https://api.frankfurter.app',
    api: {
      core: {
        latest: {
          interface: 'Latest',
          meta: {
            title: 'Latest',
            description: 'This endpoint returns the latest rates.',
            docs: 'https://www.frankfurter.app/docs/#latest',
          },
          method: 'GET',
          paths: [
            {
              name: 'latest',
              type: 'static',
            },
          ],
        },
        historical: {
          interface: 'Historical',
          meta: {
            title: 'Historical',
            description:
              'This endpoint returns historical rates for any working day since 4 January 1999.',
            docs: 'https://www.frankfurter.app/docs/#historical',
          },
          method: 'GET',
          paths: [
            {
              name: 'date',
              type: 'param',
            },
          ],
        },
        timeseries: {
          interface: 'TimeSeries',
          meta: {
            title: 'TimeSeries',
            description:
              'This endpoint returns a set of historical rates for a given time period.',
            docs: 'https://www.frankfurter.app/docs/#timeseries',
          },
          method: 'GET',
          paths: [
            {
              name: 'range',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default Frankfurter
