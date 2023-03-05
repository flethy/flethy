import { Template } from '../../types/template.types'

export const Auth0CreateUser: Template = {
  id: 'auth0-create-user',
  level: 'Intermediate',
  meta: {
    name: 'Create an Auth0 user',
    description: 'Request a new Token and create a new Auth0 User',
    prereq: [
      {
        text: 'Register for an Auth0 account',
        link: {
          href: 'https://auth0.com',
          label: 'Auth0',
        },
        envs: [
          {
            key: 'AUTH0_AUDIENCE',
            description:
              'The audience of your Auth0 Account for the management API. Regularly the domain of your Auth0 account. E.g. https://my-domain.eu.auth0.com/api/v2/',
          },
          {
            key: 'AUTH0_TENANT',
            description: 'The subdomain of your Auth0 Account',
          },
        ],
      },
      {
        text: 'Create a Machine to Machine Application in the Applications section.',
        secrets: [
          {
            key: 'AUTH0_CLIENT_ID',
            description: 'The Client ID of your Auth0 Application',
          },
          {
            key: 'AUTH0_CLIENT_SECRET',
            description: 'The Client Secret of your Auth0 Application',
          },
        ],
      },
    ],
    services: ['auth0'],
    category: 'identity',
    tags: ['auth0', 'user', 'management-api'],
  },
  flow: {
    nodes: [
      {
        id: 'token',
        config: {
          namespace: 'token',
        },
        next: [
          {
            id: 'createUser',
          },
        ],
        kind: 'auth0.auth.accesstoken',
        'body:audience': '==>env==>AUTH0_AUDIENCE',
        'body:grant_type': 'client_credentials',
        'body:client_id': '==>secrets==>AUTH0_CLIENT_ID',
        'body:client_secret': '==>secrets==>AUTH0_CLIENT_SECRET',
        'subdomain:tenant': '==>env==>AUTH0_TENANT',
      },
      {
        id: 'createUser',
        config: {
          namespace: 'createUser',
        },
        kind: 'auth0.users.create',
        'auth:Authorization': '->context.token.access_token->string',
        'subdomain:tenant': '==>env==>AUTH0_TENANT',
        'body:email': '->context.input.email->string',
        'body:family_name': '->context.input.last->string',
        'body:given_name': '->context.input.first->string',
      },
    ],
    env: {
      AUTH0_AUDIENCE: 'audience',
      AUTH0_TENANT: 'tenant',
    },
  },
}
