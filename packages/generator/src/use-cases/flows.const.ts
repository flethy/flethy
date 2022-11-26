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
  'update-users-app-metadata-with-auth0': [
    {
      id: 'token',
      config: {
        namespace: 'token',
      },
      next: [
        {
          id: 'updateAppMetadata',
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
      id: 'updateAppMetadata',
      config: {
        namespace: 'updateAppMetadata',
      },
      kind: 'auth0.users.update',
      'auth:Authorization': '->context.token.access_token->string',
      'param:id': '->context.userId->string',
      'subdomain:tenant': '==>env==>AUTH0_TENANT',
      'body:app_metadata': '->context.appMetadata->any',
    },
  ],
  'add-analytics-event-with-mixpanel': [
    {
      id: 'mixpanelSignupEvent',
      config: {
        namespace: 'mixpanel',
      },
      kind: 'mixpanel.events.track',
      'auth:token': '==>secrets==>MIXPANEL_TOKEN',
      baseId: 'api',
      'body:body': [
        {
          properties: {
            distinct_id: '->context.email->string',
            time: '->context.time->number',
          },
          event: 'signup',
        },
      ],
    },
  ],
  'create-new-contact-in-hubspot': [
    {
      kind: 'hubspot.contacts.createOrUpdate',
      'auth:Authorization': '==>secrets==>HUBSPOT_TOKEN',
      'param:contact_email': '->context.email->string',
      'body:properties': [
        {
          property: 'firstname',
          value: '->context.first->string',
        },
      ],
    },
  ],
}
