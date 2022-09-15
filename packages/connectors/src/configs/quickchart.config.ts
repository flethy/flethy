import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace QuickChart {
  export type Entity = { core: any }
  export type Endpoint = { chart: ApiDescriptionEndpoint }

  export interface PlotChart extends RequestParams {
    kind: 'quickchart.core.chart'
    'body:chart': any
    'body:height'?: number
    'body:width'?: number
    'body:devicePixelRatio'?: string
    'body:backgroundColor'?: string
    'body:format'?: string
    'body:encoding'?: string
    'body:version'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'quickchart',
      name: 'QuickChart',
      url: 'https://quickchart.io/',
      docs: 'https://quickchart.io/documentation/',
      tags: ['web2'],
      category: 'utils',
      type: 'image-processing',
      social: {
        twitter: 'quickchart_io',
      },
    },
    base: 'https://quickchart.io/chart',
    api: {
      core: {
        chart: {
          interface: 'PlotChart',
          meta: {
            title: 'Plot Chart',
            description: `Plot Chart`,
            docs: 'https://quickchart.io/documentation/',
          },
          method: 'POST',
        },
      },
    },
  }
}

export default QuickChart
