import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace DynaPictures {
  export type Entity = { core: any }
  export type Endpoint = { imageGeneration: ApiDescriptionEndpoint }

  interface DynaPicturesBase {
    'auth:Authorization': string
  }

  export interface GenerateImage extends DynaPicturesBase, RequestParams {
    kind: 'dynapictures.core.imageGeneration'
    'param:templateId': string
    'body:format': 'png' | 'jpeg' | 'webp' | 'avif'
    'body:metadata': string
    'body:params': Array<{
      name?: string
      text?: string
      color?: string
      backgroundColor?: string
      borderColor?: string
      borderWidth?: string
      borderRadius?: string
      imageUrl?: string
      imagePosition?: 'cro' | 'ai_face' | 'cov' | 'align'
      imageAlignH?: string
      imageAlignV?: string
      imageEffect?: string
      opacity?: string
      chartColor?: string
      chartLabelColor?: string
      chartDataLabels?: string[]
      chartDataValues?: number[]
    }>
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'dynapictures',
      name: 'DynaPictures',
      url: 'https://dynapictures.com',
      docs: 'https://dynapictures.com/docs',
      tags: ['web2'],
      category: 'utils',
      type: 'image-processing',
    },
    base: 'https://api.dynapictures.com',
    auth: {
      Authorization: {
        type: 'header:bearer',
      },
    },
    api: {
      core: {
        imageGeneration: {
          interface: 'GenerateImage',
          meta: {
            title: 'Image Generation',
            description: `Once an image template is designed in DynaPictures, it can be used to generate custom images via the REST API. This endpoint can also be explored interactively, when clicking the "API Console" button for a particular image template.`,
            docs: 'https://dynapictures.com/docs/#image-generation',
          },
          method: 'POST',
          paths: [
            {
              name: 'designs',
              type: 'static',
            },
            {
              name: 'templateId',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default DynaPictures
