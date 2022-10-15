import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { RequestParams } from '../types/Request.types'

export namespace ORBIntelligence {
  export type Entity = { core: any }
  export type Endpoint = {
    match: ApiDescriptionEndpoint
    fetch: ApiDescriptionEndpoint
    search: ApiDescriptionEndpoint
    lookalike: ApiDescriptionEndpoint
    corpTree: ApiDescriptionEndpoint
    dictionaries: ApiDescriptionEndpoint
  }

  interface OrbIntelligenceBase {
    'auth:api_key': string
  }

  interface OrbIntelligenceAddress {
    'query:address1'?: string
    'query:city'?: string
    'query:state'?: string
    'query:zip'?: string
    'query:country'?: string
  }

  interface OrbIntelliganceSearchBase {
    'query:limit'?: number
    'query:offset'?: number
    'query:entity_type'?: 'company' | 'branch'
    'query:parent_orb_num'?: number
    'query:ultimate_parent_orb_num'?: number
    'query:industry'?: string
    'query:employees'?: string
    'query:revenue'?: string
    'query:tects'?: string
    'query:tech_categories'?: string
    'query:naics_codes'?: string
    'query:sic_codes'?: string
    'query:rankings'?: string
    'query:importance_score'?: string
    'query:cik'?: string
    'query:cusip'?: string
    'query:ticker'?: string
    'query:exchange'?: string
    'query:show_full_profile'?: boolean
    'query:include'?: string
  }

  export interface Match
    extends OrbIntelligenceBase,
      OrbIntelligenceAddress,
      RequestParams {
    kind: 'orbintelligence.core.match'
    'query:name'?: string
    'query:website'?: string
    'query:email'?: string
    'query:phone'?: string
    'query:ein'?: string
    'query:npi'?: string
    'query:lei'?: string
    'query:include'?: string
    'query:request_id'?: string
    'query:orb_num'?: number
  }

  export interface Fetch extends OrbIntelligenceBase, RequestParams {
    kind: 'orbintelligence.core.match'
    'param:orb_num'?: number
  }

  export interface Search
    extends OrbIntelligenceBase,
      OrbIntelligenceAddress,
      OrbIntelliganceSearchBase,
      RequestParams {
    kind: 'orbintelligence.core.search'
    'query:orb_num'?: number
    'query:categories'?: string
  }

  export interface Lookalike
    extends OrbIntelligenceBase,
      OrbIntelligenceAddress,
      OrbIntelliganceSearchBase,
      RequestParams {
    kind: 'orbintelligence.core.lookalike'
    'query:orb_num': number
  }

  export interface CorpTree extends OrbIntelligenceBase, RequestParams {
    kind: 'orbintelligence.core.corpTree'
    'param:orb_num': number
    'query:show_full_profile'?: boolean
    'query:include'?: string
  }

  export interface Dictionaries extends OrbIntelligenceBase, RequestParams {
    kind: 'orbintelligence.core.dictionaries'
    'param:dict':
      | 'industries'
      | 'naics_codes'
      | 'slc_codes'
      | 'rankings'
      | 'technologies'
      | 'technologies/categories'
      | 'categories'
      | 'stock_exchanges'
  }

  export const API: ApiDescription<Entity, Endpoint> = {
    meta: {
      id: 'orbintelligence',
      name: 'ORBIntelligence',
      url: 'https://api.orb-intelligence.com/docs/',
      docs: 'https://api.orb-intelligence.com/docs/',
      tags: ['web2'],
      category: 'data',
      type: 'brands',
      social: {
        twitter: 'OrbIntelligence',
      },
    },
    base: 'https://api.orb-intelligence.com/3',
    auth: {
      api_key: {
        type: 'query',
      },
    },
    api: {
      core: {
        match: {
          interface: 'Match',
          meta: {
            title: 'Match API',
            description: `The Match API call performs a candidate retrieval process; the process by which Orb records are identified as potential matches to the query. The candidate retrieval process can be thought of as throwing a large netout over all of the Orb reference database and pulling it back in to return all the records that could be considered a match based on the input fields provided.`,
            docs: 'https://api.orb-intelligence.com/docs/#!/Match_and_Fetch_API/get_3_match',
          },
          method: 'GET',
          paths: [
            {
              name: 'match',
              type: 'static',
            },
          ],
        },
        fetch: {
          interface: 'Fetch',
          meta: {
            title: 'Fetch API',
            description: `The Fetch API call allows a user to obtain a full company profile from the Orb database, based on an Orb Number.`,
            docs: 'https://api.orb-intelligence.com/docs/#!/Match_and_Fetch_API/get_3_fetch_orb_num',
          },
          method: 'GET',
          paths: [
            {
              name: 'fetch',
              type: 'static',
            },
            {
              name: 'orb_num',
              type: 'param',
            },
          ],
        },
        search: {
          interface: 'Search',
          meta: {
            title: 'Search API',
            description: `The Search API call allows a user to retrieve a list of companies for the given search criteria. This enables a user to build out a list of companies for use cases such as building out a list of companies in a specific territory or segment.`,
            docs: 'https://api.orb-intelligence.com/docs/#!/Search_and_Look-alike/get_3_search',
          },
          method: 'GET',
          paths: [
            {
              name: 'search',
              type: 'static',
            },
          ],
        },
        lookalike: {
          interface: 'Lookalike',
          meta: {
            title: 'Lookalike API',
            description: `The Lookalike API call allows a user to retrieve a list of companies similar to a target company and can be narrowed down based on a range of filtering attributes. This enables users to expand their total addressable market or evaluate leads by identifying for companies that look like existing customers.`,
            docs: 'https://api.orb-intelligence.com/docs/#!/Search_and_Look-alike/get_3_lookalike',
          },
          method: 'GET',
          paths: [
            {
              name: 'lookalike',
              type: 'static',
            },
          ],
        },
        corpTree: {
          interface: 'CorpTree',
          meta: {
            title: 'CorpTree API',
            description: `The Corporate Tree API call allows a user to retrive full corporate tree of subsidiaries for a given company, starting from its ultimate parent company. The input to the Corporate Tree call is the Orb Number of the target company (mandatory field).`,
            docs: 'https://api.orb-intelligence.com/docs/#!/Corporate_Tree/get_3_corporate_tree_orb_num',
          },
          method: 'GET',
          paths: [
            {
              name: 'corporate_tree',
              type: 'static',
            },
            {
              name: 'orb_num',
              type: 'param',
            },
          ],
        },
        dictionaries: {
          interface: 'Dictionaries',
          meta: {
            title: 'Dictionaries API',
            description: `ORB provides dictionaries for various type of fields.`,
            docs: 'https://api.orb-intelligence.com/docs/#!/Dictionaries/get_3_dictionaries',
          },
          method: 'GET',
          paths: [
            {
              name: 'dictionaries',
              type: 'static',
            },
            {
              name: 'dict',
              type: 'param',
            },
          ],
        },
      },
    },
  }
}

export default ORBIntelligence
