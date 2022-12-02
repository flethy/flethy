import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace FootballPredictionAPI {
  export type Entity = { forecasting: any }
  export type Endpoint = { predictions: ApiDescriptionEndpoint }

  interface FootballPredictionAPIBase {
    'auth:X-RapidAPI-Key': string
    'header:X-RapidAPI-Host': 'football-prediction-api.p.rapidapi.com'
  }

  export interface Predictions
    extends FootballPredictionAPIBase,
      RequestParams {
    kind: 'footballpredictionapi.forecasting.predictions'
    'query:market'?: string
    'query:iso_date'?: string
    'query:federation'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'footballpredictionapi',
      name: 'FootballPredictionAPI',
      url: 'https://boggio-analytics.com/fp-api/',
      docs: 'https://developer.boggio-analytics.com/',
      signup: 'https://rapidapi.com/boggio-analytics/api/football-prediction',
      pricing: 'https://rapidapi.com/boggio-analytics/api/football-prediction',
      tags: ['web2'],
      category: 'utils',
      type: 'other',
    },
    base: 'https://football-prediction-api.p.rapidapi.com/api/v2',
    auth: {
      'X-RapidAPI-Key': {
        type: 'header',
      },
    },
    api: {
      forecasting: {
        predictions: {
          interface: 'Predictions',
          meta: {
            title: 'Predictions',
            description: `Predictions`,
            docs: 'https://developer.boggio-analytics.com/getting-started/api-endpoints',
          },
          method: 'GET',
          paths: [
            {
              name: 'predictions',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default FootballPredictionAPI
