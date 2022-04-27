import { ApiDescription } from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace Notion {
  export type Entity = { databases }
  export type Endpoint = { create }

  interface SelectOptions {
    name: string
    color?:
      | 'default'
      | 'gray'
      | 'brown'
      | 'orange'
      | 'yellow'
      | 'green'
      | 'blue'
      | 'purple'
      | 'red'
  }

  export interface CreateDatabase extends RequestParams {
    kind: 'notion.databases.create'
    'header:Notion-Version': '2022-02-22'
    'auth:Authorization': string
    'body:parent': {
      type: 'page_id'
      page_id: string
    }
    'body:title'?: Array<{
      type: 'text'
      text: {
        content: string
        link?: string
      }
    }>
    'body:properties': {
      [key: string]: {
        title?: {}
        rich_text?: {}
        checkbox?: {}
        select?: { options: SelectOptions[] }
        multi_select?: { options: SelectOptions[] }
        number?: {
          format?:
            | 'number'
            | 'number_with_commas'
            | 'percent'
            | 'dollar'
            | 'canadian_dollar'
            | 'euro'
            | 'pound'
            | 'yen'
            | 'ruble'
            | 'rupee'
            | 'won'
            | 'yuan'
            | 'real'
            | 'lira'
            | 'rupiah'
            | 'franc'
            | 'hong_kong_dollar'
            | 'new_zealand_dollar'
            | 'krona'
            | 'norwegian_krone'
            | 'mexican_peso'
            | 'rand'
            | 'new_taiwan_dollar'
            | 'danish_krone'
            | 'zloty'
            | 'baht'
            | 'forint'
            | 'koruna'
            | 'shekel'
            | 'chilean_peso'
            | 'philippine_peso'
            | 'dirham'
            | 'colombian_peso'
            | 'riyal'
            | 'ringgit'
            | 'leu'
        }
        people?: {}
        files?: {}
        url?: {}
        date?: {}
        email?: {}
        phone_number?: {}
        created_time?: {}
        created_by?: {}
        last_edited_time?: {}
        last_edited_by?: {}
        relation?: {
          database_id: string
        }
        rollup?: {
          relation_property_name?: string
          relation_property_id?: string
          rollup_property_name?: string
          rollup_property_id?: string
          function:
            | 'count_all'
            | 'count_values'
            | 'count_unique_values'
            | 'count_empty'
            | 'count_not_empty'
            | 'percent_empty'
            | 'percent_not_empty'
            | 'sum'
            | 'average'
            | 'median'
            | 'min'
            | 'max'
            | 'range'
            | 'show_original'
        }
      }
    }
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'notion',
      name: 'Notion',
      url: 'https://notion.so',
      docs: 'https://developers.notion.com/reference',
    },
    base: 'https://api.notion.com/v1',
    api: {
      databases: {
        create: {
          meta: {
            title: 'Create a database',
            description:
              'Creates a database as a subpage in the specified parent page, with the specified properties schema.',
            docs: 'https://developers.notion.com/reference/create-a-database',
            tags: ['web2'],
            category: 'collaboration',
            type: 'notes',
          },
          method: 'POST',
          auth: {
            Authorization: {
              type: 'header:bearer',
            },
          },
          paths: [
            {
              name: 'databases',
              type: 'static',
            },
          ],
        },
      },
    },
  }
}

export default Notion
