import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Carifai {
  export type Entity = { predictions: any }
  export type Endpoint = {
    make: ApiDescriptionEndpoint
    makeWithVersion: ApiDescriptionEndpoint
  }

  interface ClarifyBase {
    'auth:Authorization': string
  }

  interface PredictionInput {
    data: {
      image?: {
        url?: string
        base64?: string
      }
      video?: {
        url?: string
        base64?: string
      }
      text?: {
        url?: string
        raw?: string
      }
    }
  }

  export interface MakePredictions extends ClarifyBase, RequestParams {
    kind: 'clarifai.predictions.make'
    'param:modelId': string
    'body:inputs': PredictionInput[]
  }

  export interface MakePredictionsWithVersion
    extends ClarifyBase,
      RequestParams {
    kind: 'clarifai.predictions.makeWithVersion'
    'param:modelId': string
    'param:versionId': string
    'body:inputs': PredictionInput[]
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'clarifai',
      name: 'Carifai',
      url: 'https://clarifai.com',
      docs: 'https://docs.clarifai.com',
      tags: ['web2'],
      category: 'machinelearning',
      type: 'platform',
    },
    base: 'https://api.clarifai.com/v2',
    auth: {
      Authorization: {
        type: 'header:key',
      },
    },
    api: {
      predictions: {
        make: {
          interface: 'MakePredictions',
          meta: {
            title: 'Making Predictions',
            description: `The Predict API analyzes your images or videos and tells you what's inside of them. The API will return a list of concepts with corresponding probabilities of how likely it is these concepts are contained within the image.`,
            docs: 'https://docs.clarifai.com/api-guide/predict/',
          },
          method: 'POST',
          paths: [
            {
              name: 'models',
              type: 'static',
            },
            {
              name: 'modelId',
              type: 'param',
            },
            {
              name: 'outputs',
              type: 'static',
            },
          ],
        },
        makeWithVersion: {
          interface: 'MakePredictionsWithVersion',
          meta: {
            title: 'Making Predictions',
            description: `The Predict API analyzes your images or videos and tells you what's inside of them. The API will return a list of concepts with corresponding probabilities of how likely it is these concepts are contained within the image.`,
            docs: 'https://docs.clarifai.com/api-guide/predict/',
          },
          method: 'POST',
          paths: [
            {
              name: 'models',
              type: 'static',
            },
            {
              name: 'modelId',
              type: 'param',
            },
            {
              name: 'versions',
              type: 'static',
            },
            {
              name: 'versionId',
              type: 'param',
            },
            {
              name: 'outputs',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Carifai
