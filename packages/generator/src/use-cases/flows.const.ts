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
  'get-content-from-contentchef': [
    {
      id: 'contentchef',
      kind: 'contentchef.live.content',
      'auth:X-Chef-Key': '==>secrets==>CONTENTCHEF_API_KEY',
      'param:spaceId': '==>env==>CONTENTCHEF_SPACE_ID',
      'param:publishingChannel': '==>env==>CONTENTCHEF_CHANNEL',
      'query:publicId': '->context.input.publicId->string',
    },
  ],
  'get-feature-flags-with-permitio': [
    {
      id: 'permitio',
      kind: 'permitio.users.list',
      'auth:Authorization': '==>secrets==>PERMITIO_API_KEY',
      'param:proj_id': '->context.input.projectId->string',
      'param:env_id': '->context.input.environmentId->string',
    },
  ],
  'get-feature-flags-with-configcat': [
    {
      id: 'configcat',
      kind: 'configcat.featureflagValue.get',
      'auth:Authorization': {
        username: '==>secrets==>CONFIGCAT_BASIC_USERNAME',
        password: '==>secrets==>CONFIGCAT_BASIC_PASSWORD',
      },
      'auth:X-CONFIGCAT-SDKKEY': '==>secrets==>CONFIGCAT_SDK_KEY',
      'param:settingKeyOrId': '->context.input.settingKey->string',
    },
  ],
  'get-feature-flags-with-devcycle': [
    {
      id: 'requestToken',
      config: {
        namespace: 'token',
      },
      next: [
        {
          id: 'listFeatures',
        },
      ],
      kind: 'devcycle.auth.token',
      'body:audience': 'https://api.devcycle.com/',
      'body:grant_type': 'client_credentials',
      'body:client_id': '==>secrets==>DEVCYCLE_CLIENT_ID',
      'body:client_secret': '==>secrets==>DEVCYCLE_CLIENT_SECRET',
    },
    {
      id: 'listFeatures',
      kind: 'devcycle.features.list',
      'auth:Authorization': '->context.token.access_token->string',
      'param:projectId': '->context.input.projectId->string',
    },
  ],
  'fetch-nft-data-with-basementdev': [
    {
      id: 'basementdev',
      kind: 'basementdev.graphql.query',
      'header:Content-Type': 'application/graphql',
      'body:body': '->context.input.query->string',
    },
  ],
  'publish-status-to-mastodon': [
    {
      id: 'mastodon',
      kind: 'mastodon.statuses.publish',
      'auth:Authorization': '==>secrets==>MASTODON_TOKEN',
      'subdomain:mastodoninstance': '==>env==>MASTODON_INSTANCE',
      'body:status': '->context.input.status->string',
    },
  ],
  'update-openapi-spec-to-readme': [
    {
      id: 'readme',
      kind: 'readme.apispec.update',
      'auth:Authorization': '==>secrets==>README_KEY',
      'param:id': '->context.input.apiSpecId->string',
      'body:spec': '->context.input.apiSpec->string',
    },
  ],
  'create-incident-with-firehydrant': [
    {
      id: 'firehydrant',
      kind: 'firehydrant.incidents.create',
      'auth:Authorization': '==>secrets==>FIREHYDRANT_TOKEN',
      'body:name': '->context.input.name->string',
    },
  ],
  'list-incidents-with-incidentio': [
    {
      id: 'incidentio',
      kind: 'incidentio.incidents.list',
      'auth:Authorization': '==>secrets==>INCIDENTIO_API_KEY',
    },
  ],
  'list-products-from-stripe': [
    {
      id: 'stripe',
      kind: 'stripe.products.list',
      'auth:Authorization': {
        username: '==>secrets==>STRIPE_API_KEY',
      },
    },
  ],
  'create-new-contact-in-getresponse': [
    {
      id: 'getresponse',
      kind: 'getresponse.contacts.create',
      'auth:X-Auth-Token': '==>secrets==>GETRESPONSE_API_KEY',
      'body:campaign': {
        campaignId: '->context.input.campaignId->string',
      },
      'body:email': '->context.input.email->string',
    },
  ],
  'list-institutions-with-nordigen': [
    {
      id: 'nordigen-access-token',
      config: {
        namespace: 'token',
      },
      next: [
        {
          id: 'nordigen-list-insitiutions',
        },
      ],
      kind: 'nordigen.auth.new',
      'auth:secret_id': '==>secrets==>NORDIGEN_SECRET_ID',
      'auth:secret_key': '==>secrets==>NORDIGEN_SECRET_KEY',
    },
    {
      id: 'nordigen-list-insitiutions',
      kind: 'nordigen.institutions.list',
      'auth:Authorization': '->context.token.access_token->string',
    },
  ],
  'list-tasks-from-bugherd': [
    {
      id: 'bugherd',
      kind: 'bugherd.tasks.list',
      'param:projectId': '==>env==>BUGHERD_PROJECT_ID',
      'auth:Authorization': {
        username: '==>secrets==>BUGHERD_API_KEY',
        password: 'x',
      },
    },
  ],
  'generate-image-with-duply': [
    {
      id: 'duply',
      kind: 'duply.images.generate',
      'auth:Authorization': {
        username: '==>secrets==>DUPLY_API_KEY',
        password: '==>secrets==>DUPLY_API_SECRET',
      },
      'body:templateId': '->context.input.templateId->string',
      'body:transparent': false,
      'body:requestName': 'awesome-image',
      'body:formats': ['jpg'],
      'body:fill:': {},
    },
  ],
  'create-a-task-with-asana': [
    {
      id: 'asana',
      kind: 'asana.tasks.create',
      'auth:Authorization': '==>secrets==>ASANA_TOKEN',
      'body:data': '->context.input.taskData->any',
    },
  ],
  'post-tweet-with-image': [
    {
      id: 'uploadimage',
      config: {
        namespace: 'media',
      },
      next: [
        {
          id: 'tweet',
        },
      ],
      kind: 'twitter.v1media.upload',
      'auth:Authorization': {
        consumerKey: '==>secrets==>CONSUMER_KEY',
        consumerSecret: '==>secrets==>CONSUMER_SECRET',
        accessKey: '==>secrets==>ACCESS_TOKEN',
        accessSecret: '==>secrets==>ACCESS_TOKEN_SECRET',
      },
      'query:media_data': '->context.input.base64image->string',
    },
    {
      id: 'tweet',
      kind: 'twitter.manage.postTweets',
      'auth:Authorization': {
        consumerKey: '==>secrets==>CONSUMER_KEY',
        consumerSecret: '==>secrets==>CONSUMER_SECRET',
        accessKey: '==>secrets==>ACCESS_TOKEN',
        accessSecret: '==>secrets==>ACCESS_TOKEN_SECRET',
      },
      'body:text': '->context.input.tweet->string',
      'body:media': {
        media_ids: '->$append([], context.media.media_id_string)',
      },
    },
  ],
}
