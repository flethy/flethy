import Twitter from '@flethy/connectors/src/configs/twitter.config'

const state = `state-${Date.now()}`
const codeChallenge = `codechallenge`

const oauth2Authorize: Twitter.AuthOAuth2Authorize = {
  kind: 'twitter.auth.oAuth2Authorize',
  'auth:client_id': process.env.TWOA_CLIENT_ID,
  'query:code_challenge_method': 'plain',
  'query:code_challenge': codeChallenge,
  'query:response_type': 'code',
  'query:redirect_uri': 'https://flethy.com',
  'query:state': state,
  'query:scope':
    'tweet.read users.read follows.read follows.write offline.access',
}

const oauth2Token: Twitter.AuthOAuth2Token = {
  kind: 'twitter.auth.oAuth2Token',
  'auth:Authorization': {
    username: process.env.TWOA_CLIENT_ID,
    password: process.env.TWOA_CLIENT_SECRET,
  },
  'header:Content-Type': 'application/x-www-form-urlencoded',
  'query:code': '',
  'query:code_verifier': codeChallenge,
  'query:grant_type': 'authorization_code',
  'query:redirect_uri': 'https://flethy.com',
}

const oauth2RefreshToken: Twitter.AuthOAuth2RefreshToken = {
  kind: 'twitter.auth.oAuth2RefreshToken',
  'auth:Authorization': {
    username: process.env.TWOA_CLIENT_ID,
    password: process.env.TWOA_CLIENT_SECRET,
  },
  'header:Content-Type': 'application/x-www-form-urlencoded',
  'query:grant_type': 'refresh_token',
  'query:refresh_token': '',
}

const configs = {
  oauth2Authorize,
  oauth2Token,
  oauth2RefreshToken,
}

export default { configs }
