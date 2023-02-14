import { Twitter } from '@flethy/connectors'
import { OAuthFlowInterface } from '../types/general.types'

export namespace TwitterOauth {
  export interface AuthOAuth2TokenResponse {
    access_token: string
    token_type: 'bearer'
    expires_in: number
    scope: string
    refresh_token: string
  }

  export const OAuthFlow: OAuthFlowInterface<
    Twitter.AuthOAuth2Authorize,
    Twitter.AuthOAuth2Token,
    Twitter.AuthOAuth2RefreshToken
  > = {
    authorize: {
      kind: 'twitter.auth.oAuth2Authorize',
      'auth:client_id': 'input',
      'query:code_challenge': 'sys:generate:code_challenge',
      'query:code_challenge_method': 'plain',
      'query:redirect_uri': 'sys:callback:url',
      'query:response_type': 'code',
      'query:scope': 'input',
      'query:state': 'sys:generate:state',
    },
    token: {
      kind: 'twitter.auth.oAuth2Token',
      'auth:Authorization': {
        username: 'input',
        password: 'secret',
      },
      'header:Content-Type': 'application/x-www-form-urlencoded',
      'query:code': 'response:query',
      'query:code_verifier': 'sys:generate:code_challenge',
      'query:grant_type': 'authorization_code',
      'query:redirect_uri': 'sys:callback:url',
    },
    refresh: {
      kind: 'twitter.auth.oAuth2RefreshToken',
      'auth:Authorization': {
        username: 'input',
        password: 'secret',
      },
      'header:Content-Type': 'application/x-www-form-urlencoded',
      'query:grant_type': 'refresh_token',
      'query:refresh_token': 'sys:store:refresh_token',
    },
  }
}
