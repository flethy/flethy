// ENV VARS
declare var SECRET_AUTH_AUDIENCE: string;
declare var SECRET_AUTH_TENANT: string;
declare var ENV_STAGE: string;

// SECRETS
declare var SECRET_SECRET: string;
declare var SECRET_INTER_SERVICE_AUTH: string;
declare var SECRET_AUTH_CLIENT_ID: string;
declare var SECRET_AUTH_CLIENT_SECRET: string;
declare var SECRET_SLACK_WEBHOOK_ID: string;
declare var SECRET_MIXPANEL_PROJECT_TOKEN: string;
declare var SECRET_MIXPANEL_API_SECRET: string;

// MAPPINGS

export const ENVVARS = {
  config: {
    stage: ENV_STAGE,
  },
  auth0: {
    audience: SECRET_AUTH_AUDIENCE,
    tenant: SECRET_AUTH_TENANT,
  },
};

export const SECRETS = {
  config: {
    secret: SECRET_SECRET,
    interServiceAuth: SECRET_INTER_SERVICE_AUTH,
  },
  auth0: {
    clientId: SECRET_AUTH_CLIENT_ID,
    clientSecret: SECRET_AUTH_CLIENT_SECRET,
  },
  slack: {
    webhookId: SECRET_SLACK_WEBHOOK_ID,
  },
  mixpanel: {
    projectToken: SECRET_MIXPANEL_PROJECT_TOKEN,
    apiSecret: SECRET_MIXPANEL_API_SECRET,
  },
};
