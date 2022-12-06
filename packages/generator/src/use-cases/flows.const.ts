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
      'body:app_metadata': '->context.input.appMetadata->any',
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
            time: '->context.input.time->number',
          },
          event: 'signup',
        },
      ],
    },
  ],
  'create-new-contact-in-hubspot': [
    {
      id: 'hubspot',
      kind: 'hubspot.contacts.createOrUpdate',
      'auth:Authorization': '==>secrets==>HUBSPOT_TOKEN',
      'param:contact_email': '->context.input.email->string',
      'body:properties': [
        {
          property: 'firstname',
          value: '->context.input.first->string',
        },
      ],
    },
  ],
  'create-new-contact-in-sendinblue': [
    {
      id: 'sendinblue',
      kind: 'sendinblue.contacts.create',
      'auth:api-key': '==>secrets==>SENDINBLUE_API_KEY',
      'body:email': '->context.input.email->string',
      'body:attributes': {
        FIRSTNAME: '->context.input.first->string',
      },
    },
  ],
  'get-all-vimeos-in-which-the-user-appears': [
    {
      id: 'vimdeo',
      kind: 'vimeo.videos.appearancesMe',
      'auth:Authorization': '==>secrets==>VIMEO_ACCESS_TOKEN',
    },
  ],
  'get-icons-of-a-collection-from-the-noun-project': [
    {
      id: 'nounproject',
      kind: 'thenounproject.collections.iconsById',
      'auth:Authorization': {
        consumerKey: '==>secrets==>NOUNPROJECT_KEY',
        consumerSecret: '==>secrets==>NOUNPROJECT_SECRET',
      },
      'param:collectionId': '->context.input.collectionId->number',
    },
  ],
  'get-content-from-contentful': [
    {
      id: 'contentful',
      kind: 'contentful.graphql.queryBySpace',
      baseId: 'graphql',
      'auth:Authorization': '==>secrets==>CONTENTFUL_DELIVERY_API_KEY',
      'param:spaceId': '==>env==>CONTENTFUL_SPACE_ID',
      'body:query': '->context.input.query->string',
    },
  ],
  'get-content-from-buttercms': [
    {
      id: 'buttercms',
      kind: 'buttercms.pages.getMultiple',
      'auth:auth_token': '==>secrets==>BUTTERCMS_API_TOKEN',
      'param:page_type': '->context.input.pageSlug->string',
    },
  ],
  'get-content-from-kontentai': [
    {
      id: 'kontentai',
      kind: 'kontentai.delivery.graphql',
      'auth:projectId': '==>secrets==>KONTENT_AI_PROJECT_ID',
      'header:content-type': 'application/graphql',
      'body:body': '->context.input.query->string',
    },
  ],
}
