import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Drivly {
  export type Entity = { vehicles: any }
  export type Endpoint = { list: ApiDescriptionEndpoint }

  export interface ListVehicles extends RequestParams {
    kind: 'drivly.vehicles.list'
    'body:body'?: string
    'body:drivetrain'?: string
    'body:engine'?: string
    'body:exterior'?: string
    'body:interior'?: string
    'body:make'?: string
    'body:model'?: string
    'body:name'?: string
    'body:style'?: string
    'body:transmission'?: string
    'body:trim'?: string
    'body:year'?: string
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'drivly',
      name: 'Drivly',
      url: 'https://driv.ly/',
      docs: 'https://commerce.driv.ly/',
      signup: 'https://driv.ly/',
      pricing: 'https://driv.ly/',
      tags: ['web2', 'automotive'],
      category: 'ecommerce',
      type: 'automotive',
      social: {
        twitter: 'drivly',
        github: 'drivly',
      },
    },
    base: 'https://commerce.vin',
    api: {
      vehicles: {
        list: {
          interface: 'ListVehicles',
          meta: {
            title: 'List Vehicles',
            description: 'List Vehicles',
            docs: 'https://commerce.vin/#/paths/vehicles/get',
          },
          method: 'GET',
          paths: [
            {
              name: 'vehicles',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Drivly
