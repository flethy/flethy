export interface OAuthFlowInterface<Authorize, Token, Refresh> {
  authorize: Authorize
  token: Token
  refresh?: Refresh
}
