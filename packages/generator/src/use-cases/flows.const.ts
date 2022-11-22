export const FLOWS = {
  'create-a-new-user-with-auth0': [
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
}
