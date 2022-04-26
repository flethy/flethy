import { Alchemy } from '../configs/alchemy.config'
import { Etherscan } from '../configs/etherscan.config'
import { MailerSend } from '../configs/mailersend.config'
import { OpenSea } from '../configs/opensea.config'
import { Pinata } from '../configs/pinata.config'
import { Slack } from '../configs/slack.config'
import { TheGraph } from '../configs/thegraph.config'
import { Web3Storage } from '../configs/web3storage.config'
import {
  ApiDescription,
  ApiDescriptionEndpoint,
} from '../types/ApiDescription.type'
import { FetchParams } from '../types/FetchParams.type'

export interface RequestParams {
  kind: string
}

export interface RequestOptions<RequestOptionsParams> {
  api: ApiDescription<any, any>
  endpoint: ApiDescriptionEndpoint
  params: RequestOptionsParams
}

export class HttpRequestConfig {
  public static requestOptions<Params extends RequestParams>(
    params: Params
  ): RequestOptions<Params> {
    let endpoint: ApiDescriptionEndpoint
    let api: ApiDescription<any, any>
    switch (params.kind) {
      case 'mailersend.email.send':
        api = MailerSend.API
        endpoint = MailerSend.API.api.email.send
        break
      case 'etherscan.accounts.balanceSingleAddress':
        api = Etherscan.API
        endpoint = Etherscan.API.api.accounts.balanceSingleAddress
        break
      case 'pinata.pinning.pinJSONToIPFS':
        api = Pinata.API
        endpoint = Pinata.API.api.pinning.pinJSONToIPFS
        break
      case 'slack.incomingWebhooks.message':
        api = Slack.API
        endpoint = Slack.API.api.incomingWebhooks.message
        break
      case 'alchemy.nft.getNFTs':
        api = Alchemy.API
        endpoint = Alchemy.API.api.nft.getNFTs
        break
      case 'opensea.assets.get':
        api = OpenSea.API
        endpoint = OpenSea.API.api.assets.get
        break
      case 'opensea.collections.get':
        api = OpenSea.API
        endpoint = OpenSea.API.api.collections.get
        break
      case 'web3storage.upload.content':
        api = Web3Storage.API
        endpoint = Web3Storage.API.api.upload.content
        break
      case 'thegraph.hostedservice.query':
        api = TheGraph.API
        endpoint = TheGraph.API.api.hostedservice.query
        break
    }
    return { params, api, endpoint }
  }

  public static requestConfig(options: RequestOptions<any>): FetchParams {
    // VALIDATION
    const config: FetchParams = {
      method: options.endpoint.method,
      url: options.endpoint.base ?? options.api.base,
      headers: {},
      body: {},
    }
    const queryParams: { [key: string]: string } = {}

    // AUTH
    if (options.endpoint.auth || options.api.auth) {
      for (const paramKey of Object.keys(options.params)) {
        const [type, keyname] = paramKey.split(':')
        if (type === 'auth') {
          const auth = options.endpoint.auth ?? options.api.auth
          const authConfig = auth[keyname]
          switch (authConfig.type) {
            case 'query':
              queryParams[keyname] = options.params[paramKey]
              break
            case 'header':
              config.headers[keyname] = options.params[paramKey]
              break
            case 'path':
              // will be handled in path section
              break
          }
        }
      }
    }

    // PARAMS

    for (const paramKey of Object.keys(options.params)) {
      const [type, keyname] = paramKey.split(':')
      switch (type) {
        case 'query':
          queryParams[keyname] = options.params[paramKey]
          break
        case 'body':
          if (keyname === 'body') {
            config.body = options.params[paramKey]
          } else {
            config.body[keyname] = options.params[paramKey]
          }
          break
      }
    }

    // STATIC PARAMS
    if (options.endpoint.query) {
      for (const queryParam of Object.keys(options.endpoint.query)) {
        queryParams[queryParam] = options.endpoint.query[queryParam]
      }
    }

    // PATHS
    if (options.endpoint.paths) {
      const paths: string[] = []
      for (const path of options.endpoint.paths) {
        switch (path.type) {
          case 'static':
            paths.push(path.name)
            break
          case 'param':
            paths.push(options.params[`param:${path.name}`])
            break
          case 'auth':
            paths.push(options.params[`auth:${path.name}`])
            break
        }
      }
      config.url += `/${paths.join('/')}`
    }

    // REQUEST
    if (Object.keys(queryParams).length > 0) {
      config.url += `?${Object.entries(queryParams)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')}`
    }

    return config
  }
}
