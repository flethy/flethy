import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Pixela {
  export type Entity = { graph: any; pixel: any }
  export type Endpoint =
    | {
        create: ApiDescriptionEndpoint
        get: ApiDescriptionEndpoint
      }
    | { postValue: ApiDescriptionEndpoint }

  interface PixelaBase {
    'auth:X-USER-TOKEN': string
  }

  export interface CreateGraph extends PixelaBase, RequestParams {
    kind: 'pixela.graph.create'
    'param:username': string
    'body:id': string
    'body:name': string
    'body:unit': string
    'body:type': 'int' | 'float'
    'body:color': 'shibafu' | 'momiji' | 'sora' | 'ichou' | 'ajisai' | 'kuro'
    'body:timezone'?: string
    'body:selfSufficient'?: string
    'body:isSecret'?: boolean
    'body:publishOptionalData'?: boolean
  }

  export interface GetGraph extends PixelaBase, RequestParams {
    kind: 'pixela.graph.get'
    'param:username': string
    'param:graphId': string
    'query:date'?: string
    'query:mode'?: 'short' | 'badge' | 'line'
    'query:appearance'?: 'dark'
  }

  export interface PostValue extends PixelaBase, RequestParams {
    kind: 'pixela.pixel.postValue'
    'param:username': string
    'param:graphId': string
    'body:date': string
    'body:quantity': string
    'body:optionalData'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'pixela',
      name: 'Pixela',
      url: 'https://pixe.la',
      docs: 'https://docs.pixe.la/',
      tags: ['web2'],
      category: 'utils',
      type: 'other',
      social: {
        twitter: 'a_know',
        github: 'a-know',
      },
    },
    base: 'https://pixe.la/v1',
    auth: {
      'X-USER-TOKEN': {
        type: 'header',
      },
    },
    api: {
      graph: {
        create: {
          interface: 'CreateGraph',
          meta: {
            title: 'Create a new pixelation graph definition.',
            description: `Create a new pixelation graph definition.`,
            docs: 'https://docs.pixe.la/entry/post-graph',
          },
          method: 'POST',
          paths: [
            {
              name: 'users',
              type: 'static',
            },
            {
              name: 'username',
              type: 'param',
            },
            {
              name: 'graphs',
              type: 'static',
            },
          ],
        },
        get: {
          interface: 'GetGraph',
          meta: {
            title:
              'Based on the registered information, express the graph in SVG format diagram.',
            description: `Based on the registered information, express the graph in SVG format diagram.`,
            docs: 'https://docs.pixe.la/entry/get-svg',
          },
          method: 'POST',
          paths: [
            {
              name: 'users',
              type: 'static',
            },
            {
              name: 'username',
              type: 'param',
            },
            {
              name: 'graphs',
              type: 'static',
            },
            {
              name: 'graphId',
              type: 'param',
            },
          ],
        },
      },
      pixel: {
        postValue: {
          interface: 'PostValue',
          meta: {
            title: `It records the quantity of the specified date as a "Pixel".`,
            description: `It records the quantity of the specified date as a "Pixel".`,
            docs: 'https://docs.pixe.la/entry/post-pixel',
          },
          method: 'POST',
          paths: [
            {
              name: 'users',
              type: 'static',
            },
            {
              name: 'username',
              type: 'param',
            },
            {
              name: 'graphs',
              type: 'static',
            },
            {
              name: 'graphId',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default Pixela
